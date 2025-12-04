# @epilot/data-management-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/data-management-client.svg)](https://www.npmjs.com/package/@epilot/data-management-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/data-management-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/data-management-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot Data Management API

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/data-management-client
```

## Usage

```typescript
import { getClient } from '@epilot/data-management-client';

const dataManagementClient = getClient();
// Example:
// const res = await dataManagementClient.someOperation();
```

## Generate from OpenAPI

Use the local OpenAPI source:

```bash
pnpm --filter @epilot/data-management-client run openapi:local && pnpm --filter @epilot/data-management-client run typegen
```

Or (if available) fetch from docs:

```bash
pnpm --filter @epilot/data-management-client run openapi && pnpm --filter @epilot/data-management-client run typegen
```


