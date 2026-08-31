# Billing API

- **Base URL:** `https://billing.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/billing](https://docs.epilot.io/api/billing)

API to manage billing data for epilot contracts and orders.

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
- [`getBillingEvents`](#getbillingevents) — Retrieve and filter billing events (Buchungssätze) such as installments (Abschlagszahlungen),
- [`createBillingEvent`](#createbillingevent) — Create a new billing event (Buchungssatz) such as an installment (Abschlagszahlung),
- [`getBillingEvent`](#getbillingevent) — Retrieve a single billing event (Buchungssatz) by its unique ID.
- [`updateBillingEvent`](#updatebillingevent) — Update an existing billing event (Buchungssatz).
- [`deleteBillingEvent`](#deletebillingevent) — Delete an existing billing event (Buchungssatz).
- [`getBillingEventByExternalId`](#getbillingeventbyexternalid) — Retrieve a billing event (Buchungssatz) by its external system identifier.

**Contracts**
- [`createContractEntity`](#createcontractentity) — Create a new contract entity (Vertrag) for billing purposes.
- [`updateContractEntity`](#updatecontractentity) — Update an existing contract entity (Vertrag).
- [`deleteContractEntity`](#deletecontractentity) — Delete an existing contract entity (Vertrag).

**Pricing Information**
- [`getContractPricingInformation`](#getcontractpricinginformation) — Get current pricing information and recent configuration history for a Contract.
- [`getBillingAccountPricingInformation`](#getbillingaccountpricinginformation) — Get current pricing information for the active Contracts linked to a Billing Account.

**Configuration History**
- [`getContractConfigurationHistory`](#getcontractconfigurationhistory) — Get billing configuration history for a Contract.
- [`getBillingAccountConfigurationHistory`](#getbillingaccountconfigurationhistory) — Get merged billing configuration history for active Contracts linked to a Billing Account.

**Balance**
- [`getCustomerBalance`](#getcustomerbalance) — Retrieve the total balance (Kontostand) across all contracts and orders for a customer.

### `getBillingEvents`

Retrieve and filter billing events (Buchungssätze) such as installments (Abschlagszahlungen),

`GET /v1/billing/events`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `from` | query | number | No | Pagination offset - number of results to skip |
| `size` | query | number | No | Maximum number of results to return per page |
| `entity_id` | query | string[] | No | Filter billing events by one or more entity IDs (e.g., contract or order IDs) |
| `contact_id` | query | string | No | Filter billing events by customer contact ID (Kundennummer) |
| `event_type` | query | "installment" \| "reimbursement" | No | Filter by billing event type (Buchungsart):
- `installment`: Abschlagszahlung (scheduled payment due)
- `reimbursement`: Rückerstattung (refund to customer)
 |
| `date_after` | query | string (date-time) | No | Filter billing events with booking date (Buchungsdatum) after this timestamp |
| `date_before` | query | string (date-time) | No | Filter billing events with booking date (Buchungsdatum) before this timestamp |

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
  "hits": 42,
  "results": [
    {
      "type": "installment",
      "direction": "debit",
      "note": "July power & gas installment payment",
      "status": "open",
      "booking_date": "2025-07-10",
      "due_date": "2025-07-10",
      "billing_amount": 5000,
      "billing_amount_decimal": "50.00",
      "billing_currency": "EUR"
    }
  ]
}
```

</details>

---

### `createBillingEvent`

Create a new billing event (Buchungssatz) such as an installment (Abschlagszahlung),

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
  "type": "installment",
  "direction": "debit",
  "note": "July power & gas installment payment",
  "status": "open",
  "booking_date": "2025-07-10",
  "due_date": "2025-07-10",
  "billing_amount": 5000,
  "billing_amount_decimal": "50.00",
  "billing_currency": "EUR"
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
  "type": "installment",
  "direction": "debit",
  "note": "July power & gas installment payment",
  "status": "open",
  "booking_date": "2025-07-10",
  "due_date": "2025-07-10",
  "billing_amount": 5000,
  "billing_amount_decimal": "50.00",
  "billing_currency": "EUR"
}
```

</details>

---

### `getBillingEvent`

Retrieve a single billing event (Buchungssatz) by its unique ID.

`GET /v1/billing/events/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Unique identifier of the billing event (Buchungssatz-ID) |

**Sample Call**

