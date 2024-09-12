# @epilot/template-variables-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/template-variables-client.svg)](https://www.npmjs.com/package/@epilot/template-variables-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/template-variables-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/template-variables-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

API Client for epilot [Template Variables API](https://docs.epilot.io/api/template-variables).

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/template-variables-client
```

## Usage

```typescript
import { getClient } from '@epilot/template-variables-client';
const templateVariablesClient = getClient();
const getResponse = await templateVariablesClient.getCategories({ lang: 'de'});
```

## Documentation

https://docs.epilot.io/docs/messaging/template-variables
