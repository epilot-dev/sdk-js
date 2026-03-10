# Metering API

**API Name:** `metering`
**Base URL:** `https://metering.sls.epilot.io`

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `getCustomerMeters` | GET | `/v1/metering/meter` | Get Customer Meters |
| `getMetersByContractId` | GET | `/v1/metering/contract/meters/{contract_id}` | getMetersByContractId |
| `getMeter` | GET | `/v1/metering/meter/{id}` | Get Meter |
| `updateMeter` | PATCH | `/v1/metering/meter/{id}` | Update Meter |
| `getMeterCounters` | GET | `/v1/metering/counter` | Get Meter Counters |
| `getCounterDetails` | GET | `/v1/metering/counter/{counter_id}` | Get Counter Details |
| `createMeterReading` | POST | `/v1/metering/reading` | Create Meter Reading |
| `createMeterReadings` | POST | `/v1/metering/readings` | Create Meter Readings |
| `createPortalMeterReadings` | POST | `/v1/metering/readings/{meter_id}` | createPortalMeterReadings |
| `batchWriteMeterReadings` | POST | `/v2/metering/readings` | Batch Write Readings |
| `createMeterReadingFromSubmission` | POST | `/v1/metering/reading/submission` | Create Meter Reading from Submission |
| `getAllowedReadingForMeter` | GET | `/v1/metering/allowed/reading/{meter_id}` | getAllowedReadingForMeter |
| `createReadingWithMeter` | POST | `/v1/metering/reading/with-meter` | Create Reading with Meter |
| `getReadingsByInterval` | GET | `/v1/metering/reading/{meter_id}/{counter_id}` | Get Readings by Interval |
| `updateMeterReading` | PUT | `/v1/metering/reading/{meter_id}/{counter_id}` | Update Meter Reading |
| `deleteMeterReading` | DELETE | `/v1/metering/reading/{meter_id}/{counter_id}` | Delete Meter Reading |

## Usage

```bash
epilot metering getCustomerMeters
```
