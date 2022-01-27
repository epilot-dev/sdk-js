# @epilot/auth

Authenticate with epilot APIs

## Quick Start

```sh
npm install --save @epilot/auth
```

```typescript
import { authenticate, authorizeClient } from '@epilot/auth';
import { getClient } from '@epilot/entity-client';

const credentials = await authenticate({
  username: 'email@example.com',
  password: 'xxx',
});

const entityClient = await getClient()
  .then(authorizeClient(credentials))

// entityClient will be authorized using epilot OAuth tokens
```

## Documentation

https://docs.epilot.io/docs/auth/authentication

