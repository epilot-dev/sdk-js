/**
 * Ed25519 key handling (spec §3.1): key generation and RFC 7638 thumbprints.
 * Uses node:crypto only — no runtime dependencies.
 */
import { createHash, generateKeyPairSync } from 'node:crypto';
import type { Ed25519Jwk, KeyPair } from './types.js';

/** RFC 7638 thumbprint: SHA-256 over the lexicographically ordered required members. */
export const jwkThumbprint = (jwk: Pick<Ed25519Jwk, 'crv' | 'kty' | 'x'>): string =>
  createHash('sha256')
    .update(JSON.stringify({ crv: jwk.crv, kty: jwk.kty, x: jwk.x }))
    .digest('base64url');

/** Strip the private scalar (and any kid) from a JWK. */
export const publicJwk = (jwk: Ed25519Jwk): Ed25519Jwk => ({ kty: 'OKP', crv: 'Ed25519', x: jwk.x });

/** Generate a fresh Ed25519 key pair. */
export const generateKeyPair = (): KeyPair => {
  const { privateKey } = generateKeyPairSync('ed25519');
  const jwk = privateKey.export({ format: 'jwk' }) as { kty: string; crv: string; x: string; d: string };
  const privateJwk: Ed25519Jwk = { kty: 'OKP', crv: 'Ed25519', x: jwk.x, d: jwk.d };
  return { publicKey: publicJwk(privateJwk), privateKey: privateJwk, thumbprint: jwkThumbprint(privateJwk) };
};

/** Rebuild a KeyPair from a stored private JWK. */
export const keyPairFromPrivateJwk = (privateJwk: Ed25519Jwk): KeyPair => {
  if (!privateJwk.d) throw new Error('A private Ed25519 JWK (with "d") is required.');
  return { publicKey: publicJwk(privateJwk), privateKey: privateJwk, thumbprint: jwkThumbprint(privateJwk) };
};
