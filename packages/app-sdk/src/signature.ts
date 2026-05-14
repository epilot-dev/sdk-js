import type { IncomingMessage } from 'node:http';
import { verify } from 'node:crypto';

export type PublicKey = {
  algorithm: string;
  issuer: string;
  public_key: string;
};

let cachedPublicKey: string | null = null;

export type HttpRequest = IncomingMessage & { body: string | Buffer };

export type OpenAPIContext = {
  request: {
    headers: Record<string, string | string[] | undefined>;
    requestBody?: unknown;
  };
};

export type SignatureInput = HttpRequest | OpenAPIContext;

function isOpenAPIContext(input: SignatureInput): input is OpenAPIContext {
  return 'request' in input && typeof (input as OpenAPIContext).request?.headers === 'object';
}

function extractSignatureParams(input: SignatureInput) {
  if (isOpenAPIContext(input)) {
    return {
      webhookId: input.request.headers['webhook-id'] as string,
      webhookTimestamp: input.request.headers['webhook-timestamp'] as string,
      webhookSignature: input.request.headers['webhook-signature'] as string,
      payload: JSON.stringify(input.request.requestBody),
    };
  }

  return {
    webhookId: input.headers['webhook-id'] as string,
    webhookTimestamp: input.headers['webhook-timestamp'] as string,
    webhookSignature: input.headers['webhook-signature'] as string,
    payload: input.body,
  };
}

export async function verifyEpilotSignature(input: SignatureInput): Promise<boolean> {
  try {
    const { webhookId, webhookTimestamp, webhookSignature, payload } = extractSignatureParams(input);

    if (!isFreshTimestamp(webhookTimestamp)) return false;

    const publicKeyPem = await getEpilotPublicKey();
    if (!publicKeyPem) return false;

    const signatures = parseSignatures(webhookSignature);
    if (!signatures.v1a) return false;

    const signedContent = constructSignedContent({ webhookId, webhookTimestamp, payload });
    const messageBuffer = Buffer.from(signedContent, 'utf8');
    const signatureBuffer = Buffer.from(signatures.v1a, 'base64');

    return verify(null, messageBuffer, publicKeyPem, signatureBuffer);
  } catch (_error) {
    return false;
  }
}

function isFreshTimestamp(webhookTimestamp: string) {
  const currentTime = Math.floor(Date.now() / 1000);
  const webhookTime = Number.parseInt(webhookTimestamp, 10);
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
