# @epilot/journey-session-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/journey-session-client.svg)](https://www.npmjs.com/package/@epilot/journey-session-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/journey-session-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/journey-session-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Journey Session API](https://docs.epilot.io/api/journey-session): runs journeys without a screen, for chats, AI agents and APIs.

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios).

## Installation

```bash
npm install --save @epilot/journey-session-client
```

## Usage

```typescript
import { getClient } from "@epilot/journey-session-client";

const journeySessionClient = getClient();
journeySessionClient.defaults.headers.common.authorization = `Bearer ${portalToken}`;

const { data } = await journeySessionClient.startJourneySession(null, {
  journey_id: "97625ec0-e8bf-11f1-a4cf-87e0614d8a40",
});

const [firstQuestion] = data.view.blocks;

await journeySessionClient.sendJourneySessionCommand(
  { session_id: data.session.id },
  { type: "answer", answers: { [firstQuestion.id]: "Barry" } },
);
```

## Documentation

https://docs.epilot.io/api/journey-session
