/**
 * @epilot/agent-auth — Agent Auth Protocol (v1.0-draft) client for epilot.
 *
 * Spec: https://agentauthprotocol.com/specification/v1.0-draft
 */
export * from './types.js';
export { generateKeyPair, jwkThumbprint, keyPairFromPrivateJwk, publicJwk } from './keys.js';
export {
  type AgentJwtOptions,
  type HostJwtOptions,
  createAgentJwt,
  createHostJwt,
  decodeJwt,
  signJwt,
} from './jwt.js';
export { AgentAuthClient, type AgentAuthClientOptions, type WaitForApprovalOptions } from './client.js';
export * from './epilot.js';
