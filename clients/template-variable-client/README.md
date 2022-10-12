# `@epilot/template-variables-client`

API Client for epilot template-variables API.

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Getting Started

Install the package:

```bash
npm install --save-dev @epilot/template-variables-client
```

Import the package:

```typescript
import { getClient } from '@epilot/template-variables-client';
```

Use the client:
```typescript
// get typed client
const client = await getClient();

// call an operation
const res = await client.testS3();
```

## BaseURL & Authorization

To pass an authorization header and set up the API url, you can use axios
defaults:

```typescript
const client = getClient();
client.defaults.baseURL = config.ENTITY_API_URL;
client.defaults.headers['authorization'] = `Bearer ${token}`;
```

## API Docs:

https://docs.api.epilot.io/
