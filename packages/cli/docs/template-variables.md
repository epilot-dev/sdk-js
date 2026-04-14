# Template Variables API

- **Base URL:** `https://template-variables-api.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/template-variables](https://docs.epilot.io/api/template-variables)

This API provides dynamic template processing and variable management, seamless Handlebars template compilation, custom variable operations, and context-aware content generation across email, document templates and snippets.

## Quick Start

```bash
# List available operations
epilot template-variables

# Call an operation
epilot template-variables getCategories
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

**Templates**
- [`getCategories`](#getcategories) — Get all template variable categories
- [`searchVariables`](#searchvariables) — Search variables
- [`getVariableContext`](#getvariablecontext) — Get full variable context
- [`replaceTemplates`](#replacetemplates) — Replace variables in handlebars templates
- [`replaceTemplatesV2`](#replacetemplatesv2) — Replace variables in handlebars templates with raw value preservation

**Custom Variables**
- [`getCustomVariables`](#getcustomvariables) — Get all custom variables of organization
- [`createCustomVariable`](#createcustomvariable) — Create custom variable
- [`searchCustomVariables`](#searchcustomvariables) — Search custom variables
- [`getCustomVariable`](#getcustomvariable) — Get custom variable
- [`updateCustomVariable`](#updatecustomvariable) — Update custom variable
- [`deleteCustomVariable`](#deletecustomvariable) — Immediately and permanently deletes a custom variable
- [`getBluePrintTableConfig`](#getblueprinttableconfig) — Get default table config

### `getCategories`

Get all template variable categories

`GET /v1/template-variables/categories`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `lang` | query | string | No |  |

**Sample Call**

```bash
epilot template-variables getCategories
```

With JSONata filter:

```bash
epilot template-variables getCategories --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "category": "contact",
    "description": "Contact"
  }
]
```

</details>

---

### `searchVariables`

Search variables

`POST /v1/template-variables:search`

**Request Body**

**Sample Call**

```bash
epilot template-variables searchVariables \
  -d '{"template_type":"email","query":"logo","from":0,"size":25,"lang":"de","entity_schemas":["contact"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot template-variables searchVariables
```

With JSONata filter:

```bash
epilot template-variables searchVariables --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "type": "simple",
    "qrdata": "string",
    "group": "string",
    "insert": "string",
    "description": "string"
  }
]
```

</details>

---

### `getVariableContext`

Get full variable context

`POST /v1/template-variables:context`

**Request Body**

**Sample Call**

```bash
epilot template-variables getVariableContext
```

With request body:

```bash
epilot template-variables getVariableContext \
  -d '{
  "parameters": {
    "template_type": "email",
    "language": "de",
    "main_entity_id": "63753437-c9e2-4e83-82bb-b1c666514561",
    "brand_id": 123451,
    "user_id": "50001",
    "user_org_id": "729224",
    "custom_variables": [
      {
        "variable": "{{craftsmen.invitation_link}}",
        "value": "https://partner.epilot.cloud/activate-account?user_name=htny.pct%2Btet%40gmail.com&confirmation_code=EdXPRW19"
      }
    ],
    "context_data": {},
    "template_name": "string",
    "template_tags": ["string"],
    "template_id": "string",
    "variables_version": "2"
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot template-variables getVariableContext
```

With JSONata filter:

```bash
epilot template-variables getVariableContext --jsonata 'unsubscribe_url'
```

<details>
<summary>Sample Response</summary>

```json
{
  "unsubscribe_url": "https://consent.sls.epilot.io/v1/unsubscribe?token=abc123",
  "main": {
    "_id": "03be777b-3cf8-4bff-bb0c-253fd1128479",
    "_title": "Example Customer",
    "customer_number": 123,
    "first_name": "Example",
    "last_name": "Customer",
    "title": "Prof.",
    "salutation": "Ms. / Mrs.",
    "birthdate": "2018-03-03",
    "email": [
      {},
      {}
    ],
    "phone": [
      {},
      {}
    ],
    "address": [
      {},
      {}
    ],
    "account": [
      {}
    ]
  },
  "contact": {
    "_id": "03be777b-3cf8-4bff-bb0c-253fd1128479",
    "_title": "Example Customer",
    "customer_number": 123,
    "first_name": "Example",
    "last_name": "Customer",
    "title": "Prof.",
    "salutation": "Ms. / Mrs.",
    "birthdate": "2018-03-03",
    "email": [
      {},
      {}
    ],
    "phone": [
      {},
      {}
    ],
    "address": [
      {},
      {}
    ],
    "account": [
      {}
    ]
  },
  "brand": {
    "id": 123453,
    "name": "Brand name",
    "signature": "Signature"
  }
}
```

</details>

---

### `replaceTemplates`

Replace variables in handlebars templates

`POST /v1/template-variables:replace`

**Request Body**

**Sample Call**

```bash
epilot template-variables replaceTemplates
```

With request body:

```bash
epilot template-variables replaceTemplates \
  -d '{
  "inputs": ["Hello, {{contact.first_name}}!\n\n{{{brand.signature}}}\n"],
  "parameters": {
    "template_type": "email",
    "language": "de",
    "main_entity_id": "63753437-c9e2-4e83-82bb-b1c666514561",
    "brand_id": 123451,
    "user_id": "50001",
    "user_org_id": "729224",
    "custom_variables": [
      {
        "variable": "{{craftsmen.invitation_link}}",
        "value": "https://partner.epilot.cloud/activate-account?user_name=htny.pct%2Btet%40gmail.com&confirmation_code=EdXPRW19"
      }
    ],
    "context_data": {},
    "template_name": "string",
    "template_tags": ["string"],
    "template_id": "string",
    "variables_version": "2"
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot template-variables replaceTemplates
```

With JSONata filter:

```bash
epilot template-variables replaceTemplates --jsonata 'outputs'
```

<details>
<summary>Sample Response</summary>

```json
{
  "outputs": ["[Brand Name GmbH] Order confirmation\nHello Customer Name\n\n<span color=\"#ccc\">Brand Name GmbH</span>\n<img src=\"https://logobucket.s3.amazonaws.com/brandlogo.png\" alt=\"Brand Name\"/>\n<a href=\"https://company.com/imprint\">imprint</a>\n"]
}
```

</details>

---

### `replaceTemplatesV2`

Replace variables in handlebars templates with raw value preservation

`POST /v2/template:replace`

**Request Body**

**Sample Call**

```bash
epilot template-variables replaceTemplatesV2
```

With request body:

```bash
epilot template-variables replaceTemplatesV2 \
  -d '{
  "inputs": ["Hello, {{contact.first_name}}!\n"],
  "parameters": {
    "template_type": "email",
    "language": "de",
    "main_entity_id": "63753437-c9e2-4e83-82bb-b1c666514561",
    "brand_id": 123451,
    "user_id": "50001",
    "user_org_id": "729224",
    "custom_variables": [
      {
        "variable": "{{craftsmen.invitation_link}}",
        "value": "https://partner.epilot.cloud/activate-account?user_name=htny.pct%2Btet%40gmail.com&confirmation_code=EdXPRW19"
      }
    ],
    "context_data": {},
    "template_name": "string",
    "template_tags": ["string"],
    "template_id": "string",
    "variables_version": "2"
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot template-variables replaceTemplatesV2
```

With JSONata filter:

```bash
epilot template-variables replaceTemplatesV2 --jsonata 'outputs'
```

<details>
<summary>Sample Response</summary>

```json
{
  "outputs": {
    "Hello {{first_name}}": "Hello John",
    "{{first_name}}": "John",
    "{{product_images[*].public_url}}": ["http://myimage.server.com/img1.png", "http://myimage.server.com/img2.png"]
  }
}
```

</details>

---

### `getCustomVariables`

Get all custom variables of organization

`GET /v1/custom-variables`

**Sample Call**

```bash
epilot template-variables getCustomVariables
```

With JSONata filter:

```bash
epilot template-variables getCustomVariables --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "id": "rbse777b-3cf8-4bff-bb0c-253fd1123250",
    "type": "order_table",
    "name": "My Custom table",
    "key": "my_custom_table",
    "_tags": ["string"],
    "_manifest": ["string"],
    "helper_params": ["param1", "param2"],
    "helper_logic": "return param1 * param2;",
    "config": {
      "header": null,
      "style": {},
      "columns": [],
      "body": {},
      "footer": {}
    },
    "template": "<table style=\"table-layout: fixed;width: 100%;max-width: 1000px;border-collapse: collapse;\">\n  <thead>\n    <tr style=\"height: 48px;border-bottom: 1px solid #D5E1ED;\">\n      {{#each table_config.header.columns as |column|}}\n        {{#if column.enable}}\n          <th style=\"{{makeStyle @root.table_config.header.style}};{{makeStyle column.style}};\">{{column._label}}</th>\n        {{/if}}\n      {{/each}}\n    </tr>\n  </thead>\n  <tbody style=\"vertical-align: baseline  !important;font-weight: 400;font-size: 12px;position: relative;\">\n    <!-- Start rendering products -->\n    {{#each order.products as |product|}}\n      {{#if @last}}\n        <tr style=\"height: 48px;;font-size:14px;border-bottom: 1px solid #D5E1ED;\">\n      {{else}}\n        <tr style=\"height: 48px;;font-size:14px;\">\n      {{/if}}\n        {{#each @root.table_config.header.columns as |column|}}\n          {{#if column.enable}}\n            {{#if (eq column.id 'item')}}\n              <!-- Item -->\n              <td style=\"{{makeStyle @root.table_config.body.product_name.style}}\">\n                {{#if @root.table_config.body.product_name.enable}}\n                  {{product.name}}\n                {{/if}}\n                {{#if @root.table_config.body.price_description.enable}}\n                  <br>\n                  <span style=\"{{makeStyle @root.table_config.body.price_description.style}}\">{{product.price.description}}</span>\n                {{/if}}\n                {{#if @root.table_config.body.product_description.enable}}\n                  <br>\n                  <span style=\"{{makeStyle @root.table_config.body.product_description.style}}\">{{product.description}}</span>\n                {{/if}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'quantity')}}\n              <!-- Quantity -->\n              <td style=\"{{makeStyle @root.table_config.body.quantity.style}}\">{{product.price.quantity}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'tax')}}\n              <!-- Tax -->\n              <td style=\"{{makeStyle @root.table_config.body.tax.style}}\">\n                {{product.price.tax_rate}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'unit_amount')}}\n              <!-- Unit amount -->\n              <td style=\"{{makeStyle @root.table_config.body.unit_amount.style}}\">\n                {{product.price.unit_amount_net}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'net_total')}}\n              <!-- Amount Subtotal -->\n              <td style=\"{{makeStyle @root.table_config.body.net_total.style}}\">\n                {{product.price.amount_subtotal}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'amount_tax')}}\n              <!-- Tax amount-->\n              <td style=\"{{makeStyle @root.table_config.body.amount_tax.style}}\">\n                {{product.price.amount_tax}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'gross_total')}}\n              <!-- Gross total -->\n              <td style=\"{{makeStyle @root.table_config.body.gross_total.style}}\">\n                {{product.price.amount_total}}\n                {{#if @root.table_config.body.payment_type.enable}}\n                  {{#if (eq product.price.type 'recurring')}}\n                    <br>\n                    <span style=\"{{makeStyle @root.table_config.body.payment_type.style}}\">{{product.price.billing_period}}</span>\n                  {{/if}}\n                {{/if}}\n              </td>\n            {{/if}}\n          {{/if}}\n        {{/each}}\n        </tr>\n    {{/each}}\n    <!-- Finish rendering products -->\n    {{#if table_config.footer.gross_total.enable}}\n      {{#each order.total_details.recurrences as |item|}}\n        <tr style=\"height: 48px;font-size: 14px;\">\n          <td style=\"padding-top: 16px; padding-bottom: 8px; border: none !important; vertical-align: top;\" colspan=\"{{calculate_colspan @root.table_config}}\"></td>\n          {{#if @root.table_config.footer.payment_type.enable}}\n            <td style=\"{{makeStyle @root.table_config.footer.payment_type.style}}\" colspan=\"2\">{{item.billing_period}}</td>\n          {{/if}}\n          {{#if (isColumnEnabled @root.table_config 'net_total')}}\n            {{#if @root.table_config.footer.net_total.enable}}\n              <td style=\"{{makeStyle @root.table_config.footer.net_total.style}}\">{{item.amount_subtotal}}</td>\n            {{/if}}\n          {{/if}}\n          <td style=\"{{makeStyle @root.table_config.footer.gross_total.style}}\">{{item.amount_total}}\n            {{#if @root.table_config.footer.amount_tax.enable}}\n              <br>\n              <span style=\"{{makeStyle @root.table_config.footer.amount_tax.style}}\">{{item.full_amount_tax}}</span>\n            {{/if}}\n          </td>\n        </tr>\n      {{/each}}\n    {{/if}}\n    <tr style=\"height:16px !important;\"></tr>\n  </tbody>\n</table>\n",
    "created_at": "2022-04-19T12:41:43.662Z",
    "created_by": "100042",
    "updated_at": "2022-04-20T12:41:43.662Z",
    "updated_by": "100042"
  }
]
```

</details>

---

### `createCustomVariable`

Create custom variable

`POST /v1/custom-variables`

**Request Body**

**Sample Call**

```bash
epilot template-variables createCustomVariable
```

With request body:

```bash
epilot template-variables createCustomVariable \
  -d '{
  "id": "rbse777b-3cf8-4bff-bb0c-253fd1123250",
  "type": "order_table",
  "name": "My Custom table",
  "key": "my_custom_table",
  "_tags": ["string"],
  "_manifest": ["string"],
  "helper_params": ["param1", "param2"],
  "helper_logic": "return param1 * param2;",
  "config": {
    "header": null,
    "style": {
      "color": "#222",
      "background": "#fff",
      "font-size": "16px",
      "font-family": "",
      "padding-bottom": "4px",
      "font-weight": "bold",
      "border": "none !important",
      "text-align": "left"
    },
    "columns": [
      {},
      {}
    ],
    "body": {
      "product_name": {},
      "price_description": {},
      "product_description": {},
      "quantity": {},
      "tax": {},
      "unit_amount": {},
      "net_total": {},
      "gross_total": {}
    },
    "footer": {
      "payment_type": {},
      "net_total": {},
      "amount_tax": {},
      "gross_total": {}
    }
  },
  "template": "<table style=\"table-layout: fixed;width: 100%;max-width: 1000px;border-collapse: collapse;\">\n  <thead>\n    <tr style=\"height: 48px;border-bottom: 1px solid #D5E1ED;\">\n      {{#each table_config.header.columns as |column|}}\n        {{#if column.enable}}\n          <th style=\"{{makeStyle @root.table_config.header.style}};{{makeStyle column.style}};\">{{column._label}}</th>\n        {{/if}}\n      {{/each}}\n    </tr>\n  </thead>\n  <tbody style=\"vertical-align: baseline  !important;font-weight: 400;font-size: 12px;position: relative;\">\n    <!-- Start rendering products -->\n    {{#each order.products as |product|}}\n      {{#if @last}}\n        <tr style=\"height: 48px;;font-size:14px;border-bottom: 1px solid #D5E1ED;\">\n      {{else}}\n        <tr style=\"height: 48px;;font-size:14px;\">\n      {{/if}}\n        {{#each @root.table_config.header.columns as |column|}}\n          {{#if column.enable}}\n            {{#if (eq column.id 'item')}}\n              <!-- Item -->\n              <td style=\"{{makeStyle @root.table_config.body.product_name.style}}\">\n                {{#if @root.table_config.body.product_name.enable}}\n                  {{product.name}}\n                {{/if}}\n                {{#if @root.table_config.body.price_description.enable}}\n                  <br>\n                  <span style=\"{{makeStyle @root.table_config.body.price_description.style}}\">{{product.price.description}}</span>\n                {{/if}}\n                {{#if @root.table_config.body.product_description.enable}}\n                  <br>\n                  <span style=\"{{makeStyle @root.table_config.body.product_description.style}}\">{{product.description}}</span>\n                {{/if}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'quantity')}}\n              <!-- Quantity -->\n              <td style=\"{{makeStyle @root.table_config.body.quantity.style}}\">{{product.price.quantity}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'tax')}}\n              <!-- Tax -->\n              <td style=\"{{makeStyle @root.table_config.body.tax.style}}\">\n                {{product.price.tax_rate}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'unit_amount')}}\n              <!-- Unit amount -->\n              <td style=\"{{makeStyle @root.table_config.body.unit_amount.style}}\">\n                {{product.price.unit_amount_net}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'net_total')}}\n              <!-- Amount Subtotal -->\n              <td style=\"{{makeStyle @root.table_config.body.net_total.style}}\">\n                {{product.price.amount_subtotal}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'amount_tax')}}\n              <!-- Tax amount-->\n              <td style=\"{{makeStyle @root.table_config.body.amount_tax.style}}\">\n                {{product.price.amount_tax}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'gross_total')}}\n              <!-- Gross total -->\n              <td style=\"{{makeStyle @root.table_config.body.gross_total.style}}\">\n                {{product.price.amount_total}}\n                {{#if @root.table_config.body.payment_type.enable}}\n                  {{#if (eq product.price.type 'recurring')}}\n                    <br>\n                    <span style=\"{{makeStyle @root.table_config.body.payment_type.style}}\">{{product.price.billing_period}}</span>\n                  {{/if}}\n                {{/if}}\n              </td>\n            {{/if}}\n          {{/if}}\n        {{/each}}\n        </tr>\n    {{/each}}\n    <!-- Finish rendering products -->\n    {{#if table_config.footer.gross_total.enable}}\n      {{#each order.total_details.recurrences as |item|}}\n        <tr style=\"height: 48px;font-size: 14px;\">\n          <td style=\"padding-top: 16px; padding-bottom: 8px; border: none !important; vertical-align: top;\" colspan=\"{{calculate_colspan @root.table_config}}\"></td>\n          {{#if @root.table_config.footer.payment_type.enable}}\n            <td style=\"{{makeStyle @root.table_config.footer.payment_type.style}}\" colspan=\"2\">{{item.billing_period}}</td>\n          {{/if}}\n          {{#if (isColumnEnabled @root.table_config 'net_total')}}\n            {{#if @root.table_config.footer.net_total.enable}}\n              <td style=\"{{makeStyle @root.table_config.footer.net_total.style}}\">{{item.amount_subtotal}}</td>\n            {{/if}}\n          {{/if}}\n          <td style=\"{{makeStyle @root.table_config.footer.gross_total.style}}\">{{item.amount_total}}\n            {{#if @root.table_config.footer.amount_tax.enable}}\n              <br>\n              <span style=\"{{makeStyle @root.table_config.footer.amount_tax.style}}\">{{item.full_amount_tax}}</span>\n            {{/if}}\n          </td>\n        </tr>\n      {{/each}}\n    {{/if}}\n    <tr style=\"height:16px !important;\"></tr>\n  </tbody>\n</table>\n",
  "created_at": "2022-04-19T12:41:43.662Z",
  "created_by": "100042",
  "updated_at": "2022-04-20T12:41:43.662Z",
  "updated_by": "100042"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot template-variables createCustomVariable
```

With JSONata filter:

```bash
epilot template-variables createCustomVariable --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "rbse777b-3cf8-4bff-bb0c-253fd1123250",
  "type": "order_table",
  "name": "My Custom table",
  "key": "my_custom_table",
  "_tags": ["string"],
  "_manifest": ["string"],
  "helper_params": ["param1", "param2"],
  "helper_logic": "return param1 * param2;",
  "config": {
    "header": null,
    "style": {
      "color": "#222",
      "background": "#fff",
      "font-size": "16px",
      "font-family": "",
      "padding-bottom": "4px",
      "font-weight": "bold",
      "border": "none !important",
      "text-align": "left"
    },
    "columns": [
      {},
      {}
    ],
    "body": {
      "product_name": {},
      "price_description": {},
      "product_description": {},
      "quantity": {},
      "tax": {},
      "unit_amount": {},
      "net_total": {},
      "gross_total": {}
    },
    "footer": {
      "payment_type": {},
      "net_total": {},
      "amount_tax": {},
      "gross_total": {}
    }
  },
  "template": "<table style=\"table-layout: fixed;width: 100%;max-width: 1000px;border-collapse: collapse;\">\n  <thead>\n    <tr style=\"height: 48px;border-bottom: 1px solid #D5E1ED;\">\n      {{#each table_config.header.columns as |column|}}\n        {{#if column.enable}}\n          <th style=\"{{makeStyle @root.table_config.header.style}};{{makeStyle column.style}};\">{{column._label}}</th>\n        {{/if}}\n      {{/each}}\n    </tr>\n  </thead>\n  <tbody style=\"vertical-align: baseline  !important;font-weight: 400;font-size: 12px;position: relative;\">\n    <!-- Start rendering products -->\n    {{#each order.products as |product|}}\n      {{#if @last}}\n        <tr style=\"height: 48px;;font-size:14px;border-bottom: 1px solid #D5E1ED;\">\n      {{else}}\n        <tr style=\"height: 48px;;font-size:14px;\">\n      {{/if}}\n        {{#each @root.table_config.header.columns as |column|}}\n          {{#if column.enable}}\n            {{#if (eq column.id 'item')}}\n              <!-- Item -->\n              <td style=\"{{makeStyle @root.table_config.body.product_name.style}}\">\n                {{#if @root.table_config.body.product_name.enable}}\n                  {{product.name}}\n                {{/if}}\n                {{#if @root.table_config.body.price_description.enable}}\n                  <br>\n                  <span style=\"{{makeStyle @root.table_config.body.price_description.style}}\">{{product.price.description}}</span>\n                {{/if}}\n                {{#if @root.table_config.body.product_description.enable}}\n                  <br>\n                  <span style=\"{{makeStyle @root.table_config.body.product_description.style}}\">{{product.description}}</span>\n                {{/if}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'quantity')}}\n              <!-- Quantity -->\n              <td style=\"{{makeStyle @root.table_config.body.quantity.style}}\">{{product.price.quantity}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'tax')}}\n              <!-- Tax -->\n              <td style=\"{{makeStyle @root.table_config.body.tax.style}}\">\n                {{product.price.tax_rate}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'unit_amount')}}\n              <!-- Unit amount -->\n              <td style=\"{{makeStyle @root.table_config.body.unit_amount.style}}\">\n                {{product.price.unit_amount_net}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'net_total')}}\n              <!-- Amount Subtotal -->\n              <td style=\"{{makeStyle @root.table_config.body.net_total.style}}\">\n                {{product.price.amount_subtotal}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'amount_tax')}}\n              <!-- Tax amount-->\n              <td style=\"{{makeStyle @root.table_config.body.amount_tax.style}}\">\n                {{product.price.amount_tax}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'gross_total')}}\n              <!-- Gross total -->\n              <td style=\"{{makeStyle @root.table_config.body.gross_total.style}}\">\n                {{product.price.amount_total}}\n                {{#if @root.table_config.body.payment_type.enable}}\n                  {{#if (eq product.price.type 'recurring')}}\n                    <br>\n                    <span style=\"{{makeStyle @root.table_config.body.payment_type.style}}\">{{product.price.billing_period}}</span>\n                  {{/if}}\n                {{/if}}\n              </td>\n            {{/if}}\n          {{/if}}\n        {{/each}}\n        </tr>\n    {{/each}}\n    <!-- Finish rendering products -->\n    {{#if table_config.footer.gross_total.enable}}\n      {{#each order.total_details.recurrences as |item|}}\n        <tr style=\"height: 48px;font-size: 14px;\">\n          <td style=\"padding-top: 16px; padding-bottom: 8px; border: none !important; vertical-align: top;\" colspan=\"{{calculate_colspan @root.table_config}}\"></td>\n          {{#if @root.table_config.footer.payment_type.enable}}\n            <td style=\"{{makeStyle @root.table_config.footer.payment_type.style}}\" colspan=\"2\">{{item.billing_period}}</td>\n          {{/if}}\n          {{#if (isColumnEnabled @root.table_config 'net_total')}}\n            {{#if @root.table_config.footer.net_total.enable}}\n              <td style=\"{{makeStyle @root.table_config.footer.net_total.style}}\">{{item.amount_subtotal}}</td>\n            {{/if}}\n          {{/if}}\n          <td style=\"{{makeStyle @root.table_config.footer.gross_total.style}}\">{{item.amount_total}}\n            {{#if @root.table_config.footer.amount_tax.enable}}\n              <br>\n              <span style=\"{{makeStyle @root.table_config.footer.amount_tax.style}}\">{{item.full_amount_tax}}</span>\n            {{/if}}\n          </td>\n        </tr>\n      {{/each}}\n    {{/if}}\n    <tr style=\"height:16px !important;\"></tr>\n  </tbody>\n</table>\n",
  "created_at": "2022-04-19T12:41:43.662Z",
  "created_by": "100042",
  "updated_at": "2022-04-20T12:41:43.662Z",
  "updated_by": "100042"
}
```

</details>

---

### `searchCustomVariables`

Search custom variables

`POST /v1/custom-variables:search`

**Request Body**

**Sample Call**

```bash
epilot template-variables searchCustomVariables
```

With request body:

```bash
epilot template-variables searchCustomVariables \
  -d '{
  "type": "order_table",
  "tags": ["string"],
  "query": "logo",
  "from": 0,
  "size": 25,
  "sort_by": "created_at, name, key",
  "fields": ["string"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot template-variables searchCustomVariables
```

With JSONata filter:

```bash
epilot template-variables searchCustomVariables --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "rbse777b-3cf8-4bff-bb0c-253fd1123250",
      "type": "order_table",
      "name": "My Custom table",
      "key": "my_custom_table",
      "_tags": ["string"],
      "_manifest": ["string"],
      "helper_params": ["param1", "param2"],
      "helper_logic": "return param1 * param2;",
      "config": {},
      "template": "<table style=\"table-layout: fixed;width: 100%;max-width: 1000px;border-collapse: collapse;\">\n  <thead>\n    <tr style=\"height: 48px;border-bottom: 1px solid #D5E1ED;\">\n      {{#each table_config.header.columns as |column|}}\n        {{#if column.enable}}\n          <th style=\"{{makeStyle @root.table_config.header.style}};{{makeStyle column.style}};\">{{column._label}}</th>\n        {{/if}}\n      {{/each}}\n    </tr>\n  </thead>\n  <tbody style=\"vertical-align: baseline  !important;font-weight: 400;font-size: 12px;position: relative;\">\n    <!-- Start rendering products -->\n    {{#each order.products as |product|}}\n      {{#if @last}}\n        <tr style=\"height: 48px;;font-size:14px;border-bottom: 1px solid #D5E1ED;\">\n      {{else}}\n        <tr style=\"height: 48px;;font-size:14px;\">\n      {{/if}}\n        {{#each @root.table_config.header.columns as |column|}}\n          {{#if column.enable}}\n            {{#if (eq column.id 'item')}}\n              <!-- Item -->\n              <td style=\"{{makeStyle @root.table_config.body.product_name.style}}\">\n                {{#if @root.table_config.body.product_name.enable}}\n                  {{product.name}}\n                {{/if}}\n                {{#if @root.table_config.body.price_description.enable}}\n                  <br>\n                  <span style=\"{{makeStyle @root.table_config.body.price_description.style}}\">{{product.price.description}}</span>\n                {{/if}}\n                {{#if @root.table_config.body.product_description.enable}}\n                  <br>\n                  <span style=\"{{makeStyle @root.table_config.body.product_description.style}}\">{{product.description}}</span>\n                {{/if}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'quantity')}}\n              <!-- Quantity -->\n              <td style=\"{{makeStyle @root.table_config.body.quantity.style}}\">{{product.price.quantity}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'tax')}}\n              <!-- Tax -->\n              <td style=\"{{makeStyle @root.table_config.body.tax.style}}\">\n                {{product.price.tax_rate}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'unit_amount')}}\n              <!-- Unit amount -->\n              <td style=\"{{makeStyle @root.table_config.body.unit_amount.style}}\">\n                {{product.price.unit_amount_net}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'net_total')}}\n              <!-- Amount Subtotal -->\n              <td style=\"{{makeStyle @root.table_config.body.net_total.style}}\">\n                {{product.price.amount_subtotal}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'amount_tax')}}\n              <!-- Tax amount-->\n              <td style=\"{{makeStyle @root.table_config.body.amount_tax.style}}\">\n                {{product.price.amount_tax}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'gross_total')}}\n              <!-- Gross total -->\n              <td style=\"{{makeStyle @root.table_config.body.gross_total.style}}\">\n                {{product.price.amount_total}}\n                {{#if @root.table_config.body.payment_type.enable}}\n                  {{#if (eq product.price.type 'recurring')}}\n                    <br>\n                    <span style=\"{{makeStyle @root.table_config.body.payment_type.style}}\">{{product.price.billing_period}}</span>\n                  {{/if}}\n                {{/if}}\n              </td>\n            {{/if}}\n          {{/if}}\n        {{/each}}\n        </tr>\n    {{/each}}\n    <!-- Finish rendering products -->\n    {{#if table_config.footer.gross_total.enable}}\n      {{#each order.total_details.recurrences as |item|}}\n        <tr style=\"height: 48px;font-size: 14px;\">\n          <td style=\"padding-top: 16px; padding-bottom: 8px; border: none !important; vertical-align: top;\" colspan=\"{{calculate_colspan @root.table_config}}\"></td>\n          {{#if @root.table_config.footer.payment_type.enable}}\n            <td style=\"{{makeStyle @root.table_config.footer.payment_type.style}}\" colspan=\"2\">{{item.billing_period}}</td>\n          {{/if}}\n          {{#if (isColumnEnabled @root.table_config 'net_total')}}\n            {{#if @root.table_config.footer.net_total.enable}}\n              <td style=\"{{makeStyle @root.table_config.footer.net_total.style}}\">{{item.amount_subtotal}}</td>\n            {{/if}}\n          {{/if}}\n          <td style=\"{{makeStyle @root.table_config.footer.gross_total.style}}\">{{item.amount_total}}\n            {{#if @root.table_config.footer.amount_tax.enable}}\n              <br>\n              <span style=\"{{makeStyle @root.table_config.footer.amount_tax.style}}\">{{item.full_amount_tax}}</span>\n            {{/if}}\n          </td>\n        </tr>\n      {{/each}}\n    {{/if}}\n    <tr style=\"height:16px !important;\"></tr>\n  </tbody>\n</table>\n",
      "created_at": "2022-04-19T12:41:43.662Z",
      "created_by": "100042",
      "updated_at": "2022-04-20T12:41:43.662Z",
      "updated_by": "100042"
    }
  ],
  "hits": 100
}
```

</details>

---

### `getCustomVariable`

Get custom variable

`GET /v1/custom-variables/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Custom vairable ID |

**Sample Call**

```bash
epilot template-variables getCustomVariable \
  -p id=rbse777b-3cf8-4bff-bb0c-253fd1123250
```

Using positional args for path parameters:

```bash
epilot template-variables getCustomVariable rbse777b-3cf8-4bff-bb0c-253fd1123250
```

With JSONata filter:

```bash
epilot template-variables getCustomVariable -p id=rbse777b-3cf8-4bff-bb0c-253fd1123250 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "rbse777b-3cf8-4bff-bb0c-253fd1123250",
  "type": "order_table",
  "name": "My Custom table",
  "key": "my_custom_table",
  "_tags": ["string"],
  "_manifest": ["string"],
  "helper_params": ["param1", "param2"],
  "helper_logic": "return param1 * param2;",
  "config": {
    "header": null,
    "style": {
      "color": "#222",
      "background": "#fff",
      "font-size": "16px",
      "font-family": "",
      "padding-bottom": "4px",
      "font-weight": "bold",
      "border": "none !important",
      "text-align": "left"
    },
    "columns": [
      {},
      {}
    ],
    "body": {
      "product_name": {},
      "price_description": {},
      "product_description": {},
      "quantity": {},
      "tax": {},
      "unit_amount": {},
      "net_total": {},
      "gross_total": {}
    },
    "footer": {
      "payment_type": {},
      "net_total": {},
      "amount_tax": {},
      "gross_total": {}
    }
  },
  "template": "<table style=\"table-layout: fixed;width: 100%;max-width: 1000px;border-collapse: collapse;\">\n  <thead>\n    <tr style=\"height: 48px;border-bottom: 1px solid #D5E1ED;\">\n      {{#each table_config.header.columns as |column|}}\n        {{#if column.enable}}\n          <th style=\"{{makeStyle @root.table_config.header.style}};{{makeStyle column.style}};\">{{column._label}}</th>\n        {{/if}}\n      {{/each}}\n    </tr>\n  </thead>\n  <tbody style=\"vertical-align: baseline  !important;font-weight: 400;font-size: 12px;position: relative;\">\n    <!-- Start rendering products -->\n    {{#each order.products as |product|}}\n      {{#if @last}}\n        <tr style=\"height: 48px;;font-size:14px;border-bottom: 1px solid #D5E1ED;\">\n      {{else}}\n        <tr style=\"height: 48px;;font-size:14px;\">\n      {{/if}}\n        {{#each @root.table_config.header.columns as |column|}}\n          {{#if column.enable}}\n            {{#if (eq column.id 'item')}}\n              <!-- Item -->\n              <td style=\"{{makeStyle @root.table_config.body.product_name.style}}\">\n                {{#if @root.table_config.body.product_name.enable}}\n                  {{product.name}}\n                {{/if}}\n                {{#if @root.table_config.body.price_description.enable}}\n                  <br>\n                  <span style=\"{{makeStyle @root.table_config.body.price_description.style}}\">{{product.price.description}}</span>\n                {{/if}}\n                {{#if @root.table_config.body.product_description.enable}}\n                  <br>\n                  <span style=\"{{makeStyle @root.table_config.body.product_description.style}}\">{{product.description}}</span>\n                {{/if}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'quantity')}}\n              <!-- Quantity -->\n              <td style=\"{{makeStyle @root.table_config.body.quantity.style}}\">{{product.price.quantity}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'tax')}}\n              <!-- Tax -->\n              <td style=\"{{makeStyle @root.table_config.body.tax.style}}\">\n                {{product.price.tax_rate}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'unit_amount')}}\n              <!-- Unit amount -->\n              <td style=\"{{makeStyle @root.table_config.body.unit_amount.style}}\">\n                {{product.price.unit_amount_net}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'net_total')}}\n              <!-- Amount Subtotal -->\n              <td style=\"{{makeStyle @root.table_config.body.net_total.style}}\">\n                {{product.price.amount_subtotal}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'amount_tax')}}\n              <!-- Tax amount-->\n              <td style=\"{{makeStyle @root.table_config.body.amount_tax.style}}\">\n                {{product.price.amount_tax}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'gross_total')}}\n              <!-- Gross total -->\n              <td style=\"{{makeStyle @root.table_config.body.gross_total.style}}\">\n                {{product.price.amount_total}}\n                {{#if @root.table_config.body.payment_type.enable}}\n                  {{#if (eq product.price.type 'recurring')}}\n                    <br>\n                    <span style=\"{{makeStyle @root.table_config.body.payment_type.style}}\">{{product.price.billing_period}}</span>\n                  {{/if}}\n                {{/if}}\n              </td>\n            {{/if}}\n          {{/if}}\n        {{/each}}\n        </tr>\n    {{/each}}\n    <!-- Finish rendering products -->\n    {{#if table_config.footer.gross_total.enable}}\n      {{#each order.total_details.recurrences as |item|}}\n        <tr style=\"height: 48px;font-size: 14px;\">\n          <td style=\"padding-top: 16px; padding-bottom: 8px; border: none !important; vertical-align: top;\" colspan=\"{{calculate_colspan @root.table_config}}\"></td>\n          {{#if @root.table_config.footer.payment_type.enable}}\n            <td style=\"{{makeStyle @root.table_config.footer.payment_type.style}}\" colspan=\"2\">{{item.billing_period}}</td>\n          {{/if}}\n          {{#if (isColumnEnabled @root.table_config 'net_total')}}\n            {{#if @root.table_config.footer.net_total.enable}}\n              <td style=\"{{makeStyle @root.table_config.footer.net_total.style}}\">{{item.amount_subtotal}}</td>\n            {{/if}}\n          {{/if}}\n          <td style=\"{{makeStyle @root.table_config.footer.gross_total.style}}\">{{item.amount_total}}\n            {{#if @root.table_config.footer.amount_tax.enable}}\n              <br>\n              <span style=\"{{makeStyle @root.table_config.footer.amount_tax.style}}\">{{item.full_amount_tax}}</span>\n            {{/if}}\n          </td>\n        </tr>\n      {{/each}}\n    {{/if}}\n    <tr style=\"height:16px !important;\"></tr>\n  </tbody>\n</table>\n",
  "created_at": "2022-04-19T12:41:43.662Z",
  "created_by": "100042",
  "updated_at": "2022-04-20T12:41:43.662Z",
  "updated_by": "100042"
}
```

</details>

---

### `updateCustomVariable`

Update custom variable

`PUT /v1/custom-variables/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Custom variable ID |

**Request Body**

**Sample Call**

```bash
epilot template-variables updateCustomVariable \
  -p id=rbse777b-3cf8-4bff-bb0c-253fd1123250
```

With request body:

```bash
epilot template-variables updateCustomVariable \
  -p id=rbse777b-3cf8-4bff-bb0c-253fd1123250 \
  -d '{
  "id": "rbse777b-3cf8-4bff-bb0c-253fd1123250",
  "type": "order_table",
  "name": "My Custom table",
  "key": "my_custom_table",
  "_tags": ["string"],
  "_manifest": ["string"],
  "helper_params": ["param1", "param2"],
  "helper_logic": "return param1 * param2;",
  "config": {
    "header": null,
    "style": {
      "color": "#222",
      "background": "#fff",
      "font-size": "16px",
      "font-family": "",
      "padding-bottom": "4px",
      "font-weight": "bold",
      "border": "none !important",
      "text-align": "left"
    },
    "columns": [
      {},
      {}
    ],
    "body": {
      "product_name": {},
      "price_description": {},
      "product_description": {},
      "quantity": {},
      "tax": {},
      "unit_amount": {},
      "net_total": {},
      "gross_total": {}
    },
    "footer": {
      "payment_type": {},
      "net_total": {},
      "amount_tax": {},
      "gross_total": {}
    }
  },
  "template": "<table style=\"table-layout: fixed;width: 100%;max-width: 1000px;border-collapse: collapse;\">\n  <thead>\n    <tr style=\"height: 48px;border-bottom: 1px solid #D5E1ED;\">\n      {{#each table_config.header.columns as |column|}}\n        {{#if column.enable}}\n          <th style=\"{{makeStyle @root.table_config.header.style}};{{makeStyle column.style}};\">{{column._label}}</th>\n        {{/if}}\n      {{/each}}\n    </tr>\n  </thead>\n  <tbody style=\"vertical-align: baseline  !important;font-weight: 400;font-size: 12px;position: relative;\">\n    <!-- Start rendering products -->\n    {{#each order.products as |product|}}\n      {{#if @last}}\n        <tr style=\"height: 48px;;font-size:14px;border-bottom: 1px solid #D5E1ED;\">\n      {{else}}\n        <tr style=\"height: 48px;;font-size:14px;\">\n      {{/if}}\n        {{#each @root.table_config.header.columns as |column|}}\n          {{#if column.enable}}\n            {{#if (eq column.id 'item')}}\n              <!-- Item -->\n              <td style=\"{{makeStyle @root.table_config.body.product_name.style}}\">\n                {{#if @root.table_config.body.product_name.enable}}\n                  {{product.name}}\n                {{/if}}\n                {{#if @root.table_config.body.price_description.enable}}\n                  <br>\n                  <span style=\"{{makeStyle @root.table_config.body.price_description.style}}\">{{product.price.description}}</span>\n                {{/if}}\n                {{#if @root.table_config.body.product_description.enable}}\n                  <br>\n                  <span style=\"{{makeStyle @root.table_config.body.product_description.style}}\">{{product.description}}</span>\n                {{/if}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'quantity')}}\n              <!-- Quantity -->\n              <td style=\"{{makeStyle @root.table_config.body.quantity.style}}\">{{product.price.quantity}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'tax')}}\n              <!-- Tax -->\n              <td style=\"{{makeStyle @root.table_config.body.tax.style}}\">\n                {{product.price.tax_rate}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'unit_amount')}}\n              <!-- Unit amount -->\n              <td style=\"{{makeStyle @root.table_config.body.unit_amount.style}}\">\n                {{product.price.unit_amount_net}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'net_total')}}\n              <!-- Amount Subtotal -->\n              <td style=\"{{makeStyle @root.table_config.body.net_total.style}}\">\n                {{product.price.amount_subtotal}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'amount_tax')}}\n              <!-- Tax amount-->\n              <td style=\"{{makeStyle @root.table_config.body.amount_tax.style}}\">\n                {{product.price.amount_tax}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'gross_total')}}\n              <!-- Gross total -->\n              <td style=\"{{makeStyle @root.table_config.body.gross_total.style}}\">\n                {{product.price.amount_total}}\n                {{#if @root.table_config.body.payment_type.enable}}\n                  {{#if (eq product.price.type 'recurring')}}\n                    <br>\n                    <span style=\"{{makeStyle @root.table_config.body.payment_type.style}}\">{{product.price.billing_period}}</span>\n                  {{/if}}\n                {{/if}}\n              </td>\n            {{/if}}\n          {{/if}}\n        {{/each}}\n        </tr>\n    {{/each}}\n    <!-- Finish rendering products -->\n    {{#if table_config.footer.gross_total.enable}}\n      {{#each order.total_details.recurrences as |item|}}\n        <tr style=\"height: 48px;font-size: 14px;\">\n          <td style=\"padding-top: 16px; padding-bottom: 8px; border: none !important; vertical-align: top;\" colspan=\"{{calculate_colspan @root.table_config}}\"></td>\n          {{#if @root.table_config.footer.payment_type.enable}}\n            <td style=\"{{makeStyle @root.table_config.footer.payment_type.style}}\" colspan=\"2\">{{item.billing_period}}</td>\n          {{/if}}\n          {{#if (isColumnEnabled @root.table_config 'net_total')}}\n            {{#if @root.table_config.footer.net_total.enable}}\n              <td style=\"{{makeStyle @root.table_config.footer.net_total.style}}\">{{item.amount_subtotal}}</td>\n            {{/if}}\n          {{/if}}\n          <td style=\"{{makeStyle @root.table_config.footer.gross_total.style}}\">{{item.amount_total}}\n            {{#if @root.table_config.footer.amount_tax.enable}}\n              <br>\n              <span style=\"{{makeStyle @root.table_config.footer.amount_tax.style}}\">{{item.full_amount_tax}}</span>\n            {{/if}}\n          </td>\n        </tr>\n      {{/each}}\n    {{/if}}\n    <tr style=\"height:16px !important;\"></tr>\n  </tbody>\n</table>\n",
  "created_at": "2022-04-19T12:41:43.662Z",
  "created_by": "100042",
  "updated_at": "2022-04-20T12:41:43.662Z",
  "updated_by": "100042"
}'
```

Using positional args for path parameters:

```bash
epilot template-variables updateCustomVariable rbse777b-3cf8-4bff-bb0c-253fd1123250
```

Using stdin pipe:

```bash
cat body.json | epilot template-variables updateCustomVariable -p id=rbse777b-3cf8-4bff-bb0c-253fd1123250
```

With JSONata filter:

```bash
epilot template-variables updateCustomVariable -p id=rbse777b-3cf8-4bff-bb0c-253fd1123250 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "rbse777b-3cf8-4bff-bb0c-253fd1123250",
  "type": "order_table",
  "name": "My Custom table",
  "key": "my_custom_table",
  "_tags": ["string"],
  "_manifest": ["string"],
  "helper_params": ["param1", "param2"],
  "helper_logic": "return param1 * param2;",
  "config": {
    "header": null,
    "style": {
      "color": "#222",
      "background": "#fff",
      "font-size": "16px",
      "font-family": "",
      "padding-bottom": "4px",
      "font-weight": "bold",
      "border": "none !important",
      "text-align": "left"
    },
    "columns": [
      {},
      {}
    ],
    "body": {
      "product_name": {},
      "price_description": {},
      "product_description": {},
      "quantity": {},
      "tax": {},
      "unit_amount": {},
      "net_total": {},
      "gross_total": {}
    },
    "footer": {
      "payment_type": {},
      "net_total": {},
      "amount_tax": {},
      "gross_total": {}
    }
  },
  "template": "<table style=\"table-layout: fixed;width: 100%;max-width: 1000px;border-collapse: collapse;\">\n  <thead>\n    <tr style=\"height: 48px;border-bottom: 1px solid #D5E1ED;\">\n      {{#each table_config.header.columns as |column|}}\n        {{#if column.enable}}\n          <th style=\"{{makeStyle @root.table_config.header.style}};{{makeStyle column.style}};\">{{column._label}}</th>\n        {{/if}}\n      {{/each}}\n    </tr>\n  </thead>\n  <tbody style=\"vertical-align: baseline  !important;font-weight: 400;font-size: 12px;position: relative;\">\n    <!-- Start rendering products -->\n    {{#each order.products as |product|}}\n      {{#if @last}}\n        <tr style=\"height: 48px;;font-size:14px;border-bottom: 1px solid #D5E1ED;\">\n      {{else}}\n        <tr style=\"height: 48px;;font-size:14px;\">\n      {{/if}}\n        {{#each @root.table_config.header.columns as |column|}}\n          {{#if column.enable}}\n            {{#if (eq column.id 'item')}}\n              <!-- Item -->\n              <td style=\"{{makeStyle @root.table_config.body.product_name.style}}\">\n                {{#if @root.table_config.body.product_name.enable}}\n                  {{product.name}}\n                {{/if}}\n                {{#if @root.table_config.body.price_description.enable}}\n                  <br>\n                  <span style=\"{{makeStyle @root.table_config.body.price_description.style}}\">{{product.price.description}}</span>\n                {{/if}}\n                {{#if @root.table_config.body.product_description.enable}}\n                  <br>\n                  <span style=\"{{makeStyle @root.table_config.body.product_description.style}}\">{{product.description}}</span>\n                {{/if}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'quantity')}}\n              <!-- Quantity -->\n              <td style=\"{{makeStyle @root.table_config.body.quantity.style}}\">{{product.price.quantity}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'tax')}}\n              <!-- Tax -->\n              <td style=\"{{makeStyle @root.table_config.body.tax.style}}\">\n                {{product.price.tax_rate}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'unit_amount')}}\n              <!-- Unit amount -->\n              <td style=\"{{makeStyle @root.table_config.body.unit_amount.style}}\">\n                {{product.price.unit_amount_net}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'net_total')}}\n              <!-- Amount Subtotal -->\n              <td style=\"{{makeStyle @root.table_config.body.net_total.style}}\">\n                {{product.price.amount_subtotal}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'amount_tax')}}\n              <!-- Tax amount-->\n              <td style=\"{{makeStyle @root.table_config.body.amount_tax.style}}\">\n                {{product.price.amount_tax}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'gross_total')}}\n              <!-- Gross total -->\n              <td style=\"{{makeStyle @root.table_config.body.gross_total.style}}\">\n                {{product.price.amount_total}}\n                {{#if @root.table_config.body.payment_type.enable}}\n                  {{#if (eq product.price.type 'recurring')}}\n                    <br>\n                    <span style=\"{{makeStyle @root.table_config.body.payment_type.style}}\">{{product.price.billing_period}}</span>\n                  {{/if}}\n                {{/if}}\n              </td>\n            {{/if}}\n          {{/if}}\n        {{/each}}\n        </tr>\n    {{/each}}\n    <!-- Finish rendering products -->\n    {{#if table_config.footer.gross_total.enable}}\n      {{#each order.total_details.recurrences as |item|}}\n        <tr style=\"height: 48px;font-size: 14px;\">\n          <td style=\"padding-top: 16px; padding-bottom: 8px; border: none !important; vertical-align: top;\" colspan=\"{{calculate_colspan @root.table_config}}\"></td>\n          {{#if @root.table_config.footer.payment_type.enable}}\n            <td style=\"{{makeStyle @root.table_config.footer.payment_type.style}}\" colspan=\"2\">{{item.billing_period}}</td>\n          {{/if}}\n          {{#if (isColumnEnabled @root.table_config 'net_total')}}\n            {{#if @root.table_config.footer.net_total.enable}}\n              <td style=\"{{makeStyle @root.table_config.footer.net_total.style}}\">{{item.amount_subtotal}}</td>\n            {{/if}}\n          {{/if}}\n          <td style=\"{{makeStyle @root.table_config.footer.gross_total.style}}\">{{item.amount_total}}\n            {{#if @root.table_config.footer.amount_tax.enable}}\n              <br>\n              <span style=\"{{makeStyle @root.table_config.footer.amount_tax.style}}\">{{item.full_amount_tax}}</span>\n            {{/if}}\n          </td>\n        </tr>\n      {{/each}}\n    {{/if}}\n    <tr style=\"height:16px !important;\"></tr>\n  </tbody>\n</table>\n",
  "created_at": "2022-04-19T12:41:43.662Z",
  "created_by": "100042",
  "updated_at": "2022-04-20T12:41:43.662Z",
  "updated_by": "100042"
}
```

</details>

---

### `deleteCustomVariable`

Immediately and permanently deletes a custom variable

`DELETE /v1/custom-variables/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Custom vairable ID |

**Sample Call**

```bash
epilot template-variables deleteCustomVariable \
  -p id=rbse777b-3cf8-4bff-bb0c-253fd1123250
```

Using positional args for path parameters:

```bash
epilot template-variables deleteCustomVariable rbse777b-3cf8-4bff-bb0c-253fd1123250
```

With JSONata filter:

```bash
epilot template-variables deleteCustomVariable -p id=rbse777b-3cf8-4bff-bb0c-253fd1123250 --jsonata '$'
```

---

### `getBluePrintTableConfig`

Get default table config

`GET /v1/custom-variables/order-table-blueprint`

**Sample Call**

```bash
epilot template-variables getBluePrintTableConfig
```

With JSONata filter:

```bash
epilot template-variables getBluePrintTableConfig --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "rbse777b-3cf8-4bff-bb0c-253fd1123250",
  "type": "order_table",
  "name": "My Custom table",
  "key": "my_custom_table",
  "_tags": ["string"],
  "_manifest": ["string"],
  "helper_params": ["param1", "param2"],
  "helper_logic": "return param1 * param2;",
  "config": {
    "header": null,
    "style": {
      "color": "#222",
      "background": "#fff",
      "font-size": "16px",
      "font-family": "",
      "padding-bottom": "4px",
      "font-weight": "bold",
      "border": "none !important",
      "text-align": "left"
    },
    "columns": [
      {},
      {}
    ],
    "body": {
      "product_name": {},
      "price_description": {},
      "product_description": {},
      "quantity": {},
      "tax": {},
      "unit_amount": {},
      "net_total": {},
      "gross_total": {}
    },
    "footer": {
      "payment_type": {},
      "net_total": {},
      "amount_tax": {},
      "gross_total": {}
    }
  },
  "template": "<table style=\"table-layout: fixed;width: 100%;max-width: 1000px;border-collapse: collapse;\">\n  <thead>\n    <tr style=\"height: 48px;border-bottom: 1px solid #D5E1ED;\">\n      {{#each table_config.header.columns as |column|}}\n        {{#if column.enable}}\n          <th style=\"{{makeStyle @root.table_config.header.style}};{{makeStyle column.style}};\">{{column._label}}</th>\n        {{/if}}\n      {{/each}}\n    </tr>\n  </thead>\n  <tbody style=\"vertical-align: baseline  !important;font-weight: 400;font-size: 12px;position: relative;\">\n    <!-- Start rendering products -->\n    {{#each order.products as |product|}}\n      {{#if @last}}\n        <tr style=\"height: 48px;;font-size:14px;border-bottom: 1px solid #D5E1ED;\">\n      {{else}}\n        <tr style=\"height: 48px;;font-size:14px;\">\n      {{/if}}\n        {{#each @root.table_config.header.columns as |column|}}\n          {{#if column.enable}}\n            {{#if (eq column.id 'item')}}\n              <!-- Item -->\n              <td style=\"{{makeStyle @root.table_config.body.product_name.style}}\">\n                {{#if @root.table_config.body.product_name.enable}}\n                  {{product.name}}\n                {{/if}}\n                {{#if @root.table_config.body.price_description.enable}}\n                  <br>\n                  <span style=\"{{makeStyle @root.table_config.body.price_description.style}}\">{{product.price.description}}</span>\n                {{/if}}\n                {{#if @root.table_config.body.product_description.enable}}\n                  <br>\n                  <span style=\"{{makeStyle @root.table_config.body.product_description.style}}\">{{product.description}}</span>\n                {{/if}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'quantity')}}\n              <!-- Quantity -->\n              <td style=\"{{makeStyle @root.table_config.body.quantity.style}}\">{{product.price.quantity}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'tax')}}\n              <!-- Tax -->\n              <td style=\"{{makeStyle @root.table_config.body.tax.style}}\">\n                {{product.price.tax_rate}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'unit_amount')}}\n              <!-- Unit amount -->\n              <td style=\"{{makeStyle @root.table_config.body.unit_amount.style}}\">\n                {{product.price.unit_amount_net}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'net_total')}}\n              <!-- Amount Subtotal -->\n              <td style=\"{{makeStyle @root.table_config.body.net_total.style}}\">\n                {{product.price.amount_subtotal}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'amount_tax')}}\n              <!-- Tax amount-->\n              <td style=\"{{makeStyle @root.table_config.body.amount_tax.style}}\">\n                {{product.price.amount_tax}}\n              </td>\n            {{/if}}\n            {{#if (eq column.id 'gross_total')}}\n              <!-- Gross total -->\n              <td style=\"{{makeStyle @root.table_config.body.gross_total.style}}\">\n                {{product.price.amount_total}}\n                {{#if @root.table_config.body.payment_type.enable}}\n                  {{#if (eq product.price.type 'recurring')}}\n                    <br>\n                    <span style=\"{{makeStyle @root.table_config.body.payment_type.style}}\">{{product.price.billing_period}}</span>\n                  {{/if}}\n                {{/if}}\n              </td>\n            {{/if}}\n          {{/if}}\n        {{/each}}\n        </tr>\n    {{/each}}\n    <!-- Finish rendering products -->\n    {{#if table_config.footer.gross_total.enable}}\n      {{#each order.total_details.recurrences as |item|}}\n        <tr style=\"height: 48px;font-size: 14px;\">\n          <td style=\"padding-top: 16px; padding-bottom: 8px; border: none !important; vertical-align: top;\" colspan=\"{{calculate_colspan @root.table_config}}\"></td>\n          {{#if @root.table_config.footer.payment_type.enable}}\n            <td style=\"{{makeStyle @root.table_config.footer.payment_type.style}}\" colspan=\"2\">{{item.billing_period}}</td>\n          {{/if}}\n          {{#if (isColumnEnabled @root.table_config 'net_total')}}\n            {{#if @root.table_config.footer.net_total.enable}}\n              <td style=\"{{makeStyle @root.table_config.footer.net_total.style}}\">{{item.amount_subtotal}}</td>\n            {{/if}}\n          {{/if}}\n          <td style=\"{{makeStyle @root.table_config.footer.gross_total.style}}\">{{item.amount_total}}\n            {{#if @root.table_config.footer.amount_tax.enable}}\n              <br>\n              <span style=\"{{makeStyle @root.table_config.footer.amount_tax.style}}\">{{item.full_amount_tax}}</span>\n            {{/if}}\n          </td>\n        </tr>\n      {{/each}}\n    {{/if}}\n    <tr style=\"height:16px !important;\"></tr>\n  </tbody>\n</table>\n",
  "created_at": "2022-04-19T12:41:43.662Z",
  "created_by": "100042",
  "updated_at": "2022-04-20T12:41:43.662Z",
  "updated_by": "100042"
}
```

</details>

---
