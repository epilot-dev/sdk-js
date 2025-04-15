# @epilot/access-token-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/access-token-client.svg)](https://www.npmjs.com/package/@epilot/access-token-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/access-token-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/access-token-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Access Token API](https://docs.epilot.io/api/access-token)

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/access-token-client
```

## Usage

```typescript
import { getClient } from "@epilot/access-token";

const accessTokenClient = getClient();
const res = await accessTokenClient.listAccessTokens();
```

## Documentation:

https://docs.epilot.io/api/access-token
