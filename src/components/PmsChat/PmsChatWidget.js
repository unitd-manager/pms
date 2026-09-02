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

const LANGUAGES = [
  { code: 'en-US', label: 'EN', placeholder: 'Ask a question…' },
  { code: 'ta-IN', label: 'TA', placeholder: 'ஒரு கேள்வியைக் கேளுங்கள்…' },
];

const PmsChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [lang, setLang] = useState(LANGUAGES[0]); // { code, label, placeholder }
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
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

  const handleSend = async () => {
    const question = input.trim();
    if (!question || sending) return;

    if (!N8N_WEBHOOK_URL) {
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: 'user', text: question },
        {
          id: nextId(),
          role: 'bot',
          text: 'Chat is not configured yet — missing the n8n webhook URL for this environment.',
          error: true,
        },
      ]);
      setInput('');
      return;
    }

    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text: question }]);
    setInput('');
    setSending(true);

    // Only attach Authorization if we actually have a token. Sending an empty
    // "Bearer " header (or any custom header) forces the browser to run a CORS
    // preflight (OPTIONS) request first — if the n8n Webhook node doesn't have
    // CORS/allowed-origins configured, that preflight gets blocked silently and
    // the UI just hangs on "Thinking…" forever with no visible error.
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const res = await axios.post(
        N8N_WEBHOOK_URL,
        {
          question,
          project_id: projectId,
          user: loggedInuser?.employee_name || loggedInuser?.user_name || null,
          source: 'pms-chat-widget',
          timestamp: new Date().toISOString(),
        },
 {
  headers,
  timeout: 180000,
} 
      );

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

      setMessages((prev) => [...prev, { id: nextId(), role: 'bot', text: answer }]);
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

  // Starts/stops the browser's speech recognizer. Language is set from the
  // EN/TA toggle so Tamil speech is actually transcribed as Tamil, not
  // mis-heard as English.
  const toggleListening = () => {
    if (!SpeechRecognitionAPI) return;

    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

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

  useEffect(
    () => () => {
      // Stop any in-progress recognition if the widget unmounts/closes mid-recording.
      recognitionRef.current?.stop();
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

          <div className="pms-chat-messages" ref={messagesEndRef}>
            {messages.length === 0 && (
              <div className="pms-chat-empty">
                Ask things like &ldquo;How many hours did Ponmalar log this week?&rdquo; or &ldquo;Show open tasks
                for this project.&rdquo;
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
              </div>
            ))}
            {sending && <div className="pms-chat-msg bot loading">Thinking…</div>}
          </div>

          <div className="pms-chat-inputrow">
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
              placeholder={listening ? 'Listening…' : lang.placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={sending}
            />
            <button
              type="button"
              className="pms-chat-send"
              onClick={handleSend}
              disabled={sending || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PmsChatWidget;