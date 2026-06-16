# @epilot/snapshot-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/snapshot-client.svg)](https://www.npmjs.com/package/@epilot/snapshot-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/snapshot-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/snapshot-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Snapshot API](https://docs.epilot.io/api/snapshot).

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios).

## Installation

```bash
npm install --save @epilot/snapshot-client
```

## Usage

```typescript
import { getClient } from "@epilot/snapshot-client";

const snapshotClient = getClient();
const res = await snapshotClient.getSnapshot('snap-01ABC...');
```

## Documentation

https://docs.epilot.io/api/snapshot
