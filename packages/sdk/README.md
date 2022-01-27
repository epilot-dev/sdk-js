# epilot-sdk

JavaScript / TypeScript SDK package for epilot

## Quick Start

```sh
npm install --save epilot-sdk
```

```typescript
import { getClient } from 'epilot-sdk/entity';

const entityClient = await getClient();
await entityClient.createEntity({ slug: 'contact' }, { name: 'My Contact' });
```

## Documentation

https://docs.epilot.io/docs/architecture/sdk
