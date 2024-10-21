/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
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
        export interface AvailabilityDate {
            /**
             * The availability interval start date
             * example:
             * 2017-07-21
             */
            available_start_date?: string; // date
            /**
             * The availability interval end date
             * example:
             * 2017-07-21
             */
            available_end_date?: string; // date
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
         * The availability check result payload
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
         * Represents a price item
         * example:
         * {
         *   "$ref": "#/components/examples/price-item/value"
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
             * The flag for prices that contain price components.
             */
            is_composite_price?: boolean;
            /**
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
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
             *   "$ref": "#/components/examples/product"
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
                product_images?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                product_downloads?: {
                    $relation?: EntityRelation[];
                };
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
             * The unit amount before any discount is applied
             */
            before_discount_unit_amount?: number;
            /**
             * The unit amount in cents to be charged, represented as a decimal string with at most 12 decimal places.
             */
            unit_amount_decimal?: string;
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
             * The price snapshot data.
             */
            _price?: /* The price snapshot data. */ /**
             * The price entity schema for simple pricing
             * example:
             * {
             *   "$ref": "#/components/examples/price"
             * }
             */
            Price | /**
             * The price entity schema for dynamic pricing
             * example:
             * {
             *   "$ref": "#/components/examples/composite-price"
             * }
             */
            CompositePrice;
            /**
             * The taxes applied to the price item.
             */
            taxes?: (/* A tax amount associated with a specific tax rate. */ TaxAmount)[];
            /**
             * The sum of amounts of the price items by recurrence.
             */
            recurrences?: (/* An amount associated with a specific recurrence. */ RecurrenceAmount)[];
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
             * The flag for prices that contain price components.
             */
            is_composite_price?: boolean;
            /**
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
            /**
             * Price mapping information required to compute totals
             */
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
             *   "$ref": "#/components/examples/product"
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
                product_images?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                product_downloads?: {
                    $relation?: EntityRelation[];
                };
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
             * The flag for prices that contain price components.
             */
            is_composite_price?: boolean;
            /**
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
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
             *   "$ref": "#/components/examples/product"
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
                product_images?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                product_downloads?: {
                    $relation?: EntityRelation[];
                };
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
            _coupons?: (/**
             * The coupon configuration
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
         * The basic auth credentials
         */
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
            /**
             * The base URL
             * example:
             * https://api.example.com
             */
            base_url?: string;
        }
        export type BillingPeriod = "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly";
        /**
         * Supports shopping for products and services until ready for checkout.
         */
        export interface Cart {
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
             * The cart identifier
             */
            id?: string;
            /**
             * The user's Organization Id the cart belongs to
             */
            org_id?: string;
            /**
             * The status of the Cart:
             * - open - the cart checkout is still in progress. Payment processing has not started
             * - complete - the cart checkout is complete. Payment processing may still be in progress
             * - expired - the cart checkout has expired. No further processing will occur
             *
             */
            status?: "open" | "complete" | "expired";
            customer?: Customer;
            billing_address?: Address;
            delivery_address?: Address;
            metadata?: /* A set of key-value pairs used to store meta data information about an entity. */ MetaData;
            line_items?: /* Tracks a set of product prices, quantities, (discounts) and taxes. */ PriceItems;
            total_details?: /* The total details with tax (and discount) aggregated totals. */ TotalDetails;
            created_at?: string; // date-time
            updated_at?: string; // date-time
        }
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
             * The number os results returned.
             */
            hits?: number;
            results?: (/**
             * The product entity
             * example:
             * {
             *   "$ref": "#/components/examples/product"
             * }
             */
            Product | /**
             * The price entity schema for simple pricing
             * example:
             * {
             *   "$ref": "#/components/examples/price"
             * }
             */
            Price | /**
             * The coupon configuration
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
             *   "$ref": "#/components/examples/order-with-simple-prices"
             * }
             */
            Order;
        }
        /**
         * The checkout mode for the cart checkout.
         */
        export type CheckoutMode = "create_order" | "create_invoice" | "create_quote";
        /**
         * The price entity schema for dynamic pricing
         * example:
         * {
         *   "$ref": "#/components/examples/composite-price"
         * }
         */
        export interface CompositePrice {
            [name: string]: any;
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
             *   "$ref": "#/components/examples/price"
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
            is_composite_price?: boolean;
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
         * Represents a composite price input to the pricing library.
         * example:
         * {
         *   "$ref": "#/components/examples/price-item/value"
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
             * The flag for prices that contain price components.
             */
            is_composite_price?: boolean;
            /**
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
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
             *   "$ref": "#/components/examples/product"
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
                product_images?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                product_downloads?: {
                    $relation?: EntityRelation[];
                };
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
             * The unit amount before any discount is applied
             */
            before_discount_unit_amount?: number;
            /**
             * The unit amount in cents to be charged, represented as a decimal string with at most 12 decimal places.
             */
            unit_amount_decimal?: string;
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
             * The price snapshot data.
             */
            _price?: /* The price snapshot data. */ /**
             * The price entity schema for simple pricing
             * example:
             * {
             *   "$ref": "#/components/examples/price"
             * }
             */
            Price | /**
             * The price entity schema for dynamic pricing
             * example:
             * {
             *   "$ref": "#/components/examples/composite-price"
             * }
             */
            CompositePrice;
            /**
             * The taxes applied to the price item.
             */
            taxes?: (/* A tax amount associated with a specific tax rate. */ TaxAmount)[];
            /**
             * The sum of amounts of the price items by recurrence.
             */
            recurrences?: (/* An amount associated with a specific recurrence. */ RecurrenceAmount)[];
            /**
             * When set to true on a `_price` displayed as OnRequest (`show_as_on_request: 'on_request'`) this flag means the price has been approved and can now be displayed to the customer. This flag is only valid for prices shown as 'on_request'.
             */
            on_request_approved?: boolean;
            /**
             * Contains price item configurations, per price component, when the main price item is a [composite price](/api/pricing#tag/dynamic_price_schema).
             */
            item_components?: /**
             * Represents a price item
             * example:
             * {
             *   "$ref": "#/components/examples/price-item/value"
             * }
             */
            PriceItem[];
            total_details?: /* The total details with tax (and discount) aggregated totals. */ TotalDetails;
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
             * The flag for prices that contain price components.
             */
            is_composite_price?: boolean;
            /**
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
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
             *   "$ref": "#/components/examples/product"
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
                product_images?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                product_downloads?: {
                    $relation?: EntityRelation[];
                };
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
            _coupons?: (/**
             * The coupon configuration
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
            /**
             * Contains price item configurations, per price component, when the main price item is a [composite price](/api/pricing#tag/dynamic_price_schema).
             */
            item_components?: /* Represents a price input to the pricing library. */ PriceItemDto[];
            /**
             * The ids of the price components that should be selected for the price calculation.
             */
            selected_price_component_ids?: string[];
            _price?: /**
             * The price entity schema for dynamic pricing
             * example:
             * {
             *   "$ref": "#/components/examples/composite-price"
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
             * The monthly consumption to compute the price in kWh (to be deprecated in favor of consumption_HT)
             */
            consumption?: number;
            /**
             * The monthly HT consumption to compute the price in kWh
             */
            consumption_HT?: number;
            /**
             * The monthly NT consumption to compute the price in kWh
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
             * The monthly consumption to compute the price in kWh (to be deprecated in favor of consumption_HT)
             */
            consumption?: number;
            /**
             * The monthly HT consumption to compute the price in kWh
             */
            consumption_HT?: number;
            /**
             * The monthly NT consumption to compute the price in kWh
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
             * The monthly consumption to compute the price in kWh (to be deprecated in favor of consumption_HT)
             */
            consumption?: number;
            /**
             * The monthly HT consumption to compute the price in kWh
             */
            consumption_HT?: number;
            /**
             * The monthly NT consumption to compute the price in kWh
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
             * The computed variable price, for the night period
             */
            amount_variable_nt?: number;
            /**
             * The computed variable price, for the night period, as decimal
             */
            amount_variable_decimal_nt?: string;
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
        }
        /**
         * Price breakdown
         */
        export interface ComputedPriceBreakdown {
            /**
             * The static price breakdown
             */
            static?: /* The computed price components */ ComputedPriceComponents;
            /**
             * The variable price breakdown
             */
            variable?: /* The computed price components */ ComputedPriceComponents;
        }
        /**
         * The computed price components
         */
        export interface ComputedPriceComponents {
            [name: string]: /* The computed price */ ComputedBasePrice;
        }
        export type ConsumptionTypeGetAg = "household" | "heating_pump" | "night_storage_heating" | "night_storage_heating_common_meter";
        /**
         * The coupon configuration
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
            name: string;
            description?: string;
            type: "fixed" | "percentage";
            /**
             * Use if type is set to percentage. The percentage to be discounted, represented as a whole integer.
             */
            percentage_value?: string;
            /**
             * Use if type is set to fixed. The fixed amount in cents to be discounted, represented as a whole integer.
             */
            fixed_value?: number;
            /**
             * Use if type is set to fixed. The unit amount in cents to be discounted, represented as a decimal string with at most 12 decimal places.
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
            active?: boolean;
            /**
             * The prices associated with the coupon. Will hold price entities if hydrated, relations otherwise.
             */
            prices?: /* The prices associated with the coupon. Will hold price entities if hydrated, relations otherwise. */ {
                $relation?: EntityRelation[];
            } | /**
             * The price entity schema for simple pricing
             * example:
             * {
             *   "$ref": "#/components/examples/price"
             * }
             */
            Price[];
        }
        /**
         * Three-letter ISO currency code, in lowercase. Must be a supported currency.
         * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
         *
         * example:
         * EUR
         */
        export type Currency = string;
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
        export type EntityId = string; // uuid
        /**
         * example:
         * {
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "_org": "123",
         *   "_schema": "contact",
         *   "_tags": [
         *     "example",
         *     "mock"
         *   ],
         *   "_created_at": "2021-02-09T12:41:43.662Z",
         *   "_updated_at": "2021-02-09T12:41:43.662Z"
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
        export interface ExternalCompositePrice {
            /**
             * Fees structure with static and variable amounts
             */
            fees?: {
                billing_period: BillingPeriod;
                /**
                 * example:
                 * 1.00
                 */
                amount_total_decimal: string;
                /**
                 * example:
                 * 1.00
                 */
                amount_static_decimal: string;
                /**
                 * example:
                 * 1.00
                 */
                amount_variable_decimal: string;
                /**
                 * Breakdown of the fee values
                 */
                breakdown: {
                    /**
                     * Static breakdown of fees
                     */
                    static?: {
                        [name: string]: {
                            /**
                             * The amount of the fee, as a string with all the decimal places.
                             * example:
                             * 1.00
                             */
                            amount_decimal?: string;
                        };
                    };
                    /**
                     * Variable breakdown of fees
                     */
                    variable?: {
                        [name: string]: {
                            /**
                             * example:
                             * 1.00
                             */
                            amount_decimal: string;
                            /**
                             * The unit of the fee (e.g. kWh) if applicable.
                             */
                            unit?: string;
                        };
                    };
                };
            };
            is_composite_price: true;
            price_components: ExternalSimplePrice[];
            total_details: /* Details of the total price including shipping and tax amounts. */ ExternalPriceTotalDetails;
        }
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
             * The computed variable price, for the night period
             */
            amount_variable_nt?: number;
            /**
             * The computed variable price, for the night period, as decimal
             */
            amount_variable_decimal_nt?: string;
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
        export interface ExternalPriceFees {
            /**
             * Fees structure with static and variable amounts
             */
            fees?: {
                /**
                 * The billing period of the fee values (e.g. monthly).
                 */
                billing_period: BillingPeriod;
                /**
                 * example:
                 * 1.00
                 */
                amount_total_decimal: string;
                /**
                 * example:
                 * 1.00
                 */
                amount_static_decimal: string;
                /**
                 * example:
                 * 1.00
                 */
                amount_variable_decimal: string;
                /**
                 * Breakdown of the fee values
                 */
                breakdown: {
                    /**
                     * Static breakdown of fees
                     */
                    static?: {
                        [name: string]: {
                            /**
                             * The amount of the fee, as a string with all the decimal places.
                             * example:
                             * 1.00
                             */
                            amount_decimal?: string;
                        };
                    };
                    /**
                     * Variable breakdown of fees
                     */
                    variable?: {
                        [name: string]: {
                            /**
                             * example:
                             * 1.00
                             */
                            amount_decimal: string;
                            /**
                             * The unit of the fee (e.g. kWh) if applicable.
                             */
                            unit?: string;
                        };
                    };
                };
            };
        }
        /**
         * Details of the total price including shipping and tax amounts.
         */
        export interface ExternalPriceTotalDetails {
            /**
             * A breakdown of the recurrences of amounts.
             */
            breakdown: {
                recurrences?: {
                    /**
                     * Total of all items before discounts or taxes, as a string with all the decimal places.
                     * example:
                     * 1.00
                     */
                    amount_subtotal_decimal: string;
                    /**
                     * Total of all items after discounts and taxes, as a string with all the decimal places.
                     * example:
                     * 1.19
                     */
                    amount_total_decimal: string;
                    /**
                     * The price type.
                     * example:
                     * one_time
                     */
                    type: "one_time" | "recurring";
                    /**
                     * The billing period of the price.
                     */
                    billing_period?: BillingPeriod;
                }[];
            };
        }
        /**
         * An external product & price information (already computed) from an external catalog.
         */
        export interface ExternalProduct {
            /**
             * The ID of the product in the external catalog.
             */
            id: string;
            /**
             * The name of the product.
             */
            name: string;
            /**
             * A description of the product.
             */
            description?: string;
            /**
             * A list of features of the product.
             */
            features?: string[];
            /**
             * A list of image URLs of the product. RECOMMENDED: Store files in Epilot for advantages such as resizing, versioning, easy access, and maintenance.
             *
             */
            product_image_urls?: string[];
            /**
             * A list of file/attachment URLs of the product RECOMMENDED: Store files in Epilot for advantages such as resizing, versioning, easy access, and maintenance.
             *
             */
            product_downloads_urls?: string[];
            /**
             * Legal footnotes for the product.
             */
            legal_footnotes?: string;
            /**
             * Additional notes for the product.
             */
            additional_notes?: string[];
            /**
             * Recommendation settings for the product.
             * example:
             * {
             *   "is_recommended": true,
             *   "recommended_label": "Best Value"
             * }
             */
            recommendation_settings?: {
                /**
                 * Flag to enable or disable the recommendation for this product.
                 */
                is_recommended?: boolean;
                /**
                 * Label to display when the product is recommended.
                 */
                recommended_label?: string;
            };
            price: ExternalSimplePrice | ExternalCompositePrice;
        }
        export interface ExternalSimplePrice {
            /**
             * Fees structure with static and variable amounts
             */
            fees?: {
                billing_period: BillingPeriod;
                /**
                 * example:
                 * 1.00
                 */
                amount_total_decimal: string;
                /**
                 * example:
                 * 1.00
                 */
                amount_static_decimal: string;
                /**
                 * example:
                 * 1.00
                 */
                amount_variable_decimal: string;
                /**
                 * Breakdown of the fee values
                 */
                breakdown: {
                    /**
                     * Static breakdown of fees
                     */
                    static?: {
                        [name: string]: {
                            /**
                             * The amount of the fee, as a string with all the decimal places.
                             * example:
                             * 1.00
                             */
                            amount_decimal?: string;
                        };
                    };
                    /**
                     * Variable breakdown of fees
                     */
                    variable?: {
                        [name: string]: {
                            /**
                             * example:
                             * 1.00
                             */
                            amount_decimal: string;
                            /**
                             * The unit of the fee (e.g. kWh) if applicable.
                             */
                            unit?: string;
                        };
                    };
                };
            };
            is_composite_price: false;
            /**
             * A flag to indicate if the price is variable.
             *
             */
            variable_price?: boolean;
            /**
             * The unit of measurement used for display purposes and possibly for calculations when the price is variable.
             * example:
             * kWh
             */
            unit?: string;
            /**
             * The currency of the price. ISO 4217 currency code. E.g. EUR.
             * example:
             * EUR
             */
            currency?: string;
            /**
             * The price type.
             */
            type: "one_time" | "recurring";
            billing_period?: BillingPeriod;
            /**
             * The unit gross amount value, as a string with all the decimal places.
             * example:
             * 1.19
             */
            unit_amount_gross_decimal: string;
            /**
             * The unit net amount value, as a string with all the decimal places.
             * example:
             * 1.00
             */
            unit_amount_net_decimal: string;
            /**
             * Total of all items before discounts or taxes, as a string with all the decimal places.
             * example:
             * 1.00
             */
            amount_subtotal_decimal: string;
            /**
             * Total of all items after discounts and taxes, as a string with all the decimal places.
             * example:
             * 1.19
             */
            amount_total_decimal: string;
            tax?: {
                /**
                 * The tax name.
                 * example:
                 * VAT
                 */
                name?: string;
                /**
                 * The tax description.
                 * example:
                 * Value Added Tax
                 */
                description?: string;
                /**
                 * The type of the tax.
                 * example:
                 * VAT
                 */
                type?: "VAT" | "GST" | "Custom";
                /**
                 * The tax rate applied.
                 * example:
                 * 19
                 */
                rate: number;
                /**
                 * The region code of the tax.
                 * example:
                 * DE
                 */
                region?: string;
                /**
                 * The region label of the tax.
                 * example:
                 * Germany
                 */
                region_label?: string;
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
        export type IntegrationCredentialsResult = /* The basic auth credentials */ BasicAuthCredentials;
        export type IntegrationId = "getag" | "ikom";
        export interface JourneyContext {
            /**
             * The ID of the journey.
             * example:
             * 8d0a2235-97ce-42d0-88a3-e374634ca44e
             */
            journey_id: string;
            /**
             * The name of the journey.
             * example:
             * journey name
             */
            journey_name: string;
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
         * The opportunity entity
         * example:
         * {
         *   "$ref": "#/components/examples/opportunity"
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
         *   "$ref": "#/components/examples/order-with-simple-prices"
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
         * The meter type for power
         */
        export type PowerMeterType = "classic" | "smart" | "digital";
        /**
         * The price entity schema for simple pricing
         * example:
         * {
         *   "$ref": "#/components/examples/price"
         * }
         */
        export interface Price {
            [name: string]: any;
            /**
             * Whether the price can be used for new purchases.
             */
            active?: boolean;
            /**
             * The flag for prices that contain price components.
             */
            is_composite_price?: boolean;
            /**
             * Describes how to compute the price per period. Either `per_unit`, `tiered_graduated` or `tiered_volume`.
             * - `per_unit` indicates that the fixed amount (specified in unit_amount or unit_amount_decimal) will be charged per unit in quantity
             * - `tiered_graduated` indicates that the unit pricing will be computed using tiers attribute. The customer pays the price per unit in every range their purchase rises through.
             * - `tiered_volume` indicates that the unit pricing will be computed using tiers attribute. The customer pays the same unit price for all purchased units.
             * - `tiered_flatfee` While similar to tiered_volume, tiered flat fee charges for the same price (flat) for the entire range instead using the unit price to multiply the quantity.
             * - `external_getag` indicates that the price is influenced by aquisition fees provided by GetAG.
             *
             */
            pricing_model: "per_unit" | "tiered_graduated" | "tiered_volume" | "tiered_flatfee" | "external_getag";
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
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "type": "VAT",
             *   "description": "Tax description",
             *   "active": "true",
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
             * The unit amount in cents to be charged, represented as a decimal string with at most 12 decimal places.
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
            price_display_in_journeys?: "show_price" | "show_as_starting_price" | "show_as_on_request";
            /**
             * The billing period duration
             */
            billing_duration_amount?: number;
            /**
             * The billing period duration unit
             */
            billing_duration_unit?: "weeks" | "months" | "years";
            /**
             * The notice period duration
             */
            notice_time_amount?: number;
            /**
             * The notice period duration unit
             */
            notice_time_unit?: "weeks" | "months" | "years";
            /**
             * The termination period duration
             */
            termination_time_amount?: number;
            /**
             * The termination period duration unit
             */
            termination_time_unit?: "weeks" | "months" | "years";
            /**
             * The renewal period duration
             */
            renewal_duration_amount?: number;
            /**
             * The renewal period duration unit
             */
            renewal_duration_unit?: "weeks" | "months" | "years";
            /**
             * The flag for prices that can be influenced by external variables such as user input.
             */
            variable_price?: boolean;
            /**
             * The unit of measurement used for display purposes and possibly for calculations when the price is variable.
             */
            unit?: /* The unit of measurement used for display purposes and possibly for calculations when the price is variable. */ ("kw" | "kwh" | "m" | "m2" | "l" | "cubic-meter" | "cubic-meter-h" | "ls" | "a" | "kva" | "w" | "wp" | "kwp") | string;
            get_ag?: PriceGetAg;
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
         *   "$ref": "#/components/examples/price-item/value"
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
             * The flag for prices that contain price components.
             */
            is_composite_price?: boolean;
            /**
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
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
             *   "$ref": "#/components/examples/product"
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
                product_images?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                product_downloads?: {
                    $relation?: EntityRelation[];
                };
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
             * The unit amount before any discount is applied
             */
            before_discount_unit_amount?: number;
            /**
             * The unit amount in cents to be charged, represented as a decimal string with at most 12 decimal places.
             */
            unit_amount_decimal?: string;
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
             * The price snapshot data.
             */
            _price?: /* The price snapshot data. */ /**
             * The price entity schema for simple pricing
             * example:
             * {
             *   "$ref": "#/components/examples/price"
             * }
             */
            Price | /**
             * The price entity schema for dynamic pricing
             * example:
             * {
             *   "$ref": "#/components/examples/composite-price"
             * }
             */
            CompositePrice;
            /**
             * The taxes applied to the price item.
             */
            taxes?: (/* A tax amount associated with a specific tax rate. */ TaxAmount)[];
            /**
             * The sum of amounts of the price items by recurrence.
             */
            recurrences?: (/* An amount associated with a specific recurrence. */ RecurrenceAmount)[];
            /**
             * When set to true on a `_price` displayed as OnRequest (`show_as_on_request: 'on_request'`) this flag means the price has been approved and can now be displayed to the customer. This flag is only valid for prices shown as 'on_request'.
             */
            on_request_approved?: boolean;
            /**
             * One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
             */
            type?: "one_time" | "recurring";
            /**
             * The price billing period.
             */
            billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly";
            pricing_model: /**
             * Describes how to compute the price per period. Either `per_unit`, `tiered_graduated` or `tiered_volume`.
             * - `per_unit` indicates that the fixed amount (specified in unit_amount or unit_amount_decimal) will be charged per unit in quantity
             * - `tiered_graduated` indicates that the unit pricing will be computed using tiers attribute. The customer pays the price per unit in every range their purchase rises through.
             * - `tiered_volume` indicates that the unit pricing will be computed using tiers attribute. The customer pays the same unit price for all purchased units.
             * - `tiered_flatfee` While similar to tiered_volume, tiered flat fee charges for the same price (flat) for the entire range instead using the unit price to multiply the quantity.
             * - `external_getag` indicates that the price is influenced by aquisition fees provided by GetAG.
             *
             */
            PricingModel;
            tiers_details?: TierDetails[];
            get_ag?: PriceGetAg;
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
             * The flag for prices that contain price components.
             */
            is_composite_price?: boolean;
            /**
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
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
             *   "$ref": "#/components/examples/product"
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
                product_images?: {
                    $relation?: EntityRelation[];
                };
                /**
                 * Stores references to a set of files downloadable from the product.
                 * e.g: tech specifications, quality control sheets, privacy policy agreements
                 *
                 */
                product_downloads?: {
                    $relation?: EntityRelation[];
                };
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
            _coupons?: (/**
             * The coupon configuration
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
            /**
             * One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
             */
            type?: "one_time" | "recurring";
            /**
             * The price billing period.
             */
            billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly";
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
             * The unit amount in cents to be charged, represented as a decimal string with at most 12 decimal places.
             */
            unit_amount_decimal?: string;
            /**
             * Describes how to compute the price per period. Either `per_unit`, `tiered_graduated` or `tiered_volume`.
             * - `per_unit` indicates that the fixed amount (specified in unit_amount or unit_amount_decimal) will be charged per unit in quantity
             * - `tiered_graduated` indicates that the unit pricing will be computed using tiers attribute. The customer pays the price per unit in every range their purchase rises through.
             * - `tiered_volume` indicates that the unit pricing will be computed using tiers attribute. The customer pays the same unit price for all purchased units.
             * - `tiered_flatfee` indicates that the unit pricing will be computed using tiers attribute. The customer pays the same unit price for all purchased units.
             * - `external_getag` indicates that the price is influenced by aquisition fees provided by GetAG.
             *
             */
            pricing_model: "per_unit" | "tiered_graduated" | "tiered_volume" | "tiered_flatfee" | "external_getag";
            /**
             * The snapshot of the price linked to the price item.
             * example:
             * {
             *   "$ref": "#/components/examples/price"
             * }
             */
            _price?: {
                [name: string]: any;
                /**
                 * Whether the price can be used for new purchases.
                 */
                active?: boolean;
                /**
                 * The flag for prices that contain price components.
                 */
                is_composite_price?: boolean;
                /**
                 * Describes how to compute the price per period. Either `per_unit`, `tiered_graduated` or `tiered_volume`.
                 * - `per_unit` indicates that the fixed amount (specified in unit_amount or unit_amount_decimal) will be charged per unit in quantity
                 * - `tiered_graduated` indicates that the unit pricing will be computed using tiers attribute. The customer pays the price per unit in every range their purchase rises through.
                 * - `tiered_volume` indicates that the unit pricing will be computed using tiers attribute. The customer pays the same unit price for all purchased units.
                 * - `tiered_flatfee` While similar to tiered_volume, tiered flat fee charges for the same price (flat) for the entire range instead using the unit price to multiply the quantity.
                 * - `external_getag` indicates that the price is influenced by aquisition fees provided by GetAG.
                 *
                 */
                pricing_model: "per_unit" | "tiered_graduated" | "tiered_volume" | "tiered_flatfee" | "external_getag";
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
                 *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                 *   "type": "VAT",
                 *   "description": "Tax description",
                 *   "active": "true",
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
                 * The unit amount in cents to be charged, represented as a decimal string with at most 12 decimal places.
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
                price_display_in_journeys?: "show_price" | "show_as_starting_price" | "show_as_on_request";
                /**
                 * The billing period duration
                 */
                billing_duration_amount?: number;
                /**
                 * The billing period duration unit
                 */
                billing_duration_unit?: "weeks" | "months" | "years";
                /**
                 * The notice period duration
                 */
                notice_time_amount?: number;
                /**
                 * The notice period duration unit
                 */
                notice_time_unit?: "weeks" | "months" | "years";
                /**
                 * The termination period duration
                 */
                termination_time_amount?: number;
                /**
                 * The termination period duration unit
                 */
                termination_time_unit?: "weeks" | "months" | "years";
                /**
                 * The renewal period duration
                 */
                renewal_duration_amount?: number;
                /**
                 * The renewal period duration unit
                 */
                renewal_duration_unit?: "weeks" | "months" | "years";
                /**
                 * The flag for prices that can be influenced by external variables such as user input.
                 */
                variable_price?: boolean;
                /**
                 * The unit of measurement used for display purposes and possibly for calculations when the price is variable.
                 */
                unit?: /* The unit of measurement used for display purposes and possibly for calculations when the price is variable. */ ("kw" | "kwh" | "m" | "m2" | "l" | "cubic-meter" | "cubic-meter-h" | "ls" | "a" | "kva" | "w" | "wp" | "kwp") | string;
                get_ag?: PriceGetAg;
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
        /**
         * Tracks a set of product prices, quantities, (discounts) and taxes.
         */
        export type PriceItems = (/**
         * Represents a price item
         * example:
         * {
         *   "$ref": "#/components/examples/price-item/value"
         * }
         */
        PriceItem | /**
         * Represents a composite price input to the pricing library.
         * example:
         * {
         *   "$ref": "#/components/examples/price-item/value"
         * }
         */
        CompositePriceItem)[];
        /**
         * A valid set of product prices, quantities, (discounts) and taxes from a client.
         */
        export type PriceItemsDto = (/* Represents a price input to the pricing library. */ PriceItemDto | /* Represents a composite price input to the pricing library. */ CompositePriceItemDto)[];
        export interface PriceTier {
            up_to?: number | null;
            flat_fee_amount?: number;
            flat_fee_amount_decimal?: string;
            unit_amount?: number;
            unit_amount_decimal?: string;
            display_mode?: PriceTierDisplayMode;
        }
        export type PriceTierDisplayMode = "hidden" | "on_request";
        export interface PriceTierEnhanced {
            up_to?: number | null;
            flat_fee_amount?: number;
            flat_fee_amount_decimal?: string;
            unit_amount?: number;
            unit_amount_decimal?: string;
            display_mode?: PriceTierDisplayMode;
            unit_amount_gross?: number;
            unit_amount_gross_decimal?: string;
            flat_fee_amount_gross?: number;
            flat_fee_amount_gross_decimal?: string;
        }
        /**
         * The result from the calculation of a set of price items.
         */
        export interface PricingDetails {
            items?: (/**
             * Represents a price item
             * example:
             * {
             *   "$ref": "#/components/examples/price-item/value"
             * }
             */
            PriceItem | /**
             * Represents a composite price input to the pricing library.
             * example:
             * {
             *   "$ref": "#/components/examples/price-item/value"
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
        }
        /**
         * The result from the calculation of a set of price items.
         */
        export interface PricingDetailsResponse {
            items?: (/**
             * Represents a price item
             * example:
             * {
             *   "$ref": "#/components/examples/price-item/value"
             * }
             */
            PriceItem | /**
             * Represents a composite price input to the pricing library.
             * example:
             * {
             *   "$ref": "#/components/examples/price-item/value"
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
        }
        /**
         * Describes how to compute the price per period. Either `per_unit`, `tiered_graduated` or `tiered_volume`.
         * - `per_unit` indicates that the fixed amount (specified in unit_amount or unit_amount_decimal) will be charged per unit in quantity
         * - `tiered_graduated` indicates that the unit pricing will be computed using tiers attribute. The customer pays the price per unit in every range their purchase rises through.
         * - `tiered_volume` indicates that the unit pricing will be computed using tiers attribute. The customer pays the same unit price for all purchased units.
         * - `tiered_flatfee` While similar to tiered_volume, tiered flat fee charges for the same price (flat) for the entire range instead using the unit price to multiply the quantity.
         * - `external_getag` indicates that the price is influenced by aquisition fees provided by GetAG.
         *
         */
        export type PricingModel = "per_unit" | "tiered_graduated" | "tiered_volume" | "tiered_flatfee" | "external_getag";
        /**
         * The product entity
         * example:
         * {
         *   "$ref": "#/components/examples/product"
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
            product_images?: {
                $relation?: EntityRelation[];
            };
            /**
             * Stores references to a set of files downloadable from the product.
             * e.g: tech specifications, quality control sheets, privacy policy agreements
             *
             */
            product_downloads?: {
                $relation?: EntityRelation[];
            };
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
             * The price type.
             */
            type?: string;
            /**
             * The price billing period.
             */
            billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly";
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
             * The price type.
             */
            type?: string;
            /**
             * The price billing period.
             */
            billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly";
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
            billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly";
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
            /**
             * The taxes applied to the price item.
             */
            tax?: {
                [key: string]: any;
            };
        }
        export type SalesTax = "nontaxable" | "reduced" | "standard";
        export type SaveIntegrationCredentialsParams = /* The basic auth credentials */ BasicAuthCredentials;
        export interface SearchExternalCatalogParams {
            context: JourneyContext;
        }
        export interface SearchExternalCatalogResult {
            /**
             * The number os results returned.
             */
            hits: number;
            results: /* An external product & price information (already computed) from an external catalog. */ ExternalProduct[];
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
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "type": "VAT",
         *   "description": "Tax description",
         *   "active": "true",
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
            rate: number;
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
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "type": "VAT",
             *   "description": "Tax description",
             *   "active": "true",
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
            Tax;
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
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "type": "VAT",
             *   "description": "Tax description",
             *   "active": "true",
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
            Tax;
        }
        export interface TaxBreakdownInfo {
            rate?: number;
            type?: "VAT" | "GST" | "Custom";
            _id?: string;
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
         *   "rules_parsed_count": 8,
         *   "errors": [
         *     "File must be UTF-8 encoded",
         *     "Error on line 3 - street_number must be of type number",
         *     "Error on line 6 - start_date cant be greater than end_date"
         *   ]
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
    }
}
declare namespace Paths {
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
             * The availability check result payload
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
    namespace $CalculatePricingDetails {
        export interface RequestBody {
            line_items?: /* A valid set of product prices, quantities, (discounts) and taxes from a client. */ Components.Schemas.PriceItemsDto;
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
    namespace $SearchExternalCatalog {
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
             *   "rules_parsed_count": 8,
             *   "errors": [
             *     "File must be UTF-8 encoded",
             *     "Error on line 3 - street_number must be of type number",
             *     "Error on line 6 - start_date cant be greater than end_date"
             *   ]
             * }
             */
            Components.Schemas.ValidateAvailabilityFileResult;
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
             *   "$ref": "#/components/examples/order-with-simple-prices"
             * }
             */
            Components.Schemas.Order;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace PutOrder {
        namespace Parameters {
            export type Id = string;
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
             *   "$ref": "#/components/examples/order-with-simple-prices"
             * }
             */
            Components.Schemas.Order;
            export type $400 = Components.Schemas.Error;
        }
    }
}

export interface OperationMethods {
  /**
   * $calculatePricingDetails - calculatePricingDetails
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
   * $checkoutCart - checkoutCart
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
   * $searchCatalog - searchCatalog
   * 
   * Provides a querying functionalities over products and prices of the Catalog for a given organization.
   */
  '$searchCatalog'(
    parameters?: Parameters<Paths.$SearchCatalog.HeaderParameters> | null,
    data?: Paths.$SearchCatalog.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$SearchCatalog.Responses.$200>
  /**
   * $privateSearchCatalog - privateSearchCatalog
   * 
   * Provides a querying functionalities over products and prices of the Catalog for a given organization.
   */
  '$privateSearchCatalog'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.$PrivateSearchCatalog.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$PrivateSearchCatalog.Responses.$200>
  /**
   * $availabilityCheck - availabilityCheck
   * 
   * The availability check endpoint
   */
  '$availabilityCheck'(
    parameters?: Parameters<Paths.$AvailabilityCheck.HeaderParameters> | null,
    data?: Paths.$AvailabilityCheck.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$AvailabilityCheck.Responses.$200>
  /**
   * $validateAvailabilityFile - validateAvailabilityFile
   * 
   * Validates an availability file, it returns an array of errors if the file is invalid
   */
  '$validateAvailabilityFile'(
    parameters?: Parameters<Paths.$ValidateAvailabilityFile.HeaderParameters & Paths.$ValidateAvailabilityFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$ValidateAvailabilityFile.Responses.$200>
  /**
   * $searchExternalCatalog - searchExternalCatalog
   * 
   * Returns the list of available products (including computed prices) based on a given context.
   */
  '$searchExternalCatalog'(
    parameters?: Parameters<Paths.$SearchExternalCatalog.PathParameters> | null,
    data?: Paths.$SearchExternalCatalog.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$SearchExternalCatalog.Responses.$200>
  /**
   * $searchProviders - searchProviders
   * 
   * Returns the list of providers available based on a given location
   */
  '$searchProviders'(
    parameters?: Parameters<Paths.$SearchProviders.HeaderParameters & Paths.$SearchProviders.PathParameters> | null,
    data?: Paths.$SearchProviders.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$SearchProviders.Responses.$200>
  /**
   * $searchStreets - searchStreets
   * 
   * Returns the list of streets available for a given postal code and city
   */
  '$searchStreets'(
    parameters?: Parameters<Paths.$SearchStreets.HeaderParameters & Paths.$SearchStreets.PathParameters> | null,
    data?: Paths.$SearchStreets.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$SearchStreets.Responses.$200>
  /**
   * $computePrice - calculatePricingDetails
   * 
   * Returns the price for a given product type based on location and consumption
   */
  '$computePrice'(
    parameters?: Parameters<Paths.$ComputePrice.HeaderParameters & Paths.$ComputePrice.PathParameters> | null,
    data?: Paths.$ComputePrice.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$ComputePrice.Responses.$200>
  /**
   * $getCredentials - getCredentials
   * 
   * Gets the credentials for a given integration / organization
   */
  '$getCredentials'(
    parameters?: Parameters<Paths.$GetCredentials.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$GetCredentials.Responses.$200>
  /**
   * $saveCredentials - saveCredentials
   * 
   * Saves the credentials for a given integration / organization
   */
  '$saveCredentials'(
    parameters?: Parameters<Paths.$SaveCredentials.PathParameters> | null,
    data?: Paths.$SaveCredentials.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$SaveCredentials.Responses.$204>
  /**
   * $deleteCredentials - deleteCredentials
   * 
   * Delete the credentials for a given integration / organization
   */
  '$deleteCredentials'(
    parameters?: Parameters<Paths.$DeleteCredentials.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$DeleteCredentials.Responses.$204>
}

export interface PathsDictionary {
  ['/v1/pricing:compute']: {
    /**
     * $calculatePricingDetails - calculatePricingDetails
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
     * $checkoutCart - checkoutCart
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
     * $searchCatalog - searchCatalog
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
     * $privateSearchCatalog - privateSearchCatalog
     * 
     * Provides a querying functionalities over products and prices of the Catalog for a given organization.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.$PrivateSearchCatalog.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$PrivateSearchCatalog.Responses.$200>
  }
  ['/v1/public/availability:check']: {
    /**
     * $availabilityCheck - availabilityCheck
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
     * $validateAvailabilityFile - validateAvailabilityFile
     * 
     * Validates an availability file, it returns an array of errors if the file is invalid
     */
    'get'(
      parameters?: Parameters<Paths.$ValidateAvailabilityFile.HeaderParameters & Paths.$ValidateAvailabilityFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$ValidateAvailabilityFile.Responses.$200>
  }
  ['/v1/public/integration/{integrationId}/external-catalog']: {
    /**
     * $searchExternalCatalog - searchExternalCatalog
     * 
     * Returns the list of available products (including computed prices) based on a given context.
     */
    'post'(
      parameters?: Parameters<Paths.$SearchExternalCatalog.PathParameters> | null,
      data?: Paths.$SearchExternalCatalog.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$SearchExternalCatalog.Responses.$200>
  }
  ['/v1/public/integration/{integrationId}/providers:search']: {
    /**
     * $searchProviders - searchProviders
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
     * $searchStreets - searchStreets
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
     * $computePrice - calculatePricingDetails
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
     * $getCredentials - getCredentials
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
     * $saveCredentials - saveCredentials
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
     * $deleteCredentials - deleteCredentials
     * 
     * Delete the credentials for a given integration / organization
     */
    'delete'(
      parameters?: Parameters<Paths.$DeleteCredentials.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$DeleteCredentials.Responses.$204>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type Address = Components.Schemas.Address;
export type Amounts = Components.Schemas.Amounts;
export type AvailabilityCheckParams = Components.Schemas.AvailabilityCheckParams;
export type AvailabilityDate = Components.Schemas.AvailabilityDate;
export type AvailabilityFilters = Components.Schemas.AvailabilityFilters;
export type AvailabilityLocation = Components.Schemas.AvailabilityLocation;
export type AvailabilityResult = Components.Schemas.AvailabilityResult;
export type BasePriceItem = Components.Schemas.BasePriceItem;
export type BasePriceItemCommon = Components.Schemas.BasePriceItemCommon;
export type BasePriceItemDto = Components.Schemas.BasePriceItemDto;
export type BasicAuthCredentials = Components.Schemas.BasicAuthCredentials;
export type BillingPeriod = Components.Schemas.BillingPeriod;
export type Cart = Components.Schemas.Cart;
export type CartDto = Components.Schemas.CartDto;
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
export type ConsumptionTypeGetAg = Components.Schemas.ConsumptionTypeGetAg;
export type Coupon = Components.Schemas.Coupon;
export type Currency = Components.Schemas.Currency;
export type Customer = Components.Schemas.Customer;
export type EntityId = Components.Schemas.EntityId;
export type EntityItem = Components.Schemas.EntityItem;
export type EntityRelation = Components.Schemas.EntityRelation;
export type Error = Components.Schemas.Error;
export type ExternalCompositePrice = Components.Schemas.ExternalCompositePrice;
export type ExternalFeeMapping = Components.Schemas.ExternalFeeMapping;
export type ExternalFeeMappings = Components.Schemas.ExternalFeeMappings;
export type ExternalFeeMetadata = Components.Schemas.ExternalFeeMetadata;
export type ExternalPriceFees = Components.Schemas.ExternalPriceFees;
export type ExternalPriceTotalDetails = Components.Schemas.ExternalPriceTotalDetails;
export type ExternalProduct = Components.Schemas.ExternalProduct;
export type ExternalSimplePrice = Components.Schemas.ExternalSimplePrice;
export type File = Components.Schemas.File;
export type GasConcessionType = Components.Schemas.GasConcessionType;
export type IntegrationCredentialsResult = Components.Schemas.IntegrationCredentialsResult;
export type IntegrationId = Components.Schemas.IntegrationId;
export type JourneyContext = Components.Schemas.JourneyContext;
export type MarkupPricingModel = Components.Schemas.MarkupPricingModel;
export type MetaData = Components.Schemas.MetaData;
export type Opportunity = Components.Schemas.Opportunity;
export type OpportunitySource = Components.Schemas.OpportunitySource;
export type Order = Components.Schemas.Order;
export type OrderPayload = Components.Schemas.OrderPayload;
export type OrderRelation = Components.Schemas.OrderRelation;
export type OrderSource = Components.Schemas.OrderSource;
export type OrderStatus = Components.Schemas.OrderStatus;
export type PaymentMethod = Components.Schemas.PaymentMethod;
export type PowerMeterType = Components.Schemas.PowerMeterType;
export type Price = Components.Schemas.Price;
export type PriceComponentRelation = Components.Schemas.PriceComponentRelation;
export type PriceGetAg = Components.Schemas.PriceGetAg;
export type PriceInputMapping = Components.Schemas.PriceInputMapping;
export type PriceInputMappings = Components.Schemas.PriceInputMappings;
export type PriceItem = Components.Schemas.PriceItem;
export type PriceItemDto = Components.Schemas.PriceItemDto;
export type PriceItems = Components.Schemas.PriceItems;
export type PriceItemsDto = Components.Schemas.PriceItemsDto;
export type PriceTier = Components.Schemas.PriceTier;
export type PriceTierDisplayMode = Components.Schemas.PriceTierDisplayMode;
export type PriceTierEnhanced = Components.Schemas.PriceTierEnhanced;
export type PricingDetails = Components.Schemas.PricingDetails;
export type PricingDetailsResponse = Components.Schemas.PricingDetailsResponse;
export type PricingModel = Components.Schemas.PricingModel;
export type Product = Components.Schemas.Product;
export type ProductCategory = Components.Schemas.ProductCategory;
export type Provider = Components.Schemas.Provider;
export type RecurrenceAmount = Components.Schemas.RecurrenceAmount;
export type RecurrenceAmountDto = Components.Schemas.RecurrenceAmountDto;
export type RecurrenceAmountWithTax = Components.Schemas.RecurrenceAmountWithTax;
export type SalesTax = Components.Schemas.SalesTax;
export type SaveIntegrationCredentialsParams = Components.Schemas.SaveIntegrationCredentialsParams;
export type SearchExternalCatalogParams = Components.Schemas.SearchExternalCatalogParams;
export type SearchExternalCatalogResult = Components.Schemas.SearchExternalCatalogResult;
export type SearchProvidersParams = Components.Schemas.SearchProvidersParams;
export type SearchProvidersResult = Components.Schemas.SearchProvidersResult;
export type SearchStreetsParams = Components.Schemas.SearchStreetsParams;
export type SearchStreetsResult = Components.Schemas.SearchStreetsResult;
export type SignatureMeta = Components.Schemas.SignatureMeta;
export type Street = Components.Schemas.Street;
export type TariffTypeGetAg = Components.Schemas.TariffTypeGetAg;
export type Tax = Components.Schemas.Tax;
export type TaxAmount = Components.Schemas.TaxAmount;
export type TaxAmountBreakdown = Components.Schemas.TaxAmountBreakdown;
export type TaxAmountDto = Components.Schemas.TaxAmountDto;
export type TaxBreakdownInfo = Components.Schemas.TaxBreakdownInfo;
export type TierDetails = Components.Schemas.TierDetails;
export type TotalDetails = Components.Schemas.TotalDetails;
export type TypeGetAg = Components.Schemas.TypeGetAg;
export type ValidateAvailabilityFileError = Components.Schemas.ValidateAvailabilityFileError;
export type ValidateAvailabilityFileResult = Components.Schemas.ValidateAvailabilityFileResult;
