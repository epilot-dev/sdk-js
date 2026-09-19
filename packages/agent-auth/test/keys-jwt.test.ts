import { createHash, createPublicKey, verify } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  createAgentJwt,
  createHostJwt,
  decodeJwt,
  generateKeyPair,
  jwkThumbprint,
  keyPairFromPrivateJwk,
  publicJwk,
} from '../src/index.js';

const verifyEdDsa = (jwt: string, publicKeyJwk: { kty: string; crv: string; x: string }): boolean => {
  const [header, payload, signature] = jwt.split('.');
  const key = createPublicKey({ key: publicKeyJwk, format: 'jwk' });
  return verify(null, Buffer.from(`${header}.${payload}`), key, Buffer.from(signature, 'base64url'));
};

describe('keys', () => {
  it('generates an Ed25519 key pair with public/private JWKs', () => {
    const pair = generateKeyPair();
    expect(pair.publicKey).toEqual({ kty: 'OKP', crv: 'Ed25519', x: pair.privateKey.x });
    expect(pair.privateKey.d).toBeTypeOf('string');
    expect(pair.publicKey).not.toHaveProperty('d');
    expect(pair.thumbprint).toBe(jwkThumbprint(pair.publicKey));
  });

  it('computes the RFC 7638 thumbprint for a known Ed25519 JWK', () => {
    // RFC 8037 appendix A.1 test key
    const jwk = { kty: 'OKP', crv: 'Ed25519', x: '11qYAYKxCrfVS_7TyWQHOg7hcvPapiMlrwIaaPcHURo' } as const;
    // The thumbprint input is the JSON with required members in lexicographic order and no whitespace.
    const expected = createHash('sha256')
      .update('{"crv":"Ed25519","kty":"OKP","x":"11qYAYKxCrfVS_7TyWQHOg7hcvPapiMlrwIaaPcHURo"}')
      .digest('base64url');
    expect(jwkThumbprint(jwk)).toBe(expected);
    // Known value from RFC 8037 §A.3
    expect(jwkThumbprint(jwk)).toBe('kPrK_qmxVWaYVA9wwBF6Iuo3vVzz7TxHCTwXBygrS4k');
  });

  it('rebuilds a key pair from a stored private JWK and rejects public-only JWKs', () => {
    const pair = generateKeyPair();
    const restored = keyPairFromPrivateJwk(pair.privateKey);
    expect(restored).toEqual(pair);
    expect(() => keyPairFromPrivateJwk(publicJwk(pair.privateKey))).toThrow(/private/);
  });
});

describe('JWTs', () => {
  const hostKey = generateKeyPair();
  const agentKey = generateKeyPair();

  it('creates a host JWT with the spec header/claims and a valid Ed25519 signature', () => {
    const jwt = createHostJwt({ hostKey, audience: 'https://aap.example/v1', agentPublicKey: agentKey.publicKey });
    const { header, payload } = decodeJwt(jwt);
    expect(header).toEqual({ alg: 'EdDSA', typ: 'host+jwt' });
    expect(payload.iss).toBe(hostKey.thumbprint);
    expect(payload.aud).toBe('https://aap.example/v1');
    expect(payload.host_public_key).toEqual(hostKey.publicKey);
    expect(payload.agent_public_key).toEqual(agentKey.publicKey);
    expect(payload.jti).toMatch(/^[0-9a-f-]{36}$/);
    expect((payload.exp as number) - (payload.iat as number)).toBe(60);
    expect(verifyEdDsa(jwt, hostKey.publicKey)).toBe(true);
    expect(verifyEdDsa(jwt, agentKey.publicKey)).toBe(false);
  });

  it('omits agent_public_key when not registering', () => {
    const { payload } = decodeJwt(createHostJwt({ hostKey, audience: 'https://aap.example/v1' }));
    expect(payload).not.toHaveProperty('agent_public_key');
  });

  it('creates an agent JWT signed by the agent key, issued by the host thumbprint, capped at 60 s', () => {
    const jwt = createAgentJwt({
      agentKey,
      hostThumbprint: hostKey.thumbprint,
      agentId: 'agent_123',
      audience: 'https://aap.example/v1/capability/execute',
      capabilities: ['epilot.organizations.list'],
      ttlSeconds: 600,
    });
    const { header, payload } = decodeJwt(jwt);
    expect(header).toEqual({ alg: 'EdDSA', typ: 'agent+jwt' });
    expect(payload.iss).toBe(hostKey.thumbprint);
    expect(payload.sub).toBe('agent_123');
    expect(payload.aud).toBe('https://aap.example/v1/capability/execute');
    expect(payload.capabilities).toEqual(['epilot.organizations.list']);
    expect((payload.exp as number) - (payload.iat as number)).toBe(60);
    expect(verifyEdDsa(jwt, agentKey.publicKey)).toBe(true);
  });
});
