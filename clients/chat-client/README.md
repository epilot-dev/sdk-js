# @epilot/chat-client

Generated TypeScript client for epilot Chat API widget management and public chat.

## Usage

```ts
import { createClient } from '@epilot/chat-client';

const chat = createClient();
chat.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
const { data } = await chat.listChatWidgets();
const { data: widget } = await chat.getChatWidget({ widget_id });

await chat.updateChatWidget({ widget_id }, {
  version: widget.version,
  website_chat: {
    ...widget.website_chat,
    design_id,
    authentication: { email_code: { email_template_id } },
  },
});
```

The same API is available as `epilot.chat` from `@epilot/sdk`, or through the
`@epilot/sdk/chat` entry point. The standalone package also exports `getClient()`
for callers that want a shared singleton.

Use a separate `createClient()` instance for anonymous chat. Bootstrap and session
creation use no epilot access token; `sendAnonymousChatMessage` uses the anonymous
session token. Its response is SSE: request `responseType: 'stream'` in Node and
consume the stream, or use a streaming fetch transport in the browser. The client
does not parse SSE events or implement the host/iframe handoff protocol.

## Regeneration

Until the service publishes a combined OpenAPI document, generate from its local
checkout. Both public and management definitions remain owned by chat-api.

```bash
# In chat-api, regenerate and validate its source definitions first.
pnpm generate && pnpm validate

# In sdk-js/clients/chat-client:
npm run openapi -- /path/to/chat-api
npm run typegen
npm run build
npm test

# Optional local unified SDK verification, from sdk-js/packages/epilot-sdk-v2:
pnpm generate && pnpm build && pnpm test
```

The update script combines the two generated service definitions, retains their
separate authentication requirements, and namespaces the public error schema.
Do not edit the generated JSON or declaration files manually.

Commit the client source and workspace lockfile. CI discovers new clients and
generates the SDK v2 wrappers, exports, and docs before testing; the release job
commits those generated files. They do not need to be included in the client PR.
