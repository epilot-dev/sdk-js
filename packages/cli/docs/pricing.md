# Pricing API

- **Base URL:** `https://pricing-api.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/pricing](https://docs.epilot.io/api/pricing)

The `pricing-api` hub sets the foundations for the following Pricing APIs:

## Quick Start

```bash
# List available operations
epilot pricing

# Call an operation
epilot pricing $calculatePricingDetails
```

## Operations

**Order API**
- [`$calculatePricingDetails`](#$calculatepricingdetails) — Computes a set of pricing details that can be persisted on an entity with the pricing capability enabled, e.g: Orders or
- [`createOrder`](#createorder) — Create an order
- [`putOrder`](#putorder) — Update an existing Order

**Cart API**
- [`$checkoutCart`](#$checkoutcart) — Checkouts a cart and executes the specified checkout `mode` process.

**Catalog API**
- [`$searchCatalog`](#$searchcatalog) — Provides a querying functionalities over products and prices of the Catalog for a given organization.
- [`$privateSearchCatalog`](#$privatesearchcatalog) — Provides a querying functionalities over products and prices of the Catalog for a given organization.

**Promo Codes API**
- [`$validatePromoCodes`](#$validatepromocodes) — Validate a list of promo codes against a list of coupons

**Availability API**
- [`$availabilityCheck`](#$availabilitycheck) — The availability check endpoint
- [`$validateAvailabilityFile`](#$validateavailabilityfile) — Validates an availability file, it returns an array of errors if the file is invalid

**Spot Market API**
- [`$historicMarketPrices`](#$historicmarketprices) — Get a series of historic energy prices for a given time period, market and bidding zone.
- [`$averageMarketPrice`](#$averagemarketprice) — Get the average energy prices for a given time period, market and bidding zone.

**External Integrations API**
- [`$searchExternalProducts`](#$searchexternalproducts) — Returns the list of available products with computed prices based on a given context and for a given org integration.
- [`$searchExternalProductRecommendations`](#$searchexternalproductrecommendations) — Returns the list of available product recommendations with computed prices based on a given context and for a given org 
- [`$searchProviders`](#$searchproviders) — Returns the list of providers available based on a given location
- [`$searchStreets`](#$searchstreets) — Returns the list of streets available for a given postal code and city
- [`$computePrice`](#$computeprice) — Returns the price for a given product type based on location and consumption
- [`$getCredentials`](#$getcredentials) — Gets the credentials for a given integration / organization
- [`$saveCredentials`](#$savecredentials) — Saves the credentials for a given integration / organization
- [`$deleteCredentials`](#$deletecredentials) — Delete the credentials for a given integration / organization

**External Catalog API**
- [`$getExternalCatalogProducts`](#$getexternalcatalogproducts) — Returns the list of available external catalog products with computed prices based on a given context
- [`$getExternalCatalogProductRecommendations`](#$getexternalcatalogproductrecommendations) — Returns the list of available external catalog products recommendations based on a given context

**Product Recommendations API**
- [`$productRecommendations`](#$productrecommendations) — Get a list of product recommendations based on the search parameters.

### `$calculatePricingDetails`

Computes a set of pricing details that can be persisted on an entity with the pricing capability enabled, e.g: Orders or

`POST /v1/pricing:compute`

**Request Body**

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $calculatePricingDetails \
  -d '{}'
```

Using stdin pipe:

```bash
cat body.json | epilot pricing $calculatePricingDetails
```

With JSONata filter:

```bash
epilot pricing $calculatePricingDetails --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "items": [
    {
      "amount_subtotal": 10000,
      "amount_total": 10600,
      "currency": "EUR",
      "description": "Annual internet service",
      "price_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
      "product_id": "6241487f-b7fd-428b-ab92-24ee0b37fd84",
      "taxes": [],
      "unit_amount": 10000,
      "unit_amount_net": 10000,
      "pricing_model": "per_unit",
      "_price": {},
      "_product": {}
    },
    {
      "amount_subtotal": 10000,
      "amount_total": 10600,
      "currency": "EUR",
      "description": "Annual internet service",
      "price_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
      "product_id": "6241487f-b7fd-428b-ab92-24ee0b37fd84",
      "taxes": [],
      "unit_amount": 10000,
      "unit_amount_net": 10000,
      "pricing_model": "per_unit",
      "_price": {},
      "_product": {}
    }
  ],
  "amount_subtotal": 0,
  "amount_total": 0,
  "unit_amount_gross": 0,
  "unit_amount_net": 0,
  "amount_tax": 0,
  "total_details": {
    "amount_shipping": 0,
    "amount_tax": 0,
    "breakdown": {
      "taxes": [],
      "recurrences": [],
      "cashbacks": [],
      "recurrencesByTax": []
    }
  },
  "currency": "EUR",
  "redeemed_promos": [
    {
      "code": "string",
      "coupons": []
    }
  ]
}
```

</details>

---

### `createOrder`

Create an order

`POST /v1/order`

