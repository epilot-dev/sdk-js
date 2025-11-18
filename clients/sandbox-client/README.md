# @epilot/sandbox-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/sandbox-client.svg)](https://www.npmjs.com/package/@epilot/sandbox-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/sandbox-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/sandbox-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Sandbox API](https://docs.epilot.io/api/sandbox)

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/sandbox-client
```

## Usage

```typescript
import { getClient } from "@epilot/sandbox-client";

const sanboxClient = getClient();
const res = await sanboxClient.listPipelines();
```

## Documentation:

https://docs.epilot.io/api/sandbox
