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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            type?: "relation_address";
            has_primary?: boolean;
        }
        export interface Attachment {
            key: string;
            mime: string;
            name: string;
            size: number;
            image_url: string;
            download_url: string;
            alt_text?: string;
        }
        export type Attribute = /* Textarea or text input */ TextAttribute | /* Link with title and href */ LinkAttribute | /* Date or Datetime picker */ DateAttribute | /* Country picker */ CountryAttribute | /* Yes / No Toggle */ BooleanAttribute | /* Dropdown select */ SelectAttribute | /* Status select */ StatusAttribute | /* Sequence of unique identifiers */ SequenceAttribute | /* Entity Relationship */ RelationAttribute | /* User Relationship */ UserRelationAttribute | /* Reference to an address attribute of another entity */ AddressRelationAttribute | /* Currency input */ CurrencyAttribute | /* Repeatable (add N number of fields) */ RepeatableAttribute | /* Tags */ TagsAttribute | /* Numeric input */ NumberAttribute | /* Consent Management */ ConsentAttribute | /* No UI representation */ InternalAttribute | /* Type of attribute to render N number of ordered fields */ OrderedListAttribute | /* File or Image Attachment */ FileAttribute | /* An attribute that is computed from the entity data. For more details on how to use them, check the docs [here](https://e-pilot.atlassian.net/wiki/spaces/EO/pages/5642977476/How+To+Computed+Schema+Attributes) */ ComputedAttribute | /* Partner Status */ PartnerStatusAttribute | /* Email address for send invitation */ InvitationEmailAttribute | /* Automation entity */ AutomationAttribute | /* Epilot internal user info */ InternalUserAttribute;
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
        }
        /**
         * example:
         * {
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "_org": "123",
         *   "_schema": "contact",
         *   "_tags": [
         *     "example",
         *     "mock"
         *   ],
         *   "_created_at": "2021-02-09T12:41:43.662Z",
         *   "_updated_at": "2021-02-09T12:41:43.662Z"
         * }
         */
        export interface BaseEntity {
            _id: EntityId /* uuid */;
            /**
             * Title of entity
             */
            _title: string;
            /**
             * Organization Id the entity belongs to
             */
            _org: string;
            _schema: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            _tags?: string[];
            _created_at: string; // date-time
            _updated_at: string; // date-time
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            type?: "boolean";
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            type?: "date" | "datetime";
        }
        export interface Entity {
            [name: string]: any;
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
             * This capability should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
            /**
             * Only show capability for legacy tenants (ivy)
             */
            legacy?: boolean;
        }
        export interface EntityDefaultCreate {
            view_type?: "default";
        }
        export interface EntityDefaultEdit {
            view_type?: "default";
        }
        export interface EntityDefaultOverview {
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
                /**
                 * Only show item for legacy tenants (ivy)
                 */
                legacy?: boolean;
            } | {
                type?: "link";
                /**
                 * example:
                 * Opportunities
                 */
                title?: string;
                uri?: string; // uri
                /**
                 * This dropdown item should only be active when the feature flag is enabled
                 * example:
                 * FF_MY_FEATURE_FLAG
                 */
                feature_flag?: string;
                /**
                 * Only show item for legacy tenants (ivy)
                 */
                legacy?: boolean;
            })[];
            row_actions?: string[];
            classic_view?: string; // uri
        }
        export type EntityId = string; // uuid
        /**
         * example:
         * {
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "_org": "123",
         *   "_schema": "contact",
         *   "_tags": [
         *     "example",
         *     "mock"
         *   ],
         *   "_created_at": "2021-02-09T12:41:43.662Z",
         *   "_updated_at": "2021-02-09T12:41:43.662Z"
         * }
         */
        export interface EntityItem {
            [name: string]: any;
            _id: EntityId /* uuid */;
            /**
             * Title of entity
             */
            _title: string;
            /**
             * Organization Id the entity belongs to
             */
            _org: string;
            _schema: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            _tags?: string[];
            _created_at: string; // date-time
            _updated_at: string; // date-time
        }
        export interface EntityOperation {
            entity: EntityId /* uuid */;
            /**
             * example:
             * 123
             */
            org: string;
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
             *   "_schema": "contact",
             *   "_org": "123",
             *   "status": "Inactive"
             * }
             */
            payload?: {
                [name: string]: any;
            };
            diff?: {
                added?: Entity;
                updated?: Entity;
                deleted?: Entity;
            };
        }
        /**
         * example:
         * {
         *   "type": "redirect",
         *   "route": "/app/pricing-hub/product/:entityId"
         * }
         */
        export interface EntityParcelView {
            view_type?: "parcel";
            /**
             * example:
             * @epilot360/pricing-hub-app
             */
            import?: string;
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
                table_view?: EntityViewConfig;
                create_view?: EntityViewConfig;
                edit_view?: EntityViewConfig;
                list_item?: {
                    summary_attributes?: (/**
                     * Represents an expanded version of an attribute to be displayed in the list item summary.
                     * This configuration can be used in the following way:
                     * ```js
                     * {
                     *   "label": "Price components"
                     *   "value": "{{item.prices.length}} price components"
                     *   "show_as_tag": true
                     *   "render_condition": "is_composite_price = \"true\""
                     * }
                     * ```
                     * The value field supports handlebar expressions from which you can pick any field from the entity state.
                     *
                     */
                    SummaryAttribute | string)[];
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
            capabilities?: /* Capabilities the Entity has. Turn features on/off for entities. */ EntityCapability[];
            /**
             * A dictionary of Group Titles and associated settings if present.
             * example:
             * {
             *   "Order Info": {
             *     "expanded": true
             *   },
             *   "Contact Details": {
             *     "expanded": false,
             *     "info_tooltip_title": {
             *       "key": "partner.partner_information_group_tooltip",
             *       "default": "These informations are provided by the partner company and cannot be edited."
             *     }
             *   }
             * }
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
                 * This group should only be active when the setting is enabled
                 * example:
                 * MY_SETTING
                 */
                setting_flag?: string;
                info_tooltip_title?: {
                    key?: string;
                    default?: string;
                };
            }[];
            /**
             * Custom grid definitions for the layout
             */
            layout_settings?: {
                [name: string]: {
                    grid_gap?: string;
                    grid_template_columns?: string;
                };
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
            attributes?: Attribute[];
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
                table_view?: EntityViewConfig;
                create_view?: EntityViewConfig;
                edit_view?: EntityViewConfig;
                list_item?: {
                    summary_attributes?: (/**
                     * Represents an expanded version of an attribute to be displayed in the list item summary.
                     * This configuration can be used in the following way:
                     * ```js
                     * {
                     *   "label": "Price components"
                     *   "value": "{{item.prices.length}} price components"
                     *   "show_as_tag": true
                     *   "render_condition": "is_composite_price = \"true\""
                     * }
                     * ```
                     * The value field supports handlebar expressions from which you can pick any field from the entity state.
                     *
                     */
                    SummaryAttribute | string)[];
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
            capabilities?: /* Capabilities the Entity has. Turn features on/off for entities. */ EntityCapability[];
            /**
             * A dictionary of Group Titles and associated settings if present.
             * example:
             * {
             *   "Order Info": {
             *     "expanded": true
             *   },
             *   "Contact Details": {
             *     "expanded": false,
             *     "info_tooltip_title": {
             *       "key": "partner.partner_information_group_tooltip",
             *       "default": "These informations are provided by the partner company and cannot be edited."
             *     }
             *   }
             * }
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
                 * This group should only be active when the setting is enabled
                 * example:
                 * MY_SETTING
                 */
                setting_flag?: string;
                info_tooltip_title?: {
                    key?: string;
                    default?: string;
                };
            }[];
            /**
             * Custom grid definitions for the layout
             */
            layout_settings?: {
                [name: string]: {
                    grid_gap?: string;
                    grid_template_columns?: string;
                };
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
            attributes?: Attribute[];
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
            size?: number;
            /**
             * When true, enables entity hydration to resolve nested $relation references in-place.
             */
            hydrate?: boolean;
            /**
             * List of entity fields to include in search results
             * example:
             * [
             *   "_id",
             *   "_title",
             *   "first_name"
             * ]
             */
            fields?: string[];
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
             *   "_schema": "contact",
             *   "_tags": [
             *     "example",
             *     "mock"
             *   ],
             *   "_created_at": "2021-02-09T12:41:43.662Z",
             *   "_updated_at": "2021-02-09T12:41:43.662Z"
             * }
             */
            EntityItem[];
        }
        /**
         * URL-friendly identifier for the entity schema
         * example:
         * contact
         */
        export type EntitySlug = string;
        export type EntityViewConfig = EntityDefaultCreate | EntityDefaultEdit | EntityDefaultOverview | /**
         * example:
         * {
         *   "type": "redirect",
         *   "route": "/app/pricing-hub/product/:entityId"
         * }
         */
        RedirectEntityView | /**
         * example:
         * {
         *   "type": "redirect",
         *   "route": "/app/pricing-hub/product/:entityId"
         * }
         */
        EntityParcelView | EntityViewDisabled;
        export interface EntityViewDisabled {
            view_type?: "disabled";
        }
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            type: "image" | "file";
            multiple?: boolean;
            /**
             * List of file extensions (without the dot suffix)
             */
            allowed_extensions?: string[];
            default_access_control?: "public-read" | "private";
        }
        export type GetRelationsResp = (RelationItem | /**
         * example:
         * {
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "_org": "123",
         *   "_schema": "contact",
         *   "_tags": [
         *     "example",
         *     "mock"
         *   ],
         *   "_created_at": "2021-02-09T12:41:43.662Z",
         *   "_updated_at": "2021-02-09T12:41:43.662Z"
         * }
         */
        RelationEntity)[];
        /**
         * Entity with relation data resolved into the attribute values
         * example:
         * {
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
        }
        /**
         * Entity with relation data resolved into the attribute values
         * example:
         * {
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "_org": "123",
         *   "_schema": "contact",
         *   "_tags": [
         *     "example",
         *     "mock"
         *   ],
         *   "_created_at": "2021-02-09T12:41:43.662Z",
         *   "_updated_at": "2021-02-09T12:41:43.662Z",
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
             * Title of entity
             */
            _title: string;
            /**
             * Organization Id the entity belongs to
             */
            _org: string;
            _schema: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            _tags?: string[];
            _created_at: string; // date-time
            _updated_at: string; // date-time
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            type?: "invitation_email";
        }
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            type?: "link";
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            type?: "ordered_list";
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            type?: "partner_status";
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            type?: "relation";
            relation_type?: "has_many" | "has_one";
            delete_mode?: "cascade";
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
                 * Name of the setting flag that enables this action
                 */
                setting_flag?: string;
                /**
                 * example:
                 * {
                 *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                 *   "_org": "123",
                 *   "_schema": "contact",
                 *   "_tags": [
                 *     "example",
                 *     "mock"
                 *   ],
                 *   "_created_at": "2021-02-09T12:41:43.662Z",
                 *   "_updated_at": "2021-02-09T12:41:43.662Z"
                 * }
                 */
                new_entity_item?: {
                    [name: string]: any;
                    _id: EntityId /* uuid */;
                    /**
                     * Title of entity
                     */
                    _title: string;
                    /**
                     * Organization Id the entity belongs to
                     */
                    _org: string;
                    _schema: /**
                     * URL-friendly identifier for the entity schema
                     * example:
                     * contact
                     */
                    EntitySlug;
                    _tags?: string[];
                    _created_at: string; // date-time
                    _updated_at: string; // date-time
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
        }
        /**
         * example:
         * {
         *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
         *   "_org": "123",
         *   "_schema": "contact",
         *   "_tags": [
         *     "example",
         *     "mock"
         *   ],
         *   "_created_at": "2021-02-09T12:41:43.662Z",
         *   "_updated_at": "2021-02-09T12:41:43.662Z"
         * }
         */
        export interface RelationEntity {
            _id: EntityId /* uuid */;
            /**
             * Title of entity
             */
            _title: string;
            /**
             * Organization Id the entity belongs to
             */
            _org: string;
            _schema: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            _tags?: string[];
            _created_at: string; // date-time
            _updated_at: string; // date-time
            $relation?: RelationItem;
        }
        export interface RelationItem {
            entity_id: EntityId /* uuid */;
            attribute: string;
            _tags?: string[];
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            repeatable?: boolean;
            has_primary?: boolean;
            relation_affinity_mode?: "weak" | "strong";
            type?: "string" | "phone" | "email" | "address" | "relation" | "payment" | "price_component" | "date";
            /**
             * when enable_relation_picker is set to true the user will be able to pick existing relations as values. Otherwise, the user will need to create new relation to link.
             */
            enable_relation_picker?: boolean;
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            type?: "select" | "radio";
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            type?: "sequence";
            /**
             * Prefix added before the sequence number
             * example:
             * OR-
             */
            prefix?: string;
            start_number?: number;
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            type?: "status";
            options?: ((string | null) | {
                value: string;
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
         *   "render_condition": "is_composite_price = \"true\""
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
             * Binds summary field visibility to the setting flag state.
             */
            setting_flag?: string;
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            type?: "tags";
            options?: string[];
            suggestions?: string[];
        }
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            required?: boolean;
            readonly?: boolean;
            deprecated?: boolean;
            default_value?: string | {
                [name: string]: any;
            } | number | number | boolean | any[];
            group?: string;
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
             * This attribute should only be active when the setting is enabled
             * example:
             * MY_SETTING
             */
            setting_flag?: string;
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
            type?: "relation_user";
            multiple?: boolean;
        }
    }
}
declare namespace Paths {
    namespace AddRelations {
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
            slug: Parameters.Slug;
            id: Parameters.Id;
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
        }
        export type RequestBody = Components.Schemas.Entity;
        namespace Responses {
            export type $201 = /**
             * example:
             * {
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "_org": "123",
             *   "_schema": "contact",
             *   "_tags": [
             *     "example",
             *     "mock"
             *   ],
             *   "_created_at": "2021-02-09T12:41:43.662Z",
             *   "_updated_at": "2021-02-09T12:41:43.662Z"
             * }
             */
            Components.Schemas.EntityItem;
        }
    }
    namespace CreateNewSchemaVersion {
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
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DeleteSchemaById {
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
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
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
        }
        export interface PathParameters {
            id: Parameters.Id;
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
            slug: Parameters.Slug;
            id: Parameters.Id;
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
                 *   "_schema": "contact",
                 *   "_tags": [
                 *     "example",
                 *     "mock"
                 *   ],
                 *   "_created_at": "2021-02-09T12:41:43.662Z",
                 *   "_updated_at": "2021-02-09T12:41:43.662Z"
                 * }
                 */
                Components.Schemas.EntityItem;
                relations?: /**
                 * example:
                 * {
                 *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                 *   "_org": "123",
                 *   "_schema": "contact",
                 *   "_tags": [
                 *     "example",
                 *     "mock"
                 *   ],
                 *   "_created_at": "2021-02-09T12:41:43.662Z",
                 *   "_updated_at": "2021-02-09T12:41:43.662Z"
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
    namespace GetRelations {
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
            slug: Parameters.Slug;
            id: Parameters.Id;
        }
        export interface QueryParameters {
            hydrate?: Parameters.Hydrate;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetRelationsResp;
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
                versions?: /* The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities. */ Components.Schemas.EntitySchemaItem[];
                drafts?: /* The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities. */ Components.Schemas.EntitySchemaItem[];
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
    namespace SearchEntities {
        export type RequestBody = Components.Schemas.EntitySearchParams;
        namespace Responses {
            export type $200 = Components.Schemas.EntitySearchResults;
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
        export type RequestBody = Components.Schemas.Entity;
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "_org": "123",
             *   "_schema": "contact",
             *   "_tags": [
             *     "example",
             *     "mock"
             *   ],
             *   "_created_at": "2021-02-09T12:41:43.662Z",
             *   "_updated_at": "2021-02-09T12:41:43.662Z"
             * }
             */
            Components.Schemas.EntityItem;
        }
    }
    namespace UpdateRelation {
        namespace Parameters {
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
        export interface RequestBody {
            _tags?: string[];
        }
        namespace Responses {
            export type $200 = Components.Schemas.RelationItem;
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
        }
        export interface RequestBody {
            /**
             * example:
             * [
             *   "_id"
             * ]
             */
            unique_key: string[];
            entity: Components.Schemas.Entity;
        }
        namespace Responses {
            export type $200 = /**
             * example:
             * {
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "_org": "123",
             *   "_schema": "contact",
             *   "_tags": [
             *     "example",
             *     "mock"
             *   ],
             *   "_created_at": "2021-02-09T12:41:43.662Z",
             *   "_updated_at": "2021-02-09T12:41:43.662Z"
             * }
             */
            Components.Schemas.EntityItem;
            export type $201 = /**
             * example:
             * {
             *   "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
             *   "_org": "123",
             *   "_schema": "contact",
             *   "_tags": [
             *     "example",
             *     "mock"
             *   ],
             *   "_created_at": "2021-02-09T12:41:43.662Z",
             *   "_updated_at": "2021-02-09T12:41:43.662Z"
             * }
             */
            Components.Schemas.EntityItem;
            export interface $409 {
            }
        }
    }
}