**Request Body** (required)

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing createOrder
```

With request body:

```bash
epilot pricing createOrder \
  -d '{
  "status": "draft",
  "line_items": [
    {
      "external_fees_mappings": [],
      "external_fees_metadata": {},
      "external_price_metadata": {},
      "_immutable_pricing_details": {},
      "coupon_ids": ["string"],
      "taxes": [],
      "recurrences": [],
      "_coupons": [],
      "metadata": [],
      "quantity": 0,
      "product_id": "string",
      "price_id": "string",
      "description": "string",
      "product_description": "string",
      "product_name": "string",
      "price_mappings": [],
      "is_tax_inclusive": true,
      "_product": {},
      "type": "one_time",
      "billing_period": "weekly",
      "unit_amount": 0,
      "unit_amount_gross": 0,
      "unit_amount_currency": "EUR",
      "unit_amount_decimal": "string",
      "is_composite_price": false,
      "pricing_model": "per_unit",
      "_price": {}
    },
    {
      "external_fees_mappings": [],
      "external_fees_metadata": {},
      "external_price_metadata": {},
      "_immutable_pricing_details": {},
      "coupon_ids": ["string"],
      "taxes": [],
      "recurrences": [],
      "_coupons": [],
      "metadata": [],
      "quantity": 0,
      "product_id": "string",
      "price_id": "string",
      "description": "string",
      "product_description": "string",
      "product_name": "string",
      "price_mappings": [],
      "is_tax_inclusive": true,
      "_product": {},
      "is_composite_price": true,
      "item_components": [],
      "selected_price_component_ids": ["string"],
      "price_component_coupon_ids": {},
      "_price": {}
    }
  ],
  "source_type": "journey",
  "currency": "EUR",
  "contact": "string",
  "billing_first_name": "string",
  "billing_last_name": "string",
  "billing_company_name": "string",
  "billing_vat": "string",
  "billing_email": "string",
  "billing_phone": "string",
  "billing_address": [
    {
      "_tags": ["billing"],
      "street": "string",
      "street_number": "string",
      "postal_code": "string",
      "city": "string",
      "country": "string",
      "additional_info": "string",
      "company_name": "string",
      "first_name": "string",
      "last_name": "string",
      "salutation": "string",
      "title": "string"
    }
  ],
  "delivery_address": [
    {
      "_tags": ["billing"],
      "street": "string",
      "street_number": "string",
      "postal_code": "string",
      "city": "string",
      "country": "string",
      "additional_info": "string",
      "company_name": "string",
      "first_name": "string",
      "last_name": "string",
      "salutation": "string",
      "title": "string"
    }
  ],
  "payment_method": [
    {
      "type": "string",
      "details": {}
    }
  ],
  "redeemed_promos": [
    {
      "code": "string",
      "coupons": []
    }
  ],
  "_tags": ["string"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot pricing createOrder
```

With JSONata filter:

```bash
epilot pricing createOrder --jsonata 'order_number'
```

<details>
<summary>Sample Response</summary>

```json
{
  "order_number": "OR 2022/742701",
  "status": "quote",
  "source": {
    "title": "manual",
    "href": null
  },
  "source_type": "manual",
  "_schema": "order",
  "_title": "OR 2022/742701",
  "expires_at": "2022-06-30T16:17:00.000Z",
  "line_items": [
    {
      "price_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
      "product_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
      "pricing_model": "per_unit",
      "is_composite_price": false,
      "taxes": [],
      "_price": {},
      "_product": {},
      "quantity": 16,
      "currency": "EUR",
      "description": "Solar Panel Module",
      "unit_amount": 100000,
      "unit_amount_net": 84034,
      "amount_subtotal": 1344538,
      "amount_total": 1600000
    },
    {
      "price_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
      "product_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
      "pricing_model": "per_unit",
      "is_composite_price": false,
      "taxes": [],
      "_price": {},
      "_product": {},
      "quantity": 4,
      "currency": "EUR",
      "description": "Battery Module 500amps",
      "unit_amount": 50000,
      "unit_amount_net": 42017,
      "amount_subtotal": 168067,
      "amount_total": 200000
    }
  ],
  "amount_subtotal": 1532191,
  "amount_total": 1821955,
  "total_details": {
    "amount_tax": 289764,
    "breakdown": {
      "taxes": [],
      "recurrences": []
    }
  },
  "currency": "EUR",
  "payment_method": [
    {
      "type": "IBAN",
      "details": {}
    }
  ],
  "billing_contact": {
    "$relation": [
      {}
    ]
  },
  "billing_first_name": "Joao",
  "billing_last_name": "Pinho",
  "billing_email": "j.pinho@epilot.cloud",
  "billing_company_name": "epilot cloud",
  "billing_address": [
    {
      "_tags": [],
      "street": "Im Media Park",
      "street_number": "8a",
      "postal_code": "52000",
      "city": "Cologne",
      "country": "DE",
      "additional_info": ""
    }
  ],
  "delivery_address": [],
  "dates": [
    {
      "_tags": ["Instalation Date"],
      "dates": "",
      "value": "2022-06-30T16:29:00.000Z"
    }
  ],
  "_id": "4c7c9562-f8f0-4af0-a3a6-6aebc5571a6e",
  "_org": "728",
  "_created_at": "2022-06-03T16:29:46.303Z",
  "_updated_at": "2022-06-03T16:29:46.303Z"
}
```

</details>

---

### `putOrder`

Update an existing Order

`PUT /v1/order/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Order entity ID |

**Request Body** (required)

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing putOrder \
  -p id=9d4602d3-03be-4d85-86b2-f3c6555fc606
```

With request body:

```bash
epilot pricing putOrder \
  -p id=9d4602d3-03be-4d85-86b2-f3c6555fc606 \
  -d '{
  "status": "draft",
  "line_items": [
    {
      "external_fees_mappings": [],
      "external_fees_metadata": {},
      "external_price_metadata": {},
      "_immutable_pricing_details": {},
      "coupon_ids": ["string"],
      "taxes": [],
      "recurrences": [],
      "_coupons": [],
      "metadata": [],
      "quantity": 0,
      "product_id": "string",
      "price_id": "string",
      "description": "string",
      "product_description": "string",
      "product_name": "string",
      "price_mappings": [],
      "is_tax_inclusive": true,
      "_product": {},
      "type": "one_time",
      "billing_period": "weekly",
      "unit_amount": 0,
      "unit_amount_gross": 0,
      "unit_amount_currency": "EUR",
      "unit_amount_decimal": "string",
      "is_composite_price": false,
      "pricing_model": "per_unit",
      "_price": {}
    },
    {
      "external_fees_mappings": [],
      "external_fees_metadata": {},
      "external_price_metadata": {},
      "_immutable_pricing_details": {},
      "coupon_ids": ["string"],
      "taxes": [],
      "recurrences": [],
      "_coupons": [],
      "metadata": [],
      "quantity": 0,
      "product_id": "string",
      "price_id": "string",
      "description": "string",
      "product_description": "string",
      "product_name": "string",
      "price_mappings": [],
      "is_tax_inclusive": true,
      "_product": {},
      "is_composite_price": true,
      "item_components": [],
      "selected_price_component_ids": ["string"],
      "price_component_coupon_ids": {},
      "_price": {}
    }
  ],
  "source_type": "journey",
  "currency": "EUR",
  "contact": "string",
  "billing_first_name": "string",
  "billing_last_name": "string",
  "billing_company_name": "string",
  "billing_vat": "string",
  "billing_email": "string",
  "billing_phone": "string",
  "billing_address": [
    {
      "_tags": ["billing"],
      "street": "string",
      "street_number": "string",
      "postal_code": "string",
      "city": "string",
      "country": "string",
      "additional_info": "string",
      "company_name": "string",
      "first_name": "string",
      "last_name": "string",
      "salutation": "string",
      "title": "string"
    }
  ],
  "delivery_address": [
    {
      "_tags": ["billing"],
      "street": "string",
      "street_number": "string",
      "postal_code": "string",
      "city": "string",
      "country": "string",
      "additional_info": "string",
      "company_name": "string",
      "first_name": "string",
      "last_name": "string",
      "salutation": "string",
      "title": "string"
    }
  ],
  "payment_method": [
    {
      "type": "string",
      "details": {}
    }
  ],
  "redeemed_promos": [
    {
      "code": "string",
      "coupons": []
    }
  ],
  "_tags": ["string"]
}'
```

Using positional args for path parameters:

```bash
epilot pricing putOrder 9d4602d3-03be-4d85-86b2-f3c6555fc606
```

Using stdin pipe:

```bash
cat body.json | epilot pricing putOrder -p id=9d4602d3-03be-4d85-86b2-f3c6555fc606
```

With JSONata filter:

```bash
epilot pricing putOrder -p id=9d4602d3-03be-4d85-86b2-f3c6555fc606 --jsonata 'order_number'
```

<details>
<summary>Sample Response</summary>

```json
{
  "order_number": "OR 2022/742701",
  "status": "quote",
  "source": {
    "title": "manual",
    "href": null
  },
  "source_type": "manual",
  "_schema": "order",
  "_title": "OR 2022/742701",
  "expires_at": "2022-06-30T16:17:00.000Z",
  "line_items": [
    {
      "price_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
      "product_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
      "pricing_model": "per_unit",
      "is_composite_price": false,
      "taxes": [],
      "_price": {},
      "_product": {},
      "quantity": 16,
      "currency": "EUR",
      "description": "Solar Panel Module",
      "unit_amount": 100000,
      "unit_amount_net": 84034,
      "amount_subtotal": 1344538,
      "amount_total": 1600000
    },
    {
      "price_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
      "product_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
      "pricing_model": "per_unit",
      "is_composite_price": false,
      "taxes": [],
      "_price": {},
      "_product": {},
      "quantity": 4,
      "currency": "EUR",
      "description": "Battery Module 500amps",
      "unit_amount": 50000,
      "unit_amount_net": 42017,
      "amount_subtotal": 168067,
      "amount_total": 200000
    }
  ],
  "amount_subtotal": 1532191,
  "amount_total": 1821955,
  "total_details": {
    "amount_tax": 289764,
    "breakdown": {
      "taxes": [],
      "recurrences": []
    }
  },
  "currency": "EUR",
  "payment_method": [
    {
      "type": "IBAN",
      "details": {}
    }
  ],
  "billing_contact": {
    "$relation": [
      {}
    ]
  },
  "billing_first_name": "Joao",
  "billing_last_name": "Pinho",
  "billing_email": "j.pinho@epilot.cloud",
  "billing_company_name": "epilot cloud",
  "billing_address": [
    {
      "_tags": [],
      "street": "Im Media Park",
      "street_number": "8a",
      "postal_code": "52000",
      "city": "Cologne",
      "country": "DE",
      "additional_info": ""
    }
  ],
  "delivery_address": [],
  "dates": [
    {
      "_tags": ["Instalation Date"],
      "dates": "",
      "value": "2022-06-30T16:29:00.000Z"
    }
  ],
  "_id": "4c7c9562-f8f0-4af0-a3a6-6aebc5571a6e",
  "_org": "728",
  "_created_at": "2022-06-03T16:29:46.303Z",
  "_updated_at": "2022-06-03T16:29:46.303Z"
}
```

</details>

---

### `$checkoutCart`

Checkouts a cart and executes the specified checkout `mode` process.

`POST /v1/public/cart:checkout`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `X-Ivy-Org-ID` | header | string | Yes | The target Organization Id represented by the caller |

**Request Body** (required)

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $checkoutCart \
  -p X-Ivy-Org-ID=example
```

