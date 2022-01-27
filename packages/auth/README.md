# @epilot/auth

Authenticate with epilot APIs

## Quick Start

```sh
npm install --save @epilot/auth
```

```typescript
import { authenticate, authorizeClient } from '@epilot/auth';
import { getClient } from '@epilot/entity-client';

const auth = await authenticate({
  username: 'email@example.com',
  password: 'xxx',
});

const entityClient = await getClient()
  .then(authorizeClient(auth))

// entityClient will be authorized using epilot OAuth tokens
```

## Documentation

https://docs.epilot.io/docs/auth/authentication

