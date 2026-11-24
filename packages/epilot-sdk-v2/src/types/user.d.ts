/* Auto-copied from user-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Schemas {
        export interface CognitoDetails {
            /**
             * example:
             * eu-central-1
             */
            cognito_region?: string;
            /**
             * example:
             * eu-central-sample
             */
            cognito_user_pool_id?: string;
            /**
             * example:
             * asbkh213ehkquwhdi
             */
            cognito_user_pool_client_id?: string;
            /**
             * example:
             * arn:aws:cognito-idp:eu-central-1:123456789012:userpool/eu-central-sample
             */
            cognito_user_pool_arn?: string;
        }
        export interface CreateGroupReq {
            /**
             * The name of the group. Could be a department or a team.
             * example:
             * Finance
             */
            name: string;
            /**
             * The list of user ids in the group.
             * example:
             * [
             *   "123",
             *   "456"
             * ]
             */
            user_ids?: /* User's unique identifier */ UserId[];
            image_uri?: /**
             * Group's profile image or gradient colors. Supports uploaded image URLs and generated gradient avatars.
             * example:
             * {
             *   "gradient_colors": [
             *     "#0588f0",
             *     "#3358d4"
             *   ]
             * }
             */
            GroupImageUri;
            /**
             * A short abbreviation for the group, up to 2 characters.
             * example:
             * FN
             */
            abbreviation?: string | null;
        }
        export interface DataPoint {
            /**
             * Organization id
             * example:
             * 206801
             */
            id?: number;
            /**
             * Number of current user
             * example:
             * 10
             */
            actual_users?: number;
            /**
             * Users billed for last month: active users created before its end, users deleted during it (except users
             * already deactivated before it started and not reactivated since), and users deactivated during or after it
             * (a user deactivated during a month is billed for that month).
             *
             * example:
             * 10
             */
            max_users_last_month?: number;
            /**
             * Users tagged `non-billable` among `max_users_last_month` (excluding deleted users)
             * example:
             * 10
             */
            non_billable_users_last_month?: number;
            /**
             * Users deactivated during or after last month. Already included in `max_users_last_month`.
             * example:
             * 1
             */
            deactivated_users_last_month?: number;
            /**
             * Users currently deactivated (seat free from the next billing month on)
             * example:
             * 2
             */
            deactivated_users?: number;
            /**
             * Free users included in the org's pricing tier (org override first, else tier default), null if unknown
             * example:
             * 25
             */
            free_user_quota?: number | null;
            /**
             * Where free_user_quota comes from, null if unknown
             * example:
             * tier
             */
            free_user_quota_source?: "override" | "tier" | null;
        }
        export type DataPointsResponse = DataPoint[];
        export interface Group {
            id: /* Group unique identifier */ GroupId;
            org_id: OrganizationId;
            /**
             * The name of the group. Could be a department or a team.
             * example:
             * Finance
             */
            name: string;
            /**
             * example:
             * 2024-02-08T04:44:32.246Z
             */
            created_at: string;
            /**
             * example:
             * 2024-02-08T04:44:32.246Z
             */
            updated_at: string;
            /**
             * The user id of the user that created the group.
             * example:
             * 123
             */
            created_by?: string;
            /**
             * The current user assignee of the group. This is the user, from within the group, that has last been assigned to a workflow task.
             */
            crt_assignee?: {
                /**
                 * Only in getMeV2, when the caller is not a person's own login. With an AI agent token
                 * (`type: agent`) the response is the user the agent acts on behalf of; with an API token
                 * (`type: api_token`) it is a stand-in for the token itself (`id` = token id, `display_name` =
                 * token name, no personal data). UIs show who is really acting from this.
                 *
                 */
                actor?: {
                    type: "agent" | "api_token";
                    /**
                     * Id of the access token making the request
                     */
                    token_id?: string;
                    token_name?: string;
                    /**
                     * Agent Auth agent id (agent only)
                     */
                    agent_id?: string;
                    /**
                     * Self-declared agent name (agent only); show it as an AI agent, never as a person
                     */
                    agent_name?: string;
                    /**
                     * Host the agent runs on, e.g. `epilot MCP (Claude)` (agent only)
                     */
                    host_name?: string;
                    /**
                     * Self-declared client kind, e.g. `epilot-mcp` (agent only)
                     */
                    client?: string;
                };
                id?: /* User's unique identifier */ UserId;
                organization_id?: OrganizationId;
                created_at?: string; // date-time
                activated_at?: string; // date-time
                /**
                 * User's display name (default: email address)
                 * example:
                 * Example User
                 */
                display_name?: string;
                /**
                 * `Deactivated` users can't log in and free their seat from the next billing month on (a user
                 * deactivated during a month is billed for that month). Only `Active` users can be deactivated, and
                 * only by someone else with `user:edit`; reactivation (`Deactivated` → `Active`) is possible at any time.
                 *
                 */
                status?: "Active" | "Pending" | "Deactivated" | "Deleted";
                /**
                 * When the user was deactivated. Set by the API while the user is `Deactivated`.
                 */
                deactivated_at?: string; // date-time
                /**
                 * Id of the user who deactivated this user.
                 */
                deactivated_by?: string;
                /**
                 * User's email address
                 */
                email?: string; // email
                /**
                 * User's pending email address
                 */
                draft_email?: string | null; // email
                /**
                 * Server-set expiry for the pending email change verification link (ISO 8601). Read-only.
                 */
                draft_email_expires_at?: string | null; // date-time
                /**
                 * Internal: sha256 hash of the active password-reset token. Server-set, never returned in responses.
                 */
                password_reset_token_hash?: string | null;
                /**
                 * Internal: expiry for the active password-reset token (ISO 8601). Server-set, never returned in responses.
                 */
                password_reset_token_expires_at?: string | null; // date-time
                /**
                 * When true the user may only sign in through the organization's SSO identity provider. Local
                 * password, epilot MFA, passkey, e-mail login link and password reset are rejected for this user.
                 * Leave unset for break-glass and external accounts that must keep signing in locally.
                 * Can only be changed by callers with `user:edit`; a user cannot change it on their own record.
                 *
                 */
                sso_required?: boolean;
                /**
                 * User's department
                 * example:
                 * Sales
                 */
                department?: string | null;
                /**
                 * User's phone number
                 * example:
                 * 1234567890
                 */
                phone?: string | null;
                /**
                 * User's secondary phone number, preferred for communication
                 * example:
                 * 1234567890
                 */
                secondary_phone?: string | null;
                /**
                 * User's multi-factor authentication status
                 * example:
                 * false
                 */
                mfa_enabled?: boolean;
                /**
                 * Whether the user has TOTP (authenticator app) MFA enabled
                 * example:
                 * false
                 */
                totp_enabled?: boolean;
                /**
                 * Whether the user has any registered passkeys
                 * example:
                 * false
                 */
                has_passkeys?: boolean;
                /**
                 * User's phone number verification status
                 * example:
                 * true
                 */
                phone_verified?: boolean;
                token?: /* Token used to invite a user to epilot */ InviteToken;
                /**
                 * User's email signature
                 * example:
                 * <p>Thanks</p>
                 */
                signature?: string | null;
                /**
                 * Whether the user's signature is enabled
                 * example:
                 * true
                 */
                is_signature_enabled?: boolean | null;
                /**
                 * User's preferred language
                 * example:
                 * de
                 */
                preferred_language?: string;
                /**
                 * User's start page after login
                 */
                custom_start_page?: string | null; // ^/app/*
                custom_navigation?: /**
                 * Navigation unique identifier - a hash of the normalized navigation payload (name + configuration). Identical navigations across orgs will have the same ID.
                 * example:
                 * 5gbe4nkp6jsfq
                 */
                NavigationId;
                /**
                 * This field is used to override the release channel for the user.
                 */
                override_release_channel?: "canary" | "rc" | "stable" | null;
                /**
                 * User's feature preferences
                 * example:
                 * {
                 *   "feature_name": true
                 * }
                 */
                feature_preferences?: {
                    [name: string]: any;
                } | null;
                /**
                 * User's custom profile image
                 * example:
                 * {
                 *   "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
                 *   "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
                 * }
                 */
                image_uri?: {
                    [name: string]: any;
                    original?: string; // uri
                    thumbnail_32?: string; // uri
                } | null;
                /**
                 * example:
                 * {
                 *   "entity_views": {
                 *     "opportunity": "891a5409850abf8b92bd2cb7bdd2844d32ce6bec",
                 *     "order": "628aee91-7c2f-4047-ab0d-433582a19c49"
                 *   },
                 *   "dashboard": "751ff121-9ac2-4511-a2e6-851f11287380"
                 * }
                 */
                favorites?: {
                    [name: string]: any;
                };
                /**
                 * example:
                 * {
                 *   "added_participant_opportunity": true,
                 *   "assigned_opportunity": true,
                 *   "assigned_task": true,
                 *   "comment_opportunity": true,
                 *   "deleted_task": true,
                 *   "escalated_task": true,
                 *   "message_receive_opportunity": true,
                 *   "message_send_opportunity": true,
                 *   "created_task": true,
                 *   "created_opportunity_manual": true,
                 *   "created_opportunity_auto": true,
                 *   "deleted_opportunity": true
                 * }
                 */
                email_notification_setting?: {
                    [name: string]: any;
                };
                /**
                 * Per-notification-type in-app delivery preferences (notification type key -> enabled). Written by the my-account notification settings UI and honored by svc-notification-api at delivery time. Absent or partial keys fall back to each notification type's configured default. Mirrors email_notification_setting for the in-app channel.
                 * example:
                 * {
                 *   "integration_critical_error": true,
                 *   "integration_error_threshold": true,
                 *   "assigned_opportunity": true,
                 *   "assigned_task": true
                 * }
                 */
                in_app_notification_setting?: {
                    [name: string]: any;
                };
                /**
                 * Whether new in-app notifications pop up on screen (top-right toasts in the 360 app) in addition to the bell counter. Written by the my-account notification settings UI and honored by the topbar. Absent or null means enabled; only `false` turns the popups off. Only has an effect while the org has the `on-screen-notifications` feature flag.
                 * example:
                 * false
                 */
                in_app_notification_popups?: boolean | null;
                properties?: {
                    /**
                     * example:
                     * profileImageName
                     */
                    name: string;
                    /**
                     * example:
                     * avatar.png
                     */
                    value: string;
                }[];
                /**
                 * User tags/labels assigned for classification (e.g. label slugs)
                 * example:
                 * [
                 *   "non-billable"
                 * ]
                 */
                tags?: string[] | null;
                /**
                 * The index of the current assignee in the group's user list.
                 * example:
                 * 3
                 */
                crt_index?: number;
            };
            /**
             * The list of users in the group. Only contains the full user when respective endpoint is called with a flag. Otherwise only contains the user id.
             */
            users?: UserV2[];
            image_uri?: /**
             * Group's profile image or gradient colors. Supports uploaded image URLs and generated gradient avatars.
             * example:
             * {
             *   "gradient_colors": [
             *     "#0588f0",
             *     "#3358d4"
             *   ]
             * }
             */
            GroupImageUri;
            /**
             * A short abbreviation for the group, up to 2 characters.
             * example:
             * FN
             */
            abbreviation?: string | null;
        }
        /**
         * Group unique identifier
         */
        export type GroupId = string;
        /**
         * Group's profile image or gradient colors. Supports uploaded image URLs and generated gradient avatars.
         * example:
         * {
         *   "gradient_colors": [
         *     "#0588f0",
         *     "#3358d4"
         *   ]
         * }
         */
        export type GroupImageUri = {
            [name: string]: any;
            /**
             * example:
             * https://account-profile-images.epilot.cloud/org/group-avatar.png
             */
            original?: string; // uri
            /**
             * example:
             * https://account-profile-images.epilot.cloud/org/group-avatar_32x32.png
             */
            thumbnail_32?: string; // uri
            /**
             * example:
             * https://account-profile-images.epilot.cloud/org/group-avatar_64x64.png
             */
            thumbnail_64?: string; // uri
            /**
             * Two hex color strings [base_color, accent_color] for mesh gradient avatar.
             * example:
             * [
             *   "#0588f0",
             *   "#3358d4"
             * ]
             */
            gradient_colors?: [
                string,
                string
            ];
        } | null;
        export type Hydrate = boolean;
        /**
         * Token used to invite a user to epilot
         */
        export type InviteToken = string;
        export type Limit = number;
        export interface LoginAsAuditEvent {
            /**
             * example:
             * 01JB2Z3Q4R5S6T7V8W9XAYBZC0
             */
            id: string;
            created_at: string; // date-time
            /**
             * epilot staff member who logged in as the user
             * example:
             * admin@epilot.cloud
             */
            admin_email?: string;
            /**
             * Impersonated user
             * example:
             * customer@example.com
             */
            user_email?: string;
            user_id?: string;
            purpose?: {
                /**
                 * example:
                 * CUSTOMER_SUPPORT
                 */
                name?: string;
                /**
                 * example:
                 * Incident #144 Cleanup: Fixing corrupted entities for customer.
                 */
                description?: string;
            };
        }
        /**
         * Internal-only page of "login as" audit events, newest first.
         */
        export interface LoginAsAuditPage {
            /**
             * example:
             * 739224
             */
            org_id: string;
            events: LoginAsAuditEvent[];
            /**
             * Pass as `cursor` to get the next page. Absent on the last page.
             * example:
             * 01JB2Z3Q4R5S6T7V8W9XAYBZC0
             */
            next_cursor?: string;
        }
        export interface LoginParameters {
            /**
             * example:
             * 123
             */
            organization_id?: string;
            /**
             * example:
             * epilot GmbH
             */
            organization_name?: string;
            /**
             * example:
             * Vendor
             */
            organization_type?: string;
            /**
             * How the organization is used. One of `Production`, `Sandbox` or `Preview`
             * (a temporary copy of a Production org for reviewing configuration changes).
             *
             * example:
             * Production
             */
            organization_use?: string;
            /**
             * For a Sandbox or Preview org, the id of its Production parent (its brand);
             * null/absent for Production orgs. Lets the org switcher group a
             * sandbox or preview under its brand without relying on list order.
             *
             * example:
             * 123
             */
            parent_production_org_id?: string | null;
            /**
             * Whether this is the user's primary organization (the one they signed up with or were moved to).
             * The primary organization can't be left.
             *
             */
            is_primary_org?: boolean;
            /**
             * example:
             * eu-central-1
             */
            cognito_region?: string;
            /**
             * example:
             * eu-central-sample
             */
            cognito_user_pool_id?: string;
            /**
             * example:
             * asbkh213ehkquwhdi
             */
            cognito_user_pool_client_id?: string;
            /**
             * example:
             * epilot-org-123
             */
            cognito_oauth_domain?: string;
            /**
             * example:
             * [
             *   "openid"
             * ]
             */
            cognito_oauth_scopes?: string[];
            oauth_response_type?: "code" | "token";
            /**
             * Whether passkey login is enabled for this organization
             */
            passkey_enabled?: boolean;
            /**
             * Whether the user has at least one passkey registered. Lets the login
             * UI offer passkey authentication as an alternative to an MFA code.
             * Discloses nothing that :beginPasskeyAuthentication doesn't already
             * reveal for a known email address.
             *
             */
            passkeys_registered?: boolean;
        }
        /**
         * A customized workplace navigation configuration. The ID is a content-hash, so identical configurations will have the same ID.
         */
        export interface Navigation {
            id: /**
             * Navigation unique identifier - a hash of the normalized navigation payload (name + configuration). Identical navigations across orgs will have the same ID.
             * example:
             * 5gbe4nkp6jsfq
             */
            NavigationId;
            /**
             * Human-readable name for the navigation configuration
             * example:
             * Sales Team Navigation
             */
            name: string;
            configuration: /**
             * Navigation configuration organized by sections. Each section contains an array of navigation items.
             *
             * example:
             * {
             *   "customer_relations": [
             *     {
             *       "key": "dashboard"
             *     },
             *     {
             *       "key": "contact"
             *     }
             *   ],
             *   "configurations": [
             *     {
             *       "name": "Product Catalog",
             *       "subItems": [
             *         {
             *           "key": "product"
             *         },
             *         {
             *           "key": "price"
             *         }
             *       ]
             *     },
             *     {
             *       "key": "journey"
             *     }
             *   ]
             * }
             */
            NavigationConfiguration;
        }
        /**
         * Navigation configuration organized by sections. Each section contains an array of navigation items.
         *
         * example:
         * {
         *   "customer_relations": [
         *     {
         *       "key": "dashboard"
         *     },
         *     {
         *       "key": "contact"
         *     }
         *   ],
         *   "configurations": [
         *     {
         *       "name": "Product Catalog",
         *       "subItems": [
         *         {
         *           "key": "product"
         *         },
         *         {
         *           "key": "price"
         *         }
         *       ]
         *     },
         *     {
         *       "key": "journey"
         *     }
         *   ]
         * }
         */
        export interface NavigationConfiguration {
            [name: string]: /* A navigation item - either a simple key item or a group with sub-items */ NavigationItem[];
        }
        /**
         * Request payload to create a new navigation configuration
         */
        export interface NavigationCreateRequest {
            /**
             * Human-readable name for the navigation configuration
             * example:
             * Sales Team Navigation
             */
            name: string;
            configuration: /**
             * Navigation configuration organized by sections. Each section contains an array of navigation items.
             *
             * example:
             * {
             *   "customer_relations": [
             *     {
             *       "key": "dashboard"
             *     },
             *     {
             *       "key": "contact"
             *     }
             *   ],
             *   "configurations": [
             *     {
             *       "name": "Product Catalog",
             *       "subItems": [
             *         {
             *           "key": "product"
             *         },
             *         {
             *           "key": "price"
             *         }
             *       ]
             *     },
             *     {
             *       "key": "journey"
             *     }
             *   ]
             * }
             */
            NavigationConfiguration;
        }
        /**
         * A navigation group containing sub-items
         */
        export interface NavigationGroupItem {
            /**
             * The display name of the navigation group
             * example:
             * Product Catalog
             */
            name: string;
            /**
             * The list of navigation items within this group
             */
            subItems: /* A simple navigation item with a key */ NavigationKeyItem[];
        }
        /**
         * Navigation unique identifier - a hash of the normalized navigation payload (name + configuration). Identical navigations across orgs will have the same ID.
         * example:
         * 5gbe4nkp6jsfq
         */
        export type NavigationId = string | null;
        /**
         * A navigation item - either a simple key item or a group with sub-items
         */
        export type NavigationItem = /* A navigation item - either a simple key item or a group with sub-items */ /* A simple navigation item with a key */ NavigationKeyItem | /* A navigation group containing sub-items */ NavigationGroupItem;
        /**
         * A simple navigation item with a key
         */
        export interface NavigationKeyItem {
            /**
             * The unique key identifier for the navigation item
             * example:
             * dashboard
             */
            key: string;
        }
        export type Offset = number;
        /**
         * Internal-only activity overview of an organization
         */
        export interface OrgActivity {
            /**
             * example:
             * 739224
             */
            org_id: string;
            /**
             * example:
             * 2026-09-24T10:00:00.000Z
             */
            generated_at: string; // date-time
            granularity: "day" | "week" | "month";
            /**
             * Resolved start day (inclusive)
             * example:
             * 2026-03-30
             */
            from: string; // date
            /**
             * Resolved end day (inclusive)
             * example:
             * 2026-09-24
             */
            to: string; // date
            summary: /* Internal-only activity counters of an organization. Windows are calendar days in Europe/Berlin ending today. */ OrgActivitySummary;
            /**
             * Distinct active users per period, one entry per period (missing periods filled with 0)
             */
            series: {
                /**
                 * First day of the period (Monday for weeks, 1st for months)
                 * example:
                 * 2026-09-21
                 */
                period_start: string; // date
                /**
                 * example:
                 * 42
                 */
                active_users: number;
            }[];
            /**
             * Most active users within from..to, ordered by active days desc, last seen desc
             */
            top_users: {
                /**
                 * example:
                 * 10001
                 */
                user_id: string;
                name: string | null;
                email: string | null;
                /**
                 * example:
                 * 21
                 */
                active_days: number;
                last_seen_at: string | null; // date-time
            }[];
            /**
             * Active members without activity in the last 30 days (max 100)
             */
            attention: {
                /**
                 * example:
                 * 10002
                 */
                user_id: string;
                name: string | null;
                email: string | null;
                /**
                 * example:
                 * Active
                 */
                status: string | null;
                created_at: string | null; // date-time
                last_login_at: string | null; // date-time
                last_seen_at: string | null; // date-time
                reason: "dormant" | "never_seen";
            }[];
        }
        /**
         * Internal-only average active users by weekday and hour (Europe/Berlin). Only non-zero cells are included.
         */
        export interface OrgActivityByHour {
            /**
             * example:
             * 739224
             */
            org_id: string;
            /**
             * example:
             * 2026-08-27
             */
            from: string; // date
            /**
             * example:
             * 2026-09-23
             */
            to: string; // date
            cells: {
                /**
                 * ISO weekday (1 = Monday ... 7 = Sunday)
                 */
                weekday: number;
                hour: number;
                /**
                 * Average distinct active users, rounded to 1 decimal
                 * example:
                 * 3.5
                 */
                avg_active_users: number;
            }[];
        }
        /**
         * Internal-only daily activity heatmap. Only days with value > 0 are included.
         */
        export interface OrgActivityHeatmap {
            /**
             * example:
             * 739224
             */
            org_id: string;
            /**
             * example:
             */
            user_id: string | null;
            /**
             * example:
             * 2025-09-25
             */
            from: string; // date
            /**
             * example:
             * 2026-09-24
             */
            to: string; // date
            days: {
                /**
                 * example:
                 * 2026-09-23
                 */
                day: string; // date
                /**
                 * Distinct active users (org) or 1 = active (single user)
                 * example:
                 * 12
                 */
                value: number;
            }[];
        }
        /**
         * Internal-only activity counters of an organization. Windows are calendar days in Europe/Berlin ending today.
         */
        export interface OrgActivitySummary {
            /**
             * Active (non-deleted) members of the organization
             */
            members: number;
            /**
             * Active (non-deleted) members without the `non-billable` tag
             */
            billable_members: number;
            /**
             * Temporarily deactivated (non-deleted) members. They hold no seat and are not part of `members`.
             */
            deactivated_members?: number;
            /**
             * Seats included in the org's pricing tier (free user quota; the org override wins over the tier default), null if unknown
             * example:
             * 25
             */
            included_seats: number | null;
            /**
             * Where included_seats comes from (org-specific pricing tier override or the tier default), null if unknown
             * example:
             * tier
             */
            included_seats_source: "override" | "tier" | null;
            /**
             * Seats activation is measured against, max(included_seats, billable_members). Null only if both are unknown.
             * example:
             * 30
             */
            seats: number | null;
            /**
             * Deprecated: alias of `seats`, will be removed. Use `seats`.
             * example:
             * 30
             */
            paid_seats: number | null;
            /**
             * active_30d / seats (3 decimals), null without seats. Not clamped, can exceed 1.
             * example:
             * 0.72
             */
            activation_rate_30d: number | null;
            /**
             * active_30d / members (3 decimals), null without members
             * example:
             * 0.64
             */
            member_activation_rate_30d: number | null;
            /**
             * Users seen within the last 15 minutes
             */
            active_now: number;
            active_today: number;
            /**
             * Distinct active users in the last 7 days (incl. today)
             */
            active_7d: number;
            /**
             * Distinct active users in the 7 days before that
             */
            active_prev_7d: number;
            /**
             * Distinct active users in the last 30 days (incl. today)
             */
            active_30d: number;
            /**
             * Distinct active users in the 30 days before that
             */
            active_prev_30d: number;
            /**
             * Members whose last activity is older than 30 days
             */
            dormant_30d: number;
            /**
             * Members without any recorded activity
             */
            never_seen: number;
        }
        export interface Organization {
            id?: OrganizationId;
            type?: "Vendor" | "Partner";
            /**
             * example:
             * Epilot
             */
            name?: string | null;
            /**
             * example:
             * <p>Thanks</p>
             */
            signature?: string | null;
            /**
             * example:
             * EPI
             */
            symbol?: string | null;
            /**
             * example:
             * professional
             */
            pricing_tier?: string | null;
            /**
             * example:
             * someone@epilot.cloud
             */
            email?: string | null;
            /**
             * example:
             * 49123123123
             */
            phone?: string | null;
            /**
             * example:
             * https://epilot.cloud
             */
            website?: string | null;
            address?: {
                country?: string | null;
                city?: string | null;
                postal_code?: string | null;
                street?: string | null;
                street_number?: string | null;
            };
            /**
             * example:
             * https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png
             */
            logo_url?: string | null;
            /**
             * example:
             * https://epilot-playground-organization-data.s3.eu-central-1.amazonaws.com/epilot-logo.png
             */
            logo_thumbnail_url?: string | null;
            /**
             * example:
             * false
             */
            is_unlicensed_org?: boolean | null;
            cognito_details?: CognitoDetails;
        }
        export interface OrganizationDetail {
            [name: string]: any;
            type: "Vendor" | "Partner";
            /**
             * example:
             * Epilot
             */
            name: string;
            /**
             * example:
             * professional
             */
            pricing_tier: string;
            email: string;
            phone?: string;
            website?: string;
            /**
             * example:
             * false
             */
            is_privacy_policy_checked?: boolean | null;
            /**
             * example:
             * false
             */
            is_terms_and_conditions_checked?: boolean | null;
        }
        export type OrganizationId = string;
        /**
         * Token used to invite a partner user to epilot
         */
        export type PartnerInvitationToken = string;
        export interface Passkey {
            /**
             * Base64url-encoded credential ID
             */
            credential_id?: string;
            /**
             * example:
             * My Laptop
             */
            friendly_name?: string;
            created_at?: string; // date-time
            transports?: string[];
            aaguid?: string;
        }
        export interface PasskeyAuthenticationOptions {
            /**
             * WebAuthn PublicKeyCredentialRequestOptions
             */
            options?: {
                [key: string]: any;
            };
            /**
             * Signed JWT containing the challenge
             */
            challenge_token?: string;
        }
        export interface PasskeyRegistrationOptions {
            /**
             * WebAuthn PublicKeyCredentialCreationOptions
             */
            options?: {
                [key: string]: any;
            };
            /**
             * Signed JWT containing the challenge
             */
            challenge_token?: string;
        }
        export interface PasskeyRegistrationResponse {
            /**
             * The challenge token from registerBegin
             */
            challenge_token: string;
            /**
             * WebAuthn AuthenticatorAttestationResponse
             */
            registration_response: {
                [key: string]: any;
            };
            /**
             * example:
             * My Laptop
             */
            friendly_name?: string;
        }
        /**
         * Internal-only platform-wide activity summary
         */
        export interface PlatformActivitySummary {
            generated_at: string; // date-time
            granularity: "day" | "week" | "month";
            from: string; // date
            to: string; // date
            summary: {
                /**
                 * Distinct active users today (Europe/Berlin)
                 */
                dau: number;
                /**
                 * Distinct active users yesterday
                 */
                dau_prev: number;
                /**
                 * Distinct active users in the last 7 days (incl. today)
                 */
                wau: number;
                wau_prev: number;
                /**
                 * Distinct active users in the last 30 days (incl. today)
                 */
                mau: number;
                mau_prev: number;
                /**
                 * Users seen within the last 15 minutes
                 */
                active_now: number;
                /**
                 * Organizations with at least one active user in the last 30 days
                 */
                active_orgs_30d: number;
            };
            /**
             * Distinct active users and organizations per period (missing periods filled with 0)
             */
            series: {
                period_start: string; // date
                active_users: number;
                active_orgs: number;
            }[];
            /**
             * Organizations matching org_search (all organizations without it), before org_limit
             */
            orgs_total?: number;
            orgs: {
                /**
                 * example:
                 * 739224
                 */
                org_id: string;
                name: string | null;
                mau: number;
                wau: number;
                /**
                 * Active (non-deleted) members
                 */
                members: number;
                /**
                 * Active (non-deleted) members without the `non-billable` tag
                 */
                billable_members: number;
                /**
                 * Temporarily deactivated (non-deleted) members. They hold no seat and are not part of `members`.
                 */
                deactivated_members?: number;
                /**
                 * Seats included in the org's pricing tier (free user quota; the org override wins over the tier default), null if unknown
                 * example:
                 * 25
                 */
                included_seats: number | null;
                /**
                 * Where included_seats comes from (org-specific pricing tier override or the tier default), null if unknown
                 * example:
                 * tier
                 */
                included_seats_source: "override" | "tier" | null;
                /**
                 * Seats activation is measured against, max(included_seats, billable_members). Null only if both are unknown.
                 * example:
                 * 30
                 */
                seats: number | null;
                /**
                 * Deprecated: alias of `seats`, will be removed. Use `seats`.
                 * example:
                 * 30
                 */
                paid_seats: number | null;
                /**
                 * mau / seats (3 decimals), null without seats. Not clamped, can exceed 1.
                 * example:
                 * 0.72
                 */
                activation_rate_30d: number | null;
            }[];
        }
        export type Query = string;
        export interface SignupUserPayload {
            organization_detail?: OrganizationDetail;
            user_detail?: UserDetail;
            /**
             * Language for user invitation email
             * example:
             * en
             */
            language?: string;
        }
        export interface UpdateGroupReq {
            /**
             * The name of the group. Could be a department or a team.
             * example:
             * Finance
             */
            name?: string;
            /**
             * The list of user ids in the group.
             * example:
             * [
             *   "123",
             *   "456"
             * ]
             */
            user_ids?: /* User's unique identifier */ UserId[];
            image_uri?: /**
             * Group's profile image or gradient colors. Supports uploaded image URLs and generated gradient avatars.
             * example:
             * {
             *   "gradient_colors": [
             *     "#0588f0",
             *     "#3358d4"
             *   ]
             * }
             */
            GroupImageUri;
            /**
             * A short abbreviation for the group, up to 2 characters.
             * example:
             * FN
             */
            abbreviation?: string | null;
        }
        export interface User {
            id: /* User's unique identifier */ UserId;
            organization_id: OrganizationId;
            email: string; // email
            /**
             * example:
             * Example user
             */
            display_name?: string;
            /**
             * example:
             * Example user
             */
            name: string;
            /**
             * example:
             * de
             */
            preferred_language: string;
            /**
             * example:
             * <p>Thanks</p>
             */
            signature?: string;
            custom_navigation?: /**
             * Navigation unique identifier - a hash of the normalized navigation payload (name + configuration). Identical navigations across orgs will have the same ID.
             * example:
             * 5gbe4nkp6jsfq
             */
            NavigationId;
            /**
             * Deprecated! Please use Permissions API instead
             */
            roles: string[];
            image_uri?: {
                [name: string]: any;
                /**
                 * example:
                 * https://account-profile-images.epilot.cloud/1/avatar.png
                 */
                original?: string; // uri
                /**
                 * example:
                 * https://account-profile-images.epilot.cloud/1/avatar_32x32.png
                 */
                thumbnail_32?: string; // uri
            } | null;
            properties: {
                /**
                 * example:
                 * profileImageName
                 */
                name: string;
                /**
                 * example:
                 * avatar.png
                 */
                value: string;
            }[];
        }
        export interface UserActivationPayload {
            /**
             * User's display name (default: email address)
             * example:
             * Example User
             */
            display_name?: string;
            /**
             * User's password
             * example:
             * AKjhdakjsdh@!34
             */
            password?: string;
        }
        /**
         * Internal-only login / activity signals of a user in an organization
         */
        export interface UserActivity {
            /**
             * example:
             * 739224
             */
            org_id: string;
            /**
             * example:
             * 10001
             */
            user_id: string;
            /**
             * First recorded activity (ISO-8601 UTC), null if never seen
             * example:
             * 2026-01-12T08:15:00.000Z
             */
            first_seen_at: string | null; // date-time
            /**
             * Last login (ISO-8601 UTC), null if never logged in
             * example:
             * 2026-09-23T07:31:12.000Z
             */
            last_login_at: string | null; // date-time
            /**
             * Last recorded activity, e.g. token refresh (ISO-8601 UTC), null if never seen
             * example:
             * 2026-09-24T10:02:45.000Z
             */
            last_seen_at: string | null; // date-time
        }
        export interface UserDetail {
            /**
             * example:
             * Example user
             */
            full_name: string;
            email: string; // email
            /**
             * User's password
             * example:
             * AKjhdakjsdh@!34
             */
            password: string;
        }
        /**
         * User's unique identifier
         */
        export type UserId = string;
        export interface UserInvitationPayload {
            /**
             * Email address of the address
             * example:
             * test@example.com
             */
            email?: string;
            /**
             * Language for user invitation email
             * example:
             * en
             */
            language?: string;
            roles?: string[];
            /**
             * Which invitation email to send. `default` sends the regular "You've been invited to join epilot" email.
             * `preview_org_ready` tells a user that a preview org (a temporary copy of a production org) is ready;
             * only internal epilot services (internal-auth tokens) may use it, other callers get 403.
             *
             * example:
             * default
             */
            invitation_type?: "default" | "preview_org_ready";
            /**
             * Values interpolated into the invitation email. Only used for `invitation_type` `preview_org_ready`.
             */
            invitation_context?: {
                /**
                 * Name of the preview org the user is invited to
                 * example:
                 * epilot GmbH (Preview)
                 */
                preview_org_name?: string;
                /**
                 * Name of the production org the preview was copied from
                 * example:
                 * epilot GmbH
                 */
                source_org_name?: string;
            };
            /**
             * `false` creates the invite (user, roles, invite link) without sending an invitation email, e.g. when
             * the caller accepts the invite on the user's behalf right away. Only internal epilot services
             * (internal-auth tokens) may set it; other callers get 403.
             *
             */
            send_email?: boolean;
        }
        export interface UserSetting {
            scope: /**
             * User setting scope. Values are limited to 64 characters.
             *
             * Settings are per org membership, except the login-wide `account` scope: it is stored
             * on the user's primary org record (like their login and MFA) and so is the same in every
             * org the user belongs to, e.g. `account` / `org_order` for the org switcher order.
             *
             * example:
             * calendar
             */
            UserSettingScope;
            key: /**
             * User setting key. Values are limited to 128 characters.
             * example:
             * visible_calendars
             */
            UserSettingKey;
            value: /* The JSON value of a user setting. Objects are recommended for extensibility, but any JSON value is accepted up to 64 KiB when serialized as JSON. */ UserSettingValue;
            created_at: string; // date-time
            updated_at: string; // date-time
        }
        /**
         * User setting key. Values are limited to 128 characters.
         * example:
         * visible_calendars
         */
        export type UserSettingKey = string;
        /**
         * User setting scope. Values are limited to 64 characters.
         *
         * Settings are per org membership, except the login-wide `account` scope: it is stored
         * on the user's primary org record (like their login and MFA) and so is the same in every
         * org the user belongs to, e.g. `account` / `org_order` for the org switcher order.
         *
         * example:
         * calendar
         */
        export type UserSettingScope = string;
        /**
         * The JSON value of a user setting. Objects are recommended for extensibility, but any JSON value is accepted up to 64 KiB when serialized as JSON.
         */
        export type UserSettingValue = any;
        export interface UserSettingsListResponse {
            results: {
                scope: /**
                 * User setting scope. Values are limited to 64 characters.
                 *
                 * Settings are per org membership, except the login-wide `account` scope: it is stored
                 * on the user's primary org record (like their login and MFA) and so is the same in every
                 * org the user belongs to, e.g. `account` / `org_order` for the org switcher order.
                 *
                 * example:
                 * calendar
                 */
                UserSettingScope;
                /**
                 * example:
                 * [
                 *   "visible_calendars"
                 * ]
                 */
                keys: /**
                 * User setting key. Values are limited to 128 characters.
                 * example:
                 * visible_calendars
                 */
                UserSettingKey[];
            }[];
        }
        export interface UserSettingsScopeResponse {
            scope: /**
             * User setting scope. Values are limited to 64 characters.
             *
             * Settings are per org membership, except the login-wide `account` scope: it is stored
             * on the user's primary org record (like their login and MFA) and so is the same in every
             * org the user belongs to, e.g. `account` / `org_order` for the org switcher order.
             *
             * example:
             * calendar
             */
            UserSettingScope;
            /**
             * example:
             * {
             *   "visible_calendars": {
             *     "calendar_ids": [
             *       "holidays"
             *     ]
             *   }
             * }
             */
            settings: {
                [name: string]: /* The JSON value of a user setting. Objects are recommended for extensibility, but any JSON value is accepted up to 64 KiB when serialized as JSON. */ UserSettingValue;
            };
        }
        export interface UserV2 {
            /**
             * Only in getMeV2, when the caller is not a person's own login. With an AI agent token
             * (`type: agent`) the response is the user the agent acts on behalf of; with an API token
             * (`type: api_token`) it is a stand-in for the token itself (`id` = token id, `display_name` =
             * token name, no personal data). UIs show who is really acting from this.
             *
             */
            actor?: {
                type: "agent" | "api_token";
                /**
                 * Id of the access token making the request
                 */
                token_id?: string;
                token_name?: string;
                /**
                 * Agent Auth agent id (agent only)
                 */
                agent_id?: string;
                /**
                 * Self-declared agent name (agent only); show it as an AI agent, never as a person
                 */
                agent_name?: string;
                /**
                 * Host the agent runs on, e.g. `epilot MCP (Claude)` (agent only)
                 */
                host_name?: string;
                /**
                 * Self-declared client kind, e.g. `epilot-mcp` (agent only)
                 */
                client?: string;
            };
            id?: /* User's unique identifier */ UserId;
            organization_id?: OrganizationId;
            created_at?: string; // date-time
            activated_at?: string; // date-time
            /**
             * User's display name (default: email address)
             * example:
             * Example User
             */
            display_name?: string;
            /**
             * `Deactivated` users can't log in and free their seat from the next billing month on (a user
             * deactivated during a month is billed for that month). Only `Active` users can be deactivated, and
             * only by someone else with `user:edit`; reactivation (`Deactivated` → `Active`) is possible at any time.
             *
             */
            status?: "Active" | "Pending" | "Deactivated" | "Deleted";
            /**
             * When the user was deactivated. Set by the API while the user is `Deactivated`.
             */
            deactivated_at?: string; // date-time
            /**
             * Id of the user who deactivated this user.
             */
            deactivated_by?: string;
            /**
             * User's email address
             */
            email?: string; // email
            /**
             * User's pending email address
             */
            draft_email?: string | null; // email
            /**
             * Server-set expiry for the pending email change verification link (ISO 8601). Read-only.
             */
            draft_email_expires_at?: string | null; // date-time
            /**
             * Internal: sha256 hash of the active password-reset token. Server-set, never returned in responses.
             */
            password_reset_token_hash?: string | null;
            /**
             * Internal: expiry for the active password-reset token (ISO 8601). Server-set, never returned in responses.
             */
            password_reset_token_expires_at?: string | null; // date-time
            /**
             * When true the user may only sign in through the organization's SSO identity provider. Local
             * password, epilot MFA, passkey, e-mail login link and password reset are rejected for this user.
             * Leave unset for break-glass and external accounts that must keep signing in locally.
             * Can only be changed by callers with `user:edit`; a user cannot change it on their own record.
             *
             */
            sso_required?: boolean;
            /**
             * User's department
             * example:
             * Sales
             */
            department?: string | null;
            /**
             * User's phone number
             * example:
             * 1234567890
             */
            phone?: string | null;
            /**
             * User's secondary phone number, preferred for communication
             * example:
             * 1234567890
             */
            secondary_phone?: string | null;
            /**
             * User's multi-factor authentication status
             * example:
             * false
             */
            mfa_enabled?: boolean;
            /**
             * Whether the user has TOTP (authenticator app) MFA enabled
             * example:
             * false
             */
            totp_enabled?: boolean;
            /**
             * Whether the user has any registered passkeys
             * example:
             * false
             */
            has_passkeys?: boolean;
            /**
             * User's phone number verification status
             * example:
             * true
             */
            phone_verified?: boolean;
            token?: /* Token used to invite a user to epilot */ InviteToken;
            /**
             * User's email signature
             * example:
             * <p>Thanks</p>
             */
            signature?: string | null;
            /**
             * Whether the user's signature is enabled
             * example:
             * true
             */
            is_signature_enabled?: boolean | null;
            /**
             * User's preferred language
             * example:
             * de
             */
            preferred_language?: string;
            /**
             * User's start page after login
             */
            custom_start_page?: string | null; // ^/app/*
            custom_navigation?: /**
             * Navigation unique identifier - a hash of the normalized navigation payload (name + configuration). Identical navigations across orgs will have the same ID.
             * example:
             * 5gbe4nkp6jsfq
             */
            NavigationId;
            /**
             * This field is used to override the release channel for the user.
             */
            override_release_channel?: "canary" | "rc" | "stable" | null;
            /**
             * User's feature preferences
             * example:
             * {
             *   "feature_name": true
             * }
             */
            feature_preferences?: {
                [name: string]: any;
            } | null;
            /**
             * User's custom profile image
             * example:
             * {
             *   "original": "https://account-profile-images.epilot.cloud/1/avatar.png",
             *   "thumbnail_32": "https://account-profile-images.epilot.cloud/1/avatar_32x32.png"
             * }
             */
            image_uri?: {
                [name: string]: any;
                original?: string; // uri
                thumbnail_32?: string; // uri
            } | null;
            /**
             * example:
             * {
             *   "entity_views": {
             *     "opportunity": "891a5409850abf8b92bd2cb7bdd2844d32ce6bec",
             *     "order": "628aee91-7c2f-4047-ab0d-433582a19c49"
             *   },
             *   "dashboard": "751ff121-9ac2-4511-a2e6-851f11287380"
             * }
             */
            favorites?: {
                [name: string]: any;
            };
            /**
             * example:
             * {
             *   "added_participant_opportunity": true,
             *   "assigned_opportunity": true,
             *   "assigned_task": true,
             *   "comment_opportunity": true,
             *   "deleted_task": true,
             *   "escalated_task": true,
             *   "message_receive_opportunity": true,
             *   "message_send_opportunity": true,
             *   "created_task": true,
             *   "created_opportunity_manual": true,
             *   "created_opportunity_auto": true,
             *   "deleted_opportunity": true
             * }
             */
            email_notification_setting?: {
                [name: string]: any;
            };
            /**
             * Per-notification-type in-app delivery preferences (notification type key -> enabled). Written by the my-account notification settings UI and honored by svc-notification-api at delivery time. Absent or partial keys fall back to each notification type's configured default. Mirrors email_notification_setting for the in-app channel.
             * example:
             * {
             *   "integration_critical_error": true,
             *   "integration_error_threshold": true,
             *   "assigned_opportunity": true,
             *   "assigned_task": true
             * }
             */
            in_app_notification_setting?: {
                [name: string]: any;
            };
            /**
             * Whether new in-app notifications pop up on screen (top-right toasts in the 360 app) in addition to the bell counter. Written by the my-account notification settings UI and honored by the topbar. Absent or null means enabled; only `false` turns the popups off. Only has an effect while the org has the `on-screen-notifications` feature flag.
             * example:
             * false
             */
            in_app_notification_popups?: boolean | null;
            properties?: {
                /**
                 * example:
                 * profileImageName
                 */
                name: string;
                /**
                 * example:
                 * avatar.png
                 */
                value: string;
            }[];
            /**
             * User tags/labels assigned for classification (e.g. label slugs)
             * example:
             * [
             *   "non-billable"
             * ]
             */
            tags?: string[] | null;
        }
        export interface UserVerificationPayload {
            /**
             * User's password
             * example:
             * AKjhdakjsdh@!34
             */
            password?: string;
        }
        export type Username = string;
        export type VerificationToken = string;
    }
}
export declare namespace Paths {
    namespace ActivateUser {
        namespace Parameters {
            export type Token = /* Token used to invite a user to epilot */ Components.Schemas.InviteToken;
        }
        export interface QueryParameters {
            token: Parameters.Token;
        }
        export type RequestBody = Components.Schemas.UserActivationPayload;
        namespace Responses {
            export interface $200 {
                user?: Components.Schemas.User;
                /**
                 * Email address of the activated user
                 */
                email?: string;
                /**
                 * Short-lived token answering the Cognito CUSTOM_AUTH challenge, so the activated user can be signed in directly instead of being sent back to the login screen. Same shape and lifetime as a magic-link token.
                 */
                login_token?: string;
            }
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace AdvanceUserAssignment {
        namespace Parameters {
            export type Id = /* Group unique identifier */ Components.Schemas.GroupId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Group;
            export interface $404 {
            }
            export interface $422 {
            }
        }
    }
    namespace BeginDiscoverablePasskeyAuthentication {
        namespace Responses {
            export type $200 = Components.Schemas.PasskeyAuthenticationOptions;
        }
    }
    namespace BeginPasskeyAuthentication {
        export interface RequestBody {
            email: string; // email
        }
        namespace Responses {
            export type $200 = Components.Schemas.PasskeyAuthenticationOptions;
            export interface $404 {
            }
        }
    }
    namespace BeginPasskeyRegistration {
        export interface RequestBody {
            /**
             * example:
             * My Laptop
             */
            friendly_name?: string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PasskeyRegistrationOptions;
            export interface $403 {
            }
        }
    }
    namespace CheckInviteToken {
        namespace Parameters {
            export type Token = /* Token used to invite a user to epilot */ Components.Schemas.InviteToken;
        }
        export interface QueryParameters {
            token: Parameters.Token;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Organization ID of the organization that invited the user
                 */
                invitation_org_id: string;
                /**
                 * Name of the organization that invited the user
                 */
                invitation_org_name: string;
                /**
                 * Logo URL of the organization that invited the user
                 */
                invitation_org_logo_url?: string;
                /**
                 * Logo Thumbnail URL of the organization that invited the user
                 */
                invitation_org_logo_thumbnail_url?: string;
                /**
                 * User ID of the invited user
                 */
                invitee_user_id: string;
                /**
                 * Organization ID of the primary organization of the user (when inviting an existing epilot user)
                 */
                invitee_primary_org_id?: string;
                /**
                 * Login methods offered by the inviting organization. When the organization does not offer password login, or signs its users in via SSO, the invited user does not have to choose a password during activation.
                 */
                login_methods?: {
                    /**
                     * Username + password login is enabled
                     */
                    password?: boolean;
                    /**
                     * Passwordless (email link) login is enabled
                     */
                    passwordless?: boolean;
                    /**
                     * Single sign-on is enabled
                     */
                    sso?: boolean;
                    /**
                     * Passkey (WebAuthn) login is enabled
                     */
                    passkey?: boolean;
                };
            }
            export interface $404 {
            }
        }
    }
    namespace CompletePasskeyRegistration {
        export type RequestBody = Components.Schemas.PasskeyRegistrationResponse;
        namespace Responses {
            export type $200 = Components.Schemas.Passkey;
            export interface $403 {
            }
        }
    }
    namespace CreateGroup {
        export type RequestBody = Components.Schemas.CreateGroupReq;
        namespace Responses {
            export type $201 = Components.Schemas.Group;
        }
    }
    namespace CreateNavigation {
        export type RequestBody = /* Request payload to create a new navigation configuration */ Components.Schemas.NavigationCreateRequest;
        namespace Responses {
            export type $201 = /* A customized workplace navigation configuration. The ID is a content-hash, so identical configurations will have the same ID. */ Components.Schemas.Navigation;
        }
    }
    namespace DeleteGroup {
        namespace Parameters {
            export type Id = /* Group unique identifier */ Components.Schemas.GroupId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DeletePasskey {
        namespace Parameters {
            export type CredentialId = string;
        }
        export interface PathParameters {
            credentialId: Parameters.CredentialId;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace DeleteUserSetting {
        namespace Parameters {
            export type Key = /**
             * User setting key. Values are limited to 128 characters.
             * example:
             * visible_calendars
             */
            Components.Schemas.UserSettingKey;
            export type Scope = /**
             * User setting scope. Values are limited to 64 characters.
             *
             * Settings are per org membership, except the login-wide `account` scope: it is stored
             * on the user's primary org record (like their login and MFA) and so is the same in every
             * org the user belongs to, e.g. `account` / `org_order` for the org switcher order.
             *
             * example:
             * calendar
             */
            Components.Schemas.UserSettingScope;
        }
        export interface PathParameters {
            scope: Parameters.Scope;
            key: Parameters.Key;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace DeleteUserV2 {
        namespace Parameters {
            export type Id = /* User's unique identifier */ Components.Schemas.UserId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.User;
        }
    }
    namespace GetGroup {
        namespace Parameters {
            export type Hydrate = Components.Schemas.Hydrate;
            export type Id = /* Group unique identifier */ Components.Schemas.GroupId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            hydrate?: Parameters.Hydrate;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Group;
            export interface $404 {
            }
        }
    }
    namespace GetGroups {
        namespace Parameters {
            export type Hydrate = Components.Schemas.Hydrate;
            export type Limit = Components.Schemas.Limit;
            export type Offset = Components.Schemas.Offset;
            export type Query = Components.Schemas.Query;
        }
        export interface QueryParameters {
            query?: Parameters.Query;
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
            hydrate?: Parameters.Hydrate;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 1
                 */
                hits?: number;
                groups?: Components.Schemas.Group[];
            }
        }
    }
    namespace GetGroupsForUser {
        namespace Parameters {
            export type Id = /* User's unique identifier */ Components.Schemas.UserId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Group[];
        }
    }
    namespace GetMe {
        namespace Responses {
            export type $200 = Components.Schemas.User;
        }
    }
    namespace GetMeV2 {
        namespace Responses {
            export type $200 = Components.Schemas.UserV2;
        }
    }
    namespace GetNavigation {
        namespace Parameters {
            export type Id = /**
             * Navigation unique identifier - a hash of the normalized navigation payload (name + configuration). Identical navigations across orgs will have the same ID.
             * example:
             * 5gbe4nkp6jsfq
             */
            Components.Schemas.NavigationId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = /* A customized workplace navigation configuration. The ID is a content-hash, so identical configurations will have the same ID. */ Components.Schemas.Navigation;
            export interface $404 {
            }
        }
    }
    namespace GetUser {
        namespace Parameters {
            export type Id = /* User's unique identifier */ Components.Schemas.UserId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.User;
        }
    }
    namespace GetUserLoginParameters {
        namespace Parameters {
            export type Username = Components.Schemas.Username;
        }
        export interface PathParameters {
            username: Parameters.Username;
        }
        namespace Responses {
            export interface $200 {
                login_parameters?: Components.Schemas.LoginParameters[];
            }
        }
    }
    namespace GetUserLoginParametersV2 {
        namespace Parameters {
            export type Username = Components.Schemas.Username;
        }
        export interface PathParameters {
            username: Parameters.Username;
        }
        namespace Responses {
            export interface $200 {
                login_parameters?: Components.Schemas.LoginParameters[];
            }
        }
    }
    namespace GetUserSetting {
        namespace Parameters {
            export type Key = /**
             * User setting key. Values are limited to 128 characters.
             * example:
             * visible_calendars
             */
            Components.Schemas.UserSettingKey;
            export type Scope = /**
             * User setting scope. Values are limited to 64 characters.
             *
             * Settings are per org membership, except the login-wide `account` scope: it is stored
             * on the user's primary org record (like their login and MFA) and so is the same in every
             * org the user belongs to, e.g. `account` / `org_order` for the org switcher order.
             *
             * example:
             * calendar
             */
            Components.Schemas.UserSettingScope;
        }
        export interface PathParameters {
            scope: Parameters.Scope;
            key: Parameters.Key;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserSetting;
            export interface $404 {
            }
        }
    }
    namespace GetUserSettingsScope {
        namespace Parameters {
            export type Scope = /**
             * User setting scope. Values are limited to 64 characters.
             *
             * Settings are per org membership, except the login-wide `account` scope: it is stored
             * on the user's primary org record (like their login and MFA) and so is the same in every
             * org the user belongs to, e.g. `account` / `org_order` for the org switcher order.
             *
             * example:
             * calendar
             */
            Components.Schemas.UserSettingScope;
        }
        export interface PathParameters {
            scope: Parameters.Scope;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserSettingsScopeResponse;
        }
    }
    namespace GetUserV2 {
        namespace Parameters {
            export type Id = /* User's unique identifier */ Components.Schemas.UserId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserV2;
        }
    }
    namespace InviteUser {
        export type RequestBody = Components.Schemas.UserInvitationPayload;
        namespace Responses {
            export type $201 = Components.Schemas.UserV2;
            export interface $400 {
            }
            export interface $403 {
            }
        }
    }
    namespace LeaveOrganization {
        namespace Parameters {
            export type OrgId = Components.Schemas.OrganizationId;
        }
        export interface PathParameters {
            org_id: Parameters.OrgId;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $409 {
                error?: "cannot_leave_primary_org" | "last_owner";
                message?: string;
            }
        }
    }
    namespace ListPasskeys {
        namespace Responses {
            export interface $200 {
                passkeys?: Components.Schemas.Passkey[];
            }
        }
    }
    namespace ListUserSettings {
        namespace Responses {
            export type $200 = Components.Schemas.UserSettingsListResponse;
        }
    }
    namespace ListUsers {
        namespace Parameters {
            export type Limit = Components.Schemas.Limit;
            export type Offset = Components.Schemas.Offset;
            export type OrgIds = Components.Schemas.OrganizationId[];
            export type Query = Components.Schemas.Query;
        }
        export interface QueryParameters {
            org_ids?: Parameters.OrgIds;
            query?: Parameters.Query;
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export interface $200 {
                users?: Components.Schemas.User[];
            }
        }
    }
    namespace ListUsersV2 {
        namespace Parameters {
            export type Limit = Components.Schemas.Limit;
            export type Offset = Components.Schemas.Offset;
            export type Query = Components.Schemas.Query;
        }
        export interface QueryParameters {
            query?: Parameters.Query;
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.UserV2[];
            }
        }
    }
    namespace PutUserSetting {
        namespace Parameters {
            export type Key = /**
             * User setting key. Values are limited to 128 characters.
             * example:
             * visible_calendars
             */
            Components.Schemas.UserSettingKey;
            export type Scope = /**
             * User setting scope. Values are limited to 64 characters.
             *
             * Settings are per org membership, except the login-wide `account` scope: it is stored
             * on the user's primary org record (like their login and MFA) and so is the same in every
             * org the user belongs to, e.g. `account` / `org_order` for the org switcher order.
             *
             * example:
             * calendar
             */
            Components.Schemas.UserSettingScope;
        }
        export interface PathParameters {
            scope: Parameters.Scope;
            key: Parameters.Key;
        }
        export type RequestBody = /* The JSON value of a user setting. Objects are recommended for extensibility, but any JSON value is accepted up to 64 KiB when serialized as JSON. */ Components.Schemas.UserSettingValue;
        namespace Responses {
            export type $200 = Components.Schemas.UserSetting;
        }
    }
    namespace RejectInvite {
        namespace Parameters {
            export type Token = /* Token used to invite a user to epilot */ Components.Schemas.InviteToken;
        }
        export interface QueryParameters {
            token: Parameters.Token;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * true
                 */
                success?: boolean;
            }
            export interface $404 {
            }
        }
    }
    namespace RequestPasswordReset {
        export interface RequestBody {
            /**
             * Email address of the account to reset
             * example:
             * test@example.com
             */
            email: string;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * If an account exists, a password reset email has been sent.
                 */
                message: string;
            }
        }
    }
    namespace ResendUserInvitation {
        export interface RequestBody {
            /**
             * Email address of the address
             * example:
             * test@example.com
             */
            email?: string;
            /**
             * Language for user invitation email
             * example:
             * en
             */
            language?: string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.UserV2;
            export interface $400 {
            }
        }
    }
    namespace ResetPassword {
        export interface RequestBody {
            /**
             * Email address of the account
             * example:
             * test@example.com
             */
            email: string;
            /**
             * Reset token from the password reset email
             */
            token: string;
            /**
             * The new password
             */
            password: string;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * true
                 */
                success: boolean;
            }
            export interface $400 {
                /**
                 * Discriminator distinguishing token errors from policy errors
                 */
                error: "INVALID_RESET_LINK" | "PASSWORD_POLICY";
                /**
                 * example:
                 * Password does not meet the requirements
                 */
                message: string;
                /**
                 * Itemized password-policy violation codes (only present when error is PASSWORD_POLICY)
                 * example:
                 * [
                 *   "too_short",
                 *   "missing_uppercase"
                 * ]
                 */
                violations?: ("too_short" | "missing_lowercase" | "missing_uppercase" | "missing_number" | "missing_symbol" | "leading_or_trailing_whitespace")[];
            }
        }
    }
    namespace ResolveDiscoverableCredential {
        export interface RequestBody {
            /**
             * The challenge token from authenticateBeginDiscoverable
             */
            challenge_token: string;
            /**
             * WebAuthn AuthenticatorAssertionResponse JSON
             */
            assertion_response: {
                [key: string]: any;
            };
        }
        namespace Responses {
            export interface $200 {
                email?: string; // email
                organization_id?: string;
                user_id?: string;
                login_parameters?: Components.Schemas.LoginParameters[];
            }
            export interface $401 {
            }
            export interface $404 {
            }
        }
    }
    namespace SendUserPasswordReset {
        export interface RequestBody {
            /**
             * Email address of the user to reset
             * example:
             * test@example.com
             */
            email: string;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * true
                 */
                success: boolean;
            }
            export interface $400 {
            }
            export interface $403 {
            }
        }
    }
    namespace SignUpUser {
        namespace Parameters {
            export type Token = /* Token used to invite a partner user to epilot */ Components.Schemas.PartnerInvitationToken;
        }
        export interface QueryParameters {
            token?: Parameters.Token;
        }
        export type RequestBody = Components.Schemas.SignupUserPayload;
        namespace Responses {
            export interface $200 {
                user?: Components.Schemas.User;
                organization?: Components.Schemas.Organization;
            }
        }
    }
    namespace SwitchOrganization {
        export interface RequestBody {
            org_id: Components.Schemas.OrganizationId;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * A login token for the new organization to be used with CUSTOM_AUTH flow against login parameters
                 */
                login_token: string;
            }
        }
    }
    namespace UpdateGroup {
        namespace Parameters {
            export type Id = /* Group unique identifier */ Components.Schemas.GroupId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateGroupReq;
        namespace Responses {
            export type $201 = Components.Schemas.Group;
            export interface $404 {
            }
        }
    }
    namespace UpdateUserV2 {
        namespace Parameters {
            export type Id = /* User's unique identifier */ Components.Schemas.UserId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UserV2;
        namespace Responses {
            export type $200 = Components.Schemas.UserV2;
        }
    }
    namespace VerifyEmailWithToken {
        namespace Parameters {
            export type Token = Components.Schemas.VerificationToken;
        }
        export interface QueryParameters {
            token: Parameters.Token;
        }
        export type RequestBody = Components.Schemas.UserVerificationPayload;
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
}


export interface OperationMethods {
  /**
   * signUpUser - signUpUser
   */
  'signUpUser'(
    parameters?: Parameters<Paths.SignUpUser.QueryParameters> | null,
    data?: Paths.SignUpUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SignUpUser.Responses.$200>
  /**
   * getMeV2 - getMeV2
   * 
   * Get currently logged in user.
   * 
   * For an AI agent token, the user the agent acts on behalf of (with `actor` describing the
   * agent). For an API token, a stand-in for the token (`id` = token id, `actor.type: api_token`).
   * 
   */
  'getMeV2'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMeV2.Responses.$200>
  /**
   * listUserSettings - listUserSettings
   * 
   * List all setting scopes and keys available for the currently logged in user. Does not return setting values.
   */
  'listUserSettings'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListUserSettings.Responses.$200>
  /**
   * getUserSettingsScope - getUserSettingsScope
   * 
   * Get all setting values for one scope for the currently logged in user.
   */
  'getUserSettingsScope'(
    parameters?: Parameters<Paths.GetUserSettingsScope.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserSettingsScope.Responses.$200>
  /**
   * getUserSetting - getUserSetting
   * 
   * Get one setting value by scope and key for the currently logged in user.
   */
  'getUserSetting'(
    parameters?: Parameters<Paths.GetUserSetting.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserSetting.Responses.$200>
  /**
   * putUserSetting - putUserSetting
   * 
   * Create or replace one setting value for the currently logged in user.
   */
  'putUserSetting'(
    parameters?: Parameters<Paths.PutUserSetting.PathParameters> | null,
    data?: Paths.PutUserSetting.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutUserSetting.Responses.$200>
  /**
   * deleteUserSetting - deleteUserSetting
   * 
   * Delete one setting value for the currently logged in user.
   */
  'deleteUserSetting'(
    parameters?: Parameters<Paths.DeleteUserSetting.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteUserSetting.Responses.$204>
  /**
   * listUsersV2 - listUsersV2
   * 
   * Get the list of organization users
   */
  'listUsersV2'(
    parameters?: Parameters<Paths.ListUsersV2.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListUsersV2.Responses.$200>
  /**
   * getUserV2 - getUserV2
   * 
   * Get user details by user id
   */
  'getUserV2'(
    parameters?: Parameters<Paths.GetUserV2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserV2.Responses.$200>
  /**
   * updateUserV2 - updateUserV2
   * 
   * Update user details.
   * 
   * Requires `user:edit` on the user, or the caller updating their own user (self-service).
   * `id`, `organization_id`, `email`, `token` and password-reset fields are never taken from the request body.
   * `status` can only be changed with `user:edit`; `draft_email` (email change) only by the user themselves.
   * Changing `draft_email`, `mfa_enabled`, `totp_enabled` or `phone_verified` requires the user's own login
   * session: API, agent and assumed (CLI) tokens get a 403 (values sent unchanged are ignored).
   * 
   */
  'updateUserV2'(
    parameters?: Parameters<Paths.UpdateUserV2.PathParameters> | null,
    data?: Paths.UpdateUserV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateUserV2.Responses.$200>
  /**
   * deleteUserV2 - deleteUserV2
   * 
   * Delete user by user id.
   * 
   * Rejects with 409 when the user is the last remaining owner of the organization (internal callers are exempt).
   * 
   */
  'deleteUserV2'(
    parameters?: Parameters<Paths.DeleteUserV2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteUserV2.Responses.$200>
  /**
   * inviteUser - inviteUser
   * 
   * Creates a new user in the caller's organization and sends an invite email to activate the user.
   * 
   * The caller can only invite users with roles they could assign themselves: their own roles, or other
   * org roles with `role:assign`. Only an organization owner can invite a user with the `owner` role (403 otherwise).
   * 
   * `invitation_type: preview_org_ready` sends a "Your preview org is ready" email instead of the default
   * invitation (same invite link). It is reserved for internal epilot services (internal-auth tokens);
   * any other caller gets 403.
   * 
   * `send_email: false` (internal epilot services only) creates the invite without sending an email.
   * 
   */
  'inviteUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.InviteUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InviteUser.Responses.$201>
  /**
   * resendUserInvitation - resendUserInvitation
   * 
   * Resend user invitation email
   */
  'resendUserInvitation'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ResendUserInvitation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ResendUserInvitation.Responses.$200>
  /**
   * sendUserPasswordReset - sendUserPasswordReset
   * 
   * Send a password reset email to a user in your organization.
   * Requires `user:edit` on the target user.
   * 
   */
  'sendUserPasswordReset'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SendUserPasswordReset.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SendUserPasswordReset.Responses.$200>
  /**
   * getGroupsForUser - getGroupsForUser
   * 
   * Get groups of a user
   */
  'getGroupsForUser'(
    parameters?: Parameters<Paths.GetGroupsForUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetGroupsForUser.Responses.$200>
  /**
   * getGroups - getGroups
   * 
   * Lists groups in organizations you have access to
   */
  'getGroups'(
    parameters?: Parameters<Paths.GetGroups.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetGroups.Responses.$200>
  /**
   * createGroup - createGroup
   * 
   * Create a new group
   */
  'createGroup'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateGroup.Responses.$201>
  /**
   * getGroup - getGroup
   * 
   * Get group by id
   */
  'getGroup'(
    parameters?: Parameters<Paths.GetGroup.QueryParameters & Paths.GetGroup.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetGroup.Responses.$200>
  /**
   * updateGroup - updateGroup
   * 
   * Update group by id
   */
  'updateGroup'(
    parameters?: Parameters<Paths.UpdateGroup.PathParameters> | null,
    data?: Paths.UpdateGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateGroup.Responses.$201>
  /**
   * deleteGroup - deleteGroup
   * 
   * Delete group by id
   */
  'deleteGroup'(
    parameters?: Parameters<Paths.DeleteGroup.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteGroup.Responses.$204>
  /**
   * advanceUserAssignment - advanceUserAssignment
   * 
   * Advance user assignment to next user in line
   */
  'advanceUserAssignment'(
    parameters?: Parameters<Paths.AdvanceUserAssignment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdvanceUserAssignment.Responses.$200>
  /**
   * createNavigation - createNavigation
   * 
   * Create a new navigation configuration. Navigations are immutable and globally accessible across organizations.
   * Each creation generates a new id. To update a navigation, create a new one.
   * 
   */
  'createNavigation'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateNavigation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateNavigation.Responses.$201>
  /**
   * getNavigation - getNavigation
   * 
   * Get a navigation configuration by ID
   */
  'getNavigation'(
    parameters?: Parameters<Paths.GetNavigation.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetNavigation.Responses.$200>
  /**
   * verifyEmailWithToken - verifyEmailWithToken
   * 
   * Update new email using an verification token
   */
  'verifyEmailWithToken'(
    parameters?: Parameters<Paths.VerifyEmailWithToken.QueryParameters> | null,
    data?: Paths.VerifyEmailWithToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VerifyEmailWithToken.Responses.$200>
  /**
   * requestPasswordReset - requestPasswordReset
   * 
   * Request a password reset email for the given email address. Always
   * returns a success response whether or not an account exists with that
   * email.
   * 
   */
  'requestPasswordReset'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RequestPasswordReset.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequestPasswordReset.Responses.$200>
  /**
   * resetPassword - resetPassword
   * 
   * Set a new password using a reset token from the password reset email.
   * The token is single-use and time-limited.
   * 
   */
  'resetPassword'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ResetPassword.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ResetPassword.Responses.$200>
  /**
   * checkInviteToken - checkInviteToken
   * 
   * Check an invite token
   */
  'checkInviteToken'(
    parameters?: Parameters<Paths.CheckInviteToken.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CheckInviteToken.Responses.$200>
  /**
   * activateUser - activateUser
   * 
   * Activate user using an invite token
   */
  'activateUser'(
    parameters?: Parameters<Paths.ActivateUser.QueryParameters> | null,
    data?: Paths.ActivateUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ActivateUser.Responses.$200>
  /**
   * rejectInvite - rejectInvite
   * 
   * Reject an invite
   */
  'rejectInvite'(
    parameters?: Parameters<Paths.RejectInvite.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RejectInvite.Responses.$200>
  /**
   * getUserLoginParametersV2 - getUserLoginParametersV2
   * 
   * Get user organization login parameters by username
   * 
   * The first item in the list corresponds to the user's primary organization and must be used for initial login.
   * 
   */
  'getUserLoginParametersV2'(
    parameters?: Parameters<Paths.GetUserLoginParametersV2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserLoginParametersV2.Responses.$200>
  /**
   * beginPasskeyAuthentication - beginPasskeyAuthentication
   * 
   * Begin passkey authentication flow. Returns WebAuthn options and a signed challenge token.
   */
  'beginPasskeyAuthentication'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.BeginPasskeyAuthentication.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BeginPasskeyAuthentication.Responses.$200>
  /**
   * beginDiscoverablePasskeyAuthentication - beginDiscoverablePasskeyAuthentication
   * 
   * Begin discoverable passkey authentication flow (no email required). Returns WebAuthn options with empty allowCredentials for the browser credential picker.
   */
  'beginDiscoverablePasskeyAuthentication'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BeginDiscoverablePasskeyAuthentication.Responses.$200>
  /**
   * resolveDiscoverableCredential - resolveDiscoverableCredential
   * 
   * Resolve user identity from a discoverable passkey assertion. Returns the user's email and login parameters.
   */
  'resolveDiscoverableCredential'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ResolveDiscoverableCredential.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ResolveDiscoverableCredential.Responses.$200>
  /**
   * beginPasskeyRegistration - beginPasskeyRegistration
   * 
   * Begin passkey registration flow for the authenticated user.
   * Requires the user's own login session; API, agent and assumed (CLI) tokens are refused.
   * 
   */
  'beginPasskeyRegistration'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.BeginPasskeyRegistration.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BeginPasskeyRegistration.Responses.$200>
  /**
   * completePasskeyRegistration - completePasskeyRegistration
   * 
   * Complete passkey registration by verifying the attestation response.
   * Requires the user's own login session; API, agent and assumed (CLI) tokens are refused.
   * 
   */
  'completePasskeyRegistration'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CompletePasskeyRegistration.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompletePasskeyRegistration.Responses.$200>
  /**
   * listPasskeys - listPasskeys
   * 
   * List all passkeys registered for the authenticated user.
   */
  'listPasskeys'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListPasskeys.Responses.$200>
  /**
   * deletePasskey - deletePasskey
   * 
   * Delete a passkey by credential ID.
   * Requires the user's own login session; API, agent and assumed (CLI) tokens are refused.
   * 
   */
  'deletePasskey'(
    parameters?: Parameters<Paths.DeletePasskey.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeletePasskey.Responses.$204>
  /**
   * switchOrganization - switchOrganization
   * 
   * Switch to another organization the user is part of
   */
  'switchOrganization'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SwitchOrganization.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SwitchOrganization.Responses.$200>
  /**
   * leaveOrganization - leaveOrganization
   * 
   * Leave an organization the calling user is a member of. The user's membership in that organization is
   * deactivated (status `Deactivated`), so it no longer shows up in the org switcher and can't be logged into.
   * An admin of the organization can reactivate it.
   * 
   * Rules:
   * - The user's primary organization can't be left (`cannot_leave_primary_org`)
   * - The last active owner can't leave (`last_owner`), unless the organization is a Preview org or is scheduled
   *   for deletion. Preview orgs can be left at any time.
   * 
   */
  'leaveOrganization'(
    parameters?: Parameters<Paths.LeaveOrganization.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LeaveOrganization.Responses.$204>
  /**
   * getMe - getMe
   * 
   * Get currently logged in user
   */
  'getMe'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMe.Responses.$200>
  /**
   * listUsers - listUsers
   * 
   * Lists users in organizations you have access to
   */
  'listUsers'(
    parameters?: Parameters<Paths.ListUsers.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListUsers.Responses.$200>
  /**
   * getUser - getUser
   * 
   * Get user by id
   */
  'getUser'(
    parameters?: Parameters<Paths.GetUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUser.Responses.$200>
  /**
   * getUserLoginParameters - getUserLoginParameters
   * 
   * Get user organization login parameters by username
   */
  'getUserLoginParameters'(
    parameters?: Parameters<Paths.GetUserLoginParameters.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserLoginParameters.Responses.$200>
}

export interface PathsDictionary {
  ['/v2/users/public/signup']: {
    /**
     * signUpUser - signUpUser
     */
    'post'(
      parameters?: Parameters<Paths.SignUpUser.QueryParameters> | null,
      data?: Paths.SignUpUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SignUpUser.Responses.$200>
  }
  ['/v2/users/me']: {
    /**
     * getMeV2 - getMeV2
     * 
     * Get currently logged in user.
     * 
     * For an AI agent token, the user the agent acts on behalf of (with `actor` describing the
     * agent). For an API token, a stand-in for the token (`id` = token id, `actor.type: api_token`).
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMeV2.Responses.$200>
  }
  ['/v2/users/me/settings']: {
    /**
     * listUserSettings - listUserSettings
     * 
     * List all setting scopes and keys available for the currently logged in user. Does not return setting values.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListUserSettings.Responses.$200>
  }
  ['/v2/users/me/settings/{scope}']: {
    /**
     * getUserSettingsScope - getUserSettingsScope
     * 
     * Get all setting values for one scope for the currently logged in user.
     */
    'get'(
      parameters?: Parameters<Paths.GetUserSettingsScope.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserSettingsScope.Responses.$200>
  }
  ['/v2/users/me/settings/{scope}/{key}']: {
    /**
     * getUserSetting - getUserSetting
     * 
     * Get one setting value by scope and key for the currently logged in user.
     */
    'get'(
      parameters?: Parameters<Paths.GetUserSetting.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserSetting.Responses.$200>
    /**
     * putUserSetting - putUserSetting
     * 
     * Create or replace one setting value for the currently logged in user.
     */
    'put'(
      parameters?: Parameters<Paths.PutUserSetting.PathParameters> | null,
      data?: Paths.PutUserSetting.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutUserSetting.Responses.$200>
    /**
     * deleteUserSetting - deleteUserSetting
     * 
     * Delete one setting value for the currently logged in user.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteUserSetting.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteUserSetting.Responses.$204>
  }
  ['/v2/users']: {
    /**
     * listUsersV2 - listUsersV2
     * 
     * Get the list of organization users
     */
    'get'(
      parameters?: Parameters<Paths.ListUsersV2.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListUsersV2.Responses.$200>
  }
  ['/v2/users/{id}']: {
    /**
     * getUserV2 - getUserV2
     * 
     * Get user details by user id
     */
    'get'(
      parameters?: Parameters<Paths.GetUserV2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserV2.Responses.$200>
    /**
     * updateUserV2 - updateUserV2
     * 
     * Update user details.
     * 
     * Requires `user:edit` on the user, or the caller updating their own user (self-service).
     * `id`, `organization_id`, `email`, `token` and password-reset fields are never taken from the request body.
     * `status` can only be changed with `user:edit`; `draft_email` (email change) only by the user themselves.
     * Changing `draft_email`, `mfa_enabled`, `totp_enabled` or `phone_verified` requires the user's own login
     * session: API, agent and assumed (CLI) tokens get a 403 (values sent unchanged are ignored).
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateUserV2.PathParameters> | null,
      data?: Paths.UpdateUserV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateUserV2.Responses.$200>
    /**
     * deleteUserV2 - deleteUserV2
     * 
     * Delete user by user id.
     * 
     * Rejects with 409 when the user is the last remaining owner of the organization (internal callers are exempt).
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteUserV2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteUserV2.Responses.$200>
  }
  ['/v2/users/invite']: {
    /**
     * inviteUser - inviteUser
     * 
     * Creates a new user in the caller's organization and sends an invite email to activate the user.
     * 
     * The caller can only invite users with roles they could assign themselves: their own roles, or other
     * org roles with `role:assign`. Only an organization owner can invite a user with the `owner` role (403 otherwise).
     * 
     * `invitation_type: preview_org_ready` sends a "Your preview org is ready" email instead of the default
     * invitation (same invite link). It is reserved for internal epilot services (internal-auth tokens);
     * any other caller gets 403.
     * 
     * `send_email: false` (internal epilot services only) creates the invite without sending an email.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.InviteUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InviteUser.Responses.$201>
  }
  ['/v2/users/invite:resendEmail']: {
    /**
     * resendUserInvitation - resendUserInvitation
     * 
     * Resend user invitation email
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ResendUserInvitation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ResendUserInvitation.Responses.$200>
  }
  ['/v2/users:sendPasswordReset']: {
    /**
     * sendUserPasswordReset - sendUserPasswordReset
     * 
     * Send a password reset email to a user in your organization.
     * Requires `user:edit` on the target user.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SendUserPasswordReset.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SendUserPasswordReset.Responses.$200>
  }
  ['/v2/users/{id}/groups']: {
    /**
     * getGroupsForUser - getGroupsForUser
     * 
     * Get groups of a user
     */
    'get'(
      parameters?: Parameters<Paths.GetGroupsForUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetGroupsForUser.Responses.$200>
  }
  ['/v1/groups']: {
    /**
     * getGroups - getGroups
     * 
     * Lists groups in organizations you have access to
     */
    'get'(
      parameters?: Parameters<Paths.GetGroups.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetGroups.Responses.$200>
    /**
     * createGroup - createGroup
     * 
     * Create a new group
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateGroup.Responses.$201>
  }
  ['/v1/groups/{id}']: {
    /**
     * getGroup - getGroup
     * 
     * Get group by id
     */
    'get'(
      parameters?: Parameters<Paths.GetGroup.QueryParameters & Paths.GetGroup.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetGroup.Responses.$200>
    /**
     * updateGroup - updateGroup
     * 
     * Update group by id
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateGroup.PathParameters> | null,
      data?: Paths.UpdateGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateGroup.Responses.$201>
    /**
     * deleteGroup - deleteGroup
     * 
     * Delete group by id
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteGroup.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteGroup.Responses.$204>
  }
  ['/v1/groups/{id}/user:next']: {
    /**
     * advanceUserAssignment - advanceUserAssignment
     * 
     * Advance user assignment to next user in line
     */
    'post'(
      parameters?: Parameters<Paths.AdvanceUserAssignment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdvanceUserAssignment.Responses.$200>
  }
  ['/v2/user/navigations']: {
    /**
     * createNavigation - createNavigation
     * 
     * Create a new navigation configuration. Navigations are immutable and globally accessible across organizations.
     * Each creation generates a new id. To update a navigation, create a new one.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateNavigation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateNavigation.Responses.$201>
  }
  ['/v2/user/navigations/{id}']: {
    /**
     * getNavigation - getNavigation
     * 
     * Get a navigation configuration by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetNavigation.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetNavigation.Responses.$200>
  }
  ['/v2/users/public/verifyEmail']: {
    /**
     * verifyEmailWithToken - verifyEmailWithToken
     * 
     * Update new email using an verification token
     */
    'post'(
      parameters?: Parameters<Paths.VerifyEmailWithToken.QueryParameters> | null,
      data?: Paths.VerifyEmailWithToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VerifyEmailWithToken.Responses.$200>
  }
  ['/v2/users/public/requestPasswordReset']: {
    /**
     * requestPasswordReset - requestPasswordReset
     * 
     * Request a password reset email for the given email address. Always
     * returns a success response whether or not an account exists with that
     * email.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RequestPasswordReset.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequestPasswordReset.Responses.$200>
  }
  ['/v2/users/public/resetPassword']: {
    /**
     * resetPassword - resetPassword
     * 
     * Set a new password using a reset token from the password reset email.
     * The token is single-use and time-limited.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ResetPassword.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ResetPassword.Responses.$200>
  }
  ['/v2/users/public/checkToken']: {
    /**
     * checkInviteToken - checkInviteToken
     * 
     * Check an invite token
     */
    'get'(
      parameters?: Parameters<Paths.CheckInviteToken.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CheckInviteToken.Responses.$200>
  }
  ['/v2/users/public/activate']: {
    /**
     * activateUser - activateUser
     * 
     * Activate user using an invite token
     */
    'post'(
      parameters?: Parameters<Paths.ActivateUser.QueryParameters> | null,
      data?: Paths.ActivateUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ActivateUser.Responses.$200>
  }
  ['/v2/users/public/reject']: {
    /**
     * rejectInvite - rejectInvite
     * 
     * Reject an invite
     */
    'delete'(
      parameters?: Parameters<Paths.RejectInvite.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RejectInvite.Responses.$200>
  }
  ['/v2/users/public/username/{username}:getLoginParameters']: {
    /**
     * getUserLoginParametersV2 - getUserLoginParametersV2
     * 
     * Get user organization login parameters by username
     * 
     * The first item in the list corresponds to the user's primary organization and must be used for initial login.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetUserLoginParametersV2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserLoginParametersV2.Responses.$200>
  }
  ['/v2/users/public/passkeys:authenticateBegin']: {
    /**
     * beginPasskeyAuthentication - beginPasskeyAuthentication
     * 
     * Begin passkey authentication flow. Returns WebAuthn options and a signed challenge token.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.BeginPasskeyAuthentication.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BeginPasskeyAuthentication.Responses.$200>
  }
  ['/v2/users/public/passkeys:authenticateBeginDiscoverable']: {
    /**
     * beginDiscoverablePasskeyAuthentication - beginDiscoverablePasskeyAuthentication
     * 
     * Begin discoverable passkey authentication flow (no email required). Returns WebAuthn options with empty allowCredentials for the browser credential picker.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BeginDiscoverablePasskeyAuthentication.Responses.$200>
  }
  ['/v2/users/public/passkeys:resolveCredential']: {
    /**
     * resolveDiscoverableCredential - resolveDiscoverableCredential
     * 
     * Resolve user identity from a discoverable passkey assertion. Returns the user's email and login parameters.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ResolveDiscoverableCredential.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ResolveDiscoverableCredential.Responses.$200>
  }
  ['/v2/users/me/passkeys:registerBegin']: {
    /**
     * beginPasskeyRegistration - beginPasskeyRegistration
     * 
     * Begin passkey registration flow for the authenticated user.
     * Requires the user's own login session; API, agent and assumed (CLI) tokens are refused.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.BeginPasskeyRegistration.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BeginPasskeyRegistration.Responses.$200>
  }
  ['/v2/users/me/passkeys:registerComplete']: {
    /**
     * completePasskeyRegistration - completePasskeyRegistration
     * 
     * Complete passkey registration by verifying the attestation response.
     * Requires the user's own login session; API, agent and assumed (CLI) tokens are refused.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CompletePasskeyRegistration.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompletePasskeyRegistration.Responses.$200>
  }
  ['/v2/users/me/passkeys']: {
    /**
     * listPasskeys - listPasskeys
     * 
     * List all passkeys registered for the authenticated user.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListPasskeys.Responses.$200>
  }
  ['/v2/users/me/passkeys/{credentialId}']: {
    /**
     * deletePasskey - deletePasskey
     * 
     * Delete a passkey by credential ID.
     * Requires the user's own login session; API, agent and assumed (CLI) tokens are refused.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.DeletePasskey.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeletePasskey.Responses.$204>
  }
  ['/v2/users/switchOrganization']: {
    /**
     * switchOrganization - switchOrganization
     * 
     * Switch to another organization the user is part of
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SwitchOrganization.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SwitchOrganization.Responses.$200>
  }
  ['/v2/users/me/organizations/{org_id}/leave']: {
    /**
     * leaveOrganization - leaveOrganization
     * 
     * Leave an organization the calling user is a member of. The user's membership in that organization is
     * deactivated (status `Deactivated`), so it no longer shows up in the org switcher and can't be logged into.
     * An admin of the organization can reactivate it.
     * 
     * Rules:
     * - The user's primary organization can't be left (`cannot_leave_primary_org`)
     * - The last active owner can't leave (`last_owner`), unless the organization is a Preview org or is scheduled
     *   for deletion. Preview orgs can be left at any time.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.LeaveOrganization.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LeaveOrganization.Responses.$204>
  }
  ['/v1/users/me']: {
    /**
     * getMe - getMe
     * 
     * Get currently logged in user
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMe.Responses.$200>
  }
  ['/v1/users']: {
    /**
     * listUsers - listUsers
     * 
     * Lists users in organizations you have access to
     */
    'get'(
      parameters?: Parameters<Paths.ListUsers.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListUsers.Responses.$200>
  }
  ['/v1/users/{id}']: {
    /**
     * getUser - getUser
     * 
     * Get user by id
     */
    'get'(
      parameters?: Parameters<Paths.GetUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUser.Responses.$200>
  }
  ['/v1/users/username/{username}:getLoginParameters']: {
    /**
     * getUserLoginParameters - getUserLoginParameters
     * 
     * Get user organization login parameters by username
     */
    'get'(
      parameters?: Parameters<Paths.GetUserLoginParameters.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserLoginParameters.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type CognitoDetails = Components.Schemas.CognitoDetails;
export type CreateGroupReq = Components.Schemas.CreateGroupReq;
export type DataPoint = Components.Schemas.DataPoint;
export type DataPointsResponse = Components.Schemas.DataPointsResponse;
export type Group = Components.Schemas.Group;
export type GroupId = Components.Schemas.GroupId;
export type GroupImageUri = Components.Schemas.GroupImageUri;
export type Hydrate = Components.Schemas.Hydrate;
export type InviteToken = Components.Schemas.InviteToken;
export type Limit = Components.Schemas.Limit;
export type LoginAsAuditEvent = Components.Schemas.LoginAsAuditEvent;
export type LoginAsAuditPage = Components.Schemas.LoginAsAuditPage;
export type LoginParameters = Components.Schemas.LoginParameters;
export type Navigation = Components.Schemas.Navigation;
export type NavigationConfiguration = Components.Schemas.NavigationConfiguration;
export type NavigationCreateRequest = Components.Schemas.NavigationCreateRequest;
export type NavigationGroupItem = Components.Schemas.NavigationGroupItem;
export type NavigationId = Components.Schemas.NavigationId;
export type NavigationItem = Components.Schemas.NavigationItem;
export type NavigationKeyItem = Components.Schemas.NavigationKeyItem;
export type Offset = Components.Schemas.Offset;
export type OrgActivity = Components.Schemas.OrgActivity;
export type OrgActivityByHour = Components.Schemas.OrgActivityByHour;
export type OrgActivityHeatmap = Components.Schemas.OrgActivityHeatmap;
export type OrgActivitySummary = Components.Schemas.OrgActivitySummary;
export type Organization = Components.Schemas.Organization;
export type OrganizationDetail = Components.Schemas.OrganizationDetail;
export type OrganizationId = Components.Schemas.OrganizationId;
export type PartnerInvitationToken = Components.Schemas.PartnerInvitationToken;
export type Passkey = Components.Schemas.Passkey;
export type PasskeyAuthenticationOptions = Components.Schemas.PasskeyAuthenticationOptions;
export type PasskeyRegistrationOptions = Components.Schemas.PasskeyRegistrationOptions;
export type PasskeyRegistrationResponse = Components.Schemas.PasskeyRegistrationResponse;
export type PlatformActivitySummary = Components.Schemas.PlatformActivitySummary;
export type Query = Components.Schemas.Query;
export type SignupUserPayload = Components.Schemas.SignupUserPayload;
export type UpdateGroupReq = Components.Schemas.UpdateGroupReq;
export type User = Components.Schemas.User;
export type UserActivationPayload = Components.Schemas.UserActivationPayload;
export type UserActivity = Components.Schemas.UserActivity;
export type UserDetail = Components.Schemas.UserDetail;
export type UserId = Components.Schemas.UserId;
export type UserInvitationPayload = Components.Schemas.UserInvitationPayload;
export type UserSetting = Components.Schemas.UserSetting;
export type UserSettingKey = Components.Schemas.UserSettingKey;
export type UserSettingScope = Components.Schemas.UserSettingScope;
export type UserSettingValue = Components.Schemas.UserSettingValue;
export type UserSettingsListResponse = Components.Schemas.UserSettingsListResponse;
export type UserSettingsScopeResponse = Components.Schemas.UserSettingsScopeResponse;
export type UserV2 = Components.Schemas.UserV2;
export type UserVerificationPayload = Components.Schemas.UserVerificationPayload;
export type Username = Components.Schemas.Username;
export type VerificationToken = Components.Schemas.VerificationToken;
