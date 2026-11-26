import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Responses {
        export interface MappingCheckForbidden {
            /**
             * example:
             * Forbidden
             */
            message?: string;
        }
        export interface MappingCheckTooLarge {
            message?: string;
        }
        export interface MappingCheckUnauthorized {
            /**
             * example:
             * Unauthorized
             */
            message?: string;
        }
    }
    namespace Schemas {
        export interface AppendValueMapper {
            mode: /**
             * - copy_if_exists - it replaces the target attribute with the source value - append_if_exists - it currently replaces target attribute with array like values. Useful when you have multiple values to be added into one attribute. - set_value - it sets a value to a predefined value. Must be used together with value property.
             *
             */
            MappingAttributeMode;
            /**
             * JSON like target path for the attribute. Eg. last_name
             */
            target: string;
            /**
             * JSON source path for the value to be extracted from the main entity. Eg: steps[1].['Product Info'].price
             *
             */
            source?: string;
            /**
             * To be provided only when mapping json objects into a target attribute. Eg array of addresses.
             *
             */
            value_json: string;
            /**
             * Array of keys which should be used when checking for uniqueness. Eg: [country, city, postal_code]
             *
             */
            target_unique?: string[];
        }
        /**
         * Origin of an attribute.
         */
        export type AttributeOrigin = "system_recommendation" | "user_manually" | "entity_updating_system_recommendation";
        export interface ConditionNode {
            source?: string;
            value?: string | number | {
                [key: string]: any;
            } | {
                [key: string]: any;
            }[];
        }
        export interface CopyValueMapper {
            mode: /**
             * - copy_if_exists - it replaces the target attribute with the source value - append_if_exists - it currently replaces target attribute with array like values. Useful when you have multiple values to be added into one attribute. - set_value - it sets a value to a predefined value. Must be used together with value property.
             *
             */
            MappingAttributeMode;
            /**
             * JSON like target path for the attribute. Eg. last_name
             */
            target: string;
            /**
             * JSON source path for the value to be extracted from the main entity. Eg: steps[1].['Product Info'].price
             *
             */
            source: string;
        }
        export interface Entity {
            [name: string]: any;
            _id: string;
            _schema: string;
            _title?: string | null;
            _org: string;
            _tags?: string[] | null;
            _created_at: string | null;
            _updated_at: string | null;
        }
        export interface EntityRef {
            /**
             * id of the source entity to be mapped
             */
            entity_id: string;
            /**
             * schema of the source entity
             * example:
             * submission
             */
            entity_schema?: string;
        }
        /**
         * Pass either source or source_entity
         */
        export interface ExecuteMappingReq {
            /**
             * A reference (id and schema) to the entity to be used as source.
             */
            source_ref: {
                /**
                 * id of the source entity to be mapped
                 */
                entity_id: string;
                /**
                 * schema of the source entity
                 * example:
                 * submission
                 */
                entity_schema?: string;
            };
            /**
             * Reference to the current iteration's entity when running inside a flow loop.
             * When set, its fields and relations are merged into the source context;
             * on schema conflicts the loop entity wins, so paths like `<schema>._id` resolve
             * to the iteration entity rather than to a same-schema relation of the source.
             *
             */
            loop_ref?: {
                /**
                 * id of the source entity to be mapped
                 */
                entity_id: string;
                /**
                 * schema of the source entity
                 * example:
                 * submission
                 */
                entity_schema?: string;
            };
            /**
             * Mapping Configuration to apply.
             */
            targets: TargetConfig[];
            /**
             * The entities earlier steps of the same run produced, keyed by the id of the automation action
             * (later: Flow task) that produced them, in execution order. The executor passes what it recorded
             * as each action's `outputs`. A key with an empty list says the action is known to the run but
             * produced nothing (skipped, failed, or no entity); a mapping that reads it is an ordinary empty
             * copy. A referenced id with no key at all is reported as an `unresolved_output_reference`
             * warning, so send every preceding action's id, including the ones that ran nothing.
             *
             * Mapping attributes read them as `$outputOf['<id>']` (the last entity of that id, so a loop
             * action yields its latest iteration) and `$outputsOf['<id>']` (every entity of that id);
             * relation attributes select them with `source_filter.output_of`. An entity is taken from the
             * source entity's hydrated relations when the producing action linked it back, otherwise it is
             * fetched by id when a target references the id. Without an entry for an id, the engine falls
             * back to the relations tagged `_hidden_<id>` (the convention existing configs use).
             *
             * example:
             * {
             *   "9ec3711b-db63-449c-b894-54d5bb622a8f": [
             *     {
             *       "entity_id": "4c7a6d2e-1f3b-4b8e-9c21-0d5e6f7a8b9c",
             *       "entity_schema": "contact"
             *     }
             *   ]
             * }
             */
            outputs?: {
                [name: string]: /* One entity an earlier action or task produced */ OutputEntityRef[];
            };
            /**
             * One id per entry in `targets`, in the same order: the id that target's result is published under,
             * the same key as in `outputs` (the automation action or Flow task that runs the target). Read in preview mode
             * only: each target's would-be entity becomes the output of its id for the targets after it
             * (`$outputOf['<id>']`, `source_filter.output_of`), so a chain of actions is previewed as it would
             * run, instead of reading what an earlier run stored. The response then lists the entities per target
             * in `preview_targets`.
             *
             */
            output_ids?: string[];
        }
        export interface ExecuteMappingResp {
            mapped_entities: Entity[];
            failures?: MappingFailure[];
            warnings?: MappingWarning[];
            /**
             * In preview mode with `output_ids`, the entities and failure of each target, in order
             */
            preview_targets?: /* What one target would write, in preview mode with `output_ids` */ PreviewTarget[];
        }
        /**
         * Build relations between a source entity and one or more target entities, dynamically identified
         */
        export interface ExecuteRelationsReq {
            /**
             * Entity for which to add relations.
             */
            source_ref: {
                /**
                 * id of the source entity to be mapped
                 */
                entity_id: string;
                /**
                 * schema of the source entity
                 * example:
                 * submission
                 */
                entity_schema?: string;
            };
            target?: {
                /**
                 * Main Entity from where to locate target entities. Eg. submisssion entity
                 */
                main_entity_ref: {
                    /**
                     * id of the source entity to be mapped
                     */
                    entity_id: string;
                    /**
                     * schema of the source entity
                     * example:
                     * submission
                     */
                    entity_schema?: string;
                };
                /**
                 * Relation mappings
                 */
                relation_attributes: RelationAttribute[];
                /**
                 * For cases where you want to store a relation between main entity (eg. submission) and current source entity.
                 */
                linkback?: {
                    /**
                     * Relation attribute on the main entity (submission) where the target entity will be linked. Set to false to disable linkback
                     *
                     */
                    attribute: string;
                    /**
                     * Relation tags (labels) to include in main entity linkback relation attribute
                     */
                    relation_tags: string[];
                };
            };
            additional_relations?: RelationItem[];
            /**
             * The entities earlier actions (later: Flow tasks) of the same run produced, keyed by the
             * producing action's id, as on `ExecuteMappingReq.outputs`. `relation_attributes` select them with
             * `source_filter.output_of`. An output that the main entity's relations also contain is used in
             * its hydrated form; otherwise its `{ _id, _schema }` reference is enough for the relation write.
             *
             */
            outputs?: {
                [name: string]: /* One entity an earlier action or task produced */ OutputEntityRef[];
            };
        }
        export interface ExecuteRelationsResp {
            relations?: NewRelationItem[];
        }
        export interface FlowMappingIssue {
            /**
             * example:
             * ambiguous-producer
             */
            code: string;
            severity: "error" | "warning";
            /**
             * JSON pointer into the config, e.g. `/mapping_attributes/3`; empty for the whole action
             */
            path: string;
            /**
             * Translation key
             */
            key: string;
            message: string;
            params?: {
                [name: string]: string;
            };
            action_id: string;
        }
        /**
         * One multi-hop graph lookup against entity-api's `POST /v1/entity:graph`, resolved during
         * graph_context enrichment (before mapping_attributes are evaluated). Every node in `graph.nodes`
         * is merged into sourceContext under its own `id`, so listing several nodes here costs one
         * entity-api call, not one per node.
         *
         * If a node's `cardinality` is "one" (or it is the seed node), exactly one entity must be found
         * for it: zero or multiple matches fail the mapping execution instead of silently mapping
         * missing/wrong data. If "many" (the default), it resolves to an array - possibly empty - with no
         * such failure. Each node's cardinality is validated independently.
         *
         * `seed.entity_id` and any `graph.nodes[].filter[].value` may contain `{{handlebars}}` placeholders
         * (e.g. `{{contract._id}}`, `{{contract.origin_order}}`), resolved against the in-progress
         * sourceContext (the source entity, its 1-hop relations, and any custom variables already
         * resolved) before the graph query is sent.
         *
         */
        export interface GraphContextEntry {
            seed: /* Mirrors entity-api's GraphSeed (see entity-api openapi.yml) - the entity the graph traversal starts from. */ GraphSeed;
            graph: /* Mirrors entity-api's GraphDefinition (see entity-api openapi.yml) - the shape of the graph to traverse. */ GraphDefinition;
        }
        /**
         * Mirrors entity-api's GraphDefinition (see entity-api openapi.yml) - the shape of the graph to traverse.
         */
        export interface GraphDefinition {
            nodes: /* Mirrors entity-api's GraphNode (see entity-api openapi.yml). */ GraphNode[];
            edges: /* Mirrors entity-api's GraphEdge (see entity-api openapi.yml). */ GraphEdge[];
        }
        /**
         * Mirrors entity-api's GraphEdge (see entity-api openapi.yml).
         */
        export interface GraphEdge {
            /**
             * Source node ID.
             * example:
             * contact
             */
            from: string;
            /**
             * Target node ID.
             * example:
             * order
             */
            to: string;
        }
        /**
         * Mirrors entity-api's GraphNode (see entity-api openapi.yml).
         */
        export interface GraphNode {
            /**
             * Unique identifier for this node in the graph definition.
             * example:
             * contact
             */
            id: string;
            /**
             * Entity schema slug for this node.
             * example:
             * contact
             */
            schema: string;
            /**
             * "one": this node resolves to a single entity. "many" (default if unset): this node
             * resolves to an array of entities.
             *
             */
            cardinality?: "one" | "many";
            /**
             * Optional entity fields to include in the hydrated response for this node.
             */
            fields?: string[];
            /**
             * Narrows this node's traversal results to entities matching every filter (AND semantics).
             * Useful for disambiguating among multiple entities reachable via the same graph edge.
             *
             */
            filter?: /* Mirrors entity-api's GraphNodeFilter (see entity-api openapi.yml). */ GraphNodeFilter[];
            /**
             * Only meaningful for a node expected to resolve to a single entity (the seed node, or
             * "cardinality: one"). When true, finding zero matching entities is not an error - the
             * mapping proceeds without this node's data instead of failing. Finding more than one
             * match still fails regardless of this flag; ambiguity is never silently accepted.
             * On the seed node it also covers an empty seed: when `seed.entity_id` resolves to an
             * empty value (e.g. an optional source field is missing), the whole graph_context entry
             * is skipped and none of its nodes are added to the mapping context.
             *
             */
            optional?: boolean;
        }
        /**
         * Mirrors entity-api's GraphNodeFilter (see entity-api openapi.yml).
         */
        export interface GraphNodeFilter {
            /**
             * Entity attribute name to match against.
             * example:
             * order_number
             */
            attribute: string;
            /**
             * How `value` is compared to the attribute. `eq` (default) keeps entities whose attribute
             * exactly equals `value`; `neq` keeps entities whose attribute does NOT equal `value`.
             * Forwarded as-is to entity-api (`neq` requires an entity-api version that supports it).
             *
             * example:
             * neq
             */
            operator?: "eq" | "neq";
            /**
             * Literal value the attribute is compared against (see `operator`). Supports `{{handlebars}}`
             * placeholders resolved against sourceContext when given as a string.
             *
             * example:
             * {{contract.origin_order}}
             */
            value: /**
             * Literal value the attribute is compared against (see `operator`). Supports `{{handlebars}}`
             * placeholders resolved against sourceContext when given as a string.
             *
             * example:
             * {{contract.origin_order}}
             */
            (string | null) | number | boolean;
        }
        /**
         * Mirrors entity-api's GraphSeed (see entity-api openapi.yml) - the entity the graph traversal starts from.
         */
        export interface GraphSeed {
            /**
             * The id of the seed entity. Supports `{{handlebars}}` placeholders resolved against sourceContext.
             * example:
             * {{contract._id}}
             */
            entity_id: string;
            /**
             * The node ID in `graph.nodes` that corresponds to the seed entity.
             * example:
             * contact
             */
            node_id: string;
        }
        export interface JourneyContextUsage {
            kind: "entity-mapping";
            resource: {
                type: "mapping";
                id: string;
            };
            location?: {
                target_schema?: string;
                attribute?: string;
            };
            matched_as: {
                dialect: "name";
                token: string;
                at: string;
            };
        }
        export interface JourneyContextUsagesReq {
            journey_id: string; // uuid
            /**
             * Context parameter keys to look for, as plain strings.
             */
            param_keys: string[];
            /**
             * Accepted and ignored. This service stores context references by name only; the field keeps one request shape across every adapter.
             *
             */
            param_ids?: string[];
        }
        export interface JourneyContextUsagesResp {
            usages: JourneyContextUsage[];
            /**
             * partial means the row cap was reached and rows were dropped, or that scanning stopped
             * early and entire configs - some of which may reference the parameter - were never
             * scanned.
             *
             */
            status: "ok" | "partial";
            /**
             * The number of configs actually scanned, not the number found. May be less than the
             * total number of matching configs when status is partial.
             *
             */
            scanned: number;
        }
        export interface JourneyRef {
            journey_id?: string;
        }
        /**
         * This string value will be replaced with the value of the loop index, when mapping in loop mode
         */
        export type LoopIndexString = "##LOOP_INDEX##";
        export interface MapCondition {
            _exists?: ConditionNode;
            _equals?: ConditionNode;
            _not_exists?: ConditionNode;
            _any_of?: ConditionNode;
        }
        export interface MappingAnalysis {
            /**
             * False when an issue is an error. Only covers the checks that ran: see `skipped_checks`.
             */
            valid: boolean;
            /**
             * Checks that did not run because the request lacks the description they need; `[]` when every check ran. `blocks`: no `roots.source`, so journey blocks and source paths are not checked (`block-removed`, `path-not-in-root`). `attributes`: no `target_root`, so target attributes are not checked (`attribute-not-on-target`). `types`: no `target_root`, so no value is checked against the attribute it fills (`type-mismatch`, `type-converts`, `value-type-mismatch`, `value-not-an-option`). `source-types`: a `target_root` but no `roots.source`, so values copied from the source are not type-checked; fixed values, texts and copies from actions with a `roots.tasks[].description` still are. A description the server loaded (`source`, `config.target_schema`) counts as sent. A `valid: true` with skipped checks does not vouch for those.
             */
            skipped_checks: ("attributes" | "blocks" | "types" | "source-types")[];
            counts: {
                form?: number;
                json?: number;
                broken?: number;
            };
            issues: MappingIssue[];
            lines: {
                kind?: "identity" | "field" | "relation";
                index?: number;
                target?: string;
                verdict?: "form" | "json" | "broken";
                /**
                 * Why the line has no form, e.g. `op:_each`
                 */
                reason?: string;
                issues?: MappingIssue[];
                suggestions?: {
                    /**
                     * What the rewrite does. `template-syntax`, `nearest-attribute`, `nearest-option` and `operation-key` come with validator 0.4.4. `fallback-producers` (validator 0.6.0): every creator of the schema runs behind a condition, so the line copies from all of them in order. Applying any suggestion adds no error to its line.
                     */
                    why?: "pick-producer" | "fallback-producers" | "explicit-output" | "add-mode" | "merge-keys" | "template-syntax" | "nearest-attribute" | "nearest-option" | "operation-key";
                    task?: string;
                    line?: {
                        [name: string]: any;
                    };
                }[];
                description?: string;
            }[];
        }
        export type MappingAttribute = SetValueMapper | CopyValueMapper | AppendValueMapper;
        /**
         * - copy_if_exists - it replaces the target attribute with the source value - append_if_exists - it currently replaces target attribute with array like values. Useful when you have multiple values to be added into one attribute. - set_value - it sets a value to a predefined value. Must be used together with value property.
         *
         */
        export type MappingAttributeMode = "copy_if_exists" | "append_if_exists" | "set_value";
        /**
         * example:
         * {
         *   "target": "_tags",
         *   "operation": {
         *     "_append": [
         *       "new",
         *       "tags"
         *     ],
         *     "_uniq": true
         *   }
         * }
         */
        export interface MappingAttributeV2 {
            /**
             * Target JSON path for the attribute to set
             */
            target: string;
            operation: /* Mapping operation nodes are either primitive values or operation node objects */ OperationNode;
            origin?: /* Origin of an attribute. */ AttributeOrigin;
        }
        /**
         * Where the action sits in its automation or flow
         */
        export interface MappingCheckContext {
            /**
             * Root of the source entity, `submission` for journeys, the trigger schema otherwise
             */
            sourceSchema: string;
            /**
             * Every action id of the automation in execution order, the ones after the current action included. An action left out is reported as missing (`task-missing`); with validator 0.4.4, an action listed in `taskSchemas` but not here counts as a later one (`task-not-earlier`).
             */
            taskOrder: string[];
            /**
             * The action being analysed; must be one of `taskOrder`. Defaults to the last id in `taskOrder`. References to `current` itself or to an action after it are reported as `task-not-earlier`.
             */
            current?: string;
            taskSchemas: {
                [name: string]: string;
            };
            /**
             * Earlier action ids per schema they create, in execution order
             */
            producersBySchema: {
                [name: string]: string[];
            };
            linkbackTags?: string[];
            linkbackTagsByTask?: {
                [name: string]: string[];
            };
            configIdsByTask?: {
                [name: string]: string;
            };
        }
        export interface MappingConfig {
            id: string;
            source: SourceConfig;
            targets: TargetConfig[];
            created_at?: string; // date-time
            updated_at?: string; // date-time
            /**
             * User / service who created the entity mapping config
             * example:
             * {
             *   "type": "internal_service"
             * }
             */
            created_by?: {
                type: "user" | "internal_service";
                org_id?: string;
                user_id?: string;
            };
            /**
             * User / service who last updated entity mapping config
             * example:
             * {
             *   "type": "user",
             *   "org_id": 255151,
             *   "user_id": 99252
             * }
             */
            last_updated_by?: {
                type: "user" | "internal_service";
                org_id?: string;
                user_id?: string;
            };
            /**
             * example:
             * 66
             */
            org_id: string;
            /**
             * example:
             * 2
             */
            version: number;
        }
        export interface MappingConfigCommonFields {
            id: string;
            source: SourceConfig;
            targets: TargetConfig[];
            created_at?: string; // date-time
            updated_at?: string; // date-time
            /**
             * User / service who created the entity mapping config
             * example:
             * {
             *   "type": "internal_service"
             * }
             */
            created_by?: {
                type: "user" | "internal_service";
                org_id?: string;
                user_id?: string;
            };
            /**
             * User / service who last updated entity mapping config
             * example:
             * {
             *   "type": "user",
             *   "org_id": 255151,
             *   "user_id": 99252
             * }
             */
            last_updated_by?: {
                type: "user" | "internal_service";
                org_id?: string;
                user_id?: string;
            };
        }
        export interface MappingConfigV2 {
            id: string;
            source: SourceConfig;
            targets: TargetConfig[];
            created_at?: string; // date-time
            updated_at?: string; // date-time
            /**
             * User / service who created the entity mapping config
             * example:
             * {
             *   "type": "internal_service"
             * }
             */
            created_by?: {
                type: "user" | "internal_service";
                org_id?: string;
                user_id?: string;
            };
            /**
             * User / service who last updated entity mapping config
             * example:
             * {
             *   "type": "user",
             *   "org_id": 255151,
             *   "user_id": 99252
             * }
             */
            last_updated_by?: {
                type: "user" | "internal_service";
                org_id?: string;
                user_id?: string;
            };
            /**
             * example:
             * 66
             */
            org_id?: string;
            /**
             * example:
             * 2
             */
            version?: number;
        }
        export type MappingConfigs = MappingConfig[];
        export interface MappingConfigsResp {
            configs: MappingConfigs;
            /**
             * the page ceiling was reached; the list is incomplete.
             */
            truncated?: boolean;
        }
        export interface MappingFailure {
            target?: TargetConfig;
            error?: {
                [name: string]: any;
                isSilent?: boolean;
                message?: string;
            };
        }
        /**
         * An action of an automation (as stored in it), in execution order; only mapping actions are analysed
         */
        export interface MappingFlowAction {
            [name: string]: any;
            id: string;
            /**
             * `map-entity` and `cart-checkout` are analysed; other actions only count for what they create
             * example:
             * map-entity
             */
            type?: string;
            /**
             * The stored action config (engine JSON); `target_schema` names the schema it writes
             */
            config?: {
                [name: string]: any;
            } | null;
        }
        export interface MappingIssue {
            /**
             * example:
             * ambiguous-producer
             */
            code: string;
            severity: "error" | "warning";
            /**
             * JSON pointer into the config, e.g. `/mapping_attributes/3`; empty for the whole action
             */
            path: string;
            /**
             * Translation key
             */
            key: string;
            message: string;
            params?: {
                [name: string]: string;
            };
        }
        /**
         * What the caller knows about a root (`RootDescription` of `@epilot/entity-mapping-validator`)
         */
        export interface MappingRootDescription {
            kind: "declared" | "inferred";
            fields: MappingRootField[];
        }
        export interface MappingRootField {
            [name: string]: any;
            path: (string | number)[];
            label?: string;
            type?: "string" | "number" | "boolean" | "date" | "object" | "array" | "entity";
            children?: MappingRootField[];
            /**
             * Only partly described; a path below it that `children` does not list is unknown, not missing
             */
            open?: boolean;
            targetTypes?: string[];
        }
        /**
         * Optional descriptions of the source and of each action's output (`Roots` of `@epilot/entity-mapping-validator`). A body whose `roots` does not have this shape is rejected with 400.
         */
        export interface MappingRoots {
            source?: /* What the caller knows about a root (`RootDescription` of `@epilot/entity-mapping-validator`) */ MappingRootDescription;
            /**
             * Every action in execution order; `[]` when there are none
             */
            tasks: {
                id: string;
                schema?: string;
                /**
                 * Display name of what the action creates, e.g. "Contact"
                 */
                label?: string;
                description?: /* What the caller knows about a root (`RootDescription` of `@epilot/entity-mapping-validator`) */ MappingRootDescription;
            }[];
        }
        export interface MappingSource {
            /**
             * Key aiming to identify source
             */
            key: string;
            /**
             * The journey block's id, the key of its value in `_block_values` of the submission
             */
            block_id?: string;
            /**
             * Each item describes a property under the main source and a possibly, a default value for its target attribute
             */
            sub_properties?: MappingSourceProperty[];
            /**
             * Data Structure type of source
             */
            source_type: string;
            /**
             * A group this source belongs to. Used for grouping sources in the UI
             */
            group?: string;
            /**
             * Data Structure Type of the underlaying output value
             */
            possible_target_types?: MappingSourceTargetType[];
            /**
             * Initial value of a relation to be added
             */
            initial_relation?: {
                /**
                 * Target attribute to store the relation in
                 */
                target: string;
                /**
                 * Relation tags (labels) to set for the stored relations
                 */
                target_tags?: string[];
                /**
                 * Include all relation tags (labels) present on the main entity relation
                 */
                target_tags_include_source?: boolean;
                /**
                 * Tags to add to the matched target entity's _tags array during mapping. Useful for assigning file collections to file entities.
                 */
                target_entity_tags?: string[];
                /**
                 * Whether to override the relation source_filter with the specified one
                 */
                override_with_source_filter?: boolean;
                /**
                 * A filter to identify which source entities to pick as relations from main entity
                 */
                source_filter?: {
                    /**
                     * Limit relations to maximum number (default, all matched relations)
                     */
                    limit?: number;
                    /**
                     * Filter by specific schema
                     */
                    schema?: string;
                    /**
                     * Filter by a specific relation attribute on the main entity
                     */
                    attribute?: string;
                    /**
                     * Filter by relation tag (label) on the main entity
                     */
                    relation_tag?: string;
                    /**
                     * Pick the entities the automation action (later: Flow task) with this id produced in the same run,
                     * as passed in `ExecuteMappingReq.outputs`. Combinable with `schema`, `tag` and `limit`. When the
                     * request carries no entry for the id, the relations tagged `_hidden_<id>` are used instead.
                     *
                     */
                    output_of?: string;
                    /**
                     * Filter by a specific tag on the related entity
                     */
                    tag?: string;
                    /**
                     * Picks main entity as relation (overrides other filters)
                     */
                    self?: boolean;
                };
                related_to?: {
                    [name: string]: any;
                };
                mode: "append" | "prepend" | "set";
                origin?: /* Origin of an attribute. */ AttributeOrigin;
            };
            /**
             * Human readable name of the Source
             */
            title: string;
            /**
             * Human readable type of the source
             */
            sub_title?: string;
            /**
             * Whether the source (block or attribute) is a repeatable, aka holds a list of values
             */
            repeatable?: boolean;
            target_settings?: {
                /**
                 * Describes which actions the user can perform on each target, if specified. If not specified, all actions are allowed
                 */
                allowed_ui_actions?: ("schema-select" | "attribute-select" | "target-delete" | "target-add" | "target")[];
                /**
                 * Whether its a read-only ui or not. Can be each target, or only the first. Overwrites uiActions
                 */
                locked?: "each" | "first" | "system_recommendation";
                /**
                 * Whether all source mappings flow into a single attribute (e.g. address)
                 */
                isSingleTarget?: boolean;
                /**
                 * Determines whether a mapping target should be shown or not. Use if there are targets which cannot be manipulated by the UI. E.g journey_data
                 */
                visibility?: {
                    mode: "hide" | "show" | "message";
                    if: {
                        [name: string]: string;
                    };
                    message?: string;
                };
            };
        }
        export interface MappingSourceProperty {
            value: string;
            label: string;
            initial_target_value?: string;
            /**
             * Data Structure Type of the underlaying output value
             */
            possible_target_types?: MappingSourceTargetType[];
            /**
             * Whether the raw value should be used, or whether the value is enriched by a path
             */
            raw?: boolean;
        }
        /**
         * What the automation's trigger provides, by id. Used when `roots.source` is not sent: the server loads the journey's mapping sources (`rootFromMappingSources`) or the entity schema (`rootFromEntitySchema`) with the caller's authorization. A journey or schema that does not exist is an error issue (`source-journey-not-found`, `source-schema-not-found`); one that could not be loaded is a warning (`source-not-loaded`) and the source checks are skipped (`skipped_checks`). Likewise for a target schema (`target-schema-not-found`, `target-schema-not-loaded`). `automation_step` (the trigger of a workflow's automation task) names no data: a warning (`source-not-fixed`) and the source checks are skipped; pass what the workflow was started with instead.
         */
        export type MappingSourceRef = /* What the automation's trigger provides, by id. Used when `roots.source` is not sent: the server loads the journey's mapping sources (`rootFromMappingSources`) or the entity schema (`rootFromEntitySchema`) with the caller's authorization. A journey or schema that does not exist is an error issue (`source-journey-not-found`, `source-schema-not-found`); one that could not be loaded is a warning (`source-not-loaded`) and the source checks are skipped (`skipped_checks`). Likewise for a target schema (`target-schema-not-found`, `target-schema-not-loaded`). `automation_step` (the trigger of a workflow's automation task) names no data: a warning (`source-not-fixed`) and the source checks are skipped; pass what the workflow was started with instead. */ {
            /**
             * The triggering journey; its source root is `submission`
             */
            journey_id: string;
        } | {
            /**
             * The slug of the triggering entity's schema, e.g. `contact`
             */
            entity_schema: string;
        };
        export type MappingSourceTargetType = "string" | "date" | "datetime" | "boolean" | "number" | "image" | "file" | "address" | "email" | "phone" | "select" | "multiselect" | "payment" | "link" | "currency" | "sequence" | "relation" | "array";
        export interface MappingWarning {
            explanation: string;
            context?: string;
            id?: string;
        }
        export interface NewRelationItem {
            source_entity_id: string;
            target_entity_id: string;
            relation_attr: string;
            tags?: string[];
        }
        /**
         * Mapping operation nodes are either primitive values or operation node objects
         */
        export type OperationNode = /* Mapping operation nodes are either primitive values or operation node objects */ OperationObjectNode | /* Represents any primitive JSON value */ PrimitiveJSONValue;
        export interface OperationObjectNode {
            [name: string]: any;
            _set?: /* Represents any primitive JSON value */ PrimitiveJSONValue;
            /**
             * Append to array
             */
            _append?: any;
            /**
             * Prepend to an array
             */
            _prepend?: any;
            /**
             * Unique array
             */
            _uniq?: /* Unique array */ boolean | string[];
            /**
             * Merge strategy when _uniq is defined
             * example:
             * true
             */
            _retain_old_values?: boolean;
            /**
             * Copy JSONPath value from source entity context
             * example:
             * contact.first_name
             */
            _copy?: string;
            /**
             * Define handlebars template to output a string
             * example:
             * {{contact.first_name}} {{contact.last_name}}
             */
            _template?: string;
            /**
             * Generate random ids / numbers
             */
            _random?: /* Generate random ids / numbers */ {
                type: "uuid" | "nanoid";
            } | {
                type: "number";
                min?: number;
                max?: number;
            };
            /**
             * Iterate over a source array. Use with _as and _map.
             * The value is a path to resolve from the source entity context.
             * Example: "submission.meterReadings"
             *
             * example:
             * submission.meterReadings
             */
            _each?: string;
            /**
             * Name for the current iteration item in _each.
             * Accessed as $<name> in _copy paths within _map.
             * Example: "reading" (accessed as $reading)
             *
             * example:
             * reading
             */
            _as?: string;
            /**
             * Operation to evaluate per _each iteration item.
             * Can be any OperationNode, typically an object with _copy
             * references to the $<_as name> alias.
             *
             */
            _map?: /**
             * Operation to evaluate per _each iteration item.
             * Can be any OperationNode, typically an object with _copy
             * references to the $<_as name> alias.
             *
             */
            OperationObjectNode | /* Represents any primitive JSON value */ PrimitiveJSONValue;
        }
        /**
         * One entity an earlier action or task produced
         */
        export interface OutputEntityRef {
            entity_id: string;
            entity_schema?: string;
        }
        export interface Owner {
            type: "user" | "internal_service";
            org_id?: string;
            user_id?: string;
        }
        /**
         * What one target would write, in preview mode with `output_ids`
         */
        export interface PreviewTarget {
            /**
             * Position of the target in the request
             */
            index: number;
            /**
             * The id from `output_ids` at this position, which the target's entities were published under
             */
            output_id?: string;
            mapped_entities: Entity[];
            failure?: MappingFailure;
        }
        /**
         * Represents any primitive JSON value
         */
        export type PrimitiveJSONValue = /* Represents any primitive JSON value */ string | boolean | number | {
            [name: string]: any;
        } | any[];
        export type RandomOperation = {
            type: "uuid" | "nanoid";
        } | {
            type: "number";
            min?: number;
            max?: number;
        };
        export interface RelationAttribute {
            /**
             * Target attribute to store the relation in
             */
            target: string;
            /**
             * Relation tags (labels) to set for the stored relations
             */
            target_tags?: string[];
            /**
             * Include all relation tags (labels) present on the main entity relation
             */
            target_tags_include_source?: boolean;
            /**
             * Tags to add to the matched target entity's _tags array during mapping. Useful for assigning file collections to file entities.
             */
            target_entity_tags?: string[];
            /**
             * Whether to override the relation source_filter with the specified one
             */
            override_with_source_filter?: boolean;
            /**
             * A filter to identify which source entities to pick as relations from main entity
             */
            source_filter?: {
                /**
                 * Limit relations to maximum number (default, all matched relations)
                 */
                limit?: number;
                /**
                 * Filter by specific schema
                 */
                schema?: string;
                /**
                 * Filter by a specific relation attribute on the main entity
                 */
                attribute?: string;
                /**
                 * Filter by relation tag (label) on the main entity
                 */
                relation_tag?: string;
                /**
                 * Pick the entities the automation action (later: Flow task) with this id produced in the same run,
                 * as passed in `ExecuteMappingReq.outputs`. Combinable with `schema`, `tag` and `limit`. When the
                 * request carries no entry for the id, the relations tagged `_hidden_<id>` are used instead.
                 *
                 */
                output_of?: string;
                /**
                 * Filter by a specific tag on the related entity
                 */
                tag?: string;
                /**
                 * Picks main entity as relation (overrides other filters)
                 */
                self?: boolean;
            };
            related_to?: {
                [name: string]: any;
            };
            mode: "append" | "prepend" | "set";
            origin?: /* Origin of an attribute. */ AttributeOrigin;
        }
        export interface RelationItem {
            entity_id: string;
            attribute: string;
        }
        export interface SearchMappingReq {
            source?: SourceConfig;
        }
        export interface SetValueMapper {
            mode: /**
             * - copy_if_exists - it replaces the target attribute with the source value - append_if_exists - it currently replaces target attribute with array like values. Useful when you have multiple values to be added into one attribute. - set_value - it sets a value to a predefined value. Must be used together with value property.
             *
             */
            MappingAttributeMode;
            /**
             * JSON like target path for the attribute. Eg. last_name
             */
            target: string;
            /**
             * Any value to be set: string, number, string[], number[], JSON object, etc. It will override existing values, if any.
             *
             */
            value: any;
        }
        export interface SourceConfig {
            type?: "journey" | "entity";
            config?: JourneyRef | EntityRef;
        }
        export interface TargetConfig {
            /**
             * Identifier for target configuration. Useful for later usages when trying to identify which target config to map to.
             */
            id?: string;
            /**
             * A name for this configuration
             */
            name?: string;
            /**
             * Pass it as true, when you don't want failures to interrupt the mapping process.
             */
            allow_failure?: boolean;
            /**
             * Schema of target entity
             */
            target_schema: string;
            /**
             * Unique key for target entity (see upsertEntity of Entity API)
             */
            target_unique?: string[];
            /**
             * Execution wire flag set per automation by automation-workers: resolve the target entity via the organization's global uniqueness criteria (deduplication-api) instead of target_unique. Never persisted in stored mapping configs.
             *
             */
            use_uniqueness_criteria?: boolean;
            /**
             * contains config in case of running in loop mode
             */
            loop_config?: {
                /**
                 * path to the array from the entity payload
                 */
                source_path?: string;
                /**
                 * Kind of journey block the loop iterates. 'journey-multi-select' (default) is a cards block with multi selection. 'journey-file-upload' is a file upload block: source_path points at the submission's `_files.$relation` array and `filter_tags` narrows it down to the block's files. Forwarded to the flow-level loop by the Automation Hub.
                 *
                 */
                source_type?: "journey-multi-select" | "journey-file-upload";
                /**
                 * Only iterate items of the array whose `_tags` contain every listed tag. Meant for relation arrays such as `submission._files.$relation`, where the journey tags each file relation with the upload block it came from. `##LOOP_INDEX##` keeps referring to the item's index in the unfiltered array.
                 *
                 * example:
                 * [
                 *   "_hidden_ 2a4b1c3d-0000-4000-8000-000000000000 - Dokumente"
                 * ]
                 */
                filter_tags?: string[];
                /**
                 * a hard limit of how many times the loop is allowed to run.
                 */
                length?: number;
            };
            /**
             * Mode of how conditions are considered valid
             */
            conditionMode?: "oneOf" | "anyOf" | "allOf";
            /**
             * Conditions necessary to hold for the target entity to be mapped
             */
            conditions?: MapCondition[];
            /**
             * Attribute mappings
             */
            mapping_attributes: (/**
             * example:
             * {
             *   "target": "_tags",
             *   "operation": {
             *     "_append": [
             *       "new",
             *       "tags"
             *     ],
             *     "_uniq": true
             *   }
             * }
             */
            MappingAttributeV2 | MappingAttribute)[];
            /**
             * Relation mappings
             */
            relation_attributes?: RelationAttribute[];
            /**
             * Relation attribute on the main entity where the target entity will be linked. Set to false to disable linkback
             *
             */
            linkback_relation_attribute?: string;
            /**
             * Relation tags (labels) to include in main entity linkback relation attribute
             */
            linkback_relation_tags?: string[];
            /**
             * Multi-hop entity graph lookups resolved before any mapping_attribute is evaluated. Each
             * entry queries entity-api's `POST /v1/entity:graph` and merges every node's result into
             * sourceContext under its own `graph.nodes[].id`, so mapping_attributes can `_copy`/`_template`
             * from `<node id>.<field>`. A graph node's value overwrites any existing sourceContext key of
             * the same name (a source entity field, a 1-hop relation, or another graph node).
             *
             */
            graph_context?: /**
             * One multi-hop graph lookup against entity-api's `POST /v1/entity:graph`, resolved during
             * graph_context enrichment (before mapping_attributes are evaluated). Every node in `graph.nodes`
             * is merged into sourceContext under its own `id`, so listing several nodes here costs one
             * entity-api call, not one per node.
             *
             * If a node's `cardinality` is "one" (or it is the seed node), exactly one entity must be found
             * for it: zero or multiple matches fail the mapping execution instead of silently mapping
             * missing/wrong data. If "many" (the default), it resolves to an array - possibly empty - with no
             * such failure. Each node's cardinality is validated independently.
             *
             * `seed.entity_id` and any `graph.nodes[].filter[].value` may contain `{{handlebars}}` placeholders
             * (e.g. `{{contract._id}}`, `{{contract.origin_order}}`), resolved against the in-progress
             * sourceContext (the source entity, its 1-hop relations, and any custom variables already
             * resolved) before the graph query is sent.
             *
             */
            GraphContextEntry[];
        }
        export interface ValidateMappingFlowReq {
            /**
             * Every action of the automation in execution order; ids are unique
             */
            actions: /* An action of an automation (as stored in it), in execution order; only mapping actions are analysed */ MappingFlowAction[];
            source?: /* What the automation's trigger provides, by id. Used when `roots.source` is not sent: the server loads the journey's mapping sources (`rootFromMappingSources`) or the entity schema (`rootFromEntitySchema`) with the caller's authorization. A journey or schema that does not exist is an error issue (`source-journey-not-found`, `source-schema-not-found`); one that could not be loaded is a warning (`source-not-loaded`) and the source checks are skipped (`skipped_checks`). Likewise for a target schema (`target-schema-not-found`, `target-schema-not-loaded`). `automation_step` (the trigger of a workflow's automation task) names no data: a warning (`source-not-fixed`) and the source checks are skipped; pass what the workflow was started with instead. */ MappingSourceRef;
            /**
             * The automation's actions as stored. With them, only issues this change introduced block (`blocking`), matched by action id, target attribute and code.
             */
            previous_actions?: /* An action of an automation (as stored in it), in execution order; only mapping actions are analysed */ MappingFlowAction[];
            /**
             * Blocking findings the user decided to keep, after the agent explained them: they stop blocking and are listed in `acknowledged` of the response instead. Send only what the user explicitly accepted. Each matches by action id and code, and by the line's target attribute when `target` is set (without it, every finding of that code in the action).
             */
            acknowledged?: [
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?,
                {
                    action_id: string;
                    /**
                     * example:
                     * attribute-not-on-target
                     */
                    code: string;
                    /**
                     * The target attribute of the line the finding is about
                     */
                    target?: string;
                }?
            ];
        }
        export interface ValidateMappingFlowResp {
            /**
             * True when nothing blocks a save (`blocking` is empty)
             */
            valid: boolean;
            /**
             * What a save gate rejects: per action the errors, the issues on lines whose verdict is `broken` and `value-not-an-option`; with `previous_actions`, only those this change introduced
             */
            blocking: FlowMappingIssue[];
            /**
             * Findings on lines the Journey Builder generated for a journey's default mapping (`origin` `system_recommendation` or `entity_updating_system_recommendation`). The builder regenerates those lines, so these findings are reported but never block.
             */
            generated?: FlowMappingIssue[];
            /**
             * Actions that only point at a target of a mapping config (`config.mapping_config`) are checked as that target. `unresolved` lists the actions whose config or target could not be found in the organization; they are left out of the check.
             */
            references?: {
                resolved?: string[];
                unresolved?: string[];
            };
            /**
             * Only with `acknowledged` in the request; the blocking findings it matched, which did not block
             */
            acknowledged?: FlowMappingIssue[];
            /**
             * Only with `previous_actions`; every issue (errors and warnings) this change introduced
             */
            introduced?: FlowMappingIssue[];
            /**
             * The analysis of each mapping action, by action id; other actions have no entry
             */
            analyses: {
                [name: string]: MappingAnalysis;
            };
        }
        export interface ValidateMappingReq {
            /**
             * The stored map-entity action config
             */
            config: {
                [name: string]: any;
            };
            /**
             * Where the action sits in its automation or flow. Optional: without it the config is checked as the only action of its flow, reading the journey submission (or `source.entity_schema`) and writing `config.target_schema`. Send it only to check references to other actions of the same automation.
             */
            context?: {
                /**
                 * Root of the source entity, `submission` for journeys, the trigger schema otherwise
                 */
                sourceSchema: string;
                /**
                 * Every action id of the automation in execution order, the ones after the current action included. An action left out is reported as missing (`task-missing`); with validator 0.4.4, an action listed in `taskSchemas` but not here counts as a later one (`task-not-earlier`).
                 */
                taskOrder: string[];
                /**
                 * The action being analysed; must be one of `taskOrder`. Defaults to the last id in `taskOrder`. References to `current` itself or to an action after it are reported as `task-not-earlier`.
                 */
                current?: string;
                taskSchemas: {
                    [name: string]: string;
                };
                /**
                 * Earlier action ids per schema they create, in execution order
                 */
                producersBySchema: {
                    [name: string]: string[];
                };
                linkbackTags?: string[];
                linkbackTagsByTask?: {
                    [name: string]: string[];
                };
                configIdsByTask?: {
                    [name: string]: string;
                };
            };
            roots?: /* Optional descriptions of the source and of each action's output (`Roots` of `@epilot/entity-mapping-validator`). A body whose `roots` does not have this shape is rejected with 400. */ MappingRoots;
            /**
             * Optional description of the target entity's attributes, as built by `rootFromEntitySchema` of `@epilot/entity-mapping-validator`. Each field carries its attribute `type`; with it the validator checks that a source fits the attribute it is mapped to (`type-mismatch`, `type-converts`) and that `_uniq` matches the shared merge keys (`merge-keys-differ`). When left out and `config.target_schema` is set, the server loads that schema.
             */
            target_root?: {
                kind: "declared" | "inferred";
                fields: MappingRootField[];
            };
            source?: /* What the automation's trigger provides, by id. Used when `roots.source` is not sent: the server loads the journey's mapping sources (`rootFromMappingSources`) or the entity schema (`rootFromEntitySchema`) with the caller's authorization. A journey or schema that does not exist is an error issue (`source-journey-not-found`, `source-schema-not-found`); one that could not be loaded is a warning (`source-not-loaded`) and the source checks are skipped (`skipped_checks`). Likewise for a target schema (`target-schema-not-found`, `target-schema-not-loaded`). `automation_step` (the trigger of a workflow's automation task) names no data: a warning (`source-not-fixed`) and the source checks are skipped; pass what the workflow was started with instead. */ MappingSourceRef;
        }
    }
}
declare namespace Paths {
    namespace DeleteConfig {
        namespace Parameters {
            /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MappingConfig;
            export interface $429 {
            }
        }
    }
    namespace ExecuteMapping {
        namespace Parameters {
            /**
             * example:
             * true
             */
            export type PreviewMode = boolean;
        }
        export interface QueryParameters {
            preview_mode?: /**
             * example:
             * true
             */
            Parameters.PreviewMode;
        }
        export type RequestBody = /* Pass either source or source_entity */ Components.Schemas.ExecuteMappingReq;
        namespace Responses {
            export type $200 = Components.Schemas.ExecuteMappingResp;
        }
    }
    namespace ExecuteRelations {
        export type RequestBody = /* Build relations between a source entity and one or more target entities, dynamically identified */ Components.Schemas.ExecuteRelationsReq;
        namespace Responses {
            export type $200 = Components.Schemas.ExecuteRelationsResp;
        }
    }
    namespace GetAllVersions {
        namespace Parameters {
            /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MappingConfigsResp;
        }
    }
    namespace GetConfig {
        namespace Parameters {
            /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MappingConfig;
        }
    }
    namespace GetConfigVersion {
        namespace Parameters {
            /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            export type Id = string;
            /**
             * example:
             * 3
             */
            export type Version = number;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            Parameters.Id;
            version: /**
             * example:
             * 3
             */
            Parameters.Version;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MappingConfig;
        }
    }
    namespace GetMappingConfig {
        namespace Parameters {
            /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MappingConfigV2;
        }
    }
    namespace PutMappingConfig {
        namespace Parameters {
            /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            Parameters.Id;
        }
        export type RequestBody = Components.Schemas.MappingConfigV2;
        namespace Responses {
            export type $200 = Components.Schemas.MappingConfigV2;
        }
    }
    namespace SearchConfigs {
        export type RequestBody = Components.Schemas.SearchMappingReq;
        namespace Responses {
            export type $200 = Components.Schemas.MappingConfigsResp;
        }
    }
    namespace StoreConfig {
        namespace Parameters {
            export type WithId = string;
        }
        export interface QueryParameters {
            with_id?: Parameters.WithId;
        }
        export type RequestBody = Components.Schemas.MappingConfig;
        namespace Responses {
            export type $201 = Components.Schemas.MappingConfig;
        }
    }
    namespace StoreNewVersion {
        namespace Parameters {
            /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 70542580-2b38-4bfc-af8d-bb90102f9f47
             */
            Parameters.Id;
        }
        export type RequestBody = Components.Schemas.MappingConfig;
        namespace Responses {
            export type $200 = Components.Schemas.MappingConfig;
        }
    }
    namespace ValidateMapping {
        export type RequestBody = Components.Schemas.ValidateMappingReq;
        namespace Responses {
            export type $200 = Components.Schemas.MappingAnalysis;
            export interface $400 {
                messages?: string[];
            }
            export type $401 = Components.Responses.MappingCheckUnauthorized;
            export type $403 = Components.Responses.MappingCheckForbidden;
            export type $413 = Components.Responses.MappingCheckTooLarge;
        }
    }
    namespace ValidateMappingFlow {
        export type RequestBody = Components.Schemas.ValidateMappingFlowReq;
        namespace Responses {
            export type $200 = Components.Schemas.ValidateMappingFlowResp;
            export interface $400 {
                messages?: string[];
            }
            export type $401 = Components.Responses.MappingCheckUnauthorized;
            export type $403 = Components.Responses.MappingCheckForbidden;
            export type $413 = Components.Responses.MappingCheckTooLarge;
        }
    }
}


