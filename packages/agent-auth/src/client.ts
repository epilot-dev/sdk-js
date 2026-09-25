/**
 * Agent Auth Protocol HTTP client (spec §4). Uses the global fetch (Node >= 18).
 */
import { createAgentJwt, createHostJwt } from './jwt.js';
import {
  type AgentConfiguration,
  type AgentIdentity,
  type AgentStatusResponse,
  AgentAuthError,
  type Capability,
  type DeviceAuthorizationApproval,
  type ExecuteRequest,
  type IntrospectResponse,
  type KeyPair,
  type RegisterAgentRequest,
  type RegisterAgentResponse,
  type RequestCapabilityRequest,
  type RequestCapabilityResponse,
} from './types.js';

export interface AgentAuthClientOptions {
  /** Server base URL, e.g. https://access-token.sls.epilot.io/v1/access-tokens/agent-auth. */
  baseUrl: string;
  fetch?: typeof fetch;
  /** Discovery cache TTL; the spec default is one hour. */
  discoveryTtlMs?: number;
  timeoutMs?: number;
}

export interface WaitForApprovalOptions {
  signal?: AbortSignal;
  onPoll?: (status: AgentStatusResponse) => void;
  /** Wait until none of these grants is pending instead of until the agent leaves `pending`. */
  pendingGrantIds?: string[];
}

const trimSlash = (value: string) => value.replace(/\/+$/, '');

const safeJson = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
};

export class AgentAuthClient {
  readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;
  private readonly discoveryTtlMs: number;
  private readonly timeoutMs: number;
  private discovery?: { value: AgentConfiguration; fetchedAt: number };

  constructor(options: AgentAuthClientOptions) {
    this.baseUrl = trimSlash(options.baseUrl);
    this.fetchImpl = options.fetch ?? fetch;
    this.discoveryTtlMs = options.discoveryTtlMs ?? 3_600_000;
    this.timeoutMs = options.timeoutMs ?? 15_000;
  }

  /** GET /.well-known/agent-configuration (cached). */
  async discover(force = false): Promise<AgentConfiguration> {
    if (!force && this.discovery && Date.now() - this.discovery.fetchedAt < this.discoveryTtlMs) {
      return this.discovery.value;
    }
    const value = (await this.request('GET', `${this.baseUrl}/.well-known/agent-configuration`)) as AgentConfiguration;
    this.discovery = { value, fetchedAt: Date.now() };
    return value;
  }

  /** Resolve an endpoint from discovery; relative paths are resolved against the issuer. */
  async endpoint(name: keyof AgentConfiguration['endpoints']): Promise<string> {
    const config = await this.discover();
    const path = config.endpoints[name];
    return /^https?:\/\//.test(path) ? path : `${trimSlash(config.issuer)}${path.startsWith('/') ? '' : '/'}${path}`;
  }

  /** POST /agent/register with a host JWT that carries the agent's public key. */
  async registerAgent(hostKey: KeyPair, agentKey: KeyPair, body: RegisterAgentRequest): Promise<RegisterAgentResponse> {
    const config = await this.discover();
    const jwt = createHostJwt({ hostKey, audience: config.issuer, agentPublicKey: agentKey.publicKey });
    return this.request('POST', await this.endpoint('register'), body, jwt) as Promise<RegisterAgentResponse>;
  }

  /** POST /agent/request-capability with an agent JWT. */
  async requestCapability(identity: AgentIdentity, body: RequestCapabilityRequest): Promise<RequestCapabilityResponse> {
    const config = await this.discover();
    const jwt = createAgentJwt({
      agentKey: identity.agentKey,
      hostThumbprint: identity.hostKey.thumbprint,
      agentId: identity.agentId,
      audience: config.issuer,
    });
    return this.request(
      'POST',
      await this.endpoint('request_capability'),
      body,
      jwt,
    ) as Promise<RequestCapabilityResponse>;
  }

  /** GET /agent/status?agent_id=… with a host JWT. */
  async getAgentStatus(hostKey: KeyPair, agentId: string): Promise<AgentStatusResponse> {
    const config = await this.discover();
    const jwt = createHostJwt({ hostKey, audience: config.issuer });
    const url = new URL(await this.endpoint('status'));
    url.searchParams.set('agent_id', agentId);
    return this.request('GET', url.toString(), undefined, jwt) as Promise<AgentStatusResponse>;
  }

