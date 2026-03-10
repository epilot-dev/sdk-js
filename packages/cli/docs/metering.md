# Metering API

- **Base URL:** `https://metering.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/metering](https://docs.epilot.io/api/metering)

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
- [`getCustomerMeters`](#getcustomermeters) — Retrieves all meters related to a customer.
- [`getMetersByContractId`](#getmetersbycontractid) — Retrieves all meters related to a contract.
- [`getMeter`](#getmeter) — Retrieves the details of a meter.
- [`updateMeter`](#updatemeter) — Updates the details of a meter.
- [`getMeterCounters`](#getmetercounters) — Retrieves all counters for a given meter.
- [`getCounterDetails`](#getcounterdetails) — Retrieves the details of a meter counter.
- [`createPortalMeterReadings`](#createportalmeterreadings) — Inserts multiple meter readings at once for a given meter. Limited to 2 readings per request.

**ECP Admin**
- [`createMeterReading`](#createmeterreading) — Inserts a new meter reading.
- [`createMeterReadings`](#createmeterreadings) — Inserts multiple meter readings at once. Limited to 100 readings per request.
- [`batchWriteMeterReadings`](#batchwritemeterreadings) — Upserts/Deletes multiple meter readings at once. Limited to 100 readings per request.
- [`createMeterReadingFromSubmission`](#createmeterreadingfromsubmission) — Creates a reading from a journey submission.
- [`getAllowedReadingForMeter`](#getallowedreadingformeter) — Get allowed reading for the given meter
- [`createReadingWithMeter`](#createreadingwithmeter) — Creates a reading along with a meter.
- [`getReadingsByInterval`](#getreadingsbyinterval) — Retrieves all readings specified in an interval.
- [`updateMeterReading`](#updatemeterreading) — Updates a meter reading.
- [`deleteMeterReading`](#deletemeterreading) — Deletes a meter reading.

### `getCustomerMeters`

Retrieves all meters related to a customer.

`GET /v1/metering/meter`

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
      "calibration_date": "2022-10-10T00:00:00.000Z",
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
      "last_reading": "2022-10-10T00:00:00.000Z",
      "current_consumption": 100.5
    }
  ]
}
```

</details>

---

### `getMetersByContractId`

Retrieves all meters related to a contract.

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
      "calibration_date": "2022-10-10T00:00:00.000Z",
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

Retrieves the details of a meter.

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
      "calibration_date": "2022-10-10T00:00:00.000Z",
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

Updates the details of a meter.

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
    "calibration_date": "2022-10-10T00:00:00.000Z",
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

Retrieves all counters for a given meter.

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
      "forecast_as_of": "2022-12-10T00:00:00.000Z",
      "current_consumption": 240,
      "last_reading": "2022-10-10T00:00:00.000Z",
      "conversion_factor": 3,
      "tariff_type": "ht"
    }
  ]
}
```

</details>

---

### `getCounterDetails`

Retrieves the details of a meter counter.

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
    "forecast_as_of": "2022-12-10T00:00:00.000Z",
    "current_consumption": 240,
    "last_reading": "2022-10-10T00:00:00.000Z",
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
  "timestamp": "2022-10-10T00:00:00.000Z",
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
    "timestamp": "2022-10-10T00:00:00.000Z",
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
      "timestamp": "2022-10-10T00:00:00.000Z",
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
      "timestamp": "2022-10-10T00:00:00.000Z",
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

Inserts multiple meter readings at once for a given meter. Limited to 2 readings per request.

`POST /v1/metering/readings/{meter_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `meter_id` | path | string | Yes | The ID of the meter. |

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
      "timestamp": "2022-10-10T00:00:00.000Z",
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
      "timestamp": "2022-10-10T00:00:00.000Z",
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

Upserts/Deletes multiple meter readings at once. Limited to 100 readings per request.

`POST /v2/metering/readings`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `async` | query | boolean | No | Don't wait for the reading to become available in GetReadings API. Useful for large migrations |
| `skip_validation` | query | boolean | No | When set to true, all validations will be skipped and the system will allow the reading to be created.
If set to false or not provided, the system performs the following validations:
  Validation Rule |
| `activity_id` | query | string (ulid) | No | Activity to include in event feed |

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
      "value": 240,
      "read_by": "John Doe",
      "reason": "",
      "meter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "counter_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "direction": "feed-in",
      "timestamp": "2022-10-10T00:00:00.000Z",
      "source": "ECP",
      "status": "valid",
      "external_id": "string",
      "remark": "Customer reported unusual consumption",
      "metadata": {
        "registration_id": "1234567890",
        "business_unit": "ABC"
      },
      "note": "string",
      "unit": "string",
      "operation": "create"
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
      "timestamp": "2022-10-10T00:00:00.000Z",
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

Creates a reading from a journey submission.

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

Get allowed reading for the given meter

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

Creates a reading along with a meter.

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
    "timestamp": "2022-10-10T00:00:00.000Z",
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
      "timestamp": "2022-10-10T00:00:00.000Z",
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

Updates a meter reading.

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
  "timestamp": "2022-10-10T00:00:00.000Z",
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
    "timestamp": "2022-10-10T00:00:00.000Z",
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

Deletes a meter reading.

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
