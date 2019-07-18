# Identix API JS library

## Installation

### NPM

```bash
npm i --save @identixone/api
```

### Yarn

```bash
yarn add @identixone/api
```

## Usage

```js
// ES2015 module import:
import { createIDXRestApi, createIDXWsApi } from "@identixone/api";

// CommonJS module require:
const { createIDXRestApi, createIDXWsApi } = require("@identixone/api");

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: "YOUR_IDENTIXONE_TOKEN",
});

const IDXWsApi = createIDXWsApi({
  version: 1,
  token: "YOUR_IDENTIXONE_TOKEN",
});

IDXWsApi.connect();
```
