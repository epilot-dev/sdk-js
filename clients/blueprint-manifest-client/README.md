# @epilot/blueprint-manifest-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/blueprint-manifest-client.svg)](https://www.npmjs.com/package/@epilot/blueprint-manifest-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/blueprint-manifest-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/blueprint-manifest-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Blueprint Manifest API](https://docs.epilot.io/api/blueprint-manifest)

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/blueprint-manifest-client
```

## Usage

```typescript
import { getClient } from "@epilot/blueprint-manifest";

const blueprintManifestClient = getClient();
const res = await blueprintManifestClient.getJob('my-job');
```

## Documentation:

https://docs.epilot.io/api/blueprints
