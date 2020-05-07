# Identix WebSocket JS library

## Installation

### NPM

```bash
npm i --save @identixone/websocket
```

### Yarn

```bash
yarn add @identixone/websocket
```

## Usage

```js
// ES2015 module import:
import { createIDXWsApi } from "@identixone/websocket";

// CommonJS module require:
const { createIDXWsApi } = require("@identixone/websocket");

const IDXWsApi = createIDXWsApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

IDXWsApi.connect();
```
