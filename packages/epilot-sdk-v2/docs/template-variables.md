# Template Variables API

- **Base URL:** `https://template-variables-api.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/template-variables](https://docs.epilot.io/api/template-variables)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.templateVariables.getCategories(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/template-variables'

const templateVariablesClient = getClient()
authorize(templateVariablesClient, () => '<token>')
const { data } = await templateVariablesClient.getCategories(...)
```

## Operations

**Templates**
- [`getCategories`](#getcategories)
- [`searchVariables`](#searchvariables)
- [`getVariableContext`](#getvariablecontext)
- [`replaceTemplates`](#replacetemplates)
- [`replaceTemplatesV2`](#replacetemplatesv2)

**Custom Variables**
- [`getCustomVariables`](#getcustomvariables)
- [`createCustomVariable`](#createcustomvariable)
- [`searchCustomVariables`](#searchcustomvariables)
- [`updateCustomVariable`](#updatecustomvariable)
- [`getCustomVariable`](#getcustomvariable)
- [`deleteCustomVariable`](#deletecustomvariable)
- [`getBluePrintTableConfig`](#getblueprinttableconfig)

**Schemas**
- [`Language`](#language)
- [`VariableParameters`](#variableparameters)
- [`ReplacementOutput`](#replacementoutput)
- [`ReplacementOutputV2`](#replacementoutputv2)
- [`VariableResult`](#variableresult)
- [`CustomVariablesSearchParams`](#customvariablessearchparams)
- [`VariableContext`](#variablecontext)
- [`TemplateType`](#templatetype)
- [`CategoryResult`](#categoryresult)
- [`ExternalCustomVariable`](#externalcustomvariable)
- [`CustomVariable`](#customvariable)

### `getCategories`

Get all template variable categories

`GET /v1/template-variables/categories`

```ts
const { data } = await client.getCategories({
  lang: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.searchVariables(
  null,
  {
    template_type: 'email',
    query: 'logo',
    from: 0,
    size: 25,
    lang: 'de',
    entity_schemas: ['contact']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getVariableContext(
  null,
  {
    parameters: {
      template_type: 'email',
      language: 'de',
      main_entity_id: '63753437-c9e2-4e83-82bb-b1c666514561',
      brand_id: 123451,
      user_id: '50001',
      user_org_id: '729224',
      custom_variables: [
        {
          variable: '{{craftsmen.invitation_link}}',
          value: 'https://partner.epilot.cloud/activate-account?user_name=htny.pct%2Btet%40gmail.com&confirmation_code=EdXPRW19'
        }
      ],
      context_data: {},
      template_name: 'string',
      template_tags: ['string'],
      template_id: 'string',
      variables_version: '2'
    }
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.replaceTemplates(
  null,
  {
    inputs: ['Hello, {{contact.first_name}}!
  
  {{{brand.signature}}}
  '],
    parameters: {
      template_type: 'email',
      language: 'de',
      main_entity_id: '63753437-c9e2-4e83-82bb-b1c666514561',
      brand_id: 123451,
      user_id: '50001',
      user_org_id: '729224',
      custom_variables: [
        {
          variable: '{{craftsmen.invitation_link}}',
          value: 'https://partner.epilot.cloud/activate-account?user_name=htny.pct%2Btet%40gmail.com&confirmation_code=EdXPRW19'
        }
      ],
      context_data: {},
      template_name: 'string',
      template_tags: ['string'],
      template_id: 'string',
      variables_version: '2'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "outputs": ["[Brand Name GmbH] Order confirmation\nHello Customer Name\n\n<span color=\"#ccc\">Brand Name GmbH</span>\n<img src=\"https://logobucket.s3.amazonaws.com/brandlogo.png\" alt=\"Brand Name\"/>\n<a href=\"https://company.com/imprint\">imprint</a>\n"]
}
```

</details>

---

### `replaceTemplatesV2`

Replace variables in templates (V2)

`POST /v2/template:replace`

```ts
const { data } = await client.replaceTemplatesV2(
  null,
  {
    inputs: ['Hello, {{contact.first_name}}!
  '],
    parameters: {
      template_type: 'email',
      language: 'de',
      main_entity_id: '63753437-c9e2-4e83-82bb-b1c666514561',
      brand_id: 123451,
      user_id: '50001',
      user_org_id: '729224',
      custom_variables: [
        {
          variable: '{{craftsmen.invitation_link}}',
          value: 'https://partner.epilot.cloud/activate-account?user_name=htny.pct%2Btet%40gmail.com&confirmation_code=EdXPRW19'
        }
      ],
      context_data: {},
      template_name: 'string',
      template_tags: ['string'],
      template_id: 'string',
      variables_version: '2'
    }
  },
)
```

<details>
<summary>Response</summary>

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

Get custom variables

`GET /v1/custom-variables`

```ts
const { data } = await client.getCustomVariables()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createCustomVariable(
  null,
  {
    id: 'rbse777b-3cf8-4bff-bb0c-253fd1123250',
    type: 'order_table',
    name: 'My Custom table',
    key: 'my_custom_table',
    _tags: ['string'],
    _manifest: ['string'],
    helper_params: ['param1', 'param2'],
    helper_logic: 'return param1 * param2;',
    config: {
      header: null,
      style: {
        color: '#222',
        background: '#fff',
        'font-size': '16px',
        'font-family': '',
        'padding-bottom': '4px',
        'font-weight': 'bold',
        border: 'none !important',
        'text-align': 'left'
      },
      columns: [
        { /* ... */ },
        { /* ... */ },
        /* ... 4 more */
      ],
      body: {
        product_name: { /* ... */ },
        price_description: { /* ... */ },
        product_description: { /* ... */ },
        quantity: { /* ... */ },
        tax: { /* ... */ },
        unit_amount: { /* ... */ },
        net_total: { /* ... */ },
        gross_total: { /* ... */ }
      },
      footer: {
        payment_type: { /* ... */ },
        net_total: { /* ... */ },
        amount_tax: { /* ... */ },
        gross_total: { /* ... */ }
      }
    },
    template: '<table style="table-layout: fixed;width: 100%;max-width: 1000px;border-collapse: collapse;">
    <thead>
      <tr style="height: 48px;border-bottom: 1px solid #D5E1ED;">
        {{#each table_config.header.columns as |column|}}
          {{#if column.enable}}
            <th style="{{makeStyle @root.table_config.header.style}};{{makeStyle column.style}};">{{column._label}}</th>
          {{/if}}
        {{/each}}
      </tr>
    </thead>
    <tbody style="vertical-align: baseline  !important;font-weight: 400;font-size: 12px;position: relative;">
      <!-- Start rendering products -->
      {{#each order.products as |product|}}
        {{#if @last}}
          <tr style="height: 48px;;font-size:14px;border-bottom: 1px solid #D5E1ED;">
        {{else}}
          <tr style="height: 48px;;font-size:14px;">
        {{/if}}
          {{#each @root.table_config.header.columns as |column|}}
            {{#if column.enable}}
              {{#if (eq column.id \'item\')}}
                <!-- Item -->
                <td style="{{makeStyle @root.table_config.body.product_name.style}}">
                  {{#if @root.table_config.body.product_name.enable}}
                    {{product.name}}
                  {{/if}}
                  {{#if @root.table_config.body.price_description.enable}}
                    <br>
                    <span style="{{makeStyle @root.table_config.body.price_description.style}}">{{product.price.description}}</span>
                  {{/if}}
                  {{#if @root.table_config.body.product_description.enable}}
                    <br>
                    <span style="{{makeStyle @root.table_config.body.product_description.style}}">{{product.description}}</span>
                  {{/if}}
                </td>
              {{/if}}
              {{#if (eq column.id \'quantity\')}}
                <!-- Quantity -->
                <td style="{{makeStyle @root.table_config.body.quantity.style}}">{{product.price.quantity}}
                </td>
              {{/if}}
              {{#if (eq column.id \'tax\')}}
                <!-- Tax -->
                <td style="{{makeStyle @root.table_config.body.tax.style}}">
                  {{product.price.tax_rate}}
                </td>
              {{/if}}
              {{#if (eq column.id \'unit_amount\')}}
                <!-- Unit amount -->
                <td style="{{makeStyle @root.table_config.body.unit_amount.style}}">
                  {{product.price.unit_amount_net}}
                </td>
              {{/if}}
              {{#if (eq column.id \'net_total\')}}
                <!-- Amount Subtotal -->
                <td style="{{makeStyle @root.table_config.body.net_total.style}}">
                  {{product.price.amount_subtotal}}
                </td>
              {{/if}}
              {{#if (eq column.id \'amount_tax\')}}
                <!-- Tax amount-->
                <td style="{{makeStyle @root.table_config.body.amount_tax.style}}">
                  {{product.price.amount_tax}}
                </td>
              {{/if}}
              {{#if (eq column.id \'gross_total\')}}
                <!-- Gross total -->
                <td style="{{makeStyle @root.table_config.body.gross_total.style}}">
                  {{product.price.amount_total}}
                  {{#if @root.table_config.body.payment_type.enable}}
                    {{#if (eq product.price.type \'recurring\')}}
                      <br>
                      <span style="{{makeStyle @root.table_config.body.payment_type.style}}">{{product.price.billing_period}}</span>
                    {{/if}}
                  {{/if}}
                </td>
              {{/if}}
            {{/if}}
          {{/each}}
          </tr>
      {{/each}}
      <!-- Finish rendering products -->
      {{#if table_config.footer.gross_total.enable}}
        {{#each order.total_details.recurrences as |item|}}
          <tr style="height: 48px;font-size: 14px;">
            <td style="padding-top: 16px; padding-bottom: 8px; border: none !important; vertical-align: top;" colspan="{{calculate_colspan @root.table_config}}"></td>
            {{#if @root.table_config.footer.payment_type.enable}}
              <td style="{{makeStyle @root.table_config.footer.payment_type.style}}" colspan="2">{{item.billing_period}}</td>
            {{/if}}
            {{#if (isColumnEnabled @root.table_config \'net_total\')}}
              {{#if @root.table_config.footer.net_total.enable}}
                <td style="{{makeStyle @root.table_config.footer.net_total.style}}">{{item.amount_subtotal}}</td>
              {{/if}}
            {{/if}}
            <td style="{{makeStyle @root.table_config.footer.gross_total.style}}">{{item.amount_total}}
              {{#if @root.table_config.footer.amount_tax.enable}}
                <br>
                <span style="{{makeStyle @root.table_config.footer.amount_tax.style}}">{{item.full_amount_tax}}</span>
              {{/if}}
            </td>
          </tr>
        {{/each}}
      {{/if}}
      <tr style="height:16px !important;"></tr>
    </tbody>
  </table>
  ',
    created_at: '2022-04-19T12:41:43.662Z',
    created_by: '100042',
    updated_at: '2022-04-20T12:41:43.662Z',
    updated_by: '100042'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.searchCustomVariables(
  null,
  {
    type: 'order_table',
    tags: ['string'],
    query: 'logo',
    from: 0,
    size: 25,
    sort_by: 'created_at, name, key',
    fields: ['string']
  },
)
```

<details>
<summary>Response</summary>

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

### `updateCustomVariable`

Update custom variable

`PUT /v1/custom-variables/{id}`

```ts
const { data } = await client.updateCustomVariable(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    id: 'rbse777b-3cf8-4bff-bb0c-253fd1123250',
    type: 'order_table',
    name: 'My Custom table',
    key: 'my_custom_table',
    _tags: ['string'],
    _manifest: ['string'],
    helper_params: ['param1', 'param2'],
    helper_logic: 'return param1 * param2;',
    config: {
      header: null,
      style: {
        color: '#222',
        background: '#fff',
        'font-size': '16px',
        'font-family': '',
        'padding-bottom': '4px',
        'font-weight': 'bold',
        border: 'none !important',
        'text-align': 'left'
      },
      columns: [
        { /* ... */ },
        { /* ... */ },
        /* ... 4 more */
      ],
      body: {
        product_name: { /* ... */ },
        price_description: { /* ... */ },
        product_description: { /* ... */ },
        quantity: { /* ... */ },
        tax: { /* ... */ },
        unit_amount: { /* ... */ },
        net_total: { /* ... */ },
        gross_total: { /* ... */ }
      },
      footer: {
        payment_type: { /* ... */ },
        net_total: { /* ... */ },
        amount_tax: { /* ... */ },
        gross_total: { /* ... */ }
      }
    },
    template: '<table style="table-layout: fixed;width: 100%;max-width: 1000px;border-collapse: collapse;">
    <thead>
      <tr style="height: 48px;border-bottom: 1px solid #D5E1ED;">
        {{#each table_config.header.columns as |column|}}
          {{#if column.enable}}
            <th style="{{makeStyle @root.table_config.header.style}};{{makeStyle column.style}};">{{column._label}}</th>
          {{/if}}
        {{/each}}
      </tr>
    </thead>
    <tbody style="vertical-align: baseline  !important;font-weight: 400;font-size: 12px;position: relative;">
      <!-- Start rendering products -->
      {{#each order.products as |product|}}
        {{#if @last}}
          <tr style="height: 48px;;font-size:14px;border-bottom: 1px solid #D5E1ED;">
        {{else}}
          <tr style="height: 48px;;font-size:14px;">
        {{/if}}
          {{#each @root.table_config.header.columns as |column|}}
            {{#if column.enable}}
              {{#if (eq column.id \'item\')}}
                <!-- Item -->
                <td style="{{makeStyle @root.table_config.body.product_name.style}}">
                  {{#if @root.table_config.body.product_name.enable}}
                    {{product.name}}
                  {{/if}}
                  {{#if @root.table_config.body.price_description.enable}}
                    <br>
                    <span style="{{makeStyle @root.table_config.body.price_description.style}}">{{product.price.description}}</span>
                  {{/if}}
                  {{#if @root.table_config.body.product_description.enable}}
                    <br>
                    <span style="{{makeStyle @root.table_config.body.product_description.style}}">{{product.description}}</span>
                  {{/if}}
                </td>
              {{/if}}
              {{#if (eq column.id \'quantity\')}}
                <!-- Quantity -->
                <td style="{{makeStyle @root.table_config.body.quantity.style}}">{{product.price.quantity}}
                </td>
              {{/if}}
              {{#if (eq column.id \'tax\')}}
                <!-- Tax -->
                <td style="{{makeStyle @root.table_config.body.tax.style}}">
                  {{product.price.tax_rate}}
                </td>
              {{/if}}
              {{#if (eq column.id \'unit_amount\')}}
                <!-- Unit amount -->
                <td style="{{makeStyle @root.table_config.body.unit_amount.style}}">
                  {{product.price.unit_amount_net}}
                </td>
              {{/if}}
              {{#if (eq column.id \'net_total\')}}
                <!-- Amount Subtotal -->
                <td style="{{makeStyle @root.table_config.body.net_total.style}}">
                  {{product.price.amount_subtotal}}
                </td>
              {{/if}}
              {{#if (eq column.id \'amount_tax\')}}
                <!-- Tax amount-->
                <td style="{{makeStyle @root.table_config.body.amount_tax.style}}">
                  {{product.price.amount_tax}}
                </td>
              {{/if}}
              {{#if (eq column.id \'gross_total\')}}
                <!-- Gross total -->
                <td style="{{makeStyle @root.table_config.body.gross_total.style}}">
                  {{product.price.amount_total}}
                  {{#if @root.table_config.body.payment_type.enable}}
                    {{#if (eq product.price.type \'recurring\')}}
                      <br>
                      <span style="{{makeStyle @root.table_config.body.payment_type.style}}">{{product.price.billing_period}}</span>
                    {{/if}}
                  {{/if}}
                </td>
              {{/if}}
            {{/if}}
          {{/each}}
          </tr>
      {{/each}}
      <!-- Finish rendering products -->
      {{#if table_config.footer.gross_total.enable}}
        {{#each order.total_details.recurrences as |item|}}
          <tr style="height: 48px;font-size: 14px;">
            <td style="padding-top: 16px; padding-bottom: 8px; border: none !important; vertical-align: top;" colspan="{{calculate_colspan @root.table_config}}"></td>
            {{#if @root.table_config.footer.payment_type.enable}}
              <td style="{{makeStyle @root.table_config.footer.payment_type.style}}" colspan="2">{{item.billing_period}}</td>
            {{/if}}
            {{#if (isColumnEnabled @root.table_config \'net_total\')}}
              {{#if @root.table_config.footer.net_total.enable}}
                <td style="{{makeStyle @root.table_config.footer.net_total.style}}">{{item.amount_subtotal}}</td>
              {{/if}}
            {{/if}}
            <td style="{{makeStyle @root.table_config.footer.gross_total.style}}">{{item.amount_total}}
              {{#if @root.table_config.footer.amount_tax.enable}}
                <br>
                <span style="{{makeStyle @root.table_config.footer.amount_tax.style}}">{{item.full_amount_tax}}</span>
              {{/if}}
            </td>
          </tr>
        {{/each}}
      {{/if}}
      <tr style="height:16px !important;"></tr>
    </tbody>
  </table>
  ',
    created_at: '2022-04-19T12:41:43.662Z',
    created_by: '100042',
    updated_at: '2022-04-20T12:41:43.662Z',
    updated_by: '100042'
  },
)
```

<details>
<summary>Response</summary>

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

### `getCustomVariable`

Get custom variable

`GET /v1/custom-variables/{id}`

```ts
const { data } = await client.getCustomVariable({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

Delete custom variable

`DELETE /v1/custom-variables/{id}`

```ts
const { data } = await client.deleteCustomVariable({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `getBluePrintTableConfig`

Get default table config

`GET /v1/custom-variables/order-table-blueprint`

```ts
const { data } = await client.getBluePrintTableConfig()
```

<details>
<summary>Response</summary>

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

## Schemas

### `Language`

2-letter language code (ISO 639-1)

```ts
type Language = string
```

### `VariableParameters`

```ts
type VariableParameters = {
  template_type: "email" | "document"
  language?: string
  main_entity_id?: string // uuid
  brand_id?: number
  user_id?: string
  user_org_id?: string
  custom_variables?: Array<{
    variable?: string
    value?: string
  }>
  context_data?: object
  template_name?: string
  template_tags?: string[]
  template_id?: string
  variables_version?: string
}
```

### `ReplacementOutput`

```ts
type ReplacementOutput = {
  outputs?: string[]
}
```

### `ReplacementOutputV2`

```ts
type ReplacementOutputV2 = {
  outputs?: Record<string, string | number | boolean | unknown[] | Record<string, unknown>>
}
```

### `VariableResult`

```ts
type VariableResult = {
  type?: "simple" | "partial"
  qrdata?: string
  group?: string
  insert?: string
  description?: string
}
```

### `CustomVariablesSearchParams`

```ts
type CustomVariablesSearchParams = {
  type?: "order_table" | "custom" | "journey_link" | "snippet"
  tags?: string[]
  query?: string
  from?: number
  size?: number
  sort_by?: string
  fields?: string[]
}
```

### `VariableContext`

```ts
type VariableContext = {
  unsubscribe_url?: string
  main?: Record<string, unknown>
  contact?: Record<string, unknown>
  brand?: Record<string, unknown>
}
```

### `TemplateType`

```ts
type TemplateType = "email" | "document"
```

### `CategoryResult`

```ts
type CategoryResult = {
  category?: string
  description?: string
}
```

### `ExternalCustomVariable`

```ts
type ExternalCustomVariable = {
  variable?: string
  value?: string
}
```

### `CustomVariable`

```ts
type CustomVariable = {
  id?: string
  type?: "order_table" | "custom" | "journey_link" | "snippet"
  name?: string
  key: string
  _tags?: string[]
  _manifest?: string[]
  helper_params?: string[]
  helper_logic?: string
  config?: object
  template: string
  created_at?: string
  created_by?: string
  updated_at?: string
  updated_by?: string
}
```
