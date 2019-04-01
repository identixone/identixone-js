# Entries API reference

## Get list of entries

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const haEntries = IDXRestApi.entries.getEntries({ conf: "ha" });

haEntries.then(haEntries => {
  console.log({ haEntries });
});
```

## Get list of entries of a person

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personIdxid = "123";

const personEntries = IDXRestApi.entries.getEntries({ idxid: personIdxid });

personEntries.then(personEntries => {
  console.log({ personEntries });
});
```

## Get entries stats by person idxid

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personIdxid = "123";

const entriesStats = IDXRestApi.entries.getEntriesStatsByPersonId(personIdxid);

entriesStats.then(entriesStats => {
  console.log({ entriesStats });
});
```

## Get entries stats by sources

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const entriesStats = IDXRestApi.entries.getEntriesStatsBySources({
  liveness: "passed",
});

entriesStats.then(entriesStats => {
  console.log({ entriesStats });
});
```

## Delete entry

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const entryId = 1;

const entry = IDXRestApi.entries.deleteEntry(entryId);

entry.then(() => {
  console.log("Entry was deleted!");
});
```
