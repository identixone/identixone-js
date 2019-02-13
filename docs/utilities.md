# Utilities API reference

## Identix API references

[Identix API](https://kb.identix.one/#/utilities)

!> Note that parameters documentation available on the links to Identix API references below.

## Compare people in photos

[Identix API](https://kb.identix.one/#/utilities?id=comparison)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN
});

const comparingResult = IDXRestApi.utilities.comparePhotos({
  photo1: "dataURIPhoto",
  photo2: "dataURIPhoto",
  conf: "ha"
});

comparingResult.then(comparingResult => {
  console.log({ comparingResult });
});
```

## Find out customer

[Identix API](https://kb.identix.one/#/utilities?id=who-is-a-customer)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN
});

const customer = IDXRestApi.utilities.findOutCustomer({
  source: "webcam",
  offset: 10
});

comparingResult.then(customer => {
  console.log({ customer });
});
```
