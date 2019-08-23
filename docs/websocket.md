# WebSocket API reference

## Identix API references

[Identix API](https://kb.identix.one/#/notifications?id=establishing-a-connection-to-websocket-server)

!> Note that parameters documentation available on the links to Identix API references below.

## Install

## Establishing a connection

```js
import { createIDXWsApi } from "@identixone/api";

const IDXWsApi = createIDXWsApi({
  version: 1,
  token: "YOUR_IDENTIXONE_TOKEN",
});

IDXWsApi.on("connect", () => {
  console.log("🤝 connected!");
});

IDXWsApi.connect();
```

## Receiving messages

[Identix API](https://kb.identix.one/#/notifications?id=for-websocket-connections)

```js
import { createIDXWsApi } from "@identixone/api";

const IDXWsApi = createIDXWsApi({
  version: 1,
  token: "YOUR_IDENTIXONE_TOKEN",
});

IDXWsApi.on("connect", () => {
  console.log("🤝 connected!");
});

IDXWsApi.on("message", message => {
  console.log("✉️ message received!", { message });
});

IDXWsApi.connect();
```

!> if you want to update token or api endpoint you should connect to socket again all previos listeners will remain
