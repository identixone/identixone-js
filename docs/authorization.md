# Authorization API reference

## Identix API references

[Identix API](https://kb.identix.one/#/authorization)

## Login

```js
import IDXApi from "identix-api-lib-js";

const username = "Jane Doe";
const password = "04.09.2001";

const userWithToken = IDXApi.auth.login(username, password);

notification.then(userWithToken => {
  console.log({ userWithToken });
});
```

## Logout

!> Note that you got token Id with login response.

```js
import IDXApi from "identix-api-lib-js";

const tokenId = 12;

const logout = IDXApi.auth.logout(tokenId);

logout.then(() => {
  console.log("Logout successful!");
});
```
