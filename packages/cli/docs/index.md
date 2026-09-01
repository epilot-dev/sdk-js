# epilot CLI — API Reference

All 51 epilot APIs available via the CLI.

## Setup

```bash
npx epilot auth login
```

## APIs

| API | Command | Operations | Docs |
| --- | ------- | ---------- | ---- |
| Access Token API | `epilot access-token` | 9 | [access-token.md](./access-token.md) |
| Address API | `epilot address` | 3 | [address.md](./address.md) |
| Address Suggestions API | `epilot address-suggestions` | 4 | [address-suggestions.md](./address-suggestions.md) |
| AI Agents API | `epilot ai-agents` | 21 | [ai-agents.md](./ai-agents.md) |
| App API | `epilot app` | 36 | [app.md](./app.md) |
| Audit Log | `epilot audit-logs` | 2 | [audit-logs.md](./audit-logs.md) |
| Automation API | `epilot automation` | 17 | [automation.md](./automation.md) |
| Billing API | `epilot billing` | 14 | [billing.md](./billing.md) |
| Blueprint Manifest API | `epilot blueprint-manifest` | 73 | [blueprint-manifest.md](./blueprint-manifest.md) |
| Calendar API | `epilot calendar` | 28 | [calendar.md](./calendar.md) |
| Configuration Hub API | `epilot configuration-hub` | 21 | [configuration-hub.md](./configuration-hub.md) |
| Consent API | `epilot consent` | 3 | [consent.md](./consent.md) |
| Portal API | `epilot customer-portal` | 167 | [customer-portal.md](./customer-portal.md) |
| Dashboard API | `epilot dashboard` | 18 | [dashboard.md](./dashboard.md) |
| Data Governance API | `epilot data-governance` | 10 | [data-governance.md](./data-governance.md) |
| Deduplication API | `epilot deduplication` | 10 | [deduplication.md](./deduplication.md) |
| Design Builder API v2 | `epilot design` | 14 | [design.md](./design.md) |
| Document API | `epilot document` | 3 | [document.md](./document.md) |
| Messaging Settings API | `epilot email-settings` | 48 | [email-settings.md](./email-settings.md) |
| Email template API | `epilot email-template` | 7 | [email-template.md](./email-template.md) |
| Entity API | `epilot entity` | 88 | [entity.md](./entity.md) |
| Entity Mapping API | `epilot entity-mapping` | 12 | [entity-mapping.md](./entity-mapping.md) |
| Environments API | `epilot environments` | 8 | [environments.md](./environments.md) |
| Event Catalog API | `epilot event-catalog` | 10 | [event-catalog.md](./event-catalog.md) |
| File API | `epilot file` | 37 | [file.md](./file.md) |
| Iban API | `epilot iban` | 1 | [iban.md](./iban.md) |
| Integration Toolkit API | `epilot integration-toolkit` | 70 | [integration-toolkit.md](./integration-toolkit.md) |
| Journey API | `epilot journey` | 17 | [journey.md](./journey.md) |
| Kanban API | `epilot kanban` | 10 | [kanban.md](./kanban.md) |
| Message API | `epilot message` | 54 | [message.md](./message.md) |
| Metering API | `epilot metering` | 21 | [metering.md](./metering.md) |
| Notes API | `epilot notes` | 14 | [notes.md](./notes.md) |
| Notification API | `epilot notification` | 14 | [notification.md](./notification.md) |
| Organization API | `epilot organization` | 8 | [organization.md](./organization.md) |
| Partner Directory API | `epilot partner-directory` | 17 | [partner-directory.md](./partner-directory.md) |
| Permissions API | `epilot permissions` | 13 | [permissions.md](./permissions.md) |
| Pricing API | `epilot pricing` | 34 | [pricing.md](./pricing.md) |
| Pricing Tier API | `epilot pricing-tier` | 1 | [pricing-tier.md](./pricing-tier.md) |
| Purpose API | `epilot purpose` | 6 | [purpose.md](./purpose.md) |
| Query API | `epilot query` | 21 | [query.md](./query.md) |
| Sandbox API | `epilot sandbox` | 7 | [sandbox.md](./sandbox.md) |
| Sharing API | `epilot sharing` | 12 | [sharing.md](./sharing.md) |
| Snapshot API | `epilot snapshot` | 12 | [snapshot.md](./snapshot.md) |
| Submission API | `epilot submission` | 2 | [submission.md](./submission.md) |
| Targeting API | `epilot targeting` | 16 | [targeting.md](./targeting.md) |
| Template Variables API | `epilot template-variables` | 12 | [template-variables.md](./template-variables.md) |
| User API | `epilot user` | 42 | [user.md](./user.md) |
| Validation Rules API | `epilot validation-rules` | 7 | [validation-rules.md](./validation-rules.md) |
| Webhooks | `epilot webhooks` | 15 | [webhooks.md](./webhooks.md) |
| Workflows Executions | `epilot workflow` | 25 | [workflow.md](./workflow.md) |
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
