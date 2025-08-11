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
        export interface ConsentEvent {
            type: "OPT_IN" | "OPT_OUT" | "DOUBLE_OPT_IN_REQUESTED" | "DOUBLE_OPT_IN";
            created_at?: string; // date-time
            topic: /**
             * Consent Topic (what the person is opting into)
             * example:
             * EMAIL_MARKETING
             */
            ConsentTopic;
            source?: /**
             * Consent Source (Origin of the Consent Event)
             * example:
             * www.frontend.epilot.cloud
             */
            ConsentSource;
            organization_id?: /**
             * example:
             * 123
             */
            OrganizationId;
            identifier: /**
             * Unique identifier for consent source (e.g. customer email or phone)
             * example:
             * exampleuser@epilot.cloud
             */
            ConsentIdentifier;
            meta?: /**
             * example:
             * {
             *   "double_opt_in": true,
             *   "source_type": "journey",
             *   "source_id": "0e4f2a26-14f0-4ada-9294-a7d7a0b9b214",
             *   "ip_address": "1.1.1.1",
             *   "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
             * }
             */
            ConsentMeta;
        }
        export interface ConsentEventRequestBody {
            type: "OPT_IN" | "OPT_OUT";
            topic: /**
             * Consent Topic (what the person is opting into)
             * example:
             * EMAIL_MARKETING
             */
            ConsentTopic;
            source?: /**
             * Consent Source (Origin of the Consent Event)
             * example:
             * www.frontend.epilot.cloud
             */
            ConsentSource;
            identifier: /**
             * Unique identifier for consent source (e.g. customer email or phone)
             * example:
             * exampleuser@epilot.cloud
             */
            ConsentIdentifier;
            meta?: /**
             * example:
             * {
             *   "double_opt_in": true,
             *   "source_type": "journey",
             *   "source_id": "0e4f2a26-14f0-4ada-9294-a7d7a0b9b214",
             *   "ip_address": "1.1.1.1",
             *   "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
             * }
             */
            ConsentMeta;
        }
        /**
         * Unique identifier for consent source (e.g. customer email or phone)
         * example:
         * exampleuser@epilot.cloud
         */
        export type ConsentIdentifier = string;
        /**
         * example:
         * {
         *   "double_opt_in": true,
         *   "source_type": "journey",
         *   "source_id": "0e4f2a26-14f0-4ada-9294-a7d7a0b9b214",
         *   "ip_address": "1.1.1.1",
         *   "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
         * }
         */
        export interface ConsentMeta {
            [name: string]: any;
        }
        /**
         * Consent Source (Origin of the Consent Event)
         * example:
         * www.frontend.epilot.cloud
         */
        export type ConsentSource = string;
        /**
         * Consent Topic (what the person is opting into)
         * example:
         * EMAIL_MARKETING
         */
        export type ConsentTopic = string;
        /**
         * example:
         * 123
         */
        export type OrganizationId = string;
    }
}
declare namespace Paths {
    namespace HandleOptInWithToken {
        namespace Parameters {
            export type Lang = string;
            export type Token = string;
        }
        export interface PathParameters {
            token: Parameters.Token;
        }
        export interface QueryParameters {
            lang?: Parameters.Lang;
        }
    }
    namespace ListConsentEvents {
        namespace Parameters {
            export type From = number;
            export type Identifier = /**
             * Unique identifier for consent source (e.g. customer email or phone)
             * example:
             * exampleuser@epilot.cloud
             */
            Components.Schemas.ConsentIdentifier;
            export type Limit = number;
            export type Topic = /**
             * Consent Topic (what the person is opting into)
             * example:
             * EMAIL_MARKETING
             */
            Components.Schemas.ConsentTopic;
        }
        export interface PathParameters {
            identifier: Parameters.Identifier;
        }
        export interface QueryParameters {
            topic?: Parameters.Topic;
            limit?: Parameters.Limit;
            from?: Parameters.From;
        }
        namespace Responses {
            export interface $200 {
                events?: Components.Schemas.ConsentEvent[];
                /**
                 * example:
                 * 1
                 */
                total?: number;
            }
        }
    }
    namespace PublishConsentEvent {
        export type RequestBody = Components.Schemas.ConsentEventRequestBody;
        namespace Responses {
            export type $201 = Components.Schemas.ConsentEvent;
        }
    }
}


export interface OperationMethods {
  /**
   * publishConsentEvent - publishConsentEvent
   * 
   * Publishes consent event on event bus, which appends to consent store
   * 
   */
  'publishConsentEvent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PublishConsentEvent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PublishConsentEvent.Responses.$201>
  /**
   * listConsentEvents - listConsentEvents
   * 
   * List opt-ins and opt-outs by customer identifier
   * 
   */
  'listConsentEvents'(
    parameters?: Parameters<Paths.ListConsentEvents.QueryParameters & Paths.ListConsentEvents.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListConsentEvents.Responses.$200>
  /**
   * handleOptInWithToken - handleOptInWithToken
   * 
   * Endpoint to handle opt-in links
   * 
   */
  'handleOptInWithToken'(
    parameters?: Parameters<Paths.HandleOptInWithToken.QueryParameters & Paths.HandleOptInWithToken.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
}

export interface PathsDictionary {
  ['/v1/consent/publish']: {
    /**
     * publishConsentEvent - publishConsentEvent
     * 
     * Publishes consent event on event bus, which appends to consent store
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PublishConsentEvent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PublishConsentEvent.Responses.$201>
  }
  ['/v1/consent/{identifier}']: {
    /**
     * listConsentEvents - listConsentEvents
     * 
     * List opt-ins and opt-outs by customer identifier
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListConsentEvents.QueryParameters & Paths.ListConsentEvents.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListConsentEvents.Responses.$200>
  }
  ['/v1/opt-in/{token}']: {
    /**
     * handleOptInWithToken - handleOptInWithToken
     * 
     * Endpoint to handle opt-in links
     * 
     */
    'get'(
      parameters?: Parameters<Paths.HandleOptInWithToken.QueryParameters & Paths.HandleOptInWithToken.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ConsentEvent = Components.Schemas.ConsentEvent;
export type ConsentEventRequestBody = Components.Schemas.ConsentEventRequestBody;
export type ConsentIdentifier = Components.Schemas.ConsentIdentifier;
export type ConsentMeta = Components.Schemas.ConsentMeta;
export type ConsentSource = Components.Schemas.ConsentSource;
export type ConsentTopic = Components.Schemas.ConsentTopic;
export type OrganizationId = Components.Schemas.OrganizationId;
