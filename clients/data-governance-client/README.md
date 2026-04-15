# @epilot/data-governance-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/data-governance-client.svg)](https://www.npmjs.com/package/@epilot/data-governance-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/data-governance-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/data-governance-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot Data Governance API

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/data-governance-client
```

## Usage

```typescript
import { getClient } from '@epilot/data-governance-client';

const dataGovernanceClient = getClient();
// Example:
// const res = await dataGovernanceClient.someOperation();
```

## Generate from OpenAPI

Use the local OpenAPI source:

```bash
pnpm --filter @epilot/data-governance-client run openapi:local && pnpm --filter @epilot/data-governance-client run typegen
```

Or (if available) fetch from docs:

```bash
pnpm --filter @epilot/data-governance-client run openapi && pnpm --filter @epilot/data-governance-client run typegen
```


