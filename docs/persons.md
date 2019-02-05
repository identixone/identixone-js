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
  photo: "dataURIPhoto"
});

person.then(person => {
  console.log({ person });
});
```
