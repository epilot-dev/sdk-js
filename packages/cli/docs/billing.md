# Billing API

**API Name:** `billing`
**Base URL:** `https://billing.sls.epilot.io`

API to manage billing data for epilot contracts and orders

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `getBillingEvents` | GET | `/v1/billing/events` | getBillingEvents |
| `createBillingEvent` | POST | `/v1/billing/events` | createBillingEvent |
| `getBillingEvent` | GET | `/v1/billing/events/{id}` | getBillingEvent |
| `updateBillingEvent` | PATCH | `/v1/billing/events/{id}` | updateBillingEvent |
| `deleteBillingEvent` | DELETE | `/v1/billing/events/{id}` | deleteBillingEvent |
| `getBillingEventByExternalId` | GET | `/v1/billing/external/{external_id}` | getBillingEventByExternalId |
| `createContractEntity` | POST | `/v1/billing/contracts` | createContractEntity |
| `updateContractEntity` | PATCH | `/v1/billing/contracts/{id}` | updateContractEntity |
| `deleteContractEntity` | DELETE | `/v1/billing/contracts/{id}` | deleteContractEntity |
| `getCustomerBalance` | GET | `/v1/billing/customers/{id}/balance` | getCustomerBalance |

## Usage

```bash
epilot billing getBillingEvents
```
