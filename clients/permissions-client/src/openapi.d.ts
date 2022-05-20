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
        export interface Assignment {
            user_id?: /**
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
             * example:
             * 123
             */
            OrganizationId;
            /**
             * List of grants (permissions) applied to the role
             */
            grants: Grant[];
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
        }
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
            /**
             * Provided additional dependencies, exploded when storing the role
             */
            dependencies?: Grant[];
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
             * example:
             * 123
             */
            OrganizationId;
            /**
             * List of grants (permissions) applied to the role
             */
            grants: Grant[];
            /**
             * Partner organization who can assign this role to their users.
             * example:
             * 123
             */
            partner_org_id?: string;
        }
        export type Role = /* A standard user role. Must be explicitly assigned to users. */ UserRole | /* A role automatically applied to all users in an organization. */ OrgRole | /* A role that can be assigned to users in other organizations for sharing purposes. */ ShareRole | /* A role that appears in another organization's role list that can be assigned but not modified by the partner organization. */ PartnerRole;
        /**
         * Format: <organization_id>:<slug>
         * example:
         * 123:owner
         */
        export type RoleId = string;
        export type RolePayload = {
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
             * example:
             * 123
             */
            OrganizationId;
            /**
             * List of grants (permissions) applied to the role
             */
            grants: GrantWithDependencies[];
        } | {
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
             * example:
             * 123
             */
            OrganizationId;
            /**
             * List of grants (permissions) applied to the role
             */
            grants: GrantWithDependencies[];
        } | {
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
             * example:
             * 123
             */
            OrganizationId;
            /**
             * List of grants (permissions) applied to the role
             */
            grants: GrantWithDependencies[];
        } | {
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
             * example:
             * 123
             */
            OrganizationId;
            /**
             * List of grants (permissions) applied to the role
             */
            grants: GrantWithDependencies[];
            /**
             * Partner organization who can assign this role to their users.
             * example:
             * 123
             */
            partner_org_id?: string;
        };
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
             * example:
             * 123
             */
            OrganizationId;
            /**
             * List of grants (permissions) applied to the role
             */
            grants: Grant[];
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
            export type $201 = Components.Schemas.Assignment;
        }
    }
    namespace AssignRoles {
        namespace Parameters {
            export type UserId = /**
             * example:
             * 1
             */
            Components.Schemas.UserId;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        export type RequestBody = Components.Schemas.Assignments;
        namespace Responses {
            export type $200 = Components.Schemas.Assignments;
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
             * example:
             * 1
             */
            Components.Schemas.UserId;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Assignments;
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
                assignments?: Components.Schemas.Assignment[];
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
            export type $200 = Components.Schemas.Assignment;
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
