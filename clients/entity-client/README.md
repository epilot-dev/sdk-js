# @epilot/entity-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/entity-client.svg)](https://www.npmjs.com/package/@epilot/entity-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/entity-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/entity-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Entity API](https://docs.epilot.io/api/entity)

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/entity-client
```

## Usage

```typescript
import { getClient } from '@epilot/entity-client';
const entityClient = getClient();

const createResponse = await entityClient.createEntity({ slug: 'contact' }, { first_name: 'Example', last_name: 'Entity' });
const getResponse = await entityClient.getEntity({ slug: 'contact', id: createResponse.data._id });
```

## Documentation

https://docs.epilot.io/docs/entities/entity-api
