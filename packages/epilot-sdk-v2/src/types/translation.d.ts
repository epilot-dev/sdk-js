/* Auto-copied from translation-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Schemas {
        export interface Error {
            /**
             * HTTP status code
             * example:
             * 429
             */
            status: number;
            /**
             * Error message
             * example:
             * Monthly translation budget exceeded
             */
            error: string;
        }
        /**
         * ISO 639-1 language code, optionally with a region (e.g. `en`, `pt-BR`)
         * example:
         * en
         */
        export type LanguageCode = string; // ^[a-z]{2}(-[A-Z]{2})?$
        export interface TranslateTextsRequest {
            /**
             * Texts to translate. Duplicates are allowed and translated once.
             */
            texts: [
                string,
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
            target_language: /**
             * ISO 639-1 language code, optionally with a region (e.g. `en`, `pt-BR`)
             * example:
             * en
             */
            LanguageCode /* ^[a-z]{2}(-[A-Z]{2})?$ */;
            /**
             * Language of every text. Omit to detect it per text.
             * example:
             * en
             */
            source_language?: string; // ^[a-z]{2}(-[A-Z]{2})?$
        }
        export interface TranslateTextsResponse {
            translations: Translation[];
        }
        export interface Translation {
            /**
             * The translated text
             */
            text: string;
            /**
             * Language of the original text: the detected one, or
             * `source_language` from the request. `und` when it could not be
             * detected.
             *
             * example:
             * de
             */
            source_language: string;
        }
    }
}
export declare namespace Paths {
    namespace TranslateTexts {
        export type RequestBody = Components.Schemas.TranslateTextsRequest;
        namespace Responses {
            export type $200 = Components.Schemas.TranslateTextsResponse;
            export type $400 = Components.Schemas.Error;
            export type $401 = Components.Schemas.Error;
            export type $403 = Components.Schemas.Error;
            export type $429 = Components.Schemas.Error;
            export type $502 = Components.Schemas.Error;
        }
    }
}


export interface OperationMethods {
  /**
   * translateTexts - translateTexts
   * 
   * Translates a batch of texts into `target_language`, returning one
   * translation per input, in the same order.
   * 
   * The source language is detected per text unless `source_language` is
   * given. A text already in the target language comes back unchanged with
   * `source_language` equal to `target_language`, so a client can tell an
   * actual translation from a pass-through.
   * 
   */
  'translateTexts'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.TranslateTexts.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TranslateTexts.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/translation:translate']: {
    /**
     * translateTexts - translateTexts
     * 
     * Translates a batch of texts into `target_language`, returning one
     * translation per input, in the same order.
     * 
     * The source language is detected per text unless `source_language` is
     * given. A text already in the target language comes back unchanged with
     * `source_language` equal to `target_language`, so a client can tell an
     * actual translation from a pass-through.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.TranslateTexts.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TranslateTexts.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Error = Components.Schemas.Error;
export type LanguageCode = Components.Schemas.LanguageCode;
export type TranslateTextsRequest = Components.Schemas.TranslateTextsRequest;
export type TranslateTextsResponse = Components.Schemas.TranslateTextsResponse;
export type Translation = Components.Schemas.Translation;
