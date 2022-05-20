# @epilot/organization-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/organization-client.svg)](https://www.npmjs.com/package/@epilot/organization-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/organization-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/organization-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Organization API](https://docs.epilot.io/api/organization)

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/organization-client
```

## Usage

```typescript
import { getClient } from '@epilot/organization-client';

// get client
const organizationClient = getClient();

// call an operation
const res = await organizationClient.getSettings();
```

## Documentation

https://docs.epilot.io/api/organization
