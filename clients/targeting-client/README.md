# @epilot/targeting-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/targeting-client.svg)](https://www.npmjs.com/package/@epilot/targeting-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/targeting-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/targeting-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

tbw

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/targeting-client
```

## Usage

```typescript
import { getClient } from '@epilot/targeting-client';
const targetingClient = getClient();

const result = await targetingClient.changeCampaignStatus({ campaign_id:  });
```

## Documentation

### Matching Campaigns and Targets

To find out if the given entity or entities are part of a campaign or campaigns, run, e.g.:

```typescript
import { getClient } from '@epilot/targeting-client';
const targetingClient = getClient();

const result = await targetingClient.matchCampaigns(null, {
    "campaign_ids": [
        "80d910d9-1c7f-49f2-9a31-75d5a0f4c744"
    ],
    "entity_refs": [
        {
            "entity_schema": "contact",
            "entity_id": "5817e702-b5d5-4c65-8856-7af0b0aa4067"
        }
    ]
});
```

Similarly, if you want to know if the given entity or entities are part of specif targets:

```typescript
import { getClient } from '@epilot/targeting-client';
const targetingClient = getClient();

const result = await targetingClient.matchTargets(null, {
    "target_ids": [
        "80d910d9-1c7f-49f2-9a31-75d5a0f4c744"
    ],
    "entity_refs": [
        {
            "entity_schema": "contact",
            "entity_id": "5817e702-b5d5-4c65-8856-7af0b0aa4067"
        }
    ]
});
```
