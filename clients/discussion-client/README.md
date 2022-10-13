# @epilot/discussion-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/discussion-client.svg)](https://www.npmjs.com/package/@epilot/discussion-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/discussion-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/discussion-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

API Client for epilot [Discussion API](https://docs.epilot.io/api/discussion).

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/discussion-client
```

## Usage

```typescript
import { getClient } from '@epilot/discussion-client';
const discussionClient = getClient();
const createResponse = await discussionClient.createComment(null, {
  content: 'Hello World!',
  context_id: '0bb1495f-3e3d-455b-9cc6-6e0c4779b351',
});
```

## Documentation

https://docs.epilot.io/docs/discussion
