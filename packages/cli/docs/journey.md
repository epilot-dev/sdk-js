# Journey API

- **Base URL:** `https://journey-config.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/journey](https://docs.epilot.io/api/journey)

API to configure journeys

## Quick Start

```bash
# List available operations
epilot journey

# Call an operation
epilot journey getJourneysByOrgId -p id=123
```

## Operations

**Journeys**
- [`getJourneysByOrgId`](#getjourneysbyorgid) — Get all journeys by organization id
- [`getJourney`](#getjourney) — Get journey by id. Private journeys requires valid private token to be passed
- [`removeJourney`](#removejourney) — Remove journey by id
- [`getJourneyProducts`](#getjourneyproducts) — Get products available in the journey by id. requires public journey token to be passed.
- [`createJourney`](#createjourney) — Create a Journey
- [`updateJourney`](#updatejourney) — Update a Journey
- [`patchUpdateJourney`](#patchupdatejourney) — Update a Journey (partially / patch). Support for nested properties updates (e.g. "property[0].name").
- [`searchJourneys`](#searchjourneys) — Search Journeys
- [`generateDocument`](#generatedocument) — Builds document generated from a template with journey values."
- [`getSettingsForJourney`](#getsettingsforjourney) — Get settings related to the journey using journey ID.
- [`getButtonOptions`](#getbuttonoptions) — Get button options from a csv file.

**Journeys V2**
- [`createJourneyV2`](#createjourneyv2) — Create a Journey
- [`updateJourneyV2`](#updatejourneyv2) — Update a Journey
- [`patchUpdateJourneyV2`](#patchupdatejourneyv2) — Update a Journey (partially / patch). Support for nested properties updates (e.g. "property[0].name").
- [`getJourneyV2`](#getjourneyv2) — Get journey by id
- [`removeJourneyV2`](#removejourneyv2) — Remove journey by id

### `getJourneysByOrgId`

Get all journeys by organization id

`GET /v1/journey/organization/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Organization ID |
| `hydrate` | query | string | No | Hydrate |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot journey getJourneysByOrgId \
  -p id=123
```

Using positional args for path parameters:

```bash
epilot journey getJourneysByOrgId 123
```

With JSONata filter:

```bash
epilot journey getJourneysByOrgId -p id=123 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{}
```

</details>

---

### `getJourney`

Get journey by id. Private journeys requires valid private token to be passed

`GET /v1/journey/configuration/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | Journey ID |
| `source` | query | string | No | What source ID. Journey or Entity ID |
| `orgId` | query | string | No | Organization ID |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot journey getJourney \
  -p id=509cdffe-424f-457a-95c2-9708c304ce77
```

Using positional args for path parameters:

```bash
epilot journey getJourney 509cdffe-424f-457a-95c2-9708c304ce77
```

With JSONata filter:

```bash
epilot journey getJourney -p id=509cdffe-424f-457a-95c2-9708c304ce77 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "journeyId": "string",
  "organizationId": "string",
  "brandId": "string",
  "name": "string",
  "steps": [
    {
      "showStepName": true,
      "title": "string",
      "subTitle": "string",
      "showStepSubtitle": true,
      "showStepper": true,
      "showStepperLabels": true,
      "hideNextButton": true,
      "name": "string",
      "stepId": "string",
      "schema": {},
      "uischema": {},
      "maxWidth": "small"
    }
  ],
  "design": {
    "logoUrl": "string",
    "theme": {},
    "designTokens": {}
  },
  "rules": [
    {
      "type": "inject",
      "sourceType": "journey",
      "source": "string",
      "target": "string"
    }
  ],
  "logics": [
    {
      "autoGeneratedId": "string",
      "conditions": ["string"],
      "actions": ["string"]
    }
  ],
  "logicsV4": {},
  "contextSchema": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "string",
      "paramKey": "string",
      "isRequired": true,
      "shouldLoadEntity": true
    }
  ],
  "journey_type": "Sales template (Premium)",
  "settings": {
    "embedOptions": {
      "mode": "full-screen",
      "lang": "de",
      "width": "string",
      "topBar": true,
      "scrollToTop": true,
      "button": {}
    },
    "safeModeAutomation": true,
    "canary": true,
    "designId": "string",
    "templateId": "string",
    "entityId": "string",
    "mappingsAutomationId": "string",
    "targetedCustomer": "string",
    "description": "string",
    "organizationSettings": {},
    "publicToken": "string",
    "runtimeEntities": ["ORDER"],
    "filePurposes": ["string"],
    "entityTags": ["string"],
    "addressSuggestionsFileUrl": "string",
    "addressSuggestionsFileId": "string",
    "useNewDesign": true,
    "useAustrianLabels": true,
    "enableDarkMode": true,
    "accessMode": "PUBLIC",
    "isPublished": true,
    "status": "string",
    "isActive": true,
    "savingProgress": {
      "savingMode": "auto",
      "supportedVersion": 0
    },
    "thirdPartyCookies": true
  },
  "validationRules": {
    "block1": "rule123",
    "block2": {
      "field1": "rule456",
      "field2": "rule789"
    }
  },
  "createdBy": "string",
  "updatedBy": "string",
  "__lastModifiedAt": "string",
  "createdAt": "string",
  "lastModifiedAt": "string",
  "deletedAt": "string",
  "version": 0,
  "revisions": 0,
  "featureFlags": {}
}
```

</details>

---

### `removeJourney`

Remove journey by id

`DELETE /v1/journey/configuration/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | Journey ID |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot journey removeJourney \
  -p id=509cdffe-424f-457a-95c2-9708c304ce77
