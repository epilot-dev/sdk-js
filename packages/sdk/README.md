# epilot-sdk
[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/epilot-sdk.svg)](https://www.npmjs.com/package/epilot-sdk)
[![bundle size](https://img.shields.io/bundlephobia/minzip/epilot-sdk?label=gzip%20bundle)](https://bundlephobia.com/package/epilot-sdk)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

JavaScript / TypeScript SDK for epilot

## Quick Start

```sh
npm install --save epilot-sdk
```

```typescript
import { authenticate, authorizeClient } from 'epilot-sdk/auth';
import { getClient } from 'epilot-sdk/entity';

const credentials = await authenticate({
  username: 'email@example.com',
  password: 'xxx',
});

const entityClient = await getClient()
  .then(authorizeClient(credentials))

await entityClient.createEntity('contact', { fist_name: 'Example', last_name: 'Contact' });
```

## Documentation

https://docs.epilot.io/docs/architecture/sdk
