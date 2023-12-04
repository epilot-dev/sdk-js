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
        export interface Balance {
            /**
             * Current balance of the customer in cents. (precision 2)
             * example:
             * 8990
             */
            balance?: number;
            /**
             * Current balance of the customer in decimal string representation.
             * example:
             * 89.90
             */
            balance_decimal?: string;
            balance_currency?: /**
             * Currency code in ISO 4217 format
             * example:
             * EUR
             */
            Currency;
        }
        /**
         * A base billing event to be inherited by all billing events.
         */
        export interface BaseBillingEvent {
            [name: string]: any;
            _id?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Title of entity
             */
            _title?: string;
            /**
             * Organization Id the entity belongs to
             */
            _org?: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            _tags?: string[];
            _created_at?: string;
            _updated_at?: string;
            /**
             * Amount to be paid in cents i.e. precision 2
             * example:
             * 10050
             */
            billing_amount?: number;
            /**
             * Amount to be paid in cents in decimal string representation
             * example:
             * 100.50
             */
            billing_amount_decimal?: string;
            billing_currency?: /**
             * Currency code in ISO 4217 format
             * example:
             * EUR
             */
            Currency;
            /**
             * Unique identifier for event, used to reference the event to a 3rd party resource such as a SAP Installment.
             * example:
             * d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e
             */
            external_id?: string;
            contract: {
                $relation?: EntityRelationItem[];
            };
        }
        export interface BaseEntity {
            [name: string]: any;
            _id?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Title of entity
             */
            _title?: string;
            /**
             * Organization Id the entity belongs to
             */
            _org?: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            _tags?: string[];
            _created_at?: string;
            _updated_at?: string;
        }
        /**
         * An entity that describes a billing event such as a future installment or a reimbursement back to the customer.
         */
        export type BillingEvent = /* An entity that describes a billing event such as a future installment or a reimbursement back to the customer. */ /* An entity that describes an installment billing event. */ InstallmentEvent | /* An entity that describes a reimbursement billing event. */ ReimbursementEvent;
        export interface Contract {
            [name: string]: any;
            _id?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Title of entity
             */
            _title?: string;
            /**
             * Organization Id the entity belongs to
             */
            _org?: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            _tags?: string[];
            _created_at?: string;
            _updated_at?: string;
            /**
             * The name of the contract.
             * example:
             * Grid Contract
             */
            contract_name?: string;
            /**
             * The unique identifier of the contract.
             * example:
             * 12345
             */
            contract_number?: string;
            /**
             * The status of the contract.
             * example:
             * approved
             */
            status?: "draft" | "in_approval_process" | "approved" | "active" | "deactivated" | "revoked" | "terminated" | "expired";
            /**
             * A brief description of the contract.
             * example:
             * This contract is for the supply of widgets.
             */
            description?: string;
            /**
             * The account number associated with the contract.
             * example:
             * 67890
             */
            account_number?: string;
            /**
             * The branch associated with the contract.
             * example:
             * power
             */
            branch?: "power" | "gas" | "water" | "waste_water" | "district_heating";
            /**
             * The billing address associated with the contract.
             * example:
             * 123 Main St, Anytown
             */
            billing_address?: string;
            /**
             * The delivery address associated with the contract.
             * example:
             * 456 Elm St, Anytown
             */
            delivery_address?: string;
            /**
             * Any additional addresses associated with the contract.
             * example:
             * 789 Oak St, Anytown
             */
            additional_addresses?: string;
            /**
             * The date on which the contract was terminated.
             * example:
             * 2022-01-01
             */
            termination_date?: string;
            /**
             * The reason for the termination of the contract.
             * example:
             * Non-payment
             */
            termination_reason?: string;
            /**
             * The billing period associated with the contract.
             * example:
             * monthly
             */
            billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly";
            /**
             * The duration of the billing period.
             * example:
             * 30
             */
            billing_duration_amount?: number;
            /**
             * The duration of the renewal period.
             * example:
             * 365
             */
            renewal_duration_amount?: number;
            /**
             * The unit of time for the renewal period.
             * example:
             * years
             */
            renewal_duration_unit?: "weeks" | "months" | "years";
            /**
             * The amount of notice required for termination of the contract.
             * example:
             * 30
             */
            notice_time_amount?: number;
            /**
             * The unit of time for the notice period.
             * example:
             * months
             */
            notice_time_unit?: "weeks" | "months" | "years";
            /**
             * The start date of the contract.
             * example:
             * 2021-01-01
             */
            start_date?: string;
            /**
             * Defines the day of the month in which the installments are due.
             * example:
             * 2
             */
            billing_schedule_by_month_day?: number;
            /**
             * Defines the start date for the billing schedule
             * example:
             * 2020-01-01T00:00:00.000Z
             */
            billing_schedule_start_date?: string; // date-time
            /**
             * Defines the end date for the billing schedule
             * example:
             * 2020-01-01T00:00:00.000Z
             */
            billing_schedule_end_date?: string; // date-time
            /**
             * Set amount for installments in cents. (precision 2)
             * example:
             * 10050
             */
            installment_amount?: number;
            /**
             * Set amount for installments in decimal string representation.
             * example:
             * 100.50
             */
            installment_amount_decimal?: string;
            /**
             * Current balance of the contract in cents. (precision 2)
             * example:
             * 8990
             */
            balance?: number;
            /**
             * Current balance of the contract in decimal string representation.
             * example:
             * 89.90
             */
            balance_amount_decimal?: string;
            balance_currency?: /**
             * Currency code in ISO 4217 format
             * example:
             * EUR
             */
            Currency;
        }
        export interface ContractItem {
            [name: string]: any;
            _id: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Title of entity
             */
            _title: string;
            /**
             * Organization Id the entity belongs to
             */
            _org: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            _tags?: string[];
            _created_at: string;
            _updated_at: string;
            /**
             * The name of the contract.
             * example:
             * Grid Contract
             */
            contract_name?: string;
            /**
             * The unique identifier of the contract.
             * example:
             * 12345
             */
            contract_number?: string;
            /**
             * The status of the contract.
             * example:
             * approved
             */
            status?: "draft" | "in_approval_process" | "approved" | "active" | "deactivated" | "revoked" | "terminated" | "expired";
            /**
             * A brief description of the contract.
             * example:
             * This contract is for the supply of widgets.
             */
            description?: string;
            /**
             * The account number associated with the contract.
             * example:
             * 67890
             */
            account_number?: string;
            /**
             * The branch associated with the contract.
             * example:
             * power
             */
            branch?: "power" | "gas" | "water" | "waste_water" | "district_heating";
            /**
             * The billing address associated with the contract.
             * example:
             * 123 Main St, Anytown
             */
            billing_address?: string;
            /**
             * The delivery address associated with the contract.
             * example:
             * 456 Elm St, Anytown
             */
            delivery_address?: string;
            /**
             * Any additional addresses associated with the contract.
             * example:
             * 789 Oak St, Anytown
             */
            additional_addresses?: string;
            /**
             * The date on which the contract was terminated.
             * example:
             * 2022-01-01
             */
            termination_date?: string;
            /**
             * The reason for the termination of the contract.
             * example:
             * Non-payment
             */
            termination_reason?: string;
            /**
             * The billing period associated with the contract.
             * example:
             * monthly
             */
            billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly";
            /**
             * The duration of the billing period.
             * example:
             * 30
             */
            billing_duration_amount?: number;
            /**
             * The duration of the renewal period.
             * example:
             * 365
             */
            renewal_duration_amount?: number;
            /**
             * The unit of time for the renewal period.
             * example:
             * years
             */
            renewal_duration_unit?: "weeks" | "months" | "years";
            /**
             * The amount of notice required for termination of the contract.
             * example:
             * 30
             */
            notice_time_amount?: number;
            /**
             * The unit of time for the notice period.
             * example:
             * months
             */
            notice_time_unit?: "weeks" | "months" | "years";
            /**
             * The start date of the contract.
             * example:
             * 2021-01-01
             */
            start_date?: string;
            /**
             * Defines the day of the month in which the installments are due.
             * example:
             * 2
             */
            billing_schedule_by_month_day?: number;
            /**
             * Defines the start date for the billing schedule
             * example:
             * 2020-01-01T00:00:00.000Z
             */
            billing_schedule_start_date?: string; // date-time
            /**
             * Defines the end date for the billing schedule
             * example:
             * 2020-01-01T00:00:00.000Z
             */
            billing_schedule_end_date?: string; // date-time
            /**
             * Set amount for installments in cents. (precision 2)
             * example:
             * 10050
             */
            installment_amount?: number;
            /**
             * Set amount for installments in decimal string representation.
             * example:
             * 100.50
             */
            installment_amount_decimal?: string;
            /**
             * Current balance of the contract in cents. (precision 2)
             * example:
             * 8990
             */
            balance?: number;
            /**
             * Current balance of the contract in decimal string representation.
             * example:
             * 89.90
             */
            balance_amount_decimal?: string;
            balance_currency?: /**
             * Currency code in ISO 4217 format
             * example:
             * EUR
             */
            Currency;
        }
        /**
         * Currency code in ISO 4217 format
         * example:
         * EUR
         */
        export type Currency = string;
        /**
         * Entity ID
         * example:
         * 5da0a718-c822-403d-9f5d-20d4584e0528
         */
        export type EntityId = string;
        export interface EntityRelationItem {
            /**
             * Entity ID for the related contract.
             * example:
             * f589786b-3024-43cd-9cb3-5a3c953f2896
             */
            entity_id?: string;
        }
        /**
         * URL-friendly identifier for the entity schema
         * example:
         * contact
         */
        export type EntitySlug = "contact" | "contract" | "file" | "order" | "opportunity" | "product" | "price" | "meter" | "meter_counter" | "billing_event";
        /**
         * An entity that describes an installment billing event.
         */
        export interface InstallmentEvent {
            [name: string]: any;
            _id?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Title of entity
             */
            _title?: string;
            /**
             * Organization Id the entity belongs to
             */
            _org?: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            _tags?: string[];
            _created_at?: string;
            _updated_at?: string;
            /**
             * Amount to be paid in cents i.e. precision 2
             * example:
             * 10050
             */
            billing_amount?: number;
            /**
             * Amount to be paid in cents in decimal string representation
             * example:
             * 100.50
             */
            billing_amount_decimal?: string;
            billing_currency?: /**
             * Currency code in ISO 4217 format
             * example:
             * EUR
             */
            Currency;
            /**
             * Unique identifier for event, used to reference the event to a 3rd party resource such as a SAP Installment.
             * example:
             * d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e
             */
            external_id?: string;
            contract: {
                $relation?: EntityRelationItem[];
            };
            /**
             * Type of the billing event.
             * example:
             * installment
             */
            type: "installment";
            /**
             * Date on which the installment is due.
             */
            due_date: string; // date-time
            /**
             * Date on which the installment is paid by the customer.
             */
            paid_date?: string; // date-time
        }
        /**
         * An entity that describes a reimbursement billing event.
         */
        export interface ReimbursementEvent {
            [name: string]: any;
            _id?: /**
             * Entity ID
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Title of entity
             */
            _title?: string;
            /**
             * Organization Id the entity belongs to
             */
            _org?: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            _tags?: string[];
            _created_at?: string;
            _updated_at?: string;
            /**
             * Amount to be paid in cents i.e. precision 2
             * example:
             * 10050
             */
            billing_amount?: number;
            /**
             * Amount to be paid in cents in decimal string representation
             * example:
             * 100.50
             */
            billing_amount_decimal?: string;
            billing_currency?: /**
             * Currency code in ISO 4217 format
             * example:
             * EUR
             */
            Currency;
            /**
             * Unique identifier for event, used to reference the event to a 3rd party resource such as a SAP Installment.
             * example:
             * d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e
             */
            external_id?: string;
            contract: {
                $relation?: EntityRelationItem[];
            };
            /**
             * Type of the billing event.
             * example:
             * reimbursement
             */
            type: "reimbursement";
            /**
             * Date on which the customer is reimbursed.
             */
            paid_date?: string; // date-time
        }
    }
}
declare namespace Paths {
    namespace CreateBillingEvent {
        namespace Parameters {
            export type EventType = "installment" | "reimbursement";
        }
        export interface PathParameters {
            event_type: Parameters.EventType;
        }
        /**
         * An entity that describes a billing event such as a future installment or a reimbursement back to the customer.
         */
        export type RequestBody = /* An entity that describes a billing event such as a future installment or a reimbursement back to the customer. */ /* An entity that describes an installment billing event. */ Components.Schemas.InstallmentEvent | /* An entity that describes a reimbursement billing event. */ Components.Schemas.ReimbursementEvent;
        namespace Responses {
            /**
             * An entity that describes a billing event such as a future installment or a reimbursement back to the customer.
             */
            export type $201 = /* An entity that describes a billing event such as a future installment or a reimbursement back to the customer. */ /* An entity that describes an installment billing event. */ Components.Schemas.InstallmentEvent | /* An entity that describes a reimbursement billing event. */ Components.Schemas.ReimbursementEvent;
        }
    }
    namespace CreateContractEntity {
        export type RequestBody = Components.Schemas.Contract;
        namespace Responses {
            export type $201 = Components.Schemas.ContractItem;
        }
    }
    namespace DeleteBillingEvent {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DeleteContractEntity {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $204 = Components.Schemas.ContractItem;
        }
    }
    namespace GetBillingEvents {
        namespace Parameters {
            /**
             * List billing events for all contracts/orders of specific customer
             */
            export type CustomerId = string;
            /**
             * List billing events after this date
             */
            export type DateAfter = string; // date-time
            /**
             * List billing events before this date
             */
            export type DateBefore = string; // date-time
            /**
             * Get billing events by entity ID
             */
            export type EntityId = string;
            /**
             * Type of billing event to filter by
             */
            export type EventType = "installment" | "reimbursement";
        }
        export interface QueryParameters {
            entity_id?: /* Get billing events by entity ID */ Parameters.EntityId;
            event_type?: /* Type of billing event to filter by */ Parameters.EventType;
            date_after?: /* List billing events after this date */ Parameters.DateAfter /* date-time */;
            date_before?: /* List billing events before this date */ Parameters.DateBefore /* date-time */;
            customer_id?: /* List billing events for all contracts/orders of specific customer */ Parameters.CustomerId;
        }
        namespace Responses {
            export interface $200 {
                hits?: number;
                results?: /* An entity that describes a billing event such as a future installment or a reimbursement back to the customer. */ Components.Schemas.BillingEvent[];
            }
        }
    }
    namespace GetCustomerBalance {
        namespace Parameters {
            /**
             * example:
             * 1e3f0d58-69d2-4dbb-9a43-3ee63d862e8e
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 1e3f0d58-69d2-4dbb-9a43-3ee63d862e8e
             */
            Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Balance;
        }
    }
    namespace UpdateBillingEvent {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = /* An entity that describes a billing event such as a future installment or a reimbursement back to the customer. */ Components.Schemas.BillingEvent;
        namespace Responses {
            export type $200 = /* An entity that describes a billing event such as a future installment or a reimbursement back to the customer. */ Components.Schemas.BillingEvent;
        }
    }
    namespace UpdateContractEntity {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Contract;
        namespace Responses {
            export type $200 = Components.Schemas.ContractItem;
        }
    }
}

