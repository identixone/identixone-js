# Utilities API reference

## Identix API references

[Identix API](https://kb.identix.one/#/utilities)

!> Note that parameters documentation available on the links to Identix API references below.

## Compare people in photos

[Identix API](https://kb.identix.one/#/utilities?id=comparison)

```js
import IDXApi from "identix-api-lib-js";

const comparingResult = IDXApi.utilities.comparePhotos({
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
import IDXApi from "identix-api-lib-js";

const customer = IDXApi.utilities.findOutCustomer({
  source: "webcam",
  offset: 10
});

comparingResult.then(customer => {
  console.log({ customer });
});
```
