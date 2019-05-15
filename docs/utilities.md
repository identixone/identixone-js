# Utilities API reference

## Identix API references

[Identix API](https://kb.identix.one/#/utilities)

!> Note that parameters documentation available on the links to Identix API references below.

## Compare persons in photos

[Identix API](https://kb.identix.one/#/utilities?id=comparison)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const comparingResult = IDXRestApi.utilities.comparePhotos({
  photo1: "dataURIPhoto",
  photo2: "dataURIPhoto",
  conf: "ha",
});

comparingResult.then(comparingResult => {
  console.log({ comparingResult });
});
```

## Compare person photo with person on document

[Identix API](https://kb.identix.one/#/utilities?id=comparison)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const comparingResult = IDXRestApi.utilities.comparePersonPhotoWithDocumentPhoto(
  {
    photo: "dataURIPhoto",
    conf: "ha",
    facesize: 2000,
    liveness: false,
  }
);

comparingResult.then(comparingResult => {
  console.log({ comparingResult });
});
```

## Verify person and document with parsing document fields

[Identix API](https://kb.identix.one/#/utilities?id=comparison)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const verifyingResult = IDXRestApi.utilities.verifyPersonPhotoWithDocumentPhoto(
  {
    photo1: "dataURIPhoto",
    photo2: "dataURIPhoto",
    conf: "ha",
    photo1_facesize: 2000,
    photo2_facesize: 2000,
    id_type: cze.drvlic.type1,
    conf: "exact",
    liveness_photo1: false,
  }
);

verifyingResult.then(verifyingResult => {
  console.log({ verifyingResult });
});
```

## Find out customer

[Identix API](https://kb.identix.one/#/utilities?id=who-is-a-customer)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const customer = IDXRestApi.utilities.findOutCustomer({
  source: "webcam",
  offset: 10,
});

comparingResult.then(customer => {
  console.log({ customer });
});
```
