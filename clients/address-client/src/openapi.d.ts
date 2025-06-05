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
            postal_code?: string; // postal-code
            /**
             * The city
             */
            city?: string; // city
            /**
             * The street
             */
            street?: string; // street-address
            /**
             * The street number
             */
            street_number?: string; // street-number
        }
        /**
         * The address suggestions entity array
         */
        export type AddressSuggestions = /* The address suggestions entity */ AddressSuggestion[];
        export interface AvailabilityCheckParams {
            /**
             * Entity ID's to check the availability parameters against
             */
            entities: [
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?
            ];
            /**
             * One or more schemas that should be used to query for the matching Entities. Defaults to all schemas if nore are specified.
             * example:
             * [
             *   "opportunity",
             *   "offer"
             * ]
             */
            schemas?: string[];
            filters: /* Availability filters dimensions */ AvailabilityFilters;
        }
        /**
         * A value to be matched against the availability window (start & end date)
         * example:
         * 2017-07-21
         */
        export type AvailabilityDate = string; // date
        /**
         * Availability filters dimensions
         */
        export interface AvailabilityFilters {
            location: AvailabilityLocation;
            available_date?: /**
             * A value to be matched against the availability window (start & end date)
             * example:
             * 2017-07-21
             */
            AvailabilityDate /* date */;
        }
        export interface AvailabilityLocation {
            /**
             * Street address or PO Box number.
             * example:
             * MediaPark
             */
            street?: string;
            /**
             * Apartment, suite, or unit number.
             * example:
             * 8a
             */
            street_number?: string;
            /**
             * The postal code for the address.
             * example:
             * 57008
             */
            postal_code?: string;
            /**
             * The name of the city, district, village, or town.
             * example:
             * Cologne
             */
            city?: string;
            /**
             * Country code
             * example:
             * DE
             */
            country?: string;
        }
        /**
         * The availability check result payload
         * example:
         * {
         *   "available_entities": [],
         *   "check_results": [
         *     {
         *       "entity_id": "72c803b2-2e5d-4bd6-bffc-fad998bbbe36",
         *       "matching_hits": 0
         *     },
         *     {
         *       "entity_id": "72c803b2-2e5d-4bd6-bffc-fad998bbbe37",
         *       "matching_hits": 0
         *     }
         *   ]
         * }
         */
        export interface AvailabilityResult {
            available_entities: string[];
            /**
             * The check result details
             */
            check_results: {
                entity_id: string; // uuid
                /**
                 * The number of rules matched
                 */
                matching_hits: number;
                /**
                 * A set of matching errors when checking availability
                 */
                matching_error?: {
                    [key: string]: any;
                };
            }[];
        }
        export interface ErrorResponse {
            /**
             * Error message
             */
            error: string;
        }
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
            message: string;
            /**
             * Data related to the error
             */
            data?: string;
        }
        /**
         * The availability map file result payload
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
    namespace AvailabilityCheck {
        export type RequestBody = Components.Schemas.AvailabilityCheckParams;
        namespace Responses {
            export type $200 = /**
             * The availability check result payload
             * example:
             * {
             *   "available_entities": [],
             *   "check_results": [
             *     {
             *       "entity_id": "72c803b2-2e5d-4bd6-bffc-fad998bbbe36",
             *       "matching_hits": 0
             *     },
             *     {
             *       "entity_id": "72c803b2-2e5d-4bd6-bffc-fad998bbbe37",
             *       "matching_hits": 0
             *     }
             *   ]
             * }
             */
            Components.Schemas.AvailabilityResult;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetAddressSuggestions {
        namespace Parameters {
            export type CountryCodeSearchTerm = string;
            export type FileRef = string; // uri
            export type PostalCodeSearchTerm = string; // postal-code
            export type StreetSearchTerm = string; // street-address
        }
        export interface QueryParameters {
            fileRef: Parameters.FileRef /* uri */;
            countryCodeSearchTerm?: Parameters.CountryCodeSearchTerm;
            postalCodeSearchTerm?: Parameters.PostalCodeSearchTerm /* postal-code */;
            streetSearchTerm?: Parameters.StreetSearchTerm /* street-address */;
        }
        namespace Responses {
            export type $200 = /* The address suggestions entity array */ Components.Schemas.AddressSuggestions;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ValidateAvailabilityFile {
        namespace Parameters {
            export type Id = string; // uuid
        }
        export interface PathParameters {
            id: Parameters.Id /* uuid */;
        }
        namespace Responses {
            export type $200 = /* The availability map file result payload */ Components.Schemas.ValidateAvailabilityFileResult;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
        }
    }
}


export interface OperationMethods {
  /**
   * getAddressSuggestions - getAddressSuggestions
   * 
   * Get address suggestions for the given Availability File
   */
  'getAddressSuggestions'(
    parameters?: Parameters<Paths.GetAddressSuggestions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAddressSuggestions.Responses.$200>
  /**
   * availabilityCheck - availabilityCheck
   * 
   * Check for Entities that contain a matching availability range in related availability files.
   */
  'availabilityCheck'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AvailabilityCheck.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AvailabilityCheck.Responses.$200>
  /**
   * validateAvailabilityFile - validateAvailabilityFile
   * 
   * Validates an already uploaded availability file, it returns an array of errors if any errors are found in the file.
   */
  'validateAvailabilityFile'(
    parameters?: Parameters<Paths.ValidateAvailabilityFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ValidateAvailabilityFile.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/public/suggestions']: {
    /**
     * getAddressSuggestions - getAddressSuggestions
     * 
     * Get address suggestions for the given Availability File
     */
    'get'(
      parameters?: Parameters<Paths.GetAddressSuggestions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAddressSuggestions.Responses.$200>
  }
  ['/v1/public/availability']: {
    /**
     * availabilityCheck - availabilityCheck
     * 
     * Check for Entities that contain a matching availability range in related availability files.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AvailabilityCheck.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AvailabilityCheck.Responses.$200>
  }
  ['/v1/availability/{id}/validate']: {
    /**
     * validateAvailabilityFile - validateAvailabilityFile
     * 
     * Validates an already uploaded availability file, it returns an array of errors if any errors are found in the file.
     */
    'get'(
      parameters?: Parameters<Paths.ValidateAvailabilityFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ValidateAvailabilityFile.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AddressSuggestion = Components.Schemas.AddressSuggestion;
export type AddressSuggestions = Components.Schemas.AddressSuggestions;
export type AvailabilityCheckParams = Components.Schemas.AvailabilityCheckParams;
export type AvailabilityDate = Components.Schemas.AvailabilityDate;
export type AvailabilityFilters = Components.Schemas.AvailabilityFilters;
export type AvailabilityLocation = Components.Schemas.AvailabilityLocation;
export type AvailabilityResult = Components.Schemas.AvailabilityResult;
export type ErrorResponse = Components.Schemas.ErrorResponse;
export type ValidateAvailabilityFileError = Components.Schemas.ValidateAvailabilityFileError;
export type ValidateAvailabilityFileResult = Components.Schemas.ValidateAvailabilityFileResult;