With request body:

```bash
epilot pricing $checkoutCart \
  -p X-Ivy-Org-ID=example \
  -d '{
  "cart": "string",
  "redeemed_promos": [
    {
      "code": "string",
      "coupons": [
        {
          "_id": "123e4567-e89b-12d3-a456-426614174000",
          "_schema": "coupon",
          "_org": "org_12345",
          "_created_at": "2024-01-15T10:00:00.000Z",
          "_updated_at": "2024-01-20T12:00:00.000Z",
          "_title": "Sample Coupon",
          "name": "Sample Coupon",
          "type": "fixed",
          "fixed_value": 555,
          "fixed_value_currency": "USD",
          "fixed_value_decimal": "5.55",
          "active": true,
          "category": "cashback",
          "prices": {
            "$relation": [
              {
                "entity_id": "abc12345-def6-7890-gh12-ijklmnopqrst",
                "_tags": ["discount", "special"],
                "_schema": "price"
              }
            ]
          }
        }
      ]
    }
  ],
  "mode": "create_order"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot pricing $checkoutCart -p X-Ivy-Org-ID=example
```

With JSONata filter:

```bash
epilot pricing $checkoutCart -p X-Ivy-Org-ID=example --jsonata 'order'
```

<details>
<summary>Sample Response</summary>

