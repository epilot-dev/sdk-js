/* eslint-disable */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
    namespace Parameters {
        export type ActivityIdPathParam = /**
         * See https://github.com/ulid/spec
         * example:
         * 01F130Q52Q6MWSNS8N2AVXV4JN
         */
        Schemas.ActivityId /* ulid */;
        export type ActivityIdQueryParam = /**
         * See https://github.com/ulid/spec
         * example:
         * 01F130Q52Q6MWSNS8N2AVXV4JN
         */
        Schemas.ActivityId /* ulid */;
        export type AsyncOperationQueryParam = boolean;
        export type DryRunQueryParam = boolean;
        export type EntityIdPathParam = Schemas.EntityId /* uuid */;
        export type EntityRelationsModeQueryParam = "direct" | "reverse" | "both";
        export type EntitySlugPathParam = /**
         * URL-friendly identifier for the entity schema
         * example:
         * contact
         */
        Schemas.EntitySlug;
        /**
         * URL-friendly identifier for the entity schema
         * example:
         * price
         */
        export type EntitySlugPathPriceParam = string;
        export type ExcludeSchemasQueryParam = /**
         * URL-friendly identifier for the entity schema
         * example:
         * contact
         */
        Schemas.EntitySlug[];
        export type FromPageQueryParam = number;
        export type HydrateEntitiesQueryParam = boolean;
        export type IncludeReverseDeprecatedQueryParam = boolean;
        export type IncludeReverseQueryParam = boolean;
        export type IncludeSchemasQueryParam = /**
         * URL-friendly identifier for the entity schema
         * example:
         * contact
         */
        Schemas.EntitySlug[];
        export type SavedViewIdPathParam = /* Generated uuid for a saved view */ Schemas.SavedViewId /* uuid */;
        export type TaxonomySlugPathParam = string;
        export type TaxonomySlugQueryParam = string;
    }
    export interface PathParameters {
        EntityIdPathParam?: Parameters.EntityIdPathParam;
        EntitySlugPathParam?: Parameters.EntitySlugPathParam;
        EntitySlugPathPriceParam?: /**
         * URL-friendly identifier for the entity schema
         * example:
         * price
         */
        Parameters.EntitySlugPathPriceParam;
        TaxonomySlugPathParam?: Parameters.TaxonomySlugPathParam;
        SavedViewIdPathParam?: Parameters.SavedViewIdPathParam;
        ActivityIdPathParam?: Parameters.ActivityIdPathParam;
    }
    export interface QueryParameters {
        TaxonomySlugQueryParam?: Parameters.TaxonomySlugQueryParam;
        AsyncOperationQueryParam?: Parameters.AsyncOperationQueryParam;
        HydrateEntitiesQueryParam?: Parameters.HydrateEntitiesQueryParam;
        ActivityIdQueryParam?: Parameters.ActivityIdQueryParam;
        FromPageQueryParam?: Parameters.FromPageQueryParam;
        IncludeReverseDeprecatedQueryParam?: Parameters.IncludeReverseDeprecatedQueryParam;
        IncludeReverseQueryParam?: Parameters.IncludeReverseQueryParam;
        IncludeSchemasQueryParam?: Parameters.IncludeSchemasQueryParam;
        ExcludeSchemasQueryParam?: Parameters.ExcludeSchemasQueryParam;
        EntityRelationsModeQueryParam?: Parameters.EntityRelationsModeQueryParam;
        DryRunQueryParam?: Parameters.DryRunQueryParam;
    }
    namespace Schemas {
        export interface Activity {
            /**
             * example:
             * MyCustomActivity
             */
            type: string;
            /**
             * Title for activity. Supports handlebars syntax.
             * example:
             * My custom activity
             */
            title: string;
            /**
             * Message for activity. Supports handlebars syntax.
             * example:
             * {{caller}} did something with {{entity payload.entity.id}}.
             */
            message: string;
            /**
             * example:
             * {
             *   "entity": {
             *     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *     "schema": "contact"
             *   }
             * }
             */
            payload?: {
                [name: string]: any;
            };
        }
        export interface ActivityCallerContext {
            [name: string]: any;
            EpilotAuth?: {
                /**
                 * example:
                 * {
                 *   "sub": "476e9b48-42f4-4234-a2b0-4668b34626ce",
                 *   "cognito:groups": [
                 *     "Administrator"
                 *   ],
                 *   "cognito:preferred_role": "arn:aws:iam::912468240823:role/base-administrator-role",
                 *   "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_6lZSgmU6D",
                 *   "custom:ivy_org_id": "739224",
                 *   "cognito:username": "n.ahmad@epilot.cloud",
                 *   "custom:ivy_user_id": "10006129",
                 *   "cognito:roles": [
                 *     "arn:aws:iam::912468240823:role/base-administrator-role"
                 *   ],
                 *   "aud": "6e0jbdnger7nmoktaaflarue1l",
                 *   "event_id": "cd5f5583-d90c-4db5-8e99-5f5dd29a4d75",
                 *   "token_use": "id",
                 *   "auth_time": 1614333023,
                 *   "exp": 1614336623,
                 *   "iat": 1614333023,
                 *   "email": "n.ahmad@epilot.cloud"
                 * }
                 */
                token?: {
                    /**
                     * example:
                     * 476e9b48-42f4-4234-a2b0-4668b34626ce
                     */
                    sub?: string;
                    /**
                     * example:
                     * example@epilot.cloud
                     */
                    email?: string;
                    /**
                     * example:
                     * example@epilot.cloud
                     */
                    "cognito:username"?: string;
                    /**
                     * example:
                     * 10006129
                     */
                    "custom:ivy_user_id"?: string;
                };
            };
        }
        /**
         * See https://github.com/ulid/spec
         * example:
         * 01F130Q52Q6MWSNS8N2AVXV4JN
         */
        export type ActivityId = string; // ulid
        export interface ActivityItem {
            _id?: /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            ActivityId /* ulid */;
            timestamp?: string; // date-time
            /**
             * example:
             * MyCustomActivity
             */
            type: string;
            /**
             * Title for activity. Supports handlebars syntax.
             * example:
             * My custom activity
             */
            title: string;
            /**
             * Message for activity. Supports handlebars syntax.
             * example:
             * {{caller}} did something with {{entity payload.entity.id}}.
             */
            message: string;
            /**
             * example:
             * {
             *   "entity": {
             *     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *     "schema": "contact"
             *   }
             * }
             */
            payload?: {
                [name: string]: any;
            };
            caller?: ActivityCallerContext;
            /**
             * Count of total operations attached to this activity
             * example:
             * 1
             */
            operations_total?: number;
            operations?: EntityOperation[];
        }
        /**
         * Reference to an address attribute of another entity
         */
        export interface AddressRelationAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "relation_address";
            has_primary?: boolean;
        }
        export type Attribute = /* Textarea or text input */ TextAttribute | /* Link with title and href */ LinkAttribute | /* Date or Datetime picker */ DateAttribute | /* Country picker */ CountryAttribute | /* Yes / No Toggle */ BooleanAttribute | /* Dropdown select */ SelectAttribute | /* Multi Choice Selection */ MultiSelectAttribute | /* Status select */ StatusAttribute | /* Sequence of unique identifiers */ SequenceAttribute | /* Entity Relationship */ RelationAttribute | /* User Relationship */ UserRelationAttribute | /* Reference to an address attribute of another entity */ AddressRelationAttribute | /* Reference to a payment method attribute of another entity */ PaymentMethodRelationAttribute | /* Currency input */ CurrencyAttribute | /* Repeatable (add N number of fields) */ RepeatableAttribute | /* Tags */ TagsAttribute | /* Numeric input */ NumberAttribute | /* Consent Management */ ConsentAttribute | /* No UI representation */ InternalAttribute | /* Type of attribute to render N number of ordered fields */ OrderedListAttribute | /* File or Image Attachment */ FileAttribute | /* An attribute that is computed from the entity data. For more details on how to use them, check the docs [here](https://e-pilot.atlassian.net/wiki/spaces/EO/pages/5642977476/How+To+Computed+Schema+Attributes) */ ComputedAttribute | /* Partner Status */ PartnerStatusAttribute | /* Email address for send invitation */ InvitationEmailAttribute | /* Automation entity */ AutomationAttribute | /* Epilot internal user info */ InternalUserAttribute | /* Entity Taxonomy */ PurposeAttribute | /* Shared Partner Organisations */ PartnerOrganisationAttribute;
        /**
         * Automation entity
         */
        export interface AutomationAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "automation";
        }
        export interface BaseAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
        }
        /**
         * example:
         * {
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "_org": "123",
         *   "_owners": [
         *     {
         *       "org_id": "123",
         *       "user_id": "123"
         *     }
         *   ],
         *   "_schema": "contact",
         *   "_tags": [
         *     "example",
         *     "mock"
         *   ],
         *   "_created_at": "2021-02-09T12:41:43.662Z",
         *   "_updated_at": "2021-02-09T12:41:43.662Z",
         *   "_acl": {
         *     "view": [
         *       "org:456",
         *       "org:789"
         *     ],
         *     "edit": [
         *       "org:456"
         *     ],
         *     "delete": [
         *       "org:456"
         *     ]
         *   }
         * }
         */
        export interface BaseEntity {
            [name: string]: any;
            _id: EntityId /* uuid */;
            /**
             * Organization Id the entity belongs to
             */
            _org: string;
            _owners?: /**
             * The user / organization owning this entity.
             *
             * Note: Owner implicitly has access to the entity regardless of ACLs.
             *
             */
            EntityOwner[];
            _schema: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            /**
             * Title of entity
             */
            _title: string | null;
            _tags?: string[] | null;
            _created_at: string | null; // date-time
            _updated_at: string | null; // date-time
            _acl?: /* Access control list (ACL) for an entity. Defines sharing access to external orgs or users. */ EntityAcl;
        }
        /**
         * Reference to blueprint
         */
        export type BlueprintEntityId = string; // uuid
        /**
         * Yes / No Toggle
         */
        export interface BooleanAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "boolean";
        }
        export type ClassificationId = string; // uuid
        export interface ClassificationsUpdate {
            create?: TaxonomyClassification[];
            update?: TaxonomyClassification[];
            delete?: ClassificationId /* uuid */[];
        }
        /**
         * An attribute that is computed from the entity data. For more details on how to use them, check the docs [here](https://e-pilot.atlassian.net/wiki/spaces/EO/pages/5642977476/How+To+Computed+Schema+Attributes)
         */
        export interface ComputedAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "computed";
        }
        /**
         * Consent Management
         */
        export interface ConsentAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type: "consent";
            topic: string;
            identifiers?: string[];
        }
        /**
         * Country picker
         */
        export interface CountryAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "country";
        }
        /**
         * Currency input
         */
        export interface CurrencyAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type: "currency";
            currency_selector_only?: boolean;
            /**
             * An array of currency configurations with a country code (ISO-4217)
             */
            currency: ({
                code: string;
                description: string;
                symbol: string;
                flag?: string;
            })[];
        }
        /**
         * Date or Datetime picker
         */
        export interface DateAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "date" | "datetime";
        }
        /**
         * example:
         * {
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "_org": "123",
         *   "_owners": [
         *     {
         *       "org_id": "123",
         *       "user_id": "123"
         *     }
         *   ],
         *   "_schema": "contact",
         *   "_tags": [
         *     "example",
         *     "mock"
         *   ],
         *   "_created_at": "2021-02-09T12:41:43.662Z",
         *   "_updated_at": "2021-02-09T12:41:43.662Z",
         *   "_acl": {
         *     "view": [
         *       "org:456",
         *       "org:789"
         *     ],
         *     "edit": [
         *       "org:456"
         *     ],
         *     "delete": [
         *       "org:456"
         *     ]
         *   }
         * }
         */
        export interface Entity {
            [name: string]: any;
            _id?: EntityId /* uuid */;
            /**
             * Organization Id the entity belongs to
             */
            _org?: string;
            _owners?: /**
             * The user / organization owning this entity.
             *
             * Note: Owner implicitly has access to the entity regardless of ACLs.
             *
             */
            EntityOwner[];
            _schema?: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            /**
             * Title of entity
             */
            _title?: string | null;
            _tags?: string[] | null;
            _created_at?: string | null; // date-time
            _updated_at?: string | null; // date-time
            _acl?: /* Access control list (ACL) for an entity. Defines sharing access to external orgs or users. */ EntityAcl;
        }
        /**
         * Access control list (ACL) for an entity. Defines sharing access to external orgs or users.
         */
        export interface EntityAcl {
            [name: string]: any;
            view?: string[];
            edit?: string[];
            delete?: string[];
        }
        /**
         * An entity action configured from the entity schema
         */
        export interface EntityAction {
            /**
             * A unique action name
             * example:
             * preview_file
             */
            action: string;
            /**
             * example:
             * Preview File
             */
            label: string;
            /**
             * example:
             * visibility
             */
            icon?: string;
            /**
             * Permission required to show the action.
             * If not provided, the action will be shown to all users.
             *
             * example:
             * entity:edit
             */
            permission?: string;
        }
        /**
         * Capabilities the Entity has. Turn features on/off for entities.
         */
        export interface EntityCapability {
            /**
             * Unique name for the capability
             * example:
             * customer_messaging
             */
            name: string;
            /**
             * Human readable title of the capability
             * example:
             * Messaging
             */
            title?: string;
            attributes?: Attribute[];
            _purpose?: ClassificationId /* uuid */[];
            ui_hooks?: {
                [name: string]: any;
                /**
                 * name of the hook to use
                 * example:
                 * EntityDetailsV2:Tab
                 */
                hook: string;
                /**
                 * example:
                 * _is_composite_price = "false"
                 */
                render_condition?: string;
                /**
                 * render order (ascending)
                 * example:
                 * 10
                 */
                order?: number;
                /**
                 * example:
                 * Notes
                 */
                title?: string;
                /**
                 * Sets the group expand/collapse default state
                 */
                group_expanded?: boolean;
                /**
                 * package to be imported
                 * example:
                 * @epilot360/notes
                 */
                import?: string;
                /**
                 * the component to be dynamically loaded
                 * example:
                 * PricingItems
                 */
                component?: string;
                /**
                 * route for specified capability
                 * example:
                 * notes
                 */
                route?: string;
                /**
                 * Preview icon name(As in Base elements) for the capability
                 * example:
                 * email
                 */
                icon?: string;
                /**
                 * Whether capability should be disabled
                 */
                disabled?: boolean;
                /**
                 * Specific to Activity pilot
                 */
                header?: boolean;
                /**
                 * Require a permission to display UI hook
                 */
                requiredPermission?: {
                    /**
                     * example:
                     * note:view
                     */
                    action: string;
                    /**
                     * example:
                     * 123
                     */
                    resource?: string;
                };
            }[];
            /**
             * This capability should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This capability should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
        }
        export interface EntityDefaultCreate {
            view_type?: "default";
            search_params?: {
                [name: string]: string;
            };
        }
        export interface EntityDefaultEdit {
            view_type?: "default";
            search_params?: {
                [name: string]: string;
            };
            /**
             * List of attribute names that we show in the summary header
             */
            summary_attributes?: string[];
        }
        export interface EntityDefaultTable {
            view_type?: "default";
            dropdown_items?: ({
                type?: "entity";
                entity?: /**
                 * URL-friendly identifier for the entity schema
                 * example:
                 * contact
                 */
                EntitySlug;
                /**
                 * This dropdown item should only be active when the feature flag is enabled
                 * example:
                 * FF_MY_FEATURE_FLAG
                 */
                feature_flag?: string;
            } | {
                type?: "link";
                /**
                 * example:
                 * Opportunities
                 */
                title?: string;
                uri?: string; // uri-reference
                /**
                 * This dropdown item should only be active when the feature flag is enabled
                 * example:
                 * FF_MY_FEATURE_FLAG
                 */
                feature_flag?: string;
            })[];
            row_actions?: (string | /* An entity action configured from the entity schema */ EntityAction)[];
            navbar_actions?: {
                type: string;
                options?: {
                    label: string;
                    params?: {
                        [key: string]: any;
                    };
                }[];
            }[];
            /**
             * Enable the thumbnail column
             */
            enable_thumbnails?: boolean;
        }
        export type EntityId = string; // uuid
        /**
         * The parameters for importing entities.
         */
        export interface EntityImportParams {
            /**
             * The S3 bucket and key where the JSON file for import is located.
             */
            S3Reference: {
                /**
                 * The name of the S3 bucket where the JSON file for import is stored.
                 * example:
                 * my-bucket
                 */
                bucket: string;
                /**
                 * The key or path to the JSON file within the S3 bucket.
                 * example:
                 * imports/my-import.json
                 */
                key: string;
            };
            /**
             * The schema of the entities being imported. This must match the schema of the entities on the platform.
             * example:
             * contact
             */
            schema: string;
        }
        /**
         * example:
         * {
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "_org": "123",
         *   "_owners": [
         *     {
         *       "org_id": "123",
         *       "user_id": "123"
         *     },
         *     {
         *       "org_id": "123",
         *       "user_id": "123"
         *     }
         *   ],
         *   "_schema": "contact",
         *   "_tags": [
         *     "example",
         *     "mock",
         *     "example",
         *     "mock"
         *   ],
         *   "_created_at": "2021-02-09T12:41:43.662Z",
         *   "_updated_at": "2021-02-09T12:41:43.662Z",
         *   "_acl": {
         *     "view": [
         *       "org:456",
         *       "org:789",
         *       "org:456",
         *       "org:789"
         *     ],
         *     "edit": [
         *       "org:456",
         *       "org:456"
         *     ],
         *     "delete": [
         *       "org:456",
         *       "org:456"
         *     ]
         *   }
         * }
         */
        export interface EntityItem {
            [name: string]: any;
            _id: EntityId /* uuid */;
            /**
             * Organization Id the entity belongs to
             */
            _org: string;
            _owners?: /**
             * The user / organization owning this entity.
             *
             * Note: Owner implicitly has access to the entity regardless of ACLs.
             *
             */
            EntityOwner[];
            _schema: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            /**
             * Title of entity
             */
            _title: string | null;
            _tags?: string[] | null;
            _created_at: string | null; // date-time
            _updated_at: string | null; // date-time
            _acl?: /* Access control list (ACL) for an entity. Defines sharing access to external orgs or users. */ EntityAcl;
        }
        export interface EntityOperation {
            entity: EntityId /* uuid */;
            /**
             * example:
             * 123
             */
            org: string;
            activity_id?: /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            ActivityId /* ulid */;
            operation: "createEntity" | "updateEntity" | "deleteEntity";
            /**
             * example:
             * {
             *   "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "slug": "contact"
             * }
             */
            params?: {
                id?: EntityId /* uuid */;
                slug?: /**
                 * URL-friendly identifier for the entity schema
                 * example:
                 * contact
                 */
                EntitySlug;
            };
            /**
             * example:
             * {
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "_org": "123",
             *   "_owners": [
             *     {
             *       "org_id": "123",
             *       "user_id": "123"
             *     }
             *   ],
             *   "_schema": "contact",
             *   "_tags": [
             *     "example",
             *     "mock"
             *   ],
             *   "_created_at": "2021-02-09T12:41:43.662Z",
             *   "_updated_at": "2021-02-09T12:41:43.662Z",
             *   "_acl": {
             *     "view": [
             *       "org:456",
             *       "org:789"
             *     ],
             *     "edit": [
             *       "org:456"
             *     ],
             *     "delete": [
             *       "org:456"
             *     ]
             *   },
             *   "status": "Inactive"
             * }
             */
            payload?: {
                [name: string]: any;
                _id?: EntityId /* uuid */;
                /**
                 * Organization Id the entity belongs to
                 */
                _org?: string;
                _owners?: /**
                 * The user / organization owning this entity.
                 *
                 * Note: Owner implicitly has access to the entity regardless of ACLs.
                 *
                 */
                EntityOwner[];
                _schema?: /**
                 * URL-friendly identifier for the entity schema
                 * example:
                 * contact
                 */
                EntitySlug;
                /**
                 * Title of entity
                 */
                _title?: string | null;
                _tags?: string[] | null;
                _created_at?: string | null; // date-time
                _updated_at?: string | null; // date-time
                _acl?: /* Access control list (ACL) for an entity. Defines sharing access to external orgs or users. */ EntityAcl;
            };
            diff?: {
                added?: /**
                 * example:
                 * {
                 *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                 *   "_org": "123",
                 *   "_owners": [
                 *     {
                 *       "org_id": "123",
                 *       "user_id": "123"
                 *     }
                 *   ],
                 *   "_schema": "contact",
                 *   "_tags": [
                 *     "example",
                 *     "mock"
                 *   ],
                 *   "_created_at": "2021-02-09T12:41:43.662Z",
                 *   "_updated_at": "2021-02-09T12:41:43.662Z",
                 *   "_acl": {
                 *     "view": [
                 *       "org:456",
                 *       "org:789"
                 *     ],
                 *     "edit": [
                 *       "org:456"
                 *     ],
                 *     "delete": [
                 *       "org:456"
                 *     ]
                 *   }
                 * }
                 */
                Entity;
                updated?: /**
                 * example:
                 * {
                 *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                 *   "_org": "123",
                 *   "_owners": [
                 *     {
                 *       "org_id": "123",
                 *       "user_id": "123"
                 *     }
                 *   ],
                 *   "_schema": "contact",
                 *   "_tags": [
                 *     "example",
                 *     "mock"
                 *   ],
                 *   "_created_at": "2021-02-09T12:41:43.662Z",
                 *   "_updated_at": "2021-02-09T12:41:43.662Z",
                 *   "_acl": {
                 *     "view": [
                 *       "org:456",
                 *       "org:789"
                 *     ],
                 *     "edit": [
                 *       "org:456"
                 *     ],
                 *     "delete": [
                 *       "org:456"
                 *     ]
                 *   }
                 * }
                 */
                Entity;
                deleted?: /**
                 * example:
                 * {
                 *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                 *   "_org": "123",
                 *   "_owners": [
                 *     {
                 *       "org_id": "123",
                 *       "user_id": "123"
                 *     }
                 *   ],
                 *   "_schema": "contact",
                 *   "_tags": [
                 *     "example",
                 *     "mock"
                 *   ],
                 *   "_created_at": "2021-02-09T12:41:43.662Z",
                 *   "_updated_at": "2021-02-09T12:41:43.662Z",
                 *   "_acl": {
                 *     "view": [
                 *       "org:456",
                 *       "org:789"
                 *     ],
                 *     "edit": [
                 *       "org:456"
                 *     ],
                 *     "delete": [
                 *       "org:456"
                 *     ]
                 *   }
                 * }
                 */
                Entity;
            };
        }
        /**
         * The user / organization owning this entity.
         *
         * Note: Owner implicitly has access to the entity regardless of ACLs.
         *
         */
        export interface EntityOwner {
            /**
             * example:
             * 123
             */
            org_id: string;
            /**
             * example:
             * 123
             */
            user_id?: string;
        }
        /**
         * The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities.
         */
        export interface EntitySchema {
            slug: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            version?: number;
            blueprint?: /* Reference to blueprint */ BlueprintEntityId /* uuid */;
            /**
             * This schema should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This schema should only be active when one of the organization settings is enabled
             */
            enable_setting?: string[];
            /**
             * User-friendly identifier for the entity schema
             * example:
             * Contact
             */
            name: string;
            /**
             * example:
             * Contacts
             */
            plural: string;
            /**
             * example:
             * false
             */
            published?: boolean;
            /**
             * example:
             * false
             */
            draft?: boolean;
            /**
             * example:
             * person
             */
            icon?: string;
            /**
             * Template for rendering the title field. Uses handlebars
             * example:
             * {{first_name}} {{last_name}}
             */
            title_template?: string;
            ui_config?: {
                table_view?: EntityDefaultTable | /**
                 * example:
                 * {
                 *   "type": "redirect",
                 *   "route": "/app/pricing-hub/product/:entityId"
                 * }
                 */
                RedirectEntityView | EntityViewDisabled;
                create_view?: EntityDefaultCreate | /**
                 * example:
                 * {
                 *   "type": "redirect",
                 *   "route": "/app/pricing-hub/product/:entityId"
                 * }
                 */
                RedirectEntityView | EntityViewDisabled;
                edit_view?: EntityDefaultEdit | /**
                 * example:
                 * {
                 *   "type": "redirect",
                 *   "route": "/app/pricing-hub/product/:entityId"
                 * }
                 */
                RedirectEntityView | EntityViewDisabled;
                single_view?: EntityDefaultEdit | /**
                 * example:
                 * {
                 *   "type": "redirect",
                 *   "route": "/app/pricing-hub/product/:entityId"
                 * }
                 */
                RedirectEntityView | EntityViewDisabled;
                list_item?: {
                    summary_attributes?: (/**
                     * Represents an expanded version of an attribute to be displayed in the list item summary.
                     * This configuration can be used in the following way:
                     * ```js
                     * {
                     *   "label": "Price components"
                     *   "value": "{{item.prices.length}} price components"
                     *   "show_as_tag": true
                     *   "render_condition": "is_composite_price = "true""
                     * }
                     * ```
                     * The value field supports handlebar expressions from which you can pick any field from the entity state.
                     *
                     */
                    SummaryAttribute | string)[];
                    quick_actions?: /* An entity action configured from the entity schema */ EntityAction[];
                };
                sharing?: {
                    /**
                     * Show the sharing button in entity detail view
                     * example:
                     * true
                     */
                    show_sharing_button?: boolean;
                };
            };
            capabilities: /* Capabilities the Entity has. Turn features on/off for entities. */ EntityCapability[];
            /**
             * A dictionary of Group Titles and associated settings if present.
             * example:
             * [
             *   {
             *     "id": "Contact Details",
             *     "label": "Contact Details",
             *     "expanded": true,
             *     "order": 1
             *   },
             *   {
             *     "id": "Address Details",
             *     "label": "Address Details",
             *     "expanded": false,
             *     "order": 2,
             *     "info_tooltip_title": {
             *       "key": "partner.partner_information_group_tooltip",
             *       "default": "These informations are provided by the partner company and cannot be edited."
             *     }
             *   }
             * ]
             */
            group_settings?: {
                label: string;
                id: string;
                expanded?: boolean;
                /**
                 * example:
                 * _is_composite_price = "false"
                 */
                render_condition?: string;
                /**
                 * Render order of the group
                 */
                order?: number;
                /**
                 * This group should only be active when the feature flag is enabled
                 * example:
                 * FF_MY_FEATURE_FLAG
                 */
                feature_flag?: string;
                /**
                 * This group should only be active when all the settings have the correct value
                 */
                settings_flag?: SettingFlag[];
                info_tooltip_title?: {
                    key?: string;
                    default?: string;
                };
                _purpose?: ClassificationId /* uuid */[];
            }[];
            /**
             * Custom grid definitions for the layout. These settings are composed by managed and un-managed properties:
             * - Managed Properties: are interpreted and transformed into layout styles
             * - Un-managed Properties: are appended as styles into the attribute mounting node
             *
             */
            layout_settings?: {
                [name: string]: any;
                /**
                 * Defines the grid gap for the mounting node of the attribute.
                 */
                grid_gap?: string;
                /**
                 * Defines the grid column template for the mounting node of the attribute.
                 */
                grid_template_columns?: string;
            };
            dialog_config?: {
                [name: string]: any;
            };
            /**
             * An ordered list of attributes the entity contains
             * example:
             * [
             *   {
             *     "name": "email",
             *     "type": "email",
             *     "label": "Email",
             *     "required": true
             *   },
             *   {
             *     "name": "first_name",
             *     "type": "string",
             *     "label": "First Name"
             *   },
             *   {
             *     "name": "last_name",
             *     "type": "string",
             *     "label": "Last Name"
             *   },
             *   {
             *     "name": "birthdate",
             *     "type": "date",
             *     "label": "Birthdate"
             *   },
             *   {
             *     "name": "salutation",
             *     "type": "select",
             *     "label": "Salutation",
             *     "options": [
             *       "Mr.",
             *       "Ms. / Mrs.",
             *       "Other"
             *     ]
             *   },
             *   {
             *     "name": "marketing_permission",
             *     "type": "boolean",
             *     "label": "Marketing permission"
             *   },
             *   {
             *     "name": "image",
             *     "type": "file",
             *     "label": "Image"
             *   }
             * ]
             */
            attributes: Attribute[];
            explicit_search_mappings?: /**
             * Advanced: explicit Elasticsearch index mapping definitions for entity data
             *
             * example:
             * {
             *   "image": {
             *     "type": "keyword",
             *     "index": false
             *   }
             * }
             */
            SearchMappings;
        }
        /**
         * The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities.
         */
        export interface EntitySchemaItem {
            id?: /* Generated uuid for schema */ SchemaId /* uuid */;
            created_at?: string;
            updated_at?: string;
            comment?: string;
            source?: {
                id?: string;
                type?: string;
            };
            slug: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            version?: number;
            blueprint?: /* Reference to blueprint */ BlueprintEntityId /* uuid */;
            /**
             * This schema should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This schema should only be active when one of the organization settings is enabled
             */
            enable_setting?: string[];
            /**
             * User-friendly identifier for the entity schema
             * example:
             * Contact
             */
            name: string;
            /**
             * example:
             * Contacts
             */
            plural: string;
            /**
             * example:
             * false
             */
            published?: boolean;
            /**
             * example:
             * false
             */
            draft?: boolean;
            /**
             * example:
             * person
             */
            icon?: string;
            /**
             * Template for rendering the title field. Uses handlebars
             * example:
             * {{first_name}} {{last_name}}
             */
            title_template?: string;
            ui_config?: {
                table_view?: EntityDefaultTable | /**
                 * example:
                 * {
                 *   "type": "redirect",
                 *   "route": "/app/pricing-hub/product/:entityId"
                 * }
                 */
                RedirectEntityView | EntityViewDisabled;
                create_view?: EntityDefaultCreate | /**
                 * example:
                 * {
                 *   "type": "redirect",
                 *   "route": "/app/pricing-hub/product/:entityId"
                 * }
                 */
                RedirectEntityView | EntityViewDisabled;
                edit_view?: EntityDefaultEdit | /**
                 * example:
                 * {
                 *   "type": "redirect",
                 *   "route": "/app/pricing-hub/product/:entityId"
                 * }
                 */
                RedirectEntityView | EntityViewDisabled;
                single_view?: EntityDefaultEdit | /**
                 * example:
                 * {
                 *   "type": "redirect",
                 *   "route": "/app/pricing-hub/product/:entityId"
                 * }
                 */
                RedirectEntityView | EntityViewDisabled;
                list_item?: {
                    summary_attributes?: (/**
                     * Represents an expanded version of an attribute to be displayed in the list item summary.
                     * This configuration can be used in the following way:
                     * ```js
                     * {
                     *   "label": "Price components"
                     *   "value": "{{item.prices.length}} price components"
                     *   "show_as_tag": true
                     *   "render_condition": "is_composite_price = "true""
                     * }
                     * ```
                     * The value field supports handlebar expressions from which you can pick any field from the entity state.
                     *
                     */
                    SummaryAttribute | string)[];
                    quick_actions?: /* An entity action configured from the entity schema */ EntityAction[];
                };
                sharing?: {
                    /**
                     * Show the sharing button in entity detail view
                     * example:
                     * true
                     */
                    show_sharing_button?: boolean;
                };
            };
            capabilities: /* Capabilities the Entity has. Turn features on/off for entities. */ EntityCapability[];
            /**
             * A dictionary of Group Titles and associated settings if present.
             * example:
             * [
             *   {
             *     "id": "Contact Details",
             *     "label": "Contact Details",
             *     "expanded": true,
             *     "order": 1
             *   },
             *   {
             *     "id": "Address Details",
             *     "label": "Address Details",
             *     "expanded": false,
             *     "order": 2,
             *     "info_tooltip_title": {
             *       "key": "partner.partner_information_group_tooltip",
             *       "default": "These informations are provided by the partner company and cannot be edited."
             *     }
             *   }
             * ]
             */
            group_settings?: {
                label: string;
                id: string;
                expanded?: boolean;
                /**
                 * example:
                 * _is_composite_price = "false"
                 */
                render_condition?: string;
                /**
                 * Render order of the group
                 */
                order?: number;
                /**
                 * This group should only be active when the feature flag is enabled
                 * example:
                 * FF_MY_FEATURE_FLAG
                 */
                feature_flag?: string;
                /**
                 * This group should only be active when all the settings have the correct value
                 */
                settings_flag?: SettingFlag[];
                info_tooltip_title?: {
                    key?: string;
                    default?: string;
                };
                _purpose?: ClassificationId /* uuid */[];
            }[];
            /**
             * Custom grid definitions for the layout. These settings are composed by managed and un-managed properties:
             * - Managed Properties: are interpreted and transformed into layout styles
             * - Un-managed Properties: are appended as styles into the attribute mounting node
             *
             */
            layout_settings?: {
                [name: string]: any;
                /**
                 * Defines the grid gap for the mounting node of the attribute.
                 */
                grid_gap?: string;
                /**
                 * Defines the grid column template for the mounting node of the attribute.
                 */
                grid_template_columns?: string;
            };
            dialog_config?: {
                [name: string]: any;
            };
            /**
             * An ordered list of attributes the entity contains
             * example:
             * [
             *   {
             *     "name": "email",
             *     "type": "email",
             *     "label": "Email",
             *     "required": true
             *   },
             *   {
             *     "name": "first_name",
             *     "type": "string",
             *     "label": "First Name"
             *   },
             *   {
             *     "name": "last_name",
             *     "type": "string",
             *     "label": "Last Name"
             *   },
             *   {
             *     "name": "birthdate",
             *     "type": "date",
             *     "label": "Birthdate"
             *   },
             *   {
             *     "name": "salutation",
             *     "type": "select",
             *     "label": "Salutation",
             *     "options": [
             *       "Mr.",
             *       "Ms. / Mrs.",
             *       "Other"
             *     ]
             *   },
             *   {
             *     "name": "marketing_permission",
             *     "type": "boolean",
             *     "label": "Marketing permission"
             *   },
             *   {
             *     "name": "image",
             *     "type": "file",
             *     "label": "Image"
             *   }
             * ]
             */
            attributes: Attribute[];
            explicit_search_mappings?: /**
             * Advanced: explicit Elasticsearch index mapping definitions for entity data
             *
             * example:
             * {
             *   "image": {
             *     "type": "keyword",
             *     "index": false
             *   }
             * }
             */
            SearchMappings;
        }
        export interface EntitySearchParams {
            /**
             * Lucene queries supported with ElasticSearch
             * example:
             * _schema:contact AND status:active
             */
            q: string;
            /**
             * example:
             * _created_at:desc
             */
            sort?: string;
            from?: number;
            /**
             * Max search size is 1000 with higher values defaulting to 1000
             */
            size?: number;
            /**
             * When true, enables entity hydration to resolve nested $relation & $relation_ref references in-place.
             */
            hydrate?: boolean;
            fields?: /**
             * List of entity fields to include or exclude in the response
             *
             * Use ! to exclude fields, e.g. `!_id` to exclude the `_id` field.
             *
             * Globbing and globstart (**) is supported for nested fields.
             *
             * example:
             * [
             *   "_id",
             *   "_title",
             *   "first_name",
             *   "account",
             *   "!account.*._files",
             *   "**._product"
             * ]
             */
            FieldsParam;
            /**
             * Adds a `_score` number field to results that can be used to rank by match score
             */
            include_scores?: boolean;
            /**
             * Aggregation supported by ElasticSearch allows summarizing data as metrics, statistics, or other analytics.
             * example:
             * {
             *   "contact-count-per-tag": {
             *     "terms": {
             *       "field": "_tags.keyword"
             *     }
             *   }
             * }
             */
            aggs?: {
                [key: string]: any;
            };
        }
        export interface EntitySearchResults {
            /**
             * example:
             * 1
             */
            hits?: number;
            results?: /**
             * example:
             * {
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "_org": "123",
             *   "_owners": [
             *     {
             *       "org_id": "123",
             *       "user_id": "123"
             *     },
             *     {
             *       "org_id": "123",
             *       "user_id": "123"
             *     }
             *   ],
             *   "_schema": "contact",
             *   "_tags": [
             *     "example",
             *     "mock",
             *     "example",
             *     "mock"
             *   ],
             *   "_created_at": "2021-02-09T12:41:43.662Z",
             *   "_updated_at": "2021-02-09T12:41:43.662Z",
             *   "_acl": {
             *     "view": [
             *       "org:456",
             *       "org:789",
             *       "org:456",
             *       "org:789"
             *     ],
             *     "edit": [
             *       "org:456",
             *       "org:456"
             *     ],
             *     "delete": [
             *       "org:456",
             *       "org:456"
             *     ]
             *   }
             * }
             */
            EntityItem[];
            /**
             * example:
             * {
             *   "contact-count-per-tag": {
             *     "doc_count_error_upper_bound": 0,
             *     "sum_other_doc_count": 23,
             *     "buckets": [
             *       {
             *         "key": "automation",
             *         "doc_count": 108
             *       },
             *       {
             *         "key": "primary",
             *         "doc_count": 66
             *       }
             *     ]
             *   }
             * }
             */
            aggregations?: {
                [key: string]: any;
            };
        }
        /**
         * URL-friendly identifier for the entity schema
         * example:
         * contact
         */
        export type EntitySlug = string;
        /**
         * Validation error for an entity attribute
         */
        export interface EntityValidationError {
            /**
             * Error code identifier
             * example:
             * custom
             */
            code: string;
            /**
             * Additional parameters for the error
             */
            params: {
                /**
                 * The type of the error
                 * example:
                 * missing_field
                 */
                type?: string;
            };
            /**
             * The path to the attribute that failed validation
             * example:
             * [
             *   "first_name"
             * ]
             */
            path: string[];
            /**
             * A human-readable message describing the error
             * example:
             * Invalid input
             */
            message: string;
        }
        /**
         * Validation result for a failed validation
         */
        export interface EntityValidationResultError {
            status: "error";
            errors: [
                /* Validation error for an entity attribute */ EntityValidationError,
                .../* Validation error for an entity attribute */ EntityValidationError[]
            ];
        }
        /**
         * Validation result for a successful validation
         */
        export interface EntityValidationResultSuccess {
            status: "success";
            errors: [
            ];
        }
        export interface EntityViewDisabled {
            view_type?: "disabled";
        }
        /**
         * The unique identifier of the import job.
         * example:
         * abc123
         */
        export type ExportJobId = string;
        /**
         * List of entity fields to include or exclude in the response
         *
         * Use ! to exclude fields, e.g. `!_id` to exclude the `_id` field.
         *
         * Globbing and globstart (**) is supported for nested fields.
         *
         * example:
         * [
         *   "_id",
         *   "_title",
         *   "first_name",
         *   "account",
         *   "!account.*._files",
         *   "**._product"
         * ]
         */
        export type FieldsParam = string[];
        /**
         * File or Image Attachment
         */
        export interface FileAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type: "image" | "file";
            multiple?: boolean;
            /**
             * List of file extensions (without the dot suffix)
             */
            allowed_extensions?: string[];
            /**
             * Controls how the images are presented to the user during upload on the Entity Details view.
             */
            display_images_landscaped?: boolean;
            /**
             * When set to true, an i18n description will be used alongside the attribute label.
             * This description should be set through the platform locales in the form: `file.{attribute_name}.description_text`.
             *
             */
            enable_description?: boolean;
            default_access_control?: "public-read" | "private";
        }
        export interface GetRelatedEntitiesCount {
            /**
             * example:
             * 1
             */
            hits?: number;
        }
        export type GetRelationsResp = (RelationItem | /**
         * example:
         * {
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "_org": "123",
         *   "_owners": [
         *     {
         *       "org_id": "123",
         *       "user_id": "123"
         *     }
         *   ],
         *   "_schema": "contact",
         *   "_tags": [
         *     "example",
         *     "mock"
         *   ],
         *   "_created_at": "2021-02-09T12:41:43.662Z",
         *   "_updated_at": "2021-02-09T12:41:43.662Z",
         *   "_acl": {
         *     "view": [
         *       "org:456",
         *       "org:789"
         *     ],
         *     "edit": [
         *       "org:456"
         *     ],
         *     "delete": [
         *       "org:456"
         *     ]
         *   }
         * }
         */
        RelationEntity)[];
        export interface GetRelationsRespWithPagination {
            /**
             * example:
             * 1
             */
            hits?: number;
            relations?: GetRelationsResp;
        }
        /**
         * Entity with relation data resolved into the attribute values
         * example:
         * {
         *   "_relations": [
         *     {
         *       "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
         *     }
         *   ],
         *   "status": "active",
         *   "customer_number": "abc123",
         *   "email": [
         *     {
         *       "label": "work",
         *       "email": "user@example.com"
         *     }
         *   ],
         *   "phone": [
         *     {
         *       "label": "work",
         *       "phone": "+49123456789"
         *     }
         *   ],
         *   "first_name": "First Name",
         *   "middle_name": "Middle Name",
         *   "last_name": "Last Name",
         *   "date_of_birth": "2019-08-24",
         *   "title": "Mr.",
         *   "account": [
         *     {
         *       "status": "active",
         *       "name": "Company name",
         *       "company_email": [
         *         {
         *           "label": "Company email",
         *           "email": "company@example.com"
         *         }
         *       ],
         *       "company_phone": [
         *         {
         *           "label": "Support phone",
         *           "phone": "+49123456789"
         *         }
         *       ],
         *       "company_website": "https://example.com",
         *       "tax_id": "DE123456789",
         *       "tax_exemption": "2019-08-24",
         *       "contacts": {
         *         "$relation": [
         *           {
         *             "_tags": [
         *               "CEO"
         *             ],
         *             "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
         *           }
         *         ]
         *       }
         *     }
         *   ]
         * }
         */
        export interface HydratedEntity {
            [name: string]: any;
            _relations: {
                entity_id: EntityId /* uuid */;
            }[];
        }
        /**
         * Entity with relation data resolved into the attribute values
         * example:
         * {
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "_org": "123",
         *   "_owners": [
         *     {
         *       "org_id": "123",
         *       "user_id": "123"
         *     }
         *   ],
         *   "_schema": "contact",
         *   "_tags": [
         *     "example",
         *     "mock"
         *   ],
         *   "_created_at": "2021-02-09T12:41:43.662Z",
         *   "_updated_at": "2021-02-09T12:41:43.662Z",
         *   "_acl": {
         *     "view": [
         *       "org:456",
         *       "org:789"
         *     ],
         *     "edit": [
         *       "org:456"
         *     ],
         *     "delete": [
         *       "org:456"
         *     ]
         *   },
         *   "_relations": [
         *     {
         *       "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
         *     }
         *   ],
         *   "status": "active",
         *   "customer_number": "abc123",
         *   "email": [
         *     {
         *       "label": "work",
         *       "email": "user@example.com"
         *     }
         *   ],
         *   "phone": [
         *     {
         *       "label": "work",
         *       "phone": "+49123456789"
         *     }
         *   ],
         *   "first_name": "First Name",
         *   "middle_name": "Middle Name",
         *   "last_name": "Last Name",
         *   "date_of_birth": "2019-08-24",
         *   "title": "Mr.",
         *   "account": [
         *     {
         *       "status": "active",
         *       "name": "Company name",
         *       "company_email": [
         *         {
         *           "label": "Company email",
         *           "email": "company@example.com"
         *         }
         *       ],
         *       "company_phone": [
         *         {
         *           "label": "Support phone",
         *           "phone": "+49123456789"
         *         }
         *       ],
         *       "company_website": "https://example.com",
         *       "tax_id": "DE123456789",
         *       "tax_exemption": "2019-08-24",
         *       "contacts": {
         *         "$relation": [
         *           {
         *             "_tags": [
         *               "CEO"
         *             ],
         *             "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
         *           }
         *         ]
         *       }
         *     }
         *   ]
         * }
         */
        export interface HydratedEntityItem {
            [name: string]: any;
            _id: EntityId /* uuid */;
            /**
             * Organization Id the entity belongs to
             */
            _org: string;
            _owners?: /**
             * The user / organization owning this entity.
             *
             * Note: Owner implicitly has access to the entity regardless of ACLs.
             *
             */
            EntityOwner[];
            _schema: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            /**
             * Title of entity
             */
            _title: string | null;
            _tags?: string[] | null;
            _created_at: string | null; // date-time
            _updated_at: string | null; // date-time
            _acl?: /* Access control list (ACL) for an entity. Defines sharing access to external orgs or users. */ EntityAcl;
            _relations: {
                entity_id: EntityId /* uuid */;
            }[];
        }
        /**
         * No UI representation
         */
        export interface InternalAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "internal";
        }
        /**
         * Epilot internal user info
         */
        export interface InternalUserAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "internal_user";
        }
        /**
         * Email address for send invitation
         */
        export interface InvitationEmailAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "invitation_email";
        }
        /**
         * Pass 'true' to generate import template
         */
        export type IsTemplate = boolean;
        /**
         * Export headers translation Language
         */
        export type Language = string;
        /**
         * Link with title and href
         */
        export interface LinkAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "link";
        }
        /**
         * Multi Choice Selection
         */
        export interface MultiSelectAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "multiselect" | "checkbox";
            /**
             * controls if the matching of values against the options is case sensitive or not
             */
            disable_case_sensitive?: boolean | null;
            /**
             * controls if the 360 ui will allow the user to enter a value which is not defined by the options
             */
            allow_extra_options?: boolean | null;
            options?: ((string | null) | {
                value: string;
                title?: string;
            })[];
            /**
             * Allow arbitrary input values in addition to provided options
             */
            allow_any?: boolean;
        }
        /**
         * Numeric input
         */
        export interface NumberAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "number";
            format?: string;
        }
        /**
         * Type of attribute to render N number of ordered fields
         */
        export interface OrderedListAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "ordered_list";
        }
        /**
         * Shared Partner Organisations
         */
        export interface PartnerOrganisationAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "partner_organisation";
        }
        /**
         * Partner Status
         */
        export interface PartnerStatusAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "partner_status";
        }
        /**
         * Reference to a payment method attribute of another entity
         */
        export interface PaymentMethodRelationAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "relation_payment_method";
            has_primary?: boolean;
        }
        /**
         * Entity Taxonomy
         */
        export interface PurposeAttribute {
            /**
             * example:
             * Wallbox PV
             */
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            id?: ClassificationId /* uuid */;
            parents?: ClassificationId /* uuid */[];
            created_at?: string; // date-time
            updated_at?: string; // date-time
            type?: "purpose";
        }
        /**
         * example:
         * {
         *   "type": "redirect",
         *   "route": "/app/pricing-hub/product/:entityId"
         * }
         */
        export interface RedirectEntityView {
            view_type?: "redirect";
            /**
             * example:
             * /app/pricing-hub/product/:entityId
             */
            route?: string;
        }
        /**
         * Entity Relationship
         */
        export interface RelationAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "relation";
            relation_type?: "has_many" | "has_one";
            /**
             * Map of schema slug to target relation attribute
             * example:
             * {
             *   "contact": "account",
             *   "opportunity": "customer"
             * }
             */
            reverse_attributes?: {
                [name: string]: string;
            };
            /**
             * Weak relation attributes are kept when duplicating an entity. Strong relation attributes are discarded when duplicating an entity.
             */
            relation_affinity_mode?: "weak" | "strong";
            /**
             * When enable_relation_picker is set to true the user will be able to pick existing relations as values. Otherwise, the user will need to create new relation to link.
             */
            enable_relation_picker?: boolean;
            edit_mode?: "list-view";
            /**
             * Enables the preview, edition, and creation of relation items on a Master-Details view mode.
             */
            details_view_mode_enabled?: boolean;
            /**
             * example:
             * {
             *   "value": [
             *     {
             *       "action_type": "add_existing",
             *       "label": "entityrelation.add_existing",
             *       "default": true
             *     },
             *     {
             *       "action_type": "create_new",
             *       "label": "entityrelation.create_new"
             *     },
             *     {
             *       "action_type": "create_from_existing",
             *       "label": "entityrelation.create_from_existing"
             *     }
             *   ]
             * }
             */
            actions?: {
                /**
                 * The action type. Currently supported actions:
                 *
                 * | action | description |
                 * |--------|-------------|
                 * | add_existing | Enables the user to pick an existing entity to link as relation |
                 * | create_new | Enables the user to create a new entity using the first/main `allowed_schemas` schema
                 * | create_from_existing | Enables the user to pick an existing entity to clone from, while creating a blank new entity to link as relation |
                 *
                 */
                action_type?: "add_existing" | "create_new" | "create_from_existing";
                /**
                 * The action label or action translation key (i18n)
                 */
                label?: string;
                /**
                 * Sets the action as the default action, visible as the main action button.
                 */
                default?: boolean;
                /**
                 * Name of the feature flag that enables this action
                 */
                feature_flag?: string;
                /**
                 * This action should only be active when all the settings have the correct value
                 */
                settings_flag?: SettingFlag[];
                /**
                 * example:
                 * {
                 *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                 *   "_org": "123",
                 *   "_owners": [
                 *     {
                 *       "org_id": "123",
                 *       "user_id": "123"
                 *     },
                 *     {
                 *       "org_id": "123",
                 *       "user_id": "123"
                 *     }
                 *   ],
                 *   "_schema": "contact",
                 *   "_tags": [
                 *     "example",
                 *     "mock",
                 *     "example",
                 *     "mock"
                 *   ],
                 *   "_created_at": "2021-02-09T12:41:43.662Z",
                 *   "_updated_at": "2021-02-09T12:41:43.662Z",
                 *   "_acl": {
                 *     "view": [
                 *       "org:456",
                 *       "org:789",
                 *       "org:456",
                 *       "org:789"
                 *     ],
                 *     "edit": [
                 *       "org:456",
                 *       "org:456"
                 *     ],
                 *     "delete": [
                 *       "org:456",
                 *       "org:456"
                 *     ]
                 *   }
                 * }
                 */
                new_entity_item?: {
                    [name: string]: any;
                    _id: EntityId /* uuid */;
                    /**
                     * Organization Id the entity belongs to
                     */
                    _org: string;
                    _owners?: /**
                     * The user / organization owning this entity.
                     *
                     * Note: Owner implicitly has access to the entity regardless of ACLs.
                     *
                     */
                    EntityOwner[];
                    _schema: /**
                     * URL-friendly identifier for the entity schema
                     * example:
                     * contact
                     */
                    EntitySlug;
                    /**
                     * Title of entity
                     */
                    _title: string | null;
                    _tags?: string[] | null;
                    _created_at: string | null; // date-time
                    _updated_at: string | null; // date-time
                    _acl?: /* Access control list (ACL) for an entity. Defines sharing access to external orgs or users. */ EntityAcl;
                };
            }[];
            drawer_size?: "small" | "medium" | "large";
            summary_fields?: (string | /* Summary Fields are displayed inside list view as a resume of the relation entity. */ SummaryField)[];
            has_primary?: boolean;
            allowedSchemas?: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug[];
            /**
             * When enable_relation_tags is set to true the user will be able to set tags(labels) in each relation item.
             */
            enable_relation_tags?: boolean;
            /**
             * Optional label for the add button. The translated value for add_button_lable is used, if found else the string is used as is.
             */
            add_button_label?: string;
            /**
             * Optional placeholder text for the relation search input. The translated value for search_placeholder is used, if found else the string is used as is.
             */
            search_placeholder?: string;
        }
        /**
         * example:
         * {
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "_org": "123",
         *   "_owners": [
         *     {
         *       "org_id": "123",
         *       "user_id": "123"
         *     }
         *   ],
         *   "_schema": "contact",
         *   "_tags": [
         *     "example",
         *     "mock"
         *   ],
         *   "_created_at": "2021-02-09T12:41:43.662Z",
         *   "_updated_at": "2021-02-09T12:41:43.662Z",
         *   "_acl": {
         *     "view": [
         *       "org:456",
         *       "org:789"
         *     ],
         *     "edit": [
         *       "org:456"
         *     ],
         *     "delete": [
         *       "org:456"
         *     ]
         *   }
         * }
         */
        export interface RelationEntity {
            [name: string]: any;
            _id: EntityId /* uuid */;
            /**
             * Organization Id the entity belongs to
             */
            _org: string;
            _owners?: /**
             * The user / organization owning this entity.
             *
             * Note: Owner implicitly has access to the entity regardless of ACLs.
             *
             */
            EntityOwner[];
            _schema: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            /**
             * Title of entity
             */
            _title: string | null;
            _tags?: string[] | null;
            _created_at: string | null; // date-time
            _updated_at: string | null; // date-time
            _acl?: /* Access control list (ACL) for an entity. Defines sharing access to external orgs or users. */ EntityAcl;
            $relation?: RelationItem;
        }
        export interface RelationItem {
            entity_id: EntityId /* uuid */;
            attribute: string;
            _tags?: string[];
            /**
             * Whether this is a reverse relation
             */
            reverse?: boolean;
        }
        /**
         * Repeatable (add N number of fields)
         */
        export interface RepeatableAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            repeatable?: boolean;
            has_primary?: boolean;
            /**
             * Weak repeatable attributes are kept when duplicating an entity. Strong repeatable attributes are discarded when duplicating an entity.
             */
            relation_affinity_mode?: "weak" | "strong";
            type?: "string" | "phone" | "email" | "address" | "relation" | "payment" | "price_component" | "date";
            /**
             * when enable_relation_picker is set to true the user will be able to pick existing relations as values. Otherwise, the user will need to create new relation to link.
             */
            enable_relation_picker?: boolean;
        }
        /**
         * A saved entity view
         */
        export interface SavedView {
            /**
             * list of schemas a view can belong to
             */
            slug: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug[];
            /**
             * User-friendly identifier for the saved view
             * example:
             * View listing German
             */
            name: string;
            /**
             * Organisation ID a view belongs to
             * example:
             * 66
             */
            org?: string;
            /**
             * boolean property for if a view is shared with organisation
             * example:
             * true
             */
            shared?: boolean;
            /**
             * List of users (IDs) that have favorited the view
             */
            isFavoritedBy?: string[];
            created_by: {
                /**
                 * example:
                 * 10598
                 */
                user_id?: string;
            } | {
                [name: string]: any;
                source?: "SYSTEM" | "BLUEPRINT";
            };
            /**
             * example:
             * {
             *   "filters": {
             *     "customer_name": "suresh test",
             *     "_tags": "360"
             *   },
             *   "table_layout": {
             *     "opportunity": {
             *       "page": 1,
             *       "sort": "_created_at:desc",
             *       "pageSize": 25,
             *       "columnSettings": []
             *     }
             *   }
             * }
             */
            ui_config: {
                [name: string]: any;
            };
        }
        /**
         * Generated uuid for a saved view
         */
        export type SavedViewId = string; // uuid
        /**
         * A saved entity view
         */
        export interface SavedViewItem {
            id?: /* Generated uuid for a saved view */ SavedViewId /* uuid */;
            created_at?: string;
            updated_at?: string;
            /**
             * list of schemas a view can belong to
             */
            slug: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug[];
            /**
             * User-friendly identifier for the saved view
             * example:
             * View listing German
             */
            name: string;
            /**
             * Organisation ID a view belongs to
             * example:
             * 66
             */
            org?: string;
            /**
             * boolean property for if a view is shared with organisation
             * example:
             * true
             */
            shared?: boolean;
            /**
             * List of users (IDs) that have favorited the view
             */
            isFavoritedBy?: string[];
            created_by: {
                /**
                 * example:
                 * 10598
                 */
                user_id?: string;
            } | {
                [name: string]: any;
                source?: "SYSTEM" | "BLUEPRINT";
            };
            /**
             * example:
             * {
             *   "filters": {
             *     "customer_name": "suresh test",
             *     "_tags": "360"
             *   },
             *   "table_layout": {
             *     "opportunity": {
             *       "page": 1,
             *       "sort": "_created_at:desc",
             *       "pageSize": 25,
             *       "columnSettings": []
             *     }
             *   }
             * }
             */
            ui_config: {
                [name: string]: any;
            };
        }
        /**
         * Generated uuid for schema
         */
        export type SchemaId = string; // uuid
        /**
         * Advanced: explicit Elasticsearch index mapping definitions for entity data
         *
         * example:
         * {
         *   "image": {
         *     "type": "keyword",
         *     "index": false
         *   }
         * }
         */
        export interface SearchMappings {
            [name: string]: {
                index?: boolean;
                type?: "keyword" | "text" | "boolean" | "integer" | "long" | "float" | "date" | "flattened" | "nested";
                fields?: {
                    [name: string]: any;
                };
            };
        }
        /**
         * Dropdown select
         */
        export interface SelectAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "select" | "radio";
            options?: ({
                value: string;
                title?: string;
            } | (string | null))[];
            /**
             * Allow arbitrary input values in addition to provided options
             */
            allow_any?: boolean;
        }
        /**
         * Sequence of unique identifiers
         */
        export interface SequenceAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "sequence";
            /**
             * Prefix added before the sequence number
             * example:
             * OR-
             */
            prefix?: string;
            start_number?: number;
        }
        export interface SettingFlag {
            /**
             * The name of the organization setting to check
             */
            name?: string;
            /**
             * Whether the setting should be enabled or not
             */
            enabled?: boolean;
        }
        /**
         * Status select
         */
        export interface StatusAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "status";
            options?: ((string | null) | {
                /**
                 * The stored value of the option
                 */
                value: string;
                /**
                 * The displayed title of the option
                 */
                title?: string;
            })[];
        }
        /**
         * Represents an expanded version of an attribute to be displayed in the list item summary.
         * This configuration can be used in the following way:
         * ```js
         * {
         *   "label": "Price components"
         *   "value": "{{item.prices.length}} price components"
         *   "show_as_tag": true
         *   "render_condition": "is_composite_price = "true""
         * }
         * ```
         * The value field supports handlebar expressions from which you can pick any field from the entity state.
         *
         */
        export interface SummaryAttribute {
            /**
             * Label to be shown on the top of the value.
             */
            label: string;
            /**
             * A static value or an handlebar expression.
             */
            value: string;
            /**
             * Displays the value within a tag chip.
             */
            show_as_tag?: boolean;
            /**
             * CSS hex color or CSS color name for the tag chip.
             */
            tag_color?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            /**
             * Binds summary field visibility to the feature flag state.
             */
            feature_flag?: string;
            /**
             * This summary attribute should only be visible when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
        }
        /**
         * Summary Fields are displayed inside list view as a resume of the relation entity.
         */
        export interface SummaryField {
            /**
             * The field from the entity attributes to display
             */
            field?: string;
            /**
             * An hint on how to display the summary field
             */
            display_as?: string;
        }
        /**
         * Tags
         */
        export interface TagsAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "tags";
            options?: string[];
            suggestions?: string[];
        }
        export interface Taxonomy {
            slug: /**
             * URL-friendly name for taxonomy
             * example:
             * purpose
             */
            TaxonomySlug;
            /**
             * A human friendly name of a Taxonomy e.g. Purpose, Product Category, Folder, Tag
             * example:
             * Purpose
             */
            name: string;
            /**
             * Plural name of a Taxonomy e.g. Purposes, Product Categories, Folders, Tags
             * example:
             * Purposes
             */
            plural?: string;
            created_at?: string; // date-time
            updated_at?: string; // date-time
        }
        export interface TaxonomyClassification {
            id?: ClassificationId /* uuid */;
            /**
             * example:
             * Wallbox PV
             */
            name: string;
            parents?: ClassificationId /* uuid */[];
            created_at?: string; // date-time
            updated_at?: string; // date-time
        }
        /**
         * URL-friendly name for taxonomy
         * example:
         * purpose
         */
        export type TaxonomySlug = string;
        /**
         * Textarea or text input
         */
        export interface TextAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "string";
            multiline?: boolean;
        }
        /**
         * User Relationship
         */
        export interface UserRelationAttribute {
            name: string;
            label: string;
            placeholder?: string;
            /**
             * Do not render attribute in entity views
             */
            hidden?: boolean;
            /**
             * Render as a column in table views. When defined, overrides `hidden`
             */
            show_in_table?: boolean;
            /**
             * Allow sorting by this attribute in table views if `show_in_table` is true
             */
            sortable?: boolean;
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: any;
            /**
             * Which group the attribute should appear in. Accepts group ID or group name
             */
            group?: string;
            /**
             * Attribute sort order (ascending) in group
             * example:
             * 0
             */
            order?: number;
            /**
             * example:
             * full_width
             */
            layout?: string;
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * Code name of the icon to used to represent this attribute.
             * The value must be a valid @epilot/base-elements Icon name
             *
             */
            icon?: string;
            /**
             * Defines the conditional rendering expression for showing this field.
             * When a valid expression is parsed, their evaluation defines the visibility of this attribute.
             * Note: Empty or invalid expression have no effect on the field visibility.
             *
             */
            render_condition?: string;
            _purpose?: ClassificationId /* uuid */[];
            /**
             * A set of constraints applicable to the attribute.
             * These constraints should and will be enforced by the attribute renderer.
             *
             * example:
             * {
             *   "disablePast": true
             * }
             */
            constraints?: {
                [key: string]: any;
            };
            /**
             * This attribute should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
            /**
             * This attribute should only be active when all the settings have the correct value
             */
            settings_flag?: SettingFlag[];
            value_formatter?: string;
            preview_value_formatter?: string;
            /**
             * Setting to `true` disables editing the attribute on the entity builder UI
             */
            entity_builder_disable_edit?: boolean;
            /**
             * Setting to `true` prevents the attribute from being modified / deleted
             */
            protected?: boolean;
            /**
             * A set of configurations meant to document and assist the user in filling the attribute.
             */
            info_helpers?: {
                /**
                 * The text to be displayed in the attribute hint helper.
                 * When specified it overrides the `hint_text_key` configuration.
                 *
                 */
                hint_text?: string;
                /**
                 * The key of the hint text to be displayed in the attribute hint helper.
                 * The key should be a valid i18n key.
                 *
                 */
                hint_text_key?: string;
                /**
                 * The name of the custom component to be used as the hint helper.
                 * The component should be registered in the `@epilot360/entity-ui` on the index of the components directory.
                 * When specified it overrides the `hint_text` or `hint_text_key` configuration.
                 *
                 */
                hint_custom_component?: string;
                /**
                 * The placement of the hint tooltip.
                 * The value should be a valid `@mui/core` tooltip placement.
                 *
                 * example:
                 * top
                 */
                hint_tooltip_placement?: string;
            };
            type?: "relation_user";
            multiple?: boolean;
        }
    }
}
declare namespace Paths {
    namespace AddRelations {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid */;
            export type Async = boolean;
            export type Id = Components.Schemas.EntityId /* uuid */;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            id: Parameters.Id;
        }
        export interface QueryParameters {
            async?: Parameters.Async;
            activity_id?: Parameters.ActivityId;
        }
        export type RequestBody = Components.Schemas.RelationItem[];
        namespace Responses {
            export type $200 = Components.Schemas.RelationItem;
        }
    }
    namespace AttachActivity {
        namespace Parameters {
            export type Entities = Components.Schemas.EntityId /* uuid */[];
            export type Id = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            entities?: Parameters.Entities;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ActivityItem;
        }
    }
    namespace Autocomplete {
        namespace Parameters {
            /**
             * example:
             * _tags
             */
            export type Attribute = string;
            export type Input = string;
            export type Size = number;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface QueryParameters {
            input?: Parameters.Input;
            attribute: /**
             * example:
             * _tags
             */
            Parameters.Attribute;
            slug?: Parameters.Slug;
            size?: Parameters.Size;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 1
                 */
                hits?: number;
                /**
                 * example:
                 * [
                 *   "value"
                 * ]
                 */
                results?: (string | boolean | {
                    [name: string]: any;
                })[];
            }
        }
    }
    namespace CreateActivity {
        namespace Parameters {
            export type Entities = Components.Schemas.EntityId /* uuid */[];
        }
        export interface QueryParameters {
            entities?: Parameters.Entities;
        }
        export type RequestBody = Components.Schemas.Activity;
        namespace Responses {
            export type $200 = Components.Schemas.ActivityItem;
        }
    }
    namespace CreateEntity {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid */;
            export type Async = boolean;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        export interface QueryParameters {
            activity_id?: Parameters.ActivityId;
            async?: Parameters.Async;
        }
        export type RequestBody = /**
         * example:
         * {
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "_org": "123",
         *   "_owners": [
         *     {
         *       "org_id": "123",
         *       "user_id": "123"
         *     }
         *   ],
         *   "_schema": "contact",
         *   "_tags": [
         *     "example",
         *     "mock"
         *   ],
         *   "_created_at": "2021-02-09T12:41:43.662Z",
         *   "_updated_at": "2021-02-09T12:41:43.662Z",
         *   "_acl": {
         *     "view": [
         *       "org:456",
         *       "org:789"
         *     ],
         *     "edit": [
         *       "org:456"
         *     ],
         *     "delete": [
         *       "org:456"
         *     ]
         *   }
         * }
         */
        Components.Schemas.Entity;
        namespace Responses {
            export type $201 = /**
             * example:
             * {
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "_org": "123",
             *   "_owners": [
             *     {
             *       "org_id": "123",
             *       "user_id": "123"
             *     },
             *     {
             *       "org_id": "123",
             *       "user_id": "123"
             *     }
             *   ],
             *   "_schema": "contact",
             *   "_tags": [
             *     "example",
             *     "mock",
             *     "example",
             *     "mock"
             *   ],
             *   "_created_at": "2021-02-09T12:41:43.662Z",
             *   "_updated_at": "2021-02-09T12:41:43.662Z",
             *   "_acl": {
             *     "view": [
             *       "org:456",
             *       "org:789",
             *       "org:456",
             *       "org:789"
             *     ],
             *     "edit": [
             *       "org:456",
             *       "org:456"
             *     ],
             *     "delete": [
             *       "org:456",
             *       "org:456"
             *     ]
             *   }
             * }
             */
            Components.Schemas.EntityItem;
        }
    }
    namespace CreateSavedView {
        export type RequestBody = /* A saved entity view */ Components.Schemas.SavedView;
        namespace Responses {
            export type $201 = /* A saved entity view */ Components.Schemas.SavedViewItem;
        }
    }
    namespace DeleteEntity {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid */;
            export type Id = Components.Schemas.EntityId /* uuid */;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            id: Parameters.Id;
        }
        export interface QueryParameters {
            activity_id?: Parameters.ActivityId;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace DeleteRelation {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid */;
            export type Async = boolean;
            export type Attribute = string;
            export type EntityId = string;
            export type Id = Components.Schemas.EntityId /* uuid */;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            id: Parameters.Id;
            attribute: Parameters.Attribute;
            entity_id: Parameters.EntityId;
        }
        export interface QueryParameters {
            async?: Parameters.Async;
            activity_id?: Parameters.ActivityId;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DeleteSavedView {
        namespace Parameters {
            export type Id = /* Generated uuid for a saved view */ Components.Schemas.SavedViewId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace DeleteSchema {
        namespace Parameters {
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace ExportEntities {
        namespace Parameters {
            export type IsTemplate = /* Pass 'true' to generate import template */ Components.Schemas.IsTemplate;
            export type JobId = /**
             * The unique identifier of the import job.
             * example:
             * abc123
             */
            Components.Schemas.ExportJobId;
            export type Language = /* Export headers translation Language */ Components.Schemas.Language;
        }
        export interface QueryParameters {
            job_id?: Parameters.JobId;
            is_template?: Parameters.IsTemplate;
            language?: Parameters.Language;
        }
        export type RequestBody = Components.Schemas.EntitySearchParams;
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace GetActivity {
        namespace Parameters {
            export type Id = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid */;
            export type OperationsFrom = number;
            export type OperationsSize = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            operations_size?: Parameters.OperationsSize;
            operations_from?: Parameters.OperationsFrom;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ActivityItem;
        }
    }
    namespace GetEntity {
        namespace Parameters {
            export type Hydrate = boolean;
            export type Id = Components.Schemas.EntityId /* uuid */;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            id: Parameters.Id;
            slug: Parameters.Slug;
        }
        export interface QueryParameters {
            hydrate?: Parameters.Hydrate;
        }
        namespace Responses {
            export interface $200 {
                entity?: /**
                 * example:
                 * {
                 *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                 *   "_org": "123",
                 *   "_owners": [
                 *     {
                 *       "org_id": "123",
                 *       "user_id": "123"
                 *     },
                 *     {
                 *       "org_id": "123",
                 *       "user_id": "123"
                 *     }
                 *   ],
                 *   "_schema": "contact",
                 *   "_tags": [
                 *     "example",
                 *     "mock",
                 *     "example",
                 *     "mock"
                 *   ],
                 *   "_created_at": "2021-02-09T12:41:43.662Z",
                 *   "_updated_at": "2021-02-09T12:41:43.662Z",
                 *   "_acl": {
                 *     "view": [
                 *       "org:456",
                 *       "org:789",
                 *       "org:456",
                 *       "org:789"
                 *     ],
                 *     "edit": [
                 *       "org:456",
                 *       "org:456"
                 *     ],
                 *     "delete": [
                 *       "org:456",
                 *       "org:456"
                 *     ]
                 *   }
                 * }
                 */
                Components.Schemas.EntityItem;
                relations?: /**
                 * example:
                 * {
                 *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                 *   "_org": "123",
                 *   "_owners": [
                 *     {
                 *       "org_id": "123",
                 *       "user_id": "123"
                 *     },
                 *     {
                 *       "org_id": "123",
                 *       "user_id": "123"
                 *     }
                 *   ],
                 *   "_schema": "contact",
                 *   "_tags": [
                 *     "example",
                 *     "mock",
                 *     "example",
                 *     "mock"
                 *   ],
                 *   "_created_at": "2021-02-09T12:41:43.662Z",
                 *   "_updated_at": "2021-02-09T12:41:43.662Z",
                 *   "_acl": {
                 *     "view": [
                 *       "org:456",
                 *       "org:789",
                 *       "org:456",
                 *       "org:789"
                 *     ],
                 *     "edit": [
                 *       "org:456",
                 *       "org:456"
                 *     ],
                 *     "delete": [
                 *       "org:456",
                 *       "org:456"
                 *     ]
                 *   }
                 * }
                 */
                Components.Schemas.EntityItem[];
            }
        }
    }
    namespace GetEntityActivityFeed {
        namespace Parameters {
            export type After = string; // date-time
            export type Before = string; // date-time
            export type From = number;
            export type Id = Components.Schemas.EntityId /* uuid */;
            export type IncludeRelations = boolean;
            export type Size = number;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
            /**
             * example:
             * SyncActivity
             */
            export type Type = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            id: Parameters.Id;
        }
        export interface QueryParameters {
            after?: Parameters.After /* date-time */;
            before?: Parameters.Before /* date-time */;
            from?: Parameters.From;
            size?: Parameters.Size;
            type?: /**
             * example:
             * SyncActivity
             */
            Parameters.Type;
            include_relations?: Parameters.IncludeRelations;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 1
                 */
                total?: number;
                results?: Components.Schemas.ActivityItem[];
            }
        }
    }
    namespace GetEntityV2 {
        namespace Parameters {
            export type Fields = /**
             * List of entity fields to include or exclude in the response
             *
             * Use ! to exclude fields, e.g. `!_id` to exclude the `_id` field.
             *
             * Globbing and globstart (**) is supported for nested fields.
             *
             * example:
             * [
             *   "_id",
             *   "_title",
             *   "first_name",
             *   "account",
             *   "!account.*._files",
             *   "**._product"
             * ]
             */
            Components.Schemas.FieldsParam;
            export type Hydrate = boolean;
            export type Id = Components.Schemas.EntityId /* uuid */;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            id: Parameters.Id;
            slug: Parameters.Slug;
        }
        export interface QueryParameters {
            hydrate?: Parameters.Hydrate;
            fields?: Parameters.Fields;
        }
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "_org": "123",
             *   "_owners": [
             *     {
             *       "org_id": "123",
             *       "user_id": "123"
             *     },
             *     {
             *       "org_id": "123",
             *       "user_id": "123"
             *     }
             *   ],
             *   "_schema": "contact",
             *   "_tags": [
             *     "example",
             *     "mock",
             *     "example",
             *     "mock"
             *   ],
             *   "_created_at": "2021-02-09T12:41:43.662Z",
             *   "_updated_at": "2021-02-09T12:41:43.662Z",
             *   "_acl": {
             *     "view": [
             *       "org:456",
             *       "org:789",
             *       "org:456",
             *       "org:789"
             *     ],
             *     "edit": [
             *       "org:456",
             *       "org:456"
             *     ],
             *     "delete": [
             *       "org:456",
             *       "org:456"
             *     ]
             *   }
             * }
             */
            Components.Schemas.EntityItem;
        }
    }
    namespace GetRelatedEntitiesCount {
        namespace Parameters {
            export type ExcludeSchemas = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug[];
            export type Id = Components.Schemas.EntityId /* uuid */;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            id: Parameters.Id;
        }
        export interface QueryParameters {
            exclude_schemas?: Parameters.ExcludeSchemas;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetRelatedEntitiesCount;
        }
    }
    namespace GetRelations {
        namespace Parameters {
            export type ExcludeSchemas = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug[];
            export type From = number;
            export type Hydrate = boolean;
            export type Id = Components.Schemas.EntityId /* uuid */;
            export type IncludeReverse = boolean;
            export type IncludeSchemas = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug[];
            export type Size = number;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            id: Parameters.Id;
        }
        export interface QueryParameters {
            hydrate?: Parameters.Hydrate;
            include_reverse?: Parameters.IncludeReverse;
            from?: Parameters.From;
            size?: Parameters.Size;
            include_schemas?: Parameters.IncludeSchemas;
            exclude_schemas?: Parameters.ExcludeSchemas;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetRelationsResp;
        }
    }
    namespace GetRelationsV2 {
        namespace Parameters {
            export type Fields = /**
             * List of entity fields to include or exclude in the response
             *
             * Use ! to exclude fields, e.g. `!_id` to exclude the `_id` field.
             *
             * Globbing and globstart (**) is supported for nested fields.
             *
             * example:
             * [
             *   "_id",
             *   "_title",
             *   "first_name",
             *   "account",
             *   "!account.*._files",
             *   "**._product"
             * ]
             */
            Components.Schemas.FieldsParam;
            export type From = number;
            export type Hydrate = boolean;
            export type Id = Components.Schemas.EntityId /* uuid */;
            export type IncludeReverse = boolean;
            export type Query = string;
            export type Size = number;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            id: Parameters.Id;
        }
        export interface QueryParameters {
            hydrate?: Parameters.Hydrate;
            query?: Parameters.Query;
            include_reverse?: Parameters.IncludeReverse;
            from?: Parameters.From;
            size?: Parameters.Size;
            fields?: Parameters.Fields;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetRelationsRespWithPagination;
        }
    }
    namespace GetRelationsV3 {
        namespace Parameters {
            export type ExcludeSchemas = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug[];
            export type From = number;
            export type Hydrate = boolean;
            export type Id = Components.Schemas.EntityId /* uuid */;
            export type IncludeReverse = boolean;
            export type IncludeSchemas = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug[];
            export type Mode = "direct" | "reverse" | "both";
            export type Size = number;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            id: Parameters.Id;
        }
        export interface QueryParameters {
            hydrate?: Parameters.Hydrate;
            include_reverse?: Parameters.IncludeReverse;
            from?: Parameters.From;
            size?: Parameters.Size;
            include_schemas?: Parameters.IncludeSchemas;
            exclude_schemas?: Parameters.ExcludeSchemas;
            mode?: Parameters.Mode;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetRelationsRespWithPagination;
        }
    }
    namespace GetSavedView {
        namespace Parameters {
            export type Id = /* Generated uuid for a saved view */ Components.Schemas.SavedViewId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                view?: /* A saved entity view */ Components.Schemas.SavedViewItem;
            }
        }
    }
    namespace GetSchema {
        namespace Parameters {
            export type Id = /* Generated uuid for schema */ Components.Schemas.SchemaId /* uuid */;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        export interface QueryParameters {
            id?: Parameters.Id;
        }
        namespace Responses {
            export type $200 = /* The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities. */ Components.Schemas.EntitySchemaItem;
        }
    }
    namespace GetSchemaVersions {
        namespace Parameters {
            export type DraftsFrom = number;
            export type DraftsSize = number;
            /**
             * example:
             * [
             *   "id",
             *   "attributes",
             *   "capabilites"
             * ]
             */
            export type Fields = string[];
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
            export type VersionsFrom = number;
            export type VersionsSize = number;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        export interface QueryParameters {
            versions_from?: Parameters.VersionsFrom;
            versions_size?: Parameters.VersionsSize;
            drafts_from?: Parameters.DraftsFrom;
            drafts_size?: Parameters.DraftsSize;
            fields?: /**
             * example:
             * [
             *   "id",
             *   "attributes",
             *   "capabilites"
             * ]
             */
            Parameters.Fields;
        }
        namespace Responses {
            export interface $200 {
                versions?: /* The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities. */ Components.Schemas.EntitySchemaItem[];
                drafts?: /* The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities. */ Components.Schemas.EntitySchemaItem[];
            }
        }
    }
    namespace GetTaxonomy {
        namespace Parameters {
            export type TaxonomySlug = string;
        }
        export interface PathParameters {
            taxonomySlug: Parameters.TaxonomySlug;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Taxonomy;
        }
    }
    namespace ImportEntities {
        namespace Parameters {
            export type JobId = /**
             * The unique identifier of the import job.
             * example:
             * abc123
             */
            Components.Schemas.ExportJobId;
        }
        export interface QueryParameters {
            job_id?: Parameters.JobId;
        }
        export type RequestBody = /* The parameters for importing entities. */ Components.Schemas.EntityImportParams;
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace ListFavoriteViewsForUser {
        namespace Responses {
            export interface $200 {
                results?: /* A saved entity view */ Components.Schemas.SavedViewItem[];
            }
        }
    }
    namespace ListSavedViews {
        namespace Parameters {
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface QueryParameters {
            slug?: Parameters.Slug;
        }
        namespace Responses {
            export interface $200 {
                results?: /* A saved entity view */ Components.Schemas.SavedViewItem[];
            }
        }
    }
    namespace ListSchemaBlueprints {
        namespace Responses {
            export interface $200 {
                results?: /* The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities. */ Components.Schemas.EntitySchemaItem[];
            }
        }
    }
    namespace ListSchemas {
        namespace Parameters {
            export type Unpublished = boolean;
        }
        export interface QueryParameters {
            unpublished?: Parameters.Unpublished;
        }
        namespace Responses {
            export interface $200 {
                results?: /* The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities. */ Components.Schemas.EntitySchemaItem[];
            }
        }
    }
    namespace ListTaxonomies {
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.Taxonomy[];
            }
        }
    }
    namespace ListTaxonomyClassificationsForSchema {
        namespace Parameters {
            export type Query = string;
            export type Size = number;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
            export type TaxonomySlug = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            taxonomySlug: Parameters.TaxonomySlug;
        }
        export interface QueryParameters {
            query?: Parameters.Query;
            size?: Parameters.Size;
        }
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.TaxonomyClassification[];
            }
        }
    }
    namespace PatchEntity {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid */;
            export type Async = boolean;
            export type DryRun = boolean;
            export type Id = Components.Schemas.EntityId /* uuid */;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            id: Parameters.Id;
        }
        export interface QueryParameters {
            activity_id?: Parameters.ActivityId;
            dry_run?: Parameters.DryRun;
            async?: Parameters.Async;
        }
        export type RequestBody = /**
         * example:
         * {
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "_org": "123",
         *   "_owners": [
         *     {
         *       "org_id": "123",
         *       "user_id": "123"
         *     }
         *   ],
         *   "_schema": "contact",
         *   "_tags": [
         *     "example",
         *     "mock"
         *   ],
         *   "_created_at": "2021-02-09T12:41:43.662Z",
         *   "_updated_at": "2021-02-09T12:41:43.662Z",
         *   "_acl": {
         *     "view": [
         *       "org:456",
         *       "org:789"
         *     ],
         *     "edit": [
         *       "org:456"
         *     ],
         *     "delete": [
         *       "org:456"
         *     ]
         *   }
         * }
         */
        Components.Schemas.Entity;
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "_org": "123",
             *   "_owners": [
             *     {
             *       "org_id": "123",
             *       "user_id": "123"
             *     },
             *     {
             *       "org_id": "123",
             *       "user_id": "123"
             *     }
             *   ],
             *   "_schema": "contact",
             *   "_tags": [
             *     "example",
             *     "mock",
             *     "example",
             *     "mock"
             *   ],
             *   "_created_at": "2021-02-09T12:41:43.662Z",
             *   "_updated_at": "2021-02-09T12:41:43.662Z",
             *   "_acl": {
             *     "view": [
             *       "org:456",
             *       "org:789",
             *       "org:456",
             *       "org:789"
             *     ],
             *     "edit": [
             *       "org:456",
             *       "org:456"
             *     ],
             *     "delete": [
             *       "org:456",
             *       "org:456"
             *     ]
             *   }
             * }
             */
            Components.Schemas.EntityItem;
            export interface $409 {
            }
        }
    }
    namespace PutSchema {
        namespace Parameters {
            export type Draft = boolean;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        export interface QueryParameters {
            draft?: Parameters.Draft;
        }
        export type RequestBody = /* The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities. */ Components.Schemas.EntitySchema;
        namespace Responses {
            export type $200 = /* The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities. */ Components.Schemas.EntitySchemaItem;
        }
    }
    namespace SearchEntities {
        export type RequestBody = Components.Schemas.EntitySearchParams;
        namespace Responses {
            export type $200 = Components.Schemas.EntitySearchResults;
        }
    }
    namespace TaxonomiesClassificationsSearch {
        namespace Parameters {
            export type TaxonomySlug = string;
        }
        export interface QueryParameters {
            taxonomySlug: Parameters.TaxonomySlug;
        }
        export interface RequestBody {
            classificationIds?: Components.Schemas.ClassificationId /* uuid */[];
        }
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.TaxonomyClassification[];
            }
        }
    }
    namespace TaxonomyAutocomplete {
        namespace Parameters {
            export type Query = string;
            export type Size = number;
            export type TaxonomySlug = string;
        }
        export interface PathParameters {
            taxonomySlug: Parameters.TaxonomySlug;
        }
        export interface QueryParameters {
            query?: Parameters.Query;
            size?: Parameters.Size;
        }
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.TaxonomyClassification[];
            }
        }
    }
    namespace UpdateClassificationsForTaxonomy {
        namespace Parameters {
            export type TaxonomySlug = string;
        }
        export interface PathParameters {
            taxonomySlug: Parameters.TaxonomySlug;
        }
        export type RequestBody = Components.Schemas.ClassificationsUpdate;
        namespace Responses {
            export interface $200 {
                created?: Components.Schemas.TaxonomyClassification[];
                updated?: Components.Schemas.TaxonomyClassification[];
                deleted?: {
                    [key: string]: any;
                };
            }
        }
    }
    namespace UpdateEntity {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid */;
            export type Async = boolean;
            export type Id = Components.Schemas.EntityId /* uuid */;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            id: Parameters.Id;
        }
        export interface QueryParameters {
            activity_id?: Parameters.ActivityId;
            async?: Parameters.Async;
        }
        export type RequestBody = /**
         * example:
         * {
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "_org": "123",
         *   "_owners": [
         *     {
         *       "org_id": "123",
         *       "user_id": "123"
         *     }
         *   ],
         *   "_schema": "contact",
         *   "_tags": [
         *     "example",
         *     "mock"
         *   ],
         *   "_created_at": "2021-02-09T12:41:43.662Z",
         *   "_updated_at": "2021-02-09T12:41:43.662Z",
         *   "_acl": {
         *     "view": [
         *       "org:456",
         *       "org:789"
         *     ],
         *     "edit": [
         *       "org:456"
         *     ],
         *     "delete": [
         *       "org:456"
         *     ]
         *   }
         * }
         */
        Components.Schemas.Entity;
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "_org": "123",
             *   "_owners": [
             *     {
             *       "org_id": "123",
             *       "user_id": "123"
             *     },
             *     {
             *       "org_id": "123",
             *       "user_id": "123"
             *     }
             *   ],
             *   "_schema": "contact",
             *   "_tags": [
             *     "example",
             *     "mock",
             *     "example",
             *     "mock"
             *   ],
             *   "_created_at": "2021-02-09T12:41:43.662Z",
             *   "_updated_at": "2021-02-09T12:41:43.662Z",
             *   "_acl": {
             *     "view": [
             *       "org:456",
             *       "org:789",
             *       "org:456",
             *       "org:789"
             *     ],
             *     "edit": [
             *       "org:456",
             *       "org:456"
             *     ],
             *     "delete": [
             *       "org:456",
             *       "org:456"
             *     ]
             *   }
             * }
             */
            Components.Schemas.EntityItem;
        }
    }
    namespace UpdateRelation {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid */;
            export type Async = boolean;
            export type Attribute = string;
            export type EntityId = string;
            export type Id = Components.Schemas.EntityId /* uuid */;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            id: Parameters.Id;
            attribute: Parameters.Attribute;
            entity_id: Parameters.EntityId;
        }
        export interface QueryParameters {
            async?: Parameters.Async;
            activity_id?: Parameters.ActivityId;
        }
        export interface RequestBody {
            _tags?: string[];
        }
        namespace Responses {
            export type $200 = Components.Schemas.RelationItem;
        }
    }
    namespace UpdateSavedView {
        namespace Parameters {
            export type Id = /* Generated uuid for a saved view */ Components.Schemas.SavedViewId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = /* A saved entity view */ Components.Schemas.SavedView;
        namespace Responses {
            export type $200 = /* A saved entity view */ Components.Schemas.SavedViewItem;
        }
    }
    namespace UpsertEntity {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid */;
            export type Async = boolean;
            export type DryRun = boolean;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        export interface QueryParameters {
            activity_id?: Parameters.ActivityId;
            dry_run?: Parameters.DryRun;
            async?: Parameters.Async;
        }
        export interface RequestBody {
            /**
             * example:
             * [
             *   "_id"
             * ]
             */
            unique_key: string[];
            entity: /**
             * example:
             * {
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "_org": "123",
             *   "_owners": [
             *     {
             *       "org_id": "123",
             *       "user_id": "123"
             *     }
             *   ],
             *   "_schema": "contact",
             *   "_tags": [
             *     "example",
             *     "mock"
             *   ],
             *   "_created_at": "2021-02-09T12:41:43.662Z",
             *   "_updated_at": "2021-02-09T12:41:43.662Z",
             *   "_acl": {
             *     "view": [
             *       "org:456",
             *       "org:789"
             *     ],
             *     "edit": [
             *       "org:456"
             *     ],
             *     "delete": [
             *       "org:456"
             *     ]
             *   }
             * }
             */
            Components.Schemas.Entity;
        }
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "_org": "123",
             *   "_owners": [
             *     {
             *       "org_id": "123",
             *       "user_id": "123"
             *     },
             *     {
             *       "org_id": "123",
             *       "user_id": "123"
             *     }
             *   ],
             *   "_schema": "contact",
             *   "_tags": [
             *     "example",
             *     "mock",
             *     "example",
             *     "mock"
             *   ],
             *   "_created_at": "2021-02-09T12:41:43.662Z",
             *   "_updated_at": "2021-02-09T12:41:43.662Z",
             *   "_acl": {
             *     "view": [
             *       "org:456",
             *       "org:789",
             *       "org:456",
             *       "org:789"
             *     ],
             *     "edit": [
             *       "org:456",
             *       "org:456"
             *     ],
             *     "delete": [
             *       "org:456",
             *       "org:456"
             *     ]
             *   }
             * }
             */
            Components.Schemas.EntityItem;
            export type $201 = /**
             * example:
             * {
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "_org": "123",
             *   "_owners": [
             *     {
             *       "org_id": "123",
             *       "user_id": "123"
             *     },
             *     {
             *       "org_id": "123",
             *       "user_id": "123"
             *     }
             *   ],
             *   "_schema": "contact",
             *   "_tags": [
             *     "example",
             *     "mock",
             *     "example",
             *     "mock"
             *   ],
             *   "_created_at": "2021-02-09T12:41:43.662Z",
             *   "_updated_at": "2021-02-09T12:41:43.662Z",
             *   "_acl": {
             *     "view": [
             *       "org:456",
             *       "org:789",
             *       "org:456",
             *       "org:789"
             *     ],
             *     "edit": [
             *       "org:456",
             *       "org:456"
             *     ],
             *     "delete": [
             *       "org:456",
             *       "org:456"
             *     ]
             *   }
             * }
             */
            Components.Schemas.EntityItem;
            export interface $409 {
            }
        }
    }
    namespace ValidateEntity {
        namespace Parameters {
            /**
             * URL-friendly identifier for the entity schema
             * example:
             * price
             */
            export type Slug = string;
        }
        export interface PathParameters {
            slug: /**
             * URL-friendly identifier for the entity schema
             * example:
             * price
             */
            Parameters.Slug;
        }
        export type RequestBody = /**
         * example:
         * {
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "_org": "123",
         *   "_owners": [
         *     {
         *       "org_id": "123",
         *       "user_id": "123"
         *     }
         *   ],
         *   "_schema": "contact",
         *   "_tags": [
         *     "example",
         *     "mock"
         *   ],
         *   "_created_at": "2021-02-09T12:41:43.662Z",
         *   "_updated_at": "2021-02-09T12:41:43.662Z",
         *   "_acl": {
         *     "view": [
         *       "org:456",
         *       "org:789"
         *     ],
         *     "edit": [
         *       "org:456"
         *     ],
         *     "delete": [
         *       "org:456"
         *     ]
         *   }
         * }
         */
        Components.Schemas.Entity;
        namespace Responses {
            export type $200 = /* Validation result for a successful validation */ Components.Schemas.EntityValidationResultSuccess;
            export type $422 = /* Validation result for a failed validation */ Components.Schemas.EntityValidationResultError;
        }
    }
}

