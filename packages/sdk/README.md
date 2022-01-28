# epilot-sdk

JavaScript / TypeScript SDK for epilot

## Quick Start

```sh
npm install --save epilot-sdk
```

```typescript
import { authenticate, authorizeClient } from 'epilot-sdk/auth';
import { getClient } from 'epilot-sdk/entity';

const credentials = await authenticate({
  username: 'email@example.com',
  password: 'xxx',
});

const entityClient = await getClient()
  .then(authorizeClient(credentials))

const entityClient = await getClient();
await entityClient.createEntity('contact', { fist_name: 'Example', last_name: 'Contact' });
```

## Documentation

https://docs.epilot.io/docs/architecture/sdk
