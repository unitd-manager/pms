// NOTE: do NOT use the `dotenv` package here — it's a Node.js-only API and is a
// no-op (or throws) inside a browser bundle. Create React App already injects any
// REACT_APP_* variable from .env into process.env at build time automatically.

const resolveChatWebhookURL = () => {
  const { hostname } = window.location;

  let url;
  if (hostname === 'pmsdemo.unitdtechnologies.com') {
    url = process.env.REACT_APP_N8N_CHAT_WEBHOOK_PRODUCTION_URL;
  } else if (hostname === 'pmsuts.unitdtechnologies.com') {
    url = process.env.REACT_APP_N8N_CHAT_WEBHOOK_TEST_URL;
  } else if (hostname === 'localhost' || hostname === '127.0.0.1') {
    url = process.env.REACT_APP_N8N_CHAT_WEBHOOK_LOCAL_URL;
  } else {
    url = process.env.REACT_APP_N8N_CHAT_WEBHOOK_TEST_URL;
  }

  if (!url) {
    // eslint-disable-next-line no-console
    console.warn(
      `[pms-chat] No REACT_APP_N8N_CHAT_WEBHOOK_* URL resolved for hostname "${hostname}". ` +
        'Check your .env file and confirm the app was rebuilt after editing it (CRA only reads .env at build/start time).'
    );
  }

  return url;
};

const chatWebhookURL = resolveChatWebhookURL();

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-console
  console.log('[pms-chat] Using Chat Webhook URL:', chatWebhookURL);
}

export default chatWebhookURL;
