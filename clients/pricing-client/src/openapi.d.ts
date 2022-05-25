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
             * The two-letter code for the country of the address.
             */
            country?: string;
            /**
             * An additional description for the address
             */
            additional_info?: string;
            /**
             * the company name, usually used as extra delivery instructions
             */
            company_name?: string;
            /**
             * the first name of the recipient, usually used as extra delivery instructions
             */
            first_name?: string;
            /**
             * the last name of the recipient, usually used as extra delivery instructions
             */
            last_name?: string;
            /**
             * the salutation of the recipient, usually used as extra delivery instructions
             */
            salutation?: string;
            /**
             * the title of the recipient, usually used as extra delivery instructions
             */
            title?: string;
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
            metadata?: /* A set of key-value pairs. */ MetaData;
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
            metadata?: /* A set of key-value pairs. */ MetaData;
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
            source?: /* Order Source */ OrderSource;
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
            status?: /* The order status */ OrderStatus;
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
            results?: (/* The product configuration */ Product | /* The price configuration */ Price)[];
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
            order?: /* The order entity */ Order;
        }
        /**
         * The checkout mode for the cart checkout.
         */
        export type CheckoutMode = "create_order" | "create_invoice" | "create_quote";
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
         * A set of key-value pairs.
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
         */
        export interface Opportunity {
            [name: string]: any;
            /**
             * The opportunity id number for the customer (autogenerated if left blank)
             */
            opportunity_number?: string;
            /**
             * A description to frame this opportunity within its sales process
             */
            description?: string;
            /**
             * The opportunity status
             */
            status?: "lead" | "qualification" | "validation" | "offering" | "supply" | "approval" | "operations" | "complete";
            items?: /* The order entity */ Order[] | {
                $relation?: /* An order relation reference */ OrderRelation[];
            };
            /**
             * Organization Id the order belongs to
             */
            _org_id?: string;
            _id?: string;
            _created_at?: string;
            _updated_at?: string;
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
            source?: /* Order Source */ OpportunitySource;
            _tags?: string[];
        }
        /**
         * Order Source
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
         */
        export interface Order {
            [name: string]: any;
            /**
             * The order id number for the customer
             */
            order_number?: string;
            /**
             * The cart id that originated or is associated with the order
             */
            cart_id?: string;
            status?: /* The order status */ OrderStatus;
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
            source?: /* Order Source */ OrderSource;
            metadata?: /* A set of key-value pairs. */ MetaData;
            billing_first_name?: string;
            billing_last_name?: string;
            billing_company_name?: string;
            billing_vat?: string;
            billing_email?: string;
            billing_phone?: string;
            billing_address?: Address[];
            currency?: /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            delivery_address?: Address[];
            payment_method?: /**
             * A PaymentMethod represent your customer's payment instruments.
             *
             */
            PaymentMethod[];
            /**
             * The id of an existing contact.
             */
            contact?: string;
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
            /**
             * Organization Id the order belongs to
             */
            _org_id?: string;
            _id?: string;
            _created_at?: string;
            _updated_at?: string;
            _tags?: string[];
        }
        /**
         * Order Entity Payload
         */
        export interface OrderPayload {
            status?: /* The order status */ OrderStatus;
            line_items?: /* Tracks a set of product prices, quantities, (discounts) and taxes. */ PriceItems;
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
         * Order Source
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
         * The order status
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
         * The price configuration
         */
        export interface Price {
            [name: string]: any;
            active?: boolean;
            billing_scheme?: "Per Unit";
            description?: string;
            sales_tax?: SalesTax;
            tax_behavior?: "inclusive" | "exclusive";
            tiers_mode?: "Standard";
            type?: "one_time" | "recurring";
            billing_period?: BillingPeriod;
            unit_amount?: number;
            unit_amount_decimal?: string;
            unit_amount_currency?: /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
             * example:
             * EUR
             */
            Currency;
            billing_duration_amount?: number;
            billing_duration_unit?: "weeks" | "months" | "years";
            notice_time_amount?: number;
            notice_time_unit?: "weeks" | "months" | "years";
            termination_time_amount?: number;
            termination_time_unit?: "weeks" | "months" | "years";
            renewal_duration_amount?: number;
            renewal_duration_unit?: "weeks" | "months" | "years";
            _created_at?: string;
            _id?: string;
            _title?: string;
            _updated_at?: string;
        }
        /**
         * Represents a price item
         */
        export interface PriceItem {
            /**
             * price item id
             */
            id?: string;
            metadata?: /* A set of key-value pairs. */ MetaData;
            /**
             * The unit amount value
             */
            unit_amount?: number;
            /**
             * Total before any (discounts or) taxes are applied.
             */
            amount_subtotal?: number;
            /**
             * Net unit amount without taxes.
             */
            unit_amount_net?: number;
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
            _price?: /* The price configuration */ Price;
            _product?: /* The product configuration */ Product;
            /**
             * The taxes applied to the price item.
             */
            taxes?: (/* A tax amount associated with a specific tax rate. */ TaxAmount)[];
            /**
             * The sum of amounts of the price items by recurrence.
             */
            recurrences?: (/* An amount associated with a specific recurrence. */ RecurrenceAmount)[];
        }
        /**
         * Represents a valid price item from a client.
         */
        export interface PriceItemDto {
            metadata?: /* A set of key-value pairs. */ MetaData;
            /**
             * The quantity of products being purchased.
             */
            quantity?: number;
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
            _price?: /* The price configuration */ Price;
            /**
             * The product linked to the price item.
             */
            _product?: /* The product configuration */ Product;
        }
        /**
         * Tracks a set of product prices, quantities, (discounts) and taxes.
         */
        export type PriceItems = (/* Represents a price item */ PriceItem)[];
        /**
         * A valid set of product prices, quantities, (discounts) and taxes from a client.
         */
        export type PriceItemsDto = (/* Represents a valid price item from a client. */ PriceItemDto)[];
        /**
         * The result from the calculation of a set of price items.
         */
        export interface PricingDetails {
            items?: (/* Represents a price item */ PriceItem)[];
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
         * The product configuration
         */
        export interface Product {
            [name: string]: any;
            code?: string;
            type?: "Product" | "Service";
            name?: string;
            _id?: string;
            _title?: string;
            _availability_files?: File[];
        }
        /**
         * An amount associated with a specific recurrence.
         */
        export interface RecurrenceAmount {
            /**
             * The price type.
             */
            type: string;
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
            type: string;
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
         */
        export interface Tax {
            [name: string]: any;
            type: "VAT" | "GST" | "Custom";
            description?: string;
            rate: number;
            behavior: "Exclusive" | "Inclusive";
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
             * The tax rate applied.
             */
            rate?: string;
            /**
             * The tax applied.
             */
            tax?: /* The tax applied. */ /* the tax configuration */ Tax;
        }
        /**
         * A valid tax rate from a client.
         */
        export interface TaxAmountDto {
            /**
             * The tax rate applied.
             */
            rate?: string;
            /**
             * The tax applied.
             */
            tax?: /* The tax applied. */ /* the tax configuration */ Tax;
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
                taxes?: (/* A tax amount associated with a specific tax rate. */ TaxAmount)[];
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
        export type RequestBody = /* The opportunity entity */ Components.Schemas.Opportunity;
        namespace Responses {
            export type $201 = /* The opportunity entity */ Components.Schemas.Opportunity;
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
            export type $201 = /* The order entity */ Components.Schemas.Order;
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
            export type $200 = /* The order entity */ Components.Schemas.Order;
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
   * This API is Deprecated. Please use the Entity API or Submission API to create opportunities. Creates a new opportunity. During the creation of an opportunity, an unique customer-readable `opportunity_number` will be generated.
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
     * This API is Deprecated. Please use the Entity API or Submission API to create opportunities. Creates a new opportunity. During the creation of an opportunity, an unique customer-readable `opportunity_number` will be generated.
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
