/**
 * Agent Auth Protocol (v1.0-draft) wire types (spec §2, §3).
 *
 * Spec: https://agentauthprotocol.com/specification/v1.0-draft
 */

export interface Ed25519Jwk {
  kty: 'OKP';
  crv: 'Ed25519';
  x: string;
  /** Private scalar; present only in private JWKs. */
  d?: string;
  kid?: string;
}

export interface KeyPair {
  publicKey: Ed25519Jwk;
  privateKey: Ed25519Jwk;
  /** RFC 7638 SHA-256 thumbprint of the public key (the `iss` of JWTs signed with it). */
  thumbprint: string;
}

export type AgentMode = 'delegated' | 'autonomous';
export type AgentStatus = 'pending' | 'active' | 'expired' | 'revoked' | 'rejected' | 'claimed';
export type GrantStatus = 'active' | 'pending' | 'denied';

export type ConstraintOperator = { min?: number; max?: number; in?: unknown[]; not_in?: unknown[] };
export type ConstraintValue = string | number | boolean | null | ConstraintOperator;
export type Constraints = Record<string, ConstraintValue>;

export interface CapabilityRequest {
  name: string;
  constraints?: Constraints;
}

export interface Capability {
  name: string;
  description: string;
  location?: string;
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  grant_status?: 'granted' | 'not_granted';
}

export interface CapabilityGrant {
  id?: string;
  capability: string;
  status: GrantStatus;
  description?: string;
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  constraints?: Constraints;
  granted_by?: string;
  denied_by?: string;
  reason?: string;
  expires_at?: string;
  created_at?: string;
}

export interface DeviceAuthorizationApproval {
  method: 'device_authorization';
  verification_uri: string;
  verification_uri_complete: string;
  user_code: string;
  expires_in: number;
  interval: number;
}

export type Approval = DeviceAuthorizationApproval | { method: string; [key: string]: unknown };

export interface AgentConfiguration {
  version: string;
  provider_name: string;
  description?: string;
  issuer: string;
  default_location: string;
  algorithms: string[];
  modes: AgentMode[];
  approval_methods: string[];
  endpoints: {
    register: string;
    capabilities: string;
    describe_capability: string;
    execute: string;
    request_capability: string;
    status: string;
    reactivate: string;
    revoke: string;
    revoke_host: string;
    rotate_key: string;
    rotate_host_key: string;
    introspect: string;
  };
  jwks_uri?: string;
}

export interface RegisterAgentRequest {
  name: string;
  host_name?: string;
  capabilities: (string | CapabilityRequest)[];
  mode?: AgentMode;
  reason?: string;
  preferred_method?: string;
  login_hint?: string;
  binding_message?: string;
  /**
   * epilot extension: after the user decides on the approval page, the page
   * redirects the browser here (https, or loopback http). Used by the MCP
   * gateway to finish its OAuth flow.
   */
  approval_return_uri?: string;
}

export interface RegisterAgentResponse {
  agent_id: string;
  host_id: string;
  name: string;
  mode: AgentMode;
  status: 'active' | 'pending';
  agent_capability_grants: CapabilityGrant[];
  approval?: Approval;
}

export interface RequestCapabilityRequest {
  capabilities: (string | CapabilityRequest)[];
  reason?: string;
  preferred_method?: string;
  login_hint?: string;
  binding_message?: string;
  approval_return_uri?: string;
}

export interface RequestCapabilityResponse {
  agent_id: string;
  agent_capability_grants: CapabilityGrant[];
  approval?: Approval;
}

export interface AgentStatusResponse {
  agent_id: string;
  host_id: string;
  name: string;
  status: AgentStatus;
  mode: AgentMode;
  agent_capability_grants: CapabilityGrant[];
  user_id?: string;
  activated_at?: string;
  created_at: string;
  last_used_at?: string;
  expires_at?: string;
  approval?: Approval;
}

export interface IntrospectResponse {
  active: boolean;
  agent_id?: string;
  host_id?: string;
  user_id?: string;
  agent_capability_grants?: { capability: string; status: 'active' | 'pending' }[];
  mode?: AgentMode;
  expires_at?: string;
}

export interface ExecuteRequest {
  capability: string;
  arguments?: Record<string, unknown>;
}

/** Host + agent identity the client signs with. */
export interface AgentIdentity {
  hostKey: KeyPair;
  agentKey: KeyPair;
  agentId: string;
}

export class AgentAuthError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'AgentAuthError';
  }
}
