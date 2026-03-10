# Pricing API

**API Name:** `pricing`
**Base URL:** `https://pricing-api.sls.epilot.io`

The `pricing-api` hub sets the foundations for the following Pricing APIs:

### Order API
This api enables the managemen

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `$calculatePricingDetails` | POST | `/v1/pricing:compute` | calculatePricingDetails |
| `createOrder` | POST | `/v1/order` | createOrder |
| `putOrder` | PUT | `/v1/order/{id}` | putOrder |
| `$checkoutCart` | POST | `/v1/public/cart:checkout` | checkoutCart |
| `$searchCatalog` | POST | `/v1/public/catalog` | searchCatalog |
| `$privateSearchCatalog` | POST | `/v1/catalog` | privateSearchCatalog |
| `$validatePromoCodes` | POST | `/v1/public/validate-promo-codes` | validatePromoCodes |
| `$availabilityCheck` | POST | `/v1/public/availability:check` | availabilityCheck |
| `$validateAvailabilityFile` | GET | `/v1/validate-availability/{id}` | validateAvailabilityFile |
| `$historicMarketPrices` | GET | `/v1/public/historicMarketPrices` | historicMarketPrices |
| `$averageMarketPrice` | GET | `/v1/public/averageMarketPrice` | averageMarketPrice |
| `$searchExternalProducts` | POST | `/v1/public/integration/{integrationId}/products` | searchExternalProducts |
| `$searchExternalProductRecommendations` | POST | `/v1/public/integration/{integrationId}/product-recommendations` | searchExternalProductRecommendations |
| `$searchProviders` | POST | `/v1/public/integration/{integrationId}/providers:search` | searchProviders |
| `$searchStreets` | POST | `/v1/public/integration/{integrationId}/streets:search` | searchStreets |
| `$computePrice` | POST | `/v1/public/integration/{integrationId}/compute-price` | calculatePricingDetails |
| `$getCredentials` | GET | `/v1/integration/{integrationId}/credentials` | getCredentials |
| `$saveCredentials` | PUT | `/v1/integration/{integrationId}/credentials:save` | saveCredentials |
| `$deleteCredentials` | DELETE | `/v1/integration/{integrationId}/credentials:delete` | deleteCredentials |
| `$getExternalCatalogProducts` | POST | `/v1/public/external-catalog/products` | getExternalCatalogProducts |
| `$getExternalCatalogProductRecommendations` | POST | `/v1/public/external-catalog/product-recommendations` | getExternalCatalogProductRecommendations |
| `$productRecommendations` | POST | `/v1/public/product-recommendations` | productRecommendations |

## Usage

```bash
epilot pricing $calculatePricingDetails
```
