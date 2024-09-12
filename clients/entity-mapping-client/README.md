# @epilot/entity-mapping-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
<!-- [![npm version](https://img.shields.io/npm/v/@epilot/entity-mapping-client.svg)](https://www.npmjs.com/package/@epilot/entity-mapping-client) -->
<!-- [![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/entity-mapping-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/entity-mapping-client) -->
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Entity API](https://docs.epilot.io/api/entity)

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/entity-mapping-client
```

## Usage

```typescript
import { getClient } from '@epilot/entity-mapping-client';
const entityMappingClient = getClient();

const getResponse = await entityMappingClient.getConfig(<mapping_config_id>);

## Documentation
https://docs.epilot.io
