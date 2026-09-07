import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AppContext from '../../context/AppContext';
import chatWebhookURL from '../../constants/chatApi';
import './PmsChatWidget.scss';

// Resolved per environment (production/test/local) the same way constants/api.js
// resolves the main API base URL, based on window.location.hostname.
const N8N_WEBHOOK_URL = chatWebhookURL || '';

const getAuthToken = () => {
  try {
    const raw = localStorage.getItem('token');
    if (!raw) return '';
    const parsed = JSON.parse(raw);
    return parsed?.token || '';
  } catch (e) {
    return '';
  }
};

const getProjectIdFromPath = (pathname) => {
  // Matches routes like /#/ProjectEdit/163 -> "163"
  const match = pathname.match(/ProjectEdit\/(\d+)/i);
  return match ? match[1] : null;
};

// Browser Speech-to-Text (Web Speech API). Chrome/Edge support this natively;
// Safari has partial support; Firefox does not support it at all — the mic
// button is hidden automatically when the API isn't available.
const SpeechRecognitionAPI =
  typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

// Browser Text-to-Speech (Web Speech API). Supported in all major browsers;
// speak() below is a no-op if it's unavailable for any reason.
const hasSpeechSynthesis = typeof window !== 'undefined' && 'speechSynthesis' in window;

const LANGUAGES = [
  { code: 'en-US', label: 'EN', placeholder: 'Ask a question…' },
  { code: 'ta-IN', label: 'TA', placeholder: 'ஒரு கேள்வியைக் கேளுங்கள்…' },
];

// Files under this size are sent to n8n as-is. Adjust to match whatever
// limit your n8n Webhook node / hosting allows for request bodies.
const MAX_FILE_SIZE_MB = 15;

