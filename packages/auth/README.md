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
import { authenticate } from '@epilot/auth';
import entityClient from '@epilot/entity-client';

const credentials = await authenticate({
  username: 'email@example.com',
  password: 'xxx',
});
credentials.configureClient(entityClient);

await entityClient.createEntity('contact', { fist_name: 'Example', last_name: 'Contact' });

// entityClient will be authorized using epilot OAuth tokens
```

## Documentation

https://docs.epilot.io/docs/auth/authentication
