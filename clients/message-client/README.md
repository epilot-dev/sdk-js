# @epilot/message-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/message-client.svg)](https://www.npmjs.com/package/@epilot/message-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/message-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/message-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

API Client for epilot [Message API](https://docs.epilot.io/api/message).

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/message-client
```

## Usage

```typescript
import { getClient } from '@epilot/message-client';
const messageClient = getClient();
const sendResponse = await messageClient.sendMessage(null, {
  "thread": {
    "topic": "CUSTOMER_MESSAGE",
    "assigned_to": [
      "206801",
      "200109"
    ],
    "opportunity_id": 829072
  },
  "parent_id": "44d7a3eb-0cce-4bd3-a7cd-0b3e652de0c2",
  "subject": "Request for solar panel price",
  "html": "<div>We at ABC GmbH would like to request a price quote for the solar panel.</div>",
  "text": "We at ABC GmbH would like to request a price quote for the solar panel.",
  "from": {
    "name": "epilot",
    "address": "messaging@epilot.cloud",
    "send_status": "SEND",
    "send_error": {}
  },
  "reply_to": {
    "name": "epilot",
    "address": "messaging@epilot.cloud",
    "send_status": "SEND",
    "send_error": {}
  },
  "to": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "cc": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "bcc": [
    {
      "name": "epilot",
      "address": "messaging@epilot.cloud",
      "send_status": "SEND",
      "send_error": {}
    }
  ],
  "file": {
    "$relation": [
      {
        "entity_id": "f820ce3b-07b0-45ae-bcc6-babb2f53f79f",
        "filename": "Produktinformationen_epilot360_Double_Opt_in.pdf",
        "is_message_attachment": true,
        "cid": "fb222496-a1a5-4639-94f2-07b5e35e4068",
        "inline": false,
        "send_as_link": false
      }
    ]
  }
});
```

## Documentation

https://docs.epilot.io/docs/messaging/message-api