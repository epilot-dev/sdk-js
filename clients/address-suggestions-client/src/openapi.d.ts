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
        /**
         * The address suggestions entity
         */
        export interface AddressSuggestion {
            /**
             * The country code
             */
            country?: string;
            /**
             * The postal code
             */
            postal_code?: string;
            /**
             * The city
             */
            city?: string;
            /**
             * The street
             */
            street?: string;
            /**
             * The street number
             */
            street_number?: string;
        }
        /**
         * The availability rule error
         */
        export interface AddressSuggestionError {
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
         * The address suggestions entity array
         */
        export type AddressSuggestions = /* The address suggestions entity */ AddressSuggestion[];
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
         * The availability map file result payload
         */
        export interface ValidateAddressSuggestionsFileResult {
            /**
             * The status of the validation
             */
            status?: "success" | "error";
            /**
             * The number of rules successfully parsed
             */
            rules_parsed_count?: number;
            /**
             * The errors found on the file
             */
            errors?: /* The availability rule error */ AddressSuggestionError[];
        }
    }
}
declare namespace Paths {
    namespace GetAddresses {
        export interface HeaderParameters {
            "X-Epilot-Org-ID": Parameters.XEpilotOrgID;
        }
        namespace Parameters {
            export type CountryCodeSearchTerm = string;
            export type PostalCodeSearchTerm = string;
            export type S3FileUrl = string;
            export type StreetSearchTerm = string;
            export type XEpilotOrgID = string;
        }
        export interface QueryParameters {
            s3FileUrl: Parameters.S3FileUrl;
            countryCodeSearchTerm?: Parameters.CountryCodeSearchTerm;
            postalCodeSearchTerm?: Parameters.PostalCodeSearchTerm;
            streetSearchTerm?: Parameters.StreetSearchTerm;
        }
        namespace Responses {
            export type $200 = /* The address suggestions entity array */ Components.Schemas.AddressSuggestions;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace ValidateAddresses {
        namespace Parameters {
            export type S3FileUrl = string;
        }
        export interface QueryParameters {
            s3FileUrl: Parameters.S3FileUrl;
        }
        namespace Responses {
            export type $200 = /* The availability map file result payload */ Components.Schemas.ValidateAddressSuggestionsFileResult;
            export type $400 = Components.Schemas.Error;
        }
    }
}

export interface OperationMethods {
  /**
   * getAddresses - get addresses from file
   * 
   * get address suggestions for the given file id
   */
  'getAddresses'(
    parameters?: Parameters<Paths.GetAddresses.QueryParameters & Paths.GetAddresses.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAddresses.Responses.$200>
  /**
   * validateAddresses - validate addresses file
   * 
   * Validates an addresses file, it returns an array of errors if the file is invalid
   */
  'validateAddresses'(
    parameters?: Parameters<Paths.ValidateAddresses.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ValidateAddresses.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/public/suggestions']: {
    /**
     * getAddresses - get addresses from file
     * 
     * get address suggestions for the given file id
     */
    'get'(
      parameters?: Parameters<Paths.GetAddresses.QueryParameters & Paths.GetAddresses.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAddresses.Responses.$200>
  }
  ['/v1/suggestions:validate']: {
    /**
     * validateAddresses - validate addresses file
     * 
     * Validates an addresses file, it returns an array of errors if the file is invalid
     */
    'get'(
      parameters?: Parameters<Paths.ValidateAddresses.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ValidateAddresses.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
