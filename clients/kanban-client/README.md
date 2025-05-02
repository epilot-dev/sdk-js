# @epilot/workflow-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/workflow-client.svg)](https://www.npmjs.com/package/@epilot/workflow-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/workflow-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/workflow-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Kanban API](https://docs.epilot.io/api/kanban)

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/kanban-client
```

## Usage

```typescript
import { getClient } from '@epilot/kanban-client';

const workflowClient = getClient();
const res = await workflowClient.createExecution(null, {
  workflowId: 'my-id-123',
});
```

## Documentation

https://docs.epilot.io/docs/kanban
