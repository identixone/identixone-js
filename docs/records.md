# Records API reference

## Identix API references

[Identix API](https://kb.identix.one/#/records)

!> Note that parameters documentation available on the links to Identix API references below.

## Get list of records

[Identix API](https://kb.identix.one/#/records?id=records-request)

```js
import IDXApi from "identix-api-lib-js";

const records = IDXApi.records.getRecords();

records.then(records => {
  console.log({ records });
});
```

## Get person records

```js
import IDXApi from "identix-api-lib-js";

const personId = 1;

const records = IDXApi.records.getRecordsByPersonId({
  id: personId,
  filters: { ha: true }
});

records.then(records => {
  console.log({ records });
});
```

## Delete record

[Identix API](https://kb.identix.one/#/records?id=record-deleting)

```js
import IDXApi from "identix-api-lib-js";

const recordId = 1;

const record = IDXApi.records.deleteRecord(recordId);

record.then(() => {
  console.log("Record was deleted!");
});
```
