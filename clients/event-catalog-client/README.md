# @epilot/event-catalog-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/event-catalog-client.svg)](https://www.npmjs.com/package/@epilot/event-catalog-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/event-catalog-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/event-catalog-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Event Catalog API](https://docs.epilot.io/api/event-catalog)

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/event-catalog-client
```

## Usage

```typescript
import { getClient } from "@epilot/event-catalog-client";

const sanboxClient = getClient();
const res = await sanboxClient.listEvents();
```

## Documentation:

https://docs.epilot.io/api/event-catalog
