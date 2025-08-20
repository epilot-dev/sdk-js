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
         * A single button option data
         */
        export interface ButtonOption {
            /**
             * The value of the button
             * example:
             * Button Hidden Value
             */
            value?: string;
            /**
             * The label of the button
             * example:
             * Button Label
             */
            label?: string;
        }
        /**
         * Name of the field used in validation
         */
        export type FieldName = string;
        export interface GenerateDocumentRequest {
            /**
             * Entity id for the template being used
             * example:
             * 1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p
             */
            file_id: string;
            /**
             * Custom values for variables in the template. Takes the higher precedence than others.
             */
            context_data: {
                additionalProperties?: string;
            };
            /**
             * Language code for the document
             * example:
             * de
             */
            language?: string;
        }
        export interface GenerateDocumentResponse {
            job_id?: string; // uuid
            /**
             * Status of the job
             */
            job_status?: "STARTED" | "PROCESSING" | "SUCCESS" | "FAILED";
            /**
             * A message explaining the progress
             */
            message?: string;
            pdf_output?: {
                /**
                 * Pre-signed S3 GET URL for PDF preview
                 * example:
                 * https://document-api-prod.s3.eu-central-1.amazonaws.com/preview/my-template-OR-001.pdf
                 */
                preview_url?: string;
                /**
                 * example:
                 * {
                 *   "s3ref": {
                 *     "bucket": "document-api-preview-prod",
                 *     "key": "preview/my-template.pdf"
                 *   }
                 * }
                 */
                output_document?: {
                    /**
                     * Generated document filename for PDF
                     * example:
                     * my-template-OR-001.pdf
                     */
                    filename?: string;
                    s3ref?: S3Reference;
                };
            };
            docx_output?: {
                /**
                 * Pre-signed S3 GET URL for DOCX preview
                 * example:
                 * https://document-api-prod.s3.eu-central-1.amazonaws.com/preview/my-template-OR-001.docx
                 */
                preview_url?: string;
                /**
                 * example:
                 * {
                 *   "s3ref": {
                 *     "bucket": "document-api-preview-prod",
                 *     "key": "preview/my-template.docx"
                 *   }
                 * }
                 */
                output_document?: {
                    /**
                     * Generated document filename for DOCX
                     * example:
                     * my-template-OR-001.docx
                     */
                    filename?: string;
                    s3ref?: S3Reference;
                };
            };
            /**
             * List of variables and its corresponding replaced values from the document template
             */
            variable_payload?: {
                additionalProperties?: string;
            };
            template_settings?: /* Template Settings for document generation */ TemplateSettings;
        }
        export interface GetJourneysResponse {
        }
        export interface GetSettingsForJourney {
            /**
             * ID of an organization in epilot platform
             * example:
             * 739224
             */
            organizationId?: string;
            /**
             * The canary flag controls update frequency of epilot application: when true, customers receive continuous updates; when false, they only get updates with new version releases.
             * example:
             * true
             */
            canary?: boolean;
        }
        export interface Journey {
            [name: string]: any;
            journeyId?: string;
            organizationId: string;
            brandId?: string;
            name: string;
            steps: {
                showStepName?: boolean | null;
                title?: string | null;
                subTitle?: string | null;
                showStepSubtitle?: boolean | null;
                showStepper?: boolean | null;
                showStepperLabels?: boolean | null;
                hideNextButton?: boolean | null;
                name: string;
                stepId?: string;
                schema: any;
                uischema: any;
                maxWidth?: "small" | "medium" | "large" | "extra large";
            }[];
            design?: {
                logoUrl?: string | null;
                theme: {
                    [name: string]: any;
                };
                designTokens?: {
                    [key: string]: any;
                };
            };
            rules?: {
                type: "inject" | "injectWithKey";
                sourceType: "journey" | "step" | "block";
                source: string;
                target: string;
            }[];
            logics?: {
                autoGeneratedId?: string;
                conditions: string[];
                actions: string[];
            }[];
            contextSchema?: {
                type: string;
                paramKey: string;
                isRequired?: boolean;
                shouldLoadEntity?: boolean;
            }[];
            /**
             * Journey Template
             * example:
             * Sales template (Premium)
             */
            journey_type?: string;
            settings?: {
                embedOptions?: {
                    mode?: "full-screen" | "inline";
                    lang?: "de" | "en" | "fr";
                    width?: string;
                    topBar?: boolean;
                    scrollToTop?: boolean;
                    button?: {
                        text?: string | null;
                        align?: "left" | "center" | "right";
                    };
                };
                safeModeAutomation?: boolean;
                /**
                 * DEPRECATED - This API will return hardcoded value of false. Please note that this field is internal to epilot and should not be used by external clients. If you wish to get the canary flag, please use the /v1/journey/{id}/settings API.
                 */
                canary?: boolean;
                designId: string;
                templateId?: string;
                entityId?: string | null;
                mappingsAutomationId?: string;
                targetedCustomer?: string;
                description?: string | null;
                organizationSettings?: {
                    [name: string]: boolean;
                } | null;
                publicToken?: string | null;
                runtimeEntities?: ("ORDER" | "OPPORTUNITY")[];
                filePurposes?: string[];
                entityTags?: string[];
                /**
                 * @deprecated Use addressSuggestionsFileId instead
                 */
                addressSuggestionsFileUrl?: string | null;
                addressSuggestionsFileId?: string | null;
                /**
                 * This property is deprecated and will be removed in a future version
                 */
                useNewDesign?: boolean;
                /**
                 * If true, some journey input labels are in Austrian format
                 */
                useAustrianLabels?: boolean;
                /**
                 * If true, the journey shows an icon to toggle dark mode
                 */
                enableDarkMode?: boolean;
                accessMode?: "PUBLIC" | "PRIVATE";
                isPublished?: boolean;
                status?: string;
                isActive?: boolean;
                savingProgress?: {
                    savingMode?: "auto" | "local" | "remote" | "none";
                    supportedVersion?: number;
                };
                /**
                 * If false, third-party cookies are disabled to comply with GDPR regulations without asking for consent.
                 */
                thirdPartyCookies?: boolean;
            };
            validationRules?: /**
             * Record of BlockId → RuleId or array of RuleRef objects
             *
             */
            ValidationRuleRef[];
            createdBy?: string;
            /**
             * If passed with value of null, the API won't modify the lastModifiedAt field on updating the journey
             */
            __lastModifiedAt?: string | null;
            createdAt: string;
            lastModifiedAt: string;
            deletedAt?: string;
            version: number;
            revisions: number;
            featureFlags?: {
                [name: string]: any;
            };
        }
        export interface JourneyAuditInfo {
            createdAt: string;
            lastModifiedAt: string;
            deletedAt?: string;
            version: number;
            revisions: number;
        }
        export interface JourneyCreationRequest {
            [name: string]: any;
            journeyId?: string;
            organizationId: string;
            brandId?: string;
            name: string;
            steps: {
                showStepName?: boolean | null;
                title?: string | null;
                subTitle?: string | null;
                showStepSubtitle?: boolean | null;
                showStepper?: boolean | null;
                showStepperLabels?: boolean | null;
                hideNextButton?: boolean | null;
                name: string;
                stepId?: string;
                schema: any;
                uischema: any;
                maxWidth?: "small" | "medium" | "large" | "extra large";
            }[];
            design?: {
                logoUrl?: string | null;
                theme: {
                    [name: string]: any;
                };
                designTokens?: {
                    [key: string]: any;
                };
            };
            rules?: {
                type: "inject" | "injectWithKey";
                sourceType: "journey" | "step" | "block";
                source: string;
                target: string;
            }[];
            logics?: {
                autoGeneratedId?: string;
                conditions: string[];
                actions: string[];
            }[];
            contextSchema?: {
                type: string;
                paramKey: string;
                isRequired?: boolean;
                shouldLoadEntity?: boolean;
            }[];
            /**
             * Journey Template
             * example:
             * Sales template (Premium)
             */
            journey_type?: string;
            settings?: {
                embedOptions?: {
                    mode?: "full-screen" | "inline";
                    lang?: "de" | "en" | "fr";
                    width?: string;
                    topBar?: boolean;
                    scrollToTop?: boolean;
                    button?: {
                        text?: string | null;
                        align?: "left" | "center" | "right";
                    };
                };
                safeModeAutomation?: boolean;
                /**
                 * DEPRECATED - This API will return hardcoded value of false. Please note that this field is internal to epilot and should not be used by external clients. If you wish to get the canary flag, please use the /v1/journey/{id}/settings API.
                 */
                canary?: boolean;
                designId: string;
                templateId?: string;
                entityId?: string | null;
                mappingsAutomationId?: string;
                targetedCustomer?: string;
                description?: string | null;
                organizationSettings?: {
                    [name: string]: boolean;
                } | null;
                publicToken?: string | null;
                runtimeEntities?: ("ORDER" | "OPPORTUNITY")[];
                filePurposes?: string[];
                entityTags?: string[];
                /**
                 * @deprecated Use addressSuggestionsFileId instead
                 */
                addressSuggestionsFileUrl?: string | null;
                addressSuggestionsFileId?: string | null;
                /**
                 * This property is deprecated and will be removed in a future version
                 */
                useNewDesign?: boolean;
                /**
                 * If true, some journey input labels are in Austrian format
                 */
                useAustrianLabels?: boolean;
                /**
                 * If true, the journey shows an icon to toggle dark mode
                 */
                enableDarkMode?: boolean;
                accessMode?: "PUBLIC" | "PRIVATE";
                isPublished?: boolean;
                status?: string;
                isActive?: boolean;
                savingProgress?: {
                    savingMode?: "auto" | "local" | "remote" | "none";
                    supportedVersion?: number;
                };
                /**
                 * If false, third-party cookies are disabled to comply with GDPR regulations without asking for consent.
                 */
                thirdPartyCookies?: boolean;
            };
            validationRules?: /**
             * Record of BlockId → RuleId or array of RuleRef objects
             *
             */
            ValidationRuleRef[];
            createdBy?: string;
            /**
             * If passed with value of null, the API won't modify the lastModifiedAt field on updating the journey
             */
            __lastModifiedAt?: string | null;
        }
        export interface JourneyCreationRequestV2 {
            journeyId?: string;
            brandId?: string;
            name: string;
            steps: {
                showStepName?: boolean | null;
                title?: string | null;
                subTitle?: string | null;
                showStepSubtitle?: boolean | null;
                showStepper?: boolean | null;
                showStepperLabels?: boolean | null;
                hideNextButton?: boolean | null;
                name: string;
                stepId?: string;
                schema: any;
                uischema: any;
                maxWidth?: "small" | "medium" | "large" | "extra large";
            }[];
            design?: {
                logoUrl?: string | null;
                theme?: {
                    [name: string]: any;
                };
                designTokens?: {
                    [key: string]: any;
                };
            };
            rules?: {
                type: "inject" | "injectWithKey";
                sourceType: "journey" | "step" | "block";
                source: string;
                target: string;
            }[];
            logics?: {
                autoGeneratedId?: string;
                conditions: string[];
                actions: string[];
            }[];
            contextSchema?: {
                type: string;
                paramKey: string;
                isRequired?: boolean;
                shouldLoadEntity?: boolean;
            }[];
            /**
             * Journey Template
             * example:
             * Sales template (Premium)
             */
            journey_type?: string;
            settings?: {
                embedOptions?: {
                    mode?: "full-screen" | "inline";
                    lang?: "de" | "en" | "fr";
                    width?: string;
                    topBar?: boolean;
                    scrollToTop?: boolean;
                    button?: {
                        text?: string | null;
                        align?: "left" | "center" | "right";
                    };
                };
                safeModeAutomation?: boolean;
                designId?: string;
                entityId?: string | null;
                mappingsAutomationId?: string;
                templateId?: string;
                targetedCustomer?: string;
                description?: string | null;
                publicToken?: string | null;
                runtimeEntities?: ("ORDER" | "OPPORTUNITY")[];
                filePurposes?: string[];
                entityTags?: string[];
                /**
                 * @deprecated Use addressSuggestionsFileId instead
                 */
                addressSuggestionsFileUrl?: string | null;
                addressSuggestionsFileId?: string | null;
                /**
                 * This property is deprecated and will be removed in a future version
                 */
                useNewDesign?: boolean;
                /**
                 * If false, third-party cookies are disabled to comply with GDPR regulations without asking for consent.
                 */
                thirdPartyCookies?: boolean;
                accessMode?: "PUBLIC" | "PRIVATE";
                /**
                 * If true, the journey shows an icon to toggle dark mode
                 */
                enableDarkMode?: boolean;
            };
            validationRules?: /**
             * Record of BlockId → RuleId or array of RuleRef objects
             *
             */
            ValidationRuleRef[];
            /**
             * Manifest/Blueprint ID used to create/update the entity
             */
            _manifest?: string /* uuid */[];
        }
        export interface JourneyFeatureFlags {
            featureFlags?: {
                [name: string]: any;
            };
        }
        export type JourneyProductsResponse = {
            type?: string;
            _schema?: string;
            _title?: string;
            name?: string;
            _id?: string;
            _org?: string;
            code?: string;
            description?: string;
            feature?: any[];
            product_images?: any[];
            legal_footnote?: string;
            product_downloads?: any[];
            price?: {
                [key: string]: any;
            };
        }[];
        export interface JourneyResponse {
            createdJourney?: Journey;
        }
        /**
         * Patch request to update a journey (journey id is required) Support for nested properties (e.g. steps[0].uischema.elements[0].products) is supported.
         *
         */
        export interface PatchUpdateJourneyRequest {
            [name: string]: any;
            /**
             * example:
             * 509cdffe-424f-457a-95c2-9708c304ce77
             */
            journeyId: string; // uuid
            /**
             * If passed with value of null, the API won't modify the lastModifiedAt field on updating the journey
             */
            __lastModifiedAt?: string | null;
        }
        /**
         * The ID of the rule, used to reference a specific rule
         *
         */
        export type RuleId = string;
        export interface RuleRef {
            id: /**
             * The ID of the rule, used to reference a specific rule
             *
             */
            RuleId;
            fields: /* Name of the field used in validation */ FieldName[];
        }
        export interface S3Reference {
            /**
             * example:
             * document-api-prod
             */
            bucket: string;
            /**
             * example:
             * uploads/my-template.pdf
             */
            key: string;
        }
        export interface SearchJourneysQueryRequest {
            /**
             * Lucene query syntax
             * See https://lucene.apache.org/core/2_9_4/queryparsersyntax.html ; https://www.elastic.co/guide/en/kibana/current/lucene-query.html
             *
             * example:
             * _tags:*Flex*
             */
            q?: string;
            /**
             * The offset of the first result to return.
             * See https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-from-size.html
             *
             * example:
             * 0
             */
            from?: number;
            /**
             * The maximum number of results to return.
             * See https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-from-size.html
             *
             * example:
             * 25
             */
            size?: number;
            /**
             * The sort order. Follows Lucene syntax.
             *
             * example:
             * _created_at:desc
             */
            sort?: string;
        }
        export interface SearchJourneysResponse {
            /**
             * The total number of hits.
             *
             * example:
             * 1
             */
            hits?: number;
            /**
             * The results.
             *
             */
            results?: {
                /**
                 * Journey Entity ID
                 * example:
                 * e0f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8
                 */
                _id?: string; // uuid
                /**
                 * Entity Schema (journey always in this case)
                 * example:
                 * journey
                 */
                _schema?: string;
                /**
                 * Journey Entity Title
                 * example:
                 * Journey Entity Title
                 */
                _title?: string;
                /**
                 * Organization ID
                 * example:
                 * 739224
                 */
                _org?: string;
                /**
                 * example:
                 * 2020-01-01T00:00:00.000Z
                 */
                _created_at?: string; // date-time
                /**
                 * example:
                 * 2020-01-01T00:00:00.000Z
                 */
                _updated_at?: string; // date-time
                _tags?: string[];
                /**
                 * Manifest ID used to create/update the entity
                 */
                _manifest?: string /* uuid */[];
                /**
                 * Journey Name
                 * example:
                 * Journey Name
                 */
                journey_name?: string;
                /**
                 * Journey config ID
                 * example:
                 * de7df470-253e-11ed-9174-116b8a718c0a
                 */
                journey_id?: string; // uuid
                /**
                 * Journey Template
                 * example:
                 * Sales template
                 */
                journey_type?: string;
                /**
                 * Journey Design Name
                 * example:
                 * Design EPILOT
                 */
                design?: string;
                created_by?: {
                    /**
                     * User ID
                     * example:
                     * 12345
                     */
                    id?: string;
                }[];
                /**
                 * Journey Version
                 */
                journey_version?: "Flex";
            }[];
        }
        /**
         * Template Settings for document generation
         */
        export interface TemplateSettings {
            /**
             * Custom margins for the document
             */
            custom_margins?: {
                /**
                 * Top margin in cm
                 * example:
                 * 2.54
                 */
                top?: number;
                /**
                 * Bottom margin in cm
                 * example:
                 * 2.54
                 */
                bottom?: number;
            };
            /**
             * Suggested margins for the document
             */
            suggested_margins?: {
                /**
                 * Top margin in cm
                 * example:
                 * 2.54
                 */
                top?: number;
                /**
                 * Bottom margin in cm
                 * example:
                 * 2.54
                 */
                bottom?: number;
            };
            /**
             * Display margin guidelines (applicable to partial generation only)
             * example:
             * true
             */
            display_margin_guidelines?: boolean;
            /**
             * Enable data table margin autofix
             * example:
             * false
             */
            enable_data_table_margin_autofix?: boolean;
            /**
             * A flag that indicates whether the template has 1 or more data tables in it
             * example:
             * false
             */
            template_with_datatable?: boolean;
            /**
             * Enables the persistance of template settings
             * example:
             * false
             */
            enabled_template_settings_persistence?: boolean;
            /**
             * An indication that the page margins are misconfigured
             * example:
             * false
             */
            misconfigured_margins?: boolean;
            /**
             * The file entity id, used when persisting a new template version with updated settings
             * example:
             * 1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p
             */
            file_entity_id?: string; // uuid
        }
        /**
         * Record of BlockId → RuleId or array of RuleRef objects
         *
         */
        export interface ValidationRuleRef {
            [name: string]: /**
             * The ID of the rule, used to reference a specific rule
             *
             */
            RuleId | RuleRef[];
        }
    }
}
declare namespace Paths {
    namespace CreateJourney {
        namespace Parameters {
            /**
             * example:
             * true
             */
            export type SkipAutomation = string; // Yn
        }
        export interface QueryParameters {
            skipAutomation?: /**
             * example:
             * true
             */
            Parameters.SkipAutomation /* Yn */;
        }
        export type RequestBody = Components.Schemas.JourneyCreationRequest;
        namespace Responses {
            export type $201 = Components.Schemas.Journey;
        }
    }
    namespace CreateJourneyV2 {
        namespace Parameters {
            /**
             * example:
             * true
             */
            export type SkipAutomation = string; // Yn
        }
        export interface QueryParameters {
            skipAutomation?: /**
             * example:
             * true
             */
            Parameters.SkipAutomation /* Yn */;
        }
        export type RequestBody = Components.Schemas.JourneyCreationRequestV2;
        namespace Responses {
            export type $201 = Components.Schemas.JourneyCreationRequestV2;
        }
    }
    namespace GenerateDocument {
        export type RequestBody = Components.Schemas.GenerateDocumentRequest;
        namespace Responses {
            export type $200 = Components.Schemas.GenerateDocumentResponse;
        }
    }
    namespace GetButtonOptions {
        namespace Parameters {
            /**
             * example:
             * 535ef74a-dd66-4d01-94a9-725016e70d1c
             */
            export type FileId = string;
        }
        export interface QueryParameters {
            fileId: /**
             * example:
             * 535ef74a-dd66-4d01-94a9-725016e70d1c
             */
            Parameters.FileId;
        }
        namespace Responses {
            export type $200 = /* A single button option data */ Components.Schemas.ButtonOption[];
            export interface $400 {
                /**
                 * example:
                 * UTF-8 encoding error while processing CSV content
                 */
                message?: string;
                /**
                 * example:
                 * Please ensure your CSV file is properly encoded in UTF-8 format
                 */
                details?: string;
            }
            export interface $404 {
                /**
                 * example:
                 * journey not found
                 */
                message?: string;
            }
            export interface $500 {
                /**
                 * example:
                 * Unknown API Error
                 */
                message?: string;
            }
        }
    }
    namespace GetJourney {
        namespace Parameters {
            /**
             * example:
             * 509cdffe-424f-457a-95c2-9708c304ce77
             */
            export type Id = string; // uuid
            export type OrgId = string;
            export type Source = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 509cdffe-424f-457a-95c2-9708c304ce77
             */
            Parameters.Id /* uuid */;
        }
        export interface QueryParameters {
            source?: Parameters.Source;
            orgId?: Parameters.OrgId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Journey;
        }
    }
    namespace GetJourneyProducts {
        namespace Parameters {
            export type City = string;
            /**
             * example:
             * 509cdffe-424f-457a-95c2-9708c304ce77
             */
            export type Id = string; // uuid
            export type PostalCode = string;
            export type Source = string;
            export type Street = string;
            export type StreetNumber = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 509cdffe-424f-457a-95c2-9708c304ce77
             */
            Parameters.Id /* uuid */;
        }
        export interface QueryParameters {
            source?: Parameters.Source;
            postal_code?: Parameters.PostalCode;
            city?: Parameters.City;
            street?: Parameters.Street;
            street_number?: Parameters.StreetNumber;
        }
        namespace Responses {
            export type $200 = Components.Schemas.JourneyProductsResponse;
        }
    }
    namespace GetJourneyV2 {
        namespace Parameters {
            /**
             * example:
             * 509cdffe-424f-457a-95c2-9708c304ce77
             */
            export type Id = string; // uuid
        }
        export interface PathParameters {
            id: /**
             * example:
             * 509cdffe-424f-457a-95c2-9708c304ce77
             */
            Parameters.Id /* uuid */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.JourneyCreationRequestV2;
        }
    }
    namespace GetJourneysByOrgId {
        namespace Parameters {
            /**
             * example:
             * true
             */
            export type Hydrate = string;
            /**
             * example:
             * 123
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 123
             */
            Parameters.Id;
        }
        export interface QueryParameters {
            hydrate?: /**
             * example:
             * true
             */
            Parameters.Hydrate;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetJourneysResponse;
        }
    }
    namespace GetSettingsForJourney {
        namespace Parameters {
            /**
             * example:
             * 509cdffe-424f-457a-95c2-9708c304ce77
             */
            export type Id = string; // uuid
        }
        export interface PathParameters {
            id: /**
             * example:
             * 509cdffe-424f-457a-95c2-9708c304ce77
             */
            Parameters.Id /* uuid */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetSettingsForJourney;
            export interface $404 {
                /**
                 * example:
                 * journey not found
                 */
                message?: string;
            }
            export interface $500 {
                /**
                 * example:
                 * Unknown API Error
                 */
                message?: string;
            }
        }
    }
    namespace PatchUpdateJourney {
        export type RequestBody = /**
         * Patch request to update a journey (journey id is required) Support for nested properties (e.g. steps[0].uischema.elements[0].products) is supported.
         *
         */
        Components.Schemas.PatchUpdateJourneyRequest;
        namespace Responses {
            export type $200 = Components.Schemas.JourneyResponse;
        }
    }
    namespace PatchUpdateJourneyV2 {
        export type RequestBody = /**
         * Patch request to update a journey (journey id is required) Support for nested properties (e.g. steps[0].uischema.elements[0].products) is supported.
         *
         */
        Components.Schemas.PatchUpdateJourneyRequest;
        namespace Responses {
            export type $200 = Components.Schemas.JourneyCreationRequestV2;
        }
    }
    namespace RemoveJourney {
        namespace Parameters {
            /**
             * example:
             * 509cdffe-424f-457a-95c2-9708c304ce77
             */
            export type Id = string; // uuid
        }
        export interface PathParameters {
            id: /**
             * example:
             * 509cdffe-424f-457a-95c2-9708c304ce77
             */
            Parameters.Id /* uuid */;
        }
    }
    namespace RemoveJourneyV2 {
        namespace Parameters {
            /**
             * example:
             * 509cdffe-424f-457a-95c2-9708c304ce77
             */
            export type Id = string; // uuid
        }
        export interface PathParameters {
            id: /**
             * example:
             * 509cdffe-424f-457a-95c2-9708c304ce77
             */
            Parameters.Id /* uuid */;
        }
    }
    namespace SearchJourneys {
        export type RequestBody = Components.Schemas.SearchJourneysQueryRequest;
        namespace Responses {
            export type $200 = Components.Schemas.SearchJourneysResponse;
        }
    }
    namespace UpdateJourney {
        export type RequestBody = Components.Schemas.JourneyCreationRequest;
        namespace Responses {
            export interface $204 {
            }
            export interface $409 {
            }
        }
    }
    namespace UpdateJourneyV2 {
        export type RequestBody = Components.Schemas.JourneyCreationRequestV2;
        namespace Responses {
            export type $200 = Components.Schemas.JourneyCreationRequestV2;
        }
    }
}


