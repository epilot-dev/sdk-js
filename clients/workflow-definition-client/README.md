# @epilot/workflow-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/workflow-definition-client.svg)](https://www.npmjs.com/package/@epilot/workflow-definition-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/workflow-definition-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/workflow-definition-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Workflow Definition API](https://docs.epilot.io/api/workflow-definition)

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/workflow-definition-client
```

## Usage

```typescript
import { getClient } from '@epilot/workflow-definition-client';

const workflowClient = getClient();
const res = await workflowClient.getDefinitions()
```

## Documentation

https://docs.epilot.io/docs/workflows
