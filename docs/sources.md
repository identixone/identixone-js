# Sources API reference

## Identix API references

[Identix API](https://kb.identix.one/#/sources)

!> Note that parameters documentation available on the links to Identix API references below.

## Get list of sources

[Identix API](https://kb.identix.one/#/sources?id=list-of-sources-request)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN
});

const sources = IDXRestApi.sources.getSources();

sources.then(sources => {
  console.log({ sources });
});
```

## Get source

[Identix API](https://kb.identix.one/#/sources?id=source-settings-request)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN
});

const sourceId = 1;

const source = IDXRestApi.sources.getSource(sourceId);

source.then(source => {
  console.log({ source });
});
```

## Create source

[Identix API](https://kb.identix.one/#/sources?id=source-creation)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN
});

const source = IDXRestApi.sources.createSource({
  name: "My new awesome source",
  identify_resolution_threshold: 7000,
  pps_timestamp: 1000
});

source.then(source => {
  console.log({ source });
});
```

## Delete source

[Identix API](https://kb.identix.one/#/sources?id=deleting-a-source)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN
});

const sourceId = 1;

const source = IDXRestApi.sources.deleteSource(sourceId);

source.then(() => {
  console.log("Source was deleted!");
});
```

## Update source settings

[Identix API](https://kb.identix.one/#/sources?id=source-settings-change)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN
});

const sourceId = 1;

const source = IDXRestApi.sources.updateSource({
  id: sourceId,
  identify_resolution_threshold: 7200
});

source.then(source => {
  console.log({ source });
});
```
