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

const meteringClient = await getClient()
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
- [`createMeterReadingFromSubmission`](#createmeterreadingfromsubmission)
- [`getAllowedReadingForMeter`](#getallowedreadingformeter)
- [`createReadingWithMeter`](#createreadingwithmeter)
- [`getReadingsByInterval`](#getreadingsbyinterval)
- [`updateMeterReading`](#updatemeterreading)
- [`deleteMeterReading`](#deletemeterreading)

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
- [`ActivityId`](#activityid)

### `getCustomerMeters`

Get Customer Meters

`GET /v1/metering/meter`

```ts
const { data } = await client.getCustomerMeters()
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
      "_tags": [],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "meter",
      "ma_lo_id": "A09-123",
      "status": "active",
      "meter_type": "three-phase-meter",
      "tariff_type": "Peak load tariff",
      "meter_number": "J-1093-1AK",
      "sector": "power",
      "location": [],
      "used_for": "Domestic Usage",
      "manufacturer": "Energy One",
      "calibration_date": "2022-10-10T00:00:00.000Z",
      "contract": {},
      "customer": {},
      "journey_actions": {},
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
      "_tags": [],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "meter",
      "ma_lo_id": "A09-123",
      "status": "active",
      "meter_type": "three-phase-meter",
      "tariff_type": "Peak load tariff",
      "meter_number": "J-1093-1AK",
      "sector": "power",
      "location": [],
      "used_for": "Domestic Usage",
      "manufacturer": "Energy One",
      "calibration_date": "2022-10-10T00:00:00.000Z",
      "contract": {},
      "customer": {}
    }
  ]
}
```

</details>

---

### `updateMeter`

Update Meter

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
    "_tags": [
      "example",
      "mock"
    ],
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
      {}
    ],
    "used_for": "Domestic Usage",
    "manufacturer": "Energy One",
    "calibration_date": "2022-10-10T00:00:00.000Z",
    "contract": {
      "$relation": []
    },
    "customer": {
      "$relation": []
    }
  }
}
```

</details>

---

### `getMeter`

Get Meter

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
      "_tags": [],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_schema": "meter",
      "ma_lo_id": "A09-123",
      "status": "active",
      "meter_type": "three-phase-meter",
      "tariff_type": "Peak load tariff",
      "meter_number": "J-1093-1AK",
      "sector": "power",
      "location": [],
      "used_for": "Domestic Usage",
      "manufacturer": "Energy One",
      "calibration_date": "2022-10-10T00:00:00.000Z",
      "contract": {},
      "customer": {}
    },
    "journey_actions": {
      "journey_id": "string",
      "action_label": {},
      "slug": "string",
      "rules": []
    },
    "relations": [
      {}
    ]
  }
}
```

</details>

---

### `getMeterCounters`

Get Meter Counters

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
      "_tags": [],
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

Get Counter Details

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
    "_tags": [
      "example",
      "mock"
    ],
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

Create Meter Reading

`POST /v1/metering/reading`

```ts
const { data } = await client.createMeterReading(
  null,
  {
    value: 240,
    read_by: 'John Doe',
    reason: '',
    meter_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    counter_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    direction: 'feed-in',
    timestamp: '2022-10-10T00:00:00.000Z',
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

Create Meter Readings

`POST /v1/metering/readings`

```ts
const { data } = await client.createMeterReadings(
  {
    async: true,
    activity_id: 'example',
    skip_validation: true,
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
        timestamp: '2022-10-10T00:00:00.000Z',
        source: 'ECP',
        status: 'valid',
        external_id: 'string',
        remark: 'Customer reported unusual consumption',
        metadata: { /* ... */ },
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
      "timestamp": "2022-10-10T00:00:00.000Z",
      "source": "ECP",
      "status": "valid",
      "external_id": "string",
      "remark": "Customer reported unusual consumption",
      "metadata": {},
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

```ts
const { data } = await client.createPortalMeterReadings(
  {
    meter_id: 'example',
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
        timestamp: '2022-10-10T00:00:00.000Z',
        source: 'ECP',
        status: 'valid',
        external_id: 'string',
        remark: 'Customer reported unusual consumption',
        metadata: { /* ... */ },
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
      "timestamp": "2022-10-10T00:00:00.000Z",
      "source": "ECP",
      "status": "valid",
      "external_id": "string",
      "remark": "Customer reported unusual consumption",
      "metadata": {},
      "note": "string",
      "unit": "string"
    }
  ]
}
```

</details>

---

### `batchWriteMeterReadings`

Batch Write Readings

`POST /v2/metering/readings`

```ts
const { data } = await client.batchWriteMeterReadings(
  {
    async: true,
    skip_validation: true,
    activity_id: 'example',
  },
  {
    identifiers: [
      'string'
    ],
    readings: [
      {
        value: 240,
        read_by: 'John Doe',
        reason: '',
        meter_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        counter_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        direction: 'feed-in',
        timestamp: '2022-10-10T00:00:00.000Z',
        source: 'ECP',
        status: 'valid',
        external_id: 'string',
        remark: 'Customer reported unusual consumption',
        metadata: { /* ... */ },
        note: 'string',
        unit: 'string',
        operation: 'create'
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
      "timestamp": "2022-10-10T00:00:00.000Z",
      "source": "ECP",
      "status": "valid",
      "external_id": "string",
      "remark": "Customer reported unusual consumption",
      "metadata": {},
      "note": "string",
      "unit": "string"
    }
  ]
}
```

</details>

---

### `createMeterReadingFromSubmission`

Create Meter Reading from Submission

`POST /v1/metering/reading/submission`

```ts
const { data } = await client.createMeterReadingFromSubmission(
  null,
  {
    org_id: '123',
    entity: {
      _org: '123',
      meterReadings: [
        { /* ... */ }
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

Get allowed reading for the given meter

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

Create Reading with Meter

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

Get Readings by Interval

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
      "timestamp": "2022-10-10T00:00:00.000Z",
      "source": "ECP",
      "status": "valid",
      "external_id": "string",
      "remark": "Customer reported unusual consumption",
      "metadata": {},
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

Update Meter Reading

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
    timestamp: '2022-10-10T00:00:00.000Z',
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

Delete Meter Reading

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
  // ...
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

### `ActivityId`

See https://github.com/ulid/spec

```ts
type ActivityId = string // ulid
```
