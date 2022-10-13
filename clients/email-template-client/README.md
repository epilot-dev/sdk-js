# @epilot/email-template-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/email-template-client.svg)](https://www.npmjs.com/package/@epilot/email-template-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/email-template-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/email-template-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

API Client for epilot [Email Template API](https://docs.epilot.io/api/email-template).

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/email-template-client
```

## Usage

```typescript
import { getClient } from '@epilot/email-template-client';
const emailTemplateClient = getClient();

const getResponse = await emailTemplateClient.getTemplateDetail({ id: 'a10bd0ff-4391-4cfc-88ee-b19d718a9bf7' });
```

## Documentation

https://docs.epilot.io/docs/messaging/email-templates
