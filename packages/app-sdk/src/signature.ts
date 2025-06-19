import { IncomingMessage } from 'http';
import { verify } from 'node:crypto';

export type PublicKey = {
  algorithm: string;
  issuer: string;
  public_key: string;
};

let cachedPublicKey: string | null = null;

export type HttpRequest = IncomingMessage & { body: string | Buffer };

export async function verifyEpilotSignature(req: HttpRequest): Promise<boolean> {
  try {
    const webhookId = req.headers['webhook-id'] as string;
    const webhookTimestamp = req.headers['webhook-timestamp'] as string;
    const webhookSignature = req.headers['webhook-signature'] as string;

    if (!isFreshTimestamp(webhookTimestamp)) return false;

    const publicKeyPem = await getEpilotPublicKey();
    if (!publicKeyPem) return false;

    const signatures = parseSignatures(webhookSignature);
    if (!signatures.v1a) return false;

    const signedContent = constructSignedContent({ webhookId, webhookTimestamp, payload: req.body });
    const messageBuffer = Buffer.from(signedContent, 'utf8');
    const signatureBuffer = Buffer.from(signatures.v1a, 'base64');

    return verify(null, messageBuffer, publicKeyPem, signatureBuffer);
  } catch (error) {
    return false;
  }
}

function isFreshTimestamp(webhookTimestamp: string) {
  const currentTime = Math.floor(Date.now() / 1000);
  const webhookTime = Number.parseInt(webhookTimestamp);
  const tolerance = 300; // 5 minutes

  return Math.abs(currentTime - webhookTime) <= tolerance;
}

export async function getEpilotPublicKey(): Promise<string | null> {
  if (!cachedPublicKey) {
    const response = await fetch('https://cdn.app.sls.epilot.io/v1/.well-known/public-key');
    if (!response.ok) return null;
    const json = (await response.json()) as PublicKey;
    cachedPublicKey = json.public_key;
  }

  return cachedPublicKey;
}

function parseSignatures(webhookSignature: string): Record<string, string> {
  const signatures: Record<string, string> = {};
  for (const part of webhookSignature.split(' ')) {
    const [version, signature] = part.split(',', 2);
    if (version && signature) {
      signatures[version] = signature;
    }
  }

  return signatures;
}

function constructSignedContent(params: {
  webhookId: string;
  webhookTimestamp: string;
  payload: string | Buffer;
}): string {
  return [params.webhookId, params.webhookTimestamp, params.payload].join('.');
}
