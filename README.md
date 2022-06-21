# epilot-sdk

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI) [![npm version](https://img.shields.io/npm/v/epilot-sdk.svg)](https://www.npmjs.com/package/epilot-sdk) [![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

>  ⚠️ **DISCLAIMER!**
>
> The epilot SDK is in `alpha`. Missing features, incomplete documentation and breaking API changes are to be expected!

## Quick Start

```sh
npm install --save epilot-sdk
```

```typescript
import { authenticate } from 'epilot-sdk/auth';
import entityClient from 'epilot-sdk/entity-client';

// authenticate your epilot module
const credentials = await authenticate({
  username: 'email@example.com',
  password: 'xxx',
});
credentials.configureClient(entityClient);

// use your epilot module (entity module)
await entityClient.createEntity('contact', { first_name: 'Example', last_name: 'Contact' });
```

# Documentation

- [epilot-sdk Docs](https://docs.epilot.io/docs/architecture/sdk)
- [epilot-sdk Reference](https://docs.epilot.io/api)

# Contributing

ℹ️ Contributions are limited to epilot core maintainers.

## Updating a client against a new API spec

To update a client SDK against a new API spec, you should have made the changes already on the current API repo.
⚠️ Never modify a client `openapi.json` directly, such approach will most certainly lead to you losing your changes on a future release.

```bash
npm i

## navigate into you client folder
cd clients/entity-client

## update openapi.json with the new API spec (if already deployed to prod)
npm run openapi

## shortcut: if the desired openapi spec is still deploying, but will be in prod soon.
## make sure you discard the *hunk* regarding the openapi server which now points to your local on `openapi.json`.
../../scripts/update-openapi.sh http://localhost:3001/openapi.json

## after updating and reviewing your freshly updated openapi.json
## perform the type regeneration
npm run typegen

## from the root directory, perform a build
npm run build

## commit your changes
git commit -am 'chore(entity-client): updating client against new spec'

## push, tag & release
## ensure you are only bumping the package your changed & the epilot-sdk.
npx lerna publish
```

Depending on whether you have publish access to epilot-sdk registry repo or not `epilot-sdk` may fail with 403, which will leave some unstaged package.json's with a gitHead entry. Feel free to discard those files–the pipeline will pick up the changes an publish the `epilot-sdk` automatically.
