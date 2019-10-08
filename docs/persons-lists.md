# Persons lists API reference

## Get persons lists

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personsLists = IDXRestApi.personsLists.getPersonsLists({
  q: "some search query here",
  limit: 20,
  offset: 0,
  idxids: ["749c9583-5ae9-4b72-a8f9-e1018d99af7e"],
  ids: [2, 7]
});

personsLists.then(personsLists => {
  console.log({ personsLists });
});
```

## Get persons list

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personsListId = 1;

const personsList = IDXRestApi.personsLists.getPersonsList(personsListId);

personsList.then(personsList => {
  console.log({ personsList });
});
```

## Create persons list

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personsList = IDXRestApi.personsLists.createPersonsList({
  name: "example_persons_list",
});

personsList.then(personsList => {
  console.log({ personsList });
});
```

## Delete persons list

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personsListId = 1;

const personsList = IDXRestApi.personsLists.deletePersonsList(personsListId);
```

## Get persons list persons

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personsListId = 1;

const personsListPersons = IDXRestApi.personsLists.getPersonsListPersons({
  id: personsListId,
  isExtended: false,
});

personsListPersons.then(personsListPersons => {
  console.log({ personsListPersons });
});
```

## Add many persons to one persons list

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personsListId = 1;

const personsListPersons = IDXRestApi.personsLists.addPersonsToPersonsList({
  listId: personsListId,
  persons: [
    "98aff267-93ed-449b-9124-d4d99c4c8400",
    "7d6ff12f-83a0-46ab-86f7-181558398bb2",
  ],
});
```

## Remove many persons from one persons list

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personsListId = 1;

const personsListPersons = IDXRestApi.personsLists.removePersonsFromPersonsList(
  {
    listId: personsListId,
    persons: [
      "98aff267-93ed-449b-9124-d4d99c4c8400",
      "7d6ff12f-83a0-46ab-86f7-181558398bb2",
    ],
  }
);
```

## Add many persons to many persons lists

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personsListPersons = IDXRestApi.personsLists.addPersonsToPersonsLists({
  listIds: [1, 4, 5],
  persons: [
    "98aff267-93ed-449b-9124-d4d99c4c8400",
    "7d6ff12f-83a0-46ab-86f7-181558398bb2",
  ],
});
```

## Remove many persons from many persons list

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personsListPersons = IDXRestApi.personsLists.removePersonsFromPersonsLists(
  {
    listIds: [1, 4, 5],
    persons: [
      "98aff267-93ed-449b-9124-d4d99c4c8400",
      "7d6ff12f-83a0-46ab-86f7-181558398bb2",
    ],
  }
);
```
