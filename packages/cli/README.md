# epilot CLI

CLI for all epilot APIs. Call any of the 800+ operations across 46 APIs directly from the command line.

## Install

```bash
npx epilot --help
```

Or install globally:

```bash
npm install -g epilot
```

## Quick Start

```bash
# Authenticate
epilot auth login

# List entity schemas
epilot entity listSchemas

# Get an entity by id
epilot entity getEntity -p slug=contact -p id=abc123

# Same with positional args
epilot entity getEntity contact abc123

# Search entities with request body
epilot entity searchEntities -d '{"q":"*","size":10}'

# Pipe body from file
cat query.json | epilot entity searchEntities

# Filter response with JSONata
epilot user getMeV2 --jsonata 'email'

# Raw JSON output (for scripting)
epilot entity listSchemas --json | jq '.results[].slug'
```

## Usage

<!-- usage-help -->
```
CLI for epilot APIs (epilot v0.1.0)

USAGE epilot [OPTIONS] auth|profile|completion|access-token|address|address-suggestions|ai-agents|app|audit-logs|automation|billing|blueprint-manifest|consent|customer-portal|dashboard|data-management|deduplication|design|document|email-settings|email-template|entity|entity-mapping|environments|erp-integration|event-catalog|file|iban|journey|kanban|message|metering|notes|notification|organization|partner-directory|permissions|pricing|pricing-tier|purpose|sandbox|submission|targeting|template-variables|user|validation-rules|webhooks|workflow|workflow-definition

OPTIONS

       -t, --token    Bearer token
         --profile    Use a named profile (or EPILOT_PROFILE env)
      -s, --server    Override server base URL
            --json    Output raw JSON
     -v, --verbose    Verbose output
     --interactive    Interactive mode
  --no-interactive
         --jsonata    JSONata expression

COMMANDS

                 auth    Manage authentication
              profile    Manage profiles (server URLs, tokens, environments)
           completion    Generate shell completion scripts
         access-token    Access Token API
              address    Address API
  address-suggestions    Address Suggestions API
            ai-agents    AI Agents API - OpenAPI 3.0
                  app    App API
           audit-logs    Audit Log
           automation    Automation API
              billing    Billing API
   blueprint-manifest    Blueprint Manifest API
              consent    Consent API
      customer-portal    Portal API
            dashboard    Dashboard API
      data-management    Data Management API
        deduplication    Deduplication API
               design    Design Builder API v2
             document    Document API
       email-settings    Messaging Settings API
       email-template    Email template API
               entity    Entity API
       entity-mapping    Entity Mapping API
         environments    Environments API
      erp-integration    ERP Integration API
        event-catalog    Event Catalog API
                 file    File API
                 iban    Iban API
              journey    Journey API
               kanban    Kanban API
              message    Message API
             metering    Metering API
                notes    Notes API
         notification    Notification API
         organization    Organization API
    partner-directory    Partner API
          permissions    Permissions API
              pricing    Pricing API
         pricing-tier    Pricing Tier API
              purpose    Purpose API
              sandbox    Sandbox API
           submission    Submission API
            targeting    Targeting API
   template-variables    Template Variables API
                 user    User API
     validation-rules    Validation Rules API
             webhooks    Webhooks
             workflow    Workflows Executions
  workflow-definition    Workflows Definitions

Use epilot <command> --help for more information about a command.
```
<!-- /usage-help -->

## Authentication

```bash
# Browser-based login (opens epilot portal)
epilot auth login

# Manual token
epilot auth login --token <your-token>

# Or pass token per-command
epilot entity listSchemas --token <your-token>

# Or via environment variable
EPILOT_TOKEN=<your-token> epilot entity listSchemas

# Check auth status
epilot auth status

# Logout
epilot auth logout
```

Token resolution order:
1. `--token` flag
2. `EPILOT_TOKEN` environment variable
3. Active profile token
4. Stored credentials (`~/.config/epilot/credentials.json`)
5. Interactive prompt (if TTY)

## Profiles

Manage multiple environments (like AWS CLI profiles):

```bash
# Create profiles for different environments
epilot profile create dev --server https://entity.dev.sls.epilot.io --token <dev-token>
epilot profile create staging --server https://entity.staging.sls.epilot.io --token <staging-token>
epilot profile create prod --token <prod-token>

# Switch active profile
epilot profile use dev

# Or use per-command
epilot entity listSchemas --profile staging

# Or via environment variable
EPILOT_PROFILE=dev epilot entity listSchemas

# List profiles
epilot profile list

# Show profile details
epilot profile show dev

# Delete a profile
epilot profile delete dev
```

Profiles store server URL, auth token, org ID, and custom headers in `~/.config/epilot/profiles.json`.

## Parameters

```bash
# Named parameters with -p
epilot entity getEntity -p slug=contact -p id=abc123

# Positional args map to path parameters in order
epilot entity getEntity contact abc123

# Query parameters
epilot entity listSchemas -p unpublished=true
```

## Request Body

```bash
# Inline JSON with -d
epilot entity createEntity -p slug=contact -d '{"first_name":"John","last_name":"Doe"}'

# Pipe from file
cat entity.json | epilot entity createEntity -p slug=contact

# Pipe from another command
echo '{"q":"*"}' | epilot entity searchEntities
```

## Response Formatting

```bash
# Pretty-printed JSON (default in TTY)
epilot entity getEntity contact abc123

# Raw JSON (for piping)
epilot entity getEntity contact abc123 --json

# Include response headers
epilot entity getEntity contact abc123 --include

# Verbose (show request details)
epilot entity getEntity contact abc123 --verbose

# JSONata transformation
epilot entity searchEntities -d '{"q":"*"}' --jsonata 'results[0]._title'
epilot user getMeV2 --jsonata 'email'
epilot entity listSchemas --jsonata 'results.slug'
```