```json
{
  "order": {
    "order_number": "OR 2022/742701",
    "status": "quote",
    "source": {
      "title": "manual",
      "href": null
    },
    "source_type": "manual",
    "_schema": "order",
    "_title": "OR 2022/742701",
    "expires_at": "2022-06-30T16:17:00.000Z",
    "line_items": [
      {},
      {}
    ],
    "amount_subtotal": 1532191,
    "amount_total": 1821955,
    "total_details": {
      "amount_tax": 289764,
      "breakdown": {}
    },
    "currency": "EUR",
    "payment_method": [
      {}
    ],
    "billing_contact": {
      "$relation": []
    },
    "billing_first_name": "Joao",
    "billing_last_name": "Pinho",
    "billing_email": "j.pinho@epilot.cloud",
    "billing_company_name": "epilot cloud",
    "billing_address": [
      {}
    ],
    "delivery_address": [],
    "dates": [
      {}
    ],
    "_id": "4c7c9562-f8f0-4af0-a3a6-6aebc5571a6e",
    "_org": "728",
    "_created_at": "2022-06-03T16:29:46.303Z",
    "_updated_at": "2022-06-03T16:29:46.303Z"
  }
}
```

</details>

---

### `$searchCatalog`

Provides a querying functionalities over products and prices of the Catalog for a given organization.

`POST /v1/public/catalog`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `X-Ivy-Org-ID` | header | string | No | The target Organization Id represented by the caller |
| `Authorization` | header | string | No | The token identifying the client making the request |

**Request Body** (required)

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $searchCatalog \
  -d '{"q":"_id:1233432 OR _id:123432454 OR _id:23445433","sort":"description ASC","from":0,"size":200}'
```

Using stdin pipe:

```bash
cat body.json | epilot pricing $searchCatalog
```

With JSONata filter:

```bash
epilot pricing $searchCatalog --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 2,
  "results": [
    {
      "schema": "product",
      "description": "product a"
    },
    {
      "schema": "price",
      "unit_amount_decimal": "124.342343434"
    }
  ]
}
```

</details>

---

### `$privateSearchCatalog`

Provides a querying functionalities over products and prices of the Catalog for a given organization.

`POST /v1/catalog`

**Request Body** (required)

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $privateSearchCatalog \
  -d '{"q":"_id:1233432 OR _id:123432454 OR _id:23445433","sort":"description ASC","from":0,"size":200}'
```

Using stdin pipe:

```bash
cat body.json | epilot pricing $privateSearchCatalog
```

With JSONata filter:

```bash
epilot pricing $privateSearchCatalog --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 2,
  "results": [
    {
      "schema": "product",
      "description": "product a"
    },
    {
      "schema": "price",
      "unit_amount_decimal": "124.342343434"
    }
  ]
}
```

</details>

---

### `$validatePromoCodes`

Validate a list of promo codes against a list of coupons

`POST /v1/public/validate-promo-codes`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `X-Ivy-Org-ID` | header | string | Yes | The target Organization Id represented by the caller |

**Request Body** (required)

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $validatePromoCodes \
  -p X-Ivy-Org-ID=example \
  -d '{}'
