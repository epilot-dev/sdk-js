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
        }
        export type BillingPeriod = "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly";
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
            q?: string;
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
             * A list of additional fields to expand on the search results, such as non-indexed fields.
             */
            expand?: string[];
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
        export interface Error {
            /**
             * Error message
             */
            message: string;
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
            _tags?: string[];
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
            /**
             * The order status
             */
            status?: "draft" | "quote" | "open" | "paid" | "shipped" | "delivered" | "complete";
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
            sales_tax?: SalexTax;
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
             * Total after (discounts and) taxes.
             */
            amount_total?: number;
            currency?: /**
             * Three-letter ISO currency code, in lowercase. Must be a supported currency.
             * ISO 4217 CURRENCY CODES as specified in the documentation: https://www.iso.org/iso-4217-currency-codes.html
             *
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
        export type SalexTax = "nontaxable" | "reduced" | "standard";
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
    namespace $DeleteCart {
        namespace Parameters {
            export type CartId = string;
        }
        export interface PathParameters {
            "cart-id": Parameters.CartId;
        }
        namespace Responses {
            export type $200 = /* Supports shopping for products and services until ready for checkout. */ Components.Schemas.Cart;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace $GetCart {
        namespace Parameters {
            export type CartId = string;
        }
        export interface PathParameters {
            "cart-id": Parameters.CartId;
        }
        namespace Responses {
            export type $200 = /* Supports shopping for products and services until ready for checkout. */ Components.Schemas.Cart;
            export type $400 = Components.Schemas.Error;
            export interface $404 {
            }
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
    namespace $UpsertCart {
        export interface HeaderParameters {
            "X-Ivy-Org-ID": Parameters.XIvyOrgID;
        }
        namespace Parameters {
            export type XIvyOrgID = string;
        }
        export type RequestBody = /* A valid cart payload from a client. */ Components.Schemas.CartDto;
        namespace Responses {
            export type $200 = /* Supports shopping for products and services until ready for checkout. */ Components.Schemas.Cart;
            export type $201 = /* Supports shopping for products and services until ready for checkout. */ Components.Schemas.Cart;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace $UpsertOrder {
        export type RequestBody = /* The order entity */ Components.Schemas.Order;
        namespace Responses {
            export type $200 = /* The order entity */ Components.Schemas.Order;
            export type $201 = /* The order entity */ Components.Schemas.Order;
            export type $400 = Components.Schemas.Error;
        }
    }
}

export interface OperationMethods {
  /**
   * $upsertCart - upsertCart
   * 
   * Creates a new cart or updates an existing one.
   */
  '$upsertCart'(
    parameters?: Parameters<Paths.$UpsertCart.HeaderParameters> | null,
    data?: Paths.$UpsertCart.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$UpsertCart.Responses.$200 | Paths.$UpsertCart.Responses.$201>
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
   * $getCart - getCart
   * 
   * Retrieves a cart by id.
   */
  '$getCart'(
    parameters?: Parameters<Paths.$GetCart.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$GetCart.Responses.$200>
  /**
   * $deleteCart - deleteCart
   * 
   * Deletes the Cart specified and returns its content.
   */
  '$deleteCart'(
    parameters?: Parameters<Paths.$DeleteCart.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$DeleteCart.Responses.$200>
  /**
   * $upsertOrder - upsertOrder
   * 
   * Creates a new order or updates an existing one. During the creation of an order, an unique customer-readable `order_number` will be generated.
   * The `order_number` can be used to universally identify an order within epilot platform.
   * 
   * The upsert operation is idempotent, meaning that multiple calls will have effect just once. Calling the upsert multiple times will not duplicate the items on an order.
   * 
   * When the the `cart_id` payload field is specified, the cart items are appended to the existing order items, or replaced in-place if they belong to the same `cart_id`.
   * 
   * On multiple updates with the same `cart_id` the line items linked with that `cart_id` (`order.line_items[]?.metadata.cart_id`) are removed and re-added.
   * 
   */
  '$upsertOrder'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.$UpsertOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.$UpsertOrder.Responses.$200 | Paths.$UpsertOrder.Responses.$201>
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
   * $createOpportunity - createOpportunity
   * 
   * Creates a new opportunity. During the creation of an opportunity, an unique customer-readable `opportunity_number` will be generated.
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
  ['/v1/public/cart']: {
    /**
     * $upsertCart - upsertCart
     * 
     * Creates a new cart or updates an existing one.
     */
    'put'(
      parameters?: Parameters<Paths.$UpsertCart.HeaderParameters> | null,
      data?: Paths.$UpsertCart.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$UpsertCart.Responses.$200 | Paths.$UpsertCart.Responses.$201>
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
  ['/v1/cart/{cart-id}']: {
    /**
     * $getCart - getCart
     * 
     * Retrieves a cart by id.
     */
    'get'(
      parameters?: Parameters<Paths.$GetCart.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$GetCart.Responses.$200>
    /**
     * $deleteCart - deleteCart
     * 
     * Deletes the Cart specified and returns its content.
     */
    'delete'(
      parameters?: Parameters<Paths.$DeleteCart.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$DeleteCart.Responses.$200>
  }
  ['/v1/order']: {
    /**
     * $upsertOrder - upsertOrder
     * 
     * Creates a new order or updates an existing one. During the creation of an order, an unique customer-readable `order_number` will be generated.
     * The `order_number` can be used to universally identify an order within epilot platform.
     * 
     * The upsert operation is idempotent, meaning that multiple calls will have effect just once. Calling the upsert multiple times will not duplicate the items on an order.
     * 
     * When the the `cart_id` payload field is specified, the cart items are appended to the existing order items, or replaced in-place if they belong to the same `cart_id`.
     * 
     * On multiple updates with the same `cart_id` the line items linked with that `cart_id` (`order.line_items[]?.metadata.cart_id`) are removed and re-added.
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.$UpsertOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.$UpsertOrder.Responses.$200 | Paths.$UpsertOrder.Responses.$201>
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
  ['/v1/public/opportunity']: {
    /**
     * $createOpportunity - createOpportunity
     * 
     * Creates a new opportunity. During the creation of an opportunity, an unique customer-readable `opportunity_number` will be generated.
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
