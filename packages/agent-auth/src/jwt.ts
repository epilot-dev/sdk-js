/**
 * Host and agent JWTs (spec §3.2, §3.3), signed with EdDSA over Ed25519.
 */
import { createPrivateKey, randomUUID, sign as cryptoSign } from 'node:crypto';
import { publicJwk } from './keys.js';
import type { Ed25519Jwk, KeyPair } from './types.js';

const b64url = (input: Buffer | string) => Buffer.from(input).toString('base64url');

const nowSeconds = () => Math.floor(Date.now() / 1000);

/** Sign a compact JWS with the given private Ed25519 JWK. `alg` is always EdDSA. */
export const signJwt = (
  privateJwk: Ed25519Jwk,
  header: Record<string, unknown>,
  payload: Record<string, unknown>,
): string => {
  const key = createPrivateKey({
    key: { kty: 'OKP', crv: 'Ed25519', x: privateJwk.x, d: privateJwk.d },
    format: 'jwk',
  });
  const encodedHeader = b64url(JSON.stringify({ alg: 'EdDSA', ...header }));
  const encodedPayload = b64url(JSON.stringify(payload));
  const signature = cryptoSign(null, Buffer.from(`${encodedHeader}.${encodedPayload}`), key);
  return `${encodedHeader}.${encodedPayload}.${b64url(signature)}`;
};

export interface HostJwtOptions {
  hostKey: KeyPair;
  /** Server issuer URL (the `aud`). */
  audience: string;
  /** Include for registration requests: the new agent's public key. */
  agentPublicKey?: Ed25519Jwk;
  ttlSeconds?: number;
}

/** Host JWT (spec §3.2): typ host+jwt, iss = host thumbprint, inline host_public_key. */
export const createHostJwt = ({ hostKey, audience, agentPublicKey, ttlSeconds = 60 }: HostJwtOptions): string => {
  const iat = nowSeconds();
  return signJwt(
    hostKey.privateKey,
    { typ: 'host+jwt' },
    {
      iss: hostKey.thumbprint,
      aud: audience,
      iat,
      exp: iat + ttlSeconds,
      jti: randomUUID(),
      host_public_key: hostKey.publicKey,
      ...(agentPublicKey ? { agent_public_key: publicJwk(agentPublicKey) } : {}),
    },
  );
};

export interface AgentJwtOptions {
  agentKey: KeyPair;
  /** Thumbprint of the host's current signing key (the `iss`). */
  hostThumbprint: string;
  agentId: string;
  /** Capability location or server issuer (the `aud`). */
  audience: string;
  /** Optional restriction of this token to a subset of granted capabilities. */
  capabilities?: string[];
  ttlSeconds?: number;
}

/** Agent JWT (spec §3.3): typ agent+jwt, iss = host thumbprint, sub = agent id, exp <= 60 s. */
export const createAgentJwt = ({
  agentKey,
  hostThumbprint,
  agentId,
  audience,
  capabilities,
  ttlSeconds = 60,
}: AgentJwtOptions): string => {
  const iat = nowSeconds();
  return signJwt(
    agentKey.privateKey,
    { typ: 'agent+jwt' },
    {
      iss: hostThumbprint,
      sub: agentId,
      aud: audience,
      iat,
      exp: iat + Math.min(ttlSeconds, 60),
      jti: randomUUID(),
      ...(capabilities ? { capabilities } : {}),
    },
  );
};

/** Decode a compact JWT without verifying it (header + payload). */
export const decodeJwt = (jwt: string): { header: Record<string, unknown>; payload: Record<string, unknown> } => {
  const [header, payload] = jwt.split('.');
  return {
    header: JSON.parse(Buffer.from(header, 'base64url').toString('utf8')),
    payload: JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')),
  };
};
