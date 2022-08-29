<h1 align="center"><img alt="epilot-logo" src="./logo.png" width="200"><br>epilot-sdk</h1>

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/epilot-sdk.svg)](https://www.npmjs.com/package/epilot-sdk)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/epilot-dev/sdk-js.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/epilot-dev/sdk-js/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/epilot-dev/sdk-js.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/epilot-dev/sdk-js/context:javascript)

>  ⚠️ **DISCLAIMER!**
>
> The epilot SDK is in `beta`. Missing features, incomplete documentation and breaking API changes are to be expected!

## Quick Start

```sh
npm install --save epilot-sdk
```

```typescript
import { authorizeWithToken } from 'epilot-sdk/auth';
import entityClient from 'epilot-sdk/entity-client';

// authorize client using an access token
authorizeWithToken(entityClient, '<my_access_token>');

// use epilot client
await entityClient.createEntity('contact', { first_name: 'Example', last_name: 'Contact' });
```

# Documentation

- [epilot-sdk Docs](https://docs.epilot.io/docs/architecture/sdk)
- [epilot-sdk Reference](https://docs.epilot.io/api)

# Updating clients (epilot internal)

To update a client package with a new API definition, you should have made the changes already on the current API repo.

⚠️  Never modify a client `openapi.json` directly, such approach will most certainly lead to you losing your changes on a future release.

```bash
## navigate into you client folder
cd clients/entity-client

## update openapi.json with the new API spec (if already deployed to prod)
npm run openapi

## shortcut: if the desired openapi spec is still deploying, but will be in prod soon.
npm run openapi <path/to/local/openapi.yml>

## build and generate new types
npm run typegen && npm run build

## commit your changes
git commit -am 'chore(entity-client): update client with new spec'

## push, tag & release
## ensure you are only bumping the package your changed & the epilot-sdk.
npx lerna publish
```

Depending on whether you have publish access to [epilot-sdk](https://www.npmjs.com/package/epilot-sdk) registry repo or not `epilot-sdk` may fail with 403, which will leave some unstaged package.json's with a gitHead entry. Feel free to discard those files–the pipeline will pick up the changes an publish the `epilot-sdk` automatically.

# Contributing

The epilot Javascript SDK is free and open source software. PRs welcome!

🚀


