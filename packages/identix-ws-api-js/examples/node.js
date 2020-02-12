const { createIDXWsApi } = require("@identixone/websocket");

const IDXWsApi = createIDXWsApi({
  version: 1,
  token:
    "d78861f67e51c7fed41524d09c13755f856e67d7a0323f0947a4d71fe4b40be7e86345181434b2f5a635b400abae3d48acbf85ea7f513e27eb578126488c86a4",
});

IDXWsApi.connect();

IDXWsApi.on("connect", () => {
  console.log("🤝 connected!");
});

IDXWsApi.on("message", message => {
  console.log("✉️ message received!", { message });
});
