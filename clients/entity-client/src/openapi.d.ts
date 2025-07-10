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
        Schemas.ActivityId /* ulid ^01[0-9a-zA-Z]{24}$ */;
        export type ActivityIdQueryParam = /**
         * See https://github.com/ulid/spec
         * example:
         * 01F130Q52Q6MWSNS8N2AVXV4JN
         */
        Schemas.ActivityId /* ulid ^01[0-9a-zA-Z]{24}$ */ | ("" | null);
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
        export type FillActivityQueryParam = boolean;
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
        export type TaxonomyClassificationSlugPathParam = string;
        export type TaxonomySlugPathParam = string;
        export type TaxonomySlugQueryParam = string;
        export type TaxonomySlugQueryParamOptional = string;
        export type ValidateEntityQueryParam = boolean;
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
        TaxonomyClassificationSlugPathParam?: Parameters.TaxonomyClassificationSlugPathParam;
        SavedViewIdPathParam?: Parameters.SavedViewIdPathParam;
        ActivityIdPathParam?: Parameters.ActivityIdPathParam;
    }
    export interface QueryParameters {
        TaxonomySlugQueryParam?: Parameters.TaxonomySlugQueryParam;
        TaxonomySlugQueryParamOptional?: Parameters.TaxonomySlugQueryParamOptional;
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
        FillActivityQueryParam?: Parameters.FillActivityQueryParam;
        ValidateEntityQueryParam?: Parameters.ValidateEntityQueryParam;
    }
    namespace Responses {
        /**
         * A generic error returned by the API
         * example:
         * {
         *   "status": 404,
         *   "error": "Not Found"
         * }
         */
        export interface NotFoundError {
            /**
             * The HTTP status code of the error
             * example:
             * 400
             */
            status?: number;
            /**
             * The error message
             * example:
             * Bad Request
             */
            error?: string;
        }
        /**
         * A generic error returned by the API
         * example:
         * {
         *   "status": 429,
         *   "error": "Too many requests. Try again later."
         * }
         */
        export interface TooManyRequestsError {
            /**
             * The HTTP status code of the error
             * example:
             * 400
             */
            status?: number;
            /**
             * The error message
             * example:
             * Bad Request
             */
            error?: string;
        }
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
            /**
             * Indicates whether the activity is in the pending state.
             * Pending activities are not yet visible in the activity feed and events are not yet dispatched.
             *
             */
            pending?: boolean;
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
        export type ActivityId = string; // ulid ^01[0-9a-zA-Z]{24}$
        export interface ActivityItem {
            _id?: /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            ActivityId /* ulid ^01[0-9a-zA-Z]{24}$ */;
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
            /**
             * Indicates whether the activity is in the pending state.
             * Pending activities are not yet visible in the activity feed and events are not yet dispatched.
             *
             */
            pending?: boolean;
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
         * Address attribute
         */
        export interface AddressAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "address";
            default_address_fields?: /**
             * Default fields visible on addresses
             *
             * Valid values are:
             *   - postal_code (default)
             *   - city (default)
             *   - street (default)
             *   - street_number (default)
             *   - plot_area
             *   - plot_of_land
             *   - suburb
             *   - country
             *   - additional_info
             *   - coordinates
             *   - start_date
             *   - end_date
             *   - salutation
             *   - title
             *   - first_name
             *   - last_name
             *   - company_name
             *
             */
            DefaultAddressFields;
        }
        /**
         * Reference to an address attribute of another entity
         */
        export interface AddressRelationAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "relation_address";
            default_address_fields?: /**
             * Default fields visible on addresses
             *
             * Valid values are:
             *   - postal_code (default)
             *   - city (default)
             *   - street (default)
             *   - street_number (default)
             *   - plot_area
             *   - plot_of_land
             *   - suburb
             *   - country
             *   - additional_info
             *   - coordinates
             *   - start_date
             *   - end_date
             *   - salutation
             *   - title
             *   - first_name
             *   - last_name
             *   - company_name
             *
             */
            DefaultAddressFields;
        }
        export type Attribute = /* Textarea or text input */ TextAttribute | /* Link with title and href */ LinkAttribute | /* Date or Datetime picker */ DateAttribute | /* Country picker */ CountryAttribute | /* Yes / No Toggle */ BooleanAttribute | /* Dropdown select */ SelectAttribute | /* Multi Choice Selection */ MultiSelectAttribute | /* Status select */ StatusAttribute | /* Sequence of unique identifiers */ SequenceAttribute | /* Entity Relationship */ RelationAttribute | /* User Relationship */ UserRelationAttribute | /* Address attribute */ AddressAttribute | /* Reference to an address attribute of another entity */ AddressRelationAttribute | /* Reference to a payment method attribute of another entity */ PaymentMethodRelationAttribute | /* Currency input */ CurrencyAttribute | /* Tags */ TagsAttribute | /* Message emil address */ MessageEmailAddressAttribute | /* Numeric input */ NumberAttribute | /* Consent Management */ ConsentAttribute | /* No UI representation */ InternalAttribute | /* Type of attribute to render N number of ordered fields */ OrderedListAttribute | /* File or Image Attachment */ FileAttribute | /* An attribute that is computed from the entity data. For more details on how to use them, check the docs [here](https://e-pilot.atlassian.net/wiki/spaces/EO/pages/5642977476/How+To+Computed+Schema+Attributes) */ ComputedAttribute | /* Partner Status */ PartnerStatusAttribute | /* Email address for send invitation */ InvitationEmailAttribute | /* Automation entity */ AutomationAttribute | /* Epilot internal user info */ InternalUserAttribute | /* Entity Taxonomy */ PurposeAttribute | /* Shared Partner Organisations */ PartnerOrganisationAttribute | /* Phone number */ PhoneAttribute | /* Email address */ EmailAttribute | /* Payment method */ PaymentAttribute | /* Price component */ PriceComponentAttribute;
        /**
         * a readonly computed ID for the attribute including schema slug and the attribute ID
         */
        export type AttributeWithCompositeID = {
            /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            composite_id?: string;
            /**
             * Schema slug the attribute belongs to
             * example:
             * contact
             */
            schema?: string;
        } & (/* a readonly computed ID for the attribute including schema slug and the attribute ID */ /* Textarea or text input */ TextAttribute | /* Link with title and href */ LinkAttribute | /* Date or Datetime picker */ DateAttribute | /* Country picker */ CountryAttribute | /* Yes / No Toggle */ BooleanAttribute | /* Dropdown select */ SelectAttribute | /* Multi Choice Selection */ MultiSelectAttribute | /* Status select */ StatusAttribute | /* Sequence of unique identifiers */ SequenceAttribute | /* Entity Relationship */ RelationAttribute | /* User Relationship */ UserRelationAttribute | /* Address attribute */ AddressAttribute | /* Reference to an address attribute of another entity */ AddressRelationAttribute | /* Reference to a payment method attribute of another entity */ PaymentMethodRelationAttribute | /* Currency input */ CurrencyAttribute | /* Tags */ TagsAttribute | /* Message emil address */ MessageEmailAddressAttribute | /* Numeric input */ NumberAttribute | /* Consent Management */ ConsentAttribute | /* No UI representation */ InternalAttribute | /* Type of attribute to render N number of ordered fields */ OrderedListAttribute | /* File or Image Attachment */ FileAttribute | /* An attribute that is computed from the entity data. For more details on how to use them, check the docs [here](https://e-pilot.atlassian.net/wiki/spaces/EO/pages/5642977476/How+To+Computed+Schema+Attributes) */ ComputedAttribute | /* Partner Status */ PartnerStatusAttribute | /* Email address for send invitation */ InvitationEmailAttribute | /* Automation entity */ AutomationAttribute | /* Epilot internal user info */ InternalUserAttribute | /* Entity Taxonomy */ PurposeAttribute | /* Shared Partner Organisations */ PartnerOrganisationAttribute | /* Phone number */ PhoneAttribute | /* Email address */ EmailAttribute | /* Payment method */ PaymentAttribute | /* Price component */ PriceComponentAttribute);
        /**
         * Automation entity
         */
        export interface AutomationAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "automation";
        }
        export interface BaseActivityItem {
            _id?: /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            ActivityId /* ulid ^01[0-9a-zA-Z]{24}$ */;
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
            /**
             * Indicates whether the activity is in the pending state.
             * Pending activities are not yet visible in the activity feed and events are not yet dispatched.
             *
             */
            pending?: boolean;
            caller?: ActivityCallerContext;
        }
        export interface BaseAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
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
         *   },
         *   "_manifest": [
         *     "123e4567-e89b-12d3-a456-426614174000"
         *   ]
         * }
         */
        export interface BaseEntity {
            [name: string]: any;
            _id: string; // uuid
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
            _deleted_at?: string | null; // date-time
            /**
             * Access control list (ACL) for an entity. Defines sharing access to external orgs or users.
             */
            _acl?: {
                [name: string]: any;
                view?: string[];
                edit?: string[];
                delete?: string[];
            };
            _purpose?: string[] | null;
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[] | null;
        }
        /**
         * Reference to blueprint
         */
        export type BlueprintEntityId = string; // uuid
        /**
         * Yes / No Toggle
         */
        export interface BooleanAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "boolean";
            display_type?: "switch" | "checkbox";
        }
        /**
         * example:
         * taxonomy-slug:classification-slug
         */
        export type ClassificationId = string;
        /**
         * URL-friendly identifier for the classification
         * example:
         * wallbox-pv
         */
        export type ClassificationSlug = string;
        export interface ClassificationsUpdate {
            create?: TaxonomyClassification[];
            update?: TaxonomyClassification[];
            delete?: (/**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId | string)[];
        }
        /**
         * An attribute that is computed from the entity data. For more details on how to use them, check the docs [here](https://e-pilot.atlassian.net/wiki/spaces/EO/pages/5642977476/How+To+Computed+Schema+Attributes)
         */
        export interface ComputedAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
             */
            settings_flag?: SettingFlag[];
            /**
             * Variable template used to format the computed value
             * example:
             * {{formatCurrencyAttribute entity attribute locale}}
             */
            value_formatter: string;
            /**
             * Variable template used to format a preview for the computed value
             * example:
             * {{formatCurrencyAttribute entity attribute locale}}
             */
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "computed";
            computed?: boolean;
            /**
             * A source amount field that is used to compute the value of the attribute
             */
            amount_field?: string;
            /**
             * A currency field used to format a computed currency value
             */
            currency_field?: string;
        }
        /**
         * Consent Management
         */
        export interface ConsentAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "consent";
            topic: string;
            identifiers?: string[];
        }
        /**
         * Country picker
         */
        export interface CountryAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "country";
        }
        /**
         * Currency input
         */
        export interface CurrencyAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
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
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "date" | "datetime";
        }
        /**
         * Default fields visible on addresses
         *
         * Valid values are:
         *   - postal_code (default)
         *   - city (default)
         *   - street (default)
         *   - street_number (default)
         *   - plot_area
         *   - plot_of_land
         *   - suburb
         *   - country
         *   - additional_info
         *   - coordinates
         *   - start_date
         *   - end_date
         *   - salutation
         *   - title
         *   - first_name
         *   - last_name
         *   - company_name
         *
         */
        export type DefaultAddressFields = string[] | null;
        export interface ESClusterAssignment {
            /**
             * The organization for which the cluster assignment is returned
             */
            orgId?: string;
            /**
             * Name of the elastic cluster the organization is assigned to
             */
            cluster?: string;
        }
        /**
         * Email address
         */
        export interface EmailAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "email";
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
         *   },
         *   "_manifest": [
         *     "123e4567-e89b-12d3-a456-426614174000"
         *   ]
         * }
         */
        export interface Entity {
            [name: string]: any;
            _id?: string; // uuid
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
            _deleted_at?: string | null; // date-time
            /**
             * Access control list (ACL) for an entity. Defines sharing access to external orgs or users.
             */
            _acl?: {
                [name: string]: any;
                view?: string[];
                edit?: string[];
                delete?: string[];
            };
            _purpose?: string[] | null;
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[] | null;
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
             * ID for the entity capability
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema capabilility
             */
            _manifest?: string /* uuid */[] | null;
            ui_config?: {
                /**
                 * Whether the capability is filterable
                 * example:
                 * true
                 */
                is_filterable?: boolean;
            };
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
        /**
         * a readonly computed ID for the entity capability including schema slug and the capability ID
         */
        export interface EntityCapabilityWithCompositeID {
            /**
             * ID for the entity capability
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema capabilility
             */
            _manifest?: string /* uuid */[] | null;
            ui_config?: {
                /**
                 * Whether the capability is filterable
                 * example:
                 * true
                 */
                is_filterable?: boolean;
            };
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
            /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            composite_id?: string;
            /**
             * Schema slug the capability belongs to
             * example:
             * contact
             */
            schema?: string;
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
            row_actions?: (string | /* An entity action configured from the entity schema */ EntityAction)[];
            bulk_actions?: (string | /* An entity action configured from the entity schema */ EntityAction)[];
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
         *   },
         *   "_manifest": [
         *     "123e4567-e89b-12d3-a456-426614174000",
         *     "123e4567-e89b-12d3-a456-426614174000"
         *   ]
         * }
         */
        export interface EntityItem {
            [name: string]: any;
            _id: string; // uuid
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
            _deleted_at?: string | null; // date-time
            /**
             * Access control list (ACL) for an entity. Defines sharing access to external orgs or users.
             */
            _acl?: {
                [name: string]: any;
                view?: string[];
                edit?: string[];
                delete?: string[];
            };
            _purpose?: string[] | null;
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[] | null;
        }
        export interface EntityListParams {
            filter: /**
             * A subset of simplified Elasticsearch query clauses. The default operator is a logical AND. Use nested $and, $or, $not to combine filters using different logical operators.
             * example:
             * [
             *   {
             *     "term": {
             *       "_schema": "contact"
             *     }
             *   },
             *   {
             *     "terms": {
             *       "status": [
             *         "active"
             *       ]
             *     }
             *   }
             * ]
             */
            SearchFilter;
            /**
             * Allow running the listing without any schema filter. This is disabled by default to prevent security and performance issues if done by an accident.
             */
            allow_targeting_all_schemas?: boolean;
            /**
             * You can pass one sort field or an array of sort fields. Each sort field can be a string
             */
            sort?: /* You can pass one sort field or an array of sort fields. Each sort field can be a string */ string | string[];
            /**
             * The offset from which to start the search results.
             * Only one of `from` or `search_after` should be used.
             *
             */
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
            include_deleted?: /**
             * Whether to include deleted entities in the search results
             * - `true`: include deleted entities
             * - `false`: exclude deleted entities
             * - `only`: include only deleted entities
             *
             * By default, no deleted entities are included in the search results.
             *
             */
            EntitySearchIncludeDeletedParam;
            highlight?: any;
            /**
             * A TTL (in seconds) that specifies how long the context should be maintained.
             * Defaults to 30 seconds; configurable up to 60 seconds to prevent abuse.
             * A value of 0 can be provided the close the context after the query.
             * Defaults to none.
             *
             */
            stable_for?: number;
            /**
             * A unique identifier of the query context from the last stable query.
             * The context is maintained for the duration of the stable_for value.
             *
             */
            stable_query_id?: string;
            /**
             * The sort values from which to start the search results.
             * Only one of `from` or `search_after` should be used.
             * It is strongly recommended to always use the `sort_end` field from the last search result.
             * Used for deep pagination, typically together with `stable_query_id` to maintain the context between requests.
             * Requires explicit sort to work reliably.
             * Typically used sort fields are `_id` or `_created_at`.
             *
             */
            search_after?: ((string | null) | (number | null))[];
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
            ActivityId /* ulid ^01[0-9a-zA-Z]{24}$ */;
            operation: "createEntity" | "updateEntity" | "deleteEntity" | "softDeleteEntity" | "restoreEntity" | "relationsAdded" | "relationsRemoved" | "relationsSoftDeleted" | "relationsRestored" | "relationsDeleted";
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
             *   "_manifest": [
             *     "123e4567-e89b-12d3-a456-426614174000"
             *   ],
             *   "status": "Inactive"
             * }
             */
            payload?: {
                [name: string]: any;
                _id?: string; // uuid
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
                _deleted_at?: string | null; // date-time
                /**
                 * Access control list (ACL) for an entity. Defines sharing access to external orgs or users.
                 */
                _acl?: {
                    [name: string]: any;
                    view?: string[];
                    edit?: string[];
                    delete?: string[];
                };
                _purpose?: string[] | null;
                /**
                 * Manifest ID used to create/update the entity
                 */
                _manifest?: string /* uuid */[] | null;
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
                 *   },
                 *   "_manifest": [
                 *     "123e4567-e89b-12d3-a456-426614174000"
                 *   ]
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
                 *   },
                 *   "_manifest": [
                 *     "123e4567-e89b-12d3-a456-426614174000"
                 *   ]
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
                 *   },
                 *   "_manifest": [
                 *     "123e4567-e89b-12d3-a456-426614174000"
                 *   ]
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
             * Example description
             */
            description?: string;
            /**
             * example:
             * https://docs.epilot.io/docs/pricing/entities
             */
            docs_url?: string; // uri
            /**
             * example:
             * customer_relations
             */
            category?: string;
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
                    ui_config?: {
                        /**
                         * Show attributes in a row or column
                         */
                        content_direction?: "row" | "column";
                    };
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
             * A list of Group Titles and associated settings if present.
             * example:
             * [
             *   {
             *     "id": "e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
             *     "label": "Contact Details",
             *     "expanded": true,
             *     "order": 1
             *   },
             *   {
             *     "id": "e9a1ae28-27ba-4fa0-a79c-e279cc5c4a6e",
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
            group_settings?: EntitySchemaGroup[];
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
            _purpose?: string[];
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
            group_headlines?: GroupHeadline[];
        }
        export interface EntitySchemaGroup {
            /**
             * example:
             * Contact Details
             */
            label: string;
            /**
             * example:
             * e18a532b-ae79-4d86-a6a5-e5dbfb579d14
             */
            id?: string;
            /**
             * Render order of the group
             */
            order?: number;
            /**
             * Expanded by default
             */
            expanded?: boolean;
            /**
             * Only render group when render_condition resolves to true
             * example:
             * _is_composite_price = "false"
             */
            render_condition?: string;
            /**
             * Only render group when one of the purposes is enabled
             */
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema group
             */
            _manifest?: string /* uuid */[] | null;
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
                /**
                 * Translation key for info tooltip
                 */
                key?: string;
                /**
                 * Default string for info tooltip
                 */
                default?: string;
            };
        }
        /**
         * a readonly computed ID for the group including schema slug and the group ID
         */
        export interface EntitySchemaGroupWithCompositeID {
            /**
             * example:
             * Contact Details
             */
            label: string;
            /**
             * example:
             * e18a532b-ae79-4d86-a6a5-e5dbfb579d14
             */
            id?: string;
            /**
             * Render order of the group
             */
            order?: number;
            /**
             * Expanded by default
             */
            expanded?: boolean;
            /**
             * Only render group when render_condition resolves to true
             * example:
             * _is_composite_price = "false"
             */
            render_condition?: string;
            /**
             * Only render group when one of the purposes is enabled
             */
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema group
             */
            _manifest?: string /* uuid */[] | null;
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
                /**
                 * Translation key for info tooltip
                 */
                key?: string;
                /**
                 * Default string for info tooltip
                 */
                default?: string;
            };
            /**
             * example:
             * contact:e18a532b-ae79-4d86-a6a5-e5dbfb579d14
             */
            composite_id?: string;
            /**
             * Schema slug the group belongs to
             * example:
             * contact
             */
            schema?: string;
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
             * Example description
             */
            description?: string;
            /**
             * example:
             * https://docs.epilot.io/docs/pricing/entities
             */
            docs_url?: string; // uri
            /**
             * example:
             * customer_relations
             */
            category?: string;
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
                    ui_config?: {
                        /**
                         * Show attributes in a row or column
                         */
                        content_direction?: "row" | "column";
                    };
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
             * A list of Group Titles and associated settings if present.
             * example:
             * [
             *   {
             *     "id": "e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
             *     "label": "Contact Details",
             *     "expanded": true,
             *     "order": 1
             *   },
             *   {
             *     "id": "e9a1ae28-27ba-4fa0-a79c-e279cc5c4a6e",
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
            group_settings?: EntitySchemaGroup[];
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
            _purpose?: string[];
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
            group_headlines?: GroupHeadline[];
        }
        /**
         * Whether to include deleted entities in the search results
         * - `true`: include deleted entities
         * - `false`: exclude deleted entities
         * - `only`: include only deleted entities
         *
         * By default, no deleted entities are included in the search results.
         *
         */
        export type EntitySearchIncludeDeletedParam = "true" | "false" | "only";
        export interface EntitySearchOptions {
            /**
             * You can pass one sort field or an array of sort fields. Each sort field can be a string
             */
            sort?: /* You can pass one sort field or an array of sort fields. Each sort field can be a string */ string | string[];
            /**
             * The offset from which to start the search results.
             * Only one of `from` or `search_after` should be used.
             *
             */
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
            include_deleted?: /**
             * Whether to include deleted entities in the search results
             * - `true`: include deleted entities
             * - `false`: exclude deleted entities
             * - `only`: include only deleted entities
             *
             * By default, no deleted entities are included in the search results.
             *
             */
            EntitySearchIncludeDeletedParam;
            /**
             * A TTL (in seconds) that specifies how long the context should be maintained.
             * Defaults to 30 seconds; configurable up to 60 seconds to prevent abuse.
             * A value of 0 can be provided the close the context after the query.
             * Defaults to none.
             *
             */
            stable_for?: number;
            /**
             * A unique identifier of the query context from the last stable query.
             * The context is maintained for the duration of the stable_for value.
             *
             */
            stable_query_id?: string;
            /**
             * The sort values from which to start the search results.
             * Only one of `from` or `search_after` should be used.
             * It is strongly recommended to always use the `sort_end` field from the last search result.
             * Used for deep pagination, typically together with `stable_query_id` to maintain the context between requests.
             * Requires explicit sort to work reliably.
             * Typically used sort fields are `_id` or `_created_at`.
             *
             */
            search_after?: ((string | null) | (number | null))[];
        }
        export interface EntitySearchParams {
            /**
             * Lucene [queries supported with ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#query-string-syntax)
             * example:
             * _schema:contact AND status:active
             */
            q: string;
            /**
             * Adds a `_score` number field to results that can be used to rank by match score
             */
            include_scores?: boolean;
            /**
             * You can pass one sort field or an array of sort fields. Each sort field can be a string
             */
            sort?: /* You can pass one sort field or an array of sort fields. Each sort field can be a string */ string | string[];
            /**
             * The offset from which to start the search results.
             * Only one of `from` or `search_after` should be used.
             *
             */
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
            include_deleted?: /**
             * Whether to include deleted entities in the search results
             * - `true`: include deleted entities
             * - `false`: exclude deleted entities
             * - `only`: include only deleted entities
             *
             * By default, no deleted entities are included in the search results.
             *
             */
            EntitySearchIncludeDeletedParam;
            highlight?: any;
            /**
             * A TTL (in seconds) that specifies how long the context should be maintained.
             * Defaults to 30 seconds; configurable up to 60 seconds to prevent abuse.
             * A value of 0 can be provided the close the context after the query.
             * Defaults to none.
             *
             */
            stable_for?: number;
            /**
             * A unique identifier of the query context from the last stable query.
             * The context is maintained for the duration of the stable_for value.
             *
             */
            stable_query_id?: string;
            /**
             * The sort values from which to start the search results.
             * Only one of `from` or `search_after` should be used.
             * It is strongly recommended to always use the `sort_end` field from the last search result.
             * Used for deep pagination, typically together with `stable_query_id` to maintain the context between requests.
             * Requires explicit sort to work reliably.
             * Typically used sort fields are `_id` or `_created_at`.
             *
             */
            search_after?: ((string | null) | (number | null))[];
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
             *   },
             *   "_manifest": [
             *     "123e4567-e89b-12d3-a456-426614174000",
             *     "123e4567-e89b-12d3-a456-426614174000"
             *   ]
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
            /**
             * A unique identifier of the query context.
             * Should be used on the input for the next query that needs to be executed in the same context.
             *
             */
            stable_query_id?: string;
            /**
             * The sort value of the last item returned in `results`.
             * Can be used as the input for the `search_after` in the next query.
             *
             * example:
             * [
             *   1747905443332,
             *   "0.000023312468"
             * ]
             */
            sort_end?: ((string | null) | (number | null))[];
        }
        /**
         * URL-friendly identifier for the entity schema
         * example:
         * contact
         */
        export type EntitySlug = string;
        export interface EntityTableFilterOption {
            /**
             * The type of filter option
             */
            type?: "search" | "filter";
            /**
             * The label for the filter option
             */
            label: string;
            /**
             * The label type for the filter option
             */
            label_type?: string;
            /**
             * The name for the filter option
             */
            name?: string;
            /**
             * The group for the filter option
             */
            group?: string;
            allowedSchemas?: string[];
            /**
             * The related options for the filter option
             */
            relatedOptions?: EntityTableFilterOption[];
        }
        export interface EntityTableFilterSearch {
            /**
             * The label for the search filter
             */
            label: string;
            /**
             * The type for the search filter
             */
            type: string;
            /**
             * The value for the search filter
             */
            value: string;
        }
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
        export type EntityValidationResult = /* Validation result for a successful validation */ EntityValidationResultSuccess | /* Validation result for a failed validation */ EntityValidationResultError;
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
        export interface EntityValidationV2Error {
            /**
             * validation keyword.
             */
            keyword: string;
            /**
             * JSON Pointer to the location in the data instance (e.g., `"/prop/1/subProp"`).
             */
            instance_path: string;
            /**
             * JSON Pointer to the location of the failing keyword in the schema.
             */
            schema_path: string;
            /**
             * Additional information about error.
             */
            params: {
                [name: string]: any;
            };
            /**
             * Set for errors in `propertyNames` keyword schema. `instance_path` still points to the object in this case.
             */
            property_name?: string;
            /**
             * The error message.
             */
            message?: string;
            /**
             * The value of the failing keyword in the schema.
             */
            schema?: {
                [key: string]: any;
            };
            /**
             * The schema containing the keyword.
             */
            parent_schema?: {
                [name: string]: any;
            };
            /**
             * The data validated by the keyword.
             */
            data?: {
                [name: string]: any;
            };
        }
        export type EntityValidationV2Result = /* Validation result for a successful validation */ EntityValidationV2ResultSuccess | /* Validation result for a failed validation */ EntityValidationV2ResultError;
        /**
         * Validation result for a failed validation
         */
        export interface EntityValidationV2ResultError {
            status: "error";
            errors: [
                EntityValidationV2Error,
                ...EntityValidationV2Error[]
            ];
        }
        /**
         * Validation result for a successful validation
         */
        export interface EntityValidationV2ResultSuccess {
            status: "success";
            errors: [
            ];
        }
        export interface EntityViewDisabled {
            view_type?: "disabled";
        }
        /**
         * A generic error returned by the API
         */
        export interface ErrorObject {
            /**
             * The HTTP status code of the error
             * example:
             * 400
             */
            status?: number;
            /**
             * The error message
             * example:
             * Bad Request
             */
            error?: string;
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
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
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
        export interface GenerateEntityTableAIFiltersRequest {
            /**
             * The prompt to generate the filters
             * example:
             * Show me all contacts that are not customers
             */
            prompt: string;
            /**
             * The main entity slug
             * example:
             * order
             */
            main_entity_slug: string;
            filter_options: EntityTableFilterOption[];
        }
        export type GenerateEntityTableAIFiltersResponse = EntityTableFilterSearch[];
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
         *   },
         *   "_manifest": [
         *     "123e4567-e89b-12d3-a456-426614174000"
         *   ]
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
        export interface GroupHeadline {
            id?: string; // uuid
            name: string;
            label: string;
            layout?: string;
            /**
             * The group of headline attribute
             */
            group: string;
            /**
             * The order of headline attribute
             */
            order?: number;
            type: "headline";
            enable_divider?: boolean;
            divider?: "top_divider" | "bottom_divider";
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema group headline
             */
            _manifest?: string /* uuid */[] | null;
        }
        /**
         * a readonly computed ID for the entity group headline including schema slug and the headline ID
         */
        export interface GroupHeadlineWithCompositeID {
            id?: string; // uuid
            name: string;
            label: string;
            layout?: string;
            /**
             * The group of headline attribute
             */
            group: string;
            /**
             * The order of headline attribute
             */
            order?: number;
            type: "headline";
            enable_divider?: boolean;
            divider?: "top_divider" | "bottom_divider";
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema group headline
             */
            _manifest?: string /* uuid */[] | null;
            /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            composite_id?: string;
            /**
             * Schema slug the capability belongs to
             * example:
             * contact
             */
            schema?: string;
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
         *   "_manifest": [
         *     "123e4567-e89b-12d3-a456-426614174000"
         *   ],
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
            _id: string; // uuid
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
            _deleted_at?: string | null; // date-time
            /**
             * Access control list (ACL) for an entity. Defines sharing access to external orgs or users.
             */
            _acl?: {
                [name: string]: any;
                view?: string[];
                edit?: string[];
                delete?: string[];
            };
            _purpose?: string[] | null;
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[] | null;
            _relations: {
                entity_id: EntityId /* uuid */;
            }[];
        }
        /**
         * No UI representation
         */
        export interface InternalAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "internal";
        }
        /**
         * Epilot internal user info
         */
        export interface InternalUserAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "internal_user";
        }
        /**
         * Email address for send invitation
         */
        export interface InvitationEmailAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "invitation_email";
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
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "link";
        }
        export interface ListSavedViewsResults {
            /**
             * example:
             * 1
             */
            hits?: number;
            results?: /* A saved entity view */ SavedViewItem[];
        }
        /**
         * Message emil address
         */
        export interface MessageEmailAddressAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "message_email_address";
            address?: string;
            send_status?: string;
            email_type?: string;
        }
        /**
         * Multi Choice Selection
         */
        export interface MultiSelectAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "multiselect" | "checkbox";
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
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "number";
            format?: string;
            /**
             * Whether or not to show a thousands separator
             */
            show_separator?: boolean;
        }
        /**
         * Type of attribute to render N number of ordered fields
         */
        export interface OrderedListAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "ordered_list";
        }
        /**
         * Shared Partner Organisations
         */
        export interface PartnerOrganisationAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "partner_organisation";
        }
        /**
         * Partner Status
         */
        export interface PartnerStatusAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "partner_status";
        }
        /**
         * Payment method
         */
        export interface PaymentAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "payment";
        }
        /**
         * Reference to a payment method attribute of another entity
         */
        export interface PaymentMethodRelationAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "relation_payment_method";
        }
        /**
         * Phone number
         */
        export interface PhoneAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "phone";
        }
        /**
         * Price component
         */
        export interface PriceComponentAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "price_component";
        }
        /**
         * Entity Taxonomy
         */
        export interface PurposeAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "purpose";
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
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * Relations are always repeatables
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "relation";
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
             * Additional entity search filter for relation picker
             */
            relation_picker_filter?: {
                /**
                 * example:
                 * NOT is_composite_price:true
                 */
                q: string;
            };
            /**
             * example:
             * [
             *   {
             *     "action_type": "add_existing",
             *     "label": "entityrelation.add_existing",
             *     "default": true
             *   },
             *   {
             *     "action_type": "create_new",
             *     "label": "entityrelation.create_new"
             *   },
             *   {
             *     "action_type": "create_from_existing",
             *     "label": "entityrelation.create_from_existing"
             *   }
             * ]
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
                 * Default field values for new entity to create
                 * example:
                 * {
                 *   "_schema": "order"
                 * }
                 */
                new_entity_item?: {
                    [name: string]: any;
                } | null;
            }[];
            drawer_size?: "small" | "medium" | "large";
            summary_fields?: (string | /* Summary Fields are displayed inside list view as a resume of the relation entity. */ SummaryField)[];
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
         *   },
         *   "_manifest": [
         *     "123e4567-e89b-12d3-a456-426614174000"
         *   ]
         * }
         */
        export interface RelationEntity {
            [name: string]: any;
            _id: string; // uuid
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
            _deleted_at?: string | null; // date-time
            /**
             * Access control list (ACL) for an entity. Defines sharing access to external orgs or users.
             */
            _acl?: {
                [name: string]: any;
                view?: string[];
                edit?: string[];
                delete?: string[];
            };
            _purpose?: string[] | null;
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[] | null;
            $relation?: RelationItem;
        }
        export interface RelationItem {
            entity_id: EntityId /* uuid */;
            /**
             * Organization Id the entity belongs to
             */
            org_id?: string;
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
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
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
            created_by?: {
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
            /**
             * List of users ('${userId}'), user groups ('group_${groupId}'), or partner users ('${partnerOrgId}_${partnerUserId}') that the view is shared with
             */
            shared_with?: string[];
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
            created_by?: {
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
            /**
             * List of users ('${userId}'), user groups ('group_${groupId}'), or partner users ('${partnerOrgId}_${partnerUserId}') that the view is shared with
             */
            shared_with?: string[];
        }
        /**
         * A saved entity view
         */
        export interface SavedViewPartial {
            /**
             * list of schemas a view can belong to
             */
            slug?: /**
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
            name?: string;
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
            created_by?: {
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
            ui_config?: {
                [name: string]: any;
            };
            /**
             * List of users ('${userId}'), user groups ('group_${groupId}'), or partner users ('${partnerOrgId}_${partnerUserId}') that the view is shared with
             */
            shared_with?: string[];
        }
        /**
         * Generated uuid for schema
         */
        export type SchemaId = string; // uuid
        /**
         * A subset of simplified Elasticsearch query clauses. The default operator is a logical AND. Use nested $and, $or, $not to combine filters using different logical operators.
         * example:
         * [
         *   {
         *     "term": {
         *       "_schema": "contact"
         *     }
         *   },
         *   {
         *     "terms": {
         *       "status": [
         *         "active"
         *       ]
         *     }
         *   }
         * ]
         */
        export type SearchFilter = {
            /**
             * Returns documents that contain an exact term in a provided field.
             *
             * To return a document, the query term must exactly match the queried field's value, including whitespace and capitalization.
             *
             * You likely DO NOT want to use this filter on text fields and want to target its .keyword instead.
             *
             * example:
             * {
             *   "_schema": "contact"
             * }
             */
            term?: {
                [name: string]: /* A filter field value. */ SearchFilterValue;
            };
            /**
             * Returns documents that contain one of the exact terms in a provided field. See term filter for more info.
             * example:
             * {
             *   "status": [
             *     "active"
             *   ]
             * }
             */
            terms?: {
                [name: string]: /* A filter field value. */ SearchFilterValue[];
            };
            /**
             * Returns documents based on their IDs.
             * example:
             * {
             *   "values": [
             *     "550e8400-e29b-41d4-a716-446655440000"
             *   ]
             * }
             */
            ids?: {
                values?: string[];
            };
            /**
             * Returns documents with fields that have terms within a certain range.
             * example:
             * {
             *   "_created_at": {
             *     "gte": "2021-01-01T00:00:00.000Z",
             *     "lte": "2021-01-31T23:59:59.999Z"
             *   }
             * }
             */
            range?: {
                [name: string]: {
                    gt?: /* A filter field value. */ SearchFilterValue;
                    gte?: /* A filter field value. */ SearchFilterValue;
                    lt?: /* A filter field value. */ SearchFilterValue;
                    lte?: /* A filter field value. */ SearchFilterValue;
                    /**
                     * The date format used to parse date values.
                     */
                    format?: string;
                    /**
                     * Indicates how the range query matches values for range fields.
                     */
                    relation?: "INTERSECTS" | "CONTAINS" | "WITHIN";
                    /**
                     * Coordinated Universal Time (UTC) offset or IANA time zone used to convert date values in the query to UTC.
                     */
                    time_zone?: string;
                };
            };
            /**
             * Returns documents that have a value in the specified field.
             * example:
             * {
             *   "field": "_tags"
             * }
             */
            exists?: {
                field: string;
            };
            $and?: /**
             * A subset of simplified Elasticsearch query clauses. The default operator is a logical AND. Use nested $and, $or, $not to combine filters using different logical operators.
             * example:
             * [
             *   {
             *     "term": {
             *       "_schema": "contact"
             *     }
             *   },
             *   {
             *     "terms": {
             *       "status": [
             *         "active"
             *       ]
             *     }
             *   }
             * ]
             */
            SearchFilter;
            $or?: /**
             * A subset of simplified Elasticsearch query clauses. The default operator is a logical AND. Use nested $and, $or, $not to combine filters using different logical operators.
             * example:
             * [
             *   {
             *     "term": {
             *       "_schema": "contact"
             *     }
             *   },
             *   {
             *     "terms": {
             *       "status": [
             *         "active"
             *       ]
             *     }
             *   }
             * ]
             */
            SearchFilter;
            $not?: /**
             * A subset of simplified Elasticsearch query clauses. The default operator is a logical AND. Use nested $and, $or, $not to combine filters using different logical operators.
             * example:
             * [
             *   {
             *     "term": {
             *       "_schema": "contact"
             *     }
             *   },
             *   {
             *     "terms": {
             *       "status": [
             *         "active"
             *       ]
             *     }
             *   }
             * ]
             */
            SearchFilter;
        }[];
        /**
         * A filter field value.
         */
        export type SearchFilterValue = /* A filter field value. */ (string | null) | number | boolean;
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
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "select" | "radio";
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
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "sequence";
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
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "status";
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
            /**
             * Defines the display mode of the summary attribute.
             * When set to `inline`, the label and value will be displayed in the same line.
             * When set to `block`, the label and value will be displayed in separate lines.
             *
             */
            display_mode?: "inline" | "block";
            /**
             * Defines the line numbers of the content.
             * For instance, When set to 1, the content will be displayed in a single line.
             *
             */
            content_line_cap?: number;
            /**
             * Defines white-space of the content.
             *
             */
            content_wrap?: "normal" | "nowrap" | "pre" | "pre-wrap";
            /**
             * When set to true, will hide the label of the field.
             */
            hide_label?: boolean;
            /**
             * When set to true, will highlight the container of the field.
             */
            highlight_container?: boolean;
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
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "tags";
            options?: string[];
            suggestions?: string[];
        }
        export interface Taxonomy {
            slug?: /**
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
            name?: string;
            /**
             * Plural name of a Taxonomy e.g. Purposes, Product Categories, Folders, Tags. Defaults to name is not provided.
             * example:
             * Purposes
             */
            plural?: string;
            /**
             * Kind of taxonomy e.g. system or user_defined. By default, it's empty, which means 'user_defined'
             * example:
             * system
             */
            kind?: "system" | "user_defined";
            /**
             * Type of taxonomy. Whether it classifies entities or relations.
             * example:
             * entity
             */
            type?: "entity" | "relation";
            /**
             * Icon name for the taxonomy (from epilot360/icons icon set)
             * example:
             * purpose
             */
            icon?: string;
            /**
             * HEX Color code for the taxonomy
             * example:
             * #FF5733
             */
            color?: string;
            created_at?: string; // date-time
            updated_at?: string; // date-time
            /**
             * Date when the taxonomy was soft-deleted (enabled: false)
             */
            deleted_at?: string; // date-time
            /**
             * User ID of the creator
             * example:
             * 10598
             */
            created_by?: string;
            /**
             * Whether the taxonomy is enabled or not
             * example:
             * true
             */
            enabled?: boolean;
            /**
             * Position of the taxonomy
             * example:
             * 10
             */
            order?: number;
            /**
             * List of locations where the taxonomy is enabled to be used. If empty, it's enabled for all locations.
             */
            enabled_locations?: (TaxonomyLocationId | string)[];
        }
        /**
         * example:
         * {
         *   "job_id": "123e4567-e89b-12d3-a456-426614174000",
         *   "status": "PENDING",
         *   "action_type": "MOVE_CLASSIFICATIONS",
         *   "created_by": "10598",
         *   "created_at": "2024-01-01T00:00:00.000Z",
         *   "updated_at": "2024-01-01T00:00:00.000Z",
         *   "org": "66"
         * }
         */
        export interface TaxonomyBulkJob {
            job_id?: string; // uuid
            job_status?: /* The status of the bulk job */ TaxonomyBulkJobStatus;
            failure_reason?: string;
            action_type?: TaxonomyBulkJobActionType;
            request?: {
                target_taxonomy?: /**
                 * URL-friendly name for taxonomy
                 * example:
                 * purpose
                 */
                TaxonomySlug;
                target_classification?: /**
                 * example:
                 * taxonomy-slug:classification-slug
                 */
                ClassificationId;
                classification_ids?: /**
                 * example:
                 * taxonomy-slug:classification-slug
                 */
                ClassificationId[];
            };
            output?: {
                target_entities_count?: number;
                affected_entities_count?: number;
                failures_count?: number;
                failed_entities?: EntityId /* uuid */[];
            };
            created_by?: string;
            created_at?: string; // date-time
            updated_at?: string; // date-time
            org?: string;
        }
        export type TaxonomyBulkJobActionType = "MOVE_CLASSIFICATIONS" | "MERGE_CLASSIFICATIONS" | "DELETE_CLASSIFICATIONS";
        /**
         * The status of the bulk job
         */
        export type TaxonomyBulkJobStatus = "PENDING" | "FAILED" | "COMPLETED" | "CANCELLED";
        export interface TaxonomyBulkJobTriggerResponse {
            job_id?: string; // uuid
            status?: /* The status of the bulk job */ TaxonomyBulkJobStatus;
        }
        export interface TaxonomyClassification {
            id?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId;
            /**
             * URL-friendly identifier for the classification
             * example:
             * wallbox-pv
             */
            slug: string;
            /**
             * example:
             * Wallbox PV
             */
            name: string;
            parents?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Color of the classification
             * example:
             * #FF5733
             */
            color?: string;
            created_at?: string; // date-time
            updated_at?: string; // date-time
            /**
             * Archived classification are not visible in the UI
             */
            archived?: boolean;
            /**
             * Manifest ID used to create/update the taxonomy classification
             */
            _manifest?: string /* uuid */[] | null;
        }
        export type TaxonomyLocationId = "account" | "contact" | "contract" | "email_template" | "file" | "journey" | "meter_counter" | "meter" | "opportunity" | "order" | "partner" | "price" | "product" | "submission" | "tax" | "message" | "portal_user" | "request" | "comment";
        /**
         * Whether to include archived labels in the search results
         * - `true`: include archived labels
         * - `false`: exclude archived labels
         * - `only`: include only archived labels
         *
         * By default, no archived labels are included in the search results.
         *
         */
        export type TaxonomySearchIncludeArchivedParam = "true" | "false" | "only";
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
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "string";
            multiline?: boolean;
            rich_text?: boolean;
            /**
             * Number of rows for rich_text textarea
             * example:
             * 3
             */
            rows?: /**
             * Number of rows for rich_text textarea
             * example:
             * 3
             */
            number | string;
        }
        /**
         * User Relationship
         */
        export interface UserRelationAttribute {
            /**
             * ID for the entity attribute
             * example:
             * d5839b94-ba20-4225-a78e-76951d352bd6
             */
            id?: string;
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
            _purpose?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            ClassificationId[];
            /**
             * Manifest ID used to create/update the schema attribute
             */
            _manifest?: string /* uuid */[] | null;
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
             * This attribute should only be active when one of the provided settings have the correct value
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
            /**
             * The attribute is a repeatable
             */
            repeatable?: boolean;
            has_primary?: boolean;
            type: "relation_user";
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
            Components.Schemas.ActivityId /* ulid ^01[0-9a-zA-Z]{24}$ */ | ("" | null);
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
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
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
            Components.Schemas.ActivityId /* ulid ^01[0-9a-zA-Z]{24}$ */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            entities?: Parameters.Entities;
        }
        namespace Responses {
            export type $200 = Components.Schemas.BaseActivityItem;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
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
    namespace BulkDeleteClassifications {
        export interface RequestBody {
            /**
             * Job ID for tracking the status of a bulk operation request
             */
            job_id?: string;
            classification_ids?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            Components.Schemas.ClassificationId[];
        }
        namespace Responses {
            export type $200 = Components.Schemas.TaxonomyBulkJobTriggerResponse;
            export interface $400 {
            }
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace BulkMergeClassifications {
        export interface RequestBody {
            /**
             * Job ID for tracking the status of a bulk operation request
             */
            job_id?: string;
            /**
             * URL-friendly name for taxonomy
             * example:
             * purpose
             */
            target_classification?: string;
            classification_ids?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            Components.Schemas.ClassificationId[];
        }
        namespace Responses {
            export type $200 = Components.Schemas.TaxonomyBulkJobTriggerResponse;
            export interface $400 {
            }
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace BulkMoveClassifications {
        export interface RequestBody {
            /**
             * Job ID for tracking the status of a bulk operation request
             */
            job_id?: string;
            /**
             * URL-friendly name for taxonomy
             * example:
             * purpose
             */
            target_taxonomy?: string;
            classification_ids?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            Components.Schemas.ClassificationId[];
        }
        namespace Responses {
            export type $200 = Components.Schemas.TaxonomyBulkJobTriggerResponse;
            export interface $400 {
            }
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace CancelBulkAction {
        namespace Parameters {
            export type JobId = string;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "job_id": "123e4567-e89b-12d3-a456-426614174000",
             *   "status": "PENDING",
             *   "action_type": "MOVE_CLASSIFICATIONS",
             *   "created_by": "10598",
             *   "created_at": "2024-01-01T00:00:00.000Z",
             *   "updated_at": "2024-01-01T00:00:00.000Z",
             *   "org": "66"
             * }
             */
            Components.Schemas.TaxonomyBulkJob;
            export interface $400 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
            export interface $500 {
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
            export type $200 = Components.Schemas.BaseActivityItem;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace CreateEntity {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid ^01[0-9a-zA-Z]{24}$ */ | ("" | null);
            export type Async = boolean;
            export type FillActivity = boolean;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
            export type Validate = boolean;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        export interface QueryParameters {
            activity_id?: Parameters.ActivityId;
            fill_activity?: Parameters.FillActivity;
            async?: Parameters.Async;
            validate?: Parameters.Validate;
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
         *   },
         *   "_manifest": [
         *     "123e4567-e89b-12d3-a456-426614174000"
         *   ]
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
             *   },
             *   "_manifest": [
             *     "123e4567-e89b-12d3-a456-426614174000",
             *     "123e4567-e89b-12d3-a456-426614174000"
             *   ]
             * }
             */
            Components.Schemas.EntityItem;
            export type $422 = /* Validation result for a failed validation */ Components.Schemas.EntityValidationV2ResultError;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace CreateSavedView {
        export type RequestBody = /* A saved entity view */ Components.Schemas.SavedView;
        namespace Responses {
            export type $201 = /* A saved entity view */ Components.Schemas.SavedViewItem;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace CreateSchemaAttribute {
        export type RequestBody = /* a readonly computed ID for the attribute including schema slug and the attribute ID */ Components.Schemas.AttributeWithCompositeID;
        namespace Responses {
            export type $201 = /* a readonly computed ID for the attribute including schema slug and the attribute ID */ Components.Schemas.AttributeWithCompositeID;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace CreateSchemaCapability {
        export type RequestBody = /* a readonly computed ID for the entity capability including schema slug and the capability ID */ Components.Schemas.EntityCapabilityWithCompositeID;
        namespace Responses {
            export type $201 = /* a readonly computed ID for the entity capability including schema slug and the capability ID */ Components.Schemas.EntityCapabilityWithCompositeID;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace CreateSchemaGroup {
        export type RequestBody = /* a readonly computed ID for the group including schema slug and the group ID */ Components.Schemas.EntitySchemaGroupWithCompositeID;
        namespace Responses {
            export type $201 = /* a readonly computed ID for the group including schema slug and the group ID */ Components.Schemas.EntitySchemaGroupWithCompositeID;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace CreateSchemaGroupHeadline {
        export type RequestBody = /* a readonly computed ID for the entity group headline including schema slug and the headline ID */ Components.Schemas.GroupHeadlineWithCompositeID;
        namespace Responses {
            export type $201 = /* a readonly computed ID for the entity group headline including schema slug and the headline ID */ Components.Schemas.GroupHeadlineWithCompositeID;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace CreateTaxonomy {
        export type RequestBody = Components.Schemas.Taxonomy;
        namespace Responses {
            export type $201 = Components.Schemas.Taxonomy;
            export interface $409 {
            }
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace CreateTaxonomyClassification {
        export type RequestBody = Components.Schemas.TaxonomyClassification;
        namespace Responses {
            export type $201 = Components.Schemas.TaxonomyClassification;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace DeleteEntity {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid ^01[0-9a-zA-Z]{24}$ */ | ("" | null);
            export type Id = Components.Schemas.EntityId /* uuid */;
            export type Purge = boolean;
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
            purge?: Parameters.Purge;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace DeleteRelation {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid ^01[0-9a-zA-Z]{24}$ */ | ("" | null);
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
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
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
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
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
            export interface $200 {
            }
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace DeleteSchemaAttribute {
        namespace Parameters {
            /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            export type CompositeId = string; // ^.+:.+$
        }
        export interface PathParameters {
            composite_id: /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            Parameters.CompositeId /* ^.+:.+$ */;
        }
        namespace Responses {
            export type $200 = /* a readonly computed ID for the attribute including schema slug and the attribute ID */ Components.Schemas.AttributeWithCompositeID;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace DeleteSchemaCapability {
        namespace Parameters {
            /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            export type CompositeId = string; // ^.+:.+$
        }
        export interface PathParameters {
            composite_id: /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            Parameters.CompositeId /* ^.+:.+$ */;
        }
        namespace Responses {
            export type $200 = /* a readonly computed ID for the entity capability including schema slug and the capability ID */ Components.Schemas.EntityCapabilityWithCompositeID;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace DeleteSchemaGroup {
        namespace Parameters {
            /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            export type CompositeId = string; // ^.+:.+$
        }
        export interface PathParameters {
            composite_id: /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            Parameters.CompositeId /* ^.+:.+$ */;
        }
        namespace Responses {
            export type $200 = /* a readonly computed ID for the group including schema slug and the group ID */ Components.Schemas.EntitySchemaGroupWithCompositeID;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace DeleteSchemaGroupHeadline {
        namespace Parameters {
            /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            export type CompositeId = string; // ^.+:.+$
        }
        export interface PathParameters {
            composite_id: /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            Parameters.CompositeId /* ^.+:.+$ */;
        }
        namespace Responses {
            export type $200 = /* a readonly computed ID for the entity group headline including schema slug and the headline ID */ Components.Schemas.GroupHeadlineWithCompositeID;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace DeleteTaxonomy {
        namespace Parameters {
            export type Permanent = boolean;
            export type TaxonomySlug = string;
        }
        export interface PathParameters {
            taxonomySlug: Parameters.TaxonomySlug;
        }
        export interface QueryParameters {
            permanent?: Parameters.Permanent;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace DeleteTaxonomyClassification {
        namespace Parameters {
            export type ClassificationSlug = string;
        }
        export interface PathParameters {
            classificationSlug: Parameters.ClassificationSlug;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TaxonomyClassification;
            export interface $403 {
            }
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
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
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace GetActivity {
        namespace Parameters {
            export type Id = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid ^01[0-9a-zA-Z]{24}$ */;
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
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
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
                 *   },
                 *   "_manifest": [
                 *     "123e4567-e89b-12d3-a456-426614174000",
                 *     "123e4567-e89b-12d3-a456-426614174000"
                 *   ]
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
                 *   },
                 *   "_manifest": [
                 *     "123e4567-e89b-12d3-a456-426614174000",
                 *     "123e4567-e89b-12d3-a456-426614174000"
                 *   ]
                 * }
                 */
                Components.Schemas.EntityItem[];
            }
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
        }
    }
    namespace GetEntityActivityFeed {
        namespace Parameters {
            export type After = string; // date-time
            export type Before = string; // date-time
            export type EndDate = string; // date-time
            /**
             * example:
             * workflow
             */
            export type ExcludeActivityGroups = string;
            export type From = number;
            export type Id = Components.Schemas.EntityId /* uuid */;
            export type IncludeRelations = boolean;
            /**
             * example:
             * last_week
             */
            export type PresetRange = "today" | "this_week" | "last_week";
            export type Size = number;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
            export type StartDate = string; // date-time
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
            start_date?: Parameters.StartDate /* date-time */;
            end_date?: Parameters.EndDate /* date-time */;
            preset_range?: /**
             * example:
             * last_week
             */
            Parameters.PresetRange;
            from?: Parameters.From;
            size?: Parameters.Size;
            type?: /**
             * example:
             * SyncActivity
             */
            Parameters.Type;
            include_relations?: Parameters.IncludeRelations;
            exclude_activity_groups?: /**
             * example:
             * workflow
             */
            Parameters.ExcludeActivityGroups;
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
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
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
             *   },
             *   "_manifest": [
             *     "123e4567-e89b-12d3-a456-426614174000",
             *     "123e4567-e89b-12d3-a456-426614174000"
             *   ]
             * }
             */
            Components.Schemas.EntityItem;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
        }
    }
    namespace GetJsonSchema {
        namespace Parameters {
            export type Dereference = boolean;
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
            dereference?: Parameters.Dereference;
        }
        namespace Responses {
            /**
             * example:
             * {
             *   "$schema": "http://json-schema.org/draft/2020-12/schema",
             *   "type": "object",
             *   "properties": {
             *     "_id": {
             *       "type": "string",
             *       "format": "uuid",
             *       "example": "123e4567-e89b-12d3-a456-426614174000"
             *     },
             *     "_org": {
             *       "type": "string",
             *       "description": "Organization Id the entity belongs to",
             *       "readOnly": true
             *     },
             *     "_owners": {
             *       "type": "array",
             *       "readOnly": true,
             *       "items": {
             *         "description": "The user / organization owning this entity.\n\nNote: Owner implicitly has access to the entity regardless of ACLs.\n",
             *         "type": "object",
             *         "properties": {
             *           "org_id": {
             *             "type": "string",
             *             "example": "123"
             *           },
             *           "user_id": {
             *             "type": "string",
             *             "example": "123"
             *           }
             *         },
             *         "required": [
             *           "org_id"
             *         ]
             *       }
             *     },
             *     "_schema": {
             *       "readOnly": true,
             *       "type": "string"
             *     },
             *     "_title": {
             *       "readOnly": true,
             *       "type": "string"
             *     },
             *     "_tags": {
             *       "type": "array",
             *       "nullable": true,
             *       "items": {
             *         "type": "string"
             *       }
             *     },
             *     "_manifest": {
             *       "type": "array",
             *       "description": "Manifest ID used to create/update the entity",
             *       "items": {
             *         "type": "string",
             *         "format": "uuid",
             *         "example": "123e4567-e89b-12d3-a456-426614174000"
             *       }
             *     },
             *     "_created_at": {
             *       "readOnly": true,
             *       "type": "string",
             *       "format": "date-time"
             *     },
             *     "_updated_at": {
             *       "readOnly": true,
             *       "type": "string",
             *       "format": "date-time"
             *     },
             *     "_acl": {
             *       "readOnly": true,
             *       "type": "object",
             *       "description": "Access control list (ACL) for an entity. Defines sharing access to external orgs or users.",
             *       "additionalProperties": true,
             *       "properties": {
             *         "view": {
             *           "type": "array",
             *           "items": {
             *             "type": "string",
             *             "example": "org:456"
             *           }
             *         },
             *         "edit": {
             *           "type": "array",
             *           "items": {
             *             "type": "string",
             *             "example": "org:456"
             *           }
             *         },
             *         "delete": {
             *           "type": "array",
             *           "items": {
             *             "type": "string",
             *             "example": "org:456"
             *           }
             *         }
             *       }
             *     },
             *     "title": {
             *       "type": "string",
             *       "nullable": true,
             *       "enum": [
             *         "Dr.",
             *         "Prof.",
             *         "Prof. Dr.",
             *         null
             *       ]
             *     },
             *     "salutation": {
             *       "type": "string",
             *       "nullable": true,
             *       "enum": [
             *         "Mr.",
             *         "Ms. / Mrs.",
             *         "Company",
             *         "Contact Person",
             *         "Company/Contact Person",
             *         "Spouse",
             *         "Family",
             *         "Ownership",
             *         "Assembly",
             *         "Other",
             *         null
             *       ]
             *     },
             *     "first_name": {
             *       "type": "string"
             *     },
             *     "last_name": {
             *       "type": "string"
             *     },
             *     "customer_number": {
             *       "type": "string",
             *       "nullable": true
             *     },
             *     "birthdate": {
             *       "type": "string",
             *       "format": "date",
             *       "nullable": true
             *     },
             *     "account": {
             *       "type": "object",
             *       "nullable": true,
             *       "properties": {
             *         "$relation": {
             *           "type": "array",
             *           "items": {
             *             "type": "object",
             *             "properties": {
             *               "entity_id": {
             *                 "type": "string",
             *                 "format": "uuid",
             *                 "example": "123e4567-e89b-12d3-a456-426614174000"
             *               },
             *               "_tags": {
             *                 "type": "array",
             *                 "nullable": true,
             *                 "items": {
             *                   "type": "string"
             *                 }
             *               }
             *             },
             *             "required": [
             *               "entity_id"
             *             ]
             *           }
             *         }
             *       },
             *       "additionalProperties": true
             *     },
             *     "address": {
             *       "type": "array",
             *       "nullable": true,
             *       "description": "Addresses as a list of object, the element with index 0 is treated as the primary one.\n",
             *       "items": {
             *         "type": "object",
             *         "properties": {
             *           "street": {
             *             "type": "string",
             *             "nullable": true
             *           },
             *           "street_number": {
             *             "type": "string",
             *             "nullable": true
             *           },
             *           "postal_code": {
             *             "type": "string",
             *             "nullable": true
             *           },
             *           "city": {
             *             "type": "string",
             *             "nullable": true
             *           },
             *           "country": {
             *             "type": "string",
             *             "nullable": true,
             *             "enum": [
             *               "DE",
             *               "AT",
             *               "CH",
             *               null
             *             ]
             *           },
             *           "additional_info": {
             *             "type": "string",
             *             "nullable": true
             *           },
             *           "_tags": {
             *             "type": "array",
             *             "nullable": true,
             *             "items": {
             *               "type": "string"
             *             }
             *           },
             *           "_id": {
             *             "type": "string",
             *             "example": "xHcOoJCa07eysJ1GaQeSb"
             *           }
             *         },
             *         "required": [
             *           "street",
             *           "street_number",
             *           "postal_code",
             *           "city",
             *           "country"
             *         ]
             *       }
             *     },
             *     "email": {
             *       "type": "array",
             *       "nullable": true,
             *       "description": "Email addresses as a list of object, the element with index 0 is treated as the primary one.\n",
             *       "items": {
             *         "type": "object",
             *         "properties": {
             *           "_id": {
             *             "type": "string",
             *             "example": "xHcOoJCa07eysJ1GaQeSb"
             *           },
             *           "_tags": {
             *             "type": "array",
             *             "nullable": true,
             *             "items": {
             *               "type": "string"
             *             }
             *           },
             *           "email": {
             *             "type": "string"
             *           }
             *         },
             *         "required": [
             *           "email"
             *         ]
             *       }
             *     },
             *     "phone": {
             *       "type": "array",
             *       "description": "Phone numbers as a list of object, the element with index 0 is treated as the primary one.\n",
             *       "items": {
             *         "type": "object",
             *         "properties": {
             *           "_id": {
             *             "type": "string",
             *             "example": "xHcOoJCa07eysJ1GaQeSb"
             *           },
             *           "_tags": {
             *             "type": "array",
             *             "nullable": true,
             *             "items": {
             *               "type": "string"
             *             }
             *           },
             *           "phone": {
             *             "type": "string"
             *           }
             *         },
             *         "required": [
             *           "phone"
             *         ]
             *       }
             *     }
             *   },
             *   "required": [
             *     "first_name",
             *     "last_name",
             *     "_id",
             *     "_org",
             *     "_owners",
             *     "_schema",
             *     "_title",
             *     "_tags",
             *     "_created_at",
             *     "_updated_at",
             *     "_acl"
             *   ]
             * }
             */
            export interface $200 {
            }
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
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
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
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
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
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
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
            fields?: Parameters.Fields;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetRelationsRespWithPagination;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
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
            export type $200 = /* A saved entity view */ Components.Schemas.SavedViewItem;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
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
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
        }
    }
    namespace GetSchemaAttribute {
        namespace Parameters {
            /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            export type CompositeId = string; // ^.+:.+$
        }
        export interface PathParameters {
            composite_id: /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            Parameters.CompositeId /* ^.+:.+$ */;
        }
        namespace Responses {
            export type $200 = /* a readonly computed ID for the attribute including schema slug and the attribute ID */ Components.Schemas.AttributeWithCompositeID;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
        }
    }
    namespace GetSchemaCapability {
        namespace Parameters {
            /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            export type CompositeId = string; // ^.+:.+$
        }
        export interface PathParameters {
            composite_id: /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            Parameters.CompositeId /* ^.+:.+$ */;
        }
        namespace Responses {
            export type $200 = /* a readonly computed ID for the entity capability including schema slug and the capability ID */ Components.Schemas.EntityCapabilityWithCompositeID;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
        }
    }
    namespace GetSchemaExample {
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
            export interface $200 {
            }
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace GetSchemaGroup {
        namespace Parameters {
            /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            export type CompositeId = string; // ^.+:.+$
        }
        export interface PathParameters {
            composite_id: /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            Parameters.CompositeId /* ^.+:.+$ */;
        }
        namespace Responses {
            export type $200 = /* a readonly computed ID for the group including schema slug and the group ID */ Components.Schemas.EntitySchemaGroupWithCompositeID;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
        }
    }
    namespace GetSchemaGroupHeadline {
        namespace Parameters {
            /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            export type CompositeId = string; // ^.+:.+$
        }
        export interface PathParameters {
            composite_id: /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            Parameters.CompositeId /* ^.+:.+$ */;
        }
        namespace Responses {
            export type $200 = /* a readonly computed ID for the entity group headline including schema slug and the headline ID */ Components.Schemas.GroupHeadlineWithCompositeID;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
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
                versions: /* The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities. */ Components.Schemas.EntitySchemaItem[];
                drafts?: /* The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities. */ Components.Schemas.EntitySchemaItem[];
                /**
                 * Pagination: Whether more versions are available
                 */
                versions_more: boolean;
                /**
                 * Pagination: Whether more drafts are available
                 */
                drafts_more?: boolean;
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
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
        }
    }
    namespace GetTaxonomyBulkActionJobById {
        namespace Parameters {
            export type JobId = string;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "job_id": "123e4567-e89b-12d3-a456-426614174000",
             *   "status": "PENDING",
             *   "action_type": "MOVE_CLASSIFICATIONS",
             *   "created_by": "10598",
             *   "created_at": "2024-01-01T00:00:00.000Z",
             *   "updated_at": "2024-01-01T00:00:00.000Z",
             *   "org": "66"
             * }
             */
            Components.Schemas.TaxonomyBulkJob;
        }
    }
    namespace GetTaxonomyBulkActionJobs {
        namespace Parameters {
            /**
             * ISO 8601 timestamp to filter jobs created after this time (e.g., 2023-01-01T00:00:00Z).
             * example:
             * 2023-01-01T00:00:00Z
             */
            export type CreatedAfter = string; // date-time
            /**
             * Scope of jobs to return. 'me' returns only jobs created by the current user, 'all' returns jobs from all users in the organization.
             */
            export type Scope = "me" | "all";
            /**
             * The maximum number of jobs to return (defaults to 20)
             */
            export type Size = number;
            /**
             * When true, sorts PENDING status jobs to the top of the results.
             */
            export type SortPendingFirst = boolean;
            /**
             * A comma separated list of job statuses to return
             */
            export type Status = string[];
        }
        export interface QueryParameters {
            status?: /* A comma separated list of job statuses to return */ Parameters.Status;
            size?: /* The maximum number of jobs to return (defaults to 20) */ Parameters.Size;
            created_after?: /**
             * ISO 8601 timestamp to filter jobs created after this time (e.g., 2023-01-01T00:00:00Z).
             * example:
             * 2023-01-01T00:00:00Z
             */
            Parameters.CreatedAfter /* date-time */;
            sort_pending_first?: /* When true, sorts PENDING status jobs to the top of the results. */ Parameters.SortPendingFirst;
            scope?: /* Scope of jobs to return. 'me' returns only jobs created by the current user, 'all' returns jobs from all users in the organization. */ Parameters.Scope;
        }
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "job_id": "123e4567-e89b-12d3-a456-426614174000",
             *   "status": "PENDING",
             *   "action_type": "MOVE_CLASSIFICATIONS",
             *   "created_by": "10598",
             *   "created_at": "2024-01-01T00:00:00.000Z",
             *   "updated_at": "2024-01-01T00:00:00.000Z",
             *   "org": "66"
             * }
             */
            Components.Schemas.TaxonomyBulkJob[];
        }
    }
    namespace GetTaxonomyClassification {
        namespace Parameters {
            export type ClassificationSlug = string;
        }
        export interface PathParameters {
            classificationSlug: Parameters.ClassificationSlug;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TaxonomyClassification;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
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
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace ListEntities {
        export type RequestBody = Components.Schemas.EntityListParams;
        namespace Responses {
            export type $200 = Components.Schemas.EntitySearchResults;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
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
            export type Size = number;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
            export type Sort = string;
        }
        export interface QueryParameters {
            slug?: Parameters.Slug;
            sort?: Parameters.Sort;
            from?: Parameters.From;
            size?: Parameters.Size;
            fields?: Parameters.Fields;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ListSavedViewsResults;
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
        namespace Parameters {
            export type IncludeDisabled = boolean;
            export type Type = "entity" | "relation";
        }
        export interface QueryParameters {
            include_disabled?: Parameters.IncludeDisabled;
            type?: Parameters.Type;
        }
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
            Components.Schemas.ActivityId /* ulid ^01[0-9a-zA-Z]{24}$ */ | ("" | null);
            export type Async = boolean;
            export type DryRun = boolean;
            export type FillActivity = boolean;
            export type Id = Components.Schemas.EntityId /* uuid */;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
            export type Validate = boolean;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            id: Parameters.Id;
        }
        export interface QueryParameters {
            activity_id?: Parameters.ActivityId;
            fill_activity?: Parameters.FillActivity;
            dry_run?: Parameters.DryRun;
            async?: Parameters.Async;
            validate?: Parameters.Validate;
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
         *   },
         *   "_manifest": [
         *     "123e4567-e89b-12d3-a456-426614174000"
         *   ]
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
             *   },
             *   "_manifest": [
             *     "123e4567-e89b-12d3-a456-426614174000",
             *     "123e4567-e89b-12d3-a456-426614174000"
             *   ]
             * }
             */
            Components.Schemas.EntityItem;
            export interface $409 {
            }
            export type $422 = /* Validation result for a failed validation */ Components.Schemas.EntityValidationV2ResultError;
        }
    }
    namespace PatchSavedView {
        namespace Parameters {
            export type Id = /* Generated uuid for a saved view */ Components.Schemas.SavedViewId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = /* A saved entity view */ Components.Schemas.SavedViewPartial;
        namespace Responses {
            export type $200 = /* A saved entity view */ Components.Schemas.SavedViewItem;
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
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace PutSchemaAttribute {
        namespace Parameters {
            /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            export type CompositeId = string; // ^.+:.+$
        }
        export interface PathParameters {
            composite_id: /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            Parameters.CompositeId /* ^.+:.+$ */;
        }
        export type RequestBody = /* a readonly computed ID for the attribute including schema slug and the attribute ID */ Components.Schemas.AttributeWithCompositeID;
        namespace Responses {
            export type $200 = /* a readonly computed ID for the attribute including schema slug and the attribute ID */ Components.Schemas.AttributeWithCompositeID;
        }
    }
    namespace PutSchemaCapability {
        namespace Parameters {
            /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            export type CompositeId = string; // ^.+:.+$
        }
        export interface PathParameters {
            composite_id: /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            Parameters.CompositeId /* ^.+:.+$ */;
        }
        export type RequestBody = /* a readonly computed ID for the entity capability including schema slug and the capability ID */ Components.Schemas.EntityCapabilityWithCompositeID;
        namespace Responses {
            export type $200 = /* a readonly computed ID for the entity capability including schema slug and the capability ID */ Components.Schemas.EntityCapabilityWithCompositeID;
        }
    }
    namespace PutSchemaGroup {
        namespace Parameters {
            /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            export type CompositeId = string; // ^.+:.+$
        }
        export interface PathParameters {
            composite_id: /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            Parameters.CompositeId /* ^.+:.+$ */;
        }
        export type RequestBody = /* a readonly computed ID for the group including schema slug and the group ID */ Components.Schemas.EntitySchemaGroupWithCompositeID;
        namespace Responses {
            export type $200 = /* a readonly computed ID for the group including schema slug and the group ID */ Components.Schemas.EntitySchemaGroupWithCompositeID;
        }
    }
    namespace PutSchemaGroupHeadline {
        namespace Parameters {
            /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            export type CompositeId = string; // ^.+:.+$
        }
        export interface PathParameters {
            composite_id: /**
             * example:
             * contact:97644baa-083f-4e49-9188-fcff2ecaad7d
             */
            Parameters.CompositeId /* ^.+:.+$ */;
        }
        export type RequestBody = /* a readonly computed ID for the entity group headline including schema slug and the headline ID */ Components.Schemas.GroupHeadlineWithCompositeID;
        namespace Responses {
            export type $200 = /* a readonly computed ID for the entity group headline including schema slug and the headline ID */ Components.Schemas.GroupHeadlineWithCompositeID;
        }
    }
    namespace ReindexEntity {
        namespace Parameters {
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
        /**
         * This endpoint doesn't require a payload, but an empty object can be sent to satisfy certain HTTP clients.
         */
        export interface RequestBody {
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
             *   },
             *   "_manifest": [
             *     "123e4567-e89b-12d3-a456-426614174000",
             *     "123e4567-e89b-12d3-a456-426614174000"
             *   ]
             * }
             */
            Components.Schemas.EntityItem;
            export interface $404 {
            }
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
            export interface $500 {
            }
        }
    }
    namespace RemoveRelations {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid ^01[0-9a-zA-Z]{24}$ */ | ("" | null);
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
            export interface $204 {
            }
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace RestoreEntity {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid ^01[0-9a-zA-Z]{24}$ */ | ("" | null);
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
            activity_id?: Parameters.ActivityId;
        }
        /**
         * This endpoint doesn't require a payload, but an empty object can be sent to satisfy certain HTTP clients.
         */
        export interface RequestBody {
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
             *   },
             *   "_manifest": [
             *     "123e4567-e89b-12d3-a456-426614174000",
             *     "123e4567-e89b-12d3-a456-426614174000"
             *   ]
             * }
             */
            Components.Schemas.EntityItem;
            export interface $400 {
            }
            export interface $404 {
            }
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace SearchEntities {
        export type RequestBody = Components.Schemas.EntitySearchParams;
        namespace Responses {
            export type $200 = Components.Schemas.EntitySearchResults;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace TaxonomiesClassificationsSearch {
        namespace Parameters {
            /**
             * example:
             * false
             */
            export type Archived = boolean;
            export type IncludeArchived = /**
             * Whether to include archived labels in the search results
             * - `true`: include archived labels
             * - `false`: exclude archived labels
             * - `only`: include only archived labels
             *
             * By default, no archived labels are included in the search results.
             *
             */
            Components.Schemas.TaxonomySearchIncludeArchivedParam;
            /**
             * example:
             * sales
             */
            export type Query = string;
            export type TaxonomySlug = string | string[];
        }
        export interface QueryParameters {
            taxonomySlug?: Parameters.TaxonomySlug;
            query?: /**
             * example:
             * sales
             */
            Parameters.Query;
            archived?: /**
             * example:
             * false
             */
            Parameters.Archived;
            include_archived?: Parameters.IncludeArchived;
        }
        export interface RequestBody {
            classificationIds?: /**
             * example:
             * taxonomy-slug:classification-slug
             */
            Components.Schemas.ClassificationId[];
        }
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.TaxonomyClassification[];
                /**
                 * example:
                 * 10
                 */
                hits?: number;
            }
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
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
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace UpdateEntity {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid ^01[0-9a-zA-Z]{24}$ */ | ("" | null);
            export type Async = boolean;
            export type FillActivity = boolean;
            export type Id = Components.Schemas.EntityId /* uuid */;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
            export type Validate = boolean;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            id: Parameters.Id;
        }
        export interface QueryParameters {
            activity_id?: Parameters.ActivityId;
            fill_activity?: Parameters.FillActivity;
            async?: Parameters.Async;
            validate?: Parameters.Validate;
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
         *   },
         *   "_manifest": [
         *     "123e4567-e89b-12d3-a456-426614174000"
         *   ]
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
             *   },
             *   "_manifest": [
             *     "123e4567-e89b-12d3-a456-426614174000",
             *     "123e4567-e89b-12d3-a456-426614174000"
             *   ]
             * }
             */
            Components.Schemas.EntityItem;
            export type $422 = /* Validation result for a failed validation */ Components.Schemas.EntityValidationV2ResultError;
        }
    }
    namespace UpdateRelation {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid ^01[0-9a-zA-Z]{24}$ */ | ("" | null);
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
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
        }
    }
    namespace UpdateSavedView {
        namespace Parameters {
            export type Id = /* Generated uuid for a saved view */ Components.Schemas.SavedViewId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = /* A saved entity view */ Components.Schemas.SavedViewItem;
        namespace Responses {
            export type $200 = /* A saved entity view */ Components.Schemas.SavedViewItem;
        }
    }
    namespace UpdateTaxonomy {
        namespace Parameters {
            export type TaxonomySlug = string;
        }
        export interface PathParameters {
            taxonomySlug: Parameters.TaxonomySlug;
        }
        export type RequestBody = Components.Schemas.Taxonomy;
        namespace Responses {
            export type $200 = Components.Schemas.Taxonomy;
        }
    }
    namespace UpdateTaxonomyClassification {
        namespace Parameters {
            export type ClassificationSlug = string;
        }
        export interface PathParameters {
            classificationSlug: Parameters.ClassificationSlug;
        }
        export type RequestBody = Components.Schemas.TaxonomyClassification;
        namespace Responses {
            export type $200 = Components.Schemas.TaxonomyClassification;
            export interface $404 {
            }
        }
    }
    namespace UpsertEntity {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid ^01[0-9a-zA-Z]{24}$ */ | ("" | null);
            export type Async = boolean;
            export type DryRun = boolean;
            export type FillActivity = boolean;
            export type Slug = /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug;
            export type Strict = boolean;
            export type Validate = boolean;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        export interface QueryParameters {
            activity_id?: Parameters.ActivityId;
            fill_activity?: Parameters.FillActivity;
            dry_run?: Parameters.DryRun;
            async?: Parameters.Async;
            validate?: Parameters.Validate;
            strict?: Parameters.Strict;
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
             *   },
             *   "_manifest": [
             *     "123e4567-e89b-12d3-a456-426614174000"
             *   ]
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
             *   },
             *   "_manifest": [
             *     "123e4567-e89b-12d3-a456-426614174000",
             *     "123e4567-e89b-12d3-a456-426614174000"
             *   ]
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
             *   },
             *   "_manifest": [
             *     "123e4567-e89b-12d3-a456-426614174000",
             *     "123e4567-e89b-12d3-a456-426614174000"
             *   ]
             * }
             */
            Components.Schemas.EntityItem;
            export interface $405 {
            }
            export interface $409 {
            }
            export type $422 = /* Validation result for a failed validation */ Components.Schemas.EntityValidationV2ResultError;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
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
         *   },
         *   "_manifest": [
         *     "123e4567-e89b-12d3-a456-426614174000"
         *   ]
         * }
         */
        Components.Schemas.Entity;
        namespace Responses {
            export type $200 = /* Validation result for a successful validation */ Components.Schemas.EntityValidationResultSuccess;
            export type $422 = /* Validation result for a failed validation */ Components.Schemas.EntityValidationResultError;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace ValidateEntityV2 {
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
         *   },
         *   "_manifest": [
         *     "123e4567-e89b-12d3-a456-426614174000"
         *   ]
         * }
         */
        Components.Schemas.Entity;
        namespace Responses {
            export type $200 = /* Validation result for a successful validation */ Components.Schemas.EntityValidationV2ResultSuccess;
            export type $422 = /* Validation result for a failed validation */ Components.Schemas.EntityValidationV2ResultError;
            export type $429 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 429,
             *   "error": "Too many requests. Try again later."
             * }
             */
            Components.Responses.TooManyRequestsError;
        }
    }
    namespace WipeAllEntities {
        export interface RequestBody {
            schemas?: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            Components.Schemas.EntitySlug[];
        }
        namespace Responses {
            export interface $201 {
            }
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
    parameters?: Parameters<Paths.GetSchema.QueryParameters & Paths.GetSchema.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSchema.Responses.$200>
  /**
   * putSchema - putSchema
   * 
   * Create or update a schema with a new version
   */
  'putSchema'(
    parameters?: Parameters<Paths.PutSchema.QueryParameters & Paths.PutSchema.PathParameters> | null,
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
  ): OperationResponse<Paths.DeleteSchema.Responses.$200>
  /**
   * getJsonSchema - getJsonSchema
   * 
   * Get formal JSON schema definition draft 2020-12 for the given epilot schema
   */
  'getJsonSchema'(
    parameters?: Parameters<Paths.GetJsonSchema.QueryParameters & Paths.GetJsonSchema.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetJsonSchema.Responses.$200>
  /**
   * getSchemaExample - getSchemaExample
   * 
   * Get a full example entity for the given schema
   */
  'getSchemaExample'(
    parameters?: Parameters<Paths.GetSchemaExample.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSchemaExample.Responses.$200>
  /**
   * getSchemaVersions - getSchemaVersions
   * 
   * Get all versions of this schema ordered by the latest versions including drafts.
   */
  'getSchemaVersions'(
    parameters?: Parameters<Paths.GetSchemaVersions.QueryParameters & Paths.GetSchemaVersions.PathParameters> | null,
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
   * searchEntities - searchEntities
   * 
   * Search for entities. Supports ordering and pagination. [Lucene query syntax](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#query-string-syntax) supported for complex querying.
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
   * listEntities - listEntities
   * 
   * List entities that meet the specified conditions.
   * 
   * Supports the same options as entity search but utilizes filtering using a subset of [Elastic Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html) and does not perform scoring.
   * 
   */
  'listEntities'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ListEntities.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListEntities.Responses.$200>
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
    parameters?: Parameters<Paths.CreateEntity.QueryParameters & Paths.CreateEntity.PathParameters> | null,
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
   * validateEntityV2 - validateEntityV2
   * 
   * Validates an entity against the schema.
   */
  'validateEntityV2'(
    parameters?: Parameters<Paths.ValidateEntityV2.PathParameters> | null,
    data?: Paths.ValidateEntityV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ValidateEntityV2.Responses.$200>
  /**
   * upsertEntity - upsertEntity
   * 
   * Create or update an entity using `unique_key`
   * 
   * - If no entities are matched, a new entity is created.
   * - If exactly one entity is matched, a `PATCH`-style update is applied to the existing entity.
   * 
   * ## Activity
   * 
   * If no `activity_id` query parameter is provided, implicitly creates Activity of type `EntityCreated` or `EntityUpdated`
   * 
   */
  'upsertEntity'(
    parameters?: Parameters<Paths.UpsertEntity.QueryParameters & Paths.UpsertEntity.PathParameters> | null,
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
    parameters?: Parameters<Paths.GetEntityV2.QueryParameters & Paths.GetEntityV2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEntityV2.Responses.$200>
  /**
   * restoreEntity - restoreEntity
   * 
   * Restores an entity by id
   * 
   * ## Activity
   * 
   * If no `activity_id` query parameter is provided, implicitly creates Activity of type `EntityRestore`
   * 
   */
  'restoreEntity'(
    parameters?: Parameters<Paths.RestoreEntity.QueryParameters & Paths.RestoreEntity.PathParameters> | null,
    data?: Paths.RestoreEntity.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RestoreEntity.Responses.$200>
  /**
   * reindexEntity - reindexEntity
   * 
   * Triggers a reindex for the Entity for search.
   * 
   */
  'reindexEntity'(
    parameters?: Parameters<Paths.ReindexEntity.PathParameters> | null,
    data?: Paths.ReindexEntity.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReindexEntity.Responses.$200>
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
    parameters?: Parameters<Paths.GetEntity.QueryParameters & Paths.GetEntity.PathParameters> | null,
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
    parameters?: Parameters<Paths.UpdateEntity.QueryParameters & Paths.UpdateEntity.PathParameters> | null,
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
    parameters?: Parameters<Paths.PatchEntity.QueryParameters & Paths.PatchEntity.PathParameters> | null,
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
   * ## Deletion Mode
   * 
   * All entities are soft deleted by default. To force an actual deletion from the system, provide `purge:true` to delete the entity and all its activity history permanently.
   * 
   */
  'deleteEntity'(
    parameters?: Parameters<Paths.DeleteEntity.QueryParameters & Paths.DeleteEntity.PathParameters> | null,
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
   * wipeAllEntities - wipeAllEntities
   * 
   * Creates a request to queue the deletion of all entities in the system. This is a destructive operation and should only be used in sandbox environments.
   * 
   */
  'wipeAllEntities'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.WipeAllEntities.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WipeAllEntities.Responses.$201>
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
    parameters?: Parameters<Paths.GetActivity.QueryParameters & Paths.GetActivity.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetActivity.Responses.$200>
  /**
   * attachActivity - attachActivity
   * 
   * Attach existing activity to entity activity feeds
   */
  'attachActivity'(
    parameters?: Parameters<Paths.AttachActivity.QueryParameters & Paths.AttachActivity.PathParameters> | null,
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
    parameters?: Parameters<Paths.GetEntityActivityFeed.QueryParameters & Paths.GetEntityActivityFeed.PathParameters> | null,
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
    parameters?: Parameters<Paths.GetRelations.QueryParameters & Paths.GetRelations.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRelations.Responses.$200>
  /**
   * addRelations - addRelations
   * 
   * Relates one or more entities to parent entity by adding items to a relation attribute
   */
  'addRelations'(
    parameters?: Parameters<Paths.AddRelations.QueryParameters & Paths.AddRelations.PathParameters> | null,
    data?: Paths.AddRelations.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddRelations.Responses.$200>
  /**
   * removeRelations - removeRelations
   * 
   * Disassociate one or more entities to parent entity by removing items to a relation attribute
   */
  'removeRelations'(
    parameters?: Parameters<Paths.RemoveRelations.QueryParameters & Paths.RemoveRelations.PathParameters> | null,
    data?: Paths.RemoveRelations.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RemoveRelations.Responses.$204>
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
    parameters?: Parameters<Paths.GetRelationsV2.QueryParameters & Paths.GetRelationsV2.PathParameters> | null,
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
    parameters?: Parameters<Paths.GetRelationsV3.QueryParameters & Paths.GetRelationsV3.PathParameters> | null,
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
    parameters?: Parameters<Paths.GetRelatedEntitiesCount.QueryParameters & Paths.GetRelatedEntitiesCount.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRelatedEntitiesCount.Responses.$200>
  /**
   * updateRelation - updateRelation
   * 
   * Updates an existing relation between two entities.
   */
  'updateRelation'(
    parameters?: Parameters<Paths.UpdateRelation.QueryParameters & Paths.UpdateRelation.PathParameters> | null,
    data?: Paths.UpdateRelation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateRelation.Responses.$200>
  /**
   * deleteRelation - deleteRelation
   * 
   * Removes relation between two entities
   */
  'deleteRelation'(
    parameters?: Parameters<Paths.DeleteRelation.QueryParameters & Paths.DeleteRelation.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteRelation.Responses.$204>
  /**
   * exportEntities - exportEntities
   * 
   * Export entity data in a CSV-format. The export will export data as close as possible to what is visible on Entity UI tables.
   * The values exported as in some cases, transformed to human-readable values.
   * 
   * To force the export of raw values, use the `#` prefix in front of your field name when specifying the field on the `fields` param.
   * 
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
   * patchSavedView - patchSavedView
   * 
   * Partially updates a saved view with the provided payload. If an updated_at is passed and the server contains a newer version of the view a `409` error is returned
   */
  'patchSavedView'(
    parameters?: Parameters<Paths.PatchSavedView.PathParameters> | null,
    data?: Paths.PatchSavedView.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchSavedView.Responses.$200>
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
   * List taxonomies in an organization
   */
  'listTaxonomies'(
    parameters?: Parameters<Paths.ListTaxonomies.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListTaxonomies.Responses.$200>
  /**
   * createTaxonomy - createTaxonomy
   * 
   * Create a new taxonomy
   */
  'createTaxonomy'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateTaxonomy.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateTaxonomy.Responses.$201>
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
   * updateTaxonomy - updateTaxonomy
   * 
   * Update a taxonomy
   */
  'updateTaxonomy'(
    parameters?: Parameters<Paths.UpdateTaxonomy.PathParameters> | null,
    data?: Paths.UpdateTaxonomy.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateTaxonomy.Responses.$200>
  /**
   * deleteTaxonomy - deleteTaxonomy
   * 
   * Delete a taxonomy
   */
  'deleteTaxonomy'(
    parameters?: Parameters<Paths.DeleteTaxonomy.QueryParameters & Paths.DeleteTaxonomy.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteTaxonomy.Responses.$204>
  /**
   * updateClassificationsForTaxonomy - updateClassificationsForTaxonomy
   * 
   * Update the classifications for a taxonomy
   */
  'updateClassificationsForTaxonomy'(
    parameters?: Parameters<Paths.UpdateClassificationsForTaxonomy.PathParameters> | null,
    data?: Paths.UpdateClassificationsForTaxonomy.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateClassificationsForTaxonomy.Responses.$200>
  /**
   * createTaxonomyClassification - createTaxonomyClassification
   * 
   * Create a new classification for a taxonomy
   * 
   */
  'createTaxonomyClassification'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateTaxonomyClassification.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateTaxonomyClassification.Responses.$201>
  /**
   * getTaxonomyClassification - getTaxonomyClassification
   * 
   * Get a classification for a taxonomy by slug
   * 
   * For backwards compatibility with purposes, you can also pass the classification id instead of the slug.
   * 
   */
  'getTaxonomyClassification'(
    parameters?: Parameters<Paths.GetTaxonomyClassification.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTaxonomyClassification.Responses.$200>
  /**
   * updateTaxonomyClassification - updateTaxonomyClassification
   * 
   * Update a classification for a taxonomy
   */
  'updateTaxonomyClassification'(
    parameters?: Parameters<Paths.UpdateTaxonomyClassification.PathParameters> | null,
    data?: Paths.UpdateTaxonomyClassification.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateTaxonomyClassification.Responses.$200>
  /**
   * deleteTaxonomyClassification - deleteTaxonomyClassification
   * 
   * Delete a classification for a taxonomy
   */
  'deleteTaxonomyClassification'(
    parameters?: Parameters<Paths.DeleteTaxonomyClassification.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteTaxonomyClassification.Responses.$200>
  /**
   * taxonomyAutocomplete - taxonomyAutocomplete
   * 
   * Taxonomies autocomplete
   */
  'taxonomyAutocomplete'(
    parameters?: Parameters<Paths.TaxonomyAutocomplete.QueryParameters & Paths.TaxonomyAutocomplete.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TaxonomyAutocomplete.Responses.$200>
  /**
   * taxonomiesClassificationsSearch - taxonomiesClassificationsSearch
   * 
   * List taxonomy classifications in an organization based on taxonomy slug
   */
  'taxonomiesClassificationsSearch'(
    parameters?: Parameters<Paths.TaxonomiesClassificationsSearch.QueryParameters> | null,
    data?: Paths.TaxonomiesClassificationsSearch.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TaxonomiesClassificationsSearch.Responses.$200>
  /**
   * listTaxonomyClassificationsForSchema - listTaxonomyClassificationsForSchema
   * 
   * List taxonomy classifications for a given schema
   */
  'listTaxonomyClassificationsForSchema'(
    parameters?: Parameters<Paths.ListTaxonomyClassificationsForSchema.QueryParameters & Paths.ListTaxonomyClassificationsForSchema.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListTaxonomyClassificationsForSchema.Responses.$200>
  /**
   * getTaxonomyBulkActionJobs - getTaxonomyBulkActionJobs
   * 
   * Gets bulk actions jobs by job status:
   * - <undefined> = all active jobs
   * - PENDING = all active jobs
   * - FAILED = all failed jobs
   * - COMPLETED = all completed jobs
   * 
   */
  'getTaxonomyBulkActionJobs'(
    parameters?: Parameters<Paths.GetTaxonomyBulkActionJobs.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTaxonomyBulkActionJobs.Responses.$200>
  /**
   * getTaxonomyBulkActionJobById - getTaxonomyBulkActionJobById
   * 
   * Gets a bulk action job by job id
   */
  'getTaxonomyBulkActionJobById'(
    parameters?: Parameters<Paths.GetTaxonomyBulkActionJobById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTaxonomyBulkActionJobById.Responses.$200>
  /**
   * cancelBulkAction - cancelBulkAction
   * 
   * Cancels a running bulk action job. The job status will be updated to CANCELLED
   * and the job will be stopped.
   * 
   */
  'cancelBulkAction'(
    parameters?: Parameters<Paths.CancelBulkAction.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CancelBulkAction.Responses.$200>
  /**
   * bulkMoveClassifications - bulkMoveClassifications
   * 
   * Moves classifications from one taxonomy to another, through a bulk async operation which
   * also updates all references from the old classification to the new one under the target taxonomy.
   * 
   */
  'bulkMoveClassifications'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.BulkMoveClassifications.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BulkMoveClassifications.Responses.$200>
  /**
   * bulkMergeClassifications - bulkMergeClassifications
   * 
   * Merges classifications from one taxonomy into one individual classification, through a bulk async operation which
   * also updates all references from the old Classifications to the new one.
   * 
   */
  'bulkMergeClassifications'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.BulkMergeClassifications.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BulkMergeClassifications.Responses.$200>
  /**
   * bulkDeleteClassifications - bulkDeleteClassifications
   * 
   * Permanently deletes taxonomy classifications. The classifications are deleted through a bulk
   * async operation which also deletes all references of the deleted classifications from the entities
   * referencing them.
   * 
   */
  'bulkDeleteClassifications'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.BulkDeleteClassifications.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BulkDeleteClassifications.Responses.$200>
  /**
   * createSchemaAttribute - createSchemaAttribute
   * 
   * Create a schema attribute
   */
  'createSchemaAttribute'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSchemaAttribute.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSchemaAttribute.Responses.$201>
  /**
   * getSchemaAttribute - getSchemaAttribute
   * 
   * Get a schema attribute from given attribute ID
   */
  'getSchemaAttribute'(
    parameters?: Parameters<Paths.GetSchemaAttribute.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSchemaAttribute.Responses.$200>
  /**
   * putSchemaAttribute - putSchemaAttribute
   * 
   * Updates an attribute in the schema
   */
  'putSchemaAttribute'(
    parameters?: Parameters<Paths.PutSchemaAttribute.PathParameters> | null,
    data?: Paths.PutSchemaAttribute.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutSchemaAttribute.Responses.$200>
  /**
   * deleteSchemaAttribute - deleteSchemaAttribute
   * 
   * Deletes an attribute from a schema
   */
  'deleteSchemaAttribute'(
    parameters?: Parameters<Paths.DeleteSchemaAttribute.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSchemaAttribute.Responses.$200>
  /**
   * createSchemaCapability - createSchemaCapability
   * 
   * Create a schema capability
   */
  'createSchemaCapability'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSchemaCapability.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSchemaCapability.Responses.$201>
  /**
   * getSchemaCapability - getSchemaCapability
   * 
   * Get a schema capability from given capability ID
   */
  'getSchemaCapability'(
    parameters?: Parameters<Paths.GetSchemaCapability.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSchemaCapability.Responses.$200>
  /**
   * putSchemaCapability - putSchemaCapability
   * 
   * Adds or updates an capability in the schema
   */
  'putSchemaCapability'(
    parameters?: Parameters<Paths.PutSchemaCapability.PathParameters> | null,
    data?: Paths.PutSchemaCapability.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutSchemaCapability.Responses.$200>
  /**
   * deleteSchemaCapability - deleteSchemaCapability
   * 
   * Deletes a Capability from a schema
   */
  'deleteSchemaCapability'(
    parameters?: Parameters<Paths.DeleteSchemaCapability.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSchemaCapability.Responses.$200>
  /**
   * createSchemaGroup - createSchemaGroup
   * 
   * Create a schema group
   */
  'createSchemaGroup'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSchemaGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSchemaGroup.Responses.$201>
  /**
   * getSchemaGroup - getSchemaGroup
   * 
   * Get a schema group from given group composite ID
   */
  'getSchemaGroup'(
    parameters?: Parameters<Paths.GetSchemaGroup.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSchemaGroup.Responses.$200>
  /**
   * putSchemaGroup - putSchemaGroup
   * 
   * Adds or updates an capability in the schema
   */
  'putSchemaGroup'(
    parameters?: Parameters<Paths.PutSchemaGroup.PathParameters> | null,
    data?: Paths.PutSchemaGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutSchemaGroup.Responses.$200>
  /**
   * deleteSchemaGroup - deleteSchemaGroup
   * 
   * Deletes a Capability from a schema
   */
  'deleteSchemaGroup'(
    parameters?: Parameters<Paths.DeleteSchemaGroup.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSchemaGroup.Responses.$200>
  /**
   * createSchemaGroupHeadline - createSchemaGroupHeadline
   * 
   * Create a headline in a schema group
   */
  'createSchemaGroupHeadline'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSchemaGroupHeadline.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSchemaGroupHeadline.Responses.$201>
  /**
   * getSchemaGroupHeadline - getSchemaGroupHeadline
   * 
   * Get a group headline from schema from given headline composite ID
   */
  'getSchemaGroupHeadline'(
    parameters?: Parameters<Paths.GetSchemaGroupHeadline.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSchemaGroupHeadline.Responses.$200>
  /**
   * putSchemaGroupHeadline - putSchemaGroupHeadline
   * 
   * Adds or updates a group headline in the schema
   */
  'putSchemaGroupHeadline'(
    parameters?: Parameters<Paths.PutSchemaGroupHeadline.PathParameters> | null,
    data?: Paths.PutSchemaGroupHeadline.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutSchemaGroupHeadline.Responses.$200>
  /**
   * deleteSchemaGroupHeadline - deleteSchemaGroupHeadline
   * 
   * Deletes a group headline from a schema
   */
  'deleteSchemaGroupHeadline'(
    parameters?: Parameters<Paths.DeleteSchemaGroupHeadline.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSchemaGroupHeadline.Responses.$200>
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
      parameters?: Parameters<Paths.GetSchema.QueryParameters & Paths.GetSchema.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSchema.Responses.$200>
    /**
     * putSchema - putSchema
     * 
     * Create or update a schema with a new version
     */
    'put'(
      parameters?: Parameters<Paths.PutSchema.QueryParameters & Paths.PutSchema.PathParameters> | null,
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
    ): OperationResponse<Paths.DeleteSchema.Responses.$200>
  }
  ['/v1/entity/schemas/{slug}/json/schema']: {
    /**
     * getJsonSchema - getJsonSchema
     * 
     * Get formal JSON schema definition draft 2020-12 for the given epilot schema
     */
    'get'(
      parameters?: Parameters<Paths.GetJsonSchema.QueryParameters & Paths.GetJsonSchema.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetJsonSchema.Responses.$200>
  }
  ['/v1/entity/schemas/{slug}/json/example']: {
    /**
     * getSchemaExample - getSchemaExample
     * 
     * Get a full example entity for the given schema
     */
    'get'(
      parameters?: Parameters<Paths.GetSchemaExample.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSchemaExample.Responses.$200>
  }
  ['/v1/entity/schemas/{slug}/versions']: {
    /**
     * getSchemaVersions - getSchemaVersions
     * 
     * Get all versions of this schema ordered by the latest versions including drafts.
     */
    'get'(
      parameters?: Parameters<Paths.GetSchemaVersions.QueryParameters & Paths.GetSchemaVersions.PathParameters> | null,
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
  ['/v1/entity:search']: {
    /**
     * searchEntities - searchEntities
     * 
     * Search for entities. Supports ordering and pagination. [Lucene query syntax](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#query-string-syntax) supported for complex querying.
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
  ['/v1/entity:list']: {
    /**
     * listEntities - listEntities
     * 
     * List entities that meet the specified conditions.
     * 
     * Supports the same options as entity search but utilizes filtering using a subset of [Elastic Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html) and does not perform scoring.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ListEntities.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListEntities.Responses.$200>
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
      parameters?: Parameters<Paths.CreateEntity.QueryParameters & Paths.CreateEntity.PathParameters> | null,
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
  ['/v2/entity/{slug}:validate']: {
    /**
     * validateEntityV2 - validateEntityV2
     * 
     * Validates an entity against the schema.
     */
    'post'(
      parameters?: Parameters<Paths.ValidateEntityV2.PathParameters> | null,
      data?: Paths.ValidateEntityV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ValidateEntityV2.Responses.$200>
  }
  ['/v1/entity/{slug}:upsert']: {
    /**
     * upsertEntity - upsertEntity
     * 
     * Create or update an entity using `unique_key`
     * 
     * - If no entities are matched, a new entity is created.
     * - If exactly one entity is matched, a `PATCH`-style update is applied to the existing entity.
     * 
     * ## Activity
     * 
     * If no `activity_id` query parameter is provided, implicitly creates Activity of type `EntityCreated` or `EntityUpdated`
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.UpsertEntity.QueryParameters & Paths.UpsertEntity.PathParameters> | null,
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
      parameters?: Parameters<Paths.GetEntityV2.QueryParameters & Paths.GetEntityV2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEntityV2.Responses.$200>
  }
  ['/v1/entity/{slug}/{id}:restore']: {
    /**
     * restoreEntity - restoreEntity
     * 
     * Restores an entity by id
     * 
     * ## Activity
     * 
     * If no `activity_id` query parameter is provided, implicitly creates Activity of type `EntityRestore`
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.RestoreEntity.QueryParameters & Paths.RestoreEntity.PathParameters> | null,
      data?: Paths.RestoreEntity.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RestoreEntity.Responses.$200>
  }
  ['/v1/entity/{slug}/{id}:reindex']: {
    /**
     * reindexEntity - reindexEntity
     * 
     * Triggers a reindex for the Entity for search.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ReindexEntity.PathParameters> | null,
      data?: Paths.ReindexEntity.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReindexEntity.Responses.$200>
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
      parameters?: Parameters<Paths.GetEntity.QueryParameters & Paths.GetEntity.PathParameters> | null,
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
      parameters?: Parameters<Paths.UpdateEntity.QueryParameters & Paths.UpdateEntity.PathParameters> | null,
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
      parameters?: Parameters<Paths.PatchEntity.QueryParameters & Paths.PatchEntity.PathParameters> | null,
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
     * ## Deletion Mode
     * 
     * All entities are soft deleted by default. To force an actual deletion from the system, provide `purge:true` to delete the entity and all its activity history permanently.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteEntity.QueryParameters & Paths.DeleteEntity.PathParameters> | null,
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
  ['/v1/entity:wipeAllEntities']: {
    /**
     * wipeAllEntities - wipeAllEntities
     * 
     * Creates a request to queue the deletion of all entities in the system. This is a destructive operation and should only be used in sandbox environments.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.WipeAllEntities.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WipeAllEntities.Responses.$201>
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
      parameters?: Parameters<Paths.GetActivity.QueryParameters & Paths.GetActivity.PathParameters> | null,
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
      parameters?: Parameters<Paths.AttachActivity.QueryParameters & Paths.AttachActivity.PathParameters> | null,
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
      parameters?: Parameters<Paths.GetEntityActivityFeed.QueryParameters & Paths.GetEntityActivityFeed.PathParameters> | null,
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
      parameters?: Parameters<Paths.GetRelations.QueryParameters & Paths.GetRelations.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRelations.Responses.$200>
    /**
     * addRelations - addRelations
     * 
     * Relates one or more entities to parent entity by adding items to a relation attribute
     */
    'post'(
      parameters?: Parameters<Paths.AddRelations.QueryParameters & Paths.AddRelations.PathParameters> | null,
      data?: Paths.AddRelations.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddRelations.Responses.$200>
    /**
     * removeRelations - removeRelations
     * 
     * Disassociate one or more entities to parent entity by removing items to a relation attribute
     */
    'delete'(
      parameters?: Parameters<Paths.RemoveRelations.QueryParameters & Paths.RemoveRelations.PathParameters> | null,
      data?: Paths.RemoveRelations.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RemoveRelations.Responses.$204>
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
      parameters?: Parameters<Paths.GetRelationsV2.QueryParameters & Paths.GetRelationsV2.PathParameters> | null,
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
      parameters?: Parameters<Paths.GetRelationsV3.QueryParameters & Paths.GetRelationsV3.PathParameters> | null,
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
      parameters?: Parameters<Paths.GetRelatedEntitiesCount.QueryParameters & Paths.GetRelatedEntitiesCount.PathParameters> | null,
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
      parameters?: Parameters<Paths.UpdateRelation.QueryParameters & Paths.UpdateRelation.PathParameters> | null,
      data?: Paths.UpdateRelation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateRelation.Responses.$200>
    /**
     * deleteRelation - deleteRelation
     * 
     * Removes relation between two entities
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteRelation.QueryParameters & Paths.DeleteRelation.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteRelation.Responses.$204>
  }
  ['/v1/entity:export']: {
    /**
     * exportEntities - exportEntities
     * 
     * Export entity data in a CSV-format. The export will export data as close as possible to what is visible on Entity UI tables.
     * The values exported as in some cases, transformed to human-readable values.
     * 
     * To force the export of raw values, use the `#` prefix in front of your field name when specifying the field on the `fields` param.
     * 
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
     * patchSavedView - patchSavedView
     * 
     * Partially updates a saved view with the provided payload. If an updated_at is passed and the server contains a newer version of the view a `409` error is returned
     */
    'patch'(
      parameters?: Parameters<Paths.PatchSavedView.PathParameters> | null,
      data?: Paths.PatchSavedView.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchSavedView.Responses.$200>
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
  ['/v1/entity/taxonomies']: {
    /**
     * listTaxonomies - listTaxonomies
     * 
     * List taxonomies in an organization
     */
    'get'(
      parameters?: Parameters<Paths.ListTaxonomies.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListTaxonomies.Responses.$200>
    /**
     * createTaxonomy - createTaxonomy
     * 
     * Create a new taxonomy
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateTaxonomy.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateTaxonomy.Responses.$201>
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
    /**
     * updateTaxonomy - updateTaxonomy
     * 
     * Update a taxonomy
     */
    'put'(
      parameters?: Parameters<Paths.UpdateTaxonomy.PathParameters> | null,
      data?: Paths.UpdateTaxonomy.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateTaxonomy.Responses.$200>
    /**
     * deleteTaxonomy - deleteTaxonomy
     * 
     * Delete a taxonomy
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteTaxonomy.QueryParameters & Paths.DeleteTaxonomy.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteTaxonomy.Responses.$204>
  }
  ['/v1/entity/taxonomies/{taxonomySlug}/classifications']: {
    /**
     * updateClassificationsForTaxonomy - updateClassificationsForTaxonomy
     * 
     * Update the classifications for a taxonomy
     */
    'post'(
      parameters?: Parameters<Paths.UpdateClassificationsForTaxonomy.PathParameters> | null,
      data?: Paths.UpdateClassificationsForTaxonomy.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateClassificationsForTaxonomy.Responses.$200>
  }
  ['/v2/entity/taxonomies/classifications']: {
    /**
     * createTaxonomyClassification - createTaxonomyClassification
     * 
     * Create a new classification for a taxonomy
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateTaxonomyClassification.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateTaxonomyClassification.Responses.$201>
  }
  ['/v2/entity/taxonomies/classifications/{classificationSlug}']: {
    /**
     * getTaxonomyClassification - getTaxonomyClassification
     * 
     * Get a classification for a taxonomy by slug
     * 
     * For backwards compatibility with purposes, you can also pass the classification id instead of the slug.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetTaxonomyClassification.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTaxonomyClassification.Responses.$200>
    /**
     * updateTaxonomyClassification - updateTaxonomyClassification
     * 
     * Update a classification for a taxonomy
     */
    'put'(
      parameters?: Parameters<Paths.UpdateTaxonomyClassification.PathParameters> | null,
      data?: Paths.UpdateTaxonomyClassification.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateTaxonomyClassification.Responses.$200>
    /**
     * deleteTaxonomyClassification - deleteTaxonomyClassification
     * 
     * Delete a classification for a taxonomy
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteTaxonomyClassification.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteTaxonomyClassification.Responses.$200>
  }
  ['/v1/entity/taxonomies/{taxonomySlug}:autocomplete']: {
    /**
     * taxonomyAutocomplete - taxonomyAutocomplete
     * 
     * Taxonomies autocomplete
     */
    'get'(
      parameters?: Parameters<Paths.TaxonomyAutocomplete.QueryParameters & Paths.TaxonomyAutocomplete.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TaxonomyAutocomplete.Responses.$200>
  }
  ['/v1/entity/taxonomies/classifications:search']: {
    /**
     * taxonomiesClassificationsSearch - taxonomiesClassificationsSearch
     * 
     * List taxonomy classifications in an organization based on taxonomy slug
     */
    'post'(
      parameters?: Parameters<Paths.TaxonomiesClassificationsSearch.QueryParameters> | null,
      data?: Paths.TaxonomiesClassificationsSearch.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TaxonomiesClassificationsSearch.Responses.$200>
  }
  ['/v1/entity/schemas/{slug}/taxonomy/{taxonomySlug}']: {
    /**
     * listTaxonomyClassificationsForSchema - listTaxonomyClassificationsForSchema
     * 
     * List taxonomy classifications for a given schema
     */
    'get'(
      parameters?: Parameters<Paths.ListTaxonomyClassificationsForSchema.QueryParameters & Paths.ListTaxonomyClassificationsForSchema.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListTaxonomyClassificationsForSchema.Responses.$200>
  }
  ['/v1/entity/taxonomies/bulk-jobs']: {
    /**
     * getTaxonomyBulkActionJobs - getTaxonomyBulkActionJobs
     * 
     * Gets bulk actions jobs by job status:
     * - <undefined> = all active jobs
     * - PENDING = all active jobs
     * - FAILED = all failed jobs
     * - COMPLETED = all completed jobs
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetTaxonomyBulkActionJobs.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTaxonomyBulkActionJobs.Responses.$200>
  }
  ['/v1/entity/taxonomies/bulk-jobs/{job_id}']: {
    /**
     * getTaxonomyBulkActionJobById - getTaxonomyBulkActionJobById
     * 
     * Gets a bulk action job by job id
     */
    'get'(
      parameters?: Parameters<Paths.GetTaxonomyBulkActionJobById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTaxonomyBulkActionJobById.Responses.$200>
  }
  ['/v1/entity/taxonomies/bulk-jobs/{job_id}/cancel']: {
    /**
     * cancelBulkAction - cancelBulkAction
     * 
     * Cancels a running bulk action job. The job status will be updated to CANCELLED
     * and the job will be stopped.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.CancelBulkAction.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CancelBulkAction.Responses.$200>
  }
  ['/v1/entity/taxonomies/classifications:move']: {
    /**
     * bulkMoveClassifications - bulkMoveClassifications
     * 
     * Moves classifications from one taxonomy to another, through a bulk async operation which
     * also updates all references from the old classification to the new one under the target taxonomy.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.BulkMoveClassifications.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BulkMoveClassifications.Responses.$200>
  }
  ['/v1/entity/taxonomies/classifications:merge']: {
    /**
     * bulkMergeClassifications - bulkMergeClassifications
     * 
     * Merges classifications from one taxonomy into one individual classification, through a bulk async operation which
     * also updates all references from the old Classifications to the new one.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.BulkMergeClassifications.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BulkMergeClassifications.Responses.$200>
  }
  ['/v1/entity/taxonomies/classifications:delete']: {
    /**
     * bulkDeleteClassifications - bulkDeleteClassifications
     * 
     * Permanently deletes taxonomy classifications. The classifications are deleted through a bulk
     * async operation which also deletes all references of the deleted classifications from the entities
     * referencing them.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.BulkDeleteClassifications.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BulkDeleteClassifications.Responses.$200>
  }
  ['/v1/entity/schemas/attributes']: {
    /**
     * createSchemaAttribute - createSchemaAttribute
     * 
     * Create a schema attribute
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSchemaAttribute.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSchemaAttribute.Responses.$201>
  }
  ['/v1/entity/schemas/attributes/{composite_id}']: {
    /**
     * getSchemaAttribute - getSchemaAttribute
     * 
     * Get a schema attribute from given attribute ID
     */
    'get'(
      parameters?: Parameters<Paths.GetSchemaAttribute.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSchemaAttribute.Responses.$200>
    /**
     * putSchemaAttribute - putSchemaAttribute
     * 
     * Updates an attribute in the schema
     */
    'put'(
      parameters?: Parameters<Paths.PutSchemaAttribute.PathParameters> | null,
      data?: Paths.PutSchemaAttribute.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutSchemaAttribute.Responses.$200>
    /**
     * deleteSchemaAttribute - deleteSchemaAttribute
     * 
     * Deletes an attribute from a schema
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteSchemaAttribute.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSchemaAttribute.Responses.$200>
  }
  ['/v1/entity/schemas/capabilities']: {
    /**
     * createSchemaCapability - createSchemaCapability
     * 
     * Create a schema capability
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSchemaCapability.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSchemaCapability.Responses.$201>
  }
  ['/v1/entity/schemas/capabilities/{composite_id}']: {
    /**
     * getSchemaCapability - getSchemaCapability
     * 
     * Get a schema capability from given capability ID
     */
    'get'(
      parameters?: Parameters<Paths.GetSchemaCapability.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSchemaCapability.Responses.$200>
    /**
     * putSchemaCapability - putSchemaCapability
     * 
     * Adds or updates an capability in the schema
     */
    'put'(
      parameters?: Parameters<Paths.PutSchemaCapability.PathParameters> | null,
      data?: Paths.PutSchemaCapability.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutSchemaCapability.Responses.$200>
    /**
     * deleteSchemaCapability - deleteSchemaCapability
     * 
     * Deletes a Capability from a schema
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteSchemaCapability.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSchemaCapability.Responses.$200>
  }
  ['/v1/entity/schemas/group']: {
    /**
     * createSchemaGroup - createSchemaGroup
     * 
     * Create a schema group
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSchemaGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSchemaGroup.Responses.$201>
  }
  ['/v1/entity/schemas/group/{composite_id}']: {
    /**
     * getSchemaGroup - getSchemaGroup
     * 
     * Get a schema group from given group composite ID
     */
    'get'(
      parameters?: Parameters<Paths.GetSchemaGroup.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSchemaGroup.Responses.$200>
    /**
     * putSchemaGroup - putSchemaGroup
     * 
     * Adds or updates an capability in the schema
     */
    'put'(
      parameters?: Parameters<Paths.PutSchemaGroup.PathParameters> | null,
      data?: Paths.PutSchemaGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutSchemaGroup.Responses.$200>
    /**
     * deleteSchemaGroup - deleteSchemaGroup
     * 
     * Deletes a Capability from a schema
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteSchemaGroup.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSchemaGroup.Responses.$200>
  }
  ['/v1/entity/schemas/headline']: {
    /**
     * createSchemaGroupHeadline - createSchemaGroupHeadline
     * 
     * Create a headline in a schema group
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSchemaGroupHeadline.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSchemaGroupHeadline.Responses.$201>
  }
  ['/v1/entity/schemas/headline/{composite_id}']: {
    /**
     * getSchemaGroupHeadline - getSchemaGroupHeadline
     * 
     * Get a group headline from schema from given headline composite ID
     */
    'get'(
      parameters?: Parameters<Paths.GetSchemaGroupHeadline.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSchemaGroupHeadline.Responses.$200>
    /**
     * putSchemaGroupHeadline - putSchemaGroupHeadline
     * 
     * Adds or updates a group headline in the schema
     */
    'put'(
      parameters?: Parameters<Paths.PutSchemaGroupHeadline.PathParameters> | null,
      data?: Paths.PutSchemaGroupHeadline.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutSchemaGroupHeadline.Responses.$200>
    /**
     * deleteSchemaGroupHeadline - deleteSchemaGroupHeadline
     * 
     * Deletes a group headline from a schema
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteSchemaGroupHeadline.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSchemaGroupHeadline.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Activity = Components.Schemas.Activity;
export type ActivityCallerContext = Components.Schemas.ActivityCallerContext;
export type ActivityId = Components.Schemas.ActivityId;
export type ActivityItem = Components.Schemas.ActivityItem;
export type AddressAttribute = Components.Schemas.AddressAttribute;
export type AddressRelationAttribute = Components.Schemas.AddressRelationAttribute;
export type Attribute = Components.Schemas.Attribute;
export type AttributeWithCompositeID = Components.Schemas.AttributeWithCompositeID;
export type AutomationAttribute = Components.Schemas.AutomationAttribute;
export type BaseActivityItem = Components.Schemas.BaseActivityItem;
export type BaseAttribute = Components.Schemas.BaseAttribute;
export type BaseEntity = Components.Schemas.BaseEntity;
export type BlueprintEntityId = Components.Schemas.BlueprintEntityId;
export type BooleanAttribute = Components.Schemas.BooleanAttribute;
export type ClassificationId = Components.Schemas.ClassificationId;
export type ClassificationSlug = Components.Schemas.ClassificationSlug;
export type ClassificationsUpdate = Components.Schemas.ClassificationsUpdate;
export type ComputedAttribute = Components.Schemas.ComputedAttribute;
export type ConsentAttribute = Components.Schemas.ConsentAttribute;
export type CountryAttribute = Components.Schemas.CountryAttribute;
export type CurrencyAttribute = Components.Schemas.CurrencyAttribute;
export type DateAttribute = Components.Schemas.DateAttribute;
export type DefaultAddressFields = Components.Schemas.DefaultAddressFields;
export type ESClusterAssignment = Components.Schemas.ESClusterAssignment;
export type EmailAttribute = Components.Schemas.EmailAttribute;
export type Entity = Components.Schemas.Entity;
export type EntityAcl = Components.Schemas.EntityAcl;
export type EntityAction = Components.Schemas.EntityAction;
export type EntityCapability = Components.Schemas.EntityCapability;
export type EntityCapabilityWithCompositeID = Components.Schemas.EntityCapabilityWithCompositeID;
export type EntityDefaultCreate = Components.Schemas.EntityDefaultCreate;
export type EntityDefaultEdit = Components.Schemas.EntityDefaultEdit;
export type EntityDefaultTable = Components.Schemas.EntityDefaultTable;
export type EntityId = Components.Schemas.EntityId;
export type EntityImportParams = Components.Schemas.EntityImportParams;
export type EntityItem = Components.Schemas.EntityItem;
export type EntityListParams = Components.Schemas.EntityListParams;
export type EntityOperation = Components.Schemas.EntityOperation;
export type EntityOwner = Components.Schemas.EntityOwner;
export type EntitySchema = Components.Schemas.EntitySchema;
export type EntitySchemaGroup = Components.Schemas.EntitySchemaGroup;
export type EntitySchemaGroupWithCompositeID = Components.Schemas.EntitySchemaGroupWithCompositeID;
export type EntitySchemaItem = Components.Schemas.EntitySchemaItem;
export type EntitySearchIncludeDeletedParam = Components.Schemas.EntitySearchIncludeDeletedParam;
export type EntitySearchOptions = Components.Schemas.EntitySearchOptions;
export type EntitySearchParams = Components.Schemas.EntitySearchParams;
export type EntitySearchResults = Components.Schemas.EntitySearchResults;
export type EntitySlug = Components.Schemas.EntitySlug;
export type EntityTableFilterOption = Components.Schemas.EntityTableFilterOption;
export type EntityTableFilterSearch = Components.Schemas.EntityTableFilterSearch;
export type EntityValidationError = Components.Schemas.EntityValidationError;
export type EntityValidationResult = Components.Schemas.EntityValidationResult;
export type EntityValidationResultError = Components.Schemas.EntityValidationResultError;
export type EntityValidationResultSuccess = Components.Schemas.EntityValidationResultSuccess;
export type EntityValidationV2Error = Components.Schemas.EntityValidationV2Error;
export type EntityValidationV2Result = Components.Schemas.EntityValidationV2Result;
export type EntityValidationV2ResultError = Components.Schemas.EntityValidationV2ResultError;
export type EntityValidationV2ResultSuccess = Components.Schemas.EntityValidationV2ResultSuccess;
export type EntityViewDisabled = Components.Schemas.EntityViewDisabled;
export type ErrorObject = Components.Schemas.ErrorObject;
export type ExportJobId = Components.Schemas.ExportJobId;
export type FieldsParam = Components.Schemas.FieldsParam;
export type FileAttribute = Components.Schemas.FileAttribute;
export type GenerateEntityTableAIFiltersRequest = Components.Schemas.GenerateEntityTableAIFiltersRequest;
export type GenerateEntityTableAIFiltersResponse = Components.Schemas.GenerateEntityTableAIFiltersResponse;
export type GetRelatedEntitiesCount = Components.Schemas.GetRelatedEntitiesCount;
export type GetRelationsResp = Components.Schemas.GetRelationsResp;
export type GetRelationsRespWithPagination = Components.Schemas.GetRelationsRespWithPagination;
export type GroupHeadline = Components.Schemas.GroupHeadline;
export type GroupHeadlineWithCompositeID = Components.Schemas.GroupHeadlineWithCompositeID;
export type HydratedEntity = Components.Schemas.HydratedEntity;
export type HydratedEntityItem = Components.Schemas.HydratedEntityItem;
export type InternalAttribute = Components.Schemas.InternalAttribute;
export type InternalUserAttribute = Components.Schemas.InternalUserAttribute;
export type InvitationEmailAttribute = Components.Schemas.InvitationEmailAttribute;
export type IsTemplate = Components.Schemas.IsTemplate;
export type Language = Components.Schemas.Language;
export type LinkAttribute = Components.Schemas.LinkAttribute;
export type ListSavedViewsResults = Components.Schemas.ListSavedViewsResults;
export type MessageEmailAddressAttribute = Components.Schemas.MessageEmailAddressAttribute;
export type MultiSelectAttribute = Components.Schemas.MultiSelectAttribute;
export type NumberAttribute = Components.Schemas.NumberAttribute;
export type OrderedListAttribute = Components.Schemas.OrderedListAttribute;
export type PartnerOrganisationAttribute = Components.Schemas.PartnerOrganisationAttribute;
export type PartnerStatusAttribute = Components.Schemas.PartnerStatusAttribute;
export type PaymentAttribute = Components.Schemas.PaymentAttribute;
export type PaymentMethodRelationAttribute = Components.Schemas.PaymentMethodRelationAttribute;
export type PhoneAttribute = Components.Schemas.PhoneAttribute;
export type PriceComponentAttribute = Components.Schemas.PriceComponentAttribute;
export type PurposeAttribute = Components.Schemas.PurposeAttribute;
export type RedirectEntityView = Components.Schemas.RedirectEntityView;
export type RelationAttribute = Components.Schemas.RelationAttribute;
export type RelationEntity = Components.Schemas.RelationEntity;
export type RelationItem = Components.Schemas.RelationItem;
export type RepeatableAttribute = Components.Schemas.RepeatableAttribute;
export type SavedView = Components.Schemas.SavedView;
export type SavedViewId = Components.Schemas.SavedViewId;
export type SavedViewItem = Components.Schemas.SavedViewItem;
export type SavedViewPartial = Components.Schemas.SavedViewPartial;
export type SchemaId = Components.Schemas.SchemaId;
export type SearchFilter = Components.Schemas.SearchFilter;
export type SearchFilterValue = Components.Schemas.SearchFilterValue;
export type SearchMappings = Components.Schemas.SearchMappings;
export type SelectAttribute = Components.Schemas.SelectAttribute;
export type SequenceAttribute = Components.Schemas.SequenceAttribute;
export type SettingFlag = Components.Schemas.SettingFlag;
export type StatusAttribute = Components.Schemas.StatusAttribute;
export type SummaryAttribute = Components.Schemas.SummaryAttribute;
export type SummaryField = Components.Schemas.SummaryField;
export type TagsAttribute = Components.Schemas.TagsAttribute;
export type Taxonomy = Components.Schemas.Taxonomy;
export type TaxonomyBulkJob = Components.Schemas.TaxonomyBulkJob;
export type TaxonomyBulkJobActionType = Components.Schemas.TaxonomyBulkJobActionType;
export type TaxonomyBulkJobStatus = Components.Schemas.TaxonomyBulkJobStatus;
export type TaxonomyBulkJobTriggerResponse = Components.Schemas.TaxonomyBulkJobTriggerResponse;
export type TaxonomyClassification = Components.Schemas.TaxonomyClassification;
export type TaxonomyLocationId = Components.Schemas.TaxonomyLocationId;
export type TaxonomySearchIncludeArchivedParam = Components.Schemas.TaxonomySearchIncludeArchivedParam;
export type TaxonomySlug = Components.Schemas.TaxonomySlug;
export type TextAttribute = Components.Schemas.TextAttribute;
export type UserRelationAttribute = Components.Schemas.UserRelationAttribute;
