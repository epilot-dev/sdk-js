import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        /**
         * Additional data included in the provider entity
         */
        export interface AdditionalProviderData {
            gridOperators: {
                /**
                 * The name of the participant
                 */
                name: string;
                /**
                 * The BDEW/DVGW code number of the participant
                 */
                codeNumber: string;
                /**
                 * The date from which this data is valid from
                 */
                validFrom?: string; // date
                /**
                 * The date until which this data is valid to
                 */
                validUntil?: string; // date
            }[];
            defaultSuppliers: {
                /**
                 * The name of the participant
                 */
                name: string;
                /**
                 * The BDEW/DVGW code number of the participant
                 */
                codeNumber: string;
                /**
                 * The date from which this data is valid from
                 */
                validFrom?: string; // date
                /**
                 * The date until which this data is valid to
                 */
                validUntil?: string; // date
            }[];
            marketAreaDetails: /* Market area details for gas */ GasMarketAreaDetails | /* Market area details for power */ PowerMarketAreaDetails;
        }
        export interface Address {
            [name: string]: any;
            /**
             * example:
             * [
             *   "billing"
             * ]
             */
            _tags?: string[];
            /**
             * The first line of the address. Typically the street address or PO Box number.
             */
            street?: string | null;
            /**
             * The second line of the address. Typically the number of the apartment, suite, or unit.
             */
            street_number?: string | null;
            /**
             * The postal code for the address.
             */
            postal_code?: string | null;
            /**
             * The name of the city, district, village, or town.
             */
            city?: string | null;
            /**
             * The two-letter code for the country of the address.
             */
            country?: string | null;
            /**
             * An additional description for the address
             */
            additional_info?: string | null;
            /**
             * the company name, usually used as extra delivery instructions
             */
            company_name?: string | null;
            /**
             * the first name of the recipient, usually used as extra delivery instructions
             */
            first_name?: string | null;
            /**
             * the last name of the recipient, usually used as extra delivery instructions
             */
            last_name?: string | null;
            /**
             * the salutation of the recipient, usually used as extra delivery instructions
             */
            salutation?: string | null;
            /**
             * the title of the recipient, usually used as extra delivery instructions
             */
            title?: string | null;
        }
        export interface Amounts {
            /**
             * Total of all items before (discounts or) taxes are applied.
             */
            amount_subtotal?: number;
            /**
             * Total of all items before (discounts or) taxes are applied, as a string with all the decimal places.
             */
            amount_subtotal_decimal?: string;
            /**
             * Total of all items after (discounts and) taxes are applied.
             */
            amount_total?: number;
            /**
             * Total of all items after (discounts and) taxes are applied, as a string with all the decimal places.
             */
            amount_total_decimal?: string;
            /**
             * The cashback amount.
             */
            cashback_amount?: number;
            /**
             * The cashback amount as a string with all the decimal places.
             */
            cashback_amount_decimal?: string;
            cashback_period?: /* The cashback period, for now it's limited to either 0 months or 12 months */ CashbackPeriod;
            /**
             * Total amount after cashback is applied.
             */
            after_cashback_amount_total?: number;
            /**
             * Total amount after cashback is applied as a string with all the decimal places.
             */
            after_cashback_amount_total_decimal?: string;
            /**
             * The discount amount.
             */
            discount_amount?: number;
            /**
             * The discount amount as a string with all the decimal places.
             */
            discount_amount_decimal?: string;
            /**
             * The discount percentage, if the applied coupon had a percentage type.
             */
            discount_percentage?: number;
            /**
             * Total amount before discount is applied.
             */
            before_discount_amount_total?: number;
            /**
             * Total amount before discount is applied as a string with all the decimal places.
             */
            before_discount_amount_total_decimal?: string;
            /**
             * Total amount before discount is applied, excluding taxes.
             */
            before_discount_amount_subtotal?: number;
            /**
             * Total amount before discount is applied, excluding taxes, as a string with all the decimal places.
             */
            before_discount_amount_subtotal_decimal?: string;
        }
        export interface AppendVersionRequest {
            /**
             * When this version takes effect. Defaults to now.
             *
             * An RFC 3339 date (`2026-01-01`, read as midnight UTC) or date-time
             * (`2026-01-01T00:00:00Z`), to at most millisecond precision. Deliberately not declared as
             * `format: date-time`, which would reject the plain-date form that this accepts.
             *
             * A date in the past is accepted and answered with warnings, never refused. A date the
             * variant already has a version at is refused as `VERSION_CONFLICT`.
             *
             * **Omit this to mean "now"** — that is the only spelling of now that is reliably silent. A
             * timestamp taken from the caller's own clock is already some milliseconds old when the
             * server judges it, which makes it a backdate, however small, and it is answered with the
             * warnings a backdate earns.
             *
             * example:
             * 2027-01-01T00:00:00Z
             */
            valid_from?: string;
            values: /**
             * The attribute values this version overrides on the base entity, keyed by attribute name.
             *
             * Only attributes currently declaring `overridable_attribute` are applied. Metadata fields
             * (anything underscore-prefixed), readonly attributes, hidden attributes and non-overridable
             * attributes present here are ignored rather than rejected, so a client working from a slightly
             * stale schema snapshot still succeeds instead of failing on fields it could not have known to
             * drop. An attribute's `render_condition` says when to show it and has no bearing on whether a
             * variant may override it.
             *
             * Ignored means *not updated*, never *removed*: a value already stored for an attribute that is
             * not currently overridable is preserved, so removing and restoring the flag deactivates and
             * then reactivates the same override.
             *
             * A composite price's `price_components` is an ordinary overridable relation attribute: a
             * composite variant pins its component variants here the same way any other relation value is
             * set, with no special handling.
             *
             * example:
             * {
             *   "unit_amount": 2499,
             *   "unit_amount_decimal": "24.99"
             * }
             */
            VariantValues;
            /**
             * Optional, and never applied: a variant's conditions are fixed when it is created. Accepted
             * only so that a client building its body from the version it loaded is not forced to strip
             * them out, and refused when they describe a different situation from the stored one.
             *
             * example:
             * {
             *   "postal_code": "46045"
             * }
             */
            conditions?: {
                [name: string]: any;
            };
        }
        /**
         * Availability check request payload
         */
        export interface AvailabilityCheckParams {
            /**
             * Products to check availability
             */
            products: string[];
            filters: /* Availability filters dimensions */ AvailabilityFilters;
        }
        /**
         * Availability filters dimensions
         */
        export interface AvailabilityFilters {
            location: AvailabilityLocation;
            /**
             * A value to be matched against the availability window (start & end date)
             * example:
             * 2017-07-21
             */
            available_date?: string; // date
        }
        export interface AvailabilityLocation {
            /**
             * The first line of the address. Typically the street address or PO Box number.
             */
            street?: string;
            /**
             * The second line of the address. Typically the number of the apartment, suite, or unit.
             */
            street_number?: string;
            /**
             * The postal code for the address.
             */
            postal_code?: string;
            /**
             * The name of the city, district, village, or town.
             */
            city?: string;
            /**
             * The name of the country.
             */
            country?: string;
        }
        /**
         * The product availability check result payload
         * example:
         * {
         *   "available_products": [],
         *   "check_results": [
         *     {
         *       "product_id": "my-product-id-123-1",
         *       "matching_hits": 0
         *     },
         *     {
         *       "product_id": "my-product-id-123-2",
         *       "matching_hits": 0
         *     }
         *   ]
         * }
         */
        export interface AvailabilityResult {
            available_products: string[];
            /**
             * The check result details
             */
            check_results?: {
                product_id: string;
                /**
                 * The number of rules matched
                 */
                matching_hits?: number;
                /**
                 * A set of matching errors when checking availability
                 */
                matching_error?: {
                    [name: string]: any;
                };
            }[];
        }
        /**
         * An average market price over a given period in time.
         */
        export interface AverageMarketPriceRecord {
            /**
             * Cost in Cents, e.g. 12.3 for 12,3 Cents = 0.123€.
             * example:
             * 12.3
             */
            unit_amount: number;
            /**
             * Cost in decimal format, e.g. 0.123€.
             * example:
             * 0.123
             */
            unit_amount_decimal: string;
            unit_amount_currency: /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * An ISO 8601 interval in the format 'start/end'.
             * example:
             * 2025-01-01T00:00:00Z/2025-01-31T23:59:59Z
             */
            timestamp: string;
        }
        export interface AverageMarketPriceResult {
            market: /* The market for a spot market price. */ SpotMarketType;
            bidding_zone: /* The bidding zone for a spot market price. */ SpotMarketBiddingZone;
            price: /* An average market price over a given period in time. */ AverageMarketPriceRecord;
            _meta?: /* Signature meta data payload */ SignatureMeta;
        }
        /**
         * The common properties for a composite price entity, without the price components
         * example:
         * {
         *   "_id": "c2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *   "_schema": "price",
         *   "_title": "My Composite Price",
         *   "description": "My Composite Price",
         *   "_org": "739224",
         *   "_created_at": "2022-02-18T10:10:26.439Z",
         *   "_updated_at": "2022-02-18T11:53:04.191Z",
         *   "active": true,
         *   "is_composite_price": true,
         *   "price_components": {
         *     "$relation": [
         *       {
         *         "entity_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *         "_schema": "price",
         *         "_product_id": "target-price-product-id",
         *         "quantity": 1,
         *         "item": {
         *           "_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *           "unit_amount": 10000,
         *           "unit_amount_currency": "EUR",
         *           "unit_amount_decimal": "100.00",
         *           "sales_tax": "standard",
         *           "is_tax_inclusive": false,
         *           "price_display_in_journeys": "show_price",
         *           "type": "one_time",
         *           "_schema": "price",
         *           "_title": "Test 1",
         *           "description": "Test 1",
         *           "tax": {
         *             "$relation": [
         *               {
         *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
         *               }
         *             ]
         *           },
         *           "_org": "739224",
         *           "_created_at": "2022-02-18T10:10:26.439Z",
         *           "_updated_at": "2022-02-18T11:53:04.191Z",
         *           "active": true,
         *           "billing_period": "weekly",
         *           "billing_duration_unit": "months",
         *           "notice_time_unit": "months",
         *           "termination_time_unit": "months",
         *           "renewal_duration_unit": "months",
         *           "is_composite_price": false
         *         }
         *       },
         *       {
         *         "entity_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *         "_schema": "price",
         *         "_product_id": "target-price-product-id",
         *         "quantity": 2,
         *         "item": {
         *           "_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *           "unit_amount": 10000,
         *           "unit_amount_currency": "EUR",
         *           "unit_amount_decimal": "100.00",
         *           "sales_tax": "standard",
         *           "is_tax_inclusive": false,
         *           "price_display_in_journeys": "show_price",
         *           "type": "one_time",
         *           "_schema": "price",
         *           "_title": "Test 1",
         *           "description": "Test 1",
         *           "tax": {
         *             "$relation": [
         *               {
         *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
         *               }
         *             ]
         *           },
         *           "_org": "739224",
         *           "_created_at": "2022-02-18T10:10:26.439Z",
         *           "_updated_at": "2022-02-18T11:53:04.191Z",
         *           "active": true,
         *           "billing_period": "weekly",
         *           "billing_duration_unit": "months",
         *           "notice_time_unit": "months",
         *           "termination_time_unit": "months",
         *           "renewal_duration_unit": "months",
         *           "is_composite_price": false
         *         }
         *       }
         *     ]
         *   }
         * }
         */
        export interface BaseCompositePrice {
            [name: string]: any;
            /**
             * The billing period duration
             */
            billing_duration_amount?: number | null;
            /**
             * The billing period duration unit
             */
            billing_duration_unit?: "days" | "weeks" | "months" | "years";
            /**
             * The notice period duration
             */
            notice_time_amount?: number | null;
            /**
             * The notice period duration unit
             */
            notice_time_unit?: "days" | "weeks" | "months" | "years";
            /**
             * The termination period duration
             */
            termination_time_amount?: number | null;
            /**
             * The termination period duration unit
             */
            termination_time_unit?: "days" | "weeks" | "months" | "years";
            /**
             * The renewal period duration
             */
            renewal_duration_amount?: number | null;
            /**
             * The renewal period duration unit
             */
            renewal_duration_unit?: "days" | "weeks" | "months" | "years";
            /**
             * Whether the price can be used for new purchases.
             */
            active?: boolean;
            /**
             * A brief description of the price.
             */
            description?: string;
            /**
             * A set of [price](/api/pricing#tag/simple_price_schema) components that define the composite price.
             */
            price_components?: /* A set of [price](/api/pricing#tag/simple_price_schema) components that define the composite price. */ /**
             * The price entity schema for simple pricing
             * example:
             * {
             *   "unit_amount": 100000,
             *   "unit_amount_currency": "EUR",
             *   "unit_amount_decimal": "1000",
             *   "sales_tax": "standard",
             *   "is_tax_inclusive": true,
             *   "price_display_in_journeys": "show_price",
             *   "type": "one_time",
             *   "billing_period": "weekly",
             *   "billing_duration_unit": "months",
             *   "notice_time_unit": "months",
             *   "termination_time_unit": "months",
             *   "renewal_duration_unit": "months",
             *   "_schema": "price",
             *   "_title": "Solar Panel Module",
             *   "description": "Solar Panel Module",
             *   "active": true,
             *   "_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T16:04:10.369Z",
             *   "_updated_at": "2022-06-03T16:04:10.369Z",
             *   "pricing_model": "per_unit",
             *   "is_composite_price": false
             * }
             */
            Price[] | {
                $relation?: PriceComponentRelation[];
            };
            /**
             * Three-letter ISO currency code, in lowercase.
             */
            unit_amount_currency?: /* Three-letter ISO currency code, in lowercase. */ /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * The flag for prices that contain price components.
             */
            is_composite_price: true;
            /**
             * The price creation date
             */
            _created_at?: string;
            /**
             * The price id
             */
            _id?: string;
            /**
             * The price autogenerated title
             */
            _title?: string;
            /**
             * The price last update date
             */
            _updated_at?: string;
            /**
             * The organization id the price belongs to
             */
            _org_id?: string;
            /**
             * An arbitrary set of tags attached to the composite price
             */
            _tags?: string[];
        }
        /**
         * The shared properties for the coupon entity and coupon item entity
         */
        export interface BaseCouponCommon {
            [name: string]: any;
            _id: EntityId /* uuid */;
            /**
             * The auto-generated title for the title
             */
            _title: string;
            /**
             * Organization Id the entity belongs to
             */
            _org: string;
            /**
             * The schema of the entity, for coupons it is always `coupon`
             */
            _schema: "coupon";
            _tags?: string[];
            /**
             * The creation date for the opportunity
             */
            _created_at: string; // date-time
            /**
             * The date the coupon was last updated
             */
            _updated_at: string; // date-time
            name: string | null;
            description?: string | null;
            type: "fixed" | "percentage";
            category: "discount" | "cashback";
            /**
             * Use if type is set to percentage. The percentage to be discounted, represented as a whole integer.
             */
            percentage_value?: string | null;
            /**
             * Use if type is set to fixed. The fixed amount in cents to be discounted, represented as a whole integer.
             */
            fixed_value?: number;
            /**
             * Use if type is set to fixed. The unit amount in eur to be discounted, represented as a decimal string with at most 12 decimal places.
             */
            fixed_value_decimal?: string;
            /**
             * Use if type is set to fixed. Three-letter ISO currency code, in lowercase.
             */
            fixed_value_currency?: /* Use if type is set to fixed. Three-letter ISO currency code, in lowercase. */ /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            cashback_period?: /* The cashback period, for now it's limited to either 0 months or 12 months */ CashbackPeriod;
            active?: boolean;
            /**
             * Whether the coupon requires a promo code to be applied
             */
            requires_promo_code?: boolean;
        }
        export interface BaseMarketPriceRecord {
            /**
             * Cost in Cents, e.g. 12.3 for 12,3 Cents = 0.123€.
             * example:
             * 12.3
             */
            unit_amount: number;
            /**
             * Cost in decimal format, e.g. 0.123€.
             * example:
             * 0.123
             */
            unit_amount_decimal: string;
            unit_amount_currency: /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
        }
        /**
         * Represents a price item
         * example:
         * {
         *   "amount_subtotal": 10000,
         *   "amount_total": 10600,
         *   "currency": "EUR",
         *   "description": "Annual internet service",
         *   "price_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
         *   "product_id": "6241487f-b7fd-428b-ab92-24ee0b37fd84",
         *   "taxes": [
         *     {
         *       "amount": 600,
         *       "tax": {
         *         "active": true,
         *         "description": "Without Behaviour",
         *         "rate": 6,
         *         "region": "DE",
         *         "type": "VAT",
         *         "_created_at": "2022-02-07T14:49:08.831Z",
         *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
         *         "_org": "739224",
         *         "_schema": "tax",
         *         "_title": "Tax Without Behaviour",
         *         "_updated_at": "2022-02-07T14:49:08.831Z"
         *       }
         *     }
         *   ],
         *   "unit_amount": 10000,
         *   "unit_amount_net": 10000,
         *   "pricing_model": "per_unit",
         *   "_price": {
         *     "unit_amount": 10000,
         *     "unit_amount_currency": "EUR",
         *     "unit_amount_decimal": "100.00",
         *     "sales_tax": "standard",
         *     "is_tax_inclusive": false,
         *     "price_display_in_journeys": "show_price",
         *     "type": "one_time",
         *     "billing_period": "weekly",
         *     "billing_duration_unit": "months",
         *     "notice_time_unit": "months",
         *     "termination_time_unit": "months",
         *     "renewal_duration_unit": "months",
         *     "_schema": "price",
         *     "_title": "Solar Panel Module",
         *     "description": "Solar Panel Module",
         *     "active": true,
         *     "tax": {
         *       "$relation": [
         *         {
         *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
         *         }
         *       ]
         *     },
         *     "_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
         *     "_org": "728",
         *     "_created_at": "2022-06-03T16:04:10.369Z",
         *     "_updated_at": "2022-06-03T16:04:10.369Z",
         *     "pricing_model": "per_unit"
         *   },
         *   "_product": {
         *     "name": "Cool box",
         *     "type": "product",
         *     "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
         *     "_title": "Cool box"
         *   }
         * }
         */
        export interface BasePriceItem {
            /**
             * Total of all items before (discounts or) taxes are applied.
             */
            amount_subtotal?: number;
            /**
             * Total of all items before (discounts or) taxes are applied, as a string with all the decimal places.
             */
            amount_subtotal_decimal?: string;
            /**
             * Total of all items after (discounts and) taxes are applied.
             */
            amount_total?: number;
            /**
             * Total of all items after (discounts and) taxes are applied, as a string with all the decimal places.
             */
            amount_total_decimal?: string;
            /**
             * The cashback amount.
             */
            cashback_amount?: number;
            /**
             * The cashback amount as a string with all the decimal places.
             */
            cashback_amount_decimal?: string;
            cashback_period?: /* The cashback period, for now it's limited to either 0 months or 12 months */ CashbackPeriod;
            /**
             * Total amount after cashback is applied.
             */
            after_cashback_amount_total?: number;
            /**
             * Total amount after cashback is applied as a string with all the decimal places.
             */
            after_cashback_amount_total_decimal?: string;
            /**
             * The discount amount.
             */
            discount_amount?: number;
            /**
             * The discount amount as a string with all the decimal places.
             */
            discount_amount_decimal?: string;
            /**
             * The discount percentage, if the applied coupon had a percentage type.
             */
            discount_percentage?: number;
            /**
             * Total amount before discount is applied.
             */
            before_discount_amount_total?: number;
            /**
             * Total amount before discount is applied as a string with all the decimal places.
             */
            before_discount_amount_total_decimal?: string;
            /**
             * Total amount before discount is applied, excluding taxes.
             */
            before_discount_amount_subtotal?: number;
            /**
             * Total amount before discount is applied, excluding taxes, as a string with all the decimal places.
             */
            before_discount_amount_subtotal_decimal?: string;
            metadata?: /* A set of key-value pairs used to store meta data information about an entity. */ MetaData;
            /**
             * The quantity of products being purchased.
             */
            quantity?: number;
            /**
             * The id of the product.
             */
            product_id?: string;
            /**
             * The id of the price.
             */
            price_id?: string;
            /**
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
            /**
             * The description for the product.
             */
            product_description?: string;
            /**
             * The name for the product.
             */
            product_name?: string;
            price_mappings?: /**
             * example:
             * [
             *   {
             *     "price_id": "589B011B-F8D9-4F8E-AD71-BACE4B543C0F",
             *     "frequency_unit": "weekly",
             *     "value": 1000.245,
             *     "name": "avg consumption",
             *     "metadata": {
             *       "journey_title": "energy journey",
             *       "step_name": "avg consumption picker"
             *     }
             *   }
             * ]
             */
            PriceInputMappings;
            /**
             * Specifies whether the price is considered `inclusive` of taxes or not.
             */
            is_tax_inclusive?: boolean;
            /**
             * The snapshot of the product.
             * example:
             * {
             *   "type": "product",
             *   "_schema": "product",
             *   "_title": "Solar Panel with Battery Storage",
             *   "name": "Solar Panel with Battery Storage",
             *   "code": "SOLAR-BATT",
             *   "active": true,
             *   "description": "Solar Panel with battery solution, optimized for max efficiency. ",
             *   "feature": [
             *     {
             *       "_tags": [],
             *       "feature": "Eco-Panels"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Remote Management Platform"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Battery Remote Control"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Mobile App"
             *     }
             *   ],
             *   "cross_sellable_products": {
             *     "$relation": [
             *       {
             *         "entity_id": "068d0713-a650-4668-9ed2-eca7be31e337",
             *         "_schema": "product",
             *         "_tags": []
             *       },
             *       {
             *         "entity_id": "c8402ee7-fba9-4f3d-bffd-6803ca655782",
             *         "_tags": []
             *       }
             *     ]
             *   },
             *   "product_images": {
             *     "$relation": [
             *       {
             *         "entity_id": "37bdeaaa-65fe-403e-9894-65b01cd277f1"
             *       },
             *       {
             *         "entity_id": "56dde657-795c-41bb-bf53-98fd586b7e6e"
             *       }
             *     ]
             *   },
             *   "product_downloads": {
             *     "$relation": [
             *       {
             *         "entity_id": "64211361-8759-414b-81c0-afbf24f83aa9"
             *       }
             *     ]
             *   },
             *   "_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T15: 52: 27.512Z",
             *   "_updated_at": "2022-06-03T16: 05: 15.029Z",
             *   "price_options": {
             *     "$relation": [
             *       {
             *         "entity_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *         "_tags": []
             *       },
             *       {
             *         "entity_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *         "_tags": []
             *       }
             *     ]
             *   }
             * }
             */
            _product?: {
                [name: string]: any;
                /**
                 * The description for the product
                 */
                description?: string;
                /**
                 * The product code
                 */
                code?: string;
                /**
                 * The type of Product:
                 *
                 * | type | description |
                 * |----| ----|
                 * | `product` | Represents a physical good |
                 * | `service` | Represents a service or virtual product |
                 *
                 */
                type?: "product" | "service";
                /**
                 * The product main name
                 */
                name?: string;
                /**
                 * The product categories
                 */
                categories?: string[];
                feature?: {
                    /**
                     * An arbitrary set of tags attached to a feature
                     */
                    _tags?: string[];
                    feature?: string;
                }[];
                /**
                 * Stores references to products that can be cross sold with the current product.
                 */
                cross_sellable_products?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to a set of file images of the product
                 */
                product_images?: /* Stores references to a set of file images of the product */ {
                    $relation?: EntityRelation[];
                } | File[];
                /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                product_downloads?: /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                {
                    $relation?: EntityRelation[];
                } | File[];
                /**
                 * A set of [prices](/api/pricing#tag/simple_price_schema) or [composite prices](/api/pricing#tag/dynamic_price_schema) for the current product.
                 */
                price_options?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to the availability files that define where this product is available.
                 * These files are used when interacting with products via epilot Journeys, thought the AvailabilityCheck block.
                 *
                 */
                _availability_files?: File[];
                /**
                 * The product id
                 */
                _id?: string;
                /**
                 * The autogenerated product title
                 */
                _title?: string;
                /**
                 * The organization id the product belongs to
                 */
                _org_id?: string;
                /**
                 * The product creation date
                 */
                _created_at?: string;
                /**
                 * The product last update date
                 */
                _updated_at?: string;
            };
            /**
             * price item id
             */
            _id?: string;
            /**
             * The unit amount value
             */
            unit_amount?: number;
            /**
             * The unit amount in eur to be charged, represented as a decimal string with at most 12 decimal places.
             */
            unit_amount_decimal?: string;
            /**
             * The unit amount before any discount is applied
             */
            before_discount_unit_amount?: number;
            /**
             * The unit amount before any discount is applied, represented as a decimal string with at most 12 decimal places.
             */
            before_discount_unit_amount_decimal?: string;
            /**
             * The unit gross amount before any discount is applied
             */
            before_discount_unit_amount_gross?: number;
            /**
             * The unit gross amount before any discount is applied, represented as a decimal string with at most 12 decimal places.
             */
            before_discount_unit_amount_gross_decimal?: string;
            /**
             * The unit net amount before any discount is applied
             */
            before_discount_unit_amount_net?: number;
            /**
             * The unit net amount before any discount is applied, represented as a decimal string with at most 12 decimal places.
             */
            before_discount_unit_amount_net_decimal?: string;
            /**
             * The discount amount applied for each unit
             */
            unit_discount_amount?: number;
            /**
             * The discount amount applied for each unit represented as a decimal string
             */
            unit_discount_amount_decimal?: string;
            /**
             * The unit gross amount value.
             */
            unit_amount_gross?: number;
            /**
             * The unit gross amount value.
             */
            unit_amount_gross_decimal?: string;
            /**
             * Net unit amount without taxes or discounts.
             */
            unit_amount_net?: number;
            /**
             * Net unit amount without taxes or discounts.
             */
            unit_amount_net_decimal?: string;
            /**
             * The net discount amount applied for each unit
             */
            unit_discount_amount_net?: number;
            /**
             * The net discount amount applied for each unit represented as a decimal string
             */
            unit_discount_amount_net_decimal?: string;
            /**
             * The discount amount applied to the tax
             */
            tax_discount_amount?: number;
            /**
             * The discount amount applied to the tax represented as a decimal string
             */
            tax_discount_amount_decimal?: string;
            /**
             * The net discount amount applied
             */
            discount_amount_net?: number;
            /**
             * The net discount amount applied represented as a decimal string
             */
            discount_amount_net_decimal?: string;
            /**
             * Total tax amount for this line item.
             */
            amount_tax?: number;
            /**
             * The tax amount before any discount is applied
             */
            before_discount_tax_amount?: number;
            /**
             * The tax amount before any discount is applied represented as a decimal string
             */
            before_discount_tax_amount_decimal?: string;
            currency?: /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * The taxes applied to the price item.
             */
            taxes?: (/* A tax amount associated with a specific tax rate. */ TaxAmount)[];
            /**
             * The sum of amounts of the price items by recurrence.
             */
            recurrences?: (/* An amount associated with a specific recurrence. */ RecurrenceAmount)[];
            /**
             * The coupons applicable to the price item
             */
            _coupons?: (/* The shared properties for the coupon entity and coupon item entity */ CouponItem)[];
            /**
             * When set to true on a `_price` displayed as OnRequest (`show_as_on_request: 'on_request'`) this flag means the price has been approved and can now be displayed to the customer. This flag is only valid for prices shown as 'on_request'.
             */
            on_request_approved?: boolean;
        }
        /**
         * Represents the common keys in BasePriceItem and BasePriceItemDto
         */
        export interface BasePriceItemCommon {
            metadata?: /* A set of key-value pairs used to store meta data information about an entity. */ MetaData;
            /**
             * The quantity of products being purchased.
             */
            quantity?: number;
            /**
             * The id of the product.
             */
            product_id?: string;
            /**
             * The id of the price.
             */
            price_id?: string;
            /**
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
            /**
             * The description for the product.
             */
            product_description?: string;
            /**
             * The name for the product.
             */
            product_name?: string;
            price_mappings?: /**
             * example:
             * [
             *   {
             *     "price_id": "589B011B-F8D9-4F8E-AD71-BACE4B543C0F",
             *     "frequency_unit": "weekly",
             *     "value": 1000.245,
             *     "name": "avg consumption",
             *     "metadata": {
             *       "journey_title": "energy journey",
             *       "step_name": "avg consumption picker"
             *     }
             *   }
             * ]
             */
            PriceInputMappings;
            /**
             * Specifies whether the price is considered `inclusive` of taxes or not.
             */
            is_tax_inclusive?: boolean;
            /**
             * The snapshot of the product.
             * example:
             * {
             *   "type": "product",
             *   "_schema": "product",
             *   "_title": "Solar Panel with Battery Storage",
             *   "name": "Solar Panel with Battery Storage",
             *   "code": "SOLAR-BATT",
             *   "active": true,
             *   "description": "Solar Panel with battery solution, optimized for max efficiency. ",
             *   "feature": [
             *     {
             *       "_tags": [],
             *       "feature": "Eco-Panels"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Remote Management Platform"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Battery Remote Control"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Mobile App"
             *     }
             *   ],
             *   "cross_sellable_products": {
             *     "$relation": [
             *       {
             *         "entity_id": "068d0713-a650-4668-9ed2-eca7be31e337",
             *         "_schema": "product",
             *         "_tags": []
             *       },
             *       {
             *         "entity_id": "c8402ee7-fba9-4f3d-bffd-6803ca655782",
             *         "_tags": []
             *       }
             *     ]
             *   },
             *   "product_images": {
             *     "$relation": [
             *       {
             *         "entity_id": "37bdeaaa-65fe-403e-9894-65b01cd277f1"
             *       },
             *       {
             *         "entity_id": "56dde657-795c-41bb-bf53-98fd586b7e6e"
             *       }
             *     ]
             *   },
             *   "product_downloads": {
             *     "$relation": [
             *       {
             *         "entity_id": "64211361-8759-414b-81c0-afbf24f83aa9"
             *       }
             *     ]
             *   },
             *   "_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T15: 52: 27.512Z",
             *   "_updated_at": "2022-06-03T16: 05: 15.029Z",
             *   "price_options": {
             *     "$relation": [
             *       {
             *         "entity_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *         "_tags": []
             *       },
             *       {
             *         "entity_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *         "_tags": []
             *       }
             *     ]
             *   }
             * }
             */
            _product?: {
                [name: string]: any;
                /**
                 * The description for the product
                 */
                description?: string;
                /**
                 * The product code
                 */
                code?: string;
                /**
                 * The type of Product:
                 *
                 * | type | description |
                 * |----| ----|
                 * | `product` | Represents a physical good |
                 * | `service` | Represents a service or virtual product |
                 *
                 */
                type?: "product" | "service";
                /**
                 * The product main name
                 */
                name?: string;
                /**
                 * The product categories
                 */
                categories?: string[];
                feature?: {
                    /**
                     * An arbitrary set of tags attached to a feature
                     */
                    _tags?: string[];
                    feature?: string;
                }[];
                /**
                 * Stores references to products that can be cross sold with the current product.
                 */
                cross_sellable_products?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to a set of file images of the product
                 */
                product_images?: /* Stores references to a set of file images of the product */ {
                    $relation?: EntityRelation[];
                } | File[];
                /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                product_downloads?: /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                {
                    $relation?: EntityRelation[];
                } | File[];
                /**
                 * A set of [prices](/api/pricing#tag/simple_price_schema) or [composite prices](/api/pricing#tag/dynamic_price_schema) for the current product.
                 */
                price_options?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to the availability files that define where this product is available.
                 * These files are used when interacting with products via epilot Journeys, thought the AvailabilityCheck block.
                 *
                 */
                _availability_files?: File[];
                /**
                 * The product id
                 */
                _id?: string;
                /**
                 * The autogenerated product title
                 */
                _title?: string;
                /**
                 * The organization id the product belongs to
                 */
                _org_id?: string;
                /**
                 * The product creation date
                 */
                _created_at?: string;
                /**
                 * The product last update date
                 */
                _updated_at?: string;
            };
        }
        /**
         * Represents a valid base price item from a client.
         */
        export interface BasePriceItemDto {
            metadata?: /* A set of key-value pairs used to store meta data information about an entity. */ MetaData;
            /**
             * The quantity of products being purchased.
             */
            quantity?: number;
            /**
             * The id of the product.
             */
            product_id?: string;
            /**
             * The id of the price.
             */
            price_id?: string;
            /**
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
            /**
             * The description for the product.
             */
            product_description?: string;
            /**
             * The name for the product.
             */
            product_name?: string;
            price_mappings?: /**
             * example:
             * [
             *   {
             *     "price_id": "589B011B-F8D9-4F8E-AD71-BACE4B543C0F",
             *     "frequency_unit": "weekly",
             *     "value": 1000.245,
             *     "name": "avg consumption",
             *     "metadata": {
             *       "journey_title": "energy journey",
             *       "step_name": "avg consumption picker"
             *     }
             *   }
             * ]
             */
            PriceInputMappings;
            /**
             * Specifies whether the price is considered `inclusive` of taxes or not.
             */
            is_tax_inclusive?: boolean;
            /**
             * The snapshot of the product.
             * example:
             * {
             *   "type": "product",
             *   "_schema": "product",
             *   "_title": "Solar Panel with Battery Storage",
             *   "name": "Solar Panel with Battery Storage",
             *   "code": "SOLAR-BATT",
             *   "active": true,
             *   "description": "Solar Panel with battery solution, optimized for max efficiency. ",
             *   "feature": [
             *     {
             *       "_tags": [],
             *       "feature": "Eco-Panels"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Remote Management Platform"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Battery Remote Control"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Mobile App"
             *     }
             *   ],
             *   "cross_sellable_products": {
             *     "$relation": [
             *       {
             *         "entity_id": "068d0713-a650-4668-9ed2-eca7be31e337",
             *         "_schema": "product",
             *         "_tags": []
             *       },
             *       {
             *         "entity_id": "c8402ee7-fba9-4f3d-bffd-6803ca655782",
             *         "_tags": []
             *       }
             *     ]
             *   },
             *   "product_images": {
             *     "$relation": [
             *       {
             *         "entity_id": "37bdeaaa-65fe-403e-9894-65b01cd277f1"
             *       },
             *       {
             *         "entity_id": "56dde657-795c-41bb-bf53-98fd586b7e6e"
             *       }
             *     ]
             *   },
             *   "product_downloads": {
             *     "$relation": [
             *       {
             *         "entity_id": "64211361-8759-414b-81c0-afbf24f83aa9"
             *       }
             *     ]
             *   },
             *   "_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T15: 52: 27.512Z",
             *   "_updated_at": "2022-06-03T16: 05: 15.029Z",
             *   "price_options": {
             *     "$relation": [
             *       {
             *         "entity_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *         "_tags": []
             *       },
             *       {
             *         "entity_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *         "_tags": []
             *       }
             *     ]
             *   }
             * }
             */
            _product?: {
                [name: string]: any;
                /**
                 * The description for the product
                 */
                description?: string;
                /**
                 * The product code
                 */
                code?: string;
                /**
                 * The type of Product:
                 *
                 * | type | description |
                 * |----| ----|
                 * | `product` | Represents a physical good |
                 * | `service` | Represents a service or virtual product |
                 *
                 */
                type?: "product" | "service";
                /**
                 * The product main name
                 */
                name?: string;
                /**
                 * The product categories
                 */
                categories?: string[];
                feature?: {
                    /**
                     * An arbitrary set of tags attached to a feature
                     */
                    _tags?: string[];
                    feature?: string;
                }[];
                /**
                 * Stores references to products that can be cross sold with the current product.
                 */
                cross_sellable_products?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to a set of file images of the product
                 */
                product_images?: /* Stores references to a set of file images of the product */ {
                    $relation?: EntityRelation[];
                } | File[];
                /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                product_downloads?: /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                {
                    $relation?: EntityRelation[];
                } | File[];
                /**
                 * A set of [prices](/api/pricing#tag/simple_price_schema) or [composite prices](/api/pricing#tag/dynamic_price_schema) for the current product.
                 */
                price_options?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to the availability files that define where this product is available.
                 * These files are used when interacting with products via epilot Journeys, thought the AvailabilityCheck block.
                 *
                 */
                _availability_files?: File[];
                /**
                 * The product id
                 */
                _id?: string;
                /**
                 * The autogenerated product title
                 */
                _title?: string;
                /**
                 * The organization id the product belongs to
                 */
                _org_id?: string;
                /**
                 * The product creation date
                 */
                _created_at?: string;
                /**
                 * The product last update date
                 */
                _updated_at?: string;
            };
            external_fees_mappings?: /**
             * example:
             * [
             *   {
             *     "price_id": "589B011B-F8D9-4F8E-AD71-BACE4B543C0F",
             *     "frequency_unit": "weekly",
             *     "amount_total": 1000,
             *     "amount_total_decimal": "10.00"
             *   }
             * ]
             */
            ExternalFeeMappings;
            external_fees_metadata?: ExternalFeeMetadata;
            external_location_metadata?: /* The provider entity */ ExternalLocationMetadata;
            external_price_metadata?: ExternalPriceMetadata;
            _immutable_pricing_details?: /* The result from the calculation of a set of price items. */ PricingDetails;
            /**
             * The ids of the coupons applicable to the price item
             */
            coupon_ids?: string[];
            /**
             * The taxes applied to the price item.
             */
            taxes?: (/* A valid tax rate from a client. */ TaxAmountDto)[];
            /**
             * The taxes applied to the price item.
             */
            recurrences?: (/* An amount associated with a specific recurrence. */ RecurrenceAmountDto)[];
            /**
             * The coupons applicable to the price item
             */
            _coupons?: (/* The shared properties for the coupon entity and coupon item entity */ CouponItem)[];
        }
        export interface BasicAuthCredentials {
            /**
             * The username
             * example:
             * username
             */
            username: string;
            /**
             * The password
             * example:
             * 123456
             */
            password: string;
        }
        export interface BasicAuthIntegration {
            /**
             * The username
             * example:
             * username
             */
            username: string;
            /**
             * The password
             * example:
             * 123456
             */
            password: string;
            auth_type?: "basic_auth";
            /**
             * The base URL
             * example:
             * https://api.example.com
             */
            base_url?: string;
        }
        export type BillingPeriod = "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly";
        /**
         * A valid cart payload from a client.
         */
        export interface CartDto {
            metadata?: /* A set of key-value pairs used to store meta data information about an entity. */ MetaData;
            customer?: Customer;
            billing_address?: Address;
            delivery_address?: Address;
            /**
             * type of source, e.g. journey or manual
             * example:
             * journey
             */
            source_type?: string;
            /**
             * identifier for source e.g. journey ID
             * example:
             * ce99875f-fba9-4fe2-a8f9-afaf52059051
             */
            source_id?: string;
            source?: /* The order generation source */ OrderSource;
            additional_addresses?: Address[];
            payment_method?: /**
             * A PaymentMethod represent your customer's payment instruments.
             *
             */
            PaymentMethod;
            line_items: /* A valid set of product prices, quantities, (discounts) and taxes from a client. */ PriceItemsDto;
            /**
             * An array of file IDs, already upload into the File API, that are related with this cart
             */
            files?: string[];
            status?: /**
             *
             * | status      | description |
             * |-------------|-------|
             * | `draft`     | ​​Starting state for all orders, at this point we can still edit the order |
             * | `quote`     | The order is in a quoting phase, bound to an expiration date |
             * | `placed`    | The order has been paid and can now be fulfilled (shipped, delivered, complete) or canceled |
             * | `cancelled` | The order has been cancelled |
             * | `completed` | The order is now closed and finalized |
             *
             */
            OrderStatus;
            tags?: string[];
            journey_data?: {
                [name: string]: any;
            };
            consents?: {
                [name: string]: any;
            };
        }
        /**
         * A detail associated with a specific cashback.
         */
        export interface CashbackAmount {
            /**
             * The name of the cashback.
             */
            cashback_name?: string;
            cashback_period: /* The cashback period, for now it's limited to either 0 months or 12 months */ CashbackPeriod;
            /**
             * The sum of all cashbacks for a specific cashback period
             */
            amount_total: number;
        }
        export interface CashbackAmounts {
            /**
             * The cashback amount.
             */
            cashback_amount?: number;
            /**
             * The cashback amount as a string with all the decimal places.
             */
            cashback_amount_decimal?: string;
            cashback_period?: /* The cashback period, for now it's limited to either 0 months or 12 months */ CashbackPeriod;
            /**
             * Total amount after cashback is applied.
             */
            after_cashback_amount_total?: number;
            /**
             * Total amount after cashback is applied as a string with all the decimal places.
             */
            after_cashback_amount_total_decimal?: string;
        }
        /**
         * The cashback period, for now it's limited to either 0 months or 12 months
         */
        export type CashbackPeriod = "0" | "12";
        /**
         * List of entity fields to include or exclude from the results.
         *
         * example:
         * [
         *   "!_files",
         *   "!**.versions"
         * ]
         */
        export type CatalogFieldsParam = string[];
        /**
         * A catalog search payload
         * example:
         * {
         *   "q": "_id:1233432 OR _id:123432454 OR _id:23445433",
         *   "sort": "description ASC",
         *   "from": 0,
         *   "size": 200
         * }
         */
        export interface CatalogSearch {
            /**
             * The query to perform using lucene query syntax.
             */
            q: string;
            /**
             * The sort expression to sort the results.
             */
            sort?: string;
            /**
             * The index from which to query, used for pagination purposes. Defaults to 0
             */
            from?: number;
            /**
             * The max size of the response, defaults to 2000.
             */
            size?: number;
            /**
             * When true, enables entity hydration to resolve nested $relation references in-place.
             */
            hydrate?: boolean;
            fields?: /**
             * List of entity fields to include or exclude from the results.
             *
             * example:
             * [
             *   "!_files",
             *   "!**.versions"
             * ]
             */
            CatalogFieldsParam;
            availability?: /* Availability filters dimensions */ AvailabilityFilters;
        }
        /**
         * The query result payload
         * example:
         * {
         *   "hits": 2,
         *   "results": [
         *     {
         *       "schema": "product",
         *       "description": "product a"
         *     },
         *     {
         *       "schema": "price",
         *       "unit_amount_decimal": "124.342343434"
         *     }
         *   ]
         * }
         */
        export interface CatalogSearchResult {
            /**
             * The number of results returned.
             */
            hits?: number;
            results?: (/**
             * The product entity
             * example:
             * {
             *   "type": "product",
             *   "_schema": "product",
             *   "_title": "Solar Panel with Battery Storage",
             *   "name": "Solar Panel with Battery Storage",
             *   "code": "SOLAR-BATT",
             *   "active": true,
             *   "description": "Solar Panel with battery solution, optimized for max efficiency. ",
             *   "feature": [
             *     {
             *       "_tags": [],
             *       "feature": "Eco-Panels"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Remote Management Platform"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Battery Remote Control"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Mobile App"
             *     }
             *   ],
             *   "cross_sellable_products": {
             *     "$relation": [
             *       {
             *         "entity_id": "068d0713-a650-4668-9ed2-eca7be31e337",
             *         "_schema": "product",
             *         "_tags": []
             *       },
             *       {
             *         "entity_id": "c8402ee7-fba9-4f3d-bffd-6803ca655782",
             *         "_tags": []
             *       }
             *     ]
             *   },
             *   "product_images": {
             *     "$relation": [
             *       {
             *         "entity_id": "37bdeaaa-65fe-403e-9894-65b01cd277f1"
             *       },
             *       {
             *         "entity_id": "56dde657-795c-41bb-bf53-98fd586b7e6e"
             *       }
             *     ]
             *   },
             *   "product_downloads": {
             *     "$relation": [
             *       {
             *         "entity_id": "64211361-8759-414b-81c0-afbf24f83aa9"
             *       }
             *     ]
             *   },
             *   "_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T15: 52: 27.512Z",
             *   "_updated_at": "2022-06-03T16: 05: 15.029Z",
             *   "price_options": {
             *     "$relation": [
             *       {
             *         "entity_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *         "_tags": []
             *       },
             *       {
             *         "entity_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *         "_tags": []
             *       }
             *     ]
             *   }
             * }
             */
            Product | /**
             * The price entity schema for simple pricing
             * example:
             * {
             *   "unit_amount": 100000,
             *   "unit_amount_currency": "EUR",
             *   "unit_amount_decimal": "1000",
             *   "sales_tax": "standard",
             *   "is_tax_inclusive": true,
             *   "price_display_in_journeys": "show_price",
             *   "type": "one_time",
             *   "billing_period": "weekly",
             *   "billing_duration_unit": "months",
             *   "notice_time_unit": "months",
             *   "termination_time_unit": "months",
             *   "renewal_duration_unit": "months",
             *   "_schema": "price",
             *   "_title": "Solar Panel Module",
             *   "description": "Solar Panel Module",
             *   "active": true,
             *   "_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T16:04:10.369Z",
             *   "_updated_at": "2022-06-03T16:04:10.369Z",
             *   "pricing_model": "per_unit",
             *   "is_composite_price": false
             * }
             */
            Price | /**
             * The coupon entity
             * example:
             * {
             *   "_id": "123e4567-e89b-12d3-a456-426614174000",
             *   "_schema": "coupon",
             *   "_org": "org_12345",
             *   "_created_at": "2024-01-15T10:00:00.000Z",
             *   "_updated_at": "2024-01-20T12:00:00.000Z",
             *   "_title": "Sample Coupon",
             *   "name": "Sample Coupon",
             *   "type": "fixed",
             *   "fixed_value": 555,
             *   "fixed_value_currency": "USD",
             *   "fixed_value_decimal": "5.55",
             *   "active": true,
             *   "category": "cashback",
             *   "prices": {
             *     "$relation": [
             *       {
             *         "entity_id": "abc12345-def6-7890-gh12-ijklmnopqrst",
             *         "_tags": [
             *           "discount",
             *           "special"
             *         ],
             *         "_schema": "price"
             *       }
             *     ]
             *   }
             * }
             */
            Coupon)[];
        }
        /**
         * The cart checkout request payload
         */
        export interface CheckoutCart {
            cart?: string | /* A valid cart payload from a client. */ CartDto;
            redeemed_promos?: RedeemedPromo[];
            mode?: /* The checkout mode for the cart checkout. */ CheckoutMode;
        }
        /**
         * The cart checkout result
         */
        export interface CheckoutCartResult {
            order?: /**
             * The order entity
             * example:
             * {
             *   "order_number": "OR 2022/742701",
             *   "status": "quote",
             *   "source": {
             *     "title": "manual",
             *     "href": null
             *   },
             *   "source_type": "manual",
             *   "_schema": "order",
             *   "_title": "OR 2022/742701",
             *   "expires_at": "2022-06-30T16:17:00.000Z",
             *   "line_items": [
             *     {
             *       "price_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *       "product_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *       "pricing_model": "per_unit",
             *       "is_composite_price": false,
             *       "taxes": [
             *         {
             *           "tax": {
             *             "_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc",
             *             "rate": 19,
             *             "_schema": "tax",
             *             "_org": "728",
             *             "_created_at": "2021-09-24T15:06:13.859Z",
             *             "_updated_at": "2022-04-04T17:36:15.273Z",
             *             "_title": "Tax Standard",
             *             "type": "VAT",
             *             "active": true,
             *             "region": "DE",
             *             "description": "Standard"
             *           },
             *           "amount": 255462
             *         }
             *       ],
             *       "_price": {
             *         "_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *         "unit_amount": 100000,
             *         "unit_amount_currency": "EUR",
             *         "unit_amount_decimal": "1000",
             *         "sales_tax": "standard",
             *         "is_tax_inclusive": true,
             *         "price_display_in_journeys": "show_price",
             *         "type": "one_time",
             *         "billing_period": "weekly",
             *         "billing_duration_unit": "months",
             *         "notice_time_unit": "months",
             *         "termination_time_unit": "months",
             *         "renewal_duration_unit": "months",
             *         "_schema": "price",
             *         "_title": "Solar Panel Module",
             *         "description": "Solar Panel Module",
             *         "active": true,
             *         "pricing_model": "per_unit",
             *         "is_composite_price": false,
             *         "tax": {
             *           "$relation": [
             *             {
             *               "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
             *             }
             *           ]
             *         },
             *         "_org": "728",
             *         "_created_at": "2022-06-03T16:04:10.369Z",
             *         "_updated_at": "2022-06-03T16:04:10.369Z"
             *       },
             *       "_product": {
             *         "_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *         "type": "product",
             *         "_schema": "product",
             *         "_title": "Solar Panel with Battery Storage",
             *         "name": "Solar Panel with Battery Storage",
             *         "code": "SOLAR-BATT",
             *         "active": true,
             *         "description": "Solar Panel with battery solution, optimized for max efficiency. ",
             *         "feature": [
             *           {
             *             "_tags": [],
             *             "feature": "Eco-Panels"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Remote Management Platform"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Battery Remote Control"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Mobile App"
             *           }
             *         ],
             *         "cross_sellable_products": {
             *           "$relation": [
             *             {
             *               "entity_id": "068d0713-a650-4668-9ed2-eca7be31e337",
             *               "_schema": "product",
             *               "_tags": []
             *             },
             *             {
             *               "entity_id": "c8402ee7-fba9-4f3d-bffd-6803ca655782",
             *               "_tags": []
             *             }
             *           ]
             *         },
             *         "product_images": {
             *           "$relation": [
             *             {
             *               "entity_id": "37bdeaaa-65fe-403e-9894-65b01cd277f1"
             *             },
             *             {
             *               "entity_id": "56dde657-795c-41bb-bf53-98fd586b7e6e"
             *             }
             *           ]
             *         },
             *         "product_downloads": {
             *           "$relation": [
             *             {
             *               "entity_id": "64211361-8759-414b-81c0-afbf24f83aa9"
             *             }
             *           ]
             *         },
             *         "_org": "728",
             *         "_created_at": "2022-06-03T15:52:27.512Z",
             *         "_updated_at": "2022-06-03T16:05:15.029Z",
             *         "price_options": {
             *           "$relation": [
             *             {
             *               "entity_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *               "_tags": []
             *             },
             *             {
             *               "entity_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *               "_tags": []
             *             }
             *           ]
             *         }
             *       },
             *       "quantity": 16,
             *       "currency": "EUR",
             *       "description": "Solar Panel Module",
             *       "unit_amount": 100000,
             *       "unit_amount_net": 84034,
             *       "amount_subtotal": 1344538,
             *       "amount_total": 1600000
             *     },
             *     {
             *       "price_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *       "product_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *       "pricing_model": "per_unit",
             *       "is_composite_price": false,
             *       "taxes": [
             *         {
             *           "tax": {
             *             "_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc",
             *             "rate": 19,
             *             "_schema": "tax",
             *             "_org": "728",
             *             "_created_at": "2021-09-24T15:06:13.859Z",
             *             "_updated_at": "2022-04-04T17:36:15.273Z",
             *             "_title": "Tax Standard",
             *             "type": "VAT",
             *             "active": true,
             *             "region": "DE",
             *             "description": "Standard"
             *           },
             *           "amount": 31933
             *         }
             *       ],
             *       "_price": {
             *         "_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *         "unit_amount": 50000,
             *         "unit_amount_currency": "EUR",
             *         "unit_amount_decimal": "500",
             *         "sales_tax": "standard",
             *         "is_tax_inclusive": true,
             *         "price_display_in_journeys": "show_price",
             *         "type": "one_time",
             *         "billing_period": "weekly",
             *         "billing_duration_unit": "months",
             *         "notice_time_unit": "months",
             *         "termination_time_unit": "months",
             *         "renewal_duration_unit": "months",
             *         "_schema": "price",
             *         "_title": "Battery Module 500amps",
             *         "description": "Battery Module 500amps",
             *         "active": true,
             *         "pricing_model": "per_unit",
             *         "is_composite_price": false,
             *         "tax": {
             *           "$relation": [
             *             {
             *               "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
             *             }
             *           ]
             *         },
             *         "_org": "728",
             *         "_created_at": "2022-06-03T16:05:04.391Z",
             *         "_updated_at": "2022-06-03T16:05:04.391Z"
             *       },
             *       "_product": {
             *         "_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *         "type": "product",
             *         "_schema": "product",
             *         "_title": "Solar Panel with Battery Storage",
             *         "name": "Solar Panel with Battery Storage",
             *         "code": "SOLAR-BATT",
             *         "active": true,
             *         "description": "Solar Panel with battery solution, optimized for max efficiency. ",
             *         "feature": [
             *           {
             *             "_tags": [],
             *             "feature": "Eco-Panels"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Remote Management Platform"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Battery Remote Control"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Mobile App"
             *           }
             *         ],
             *         "cross_sellable_products": {
             *           "$relation": [
             *             {
             *               "entity_id": "068d0713-a650-4668-9ed2-eca7be31e337",
             *               "_schema": "product",
             *               "_tags": []
             *             },
             *             {
             *               "entity_id": "c8402ee7-fba9-4f3d-bffd-6803ca655782",
             *               "_tags": []
             *             }
             *           ]
             *         },
             *         "product_images": {
             *           "$relation": [
             *             {
             *               "entity_id": "37bdeaaa-65fe-403e-9894-65b01cd277f1"
             *             },
             *             {
             *               "entity_id": "56dde657-795c-41bb-bf53-98fd586b7e6e"
             *             }
             *           ]
             *         },
             *         "product_downloads": {
             *           "$relation": [
             *             {
             *               "entity_id": "64211361-8759-414b-81c0-afbf24f83aa9"
             *             }
             *           ]
             *         },
             *         "_org": "728",
             *         "_created_at": "2022-06-03T15:52:27.512Z",
             *         "_updated_at": "2022-06-03T16:05:15.029Z",
             *         "price_options": {
             *           "$relation": [
             *             {
             *               "entity_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *               "_tags": []
             *             },
             *             {
             *               "entity_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *               "_tags": []
             *             }
             *           ]
             *         }
             *       },
             *       "quantity": 4,
             *       "currency": "EUR",
             *       "description": "Battery Module 500amps",
             *       "unit_amount": 50000,
             *       "unit_amount_net": 42017,
             *       "amount_subtotal": 168067,
             *       "amount_total": 200000
             *     },
             *     {
             *       "price_id": "d88a8763-3e3d-4fc7-a7a5-2bc9117148bf",
             *       "product_id": "065d6618-cc59-45f4-8e3a-700edf6813c3",
             *       "pricing_model": "per_unit",
             *       "is_composite_price": false,
             *       "_price": {
             *         "_id": "d88a8763-3e3d-4fc7-a7a5-2bc9117148bf",
             *         "unit_amount": 12055,
             *         "type": "recurring",
             *         "billing_period": "monthly",
             *         "billing_duration_amount": 8,
             *         "billing_duration_unit": "years",
             *         "notice_time_amount": 3,
             *         "notice_time_unit": "months",
             *         "termination_time_amount": 2,
             *         "termination_time_unit": "months",
             *         "renewal_duration_amount": 1,
             *         "renewal_duration_unit": "years",
             *         "active": true,
             *         "sales_tax": "reduced",
             *         "is_tax_inclusive": true,
             *         "description": "Monthly",
             *         "billing_scheme": "per_unit",
             *         "_schema": "price",
             *         "_org": "728",
             *         "_created_at": "2021-11-10T14:40:27.695Z",
             *         "_updated_at": "2021-12-14T18:16:33.248Z",
             *         "_title": "Monthly",
             *         "unit_amount_currency": "EUR",
             *         "unit_amount_decimal": "120.55456634",
             *         "pricing_model": "per_unit",
             *         "is_composite_price": false
             *       },
             *       "_product": {
             *         "_id": "065d6618-cc59-45f4-8e3a-700edf6813c3",
             *         "name": "Smartmeter: Schneider Electric PM5000 LCD Energiemessgerät / 3-phasig",
             *         "code": "1312378123",
             *         "_tags": [
             *           "wallbox",
             *           "review demo",
             *           "1"
             *         ],
             *         "categories": [
             *           "Power"
             *         ],
             *         "type": "product",
             *         "active": true,
             *         "feature": [
             *           {
             *             "_tags": [],
             *             "feature": "Bis zu 11 kW Ladeleistung (5x schneller laden)"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Integrierter MID Zähler für eine kilowattstundengenaue Abrechnung*"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Konfigurierbare Ladeleistung"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Zugangskontrolle über RFID-Karten"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Kommunikation über LAN"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "New feature"
             *           }
             *         ],
             *         "_schema": "product",
             *         "_org": "728",
             *         "_created_at": "2021-11-30T11:05:19.484Z",
             *         "_updated_at": "2022-01-13T09:18:29.944Z",
             *         "_title": "Smartmeter: Schneider Electric PM5000 LCD Energiemessgerät / 3-phasig",
             *         "price_options": {
             *           "$relation": [
             *             {
             *               "entity_id": "5264b089-fc6a-4a91-9a2a-80c673958faa"
             *             },
             *             {
             *               "entity_id": "d88a8763-3e3d-4fc7-a7a5-2bc9117148bf"
             *             }
             *           ]
             *         },
             *         "product_images": {
             *           "$relation": [
             *             {
             *               "entity_id": "16729e60-c527-44ef-93c9-c68b6acf1224"
             *             }
             *           ]
             *         }
             *       },
             *       "quantity": 1,
             *       "currency": "EUR",
             *       "description": "Monthly",
             *       "unit_amount": 12055,
             *       "unit_amount_net": 11267,
             *       "amount_subtotal": 11267,
             *       "amount_total": 12055,
             *       "taxes": [
             *         {
             *           "rate": "reduced",
             *           "amount": 789
             *         }
             *       ]
             *     },
             *     {
             *       "price_id": "e1ddf75a-d0d1-40b4-a07e-56e292867c88",
             *       "product_id": "5b9f05b7-f0f8-49c2-8a8d-0f8f923d6382",
             *       "pricing_model": "per_unit",
             *       "is_composite_price": false,
             *       "_price": {
             *         "_id": "e1ddf75a-d0d1-40b4-a07e-56e292867c88",
             *         "unit_amount": 9900,
             *         "unit_amount_currency": "EUR",
             *         "unit_amount_decimal": "99",
             *         "sales_tax": "standard",
             *         "is_tax_inclusive": true,
             *         "price_display_in_journeys": "show_price",
             *         "type": "recurring",
             *         "billing_period": "yearly",
             *         "billing_duration_unit": "months",
             *         "notice_time_unit": "months",
             *         "termination_time_unit": "months",
             *         "renewal_duration_unit": "months",
             *         "_schema": "price",
             *         "_title": "Yearly payment",
             *         "description": "Yearly payment",
             *         "active": true,
             *         "pricing_model": "per_unit",
             *         "is_composite_price": false,
             *         "_org": "728",
             *         "_created_at": "2022-02-07T22:58:39.884Z",
             *         "_updated_at": "2022-02-07T22:58:39.884Z"
             *       },
             *       "_product": {
             *         "_id": "5b9f05b7-f0f8-49c2-8a8d-0f8f923d6382",
             *         "_schema": "product",
             *         "_title": "Yearly Payment Product",
             *         "name": "Yearly Payment Product",
             *         "type": "product",
             *         "active": true,
             *         "price_options": {
             *           "$relation": [
             *             {
             *               "entity_id": "e1ddf75a-d0d1-40b4-a07e-56e292867c88",
             *               "_tags": []
             *             }
             *           ]
             *         },
             *         "_org": "728",
             *         "_created_at": "2022-02-07T22:58:44.162Z",
             *         "_updated_at": "2022-02-08T09:34:08.026Z",
             *         "description": "Hier steht die Produktbeschreibung die sich auf dem Dokument, was generiert wird, gezogen wird."
             *       },
             *       "quantity": 1,
             *       "currency": "EUR",
             *       "description": "Yearly payment",
             *       "unit_amount": 9900,
             *       "unit_amount_net": 8319,
             *       "amount_subtotal": 8319,
             *       "amount_total": 9900,
             *       "taxes": [
             *         {
             *           "rate": "standard",
             *           "amount": 1581
             *         }
             *       ]
             *     }
             *   ],
             *   "amount_subtotal": 1532191,
             *   "amount_total": 1821955,
             *   "total_details": {
             *     "amount_tax": 289764,
             *     "breakdown": {
             *       "taxes": [
             *         {
             *           "tax": {
             *             "_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc",
             *             "rate": 19,
             *             "_schema": "tax",
             *             "_org": "728",
             *             "_created_at": "2021-09-24T15:06:13.859Z",
             *             "_updated_at": "2022-04-04T17:36:15.273Z",
             *             "_title": "Tax Standard",
             *             "type": "VAT",
             *             "active": true,
             *             "region": "DE",
             *             "description": "Standard"
             *           },
             *           "amount": 287395
             *         }
             *       ],
             *       "recurrences": [
             *         {
             *           "type": "one_time",
             *           "amount_subtotal": 1512605,
             *           "amount_subtotal_decimal": "15126.05",
             *           "amount_total": 1800000,
             *           "amount_total_decimal": "18000.00",
             *           "amount_tax": 287395,
             *           "amount_tax_decimal": "2873.95"
             *         },
             *         {
             *           "type": "recurring",
             *           "billing_period": "monthly",
             *           "amount_subtotal": 11267,
             *           "amount_subtotal_decimal": "112.67",
             *           "amount_total": 12055,
             *           "amount_total_decimal": "120.55",
             *           "amount_tax": 789,
             *           "amount_tax_decimal": "7.89"
             *         },
             *         {
             *           "type": "recurring",
             *           "billing_period": "yearly",
             *           "amount_subtotal": 8319,
             *           "amount_subtotal_decimal": "83.19",
             *           "amount_total": 9900,
             *           "amount_total_decimal": "99.00",
             *           "amount_tax": 1581,
             *           "amount_tax_decimal": "15.81"
             *         }
             *       ]
             *     }
             *   },
             *   "currency": "EUR",
             *   "payment_method": [
             *     {
             *       "type": "IBAN",
             *       "details": {}
             *     }
             *   ],
             *   "billing_contact": {
             *     "$relation": [
             *       {
             *         "entity_id": "1834a54e-b68f-4f7f-a98a-fe16f11bc2a5",
             *         "_tags": []
             *       }
             *     ]
             *   },
             *   "billing_first_name": "Joao",
             *   "billing_last_name": "Pinho",
             *   "billing_email": "j.pinho@epilot.cloud",
             *   "billing_company_name": "epilot cloud",
             *   "billing_address": [
             *     {
             *       "_tags": [],
             *       "street": "Im Media Park",
             *       "street_number": "8a",
             *       "postal_code": "52000",
             *       "city": "Cologne",
             *       "country": "DE",
             *       "additional_info": ""
             *     }
             *   ],
             *   "delivery_address": [],
             *   "dates": [
             *     {
             *       "_tags": [
             *         "Instalation Date"
             *       ],
             *       "dates": "",
             *       "value": "2022-06-30T16:29:00.000Z"
             *     }
             *   ],
             *   "_id": "4c7c9562-f8f0-4af0-a3a6-6aebc5571a6e",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T16:29:46.303Z",
             *   "_updated_at": "2022-06-03T16:29:46.303Z"
             * }
             */
            Order;
        }
        /**
         * The checkout mode for the cart checkout.
         */
        export type CheckoutMode = "create_order" | "create_invoice" | "create_quote";
        /**
         * The composite price entity
         * example:
         * {
         *   "_id": "c2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *   "_schema": "price",
         *   "_title": "My Composite Price",
         *   "description": "My Composite Price",
         *   "_org": "739224",
         *   "_created_at": "2022-02-18T10:10:26.439Z",
         *   "_updated_at": "2022-02-18T11:53:04.191Z",
         *   "active": true,
         *   "is_composite_price": true,
         *   "price_components": {
         *     "$relation": [
         *       {
         *         "entity_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *         "_schema": "price",
         *         "_product_id": "target-price-product-id",
         *         "quantity": 1,
         *         "item": {
         *           "_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *           "unit_amount": 10000,
         *           "unit_amount_currency": "EUR",
         *           "unit_amount_decimal": "100.00",
         *           "sales_tax": "standard",
         *           "is_tax_inclusive": false,
         *           "price_display_in_journeys": "show_price",
         *           "type": "one_time",
         *           "_schema": "price",
         *           "_title": "Test 1",
         *           "description": "Test 1",
         *           "tax": {
         *             "$relation": [
         *               {
         *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
         *               }
         *             ]
         *           },
         *           "_org": "739224",
         *           "_created_at": "2022-02-18T10:10:26.439Z",
         *           "_updated_at": "2022-02-18T11:53:04.191Z",
         *           "active": true,
         *           "billing_period": "weekly",
         *           "billing_duration_unit": "months",
         *           "notice_time_unit": "months",
         *           "termination_time_unit": "months",
         *           "renewal_duration_unit": "months",
         *           "is_composite_price": false
         *         }
         *       },
         *       {
         *         "entity_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *         "_schema": "price",
         *         "_product_id": "target-price-product-id",
         *         "quantity": 2,
         *         "item": {
         *           "_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *           "unit_amount": 10000,
         *           "unit_amount_currency": "EUR",
         *           "unit_amount_decimal": "100.00",
         *           "sales_tax": "standard",
         *           "is_tax_inclusive": false,
         *           "price_display_in_journeys": "show_price",
         *           "type": "one_time",
         *           "_schema": "price",
         *           "_title": "Test 1",
         *           "description": "Test 1",
         *           "tax": {
         *             "$relation": [
         *               {
         *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
         *               }
         *             ]
         *           },
         *           "_org": "739224",
         *           "_created_at": "2022-02-18T10:10:26.439Z",
         *           "_updated_at": "2022-02-18T11:53:04.191Z",
         *           "active": true,
         *           "billing_period": "weekly",
         *           "billing_duration_unit": "months",
         *           "notice_time_unit": "months",
         *           "termination_time_unit": "months",
         *           "renewal_duration_unit": "months",
         *           "is_composite_price": false
         *         }
         *       }
         *     ]
         *   }
         * }
         */
        export type CompositePrice = /**
         * The composite price entity
         * example:
         * {
         *   "_id": "c2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *   "_schema": "price",
         *   "_title": "My Composite Price",
         *   "description": "My Composite Price",
         *   "_org": "739224",
         *   "_created_at": "2022-02-18T10:10:26.439Z",
         *   "_updated_at": "2022-02-18T11:53:04.191Z",
         *   "active": true,
         *   "is_composite_price": true,
         *   "price_components": {
         *     "$relation": [
         *       {
         *         "entity_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *         "_schema": "price",
         *         "_product_id": "target-price-product-id",
         *         "quantity": 1,
         *         "item": {
         *           "_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *           "unit_amount": 10000,
         *           "unit_amount_currency": "EUR",
         *           "unit_amount_decimal": "100.00",
         *           "sales_tax": "standard",
         *           "is_tax_inclusive": false,
         *           "price_display_in_journeys": "show_price",
         *           "type": "one_time",
         *           "_schema": "price",
         *           "_title": "Test 1",
         *           "description": "Test 1",
         *           "tax": {
         *             "$relation": [
         *               {
         *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
         *               }
         *             ]
         *           },
         *           "_org": "739224",
         *           "_created_at": "2022-02-18T10:10:26.439Z",
         *           "_updated_at": "2022-02-18T11:53:04.191Z",
         *           "active": true,
         *           "billing_period": "weekly",
         *           "billing_duration_unit": "months",
         *           "notice_time_unit": "months",
         *           "termination_time_unit": "months",
         *           "renewal_duration_unit": "months",
         *           "is_composite_price": false
         *         }
         *       },
         *       {
         *         "entity_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *         "_schema": "price",
         *         "_product_id": "target-price-product-id",
         *         "quantity": 2,
         *         "item": {
         *           "_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *           "unit_amount": 10000,
         *           "unit_amount_currency": "EUR",
         *           "unit_amount_decimal": "100.00",
         *           "sales_tax": "standard",
         *           "is_tax_inclusive": false,
         *           "price_display_in_journeys": "show_price",
         *           "type": "one_time",
         *           "_schema": "price",
         *           "_title": "Test 1",
         *           "description": "Test 1",
         *           "tax": {
         *             "$relation": [
         *               {
         *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
         *               }
         *             ]
         *           },
         *           "_org": "739224",
         *           "_created_at": "2022-02-18T10:10:26.439Z",
         *           "_updated_at": "2022-02-18T11:53:04.191Z",
         *           "active": true,
         *           "billing_period": "weekly",
         *           "billing_duration_unit": "months",
         *           "notice_time_unit": "months",
         *           "termination_time_unit": "months",
         *           "renewal_duration_unit": "months",
         *           "is_composite_price": false
         *         }
         *       }
         *     ]
         *   }
         * }
         */
        /**
         * The composite price entity
         * example:
         * {
         *   "_id": "c2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *   "_schema": "price",
         *   "_title": "My Composite Price",
         *   "description": "My Composite Price",
         *   "_org": "739224",
         *   "_created_at": "2022-02-18T10:10:26.439Z",
         *   "_updated_at": "2022-02-18T11:53:04.191Z",
         *   "active": true,
         *   "is_composite_price": true,
         *   "price_components": {
         *     "$relation": [
         *       {
         *         "entity_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *         "_schema": "price",
         *         "_product_id": "target-price-product-id",
         *         "quantity": 1,
         *         "item": {
         *           "_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *           "unit_amount": 10000,
         *           "unit_amount_currency": "EUR",
         *           "unit_amount_decimal": "100.00",
         *           "sales_tax": "standard",
         *           "is_tax_inclusive": false,
         *           "price_display_in_journeys": "show_price",
         *           "type": "one_time",
         *           "_schema": "price",
         *           "_title": "Test 1",
         *           "description": "Test 1",
         *           "tax": {
         *             "$relation": [
         *               {
         *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
         *               }
         *             ]
         *           },
         *           "_org": "739224",
         *           "_created_at": "2022-02-18T10:10:26.439Z",
         *           "_updated_at": "2022-02-18T11:53:04.191Z",
         *           "active": true,
         *           "billing_period": "weekly",
         *           "billing_duration_unit": "months",
         *           "notice_time_unit": "months",
         *           "termination_time_unit": "months",
         *           "renewal_duration_unit": "months",
         *           "is_composite_price": false
         *         }
         *       },
         *       {
         *         "entity_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *         "_schema": "price",
         *         "_product_id": "target-price-product-id",
         *         "quantity": 2,
         *         "item": {
         *           "_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *           "unit_amount": 10000,
         *           "unit_amount_currency": "EUR",
         *           "unit_amount_decimal": "100.00",
         *           "sales_tax": "standard",
         *           "is_tax_inclusive": false,
         *           "price_display_in_journeys": "show_price",
         *           "type": "one_time",
         *           "_schema": "price",
         *           "_title": "Test 1",
         *           "description": "Test 1",
         *           "tax": {
         *             "$relation": [
         *               {
         *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
         *               }
         *             ]
         *           },
         *           "_org": "739224",
         *           "_created_at": "2022-02-18T10:10:26.439Z",
         *           "_updated_at": "2022-02-18T11:53:04.191Z",
         *           "active": true,
         *           "billing_period": "weekly",
         *           "billing_duration_unit": "months",
         *           "notice_time_unit": "months",
         *           "termination_time_unit": "months",
         *           "renewal_duration_unit": "months",
         *           "is_composite_price": false
         *         }
         *       }
         *     ]
         *   }
         * }
         */
        NonHydratedCompositePrice | /**
         * The composite price entity
         * example:
         * {
         *   "_id": "c2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *   "_schema": "price",
         *   "_title": "My Composite Price",
         *   "description": "My Composite Price",
         *   "_org": "739224",
         *   "_created_at": "2022-02-18T10:10:26.439Z",
         *   "_updated_at": "2022-02-18T11:53:04.191Z",
         *   "active": true,
         *   "is_composite_price": true,
         *   "price_components": {
         *     "$relation": [
         *       {
         *         "entity_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *         "_schema": "price",
         *         "_product_id": "target-price-product-id",
         *         "quantity": 1,
         *         "item": {
         *           "_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *           "unit_amount": 10000,
         *           "unit_amount_currency": "EUR",
         *           "unit_amount_decimal": "100.00",
         *           "sales_tax": "standard",
         *           "is_tax_inclusive": false,
         *           "price_display_in_journeys": "show_price",
         *           "type": "one_time",
         *           "_schema": "price",
         *           "_title": "Test 1",
         *           "description": "Test 1",
         *           "tax": {
         *             "$relation": [
         *               {
         *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
         *               }
         *             ]
         *           },
         *           "_org": "739224",
         *           "_created_at": "2022-02-18T10:10:26.439Z",
         *           "_updated_at": "2022-02-18T11:53:04.191Z",
         *           "active": true,
         *           "billing_period": "weekly",
         *           "billing_duration_unit": "months",
         *           "notice_time_unit": "months",
         *           "termination_time_unit": "months",
         *           "renewal_duration_unit": "months",
         *           "is_composite_price": false
         *         }
         *       },
         *       {
         *         "entity_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *         "_schema": "price",
         *         "_product_id": "target-price-product-id",
         *         "quantity": 2,
         *         "item": {
         *           "_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *           "unit_amount": 10000,
         *           "unit_amount_currency": "EUR",
         *           "unit_amount_decimal": "100.00",
         *           "sales_tax": "standard",
         *           "is_tax_inclusive": false,
         *           "price_display_in_journeys": "show_price",
         *           "type": "one_time",
         *           "_schema": "price",
         *           "_title": "Test 1",
         *           "description": "Test 1",
         *           "tax": {
         *             "$relation": [
         *               {
         *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
         *               }
         *             ]
         *           },
         *           "_org": "739224",
         *           "_created_at": "2022-02-18T10:10:26.439Z",
         *           "_updated_at": "2022-02-18T11:53:04.191Z",
         *           "active": true,
         *           "billing_period": "weekly",
         *           "billing_duration_unit": "months",
         *           "notice_time_unit": "months",
         *           "termination_time_unit": "months",
         *           "renewal_duration_unit": "months",
         *           "is_composite_price": false
         *         }
         *       }
         *     ]
         *   }
         * }
         */
        HydratedCompositePrice;
        /**
         * Represents a composite price input to the pricing library.
         * example:
         * {
         *   "amount_subtotal": 10000,
         *   "amount_total": 10600,
         *   "currency": "EUR",
         *   "description": "Annual internet service",
         *   "price_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
         *   "product_id": "6241487f-b7fd-428b-ab92-24ee0b37fd84",
         *   "taxes": [
         *     {
         *       "amount": 600,
         *       "tax": {
         *         "active": true,
         *         "description": "Without Behaviour",
         *         "rate": 6,
         *         "region": "DE",
         *         "type": "VAT",
         *         "_created_at": "2022-02-07T14:49:08.831Z",
         *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
         *         "_org": "739224",
         *         "_schema": "tax",
         *         "_title": "Tax Without Behaviour",
         *         "_updated_at": "2022-02-07T14:49:08.831Z"
         *       }
         *     }
         *   ],
         *   "unit_amount": 10000,
         *   "unit_amount_net": 10000,
         *   "pricing_model": "per_unit",
         *   "_price": {
         *     "unit_amount": 10000,
         *     "unit_amount_currency": "EUR",
         *     "unit_amount_decimal": "100.00",
         *     "sales_tax": "standard",
         *     "is_tax_inclusive": false,
         *     "price_display_in_journeys": "show_price",
         *     "type": "one_time",
         *     "billing_period": "weekly",
         *     "billing_duration_unit": "months",
         *     "notice_time_unit": "months",
         *     "termination_time_unit": "months",
         *     "renewal_duration_unit": "months",
         *     "_schema": "price",
         *     "_title": "Solar Panel Module",
         *     "description": "Solar Panel Module",
         *     "active": true,
         *     "tax": {
         *       "$relation": [
         *         {
         *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
         *         }
         *       ]
         *     },
         *     "_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
         *     "_org": "728",
         *     "_created_at": "2022-06-03T16:04:10.369Z",
         *     "_updated_at": "2022-06-03T16:04:10.369Z",
         *     "pricing_model": "per_unit"
         *   },
         *   "_product": {
         *     "name": "Cool box",
         *     "type": "product",
         *     "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
         *     "_title": "Cool box"
         *   }
         * }
         */
        export interface CompositePriceItem {
            /**
             * Total of all items before (discounts or) taxes are applied.
             */
            amount_subtotal?: number;
            /**
             * Total of all items before (discounts or) taxes are applied, as a string with all the decimal places.
             */
            amount_subtotal_decimal?: string;
            /**
             * Total of all items after (discounts and) taxes are applied.
             */
            amount_total?: number;
            /**
             * Total of all items after (discounts and) taxes are applied, as a string with all the decimal places.
             */
            amount_total_decimal?: string;
            /**
             * The cashback amount.
             */
            cashback_amount?: number;
            /**
             * The cashback amount as a string with all the decimal places.
             */
            cashback_amount_decimal?: string;
            cashback_period?: /* The cashback period, for now it's limited to either 0 months or 12 months */ CashbackPeriod;
            /**
             * Total amount after cashback is applied.
             */
            after_cashback_amount_total?: number;
            /**
             * Total amount after cashback is applied as a string with all the decimal places.
             */
            after_cashback_amount_total_decimal?: string;
            /**
             * The discount amount.
             */
            discount_amount?: number;
            /**
             * The discount amount as a string with all the decimal places.
             */
            discount_amount_decimal?: string;
            /**
             * The discount percentage, if the applied coupon had a percentage type.
             */
            discount_percentage?: number;
            /**
             * Total amount before discount is applied.
             */
            before_discount_amount_total?: number;
            /**
             * Total amount before discount is applied as a string with all the decimal places.
             */
            before_discount_amount_total_decimal?: string;
            /**
             * Total amount before discount is applied, excluding taxes.
             */
            before_discount_amount_subtotal?: number;
            /**
             * Total amount before discount is applied, excluding taxes, as a string with all the decimal places.
             */
            before_discount_amount_subtotal_decimal?: string;
            metadata?: /* A set of key-value pairs used to store meta data information about an entity. */ MetaData;
            /**
             * The quantity of products being purchased.
             */
            quantity?: number;
            /**
             * The id of the product.
             */
            product_id?: string;
            /**
             * The id of the price.
             */
            price_id?: string;
            /**
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
            /**
             * The description for the product.
             */
            product_description?: string;
            /**
             * The name for the product.
             */
            product_name?: string;
            price_mappings?: /**
             * example:
             * [
             *   {
             *     "price_id": "589B011B-F8D9-4F8E-AD71-BACE4B543C0F",
             *     "frequency_unit": "weekly",
             *     "value": 1000.245,
             *     "name": "avg consumption",
             *     "metadata": {
             *       "journey_title": "energy journey",
             *       "step_name": "avg consumption picker"
             *     }
             *   }
             * ]
             */
            PriceInputMappings;
            /**
             * Specifies whether the price is considered `inclusive` of taxes or not.
             */
            is_tax_inclusive?: boolean;
            /**
             * The snapshot of the product.
             * example:
             * {
             *   "type": "product",
             *   "_schema": "product",
             *   "_title": "Solar Panel with Battery Storage",
             *   "name": "Solar Panel with Battery Storage",
             *   "code": "SOLAR-BATT",
             *   "active": true,
             *   "description": "Solar Panel with battery solution, optimized for max efficiency. ",
             *   "feature": [
             *     {
             *       "_tags": [],
             *       "feature": "Eco-Panels"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Remote Management Platform"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Battery Remote Control"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Mobile App"
             *     }
             *   ],
             *   "cross_sellable_products": {
             *     "$relation": [
             *       {
             *         "entity_id": "068d0713-a650-4668-9ed2-eca7be31e337",
             *         "_schema": "product",
             *         "_tags": []
             *       },
             *       {
             *         "entity_id": "c8402ee7-fba9-4f3d-bffd-6803ca655782",
             *         "_tags": []
             *       }
             *     ]
             *   },
             *   "product_images": {
             *     "$relation": [
             *       {
             *         "entity_id": "37bdeaaa-65fe-403e-9894-65b01cd277f1"
             *       },
             *       {
             *         "entity_id": "56dde657-795c-41bb-bf53-98fd586b7e6e"
             *       }
             *     ]
             *   },
             *   "product_downloads": {
             *     "$relation": [
             *       {
             *         "entity_id": "64211361-8759-414b-81c0-afbf24f83aa9"
             *       }
             *     ]
             *   },
             *   "_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T15: 52: 27.512Z",
             *   "_updated_at": "2022-06-03T16: 05: 15.029Z",
             *   "price_options": {
             *     "$relation": [
             *       {
             *         "entity_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *         "_tags": []
             *       },
             *       {
             *         "entity_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *         "_tags": []
             *       }
             *     ]
             *   }
             * }
             */
            _product?: {
                [name: string]: any;
                /**
                 * The description for the product
                 */
                description?: string;
                /**
                 * The product code
                 */
                code?: string;
                /**
                 * The type of Product:
                 *
                 * | type | description |
                 * |----| ----|
                 * | `product` | Represents a physical good |
                 * | `service` | Represents a service or virtual product |
                 *
                 */
                type?: "product" | "service";
                /**
                 * The product main name
                 */
                name?: string;
                /**
                 * The product categories
                 */
                categories?: string[];
                feature?: {
                    /**
                     * An arbitrary set of tags attached to a feature
                     */
                    _tags?: string[];
                    feature?: string;
                }[];
                /**
                 * Stores references to products that can be cross sold with the current product.
                 */
                cross_sellable_products?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to a set of file images of the product
                 */
                product_images?: /* Stores references to a set of file images of the product */ {
                    $relation?: EntityRelation[];
                } | File[];
                /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                product_downloads?: /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                {
                    $relation?: EntityRelation[];
                } | File[];
                /**
                 * A set of [prices](/api/pricing#tag/simple_price_schema) or [composite prices](/api/pricing#tag/dynamic_price_schema) for the current product.
                 */
                price_options?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to the availability files that define where this product is available.
                 * These files are used when interacting with products via epilot Journeys, thought the AvailabilityCheck block.
                 *
                 */
                _availability_files?: File[];
                /**
                 * The product id
                 */
                _id?: string;
                /**
                 * The autogenerated product title
                 */
                _title?: string;
                /**
                 * The organization id the product belongs to
                 */
                _org_id?: string;
                /**
                 * The product creation date
                 */
                _created_at?: string;
                /**
                 * The product last update date
                 */
                _updated_at?: string;
            };
            /**
             * price item id
             */
            _id?: string;
            /**
             * The unit amount value
             */
            unit_amount?: number;
            /**
             * The unit amount in eur to be charged, represented as a decimal string with at most 12 decimal places.
             */
            unit_amount_decimal?: string;
            /**
             * The unit amount before any discount is applied
             */
            before_discount_unit_amount?: number;
            /**
             * The unit amount before any discount is applied, represented as a decimal string with at most 12 decimal places.
             */
            before_discount_unit_amount_decimal?: string;
            /**
             * The unit gross amount before any discount is applied
             */
            before_discount_unit_amount_gross?: number;
            /**
             * The unit gross amount before any discount is applied, represented as a decimal string with at most 12 decimal places.
             */
            before_discount_unit_amount_gross_decimal?: string;
            /**
             * The unit net amount before any discount is applied
             */
            before_discount_unit_amount_net?: number;
            /**
             * The unit net amount before any discount is applied, represented as a decimal string with at most 12 decimal places.
             */
            before_discount_unit_amount_net_decimal?: string;
            /**
             * The discount amount applied for each unit
             */
            unit_discount_amount?: number;
            /**
             * The discount amount applied for each unit represented as a decimal string
             */
            unit_discount_amount_decimal?: string;
            /**
             * The unit gross amount value.
             */
            unit_amount_gross?: number;
            /**
             * The unit gross amount value.
             */
            unit_amount_gross_decimal?: string;
            /**
             * Net unit amount without taxes or discounts.
             */
            unit_amount_net?: number;
            /**
             * Net unit amount without taxes or discounts.
             */
            unit_amount_net_decimal?: string;
            /**
             * The net discount amount applied for each unit
             */
            unit_discount_amount_net?: number;
            /**
             * The net discount amount applied for each unit represented as a decimal string
             */
            unit_discount_amount_net_decimal?: string;
            /**
             * The discount amount applied to the tax
             */
            tax_discount_amount?: number;
            /**
             * The discount amount applied to the tax represented as a decimal string
             */
            tax_discount_amount_decimal?: string;
            /**
             * The net discount amount applied
             */
            discount_amount_net?: number;
            /**
             * The net discount amount applied represented as a decimal string
             */
            discount_amount_net_decimal?: string;
            /**
             * Total tax amount for this line item.
             */
            amount_tax?: number;
            /**
             * The tax amount before any discount is applied
             */
            before_discount_tax_amount?: number;
            /**
             * The tax amount before any discount is applied represented as a decimal string
             */
            before_discount_tax_amount_decimal?: string;
            currency?: /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * The taxes applied to the price item.
             */
            taxes?: (/* A tax amount associated with a specific tax rate. */ TaxAmount)[];
            /**
             * The sum of amounts of the price items by recurrence.
             */
            recurrences?: (/* An amount associated with a specific recurrence. */ RecurrenceAmount)[];
            /**
             * The coupons applicable to the composite price item + related (cashback) amounts
             */
            _coupons?: ({
                [name: string]: any;
                _id: EntityId /* uuid */;
                /**
                 * The auto-generated title for the title
                 */
                _title: string;
                /**
                 * Organization Id the entity belongs to
                 */
                _org: string;
                /**
                 * The schema of the entity, for coupons it is always `coupon`
                 */
                _schema: "coupon";
                _tags?: string[];
                /**
                 * The creation date for the opportunity
                 */
                _created_at: string; // date-time
                /**
                 * The date the coupon was last updated
                 */
                _updated_at: string; // date-time
                name: string | null;
                description?: string | null;
                type: "fixed" | "percentage";
                category: "discount" | "cashback";
                /**
                 * Use if type is set to percentage. The percentage to be discounted, represented as a whole integer.
                 */
                percentage_value?: string | null;
                /**
                 * Use if type is set to fixed. The fixed amount in cents to be discounted, represented as a whole integer.
                 */
                fixed_value?: number;
                /**
                 * Use if type is set to fixed. The unit amount in eur to be discounted, represented as a decimal string with at most 12 decimal places.
                 */
                fixed_value_decimal?: string;
                /**
                 * Use if type is set to fixed. Three-letter ISO currency code, in lowercase.
                 */
                fixed_value_currency?: /* Use if type is set to fixed. Three-letter ISO currency code, in lowercase. */ /**
                 * Three-letter ISO currency code, in lowercase. Must be a supported currency.
                 * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
                 *
                 * example:
                 * EUR
                 */
                Currency;
                cashback_period?: /* The cashback period, for now it's limited to either 0 months or 12 months */ CashbackPeriod;
                active?: boolean;
                /**
                 * Whether the coupon requires a promo code to be applied
                 */
                requires_promo_code?: boolean;
                /**
                 * The cashback amount.
                 */
                cashback_amount?: number;
                /**
                 * The cashback amount as a string with all the decimal places.
                 */
                cashback_amount_decimal?: string;
                /**
                 * Total amount after cashback is applied.
                 */
                after_cashback_amount_total?: number;
                /**
                 * Total amount after cashback is applied as a string with all the decimal places.
                 */
                after_cashback_amount_total_decimal?: string;
            } & /* The shared properties for the coupon entity and coupon item entity */ (/* The shared properties for the coupon entity and coupon item entity */ CouponItem))[];
            /**
             * When set to true on a `_price` displayed as OnRequest (`show_as_on_request: 'on_request'`) this flag means the price has been approved and can now be displayed to the customer. This flag is only valid for prices shown as 'on_request'.
             */
            on_request_approved?: boolean;
            /**
             * The flag for prices that contain price components.
             */
            is_composite_price: true;
            /**
             * Contains price item configurations, per price component, when the main price item is a [composite price](/api/pricing#tag/dynamic_price_schema).
             */
            item_components?: /**
             * Represents a price item
             * example:
             * {
             *   "amount_subtotal": 10000,
             *   "amount_total": 10600,
             *   "currency": "EUR",
             *   "description": "Annual internet service",
             *   "price_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
             *   "product_id": "6241487f-b7fd-428b-ab92-24ee0b37fd84",
             *   "taxes": [
             *     {
             *       "amount": 600,
             *       "tax": {
             *         "active": true,
             *         "description": "Without Behaviour",
             *         "rate": 6,
             *         "region": "DE",
             *         "type": "VAT",
             *         "_created_at": "2022-02-07T14:49:08.831Z",
             *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
             *         "_org": "739224",
             *         "_schema": "tax",
             *         "_title": "Tax Without Behaviour",
             *         "_updated_at": "2022-02-07T14:49:08.831Z"
             *       }
             *     },
             *     {
             *       "amount": 600,
             *       "tax": {
             *         "active": true,
             *         "description": "Without Behaviour",
             *         "rate": 6,
             *         "region": "DE",
             *         "type": "VAT",
             *         "_created_at": "2022-02-07T14:49:08.831Z",
             *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
             *         "_org": "739224",
             *         "_schema": "tax",
             *         "_title": "Tax Without Behaviour",
             *         "_updated_at": "2022-02-07T14:49:08.831Z"
             *       }
             *     }
             *   ],
             *   "unit_amount": 10000,
             *   "unit_amount_net": 10000,
             *   "pricing_model": "per_unit",
             *   "_price": {
             *     "unit_amount": 10000,
             *     "unit_amount_currency": "EUR",
             *     "unit_amount_decimal": "100.00",
             *     "sales_tax": "standard",
             *     "is_tax_inclusive": false,
             *     "price_display_in_journeys": "show_price",
             *     "type": "one_time",
             *     "billing_period": "weekly",
             *     "billing_duration_unit": "months",
             *     "notice_time_unit": "months",
             *     "termination_time_unit": "months",
             *     "renewal_duration_unit": "months",
             *     "_schema": "price",
             *     "_title": "Solar Panel Module",
             *     "description": "Solar Panel Module",
             *     "active": true,
             *     "tax": {
             *       "$relation": [
             *         {
             *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
             *         },
             *         {
             *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
             *         }
             *       ]
             *     },
             *     "_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
             *     "_org": "728",
             *     "_created_at": "2022-06-03T16:04:10.369Z",
             *     "_updated_at": "2022-06-03T16:04:10.369Z",
             *     "pricing_model": "per_unit"
             *   },
             *   "_product": {
             *     "name": "Cool box",
             *     "type": "product",
             *     "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
             *     "_title": "Cool box"
             *   }
             * }
             */
            PriceItem[];
            total_details?: /* The total details with tax (and discount) aggregated totals. */ TotalDetails;
            /**
             * The price snapshot data.
             */
            _price?: /* The price snapshot data. */ /**
             * The composite price entity
             * example:
             * {
             *   "_id": "c2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
             *   "_schema": "price",
             *   "_title": "My Composite Price",
             *   "description": "My Composite Price",
             *   "_org": "739224",
             *   "_created_at": "2022-02-18T10:10:26.439Z",
             *   "_updated_at": "2022-02-18T11:53:04.191Z",
             *   "active": true,
             *   "is_composite_price": true,
             *   "price_components": {
             *     "$relation": [
             *       {
             *         "entity_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
             *         "_schema": "price",
             *         "_product_id": "target-price-product-id",
             *         "quantity": 1,
             *         "item": {
             *           "_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
             *           "unit_amount": 10000,
             *           "unit_amount_currency": "EUR",
             *           "unit_amount_decimal": "100.00",
             *           "sales_tax": "standard",
             *           "is_tax_inclusive": false,
             *           "price_display_in_journeys": "show_price",
             *           "type": "one_time",
             *           "_schema": "price",
             *           "_title": "Test 1",
             *           "description": "Test 1",
             *           "tax": {
             *             "$relation": [
             *               {
             *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
             *               }
             *             ]
             *           },
             *           "_org": "739224",
             *           "_created_at": "2022-02-18T10:10:26.439Z",
             *           "_updated_at": "2022-02-18T11:53:04.191Z",
             *           "active": true,
             *           "billing_period": "weekly",
             *           "billing_duration_unit": "months",
             *           "notice_time_unit": "months",
             *           "termination_time_unit": "months",
             *           "renewal_duration_unit": "months",
             *           "is_composite_price": false
             *         }
             *       },
             *       {
             *         "entity_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
             *         "_schema": "price",
             *         "_product_id": "target-price-product-id",
             *         "quantity": 2,
             *         "item": {
             *           "_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
             *           "unit_amount": 10000,
             *           "unit_amount_currency": "EUR",
             *           "unit_amount_decimal": "100.00",
             *           "sales_tax": "standard",
             *           "is_tax_inclusive": false,
             *           "price_display_in_journeys": "show_price",
             *           "type": "one_time",
             *           "_schema": "price",
             *           "_title": "Test 1",
             *           "description": "Test 1",
             *           "tax": {
             *             "$relation": [
             *               {
             *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
             *               }
             *             ]
             *           },
             *           "_org": "739224",
             *           "_created_at": "2022-02-18T10:10:26.439Z",
             *           "_updated_at": "2022-02-18T11:53:04.191Z",
             *           "active": true,
             *           "billing_period": "weekly",
             *           "billing_duration_unit": "months",
             *           "notice_time_unit": "months",
             *           "termination_time_unit": "months",
             *           "renewal_duration_unit": "months",
             *           "is_composite_price": false
             *         }
             *       }
             *     ]
             *   }
             * }
             */
            CompositePrice;
        }
        /**
         * Represents a composite price input to the pricing library.
         */
        export interface CompositePriceItemDto {
            metadata?: /* A set of key-value pairs used to store meta data information about an entity. */ MetaData;
            /**
             * The quantity of products being purchased.
             */
            quantity?: number;
            /**
             * The id of the product.
             */
            product_id?: string;
            /**
             * The id of the price.
             */
            price_id?: string;
            /**
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
            /**
             * The description for the product.
             */
            product_description?: string;
            /**
             * The name for the product.
             */
            product_name?: string;
            price_mappings?: /**
             * example:
             * [
             *   {
             *     "price_id": "589B011B-F8D9-4F8E-AD71-BACE4B543C0F",
             *     "frequency_unit": "weekly",
             *     "value": 1000.245,
             *     "name": "avg consumption",
             *     "metadata": {
             *       "journey_title": "energy journey",
             *       "step_name": "avg consumption picker"
             *     }
             *   }
             * ]
             */
            PriceInputMappings;
            /**
             * Specifies whether the price is considered `inclusive` of taxes or not.
             */
            is_tax_inclusive?: boolean;
            /**
             * The snapshot of the product.
             * example:
             * {
             *   "type": "product",
             *   "_schema": "product",
             *   "_title": "Solar Panel with Battery Storage",
             *   "name": "Solar Panel with Battery Storage",
             *   "code": "SOLAR-BATT",
             *   "active": true,
             *   "description": "Solar Panel with battery solution, optimized for max efficiency. ",
             *   "feature": [
             *     {
             *       "_tags": [],
             *       "feature": "Eco-Panels"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Remote Management Platform"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Battery Remote Control"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Mobile App"
             *     }
             *   ],
             *   "cross_sellable_products": {
             *     "$relation": [
             *       {
             *         "entity_id": "068d0713-a650-4668-9ed2-eca7be31e337",
             *         "_schema": "product",
             *         "_tags": []
             *       },
             *       {
             *         "entity_id": "c8402ee7-fba9-4f3d-bffd-6803ca655782",
             *         "_tags": []
             *       }
             *     ]
             *   },
             *   "product_images": {
             *     "$relation": [
             *       {
             *         "entity_id": "37bdeaaa-65fe-403e-9894-65b01cd277f1"
             *       },
             *       {
             *         "entity_id": "56dde657-795c-41bb-bf53-98fd586b7e6e"
             *       }
             *     ]
             *   },
             *   "product_downloads": {
             *     "$relation": [
             *       {
             *         "entity_id": "64211361-8759-414b-81c0-afbf24f83aa9"
             *       }
             *     ]
             *   },
             *   "_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T15: 52: 27.512Z",
             *   "_updated_at": "2022-06-03T16: 05: 15.029Z",
             *   "price_options": {
             *     "$relation": [
             *       {
             *         "entity_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *         "_tags": []
             *       },
             *       {
             *         "entity_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *         "_tags": []
             *       }
             *     ]
             *   }
             * }
             */
            _product?: {
                [name: string]: any;
                /**
                 * The description for the product
                 */
                description?: string;
                /**
                 * The product code
                 */
                code?: string;
                /**
                 * The type of Product:
                 *
                 * | type | description |
                 * |----| ----|
                 * | `product` | Represents a physical good |
                 * | `service` | Represents a service or virtual product |
                 *
                 */
                type?: "product" | "service";
                /**
                 * The product main name
                 */
                name?: string;
                /**
                 * The product categories
                 */
                categories?: string[];
                feature?: {
                    /**
                     * An arbitrary set of tags attached to a feature
                     */
                    _tags?: string[];
                    feature?: string;
                }[];
                /**
                 * Stores references to products that can be cross sold with the current product.
                 */
                cross_sellable_products?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to a set of file images of the product
                 */
                product_images?: /* Stores references to a set of file images of the product */ {
                    $relation?: EntityRelation[];
                } | File[];
                /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                product_downloads?: /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                {
                    $relation?: EntityRelation[];
                } | File[];
                /**
                 * A set of [prices](/api/pricing#tag/simple_price_schema) or [composite prices](/api/pricing#tag/dynamic_price_schema) for the current product.
                 */
                price_options?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to the availability files that define where this product is available.
                 * These files are used when interacting with products via epilot Journeys, thought the AvailabilityCheck block.
                 *
                 */
                _availability_files?: File[];
                /**
                 * The product id
                 */
                _id?: string;
                /**
                 * The autogenerated product title
                 */
                _title?: string;
                /**
                 * The organization id the product belongs to
                 */
                _org_id?: string;
                /**
                 * The product creation date
                 */
                _created_at?: string;
                /**
                 * The product last update date
                 */
                _updated_at?: string;
            };
            external_fees_mappings?: /**
             * example:
             * [
             *   {
             *     "price_id": "589B011B-F8D9-4F8E-AD71-BACE4B543C0F",
             *     "frequency_unit": "weekly",
             *     "amount_total": 1000,
             *     "amount_total_decimal": "10.00"
             *   }
             * ]
             */
            ExternalFeeMappings;
            external_fees_metadata?: ExternalFeeMetadata;
            external_location_metadata?: /* The provider entity */ ExternalLocationMetadata;
            external_price_metadata?: ExternalPriceMetadata;
            _immutable_pricing_details?: /* The result from the calculation of a set of price items. */ PricingDetails;
            /**
             * The ids of the coupons applicable to the price item
             */
            coupon_ids?: string[];
            /**
             * The taxes applied to the price item.
             */
            taxes?: (/* A valid tax rate from a client. */ TaxAmountDto)[];
            /**
             * The taxes applied to the price item.
             */
            recurrences?: (/* An amount associated with a specific recurrence. */ RecurrenceAmountDto)[];
            /**
             * The coupons applicable to the price item
             */
            _coupons?: (/* The shared properties for the coupon entity and coupon item entity */ CouponItem)[];
            /**
             * The flag for prices that contain price components.
             */
            is_composite_price: true;
            /**
             * Contains price item configurations, per price component, when the main price item is a [composite price](/api/pricing#tag/dynamic_price_schema).
             */
            item_components?: /* Represents a price input to the pricing library. */ PriceItemDto[];
            /**
             * The ids of the price components that should be selected for the price calculation.
             */
            selected_price_component_ids?: string[];
            /**
             * The map of coupon ids applicable to the price components
             */
            price_component_coupon_ids?: {
                [name: string]: string[];
            };
            _price?: /**
             * The composite price entity
             * example:
             * {
             *   "_id": "c2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
             *   "_schema": "price",
             *   "_title": "My Composite Price",
             *   "description": "My Composite Price",
             *   "_org": "739224",
             *   "_created_at": "2022-02-18T10:10:26.439Z",
             *   "_updated_at": "2022-02-18T11:53:04.191Z",
             *   "active": true,
             *   "is_composite_price": true,
             *   "price_components": {
             *     "$relation": [
             *       {
             *         "entity_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
             *         "_schema": "price",
             *         "_product_id": "target-price-product-id",
             *         "quantity": 1,
             *         "item": {
             *           "_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
             *           "unit_amount": 10000,
             *           "unit_amount_currency": "EUR",
             *           "unit_amount_decimal": "100.00",
             *           "sales_tax": "standard",
             *           "is_tax_inclusive": false,
             *           "price_display_in_journeys": "show_price",
             *           "type": "one_time",
             *           "_schema": "price",
             *           "_title": "Test 1",
             *           "description": "Test 1",
             *           "tax": {
             *             "$relation": [
             *               {
             *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
             *               }
             *             ]
             *           },
             *           "_org": "739224",
             *           "_created_at": "2022-02-18T10:10:26.439Z",
             *           "_updated_at": "2022-02-18T11:53:04.191Z",
             *           "active": true,
             *           "billing_period": "weekly",
             *           "billing_duration_unit": "months",
             *           "notice_time_unit": "months",
             *           "termination_time_unit": "months",
             *           "renewal_duration_unit": "months",
             *           "is_composite_price": false
             *         }
             *       },
             *       {
             *         "entity_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
             *         "_schema": "price",
             *         "_product_id": "target-price-product-id",
             *         "quantity": 2,
             *         "item": {
             *           "_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
             *           "unit_amount": 10000,
             *           "unit_amount_currency": "EUR",
             *           "unit_amount_decimal": "100.00",
             *           "sales_tax": "standard",
             *           "is_tax_inclusive": false,
             *           "price_display_in_journeys": "show_price",
             *           "type": "one_time",
             *           "_schema": "price",
             *           "_title": "Test 1",
             *           "description": "Test 1",
             *           "tax": {
             *             "$relation": [
             *               {
             *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
             *               }
             *             ]
             *           },
             *           "_org": "739224",
             *           "_created_at": "2022-02-18T10:10:26.439Z",
             *           "_updated_at": "2022-02-18T11:53:04.191Z",
             *           "active": true,
             *           "billing_period": "weekly",
             *           "billing_duration_unit": "months",
             *           "notice_time_unit": "months",
             *           "termination_time_unit": "months",
             *           "renewal_duration_unit": "months",
             *           "is_composite_price": false
             *         }
             *       }
             *     ]
             *   }
             * }
             */
            CompositePrice;
        }
        /**
         * The compute price payload
         */
        export type ComputePriceParams = /* The compute price payload */ /* The compute price payload for power */ ComputePriceParamsPower | /* The compute price payload for gas */ ComputePriceParamsGas;
        export interface ComputePriceParamsBase {
            /**
             * The postal code to search for providers
             */
            postal_code: string;
            /**
             * The consumption type
             */
            consumption_type?: "household" | "heating_pump" | "night_storage_heating" | "night_storage_heating_common_meter";
            /**
             * (DEPRECATED - use consumption_HT) The yearly consumption to compute the price in kWh
             */
            consumption?: number;
            /**
             * The yearly HT consumption to compute the price in kWh
             */
            consumption_HT?: number;
            /**
             * The yearly NT consumption to compute the price in kWh
             */
            consumption_NT?: number;
            /**
             * The association id
             */
            association_id?: string;
            /**
             * The billing period (defaults to monthly)
             */
            billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time";
            /**
             * The optional reference date for the price computation (ISO 8601 format)
             */
            reference_date?: string; // date
        }
        /**
         * The compute price payload for gas
         */
        export interface ComputePriceParamsGas {
            /**
             * The postal code to search for providers
             */
            postal_code: string;
            /**
             * The consumption type
             */
            consumption_type?: "household" | "heating_pump" | "night_storage_heating" | "night_storage_heating_common_meter";
            /**
             * (DEPRECATED - use consumption_HT) The yearly consumption to compute the price in kWh
             */
            consumption?: number;
            /**
             * The yearly HT consumption to compute the price in kWh
             */
            consumption_HT?: number;
            /**
             * The yearly NT consumption to compute the price in kWh
             */
            consumption_NT?: number;
            /**
             * The association id
             */
            association_id?: string;
            /**
             * The billing period (defaults to monthly)
             */
            billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time";
            /**
             * The optional reference date for the price computation (ISO 8601 format)
             */
            reference_date?: string; // date
            /**
             * The type of energy to compute the price
             */
            type: "gas";
            concession_type?: /* The concession type for gas */ GasConcessionType;
        }
        /**
         * The compute price payload for power
         */
        export interface ComputePriceParamsPower {
            /**
             * The postal code to search for providers
             */
            postal_code: string;
            /**
             * The consumption type
             */
            consumption_type?: "household" | "heating_pump" | "night_storage_heating" | "night_storage_heating_common_meter";
            /**
             * (DEPRECATED - use consumption_HT) The yearly consumption to compute the price in kWh
             */
            consumption?: number;
            /**
             * The yearly HT consumption to compute the price in kWh
             */
            consumption_HT?: number;
            /**
             * The yearly NT consumption to compute the price in kWh
             */
            consumption_NT?: number;
            /**
             * The association id
             */
            association_id?: string;
            /**
             * The billing period (defaults to monthly)
             */
            billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time";
            /**
             * The optional reference date for the price computation (ISO 8601 format)
             */
            reference_date?: string; // date
            /**
             * The type of energy to compute the price
             */
            type: "power";
            meter_type?: /* The meter type for power */ PowerMeterType;
        }
        export interface ComputePriceResult {
            /**
             * The computed total price
             */
            amount_total: number;
            /**
             * The computed total price as decimal
             */
            amount_total_decimal: string;
            /**
             * The computed static price
             */
            amount_static?: number;
            /**
             * The computed static price as decimal
             */
            amount_static_decimal?: any;
            /**
             * The computed variable price, for the day period
             */
            amount_variable_ht?: number;
            /**
             * The computed variable price, for the day period, as decimal
             */
            amount_variable_decimal_ht?: string;
            /**
             * The computed unit price, for the day period
             */
            unit_amount_variable_ht?: number;
            /**
             * The computed unit price, for the day period, as decimal
             */
            unit_amount_variable_decimal_ht?: string;
            /**
             * The computed variable price, for the night period
             */
            amount_variable_nt?: number;
            /**
             * The computed variable price, for the night period, as decimal
             */
            amount_variable_decimal_nt?: string;
            /**
             * The computed unit price, for the night period
             */
            unit_amount_variable_nt?: number;
            /**
             * The computed unit price, for the night period, as decimal
             */
            unit_amount_variable_decimal_nt?: string;
            /**
             * The currency of the computed price (three-letter ISO currency code)
             */
            currency: /* The currency of the computed price (three-letter ISO currency code) */ /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * The billing period
             */
            billing_period: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time";
            breakdown: /* Price breakdown */ ComputedPriceBreakdown;
            _meta?: /* Signature meta data payload */ SignatureMeta;
        }
        /**
         * The computed price
         */
        export interface ComputedBasePrice {
            /**
             * The computed price
             */
            amount: number;
            /**
             * The computed price as decimal
             */
            amount_decimal: string;
            /**
             * The computed unit price
             */
            unit_amount?: number;
            /**
             * The computed unit price as decimal
             */
            unit_amount_decimal?: string;
        }
        /**
         * Price breakdown
         */
        export interface ComputedPriceBreakdown {
            static?: /* The computed price components */ ComputedPriceComponents;
            variable?: /* The computed price components */ ComputedPriceComponents;
            variable_ht?: /* The computed price components */ ComputedPriceComponents;
            variable_nt?: /* The computed price components */ ComputedPriceComponents;
        }
        /**
         * The computed price components
         */
        export interface ComputedPriceComponents {
            [name: string]: /* The computed price */ ComputedBasePrice;
        }
        /**
         * One condition dimension, in the shape a schema's `conditions` array holds it — copy it in
         * verbatim.
         *
         */
        export interface ConditionDefinition {
            /**
             * How variants and resolve contexts refer to this condition. Independent of attribute
             * names: a value needed as an attribute too is duplicated onto the variant.
             *
             * `default`, and any name beginning with `_`, are reserved for the server: a condition
             * declared under one is ignored, since nothing could pin it and no context could address it.
             *
             * example:
             * postal_code
             */
            name: string;
            /**
             * Human-readable name of the condition.
             * example:
             * Postal Code
             */
            label: string;
            type: /**
             * The kind of value a condition holds, which decides how a variant's pinned value is matched
             * against a resolve context.
             *
             * - `string`: an arbitrary string, matched exactly and case-sensitively
             * - `number`: a numeric value
             * - `date`: a single date
             * - `daterange`: a window with a from and an until timestamp; both ends may be left open
             * - `boolean`: a true/false value
             * - `select`: one of the values declared in `options`
             * - `location`: a geographic value, shaped by `format`
             *
             * There is no condition type for the fallback variant. Being the entity's fallback is a
             * property of the variant, set by the `default` flag on a variant write, and needs nothing
             * declared in the schema.
             *
             */
            ConditionType;
            /**
             * The declared vocabulary of a `select` condition, in the same shape a `select` attribute's
             * `options` take: a bare value or a `{ value, title }` object. Absent for every other type.
             *
             * Enforced on variant writes: a pinned value outside it is rejected with
             * `CONDITION_VALUE_INVALID`. Not enforced on resolve — a context value outside it simply
             * matches nothing.
             *
             * example:
             * [
             *   "private",
             *   {
             *     "value": "commercial",
             *     "title": "Commercial customers"
             *   }
             * ]
             */
            options?: (string | {
                value: string;
                title?: string;
            })[];
            /**
             * The value shape of a `location` condition. Absent for every other type.
             */
            format?: "zipcode" | "zipcode + town";
        }
        /**
         * A named bundle of condition definitions, built in for one entity type.
         */
        export interface ConditionSet {
            /**
             * Identifies the set within this entity type's catalog.
             * example:
             * delivery_area
             */
            id: string;
            /**
             * Human-readable name of the set.
             * example:
             * Delivery Area
             */
            label: string;
            /**
             * What the set is for, and when to reach for it.
             */
            description: string;
            /**
             * The condition definitions to copy into the schema's own `conditions` array.
             */
            conditions: /**
             * One condition dimension, in the shape a schema's `conditions` array holds it — copy it in
             * verbatim.
             *
             */
            ConditionDefinition[];
        }
        export interface ConditionSetCatalog {
            /**
             * The condition sets built in for the requested entity type, in the order they are offered.
             *
             */
            results: /* A named bundle of condition definitions, built in for one entity type. */ ConditionSet[];
        }
        /**
         * The kind of value a condition holds, which decides how a variant's pinned value is matched
         * against a resolve context.
         *
         * - `string`: an arbitrary string, matched exactly and case-sensitively
         * - `number`: a numeric value
         * - `date`: a single date
         * - `daterange`: a window with a from and an until timestamp; both ends may be left open
         * - `boolean`: a true/false value
         * - `select`: one of the values declared in `options`
         * - `location`: a geographic value, shaped by `format`
         *
         * There is no condition type for the fallback variant. Being the entity's fallback is a
         * property of the variant, set by the `default` flag on a variant write, and needs nothing
         * declared in the schema.
         *
         */
        export type ConditionType = "string" | "number" | "date" | "daterange" | "boolean" | "select" | "location";
        /**
         * Schema slug of an entity type that can be conditional — the `{slug}` of every
         * conditional-pricing route.
         *
         */
        export type ConditionalEntitySlug = "product" | "price" | "coupon";
        /**
         * An error from a conditional-pricing operation, carrying a machine-readable `code`
         * from the conditional-pricing vocabulary plus any structured data about the failure,
         * so a client can branch on the kind of failure rather than parse the message.
         * Referenced only by the operations that emit these codes; every other operation
         * keeps the plain `Error` shape.
         *
         */
        export interface ConditionalPricingError {
            /**
             * Error message
             */
            message: string;
            /**
             * The HTTP status code
             */
            status?: number;
            /**
             * The cause of the error (visible for bad requests - http 400)
             */
            cause?: string;
            /**
             * The error message. Carries the same string as `message`, which the shared `Error`
             * schema requires — `error` is the field responses have always used, and every caller
             * to date reads. Declared here rather than on the shared `Error` because a request
             * validation failure puts a list of validation errors in this field instead of a
             * string, and those responses reference `Error` directly.
             *
             */
            error?: string;
            code?: /**
             * Machine-readable failure mode of a conditional-pricing operation, allowing clients
             * to branch on the kind of failure instead of parsing the error message.
             *
             * - `NOT_FOUND` (404): the addressed entity, variant or version does not exist
             * - `AMBIGUOUS_RESOLUTION` (409): several variants match the given context while a single result was requested
             * - `TUPLE_CONFLICT` (409): the condition tuple is already claimed by another variant
             * - `VERSION_CONFLICT` (409): a version already exists at the given `valid_from` on that variant
             * - `CONDITION_UNDEFINED` (400): the context names a condition the entity's schema does not define
             * - `OPERATOR_UNSUPPORTED` (400): the requested operator is not applicable to the condition's type
             * - `CONTEXT_FORMAT_INVALID` (400): a context value is malformed for its condition type
             * - `CONDITION_VALUE_INVALID` (400): a variant write pins a `select` value the condition's declared `options` do not contain
             * - `TOO_MANY_MATCHES` (400): a multi-match resolve exceeded its result cap
             * - `WRITE_CONFLICT` (409): transient write contention, retryable unlike `TUPLE_CONFLICT`
             *
             * Each code is emitted with the HTTP status shown above, and only with that status.
             *
             */
            ConditionalPricingErrorCode;
            /**
             * Structured data about the failure, shaped by the accompanying `code`
             * (e.g. the candidate variants of an `ambiguous-resolution`). Only present
             * when the failure has structured data to report, and never without a `code`.
             *
             */
            details?: {
                [name: string]: any;
            };
        }
        /**
         * Machine-readable failure mode of a conditional-pricing operation, allowing clients
         * to branch on the kind of failure instead of parsing the error message.
         *
         * - `NOT_FOUND` (404): the addressed entity, variant or version does not exist
         * - `AMBIGUOUS_RESOLUTION` (409): several variants match the given context while a single result was requested
         * - `TUPLE_CONFLICT` (409): the condition tuple is already claimed by another variant
         * - `VERSION_CONFLICT` (409): a version already exists at the given `valid_from` on that variant
         * - `CONDITION_UNDEFINED` (400): the context names a condition the entity's schema does not define
         * - `OPERATOR_UNSUPPORTED` (400): the requested operator is not applicable to the condition's type
         * - `CONTEXT_FORMAT_INVALID` (400): a context value is malformed for its condition type
         * - `CONDITION_VALUE_INVALID` (400): a variant write pins a `select` value the condition's declared `options` do not contain
         * - `TOO_MANY_MATCHES` (400): a multi-match resolve exceeded its result cap
         * - `WRITE_CONFLICT` (409): transient write contention, retryable unlike `TUPLE_CONFLICT`
         *
         * Each code is emitted with the HTTP status shown above, and only with that status.
         *
         */
        export type ConditionalPricingErrorCode = "NOT_FOUND" | "AMBIGUOUS_RESOLUTION" | "TUPLE_CONFLICT" | "VERSION_CONFLICT" | "CONDITION_UNDEFINED" | "OPERATOR_UNSUPPORTED" | "CONTEXT_FORMAT_INVALID" | "CONDITION_VALUE_INVALID" | "TOO_MANY_MATCHES" | "WRITE_CONFLICT";
        export type ConsumptionTypeGetAg = "household" | "heating_pump" | "night_storage_heating" | "night_storage_heating_common_meter";
        /**
         * The coupon entity
         * example:
         * {
         *   "_id": "123e4567-e89b-12d3-a456-426614174000",
         *   "_schema": "coupon",
         *   "_org": "org_12345",
         *   "_created_at": "2024-01-15T10:00:00.000Z",
         *   "_updated_at": "2024-01-20T12:00:00.000Z",
         *   "_title": "Sample Coupon",
         *   "name": "Sample Coupon",
         *   "type": "fixed",
         *   "fixed_value": 555,
         *   "fixed_value_currency": "USD",
         *   "fixed_value_decimal": "5.55",
         *   "active": true,
         *   "category": "cashback",
         *   "prices": {
         *     "$relation": [
         *       {
         *         "entity_id": "abc12345-def6-7890-gh12-ijklmnopqrst",
         *         "_tags": [
         *           "discount",
         *           "special"
         *         ],
         *         "_schema": "price"
         *       }
         *     ]
         *   }
         * }
         */
        export interface Coupon {
            [name: string]: any;
            _id: EntityId /* uuid */;
            /**
             * The auto-generated title for the title
             */
            _title: string;
            /**
             * Organization Id the entity belongs to
             */
            _org: string;
            /**
             * The schema of the entity, for coupons it is always `coupon`
             */
            _schema: "coupon";
            _tags?: string[];
            /**
             * The creation date for the opportunity
             */
            _created_at: string; // date-time
            /**
             * The date the coupon was last updated
             */
            _updated_at: string; // date-time
            name: string | null;
            description?: string | null;
            type: "fixed" | "percentage";
            category: "discount" | "cashback";
            /**
             * Use if type is set to percentage. The percentage to be discounted, represented as a whole integer.
             */
            percentage_value?: string | null;
            /**
             * Use if type is set to fixed. The fixed amount in cents to be discounted, represented as a whole integer.
             */
            fixed_value?: number;
            /**
             * Use if type is set to fixed. The unit amount in eur to be discounted, represented as a decimal string with at most 12 decimal places.
             */
            fixed_value_decimal?: string;
            /**
             * Use if type is set to fixed. Three-letter ISO currency code, in lowercase.
             */
            fixed_value_currency?: /* Use if type is set to fixed. Three-letter ISO currency code, in lowercase. */ /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            cashback_period?: /* The cashback period, for now it's limited to either 0 months or 12 months */ CashbackPeriod;
            active?: boolean;
            /**
             * Whether the coupon requires a promo code to be applied
             */
            requires_promo_code?: boolean;
            /**
             * The prices associated with the coupon. Will hold price entities if hydrated, relations otherwise.
             */
            prices?: /* The prices associated with the coupon. Will hold price entities if hydrated, relations otherwise. */ {
                $relation?: EntityRelation[];
            } | /**
             * The price entity schema for simple pricing
             * example:
             * {
             *   "unit_amount": 100000,
             *   "unit_amount_currency": "EUR",
             *   "unit_amount_decimal": "1000",
             *   "sales_tax": "standard",
             *   "is_tax_inclusive": true,
             *   "price_display_in_journeys": "show_price",
             *   "type": "one_time",
             *   "billing_period": "weekly",
             *   "billing_duration_unit": "months",
             *   "notice_time_unit": "months",
             *   "termination_time_unit": "months",
             *   "renewal_duration_unit": "months",
             *   "_schema": "price",
             *   "_title": "Solar Panel Module",
             *   "description": "Solar Panel Module",
             *   "active": true,
             *   "_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T16:04:10.369Z",
             *   "_updated_at": "2022-06-03T16:04:10.369Z",
             *   "pricing_model": "per_unit",
             *   "is_composite_price": false
             * }
             */
            Price[];
            promo_codes?: /**
             * example:
             * {
             *   "id": "123e4567-e89b-12d3-a456-426614174000",
             *   "code": "123456",
             *   "has_usage_limit": true,
             *   "usage_limit": 10
             * }
             */
            PromoCode[];
            /**
             * Map of ids of promo codes with their usage count
             */
            promo_code_usage?: {
                [name: string]: number;
            };
        }
        /**
         * The shared properties for the coupon entity and coupon item entity
         */
        export interface CouponItem {
            [name: string]: any;
            _id: EntityId /* uuid */;
            /**
             * The auto-generated title for the title
             */
            _title: string;
            /**
             * Organization Id the entity belongs to
             */
            _org: string;
            /**
             * The schema of the entity, for coupons it is always `coupon`
             */
            _schema: "coupon";
            _tags?: string[];
            /**
             * The creation date for the opportunity
             */
            _created_at: string; // date-time
            /**
             * The date the coupon was last updated
             */
            _updated_at: string; // date-time
            name: string | null;
            description?: string | null;
            type: "fixed" | "percentage";
            category: "discount" | "cashback";
            /**
             * Use if type is set to percentage. The percentage to be discounted, represented as a whole integer.
             */
            percentage_value?: string | null;
            /**
             * Use if type is set to fixed. The fixed amount in cents to be discounted, represented as a whole integer.
             */
            fixed_value?: number;
            /**
             * Use if type is set to fixed. The unit amount in eur to be discounted, represented as a decimal string with at most 12 decimal places.
             */
            fixed_value_decimal?: string;
            /**
             * Use if type is set to fixed. Three-letter ISO currency code, in lowercase.
             */
            fixed_value_currency?: /* Use if type is set to fixed. Three-letter ISO currency code, in lowercase. */ /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            cashback_period?: /* The cashback period, for now it's limited to either 0 months or 12 months */ CashbackPeriod;
            active?: boolean;
            /**
             * Whether the coupon requires a promo code to be applied
             */
            requires_promo_code?: boolean;
        }
        /**
         * The base for the coupon entity without promo codes
         * example:
         * {
         *   "_id": "123e4567-e89b-12d3-a456-426614174000",
         *   "_schema": "coupon",
         *   "_org": "org_12345",
         *   "_created_at": "2024-01-15T10:00:00.000Z",
         *   "_updated_at": "2024-01-20T12:00:00.000Z",
         *   "_title": "Sample Coupon",
         *   "name": "Sample Coupon",
         *   "type": "fixed",
         *   "fixed_value": 555,
         *   "fixed_value_currency": "USD",
         *   "fixed_value_decimal": "5.55",
         *   "active": true,
         *   "category": "cashback",
         *   "prices": {
         *     "$relation": [
         *       {
         *         "entity_id": "abc12345-def6-7890-gh12-ijklmnopqrst",
         *         "_tags": [
         *           "discount",
         *           "special"
         *         ],
         *         "_schema": "price"
         *       }
         *     ]
         *   }
         * }
         */
        export interface CouponWithoutPromoCodes {
            [name: string]: any;
            _id: EntityId /* uuid */;
            /**
             * The auto-generated title for the title
             */
            _title: string;
            /**
             * Organization Id the entity belongs to
             */
            _org: string;
            /**
             * The schema of the entity, for coupons it is always `coupon`
             */
            _schema: "coupon";
            _tags?: string[];
            /**
             * The creation date for the opportunity
             */
            _created_at: string; // date-time
            /**
             * The date the coupon was last updated
             */
            _updated_at: string; // date-time
            name: string | null;
            description?: string | null;
            type: "fixed" | "percentage";
            category: "discount" | "cashback";
            /**
             * Use if type is set to percentage. The percentage to be discounted, represented as a whole integer.
             */
            percentage_value?: string | null;
            /**
             * Use if type is set to fixed. The fixed amount in cents to be discounted, represented as a whole integer.
             */
            fixed_value?: number;
            /**
             * Use if type is set to fixed. The unit amount in eur to be discounted, represented as a decimal string with at most 12 decimal places.
             */
            fixed_value_decimal?: string;
            /**
             * Use if type is set to fixed. Three-letter ISO currency code, in lowercase.
             */
            fixed_value_currency?: /* Use if type is set to fixed. Three-letter ISO currency code, in lowercase. */ /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            cashback_period?: /* The cashback period, for now it's limited to either 0 months or 12 months */ CashbackPeriod;
            active?: boolean;
            /**
             * Whether the coupon requires a promo code to be applied
             */
            requires_promo_code?: boolean;
            /**
             * The prices associated with the coupon. Will hold price entities if hydrated, relations otherwise.
             */
            prices?: /* The prices associated with the coupon. Will hold price entities if hydrated, relations otherwise. */ {
                $relation?: EntityRelation[];
            } | /**
             * The price entity schema for simple pricing
             * example:
             * {
             *   "unit_amount": 100000,
             *   "unit_amount_currency": "EUR",
             *   "unit_amount_decimal": "1000",
             *   "sales_tax": "standard",
             *   "is_tax_inclusive": true,
             *   "price_display_in_journeys": "show_price",
             *   "type": "one_time",
             *   "billing_period": "weekly",
             *   "billing_duration_unit": "months",
             *   "notice_time_unit": "months",
             *   "termination_time_unit": "months",
             *   "renewal_duration_unit": "months",
             *   "_schema": "price",
             *   "_title": "Solar Panel Module",
             *   "description": "Solar Panel Module",
             *   "active": true,
             *   "_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T16:04:10.369Z",
             *   "_updated_at": "2022-06-03T16:04:10.369Z",
             *   "pricing_model": "per_unit",
             *   "is_composite_price": false
             * }
             */
            Price[];
        }
        export interface CreateVariantRequest {
            conditions?: /**
             * The situation this variant applies to: a flat map keyed by condition name, as the entity's
             * schema declares them. A condition left out is a wildcard — the variant applies whatever the
             * context says for it, which is what makes adding a condition to a schema non-breaking for the
             * variants that already exist.
             *
             * Exact values only. Predicates are accepted in a resolve context and nowhere else, so that
             * matching is decided in exactly one place.
             *
             * Values are typed by their condition and stored canonicalized for that type: a `date` becomes
             * millisecond-precision UTC, a `daterange` an object carrying `from` and `until` where an empty
             * string is an open end, a `location` of format `zipcode` the postal code itself and one of
             * format `zipcode + town` an object carrying both. A `select` value must be a string, and must
             * be one the condition's `options` declare.
             *
             * `default`, and any name beginning with `_`, are reserved for the server and cannot be pinned
             * here. Whether a variant is the entity's fallback is set through the request's `default` flag.
             *
             * example:
             * {
             *   "postal_code": "46045"
             * }
             */
            PinnedConditions;
            /**
             * Mark this variant as the entity's fallback: the one served when no other variant applies.
             *
             * A property of the variant, never an entry in `conditions` — a variant claiming a value for
             * the marker would hold a real condition tuple while being permanently unmatchable, since no
             * resolve context ever supplies it. A default variant cannot pin anything else, and an
             * entity can have at most one.
             *
             * Available to every conditional entity: nothing has to be declared in the schema first.
             * The variant is stored pinning one reserved condition, which is what makes the ordinary
             * condition-tuple guard enforce at-most-one-per-entity with no rule of its own.
             *
             */
            default?: boolean;
            /**
             * When the first version takes effect. Defaults to now.
             *
             * An RFC 3339 date (`2026-01-01`, read as midnight UTC) or date-time
             * (`2026-01-01T00:00:00Z`), to at most millisecond precision. Deliberately not declared as
             * `format: date-time`, which would reject the plain-date form that this accepts.
             *
             * example:
             * 2027-01-01T00:00:00Z
             */
            valid_from?: string;
            values: /**
             * The attribute values this version overrides on the base entity, keyed by attribute name.
             *
             * Only attributes currently declaring `overridable_attribute` are applied. Metadata fields
             * (anything underscore-prefixed), readonly attributes, hidden attributes and non-overridable
             * attributes present here are ignored rather than rejected, so a client working from a slightly
             * stale schema snapshot still succeeds instead of failing on fields it could not have known to
             * drop. An attribute's `render_condition` says when to show it and has no bearing on whether a
             * variant may override it.
             *
             * Ignored means *not updated*, never *removed*: a value already stored for an attribute that is
             * not currently overridable is preserved, so removing and restoring the flag deactivates and
             * then reactivates the same override.
             *
             * A composite price's `price_components` is an ordinary overridable relation attribute: a
             * composite variant pins its component variants here the same way any other relation value is
             * set, with no special handling.
             *
             * example:
             * {
             *   "unit_amount": 2499,
             *   "unit_amount_decimal": "24.99"
             * }
             */
            VariantValues;
        }
        export interface CreatedVariant {
            /**
             * Server-generated, always. This is the durable key orders and contracts pin, so it is never
             * accepted from a client — a client-suppliable id would risk collisions between independent
             * importers.
             *
             * example:
             * var-46045
             */
            variant_id: string;
            /**
             * example:
             * price-sp26d1yo
             */
            entity_id: string;
            schema: /**
             * Schema slug of an entity type that can be conditional — the `{slug}` of every
             * conditional-pricing route.
             *
             */
            ConditionalEntitySlug;
            /**
             * The situation this variant applies to, plus the boolean `default` discriminator — the
             * same shape `_conditions` has on a resolved payload.
             *
             * example:
             * {
             *   "postal_code": "46045",
             *   "default": false
             * }
             */
            conditions: {
                [name: string]: any;
                default: boolean;
            };
            /**
             * When the first version takes effect, canonicalized to millisecond-precision UTC.
             * example:
             * 2027-01-01T00:00:00.000Z
             */
            valid_from: string;
            values: /**
             * The attribute values this version overrides on the base entity, keyed by attribute name.
             *
             * Only attributes currently declaring `overridable_attribute` are applied. Metadata fields
             * (anything underscore-prefixed), readonly attributes, hidden attributes and non-overridable
             * attributes present here are ignored rather than rejected, so a client working from a slightly
             * stale schema snapshot still succeeds instead of failing on fields it could not have known to
             * drop. An attribute's `render_condition` says when to show it and has no bearing on whether a
             * variant may override it.
             *
             * Ignored means *not updated*, never *removed*: a value already stored for an attribute that is
             * not currently overridable is preserved, so removing and restoring the flag deactivates and
             * then reactivates the same override.
             *
             * A composite price's `price_components` is an ordinary overridable relation attribute: a
             * composite variant pins its component variants here the same way any other relation value is
             * set, with no special handling.
             *
             * example:
             * {
             *   "unit_amount": 2499,
             *   "unit_amount_decimal": "24.99"
             * }
             */
            VariantValues;
            /**
             * When the first version was created.
             */
            _created_at: string;
            /**
             * When the first version was last written.
             */
            _updated_at: string;
            /**
             * The revision a later write to this version must carry to be accepted. Genuinely current,
             * unlike one read back later from an eventually-consistent read.
             *
             */
            _revision: number;
            /**
             * Things worth knowing that did not stop the write. Empty in the ordinary case — a client
             * reads its length rather than branching on its absence.
             *
             */
            warnings: VariantWriteWarning[];
        }
        /**
         * Three-letter ISO currency code, in lowercase. Must be a supported currency.
         * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
         *
         * example:
         * EUR
         */
        export type Currency = string;
        /**
         * A custom context object. E.g. for Portal context.
         * example:
         * {
         *   "custom_context_key": "custom_context_value"
         * }
         */
        export interface CustomContext {
            [name: string]: any;
        }
        export interface Customer {
            first_name?: string;
            last_name?: string;
            company_name?: string;
            vat_id?: string;
            /**
             * A valid email identifying the customer.
             */
            email?: string;
            phone?: string;
        }
        export interface DeletedVariant {
            /**
             * example:
             * var-46045
             */
            variant_id: string;
            /**
             * example:
             * price-sp26d1yo
             */
            entity_id: string;
            schema: /**
             * Schema slug of an entity type that can be conditional — the `{slug}` of every
             * conditional-pricing route.
             *
             */
            ConditionalEntitySlug;
            /**
             * Whether this call is the one that freed the variant's combination of condition values.
             * `false` where an earlier, interrupted attempt had already freed it — the delete still
             * succeeded, and the combination was already reusable.
             *
             */
            tuple_released: boolean;
            /**
             * Version rows this call removed.
             */
            versions_deleted: number;
        }
        export interface DeletedVariantVersion {
            /**
             * example:
             * var-46045
             */
            variant_id: string;
            /**
             * example:
             * price-sp26d1yo
             */
            entity_id: string;
            schema: /**
             * Schema slug of an entity type that can be conditional — the `{slug}` of every
             * conditional-pricing route.
             *
             */
            ConditionalEntitySlug;
            /**
             * The version removed, canonicalized to millisecond-precision UTC.
             * example:
             * 2027-01-01T00:00:00.000Z
             */
            valid_from: string;
            /**
             * What the delete moved, if anything. Empty when a scheduled version was withdrawn.
             */
            warnings: /**
             * Something a version write moved. A version write is never refused for being late — backdating a
             * version, and editing or deleting one that has already been superseded, are both accepted — so
             * what a caller gets instead is a warning naming exactly what changed. One write can carry both
             * codes.
             *
             */
            VersionWriteWarning[];
        }
        export interface DiscountAmounts {
            /**
             * The discount amount.
             */
            discount_amount?: number;
            /**
             * The discount amount as a string with all the decimal places.
             */
            discount_amount_decimal?: string;
            /**
             * The discount percentage, if the applied coupon had a percentage type.
             */
            discount_percentage?: number;
            /**
             * Total amount before discount is applied.
             */
            before_discount_amount_total?: number;
            /**
             * Total amount before discount is applied as a string with all the decimal places.
             */
            before_discount_amount_total_decimal?: string;
            /**
             * Total amount before discount is applied, excluding taxes.
             */
            before_discount_amount_subtotal?: number;
            /**
             * Total amount before discount is applied, excluding taxes, as a string with all the decimal places.
             */
            before_discount_amount_subtotal_decimal?: string;
        }
        /**
         * The interval of the tariff if a spot market price is used as base.
         */
        export type DynamicTariffInterval = "hourly" | "monthly_average";
        /**
         * The mode of the dynamic tariff. `day_ahead_market` uses the Day-Ahead spot market price as base.
         */
        export type DynamicTariffMode = "day_ahead_market" | "manual";
        export type EntityId = string; // uuid
        /**
         * example:
         * {
         *   "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
         *   "_title": "Cool box",
         *   "_org": "728",
         *   "_schema": "order",
         *   "_created_at": "2022-06-03T16:04:10.000Z",
         *   "_updated_at": "2022-06-03T16:04:10.000Z",
         *   "amount_subtotal": 10000,
         *   "amount_total": 10600,
         *   "currency": "EUR",
         *   "description": "Annual internet service",
         *   "price_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
         *   "product_id": "6241487f-b7fd-428b-ab92-24ee0b37fd84",
         *   "taxes": [
         *     {
         *       "amount": 600,
         *       "tax": {
         *         "active": true,
         *         "description": "Without Behaviour",
         *         "rate": 6,
         *         "region": "DE",
         *         "type": "VAT",
         *         "_created_at": "2022-02-07T14:49:08.831Z",
         *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
         *         "_org": "739224",
         *         "_schema": "tax",
         *         "_title": "Tax Without Behaviour",
         *         "_updated_at": "2022-02-07T14:49:08.831Z"
         *       }
         *     }
         *   ],
         *   "unit_amount": 10000,
         *   "unit_amount_net": 10000,
         *   "pricing_model": "per_unit",
         *   "_price": {
         *     "_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
         *     "unit_amount": 10000,
         *     "unit_amount_currency": "EUR",
         *     "unit_amount_decimal": "100.00",
         *     "sales_tax": "standard",
         *     "is_tax_inclusive": false,
         *     "price_display_in_journeys": "show_price",
         *     "type": "one_time",
         *     "billing_period": "weekly",
         *     "billing_duration_unit": "months",
         *     "notice_time_unit": "months",
         *     "termination_time_unit": "months",
         *     "renewal_duration_unit": "months",
         *     "_schema": "price",
         *     "_title": "Solar Panel Module",
         *     "description": "Solar Panel Module",
         *     "active": true,
         *     "tax": {
         *       "$relation": [
         *         {
         *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
         *         }
         *       ]
         *     },
         *     "_org": "728",
         *     "_created_at": "2022-06-03T16:04:10.369Z",
         *     "_updated_at": "2022-06-03T16:04:10.369Z",
         *     "pricing_model": "per_unit"
         *   },
         *   "_product": {
         *     "name": "Cool box",
         *     "type": "product",
         *     "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
         *     "_title": "Cool box"
         *   }
         * }
         */
        export interface EntityItem {
            _id: EntityId /* uuid */;
            /**
             * Title of entity
             */
            _title: string;
            /**
             * Organization Id the entity belongs to
             */
            _org: string;
            _schema: string;
            _tags?: string[];
            _created_at: string; // date-time
            _updated_at: string; // date-time
        }
        export interface EntityRelation {
            [name: string]: any;
            entity_id?: string;
            _tags?: string[];
        }
        export interface Error {
            /**
             * Error message
             */
            message: string;
            /**
             * The HTTP status code
             */
            status?: number;
            /**
             * The cause of the error (visible for bad requests - http 400)
             */
            cause?: string;
        }
        /**
         * The request payload for the external catalog configuration service.
         * example:
         * {
         *   "config": {
         *     "appId": "1234567890",
         *     "componentId": "1234567890",
         *     "hookId": "1234567890"
         *   }
         * }
         */
        export interface ExternalCatalogConfigurationRequest {
            config?: {
                /**
                 * The app id.
                 * example:
                 * 1234567890
                 */
                appId: string;
                /**
                 * The component id.
                 * example:
                 * 1234567890
                 */
                componentId: string;
                /**
                 * The hook id. If not provided, the first valid hook will be used.
                 * example:
                 * 1234567890
                 */
                hookId?: string;
            };
        }
        /**
         * The request payload for the external catalog service with a custom context. E.g. for requests from the Portal.
         */
        export interface ExternalCatalogCustomRequest {
            /**
             * The origin of the request.
             * example:
             * custom
             */
            origin: "custom";
            context: /**
             * A custom context object. E.g. for Portal context.
             * example:
             * {
             *   "custom_context_key": "custom_context_value"
             * }
             */
            CustomContext;
        }
        /**
         * An external product & price information (already computed) from an external catalog.
         */
        export interface ExternalCatalogItem {
            pricing_details: /* The result from the calculation of a set of price items. */ PricingDetails;
            _meta: /* Signature meta data payload */ SignatureMeta;
        }
        /**
         * The request payload for the external catalog service with a journey context.
         */
        export interface ExternalCatalogJourneyRequest {
            /**
             * The origin of the request.
             * example:
             * journey
             */
            origin: "journey";
            context: JourneyContext;
        }
        /**
         * The request payload for the external catalog service with a portal context.
         */
        export interface ExternalCatalogPortalRequest {
            /**
             * The origin of the request.
             * example:
             * portal
             */
            origin: "portal";
            context: PortalContext;
        }
        /**
         * The request payload for the external catalog service.
         * example:
         * {
         *   "config": {
         *     "appId": "1234567890",
         *     "componentId": "1234567890",
         *     "hookId": "1234567890"
         *   },
         *   "origin": "journey",
         *   "context": {
         *     "journey_id": "8d0a2235-97ce-42d0-88a3-e374634ca44e",
         *     "entity_id": "9e1b3346-a8df-53e1-99b4-f485745db55f",
         *     "journey_name": "Product Selection Journey",
         *     "journey_tags": [
         *       "electricity",
         *       "residential"
         *     ],
         *     "journey_url_params": {
         *       "utm_source": "google",
         *       "utm_campaign": "spring2024"
         *     },
         *     "current_step_name": "Product Selection",
         *     "current_block_name": "Energy Products",
         *     "steps_data": [
         *       {
         *         "step_name": "Address Information",
         *         "step_index": 0,
         *         "blocks": {
         *           "Adresse": {
         *             "countryCode": "DE",
         *             "city": "Koblenz",
         *             "zipCode": "56068",
         *             "streetName": "Am Alten Hospital",
         *             "houseNumber": "123"
         *           }
         *         }
         *       }
         *     ]
         *   }
         * }
         */
        export type ExternalCatalogRequest = {
            config?: {
                /**
                 * The app id.
                 * example:
                 * 1234567890
                 */
                appId: string;
                /**
                 * The component id.
                 * example:
                 * 1234567890
                 */
                componentId: string;
                /**
                 * The hook id. If not provided, the first valid hook will be used.
                 * example:
                 * 1234567890
                 */
                hookId?: string;
            };
        } & (/**
         * The request payload for the external catalog service.
         * example:
         * {
         *   "config": {
         *     "appId": "1234567890",
         *     "componentId": "1234567890",
         *     "hookId": "1234567890"
         *   },
         *   "origin": "journey",
         *   "context": {
         *     "journey_id": "8d0a2235-97ce-42d0-88a3-e374634ca44e",
         *     "entity_id": "9e1b3346-a8df-53e1-99b4-f485745db55f",
         *     "journey_name": "Product Selection Journey",
         *     "journey_tags": [
         *       "electricity",
         *       "residential"
         *     ],
         *     "journey_url_params": {
         *       "utm_source": "google",
         *       "utm_campaign": "spring2024"
         *     },
         *     "current_step_name": "Product Selection",
         *     "current_block_name": "Energy Products",
         *     "steps_data": [
         *       {
         *         "step_name": "Address Information",
         *         "step_index": 0,
         *         "blocks": {
         *           "Adresse": {
         *             "countryCode": "DE",
         *             "city": "Koblenz",
         *             "zipCode": "56068",
         *             "streetName": "Am Alten Hospital",
         *             "houseNumber": "123"
         *           }
         *         }
         *       }
         *     ]
         *   }
         * }
         */
        /* The request payload for the external catalog service with a journey context. */ ExternalCatalogJourneyRequest | /* The request payload for the external catalog service with a portal context. */ ExternalCatalogPortalRequest | /* The request payload for the external catalog service with a custom context. E.g. for requests from the Portal. */ ExternalCatalogCustomRequest);
        /**
         * example:
         * {
         *   "price_id": "589B011B-F8D9-4F8E-AD71-BACE4B543C0F",
         *   "frequency_unit": "weekly",
         *   "amount_total": 1000,
         *   "amount_total_decimal": "10.00"
         * }
         */
        export interface ExternalFeeMapping {
            price_id?: string;
            frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time";
            amount_total?: number;
            amount_total_decimal?: string;
        }
        /**
         * example:
         * [
         *   {
         *     "price_id": "589B011B-F8D9-4F8E-AD71-BACE4B543C0F",
         *     "frequency_unit": "weekly",
         *     "amount_total": 1000,
         *     "amount_total_decimal": "10.00"
         *   }
         * ]
         */
        export type ExternalFeeMappings = /**
         * example:
         * {
         *   "price_id": "589B011B-F8D9-4F8E-AD71-BACE4B543C0F",
         *   "frequency_unit": "weekly",
         *   "amount_total": 1000,
         *   "amount_total_decimal": "10.00"
         * }
         */
        ExternalFeeMapping[];
        export interface ExternalFeeMetadata {
            /**
             * The computed total price
             */
            amount_total: number;
            /**
             * The computed total price as decimal
             */
            amount_total_decimal: string;
            /**
             * The computed static price
             */
            amount_static?: number;
            /**
             * The computed static price as decimal
             */
            amount_static_decimal?: any;
            /**
             * The computed variable price, for the day period
             */
            amount_variable_ht?: number;
            /**
             * The computed variable price, for the day period, as decimal
             */
            amount_variable_decimal_ht?: string;
            /**
             * The computed unit price, for the day period
             */
            unit_amount_variable_ht?: number;
            /**
             * The computed unit price, for the day period, as decimal
             */
            unit_amount_variable_decimal_ht?: string;
            /**
             * The computed variable price, for the night period
             */
            amount_variable_nt?: number;
            /**
             * The computed variable price, for the night period, as decimal
             */
            amount_variable_decimal_nt?: string;
            /**
             * The computed unit price, for the night period
             */
            unit_amount_variable_nt?: number;
            /**
             * The computed unit price, for the night period, as decimal
             */
            unit_amount_variable_decimal_nt?: string;
            /**
             * The currency of the computed price (three-letter ISO currency code)
             */
            currency: /* The currency of the computed price (three-letter ISO currency code) */ /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * The billing period
             */
            billing_period: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time";
            breakdown: /* Price breakdown */ ComputedPriceBreakdown;
            _meta?: /* Signature meta data payload */ SignatureMeta;
            inputs?: {
                [name: string]: any;
            };
        }
        /**
         * The provider entity
         */
        export interface ExternalLocationMetadata {
            /**
             * The provider name
             */
            name: string;
            /**
             * The provider code
             */
            code: string;
            /**
             * The type of product
             */
            type: "gas" | "power";
            additionalData: /* Additional data included in the provider entity */ AdditionalProviderData;
            _meta?: /* Signature meta data payload */ SignatureMeta;
            inputs?: {
                [name: string]: any;
            };
        }
        export interface ExternalPriceMetadata {
            market: /* The market for a spot market price. */ SpotMarketType;
            bidding_zone: /* The bidding zone for a spot market price. */ SpotMarketBiddingZone;
            price: /* An average market price over a given period in time. */ AverageMarketPriceRecord;
            _meta?: /* Signature meta data payload */ SignatureMeta;
            inputs?: {
                [name: string]: any;
            };
        }
        export interface File {
            [name: string]: any;
            _id: string;
            filename: string;
            mime_type: string;
            versions: {
                [name: string]: any;
                s3ref: {
                    bucket: string;
                    key: string;
                };
            }[];
            _schema: string;
            _org: string;
            _created_at: string; // date-time
            _updated_at: string; // date-time
            _title?: string;
            $relation?: EntityRelation;
        }
        /**
         * The concession type for gas
         */
        export type GasConcessionType = "standard" | "special";
        /**
         * Market area details for gas
         */
        export interface GasMarketAreaDetails {
            /**
             * The type of gas used
             */
            gasType?: "L-Gas" | "H-Gas";
            /**
             * The name of the market area
             */
            marketArea?: string;
            /**
             * The vritual trading point identifier
             */
            virtualTradingPoint?: string;
        }
        /**
         * A market price at a given point in time.
         */
        export interface HistoricMarketPriceRecord {
            /**
             * Cost in Cents, e.g. 12.3 for 12,3 Cents = 0.123€.
             * example:
             * 12.3
             */
            unit_amount: number;
            /**
             * Cost in decimal format, e.g. 0.123€.
             * example:
             * 0.123
             */
            unit_amount_decimal: string;
            unit_amount_currency: /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * ISO 8601 timestamp of the price record in UTC.
             */
            timestamp: string; // date-time
        }
        export interface HistoricMarketPricesResult {
            market: /* The market for a spot market price. */ SpotMarketType;
            bidding_zone: /* The bidding zone for a spot market price. */ SpotMarketBiddingZone;
            prices: /* A market price at a given point in time. */ HistoricMarketPriceRecord[];
        }
        /**
         * The composite price entity
         * example:
         * {
         *   "_id": "c2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *   "_schema": "price",
         *   "_title": "My Composite Price",
         *   "description": "My Composite Price",
         *   "_org": "739224",
         *   "_created_at": "2022-02-18T10:10:26.439Z",
         *   "_updated_at": "2022-02-18T11:53:04.191Z",
         *   "active": true,
         *   "is_composite_price": true,
         *   "price_components": {
         *     "$relation": [
         *       {
         *         "entity_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *         "_schema": "price",
         *         "_product_id": "target-price-product-id",
         *         "quantity": 1,
         *         "item": {
         *           "_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *           "unit_amount": 10000,
         *           "unit_amount_currency": "EUR",
         *           "unit_amount_decimal": "100.00",
         *           "sales_tax": "standard",
         *           "is_tax_inclusive": false,
         *           "price_display_in_journeys": "show_price",
         *           "type": "one_time",
         *           "_schema": "price",
         *           "_title": "Test 1",
         *           "description": "Test 1",
         *           "tax": {
         *             "$relation": [
         *               {
         *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
         *               }
         *             ]
         *           },
         *           "_org": "739224",
         *           "_created_at": "2022-02-18T10:10:26.439Z",
         *           "_updated_at": "2022-02-18T11:53:04.191Z",
         *           "active": true,
         *           "billing_period": "weekly",
         *           "billing_duration_unit": "months",
         *           "notice_time_unit": "months",
         *           "termination_time_unit": "months",
         *           "renewal_duration_unit": "months",
         *           "is_composite_price": false
         *         }
         *       },
         *       {
         *         "entity_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *         "_schema": "price",
         *         "_product_id": "target-price-product-id",
         *         "quantity": 2,
         *         "item": {
         *           "_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *           "unit_amount": 10000,
         *           "unit_amount_currency": "EUR",
         *           "unit_amount_decimal": "100.00",
         *           "sales_tax": "standard",
         *           "is_tax_inclusive": false,
         *           "price_display_in_journeys": "show_price",
         *           "type": "one_time",
         *           "_schema": "price",
         *           "_title": "Test 1",
         *           "description": "Test 1",
         *           "tax": {
         *             "$relation": [
         *               {
         *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
         *               }
         *             ]
         *           },
         *           "_org": "739224",
         *           "_created_at": "2022-02-18T10:10:26.439Z",
         *           "_updated_at": "2022-02-18T11:53:04.191Z",
         *           "active": true,
         *           "billing_period": "weekly",
         *           "billing_duration_unit": "months",
         *           "notice_time_unit": "months",
         *           "termination_time_unit": "months",
         *           "renewal_duration_unit": "months",
         *           "is_composite_price": false
         *         }
         *       }
         *     ]
         *   }
         * }
         */
        export interface HydratedCompositePrice {
            [name: string]: any;
            /**
             * The billing period duration
             */
            billing_duration_amount?: number | null;
            /**
             * The billing period duration unit
             */
            billing_duration_unit?: "days" | "weeks" | "months" | "years";
            /**
             * The notice period duration
             */
            notice_time_amount?: number | null;
            /**
             * The notice period duration unit
             */
            notice_time_unit?: "days" | "weeks" | "months" | "years";
            /**
             * The termination period duration
             */
            termination_time_amount?: number | null;
            /**
             * The termination period duration unit
             */
            termination_time_unit?: "days" | "weeks" | "months" | "years";
            /**
             * The renewal period duration
             */
            renewal_duration_amount?: number | null;
            /**
             * The renewal period duration unit
             */
            renewal_duration_unit?: "days" | "weeks" | "months" | "years";
            /**
             * Whether the price can be used for new purchases.
             */
            active?: boolean;
            /**
             * A brief description of the price.
             */
            description?: string;
            /**
             * A set of [price](/api/pricing#tag/simple_price_schema) components that define the composite price.
             */
            price_components?: /* A set of [price](/api/pricing#tag/simple_price_schema) components that define the composite price. */ /**
             * The price entity schema for simple pricing
             * example:
             * {
             *   "unit_amount": 100000,
             *   "unit_amount_currency": "EUR",
             *   "unit_amount_decimal": "1000",
             *   "sales_tax": "standard",
             *   "is_tax_inclusive": true,
             *   "price_display_in_journeys": "show_price",
             *   "type": "one_time",
             *   "billing_period": "weekly",
             *   "billing_duration_unit": "months",
             *   "notice_time_unit": "months",
             *   "termination_time_unit": "months",
             *   "renewal_duration_unit": "months",
             *   "_schema": "price",
             *   "_title": "Solar Panel Module",
             *   "description": "Solar Panel Module",
             *   "active": true,
             *   "_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T16:04:10.369Z",
             *   "_updated_at": "2022-06-03T16:04:10.369Z",
             *   "pricing_model": "per_unit",
             *   "is_composite_price": false
             * }
             */
            Price[] | /**
             * The price entity schema for simple pricing
             * example:
             * {
             *   "unit_amount": 100000,
             *   "unit_amount_currency": "EUR",
             *   "unit_amount_decimal": "1000",
             *   "sales_tax": "standard",
             *   "is_tax_inclusive": true,
             *   "price_display_in_journeys": "show_price",
             *   "type": "one_time",
             *   "billing_period": "weekly",
             *   "billing_duration_unit": "months",
             *   "notice_time_unit": "months",
             *   "termination_time_unit": "months",
             *   "renewal_duration_unit": "months",
             *   "_schema": "price",
             *   "_title": "Solar Panel Module",
             *   "description": "Solar Panel Module",
             *   "active": true,
             *   "_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T16:04:10.369Z",
             *   "_updated_at": "2022-06-03T16:04:10.369Z",
             *   "pricing_model": "per_unit",
             *   "is_composite_price": false
             * }
             */
            Price[];
            /**
             * Three-letter ISO currency code, in lowercase.
             */
            unit_amount_currency?: /* Three-letter ISO currency code, in lowercase. */ /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * The flag for prices that contain price components.
             */
            is_composite_price: true;
            /**
             * The price creation date
             */
            _created_at?: string;
            /**
             * The price id
             */
            _id?: string;
            /**
             * The price autogenerated title
             */
            _title?: string;
            /**
             * The price last update date
             */
            _updated_at?: string;
            /**
             * The organization id the price belongs to
             */
            _org_id?: string;
            /**
             * An arbitrary set of tags attached to the composite price
             */
            _tags?: string[];
        }
        /**
         * The auth credentials for external integrations
         */
        export type IntegrationAuthCredentials = /* The auth credentials for external integrations */ BasicAuthIntegration | OAuthIntegration;
        export type IntegrationCredentialsResult = /* The auth credentials for external integrations */ IntegrationAuthCredentials;
        export type IntegrationId = "getag" | "external-catalog";
        export interface JourneyContext {
            /**
             * The ID of the journey.
             * example:
             * 8d0a2235-97ce-42d0-88a3-e374634ca44e
             */
            journey_id: string;
            /**
             * The ID of the entity.
             * example:
             * 8d0a2235-97ce-42d0-88a3-e374634ca44e
             */
            entity_id?: string;
            /**
             * The name of the journey.
             * example:
             * journey name
             */
            journey_name: string;
            /**
             * The tags of the journey.
             */
            journey_tags?: string[];
            /**
             * The URL parameters of the journey.
             */
            journey_url_params?: {
                [name: string]: any;
            };
            /**
             * The name of the step where the products selection is happening.
             * example:
             * step name
             */
            current_step_name: string;
            /**
             * The name of the block where the products selection is happening.
             * example:
             * block name
             */
            current_block_name: string;
            /**
             * The steps of the journey.
             */
            steps_data: {
                /**
                 * The name of the step.
                 */
                step_name: string;
                /**
                 * The index of the step.
                 */
                step_index: number;
                /**
                 * The data of the blocks.
                 * example:
                 * {
                 *   "Adresse": {
                 *     "countryCode": "DE",
                 *     "city": "Koblenz",
                 *     "zipCode": "56068",
                 *     "streetName": "Am Alten Hospital",
                 *     "houseNumber": "123"
                 *   }
                 * }
                 */
                blocks: {
                    [name: string]: any;
                };
            }[];
        }
        /**
         * Market participant data
         */
        export interface MarketParticipant {
            /**
             * The name of the participant
             */
            name: string;
            /**
             * The BDEW/DVGW code number of the participant
             */
            codeNumber: string;
            /**
             * The date from which this data is valid from
             */
            validFrom?: string; // date
            /**
             * The date until which this data is valid to
             */
            validUntil?: string; // date
        }
        /**
         * Describes how to compute the markup per period. Either `per_unit`, `tiered_volume` or `tiered_flatfee`.
         * - `per_unit` indicates that the fixed amount (specified in unit_amount or unit_amount_decimal) will be charged per unit in quantity
         * - `tiered_volume` indicates that the unit pricing will be computed using tiers attribute. The customer pays the same unitary price for all purchased units.
         * - `tiered_flatfee` While similar to tiered_volume, tiered flat fee charges for the same price (flat) for the entire range instead using the unit price to multiply the quantity.
         *
         */
        export type MarkupPricingModel = "per_unit" | "tiered_volume" | "tiered_flatfee";
        /**
         * A set of key-value pairs used to store meta data information about an entity.
         */
        export type MetaData = ({
            /**
             * Item key
             */
            key?: string;
            /**
             * Item value
             */
            value?: string;
        })[];
        /**
         * The composite price entity
         * example:
         * {
         *   "_id": "c2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *   "_schema": "price",
         *   "_title": "My Composite Price",
         *   "description": "My Composite Price",
         *   "_org": "739224",
         *   "_created_at": "2022-02-18T10:10:26.439Z",
         *   "_updated_at": "2022-02-18T11:53:04.191Z",
         *   "active": true,
         *   "is_composite_price": true,
         *   "price_components": {
         *     "$relation": [
         *       {
         *         "entity_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *         "_schema": "price",
         *         "_product_id": "target-price-product-id",
         *         "quantity": 1,
         *         "item": {
         *           "_id": "comp1-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *           "unit_amount": 10000,
         *           "unit_amount_currency": "EUR",
         *           "unit_amount_decimal": "100.00",
         *           "sales_tax": "standard",
         *           "is_tax_inclusive": false,
         *           "price_display_in_journeys": "show_price",
         *           "type": "one_time",
         *           "_schema": "price",
         *           "_title": "Test 1",
         *           "description": "Test 1",
         *           "tax": {
         *             "$relation": [
         *               {
         *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
         *               }
         *             ]
         *           },
         *           "_org": "739224",
         *           "_created_at": "2022-02-18T10:10:26.439Z",
         *           "_updated_at": "2022-02-18T11:53:04.191Z",
         *           "active": true,
         *           "billing_period": "weekly",
         *           "billing_duration_unit": "months",
         *           "notice_time_unit": "months",
         *           "termination_time_unit": "months",
         *           "renewal_duration_unit": "months",
         *           "is_composite_price": false
         *         }
         *       },
         *       {
         *         "entity_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *         "_schema": "price",
         *         "_product_id": "target-price-product-id",
         *         "quantity": 2,
         *         "item": {
         *           "_id": "comp2-2a95ca9-7a50-41a4-a73c-b5fb1a57d40f",
         *           "unit_amount": 10000,
         *           "unit_amount_currency": "EUR",
         *           "unit_amount_decimal": "100.00",
         *           "sales_tax": "standard",
         *           "is_tax_inclusive": false,
         *           "price_display_in_journeys": "show_price",
         *           "type": "one_time",
         *           "_schema": "price",
         *           "_title": "Test 1",
         *           "description": "Test 1",
         *           "tax": {
         *             "$relation": [
         *               {
         *                 "entity_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4"
         *               }
         *             ]
         *           },
         *           "_org": "739224",
         *           "_created_at": "2022-02-18T10:10:26.439Z",
         *           "_updated_at": "2022-02-18T11:53:04.191Z",
         *           "active": true,
         *           "billing_period": "weekly",
         *           "billing_duration_unit": "months",
         *           "notice_time_unit": "months",
         *           "termination_time_unit": "months",
         *           "renewal_duration_unit": "months",
         *           "is_composite_price": false
         *         }
         *       }
         *     ]
         *   }
         * }
         */
        export interface NonHydratedCompositePrice {
            [name: string]: any;
            /**
             * The billing period duration
             */
            billing_duration_amount?: number | null;
            /**
             * The billing period duration unit
             */
            billing_duration_unit?: "days" | "weeks" | "months" | "years";
            /**
             * The notice period duration
             */
            notice_time_amount?: number | null;
            /**
             * The notice period duration unit
             */
            notice_time_unit?: "days" | "weeks" | "months" | "years";
            /**
             * The termination period duration
             */
            termination_time_amount?: number | null;
            /**
             * The termination period duration unit
             */
            termination_time_unit?: "days" | "weeks" | "months" | "years";
            /**
             * The renewal period duration
             */
            renewal_duration_amount?: number | null;
            /**
             * The renewal period duration unit
             */
            renewal_duration_unit?: "days" | "weeks" | "months" | "years";
            /**
             * Whether the price can be used for new purchases.
             */
            active?: boolean;
            /**
             * A brief description of the price.
             */
            description?: string;
            /**
             * A set of [price](/api/pricing#tag/simple_price_schema) components that define the composite price.
             */
            price_components?: /* A set of [price](/api/pricing#tag/simple_price_schema) components that define the composite price. */ {
                $relation?: PriceComponentRelation[];
            } | {
                $relation?: PriceComponentRelation[];
            };
            /**
             * Three-letter ISO currency code, in lowercase.
             */
            unit_amount_currency?: /* Three-letter ISO currency code, in lowercase. */ /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * The flag for prices that contain price components.
             */
            is_composite_price: true;
            /**
             * The price creation date
             */
            _created_at?: string;
            /**
             * The price id
             */
            _id?: string;
            /**
             * The price autogenerated title
             */
            _title?: string;
            /**
             * The price last update date
             */
            _updated_at?: string;
            /**
             * The organization id the price belongs to
             */
            _org_id?: string;
            /**
             * An arbitrary set of tags attached to the composite price
             */
            _tags?: string[];
        }
        export interface OAuthCredentials {
            /**
             * The OAuth client ID
             * example:
             * client_id_123
             */
            client_id: string;
            /**
             * The OAuth client secret
             * example:
             * client_secret_456
             */
            client_secret: string;
            /**
             * The URL to obtain OAuth tokens
             * example:
             * https://api.example.com/oauth/token
             */
            authorization_url: string;
            /**
             * The OAuth grant type
             */
            grant_type: "client_credentials";
            /**
             * The OAuth scope
             * example:
             * read:user write:user
             */
            scope?: string;
            /**
             * The OAuth access token
             * example:
             * access_token_789
             */
            access_token?: string;
            /**
             * The expiration time of the OAuth access token in seconds
             * example:
             * 3600
             */
            access_token_expires_in?: number;
            /**
             * The expiration time of the OAuth access token
             * example:
             * 1715731200
             */
            access_token_expires_at?: number;
        }
        export interface OAuthIntegration {
            auth_type: "oauth";
            oauth: OAuthCredentials;
            /**
             * The base URL
             * example:
             * https://api.example.com
             */
            base_url?: string;
        }
        export interface Offer {
            target_id?: string;
            items?: {
                price_id: string;
                product_id: string;
                highlight_config?: OfferHighlightConfig;
            }[];
        }
        export interface OfferHighlightConfig {
            unique_selling_point?: string;
            unique_selling_point_icon?: string;
            total?: {
                enabled?: boolean;
                format?: "absolute" | "relative";
                only_if_better?: boolean;
            };
        }
        /**
         * The opportunity entity
         * example:
         * {
         *   "opportunity_number": "OP 2022/335790",
         *   "source": {
         *     "title": "manual"
         *   },
         *   "source_type": "manual",
         *   "_schema": "opportunity",
         *   "_title": "16 Module Solar Pack Lead",
         *   "opportunity_title": "16 Module Solar Pack Lead",
         *   "due_date": "2022-06-30T15:18:00.000Z",
         *   "assignee": [
         *     {
         *       "id": "10002563",
         *       "email": "j.pinho@epilot.cloud",
         *       "display_name": "j.pinho@epilot.cloud",
         *       "token": "9e1758a3-2a32-4a5f-b034-a8ab883f8fb9",
         *       "image_uri": "https://dummy-image.jpg",
         *       "organization_id": "728",
         *       "department": "Engineering",
         *       "preferred_language": "en",
         *       "status": "Active",
         *       "phone": "+49123456789",
         *       "email_notification_setting": {
         *         "added_participant_opportunity": true,
         *         "assigned_opportunity": true,
         *         "assigned_task": true,
         *         "comment_opportunity": true,
         *         "deleted_task": true,
         *         "escalated_task": true,
         *         "message_receive_opportunity": true,
         *         "message_send_opportunity": true,
         *         "created_task": true,
         *         "created_opportunity_manual": true,
         *         "created_opportunity_auto": true,
         *         "deleted_opportunity": true
         *       },
         *       "is_signature_enabled": true,
         *       "created_at": "2021-05-18T06:30:25.36046"
         *     }
         *   ],
         *   "description": "Lead generated automatically via journey automation.",
         *   "customer": {
         *     "$relation": [
         *       {
         *         "entity_id": "69bf4355-9c1e-498a-b87e-6c873668194d",
         *         "_tags": []
         *       },
         *       {
         *         "entity_id": "8625e2e4-978e-4d16-b3d2-0d05fb4091f0",
         *         "_tags": []
         *       }
         *     ]
         *   },
         *   "dates": [
         *     {
         *       "_tags": [
         *         "Installation Date"
         *       ],
         *       "dates": "",
         *       "value": "2022-06-30T15:21:00.000Z"
         *     }
         *   ],
         *   "items": {
         *     "$relation": [
         *       {
         *         "entity_id": "ff5fcdaf-9e36-4292-97f0-6a4e3f82a8f3"
         *       },
         *       {
         *         "entity_id": "ec10b7cf-95ce-4f6b-a266-c566c7734b96"
         *       },
         *       {
         *         "entity_id": "c3745dfe-4a46-4c22-8bf3-6159303474e4"
         *       }
         *     ]
         *   },
         *   "billing_address": {
         *     "$relation_ref": [
         *       {
         *         "entity_id": "69bf4355-9c1e-498a-b87e-6c873668194d",
         *         "path": "address.2"
         *       }
         *     ]
         *   },
         *   "delivery_address": {
         *     "$relation_ref": [
         *       {
         *         "entity_id": "69bf4355-9c1e-498a-b87e-6c873668194d",
         *         "path": "address.24"
         *       }
         *     ]
         *   },
         *   "address": {
         *     "$relation_ref": [
         *       {
         *         "entity_id": "69bf4355-9c1e-498a-b87e-6c873668194d",
         *         "path": "address.25"
         *       }
         *     ]
         *   },
         *   "_id": "319a274b-0477-45e3-9d58-1f46c82d4604",
         *   "_org": "728",
         *   "_created_at": "2022-06-03T15:26:14.006Z",
         *   "_updated_at": "2022-06-03T15:26:14.006Z"
         * }
         */
        export interface Opportunity {
            [name: string]: any;
            /**
             * The opportunity id number for the customer (autogenerated if left blank)
             */
            opportunity_number?: string;
            /**
             * The opportunity title for the opportunity
             */
            opportunity_title?: string;
            /**
             * A description to frame this opportunity within its sales process
             */
            description?: string;
            /**
             * The opportunity status (defined by the opportunity workflow)
             */
            status?: string;
            /**
             * The expiration date
             */
            due_date?: string;
            /**
             * The opportunity assignees
             */
            assignee?: {
                id?: string;
                email?: string;
                display_name?: string;
                token?: string;
                image_uri?: string;
                organization_id?: string;
                department?: string;
                preferred_language?: string;
                status?: string;
                phone?: string;
                email_notification_settings?: {
                    [key: string]: any;
                };
                is_signature_enabled?: boolean;
                created_at?: string;
            }[];
            /**
             * A list of customers related with the opportunity
             */
            customer?: {
                $relation?: EntityRelation[];
            };
            /**
             * A set of dates associated with the opportunity
             */
            dates?: ({
                /**
                 * The date tags
                 */
                _tags?: string[];
                /**
                 * The date value
                 */
                value?: string;
            })[];
            /**
             * The billing address
             */
            billing_address?: {
                /**
                 * The relation from which a field is being referenced
                 */
                $relation_ref?: ({
                    /**
                     * The id of the referenced entity
                     */
                    entity_id?: string;
                    /**
                     * The path to the target attribute being referenced
                     */
                    path?: string;
                })[];
            };
            /**
             * The delivery address
             */
            delivery_address?: {
                /**
                 * The relation from which a field is being referenced
                 */
                $relation_ref?: ({
                    /**
                     * The id of the referenced entity
                     */
                    entity_id?: string;
                    /**
                     * The path to the target attribute being referenced
                     */
                    path?: string;
                })[];
            };
            /**
             * A list of additional addresses
             */
            address?: {
                /**
                 * The relation from which a field is being referenced
                 */
                $relation_ref?: ({
                    /**
                     * The id of the referenced entity
                     */
                    entity_id?: string;
                    /**
                     * The path to the target attribute being referenced
                     */
                    path?: string;
                })[];
            };
            /**
             * The order relations items, representing quotes or orders associated with the opportunity
             */
            items?: {
                $relation?: /* An order relation reference */ OrderRelation[];
            };
            /**
             * Organization Id the order belongs to
             */
            _org_id?: string;
            /**
             * The opportunity id
             */
            _id?: string;
            /**
             * The opportunity creation date
             */
            _created_at?: string;
            /**
             * The opportunity last update date
             */
            _updated_at?: string;
            /**
             * Type of source, e.g. journey or manual
             * example:
             * journey
             */
            source_type?: string;
            /**
             * Identifier for source e.g. journey ID
             * example:
             * ce99875f-fba9-4fe2-a8f9-afaf52059051
             */
            source_id?: string;
            source?: /* The opportunity generation source */ OpportunitySource;
            /**
             * An arbitrary set of tags attached to the opportunity
             */
            _tags?: string[];
        }
        /**
         * The opportunity generation source
         */
        export interface OpportunitySource {
            /**
             * Link path for the source
             * example:
             * /app/v2/journey-builder/editor/db7f6940-994b-11ec-a46d-9f1824ff2939
             */
            http?: string;
            /**
             * Title for the source
             * example:
             * Journey: PH Journey
             */
            title?: string;
        }
        /**
         * The order entity
         * example:
         * {
         *   "order_number": "OR 2022/742701",
         *   "status": "quote",
         *   "source": {
         *     "title": "manual",
         *     "href": null
         *   },
         *   "source_type": "manual",
         *   "_schema": "order",
         *   "_title": "OR 2022/742701",
         *   "expires_at": "2022-06-30T16:17:00.000Z",
         *   "line_items": [
         *     {
         *       "price_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
         *       "product_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
         *       "pricing_model": "per_unit",
         *       "is_composite_price": false,
         *       "taxes": [
         *         {
         *           "tax": {
         *             "_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc",
         *             "rate": 19,
         *             "_schema": "tax",
         *             "_org": "728",
         *             "_created_at": "2021-09-24T15:06:13.859Z",
         *             "_updated_at": "2022-04-04T17:36:15.273Z",
         *             "_title": "Tax Standard",
         *             "type": "VAT",
         *             "active": true,
         *             "region": "DE",
         *             "description": "Standard"
         *           },
         *           "amount": 255462
         *         }
         *       ],
         *       "_price": {
         *         "_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
         *         "unit_amount": 100000,
         *         "unit_amount_currency": "EUR",
         *         "unit_amount_decimal": "1000",
         *         "sales_tax": "standard",
         *         "is_tax_inclusive": true,
         *         "price_display_in_journeys": "show_price",
         *         "type": "one_time",
         *         "billing_period": "weekly",
         *         "billing_duration_unit": "months",
         *         "notice_time_unit": "months",
         *         "termination_time_unit": "months",
         *         "renewal_duration_unit": "months",
         *         "_schema": "price",
         *         "_title": "Solar Panel Module",
         *         "description": "Solar Panel Module",
         *         "active": true,
         *         "pricing_model": "per_unit",
         *         "is_composite_price": false,
         *         "tax": {
         *           "$relation": [
         *             {
         *               "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
         *             }
         *           ]
         *         },
         *         "_org": "728",
         *         "_created_at": "2022-06-03T16:04:10.369Z",
         *         "_updated_at": "2022-06-03T16:04:10.369Z"
         *       },
         *       "_product": {
         *         "_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
         *         "type": "product",
         *         "_schema": "product",
         *         "_title": "Solar Panel with Battery Storage",
         *         "name": "Solar Panel with Battery Storage",
         *         "code": "SOLAR-BATT",
         *         "active": true,
         *         "description": "Solar Panel with battery solution, optimized for max efficiency. ",
         *         "feature": [
         *           {
         *             "_tags": [],
         *             "feature": "Eco-Panels"
         *           },
         *           {
         *             "_tags": [],
         *             "feature": "Remote Management Platform"
         *           },
         *           {
         *             "_tags": [],
         *             "feature": "Battery Remote Control"
         *           },
         *           {
         *             "_tags": [],
         *             "feature": "Mobile App"
         *           }
         *         ],
         *         "cross_sellable_products": {
         *           "$relation": [
         *             {
         *               "entity_id": "068d0713-a650-4668-9ed2-eca7be31e337",
         *               "_schema": "product",
         *               "_tags": []
         *             },
         *             {
         *               "entity_id": "c8402ee7-fba9-4f3d-bffd-6803ca655782",
         *               "_tags": []
         *             }
         *           ]
         *         },
         *         "product_images": {
         *           "$relation": [
         *             {
         *               "entity_id": "37bdeaaa-65fe-403e-9894-65b01cd277f1"
         *             },
         *             {
         *               "entity_id": "56dde657-795c-41bb-bf53-98fd586b7e6e"
         *             }
         *           ]
         *         },
         *         "product_downloads": {
         *           "$relation": [
         *             {
         *               "entity_id": "64211361-8759-414b-81c0-afbf24f83aa9"
         *             }
         *           ]
         *         },
         *         "_org": "728",
         *         "_created_at": "2022-06-03T15:52:27.512Z",
         *         "_updated_at": "2022-06-03T16:05:15.029Z",
         *         "price_options": {
         *           "$relation": [
         *             {
         *               "entity_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
         *               "_tags": []
         *             },
         *             {
         *               "entity_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
         *               "_tags": []
         *             }
         *           ]
         *         }
         *       },
         *       "quantity": 16,
         *       "currency": "EUR",
         *       "description": "Solar Panel Module",
         *       "unit_amount": 100000,
         *       "unit_amount_net": 84034,
         *       "amount_subtotal": 1344538,
         *       "amount_total": 1600000
         *     },
         *     {
         *       "price_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
         *       "product_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
         *       "pricing_model": "per_unit",
         *       "is_composite_price": false,
         *       "taxes": [
         *         {
         *           "tax": {
         *             "_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc",
         *             "rate": 19,
         *             "_schema": "tax",
         *             "_org": "728",
         *             "_created_at": "2021-09-24T15:06:13.859Z",
         *             "_updated_at": "2022-04-04T17:36:15.273Z",
         *             "_title": "Tax Standard",
         *             "type": "VAT",
         *             "active": true,
         *             "region": "DE",
         *             "description": "Standard"
         *           },
         *           "amount": 31933
         *         }
         *       ],
         *       "_price": {
         *         "_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
         *         "unit_amount": 50000,
         *         "unit_amount_currency": "EUR",
         *         "unit_amount_decimal": "500",
         *         "sales_tax": "standard",
         *         "is_tax_inclusive": true,
         *         "price_display_in_journeys": "show_price",
         *         "type": "one_time",
         *         "billing_period": "weekly",
         *         "billing_duration_unit": "months",
         *         "notice_time_unit": "months",
         *         "termination_time_unit": "months",
         *         "renewal_duration_unit": "months",
         *         "_schema": "price",
         *         "_title": "Battery Module 500amps",
         *         "description": "Battery Module 500amps",
         *         "active": true,
         *         "pricing_model": "per_unit",
         *         "is_composite_price": false,
         *         "tax": {
         *           "$relation": [
         *             {
         *               "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
         *             }
         *           ]
         *         },
         *         "_org": "728",
         *         "_created_at": "2022-06-03T16:05:04.391Z",
         *         "_updated_at": "2022-06-03T16:05:04.391Z"
         *       },
         *       "_product": {
         *         "_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
         *         "type": "product",
         *         "_schema": "product",
         *         "_title": "Solar Panel with Battery Storage",
         *         "name": "Solar Panel with Battery Storage",
         *         "code": "SOLAR-BATT",
         *         "active": true,
         *         "description": "Solar Panel with battery solution, optimized for max efficiency. ",
         *         "feature": [
         *           {
         *             "_tags": [],
         *             "feature": "Eco-Panels"
         *           },
         *           {
         *             "_tags": [],
         *             "feature": "Remote Management Platform"
         *           },
         *           {
         *             "_tags": [],
         *             "feature": "Battery Remote Control"
         *           },
         *           {
         *             "_tags": [],
         *             "feature": "Mobile App"
         *           }
         *         ],
         *         "cross_sellable_products": {
         *           "$relation": [
         *             {
         *               "entity_id": "068d0713-a650-4668-9ed2-eca7be31e337",
         *               "_schema": "product",
         *               "_tags": []
         *             },
         *             {
         *               "entity_id": "c8402ee7-fba9-4f3d-bffd-6803ca655782",
         *               "_tags": []
         *             }
         *           ]
         *         },
         *         "product_images": {
         *           "$relation": [
         *             {
         *               "entity_id": "37bdeaaa-65fe-403e-9894-65b01cd277f1"
         *             },
         *             {
         *               "entity_id": "56dde657-795c-41bb-bf53-98fd586b7e6e"
         *             }
         *           ]
         *         },
         *         "product_downloads": {
         *           "$relation": [
         *             {
         *               "entity_id": "64211361-8759-414b-81c0-afbf24f83aa9"
         *             }
         *           ]
         *         },
         *         "_org": "728",
         *         "_created_at": "2022-06-03T15:52:27.512Z",
         *         "_updated_at": "2022-06-03T16:05:15.029Z",
         *         "price_options": {
         *           "$relation": [
         *             {
         *               "entity_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
         *               "_tags": []
         *             },
         *             {
         *               "entity_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
         *               "_tags": []
         *             }
         *           ]
         *         }
         *       },
         *       "quantity": 4,
         *       "currency": "EUR",
         *       "description": "Battery Module 500amps",
         *       "unit_amount": 50000,
         *       "unit_amount_net": 42017,
         *       "amount_subtotal": 168067,
         *       "amount_total": 200000
         *     },
         *     {
         *       "price_id": "d88a8763-3e3d-4fc7-a7a5-2bc9117148bf",
         *       "product_id": "065d6618-cc59-45f4-8e3a-700edf6813c3",
         *       "pricing_model": "per_unit",
         *       "is_composite_price": false,
         *       "_price": {
         *         "_id": "d88a8763-3e3d-4fc7-a7a5-2bc9117148bf",
         *         "unit_amount": 12055,
         *         "type": "recurring",
         *         "billing_period": "monthly",
         *         "billing_duration_amount": 8,
         *         "billing_duration_unit": "years",
         *         "notice_time_amount": 3,
         *         "notice_time_unit": "months",
         *         "termination_time_amount": 2,
         *         "termination_time_unit": "months",
         *         "renewal_duration_amount": 1,
         *         "renewal_duration_unit": "years",
         *         "active": true,
         *         "sales_tax": "reduced",
         *         "is_tax_inclusive": true,
         *         "description": "Monthly",
         *         "billing_scheme": "per_unit",
         *         "_schema": "price",
         *         "_org": "728",
         *         "_created_at": "2021-11-10T14:40:27.695Z",
         *         "_updated_at": "2021-12-14T18:16:33.248Z",
         *         "_title": "Monthly",
         *         "unit_amount_currency": "EUR",
         *         "unit_amount_decimal": "120.55456634",
         *         "pricing_model": "per_unit",
         *         "is_composite_price": false
         *       },
         *       "_product": {
         *         "_id": "065d6618-cc59-45f4-8e3a-700edf6813c3",
         *         "name": "Smartmeter: Schneider Electric PM5000 LCD Energiemessgerät / 3-phasig",
         *         "code": "1312378123",
         *         "_tags": [
         *           "wallbox",
         *           "review demo",
         *           "1"
         *         ],
         *         "categories": [
         *           "Power"
         *         ],
         *         "type": "product",
         *         "active": true,
         *         "feature": [
         *           {
         *             "_tags": [],
         *             "feature": "Bis zu 11 kW Ladeleistung (5x schneller laden)"
         *           },
         *           {
         *             "_tags": [],
         *             "feature": "Integrierter MID Zähler für eine kilowattstundengenaue Abrechnung*"
         *           },
         *           {
         *             "_tags": [],
         *             "feature": "Konfigurierbare Ladeleistung"
         *           },
         *           {
         *             "_tags": [],
         *             "feature": "Zugangskontrolle über RFID-Karten"
         *           },
         *           {
         *             "_tags": [],
         *             "feature": "Kommunikation über LAN"
         *           },
         *           {
         *             "_tags": [],
         *             "feature": "New feature"
         *           }
         *         ],
         *         "_schema": "product",
         *         "_org": "728",
         *         "_created_at": "2021-11-30T11:05:19.484Z",
         *         "_updated_at": "2022-01-13T09:18:29.944Z",
         *         "_title": "Smartmeter: Schneider Electric PM5000 LCD Energiemessgerät / 3-phasig",
         *         "price_options": {
         *           "$relation": [
         *             {
         *               "entity_id": "5264b089-fc6a-4a91-9a2a-80c673958faa"
         *             },
         *             {
         *               "entity_id": "d88a8763-3e3d-4fc7-a7a5-2bc9117148bf"
         *             }
         *           ]
         *         },
         *         "product_images": {
         *           "$relation": [
         *             {
         *               "entity_id": "16729e60-c527-44ef-93c9-c68b6acf1224"
         *             }
         *           ]
         *         }
         *       },
         *       "quantity": 1,
         *       "currency": "EUR",
         *       "description": "Monthly",
         *       "unit_amount": 12055,
         *       "unit_amount_net": 11267,
         *       "amount_subtotal": 11267,
         *       "amount_total": 12055,
         *       "taxes": [
         *         {
         *           "rate": "reduced",
         *           "amount": 789
         *         }
         *       ]
         *     },
         *     {
         *       "price_id": "e1ddf75a-d0d1-40b4-a07e-56e292867c88",
         *       "product_id": "5b9f05b7-f0f8-49c2-8a8d-0f8f923d6382",
         *       "pricing_model": "per_unit",
         *       "is_composite_price": false,
         *       "_price": {
         *         "_id": "e1ddf75a-d0d1-40b4-a07e-56e292867c88",
         *         "unit_amount": 9900,
         *         "unit_amount_currency": "EUR",
         *         "unit_amount_decimal": "99",
         *         "sales_tax": "standard",
         *         "is_tax_inclusive": true,
         *         "price_display_in_journeys": "show_price",
         *         "type": "recurring",
         *         "billing_period": "yearly",
         *         "billing_duration_unit": "months",
         *         "notice_time_unit": "months",
         *         "termination_time_unit": "months",
         *         "renewal_duration_unit": "months",
         *         "_schema": "price",
         *         "_title": "Yearly payment",
         *         "description": "Yearly payment",
         *         "active": true,
         *         "pricing_model": "per_unit",
         *         "is_composite_price": false,
         *         "_org": "728",
         *         "_created_at": "2022-02-07T22:58:39.884Z",
         *         "_updated_at": "2022-02-07T22:58:39.884Z"
         *       },
         *       "_product": {
         *         "_id": "5b9f05b7-f0f8-49c2-8a8d-0f8f923d6382",
         *         "_schema": "product",
         *         "_title": "Yearly Payment Product",
         *         "name": "Yearly Payment Product",
         *         "type": "product",
         *         "active": true,
         *         "price_options": {
         *           "$relation": [
         *             {
         *               "entity_id": "e1ddf75a-d0d1-40b4-a07e-56e292867c88",
         *               "_tags": []
         *             }
         *           ]
         *         },
         *         "_org": "728",
         *         "_created_at": "2022-02-07T22:58:44.162Z",
         *         "_updated_at": "2022-02-08T09:34:08.026Z",
         *         "description": "Hier steht die Produktbeschreibung die sich auf dem Dokument, was generiert wird, gezogen wird."
         *       },
         *       "quantity": 1,
         *       "currency": "EUR",
         *       "description": "Yearly payment",
         *       "unit_amount": 9900,
         *       "unit_amount_net": 8319,
         *       "amount_subtotal": 8319,
         *       "amount_total": 9900,
         *       "taxes": [
         *         {
         *           "rate": "standard",
         *           "amount": 1581
         *         }
         *       ]
         *     }
         *   ],
         *   "amount_subtotal": 1532191,
         *   "amount_total": 1821955,
         *   "total_details": {
         *     "amount_tax": 289764,
         *     "breakdown": {
         *       "taxes": [
         *         {
         *           "tax": {
         *             "_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc",
         *             "rate": 19,
         *             "_schema": "tax",
         *             "_org": "728",
         *             "_created_at": "2021-09-24T15:06:13.859Z",
         *             "_updated_at": "2022-04-04T17:36:15.273Z",
         *             "_title": "Tax Standard",
         *             "type": "VAT",
         *             "active": true,
         *             "region": "DE",
         *             "description": "Standard"
         *           },
         *           "amount": 287395
         *         }
         *       ],
         *       "recurrences": [
         *         {
         *           "type": "one_time",
         *           "amount_subtotal": 1512605,
         *           "amount_subtotal_decimal": "15126.05",
         *           "amount_total": 1800000,
         *           "amount_total_decimal": "18000.00",
         *           "amount_tax": 287395,
         *           "amount_tax_decimal": "2873.95"
         *         },
         *         {
         *           "type": "recurring",
         *           "billing_period": "monthly",
         *           "amount_subtotal": 11267,
         *           "amount_subtotal_decimal": "112.67",
         *           "amount_total": 12055,
         *           "amount_total_decimal": "120.55",
         *           "amount_tax": 789,
         *           "amount_tax_decimal": "7.89"
         *         },
         *         {
         *           "type": "recurring",
         *           "billing_period": "yearly",
         *           "amount_subtotal": 8319,
         *           "amount_subtotal_decimal": "83.19",
         *           "amount_total": 9900,
         *           "amount_total_decimal": "99.00",
         *           "amount_tax": 1581,
         *           "amount_tax_decimal": "15.81"
         *         }
         *       ]
         *     }
         *   },
         *   "currency": "EUR",
         *   "payment_method": [
         *     {
         *       "type": "IBAN",
         *       "details": {}
         *     }
         *   ],
         *   "billing_contact": {
         *     "$relation": [
         *       {
         *         "entity_id": "1834a54e-b68f-4f7f-a98a-fe16f11bc2a5",
         *         "_tags": []
         *       }
         *     ]
         *   },
         *   "billing_first_name": "Joao",
         *   "billing_last_name": "Pinho",
         *   "billing_email": "j.pinho@epilot.cloud",
         *   "billing_company_name": "epilot cloud",
         *   "billing_address": [
         *     {
         *       "_tags": [],
         *       "street": "Im Media Park",
         *       "street_number": "8a",
         *       "postal_code": "52000",
         *       "city": "Cologne",
         *       "country": "DE",
         *       "additional_info": ""
         *     }
         *   ],
         *   "delivery_address": [],
         *   "dates": [
         *     {
         *       "_tags": [
         *         "Instalation Date"
         *       ],
         *       "dates": "",
         *       "value": "2022-06-30T16:29:00.000Z"
         *     }
         *   ],
         *   "_id": "4c7c9562-f8f0-4af0-a3a6-6aebc5571a6e",
         *   "_org": "728",
         *   "_created_at": "2022-06-03T16:29:46.303Z",
         *   "_updated_at": "2022-06-03T16:29:46.303Z"
         * }
         */
        export interface Order {
            [name: string]: any;
            /**
             * The order number (customer facing)
             */
            order_number?: string;
            /**
             * The cart id that originated or is associated with the this order
             */
            cart_id?: string;
            status?: /**
             *
             * | status      | description |
             * |-------------|-------|
             * | `draft`     | ​​Starting state for all orders, at this point we can still edit the order |
             * | `quote`     | The order is in a quoting phase, bound to an expiration date |
             * | `placed`    | The order has been paid and can now be fulfilled (shipped, delivered, complete) or canceled |
             * | `cancelled` | The order has been cancelled |
             * | `completed` | The order is now closed and finalized |
             *
             */
            OrderStatus;
            /**
             * Type of source, e.g. journey or manual
             * example:
             * journey
             */
            source_type?: string;
            /**
             * Identifier for source e.g. journey ID
             * example:
             * ce99875f-fba9-4fe2-a8f9-afaf52059051
             */
            source_id?: string;
            source?: /* The order generation source */ OrderSource;
            metadata?: /* A set of key-value pairs used to store meta data information about an entity. */ MetaData;
            /**
             * A list of customers related with the opportunity
             */
            customer?: {
                $relation?: EntityRelation[];
            };
            /**
             * The billing contact first name
             */
            billing_first_name?: string;
            /**
             * The billing contact last name
             */
            billing_last_name?: string;
            /**
             * The billing account name
             */
            billing_company_name?: string;
            /**
             * The billing account VAT
             */
            billing_vat?: string;
            /**
             * The billing email
             */
            billing_email?: string;
            /**
             * The billing phone
             */
            billing_phone?: string;
            /**
             * The billing address
             */
            billing_address?: Address[];
            /**
             * The order main currency
             */
            currency?: /* The order main currency */ /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * The delivery address
             */
            delivery_address?: Address[];
            /**
             * The payment method details for the order
             */
            payment_method?: /**
             * A PaymentMethod represent your customer's payment instruments.
             *
             */
            PaymentMethod[];
            line_items?: /* Tracks a set of product prices, quantities, (discounts) and taxes. */ PriceItems;
            /**
             * The product entities referenced from within `line_items`
             */
            products?: {
                $relation?: EntityRelation[];
            };
            /**
             * The price entities referenced from within `line_items`
             */
            prices?: {
                $relation?: EntityRelation[];
            };
            /**
             * The coupons referenced from within `line_items`
             */
            coupons?: {
                $relation?: EntityRelation[];
            };
            /**
             * Total of all items before (discounts or) taxes are applied.
             */
            amount_subtotal?: number;
            /**
             * Total of all items after (discounts and) taxes are applied.
             */
            amount_total?: number;
            total_details?: /* The total details with tax (and discount) aggregated totals. */ TotalDetails;
            /**
             * Organization Id the order belongs to
             */
            _org_id?: string;
            /**
             * The order id
             */
            _id?: string;
            /**
             * The order creation date
             */
            _created_at?: string;
            /**
             * The order last update date
             */
            _updated_at?: string;
            /**
             * An arbitrary set of tags attached to the order
             */
            _tags?: string[];
        }
        /**
         * Order Entity Payload
         */
        export interface OrderPayload {
            [name: string]: any;
            status?: /**
             *
             * | status      | description |
             * |-------------|-------|
             * | `draft`     | ​​Starting state for all orders, at this point we can still edit the order |
             * | `quote`     | The order is in a quoting phase, bound to an expiration date |
             * | `placed`    | The order has been paid and can now be fulfilled (shipped, delivered, complete) or canceled |
             * | `cancelled` | The order has been cancelled |
             * | `completed` | The order is now closed and finalized |
             *
             */
            OrderStatus;
            line_items?: /* A valid set of product prices, quantities, (discounts) and taxes from a client. */ PriceItemsDto;
            /**
             * type of source, e.g. journey or manual
             * example:
             * journey
             */
            source_type?: string;
            currency?: /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * The id of an existing contact.
             */
            contact?: string;
            billing_first_name?: string;
            billing_last_name?: string;
            billing_company_name?: string;
            billing_vat?: string;
            billing_email?: string;
            billing_phone?: string;
            billing_address?: Address[];
            delivery_address?: Address[];
            payment_method?: /**
             * A PaymentMethod represent your customer's payment instruments.
             *
             */
            PaymentMethod[];
            redeemed_promos?: RedeemedPromo[];
            _tags?: string[];
        }
        /**
         * An order relation reference
         */
        export interface OrderRelation {
            /**
             * The relation order id
             */
            entity_id?: string;
            _tags?: string[];
        }
        /**
         * The order generation source
         */
        export interface OrderSource {
            /**
             * Link path for the source
             * example:
             * /app/v2/journey-builder/editor/db7f6940-994b-11ec-a46d-9f1824ff2939
             */
            http?: string;
            /**
             * Title for the source
             * example:
             * Journey: PH Journey
             */
            title?: string;
        }
        /**
         *
         * | status      | description |
         * |-------------|-------|
         * | `draft`     | ​​Starting state for all orders, at this point we can still edit the order |
         * | `quote`     | The order is in a quoting phase, bound to an expiration date |
         * | `placed`    | The order has been paid and can now be fulfilled (shipped, delivered, complete) or canceled |
         * | `cancelled` | The order has been cancelled |
         * | `completed` | The order is now closed and finalized |
         *
         */
        export type OrderStatus = "draft" | "quote" | "placed" | "cancelled" | "completed";
        export interface PatchVersionRequest {
            /**
             * Only the attribute overrides to change. Everything not mentioned is left as stored.
             *
             * `null` is a value like any other here rather than a deletion; to stop overriding an
             * attribute, send the complete snapshot without it through the replace operation.
             *
             * example:
             * {
             *   "unit_amount": 2499,
             *   "unit_amount_decimal": "24.99"
             * }
             */
            values: {
                [name: string]: any;
            };
            /**
             * The revision marker read from the version being written. The write is refused with
             * `WRITE_CONFLICT` if the version has been written since.
             *
             * example:
             * 3
             */
            _revision: number;
            /**
             * Optional, never applied, and refused when it names a version other than the one addressed.
             */
            valid_from?: string;
            /**
             * Optional, and never applied. A partial update that tries to change a pinned condition value
             * is refused — this is the path that rule is most likely to be broken on by accident.
             *
             * example:
             * {
             *   "postal_code": "46045"
             * }
             */
            conditions?: {
                [name: string]: any;
            };
        }
        /**
         * A PaymentMethod represent your customer's payment instruments.
         *
         */
        export interface PaymentMethod {
            /**
             * The type of the PaymentMethod.
             */
            type?: string;
            /**
             * Contains relevant data associated with the payment method type.
             */
            details?: {
                [name: string]: any;
            };
        }
        /**
         * The situation this variant applies to: a flat map keyed by condition name, as the entity's
         * schema declares them. A condition left out is a wildcard — the variant applies whatever the
         * context says for it, which is what makes adding a condition to a schema non-breaking for the
         * variants that already exist.
         *
         * Exact values only. Predicates are accepted in a resolve context and nowhere else, so that
         * matching is decided in exactly one place.
         *
         * Values are typed by their condition and stored canonicalized for that type: a `date` becomes
         * millisecond-precision UTC, a `daterange` an object carrying `from` and `until` where an empty
         * string is an open end, a `location` of format `zipcode` the postal code itself and one of
         * format `zipcode + town` an object carrying both. A `select` value must be a string, and must
         * be one the condition's `options` declare.
         *
         * `default`, and any name beginning with `_`, are reserved for the server and cannot be pinned
         * here. Whether a variant is the entity's fallback is set through the request's `default` flag.
         *
         * example:
         * {
         *   "postal_code": "46045"
         * }
         */
        export interface PinnedConditions {
            [name: string]: any;
        }
        export interface PortalContext {
            [name: string]: any;
            /**
             * The contract information.
             */
            contract: {
                [name: string]: any;
            };
            /**
             * The contact information.
             */
            contact: {
                [name: string]: any;
            };
            /**
             * Address to use for product availability checks. Include when the catalog should filter products by serviceable area (e.g. postal code coverage).
             *
             */
            availability_address?: {
                /**
                 * Postal Code
                 */
                postal_code?: string;
                /**
                 * City
                 */
                city?: string;
                /**
                 * Street
                 */
                street?: string;
                /**
                 * Street Number
                 */
                street_number?: string;
                /**
                 * The journey target block of the availability address <step_index>/<block_name>
                 */
                journey_target_block?: string;
            };
            /**
             * Variable inputs (e.g. energy or water consumption) extracted/provided by the portal so the external catalog service can compute amounts for variable prices.
             *
             */
            variable_inputs?: {
                /**
                 * The value of the variable input
                 */
                value?: number;
                /**
                 * The unit of the variable input
                 */
                unit?: string;
                /**
                 * The frequency unit of the variable input
                 */
                frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time";
                /**
                 * The journey target block of the variable input <step_index>/<block_name>
                 */
                journey_target_block?: string;
            }[];
        }
        /**
         * Market area details for power
         */
        export interface PowerMarketAreaDetails {
            /**
             * The EIC of the control zone
             */
            controlZone?: string;
            /**
             * The EIC of the balancing zone
             */
            balancingZone?: string;
        }
        /**
         * The meter type for power
         */
        export type PowerMeterType = "classic" | "smart" | "digital";
        /**
         * The price entity schema for simple pricing
         * example:
         * {
         *   "unit_amount": 100000,
         *   "unit_amount_currency": "EUR",
         *   "unit_amount_decimal": "1000",
         *   "sales_tax": "standard",
         *   "is_tax_inclusive": true,
         *   "price_display_in_journeys": "show_price",
         *   "type": "one_time",
         *   "billing_period": "weekly",
         *   "billing_duration_unit": "months",
         *   "notice_time_unit": "months",
         *   "termination_time_unit": "months",
         *   "renewal_duration_unit": "months",
         *   "_schema": "price",
         *   "_title": "Solar Panel Module",
         *   "description": "Solar Panel Module",
         *   "active": true,
         *   "_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
         *   "_org": "728",
         *   "_created_at": "2022-06-03T16:04:10.369Z",
         *   "_updated_at": "2022-06-03T16:04:10.369Z",
         *   "pricing_model": "per_unit",
         *   "is_composite_price": false
         * }
         */
        export interface Price {
            [name: string]: any;
            /**
             * The billing period duration
             */
            billing_duration_amount?: number | null;
            /**
             * The billing period duration unit
             */
            billing_duration_unit?: "days" | "weeks" | "months" | "years";
            /**
             * The notice period duration
             */
            notice_time_amount?: number | null;
            /**
             * The notice period duration unit
             */
            notice_time_unit?: "days" | "weeks" | "months" | "years";
            /**
             * The termination period duration
             */
            termination_time_amount?: number | null;
            /**
             * The termination period duration unit
             */
            termination_time_unit?: "days" | "weeks" | "months" | "years";
            /**
             * The renewal period duration
             */
            renewal_duration_amount?: number | null;
            /**
             * The renewal period duration unit
             */
            renewal_duration_unit?: "days" | "weeks" | "months" | "years";
            /**
             * Whether the price can be used for new purchases.
             */
            active?: boolean;
            /**
             * The flag for prices that contain price components.
             */
            is_composite_price?: false;
            /**
             * Describes how to compute the price per period. Either `per_unit`, `tiered_graduated` or `tiered_volume`.
             * - `per_unit` indicates that the fixed amount (specified in unit_amount or unit_amount_decimal) will be charged per unit in quantity
             * - `tiered_graduated` indicates that the unit pricing will be computed using tiers attribute. The customer pays the price per unit in every range their purchase rises through.
             * - `tiered_volume` indicates that the unit pricing will be computed using tiers attribute. The customer pays the same unit price for all purchased units.
             * - `tiered_flatfee` While similar to tiered_volume, tiered flat fee charges for the same price (flat) for the entire range instead using the unit price to multiply the quantity.
             *  - `dynamic_tariff` indicates that the price is dynamically dependend on the (quarter)-hourly spot market price.
             * - `external_getag` indicates that the price is influenced by aquisition fees provided by GetAG.
             *
             */
            pricing_model: "per_unit" | "tiered_graduated" | "tiered_volume" | "tiered_flatfee" | "dynamic_tariff" | "external_getag";
            /**
             * Defines an array of tiers. Each tier has an upper bound, an unit amount and a flat fee.
             *
             */
            tiers?: PriceTier[];
            /**
             * A brief description of the price.
             */
            description?: string;
            /**
             * A detailed description of the price. This is shown on the order document and order table.
             */
            long_description?: string;
            /**
             * The default tax rate applicable to the product.
             * This field is deprecated, use the new `tax` attribute.
             *
             */
            sales_tax?: /**
             * The default tax rate applicable to the product.
             * This field is deprecated, use the new `tax` attribute.
             *
             */
            SalesTax;
            /**
             * The default tax rate applied to the price
             */
            tax?: /* The default tax rate applied to the price */ {
                $relation?: EntityRelation[];
            } | /**
             * the tax configuration
             * example:
             * {
             *   "rate": 19,
             *   "_title": "Tax Standard",
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "type": "VAT",
             *   "description": "Tax description",
             *   "active": true,
             *   "region": "DE",
             *   "region_label": "Germany",
             *   "_org": "123",
             *   "_schema": "tax",
             *   "_tags": [
             *     "example",
             *     "mock"
             *   ],
             *   "_created_at": "2021-02-09T12:41:43.662Z",
             *   "_updated_at": "2021-02-09T12:41:43.662Z"
             * }
             */
            Tax[];
            /**
             * Specifies whether the price is considered `inclusive` of taxes or not.
             */
            is_tax_inclusive?: boolean;
            /**
             * One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
             */
            type?: "one_time" | "recurring";
            /**
             * For recurring prices `billing_period` defines the default extent of the recurrence.
             */
            billing_period?: /* For recurring prices `billing_period` defines the default extent of the recurrence. */ BillingPeriod;
            /**
             * The unit amount in cents to be charged, represented as a whole integer if possible.
             */
            unit_amount?: number;
            /**
             * The unit amount in eur to be charged, represented as a decimal string with at most 12 decimal places.
             */
            unit_amount_decimal?: string;
            /**
             * Three-letter ISO currency code, in lowercase.
             */
            unit_amount_currency?: /* Three-letter ISO currency code, in lowercase. */ /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * Defines the way the price amount is display in epilot journeys.
             */
            price_display_in_journeys?: "show_price" | "show_as_starting_price" | "show_as_on_request" | "estimated_price";
            /**
             * The flag for prices that can be influenced by external variables such as user input.
             */
            variable_price?: boolean;
            /**
             * The unit of measurement used for display purposes and possibly for calculations when the price is variable.
             */
            unit?: /* The unit of measurement used for display purposes and possibly for calculations when the price is variable. */ ("kw" | "kwh" | "m" | "m2" | "l" | "cubic-meter" | "cubic-meter-h" | "ls" | "a" | "kva" | "w" | "wp" | "kwp") | string;
            get_ag?: PriceGetAg;
            dynamic_tariff?: PriceDynamicTariff;
            /**
             * The price creation date
             */
            _created_at?: string;
            /**
             * The price id
             */
            _id?: string;
            /**
             * The price autogenerated title
             */
            _title?: string;
            /**
             * The price last update date
             */
            _updated_at?: string;
            /**
             * The organization id the price belongs to
             */
            _org_id?: string;
            /**
             * An arbitrary set of tags attached to the price
             */
            _tags?: string[];
        }
        export interface PriceAmounts {
            /**
             * Total of all items before (discounts or) taxes are applied.
             */
            amount_subtotal?: number;
            /**
             * Total of all items before (discounts or) taxes are applied, as a string with all the decimal places.
             */
            amount_subtotal_decimal?: string;
            /**
             * Total of all items after (discounts and) taxes are applied.
             */
            amount_total?: number;
            /**
             * Total of all items after (discounts and) taxes are applied, as a string with all the decimal places.
             */
            amount_total_decimal?: string;
        }
        export interface PriceComponentRelation {
            /**
             * The id of the price component
             */
            entity_id?: string;
            /**
             * By default, the quantity is set to 1, when greater than 1 this value is used as a multiplicative factor.
             * E.g: 16 x Solar Modules - Premium price.
             *
             */
            quantity?: number;
            /**
             * An arbitrary set of tags attached to the composite price - component relation
             */
            _tags?: string[];
        }
        export interface PriceConditions {
            /**
             * The billing period duration
             */
            billing_duration_amount?: number | null;
            /**
             * The billing period duration unit
             */
            billing_duration_unit?: "days" | "weeks" | "months" | "years";
            /**
             * The notice period duration
             */
            notice_time_amount?: number | null;
            /**
             * The notice period duration unit
             */
            notice_time_unit?: "days" | "weeks" | "months" | "years";
            /**
             * The termination period duration
             */
            termination_time_amount?: number | null;
            /**
             * The termination period duration unit
             */
            termination_time_unit?: "days" | "weeks" | "months" | "years";
            /**
             * The renewal period duration
             */
            renewal_duration_amount?: number | null;
            /**
             * The renewal period duration unit
             */
            renewal_duration_unit?: "days" | "weeks" | "months" | "years";
        }
        export interface PriceDynamicTariff {
            mode: /* The mode of the dynamic tariff. `day_ahead_market` uses the Day-Ahead spot market price as base. */ DynamicTariffMode;
            interval?: /* The interval of the tariff if a spot market price is used as base. */ DynamicTariffInterval;
            average_price: number;
            average_price_decimal: string;
            /**
             * The markup amount, configured in Epilot, in cents.
             */
            markup_amount?: number;
            /**
             * The markup amount, configured in Epilot, as a string with full precision.
             */
            markup_amount_decimal?: string;
            /**
             * The markup amount net, configured in Epilot, in cents.
             */
            markup_amount_net?: number;
            /**
             * The markup amount net, configured in Epilot, as a string with full precision.
             */
            markup_amount_net_decimal?: string;
            /**
             * The markup amount gross, configured in Epilot, in cents.
             */
            markup_amount_gross?: number;
            /**
             * The markup amount gross, configured in Epilot, as a string with full precision.
             */
            markup_amount_gross_decimal?: string;
            /**
             * The unit amount net for the energy price in cents, it's provided by an external provider.
             */
            unit_amount_net?: number;
            /**
             * The unit amount net for the energy price as a string with full precision, it's provided by an external provider.
             */
            unit_amount_net_decimal?: string;
            /**
             * The unit amount gross for the energy price in cents, it's provided by an external provider.
             */
            unit_amount_gross?: number;
            /**
             * The unit amount gross for the energy price as a string with full precision, it's provided by an external provider.
             */
            unit_amount_gross_decimal?: string;
        }
        export interface PriceGetAg {
            category: ProductCategory;
            markup_pricing_model?: /**
             * Describes how to compute the markup per period. Either `per_unit`, `tiered_volume` or `tiered_flatfee`.
             * - `per_unit` indicates that the fixed amount (specified in unit_amount or unit_amount_decimal) will be charged per unit in quantity
             * - `tiered_volume` indicates that the unit pricing will be computed using tiers attribute. The customer pays the same unitary price for all purchased units.
             * - `tiered_flatfee` While similar to tiered_volume, tiered flat fee charges for the same price (flat) for the entire range instead using the unit price to multiply the quantity.
             *
             */
            MarkupPricingModel;
            type?: TypeGetAg;
            tariff_type?: TariffTypeGetAg;
            consumption_type?: ConsumptionTypeGetAg;
            concession_type?: /* The concession type for gas */ GasConcessionType;
            meter_type?: /* The meter type for power */ PowerMeterType;
            /**
             * Defines an array of tiers. Each tier has an upper bound, an unit amount and a flat fee.
             *
             */
            markup_tiers?: PriceTier[];
            markup_amount: number;
            markup_amount_decimal: string;
            markup_amount_net?: number;
            markup_amount_net_decimal?: string;
            markup_amount_gross?: number;
            markup_amount_gross_decimal?: string;
            markup_total_amount_net?: number;
            markup_total_amount_net_decimal?: string;
            markup_total_amount_gross?: number;
            markup_total_amount_gross_decimal?: string;
            /**
             * Whether the additional markups are enabled
             */
            additional_markups_enabled?: boolean;
            additional_markups?: {
                [name: string]: {
                    amount_decimal: string;
                    amount: number;
                    amount_net?: number;
                    amount_net_decimal?: string;
                    amount_gross?: number;
                    amount_gross_decimal?: string;
                };
            };
            unit_amount_gross: number;
            unit_amount_gross_decimal?: string;
            unit_amount_net: number;
            unit_amount_net_decimal?: string;
        }
        /**
         * example:
         * {
         *   "price_id": "589B011B-F8D9-4F8E-AD71-BACE4B543C0F",
         *   "frequency_unit": "weekly",
         *   "value": 1000.245,
         *   "name": "avg consumption",
         *   "metadata": {
         *     "journey_title": "energy journey",
         *     "step_name": "avg consumption picker"
         *   }
         * }
         */
        export interface PriceInputMapping {
            price_id?: string;
            frequency_unit?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time";
            name?: string;
            value?: number;
            metadata?: {
                [name: string]: string;
            };
        }
        /**
         * example:
         * [
         *   {
         *     "price_id": "589B011B-F8D9-4F8E-AD71-BACE4B543C0F",
         *     "frequency_unit": "weekly",
         *     "value": 1000.245,
         *     "name": "avg consumption",
         *     "metadata": {
         *       "journey_title": "energy journey",
         *       "step_name": "avg consumption picker"
         *     }
         *   }
         * ]
         */
        export type PriceInputMappings = /**
         * example:
         * {
         *   "price_id": "589B011B-F8D9-4F8E-AD71-BACE4B543C0F",
         *   "frequency_unit": "weekly",
         *   "value": 1000.245,
         *   "name": "avg consumption",
         *   "metadata": {
         *     "journey_title": "energy journey",
         *     "step_name": "avg consumption picker"
         *   }
         * }
         */
        PriceInputMapping[];
        /**
         * Represents a price item
         * example:
         * {
         *   "amount_subtotal": 10000,
         *   "amount_total": 10600,
         *   "currency": "EUR",
         *   "description": "Annual internet service",
         *   "price_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
         *   "product_id": "6241487f-b7fd-428b-ab92-24ee0b37fd84",
         *   "taxes": [
         *     {
         *       "amount": 600,
         *       "tax": {
         *         "active": true,
         *         "description": "Without Behaviour",
         *         "rate": 6,
         *         "region": "DE",
         *         "type": "VAT",
         *         "_created_at": "2022-02-07T14:49:08.831Z",
         *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
         *         "_org": "739224",
         *         "_schema": "tax",
         *         "_title": "Tax Without Behaviour",
         *         "_updated_at": "2022-02-07T14:49:08.831Z"
         *       }
         *     },
         *     {
         *       "amount": 600,
         *       "tax": {
         *         "active": true,
         *         "description": "Without Behaviour",
         *         "rate": 6,
         *         "region": "DE",
         *         "type": "VAT",
         *         "_created_at": "2022-02-07T14:49:08.831Z",
         *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
         *         "_org": "739224",
         *         "_schema": "tax",
         *         "_title": "Tax Without Behaviour",
         *         "_updated_at": "2022-02-07T14:49:08.831Z"
         *       }
         *     }
         *   ],
         *   "unit_amount": 10000,
         *   "unit_amount_net": 10000,
         *   "pricing_model": "per_unit",
         *   "_price": {
         *     "unit_amount": 10000,
         *     "unit_amount_currency": "EUR",
         *     "unit_amount_decimal": "100.00",
         *     "sales_tax": "standard",
         *     "is_tax_inclusive": false,
         *     "price_display_in_journeys": "show_price",
         *     "type": "one_time",
         *     "billing_period": "weekly",
         *     "billing_duration_unit": "months",
         *     "notice_time_unit": "months",
         *     "termination_time_unit": "months",
         *     "renewal_duration_unit": "months",
         *     "_schema": "price",
         *     "_title": "Solar Panel Module",
         *     "description": "Solar Panel Module",
         *     "active": true,
         *     "tax": {
         *       "$relation": [
         *         {
         *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
         *         },
         *         {
         *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
         *         }
         *       ]
         *     },
         *     "_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
         *     "_org": "728",
         *     "_created_at": "2022-06-03T16:04:10.369Z",
         *     "_updated_at": "2022-06-03T16:04:10.369Z",
         *     "pricing_model": "per_unit"
         *   },
         *   "_product": {
         *     "name": "Cool box",
         *     "type": "product",
         *     "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
         *     "_title": "Cool box"
         *   }
         * }
         */
        export interface PriceItem {
            /**
             * Total of all items before (discounts or) taxes are applied.
             */
            amount_subtotal?: number;
            /**
             * Total of all items before (discounts or) taxes are applied, as a string with all the decimal places.
             */
            amount_subtotal_decimal?: string;
            /**
             * Total of all items after (discounts and) taxes are applied.
             */
            amount_total?: number;
            /**
             * Total of all items after (discounts and) taxes are applied, as a string with all the decimal places.
             */
            amount_total_decimal?: string;
            /**
             * The cashback amount.
             */
            cashback_amount?: number;
            /**
             * The cashback amount as a string with all the decimal places.
             */
            cashback_amount_decimal?: string;
            cashback_period?: /* The cashback period, for now it's limited to either 0 months or 12 months */ CashbackPeriod;
            /**
             * Total amount after cashback is applied.
             */
            after_cashback_amount_total?: number;
            /**
             * Total amount after cashback is applied as a string with all the decimal places.
             */
            after_cashback_amount_total_decimal?: string;
            /**
             * The discount amount.
             */
            discount_amount?: number;
            /**
             * The discount amount as a string with all the decimal places.
             */
            discount_amount_decimal?: string;
            /**
             * The discount percentage, if the applied coupon had a percentage type.
             */
            discount_percentage?: number;
            /**
             * Total amount before discount is applied.
             */
            before_discount_amount_total?: number;
            /**
             * Total amount before discount is applied as a string with all the decimal places.
             */
            before_discount_amount_total_decimal?: string;
            /**
             * Total amount before discount is applied, excluding taxes.
             */
            before_discount_amount_subtotal?: number;
            /**
             * Total amount before discount is applied, excluding taxes, as a string with all the decimal places.
             */
            before_discount_amount_subtotal_decimal?: string;
            metadata?: /* A set of key-value pairs used to store meta data information about an entity. */ MetaData;
            /**
             * The quantity of products being purchased.
             */
            quantity?: number;
            /**
             * The id of the product.
             */
            product_id?: string;
            /**
             * The id of the price.
             */
            price_id?: string;
            /**
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
            /**
             * The description for the product.
             */
            product_description?: string;
            /**
             * The name for the product.
             */
            product_name?: string;
            price_mappings?: /**
             * example:
             * [
             *   {
             *     "price_id": "589B011B-F8D9-4F8E-AD71-BACE4B543C0F",
             *     "frequency_unit": "weekly",
             *     "value": 1000.245,
             *     "name": "avg consumption",
             *     "metadata": {
             *       "journey_title": "energy journey",
             *       "step_name": "avg consumption picker"
             *     }
             *   }
             * ]
             */
            PriceInputMappings;
            /**
             * Specifies whether the price is considered `inclusive` of taxes or not.
             */
            is_tax_inclusive?: boolean;
            /**
             * The snapshot of the product.
             * example:
             * {
             *   "type": "product",
             *   "_schema": "product",
             *   "_title": "Solar Panel with Battery Storage",
             *   "name": "Solar Panel with Battery Storage",
             *   "code": "SOLAR-BATT",
             *   "active": true,
             *   "description": "Solar Panel with battery solution, optimized for max efficiency. ",
             *   "feature": [
             *     {
             *       "_tags": [],
             *       "feature": "Eco-Panels"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Remote Management Platform"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Battery Remote Control"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Mobile App"
             *     }
             *   ],
             *   "cross_sellable_products": {
             *     "$relation": [
             *       {
             *         "entity_id": "068d0713-a650-4668-9ed2-eca7be31e337",
             *         "_schema": "product",
             *         "_tags": []
             *       },
             *       {
             *         "entity_id": "c8402ee7-fba9-4f3d-bffd-6803ca655782",
             *         "_tags": []
             *       }
             *     ]
             *   },
             *   "product_images": {
             *     "$relation": [
             *       {
             *         "entity_id": "37bdeaaa-65fe-403e-9894-65b01cd277f1"
             *       },
             *       {
             *         "entity_id": "56dde657-795c-41bb-bf53-98fd586b7e6e"
             *       }
             *     ]
             *   },
             *   "product_downloads": {
             *     "$relation": [
             *       {
             *         "entity_id": "64211361-8759-414b-81c0-afbf24f83aa9"
             *       }
             *     ]
             *   },
             *   "_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T15: 52: 27.512Z",
             *   "_updated_at": "2022-06-03T16: 05: 15.029Z",
             *   "price_options": {
             *     "$relation": [
             *       {
             *         "entity_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *         "_tags": []
             *       },
             *       {
             *         "entity_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *         "_tags": []
             *       }
             *     ]
             *   }
             * }
             */
            _product?: {
                [name: string]: any;
                /**
                 * The description for the product
                 */
                description?: string;
                /**
                 * The product code
                 */
                code?: string;
                /**
                 * The type of Product:
                 *
                 * | type | description |
                 * |----| ----|
                 * | `product` | Represents a physical good |
                 * | `service` | Represents a service or virtual product |
                 *
                 */
                type?: "product" | "service";
                /**
                 * The product main name
                 */
                name?: string;
                /**
                 * The product categories
                 */
                categories?: string[];
                feature?: {
                    /**
                     * An arbitrary set of tags attached to a feature
                     */
                    _tags?: string[];
                    feature?: string;
                }[];
                /**
                 * Stores references to products that can be cross sold with the current product.
                 */
                cross_sellable_products?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to a set of file images of the product
                 */
                product_images?: /* Stores references to a set of file images of the product */ {
                    $relation?: EntityRelation[];
                } | File[];
                /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                product_downloads?: /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                {
                    $relation?: EntityRelation[];
                } | File[];
                /**
                 * A set of [prices](/api/pricing#tag/simple_price_schema) or [composite prices](/api/pricing#tag/dynamic_price_schema) for the current product.
                 */
                price_options?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to the availability files that define where this product is available.
                 * These files are used when interacting with products via epilot Journeys, thought the AvailabilityCheck block.
                 *
                 */
                _availability_files?: File[];
                /**
                 * The product id
                 */
                _id?: string;
                /**
                 * The autogenerated product title
                 */
                _title?: string;
                /**
                 * The organization id the product belongs to
                 */
                _org_id?: string;
                /**
                 * The product creation date
                 */
                _created_at?: string;
                /**
                 * The product last update date
                 */
                _updated_at?: string;
            };
            /**
             * price item id
             */
            _id?: string;
            /**
             * The unit amount value
             */
            unit_amount?: number;
            /**
             * The unit amount in eur to be charged, represented as a decimal string with at most 12 decimal places.
             */
            unit_amount_decimal?: string;
            /**
             * The unit amount before any discount is applied
             */
            before_discount_unit_amount?: number;
            /**
             * The unit amount before any discount is applied, represented as a decimal string with at most 12 decimal places.
             */
            before_discount_unit_amount_decimal?: string;
            /**
             * The unit gross amount before any discount is applied
             */
            before_discount_unit_amount_gross?: number;
            /**
             * The unit gross amount before any discount is applied, represented as a decimal string with at most 12 decimal places.
             */
            before_discount_unit_amount_gross_decimal?: string;
            /**
             * The unit net amount before any discount is applied
             */
            before_discount_unit_amount_net?: number;
            /**
             * The unit net amount before any discount is applied, represented as a decimal string with at most 12 decimal places.
             */
            before_discount_unit_amount_net_decimal?: string;
            /**
             * The discount amount applied for each unit
             */
            unit_discount_amount?: number;
            /**
             * The discount amount applied for each unit represented as a decimal string
             */
            unit_discount_amount_decimal?: string;
            /**
             * The unit gross amount value.
             */
            unit_amount_gross?: number;
            /**
             * The unit gross amount value.
             */
            unit_amount_gross_decimal?: string;
            /**
             * Net unit amount without taxes or discounts.
             */
            unit_amount_net?: number;
            /**
             * Net unit amount without taxes or discounts.
             */
            unit_amount_net_decimal?: string;
            /**
             * The net discount amount applied for each unit
             */
            unit_discount_amount_net?: number;
            /**
             * The net discount amount applied for each unit represented as a decimal string
             */
            unit_discount_amount_net_decimal?: string;
            /**
             * The discount amount applied to the tax
             */
            tax_discount_amount?: number;
            /**
             * The discount amount applied to the tax represented as a decimal string
             */
            tax_discount_amount_decimal?: string;
            /**
             * The net discount amount applied
             */
            discount_amount_net?: number;
            /**
             * The net discount amount applied represented as a decimal string
             */
            discount_amount_net_decimal?: string;
            /**
             * Total tax amount for this line item.
             */
            amount_tax?: number;
            /**
             * The tax amount before any discount is applied
             */
            before_discount_tax_amount?: number;
            /**
             * The tax amount before any discount is applied represented as a decimal string
             */
            before_discount_tax_amount_decimal?: string;
            currency?: /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * The taxes applied to the price item.
             */
            taxes?: (/* A tax amount associated with a specific tax rate. */ TaxAmount)[];
            /**
             * The sum of amounts of the price items by recurrence.
             */
            recurrences?: (/* An amount associated with a specific recurrence. */ RecurrenceAmount)[];
            /**
             * The coupons applicable to the price item
             */
            _coupons?: (/* The shared properties for the coupon entity and coupon item entity */ CouponItem)[];
            /**
             * When set to true on a `_price` displayed as OnRequest (`show_as_on_request: 'on_request'`) this flag means the price has been approved and can now be displayed to the customer. This flag is only valid for prices shown as 'on_request'.
             */
            on_request_approved?: boolean;
            /**
             * One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
             */
            type?: "one_time" | "recurring";
            /**
             * The flag for prices that contain price components.
             */
            is_composite_price?: false;
            /**
             * The price billing period.
             */
            billing_period?: /* The price billing period. */ BillingPeriod;
            pricing_model: /**
             * Describes how to compute the price per period. Either `per_unit`, `tiered_graduated` or `tiered_volume`.
             * - `per_unit` indicates that the fixed amount (specified in unit_amount or unit_amount_decimal) will be charged per unit in quantity
             * - `tiered_graduated` indicates that the unit pricing will be computed using tiers attribute. The customer pays the price per unit in every range their purchase rises through.
             * - `tiered_volume` indicates that the unit pricing will be computed using tiers attribute. The customer pays the same unit price for all purchased units.
             * - `tiered_flatfee` While similar to tiered_volume, tiered flat fee charges for the same price (flat) for the entire range instead using the unit price to multiply the quantity.
             * - `dynamic_tariff` indicates that the price is dynamically dependend on the (quarter)-hourly spot market price.
             * - `external_getag` indicates that the price is influenced by aquisition fees provided by GetAG.
             *
             */
            PricingModel;
            tiers_details?: TierDetails[];
            get_ag?: PriceGetAg;
            dynamic_tariff?: PriceDynamicTariff;
            /**
             * The price snapshot data.
             */
            _price?: /* The price snapshot data. */ /**
             * The price entity schema for simple pricing
             * example:
             * {
             *   "unit_amount": 100000,
             *   "unit_amount_currency": "EUR",
             *   "unit_amount_decimal": "1000",
             *   "sales_tax": "standard",
             *   "is_tax_inclusive": true,
             *   "price_display_in_journeys": "show_price",
             *   "type": "one_time",
             *   "billing_period": "weekly",
             *   "billing_duration_unit": "months",
             *   "notice_time_unit": "months",
             *   "termination_time_unit": "months",
             *   "renewal_duration_unit": "months",
             *   "_schema": "price",
             *   "_title": "Solar Panel Module",
             *   "description": "Solar Panel Module",
             *   "active": true,
             *   "_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T16:04:10.369Z",
             *   "_updated_at": "2022-06-03T16:04:10.369Z",
             *   "pricing_model": "per_unit",
             *   "is_composite_price": false
             * }
             */
            Price;
        }
        /**
         * Represents a price input to the pricing library.
         */
        export interface PriceItemDto {
            metadata?: /* A set of key-value pairs used to store meta data information about an entity. */ MetaData;
            /**
             * The quantity of products being purchased.
             */
            quantity?: number;
            /**
             * The id of the product.
             */
            product_id?: string;
            /**
             * The id of the price.
             */
            price_id?: string;
            /**
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
            /**
             * The description for the product.
             */
            product_description?: string;
            /**
             * The name for the product.
             */
            product_name?: string;
            price_mappings?: /**
             * example:
             * [
             *   {
             *     "price_id": "589B011B-F8D9-4F8E-AD71-BACE4B543C0F",
             *     "frequency_unit": "weekly",
             *     "value": 1000.245,
             *     "name": "avg consumption",
             *     "metadata": {
             *       "journey_title": "energy journey",
             *       "step_name": "avg consumption picker"
             *     }
             *   }
             * ]
             */
            PriceInputMappings;
            /**
             * Specifies whether the price is considered `inclusive` of taxes or not.
             */
            is_tax_inclusive?: boolean;
            /**
             * The snapshot of the product.
             * example:
             * {
             *   "type": "product",
             *   "_schema": "product",
             *   "_title": "Solar Panel with Battery Storage",
             *   "name": "Solar Panel with Battery Storage",
             *   "code": "SOLAR-BATT",
             *   "active": true,
             *   "description": "Solar Panel with battery solution, optimized for max efficiency. ",
             *   "feature": [
             *     {
             *       "_tags": [],
             *       "feature": "Eco-Panels"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Remote Management Platform"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Battery Remote Control"
             *     },
             *     {
             *       "_tags": [],
             *       "feature": "Mobile App"
             *     }
             *   ],
             *   "cross_sellable_products": {
             *     "$relation": [
             *       {
             *         "entity_id": "068d0713-a650-4668-9ed2-eca7be31e337",
             *         "_schema": "product",
             *         "_tags": []
             *       },
             *       {
             *         "entity_id": "c8402ee7-fba9-4f3d-bffd-6803ca655782",
             *         "_tags": []
             *       }
             *     ]
             *   },
             *   "product_images": {
             *     "$relation": [
             *       {
             *         "entity_id": "37bdeaaa-65fe-403e-9894-65b01cd277f1"
             *       },
             *       {
             *         "entity_id": "56dde657-795c-41bb-bf53-98fd586b7e6e"
             *       }
             *     ]
             *   },
             *   "product_downloads": {
             *     "$relation": [
             *       {
             *         "entity_id": "64211361-8759-414b-81c0-afbf24f83aa9"
             *       }
             *     ]
             *   },
             *   "_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T15: 52: 27.512Z",
             *   "_updated_at": "2022-06-03T16: 05: 15.029Z",
             *   "price_options": {
             *     "$relation": [
             *       {
             *         "entity_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *         "_tags": []
             *       },
             *       {
             *         "entity_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *         "_tags": []
             *       }
             *     ]
             *   }
             * }
             */
            _product?: {
                [name: string]: any;
                /**
                 * The description for the product
                 */
                description?: string;
                /**
                 * The product code
                 */
                code?: string;
                /**
                 * The type of Product:
                 *
                 * | type | description |
                 * |----| ----|
                 * | `product` | Represents a physical good |
                 * | `service` | Represents a service or virtual product |
                 *
                 */
                type?: "product" | "service";
                /**
                 * The product main name
                 */
                name?: string;
                /**
                 * The product categories
                 */
                categories?: string[];
                feature?: {
                    /**
                     * An arbitrary set of tags attached to a feature
                     */
                    _tags?: string[];
                    feature?: string;
                }[];
                /**
                 * Stores references to products that can be cross sold with the current product.
                 */
                cross_sellable_products?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to a set of file images of the product
                 */
                product_images?: /* Stores references to a set of file images of the product */ {
                    $relation?: EntityRelation[];
                } | File[];
                /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                product_downloads?: /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                {
                    $relation?: EntityRelation[];
                } | File[];
                /**
                 * A set of [prices](/api/pricing#tag/simple_price_schema) or [composite prices](/api/pricing#tag/dynamic_price_schema) for the current product.
                 */
                price_options?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to the availability files that define where this product is available.
                 * These files are used when interacting with products via epilot Journeys, thought the AvailabilityCheck block.
                 *
                 */
                _availability_files?: File[];
                /**
                 * The product id
                 */
                _id?: string;
                /**
                 * The autogenerated product title
                 */
                _title?: string;
                /**
                 * The organization id the product belongs to
                 */
                _org_id?: string;
                /**
                 * The product creation date
                 */
                _created_at?: string;
                /**
                 * The product last update date
                 */
                _updated_at?: string;
            };
            external_fees_mappings?: /**
             * example:
             * [
             *   {
             *     "price_id": "589B011B-F8D9-4F8E-AD71-BACE4B543C0F",
             *     "frequency_unit": "weekly",
             *     "amount_total": 1000,
             *     "amount_total_decimal": "10.00"
             *   }
             * ]
             */
            ExternalFeeMappings;
            external_fees_metadata?: ExternalFeeMetadata;
            external_location_metadata?: /* The provider entity */ ExternalLocationMetadata;
            external_price_metadata?: ExternalPriceMetadata;
            _immutable_pricing_details?: /* The result from the calculation of a set of price items. */ PricingDetails;
            /**
             * The ids of the coupons applicable to the price item
             */
            coupon_ids?: string[];
            /**
             * The taxes applied to the price item.
             */
            taxes?: (/* A valid tax rate from a client. */ TaxAmountDto)[];
            /**
             * The taxes applied to the price item.
             */
            recurrences?: (/* An amount associated with a specific recurrence. */ RecurrenceAmountDto)[];
            /**
             * The coupons applicable to the price item
             */
            _coupons?: (/* The shared properties for the coupon entity and coupon item entity */ CouponItem)[];
            /**
             * One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
             */
            type?: "one_time" | "recurring";
            /**
             * The price billing period.
             */
            billing_period?: /* The price billing period. */ BillingPeriod;
            /**
             * The unit amount value
             */
            unit_amount?: number;
            /**
             * The unit gross amount value.
             */
            unit_amount_gross?: number;
            unit_amount_currency?: /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * The unit amount in eur to be charged, represented as a decimal string with at most 12 decimal places.
             */
            unit_amount_decimal?: string;
            /**
             * The flag for prices that contain price components.
             */
            is_composite_price?: false;
            /**
             * Describes how to compute the price per period. Either `per_unit`, `tiered_graduated` or `tiered_volume`.
             * - `per_unit` indicates that the fixed amount (specified in unit_amount or unit_amount_decimal) will be charged per unit in quantity
             * - `tiered_graduated` indicates that the unit pricing will be computed using tiers attribute. The customer pays the price per unit in every range their purchase rises through.
             * - `tiered_volume` indicates that the unit pricing will be computed using tiers attribute. The customer pays the same unit price for all purchased units.
             * - `tiered_flatfee` indicates that the unit pricing will be computed using tiers attribute. The customer pays the same unit price for all purchased units.
             * - `dynamic_tariff` indicates that the price is dynamically dependend on the (quarter)-hourly spot market price.
             * - `external_getag` indicates that the price is influenced by aquisition fees provided by GetAG.
             *
             */
            pricing_model?: "per_unit" | "tiered_graduated" | "tiered_volume" | "tiered_flatfee" | "dynamic_tariff" | "external_getag";
            /**
             * The snapshot of the price linked to the price item.
             * example:
             * {
             *   "unit_amount": 100000,
             *   "unit_amount_currency": "EUR",
             *   "unit_amount_decimal": "1000",
             *   "sales_tax": "standard",
             *   "is_tax_inclusive": true,
             *   "price_display_in_journeys": "show_price",
             *   "type": "one_time",
             *   "billing_period": "weekly",
             *   "billing_duration_unit": "months",
             *   "notice_time_unit": "months",
             *   "termination_time_unit": "months",
             *   "renewal_duration_unit": "months",
             *   "_schema": "price",
             *   "_title": "Solar Panel Module",
             *   "description": "Solar Panel Module",
             *   "active": true,
             *   "_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T16:04:10.369Z",
             *   "_updated_at": "2022-06-03T16:04:10.369Z",
             *   "pricing_model": "per_unit",
             *   "is_composite_price": false
             * }
             */
            _price?: {
                [name: string]: any;
                /**
                 * The billing period duration
                 */
                billing_duration_amount?: number | null;
                /**
                 * The billing period duration unit
                 */
                billing_duration_unit?: "days" | "weeks" | "months" | "years";
                /**
                 * The notice period duration
                 */
                notice_time_amount?: number | null;
                /**
                 * The notice period duration unit
                 */
                notice_time_unit?: "days" | "weeks" | "months" | "years";
                /**
                 * The termination period duration
                 */
                termination_time_amount?: number | null;
                /**
                 * The termination period duration unit
                 */
                termination_time_unit?: "days" | "weeks" | "months" | "years";
                /**
                 * The renewal period duration
                 */
                renewal_duration_amount?: number | null;
                /**
                 * The renewal period duration unit
                 */
                renewal_duration_unit?: "days" | "weeks" | "months" | "years";
                /**
                 * Whether the price can be used for new purchases.
                 */
                active?: boolean;
                /**
                 * The flag for prices that contain price components.
                 */
                is_composite_price?: false;
                /**
                 * Describes how to compute the price per period. Either `per_unit`, `tiered_graduated` or `tiered_volume`.
                 * - `per_unit` indicates that the fixed amount (specified in unit_amount or unit_amount_decimal) will be charged per unit in quantity
                 * - `tiered_graduated` indicates that the unit pricing will be computed using tiers attribute. The customer pays the price per unit in every range their purchase rises through.
                 * - `tiered_volume` indicates that the unit pricing will be computed using tiers attribute. The customer pays the same unit price for all purchased units.
                 * - `tiered_flatfee` While similar to tiered_volume, tiered flat fee charges for the same price (flat) for the entire range instead using the unit price to multiply the quantity.
                 *  - `dynamic_tariff` indicates that the price is dynamically dependend on the (quarter)-hourly spot market price.
                 * - `external_getag` indicates that the price is influenced by aquisition fees provided by GetAG.
                 *
                 */
                pricing_model: "per_unit" | "tiered_graduated" | "tiered_volume" | "tiered_flatfee" | "dynamic_tariff" | "external_getag";
                /**
                 * Defines an array of tiers. Each tier has an upper bound, an unit amount and a flat fee.
                 *
                 */
                tiers?: PriceTier[];
                /**
                 * A brief description of the price.
                 */
                description?: string;
                /**
                 * A detailed description of the price. This is shown on the order document and order table.
                 */
                long_description?: string;
                /**
                 * The default tax rate applicable to the product.
                 * This field is deprecated, use the new `tax` attribute.
                 *
                 */
                sales_tax?: /**
                 * The default tax rate applicable to the product.
                 * This field is deprecated, use the new `tax` attribute.
                 *
                 */
                SalesTax;
                /**
                 * The default tax rate applied to the price
                 */
                tax?: /* The default tax rate applied to the price */ {
                    $relation?: EntityRelation[];
                } | /**
                 * the tax configuration
                 * example:
                 * {
                 *   "rate": 19,
                 *   "_title": "Tax Standard",
                 *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                 *   "type": "VAT",
                 *   "description": "Tax description",
                 *   "active": true,
                 *   "region": "DE",
                 *   "region_label": "Germany",
                 *   "_org": "123",
                 *   "_schema": "tax",
                 *   "_tags": [
                 *     "example",
                 *     "mock"
                 *   ],
                 *   "_created_at": "2021-02-09T12:41:43.662Z",
                 *   "_updated_at": "2021-02-09T12:41:43.662Z"
                 * }
                 */
                Tax[];
                /**
                 * Specifies whether the price is considered `inclusive` of taxes or not.
                 */
                is_tax_inclusive?: boolean;
                /**
                 * One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
                 */
                type?: "one_time" | "recurring";
                /**
                 * For recurring prices `billing_period` defines the default extent of the recurrence.
                 */
                billing_period?: /* For recurring prices `billing_period` defines the default extent of the recurrence. */ BillingPeriod;
                /**
                 * The unit amount in cents to be charged, represented as a whole integer if possible.
                 */
                unit_amount?: number;
                /**
                 * The unit amount in eur to be charged, represented as a decimal string with at most 12 decimal places.
                 */
                unit_amount_decimal?: string;
                /**
                 * Three-letter ISO currency code, in lowercase.
                 */
                unit_amount_currency?: /* Three-letter ISO currency code, in lowercase. */ /**
                 * Three-letter ISO currency code, in lowercase. Must be a supported currency.
                 * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
                 *
                 * example:
                 * EUR
                 */
                Currency;
                /**
                 * Defines the way the price amount is display in epilot journeys.
                 */
                price_display_in_journeys?: "show_price" | "show_as_starting_price" | "show_as_on_request" | "estimated_price";
                /**
                 * The flag for prices that can be influenced by external variables such as user input.
                 */
                variable_price?: boolean;
                /**
                 * The unit of measurement used for display purposes and possibly for calculations when the price is variable.
                 */
                unit?: /* The unit of measurement used for display purposes and possibly for calculations when the price is variable. */ ("kw" | "kwh" | "m" | "m2" | "l" | "cubic-meter" | "cubic-meter-h" | "ls" | "a" | "kva" | "w" | "wp" | "kwp") | string;
                get_ag?: PriceGetAg;
                dynamic_tariff?: PriceDynamicTariff;
                /**
                 * The price creation date
                 */
                _created_at?: string;
                /**
                 * The price id
                 */
                _id?: string;
                /**
                 * The price autogenerated title
                 */
                _title?: string;
                /**
                 * The price last update date
                 */
                _updated_at?: string;
                /**
                 * The organization id the price belongs to
                 */
                _org_id?: string;
                /**
                 * An arbitrary set of tags attached to the price
                 */
                _tags?: string[];
            };
        }
        export type PriceItemDtoUnion = /* Represents a price input to the pricing library. */ PriceItemDto | /* Represents a composite price input to the pricing library. */ CompositePriceItemDto;
        /**
         * Tracks a set of product prices, quantities, (discounts) and taxes.
         */
        export type PriceItems = (/**
         * Represents a price item
         * example:
         * {
         *   "amount_subtotal": 10000,
         *   "amount_total": 10600,
         *   "currency": "EUR",
         *   "description": "Annual internet service",
         *   "price_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
         *   "product_id": "6241487f-b7fd-428b-ab92-24ee0b37fd84",
         *   "taxes": [
         *     {
         *       "amount": 600,
         *       "tax": {
         *         "active": true,
         *         "description": "Without Behaviour",
         *         "rate": 6,
         *         "region": "DE",
         *         "type": "VAT",
         *         "_created_at": "2022-02-07T14:49:08.831Z",
         *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
         *         "_org": "739224",
         *         "_schema": "tax",
         *         "_title": "Tax Without Behaviour",
         *         "_updated_at": "2022-02-07T14:49:08.831Z"
         *       }
         *     },
         *     {
         *       "amount": 600,
         *       "tax": {
         *         "active": true,
         *         "description": "Without Behaviour",
         *         "rate": 6,
         *         "region": "DE",
         *         "type": "VAT",
         *         "_created_at": "2022-02-07T14:49:08.831Z",
         *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
         *         "_org": "739224",
         *         "_schema": "tax",
         *         "_title": "Tax Without Behaviour",
         *         "_updated_at": "2022-02-07T14:49:08.831Z"
         *       }
         *     }
         *   ],
         *   "unit_amount": 10000,
         *   "unit_amount_net": 10000,
         *   "pricing_model": "per_unit",
         *   "_price": {
         *     "unit_amount": 10000,
         *     "unit_amount_currency": "EUR",
         *     "unit_amount_decimal": "100.00",
         *     "sales_tax": "standard",
         *     "is_tax_inclusive": false,
         *     "price_display_in_journeys": "show_price",
         *     "type": "one_time",
         *     "billing_period": "weekly",
         *     "billing_duration_unit": "months",
         *     "notice_time_unit": "months",
         *     "termination_time_unit": "months",
         *     "renewal_duration_unit": "months",
         *     "_schema": "price",
         *     "_title": "Solar Panel Module",
         *     "description": "Solar Panel Module",
         *     "active": true,
         *     "tax": {
         *       "$relation": [
         *         {
         *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
         *         },
         *         {
         *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
         *         }
         *       ]
         *     },
         *     "_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
         *     "_org": "728",
         *     "_created_at": "2022-06-03T16:04:10.369Z",
         *     "_updated_at": "2022-06-03T16:04:10.369Z",
         *     "pricing_model": "per_unit"
         *   },
         *   "_product": {
         *     "name": "Cool box",
         *     "type": "product",
         *     "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
         *     "_title": "Cool box"
         *   }
         * }
         */
        PriceItem | /**
         * Represents a composite price input to the pricing library.
         * example:
         * {
         *   "amount_subtotal": 10000,
         *   "amount_total": 10600,
         *   "currency": "EUR",
         *   "description": "Annual internet service",
         *   "price_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
         *   "product_id": "6241487f-b7fd-428b-ab92-24ee0b37fd84",
         *   "taxes": [
         *     {
         *       "amount": 600,
         *       "tax": {
         *         "active": true,
         *         "description": "Without Behaviour",
         *         "rate": 6,
         *         "region": "DE",
         *         "type": "VAT",
         *         "_created_at": "2022-02-07T14:49:08.831Z",
         *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
         *         "_org": "739224",
         *         "_schema": "tax",
         *         "_title": "Tax Without Behaviour",
         *         "_updated_at": "2022-02-07T14:49:08.831Z"
         *       }
         *     }
         *   ],
         *   "unit_amount": 10000,
         *   "unit_amount_net": 10000,
         *   "pricing_model": "per_unit",
         *   "_price": {
         *     "unit_amount": 10000,
         *     "unit_amount_currency": "EUR",
         *     "unit_amount_decimal": "100.00",
         *     "sales_tax": "standard",
         *     "is_tax_inclusive": false,
         *     "price_display_in_journeys": "show_price",
         *     "type": "one_time",
         *     "billing_period": "weekly",
         *     "billing_duration_unit": "months",
         *     "notice_time_unit": "months",
         *     "termination_time_unit": "months",
         *     "renewal_duration_unit": "months",
         *     "_schema": "price",
         *     "_title": "Solar Panel Module",
         *     "description": "Solar Panel Module",
         *     "active": true,
         *     "tax": {
         *       "$relation": [
         *         {
         *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
         *         }
         *       ]
         *     },
         *     "_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
         *     "_org": "728",
         *     "_created_at": "2022-06-03T16:04:10.369Z",
         *     "_updated_at": "2022-06-03T16:04:10.369Z",
         *     "pricing_model": "per_unit"
         *   },
         *   "_product": {
         *     "name": "Cool box",
         *     "type": "product",
         *     "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
         *     "_title": "Cool box"
         *   }
         * }
         */
        CompositePriceItem)[];
        /**
         * A valid set of product prices, quantities, (discounts) and taxes from a client.
         */
        export type PriceItemsDto = PriceItemDtoUnion[];
        export interface PriceTier {
            up_to?: number | null;
            flat_fee_amount?: number;
            flat_fee_amount_decimal?: string;
            unit_amount?: number;
            unit_amount_decimal?: string;
            display_mode?: PriceTierDisplayMode;
        }
        export type PriceTierDisplayMode = "hidden" | "on_request";
        /**
         * The result from the calculation of a set of price items.
         */
        export interface PricingDetails {
            items?: (/**
             * Represents a price item
             * example:
             * {
             *   "amount_subtotal": 10000,
             *   "amount_total": 10600,
             *   "currency": "EUR",
             *   "description": "Annual internet service",
             *   "price_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
             *   "product_id": "6241487f-b7fd-428b-ab92-24ee0b37fd84",
             *   "taxes": [
             *     {
             *       "amount": 600,
             *       "tax": {
             *         "active": true,
             *         "description": "Without Behaviour",
             *         "rate": 6,
             *         "region": "DE",
             *         "type": "VAT",
             *         "_created_at": "2022-02-07T14:49:08.831Z",
             *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
             *         "_org": "739224",
             *         "_schema": "tax",
             *         "_title": "Tax Without Behaviour",
             *         "_updated_at": "2022-02-07T14:49:08.831Z"
             *       }
             *     },
             *     {
             *       "amount": 600,
             *       "tax": {
             *         "active": true,
             *         "description": "Without Behaviour",
             *         "rate": 6,
             *         "region": "DE",
             *         "type": "VAT",
             *         "_created_at": "2022-02-07T14:49:08.831Z",
             *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
             *         "_org": "739224",
             *         "_schema": "tax",
             *         "_title": "Tax Without Behaviour",
             *         "_updated_at": "2022-02-07T14:49:08.831Z"
             *       }
             *     }
             *   ],
             *   "unit_amount": 10000,
             *   "unit_amount_net": 10000,
             *   "pricing_model": "per_unit",
             *   "_price": {
             *     "unit_amount": 10000,
             *     "unit_amount_currency": "EUR",
             *     "unit_amount_decimal": "100.00",
             *     "sales_tax": "standard",
             *     "is_tax_inclusive": false,
             *     "price_display_in_journeys": "show_price",
             *     "type": "one_time",
             *     "billing_period": "weekly",
             *     "billing_duration_unit": "months",
             *     "notice_time_unit": "months",
             *     "termination_time_unit": "months",
             *     "renewal_duration_unit": "months",
             *     "_schema": "price",
             *     "_title": "Solar Panel Module",
             *     "description": "Solar Panel Module",
             *     "active": true,
             *     "tax": {
             *       "$relation": [
             *         {
             *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
             *         },
             *         {
             *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
             *         }
             *       ]
             *     },
             *     "_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
             *     "_org": "728",
             *     "_created_at": "2022-06-03T16:04:10.369Z",
             *     "_updated_at": "2022-06-03T16:04:10.369Z",
             *     "pricing_model": "per_unit"
             *   },
             *   "_product": {
             *     "name": "Cool box",
             *     "type": "product",
             *     "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
             *     "_title": "Cool box"
             *   }
             * }
             */
            PriceItem | /**
             * Represents a composite price input to the pricing library.
             * example:
             * {
             *   "amount_subtotal": 10000,
             *   "amount_total": 10600,
             *   "currency": "EUR",
             *   "description": "Annual internet service",
             *   "price_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
             *   "product_id": "6241487f-b7fd-428b-ab92-24ee0b37fd84",
             *   "taxes": [
             *     {
             *       "amount": 600,
             *       "tax": {
             *         "active": true,
             *         "description": "Without Behaviour",
             *         "rate": 6,
             *         "region": "DE",
             *         "type": "VAT",
             *         "_created_at": "2022-02-07T14:49:08.831Z",
             *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
             *         "_org": "739224",
             *         "_schema": "tax",
             *         "_title": "Tax Without Behaviour",
             *         "_updated_at": "2022-02-07T14:49:08.831Z"
             *       }
             *     }
             *   ],
             *   "unit_amount": 10000,
             *   "unit_amount_net": 10000,
             *   "pricing_model": "per_unit",
             *   "_price": {
             *     "unit_amount": 10000,
             *     "unit_amount_currency": "EUR",
             *     "unit_amount_decimal": "100.00",
             *     "sales_tax": "standard",
             *     "is_tax_inclusive": false,
             *     "price_display_in_journeys": "show_price",
             *     "type": "one_time",
             *     "billing_period": "weekly",
             *     "billing_duration_unit": "months",
             *     "notice_time_unit": "months",
             *     "termination_time_unit": "months",
             *     "renewal_duration_unit": "months",
             *     "_schema": "price",
             *     "_title": "Solar Panel Module",
             *     "description": "Solar Panel Module",
             *     "active": true,
             *     "tax": {
             *       "$relation": [
             *         {
             *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
             *         }
             *       ]
             *     },
             *     "_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
             *     "_org": "728",
             *     "_created_at": "2022-06-03T16:04:10.369Z",
             *     "_updated_at": "2022-06-03T16:04:10.369Z",
             *     "pricing_model": "per_unit"
             *   },
             *   "_product": {
             *     "name": "Cool box",
             *     "type": "product",
             *     "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
             *     "_title": "Cool box"
             *   }
             * }
             */
            CompositePriceItem)[];
            /**
             * Total of all items before (discounts or) taxes are applied.
             */
            amount_subtotal?: number;
            /**
             * Total of all items after (discounts and) taxes are applied.
             */
            amount_total?: number;
            /**
             * The unit gross amount value.
             */
            unit_amount_gross?: number;
            /**
             * The unit net amount value.
             */
            unit_amount_net?: number;
            /**
             * This is the sum of all the price item tax amounts.
             */
            amount_tax?: number;
            total_details?: /* The total details with tax (and discount) aggregated totals. */ TotalDetails;
            currency?: /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            redeemed_promos?: RedeemedPromo[];
        }
        /**
         * The result from the calculation of a set of price items.
         */
        export interface PricingDetailsResponse {
            items?: (/**
             * Represents a price item
             * example:
             * {
             *   "amount_subtotal": 10000,
             *   "amount_total": 10600,
             *   "currency": "EUR",
             *   "description": "Annual internet service",
             *   "price_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
             *   "product_id": "6241487f-b7fd-428b-ab92-24ee0b37fd84",
             *   "taxes": [
             *     {
             *       "amount": 600,
             *       "tax": {
             *         "active": true,
             *         "description": "Without Behaviour",
             *         "rate": 6,
             *         "region": "DE",
             *         "type": "VAT",
             *         "_created_at": "2022-02-07T14:49:08.831Z",
             *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
             *         "_org": "739224",
             *         "_schema": "tax",
             *         "_title": "Tax Without Behaviour",
             *         "_updated_at": "2022-02-07T14:49:08.831Z"
             *       }
             *     },
             *     {
             *       "amount": 600,
             *       "tax": {
             *         "active": true,
             *         "description": "Without Behaviour",
             *         "rate": 6,
             *         "region": "DE",
             *         "type": "VAT",
             *         "_created_at": "2022-02-07T14:49:08.831Z",
             *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
             *         "_org": "739224",
             *         "_schema": "tax",
             *         "_title": "Tax Without Behaviour",
             *         "_updated_at": "2022-02-07T14:49:08.831Z"
             *       }
             *     }
             *   ],
             *   "unit_amount": 10000,
             *   "unit_amount_net": 10000,
             *   "pricing_model": "per_unit",
             *   "_price": {
             *     "unit_amount": 10000,
             *     "unit_amount_currency": "EUR",
             *     "unit_amount_decimal": "100.00",
             *     "sales_tax": "standard",
             *     "is_tax_inclusive": false,
             *     "price_display_in_journeys": "show_price",
             *     "type": "one_time",
             *     "billing_period": "weekly",
             *     "billing_duration_unit": "months",
             *     "notice_time_unit": "months",
             *     "termination_time_unit": "months",
             *     "renewal_duration_unit": "months",
             *     "_schema": "price",
             *     "_title": "Solar Panel Module",
             *     "description": "Solar Panel Module",
             *     "active": true,
             *     "tax": {
             *       "$relation": [
             *         {
             *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
             *         },
             *         {
             *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
             *         }
             *       ]
             *     },
             *     "_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
             *     "_org": "728",
             *     "_created_at": "2022-06-03T16:04:10.369Z",
             *     "_updated_at": "2022-06-03T16:04:10.369Z",
             *     "pricing_model": "per_unit"
             *   },
             *   "_product": {
             *     "name": "Cool box",
             *     "type": "product",
             *     "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
             *     "_title": "Cool box"
             *   }
             * }
             */
            PriceItem | /**
             * Represents a composite price input to the pricing library.
             * example:
             * {
             *   "amount_subtotal": 10000,
             *   "amount_total": 10600,
             *   "currency": "EUR",
             *   "description": "Annual internet service",
             *   "price_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
             *   "product_id": "6241487f-b7fd-428b-ab92-24ee0b37fd84",
             *   "taxes": [
             *     {
             *       "amount": 600,
             *       "tax": {
             *         "active": true,
             *         "description": "Without Behaviour",
             *         "rate": 6,
             *         "region": "DE",
             *         "type": "VAT",
             *         "_created_at": "2022-02-07T14:49:08.831Z",
             *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
             *         "_org": "739224",
             *         "_schema": "tax",
             *         "_title": "Tax Without Behaviour",
             *         "_updated_at": "2022-02-07T14:49:08.831Z"
             *       }
             *     }
             *   ],
             *   "unit_amount": 10000,
             *   "unit_amount_net": 10000,
             *   "pricing_model": "per_unit",
             *   "_price": {
             *     "unit_amount": 10000,
             *     "unit_amount_currency": "EUR",
             *     "unit_amount_decimal": "100.00",
             *     "sales_tax": "standard",
             *     "is_tax_inclusive": false,
             *     "price_display_in_journeys": "show_price",
             *     "type": "one_time",
             *     "billing_period": "weekly",
             *     "billing_duration_unit": "months",
             *     "notice_time_unit": "months",
             *     "termination_time_unit": "months",
             *     "renewal_duration_unit": "months",
             *     "_schema": "price",
             *     "_title": "Solar Panel Module",
             *     "description": "Solar Panel Module",
             *     "active": true,
             *     "tax": {
             *       "$relation": [
             *         {
             *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
             *         }
             *       ]
             *     },
             *     "_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
             *     "_org": "728",
             *     "_created_at": "2022-06-03T16:04:10.369Z",
             *     "_updated_at": "2022-06-03T16:04:10.369Z",
             *     "pricing_model": "per_unit"
             *   },
             *   "_product": {
             *     "name": "Cool box",
             *     "type": "product",
             *     "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
             *     "_title": "Cool box"
             *   }
             * }
             */
            CompositePriceItem)[];
            /**
             * Total of all items before (discounts or) taxes are applied.
             */
            amount_subtotal?: number;
            /**
             * Total of all items after (discounts and) taxes are applied.
             */
            amount_total?: number;
            /**
             * The unit gross amount value.
             */
            unit_amount_gross?: number;
            /**
             * The unit net amount value.
             */
            unit_amount_net?: number;
            /**
             * This is the sum of all the price item tax amounts.
             */
            amount_tax?: number;
            total_details?: /* The total details with tax (and discount) aggregated totals. */ TotalDetails;
            currency?: /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            redeemed_promos?: RedeemedPromo[];
        }
        /**
         * Describes how to compute the price per period. Either `per_unit`, `tiered_graduated` or `tiered_volume`.
         * - `per_unit` indicates that the fixed amount (specified in unit_amount or unit_amount_decimal) will be charged per unit in quantity
         * - `tiered_graduated` indicates that the unit pricing will be computed using tiers attribute. The customer pays the price per unit in every range their purchase rises through.
         * - `tiered_volume` indicates that the unit pricing will be computed using tiers attribute. The customer pays the same unit price for all purchased units.
         * - `tiered_flatfee` While similar to tiered_volume, tiered flat fee charges for the same price (flat) for the entire range instead using the unit price to multiply the quantity.
         * - `dynamic_tariff` indicates that the price is dynamically dependend on the (quarter)-hourly spot market price.
         * - `external_getag` indicates that the price is influenced by aquisition fees provided by GetAG.
         *
         */
        export type PricingModel = "per_unit" | "tiered_graduated" | "tiered_volume" | "tiered_flatfee" | "dynamic_tariff" | "external_getag";
        /**
         * The product entity
         * example:
         * {
         *   "type": "product",
         *   "_schema": "product",
         *   "_title": "Solar Panel with Battery Storage",
         *   "name": "Solar Panel with Battery Storage",
         *   "code": "SOLAR-BATT",
         *   "active": true,
         *   "description": "Solar Panel with battery solution, optimized for max efficiency. ",
         *   "feature": [
         *     {
         *       "_tags": [],
         *       "feature": "Eco-Panels"
         *     },
         *     {
         *       "_tags": [],
         *       "feature": "Remote Management Platform"
         *     },
         *     {
         *       "_tags": [],
         *       "feature": "Battery Remote Control"
         *     },
         *     {
         *       "_tags": [],
         *       "feature": "Mobile App"
         *     }
         *   ],
         *   "cross_sellable_products": {
         *     "$relation": [
         *       {
         *         "entity_id": "068d0713-a650-4668-9ed2-eca7be31e337",
         *         "_schema": "product",
         *         "_tags": []
         *       },
         *       {
         *         "entity_id": "c8402ee7-fba9-4f3d-bffd-6803ca655782",
         *         "_tags": []
         *       }
         *     ]
         *   },
         *   "product_images": {
         *     "$relation": [
         *       {
         *         "entity_id": "37bdeaaa-65fe-403e-9894-65b01cd277f1"
         *       },
         *       {
         *         "entity_id": "56dde657-795c-41bb-bf53-98fd586b7e6e"
         *       }
         *     ]
         *   },
         *   "product_downloads": {
         *     "$relation": [
         *       {
         *         "entity_id": "64211361-8759-414b-81c0-afbf24f83aa9"
         *       }
         *     ]
         *   },
         *   "_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
         *   "_org": "728",
         *   "_created_at": "2022-06-03T15: 52: 27.512Z",
         *   "_updated_at": "2022-06-03T16: 05: 15.029Z",
         *   "price_options": {
         *     "$relation": [
         *       {
         *         "entity_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
         *         "_tags": []
         *       },
         *       {
         *         "entity_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
         *         "_tags": []
         *       }
         *     ]
         *   }
         * }
         */
        export interface Product {
            [name: string]: any;
            /**
             * The description for the product
             */
            description?: string;
            /**
             * The product code
             */
            code?: string;
            /**
             * The type of Product:
             *
             * | type | description |
             * |----| ----|
             * | `product` | Represents a physical good |
             * | `service` | Represents a service or virtual product |
             *
             */
            type?: "product" | "service";
            /**
             * The product main name
             */
            name?: string;
            /**
             * The product categories
             */
            categories?: string[];
            feature?: {
                /**
                 * An arbitrary set of tags attached to a feature
                 */
                _tags?: string[];
                feature?: string;
            }[];
            /**
             * Stores references to products that can be cross sold with the current product.
             */
            cross_sellable_products?: {
                $relation?: EntityRelation[];
            };
            /**
             * Stores references to a set of file images of the product
             */
            product_images?: /* Stores references to a set of file images of the product */ {
                $relation?: EntityRelation[];
            } | File[];
            /**
             * Stores references to a set of files downloadable from the product.
             * e.g: tech specifications, quality control sheets, privacy policy agreements
             *
             */
            product_downloads?: /**
             * Stores references to a set of files downloadable from the product.
             * e.g: tech specifications, quality control sheets, privacy policy agreements
             *
             */
            {
                $relation?: EntityRelation[];
            } | File[];
            /**
             * A set of [prices](/api/pricing#tag/simple_price_schema) or [composite prices](/api/pricing#tag/dynamic_price_schema) for the current product.
             */
            price_options?: {
                $relation?: EntityRelation[];
            };
            /**
             * Stores references to the availability files that define where this product is available.
             * These files are used when interacting with products via epilot Journeys, thought the AvailabilityCheck block.
             *
             */
            _availability_files?: File[];
            /**
             * The product id
             */
            _id?: string;
            /**
             * The autogenerated product title
             */
            _title?: string;
            /**
             * The organization id the product belongs to
             */
            _org_id?: string;
            /**
             * The product creation date
             */
            _created_at?: string;
            /**
             * The product last update date
             */
            _updated_at?: string;
        }
        export type ProductCategory = "power" | "gas";
        /**
         * example:
         * {
         *   "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
         *   "_title": "Cool box",
         *   "_org": "728",
         *   "_schema": "order",
         *   "_created_at": "2022-06-03T16:04:10.000Z",
         *   "_updated_at": "2022-06-03T16:04:10.000Z",
         *   "amount_subtotal": 10000,
         *   "amount_total": 10600,
         *   "currency": "EUR",
         *   "description": "Annual internet service",
         *   "price_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
         *   "product_id": "6241487f-b7fd-428b-ab92-24ee0b37fd84",
         *   "taxes": [
         *     {
         *       "amount": 600,
         *       "tax": {
         *         "active": true,
         *         "description": "Without Behaviour",
         *         "rate": 6,
         *         "region": "DE",
         *         "type": "VAT",
         *         "_created_at": "2022-02-07T14:49:08.831Z",
         *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
         *         "_org": "739224",
         *         "_schema": "tax",
         *         "_title": "Tax Without Behaviour",
         *         "_updated_at": "2022-02-07T14:49:08.831Z"
         *       }
         *     }
         *   ],
         *   "unit_amount": 10000,
         *   "unit_amount_net": 10000,
         *   "pricing_model": "per_unit",
         *   "_price": {
         *     "_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
         *     "unit_amount": 10000,
         *     "unit_amount_currency": "EUR",
         *     "unit_amount_decimal": "100.00",
         *     "sales_tax": "standard",
         *     "is_tax_inclusive": false,
         *     "price_display_in_journeys": "show_price",
         *     "type": "one_time",
         *     "billing_period": "weekly",
         *     "billing_duration_unit": "months",
         *     "notice_time_unit": "months",
         *     "termination_time_unit": "months",
         *     "renewal_duration_unit": "months",
         *     "_schema": "price",
         *     "_title": "Solar Panel Module",
         *     "description": "Solar Panel Module",
         *     "active": true,
         *     "tax": {
         *       "$relation": [
         *         {
         *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
         *         }
         *       ]
         *     },
         *     "_org": "728",
         *     "_created_at": "2022-06-03T16:04:10.369Z",
         *     "_updated_at": "2022-06-03T16:04:10.369Z",
         *     "pricing_model": "per_unit"
         *   },
         *   "_product": {
         *     "name": "Cool box",
         *     "type": "product",
         *     "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
         *     "_title": "Cool box"
         *   }
         * }
         */
        export interface ProductRecommendation {
            _id: EntityId /* uuid */;
            /**
             * Title of entity
             */
            _title: string;
            /**
             * Organization Id the entity belongs to
             */
            _org: string;
            _schema: string;
            _tags?: string[];
            _created_at: string; // date-time
            _updated_at: string; // date-time
            /**
             * Price being used as source
             */
            source_price?: {
                $relation?: EntityRelation[];
            };
            /**
             * Product being used as source
             */
            source_product?: {
                $relation?: EntityRelation[];
            };
            /**
             * Type of product recommendation
             */
            type?: "change" | "cross-sell" | "up-sell";
            offers?: Offer[];
        }
        /**
         * Product recommendations request payload
         */
        export interface ProductRecommendationResponse {
            /**
             * The number of results returned.
             */
            hits: number;
            results: /**
             * example:
             * {
             *   "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
             *   "_title": "Cool box",
             *   "_org": "728",
             *   "_schema": "order",
             *   "_created_at": "2022-06-03T16:04:10.000Z",
             *   "_updated_at": "2022-06-03T16:04:10.000Z",
             *   "amount_subtotal": 10000,
             *   "amount_total": 10600,
             *   "currency": "EUR",
             *   "description": "Annual internet service",
             *   "price_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
             *   "product_id": "6241487f-b7fd-428b-ab92-24ee0b37fd84",
             *   "taxes": [
             *     {
             *       "amount": 600,
             *       "tax": {
             *         "active": true,
             *         "description": "Without Behaviour",
             *         "rate": 6,
             *         "region": "DE",
             *         "type": "VAT",
             *         "_created_at": "2022-02-07T14:49:08.831Z",
             *         "_id": "18bbbc2e-2c37-4f91-924a-07ae60d830e4",
             *         "_org": "739224",
             *         "_schema": "tax",
             *         "_title": "Tax Without Behaviour",
             *         "_updated_at": "2022-02-07T14:49:08.831Z"
             *       }
             *     }
             *   ],
             *   "unit_amount": 10000,
             *   "unit_amount_net": 10000,
             *   "pricing_model": "per_unit",
             *   "_price": {
             *     "_id": "7e24ff5d-d580-4136-a32f-19191eed039a",
             *     "unit_amount": 10000,
             *     "unit_amount_currency": "EUR",
             *     "unit_amount_decimal": "100.00",
             *     "sales_tax": "standard",
             *     "is_tax_inclusive": false,
             *     "price_display_in_journeys": "show_price",
             *     "type": "one_time",
             *     "billing_period": "weekly",
             *     "billing_duration_unit": "months",
             *     "notice_time_unit": "months",
             *     "termination_time_unit": "months",
             *     "renewal_duration_unit": "months",
             *     "_schema": "price",
             *     "_title": "Solar Panel Module",
             *     "description": "Solar Panel Module",
             *     "active": true,
             *     "tax": {
             *       "$relation": [
             *         {
             *           "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
             *         }
             *       ]
             *     },
             *     "_org": "728",
             *     "_created_at": "2022-06-03T16:04:10.369Z",
             *     "_updated_at": "2022-06-03T16:04:10.369Z",
             *     "pricing_model": "per_unit"
             *   },
             *   "_product": {
             *     "name": "Cool box",
             *     "type": "product",
             *     "_id": "73f857a4-0fbc-4aa6-983f-87c0d6d410a6",
             *     "_title": "Cool box"
             *   }
             * }
             */
            ProductRecommendation[];
        }
        /**
         * Product recommendations request payload
         */
        export interface ProductRecommendationSearch {
            product_recommendation_ids?: string[];
            /**
             * The catalog item to be used as source for the recommendation
             */
            catalog_item?: {
                /**
                 * Product id
                 */
                product_id?: string;
                /**
                 * Product id
                 */
                price_id?: string;
            };
            /**
             * The contract id to be used as source for the recommendation
             */
            contract_id?: string;
            filters?: /* Availability filters dimensions */ AvailabilityFilters;
        }
        /**
         * example:
         * {
         *   "id": "123e4567-e89b-12d3-a456-426614174000",
         *   "code": "123456",
         *   "has_usage_limit": true,
         *   "usage_limit": 10
         * }
         */
        export interface PromoCode {
            /**
             * The id of the promo code
             */
            id: string;
            /**
             * The code of the promo code
             */
            code: string;
            /**
             * Whether the promo code has a usage limit
             */
            has_usage_limit?: boolean;
            /**
             * The usage limit of the promo code
             */
            usage_limit?: number | null;
        }
        /**
         * The result from the validation of a set of promo codes.
         */
        export interface PromoCodeValidationResponse {
            matched_coupons?: /**
             * The base for the coupon entity without promo codes
             * example:
             * {
             *   "_id": "123e4567-e89b-12d3-a456-426614174000",
             *   "_schema": "coupon",
             *   "_org": "org_12345",
             *   "_created_at": "2024-01-15T10:00:00.000Z",
             *   "_updated_at": "2024-01-20T12:00:00.000Z",
             *   "_title": "Sample Coupon",
             *   "name": "Sample Coupon",
             *   "type": "fixed",
             *   "fixed_value": 555,
             *   "fixed_value_currency": "USD",
             *   "fixed_value_decimal": "5.55",
             *   "active": true,
             *   "category": "cashback",
             *   "prices": {
             *     "$relation": [
             *       {
             *         "entity_id": "abc12345-def6-7890-gh12-ijklmnopqrst",
             *         "_tags": [
             *           "discount",
             *           "special"
             *         ],
             *         "_schema": "price"
             *       }
             *     ]
             *   }
             * }
             */
            CouponWithoutPromoCodes[];
        }
        /**
         * The provider entity
         */
        export interface Provider {
            /**
             * The provider name
             */
            name: string;
            /**
             * The provider code
             */
            code: string;
            /**
             * The type of product
             */
            type: "gas" | "power";
            additionalData: /* Additional data included in the provider entity */ AdditionalProviderData;
            _meta?: /* Signature meta data payload */ SignatureMeta;
        }
        /**
         * An amount associated with a specific recurrence.
         */
        export interface RecurrenceAmount {
            /**
             * Total of all items before (discounts or) taxes are applied.
             */
            amount_subtotal: number;
            /**
             * Total of all items before (discounts or) taxes are applied, as a string with all the decimal places.
             */
            amount_subtotal_decimal: string;
            /**
             * Total of all items after (discounts and) taxes are applied.
             */
            amount_total: number;
            /**
             * Total of all items after (discounts and) taxes are applied, as a string with all the decimal places.
             */
            amount_total_decimal: string;
            /**
             * The cashback amount.
             */
            cashback_amount?: number;
            /**
             * The cashback amount as a string with all the decimal places.
             */
            cashback_amount_decimal?: string;
            cashback_period?: /* The cashback period, for now it's limited to either 0 months or 12 months */ CashbackPeriod;
            /**
             * Total amount after cashback is applied.
             */
            after_cashback_amount_total?: number;
            /**
             * Total amount after cashback is applied as a string with all the decimal places.
             */
            after_cashback_amount_total_decimal?: string;
            /**
             * The discount amount.
             */
            discount_amount?: number;
            /**
             * The discount amount as a string with all the decimal places.
             */
            discount_amount_decimal?: string;
            /**
             * The discount percentage, if the applied coupon had a percentage type.
             */
            discount_percentage?: number;
            /**
             * Total amount before discount is applied.
             */
            before_discount_amount_total?: number;
            /**
             * Total amount before discount is applied as a string with all the decimal places.
             */
            before_discount_amount_total_decimal?: string;
            /**
             * Total amount before discount is applied, excluding taxes.
             */
            before_discount_amount_subtotal?: number;
            /**
             * Total amount before discount is applied, excluding taxes, as a string with all the decimal places.
             */
            before_discount_amount_subtotal_decimal?: string;
            /**
             * The price type.
             */
            type?: string;
            /**
             * The price billing period.
             */
            billing_period?: /* The price billing period. */ BillingPeriod;
            /**
             * The unit gross amount value.
             */
            unit_amount_gross?: number;
            /**
             * The unit net amount value.
             */
            unit_amount_net?: number;
            /**
             * Total of all items taxes, with same recurrence.
             */
            amount_tax?: number;
            /**
             * Total of all items taxes, with same recurrence, as a string with all the decimal places.
             */
            amount_tax_decimal?: string;
            currency?: /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
        }
        /**
         * An amount associated with a specific recurrence.
         */
        export interface RecurrenceAmountDto {
            /**
             * Total of all items before (discounts or) taxes are applied.
             */
            amount_subtotal: number;
            /**
             * Total of all items before (discounts or) taxes are applied, as a string with all the decimal places.
             */
            amount_subtotal_decimal: string;
            /**
             * Total of all items after (discounts and) taxes are applied.
             */
            amount_total: number;
            /**
             * Total of all items after (discounts and) taxes are applied, as a string with all the decimal places.
             */
            amount_total_decimal: string;
            /**
             * The cashback amount.
             */
            cashback_amount?: number;
            /**
             * The cashback amount as a string with all the decimal places.
             */
            cashback_amount_decimal?: string;
            cashback_period?: /* The cashback period, for now it's limited to either 0 months or 12 months */ CashbackPeriod;
            /**
             * Total amount after cashback is applied.
             */
            after_cashback_amount_total?: number;
            /**
             * Total amount after cashback is applied as a string with all the decimal places.
             */
            after_cashback_amount_total_decimal?: string;
            /**
             * The discount amount.
             */
            discount_amount?: number;
            /**
             * The discount amount as a string with all the decimal places.
             */
            discount_amount_decimal?: string;
            /**
             * The discount percentage, if the applied coupon had a percentage type.
             */
            discount_percentage?: number;
            /**
             * Total amount before discount is applied.
             */
            before_discount_amount_total?: number;
            /**
             * Total amount before discount is applied as a string with all the decimal places.
             */
            before_discount_amount_total_decimal?: string;
            /**
             * Total amount before discount is applied, excluding taxes.
             */
            before_discount_amount_subtotal?: number;
            /**
             * Total amount before discount is applied, excluding taxes, as a string with all the decimal places.
             */
            before_discount_amount_subtotal_decimal?: string;
            /**
             * The price type.
             */
            type?: string;
            /**
             * The price billing period.
             */
            billing_period?: /* The price billing period. */ BillingPeriod;
            /**
             * The unit gross amount value.
             */
            unit_amount_gross?: number;
            /**
             * The unit net amount value.
             */
            unit_amount_net?: number;
            /**
             * Total of all items taxes, with same recurrence.
             */
            amount_tax?: number;
        }
        /**
         * An amount associated with a specific recurrence.
         */
        export interface RecurrenceAmountWithTax {
            /**
             * The price type.
             */
            type?: string;
            /**
             * The price billing period.
             */
            billing_period?: /* The price billing period. */ BillingPeriod;
            /**
             * Total amount of items with same recurrence.
             */
            amount_total: number;
            /**
             * Total amount of items with same recurrence, excluding taxes.
             */
            amount_subtotal: number;
            /**
             * Total tax amount of items with same recurrence.
             */
            amount_tax?: number;
            tax?: /* A tax amount associated with a specific tax rate. */ TaxAmountBreakdown;
        }
        export interface RedeemedPromo {
            /**
             * The promocode inserted by the customer to redeem the promotion
             */
            code: string;
            /**
             * The coupons that got redeemed with received the code
             */
            coupons: /**
             * The base for the coupon entity without promo codes
             * example:
             * {
             *   "_id": "123e4567-e89b-12d3-a456-426614174000",
             *   "_schema": "coupon",
             *   "_org": "org_12345",
             *   "_created_at": "2024-01-15T10:00:00.000Z",
             *   "_updated_at": "2024-01-20T12:00:00.000Z",
             *   "_title": "Sample Coupon",
             *   "name": "Sample Coupon",
             *   "type": "fixed",
             *   "fixed_value": 555,
             *   "fixed_value_currency": "USD",
             *   "fixed_value_decimal": "5.55",
             *   "active": true,
             *   "category": "cashback",
             *   "prices": {
             *     "$relation": [
             *       {
             *         "entity_id": "abc12345-def6-7890-gh12-ijklmnopqrst",
             *         "_tags": [
             *           "discount",
             *           "special"
             *         ],
             *         "_schema": "price"
             *       }
             *     ]
             *   }
             * }
             */
            CouponWithoutPromoCodes[];
        }
        export interface ReplaceVersionRequest {
            /**
             * The complete set of attribute overrides this version carries. An overridable attribute
             * absent from here stops being overridden.
             *
             * Attributes the variant may not override are ignored where this carries them, and their
             * **stored value is kept rather than dropped** — otherwise a routine full-snapshot write
             * would erase an override the moment its attribute's `overridable_attribute`, `readonly` or
             * `hidden` flag happened to be off.
             *
             * example:
             * {
             *   "unit_amount": 2499,
             *   "unit_amount_decimal": "24.99"
             * }
             */
            values: {
                [name: string]: any;
            };
            /**
             * The revision marker read from the version being written. The write is refused with
             * `WRITE_CONFLICT` if the version has been written since.
             *
             * Required rather than optional: an optional one is a guarantee every client can opt out of
             * by forgetting a field, and the write it protects is the one that overwrites somebody
             * else's edit.
             *
             * example:
             * 3
             */
            _revision: number;
            /**
             * Optional, and never applied. Accepted when it names the version being addressed — so a
             * client building its body from what it loaded need not strip it out — and refused when it
             * names another: a version's `valid_from` is its identity, and moving it is an append and a
             * delete rather than an edit.
             *
             */
            valid_from?: string;
            /**
             * Optional, and never applied: a variant's conditions are fixed when it is created. Refused
             * when they describe a different situation from the stored one.
             *
             * example:
             * {
             *   "postal_code": "46045"
             * }
             */
            conditions?: {
                [name: string]: any;
            };
        }
        export interface ResolveConditionalEntityRequest {
            schema: /**
             * Schema slug of an entity type that can be conditional — the `{slug}` of every
             * conditional-pricing route.
             *
             */
            ConditionalEntitySlug;
            /**
             * The conditional entity to resolve. Resolution is always scoped to exactly one.
             * example:
             * price-sp26d1yo
             */
            entity_id: string;
            context?: /**
             * The situation to resolve for: a flat map keyed by condition name, as the entity's schema
             * declares them. A condition left out of the map is not a wildcard — it matches only variants
             * that leave that condition unpinned.
             *
             * Each value is either an exact value, typed by its condition, or a single-operator predicate
             * object:
             *
             * - `{ "lt": v }`, `{ "lte": v }`, `{ "gt": v }`, `{ "gte": v }` — order against a `number` or
             *   `date` condition.
             * - `{ "in": [...] }` — membership, against a `string`, `select` or `number` condition.
             * - `{ "between": "2026-03-01" }` — the explicit spelling of `daterange` containment; a plain
             *   date supplied for a `daterange` condition means the same thing.
             * - `{ "exists": true }` — pinned to any value. `{ "exists": false }` says what leaving the key
             *   out says.
             *
             * Exact values are typed by their condition: a `string` or `select` matches exactly and
             * case-sensitively, with no trimming; a `location` of format `zipcode` is the postal code
             * itself, and one of format `zipcode + town` an object carrying both, whose town is compared
             * case- and whitespace-insensitively while its postal code is not.
             *
             * `default`, and any name beginning with `_`, are reserved for the server and cannot be
             * supplied here.
             *
             * example:
             * {
             *   "postal_code": "46045",
             *   "consumption": {
             *     "lt": 5000
             *   }
             * }
             */
            ResolveContext;
            /**
             * The instant the version is selected at — the version with the latest `valid_from` at or
             * before it. Defaults to now. A variant whose first version is later than this is
             * scheduled rather than applicable, and is excluded from resolution entirely.
             *
             * An RFC 3339 date (`2026-01-01`, read as midnight UTC) or date-time
             * (`2026-01-01T00:00:00Z`), to at most millisecond precision. Deliberately not declared as
             * `format: date-time`, which would reject the plain-date form that this accepts.
             *
             * example:
             * 2027-03-15T00:00:00Z
             */
            as_of?: string;
            options?: ResolveOptions;
        }
        /**
         * The situation to resolve for: a flat map keyed by condition name, as the entity's schema
         * declares them. A condition left out of the map is not a wildcard — it matches only variants
         * that leave that condition unpinned.
         *
         * Each value is either an exact value, typed by its condition, or a single-operator predicate
         * object:
         *
         * - `{ "lt": v }`, `{ "lte": v }`, `{ "gt": v }`, `{ "gte": v }` — order against a `number` or
         *   `date` condition.
         * - `{ "in": [...] }` — membership, against a `string`, `select` or `number` condition.
         * - `{ "between": "2026-03-01" }` — the explicit spelling of `daterange` containment; a plain
         *   date supplied for a `daterange` condition means the same thing.
         * - `{ "exists": true }` — pinned to any value. `{ "exists": false }` says what leaving the key
         *   out says.
         *
         * Exact values are typed by their condition: a `string` or `select` matches exactly and
         * case-sensitively, with no trimming; a `location` of format `zipcode` is the postal code
         * itself, and one of format `zipcode + town` an object carrying both, whose town is compared
         * case- and whitespace-insensitively while its postal code is not.
         *
         * `default`, and any name beginning with `_`, are reserved for the server and cannot be
         * supplied here.
         *
         * example:
         * {
         *   "postal_code": "46045",
         *   "consumption": {
         *     "lt": 5000
         *   }
         * }
         */
        export interface ResolveContext {
            [name: string]: any;
        }
        export interface ResolveOptions {
            /**
             * Ask for an unambiguous answer. Several applicable variants become `AMBIGUOUS_RESOLUTION`
             * rather than a set, and nothing applicable becomes `NOT_FOUND` rather than an empty one.
             * The response shape does not change: `results` simply carries exactly one entry.
             *
             */
            resolve_one?: boolean;
        }
        /**
         * The entity as this variant leaves it — every attribute of a plain entity read, with the
         * applicable version's overrides applied — plus the discriminators saying where the numbers
         * came from.
         *
         */
        export interface ResolvedVariant {
            [name: string]: any;
            /**
             * The logical entity's id — the same one a plain entity read returns. Resolution never
             * mints a new identity; a variant is a set of values for *this* entity, not another one.
             *
             * example:
             * price-sp26d1yo
             */
            _id: string;
            /**
             * The variant these values came from. Durable: this is what an order or a contract pins to
             * read the same numbers back later.
             *
             * example:
             * var-46045
             */
            _variant_id: string;
            /**
             * The `valid_from` of the version applied for the requested `as_of`.
             * example:
             * 2027-01-01T00:00:00.000Z
             */
            _version_valid_from: string;
            /**
             * The conditions this variant pins, plus the boolean `default` discriminator.
             *
             * Underscore-prefixed, like every other discriminator here, so that it cannot collide with
             * an attribute an organization happens to have called `conditions`.
             *
             * example:
             * {
             *   "postal_code": "46045",
             *   "default": false
             * }
             */
            _conditions: {
                [name: string]: any;
                default: boolean;
            };
        }
        export interface ResolvedVariants {
            /**
             * One composed payload per applicable variant, capped at 100 — a context selecting more
             * than that is answered with `TOO_MANY_MATCHES` instead, since each result costs its own
             * version lookup. No dominance or specificity ordering is applied between them.
             *
             */
            results: /**
             * The entity as this variant leaves it — every attribute of a plain entity read, with the
             * applicable version's overrides applied — plus the discriminators saying where the numbers
             * came from.
             *
             */
            ResolvedVariant[];
        }
        export type SalesTax = "nontaxable" | "reduced" | "standard";
        export type SaveIntegrationCredentialsParams = /* The auth credentials for external integrations */ IntegrationAuthCredentials;
        export interface SearchExternalCatalogParams {
            context: JourneyContext;
        }
        export interface SearchExternalCatalogRecommendationsResult {
            source: /* An external product & price information (already computed) from an external catalog. */ ExternalCatalogItem;
            offers: /* An external product & price information (already computed) from an external catalog. */ ExternalCatalogItem[];
        }
        export interface SearchExternalCatalogResult {
            /**
             * The number of results returned.
             */
            hits: number;
            results: /* An external product & price information (already computed) from an external catalog. */ ExternalCatalogItem[];
        }
        /**
         * A search providers payload
         */
        export interface SearchProvidersParams {
            /**
             * The provider type (power or gas)
             */
            type: "power" | "gas";
            /**
             * The postal code to search for providers
             */
            postal_code: string;
            /**
             * The city to search for providers
             */
            city?: string | null;
            /**
             * The street to search for providers
             */
            street?: string | null;
            /**
             * The street number to search for providers
             */
            street_number?: string | null;
        }
        /**
         * The search providers payload
         */
        export type SearchProvidersResult = /* The provider entity */ Provider[];
        /**
         * A search streets payload
         */
        export interface SearchStreetsParams {
            /**
             * The postal code to search for providers
             */
            postal_code: string;
            /**
             * The city to search for providers
             */
            city: string | null;
        }
        /**
         * The search providers payload
         */
        export type SearchStreetsResult = /* The street entity */ Street[];
        /**
         * Signature meta data payload
         */
        export interface SignatureMeta {
            /**
             * The signature hash of the payload
             */
            signature: string;
            /**
             * Timestamp of the signature
             */
            timestamp: number;
        }
        /**
         * The bidding zone for a spot market price.
         */
        export type SpotMarketBiddingZone = "AT" | "DE-LU";
        /**
         * The aggregation frequency for a series of spot market price data.
         */
        export type SpotMarketDataFrequency = "PT15M" | "PT1H" | "P1D" | "P1M";
        /**
         * The market for a spot market price.
         */
        export type SpotMarketType = "day_ahead";
        /**
         * The street entity
         */
        export interface Street {
            /**
             * The street name
             */
            street: string;
        }
        export type TariffTypeGetAg = "HT" | "NT";
        /**
         * the tax configuration
         * example:
         * {
         *   "rate": 19,
         *   "_title": "Tax Standard",
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "type": "VAT",
         *   "description": "Tax description",
         *   "active": true,
         *   "region": "DE",
         *   "region_label": "Germany",
         *   "_org": "123",
         *   "_schema": "tax",
         *   "_tags": [
         *     "example",
         *     "mock"
         *   ],
         *   "_created_at": "2021-02-09T12:41:43.662Z",
         *   "_updated_at": "2021-02-09T12:41:43.662Z"
         * }
         */
        export interface Tax {
            [name: string]: any;
            _id: EntityId /* uuid */;
            /**
             * Title of entity
             */
            _title: string;
            /**
             * Organization Id the entity belongs to
             */
            _org: string;
            _schema: string;
            _tags?: string[];
            _created_at: string; // date-time
            _updated_at: string; // date-time
            type: "VAT" | "GST" | "Custom";
            description?: string;
            rate: number | null;
            active?: boolean;
            region?: string;
            region_label?: string;
        }
        /**
         * A tax amount associated with a specific tax rate.
         */
        export interface TaxAmount {
            /**
             * The tax amount.
             */
            amount?: number;
            /**
             * The tax rate applied. With the release of the tax management feature this field is being deprecated in favor of the tax field.
             */
            rate?: string;
            /**
             * The tax rate value applied (represented as an integer percentage, e.g, 19 or 7).
             * With the release of the tax management feature this field is being deprecated in favor of the tax field.
             *
             * example:
             * 19
             */
            rateValue?: number;
            /**
             * The tax applied.
             */
            tax?: /* The tax applied. */ /**
             * the tax configuration
             * example:
             * {
             *   "rate": 19,
             *   "_title": "Tax Standard",
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "type": "VAT",
             *   "description": "Tax description",
             *   "active": true,
             *   "region": "DE",
             *   "region_label": "Germany",
             *   "_org": "123",
             *   "_schema": "tax",
             *   "_tags": [
             *     "example",
             *     "mock"
             *   ],
             *   "_created_at": "2021-02-09T12:41:43.662Z",
             *   "_updated_at": "2021-02-09T12:41:43.662Z"
             * }
             */
            Tax | /**
             * A minimal, ad-hoc tax rate for line items with no backing tax entity
             * in the catalog (e.g. a fully custom/composite price component built
             * by a client with no product/price reference to resolve tax from).
             * Mirrors how PriceItem relates to Price: unlike Tax, this has no
             * entity identity — it isn't persisted and can't be looked up by _id,
             * so it can't be shared/reused across price items the way a catalog
             * Tax can.
             *
             * example:
             * {
             *   "rate": 19,
             *   "type": "VAT",
             *   "description": "Custom 19% VAT"
             * }
             */
            TaxItem;
        }
        /**
         * A tax amount associated with a specific tax rate.
         */
        export interface TaxAmountBreakdown {
            /**
             * The tax amount.
             */
            amount?: number;
            /**
             * The tax rate applied. With the release of the tax manager feature this field is being deprecated in favor of the tax field.
             */
            rate?: string;
            /**
             * The tax rate value applied. With the release of the tax manager feature this field is being deprecated in favor of the tax field.
             */
            rateValue?: number;
            tax?: TaxBreakdownInfo;
        }
        /**
         * A valid tax rate from a client.
         */
        export interface TaxAmountDto {
            /**
             * The deprecated tax rate applied.
             * This field has been deprecated in favor of the new Tax Management. You should use the new tax fields pointing to a proper tax entity.
             *
             */
            rate?: string;
            tax?: /**
             * the tax configuration
             * example:
             * {
             *   "rate": 19,
             *   "_title": "Tax Standard",
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "type": "VAT",
             *   "description": "Tax description",
             *   "active": true,
             *   "region": "DE",
             *   "region_label": "Germany",
             *   "_org": "123",
             *   "_schema": "tax",
             *   "_tags": [
             *     "example",
             *     "mock"
             *   ],
             *   "_created_at": "2021-02-09T12:41:43.662Z",
             *   "_updated_at": "2021-02-09T12:41:43.662Z"
             * }
             */
            Tax | /**
             * A minimal, ad-hoc tax rate for line items with no backing tax entity
             * in the catalog (e.g. a fully custom/composite price component built
             * by a client with no product/price reference to resolve tax from).
             * Mirrors how PriceItem relates to Price: unlike Tax, this has no
             * entity identity — it isn't persisted and can't be looked up by _id,
             * so it can't be shared/reused across price items the way a catalog
             * Tax can.
             *
             * example:
             * {
             *   "rate": 19,
             *   "type": "VAT",
             *   "description": "Custom 19% VAT"
             * }
             */
            TaxItem;
        }
        export interface TaxBreakdownInfo {
            rate?: number | null;
            type?: "VAT" | "GST" | "Custom";
            _id?: string;
        }
        /**
         * A minimal, ad-hoc tax rate for line items with no backing tax entity
         * in the catalog (e.g. a fully custom/composite price component built
         * by a client with no product/price reference to resolve tax from).
         * Mirrors how PriceItem relates to Price: unlike Tax, this has no
         * entity identity — it isn't persisted and can't be looked up by _id,
         * so it can't be shared/reused across price items the way a catalog
         * Tax can.
         *
         * example:
         * {
         *   "rate": 19,
         *   "type": "VAT",
         *   "description": "Custom 19% VAT"
         * }
         */
        export interface TaxItem {
            type: "VAT" | "GST" | "Custom";
            rate: number | null;
            description?: string;
        }
        export interface TierDetails {
            quantity: number;
            unit_amount: number;
            unit_amount_gross: number;
            unit_amount_net: number;
            amount_total: number;
            amount_subtotal: number;
            amount_tax: number;
            unit_amount_decimal: string;
        }
        /**
         * The total details with tax (and discount) aggregated totals.
         */
        export interface TotalDetails {
            /**
             * This is the sum of all the price item shipping amounts.
             */
            amount_shipping?: number;
            /**
             * This is the sum of all the price item tax amounts.
             */
            amount_tax?: number;
            /**
             * Breakdown of individual tax (and discount) amounts that add up to the totals.
             */
            breakdown?: {
                /**
                 * The aggregated price items tax amount per rate.
                 */
                taxes?: (/* A tax amount associated with a specific tax rate. */ TaxAmountBreakdown)[];
                /**
                 * The aggregated price items tax amount per rate.
                 */
                recurrences?: (/* An amount associated with a specific recurrence. */ RecurrenceAmount)[];
                /**
                 * The list of cashbacks applied.
                 */
                cashbacks?: (/* A detail associated with a specific cashback. */ CashbackAmount)[];
                /**
                 * The aggregated price items recurrences by tax rate
                 */
                recurrencesByTax?: (/* An amount associated with a specific recurrence. */ RecurrenceAmountWithTax)[];
            };
        }
        export type TypeGetAg = "base_price" | "work_price";
        /**
         * The availability rule error
         */
        export interface ValidateAvailabilityFileError {
            /**
             * The line number where the error was found
             */
            line?: number;
            /**
             * The error message
             */
            msg: string;
            /**
             * Data related to the error
             */
            data?: string;
        }
        /**
         * The availability map file result payload
         * example:
         * {
         *   "status": "success",
         *   "rules_parsed_count": 10,
         *   "errors": []
         * }
         */
        export interface ValidateAvailabilityFileResult {
            /**
             * The status of the validation
             */
            status: "success" | "error";
            /**
             * The number of rules successfully parsed
             */
            rules_parsed_count: number;
            /**
             * The errors found on the file
             */
            errors: /* The availability rule error */ ValidateAvailabilityFileError[];
        }
        /**
         * A variant's pinned conditions as a reader sees them: the pins the schema declares, plus a
         * boolean `default` saying whether this is the entity's fallback.
         *
         * `default` is always present and always a boolean, so a client can branch on "did I get the
         * fallback?" without knowing how one is stored. The reserved condition a fallback is actually
         * pinned under never appears here.
         *
         * example:
         * {
         *   "postal_code": "46045",
         *   "default": false
         * }
         */
        export interface VariantConditions {
            [name: string]: any;
            default: boolean;
        }
        /**
         * The attribute values this version overrides on the base entity, keyed by attribute name.
         *
         * Only attributes currently declaring `overridable_attribute` are applied. Metadata fields
         * (anything underscore-prefixed), readonly attributes, hidden attributes and non-overridable
         * attributes present here are ignored rather than rejected, so a client working from a slightly
         * stale schema snapshot still succeeds instead of failing on fields it could not have known to
         * drop. An attribute's `render_condition` says when to show it and has no bearing on whether a
         * variant may override it.
         *
         * Ignored means *not updated*, never *removed*: a value already stored for an attribute that is
         * not currently overridable is preserved, so removing and restoring the flag deactivates and
         * then reactivates the same override.
         *
         * A composite price's `price_components` is an ordinary overridable relation attribute: a
         * composite variant pins its component variants here the same way any other relation value is
         * set, with no special handling.
         *
         * example:
         * {
         *   "unit_amount": 2499,
         *   "unit_amount_decimal": "24.99"
         * }
         */
        export interface VariantValues {
            [name: string]: any;
        }
        /**
         * One version of one variant: the attribute overrides it carries, the instant it takes effect,
         * and the variant it belongs to.
         *
         * These are the version's **own** overrides, not the base entity overlaid with them — this is
         * what an editing screen loads and saves, and what it edits is the overrides. Composing them onto
         * the entity is what `:resolve` answers.
         *
         */
        export interface VariantVersion {
            /**
             * example:
             * var-46045
             */
            variant_id: string;
            /**
             * example:
             * price-sp26d1yo
             */
            entity_id: string;
            schema: /**
             * Schema slug of an entity type that can be conditional — the `{slug}` of every
             * conditional-pricing route.
             *
             */
            ConditionalEntitySlug;
            /**
             * The situation the variant applies to, plus the boolean `default` discriminator. A property
             * of the variant rather than of this version: every version of a variant carries the same
             * one, and no version write can change it.
             *
             * example:
             * {
             *   "postal_code": "46045",
             *   "default": false
             * }
             */
            conditions: {
                [name: string]: any;
                default: boolean;
            };
            /**
             * When this version takes effect, canonicalized to millisecond-precision UTC. A version's
             * identity within its variant — it never moves.
             *
             * example:
             * 2027-01-01T00:00:00.000Z
             */
            valid_from: string;
            values: /**
             * The attribute values this version overrides on the base entity, keyed by attribute name.
             *
             * Only attributes currently declaring `overridable_attribute` are applied. Metadata fields
             * (anything underscore-prefixed), readonly attributes, hidden attributes and non-overridable
             * attributes present here are ignored rather than rejected, so a client working from a slightly
             * stale schema snapshot still succeeds instead of failing on fields it could not have known to
             * drop. An attribute's `render_condition` says when to show it and has no bearing on whether a
             * variant may override it.
             *
             * Ignored means *not updated*, never *removed*: a value already stored for an attribute that is
             * not currently overridable is preserved, so removing and restoring the flag deactivates and
             * then reactivates the same override.
             *
             * A composite price's `price_components` is an ordinary overridable relation attribute: a
             * composite variant pins its component variants here the same way any other relation value is
             * set, with no special handling.
             *
             * example:
             * {
             *   "unit_amount": 2499,
             *   "unit_amount_decimal": "24.99"
             * }
             */
            VariantValues;
            /**
             * When this version was created.
             */
            _created_at: string;
            /**
             * When this version was last written.
             */
            _updated_at: string;
            /**
             * The revision a write to this version must carry to be accepted. Always current: every read
             * that returns one is strongly consistent, so it is never a marker a write would be refused
             * for having read too early.
             *
             * example:
             * 3
             */
            _revision: number;
        }
        export interface VariantWriteWarning {
            /**
             * - `VARIANT_COUNT_APPROACHING_CAP`: this entity is nearing the number of variants it may
             *   hold. Surfaced rather than rejected, so an importer finds out with a whole run's notice
             *   instead of discovering the limit halfway through a refresh.
             *
             */
            code: "VARIANT_COUNT_APPROACHING_CAP";
            message: string;
            /**
             * Variants this entity holds, including the one just created.
             */
            variant_count: number;
            /**
             * Variants this entity may hold. Configurable per organization.
             */
            cap: number;
        }
        /**
         * Something a version write moved. A version write is never refused for being late — backdating a
         * version, and editing or deleting one that has already been superseded, are both accepted — so
         * what a caller gets instead is a warning naming exactly what changed. One write can carry both
         * codes.
         *
         */
        export interface VersionWriteWarning {
            /**
             * - `ACTIVE_VERSION_REPLACED`: what resolves **now** changed, other than by a newer version
             *   taking effect. The version in effect was written behind, or removed.
             * - `SUPERSEDED_VERSION_WRITTEN`: what a past-dated (`as_of`) read returns changed. The write
             *   landed on, or created, a version that is not the one currently in effect.
             *
             */
            code: "ACTIVE_VERSION_REPLACED" | "SUPERSEDED_VERSION_WRITTEN";
            message: string;
            /**
             * The version this write created, changed or removed.
             * example:
             * 2026-08-01T00:00:00.000Z
             */
            valid_from: string;
            /**
             * The version in effect when the write landed, before it did. Absent when the variant had
             * none — every version of it still scheduled.
             *
             * example:
             * 2026-01-01T00:00:00.000Z
             */
            active_valid_from?: string;
        }
        /**
         * A version as a write left it, together with anything the write moved.
         *
         */
        export interface WrittenVariantVersion {
            /**
             * example:
             * var-46045
             */
            variant_id: string;
            /**
             * example:
             * price-sp26d1yo
             */
            entity_id: string;
            schema: /**
             * Schema slug of an entity type that can be conditional — the `{slug}` of every
             * conditional-pricing route.
             *
             */
            ConditionalEntitySlug;
            /**
             * The situation the variant applies to, plus the boolean `default` discriminator. A property
             * of the variant rather than of this version: every version of a variant carries the same
             * one, and no version write can change it.
             *
             * example:
             * {
             *   "postal_code": "46045",
             *   "default": false
             * }
             */
            conditions: {
                [name: string]: any;
                default: boolean;
            };
            /**
             * When this version takes effect, canonicalized to millisecond-precision UTC. A version's
             * identity within its variant — it never moves.
             *
             * example:
             * 2027-01-01T00:00:00.000Z
             */
            valid_from: string;
            values: /**
             * The attribute values this version overrides on the base entity, keyed by attribute name.
             *
             * Only attributes currently declaring `overridable_attribute` are applied. Metadata fields
             * (anything underscore-prefixed), readonly attributes, hidden attributes and non-overridable
             * attributes present here are ignored rather than rejected, so a client working from a slightly
             * stale schema snapshot still succeeds instead of failing on fields it could not have known to
             * drop. An attribute's `render_condition` says when to show it and has no bearing on whether a
             * variant may override it.
             *
             * Ignored means *not updated*, never *removed*: a value already stored for an attribute that is
             * not currently overridable is preserved, so removing and restoring the flag deactivates and
             * then reactivates the same override.
             *
             * A composite price's `price_components` is an ordinary overridable relation attribute: a
             * composite variant pins its component variants here the same way any other relation value is
             * set, with no special handling.
             *
             * example:
             * {
             *   "unit_amount": 2499,
             *   "unit_amount_decimal": "24.99"
             * }
             */
            VariantValues;
            /**
             * When this version was created.
             */
            _created_at: string;
            /**
             * When this version was last written.
             */
            _updated_at: string;
            /**
             * The revision a write to this version must carry to be accepted. Always current: every read
             * that returns one is strongly consistent, so it is never a marker a write would be refused
             * for having read too early.
             *
             * example:
             * 3
             */
            _revision: number;
            /**
             * What this write moved, if anything. Empty in the ordinary case — a client reads its
             * length rather than branching on its absence.
             *
             */
            warnings: /**
             * Something a version write moved. A version write is never refused for being late — backdating a
             * version, and editing or deleting one that has already been superseded, are both accepted — so
             * what a caller gets instead is a warning naming exactly what changed. One write can carry both
             * codes.
             *
             */
            VersionWriteWarning[];
        }
    }
}
declare namespace Paths {
    namespace $AppendConditionalVariantVersion {
        namespace Parameters {
            export type EntityId = string;
            export type Slug = /**
             * Schema slug of an entity type that can be conditional — the `{slug}` of every
             * conditional-pricing route.
             *
             */
            Components.Schemas.ConditionalEntitySlug;
            export type VariantId = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
            variant_id: Parameters.VariantId;
        }
        export type RequestBody = Components.Schemas.AppendVersionRequest;
        namespace Responses {
            export type $201 = /**
             * A version as a write left it, together with anything the write moved.
             *
             */
            Components.Schemas.WrittenVariantVersion;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $AvailabilityCheck {
        export interface HeaderParameters {
            "X-Ivy-Org-ID": Parameters.XIvyOrgID;
        }
        namespace Parameters {
            export type XIvyOrgID = string;
        }
        export type RequestBody = /* Availability check request payload */ Components.Schemas.AvailabilityCheckParams;
        namespace Responses {
            export type $200 = /**
             * The product availability check result payload
             * example:
             * {
             *   "available_products": [],
             *   "check_results": [
             *     {
             *       "product_id": "my-product-id-123-1",
             *       "matching_hits": 0
             *     },
             *     {
             *       "product_id": "my-product-id-123-2",
             *       "matching_hits": 0
             *     }
             *   ]
             * }
             */
            Components.Schemas.AvailabilityResult;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace $AverageMarketPrice {
        namespace Parameters {
            export type BiddingZone = /* The bidding zone for a spot market price. */ Components.Schemas.SpotMarketBiddingZone;
            export type From = string /* date */ | string /* date-time */;
            export type Market = /* The market for a spot market price. */ Components.Schemas.SpotMarketType;
            export type To = string /* date */ | string /* date-time */;
        }
        export interface QueryParameters {
            market: Parameters.Market;
            bidding_zone: Parameters.BiddingZone;
            from: Parameters.From;
            to: Parameters.To;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AverageMarketPriceResult;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace $CalculatePricingDetails {
        export interface RequestBody {
            line_items?: /* A valid set of product prices, quantities, (discounts) and taxes from a client. */ Components.Schemas.PriceItemsDto;
            redeemed_promos?: Components.Schemas.RedeemedPromo[];
        }
        namespace Responses {
            export type $200 = /* The result from the calculation of a set of price items. */ Components.Schemas.PricingDetailsResponse;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace $CheckoutCart {
        export interface HeaderParameters {
            "X-Ivy-Org-ID": Parameters.XIvyOrgID;
        }
        namespace Parameters {
            export type XIvyOrgID = string;
        }
        export type RequestBody = /* The cart checkout request payload */ Components.Schemas.CheckoutCart;
        namespace Responses {
            export type $200 = /* The cart checkout result */ Components.Schemas.CheckoutCartResult;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace $ComputePrice {
        export interface HeaderParameters {
            "X-Epilot-Org-ID": Parameters.XEpilotOrgID;
        }
        namespace Parameters {
            export type IntegrationId = Components.Schemas.IntegrationId;
            export type XEpilotOrgID = string;
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId;
        }
        export type RequestBody = /* The compute price payload */ Components.Schemas.ComputePriceParams;
        namespace Responses {
            export type $200 = Components.Schemas.ComputePriceResult;
            export type $400 = Components.Schemas.Error;
            export type $403 = Components.Schemas.Error;
        }
    }
    namespace $CreateConditionalVariant {
        namespace Parameters {
            export type EntityId = string;
            export type Slug = /**
             * Schema slug of an entity type that can be conditional — the `{slug}` of every
             * conditional-pricing route.
             *
             */
            Components.Schemas.ConditionalEntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
        }
        export type RequestBody = Components.Schemas.CreateVariantRequest;
        namespace Responses {
            export type $201 = Components.Schemas.CreatedVariant;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $DeleteConditionalVariant {
        namespace Parameters {
            export type EntityId = string;
            export type Slug = /**
             * Schema slug of an entity type that can be conditional — the `{slug}` of every
             * conditional-pricing route.
             *
             */
            Components.Schemas.ConditionalEntitySlug;
            export type VariantId = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
            variant_id: Parameters.VariantId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DeletedVariant;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $DeleteConditionalVariantVersion {
        namespace Parameters {
            export type EntityId = string;
            export type Revision = number;
            export type Slug = /**
             * Schema slug of an entity type that can be conditional — the `{slug}` of every
             * conditional-pricing route.
             *
             */
            Components.Schemas.ConditionalEntitySlug;
            export type ValidFrom = string;
            export type VariantId = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
            variant_id: Parameters.VariantId;
            valid_from: Parameters.ValidFrom;
        }
        export interface QueryParameters {
            _revision: Parameters.Revision;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DeletedVariantVersion;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $DeleteCredentials {
        namespace Parameters {
            export type IntegrationId = Components.Schemas.IntegrationId;
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace $GetActiveConditionalVariantVersion {
        namespace Parameters {
            export type EntityId = string;
            export type Slug = /**
             * Schema slug of an entity type that can be conditional — the `{slug}` of every
             * conditional-pricing route.
             *
             */
            Components.Schemas.ConditionalEntitySlug;
            export type VariantId = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
            variant_id: Parameters.VariantId;
        }
        namespace Responses {
            export type $200 = /**
             * One version of one variant: the attribute overrides it carries, the instant it takes effect,
             * and the variant it belongs to.
             *
             * These are the version's **own** overrides, not the base entity overlaid with them — this is
             * what an editing screen loads and saves, and what it edits is the overrides. Composing them onto
             * the entity is what `:resolve` answers.
             *
             */
            Components.Schemas.VariantVersion;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $GetConditionSets {
        namespace Parameters {
            export type Slug = /**
             * Schema slug of an entity type that can be conditional — the `{slug}` of every
             * conditional-pricing route.
             *
             */
            Components.Schemas.ConditionalEntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ConditionSetCatalog;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace $GetConditionalVariantVersion {
        namespace Parameters {
            export type EntityId = string;
            export type Slug = /**
             * Schema slug of an entity type that can be conditional — the `{slug}` of every
             * conditional-pricing route.
             *
             */
            Components.Schemas.ConditionalEntitySlug;
            export type ValidFrom = string;
            export type VariantId = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
            variant_id: Parameters.VariantId;
            valid_from: Parameters.ValidFrom;
        }
        namespace Responses {
            export type $200 = /**
             * One version of one variant: the attribute overrides it carries, the instant it takes effect,
             * and the variant it belongs to.
             *
             * These are the version's **own** overrides, not the base entity overlaid with them — this is
             * what an editing screen loads and saves, and what it edits is the overrides. Composing them onto
             * the entity is what `:resolve` answers.
             *
             */
            Components.Schemas.VariantVersion;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $GetCredentials {
        namespace Parameters {
            export type IntegrationId = Components.Schemas.IntegrationId;
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.IntegrationCredentialsResult;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace $GetExternalCatalogProductRecommendations {
        export interface HeaderParameters {
            "x-epilot-org-id"?: Parameters.XEpilotOrgId;
        }
        namespace Parameters {
            export type XEpilotOrgId = string;
        }
        export type RequestBody = /**
         * The request payload for the external catalog service.
         * example:
         * {
         *   "config": {
         *     "appId": "1234567890",
         *     "componentId": "1234567890",
         *     "hookId": "1234567890"
         *   },
         *   "origin": "journey",
         *   "context": {
         *     "journey_id": "8d0a2235-97ce-42d0-88a3-e374634ca44e",
         *     "entity_id": "9e1b3346-a8df-53e1-99b4-f485745db55f",
         *     "journey_name": "Product Selection Journey",
         *     "journey_tags": [
         *       "electricity",
         *       "residential"
         *     ],
         *     "journey_url_params": {
         *       "utm_source": "google",
         *       "utm_campaign": "spring2024"
         *     },
         *     "current_step_name": "Product Selection",
         *     "current_block_name": "Energy Products",
         *     "steps_data": [
         *       {
         *         "step_name": "Address Information",
         *         "step_index": 0,
         *         "blocks": {
         *           "Adresse": {
         *             "countryCode": "DE",
         *             "city": "Koblenz",
         *             "zipCode": "56068",
         *             "streetName": "Am Alten Hospital",
         *             "houseNumber": "123"
         *           }
         *         }
         *       }
         *     ]
         *   }
         * }
         */
        Components.Schemas.ExternalCatalogRequest;
        namespace Responses {
            export type $200 = Components.Schemas.SearchExternalCatalogRecommendationsResult;
            export type $400 = Components.Schemas.Error;
            export type $403 = Components.Schemas.Error;
        }
    }
    namespace $GetExternalCatalogProducts {
        export interface HeaderParameters {
            "x-epilot-org-id"?: Parameters.XEpilotOrgId;
        }
        namespace Parameters {
            export type XEpilotOrgId = string;
        }
        export type RequestBody = /**
         * The request payload for the external catalog service.
         * example:
         * {
         *   "config": {
         *     "appId": "1234567890",
         *     "componentId": "1234567890",
         *     "hookId": "1234567890"
         *   },
         *   "origin": "journey",
         *   "context": {
         *     "journey_id": "8d0a2235-97ce-42d0-88a3-e374634ca44e",
         *     "entity_id": "9e1b3346-a8df-53e1-99b4-f485745db55f",
         *     "journey_name": "Product Selection Journey",
         *     "journey_tags": [
         *       "electricity",
         *       "residential"
         *     ],
         *     "journey_url_params": {
         *       "utm_source": "google",
         *       "utm_campaign": "spring2024"
         *     },
         *     "current_step_name": "Product Selection",
         *     "current_block_name": "Energy Products",
         *     "steps_data": [
         *       {
         *         "step_name": "Address Information",
         *         "step_index": 0,
         *         "blocks": {
         *           "Adresse": {
         *             "countryCode": "DE",
         *             "city": "Koblenz",
         *             "zipCode": "56068",
         *             "streetName": "Am Alten Hospital",
         *             "houseNumber": "123"
         *           }
         *         }
         *       }
         *     ]
         *   }
         * }
         */
        Components.Schemas.ExternalCatalogRequest;
        namespace Responses {
            export type $200 = Components.Schemas.SearchExternalCatalogResult;
            export type $400 = Components.Schemas.Error;
            export type $403 = Components.Schemas.Error;
        }
    }
    namespace $HistoricMarketPrices {
        namespace Parameters {
            export type BiddingZone = /* The bidding zone for a spot market price. */ Components.Schemas.SpotMarketBiddingZone;
            export type Frequency = /* The aggregation frequency for a series of spot market price data. */ Components.Schemas.SpotMarketDataFrequency;
            export type From = string /* date */ | string /* date-time */;
            export type Market = /* The market for a spot market price. */ Components.Schemas.SpotMarketType;
            export type To = string /* date */ | string /* date-time */;
        }
        export interface QueryParameters {
            market: Parameters.Market;
            bidding_zone: Parameters.BiddingZone;
            frequency: Parameters.Frequency;
            from: Parameters.From;
            to: Parameters.To;
        }
        namespace Responses {
            export type $200 = Components.Schemas.HistoricMarketPricesResult;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace $PatchActiveConditionalVariantVersion {
        namespace Parameters {
            export type EntityId = string;
            export type Slug = /**
             * Schema slug of an entity type that can be conditional — the `{slug}` of every
             * conditional-pricing route.
             *
             */
            Components.Schemas.ConditionalEntitySlug;
            export type VariantId = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
            variant_id: Parameters.VariantId;
        }
        export type RequestBody = Components.Schemas.PatchVersionRequest;
        namespace Responses {
            export type $200 = /**
             * A version as a write left it, together with anything the write moved.
             *
             */
            Components.Schemas.WrittenVariantVersion;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $PatchConditionalVariantVersion {
        namespace Parameters {
            export type EntityId = string;
            export type Slug = /**
             * Schema slug of an entity type that can be conditional — the `{slug}` of every
             * conditional-pricing route.
             *
             */
            Components.Schemas.ConditionalEntitySlug;
            export type ValidFrom = string;
            export type VariantId = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
            variant_id: Parameters.VariantId;
            valid_from: Parameters.ValidFrom;
        }
        export type RequestBody = Components.Schemas.PatchVersionRequest;
        namespace Responses {
            export type $200 = /**
             * A version as a write left it, together with anything the write moved.
             *
             */
            Components.Schemas.WrittenVariantVersion;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $PrivateSearchCatalog {
        export type RequestBody = /**
         * A catalog search payload
         * example:
         * {
         *   "q": "_id:1233432 OR _id:123432454 OR _id:23445433",
         *   "sort": "description ASC",
         *   "from": 0,
         *   "size": 200
         * }
         */
        Components.Schemas.CatalogSearch;
        namespace Responses {
            export type $200 = /**
             * The query result payload
             * example:
             * {
             *   "hits": 2,
             *   "results": [
             *     {
             *       "schema": "product",
             *       "description": "product a"
             *     },
             *     {
             *       "schema": "price",
             *       "unit_amount_decimal": "124.342343434"
             *     }
             *   ]
             * }
             */
            Components.Schemas.CatalogSearchResult;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace $ProductRecommendations {
        export interface HeaderParameters {
            "X-Ivy-Org-ID"?: Parameters.XIvyOrgID;
        }
        namespace Parameters {
            export type XIvyOrgID = string;
        }
        export type RequestBody = /* Product recommendations request payload */ Components.Schemas.ProductRecommendationSearch;
        namespace Responses {
            export type $200 = /* Product recommendations request payload */ Components.Schemas.ProductRecommendationResponse;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace $ReplaceActiveConditionalVariantVersion {
        namespace Parameters {
            export type EntityId = string;
            export type Slug = /**
             * Schema slug of an entity type that can be conditional — the `{slug}` of every
             * conditional-pricing route.
             *
             */
            Components.Schemas.ConditionalEntitySlug;
            export type VariantId = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
            variant_id: Parameters.VariantId;
        }
        export type RequestBody = Components.Schemas.ReplaceVersionRequest;
        namespace Responses {
            export type $200 = /**
             * A version as a write left it, together with anything the write moved.
             *
             */
            Components.Schemas.WrittenVariantVersion;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $ReplaceConditionalVariantVersion {
        namespace Parameters {
            export type EntityId = string;
            export type Slug = /**
             * Schema slug of an entity type that can be conditional — the `{slug}` of every
             * conditional-pricing route.
             *
             */
            Components.Schemas.ConditionalEntitySlug;
            export type ValidFrom = string;
            export type VariantId = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
            variant_id: Parameters.VariantId;
            valid_from: Parameters.ValidFrom;
        }
        export type RequestBody = Components.Schemas.ReplaceVersionRequest;
        namespace Responses {
            export type $200 = /**
             * A version as a write left it, together with anything the write moved.
             *
             */
            Components.Schemas.WrittenVariantVersion;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $ResolveConditionalEntity {
        export type RequestBody = Components.Schemas.ResolveConditionalEntityRequest;
        namespace Responses {
            export type $200 = Components.Schemas.ResolvedVariants;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a machine-readable `code`
             * from the conditional-pricing vocabulary plus any structured data about the failure,
             * so a client can branch on the kind of failure rather than parse the message.
             * Referenced only by the operations that emit these codes; every other operation
             * keeps the plain `Error` shape.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $SaveCredentials {
        namespace Parameters {
            export type IntegrationId = Components.Schemas.IntegrationId;
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId;
        }
        export type RequestBody = Components.Schemas.SaveIntegrationCredentialsParams;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace $SearchCatalog {
        export interface HeaderParameters {
            "X-Ivy-Org-ID"?: Parameters.XIvyOrgID;
            Authorization?: Parameters.Authorization;
        }
        namespace Parameters {
            export type Authorization = string;
            export type XIvyOrgID = string;
        }
        export type RequestBody = /**
         * A catalog search payload
         * example:
         * {
         *   "q": "_id:1233432 OR _id:123432454 OR _id:23445433",
         *   "sort": "description ASC",
         *   "from": 0,
         *   "size": 200
         * }
         */
        Components.Schemas.CatalogSearch;
        namespace Responses {
            export type $200 = /**
             * The query result payload
             * example:
             * {
             *   "hits": 2,
             *   "results": [
             *     {
             *       "schema": "product",
             *       "description": "product a"
             *     },
             *     {
             *       "schema": "price",
             *       "unit_amount_decimal": "124.342343434"
             *     }
             *   ]
             * }
             */
            Components.Schemas.CatalogSearchResult;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace $SearchExternalProductRecommendations {
        namespace Parameters {
            export type IntegrationId = Components.Schemas.IntegrationId;
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId;
        }
        export type RequestBody = Components.Schemas.SearchExternalCatalogParams;
        namespace Responses {
            export type $200 = Components.Schemas.SearchExternalCatalogRecommendationsResult;
            export type $400 = Components.Schemas.Error;
            export type $403 = Components.Schemas.Error;
        }
    }
    namespace $SearchExternalProducts {
        namespace Parameters {
            export type IntegrationId = Components.Schemas.IntegrationId;
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId;
        }
        export type RequestBody = Components.Schemas.SearchExternalCatalogParams;
        namespace Responses {
            export type $200 = Components.Schemas.SearchExternalCatalogResult;
            export type $400 = Components.Schemas.Error;
            export type $403 = Components.Schemas.Error;
        }
    }
    namespace $SearchProviders {
        export interface HeaderParameters {
            "X-Epilot-Org-ID": Parameters.XEpilotOrgID;
        }
        namespace Parameters {
            export type IntegrationId = Components.Schemas.IntegrationId;
            export type XEpilotOrgID = string;
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId;
        }
        export type RequestBody = /* A search providers payload */ Components.Schemas.SearchProvidersParams;
        namespace Responses {
            export type $200 = /* The search providers payload */ Components.Schemas.SearchProvidersResult;
            export type $400 = Components.Schemas.Error;
            export type $403 = Components.Schemas.Error;
        }
    }
    namespace $SearchStreets {
        export interface HeaderParameters {
            "X-Epilot-Org-ID": Parameters.XEpilotOrgID;
        }
        namespace Parameters {
            export type IntegrationId = Components.Schemas.IntegrationId;
            export type XEpilotOrgID = string;
        }
        export interface PathParameters {
            integrationId: Parameters.IntegrationId;
        }
        export type RequestBody = /* A search streets payload */ Components.Schemas.SearchStreetsParams;
        namespace Responses {
            export type $200 = /* The search providers payload */ Components.Schemas.SearchStreetsResult;
            export type $400 = Components.Schemas.Error;
            export type $403 = Components.Schemas.Error;
        }
    }
    namespace $ValidateAvailabilityFile {
        export interface HeaderParameters {
            "X-Epilot-Org-ID": Parameters.XEpilotOrgID;
        }
        namespace Parameters {
            export type Id = string;
            export type XEpilotOrgID = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = /**
             * The availability map file result payload
             * example:
             * {
             *   "status": "success",
             *   "rules_parsed_count": 10,
             *   "errors": []
             * }
             */
            Components.Schemas.ValidateAvailabilityFileResult;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace $ValidatePromoCodes {
        export interface HeaderParameters {
            "X-Ivy-Org-ID": Parameters.XIvyOrgID;
        }
        namespace Parameters {
            export type XIvyOrgID = string;
        }
        export interface RequestBody {
            /**
             * The list of coupon ids to unlock with promo codes
             */
            coupon_ids?: string[];
            /**
             * The list of promo codes to validate against the coupons
             */
            promo_codes?: string[];
        }
        namespace Responses {
            export type $200 = /* The result from the validation of a set of promo codes. */ Components.Schemas.PromoCodeValidationResponse;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace CreateOrder {
        export type RequestBody = /* Order Entity Payload */ Components.Schemas.OrderPayload;
        namespace Responses {
            export type $201 = /**
             * The order entity
             * example:
             * {
             *   "order_number": "OR 2022/742701",
             *   "status": "quote",
             *   "source": {
             *     "title": "manual",
             *     "href": null
             *   },
             *   "source_type": "manual",
             *   "_schema": "order",
             *   "_title": "OR 2022/742701",
             *   "expires_at": "2022-06-30T16:17:00.000Z",
             *   "line_items": [
             *     {
             *       "price_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *       "product_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *       "pricing_model": "per_unit",
             *       "is_composite_price": false,
             *       "taxes": [
             *         {
             *           "tax": {
             *             "_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc",
             *             "rate": 19,
             *             "_schema": "tax",
             *             "_org": "728",
             *             "_created_at": "2021-09-24T15:06:13.859Z",
             *             "_updated_at": "2022-04-04T17:36:15.273Z",
             *             "_title": "Tax Standard",
             *             "type": "VAT",
             *             "active": true,
             *             "region": "DE",
             *             "description": "Standard"
             *           },
             *           "amount": 255462
             *         }
             *       ],
             *       "_price": {
             *         "_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *         "unit_amount": 100000,
             *         "unit_amount_currency": "EUR",
             *         "unit_amount_decimal": "1000",
             *         "sales_tax": "standard",
             *         "is_tax_inclusive": true,
             *         "price_display_in_journeys": "show_price",
             *         "type": "one_time",
             *         "billing_period": "weekly",
             *         "billing_duration_unit": "months",
             *         "notice_time_unit": "months",
             *         "termination_time_unit": "months",
             *         "renewal_duration_unit": "months",
             *         "_schema": "price",
             *         "_title": "Solar Panel Module",
             *         "description": "Solar Panel Module",
             *         "active": true,
             *         "pricing_model": "per_unit",
             *         "is_composite_price": false,
             *         "tax": {
             *           "$relation": [
             *             {
             *               "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
             *             }
             *           ]
             *         },
             *         "_org": "728",
             *         "_created_at": "2022-06-03T16:04:10.369Z",
             *         "_updated_at": "2022-06-03T16:04:10.369Z"
             *       },
             *       "_product": {
             *         "_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *         "type": "product",
             *         "_schema": "product",
             *         "_title": "Solar Panel with Battery Storage",
             *         "name": "Solar Panel with Battery Storage",
             *         "code": "SOLAR-BATT",
             *         "active": true,
             *         "description": "Solar Panel with battery solution, optimized for max efficiency. ",
             *         "feature": [
             *           {
             *             "_tags": [],
             *             "feature": "Eco-Panels"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Remote Management Platform"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Battery Remote Control"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Mobile App"
             *           }
             *         ],
             *         "cross_sellable_products": {
             *           "$relation": [
             *             {
             *               "entity_id": "068d0713-a650-4668-9ed2-eca7be31e337",
             *               "_schema": "product",
             *               "_tags": []
             *             },
             *             {
             *               "entity_id": "c8402ee7-fba9-4f3d-bffd-6803ca655782",
             *               "_tags": []
             *             }
             *           ]
             *         },
             *         "product_images": {
             *           "$relation": [
             *             {
             *               "entity_id": "37bdeaaa-65fe-403e-9894-65b01cd277f1"
             *             },
             *             {
             *               "entity_id": "56dde657-795c-41bb-bf53-98fd586b7e6e"
             *             }
             *           ]
             *         },
             *         "product_downloads": {
             *           "$relation": [
             *             {
             *               "entity_id": "64211361-8759-414b-81c0-afbf24f83aa9"
             *             }
             *           ]
             *         },
             *         "_org": "728",
             *         "_created_at": "2022-06-03T15:52:27.512Z",
             *         "_updated_at": "2022-06-03T16:05:15.029Z",
             *         "price_options": {
             *           "$relation": [
             *             {
             *               "entity_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *               "_tags": []
             *             },
             *             {
             *               "entity_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *               "_tags": []
             *             }
             *           ]
             *         }
             *       },
             *       "quantity": 16,
             *       "currency": "EUR",
             *       "description": "Solar Panel Module",
             *       "unit_amount": 100000,
             *       "unit_amount_net": 84034,
             *       "amount_subtotal": 1344538,
             *       "amount_total": 1600000
             *     },
             *     {
             *       "price_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *       "product_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *       "pricing_model": "per_unit",
             *       "is_composite_price": false,
             *       "taxes": [
             *         {
             *           "tax": {
             *             "_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc",
             *             "rate": 19,
             *             "_schema": "tax",
             *             "_org": "728",
             *             "_created_at": "2021-09-24T15:06:13.859Z",
             *             "_updated_at": "2022-04-04T17:36:15.273Z",
             *             "_title": "Tax Standard",
             *             "type": "VAT",
             *             "active": true,
             *             "region": "DE",
             *             "description": "Standard"
             *           },
             *           "amount": 31933
             *         }
             *       ],
             *       "_price": {
             *         "_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *         "unit_amount": 50000,
             *         "unit_amount_currency": "EUR",
             *         "unit_amount_decimal": "500",
             *         "sales_tax": "standard",
             *         "is_tax_inclusive": true,
             *         "price_display_in_journeys": "show_price",
             *         "type": "one_time",
             *         "billing_period": "weekly",
             *         "billing_duration_unit": "months",
             *         "notice_time_unit": "months",
             *         "termination_time_unit": "months",
             *         "renewal_duration_unit": "months",
             *         "_schema": "price",
             *         "_title": "Battery Module 500amps",
             *         "description": "Battery Module 500amps",
             *         "active": true,
             *         "pricing_model": "per_unit",
             *         "is_composite_price": false,
             *         "tax": {
             *           "$relation": [
             *             {
             *               "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
             *             }
             *           ]
             *         },
             *         "_org": "728",
             *         "_created_at": "2022-06-03T16:05:04.391Z",
             *         "_updated_at": "2022-06-03T16:05:04.391Z"
             *       },
             *       "_product": {
             *         "_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *         "type": "product",
             *         "_schema": "product",
             *         "_title": "Solar Panel with Battery Storage",
             *         "name": "Solar Panel with Battery Storage",
             *         "code": "SOLAR-BATT",
             *         "active": true,
             *         "description": "Solar Panel with battery solution, optimized for max efficiency. ",
             *         "feature": [
             *           {
             *             "_tags": [],
             *             "feature": "Eco-Panels"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Remote Management Platform"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Battery Remote Control"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Mobile App"
             *           }
             *         ],
             *         "cross_sellable_products": {
             *           "$relation": [
             *             {
             *               "entity_id": "068d0713-a650-4668-9ed2-eca7be31e337",
             *               "_schema": "product",
             *               "_tags": []
             *             },
             *             {
             *               "entity_id": "c8402ee7-fba9-4f3d-bffd-6803ca655782",
             *               "_tags": []
             *             }
             *           ]
             *         },
             *         "product_images": {
             *           "$relation": [
             *             {
             *               "entity_id": "37bdeaaa-65fe-403e-9894-65b01cd277f1"
             *             },
             *             {
             *               "entity_id": "56dde657-795c-41bb-bf53-98fd586b7e6e"
             *             }
             *           ]
             *         },
             *         "product_downloads": {
             *           "$relation": [
             *             {
             *               "entity_id": "64211361-8759-414b-81c0-afbf24f83aa9"
             *             }
             *           ]
             *         },
             *         "_org": "728",
             *         "_created_at": "2022-06-03T15:52:27.512Z",
             *         "_updated_at": "2022-06-03T16:05:15.029Z",
             *         "price_options": {
             *           "$relation": [
             *             {
             *               "entity_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *               "_tags": []
             *             },
             *             {
             *               "entity_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *               "_tags": []
             *             }
             *           ]
             *         }
             *       },
             *       "quantity": 4,
             *       "currency": "EUR",
             *       "description": "Battery Module 500amps",
             *       "unit_amount": 50000,
             *       "unit_amount_net": 42017,
             *       "amount_subtotal": 168067,
             *       "amount_total": 200000
             *     },
             *     {
             *       "price_id": "d88a8763-3e3d-4fc7-a7a5-2bc9117148bf",
             *       "product_id": "065d6618-cc59-45f4-8e3a-700edf6813c3",
             *       "pricing_model": "per_unit",
             *       "is_composite_price": false,
             *       "_price": {
             *         "_id": "d88a8763-3e3d-4fc7-a7a5-2bc9117148bf",
             *         "unit_amount": 12055,
             *         "type": "recurring",
             *         "billing_period": "monthly",
             *         "billing_duration_amount": 8,
             *         "billing_duration_unit": "years",
             *         "notice_time_amount": 3,
             *         "notice_time_unit": "months",
             *         "termination_time_amount": 2,
             *         "termination_time_unit": "months",
             *         "renewal_duration_amount": 1,
             *         "renewal_duration_unit": "years",
             *         "active": true,
             *         "sales_tax": "reduced",
             *         "is_tax_inclusive": true,
             *         "description": "Monthly",
             *         "billing_scheme": "per_unit",
             *         "_schema": "price",
             *         "_org": "728",
             *         "_created_at": "2021-11-10T14:40:27.695Z",
             *         "_updated_at": "2021-12-14T18:16:33.248Z",
             *         "_title": "Monthly",
             *         "unit_amount_currency": "EUR",
             *         "unit_amount_decimal": "120.55456634",
             *         "pricing_model": "per_unit",
             *         "is_composite_price": false
             *       },
             *       "_product": {
             *         "_id": "065d6618-cc59-45f4-8e3a-700edf6813c3",
             *         "name": "Smartmeter: Schneider Electric PM5000 LCD Energiemessgerät / 3-phasig",
             *         "code": "1312378123",
             *         "_tags": [
             *           "wallbox",
             *           "review demo",
             *           "1"
             *         ],
             *         "categories": [
             *           "Power"
             *         ],
             *         "type": "product",
             *         "active": true,
             *         "feature": [
             *           {
             *             "_tags": [],
             *             "feature": "Bis zu 11 kW Ladeleistung (5x schneller laden)"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Integrierter MID Zähler für eine kilowattstundengenaue Abrechnung*"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Konfigurierbare Ladeleistung"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Zugangskontrolle über RFID-Karten"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Kommunikation über LAN"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "New feature"
             *           }
             *         ],
             *         "_schema": "product",
             *         "_org": "728",
             *         "_created_at": "2021-11-30T11:05:19.484Z",
             *         "_updated_at": "2022-01-13T09:18:29.944Z",
             *         "_title": "Smartmeter: Schneider Electric PM5000 LCD Energiemessgerät / 3-phasig",
             *         "price_options": {
             *           "$relation": [
             *             {
             *               "entity_id": "5264b089-fc6a-4a91-9a2a-80c673958faa"
             *             },
             *             {
             *               "entity_id": "d88a8763-3e3d-4fc7-a7a5-2bc9117148bf"
             *             }
             *           ]
             *         },
             *         "product_images": {
             *           "$relation": [
             *             {
             *               "entity_id": "16729e60-c527-44ef-93c9-c68b6acf1224"
             *             }
             *           ]
             *         }
             *       },
             *       "quantity": 1,
             *       "currency": "EUR",
             *       "description": "Monthly",
             *       "unit_amount": 12055,
             *       "unit_amount_net": 11267,
             *       "amount_subtotal": 11267,
             *       "amount_total": 12055,
             *       "taxes": [
             *         {
             *           "rate": "reduced",
             *           "amount": 789
             *         }
             *       ]
             *     },
             *     {
             *       "price_id": "e1ddf75a-d0d1-40b4-a07e-56e292867c88",
             *       "product_id": "5b9f05b7-f0f8-49c2-8a8d-0f8f923d6382",
             *       "pricing_model": "per_unit",
             *       "is_composite_price": false,
             *       "_price": {
             *         "_id": "e1ddf75a-d0d1-40b4-a07e-56e292867c88",
             *         "unit_amount": 9900,
             *         "unit_amount_currency": "EUR",
             *         "unit_amount_decimal": "99",
             *         "sales_tax": "standard",
             *         "is_tax_inclusive": true,
             *         "price_display_in_journeys": "show_price",
             *         "type": "recurring",
             *         "billing_period": "yearly",
             *         "billing_duration_unit": "months",
             *         "notice_time_unit": "months",
             *         "termination_time_unit": "months",
             *         "renewal_duration_unit": "months",
             *         "_schema": "price",
             *         "_title": "Yearly payment",
             *         "description": "Yearly payment",
             *         "active": true,
             *         "pricing_model": "per_unit",
             *         "is_composite_price": false,
             *         "_org": "728",
             *         "_created_at": "2022-02-07T22:58:39.884Z",
             *         "_updated_at": "2022-02-07T22:58:39.884Z"
             *       },
             *       "_product": {
             *         "_id": "5b9f05b7-f0f8-49c2-8a8d-0f8f923d6382",
             *         "_schema": "product",
             *         "_title": "Yearly Payment Product",
             *         "name": "Yearly Payment Product",
             *         "type": "product",
             *         "active": true,
             *         "price_options": {
             *           "$relation": [
             *             {
             *               "entity_id": "e1ddf75a-d0d1-40b4-a07e-56e292867c88",
             *               "_tags": []
             *             }
             *           ]
             *         },
             *         "_org": "728",
             *         "_created_at": "2022-02-07T22:58:44.162Z",
             *         "_updated_at": "2022-02-08T09:34:08.026Z",
             *         "description": "Hier steht die Produktbeschreibung die sich auf dem Dokument, was generiert wird, gezogen wird."
             *       },
             *       "quantity": 1,
             *       "currency": "EUR",
             *       "description": "Yearly payment",
             *       "unit_amount": 9900,
             *       "unit_amount_net": 8319,
             *       "amount_subtotal": 8319,
             *       "amount_total": 9900,
             *       "taxes": [
             *         {
             *           "rate": "standard",
             *           "amount": 1581
             *         }
             *       ]
             *     }
             *   ],
             *   "amount_subtotal": 1532191,
             *   "amount_total": 1821955,
             *   "total_details": {
             *     "amount_tax": 289764,
             *     "breakdown": {
             *       "taxes": [
             *         {
             *           "tax": {
             *             "_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc",
             *             "rate": 19,
             *             "_schema": "tax",
             *             "_org": "728",
             *             "_created_at": "2021-09-24T15:06:13.859Z",
             *             "_updated_at": "2022-04-04T17:36:15.273Z",
             *             "_title": "Tax Standard",
             *             "type": "VAT",
             *             "active": true,
             *             "region": "DE",
             *             "description": "Standard"
             *           },
             *           "amount": 287395
             *         }
             *       ],
             *       "recurrences": [
             *         {
             *           "type": "one_time",
             *           "amount_subtotal": 1512605,
             *           "amount_subtotal_decimal": "15126.05",
             *           "amount_total": 1800000,
             *           "amount_total_decimal": "18000.00",
             *           "amount_tax": 287395,
             *           "amount_tax_decimal": "2873.95"
             *         },
             *         {
             *           "type": "recurring",
             *           "billing_period": "monthly",
             *           "amount_subtotal": 11267,
             *           "amount_subtotal_decimal": "112.67",
             *           "amount_total": 12055,
             *           "amount_total_decimal": "120.55",
             *           "amount_tax": 789,
             *           "amount_tax_decimal": "7.89"
             *         },
             *         {
             *           "type": "recurring",
             *           "billing_period": "yearly",
             *           "amount_subtotal": 8319,
             *           "amount_subtotal_decimal": "83.19",
             *           "amount_total": 9900,
             *           "amount_total_decimal": "99.00",
             *           "amount_tax": 1581,
             *           "amount_tax_decimal": "15.81"
             *         }
             *       ]
             *     }
             *   },
             *   "currency": "EUR",
             *   "payment_method": [
             *     {
             *       "type": "IBAN",
             *       "details": {}
             *     }
             *   ],
             *   "billing_contact": {
             *     "$relation": [
             *       {
             *         "entity_id": "1834a54e-b68f-4f7f-a98a-fe16f11bc2a5",
             *         "_tags": []
             *       }
             *     ]
             *   },
             *   "billing_first_name": "Joao",
             *   "billing_last_name": "Pinho",
             *   "billing_email": "j.pinho@epilot.cloud",
             *   "billing_company_name": "epilot cloud",
             *   "billing_address": [
             *     {
             *       "_tags": [],
             *       "street": "Im Media Park",
             *       "street_number": "8a",
             *       "postal_code": "52000",
             *       "city": "Cologne",
             *       "country": "DE",
             *       "additional_info": ""
             *     }
             *   ],
             *   "delivery_address": [],
             *   "dates": [
             *     {
             *       "_tags": [
             *         "Instalation Date"
             *       ],
             *       "dates": "",
             *       "value": "2022-06-30T16:29:00.000Z"
             *     }
             *   ],
             *   "_id": "4c7c9562-f8f0-4af0-a3a6-6aebc5571a6e",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T16:29:46.303Z",
             *   "_updated_at": "2022-06-03T16:29:46.303Z"
             * }
             */
            Components.Schemas.Order;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace PutOrder {
        namespace Parameters {
            export type Id = Components.Schemas.EntityId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = /* Order Entity Payload */ Components.Schemas.OrderPayload;
        namespace Responses {
            export type $200 = /**
             * The order entity
             * example:
             * {
             *   "order_number": "OR 2022/742701",
             *   "status": "quote",
             *   "source": {
             *     "title": "manual",
             *     "href": null
             *   },
             *   "source_type": "manual",
             *   "_schema": "order",
             *   "_title": "OR 2022/742701",
             *   "expires_at": "2022-06-30T16:17:00.000Z",
             *   "line_items": [
             *     {
             *       "price_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *       "product_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *       "pricing_model": "per_unit",
             *       "is_composite_price": false,
             *       "taxes": [
             *         {
             *           "tax": {
             *             "_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc",
             *             "rate": 19,
             *             "_schema": "tax",
             *             "_org": "728",
             *             "_created_at": "2021-09-24T15:06:13.859Z",
             *             "_updated_at": "2022-04-04T17:36:15.273Z",
             *             "_title": "Tax Standard",
             *             "type": "VAT",
             *             "active": true,
             *             "region": "DE",
             *             "description": "Standard"
             *           },
             *           "amount": 255462
             *         }
             *       ],
             *       "_price": {
             *         "_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *         "unit_amount": 100000,
             *         "unit_amount_currency": "EUR",
             *         "unit_amount_decimal": "1000",
             *         "sales_tax": "standard",
             *         "is_tax_inclusive": true,
             *         "price_display_in_journeys": "show_price",
             *         "type": "one_time",
             *         "billing_period": "weekly",
             *         "billing_duration_unit": "months",
             *         "notice_time_unit": "months",
             *         "termination_time_unit": "months",
             *         "renewal_duration_unit": "months",
             *         "_schema": "price",
             *         "_title": "Solar Panel Module",
             *         "description": "Solar Panel Module",
             *         "active": true,
             *         "pricing_model": "per_unit",
             *         "is_composite_price": false,
             *         "tax": {
             *           "$relation": [
             *             {
             *               "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
             *             }
             *           ]
             *         },
             *         "_org": "728",
             *         "_created_at": "2022-06-03T16:04:10.369Z",
             *         "_updated_at": "2022-06-03T16:04:10.369Z"
             *       },
             *       "_product": {
             *         "_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *         "type": "product",
             *         "_schema": "product",
             *         "_title": "Solar Panel with Battery Storage",
             *         "name": "Solar Panel with Battery Storage",
             *         "code": "SOLAR-BATT",
             *         "active": true,
             *         "description": "Solar Panel with battery solution, optimized for max efficiency. ",
             *         "feature": [
             *           {
             *             "_tags": [],
             *             "feature": "Eco-Panels"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Remote Management Platform"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Battery Remote Control"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Mobile App"
             *           }
             *         ],
             *         "cross_sellable_products": {
             *           "$relation": [
             *             {
             *               "entity_id": "068d0713-a650-4668-9ed2-eca7be31e337",
             *               "_schema": "product",
             *               "_tags": []
             *             },
             *             {
             *               "entity_id": "c8402ee7-fba9-4f3d-bffd-6803ca655782",
             *               "_tags": []
             *             }
             *           ]
             *         },
             *         "product_images": {
             *           "$relation": [
             *             {
             *               "entity_id": "37bdeaaa-65fe-403e-9894-65b01cd277f1"
             *             },
             *             {
             *               "entity_id": "56dde657-795c-41bb-bf53-98fd586b7e6e"
             *             }
             *           ]
             *         },
             *         "product_downloads": {
             *           "$relation": [
             *             {
             *               "entity_id": "64211361-8759-414b-81c0-afbf24f83aa9"
             *             }
             *           ]
             *         },
             *         "_org": "728",
             *         "_created_at": "2022-06-03T15:52:27.512Z",
             *         "_updated_at": "2022-06-03T16:05:15.029Z",
             *         "price_options": {
             *           "$relation": [
             *             {
             *               "entity_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *               "_tags": []
             *             },
             *             {
             *               "entity_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *               "_tags": []
             *             }
             *           ]
             *         }
             *       },
             *       "quantity": 16,
             *       "currency": "EUR",
             *       "description": "Solar Panel Module",
             *       "unit_amount": 100000,
             *       "unit_amount_net": 84034,
             *       "amount_subtotal": 1344538,
             *       "amount_total": 1600000
             *     },
             *     {
             *       "price_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *       "product_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *       "pricing_model": "per_unit",
             *       "is_composite_price": false,
             *       "taxes": [
             *         {
             *           "tax": {
             *             "_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc",
             *             "rate": 19,
             *             "_schema": "tax",
             *             "_org": "728",
             *             "_created_at": "2021-09-24T15:06:13.859Z",
             *             "_updated_at": "2022-04-04T17:36:15.273Z",
             *             "_title": "Tax Standard",
             *             "type": "VAT",
             *             "active": true,
             *             "region": "DE",
             *             "description": "Standard"
             *           },
             *           "amount": 31933
             *         }
             *       ],
             *       "_price": {
             *         "_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *         "unit_amount": 50000,
             *         "unit_amount_currency": "EUR",
             *         "unit_amount_decimal": "500",
             *         "sales_tax": "standard",
             *         "is_tax_inclusive": true,
             *         "price_display_in_journeys": "show_price",
             *         "type": "one_time",
             *         "billing_period": "weekly",
             *         "billing_duration_unit": "months",
             *         "notice_time_unit": "months",
             *         "termination_time_unit": "months",
             *         "renewal_duration_unit": "months",
             *         "_schema": "price",
             *         "_title": "Battery Module 500amps",
             *         "description": "Battery Module 500amps",
             *         "active": true,
             *         "pricing_model": "per_unit",
             *         "is_composite_price": false,
             *         "tax": {
             *           "$relation": [
             *             {
             *               "entity_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc"
             *             }
             *           ]
             *         },
             *         "_org": "728",
             *         "_created_at": "2022-06-03T16:05:04.391Z",
             *         "_updated_at": "2022-06-03T16:05:04.391Z"
             *       },
             *       "_product": {
             *         "_id": "a7f4771a-6368-4d77-bb01-71f1e4902de5",
             *         "type": "product",
             *         "_schema": "product",
             *         "_title": "Solar Panel with Battery Storage",
             *         "name": "Solar Panel with Battery Storage",
             *         "code": "SOLAR-BATT",
             *         "active": true,
             *         "description": "Solar Panel with battery solution, optimized for max efficiency. ",
             *         "feature": [
             *           {
             *             "_tags": [],
             *             "feature": "Eco-Panels"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Remote Management Platform"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Battery Remote Control"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Mobile App"
             *           }
             *         ],
             *         "cross_sellable_products": {
             *           "$relation": [
             *             {
             *               "entity_id": "068d0713-a650-4668-9ed2-eca7be31e337",
             *               "_schema": "product",
             *               "_tags": []
             *             },
             *             {
             *               "entity_id": "c8402ee7-fba9-4f3d-bffd-6803ca655782",
             *               "_tags": []
             *             }
             *           ]
             *         },
             *         "product_images": {
             *           "$relation": [
             *             {
             *               "entity_id": "37bdeaaa-65fe-403e-9894-65b01cd277f1"
             *             },
             *             {
             *               "entity_id": "56dde657-795c-41bb-bf53-98fd586b7e6e"
             *             }
             *           ]
             *         },
             *         "product_downloads": {
             *           "$relation": [
             *             {
             *               "entity_id": "64211361-8759-414b-81c0-afbf24f83aa9"
             *             }
             *           ]
             *         },
             *         "_org": "728",
             *         "_created_at": "2022-06-03T15:52:27.512Z",
             *         "_updated_at": "2022-06-03T16:05:15.029Z",
             *         "price_options": {
             *           "$relation": [
             *             {
             *               "entity_id": "9c36c23b-1574-4193-beff-b1b5e1124bc7",
             *               "_tags": []
             *             },
             *             {
             *               "entity_id": "146aa2cc-f267-4d5e-bda4-cbe2669b7741",
             *               "_tags": []
             *             }
             *           ]
             *         }
             *       },
             *       "quantity": 4,
             *       "currency": "EUR",
             *       "description": "Battery Module 500amps",
             *       "unit_amount": 50000,
             *       "unit_amount_net": 42017,
             *       "amount_subtotal": 168067,
             *       "amount_total": 200000
             *     },
             *     {
             *       "price_id": "d88a8763-3e3d-4fc7-a7a5-2bc9117148bf",
             *       "product_id": "065d6618-cc59-45f4-8e3a-700edf6813c3",
             *       "pricing_model": "per_unit",
             *       "is_composite_price": false,
             *       "_price": {
             *         "_id": "d88a8763-3e3d-4fc7-a7a5-2bc9117148bf",
             *         "unit_amount": 12055,
             *         "type": "recurring",
             *         "billing_period": "monthly",
             *         "billing_duration_amount": 8,
             *         "billing_duration_unit": "years",
             *         "notice_time_amount": 3,
             *         "notice_time_unit": "months",
             *         "termination_time_amount": 2,
             *         "termination_time_unit": "months",
             *         "renewal_duration_amount": 1,
             *         "renewal_duration_unit": "years",
             *         "active": true,
             *         "sales_tax": "reduced",
             *         "is_tax_inclusive": true,
             *         "description": "Monthly",
             *         "billing_scheme": "per_unit",
             *         "_schema": "price",
             *         "_org": "728",
             *         "_created_at": "2021-11-10T14:40:27.695Z",
             *         "_updated_at": "2021-12-14T18:16:33.248Z",
             *         "_title": "Monthly",
             *         "unit_amount_currency": "EUR",
             *         "unit_amount_decimal": "120.55456634",
             *         "pricing_model": "per_unit",
             *         "is_composite_price": false
             *       },
             *       "_product": {
             *         "_id": "065d6618-cc59-45f4-8e3a-700edf6813c3",
             *         "name": "Smartmeter: Schneider Electric PM5000 LCD Energiemessgerät / 3-phasig",
             *         "code": "1312378123",
             *         "_tags": [
             *           "wallbox",
             *           "review demo",
             *           "1"
             *         ],
             *         "categories": [
             *           "Power"
             *         ],
             *         "type": "product",
             *         "active": true,
             *         "feature": [
             *           {
             *             "_tags": [],
             *             "feature": "Bis zu 11 kW Ladeleistung (5x schneller laden)"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Integrierter MID Zähler für eine kilowattstundengenaue Abrechnung*"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Konfigurierbare Ladeleistung"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Zugangskontrolle über RFID-Karten"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "Kommunikation über LAN"
             *           },
             *           {
             *             "_tags": [],
             *             "feature": "New feature"
             *           }
             *         ],
             *         "_schema": "product",
             *         "_org": "728",
             *         "_created_at": "2021-11-30T11:05:19.484Z",
             *         "_updated_at": "2022-01-13T09:18:29.944Z",
             *         "_title": "Smartmeter: Schneider Electric PM5000 LCD Energiemessgerät / 3-phasig",
             *         "price_options": {
             *           "$relation": [
             *             {
             *               "entity_id": "5264b089-fc6a-4a91-9a2a-80c673958faa"
             *             },
             *             {
             *               "entity_id": "d88a8763-3e3d-4fc7-a7a5-2bc9117148bf"
             *             }
             *           ]
             *         },
             *         "product_images": {
             *           "$relation": [
             *             {
             *               "entity_id": "16729e60-c527-44ef-93c9-c68b6acf1224"
             *             }
             *           ]
             *         }
             *       },
             *       "quantity": 1,
             *       "currency": "EUR",
             *       "description": "Monthly",
             *       "unit_amount": 12055,
             *       "unit_amount_net": 11267,
             *       "amount_subtotal": 11267,
             *       "amount_total": 12055,
             *       "taxes": [
             *         {
             *           "rate": "reduced",
             *           "amount": 789
             *         }
             *       ]
             *     },
             *     {
             *       "price_id": "e1ddf75a-d0d1-40b4-a07e-56e292867c88",
             *       "product_id": "5b9f05b7-f0f8-49c2-8a8d-0f8f923d6382",
             *       "pricing_model": "per_unit",
             *       "is_composite_price": false,
             *       "_price": {
             *         "_id": "e1ddf75a-d0d1-40b4-a07e-56e292867c88",
             *         "unit_amount": 9900,
             *         "unit_amount_currency": "EUR",
             *         "unit_amount_decimal": "99",
             *         "sales_tax": "standard",
             *         "is_tax_inclusive": true,
             *         "price_display_in_journeys": "show_price",
             *         "type": "recurring",
             *         "billing_period": "yearly",
             *         "billing_duration_unit": "months",
             *         "notice_time_unit": "months",
             *         "termination_time_unit": "months",
             *         "renewal_duration_unit": "months",
             *         "_schema": "price",
             *         "_title": "Yearly payment",
             *         "description": "Yearly payment",
             *         "active": true,
             *         "pricing_model": "per_unit",
             *         "is_composite_price": false,
             *         "_org": "728",
             *         "_created_at": "2022-02-07T22:58:39.884Z",
             *         "_updated_at": "2022-02-07T22:58:39.884Z"
             *       },
             *       "_product": {
             *         "_id": "5b9f05b7-f0f8-49c2-8a8d-0f8f923d6382",
             *         "_schema": "product",
             *         "_title": "Yearly Payment Product",
             *         "name": "Yearly Payment Product",
             *         "type": "product",
             *         "active": true,
             *         "price_options": {
             *           "$relation": [
             *             {
             *               "entity_id": "e1ddf75a-d0d1-40b4-a07e-56e292867c88",
             *               "_tags": []
             *             }
             *           ]
             *         },
             *         "_org": "728",
             *         "_created_at": "2022-02-07T22:58:44.162Z",
             *         "_updated_at": "2022-02-08T09:34:08.026Z",
             *         "description": "Hier steht die Produktbeschreibung die sich auf dem Dokument, was generiert wird, gezogen wird."
             *       },
             *       "quantity": 1,
             *       "currency": "EUR",
             *       "description": "Yearly payment",
             *       "unit_amount": 9900,
             *       "unit_amount_net": 8319,
             *       "amount_subtotal": 8319,
             *       "amount_total": 9900,
             *       "taxes": [
             *         {
             *           "rate": "standard",
             *           "amount": 1581
             *         }
             *       ]
             *     }
             *   ],
             *   "amount_subtotal": 1532191,
             *   "amount_total": 1821955,
             *   "total_details": {
             *     "amount_tax": 289764,
             *     "breakdown": {
             *       "taxes": [
             *         {
             *           "tax": {
             *             "_id": "24641e82-0690-4135-8b43-ef12a9b1c5dc",
             *             "rate": 19,
             *             "_schema": "tax",
             *             "_org": "728",
             *             "_created_at": "2021-09-24T15:06:13.859Z",
             *             "_updated_at": "2022-04-04T17:36:15.273Z",
             *             "_title": "Tax Standard",
             *             "type": "VAT",
             *             "active": true,
             *             "region": "DE",
             *             "description": "Standard"
             *           },
             *           "amount": 287395
             *         }
             *       ],
             *       "recurrences": [
             *         {
             *           "type": "one_time",
             *           "amount_subtotal": 1512605,
             *           "amount_subtotal_decimal": "15126.05",
             *           "amount_total": 1800000,
             *           "amount_total_decimal": "18000.00",
             *           "amount_tax": 287395,
             *           "amount_tax_decimal": "2873.95"
             *         },
             *         {
             *           "type": "recurring",
             *           "billing_period": "monthly",
             *           "amount_subtotal": 11267,
             *           "amount_subtotal_decimal": "112.67",
             *           "amount_total": 12055,
             *           "amount_total_decimal": "120.55",
             *           "amount_tax": 789,
             *           "amount_tax_decimal": "7.89"
             *         },
             *         {
             *           "type": "recurring",
             *           "billing_period": "yearly",
             *           "amount_subtotal": 8319,
             *           "amount_subtotal_decimal": "83.19",
             *           "amount_total": 9900,
             *           "amount_total_decimal": "99.00",
             *           "amount_tax": 1581,
             *           "amount_tax_decimal": "15.81"
             *         }
             *       ]
             *     }
             *   },
             *   "currency": "EUR",
             *   "payment_method": [
             *     {
             *       "type": "IBAN",
             *       "details": {}
             *     }
             *   ],
             *   "billing_contact": {
             *     "$relation": [
             *       {
             *         "entity_id": "1834a54e-b68f-4f7f-a98a-fe16f11bc2a5",
             *         "_tags": []
             *       }
             *     ]
             *   },
             *   "billing_first_name": "Joao",
             *   "billing_last_name": "Pinho",
             *   "billing_email": "j.pinho@epilot.cloud",
             *   "billing_company_name": "epilot cloud",
             *   "billing_address": [
             *     {
             *       "_tags": [],
             *       "street": "Im Media Park",
             *       "street_number": "8a",
             *       "postal_code": "52000",
             *       "city": "Cologne",
             *       "country": "DE",
             *       "additional_info": ""
             *     }
             *   ],
             *   "delivery_address": [],
             *   "dates": [
             *     {
             *       "_tags": [
             *         "Instalation Date"
             *       ],
             *       "dates": "",
             *       "value": "2022-06-30T16:29:00.000Z"
             *     }
             *   ],
             *   "_id": "4c7c9562-f8f0-4af0-a3a6-6aebc5571a6e",
             *   "_org": "728",
             *   "_created_at": "2022-06-03T16:29:46.303Z",
             *   "_updated_at": "2022-06-03T16:29:46.303Z"
             * }
             */
            Components.Schemas.Order;
            export type $400 = Components.Schemas.Error;
        }
    }
}


export interface OperationMethods {
  /**
   * $calculatePricingDetails - $calculatePricingDetails
   * 
   * Computes a set of pricing details that can be persisted on an entity with the pricing capability enabled, e.g: Orders or Contracts.
   */
  '$calculatePricingDetails'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.$CalculatePricingDetails.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$CalculatePricingDetails.Responses.$200>
  /**
   * createOrder - createOrder
   * 
   * Create an order
   */
  'createOrder'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateOrder.Responses.$201>
  /**
   * putOrder - putOrder
   * 
   * Update an existing Order
   */
  'putOrder'(
    parameters?: Parameters<Paths.PutOrder.PathParameters> | null,
    data?: Paths.PutOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutOrder.Responses.$200>
  /**
   * $checkoutCart - $checkoutCart
   * 
   * Checkouts a cart and executes the specified checkout `mode` process.
   * 
   * A Checkout implicitly finalizes the provided cart (if not transient from a fast-checkout) and behaves in one of the following modes:
   * - `create_order` (**default**): the payment happens at a later date or managed by 3rd-party CRM (SAP)
   * - `create_invoice`: the payment happens on the online checkout (paypal, stripe, adyen)
   * - `create_quote`: the checkout represents a price quote request
   * 
   * Fast checkout is also supported, by passing the Cart contents directly.
   * When a fast checkout is performed the cart is considered transient and there is no cart persistance.
   * 
   * If the checkout `mode` is omitted, the `mode` will default to `create_order`.
   * 
   */
  '$checkoutCart'(
    parameters?: Parameters<Paths.$CheckoutCart.HeaderParameters> | null,
    data?: Paths.$CheckoutCart.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$CheckoutCart.Responses.$200>
  /**
   * $searchCatalog - $searchCatalog
   * 
   * Provides a querying functionalities over products and prices of the Catalog for a given organization.
   */
  '$searchCatalog'(
    parameters?: Parameters<Paths.$SearchCatalog.HeaderParameters> | null,
    data?: Paths.$SearchCatalog.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$SearchCatalog.Responses.$200>
  /**
   * $privateSearchCatalog - $privateSearchCatalog
   * 
   * Provides a querying functionalities over products and prices of the Catalog for a given organization.
   */
  '$privateSearchCatalog'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.$PrivateSearchCatalog.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$PrivateSearchCatalog.Responses.$200>
  /**
   * $validatePromoCodes - $validatePromoCodes
   * 
   * Validate a list of promo codes against a list of coupons
   */
  '$validatePromoCodes'(
    parameters?: Parameters<Paths.$ValidatePromoCodes.HeaderParameters> | null,
    data?: Paths.$ValidatePromoCodes.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$ValidatePromoCodes.Responses.$200>
  /**
   * $availabilityCheck - $availabilityCheck
   * 
   * The availability check endpoint
   */
  '$availabilityCheck'(
    parameters?: Parameters<Paths.$AvailabilityCheck.HeaderParameters> | null,
    data?: Paths.$AvailabilityCheck.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$AvailabilityCheck.Responses.$200>
  /**
   * $validateAvailabilityFile - $validateAvailabilityFile
   * 
   * Validates an availability file, it returns an array of errors if the file is invalid
   */
  '$validateAvailabilityFile'(
    parameters?: Parameters<Paths.$ValidateAvailabilityFile.HeaderParameters & Paths.$ValidateAvailabilityFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$ValidateAvailabilityFile.Responses.$200>
  /**
   * $historicMarketPrices - $historicMarketPrices
   * 
   * Get a series of historic energy prices for a given time period, market and bidding zone.
   */
  '$historicMarketPrices'(
    parameters?: Parameters<Paths.$HistoricMarketPrices.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$HistoricMarketPrices.Responses.$200>
  /**
   * $averageMarketPrice - $averageMarketPrice
   * 
   * Get the average energy prices for a given time period, market and bidding zone.
   */
  '$averageMarketPrice'(
    parameters?: Parameters<Paths.$AverageMarketPrice.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$AverageMarketPrice.Responses.$200>
  /**
   * $searchExternalProducts - $searchExternalProducts
   * 
   * Returns the list of available products with computed prices based on a given context and for a given org integration.
   */
  '$searchExternalProducts'(
    parameters?: Parameters<Paths.$SearchExternalProducts.PathParameters> | null,
    data?: Paths.$SearchExternalProducts.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$SearchExternalProducts.Responses.$200>
  /**
   * $searchExternalProductRecommendations - $searchExternalProductRecommendations
   * 
   * Returns the list of available product recommendations with computed prices based on a given context and for a given org integration.
   */
  '$searchExternalProductRecommendations'(
    parameters?: Parameters<Paths.$SearchExternalProductRecommendations.PathParameters> | null,
    data?: Paths.$SearchExternalProductRecommendations.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$SearchExternalProductRecommendations.Responses.$200>
  /**
   * $searchProviders - $searchProviders
   * 
   * Returns the list of providers available based on a given location
   */
  '$searchProviders'(
    parameters?: Parameters<Paths.$SearchProviders.HeaderParameters & Paths.$SearchProviders.PathParameters> | null,
    data?: Paths.$SearchProviders.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$SearchProviders.Responses.$200>
  /**
   * $searchStreets - $searchStreets
   * 
   * Returns the list of streets available for a given postal code and city
   */
  '$searchStreets'(
    parameters?: Parameters<Paths.$SearchStreets.HeaderParameters & Paths.$SearchStreets.PathParameters> | null,
    data?: Paths.$SearchStreets.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$SearchStreets.Responses.$200>
  /**
   * $computePrice - $computePrice
   * 
   * Returns the price for a given product type based on location and consumption
   */
  '$computePrice'(
    parameters?: Parameters<Paths.$ComputePrice.HeaderParameters & Paths.$ComputePrice.PathParameters> | null,
    data?: Paths.$ComputePrice.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$ComputePrice.Responses.$200>
  /**
   * $getCredentials - $getCredentials
   * 
   * Gets the credentials for a given integration / organization
   */
  '$getCredentials'(
    parameters?: Parameters<Paths.$GetCredentials.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$GetCredentials.Responses.$200>
  /**
   * $saveCredentials - $saveCredentials
   * 
   * Saves the credentials for a given integration / organization
   */
  '$saveCredentials'(
    parameters?: Parameters<Paths.$SaveCredentials.PathParameters> | null,
    data?: Paths.$SaveCredentials.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$SaveCredentials.Responses.$204>
  /**
   * $deleteCredentials - $deleteCredentials
   * 
   * Delete the credentials for a given integration / organization
   */
  '$deleteCredentials'(
    parameters?: Parameters<Paths.$DeleteCredentials.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$DeleteCredentials.Responses.$204>
  /**
   * $getExternalCatalogProducts - $getExternalCatalogProducts
   * 
   * Returns the list of available external catalog products with computed prices based on a given context
   */
  '$getExternalCatalogProducts'(
    parameters?: Parameters<Paths.$GetExternalCatalogProducts.HeaderParameters> | null,
    data?: Paths.$GetExternalCatalogProducts.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$GetExternalCatalogProducts.Responses.$200>
  /**
   * $getExternalCatalogProductRecommendations - $getExternalCatalogProductRecommendations
   * 
   * Returns the list of available external catalog products recommendations based on a given context
   */
  '$getExternalCatalogProductRecommendations'(
    parameters?: Parameters<Paths.$GetExternalCatalogProductRecommendations.HeaderParameters> | null,
    data?: Paths.$GetExternalCatalogProductRecommendations.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$GetExternalCatalogProductRecommendations.Responses.$200>
  /**
   * $productRecommendations - $productRecommendations
   * 
   * Get a list of product recommendations based on the search parameters.
   */
  '$productRecommendations'(
    parameters?: Parameters<Paths.$ProductRecommendations.HeaderParameters> | null,
    data?: Paths.$ProductRecommendations.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$ProductRecommendations.Responses.$200>
  /**
   * $getConditionSets - $getConditionSets
   * 
   * Returns the condition sets built in for one conditional entity type: the situations a
   * conditional Product, Price or Coupon is commonly varied by, ready to be copied into that
   * schema's `conditions` array and extended or modified from there.
   * 
   * Which sets exist depends on the schema — an offer window is a Product's dimension, a delivery
   * area is a Price's and a Coupon's — so only the sets built in for `slug` are returned.
   * 
   * Static, read-only reference data. The catalog is the same for every organization and is not
   * applied to any schema by this endpoint — adding conditions to a schema stays an Entity API
   * write.
   * 
   */
  '$getConditionSets'(
    parameters?: Parameters<Paths.$GetConditionSets.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$GetConditionSets.Responses.$200>
  /**
   * $resolveConditionalEntity - $resolveConditionalEntity
   * 
   * Resolves which of a conditional entity's variants apply to a situation, and returns each one
   * composed: the base entity overlaid with the values of the version in effect at `as_of`.
   * 
   * Resolution is two selections in a fixed order — the variant, by matching `context` against
   * the conditions each variant pins; then the version, by `as_of`. It is always scoped to one
   * logical entity, so it stays a cheap, predictable lookup rather than an open search.
   * 
   * Matching follows two rules worth knowing before assembling a context. A condition a variant
   * does **not** pin matches any value, which is what lets a condition be added to a schema
   * without breaking the variants that already exist. A condition **missing from `context`**,
   * however, does not satisfy one a variant pinned: an incomplete integration resolves to
   * nothing rather than silently matching another segment's variants.
   * 
   * When nothing matches, the entity's `default` variant is returned if it has one. There is no
   * implicit fallback to the unmodified base entity — its values are the ones no variant
   * overrode, which is not an answer to "what applies here".
   * 
   * Availability is a separate mechanism and is never consulted here.
   * 
   */
  '$resolveConditionalEntity'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.$ResolveConditionalEntity.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$ResolveConditionalEntity.Responses.$200>
  /**
   * $createConditionalVariant - $createConditionalVariant
   * 
   * Creates one variant of a conditional entity, together with the first version carrying its
   * values. Never two calls: a variant that existed without a version would be an entity holding
   * a condition tuple it cannot answer with.
   * 
   * The body pins the situation the variant applies to. Pins are exact values only — predicates
   * are a read-side concept and are rejected here — and are stored canonicalized for their
   * condition's type, so two spellings of one instant, or one town written two ways, are one
   * variant rather than two that no context can tell apart.
   * 
   * Three write rules are worth knowing before the first call:
   * 
   * - A variant must pin at least one condition or be marked `default`. A variant pinning nothing
   *   would be a universal wildcard matching every resolve, which is a far more dangerous thing
   *   than a fallback and far easier to create by accident.
   * - `default` is a property of the variant, set by the `default` flag, and is never a value in
   *   `conditions` — not even `false`. A `default` variant cannot pin anything else, and an entity
   *   can have only one, enforced by the ordinary condition-tuple guard rather than by a rule of
   *   its own. Any entity may have one; nothing is declared in the schema to allow it.
   * - Condition values are immutable afterwards. A variant's identity is the situation it applies
   *   to, and orders and contracts pin it. **A condition added to a schema that already has
   *   variants is effectively one-way**: every existing variant is a wildcard on the new
   *   dimension, but the first variant that pins it is ambiguous against all of them, and
   *   retro-pinning the others is blocked by this same rule.
   * 
   * Attribute values are applied only for attributes currently carrying `overridable_attribute`.
   * Metadata and non-overridable fields present in the body are ignored rather than rejected, so a
   * client working from a slightly stale schema snapshot still succeeds.
   * 
   * `variant_id` is always server-generated and returned, and is not accepted in the body — the
   * request schema admits no such property. It is the durable key orders and contracts pin, so it
   * cannot be something two independent importers could collide on.
   * 
   */
  '$createConditionalVariant'(
    parameters?: Parameters<Paths.$CreateConditionalVariant.PathParameters> | null,
    data?: Paths.$CreateConditionalVariant.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$CreateConditionalVariant.Responses.$201>
  /**
   * $getActiveConditionalVariantVersion - $getActiveConditionalVariantVersion
   * 
   * Returns the version of this variant that is currently in effect — the one with the latest
   * `valid_from` at or before now.
   * 
   * The "open this variant" read: no date arithmetic is asked of the caller, and what comes back
   * carries the `_revision` a write to that version has to be sent with, so an editing screen can
   * load and save without working out which version it is looking at.
   * 
   * What is returned is the version's own attribute overrides, not the base entity overlaid with
   * them. Composing the two is what `:resolve` answers.
   * 
   * A variant staged ahead of its launch has versions but none of them in effect, and is reported
   * as having none rather than as not existing — the two are fixed differently.
   * 
   */
  '$getActiveConditionalVariantVersion'(
    parameters?: Parameters<Paths.$GetActiveConditionalVariantVersion.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$GetActiveConditionalVariantVersion.Responses.$200>
  /**
   * $replaceActiveConditionalVariantVersion - $replaceActiveConditionalVariantVersion
   * 
   * Replaces the values of the version currently in effect, wholesale.
   * 
   * The body is the complete set of attribute overrides: an attribute the variant may override and
   * that is absent from it stops being overridden. Attributes the variant may **not** override are
   * ignored where the body carries them, and their stored value is kept rather than dropped — a
   * routine full-snapshot write must not erase an override the moment its attribute's flag happens
   * to be off.
   * 
   * Editing the version in effect is the ordinary way a live price is corrected, and warns about
   * nothing: what changes is what that version *says*, not which version is in effect.
   * 
   * Neither `valid_from` nor `conditions` can be changed here. Both are accepted when they match
   * what is stored, so a client building its body from the version it loaded need not strip them
   * out first, and both are refused when they name something else.
   * 
   */
  '$replaceActiveConditionalVariantVersion'(
    parameters?: Parameters<Paths.$ReplaceActiveConditionalVariantVersion.PathParameters> | null,
    data?: Paths.$ReplaceActiveConditionalVariantVersion.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$ReplaceActiveConditionalVariantVersion.Responses.$200>
  /**
   * $patchActiveConditionalVariantVersion - $patchActiveConditionalVariantVersion
   * 
   * Changes only the fields it names on the version currently in effect.
   * 
   * Everything the body does not mention is left as stored — the "just nudge this number" write. A
   * `null` is a value like any other rather than a deletion; a client that wants an attribute to
   * stop being overridden sends the complete snapshot without it through `PUT`.
   * 
   * Attempting to change a pinned condition value is refused here in particular: a partial update
   * is the path a caller reaches for by accident, and a variant's conditions are the situation it
   * applies to, which the orders and contracts pinning it depend on not shifting.
   * 
   */
  '$patchActiveConditionalVariantVersion'(
    parameters?: Parameters<Paths.$PatchActiveConditionalVariantVersion.PathParameters> | null,
    data?: Paths.$PatchActiveConditionalVariantVersion.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$PatchActiveConditionalVariantVersion.Responses.$200>
  /**
   * $deleteConditionalVariant - $deleteConditionalVariant
   * 
   * Removes one variant of a conditional entity: the condition tuple it holds, its registration
   * in the search index, and every version it accumulated.
   * 
   * Two phases. The first frees the tuple and deregisters the variant, and is what makes the
   * combination of condition values immediately reusable — the second removes the version rows in
   * batches afterwards. A response arrives only once both have finished for this request, but the
   * tuple is reusable from the moment the first completes, whether or not the second did: a
   * variant with more versions than one transaction can carry is the ordinary case, not an edge
   * one. An interrupted delete is safe to send again; it picks up where it stopped.
   * 
   * Nothing is archived. A variant an order or contract pins stops resolving, and hydration drops
   * the reference leniently rather than failing the read.
   * 
   * This removes the **variant**, not one of its versions. To remove a single version, name it on
   * `…/variants/{variant_id}/versions/{valid_from}` — including the one currently in effect, which
   * deliberately has no "delete whichever is live" shorthand: that is exactly the write nobody
   * should be able to ask for without saying which version they meant.
   * 
   */
  '$deleteConditionalVariant'(
    parameters?: Parameters<Paths.$DeleteConditionalVariant.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$DeleteConditionalVariant.Responses.$200>
  /**
   * $appendConditionalVariantVersion - $appendConditionalVariantVersion
   * 
   * Appends a version to a variant: a new set of values taking effect at its own instant.
   * 
   * This is how a price changes. No version carries an end date and nothing is superseded
   * explicitly — the version in effect at an instant is simply the one with the latest `valid_from`
   * at or before it, so appending a later version is the whole of "this is the new price from then
   * on". A version dated in the future is staged and excluded from resolution until its date.
   * 
   * **A version is never refused for being late.** A `valid_from` in the past is written like any
   * other and answered with warnings in `warnings` naming what it moved — what resolves now, what a
   * past-dated read returns, or both. Correcting a price that took effect last week is ordinary
   * work; the alternative, deleting and recreating the variant, breaks every order and contract
   * pinning its id.
   * 
   * What is refused is appending at a `valid_from` the variant already has: that write means either
   * "replace it" or "and also this", and only the caller knows which. The two operations both
   * exist, on the dated version path.
   * 
   * The variant's `conditions` are its identity and are fixed at creation; they may be sent back
   * unchanged but never changed.
   * 
   */
  '$appendConditionalVariantVersion'(
    parameters?: Parameters<Paths.$AppendConditionalVariantVersion.PathParameters> | null,
    data?: Paths.$AppendConditionalVariantVersion.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$AppendConditionalVariantVersion.Responses.$201>
  /**
   * $getConditionalVariantVersion - $getConditionalVariantVersion
   * 
   * Returns one specific version of a variant, by the instant it takes effect — what a form editing
   * that version loads.
   * 
   * Exact, never nearest: an instant the variant has no version at is a not-found rather than the
   * version that would be in effect at it. That question is the shorthand read's, or `:resolve`'s.
   * 
   */
  '$getConditionalVariantVersion'(
    parameters?: Parameters<Paths.$GetConditionalVariantVersion.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$GetConditionalVariantVersion.Responses.$200>
  /**
   * $replaceConditionalVariantVersion - $replaceConditionalVariantVersion
   * 
   * Replaces one version's values wholesale, addressed by its `valid_from`.
   * 
   * Editable whatever its date, at both ends of the timeline: a scheduled version must stay
   * editable so a staged price can be corrected before it goes live rather than accumulating dead
   * versions beside it, and a past one must stay editable because correcting history is ordinary
   * work. Writing a superseded version is answered with a warning naming what a past-dated read now
   * returns; it is not refused.
   * 
   * Attributes the variant may not override are ignored where the body carries them, and their
   * stored value is preserved rather than dropped.
   * 
   */
  '$replaceConditionalVariantVersion'(
    parameters?: Parameters<Paths.$ReplaceConditionalVariantVersion.PathParameters> | null,
    data?: Paths.$ReplaceConditionalVariantVersion.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$ReplaceConditionalVariantVersion.Responses.$200>
  /**
   * $patchConditionalVariantVersion - $patchConditionalVariantVersion
   * 
   * Changes only the fields it names on one version, addressed by its `valid_from`.
   * 
   * Everything the body does not mention is left as stored. A partial update that tries to change a
   * pinned condition value is refused: condition values are immutable after a variant is created,
   * and this is the path that rule is most likely to be broken on by accident.
   * 
   */
  '$patchConditionalVariantVersion'(
    parameters?: Parameters<Paths.$PatchConditionalVariantVersion.PathParameters> | null,
    data?: Paths.$PatchConditionalVariantVersion.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$PatchConditionalVariantVersion.Responses.$200>
  /**
   * $deleteConditionalVariantVersion - $deleteConditionalVariantVersion
   * 
   * Removes one version of a variant.
   * 
   * Withdrawing a scheduled adjustment is what this is for, and deleting a future version warns
   * about nothing — nothing that has resolved, or could have resolved, changes. Deleting a version
   * that has taken effect is allowed too and answered with a warning: it changes what a past-dated
   * read returns, and if it was the version in effect it changes what resolves now.
   * 
   * **A variant's last remaining version cannot be deleted.** Such a variant would still hold its
   * condition tuple and still be selectable, and then resolve to nothing — which is a variant delete
   * wearing a version delete's clothes. Delete the variant instead; that frees the tuple too.
   * 
   * The variant itself is untouched: it keeps its conditions, its tuple and its place in the index.
   * 
   */
  '$deleteConditionalVariantVersion'(
    parameters?: Parameters<Paths.$DeleteConditionalVariantVersion.QueryParameters & Paths.$DeleteConditionalVariantVersion.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$DeleteConditionalVariantVersion.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/pricing:compute']: {
    /**
     * $calculatePricingDetails - $calculatePricingDetails
     * 
     * Computes a set of pricing details that can be persisted on an entity with the pricing capability enabled, e.g: Orders or Contracts.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.$CalculatePricingDetails.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$CalculatePricingDetails.Responses.$200>
  }
  ['/v1/order']: {
    /**
     * createOrder - createOrder
     * 
     * Create an order
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateOrder.Responses.$201>
  }
  ['/v1/order/{id}']: {
    /**
     * putOrder - putOrder
     * 
     * Update an existing Order
     */
    'put'(
      parameters?: Parameters<Paths.PutOrder.PathParameters> | null,
      data?: Paths.PutOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutOrder.Responses.$200>
  }
  ['/v1/public/cart:checkout']: {
    /**
     * $checkoutCart - $checkoutCart
     * 
     * Checkouts a cart and executes the specified checkout `mode` process.
     * 
     * A Checkout implicitly finalizes the provided cart (if not transient from a fast-checkout) and behaves in one of the following modes:
     * - `create_order` (**default**): the payment happens at a later date or managed by 3rd-party CRM (SAP)
     * - `create_invoice`: the payment happens on the online checkout (paypal, stripe, adyen)
     * - `create_quote`: the checkout represents a price quote request
     * 
     * Fast checkout is also supported, by passing the Cart contents directly.
     * When a fast checkout is performed the cart is considered transient and there is no cart persistance.
     * 
     * If the checkout `mode` is omitted, the `mode` will default to `create_order`.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.$CheckoutCart.HeaderParameters> | null,
      data?: Paths.$CheckoutCart.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$CheckoutCart.Responses.$200>
  }
  ['/v1/public/catalog']: {
    /**
     * $searchCatalog - $searchCatalog
     * 
     * Provides a querying functionalities over products and prices of the Catalog for a given organization.
     */
    'post'(
      parameters?: Parameters<Paths.$SearchCatalog.HeaderParameters> | null,
      data?: Paths.$SearchCatalog.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$SearchCatalog.Responses.$200>
  }
  ['/v1/catalog']: {
    /**
     * $privateSearchCatalog - $privateSearchCatalog
     * 
     * Provides a querying functionalities over products and prices of the Catalog for a given organization.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.$PrivateSearchCatalog.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$PrivateSearchCatalog.Responses.$200>
  }
  ['/v1/public/validate-promo-codes']: {
    /**
     * $validatePromoCodes - $validatePromoCodes
     * 
     * Validate a list of promo codes against a list of coupons
     */
    'post'(
      parameters?: Parameters<Paths.$ValidatePromoCodes.HeaderParameters> | null,
      data?: Paths.$ValidatePromoCodes.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$ValidatePromoCodes.Responses.$200>
  }
  ['/v1/public/availability:check']: {
    /**
     * $availabilityCheck - $availabilityCheck
     * 
     * The availability check endpoint
     */
    'post'(
      parameters?: Parameters<Paths.$AvailabilityCheck.HeaderParameters> | null,
      data?: Paths.$AvailabilityCheck.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$AvailabilityCheck.Responses.$200>
  }
  ['/v1/validate-availability/{id}']: {
    /**
     * $validateAvailabilityFile - $validateAvailabilityFile
     * 
     * Validates an availability file, it returns an array of errors if the file is invalid
     */
    'get'(
      parameters?: Parameters<Paths.$ValidateAvailabilityFile.HeaderParameters & Paths.$ValidateAvailabilityFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$ValidateAvailabilityFile.Responses.$200>
  }
  ['/v1/public/historicMarketPrices']: {
    /**
     * $historicMarketPrices - $historicMarketPrices
     * 
     * Get a series of historic energy prices for a given time period, market and bidding zone.
     */
    'get'(
      parameters?: Parameters<Paths.$HistoricMarketPrices.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$HistoricMarketPrices.Responses.$200>
  }
  ['/v1/public/averageMarketPrice']: {
    /**
     * $averageMarketPrice - $averageMarketPrice
     * 
     * Get the average energy prices for a given time period, market and bidding zone.
     */
    'get'(
      parameters?: Parameters<Paths.$AverageMarketPrice.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$AverageMarketPrice.Responses.$200>
  }
  ['/v1/public/integration/{integrationId}/products']: {
    /**
     * $searchExternalProducts - $searchExternalProducts
     * 
     * Returns the list of available products with computed prices based on a given context and for a given org integration.
     */
    'post'(
      parameters?: Parameters<Paths.$SearchExternalProducts.PathParameters> | null,
      data?: Paths.$SearchExternalProducts.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$SearchExternalProducts.Responses.$200>
  }
  ['/v1/public/integration/{integrationId}/product-recommendations']: {
    /**
     * $searchExternalProductRecommendations - $searchExternalProductRecommendations
     * 
     * Returns the list of available product recommendations with computed prices based on a given context and for a given org integration.
     */
    'post'(
      parameters?: Parameters<Paths.$SearchExternalProductRecommendations.PathParameters> | null,
      data?: Paths.$SearchExternalProductRecommendations.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$SearchExternalProductRecommendations.Responses.$200>
  }
  ['/v1/public/integration/{integrationId}/providers:search']: {
    /**
     * $searchProviders - $searchProviders
     * 
     * Returns the list of providers available based on a given location
     */
    'post'(
      parameters?: Parameters<Paths.$SearchProviders.HeaderParameters & Paths.$SearchProviders.PathParameters> | null,
      data?: Paths.$SearchProviders.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$SearchProviders.Responses.$200>
  }
  ['/v1/public/integration/{integrationId}/streets:search']: {
    /**
     * $searchStreets - $searchStreets
     * 
     * Returns the list of streets available for a given postal code and city
     */
    'post'(
      parameters?: Parameters<Paths.$SearchStreets.HeaderParameters & Paths.$SearchStreets.PathParameters> | null,
      data?: Paths.$SearchStreets.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$SearchStreets.Responses.$200>
  }
  ['/v1/public/integration/{integrationId}/compute-price']: {
    /**
     * $computePrice - $computePrice
     * 
     * Returns the price for a given product type based on location and consumption
     */
    'post'(
      parameters?: Parameters<Paths.$ComputePrice.HeaderParameters & Paths.$ComputePrice.PathParameters> | null,
      data?: Paths.$ComputePrice.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$ComputePrice.Responses.$200>
  }
  ['/v1/integration/{integrationId}/credentials']: {
    /**
     * $getCredentials - $getCredentials
     * 
     * Gets the credentials for a given integration / organization
     */
    'get'(
      parameters?: Parameters<Paths.$GetCredentials.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$GetCredentials.Responses.$200>
  }
  ['/v1/integration/{integrationId}/credentials:save']: {
    /**
     * $saveCredentials - $saveCredentials
     * 
     * Saves the credentials for a given integration / organization
     */
    'put'(
      parameters?: Parameters<Paths.$SaveCredentials.PathParameters> | null,
      data?: Paths.$SaveCredentials.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$SaveCredentials.Responses.$204>
  }
  ['/v1/integration/{integrationId}/credentials:delete']: {
    /**
     * $deleteCredentials - $deleteCredentials
     * 
     * Delete the credentials for a given integration / organization
     */
    'delete'(
      parameters?: Parameters<Paths.$DeleteCredentials.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$DeleteCredentials.Responses.$204>
  }
  ['/v1/public/external-catalog/products']: {
    /**
     * $getExternalCatalogProducts - $getExternalCatalogProducts
     * 
     * Returns the list of available external catalog products with computed prices based on a given context
     */
    'post'(
      parameters?: Parameters<Paths.$GetExternalCatalogProducts.HeaderParameters> | null,
      data?: Paths.$GetExternalCatalogProducts.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$GetExternalCatalogProducts.Responses.$200>
  }
  ['/v1/public/external-catalog/product-recommendations']: {
    /**
     * $getExternalCatalogProductRecommendations - $getExternalCatalogProductRecommendations
     * 
     * Returns the list of available external catalog products recommendations based on a given context
     */
    'post'(
      parameters?: Parameters<Paths.$GetExternalCatalogProductRecommendations.HeaderParameters> | null,
      data?: Paths.$GetExternalCatalogProductRecommendations.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$GetExternalCatalogProductRecommendations.Responses.$200>
  }
  ['/v1/public/product-recommendations']: {
    /**
     * $productRecommendations - $productRecommendations
     * 
     * Get a list of product recommendations based on the search parameters.
     */
    'post'(
      parameters?: Parameters<Paths.$ProductRecommendations.HeaderParameters> | null,
      data?: Paths.$ProductRecommendations.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$ProductRecommendations.Responses.$200>
  }
  ['/v1/conditional-pricing/{slug}/condition-sets']: {
    /**
     * $getConditionSets - $getConditionSets
     * 
     * Returns the condition sets built in for one conditional entity type: the situations a
     * conditional Product, Price or Coupon is commonly varied by, ready to be copied into that
     * schema's `conditions` array and extended or modified from there.
     * 
     * Which sets exist depends on the schema — an offer window is a Product's dimension, a delivery
     * area is a Price's and a Coupon's — so only the sets built in for `slug` are returned.
     * 
     * Static, read-only reference data. The catalog is the same for every organization and is not
     * applied to any schema by this endpoint — adding conditions to a schema stays an Entity API
     * write.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.$GetConditionSets.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$GetConditionSets.Responses.$200>
  }
  ['/v1/conditional-pricing:resolve']: {
    /**
     * $resolveConditionalEntity - $resolveConditionalEntity
     * 
     * Resolves which of a conditional entity's variants apply to a situation, and returns each one
     * composed: the base entity overlaid with the values of the version in effect at `as_of`.
     * 
     * Resolution is two selections in a fixed order — the variant, by matching `context` against
     * the conditions each variant pins; then the version, by `as_of`. It is always scoped to one
     * logical entity, so it stays a cheap, predictable lookup rather than an open search.
     * 
     * Matching follows two rules worth knowing before assembling a context. A condition a variant
     * does **not** pin matches any value, which is what lets a condition be added to a schema
     * without breaking the variants that already exist. A condition **missing from `context`**,
     * however, does not satisfy one a variant pinned: an incomplete integration resolves to
     * nothing rather than silently matching another segment's variants.
     * 
     * When nothing matches, the entity's `default` variant is returned if it has one. There is no
     * implicit fallback to the unmodified base entity — its values are the ones no variant
     * overrode, which is not an answer to "what applies here".
     * 
     * Availability is a separate mechanism and is never consulted here.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.$ResolveConditionalEntity.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$ResolveConditionalEntity.Responses.$200>
  }
  ['/v1/conditional-pricing/{slug}/entities/{entity_id}/variants']: {
    /**
     * $createConditionalVariant - $createConditionalVariant
     * 
     * Creates one variant of a conditional entity, together with the first version carrying its
     * values. Never two calls: a variant that existed without a version would be an entity holding
     * a condition tuple it cannot answer with.
     * 
     * The body pins the situation the variant applies to. Pins are exact values only — predicates
     * are a read-side concept and are rejected here — and are stored canonicalized for their
     * condition's type, so two spellings of one instant, or one town written two ways, are one
     * variant rather than two that no context can tell apart.
     * 
     * Three write rules are worth knowing before the first call:
     * 
     * - A variant must pin at least one condition or be marked `default`. A variant pinning nothing
     *   would be a universal wildcard matching every resolve, which is a far more dangerous thing
     *   than a fallback and far easier to create by accident.
     * - `default` is a property of the variant, set by the `default` flag, and is never a value in
     *   `conditions` — not even `false`. A `default` variant cannot pin anything else, and an entity
     *   can have only one, enforced by the ordinary condition-tuple guard rather than by a rule of
     *   its own. Any entity may have one; nothing is declared in the schema to allow it.
     * - Condition values are immutable afterwards. A variant's identity is the situation it applies
     *   to, and orders and contracts pin it. **A condition added to a schema that already has
     *   variants is effectively one-way**: every existing variant is a wildcard on the new
     *   dimension, but the first variant that pins it is ambiguous against all of them, and
     *   retro-pinning the others is blocked by this same rule.
     * 
     * Attribute values are applied only for attributes currently carrying `overridable_attribute`.
     * Metadata and non-overridable fields present in the body are ignored rather than rejected, so a
     * client working from a slightly stale schema snapshot still succeeds.
     * 
     * `variant_id` is always server-generated and returned, and is not accepted in the body — the
     * request schema admits no such property. It is the durable key orders and contracts pin, so it
     * cannot be something two independent importers could collide on.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.$CreateConditionalVariant.PathParameters> | null,
      data?: Paths.$CreateConditionalVariant.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$CreateConditionalVariant.Responses.$201>
  }
  ['/v1/conditional-pricing/{slug}/entities/{entity_id}/variants/{variant_id}']: {
    /**
     * $getActiveConditionalVariantVersion - $getActiveConditionalVariantVersion
     * 
     * Returns the version of this variant that is currently in effect — the one with the latest
     * `valid_from` at or before now.
     * 
     * The "open this variant" read: no date arithmetic is asked of the caller, and what comes back
     * carries the `_revision` a write to that version has to be sent with, so an editing screen can
     * load and save without working out which version it is looking at.
     * 
     * What is returned is the version's own attribute overrides, not the base entity overlaid with
     * them. Composing the two is what `:resolve` answers.
     * 
     * A variant staged ahead of its launch has versions but none of them in effect, and is reported
     * as having none rather than as not existing — the two are fixed differently.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.$GetActiveConditionalVariantVersion.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$GetActiveConditionalVariantVersion.Responses.$200>
    /**
     * $replaceActiveConditionalVariantVersion - $replaceActiveConditionalVariantVersion
     * 
     * Replaces the values of the version currently in effect, wholesale.
     * 
     * The body is the complete set of attribute overrides: an attribute the variant may override and
     * that is absent from it stops being overridden. Attributes the variant may **not** override are
     * ignored where the body carries them, and their stored value is kept rather than dropped — a
     * routine full-snapshot write must not erase an override the moment its attribute's flag happens
     * to be off.
     * 
     * Editing the version in effect is the ordinary way a live price is corrected, and warns about
     * nothing: what changes is what that version *says*, not which version is in effect.
     * 
     * Neither `valid_from` nor `conditions` can be changed here. Both are accepted when they match
     * what is stored, so a client building its body from the version it loaded need not strip them
     * out first, and both are refused when they name something else.
     * 
     */
    'put'(
      parameters?: Parameters<Paths.$ReplaceActiveConditionalVariantVersion.PathParameters> | null,
      data?: Paths.$ReplaceActiveConditionalVariantVersion.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$ReplaceActiveConditionalVariantVersion.Responses.$200>
    /**
     * $patchActiveConditionalVariantVersion - $patchActiveConditionalVariantVersion
     * 
     * Changes only the fields it names on the version currently in effect.
     * 
     * Everything the body does not mention is left as stored — the "just nudge this number" write. A
     * `null` is a value like any other rather than a deletion; a client that wants an attribute to
     * stop being overridden sends the complete snapshot without it through `PUT`.
     * 
     * Attempting to change a pinned condition value is refused here in particular: a partial update
     * is the path a caller reaches for by accident, and a variant's conditions are the situation it
     * applies to, which the orders and contracts pinning it depend on not shifting.
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.$PatchActiveConditionalVariantVersion.PathParameters> | null,
      data?: Paths.$PatchActiveConditionalVariantVersion.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$PatchActiveConditionalVariantVersion.Responses.$200>
    /**
     * $deleteConditionalVariant - $deleteConditionalVariant
     * 
     * Removes one variant of a conditional entity: the condition tuple it holds, its registration
     * in the search index, and every version it accumulated.
     * 
     * Two phases. The first frees the tuple and deregisters the variant, and is what makes the
     * combination of condition values immediately reusable — the second removes the version rows in
     * batches afterwards. A response arrives only once both have finished for this request, but the
     * tuple is reusable from the moment the first completes, whether or not the second did: a
     * variant with more versions than one transaction can carry is the ordinary case, not an edge
     * one. An interrupted delete is safe to send again; it picks up where it stopped.
     * 
     * Nothing is archived. A variant an order or contract pins stops resolving, and hydration drops
     * the reference leniently rather than failing the read.
     * 
     * This removes the **variant**, not one of its versions. To remove a single version, name it on
     * `…/variants/{variant_id}/versions/{valid_from}` — including the one currently in effect, which
     * deliberately has no "delete whichever is live" shorthand: that is exactly the write nobody
     * should be able to ask for without saying which version they meant.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.$DeleteConditionalVariant.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$DeleteConditionalVariant.Responses.$200>
  }
  ['/v1/conditional-pricing/{slug}/entities/{entity_id}/variants/{variant_id}/versions']: {
    /**
     * $appendConditionalVariantVersion - $appendConditionalVariantVersion
     * 
     * Appends a version to a variant: a new set of values taking effect at its own instant.
     * 
     * This is how a price changes. No version carries an end date and nothing is superseded
     * explicitly — the version in effect at an instant is simply the one with the latest `valid_from`
     * at or before it, so appending a later version is the whole of "this is the new price from then
     * on". A version dated in the future is staged and excluded from resolution until its date.
     * 
     * **A version is never refused for being late.** A `valid_from` in the past is written like any
     * other and answered with warnings in `warnings` naming what it moved — what resolves now, what a
     * past-dated read returns, or both. Correcting a price that took effect last week is ordinary
     * work; the alternative, deleting and recreating the variant, breaks every order and contract
     * pinning its id.
     * 
     * What is refused is appending at a `valid_from` the variant already has: that write means either
     * "replace it" or "and also this", and only the caller knows which. The two operations both
     * exist, on the dated version path.
     * 
     * The variant's `conditions` are its identity and are fixed at creation; they may be sent back
     * unchanged but never changed.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.$AppendConditionalVariantVersion.PathParameters> | null,
      data?: Paths.$AppendConditionalVariantVersion.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$AppendConditionalVariantVersion.Responses.$201>
  }
  ['/v1/conditional-pricing/{slug}/entities/{entity_id}/variants/{variant_id}/versions/{valid_from}']: {
    /**
     * $getConditionalVariantVersion - $getConditionalVariantVersion
     * 
     * Returns one specific version of a variant, by the instant it takes effect — what a form editing
     * that version loads.
     * 
     * Exact, never nearest: an instant the variant has no version at is a not-found rather than the
     * version that would be in effect at it. That question is the shorthand read's, or `:resolve`'s.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.$GetConditionalVariantVersion.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$GetConditionalVariantVersion.Responses.$200>
    /**
     * $replaceConditionalVariantVersion - $replaceConditionalVariantVersion
     * 
     * Replaces one version's values wholesale, addressed by its `valid_from`.
     * 
     * Editable whatever its date, at both ends of the timeline: a scheduled version must stay
     * editable so a staged price can be corrected before it goes live rather than accumulating dead
     * versions beside it, and a past one must stay editable because correcting history is ordinary
     * work. Writing a superseded version is answered with a warning naming what a past-dated read now
     * returns; it is not refused.
     * 
     * Attributes the variant may not override are ignored where the body carries them, and their
     * stored value is preserved rather than dropped.
     * 
     */
    'put'(
      parameters?: Parameters<Paths.$ReplaceConditionalVariantVersion.PathParameters> | null,
      data?: Paths.$ReplaceConditionalVariantVersion.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$ReplaceConditionalVariantVersion.Responses.$200>
    /**
     * $patchConditionalVariantVersion - $patchConditionalVariantVersion
     * 
     * Changes only the fields it names on one version, addressed by its `valid_from`.
     * 
     * Everything the body does not mention is left as stored. A partial update that tries to change a
     * pinned condition value is refused: condition values are immutable after a variant is created,
     * and this is the path that rule is most likely to be broken on by accident.
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.$PatchConditionalVariantVersion.PathParameters> | null,
      data?: Paths.$PatchConditionalVariantVersion.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$PatchConditionalVariantVersion.Responses.$200>
    /**
     * $deleteConditionalVariantVersion - $deleteConditionalVariantVersion
     * 
     * Removes one version of a variant.
     * 
     * Withdrawing a scheduled adjustment is what this is for, and deleting a future version warns
     * about nothing — nothing that has resolved, or could have resolved, changes. Deleting a version
     * that has taken effect is allowed too and answered with a warning: it changes what a past-dated
     * read returns, and if it was the version in effect it changes what resolves now.
     * 
     * **A variant's last remaining version cannot be deleted.** Such a variant would still hold its
     * condition tuple and still be selectable, and then resolve to nothing — which is a variant delete
     * wearing a version delete's clothes. Delete the variant instead; that frees the tuple too.
     * 
     * The variant itself is untouched: it keeps its conditions, its tuple and its place in the index.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.$DeleteConditionalVariantVersion.QueryParameters & Paths.$DeleteConditionalVariantVersion.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$DeleteConditionalVariantVersion.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AdditionalProviderData = Components.Schemas.AdditionalProviderData;
export type Address = Components.Schemas.Address;
export type Amounts = Components.Schemas.Amounts;
export type AppendVersionRequest = Components.Schemas.AppendVersionRequest;
export type AvailabilityCheckParams = Components.Schemas.AvailabilityCheckParams;
export type AvailabilityFilters = Components.Schemas.AvailabilityFilters;
export type AvailabilityLocation = Components.Schemas.AvailabilityLocation;
export type AvailabilityResult = Components.Schemas.AvailabilityResult;
export type AverageMarketPriceRecord = Components.Schemas.AverageMarketPriceRecord;
export type AverageMarketPriceResult = Components.Schemas.AverageMarketPriceResult;
export type BaseCompositePrice = Components.Schemas.BaseCompositePrice;
export type BaseCouponCommon = Components.Schemas.BaseCouponCommon;
export type BaseMarketPriceRecord = Components.Schemas.BaseMarketPriceRecord;
export type BasePriceItem = Components.Schemas.BasePriceItem;
export type BasePriceItemCommon = Components.Schemas.BasePriceItemCommon;
export type BasePriceItemDto = Components.Schemas.BasePriceItemDto;
export type BasicAuthCredentials = Components.Schemas.BasicAuthCredentials;
export type BasicAuthIntegration = Components.Schemas.BasicAuthIntegration;
export type BillingPeriod = Components.Schemas.BillingPeriod;
export type CartDto = Components.Schemas.CartDto;
export type CashbackAmount = Components.Schemas.CashbackAmount;
export type CashbackAmounts = Components.Schemas.CashbackAmounts;
export type CashbackPeriod = Components.Schemas.CashbackPeriod;
export type CatalogFieldsParam = Components.Schemas.CatalogFieldsParam;
export type CatalogSearch = Components.Schemas.CatalogSearch;
export type CatalogSearchResult = Components.Schemas.CatalogSearchResult;
export type CheckoutCart = Components.Schemas.CheckoutCart;
export type CheckoutCartResult = Components.Schemas.CheckoutCartResult;
export type CheckoutMode = Components.Schemas.CheckoutMode;
export type CompositePrice = Components.Schemas.CompositePrice;
export type CompositePriceItem = Components.Schemas.CompositePriceItem;
export type CompositePriceItemDto = Components.Schemas.CompositePriceItemDto;
export type ComputePriceParams = Components.Schemas.ComputePriceParams;
export type ComputePriceParamsBase = Components.Schemas.ComputePriceParamsBase;
export type ComputePriceParamsGas = Components.Schemas.ComputePriceParamsGas;
export type ComputePriceParamsPower = Components.Schemas.ComputePriceParamsPower;
export type ComputePriceResult = Components.Schemas.ComputePriceResult;
export type ComputedBasePrice = Components.Schemas.ComputedBasePrice;
export type ComputedPriceBreakdown = Components.Schemas.ComputedPriceBreakdown;
export type ComputedPriceComponents = Components.Schemas.ComputedPriceComponents;
export type ConditionDefinition = Components.Schemas.ConditionDefinition;
export type ConditionSet = Components.Schemas.ConditionSet;
export type ConditionSetCatalog = Components.Schemas.ConditionSetCatalog;
export type ConditionType = Components.Schemas.ConditionType;
export type ConditionalEntitySlug = Components.Schemas.ConditionalEntitySlug;
export type ConditionalPricingError = Components.Schemas.ConditionalPricingError;
export type ConditionalPricingErrorCode = Components.Schemas.ConditionalPricingErrorCode;
export type ConsumptionTypeGetAg = Components.Schemas.ConsumptionTypeGetAg;
export type Coupon = Components.Schemas.Coupon;
export type CouponItem = Components.Schemas.CouponItem;
export type CouponWithoutPromoCodes = Components.Schemas.CouponWithoutPromoCodes;
export type CreateVariantRequest = Components.Schemas.CreateVariantRequest;
export type CreatedVariant = Components.Schemas.CreatedVariant;
export type Currency = Components.Schemas.Currency;
export type CustomContext = Components.Schemas.CustomContext;
export type Customer = Components.Schemas.Customer;
export type DeletedVariant = Components.Schemas.DeletedVariant;
export type DeletedVariantVersion = Components.Schemas.DeletedVariantVersion;
export type DiscountAmounts = Components.Schemas.DiscountAmounts;
export type DynamicTariffInterval = Components.Schemas.DynamicTariffInterval;
export type DynamicTariffMode = Components.Schemas.DynamicTariffMode;
export type EntityId = Components.Schemas.EntityId;
export type EntityItem = Components.Schemas.EntityItem;
export type EntityRelation = Components.Schemas.EntityRelation;
export type Error = Components.Schemas.Error;
export type ExternalCatalogConfigurationRequest = Components.Schemas.ExternalCatalogConfigurationRequest;
export type ExternalCatalogCustomRequest = Components.Schemas.ExternalCatalogCustomRequest;
export type ExternalCatalogItem = Components.Schemas.ExternalCatalogItem;
export type ExternalCatalogJourneyRequest = Components.Schemas.ExternalCatalogJourneyRequest;
export type ExternalCatalogPortalRequest = Components.Schemas.ExternalCatalogPortalRequest;
export type ExternalCatalogRequest = Components.Schemas.ExternalCatalogRequest;
export type ExternalFeeMapping = Components.Schemas.ExternalFeeMapping;
export type ExternalFeeMappings = Components.Schemas.ExternalFeeMappings;
export type ExternalFeeMetadata = Components.Schemas.ExternalFeeMetadata;
export type ExternalLocationMetadata = Components.Schemas.ExternalLocationMetadata;
export type ExternalPriceMetadata = Components.Schemas.ExternalPriceMetadata;
export type File = Components.Schemas.File;
export type GasConcessionType = Components.Schemas.GasConcessionType;
export type GasMarketAreaDetails = Components.Schemas.GasMarketAreaDetails;
export type HistoricMarketPriceRecord = Components.Schemas.HistoricMarketPriceRecord;
export type HistoricMarketPricesResult = Components.Schemas.HistoricMarketPricesResult;
export type HydratedCompositePrice = Components.Schemas.HydratedCompositePrice;
export type IntegrationAuthCredentials = Components.Schemas.IntegrationAuthCredentials;
export type IntegrationCredentialsResult = Components.Schemas.IntegrationCredentialsResult;
export type IntegrationId = Components.Schemas.IntegrationId;
export type JourneyContext = Components.Schemas.JourneyContext;
export type MarketParticipant = Components.Schemas.MarketParticipant;
export type MarkupPricingModel = Components.Schemas.MarkupPricingModel;
export type MetaData = Components.Schemas.MetaData;
export type NonHydratedCompositePrice = Components.Schemas.NonHydratedCompositePrice;
export type OAuthCredentials = Components.Schemas.OAuthCredentials;
export type OAuthIntegration = Components.Schemas.OAuthIntegration;
export type Offer = Components.Schemas.Offer;
export type OfferHighlightConfig = Components.Schemas.OfferHighlightConfig;
export type Opportunity = Components.Schemas.Opportunity;
export type OpportunitySource = Components.Schemas.OpportunitySource;
export type Order = Components.Schemas.Order;
export type OrderPayload = Components.Schemas.OrderPayload;
export type OrderRelation = Components.Schemas.OrderRelation;
export type OrderSource = Components.Schemas.OrderSource;
export type OrderStatus = Components.Schemas.OrderStatus;
export type PatchVersionRequest = Components.Schemas.PatchVersionRequest;
export type PaymentMethod = Components.Schemas.PaymentMethod;
export type PinnedConditions = Components.Schemas.PinnedConditions;
export type PortalContext = Components.Schemas.PortalContext;
export type PowerMarketAreaDetails = Components.Schemas.PowerMarketAreaDetails;
export type PowerMeterType = Components.Schemas.PowerMeterType;
export type Price = Components.Schemas.Price;
export type PriceAmounts = Components.Schemas.PriceAmounts;
export type PriceComponentRelation = Components.Schemas.PriceComponentRelation;
export type PriceConditions = Components.Schemas.PriceConditions;
export type PriceDynamicTariff = Components.Schemas.PriceDynamicTariff;
export type PriceGetAg = Components.Schemas.PriceGetAg;
export type PriceInputMapping = Components.Schemas.PriceInputMapping;
export type PriceInputMappings = Components.Schemas.PriceInputMappings;
export type PriceItem = Components.Schemas.PriceItem;
export type PriceItemDto = Components.Schemas.PriceItemDto;
export type PriceItemDtoUnion = Components.Schemas.PriceItemDtoUnion;
export type PriceItems = Components.Schemas.PriceItems;
export type PriceItemsDto = Components.Schemas.PriceItemsDto;
export type PriceTier = Components.Schemas.PriceTier;
export type PriceTierDisplayMode = Components.Schemas.PriceTierDisplayMode;
export type PricingDetails = Components.Schemas.PricingDetails;
export type PricingDetailsResponse = Components.Schemas.PricingDetailsResponse;
export type PricingModel = Components.Schemas.PricingModel;
export type Product = Components.Schemas.Product;
export type ProductCategory = Components.Schemas.ProductCategory;
export type ProductRecommendation = Components.Schemas.ProductRecommendation;
export type ProductRecommendationResponse = Components.Schemas.ProductRecommendationResponse;
export type ProductRecommendationSearch = Components.Schemas.ProductRecommendationSearch;
export type PromoCode = Components.Schemas.PromoCode;
export type PromoCodeValidationResponse = Components.Schemas.PromoCodeValidationResponse;
export type Provider = Components.Schemas.Provider;
export type RecurrenceAmount = Components.Schemas.RecurrenceAmount;
export type RecurrenceAmountDto = Components.Schemas.RecurrenceAmountDto;
export type RecurrenceAmountWithTax = Components.Schemas.RecurrenceAmountWithTax;
export type RedeemedPromo = Components.Schemas.RedeemedPromo;
export type ReplaceVersionRequest = Components.Schemas.ReplaceVersionRequest;
export type ResolveConditionalEntityRequest = Components.Schemas.ResolveConditionalEntityRequest;
export type ResolveContext = Components.Schemas.ResolveContext;
export type ResolveOptions = Components.Schemas.ResolveOptions;
export type ResolvedVariant = Components.Schemas.ResolvedVariant;
export type ResolvedVariants = Components.Schemas.ResolvedVariants;
export type SalesTax = Components.Schemas.SalesTax;
export type SaveIntegrationCredentialsParams = Components.Schemas.SaveIntegrationCredentialsParams;
export type SearchExternalCatalogParams = Components.Schemas.SearchExternalCatalogParams;
export type SearchExternalCatalogRecommendationsResult = Components.Schemas.SearchExternalCatalogRecommendationsResult;
export type SearchExternalCatalogResult = Components.Schemas.SearchExternalCatalogResult;
export type SearchProvidersParams = Components.Schemas.SearchProvidersParams;
export type SearchProvidersResult = Components.Schemas.SearchProvidersResult;
export type SearchStreetsParams = Components.Schemas.SearchStreetsParams;
export type SearchStreetsResult = Components.Schemas.SearchStreetsResult;
export type SignatureMeta = Components.Schemas.SignatureMeta;
export type SpotMarketBiddingZone = Components.Schemas.SpotMarketBiddingZone;
export type SpotMarketDataFrequency = Components.Schemas.SpotMarketDataFrequency;
export type SpotMarketType = Components.Schemas.SpotMarketType;
export type Street = Components.Schemas.Street;
export type TariffTypeGetAg = Components.Schemas.TariffTypeGetAg;
export type Tax = Components.Schemas.Tax;
export type TaxAmount = Components.Schemas.TaxAmount;
export type TaxAmountBreakdown = Components.Schemas.TaxAmountBreakdown;
export type TaxAmountDto = Components.Schemas.TaxAmountDto;
export type TaxBreakdownInfo = Components.Schemas.TaxBreakdownInfo;
export type TaxItem = Components.Schemas.TaxItem;
export type TierDetails = Components.Schemas.TierDetails;
export type TotalDetails = Components.Schemas.TotalDetails;
export type TypeGetAg = Components.Schemas.TypeGetAg;
export type ValidateAvailabilityFileError = Components.Schemas.ValidateAvailabilityFileError;
export type ValidateAvailabilityFileResult = Components.Schemas.ValidateAvailabilityFileResult;
export type VariantConditions = Components.Schemas.VariantConditions;
export type VariantValues = Components.Schemas.VariantValues;
export type VariantVersion = Components.Schemas.VariantVersion;
export type VariantWriteWarning = Components.Schemas.VariantWriteWarning;
export type VersionWriteWarning = Components.Schemas.VersionWriteWarning;
export type WrittenVariantVersion = Components.Schemas.WrittenVariantVersion;