```

Using stdin pipe:

```bash
cat body.json | epilot pricing $validatePromoCodes -p X-Ivy-Org-ID=example
```

With JSONata filter:

```bash
epilot pricing $validatePromoCodes -p X-Ivy-Org-ID=example --jsonata 'matched_coupons'
```

<details>
<summary>Sample Response</summary>

```json
{
  "matched_coupons": [
    {
      "_id": "123e4567-e89b-12d3-a456-426614174000",
      "_schema": "coupon",
      "_org": "org_12345",
      "_created_at": "2024-01-15T10:00:00.000Z",
      "_updated_at": "2024-01-20T12:00:00.000Z",
      "_title": "Sample Coupon",
      "name": "Sample Coupon",
      "type": "fixed",
      "fixed_value": 555,
      "fixed_value_currency": "USD",
      "fixed_value_decimal": "5.55",
      "active": true,
      "category": "cashback",
      "prices": {
        "$relation": [
          {
            "entity_id": "abc12345-def6-7890-gh12-ijklmnopqrst",
            "_tags": ["discount", "special"],
            "_schema": "price"
          }
        ]
      }
    }
  ]
}
```

</details>

---

### `$availabilityCheck`

The availability check endpoint

`POST /v1/public/availability:check`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `X-Ivy-Org-ID` | header | string | Yes | The target Organization Id represented by the caller |

**Request Body** (required)

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $availabilityCheck \
  -p X-Ivy-Org-ID=example
```

With request body:

```bash
epilot pricing $availabilityCheck \
  -p X-Ivy-Org-ID=example \
  -d '{
  "products": ["string"],
  "filters": {
    "location": {
      "street": "string",
      "street_number": "string",
      "postal_code": "string",
      "city": "string",
      "country": "string"
    },
    "available_date": "2017-07-21"
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot pricing $availabilityCheck -p X-Ivy-Org-ID=example
```

With JSONata filter:

```bash
epilot pricing $availabilityCheck -p X-Ivy-Org-ID=example --jsonata 'available_products'
```

<details>
<summary>Sample Response</summary>

```json
{
  "available_products": [],
  "check_results": [
    {
      "product_id": "my-product-id-123-1",
      "matching_hits": 0
    },
    {
      "product_id": "my-product-id-123-2",
      "matching_hits": 0
    }
  ]
}
```

</details>

---

### `$validateAvailabilityFile`

Validates an availability file, it returns an array of errors if the file is invalid

`GET /v1/validate-availability/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Product ID that the Availability File is attached to |
| `X-Epilot-Org-ID` | header | string | Yes | The target Organization Id represented by the caller |

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $validateAvailabilityFile \
  -p id=72c803b2-2e5d-4bd6-bffc-fad998bbbe36 \
  -p X-Epilot-Org-ID=739224
```

Using positional args for path parameters:

```bash
epilot pricing $validateAvailabilityFile 72c803b2-2e5d-4bd6-bffc-fad998bbbe36
```

With JSONata filter:

```bash
epilot pricing $validateAvailabilityFile -p id=72c803b2-2e5d-4bd6-bffc-fad998bbbe36 -p X-Epilot-Org-ID=739224 --jsonata 'status'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status": "success",
  "rules_parsed_count": 10,
  "errors": []
}
```

</details>

---

### `$historicMarketPrices`

Get a series of historic energy prices for a given time period, market and bidding zone.

`GET /v1/public/historicMarketPrices`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `market` | query | "day_ahead" | Yes | Market to use. For now, only day ahead prices are supported. |
| `bidding_zone` | query | "AT" \| "DE-LU" | Yes | Bidding zone to use. For now, only AT and DE-LU are supported. |
| `frequency` | query | "PT15M" \| "PT1H" \| "P1D" \| "P1M" | Yes | Frequency of the price data points in ISO 8601 format. |
| `from` | query | string | Yes | Start of price data in ISO 8601 format.
If only a date is provided (YYYY-MM-DD) the timzone of the bidding zone is used.
 |
| `to` | query | string | Yes | End of price data in ISO 8601 format.
If only a date is provided (YYYY-MM-DD) the timzone of the bidding zone is used.
 |

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $historicMarketPrices \
  -p market=example \
  -p bidding_zone=example \
  -p frequency=example \
  -p from=example \
  -p to=example
