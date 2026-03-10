# Access Token API

**API Name:** `access-token`
**Base URL:** `https://access-token.sls.epilot.io`

Generate Access Tokens for 3rd party applications that need access to epilot APIs.


## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `listAccessTokens` | GET | `/v1/access-tokens` | listAccessTokens |
| `createAccessToken` | POST | `/v1/access-tokens` | createAccessToken |
| `revokeAccessToken` | DELETE | `/v1/access-tokens/{id}` | revokeAccessToken |
| `getAccessTokenJwks` | GET | `/v1/access-tokens/.well-known/jwks.json` | getAccessTokenJwks |
| `getAccessTokenOIDC` | GET | `/v1/access-tokens/.well-known/openid-configuration` | getAccessTokenOIDC |
| `getPublicTokenJwks` | GET | `/v1/access-tokens/public/.well-known/jwks.json` | getPublicTokenJwks |
| `getPublicTokenOIDC` | GET | `/v1/access-tokens/public/.well-known/openid-configuration` | getPublicTokenOIDC |

## Usage

```bash
epilot access-token listAccessTokens
```
