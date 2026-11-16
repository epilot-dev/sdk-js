# @epilot/translation-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/translation-client.svg)](https://www.npmjs.com/package/@epilot/translation-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for the epilot Translation API: translates short user-authored texts, such as workflow titles and
labels, into the reader's language.

Translations are cached per organization, keyed by the exact source text and target language, so each text is sent to
the translation provider once. Only cache misses count toward the organization's monthly character budget.

Uses [`openapi-client-axios`](https://github.com/openapistack/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/translation-client
```

## Usage

```typescript
import { getClient } from "@epilot/translation-client";

const translationClient = getClient();
translationClient.defaults.headers.common.authorization = `Bearer ${token}`;

const { data } = await translationClient.translateTexts(null, {
  texts: ["Speicher prüfen", "Erzeugungsanlage"],
  target_language: "en",
});

// data.translations: [{ text: "Check storage", source_language: "de" }, ...]
```

Translations come back in input order. A text already in the target language is returned unchanged, with
`source_language` equal to `target_language`.

## Updating the API definition

The Translation API's operations are marked `x-internal`, which the shared `scripts/update-openapi.js` strips, so this
client has its own updater that keeps them:

```bash
npm run openapi [path/to/translation-api/packages/functions/openapi.yml]
npm run typegen && npm run build
```
