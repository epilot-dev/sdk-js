# @epilot/user-client

Client library for epilot [User API](https://docs.epilot.io/api/user).

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Installation

```sh
npm install --save-dev @epilot/user-client
```

## Usage

```typescript
import userClient from '@epilot/user-client';

const currentUser = await userClient.getMe().then(res => res.data);
```

## Documentation

https://docs.epilot.io/api/user
