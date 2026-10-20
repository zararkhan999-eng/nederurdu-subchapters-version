// Same suite as playwright.config.js, on its own port with its own server,
// so another session's server on 4173 can't answer for this checkout.
const base = require("./playwright.config.js");

const port = Number(process.env.PORT || 4180);
const url = `http://127.0.0.1:${port}`;

module.exports = {
  ...base,
  use: { ...base.use, baseURL: url },
  webServer: {
    ...base.webServer,
    command: `PORT=${port} node server.js`,
    url,
    reuseExistingServer: false
  }
};