export interface OperationMethods {
  /**
   * listSchemas - listSchemas
   * 
   * Get the latest versions of all schemas
   */
  'listSchemas'(
    parameters?: Parameters<Paths.ListSchemas.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSchemas.Responses.$200>
  /**
   * getSchema - getSchema
   * 
   * By default gets the latest version of the Schema and to get the specific version of schema pass the id.
   */
  'getSchema'(
    parameters?: Parameters<Paths.GetSchema.PathParameters & Paths.GetSchema.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSchema.Responses.$200>
  /**
   * putSchema - putSchema
   * 
   * Create or update a schema with a new version
   */
  'putSchema'(
    parameters?: Parameters<Paths.PutSchema.PathParameters & Paths.PutSchema.QueryParameters> | null,
    data?: Paths.PutSchema.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutSchema.Responses.$200>
  /**
   * deleteSchema - deleteSchema
   * 
   * Delete a schema, or a specific version of a schema
   */
  'deleteSchema'(
    parameters?: Parameters<Paths.DeleteSchema.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSchema.Responses.$204>
  /**
   * getSchemaVersions - getSchemaVersions
   * 
   * Get all versions of this schema ordered by the latest versions including drafts.
   */
  'getSchemaVersions'(
    parameters?: Parameters<Paths.GetSchemaVersions.PathParameters & Paths.GetSchemaVersions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSchemaVersions.Responses.$200>
  /**
   * listSchemaBlueprints - listSchemaBlueprints
   * 
   * List canonical versions of all available schemas
   */
  'listSchemaBlueprints'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSchemaBlueprints.Responses.$200>
  /**
   * listTaxonomyClassificationsForSchema - listTaxonomyClassificationsForSchema
   * 
   * List taxonomy classifications for a given schema
   */
  'listTaxonomyClassificationsForSchema'(
    parameters?: Parameters<Paths.ListTaxonomyClassificationsForSchema.PathParameters & Paths.ListTaxonomyClassificationsForSchema.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListTaxonomyClassificationsForSchema.Responses.$200>
  /**
   * searchEntities - searchEntities
   * 
   * Search for entities. Supports ordering and pagination. Lucene query syntax supported for complex querying.
   * 
   * Passing comma-separated `x-epilot-org-id` is supported for cross-org entity search.
   * 
   * ## Relations
   * 
   * When `hydrate=true`, relation attributes are replaced in-place with nested entity values.
   * 
   * Example:
   * ```json
   * {
   *   "_id": "123",
   *   "name": "parent",
   *   "_tags": ["parent"],
   *   "contacts": {
   *     "$relation": [
   *       { "entity_id": "456", "_tags": ["primary"] },
   *       { "entity_id": "789", "_tags": ["secondary"] },
   *     ]
   *   },
   *   "addresses": {
   *     "$relation_ref": [
   *       { "entity_id": "123", "_tags": ["primary"], "path": "address.0" },
   *       { "entity_id": "234", "_tags": ["secondary"], "path": "address.0" },
   *     ]
   *   }
   * }
   * ```
   * 
   * Becomes:
   * ```json
   * {
   *   "_id": "123",
   *   "name": "parent",
   *   "_tags": ["parent"],
   *   "contacts": [
   *     {
   *       "$relation": { "entity_id": "456", "_tags": ["primary"] },
   *       "_id": "456",
   *       "name": "child 1",
   *       "_tags": ["child"]
   *     },
   *     {
   *       "$relation": { "entity_id": "789", "_tags": ["secondary"] },
   *       "_id": "789",
   *       "name": "child 2",
   *       "_tags": ["child"]
   *     }
   *   ],
   *   "addresses": [
   *     {
   *       "$relation_ref": { "entity_id": "123", "_tags": ["primary"], "path": "address.0" },
   *       "_id": "123",
   *       "address": "address 1",
   *       "_tags": ["child"]
   *     },
   *     {
   *       "$relation_ref": { "entity_id": "234", "_tags": ["secondary"], "path": "address.0" },
   *       "_id": "234",
   *       "address": "address 2",
   *       "_tags": ["child"]
   *     }
   *   ]
   * }
   * ```
   * 
   */
  'searchEntities'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchEntities.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchEntities.Responses.$200>
  /**
   * createEntity - createEntity
   * 
   * Creates a new entity using a key.
   * 
   * ## Activity
   * 
   * If no `activity_id` query parameter is provided, implicitly creates Activity of type `EntityCreated`
   * 
   * ## Relations
   * 
   * To create a relation, store a property object that defines a `$relation` array.
   * 
   * Example:
   * 
   * ```json
   * {
   *   "contacts": {
   *     "$relation": [
   *       { "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }
   *     ]
   *   }
   * }
   * ```
   * 
   * The items in `$relation` support two properties:
   * - `entity_id` - The ID of the entity to link
   * - `_tags` - Tags or labels for the relation (optional)
   * 
   */
  'createEntity'(
    parameters?: Parameters<Paths.CreateEntity.PathParameters & Paths.CreateEntity.QueryParameters> | null,
    data?: Paths.CreateEntity.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateEntity.Responses.$201>
  /**
   * validateEntity - validateEntity
   * 
   * Validates an entity against the schema.
   */
  'validateEntity'(
    parameters?: Parameters<Paths.ValidateEntity.PathParameters> | null,
    data?: Paths.ValidateEntity.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ValidateEntity.Responses.$200>
  /**
   * upsertEntity - upsertEntity
   * 
   * Create or update an entity using `unique_key`
   * 
   * - If no entities are matched, a new entity is created.
   * - If exactly one entity is matched, a `PATCH`-style update is applied to the existing entity.
   * - If more than one entity is matched a `409` Error is returned
   * 
   * ## Activity
   * 
   * If no `activity_id` query parameter is provided, implicitly creates Activity of type `EntityCreated` or `EntityUpdated`
   * 
   */
  'upsertEntity'(
    parameters?: Parameters<Paths.UpsertEntity.PathParameters & Paths.UpsertEntity.QueryParameters> | null,
    data?: Paths.UpsertEntity.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpsertEntity.Responses.$200 | Paths.UpsertEntity.Responses.$201>
  /**
   * getEntityV2 - getEntityV2
   * 
   * Gets Entity by id.
   * 
   * Supports `hydrate` and `fields` parameters to control the shape of the response.
   * 
   */
  'getEntityV2'(
    parameters?: Parameters<Paths.GetEntityV2.PathParameters & Paths.GetEntityV2.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEntityV2.Responses.$200>
  /**
   * getEntity - getEntity
   * 
   * Gets Entity and relations by id.
   * 
   * ## Relations
   * 
   * When `hydrate=true`, relation attributes are replaced in-place with nested entity values.
   * 
   * Example:
   * ```json
   * {
   *   "_id": "123",
   *   "name": "parent",
   *   "_tags": ["parent"],
   *   "contacts": {
   *     "$relation": [
   *       { "entity_id": "456", "_tags": ["primary"] },
   *       { "entity_id": "789", "_tags": ["secondary"] },
   *     ]
   *   },
   *   "addresses": {
   *     "$relation_ref": [
   *       { "entity_id": "123", "_tags": ["primary"], "path": "address.0" },
   *       { "entity_id": "234", "_tags": ["secondary"], "path": "address.0" },
   *     ]
   *   }
   * }
   * ```
   * 
   * Becomes:
   * ```json
   * {
   *   "_id": "123",
   *   "name": "parent",
   *   "_tags": ["parent"],
   *   "contacts": [
   *     {
   *       "$relation": { "entity_id": "456", "_tags": ["primary"] },
   *       "_id": "456",
   *       "name": "child 1",
   *       "_tags": ["child"]
   *     },
   *     {
   *       "$relation": { "entity_id": "789", "_tags": ["secondary"] },
   *       "_id": "789",
   *       "name": "child 2",
   *       "_tags": ["child"]
   *     }
   *   ],
   *   "addresses": [
   *     {
   *       "$relation_ref": { "entity_id": "123", "_tags": ["primary"], "path": "address.0" },
   *       "_id": "123",
   *       "address": "address 1",
   *       "_tags": ["child"]
   *     },
   *     {
   *       "$relation_ref": { "entity_id": "234", "_tags": ["secondary"], "path": "address.0" },
   *       "_id": "234",
   *       "address": "address 2",
   *       "_tags": ["child"]
   *     }
   *   ]
   * }
   * ```
   * 
   */
  'getEntity'(
    parameters?: Parameters<Paths.GetEntity.PathParameters & Paths.GetEntity.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEntity.Responses.$200>
  /**
   * updateEntity - updateEntity
   * 
   * Updates an Entity
   * 
   * ## Activity
   * 
   * If no `activity_id` query parameter is provided, implicitly creates Activity of type `EntityUpdated`
   * 
   * ## Relations
   * 
   * To create a relation, store a property that defines a `$relation` array.
   * 
   * Example:
   * 
   * ```json
   * {
   *   "contacts": {
   *     "$relation": [
   *       { "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }
   *     ]
   *   }
   * }
   * ```
   * 
   * The items in `$relation` support two properties:
   * - `entity_id` - The ID of the entity to link
   * - `_tags` - Tags or labels for the relation (optional)
   * 
   */
  'updateEntity'(
    parameters?: Parameters<Paths.UpdateEntity.PathParameters & Paths.UpdateEntity.QueryParameters> | null,
    data?: Paths.UpdateEntity.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateEntity.Responses.$200>
  /**
   * patchEntity - patchEntity
   * 
   * Partially updates an entity with the passed in entity data.
   * 
   * - If an _updated_at is passed and the server contains a newer version of the entity a `409` Error is returned
   * 
   * ## Activity
   * 
   * If no `activity_id` query parameter is provided, implicitly creates Activity of type `EntityUpdated`
   * 
   * ## Relations
   * 
   * To create a relation, store a property that defines a `$relation` array.
   * 
   * Example:
   * 
   * ```json
   * {
   *   "contacts": {
   *     "$relation": [
   *       { "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }
   *     ]
   *   }
   * }
   * ```
   * 
   * The items in `$relation` support two properties:
   * - `entity_id` - The ID of the entity to link
   * - `_tags` - Tags or labels for the relation (optional)
   * 
   */
  'patchEntity'(
    parameters?: Parameters<Paths.PatchEntity.PathParameters & Paths.PatchEntity.QueryParameters> | null,
    data?: Paths.PatchEntity.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchEntity.Responses.$200>
  /**
   * deleteEntity - deleteEntity
   * 
   * Deletes an Entity
   * 
   * ## Activity
   * 
   * If no `activity_id` query parameter is provided, implicitly creates Activity of type `EntityDeleted`
   * 
   */
  'deleteEntity'(
    parameters?: Parameters<Paths.DeleteEntity.PathParameters & Paths.DeleteEntity.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteEntity.Responses.$200>
  /**
   * autocomplete - autocomplete
   * 
   * Autocomplete entity attributes
   * 
   */
  'autocomplete'(
    parameters?: Parameters<Paths.Autocomplete.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Autocomplete.Responses.$200>
  /**
   * createActivity - createActivity
   * 
   * Create an activity that can be displayed in activity feeds.
   * 
   * - All activites are published as events on the event bus
   * - Entity mutations are always part of an activity
   * 
   */
  'createActivity'(
    parameters?: Parameters<Paths.CreateActivity.QueryParameters> | null,
    data?: Paths.CreateActivity.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateActivity.Responses.$200>
  /**
   * getActivity - getActivity
   * 
   * Get activity by id
   */
  'getActivity'(
    parameters?: Parameters<Paths.GetActivity.PathParameters & Paths.GetActivity.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetActivity.Responses.$200>
  /**
   * attachActivity - attachActivity
   * 
   * Attach existing activity to entity activity feeds
   */
  'attachActivity'(
    parameters?: Parameters<Paths.AttachActivity.PathParameters & Paths.AttachActivity.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AttachActivity.Responses.$200>
  /**
   * getEntityActivityFeed - getEntityActivityFeed
   * 
   * Get activity feed for an entity
   * 
   */
  'getEntityActivityFeed'(
    parameters?: Parameters<Paths.GetEntityActivityFeed.PathParameters & Paths.GetEntityActivityFeed.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEntityActivityFeed.Responses.$200>
  /**
   * getRelations - getRelations
   * 
   * Returns 1st level direct relations for an entity.
   * 
   * You can control whether to return the full entity or just the relation item with the `?hydrate` query param.
   * 
   * Reverse relations i.e. entities referring to this entity are included with the `?include_reverse` query param.
   * 
   */
  'getRelations'(
    parameters?: Parameters<Paths.GetRelations.PathParameters & Paths.GetRelations.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRelations.Responses.$200>
  /**
   * addRelations - addRelations
   * 
   * Relates one or more entities to parent entity by adding items to a relation attribute
   */
  'addRelations'(
    parameters?: Parameters<Paths.AddRelations.PathParameters & Paths.AddRelations.QueryParameters> | null,
    data?: Paths.AddRelations.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddRelations.Responses.$200>
  /**
   * getRelationsV2 - getRelationsV2
   * 
   * Returns 1st level direct relations for an entity with pagination.
   * 
   * You can control whether to return the full entity or just the relation item with the `?hydrate` query param.
   * 
   * Reverse relations i.e. entities referring to this entity are included with the `?include_reverse` query param.
   * 
   */
  'getRelationsV2'(
    parameters?: Parameters<Paths.GetRelationsV2.PathParameters & Paths.GetRelationsV2.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRelationsV2.Responses.$200>
  /**
   * getRelationsV3 - getRelationsV3
   * 
   * Returns 1st level direct relations for an entity with pagination.
   * 
   * You can control whether to return the full entity or just the relation item with the `?hydrate` query param.
   * 
   * Reverse relations i.e. entities referring to this entity are included with the `?include_reverse` query param.
   * 
   */
  'getRelationsV3'(
    parameters?: Parameters<Paths.GetRelationsV3.PathParameters & Paths.GetRelationsV3.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRelationsV3.Responses.$200>
  /**
   * getRelatedEntitiesCount - getRelatedEntitiesCount
   * 
   * Returns the amount of unique related entities for an entity - includes direct and reverse relations.
   * 
   */
  'getRelatedEntitiesCount'(
    parameters?: Parameters<Paths.GetRelatedEntitiesCount.PathParameters & Paths.GetRelatedEntitiesCount.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRelatedEntitiesCount.Responses.$200>
  /**
   * updateRelation - updateRelation
   * 
   * Updates an existing relation between two entities.
   */
  'updateRelation'(
    parameters?: Parameters<Paths.UpdateRelation.PathParameters & Paths.UpdateRelation.QueryParameters> | null,
    data?: Paths.UpdateRelation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateRelation.Responses.$200>
  /**
   * deleteRelation - deleteRelation
   * 
   * Removes relation between two entities
   */
  'deleteRelation'(
    parameters?: Parameters<Paths.DeleteRelation.PathParameters & Paths.DeleteRelation.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteRelation.Responses.$204>
  /**
   * exportEntities - exportEntities
   * 
   * create export file of entities
   */
  'exportEntities'(
    parameters?: Parameters<Paths.ExportEntities.QueryParameters> | null,
    data?: Paths.ExportEntities.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExportEntities.Responses.$201>
  /**
   * importEntities - Import Entities
   * 
   * This endpoint enables the import of entities into the platform.
   * The entities should be provided in a CSV format inside an S3 bucket.
   * This API will return the `job_id`` which can be used to fetch the status of the import process.
   * 
   */
  'importEntities'(
    parameters?: Parameters<Paths.ImportEntities.QueryParameters> | null,
    data?: Paths.ImportEntities.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ImportEntities.Responses.$201>
  /**
   * listSavedViews - listSavedViews
   * 
   * Get the Saved Views based on the schema
   */
  'listSavedViews'(
    parameters?: Parameters<Paths.ListSavedViews.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSavedViews.Responses.$200>
  /**
   * createSavedView - createSavedView
   * 
   * Creates a new saved view
   */
  'createSavedView'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSavedView.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSavedView.Responses.$201>
  /**
   * getSavedView - getSavedView
   * 
   * Gets Saved View configuration by id.
   */
  'getSavedView'(
    parameters?: Parameters<Paths.GetSavedView.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSavedView.Responses.$200>
  /**
   * updateSavedView - updateSavedView
   * 
   * Updates a saved view
   */
  'updateSavedView'(
    parameters?: Parameters<Paths.UpdateSavedView.PathParameters> | null,
    data?: Paths.UpdateSavedView.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateSavedView.Responses.$200>
  /**
   * deleteSavedView - deleteSavedView
   * 
   * Deletes a saved view
   */
  'deleteSavedView'(
    parameters?: Parameters<Paths.DeleteSavedView.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSavedView.Responses.$200>
  /**
   * listFavoriteViewsForUser - listFavoriteViewsForUser
   * 
   * Get the Favorite Saved Views for user based on the schema
   */
  'listFavoriteViewsForUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListFavoriteViewsForUser.Responses.$200>
  /**
   * listTaxonomies - listTaxonomies
   * 
   * List taxonomies in an organisation
   */
  'listTaxonomies'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListTaxonomies.Responses.$200>
  /**
   * getTaxonomy - getTaxonomy
   * 
   * Get taxonomy by slug
   */
  'getTaxonomy'(
    parameters?: Parameters<Paths.GetTaxonomy.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTaxonomy.Responses.$200>
  /**
   * taxonomyAutocomplete - taxonomyAutocomplete
   * 
   * Taxonomies autocomplete
   */
  'taxonomyAutocomplete'(
    parameters?: Parameters<Paths.TaxonomyAutocomplete.PathParameters & Paths.TaxonomyAutocomplete.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TaxonomyAutocomplete.Responses.$200>
  /**
   * taxonomiesClassificationsSearch - taxonomiesClassificationsSearch
   * 
   * List taxonomy classifications in an organisation based on taxonomy slug
   */
  'taxonomiesClassificationsSearch'(
    parameters?: Parameters<Paths.TaxonomiesClassificationsSearch.QueryParameters> | null,
    data?: Paths.TaxonomiesClassificationsSearch.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TaxonomiesClassificationsSearch.Responses.$200>
  /**
   * updateClassificationsForTaxonomy - updateClassificationsForTaxonomy
   * 
   * Update taxonomies in an organisation based in taxonomy slug
   */
  'updateClassificationsForTaxonomy'(
    parameters?: Parameters<Paths.UpdateClassificationsForTaxonomy.PathParameters> | null,
    data?: Paths.UpdateClassificationsForTaxonomy.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateClassificationsForTaxonomy.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/entity/schemas']: {
    /**
     * listSchemas - listSchemas
     * 
     * Get the latest versions of all schemas
     */
    'get'(
      parameters?: Parameters<Paths.ListSchemas.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSchemas.Responses.$200>
  }
  ['/v1/entity/schemas/{slug}']: {
    /**
     * getSchema - getSchema
     * 
     * By default gets the latest version of the Schema and to get the specific version of schema pass the id.
     */
    'get'(
      parameters?: Parameters<Paths.GetSchema.PathParameters & Paths.GetSchema.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSchema.Responses.$200>
    /**
     * putSchema - putSchema
     * 
     * Create or update a schema with a new version
     */
    'put'(
      parameters?: Parameters<Paths.PutSchema.PathParameters & Paths.PutSchema.QueryParameters> | null,
      data?: Paths.PutSchema.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutSchema.Responses.$200>
    /**
     * deleteSchema - deleteSchema
     * 
     * Delete a schema, or a specific version of a schema
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteSchema.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSchema.Responses.$204>
  }
  ['/v1/entity/schemas/{slug}/versions']: {
    /**
     * getSchemaVersions - getSchemaVersions
     * 
     * Get all versions of this schema ordered by the latest versions including drafts.
     */
    'get'(
      parameters?: Parameters<Paths.GetSchemaVersions.PathParameters & Paths.GetSchemaVersions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSchemaVersions.Responses.$200>
  }
  ['/v1/entity/schemas/blueprints']: {
    /**
     * listSchemaBlueprints - listSchemaBlueprints
     * 
     * List canonical versions of all available schemas
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSchemaBlueprints.Responses.$200>
  }
  ['/v1/entity/schemas/{slug}/taxonomy/{taxonomySlug}']: {
    /**
     * listTaxonomyClassificationsForSchema - listTaxonomyClassificationsForSchema
     * 
     * List taxonomy classifications for a given schema
     */
    'get'(
      parameters?: Parameters<Paths.ListTaxonomyClassificationsForSchema.PathParameters & Paths.ListTaxonomyClassificationsForSchema.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListTaxonomyClassificationsForSchema.Responses.$200>
  }
  ['/v1/entity:search']: {
    /**
     * searchEntities - searchEntities
     * 
     * Search for entities. Supports ordering and pagination. Lucene query syntax supported for complex querying.
     * 
     * Passing comma-separated `x-epilot-org-id` is supported for cross-org entity search.
     * 
     * ## Relations
     * 
     * When `hydrate=true`, relation attributes are replaced in-place with nested entity values.
     * 
     * Example:
     * ```json
     * {
     *   "_id": "123",
     *   "name": "parent",
     *   "_tags": ["parent"],
     *   "contacts": {
     *     "$relation": [
     *       { "entity_id": "456", "_tags": ["primary"] },
     *       { "entity_id": "789", "_tags": ["secondary"] },
     *     ]
     *   },
     *   "addresses": {
     *     "$relation_ref": [
     *       { "entity_id": "123", "_tags": ["primary"], "path": "address.0" },
     *       { "entity_id": "234", "_tags": ["secondary"], "path": "address.0" },
     *     ]
     *   }
     * }
     * ```
     * 
     * Becomes:
     * ```json
     * {
     *   "_id": "123",
     *   "name": "parent",
     *   "_tags": ["parent"],
     *   "contacts": [
     *     {
     *       "$relation": { "entity_id": "456", "_tags": ["primary"] },
     *       "_id": "456",
     *       "name": "child 1",
     *       "_tags": ["child"]
     *     },
     *     {
     *       "$relation": { "entity_id": "789", "_tags": ["secondary"] },
     *       "_id": "789",
     *       "name": "child 2",
     *       "_tags": ["child"]
     *     }
     *   ],
     *   "addresses": [
     *     {
     *       "$relation_ref": { "entity_id": "123", "_tags": ["primary"], "path": "address.0" },
     *       "_id": "123",
     *       "address": "address 1",
     *       "_tags": ["child"]
     *     },
     *     {
     *       "$relation_ref": { "entity_id": "234", "_tags": ["secondary"], "path": "address.0" },
     *       "_id": "234",
     *       "address": "address 2",
     *       "_tags": ["child"]
     *     }
     *   ]
     * }
     * ```
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchEntities.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchEntities.Responses.$200>
  }
  ['/v1/entity/{slug}']: {
    /**
     * createEntity - createEntity
     * 
     * Creates a new entity using a key.
     * 
     * ## Activity
     * 
     * If no `activity_id` query parameter is provided, implicitly creates Activity of type `EntityCreated`
     * 
     * ## Relations
     * 
     * To create a relation, store a property object that defines a `$relation` array.
     * 
     * Example:
     * 
     * ```json
     * {
     *   "contacts": {
     *     "$relation": [
     *       { "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }
     *     ]
     *   }
     * }
     * ```
     * 
     * The items in `$relation` support two properties:
     * - `entity_id` - The ID of the entity to link
     * - `_tags` - Tags or labels for the relation (optional)
     * 
     */
    'post'(
      parameters?: Parameters<Paths.CreateEntity.PathParameters & Paths.CreateEntity.QueryParameters> | null,
      data?: Paths.CreateEntity.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateEntity.Responses.$201>
  }
  ['/v1/entity/{slug}:validate']: {
    /**
     * validateEntity - validateEntity
     * 
     * Validates an entity against the schema.
     */
    'post'(
      parameters?: Parameters<Paths.ValidateEntity.PathParameters> | null,
      data?: Paths.ValidateEntity.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ValidateEntity.Responses.$200>
  }
  ['/v1/entity/{slug}:upsert']: {
    /**
     * upsertEntity - upsertEntity
     * 
     * Create or update an entity using `unique_key`
     * 
     * - If no entities are matched, a new entity is created.
     * - If exactly one entity is matched, a `PATCH`-style update is applied to the existing entity.
     * - If more than one entity is matched a `409` Error is returned
     * 
     * ## Activity
     * 
     * If no `activity_id` query parameter is provided, implicitly creates Activity of type `EntityCreated` or `EntityUpdated`
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.UpsertEntity.PathParameters & Paths.UpsertEntity.QueryParameters> | null,
      data?: Paths.UpsertEntity.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpsertEntity.Responses.$200 | Paths.UpsertEntity.Responses.$201>
  }
  ['/v2/entity/{slug}/{id}']: {
    /**
     * getEntityV2 - getEntityV2
     * 
     * Gets Entity by id.
     * 
     * Supports `hydrate` and `fields` parameters to control the shape of the response.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetEntityV2.PathParameters & Paths.GetEntityV2.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEntityV2.Responses.$200>
  }
  ['/v1/entity/{slug}/{id}']: {
    /**
     * getEntity - getEntity
     * 
     * Gets Entity and relations by id.
     * 
     * ## Relations
     * 
     * When `hydrate=true`, relation attributes are replaced in-place with nested entity values.
     * 
     * Example:
     * ```json
     * {
     *   "_id": "123",
     *   "name": "parent",
     *   "_tags": ["parent"],
     *   "contacts": {
     *     "$relation": [
     *       { "entity_id": "456", "_tags": ["primary"] },
     *       { "entity_id": "789", "_tags": ["secondary"] },
     *     ]
     *   },
     *   "addresses": {
     *     "$relation_ref": [
     *       { "entity_id": "123", "_tags": ["primary"], "path": "address.0" },
     *       { "entity_id": "234", "_tags": ["secondary"], "path": "address.0" },
     *     ]
     *   }
     * }
     * ```
     * 
     * Becomes:
     * ```json
     * {
     *   "_id": "123",
     *   "name": "parent",
     *   "_tags": ["parent"],
     *   "contacts": [
     *     {
     *       "$relation": { "entity_id": "456", "_tags": ["primary"] },
     *       "_id": "456",
     *       "name": "child 1",
     *       "_tags": ["child"]
     *     },
     *     {
     *       "$relation": { "entity_id": "789", "_tags": ["secondary"] },
     *       "_id": "789",
     *       "name": "child 2",
     *       "_tags": ["child"]
     *     }
     *   ],
     *   "addresses": [
     *     {
     *       "$relation_ref": { "entity_id": "123", "_tags": ["primary"], "path": "address.0" },
     *       "_id": "123",
     *       "address": "address 1",
     *       "_tags": ["child"]
     *     },
     *     {
     *       "$relation_ref": { "entity_id": "234", "_tags": ["secondary"], "path": "address.0" },
     *       "_id": "234",
     *       "address": "address 2",
     *       "_tags": ["child"]
     *     }
     *   ]
     * }
     * ```
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetEntity.PathParameters & Paths.GetEntity.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEntity.Responses.$200>
    /**
     * updateEntity - updateEntity
     * 
     * Updates an Entity
     * 
     * ## Activity
     * 
     * If no `activity_id` query parameter is provided, implicitly creates Activity of type `EntityUpdated`
     * 
     * ## Relations
     * 
     * To create a relation, store a property that defines a `$relation` array.
     * 
     * Example:
     * 
     * ```json
     * {
     *   "contacts": {
     *     "$relation": [
     *       { "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }
     *     ]
     *   }
     * }
     * ```
     * 
     * The items in `$relation` support two properties:
     * - `entity_id` - The ID of the entity to link
     * - `_tags` - Tags or labels for the relation (optional)
     * 
     */
    'put'(
      parameters?: Parameters<Paths.UpdateEntity.PathParameters & Paths.UpdateEntity.QueryParameters> | null,
      data?: Paths.UpdateEntity.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateEntity.Responses.$200>
    /**
     * patchEntity - patchEntity
     * 
     * Partially updates an entity with the passed in entity data.
     * 
     * - If an _updated_at is passed and the server contains a newer version of the entity a `409` Error is returned
     * 
     * ## Activity
     * 
     * If no `activity_id` query parameter is provided, implicitly creates Activity of type `EntityUpdated`
     * 
     * ## Relations
     * 
     * To create a relation, store a property that defines a `$relation` array.
     * 
     * Example:
     * 
     * ```json
     * {
     *   "contacts": {
     *     "$relation": [
     *       { "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }
     *     ]
     *   }
     * }
     * ```
     * 
     * The items in `$relation` support two properties:
     * - `entity_id` - The ID of the entity to link
     * - `_tags` - Tags or labels for the relation (optional)
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.PatchEntity.PathParameters & Paths.PatchEntity.QueryParameters> | null,
      data?: Paths.PatchEntity.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchEntity.Responses.$200>
    /**
     * deleteEntity - deleteEntity
     * 
     * Deletes an Entity
     * 
     * ## Activity
     * 
     * If no `activity_id` query parameter is provided, implicitly creates Activity of type `EntityDeleted`
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteEntity.PathParameters & Paths.DeleteEntity.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteEntity.Responses.$200>
  }
  ['/v1/entity:autocomplete']: {
    /**
     * autocomplete - autocomplete
     * 
     * Autocomplete entity attributes
     * 
     */
    'get'(
      parameters?: Parameters<Paths.Autocomplete.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Autocomplete.Responses.$200>
  }
  ['/v1/entity/activity']: {
    /**
     * createActivity - createActivity
     * 
     * Create an activity that can be displayed in activity feeds.
     * 
     * - All activites are published as events on the event bus
     * - Entity mutations are always part of an activity
     * 
     */
    'post'(
      parameters?: Parameters<Paths.CreateActivity.QueryParameters> | null,
      data?: Paths.CreateActivity.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateActivity.Responses.$200>
  }
  ['/v1/entity/activity/{id}']: {
    /**
     * getActivity - getActivity
     * 
     * Get activity by id
     */
    'get'(
      parameters?: Parameters<Paths.GetActivity.PathParameters & Paths.GetActivity.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetActivity.Responses.$200>
  }
  ['/v1/entity/activity/{id}:attach']: {
    /**
     * attachActivity - attachActivity
     * 
     * Attach existing activity to entity activity feeds
     */
    'post'(
      parameters?: Parameters<Paths.AttachActivity.PathParameters & Paths.AttachActivity.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AttachActivity.Responses.$200>
  }
  ['/v1/entity/{slug}/{id}/activity']: {
    /**
     * getEntityActivityFeed - getEntityActivityFeed
     * 
     * Get activity feed for an entity
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetEntityActivityFeed.PathParameters & Paths.GetEntityActivityFeed.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEntityActivityFeed.Responses.$200>
  }
  ['/v1/entity/{slug}/{id}/relations']: {
    /**
     * getRelations - getRelations
     * 
     * Returns 1st level direct relations for an entity.
     * 
     * You can control whether to return the full entity or just the relation item with the `?hydrate` query param.
     * 
     * Reverse relations i.e. entities referring to this entity are included with the `?include_reverse` query param.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetRelations.PathParameters & Paths.GetRelations.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRelations.Responses.$200>
    /**
     * addRelations - addRelations
     * 
     * Relates one or more entities to parent entity by adding items to a relation attribute
     */
    'post'(
      parameters?: Parameters<Paths.AddRelations.PathParameters & Paths.AddRelations.QueryParameters> | null,
      data?: Paths.AddRelations.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddRelations.Responses.$200>
  }
  ['/v2/entity/{slug}/{id}/relations']: {
    /**
     * getRelationsV2 - getRelationsV2
     * 
     * Returns 1st level direct relations for an entity with pagination.
     * 
     * You can control whether to return the full entity or just the relation item with the `?hydrate` query param.
     * 
     * Reverse relations i.e. entities referring to this entity are included with the `?include_reverse` query param.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetRelationsV2.PathParameters & Paths.GetRelationsV2.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRelationsV2.Responses.$200>
  }
  ['/v3/entity/{slug}/{id}/relations']: {
    /**
     * getRelationsV3 - getRelationsV3
     * 
     * Returns 1st level direct relations for an entity with pagination.
     * 
     * You can control whether to return the full entity or just the relation item with the `?hydrate` query param.
     * 
     * Reverse relations i.e. entities referring to this entity are included with the `?include_reverse` query param.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetRelationsV3.PathParameters & Paths.GetRelationsV3.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRelationsV3.Responses.$200>
  }
  ['/v2/entity/{slug}/{id}/relations/count']: {
    /**
     * getRelatedEntitiesCount - getRelatedEntitiesCount
     * 
     * Returns the amount of unique related entities for an entity - includes direct and reverse relations.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetRelatedEntitiesCount.PathParameters & Paths.GetRelatedEntitiesCount.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRelatedEntitiesCount.Responses.$200>
  }
  ['/v1/entity/{slug}/{id}/relations/{attribute}/{entity_id}']: {
    /**
     * updateRelation - updateRelation
     * 
     * Updates an existing relation between two entities.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateRelation.PathParameters & Paths.UpdateRelation.QueryParameters> | null,
      data?: Paths.UpdateRelation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateRelation.Responses.$200>
    /**
     * deleteRelation - deleteRelation
     * 
     * Removes relation between two entities
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteRelation.PathParameters & Paths.DeleteRelation.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteRelation.Responses.$204>
  }
  ['/v1/entity:export']: {
    /**
     * exportEntities - exportEntities
     * 
     * create export file of entities
     */
    'post'(
      parameters?: Parameters<Paths.ExportEntities.QueryParameters> | null,
      data?: Paths.ExportEntities.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExportEntities.Responses.$201>
  }
  ['/v1/entity:import']: {
    /**
     * importEntities - Import Entities
     * 
     * This endpoint enables the import of entities into the platform.
     * The entities should be provided in a CSV format inside an S3 bucket.
     * This API will return the `job_id`` which can be used to fetch the status of the import process.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ImportEntities.QueryParameters> | null,
      data?: Paths.ImportEntities.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ImportEntities.Responses.$201>
  }
  ['/v1/entity/views']: {
    /**
     * listSavedViews - listSavedViews
     * 
     * Get the Saved Views based on the schema
     */
    'get'(
      parameters?: Parameters<Paths.ListSavedViews.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSavedViews.Responses.$200>
  }
  ['/v1/entity/view']: {
    /**
     * createSavedView - createSavedView
     * 
     * Creates a new saved view
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSavedView.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSavedView.Responses.$201>
  }
  ['/v1/entity/view/{id}']: {
    /**
     * getSavedView - getSavedView
     * 
     * Gets Saved View configuration by id.
     */
    'get'(
      parameters?: Parameters<Paths.GetSavedView.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSavedView.Responses.$200>
    /**
     * updateSavedView - updateSavedView
     * 
     * Updates a saved view
     */
    'put'(
      parameters?: Parameters<Paths.UpdateSavedView.PathParameters> | null,
      data?: Paths.UpdateSavedView.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateSavedView.Responses.$200>
    /**
     * deleteSavedView - deleteSavedView
     * 
     * Deletes a saved view
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteSavedView.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSavedView.Responses.$200>
  }
  ['/v1/entity/views/favorites']: {
    /**
     * listFavoriteViewsForUser - listFavoriteViewsForUser
     * 
     * Get the Favorite Saved Views for user based on the schema
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListFavoriteViewsForUser.Responses.$200>
  }
  ['/v1/entity/listTaxonomies']: {
    /**
     * listTaxonomies - listTaxonomies
     * 
     * List taxonomies in an organisation
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListTaxonomies.Responses.$200>
  }
  ['/v1/entity/taxonomies/{taxonomySlug}']: {
    /**
     * getTaxonomy - getTaxonomy
     * 
     * Get taxonomy by slug
     */
    'get'(
      parameters?: Parameters<Paths.GetTaxonomy.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTaxonomy.Responses.$200>
  }
  ['/v1/entity/taxonomies/{taxonomySlug}:autocomplete']: {
    /**
     * taxonomyAutocomplete - taxonomyAutocomplete
     * 
     * Taxonomies autocomplete
     */
    'get'(
      parameters?: Parameters<Paths.TaxonomyAutocomplete.PathParameters & Paths.TaxonomyAutocomplete.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TaxonomyAutocomplete.Responses.$200>
  }
  ['/v1/entity/taxonomies/classifications:search']: {
    /**
     * taxonomiesClassificationsSearch - taxonomiesClassificationsSearch
     * 
     * List taxonomy classifications in an organisation based on taxonomy slug
     */
    'post'(
      parameters?: Parameters<Paths.TaxonomiesClassificationsSearch.QueryParameters> | null,
      data?: Paths.TaxonomiesClassificationsSearch.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TaxonomiesClassificationsSearch.Responses.$200>
  }
  ['/v1/entity/taxonomies/{taxonomySlug}/classifications']: {
    /**
     * updateClassificationsForTaxonomy - updateClassificationsForTaxonomy
     * 
     * Update taxonomies in an organisation based in taxonomy slug
     */
    'post'(
      parameters?: Parameters<Paths.UpdateClassificationsForTaxonomy.PathParameters> | null,
      data?: Paths.UpdateClassificationsForTaxonomy.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateClassificationsForTaxonomy.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
