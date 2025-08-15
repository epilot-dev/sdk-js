# `@epilot/validation-rules-client`

API Client for epilot Validation Rules API

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Installation

Install the package:

```bash
npm install @epilot/validation-rules-client
```

## Usage

```typescript
import { getClient } from '@epilot/validation-rules-client'

const client = getClient()

// Use the client to make API calls
// The client will be automatically configured with the OpenAPI specification
```

## BaseURL & Authorization

To pass an authorization header and set up the API url, you can use axios
defaults:

```typescript
const client = getClient()
client.defaults.baseURL = config.API_URL
client.defaults.headers['authorization'] = `Bearer ${token}`
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the package
npm run build

# Update OpenAPI specification
npm run openapi
```


## Documentation

https://docs.epilot.io/api/validation-rules