```bash
epilot billing getBillingEvent \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot billing getBillingEvent 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot billing getBillingEvent -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "type": "installment",
  "direction": "debit",
  "note": "July power & gas installment payment",
  "status": "open",
  "booking_date": "2025-07-10",
  "due_date": "2025-07-10",
  "billing_amount": 5000,
  "billing_amount_decimal": "50.00",
  "billing_currency": "EUR"
}
```

</details>

---

### `updateBillingEvent`

Update an existing billing event (Buchungssatz).

`PATCH /v1/billing/events/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Unique identifier of the billing event to update |

**Request Body** (required)

**Sample Call**

```bash
epilot billing updateBillingEvent \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

With request body:

```bash
epilot billing updateBillingEvent \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528 \
  -d '{
  "type": "installment",
  "direction": "debit",
  "billing_amount": 10000,
  "billing_amount_decimal": "100.00",
  "billing_currency": "EUR",
  "external_id": "SAP-54321",
  "contract": {
    "$relation": [
      {
        "entity_id": "f589786b-3024-43cd-9cb3-5a3c953f2896"
      }
    ]
  },
  "booking_date": "2025-06-15",
  "due_date": "2025-06-30",
  "paid_date": "2025-06-15T10:00:00Z",
  "status": "closed",
  "related_event": "d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e",
  "external_link": {
    "href": "https://billing.example.com/invoices/12345",
    "title": "Invoice 12345"
  },
  "attachments": {
    "$relation": [
      {
        "entity_id": "f589786b-3024-43cd-9cb3-5a3c953f2896"
      }
    ]
  },
  "note": "Teilzahlung für Abschlag Juni",
  "internal_note": "Rückmeldung von SAP: Betrag aus Zahlungsavis 2025-06-14 übernommen"
}'
```

Using positional args for path parameters:

```bash
epilot billing updateBillingEvent 5da0a718-c822-403d-9f5d-20d4584e0528
```

Using stdin pipe:

```bash
cat body.json | epilot billing updateBillingEvent -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot billing updateBillingEvent -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "type": "installment",
  "direction": "debit",
  "note": "July power & gas installment payment",
  "status": "open",
  "booking_date": "2025-07-10",
  "due_date": "2025-07-10",
  "billing_amount": 5000,
  "billing_amount_decimal": "50.00",
  "billing_currency": "EUR"
}
```

</details>

---

### `deleteBillingEvent`

Delete an existing billing event (Buchungssatz).

`DELETE /v1/billing/events/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Unique identifier of the billing event to delete |

**Sample Call**

```bash
epilot billing deleteBillingEvent \
  -p id=5da0a718-c822-403d-9f5d-20d4584e0528