export interface OperationMethods {
  /**
   * storeConfig - storeConfig
   * 
   * Store new MappingConfig
   */
  'storeConfig'(
    parameters?: Parameters<Paths.StoreConfig.QueryParameters> | null,
    data?: Paths.StoreConfig.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoreConfig.Responses.$201>
  /**
   * getConfig - getConfig
   * 
   * Get latest version of a mapping config by id
   */
  'getConfig'(
    parameters?: Parameters<Paths.GetConfig.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConfig.Responses.$200>
  /**
   * deleteConfig - deleteConfig
   * 
   * Delete entity mapping config
   */
  'deleteConfig'(
    parameters?: Parameters<Paths.DeleteConfig.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteConfig.Responses.$200>
  /**
   * getAllVersions - getAllVersions
   * 
   * Get all version of MappingConfig
   */
  'getAllVersions'(
    parameters?: Parameters<Paths.GetAllVersions.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllVersions.Responses.$200>
  /**
   * storeNewVersion - storeNewVersion
   * 
   * Store new version of MappingConfig
   */
  'storeNewVersion'(
    parameters?: Parameters<Paths.StoreNewVersion.PathParameters> | null,
    data?: Paths.StoreNewVersion.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StoreNewVersion.Responses.$200>
  /**
   * getConfigVersion - getConfigVersion
   * 
   * Get specific version of a mapping config by id & version
   */
  'getConfigVersion'(
    parameters?: Parameters<Paths.GetConfigVersion.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConfigVersion.Responses.$200>
  /**
   * executeMapping - executeMapping
   * 
   * Execute entity mapping based on a config
   */
  'executeMapping'(
    parameters?: Parameters<Paths.ExecuteMapping.QueryParameters> | null,
    data?: Paths.ExecuteMapping.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExecuteMapping.Responses.$200>
  /**
   * validateMapping - validateMapping
   * 
   * Analyse a stored map-entity action config (engine JSON) line by line: a verdict per line (form, json, broken), issues on the engine line they belong to, suggested rewrites and a sentence each. `valid` is false when an issue is an error; a save gate rejects the config then. Never persists anything. The smallest request is `{ config, source: { journey_id } }`. Send `source` (the trigger's journey or entity schema) instead of `roots.source`, and leave out `target_root` when `config.target_schema` is set: the server loads those descriptions with the caller's authorization. The response is about 1.1 KB per line: from about 5000 lines in one request it exceeds the inline limit (413, see there).
   */
  'validateMapping'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ValidateMapping.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ValidateMapping.Responses.$200>
  /**
   * validateMappingFlow - validateMappingFlow
   * 
   * Analyse every mapping action (`map-entity`, `cart-checkout`) of an automation, each in its place: against the trigger's source, the entities the earlier actions create and its target schema. The source and every target schema are loaded by id with the caller's authorization. `blocking` lists what a save gate rejects: errors, issues on broken lines and values that are not an option of their attribute. With `previous_actions` (the automation as stored) only issues this change introduced block. Never persists anything. Responses above the inline limit are a 413 (see there).
   */
  'validateMappingFlow'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ValidateMappingFlow.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ValidateMappingFlow.Responses.$200>
  /**
   * searchConfigs - searchConfigs
   * 
   * Search mapping configs
   */
  'searchConfigs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchConfigs.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchConfigs.Responses.$200>
  /**
   * executeRelations - executeRelations
   * 
   * Execute relation mapping between source entity and target entities
   */
  'executeRelations'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ExecuteRelations.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExecuteRelations.Responses.$200>
  /**
   * getMappingConfig - getMappingConfig
   * 
   * Get latest version of a mapping config by id V2
   */
  'getMappingConfig'(
    parameters?: Parameters<Paths.GetMappingConfig.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMappingConfig.Responses.$200>
  /**
   * putMappingConfig - putMappingConfig
   * 
   * Stores new version of entity mapping config. The targets are not checked on store: check them first with `POST /v1/mappings:validate-flow` (`{ source: { journey_id }, actions: [{ id, type: map-entity, config: <target> }] }`, one action per target) and fix every `blocking` issue.
   */
  'putMappingConfig'(
    parameters?: Parameters<Paths.PutMappingConfig.PathParameters> | null,
    data?: Paths.PutMappingConfig.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutMappingConfig.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/mappings']: {
    /**
     * storeConfig - storeConfig
     * 
     * Store new MappingConfig
     */
    'post'(
      parameters?: Parameters<Paths.StoreConfig.QueryParameters> | null,
      data?: Paths.StoreConfig.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoreConfig.Responses.$201>
  }
  ['/v1/mappings/{id}']: {
    /**
     * getConfig - getConfig
     * 
     * Get latest version of a mapping config by id
     */
    'get'(
      parameters?: Parameters<Paths.GetConfig.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConfig.Responses.$200>
    /**
     * deleteConfig - deleteConfig
     * 
     * Delete entity mapping config
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteConfig.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteConfig.Responses.$200>
  }
  ['/v1/mappings/{id}/versions']: {
    /**
     * getAllVersions - getAllVersions
     * 
     * Get all version of MappingConfig
     */
    'get'(
      parameters?: Parameters<Paths.GetAllVersions.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllVersions.Responses.$200>
    /**
     * storeNewVersion - storeNewVersion
     * 
     * Store new version of MappingConfig
     */
    'post'(
      parameters?: Parameters<Paths.StoreNewVersion.PathParameters> | null,
      data?: Paths.StoreNewVersion.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StoreNewVersion.Responses.$200>
  }
  ['/v1/mappings/{id}/versions/{version}']: {
    /**
     * getConfigVersion - getConfigVersion
     * 
     * Get specific version of a mapping config by id & version
     */
    'get'(
      parameters?: Parameters<Paths.GetConfigVersion.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConfigVersion.Responses.$200>
  }
  ['/v1/mappings:execute']: {
    /**
     * executeMapping - executeMapping
     * 
     * Execute entity mapping based on a config
     */
    'post'(
      parameters?: Parameters<Paths.ExecuteMapping.QueryParameters> | null,
      data?: Paths.ExecuteMapping.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExecuteMapping.Responses.$200>
  }
  ['/v1/mappings:validate']: {
    /**
     * validateMapping - validateMapping
     * 
     * Analyse a stored map-entity action config (engine JSON) line by line: a verdict per line (form, json, broken), issues on the engine line they belong to, suggested rewrites and a sentence each. `valid` is false when an issue is an error; a save gate rejects the config then. Never persists anything. The smallest request is `{ config, source: { journey_id } }`. Send `source` (the trigger's journey or entity schema) instead of `roots.source`, and leave out `target_root` when `config.target_schema` is set: the server loads those descriptions with the caller's authorization. The response is about 1.1 KB per line: from about 5000 lines in one request it exceeds the inline limit (413, see there).
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ValidateMapping.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ValidateMapping.Responses.$200>
  }
  ['/v1/mappings:validate-flow']: {
    /**
     * validateMappingFlow - validateMappingFlow
     * 
     * Analyse every mapping action (`map-entity`, `cart-checkout`) of an automation, each in its place: against the trigger's source, the entities the earlier actions create and its target schema. The source and every target schema are loaded by id with the caller's authorization. `blocking` lists what a save gate rejects: errors, issues on broken lines and values that are not an option of their attribute. With `previous_actions` (the automation as stored) only issues this change introduced block. Never persists anything. Responses above the inline limit are a 413 (see there).
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ValidateMappingFlow.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ValidateMappingFlow.Responses.$200>
  }
  ['/v1/mappings:search']: {
    /**
     * searchConfigs - searchConfigs
     * 
     * Search mapping configs
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchConfigs.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchConfigs.Responses.$200>
  }
  ['/v1/relations:execute']: {
    /**
     * executeRelations - executeRelations
     * 
     * Execute relation mapping between source entity and target entities
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ExecuteRelations.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExecuteRelations.Responses.$200>
  }
  ['/v2/mappings/{id}']: {
    /**
     * getMappingConfig - getMappingConfig
     * 
     * Get latest version of a mapping config by id V2
     */
    'get'(
      parameters?: Parameters<Paths.GetMappingConfig.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMappingConfig.Responses.$200>
    /**
     * putMappingConfig - putMappingConfig
     * 
     * Stores new version of entity mapping config. The targets are not checked on store: check them first with `POST /v1/mappings:validate-flow` (`{ source: { journey_id }, actions: [{ id, type: map-entity, config: <target> }] }`, one action per target) and fix every `blocking` issue.
     */
    'put'(
      parameters?: Parameters<Paths.PutMappingConfig.PathParameters> | null,
      data?: Paths.PutMappingConfig.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutMappingConfig.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AppendValueMapper = Components.Schemas.AppendValueMapper;
export type AttributeOrigin = Components.Schemas.AttributeOrigin;
export type ConditionNode = Components.Schemas.ConditionNode;
export type CopyValueMapper = Components.Schemas.CopyValueMapper;
export type Entity = Components.Schemas.Entity;
export type EntityRef = Components.Schemas.EntityRef;
export type ExecuteMappingReq = Components.Schemas.ExecuteMappingReq;
export type ExecuteMappingResp = Components.Schemas.ExecuteMappingResp;
export type ExecuteRelationsReq = Components.Schemas.ExecuteRelationsReq;
export type ExecuteRelationsResp = Components.Schemas.ExecuteRelationsResp;
export type FlowMappingIssue = Components.Schemas.FlowMappingIssue;
export type GraphContextEntry = Components.Schemas.GraphContextEntry;
export type GraphDefinition = Components.Schemas.GraphDefinition;
export type GraphEdge = Components.Schemas.GraphEdge;
export type GraphNode = Components.Schemas.GraphNode;
export type GraphNodeFilter = Components.Schemas.GraphNodeFilter;
export type GraphSeed = Components.Schemas.GraphSeed;
export type JourneyContextUsage = Components.Schemas.JourneyContextUsage;
export type JourneyContextUsagesReq = Components.Schemas.JourneyContextUsagesReq;
export type JourneyContextUsagesResp = Components.Schemas.JourneyContextUsagesResp;
export type JourneyRef = Components.Schemas.JourneyRef;
export type Loop_Index_String = Components.Schemas.LoopIndexString;
export type MapCondition = Components.Schemas.MapCondition;
export type MappingAnalysis = Components.Schemas.MappingAnalysis;
export type MappingAttribute = Components.Schemas.MappingAttribute;
export type MappingAttributeMode = Components.Schemas.MappingAttributeMode;
export type MappingAttributeV2 = Components.Schemas.MappingAttributeV2;
export type MappingCheckContext = Components.Schemas.MappingCheckContext;
export type MappingConfig = Components.Schemas.MappingConfig;
export type MappingConfigCommonFields = Components.Schemas.MappingConfigCommonFields;
export type MappingConfigV2 = Components.Schemas.MappingConfigV2;
export type MappingConfigs = Components.Schemas.MappingConfigs;
export type MappingConfigsResp = Components.Schemas.MappingConfigsResp;
export type MappingFailure = Components.Schemas.MappingFailure;
export type MappingFlowAction = Components.Schemas.MappingFlowAction;
export type MappingIssue = Components.Schemas.MappingIssue;
export type MappingRootDescription = Components.Schemas.MappingRootDescription;
export type MappingRootField = Components.Schemas.MappingRootField;
export type MappingRoots = Components.Schemas.MappingRoots;
export type MappingSource = Components.Schemas.MappingSource;
export type MappingSourceProperty = Components.Schemas.MappingSourceProperty;
export type MappingSourceRef = Components.Schemas.MappingSourceRef;
export type MappingSourceTargetType = Components.Schemas.MappingSourceTargetType;
export type MappingWarning = Components.Schemas.MappingWarning;
export type NewRelationItem = Components.Schemas.NewRelationItem;
export type OperationNode = Components.Schemas.OperationNode;
export type OperationObjectNode = Components.Schemas.OperationObjectNode;
export type OutputEntityRef = Components.Schemas.OutputEntityRef;
export type Owner = Components.Schemas.Owner;
export type PreviewTarget = Components.Schemas.PreviewTarget;
export type PrimitiveJSONValue = Components.Schemas.PrimitiveJSONValue;
export type RandomOperation = Components.Schemas.RandomOperation;
export type RelationAttribute = Components.Schemas.RelationAttribute;
export type RelationItem = Components.Schemas.RelationItem;
export type SearchMappingReq = Components.Schemas.SearchMappingReq;
export type SetValueMapper = Components.Schemas.SetValueMapper;
export type SourceConfig = Components.Schemas.SourceConfig;
export type TargetConfig = Components.Schemas.TargetConfig;
export type ValidateMappingFlowReq = Components.Schemas.ValidateMappingFlowReq;
export type ValidateMappingFlowResp = Components.Schemas.ValidateMappingFlowResp;
export type ValidateMappingReq = Components.Schemas.ValidateMappingReq;
