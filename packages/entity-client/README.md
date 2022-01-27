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
const createResponse = await client.createEntity({ slug: 'contact' }, { first_name: 'Example', last_name: 'Entity' });
const getResponse = await client.getEntity({ slug: 'contact', id: createResponse.data._id });
```

## Documentation

https://docs.epilot.io/docs/entities/entity-api