```

Using positional args for path parameters:

```bash
epilot journey removeJourney 509cdffe-424f-457a-95c2-9708c304ce77
```

With JSONata filter:

```bash
epilot journey removeJourney -p id=509cdffe-424f-457a-95c2-9708c304ce77 --jsonata '$'
```

---

### `getJourneyProducts`

Get products available in the journey by id. requires public journey token to be passed.

`GET /v1/journey/products/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | Journey ID |
| `source` | query | string | No | What source ID. Journey or Entity ID |
| `postal_code` | query | string | No | Zip Code for availibility |
| `city` | query | string | No | city for availibility |
| `street` | query | string | No | street name for availibility |
| `street_number` | query | string | No | street number for availibility |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot journey getJourneyProducts \
  -p id=509cdffe-424f-457a-95c2-9708c304ce77
```

Using positional args for path parameters:

```bash
epilot journey getJourneyProducts 509cdffe-424f-457a-95c2-9708c304ce77
```

With JSONata filter:

```bash
epilot journey getJourneyProducts -p id=509cdffe-424f-457a-95c2-9708c304ce77 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "type": "string",
    "_schema": "string",
    "_title": "string",
    "name": "string",
    "_id": "string",
    "_org": "string",
    "code": "string",
    "description": "string",
    "feature": [],
    "product_images": [],
    "legal_footnote": "string",
    "product_downloads": [],
    "price": {}
  }
]
```

</details>

---

### `createJourney`

Create a Journey

`POST /v1/journey/configuration`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `skipAutomation` | query | string (Yn) | No | skip creating an Automation (it takes Yn format "true, yes, 1, y") |

**Request Body**

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot journey createJourney
```

With request body:

```bash
epilot journey createJourney \
  -d '{
  "journeyId": "string",
  "organizationId": "string",
  "brandId": "string",
  "name": "string",
  "steps": [
    {
      "showStepName": true,
      "title": "string",
      "subTitle": "string",
      "showStepSubtitle": true,
      "showStepper": true,
      "showStepperLabels": true,
      "hideNextButton": true,
      "name": "string",
      "stepId": "string",
      "schema": {},
      "uischema": {},
      "maxWidth": "small"
    }
  ],
  "design": {
    "logoUrl": "string",
    "theme": {},
    "designTokens": {}
  },
  "rules": [
    {
      "type": "inject",
      "sourceType": "journey",
      "source": "string",
      "target": "string"
    }
  ],
  "logics": [
    {
      "autoGeneratedId": "string",
      "conditions": ["string"],
      "actions": ["string"]
    }
  ],
  "logicsV4": {},
  "contextSchema": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "string",
      "paramKey": "string",
      "isRequired": true,
      "shouldLoadEntity": true
    }
  ],
  "journey_type": "Sales template (Premium)",
  "settings": {
    "embedOptions": {
      "mode": "full-screen",
      "lang": "de",
      "width": "string",
      "topBar": true,
      "scrollToTop": true,
      "button": {}
    },
    "safeModeAutomation": true,
    "canary": true,
    "designId": "string",
    "templateId": "string",
    "entityId": "string",
    "mappingsAutomationId": "string",
    "targetedCustomer": "string",
    "description": "string",
    "organizationSettings": {},
    "publicToken": "string",
    "runtimeEntities": ["ORDER"],
    "filePurposes": ["string"],
    "entityTags": ["string"],
    "addressSuggestionsFileUrl": "string",
    "addressSuggestionsFileId": "string",
    "useNewDesign": true,
    "useAustrianLabels": true,
    "enableDarkMode": true,
    "accessMode": "PUBLIC",
    "isPublished": true,
    "status": "string",
    "isActive": true,
    "savingProgress": {
      "savingMode": "auto",
      "supportedVersion": 0
    },
    "thirdPartyCookies": true
  },
  "validationRules": {
    "block1": "rule123",
    "block2": {
      "field1": "rule456",
      "field2": "rule789"
    }
  },
  "createdBy": "string",
  "updatedBy": "string",
  "__lastModifiedAt": "string"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot journey createJourney
```

