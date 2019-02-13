# Records API reference

## Identix API references

[Identix API](https://kb.identix.one/#/records)

!> Note that parameters documentation available on the links to Identix API references below.

## Get list of records

[Identix API](https://kb.identix.one/#/records?id=records-request)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN
});

const haRecords = IDXRestApi.records.getRecords({ ha: true });

haRecords.then(haRecords => {
  console.log({ haRecords });
});
```

## Get person records

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN
});

const personId = 1;

const records = IDXRestApi.records.getRecordsByPersonId({
  personId,
  filters: { ha: true }
});

records.then(records => {
  console.log({ records });
});
```

## Delete record

[Identix API](https://kb.identix.one/#/records?id=record-deleting)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN
});

const recordId = 1;

const record = IDXRestApi.records.deleteRecord(recordId);

record.then(() => {
  console.log("Record was deleted!");
});
```
