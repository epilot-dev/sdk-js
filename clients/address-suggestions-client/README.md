# @epilot/address-suggestions-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/address-suggestions-client.svg)](https://www.npmjs.com/package/@epilot/address-suggestions-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/address-suggestions-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/address-suggestions-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Address Suggestions API](https://docs.epilot.io/api/address-suggestions)

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/address-suggestions-client
```

## Usage

```typescript
import { getClient } from '@epilot/address-suggestions-client';

const addressSuggestionsClient = getClient()
const res = await addressSuggestionsClient.getAddresses()
```

## Documentation

<https://docs.epilot.io/api/address-suggestions>