With JSONata filter:

```bash
epilot journey createJourney --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "journeyId": "string",
  "organizationId": "string",
  "brandId": "string",
  "name": "string",
  "steps": [
    {
      "showStepName": true,
      "title": "string",
      "subTitle": "string",
      "showStepSubtitle": true,
      "showStepper": true,
      "showStepperLabels": true,
      "hideNextButton": true,
      "name": "string",
      "stepId": "string",
      "schema": {},
      "uischema": {},
      "maxWidth": "small"
    }
  ],
  "design": {
    "logoUrl": "string",
    "theme": {},
    "designTokens": {}
  },
  "rules": [
    {
      "type": "inject",
      "sourceType": "journey",
      "source": "string",
      "target": "string"
    }
  ],
  "logics": [
    {
      "autoGeneratedId": "string",
      "conditions": ["string"],
      "actions": ["string"]
    }
  ],
  "logicsV4": {},
  "contextSchema": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "string",
      "paramKey": "string",
      "isRequired": true,
      "shouldLoadEntity": true
    }
  ],
  "journey_type": "Sales template (Premium)",
  "settings": {
    "embedOptions": {
      "mode": "full-screen",
      "lang": "de",
      "width": "string",
      "topBar": true,
      "scrollToTop": true,
      "button": {}
    },
    "safeModeAutomation": true,
    "canary": true,
    "designId": "string",
    "templateId": "string",
    "entityId": "string",
    "mappingsAutomationId": "string",
    "targetedCustomer": "string",
    "description": "string",
    "organizationSettings": {},
    "publicToken": "string",
    "runtimeEntities": ["ORDER"],
    "filePurposes": ["string"],
    "entityTags": ["string"],
    "addressSuggestionsFileUrl": "string",
    "addressSuggestionsFileId": "string",
    "useNewDesign": true,
    "useAustrianLabels": true,
    "enableDarkMode": true,
    "accessMode": "PUBLIC",
    "isPublished": true,
    "status": "string",
    "isActive": true,
    "savingProgress": {
      "savingMode": "auto",
      "supportedVersion": 0
    },
    "thirdPartyCookies": true
  },
  "validationRules": {
    "block1": "rule123",
    "block2": {
      "field1": "rule456",
      "field2": "rule789"
    }
  },
  "createdBy": "string",
  "updatedBy": "string",
  "__lastModifiedAt": "string",
  "createdAt": "string",
  "lastModifiedAt": "string",
  "deletedAt": "string",
  "version": 0,
  "revisions": 0,
  "featureFlags": {}
}
```

</details>

---

### `updateJourney`

Update a Journey

`PUT /v1/journey/configuration`

