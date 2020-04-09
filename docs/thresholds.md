# Thresholds API reference

## Get thresholds settings

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const thresholds = IDXRestApi.thresholds.getThresholds();

thresholds.then((thresholds) => {
  console.log({ thresholds });
});
```

## Update thresholds settings

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

IDXRestApi.thresholds.updateThresholds({
  exact: 0.23,
  ha: 0.41,
  junk: 1,
});
```

## Reset thresholds settings to default

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const defaultThresholds = IDXRestApi.thresholds.resetThresholds();

defaultThresholds.then((thresholds) => {
  console.log({ thresholds });
});
```