export interface OperationMethods {
  /**
   * listSchemas - listSchemas
   * 
   * Get the latest version of local schema
   */
  'listSchemas'(
    parameters?: Parameters<Paths.ListSchemas.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSchemas.Responses.$200>
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
   * getSchemaVersions - getSchemaVersions
   * 
   * Get all versions of this schema ordered by the latest versions including drafts.
   */
  'getSchemaVersions'(
    parameters?: Parameters<Paths.GetSchemaVersions.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSchemaVersions.Responses.$200>
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
   * createNewSchemaVersion - createNewSchemaVersion
   * 
   * Create new version of the schema and default draft is false.
   */
  'createNewSchemaVersion'(
    parameters?: Parameters<Paths.CreateNewSchemaVersion.PathParameters & Paths.CreateNewSchemaVersion.QueryParameters> | null,
    data?: Paths.CreateNewSchemaVersion.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateNewSchemaVersion.Responses.$200>
  /**
   * deleteSchemaById - deleteSchemaById
   * 
   * Delete schema by Id
   */
  'deleteSchemaById'(
    parameters?: Parameters<Paths.DeleteSchemaById.PathParameters & Paths.DeleteSchemaById.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSchemaById.Responses.$204>
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
    parameters?: Parameters<Paths.GetActivity.PathParameters> | null,
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
   * It loads 1st level relations for the mentioned entity. You can control whether entire related entity is loaded or not via hydrate param.
   */
  'getRelations'(
    parameters?: Parameters<Paths.GetRelations.PathParameters & Paths.GetRelations.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRelations.Responses.$200>
  /**
   * addRelations - addRelations
   * 
   * It relates one or more entities to some parent entity, by providing meaning for relations via attribute field.
   */
  'addRelations'(
    parameters?: Parameters<Paths.AddRelations.PathParameters> | null,
    data?: Paths.AddRelations.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddRelations.Responses.$200>
  /**
   * updateRelation - updateRelation
   * 
   * It updates a relation between two entities.
   */
  'updateRelation'(
    parameters?: Parameters<Paths.UpdateRelation.PathParameters> | null,
    data?: Paths.UpdateRelation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateRelation.Responses.$200>
  /**
   * deleteRelation - deleteRelation
   * 
   * It deletes a relation between one entity and the other.
   */
  'deleteRelation'(
    parameters?: Parameters<Paths.DeleteRelation.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteRelation.Responses.$204>
}

export interface PathsDictionary {
  ['/v1/entity/schemas']: {
    /**
     * listSchemas - listSchemas
     * 
     * Get the latest version of local schema
     */
    'get'(
      parameters?: Parameters<Paths.ListSchemas.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSchemas.Responses.$200>
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
  ['/v1/entity/schemas/{slug}/versions']: {
    /**
     * getSchemaVersions - getSchemaVersions
     * 
     * Get all versions of this schema ordered by the latest versions including drafts.
     */
    'get'(
      parameters?: Parameters<Paths.GetSchemaVersions.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSchemaVersions.Responses.$200>
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
     * createNewSchemaVersion - createNewSchemaVersion
     * 
     * Create new version of the schema and default draft is false.
     */
    'put'(
      parameters?: Parameters<Paths.CreateNewSchemaVersion.PathParameters & Paths.CreateNewSchemaVersion.QueryParameters> | null,
      data?: Paths.CreateNewSchemaVersion.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateNewSchemaVersion.Responses.$200>
    /**
     * deleteSchemaById - deleteSchemaById
     * 
     * Delete schema by Id
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteSchemaById.PathParameters & Paths.DeleteSchemaById.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSchemaById.Responses.$204>
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
      parameters?: Parameters<Paths.GetActivity.PathParameters> | null,
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
     * It loads 1st level relations for the mentioned entity. You can control whether entire related entity is loaded or not via hydrate param.
     */
    'get'(
      parameters?: Parameters<Paths.GetRelations.PathParameters & Paths.GetRelations.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRelations.Responses.$200>
    /**
     * addRelations - addRelations
     * 
     * It relates one or more entities to some parent entity, by providing meaning for relations via attribute field.
     */
    'post'(
      parameters?: Parameters<Paths.AddRelations.PathParameters> | null,
      data?: Paths.AddRelations.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddRelations.Responses.$200>
  }
  ['/v1/entity/{slug}/{id}/relations/{attribute}/{entity_id}']: {
    /**
     * updateRelation - updateRelation
     * 
     * It updates a relation between two entities.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateRelation.PathParameters> | null,
      data?: Paths.UpdateRelation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateRelation.Responses.$200>
    /**
     * deleteRelation - deleteRelation
     * 
     * It deletes a relation between one entity and the other.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteRelation.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteRelation.Responses.$204>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
