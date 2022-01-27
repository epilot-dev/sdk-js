# @epilot/entity-client

Client library for epilot [Entity API](https://docs.epilot.io/api/entity)

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/entity-client
```

## Usage

```typescript
import { getClient } from '@epilot/entity-client';

// get typed client
const client = await getClient();

// call operations
const createRes = await client.createEntity({ slug: "contact" }, { name: "viljami" });
const { id } = creteRes.data;

const getRes = await client.getEntity(id);
const { entity } = getRes.data;
```

## Documentation

https://docs.epilot.io/docs/entities/entity-api

