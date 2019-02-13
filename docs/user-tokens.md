# User tokens API reference

## Identix API references

[Identix API](https://kb.identix.one/#/authorization)

!> Note that parameters documentation available on the links to Identix API references below.

## Generate token

[Identix API](https://kb.identix.one/#/authorization?id=token-generation)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN
});

const token = IDXRestApi.auth.generateToken();

token.then(token => {
  console.log({ token });
});
```

## Generate permanent token

[Identix API](https://kb.identix.one/#/authorization?id=token-generation)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN
});

const permanentToken = IDXRestApi.auth.generatePermanentToken();

permanentToken.then(permanentToken => {
  console.log({ permanentToken });
});
```

## Activate/Deactivate token

[Identix API](https://kb.identix.one/#/authorization?id=token-deactivationactivation)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN
});

const tokenId = 1;

const token = IDXRestApi.users.updateToken({ id: tokenId, isActive: false });

token.then(token => {
  console.log({ token });
});
```

## Delete user token

[Identix API](https://kb.identix.one/#/authorization?id=deleting-a-token)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN
});

const tokenId = 1;

const token = IDXRestApi.users.deleteToken(tokenId);

token.then(() => {
  console.log("Token was deleted!");
});
```

## Delete user tokens

[Identix API](https://kb.identix.one/#/authorization?id=deleting-all-users-tokens)

```js
import { createIDXRestApi } from "@identixone/api";

const IDXRestApi = createIDXRestApi({
  version: 1,
  token: IDENTIXONE_TOKEN
});

const tokens = IDXRestApi.users.deleteToken({ permanent: true });

tokens.then(() => {
  console.log("All permanent tokens were deleted!");
});
```