```

Using positional args for path parameters:

```bash
epilot billing deleteBillingEvent 5da0a718-c822-403d-9f5d-20d4584e0528
```

With JSONata filter:

```bash
epilot billing deleteBillingEvent -p id=5da0a718-c822-403d-9f5d-20d4584e0528 --jsonata '$'
```

---

### `getBillingEventByExternalId`

Retrieve a billing event (Buchungssatz) by its external system identifier.

`GET /v1/billing/external/{external_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `external_id` | path | string | Yes | External system identifier for the billing event.
For example, a SAP document number or payment processor reference ID.
 |

**Sample Call**

```bash
epilot billing getBillingEventByExternalId \
  -p external_id=SAP-54321
```

Using positional args for path parameters:

```bash
epilot billing getBillingEventByExternalId SAP-54321
```

With JSONata filter:

```bash
epilot billing getBillingEventByExternalId -p external_id=SAP-54321 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "type": "installment",
  "direction": "debit",
  "note": "July power & gas installment payment",
  "status": "open",
  "booking_date": "2025-07-10",
  "due_date": "2025-07-10",
  "billing_amount": 5000,
  "billing_amount_decimal": "50.00",
  "billing_currency": "EUR"
}
```

</details>

---

### `createContractEntity`

Create a new contract entity (Vertrag) for billing purposes.

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
  "_title": "Abschlagszahlung Juli 2025",
  "_org": "123456",
  "_schema": "billing_event",
  "_tags": ["billing", "energy"],
  "_created_at": "2025-06-15T10:30:00Z",
  "_updated_at": "2025-06-15T14:45:00Z",
  "contract_name": "Stromvertrag Haushalt",
  "contract_number": "STR-2025-001234",
  "status": "active",
  "description": "Haushaltsstrom-Tarif mit 24 Monaten Preisgarantie",
  "account_number": "KD-67890",
  "branch": "power",
  "billing_address": "Musterstraße 123, 50667 Köln",
  "delivery_address": "Musterstraße 123, 50667 Köln",
  "additional_addresses": "Postfach 456, 50668 Köln",
  "termination_date": "2025-12-31",
  "termination_reason": "Kundenkündigung",
  "billing_period": "monthly",
  "billing_duration_amount": 30,
  "renewal_duration_amount": 12,
  "renewal_duration_unit": "months",
  "notice_time_amount": 30,
  "notice_time_unit": "months",
  "start_date": "2025-01-01",
  "billing_due_day": 15,
  "installment_amount": 8500,
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
  "_title": "Abschlagszahlung Juli 2025",
  "_org": "123456",
  "_schema": "billing_event",
  "_tags": ["billing", "energy"],
  "_created_at": "2025-06-15T10:30:00Z",
  "_updated_at": "2025-06-15T14:45:00Z",
  "contract_name": "Stromvertrag Haushalt",
  "contract_number": "STR-2025-001234",
  "status": "active",
  "description": "Haushaltsstrom-Tarif mit 24 Monaten Preisgarantie",
  "account_number": "KD-67890",
  "branch": "power",
  "billing_address": "Musterstraße 123, 50667 Köln",
  "delivery_address": "Musterstraße 123, 50667 Köln",
  "additional_addresses": "Postfach 456, 50668 Köln",
  "termination_date": "2025-12-31",
  "termination_reason": "Kundenkündigung",
  "billing_period": "monthly",
  "billing_duration_amount": 30,
  "renewal_duration_amount": 12,
  "renewal_duration_unit": "months",
  "notice_time_amount": 30,
  "notice_time_unit": "months",
  "start_date": "2025-01-01",
  "billing_due_day": 15,
  "installment_amount": 8500,
  "balance": 8990,
  "balance_currency": "EUR"
}
```

</details>

---

### `updateContractEntity`

Update an existing contract entity (Vertrag).

`PATCH /v1/billing/contracts/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Unique identifier of the contract (Vertragsnummer) |

**Request Body** (required)

**Sample Call**

```bash
epilot billing updateContractEntity \
  -p id=f589786b-3024-43cd-9cb3-5a3c953f2896
```

With request body:

```bash
epilot billing updateContractEntity \
  -p id=f589786b-3024-43cd-9cb3-5a3c953f2896 \
  -d '{
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "Abschlagszahlung Juli 2025",
  "_org": "123456",
  "_schema": "billing_event",
  "_tags": ["billing", "energy"],
  "_created_at": "2025-06-15T10:30:00Z",
  "_updated_at": "2025-06-15T14:45:00Z",
  "contract_name": "Stromvertrag Haushalt",
  "contract_number": "STR-2025-001234",
  "status": "active",
  "description": "Haushaltsstrom-Tarif mit 24 Monaten Preisgarantie",
  "account_number": "KD-67890",
  "branch": "power",
  "billing_address": "Musterstraße 123, 50667 Köln",
  "delivery_address": "Musterstraße 123, 50667 Köln",
  "additional_addresses": "Postfach 456, 50668 Köln",
  "termination_date": "2025-12-31",
  "termination_reason": "Kundenkündigung",
  "billing_period": "monthly",
  "billing_duration_amount": 30,
  "renewal_duration_amount": 12,
  "renewal_duration_unit": "months",
  "notice_time_amount": 30,
  "notice_time_unit": "months",
  "start_date": "2025-01-01",
  "billing_due_day": 15,
  "installment_amount": 8500,
  "balance": 8990,
  "balance_currency": "EUR"
}'
```

Using positional args for path parameters:

```bash
epilot billing updateContractEntity f589786b-3024-43cd-9cb3-5a3c953f2896
```

Using stdin pipe:

```bash
cat body.json | epilot billing updateContractEntity -p id=f589786b-3024-43cd-9cb3-5a3c953f2896
```

With JSONata filter:

