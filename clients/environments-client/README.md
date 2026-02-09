# @epilot/environments-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/environments-client.svg)](https://www.npmjs.com/package/@epilot/environments-client-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/environments-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/environments-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Environments API](https://docs.epilot.io/api/environments)
tbw

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/environments-client
```

## Usage

```typescript
import { getClient } from '@epilot/environments-client';
const environmentsClient = getClient();

const logs = await environmentsClient.listEnvironmentVariables()
```

## API Docs:

https://docs.api.epilot.io