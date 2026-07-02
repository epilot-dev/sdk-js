# Billing API

- **Base URL:** `https://billing.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/billing](https://docs.epilot.io/api/billing)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.billing.getBillingEvents(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/billing'

const billingClient = getClient()
authorize(billingClient, () => '<token>')
const { data } = await billingClient.getBillingEvents(...)
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

**Pricing Information**
- [`getContractPricingInformation`](#getcontractpricinginformation)
- [`getBillingAccountPricingInformation`](#getbillingaccountpricinginformation)

**Configuration History**
- [`getContractConfigurationHistory`](#getcontractconfigurationhistory)
- [`getBillingAccountConfigurationHistory`](#getbillingaccountconfigurationhistory)

**Balance**
- [`getCustomerBalance`](#getcustomerbalance)

**Schemas**
- [`Error`](#error)
- [`BaseEntity`](#baseentity)
- [`EntityId`](#entityid)
- [`EntitySlug`](#entityslug)
- [`EntityRelationItem`](#entityrelationitem)
- [`BaseBillingEvent`](#basebillingevent)
- [`BillingEvent`](#billingevent)
- [`BillingEventUpdate`](#billingeventupdate)
- [`InstallmentEvent`](#installmentevent)
- [`PaymentEvent`](#paymentevent)
- [`ReimbursementEvent`](#reimbursementevent)
- [`DunningFeeEvent`](#dunningfeeevent)
- [`InvoiceEvent`](#invoiceevent)
- [`FinalBillEvent`](#finalbillevent)
- [`BonusEvent`](#bonusevent)
- [`CorrectionEvent`](#correctionevent)
- [`CustomEvent`](#customevent)
- [`Contract`](#contract)
- [`ContractItem`](#contractitem)
- [`InstallmentAmountValue`](#installmentamountvalue)
- [`PriceContext`](#pricecontext)
- [`DynamicTariffPriceContext`](#dynamictariffpricecontext)
- [`ConfigurationHistoryContext`](#configurationhistorycontext)
- [`ConfigurationHistoryRow`](#configurationhistoryrow)
- [`ConfigurationHistoryResponse`](#configurationhistoryresponse)
- [`PricingInformationBalance`](#pricinginformationbalance)
- [`ContractPricingSchedule`](#contractpricingschedule)
- [`ContractPricingInformation`](#contractpricinginformation)
- [`BillingAccountPricingInformation`](#billingaccountpricinginformation)
- [`Balance`](#balance)
- [`Currency`](#currency)

### `getBillingEvents`

Retrieve and filter billing events (Buchungssätze) such as installments (Abschlagszahlungen),
payments (Zahlungseingänge), and reimbursements (Rückerstattungen).

`GET /v1/billing/events`

```ts
const { data } = await client.getBillingEvents({
  from: 1,
  size: 1,
  entity_id: ['...'],
  contact_id: 'example',
  event_type: 'example',
  date_after: 'example',
  date_before: 'example',
})
```

<details>
<summary>Response</summary>

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
payment (Zahlungseingang), or reimbursement (Rückerstattung).

`POST /v1/billing/events`

```ts
const { data } = await client.createBillingEvent(
  null,
  {
    type: 'installment',
    direction: 'debit',
    note: 'July power & gas installment payment',
    status: 'open',
    booking_date: '2025-07-10',
    due_date: '2025-07-10',
    billing_amount: 5000,
    billing_amount_decimal: '50.00',
    billing_currency: 'EUR'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getBillingEvent({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateBillingEvent(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    type: 'installment',
    direction: 'debit',
    billing_amount: 10000,
    billing_amount_decimal: '100.00',
    billing_currency: 'EUR',
    external_id: 'SAP-54321',
    contract: {
      $relation: [
        {
          entity_id: 'f589786b-3024-43cd-9cb3-5a3c953f2896'
        }
      ]
    },
    booking_date: '2025-06-15',
    due_date: '2025-06-30',
    paid_date: '2025-06-15T10:00:00Z',
    status: 'closed',
    related_event: 'd4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e',
    external_link: {
      href: 'https://billing.example.com/invoices/12345',
      title: 'Invoice 12345'
    },
    attachments: {
      $relation: [
        {
          entity_id: 'f589786b-3024-43cd-9cb3-5a3c953f2896'
        }
      ]
    },
    note: 'Teilzahlung für Abschlag Juni',
    internal_note: 'Rückmeldung von SAP: Betrag aus Zahlungsavis 2025-06-14 übernommen'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteBillingEvent({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `getBillingEventByExternalId`

Retrieve a billing event (Buchungssatz) by its external system identifier.

`GET /v1/billing/external/{external_id}`

```ts
const { data } = await client.getBillingEventByExternalId({
  external_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createContractEntity(
  null,
  {
    _id: '5da0a718-c822-403d-9f5d-20d4584e0528',
    _title: 'Abschlagszahlung Juli 2025',
    _org: '123456',
    _schema: 'billing_event',
    _tags: ['billing', 'energy'],
    _created_at: '2025-06-15T10:30:00Z',
    _updated_at: '2025-06-15T14:45:00Z',
    contract_name: 'Stromvertrag Haushalt',
    contract_number: 'STR-2025-001234',
    status: 'active',
    description: 'Haushaltsstrom-Tarif mit 24 Monaten Preisgarantie',
    account_number: 'KD-67890',
    branch: 'power',
    billing_address: 'Musterstraße 123, 50667 Köln',
    delivery_address: 'Musterstraße 123, 50667 Köln',
    additional_addresses: 'Postfach 456, 50668 Köln',
    termination_date: '2025-12-31',
    termination_reason: 'Kundenkündigung',
    billing_period: 'monthly',
    billing_duration_amount: 30,
    renewal_duration_amount: 12,
    renewal_duration_unit: 'months',
    notice_time_amount: 30,
    notice_time_unit: 'months',
    start_date: '2025-01-01',
    billing_due_day: 15,
    installment_amount: 8500,
    balance: 8990,
    balance_currency: 'EUR'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateContractEntity(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    _id: '5da0a718-c822-403d-9f5d-20d4584e0528',
    _title: 'Abschlagszahlung Juli 2025',
    _org: '123456',
    _schema: 'billing_event',
    _tags: ['billing', 'energy'],
    _created_at: '2025-06-15T10:30:00Z',
    _updated_at: '2025-06-15T14:45:00Z',
    contract_name: 'Stromvertrag Haushalt',
    contract_number: 'STR-2025-001234',
    status: 'active',
    description: 'Haushaltsstrom-Tarif mit 24 Monaten Preisgarantie',
    account_number: 'KD-67890',
    branch: 'power',
    billing_address: 'Musterstraße 123, 50667 Köln',
    delivery_address: 'Musterstraße 123, 50667 Köln',
    additional_addresses: 'Postfach 456, 50668 Köln',
    termination_date: '2025-12-31',
    termination_reason: 'Kundenkündigung',
    billing_period: 'monthly',
    billing_duration_amount: 30,
    renewal_duration_amount: 12,
    renewal_duration_unit: 'months',
    notice_time_amount: 30,
    notice_time_unit: 'months',
    start_date: '2025-01-01',
    billing_due_day: 15,
    installment_amount: 8500,
    balance: 8990,
    balance_currency: 'EUR'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteContractEntity({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `getContractPricingInformation`

Get current pricing information and recent configuration history for a Contract.

`GET /v1/billing/contracts/{id}/pricing_information`

```ts
const { data } = await client.getContractPricingInformation({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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
    "working_price": {
      "price_id": "string",
      "price_title": "string",
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
    }
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
      "change_type": "installment_amount_changed",
      "schema_version": 1,
      "effective_at": "1970-01-01T00:00:00.000Z",
      "changed_at": "1970-01-01T00:00:00.000Z",
      "created_at": "1970-01-01T00:00:00.000Z",
      "source": "portal",
      "source_label": "string",
      "source_system": "string",
      "source_reference": "string",
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

```ts
const { data } = await client.getBillingAccountPricingInformation({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getContractConfigurationHistory({
  id: '123e4567-e89b-12d3-a456-426614174000',
  change_type: 'example',
  from: 1,
  size: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "history": [
    {
      "event_id": "string",
      "org_id": "string",
      "entity_type": "contract",
      "entity_id": "string",
      "change_type": "installment_amount_changed",
      "schema_version": 1,
      "effective_at": "1970-01-01T00:00:00.000Z",
      "changed_at": "1970-01-01T00:00:00.000Z",
      "created_at": "1970-01-01T00:00:00.000Z",
      "source": "portal",
      "source_label": "string",
      "source_system": "string",
      "source_reference": "string",
      "previous_value": {
        "amount": 10050,
        "amount_decimal": "100.50",
        "currency": "EUR"
      },
      "new_value": {
        "amount": 10050,
        "amount_decimal": "100.50",
        "currency": "EUR"
      },
      "context": {
        "base_price": {
          "price_id": "string",
          "price_title": "string",
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
          "dynamic_tariff": {
            "mode": "string",
            "interval": "string",
            "average_price_decimal": "string",
            "markup_amount_decimal": "string",
            "markup_amount_net_decimal": "string",
            "markup_amount_gross_decimal": "string",
            "market_price_decimal": "string",
            "market_price_currency": "EUR",
            "market": "string",
            "bidding_zone": "string",
            "timestamp": "string"
          }
        },
        "working_price": {
          "price_id": "string",
          "price_title": "string",
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
          "dynamic_tariff": {
            "mode": "string",
            "interval": "string",
            "average_price_decimal": "string",
            "markup_amount_decimal": "string",
            "markup_amount_net_decimal": "string",
            "markup_amount_gross_decimal": "string",
            "market_price_decimal": "string",
            "market_price_currency": "EUR",
            "market": "string",
            "bidding_zone": "string",
            "timestamp": "string"
          }
        }
      }
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

```ts
const { data } = await client.getBillingAccountConfigurationHistory({
  id: '123e4567-e89b-12d3-a456-426614174000',
  change_type: 'example',
  from: 1,
  size: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "history": [
    {
      "event_id": "string",
      "org_id": "string",
      "entity_type": "contract",
      "entity_id": "string",
      "change_type": "installment_amount_changed",
      "schema_version": 1,
      "effective_at": "1970-01-01T00:00:00.000Z",
      "changed_at": "1970-01-01T00:00:00.000Z",
      "created_at": "1970-01-01T00:00:00.000Z",
      "source": "portal",
      "source_label": "string",
      "source_system": "string",
      "source_reference": "string",
      "previous_value": {
        "amount": 10050,
        "amount_decimal": "100.50",
        "currency": "EUR"
      },
      "new_value": {
        "amount": 10050,
        "amount_decimal": "100.50",
        "currency": "EUR"
      },
      "context": {
        "base_price": {
          "price_id": "string",
          "price_title": "string",
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
          "dynamic_tariff": {
            "mode": "string",
            "interval": "string",
            "average_price_decimal": "string",
            "markup_amount_decimal": "string",
            "markup_amount_net_decimal": "string",
            "markup_amount_gross_decimal": "string",
            "market_price_decimal": "string",
            "market_price_currency": "EUR",
            "market": "string",
            "bidding_zone": "string",
            "timestamp": "string"
          }
        },
        "working_price": {
          "price_id": "string",
          "price_title": "string",
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
          "dynamic_tariff": {
            "mode": "string",
            "interval": "string",
            "average_price_decimal": "string",
            "markup_amount_decimal": "string",
            "markup_amount_net_decimal": "string",
            "markup_amount_gross_decimal": "string",
            "market_price_decimal": "string",
            "market_price_currency": "EUR",
            "market": "string",
            "bidding_zone": "string",
            "timestamp": "string"
          }
        }
      }
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

```ts
const { data } = await client.getCustomerBalance({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "balance": 8990,
  "balance_decimal": "89.90",
  "balance_currency": "EUR"
}
```

</details>

---

## Schemas

### `Error`

Standard error response format

```ts
type Error = {
  error: string
  message: string
}
```

### `BaseEntity`

Base schema for all epilot entities with common system fields

```ts
type BaseEntity = {
  _id?: string
  _title?: string
  _org?: string
  _schema?: string
  _tags?: string[]
  _created_at?: string // date-time
  _updated_at?: string // date-time
}
```

### `EntityId`

Unique entity identifier (UUID format)

```ts
type EntityId = string
```

### `EntitySlug`

URL-friendly identifier for the entity schema (Schema-Slug)

```ts
type EntitySlug = string
```

### `EntityRelationItem`

Reference to a related entity

```ts
type EntityRelationItem = {
  entity_id?: string
}
```

### `BaseBillingEvent`

Represents a single financial transaction entry (Buchungssatz) in the billing ledger.
Each entry is either a debit or a credit, following double-entry accounting principles.
Common types include Abschlagszahlung (installment), Zahlungseingang (payment), Rückerstattung (reimbursement), etc.


```ts
type BaseBillingEvent = {
  _id?: string
  _title?: string
  _org?: string
  _schema?: string
  _tags?: string[]
  _created_at?: string // date-time
  _updated_at?: string // date-time
  type: string
  direction?: "debit" | "credit"
  billing_amount: number
  billing_amount_decimal: string
  billing_currency: string
  external_id?: string
  contract: {
    $relation?: Array<{
      entity_id?: { ... }
    }>
  }
  booking_date: string // date
  due_date?: string // date
  paid_date?: string // date-time
  status?: "closed" | "open"
  related_event?: string
  external_link?: {
    href?: string // uri
    title?: string
  }
  attachments?: {
    $relation?: Array<{
      entity_id?: { ... }
    }>
  }
  note?: string
  internal_note?: string
}
```

### `BillingEvent`

Collection of supported billing event types (Buchungsarten).
Each type represents a different kind of financial transaction
that affects the customer's balance.


```ts
type BillingEvent = {
  type?: "installment"
} | {
  type?: "payment"
} | {
  type?: "reimbursement"
} | {
  type?: "dunning_fee"
} | {
  type?: "invoice"
} | {
  type?: "final_bill"
} | {
  type?: "bonus"
} | {
  type?: "correction"
} | {
  type?: string
}
```

### `BillingEventUpdate`

Fields to update on an existing billing event.

```ts
type BillingEventUpdate = {
  type?: string
  direction?: "debit" | "credit"
  billing_amount?: number
  billing_amount_decimal?: string
  billing_currency?: string
  external_id?: string
  contract?: {
    $relation?: Array<{
      entity_id?: { ... }
    }>
  }
  booking_date?: string // date
  due_date?: string // date
  paid_date?: string // date-time
  status?: "closed" | "open"
  related_event?: string
  external_link?: {
    href?: string // uri
    title?: string
  }
  attachments?: {
    $relation?: Array<{
      entity_id?: { ... }
    }>
  }
  note?: string
  internal_note?: string
}
```

### `InstallmentEvent`

Installment billing event (Abschlagszahlung).
Represents a scheduled partial payment that the customer owes,
typically billed monthly for utilities like electricity or gas.


```ts
type InstallmentEvent = {
  type?: "installment"
}
```

### `PaymentEvent`

Payment received event (Zahlungseingang).
Represents money received from the customer, reducing their balance.
This is a credit transaction.


```ts
type PaymentEvent = {
  type?: "payment"
}
```

### `ReimbursementEvent`

Reimbursement event (Rückerstattung).
Represents a refund to the customer, typically after overpayment
or billing correction. This is a credit transaction.


```ts
type ReimbursementEvent = {
  type?: "reimbursement"
}
```

### `DunningFeeEvent`

Dunning fee event (Mahngebühr).
Represents a late payment fee charged to the customer
after a payment reminder has been sent. This is a debit transaction.


```ts
type DunningFeeEvent = {
  type?: "dunning_fee"
}
```

### `InvoiceEvent`

```ts
type InvoiceEvent = {
  type?: "invoice"
}
```

### `FinalBillEvent`

Final bill event (Endabrechnung/Schlussrechnung).
Represents the final settlement when a contract ends,
accounting for actual consumption vs. paid installments.
Can be either debit (customer owes more) or credit (customer overpaid).


```ts
type FinalBillEvent = {
  type?: "final_bill"
}
```

### `BonusEvent`

Bonus/credit event (Gutschrift/Bonus).
Represents a promotional credit or bonus applied to the customer's account,
such as welcome bonuses or loyalty rewards. This is a credit transaction.


```ts
type BonusEvent = {
  type?: "bonus"
}
```

### `CorrectionEvent`

Correction event (Korrekturbuchung).
Represents an adjustment to a previous billing entry,
such as correcting an overcharge or undercharge.
Can be either debit or credit depending on the correction.


```ts
type CorrectionEvent = {
  type?: "correction"
}
```

### `CustomEvent`

Custom billing event (Benutzerdefinierte Buchung).
Allows for organization-specific billing event types not covered
by the standard types. Use a descriptive type name.


```ts
type CustomEvent = {
  type?: string
}
```

### `Contract`

Represents a customer contract (Vertrag) for billing purposes.
Contracts are the parent entities for billing events and contain
billing configuration such as installment amounts and billing cycles.


```ts
type Contract = {
  _id?: string
  _title?: string
  _org?: string
  _schema?: string
  _tags?: string[]
  _created_at?: string // date-time
  _updated_at?: string // date-time
  contract_name?: string
  contract_number?: string
  status?: "draft" | "in_approval_process" | "approved" | "active" | "deactivated" | "revoked" | "terminated" | "expired"
  description?: string
  account_number?: string
  branch?: "power" | "gas" | "water" | "waste_water" | "district_heating"
  billing_address?: string
  delivery_address?: string
  additional_addresses?: string
  termination_date?: string // date
  termination_reason?: string
  billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly"
  billing_duration_amount?: number
  renewal_duration_amount?: number
  renewal_duration_unit?: "weeks" | "months" | "years"
  notice_time_amount?: number
  notice_time_unit?: "weeks" | "months" | "years"
  start_date?: string // date
  billing_due_day?: number
  installment_amount?: number
  balance?: number
  balance_currency?: string
}
```

### `ContractItem`

Contract entity with all required system fields populated

```ts
type ContractItem = {
  _id?: string
  _title?: string
  _org?: string
  _schema?: string
  _tags?: string[]
  _created_at?: string // date-time
  _updated_at?: string // date-time
  contract_name?: string
  contract_number?: string
  status?: "draft" | "in_approval_process" | "approved" | "active" | "deactivated" | "revoked" | "terminated" | "expired"
  description?: string
  account_number?: string
  branch?: "power" | "gas" | "water" | "waste_water" | "district_heating"
  billing_address?: string
  delivery_address?: string
  additional_addresses?: string
  termination_date?: string // date
  termination_reason?: string
  billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly"
  billing_duration_amount?: number
  renewal_duration_amount?: number
  renewal_duration_unit?: "weeks" | "months" | "years"
  notice_time_amount?: number
  notice_time_unit?: "weeks" | "months" | "years"
  start_date?: string // date
  billing_due_day?: number
  installment_amount?: number
  balance?: number
  balance_currency?: string
}
```

### `InstallmentAmountValue`

```ts
type InstallmentAmountValue = {
  amount?: number
  amount_decimal?: string
  currency?: string
}
```

### `PriceContext`

```ts
type PriceContext = {
  price_id?: string
  price_title?: string
  pricing_model?: string
  unit_amount_gross_decimal?: string
  unit_amount_net_decimal?: string
  before_discount_unit_amount_gross_decimal?: string
  before_discount_unit_amount_net_decimal?: string
  unit_discount_amount_decimal?: string
  unit_discount_amount_net_decimal?: string
  currency?: string
  billing_period?: string
  unit?: string
  has_discount?: boolean
  is_dynamic_tariff?: boolean
  dynamic_tariff?: {
    mode?: string
    interval?: string
    average_price_decimal?: string
    markup_amount_decimal?: string
    markup_amount_net_decimal?: string
    markup_amount_gross_decimal?: string
    market_price_decimal?: string
    market_price_currency?: string
    market?: string
    bidding_zone?: string
    timestamp?: string
  }
}
```

### `DynamicTariffPriceContext`

```ts
type DynamicTariffPriceContext = {
  mode?: string
  interval?: string
  average_price_decimal?: string
  markup_amount_decimal?: string
  markup_amount_net_decimal?: string
  markup_amount_gross_decimal?: string
  market_price_decimal?: string
  market_price_currency?: string
  market?: string
  bidding_zone?: string
  timestamp?: string
}
```

### `ConfigurationHistoryContext`

```ts
type ConfigurationHistoryContext = {
  base_price?: {
    price_id?: string
    price_title?: string
    pricing_model?: string
    unit_amount_gross_decimal?: string
    unit_amount_net_decimal?: string
    before_discount_unit_amount_gross_decimal?: string
    before_discount_unit_amount_net_decimal?: string
    unit_discount_amount_decimal?: string
    unit_discount_amount_net_decimal?: string
    currency?: string
    billing_period?: string
    unit?: string
    has_discount?: boolean
    is_dynamic_tariff?: boolean
    dynamic_tariff?: {
      mode?: { ... }
      interval?: { ... }
      average_price_decimal?: { ... }
      markup_amount_decimal?: { ... }
      markup_amount_net_decimal?: { ... }
      markup_amount_gross_decimal?: { ... }
      market_price_decimal?: { ... }
      market_price_currency?: { ... }
      market?: { ... }
      bidding_zone?: { ... }
      timestamp?: { ... }
    }
  }
  working_price?: {
    price_id?: string
    price_title?: string
    pricing_model?: string
    unit_amount_gross_decimal?: string
    unit_amount_net_decimal?: string
    before_discount_unit_amount_gross_decimal?: string
    before_discount_unit_amount_net_decimal?: string
    unit_discount_amount_decimal?: string
    unit_discount_amount_net_decimal?: string
    currency?: string
    billing_period?: string
    unit?: string
    has_discount?: boolean
    is_dynamic_tariff?: boolean
    dynamic_tariff?: {
      mode?: { ... }
      interval?: { ... }
      average_price_decimal?: { ... }
      markup_amount_decimal?: { ... }
      markup_amount_net_decimal?: { ... }
      markup_amount_gross_decimal?: { ... }
      market_price_decimal?: { ... }
      market_price_currency?: { ... }
      market?: { ... }
      bidding_zone?: { ... }
      timestamp?: { ... }
    }
  }
}
```

### `ConfigurationHistoryRow`

```ts
type ConfigurationHistoryRow = {
  event_id: string
  org_id: string
  entity_type: "contract" | "billing_account"
  entity_id: string
  change_type: "installment_amount_changed"
  schema_version: number
  effective_at?: string // date-time
  changed_at: string // date-time
  created_at: string // date-time
  source: "portal" | "epilot" | "erp" | "system" | "api" | "external" | "journey" | "automation" | "unknown"
  source_label?: string
  source_system?: string
  source_reference?: string
  previous_value?: {
    amount?: number
    amount_decimal?: string
    currency?: string
  }
  new_value: {
    amount?: number
    amount_decimal?: string
    currency?: string
  }
  context?: {
    base_price?: {
      price_id?: { ... }
      price_title?: { ... }
      pricing_model?: { ... }
      unit_amount_gross_decimal?: { ... }
      unit_amount_net_decimal?: { ... }
      before_discount_unit_amount_gross_decimal?: { ... }
      before_discount_unit_amount_net_decimal?: { ... }
      unit_discount_amount_decimal?: { ... }
      unit_discount_amount_net_decimal?: { ... }
      currency?: { ... }
      billing_period?: { ... }
      unit?: { ... }
      has_discount?: { ... }
      is_dynamic_tariff?: { ... }
      dynamic_tariff?: { ... }
    }
    working_price?: {
      price_id?: { ... }
      price_title?: { ... }
      pricing_model?: { ... }
      unit_amount_gross_decimal?: { ... }
      unit_amount_net_decimal?: { ... }
      before_discount_unit_amount_gross_decimal?: { ... }
      before_discount_unit_amount_net_decimal?: { ... }
      unit_discount_amount_decimal?: { ... }
      unit_discount_amount_net_decimal?: { ... }
      currency?: { ... }
      billing_period?: { ... }
      unit?: { ... }
      has_discount?: { ... }
      is_dynamic_tariff?: { ... }
      dynamic_tariff?: { ... }
    }
  }
}
```

### `ConfigurationHistoryResponse`

```ts
type ConfigurationHistoryResponse = {
  history: Array<{
    event_id: string
    org_id: string
    entity_type: "contract" | "billing_account"
    entity_id: string
    change_type: "installment_amount_changed"
    schema_version: number
    effective_at?: string // date-time
    changed_at: string // date-time
    created_at: string // date-time
    source: "portal" | "epilot" | "erp" | "system" | "api" | "external" | "journey" | "automation" | "unknown"
    source_label?: string
    source_system?: string
    source_reference?: string
    previous_value?: {
      amount?: { ... }
      amount_decimal?: { ... }
      currency?: { ... }
    }
    new_value: {
      amount?: { ... }
      amount_decimal?: { ... }
      currency?: { ... }
    }
    context?: {
      base_price?: { ... }
      working_price?: { ... }
    }
  }>
  total: number
}
```

### `PricingInformationBalance`

```ts
type PricingInformationBalance = {
  amount?: number
  amount_decimal?: string
  currency?: string
}
```

### `ContractPricingSchedule`

```ts
type ContractPricingSchedule = {
  billing_due_day?: number
  billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly"
  installments_per_year?: number
  inferred: boolean
}
```

### `ContractPricingInformation`

```ts
type ContractPricingInformation = {
  entity_type: "contract"
  entity_id: string
  title?: string
  current_installment_amount?: {
    amount?: number
    amount_decimal?: string
    currency?: string
  }
  context?: {
    base_price?: {
      price_id?: { ... }
      price_title?: { ... }
      pricing_model?: { ... }
      unit_amount_gross_decimal?: { ... }
      unit_amount_net_decimal?: { ... }
      before_discount_unit_amount_gross_decimal?: { ... }
      before_discount_unit_amount_net_decimal?: { ... }
      unit_discount_amount_decimal?: { ... }
      unit_discount_amount_net_decimal?: { ... }
      currency?: { ... }
      billing_period?: { ... }
      unit?: { ... }
      has_discount?: { ... }
      is_dynamic_tariff?: { ... }
      dynamic_tariff?: { ... }
    }
    working_price?: {
      price_id?: { ... }
      price_title?: { ... }
      pricing_model?: { ... }
      unit_amount_gross_decimal?: { ... }
      unit_amount_net_decimal?: { ... }
      before_discount_unit_amount_gross_decimal?: { ... }
      before_discount_unit_amount_net_decimal?: { ... }
      unit_discount_amount_decimal?: { ... }
      unit_discount_amount_net_decimal?: { ... }
      currency?: { ... }
      billing_period?: { ... }
      unit?: { ... }
      has_discount?: { ... }
      is_dynamic_tariff?: { ... }
      dynamic_tariff?: { ... }
    }
  }
  balance?: {
    amount?: number
    amount_decimal?: string
    currency?: string
  }
  schedule?: {
    billing_due_day?: number
    billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly"
    installments_per_year?: number
    inferred: boolean
  }
  pending_installment_change?: boolean
  history: Array<{
    event_id: string
    org_id: string
    entity_type: "contract" | "billing_account"
    entity_id: string
    change_type: "installment_amount_changed"
    schema_version: number
    effective_at?: string // date-time
    changed_at: string // date-time
    created_at: string // date-time
    source: "portal" | "epilot" | "erp" | "system" | "api" | "external" | "journey" | "automation" | "unknown"
    source_label?: string
    source_system?: string
    source_reference?: string
    previous_value?: {
      amount?: { ... }
      amount_decimal?: { ... }
      currency?: { ... }
    }
    new_value: {
      amount?: { ... }
      amount_decimal?: { ... }
      currency?: { ... }
    }
    context?: {
      base_price?: { ... }
      working_price?: { ... }
    }
  }>
}
```

### `BillingAccountPricingInformation`

```ts
type BillingAccountPricingInformation = {
  entity_type: "billing_account"
  entity_id: string
  title?: string
  balance?: {
    amount?: number
    amount_decimal?: string
    currency?: string
  }
  contracts: Array<{
    entity_type: "contract"
    entity_id: string
    title?: string
    current_installment_amount?: {
      amount?: { ... }
      amount_decimal?: { ... }
      currency?: { ... }
    }
    context?: {
      base_price?: { ... }
      working_price?: { ... }
    }
    balance?: {
      amount?: { ... }
      amount_decimal?: { ... }
      currency?: { ... }
    }
    schedule?: {
      billing_due_day?: { ... }
      billing_period?: { ... }
      installments_per_year?: { ... }
      inferred: { ... }
    }
    pending_installment_change?: boolean
    history: Array<{
      event_id: { ... }
      org_id: { ... }
      entity_type: { ... }
      entity_id: { ... }
      change_type: { ... }
      schema_version: { ... }
      effective_at?: { ... }
      changed_at: { ... }
      created_at: { ... }
      source: { ... }
      source_label?: { ... }
      source_system?: { ... }
      source_reference?: { ... }
      previous_value?: { ... }
      new_value: { ... }
      context?: { ... }
    }>
  }>
}
```

### `Balance`

Customer balance summary (Kontostandübersicht).
Represents the aggregated balance across all contracts and orders for a customer.


```ts
type Balance = {
  balance?: number
  balance_decimal?: string
  balance_currency?: string
}
```

### `Currency`

Currency code in ISO 4217 format (Währungscode).
Common values: EUR (Euro), CHF (Swiss Franc)


```ts
type Currency = string
```
