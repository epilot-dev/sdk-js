# @epilot/consent-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/consent-client.svg)](https://www.npmjs.com/package/@epilot/consent-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/consent-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/consent-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [Consent API](https://docs.epilot.io/api/consent).

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```sh
npm i @epilot/consent-client
```

## Usage

```typescript
import { getClient } from '@epilot/consent-client';

const consentCLient = getClient();
await consentClient.publishConsentEvent({
  {
  type: "OPT_IN",
  topic: "EMAIL_MARKETING",
  identifier: "exampleuser@epilot.cloud",
  source: "my-custom-journey",
});
```

## Documentation

https://docs.epilot.io/api/consent
