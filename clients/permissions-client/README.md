# @epilot/permissions-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/permissions-client.svg)](https://www.npmjs.com/package/@epilot/permissions-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/permissions-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/permissions-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Permissions API](https://docs.epilot.io/api/permissions)

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/permissions-client
```

## Usage

```typescript
import fs from 'fs';
import { getClient } from '@epilot/permissions-client';
const permissionsClient = getClient();

const rolesResponse = await permissionsClient.listCurrentRoles();
```

## Documentation

https://docs.epilot.io/docs/auth/permissions
