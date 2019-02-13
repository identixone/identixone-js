require("dotenv").config();

const { createIDXWsApi } = require("@identixone/websocket");

const { IDENTIXONE_TOKEN } = process.env;

const IDXWsApi = createIDXWsApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

IDXWsApi.connect();

IDXWsApi.on("connect", () => {
  console.log("🤝 connected!");
});

IDXWsApi.on("message", message => {
  console.log("✉️ message received!", { message });
});

/**
 * NOTE: if you want to update token
 * you should connect to socket again
 * all previos listeners will remain
 */
IDXWsApi.setToken("a brand new token");

IDXWsApi.connect();