```bash
epilot billing updateContractEntity -p id=f589786b-3024-43cd-9cb3-5a3c953f2896 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "5da0a718-c822-403d-9f5d-20d4584e0528",
  "_title": "Abschlagszahlung Juli 2025",
  "_org": "123456",
  "_schema": "billing_event",
  "_tags": ["billing", "energy"],
  "_created_at": "2025-06-15T10:30:00Z",
  "_updated_at": "2025-06-15T14:45:00Z",
  "contract_name": "Stromvertrag Haushalt",
  "contract_number": "STR-2025-001234",
  "status": "active",
  "description": "Haushaltsstrom-Tarif mit 24 Monaten Preisgarantie",
  "account_number": "KD-67890",
  "branch": "power",
  "billing_address": "Musterstraße 123, 50667 Köln",
  "delivery_address": "Musterstraße 123, 50667 Köln",
  "additional_addresses": "Postfach 456, 50668 Köln",
  "termination_date": "2025-12-31",
  "termination_reason": "Kundenkündigung",
  "billing_period": "monthly",
  "billing_duration_amount": 30,
  "renewal_duration_amount": 12,
  "renewal_duration_unit": "months",
  "notice_time_amount": 30,
  "notice_time_unit": "months",
  "start_date": "2025-01-01",
  "billing_due_day": 15,
  "installment_amount": 8500,
  "balance": 8990,
  "balance_currency": "EUR"
}
```

</details>

---

### `deleteContractEntity`

Delete an existing contract entity (Vertrag).

`DELETE /v1/billing/contracts/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Unique identifier of the contract to delete |

**Sample Call**

```bash
epilot billing deleteContractEntity \
  -p id=f589786b-3024-43cd-9cb3-5a3c953f2896
