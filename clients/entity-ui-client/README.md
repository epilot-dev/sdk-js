# @epilot/entity-ui-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/entity-ui-client.svg)](https://www.npmjs.com/package/@epilot/entity-ui-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for the epilot [Entity UI API](https://docs.epilot.io/api/entity-ui): stores the definitions of AI
widgets rendered on entity pages.

A widget definition is immutable and content-addressed: its `ref` is the SHA-256 of the definition's canonical JSON,
scoped to the caller's organization, so storing the same definition twice returns the same `ref`.

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/entity-ui-client
```

## Usage

```typescript
import { getClient } from "@epilot/entity-ui-client";

const entityUiClient = getClient();

const { data: stored } = await entityUiClient.putWidgetDefinition(null, widgetDefinition);
const { data: definition } = await entityUiClient.getWidgetDefinition({ ref: stored.ref });
const { data: batch } = await entityUiClient.batchGetWidgetDefinitions(null, { refs: [stored.ref] });
```

## Documentation:

https://docs.epilot.io/api/entity-ui
