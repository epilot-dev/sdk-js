---
"@epilot/access-token-client": minor
"@epilot/address-client": minor
"@epilot/address-suggestions-client": minor
"@epilot/ai-agents-client": minor
"@epilot/app-client": minor
"@epilot/app-sdk": minor
"@epilot/audit-logs-client": minor
"@epilot/automation-client": minor
"@epilot/billing-client": minor
"@epilot/blueprint-manifest-client": minor
"@epilot/calendar-client": minor
"@epilot/configuration-hub-client": minor
"@epilot/consent-client": minor
"@epilot/customer-portal-client": minor
"@epilot/dashboard-client": minor
"@epilot/data-governance-client": minor
"@epilot/deduplication-client": minor
"@epilot/design-client": minor
"@epilot/document-client": minor
"@epilot/email-settings-client": minor
"@epilot/email-template-client": minor
"@epilot/entity-client": minor
"@epilot/entity-mapping-client": minor
"@epilot/environments-client": minor
"@epilot/event-catalog-client": minor
"@epilot/file-client": minor
"@epilot/iban-client": minor
"@epilot/integration-toolkit-client": minor
"@epilot/journey-client": minor
"@epilot/kanban-client": minor
"@epilot/message-client": minor
"@epilot/metering-client": minor
"@epilot/notes-client": minor
"@epilot/notification-client": minor
"@epilot/organization-client": minor
"@epilot/partner-directory-client": minor
"@epilot/permissions-client": minor
"@epilot/pricing-client": minor
"@epilot/pricing-tier-client": minor
"@epilot/purpose-client": minor
"@epilot/query-client": minor
"@epilot/sandbox-client": minor
"@epilot/sharing-client": minor
"@epilot/snapshot-client": minor
"@epilot/submission-client": minor
"@epilot/targeting-client": minor
"@epilot/template-variables-client": minor
"@epilot/user-client": minor
"@epilot/validation-rules-client": minor
"@epilot/webhooks-client": minor
"@epilot/workflow-client": minor
"@epilot/workflow-definition-client": minor
---

Remove node polyfills (`buffer`, `url`, `util`, `stream-http`, `https-browserify`) from these packages' runtime `dependencies`, and drop the unused `openapi-backend` from `@epilot/journey-client` and `@epilot/validation-rules-client`. No client imports any of them — they were installed for consumers' bundlers, not for the clients themselves.

**Action required if your bundler config resolves these modules.** Webpack setups commonly reference them from `resolve.fallback` / `resolve.alias` (for example `require.resolve('https-browserify')` or `require.resolve('util/')`) while relying on them being hoisted from an `@epilot/*-client`. After this release they are gone from the dependency tree, and such a config fails when webpack loads it. Declare the polyfills you use directly in your own `package.json`.

Also moves `msw` to `devDependencies` in `@epilot/app-sdk` (test-only), and moves `openapi-client-axios` from `devDependencies` to `dependencies` in `@epilot/automation-client`, which imports it at runtime from `src/client.ts` — that package was previously unusable on a clean install unless the consumer happened to provide it.