```

Using positional args for path parameters:

```bash
epilot billing deleteContractEntity f589786b-3024-43cd-9cb3-5a3c953f2896
```

With JSONata filter:

```bash
epilot billing deleteContractEntity -p id=f589786b-3024-43cd-9cb3-5a3c953f2896 --jsonata '$'
```

---

### `getContractPricingInformation`

Get current pricing information and recent configuration history for a Contract.

`GET /v1/billing/contracts/{id}/pricing_information`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | ID of the Contract entity |
| `history_change_types` | query | string | No | Comma-separated billing configuration change types to return. When omitted, installment history is returned by default. |
| `include_history` | query | boolean | No | Include recent configuration history in the pricing information response. Set to false when using the dedicated configuration history endpoint. |

**Sample Call**

```bash
epilot billing getContractPricingInformation \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot billing getContractPricingInformation 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot billing getContractPricingInformation -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'entity_type'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity_type": "contract",
  "entity_id": "string",
  "title": "string",
  "current_installment_amount": {
    "amount": 10050,
    "amount_decimal": "100.50",
    "currency": "EUR"
  },
  "context": {
    "base_price": {
      "price_id": "string",
      "price_title": "string",
      "tariff_type": "string",
      "pricing_model": "string",
      "unit_amount_gross_decimal": "string",
      "unit_amount_net_decimal": "string",
      "before_discount_unit_amount_gross_decimal": "string",
      "before_discount_unit_amount_net_decimal": "string",
      "unit_discount_amount_decimal": "string",
      "unit_discount_amount_net_decimal": "string",
      "currency": "EUR",
      "billing_period": "string",
      "unit": "string",
      "has_discount": true,
      "is_dynamic_tariff": true,
      "dynamic_tariff": {}
    },
    "base_prices": [
      {}
    ],
    "working_price": {
      "price_id": "string",
      "price_title": "string",
      "tariff_type": "string",
      "pricing_model": "string",
      "unit_amount_gross_decimal": "string",
      "unit_amount_net_decimal": "string",
      "before_discount_unit_amount_gross_decimal": "string",
      "before_discount_unit_amount_net_decimal": "string",
      "unit_discount_amount_decimal": "string",
      "unit_discount_amount_net_decimal": "string",
      "currency": "EUR",
      "billing_period": "string",
      "unit": "string",
      "has_discount": true,
      "is_dynamic_tariff": true,
      "dynamic_tariff": {}
    },
    "working_prices": [
      {}
    ]
  },
  "balance": {
    "amount": 8990,
    "amount_decimal": "89.90",
    "currency": "EUR"
  },
  "schedule": {
    "billing_due_day": 0,
    "billing_period": "weekly",
    "installments_per_year": 0,
    "inferred": true
  },
  "pending_installment_change": true,
  "history": [
    {
      "event_id": "string",
      "org_id": "string",
      "entity_type": "contract",
      "entity_id": "string",
      "schema_version": 1,
      "effective_at": "1970-01-01T00:00:00.000Z",
      "changed_at": "1970-01-01T00:00:00.000Z",
      "created_at": "1970-01-01T00:00:00.000Z",
      "source": "portal",
      "source_label": "string",
      "source_system": "string",
      "source_reference": "string",
      "change_type": "installment_amount_changed",
      "previous_value": {},
      "new_value": {},
      "context": {}
    }
  ]
}
```

</details>

---

### `getBillingAccountPricingInformation`

Get current pricing information for the active Contracts linked to a Billing Account.

`GET /v1/billing/billing_accounts/{id}/pricing_information`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | ID of the Billing Account entity |
| `history_change_types` | query | string | No | Comma-separated billing configuration change types to return. When omitted, installment history is returned by default. |
| `include_history` | query | boolean | No | Include recent configuration history in the pricing information response. Set to false when using the dedicated configuration history endpoint. |

**Sample Call**

```bash
epilot billing getBillingAccountPricingInformation \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot billing getBillingAccountPricingInformation 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot billing getBillingAccountPricingInformation -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'entity_type'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity_type": "billing_account",
  "entity_id": "string",
  "title": "string",
  "balance": {
    "amount": 8990,
    "amount_decimal": "89.90",
    "currency": "EUR"
  },
  "contracts": [
    {
      "entity_type": "contract",
      "entity_id": "string",
      "title": "string",
      "current_installment_amount": {},
      "context": {},
      "balance": {},
      "schedule": {},
      "pending_installment_change": true,
      "history": []
    }
  ]
}
```

</details>

---

### `getContractConfigurationHistory`

Get billing configuration history for a Contract.

`GET /v1/billing/contracts/{id}/configuration_history`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | ID of the Contract entity |
| `change_type` | query | "installment_amount_changed" \| "contract_pricing_changed" | No | Billing configuration change type to return. |
| `history_change_types` | query | string | No | Comma-separated billing configuration change types to return. When omitted, installment history is returned by default. |
| `from` | query | number | No | Initial offset for paginated results. |
| `size` | query | number | No | Maximum number of results to return. |

**Sample Call**

```bash
epilot billing getContractConfigurationHistory \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot billing getContractConfigurationHistory 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot billing getContractConfigurationHistory -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'history'
```

<details>
<summary>Sample Response</summary>

```json
{
  "history": [
    {
      "event_id": "string",
      "org_id": "string",
      "entity_type": "contract",
      "entity_id": "string",
      "schema_version": 1,
      "effective_at": "1970-01-01T00:00:00.000Z",
      "changed_at": "1970-01-01T00:00:00.000Z",
      "created_at": "1970-01-01T00:00:00.000Z",
      "source": "portal",
      "source_label": "string",
      "source_system": "string",
      "source_reference": "string",
      "change_type": "installment_amount_changed",
      "previous_value": {},
      "new_value": {},
      "context": {}
    }
  ],
  "total": 0
}
```

</details>

---

### `getBillingAccountConfigurationHistory`

Get merged billing configuration history for active Contracts linked to a Billing Account.

`GET /v1/billing/billing_accounts/{id}/configuration_history`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | ID of the Billing Account entity |
| `change_type` | query | "installment_amount_changed" \| "contract_pricing_changed" | No | Billing configuration change type to return. |
| `history_change_types` | query | string | No | Comma-separated billing configuration change types to return. When omitted, installment history is returned by default. |
| `from` | query | number | No | Initial offset for paginated results. |
| `size` | query | number | No | Maximum number of results to return. |

**Sample Call**

```bash
epilot billing getBillingAccountConfigurationHistory \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot billing getBillingAccountConfigurationHistory 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot billing getBillingAccountConfigurationHistory -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'history'
```

<details>
<summary>Sample Response</summary>

```json
{
  "history": [
    {
      "event_id": "string",
      "org_id": "string",
      "entity_type": "contract",
      "entity_id": "string",
      "schema_version": 1,
      "effective_at": "1970-01-01T00:00:00.000Z",
      "changed_at": "1970-01-01T00:00:00.000Z",
      "created_at": "1970-01-01T00:00:00.000Z",
      "source": "portal",
      "source_label": "string",
      "source_system": "string",
      "source_reference": "string",
      "change_type": "installment_amount_changed",
      "previous_value": {},
      "new_value": {},
      "context": {}
    }
  ],
  "total": 0
}
```

</details>

---

### `getCustomerBalance`

Retrieve the total balance (Kontostand) across all contracts and orders for a customer.

`GET /v1/billing/customers/{id}/balance`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Customer entity ID. This can be either a contact ID (Kontakt-ID) or
an account ID (Kundenkonto-ID).
 |

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