```

With JSONata filter:

```bash
epilot pricing $historicMarketPrices -p market=example -p bidding_zone=example -p frequency=example -p from=example -p to=example --jsonata 'market'
```

<details>
<summary>Sample Response</summary>

```json
{
  "market": "day_ahead",
  "bidding_zone": "AT",
  "prices": [
    {
      "unit_amount": 12.3,
      "unit_amount_decimal": "0.123",
      "unit_amount_currency": "EUR",
      "timestamp": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `$averageMarketPrice`

Get the average energy prices for a given time period, market and bidding zone.

`GET /v1/public/averageMarketPrice`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `market` | query | "day_ahead" | Yes | Market to use. For now, only day ahead prices are supported. |
| `bidding_zone` | query | "AT" \| "DE-LU" | Yes | Bidding zone to use. For now, only AT and DE-LU are supported. |
| `from` | query | string | Yes | Start of price data in ISO 8601 format.
If only a date is provided (YYYY-MM-DD) the timzone of the bidding zone is used.
 |
| `to` | query | string | Yes | End of price data in ISO 8601 format.
If only a date is provided (YYYY-MM-DD) the timzone of the bidding zone is used.
 |

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $averageMarketPrice \
  -p market=example \
  -p bidding_zone=example \
  -p from=example \
  -p to=example
```

With JSONata filter:

```bash
epilot pricing $averageMarketPrice -p market=example -p bidding_zone=example -p from=example -p to=example --jsonata 'market'
```

<details>
<summary>Sample Response</summary>

```json
{
  "market": "day_ahead",
  "bidding_zone": "AT",
  "price": {
    "unit_amount": 12.3,
    "unit_amount_decimal": "0.123",
    "unit_amount_currency": "EUR",
    "timestamp": "2025-01-01T00:00:00Z/2025-01-31T23:59:59Z"
  },
  "_meta": {
    "signature": "string",
    "timestamp": 0
  }
}
```

</details>

---

### `$searchExternalProducts`

Returns the list of available products with computed prices based on a given context and for a given org integration.

`POST /v1/public/integration/{integrationId}/products`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | "getag" \| "external-catalog" | Yes | The integration identifier |

**Request Body** (required)

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $searchExternalProducts \
  -p integrationId=external-catalog
```

With request body:

```bash
epilot pricing $searchExternalProducts \
  -p integrationId=external-catalog \
  -d '{
  "context": {
    "journey_id": "8d0a2235-97ce-42d0-88a3-e374634ca44e",
    "entity_id": "8d0a2235-97ce-42d0-88a3-e374634ca44e",
    "journey_name": "journey name",
    "journey_tags": ["string"],
    "journey_url_params": {},
    "current_step_name": "step name",
    "current_block_name": "block name",
    "steps_data": [
      {
        "step_name": "string",
        "step_index": 0,
        "blocks": {
          "Adresse": {
            "countryCode": "DE",
            "city": "Koblenz",
            "zipCode": "56068",
            "streetName": "Am Alten Hospital",
            "houseNumber": "123"
          }
        }
      }
    ]
  }
}'
```

Using positional args for path parameters:

```bash
epilot pricing $searchExternalProducts external-catalog
```

Using stdin pipe:

```bash
cat body.json | epilot pricing $searchExternalProducts -p integrationId=external-catalog
```

With JSONata filter:

```bash
epilot pricing $searchExternalProducts -p integrationId=external-catalog --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 0,
  "results": [
    {
      "pricing_details": {},
      "_meta": {}
    }
  ]
}
```

</details>

---

### `$searchExternalProductRecommendations`

Returns the list of available product recommendations with computed prices based on a given context and for a given org 

`POST /v1/public/integration/{integrationId}/product-recommendations`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | "getag" \| "external-catalog" | Yes | The integration identifier |

**Request Body** (required)

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $searchExternalProductRecommendations \
  -p integrationId=external-catalog
```

With request body:

```bash
epilot pricing $searchExternalProductRecommendations \
  -p integrationId=external-catalog \
  -d '{
  "context": {
    "journey_id": "8d0a2235-97ce-42d0-88a3-e374634ca44e",
    "entity_id": "8d0a2235-97ce-42d0-88a3-e374634ca44e",
    "journey_name": "journey name",
    "journey_tags": ["string"],
    "journey_url_params": {},
    "current_step_name": "step name",
    "current_block_name": "block name",
    "steps_data": [
      {
        "step_name": "string",
        "step_index": 0,
        "blocks": {
          "Adresse": {
            "countryCode": "DE",
            "city": "Koblenz",
            "zipCode": "56068",
            "streetName": "Am Alten Hospital",
            "houseNumber": "123"
          }
        }
      }
    ]
  }
}'
```

Using positional args for path parameters:

```bash
epilot pricing $searchExternalProductRecommendations external-catalog
```

Using stdin pipe:

```bash
cat body.json | epilot pricing $searchExternalProductRecommendations -p integrationId=external-catalog
```

With JSONata filter:

```bash
epilot pricing $searchExternalProductRecommendations -p integrationId=external-catalog --jsonata 'source'
```

<details>
<summary>Sample Response</summary>

```json
{
  "source": {
    "pricing_details": {
      "items": [],
      "amount_subtotal": 0,
      "amount_total": 0,
      "unit_amount_gross": 0,
      "unit_amount_net": 0,
      "amount_tax": 0,
      "total_details": {},
      "currency": "EUR",
      "redeemed_promos": []
    },
    "_meta": {
      "signature": "string",
      "timestamp": 0
    }
  },
  "offers": [
    {
      "pricing_details": {},
      "_meta": {}
    }
  ]
}
```

</details>

---

### `$searchProviders`

Returns the list of providers available based on a given location

`POST /v1/public/integration/{integrationId}/providers:search`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `X-Epilot-Org-ID` | header | string | Yes | The target Organization Id represented by the caller |
| `integrationId` | path | "getag" \| "external-catalog" | Yes | The integration identifier |

**Request Body** (required)

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $searchProviders \
  -p X-Epilot-Org-ID=739224 \
  -p integrationId=getag \
  -d '{"type":"power","postal_code":"string","city":"string","street":"string","street_number":"string"}'
```

Using positional args for path parameters:

```bash
epilot pricing $searchProviders getag
```

Using stdin pipe:

```bash
cat body.json | epilot pricing $searchProviders -p X-Epilot-Org-ID=739224 -p integrationId=getag
```

With JSONata filter:

```bash
epilot pricing $searchProviders -p X-Epilot-Org-ID=739224 -p integrationId=getag --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "name": "string",
    "code": "string"
  }
]
```

</details>

---

### `$searchStreets`

Returns the list of streets available for a given postal code and city

`POST /v1/public/integration/{integrationId}/streets:search`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `X-Epilot-Org-ID` | header | string | Yes | The target Organization Id represented by the caller |
| `integrationId` | path | "getag" \| "external-catalog" | Yes | The integration identifier |

**Request Body** (required)

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $searchStreets \
  -p X-Epilot-Org-ID=739224 \
  -p integrationId=getag \
  -d '{"postal_code":"string","city":"string"}'
```

Using positional args for path parameters:

```bash
epilot pricing $searchStreets getag
```

Using stdin pipe:

```bash
cat body.json | epilot pricing $searchStreets -p X-Epilot-Org-ID=739224 -p integrationId=getag
```

With JSONata filter:

```bash
epilot pricing $searchStreets -p X-Epilot-Org-ID=739224 -p integrationId=getag --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "street": "string"
  }
]
```

</details>

---

### `$computePrice`

Returns the price for a given product type based on location and consumption

`POST /v1/public/integration/{integrationId}/compute-price`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `X-Epilot-Org-ID` | header | string | Yes | The target Organization Id represented by the caller |
| `integrationId` | path | "getag" \| "external-catalog" | Yes | The integration identifier |

**Request Body**

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $computePrice \
  -p X-Epilot-Org-ID=739224 \
  -p integrationId=getag
```

