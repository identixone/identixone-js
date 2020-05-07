const { createIDXWsApi } = require("@identixone/websocket");

const IDXWsApi = createIDXWsApi({
  version: 1,
  token: "IDENTIXONE_TOKEN",
});

IDXWsApi.setEndpoint("ws://ws.identix.local/");

IDXWsApi.connect();

IDXWsApi.on("connect", () => {
  console.log("🤝 connected!");
});

IDXWsApi.on("message", message => {
  console.log("✉️ message received!", { message });
});
