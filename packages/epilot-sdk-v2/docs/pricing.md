# Pricing API

- **Base URL:** `https://pricing-api.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/pricing](https://docs.epilot.io/api/pricing)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.pricing.$calculatePricingDetails(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/pricing'

const pricingClient = getClient()
authorize(pricingClient, () => '<token>')
const { data } = await pricingClient.$calculatePricingDetails(...)
```

## Operations

**Order API**
- [`$calculatePricingDetails`](#$calculatepricingdetails)
- [`createOrder`](#createorder)
- [`putOrder`](#putorder)

**Cart API**
- [`$checkoutCart`](#$checkoutcart)

**Catalog API**
- [`$searchCatalog`](#$searchcatalog)
- [`$privateSearchCatalog`](#$privatesearchcatalog)

**Promo Codes API**
- [`$validatePromoCodes`](#$validatepromocodes)

**Availability API**
- [`$availabilityCheck`](#$availabilitycheck)
- [`$validateAvailabilityFile`](#$validateavailabilityfile)

**Spot Market API**
- [`$historicMarketPrices`](#$historicmarketprices)
- [`$averageMarketPrice`](#$averagemarketprice)

**External Integrations API**
- [`$searchExternalProducts`](#$searchexternalproducts)
- [`$searchExternalProductRecommendations`](#$searchexternalproductrecommendations)
- [`$searchProviders`](#$searchproviders)
- [`$searchStreets`](#$searchstreets)
- [`$computePrice`](#$computeprice)
- [`$getCredentials`](#$getcredentials)
- [`$saveCredentials`](#$savecredentials)
- [`$deleteCredentials`](#$deletecredentials)

**External Catalog API**
- [`$getExternalCatalogProducts`](#$getexternalcatalogproducts)
- [`$getExternalCatalogProductRecommendations`](#$getexternalcatalogproductrecommendations)

**Product Recommendations API**
- [`$productRecommendations`](#$productrecommendations)

**Schemas**
- [`IntegrationId`](#integrationid)
- [`Error`](#error)
- [`Product`](#product)
- [`Opportunity`](#opportunity)
- [`Order`](#order)
- [`Price`](#price)
- [`BaseCompositePrice`](#basecompositeprice)
- [`NonHydratedCompositePrice`](#nonhydratedcompositeprice)
- [`HydratedCompositePrice`](#hydratedcompositeprice)
- [`CompositePrice`](#compositeprice)
- [`PriceComponentRelation`](#pricecomponentrelation)
- [`MetaData`](#metadata)
- [`PriceInputMappings`](#priceinputmappings)
- [`PriceInputMapping`](#priceinputmapping)
- [`PriceConditions`](#priceconditions)
- [`ExternalFeeMetadata`](#externalfeemetadata)
- [`ExternalPriceMetadata`](#externalpricemetadata)
- [`ExternalFeeMappings`](#externalfeemappings)
- [`ExternalFeeMapping`](#externalfeemapping)
- [`CatalogSearch`](#catalogsearch)
- [`CatalogSearchResult`](#catalogsearchresult)
- [`SearchProvidersParams`](#searchprovidersparams)
- [`SearchStreetsParams`](#searchstreetsparams)
- [`AvailabilityCheckParams`](#availabilitycheckparams)
- [`AvailabilityResult`](#availabilityresult)
- [`ValidateAvailabilityFileError`](#validateavailabilityfileerror)
- [`IntegrationCredentialsResult`](#integrationcredentialsresult)
- [`SaveIntegrationCredentialsParams`](#saveintegrationcredentialsparams)
- [`ComputePriceParamsBase`](#computepriceparamsbase)
- [`ComputePriceParamsPower`](#computepriceparamspower)
- [`ComputePriceParamsGas`](#computepriceparamsgas)
- [`SignatureMeta`](#signaturemeta)
- [`ComputedBasePrice`](#computedbaseprice)
- [`ComputePriceParams`](#computepriceparams)
- [`GasConcessionType`](#gasconcessiontype)
- [`PowerMeterType`](#powermetertype)
- [`DynamicTariffMode`](#dynamictariffmode)
- [`DynamicTariffInterval`](#dynamictariffinterval)
- [`ComputedPriceBreakdown`](#computedpricebreakdown)
- [`ComputedPriceComponents`](#computedpricecomponents)
- [`ComputePriceResult`](#computepriceresult)
- [`SpotMarketBiddingZone`](#spotmarketbiddingzone)
- [`SpotMarketType`](#spotmarkettype)
- [`SpotMarketDataFrequency`](#spotmarketdatafrequency)
- [`HistoricMarketPricesResult`](#historicmarketpricesresult)
- [`AverageMarketPriceResult`](#averagemarketpriceresult)
- [`AverageMarketPriceRecord`](#averagemarketpricerecord)
- [`HistoricMarketPriceRecord`](#historicmarketpricerecord)
- [`BaseMarketPriceRecord`](#basemarketpricerecord)
- [`OAuthCredentials`](#oauthcredentials)
- [`BasicAuthCredentials`](#basicauthcredentials)
- [`BasicAuthIntegration`](#basicauthintegration)
- [`OAuthIntegration`](#oauthintegration)
- [`IntegrationAuthCredentials`](#integrationauthcredentials)
- [`SearchStreetsResult`](#searchstreetsresult)
- [`SearchProvidersResult`](#searchprovidersresult)
- [`Provider`](#provider)
- [`Street`](#street)
- [`ValidateAvailabilityFileResult`](#validateavailabilityfileresult)
- [`CartDto`](#cartdto)
- [`CheckoutCart`](#checkoutcart)
- [`CheckoutCartResult`](#checkoutcartresult)
- [`CheckoutMode`](#checkoutmode)
- [`OrderStatus`](#orderstatus)
- [`BasePriceItemCommon`](#basepriceitemcommon)
- [`PriceItemDtoUnion`](#priceitemdtounion)
- [`PriceItemsDto`](#priceitemsdto)
- [`BasePriceItemDto`](#basepriceitemdto)
- [`PriceItemDto`](#priceitemdto)
- [`CompositePriceItemDto`](#compositepriceitemdto)
- [`TaxAmountDto`](#taxamountdto)
- [`OrderSource`](#ordersource)
- [`OpportunitySource`](#opportunitysource)
- [`RecurrenceAmountDto`](#recurrenceamountdto)
- [`Currency`](#currency)
- [`OrderRelation`](#orderrelation)
- [`OrderPayload`](#orderpayload)
- [`PriceItems`](#priceitems)
- [`CompositePriceItem`](#compositepriceitem)
- [`BasePriceItem`](#basepriceitem)
- [`CashbackAmounts`](#cashbackamounts)
- [`DiscountAmounts`](#discountamounts)
- [`PriceAmounts`](#priceamounts)
- [`Amounts`](#amounts)
- [`PriceItem`](#priceitem)
- [`TaxAmount`](#taxamount)
- [`TaxAmountBreakdown`](#taxamountbreakdown)
- [`RecurrenceAmount`](#recurrenceamount)
- [`CashbackAmount`](#cashbackamount)
- [`RecurrenceAmountWithTax`](#recurrenceamountwithtax)
- [`TotalDetails`](#totaldetails)
- [`PricingDetails`](#pricingdetails)
- [`PromoCodeValidationResponse`](#promocodevalidationresponse)
- [`PricingDetailsResponse`](#pricingdetailsresponse)
- [`BillingPeriod`](#billingperiod)
- [`CashbackPeriod`](#cashbackperiod)
- [`SalesTax`](#salestax)
- [`AvailabilityLocation`](#availabilitylocation)
- [`AvailabilityFilters`](#availabilityfilters)
- [`Address`](#address)
- [`PaymentMethod`](#paymentmethod)
- [`Customer`](#customer)
- [`File`](#file)
- [`EntityId`](#entityid)
- [`EntityItem`](#entityitem)
- [`EntityRelation`](#entityrelation)
- [`Tax`](#tax)
- [`TaxBreakdownInfo`](#taxbreakdowninfo)
- [`BaseCouponCommon`](#basecouponcommon)
- [`CouponWithoutPromoCodes`](#couponwithoutpromocodes)
- [`Coupon`](#coupon)
- [`CouponItem`](#couponitem)
- [`PromoCode`](#promocode)
- [`RedeemedPromo`](#redeemedpromo)
- [`PriceTier`](#pricetier)
- [`PriceTierDisplayMode`](#pricetierdisplaymode)
- [`PricingModel`](#pricingmodel)
- [`MarkupPricingModel`](#markuppricingmodel)
- [`TypeGetAg`](#typegetag)
- [`TariffTypeGetAg`](#tarifftypegetag)
- [`ConsumptionTypeGetAg`](#consumptiontypegetag)
- [`ProductCategory`](#productcategory)
- [`PriceGetAg`](#pricegetag)
- [`PriceDynamicTariff`](#pricedynamictariff)
- [`TierDetails`](#tierdetails)
- [`SearchExternalCatalogParams`](#searchexternalcatalogparams)
- [`ExternalCatalogRequest`](#externalcatalogrequest)
- [`ExternalCatalogConfigurationRequest`](#externalcatalogconfigurationrequest)
- [`ExternalCatalogJourneyRequest`](#externalcatalogjourneyrequest)
- [`ExternalCatalogPortalRequest`](#externalcatalogportalrequest)
- [`ExternalCatalogCustomRequest`](#externalcatalogcustomrequest)
- [`CustomContext`](#customcontext)
- [`JourneyContext`](#journeycontext)
- [`PortalContext`](#portalcontext)
- [`SearchExternalCatalogResult`](#searchexternalcatalogresult)
- [`SearchExternalCatalogRecommendationsResult`](#searchexternalcatalogrecommendationsresult)
- [`ExternalCatalogItem`](#externalcatalogitem)
- [`ProductRecommendationSearch`](#productrecommendationsearch)
- [`ProductRecommendationResponse`](#productrecommendationresponse)
- [`Offer`](#offer)
- [`ProductRecommendation`](#productrecommendation)

### `$calculatePricingDetails`

calculatePricingDetails

`POST /v1/pricing:compute`

```ts
const { data } = await client.$calculatePricingDetails(
  null,
  {},
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createOrder(
  null,
  {
    status: 'draft',
    line_items: [
      {
        external_fees_mappings: [ /* ... */ ],
        external_fees_metadata: { /* ... */ },
        external_price_metadata: { /* ... */ },
        _immutable_pricing_details: { /* ... */ },
        coupon_ids: ['string'],
        taxes: [ /* ... */ ],
        recurrences: [ /* ... */ ],
        _coupons: [ /* ... */ ],
        metadata: [ /* ... */ ],
        quantity: 0,
        product_id: 'string',
        price_id: 'string',
        description: 'string',
        product_description: 'string',
        product_name: 'string',
        price_mappings: [ /* ... */ ],
        is_tax_inclusive: true,
        _product: { /* ... */ },
        type: 'one_time',
        billing_period: 'weekly',
        unit_amount: 0,
        unit_amount_gross: 0,
        unit_amount_currency: 'EUR',
        unit_amount_decimal: 'string',
        is_composite_price: false,
        pricing_model: 'per_unit',
        _price: { /* ... */ }
      },
      {
        external_fees_mappings: [ /* ... */ ],
        external_fees_metadata: { /* ... */ },
        external_price_metadata: { /* ... */ },
        _immutable_pricing_details: { /* ... */ },
        coupon_ids: ['string'],
        taxes: [ /* ... */ ],
        recurrences: [ /* ... */ ],
        _coupons: [ /* ... */ ],
        metadata: [ /* ... */ ],
        quantity: 0,
        product_id: 'string',
        price_id: 'string',
        description: 'string',
        product_description: 'string',
        product_name: 'string',
        price_mappings: [ /* ... */ ],
        is_tax_inclusive: true,
        _product: { /* ... */ },
        is_composite_price: true,
        item_components: [ /* ... */ ],
        selected_price_component_ids: ['string'],
        price_component_coupon_ids: {},
        _price: { /* ... */ }
      }
    ],
    source_type: 'journey',
    currency: 'EUR',
    contact: 'string',
    billing_first_name: 'string',
    billing_last_name: 'string',
    billing_company_name: 'string',
    billing_vat: 'string',
    billing_email: 'string',
    billing_phone: 'string',
    billing_address: [
      {
        _tags: ['billing'],
        street: 'string',
        street_number: 'string',
        postal_code: 'string',
        city: 'string',
        country: 'string',
        additional_info: 'string',
        company_name: 'string',
        first_name: 'string',
        last_name: 'string',
        salutation: 'string',
        title: 'string'
      }
    ],
    delivery_address: [
      {
        _tags: ['billing'],
        street: 'string',
        street_number: 'string',
        postal_code: 'string',
        city: 'string',
        country: 'string',
        additional_info: 'string',
        company_name: 'string',
        first_name: 'string',
        last_name: 'string',
        salutation: 'string',
        title: 'string'
      }
    ],
    payment_method: [
      {
        type: 'string',
        details: {}
      }
    ],
    redeemed_promos: [
      {
        code: 'string',
        coupons: [ /* ... */ ]
      }
    ],
    _tags: ['string']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.putOrder(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    status: 'draft',
    line_items: [
      {
        external_fees_mappings: [ /* ... */ ],
        external_fees_metadata: { /* ... */ },
        external_price_metadata: { /* ... */ },
        _immutable_pricing_details: { /* ... */ },
        coupon_ids: ['string'],
        taxes: [ /* ... */ ],
        recurrences: [ /* ... */ ],
        _coupons: [ /* ... */ ],
        metadata: [ /* ... */ ],
        quantity: 0,
        product_id: 'string',
        price_id: 'string',
        description: 'string',
        product_description: 'string',
        product_name: 'string',
        price_mappings: [ /* ... */ ],
        is_tax_inclusive: true,
        _product: { /* ... */ },
        type: 'one_time',
        billing_period: 'weekly',
        unit_amount: 0,
        unit_amount_gross: 0,
        unit_amount_currency: 'EUR',
        unit_amount_decimal: 'string',
        is_composite_price: false,
        pricing_model: 'per_unit',
        _price: { /* ... */ }
      },
      {
        external_fees_mappings: [ /* ... */ ],
        external_fees_metadata: { /* ... */ },
        external_price_metadata: { /* ... */ },
        _immutable_pricing_details: { /* ... */ },
        coupon_ids: ['string'],
        taxes: [ /* ... */ ],
        recurrences: [ /* ... */ ],
        _coupons: [ /* ... */ ],
        metadata: [ /* ... */ ],
        quantity: 0,
        product_id: 'string',
        price_id: 'string',
        description: 'string',
        product_description: 'string',
        product_name: 'string',
        price_mappings: [ /* ... */ ],
        is_tax_inclusive: true,
        _product: { /* ... */ },
        is_composite_price: true,
        item_components: [ /* ... */ ],
        selected_price_component_ids: ['string'],
        price_component_coupon_ids: {},
        _price: { /* ... */ }
      }
    ],
    source_type: 'journey',
    currency: 'EUR',
    contact: 'string',
    billing_first_name: 'string',
    billing_last_name: 'string',
    billing_company_name: 'string',
    billing_vat: 'string',
    billing_email: 'string',
    billing_phone: 'string',
    billing_address: [
      {
        _tags: ['billing'],
        street: 'string',
        street_number: 'string',
        postal_code: 'string',
        city: 'string',
        country: 'string',
        additional_info: 'string',
        company_name: 'string',
        first_name: 'string',
        last_name: 'string',
        salutation: 'string',
        title: 'string'
      }
    ],
    delivery_address: [
      {
        _tags: ['billing'],
        street: 'string',
        street_number: 'string',
        postal_code: 'string',
        city: 'string',
        country: 'string',
        additional_info: 'string',
        company_name: 'string',
        first_name: 'string',
        last_name: 'string',
        salutation: 'string',
        title: 'string'
      }
    ],
    payment_method: [
      {
        type: 'string',
        details: {}
      }
    ],
    redeemed_promos: [
      {
        code: 'string',
        coupons: [ /* ... */ ]
      }
    ],
    _tags: ['string']
  },
)
```

<details>
<summary>Response</summary>

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

checkoutCart

`POST /v1/public/cart:checkout`

```ts
const { data } = await client.$checkoutCart(
  {
    X-Ivy-Org-ID: 'example',
  },
  {
    cart: 'string',
    redeemed_promos: [
      {
        code: 'string',
        coupons: [
          {
            _id: '123e4567-e89b-12d3-a456-426614174000',
            _schema: 'coupon',
            _org: 'org_12345',
            _created_at: '2024-01-15T10:00:00.000Z',
            _updated_at: '2024-01-20T12:00:00.000Z',
            _title: 'Sample Coupon',
            name: 'Sample Coupon',
            type: 'fixed',
            fixed_value: 555,
            fixed_value_currency: 'USD',
            fixed_value_decimal: '5.55',
            active: true,
            category: 'cashback',
            prices: {
              $relation: [
                {
                  entity_id: 'abc12345-def6-7890-gh12-ijklmnopqrst',
                  _tags: ['discount', 'special'],
                  _schema: 'price'
                }
              ]
            }
          }
        ]
      }
    ],
    mode: 'create_order'
  },
)
```

<details>
<summary>Response</summary>

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

searchCatalog

`POST /v1/public/catalog`

```ts
const { data } = await client.$searchCatalog(
  {
    X-Ivy-Org-ID: 'example',
    Authorization: 'example',
  },
  {
    q: '_id:1233432 OR _id:123432454 OR _id:23445433',
    sort: 'description ASC',
    from: 0,
    size: 200
  },
)
```

<details>
<summary>Response</summary>

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

privateSearchCatalog

`POST /v1/catalog`

```ts
const { data } = await client.$privateSearchCatalog(
  null,
  {
    q: '_id:1233432 OR _id:123432454 OR _id:23445433',
    sort: 'description ASC',
    from: 0,
    size: 200
  },
)
```

<details>
<summary>Response</summary>

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

validatePromoCodes

`POST /v1/public/validate-promo-codes`

```ts
const { data } = await client.$validatePromoCodes(
  {
    X-Ivy-Org-ID: 'example',
  },
  {},
)
```

<details>
<summary>Response</summary>

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

availabilityCheck

`POST /v1/public/availability:check`

```ts
const { data } = await client.$availabilityCheck(
  {
    X-Ivy-Org-ID: 'example',
  },
  {
    products: ['string'],
    filters: {
      location: {
        street: 'string',
        street_number: 'string',
        postal_code: 'string',
        city: 'string',
        country: 'string'
      },
      available_date: '2017-07-21'
    }
  },
)
```

<details>
<summary>Response</summary>

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

validateAvailabilityFile

`GET /v1/validate-availability/{id}`

```ts
const { data } = await client.$validateAvailabilityFile({
  id: '123e4567-e89b-12d3-a456-426614174000',
  X-Epilot-Org-ID: 'example',
})
```

<details>
<summary>Response</summary>

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

historicMarketPrices

`GET /v1/public/historicMarketPrices`

```ts
const { data } = await client.$historicMarketPrices({
  market: 'example',
  bidding_zone: 'example',
  frequency: 'example',
  from: 'example',
  to: 'example',
})
```

<details>
<summary>Response</summary>

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

averageMarketPrice

`GET /v1/public/averageMarketPrice`

```ts
const { data } = await client.$averageMarketPrice({
  market: 'example',
  bidding_zone: 'example',
  from: 'example',
  to: 'example',
})
```

<details>
<summary>Response</summary>

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

searchExternalProducts

`POST /v1/public/integration/{integrationId}/products`

```ts
const { data } = await client.$searchExternalProducts(
  {
    integrationId: 'example',
  },
  {
    context: {
      journey_id: '8d0a2235-97ce-42d0-88a3-e374634ca44e',
      entity_id: '8d0a2235-97ce-42d0-88a3-e374634ca44e',
      journey_name: 'journey name',
      journey_tags: ['string'],
      journey_url_params: {},
      current_step_name: 'step name',
      current_block_name: 'block name',
      steps_data: [
        {
          step_name: 'string',
          step_index: 0,
          blocks: {
            Adresse: {
              countryCode: 'DE',
              city: 'Koblenz',
              zipCode: '56068',
              streetName: 'Am Alten Hospital',
              houseNumber: '123'
            }
          }
        }
      ]
    }
  },
)
```

<details>
<summary>Response</summary>

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

searchExternalProductRecommendations

`POST /v1/public/integration/{integrationId}/product-recommendations`

```ts
const { data } = await client.$searchExternalProductRecommendations(
  {
    integrationId: 'example',
  },
  {
    context: {
      journey_id: '8d0a2235-97ce-42d0-88a3-e374634ca44e',
      entity_id: '8d0a2235-97ce-42d0-88a3-e374634ca44e',
      journey_name: 'journey name',
      journey_tags: ['string'],
      journey_url_params: {},
      current_step_name: 'step name',
      current_block_name: 'block name',
      steps_data: [
        {
          step_name: 'string',
          step_index: 0,
          blocks: {
            Adresse: {
              countryCode: 'DE',
              city: 'Koblenz',
              zipCode: '56068',
              streetName: 'Am Alten Hospital',
              houseNumber: '123'
            }
          }
        }
      ]
    }
  },
)
```

<details>
<summary>Response</summary>

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

searchProviders

`POST /v1/public/integration/{integrationId}/providers:search`

```ts
const { data } = await client.$searchProviders(
  {
    X-Epilot-Org-ID: 'example',
    integrationId: 'example',
  },
  {
    type: 'power',
    postal_code: 'string',
    city: 'string',
    street: 'string',
    street_number: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

searchStreets

`POST /v1/public/integration/{integrationId}/streets:search`

```ts
const { data } = await client.$searchStreets(
  {
    X-Epilot-Org-ID: 'example',
    integrationId: 'example',
  },
  {
    postal_code: 'string',
    city: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

calculatePricingDetails

`POST /v1/public/integration/{integrationId}/compute-price`

```ts
const { data } = await client.$computePrice(
  {
    X-Epilot-Org-ID: 'example',
    integrationId: 'example',
  },
  {
    postal_code: 'string',
    consumption_type: 'household',
    consumption: 0,
    consumption_HT: 0,
    consumption_NT: 0,
    association_id: 'string',
    billing_period: 'monthly',
    reference_date: 'string',
    type: 'power',
    meter_type: 'classic'
  },
)
```

<details>
<summary>Response</summary>

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

getCredentials

`GET /v1/integration/{integrationId}/credentials`

```ts
const { data } = await client.$getCredentials({
  integrationId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{}
```

</details>

---

### `$saveCredentials`

saveCredentials

`PUT /v1/integration/{integrationId}/credentials:save`

```ts
const { data } = await client.$saveCredentials(
  {
    integrationId: 'example',
  },
  {},
)
```

---

### `$deleteCredentials`

deleteCredentials

`DELETE /v1/integration/{integrationId}/credentials:delete`

```ts
const { data } = await client.$deleteCredentials({
  integrationId: 'example',
})
```

---

### `$getExternalCatalogProducts`

getExternalCatalogProducts

`POST /v1/public/external-catalog/products`

```ts
const { data } = await client.$getExternalCatalogProducts(
  null,
  {
    config: {
      appId: '1234567890',
      componentId: '1234567890',
      hookId: '1234567890'
    },
    origin: 'journey',
    context: {
      journey_id: '8d0a2235-97ce-42d0-88a3-e374634ca44e',
      entity_id: '9e1b3346-a8df-53e1-99b4-f485745db55f',
      journey_name: 'Product Selection Journey',
      journey_tags: ['electricity', 'residential'],
      journey_url_params: {
        utm_source: 'google',
        utm_campaign: 'spring2024'
      },
      current_step_name: 'Product Selection',
      current_block_name: 'Energy Products',
      steps_data: [
        {
          step_name: 'Address Information',
          step_index: 0,
          blocks: {
            Adresse: {
              countryCode: 'DE',
              city: 'Koblenz',
              zipCode: '56068',
              streetName: 'Am Alten Hospital',
              houseNumber: '123'
            }
          }
        }
      ]
    }
  },
)
```

<details>
<summary>Response</summary>

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

getExternalCatalogProductRecommendations

`POST /v1/public/external-catalog/product-recommendations`

```ts
const { data } = await client.$getExternalCatalogProductRecommendations(
  null,
  {
    config: {
      appId: '1234567890',
      componentId: '1234567890',
      hookId: '1234567890'
    },
    origin: 'journey',
    context: {
      journey_id: '8d0a2235-97ce-42d0-88a3-e374634ca44e',
      entity_id: '9e1b3346-a8df-53e1-99b4-f485745db55f',
      journey_name: 'Product Selection Journey',
      journey_tags: ['electricity', 'residential'],
      journey_url_params: {
        utm_source: 'google',
        utm_campaign: 'spring2024'
      },
      current_step_name: 'Product Selection',
      current_block_name: 'Energy Products',
      steps_data: [
        {
          step_name: 'Address Information',
          step_index: 0,
          blocks: {
            Adresse: {
              countryCode: 'DE',
              city: 'Koblenz',
              zipCode: '56068',
              streetName: 'Am Alten Hospital',
              houseNumber: '123'
            }
          }
        }
      ]
    }
  },
)
```

<details>
<summary>Response</summary>

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

productRecommendations

`POST /v1/public/product-recommendations`

```ts
const { data } = await client.$productRecommendations(
  {
    X-Ivy-Org-ID: 'example',
  },
  {
    product_recommendation_ids: ['string'],
    catalog_item: {
      product_id: 'string',
      price_id: 'string'
    },
    contract_id: 'string',
    filters: {
      location: {
        street: 'string',
        street_number: 'string',
        postal_code: 'string',
        city: 'string',
        country: 'string'
      },
      available_date: '2017-07-21'
    }
  },
)
```

<details>
<summary>Response</summary>

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

## Schemas

### `IntegrationId`

```ts
type IntegrationId = "getag" | "external-catalog"
```

### `Error`

```ts
type Error = {
  message: string
  status?: number
  cause?: string
}
```

### `Product`

The product entity

```ts
type Product = {
  description?: string
  code?: string
  type?: "product" | "service"
  name?: string
  categories?: string[]
  feature?: Array<{
    _tags?: string[]
    feature?: string
  }>
  cross_sellable_products?: {
    $relation?: Array<{
      entity_id?: { ... }
      _tags?: { ... }
    }>
  }
  product_images?: {
    $relation?: Array<{
      entity_id?: { ... }
      _tags?: { ... }
    }>
  } | Array<{
    _id: string
    filename: string
    mime_type: string
    versions: Array<{
      s3ref: { ... }
    }>
    _schema: string
    _org: string
    _created_at: string // date-time
    _updated_at: string // date-time
    _title?: string
    $relation?: {
      entity_id?: { ... }
      _tags?: { ... }
    }
  }>
  product_downloads?: {
    $relation?: Array<{
      entity_id?: { ... }
      _tags?: { ... }
    }>
  } | Array<{
    _id: string
    filename: string
    mime_type: string
    versions: Array<{
      s3ref: { ... }
    }>
    _schema: string
    _org: string
    _created_at: string // date-time
    _updated_at: string // date-time
    _title?: string
    $relation?: {
      entity_id?: { ... }
      _tags?: { ... }
    }
  }>
  price_options?: {
    $relation?: Array<{
      entity_id?: { ... }
      _tags?: { ... }
    }>
  }
  _availability_files?: Array<{
    _id: string
    filename: string
    mime_type: string
    versions: Array<{
      s3ref: { ... }
    }>
    _schema: string
    _org: string
    _created_at: string // date-time
    _updated_at: string // date-time
    _title?: string
    $relation?: {
      entity_id?: { ... }
      _tags?: { ... }
    }
  }>
  _id?: string
  _title?: string
  _org_id?: string
  _created_at?: string
  _updated_at?: string
}
```

### `Opportunity`

The opportunity entity

```ts
type Opportunity = {
  opportunity_number?: string
  opportunity_title?: string
  description?: string
  status?: string
  due_date?: string
  assignee?: Array<{
    id?: string
    email?: string
    display_name?: string
    token?: string
    image_uri?: string
    organization_id?: string
    department?: string
    preferred_language?: string
    status?: string
    phone?: string
    email_notification_settings?: object
    is_signature_enabled?: boolean
    created_at?: string
  }>
  customer?: {
    $relation?: Array<{
      entity_id?: { ... }
      _tags?: { ... }
    }>
  }
  dates?: Array<{
    _tags?: string[]
    value?: string
  }>
  billing_address?: {
    $relation_ref?: Array<{
      entity_id?: { ... }
      path?: { ... }
    }>
  }
  delivery_address?: {
    $relation_ref?: Array<{
      entity_id?: { ... }
      path?: { ... }
    }>
  }
  address?: {
    $relation_ref?: Array<{
      entity_id?: { ... }
      path?: { ... }
    }>
  }
  items?: {
    $relation?: Array<{
      entity_id?: { ... }
      _tags?: { ... }
    }>
  }
  _org_id?: string
  _id?: string
  _created_at?: string
  _updated_at?: string
  source_type?: string
  source_id?: string
  source?: {
    http?: string
    title?: string
  }
  _tags?: string[]
}
```

### `Order`

The order entity

```ts
type Order = {
  order_number?: string
  cart_id?: string
  status?: "draft" | "quote" | "placed" | "cancelled" | "completed"
  source_type?: string
  source_id?: string
  source?: {
    http?: string
    title?: string
  }
  metadata?: Array<{
    key?: string
    value?: string
  }>
  customer?: {
    $relation?: Array<{
      entity_id?: { ... }
      _tags?: { ... }
    }>
  }
  billing_first_name?: string
  billing_last_name?: string
  billing_company_name?: string
  billing_vat?: string
  billing_email?: string
  billing_phone?: string
  billing_address?: Array<{
    _tags?: string[]
    street?: string
    street_number?: string
    postal_code?: string
    city?: string
    country?: string
    additional_info?: string
    company_name?: string
    first_name?: string
    last_name?: string
    salutation?: string
    title?: string
  }>
  currency?: string
  delivery_address?: Array<{
    _tags?: string[]
    street?: string
    street_number?: string
    postal_code?: string
    city?: string
    country?: string
    additional_info?: string
    company_name?: string
    first_name?: string
    last_name?: string
    salutation?: string
    title?: string
  }>
  payment_method?: Array<{
    type?: string
    details?: Record<string, unknown>
  }>
  line_items?: Array<{
    metadata?: Array<{
      key?: { ... }
      value?: { ... }
    }>
    quantity?: number
    product_id?: string
    price_id?: string
    description?: string
    product_description?: string
    product_name?: string
    price_mappings?: Array<{
      price_id?: { ... }
      frequency_unit?: { ... }
      name?: { ... }
      value?: { ... }
      metadata?: { ... }
    }>
    is_tax_inclusive?: boolean
    _product?: {
      description?: { ... }
      code?: { ... }
      type?: { ... }
      name?: { ... }
      categories?: { ... }
      feature?: { ... }
      cross_sellable_products?: { ... }
      product_images?: { ... }
      product_downloads?: { ... }
      price_options?: { ... }
      _availability_files?: { ... }
      _id?: { ... }
      _title?: { ... }
      _org_id?: { ... }
      _created_at?: { ... }
      _updated_at?: { ... }
    }
  } | {
    metadata?: Array<{
      key?: { ... }
      value?: { ... }
  // ...
}
```

### `Price`

The price entity schema for simple pricing

```ts
type Price = {
  billing_duration_amount?: number
  billing_duration_unit?: "days" | "weeks" | "months" | "years"
  notice_time_amount?: number
  notice_time_unit?: "days" | "weeks" | "months" | "years"
  termination_time_amount?: number
  termination_time_unit?: "days" | "weeks" | "months" | "years"
  renewal_duration_amount?: number
  renewal_duration_unit?: "days" | "weeks" | "months" | "years"
}
```

### `BaseCompositePrice`

The common properties for a composite price entity, without the price components

```ts
type BaseCompositePrice = {
  billing_duration_amount?: number
  billing_duration_unit?: "days" | "weeks" | "months" | "years"
  notice_time_amount?: number
  notice_time_unit?: "days" | "weeks" | "months" | "years"
  termination_time_amount?: number
  termination_time_unit?: "days" | "weeks" | "months" | "years"
  renewal_duration_amount?: number
  renewal_duration_unit?: "days" | "weeks" | "months" | "years"
}
```

### `NonHydratedCompositePrice`

The composite price entity

```ts
type NonHydratedCompositePrice = {
  billing_duration_amount?: number
  billing_duration_unit?: "days" | "weeks" | "months" | "years"
  notice_time_amount?: number
  notice_time_unit?: "days" | "weeks" | "months" | "years"
  termination_time_amount?: number
  termination_time_unit?: "days" | "weeks" | "months" | "years"
  renewal_duration_amount?: number
  renewal_duration_unit?: "days" | "weeks" | "months" | "years"
}
```

### `HydratedCompositePrice`

The composite price entity

```ts
type HydratedCompositePrice = {
  billing_duration_amount?: number
  billing_duration_unit?: "days" | "weeks" | "months" | "years"
  notice_time_amount?: number
  notice_time_unit?: "days" | "weeks" | "months" | "years"
  termination_time_amount?: number
  termination_time_unit?: "days" | "weeks" | "months" | "years"
  renewal_duration_amount?: number
  renewal_duration_unit?: "days" | "weeks" | "months" | "years"
}
```

### `CompositePrice`

The composite price entity

```ts
type CompositePrice = {
  billing_duration_amount?: number
  billing_duration_unit?: "days" | "weeks" | "months" | "years"
  notice_time_amount?: number
  notice_time_unit?: "days" | "weeks" | "months" | "years"
  termination_time_amount?: number
  termination_time_unit?: "days" | "weeks" | "months" | "years"
  renewal_duration_amount?: number
  renewal_duration_unit?: "days" | "weeks" | "months" | "years"
} | {
  billing_duration_amount?: number
  billing_duration_unit?: "days" | "weeks" | "months" | "years"
  notice_time_amount?: number
  notice_time_unit?: "days" | "weeks" | "months" | "years"
  termination_time_amount?: number
  termination_time_unit?: "days" | "weeks" | "months" | "years"
  renewal_duration_amount?: number
  renewal_duration_unit?: "days" | "weeks" | "months" | "years"
}
```

### `PriceComponentRelation`

```ts
type PriceComponentRelation = {
  entity_id?: string
  quantity?: number
  _tags?: string[]
}
```

### `MetaData`

A set of key-value pairs used to store meta data information about an entity.

```ts
type MetaData = Array<{
  key?: string
  value?: string
}>
```

### `PriceInputMappings`

```ts
type PriceInputMappings = Array<{
  price_id?: string
  frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
  name?: string
  value?: number
  metadata?: Record<string, string>
}>
```

### `PriceInputMapping`

```ts
type PriceInputMapping = {
  price_id?: string
  frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
  name?: string
  value?: number
  metadata?: Record<string, string>
}
```

### `PriceConditions`

```ts
type PriceConditions = {
  billing_duration_amount?: number
  billing_duration_unit?: "days" | "weeks" | "months" | "years"
  notice_time_amount?: number
  notice_time_unit?: "days" | "weeks" | "months" | "years"
  termination_time_amount?: number
  termination_time_unit?: "days" | "weeks" | "months" | "years"
  renewal_duration_amount?: number
  renewal_duration_unit?: "days" | "weeks" | "months" | "years"
}
```

### `ExternalFeeMetadata`

```ts
type ExternalFeeMetadata = {
  amount_total: number
  amount_total_decimal: string
  amount_static?: number
  amount_static_decimal?: unknown
  amount_variable_ht?: number
  amount_variable_decimal_ht?: string
  unit_amount_variable_ht?: number
  unit_amount_variable_decimal_ht?: string
  amount_variable_nt?: number
  amount_variable_decimal_nt?: string
  unit_amount_variable_nt?: number
  unit_amount_variable_decimal_nt?: string
  currency: string
  billing_period: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
  breakdown: {
    static?: Record<string, {
      amount: { ... }
      amount_decimal: { ... }
      unit_amount?: { ... }
      unit_amount_decimal?: { ... }
    }>
    variable?: Record<string, {
      amount: { ... }
      amount_decimal: { ... }
      unit_amount?: { ... }
      unit_amount_decimal?: { ... }
    }>
    variable_ht?: Record<string, {
      amount: { ... }
      amount_decimal: { ... }
      unit_amount?: { ... }
      unit_amount_decimal?: { ... }
    }>
    variable_nt?: Record<string, {
      amount: { ... }
      amount_decimal: { ... }
      unit_amount?: { ... }
      unit_amount_decimal?: { ... }
    }>
  }
  _meta?: {
    signature: string
    timestamp: number
  }
}
```

### `ExternalPriceMetadata`

```ts
type ExternalPriceMetadata = {
  market: "day_ahead"
  bidding_zone: "AT" | "DE-LU"
  price: {
    unit_amount: number
    unit_amount_decimal: string
    unit_amount_currency: string
    timestamp: string
  }
  _meta?: {
    signature: string
    timestamp: number
  }
}
```

### `ExternalFeeMappings`

```ts
type ExternalFeeMappings = Array<{
  price_id?: string
  frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
  amount_total?: number
  amount_total_decimal?: string
}>
```

### `ExternalFeeMapping`

```ts
type ExternalFeeMapping = {
  price_id?: string
  frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
  amount_total?: number
  amount_total_decimal?: string
}
```

### `CatalogSearch`

A catalog search payload

```ts
type CatalogSearch = {
  q: string
  sort?: string
  from?: number
  size?: number
  hydrate?: boolean
  availability?: {
    location: {
      street?: { ... }
      street_number?: { ... }
      postal_code?: { ... }
      city?: { ... }
      country?: { ... }
    }
    available_date?: string // date
  }
}
```

### `CatalogSearchResult`

The query result payload

```ts
type CatalogSearchResult = {
  hits?: number
  results?: Array<{
    description?: string
    code?: string
    type?: "product" | "service"
    name?: string
    categories?: string[]
    feature?: Array<{
      _tags?: { ... }
      feature?: { ... }
    }>
    cross_sellable_products?: {
      $relation?: { ... }
    }
    product_images?: {
      $relation?: { ... }
    } | Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    product_downloads?: {
      $relation?: { ... }
    } | Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    price_options?: {
      $relation?: { ... }
    }
    _availability_files?: Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    _id?: string
    _title?: string
    _org_id?: string
    _created_at?: string
    _updated_at?: string
  } | {
    billing_duration_amount?: number
    billing_duration_unit?: "days" | "weeks" | "months" | "years"
    notice_time_amount?: number
    notice_time_unit?: "days" | "weeks" | "months" | "years"
    termination_time_amount?: number
    termination_time_unit?: "days" | "weeks" | "months" | "years"
    renewal_duration_amount?: number
    renewal_duration_unit?: "days" | "weeks" | "months" | "years"
  } | {
    _id: string // uuid
    _title: string
    _org: string
    _schema: "coupon"
    _tags?: string[]
    _created_at: string // date-time
    _updated_at: string // date-time
    name: string
    description?: string
    type: "fixed" | "percentage"
    category: "discount" | "cashback"
    percentage_value?: string
    fixed_value?: number
    fixed_value_decimal?: string
    fixed_value_currency?: string
    cashback_period?: "0" | "12"
    active?: boolean
    requires_promo_code?: boolean
  }>
}
```

### `SearchProvidersParams`

A search providers payload

```ts
type SearchProvidersParams = {
  type: "power" | "gas"
  postal_code: string
  city?: string
  street?: string
  street_number?: string
}
```

### `SearchStreetsParams`

A search streets payload

```ts
type SearchStreetsParams = {
  postal_code: string
  city: string
}
```

### `AvailabilityCheckParams`

Availability check request payload

```ts
type AvailabilityCheckParams = {
  products: string[]
  filters: {
    location: {
      street?: { ... }
      street_number?: { ... }
      postal_code?: { ... }
      city?: { ... }
      country?: { ... }
    }
    available_date?: string // date
  }
}
```

### `AvailabilityResult`

The product availability check result payload

```ts
type AvailabilityResult = {
  available_products: string[]
  check_results?: Array<{
    product_id: string
    matching_hits?: number
    matching_error?: Record<string, unknown>
  }>
}
```

### `ValidateAvailabilityFileError`

The availability rule error

```ts
type ValidateAvailabilityFileError = {
  line?: number
  msg: string
  data?: string
}
```

### `IntegrationCredentialsResult`

The auth credentials for external integrations

```ts
type IntegrationCredentialsResult = {
  username: string
  password: string
  auth_type?: "basic_auth"
  base_url?: string
} | {
  auth_type: "oauth"
  oauth: {
    client_id: string
    client_secret: string
    authorization_url: string
    grant_type: "client_credentials"
    scope?: string
    access_token?: string
    access_token_expires_in?: number
    access_token_expires_at?: number
  }
  base_url?: string
}
```

### `SaveIntegrationCredentialsParams`

The auth credentials for external integrations

```ts
type SaveIntegrationCredentialsParams = {
  username: string
  password: string
  auth_type?: "basic_auth"
  base_url?: string
} | {
  auth_type: "oauth"
  oauth: {
    client_id: string
    client_secret: string
    authorization_url: string
    grant_type: "client_credentials"
    scope?: string
    access_token?: string
    access_token_expires_in?: number
    access_token_expires_at?: number
  }
  base_url?: string
}
```

### `ComputePriceParamsBase`

```ts
type ComputePriceParamsBase = {
  postal_code: string
  consumption_type?: "household" | "heating_pump" | "night_storage_heating" | "night_storage_heating_common_meter"
  consumption?: number
  consumption_HT?: number
  consumption_NT?: number
  association_id?: string
  billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
  reference_date?: string // date
}
```

### `ComputePriceParamsPower`

```ts
type ComputePriceParamsPower = {
  postal_code: string
  consumption_type?: "household" | "heating_pump" | "night_storage_heating" | "night_storage_heating_common_meter"
  consumption?: number
  consumption_HT?: number
  consumption_NT?: number
  association_id?: string
  billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
  reference_date?: string // date
  type: "power"
  meter_type?: "classic" | "smart" | "digital"
}
```

### `ComputePriceParamsGas`

```ts
type ComputePriceParamsGas = {
  postal_code: string
  consumption_type?: "household" | "heating_pump" | "night_storage_heating" | "night_storage_heating_common_meter"
  consumption?: number
  consumption_HT?: number
  consumption_NT?: number
  association_id?: string
  billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
  reference_date?: string // date
  type: "gas"
  concession_type?: "standard" | "special"
}
```

### `SignatureMeta`

Signature meta data payload

```ts
type SignatureMeta = {
  signature: string
  timestamp: number
}
```

### `ComputedBasePrice`

The computed price

```ts
type ComputedBasePrice = {
  amount: number
  amount_decimal: string
  unit_amount?: number
  unit_amount_decimal?: string
}
```

### `ComputePriceParams`

The compute price payload

```ts
type ComputePriceParams = {
  postal_code: string
  consumption_type?: "household" | "heating_pump" | "night_storage_heating" | "night_storage_heating_common_meter"
  consumption?: number
  consumption_HT?: number
  consumption_NT?: number
  association_id?: string
  billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
  reference_date?: string // date
  type: "power"
  meter_type?: "classic" | "smart" | "digital"
} | {
  postal_code: string
  consumption_type?: "household" | "heating_pump" | "night_storage_heating" | "night_storage_heating_common_meter"
  consumption?: number
  consumption_HT?: number
  consumption_NT?: number
  association_id?: string
  billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
  reference_date?: string // date
  type: "gas"
  concession_type?: "standard" | "special"
}
```

### `GasConcessionType`

The concession type for gas

```ts
type GasConcessionType = "standard" | "special"
```

### `PowerMeterType`

The meter type for power

```ts
type PowerMeterType = "classic" | "smart" | "digital"
```

### `DynamicTariffMode`

The mode of the dynamic tariff. `day_ahead_market` uses the Day-Ahead spot market price as base.

```ts
type DynamicTariffMode = "day_ahead_market" | "manual"
```

### `DynamicTariffInterval`

The interval of the tariff if a spot market price is used as base.

```ts
type DynamicTariffInterval = "hourly" | "monthly_average"
```

### `ComputedPriceBreakdown`

Price breakdown

```ts
type ComputedPriceBreakdown = {
  static?: Record<string, {
    amount: number
    amount_decimal: string
    unit_amount?: number
    unit_amount_decimal?: string
  }>
  variable?: Record<string, {
    amount: number
    amount_decimal: string
    unit_amount?: number
    unit_amount_decimal?: string
  }>
  variable_ht?: Record<string, {
    amount: number
    amount_decimal: string
    unit_amount?: number
    unit_amount_decimal?: string
  }>
  variable_nt?: Record<string, {
    amount: number
    amount_decimal: string
    unit_amount?: number
    unit_amount_decimal?: string
  }>
}
```

### `ComputedPriceComponents`

The computed price components

```ts
type ComputedPriceComponents = Record<string, {
  amount: number
  amount_decimal: string
  unit_amount?: number
  unit_amount_decimal?: string
}>
```

### `ComputePriceResult`

```ts
type ComputePriceResult = {
  amount_total: number
  amount_total_decimal: string
  amount_static?: number
  amount_static_decimal?: unknown
  amount_variable_ht?: number
  amount_variable_decimal_ht?: string
  unit_amount_variable_ht?: number
  unit_amount_variable_decimal_ht?: string
  amount_variable_nt?: number
  amount_variable_decimal_nt?: string
  unit_amount_variable_nt?: number
  unit_amount_variable_decimal_nt?: string
  currency: string
  billing_period: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
  breakdown: {
    static?: Record<string, {
      amount: { ... }
      amount_decimal: { ... }
      unit_amount?: { ... }
      unit_amount_decimal?: { ... }
    }>
    variable?: Record<string, {
      amount: { ... }
      amount_decimal: { ... }
      unit_amount?: { ... }
      unit_amount_decimal?: { ... }
    }>
    variable_ht?: Record<string, {
      amount: { ... }
      amount_decimal: { ... }
      unit_amount?: { ... }
      unit_amount_decimal?: { ... }
    }>
    variable_nt?: Record<string, {
      amount: { ... }
      amount_decimal: { ... }
      unit_amount?: { ... }
      unit_amount_decimal?: { ... }
    }>
  }
  _meta?: {
    signature: string
    timestamp: number
  }
}
```

### `SpotMarketBiddingZone`

The bidding zone for a spot market price.

```ts
type SpotMarketBiddingZone = "AT" | "DE-LU"
```

### `SpotMarketType`

The market for a spot market price.

```ts
type SpotMarketType = "day_ahead"
```

### `SpotMarketDataFrequency`

The aggregation frequency for a series of spot market price data.

```ts
type SpotMarketDataFrequency = "PT15M" | "PT1H" | "P1D" | "P1M"
```

### `HistoricMarketPricesResult`

```ts
type HistoricMarketPricesResult = {
  market: "day_ahead"
  bidding_zone: "AT" | "DE-LU"
  prices: Array<{
    unit_amount: number
    unit_amount_decimal: string
    unit_amount_currency: string
    timestamp: string // date-time
  }>
}
```

### `AverageMarketPriceResult`

```ts
type AverageMarketPriceResult = {
  market: "day_ahead"
  bidding_zone: "AT" | "DE-LU"
  price: {
    unit_amount: number
    unit_amount_decimal: string
    unit_amount_currency: string
    timestamp: string
  }
  _meta?: {
    signature: string
    timestamp: number
  }
}
```

### `AverageMarketPriceRecord`

An average market price over a given period in time.

```ts
type AverageMarketPriceRecord = {
  unit_amount: number
  unit_amount_decimal: string
  unit_amount_currency: string
  timestamp: string
}
```

### `HistoricMarketPriceRecord`

A market price at a given point in time.

```ts
type HistoricMarketPriceRecord = {
  unit_amount: number
  unit_amount_decimal: string
  unit_amount_currency: string
  timestamp: string // date-time
}
```

### `BaseMarketPriceRecord`

```ts
type BaseMarketPriceRecord = {
  unit_amount: number
  unit_amount_decimal: string
  unit_amount_currency: string
}
```

### `OAuthCredentials`

```ts
type OAuthCredentials = {
  client_id: string
  client_secret: string
  authorization_url: string
  grant_type: "client_credentials"
  scope?: string
  access_token?: string
  access_token_expires_in?: number
  access_token_expires_at?: number
}
```

### `BasicAuthCredentials`

```ts
type BasicAuthCredentials = {
  username: string
  password: string
}
```

### `BasicAuthIntegration`

```ts
type BasicAuthIntegration = {
  username: string
  password: string
  auth_type?: "basic_auth"
  base_url?: string
}
```

### `OAuthIntegration`

```ts
type OAuthIntegration = {
  auth_type: "oauth"
  oauth: {
    client_id: string
    client_secret: string
    authorization_url: string
    grant_type: "client_credentials"
    scope?: string
    access_token?: string
    access_token_expires_in?: number
    access_token_expires_at?: number
  }
  base_url?: string
}
```

### `IntegrationAuthCredentials`

The auth credentials for external integrations

```ts
type IntegrationAuthCredentials = {
  username: string
  password: string
  auth_type?: "basic_auth"
  base_url?: string
} | {
  auth_type: "oauth"
  oauth: {
    client_id: string
    client_secret: string
    authorization_url: string
    grant_type: "client_credentials"
    scope?: string
    access_token?: string
    access_token_expires_in?: number
    access_token_expires_at?: number
  }
  base_url?: string
}
```

### `SearchStreetsResult`

The search providers payload

```ts
type SearchStreetsResult = Array<{
  street: string
}>
```

### `SearchProvidersResult`

The search providers payload

```ts
type SearchProvidersResult = Array<{
  name: string
  code: string
}>
```

### `Provider`

The provider entity

```ts
type Provider = {
  name: string
  code: string
}
```

### `Street`

The street entity

```ts
type Street = {
  street: string
}
```

### `ValidateAvailabilityFileResult`

The availability map file result payload

```ts
type ValidateAvailabilityFileResult = {
  status: "success" | "error"
  rules_parsed_count: number
  errors: Array<{
    line?: number
    msg: string
    data?: string
  }>
}
```

### `CartDto`

A valid cart payload from a client.

```ts
type CartDto = {
  metadata?: Array<{
    key?: string
    value?: string
  }>
  customer?: {
    first_name?: string
    last_name?: string
    company_name?: string
    vat_id?: string
    email?: string
    phone?: string
  }
  billing_address?: {
    _tags?: string[]
    street?: string
    street_number?: string
    postal_code?: string
    city?: string
    country?: string
    additional_info?: string
    company_name?: string
    first_name?: string
    last_name?: string
    salutation?: string
    title?: string
  }
  delivery_address?: {
    _tags?: string[]
    street?: string
    street_number?: string
    postal_code?: string
    city?: string
    country?: string
    additional_info?: string
    company_name?: string
    first_name?: string
    last_name?: string
    salutation?: string
    title?: string
  }
  source_type?: string
  source_id?: string
  source?: {
    http?: string
    title?: string
  }
  additional_addresses?: Array<{
    _tags?: string[]
    street?: string
    street_number?: string
    postal_code?: string
    city?: string
    country?: string
    additional_info?: string
    company_name?: string
    first_name?: string
    last_name?: string
    salutation?: string
    title?: string
  }>
  payment_method?: {
    type?: string
    details?: Record<string, unknown>
  }
  line_items: Array<{
    external_fees_mappings?: Array<{
      price_id?: { ... }
      frequency_unit?: { ... }
      amount_total?: { ... }
      amount_total_decimal?: { ... }
    }>
    external_fees_metadata?: {
      amount_total: { ... }
      amount_total_decimal: { ... }
      amount_static?: { ... }
      amount_static_decimal?: { ... }
      amount_variable_ht?: { ... }
      amount_variable_decimal_ht?: { ... }
      unit_amount_variable_ht?: { ... }
      unit_amount_variable_decimal_ht?: { ... }
      amount_variable_nt?: { ... }
      amount_variable_decimal_nt?: { ... }
      unit_amount_variable_nt?: { ... }
      unit_amount_variable_decimal_nt?: { ... }
      currency: { ... }
      billing_period: { ... }
      breakdown: { ... }
      _meta?: { ... }
    }
    external_price_metadata?: {
      market: { ... }
      bidding_zone: { ... }
      price: { ... }
      _meta?: { ... }
    }
    _immutable_pricing_details?: {
      items?: { ... }
      amount_subtotal?: { ... }
      amount_total?: { ... }
  // ...
}
```

### `CheckoutCart`

The cart checkout request payload

```ts
type CheckoutCart = {
  cart?: string | {
    metadata?: Array<{
      key?: { ... }
      value?: { ... }
    }>
    customer?: {
      first_name?: { ... }
      last_name?: { ... }
      company_name?: { ... }
      vat_id?: { ... }
      email?: { ... }
      phone?: { ... }
    }
    billing_address?: {
      _tags?: { ... }
      street?: { ... }
      street_number?: { ... }
      postal_code?: { ... }
      city?: { ... }
      country?: { ... }
      additional_info?: { ... }
      company_name?: { ... }
      first_name?: { ... }
      last_name?: { ... }
      salutation?: { ... }
      title?: { ... }
    }
    delivery_address?: {
      _tags?: { ... }
      street?: { ... }
      street_number?: { ... }
      postal_code?: { ... }
      city?: { ... }
      country?: { ... }
      additional_info?: { ... }
      company_name?: { ... }
      first_name?: { ... }
      last_name?: { ... }
      salutation?: { ... }
      title?: { ... }
    }
    source_type?: string
    source_id?: string
    source?: {
      http?: { ... }
      title?: { ... }
    }
    additional_addresses?: Array<{
      _tags?: { ... }
      street?: { ... }
      street_number?: { ... }
      postal_code?: { ... }
      city?: { ... }
      country?: { ... }
      additional_info?: { ... }
      company_name?: { ... }
      first_name?: { ... }
      last_name?: { ... }
      salutation?: { ... }
      title?: { ... }
    }>
    payment_method?: {
      type?: { ... }
      details?: { ... }
    }
    line_items: Array<{
      external_fees_mappings?: { ... }
      external_fees_metadata?: { ... }
      external_price_metadata?: { ... }
      _immutable_pricing_details?: { ... }
      coupon_ids?: { ... }
      taxes?: { ... }
      recurrences?: { ... }
      _coupons?: { ... }
      type?: { ... }
      billing_period?: { ... }
      unit_amount?: { ... }
      unit_amount_gross?: { ... }
      unit_amount_currency?: { ... }
      unit_amount_decimal?: { ... }
      is_composite_price?: { ... }
      pricing_model?: { ... }
      _price?: { ... }
    } | {
      external_fees_mappings?: { ... }
      external_fees_metadata?: { ... }
      external_price_metadata?: { ... }
      _immutable_pricing_details?: { ... }
      coupon_ids?: { ... }
      taxes?: { ... }
      recurrences?: { ... }
      _coupons?: { ... }
      is_composite_price: { ... }
      item_components?: { ... }
      selected_price_component_ids?: { ... }
      price_component_coupon_ids?: { ... }
      _price?: { ... }
    }>
    files?: string[]
  // ...
}
```

### `CheckoutCartResult`

The cart checkout result

```ts
type CheckoutCartResult = {
  order?: {
    order_number?: string
    cart_id?: string
    status?: "draft" | "quote" | "placed" | "cancelled" | "completed"
    source_type?: string
    source_id?: string
    source?: {
      http?: { ... }
      title?: { ... }
    }
    metadata?: Array<{
      key?: { ... }
      value?: { ... }
    }>
    customer?: {
      $relation?: { ... }
    }
    billing_first_name?: string
    billing_last_name?: string
    billing_company_name?: string
    billing_vat?: string
    billing_email?: string
    billing_phone?: string
    billing_address?: Array<{
      _tags?: { ... }
      street?: { ... }
      street_number?: { ... }
      postal_code?: { ... }
      city?: { ... }
      country?: { ... }
      additional_info?: { ... }
      company_name?: { ... }
      first_name?: { ... }
      last_name?: { ... }
      salutation?: { ... }
      title?: { ... }
    }>
    currency?: string
    delivery_address?: Array<{
      _tags?: { ... }
      street?: { ... }
      street_number?: { ... }
      postal_code?: { ... }
      city?: { ... }
      country?: { ... }
      additional_info?: { ... }
      company_name?: { ... }
      first_name?: { ... }
      last_name?: { ... }
      salutation?: { ... }
      title?: { ... }
    }>
    payment_method?: Array<{
      type?: { ... }
      details?: { ... }
    }>
    line_items?: Array<{
      metadata?: { ... }
      quantity?: { ... }
      product_id?: { ... }
      price_id?: { ... }
      description?: { ... }
      product_description?: { ... }
      product_name?: { ... }
      price_mappings?: { ... }
      is_tax_inclusive?: { ... }
      _product?: { ... }
    } | {
      metadata?: { ... }
      quantity?: { ... }
      product_id?: { ... }
      price_id?: { ... }
      description?: { ... }
      product_description?: { ... }
      product_name?: { ... }
      price_mappings?: { ... }
      is_tax_inclusive?: { ... }
      _product?: { ... }
    }>
    products?: {
      $relation?: { ... }
    }
    prices?: {
      $relation?: { ... }
    }
    coupons?: {
      $relation?: { ... }
    }
    amount_subtotal?: number
    amount_total?: number
    total_details?: {
      amount_shipping?: { ... }
      amount_tax?: { ... }
      breakdown?: { ... }
    }
    _org_id?: string
    _id?: string
    _created_at?: string
    _updated_at?: string
  // ...
}
```

### `CheckoutMode`

The checkout mode for the cart checkout.

```ts
type CheckoutMode = "create_order" | "create_invoice" | "create_quote"
```

### `OrderStatus`


| status      | description |
|-------------|-------|
| `draft`     | ​​Starting state for all orders, at this point we can still edit the order |
| `quote`     | The order is in a quoting phase, bound to an expiration date |
| `placed`    | The order has been paid and can now be fulfilled (shipped

```ts
type OrderStatus = "draft" | "quote" | "placed" | "cancelled" | "completed"
```

### `BasePriceItemCommon`

Represents the common keys in BasePriceItem and BasePriceItemDto

```ts
type BasePriceItemCommon = {
  metadata?: Array<{
    key?: string
    value?: string
  }>
  quantity?: number
  product_id?: string
  price_id?: string
  description?: string
  product_description?: string
  product_name?: string
  price_mappings?: Array<{
    price_id?: string
    frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    name?: string
    value?: number
    metadata?: Record<string, string>
  }>
  is_tax_inclusive?: boolean
  _product?: {
    description?: string
    code?: string
    type?: "product" | "service"
    name?: string
    categories?: string[]
    feature?: Array<{
      _tags?: { ... }
      feature?: { ... }
    }>
    cross_sellable_products?: {
      $relation?: { ... }
    }
    product_images?: {
      $relation?: { ... }
    } | Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    product_downloads?: {
      $relation?: { ... }
    } | Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    price_options?: {
      $relation?: { ... }
    }
    _availability_files?: Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    _id?: string
    _title?: string
    _org_id?: string
    _created_at?: string
    _updated_at?: string
  }
}
```

### `PriceItemDtoUnion`

```ts
type PriceItemDtoUnion = {
  external_fees_mappings?: Array<{
    price_id?: string
    frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    amount_total?: number
    amount_total_decimal?: string
  }>
  external_fees_metadata?: {
    amount_total: number
    amount_total_decimal: string
    amount_static?: number
    amount_static_decimal?: unknown
    amount_variable_ht?: number
    amount_variable_decimal_ht?: string
    unit_amount_variable_ht?: number
    unit_amount_variable_decimal_ht?: string
    amount_variable_nt?: number
    amount_variable_decimal_nt?: string
    unit_amount_variable_nt?: number
    unit_amount_variable_decimal_nt?: string
    currency: string
    billing_period: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    breakdown: {
      static?: { ... }
      variable?: { ... }
      variable_ht?: { ... }
      variable_nt?: { ... }
    }
    _meta?: {
      signature: { ... }
      timestamp: { ... }
    }
  }
  external_price_metadata?: {
    market: "day_ahead"
    bidding_zone: "AT" | "DE-LU"
    price: {
      unit_amount: { ... }
      unit_amount_decimal: { ... }
      unit_amount_currency: { ... }
      timestamp: { ... }
    }
    _meta?: {
      signature: { ... }
      timestamp: { ... }
    }
  }
  _immutable_pricing_details?: {
    items?: Array<{
      metadata?: { ... }
      quantity?: { ... }
      product_id?: { ... }
      price_id?: { ... }
      description?: { ... }
      product_description?: { ... }
      product_name?: { ... }
      price_mappings?: { ... }
      is_tax_inclusive?: { ... }
      _product?: { ... }
    } | {
      metadata?: { ... }
      quantity?: { ... }
      product_id?: { ... }
      price_id?: { ... }
      description?: { ... }
      product_description?: { ... }
      product_name?: { ... }
      price_mappings?: { ... }
      is_tax_inclusive?: { ... }
      _product?: { ... }
    }>
    amount_subtotal?: number
    amount_total?: number
    unit_amount_gross?: number
    unit_amount_net?: number
    amount_tax?: number
    total_details?: {
      amount_shipping?: { ... }
      amount_tax?: { ... }
      breakdown?: { ... }
    }
    currency?: string
    redeemed_promos?: Array<{
      code: { ... }
      coupons: { ... }
    }>
  }
  coupon_ids?: string[]
  taxes?: Array<{
    rate?: string
    tax?: {
      _id: { ... }
      _title: { ... }
      _org: { ... }
      _schema: { ... }
      _tags?: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      type: { ... }
      description?: { ... }
  // ...
}
```

### `PriceItemsDto`

A valid set of product prices, quantities, (discounts) and taxes from a client.

```ts
type PriceItemsDto = Array<{
  external_fees_mappings?: Array<{
    price_id?: string
    frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    amount_total?: number
    amount_total_decimal?: string
  }>
  external_fees_metadata?: {
    amount_total: number
    amount_total_decimal: string
    amount_static?: number
    amount_static_decimal?: unknown
    amount_variable_ht?: number
    amount_variable_decimal_ht?: string
    unit_amount_variable_ht?: number
    unit_amount_variable_decimal_ht?: string
    amount_variable_nt?: number
    amount_variable_decimal_nt?: string
    unit_amount_variable_nt?: number
    unit_amount_variable_decimal_nt?: string
    currency: string
    billing_period: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    breakdown: {
      static?: { ... }
      variable?: { ... }
      variable_ht?: { ... }
      variable_nt?: { ... }
    }
    _meta?: {
      signature: { ... }
      timestamp: { ... }
    }
  }
  external_price_metadata?: {
    market: "day_ahead"
    bidding_zone: "AT" | "DE-LU"
    price: {
      unit_amount: { ... }
      unit_amount_decimal: { ... }
      unit_amount_currency: { ... }
      timestamp: { ... }
    }
    _meta?: {
      signature: { ... }
      timestamp: { ... }
    }
  }
  _immutable_pricing_details?: {
    items?: Array<{
      metadata?: { ... }
      quantity?: { ... }
      product_id?: { ... }
      price_id?: { ... }
      description?: { ... }
      product_description?: { ... }
      product_name?: { ... }
      price_mappings?: { ... }
      is_tax_inclusive?: { ... }
      _product?: { ... }
    } | {
      metadata?: { ... }
      quantity?: { ... }
      product_id?: { ... }
      price_id?: { ... }
      description?: { ... }
      product_description?: { ... }
      product_name?: { ... }
      price_mappings?: { ... }
      is_tax_inclusive?: { ... }
      _product?: { ... }
    }>
    amount_subtotal?: number
    amount_total?: number
    unit_amount_gross?: number
    unit_amount_net?: number
    amount_tax?: number
    total_details?: {
      amount_shipping?: { ... }
      amount_tax?: { ... }
      breakdown?: { ... }
    }
    currency?: string
    redeemed_promos?: Array<{
      code: { ... }
      coupons: { ... }
    }>
  }
  coupon_ids?: string[]
  taxes?: Array<{
    rate?: string
    tax?: {
      _id: { ... }
      _title: { ... }
      _org: { ... }
      _schema: { ... }
      _tags?: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      type: { ... }
      description?: { ... }
  // ...
}
```

### `BasePriceItemDto`

Represents a valid base price item from a client.

```ts
type BasePriceItemDto = {
  metadata?: Array<{
    key?: string
    value?: string
  }>
  quantity?: number
  product_id?: string
  price_id?: string
  description?: string
  product_description?: string
  product_name?: string
  price_mappings?: Array<{
    price_id?: string
    frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    name?: string
    value?: number
    metadata?: Record<string, string>
  }>
  is_tax_inclusive?: boolean
  _product?: {
    description?: string
    code?: string
    type?: "product" | "service"
    name?: string
    categories?: string[]
    feature?: Array<{
      _tags?: { ... }
      feature?: { ... }
    }>
    cross_sellable_products?: {
      $relation?: { ... }
    }
    product_images?: {
      $relation?: { ... }
    } | Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    product_downloads?: {
      $relation?: { ... }
    } | Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    price_options?: {
      $relation?: { ... }
    }
    _availability_files?: Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    _id?: string
    _title?: string
    _org_id?: string
    _created_at?: string
    _updated_at?: string
  }
}
```

### `PriceItemDto`

Represents a price input to the pricing library.

```ts
type PriceItemDto = {
  external_fees_mappings?: Array<{
    price_id?: string
    frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    amount_total?: number
    amount_total_decimal?: string
  }>
  external_fees_metadata?: {
    amount_total: number
    amount_total_decimal: string
    amount_static?: number
    amount_static_decimal?: unknown
    amount_variable_ht?: number
    amount_variable_decimal_ht?: string
    unit_amount_variable_ht?: number
    unit_amount_variable_decimal_ht?: string
    amount_variable_nt?: number
    amount_variable_decimal_nt?: string
    unit_amount_variable_nt?: number
    unit_amount_variable_decimal_nt?: string
    currency: string
    billing_period: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    breakdown: {
      static?: { ... }
      variable?: { ... }
      variable_ht?: { ... }
      variable_nt?: { ... }
    }
    _meta?: {
      signature: { ... }
      timestamp: { ... }
    }
  }
  external_price_metadata?: {
    market: "day_ahead"
    bidding_zone: "AT" | "DE-LU"
    price: {
      unit_amount: { ... }
      unit_amount_decimal: { ... }
      unit_amount_currency: { ... }
      timestamp: { ... }
    }
    _meta?: {
      signature: { ... }
      timestamp: { ... }
    }
  }
  _immutable_pricing_details?: {
    items?: Array<{
      metadata?: { ... }
      quantity?: { ... }
      product_id?: { ... }
      price_id?: { ... }
      description?: { ... }
      product_description?: { ... }
      product_name?: { ... }
      price_mappings?: { ... }
      is_tax_inclusive?: { ... }
      _product?: { ... }
    } | {
      metadata?: { ... }
      quantity?: { ... }
      product_id?: { ... }
      price_id?: { ... }
      description?: { ... }
      product_description?: { ... }
      product_name?: { ... }
      price_mappings?: { ... }
      is_tax_inclusive?: { ... }
      _product?: { ... }
    }>
    amount_subtotal?: number
    amount_total?: number
    unit_amount_gross?: number
    unit_amount_net?: number
    amount_tax?: number
    total_details?: {
      amount_shipping?: { ... }
      amount_tax?: { ... }
      breakdown?: { ... }
    }
    currency?: string
    redeemed_promos?: Array<{
      code: { ... }
      coupons: { ... }
    }>
  }
  coupon_ids?: string[]
  taxes?: Array<{
    rate?: string
    tax?: {
      _id: { ... }
      _title: { ... }
      _org: { ... }
      _schema: { ... }
      _tags?: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      type: { ... }
      description?: { ... }
  // ...
}
```

### `CompositePriceItemDto`

Represents a composite price input to the pricing library.

```ts
type CompositePriceItemDto = {
  external_fees_mappings?: Array<{
    price_id?: string
    frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    amount_total?: number
    amount_total_decimal?: string
  }>
  external_fees_metadata?: {
    amount_total: number
    amount_total_decimal: string
    amount_static?: number
    amount_static_decimal?: unknown
    amount_variable_ht?: number
    amount_variable_decimal_ht?: string
    unit_amount_variable_ht?: number
    unit_amount_variable_decimal_ht?: string
    amount_variable_nt?: number
    amount_variable_decimal_nt?: string
    unit_amount_variable_nt?: number
    unit_amount_variable_decimal_nt?: string
    currency: string
    billing_period: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    breakdown: {
      static?: { ... }
      variable?: { ... }
      variable_ht?: { ... }
      variable_nt?: { ... }
    }
    _meta?: {
      signature: { ... }
      timestamp: { ... }
    }
  }
  external_price_metadata?: {
    market: "day_ahead"
    bidding_zone: "AT" | "DE-LU"
    price: {
      unit_amount: { ... }
      unit_amount_decimal: { ... }
      unit_amount_currency: { ... }
      timestamp: { ... }
    }
    _meta?: {
      signature: { ... }
      timestamp: { ... }
    }
  }
  _immutable_pricing_details?: {
    items?: Array<{
      metadata?: { ... }
      quantity?: { ... }
      product_id?: { ... }
      price_id?: { ... }
      description?: { ... }
      product_description?: { ... }
      product_name?: { ... }
      price_mappings?: { ... }
      is_tax_inclusive?: { ... }
      _product?: { ... }
    } | {
      metadata?: { ... }
      quantity?: { ... }
      product_id?: { ... }
      price_id?: { ... }
      description?: { ... }
      product_description?: { ... }
      product_name?: { ... }
      price_mappings?: { ... }
      is_tax_inclusive?: { ... }
      _product?: { ... }
    }>
    amount_subtotal?: number
    amount_total?: number
    unit_amount_gross?: number
    unit_amount_net?: number
    amount_tax?: number
    total_details?: {
      amount_shipping?: { ... }
      amount_tax?: { ... }
      breakdown?: { ... }
    }
    currency?: string
    redeemed_promos?: Array<{
      code: { ... }
      coupons: { ... }
    }>
  }
  coupon_ids?: string[]
  taxes?: Array<{
    rate?: string
    tax?: {
      _id: { ... }
      _title: { ... }
      _org: { ... }
      _schema: { ... }
      _tags?: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      type: { ... }
      description?: { ... }
  // ...
}
```

### `TaxAmountDto`

A valid tax rate from a client.

```ts
type TaxAmountDto = {
  rate?: string
  tax?: {
    _id: string // uuid
    _title: string
    _org: string
    _schema: string
    _tags?: string[]
    _created_at: string // date-time
    _updated_at: string // date-time
    type: "VAT" | "GST" | "Custom"
    description?: string
    rate: number
    active?: boolean
    region?: string
    region_label?: string
  }
}
```

### `OrderSource`

The order generation source

```ts
type OrderSource = {
  http?: string
  title?: string
}
```

### `OpportunitySource`

The opportunity generation source

```ts
type OpportunitySource = {
  http?: string
  title?: string
}
```

### `RecurrenceAmountDto`

An amount associated with a specific recurrence.

```ts
type RecurrenceAmountDto = {
  amount_subtotal?: number
  amount_subtotal_decimal?: string
  amount_total?: number
  amount_total_decimal?: string
  cashback_amount?: number
  cashback_amount_decimal?: string
  cashback_period?: "0" | "12"
  after_cashback_amount_total?: number
  after_cashback_amount_total_decimal?: string
  discount_amount?: number
  discount_amount_decimal?: string
  discount_percentage?: number
  before_discount_amount_total?: number
  before_discount_amount_total_decimal?: string
  before_discount_amount_subtotal?: number
  before_discount_amount_subtotal_decimal?: string
}
```

### `Currency`

Three-letter ISO currency code, in lowercase. Must be a supported currency.
ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html


```ts
type Currency = string
```

### `OrderRelation`

An order relation reference

```ts
type OrderRelation = {
  entity_id?: string
  _tags?: string[]
}
```

### `OrderPayload`

Order Entity Payload

```ts
type OrderPayload = {
  status?: "draft" | "quote" | "placed" | "cancelled" | "completed"
  line_items?: Array<{
    external_fees_mappings?: Array<{
      price_id?: { ... }
      frequency_unit?: { ... }
      amount_total?: { ... }
      amount_total_decimal?: { ... }
    }>
    external_fees_metadata?: {
      amount_total: { ... }
      amount_total_decimal: { ... }
      amount_static?: { ... }
      amount_static_decimal?: { ... }
      amount_variable_ht?: { ... }
      amount_variable_decimal_ht?: { ... }
      unit_amount_variable_ht?: { ... }
      unit_amount_variable_decimal_ht?: { ... }
      amount_variable_nt?: { ... }
      amount_variable_decimal_nt?: { ... }
      unit_amount_variable_nt?: { ... }
      unit_amount_variable_decimal_nt?: { ... }
      currency: { ... }
      billing_period: { ... }
      breakdown: { ... }
      _meta?: { ... }
    }
    external_price_metadata?: {
      market: { ... }
      bidding_zone: { ... }
      price: { ... }
      _meta?: { ... }
    }
    _immutable_pricing_details?: {
      items?: { ... }
      amount_subtotal?: { ... }
      amount_total?: { ... }
      unit_amount_gross?: { ... }
      unit_amount_net?: { ... }
      amount_tax?: { ... }
      total_details?: { ... }
      currency?: { ... }
      redeemed_promos?: { ... }
    }
    coupon_ids?: string[]
    taxes?: Array<{
      rate?: { ... }
      tax?: { ... }
    }>
    recurrences?: Array<{
      amount_subtotal?: { ... }
      amount_subtotal_decimal?: { ... }
      amount_total?: { ... }
      amount_total_decimal?: { ... }
      cashback_amount?: { ... }
      cashback_amount_decimal?: { ... }
      cashback_period?: { ... }
      after_cashback_amount_total?: { ... }
      after_cashback_amount_total_decimal?: { ... }
      discount_amount?: { ... }
      discount_amount_decimal?: { ... }
      discount_percentage?: { ... }
      before_discount_amount_total?: { ... }
      before_discount_amount_total_decimal?: { ... }
      before_discount_amount_subtotal?: { ... }
      before_discount_amount_subtotal_decimal?: { ... }
    }>
    _coupons?: Array<{
      _id: { ... }
      _title: { ... }
      _org: { ... }
      _schema: { ... }
      _tags?: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      name: { ... }
      description?: { ... }
      type: { ... }
      category: { ... }
      percentage_value?: { ... }
      fixed_value?: { ... }
      fixed_value_decimal?: { ... }
      fixed_value_currency?: { ... }
      cashback_period?: { ... }
      active?: { ... }
      requires_promo_code?: { ... }
    }>
    type?: "one_time" | "recurring"
    billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly"
    unit_amount?: number
    unit_amount_gross?: number
    unit_amount_currency?: string
    unit_amount_decimal?: string
    is_composite_price?: false
    pricing_model?: "per_unit" | "tiered_graduated" | "tiered_volume" | "tiered_flatfee" | "dynamic_tariff" | "external_getag"
    _price?: {
      billing_duration_amount?: { ... }
      billing_duration_unit?: { ... }
      notice_time_amount?: { ... }
      notice_time_unit?: { ... }
  // ...
}
```

### `PriceItems`

Tracks a set of product prices, quantities, (discounts) and taxes.

```ts
type PriceItems = Array<{
  metadata?: Array<{
    key?: string
    value?: string
  }>
  quantity?: number
  product_id?: string
  price_id?: string
  description?: string
  product_description?: string
  product_name?: string
  price_mappings?: Array<{
    price_id?: string
    frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    name?: string
    value?: number
    metadata?: Record<string, string>
  }>
  is_tax_inclusive?: boolean
  _product?: {
    description?: string
    code?: string
    type?: "product" | "service"
    name?: string
    categories?: string[]
    feature?: Array<{
      _tags?: { ... }
      feature?: { ... }
    }>
    cross_sellable_products?: {
      $relation?: { ... }
    }
    product_images?: {
      $relation?: { ... }
    } | Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    product_downloads?: {
      $relation?: { ... }
    } | Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    price_options?: {
      $relation?: { ... }
    }
    _availability_files?: Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    _id?: string
    _title?: string
    _org_id?: string
    _created_at?: string
    _updated_at?: string
  }
} | {
  metadata?: Array<{
    key?: string
    value?: string
  }>
  quantity?: number
  product_id?: string
  price_id?: string
  description?: string
  product_description?: string
  product_name?: string
  price_mappings?: Array<{
    price_id?: string
    frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    name?: string
    value?: number
    metadata?: Record<string, string>
  }>
  is_tax_inclusive?: boolean
  // ...
}
```

### `CompositePriceItem`

Represents a composite price input to the pricing library.

```ts
type CompositePriceItem = {
  metadata?: Array<{
    key?: string
    value?: string
  }>
  quantity?: number
  product_id?: string
  price_id?: string
  description?: string
  product_description?: string
  product_name?: string
  price_mappings?: Array<{
    price_id?: string
    frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    name?: string
    value?: number
    metadata?: Record<string, string>
  }>
  is_tax_inclusive?: boolean
  _product?: {
    description?: string
    code?: string
    type?: "product" | "service"
    name?: string
    categories?: string[]
    feature?: Array<{
      _tags?: { ... }
      feature?: { ... }
    }>
    cross_sellable_products?: {
      $relation?: { ... }
    }
    product_images?: {
      $relation?: { ... }
    } | Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    product_downloads?: {
      $relation?: { ... }
    } | Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    price_options?: {
      $relation?: { ... }
    }
    _availability_files?: Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    _id?: string
    _title?: string
    _org_id?: string
    _created_at?: string
    _updated_at?: string
  }
}
```

### `BasePriceItem`

Represents a price item

```ts
type BasePriceItem = {
  metadata?: Array<{
    key?: string
    value?: string
  }>
  quantity?: number
  product_id?: string
  price_id?: string
  description?: string
  product_description?: string
  product_name?: string
  price_mappings?: Array<{
    price_id?: string
    frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    name?: string
    value?: number
    metadata?: Record<string, string>
  }>
  is_tax_inclusive?: boolean
  _product?: {
    description?: string
    code?: string
    type?: "product" | "service"
    name?: string
    categories?: string[]
    feature?: Array<{
      _tags?: { ... }
      feature?: { ... }
    }>
    cross_sellable_products?: {
      $relation?: { ... }
    }
    product_images?: {
      $relation?: { ... }
    } | Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    product_downloads?: {
      $relation?: { ... }
    } | Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    price_options?: {
      $relation?: { ... }
    }
    _availability_files?: Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    _id?: string
    _title?: string
    _org_id?: string
    _created_at?: string
    _updated_at?: string
  }
}
```

### `CashbackAmounts`

```ts
type CashbackAmounts = {
  cashback_amount?: number
  cashback_amount_decimal?: string
  cashback_period?: "0" | "12"
  after_cashback_amount_total?: number
  after_cashback_amount_total_decimal?: string
}
```

### `DiscountAmounts`

```ts
type DiscountAmounts = {
  discount_amount?: number
  discount_amount_decimal?: string
  discount_percentage?: number
  before_discount_amount_total?: number
  before_discount_amount_total_decimal?: string
  before_discount_amount_subtotal?: number
  before_discount_amount_subtotal_decimal?: string
}
```

### `PriceAmounts`

```ts
type PriceAmounts = {
  amount_subtotal?: number
  amount_subtotal_decimal?: string
  amount_total?: number
  amount_total_decimal?: string
}
```

### `Amounts`

```ts
type Amounts = {
  amount_subtotal?: number
  amount_subtotal_decimal?: string
  amount_total?: number
  amount_total_decimal?: string
  cashback_amount?: number
  cashback_amount_decimal?: string
  cashback_period?: "0" | "12"
  after_cashback_amount_total?: number
  after_cashback_amount_total_decimal?: string
  discount_amount?: number
  discount_amount_decimal?: string
  discount_percentage?: number
  before_discount_amount_total?: number
  before_discount_amount_total_decimal?: string
  before_discount_amount_subtotal?: number
  before_discount_amount_subtotal_decimal?: string
}
```

### `PriceItem`

Represents a price item

```ts
type PriceItem = {
  metadata?: Array<{
    key?: string
    value?: string
  }>
  quantity?: number
  product_id?: string
  price_id?: string
  description?: string
  product_description?: string
  product_name?: string
  price_mappings?: Array<{
    price_id?: string
    frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    name?: string
    value?: number
    metadata?: Record<string, string>
  }>
  is_tax_inclusive?: boolean
  _product?: {
    description?: string
    code?: string
    type?: "product" | "service"
    name?: string
    categories?: string[]
    feature?: Array<{
      _tags?: { ... }
      feature?: { ... }
    }>
    cross_sellable_products?: {
      $relation?: { ... }
    }
    product_images?: {
      $relation?: { ... }
    } | Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    product_downloads?: {
      $relation?: { ... }
    } | Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    price_options?: {
      $relation?: { ... }
    }
    _availability_files?: Array<{
      _id: { ... }
      filename: { ... }
      mime_type: { ... }
      versions: { ... }
      _schema: { ... }
      _org: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _title?: { ... }
      $relation?: { ... }
    }>
    _id?: string
    _title?: string
    _org_id?: string
    _created_at?: string
    _updated_at?: string
  }
}
```

### `TaxAmount`

A tax amount associated with a specific tax rate.

```ts
type TaxAmount = {
  amount?: number
  rate?: string
  rateValue?: number
  tax?: {
    _id: string // uuid
    _title: string
    _org: string
    _schema: string
    _tags?: string[]
    _created_at: string // date-time
    _updated_at: string // date-time
    type: "VAT" | "GST" | "Custom"
    description?: string
    rate: number
    active?: boolean
    region?: string
    region_label?: string
  }
}
```

### `TaxAmountBreakdown`

A tax amount associated with a specific tax rate.

```ts
type TaxAmountBreakdown = {
  amount?: number
  rate?: string
  rateValue?: number
  tax?: {
    rate?: number
    type?: "VAT" | "GST" | "Custom"
    _id?: string
  }
}
```

### `RecurrenceAmount`

An amount associated with a specific recurrence.

```ts
type RecurrenceAmount = {
  amount_subtotal?: number
  amount_subtotal_decimal?: string
  amount_total?: number
  amount_total_decimal?: string
  cashback_amount?: number
  cashback_amount_decimal?: string
  cashback_period?: "0" | "12"
  after_cashback_amount_total?: number
  after_cashback_amount_total_decimal?: string
  discount_amount?: number
  discount_amount_decimal?: string
  discount_percentage?: number
  before_discount_amount_total?: number
  before_discount_amount_total_decimal?: string
  before_discount_amount_subtotal?: number
  before_discount_amount_subtotal_decimal?: string
}
```

### `CashbackAmount`

An amount associated with a specific cashback period.

```ts
type CashbackAmount = {
  cashback_period: "0" | "12"
  amount_total: number
}
```

### `RecurrenceAmountWithTax`

An amount associated with a specific recurrence.

```ts
type RecurrenceAmountWithTax = {
  type?: string
  billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly"
  amount_total: number
  amount_subtotal: number
  amount_tax?: number
  tax?: {
    amount?: number
    rate?: string
    rateValue?: number
    tax?: {
      rate?: { ... }
      type?: { ... }
      _id?: { ... }
    }
  }
}
```

### `TotalDetails`

The total details with tax (and discount) aggregated totals.

```ts
type TotalDetails = {
  amount_shipping?: number
  amount_tax?: number
  breakdown?: {
    taxes?: Array<{
      amount?: { ... }
      rate?: { ... }
      rateValue?: { ... }
      tax?: { ... }
    }>
    recurrences?: Array<{
      amount_subtotal?: { ... }
      amount_subtotal_decimal?: { ... }
      amount_total?: { ... }
      amount_total_decimal?: { ... }
      cashback_amount?: { ... }
      cashback_amount_decimal?: { ... }
      cashback_period?: { ... }
      after_cashback_amount_total?: { ... }
      after_cashback_amount_total_decimal?: { ... }
      discount_amount?: { ... }
      discount_amount_decimal?: { ... }
      discount_percentage?: { ... }
      before_discount_amount_total?: { ... }
      before_discount_amount_total_decimal?: { ... }
      before_discount_amount_subtotal?: { ... }
      before_discount_amount_subtotal_decimal?: { ... }
    }>
    cashbacks?: Array<{
      cashback_period: { ... }
      amount_total: { ... }
    }>
    recurrencesByTax?: Array<{
      type?: { ... }
      billing_period?: { ... }
      amount_total: { ... }
      amount_subtotal: { ... }
      amount_tax?: { ... }
      tax?: { ... }
    }>
  }
}
```

### `PricingDetails`

The result from the calculation of a set of price items.

```ts
type PricingDetails = {
  items?: Array<{
    metadata?: Array<{
      key?: { ... }
      value?: { ... }
    }>
    quantity?: number
    product_id?: string
    price_id?: string
    description?: string
    product_description?: string
    product_name?: string
    price_mappings?: Array<{
      price_id?: { ... }
      frequency_unit?: { ... }
      name?: { ... }
      value?: { ... }
      metadata?: { ... }
    }>
    is_tax_inclusive?: boolean
    _product?: {
      description?: { ... }
      code?: { ... }
      type?: { ... }
      name?: { ... }
      categories?: { ... }
      feature?: { ... }
      cross_sellable_products?: { ... }
      product_images?: { ... }
      product_downloads?: { ... }
      price_options?: { ... }
      _availability_files?: { ... }
      _id?: { ... }
      _title?: { ... }
      _org_id?: { ... }
      _created_at?: { ... }
      _updated_at?: { ... }
    }
  } | {
    metadata?: Array<{
      key?: { ... }
      value?: { ... }
    }>
    quantity?: number
    product_id?: string
    price_id?: string
    description?: string
    product_description?: string
    product_name?: string
    price_mappings?: Array<{
      price_id?: { ... }
      frequency_unit?: { ... }
      name?: { ... }
      value?: { ... }
      metadata?: { ... }
    }>
    is_tax_inclusive?: boolean
    _product?: {
      description?: { ... }
      code?: { ... }
      type?: { ... }
      name?: { ... }
      categories?: { ... }
      feature?: { ... }
      cross_sellable_products?: { ... }
      product_images?: { ... }
      product_downloads?: { ... }
      price_options?: { ... }
      _availability_files?: { ... }
      _id?: { ... }
      _title?: { ... }
      _org_id?: { ... }
      _created_at?: { ... }
      _updated_at?: { ... }
    }
  }>
  amount_subtotal?: number
  amount_total?: number
  unit_amount_gross?: number
  unit_amount_net?: number
  amount_tax?: number
  total_details?: {
    amount_shipping?: number
    amount_tax?: number
    breakdown?: {
      taxes?: { ... }
      recurrences?: { ... }
      cashbacks?: { ... }
      recurrencesByTax?: { ... }
    }
  }
  currency?: string
  redeemed_promos?: Array<{
    code: string
    coupons: Array<{
      _id: { ... }
      _title: { ... }
      _org: { ... }
      _schema: { ... }
      _tags?: { ... }
  // ...
}
```

### `PromoCodeValidationResponse`

The result from the validation of a set of promo codes.

```ts
type PromoCodeValidationResponse = {
  matched_coupons?: Array<{
    _id: string // uuid
    _title: string
    _org: string
    _schema: "coupon"
    _tags?: string[]
    _created_at: string // date-time
    _updated_at: string // date-time
    name: string
    description?: string
    type: "fixed" | "percentage"
    category: "discount" | "cashback"
    percentage_value?: string
    fixed_value?: number
    fixed_value_decimal?: string
    fixed_value_currency?: string
    cashback_period?: "0" | "12"
    active?: boolean
    requires_promo_code?: boolean
  }>
}
```

### `PricingDetailsResponse`

The result from the calculation of a set of price items.

```ts
type PricingDetailsResponse = {
  items?: Array<{
    metadata?: Array<{
      key?: { ... }
      value?: { ... }
    }>
    quantity?: number
    product_id?: string
    price_id?: string
    description?: string
    product_description?: string
    product_name?: string
    price_mappings?: Array<{
      price_id?: { ... }
      frequency_unit?: { ... }
      name?: { ... }
      value?: { ... }
      metadata?: { ... }
    }>
    is_tax_inclusive?: boolean
    _product?: {
      description?: { ... }
      code?: { ... }
      type?: { ... }
      name?: { ... }
      categories?: { ... }
      feature?: { ... }
      cross_sellable_products?: { ... }
      product_images?: { ... }
      product_downloads?: { ... }
      price_options?: { ... }
      _availability_files?: { ... }
      _id?: { ... }
      _title?: { ... }
      _org_id?: { ... }
      _created_at?: { ... }
      _updated_at?: { ... }
    }
  } | {
    metadata?: Array<{
      key?: { ... }
      value?: { ... }
    }>
    quantity?: number
    product_id?: string
    price_id?: string
    description?: string
    product_description?: string
    product_name?: string
    price_mappings?: Array<{
      price_id?: { ... }
      frequency_unit?: { ... }
      name?: { ... }
      value?: { ... }
      metadata?: { ... }
    }>
    is_tax_inclusive?: boolean
    _product?: {
      description?: { ... }
      code?: { ... }
      type?: { ... }
      name?: { ... }
      categories?: { ... }
      feature?: { ... }
      cross_sellable_products?: { ... }
      product_images?: { ... }
      product_downloads?: { ... }
      price_options?: { ... }
      _availability_files?: { ... }
      _id?: { ... }
      _title?: { ... }
      _org_id?: { ... }
      _created_at?: { ... }
      _updated_at?: { ... }
    }
  }>
  amount_subtotal?: number
  amount_total?: number
  unit_amount_gross?: number
  unit_amount_net?: number
  amount_tax?: number
  total_details?: {
    amount_shipping?: number
    amount_tax?: number
    breakdown?: {
      taxes?: { ... }
      recurrences?: { ... }
      cashbacks?: { ... }
      recurrencesByTax?: { ... }
    }
  }
  currency?: string
  redeemed_promos?: Array<{
    code: string
    coupons: Array<{
      _id: { ... }
      _title: { ... }
      _org: { ... }
      _schema: { ... }
      _tags?: { ... }
  // ...
}
```

### `BillingPeriod`

```ts
type BillingPeriod = "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly"
```

### `CashbackPeriod`

The cashback period, for now it's limited to either 0 months or 12 months

```ts
type CashbackPeriod = "0" | "12"
```

### `SalesTax`

```ts
type SalesTax = "nontaxable" | "reduced" | "standard"
```

### `AvailabilityLocation`

```ts
type AvailabilityLocation = {
  street?: string
  street_number?: string
  postal_code?: string
  city?: string
  country?: string
}
```

### `AvailabilityFilters`

Availability filters dimensions

```ts
type AvailabilityFilters = {
  location: {
    street?: string
    street_number?: string
    postal_code?: string
    city?: string
    country?: string
  }
  available_date?: string // date
}
```

### `Address`

```ts
type Address = {
  _tags?: string[]
  street?: string
  street_number?: string
  postal_code?: string
  city?: string
  country?: string
  additional_info?: string
  company_name?: string
  first_name?: string
  last_name?: string
  salutation?: string
  title?: string
}
```

### `PaymentMethod`

A PaymentMethod represent your customer's payment instruments.


```ts
type PaymentMethod = {
  type?: string
  details?: Record<string, unknown>
}
```

### `Customer`

```ts
type Customer = {
  first_name?: string
  last_name?: string
  company_name?: string
  vat_id?: string
  email?: string
  phone?: string
}
```

### `File`

```ts
type File = {
  _id: string
  filename: string
  mime_type: string
  versions: Array<{
    s3ref: {
      bucket: { ... }
      key: { ... }
    }
  }>
  _schema: string
  _org: string
  _created_at: string // date-time
  _updated_at: string // date-time
  _title?: string
  $relation?: {
    entity_id?: string
    _tags?: string[]
  }
}
```

### `EntityId`

```ts
type EntityId = string // uuid
```

### `EntityItem`

```ts
type EntityItem = {
  _id: string // uuid
  _title: string
  _org: string
  _schema: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
}
```

### `EntityRelation`

```ts
type EntityRelation = {
  entity_id?: string
  _tags?: string[]
}
```

### `Tax`

the tax configuration

```ts
type Tax = {
  _id: string // uuid
  _title: string
  _org: string
  _schema: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  type: "VAT" | "GST" | "Custom"
  description?: string
  rate: number
  active?: boolean
  region?: string
  region_label?: string
}
```

### `TaxBreakdownInfo`

```ts
type TaxBreakdownInfo = {
  rate?: number
  type?: "VAT" | "GST" | "Custom"
  _id?: string
}
```

### `BaseCouponCommon`

The shared properties for the coupon entity and coupon item entity

```ts
type BaseCouponCommon = {
  _id: string // uuid
  _title: string
  _org: string
  _schema: "coupon"
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  name: string
  description?: string
  type: "fixed" | "percentage"
  category: "discount" | "cashback"
  percentage_value?: string
  fixed_value?: number
  fixed_value_decimal?: string
  fixed_value_currency?: string
  cashback_period?: "0" | "12"
  active?: boolean
  requires_promo_code?: boolean
}
```

### `CouponWithoutPromoCodes`

The base for the coupon entity without promo codes

```ts
type CouponWithoutPromoCodes = {
  _id: string // uuid
  _title: string
  _org: string
  _schema: "coupon"
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  name: string
  description?: string
  type: "fixed" | "percentage"
  category: "discount" | "cashback"
  percentage_value?: string
  fixed_value?: number
  fixed_value_decimal?: string
  fixed_value_currency?: string
  cashback_period?: "0" | "12"
  active?: boolean
  requires_promo_code?: boolean
}
```

### `Coupon`

The coupon entity

```ts
type Coupon = {
  _id: string // uuid
  _title: string
  _org: string
  _schema: "coupon"
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  name: string
  description?: string
  type: "fixed" | "percentage"
  category: "discount" | "cashback"
  percentage_value?: string
  fixed_value?: number
  fixed_value_decimal?: string
  fixed_value_currency?: string
  cashback_period?: "0" | "12"
  active?: boolean
  requires_promo_code?: boolean
}
```

### `CouponItem`

```ts
type CouponItem = {
  _id: string // uuid
  _title: string
  _org: string
  _schema: "coupon"
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  name: string
  description?: string
  type: "fixed" | "percentage"
  category: "discount" | "cashback"
  percentage_value?: string
  fixed_value?: number
  fixed_value_decimal?: string
  fixed_value_currency?: string
  cashback_period?: "0" | "12"
  active?: boolean
  requires_promo_code?: boolean
}
```

### `PromoCode`

```ts
type PromoCode = {
  id: string
  code: string
  has_usage_limit?: boolean
  usage_limit?: number
}
```

### `RedeemedPromo`

```ts
type RedeemedPromo = {
  code: string
  coupons: Array<{
    _id: string // uuid
    _title: string
    _org: string
    _schema: "coupon"
    _tags?: string[]
    _created_at: string // date-time
    _updated_at: string // date-time
    name: string
    description?: string
    type: "fixed" | "percentage"
    category: "discount" | "cashback"
    percentage_value?: string
    fixed_value?: number
    fixed_value_decimal?: string
    fixed_value_currency?: string
    cashback_period?: "0" | "12"
    active?: boolean
    requires_promo_code?: boolean
  }>
}
```

### `PriceTier`

```ts
type PriceTier = {
  up_to?: number
  flat_fee_amount?: number
  flat_fee_amount_decimal?: string
  unit_amount?: number
  unit_amount_decimal?: string
  display_mode?: "hidden" | "on_request"
}
```

### `PriceTierDisplayMode`

```ts
type PriceTierDisplayMode = "hidden" | "on_request"
```

### `PricingModel`

Describes how to compute the price per period. Either `per_unit`, `tiered_graduated` or `tiered_volume`.
- `per_unit` indicates that the fixed amount (specified in unit_amount or unit_amount_decimal) will be charged per unit in quantity
- `tiered_graduated` indicates that the unit pricing will be co

```ts
type PricingModel = "per_unit" | "tiered_graduated" | "tiered_volume" | "tiered_flatfee" | "dynamic_tariff" | "external_getag"
```

### `MarkupPricingModel`

Describes how to compute the markup per period. Either `per_unit`, `tiered_volume` or `tiered_flatfee`.
- `per_unit` indicates that the fixed amount (specified in unit_amount or unit_amount_decimal) will be charged per unit in quantity
- `tiered_volume` indicates that the unit pricing will be comput

```ts
type MarkupPricingModel = "per_unit" | "tiered_volume" | "tiered_flatfee"
```

### `TypeGetAg`

```ts
type TypeGetAg = "base_price" | "work_price"
```

### `TariffTypeGetAg`

```ts
type TariffTypeGetAg = "HT" | "NT"
```

### `ConsumptionTypeGetAg`

```ts
type ConsumptionTypeGetAg = "household" | "heating_pump" | "night_storage_heating" | "night_storage_heating_common_meter"
```

### `ProductCategory`

```ts
type ProductCategory = "power" | "gas"
```

### `PriceGetAg`

```ts
type PriceGetAg = {
  category: "power" | "gas"
  markup_pricing_model?: "per_unit" | "tiered_volume" | "tiered_flatfee"
  type?: "base_price" | "work_price"
  tariff_type?: "HT" | "NT"
  consumption_type?: "household" | "heating_pump" | "night_storage_heating" | "night_storage_heating_common_meter"
  concession_type?: "standard" | "special"
  meter_type?: "classic" | "smart" | "digital"
  markup_tiers?: Array<{
    up_to?: number
    flat_fee_amount?: number
    flat_fee_amount_decimal?: string
    unit_amount?: number
    unit_amount_decimal?: string
    display_mode?: "hidden" | "on_request"
  }>
  markup_amount: number
  markup_amount_decimal: string
  markup_amount_net?: number
  markup_amount_net_decimal?: string
  markup_amount_gross?: number
  markup_amount_gross_decimal?: string
  markup_total_amount_net?: number
  markup_total_amount_net_decimal?: string
  markup_total_amount_gross?: number
  markup_total_amount_gross_decimal?: string
  additional_markups_enabled?: boolean
  additional_markups?: Record<string, {
    amount_decimal: string
    amount: number
    amount_net?: number
    amount_net_decimal?: string
    amount_gross?: number
    amount_gross_decimal?: string
  }>
  unit_amount_gross: number
  unit_amount_gross_decimal?: string
  unit_amount_net: number
  unit_amount_net_decimal?: string
}
```

### `PriceDynamicTariff`

```ts
type PriceDynamicTariff = {
  mode: "day_ahead_market" | "manual"
  interval?: "hourly" | "monthly_average"
  average_price: number
  average_price_decimal: string
  markup_amount?: number
  markup_amount_decimal?: string
  markup_amount_net?: number
  markup_amount_net_decimal?: string
  markup_amount_gross?: number
  markup_amount_gross_decimal?: string
  unit_amount_net?: number
  unit_amount_net_decimal?: string
  unit_amount_gross?: number
  unit_amount_gross_decimal?: string
}
```

### `TierDetails`

```ts
type TierDetails = {
  quantity: number
  unit_amount: number
  unit_amount_gross: number
  unit_amount_net: number
  amount_total: number
  amount_subtotal: number
  amount_tax: number
  unit_amount_decimal: string
}
```

### `SearchExternalCatalogParams`

```ts
type SearchExternalCatalogParams = {
  context: {
    journey_id: string
    entity_id?: string
    journey_name: string
    journey_tags?: string[]
    journey_url_params?: Record<string, unknown>
    current_step_name: string
    current_block_name: string
    steps_data: Array<{
      step_name: { ... }
      step_index: { ... }
      blocks: { ... }
    }>
  }
}
```

### `ExternalCatalogRequest`

The request payload for the external catalog service.

```ts
type ExternalCatalogRequest = {
  config?: {
    appId: string
    componentId: string
    hookId?: string
  }
}
```

### `ExternalCatalogConfigurationRequest`

The request payload for the external catalog configuration service.

```ts
type ExternalCatalogConfigurationRequest = {
  config?: {
    appId: string
    componentId: string
    hookId?: string
  }
}
```

### `ExternalCatalogJourneyRequest`

The request payload for the external catalog service with a journey context.

```ts
type ExternalCatalogJourneyRequest = {
  origin: "journey"
  context: {
    journey_id: string
    entity_id?: string
    journey_name: string
    journey_tags?: string[]
    journey_url_params?: Record<string, unknown>
    current_step_name: string
    current_block_name: string
    steps_data: Array<{
      step_name: { ... }
      step_index: { ... }
      blocks: { ... }
    }>
  }
}
```

### `ExternalCatalogPortalRequest`

The request payload for the external catalog service with a portal context.

```ts
type ExternalCatalogPortalRequest = {
  origin: "portal"
  context: {
    contract: {
      _id?: { ... }
      contract_name?: { ... }
      contract_number?: { ... }
      assignee?: { ... }
      status?: { ... }
      description?: { ... }
      billing_account?: { ... }
      account_number?: { ... }
      branch?: { ... }
      move_in_date?: { ... }
      move_out_date?: { ... }
      billing_address?: { ... }
      delivery_address?: { ... }
      additional_addresses?: { ... }
      termination_date?: { ... }
      termination_reason?: { ... }
      start_date?: { ... }
      end_date?: { ... }
      customer?: { ... }
      order?: { ... }
      type?: { ... }
      billing_period?: { ... }
      billing_duration_amount?: { ... }
      billing_duration_unit?: { ... }
      notice_time_amount?: { ... }
      notice_time_unit?: { ... }
      termination_time_amount?: { ... }
      termination_time_unit?: { ... }
      renewal_duration_amount?: { ... }
      renewal_duration_unit?: { ... }
      billing_due_day?: { ... }
      installment_amount?: { ... }
      balance?: { ... }
      meters?: { ... }
      payment?: { ... }
      last_sync_at?: { ... }
      external_id?: { ... }
    }
    contact: {
      _id?: { ... }
      salutation?: { ... }
      title?: { ... }
      first_name?: { ... }
      last_name?: { ... }
      customer_number?: { ... }
      birthdate?: { ... }
      email?: { ... }
      phone?: { ... }
      communication_preference?: { ... }
      address?: { ... }
      payment?: { ... }
      account?: { ... }
      marketing_permission?: { ... }
      contact_owner?: { ... }
      consent_email_marketing?: { ... }
      consent_sms_marketing?: { ... }
      consent_phone_call?: { ... }
      consent_print_marketing?: { ... }
      portal_users?: { ... }
      opportunities?: { ... }
      orders?: { ... }
      contracts?: { ... }
      external_id?: { ... }
    }
  }
}
```

### `ExternalCatalogCustomRequest`

The request payload for the external catalog service with a custom context. E.g. for requests from the Portal.

```ts
type ExternalCatalogCustomRequest = {
  origin: "custom"
  context: Record<string, unknown>
}
```

### `CustomContext`

A custom context object. E.g. for Portal context.

```ts
type CustomContext = Record<string, unknown>
```

### `JourneyContext`

```ts
type JourneyContext = {
  journey_id: string
  entity_id?: string
  journey_name: string
  journey_tags?: string[]
  journey_url_params?: Record<string, unknown>
  current_step_name: string
  current_block_name: string
  steps_data: Array<{
    step_name: string
    step_index: number
    blocks: Record<string, unknown>
  }>
}
```

### `PortalContext`

```ts
type PortalContext = {
  contract: {
    _id?: string
    contract_name?: string
    contract_number?: string
    assignee?: string
    status?: "draft" | "in_approval_process" | "approved" | "active" | "deactivated" | "revoked" | "terminated" | "expired"
    description?: string
    billing_account?: string
    account_number?: string
    branch?: "power" | "gas" | "water" | "waste_water" | "district_heating"
    move_in_date?: string // date
    move_out_date?: string // date
    billing_address?: object
    delivery_address?: object
    additional_addresses?: object[]
    termination_date?: string // date
    termination_reason?: string
    start_date?: string // date
    end_date?: string // date
    customer?: string[]
    order?: string
    type?: "one_time" | "recurring"
    billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly"
    billing_duration_amount?: number
    billing_duration_unit?: "weeks" | "months" | "years"
    notice_time_amount?: number
    notice_time_unit?: "weeks" | "months" | "years"
    termination_time_amount?: number
    termination_time_unit?: "weeks" | "months" | "years"
    renewal_duration_amount?: number
    renewal_duration_unit?: "weeks" | "months" | "years"
    billing_due_day?: number
    installment_amount?: {
      value?: { ... }
      currency?: { ... }
    }
    balance?: {
      value?: { ... }
      currency?: { ... }
    }
    meters?: string[]
    payment?: string
    last_sync_at?: string // date
    external_id?: string
  }
  contact: {
    _id?: string
    salutation?: "Mr." | "Ms. / Mrs." | "Company" | "Contact Person" | "Company/Contact Person" | "Spouse" | "Family" | "Ownership" | "Assembly" | "Other"
    title?: "Dr." | "Prof." | "Prof. Dr."
    first_name?: string
    last_name?: string
    customer_number?: string
    birthdate?: string // date
    email?: Array<{
      email?: { ... }
      _primary?: { ... }
    }>
    phone?: Array<{
      phone?: { ... }
      _primary?: { ... }
    }>
    communication_preference?: "postal" | "portal"
    address?: Array<{
      _primary?: { ... }
      postal_code?: { ... }
      city?: { ... }
      street?: { ... }
      street_number?: { ... }
      country?: { ... }
    }>
    payment?: Array<{
      _primary?: { ... }
    }>
    account?: string[]
    marketing_permission?: boolean
    contact_owner?: string
    consent_email_marketing?: object
    consent_sms_marketing?: object
    consent_phone_call?: object
    consent_print_marketing?: object
    portal_users?: string[]
    opportunities?: string[]
    orders?: string[]
    contracts?: string[]
    external_id?: string
  }
}
```

### `SearchExternalCatalogResult`

```ts
type SearchExternalCatalogResult = {
  hits: number
  results: Array<{
    pricing_details: {
      items?: { ... }
      amount_subtotal?: { ... }
      amount_total?: { ... }
      unit_amount_gross?: { ... }
      unit_amount_net?: { ... }
      amount_tax?: { ... }
      total_details?: { ... }
      currency?: { ... }
      redeemed_promos?: { ... }
    }
    _meta: {
      signature: { ... }
      timestamp: { ... }
    }
  }>
}
```

### `SearchExternalCatalogRecommendationsResult`

```ts
type SearchExternalCatalogRecommendationsResult = {
  source: {
    pricing_details: {
      items?: { ... }
      amount_subtotal?: { ... }
      amount_total?: { ... }
      unit_amount_gross?: { ... }
      unit_amount_net?: { ... }
      amount_tax?: { ... }
      total_details?: { ... }
      currency?: { ... }
      redeemed_promos?: { ... }
    }
    _meta: {
      signature: { ... }
      timestamp: { ... }
    }
  }
  offers: Array<{
    pricing_details: {
      items?: { ... }
      amount_subtotal?: { ... }
      amount_total?: { ... }
      unit_amount_gross?: { ... }
      unit_amount_net?: { ... }
      amount_tax?: { ... }
      total_details?: { ... }
      currency?: { ... }
      redeemed_promos?: { ... }
    }
    _meta: {
      signature: { ... }
      timestamp: { ... }
    }
  }>
}
```

### `ExternalCatalogItem`

An external product & price information (already computed) from an external catalog.

```ts
type ExternalCatalogItem = {
  pricing_details: {
    items?: Array<{
      metadata?: { ... }
      quantity?: { ... }
      product_id?: { ... }
      price_id?: { ... }
      description?: { ... }
      product_description?: { ... }
      product_name?: { ... }
      price_mappings?: { ... }
      is_tax_inclusive?: { ... }
      _product?: { ... }
    } | {
      metadata?: { ... }
      quantity?: { ... }
      product_id?: { ... }
      price_id?: { ... }
      description?: { ... }
      product_description?: { ... }
      product_name?: { ... }
      price_mappings?: { ... }
      is_tax_inclusive?: { ... }
      _product?: { ... }
    }>
    amount_subtotal?: number
    amount_total?: number
    unit_amount_gross?: number
    unit_amount_net?: number
    amount_tax?: number
    total_details?: {
      amount_shipping?: { ... }
      amount_tax?: { ... }
      breakdown?: { ... }
    }
    currency?: string
    redeemed_promos?: Array<{
      code: { ... }
      coupons: { ... }
    }>
  }
  _meta: {
    signature: string
    timestamp: number
  }
}
```

### `ProductRecommendationSearch`

Product recommendations request payload

```ts
type ProductRecommendationSearch = {
  product_recommendation_ids?: string[]
  catalog_item?: {
    product_id?: string
    price_id?: string
  }
  contract_id?: string
  filters?: {
    location: {
      street?: { ... }
      street_number?: { ... }
      postal_code?: { ... }
      city?: { ... }
      country?: { ... }
    }
    available_date?: string // date
  }
}
```

### `ProductRecommendationResponse`

Product recommendations request payload

```ts
type ProductRecommendationResponse = {
  hits: number
  results: Array<{
    _id: string // uuid
    _title: string
    _org: string
    _schema: string
    _tags?: string[]
    _created_at: string // date-time
    _updated_at: string // date-time
  }>
}
```

### `Offer`

```ts
type Offer = {
  target_id?: string
  items?: Array<{
    price_id: string
    product_id: string
  }>
}
```

### `ProductRecommendation`

```ts
type ProductRecommendation = {
  _id: string // uuid
  _title: string
  _org: string
  _schema: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
}
```