**Request Body**

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot journey updateJourney
```

With request body:

```bash
epilot journey updateJourney \
  -d '{
  "journeyId": "string",
  "organizationId": "string",
  "brandId": "string",
  "name": "string",
  "steps": [
    {
      "showStepName": true,
      "title": "string",
      "subTitle": "string",
      "showStepSubtitle": true,
      "showStepper": true,
      "showStepperLabels": true,
      "hideNextButton": true,
      "name": "string",
      "stepId": "string",
      "schema": {},
      "uischema": {},
      "maxWidth": "small"
    }
  ],
  "design": {
    "logoUrl": "string",
    "theme": {},
    "designTokens": {}
  },
  "rules": [
    {
      "type": "inject",
      "sourceType": "journey",
      "source": "string",
      "target": "string"
    }
  ],
  "logics": [
    {
      "autoGeneratedId": "string",
      "conditions": ["string"],
      "actions": ["string"]
    }
  ],
  "logicsV4": {},
  "contextSchema": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "string",
      "paramKey": "string",
      "isRequired": true,
      "shouldLoadEntity": true
    }
  ],
  "journey_type": "Sales template (Premium)",
  "settings": {
    "embedOptions": {
      "mode": "full-screen",
      "lang": "de",
      "width": "string",
      "topBar": true,
      "scrollToTop": true,
      "button": {}
    },
    "safeModeAutomation": true,
    "canary": true,
    "designId": "string",
    "templateId": "string",
    "entityId": "string",
    "mappingsAutomationId": "string",
    "targetedCustomer": "string",
    "description": "string",
    "organizationSettings": {},
    "publicToken": "string",
    "runtimeEntities": ["ORDER"],
    "filePurposes": ["string"],
    "entityTags": ["string"],
    "addressSuggestionsFileUrl": "string",
    "addressSuggestionsFileId": "string",
    "useNewDesign": true,
    "useAustrianLabels": true,
    "enableDarkMode": true,
    "accessMode": "PUBLIC",
    "isPublished": true,
    "status": "string",
    "isActive": true,
    "savingProgress": {
      "savingMode": "auto",
      "supportedVersion": 0
    },
    "thirdPartyCookies": true
  },
  "validationRules": {
    "block1": "rule123",
    "block2": {
      "field1": "rule456",
      "field2": "rule789"
    }
  },
  "createdBy": "string",
  "updatedBy": "string",
  "__lastModifiedAt": "string"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot journey updateJourney
```

With JSONata filter:

```bash
epilot journey updateJourney --jsonata '$'
```

---

### `patchUpdateJourney`

Update a Journey (partially / patch). Support for nested properties updates (e.g. "property[0].name").

`PATCH /v1/journey/configuration`

**Request Body**

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot journey patchUpdateJourney \
  -d '{"journeyId":"509cdffe-424f-457a-95c2-9708c304ce77","__lastModifiedAt":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot journey patchUpdateJourney
```

With JSONata filter:

```bash
epilot journey patchUpdateJourney --jsonata 'createdJourney'
```

<details>
<summary>Sample Response</summary>

```json
{
  "createdJourney": {
    "journeyId": "string",
    "organizationId": "string",
    "brandId": "string",
    "name": "string",
    "steps": [
      {}
    ],
    "design": {
      "logoUrl": "string",
      "theme": {},
      "designTokens": {}
    },
    "rules": [
      {}
    ],
    "logics": [
      {}
    ],
    "logicsV4": {},
    "contextSchema": [
      {}
    ],
    "journey_type": "Sales template (Premium)",
    "settings": {
      "embedOptions": {},
      "safeModeAutomation": true,
      "canary": true,
      "designId": "string",
      "templateId": "string",
      "entityId": "string",
      "mappingsAutomationId": "string",
      "targetedCustomer": "string",
      "description": "string",
      "organizationSettings": {},
      "publicToken": "string",
      "runtimeEntities": ["ORDER"],
      "filePurposes": ["string"],
      "entityTags": ["string"],
      "addressSuggestionsFileUrl": "string",
      "addressSuggestionsFileId": "string",
      "useNewDesign": true,
      "useAustrianLabels": true,
      "enableDarkMode": true,
      "accessMode": "PUBLIC",
      "isPublished": true,
      "status": "string",
      "isActive": true,
      "savingProgress": {},
      "thirdPartyCookies": true
    },
    "validationRules": {
      "block1": "rule123",
      "block2": {}
    },
    "createdBy": "string",
    "updatedBy": "string",
    "__lastModifiedAt": "string",
    "createdAt": "string",
    "lastModifiedAt": "string",
    "deletedAt": "string",
    "version": 0,
    "revisions": 0,
    "featureFlags": {}
  }
}
```

</details>

---

### `searchJourneys`

Search Journeys

`POST /v1/journey/configuration/search`

**Request Body**

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot journey searchJourneys \
  -d '{"q":"_tags:*Flex*","from":0,"size":25,"sort":"_created_at:desc"}'
