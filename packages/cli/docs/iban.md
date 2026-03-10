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
