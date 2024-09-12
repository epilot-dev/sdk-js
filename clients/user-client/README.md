# @epilot/user-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/user-client.svg)](https://www.npmjs.com/package/@epilot/user-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/user-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/user-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [User API](https://docs.epilot.io/api/user).

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```sh
npm install --save-dev @epilot/user-client
```

## Usage

```typescript
import { getClient } from '@epilot/user-client';

const userCLient = getClient();
const currentUser = await userClient.getMe().then(res => res.data);
```

## Documentation

https://docs.epilot.io/api/user
