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
  asm: true
});

comparingResult.then(comparingResult => {
  console.log({ utilcomparingResultities });
});
```
