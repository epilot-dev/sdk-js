# @epilot/ai-agents-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/ai-agents-client.svg)](https://www.npmjs.com/package/@epilot/ai-agents-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/ai-agents-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/ai-agents-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Ai Agents API](https://docs.epilot.io/api/ai-agents-api)

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/ai-agents-client
```

## Usage

```typescript
import { getClient } from '@epilot/ai-agents-client';

const aiAgentsClient = getClient()
const res = await aiAgentsClient.listAgents()
```

## Documentation

<https://docs.epilot.io/api/ai-agents>
