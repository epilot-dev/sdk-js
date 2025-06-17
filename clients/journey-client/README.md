# `@epilot/journey-client`

API Client for epilot journey API.

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Getting Started

Install the package:

```bash
npm install --save-dev @epilot/journey-client
```

Import the package:

```typescript
import { getClient } from '@epilot/journey-client';
```

Use the client:
```typescript
// get typed client
const client = await getClient();

// call an operation
const res = await client.getJourney('123');
```

## BaseURL & Authorization

To pass an authorization header and set up the API url, you can use axios
defaults:

```typescript
const client = getClient();
client.defaults.baseURL = config.API_URL;
client.defaults.headers['authorization'] = `Bearer ${token}`;
```

## API Docs:

https://docs.epilot.io/api/journey
