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
        export interface AvailabilityResult {
            /**
             * The id of the file where the address was found
             * example:
             * 4e7b7d95-ced6-4f5f-9326-0c61f30dcadb
             */
            fileId?: string;
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
         * The address rule error
         */
        export interface ValidateAddressFileError {
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
         * The address file validation result payload
         */
        export interface ValidateAddressFileResult {
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
            errors?: /* The address rule error */ ValidateAddressFileError[];
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
    namespace CheckAvailability {
        export interface HeaderParameters {
            "X-Epilot-Org-ID": Parameters.XEpilotOrgID;
        }
        namespace Parameters {
            export type CountryCode = string;
            export type Files = string;
            export type PostalCode = string;
            export type Street = string;
            export type StreetNumber = string;
            export type XEpilotOrgID = string;
        }
        export interface QueryParameters {
            files: Parameters.Files;
            countryCode: Parameters.CountryCode;
            postalCode: Parameters.PostalCode;
            street?: Parameters.Street;
            streetNumber?: Parameters.StreetNumber;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AvailabilityResult;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace GetAddresses {
        export interface HeaderParameters {
            "X-Epilot-Org-ID": Parameters.XEpilotOrgID;
        }
        namespace Parameters {
            export type CountryCodeSearchTerm = string;
            export type FileId = string;
            export type PostalCodeSearchTerm = string;
            export type S3FileUrl = string;
            export type StreetSearchTerm = string;
            export type XEpilotOrgID = string;
        }
        export interface QueryParameters {
            s3FileUrl?: Parameters.S3FileUrl;
            fileId?: Parameters.FileId;
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
            export type FileId = string;
            export type S3FileUrl = string;
        }
        export interface QueryParameters {
            s3FileUrl?: Parameters.S3FileUrl;
            fileId?: Parameters.FileId;
        }
        namespace Responses {
            export type $200 = /* The availability map file result payload */ Components.Schemas.ValidateAddressSuggestionsFileResult;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace ValidateAddressesFile {
        namespace Parameters {
            export type FileId = string;
        }
        export interface QueryParameters {
            fileId?: Parameters.FileId;
        }
        namespace Responses {
            export type $200 = /* The address file validation result payload */ Components.Schemas.ValidateAddressFileResult;
            export type $400 = Components.Schemas.Error;
        }
    }
}

export interface OperationMethods {
  /**
   * getAddresses - get addresses from file
   * 
   * Get address suggestions for the given file id
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
  /**
   * checkAvailability - Check address availability
   * 
   * Check the availability of a given address within multiple files
   */
  'checkAvailability'(
    parameters?: Parameters<Paths.CheckAvailability.QueryParameters & Paths.CheckAvailability.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CheckAvailability.Responses.$200>
  /**
   * validateAddressesFile - validate addresses file
   * 
   * Validates an addresses file, it returns an array of errors if the file is invalid
   */
  'validateAddressesFile'(
    parameters?: Parameters<Paths.ValidateAddressesFile.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ValidateAddressesFile.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/public/suggestions']: {
    /**
     * getAddresses - get addresses from file
     * 
     * Get address suggestions for the given file id
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
  ['/v1/public/availability:check']: {
    /**
     * checkAvailability - Check address availability
     * 
     * Check the availability of a given address within multiple files
     */
    'get'(
      parameters?: Parameters<Paths.CheckAvailability.QueryParameters & Paths.CheckAvailability.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CheckAvailability.Responses.$200>
  }
  ['/v1/addresses-files:validate']: {
    /**
     * validateAddressesFile - validate addresses file
     * 
     * Validates an addresses file, it returns an array of errors if the file is invalid
     */
    'get'(
      parameters?: Parameters<Paths.ValidateAddressesFile.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ValidateAddressesFile.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type AddressSuggestion = Components.Schemas.AddressSuggestion;
export type AddressSuggestionError = Components.Schemas.AddressSuggestionError;
export type AddressSuggestions = Components.Schemas.AddressSuggestions;
export type AvailabilityLocation = Components.Schemas.AvailabilityLocation;
export type AvailabilityResult = Components.Schemas.AvailabilityResult;
export type Error = Components.Schemas.Error;
export type ValidateAddressFileError = Components.Schemas.ValidateAddressFileError;
export type ValidateAddressFileResult = Components.Schemas.ValidateAddressFileResult;
export type ValidateAddressSuggestionsFileResult = Components.Schemas.ValidateAddressSuggestionsFileResult;