export interface OperationMethods {
  /**
   * getBillingEvents - getBillingEvents
   * 
   * Get and filter billing events such as installments and reimbursements.
   */
  'getBillingEvents'(
    parameters?: Parameters<Paths.GetBillingEvents.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBillingEvents.Responses.$200>
  /**
   * updateBillingEvent - updateBillingEvent
   * 
   * Update an existing billing event.
   */
  'updateBillingEvent'(
    parameters?: Parameters<Paths.UpdateBillingEvent.PathParameters> | null,
    data?: Paths.UpdateBillingEvent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateBillingEvent.Responses.$200>
  /**
   * deleteBillingEvent - deleteBillingEvent
   * 
   * Delete an existing billing event.
   */
  'deleteBillingEvent'(
    parameters?: Parameters<Paths.DeleteBillingEvent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteBillingEvent.Responses.$204>
  /**
   * createBillingEvent - createBillingEvent
   * 
   * Create a new billing event.
   */
  'createBillingEvent'(
    parameters?: Parameters<Paths.CreateBillingEvent.PathParameters> | null,
    data?: Paths.CreateBillingEvent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateBillingEvent.Responses.$201>
  /**
   * createContractEntity - createContractEntity
   * 
   * Create a new contract entity.
   */
  'createContractEntity'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateContractEntity.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateContractEntity.Responses.$201>
  /**
   * updateContractEntity - updateContractEntity
   * 
   * Update an existing contract entity.
   */
  'updateContractEntity'(
    parameters?: Parameters<Paths.UpdateContractEntity.PathParameters> | null,
    data?: Paths.UpdateContractEntity.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateContractEntity.Responses.$200>
  /**
   * deleteContractEntity - deleteContractEntity
   * 
   * Delete an existing contract entity.
   */
  'deleteContractEntity'(
    parameters?: Parameters<Paths.DeleteContractEntity.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteContractEntity.Responses.$204>
  /**
   * getCustomerBalance - getCustomerBalance
   * 
   * Get total balance across all contracts and orders of a customer entity.
   */
  'getCustomerBalance'(
    parameters?: Parameters<Paths.GetCustomerBalance.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCustomerBalance.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/billing/events']: {
    /**
     * getBillingEvents - getBillingEvents
     * 
     * Get and filter billing events such as installments and reimbursements.
     */
    'get'(
      parameters?: Parameters<Paths.GetBillingEvents.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBillingEvents.Responses.$200>
  }
  ['/v1/billing/events/{id}']: {
    /**
     * updateBillingEvent - updateBillingEvent
     * 
     * Update an existing billing event.
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateBillingEvent.PathParameters> | null,
      data?: Paths.UpdateBillingEvent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateBillingEvent.Responses.$200>
    /**
     * deleteBillingEvent - deleteBillingEvent
     * 
     * Delete an existing billing event.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteBillingEvent.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteBillingEvent.Responses.$204>
  }
  ['/v1/billing/events/{event_type}']: {
    /**
     * createBillingEvent - createBillingEvent
     * 
     * Create a new billing event.
     */
    'post'(
      parameters?: Parameters<Paths.CreateBillingEvent.PathParameters> | null,
      data?: Paths.CreateBillingEvent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateBillingEvent.Responses.$201>
  }
  ['/v1/billing/contracts']: {
    /**
     * createContractEntity - createContractEntity
     * 
     * Create a new contract entity.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateContractEntity.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateContractEntity.Responses.$201>
  }
  ['/v1/billing/contracts/{id}']: {
    /**
     * updateContractEntity - updateContractEntity
     * 
     * Update an existing contract entity.
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateContractEntity.PathParameters> | null,
      data?: Paths.UpdateContractEntity.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateContractEntity.Responses.$200>
    /**
     * deleteContractEntity - deleteContractEntity
     * 
     * Delete an existing contract entity.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteContractEntity.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteContractEntity.Responses.$204>
  }
  ['/v1/billing/customers/{id}/balance']: {
    /**
     * getCustomerBalance - getCustomerBalance
     * 
     * Get total balance across all contracts and orders of a customer entity.
     */
    'get'(
      parameters?: Parameters<Paths.GetCustomerBalance.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCustomerBalance.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
