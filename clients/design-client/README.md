# @epilot/design-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/design-client.svg)](https://www.npmjs.com/package/@epilot/design-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/design-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/design-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Design API](https://docs.epilot.io/api/design)

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/design-client
```

## Usage

```typescript
import { getClient } from "@epilot/design-client";

const blueprintManifestClient = getClient();
const res = await blueprintManifestClient.getDesign('4a062990-a6a3-11eb-9828-4f3da7d4935a');
```

## Documentation:

https://docs.epilot.io/api/blueprints
