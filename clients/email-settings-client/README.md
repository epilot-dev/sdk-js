# @epilot/email-settings-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/email-settings-client.svg)](https://www.npmjs.com/package/@epilot/email-settings-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/email-settings-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/email-settings-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

API Client for epilot [Email Settings API](https://docs.epilot.io/api/email-settings).

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/email-settings-client
```

## Usage

```typescript
import { getClient } from '@epilot/email-settings-client';
const emailSettingsClient = getClient();

const getResponse = await emailSettingsClient.getSettings({ type: 'signature', id: 'a10bd0ff-4391-4cfc-88ee-b19d718a9bf7' });
```

## Documentation

https://docs.epilot.io/docs/messaging/email-settings

