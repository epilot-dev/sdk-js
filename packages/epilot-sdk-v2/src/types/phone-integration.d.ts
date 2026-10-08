/* Auto-copied from phone-integration-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Schemas {
        export interface CustomerBatchSearchResult {
            /**
             * One result per distinct identifier
             */
            results: CustomerSearchResult[];
        }
        export interface CustomerIdentifier {
            type: "id" | "customer_number" | "external_id" | "phone_number" | "email";
            /**
             * The identifier as sent
             * example:
             * +4917012345678
             */
            value: string;
        }
        export interface CustomerSearchResult {
            identifier: CustomerIdentifier;
            /**
             * - `found` — exactly one contact has the identifier; see `customer`
             * - `not_found` — no contact the caller may see has it
             * - `ambiguous` — several contacts share it; none is chosen
             * - `invalid` — not a usable identifier (a phone number that does
             *   not parse), so nothing was searched
             * - `error` — the search for this identifier failed; try again
             *
             */
            status: "found" | "not_found" | "ambiguous" | "invalid" | "error";
            customer?: /* Present when `status` is `found` */ CustomerSummary;
        }
        /**
         * Present when `status` is `found`
         */
        export interface CustomerSummary {
            /**
             * epilot entity id of the customer (Contact)
             * example:
             * dba8e5f9-8b3f-4608-b887-cd0798fce624
             */
            id: string;
            /**
             * The contact's title, else its first and last name; null when it has neither
             * example:
             * Max Mustermann
             */
            name: string | null;
            /**
             * Omitted when the contact has none
             * example:
             * 4711
             */
            customer_number?: string;
        }
        export interface ErrorResponse {
            /**
             * HTTP status code.
             */
            status: number;
            /**
             * Human-readable error message.
             */
            error: string;
            /**
             * Stable machine-readable error code, when the operation defines one.
             */
            code?: string;
        }
    }
}
export declare namespace Paths {
    namespace BatchSearchCustomers {
        export interface HeaderParameters {
            "x-trace-id"?: Parameters.XTraceId;
        }
        namespace Parameters {
            export type CustomerNumber = string[];
            export type Email = string[];
            export type ExternalId = string[];
            export type Id = string[];
            export type PhoneNumber = string[];
            export type XTraceId = string;
        }
        export interface QueryParameters {
            id?: Parameters.Id;
            customer_number?: Parameters.CustomerNumber;
            external_id?: Parameters.ExternalId;
            phone_number?: Parameters.PhoneNumber;
            email?: Parameters.Email;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CustomerBatchSearchResult;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
        }
    }
}


export interface OperationMethods {
  /**
   * batchSearchCustomers - batchSearchCustomers
   * 
   * Resolves up to 50 identifiers to epilot customers (Contacts) in one
   * request — for example every number in an agent's call history.
   * 
   * Each identifier is an exact key of a Contact: its entity `id`, its
   * `customer_number`, its `external_id`, one of its `email` addresses or
   * one of its `phone` numbers. Repeat a parameter to pass several values,
   * and combine parameters freely. Phone numbers are normalized on the
   * server, so E.164, national and formatted forms of one number match the
   * same contact; the other identifiers match exactly, ignoring case and
   * surrounding whitespace.
   * 
   * Every distinct identifier gets its own result, so one unknown or
   * ambiguous identifier never fails the others. Results are ordered by
   * parameter (`id`, `customer_number`, `external_id`, `phone_number`,
   * `email`), then as sent; match them by `identifier`.
   * 
   * The search runs with the caller's token: the organization and the
   * permissions applied are the caller's own, as for entity search.
   * 
   */
  'batchSearchCustomers'(
    parameters?: Parameters<Paths.BatchSearchCustomers.QueryParameters & Paths.BatchSearchCustomers.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BatchSearchCustomers.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/customer:batchSearch']: {
    /**
     * batchSearchCustomers - batchSearchCustomers
     * 
     * Resolves up to 50 identifiers to epilot customers (Contacts) in one
     * request — for example every number in an agent's call history.
     * 
     * Each identifier is an exact key of a Contact: its entity `id`, its
     * `customer_number`, its `external_id`, one of its `email` addresses or
     * one of its `phone` numbers. Repeat a parameter to pass several values,
     * and combine parameters freely. Phone numbers are normalized on the
     * server, so E.164, national and formatted forms of one number match the
     * same contact; the other identifiers match exactly, ignoring case and
     * surrounding whitespace.
     * 
     * Every distinct identifier gets its own result, so one unknown or
     * ambiguous identifier never fails the others. Results are ordered by
     * parameter (`id`, `customer_number`, `external_id`, `phone_number`,
     * `email`), then as sent; match them by `identifier`.
     * 
     * The search runs with the caller's token: the organization and the
     * permissions applied are the caller's own, as for entity search.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.BatchSearchCustomers.QueryParameters & Paths.BatchSearchCustomers.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BatchSearchCustomers.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type CustomerBatchSearchResult = Components.Schemas.CustomerBatchSearchResult;
export type CustomerIdentifier = Components.Schemas.CustomerIdentifier;
export type CustomerSearchResult = Components.Schemas.CustomerSearchResult;
export type CustomerSummary = Components.Schemas.CustomerSummary;
export type ErrorResponse = Components.Schemas.ErrorResponse;