With request body:

```bash
epilot pricing $computePrice \
  -p X-Epilot-Org-ID=739224 \
  -p integrationId=getag \
  -d '{
  "postal_code": "string",
  "consumption_type": "household",
  "consumption": 0,
  "consumption_HT": 0,
  "consumption_NT": 0,
  "association_id": "string",
  "billing_period": "monthly",
  "reference_date": "1970-01-01",
  "type": "power",
  "meter_type": "classic"
}'
```

Using positional args for path parameters:

```bash
epilot pricing $computePrice getag
```

Using stdin pipe:

```bash
cat body.json | epilot pricing $computePrice -p X-Epilot-Org-ID=739224 -p integrationId=getag
```

With JSONata filter:

```bash
epilot pricing $computePrice -p X-Epilot-Org-ID=739224 -p integrationId=getag --jsonata 'amount_total'
```

<details>
<summary>Sample Response</summary>

```json
{
  "amount_total": 0,
  "amount_total_decimal": "string",
  "amount_static": 0,
  "amount_static_decimal": {},
  "amount_variable_ht": 0,
  "amount_variable_decimal_ht": "string",
  "unit_amount_variable_ht": 0,
  "unit_amount_variable_decimal_ht": "string",
  "amount_variable_nt": 0,
  "amount_variable_decimal_nt": "string",
  "unit_amount_variable_nt": 0,
  "unit_amount_variable_decimal_nt": "string",
  "currency": "EUR",
  "billing_period": "weekly",
  "breakdown": {
    "static": {},
    "variable": {},
    "variable_ht": {},
    "variable_nt": {}
  },
  "_meta": {
    "signature": "string",
    "timestamp": 0
  }
}
```

</details>

---

### `$getCredentials`

Gets the credentials for a given integration / organization

`GET /v1/integration/{integrationId}/credentials`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | "getag" \| "external-catalog" | Yes | The integration identifier |

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $getCredentials \
  -p integrationId=getag
```

Using positional args for path parameters:

```bash
epilot pricing $getCredentials getag
```

With JSONata filter:

```bash
epilot pricing $getCredentials -p integrationId=getag --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{}
```

</details>

---

### `$saveCredentials`

Saves the credentials for a given integration / organization

`PUT /v1/integration/{integrationId}/credentials:save`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | "getag" \| "external-catalog" | Yes | The integration identifier |

**Request Body**

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $saveCredentials \
  -p integrationId=getag \
  -d '{}'
```

Using positional args for path parameters:

```bash
epilot pricing $saveCredentials getag
```

Using stdin pipe:

```bash
cat body.json | epilot pricing $saveCredentials -p integrationId=getag
```

With JSONata filter:

```bash
epilot pricing $saveCredentials -p integrationId=getag --jsonata '$'
```

---

### `$deleteCredentials`

Delete the credentials for a given integration / organization

`DELETE /v1/integration/{integrationId}/credentials:delete`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `integrationId` | path | "getag" \| "external-catalog" | Yes | The integration identifier |

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $deleteCredentials \
  -p integrationId=getag
```

Using positional args for path parameters:

```bash
epilot pricing $deleteCredentials getag
```

With JSONata filter:

```bash
epilot pricing $deleteCredentials -p integrationId=getag --jsonata '$'
```

---

### `$getExternalCatalogProducts`

Returns the list of available external catalog products with computed prices based on a given context

`POST /v1/public/external-catalog/products`

**Request Body** (required)

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $getExternalCatalogProducts
```

With request body:

```bash
epilot pricing $getExternalCatalogProducts \
  -d '{
  "config": {
    "appId": "1234567890",
    "componentId": "1234567890",
    "hookId": "1234567890"
  },
  "origin": "journey",
  "context": {
    "journey_id": "8d0a2235-97ce-42d0-88a3-e374634ca44e",
    "entity_id": "9e1b3346-a8df-53e1-99b4-f485745db55f",
    "journey_name": "Product Selection Journey",
    "journey_tags": ["electricity", "residential"],
    "journey_url_params": {
      "utm_source": "google",
      "utm_campaign": "spring2024"
    },
    "current_step_name": "Product Selection",
    "current_block_name": "Energy Products",
    "steps_data": [
      {
        "step_name": "Address Information",
        "step_index": 0,
        "blocks": {
          "Adresse": {
            "countryCode": "DE",
            "city": "Koblenz",
            "zipCode": "56068",
            "streetName": "Am Alten Hospital",
            "houseNumber": "123"
          }
        }
      }
    ]
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot pricing $getExternalCatalogProducts
```

