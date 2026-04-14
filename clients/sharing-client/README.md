# @epilot/sharing-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/sharing-client.svg)](https://www.npmjs.com/package/@epilot/sharing-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/sharing-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/sharing-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Sharing API](https://docs.epilot.io/api/sharing)

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/sharing-client
```

## Usage

```typescript
import { getClient } from '@epilot/sharing-client';
const sharingClient = getClient();

const configResponse = await sharingClient.getSharingConfiguration({ partner_org_id: '123' });
const searchResponse = await sharingClient.searchPartnerSharingConfigurations(null, { entities: [{ schema: 'contact', entity_id: '456' }] });
```

## Documentation

https://docs.epilot.io/docs/partnering/entity-sharing
