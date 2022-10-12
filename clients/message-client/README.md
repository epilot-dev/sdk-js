# `@epilot/message-client`

API Client for epilot Message API.

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Getting Started

Install the package:

```bash
npm install --save-dev @epilot/message-client
```

Import the package:

```typescript
import { getClient } from '@epilot/message-client';
```

Use the client:
```typescript
// get typed client
const client = await getClient();
```

## BaseURL & Authorization

To pass an authorization header and set up the API url, you can use axios
defaults:

```typescript
const client = getClient();
client.defaults.baseURL = config.ENTITY_API_URL;
client.defaults.headers.common['authorization'] = `Bearer ${token}`;
```

## API Docs:

https://docs.api.epilot.io/
