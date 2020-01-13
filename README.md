# Identix API JS library

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2ca94b81ca2a4bc5a57d5b8afa38d60d)](https://app.codacy.com/app/sunsetninja/identix-api-lib-js?utm_source=github.com&utm_medium=referral&utm_content=identixone/identix-api-lib-js&utm_campaign=Badge_Grade_Dashboard)[![Known Vulnerabilities](https://snyk.io/test/github/identixone/identix-api-lib-js/badge.svg?targetFile=package.json)](https://snyk.io/test/github/identixone/identix-api-lib-js?targetFile=package.json)

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

// REST
const IDXRestApi = createIDXRestApi({
  version: 1,
  token: "YOUR_IDENTIXONE_TOKEN",
});

// WebSocket
const IDXWsApi = createIDXWsApi({
  version: 1,
  token: "YOUR_IDENTIXONE_TOKEN",
});

IDXWsApi.connect();
```
