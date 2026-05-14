# @epilot/calendar-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/calendar-client.svg)](https://www.npmjs.com/package/@epilot/calendar-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/calendar-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/calendar-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot Calendar API

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/calendar-client
```

## Usage

```typescript
import { getClient } from '@epilot/calendar-client';
const calendarClient = getClient();

const calendars = await calendarClient.listCalendars();
```
