# @epilot/app-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/app-client.svg)](https://www.npmjs.com/package/@epilot/app-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/app-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/app-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

tbw

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/app-client
```

## Usage

```typescript
import { getClient } from '@epilot/app-client';
const appClient = getClient();

const logs = await appClient.getLogs({ limit: 25, page: 2 });
```

## Documentation

tbw