export interface OperationMethods {
  /**
   * getJourneysByOrgId - getJourneysByOrgId
   * 
   * Get all journeys by organization id
   */
  'getJourneysByOrgId'(
    parameters?: Parameters<Paths.GetJourneysByOrgId.QueryParameters & Paths.GetJourneysByOrgId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetJourneysByOrgId.Responses.$200>
  /**
   * getJourney - getJourney
   * 
   * Get journey by id. Private journeys requires valid private token to be passed
   */
  'getJourney'(
    parameters?: Parameters<Paths.GetJourney.QueryParameters & Paths.GetJourney.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetJourney.Responses.$200>
  /**
   * removeJourney - removeJourney
   * 
   * Remove journey by id
   */
  'removeJourney'(
    parameters?: Parameters<Paths.RemoveJourney.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * getJourneyProducts - getJourneyProducts
   * 
   * Get products available in the journey by id. requires public journey token to be passed.
   */
  'getJourneyProducts'(
    parameters?: Parameters<Paths.GetJourneyProducts.QueryParameters & Paths.GetJourneyProducts.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetJourneyProducts.Responses.$200>
  /**
   * updateJourney - updateJourney
   * 
   * Update a Journey
   */
  'updateJourney'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateJourney.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateJourney.Responses.$204>
  /**
   * createJourney - createJourney
   * 
   * Create a Journey
   */
  'createJourney'(
    parameters?: Parameters<Paths.CreateJourney.QueryParameters> | null,
    data?: Paths.CreateJourney.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateJourney.Responses.$201>
  /**
   * patchUpdateJourney - patchUpdateJourney
   * 
   * Update a Journey (partially / patch). Support for nested properties updates (e.g. "property[0].name").
   */
  'patchUpdateJourney'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PatchUpdateJourney.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchUpdateJourney.Responses.$200>
  /**
   * searchJourneys - searchJourneys
   * 
   * Search Journeys
   */
  'searchJourneys'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchJourneys.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchJourneys.Responses.$200>
  /**
   * generateDocument - generateDocument
   * 
   * Builds document generated from a template with journey values."
   * 
   * Supported input document types:
   * - .docx
   * 
   * Supported output document types:
   * - .pdf
   * - .docx but limited to only text based variables
   * 
   * Uses [Document API](https://gitlab.com/e-pilot/product/file-management/document-api) to generate the document.
   * Uses [Template Variables API](https://docs.epilot.io/api/template-variables) to replace variables in the document.
   * 
   */
  'generateDocument'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GenerateDocument.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GenerateDocument.Responses.$200>
  /**
   * updateJourneyV2 - updateJourneyV2
   * 
   * Update a Journey
   */
  'updateJourneyV2'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateJourneyV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateJourneyV2.Responses.$200>
  /**
   * createJourneyV2 - createJourneyV2
   * 
   * Create a Journey
   */
  'createJourneyV2'(
    parameters?: Parameters<Paths.CreateJourneyV2.QueryParameters> | null,
    data?: Paths.CreateJourneyV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateJourneyV2.Responses.$201>
  /**
   * patchUpdateJourneyV2 - patchUpdateJourneyV2
   * 
   * Update a Journey (partially / patch). Support for nested properties updates (e.g. "property[0].name").
   */
  'patchUpdateJourneyV2'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PatchUpdateJourneyV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchUpdateJourneyV2.Responses.$200>
  /**
   * getJourneyV2 - getJourneyV2
   * 
   * Get journey by id
   */
  'getJourneyV2'(
    parameters?: Parameters<Paths.GetJourneyV2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetJourneyV2.Responses.$200>
  /**
   * removeJourneyV2 - removeJourneyV2
   * 
   * Remove journey by id
   */
  'removeJourneyV2'(
    parameters?: Parameters<Paths.RemoveJourneyV2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * getSettingsForJourney - getSettingsForJourney
   * 
   * Get settings related to the journey using journey ID.
   */
  'getSettingsForJourney'(
    parameters?: Parameters<Paths.GetSettingsForJourney.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSettingsForJourney.Responses.$200>
  /**
   * getButtonOptions - getButtonOptions
   * 
   * Get button options from a csv file.
   */
  'getButtonOptions'(
    parameters?: Parameters<Paths.GetButtonOptions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetButtonOptions.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/journey/organization/{id}']: {
    /**
     * getJourneysByOrgId - getJourneysByOrgId
     * 
     * Get all journeys by organization id
     */
    'get'(
      parameters?: Parameters<Paths.GetJourneysByOrgId.QueryParameters & Paths.GetJourneysByOrgId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetJourneysByOrgId.Responses.$200>
  }
  ['/v1/journey/configuration/{id}']: {
    /**
     * getJourney - getJourney
     * 
     * Get journey by id. Private journeys requires valid private token to be passed
     */
    'get'(
      parameters?: Parameters<Paths.GetJourney.QueryParameters & Paths.GetJourney.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetJourney.Responses.$200>
    /**
     * removeJourney - removeJourney
     * 
     * Remove journey by id
     */
    'delete'(
      parameters?: Parameters<Paths.RemoveJourney.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/v1/journey/products/{id}']: {
    /**
     * getJourneyProducts - getJourneyProducts
     * 
     * Get products available in the journey by id. requires public journey token to be passed.
     */
    'get'(
      parameters?: Parameters<Paths.GetJourneyProducts.QueryParameters & Paths.GetJourneyProducts.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetJourneyProducts.Responses.$200>
  }
  ['/v1/journey/configuration']: {
    /**
     * createJourney - createJourney
     * 
     * Create a Journey
     */
    'post'(
      parameters?: Parameters<Paths.CreateJourney.QueryParameters> | null,
      data?: Paths.CreateJourney.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateJourney.Responses.$201>
    /**
     * updateJourney - updateJourney
     * 
     * Update a Journey
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateJourney.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateJourney.Responses.$204>
    /**
     * patchUpdateJourney - patchUpdateJourney
     * 
     * Update a Journey (partially / patch). Support for nested properties updates (e.g. "property[0].name").
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PatchUpdateJourney.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchUpdateJourney.Responses.$200>
  }
  ['/v1/journey/configuration/search']: {
    /**
     * searchJourneys - searchJourneys
     * 
     * Search Journeys
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchJourneys.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchJourneys.Responses.$200>
  }
  ['/v1/journey/document:generate']: {
    /**
     * generateDocument - generateDocument
     * 
     * Builds document generated from a template with journey values."
     * 
     * Supported input document types:
     * - .docx
     * 
     * Supported output document types:
     * - .pdf
     * - .docx but limited to only text based variables
     * 
     * Uses [Document API](https://gitlab.com/e-pilot/product/file-management/document-api) to generate the document.
     * Uses [Template Variables API](https://docs.epilot.io/api/template-variables) to replace variables in the document.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GenerateDocument.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GenerateDocument.Responses.$200>
  }
  ['/v2/journey/configuration']: {
    /**
     * createJourneyV2 - createJourneyV2
     * 
     * Create a Journey
     */
    'post'(
      parameters?: Parameters<Paths.CreateJourneyV2.QueryParameters> | null,
      data?: Paths.CreateJourneyV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateJourneyV2.Responses.$201>
    /**
     * updateJourneyV2 - updateJourneyV2
     * 
     * Update a Journey
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateJourneyV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateJourneyV2.Responses.$200>
    /**
     * patchUpdateJourneyV2 - patchUpdateJourneyV2
     * 
     * Update a Journey (partially / patch). Support for nested properties updates (e.g. "property[0].name").
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PatchUpdateJourneyV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchUpdateJourneyV2.Responses.$200>
  }
  ['/v2/journey/configuration/{id}']: {
    /**
     * getJourneyV2 - getJourneyV2
     * 
     * Get journey by id
     */
    'get'(
      parameters?: Parameters<Paths.GetJourneyV2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetJourneyV2.Responses.$200>
    /**
     * removeJourneyV2 - removeJourneyV2
     * 
     * Remove journey by id
     */
    'delete'(
      parameters?: Parameters<Paths.RemoveJourneyV2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/v1/journey/{id}/settings']: {
    /**
     * getSettingsForJourney - getSettingsForJourney
     * 
     * Get settings related to the journey using journey ID.
     */
    'get'(
      parameters?: Parameters<Paths.GetSettingsForJourney.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSettingsForJourney.Responses.$200>
  }
  ['/v1/journey/button-options']: {
    /**
     * getButtonOptions - getButtonOptions
     * 
     * Get button options from a csv file.
     */
    'get'(
      parameters?: Parameters<Paths.GetButtonOptions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetButtonOptions.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ButtonOption = Components.Schemas.ButtonOption;
export type FieldName = Components.Schemas.FieldName;
export type GenerateDocumentRequest = Components.Schemas.GenerateDocumentRequest;
export type GenerateDocumentResponse = Components.Schemas.GenerateDocumentResponse;
export type GetJourneysResponse = Components.Schemas.GetJourneysResponse;
export type GetSettingsForJourney = Components.Schemas.GetSettingsForJourney;
export type Journey = Components.Schemas.Journey;
export type JourneyAuditInfo = Components.Schemas.JourneyAuditInfo;
export type JourneyCreationRequest = Components.Schemas.JourneyCreationRequest;
export type JourneyCreationRequestV2 = Components.Schemas.JourneyCreationRequestV2;
export type JourneyFeatureFlags = Components.Schemas.JourneyFeatureFlags;
export type JourneyProductsResponse = Components.Schemas.JourneyProductsResponse;
export type JourneyResponse = Components.Schemas.JourneyResponse;
export type PatchUpdateJourneyRequest = Components.Schemas.PatchUpdateJourneyRequest;
export type RuleId = Components.Schemas.RuleId;
export type RuleRef = Components.Schemas.RuleRef;
export type S3Reference = Components.Schemas.S3Reference;
export type SearchJourneysQueryRequest = Components.Schemas.SearchJourneysQueryRequest;
export type SearchJourneysResponse = Components.Schemas.SearchJourneysResponse;
export type TemplateSettings = Components.Schemas.TemplateSettings;
export type ValidationRuleRef = Components.Schemas.ValidationRuleRef;
