# Identix REST API JS library

## Installation

### NPM

```bash
npm i --save @identixone/rest-api
```

### Yarn

```bash
yarn add @identixone/rest-api
```

## Usage

```js
// ES2015 module import:
import { createIDXRestApi } from "@identixone/rest-api";

// CommonJS module require:
const { createIDXRestApi } = require("@identixone/rest-api");

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});
```
