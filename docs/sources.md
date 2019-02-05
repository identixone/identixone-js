# Sources API reference

## Identix API references

[Identix API](https://kb.identix.one/#/sources)

!> Note that parameters documentation available on the links to Identix API references below.

## Get list of sources

[Identix API](https://kb.identix.one/#/sources?id=list-of-sources-request)

```js
import IDXApi from "identix-api-lib-js";

const sources = IDXApi.sources.getSources();

sources.then(sources => {
  console.log({ sources });
});
```

## Create source

[Identix API](https://kb.identix.one/#/sources?id=source-creation)

```js
import IDXApi from "identix-api-lib-js";

const source = IDXApi.sources.createSource({
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
import IDXApi from "identix-api-lib-js";

const sourceId = 1;

const source = IDXApi.sources.deleteSource(sourceId);

source.then(() => {
  console.log("Source was deleted!");
});
```

## Update source settings

[Identix API](https://kb.identix.one/#/sources?id=source-settings-change)

```js
import IDXApi from "identix-api-lib-js";

const sourceId = 1;

const source = IDXApi.sources.updateSource({
  id: sourceId,
  identify_resolution_threshold: 7200
});

source.then(source => {
  console.log({ source });
});
```
