# epilot CLI — API Reference

All 47 epilot APIs available via the CLI.

## Setup

```bash
npx epilot auth login
```

## APIs

| API | Command | Operations | Docs |
| --- | ------- | ---------- | ---- |
| Access Token API | `epilot access-token` | 7 | [access-token.md](./access-token.md) |
| Address API | `epilot address` | 3 | [address.md](./address.md) |
| Address Suggestions API | `epilot address-suggestions` | 4 | [address-suggestions.md](./address-suggestions.md) |
| AI Agents API - OpenAPI 3.0 | `epilot ai-agents` | 12 | [ai-agents.md](./ai-agents.md) |
| App API | `epilot app` | 30 | [app.md](./app.md) |
| Audit Log | `epilot audit-logs` | 2 | [audit-logs.md](./audit-logs.md) |
| Automation API | `epilot automation` | 16 | [automation.md](./automation.md) |
| Billing API | `epilot billing` | 10 | [billing.md](./billing.md) |
| Blueprint Manifest API | `epilot blueprint-manifest` | 45 | [blueprint-manifest.md](./blueprint-manifest.md) |
| Consent API | `epilot consent` | 3 | [consent.md](./consent.md) |
| Portal API | `epilot customer-portal` | 138 | [customer-portal.md](./customer-portal.md) |
| Dashboard API | `epilot dashboard` | 7 | [dashboard.md](./dashboard.md) |
| Data Governance API | `epilot data-governance` | 10 | [data-governance.md](./data-governance.md) |
| Deduplication API | `epilot deduplication` | 3 | [deduplication.md](./deduplication.md) |
| Design Builder API v2 | `epilot design` | 13 | [design.md](./design.md) |
| Document API | `epilot document` | 3 | [document.md](./document.md) |
| Messaging Settings API | `epilot email-settings` | 35 | [email-settings.md](./email-settings.md) |
| Email template API | `epilot email-template` | 7 | [email-template.md](./email-template.md) |
| Entity API | `epilot entity` | 84 | [entity.md](./entity.md) |
| Entity Mapping API | `epilot entity-mapping` | 12 | [entity-mapping.md](./entity-mapping.md) |
| Environments API | `epilot environments` | 8 | [environments.md](./environments.md) |
| Event Catalog API | `epilot event-catalog` | 7 | [event-catalog.md](./event-catalog.md) |
| File API | `epilot file` | 27 | [file.md](./file.md) |
| Iban API | `epilot iban` | 1 | [iban.md](./iban.md) |
| Integration Toolkit API | `epilot integration-toolkit` | 43 | [integration-toolkit.md](./integration-toolkit.md) |
| Journey API | `epilot journey` | 16 | [journey.md](./journey.md) |
| Kanban API | `epilot kanban` | 10 | [kanban.md](./kanban.md) |
| Message API | `epilot message` | 52 | [message.md](./message.md) |
| Metering API | `epilot metering` | 16 | [metering.md](./metering.md) |
| Notes API | `epilot notes` | 12 | [notes.md](./notes.md) |
| Notification API | `epilot notification` | 14 | [notification.md](./notification.md) |
| Organization API | `epilot organization` | 8 | [organization.md](./organization.md) |
| Partner Directory API | `epilot partner-directory` | 17 | [partner-directory.md](./partner-directory.md) |
| Permissions API | `epilot permissions` | 13 | [permissions.md](./permissions.md) |
| Pricing API | `epilot pricing` | 22 | [pricing.md](./pricing.md) |
| Pricing Tier API | `epilot pricing-tier` | 1 | [pricing-tier.md](./pricing-tier.md) |
| Purpose API | `epilot purpose` | 6 | [purpose.md](./purpose.md) |
| Sandbox API | `epilot sandbox` | 7 | [sandbox.md](./sandbox.md) |
| Sharing API | `epilot sharing` | 12 | [sharing.md](./sharing.md) |
| Submission API | `epilot submission` | 2 | [submission.md](./submission.md) |
| Targeting API | `epilot targeting` | 11 | [targeting.md](./targeting.md) |
| Template Variables API | `epilot template-variables` | 12 | [template-variables.md](./template-variables.md) |
| User API | `epilot user` | 34 | [user.md](./user.md) |
| Validation Rules API | `epilot validation-rules` | 7 | [validation-rules.md](./validation-rules.md) |
| Webhooks | `epilot webhooks` | 14 | [webhooks.md](./webhooks.md) |
| Workflows Executions | `epilot workflow` | 24 | [workflow.md](./workflow.md) |
| Workflows Definitions | `epilot workflow-definition` | 22 | [workflow-definition.md](./workflow-definition.md) |

## Global Flags

| Flag | Alias | Description |
| ---- | ----- | ----------- |
| `--token <token>` | `-t` | Bearer token |
| `--profile <name>` | | Use a named profile (or `EPILOT_PROFILE` env) |
| `--server <url>` | `-s` | Override server base URL |
| `--json` | | Output raw JSON (no colors) |
| `--verbose` | `-v` | Show full request details |
| `--include` | `-i` | Include response headers |
| `--jsonata <expr>` | | Transform response with JSONata |
| `--guided` | | Prompt for all parameters interactively |
| `--no-interactive` | | Disable interactive prompts |
| `--definition <file\|url>` | | Override OpenAPI spec |

## Per-Operation Flags

| Flag | Alias | Description |
| ---- | ----- | ----------- |
| `-p key=value` | `--param` | Set a parameter (repeatable) |
| `-d '<json>'` | `--data` | Request body JSON |
| `-H 'Key: Value'` | `--header` | Custom header (repeatable) |

## Profiles

```bash
# Create profiles for different environments
epilot profile create dev --server https://entity.dev.sls.epilot.io --token <dev-token>
epilot profile create staging --server https://entity.staging.sls.epilot.io --token <staging-token>

# Switch between profiles
epilot profile use dev

# Or use per-command
epilot entity listSchemas --profile staging

# Or via env var
EPILOT_PROFILE=dev epilot entity listSchemas
```
