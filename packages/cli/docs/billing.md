# Billing API

- **Base URL:** `https://billing.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/billing](https://docs.epilot.io/api/billing)

API to manage billing data for epilot contracts and orders

## Quick Start

```bash
# List available operations
epilot billing

# Call an operation
epilot billing getBillingEvents
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

**Billing Events**
- [`getBillingEvents`](#getbillingevents) — Get and filter billing events such as installments and reimbursements.
- [`createBillingEvent`](#createbillingevent) — Create a new billing event.
- [`getBillingEvent`](#getbillingevent) — Get a single billing event by ID.
- [`updateBillingEvent`](#updatebillingevent) — Update an existing billing event.
- [`deleteBillingEvent`](#deletebillingevent) — Delete an existing billing event.
- [`getBillingEventByExternalId`](#getbillingeventbyexternalid) — Get a single billing event by External ID.

**Contracts**
- [`createContractEntity`](#createcontractentity) — Create a new contract entity.
- [`updateContractEntity`](#updatecontractentity) — Update an existing contract entity.
- [`deleteContractEntity`](#deletecontractentity) — Delete an existing contract entity.

**Balance**
- [`getCustomerBalance`](#getcustomerbalance) — Get total balance across all contracts and orders of a customer entity.

### `getBillingEvents`

Get and filter billing events such as installments and reimbursements.

`GET /v1/billing/events`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `from` | query | number | No |  |
| `size` | query | number | No |  |
| `entity_id` | query | string[] | No | Entity ID to filter billing events by |
| `event_type` | query | "installment" \| "reimbursement" | No |  |
| `date_after` | query | string (date-time) | No |  |
| `date_before` | query | string (date-time) | No |  |

**Sample Call**

```bash
epilot billing getBillingEvents
```

With JSONata filter:

```bash
epilot billing getBillingEvents --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 0,
  "results": [
    {
      "billing_amount": 10050,
      "billing_amount_decimal": "100.50",
      "billing_currency": "EUR",
      "external_id": "d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e",
      "contract": {
        "$relation": [
          {
            "entity_id": "f589786b-3024-43cd-9cb3-5a3c953f2896"
          }
        ]
      },
      "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
      "_title": "string",
      "_org": "string",
      "_schema": "contact",
      "_tags": ["string"],
      "_created_at": "string",
      "_updated_at": "string",
      "type": "installment",
      "due_date": "1970-01-01T00:00:00.000Z",
      "paid_date": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `createBillingEvent`

Create a new billing event.

`POST /v1/billing/events`

**Request Body** (required)

**Sample Call**

```bash
epilot billing createBillingEvent
```

With request body:

```bash
epilot billing createBillingEvent \
  -d '{
  "billing_amount": 10050,
  "billing_amount_decimal": "100.50",
  "billing_currency": "EUR",
  "external_id": "d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e",
  "contract": {
    "$relation": [
      {
        "entity_id": "f589786b-3024-43cd-9cb3-5a3c953f2896"
      }
    ]
  },
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "string",
  "_org": "string",
  "_schema": "contact",
  "_tags": ["string"],
  "_created_at": "string",
  "_updated_at": "string",
  "type": "installment",
  "due_date": "1970-01-01T00:00:00.000Z",
  "paid_date": "1970-01-01T00:00:00.000Z"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot billing createBillingEvent
```

With JSONata filter:

```bash
epilot billing createBillingEvent --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "billing_amount": 10050,
  "billing_amount_decimal": "100.50",
  "billing_currency": "EUR",
  "external_id": "d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e",
  "contract": {
    "$relation": [
      {
        "entity_id": "f589786b-3024-43cd-9cb3-5a3c953f2896"
      }
    ]
  },
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "string",
  "_org": "string",
  "_schema": "contact",
  "_tags": ["string"],
  "_created_at": "string",
  "_updated_at": "string",
  "type": "installment",
  "due_date": "1970-01-01T00:00:00.000Z",
  "paid_date": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `getBillingEvent`

Get a single billing event by ID.

`GET /v1/billing/events/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | ID of the billing event to get |

**Sample Call**

```bash
epilot billing getBillingEvent \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot billing getBillingEvent 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot billing getBillingEvent -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "billing_amount": 10050,
  "billing_amount_decimal": "100.50",
  "billing_currency": "EUR",
  "external_id": "d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e",
  "contract": {
    "$relation": [
      {
        "entity_id": "f589786b-3024-43cd-9cb3-5a3c953f2896"
      }
    ]
  },
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "string",
  "_org": "string",
  "_schema": "contact",
  "_tags": ["string"],
  "_created_at": "string",
  "_updated_at": "string",
  "type": "installment",
  "due_date": "1970-01-01T00:00:00.000Z",
  "paid_date": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateBillingEvent`

Update an existing billing event.

`PATCH /v1/billing/events/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | ID of the billing event to update |

**Request Body** (required)

**Sample Call**

```bash
epilot billing updateBillingEvent \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot billing updateBillingEvent \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "billing_amount": 10050,
  "billing_amount_decimal": "100.50",
  "billing_currency": "EUR",
  "external_id": "d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e",
  "contract": {
    "$relation": [
      {
        "entity_id": "f589786b-3024-43cd-9cb3-5a3c953f2896"
      }
    ]
  },
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "string",
  "_org": "string",
  "_schema": "contact",
  "_tags": ["string"],
  "_created_at": "string",
  "_updated_at": "string",
  "type": "installment",
  "due_date": "1970-01-01T00:00:00.000Z",
  "paid_date": "1970-01-01T00:00:00.000Z"
}'
```

Using positional args for path parameters:

```bash
epilot billing updateBillingEvent 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot billing updateBillingEvent -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot billing updateBillingEvent -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "billing_amount": 10050,
  "billing_amount_decimal": "100.50",
  "billing_currency": "EUR",
  "external_id": "d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e",
  "contract": {
    "$relation": [
      {
        "entity_id": "f589786b-3024-43cd-9cb3-5a3c953f2896"
      }
    ]
  },
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "string",
  "_org": "string",
  "_schema": "contact",
  "_tags": ["string"],
  "_created_at": "string",
  "_updated_at": "string",
  "type": "installment",
  "due_date": "1970-01-01T00:00:00.000Z",
  "paid_date": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteBillingEvent`

Delete an existing billing event.

`DELETE /v1/billing/events/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | ID of the billing event to delete |

**Sample Call**

```bash
epilot billing deleteBillingEvent \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot billing deleteBillingEvent 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot billing deleteBillingEvent -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `getBillingEventByExternalId`

Get a single billing event by External ID.

`GET /v1/billing/external/{external_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `external_id` | path | string | Yes | ID of the billing event to get |

**Sample Call**

```bash
epilot billing getBillingEventByExternalId \
  -p external_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot billing getBillingEventByExternalId 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot billing getBillingEventByExternalId -p external_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "billing_amount": 10050,
  "billing_amount_decimal": "100.50",
  "billing_currency": "EUR",
  "external_id": "d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e",
  "contract": {
    "$relation": [
      {
        "entity_id": "f589786b-3024-43cd-9cb3-5a3c953f2896"
      }
    ]
  },
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "string",
  "_org": "string",
  "_schema": "contact",
  "_tags": ["string"],
  "_created_at": "string",
  "_updated_at": "string",
  "type": "installment",
  "due_date": "1970-01-01T00:00:00.000Z",
  "paid_date": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `createContractEntity`

Create a new contract entity.

`POST /v1/billing/contracts`

**Request Body** (required)

**Sample Call**

```bash
epilot billing createContractEntity
```

With request body:

```bash
epilot billing createContractEntity \
  -d '{
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "string",
  "_org": "string",
  "_schema": "contact",
  "_tags": ["string"],
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
}'
```

Using stdin pipe:

```bash
cat body.json | epilot billing createContractEntity
```

With JSONata filter:

```bash
epilot billing createContractEntity --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "string",
  "_org": "string",
  "_schema": "contact",
  "_tags": ["string"],
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

</details>

---

### `updateContractEntity`

Update an existing contract entity.

`PATCH /v1/billing/contracts/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | ID of the contract entity to update |

**Request Body** (required)

**Sample Call**

```bash
epilot billing updateContractEntity \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot billing updateContractEntity \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "string",
  "_org": "string",
  "_schema": "contact",
  "_tags": ["string"],
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
}'
```

Using positional args for path parameters:

```bash
epilot billing updateContractEntity 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot billing updateContractEntity -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot billing updateContractEntity -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "string",
  "_org": "string",
  "_schema": "contact",
  "_tags": ["string"],
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

</details>

---

### `deleteContractEntity`

Delete an existing contract entity.

`DELETE /v1/billing/contracts/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | ID of the contract entity to delete |

**Sample Call**

```bash
epilot billing deleteContractEntity \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot billing deleteContractEntity 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot billing deleteContractEntity -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `getCustomerBalance`

Get total balance across all contracts and orders of a customer entity.

`GET /v1/billing/customers/{id}/balance`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Customer entity ID (contact or account) |

**Sample Call**

```bash
epilot billing getCustomerBalance \
  -p id=1e3f0d58-69d2-4dbb-9a43-3ee63d862e8e
```

Using positional args for path parameters:

```bash
epilot billing getCustomerBalance 1e3f0d58-69d2-4dbb-9a43-3ee63d862e8e
```

With JSONata filter:

```bash
epilot billing getCustomerBalance -p id=1e3f0d58-69d2-4dbb-9a43-3ee63d862e8e --jsonata 'balance'
```

<details>
<summary>Sample Response</summary>

```json
{
  "balance": 8990,
  "balance_decimal": "89.90",
  "balance_currency": "EUR"
}
```

</details>

---
