# epilot-sdk
[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/epilot-sdk.svg)](https://www.npmjs.com/package/epilot-sdk)
[![bundle size](https://img.shields.io/bundlephobia/minzip/epilot-sdk?label=gzip%20bundle)](https://bundlephobia.com/package/epilot-sdk)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

JavaScript / TypeScript SDK for epilot

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

## Documentation

https://docs.epilot.io/docs/architecture/sdk
