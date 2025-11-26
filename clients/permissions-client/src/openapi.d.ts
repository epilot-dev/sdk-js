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
         * A role attached to an user
         */
        export interface Assignment {
            user_id?: /**
             * Id of a user
             * example:
             * 1
             */
            UserId;
            roles?: /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            RoleId[];
        }
        /**
         * List of role ids attached to an user
         */
        export type Assignments = /**
         * Format: <organization_id>:<slug>
         * example:
         * 123:owner
         */
        RoleId[];
        export interface BaseRole {
            id: /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            RoleId;
            /**
             * Human-friendly name for the role
             * example:
             * Owner
             */
            name: string;
            /**
             * URL-friendly name for the role
             * example:
             * owner
             */
            slug: string;
            /**
             * Type of the role
             */
            type: string;
            /**
             * date and time then the role will expire
             * example:
             * 2028-07-21T17:32:28Z
             */
            expires_at?: string; // date-time
            organization_id: /**
             * Id of an organization
             * example:
             * 123
             */
            OrganizationId;
            /**
             * List of grants (permissions) applied to the role
             */
            grants: Grant[];
        }
        export interface BaseRoleForCreate {
            id?: /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            RoleId;
            /**
             * Human-friendly name for the role
             * example:
             * Owner
             */
            name: string;
            /**
             * URL-friendly name for the role
             * example:
             * owner
             */
            slug: string;
            /**
             * Type of the role
             */
            type: string;
            /**
             * date and time then the role will expire
             * example:
             * 2028-07-21T17:32:28Z
             */
            expires_at?: string; // date-time
            organization_id?: /**
             * Id of an organization
             * example:
             * 123
             */
            OrganizationId;
            /**
             * List of grants (permissions) applied to the role
             */
            grants: Grant[];
        }
        export type CreateRolePayload = {
            /**
             * Type of the role
             */
            type: "user_role";
            /**
             * Optional parent role that this role inherits from. Must be an `org_role` or a sharing role of type `share_role` or `partner_role`.
             * example:
             * 123:owner
             */
            parent_role?: string;
            /**
             * List of grants (permissions) applied to the role
             */
            grants: Grant[];
            id?: /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            RoleId;
            /**
             * Human-friendly name for the role
             * example:
             * Owner
             */
            name: string;
            /**
             * URL-friendly name for the role
             * example:
             * owner
             */
            slug: string;
            /**
             * date and time then the role will expire
             * example:
             * 2028-07-21T17:32:28Z
             */
            expires_at?: string; // date-time
            organization_id?: /**
             * Id of an organization
             * example:
             * 123
             */
            OrganizationId;
        } | {
            /**
             * Type of the role
             */
            type: "org_role";
            /**
             * The pricing tier of the organization this root role is based on
             * example:
             * Professional
             */
            pricing_tier?: string;
            /**
             * List of grants (permissions) applied to the role
             */
            grants: Grant[];
            id?: /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            RoleId;
            /**
             * Human-friendly name for the role
             * example:
             * Owner
             */
            name: string;
            /**
             * URL-friendly name for the role
             * example:
             * owner
             */
            slug: string;
            /**
             * date and time then the role will expire
             * example:
             * 2028-07-21T17:32:28Z
             */
            expires_at?: string; // date-time
            organization_id?: /**
             * Id of an organization
             * example:
             * 123
             */
            OrganizationId;
        } | {
            /**
             * Type of the role
             */
            type: "share_role";
            /**
             * List of grants (permissions) applied to the role
             */
            grants: Grant[];
            id?: /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            RoleId;
            /**
             * Human-friendly name for the role
             * example:
             * Owner
             */
            name: string;
            /**
             * URL-friendly name for the role
             * example:
             * owner
             */
            slug: string;
            /**
             * date and time then the role will expire
             * example:
             * 2028-07-21T17:32:28Z
             */
            expires_at?: string; // date-time
            organization_id?: /**
             * Id of an organization
             * example:
             * 123
             */
            OrganizationId;
        } | {
            /**
             * Type of the role
             */
            type: "partner_role";
            /**
             * Id of an organization
             * example:
             * 123
             */
            partner_org_id?: string;
            /**
             * List of grants (permissions) applied to the role
             */
            grants: Grant[];
            id?: /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            RoleId;
            /**
             * Human-friendly name for the role
             * example:
             * Owner
             */
            name: string;
            /**
             * URL-friendly name for the role
             * example:
             * owner
             */
            slug: string;
            /**
             * date and time then the role will expire
             * example:
             * 2028-07-21T17:32:28Z
             */
            expires_at?: string; // date-time
            organization_id?: /**
             * Id of an organization
             * example:
             * 123
             */
            OrganizationId;
        } | {
            /**
             * Type of the role
             */
            type: "portal_role";
            /**
             * List of grants (permissions) applied to the role
             */
            grants: Grant[];
            id?: /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            RoleId;
            /**
             * Human-friendly name for the role
             * example:
             * Owner
             */
            name: string;
            /**
             * URL-friendly name for the role
             * example:
             * owner
             */
            slug: string;
            /**
             * date and time then the role will expire
             * example:
             * 2028-07-21T17:32:28Z
             */
            expires_at?: string; // date-time
            organization_id?: /**
             * Id of an organization
             * example:
             * 123
             */
            OrganizationId;
        };
        /**
         * Check if attribute equals to any of the values
         */
        export interface EqualsCondition {
            /**
             * example:
             * workflows.primary.task_name
             */
            attribute: string;
            operation: "equals";
            values: any[];
        }
        /**
         * Error response
         */
        export interface Error {
            /**
             * Error message
             * example:
             * Parent role 123:nonexistent does not exist
             */
            message: string;
        }
        export interface Grant {
            /**
             * example:
             * entity-read
             */
            action: string;
            /**
             * example:
             * entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947
             */
            resource?: string;
            effect?: "allow" | "deny";
            conditions?: /* An additional condition that must be met for the grant */ GrantCondition[];
        }
        /**
         * An additional condition that must be met for the grant
         */
        export type GrantCondition = /* An additional condition that must be met for the grant */ /* Check if attribute equals to any of the values */ EqualsCondition;
        export interface GrantWithDependencies {
            /**
             * example:
             * entity-read
             */
            action: string;
            /**
             * example:
             * entity:123:contact:f7c22299-ca72-4bca-8538-0a88eeefc947
             */
            resource?: string;
            effect?: "allow" | "deny";
            conditions?: /* An additional condition that must be met for the grant */ GrantCondition[];
            /**
             * Provided additional dependencies, exploded when storing the role
             */
            dependencies?: Grant[];
        }
        /**
         * A role attached to an user
         */
        export interface InternalAssignment {
            userId?: /**
             * Id of a user
             * example:
             * 1
             */
            UserId;
            roles?: /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            RoleId[];
        }
        /**
         * All roles attached to an users of an organization
         */
        export interface OrgAssignments {
            organizationId?: /**
             * Id of an organization
             * example:
             * 123
             */
            OrganizationId;
            assignments?: /* A role attached to an user */ InternalAssignment[];
        }
        /**
         * A role automatically applied to all users in an organization.
         */
        export interface OrgRole {
            id: /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            RoleId;
            /**
             * Human-friendly name for the role
             * example:
             * Owner
             */
            name: string;
            /**
             * URL-friendly name for the role
             * example:
             * owner
             */
            slug: string;
            /**
             * Type of the role
             */
            type: "org_role";
            /**
             * date and time then the role will expire
             * example:
             * 2028-07-21T17:32:28Z
             */
            expires_at?: string; // date-time
            organization_id: /**
             * Id of an organization
             * example:
             * 123
             */
            OrganizationId;
            /**
             * List of grants (permissions) applied to the role
             */
            grants: Grant[];
            /**
             * The pricing tier of the organization this root role is based on
             * example:
             * Professional
             */
            pricing_tier?: string;
        }
        /**
         * All roles attached to an users of an organization
         */
        export interface OrgRoles {
            organizationId?: /**
             * Id of an organization
             * example:
             * 123
             */
            OrganizationId;
            roles?: Role[];
        }
        /**
         * Id of an organization
         * example:
         * 123
         */
        export type OrganizationId = string;
        /**
         * A role that appears in another organization's role list that can be assigned but not modified by the partner organization.
         */
        export interface PartnerRole {
            id: /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            RoleId;
            /**
             * Human-friendly name for the role
             * example:
             * Owner
             */
            name: string;
            /**
             * URL-friendly name for the role
             * example:
             * owner
             */
            slug: string;
            /**
             * Type of the role
             */
            type: "partner_role";
            /**
             * date and time then the role will expire
             * example:
             * 2028-07-21T17:32:28Z
             */
            expires_at?: string; // date-time
            organization_id: /**
             * Id of an organization
             * example:
             * 123
             */
            OrganizationId;
            /**
             * List of grants (permissions) applied to the role
             */
            grants: Grant[];
            /**
             * Id of an organization
             * example:
             * 123
             */
            partner_org_id?: string;
        }
        /**
         * A role that is applied to end customers and installers using the Portals
         */
        export interface PortalRole {
            id: /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            RoleId;
            /**
             * Human-friendly name for the role
             * example:
             * Owner
             */
            name: string;
            /**
             * URL-friendly name for the role
             * example:
             * owner
             */
            slug: string;
            /**
             * Type of the role
             */
            type: "portal_role";
            /**
             * date and time then the role will expire
             * example:
             * 2028-07-21T17:32:28Z
             */
            expires_at?: string; // date-time
            organization_id: /**
             * Id of an organization
             * example:
             * 123
             */
            OrganizationId;
            /**
             * List of grants (permissions) applied to the role
             */
            grants: Grant[];
        }
        export type Role = /* A standard user role. Must be explicitly assigned to users. */ UserRole | /* A role automatically applied to all users in an organization. */ OrgRole | /* A role that can be assigned to users in other organizations for sharing purposes. */ ShareRole | /* A role that appears in another organization's role list that can be assigned but not modified by the partner organization. */ PartnerRole | /* A role that is applied to end customers and installers using the Portals */ PortalRole;
        /**
         * Format: <organization_id>:<slug>
         * example:
         * 123:owner
         */
        export type RoleId = string;
        export type RolePayload = {
            grants?: GrantWithDependencies[];
        } & (/* A standard user role. Must be explicitly assigned to users. */ UserRole | /* A role automatically applied to all users in an organization. */ OrgRole | /* A role that can be assigned to users in other organizations for sharing purposes. */ ShareRole | /* A role that appears in another organization's role list that can be assigned but not modified by the partner organization. */ PartnerRole | /* A role that is applied to end customers and installers using the Portals */ PortalRole);
        export interface RoleSearchInput {
            /**
             * List of role ids to filter by
             * example:
             * [
             *   "123:manager",
             *   "456:owner"
             * ]
             */
            role_ids?: /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            RoleId[];
            /**
             * List of organization ids to filter by
             * example:
             * [
             *   "123",
             *   "456"
             * ]
             */
            org_ids?: /**
             * Id of an organization
             * example:
             * 123
             */
            OrganizationId[];
            /**
             * List of role slugs to filter by
             * example:
             * [
             *   "manager",
             *   "owner"
             * ]
             */
            slugs?: /**
             * Slug of a role; for a role with id = 123:manager -> 123 is org_id & manager is slug
             * example:
             * owner
             */
            Slug[];
            /**
             * Input to search across fields
             * example:
             * Administrator
             */
            query?: string;
            /**
             * The Number of roles to return
             * example:
             * 1
             */
            limit?: number;
            /**
             * The number of roles to skip before starting to collect the result set
             * example:
             * 1
             */
            offset?: number;
        }
        /**
         * A role that can be assigned to users in other organizations for sharing purposes.
         */
        export interface ShareRole {
            id: /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            RoleId;
            /**
             * Human-friendly name for the role
             * example:
             * Owner
             */
            name: string;
            /**
             * URL-friendly name for the role
             * example:
             * owner
             */
            slug: string;
            /**
             * Type of the role
             */
            type: "share_role";
            /**
             * date and time then the role will expire
             * example:
             * 2028-07-21T17:32:28Z
             */
            expires_at?: string; // date-time
            organization_id: /**
             * Id of an organization
             * example:
             * 123
             */
            OrganizationId;
            /**
             * List of grants (permissions) applied to the role
             */
            grants: Grant[];
        }
        /**
         * Slug of a role; for a role with id = 123:manager -> 123 is org_id & manager is slug
         * example:
         * owner
         */
        export type Slug = string;
        /**
         * Id of a user
         * example:
         * 1
         */
        export type UserId = string;
        /**
         * A standard user role. Must be explicitly assigned to users.
         */
        export interface UserRole {
            id: /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            RoleId;
            /**
             * Human-friendly name for the role
             * example:
             * Owner
             */
            name: string;
            /**
             * URL-friendly name for the role
             * example:
             * owner
             */
            slug: string;
            /**
             * Type of the role
             */
            type: "user_role";
            /**
             * date and time then the role will expire
             * example:
             * 2028-07-21T17:32:28Z
             */
            expires_at?: string; // date-time
            organization_id: /**
             * Id of an organization
             * example:
             * 123
             */
            OrganizationId;
            /**
             * List of grants (permissions) applied to the role
             */
            grants: Grant[];
            /**
             * Optional parent role that this role inherits from. Must be an `org_role` or `share_role`.
             * example:
             * 123:owner
             */
            parent_role?: string;
        }
    }
}
declare namespace Paths {
    namespace AddAssignment {
        namespace Parameters {
            export type RoleId = /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            Components.Schemas.RoleId;
            export type UserId = /**
             * Id of a user
             * example:
             * 1
             */
            Components.Schemas.UserId;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
            roleId: Parameters.RoleId;
        }
        namespace Responses {
            export type $201 = /* A role attached to an user */ Components.Schemas.Assignment;
        }
    }
    namespace AssignRoles {
        namespace Parameters {
            export type UserId = /**
             * Id of a user
             * example:
             * 1
             */
            Components.Schemas.UserId;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        export type RequestBody = /* List of role ids attached to an user */ Components.Schemas.Assignments;
        namespace Responses {
            export type $200 = /* List of role ids attached to an user */ Components.Schemas.Assignments;
        }
    }
    namespace CreateRole {
        export type RequestBody = Components.Schemas.CreateRolePayload;
        namespace Responses {
            export type $200 = Components.Schemas.Role;
            export type $400 = /* Error response */ Components.Schemas.Error;
            export type $404 = /* Error response */ Components.Schemas.Error;
        }
    }
    namespace DeleteRole {
        namespace Parameters {
            export type RoleId = /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            Components.Schemas.RoleId;
        }
        export interface PathParameters {
            roleId: Parameters.RoleId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Role;
        }
    }
    namespace GetAssignedRolesForUser {
        namespace Parameters {
            export type UserId = /**
             * Id of a user
             * example:
             * 1
             */
            Components.Schemas.UserId;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = /* List of role ids attached to an user */ Components.Schemas.Assignments;
        }
    }
    namespace GetRole {
        namespace Parameters {
            export type RoleId = /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            Components.Schemas.RoleId;
        }
        export interface PathParameters {
            roleId: Parameters.RoleId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Role;
        }
    }
    namespace ListAllAssignments {
        namespace Responses {
            export interface $200 {
                assignments?: /* A role attached to an user */ Components.Schemas.Assignment[];
            }
        }
    }
    namespace ListAllRoles {
        namespace Responses {
            export interface $200 {
                roles?: Components.Schemas.Role[];
            }
        }
    }
    namespace ListCurrentRoles {
        namespace Responses {
            export interface $200 {
                roles?: Components.Schemas.Role[];
            }
        }
    }
    namespace PutRole {
        namespace Parameters {
            export type RoleId = /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            Components.Schemas.RoleId;
        }
        export interface PathParameters {
            roleId: Parameters.RoleId;
        }
        export type RequestBody = Components.Schemas.RolePayload;
        namespace Responses {
            export type $200 = Components.Schemas.Role;
            export type $400 = /* Error response */ Components.Schemas.Error;
            export type $404 = /* Error response */ Components.Schemas.Error;
        }
    }
    namespace RefreshPermissions {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace RemoveAssignment {
        namespace Parameters {
            export type RoleId = /**
             * Format: <organization_id>:<slug>
             * example:
             * 123:owner
             */
            Components.Schemas.RoleId;
            export type UserId = /**
             * Id of a user
             * example:
             * 1
             */
            Components.Schemas.UserId;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
            roleId: Parameters.RoleId;
        }
        namespace Responses {
            export type $200 = /* A role attached to an user */ Components.Schemas.Assignment;
        }
    }
    namespace SearchRoles {
        export type RequestBody = Components.Schemas.RoleSearchInput;
        namespace Responses {
            export interface $200 {
                hits?: number;
                results?: Components.Schemas.Role[];
            }
        }
    }
}

export interface OperationMethods {
  /**
   * listCurrentRoles - listCurrentRoles
   * 
   * Returns roles and grants assigned to current user
   */
  'listCurrentRoles'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListCurrentRoles.Responses.$200>
  /**
   * listAllRoles - listAllRoles
   * 
   * Returns list of all roles in organization
   */
  'listAllRoles'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListAllRoles.Responses.$200>
  /**
   * createRole - createRole
   * 
   * Create role
   */
  'createRole'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateRole.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateRole.Responses.$200>
  /**
   * searchRoles - searchRoles
   * 
   * Search Roles
   */
  'searchRoles'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchRoles.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchRoles.Responses.$200>
  /**
   * getRole - getRole
   * 
   * Get role by id
   */
  'getRole'(
    parameters?: Parameters<Paths.GetRole.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRole.Responses.$200>
  /**
   * putRole - putRole
   * 
   * Create or update role
   */
  'putRole'(
    parameters?: Parameters<Paths.PutRole.PathParameters> | null,
    data?: Paths.PutRole.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutRole.Responses.$200>
  /**
   * deleteRole - deleteRole
   * 
   * Delete role by id
   */
  'deleteRole'(
    parameters?: Parameters<Paths.DeleteRole.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteRole.Responses.$200>
  /**
   * refreshPermissions - refreshPermissions
   * 
   * Makes sure the user has a role in the organization
   */
  'refreshPermissions'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RefreshPermissions.Responses.$200>
  /**
   * getAssignedRolesForUser - getAssignedRolesForUser
   * 
   * Get list of assigned roles by user id
   */
  'getAssignedRolesForUser'(
    parameters?: Parameters<Paths.GetAssignedRolesForUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAssignedRolesForUser.Responses.$200>
  /**
   * assignRoles - assignRoles
   * 
   * Assign / unassign roles to users.
   */
  'assignRoles'(
    parameters?: Parameters<Paths.AssignRoles.PathParameters> | null,
    data?: Paths.AssignRoles.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AssignRoles.Responses.$200>
  /**
   * addAssignment - addAssignment
   * 
   * Assign a user to a role.
   * 
   * Use the `x-epilot-org-id` header to assign share roles to users in other orgs
   * 
   */
  'addAssignment'(
    parameters?: Parameters<Paths.AddAssignment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddAssignment.Responses.$201>
  /**
   * removeAssignment - removeAssignment
   * 
   * Remove role assignment from user
   */
  'removeAssignment'(
    parameters?: Parameters<Paths.RemoveAssignment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RemoveAssignment.Responses.$200>
  /**
   * listAllAssignments - listAllAssignments
   * 
   * Returns list of all assignments in organization
   */
  'listAllAssignments'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListAllAssignments.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/permissions/me']: {
    /**
     * listCurrentRoles - listCurrentRoles
     * 
     * Returns roles and grants assigned to current user
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListCurrentRoles.Responses.$200>
  }
  ['/v1/permissions/roles']: {
    /**
     * listAllRoles - listAllRoles
     * 
     * Returns list of all roles in organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListAllRoles.Responses.$200>
    /**
     * createRole - createRole
     * 
     * Create role
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateRole.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateRole.Responses.$200>
  }
  ['/v1/permissions/roles:search']: {
    /**
     * searchRoles - searchRoles
     * 
     * Search Roles
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchRoles.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchRoles.Responses.$200>
  }
  ['/v1/permissions/roles/{roleId}']: {
    /**
     * getRole - getRole
     * 
     * Get role by id
     */
    'get'(
      parameters?: Parameters<Paths.GetRole.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRole.Responses.$200>
    /**
     * putRole - putRole
     * 
     * Create or update role
     */
    'put'(
      parameters?: Parameters<Paths.PutRole.PathParameters> | null,
      data?: Paths.PutRole.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutRole.Responses.$200>
    /**
     * deleteRole - deleteRole
     * 
     * Delete role by id
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteRole.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteRole.Responses.$200>
  }
  ['/v1/permissions/refresh']: {
    /**
     * refreshPermissions - refreshPermissions
     * 
     * Makes sure the user has a role in the organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RefreshPermissions.Responses.$200>
  }
  ['/v1/permissions/assignments/{userId}']: {
    /**
     * getAssignedRolesForUser - getAssignedRolesForUser
     * 
     * Get list of assigned roles by user id
     */
    'get'(
      parameters?: Parameters<Paths.GetAssignedRolesForUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAssignedRolesForUser.Responses.$200>
    /**
     * assignRoles - assignRoles
     * 
     * Assign / unassign roles to users.
     */
    'put'(
      parameters?: Parameters<Paths.AssignRoles.PathParameters> | null,
      data?: Paths.AssignRoles.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AssignRoles.Responses.$200>
  }
  ['/v1/permissions/assignments/{userId}/{roleId}']: {
    /**
     * addAssignment - addAssignment
     * 
     * Assign a user to a role.
     * 
     * Use the `x-epilot-org-id` header to assign share roles to users in other orgs
     * 
     */
    'post'(
      parameters?: Parameters<Paths.AddAssignment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddAssignment.Responses.$201>
    /**
     * removeAssignment - removeAssignment
     * 
     * Remove role assignment from user
     */
    'delete'(
      parameters?: Parameters<Paths.RemoveAssignment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RemoveAssignment.Responses.$200>
  }
  ['/v1/permissions/assignments']: {
    /**
     * listAllAssignments - listAllAssignments
     * 
     * Returns list of all assignments in organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListAllAssignments.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type Assignment = Components.Schemas.Assignment;
export type Assignments = Components.Schemas.Assignments;
export type BaseRole = Components.Schemas.BaseRole;
export type BaseRoleForCreate = Components.Schemas.BaseRoleForCreate;
export type CreateRolePayload = Components.Schemas.CreateRolePayload;
export type EqualsCondition = Components.Schemas.EqualsCondition;
export type Error = Components.Schemas.Error;
export type Grant = Components.Schemas.Grant;
export type GrantCondition = Components.Schemas.GrantCondition;
export type GrantWithDependencies = Components.Schemas.GrantWithDependencies;
export type InternalAssignment = Components.Schemas.InternalAssignment;
export type OrgAssignments = Components.Schemas.OrgAssignments;
export type OrgRole = Components.Schemas.OrgRole;
export type OrgRoles = Components.Schemas.OrgRoles;
export type OrganizationId = Components.Schemas.OrganizationId;
export type PartnerRole = Components.Schemas.PartnerRole;
export type PortalRole = Components.Schemas.PortalRole;
export type Role = Components.Schemas.Role;
export type RoleId = Components.Schemas.RoleId;
export type RolePayload = Components.Schemas.RolePayload;
export type RoleSearchInput = Components.Schemas.RoleSearchInput;
export type ShareRole = Components.Schemas.ShareRole;
export type Slug = Components.Schemas.Slug;
export type UserId = Components.Schemas.UserId;
export type UserRole = Components.Schemas.UserRole;
