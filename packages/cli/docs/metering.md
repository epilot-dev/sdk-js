# Metering API

- **API Docs:** [https://docs.epilot.io/api/metering](https://docs.epilot.io/api/metering)

The Metering API manages smart meter data, meter counters, and meter readings for epilot customers and administrators.

## Quick Start

```bash
# List available operations
epilot metering

# Call an operation
epilot metering getCustomerMeters
```

## Common Flags

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

## Operations

**ECP**
- [`getCustomerMeters`](#getcustomermeters) — Retrieves all meters associated with the authenticated portal customer.
- [`getMetersByContractId`](#getmetersbycontractid) — Retrieves all meters associated with a given contract entity.
- [`getMeter`](#getmeter) — Retrieves the full details of a specific meter by ID, including related entities and available journey actions.
- [`updateMeter`](#updatemeter) — Partially updates the details of a meter entity by ID.
- [`getMeterCounters`](#getmetercounters) — Retrieves all meter counters associated with a given meter.
- [`getCounterDetails`](#getcounterdetails) — Retrieves the full details of a single meter counter by its ID.
- [`createPortalMeterReadings`](#createportalmeterreadings) — Inserts multiple meter readings at once for a given meter via the end customer portal.

**ECP Admin**
- [`createMeterReading`](#createmeterreading) — Inserts a new meter reading.
- [`createMeterReadings`](#createmeterreadings) — Inserts multiple meter readings at once. Limited to 100 readings per request.
- [`batchWriteMeterReadings`](#batchwritemeterreadings) — Upserts or deletes multiple meter readings at once. Limited to 100 readings per request.
- [`createMeterReadingFromSubmission`](#createmeterreadingfromsubmission) — Creates meter readings from a journey submission payload.
- [`getAllowedReadingForMeter`](#getallowedreadingformeter) — Returns the allowed min/max reading range for each counter of the given meter.
- [`createReadingWithMeter`](#createreadingwithmeter) — Creates a meter reading along with meter lookup or creation by MA-LO ID and OBIS number.
- [`getReadingsByInterval`](#getreadingsbyinterval) — Retrieves all readings specified in an interval.
- [`updateMeterReading`](#updatemeterreading) — Updates an existing meter reading identified by meter ID, counter ID, and timestamp.
- [`deleteMeterReading`](#deletemeterreading) — Permanently deletes a meter reading identified by meter ID, counter ID, and timestamp.

**Metering**
- [`getReadingChangesets`](#getreadingchangesets) — GET /v1/metering/reading/{meter_id}/{counter_id}/changesets
- [`applyReadingChangeset`](#applyreadingchangeset) — Applies the proposed reading value to ClickHouse and removes the pending changeset.
- [`dismissReadingChangeset`](#dismissreadingchangeset) — Removes the pending changeset without applying it. The reading value remains unchanged.
- [`updateReadingChangeset`](#updatereadingchangeset) — Updates the proposed value of a pending changeset without going through the normal write path.

### `getCustomerMeters`

Retrieves all meters associated with the authenticated portal customer.

`GET /v1/metering/meter`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `include_pending_changesets` | query | boolean | No | When true, the response includes a `pending_changesets` field with the list of pending reading changesets alongside the confirmed readings. |

**Sample Call**

```bash
epilot metering getCustomerMeters
```

With JSONata filter:

```bash
epilot metering getCustomerMeters --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "meter",
      "ma_lo_id": "A09-123",
      "status": "active",
      "meter_type": "three-phase-meter",
      "tariff_type": "Peak load tariff",
      "meter_number": "J-1093-1AK",
      "sector": "power",
      "location": [
        {
          "country": "Germany",
          "city": "Koln",
          "postal_code": 81475,
          "street": "Melatengürtel",
          "street_number": 71,
          "additional_info": "5. Etage",
          "_tags": ["billing", "delivery"]
        }
      ],
      "used_for": "Domestic Usage",
      "manufacturer": "Energy One",
      "calibration_date": "2022-10-10",
      "contract": {
        "$relation": [
          {
            "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "_slug": "contact"
          }
        ]
      },
      "customer": {
        "$relation": [
          {
            "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "_slug": "contact"
          }
        ]
      },
      "journey_actions": {
        "journey_id": "string",
        "action_label": {
          "en": "string",
          "de": "string"
        },
        "slug": "string",
        "rules": [
          {
            "entity": "string",
            "attribute": "string",
            "attribute_value": "string"
          }
        ]
      },
      "last_reading": "2022-10-10",
      "current_consumption": 100.5
    }
  ]
}
```

</details>

---

### `getMetersByContractId`

Retrieves all meters associated with a given contract entity.

`GET /v1/metering/contract/meters/{contract_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `contract_id` | path | string (uuid) | Yes | The ID of the Contract. |

**Sample Call**

```bash
epilot metering getMetersByContractId \
  -p contract_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot metering getMetersByContractId 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot metering getMetersByContractId -p contract_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "meter",
      "ma_lo_id": "A09-123",
      "status": "active",
      "meter_type": "three-phase-meter",
      "tariff_type": "Peak load tariff",
      "meter_number": "J-1093-1AK",
      "sector": "power",
      "location": [
        {
          "country": "Germany",
          "city": "Koln",
          "postal_code": 81475,
          "street": "Melatengürtel",
          "street_number": 71,
          "additional_info": "5. Etage",
          "_tags": ["billing", "delivery"]
        }
      ],
      "used_for": "Domestic Usage",
      "manufacturer": "Energy One",
      "calibration_date": "2022-10-10",
      "contract": {
        "$relation": [
          {
            "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "_slug": "contact"
          }
        ]
      },
      "customer": {
        "$relation": [
          {
            "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "_slug": "contact"
          }
        ]
      }
    }
  ]
}
```

</details>

---

### `getMeter`

Retrieves the full details of a specific meter by ID, including related entities and available journey actions.

`GET /v1/metering/meter/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | The ID of the meter. |

**Sample Call**

```bash
epilot metering getMeter \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot metering getMeter 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot metering getMeter -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "entity": {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "meter",
      "ma_lo_id": "A09-123",
      "status": "active",
      "meter_type": "three-phase-meter",
      "tariff_type": "Peak load tariff",
      "meter_number": "J-1093-1AK",
      "sector": "power",
      "location": [
        {
          "country": "Germany",
          "city": "Koln",
          "postal_code": 81475,
          "street": "Melatengürtel",
          "street_number": 71,
          "additional_info": "5. Etage",
          "_tags": ["billing", "delivery"]
        }
      ],
      "used_for": "Domestic Usage",
      "manufacturer": "Energy One",
      "calibration_date": "2022-10-10",
      "contract": {
        "$relation": [
          {
            "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "_slug": "contact"
          }
        ]
      },
      "customer": {
        "$relation": [
          {
            "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "_slug": "contact"
          }
        ]
      }
    },
    "journey_actions": {
      "journey_id": "string",
      "action_label": {
        "en": "string",
        "de": "string"
      },
      "slug": "string",
      "rules": [
        {
          "entity": "string",
          "attribute": "string",
          "attribute_value": "string"
        }
      ]
    },
    "relations": [
      {
        "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "_title": "Example Entity",
        "_org": "123",
        "_tags": ["example", "mock"],
        "_created_at": "2021-02-09T12:41:43.662Z",
        "_updated_at": "2021-02-09T12:41:43.662Z"
      }
    ]
  }
}
```

</details>

---

### `updateMeter`

Partially updates the details of a meter entity by ID.

`PATCH /v1/metering/meter/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | The ID of the meter. |

**Request Body**

**Sample Call**

```bash
epilot metering updateMeter \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{}'
```

Using positional args for path parameters:

```bash
epilot metering updateMeter 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot metering updateMeter -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot metering updateMeter -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_schema": "meter",
    "ma_lo_id": "A09-123",
    "status": "active",
    "meter_type": "three-phase-meter",
    "tariff_type": "Peak load tariff",
    "meter_number": "J-1093-1AK",
    "sector": "power",
    "location": [
      {
        "country": "Germany",
        "city": "Koln",
        "postal_code": 81475,
        "street": "Melatengürtel",
        "street_number": 71,
        "additional_info": "5. Etage",
        "_tags": ["billing", "delivery"]
      }
    ],
    "used_for": "Domestic Usage",
    "manufacturer": "Energy One",
    "calibration_date": "2022-10-10",
    "contract": {
      "$relation": [
        {
          "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "_slug": "contact"
        }
      ]
    },
    "customer": {
      "$relation": [
        {
          "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "_slug": "contact"
        }
      ]
    }
  }
}
```

</details>

---

### `getMeterCounters`

Retrieves all meter counters associated with a given meter.

`GET /v1/metering/counter`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `meter_id` | query | string (uuid) | Yes |  |

**Sample Call**

```bash
epilot metering getMeterCounters \
  -p meter_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot metering getMeterCounters -p meter_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "_title": "Example Entity",
      "_org": "123",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "meter_counter",
      "obis_number": "A-34",
      "direction": "feed-in",
      "transformer_ratio": 70,
      "unit": "string",
      "forecast_reading_value": 270,
      "forecast_as_of": "2022-12-10",
      "current_consumption": 240,
      "last_reading": "2022-10-10",
      "conversion_factor": 3,
      "tariff_type": "ht"
    }
  ]
}
```

</details>

---

### `getCounterDetails`

Retrieves the full details of a single meter counter by its ID.

`GET /v1/metering/counter/{counter_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `counter_id` | path | string | Yes | The ID of the counter. |

**Sample Call**

```bash
epilot metering getCounterDetails \
  -p counter_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot metering getCounterDetails 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot metering getCounterDetails -p counter_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "_title": "Example Entity",
    "_org": "123",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_schema": "meter_counter",
    "obis_number": "A-34",
    "direction": "feed-in",
    "transformer_ratio": 70,
    "unit": "string",
    "forecast_reading_value": 270,
    "forecast_as_of": "2022-12-10",
    "current_consumption": 240,
    "last_reading": "2022-10-10",
    "conversion_factor": 3,
    "tariff_type": "ht"
  }
}
```

</details>

---

### `createMeterReading`

Inserts a new meter reading.

`POST /v1/metering/reading`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `direct` | query | boolean | No | When true, bypasses changeset interception and writes directly to ClickHouse. Used by trusted integrations (e.g., ERP sync) to confirm changes and auto-clear matching pending changesets. |

**Request Body** (required)

**Sample Call**

```bash
epilot metering createMeterReading
```

With request body:

```bash
epilot metering createMeterReading \
  -d '{
  "value": 240,
  "read_by": "John Doe",
  "reason": "",
  "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "direction": "feed-in",
  "timestamp": "2022-10-10",
  "source": "ECP",
  "status": "valid",
  "external_id": "string",
  "remark": "Customer reported unusual consumption",
  "metadata": {
    "registration_id": "1234567890",
    "business_unit": "ABC"
  },
  "note": "string",
  "unit": "string"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot metering createMeterReading
```

With JSONata filter:

```bash
epilot metering createMeterReading --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "value": 240,
    "read_by": "John Doe",
    "reason": "",
    "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "direction": "feed-in",
    "timestamp": "2022-10-10",
    "source": "ECP",
    "status": "valid",
    "external_id": "string",
    "remark": "Customer reported unusual consumption",
    "metadata": {
      "registration_id": "1234567890",
      "business_unit": "ABC"
    },
    "note": "string",
    "unit": "string"
  }
}
```

</details>

---

### `createMeterReadings`

Inserts multiple meter readings at once. Limited to 100 readings per request.

`POST /v1/metering/readings`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `async` | query | boolean | No | Don't wait for the reading to become available in GetReadings API. Useful for large migrations |
| `activity_id` | query | string (ulid) | No | Activity to include in event feed |
| `skip_validation` | query | boolean | No | When set to true, all validations will be skipped and the system will allow the reading to be created.
If set to false or not provided, the system performs the following validations:
  Validation Rule |
| `direct` | query | boolean | No | When true, bypasses changeset interception and writes directly to ClickHouse. Used by trusted integrations (e.g., ERP sync) to confirm changes and auto-clear matching pending changesets. |

**Request Body** (required)

**Sample Call**

```bash
epilot metering createMeterReadings
```

With request body:

```bash
epilot metering createMeterReadings \
  -d '{
  "readings": [
    {
      "value": 240,
      "read_by": "John Doe",
      "reason": "",
      "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "direction": "feed-in",
      "timestamp": "2022-10-10",
      "source": "ECP",
      "status": "valid",
      "external_id": "string",
      "remark": "Customer reported unusual consumption",
      "metadata": {
        "registration_id": "1234567890",
        "business_unit": "ABC"
      },
      "note": "string",
      "unit": "string"
    }
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot metering createMeterReadings
```

With JSONata filter:

```bash
epilot metering createMeterReadings --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "value": 240,
      "read_by": "John Doe",
      "reason": "",
      "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "direction": "feed-in",
      "timestamp": "2022-10-10",
      "source": "ECP",
      "status": "valid",
      "external_id": "string",
      "remark": "Customer reported unusual consumption",
      "metadata": {
        "registration_id": "1234567890",
        "business_unit": "ABC"
      },
      "note": "string",
      "unit": "string"
    }
  ]
}
```

</details>

---

### `createPortalMeterReadings`

Inserts multiple meter readings at once for a given meter via the end customer portal.

`POST /v1/metering/readings/{meter_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `meter_id` | path | string | Yes | The ID of the meter. |
| `direct` | query | boolean | No | When true, bypasses changeset interception and writes directly to ClickHouse. Used by trusted integrations (e.g., ERP sync) to confirm changes and auto-clear matching pending changesets. |

**Request Body** (required)

**Sample Call**

```bash
epilot metering createPortalMeterReadings \
  -p meter_id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot metering createPortalMeterReadings \
  -p meter_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "readings": [
    {
      "value": 240,
      "read_by": "John Doe",
      "reason": "",
      "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "direction": "feed-in",
      "timestamp": "2022-10-10",
      "source": "ECP",
      "status": "valid",
      "external_id": "string",
      "remark": "Customer reported unusual consumption",
      "metadata": {
        "registration_id": "1234567890",
        "business_unit": "ABC"
      },
      "note": "string",
      "unit": "string"
    }
  ]
}'
```

Using positional args for path parameters:

```bash
epilot metering createPortalMeterReadings 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot metering createPortalMeterReadings -p meter_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot metering createPortalMeterReadings -p meter_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "value": 240,
      "read_by": "John Doe",
      "reason": "",
      "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "direction": "feed-in",
      "timestamp": "2022-10-10",
      "source": "ECP",
      "status": "valid",
      "external_id": "string",
      "remark": "Customer reported unusual consumption",
      "metadata": {
        "registration_id": "1234567890",
        "business_unit": "ABC"
      },
      "note": "string",
      "unit": "string"
    }
  ]
}
```

</details>

---

### `batchWriteMeterReadings`

Upserts or deletes multiple meter readings at once. Limited to 100 readings per request.

`POST /v2/metering/readings`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `async` | query | boolean | No | Don't wait for the reading to become available in GetReadings API. Useful for large migrations |
| `skip_validation` | query | boolean | No | When set to true, all validations will be skipped and the system will allow the reading to be created.
If set to false or not provided, the system performs the following validations:
  Validation Rule |
| `activity_id` | query | string (ulid) | No | Activity to include in event feed |
| `direct` | query | boolean | No | When true, bypasses changeset interception and writes directly to ClickHouse. Used by trusted integrations (e.g., ERP sync) to confirm changes and auto-clear matching pending changesets. |

**Request Body** (required)

**Sample Call**

```bash
epilot metering batchWriteMeterReadings
```

With request body:

```bash
epilot metering batchWriteMeterReadings \
  -d '{
  "identifiers": ["string"],
  "readings": [
    {
      "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "direction": "feed-in",
      "timestamp": "2022-10-10T10:00:00Z",
      "external_id": "string",
      "metadata": {
        "registration_id": "1234567890",
        "business_unit": "ABC"
      },
      "operation": "create",
      "value": 240,
      "source": "ECP",
      "read_by": "John Doe",
      "reason": "",
      "status": "valid",
      "remark": "Customer reported unusual consumption",
      "note": "string",
      "unit": "string"
    }
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot metering batchWriteMeterReadings
```

With JSONata filter:

```bash
epilot metering batchWriteMeterReadings --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "value": 240,
      "read_by": "John Doe",
      "reason": "",
      "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "direction": "feed-in",
      "timestamp": "2022-10-10",
      "source": "ECP",
      "status": "valid",
      "external_id": "string",
      "remark": "Customer reported unusual consumption",
      "metadata": {
        "registration_id": "1234567890",
        "business_unit": "ABC"
      },
      "note": "string",
      "unit": "string"
    }
  ]
}
```

</details>

---

### `createMeterReadingFromSubmission`

Creates meter readings from a journey submission payload.

`POST /v1/metering/reading/submission`

**Request Body** (required)

**Sample Call**

```bash
epilot metering createMeterReadingFromSubmission
```

With request body:

```bash
epilot metering createMeterReadingFromSubmission \
  -d '{
  "org_id": "123",
  "entity": {
    "_org": "123",
    "meterReadings": [
      {
        "meterId": "string",
        "readings": [
          {
            "counterId": "string",
            "direction": "feed-in",
            "unit": "string",
            "value": 240
          }
        ],
        "readingValue": 240,
        "readingDate": "2022-10-10T10:10:00.000Z",
        "readBy": "John Doe",
        "reason": "",
        "maloId": "A09-123",
        "obisNumber": "A-34",
        "readingUnit": "string",
        "meterType": "one_tariff",
        "feedInValue": 240,
        "feedOutValue": 240,
        "htValue": 240,
        "ntValue": 240
      }
    ]
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot metering createMeterReadingFromSubmission
```

With JSONata filter:

```bash
epilot metering createMeterReadingFromSubmission --jsonata 'message'
```

<details>
<summary>Sample Response</summary>

```json
{
  "message": "Successfully Processed"
}
```

</details>

---

### `getAllowedReadingForMeter`

Returns the allowed min/max reading range for each counter of the given meter.

`GET /v1/metering/allowed/reading/{meter_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `meter_id` | path | string | Yes | The ID of the meter. |
| `timestamp` | query | string | No | If not provided, the system will default to now. |

**Sample Call**

```bash
epilot metering getAllowedReadingForMeter \
  -p meter_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot metering getAllowedReadingForMeter 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot metering getAllowedReadingForMeter -p meter_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": [
    {
      "counter_id": "string",
      "min_value": 0,
      "max_value": 0
    }
  ]
}
```

</details>

---

### `createReadingWithMeter`

Creates a meter reading along with meter lookup or creation by MA-LO ID and OBIS number.

`POST /v1/metering/reading/with-meter`

**Request Body** (required)

**Sample Call**

```bash
epilot metering createReadingWithMeter
```

With request body:

```bash
epilot metering createReadingWithMeter \
  -d '{
  "ma_lo_id": "A09-123",
  "meter_id": "string",
  "obis_number": "A-34",
  "unit": "string",
  "direction": "feed-in",
  "tariff_type": "ht",
  "value": 240,
  "read_by": "John Doe",
  "reason": "",
  "timestamp": "2022-10-10T10:10:00.000Z",
  "source": "ECP"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot metering createReadingWithMeter
```

With JSONata filter:

```bash
epilot metering createReadingWithMeter --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "value": 240,
    "read_by": "John Doe",
    "reason": "",
    "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "direction": "feed-in",
    "timestamp": "2022-10-10",
    "source": "ECP",
    "status": "valid",
    "external_id": "string",
    "remark": "Customer reported unusual consumption",
    "metadata": {
      "registration_id": "1234567890",
      "business_unit": "ABC"
    },
    "note": "string",
    "unit": "string"
  }
}
```

</details>

---

### `getReadingsByInterval`

Retrieves all readings specified in an interval.

`GET /v1/metering/reading/{meter_id}/{counter_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `meter_id` | path | string | Yes | The ID of the meter. |
| `counter_id` | path | string | Yes | The ID of the counter. |
| `start_date` | query | string | No | If not provided, the system will default to 2000-01-01. |
| `end_date` | query | string | No | If not provided, the system will default to today's date. |
| `direction` | query | "feed-in" \| "feed-out" | No |  |
| `size` | query | number | No | Returns the first n results after the specified offset (from).
If this value is provided as -1, then it returns all results at once.
 |
| `from` | query | number | No |  |
| `type` | query | "cumulative" \| "relative" | Yes | Since meter readings are cumulative, users may need to request actual consumptions, which are the difference between consecutive measurements.
If this value is provided as "cumulative", then actual re |
| `sort` | query | "asc" \| "desc" | No | If this value is provided as "asc", then the results will be sorted by the timestamp field in ascending order.
If this value is provided as "desc", then the results will be sorted by the timestamp fie |
| `include_pending_changesets` | query | boolean | No | When true, the response includes a `pending_changesets` field with the list of pending reading changesets alongside the confirmed readings. |

**Sample Call**

```bash
epilot metering getReadingsByInterval \
  -p meter_id=123e4567-e89b-12d3-a456-426614174000 \
  -p counter_id=123e4567-e89b-12d3-a456-426614174000 \
  -p type=example
```

Using positional args for path parameters:

```bash
epilot metering getReadingsByInterval 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot metering getReadingsByInterval -p meter_id=123e4567-e89b-12d3-a456-426614174000 -p counter_id=123e4567-e89b-12d3-a456-426614174000 -p type=example --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "value": 240,
      "read_by": "John Doe",
      "reason": "",
      "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "direction": "feed-in",
      "timestamp": "2022-10-10",
      "source": "ECP",
      "status": "valid",
      "external_id": "string",
      "remark": "Customer reported unusual consumption",
      "metadata": {
        "registration_id": "1234567890",
        "business_unit": "ABC"
      },
      "note": "string",
      "unit": "string"
    }
  ],
  "hits": 120,
  "firstRecordCreatedAt": "2022-10-01T20:00:00.000Z"
}
```

</details>

---

### `updateMeterReading`

Updates an existing meter reading identified by meter ID, counter ID, and timestamp.

`PUT /v1/metering/reading/{meter_id}/{counter_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `meter_id` | path | string | Yes | The ID of the meter entity. |
| `counter_id` | path | string | Yes | The ID of the counter entity. |
| `timestamp` | query | string | Yes | The timestamp when the reading was created. |

**Request Body** (required)

**Sample Call**

```bash
epilot metering updateMeterReading \
  -p meter_id=123e4567-e89b-12d3-a456-426614174000 \
  -p counter_id=123e4567-e89b-12d3-a456-426614174000 \
  -p timestamp=2022-10-01T20:00:00.000Z
```

With request body:

```bash
epilot metering updateMeterReading \
  -p meter_id=123e4567-e89b-12d3-a456-426614174000 \
  -p counter_id=123e4567-e89b-12d3-a456-426614174000 \
  -p timestamp=2022-10-01T20:00:00.000Z \
  -d '{
  "value": 240,
  "read_by": "John Doe",
  "reason": "string",
  "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "direction": "feed-in",
  "timestamp": "2022-10-10",
  "source": "ECP",
  "status": "valid",
  "external_id": "string",
  "remark": "Customer reported unusual consumption",
  "metadata": {
    "registration_id": "1234567890",
    "business_unit": "ABC"
  }
}'
```

Using positional args for path parameters:

```bash
epilot metering updateMeterReading 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot metering updateMeterReading -p meter_id=123e4567-e89b-12d3-a456-426614174000 -p counter_id=123e4567-e89b-12d3-a456-426614174000 -p timestamp=2022-10-01T20:00:00.000Z
```

With JSONata filter:

```bash
epilot metering updateMeterReading -p meter_id=123e4567-e89b-12d3-a456-426614174000 -p counter_id=123e4567-e89b-12d3-a456-426614174000 -p timestamp=2022-10-01T20:00:00.000Z --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "value": 240,
    "read_by": "John Doe",
    "reason": "",
    "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "direction": "feed-in",
    "timestamp": "2022-10-10",
    "source": "ECP",
    "status": "valid",
    "external_id": "string",
    "remark": "Customer reported unusual consumption",
    "metadata": {
      "registration_id": "1234567890",
      "business_unit": "ABC"
    },
    "note": "string",
    "unit": "string"
  }
}
```

</details>

---

### `deleteMeterReading`

Permanently deletes a meter reading identified by meter ID, counter ID, and timestamp.

`DELETE /v1/metering/reading/{meter_id}/{counter_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `meter_id` | path | string | Yes | The ID of the meter entity. |
| `counter_id` | path | string | Yes | The ID of the counter entity. |
| `timestamp` | query | string | Yes | The timestamp when the reading was created. |

**Sample Call**

```bash
epilot metering deleteMeterReading \
  -p meter_id=123e4567-e89b-12d3-a456-426614174000 \
  -p counter_id=123e4567-e89b-12d3-a456-426614174000 \
  -p timestamp=2022-10-01T20:00:00.000Z
```

Using positional args for path parameters:

```bash
epilot metering deleteMeterReading 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot metering deleteMeterReading -p meter_id=123e4567-e89b-12d3-a456-426614174000 -p counter_id=123e4567-e89b-12d3-a456-426614174000 -p timestamp=2022-10-01T20:00:00.000Z --jsonata 'data'
```

<details>
<summary>Sample Response</summary>

```json
{
  "data": {
    "meterId": "string",
    "counterId": "string",
    "timestamp": "2022-10-01T20:00:00.000Z"
  }
}
```

</details>

---

### `getReadingChangesets`

`GET /v1/metering/reading/{meter_id}/{counter_id}/changesets`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `meter_id` | path | string | Yes | The ID of the meter. |
| `counter_id` | path | string | Yes | The ID of the counter. |

**Sample Call**

```bash
epilot metering getReadingChangesets \
  -p meter_id=123e4567-e89b-12d3-a456-426614174000 \
  -p counter_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot metering getReadingChangesets 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot metering getReadingChangesets -p meter_id=123e4567-e89b-12d3-a456-426614174000 -p counter_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'changesets'
```

<details>
<summary>Sample Response</summary>

```json
{
  "changesets": [
    {
      "changeset_id": "string",
      "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "proposed": {
        "value": 0,
        "direction": "feed-in",
        "timestamp": "1970-01-01T00:00:00.000Z",
        "reason": "string",
        "remark": "string",
        "read_by": "string",
        "status": "valid",
        "external_id": "string"
      },
      "previous": {
        "value": 0,
        "direction": "feed-in",
        "timestamp": "1970-01-01T00:00:00.000Z",
        "reason": "string",
        "remark": "string",
        "read_by": "string",
        "status": "valid",
        "external_id": "string"
      },
      "edit_mode": "external",
      "match_strategy": "exact",
      "timestamp_tolerance": "exact",
      "created_at": "1970-01-01T00:00:00.000Z",
      "created_by": {
        "type": "user",
        "id": "string"
      },
      "source": "360",
      "fuzzy_config": {
        "percentage_threshold": 0.01,
        "absolute_threshold": 0
      },
      "dismissed_reason": "string",
      "dismissed_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `applyReadingChangeset`

Applies the proposed reading value to ClickHouse and removes the pending changeset.

`POST /v1/metering/reading/{meter_id}/{counter_id}/changesets/{changeset_id}:apply`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `meter_id` | path | string | Yes | The ID of the meter. |
| `counter_id` | path | string | Yes | The ID of the counter. |
| `changeset_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot metering applyReadingChangeset \
  -p meter_id=123e4567-e89b-12d3-a456-426614174000 \
  -p counter_id=123e4567-e89b-12d3-a456-426614174000 \
  -p changeset_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot metering applyReadingChangeset 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot metering applyReadingChangeset -p meter_id=123e4567-e89b-12d3-a456-426614174000 -p counter_id=123e4567-e89b-12d3-a456-426614174000 -p changeset_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'reading'
```

<details>
<summary>Sample Response</summary>

```json
{
  "reading": {
    "value": 240,
    "read_by": "John Doe",
    "reason": "",
    "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "direction": "feed-in",
    "timestamp": "2022-10-10",
    "source": "ECP",
    "status": "valid",
    "external_id": "string",
    "remark": "Customer reported unusual consumption",
    "metadata": {
      "registration_id": "1234567890",
      "business_unit": "ABC"
    },
    "note": "string",
    "unit": "string"
  },
  "changeset": {
    "changeset_id": "string",
    "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "proposed": {
      "value": 0,
      "direction": "feed-in",
      "timestamp": "1970-01-01T00:00:00.000Z",
      "reason": "string",
      "remark": "string",
      "read_by": "string",
      "status": "valid",
      "external_id": "string"
    },
    "previous": {
      "value": 0,
      "direction": "feed-in",
      "timestamp": "1970-01-01T00:00:00.000Z",
      "reason": "string",
      "remark": "string",
      "read_by": "string",
      "status": "valid",
      "external_id": "string"
    },
    "edit_mode": "external",
    "match_strategy": "exact",
    "timestamp_tolerance": "exact",
    "created_at": "1970-01-01T00:00:00.000Z",
    "created_by": {
      "type": "user",
      "id": "string"
    },
    "source": "360",
    "fuzzy_config": {
      "percentage_threshold": 0.01,
      "absolute_threshold": 0
    },
    "dismissed_reason": "string",
    "dismissed_at": "1970-01-01T00:00:00.000Z"
  }
}
```

</details>

---

### `dismissReadingChangeset`

Removes the pending changeset without applying it. The reading value remains unchanged.

`POST /v1/metering/reading/{meter_id}/{counter_id}/changesets/{changeset_id}:dismiss`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `meter_id` | path | string | Yes | The ID of the meter. |
| `counter_id` | path | string | Yes | The ID of the counter. |
| `changeset_id` | path | string | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot metering dismissReadingChangeset \
  -p meter_id=123e4567-e89b-12d3-a456-426614174000 \
  -p counter_id=123e4567-e89b-12d3-a456-426614174000 \
  -p changeset_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"reason":"string"}'
```

Using positional args for path parameters:

```bash
epilot metering dismissReadingChangeset 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot metering dismissReadingChangeset -p meter_id=123e4567-e89b-12d3-a456-426614174000 -p counter_id=123e4567-e89b-12d3-a456-426614174000 -p changeset_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot metering dismissReadingChangeset -p meter_id=123e4567-e89b-12d3-a456-426614174000 -p counter_id=123e4567-e89b-12d3-a456-426614174000 -p changeset_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'changeset_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "changeset_id": "string",
  "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "proposed": {
    "value": 0,
    "direction": "feed-in",
    "timestamp": "1970-01-01T00:00:00.000Z",
    "reason": "string",
    "remark": "string",
    "read_by": "string",
    "status": "valid",
    "external_id": "string"
  },
  "previous": {
    "value": 0,
    "direction": "feed-in",
    "timestamp": "1970-01-01T00:00:00.000Z",
    "reason": "string",
    "remark": "string",
    "read_by": "string",
    "status": "valid",
    "external_id": "string"
  },
  "edit_mode": "external",
  "match_strategy": "exact",
  "timestamp_tolerance": "exact",
  "created_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "user",
    "id": "string"
  },
  "source": "360",
  "fuzzy_config": {
    "percentage_threshold": 0.01,
    "absolute_threshold": 0
  },
  "dismissed_reason": "string",
  "dismissed_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateReadingChangeset`

Updates the proposed value of a pending changeset without going through the normal write path.

`PATCH /v1/metering/reading/{meter_id}/{counter_id}/changesets/{changeset_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `meter_id` | path | string | Yes | The ID of the meter. |
| `counter_id` | path | string | Yes | The ID of the counter. |
| `changeset_id` | path | string | Yes |  |

**Request Body**

**Sample Call**

```bash
epilot metering updateReadingChangeset \
  -p meter_id=123e4567-e89b-12d3-a456-426614174000 \
  -p counter_id=123e4567-e89b-12d3-a456-426614174000 \
  -p changeset_id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot metering updateReadingChangeset \
  -p meter_id=123e4567-e89b-12d3-a456-426614174000 \
  -p counter_id=123e4567-e89b-12d3-a456-426614174000 \
  -p changeset_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "proposed": {
    "value": 0,
    "direction": "feed-in",
    "timestamp": "1970-01-01T00:00:00.000Z",
    "reason": "string",
    "remark": "string",
    "read_by": "string",
    "status": "valid",
    "external_id": "string"
  }
}'
```

Using positional args for path parameters:

```bash
epilot metering updateReadingChangeset 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot metering updateReadingChangeset -p meter_id=123e4567-e89b-12d3-a456-426614174000 -p counter_id=123e4567-e89b-12d3-a456-426614174000 -p changeset_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot metering updateReadingChangeset -p meter_id=123e4567-e89b-12d3-a456-426614174000 -p counter_id=123e4567-e89b-12d3-a456-426614174000 -p changeset_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'changeset_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "changeset_id": "string",
  "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "proposed": {
    "value": 0,
    "direction": "feed-in",
    "timestamp": "1970-01-01T00:00:00.000Z",
    "reason": "string",
    "remark": "string",
    "read_by": "string",
    "status": "valid",
    "external_id": "string"
  },
  "previous": {
    "value": 0,
    "direction": "feed-in",
    "timestamp": "1970-01-01T00:00:00.000Z",
    "reason": "string",
    "remark": "string",
    "read_by": "string",
    "status": "valid",
    "external_id": "string"
  },
  "edit_mode": "external",
  "match_strategy": "exact",
  "timestamp_tolerance": "exact",
  "created_at": "1970-01-01T00:00:00.000Z",
  "created_by": {
    "type": "user",
    "id": "string"
  },
  "source": "360",
  "fuzzy_config": {
    "percentage_threshold": 0.01,
    "absolute_threshold": 0
  },
  "dismissed_reason": "string",
  "dismissed_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---
