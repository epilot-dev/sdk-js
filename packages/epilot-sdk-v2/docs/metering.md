# Metering API

- **Base URL:** `https://metering.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/metering](https://docs.epilot.io/api/metering)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.metering.getCustomerMeters(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/metering'

const meteringClient = getClient()
authorize(meteringClient, () => '<token>')
const { data } = await meteringClient.getCustomerMeters(...)
```

## Operations

**ECP**
- [`getCustomerMeters`](#getcustomermeters)
- [`getMetersByContractId`](#getmetersbycontractid)
- [`updateMeter`](#updatemeter)
- [`getMeter`](#getmeter)
- [`getMeterCounters`](#getmetercounters)
- [`getCounterDetails`](#getcounterdetails)
- [`createPortalMeterReadings`](#createportalmeterreadings)

**ECP Admin**
- [`createMeterReading`](#createmeterreading)
- [`createMeterReadings`](#createmeterreadings)
- [`batchWriteMeterReadings`](#batchwritemeterreadings)
- [`pruneMeterReadings`](#prunemeterreadings)
- [`createMeterReadingFromSubmission`](#createmeterreadingfromsubmission)
- [`getAllowedReadingForMeter`](#getallowedreadingformeter)
- [`createReadingWithMeter`](#createreadingwithmeter)
- [`getReadingsByInterval`](#getreadingsbyinterval)
- [`updateMeterReading`](#updatemeterreading)
- [`deleteMeterReading`](#deletemeterreading)

**Metering**
- [`getReadingChangesets`](#getreadingchangesets)
- [`applyReadingChangeset`](#applyreadingchangeset)
- [`dismissReadingChangeset`](#dismissreadingchangeset)
- [`updateReadingChangeset`](#updatereadingchangeset)

**Schemas**
- [`ErrorResp`](#errorresp)
- [`EntityId`](#entityid)
- [`EntitySlug`](#entityslug)
- [`BaseEntity`](#baseentity)
- [`Entity`](#entity)
- [`EntityItem`](#entityitem)
- [`Id`](#id)
- [`EntityRelation`](#entityrelation)
- [`Meter`](#meter)
- [`Direction`](#direction)
- [`TariffType`](#tarifftype)
- [`Reason`](#reason)
- [`ReasonString`](#reasonstring)
- [`ReadBy`](#readby)
- [`ReadingStatus`](#readingstatus)
- [`Reading`](#reading)
- [`MeterReading`](#meterreading)
- [`PortalMeterReading`](#portalmeterreading)
- [`BatchReadingBase`](#batchreadingbase)
- [`CreateOrUpdateBatchReading`](#createorupdatebatchreading)
- [`DeleteBatchReading`](#deletebatchreading)
- [`BatchReading`](#batchreading)
- [`PruneMeterReadingsPayload`](#prunemeterreadingspayload)
- [`UpdateMeterReading`](#updatemeterreading)
- [`MeterCounter`](#metercounter)
- [`CounterReadingOnSubmission`](#counterreadingonsubmission)
- [`SubmissionMeterReading`](#submissionmeterreading)
- [`Unit`](#unit)
- [`Source`](#source)
- [`ActionLabel`](#actionlabel)
- [`Rule`](#rule)
- [`JourneyActions`](#journeyactions)
- [`ReadingWithMeter`](#readingwithmeter)
- [`MeterReadingChangeset`](#meterreadingchangeset)
- [`FuzzyConfig`](#fuzzyconfig)
- [`ProposedReading`](#proposedreading)
- [`ChangesetCreator`](#changesetcreator)
- [`TimestampTolerance`](#timestamptolerance)
- [`ActivityId`](#activityid)

### `getCustomerMeters`

Retrieves all meters associated with the authenticated portal customer.

`GET /v1/metering/meter`

```ts
const { data } = await client.getCustomerMeters({
  include_pending_changesets: true,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getMetersByContractId({
  contract_id: 'example',
})
```

<details>
<summary>Response</summary>

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

### `updateMeter`

Partially updates the details of a meter entity by ID.

`PATCH /v1/metering/meter/{id}`

```ts
const { data } = await client.updateMeter(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {},
)
```

<details>
<summary>Response</summary>

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

### `getMeter`

Retrieves the full details of a specific meter by ID, including related entities and available journey actions.

`GET /v1/metering/meter/{id}`

```ts
const { data } = await client.getMeter({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

### `getMeterCounters`

Retrieves all meter counters associated with a given meter.

`GET /v1/metering/counter`

```ts
const { data } = await client.getMeterCounters({
  meter_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getCounterDetails({
  counter_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createMeterReading(
  {
    direct: true,
  },
  {
    value: 240,
    read_by: 'John Doe',
    reason: '',
    meter_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    counter_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    direction: 'feed-in',
    timestamp: '2022-10-10',
    source: 'ECP',
    status: 'valid',
    external_id: 'string',
    remark: 'Customer reported unusual consumption',
    metadata: {
      registration_id: '1234567890',
      business_unit: 'ABC'
    },
    note: 'string',
    unit: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createMeterReadings(
  {
    async: true,
    activity_id: 'example',
    skip_validation: true,
    direct: true,
    create_ticket: true,
  },
  {
    readings: [
      {
        value: 240,
        read_by: 'John Doe',
        reason: '',
        meter_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        counter_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        direction: 'feed-in',
        timestamp: '2022-10-10',
        source: 'ECP',
        status: 'valid',
        external_id: 'string',
        remark: 'Customer reported unusual consumption',
        metadata: {
          registration_id: '1234567890',
          business_unit: 'ABC'
        },
        note: 'string',
        unit: 'string'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

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
Limited to 100 readings per request.

`POST /v1/metering/readings/{meter_id}`

```ts
const { data } = await client.createPortalMeterReadings(
  {
    meter_id: 'example',
    direct: true,
  },
  {
    readings: [
      {
        value: 240,
        read_by: 'John Doe',
        reason: '',
        meter_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        counter_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        direction: 'feed-in',
        timestamp: '2022-10-10',
        source: 'ECP',
        status: 'valid',
        external_id: 'string',
        remark: 'Customer reported unusual consumption',
        metadata: {
          registration_id: '1234567890',
          business_unit: 'ABC'
        },
        note: 'string',
        unit: 'string'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.batchWriteMeterReadings(
  {
    async: true,
    skip_validation: true,
    activity_id: 'example',
    direct: true,
    create_ticket: true,
  },
  {
    identifiers: ['string'],
    readings: [
      {
        meter_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        counter_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        direction: 'feed-in',
        timestamp: '2022-10-10T10:00:00Z',
        external_id: 'string',
        metadata: {
          registration_id: '1234567890',
          business_unit: 'ABC'
        },
        operation: 'create',
        value: 240,
        source: 'ECP',
        read_by: 'John Doe',
        reason: '',
        status: 'valid',
        remark: 'Customer reported unusual consumption',
        note: 'string',
        unit: 'string'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

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

### `pruneMeterReadings`

Deletes every reading of a meter whose `external_id` is NOT in the provided keep list — in a single request.

`POST /v2/metering/readings/prune`

```ts
const { data } = await client.pruneMeterReadings(
  {
    async: true,
    activity_id: 'example',
    create_ticket: true,
    dry_run: true,
  },
  {
    meter_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    counter_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    source: 'ECP',
    keep_external_ids: ['erp-reading-1', 'erp-reading-2']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "data": {
    "deleted_count": 42,
    "kept_count": 12
  }
}
```

</details>

---

### `createMeterReadingFromSubmission`

Creates meter readings from a journey submission payload.

`POST /v1/metering/reading/submission`

```ts
const { data } = await client.createMeterReadingFromSubmission(
  null,
  {
    org_id: '123',
    entity: {
      _org: '123',
      meterReadings: [
        {
          meterId: 'string',
          readings: [
            {
              counterId: 'string',
              direction: 'feed-in',
              unit: 'string',
              value: 240
            }
          ],
          readingValue: 240,
          readingDate: '2022-10-10T10:10:00.000Z',
          readBy: 'John Doe',
          reason: '',
          maloId: 'A09-123',
          obisNumber: 'A-34',
          readingUnit: 'string',
          meterType: 'one_tariff',
          feedInValue: 240,
          feedOutValue: 240,
          htValue: 240,
          ntValue: 240
        }
      ]
    }
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getAllowedReadingForMeter({
  meter_id: 'example',
  timestamp: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createReadingWithMeter(
  null,
  {
    ma_lo_id: 'A09-123',
    meter_id: 'string',
    obis_number: 'A-34',
    unit: 'string',
    direction: 'feed-in',
    tariff_type: 'ht',
    value: 240,
    read_by: 'John Doe',
    reason: '',
    timestamp: '2022-10-10T10:10:00.000Z',
    source: 'ECP'
  },
)
```

<details>
<summary>Response</summary>

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
If the start_date and end_date are equal, then it returns the readings of the specified date.
The start_date should be less than or equal to the end_da

`GET /v1/metering/reading/{meter_id}/{counter_id}`

```ts
const { data } = await client.getReadingsByInterval({
  meter_id: 'example',
  counter_id: 'example',
  start_date: 'example',
  end_date: 'example',
  direction: 'example',
  size: 1,
  from: 1,
  type: 'example',
  sort: 'example',
  include_pending_changesets: true,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateMeterReading(
  {
    meter_id: 'example',
    counter_id: 'example',
    timestamp: 'example',
  },
  {
    value: 240,
    read_by: 'John Doe',
    reason: 'string',
    meter_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    counter_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    direction: 'feed-in',
    timestamp: '2022-10-10',
    source: 'ECP',
    status: 'valid',
    external_id: 'string',
    remark: 'Customer reported unusual consumption',
    metadata: {
      registration_id: '1234567890',
      business_unit: 'ABC'
    }
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteMeterReading({
  meter_id: 'example',
  counter_id: 'example',
  timestamp: 'example',
})
```

<details>
<summary>Response</summary>

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

List pending reading changesets for a counter

`GET /v1/metering/reading/{meter_id}/{counter_id}/changesets`

```ts
const { data } = await client.getReadingChangesets({
  meter_id: 'example',
  counter_id: 'example',
})
```

<details>
<summary>Response</summary>

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

Apply (approve) a pending reading changeset

`POST /v1/metering/reading/{meter_id}/{counter_id}/changesets/{changeset_id}:apply`

```ts
const { data } = await client.applyReadingChangeset({
  meter_id: 'example',
  counter_id: 'example',
  changeset_id: 'example',
})
```

<details>
<summary>Response</summary>

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

Dismiss (reject) a pending reading changeset

`POST /v1/metering/reading/{meter_id}/{counter_id}/changesets/{changeset_id}:dismiss`

```ts
const { data } = await client.dismissReadingChangeset(
  {
    meter_id: 'example',
    counter_id: 'example',
    changeset_id: 'example',
  },
  {
    reason: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

Edit a pending reading changeset

`PATCH /v1/metering/reading/{meter_id}/{counter_id}/changesets/{changeset_id}`

```ts
const { data } = await client.updateReadingChangeset(
  {
    meter_id: 'example',
    counter_id: 'example',
    changeset_id: 'example',
  },
  {
    proposed: {
      value: 0,
      direction: 'feed-in',
      timestamp: '1970-01-01T00:00:00.000Z',
      reason: 'string',
      remark: 'string',
      read_by: 'string',
      status: 'valid',
      external_id: 'string'
    }
  },
)
```

<details>
<summary>Response</summary>

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

## Schemas

### `ErrorResp`

```ts
type ErrorResp = {
  message?: string
}
```

### `EntityId`

```ts
type EntityId = string // uuid
```

### `EntitySlug`

URL-friendly identifier for the entity schema

```ts
type EntitySlug = string
```

### `BaseEntity`

```ts
type BaseEntity = {
  _id: string // uuid
  _title: string
  _org: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
}
```

### `Entity`

```ts
type Entity = Record<string, unknown>
```

### `EntityItem`

```ts
type EntityItem = {
  _id: string // uuid
  _title: string
  _org: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
}
```

### `Id`

```ts
type Id = string
```

### `EntityRelation`

```ts
type EntityRelation = {
  entity_id?: string // uuid
  _slug?: "contact" | "contract"
}
```

### `Meter`

```ts
type Meter = {
  _id: string // uuid
  _title: string
  _org: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  _schema: "meter"
  ma_lo_id?: string
  status?: "active" | "decommissioned"
  meter_type?: "three-phase-meter" | "bellow-gas-meter" | "rotary-piston-meter" | "smart-meter" | "performance-meter" | "maximum-meter" | "turbine-gas-meter" | "ultrasonic-gas-meter" | "alternating-current-meter" | "modern-metering-system" | "intelligent-measuring-system" | "electronic-meter"
  tariff_type?: string
  meter_number?: string
  sector?: "power" | "water" | "gas" | "district_heating" | "waste_water"
  location?: object
  used_for?: string
  manufacturer?: string
  calibration_date?: string
  contract?: {
    $relation?: Array<{
      entity_id?: { ... }
      _slug?: { ... }
    }>
  }
  customer?: {
    $relation?: Array<{
      entity_id?: { ... }
      _slug?: { ... }
    }>
  }
}
```

### `Direction`

```ts
type Direction = "feed-in" | "feed-out"
```

### `TariffType`

```ts
type TariffType = "ht" | "nt"
```

### `Reason`

The reason for recording the reading
If no reason is specified or left empty, the Epilot UI will show 'Regular' as the default display text


```ts
type Reason = "" | "regular" | "irregular" | "last" | "first" | "meter_change" | "contract_change" | "meter_adjustment"
```

### `ReasonString`

This field is deprecated. Please use the Reason enum instead.


```ts
type ReasonString = string
```

### `ReadBy`

The person who recorded the reading

```ts
type ReadBy = string
```

### `ReadingStatus`

```ts
type ReadingStatus = "valid" | "in-validation" | "implausible" | null | ""
```

### `Reading`

```ts
type Reading = {
  value: number
  read_by?: string
  reason?: "" | "regular" | "irregular" | "last" | "first" | "meter_change" | "contract_change" | "meter_adjustment"
  meter_id?: string // uuid
  counter_id?: string // uuid
  direction?: "feed-in" | "feed-out"
  timestamp?: string // date-time
  source: "ECP" | "ERP" | "360" | "journey-submission"
  status?: "valid" | "in-validation" | "implausible" | null | ""
  external_id?: string
  remark?: string
  metadata?: Record<string, string>
  note?: string
  unit?: string
}
```

### `MeterReading`

```ts
type MeterReading = {
  value: number
  read_by?: string
  reason?: "" | "regular" | "irregular" | "last" | "first" | "meter_change" | "contract_change" | "meter_adjustment"
  meter_id: string // uuid
  counter_id?: string // uuid
  direction?: "feed-in" | "feed-out"
  timestamp?: string // date-time
  source: "ECP" | "ERP" | "360" | "journey-submission"
  status?: "valid" | "in-validation" | "implausible" | null | ""
  external_id?: string
  remark?: string
  metadata?: Record<string, string>
  note?: string
  unit?: string
}
```

### `PortalMeterReading`

```ts
type PortalMeterReading = {
  value: number
  read_by?: string
  reason?: "" | "regular" | "irregular" | "last" | "first" | "meter_change" | "contract_change" | "meter_adjustment"
  meter_id?: string // uuid
  counter_id: string // uuid
  direction?: "feed-in" | "feed-out"
  timestamp?: string // date-time
  source: "ECP" | "ERP" | "360" | "journey-submission"
  status?: "valid" | "in-validation" | "implausible" | null | ""
  external_id?: string
  remark?: string
  metadata?: Record<string, string>
  note?: string
  unit?: string
}
```

### `BatchReadingBase`

Base properties shared by all batch reading operations

```ts
type BatchReadingBase = {
  meter_id?: string // uuid
  counter_id?: string // uuid
  direction?: "feed-in" | "feed-out"
  timestamp?: string // date-time
  external_id?: string
  metadata?: Record<string, string>
}
```

### `CreateOrUpdateBatchReading`

Schema for create or update operations - requires value, source, and meter_id

```ts
type CreateOrUpdateBatchReading = {
  meter_id: string // uuid
  counter_id?: string // uuid
  direction?: "feed-in" | "feed-out"
  timestamp?: string // date-time
  external_id?: string
  metadata?: Record<string, string>
  operation?: "create" | "update"
  value: number
  source: "ECP" | "ERP" | "360" | "journey-submission"
  read_by?: string
  reason?: "" | "regular" | "irregular" | "last" | "first" | "meter_change" | "contract_change" | "meter_adjustment"
  status?: "valid" | "in-validation" | "implausible" | null | ""
  remark?: string
  note?: string
  unit?: string
}
```

### `DeleteBatchReading`

Schema for delete operations - only requires identifier fields specified in the identifiers parameter

```ts
type DeleteBatchReading = {
  meter_id?: string // uuid
  counter_id?: string // uuid
  direction?: "feed-in" | "feed-out"
  timestamp?: string // date-time
  external_id?: string
  metadata?: Record<string, string>
  operation: "delete"
}
```

### `BatchReading`

A meter reading for batch operations. The required fields depend on the operation:
- create/update: requires value, source, and meter_id
- delete: only requires the fields specified in the identifiers parameter


```ts
type BatchReading = {
  meter_id: string // uuid
  counter_id?: string // uuid
  direction?: "feed-in" | "feed-out"
  timestamp?: string // date-time
  external_id?: string
  metadata?: Record<string, string>
  operation?: "create" | "update"
  value: number
  source: "ECP" | "ERP" | "360" | "journey-submission"
  read_by?: string
  reason?: "" | "regular" | "irregular" | "last" | "first" | "meter_change" | "contract_change" | "meter_adjustment"
  status?: "valid" | "in-validation" | "implausible" | null | ""
  remark?: string
  note?: string
  unit?: string
} | {
  meter_id?: string // uuid
  counter_id?: string // uuid
  direction?: "feed-in" | "feed-out"
  timestamp?: string // date-time
  external_id?: string
  metadata?: Record<string, string>
  operation: "delete"
}
```

### `PruneMeterReadingsPayload`

```ts
type PruneMeterReadingsPayload = {
  meter_id: string // uuid
  counter_id?: string // uuid
  source?: "ECP" | "ERP" | "360" | "journey-submission"
  keep_external_ids: string[]
}
```

### `UpdateMeterReading`

```ts
type UpdateMeterReading = {
  value: number
  read_by?: string
  reason?: string
  meter_id: string // uuid
  counter_id?: string // uuid
  direction?: "feed-in" | "feed-out"
  timestamp?: string // date-time
  source: "ECP" | "ERP" | "360" | "journey-submission"
  status?: "valid" | "in-validation" | "implausible" | null | ""
  external_id?: string
  remark?: string
  metadata?: Record<string, string>
}
```

### `MeterCounter`

```ts
type MeterCounter = {
  _id: string // uuid
  _title: string
  _org: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  _schema: "meter_counter"
  obis_number?: string
  direction?: "feed-in" | "feed-out"
  transformer_ratio?: number
  unit?: string
  forecast_reading_value?: string
  forecast_as_of?: string
  current_consumption?: number
  last_reading?: string
  conversion_factor?: number
  tariff_type?: "ht" | "nt"
}
```

### `CounterReadingOnSubmission`

```ts
type CounterReadingOnSubmission = {
  counterId: string
  direction: "feed-in" | "feed-out"
  unit?: string
  value: number
}
```

### `SubmissionMeterReading`

```ts
type SubmissionMeterReading = {
  meterId: string
  readings?: Array<{
    counterId: string
    direction: "feed-in" | "feed-out"
    unit?: string
    value: number
  }>
  readingValue?: number
  readingDate?: string
  readBy?: string
  reason?: "" | "regular" | "irregular" | "last" | "first" | "meter_change" | "contract_change" | "meter_adjustment"
  maloId?: string
  obisNumber?: string
  readingUnit?: string
  meterType?: "one_tariff" | "two_tariff" | "bi_directional"
  feedInValue?: number
  feedOutValue?: number
  htValue?: number
  ntValue?: number
}
```

### `Unit`

```ts
type Unit = string
```

### `Source`

```ts
type Source = "ECP" | "ERP" | "360" | "journey-submission"
```

### `ActionLabel`

```ts
type ActionLabel = {
  en?: string
  de?: string
}
```

### `Rule`

```ts
type Rule = {
  entity?: string
  attribute?: string
  attribute_value?: string
}
```

### `JourneyActions`

```ts
type JourneyActions = {
  journey_id?: string
  action_label?: {
    en?: string
    de?: string
  }
  slug?: string
  rules?: Array<{
    entity?: string
    attribute?: string
    attribute_value?: string
  }>
}
```

### `ReadingWithMeter`

```ts
type ReadingWithMeter = {
  ma_lo_id?: string
  meter_id?: string
  obis_number?: string
  unit?: string
  direction?: "feed-in" | "feed-out"
  tariff_type?: "ht" | "nt"
  value?: number
  read_by?: string
  reason?: "" | "regular" | "irregular" | "last" | "first" | "meter_change" | "contract_change" | "meter_adjustment"
  timestamp?: string
  source?: "ECP" | "ERP" | "360" | "journey-submission"
}
```

### `MeterReadingChangeset`

```ts
type MeterReadingChangeset = {
  changeset_id: string
  meter_id?: string // uuid
  counter_id?: string // uuid
  proposed: {
    value: number
    direction?: "feed-in" | "feed-out"
    timestamp?: string // date-time
    reason?: string
    remark?: string
    read_by?: string
    status?: "valid" | "in-validation" | "implausible"
    external_id?: string
  }
  previous?: {
    value: number
    direction?: "feed-in" | "feed-out"
    timestamp?: string // date-time
    reason?: string
    remark?: string
    read_by?: string
    status?: "valid" | "in-validation" | "implausible"
    external_id?: string
  }
  edit_mode: "external" | "approval"
  match_strategy?: "exact" | "fuzzy"
  timestamp_tolerance?: "exact" | {
    type: "same-day"
    timezone?: string
  } | {
    type: "within-seconds"
    seconds: number
  }
  created_at: string // date-time
  created_by?: {
    type?: "user" | "portal_user" | "api_client" | "automation"
    id?: string
  }
  source?: "360" | "ECP" | "ERP" | "journey-submission"
  fuzzy_config?: {
    percentage_threshold?: number
    absolute_threshold?: number
  }
  dismissed_reason?: string
  dismissed_at?: string // date-time
}
```

### `FuzzyConfig`

Numeric-threshold fuzzy matching for meter reading auto-clear.

NOTE: This is intentionally different from entity-api's FuzzyConfig. Entity-api's
fuzzy strategies (suffix, digits_only, normalize_phone, ignore_fields,
contains_entry, regex) are designed for strings and structured objects (IBAN, phone

```ts
type FuzzyConfig = {
  percentage_threshold?: number
  absolute_threshold?: number
}
```

### `ProposedReading`

```ts
type ProposedReading = {
  value: number
  direction?: "feed-in" | "feed-out"
  timestamp?: string // date-time
  reason?: string
  remark?: string
  read_by?: string
  status?: "valid" | "in-validation" | "implausible"
  external_id?: string
}
```

### `ChangesetCreator`

```ts
type ChangesetCreator = {
  type?: "user" | "portal_user" | "api_client" | "automation"
  id?: string
}
```

### `TimestampTolerance`

Slack on `reading.timestamp` when auto-clear matches an incoming reading
against a pending changeset. Both sides reference the SAME physical
meter-read event — one as stored when the user submitted, the other as
echoed back by the ERP. The tolerance accommodates round-trip format
drift between the t

```ts
type TimestampTolerance = "exact" | {
  type: "same-day"
  timezone?: string
} | {
  type: "within-seconds"
  seconds: number
}
```

### `ActivityId`

See https://github.com/ulid/spec

```ts
type ActivityId = string // ulid
```
