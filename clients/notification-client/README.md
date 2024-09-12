# @epilot/notification-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/notification-client.svg)](https://www.npmjs.com/package/@epilot/notification-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/notification-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/notification-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

API Client for epilot [Notification API](https://docs.epilot.io/api/notification).

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/notification-client
```

## Usage

```typescript
import { getClient } from '@epilot/notification-client';
const notificationClient = getClient();

const getResponse = await notificationClient.getNotifications({ limit: 25 });
```

## Documentation

https://docs.epilot.io/docs/notification
