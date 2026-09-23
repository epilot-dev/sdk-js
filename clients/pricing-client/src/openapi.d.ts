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
             * When this version takes effect. Omit it to mean now; a timestamp read from the caller's
             * own clock is already a backdate by the time the server judges it, and earns a warning.
             *
             * An RFC 3339 date (`2026-01-01`, read as midnight UTC) or date-time, to at most
             * millisecond precision. A date in the past is accepted; one the variant already has a
             * version at is `VERSION_CONFLICT`.
             *
             * example:
             * 2027-01-01T00:00:00Z
             */
            valid_from?: string;
            /**
             * The overrides this version carries. Attributes the variant may not override are seeded
             * from the version in effect at this version's own `valid_from`.
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
             * Accepted only unchanged, so a client can send back the body it loaded. A variant's
             * conditions are fixed when it is created.
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
             * The flag for entities whose values vary by context. Resolve the values that apply with
             * `POST /v1/conditional-pricing:resolve`.
             *
             */
            is_conditional?: boolean;
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
             * The flag for entities whose values vary by context. Resolve the values that apply with
             * `POST /v1/conditional-pricing:resolve`.
             *
             */
            is_conditional?: boolean;
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
                 * The flag for entities whose values vary by context. Resolve the values that apply with
                 * `POST /v1/conditional-pricing:resolve`.
                 *
                 */
                is_conditional?: boolean;
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
                 * The flag for entities whose values vary by context. Resolve the values that apply with
                 * `POST /v1/conditional-pricing:resolve`.
                 *
                 */
                is_conditional?: boolean;
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
                 * The flag for entities whose values vary by context. Resolve the values that apply with
                 * `POST /v1/conditional-pricing:resolve`.
                 *
                 */
                is_conditional?: boolean;
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
        /**
         * A delete addressing its variant by the situation it applies to.
         *
         * `conditions` is optional because the fallback variant pins nothing: address it with
         * `default: true` and no `conditions`. An item that ends up addressing no variant at all is a
         * per-item `VARIANT_UNPINNED`, and one marking `default` beside `conditions` is refused per
         * item with no code.
         *
         */
        export interface BatchDeleteByConditions {
            /**
             * The conditional entity the variant belongs to.
             * example:
             * price-sp26d1yo
             */
            entity_id: string;
            conditions?: /**
             * The situation this variant applies to: a flat map keyed by condition name. A condition left
             * out is a wildcard, which is what makes adding a condition to a schema non-breaking for
             * existing variants.
             *
             * Exact values only; predicates belong to reads. Values are stored canonicalized for their
             * type: a `date` becomes millisecond-precision UTC, a `daterange` an object carrying `from`
             * and `until` where an empty string is an open end, a `location` of format `zipcode` the
             * postal code itself and one of format `zipcode_town` an object carrying both.
             *
             * `default` and names beginning with `_` are reserved; use the request's `default` flag.
             *
             * example:
             * {
             *   "postal_code": "46045"
             * }
             */
            PinnedConditions;
            /**
             * Address the entity's fallback variant, the one served when nothing else applies.
             */
            default?: boolean;
            /**
             * The one version to remove, by the instant it takes effect. Omitted, the whole variant
             * goes. An RFC 3339 date or date-time, canonicalized before it is matched.
             *
             * example:
             * 2027-01-01T00:00:00Z
             */
            valid_from?: string;
        }
        /**
         * A delete addressing its variant by id.
         */
        export interface BatchDeleteByVariantId {
            /**
             * The conditional entity the variant belongs to. Required: a variant id alone addresses nothing.
             * example:
             * price-sp26d1yo
             */
            entity_id: string;
            /**
             * The variant to remove, or whose version to remove.
             * example:
             * var-46045
             */
            variant_id: string;
            /**
             * The one version to remove, by the instant it takes effect. Omitted, the whole variant
             * goes. An RFC 3339 date or date-time, canonicalized before it is matched.
             *
             * example:
             * 2027-01-01T00:00:00Z
             */
            valid_from?: string;
        }
        /**
         * How many items reached each outcome. Keyed by exactly the values of `BatchDeleteOutcome`,
         * all present, and summing to the length of `results`.
         *
         */
        export interface BatchDeleteCounts {
            /**
             * example:
             * 1
             */
            deleted: number;
            /**
             * example:
             * 1
             */
            skipped: number;
            /**
             * example:
             * 1
             */
            error: number;
        }
        /**
         * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
         * the one version of it to remove. An item carrying both matches neither branch and is an
         * envelope `400`.
         *
         */
        export type BatchDeleteItem = /**
         * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
         * the one version of it to remove. An item carrying both matches neither branch and is an
         * envelope `400`.
         *
         */
        /* A delete addressing its variant by id. */ BatchDeleteByVariantId | /**
         * A delete addressing its variant by the situation it applies to.
         *
         * `conditions` is optional because the fallback variant pins nothing: address it with
         * `default: true` and no `conditions`. An item that ends up addressing no variant at all is a
         * per-item `VARIANT_UNPINNED`, and one marking `default` beside `conditions` is refused per
         * item with no code.
         *
         */
        BatchDeleteByConditions;
        /**
         * What one delete item did.
         *
         * - `deleted`: the variant, or the one version the item named, is gone
         * - `skipped`: the item addressed no such variant or version; a missing entity is an `error`
         * - `error`: this item alone failed, and the entry's `error` says why
         *
         */
        export type BatchDeleteOutcome = "deleted" | "skipped" | "error";
        /**
         * What a batch delete did: one entry per item, in request order, and a count per outcome.
         */
        export interface BatchDeleteResult {
            /**
             * The `correlation_id` the request carried, echoed only when it was sent.
             * example:
             * postal-code-cleanup-2026-09
             */
            correlation_id?: string;
            counts: /**
             * How many items reached each outcome. Keyed by exactly the values of `BatchDeleteOutcome`,
             * all present, and summing to the length of `results`.
             *
             */
            BatchDeleteCounts;
            /**
             * One entry per item, in request order, which is what maps an outcome back to its source row.
             */
            results: /* What one delete item did. Position in `results` maps it back to its source row. */ BatchDeleteResultEntry[];
        }
        /**
         * What one delete item did. Position in `results` maps it back to its source row.
         */
        export interface BatchDeleteResultEntry {
            outcome: /**
             * What one delete item did.
             *
             * - `deleted`: the variant, or the one version the item named, is gone
             * - `skipped`: the item addressed no such variant or version; a missing entity is an `error`
             * - `error`: this item alone failed, and the entry's `error` says why
             *
             */
            BatchDeleteOutcome;
            /**
             * The entity this item removed from, echoed from the item.
             * example:
             * price-sp26d1yo
             */
            entity_id: string;
            /**
             * The variant this item removed, or whose version it removed. Present wherever it is
             * known, so a `skipped` entry for a tuple no variant pins names none.
             *
             * example:
             * var-46045
             */
            variant_id?: string;
            /**
             * The version this item removed, canonicalized to millisecond-precision UTC. Absent where
             * the item removed the whole variant.
             *
             * example:
             * 2027-01-01T00:00:00.000Z
             */
            valid_from?: string;
            /**
             * Things worth knowing that did not stop this item's delete, chiefly which reads the
             * removal moved. Always present and possibly empty, on every outcome.
             *
             */
            warnings: /**
             * Something worth knowing that did not stop a write. One vocabulary for every write; `details`
             * is typed per `code`, and a write raises each code at most once.
             *
             */
            WriteWarning[];
            /**
             * Why this item failed, present only with `outcome: error`:
             * `LAST_VERSION_UNDELETABLE`, `VARIANT_UNPINNED`, the codes a condition tuple that cannot
             * be canonicalized raises, `IDENTIFIER_INVALID`, `VALID_FROM_INVALID`, `WRITE_CONFLICT`,
             * and the per-item `ENTITY_NOT_FOUND`, `ENTITY_TYPE_MISMATCH` and
             * `ENTITY_NOT_CONDITIONAL`. A missing variant or version is `skipped` instead.
             *
             */
            error?: /**
             * Why this item failed, present only with `outcome: error`:
             * `LAST_VERSION_UNDELETABLE`, `VARIANT_UNPINNED`, the codes a condition tuple that cannot
             * be canonicalized raises, `IDENTIFIER_INVALID`, `VALID_FROM_INVALID`, `WRITE_CONFLICT`,
             * and the per-item `ENTITY_NOT_FOUND`, `ENTITY_TYPE_MISMATCH` and
             * `ENTITY_NOT_CONDITIONAL`. A missing variant or version is `skipped` instead.
             *
             */
            {
                code: "SCHEMA_NOT_FOUND";
                details: {
                    /**
                     * The entity type the request addressed.
                     * example:
                     * price
                     */
                    schema: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "ENTITY_NOT_FOUND";
                details: {
                    /**
                     * The entity type the request addressed.
                     * example:
                     * price
                     */
                    schema: string;
                    /**
                     * The conditional entity the request addressed.
                     * example:
                     * price-sp26d1yo
                     */
                    entity_id: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "ENTITY_TYPE_MISMATCH";
                details: {
                    /**
                     * The entity type the request addressed.
                     * example:
                     * price
                     */
                    schema: string;
                    /**
                     * The conditional entity the request addressed.
                     * example:
                     * price-sp26d1yo
                     */
                    entity_id: string;
                    /**
                     * The entity type that id belongs to. Where it is a conditional entity type,
                     * it is the slug to send instead.
                     *
                     * example:
                     * product
                     */
                    actual_schema: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "ENTITY_NOT_CONDITIONAL";
                details: {
                    /**
                     * The entity type the request addressed.
                     * example:
                     * price
                     */
                    schema: string;
                    /**
                     * The conditional entity the request addressed.
                     * example:
                     * price-sp26d1yo
                     */
                    entity_id: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VARIANT_NOT_FOUND";
                details: {
                    /**
                     * The conditional entity the request addressed.
                     * example:
                     * price-sp26d1yo
                     */
                    entity_id: string;
                    /**
                     * The variant the request addressed.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VERSION_NOT_FOUND";
                details: {
                    /**
                     * The variant the request addressed.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                    /**
                     * The version the request addressed, by the instant it takes effect from.
                     * example:
                     * 2027-01-01T00:00:00.000Z
                     */
                    valid_from: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "NO_MATCHES";
                details: {
                    /**
                     * The entity type the request addressed.
                     * example:
                     * price
                     */
                    schema: string;
                    /**
                     * The conditional entity the resolve was scoped to.
                     * example:
                     * price-sp26d1yo
                     */
                    entity_id: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "NO_ACTIVE_VERSION";
                details: {
                    /**
                     * The variant the request addressed.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                    /**
                     * The instant a version in effect was asked for at.
                     * example:
                     * 2026-06-01T00:00:00.000Z
                     */
                    as_of: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "AMBIGUOUS_RESOLUTION";
                details: {
                    /**
                     * Every variant that applied, each with the conditions it pins.
                     */
                    candidates: [
                        {
                            /**
                             * The candidate variant.
                             * example:
                             * var-46045
                             */
                            variant_id: string;
                            conditions: /**
                             * A variant's pinned conditions as a reader sees them: the pins the schema declares, plus a
                             * boolean `default` saying whether this is the entity's fallback.
                             *
                             * example:
                             * {
                             *   "postal_code": "46045",
                             *   "default": false
                             * }
                             */
                            VariantConditions;
                        },
                        {
                            /**
                             * The candidate variant.
                             * example:
                             * var-46045
                             */
                            variant_id: string;
                            conditions: /**
                             * A variant's pinned conditions as a reader sees them: the pins the schema declares, plus a
                             * boolean `default` saying whether this is the entity's fallback.
                             *
                             * example:
                             * {
                             *   "postal_code": "46045",
                             *   "default": false
                             * }
                             */
                            VariantConditions;
                        },
                        ...{
                            /**
                             * The candidate variant.
                             * example:
                             * var-46045
                             */
                            variant_id: string;
                            conditions: /**
                             * A variant's pinned conditions as a reader sees them: the pins the schema declares, plus a
                             * boolean `default` saying whether this is the entity's fallback.
                             *
                             * example:
                             * {
                             *   "postal_code": "46045",
                             *   "default": false
                             * }
                             */
                            VariantConditions;
                        }[]
                    ];
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "TUPLE_CONFLICT";
                details: {
                    /**
                     * The variant the write addressed.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                    /**
                     * The variant already holding the tuple, where the write read it back.
                     * example:
                     * var-50667
                     */
                    conflicting_variant_id?: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VERSION_CONFLICT";
                details: {
                    /**
                     * The variant the write addressed.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                    /**
                     * The instant already claimed by a version of that variant.
                     * example:
                     * 2027-01-01T00:00:00.000Z
                     */
                    valid_from: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "CONDITION_UNDEFINED";
                details: {
                    /**
                     * The condition the request named and the schema does not define.
                     * example:
                     * postal_code
                     */
                    condition_name: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VARIANT_PIN_UNDECLARED";
                details: {
                    /**
                     * The condition the variant pins and the schema no longer declares.
                     * example:
                     * postal_code
                     */
                    condition_name: string;
                    /**
                     * One variant carrying such a pin.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "OPERATOR_UNSUPPORTED";
                details: {
                    /**
                     * example:
                     * postal_code
                     */
                    condition_name: string;
                    /**
                     * The type the schema declares that condition with.
                     * example:
                     * location
                     */
                    condition_type: string;
                    /**
                     * The predicate the context or filter asked for, or `sort` where a listing
                     * asked to order by a condition whose type has no order.
                     *
                     * example:
                     * between
                     */
                    operator: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "CONTEXT_FORMAT_INVALID";
                details: {
                    /**
                     * example:
                     * postal_code
                     */
                    condition_name: string;
                    /**
                     * What a value for that condition has to be, in prose.
                     * example:
                     * a postal code
                     */
                    expected: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "CONDITION_VALUE_INVALID";
                details: {
                    /**
                     * example:
                     * segment
                     */
                    condition_name: string;
                    /**
                     * The value the write pinned, as it arrived.
                     * example:
                     * industrial
                     */
                    value: any;
                    /**
                     * The vocabulary as enforced, after any entries this deploy cannot read have
                     * been dropped.
                     *
                     * example:
                     * [
                     *   "private",
                     *   "commercial"
                     * ]
                     */
                    options: [
                        string,
                        ...string[]
                    ];
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "CONDITION_UNCONFIGURED";
                details: {
                    /**
                     * The condition whose vocabulary is not configured yet.
                     * example:
                     * segment
                     */
                    condition_name: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "TOO_MANY_MATCHES";
                details: {
                    /**
                     * The most variants one resolve may compose.
                     * example:
                     * 100
                     */
                    limit: number;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "WRITE_CONFLICT";
                details: {
                    /**
                     * The variant the write addressed.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                    /**
                     * The version the write addressed, where one was addressed.
                     * example:
                     * 2027-01-01T00:00:00.000Z
                     */
                    valid_from?: string;
                    /**
                     * The revision the write required the stored version to still be at.
                     * example:
                     * 3
                     */
                    expected_revision?: number;
                    /**
                     * The revision the version is actually at, where the failed write read it back.
                     * example:
                     * 4
                     */
                    current_revision?: number;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "OFFSET_WINDOW_EXCEEDED";
                details: {
                    /**
                     * The offset the request asked for.
                     * example:
                     * 24990
                     */
                    from: number;
                    /**
                     * The page size the request asked for, after clamping.
                     * example:
                     * 25
                     */
                    size: number;
                    /**
                     * The last row this deploy's index will serve from an offset.
                     * example:
                     * 25000
                     */
                    window: number;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "CURSOR_INVALID";
                details: {
                    /**
                     * Which check the cursor failed, in prose.
                     * example:
                     * The cursor was issued for a different sort order
                     */
                    reason: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VARIANT_LIMIT_REACHED";
                details: {
                    /**
                     * Variants this entity already holds.
                     * example:
                     * 5000
                     */
                    variant_count: number;
                    /**
                     * Variants this entity may hold. Configurable per deploy.
                     * example:
                     * 5000
                     */
                    cap: number;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "PIN_FORMAT_INVALID";
                details: {
                    /**
                     * example:
                     * valid_period
                     */
                    condition_name: string;
                    /**
                     * The type the schema declares that condition with.
                     * example:
                     * daterange
                     */
                    condition_type: string;
                    /**
                     * What a pin for that condition has to be, in prose.
                     * example:
                     * an object carrying a from and an until date, either may be open
                     */
                    expected: string;
                    /**
                     * The value the write pinned, as it arrived.
                     * example:
                     * 2027-01-01/2027-12-31
                     */
                    value: any;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VARIANT_UNPINNED";
                details: {
                    /**
                     * The conditional entity the item addressed.
                     * example:
                     * price-sp26d1yo
                     */
                    entity_id: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "LAST_VERSION_UNDELETABLE";
                details: {
                    /**
                     * The variant whose last version the delete addressed.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                    /**
                     * The version the delete addressed, by the instant it takes effect from.
                     * example:
                     * 2027-01-01T00:00:00.000Z
                     */
                    valid_from: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "CONDITION_UNREADABLE";
                details: {
                    /**
                     * The condition whose definition this deploy cannot read.
                     * example:
                     * delivery_area
                     */
                    condition_name: string;
                    /**
                     * Which field of the definition cannot be read, named as the schema spells it.
                     * example:
                     * format
                     */
                    unreadable: "format" | "options";
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "SORT_INVALID";
                details: {
                    /**
                     * What a `sort` has to be, in prose.
                     * example:
                     * conditions.<name>:asc or conditions.<name>:desc, naming a string, select, number or date condition
                     */
                    expected: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "DEFAULT_MARKER_RESERVED";
                details: {
                    /**
                     * The marker, spelled as the request spelled it.
                     * example:
                     * default
                     */
                    condition_name: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "DEFAULT_VARIANT_PINS_CONDITIONS";
                details: {
                    /**
                     * The conditions the write pinned beside the marker.
                     * example:
                     * [
                     *   "postal_code"
                     * ]
                     */
                    condition_names: string[];
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VALID_FROM_IMMUTABLE";
                details: {
                    /**
                     * The version the request addressed, by the instant it takes effect from.
                     * example:
                     * 2027-01-01T00:00:00.000Z
                     */
                    addressed: string;
                    /**
                     * The instant the body asked for instead, canonicalized.
                     * example:
                     * 2027-04-01T00:00:00.000Z
                     */
                    requested: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VARIANT_CONDITIONS_IMMUTABLE";
                details: {
                    /**
                     * The variant whose conditions the write would have changed.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "IDENTIFIER_INVALID";
                details: {
                    /**
                     * Which id could not be keyed by, named as the request names it.
                     * example:
                     * entity_id
                     */
                    field: "entity_id" | "variant_id";
                    /**
                     * Which of the three checks the id failed, in prose.
                     * example:
                     * it carries a character this scheme does not admit
                     */
                    reason: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VALID_FROM_INVALID";
                details: {
                    /**
                     * What a `valid_from` has to be, in prose.
                     * example:
                     * an RFC 3339 date, optionally with a time to at most millisecond precision and an optional UTC offset
                     */
                    expected: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VALUE_UNSTORABLE";
                details: {
                    /**
                     * Where the value sits, as a dotted path of the request's own keys, with array
                     * entries by index.
                     *
                     * example:
                     * values.tiers.0.unit_amount
                     */
                    path: string;
                    /**
                     * What about the value cannot be stored, in prose.
                     * example:
                     * the non-finite number Infinity
                     */
                    reason: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[];
            } | {
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
                error?: /**
                 * The `error` field of an error response: the message, or — where the request failed
                 * validation before any handler ran — the validation errors themselves.
                 *
                 */
                ReportedError;
            };
        }
        /**
         * A batch of variant and version deletes under one schema, each item naming the entity it removes from.
         */
        export interface BatchDeleteVariantsRequest {
            /**
             * An opaque string echoed back verbatim when it was sent, and never interpreted.
             * example:
             * postal-code-cleanup-2026-09
             */
            correlation_id?: string;
            /**
             * The deletes to apply, in the order they should apply where two of them address the same
             * variant — decided after every condition tuple has been resolved to a variant id. At most
             * 100 per call.
             *
             */
            items: [
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?,
                /**
                 * One delete: the variant, addressed by id or by the condition tuple it pins, and optionally
                 * the one version of it to remove. An item carrying both matches neither branch and is an
                 * envelope `400`.
                 *
                 */
                BatchDeleteItem?
            ];
        }
        /**
         * How many items reached each outcome. Keyed by exactly the values of `BatchUpsertOutcome`,
         * all present, and summing to the length of `results`.
         *
         */
        export interface BatchUpsertCounts {
            /**
             * example:
             * 1
             */
            variant_created: number;
            /**
             * example:
             * 1
             */
            version_created: number;
            /**
             * example:
             * 1
             */
            updated: number;
            /**
             * example:
             * 1
             */
            skipped: number;
            /**
             * example:
             * 1
             */
            error: number;
        }
        /**
         * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
         * existing condition tuple appends a version to the variant holding it rather than conflicting.
         *
         */
        export interface BatchUpsertItem {
            /**
             * The conditional entity this item writes to.
             * example:
             * price-sp26d1yo
             */
            entity_id: string;
            conditions?: /**
             * The situation this variant applies to: a flat map keyed by condition name. A condition left
             * out is a wildcard, which is what makes adding a condition to a schema non-breaking for
             * existing variants.
             *
             * Exact values only; predicates belong to reads. Values are stored canonicalized for their
             * type: a `date` becomes millisecond-precision UTC, a `daterange` an object carrying `from`
             * and `until` where an empty string is an open end, a `location` of format `zipcode` the
             * postal code itself and one of format `zipcode_town` an object carrying both.
             *
             * `default` and names beginning with `_` are reserved; use the request's `default` flag.
             *
             * example:
             * {
             *   "postal_code": "46045"
             * }
             */
            PinnedConditions;
            /**
             * Mark this variant as the entity's fallback, as a create does. An item that pins nothing
             * and is not the default is `VARIANT_UNPINNED`.
             *
             */
            default?: boolean;
            /**
             * When the version this item writes takes effect. Omitted, it is a last-write-wins write
             * with no `skipped` detection; a past instant is accepted and reported in this item's
             * `warnings`.
             *
             * An RFC 3339 date (`2026-01-01`, read as midnight UTC) or date-time, to at most
             * millisecond precision.
             *
             * example:
             * 2027-01-01T00:00:00Z
             */
            valid_from?: string;
            values: /**
             * The values this version overrides on the base entity, keyed by entity field name.
             *
             * A field is overridable if its attribute declares `overridable_attribute` — which readonly,
             * hidden, computed and metadata fields, and types no variant may override, cannot be given —
             * or if a capability declaring `overridable_attribute` names it in `managed_fields`, which
             * excludes only readonly and metadata fields.
             *
             * Fields that are not overridable are reported in the write's `warnings` rather than rejected,
             * and keep whatever value they already had. An append seeds them from the version in effect at
             * its own `valid_from`.
             *
             * A composite price's `price_components` is an ordinary overridable relation attribute,
             * referencing component entities rather than variants or versions.
             *
             * example:
             * {
             *   "unit_amount": 2499,
             *   "unit_amount_decimal": "24.99"
             * }
             */
            VariantValues;
        }
        /**
         * What one upsert item did, derived from what was stored.
         *
         * - `variant_created`: the condition tuple was unknown, so a variant and its first version
         *   were created
         * - `version_created`: the tuple was known and had no version at the item's `valid_from`
         * - `updated`: a version existed at that exact instant and was written in place
         * - `skipped`: the values are identical to what is stored; not detected for an item without
         *   `valid_from`
         * - `error`: this item alone failed, and the entry's `error` says why
         *
         */
        export type BatchUpsertOutcome = "variant_created" | "version_created" | "updated" | "skipped" | "error";
        /**
         * What a batch upsert did: one entry per item, in request order, and a count per outcome.
         */
        export interface BatchUpsertResult {
            /**
             * The `correlation_id` the request carried, echoed only when it was sent.
             * example:
             * tariff-refresh-2027-01
             */
            correlation_id?: string;
            counts: /**
             * How many items reached each outcome. Keyed by exactly the values of `BatchUpsertOutcome`,
             * all present, and summing to the length of `results`.
             *
             */
            BatchUpsertCounts;
            /**
             * One entry per item, in request order, which is what maps an outcome back to its source row.
             */
            results: /* What one upsert item did. Position in `results` maps it back to its source row. */ BatchUpsertResultEntry[];
        }
        /**
         * What one upsert item did. Position in `results` maps it back to its source row.
         */
        export interface BatchUpsertResultEntry {
            outcome: /**
             * What one upsert item did, derived from what was stored.
             *
             * - `variant_created`: the condition tuple was unknown, so a variant and its first version
             *   were created
             * - `version_created`: the tuple was known and had no version at the item's `valid_from`
             * - `updated`: a version existed at that exact instant and was written in place
             * - `skipped`: the values are identical to what is stored; not detected for an item without
             *   `valid_from`
             * - `error`: this item alone failed, and the entry's `error` says why
             *
             */
            BatchUpsertOutcome;
            /**
             * The entity this item wrote to, echoed from the item.
             * example:
             * price-sp26d1yo
             */
            entity_id: string;
            /**
             * The variant this item created or wrote to. Present on every outcome but `error`.
             * example:
             * var-46045
             */
            variant_id?: string;
            /**
             * The version this item wrote, canonicalized to millisecond-precision UTC. Present on
             * every outcome but `error`, including for an item that sent none.
             *
             * example:
             * 2027-01-01T00:00:00.000Z
             */
            valid_from?: string;
            /**
             * Things worth knowing that did not stop this item's write. Always present and possibly
             * empty, on every outcome. Fires per item, with no batch-level deduplication.
             *
             */
            warnings: /**
             * Something worth knowing that did not stop a write. One vocabulary for every write; `details`
             * is typed per `code`, and a write raises each code at most once.
             *
             */
            WriteWarning[];
            /**
             * Why this item failed, present only with `outcome: error`: the codes a variant create
             * raises, plus `ENTITY_NOT_FOUND`, `ENTITY_TYPE_MISMATCH` and `ENTITY_NOT_CONDITIONAL`,
             * which are per item because each item names its own entity. Never `TUPLE_CONFLICT` or
             * `VERSION_CONFLICT`.
             *
             */
            error?: /**
             * Why this item failed, present only with `outcome: error`: the codes a variant create
             * raises, plus `ENTITY_NOT_FOUND`, `ENTITY_TYPE_MISMATCH` and `ENTITY_NOT_CONDITIONAL`,
             * which are per item because each item names its own entity. Never `TUPLE_CONFLICT` or
             * `VERSION_CONFLICT`.
             *
             */
            {
                code: "SCHEMA_NOT_FOUND";
                details: {
                    /**
                     * The entity type the request addressed.
                     * example:
                     * price
                     */
                    schema: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "ENTITY_NOT_FOUND";
                details: {
                    /**
                     * The entity type the request addressed.
                     * example:
                     * price
                     */
                    schema: string;
                    /**
                     * The conditional entity the request addressed.
                     * example:
                     * price-sp26d1yo
                     */
                    entity_id: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "ENTITY_TYPE_MISMATCH";
                details: {
                    /**
                     * The entity type the request addressed.
                     * example:
                     * price
                     */
                    schema: string;
                    /**
                     * The conditional entity the request addressed.
                     * example:
                     * price-sp26d1yo
                     */
                    entity_id: string;
                    /**
                     * The entity type that id belongs to. Where it is a conditional entity type,
                     * it is the slug to send instead.
                     *
                     * example:
                     * product
                     */
                    actual_schema: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "ENTITY_NOT_CONDITIONAL";
                details: {
                    /**
                     * The entity type the request addressed.
                     * example:
                     * price
                     */
                    schema: string;
                    /**
                     * The conditional entity the request addressed.
                     * example:
                     * price-sp26d1yo
                     */
                    entity_id: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VARIANT_NOT_FOUND";
                details: {
                    /**
                     * The conditional entity the request addressed.
                     * example:
                     * price-sp26d1yo
                     */
                    entity_id: string;
                    /**
                     * The variant the request addressed.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VERSION_NOT_FOUND";
                details: {
                    /**
                     * The variant the request addressed.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                    /**
                     * The version the request addressed, by the instant it takes effect from.
                     * example:
                     * 2027-01-01T00:00:00.000Z
                     */
                    valid_from: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "NO_MATCHES";
                details: {
                    /**
                     * The entity type the request addressed.
                     * example:
                     * price
                     */
                    schema: string;
                    /**
                     * The conditional entity the resolve was scoped to.
                     * example:
                     * price-sp26d1yo
                     */
                    entity_id: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "NO_ACTIVE_VERSION";
                details: {
                    /**
                     * The variant the request addressed.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                    /**
                     * The instant a version in effect was asked for at.
                     * example:
                     * 2026-06-01T00:00:00.000Z
                     */
                    as_of: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "AMBIGUOUS_RESOLUTION";
                details: {
                    /**
                     * Every variant that applied, each with the conditions it pins.
                     */
                    candidates: [
                        {
                            /**
                             * The candidate variant.
                             * example:
                             * var-46045
                             */
                            variant_id: string;
                            conditions: /**
                             * A variant's pinned conditions as a reader sees them: the pins the schema declares, plus a
                             * boolean `default` saying whether this is the entity's fallback.
                             *
                             * example:
                             * {
                             *   "postal_code": "46045",
                             *   "default": false
                             * }
                             */
                            VariantConditions;
                        },
                        {
                            /**
                             * The candidate variant.
                             * example:
                             * var-46045
                             */
                            variant_id: string;
                            conditions: /**
                             * A variant's pinned conditions as a reader sees them: the pins the schema declares, plus a
                             * boolean `default` saying whether this is the entity's fallback.
                             *
                             * example:
                             * {
                             *   "postal_code": "46045",
                             *   "default": false
                             * }
                             */
                            VariantConditions;
                        },
                        ...{
                            /**
                             * The candidate variant.
                             * example:
                             * var-46045
                             */
                            variant_id: string;
                            conditions: /**
                             * A variant's pinned conditions as a reader sees them: the pins the schema declares, plus a
                             * boolean `default` saying whether this is the entity's fallback.
                             *
                             * example:
                             * {
                             *   "postal_code": "46045",
                             *   "default": false
                             * }
                             */
                            VariantConditions;
                        }[]
                    ];
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "TUPLE_CONFLICT";
                details: {
                    /**
                     * The variant the write addressed.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                    /**
                     * The variant already holding the tuple, where the write read it back.
                     * example:
                     * var-50667
                     */
                    conflicting_variant_id?: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VERSION_CONFLICT";
                details: {
                    /**
                     * The variant the write addressed.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                    /**
                     * The instant already claimed by a version of that variant.
                     * example:
                     * 2027-01-01T00:00:00.000Z
                     */
                    valid_from: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "CONDITION_UNDEFINED";
                details: {
                    /**
                     * The condition the request named and the schema does not define.
                     * example:
                     * postal_code
                     */
                    condition_name: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VARIANT_PIN_UNDECLARED";
                details: {
                    /**
                     * The condition the variant pins and the schema no longer declares.
                     * example:
                     * postal_code
                     */
                    condition_name: string;
                    /**
                     * One variant carrying such a pin.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "OPERATOR_UNSUPPORTED";
                details: {
                    /**
                     * example:
                     * postal_code
                     */
                    condition_name: string;
                    /**
                     * The type the schema declares that condition with.
                     * example:
                     * location
                     */
                    condition_type: string;
                    /**
                     * The predicate the context or filter asked for, or `sort` where a listing
                     * asked to order by a condition whose type has no order.
                     *
                     * example:
                     * between
                     */
                    operator: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "CONTEXT_FORMAT_INVALID";
                details: {
                    /**
                     * example:
                     * postal_code
                     */
                    condition_name: string;
                    /**
                     * What a value for that condition has to be, in prose.
                     * example:
                     * a postal code
                     */
                    expected: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "CONDITION_VALUE_INVALID";
                details: {
                    /**
                     * example:
                     * segment
                     */
                    condition_name: string;
                    /**
                     * The value the write pinned, as it arrived.
                     * example:
                     * industrial
                     */
                    value: any;
                    /**
                     * The vocabulary as enforced, after any entries this deploy cannot read have
                     * been dropped.
                     *
                     * example:
                     * [
                     *   "private",
                     *   "commercial"
                     * ]
                     */
                    options: [
                        string,
                        ...string[]
                    ];
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "CONDITION_UNCONFIGURED";
                details: {
                    /**
                     * The condition whose vocabulary is not configured yet.
                     * example:
                     * segment
                     */
                    condition_name: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "TOO_MANY_MATCHES";
                details: {
                    /**
                     * The most variants one resolve may compose.
                     * example:
                     * 100
                     */
                    limit: number;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "WRITE_CONFLICT";
                details: {
                    /**
                     * The variant the write addressed.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                    /**
                     * The version the write addressed, where one was addressed.
                     * example:
                     * 2027-01-01T00:00:00.000Z
                     */
                    valid_from?: string;
                    /**
                     * The revision the write required the stored version to still be at.
                     * example:
                     * 3
                     */
                    expected_revision?: number;
                    /**
                     * The revision the version is actually at, where the failed write read it back.
                     * example:
                     * 4
                     */
                    current_revision?: number;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "OFFSET_WINDOW_EXCEEDED";
                details: {
                    /**
                     * The offset the request asked for.
                     * example:
                     * 24990
                     */
                    from: number;
                    /**
                     * The page size the request asked for, after clamping.
                     * example:
                     * 25
                     */
                    size: number;
                    /**
                     * The last row this deploy's index will serve from an offset.
                     * example:
                     * 25000
                     */
                    window: number;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "CURSOR_INVALID";
                details: {
                    /**
                     * Which check the cursor failed, in prose.
                     * example:
                     * The cursor was issued for a different sort order
                     */
                    reason: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VARIANT_LIMIT_REACHED";
                details: {
                    /**
                     * Variants this entity already holds.
                     * example:
                     * 5000
                     */
                    variant_count: number;
                    /**
                     * Variants this entity may hold. Configurable per deploy.
                     * example:
                     * 5000
                     */
                    cap: number;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "PIN_FORMAT_INVALID";
                details: {
                    /**
                     * example:
                     * valid_period
                     */
                    condition_name: string;
                    /**
                     * The type the schema declares that condition with.
                     * example:
                     * daterange
                     */
                    condition_type: string;
                    /**
                     * What a pin for that condition has to be, in prose.
                     * example:
                     * an object carrying a from and an until date, either may be open
                     */
                    expected: string;
                    /**
                     * The value the write pinned, as it arrived.
                     * example:
                     * 2027-01-01/2027-12-31
                     */
                    value: any;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VARIANT_UNPINNED";
                details: {
                    /**
                     * The conditional entity the item addressed.
                     * example:
                     * price-sp26d1yo
                     */
                    entity_id: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "LAST_VERSION_UNDELETABLE";
                details: {
                    /**
                     * The variant whose last version the delete addressed.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                    /**
                     * The version the delete addressed, by the instant it takes effect from.
                     * example:
                     * 2027-01-01T00:00:00.000Z
                     */
                    valid_from: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "CONDITION_UNREADABLE";
                details: {
                    /**
                     * The condition whose definition this deploy cannot read.
                     * example:
                     * delivery_area
                     */
                    condition_name: string;
                    /**
                     * Which field of the definition cannot be read, named as the schema spells it.
                     * example:
                     * format
                     */
                    unreadable: "format" | "options";
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "SORT_INVALID";
                details: {
                    /**
                     * What a `sort` has to be, in prose.
                     * example:
                     * conditions.<name>:asc or conditions.<name>:desc, naming a string, select, number or date condition
                     */
                    expected: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "DEFAULT_MARKER_RESERVED";
                details: {
                    /**
                     * The marker, spelled as the request spelled it.
                     * example:
                     * default
                     */
                    condition_name: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "DEFAULT_VARIANT_PINS_CONDITIONS";
                details: {
                    /**
                     * The conditions the write pinned beside the marker.
                     * example:
                     * [
                     *   "postal_code"
                     * ]
                     */
                    condition_names: string[];
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VALID_FROM_IMMUTABLE";
                details: {
                    /**
                     * The version the request addressed, by the instant it takes effect from.
                     * example:
                     * 2027-01-01T00:00:00.000Z
                     */
                    addressed: string;
                    /**
                     * The instant the body asked for instead, canonicalized.
                     * example:
                     * 2027-04-01T00:00:00.000Z
                     */
                    requested: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VARIANT_CONDITIONS_IMMUTABLE";
                details: {
                    /**
                     * The variant whose conditions the write would have changed.
                     * example:
                     * var-46045
                     */
                    variant_id: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "IDENTIFIER_INVALID";
                details: {
                    /**
                     * Which id could not be keyed by, named as the request names it.
                     * example:
                     * entity_id
                     */
                    field: "entity_id" | "variant_id";
                    /**
                     * Which of the three checks the id failed, in prose.
                     * example:
                     * it carries a character this scheme does not admit
                     */
                    reason: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VALID_FROM_INVALID";
                details: {
                    /**
                     * What a `valid_from` has to be, in prose.
                     * example:
                     * an RFC 3339 date, optionally with a time to at most millisecond precision and an optional UTC offset
                     */
                    expected: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
                code: "VALUE_UNSTORABLE";
                details: {
                    /**
                     * Where the value sits, as a dotted path of the request's own keys, with array
                     * entries by index.
                     *
                     * example:
                     * values.tiers.0.unit_amount
                     */
                    path: string;
                    /**
                     * What about the value cannot be stored, in prose.
                     * example:
                     * the non-finite number Infinity
                     */
                    reason: string;
                };
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
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                error?: /**
                 * What went wrong. The same string as `message`, except on a request-validation
                 * failure, which puts the list of validation errors here instead.
                 *
                 */
                string | {
                    [name: string]: any;
                }[] | string | {
                    [name: string]: any;
                }[];
            } | {
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
                error?: /**
                 * The `error` field of an error response: the message, or — where the request failed
                 * validation before any handler ran — the validation errors themselves.
                 *
                 */
                ReportedError;
            };
        }
        /**
         * A batch of variant writes under one schema, each item naming the entity it writes to.
         */
        export interface BatchUpsertVariantsRequest {
            /**
             * An opaque string echoed back verbatim when it was sent, and never interpreted.
             * example:
             * tariff-refresh-2027-01
             */
            correlation_id?: string;
            /**
             * The writes to apply, in the order they should apply where two of them address the same
             * variant. At most 100 per call, which is distinct from the per-entity variant cap.
             *
             */
            items: [
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?,
                /**
                 * One variant write: the single-item create's body plus `entity_id`, and no `variant_id`. An
                 * existing condition tuple appends a version to the variant holding it rather than conflicting.
                 *
                 */
                BatchUpsertItem?
            ];
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
                 * The flag for entities whose values vary by context. Resolve the values that apply with
                 * `POST /v1/conditional-pricing:resolve`.
                 *
                 */
                is_conditional?: boolean;
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
                 * The flag for entities whose values vary by context. Resolve the values that apply with
                 * `POST /v1/conditional-pricing:resolve`.
                 *
                 */
                is_conditional?: boolean;
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
                 * The flag for entities whose values vary by context. Resolve the values that apply with
                 * `POST /v1/conditional-pricing:resolve`.
                 *
                 */
                is_conditional?: boolean;
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
         * Echo of the request parameters used to compute the price, in the caller-facing shape.
         */
        export interface ComputePriceInputs {
            [name: string]: any;
            type?: ProductCategory;
            consumptionHT?: number;
            consumptionNT?: number;
            consumptionType?: ConsumptionTypeGetAg;
            zipCode?: string;
            city?: string;
            providerId?: string;
            billingPeriod?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time";
            referenceDate?: string; // date
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
            /**
             * The city the postal code belongs to. Not used for price computation,
             * only echoed back in `inputs` for display purposes.
             *
             */
            city?: string;
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
             * The city the postal code belongs to. Not used for price computation,
             * only echoed back in `inputs` for display purposes.
             *
             */
            city?: string;
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
             * The city the postal code belongs to. Not used for price computation,
             * only echoed back in `inputs` for display purposes.
             *
             */
            city?: string;
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
            /**
             * A snapshot of the parameters this price was computed from, for display purposes
             * (e.g. showing "computed for 3,500 kWh/year"). Included in the `_meta` signature.
             *
             */
            inputs?: {
                [name: string]: any;
                type?: ProductCategory;
                consumptionHT?: number;
                consumptionNT?: number;
                consumptionType?: ConsumptionTypeGetAg;
                zipCode?: string;
                city?: string;
                providerId?: string;
                billingPeriod?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time";
                referenceDate?: string; // date
            };
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
         * One condition dimension, in the shape a schema's `conditions` array holds it — copy it in verbatim.
         */
        export interface ConditionDefinition {
            /**
             * Stable identity of the condition, supplied on creation and round-tripped unchanged. A
             * catalog condition keeps the id the catalog gives it.
             *
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id: string; // uuid
            /**
             * How variants and resolve contexts refer to this condition, independent of attribute
             * names. `default` and names beginning with `_` are reserved and are ignored here.
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
             * The kind of value a condition holds, which decides how a pinned value is matched against a
             * resolve context.
             *
             * - `string`: an arbitrary string, matched exactly and case-sensitively
             * - `number`: a numeric value
             * - `date`: a single date
             * - `daterange`: a window with a from and an until timestamp; either end may be left open
             * - `boolean`: a true/false value
             * - `select`: one of the values declared in `options`, which is always a closed vocabulary
             * - `location`: a geographic value, shaped by `format`
             *
             */
            ConditionType;
            /**
             * The vocabulary of a `select` condition, absent for every other type. Each entry is the
             * value itself or an object carrying that value and a display `title`, which is never
             * matched.
             *
             * Always closed: a pinned value outside it is `CONDITION_VALUE_INVALID`, and while
             * `options` is absent or empty the condition admits no pin at all. Not enforced on
             * resolve, where a context value outside the vocabulary matches nothing.
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
            format?: "zipcode" | "zipcode_town";
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
            conditions: /* One condition dimension, in the shape a schema's `conditions` array holds it — copy it in verbatim. */ ConditionDefinition[];
        }
        export interface ConditionSetCatalog {
            /**
             * The condition sets built in for the requested entity type, in the order they are offered.
             */
            results: /* A named bundle of condition definitions, built in for one entity type. */ ConditionSet[];
        }
        /**
         * The kind of value a condition holds, which decides how a pinned value is matched against a
         * resolve context.
         *
         * - `string`: an arbitrary string, matched exactly and case-sensitively
         * - `number`: a numeric value
         * - `date`: a single date
         * - `daterange`: a window with a from and an until timestamp; either end may be left open
         * - `boolean`: a true/false value
         * - `select`: one of the values declared in `options`, which is always a closed vocabulary
         * - `location`: a geographic value, shaped by `format`
         *
         */
        export type ConditionType = "string" | "number" | "date" | "daterange" | "boolean" | "select" | "location";
        /**
         * Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route.
         */
        export type ConditionalEntitySlug = "product" | "price" | "coupon";
        /**
         * An error from a conditional-pricing operation, carrying a `code` plus the structured data
         * that code explains. `details` is typed per code: narrow on `code` and the object under it
         * declares exactly the fields that code sends.
         *
         * A request these schemas reject is answered by the request validator with a message and
         * carries neither `code` nor `details` — the last member of the union.
         *
         */
        export type ConditionalPricingError = /**
         * An error from a conditional-pricing operation, carrying a `code` plus the structured data
         * that code explains. `details` is typed per code: narrow on `code` and the object under it
         * declares exactly the fields that code sends.
         *
         * A request these schemas reject is answered by the request validator with a message and
         * carries neither `code` nor `details` — the last member of the union.
         *
         */
        {
            code: "SCHEMA_NOT_FOUND";
            details: {
                /**
                 * The entity type the request addressed.
                 * example:
                 * price
                 */
                schema: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "ENTITY_NOT_FOUND";
            details: {
                /**
                 * The entity type the request addressed.
                 * example:
                 * price
                 */
                schema: string;
                /**
                 * The conditional entity the request addressed.
                 * example:
                 * price-sp26d1yo
                 */
                entity_id: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "ENTITY_TYPE_MISMATCH";
            details: {
                /**
                 * The entity type the request addressed.
                 * example:
                 * price
                 */
                schema: string;
                /**
                 * The conditional entity the request addressed.
                 * example:
                 * price-sp26d1yo
                 */
                entity_id: string;
                /**
                 * The entity type that id belongs to. Where it is a conditional entity type,
                 * it is the slug to send instead.
                 *
                 * example:
                 * product
                 */
                actual_schema: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "ENTITY_NOT_CONDITIONAL";
            details: {
                /**
                 * The entity type the request addressed.
                 * example:
                 * price
                 */
                schema: string;
                /**
                 * The conditional entity the request addressed.
                 * example:
                 * price-sp26d1yo
                 */
                entity_id: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "VARIANT_NOT_FOUND";
            details: {
                /**
                 * The conditional entity the request addressed.
                 * example:
                 * price-sp26d1yo
                 */
                entity_id: string;
                /**
                 * The variant the request addressed.
                 * example:
                 * var-46045
                 */
                variant_id: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "VERSION_NOT_FOUND";
            details: {
                /**
                 * The variant the request addressed.
                 * example:
                 * var-46045
                 */
                variant_id: string;
                /**
                 * The version the request addressed, by the instant it takes effect from.
                 * example:
                 * 2027-01-01T00:00:00.000Z
                 */
                valid_from: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "NO_MATCHES";
            details: {
                /**
                 * The entity type the request addressed.
                 * example:
                 * price
                 */
                schema: string;
                /**
                 * The conditional entity the resolve was scoped to.
                 * example:
                 * price-sp26d1yo
                 */
                entity_id: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "NO_ACTIVE_VERSION";
            details: {
                /**
                 * The variant the request addressed.
                 * example:
                 * var-46045
                 */
                variant_id: string;
                /**
                 * The instant a version in effect was asked for at.
                 * example:
                 * 2026-06-01T00:00:00.000Z
                 */
                as_of: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "AMBIGUOUS_RESOLUTION";
            details: {
                /**
                 * Every variant that applied, each with the conditions it pins.
                 */
                candidates: [
                    {
                        /**
                         * The candidate variant.
                         * example:
                         * var-46045
                         */
                        variant_id: string;
                        conditions: /**
                         * A variant's pinned conditions as a reader sees them: the pins the schema declares, plus a
                         * boolean `default` saying whether this is the entity's fallback.
                         *
                         * example:
                         * {
                         *   "postal_code": "46045",
                         *   "default": false
                         * }
                         */
                        VariantConditions;
                    },
                    {
                        /**
                         * The candidate variant.
                         * example:
                         * var-46045
                         */
                        variant_id: string;
                        conditions: /**
                         * A variant's pinned conditions as a reader sees them: the pins the schema declares, plus a
                         * boolean `default` saying whether this is the entity's fallback.
                         *
                         * example:
                         * {
                         *   "postal_code": "46045",
                         *   "default": false
                         * }
                         */
                        VariantConditions;
                    },
                    ...{
                        /**
                         * The candidate variant.
                         * example:
                         * var-46045
                         */
                        variant_id: string;
                        conditions: /**
                         * A variant's pinned conditions as a reader sees them: the pins the schema declares, plus a
                         * boolean `default` saying whether this is the entity's fallback.
                         *
                         * example:
                         * {
                         *   "postal_code": "46045",
                         *   "default": false
                         * }
                         */
                        VariantConditions;
                    }[]
                ];
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "TUPLE_CONFLICT";
            details: {
                /**
                 * The variant the write addressed.
                 * example:
                 * var-46045
                 */
                variant_id: string;
                /**
                 * The variant already holding the tuple, where the write read it back.
                 * example:
                 * var-50667
                 */
                conflicting_variant_id?: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "VERSION_CONFLICT";
            details: {
                /**
                 * The variant the write addressed.
                 * example:
                 * var-46045
                 */
                variant_id: string;
                /**
                 * The instant already claimed by a version of that variant.
                 * example:
                 * 2027-01-01T00:00:00.000Z
                 */
                valid_from: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "CONDITION_UNDEFINED";
            details: {
                /**
                 * The condition the request named and the schema does not define.
                 * example:
                 * postal_code
                 */
                condition_name: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "VARIANT_PIN_UNDECLARED";
            details: {
                /**
                 * The condition the variant pins and the schema no longer declares.
                 * example:
                 * postal_code
                 */
                condition_name: string;
                /**
                 * One variant carrying such a pin.
                 * example:
                 * var-46045
                 */
                variant_id: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "OPERATOR_UNSUPPORTED";
            details: {
                /**
                 * example:
                 * postal_code
                 */
                condition_name: string;
                /**
                 * The type the schema declares that condition with.
                 * example:
                 * location
                 */
                condition_type: string;
                /**
                 * The predicate the context or filter asked for, or `sort` where a listing
                 * asked to order by a condition whose type has no order.
                 *
                 * example:
                 * between
                 */
                operator: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "CONTEXT_FORMAT_INVALID";
            details: {
                /**
                 * example:
                 * postal_code
                 */
                condition_name: string;
                /**
                 * What a value for that condition has to be, in prose.
                 * example:
                 * a postal code
                 */
                expected: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "CONDITION_VALUE_INVALID";
            details: {
                /**
                 * example:
                 * segment
                 */
                condition_name: string;
                /**
                 * The value the write pinned, as it arrived.
                 * example:
                 * industrial
                 */
                value: any;
                /**
                 * The vocabulary as enforced, after any entries this deploy cannot read have
                 * been dropped.
                 *
                 * example:
                 * [
                 *   "private",
                 *   "commercial"
                 * ]
                 */
                options: [
                    string,
                    ...string[]
                ];
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "CONDITION_UNCONFIGURED";
            details: {
                /**
                 * The condition whose vocabulary is not configured yet.
                 * example:
                 * segment
                 */
                condition_name: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "TOO_MANY_MATCHES";
            details: {
                /**
                 * The most variants one resolve may compose.
                 * example:
                 * 100
                 */
                limit: number;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "WRITE_CONFLICT";
            details: {
                /**
                 * The variant the write addressed.
                 * example:
                 * var-46045
                 */
                variant_id: string;
                /**
                 * The version the write addressed, where one was addressed.
                 * example:
                 * 2027-01-01T00:00:00.000Z
                 */
                valid_from?: string;
                /**
                 * The revision the write required the stored version to still be at.
                 * example:
                 * 3
                 */
                expected_revision?: number;
                /**
                 * The revision the version is actually at, where the failed write read it back.
                 * example:
                 * 4
                 */
                current_revision?: number;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "OFFSET_WINDOW_EXCEEDED";
            details: {
                /**
                 * The offset the request asked for.
                 * example:
                 * 24990
                 */
                from: number;
                /**
                 * The page size the request asked for, after clamping.
                 * example:
                 * 25
                 */
                size: number;
                /**
                 * The last row this deploy's index will serve from an offset.
                 * example:
                 * 25000
                 */
                window: number;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "CURSOR_INVALID";
            details: {
                /**
                 * Which check the cursor failed, in prose.
                 * example:
                 * The cursor was issued for a different sort order
                 */
                reason: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "VARIANT_LIMIT_REACHED";
            details: {
                /**
                 * Variants this entity already holds.
                 * example:
                 * 5000
                 */
                variant_count: number;
                /**
                 * Variants this entity may hold. Configurable per deploy.
                 * example:
                 * 5000
                 */
                cap: number;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "PIN_FORMAT_INVALID";
            details: {
                /**
                 * example:
                 * valid_period
                 */
                condition_name: string;
                /**
                 * The type the schema declares that condition with.
                 * example:
                 * daterange
                 */
                condition_type: string;
                /**
                 * What a pin for that condition has to be, in prose.
                 * example:
                 * an object carrying a from and an until date, either may be open
                 */
                expected: string;
                /**
                 * The value the write pinned, as it arrived.
                 * example:
                 * 2027-01-01/2027-12-31
                 */
                value: any;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "VARIANT_UNPINNED";
            details: {
                /**
                 * The conditional entity the item addressed.
                 * example:
                 * price-sp26d1yo
                 */
                entity_id: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "LAST_VERSION_UNDELETABLE";
            details: {
                /**
                 * The variant whose last version the delete addressed.
                 * example:
                 * var-46045
                 */
                variant_id: string;
                /**
                 * The version the delete addressed, by the instant it takes effect from.
                 * example:
                 * 2027-01-01T00:00:00.000Z
                 */
                valid_from: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "CONDITION_UNREADABLE";
            details: {
                /**
                 * The condition whose definition this deploy cannot read.
                 * example:
                 * delivery_area
                 */
                condition_name: string;
                /**
                 * Which field of the definition cannot be read, named as the schema spells it.
                 * example:
                 * format
                 */
                unreadable: "format" | "options";
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "SORT_INVALID";
            details: {
                /**
                 * What a `sort` has to be, in prose.
                 * example:
                 * conditions.<name>:asc or conditions.<name>:desc, naming a string, select, number or date condition
                 */
                expected: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "DEFAULT_MARKER_RESERVED";
            details: {
                /**
                 * The marker, spelled as the request spelled it.
                 * example:
                 * default
                 */
                condition_name: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "DEFAULT_VARIANT_PINS_CONDITIONS";
            details: {
                /**
                 * The conditions the write pinned beside the marker.
                 * example:
                 * [
                 *   "postal_code"
                 * ]
                 */
                condition_names: string[];
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "VALID_FROM_IMMUTABLE";
            details: {
                /**
                 * The version the request addressed, by the instant it takes effect from.
                 * example:
                 * 2027-01-01T00:00:00.000Z
                 */
                addressed: string;
                /**
                 * The instant the body asked for instead, canonicalized.
                 * example:
                 * 2027-04-01T00:00:00.000Z
                 */
                requested: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "VARIANT_CONDITIONS_IMMUTABLE";
            details: {
                /**
                 * The variant whose conditions the write would have changed.
                 * example:
                 * var-46045
                 */
                variant_id: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "IDENTIFIER_INVALID";
            details: {
                /**
                 * Which id could not be keyed by, named as the request names it.
                 * example:
                 * entity_id
                 */
                field: "entity_id" | "variant_id";
                /**
                 * Which of the three checks the id failed, in prose.
                 * example:
                 * it carries a character this scheme does not admit
                 */
                reason: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "VALID_FROM_INVALID";
            details: {
                /**
                 * What a `valid_from` has to be, in prose.
                 * example:
                 * an RFC 3339 date, optionally with a time to at most millisecond precision and an optional UTC offset
                 */
                expected: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
            code: "VALUE_UNSTORABLE";
            details: {
                /**
                 * Where the value sits, as a dotted path of the request's own keys, with array
                 * entries by index.
                 *
                 * example:
                 * values.tiers.0.unit_amount
                 */
                path: string;
                /**
                 * What about the value cannot be stored, in prose.
                 * example:
                 * the non-finite number Infinity
                 */
                reason: string;
            };
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
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            error?: /**
             * What went wrong. The same string as `message`, except on a request-validation
             * failure, which puts the list of validation errors here instead.
             *
             */
            string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[] | string | {
                [name: string]: any;
            }[];
        } | {
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
            error?: /**
             * The `error` field of an error response: the message, or — where the request failed
             * validation before any handler ran — the validation errors themselves.
             *
             */
            ReportedError;
        };
        /**
         * Machine-readable failure mode of a conditional-pricing operation, so a client can branch on
         * the kind of failure instead of parsing the message. A `400` is about the request; a `409` is
         * about what is already stored. Refusals raised by request validation carry no `code` at all.
         *
         * - `SCHEMA_NOT_FOUND` (404): no conditional entity type by that slug
         * - `ENTITY_NOT_FOUND` (404): the schema holds no entity with that id
         * - `ENTITY_TYPE_MISMATCH` (400): that id belongs to an entity of another type than the slug named
         * - `ENTITY_NOT_CONDITIONAL` (409): the entity is of the right type but was not created as a conditional one
         * - `VARIANT_NOT_FOUND` (404): the entity has no such variant
         * - `VERSION_NOT_FOUND` (404): the variant has no version at that `valid_from`
         * - `NO_MATCHES` (404): nothing applied to the context and the entity has no `default` variant
         * - `NO_ACTIVE_VERSION` (404): the variant has no version in effect at the instant asked about
         * - `AMBIGUOUS_RESOLUTION` (409): several variants match the given context while a single result was requested
         * - `TUPLE_CONFLICT` (409): the condition tuple is already claimed by another variant
         * - `VERSION_CONFLICT` (409): a version already exists at the given `valid_from` on that variant
         * - `CONDITION_UNDEFINED` (400): the request names a condition the entity's schema does not define
         * - `VARIANT_PIN_UNDECLARED` (409): a variant a resolve would compose pins a condition the entity's schema no longer declares
         * - `OPERATOR_UNSUPPORTED` (400): the requested predicate, or a sort, is not applicable to the condition's type
         * - `CONTEXT_FORMAT_INVALID` (400): a resolve context or listing filter value is malformed for its condition type
         * - `CONDITION_VALUE_INVALID` (400): a variant write pins a `select` value absent from the condition's declared `options`
         * - `CONDITION_UNCONFIGURED` (409): a variant write pins a `select` condition whose `options` are absent or empty
         * - `TOO_MANY_MATCHES` (400): a multi-match resolve exceeded its result cap
         * - `WRITE_CONFLICT` (409): transient write contention, retryable unlike `TUPLE_CONFLICT`
         * - `OFFSET_WINDOW_EXCEEDED` (400): a listing's `from` plus `size` reaches past the offset window the search index allows
         * - `CURSOR_INVALID` (400): a paging cursor cannot be read, or does not belong to the read it was sent with
         * - `VARIANT_LIMIT_REACHED` (409): the entity already holds every variant it may hold
         * - `PIN_FORMAT_INVALID` (400): a variant pins a value malformed for its condition's type
         * - `VARIANT_UNPINNED` (400): a variant write pins no condition and is not marked `default`, or a batch delete item addresses no variant
         * - `LAST_VERSION_UNDELETABLE` (409): the delete would leave the variant with no version at all
         * - `CONDITION_UNREADABLE` (409): the entity's schema declares a condition in a way this deploy cannot read
         * - `SORT_INVALID` (400): a listing's `sort` is not `conditions.<name>:asc` or `conditions.<name>:desc`
         * - `DEFAULT_MARKER_RESERVED` (400): a variant write's pins, or a resolve context, address the fallback marker — `default` or `_default`
         * - `DEFAULT_VARIANT_PINS_CONDITIONS` (400): a variant marked `default` also pins real conditions
         * - `VALID_FROM_IMMUTABLE` (400): a version write asks for a different `valid_from` than the version its own address names
         * - `VARIANT_CONDITIONS_IMMUTABLE` (409): a version write carries a condition tuple other than the one its variant was created with
         * - `IDENTIFIER_INVALID` (400): an id in the request cannot be used as a storage key — empty, carrying an unsupported character, or longer than 128 characters
         * - `VALID_FROM_INVALID` (400): a `valid_from` is not one of the timestamp forms a version timeline can be sorted by
         * - `VALUE_UNSTORABLE` (400): a write carries a value the store cannot hold, such as a non-finite number or one outside the table's numeric range
         *
         */
        export type ConditionalPricingErrorCode = "SCHEMA_NOT_FOUND" | "ENTITY_NOT_FOUND" | "ENTITY_TYPE_MISMATCH" | "ENTITY_NOT_CONDITIONAL" | "VARIANT_NOT_FOUND" | "VERSION_NOT_FOUND" | "NO_MATCHES" | "NO_ACTIVE_VERSION" | "AMBIGUOUS_RESOLUTION" | "TUPLE_CONFLICT" | "VERSION_CONFLICT" | "CONDITION_UNDEFINED" | "VARIANT_PIN_UNDECLARED" | "OPERATOR_UNSUPPORTED" | "CONTEXT_FORMAT_INVALID" | "CONDITION_VALUE_INVALID" | "CONDITION_UNCONFIGURED" | "TOO_MANY_MATCHES" | "WRITE_CONFLICT" | "OFFSET_WINDOW_EXCEEDED" | "CURSOR_INVALID" | "VARIANT_LIMIT_REACHED" | "PIN_FORMAT_INVALID" | "VARIANT_UNPINNED" | "LAST_VERSION_UNDELETABLE" | "CONDITION_UNREADABLE" | "SORT_INVALID" | "DEFAULT_MARKER_RESERVED" | "DEFAULT_VARIANT_PINS_CONDITIONS" | "VALID_FROM_IMMUTABLE" | "VARIANT_CONDITIONS_IMMUTABLE" | "IDENTIFIER_INVALID" | "VALID_FROM_INVALID" | "VALUE_UNSTORABLE";
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
             * The flag for entities whose values vary by context. Resolve the values that apply with
             * `POST /v1/conditional-pricing:resolve`.
             *
             */
            is_conditional?: boolean;
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
             * The flag for entities whose values vary by context. Resolve the values that apply with
             * `POST /v1/conditional-pricing:resolve`.
             *
             */
            is_conditional?: boolean;
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
             * The flag for entities whose values vary by context. Resolve the values that apply with
             * `POST /v1/conditional-pricing:resolve`.
             *
             */
            is_conditional?: boolean;
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
             * The situation this variant applies to: a flat map keyed by condition name. A condition left
             * out is a wildcard, which is what makes adding a condition to a schema non-breaking for
             * existing variants.
             *
             * Exact values only; predicates belong to reads. Values are stored canonicalized for their
             * type: a `date` becomes millisecond-precision UTC, a `daterange` an object carrying `from`
             * and `until` where an empty string is an open end, a `location` of format `zipcode` the
             * postal code itself and one of format `zipcode_town` an object carrying both.
             *
             * `default` and names beginning with `_` are reserved; use the request's `default` flag.
             *
             * example:
             * {
             *   "postal_code": "46045"
             * }
             */
            PinnedConditions;
            /**
             * Mark this variant as the entity's fallback, served when no other variant applies. It can
             * pin nothing else, and an entity may have one; a second is `TUPLE_CONFLICT`. Available to
             * every conditional entity without anything being declared in the schema.
             *
             */
            default?: boolean;
            /**
             * When the first version takes effect. Defaults to now. An RFC 3339 date (`2026-01-01`,
             * read as midnight UTC) or date-time, to at most millisecond precision.
             *
             * example:
             * 2027-01-01T00:00:00Z
             */
            valid_from?: string;
            values: /**
             * The values this version overrides on the base entity, keyed by entity field name.
             *
             * A field is overridable if its attribute declares `overridable_attribute` — which readonly,
             * hidden, computed and metadata fields, and types no variant may override, cannot be given —
             * or if a capability declaring `overridable_attribute` names it in `managed_fields`, which
             * excludes only readonly and metadata fields.
             *
             * Fields that are not overridable are reported in the write's `warnings` rather than rejected,
             * and keep whatever value they already had. An append seeds them from the version in effect at
             * its own `valid_from`.
             *
             * A composite price's `price_components` is an ordinary overridable relation attribute,
             * referencing component entities rather than variants or versions.
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
             * Server-generated. The durable key orders and contracts pin.
             * example:
             * var-46045
             */
            variant_id: string;
            /**
             * example:
             * price-sp26d1yo
             */
            entity_id: string;
            schema: /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ ConditionalEntitySlug;
            /**
             * The situation this variant applies to, plus the boolean `default` discriminator.
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
             * The values this version overrides on the base entity, keyed by entity field name.
             *
             * A field is overridable if its attribute declares `overridable_attribute` — which readonly,
             * hidden, computed and metadata fields, and types no variant may override, cannot be given —
             * or if a capability declaring `overridable_attribute` names it in `managed_fields`, which
             * excludes only readonly and metadata fields.
             *
             * Fields that are not overridable are reported in the write's `warnings` rather than rejected,
             * and keep whatever value they already had. An append seeds them from the version in effect at
             * its own `valid_from`.
             *
             * A composite price's `price_components` is an ordinary overridable relation attribute,
             * referencing component entities rather than variants or versions.
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
             * The revision a later write to this version must carry.
             */
            _revision: number;
            /**
             * Things worth knowing that did not stop the write. Always present, and empty in the ordinary case.
             */
            warnings: /**
             * Something worth knowing that did not stop a write. One vocabulary for every write; `details`
             * is typed per `code`, and a write raises each code at most once.
             *
             */
            WriteWarning[];
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
            schema: /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ ConditionalEntitySlug;
            /**
             * Whether this call freed the variant's combination of condition values. `false` where an
             * earlier, interrupted attempt had already freed it.
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
            schema: /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ ConditionalEntitySlug;
            /**
             * The version removed, canonicalized to millisecond-precision UTC.
             * example:
             * 2027-01-01T00:00:00.000Z
             */
            valid_from: string;
            /**
             * What the delete moved. Always present, and empty when a scheduled version was withdrawn.
             */
            warnings: /**
             * Something worth knowing that did not stop a write. One vocabulary for every write; `details`
             * is typed per `code`, and a write raises each code at most once.
             *
             */
            WriteWarning[];
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
            /**
             * A snapshot of the parameters this price was computed from, for display purposes
             * (e.g. showing "computed for 3,500 kWh/year"). Included in the `_meta` signature.
             *
             */
            inputs?: {
                [name: string]: any;
                type?: ProductCategory;
                consumptionHT?: number;
                consumptionNT?: number;
                consumptionType?: ConsumptionTypeGetAg;
                zipCode?: string;
                city?: string;
                providerId?: string;
                billingPeriod?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time";
                referenceDate?: string; // date
            };
            _meta?: /* Signature meta data payload */ SignatureMeta;
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
             * The flag for entities whose values vary by context. Resolve the values that apply with
             * `POST /v1/conditional-pricing:resolve`.
             *
             */
            is_conditional?: boolean;
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
         * One override that did not apply, and why — reported by a write for the attributes in its
         * body, and by a resolved payload for the stored overrides composition passed over.
         *
         */
        export interface InertOverride {
            /**
             * The attribute's name, as the request body or the stored version spells it.
             * example:
             * unit_amount
             */
            attribute: string;
            reason: /**
             * Why one override did not apply.
             *
             * - `ATTRIBUTE_NOT_OVERRIDABLE`: the schema declares the attribute without
             *   `overridable_attribute`, which is an ordinary schema edit away
             * - `ATTRIBUTE_READONLY`: the attribute is readonly, and cannot be granted the flag
             * - `ATTRIBUTE_HIDDEN`: the attribute is hidden, and cannot be granted the flag
             * - `ATTRIBUTE_COMPUTED`: the attribute's value is derived rather than stored
             * - `ATTRIBUTE_UNDECLARED`: the schema declares no attribute of that name
             * - `TYPE_NOT_OVERRIDABLE`: the attribute's type is not one a variant may override
             * - `CAPABILITY_NOT_OVERRIDABLE`: the field is managed by a capability that does not declare
             *   `overridable_attribute`
             *
             */
            InertOverrideReason;
        }
        /**
         * Why one override did not apply.
         *
         * - `ATTRIBUTE_NOT_OVERRIDABLE`: the schema declares the attribute without
         *   `overridable_attribute`, which is an ordinary schema edit away
         * - `ATTRIBUTE_READONLY`: the attribute is readonly, and cannot be granted the flag
         * - `ATTRIBUTE_HIDDEN`: the attribute is hidden, and cannot be granted the flag
         * - `ATTRIBUTE_COMPUTED`: the attribute's value is derived rather than stored
         * - `ATTRIBUTE_UNDECLARED`: the schema declares no attribute of that name
         * - `TYPE_NOT_OVERRIDABLE`: the attribute's type is not one a variant may override
         * - `CAPABILITY_NOT_OVERRIDABLE`: the field is managed by a capability that does not declare
         *   `overridable_attribute`
         *
         */
        export type InertOverrideReason = "ATTRIBUTE_NOT_OVERRIDABLE" | "ATTRIBUTE_READONLY" | "ATTRIBUTE_HIDDEN" | "ATTRIBUTE_COMPUTED" | "ATTRIBUTE_UNDECLARED" | "TYPE_NOT_OVERRIDABLE" | "CAPABILITY_NOT_OVERRIDABLE";
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
         * How to narrow and page a variant listing. Every property is optional, so `{}` asks for the
         * first ten variants in `variant_id` order, but the body itself is required. `conditions` and
         * `search` narrow independently and a variant must satisfy both.
         *
         */
        export interface ListVariantsRequest {
            conditions?: /**
             * Which pins a variant must carry to be listed: a flat map keyed by condition name, taking the
             * same exact values and predicates a resolve context does. A condition left out is not
             * filtered on. An `in` list carries at most 50,000 values.
             *
             * A variant matches only where it pins the condition — unlike `:resolve`, where an unpinned
             * condition matches any value. `{ "exists": false }` selects the variants that leave it
             * unpinned.
             *
             * `default` is accepted as an exact boolean and takes no predicate: `true` selects the
             * entity's fallback variant, `false` every variant that is not it. Names beginning with `_`
             * are reserved.
             *
             * example:
             * {
             *   "postal_code": "46045",
             *   "consumption": {
             *     "lt": 5000
             *   }
             * }
             */
            VariantConditionFilter;
            /**
             * Free text matched against the scalar pins — `string`, `select`, `number` and `date`.
             * `location` and `daterange` pins are stored structured and are not matched.
             *
             * example:
             * 460
             */
            search?: string;
            /**
             * `conditions.<name>:asc` or `conditions.<name>:desc`, for a `string`, `select`, `number`
             * or `date` pin. `variant_id:asc` is always appended, so the order is total.
             *
             * example:
             * conditions.postal_code:asc
             */
            sort?: string;
            /**
             * The offset to read from, ignored when a `cursor` is sent. Bounded together with `size`
             * by the search index's offset window; a page reaching past it is
             * `OFFSET_WINDOW_EXCEEDED`, which reports the window.
             *
             */
            from?: number;
            /**
             * Rows per page. Clamped silently at 1000.
             */
            size?: number;
            /**
             * Continue from a previous response's `next`, which is where a caller goes when the offset
             * window runs out. Opaque, and valid only with the `conditions`, `search` and `sort` it
             * was issued with.
             *
             * example:
             * eyJmcm9tIjoyNSwibGlzdGluZyI6IjNmOWMxZTJhIn0
             */
            cursor?: string;
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
             * The flag for entities whose values vary by context. Resolve the values that apply with
             * `POST /v1/conditional-pricing:resolve`.
             *
             */
            is_conditional?: boolean;
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
             * Only the overrides to change; everything not mentioned is left as stored. `null` sets a
             * value rather than removing an override — use the replace operation to remove one.
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
             * The revision read from the version being written. Refused with `WRITE_CONFLICT` if the
             * version has been written since.
             *
             * example:
             * 3
             */
            _revision: number;
            /**
             * Accepted only when it names the version being addressed.
             */
            valid_from?: string;
            /**
             * Accepted only unchanged. A variant's conditions are fixed when it is created.
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
         * The situation this variant applies to: a flat map keyed by condition name. A condition left
         * out is a wildcard, which is what makes adding a condition to a schema non-breaking for
         * existing variants.
         *
         * Exact values only; predicates belong to reads. Values are stored canonicalized for their
         * type: a `date` becomes millisecond-precision UTC, a `daterange` an object carrying `from`
         * and `until` where an empty string is an open end, a `location` of format `zipcode` the
         * postal code itself and one of format `zipcode_town` an object carrying both.
         *
         * `default` and names beginning with `_` are reserved; use the request's `default` flag.
         *
         * example:
         * {
         *   "postal_code": "46045"
         * }
         */
        export interface PinnedConditions {
            [name: string]: any;
        }
        /**
         * The options a pinned resolve accepts — `hydrate` and nothing else. `resolve_one` has nothing
         * to change where the answer is one result or a 404, so a body sending it is a `400`.
         *
         */
        export interface PinnedResolveOptions {
            /**
             * Return the entities a relation attribute references in place of the references, one
             * level deep, as an entity read with hydration does. Applied after composition, so a
             * relation this variant's version replaced is hydrated too.
             *
             * A referenced entity that is itself conditional is returned unresolved, carrying its own
             * flag. Costs one fetch per distinct referenced entity, with no per-attribute limit.
             *
             */
            hydrate?: boolean;
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
             * The flag for entities whose values vary by context. Resolve the values that apply with
             * `POST /v1/conditional-pricing:resolve`.
             *
             */
            is_conditional?: boolean;
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
                 * The flag for entities whose values vary by context. Resolve the values that apply with
                 * `POST /v1/conditional-pricing:resolve`.
                 *
                 */
                is_conditional?: boolean;
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
                 * The flag for entities whose values vary by context. Resolve the values that apply with
                 * `POST /v1/conditional-pricing:resolve`.
                 *
                 */
                is_conditional?: boolean;
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
                 * The flag for entities whose values vary by context. Resolve the values that apply with
                 * `POST /v1/conditional-pricing:resolve`.
                 *
                 */
                is_conditional?: boolean;
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
             * The flag for entities whose values vary by context. Resolve the values that apply with
             * `POST /v1/conditional-pricing:resolve`.
             *
             */
            is_conditional?: boolean;
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
            /**
             * Context about what the recommendations were searched against.
             */
            source?: {
                /**
                 * The first line item of the contract used as source for the recommendation.
                 * Carries the amounts the customer currently pays; only present when searching by contract_id.
                 *
                 */
                item?: /**
                 * The first line item of the contract used as source for the recommendation.
                 * Carries the amounts the customer currently pays; only present when searching by contract_id.
                 *
                 */
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
                CompositePriceItem;
            };
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
             * The complete set of overrides this version carries. An overridable attribute absent from
             * here stops being overridden; one the variant may not override keeps its stored value.
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
             * The revision read from the version being written. Refused with `WRITE_CONFLICT` if the
             * version has been written since.
             *
             * example:
             * 3
             */
            _revision: number;
            /**
             * Accepted only when it names the version being addressed. Moving a version is an append
             * and a delete.
             *
             */
            valid_from?: string;
            /**
             * Accepted only unchanged. A variant's conditions are fixed when it is created.
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
         * The `error` field of an error response: the message, or — where the request failed
         * validation before any handler ran — the validation errors themselves.
         *
         */
        export type ReportedError = /**
         * The `error` field of an error response: the message, or — where the request failed
         * validation before any handler ran — the validation errors themselves.
         *
         */
        string | {
            [name: string]: any;
        }[];
        /**
         * Resolve by matching a situation: which of this entity's variants apply to `context`, each
         * composed with the version in effect at `as_of`.
         *
         */
        export interface ResolveByContextRequest {
            schema: /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ ConditionalEntitySlug;
            /**
             * The conditional entity to resolve. Resolution is always scoped to exactly one.
             * example:
             * price-sp26d1yo
             */
            entity_id: string;
            context: /**
             * The situation to resolve for: a flat map keyed by condition name. A condition left out
             * matches only variants that leave it unpinned; an empty map therefore returns the `default`
             * variant.
             *
             * Each value is an exact value, typed by its condition, or a single-operator predicate:
             *
             * - `{ "lt": v }`, `{ "lte": v }`, `{ "gt": v }`, `{ "gte": v }` — order, against a `number`
             *   or `date` condition
             * - `{ "in": [...] }` — membership, against a `string`, `select` or `number` condition
             * - `{ "between": "2026-03-01" }` — `daterange` containment, which a plain date also means
             * - `{ "exists": true }` — pinned to any value; `{ "exists": false }` — left unpinned
             *
             * An `in` list carries at most 50,000 values. A `string` or `select` matches exactly and
             * case-sensitively. A `location` of format
             * `zipcode` is the postal code itself; one of format `zipcode_town` is an object carrying
             * both, whose town is compared case- and whitespace-insensitively.
             *
             * `default` and names beginning with `_` are reserved and cannot be supplied.
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
             * before it. Defaults to now. A variant whose first version is later is excluded from
             * matching; a pin naming one is answered `NO_ACTIVE_VERSION` instead.
             *
             * An RFC 3339 date (`2026-01-01`, read as midnight UTC) or date-time, to at most
             * millisecond precision.
             *
             * example:
             * 2027-03-15T00:00:00Z
             */
            as_of?: string;
            options?: /* The options a context resolve accepts. A pin takes `PinnedResolveOptions` instead. */ ResolveOptions;
        }
        /**
         * Resolve by naming a variant: compose this one, whatever a context would have matched.
         */
        export interface ResolveByPinRequest {
            schema: /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ ConditionalEntitySlug;
            /**
             * The conditional entity to resolve. Resolution is always scoped to exactly one.
             * example:
             * price-sp26d1yo
             */
            entity_id: string;
            /**
             * The variant to compose. Condition matching is skipped, the `default` fallback does not
             * apply, and `results` carries exactly one entry. A variant of another entity is
             * `VARIANT_NOT_FOUND`.
             *
             * example:
             * var-46045
             */
            variant_id: string;
            /**
             * The instant the version is selected at — the version with the latest `valid_from` at or
             * before it. Defaults to now. A pinned variant whose first version is later is
             * `NO_ACTIVE_VERSION`, carrying the instant in `details.as_of`.
             *
             * An RFC 3339 date (`2026-01-01`, read as midnight UTC) or date-time, to at most
             * millisecond precision.
             *
             * example:
             * 2027-03-15T00:00:00Z
             */
            as_of?: string;
            options?: /**
             * The options a pinned resolve accepts — `hydrate` and nothing else. `resolve_one` has nothing
             * to change where the answer is one result or a 404, so a body sending it is a `400`.
             *
             */
            PinnedResolveOptions;
        }
        /**
         * A resolve names one conditional entity and selects its variants either by `context` or by
         * `variant_id`, never both. `context: {}` matches nothing and so returns the `default`
         * variant, which is how to ask for it without knowing its id.
         *
         */
        export type ResolveConditionalEntityRequest = /**
         * A resolve names one conditional entity and selects its variants either by `context` or by
         * `variant_id`, never both. `context: {}` matches nothing and so returns the `default`
         * variant, which is how to ask for it without knowing its id.
         *
         */
        /**
         * Resolve by matching a situation: which of this entity's variants apply to `context`, each
         * composed with the version in effect at `as_of`.
         *
         */
        ResolveByContextRequest | /* Resolve by naming a variant: compose this one, whatever a context would have matched. */ ResolveByPinRequest;
        /**
         * The situation to resolve for: a flat map keyed by condition name. A condition left out
         * matches only variants that leave it unpinned; an empty map therefore returns the `default`
         * variant.
         *
         * Each value is an exact value, typed by its condition, or a single-operator predicate:
         *
         * - `{ "lt": v }`, `{ "lte": v }`, `{ "gt": v }`, `{ "gte": v }` — order, against a `number`
         *   or `date` condition
         * - `{ "in": [...] }` — membership, against a `string`, `select` or `number` condition
         * - `{ "between": "2026-03-01" }` — `daterange` containment, which a plain date also means
         * - `{ "exists": true }` — pinned to any value; `{ "exists": false }` — left unpinned
         *
         * An `in` list carries at most 50,000 values. A `string` or `select` matches exactly and
         * case-sensitively. A `location` of format
         * `zipcode` is the postal code itself; one of format `zipcode_town` is an object carrying
         * both, whose town is compared case- and whitespace-insensitively.
         *
         * `default` and names beginning with `_` are reserved and cannot be supplied.
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
        /**
         * The options a context resolve accepts. A pin takes `PinnedResolveOptions` instead.
         */
        export interface ResolveOptions {
            /**
             * Ask for an unambiguous answer: several applicable variants become
             * `AMBIGUOUS_RESOLUTION`, and none becomes `NO_MATCHES`.
             *
             */
            resolve_one?: boolean;
            /**
             * Return the entities a relation attribute references in place of the references, one
             * level deep, as an entity read with hydration does. Applied after composition, so a
             * relation this variant's version replaced is hydrated too.
             *
             * A referenced entity that is itself conditional is returned unresolved, carrying its own
             * flag. Costs one fetch per distinct referenced entity, with no per-attribute limit.
             *
             */
            hydrate?: boolean;
        }
        /**
         * The entity as this variant leaves it — every attribute of a plain entity read with the
         * applicable version's overrides applied — plus the discriminators below.
         *
         */
        export interface ResolvedVariant {
            [name: string]: any;
            /**
             * The logical entity's id, the same one a plain entity read returns.
             * example:
             * price-sp26d1yo
             */
            _id: string;
            /**
             * The variant these values came from — what an order or contract pins.
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
            /**
             * The variant's stored overrides this payload did not apply, and why. Always present, and
             * empty in the ordinary case. Computed per read against the schema as it stands, so
             * granting or withdrawing `overridable_attribute` changes it without any data being
             * rewritten.
             *
             */
            _inert_overrides: /**
             * One override that did not apply, and why — reported by a write for the attributes in its
             * body, and by a resolved payload for the stored overrides composition passed over.
             *
             */
            InertOverride[];
        }
        export interface ResolvedVariants {
            /**
             * One composed payload per applicable variant, capped at 100 — a context selecting more is
             * `TOO_MANY_MATCHES`. Unordered.
             *
             */
            results: /**
             * The entity as this variant leaves it — every attribute of a plain entity read with the
             * applicable version's overrides applied — plus the discriminators below.
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
         * Which pins a variant must carry to be listed: a flat map keyed by condition name, taking the
         * same exact values and predicates a resolve context does. A condition left out is not
         * filtered on. An `in` list carries at most 50,000 values.
         *
         * A variant matches only where it pins the condition — unlike `:resolve`, where an unpinned
         * condition matches any value. `{ "exists": false }` selects the variants that leave it
         * unpinned.
         *
         * `default` is accepted as an exact boolean and takes no predicate: `true` selects the
         * entity's fallback variant, `false` every variant that is not it. Names beginning with `_`
         * are reserved.
         *
         * example:
         * {
         *   "postal_code": "46045",
         *   "consumption": {
         *     "lt": 5000
         *   }
         * }
         */
        export interface VariantConditionFilter {
            [name: string]: any;
        }
        /**
         * A variant's pinned conditions as a reader sees them: the pins the schema declares, plus a
         * boolean `default` saying whether this is the entity's fallback.
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
        export interface VariantList {
            /**
             * How many variants match in total, exactly — not how many this page carries.
             * example:
             * 8128
             */
            hits: number;
            results: /* One variant as a listing reports it: which variant it is and what it pins. */ VariantListRow[];
            /**
             * The cursor that continues this listing, absent on the last page. Send it back as
             * `cursor`, with the same filter, search and sort.
             *
             * example:
             * eyJmcm9tIjoyNSwibGlzdGluZyI6IjNmOWMxZTJhIn0
             */
            next?: string;
        }
        /**
         * One variant as a listing reports it: which variant it is and what it pins.
         */
        export interface VariantListRow {
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
            schema: /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ ConditionalEntitySlug;
            /**
             * The situation this variant applies to, plus the boolean `default` discriminator.
             * Membership of a page may lag a write by moments; the pins themselves never do.
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
        }
        export interface VariantTree {
            /**
             * How many variants match in total, exactly — not how many this page carries.
             * example:
             * 8128
             */
            hits: number;
            /**
             * One row per matching variant, in the requested order. A variant mid-delete is omitted,
             * so `results` can be shorter than `hits` implies.
             *
             */
            results: /* A listing row plus the one version the tree shows for it, and the status saying which. */ VariantTreeRow[];
            /**
             * The cursor that continues this listing, absent on the last page. Send it back as
             * `cursor`, with the same filter, search and sort; `as_of` may change between pages.
             *
             * example:
             * eyJmcm9tIjoyNSwibGlzdGluZyI6IjNmOWMxZTJhIn0
             */
            next?: string;
        }
        /**
         * The variants list's request plus `as_of`, the instant each row's version is selected at.
         * `size` is clamped at 100 here; every other property means what it means on the list.
         *
         */
        export interface VariantTreeRequest {
            conditions?: /**
             * Which pins a variant must carry to be listed: a flat map keyed by condition name, taking the
             * same exact values and predicates a resolve context does. A condition left out is not
             * filtered on. An `in` list carries at most 50,000 values.
             *
             * A variant matches only where it pins the condition — unlike `:resolve`, where an unpinned
             * condition matches any value. `{ "exists": false }` selects the variants that leave it
             * unpinned.
             *
             * `default` is accepted as an exact boolean and takes no predicate: `true` selects the
             * entity's fallback variant, `false` every variant that is not it. Names beginning with `_`
             * are reserved.
             *
             * example:
             * {
             *   "postal_code": "46045",
             *   "consumption": {
             *     "lt": 5000
             *   }
             * }
             */
            VariantConditionFilter;
            /**
             * Free text matched against the scalar pins — `string`, `select`, `number` and `date`.
             * `location` and `daterange` pins are stored structured and are not matched.
             *
             * example:
             * 460
             */
            search?: string;
            /**
             * `conditions.<name>:asc` or `conditions.<name>:desc`, for a `string`, `select`, `number`
             * or `date` pin. `variant_id:asc` is always appended, so the order is total.
             *
             * example:
             * conditions.postal_code:asc
             */
            sort?: string;
            /**
             * The offset to read from, ignored when a `cursor` is sent. Bounded together with `size`
             * by the search index's offset window; a page reaching past it is
             * `OFFSET_WINDOW_EXCEEDED`, which reports the window.
             *
             */
            from?: number;
            /**
             * Rows per page. Clamped silently at 100, since every row costs its own version lookup.
             */
            size?: number;
            /**
             * Continue from a previous response's `next`, which is where a caller goes when the offset
             * window runs out. Opaque, and valid only with the `conditions`, `search` and `sort` it
             * was issued with.
             *
             * example:
             * eyJmcm9tIjoyNSwibGlzdGluZyI6IjNmOWMxZTJhIn0
             */
            cursor?: string;
            /**
             * The instant each row's version is selected at. Defaults to now. A variant whose first
             * version is later is a row with `status: scheduled` carrying that upcoming version.
             *
             * An RFC 3339 date (`2026-01-01`, read as midnight UTC) or date-time, to at most
             * millisecond precision.
             *
             * example:
             * 2027-03-15T00:00:00Z
             */
            as_of?: string;
        }
        /**
         * A listing row plus the one version the tree shows for it, and the status saying which.
         */
        export interface VariantTreeRow {
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
            schema: /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ ConditionalEntitySlug;
            /**
             * The situation this variant applies to, plus the boolean `default` discriminator.
             * Membership of a page may lag a write by moments; the pins themselves never do.
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
            status: /**
             * Whether a tree row's version is the one in effect at `as_of`, or one still ahead of it.
             *
             * - `active`: the version with the latest `valid_from` at or before `as_of`
             * - `scheduled`: the variant's first version, which is later than `as_of`
             *
             */
            VariantTreeRowStatus;
            /**
             * The version in effect at `as_of`, or the variant's upcoming first one where every
             * version is still ahead of it. `status` says which. Always present.
             *
             */
            version: {
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
                schema: /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ ConditionalEntitySlug;
                /**
                 * The situation the variant applies to, plus the boolean `default` discriminator. A
                 * property of the variant: every version carries the same one.
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
                 * When this version takes effect, canonicalized to millisecond-precision UTC. Its identity
                 * within the variant.
                 *
                 * example:
                 * 2027-01-01T00:00:00.000Z
                 */
                valid_from: string;
                values: /**
                 * The values this version overrides on the base entity, keyed by entity field name.
                 *
                 * A field is overridable if its attribute declares `overridable_attribute` — which readonly,
                 * hidden, computed and metadata fields, and types no variant may override, cannot be given —
                 * or if a capability declaring `overridable_attribute` names it in `managed_fields`, which
                 * excludes only readonly and metadata fields.
                 *
                 * Fields that are not overridable are reported in the write's `warnings` rather than rejected,
                 * and keep whatever value they already had. An append seeds them from the version in effect at
                 * its own `valid_from`.
                 *
                 * A composite price's `price_components` is an ordinary overridable relation attribute,
                 * referencing component entities rather than variants or versions.
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
            };
        }
        /**
         * Whether a tree row's version is the one in effect at `as_of`, or one still ahead of it.
         *
         * - `active`: the version with the latest `valid_from` at or before `as_of`
         * - `scheduled`: the variant's first version, which is later than `as_of`
         *
         */
        export type VariantTreeRowStatus = "active" | "scheduled";
        /**
         * The values this version overrides on the base entity, keyed by entity field name.
         *
         * A field is overridable if its attribute declares `overridable_attribute` — which readonly,
         * hidden, computed and metadata fields, and types no variant may override, cannot be given —
         * or if a capability declaring `overridable_attribute` names it in `managed_fields`, which
         * excludes only readonly and metadata fields.
         *
         * Fields that are not overridable are reported in the write's `warnings` rather than rejected,
         * and keep whatever value they already had. An append seeds them from the version in effect at
         * its own `valid_from`.
         *
         * A composite price's `price_components` is an ordinary overridable relation attribute,
         * referencing component entities rather than variants or versions.
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
         * One version of one variant: the overrides it carries, the instant it takes effect, and the
         * variant it belongs to. These are the version's own overrides; `:resolve` composes them onto
         * the entity.
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
            schema: /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ ConditionalEntitySlug;
            /**
             * The situation the variant applies to, plus the boolean `default` discriminator. A
             * property of the variant: every version carries the same one.
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
             * When this version takes effect, canonicalized to millisecond-precision UTC. Its identity
             * within the variant.
             *
             * example:
             * 2027-01-01T00:00:00.000Z
             */
            valid_from: string;
            values: /**
             * The values this version overrides on the base entity, keyed by entity field name.
             *
             * A field is overridable if its attribute declares `overridable_attribute` — which readonly,
             * hidden, computed and metadata fields, and types no variant may override, cannot be given —
             * or if a capability declaring `overridable_attribute` names it in `managed_fields`, which
             * excludes only readonly and metadata fields.
             *
             * Fields that are not overridable are reported in the write's `warnings` rather than rejected,
             * and keep whatever value they already had. An append seeds them from the version in effect at
             * its own `valid_from`.
             *
             * A composite price's `price_components` is an ordinary overridable relation attribute,
             * referencing component entities rather than variants or versions.
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
             * The revision a write to this version must carry. Read from a strongly consistent read.
             * example:
             * 3
             */
            _revision: number;
        }
        export interface VariantVersionList {
            /**
             * A page of the variant's timeline, in the requested `order`.
             */
            results: /**
             * One version of one variant as a listing reports it: `VariantVersion` without `_revision`.
             * Read the version through its own `GET` to get the revision a write must carry.
             *
             */
            VariantVersionSnapshot[];
            /**
             * The cursor that continues this timeline, absent only on the last page — the only
             * end-of-data signal, since a short or empty page can still carry one. Send it back as
             * `cursor`, against the same variant and `order`.
             *
             * example:
             * eyJzayI6IlYjcHJpY2Utc3AyNmQxeW8jdmFyLTQ2MDQ1IzIwMjYtMDEtMDFUMDA6MDA6MDAuMDAwWiIsIm9yZGVyIjoiYXNjIn0
             */
            next?: string;
        }
        /**
         * One version of one variant as a listing reports it: `VariantVersion` without `_revision`.
         * Read the version through its own `GET` to get the revision a write must carry.
         *
         */
        export interface VariantVersionSnapshot {
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
            schema: /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ ConditionalEntitySlug;
            /**
             * The situation the variant applies to, plus the boolean `default` discriminator. A
             * property of the variant: every version carries the same one.
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
             * When this version takes effect, canonicalized to millisecond-precision UTC. Its identity
             * within the variant.
             *
             * example:
             * 2027-01-01T00:00:00.000Z
             */
            valid_from: string;
            values: /**
             * The values this version overrides on the base entity, keyed by entity field name.
             *
             * A field is overridable if its attribute declares `overridable_attribute` — which readonly,
             * hidden, computed and metadata fields, and types no variant may override, cannot be given —
             * or if a capability declaring `overridable_attribute` names it in `managed_fields`, which
             * excludes only readonly and metadata fields.
             *
             * Fields that are not overridable are reported in the write's `warnings` rather than rejected,
             * and keep whatever value they already had. An append seeds them from the version in effect at
             * its own `valid_from`.
             *
             * A composite price's `price_components` is an ordinary overridable relation attribute,
             * referencing component entities rather than variants or versions.
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
        }
        /**
         * Which version a write moved, and which one was in effect while it did.
         */
        export interface VersionMoved {
            /**
             * The version this write created, changed or removed.
             * example:
             * 2026-08-01T00:00:00.000Z
             */
            valid_from: string;
            /**
             * The version in effect when the write landed, before it did. Absent when the variant had
             * none. Advisory, and may lag the timeline by milliseconds.
             *
             * example:
             * 2026-01-01T00:00:00.000Z
             */
            active_valid_from?: string;
        }
        /**
         * Something worth knowing that did not stop a write. One vocabulary for every write; `details`
         * is typed per `code`, and a write raises each code at most once.
         *
         */
        export type WriteWarning = /**
         * Something worth knowing that did not stop a write. One vocabulary for every write; `details`
         * is typed per `code`, and a write raises each code at most once.
         *
         */
        {
            code: "VARIANT_COUNT_APPROACHING_CAP";
            message: string;
            details: {
                /**
                 * Variants this entity holds, including the one just written.
                 */
                variant_count: number;
                /**
                 * Variants this entity may hold. Configurable per deploy.
                 */
                cap: number;
            };
        } | {
            code: "ACTIVE_VERSION_CHANGED";
            message: string;
            details: /* Which version a write moved, and which one was in effect while it did. */ VersionMoved;
        } | {
            code: "SUPERSEDED_VERSION_WRITTEN";
            message: string;
            details: /* Which version a write moved, and which one was in effect while it did. */ VersionMoved;
        } | {
            code: "ATTRIBUTES_NOT_APPLIED";
            message: string;
            details: {
                attributes: [
                    /**
                     * One override that did not apply, and why — reported by a write for the attributes in its
                     * body, and by a resolved payload for the stored overrides composition passed over.
                     *
                     */
                    InertOverride,
                    .../**
                     * One override that did not apply, and why — reported by a write for the attributes in its
                     * body, and by a resolved payload for the stored overrides composition passed over.
                     *
                     */
                    InertOverride[]
                ];
            };
        };
        /**
         * A version as a write left it, together with anything the write moved.
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
            schema: /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ ConditionalEntitySlug;
            /**
             * The situation the variant applies to, plus the boolean `default` discriminator. A
             * property of the variant: every version carries the same one.
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
             * When this version takes effect, canonicalized to millisecond-precision UTC. Its identity
             * within the variant.
             *
             * example:
             * 2027-01-01T00:00:00.000Z
             */
            valid_from: string;
            values: /**
             * The values this version overrides on the base entity, keyed by entity field name.
             *
             * A field is overridable if its attribute declares `overridable_attribute` — which readonly,
             * hidden, computed and metadata fields, and types no variant may override, cannot be given —
             * or if a capability declaring `overridable_attribute` names it in `managed_fields`, which
             * excludes only readonly and metadata fields.
             *
             * Fields that are not overridable are reported in the write's `warnings` rather than rejected,
             * and keep whatever value they already had. An append seeds them from the version in effect at
             * its own `valid_from`.
             *
             * A composite price's `price_components` is an ordinary overridable relation attribute,
             * referencing component entities rather than variants or versions.
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
             * The revision a write to this version must carry. Read from a strongly consistent read.
             * example:
             * 3
             */
            _revision: number;
            /**
             * What this write moved, and anything in the body it did not store. Always present,
             * and empty in the ordinary case.
             *
             */
            warnings: /**
             * Something worth knowing that did not stop a write. One vocabulary for every write; `details`
             * is typed per `code`, and a write raises each code at most once.
             *
             */
            WriteWarning[];
        }
    }
}
declare namespace Paths {
    namespace $AppendConditionalVariantVersion {
        namespace Parameters {
            export type EntityId = string;
            export type Slug = /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ Components.Schemas.ConditionalEntitySlug;
            export type VariantId = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
            variant_id: Parameters.VariantId;
        }
        export type RequestBody = Components.Schemas.AppendVersionRequest;
        namespace Responses {
            export type $201 = /* A version as a write left it, together with anything the write moved. */ Components.Schemas.WrittenVariantVersion;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $403 = Components.Schemas.Error;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
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
    namespace $BatchDeleteConditionalVariants {
        namespace Parameters {
            export type Slug = /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ Components.Schemas.ConditionalEntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        export type RequestBody = /* A batch of variant and version deletes under one schema, each item naming the entity it removes from. */ Components.Schemas.BatchDeleteVariantsRequest;
        namespace Responses {
            export type $200 = /* What a batch delete did: one entry per item, in request order, and a count per outcome. */ Components.Schemas.BatchDeleteResult;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $403 = Components.Schemas.Error;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $BatchUpsertConditionalVariants {
        namespace Parameters {
            export type Slug = /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ Components.Schemas.ConditionalEntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        export type RequestBody = /* A batch of variant writes under one schema, each item naming the entity it writes to. */ Components.Schemas.BatchUpsertVariantsRequest;
        namespace Responses {
            export type $200 = /* What a batch upsert did: one entry per item, in request order, and a count per outcome. */ Components.Schemas.BatchUpsertResult;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $403 = Components.Schemas.Error;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
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
            export type Slug = /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ Components.Schemas.ConditionalEntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
        }
        export type RequestBody = Components.Schemas.CreateVariantRequest;
        namespace Responses {
            export type $201 = Components.Schemas.CreatedVariant;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $403 = Components.Schemas.Error;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $DeleteConditionalVariant {
        namespace Parameters {
            export type EntityId = string;
            export type Slug = /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ Components.Schemas.ConditionalEntitySlug;
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
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $403 = Components.Schemas.Error;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $DeleteConditionalVariantVersion {
        namespace Parameters {
            export type EntityId = string;
            export type Revision = number;
            export type Slug = /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ Components.Schemas.ConditionalEntitySlug;
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
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $403 = Components.Schemas.Error;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
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
            export type Slug = /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ Components.Schemas.ConditionalEntitySlug;
            export type VariantId = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
            variant_id: Parameters.VariantId;
        }
        namespace Responses {
            export type $200 = /**
             * One version of one variant: the overrides it carries, the instant it takes effect, and the
             * variant it belongs to. These are the version's own overrides; `:resolve` composes them onto
             * the entity.
             *
             */
            Components.Schemas.VariantVersion;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $403 = Components.Schemas.Error;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $GetConditionSets {
        namespace Parameters {
            export type Slug = /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ Components.Schemas.ConditionalEntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ConditionSetCatalog;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace $GetConditionalVariantTree {
        namespace Parameters {
            export type EntityId = string;
            export type Slug = /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ Components.Schemas.ConditionalEntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
        }
        export type RequestBody = /**
         * The variants list's request plus `as_of`, the instant each row's version is selected at.
         * `size` is clamped at 100 here; every other property means what it means on the list.
         *
         */
        Components.Schemas.VariantTreeRequest;
        namespace Responses {
            export type $200 = Components.Schemas.VariantTree;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $403 = Components.Schemas.Error;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $GetConditionalVariantVersion {
        namespace Parameters {
            export type EntityId = string;
            export type Slug = /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ Components.Schemas.ConditionalEntitySlug;
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
             * One version of one variant: the overrides it carries, the instant it takes effect, and the
             * variant it belongs to. These are the version's own overrides; `:resolve` composes them onto
             * the entity.
             *
             */
            Components.Schemas.VariantVersion;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $403 = Components.Schemas.Error;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
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
    namespace $ListConditionalVariantVersions {
        namespace Parameters {
            export type Cursor = string;
            export type EntityId = string;
            export type Limit = number;
            export type Order = "asc" | "desc";
            export type Slug = /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ Components.Schemas.ConditionalEntitySlug;
            export type VariantId = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
            variant_id: Parameters.VariantId;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            order?: Parameters.Order;
            cursor?: Parameters.Cursor;
        }
        namespace Responses {
            export type $200 = Components.Schemas.VariantVersionList;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $403 = Components.Schemas.Error;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $ListConditionalVariants {
        namespace Parameters {
            export type EntityId = string;
            export type Slug = /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ Components.Schemas.ConditionalEntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
        }
        export type RequestBody = /**
         * How to narrow and page a variant listing. Every property is optional, so `{}` asks for the
         * first ten variants in `variant_id` order, but the body itself is required. `conditions` and
         * `search` narrow independently and a variant must satisfy both.
         *
         */
        Components.Schemas.ListVariantsRequest;
        namespace Responses {
            export type $200 = Components.Schemas.VariantList;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $403 = Components.Schemas.Error;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $PatchActiveConditionalVariantVersion {
        namespace Parameters {
            export type EntityId = string;
            export type Slug = /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ Components.Schemas.ConditionalEntitySlug;
            export type VariantId = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
            variant_id: Parameters.VariantId;
        }
        export type RequestBody = Components.Schemas.PatchVersionRequest;
        namespace Responses {
            export type $200 = /* A version as a write left it, together with anything the write moved. */ Components.Schemas.WrittenVariantVersion;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $403 = Components.Schemas.Error;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $PatchConditionalVariantVersion {
        namespace Parameters {
            export type EntityId = string;
            export type Slug = /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ Components.Schemas.ConditionalEntitySlug;
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
            export type $200 = /* A version as a write left it, together with anything the write moved. */ Components.Schemas.WrittenVariantVersion;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $403 = Components.Schemas.Error;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
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
            export type Slug = /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ Components.Schemas.ConditionalEntitySlug;
            export type VariantId = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            entity_id: Parameters.EntityId;
            variant_id: Parameters.VariantId;
        }
        export type RequestBody = Components.Schemas.ReplaceVersionRequest;
        namespace Responses {
            export type $200 = /* A version as a write left it, together with anything the write moved. */ Components.Schemas.WrittenVariantVersion;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $403 = Components.Schemas.Error;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $ReplaceConditionalVariantVersion {
        namespace Parameters {
            export type EntityId = string;
            export type Slug = /* Schema slug of an entity type that can be conditional — the `{slug}` of every conditional-pricing route. */ Components.Schemas.ConditionalEntitySlug;
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
            export type $200 = /* A version as a write left it, together with anything the write moved. */ Components.Schemas.WrittenVariantVersion;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $403 = Components.Schemas.Error;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
        }
    }
    namespace $ResolveConditionalEntity {
        export type RequestBody = /**
         * A resolve names one conditional entity and selects its variants either by `context` or by
         * `variant_id`, never both. `context: {}` matches nothing and so returns the `default`
         * variant, which is how to ask for it without knowing its id.
         *
         */
        Components.Schemas.ResolveConditionalEntityRequest;
        namespace Responses {
            export type $200 = Components.Schemas.ResolvedVariants;
            export type $400 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $404 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
             *
             */
            Components.Schemas.ConditionalPricingError;
            export type $409 = /**
             * An error from a conditional-pricing operation, carrying a `code` plus the structured data
             * that code explains. `details` is typed per code: narrow on `code` and the object under it
             * declares exactly the fields that code sends.
             *
             * A request these schemas reject is answered by the request validator with a message and
             * carries neither `code` nor `details` — the last member of the union.
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
   * Returns the condition sets built in for one conditional entity type, ready to copy into that schema's `conditions` array. Read-only, and the same for every organization.
   */
  '$getConditionSets'(
    parameters?: Parameters<Paths.$GetConditionSets.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$GetConditionSets.Responses.$200>
  /**
   * $resolveConditionalEntity - $resolveConditionalEntity
   * 
   * Returns the variants of one conditional entity that apply, each composed: the base entity
   * overlaid with the version in effect at `as_of`.
   * 
   * Select the variant either by `context`, matched against the conditions each variant pins, or
   * by `variant_id`. Exactly one of the two. A condition a variant leaves unpinned matches any
   * value; a condition absent from `context` matches only variants that leave it unpinned.
   * 
   * When no variant matches, the entity's `default` variant is returned, or `results` is empty.
   * `options.hydrate` replaces relation references with the entities they reference.
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
   * Creates one variant together with its first version.
   * 
   * `conditions` pins the situation the variant applies to, as exact values. A variant must pin
   * at least one condition or be marked `default`, of which an entity may have one, and its
   * condition values are fixed once created.
   * 
   * Values are stored only for attributes carrying `overridable_attribute`; the rest are
   * reported in `warnings` rather than rejected. `variant_id` is server-generated.
   * 
   */
  '$createConditionalVariant'(
    parameters?: Parameters<Paths.$CreateConditionalVariant.PathParameters> | null,
    data?: Paths.$CreateConditionalVariant.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$CreateConditionalVariant.Responses.$201>
  /**
   * $listConditionalVariants - $listConditionalVariants
   * 
   * Lists a conditional entity's variants and the conditions each one pins. A `POST` because the
   * condition filter is a structured object; nothing is written. The body is required, so send
   * `{}` for the first page.
   * 
   * `conditions` filters on the pins, taking the same predicates a resolve context does, and
   * matches a variant only where it pins that condition. `search` is free text over pinned
   * values; `sort` orders by one pin.
   * 
   * Offset paging up to the search index's window, then the `cursor` from `next`.
   * 
   */
  '$listConditionalVariants'(
    parameters?: Parameters<Paths.$ListConditionalVariants.PathParameters> | null,
    data?: Paths.$ListConditionalVariants.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$ListConditionalVariants.Responses.$200>
  /**
   * $getConditionalVariantTree - $getConditionalVariantTree
   * 
   * The variants list, each row carrying the version in effect at `as_of` and a `status` saying
   * whether that version is `active` or still `scheduled`.
   * 
   * Takes everything the variants list takes, plus `as_of`. `size` is clamped at 100, and a
   * variant mid-delete is omitted from `results`.
   * 
   */
  '$getConditionalVariantTree'(
    parameters?: Parameters<Paths.$GetConditionalVariantTree.PathParameters> | null,
    data?: Paths.$GetConditionalVariantTree.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$GetConditionalVariantTree.Responses.$200>
  /**
   * $getActiveConditionalVariantVersion - $getActiveConditionalVariantVersion
   * 
   * Returns the version of this variant in effect now — the latest `valid_from` at or before now
   * — with the `_revision` a write to it must carry.
   * 
   * These are the version's own overrides; `:resolve` composes them onto the entity.
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
   * Replaces the values of the version in effect. The body is the complete set of overrides: an
   * overridable attribute absent from it stops being overridden, and one the variant may not
   * override keeps its stored value.
   * 
   * `valid_from` and `conditions` are accepted only unchanged.
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
   * Changes only the fields it names on the version in effect. `null` sets a value rather than
   * removing an override; use the replace operation to remove one.
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
   * Removes one variant: its condition tuple, its index entry and all its versions. The tuple
   * becomes reusable, and an interrupted delete is safe to send again.
   * 
   * Orders and contracts pinning the variant stop resolving. To remove a single version, address
   * it under `versions/{valid_from}`.
   * 
   */
  '$deleteConditionalVariant'(
    parameters?: Parameters<Paths.$DeleteConditionalVariant.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$DeleteConditionalVariant.Responses.$200>
  /**
   * $listConditionalVariantVersions - $listConditionalVariantVersions
   * 
   * Lists one variant's versions. Cursor paging only: a page may be short or empty and still
   * carry a `next`, so page until `next` is absent. A cursor is bound to one variant and one
   * `order`.
   * 
   */
  '$listConditionalVariantVersions'(
    parameters?: Parameters<Paths.$ListConditionalVariantVersions.QueryParameters & Paths.$ListConditionalVariantVersions.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$ListConditionalVariantVersions.Responses.$200>
  /**
   * $appendConditionalVariantVersion - $appendConditionalVariantVersion
   * 
   * Appends a version taking effect at its own instant. The version in effect at any instant is
   * the one with the latest `valid_from` at or before it; a future one is staged until its date.
   * 
   * A past `valid_from` is accepted and reported in `warnings`. One the variant already has is
   * refused — replace or patch that version instead.
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
   * Returns one version by the instant it takes effect. Exact, never nearest.
   */
  '$getConditionalVariantVersion'(
    parameters?: Parameters<Paths.$GetConditionalVariantVersion.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$GetConditionalVariantVersion.Responses.$200>
  /**
   * $replaceConditionalVariantVersion - $replaceConditionalVariantVersion
   * 
   * Replaces one version's values, whatever its date. Attributes the variant may not override
   * keep their stored value. Writing a superseded version is reported in `warnings`.
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
   * Changes only the fields it names on one version.
   */
  '$patchConditionalVariantVersion'(
    parameters?: Parameters<Paths.$PatchConditionalVariantVersion.PathParameters> | null,
    data?: Paths.$PatchConditionalVariantVersion.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$PatchConditionalVariantVersion.Responses.$200>
  /**
   * $deleteConditionalVariantVersion - $deleteConditionalVariantVersion
   * 
   * Removes one version. What the removal moves is reported in `warnings`. A variant's last
   * remaining version cannot be removed — delete the variant instead.
   * 
   */
  '$deleteConditionalVariantVersion'(
    parameters?: Parameters<Paths.$DeleteConditionalVariantVersion.QueryParameters & Paths.$DeleteConditionalVariantVersion.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$DeleteConditionalVariantVersion.Responses.$200>
  /**
   * $batchUpsertConditionalVariants - $batchUpsertConditionalVariants
   * 
   * Writes up to 100 variants or versions in one call. Each item names its own entity, so one
   * call can span a tariff hierarchy, and addresses a variant by condition tuple rather than by
   * id — the id it created or found is on the result entry.
   * 
   * Each item's outcome is derived from what is stored: an unknown tuple is `variant_created`, a
   * known tuple with no version at the item's `valid_from` is `version_created`, an existing
   * version there is `updated`, and a write matching what is stored is `skipped`. An item
   * without `valid_from` is a last-write-wins write with no `skipped` detection.
   * 
   * Items addressing the same `(entity_id, conditions)` apply in array order; the rest run in
   * parallel. No cross-item rollback, and no `_revision` guard.
   * 
   */
  '$batchUpsertConditionalVariants'(
    parameters?: Parameters<Paths.$BatchUpsertConditionalVariants.PathParameters> | null,
    data?: Paths.$BatchUpsertConditionalVariants.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$BatchUpsertConditionalVariants.Responses.$200>
  /**
   * $batchDeleteConditionalVariants - $batchDeleteConditionalVariants
   * 
   * Removes up to 100 variants or versions in one call. An item carrying `valid_from` removes
   * that version; one without it removes the whole variant.
   * 
   * Each item addresses its variant by `variant_id` beside its `entity_id`, or by the condition
   * tuple it pins, never both. Use ids once a condition has left the schema, since its tuple can
   * no longer be canonicalized.
   * 
   * Items addressing the same variant apply in array order, resolved to ids first; the rest run
   * in parallel. An item addressing a missing variant or version is `skipped`, and the call is
   * safe to send again.
   * 
   */
  '$batchDeleteConditionalVariants'(
    parameters?: Parameters<Paths.$BatchDeleteConditionalVariants.PathParameters> | null,
    data?: Paths.$BatchDeleteConditionalVariants.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$BatchDeleteConditionalVariants.Responses.$200>
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
     * Returns the condition sets built in for one conditional entity type, ready to copy into that schema's `conditions` array. Read-only, and the same for every organization.
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
     * Returns the variants of one conditional entity that apply, each composed: the base entity
     * overlaid with the version in effect at `as_of`.
     * 
     * Select the variant either by `context`, matched against the conditions each variant pins, or
     * by `variant_id`. Exactly one of the two. A condition a variant leaves unpinned matches any
     * value; a condition absent from `context` matches only variants that leave it unpinned.
     * 
     * When no variant matches, the entity's `default` variant is returned, or `results` is empty.
     * `options.hydrate` replaces relation references with the entities they reference.
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
     * Creates one variant together with its first version.
     * 
     * `conditions` pins the situation the variant applies to, as exact values. A variant must pin
     * at least one condition or be marked `default`, of which an entity may have one, and its
     * condition values are fixed once created.
     * 
     * Values are stored only for attributes carrying `overridable_attribute`; the rest are
     * reported in `warnings` rather than rejected. `variant_id` is server-generated.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.$CreateConditionalVariant.PathParameters> | null,
      data?: Paths.$CreateConditionalVariant.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$CreateConditionalVariant.Responses.$201>
  }
  ['/v1/conditional-pricing/{slug}/entities/{entity_id}/variants:list']: {
    /**
     * $listConditionalVariants - $listConditionalVariants
     * 
     * Lists a conditional entity's variants and the conditions each one pins. A `POST` because the
     * condition filter is a structured object; nothing is written. The body is required, so send
     * `{}` for the first page.
     * 
     * `conditions` filters on the pins, taking the same predicates a resolve context does, and
     * matches a variant only where it pins that condition. `search` is free text over pinned
     * values; `sort` orders by one pin.
     * 
     * Offset paging up to the search index's window, then the `cursor` from `next`.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.$ListConditionalVariants.PathParameters> | null,
      data?: Paths.$ListConditionalVariants.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$ListConditionalVariants.Responses.$200>
  }
  ['/v1/conditional-pricing/{slug}/entities/{entity_id}/variants:tree']: {
    /**
     * $getConditionalVariantTree - $getConditionalVariantTree
     * 
     * The variants list, each row carrying the version in effect at `as_of` and a `status` saying
     * whether that version is `active` or still `scheduled`.
     * 
     * Takes everything the variants list takes, plus `as_of`. `size` is clamped at 100, and a
     * variant mid-delete is omitted from `results`.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.$GetConditionalVariantTree.PathParameters> | null,
      data?: Paths.$GetConditionalVariantTree.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$GetConditionalVariantTree.Responses.$200>
  }
  ['/v1/conditional-pricing/{slug}/entities/{entity_id}/variants/{variant_id}']: {
    /**
     * $getActiveConditionalVariantVersion - $getActiveConditionalVariantVersion
     * 
     * Returns the version of this variant in effect now — the latest `valid_from` at or before now
     * — with the `_revision` a write to it must carry.
     * 
     * These are the version's own overrides; `:resolve` composes them onto the entity.
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
     * Replaces the values of the version in effect. The body is the complete set of overrides: an
     * overridable attribute absent from it stops being overridden, and one the variant may not
     * override keeps its stored value.
     * 
     * `valid_from` and `conditions` are accepted only unchanged.
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
     * Changes only the fields it names on the version in effect. `null` sets a value rather than
     * removing an override; use the replace operation to remove one.
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
     * Removes one variant: its condition tuple, its index entry and all its versions. The tuple
     * becomes reusable, and an interrupted delete is safe to send again.
     * 
     * Orders and contracts pinning the variant stop resolving. To remove a single version, address
     * it under `versions/{valid_from}`.
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
     * $listConditionalVariantVersions - $listConditionalVariantVersions
     * 
     * Lists one variant's versions. Cursor paging only: a page may be short or empty and still
     * carry a `next`, so page until `next` is absent. A cursor is bound to one variant and one
     * `order`.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.$ListConditionalVariantVersions.QueryParameters & Paths.$ListConditionalVariantVersions.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$ListConditionalVariantVersions.Responses.$200>
    /**
     * $appendConditionalVariantVersion - $appendConditionalVariantVersion
     * 
     * Appends a version taking effect at its own instant. The version in effect at any instant is
     * the one with the latest `valid_from` at or before it; a future one is staged until its date.
     * 
     * A past `valid_from` is accepted and reported in `warnings`. One the variant already has is
     * refused — replace or patch that version instead.
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
     * Returns one version by the instant it takes effect. Exact, never nearest.
     */
    'get'(
      parameters?: Parameters<Paths.$GetConditionalVariantVersion.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$GetConditionalVariantVersion.Responses.$200>
    /**
     * $replaceConditionalVariantVersion - $replaceConditionalVariantVersion
     * 
     * Replaces one version's values, whatever its date. Attributes the variant may not override
     * keep their stored value. Writing a superseded version is reported in `warnings`.
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
     * Changes only the fields it names on one version.
     */
    'patch'(
      parameters?: Parameters<Paths.$PatchConditionalVariantVersion.PathParameters> | null,
      data?: Paths.$PatchConditionalVariantVersion.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$PatchConditionalVariantVersion.Responses.$200>
    /**
     * $deleteConditionalVariantVersion - $deleteConditionalVariantVersion
     * 
     * Removes one version. What the removal moves is reported in `warnings`. A variant's last
     * remaining version cannot be removed — delete the variant instead.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.$DeleteConditionalVariantVersion.QueryParameters & Paths.$DeleteConditionalVariantVersion.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$DeleteConditionalVariantVersion.Responses.$200>
  }
  ['/v1/conditional-pricing/{slug}/variants:batchUpsert']: {
    /**
     * $batchUpsertConditionalVariants - $batchUpsertConditionalVariants
     * 
     * Writes up to 100 variants or versions in one call. Each item names its own entity, so one
     * call can span a tariff hierarchy, and addresses a variant by condition tuple rather than by
     * id — the id it created or found is on the result entry.
     * 
     * Each item's outcome is derived from what is stored: an unknown tuple is `variant_created`, a
     * known tuple with no version at the item's `valid_from` is `version_created`, an existing
     * version there is `updated`, and a write matching what is stored is `skipped`. An item
     * without `valid_from` is a last-write-wins write with no `skipped` detection.
     * 
     * Items addressing the same `(entity_id, conditions)` apply in array order; the rest run in
     * parallel. No cross-item rollback, and no `_revision` guard.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.$BatchUpsertConditionalVariants.PathParameters> | null,
      data?: Paths.$BatchUpsertConditionalVariants.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$BatchUpsertConditionalVariants.Responses.$200>
  }
  ['/v1/conditional-pricing/{slug}/variants:batchDelete']: {
    /**
     * $batchDeleteConditionalVariants - $batchDeleteConditionalVariants
     * 
     * Removes up to 100 variants or versions in one call. An item carrying `valid_from` removes
     * that version; one without it removes the whole variant.
     * 
     * Each item addresses its variant by `variant_id` beside its `entity_id`, or by the condition
     * tuple it pins, never both. Use ids once a condition has left the schema, since its tuple can
     * no longer be canonicalized.
     * 
     * Items addressing the same variant apply in array order, resolved to ids first; the rest run
     * in parallel. An item addressing a missing variant or version is `skipped`, and the call is
     * safe to send again.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.$BatchDeleteConditionalVariants.PathParameters> | null,
      data?: Paths.$BatchDeleteConditionalVariants.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$BatchDeleteConditionalVariants.Responses.$200>
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
export type BatchDeleteByConditions = Components.Schemas.BatchDeleteByConditions;
export type BatchDeleteByVariantId = Components.Schemas.BatchDeleteByVariantId;
export type BatchDeleteCounts = Components.Schemas.BatchDeleteCounts;
export type BatchDeleteItem = Components.Schemas.BatchDeleteItem;
export type BatchDeleteOutcome = Components.Schemas.BatchDeleteOutcome;
export type BatchDeleteResult = Components.Schemas.BatchDeleteResult;
export type BatchDeleteResultEntry = Components.Schemas.BatchDeleteResultEntry;
export type BatchDeleteVariantsRequest = Components.Schemas.BatchDeleteVariantsRequest;
export type BatchUpsertCounts = Components.Schemas.BatchUpsertCounts;
export type BatchUpsertItem = Components.Schemas.BatchUpsertItem;
export type BatchUpsertOutcome = Components.Schemas.BatchUpsertOutcome;
export type BatchUpsertResult = Components.Schemas.BatchUpsertResult;
export type BatchUpsertResultEntry = Components.Schemas.BatchUpsertResultEntry;
export type BatchUpsertVariantsRequest = Components.Schemas.BatchUpsertVariantsRequest;
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
export type ComputePriceInputs = Components.Schemas.ComputePriceInputs;
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
export type InertOverride = Components.Schemas.InertOverride;
export type InertOverrideReason = Components.Schemas.InertOverrideReason;
export type IntegrationAuthCredentials = Components.Schemas.IntegrationAuthCredentials;
export type IntegrationCredentialsResult = Components.Schemas.IntegrationCredentialsResult;
export type IntegrationId = Components.Schemas.IntegrationId;
export type JourneyContext = Components.Schemas.JourneyContext;
export type ListVariantsRequest = Components.Schemas.ListVariantsRequest;
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
export type PinnedResolveOptions = Components.Schemas.PinnedResolveOptions;
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
export type ReportedError = Components.Schemas.ReportedError;
export type ResolveByContextRequest = Components.Schemas.ResolveByContextRequest;
export type ResolveByPinRequest = Components.Schemas.ResolveByPinRequest;
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
export type VariantConditionFilter = Components.Schemas.VariantConditionFilter;
export type VariantConditions = Components.Schemas.VariantConditions;
export type VariantList = Components.Schemas.VariantList;
export type VariantListRow = Components.Schemas.VariantListRow;
export type VariantTree = Components.Schemas.VariantTree;
export type VariantTreeRequest = Components.Schemas.VariantTreeRequest;
export type VariantTreeRow = Components.Schemas.VariantTreeRow;
export type VariantTreeRowStatus = Components.Schemas.VariantTreeRowStatus;
export type VariantValues = Components.Schemas.VariantValues;
export type VariantVersion = Components.Schemas.VariantVersion;
export type VariantVersionList = Components.Schemas.VariantVersionList;
export type VariantVersionSnapshot = Components.Schemas.VariantVersionSnapshot;
export type VersionMoved = Components.Schemas.VersionMoved;
export type WriteWarning = Components.Schemas.WriteWarning;
export type WrittenVariantVersion = Components.Schemas.WrittenVariantVersion;
