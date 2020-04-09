# Users API reference

## Identix API references

[Identix API](https://kb.identix.one/#/authorization)

!> Note that parameters documentation available on the links to Identix API references below.

## Get current user

[Identix API](https://kb.identix.one/#/authorization?id=user-name-and-group)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const user = IDXRestApi.users.getUser();

user.then((user) => {
  console.log({ user });
});
```

## Change current user password

[Identix API](https://kb.identix.one/#/authorization?id=password-change)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN,
});

const result = IDXRestApi.users.changePassword({
  old_password: "your_old_pass",
  password: "your_new_pass",
  password2: "your_new_pass",
});

result.then((result) => {
  console.log({ result });
});
```
