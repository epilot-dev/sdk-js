# `@epilot/billing-client`

API Client for epilot Billing API.

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Getting Started

Install the package:

```bash
npm install --save-dev @epilot/billing-client
```

Import the package:

```typescript
import { getClient } from '@epilot/billing-client';
```

Use the client:
```typescript
// get typed client
const client = await getClient();

// call an operation
const res = await client.testAuth();
```

## BaseURL & Authorization

To pass an authorization header and set up the API url, you can use axios
defaults:

```typescript
const client = getClient();
client.defaults.baseURL = config.CUSTOMER_PORTAL_API;
client.defaults.headers['authorization'] = `Bearer ${token}`;
```

## API Docs:

https://docs.api.epilot.io/
