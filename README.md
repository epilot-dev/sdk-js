# epilot-sdk
[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/epilot-sdk.svg)](https://www.npmjs.com/package/epilot-sdk)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

SDK monorepo for epilot

## Quick Start

```sh
npm install --save epilot-sdk
```

```typescript
import { authenticate } from 'epilot-sdk/auth';
import entityClient from 'epilot-sdk/entity-client';

const credentials = await authenticate({
  username: 'email@example.com',
  password: 'xxx',
});
credentials.configureClient(entityClient);

await entityClient.createEntity('contact', { fist_name: 'Example', last_name: 'Contact' });
```

## Documentation

https://docs.epilot.io/docs/architecture/sdk