With JSONata filter:

```bash
epilot pricing $getExternalCatalogProducts --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 0,
  "results": [
    {
      "pricing_details": {},
      "_meta": {}
    }
  ]
}
```

</details>

---

### `$getExternalCatalogProductRecommendations`

Returns the list of available external catalog products recommendations based on a given context

`POST /v1/public/external-catalog/product-recommendations`

**Request Body** (required)

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $getExternalCatalogProductRecommendations
```

With request body:

```bash
epilot pricing $getExternalCatalogProductRecommendations \
  -d '{
  "config": {
    "appId": "1234567890",
    "componentId": "1234567890",
    "hookId": "1234567890"
  },
  "origin": "journey",
  "context": {
    "journey_id": "8d0a2235-97ce-42d0-88a3-e374634ca44e",
    "entity_id": "9e1b3346-a8df-53e1-99b4-f485745db55f",
    "journey_name": "Product Selection Journey",
    "journey_tags": ["electricity", "residential"],
    "journey_url_params": {
      "utm_source": "google",
      "utm_campaign": "spring2024"
    },
    "current_step_name": "Product Selection",
    "current_block_name": "Energy Products",
    "steps_data": [
      {
        "step_name": "Address Information",
        "step_index": 0,
        "blocks": {
          "Adresse": {
            "countryCode": "DE",
            "city": "Koblenz",
            "zipCode": "56068",
            "streetName": "Am Alten Hospital",
            "houseNumber": "123"
          }
        }
      }
    ]
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot pricing $getExternalCatalogProductRecommendations
```

With JSONata filter:

```bash
epilot pricing $getExternalCatalogProductRecommendations --jsonata 'source'
```

<details>
<summary>Sample Response</summary>

```json
{
  "source": {
    "pricing_details": {
      "items": [],
      "amount_subtotal": 0,
      "amount_total": 0,
      "unit_amount_gross": 0,
      "unit_amount_net": 0,
      "amount_tax": 0,
      "total_details": {},
      "currency": "EUR",
      "redeemed_promos": []
    },
    "_meta": {
      "signature": "string",
      "timestamp": 0
    }
  },
  "offers": [
    {
      "pricing_details": {},
      "_meta": {}
    }
  ]
}
```

</details>

---

### `$productRecommendations`

Get a list of product recommendations based on the search parameters.

`POST /v1/public/product-recommendations`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `X-Ivy-Org-ID` | header | string | No | The target Organization Id represented by the caller |

**Request Body** (required)

**Flags**

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
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot pricing $productRecommendations
```

With request body:

```bash
epilot pricing $productRecommendations \
  -d '{
  "product_recommendation_ids": ["string"],
  "catalog_item": {
    "product_id": "string",
    "price_id": "string"
  },
  "contract_id": "string",
  "filters": {
    "location": {
      "street": "string",
      "street_number": "string",
      "postal_code": "string",
      "city": "string",
      "country": "string"
    },
    "available_date": "2017-07-21"
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot pricing $productRecommendations
```

With JSONata filter:

```bash
epilot pricing $productRecommendations --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 0,
  "results": [
    {
      "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
      "_title": "Cool box",
      "_org": "728",
      "_schema": "order",
      "_created_at": "2022-06-03T16:04:10.000Z",
      "_updated_at": "2022-06-03T16:04:10.000Z",
      "amount_subtotal": 10000,
      "amount_total": 10600,
      "currency": "EUR",
      "description": "Annual internet service",
      "price_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
      "product_id": "6241487f-b7fd-428b-ab92-24ee0b37fd84",
      "taxes": [
        {
          "amount": 600,
          "tax": {
            "active": true,
            "description": "Without Behaviour",
            "rate": 6,
            "region": "DE",
            "type": "VAT",
            "_created_at": "2022-02-07T14:49:08.831Z",
            "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
            "_org": "739224",
            "_schema": "tax",
            "_title": "Tax Without Behaviour",
            "_updated_at": "2022-02-07T14:49:08.831Z"
          }
        }
      ],
      "unit_amount": 10000,
      "unit_amount_net": 10000,
      "pricing_model": "per_unit",
      "_price": {
        "_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
        "unit_amount": 10000,
        "unit_amount_currency": "EUR",
        "unit_amount_decimal": "100.00",
        "sales_tax": "standard",
        "is_tax_inclusive": false,
        "price_display_in_journeys": "show_price",
        "type": "one_time",
        "billing_period": "weekly",
        "billing_duration_unit": "months",
        "notice_time_unit": "months",
        "termination_time_unit": "months",
        "renewal_duration_unit": "months",
        "_schema": "price",
        "_title": "Solar Panel Module",
        "description": "Solar Panel Module",
        "active": true,
        "tax": {
          "$relation": [
            {
              "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
            }
          ]
        },
        "_org": "728",
        "_created_at": "2022-06-03T16:04:10.369Z",
        "_updated_at": "2022-06-03T16:04:10.369Z",
        "pricing_model": "per_unit"
      },
      "_product": {
        "name": "Cool box",
        "type": "product",
        "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
        "_title": "Cool box"
      }
    }
  ]
}
```

</details>

---