// Strips the most common Markdown syntax so TTS doesn't read out symbols
// like #, *, |, and backticks. Good enough for spoken replies; not meant to
// be a full Markdown parser.
const stripMarkdownForSpeech = (text) =>
  (text || '')
    .replace(/```[\s\S]*?```/g, ' code block ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#*_~>|-]/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

const PmsChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [lang, setLang] = useState(LANGUAGES[0]); // { code, label, placeholder }
  const [listening, setListening] = useState(false);
  const [file, setFile] = useState(null);
  const autoSpeak = true; // bot replies are always spoken aloud — no mute toggle in this UI

  // ------------------------------------------------------------------
  // Voice Mode: full-screen continuous listen -> answer -> speak loop,
  // modeled on the Chatbase "call" experience (pulsing orb + End button).
  // ------------------------------------------------------------------
  const [voiceMode, setVoiceMode] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('idle'); // idle | listening | thinking | speaking
  const voiceModeActiveRef = useRef(false); // guards async callbacks after "End" is pressed
  const voiceRecognitionRef = useRef(null);
  // handleSend and startVoiceListenTurn call each other (a real circular
  // dependency: each turn sends, then listens again). This ref breaks the
  // cycle so neither function has to be declared before the other exists.
  const startVoiceListenTurnRef = useRef(() => {});

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);
  const nextIdRef = useRef(0);
  const nextId = () => {
    nextIdRef.current += 1;
    return nextIdRef.current;
  };
  const location = useLocation();
  const { loggedInuser } = useContext(AppContext);

  const projectId = getProjectIdFromPath(location.pathname);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Stop any speech playback / voice mode if the widget is closed or unmounts.
  useEffect(() => {
    if (!open) {
      if (hasSpeechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (voiceModeActiveRef.current) {
        voiceModeActiveRef.current = false;
        voiceRecognitionRef.current?.stop();
        setVoiceMode(false);
        setVoiceStatus('idle');
      }
    }
  }, [open]);

  // ---------------------------------------------------------------------
  // Audio reply (Text-to-Speech)
  // ---------------------------------------------------------------------
  // onEnd is used by Voice Mode to chain "speak the answer" -> "listen again"
  // into a continuous loop.
  const speak = (text, onEnd) => {
    if (!hasSpeechSynthesis) {
      onEnd?.();
      return;
    }
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(stripMarkdownForSpeech(text));
    utter.lang = lang.code;
    const voices = window.speechSynthesis.getVoices();
    const match =
      voices.find((v) => v.lang === lang.code) ||
      voices.find((v) => v.lang?.startsWith(lang.code.split('-')[0]));
    if (match) utter.voice = match;

    utter.onstart = () => {
      if (voiceModeActiveRef.current) setVoiceStatus('speaking');
    };
    utter.onend = () => {
      onEnd?.();
    };
    utter.onerror = () => {
      onEnd?.();
    };

    window.speechSynthesis.speak(utter);
  };

  const stopSpeaking = () => {
    if (hasSpeechSynthesis) window.speechSynthesis.cancel();
  };

  // Warm up the voice list — some browsers (notably Chrome) load voices
  // asynchronously, so the very first speak() call can otherwise pick no voice.
  useEffect(() => {
    if (!hasSpeechSynthesis) return undefined;
    window.speechSynthesis.getVoices();
    const handler = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = handler;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // ---------------------------------------------------------------------
  // File upload
  // ---------------------------------------------------------------------
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: 'bot',
          text: `That file is larger than ${MAX_FILE_SIZE_MB}MB. Please attach a smaller file.`,
          error: true,
        },
      ]);
      e.target.value = '';
      return;
    }

    setFile(selected);
    // reset the input so selecting the same file again still fires onChange
    e.target.value = '';
  };

  const clearFile = () => setFile(null);

  // Defined here (before handleSend/startVoiceListenTurn) since both of
  // those reference it, and it doesn't depend on either of them.
  const endVoiceMode = () => {
    voiceModeActiveRef.current = false;
    voiceRecognitionRef.current?.stop();
    stopSpeaking();
    setVoiceMode(false);
    setVoiceStatus('idle');
  };

  // ---------------------------------------------------------------------
  // Sending a question (with or without an attached file)
  //
  // overrideQuestion is passed by Voice Mode so a spoken turn can be sent
  // immediately without ever touching the visible text input.
  // ---------------------------------------------------------------------
  const handleSend = async (overrideQuestion) => {
    const isVoiceTurn = typeof overrideQuestion === 'string';
    const question = (isVoiceTurn ? overrideQuestion : input).trim();
    if ((!question && !file) || sending) return;

    if (!N8N_WEBHOOK_URL) {
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: 'user', text: question, fileName: file?.name },
        {
          id: nextId(),
          role: 'bot',
          text: 'Chat is not configured yet — missing the n8n webhook URL for this environment.',
          error: true,
        },
      ]);
      if (!isVoiceTurn) {
        setInput('');
        clearFile();
      }
      return;
    }

    // Voice Mode turns never carry a file attachment.
    const attachedFile = isVoiceTurn ? null : file;
    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: 'user', text: question || '(sent a file)', fileName: attachedFile?.name },
    ]);
    if (!isVoiceTurn) {
      setInput('');
      clearFile();
    }
    setSending(true);
    if (voiceModeActiveRef.current) setVoiceStatus('thinking');

    // Only attach Authorization if we actually have a token. Sending an empty
    // "Bearer " header (or any custom header) forces the browser to run a CORS
    // preflight (OPTIONS) request first — if the n8n Webhook node doesn't have
    // CORS/allowed-origins configured, that preflight gets blocked silently and
    // the UI just hangs on "Thinking…" forever with no visible error.
    const token = getAuthToken();

    try {
      let res;

      if (attachedFile) {
        // Multipart request so n8n's Webhook node receives the file as binary
        // data (accessible in n8n under the "file" field) alongside the same
        // metadata fields the JSON path sends. Do NOT set Content-Type
        // manually here — the browser needs to add its own multipart
        // boundary, which axios only does correctly if we leave it alone.
        const formData = new FormData();
        formData.append('question', question);
        formData.append('project_id', projectId || '');
        formData.append('user', loggedInuser?.employee_name || loggedInuser?.user_name || '');
        formData.append('source', 'pms-chat-widget');
        formData.append('timestamp', new Date().toISOString());
        formData.append('language', lang.code);
        formData.append('file', attachedFile, attachedFile.name);

        const headers = {};
        if (token) headers.Authorization = `Bearer ${token}`;

        res = await axios.post(N8N_WEBHOOK_URL, formData, { headers, timeout: 180000 });
      } else {
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers.Authorization = `Bearer ${token}`;

        res = await axios.post(
          N8N_WEBHOOK_URL,
          {
            question,
            project_id: projectId,
            user: loggedInuser?.employee_name || loggedInuser?.user_name || null,
            source: 'pms-chat-widget',
            language: lang.code,
            timestamp: new Date().toISOString(),
          },
          { headers, timeout: 180000 }
        );
      }

      const { data } = res;
      // n8n's Respond to Webhook node sends back an array, e.g. [{ output: "..." }],
      // not a bare object — so we need to unwrap the first item before reading
      // answer/output/reply/text off it.
      const payload = Array.isArray(data) ? data[0] : data;
      const answer =
        (typeof payload === 'string' && payload) ||
        payload?.answer ||
        payload?.output ||
        payload?.reply ||
        payload?.text ||
        (payload ? JSON.stringify(payload) : 'No response received from the assistant.');

      const botId = nextId();
      setMessages((prev) => [...prev, { id: botId, role: 'bot', text: answer }]);

      if (voiceModeActiveRef.current) {
        // Voice Mode: speak the answer, then automatically start listening
        // for the next turn — this is what makes it feel like a call.
        speak(answer, () => {
          if (voiceModeActiveRef.current) startVoiceListenTurnRef.current();
        });
      } else if (autoSpeak) {
        speak(answer);
      }
    } catch (err) {
      let errMsg;
      if (err?.code === 'ECONNABORTED') {
        errMsg = 'The assistant took too long to respond. Please try again.';
      } else if (err?.message === 'Network Error') {
        // Usually means: CORS blocked the request/response, the webhook is
        // unreachable, or (in production) an HTTPS page tried to call an HTTP
        // webhook URL ("mixed content"), which browsers block automatically.
        errMsg =
          "Couldn't reach the assistant. This is often a CORS or mixed-content issue — check the n8n Webhook node's CORS setting and make sure the webhook URL uses https in production.";
      } else {
        errMsg = err?.response?.data?.message || err?.message || 'Something went wrong reaching the assistant.';
      }
      setMessages((prev) => [...prev, { id: nextId(), role: 'bot', text: errMsg, error: true }]);

      if (voiceModeActiveRef.current) {
        // Don't let one failed turn kill the call — go back to listening.
        startVoiceListenTurnRef.current();
      }
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Starts/stops the browser's speech recognizer for the inline mic button
  // (push-to-talk dictation into the text box — separate from Voice Mode).
  const toggleListening = () => {
    if (!SpeechRecognitionAPI) return;

    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    // Stop any reply currently being read aloud before we start listening,
    // so the mic doesn't pick up the bot's own voice.
    stopSpeaking();

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = lang.code;
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onerror = (event) => {
      setListening(false);
      // Surface the actual reason instead of failing silently, so we can tell
      // "language-not-supported" apart from "no-speech", "network", or
      // "not-allowed" (mic permission) issues.
      // eslint-disable-next-line no-console
      console.warn('Speech recognition error:', event.error, event);

      const messagesByReason = {
        'language-not-supported': `Voice input in ${lang.label === 'TA' ? 'Tamil' : 'English'} isn't supported by this browser/device. Try Chrome, or type your question instead.`,
        'not-allowed': 'Microphone access was blocked. Please allow microphone permission for this site and try again.',
        network: 'Voice recognition needs an internet connection. Please check your connection and try again.',
        'no-speech': null, // not a real error, user just didn't say anything — no message needed
      };
      const msg = messagesByReason[event.error];
      if (msg) {
        setMessages((prev) => [...prev, { id: nextId(), role: 'bot', text: msg, error: true }]);
      }
    };
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; i += 1) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  // ---------------------------------------------------------------------
  // Voice Mode: one listening "turn". Starts the mic, and on silence
  // (recognition.onend) automatically sends whatever was heard — no
  // Send button, no typing, matching the Chatbase call-style experience.
  // ---------------------------------------------------------------------
  const startVoiceListenTurn = () => {
    if (!voiceModeActiveRef.current || !SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = lang.code;
    recognition.interimResults = true;
    recognition.continuous = false;

    let finalTranscript = '';

    recognition.onstart = () => setVoiceStatus('listening');

    recognition.onresult = (event) => {
      let t = '';
      for (let i = 0; i < event.results.length; i += 1) {
        t += event.results[i][0].transcript;
      }
      finalTranscript = t;
    };

    recognition.onerror = (event) => {
      if (!voiceModeActiveRef.current) return;
      if (event.error === 'no-speech') {
        // Nobody said anything this round — just keep listening.
        startVoiceListenTurn();
        return;
      }
      const messagesByReason = {
        'not-allowed': 'Microphone access was blocked. Please allow microphone permission and try again.',
        network: 'Voice mode needs an internet connection. Please check your connection and try again.',
      };
      const msg = messagesByReason[event.error] || `Voice mode stopped (${event.error}).`;
      setMessages((prev) => [...prev, { id: nextId(), role: 'bot', text: msg, error: true }]);
      endVoiceMode();
    };

    recognition.onend = () => {
      if (!voiceModeActiveRef.current) return;
      if (finalTranscript.trim()) {
        handleSend(finalTranscript.trim());
      } else {
        // Recognition ended with nothing heard — listen again.
        startVoiceListenTurn();
      }
    };

    voiceRecognitionRef.current = recognition;
    recognition.start();
  };
  // Register into the ref so handleSend (defined above, and therefore
  // unable to reference this function by name) can trigger the next turn.
  startVoiceListenTurnRef.current = startVoiceListenTurn;

  const startVoiceMode = () => {
    if (!SpeechRecognitionAPI || !hasSpeechSynthesis || sending) return;
    stopSpeaking();
    if (listening) recognitionRef.current?.stop();
    voiceModeActiveRef.current = true;
    setVoiceMode(true);
    setVoiceStatus('listening');
    startVoiceListenTurn();
  };

  useEffect(
    () => () => {
      // Stop any in-progress recognition if the widget unmounts/closes mid-recording.
      recognitionRef.current?.stop();
      voiceRecognitionRef.current?.stop();
      voiceModeActiveRef.current = false;
      if (hasSpeechSynthesis) window.speechSynthesis.cancel();
    },
    []
  );

  return (
    <>
      <button
        type="button"
        className="pms-chat-fab"
        onClick={() => setOpen((o) => !o)}
        title="Ask about PMS data"
      >
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div className="pms-chat-panel">
          <div className="pms-chat-header">
            <div>
              Ask PMS
              {projectId && <div className="pms-chat-header-sub">Scoped to project #{projectId}</div>}
            </div>
            <div className="pms-chat-header-actions">
              <div className="pms-chat-lang-toggle" role="group" aria-label="Question language">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    className={l.code === lang.code ? 'active' : ''}
                    onClick={() => setLang(l)}
                    disabled={voiceMode}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <button type="button" className="pms-chat-close" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>
          </div>

          {voiceMode ? (
            // ---------------------------------------------------------
            // Voice Mode body: pulsing orb + status, Chatbase-style call
            // screen, in the widget's own blue theme.
            // ---------------------------------------------------------
            <div className="pms-chat-voice-overlay">
              <div className={`pms-chat-voice-orb ${voiceStatus}`}>
                <div className="pms-chat-voice-orb-ring" />
                <div className="pms-chat-voice-orb-core" />
              </div>
              <div className="pms-chat-voice-status">
                {voiceStatus === 'listening' && (lang.code === 'ta-IN' ? 'கேட்டுக்கொண்டிருக்கிறேன்…' : 'Listening…')}
                {voiceStatus === 'thinking' && (lang.code === 'ta-IN' ? 'யோசிக்கிறேன்…' : 'Thinking…')}
                {voiceStatus === 'speaking' && (lang.code === 'ta-IN' ? 'பதிலளிக்கிறேன்…' : 'Speaking…')}
                {voiceStatus === 'idle' && 'Starting…'}
              </div>
            </div>
          ) : (
            <div className="pms-chat-messages" ref={messagesEndRef}>
              {messages.length === 0 && (
                <div className="pms-chat-empty">
                  Ask things like &ldquo;How many hours did Ponmalar log this week?&rdquo; or &ldquo;Show open tasks
                  for this project.&rdquo; You can also attach a file, ask by voice, or start Voice Mode for a
                  hands-free conversation.
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`pms-chat-msg ${m.role}${m.error ? ' error' : ''}`}>
                  {m.role === 'bot' ? (
                    // Render Markdown (tables, bold, lists, etc.) for assistant replies.
                    // remarkGfm adds support for the | col | col | table syntax the
                    // AI Agent is instructed to use for multi-row answers.
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                  ) : (
                    m.text
                  )}

                  {m.fileName && (
                    <div className="file-chip-msg">
                      <span className="file-icon">📎</span>
                      <span className="file-name">{m.fileName}</span>
                    </div>
                  )}

                </div>
              ))}
              {sending && <div className="pms-chat-msg bot loading">Thinking…</div>}
            </div>
          )}

          {!voiceMode && file && (
            <div className="pms-chat-file-preview">
              <span>📎</span>
              <span className="fname">{file.name}</span>
              <button type="button" onClick={clearFile} title="Remove file">
                ×
              </button>
            </div>
          )}

          {voiceMode ? (
            <div className="pms-chat-voice-inputrow">
              <span className="pms-chat-voice-hint">
                {lang.code === 'ta-IN' ? 'குரல் மூலம் கேளுங்கள்…' : 'Speaking freely — just talk'}
              </span>
              <button type="button" className="pms-chat-voice-end" onClick={endVoiceMode}>
                ⏹ End
              </button>
            </div>
          ) : (
            <div className="pms-chat-inputrow">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className={`pms-chat-attach${file ? ' has-file' : ''}`}
                onClick={handleFileButtonClick}
                disabled={sending}
                title="Attach a file"
              >
                📎
              </button>

              {SpeechRecognitionAPI && (
                <button
                  type="button"
                  className={`pms-chat-mic${listening ? ' listening' : ''}`}
                  onClick={toggleListening}
                  disabled={sending}
                  title={listening ? 'Stop recording' : `Ask by voice (${lang.label})`}
                >
                  {listening ? '⏹️' : '🎤'}
                </button>
              )}
              <textarea
                className="pms-chat-input"
                rows={1}
                placeholder={listening ? 'Listening…' : file ? 'Add a note about this file (optional)…' : lang.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={sending}
              />
              {SpeechRecognitionAPI && hasSpeechSynthesis && (
                <button
                  type="button"
                  className="pms-chat-voice-toggle"
                  onClick={startVoiceMode}
                  disabled={sending}
                  title="Start voice mode"
                >
                  🎧
                </button>
              )}
              <button
                type="button"
                className="pms-chat-send"
                onClick={() => handleSend()}
                disabled={sending || (!input.trim() && !file)}
              >
                Send
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PmsChatWidget;