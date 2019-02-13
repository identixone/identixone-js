require("dotenv").config();

const { createIDXWsApi } = require("@identixone/websocket");

const { IDENTIXONE_TOKEN } = process.env;

const testWs = createIDXWsApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

testWs.connect();

testWs.on("connect", () => {
  console.log("🤝 connected!");
});

testWs.on("message", message => {
  console.log("✉️ message received!", { message });
});

/**
 * NOTE: if you want to update token
 * you should connect to socket again
 * all previos listeners will remain
 */
testWs.setToken("a brand new token");

testWs.connect();
