# @epilot/presence-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/presence-client.svg)](https://www.npmjs.com/package/@epilot/presence-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/presence-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/presence-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Presence API](https://docs.epilot.io/api/presence): who else has a resource open in an epilot builder, and whether they are viewing or editing it.

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios).

## Installation

```bash
npm install --save @epilot/presence-client
```

## Usage

```typescript
import { getClient } from "@epilot/presence-client";

const presenceClient = getClient();
const { data } = await presenceClient.heartbeatPresence(
  { resource_type: "journey", resource_id: "5da0a718-c822-403d-9f5d-20d4584e0528" },
  { session_id: "f7c1b2a0-3e4d-4c8e-9a1b-2d3e4f5a6b7c", state: "viewing" },
);
```

## Documentation

https://docs.epilot.io/api/presence
