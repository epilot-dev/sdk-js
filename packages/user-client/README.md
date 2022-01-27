# @epilot/user-client

Client library for epilot [User API](https://docs.epilot.io/api/user).

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Getting Started

Install the package:

```bash
npm install --save-dev @epilot/user-client
```

Import the package:

```typescript
import { getClient } from '@epilot/user-client';
```

Use the client:
```typescript
// get typed client
const client = await getClient();

// call an operation
const res = await client.getMe();
```

## BaseURL & Authorization

To pass an authorization header and set up the API url, you can use axios
defaults:

```typescript
const client = getClient();
client.defaults.baseURL = config.USER_API_URL;
client.defaults.headers['authorization'] = `Bearer ${token}`;
```

## API Docs:

https://docs.epilot.io/api/user
