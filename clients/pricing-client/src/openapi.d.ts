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
         *   "$ref": "#/components/examples/price-item"
         * }
         */
        export interface BasePriceItem {
            /**
             * price item id
             */
            id?: string;
            metadata?: /* A set of key-value pairs used to store meta data information about an entity. */ MetaData;
            /**
             * The unit amount value
             */
            unit_amount?: number;
            /**
             * Total before any (discounts or) taxes are applied.
             */
            amount_subtotal?: number;
            /**
             * Net unit amount without taxes or discounts.
             */
            unit_amount_net?: number;
            /**
             * The unit amount in cents to be charged, represented as a decimal string with at most 12 decimal places.
             */
            unit_amount_decimal?: string;
            /**
             * Total after (discounts and) taxes.
             */
            amount_total?: number;
            currency?: /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
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
            _product?: /**
             * The product entity
             * example:
             * {
             *   "$ref": "#/components/examples/product"
             * }
             */
            Product;
            /**
             * The taxes applied to the price item.
             */
            taxes?: (/* A tax amount associated with a specific tax rate. */ TaxAmount)[];
            /**
             * The sum of amounts of the price items by recurrence.
             */
            recurrences?: (/* An amount associated with a specific recurrence. */ RecurrenceAmount)[];
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
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
            /**
             * The id of the product.
             */
            product_id?: string;
            /**
             * The id of the price.
             */
            price_id?: string;
            /**
             * The taxes applied to the price item.
             */
            taxes?: (/* A valid tax rate from a client. */ TaxAmountDto)[];
            /**
             * The taxes applied to the price item.
             */
            recurrences?: (/* An amount associated with a specific recurrence. */ RecurrenceAmountDto)[];
            /**
             * The flag for prices that contain price components.
             */
            is_composite_price?: boolean;
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
        export type BillingPeriod = "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly" | "one_time";
        /**
         * Supports shopping for products and services until ready for checkout.
         */
        export interface Cart {
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
            /**
             * Total of all items before (discounts or) taxes are applied.
             */
            amount_subtotal?: number;
            /**
             * Total of all items after (discounts and) taxes are applied.
             */
            amount_total?: number;
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
         *   "size": 200,
         *   "availability": {
         *     "location": {
         *       "postal_code": "57008,",
         *       "city": "Cologne,",
         *       "street": "Media Park,",
         *       "street_number": "8a"
         *     },
         *     "available_date": {
         *       "value": "2022-05-01"
         *     }
         *   }
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
            Price)[];
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
         *   "$ref": "#/components/examples/price-item"
         * }
         */
        export interface CompositePriceItem {
            /**
             * price item id
             */
            id?: string;
            metadata?: /* A set of key-value pairs used to store meta data information about an entity. */ MetaData;
            /**
             * The unit amount value
             */
            unit_amount?: number;
            /**
             * Total before any (discounts or) taxes are applied.
             */
            amount_subtotal?: number;
            /**
             * Net unit amount without taxes or discounts.
             */
            unit_amount_net?: number;
            /**
             * The unit amount in cents to be charged, represented as a decimal string with at most 12 decimal places.
             */
            unit_amount_decimal?: string;
            /**
             * Total after (discounts and) taxes.
             */
            amount_total?: number;
            currency?: /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
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
            _product?: /**
             * The product entity
             * example:
             * {
             *   "$ref": "#/components/examples/product"
             * }
             */
            Product;
            /**
             * The taxes applied to the price item.
             */
            taxes?: (/* A tax amount associated with a specific tax rate. */ TaxAmount)[];
            /**
             * The sum of amounts of the price items by recurrence.
             */
            recurrences?: (/* An amount associated with a specific recurrence. */ RecurrenceAmount)[];
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
             * Contains price item configurations, per price component, when the main price item is a [composite price](/api/pricing#tag/dynamic_price_schema).
             */
            item_components?: /**
             * Represents a price item
             * example:
             * {
             *   "$ref": "#/components/examples/price-item"
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
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
            /**
             * The id of the product.
             */
            product_id?: string;
            /**
             * The id of the price.
             */
            price_id?: string;
            /**
             * The taxes applied to the price item.
             */
            taxes?: (/* A valid tax rate from a client. */ TaxAmountDto)[];
            /**
             * The taxes applied to the price item.
             */
            recurrences?: (/* An amount associated with a specific recurrence. */ RecurrenceAmountDto)[];
            /**
             * The flag for prices that contain price components.
             */
            is_composite_price?: boolean;
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
             * Contains price item configurations, per price component, when the main price item is a [composite price](/api/pricing#tag/dynamic_price_schema).
             */
            item_components?: /* Represents a price input to the pricing library. */ PriceItemDto[];
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
             *
             */
            pricing_model: "per_unit" | "tiered_graduated" | "tiered_volume" | "tiered_flatfee";
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
            unit?: /* The unit of measurement used for display purposes and possibly for calculations when the price is variable. */ ("kw" | "kwh" | "m" | "m2" | "l") | string;
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
         *   "$ref": "#/components/examples/price-item"
         * }
         */
        export interface PriceItem {
            /**
             * price item id
             */
            id?: string;
            metadata?: /* A set of key-value pairs used to store meta data information about an entity. */ MetaData;
            /**
             * The unit amount value
             */
            unit_amount?: number;
            /**
             * Total before any (discounts or) taxes are applied.
             */
            amount_subtotal?: number;
            /**
             * Net unit amount without taxes or discounts.
             */
            unit_amount_net?: number;
            /**
             * The unit amount in cents to be charged, represented as a decimal string with at most 12 decimal places.
             */
            unit_amount_decimal?: string;
            /**
             * Total after (discounts and) taxes.
             */
            amount_total?: number;
            currency?: /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
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
            _product?: /**
             * The product entity
             * example:
             * {
             *   "$ref": "#/components/examples/product"
             * }
             */
            Product;
            /**
             * The taxes applied to the price item.
             */
            taxes?: (/* A tax amount associated with a specific tax rate. */ TaxAmount)[];
            /**
             * The sum of amounts of the price items by recurrence.
             */
            recurrences?: (/* An amount associated with a specific recurrence. */ RecurrenceAmount)[];
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
             * One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
             */
            type?: "one_time" | "recurring";
            /**
             * When set to true on a `_price` displayed as OnRequest (`show_as_on_request: 'on_request'`) this flag means the price has been approved and can now be displayed to the customer. This flag is only valid for prices shown as 'on_request'.
             */
            on_request_approved?: boolean;
            /**
             * Describes how to compute the price per period. Either `per_unit`, `tiered_graduated` or `tiered_volume`.
             * - `per_unit` indicates that the fixed amount (specified in unit_amount or unit_amount_decimal) will be charged per unit in quantity
             * - `tiered_graduated` indicates that the unit pricing will be computed using tiers attribute. The customer pays the price per unit in every range their purchase rises through.
             * - `tiered_volume` indicates that the unit pricing will be computed using tiers attribute. The customer pays the same unit price for all purchased units.
             * - `tiered_flatfee` While similar to tiered_volume, tiered flat fee charges for the same price (flat) for the entire range instead using the unit price to multiply the quantity.
             *
             */
            pricing_model: "per_unit" | "tiered_graduated" | "tiered_volume" | "tiered_flatfee";
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
             * An arbitrary string attached to the price item. Often useful for displaying to users. Defaults to product name.
             */
            description?: string;
            /**
             * The id of the product.
             */
            product_id?: string;
            /**
             * The id of the price.
             */
            price_id?: string;
            /**
             * The taxes applied to the price item.
             */
            taxes?: (/* A valid tax rate from a client. */ TaxAmountDto)[];
            /**
             * The taxes applied to the price item.
             */
            recurrences?: (/* An amount associated with a specific recurrence. */ RecurrenceAmountDto)[];
            /**
             * The flag for prices that contain price components.
             */
            is_composite_price?: boolean;
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
             * One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
             */
            type?: "one_time" | "recurring";
            /**
             * The unit amount value
             */
            unit_amount?: number;
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
             *
             */
            pricing_model: "per_unit" | "tiered_graduated" | "tiered_volume" | "tiered_flatfee";
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
                 *
                 */
                pricing_model: "per_unit" | "tiered_graduated" | "tiered_volume" | "tiered_flatfee";
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
                unit?: /* The unit of measurement used for display purposes and possibly for calculations when the price is variable. */ ("kw" | "kwh" | "m" | "m2" | "l") | string;
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
         *   "$ref": "#/components/examples/price-item"
         * }
         */
        PriceItem | /**
         * Represents a composite price input to the pricing library.
         * example:
         * {
         *   "$ref": "#/components/examples/price-item"
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
        }
        /**
         * The result from the calculation of a set of price items.
         */
        export interface PricingDetails {
            items?: (/**
             * Represents a price item
             * example:
             * {
             *   "$ref": "#/components/examples/price-item"
             * }
             */
            PriceItem | /**
             * Represents a composite price input to the pricing library.
             * example:
             * {
             *   "$ref": "#/components/examples/price-item"
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
            total_details?: /* The total details with tax (and discount) aggregated totals. */ TotalDetails;
        }
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
        /**
         * An amount associated with a specific recurrence.
         */
        export interface RecurrenceAmount {
            /**
             * The price type.
             */
            type?: string;
            /**
             * The price billing period.
             */
            billing_period?: string;
            /**
             * Total of all items, with same recurrence, before (discounts or) taxes are applied.
             */
            amount_subtotal: number;
            /**
             * Total of all items, with same recurrence, after (discounts and) taxes are applied.
             */
            amount_total: number;
            /**
             * Total of all items taxes, with same recurrence.
             */
            amount_tax?: number;
        }
        /**
         * An amount associated with a specific recurrence.
         */
        export interface RecurrenceAmountDto {
            /**
             * The price type.
             */
            type?: string;
            /**
             * The price billing period.
             */
            billing_period?: string;
            /**
             * Total of all items, with same recurrence, before (discounts or) taxes are applied.
             */
            amount_subtotal: number;
            /**
             * Total of all items, with same recurrence, after (discounts and) taxes are applied.
             */
            amount_total: number;
            /**
             * Total of all items taxes, with same recurrence.
             */
            amount_tax?: number;
        }
        export type SalesTax = "nontaxable" | "reduced" | "standard";
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
            };
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
    namespace $CreateOpportunity {
        export interface HeaderParameters {
            "X-Ivy-Org-ID": Parameters.XIvyOrgID;
        }
        namespace Parameters {
            export type XIvyOrgID = string;
        }
        export type RequestBody = /**
         * The opportunity entity
         * example:
         * {
         *   "$ref": "#/components/examples/opportunity"
         * }
         */
        Components.Schemas.Opportunity;
        namespace Responses {
            export type $201 = /**
             * The opportunity entity
             * example:
             * {
             *   "$ref": "#/components/examples/opportunity"
             * }
             */
            Components.Schemas.Opportunity;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace $SearchCatalog {
        export interface HeaderParameters {
            "X-Ivy-Org-ID": Parameters.XIvyOrgID;
        }
        namespace Parameters {
            export type XIvyOrgID = string;
        }
        export type RequestBody = /**
         * A catalog search payload
         * example:
         * {
         *   "q": "_id:1233432 OR _id:123432454 OR _id:23445433",
         *   "sort": "description ASC",
         *   "from": 0,
         *   "size": 200,
         *   "availability": {
         *     "location": {
         *       "postal_code": "57008,",
         *       "city": "Cologne,",
         *       "street": "Media Park,",
         *       "street_number": "8a"
         *     },
         *     "available_date": {
         *       "value": "2022-05-01"
         *     }
         *   }
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
   * $createOpportunity - createOpportunity
   * 
   * This API is Deprecated. Please use the Entity API or Submission API to create opportunities.
   * 
   * Enables the creation of a new opportunity. During the creation of an opportunity, an unique customer-readable `opportunity_number` will be generated.
   * The `opportunity_number` can be used to universally identify an opportunity within epilot platform.
   * 
   */
  '$createOpportunity'(
    parameters?: Parameters<Paths.$CreateOpportunity.HeaderParameters> | null,
    data?: Paths.$CreateOpportunity.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$CreateOpportunity.Responses.$201>
}

export interface PathsDictionary {
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
  ['/v1/public/opportunity']: {
    /**
     * $createOpportunity - createOpportunity
     * 
     * This API is Deprecated. Please use the Entity API or Submission API to create opportunities.
     * 
     * Enables the creation of a new opportunity. During the creation of an opportunity, an unique customer-readable `opportunity_number` will be generated.
     * The `opportunity_number` can be used to universally identify an opportunity within epilot platform.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.$CreateOpportunity.HeaderParameters> | null,
      data?: Paths.$CreateOpportunity.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$CreateOpportunity.Responses.$201>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
