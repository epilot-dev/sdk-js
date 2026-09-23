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

**Conditional Pricing API**
- [`$getConditionSets`](#$getconditionsets)
- [`$resolveConditionalEntity`](#$resolveconditionalentity)
- [`$createConditionalVariant`](#$createconditionalvariant)
- [`$listConditionalVariants`](#$listconditionalvariants)
- [`$getConditionalVariantTree`](#$getconditionalvarianttree)
- [`$getActiveConditionalVariantVersion`](#$getactiveconditionalvariantversion)
- [`$replaceActiveConditionalVariantVersion`](#$replaceactiveconditionalvariantversion)
- [`$patchActiveConditionalVariantVersion`](#$patchactiveconditionalvariantversion)
- [`$deleteConditionalVariant`](#$deleteconditionalvariant)
- [`$listConditionalVariantVersions`](#$listconditionalvariantversions)
- [`$appendConditionalVariantVersion`](#$appendconditionalvariantversion)
- [`$getConditionalVariantVersion`](#$getconditionalvariantversion)
- [`$replaceConditionalVariantVersion`](#$replaceconditionalvariantversion)
- [`$patchConditionalVariantVersion`](#$patchconditionalvariantversion)
- [`$deleteConditionalVariantVersion`](#$deleteconditionalvariantversion)
- [`$batchUpsertConditionalVariants`](#$batchupsertconditionalvariants)
- [`$batchDeleteConditionalVariants`](#$batchdeleteconditionalvariants)

**Schemas**
- [`IntegrationId`](#integrationid)
- [`ConditionalEntitySlug`](#conditionalentityslug)
- [`ConditionType`](#conditiontype)
- [`ConditionDefinition`](#conditiondefinition)
- [`ConditionSet`](#conditionset)
- [`ConditionSetCatalog`](#conditionsetcatalog)
- [`ConditionalPricingErrorCode`](#conditionalpricingerrorcode)
- [`ResolveConditionalEntityRequest`](#resolveconditionalentityrequest)
- [`ResolveByContextRequest`](#resolvebycontextrequest)
- [`ResolveByPinRequest`](#resolvebypinrequest)
- [`ResolveContext`](#resolvecontext)
- [`ResolveOptions`](#resolveoptions)
- [`PinnedResolveOptions`](#pinnedresolveoptions)
- [`ResolvedVariants`](#resolvedvariants)
- [`ResolvedVariant`](#resolvedvariant)
- [`CreateVariantRequest`](#createvariantrequest)
- [`VariantConditions`](#variantconditions)
- [`PinnedConditions`](#pinnedconditions)
- [`VariantValues`](#variantvalues)
- [`CreatedVariant`](#createdvariant)
- [`WriteWarning`](#writewarning)
- [`VersionMoved`](#versionmoved)
- [`InertOverride`](#inertoverride)
- [`InertOverrideReason`](#inertoverridereason)
- [`DeletedVariant`](#deletedvariant)
- [`VariantVersion`](#variantversion)
- [`WrittenVariantVersion`](#writtenvariantversion)
- [`DeletedVariantVersion`](#deletedvariantversion)
- [`AppendVersionRequest`](#appendversionrequest)
- [`ReplaceVersionRequest`](#replaceversionrequest)
- [`PatchVersionRequest`](#patchversionrequest)
- [`ListVariantsRequest`](#listvariantsrequest)
- [`VariantTreeRequest`](#varianttreerequest)
- [`VariantConditionFilter`](#variantconditionfilter)
- [`VariantList`](#variantlist)
- [`VariantListRow`](#variantlistrow)
- [`VariantTree`](#varianttree)
- [`VariantTreeRow`](#varianttreerow)
- [`VariantTreeRowStatus`](#varianttreerowstatus)
- [`VariantVersionSnapshot`](#variantversionsnapshot)
- [`VariantVersionList`](#variantversionlist)
- [`BatchUpsertVariantsRequest`](#batchupsertvariantsrequest)
- [`BatchUpsertItem`](#batchupsertitem)
- [`BatchDeleteVariantsRequest`](#batchdeletevariantsrequest)
- [`BatchDeleteItem`](#batchdeleteitem)
- [`BatchDeleteByVariantId`](#batchdeletebyvariantid)
- [`BatchDeleteByConditions`](#batchdeletebyconditions)
- [`BatchUpsertResult`](#batchupsertresult)
- [`BatchDeleteResult`](#batchdeleteresult)
- [`BatchUpsertOutcome`](#batchupsertoutcome)
- [`BatchDeleteOutcome`](#batchdeleteoutcome)
- [`BatchUpsertCounts`](#batchupsertcounts)
- [`BatchDeleteCounts`](#batchdeletecounts)
- [`BatchUpsertResultEntry`](#batchupsertresultentry)
- [`BatchDeleteResultEntry`](#batchdeleteresultentry)
- [`Error`](#error)
- [`ReportedError`](#reportederror)
- [`ConditionalPricingError`](#conditionalpricingerror)
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
- [`ExternalLocationMetadata`](#externallocationmetadata)
- [`ExternalPriceMetadata`](#externalpricemetadata)
- [`ExternalFeeMappings`](#externalfeemappings)
- [`ExternalFeeMapping`](#externalfeemapping)
- [`CatalogSearch`](#catalogsearch)
- [`CatalogFieldsParam`](#catalogfieldsparam)
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
- [`ComputePriceInputs`](#computepriceinputs)
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
- [`AdditionalProviderData`](#additionalproviderdata)
- [`MarketParticipant`](#marketparticipant)
- [`GasMarketAreaDetails`](#gasmarketareadetails)
- [`PowerMarketAreaDetails`](#powermarketareadetails)
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
- [`TaxItem`](#taxitem)
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
- [`OfferHighlightConfig`](#offerhighlightconfig)
- [`Offer`](#offer)
- [`ProductRecommendation`](#productrecommendation)

### `$calculatePricingDetails`

Computes a set of pricing details that can be persisted on an entity with the pricing capability enabled, e.g: Orders or Contracts.

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
        external_location_metadata: { /* ... */ },
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
        external_location_metadata: { /* ... */ },
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
        external_location_metadata: { /* ... */ },
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
        external_location_metadata: { /* ... */ },
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

Checkouts a cart and executes the specified checkout `mode` process.

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

Provides a querying functionalities over products and prices of the Catalog for a given organization.

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

Provides a querying functionalities over products and prices of the Catalog for a given organization.

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

Validate a list of promo codes against a list of coupons

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

The availability check endpoint

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

Validates an availability file, it returns an array of errors if the file is invalid

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

Get a series of historic energy prices for a given time period, market and bidding zone.

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

Get the average energy prices for a given time period, market and bidding zone.

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

Returns the list of available products with computed prices based on a given context and for a given org integration.

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

Returns the list of available product recommendations with computed prices based on a given context and for a given org integration.

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

Returns the list of providers available based on a given location

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
    "code": "string",
    "type": "gas",
    "additionalData": {
      "gridOperators": [
        {
          "name": "string",
          "codeNumber": "string",
          "validFrom": "1970-01-01",
          "validUntil": "1970-01-01"
        }
      ],
      "defaultSuppliers": [
        {
          "name": "string",
          "codeNumber": "string",
          "validFrom": "1970-01-01",
          "validUntil": "1970-01-01"
        }
      ],
      "marketAreaDetails": {
        "gasType": "L-Gas",
        "marketArea": "string",
        "virtualTradingPoint": "string"
      }
    },
    "_meta": {
      "signature": "string",
      "timestamp": 0
    }
  }
]
```

</details>

---

### `$searchStreets`

Returns the list of streets available for a given postal code and city

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

Returns the price for a given product type based on location and consumption

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
    reference_date: '1970-01-01',
    city: 'string',
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
  "inputs": {
    "type": "power",
    "consumptionHT": 0,
    "consumptionNT": 0,
    "consumptionType": "household",
    "zipCode": "string",
    "city": "string",
    "providerId": "string",
    "billingPeriod": "weekly",
    "referenceDate": "1970-01-01"
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

Saves the credentials for a given integration / organization

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

Delete the credentials for a given integration / organization

`DELETE /v1/integration/{integrationId}/credentials:delete`

```ts
const { data } = await client.$deleteCredentials({
  integrationId: 'example',
})
```

---

### `$getExternalCatalogProducts`

Returns the list of available external catalog products with computed prices based on a given context

`POST /v1/public/external-catalog/products`

```ts
const { data } = await client.$getExternalCatalogProducts(
  {
    x-epilot-org-id: 'example',
  },
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

Returns the list of available external catalog products recommendations based on a given context

`POST /v1/public/external-catalog/product-recommendations`

```ts
const { data } = await client.$getExternalCatalogProductRecommendations(
  {
    x-epilot-org-id: 'example',
  },
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

Get a list of product recommendations based on the search parameters.

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
      "taxes": [],
      "unit_amount": 10000,
      "unit_amount_net": 10000,
      "pricing_model": "per_unit",
      "_price": {},
      "_product": {}
    }
  ],
  "source": {
    "item": {
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
  }
}
```

</details>

---

### `$getConditionSets`

Returns the condition sets built in for one conditional entity type, ready to copy into that schema's `conditions` array. Read-only, and the same for every organization.

`GET /v1/conditional-pricing/{slug}/condition-sets`

```ts
const { data } = await client.$getConditionSets({
  slug: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "id": "delivery_area",
      "label": "Delivery Area",
      "description": "string",
      "conditions": [
        {
          "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
          "name": "postal_code",
          "label": "Postal Code",
          "type": "string",
          "options": [
            "private",
            {
              "value": "commercial",
              "title": "Commercial customers"
            }
          ],
          "format": "zipcode"
        }
      ]
    }
  ]
}
```

</details>

---

### `$resolveConditionalEntity`

Returns the variants of one conditional entity that apply, each composed: the base entity
overlaid with the version in effect at `as_of`.

`POST /v1/conditional-pricing:resolve`

```ts
const { data } = await client.$resolveConditionalEntity(
  null,
  {
    schema: 'product',
    entity_id: 'price-sp26d1yo',
    context: {
      postal_code: '46045',
      consumption: {
        lt: 5000
      }
    },
    as_of: '2027-03-15T00:00:00Z',
    options: {
      resolve_one: false,
      hydrate: false
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "_id": "price-sp26d1yo",
      "_variant_id": "var-46045",
      "_version_valid_from": "2027-01-01T00:00:00.000Z",
      "_conditions": {
        "postal_code": "46045",
        "default": false
      },
      "_inert_overrides": [
        {
          "attribute": "unit_amount",
          "reason": "ATTRIBUTE_NOT_OVERRIDABLE"
        }
      ]
    }
  ]
}
```

</details>

---

### `$createConditionalVariant`

Creates one variant together with its first version.

`POST /v1/conditional-pricing/{slug}/entities/{entity_id}/variants`

```ts
const { data } = await client.$createConditionalVariant(
  {
    slug: 'example',
    entity_id: 'example',
  },
  {
    conditions: {
      postal_code: '46045'
    },
    default: false,
    valid_from: '2027-01-01T00:00:00Z',
    values: {
      unit_amount: 2499,
      unit_amount_decimal: '24.99'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "variant_id": "var-46045",
  "entity_id": "price-sp26d1yo",
  "schema": "product",
  "conditions": {
    "postal_code": "46045",
    "default": false
  },
  "valid_from": "2027-01-01T00:00:00.000Z",
  "values": {
    "unit_amount": 2499,
    "unit_amount_decimal": "24.99"
  },
  "_created_at": "string",
  "_updated_at": "string",
  "_revision": 0,
  "warnings": [
    {
      "code": "VARIANT_COUNT_APPROACHING_CAP",
      "message": "string",
      "details": {
        "variant_count": 0,
        "cap": 0
      }
    }
  ]
}
```

</details>

---

### `$listConditionalVariants`

Lists a conditional entity's variants and the conditions each one pins. A `POST` because the
condition filter is a structured object; nothing is written. The body is required, so send
`{}` for the fir

`POST /v1/conditional-pricing/{slug}/entities/{entity_id}/variants:list`

```ts
const { data } = await client.$listConditionalVariants(
  {
    slug: 'example',
    entity_id: 'example',
  },
  {
    conditions: {
      postal_code: '46045',
      consumption: {
        lt: 5000
      }
    },
    search: '460',
    sort: 'conditions.postal_code:asc',
    from: 0,
    size: 10,
    cursor: 'eyJmcm9tIjoyNSwibGlzdGluZyI6IjNmOWMxZTJhIn0'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "hits": 8128,
  "results": [
    {
      "variant_id": "var-46045",
      "entity_id": "price-sp26d1yo",
      "schema": "product",
      "conditions": {
        "postal_code": "46045",
        "default": false
      }
    }
  ],
  "next": "eyJmcm9tIjoyNSwibGlzdGluZyI6IjNmOWMxZTJhIn0"
}
```

</details>

---

### `$getConditionalVariantTree`

The variants list, each row carrying the version in effect at `as_of` and a `status` saying
whether that version is `active` or still `scheduled`.

`POST /v1/conditional-pricing/{slug}/entities/{entity_id}/variants:tree`

```ts
const { data } = await client.$getConditionalVariantTree(
  {
    slug: 'example',
    entity_id: 'example',
  },
  {
    conditions: {
      postal_code: '46045',
      consumption: {
        lt: 5000
      }
    },
    search: '460',
    sort: 'conditions.postal_code:asc',
    from: 0,
    size: 10,
    cursor: 'eyJmcm9tIjoyNSwibGlzdGluZyI6IjNmOWMxZTJhIn0',
    as_of: '2027-03-15T00:00:00Z'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "hits": 8128,
  "results": [
    {
      "variant_id": "var-46045",
      "entity_id": "price-sp26d1yo",
      "schema": "product",
      "conditions": {
        "postal_code": "46045",
        "default": false
      },
      "status": "active",
      "version": {
        "variant_id": "var-46045",
        "entity_id": "price-sp26d1yo",
        "schema": "product",
        "conditions": {
          "postal_code": "46045",
          "default": false
        },
        "valid_from": "2027-01-01T00:00:00.000Z",
        "values": {
          "unit_amount": 2499,
          "unit_amount_decimal": "24.99"
        },
        "_created_at": "string",
        "_updated_at": "string"
      }
    }
  ],
  "next": "eyJmcm9tIjoyNSwibGlzdGluZyI6IjNmOWMxZTJhIn0"
}
```

</details>

---

### `$getActiveConditionalVariantVersion`

Returns the version of this variant in effect now — the latest `valid_from` at or before now
— with the `_revision` a write to it must carry.

`GET /v1/conditional-pricing/{slug}/entities/{entity_id}/variants/{variant_id}`

```ts
const { data } = await client.$getActiveConditionalVariantVersion({
  slug: 'example',
  entity_id: 'example',
  variant_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "variant_id": "var-46045",
  "entity_id": "price-sp26d1yo",
  "schema": "product",
  "conditions": {
    "postal_code": "46045",
    "default": false
  },
  "valid_from": "2027-01-01T00:00:00.000Z",
  "values": {
    "unit_amount": 2499,
    "unit_amount_decimal": "24.99"
  },
  "_created_at": "string",
  "_updated_at": "string",
  "_revision": 3
}
```

</details>

---

### `$replaceActiveConditionalVariantVersion`

Replaces the values of the version in effect. The body is the complete set of overrides: an
overridable attribute absent from it stops being overridden, and one the variant may not
override keeps its 

`PUT /v1/conditional-pricing/{slug}/entities/{entity_id}/variants/{variant_id}`

```ts
const { data } = await client.$replaceActiveConditionalVariantVersion(
  {
    slug: 'example',
    entity_id: 'example',
    variant_id: 'example',
  },
  {
    values: {
      unit_amount: 2499,
      unit_amount_decimal: '24.99'
    },
    _revision: 3,
    valid_from: 'string',
    conditions: {
      postal_code: '46045'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "variant_id": "var-46045",
  "entity_id": "price-sp26d1yo",
  "schema": "product",
  "conditions": {
    "postal_code": "46045",
    "default": false
  },
  "valid_from": "2027-01-01T00:00:00.000Z",
  "values": {
    "unit_amount": 2499,
    "unit_amount_decimal": "24.99"
  },
  "_created_at": "string",
  "_updated_at": "string",
  "_revision": 3,
  "warnings": [
    {
      "code": "VARIANT_COUNT_APPROACHING_CAP",
      "message": "string",
      "details": {
        "variant_count": 0,
        "cap": 0
      }
    }
  ]
}
```

</details>

---

### `$patchActiveConditionalVariantVersion`

Changes only the fields it names on the version in effect. `null` sets a value rather than
removing an override; use the replace operation to remove one.

`PATCH /v1/conditional-pricing/{slug}/entities/{entity_id}/variants/{variant_id}`

```ts
const { data } = await client.$patchActiveConditionalVariantVersion(
  {
    slug: 'example',
    entity_id: 'example',
    variant_id: 'example',
  },
  {
    values: {
      unit_amount: 2499,
      unit_amount_decimal: '24.99'
    },
    _revision: 3,
    valid_from: 'string',
    conditions: {
      postal_code: '46045'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "variant_id": "var-46045",
  "entity_id": "price-sp26d1yo",
  "schema": "product",
  "conditions": {
    "postal_code": "46045",
    "default": false
  },
  "valid_from": "2027-01-01T00:00:00.000Z",
  "values": {
    "unit_amount": 2499,
    "unit_amount_decimal": "24.99"
  },
  "_created_at": "string",
  "_updated_at": "string",
  "_revision": 3,
  "warnings": [
    {
      "code": "VARIANT_COUNT_APPROACHING_CAP",
      "message": "string",
      "details": {
        "variant_count": 0,
        "cap": 0
      }
    }
  ]
}
```

</details>

---

### `$deleteConditionalVariant`

Removes one variant: its condition tuple, its index entry and all its versions. The tuple
becomes reusable, and an interrupted delete is safe to send again.

`DELETE /v1/conditional-pricing/{slug}/entities/{entity_id}/variants/{variant_id}`

```ts
const { data } = await client.$deleteConditionalVariant({
  slug: 'example',
  entity_id: 'example',
  variant_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "variant_id": "var-46045",
  "entity_id": "price-sp26d1yo",
  "schema": "product",
  "tuple_released": true,
  "versions_deleted": 0
}
```

</details>

---

### `$listConditionalVariantVersions`

Lists one variant's versions. Cursor paging only: a page may be short or empty and still
carry a `next`, so page until `next` is absent. A cursor is bound to one variant and one
`order`.

`GET /v1/conditional-pricing/{slug}/entities/{entity_id}/variants/{variant_id}/versions`

```ts
const { data } = await client.$listConditionalVariantVersions({
  slug: 'example',
  entity_id: 'example',
  variant_id: 'example',
  limit: 1,
  order: 'example',
  cursor: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "variant_id": "var-46045",
      "entity_id": "price-sp26d1yo",
      "schema": "product",
      "conditions": {
        "postal_code": "46045",
        "default": false
      },
      "valid_from": "2027-01-01T00:00:00.000Z",
      "values": {
        "unit_amount": 2499,
        "unit_amount_decimal": "24.99"
      },
      "_created_at": "string",
      "_updated_at": "string"
    }
  ],
  "next": "eyJzayI6IlYjcHJpY2Utc3AyNmQxeW8jdmFyLTQ2MDQ1IzIwMjYtMDEtMDFUMDA6MDA6MDAuMDAwWiIsIm9yZGVyIjoiYXNjIn0"
}
```

</details>

---

### `$appendConditionalVariantVersion`

Appends a version taking effect at its own instant. The version in effect at any instant is
the one with the latest `valid_from` at or before it; a future one is staged until its date.

`POST /v1/conditional-pricing/{slug}/entities/{entity_id}/variants/{variant_id}/versions`

```ts
const { data } = await client.$appendConditionalVariantVersion(
  {
    slug: 'example',
    entity_id: 'example',
    variant_id: 'example',
  },
  {
    valid_from: '2027-01-01T00:00:00Z',
    values: {
      unit_amount: 2499,
      unit_amount_decimal: '24.99'
    },
    conditions: {
      postal_code: '46045'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "variant_id": "var-46045",
  "entity_id": "price-sp26d1yo",
  "schema": "product",
  "conditions": {
    "postal_code": "46045",
    "default": false
  },
  "valid_from": "2027-01-01T00:00:00.000Z",
  "values": {
    "unit_amount": 2499,
    "unit_amount_decimal": "24.99"
  },
  "_created_at": "string",
  "_updated_at": "string",
  "_revision": 3,
  "warnings": [
    {
      "code": "VARIANT_COUNT_APPROACHING_CAP",
      "message": "string",
      "details": {
        "variant_count": 0,
        "cap": 0
      }
    }
  ]
}
```

</details>

---

### `$getConditionalVariantVersion`

Returns one version by the instant it takes effect. Exact, never nearest.

`GET /v1/conditional-pricing/{slug}/entities/{entity_id}/variants/{variant_id}/versions/{valid_from}`

```ts
const { data } = await client.$getConditionalVariantVersion({
  slug: 'example',
  entity_id: 'example',
  variant_id: 'example',
  valid_from: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "variant_id": "var-46045",
  "entity_id": "price-sp26d1yo",
  "schema": "product",
  "conditions": {
    "postal_code": "46045",
    "default": false
  },
  "valid_from": "2027-01-01T00:00:00.000Z",
  "values": {
    "unit_amount": 2499,
    "unit_amount_decimal": "24.99"
  },
  "_created_at": "string",
  "_updated_at": "string",
  "_revision": 3
}
```

</details>

---

### `$replaceConditionalVariantVersion`

Replaces one version's values, whatever its date. Attributes the variant may not override
keep their stored value. Writing a superseded version is reported in `warnings`.

`PUT /v1/conditional-pricing/{slug}/entities/{entity_id}/variants/{variant_id}/versions/{valid_from}`

```ts
const { data } = await client.$replaceConditionalVariantVersion(
  {
    slug: 'example',
    entity_id: 'example',
    variant_id: 'example',
    valid_from: 'example',
  },
  {
    values: {
      unit_amount: 2499,
      unit_amount_decimal: '24.99'
    },
    _revision: 3,
    valid_from: 'string',
    conditions: {
      postal_code: '46045'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "variant_id": "var-46045",
  "entity_id": "price-sp26d1yo",
  "schema": "product",
  "conditions": {
    "postal_code": "46045",
    "default": false
  },
  "valid_from": "2027-01-01T00:00:00.000Z",
  "values": {
    "unit_amount": 2499,
    "unit_amount_decimal": "24.99"
  },
  "_created_at": "string",
  "_updated_at": "string",
  "_revision": 3,
  "warnings": [
    {
      "code": "VARIANT_COUNT_APPROACHING_CAP",
      "message": "string",
      "details": {
        "variant_count": 0,
        "cap": 0
      }
    }
  ]
}
```

</details>

---

### `$patchConditionalVariantVersion`

Changes only the fields it names on one version.

`PATCH /v1/conditional-pricing/{slug}/entities/{entity_id}/variants/{variant_id}/versions/{valid_from}`

```ts
const { data } = await client.$patchConditionalVariantVersion(
  {
    slug: 'example',
    entity_id: 'example',
    variant_id: 'example',
    valid_from: 'example',
  },
  {
    values: {
      unit_amount: 2499,
      unit_amount_decimal: '24.99'
    },
    _revision: 3,
    valid_from: 'string',
    conditions: {
      postal_code: '46045'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "variant_id": "var-46045",
  "entity_id": "price-sp26d1yo",
  "schema": "product",
  "conditions": {
    "postal_code": "46045",
    "default": false
  },
  "valid_from": "2027-01-01T00:00:00.000Z",
  "values": {
    "unit_amount": 2499,
    "unit_amount_decimal": "24.99"
  },
  "_created_at": "string",
  "_updated_at": "string",
  "_revision": 3,
  "warnings": [
    {
      "code": "VARIANT_COUNT_APPROACHING_CAP",
      "message": "string",
      "details": {
        "variant_count": 0,
        "cap": 0
      }
    }
  ]
}
```

</details>

---

### `$deleteConditionalVariantVersion`

Removes one version. What the removal moves is reported in `warnings`. A variant's last
remaining version cannot be removed — delete the variant instead.

`DELETE /v1/conditional-pricing/{slug}/entities/{entity_id}/variants/{variant_id}/versions/{valid_from}`

```ts
const { data } = await client.$deleteConditionalVariantVersion({
  slug: 'example',
  entity_id: 'example',
  variant_id: 'example',
  valid_from: 'example',
  _revision: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "variant_id": "var-46045",
  "entity_id": "price-sp26d1yo",
  "schema": "product",
  "valid_from": "2027-01-01T00:00:00.000Z",
  "warnings": [
    {
      "code": "VARIANT_COUNT_APPROACHING_CAP",
      "message": "string",
      "details": {
        "variant_count": 0,
        "cap": 0
      }
    }
  ]
}
```

</details>

---

### `$batchUpsertConditionalVariants`

Writes up to 100 variants or versions in one call. Each item names its own entity, so one
call can span a tariff hierarchy, and addresses a variant by condition tuple rather than by
id — the id it cre

`POST /v1/conditional-pricing/{slug}/variants:batchUpsert`

```ts
const { data } = await client.$batchUpsertConditionalVariants(
  {
    slug: 'example',
  },
  {
    correlation_id: 'tariff-refresh-2027-01',
    items: [
      {
        entity_id: 'price-sp26d1yo',
        conditions: {
          postal_code: '46045'
        },
        default: false,
        valid_from: '2027-01-01T00:00:00Z',
        values: {
          unit_amount: 2499,
          unit_amount_decimal: '24.99'
        }
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "correlation_id": "tariff-refresh-2027-01",
  "counts": {
    "variant_created": 1,
    "version_created": 1,
    "updated": 1,
    "skipped": 1,
    "error": 1
  },
  "results": [
    {
      "outcome": "variant_created",
      "entity_id": "price-sp26d1yo",
      "variant_id": "var-46045",
      "valid_from": "2027-01-01T00:00:00.000Z",
      "warnings": [
        {
          "code": "VARIANT_COUNT_APPROACHING_CAP",
          "message": "string",
          "details": {
            "variant_count": 0,
            "cap": 0
          }
        }
      ],
      "error": {
        "code": "SCHEMA_NOT_FOUND",
        "details": {
          "schema": "price"
        }
      }
    }
  ]
}
```

</details>

---

### `$batchDeleteConditionalVariants`

Removes up to 100 variants or versions in one call. An item carrying `valid_from` removes
that version; one without it removes the whole variant.

`POST /v1/conditional-pricing/{slug}/variants:batchDelete`

```ts
const { data } = await client.$batchDeleteConditionalVariants(
  {
    slug: 'example',
  },
  {
    correlation_id: 'postal-code-cleanup-2026-09',
    items: [
      {
        entity_id: 'price-sp26d1yo',
        variant_id: 'var-46045',
        valid_from: '2027-01-01T00:00:00Z'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "correlation_id": "postal-code-cleanup-2026-09",
  "counts": {
    "deleted": 1,
    "skipped": 1,
    "error": 1
  },
  "results": [
    {
      "outcome": "deleted",
      "entity_id": "price-sp26d1yo",
      "variant_id": "var-46045",
      "valid_from": "2027-01-01T00:00:00.000Z",
      "warnings": [
        {
          "code": "VARIANT_COUNT_APPROACHING_CAP",
          "message": "string",
          "details": {
            "variant_count": 0,
            "cap": 0
          }
        }
      ],
      "error": {
        "code": "SCHEMA_NOT_FOUND",
        "details": {
          "schema": "price"
        }
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

### `ConditionalEntitySlug`

Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route.

```ts
type ConditionalEntitySlug = "product" | "price" | "coupon"
```

### `ConditionType`

The kind of value a condition holds, which decides how a pinned value is matched against a
resolve context.

- `string`: an arbitrary string, matched exactly and case-sensitively
- `number`: a numeric value
- `date`: a single date
- `daterange`: a window with a from and an until timestamp; either en

```ts
type ConditionType = "string" | "number" | "date" | "daterange" | "boolean" | "select" | "location"
```

### `ConditionDefinition`

One condition dimension, in the shape a schema's `conditions` array holds it — copy it in verbatim.

```ts
type ConditionDefinition = {
  id: string // uuid
  name: string
  label: string
  type: "string" | "number" | "date" | "daterange" | "boolean" | "select" | "location"
  options?: Array<string | {
    value: string
    title?: string
  }>
  format?: "zipcode" | "zipcode_town"
}
```

### `ConditionSet`

A named bundle of condition definitions, built in for one entity type.

```ts
type ConditionSet = {
  id: string
  label: string
  description: string
  conditions: Array<{
    id: string // uuid
    name: string
    label: string
    type: "string" | "number" | "date" | "daterange" | "boolean" | "select" | "location"
    options?: Array<string | {
      value: { ... }
      title?: { ... }
    }>
    format?: "zipcode" | "zipcode_town"
  }>
}
```

### `ConditionSetCatalog`

```ts
type ConditionSetCatalog = {
  results: Array<{
    id: string
    label: string
    description: string
    conditions: Array<{
      id: { ... }
      name: { ... }
      label: { ... }
      type: { ... }
      options?: { ... }
      format?: { ... }
    }>
  }>
}
```

### `ConditionalPricingErrorCode`

Machine-readable failure mode of a conditional-pricing operation, so a client can branch on
the kind of failure instead of parsing the message. A `400` is about the request; a `409` is
about what is already stored. Refusals raised by request validation carry no `code` at all.

- `SCHEMA_NOT_FOUND` (

```ts
type ConditionalPricingErrorCode = "SCHEMA_NOT_FOUND" | "ENTITY_NOT_FOUND" | "ENTITY_TYPE_MISMATCH" | "ENTITY_NOT_CONDITIONAL" | "VARIANT_NOT_FOUND" | "VERSION_NOT_FOUND" | "NO_MATCHES" | "NO_ACTIVE_VERSION" | "AMBIGUOUS_RESOLUTION" | "TUPLE_CONFLICT" | "VERSION_CONFLICT" | "CONDITION_UNDEFINED" | "VARIANT_PIN_UNDECLARED" | "OPERATOR_UNSUPPORTED" | "CONTEXT_FORMAT_INVALID" | "CONDITION_VALUE_INVALID" | "CONDITION_UNCONFIGURED" | "TOO_MANY_MATCHES" | "WRITE_CONFLICT" | "OFFSET_WINDOW_EXCEEDED" | "CURSOR_INVALID" | "VARIANT_LIMIT_REACHED" | "PIN_FORMAT_INVALID" | "VARIANT_UNPINNED" | "LAST_VERSION_UNDELETABLE" | "CONDITION_UNREADABLE" | "SORT_INVALID" | "DEFAULT_MARKER_RESERVED" | "DEFAULT_VARIANT_PINS_CONDITIONS" | "VALID_FROM_IMMUTABLE" | "VARIANT_CONDITIONS_IMMUTABLE" | "IDENTIFIER_INVALID" | "VALID_FROM_INVALID" | "VALUE_UNSTORABLE"
```

### `ResolveConditionalEntityRequest`

A resolve names one conditional entity and selects its variants either by `context` or by
`variant_id`, never both. `context: {}` matches nothing and so returns the `default`
variant, which is how to ask for it without knowing its id.


```ts
type ResolveConditionalEntityRequest = {
  schema: "product" | "price" | "coupon"
  entity_id: string
  context: Record<string, unknown>
  as_of?: string
  options?: {
    resolve_one?: boolean
    hydrate?: boolean
  }
} | {
  schema: "product" | "price" | "coupon"
  entity_id: string
  variant_id: string
  as_of?: string
  options?: {
    hydrate?: boolean
  }
}
```

### `ResolveByContextRequest`

Resolve by matching a situation: which of this entity's variants apply to `context`, each
composed with the version in effect at `as_of`.


```ts
type ResolveByContextRequest = {
  schema: "product" | "price" | "coupon"
  entity_id: string
  context: Record<string, unknown>
  as_of?: string
  options?: {
    resolve_one?: boolean
    hydrate?: boolean
  }
}
```

### `ResolveByPinRequest`

Resolve by naming a variant: compose this one, whatever a context would have matched.

```ts
type ResolveByPinRequest = {
  schema: "product" | "price" | "coupon"
  entity_id: string
  variant_id: string
  as_of?: string
  options?: {
    hydrate?: boolean
  }
}
```

### `ResolveContext`

The situation to resolve for: a flat map keyed by condition name. A condition left out
matches only variants that leave it unpinned; an empty map therefore returns the `default`
variant.

Each value is an exact value, typed by its condition, or a single-operator predicate:

- `{ "lt": v }`, `{ "lte"

```ts
type ResolveContext = Record<string, unknown>
```

### `ResolveOptions`

The options a context resolve accepts. A pin takes `PinnedResolveOptions` instead.

```ts
type ResolveOptions = {
  resolve_one?: boolean
  hydrate?: boolean
}
```

### `PinnedResolveOptions`

The options a pinned resolve accepts — `hydrate` and nothing else. `resolve_one` has nothing
to change where the answer is one result or a 404, so a body sending it is a `400`.


```ts
type PinnedResolveOptions = {
  hydrate?: boolean
}
```

### `ResolvedVariants`

```ts
type ResolvedVariants = {
  results: Array<{
    _id: string
    _variant_id: string
    _version_valid_from: string
    _conditions: {
      default: { ... }
    }
    _inert_overrides: Array<{
      attribute: { ... }
      reason: { ... }
    }>
  }>
}
```

### `ResolvedVariant`

The entity as this variant leaves it — every attribute of a plain entity read with the
applicable version's overrides applied — plus the discriminators below.


```ts
type ResolvedVariant = {
  _id: string
  _variant_id: string
  _version_valid_from: string
  _conditions: {
    default: boolean
  }
  _inert_overrides: Array<{
    attribute: string
    reason: "ATTRIBUTE_NOT_OVERRIDABLE" | "ATTRIBUTE_READONLY" | "ATTRIBUTE_HIDDEN" | "ATTRIBUTE_COMPUTED" | "ATTRIBUTE_UNDECLARED" | "TYPE_NOT_OVERRIDABLE" | "CAPABILITY_NOT_OVERRIDABLE"
  }>
}
```

### `CreateVariantRequest`

```ts
type CreateVariantRequest = {
  conditions?: Record<string, unknown>
  default?: boolean
  valid_from?: string
  values: Record<string, unknown>
}
```

### `VariantConditions`

A variant's pinned conditions as a reader sees them: the pins the schema declares, plus a
boolean `default` saying whether this is the entity's fallback.


```ts
type VariantConditions = {
  default: boolean
}
```

### `PinnedConditions`

The situation this variant applies to: a flat map keyed by condition name. A condition left
out is a wildcard, which is what makes adding a condition to a schema non-breaking for
existing variants.

Exact values only; predicates belong to reads. Values are stored canonicalized for their
type: a `dat

```ts
type PinnedConditions = Record<string, unknown>
```

### `VariantValues`

The values this version overrides on the base entity, keyed by entity field name.

A field is overridable if its attribute declares `overridable_attribute` — which readonly,
hidden, computed and metadata fields, and types no variant may override, cannot be given —
or if a capability declaring `overr

```ts
type VariantValues = Record<string, unknown>
```

### `CreatedVariant`

```ts
type CreatedVariant = {
  variant_id: string
  entity_id: string
  schema: "product" | "price" | "coupon"
  conditions: {
    default: boolean
  }
  valid_from: string
  values: Record<string, unknown>
  _created_at: string
  _updated_at: string
  _revision: number
  warnings: Array<{
    code: "VARIANT_COUNT_APPROACHING_CAP"
    message: string
    details: {
      variant_count: { ... }
      cap: { ... }
    }
  } | {
    code: "ACTIVE_VERSION_CHANGED"
    message: string
    details: {
      valid_from: { ... }
      active_valid_from?: { ... }
    }
  } | {
    code: "SUPERSEDED_VERSION_WRITTEN"
    message: string
    details: {
      valid_from: { ... }
      active_valid_from?: { ... }
    }
  } | {
    code: "ATTRIBUTES_NOT_APPLIED"
    message: string
    details: {
      attributes: { ... }
    }
  }>
}
```

### `WriteWarning`

Something worth knowing that did not stop a write. One vocabulary for every write; `details`
is typed per `code`, and a write raises each code at most once.


```ts
type WriteWarning = {
  code: "VARIANT_COUNT_APPROACHING_CAP"
  message: string
  details: {
    variant_count: number
    cap: number
  }
} | {
  code: "ACTIVE_VERSION_CHANGED"
  message: string
  details: {
    valid_from: string
    active_valid_from?: string
  }
} | {
  code: "SUPERSEDED_VERSION_WRITTEN"
  message: string
  details: {
    valid_from: string
    active_valid_from?: string
  }
} | {
  code: "ATTRIBUTES_NOT_APPLIED"
  message: string
  details: {
    attributes: Array<{
      attribute: { ... }
      reason: { ... }
    }>
  }
}
```

### `VersionMoved`

Which version a write moved, and which one was in effect while it did.

```ts
type VersionMoved = {
  valid_from: string
  active_valid_from?: string
}
```

### `InertOverride`

One override that did not apply, and why — reported by a write for the attributes in its
body, and by a resolved payload for the stored overrides composition passed over.


```ts
type InertOverride = {
  attribute: string
  reason: "ATTRIBUTE_NOT_OVERRIDABLE" | "ATTRIBUTE_READONLY" | "ATTRIBUTE_HIDDEN" | "ATTRIBUTE_COMPUTED" | "ATTRIBUTE_UNDECLARED" | "TYPE_NOT_OVERRIDABLE" | "CAPABILITY_NOT_OVERRIDABLE"
}
```

### `InertOverrideReason`

Why one override did not apply.

- `ATTRIBUTE_NOT_OVERRIDABLE`: the schema declares the attribute without
  `overridable_attribute`, which is an ordinary schema edit away
- `ATTRIBUTE_READONLY`: the attribute is readonly, and cannot be granted the flag
- `ATTRIBUTE_HIDDEN`: the attribute is hidden, 

```ts
type InertOverrideReason = "ATTRIBUTE_NOT_OVERRIDABLE" | "ATTRIBUTE_READONLY" | "ATTRIBUTE_HIDDEN" | "ATTRIBUTE_COMPUTED" | "ATTRIBUTE_UNDECLARED" | "TYPE_NOT_OVERRIDABLE" | "CAPABILITY_NOT_OVERRIDABLE"
```

### `DeletedVariant`

```ts
type DeletedVariant = {
  variant_id: string
  entity_id: string
  schema: "product" | "price" | "coupon"
  tuple_released: boolean
  versions_deleted: number
}
```

### `VariantVersion`

One version of one variant: the overrides it carries, the instant it takes effect, and the
variant it belongs to. These are the version's own overrides; `:resolve` composes them onto
the entity.


```ts
type VariantVersion = {
  variant_id: string
  entity_id: string
  schema: "product" | "price" | "coupon"
  conditions: {
    default: boolean
  }
  valid_from: string
  values: Record<string, unknown>
  _created_at: string
  _updated_at: string
  _revision: number
}
```

### `WrittenVariantVersion`

A version as a write left it, together with anything the write moved.

```ts
type WrittenVariantVersion = {
  variant_id: string
  entity_id: string
  schema: "product" | "price" | "coupon"
  conditions: {
    default: boolean
  }
  valid_from: string
  values: Record<string, unknown>
  _created_at: string
  _updated_at: string
  _revision: number
  warnings: Array<{
    code: "VARIANT_COUNT_APPROACHING_CAP"
    message: string
    details: {
      variant_count: { ... }
      cap: { ... }
    }
  } | {
    code: "ACTIVE_VERSION_CHANGED"
    message: string
    details: {
      valid_from: { ... }
      active_valid_from?: { ... }
    }
  } | {
    code: "SUPERSEDED_VERSION_WRITTEN"
    message: string
    details: {
      valid_from: { ... }
      active_valid_from?: { ... }
    }
  } | {
    code: "ATTRIBUTES_NOT_APPLIED"
    message: string
    details: {
      attributes: { ... }
    }
  }>
}
```

### `DeletedVariantVersion`

```ts
type DeletedVariantVersion = {
  variant_id: string
  entity_id: string
  schema: "product" | "price" | "coupon"
  valid_from: string
  warnings: Array<{
    code: "VARIANT_COUNT_APPROACHING_CAP"
    message: string
    details: {
      variant_count: { ... }
      cap: { ... }
    }
  } | {
    code: "ACTIVE_VERSION_CHANGED"
    message: string
    details: {
      valid_from: { ... }
      active_valid_from?: { ... }
    }
  } | {
    code: "SUPERSEDED_VERSION_WRITTEN"
    message: string
    details: {
      valid_from: { ... }
      active_valid_from?: { ... }
    }
  } | {
    code: "ATTRIBUTES_NOT_APPLIED"
    message: string
    details: {
      attributes: { ... }
    }
  }>
}
```

### `AppendVersionRequest`

```ts
type AppendVersionRequest = {
  valid_from?: string
  values: Record<string, unknown>
  conditions?: Record<string, unknown>
}
```

### `ReplaceVersionRequest`

```ts
type ReplaceVersionRequest = {
  values: Record<string, unknown>
  _revision: number
  valid_from?: string
  conditions?: Record<string, unknown>
}
```

### `PatchVersionRequest`

```ts
type PatchVersionRequest = {
  values: Record<string, unknown>
  _revision: number
  valid_from?: string
  conditions?: Record<string, unknown>
}
```

### `ListVariantsRequest`

How to narrow and page a variant listing. Every property is optional, so `{}` asks for the
first ten variants in `variant_id` order, but the body itself is required. `conditions` and
`search` narrow independently and a variant must satisfy both.


```ts
type ListVariantsRequest = {
  conditions?: Record<string, unknown>
  search?: string
  sort?: string
  from?: number
  size?: number
  cursor?: string
}
```

### `VariantTreeRequest`

The variants list's request plus `as_of`, the instant each row's version is selected at.
`size` is clamped at 100 here; every other property means what it means on the list.


```ts
type VariantTreeRequest = {
  conditions?: Record<string, unknown>
  search?: string
  sort?: string
  from?: number
  size?: number
  cursor?: string
  as_of?: string
}
```

### `VariantConditionFilter`

Which pins a variant must carry to be listed: a flat map keyed by condition name, taking the
same exact values and predicates a resolve context does. A condition left out is not
filtered on. An `in` list carries at most 50,000 values.

A variant matches only where it pins the condition — unlike `:re

```ts
type VariantConditionFilter = Record<string, unknown>
```

### `VariantList`

```ts
type VariantList = {
  hits: number
  results: Array<{
    variant_id: string
    entity_id: string
    schema: "product" | "price" | "coupon"
    conditions: {
      default: { ... }
    }
  }>
  next?: string
}
```

### `VariantListRow`

One variant as a listing reports it: which variant it is and what it pins.

```ts
type VariantListRow = {
  variant_id: string
  entity_id: string
  schema: "product" | "price" | "coupon"
  conditions: {
    default: boolean
  }
}
```

### `VariantTree`

```ts
type VariantTree = {
  hits: number
  results: Array<{
    variant_id: string
    entity_id: string
    schema: "product" | "price" | "coupon"
    conditions: {
      default: { ... }
    }
    status: "active" | "scheduled"
    version: {
      variant_id: { ... }
      entity_id: { ... }
      schema: { ... }
      conditions: { ... }
      valid_from: { ... }
      values: { ... }
      _created_at: { ... }
      _updated_at: { ... }
    }
  }>
  next?: string
}
```

### `VariantTreeRow`

A listing row plus the one version the tree shows for it, and the status saying which.

```ts
type VariantTreeRow = {
  variant_id: string
  entity_id: string
  schema: "product" | "price" | "coupon"
  conditions: {
    default: boolean
  }
  status: "active" | "scheduled"
  version: {
    variant_id: string
    entity_id: string
    schema: "product" | "price" | "coupon"
    conditions: {
      default: { ... }
    }
    valid_from: string
    values: Record<string, unknown>
    _created_at: string
    _updated_at: string
  }
}
```

### `VariantTreeRowStatus`

Whether a tree row's version is the one in effect at `as_of`, or one still ahead of it.

- `active`: the version with the latest `valid_from` at or before `as_of`
- `scheduled`: the variant's first version, which is later than `as_of`


```ts
type VariantTreeRowStatus = "active" | "scheduled"
```

### `VariantVersionSnapshot`

One version of one variant as a listing reports it: `VariantVersion` without `_revision`.
Read the version through its own `GET` to get the revision a write must carry.


```ts
type VariantVersionSnapshot = {
  variant_id: string
  entity_id: string
  schema: "product" | "price" | "coupon"
  conditions: {
    default: boolean
  }
  valid_from: string
  values: Record<string, unknown>
  _created_at: string
  _updated_at: string
}
```

### `VariantVersionList`

```ts
type VariantVersionList = {
  results: Array<{
    variant_id: string
    entity_id: string
    schema: "product" | "price" | "coupon"
    conditions: {
      default: { ... }
    }
    valid_from: string
    values: Record<string, unknown>
    _created_at: string
    _updated_at: string
  }>
  next?: string
}
```

### `BatchUpsertVariantsRequest`

A batch of variant writes under one schema, each item naming the entity it writes to.

```ts
type BatchUpsertVariantsRequest = {
  correlation_id?: string
  items: Array<{
    entity_id: string
    conditions?: Record<string, unknown>
    default?: boolean
    valid_from?: string
    values: Record<string, unknown>
  }>
}
```

### `BatchUpsertItem`

One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
existing condition tuple appends a version to the variant holding it rather than conflicting.


```ts
type BatchUpsertItem = {
  entity_id: string
  conditions?: Record<string, unknown>
  default?: boolean
  valid_from?: string
  values: Record<string, unknown>
}
```

### `BatchDeleteVariantsRequest`

A batch of variant and version deletes under one schema, each item naming the entity it removes from.

```ts
type BatchDeleteVariantsRequest = {
  correlation_id?: string
  items: Array<{
    entity_id: string
    variant_id: string
    valid_from?: string
  } | {
    entity_id: string
    conditions?: Record<string, unknown>
    default?: boolean
    valid_from?: string
  }>
}
```

### `BatchDeleteItem`

One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
the one version of it to remove. An item carrying both matches neither branch and is an
envelope `400`.


```ts
type BatchDeleteItem = {
  entity_id: string
  variant_id: string
  valid_from?: string
} | {
  entity_id: string
  conditions?: Record<string, unknown>
  default?: boolean
  valid_from?: string
}
```

### `BatchDeleteByVariantId`

A delete addressing its variant by id.

```ts
type BatchDeleteByVariantId = {
  entity_id: string
  variant_id: string
  valid_from?: string
}
```

### `BatchDeleteByConditions`

A delete addressing its variant by the situation it applies to.

`conditions` is optional because the fallback variant pins nothing: address it with
`default: true` and no `conditions`. An item that ends up addressing no variant at all is a
per-item `VARIANT_UNPINNED`, and one marking `default` besi

```ts
type BatchDeleteByConditions = {
  entity_id: string
  conditions?: Record<string, unknown>
  default?: boolean
  valid_from?: string
}
```

### `BatchUpsertResult`

What a batch upsert did: one entry per item, in request order, and a count per outcome.

```ts
type BatchUpsertResult = {
  correlation_id?: string
  counts: {
    variant_created: number
    version_created: number
    updated: number
    skipped: number
    error: number
  }
  results: Array<{
    outcome: "variant_created" | "version_created" | "updated" | "skipped" | "error"
    entity_id: string
    variant_id?: string
    valid_from?: string
    warnings: Array<{
      code: { ... }
      message: { ... }
      details: { ... }
    } | {
      code: { ... }
      message: { ... }
      details: { ... }
    } | {
      code: { ... }
      message: { ... }
      details: { ... }
    } | {
      code: { ... }
      message: { ... }
      details: { ... }
    }>
    error?: {
      message: { ... }
      status?: { ... }
      cause?: { ... }
      error?: { ... }
    }
  }>
}
```

### `BatchDeleteResult`

What a batch delete did: one entry per item, in request order, and a count per outcome.

```ts
type BatchDeleteResult = {
  correlation_id?: string
  counts: {
    deleted: number
    skipped: number
    error: number
  }
  results: Array<{
    outcome: "deleted" | "skipped" | "error"
    entity_id: string
    variant_id?: string
    valid_from?: string
    warnings: Array<{
      code: { ... }
      message: { ... }
      details: { ... }
    } | {
      code: { ... }
      message: { ... }
      details: { ... }
    } | {
      code: { ... }
      message: { ... }
      details: { ... }
    } | {
      code: { ... }
      message: { ... }
      details: { ... }
    }>
    error?: {
      message: { ... }
      status?: { ... }
      cause?: { ... }
      error?: { ... }
    }
  }>
}
```

### `BatchUpsertOutcome`

What one upsert item did, derived from what was stored.

- `variant_created`: the condition tuple was unknown, so a variant and its first version
  were created
- `version_created`: the tuple was known and had no version at the item's `valid_from`
- `updated`: a version existed at that exact instant

```ts
type BatchUpsertOutcome = "variant_created" | "version_created" | "updated" | "skipped" | "error"
```

### `BatchDeleteOutcome`

What one delete item did.

- `deleted`: the variant, or the one version the item named, is gone
- `skipped`: the item addressed no such variant or version; a missing entity is an `error`
- `error`: this item alone failed, and the entry's `error` says why


```ts
type BatchDeleteOutcome = "deleted" | "skipped" | "error"
```

### `BatchUpsertCounts`

How many items reached each outcome. Keyed by exactly the values of `BatchUpsertOutcome`,
all present, and summing to the length of `results`.


```ts
type BatchUpsertCounts = {
  variant_created: number
  version_created: number
  updated: number
  skipped: number
  error: number
}
```

### `BatchDeleteCounts`

How many items reached each outcome. Keyed by exactly the values of `BatchDeleteOutcome`,
all present, and summing to the length of `results`.


```ts
type BatchDeleteCounts = {
  deleted: number
  skipped: number
  error: number
}
```

### `BatchUpsertResultEntry`

What one upsert item did. Position in `results` maps it back to its source row.

```ts
type BatchUpsertResultEntry = {
  outcome: "variant_created" | "version_created" | "updated" | "skipped" | "error"
  entity_id: string
  variant_id?: string
  valid_from?: string
  warnings: Array<{
    code: "VARIANT_COUNT_APPROACHING_CAP"
    message: string
    details: {
      variant_count: { ... }
      cap: { ... }
    }
  } | {
    code: "ACTIVE_VERSION_CHANGED"
    message: string
    details: {
      valid_from: { ... }
      active_valid_from?: { ... }
    }
  } | {
    code: "SUPERSEDED_VERSION_WRITTEN"
    message: string
    details: {
      valid_from: { ... }
      active_valid_from?: { ... }
    }
  } | {
    code: "ATTRIBUTES_NOT_APPLIED"
    message: string
    details: {
      attributes: { ... }
    }
  }>
  error?: {
    message: string
    status?: number
    cause?: string
    error?: string | Record<string, unknown>[]
  }
}
```

### `BatchDeleteResultEntry`

What one delete item did. Position in `results` maps it back to its source row.

```ts
type BatchDeleteResultEntry = {
  outcome: "deleted" | "skipped" | "error"
  entity_id: string
  variant_id?: string
  valid_from?: string
  warnings: Array<{
    code: "VARIANT_COUNT_APPROACHING_CAP"
    message: string
    details: {
      variant_count: { ... }
      cap: { ... }
    }
  } | {
    code: "ACTIVE_VERSION_CHANGED"
    message: string
    details: {
      valid_from: { ... }
      active_valid_from?: { ... }
    }
  } | {
    code: "SUPERSEDED_VERSION_WRITTEN"
    message: string
    details: {
      valid_from: { ... }
      active_valid_from?: { ... }
    }
  } | {
    code: "ATTRIBUTES_NOT_APPLIED"
    message: string
    details: {
      attributes: { ... }
    }
  }>
  error?: {
    message: string
    status?: number
    cause?: string
    error?: string | Record<string, unknown>[]
  }
}
```

### `Error`

```ts
type Error = {
  message: string
  status?: number
  cause?: string
}
```

### `ReportedError`

The `error` field of an error response: the message, or — where the request failed
validation before any handler ran — the validation errors themselves.


```ts
type ReportedError = string | Record<string, unknown>[]
```

### `ConditionalPricingError`

An error from a conditional-pricing operation, carrying a `code` plus the structured data
that code explains. `details` is typed per code: narrow on `code` and the object under it
declares exactly the fields that code sends.

A request these schemas reject is answered by the request validator with a

```ts
type ConditionalPricingError = {
  message: string
  status?: number
  cause?: string
  error?: string | Record<string, unknown>[]
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
  is_conditional?: boolean
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
      is_conditional?: { ... }
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
  inputs?: {
    type?: "power" | "gas"
    consumptionHT?: number
    consumptionNT?: number
    consumptionType?: "household" | "heating_pump" | "night_storage_heating" | "night_storage_heating_common_meter"
    zipCode?: string
    city?: string
    providerId?: string
    billingPeriod?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    referenceDate?: string // date
  }
  _meta?: {
    signature: string
    timestamp: number
  }
}
```

### `ExternalLocationMetadata`

```ts
type ExternalLocationMetadata = {
  name: string
  code: string
  type: "gas" | "power"
  additionalData: {
    gridOperators: Array<{
      name: { ... }
      codeNumber: { ... }
      validFrom?: { ... }
      validUntil?: { ... }
    }>
    defaultSuppliers: Array<{
      name: { ... }
      codeNumber: { ... }
      validFrom?: { ... }
      validUntil?: { ... }
    }>
    marketAreaDetails: {
      gasType?: { ... }
      marketArea?: { ... }
      virtualTradingPoint?: { ... }
    } | {
      controlZone?: { ... }
      balancingZone?: { ... }
    }
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
  fields?: string[]
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

### `CatalogFieldsParam`

List of entity fields to include or exclude from the results.


```ts
type CatalogFieldsParam = string[]
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
    is_conditional?: boolean
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
    is_conditional?: boolean
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
  city?: string
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
  city?: string
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
  city?: string
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
  city?: string
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
  city?: string
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
  inputs?: {
    type?: "power" | "gas"
    consumptionHT?: number
    consumptionNT?: number
    consumptionType?: "household" | "heating_pump" | "night_storage_heating" | "night_storage_heating_common_meter"
    zipCode?: string
    city?: string
    providerId?: string
    billingPeriod?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    referenceDate?: string // date
  }
  _meta?: {
    signature: string
    timestamp: number
  }
}
```

### `ComputePriceInputs`

Echo of the request parameters used to compute the price, in the caller-facing shape.

```ts
type ComputePriceInputs = {
  type?: "power" | "gas"
  consumptionHT?: number
  consumptionNT?: number
  consumptionType?: "household" | "heating_pump" | "night_storage_heating" | "night_storage_heating_common_meter"
  zipCode?: string
  city?: string
  providerId?: string
  billingPeriod?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
  referenceDate?: string // date
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
  type: "gas" | "power"
  additionalData: {
    gridOperators: Array<{
      name: { ... }
      codeNumber: { ... }
      validFrom?: { ... }
      validUntil?: { ... }
    }>
    defaultSuppliers: Array<{
      name: { ... }
      codeNumber: { ... }
      validFrom?: { ... }
      validUntil?: { ... }
    }>
    marketAreaDetails: {
      gasType?: { ... }
      marketArea?: { ... }
      virtualTradingPoint?: { ... }
    } | {
      controlZone?: { ... }
      balancingZone?: { ... }
    }
  }
  _meta?: {
    signature: string
    timestamp: number
  }
}>
```

### `Provider`

The provider entity

```ts
type Provider = {
  name: string
  code: string
  type: "gas" | "power"
  additionalData: {
    gridOperators: Array<{
      name: { ... }
      codeNumber: { ... }
      validFrom?: { ... }
      validUntil?: { ... }
    }>
    defaultSuppliers: Array<{
      name: { ... }
      codeNumber: { ... }
      validFrom?: { ... }
      validUntil?: { ... }
    }>
    marketAreaDetails: {
      gasType?: { ... }
      marketArea?: { ... }
      virtualTradingPoint?: { ... }
    } | {
      controlZone?: { ... }
      balancingZone?: { ... }
    }
  }
  _meta?: {
    signature: string
    timestamp: number
  }
}
```

### `AdditionalProviderData`

Additional data included in the provider entity

```ts
type AdditionalProviderData = {
  gridOperators: Array<{
    name: string
    codeNumber: string
    validFrom?: string // date
    validUntil?: string // date
  }>
  defaultSuppliers: Array<{
    name: string
    codeNumber: string
    validFrom?: string // date
    validUntil?: string // date
  }>
  marketAreaDetails: {
    gasType?: "L-Gas" | "H-Gas"
    marketArea?: string
    virtualTradingPoint?: string
  } | {
    controlZone?: string
    balancingZone?: string
  }
}
```

### `MarketParticipant`

Market participant data

```ts
type MarketParticipant = {
  name: string
  codeNumber: string
  validFrom?: string // date
  validUntil?: string // date
}
```

### `GasMarketAreaDetails`

Market area details for gas

```ts
type GasMarketAreaDetails = {
  gasType?: "L-Gas" | "H-Gas"
  marketArea?: string
  virtualTradingPoint?: string
}
```

### `PowerMarketAreaDetails`

Market area details for power

```ts
type PowerMarketAreaDetails = {
  controlZone?: string
  balancingZone?: string
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
      inputs?: { ... }
      _meta?: { ... }
    }
    external_location_metadata?: {
      name: { ... }
      code: { ... }
      type: { ... }
      additionalData: { ... }
      _meta?: { ... }
    }
    external_price_metadata?: {
      market: { ... }
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
      external_location_metadata?: { ... }
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
      external_location_metadata?: { ... }
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
    is_conditional?: boolean
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
    inputs?: {
      type?: { ... }
      consumptionHT?: { ... }
      consumptionNT?: { ... }
      consumptionType?: { ... }
      zipCode?: { ... }
      city?: { ... }
      providerId?: { ... }
      billingPeriod?: { ... }
      referenceDate?: { ... }
    }
    _meta?: {
      signature: { ... }
      timestamp: { ... }
    }
  }
  external_location_metadata?: {
    name: string
    code: string
    type: "gas" | "power"
    additionalData: {
      gridOperators: { ... }
      defaultSuppliers: { ... }
      marketAreaDetails: { ... }
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
    inputs?: {
      type?: { ... }
      consumptionHT?: { ... }
      consumptionNT?: { ... }
      consumptionType?: { ... }
      zipCode?: { ... }
      city?: { ... }
      providerId?: { ... }
      billingPeriod?: { ... }
      referenceDate?: { ... }
    }
    _meta?: {
      signature: { ... }
      timestamp: { ... }
    }
  }
  external_location_metadata?: {
    name: string
    code: string
    type: "gas" | "power"
    additionalData: {
      gridOperators: { ... }
      defaultSuppliers: { ... }
      marketAreaDetails: { ... }
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
    is_conditional?: boolean
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
    inputs?: {
      type?: { ... }
      consumptionHT?: { ... }
      consumptionNT?: { ... }
      consumptionType?: { ... }
      zipCode?: { ... }
      city?: { ... }
      providerId?: { ... }
      billingPeriod?: { ... }
      referenceDate?: { ... }
    }
    _meta?: {
      signature: { ... }
      timestamp: { ... }
    }
  }
  external_location_metadata?: {
    name: string
    code: string
    type: "gas" | "power"
    additionalData: {
      gridOperators: { ... }
      defaultSuppliers: { ... }
      marketAreaDetails: { ... }
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
    inputs?: {
      type?: { ... }
      consumptionHT?: { ... }
      consumptionNT?: { ... }
      consumptionType?: { ... }
      zipCode?: { ... }
      city?: { ... }
      providerId?: { ... }
      billingPeriod?: { ... }
      referenceDate?: { ... }
    }
    _meta?: {
      signature: { ... }
      timestamp: { ... }
    }
  }
  external_location_metadata?: {
    name: string
    code: string
    type: "gas" | "power"
    additionalData: {
      gridOperators: { ... }
      defaultSuppliers: { ... }
      marketAreaDetails: { ... }
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
  } | {
    type: "VAT" | "GST" | "Custom"
    rate: number
    description?: string
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
      inputs?: { ... }
      _meta?: { ... }
    }
    external_location_metadata?: {
      name: { ... }
      code: { ... }
      type: { ... }
      additionalData: { ... }
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
      is_conditional?: { ... }
      requires_promo_code?: { ... }
    }>
    type?: "one_time" | "recurring"
    billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly"
    unit_amount?: number
    unit_amount_gross?: number
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
    is_conditional?: boolean
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
    is_conditional?: boolean
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
    is_conditional?: boolean
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
    is_conditional?: boolean
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
  } | {
    type: "VAT" | "GST" | "Custom"
    rate: number
    description?: string
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

A detail associated with a specific cashback.

```ts
type CashbackAmount = {
  cashback_name?: string
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
      cashback_name?: { ... }
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
      is_conditional?: { ... }
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
      is_conditional?: { ... }
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
    is_conditional?: boolean
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
      is_conditional?: { ... }
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
      is_conditional?: { ... }
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

### `TaxItem`

A minimal, ad-hoc tax rate for line items with no backing tax entity
in the catalog (e.g. a fully custom/composite price component built
by a client with no product/price reference to resolve tax from).
Mirrors how PriceItem relates to Price: unlike Tax, this has no
entity identity — it isn't persis

```ts
type TaxItem = {
  type: "VAT" | "GST" | "Custom"
  rate: number
  description?: string
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
  is_conditional?: boolean
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
  is_conditional?: boolean
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
  is_conditional?: boolean
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
  is_conditional?: boolean
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
    is_conditional?: boolean
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
    contract: Record<string, unknown>
    contact: Record<string, unknown>
    availability_address?: {
      postal_code?: { ... }
      city?: { ... }
      street?: { ... }
      street_number?: { ... }
      journey_target_block?: { ... }
    }
    variable_inputs?: Array<{
      value?: { ... }
      unit?: { ... }
      frequency_unit?: { ... }
      journey_target_block?: { ... }
    }>
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
  contract: Record<string, unknown>
  contact: Record<string, unknown>
  availability_address?: {
    postal_code?: string
    city?: string
    street?: string
    street_number?: string
    journey_target_block?: string
  }
  variable_inputs?: Array<{
    value?: number
    unit?: string
    frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time"
    journey_target_block?: string
  }>
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
  source?: {
    item?: {
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
    }
  }
}
```

### `OfferHighlightConfig`

```ts
type OfferHighlightConfig = {
  unique_selling_point?: string
  unique_selling_point_icon?: string
  total?: {
    enabled?: boolean
    format?: "absolute" | "relative"
    only_if_better?: boolean
  }
}
```

### `Offer`

```ts
type Offer = {
  target_id?: string
  items?: Array<{
    price_id: string
    product_id: string
    highlight_config?: {
      unique_selling_point?: { ... }
      unique_selling_point_icon?: { ... }
      total?: { ... }
    }
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
