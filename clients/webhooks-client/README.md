# @epilot/webhooks-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/webhooks-client.svg)](https://www.npmjs.com/package/@epilot/webhooks-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/webhooks-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/workflow-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Webhooks API](https://docs.epilot.io/api/webhooks)

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/webhooks-client
```

## Usage

```typescript
import { getClient } from "@epilot/webhooks-client";

const webhooksClient = getClient();
const res = awaitwebhooksClient.getConfig(null, {
  configId: "my-id-123",
});
```

## Documentation

https://docs.epilot.io/docs/webhooks
