# @epilot/dashboard-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/dashboard-client.svg)](https://www.npmjs.com/package/@epilot/dashboard-client-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/dashboard-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/dashboard-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Dashboard API](https://docs.epilot.io/api/dashboard)
tbw

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/dashboard-client
```

## Usage

```typescript
import { getClient } from '@epilot/dashboard-client';
const dashboardClient = getClient();

const logs = await dashboardClient.listEnvironmentVariables()
```