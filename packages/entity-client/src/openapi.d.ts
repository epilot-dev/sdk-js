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
        export interface Attachment {
            key: string;
            mime: string;
            name: string;
            size: number;
            image_url: string;
            download_url: string;
            alt_text?: string;
        }
        export type Attribute = /* Textarea or text input */ TextAttribute | /* Link with title and href */ LinkAttribute | /* Date or Datetime picker */ DateAttribute | /* Country picker */ CountryAttribute | /* Yes / No Toggle */ BooleanAttribute | /* Dropdown select */ SelectAttribute | /* Entity Relationship */ RelationAttribute | /* User Relationship */ UserRelationAttribute | /* Tax Relationship */ TaxRelationAttribute | /* Currency input */ CurrencyAttribute | /* Repeatable (add N number of fields) */ RepeatableAttribute | /* Tags */ TagsAttribute | /* Numeric input */ NumberAttribute | /* Consent Management */ ConsentAttribute | /* No UI representation */ InternalAttribute | /* Type of attribute to render N number of ordered fields */ OrderedListAttribute | /* File or Image Attachment */ FileAttribute;
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
        export interface Blueprint {
            id?: BlueprintId /* uuid */;
            /**
             * example:
             * Power & Gas Utilities
             */
            name?: string;
            schemas?: /* The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities. */ EntitySchema[];
        }
        export type BlueprintEntityId = string; // uuid
        export type BlueprintId = string; // uuid
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
            type?: "boolean";
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
            type: "currency";
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
            }[];
            /**
             * This capability should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
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
             * updateEntity
             */
            operation?: string;
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
            blueprint?: BlueprintEntityId /* uuid */;
            /**
             * This schema should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
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
                    summary_attributes?: string[];
                };
            };
            capabilities: /* Capabilities the Entity has. Turn features on/off for entities. */ EntityCapability[];
            /**
             * A dictionary of Group Titles and associated settings if present.
             * example:
             * {
             *   "Order Info": {
             *     "expanded": true
             *   },
             *   "Contact Details": {
             *     "expanded": false
             *   }
             * }
             */
            group_settings?: {
                [name: string]: {
                    expanded?: boolean;
                };
            };
            /**
             * Custom grid definitions for the layout
             */
            layout_settings?: {
                [name: string]: {
                    grid_gap?: string;
                    grid_template_columns?: string;
                };
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
        }
        /**
         * The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities.
         */
        export interface EntitySchemaItem {
            id?: /* Generated uuid for schema */ SchemaId /* uuid */;
            slug: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            blueprint?: BlueprintEntityId /* uuid */;
            /**
             * This schema should only be active when the feature flag is enabled
             * example:
             * FF_MY_FEATURE_FLAG
             */
            feature_flag?: string;
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
                    summary_attributes?: string[];
                };
            };
            capabilities: /* Capabilities the Entity has. Turn features on/off for entities. */ EntityCapability[];
            /**
             * A dictionary of Group Titles and associated settings if present.
             * example:
             * {
             *   "Order Info": {
             *     "expanded": true
             *   },
             *   "Contact Details": {
             *     "expanded": false
             *   }
             * }
             */
            group_settings?: {
                [name: string]: {
                    expanded?: boolean;
                };
            };
            /**
             * Custom grid definitions for the layout
             */
            layout_settings?: {
                [name: string]: {
                    grid_gap?: string;
                    grid_template_columns?: string;
                };
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
        }
        export interface EntitySearchParams {
            /**
             * Lucene queries supported with ElasticSearch
             * example:
             * _schema:contact AND status:active
             */
            q?: string;
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
            /**
             * Deprecated. Use hydrate=true instead
             */
            expand?: string[];
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
            type: "image" | "file";
            multiple?: boolean;
            /**
             * List of unique content type specifiers (mime-types / extension)
             */
            allowed_types?: string[];
            default_access_control?: "public-read" | "private";
        }
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
            type?: "internal";
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
            type?: "ordered_list";
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
            type?: "relation";
            relation_type?: "belongs_to" | "has_many";
            delete_mode?: "cascade";
            relation_affinity_mode?: "weak" | "strong";
            edit_mode?: "list-view";
            drawer_size?: "small" | "medium" | "large";
            summary_fields?: (string | /* Summary Fields are displayed inside list view as a resume of the relation entity. */ SummaryField)[];
            allowedSchemas?: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug[];
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
            repeatable?: boolean;
            relation_affinity_mode?: "weak" | "strong";
            type?: "string" | "phone" | "email" | "address" | "relation";
        }
        /**
         * Generated uuid for schema
         */
        export type SchemaId = string; // uuid
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
            type?: "select" | "radio";
            options?: (string | {
                value: string;
                title?: string;
            })[];
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
            type?: "tags";
            options?: string[];
            suggestions?: string[];
        }
        /**
         * Tax Relationship
         */
        export interface TaxRelationAttribute {
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
            type?: "relation_tax";
            multiple?: boolean;
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
            type?: "relation_user";
            multiple?: boolean;
        }
    }
}
declare namespace Paths {
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
    namespace GetBlueprint {
        namespace Parameters {
            export type Id = Components.Schemas.BlueprintId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Blueprint;
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
    namespace GetSchema {
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
            export type $200 = /* The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities. */ Components.Schemas.EntitySchemaItem;
        }
    }
    namespace ListSchemas {
        namespace Responses {
            export interface $200 {
                results?: /* The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities. */ Components.Schemas.EntitySchemaItem[];
            }
        }
    }
    namespace PutSchema {
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
        export type RequestBody = /* The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities. */ Components.Schemas.EntitySchema;
        namespace Responses {
            export type $200 = /* The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities. */ Components.Schemas.EntitySchemaItem;
        }
    }
    namespace SearchAvailableBlueprints {
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.Blueprint[];
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
    namespace UpsertEntity {
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
   */
  'listSchemas'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSchemas.Responses.$200>
  /**
   * getSchema - getSchema
   */
  'getSchema'(
    parameters?: Parameters<Paths.GetSchema.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSchema.Responses.$200>
  /**
   * putSchema - putSchema
   */
  'putSchema'(
    parameters?: Parameters<Paths.PutSchema.PathParameters> | null,
    data?: Paths.PutSchema.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutSchema.Responses.$200>
  /**
   * deleteSchema - deleteSchema
   */
  'deleteSchema'(
    parameters?: Parameters<Paths.DeleteSchema.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSchema.Responses.$204>
  /**
   * searchEntities - searchEntities
   * 
   * Search for entities. Supports ordering and pagination. Lucene query syntax supported for complex querying.
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
   * searchAvailableBlueprints - searchAvailableBlueprints
   */
  'searchAvailableBlueprints'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchAvailableBlueprints.Responses.$200>
  /**
   * getBlueprint - getBlueprint
   */
  'getBlueprint'(
    parameters?: Parameters<Paths.GetBlueprint.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBlueprint.Responses.$200>
}

export interface PathsDictionary {
  ['/schemas']: {
    /**
     * listSchemas - listSchemas
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSchemas.Responses.$200>
  }
  ['/schemas/{slug}']: {
    /**
     * getSchema - getSchema
     */
    'get'(
      parameters?: Parameters<Paths.GetSchema.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSchema.Responses.$200>
    /**
     * putSchema - putSchema
     */
    'put'(
      parameters?: Parameters<Paths.PutSchema.PathParameters> | null,
      data?: Paths.PutSchema.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutSchema.Responses.$200>
    /**
     * deleteSchema - deleteSchema
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteSchema.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSchema.Responses.$204>
  }
  ['/entity:search']: {
    /**
     * searchEntities - searchEntities
     * 
     * Search for entities. Supports ordering and pagination. Lucene query syntax supported for complex querying.
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
  ['/entity:autocomplete']: {
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
  ['/entity/{slug}']: {
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
  ['/entity/{slug}:upsert']: {
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
  ['/entity/{slug}/{id}']: {
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
  ['/activity']: {
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
  ['/activity/{id}']: {
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
  ['/activity/{id}:attach']: {
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
  ['/entity/{slug}/{id}/activity']: {
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
  ['/blueprints']: {
    /**
     * searchAvailableBlueprints - searchAvailableBlueprints
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchAvailableBlueprints.Responses.$200>
  }
  ['/blueprints/{id}']: {
    /**
     * getBlueprint - getBlueprint
     */
    'get'(
      parameters?: Parameters<Paths.GetBlueprint.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBlueprint.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
