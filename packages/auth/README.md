# @epilot/auth

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/auth.svg)](https://www.npmjs.com/package/@epilot/auth)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/auth?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/auth)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Authenticate with epilot APIs

## Quick Start

```sh
npm install --save @epilot/auth
```

```typescript
import { authorizeWithToken } from '@epilot/auth';
import entityClient from '@epilot/entity-client';

authorizeWithToken(entityClient, '<my_access_token>');
```

## CLI Usage

For convenience, you can quickly obtain a token for testing via the CLI

```sh
$ npx @epilot/auth

? Email email@example.com
? Password [hidden]

# <access token printed here>
```

## Documentation

https://docs.epilot.io/docs/auth/authentication