## Server Override

```bash
# Use a custom server URL
epilot entity listSchemas --server http://localhost:3000

# Or set it in a profile
epilot profile create local --server http://localhost:3000
epilot profile use local
```

## OpenAPI Spec Override

For unreleased API features, override the bundled OpenAPI spec:

```bash
# From a local file
epilot entity getEntity -p slug=contact -p id=abc --definition ./my-spec.json

# From a URL
epilot entity getEntity --definition https://example.com/openapi.json

# Or place in .epilot/overrides/
mkdir -p .epilot/overrides
cp my-entity-spec.json .epilot/overrides/entity.json
epilot entity getEntity contact abc123  # automatically uses override
```

## Interactive Mode

When running in a TTY without required arguments, the CLI prompts interactively:

- **No operation**: shows an operation picker
- **Missing required params**: prompts for each one
- **No auth token**: prompts to paste a token

Disable with `--no-interactive` for CI/scripts.

## Shell Completion

```bash
# Bash — add to ~/.bashrc
eval "$(epilot completion bash)"

# Zsh — add to ~/.zshrc
eval "$(epilot completion zsh)"

# Fish — save to completions dir
epilot completion fish > ~/.config/fish/completions/epilot.fish
```

Provides tab completion for API names, operation IDs, and flags.

## API Reference

Full documentation with sample calls and responses for all 46 APIs:

[**docs/index.md**](./docs/index.md)

<!-- api-reference-table -->
| API | Command | Docs |
| --- | ------- | ---- |
| Access Token API | `epilot access-token` | [docs](./docs/access-token.md) |
| Address API | `epilot address` | [docs](./docs/address.md) |
| Address Suggestions API | `epilot address-suggestions` | [docs](./docs/address-suggestions.md) |
| AI Agents API - OpenAPI 3.0 | `epilot ai-agents` | [docs](./docs/ai-agents.md) |
| App API | `epilot app` | [docs](./docs/app.md) |
| Audit Log | `epilot audit-logs` | [docs](./docs/audit-logs.md) |
| Automation API | `epilot automation` | [docs](./docs/automation.md) |
| Billing API | `epilot billing` | [docs](./docs/billing.md) |
| Blueprint Manifest API | `epilot blueprint-manifest` | [docs](./docs/blueprint-manifest.md) |
| Consent API | `epilot consent` | [docs](./docs/consent.md) |
| Portal API | `epilot customer-portal` | [docs](./docs/customer-portal.md) |
| Dashboard API | `epilot dashboard` | [docs](./docs/dashboard.md) |
| Data Management API | `epilot data-management` | [docs](./docs/data-management.md) |
| Deduplication API | `epilot deduplication` | [docs](./docs/deduplication.md) |
| Design Builder API v2 | `epilot design` | [docs](./docs/design.md) |
| Document API | `epilot document` | [docs](./docs/document.md) |
| Messaging Settings API | `epilot email-settings` | [docs](./docs/email-settings.md) |
| Email template API | `epilot email-template` | [docs](./docs/email-template.md) |
| Entity API | `epilot entity` | [docs](./docs/entity.md) |
| Entity Mapping API | `epilot entity-mapping` | [docs](./docs/entity-mapping.md) |
| Environments API | `epilot environments` | [docs](./docs/environments.md) |
| ERP Integration API | `epilot erp-integration` | [docs](./docs/erp-integration.md) |
| Event Catalog API | `epilot event-catalog` | [docs](./docs/event-catalog.md) |
| File API | `epilot file` | [docs](./docs/file.md) |
| Iban API | `epilot iban` | [docs](./docs/iban.md) |
| Journey API | `epilot journey` | [docs](./docs/journey.md) |
| Kanban API | `epilot kanban` | [docs](./docs/kanban.md) |
| Message API | `epilot message` | [docs](./docs/message.md) |
| Metering API | `epilot metering` | [docs](./docs/metering.md) |
| Notes API | `epilot notes` | [docs](./docs/notes.md) |
| Notification API | `epilot notification` | [docs](./docs/notification.md) |
| Organization API | `epilot organization` | [docs](./docs/organization.md) |
| Partner API | `epilot partner-directory` | [docs](./docs/partner-directory.md) |
| Permissions API | `epilot permissions` | [docs](./docs/permissions.md) |
| Pricing API | `epilot pricing` | [docs](./docs/pricing.md) |
| Pricing Tier API | `epilot pricing-tier` | [docs](./docs/pricing-tier.md) |
| Purpose API | `epilot purpose` | [docs](./docs/purpose.md) |
| Sandbox API | `epilot sandbox` | [docs](./docs/sandbox.md) |
| Submission API | `epilot submission` | [docs](./docs/submission.md) |
| Targeting API | `epilot targeting` | [docs](./docs/targeting.md) |
| Template Variables API | `epilot template-variables` | [docs](./docs/template-variables.md) |
| User API | `epilot user` | [docs](./docs/user.md) |
| Validation Rules API | `epilot validation-rules` | [docs](./docs/validation-rules.md) |
| Webhooks | `epilot webhooks` | [docs](./docs/webhooks.md) |
| Workflows Executions | `epilot workflow` | [docs](./docs/workflow.md) |
| Workflows Definitions | `epilot workflow-definition` | [docs](./docs/workflow-definition.md) |
<!-- /api-reference-table -->

## Development

```bash
# Install dependencies
pnpm install

# Generate API commands + definitions + docs from client specs
pnpm generate

# Run in dev mode
pnpm dev -- entity listSchemas

# Build
pnpm build

# Run tests
pnpm test
```
