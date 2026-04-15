# @epilot/query-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/query-client.svg)](https://www.npmjs.com/package/@epilot/query-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/query-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/query-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Query API](https://docs.epilot.io/api/query)

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/query-client
```

## Usage

```typescript
import { getClient } from "@epilot/query-client";

const queryClient = getClient();
const res = await queryClient.executeEntitiesQuery(null, { measures: [...], dimensions: [...] });
```

## Documentation:

https://docs.epilot.io/api/query
