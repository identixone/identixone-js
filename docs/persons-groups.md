# Persons groups API reference

## Get persons groups

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personsGroups = IDXRestApi.personsGroups.getPersonsGroups({
  q: "some search query here",
  limit: 20,
  offset: 0,
  idxids_include: ["749c9583-5ae9-4b72-a8f9-e1018d99af7e"],
  idxids_exclude: ["98aff267-93ed-449b-9124-d4d99c4c8400"],
  groups_ids: [2, 7],
});

personsGroups.then(personsGroups => {
  console.log({ personsGroups });
});
```

## Get persons group

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personsGroupId = 1;

const personsGroup = IDXRestApi.personsGroups.getPersonsGroup(personsGroupId);

personsGroup.then(personsGroup => {
  console.log({ personsGroup });
});
```

## Create persons group

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personsGroup = IDXRestApi.personsGroups.createPersonsGroup({
  name: "example_persons_group",
});

personsGroup.then(personsGroup => {
  console.log({ personsGroup });
});
```

## Update persons group

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personsGroupId = 1;

const personsGroup = IDXRestApi.personsGroups.updatePersonsGroup({
  id: personGroupId,
  name: "new_awesome_name",
});
```

## Delete persons group

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personsGroupId = 1;

const personsGroup = IDXRestApi.personsGroups.deletePersonsGroup(
  personsGroupId
);
```

## Get persons group persons

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personsGroupId = 1;

const personsGroupPersons = IDXRestApi.personsGroups.getPersonsGroupPersons({
  groupId: personsGroupId,
  idxids: [
    "98aff267-93ed-449b-9124-d4d99c4c8400",
    "7d6ff12f-83a0-46ab-86f7-181558398bb2",
  ],
});

personsGroupPersons.then(personsGroupPersons => {
  console.log({ personsGroupPersons });
});
```

## Add many persons to many persons groups

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personsGroupPersons = IDXRestApi.personsGroups.addPersonsToPersonsGroups({
  groupsIds: [1, 4, 5],
  persons: [
    "98aff267-93ed-449b-9124-d4d99c4c8400",
    "7d6ff12f-83a0-46ab-86f7-181558398bb2",
  ],
});
```

## Remove many persons from many persons group

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const personsGroupPersons = IDXRestApi.personsGroups.removePersonsFromPersonsGroups(
  {
    groupsIds: [1, 4, 5],
    persons: [
      "98aff267-93ed-449b-9124-d4d99c4c8400",
      "7d6ff12f-83a0-46ab-86f7-181558398bb2",
    ],
  }
);
```
