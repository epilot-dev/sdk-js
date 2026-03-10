# App API

**API Name:** `app`
**Base URL:** `https://app.sls.epilot.io`

API for managing app publishing and installed app.

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `getPublicFacingComponent` | GET | `/v1/public/app/{appId}/components/{componentId}` | getPublicFacingComponent |
| `listConfigurations` | GET | `/v1/app-configurations` | listConfigurations |
| `createConfiguration` | POST | `/v1/app-configurations` | createConfiguration |
| `listPublicConfigurations` | GET | `/v1/app-configurations/public` | listPublicConfigurations |
| `getPublicConfiguration` | GET | `/v1/app-configurations/public/{appId}` | getPublicConfiguration |
| `getConfiguration` | GET | `/v1/app-configurations/{appId}` | getConfiguration |
| `patchMetadata` | PATCH | `/v1/app-configurations/{appId}` | patchMetadata |
| `deleteConfiguration` | DELETE | `/v1/app-configurations/{appId}` | Delete app configuration |
| `queryEvents` | POST | `/v1/app-configurations/{appId}/events` | queryEvents |
| `createBundleUploadUrl` | POST | `/v1/app-configurations/{appId}/bundle` | createBundleUploadUrl |
| `createZipUploadUrl` | POST | `/v1/app-configurations/{appId}/zip` | createZipUploadUrl |
| `createLogoUploadUrl` | POST | `/v1/app-configurations/{appId}/logo` | createLogoUploadUrl |
| `deleteLogo` | DELETE | `/v1/app-configurations/{appId}/logo` | deleteLogo |
| `listVersions` | GET | `/v1/app-configurations/{appId}/versions` | listVersions |
| `getVersion` | GET | `/v1/app-configurations/{appId}/versions/{version}` | getVersion |
| `patchVersion` | PATCH | `/v1/app-configurations/{appId}/versions/{version}` | patchVersion |
| `deleteVersion` | DELETE | `/v1/app-configurations/{appId}/versions/{version}` | deleteVersion |
| `getReview` | GET | `/v1/app-configurations/{appId}/versions/{version}/review` | getReview |
| `createReview` | POST | `/v1/app-configurations/{appId}/versions/{version}/review` | createReview |
| `createComponent` | POST | `/v1/app-configurations/{appId}/versions/{version}/components` | createComponent |
| `patchComponent` | PATCH | `/v1/app-configurations/{appId}/versions/{version}/components/{componentId}` | patchComponent |
| `deleteComponent` | DELETE | `/v1/app-configurations/{appId}/versions/{version}/components/{componentId}` | deleteComponent |
| `cloneVersion` | POST | `/v1/app-configurations/{appId}/versions/{sourceVersion}/clone-to/{targetVersion}` | cloneVersion |
| `listInstallations` | GET | `/v1/app` | listInstallations |
| `getInstallation` | GET | `/v1/app/{appId}` | getInstallation |
| `install` | POST | `/v1/app/{appId}` | install |
| `patchInstallation` | PATCH | `/v1/app/{appId}` | patchInstallation |
| `uninstall` | DELETE | `/v1/app/{appId}` | uninstall |
| `promoteVersion` | POST | `/v1/app/{appId}/promote-to/{version}` | promoteVersion |
| `ingestEvent` | POST | `/v1/app-events` | ingestEvent |

## Usage

```bash
epilot app getPublicFacingComponent
```
