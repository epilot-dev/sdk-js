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
         * Response returned immediately when a deduplication job is submitted
         */
        export interface DeduplicateAsyncResponse {
            /**
             * Job ID to poll for status via GET /v1/deduplicate/jobs/{jobId}
             */
            jobId: string;
            status: JobStatus;
            /**
             * Initial status message
             */
            message: string;
        }
        export type DeduplicateRequestBody = [
            {
                /**
                 * Entity id to keep and merge the duplicates into
                 */
                toKeep: string;
                /**
                 * Non-empty list of duplicate entity ids to merge into toKeep and delete
                 */
                toDelete: [
                    string,
                    ...string[]
                ];
            },
            ...{
                /**
                 * Entity id to keep and merge the duplicates into
                 */
                toKeep: string;
                /**
                 * Non-empty list of duplicate entity ids to merge into toKeep and delete
                 */
                toDelete: [
                    string,
                    ...string[]
                ];
            }[]
        ];
        export interface DeduplicateRequestResponse {
            /**
             * The merged survivor entity of each processed set
             */
            deduplicatedEntities: /* Base Entity schema */ Entity[];
        }
        /**
         * Represents an async deduplication job
         */
        export interface DeduplicationJob {
            /**
             * Unique identifier for the deduplication job
             */
            jobId: string;
            status: JobStatus;
            /**
             * Human-readable status message (e.g. progress info or error details)
             */
            message?: string;
            /**
             * Array of deduplicated entities, present when status is completed
             */
            result?: /* Base Entity schema */ Entity[];
            /**
             * ISO 8601 timestamp of job creation
             */
            createdAt: string; // date-time
            /**
             * ISO 8601 timestamp of last update
             */
            updatedAt: string; // date-time
        }
        export interface DetectDuplicatesRequestBody {
            /**
             * Entity schema to search (e.g. 'contact'). Must have UniquenessCriteria configured for the calling org, unless the entity carries an explicit '_id' that resolves.
             */
            schema: string;
            /**
             * The entity to look up potential duplicates for. An explicit '_id' is a direct reference: if that entity exists in the schema, it is returned as the single match (confidence 1) before any rule runs — no UniquenessCriteria required. Otherwise attribute values are extracted from this entity per the schema's match rules; a rule is evaluated only when every one of its attributes resolves to a non-empty value.
             */
            entity: {
                [name: string]: any;
            };
        }
        export interface DetectDuplicatesResponse {
            matches: DetectedDuplicateMatch[];
        }
        export interface DetectedDuplicateMatch {
            entity: /* Base Entity schema */ Entity;
            /**
             * Confidence score for the match, between 0 and 1.
             */
            confidence: number;
            /**
             * Names of the attributes that matched on the rule that produced this hit.
             */
            matched_attributes: [
                string,
                ...string[]
            ];
            /**
             * Attributes matched in fuzzy mode whose value is not the same as the source's: they would not have matched exactly. Absent when every attribute matched exactly.
             */
            fuzzy_attributes?: string[];
        }
        export interface DismissDuplicatesRequestBody {
            schema: string;
            /**
             * Records a human confirmed as distinct. Every pair among them is remembered as dismissed, so no later flagging pass raises it again, and the entries they hold about each other are removed from their duplicate flags.
             */
            entityIds: [
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
                string?
            ];
        }
        export interface DismissDuplicatesResponse {
            /**
             * Entity ids whose pairs were recorded as dismissed
             */
            dismissed: string[];
        }
        /**
         * Base Entity schema
         */
        export interface Entity {
            /**
             * Entity ID of the Deduplication entry
             */
            _id: string;
            /**
             * ID of the Organization that owns this Deduplication
             */
            _org?: string;
            /**
             * The Entity schema of this Deduplication
             */
            _schema?: string;
            /**
             * The timestamp of when this Deduplication was created
             */
            _created_at?: string; // date-time
            /**
             * The timestamp of when this Deduplication was last updated
             */
            _updated_at?: string; // date-time
            /**
             * The Entity ID of the User that created this Deduplication
             */
            _created_by?: /* The Entity ID of the User that created this Deduplication */ string | number;
            /**
             * The Entity ID of the User that created this Deduplication
             */
            created_by?: /* The Entity ID of the User that created this Deduplication */ string | number;
            /**
             * Tags associated with this Deduplication
             */
            _tags?: string[];
            /**
             * Access Control List for this Deduplication entry
             */
            _acl?: {
                [name: string]: string[];
            };
            _owners?: {
                org_id: string;
                user_id: string;
            }[];
            /**
             * Entity ID of the Deduplication entry
             */
            type?: string;
        }
        export type JobStatus = "pending" | "processing" | "completed" | "failed";
        /**
         * One attribute participating in a match rule.
         */
        export interface MatchAttribute {
            /**
             * Name of the entity attribute to match on. Its query path is resolved from the entity schema at query time.
             */
            attribute: string;
            /**
             * Defaults to 'exact'.
             */
            match?: "exact" | "fuzzy";
        }
        /**
         * How an attribute's values are compared. 'exact': the same value, ignoring case and surrounding whitespace. 'fuzzy': also ignoring doubled spaces and umlaut transcription (Müller / Mueller), and allowing a typo or two, scaled by the value's length. Fuzzy applies to text-like attributes (string, text, select, email, phone, address, payment); any other attribute is compared exactly whatever its mode.
         */
        export type MatchMode = "exact" | "fuzzy";
        /**
         * One way to identify the same entity. Evaluated in order; first rule whose attributes are all available and that returns hits wins.
         */
        export interface MatchRule {
            /**
             * Optional human-readable label for the rule. Purely descriptive; not used during matching.
             */
            name?: string;
            /**
             * Attributes that must all match for this rule to fire. The rule is skipped when the source entity has no value for any of them.
             */
            attributes: [
                /* One attribute participating in a match rule. */ MatchAttribute,
                .../* One attribute participating in a match rule. */ MatchAttribute[]
            ];
            strength?: /* How sure a match on the rule is. 'certain': the attributes identify one record. 'probable': the records are likely the same and a person should decide. */ RuleStrength;
            /**
             * Score form of the strength, used by the detect-duplicates path: 1 is certain, anything lower probable. One of strength and confidence is required; responses carry both.
             */
            confidence?: number;
        }
        export interface ResolutionCandidate {
            entity: /* Base Entity schema */ Entity;
            strength: /* How sure a match on the rule is. 'certain': the attributes identify one record. 'probable': the records are likely the same and a person should decide. */ RuleStrength;
            rule_name?: string;
            /**
             * Names of the attributes that matched on the rule that produced this candidate.
             */
            matched_attributes: [
                string,
                ...string[]
            ];
            /**
             * Attributes matched in fuzzy mode whose value is not the same as the source's: they would not have matched exactly. Absent when every attribute matched exactly.
             */
            fuzzy_attributes?: string[];
        }
        /**
         * 'automated' when no human is present (automations, integrations): certain matches are acted on, probable ones only flagged. 'interactive' when a person is filling in a form: every match is put in front of them.
         */
        export type ResolutionMode = "automated" | "interactive";
        export interface ResolveDuplicatesRequestBody {
            /**
             * Entity schema the payload is about to be written to.
             */
            schema: string;
            /**
             * The payload about to be written. An explicit '_id' that resolves is a direct reference and answers 'update' before any rule runs.
             */
            entity: {
                [name: string]: any;
            };
            mode: /* 'automated' when no human is present (automations, integrations): certain matches are acted on, probable ones only flagged. 'interactive' when a person is filling in a form: every match is put in front of them. */ ResolutionMode;
            /**
             * Rule set to resolve with instead of the schema's global set.
             */
            criteria_id?: string; // uuid
        }
        export type ResolveDuplicatesResponse = {
            /**
             * Exactly one certain match in automated mode: write the payload into this entity.
             */
            action: "update";
            entity: /* Base Entity schema */ Entity;
            rule_name?: string;
            matched_attributes: [
                string,
                ...string[]
            ];
        } | {
            /**
             * Create a new record. Flagging happens afterwards, from the entity event.
             */
            action: "create";
            /**
             * 'ambiguous': a certain rule matched more than one record, which contradicts the rule, so nothing is updated. 'probable_only': only probable matches were found.
             */
            reason: "no_match" | "ambiguous" | "probable_only";
        } | {
            /**
             * Interactive mode with matches: show the candidates and let the person choose.
             */
            action: "ask";
            candidates: [
                ResolutionCandidate,
                ...ResolutionCandidate[]
            ];
        };
        export interface RuleSetConflict {
            message: string;
            /**
             * The references that block the operation, when that is the reason.
             */
            usages: /* A consumer configuration that references a rule set. A referenced rule set cannot be deleted. */ RuleSetUsage[];
        }
        /**
         * A consumer configuration that references a rule set. A referenced rule set cannot be deleted.
         */
        export interface RuleSetUsage {
            /**
             * Kind of configuration that references the rule set, e.g. 'automation_action'.
             */
            consumer: string;
            /**
             * Identifier of that configuration within the consumer.
             */
            ref: string;
            /**
             * Display name of the configuration, for 'where is this used'.
             */
            label?: string;
            registeredAt: string; // date-time
        }
        export interface RuleSetUsageBody {
            /**
             * Display name of the referencing configuration.
             */
            label?: string;
        }
        /**
         * How sure a match on the rule is. 'certain': the attributes identify one record. 'probable': the records are likely the same and a person should decide.
         */
        export type RuleStrength = "certain" | "probable";
        /**
         * A named rule set defining what makes an entity of a schema the same record. An org can have several per schema, at most one of them global.
         */
        export interface UniquenessCriteria {
            /**
             * Unique identifier of the rule set.
             */
            id: string; // uuid
            /**
             * Organization the rule set belongs to.
             */
            orgId: string;
            /**
             * Entity schema the rule set applies to (e.g. 'contact').
             */
            schema: string;
            /**
             * Name of the rule set. When none was given, the attributes of its rules joined with commas.
             */
            name: string;
            /**
             * Whether this is the schema's global rule set: the one flagging on create evaluates and resolution uses when no rule set is named. At most one per schema.
             */
            global: boolean;
            /**
             * Ordered list of match rules. Order is the evaluation priority.
             */
            matchRules: [
                /* One way to identify the same entity. Evaluated in order; first rule whose attributes are all available and that returns hits wins. */ MatchRule,
                .../* One way to identify the same entity. Evaluated in order; first rule whose attributes are all available and that returns hits wins. */ MatchRule[]
            ];
            /**
             * Consumer configurations that reference this rule set.
             */
            usages: /* A consumer configuration that references a rule set. A referenced rule set cannot be deleted. */ RuleSetUsage[];
            /**
             * ISO 8601 timestamp of record creation.
             */
            createdAt: string; // date-time
            /**
             * ISO 8601 timestamp of last update.
             */
            updatedAt: string; // date-time
        }
        export interface UniquenessCriteriaCreateBody {
            /**
             * Entity schema the rule set applies to.
             */
            schema: string;
            /**
             * Optional name. Without one the rule set is named after its rules' attributes.
             */
            name?: string;
            /**
             * Omitted: the set is global when the schema has no global set yet. 'true' when one exists is a conflict; make a set global explicitly instead.
             */
            global?: boolean;
            matchRules: [
                /* One way to identify the same entity. Evaluated in order; first rule whose attributes are all available and that returns hits wins. */ MatchRule,
                .../* One way to identify the same entity. Evaluated in order; first rule whose attributes are all available and that returns hits wins. */ MatchRule[]
            ];
        }
        export interface UniquenessCriteriaListResponse {
            items: /* A named rule set defining what makes an entity of a schema the same record. An org can have several per schema, at most one of them global. */ UniquenessCriteria[];
        }
        export interface UniquenessCriteriaUpdateBody {
            /**
             * New name; omitted keeps the current one.
             */
            name?: string;
            matchRules: [
                /* One way to identify the same entity. Evaluated in order; first rule whose attributes are all available and that returns hits wins. */ MatchRule,
                .../* One way to identify the same entity. Evaluated in order; first rule whose attributes are all available and that returns hits wins. */ MatchRule[]
            ];
        }
    }
}
declare namespace Paths {
    namespace CreateUniquenessCriteria {
        export type RequestBody = Components.Schemas.UniquenessCriteriaCreateBody;
        namespace Responses {
            export type $201 = /* A named rule set defining what makes an entity of a schema the same record. An org can have several per schema, at most one of them global. */ Components.Schemas.UniquenessCriteria;
            export type $409 = Components.Schemas.RuleSetConflict;
        }
    }
    namespace Deduplicate {
        export type RequestBody = Components.Schemas.DeduplicateRequestBody;
        namespace Responses {
            export type $200 = Components.Schemas.DeduplicateRequestResponse;
        }
    }
    namespace DeduplicateAsync {
        export type RequestBody = Components.Schemas.DeduplicateRequestBody;
        namespace Responses {
            export type $202 = /* Response returned immediately when a deduplication job is submitted */ Components.Schemas.DeduplicateAsyncResponse;
        }
    }
    namespace DeleteUniquenessCriteria {
        namespace Parameters {
            export type Schema = string;
        }
        export interface PathParameters {
            schema: Parameters.Schema;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $404 {
            }
            export type $409 = Components.Schemas.RuleSetConflict;
        }
    }
    namespace DeleteUniquenessCriteriaById {
        namespace Parameters {
            export type Id = string;
            export type Schema = string;
        }
        export interface PathParameters {
            schema: Parameters.Schema;
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $404 {
            }
            export type $409 = Components.Schemas.RuleSetConflict;
        }
    }
    namespace DetectDuplicates {
        export type RequestBody = Components.Schemas.DetectDuplicatesRequestBody;
        namespace Responses {
            export type $200 = Components.Schemas.DetectDuplicatesResponse;
        }
    }
    namespace DismissDuplicates {
        export type RequestBody = Components.Schemas.DismissDuplicatesRequestBody;
        namespace Responses {
            export type $200 = Components.Schemas.DismissDuplicatesResponse;
        }
    }
    namespace GetDeduplicationJob {
        namespace Parameters {
            export type JobId = string;
        }
        export interface PathParameters {
            jobId: Parameters.JobId;
        }
        namespace Responses {
            export type $200 = /* Represents an async deduplication job */ Components.Schemas.DeduplicationJob;
            export interface $404 {
            }
        }
    }
    namespace GetUniquenessCriteria {
        namespace Parameters {
            export type Schema = string;
        }
        export interface PathParameters {
            schema: Parameters.Schema;
        }
        namespace Responses {
            export type $200 = /* A named rule set defining what makes an entity of a schema the same record. An org can have several per schema, at most one of them global. */ Components.Schemas.UniquenessCriteria;
            export interface $404 {
            }
        }
    }
    namespace GetUniquenessCriteriaById {
        namespace Parameters {
            export type Id = string;
            export type Schema = string;
        }
        export interface PathParameters {
            schema: Parameters.Schema;
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = /* A named rule set defining what makes an entity of a schema the same record. An org can have several per schema, at most one of them global. */ Components.Schemas.UniquenessCriteria;
            export interface $404 {
            }
        }
    }
    namespace ListUniquenessCriteria {
        namespace Parameters {
            export type Schema = string;
        }
        export interface QueryParameters {
            schema?: Parameters.Schema;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UniquenessCriteriaListResponse;
        }
    }
    namespace RegisterUniquenessCriteriaUsage {
        namespace Parameters {
            export type Consumer = string;
            export type Id = string;
            export type Ref = string;
            export type Schema = string;
        }
        export interface PathParameters {
            schema: Parameters.Schema;
            id: Parameters.Id;
            consumer: Parameters.Consumer;
            ref: Parameters.Ref;
        }
        export type RequestBody = Components.Schemas.RuleSetUsageBody;
        namespace Responses {
            export type $200 = /* A consumer configuration that references a rule set. A referenced rule set cannot be deleted. */ Components.Schemas.RuleSetUsage;
            export interface $404 {
            }
        }
    }
    namespace ResolveDuplicates {
        export type RequestBody = Components.Schemas.ResolveDuplicatesRequestBody;
        namespace Responses {
            export type $200 = Components.Schemas.ResolveDuplicatesResponse;
            export interface $404 {
            }
        }
    }
    namespace SetGlobalUniquenessCriteria {
        namespace Parameters {
            export type Id = string;
            export type Schema = string;
        }
        export interface PathParameters {
            schema: Parameters.Schema;
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = /* A named rule set defining what makes an entity of a schema the same record. An org can have several per schema, at most one of them global. */ Components.Schemas.UniquenessCriteria;
            export interface $404 {
            }
        }
    }
    namespace UnregisterUniquenessCriteriaUsage {
        namespace Parameters {
            export type Consumer = string;
            export type Id = string;
            export type Ref = string;
            export type Schema = string;
        }
        export interface PathParameters {
            schema: Parameters.Schema;
            id: Parameters.Id;
            consumer: Parameters.Consumer;
            ref: Parameters.Ref;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace UpdateUniquenessCriteria {
        namespace Parameters {
            export type Schema = string;
        }
        export interface PathParameters {
            schema: Parameters.Schema;
        }
        export type RequestBody = Components.Schemas.UniquenessCriteriaUpdateBody;
        namespace Responses {
            export type $200 = /* A named rule set defining what makes an entity of a schema the same record. An org can have several per schema, at most one of them global. */ Components.Schemas.UniquenessCriteria;
            export interface $404 {
            }
        }
    }
    namespace UpdateUniquenessCriteriaById {
        namespace Parameters {
            export type Id = string;
            export type Schema = string;
        }
        export interface PathParameters {
            schema: Parameters.Schema;
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UniquenessCriteriaUpdateBody;
        namespace Responses {
            export type $200 = /* A named rule set defining what makes an entity of a schema the same record. An org can have several per schema, at most one of them global. */ Components.Schemas.UniquenessCriteria;
            export interface $404 {
            }
        }
    }
}


export interface OperationMethods {
  /**
   * deduplicate - deduplicate
   * 
   * Deduplicates Entities
   */
  'deduplicate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Deduplicate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Deduplicate.Responses.$200>
  /**
   * deduplicateAsync - deduplicateAsync
   * 
   * Submits an async deduplication job. Returns a job ID immediately. Poll GET /v1/deduplicate/jobs/{jobId} for status.
   */
  'deduplicateAsync'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DeduplicateAsync.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeduplicateAsync.Responses.$202>
  /**
   * getDeduplicationJob - getDeduplicationJob
   * 
   * Returns the current status of an async deduplication job
   */
  'getDeduplicationJob'(
    parameters?: Parameters<Paths.GetDeduplicationJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDeduplicationJob.Responses.$200>
  /**
   * detectDuplicates - detectDuplicates
   * 
   * Detects potential duplicate entities for the given entity using the schema's prioritized uniqueness rules. Returns matches with a confidence score. Used by entity-mapping-api while the self-contained deduplication flag is off; see POST /v1/duplicates/resolve for the action-based answer.
   */
  'detectDuplicates'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DetectDuplicates.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DetectDuplicates.Responses.$200>
  /**
   * resolveDuplicates - resolveDuplicates
   * 
   * Answers 'is this payload an existing record, and which one?' as an action the caller executes: update that entity, create, or ask the user. The action follows from the matching rule's strength and the caller's mode; callers never see scores. Flagging of the written record happens afterwards, from the entity event, and is not the caller's concern.
   */
  'resolveDuplicates'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ResolveDuplicates.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ResolveDuplicates.Responses.$200>
  /**
   * dismissDuplicates - dismissDuplicates
   * 
   * Confirms entities as NOT duplicates. Every pair among them is remembered as dismissed, so no later flagging pass raises it again, and the entries they hold about each other are removed from their duplicate flags. The records themselves are not modified otherwise.
   */
  'dismissDuplicates'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DismissDuplicates.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DismissDuplicates.Responses.$200>
  /**
   * listUniquenessCriteria - listUniquenessCriteria
   * 
   * Lists the rule sets of the requesting organization, optionally one schema's, each with its usages.
   */
  'listUniquenessCriteria'(
    parameters?: Parameters<Paths.ListUniquenessCriteria.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListUniquenessCriteria.Responses.$200>
  /**
   * createUniquenessCriteria - createUniquenessCriteria
   * 
   * Creates a rule set. The first set of a schema becomes its global set unless 'global' is false.
   */
  'createUniquenessCriteria'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateUniquenessCriteria.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateUniquenessCriteria.Responses.$201>
  /**
   * getUniquenessCriteria - getUniquenessCriteria
   * 
   * The schema's global rule set.
   */
  'getUniquenessCriteria'(
    parameters?: Parameters<Paths.GetUniquenessCriteria.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUniquenessCriteria.Responses.$200>
  /**
   * updateUniquenessCriteria - updateUniquenessCriteria
   * 
   * Replaces the rules, and the name when given, of the schema's global rule set.
   */
  'updateUniquenessCriteria'(
    parameters?: Parameters<Paths.UpdateUniquenessCriteria.PathParameters> | null,
    data?: Paths.UpdateUniquenessCriteria.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateUniquenessCriteria.Responses.$200>
  /**
   * deleteUniquenessCriteria - deleteUniquenessCriteria
   * 
   * Deletes the schema's global rule set. Refused while it is referenced or while the schema has other rule sets.
   */
  'deleteUniquenessCriteria'(
    parameters?: Parameters<Paths.DeleteUniquenessCriteria.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteUniquenessCriteria.Responses.$204>
  /**
   * getUniquenessCriteriaById - getUniquenessCriteriaById
   * 
   * One rule set by id.
   */
  'getUniquenessCriteriaById'(
    parameters?: Parameters<Paths.GetUniquenessCriteriaById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUniquenessCriteriaById.Responses.$200>
  /**
   * updateUniquenessCriteriaById - updateUniquenessCriteriaById
   * 
   * Replaces the rules, and the name when given, of a rule set.
   */
  'updateUniquenessCriteriaById'(
    parameters?: Parameters<Paths.UpdateUniquenessCriteriaById.PathParameters> | null,
    data?: Paths.UpdateUniquenessCriteriaById.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateUniquenessCriteriaById.Responses.$200>
  /**
   * deleteUniquenessCriteriaById - deleteUniquenessCriteriaById
   * 
   * Deletes a rule set. Refused with the usages while a consumer references it, and while it is the global set of a schema that has other rule sets.
   */
  'deleteUniquenessCriteriaById'(
    parameters?: Parameters<Paths.DeleteUniquenessCriteriaById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteUniquenessCriteriaById.Responses.$204>
  /**
   * setGlobalUniquenessCriteria - setGlobalUniquenessCriteria
   * 
   * Makes the rule set the schema's global one. The previous global set becomes a custom set.
   */
  'setGlobalUniquenessCriteria'(
    parameters?: Parameters<Paths.SetGlobalUniquenessCriteria.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SetGlobalUniquenessCriteria.Responses.$200>
  /**
   * registerUniquenessCriteriaUsage - registerUniquenessCriteriaUsage
   * 
   * Records that a consumer configuration references the rule set. Idempotent. A referenced rule set cannot be deleted.
   */
  'registerUniquenessCriteriaUsage'(
    parameters?: Parameters<Paths.RegisterUniquenessCriteriaUsage.PathParameters> | null,
    data?: Paths.RegisterUniquenessCriteriaUsage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RegisterUniquenessCriteriaUsage.Responses.$200>
  /**
   * unregisterUniquenessCriteriaUsage - unregisterUniquenessCriteriaUsage
   * 
   * Removes a consumer configuration's reference to the rule set.
   */
  'unregisterUniquenessCriteriaUsage'(
    parameters?: Parameters<Paths.UnregisterUniquenessCriteriaUsage.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UnregisterUniquenessCriteriaUsage.Responses.$204>
}

export interface PathsDictionary {
  ['/v1/deduplicate']: {
    /**
     * deduplicate - deduplicate
     * 
     * Deduplicates Entities
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Deduplicate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Deduplicate.Responses.$200>
  }
  ['/v1/deduplicate/job']: {
    /**
     * deduplicateAsync - deduplicateAsync
     * 
     * Submits an async deduplication job. Returns a job ID immediately. Poll GET /v1/deduplicate/jobs/{jobId} for status.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DeduplicateAsync.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeduplicateAsync.Responses.$202>
  }
  ['/v1/deduplicate/jobs/{jobId}']: {
    /**
     * getDeduplicationJob - getDeduplicationJob
     * 
     * Returns the current status of an async deduplication job
     */
    'get'(
      parameters?: Parameters<Paths.GetDeduplicationJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDeduplicationJob.Responses.$200>
  }
  ['/v1/detect-duplicates']: {
    /**
     * detectDuplicates - detectDuplicates
     * 
     * Detects potential duplicate entities for the given entity using the schema's prioritized uniqueness rules. Returns matches with a confidence score. Used by entity-mapping-api while the self-contained deduplication flag is off; see POST /v1/duplicates/resolve for the action-based answer.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DetectDuplicates.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DetectDuplicates.Responses.$200>
  }
  ['/v1/duplicates/resolve']: {
    /**
     * resolveDuplicates - resolveDuplicates
     * 
     * Answers 'is this payload an existing record, and which one?' as an action the caller executes: update that entity, create, or ask the user. The action follows from the matching rule's strength and the caller's mode; callers never see scores. Flagging of the written record happens afterwards, from the entity event, and is not the caller's concern.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ResolveDuplicates.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ResolveDuplicates.Responses.$200>
  }
  ['/v1/duplicates/dismiss']: {
    /**
     * dismissDuplicates - dismissDuplicates
     * 
     * Confirms entities as NOT duplicates. Every pair among them is remembered as dismissed, so no later flagging pass raises it again, and the entries they hold about each other are removed from their duplicate flags. The records themselves are not modified otherwise.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DismissDuplicates.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DismissDuplicates.Responses.$200>
  }
  ['/v1/uniqueness-criteria']: {
    /**
     * listUniquenessCriteria - listUniquenessCriteria
     * 
     * Lists the rule sets of the requesting organization, optionally one schema's, each with its usages.
     */
    'get'(
      parameters?: Parameters<Paths.ListUniquenessCriteria.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListUniquenessCriteria.Responses.$200>
    /**
     * createUniquenessCriteria - createUniquenessCriteria
     * 
     * Creates a rule set. The first set of a schema becomes its global set unless 'global' is false.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateUniquenessCriteria.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateUniquenessCriteria.Responses.$201>
  }
  ['/v1/uniqueness-criteria/{schema}']: {
    /**
     * getUniquenessCriteria - getUniquenessCriteria
     * 
     * The schema's global rule set.
     */
    'get'(
      parameters?: Parameters<Paths.GetUniquenessCriteria.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUniquenessCriteria.Responses.$200>
    /**
     * updateUniquenessCriteria - updateUniquenessCriteria
     * 
     * Replaces the rules, and the name when given, of the schema's global rule set.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateUniquenessCriteria.PathParameters> | null,
      data?: Paths.UpdateUniquenessCriteria.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateUniquenessCriteria.Responses.$200>
    /**
     * deleteUniquenessCriteria - deleteUniquenessCriteria
     * 
     * Deletes the schema's global rule set. Refused while it is referenced or while the schema has other rule sets.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteUniquenessCriteria.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteUniquenessCriteria.Responses.$204>
  }
  ['/v1/uniqueness-criteria/{schema}/{id}']: {
    /**
     * getUniquenessCriteriaById - getUniquenessCriteriaById
     * 
     * One rule set by id.
     */
    'get'(
      parameters?: Parameters<Paths.GetUniquenessCriteriaById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUniquenessCriteriaById.Responses.$200>
    /**
     * updateUniquenessCriteriaById - updateUniquenessCriteriaById
     * 
     * Replaces the rules, and the name when given, of a rule set.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateUniquenessCriteriaById.PathParameters> | null,
      data?: Paths.UpdateUniquenessCriteriaById.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateUniquenessCriteriaById.Responses.$200>
    /**
     * deleteUniquenessCriteriaById - deleteUniquenessCriteriaById
     * 
     * Deletes a rule set. Refused with the usages while a consumer references it, and while it is the global set of a schema that has other rule sets.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteUniquenessCriteriaById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteUniquenessCriteriaById.Responses.$204>
  }
  ['/v1/uniqueness-criteria/{schema}/{id}/global']: {
    /**
     * setGlobalUniquenessCriteria - setGlobalUniquenessCriteria
     * 
     * Makes the rule set the schema's global one. The previous global set becomes a custom set.
     */
    'post'(
      parameters?: Parameters<Paths.SetGlobalUniquenessCriteria.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SetGlobalUniquenessCriteria.Responses.$200>
  }
  ['/v1/uniqueness-criteria/{schema}/{id}/usages/{consumer}/{ref}']: {
    /**
     * registerUniquenessCriteriaUsage - registerUniquenessCriteriaUsage
     * 
     * Records that a consumer configuration references the rule set. Idempotent. A referenced rule set cannot be deleted.
     */
    'put'(
      parameters?: Parameters<Paths.RegisterUniquenessCriteriaUsage.PathParameters> | null,
      data?: Paths.RegisterUniquenessCriteriaUsage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RegisterUniquenessCriteriaUsage.Responses.$200>
    /**
     * unregisterUniquenessCriteriaUsage - unregisterUniquenessCriteriaUsage
     * 
     * Removes a consumer configuration's reference to the rule set.
     */
    'delete'(
      parameters?: Parameters<Paths.UnregisterUniquenessCriteriaUsage.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UnregisterUniquenessCriteriaUsage.Responses.$204>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type DeduplicateAsyncResponse = Components.Schemas.DeduplicateAsyncResponse;
export type DeduplicateRequestBody = Components.Schemas.DeduplicateRequestBody;
export type DeduplicateRequestResponse = Components.Schemas.DeduplicateRequestResponse;
export type DeduplicationJob = Components.Schemas.DeduplicationJob;
export type DetectDuplicatesRequestBody = Components.Schemas.DetectDuplicatesRequestBody;
export type DetectDuplicatesResponse = Components.Schemas.DetectDuplicatesResponse;
export type DetectedDuplicateMatch = Components.Schemas.DetectedDuplicateMatch;
export type DismissDuplicatesRequestBody = Components.Schemas.DismissDuplicatesRequestBody;
export type DismissDuplicatesResponse = Components.Schemas.DismissDuplicatesResponse;
export type Entity = Components.Schemas.Entity;
export type JobStatus = Components.Schemas.JobStatus;
export type MatchAttribute = Components.Schemas.MatchAttribute;
export type MatchMode = Components.Schemas.MatchMode;
export type MatchRule = Components.Schemas.MatchRule;
export type ResolutionCandidate = Components.Schemas.ResolutionCandidate;
export type ResolutionMode = Components.Schemas.ResolutionMode;
export type ResolveDuplicatesRequestBody = Components.Schemas.ResolveDuplicatesRequestBody;
export type ResolveDuplicatesResponse = Components.Schemas.ResolveDuplicatesResponse;
export type RuleSetConflict = Components.Schemas.RuleSetConflict;
export type RuleSetUsage = Components.Schemas.RuleSetUsage;
export type RuleSetUsageBody = Components.Schemas.RuleSetUsageBody;
export type RuleStrength = Components.Schemas.RuleStrength;
export type UniquenessCriteria = Components.Schemas.UniquenessCriteria;
export type UniquenessCriteriaCreateBody = Components.Schemas.UniquenessCriteriaCreateBody;
export type UniquenessCriteriaListResponse = Components.Schemas.UniquenessCriteriaListResponse;
export type UniquenessCriteriaUpdateBody = Components.Schemas.UniquenessCriteriaUpdateBody;
