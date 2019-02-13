# Authorization API reference

## Identix API references

[Identix API](https://kb.identix.one/#/authorization)

## Login

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN
});

const username = "Jane Doe";
const password = "04.09.2001";

const userWithToken = IDXRestApi.auth.login(username, password);

notification.then(userWithToken => {
  console.log({ userWithToken });
});
```

## Logout

!> Note that you got token Id with login response.

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN
});

const tokenId = 12;

const logout = IDXRestApi.auth.logout(tokenId);

logout.then(() => {
  console.log("Logout successful!");
});
```
