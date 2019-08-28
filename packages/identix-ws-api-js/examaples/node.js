const { createIDXWsApi } = require("../src");

const IDXWsApi = createIDXWsApi({
  version: 1,
  token: "IDX_TOKEN",
  endpoint: "IDX_ENDPOINT",
});

IDXWsApi.connect();

IDXWsApi.on("connect", () => {
  console.log("🤝 connected!");
});

IDXWsApi.on("message", message => {
  console.log("✉️ message received!", { message });
});