  /**
   * Poll /agent/status until the agent leaves `pending` (or, when `pendingGrantIds`
   * is given, until none of those grants is pending). Honors the approval
   * interval and stops at the approval expiry.
   */
  async waitForApproval(
    hostKey: KeyPair,
    agentId: string,
    approval: Pick<DeviceAuthorizationApproval, 'interval' | 'expires_in'> | undefined,
    options: WaitForApprovalOptions = {},
  ): Promise<AgentStatusResponse> {
    const intervalMs = Math.max(1, approval?.interval ?? 5) * 1000;
    const deadline = Date.now() + (approval?.expires_in ?? 600) * 1000;
    for (;;) {
      if (options.signal?.aborted) throw new AgentAuthError(499, 'aborted', 'Approval wait was aborted.');
      const status = await this.getAgentStatus(hostKey, agentId);
      options.onPoll?.(status);
      const stillPending = options.pendingGrantIds?.length
        ? status.agent_capability_grants.some(
            (grant) => grant.id && options.pendingGrantIds?.includes(grant.id) && grant.status === 'pending',
          )
        : status.status === 'pending';
      if (!stillPending) return status;
      if (Date.now() + intervalMs > deadline) {
        throw new AgentAuthError(408, 'approval_expired', 'The user did not approve the request in time.');
      }
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
  }

  /** POST /capability/execute with an agent JWT whose `aud` is the capability location. */
  async execute<T = unknown>(identity: AgentIdentity, body: ExecuteRequest, location?: string): Promise<T> {
    const target = location ?? (await this.discover()).default_location;
    const jwt = createAgentJwt({
      agentKey: identity.agentKey,
      hostThumbprint: identity.hostKey.thumbprint,
      agentId: identity.agentId,
      audience: target,
      capabilities: [body.capability],
    });
    const result = (await this.request('POST', target, body, jwt)) as { data?: T; status?: string; result?: T };
    if (result && typeof result === 'object' && 'data' in result) return result.data as T;
    if (result?.status === 'completed') return result.result as T;
    return result as unknown as T;
  }

  /** GET /capability/list — anonymous, or with grant status when authenticated. */
  async listCapabilities(
    auth?: { hostKey: KeyPair } | AgentIdentity,
    query: { query?: string; cursor?: string; limit?: number } = {},
  ): Promise<{ capabilities: Capability[]; next_cursor?: string; has_more: boolean }> {
    const config = await this.discover();
    const url = new URL(await this.endpoint('capabilities'));
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
    const jwt = auth ? this.jwtFor(auth, config.issuer) : undefined;
    return this.request('GET', url.toString(), undefined, jwt) as Promise<{
      capabilities: Capability[];
      next_cursor?: string;
      has_more: boolean;
    }>;
  }

  /** GET /capability/describe?name=… */
  async describeCapability(name: string, auth?: { hostKey: KeyPair } | AgentIdentity): Promise<Capability> {
    const config = await this.discover();
    const url = new URL(await this.endpoint('describe_capability'));
    url.searchParams.set('name', name);
    const jwt = auth ? this.jwtFor(auth, config.issuer) : undefined;
    return this.request('GET', url.toString(), undefined, jwt) as Promise<Capability>;
  }

  async reactivateAgent(hostKey: KeyPair, agentId: string): Promise<AgentStatusResponse> {
    return this.hostPost('reactivate', hostKey, { agent_id: agentId }) as Promise<AgentStatusResponse>;
  }

  async revokeAgent(hostKey: KeyPair, agentId: string): Promise<{ agent_id: string; status: 'revoked' }> {
    return this.hostPost('revoke', hostKey, { agent_id: agentId }) as Promise<{ agent_id: string; status: 'revoked' }>;
  }

  async rotateAgentKey(
    hostKey: KeyPair,
    agentId: string,
    newAgentKey: KeyPair,
  ): Promise<{ agent_id: string; status: string }> {
    return this.hostPost('rotate_key', hostKey, { agent_id: agentId, public_key: newAgentKey.publicKey }) as Promise<{
      agent_id: string;
      status: string;
    }>;
  }

  async rotateHostKey(hostKey: KeyPair, newHostKey: KeyPair): Promise<{ host_id: string; status: string }> {
    return this.hostPost('rotate_host_key', hostKey, { public_key: newHostKey.publicKey }) as Promise<{
      host_id: string;
      status: string;
    }>;
  }

  async revokeHost(hostKey: KeyPair): Promise<{ host_id: string; status: 'revoked'; agents_revoked: number }> {
    return this.hostPost('revoke_host', hostKey, {}) as Promise<{
      host_id: string;
      status: 'revoked';
      agents_revoked: number;
    }>;
  }

  /** Server-to-server: validate an agent JWT. `bearer` is whatever the server requires (epilot: an epilot token). */
  async introspect(token: string, bearer?: string): Promise<IntrospectResponse> {
    return this.request('POST', await this.endpoint('introspect'), { token }, bearer) as Promise<IntrospectResponse>;
  }

  private jwtFor(auth: { hostKey: KeyPair } | AgentIdentity, audience: string) {
    return 'agentId' in auth
      ? createAgentJwt({
          agentKey: auth.agentKey,
          hostThumbprint: auth.hostKey.thumbprint,
          agentId: auth.agentId,
          audience,
        })
      : createHostJwt({ hostKey: auth.hostKey, audience });
  }

  private async hostPost(name: keyof AgentConfiguration['endpoints'], hostKey: KeyPair, body: unknown) {
    const config = await this.discover();
    const jwt = createHostJwt({ hostKey, audience: config.issuer });
    return this.request('POST', await this.endpoint(name), body, jwt);
  }

  private async request(method: string, url: string, body?: unknown, bearer?: string): Promise<unknown> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    let response: Response;
    try {
      response = await this.fetchImpl(url, {
        method,
        headers: {
          accept: 'application/json',
          ...(body !== undefined ? { 'content-type': 'application/json' } : {}),
          ...(bearer ? { authorization: `Bearer ${bearer}` } : {}),
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
    } catch (error) {
      throw new AgentAuthError(0, 'network_error', `Agent Auth request failed: ${String(error)}`);
    } finally {
      clearTimeout(timer);
    }
    const text = await response.text();
    const json = text ? safeJson(text) : undefined;
    if (!response.ok) {
      const error = (json ?? {}) as { error?: string; message?: string; error_description?: string } & Record<
        string,
        unknown
      >;
      throw new AgentAuthError(
        response.status,
        error.error ?? `http_${response.status}`,
        error.message ?? error.error_description ?? `Agent Auth server responded with ${response.status}.`,
        error,
      );
    }
    return json;
  }
}
