# Persons API reference

## Identix API references

[Identix API](https://kb.identix.one/#/personas)

!> Note that parameters documentation available on the links to Identix API references below.

## Create person

[Identix API](https://kb.identix.one/#/personas?id=persona-creation-with-an-image)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const person = IDXRestApi.persons.createPerson({
  photo: "dataURIPhoto",
  source: "webcam",
  facesize: 10,
  create_on_ha: true,
  create_on_junk: false,
  asm: true,
});

person.then(person => {
  console.log({ person });
});
```

## Delete person

[Identix API](https://kb.identix.one/#/personas?id=persona-removal-from-the-database)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personId = 1;

const person = IDXRestApi.persons.deletePerson(personId);

person.then(() => {
  console.log("Person was deleted!");
});
```

## Search person by image

[Identix API](https://kb.identix.one/#/personas?id=persona-search-by-image)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const person = IDXRestApi.persons.searchPersonByImage({
  photo: "dataURIPhoto",
  asm: true,
  liveness: false,
});

person.then(person => {
  console.log({ person });
});
```

## Reinitialize person by record

[Identix API](https://kb.identix.one/#/personas?id=reinitialization-by-record)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const recordId = 1;

const person = IDXRestApi.persons.reinitializePersonByRecord({
  recordId,
  facesize: 100,
});

person.then(person => {
  console.log({ person });
});
```

## Reinitialize person by image

[Identix API](https://kb.identix.one/#/personas?id=reinitialization-by-image)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personId = 1;

const person = IDXRestApi.persons.reinitializePersonByImage({
  personId,
  photo: "dataURIPhoto",
  source: "webcam",
  facesize: 100,
  conf: "ha",
});

person.then(person => {
  console.log({ person });
});
```
