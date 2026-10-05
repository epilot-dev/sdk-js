# @epilot/external-values-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/external-values-client.svg)](https://www.npmjs.com/package/@epilot/external-values-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/external-values-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/external-values-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for the epilot External Values API: lists the External Values hooks of the apps installed in an organization and resolves a hook's typed results for a given context.

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/external-values-client
```

## Usage

```typescript
import { getClient } from '@epilot/external-values-client';
const externalValuesClient = getClient();

const { data } = await externalValuesClient.listExternalValues();

const { data: resolved } = await externalValuesClient.resolveExternalValue(
  { app_id: '<app-id>', hook_id: '<hook-id>' },
  { context: { input: 1234 } },
);
```

## API Docs:

https://docs.api.epilot.io
