# User tokens API reference

## Identix API references

[Identix API](https://kb.identix.one/#/authorization)

!> Note that parameters documentation available on the links to Identix API references below.

## Generate token

[Identix API](https://kb.identix.one/#/authorization?id=token-generation)

```js
import IDXApi from "identix-api-lib-js";

const token = IDXApi.auth.generateToken();

token.then(token => {
  console.log({ token });
});
```

## Generate permanent token

[Identix API](https://kb.identix.one/#/authorization?id=token-generation)

```js
import IDXApi from "identix-api-lib-js";

const permanentToken = IDXApi.auth.generatePermanentToken();

permanentToken.then(permanentToken => {
  console.log({ permanentToken });
});
```

## Activate/Deactivate token

[Identix API](https://kb.identix.one/#/authorization?id=token-deactivationactivation)

```js
import IDXApi from "identix-api-lib-js";

const tokenId = 1;

const token = IDXApi.users.updateToken({ id: tokenId, isActive: false });

token.then(token => {
  console.log({ token });
});
```

## Delete user token

[Identix API](https://kb.identix.one/#/authorization?id=deleting-a-token)

```js
import IDXApi from "identix-api-lib-js";

const tokenId = 1;

const token = IDXApi.users.deleteToken(tokenId);

token.then(() => {
  console.log("Token was deleted!");
});
```

## Delete user tokens

[Identix API](https://kb.identix.one/#/authorization?id=deleting-all-users-tokens)

```js
import IDXApi from "identix-api-lib-js";

const tokens = IDXApi.users.deleteToken({ permanent: true });

tokens.then(() => {
  console.log("All permanent tokens were deleted!");
});
```
