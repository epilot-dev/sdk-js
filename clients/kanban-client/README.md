# @epilot/kanban-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/kanban-client.svg)](https://www.npmjs.com/package/@epilot/kanban-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/kanban-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/kanban-client)
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

const kanbanClient = getClient();
const res = await kanbanClient.getKanbanBoards(null);
```

## Documentation

https://docs.epilot.io/docs/kanban
