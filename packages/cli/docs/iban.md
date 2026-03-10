# Iban API

- **Base URL:** `https://iban-api.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/iban](https://docs.epilot.io/api/iban)

API Backend for epilot Iban feature.

## Quick Start

```bash
# List available operations
epilot iban

# Call an operation
epilot iban validateIban
```

## Operations

**Ibans**
- [`validateIban`](#validateiban) — Validate an Iban

### `validateIban`

Validate an Iban

`POST /v1/public/iban:validate`

**Request Body** (required)

**Flags**

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--no-interactive` | Disable interactive prompts |

**Sample Call**

```bash
epilot iban validateIban \
  -d '{"iban":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot iban validateIban
```

With JSONata filter:

```bash
epilot iban validateIban --jsonata '$'
```

---