```

Using stdin pipe:

```bash
cat body.json | epilot journey searchJourneys
```

With JSONata filter:

```bash
epilot journey searchJourneys --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 1,
  "results": [
    {
      "_id": "e0f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8",
      "_schema": "journey",
      "_title": "Journey Entity Title",
      "_org": "739224",
      "_created_at": "2020-01-01T00:00:00.000Z",
      "_updated_at": "2020-01-01T00:00:00.000Z",
      "_tags": ["Flex"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "journey_name": "Journey Name",
      "journey_id": "de7df470-253e-11ed-9174-116b8a718c0a",
      "journey_type": "Sales template",
      "design": "Design EPILOT",
      "created_by": [
        {
          "id": "12345"
        }
      ],
      "journey_version": "Flex"
    }
  ]
}
```

</details>

---

### `generateDocument`

Builds document generated from a template with journey values."

`POST /v1/journey/document:generate`

**Request Body**

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot journey generateDocument \
  -d '{"file_id":"1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p","context_data":{"additionalProperties":"string"},"language":"de"}'
```

Using stdin pipe:

```bash
cat body.json | epilot journey generateDocument
```

With JSONata filter:

```bash
epilot journey generateDocument --jsonata 'job_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "job_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "job_status": "STARTED",
  "message": "string",
  "pdf_output": {
    "preview_url": "https://document-api-prod.s3.eu-central-1.amazonaws.com/preview/my-template-OR-001.pdf",
    "output_document": {
      "s3ref": {
        "bucket": "document-api-preview-prod",
        "key": "preview/my-template.pdf"
      }
    }
  },
  "docx_output": {
    "preview_url": "https://document-api-prod.s3.eu-central-1.amazonaws.com/preview/my-template-OR-001.docx",
    "output_document": {
      "s3ref": {
        "bucket": "document-api-preview-prod",
        "key": "preview/my-template.docx"
      }
    }
  },
  "variable_payload": {
    "additionalProperties": "string"
  },
  "template_settings": {
    "custom_margins": {
      "top": 2.54,
      "bottom": 2.54
    },
    "suggested_margins": {
      "top": 2.54,
      "bottom": 2.54
    },
    "display_margin_guidelines": true,
    "enable_data_table_margin_autofix": false,
    "template_with_datatable": false,
    "enabled_template_settings_persistence": false,
    "misconfigured_margins": false,
    "file_entity_id": "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p"
  }
}
```

</details>

---

### `createJourneyV2`

Create a Journey

`POST /v2/journey/configuration`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `skipAutomation` | query | string (Yn) | No | skip creating an Automation (it takes Yn format "true, yes, 1, y") |

