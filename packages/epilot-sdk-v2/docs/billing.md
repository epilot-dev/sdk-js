# Billing API

**Base URL:** `https://billing.sls.epilot.io`
**Full API Docs:** [https://docs.epilot.io/api/billing](https://docs.epilot.io/api/billing)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')

// Call operations directly (lazy singleton under the hood)
const { data } = await epilot.billing.getBillingEvents(...)

// Or get the client explicitly
const billingClient = await epilot.billing.getClient()
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/billing'

const billingClient = await getClient()
authorize(billingClient, () => '<token>')
const { data } = await billingClient.getBillingEvents(...)

// Or create a fresh (non-singleton) client
import { createClient } from '@epilot/sdk/billing'
const fresh = await createClient()
authorize(fresh, () => '<token>')
```

## Operations

**Billing Events**
- [`getBillingEvents`](#getbillingevents)
- [`createBillingEvent`](#createbillingevent)
- [`getBillingEvent`](#getbillingevent)
- [`updateBillingEvent`](#updatebillingevent)
- [`deleteBillingEvent`](#deletebillingevent)
- [`getBillingEventByExternalId`](#getbillingeventbyexternalid)

**Contracts**
- [`createContractEntity`](#createcontractentity)
- [`updateContractEntity`](#updatecontractentity)
- [`deleteContractEntity`](#deletecontractentity)

**Balance**
- [`getCustomerBalance`](#getcustomerbalance)

### `getBillingEvents`

Get and filter billing events such as installments and reimbursements.

`GET /v1/billing/events`

```ts
const { data } = await client.getBillingEvents({
  from: 1,
  size: 1,
  entity_id: ['...'],
  event_type: 'example',
  date_after: 'example',
  date_before: 'example',
})
```

**Response**

```json
{
  "hits": 0,
  "results": [
    {
      "billing_amount": 10050,
      "billing_amount_decimal": "100.50",
      "billing_currency": "EUR",
      "external_id": "d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e",
      "contract": {},
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "string",
      "_org": "string",
      "_schema": "contact",
      "_tags": [],
      "_created_at": "string",
      "_updated_at": "string",
      "type": "installment",
      "due_date": "1970-01-01T00:00:00.000Z",
      "paid_date": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### `createBillingEvent`

Create a new billing event.

`POST /v1/billing/events`

```ts
const { data } = await client.createBillingEvent(
  null,
  {
    billing_amount: 10050,
    billing_amount_decimal: '100.50',
    billing_currency: 'EUR',
    external_id: 'd4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e',
    contract: {
      $relation: [
        { /* ... */ }
      ]
    },
    _id: '5da0a718-c822-403d-9f5d-20d4584e0528',
    _title: 'string',
    _org: 'string',
    _schema: 'contact',
    _tags: [
      'string'
    ],
    _created_at: 'string',
    _updated_at: 'string',
    type: 'installment',
    due_date: '1970-01-01T00:00:00.000Z',
    paid_date: '1970-01-01T00:00:00.000Z'
  },
)
```

**Response**

```json
{
  "billing_amount": 10050,
  "billing_amount_decimal": "100.50",
  "billing_currency": "EUR",
  "external_id": "d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e",
  "contract": {
    "$relation": [
      {}
    ]
  },
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "string",
  "_org": "string",
  "_schema": "contact",
  "_tags": [
    "string"
  ],
  "_created_at": "string",
  "_updated_at": "string",
  "type": "installment",
  "due_date": "1970-01-01T00:00:00.000Z",
  "paid_date": "1970-01-01T00:00:00.000Z"
}
```

---

### `getBillingEvent`

Get a single billing event by ID.

`GET /v1/billing/events/{id}`

```ts
const { data } = await client.getBillingEvent({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

**Response**

```json
{
  "billing_amount": 10050,
  "billing_amount_decimal": "100.50",
  "billing_currency": "EUR",
  "external_id": "d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e",
  "contract": {
    "$relation": [
      {}
    ]
  },
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "string",
  "_org": "string",
  "_schema": "contact",
  "_tags": [
    "string"
  ],
  "_created_at": "string",
  "_updated_at": "string",
  "type": "installment",
  "due_date": "1970-01-01T00:00:00.000Z",
  "paid_date": "1970-01-01T00:00:00.000Z"
}
```

---

### `updateBillingEvent`

Update an existing billing event.

`PATCH /v1/billing/events/{id}`

```ts
const { data } = await client.updateBillingEvent(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    billing_amount: 10050,
    billing_amount_decimal: '100.50',
    billing_currency: 'EUR',
    external_id: 'd4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e',
    contract: {
      $relation: [
        { /* ... */ }
      ]
    },
    _id: '5da0a718-c822-403d-9f5d-20d4584e0528',
    _title: 'string',
    _org: 'string',
    _schema: 'contact',
    _tags: [
      'string'
    ],
    _created_at: 'string',
    _updated_at: 'string',
    type: 'installment',
    due_date: '1970-01-01T00:00:00.000Z',
    paid_date: '1970-01-01T00:00:00.000Z'
  },
)
```

**Response**

```json
{
  "billing_amount": 10050,
  "billing_amount_decimal": "100.50",
  "billing_currency": "EUR",
  "external_id": "d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e",
  "contract": {
    "$relation": [
      {}
    ]
  },
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "string",
  "_org": "string",
  "_schema": "contact",
  "_tags": [
    "string"
  ],
  "_created_at": "string",
  "_updated_at": "string",
  "type": "installment",
  "due_date": "1970-01-01T00:00:00.000Z",
  "paid_date": "1970-01-01T00:00:00.000Z"
}
```

---

### `deleteBillingEvent`

Delete an existing billing event.

`DELETE /v1/billing/events/{id}`

```ts
const { data } = await client.deleteBillingEvent({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `getBillingEventByExternalId`

Get a single billing event by External ID.

`GET /v1/billing/external/{external_id}`

```ts
const { data } = await client.getBillingEventByExternalId({
  external_id: 'example',
})
```

**Response**

```json
{
  "billing_amount": 10050,
  "billing_amount_decimal": "100.50",
  "billing_currency": "EUR",
  "external_id": "d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e",
  "contract": {
    "$relation": [
      {}
    ]
  },
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "string",
  "_org": "string",
  "_schema": "contact",
  "_tags": [
    "string"
  ],
  "_created_at": "string",
  "_updated_at": "string",
  "type": "installment",
  "due_date": "1970-01-01T00:00:00.000Z",
  "paid_date": "1970-01-01T00:00:00.000Z"
}
```

---

### `createContractEntity`

Create a new contract entity.

`POST /v1/billing/contracts`

```ts
const { data } = await client.createContractEntity(
  null,
  {
    _id: '5da0a718-c822-403d-9f5d-20d4584e0528',
    _title: 'string',
    _org: 'string',
    _schema: 'contact',
    _tags: [
      'string'
    ],
    _created_at: 'string',
    _updated_at: 'string',
    contract_name: 'Grid Contract',
    contract_number: '12345',
    status: 'approved',
    description: 'This contract is for the supply of widgets.',
    account_number: '67890',
    branch: 'power',
    billing_address: '123 Main St, Anytown',
    delivery_address: '456 Elm St, Anytown',
    additional_addresses: '789 Oak St, Anytown',
    termination_date: '2022-01-01',
    termination_reason: 'Non-payment',
    billing_period: 'monthly',
    billing_duration_amount: 30,
    renewal_duration_amount: 365,
    renewal_duration_unit: 'years',
    notice_time_amount: 30,
    notice_time_unit: 'months',
    start_date: '2021-01-01',
    billing_due_day: 2,
    installment_amount: 10050,
    balance: 8990,
    balance_currency: 'EUR'
  },
)
```

**Response**

```json
{
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "string",
  "_org": "string",
  "_schema": "contact",
  "_tags": [
    "string"
  ],
  "_created_at": "string",
  "_updated_at": "string",
  "contract_name": "Grid Contract",
  "contract_number": "12345",
  "status": "approved",
  "description": "This contract is for the supply of widgets.",
  "account_number": "67890",
  "branch": "power",
  "billing_address": "123 Main St, Anytown",
  "delivery_address": "456 Elm St, Anytown",
  "additional_addresses": "789 Oak St, Anytown",
  "termination_date": "2022-01-01",
  "termination_reason": "Non-payment",
  "billing_period": "monthly",
  "billing_duration_amount": 30,
  "renewal_duration_amount": 365,
  "renewal_duration_unit": "years",
  "notice_time_amount": 30,
  "notice_time_unit": "months",
  "start_date": "2021-01-01",
  "billing_due_day": 2,
  "installment_amount": 10050,
  "balance": 8990,
  "balance_currency": "EUR"
}
```

---

### `updateContractEntity`

Update an existing contract entity.

`PATCH /v1/billing/contracts/{id}`

```ts
const { data } = await client.updateContractEntity(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    _id: '5da0a718-c822-403d-9f5d-20d4584e0528',
    _title: 'string',
    _org: 'string',
    _schema: 'contact',
    _tags: [
      'string'
    ],
    _created_at: 'string',
    _updated_at: 'string',
    contract_name: 'Grid Contract',
    contract_number: '12345',
    status: 'approved',
    description: 'This contract is for the supply of widgets.',
    account_number: '67890',
    branch: 'power',
    billing_address: '123 Main St, Anytown',
    delivery_address: '456 Elm St, Anytown',
    additional_addresses: '789 Oak St, Anytown',
    termination_date: '2022-01-01',
    termination_reason: 'Non-payment',
    billing_period: 'monthly',
    billing_duration_amount: 30,
    renewal_duration_amount: 365,
    renewal_duration_unit: 'years',
    notice_time_amount: 30,
    notice_time_unit: 'months',
    start_date: '2021-01-01',
    billing_due_day: 2,
    installment_amount: 10050,
    balance: 8990,
    balance_currency: 'EUR'
  },
)
```

**Response**

```json
{
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "string",
  "_org": "string",
  "_schema": "contact",
  "_tags": [
    "string"
  ],
  "_created_at": "string",
  "_updated_at": "string",
  "contract_name": "Grid Contract",
  "contract_number": "12345",
  "status": "approved",
  "description": "This contract is for the supply of widgets.",
  "account_number": "67890",
  "branch": "power",
  "billing_address": "123 Main St, Anytown",
  "delivery_address": "456 Elm St, Anytown",
  "additional_addresses": "789 Oak St, Anytown",
  "termination_date": "2022-01-01",
  "termination_reason": "Non-payment",
  "billing_period": "monthly",
  "billing_duration_amount": 30,
  "renewal_duration_amount": 365,
  "renewal_duration_unit": "years",
  "notice_time_amount": 30,
  "notice_time_unit": "months",
  "start_date": "2021-01-01",
  "billing_due_day": 2,
  "installment_amount": 10050,
  "balance": 8990,
  "balance_currency": "EUR"
}
```

---

### `deleteContractEntity`

Delete an existing contract entity.

`DELETE /v1/billing/contracts/{id}`

```ts
const { data } = await client.deleteContractEntity({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `getCustomerBalance`

Get total balance across all contracts and orders of a customer entity.

`GET /v1/billing/customers/{id}/balance`

```ts
const { data } = await client.getCustomerBalance({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

**Response**

```json
{
  "balance": 8990,
  "balance_decimal": "89.90",
  "balance_currency": "EUR"
}
```

---

## Schemas

### `BaseEntity`

```ts
type BaseEntity = {
  _id?: string
  _title?: string
  _org?: string
  _schema?: "contact" | "contract" | "file" | "order" | "opportunity" | "product" | "price" | "meter" | "meter_counter" | "billing_event"
  _tags?: string[]
  _created_at?: string
  _updated_at?: string
}
```

### `EntityId`

Entity ID

```ts
type EntityId = string
```

### `EntitySlug`

URL-friendly identifier for the entity schema

```ts
type EntitySlug = "contact" | "contract" | "file" | "order" | "opportunity" | "product" | "price" | "meter" | "meter_counter" | "billing_event"
```

### `EntityRelationItem`

```ts
type EntityRelationItem = {
  entity_id?: string
}
```

### `BaseBillingEvent`

A base billing event to be inherited by all billing events.

```ts
type BaseBillingEvent = {
  _id?: string
  _title?: string
  _org?: string
  _schema?: "contact" | "contract" | "file" | "order" | "opportunity" | "product" | "price" | "meter" | "meter_counter" | "billing_event"
  _tags?: string[]
  _created_at?: string
  _updated_at?: string
}
```

### `InstallmentEvent`

An entity that describes an installment billing event.

```ts
type InstallmentEvent = {
  billing_amount: number
  billing_amount_decimal: string
  billing_currency: string
  external_id?: string
  contract: {
    $relation?: Array<{
      entity_id?: { ... }
    }>
  }
  type: "installment"
  due_date: string // date-time
  paid_date?: string // date-time
}
```

### `ReimbursementEvent`

An entity that describes a reimbursement billing event.

```ts
type ReimbursementEvent = {
  billing_amount: number
  billing_amount_decimal: string
  billing_currency: string
  external_id?: string
  contract: {
    $relation?: Array<{
      entity_id?: { ... }
    }>
  }
  type: "reimbursement"
  paid_date?: string // date-time
}
```

### `BillingEvent`

An entity that describes a billing event such as a future installment or a reimbursement back to the customer.

```ts
type BillingEvent = {
  billing_amount: number
  billing_amount_decimal: string
  billing_currency: string
  external_id?: string
  contract: {
    $relation?: Array<{
      entity_id?: { ... }
    }>
  }
  type: "installment"
  due_date: string // date-time
  paid_date?: string // date-time
} | {
  billing_amount: number
  billing_amount_decimal: string
  billing_currency: string
  external_id?: string
  contract: {
    $relation?: Array<{
      entity_id?: { ... }
    }>
  }
  type: "reimbursement"
  paid_date?: string // date-time
}
```

### `Contract`

```ts
type Contract = {
  _id?: string
  _title?: string
  _org?: string
  _schema?: "contact" | "contract" | "file" | "order" | "opportunity" | "product" | "price" | "meter" | "meter_counter" | "billing_event"
  _tags?: string[]
  _created_at?: string
  _updated_at?: string
  contract_name?: string
  contract_number?: string
  status?: "draft" | "in_approval_process" | "approved" | "active" | "deactivated" | "revoked" | "terminated" | "expired"
  description?: string
  account_number?: string
  branch?: "power" | "gas" | "water" | "waste_water" | "district_heating"
  billing_address?: string
  delivery_address?: string
  additional_addresses?: string
  termination_date?: string
  termination_reason?: string
  billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly"
  billing_duration_amount?: number
  renewal_duration_amount?: number
  renewal_duration_unit?: "weeks" | "months" | "years"
  notice_time_amount?: number
  notice_time_unit?: "weeks" | "months" | "years"
  start_date?: string
  billing_due_day?: number
  installment_amount?: number
  balance?: number
  balance_currency?: string
  // ...
}
```

### `ContractItem`

```ts
type ContractItem = {
  _id?: string
  _title?: string
  _org?: string
  _schema?: "contact" | "contract" | "file" | "order" | "opportunity" | "product" | "price" | "meter" | "meter_counter" | "billing_event"
  _tags?: string[]
  _created_at?: string
  _updated_at?: string
  contract_name?: string
  contract_number?: string
  status?: "draft" | "in_approval_process" | "approved" | "active" | "deactivated" | "revoked" | "terminated" | "expired"
  description?: string
  account_number?: string
  branch?: "power" | "gas" | "water" | "waste_water" | "district_heating"
  billing_address?: string
  delivery_address?: string
  additional_addresses?: string
  termination_date?: string
  termination_reason?: string
  billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly"
  billing_duration_amount?: number
  renewal_duration_amount?: number
  renewal_duration_unit?: "weeks" | "months" | "years"
  notice_time_amount?: number
  notice_time_unit?: "weeks" | "months" | "years"
  start_date?: string
  billing_due_day?: number
  installment_amount?: number
  balance?: number
  balance_currency?: string
  // ...
}
```

### `Balance`

```ts
type Balance = {
  balance?: number
  balance_decimal?: string
  balance_currency?: string
}
```

### `Currency`

Currency code in ISO 4217 format

```ts
type Currency = string
```
