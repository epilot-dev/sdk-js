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
         * Payload for activating a partner account using an invitation token
         */
        export interface ActivatePartnerPayload {
            /**
             * The official name of the partner's company
             * example:
             * Acme Solar GmbH
             */
            company_name?: string;
            /**
             * Email address of the user completing the partner registration
             * example:
             * admin@acme-solar.de
             */
            signed_up_email: string; // email
            /**
             * The organization ID of the partner's existing epilot organization (if they already have one)
             * example:
             * 456
             */
            organization_id: string;
        }
        /**
         * Structured postal address
         */
        export interface Address {
            /**
             * Street name without house number
             * example:
             * Auweg
             */
            street?: string;
            /**
             * House or building number
             * example:
             * 10
             */
            street_number?: string;
            /**
             * City or locality name
             * example:
             * Regensburg
             */
            city?: string;
            /**
             * Postal or ZIP code
             * example:
             * 93055
             */
            postal_code?: string;
            /**
             * Country code (ISO 3166-1 alpha-2)
             * example:
             * DE
             */
            country?: string;
        }
        /**
         * Combined address and geographic coordinates for a location
         */
        export interface AddressGeolocation {
            address: /* Structured postal address */ Address;
            /**
             * Latitude coordinate (WGS84)
             * example:
             * 49.013
             */
            lat: number;
            /**
             * Longitude coordinate (WGS84)
             * example:
             * 12.101
             */
            lng: number;
            /**
             * Normalized full address as returned by the geocoding service
             * example:
             * Auweg 1, 93055 Regensburg, Germany
             */
            addressLabel?: string;
            /**
             * Confidence score for the geocoding result (0-1).
             * Values closer to 1 indicate higher confidence that the coordinates match the input address.
             *
             * example:
             * 0.95
             */
            relevance?: number;
        }
        /**
         * Request payload for assigning or unassigning roles to/from a user
         */
        export interface AssignRolesPayload {
            /**
             * Array of role IDs to assign or unassign
             * example:
             * [
             *   "123:partner_admin",
             *   "123:partner_viewer"
             * ]
             */
            roleIds: string[];
        }
        /**
         * A user, organization, or group that can be assigned to tasks, workflows, or entities.
         * The `type` field discriminates between different assignable types.
         *
         */
        export type Assignable = /**
         * A user, organization, or group that can be assigned to tasks, workflows, or entities.
         * The `type` field discriminates between different assignable types.
         *
         */
        /* A user within the caller's organization that can be assigned to tasks or entities */ AssignableUser | /* A user from a partner organization that can be assigned to shared tasks or entities */ AssignablePartnerUser | /**
         * A partner organization that can be assigned to tasks or entities at the organization level.
         * Useful when you want to assign work to a partner company rather than a specific individual.
         *
         */
        AssignableOrganization | /**
         * An End Customer Portal (ECP) user that can be assigned to tasks or entities.
         * These are external users who access the system through the customer portal.
         *
         */
        AssignableEcpPlaceholder | /* A user group that can be assigned to tasks or entities. All members of the group will be notified/assigned. */ AssignableGroup;
        /**
         * An End Customer Portal (ECP) user that can be assigned to tasks or entities.
         * These are external users who access the system through the customer portal.
         *
         */
        export interface AssignableEcpPlaceholder {
            /**
             * Discriminator field indicating the type of assignable
             * example:
             * ecp
             */
            type: "ecp";
            /**
             * Name of the portal user
             * example:
             * Max Mustermann
             */
            display_name: string;
            /**
             * Profile image URLs for the assignable
             */
            image_uri?: {
                /**
                 * Full-resolution profile image URL
                 * example:
                 * https://epilot-staging-user-content.s3.eu-central-1.amazonaws.com/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                original: string; // uri
                /**
                 * 32x32 pixel thumbnail image URL for compact displays
                 * example:
                 * https://file.sls.epilot.io/v1/files/public/preview?w=32&h=32&key=/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                thumbnail_32?: string; // uri
            };
            /**
             * Organization ID the assignable belongs to
             * example:
             * 123
             */
            org_id: string;
            /**
             * Timestamp when the assignable was created
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            created_at?: string; // date-time
            /**
             * Timestamp when the assignable was activated (for users, when they accepted their invitation)
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            activated_at?: string; // date-time
            /**
             * Current status of the assignable
             */
            status?: "Active" | "Pending" | "Deactivated" | "Deleted";
            /**
             * Unique identifier of the portal user
             * example:
             * ecp-456
             */
            user_id: string;
            /**
             * Email address of the portal user
             * example:
             * max.mustermann@customer.de
             */
            email?: string; // email
        }
        /**
         * A user group that can be assigned to tasks or entities. All members of the group will be notified/assigned.
         */
        export interface AssignableGroup {
            /**
             * Discriminator field indicating the type of assignable
             * example:
             * group
             */
            type: "group";
            /**
             * Human-readable name for display in UI (user name, organization name, or group name)
             * example:
             * John Smith
             */
            display_name: string;
            /**
             * Profile image URLs for the assignable
             */
            image_uri?: {
                /**
                 * Full-resolution profile image URL
                 * example:
                 * https://epilot-staging-user-content.s3.eu-central-1.amazonaws.com/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                original: string; // uri
                /**
                 * 32x32 pixel thumbnail image URL for compact displays
                 * example:
                 * https://file.sls.epilot.io/v1/files/public/preview?w=32&h=32&key=/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                thumbnail_32?: string; // uri
            };
            /**
             * Organization ID the assignable belongs to
             * example:
             * 123
             */
            org_id: string;
            /**
             * Timestamp when the assignable was created
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            created_at?: string; // date-time
            /**
             * Timestamp when the assignable was activated (for users, when they accepted their invitation)
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            activated_at?: string; // date-time
            /**
             * Current status of the assignable
             */
            status?: "Active" | "Pending" | "Deactivated" | "Deleted";
            /**
             * Unique identifier of the user group
             * example:
             * group-456
             */
            group_id?: string;
        }
        /**
         * A partner organization that can be assigned to tasks or entities at the organization level.
         * Useful when you want to assign work to a partner company rather than a specific individual.
         *
         */
        export interface AssignableOrganization {
            /**
             * Discriminator field indicating the type of assignable
             * example:
             * partner_organization
             */
            type: "partner_organization";
            /**
             * Name of the partner organization
             * example:
             * Acme Solar GmbH
             */
            display_name: string;
            /**
             * Profile image URLs for the assignable
             */
            image_uri?: {
                /**
                 * Full-resolution profile image URL
                 * example:
                 * https://epilot-staging-user-content.s3.eu-central-1.amazonaws.com/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                original: string; // uri
                /**
                 * 32x32 pixel thumbnail image URL for compact displays
                 * example:
                 * https://file.sls.epilot.io/v1/files/public/preview?w=32&h=32&key=/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                thumbnail_32?: string; // uri
            };
            /**
             * Organization ID the assignable belongs to
             * example:
             * 123
             */
            org_id: string;
            /**
             * Timestamp when the assignable was created
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            created_at?: string; // date-time
            /**
             * Timestamp when the assignable was activated (for users, when they accepted their invitation)
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            activated_at?: string; // date-time
            /**
             * Current status of the assignable
             */
            status?: "Active" | "Pending" | "Deactivated" | "Deleted";
            /**
             * ID of the partner relationship
             * example:
             * e45a6dc2-3795-43a3-ae0f-6b6760f310fc
             */
            partner_id: string;
            /**
             * Primary contact email for the partner organization
             * example:
             * contact@acme-solar.de
             */
            email?: string; // email
            /**
             * Physical locations of the partner organization with addresses and coordinates
             */
            geolocations?: /* Combined address and geographic coordinates for a location */ AddressGeolocation[];
            /**
             * Primary contact phone number for the partner organization
             * example:
             * +49 941 123456
             */
            phone?: string;
            /**
             * Geographic service radius in kilometers - the area within which the partner operates
             * example:
             * 50
             */
            activity_radius?: number;
        }
        /**
         * A user from a partner organization that can be assigned to shared tasks or entities
         */
        export interface AssignablePartnerUser {
            /**
             * Discriminator field indicating the type of assignable
             * example:
             * partner_user
             */
            type: "partner_user";
            /**
             * Full name of the partner user
             * example:
             * Jane Doe (Partner)
             */
            display_name: string;
            /**
             * Profile image URLs for the assignable
             */
            image_uri?: {
                /**
                 * Full-resolution profile image URL
                 * example:
                 * https://epilot-staging-user-content.s3.eu-central-1.amazonaws.com/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                original: string; // uri
                /**
                 * 32x32 pixel thumbnail image URL for compact displays
                 * example:
                 * https://file.sls.epilot.io/v1/files/public/preview?w=32&h=32&key=/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                thumbnail_32?: string; // uri
            };
            /**
             * Organization ID the assignable belongs to
             * example:
             * 123
             */
            org_id: string;
            /**
             * Timestamp when the assignable was created
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            created_at?: string; // date-time
            /**
             * Timestamp when the assignable was activated (for users, when they accepted their invitation)
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            activated_at?: string; // date-time
            /**
             * Current status of the assignable
             */
            status?: "Active" | "Pending" | "Deactivated" | "Deleted";
            /**
             * ID of the partner relationship through which this user is accessible
             * example:
             * e45a6dc2-3795-43a3-ae0f-6b6760f310fc
             */
            partner_id?: string;
            /**
             * Unique identifier of the partner user
             * example:
             * 789
             */
            user_id?: string;
            /**
             * Email address of the partner user
             * example:
             * jane.doe@partner.com
             */
            email?: string; // email
        }
        /**
         * A user within the caller's organization that can be assigned to tasks or entities
         */
        export interface AssignableUser {
            /**
             * Discriminator field indicating the type of assignable
             * example:
             * user
             */
            type: "user";
            /**
             * Full name of the user
             * example:
             * John Smith
             */
            display_name: string;
            /**
             * Profile image URLs for the assignable
             */
            image_uri?: {
                /**
                 * Full-resolution profile image URL
                 * example:
                 * https://epilot-staging-user-content.s3.eu-central-1.amazonaws.com/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                original: string; // uri
                /**
                 * 32x32 pixel thumbnail image URL for compact displays
                 * example:
                 * https://file.sls.epilot.io/v1/files/public/preview?w=32&h=32&key=/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                thumbnail_32?: string; // uri
            };
            /**
             * Organization ID the assignable belongs to
             * example:
             * 123
             */
            org_id: string;
            /**
             * Timestamp when the assignable was created
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            created_at?: string; // date-time
            /**
             * Timestamp when the assignable was activated (for users, when they accepted their invitation)
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            activated_at?: string; // date-time
            /**
             * Current status of the assignable
             */
            status?: "Active" | "Pending" | "Deactivated" | "Deleted";
            /**
             * Unique identifier of the user
             * example:
             * 456
             */
            user_id?: string;
            /**
             * Email address of the user
             * example:
             * john.smith@example.com
             */
            email?: string; // email
        }
        /**
         * Common properties shared by all assignable types
         */
        export interface BaseAssignable {
            /**
             * Discriminator field indicating the type of assignable
             * example:
             * user
             */
            type: string;
            /**
             * Human-readable name for display in UI (user name, organization name, or group name)
             * example:
             * John Smith
             */
            display_name: string;
            /**
             * Profile image URLs for the assignable
             */
            image_uri?: {
                /**
                 * Full-resolution profile image URL
                 * example:
                 * https://epilot-staging-user-content.s3.eu-central-1.amazonaws.com/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                original: string; // uri
                /**
                 * 32x32 pixel thumbnail image URL for compact displays
                 * example:
                 * https://file.sls.epilot.io/v1/files/public/preview?w=32&h=32&key=/728/8043d909-71fc-4838-a363-1b15dc1d585c/epilot.png
                 */
                thumbnail_32?: string; // uri
            };
            /**
             * Organization ID the assignable belongs to
             * example:
             * 123
             */
            org_id: string;
            /**
             * Timestamp when the assignable was created
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            created_at?: string; // date-time
            /**
             * Timestamp when the assignable was activated (for users, when they accepted their invitation)
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            activated_at?: string; // date-time
            /**
             * Current status of the assignable
             */
            status?: "Active" | "Pending" | "Deactivated" | "Deleted";
        }
        /**
         * Base schema for creating or updating a role
         */
        export interface BaseRoleForCreate {
            id?: /**
             * Unique identifier for a role, combining organization ID and role slug.
             * Format: <organization_id>:<slug>
             *
             * example:
             * 123:owner
             */
            RoleId;
            /**
             * Human-readable display name for the role
             * example:
             * Owner
             */
            name: string;
            /**
             * URL-friendly identifier for the role (lowercase, no spaces)
             * example:
             * owner
             */
            slug: string; // ^[a-z][a-z0-9_]*$
            /**
             * List of permission grants that define what users with this role can do
             */
            grants: /**
             * A permission grant that allows or denies a specific action on a resource.
             *
             * Grants are the building blocks of roles and define what users can do within the system.
             *
             */
            Grant[];
        }
        /**
         * Request payload for creating a new role in a partner organization
         */
        export interface CreatePartnerRolePayload {
            /**
             * Human-readable display name for the role
             * example:
             * Partner Administrator
             */
            name: string;
            /**
             * URL-friendly identifier for the role (lowercase, underscores allowed)
             * example:
             * partner_admin
             */
            slug: string; // ^[a-z][a-z0-9_]*$
            /**
             * Permission grants that define what users with this role can do.
             * Each grant specifies an action and resource pattern.
             *
             */
            grants: /* A grant with optional dependent grants that are automatically included when this grant is assigned */ GrantWithDependencies[];
        }
        /**
         * Request payload for creating a new user in a partner organization
         */
        export interface CreatePartnerUserPayload {
            /**
             * Email address for the new user. An invitation will be sent to this address.
             * example:
             * newuser@partner.com
             */
            email: string; // email
            /**
             * Preferred language for the user. Determines the language of the invitation email and default UI language.
             * example:
             * de
             */
            language?: "en" | "de";
            /**
             * Role IDs to automatically assign to the user upon creation.
             * If not provided, the user will have no roles until manually assigned.
             *
             * example:
             * [
             *   "123:partner_viewer"
             * ]
             */
            roles?: string[];
        }
        /**
         * A condition that checks if an attribute equals one of the specified values.
         * The grant only applies when the condition is satisfied.
         *
         */
        export interface EqualsCondition {
            /**
             * The attribute path to check (dot notation for nested attributes).
             * Example: workflows.primary.task_name checks the task name in the primary workflow.
             *
             * example:
             * workflows.primary.task_name
             */
            attribute: string;
            /**
             * The comparison operation to perform
             */
            operation: "equals";
            /**
             * List of values to match against - the condition is true if the attribute equals any of these values
             */
            values: string[];
        }
        /**
         * Geographic coordinates with optional metadata
         */
        export interface Geolocation {
            /**
             * Latitude coordinate (WGS84)
             * example:
             * 49.013
             */
            lat: number;
            /**
             * Longitude coordinate (WGS84)
             * example:
             * 12.101
             */
            lng: number;
            /**
             * Normalized full address as returned by the geocoding service
             * example:
             * Auweg 1, 93055 Regensburg, Germany
             */
            addressLabel?: string;
            /**
             * Confidence score for the geocoding result (0-1).
             * Values closer to 1 indicate higher confidence that the coordinates match the input address.
             *
             * example:
             * 0.95
             */
            relevance?: number;
        }
        /**
         * A permission grant that allows or denies a specific action on a resource.
         *
         * Grants are the building blocks of roles and define what users can do within the system.
         *
         */
        export interface Grant {
            /**
             * The action being granted or denied.
             * Common actions include: entity-read, entity-create, entity-update, entity-delete
             *
             * example:
             * entity-read
             */
            action: string;
            /**
             * The resource pattern this grant applies to.
             * Format: entity:<org_id>:<schema>:<entity_id>
             * Use wildcards (*) to match multiple resources.
             *
             * example:
             * entity:123:contact:*
             */
            resource?: string;
            /**
             * Whether this grant allows or denies the action
             */
            effect?: "allow" | "deny";
            /**
             * Additional conditions that must be met for this grant to apply
             */
            conditions?: /**
             * An additional condition that must be met for a grant to apply.
             * Conditions allow fine-grained control over when permissions are active.
             *
             */
            GrantCondition[];
        }
        /**
         * An additional condition that must be met for a grant to apply.
         * Conditions allow fine-grained control over when permissions are active.
         *
         */
        export type GrantCondition = /**
         * An additional condition that must be met for a grant to apply.
         * Conditions allow fine-grained control over when permissions are active.
         *
         */
        /**
         * A condition that checks if an attribute equals one of the specified values.
         * The grant only applies when the condition is satisfied.
         *
         */
        EqualsCondition;
        /**
         * A grant with optional dependent grants that are automatically included when this grant is assigned
         */
        export interface GrantWithDependencies {
            /**
             * The action being granted or denied.
             * Common actions include: entity-read, entity-create, entity-update, entity-delete
             *
             * example:
             * entity-read
             */
            action: string;
            /**
             * The resource pattern this grant applies to.
             * Format: entity:<org_id>:<schema>:<entity_id>
             * Use wildcards (*) to match multiple resources.
             *
             * example:
             * entity:123:contact:*
             */
            resource?: string;
            /**
             * Whether this grant allows or denies the action
             */
            effect?: "allow" | "deny";
            /**
             * Additional conditions that must be met for this grant to apply
             */
            conditions?: /**
             * An additional condition that must be met for a grant to apply.
             * Conditions allow fine-grained control over when permissions are active.
             *
             */
            GrantCondition[];
            /**
             * Additional grants that are automatically included when this grant is assigned.
             * Dependencies are expanded and stored with the role to ensure users have all
             * necessary permissions for the primary action.
             *
             */
            dependencies?: /**
             * A permission grant that allows or denies a specific action on a resource.
             *
             * Grants are the building blocks of roles and define what users can do within the system.
             *
             */
            Grant[];
        }
        /**
         * A secure token used for partner invitation and activation. Sent via email to the invited partner.
         * example:
         * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVySWQiOiIxMjM0NSJ9.abcdef
         */
        export type InviteToken = string;
        /**
         * Unique identifier for an organization in the epilot platform
         * example:
         * 123
         */
        export type OrganizationId = string;
        /**
         * Represents a partner organization in the partner directory.
         *
         * Partners go through a lifecycle from invitation to active collaboration:
         * - **Pending**: Initial state when partner record is created
         * - **Invited**: Invitation email has been sent to the partner
         * - **Request**: Partner has requested to join (self-registration)
         * - **Rejected**: Partnership request was declined
         * - **Deleted**: Partner relationship has been terminated
         *
         */
        export interface Partner {
            id?: /**
             * Unique identifier for a partner record (UUID format)
             * example:
             * e45a6dc2-3795-43a3-ae0f-6b6760f310fc
             */
            PartnerId;
            /**
             * The organization ID of the parent organization that invited this partner
             * example:
             * 123
             */
            organization_id?: string;
            /**
             * Timestamp when the partner record was created
             * example:
             * 2022-02-08T04:44:32.246Z
             */
            created_at?: string; // date-time
            /**
             * Optional description of the partner or partnership
             * example:
             * Regional solar installation partner for Bavaria
             */
            description?: string;
            /**
             * The legal or trading name of the partner organization
             * example:
             * Acme Solar GmbH
             */
            company_name?: string;
            /**
             * Secure token for partner activation (only present for invited partners)
             * example:
             * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
             */
            invitation_token?: string;
            /**
             * Deprecated: Use 'email' instead. Email address used for the invitation.
             */
            invitation_email?: string; // email
            /**
             * Primary email address of the partner, used for invitation delivery
             * example:
             * contact@acme-solar.de
             */
            email?: string; // email
            /**
             * Alternative email address where invitations should be sent (e.g., owner or admin email)
             * example:
             * owner@acme-solar.de
             */
            owner_email?: string; // email
            /**
             * Email address used by the partner when completing registration
             * example:
             * admin@acme-solar.de
             */
            signed_up_email?: string; // email
            /**
             * Organization ID of the partner organization (populated after activation)
             * example:
             * 456789
             */
            partner_org_id?: string;
            /**
             * Current status of the partner in the invitation/collaboration lifecycle
             */
            status?: "Pending" | "Request" | "Deleted" | "Invited" | "Rejected";
        }
        /**
         * Unique identifier for a partner record (UUID format)
         * example:
         * e45a6dc2-3795-43a3-ae0f-6b6760f310fc
         */
        export type PartnerId = string;
        /**
         * Configuration options for sending a partner invitation
         */
        export interface PartnerInvitationPayload {
            /**
             * Language for the partner invitation email. Determines the email template language.
             * example:
             * de
             */
            language?: "en" | "de";
        }
        /**
         * A role definition for users in a partner organization
         */
        export interface PartnerRole {
            /**
             * Unique identifier for the role (format: org_id:slug)
             * example:
             * 123:partner_admin
             */
            id: string;
            /**
             * URL-friendly identifier for the role
             * example:
             * partner_admin
             */
            slug: string;
            /**
             * Human-readable display name for the role
             * example:
             * Partner Administrator
             */
            name: string;
            /**
             * Type of role. Partner roles are typically 'share_role' indicating
             * they are designed for cross-organization sharing scenarios.
             *
             * example:
             * share_role
             */
            type?: string;
            /**
             * List of permission grants that define what users with this role can do
             */
            grants: /**
             * A permission grant that allows or denies a specific action on a resource.
             *
             * Grants are the building blocks of roles and define what users can do within the system.
             *
             */
            Grant[];
        }
        /**
         * A user within a partner organization, including their assigned roles
         */
        export interface PartnerUser {
            /**
             * Unique identifier for the user
             * example:
             * 456
             */
            id: string;
            /**
             * Full name of the user
             * example:
             * John Doe
             */
            name?: string;
            /**
             * Email address of the user
             * example:
             * user@partner.com
             */
            email: string; // email
            /**
             * Current status of the user account:
             * - Active: User has completed registration and can access the system
             * - Pending: User has been invited but not yet completed registration
             * - Deactivated: User account has been disabled
             *
             * example:
             * Active
             */
            status: string;
            /**
             * Profile image URLs for the user
             */
            image?: {
                /**
                 * Full-resolution profile image URL
                 */
                original?: string; // uri
                /**
                 * 32x32 pixel thumbnail image URL
                 */
                thumbnail_32?: string; // uri
            };
            /**
             * List of roles assigned to the user within the partner organization
             */
            roles: {
                /**
                 * Unique identifier for the role
                 * example:
                 * 123:partner_admin
                 */
                id: string;
                /**
                 * URL-friendly role identifier
                 * example:
                 * partner_admin
                 */
                slug: string;
                /**
                 * Human-readable role name
                 * example:
                 * Partner Administrator
                 */
                name: string;
            }[];
        }
        /**
         * Unique identifier for a role, combining organization ID and role slug.
         * Format: <organization_id>:<slug>
         *
         * example:
         * 123:owner
         */
        export type RoleId = string;
        /**
         * Request payload for geocoding an address to coordinates
         */
        export interface SearchGeolocation {
            /**
             * Full address string to convert to geographic coordinates.
             * For best results, include street, city, postal code, and country.
             *
             * example:
             * Auweg 1, 93055 Regensburg, DE
             */
            address: string;
        }
        /**
         * Request payload for updating an existing role in a partner organization
         */
        export interface UpdatePartnerRolePayload {
            /**
             * List of permission grants that define what users with this role can do
             */
            grants: /**
             * A permission grant that allows or denies a specific action on a resource.
             *
             * Grants are the building blocks of roles and define what users can do within the system.
             *
             */
            Grant[];
            id?: /**
             * Unique identifier for a role, combining organization ID and role slug.
             * Format: <organization_id>:<slug>
             *
             * example:
             * 123:owner
             */
            RoleId;
            /**
             * Human-readable display name for the role
             * example:
             * Owner
             */
            name: string;
            /**
             * URL-friendly identifier for the role (lowercase, no spaces)
             * example:
             * owner
             */
            slug: string; // ^[a-z][a-z0-9_]*$
        }
        /**
         * A user account in the epilot platform
         */
        export interface User {
            /**
             * Unique identifier for the user
             * example:
             * 456
             */
            id?: string;
            /**
             * Email address of the user
             * example:
             * user@example.com
             */
            email?: string; // email
            /**
             * Full name of the user for display purposes
             * example:
             * John Doe
             */
            display_name?: string;
            /**
             * Current status of the user account:
             * - Active: User has completed registration and can access the system
             * - Pending: User has been invited but not yet completed registration
             * - Deactivated: User account has been disabled
             *
             * example:
             * Active
             */
            status?: "Active" | "Pending" | "Deactivated";
        }
    }
}
declare namespace Paths {
    namespace ActivatePartner {
        namespace Parameters {
            export type Token = /**
             * A secure token used for partner invitation and activation. Sent via email to the invited partner.
             * example:
             * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVySWQiOiIxMjM0NSJ9.abcdef
             */
            Components.Schemas.InviteToken;
        }
        export interface QueryParameters {
            token: Parameters.Token;
        }
        export type RequestBody = /* Payload for activating a partner account using an invitation token */ Components.Schemas.ActivatePartnerPayload;
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $404 {
            }
            export interface $409 {
            }
        }
    }
    namespace ApprovePartner {
        namespace Parameters {
            export type Id = /**
             * Unique identifier for a partner record (UUID format)
             * example:
             * e45a6dc2-3795-43a3-ae0f-6b6760f310fc
             */
            Components.Schemas.PartnerId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $201 = /**
             * Represents a partner organization in the partner directory.
             *
             * Partners go through a lifecycle from invitation to active collaboration:
             * - **Pending**: Initial state when partner record is created
             * - **Invited**: Invitation email has been sent to the partner
             * - **Request**: Partner has requested to join (self-registration)
             * - **Rejected**: Partnership request was declined
             * - **Deleted**: Partner relationship has been terminated
             *
             */
            Components.Schemas.Partner;
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace AssignPartnerUserRoles {
        namespace Parameters {
            export type OrgId = /**
             * Unique identifier for an organization in the epilot platform
             * example:
             * 123
             */
            Components.Schemas.OrganizationId;
            export type UserId = string;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId;
            userId: Parameters.UserId;
        }
        export type RequestBody = /* Request payload for assigning or unassigning roles to/from a user */ Components.Schemas.AssignRolesPayload;
        namespace Responses {
            export interface $200 {
                /**
                 * Results for each role assignment attempt
                 */
                results?: {
                    /**
                     * The role ID that was processed
                     */
                    roleId?: string;
                    /**
                     * Whether the assignment was successful
                     */
                    success?: boolean;
                    /**
                     * Additional data on success
                     */
                    data?: {
                        [key: string]: any;
                    };
                    /**
                     * Error details on failure
                     */
                    error?: {
                        [key: string]: any;
                    };
                }[];
            }
            export interface $400 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace BatchGetAssignable {
        export type RequestBody = [
            {
                /**
                 * User ID of the assignable to retrieve
                 * example:
                 * 456
                 */
                user_id?: string;
                /**
                 * Organization ID of the assignable. If not provided, defaults to the caller's organization.
                 * example:
                 * 123
                 */
                org_id?: string;
                /**
                 * Group ID of the assignable to retrieve (mutually exclusive with user_id)
                 * example:
                 * group-789
                 */
                group_id?: string;
            },
            ...{
                /**
                 * User ID of the assignable to retrieve
                 * example:
                 * 456
                 */
                user_id?: string;
                /**
                 * Organization ID of the assignable. If not provided, defaults to the caller's organization.
                 * example:
                 * 123
                 */
                org_id?: string;
                /**
                 * Group ID of the assignable to retrieve (mutually exclusive with user_id)
                 * example:
                 * group-789
                 */
                group_id?: string;
            }[]
        ];
        namespace Responses {
            export interface $200 {
                /**
                 * Total number of assignables found
                 * example:
                 * 3
                 */
                hits?: number;
                results?: /**
                 * A user, organization, or group that can be assigned to tasks, workflows, or entities.
                 * The `type` field discriminates between different assignable types.
                 *
                 */
                Components.Schemas.Assignable[];
            }
            export interface $400 {
            }
        }
    }
    namespace CreatePartnerRole {
        namespace Parameters {
            export type OrgId = /**
             * Unique identifier for an organization in the epilot platform
             * example:
             * 123
             */
            Components.Schemas.OrganizationId;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId;
        }
        export type RequestBody = /* Request payload for creating a new role in a partner organization */ Components.Schemas.CreatePartnerRolePayload;
        namespace Responses {
            export type $201 = /* A role definition for users in a partner organization */ Components.Schemas.PartnerRole;
            export interface $400 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace CreatePartnerUser {
        namespace Parameters {
            export type OrgId = /**
             * Unique identifier for an organization in the epilot platform
             * example:
             * 123
             */
            Components.Schemas.OrganizationId;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId;
        }
        export type RequestBody = /* Request payload for creating a new user in a partner organization */ Components.Schemas.CreatePartnerUserPayload;
        namespace Responses {
            export type $201 = /* A user account in the epilot platform */ Components.Schemas.User;
            export interface $400 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace DeletePartnerRole {
        namespace Parameters {
            export type OrgId = /**
             * Unique identifier for an organization in the epilot platform
             * example:
             * 123
             */
            Components.Schemas.OrganizationId;
            export type RoleId = string;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId;
            roleId: Parameters.RoleId;
        }
        namespace Responses {
            export type $200 = /* A role definition for users in a partner organization */ Components.Schemas.PartnerRole;
            export interface $400 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $409 {
            }
            export interface $500 {
            }
        }
    }
    namespace DeletePartnerUser {
        namespace Parameters {
            export type OrgId = /**
             * Unique identifier for an organization in the epilot platform
             * example:
             * 123
             */
            Components.Schemas.OrganizationId;
            export type UserId = string;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId;
            userId: Parameters.UserId;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace GetPartnerByToken {
        namespace Parameters {
            export type Token = /**
             * A secure token used for partner invitation and activation. Sent via email to the invited partner.
             * example:
             * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVySWQiOiIxMjM0NSJ9.abcdef
             */
            Components.Schemas.InviteToken;
        }
        export interface QueryParameters {
            token: Parameters.Token;
        }
        namespace Responses {
            export type $200 = /**
             * Represents a partner organization in the partner directory.
             *
             * Partners go through a lifecycle from invitation to active collaboration:
             * - **Pending**: Initial state when partner record is created
             * - **Invited**: Invitation email has been sent to the partner
             * - **Request**: Partner has requested to join (self-registration)
             * - **Rejected**: Partnership request was declined
             * - **Deleted**: Partner relationship has been terminated
             *
             */
            Components.Schemas.Partner;
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetPartnerRoles {
        namespace Parameters {
            export type OrgId = /**
             * Unique identifier for an organization in the epilot platform
             * example:
             * 123
             */
            Components.Schemas.OrganizationId;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId;
        }
        namespace Responses {
            export interface $200 {
                results?: /* A role definition for users in a partner organization */ Components.Schemas.PartnerRole[];
            }
            export interface $400 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace GetPartnerUsers {
        namespace Parameters {
            export type OrgId = /**
             * Unique identifier for an organization in the epilot platform
             * example:
             * 123
             */
            Components.Schemas.OrganizationId;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId;
        }
        namespace Responses {
            export interface $200 {
                results?: /* A user within a partner organization, including their assigned roles */ Components.Schemas.PartnerUser[];
            }
            export interface $400 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace InvitePartnerV2 {
        namespace Parameters {
            export type Id = /**
             * Unique identifier for a partner record (UUID format)
             * example:
             * e45a6dc2-3795-43a3-ae0f-6b6760f310fc
             */
            Components.Schemas.PartnerId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = /* Configuration options for sending a partner invitation */ Components.Schemas.PartnerInvitationPayload;
        namespace Responses {
            export type $200 = /**
             * Represents a partner organization in the partner directory.
             *
             * Partners go through a lifecycle from invitation to active collaboration:
             * - **Pending**: Initial state when partner record is created
             * - **Invited**: Invitation email has been sent to the partner
             * - **Request**: Partner has requested to join (self-registration)
             * - **Rejected**: Partnership request was declined
             * - **Deleted**: Partner relationship has been terminated
             *
             */
            Components.Schemas.Partner;
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace RejectPartner {
        namespace Parameters {
            export type Id = /**
             * Unique identifier for a partner record (UUID format)
             * example:
             * e45a6dc2-3795-43a3-ae0f-6b6760f310fc
             */
            Components.Schemas.PartnerId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = /**
             * Represents a partner organization in the partner directory.
             *
             * Partners go through a lifecycle from invitation to active collaboration:
             * - **Pending**: Initial state when partner record is created
             * - **Invited**: Invitation email has been sent to the partner
             * - **Request**: Partner has requested to join (self-registration)
             * - **Rejected**: Partnership request was declined
             * - **Deleted**: Partner relationship has been terminated
             *
             */
            Components.Schemas.Partner;
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace SearchAssignable {
        export interface RequestBody {
            /**
             * Search query string to filter results by name or email
             * example:
             * john
             */
            q: string;
            /**
             * Starting offset for pagination (zero-based index)
             * example:
             * 0
             */
            from?: number;
            /**
             * Maximum number of results to return per page
             * example:
             * 25
             */
            size?: number;
            /**
             * Filter results to specific organization IDs. If not provided, searches all accessible organizations including partners.
             * example:
             * [
             *   "123",
             *   "456"
             * ]
             */
            org_ids?: /**
             * Unique identifier for an organization in the epilot platform
             * example:
             * 123
             */
            Components.Schemas.OrganizationId[];
            /**
             * Entity ID to scope portal user search. Required when `types` includes `ecp`.
             * When provided, only portal users related to the specified entity are returned
             * instead of placeholder users.
             *
             * example:
             * f7c22299-ca72-4bca-8538-0a88eeefc947
             */
            portalUsersEntityIdScope?: string;
            /**
             * Filter results to specific types of assignables.
             * If not provided, defaults to all types except `parent_organization_user`.
             *
             */
            types?: ("user" | "partner_user" | "partner_organization" | "ecp" | "group" | "parent_organization_user")[];
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Total number of matching results (may exceed returned results for pagination)
                 * example:
                 * 42
                 */
                hits?: number;
                results?: /**
                 * A user, organization, or group that can be assigned to tasks, workflows, or entities.
                 * The `type` field discriminates between different assignable types.
                 *
                 */
                Components.Schemas.Assignable[];
            }
            export interface $400 {
            }
        }
    }
    namespace SearchGeolocationForText {
        export type RequestBody = /* Request payload for geocoding an address to coordinates */ Components.Schemas.SearchGeolocation;
        namespace Responses {
            export type $200 = /* Geographic coordinates with optional metadata */ Components.Schemas.Geolocation;
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace UnassignPartnerUserRoles {
        namespace Parameters {
            export type OrgId = /**
             * Unique identifier for an organization in the epilot platform
             * example:
             * 123
             */
            Components.Schemas.OrganizationId;
            export type UserId = string;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId;
            userId: Parameters.UserId;
        }
        export type RequestBody = /* Request payload for assigning or unassigning roles to/from a user */ Components.Schemas.AssignRolesPayload;
        namespace Responses {
            export interface $200 {
                /**
                 * Results for each role removal attempt
                 */
                results?: {
                    /**
                     * The role ID that was processed
                     */
                    roleId?: string;
                    /**
                     * Whether the removal was successful
                     */
                    success?: boolean;
                    /**
                     * Additional data on success
                     */
                    data?: {
                        [key: string]: any;
                    };
                    /**
                     * Error details on failure
                     */
                    error?: {
                        [key: string]: any;
                    };
                }[];
            }
            export interface $400 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace UpdatePartnerRole {
        namespace Parameters {
            export type OrgId = /**
             * Unique identifier for an organization in the epilot platform
             * example:
             * 123
             */
            Components.Schemas.OrganizationId;
            export type RoleId = string;
        }
        export interface PathParameters {
            orgId: Parameters.OrgId;
            roleId: Parameters.RoleId;
        }
        export type RequestBody = /* Request payload for updating an existing role in a partner organization */ Components.Schemas.UpdatePartnerRolePayload;
        namespace Responses {
            export type $200 = /* A role definition for users in a partner organization */ Components.Schemas.PartnerRole;
            export interface $400 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
}


export interface OperationMethods {
  /**
   * approvePartner - approvePartner
   * 
   * Approves a pending partner request, allowing the partner to begin collaboration.
   * 
   * When a partner requests to join your organization's partner network, this endpoint
   * is used to approve the request and activate the partnership.
   * 
   */
  'approvePartner'(
    parameters?: Parameters<Paths.ApprovePartner.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApprovePartner.Responses.$201>
  /**
   * rejectPartner - rejectPartner
   * 
   * Rejects a pending partner request, declining the partnership.
   * 
   * When a partner requests to join your organization's partner network, this endpoint
   * is used to reject the request if the partnership is not desired.
   * 
   */
  'rejectPartner'(
    parameters?: Parameters<Paths.RejectPartner.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RejectPartner.Responses.$200>
  /**
   * searchAssignable - searchAssignable
   * 
   * Search for users and organizations that can be assigned to tasks, workflows, or entities.
   * 
   * This endpoint searches across your organization and all connected partner organizations
   * to find assignable resources. Use this when you need to assign someone to a task,
   * workflow step, or entity and want to include partners in the search.
   * 
   * **Results can include:**
   * - `user`: Users in your organization
   * - `partner_user`: Users in partner organizations
   * - `partner_organization`: Partner organizations themselves (for organization-level assignments)
   * - `ecp`: End Customer Portal users
   * - `group`: User groups
   * - `parent_organization_user`: Users from parent organization (for sub-organizations)
   * 
   * **Pagination:** Use `from` and `size` parameters for paginated results.
   * 
   */
  'searchAssignable'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchAssignable.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchAssignable.Responses.$200>
  /**
   * batchGetAssignable - batchGetAssignable
   * 
   * Retrieve multiple assignable users or groups by their IDs in a single request.
   * 
   * Use this endpoint when you have a list of user or group IDs and need to fetch
   * their full assignable information. This is more efficient than making multiple
   * individual requests.
   * 
   * Each item in the request array should specify either a `user_id` or `group_id`.
   * 
   */
  'batchGetAssignable'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.BatchGetAssignable.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BatchGetAssignable.Responses.$200>
  /**
   * getPartnerByToken - getPartnerByToken
   * 
   * Retrieves partner information using an invitation token.
   * 
   * This is a **public endpoint** that does not require authentication.
   * It is used during the partner onboarding flow to display partner information
   * before the invited organization completes their registration.
   * 
   * The token is sent to the partner via email when they are invited.
   * 
   */
  'getPartnerByToken'(
    parameters?: Parameters<Paths.GetPartnerByToken.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPartnerByToken.Responses.$200>
  /**
   * activatePartner - activatePartner
   * 
   * Activates a partner account using an invitation token.
   * 
   * This is a **public endpoint** that does not require authentication.
   * It is called when an invited partner completes their registration to establish
   * the partnership between the two organizations.
   * 
   * **Activation Flow:**
   * 1. Partner receives invitation email with token
   * 2. Partner clicks link and views invitation details (via `getPartnerByToken`)
   * 3. Partner completes registration form
   * 4. This endpoint is called to activate the partnership
   * 
   * After activation, the partner organization can begin collaborating with
   * the inviting organization through shared entities and assignments.
   * 
   */
  'activatePartner'(
    parameters?: Parameters<Paths.ActivatePartner.QueryParameters> | null,
    data?: Paths.ActivatePartner.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ActivatePartner.Responses.$200>
  /**
   * searchGeolocationForText - searchGeolocationForText
   * 
   * Converts an address string to geographic coordinates (latitude and longitude).
   * 
   * This endpoint is used to geocode partner addresses for location-based features such as:
   * - Partner search by proximity
   * - Displaying partners on a map
   * - Calculating activity radius coverage
   * 
   * The address should be provided as a complete, well-formatted string for best results.
   * 
   */
  'searchGeolocationForText'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchGeolocationForText.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchGeolocationForText.Responses.$200>
  /**
   * invitePartnerV2 - invitePartnerV2
   * 
   * Sends an invitation email to a partner organization to begin collaboration.
   * 
   * This endpoint generates an invitation token and sends an email to the partner
   * with a link to complete their registration. The partner can then accept the
   * invitation to establish a B2B partnership.
   * 
   * **Invitation Flow:**
   * 1. Create a partner record (via entity API)
   * 2. Call this endpoint to send the invitation email
   * 3. Partner receives email with unique invitation link
   * 4. Partner activates their account via the public activation endpoint
   * 
   * The invitation email language can be customized via the request body.
   * 
   */
  'invitePartnerV2'(
    parameters?: Parameters<Paths.InvitePartnerV2.PathParameters> | null,
    data?: Paths.InvitePartnerV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InvitePartnerV2.Responses.$200>
  /**
   * getPartnerUsers - getPartnerUsers
   * 
   * Retrieves all users belonging to a partner organization along with their assigned roles.
   * 
   * This endpoint allows parent organizations to view and manage the users within
   * their partner organizations. The response includes user details and their
   * role assignments within the partner organization.
   * 
   */
  'getPartnerUsers'(
    parameters?: Parameters<Paths.GetPartnerUsers.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPartnerUsers.Responses.$200>
  /**
   * createPartnerUser - createPartnerUser
   * 
   * Creates a new user in a partner organization.
   * 
   * This endpoint allows parent organizations to create users directly within
   * their partner organizations. The new user will receive an invitation email
   * to set up their account.
   * 
   * Optionally, roles can be assigned to the user at creation time.
   * 
   */
  'createPartnerUser'(
    parameters?: Parameters<Paths.CreatePartnerUser.PathParameters> | null,
    data?: Paths.CreatePartnerUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreatePartnerUser.Responses.$201>
  /**
   * deletePartnerUser - deletePartnerUser
   * 
   * Removes a user from a partner organization.
   * 
   * This endpoint allows parent organizations to delete users from their partner
   * organizations. The user will lose access to the partner organization immediately.
   * 
   * **Note:** This action is permanent and cannot be undone.
   * 
   */
  'deletePartnerUser'(
    parameters?: Parameters<Paths.DeletePartnerUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeletePartnerUser.Responses.$200>
  /**
   * getPartnerRoles - getPartnerRoles
   * 
   * Retrieves all roles defined for a partner organization.
   * 
   * Roles define the permissions that users in the partner organization have.
   * Parent organizations can use this endpoint to view available roles before
   * assigning them to partner users.
   * 
   */
  'getPartnerRoles'(
    parameters?: Parameters<Paths.GetPartnerRoles.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPartnerRoles.Responses.$200>
  /**
   * createPartnerRole - createPartnerRole
   * 
   * Creates a new role for a partner organization.
   * 
   * Roles define permissions for partner users. The parent organization can create
   * custom roles with specific permission grants to control what partner users
   * can access and modify.
   * 
   * **Permission Grants:**
   * Each role contains a list of grants that define allowed (or denied) actions
   * on specific resources. See the Grant schema for details on defining permissions.
   * 
   */
  'createPartnerRole'(
    parameters?: Parameters<Paths.CreatePartnerRole.PathParameters> | null,
    data?: Paths.CreatePartnerRole.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreatePartnerRole.Responses.$201>
  /**
   * updatePartnerRole - updatePartnerRole
   * 
   * Updates an existing role in a partner organization.
   * 
   * Use this endpoint to modify the permissions (grants) or metadata of an existing
   * role. All users with this role will immediately have the updated permissions.
   * 
   * **Note:** Changing role permissions affects all users currently assigned to the role.
   * 
   */
  'updatePartnerRole'(
    parameters?: Parameters<Paths.UpdatePartnerRole.PathParameters> | null,
    data?: Paths.UpdatePartnerRole.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdatePartnerRole.Responses.$200>
  /**
   * deletePartnerRole - deletePartnerRole
   * 
   * Delete a role from a partner organization
   */
  'deletePartnerRole'(
    parameters?: Parameters<Paths.DeletePartnerRole.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeletePartnerRole.Responses.$200>
  /**
   * assignPartnerUserRoles - assignPartnerUserRoles
   * 
   * Assigns one or more roles to a user in a partner organization.
   * 
   * Roles define the permissions that the user has within the partner organization.
   * Multiple roles can be assigned in a single request. The response indicates
   * the success or failure of each role assignment.
   * 
   */
  'assignPartnerUserRoles'(
    parameters?: Parameters<Paths.AssignPartnerUserRoles.PathParameters> | null,
    data?: Paths.AssignPartnerUserRoles.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AssignPartnerUserRoles.Responses.$200>
  /**
   * unassignPartnerUserRoles - unassignPartnerUserRoles
   * 
   * Removes one or more roles from a user in a partner organization.
   * 
   * This endpoint removes the specified roles from the user, reducing their permissions
   * within the partner organization. The response indicates the success or failure
   * of each role removal.
   * 
   * **Note:** Removing all roles from a user may result in the user having no access
   * to the partner organization.
   * 
   */
  'unassignPartnerUserRoles'(
    parameters?: Parameters<Paths.UnassignPartnerUserRoles.PathParameters> | null,
    data?: Paths.UnassignPartnerUserRoles.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UnassignPartnerUserRoles.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/partners/{id}/approve']: {
    /**
     * approvePartner - approvePartner
     * 
     * Approves a pending partner request, allowing the partner to begin collaboration.
     * 
     * When a partner requests to join your organization's partner network, this endpoint
     * is used to approve the request and activate the partnership.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ApprovePartner.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApprovePartner.Responses.$201>
  }
  ['/v1/partners/{id}/reject']: {
    /**
     * rejectPartner - rejectPartner
     * 
     * Rejects a pending partner request, declining the partnership.
     * 
     * When a partner requests to join your organization's partner network, this endpoint
     * is used to reject the request if the partnership is not desired.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.RejectPartner.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RejectPartner.Responses.$200>
  }
  ['/v1/partners/assignables:search']: {
    /**
     * searchAssignable - searchAssignable
     * 
     * Search for users and organizations that can be assigned to tasks, workflows, or entities.
     * 
     * This endpoint searches across your organization and all connected partner organizations
     * to find assignable resources. Use this when you need to assign someone to a task,
     * workflow step, or entity and want to include partners in the search.
     * 
     * **Results can include:**
     * - `user`: Users in your organization
     * - `partner_user`: Users in partner organizations
     * - `partner_organization`: Partner organizations themselves (for organization-level assignments)
     * - `ecp`: End Customer Portal users
     * - `group`: User groups
     * - `parent_organization_user`: Users from parent organization (for sub-organizations)
     * 
     * **Pagination:** Use `from` and `size` parameters for paginated results.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchAssignable.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchAssignable.Responses.$200>
  }
  ['/v1/partners/assignables:batchGet']: {
    /**
     * batchGetAssignable - batchGetAssignable
     * 
     * Retrieve multiple assignable users or groups by their IDs in a single request.
     * 
     * Use this endpoint when you have a list of user or group IDs and need to fetch
     * their full assignable information. This is more efficient than making multiple
     * individual requests.
     * 
     * Each item in the request array should specify either a `user_id` or `group_id`.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.BatchGetAssignable.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BatchGetAssignable.Responses.$200>
  }
  ['/v1/partner-directory/public/getPartnerByToken']: {
    /**
     * getPartnerByToken - getPartnerByToken
     * 
     * Retrieves partner information using an invitation token.
     * 
     * This is a **public endpoint** that does not require authentication.
     * It is used during the partner onboarding flow to display partner information
     * before the invited organization completes their registration.
     * 
     * The token is sent to the partner via email when they are invited.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetPartnerByToken.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPartnerByToken.Responses.$200>
  }
  ['/v1/partner-directory/public/activate']: {
    /**
     * activatePartner - activatePartner
     * 
     * Activates a partner account using an invitation token.
     * 
     * This is a **public endpoint** that does not require authentication.
     * It is called when an invited partner completes their registration to establish
     * the partnership between the two organizations.
     * 
     * **Activation Flow:**
     * 1. Partner receives invitation email with token
     * 2. Partner clicks link and views invitation details (via `getPartnerByToken`)
     * 3. Partner completes registration form
     * 4. This endpoint is called to activate the partnership
     * 
     * After activation, the partner organization can begin collaborating with
     * the inviting organization through shared entities and assignments.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ActivatePartner.QueryParameters> | null,
      data?: Paths.ActivatePartner.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ActivatePartner.Responses.$200>
  }
  ['/v1/geolocation/text:search']: {
    /**
     * searchGeolocationForText - searchGeolocationForText
     * 
     * Converts an address string to geographic coordinates (latitude and longitude).
     * 
     * This endpoint is used to geocode partner addresses for location-based features such as:
     * - Partner search by proximity
     * - Displaying partners on a map
     * - Calculating activity radius coverage
     * 
     * The address should be provided as a complete, well-formatted string for best results.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchGeolocationForText.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchGeolocationForText.Responses.$200>
  }
  ['/v2/partners/{id}/invite']: {
    /**
     * invitePartnerV2 - invitePartnerV2
     * 
     * Sends an invitation email to a partner organization to begin collaboration.
     * 
     * This endpoint generates an invitation token and sends an email to the partner
     * with a link to complete their registration. The partner can then accept the
     * invitation to establish a B2B partnership.
     * 
     * **Invitation Flow:**
     * 1. Create a partner record (via entity API)
     * 2. Call this endpoint to send the invitation email
     * 3. Partner receives email with unique invitation link
     * 4. Partner activates their account via the public activation endpoint
     * 
     * The invitation email language can be customized via the request body.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.InvitePartnerV2.PathParameters> | null,
      data?: Paths.InvitePartnerV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InvitePartnerV2.Responses.$200>
  }
  ['/v2/partners/{orgId}/users']: {
    /**
     * getPartnerUsers - getPartnerUsers
     * 
     * Retrieves all users belonging to a partner organization along with their assigned roles.
     * 
     * This endpoint allows parent organizations to view and manage the users within
     * their partner organizations. The response includes user details and their
     * role assignments within the partner organization.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetPartnerUsers.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPartnerUsers.Responses.$200>
    /**
     * createPartnerUser - createPartnerUser
     * 
     * Creates a new user in a partner organization.
     * 
     * This endpoint allows parent organizations to create users directly within
     * their partner organizations. The new user will receive an invitation email
     * to set up their account.
     * 
     * Optionally, roles can be assigned to the user at creation time.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.CreatePartnerUser.PathParameters> | null,
      data?: Paths.CreatePartnerUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreatePartnerUser.Responses.$201>
  }
  ['/v2/partners/{orgId}/users/{userId}']: {
    /**
     * deletePartnerUser - deletePartnerUser
     * 
     * Removes a user from a partner organization.
     * 
     * This endpoint allows parent organizations to delete users from their partner
     * organizations. The user will lose access to the partner organization immediately.
     * 
     * **Note:** This action is permanent and cannot be undone.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.DeletePartnerUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeletePartnerUser.Responses.$200>
  }
  ['/v2/partners/{orgId}/roles']: {
    /**
     * getPartnerRoles - getPartnerRoles
     * 
     * Retrieves all roles defined for a partner organization.
     * 
     * Roles define the permissions that users in the partner organization have.
     * Parent organizations can use this endpoint to view available roles before
     * assigning them to partner users.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetPartnerRoles.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPartnerRoles.Responses.$200>
    /**
     * createPartnerRole - createPartnerRole
     * 
     * Creates a new role for a partner organization.
     * 
     * Roles define permissions for partner users. The parent organization can create
     * custom roles with specific permission grants to control what partner users
     * can access and modify.
     * 
     * **Permission Grants:**
     * Each role contains a list of grants that define allowed (or denied) actions
     * on specific resources. See the Grant schema for details on defining permissions.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.CreatePartnerRole.PathParameters> | null,
      data?: Paths.CreatePartnerRole.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreatePartnerRole.Responses.$201>
  }
  ['/v2/partners/{orgId}/roles/{roleId}']: {
    /**
     * updatePartnerRole - updatePartnerRole
     * 
     * Updates an existing role in a partner organization.
     * 
     * Use this endpoint to modify the permissions (grants) or metadata of an existing
     * role. All users with this role will immediately have the updated permissions.
     * 
     * **Note:** Changing role permissions affects all users currently assigned to the role.
     * 
     */
    'put'(
      parameters?: Parameters<Paths.UpdatePartnerRole.PathParameters> | null,
      data?: Paths.UpdatePartnerRole.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdatePartnerRole.Responses.$200>
    /**
     * deletePartnerRole - deletePartnerRole
     * 
     * Delete a role from a partner organization
     */
    'delete'(
      parameters?: Parameters<Paths.DeletePartnerRole.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeletePartnerRole.Responses.$200>
  }
  ['/v2/partners/{orgId}/users/{userId}/roles']: {
    /**
     * assignPartnerUserRoles - assignPartnerUserRoles
     * 
     * Assigns one or more roles to a user in a partner organization.
     * 
     * Roles define the permissions that the user has within the partner organization.
     * Multiple roles can be assigned in a single request. The response indicates
     * the success or failure of each role assignment.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.AssignPartnerUserRoles.PathParameters> | null,
      data?: Paths.AssignPartnerUserRoles.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AssignPartnerUserRoles.Responses.$200>
    /**
     * unassignPartnerUserRoles - unassignPartnerUserRoles
     * 
     * Removes one or more roles from a user in a partner organization.
     * 
     * This endpoint removes the specified roles from the user, reducing their permissions
     * within the partner organization. The response indicates the success or failure
     * of each role removal.
     * 
     * **Note:** Removing all roles from a user may result in the user having no access
     * to the partner organization.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.UnassignPartnerUserRoles.PathParameters> | null,
      data?: Paths.UnassignPartnerUserRoles.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UnassignPartnerUserRoles.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ActivatePartnerPayload = Components.Schemas.ActivatePartnerPayload;
export type Address = Components.Schemas.Address;
export type AddressGeolocation = Components.Schemas.AddressGeolocation;
export type AssignRolesPayload = Components.Schemas.AssignRolesPayload;
export type Assignable = Components.Schemas.Assignable;
export type AssignableEcpPlaceholder = Components.Schemas.AssignableEcpPlaceholder;
export type AssignableGroup = Components.Schemas.AssignableGroup;
export type AssignableOrganization = Components.Schemas.AssignableOrganization;
export type AssignablePartnerUser = Components.Schemas.AssignablePartnerUser;
export type AssignableUser = Components.Schemas.AssignableUser;
export type BaseAssignable = Components.Schemas.BaseAssignable;
export type BaseRoleForCreate = Components.Schemas.BaseRoleForCreate;
export type CreatePartnerRolePayload = Components.Schemas.CreatePartnerRolePayload;
export type CreatePartnerUserPayload = Components.Schemas.CreatePartnerUserPayload;
export type EqualsCondition = Components.Schemas.EqualsCondition;
export type Geolocation = Components.Schemas.Geolocation;
export type Grant = Components.Schemas.Grant;
export type GrantCondition = Components.Schemas.GrantCondition;
export type GrantWithDependencies = Components.Schemas.GrantWithDependencies;
export type InviteToken = Components.Schemas.InviteToken;
export type OrganizationId = Components.Schemas.OrganizationId;
export type Partner = Components.Schemas.Partner;
export type PartnerId = Components.Schemas.PartnerId;
export type PartnerInvitationPayload = Components.Schemas.PartnerInvitationPayload;
export type PartnerRole = Components.Schemas.PartnerRole;
export type PartnerUser = Components.Schemas.PartnerUser;
export type RoleId = Components.Schemas.RoleId;
export type SearchGeolocation = Components.Schemas.SearchGeolocation;
export type UpdatePartnerRolePayload = Components.Schemas.UpdatePartnerRolePayload;
export type User = Components.Schemas.User;