**Request Body**

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot journey createJourneyV2
```

With request body:

```bash
epilot journey createJourneyV2 \
  -d '{
  "journeyId": "string",
  "brandId": "string",
  "name": "string",
  "steps": [
    {
      "showStepName": true,
      "title": "string",
      "subTitle": "string",
      "showStepSubtitle": true,
      "showStepper": true,
      "showStepperLabels": true,
      "hideNextButton": true,
      "name": "string",
      "stepId": "string",
      "schema": {},
      "uischema": {},
      "maxWidth": "small"
    }
  ],
  "design": {
    "logoUrl": "string",
    "theme": {},
    "designTokens": {}
  },
  "rules": [
    {
      "type": "inject",
      "sourceType": "journey",
      "source": "string",
      "target": "string"
    }
  ],
  "logics": [
    {
      "autoGeneratedId": "string",
      "conditions": ["string"],
      "actions": ["string"]
    }
  ],
  "logicsV4": {},
  "contextSchema": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "string",
      "paramKey": "string",
      "isRequired": true,
      "shouldLoadEntity": true
    }
  ],
  "journey_type": "Sales template (Premium)",
  "settings": {
    "embedOptions": {
      "mode": "full-screen",
      "lang": "de",
      "width": "string",
      "topBar": true,
      "scrollToTop": true,
      "button": {}
    },
    "safeModeAutomation": true,
    "designId": "string",
    "entityId": "string",
    "mappingsAutomationId": "string",
    "templateId": "string",
    "targetedCustomer": "string",
    "description": "string",
    "publicToken": "string",
    "runtimeEntities": ["ORDER"],
    "filePurposes": ["string"],
    "entityTags": ["string"],
    "addressSuggestionsFileUrl": "string",
    "addressSuggestionsFileId": "string",
    "useNewDesign": true,
    "thirdPartyCookies": true,
    "accessMode": "PUBLIC",
    "enableDarkMode": true
  },
  "validationRules": {
    "block1": "rule123",
    "block2": {
      "field1": "rule456",
      "field2": "rule789"
    }
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot journey createJourneyV2
```

With JSONata filter:

```bash
epilot journey createJourneyV2 --jsonata 'journeyId'
```

<details>
<summary>Sample Response</summary>

```json
{
  "journeyId": "string",
  "brandId": "string",
  "name": "string",
  "steps": [
    {
      "showStepName": true,
      "title": "string",
      "subTitle": "string",
      "showStepSubtitle": true,
      "showStepper": true,
      "showStepperLabels": true,
      "hideNextButton": true,
      "name": "string",
      "stepId": "string",
      "schema": {},
      "uischema": {},
      "maxWidth": "small"
    }
  ],
  "design": {
    "logoUrl": "string",
    "theme": {},
    "designTokens": {}
  },
  "rules": [
    {
      "type": "inject",
      "sourceType": "journey",
      "source": "string",
      "target": "string"
    }
  ],
  "logics": [
    {
      "autoGeneratedId": "string",
      "conditions": ["string"],
      "actions": ["string"]
    }
  ],
  "logicsV4": {},
  "contextSchema": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "string",
      "paramKey": "string",
      "isRequired": true,
      "shouldLoadEntity": true
    }
  ],
  "journey_type": "Sales template (Premium)",
  "settings": {
    "embedOptions": {
      "mode": "full-screen",
      "lang": "de",
      "width": "string",
      "topBar": true,
      "scrollToTop": true,
      "button": {}
    },
    "safeModeAutomation": true,
    "designId": "string",
    "entityId": "string",
    "mappingsAutomationId": "string",
    "templateId": "string",
    "targetedCustomer": "string",
    "description": "string",
    "publicToken": "string",
    "runtimeEntities": ["ORDER"],
    "filePurposes": ["string"],
    "entityTags": ["string"],
    "addressSuggestionsFileUrl": "string",
    "addressSuggestionsFileId": "string",
    "useNewDesign": true,
    "thirdPartyCookies": true,
    "accessMode": "PUBLIC",
    "enableDarkMode": true
  },
  "validationRules": {
    "block1": "rule123",
    "block2": {
      "field1": "rule456",
      "field2": "rule789"
    }
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `updateJourneyV2`

Update a Journey

`PUT /v2/journey/configuration`

**Request Body**

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot journey updateJourneyV2
```

With request body:

```bash
epilot journey updateJourneyV2 \
  -d '{
  "journeyId": "string",
  "brandId": "string",
  "name": "string",
  "steps": [
    {
      "showStepName": true,
      "title": "string",
      "subTitle": "string",
      "showStepSubtitle": true,
      "showStepper": true,
      "showStepperLabels": true,
      "hideNextButton": true,
      "name": "string",
      "stepId": "string",
      "schema": {},
      "uischema": {},
      "maxWidth": "small"
    }
  ],
  "design": {
    "logoUrl": "string",
    "theme": {},
    "designTokens": {}
  },
  "rules": [
    {
      "type": "inject",
      "sourceType": "journey",
      "source": "string",
      "target": "string"
    }
  ],
  "logics": [
    {
      "autoGeneratedId": "string",
      "conditions": ["string"],
      "actions": ["string"]
    }
  ],
  "logicsV4": {},
  "contextSchema": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "string",
      "paramKey": "string",
      "isRequired": true,
      "shouldLoadEntity": true
    }
  ],
  "journey_type": "Sales template (Premium)",
  "settings": {
    "embedOptions": {
      "mode": "full-screen",
      "lang": "de",
      "width": "string",
      "topBar": true,
      "scrollToTop": true,
      "button": {}
    },
    "safeModeAutomation": true,
    "designId": "string",
    "entityId": "string",
    "mappingsAutomationId": "string",
    "templateId": "string",
    "targetedCustomer": "string",
    "description": "string",
    "publicToken": "string",
    "runtimeEntities": ["ORDER"],
    "filePurposes": ["string"],
    "entityTags": ["string"],
    "addressSuggestionsFileUrl": "string",
    "addressSuggestionsFileId": "string",
    "useNewDesign": true,
    "thirdPartyCookies": true,
    "accessMode": "PUBLIC",
    "enableDarkMode": true
  },
  "validationRules": {
    "block1": "rule123",
    "block2": {
      "field1": "rule456",
      "field2": "rule789"
    }
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot journey updateJourneyV2
```

With JSONata filter:

```bash
epilot journey updateJourneyV2 --jsonata 'journeyId'
```

<details>
<summary>Sample Response</summary>

```json
{
  "journeyId": "string",
  "brandId": "string",
  "name": "string",
  "steps": [
    {
      "showStepName": true,
      "title": "string",
      "subTitle": "string",
      "showStepSubtitle": true,
      "showStepper": true,
      "showStepperLabels": true,
      "hideNextButton": true,
      "name": "string",
      "stepId": "string",
      "schema": {},
      "uischema": {},
      "maxWidth": "small"
    }
  ],
  "design": {
    "logoUrl": "string",
    "theme": {},
    "designTokens": {}
  },
  "rules": [
    {
      "type": "inject",
      "sourceType": "journey",
      "source": "string",
      "target": "string"
    }
  ],
  "logics": [
    {
      "autoGeneratedId": "string",
      "conditions": ["string"],
      "actions": ["string"]
    }
  ],
  "logicsV4": {},
  "contextSchema": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "string",
      "paramKey": "string",
      "isRequired": true,
      "shouldLoadEntity": true
    }
  ],
  "journey_type": "Sales template (Premium)",
  "settings": {
    "embedOptions": {
      "mode": "full-screen",
      "lang": "de",
      "width": "string",
      "topBar": true,
      "scrollToTop": true,
      "button": {}
    },
    "safeModeAutomation": true,
    "designId": "string",
    "entityId": "string",
    "mappingsAutomationId": "string",
    "templateId": "string",
    "targetedCustomer": "string",
    "description": "string",
    "publicToken": "string",
    "runtimeEntities": ["ORDER"],
    "filePurposes": ["string"],
    "entityTags": ["string"],
    "addressSuggestionsFileUrl": "string",
    "addressSuggestionsFileId": "string",
    "useNewDesign": true,
    "thirdPartyCookies": true,
    "accessMode": "PUBLIC",
    "enableDarkMode": true
  },
  "validationRules": {
    "block1": "rule123",
    "block2": {
      "field1": "rule456",
      "field2": "rule789"
    }
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `patchUpdateJourneyV2`

Update a Journey (partially / patch). Support for nested properties updates (e.g. "property[0].name").

`PATCH /v2/journey/configuration`

**Request Body**

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot journey patchUpdateJourneyV2 \
  -d '{"journeyId":"509cdffe-424f-457a-95c2-9708c304ce77","__lastModifiedAt":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot journey patchUpdateJourneyV2
```

With JSONata filter:

```bash
epilot journey patchUpdateJourneyV2 --jsonata 'journeyId'
```

<details>
<summary>Sample Response</summary>

```json
{
  "journeyId": "string",
  "brandId": "string",
  "name": "string",
  "steps": [
    {
      "showStepName": true,
      "title": "string",
      "subTitle": "string",
      "showStepSubtitle": true,
      "showStepper": true,
      "showStepperLabels": true,
      "hideNextButton": true,
      "name": "string",
      "stepId": "string",
      "schema": {},
      "uischema": {},
      "maxWidth": "small"
    }
  ],
  "design": {
    "logoUrl": "string",
    "theme": {},
    "designTokens": {}
  },
  "rules": [
    {
      "type": "inject",
      "sourceType": "journey",
      "source": "string",
      "target": "string"
    }
  ],
  "logics": [
    {
      "autoGeneratedId": "string",
      "conditions": ["string"],
      "actions": ["string"]
    }
  ],
  "logicsV4": {},
  "contextSchema": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "string",
      "paramKey": "string",
      "isRequired": true,
      "shouldLoadEntity": true
    }
  ],
  "journey_type": "Sales template (Premium)",
  "settings": {
    "embedOptions": {
      "mode": "full-screen",
      "lang": "de",
      "width": "string",
      "topBar": true,
      "scrollToTop": true,
      "button": {}
    },
    "safeModeAutomation": true,
    "designId": "string",
    "entityId": "string",
    "mappingsAutomationId": "string",
    "templateId": "string",
    "targetedCustomer": "string",
    "description": "string",
    "publicToken": "string",
    "runtimeEntities": ["ORDER"],
    "filePurposes": ["string"],
    "entityTags": ["string"],
    "addressSuggestionsFileUrl": "string",
    "addressSuggestionsFileId": "string",
    "useNewDesign": true,
    "thirdPartyCookies": true,
    "accessMode": "PUBLIC",
    "enableDarkMode": true
  },
  "validationRules": {
    "block1": "rule123",
    "block2": {
      "field1": "rule456",
      "field2": "rule789"
    }
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `getJourneyV2`

Get journey by id

`GET /v2/journey/configuration/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | Journey ID |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot journey getJourneyV2 \
  -p id=509cdffe-424f-457a-95c2-9708c304ce77
```

Using positional args for path parameters:

```bash
epilot journey getJourneyV2 509cdffe-424f-457a-95c2-9708c304ce77
```

With JSONata filter:

```bash
epilot journey getJourneyV2 -p id=509cdffe-424f-457a-95c2-9708c304ce77 --jsonata 'journeyId'
```

<details>
<summary>Sample Response</summary>

```json
{
  "journeyId": "string",
  "brandId": "string",
  "name": "string",
  "steps": [
    {
      "showStepName": true,
      "title": "string",
      "subTitle": "string",
      "showStepSubtitle": true,
      "showStepper": true,
      "showStepperLabels": true,
      "hideNextButton": true,
      "name": "string",
      "stepId": "string",
      "schema": {},
      "uischema": {},
      "maxWidth": "small"
    }
  ],
  "design": {
    "logoUrl": "string",
    "theme": {},
    "designTokens": {}
  },
  "rules": [
    {
      "type": "inject",
      "sourceType": "journey",
      "source": "string",
      "target": "string"
    }
  ],
  "logics": [
    {
      "autoGeneratedId": "string",
      "conditions": ["string"],
      "actions": ["string"]
    }
  ],
  "logicsV4": {},
  "contextSchema": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "string",
      "paramKey": "string",
      "isRequired": true,
      "shouldLoadEntity": true
    }
  ],
  "journey_type": "Sales template (Premium)",
  "settings": {
    "embedOptions": {
      "mode": "full-screen",
      "lang": "de",
      "width": "string",
      "topBar": true,
      "scrollToTop": true,
      "button": {}
    },
    "safeModeAutomation": true,
    "designId": "string",
    "entityId": "string",
    "mappingsAutomationId": "string",
    "templateId": "string",
    "targetedCustomer": "string",
    "description": "string",
    "publicToken": "string",
    "runtimeEntities": ["ORDER"],
    "filePurposes": ["string"],
    "entityTags": ["string"],
    "addressSuggestionsFileUrl": "string",
    "addressSuggestionsFileId": "string",
    "useNewDesign": true,
    "thirdPartyCookies": true,
    "accessMode": "PUBLIC",
    "enableDarkMode": true
  },
  "validationRules": {
    "block1": "rule123",
    "block2": {
      "field1": "rule456",
      "field2": "rule789"
    }
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `removeJourneyV2`

Remove journey by id

`DELETE /v2/journey/configuration/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | Journey ID |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot journey removeJourneyV2 \
  -p id=509cdffe-424f-457a-95c2-9708c304ce77
```

Using positional args for path parameters:

```bash
epilot journey removeJourneyV2 509cdffe-424f-457a-95c2-9708c304ce77
```

With JSONata filter:

```bash
epilot journey removeJourneyV2 -p id=509cdffe-424f-457a-95c2-9708c304ce77 --jsonata '$'
```

---

### `getSettingsForJourney`

Get settings related to the journey using journey ID.

`GET /v1/journey/{id}/settings`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | Journey ID |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot journey getSettingsForJourney \
  -p id=509cdffe-424f-457a-95c2-9708c304ce77
```

Using positional args for path parameters:

```bash
epilot journey getSettingsForJourney 509cdffe-424f-457a-95c2-9708c304ce77
```

With JSONata filter:

```bash
epilot journey getSettingsForJourney -p id=509cdffe-424f-457a-95c2-9708c304ce77 --jsonata 'organizationId'
```

<details>
<summary>Sample Response</summary>

```json
{
  "organizationId": "739224",
  "canary": true,
  "thirdPartyCookies": true
}
```

</details>

---

### `getButtonOptions`

Get button options from a csv file.

`GET /v1/journey/button-options`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `fileId` | query | string | Yes | file id to get button options from |

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot journey getButtonOptions \
  -p fileId=535ef74a-dd66-4d01-94a9-725016e70d1c
```

With JSONata filter:

```bash
epilot journey getButtonOptions -p fileId=535ef74a-dd66-4d01-94a9-725016e70d1c --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "value": "Button Hidden Value",
    "label": "Button Label"
  }
]
```

</details>

---
