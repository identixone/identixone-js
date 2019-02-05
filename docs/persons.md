# Persons API reference

## Identix API references

[Identix API](https://kb.identix.one/#/personas)

!> Note that parameters documentation available on the links to Identix API references below.

## Create person

[Identix API](https://kb.identix.one/#/personas?id=persona-creation-with-an-image)

```js
import IDXApi from "identix-api-lib-js";

const person = IDXApi.persons.createPerson({
  photo: "dataURIPhoto",
  source: "webcam",
  facesize: 10,
  create_on_ha: true,
  create_on_junk: false,
  asm: true
});

person.then(person => {
  console.log({ person });
});
```

## Delete person

[Identix API](https://kb.identix.one/#/personas?id=persona-removal-from-the-database)

```js
import IDXApi from "identix-api-lib-js";

const personId = 1;

const person = IDXApi.persons.deletePerson(personId);

person.then(() => {
  console.log("Person was deleted!");
});
```

## Search person by image

[Identix API](https://kb.identix.one/#/personas?id=persona-search-by-image)

```js
import IDXApi from "identix-api-lib-js";

const person = IDXApi.persons.searchPersonByImage({
  photo: "dataURIPhoto",
  asm: true,
  liveness: false
});

person.then(person => {
  console.log({ person });
});
```

## Reinitialize person by record

[Identix API](https://kb.identix.one/#/personas?id=reinitialization-by-record)

```js
import IDXApi from "identix-api-lib-js";

const recordId = 1;

const person = IDXApi.persons.reinitializePersonByRecord({
  recordId,
  facesize: 100
});

person.then(person => {
  console.log({ person });
});
```

## Reinitialize person by image

[Identix API](https://kb.identix.one/#/personas?id=reinitialization-by-image)

```js
import IDXApi from "identix-api-lib-js";

const personId = 1;

const person = IDXApi.persons.reinitializePersonByImage({
  personId,
  photo: "dataURIPhoto",
  source: "webcam",
  facesize: 100,
  conf: "ha"
});

person.then(person => {
  console.log({ person });
});
```
