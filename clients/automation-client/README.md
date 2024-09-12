# @epilot/automation-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=automation%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/automation-client.svg)](https://www.npmjs.com/package/@epilot/automation-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/automation-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/automation-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Workflow API](https://docs.epilot.io/api/automation)

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/automation-client
```

## Usage

```typescript
import { getClient } from "@epilot/automation-client";

const automationClient = getClient();
const res = await automationClient.searchFlows(null, {
  schema: "mySchema",
});
```

## Documentation

https://docs.epilot.io/docs/automation/intro
