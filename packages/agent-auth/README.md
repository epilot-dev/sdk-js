# @epilot/agent-auth

[![npm version](https://img.shields.io/npm/v/@epilot/agent-auth.svg)](https://www.npmjs.com/package/@epilot/agent-auth)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Agent Auth Protocol](https://agentauthprotocol.com/specification/v1.0-draft) (AAP) client for epilot.
Zero runtime dependencies, Node >= 18, ESM + CJS, TypeScript types included.

## What is the Agent Auth Protocol?

AAP makes agents first-class principals instead of anonymous holders of a user's token:

- A **host** (a machine, an application, a runtime) owns an Ed25519 key pair.
- An **agent** is a scoped actor registered under a host with its own Ed25519 key pair. It is `pending` until a
  user approves it, then `active` until it expires or is revoked.
- A **capability** is an action the server offers. A **grant** ties a capability to an agent, optionally with
  **constraints** on the arguments (for epilot: which organization, read-only, anonymized).
- **Host JWTs** (`typ: host+jwt`) authenticate host operations (register, status, revoke, rotate).
  **Agent JWTs** (`typ: agent+jwt`, <= 60 s) authenticate `request-capability` and `execute`.
- **Approval** is RFC 8628 style device authorization: the server returns a `verification_uri_complete` and a
  `user_code`; the user approves in the browser; the client polls `/agent/status`.

epilot's AAP server lives under `https://access-token.sls.epilot.io/v1/agent-auth` and offers two capabilities:

| Capability | Arguments | Result |
| --- | --- | --- |
| `epilot.organizations.list` | — | the linked user's organizations annotated with this agent's grants |
| `epilot.access_token.issue` | `{organization_id, read_only?, anonymize?, expires_in?}` | a short-lived epilot API token for that organization |

Full context: the epilot RFC "Agent Auth Protocol for epilot — agents as first-class principals".

## Install

```bash
npm install @epilot/agent-auth
```

## Keys

```ts
import { generateKeyPair, keyPairFromPrivateJwk, jwkThumbprint } from '@epilot/agent-auth';

const hostKey = generateKeyPair(); // { publicKey, privateKey, thumbprint }
// Persist hostKey.privateKey (a private Ed25519 JWK) with mode 0600, then later:
const restored = keyPairFromPrivateJwk(storedPrivateJwk);
jwkThumbprint(hostKey.publicKey); // RFC 7638 SHA-256 thumbprint, the `iss` of your JWTs
```

## JWTs

```ts
import { createHostJwt, createAgentJwt, decodeJwt } from '@epilot/agent-auth';

// Host JWT: iss = host thumbprint, carries host_public_key (and agent_public_key when registering)
const hostJwt = createHostJwt({ hostKey, audience: issuer, agentPublicKey: agentKey.publicKey });

// Agent JWT: iss = host thumbprint, sub = agent id, aud = capability location, exp <= 60 s
const agentJwt = createAgentJwt({
  agentKey,
  hostThumbprint: hostKey.thumbprint,
  agentId,
  audience: executeUrl,
  capabilities: ['epilot.organizations.list'], // optional narrowing
});

decodeJwt(agentJwt); // { header, payload } — no verification, for debugging
```

You normally do not build JWTs yourself; `AgentAuthClient` does it for every call.

## AgentAuthClient

```ts
import { AgentAuthClient, epilotAgentAuthIssuer } from '@epilot/agent-auth';

const client = new AgentAuthClient({
  baseUrl: epilotAgentAuthIssuer('production'), // or 'staging' | 'dev'
  // fetch?: custom fetch, discoveryTtlMs?: 3_600_000, timeoutMs?: 15_000
});
```

| Method | Auth | Description |
| --- | --- | --- |
| `discover(force?)` | none | `GET /.well-known/agent-configuration`, cached for `discoveryTtlMs` |
| `endpoint(name)` | — | resolve an endpoint URL from discovery |
| `registerAgent(hostKey, agentKey, body)` | host JWT | register an agent; returns grants and an `approval` when pending |
| `requestCapability(identity, body)` | agent JWT | ask for more grants; returns the new grants and an `approval` |
| `getAgentStatus(hostKey, agentId)` | host JWT | full agent state incl. grants |
| `waitForApproval(hostKey, agentId, approval, options?)` | host JWT | poll status at `approval.interval` until active (or until `options.pendingGrantIds` are decided); throws `approval_expired` |
| `execute(identity, { capability, arguments }, location?)` | agent JWT | run a capability; unwraps `{data}` |
| `listCapabilities(auth?, query?)` / `describeCapability(name, auth?)` | optional | capability catalogue, with grant status when authenticated |
| `revokeAgent` / `reactivateAgent` / `rotateAgentKey` | host JWT | agent lifecycle |
| `rotateHostKey` / `revokeHost` | host JWT | host lifecycle (revoking a host revokes its agents) |
| `introspect(token, bearer?)` | server bearer | server-to-server validation of an agent JWT |

`identity` is `{ hostKey, agentKey, agentId }`. Every error is an `AgentAuthError` with `status`, `code`
(the server's `error`, e.g. `constraint_violated`, `agent_revoked`, or `network_error`), `message` and `details`.

## epilot helpers

```ts
import {
  EPILOT_CAPABILITIES, // { organizationsList: 'epilot.organizations.list', accessTokenIssue: 'epilot.access_token.issue' }
  organizationAccessCapability, // build an `epilot.access_token.issue` request with constraints
  listEpilotOrganizations, // execute epilot.organizations.list
  issueEpilotAccessToken, // execute epilot.access_token.issue
  organizationGrants, // map grants to { organizationId, readOnly, anonymized }
  epilotAgentAuthIssuer, // issuer URL per stage
} from '@epilot/agent-auth';

organizationAccessCapability({ organizationId: '739224', readOnly: true, anonymize: true });
// → { name: 'epilot.access_token.issue', constraints: { organization_id: '739224', read_only: true, anonymize: true } }
organizationAccessCapability(); // no constraints: the approval page grants the user's login organization
```

## Full example flow

```ts
import {
  AgentAuthClient,
  EPILOT_CAPABILITIES,
  epilotAgentAuthIssuer,
  generateKeyPair,
  issueEpilotAccessToken,
  listEpilotOrganizations,
  organizationAccessCapability,
} from '@epilot/agent-auth';
import { hostname } from 'node:os';

const client = new AgentAuthClient({ baseUrl: epilotAgentAuthIssuer() });
const hostKey = generateKeyPair(); // persist this once per machine
const agentKey = generateKeyPair(); // one per agent

// 1. Register the agent. The user has not approved anything yet → status "pending".
const registration = await client.registerAgent(hostKey, agentKey, {
  name: `my-agent @ ${hostname()}`,
  host_name: hostname(),
  mode: 'delegated',
  reason: 'Sync contacts nightly',
  capabilities: [
    EPILOT_CAPABILITIES.organizationsList,
    organizationAccessCapability({ readOnly: true, anonymize: true }),
  ],
});
const identity = { hostKey, agentKey, agentId: registration.agent_id };

// 2. Send the user to the approval page and wait.
if (registration.approval?.method === 'device_authorization') {
  console.log(`Open ${registration.approval.verification_uri_complete}`);
  console.log(`Code: ${registration.approval.user_code}`);
  await client.waitForApproval(hostKey, identity.agentId, registration.approval);
}

// 3. Which organizations may this agent access?
const { organizations } = await listEpilotOrganizations(client, identity);
const org = organizations.find((o) => o.access.granted)!;

// 4. Mint an epilot API token (short-lived; call again whenever it expires).
const issued = await issueEpilotAccessToken(client, identity, { organization_id: org.organization_id });
console.log(issued.token, issued.expires_at);

// 5. Later: ask for more (write access to another organization). The user approves again in the browser.
const request = await client.requestCapability(identity, {
  capabilities: [organizationAccessCapability({ organizationId: '911210', readOnly: false })],
  reason: 'Import meter readings',
});
await client.waitForApproval(hostKey, identity.agentId, request.approval as never, {
  pendingGrantIds: request.agent_capability_grants.map((g) => g.id!).filter(Boolean),
});

// 6. Done with this agent.
await client.revokeAgent(hostKey, identity.agentId);
```

## License

MIT
