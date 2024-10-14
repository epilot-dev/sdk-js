# @epilot/audit-logs-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/audit-logs-client.svg)](https://www.npmjs.com/package/@epilot/audit-logs-client-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/audit-logs-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/audit-logs-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Audit Logs API](https://docs.epilot.io/api/audit-logs)
tbw

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/audit-logs-client
```

## Usage

```typescript
import { getClient } from '@epilot/audit-logs-client';
const auditLogsClient = getClient();

const logs = await auditLogsClient.getLogs({ limit: 25, page: 2 });
```

## Documentation

tbw
