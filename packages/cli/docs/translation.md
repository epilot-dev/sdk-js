# Translation API

- **Base URL:** `https://translation.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/translation](https://docs.epilot.io/api/translation)

Translates short user-authored texts (workflow titles, labels) into the
reader's language.

## Quick Start

```bash
# List available operations
epilot translation

# Call an operation
epilot translation translateTexts
```

## Common Flags

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
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

## Operations

**Translation**
- [`translateTexts`](#translatetexts) — Translates a batch of texts into `target_language`, returning one

### `translateTexts`

Translates a batch of texts into `target_language`, returning one

`POST /v1/translation:translate`

**Request Body** (required)

**Sample Call**

```bash
epilot translation translateTexts \
  -d '{"texts":["string"],"target_language":"en","source_language":"en"}'
```

Using stdin pipe:

```bash
cat body.json | epilot translation translateTexts
```

With JSONata filter:

```bash
epilot translation translateTexts --jsonata 'translations'
```

<details>
<summary>Sample Response</summary>

```json
{
  "translations": [
    {
      "text": "string",
      "source_language": "de"
    }
  ]
}
```

</details>

---
