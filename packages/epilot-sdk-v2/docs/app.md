# App API

- **Base URL:** `https://app.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/app](https://docs.epilot.io/api/app)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.app.getPublicFacingComponent(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/app'

const appClient = await getClient()
authorize(appClient, () => '<token>')
const { data } = await appClient.getPublicFacingComponent(...)
```

## Operations

**App Installation**
- [`getPublicFacingComponent`](#getpublicfacingcomponent)
- [`listInstallations`](#listinstallations)
- [`getInstallation`](#getinstallation)
- [`install`](#install)
- [`patchInstallation`](#patchinstallation)
- [`uninstall`](#uninstall)
- [`promoteVersion`](#promoteversion)

**App Configuration**
- [`listConfigurations`](#listconfigurations)
- [`createConfiguration`](#createconfiguration)
- [`listPublicConfigurations`](#listpublicconfigurations)
- [`getPublicConfiguration`](#getpublicconfiguration)
- [`getConfiguration`](#getconfiguration)
- [`patchMetadata`](#patchmetadata)
- [`deleteConfiguration`](#deleteconfiguration)
- [`createBundleUploadUrl`](#createbundleuploadurl)
- [`createZipUploadUrl`](#createzipuploadurl)
- [`createLogoUploadUrl`](#createlogouploadurl)
- [`deleteLogo`](#deletelogo)
- [`listVersions`](#listversions)
- [`getVersion`](#getversion)
- [`deleteVersion`](#deleteversion)
- [`patchVersion`](#patchversion)
- [`getReview`](#getreview)
- [`createReview`](#createreview)
- [`createComponent`](#createcomponent)
- [`patchComponent`](#patchcomponent)
- [`deleteComponent`](#deletecomponent)
- [`cloneVersion`](#cloneversion)

**App Analytics**
- [`queryEvents`](#queryevents)
- [`ingestEvent`](#ingestevent)

**Schemas**
- [`Role`](#role)
- [`Options`](#options)
- [`Option`](#option)
- [`OptionsRef`](#optionsref)
- [`S3Reference`](#s3reference)
- [`ComponentType`](#componenttype)
- [`Author`](#author)
- [`NotificationConfig`](#notificationconfig)
- [`NotificationEvent`](#notificationevent)
- [`BaseComponentCommon`](#basecomponentcommon)
- [`BaseComponent`](#basecomponent)
- [`CustomCapabilityComponent`](#customcapabilitycomponent)
- [`CustomPageComponent`](#custompagecomponent)
- [`CustomPageConfig`](#custompageconfig)
- [`JourneyBlockComponent`](#journeyblockcomponent)
- [`PortalBlockComponent`](#portalblockcomponent)
- [`ErpInformToolkitComponent`](#erpinformtoolkitcomponent)
- [`CustomFlowActionComponent`](#customflowactioncomponent)
- [`BaseCustomActionConfig`](#basecustomactionconfig)
- [`ExternalIntegrationCustomActionConfig`](#externalintegrationcustomactionconfig)
- [`SandboxCustomActionConfig`](#sandboxcustomactionconfig)
- [`CustomFlowConfig`](#customflowconfig)
- [`ExternalProductCatalogComponent`](#externalproductcatalogcomponent)
- [`ExternalProductCatalogConfig`](#externalproductcatalogconfig)
- [`ExternalProductCatalogHookProducts`](#externalproductcataloghookproducts)
- [`ExternalProductCatalogHookProductRecommendations`](#externalproductcataloghookproductrecommendations)
- [`PortalExtensionComponent`](#portalextensioncomponent)
- [`PortalExtensionConfig`](#portalextensionconfig)
- [`PortalExtensionHookRegistrationIdentifiersCheck`](#portalextensionhookregistrationidentifierscheck)
- [`PortalExtensionHookContractIdentification`](#portalextensionhookcontractidentification)
- [`PortalExtensionHookMeterReadingPlausibilityCheck`](#portalextensionhookmeterreadingplausibilitycheck)
- [`PortalExtensionHookPriceDataRetrieval`](#portalextensionhookpricedataretrieval)
- [`PortalExtensionHookConsumptionDataRetrieval`](#portalextensionhookconsumptiondataretrieval)
- [`PortalExtensionHookCostDataRetrieval`](#portalextensionhookcostdataretrieval)
- [`PortalExtensionSeamlessLink`](#portalextensionseamlesslink)
- [`PortalExtensionAuthBlock`](#portalextensionauthblock)
- [`ExternalProductCatalogAuthBlock`](#externalproductcatalogauthblock)
- [`OverrideDevMode`](#overridedevmode)
- [`JourneyBlockConfig`](#journeyblockconfig)
- [`PortalBlockConfig`](#portalblockconfig)
- [`AppBridgeSurfaceConfig`](#appbridgesurfaceconfig)
- [`PortalBlockSurfaceConfig`](#portalblocksurfaceconfig)
- [`JourneyBlockComponentArgs`](#journeyblockcomponentargs)
- [`TextArg`](#textarg)
- [`BooleanArg`](#booleanarg)
- [`EnumArg`](#enumarg)
- [`BillingFrequency`](#billingfrequency)
- [`Pricing`](#pricing)
- [`Audit`](#audit)
- [`Review`](#review)
- [`ConfigurationMetadata`](#configurationmetadata)
- [`ConfigurationVersion`](#configurationversion)
- [`Grants`](#grants)
- [`BlueprintRef`](#blueprintref)
- [`Installation`](#installation)
- [`PublicConfiguration`](#publicconfiguration)
- [`Configuration`](#configuration)
- [`TranslatedString`](#translatedstring)
- [`CallerIdentity`](#calleridentity)
- [`BatchEventRequest`](#batcheventrequest)
- [`Actor`](#actor)
- [`AppEventData`](#appeventdata)
- [`EventsQuery`](#eventsquery)
- [`EventsQueryResponse`](#eventsqueryresponse)
- [`RawEvents`](#rawevents)
- [`AggregatedEvents`](#aggregatedevents)

### `getPublicFacingComponent`

Retrieve public facing components for an installed app

`GET /v1/public/app/{appId}/components/{componentId}`

```ts
const { data } = await client.getPublicFacingComponent({
  appId: 'example',
  componentId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "component": {
    "component_type": "CUSTOM_JOURNEY_BLOCK",
    "configuration": {
      "override_dev_mode": {},
      "component_url": "https://cdn.apps.com/123/v1.0.0/bundle.js",
      "component_tag": "string",
      "component_args": [],
      "component_size": 0,
      "component_mapping": {}
    }
  }
}
```

</details>

---

### `listConfigurations`

List all app configuration metadata owned by an organization. To get full app configuration details, use the /v1/app-configurations/{appId} endpoint.

`GET /v1/app-configurations`

```ts
const { data } = await client.listConfigurations({
  page: 1,
  pageSize: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "configurations": [
    {
      "app_id": "string",
      "name": "string",
      "author": {},
      "dev_mode": true,
      "versions": [],
      "public_versions": [],
      "support_email": "string",
      "latest_version": "string",
      "category": "string",
      "icon_url": "string",
      "documentation_url": "string",
      "description": {},
      "notifications": {},
      "owner_org_id": "string",
      "internal": false,
      "pricing": {},
      "configuration_audit": {}
    }
  ],
  "pagination": {
    "total": 0,
    "page": 0,
    "pageSize": 0
  }
}
```

</details>

---

### `createConfiguration`

Create a new private app configuration. To make it public a verification process needs to be triggered

`POST /v1/app-configurations`

```ts
const { data } = await client.createConfiguration(
  null,
  {
    name: 'string',
    description: {
      en: 'string',
      de: 'string'
    },
    category: 'string',
    logo_url_key: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "app_id": "string"
}
```

</details>

---

### `listPublicConfigurations`

List all publicly available app configurations that can be installed. This endpoint returns apps that have at least one public version.

`GET /v1/app-configurations/public`

```ts
const { data } = await client.listPublicConfigurations({
  page: 1,
  pageSize: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "configurations": [
    {
      "app_id": "string",
      "name": "string",
      "author": {},
      "dev_mode": true,
      "versions": [],
      "public_versions": [],
      "support_email": "string",
      "latest_version": "string",
      "category": "string",
      "icon_url": "string",
      "documentation_url": "string",
      "description": {},
      "notifications": {},
      "owner_org_id": "string",
      "internal": false,
      "pricing": {},
      "configuration_audit": {}
    }
  ],
  "pagination": {
    "total": 0,
    "page": 0,
    "pageSize": 0
  }
}
```

</details>

---

### `getPublicConfiguration`

Retrieve the public configuration of an app to install in your tenant

`GET /v1/app-configurations/public/{appId}`

```ts
const { data } = await client.getPublicConfiguration({
  appId: 'example',
  version: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "app_id": "string",
  "support_email": "string",
  "owner_org_id": "string",
  "name": "string",
  "author": {
    "name": "string",
    "company": "string",
    "email": "string"
  },
  "dev_mode": true,
  "category": "string",
  "icon_url": "string",
  "documentation_url": "string",
  "description": {
    "en": "string",
    "de": "string"
  },
  "pricing": {
    "pricing_type": "FREE",
    "billing_frequency": "MONTHLY"
  },
  "components": [
    {
      "component_type": "CUSTOM_JOURNEY_BLOCK",
      "configuration": {}
    }
  ],
  "is_beta": true,
  "deprecated_at": "string",
  "version": "string",
  "role": {
    "id": "string",
    "grants": [
      {}
    ]
  },
  "blueprint_ref": {
    "manifest_id": "string",
    "job_id": "string"
  },
  "latest_version": "string",
  "public": true,
  "versions": [
    {
      "app_id": "string",
      "owner_org_id": "string",
      "components": [],
      "visibility": "private",
      "public": false,
      "pending": false,
      "version": "string",
      "is_beta": true,
      "deprecated_at": "string",
      "changelog": "string",
      "review_status": "approved",
      "role": {},
      "blueprint_ref": {},
      "version_audit": {}
    }
  ]
}
```

</details>

---

### `getConfiguration`

Retrieve a specific app configuration

`GET /v1/app-configurations/{appId}`

```ts
const { data } = await client.getConfiguration({
  appId: 'example',
  version: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "app_id": "string",
  "name": "string",
  "author": {
    "name": "string",
    "company": "string",
    "email": "string"
  },
  "dev_mode": true,
  "versions": [
    "string"
  ],
  "public_versions": [
    "string"
  ],
  "support_email": "string",
  "latest_version": "string",
  "category": "string",
  "icon_url": "string",
  "documentation_url": "string",
  "description": {
    "en": "string",
    "de": "string"
  },
  "notifications": {
    "email": "developer@example.com",
    "events": [
      "app.installed"
    ]
  },
  "owner_org_id": "string",
  "internal": false,
  "pricing": {
    "pricing_type": "FREE",
    "billing_frequency": "MONTHLY"
  },
  "configuration_audit": {
    "created_at": "string",
    "created_by": "string",
    "updated_at": "string",
    "updated_by": "string"
  },
  "components": [
    {
      "component_type": "CUSTOM_JOURNEY_BLOCK",
      "configuration": {}
    }
  ],
  "visibility": "private",
  "public": false,
  "pending": false,
  "version": "string",
  "is_beta": true,
  "deprecated_at": "string",
  "changelog": "string",
  "review_status": "approved",
  "role": {
    "id": "string",
    "grants": [
      {}
    ]
  },
  "blueprint_ref": {
    "manifest_id": "string",
    "job_id": "string"
  },
  "version_audit": {
    "created_at": "string",
    "created_by": "string",
    "updated_at": "string",
    "updated_by": "string",
    "versioned_at": "string",
    "versioned_by": "string"
  }
}
```

</details>

---

### `patchMetadata`

Patch non-versioned configuration metadata of a given app configuration.

`PATCH /v1/app-configurations/{appId}`

```ts
const { data } = await client.patchMetadata(
  {
    appId: 'example',
  },
  {
    name: 'string',
    description: {
      en: 'string',
      de: 'string'
    },
    category: 'string',
    documentation_url: 'string',
    notifications: {
      email: 'developer@example.com',
      events: [
        'app.installed'
      ]
    },
    pricing: {
      pricing_type: 'FREE',
      billing_frequency: 'MONTHLY'
    },
    logo_url_key: 'string',
    support_email: 'string',
    dev_mode: true
  },
)
```

---

### `deleteConfiguration`

Delete app configuration

`DELETE /v1/app-configurations/{appId}`

```ts
const { data } = await client.deleteConfiguration({
  appId: 'example',
})
```

---

### `queryEvents`

Query analytics events for a specific app with flexible filtering

`POST /v1/app-configurations/{appId}/events`

```ts
const { data } = await client.queryEvents(
  {
    appId: 'example',
  },
  {
    time_range: {
      start: '1970-01-01T00:00:00.000Z',
      end: '1970-01-01T00:00:00.000Z',
      preset: '1h'
    },
    filters: {
      source: [
        'CUSTOM_JOURNEY_BLOCK'
      ],
      component_id: [
        'string'
      ],
      event_type: [
        'ERROR'
      ],
      correlation_id: 'string'
    },
    aggregation: {
      group_by: [
        'source'
      ],
      metrics: [
        'count'
      ]
    },
    pagination: {
      page: 1,
      page_size: 100
    },
    sort: {
      field: 'timestamp',
      order: 'desc'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "query": {
    "time_range": {
      "start": "1970-01-01T00:00:00.000Z",
      "end": "1970-01-01T00:00:00.000Z",
      "preset": "1h"
    },
    "filters": {
      "source": [],
      "component_id": [],
      "event_type": [],
      "correlation_id": "string"
    },
    "aggregation": {
      "group_by": [],
      "metrics": []
    },
    "pagination": {
      "page": 1,
      "page_size": 100
    },
    "sort": {
      "field": "timestamp",
      "order": "desc"
    }
  },
  "results": {
    "type": "raw",
    "events": [
      {}
    ]
  },
  "pagination": {
    "page": 0,
    "page_size": 0,
    "total_items": 0,
    "has_next": true
  }
}
```

</details>

---

### `createBundleUploadUrl`

Generate a presigned URL for uploading app bundle to /<app-id>/bundle.js path

`POST /v1/app-configurations/{appId}/bundle`

```ts
const { data } = await client.createBundleUploadUrl(
  {
    appId: 'example',
  },
  {
    version: 'string',
    component_id: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "component_id": "string",
  "component_url": "string",
  "upload_url": "string",
  "s3ref": {
    "bucket": "my-bucket",
    "key": "manifest.json"
  },
  "expires_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `createZipUploadUrl`

Generate a presigned URL to upload a zip file with artifacts that will be unpacked in a new directory under the /<app-id>/ path

`POST /v1/app-configurations/{appId}/zip`

```ts
const { data } = await client.createZipUploadUrl(
  {
    appId: 'example',
  },
  {
    version: '1.0.0',
    component_id: 'string',
    filename: 'dist.zip'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "component_id": "string",
  "upload_url": "string",
  "artifact_url": "string",
  "s3ref": {
    "bucket": "my-bucket",
    "key": "manifest.json"
  },
  "expires_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `createLogoUploadUrl`

Generate a presigned URL for uploading app logo to /<app-id>/logo.png path

`POST /v1/app-configurations/{appId}/logo`

```ts
const { data } = await client.createLogoUploadUrl(
  {
    appId: 'example',
  },
  {
    filename: 'company-logo.png',
    mime_type: 'image/png'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "upload_url": "string",
  "s3ref": {
    "bucket": "my-bucket",
    "key": "manifest.json"
  },
  "expires_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteLogo`

Delete the app logo from /<app-id>/logo.png path

`DELETE /v1/app-configurations/{appId}/logo`

```ts
const { data } = await client.deleteLogo({
  appId: 'example',
})
```

---

### `listVersions`

Retrieve a list of versions for an app configuration

`GET /v1/app-configurations/{appId}/versions`

```ts
const { data } = await client.listVersions({
  appId: 'example',
  page: 1,
  pageSize: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "versions": [
    {
      "app_id": "string",
      "owner_org_id": "string",
      "components": [],
      "visibility": "private",
      "public": false,
      "pending": false,
      "version": "string",
      "is_beta": true,
      "deprecated_at": "string",
      "changelog": "string",
      "review_status": "approved",
      "role": {},
      "blueprint_ref": {},
      "version_audit": {}
    }
  ],
  "pagination": {
    "total": 0,
    "page": 0,
    "pageSize": 0
  }
}
```

</details>

---

### `getVersion`

Retrieve a specific version of an app configuration

`GET /v1/app-configurations/{appId}/versions/{version}`

```ts
const { data } = await client.getVersion({
  appId: 'example',
  version: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "app_id": "string",
  "name": "string",
  "author": {
    "name": "string",
    "company": "string",
    "email": "string"
  },
  "dev_mode": true,
  "versions": [
    "string"
  ],
  "public_versions": [
    "string"
  ],
  "support_email": "string",
  "latest_version": "string",
  "category": "string",
  "icon_url": "string",
  "documentation_url": "string",
  "description": {
    "en": "string",
    "de": "string"
  },
  "notifications": {
    "email": "developer@example.com",
    "events": [
      "app.installed"
    ]
  },
  "owner_org_id": "string",
  "internal": false,
  "pricing": {
    "pricing_type": "FREE",
    "billing_frequency": "MONTHLY"
  },
  "configuration_audit": {
    "created_at": "string",
    "created_by": "string",
    "updated_at": "string",
    "updated_by": "string"
  },
  "components": [
    {
      "component_type": "CUSTOM_JOURNEY_BLOCK",
      "configuration": {}
    }
  ],
  "visibility": "private",
  "public": false,
  "pending": false,
  "version": "string",
  "is_beta": true,
  "deprecated_at": "string",
  "changelog": "string",
  "review_status": "approved",
  "role": {
    "id": "string",
    "grants": [
      {}
    ]
  },
  "blueprint_ref": {
    "manifest_id": "string",
    "job_id": "string"
  },
  "version_audit": {
    "created_at": "string",
    "created_by": "string",
    "updated_at": "string",
    "updated_by": "string",
    "versioned_at": "string",
    "versioned_by": "string"
  }
}
```

</details>

---

### `deleteVersion`

Delete a specific version of an app configuration

`DELETE /v1/app-configurations/{appId}/versions/{version}`

```ts
const { data } = await client.deleteVersion({
  appId: 'example',
  version: 'example',
})
```

---

### `patchVersion`

Patch an existing app version

`PATCH /v1/app-configurations/{appId}/versions/{version}`

```ts
const { data } = await client.patchVersion(
  {
    appId: 'example',
    version: 'example',
  },
  {
    manifest_id: 'string',
    role_id: 'string',
    grants: [
      {
        action: 'string',
        resource: 'string'
      }
    ]
  },
)
```

---

### `getReview`

Retrieve the review status of a specific app version

`GET /v1/app-configurations/{appId}/versions/{version}/review`

```ts
const { data } = await client.getReview({
  appId: 'example',
  version: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "review": {
    "version": "string",
    "review_status": "approved",
    "requested_at": "string",
    "requested_by": "string",
    "technical_contact": "string",
    "marketing_contact": "string",
    "demo_url": "string"
  }
}
```

</details>

---

### `createReview`

Submit an app version for review to make it public

`POST /v1/app-configurations/{appId}/versions/{version}/review`

```ts
const { data } = await client.createReview(
  {
    appId: 'example',
    version: 'example',
  },
  {
    technical_contact: 'string',
    marketing_contact: 'string',
    demo_url: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "review": {
    "version": "string",
    "review_status": "approved",
    "requested_at": "string",
    "requested_by": "string",
    "technical_contact": "string",
    "marketing_contact": "string",
    "demo_url": "string"
  }
}
```

</details>

---

### `createComponent`

Patch an existing app version to create/add a component

`POST /v1/app-configurations/{appId}/versions/{version}/components`

```ts
const { data } = await client.createComponent(
  {
    appId: 'example',
    version: 'example',
  },
  {
    component_type: 'CUSTOM_JOURNEY_BLOCK',
    configuration: {
      override_dev_mode: {
        override_url: 'http://localhost:3000'
      },
      component_url: 'https://cdn.apps.com/123/v1.0.0/bundle.js',
      component_tag: 'string',
      component_args: [
        { /* ... */ }
      ],
      component_size: 0,
      component_mapping: {}
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "component": {
    "component_type": "CUSTOM_JOURNEY_BLOCK",
    "configuration": {
      "override_dev_mode": {},
      "component_url": "https://cdn.apps.com/123/v1.0.0/bundle.js",
      "component_tag": "string",
      "component_args": [],
      "component_size": 0,
      "component_mapping": {}
    }
  }
}
```

</details>

---

### `patchComponent`

Patch an existing app version to update its components

`PATCH /v1/app-configurations/{appId}/versions/{version}/components/{componentId}`

```ts
const { data } = await client.patchComponent(
  {
    appId: 'example',
    version: 'example',
    componentId: 'example',
  },
  {
    component_type: 'CUSTOM_JOURNEY_BLOCK',
    configuration: {
      override_dev_mode: {
        override_url: 'http://localhost:3000'
      },
      component_url: 'https://cdn.apps.com/123/v1.0.0/bundle.js',
      component_tag: 'string',
      component_args: [
        { /* ... */ }
      ],
      component_size: 0,
      component_mapping: {}
    }
  },
)
```

---

### `deleteComponent`

Delete a specific component from an app version

`DELETE /v1/app-configurations/{appId}/versions/{version}/components/{componentId}`

```ts
const { data } = await client.deleteComponent({
  appId: 'example',
  version: 'example',
  componentId: 'example',
})
```

---

### `cloneVersion`

Clone an existing app version to create a new version

`POST /v1/app-configurations/{appId}/versions/{sourceVersion}/clone-to/{targetVersion}`

```ts
const { data } = await client.cloneVersion({
  appId: 'example',
  sourceVersion: 'example',
  targetVersion: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "app_id": "string",
  "version": "string",
  "status": "pending"
}
```

</details>

---

### `listInstallations`

Retrieve a list of installed apps for the organization.

`GET /v1/app`

```ts
const { data } = await client.listInstallations({
  componentType: 'example',
  enabled: true,
  page: 1,
  pageSize: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "apps": [
    {
      "app_id": "string",
      "installer_org_id": "string",
      "owner_org_id": "string",
      "enabled": true,
      "name": "string",
      "option_values": [],
      "components": [],
      "installed_version": "string",
      "role": "string",
      "blueprint_ref": {},
      "installation_audit": {},
      "_manifest": []
    }
  ],
  "pagination": {
    "total": 0,
    "page": 0,
    "pageSize": 0
  }
}
```

</details>

---

### `getInstallation`

Retrieve details of an installed app by its ID.

`GET /v1/app/{appId}`

```ts
const { data } = await client.getInstallation({
  appId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "app_id": "string",
  "installer_org_id": "string",
  "owner_org_id": "string",
  "enabled": true,
  "name": "string",
  "option_values": [
    {
      "component_id": "string",
      "options": []
    }
  ],
  "components": [
    {
      "component_type": "CUSTOM_JOURNEY_BLOCK",
      "configuration": {}
    }
  ],
  "installed_version": "string",
  "role": "string",
  "blueprint_ref": {
    "manifest_id": "string",
    "job_id": "string"
  },
  "installation_audit": {
    "created_at": "string",
    "created_by": "string",
    "updated_at": "string",
    "updated_by": "string"
  },
  "_manifest": [
    "123e4567-e89b-12d3-a456-426614174000"
  ]
}
```

</details>

---

### `install`

Upsert app installation by its ID.

`POST /v1/app/{appId}`

```ts
const { data } = await client.install(
  {
    appId: 'example',
  },
  {
    version: 'string',
    option_values: [
      {
        component_id: 'string',
        options: [ /* ... */ ]
      }
    ],
    _manifest: [
      '123e4567-e89b-12d3-a456-426614174000'
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "app_id": "string",
  "installer_org_id": "string",
  "owner_org_id": "string",
  "enabled": true,
  "name": "string",
  "option_values": [
    {
      "component_id": "string",
      "options": []
    }
  ],
  "components": [
    {
      "component_type": "CUSTOM_JOURNEY_BLOCK",
      "configuration": {}
    }
  ],
  "installed_version": "string",
  "role": "string",
  "blueprint_ref": {
    "manifest_id": "string",
    "job_id": "string"
  },
  "installation_audit": {
    "created_at": "string",
    "created_by": "string",
    "updated_at": "string",
    "updated_by": "string"
  },
  "_manifest": [
    "123e4567-e89b-12d3-a456-426614174000"
  ]
}
```

</details>

---

### `patchInstallation`

Patch an installed app by its ID.

`PATCH /v1/app/{appId}`

```ts
const { data } = await client.patchInstallation(
  {
    appId: 'example',
  },
  {
    version: 'string',
    option_values: [
      {
        component_id: 'string',
        options: [ /* ... */ ]
      }
    ],
    _manifest: [
      '123e4567-e89b-12d3-a456-426614174000'
    ]
  },
)
```

---

### `uninstall`

Uninstall an app by its ID.

`DELETE /v1/app/{appId}`

```ts
const { data } = await client.uninstall({
  appId: 'example',
})
```

---

### `promoteVersion`

Update an installed app to a new version

`POST /v1/app/{appId}/promote-to/{version}`

```ts
const { data } = await client.promoteVersion({
  appId: 'example',
  version: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "app_id": "string",
  "installer_org_id": "string",
  "owner_org_id": "string",
  "enabled": true,
  "name": "string",
  "option_values": [
    {
      "component_id": "string",
      "options": []
    }
  ],
  "components": [
    {
      "component_type": "CUSTOM_JOURNEY_BLOCK",
      "configuration": {}
    }
  ],
  "installed_version": "string",
  "role": "string",
  "blueprint_ref": {
    "manifest_id": "string",
    "job_id": "string"
  },
  "installation_audit": {
    "created_at": "string",
    "created_by": "string",
    "updated_at": "string",
    "updated_by": "string"
  },
  "_manifest": [
    "123e4567-e89b-12d3-a456-426614174000"
  ]
}
```

</details>

---

### `ingestEvent`

Internal endpoint for services to submit app events for analytic purposes

`POST /v1/app-events`

```ts
const { data } = await client.ingestEvent(
  null,
  {
    app_id: 'string',
    version: 'string',
    event_id: 'string',
    component_id: 'string',
    timestamp: 'string',
    correlation_id: 'string',
    event_type: 'ERROR',
    source: 'CUSTOM_JOURNEY_BLOCK',
    actor: {
      org_id: 'string',
      user_id: 'string',
      type: 'user'
    },
    details: {}
  },
)
```

---

## Schemas

### `Role`

```ts
type Role = {
  id?: string
  grants?: Array<{
    action: string
    resource?: string
  }>
}
```

### `Options`

Options for the component configuration

```ts
type Options = {
  key: string
  label?: string
  required?: boolean
  description?: string
  value?: unknown
  type: "text" | "number" | "boolean" | "secret"
}
```

### `Option`

```ts
type Option = {
  key: string
  value: unknown
}
```

### `OptionsRef`

```ts
type OptionsRef = {
  component_id: string
  options: Array<{
    key: string
    value: unknown
  }>
}
```

### `S3Reference`

```ts
type S3Reference = {
  bucket: string
  key: string
}
```

### `ComponentType`

Type of app component

```ts
type ComponentType = "CUSTOM_JOURNEY_BLOCK" | "CUSTOM_PORTAL_BLOCK" | "PORTAL_EXTENSION" | "CUSTOM_FLOW_ACTION" | "ERP_INFORM_TOOLKIT" | "CUSTOM_CAPABILITY" | "EXTERNAL_PRODUCT_CATALOG" | "CUSTOM_PAGE"
```

### `Author`

```ts
type Author = {
  name?: string
  company: string
  email?: string
}
```

### `NotificationConfig`

```ts
type NotificationConfig = {
  email?: string // email
  events?: "app.installed" | "app.uninstalled"[]
}
```

### `NotificationEvent`

```ts
type NotificationEvent = "app.installed" | "app.uninstalled"
```

### `BaseComponentCommon`

```ts
type BaseComponentCommon = {
  id: string
  name?: {
    en?: string
    de: string
  }
  description?: {
    en?: string
    de: string
  }
  options?: Array<{
    key: string
    label?: string
    required?: boolean
    description?: string
    value?: unknown
    type: "text" | "number" | "boolean" | "secret"
  }>
  surfaces?: object
}
```

### `BaseComponent`

```ts
type BaseComponent = {
  id: string
  name?: {
    en?: string
    de: string
  }
  description?: {
    en?: string
    de: string
  }
  options?: Array<{
    key: string
    label?: string
    required?: boolean
    description?: string
    value?: unknown
    type: "text" | "number" | "boolean" | "secret"
  }>
  surfaces?: object
}
```

### `CustomCapabilityComponent`

```ts
type CustomCapabilityComponent = {
  component_type: "CUSTOM_CAPABILITY"
  configuration: {
    type?: "tab" | "group"
    allowed_schemas?: string[]
  }
  surfaces?: {
    capability_config?: {
      app_url?: { ... }
      zip_url?: { ... }
      override_url?: { ... }
    }
  }
}
```

### `CustomPageComponent`

```ts
type CustomPageComponent = {
  component_type: "CUSTOM_PAGE"
  configuration: {
    slug: string
    nav_label?: string
    nav_icon?: string
    nav_description?: string
  }
  surfaces?: {
    page?: {
      app_url?: { ... }
      zip_url?: { ... }
      override_url?: { ... }
    }
  }
}
```

### `CustomPageConfig`

```ts
type CustomPageConfig = {
  slug: string
  nav_label?: string
  nav_icon?: string
  nav_description?: string
}
```

### `JourneyBlockComponent`

```ts
type JourneyBlockComponent = {
  component_type: "CUSTOM_JOURNEY_BLOCK"
  configuration: {
    override_dev_mode?: {
      override_url?: { ... }
    }
    component_url: string
    component_tag: string
    component_args?: Array<{
      key: { ... }
      type: { ... }
      required?: { ... }
      description?: { ... }
      label: { ... }
    }>
    component_size?: number
    component_mapping?: Record<string, "string" | "boolean" | "date" | "datetime" | "link" | "number">
  }
}
```

### `PortalBlockComponent`

```ts
type PortalBlockComponent = {
  component_type: "CUSTOM_PORTAL_BLOCK"
  configuration: object
  surfaces?: {
    portal_block?: {
      app_url?: { ... }
      zip_url?: { ... }
      override_url?: { ... }
      section?: { ... }
    }
  }
}
```

### `ErpInformToolkitComponent`

```ts
type ErpInformToolkitComponent = {
  component_type: "ERP_INFORM_TOOLKIT"
  configuration: {
    type: "inbound" | "outbound"
  }
}
```

### `CustomFlowActionComponent`

```ts
type CustomFlowActionComponent = {
  component_type: "CUSTOM_FLOW_ACTION"
  configuration: {
    name?: string
    description?: string
    wait_for_callback?: boolean
    type: "external_integration"
    external_integration_settings?: {
      url?: { ... }
      headers?: { ... }
    }
  } | {
    name?: string
    description?: string
    wait_for_callback?: boolean
    type: "sandbox"
    sandbox_settings?: {
      code?: { ... }
    }
  }
  surfaces?: {
    flow_action_config?: {
      app_url?: { ... }
      zip_url?: { ... }
      override_url?: { ... }
    }
  }
}
```

### `BaseCustomActionConfig`

```ts
type BaseCustomActionConfig = {
  name?: string
  description?: string
  wait_for_callback?: boolean
}
```

### `ExternalIntegrationCustomActionConfig`

```ts
type ExternalIntegrationCustomActionConfig = {
  name?: string
  description?: string
  wait_for_callback?: boolean
  type: "external_integration"
  external_integration_settings?: {
    url?: string
    headers?: Record<string, unknown>
  }
}
```

### `SandboxCustomActionConfig`

```ts
type SandboxCustomActionConfig = {
  name?: string
  description?: string
  wait_for_callback?: boolean
  type: "sandbox"
  sandbox_settings?: {
    code?: string
  }
}
```

### `CustomFlowConfig`

```ts
type CustomFlowConfig = {
  name?: string
  description?: string
  wait_for_callback?: boolean
  type: "external_integration"
  external_integration_settings?: {
    url?: string
    headers?: Record<string, unknown>
  }
} | {
  name?: string
  description?: string
  wait_for_callback?: boolean
  type: "sandbox"
  sandbox_settings?: {
    code?: string
  }
}
```

### `ExternalProductCatalogComponent`

```ts
type ExternalProductCatalogComponent = {
  component_type: "EXTERNAL_PRODUCT_CATALOG"
  configuration: {
    hooks?: Array<{
      id: { ... }
      name?: { ... }
      type: { ... }
      auth?: { ... }
      call: { ... }
    } | {
      id: { ... }
      name?: { ... }
      type: { ... }
      auth?: { ... }
      call: { ... }
    }>
  }
}
```

### `ExternalProductCatalogConfig`

```ts
type ExternalProductCatalogConfig = {
  hooks?: Array<{
    id: string
    name?: {
      en?: { ... }
      de: { ... }
    }
    type: "products"
    auth?: {
      method?: { ... }
      url: { ... }
      params?: { ... }
      headers?: { ... }
      body?: { ... }
    }
    call: {
      method?: { ... }
      url: { ... }
      params?: { ... }
      headers?: { ... }
      body?: { ... }
    }
  } | {
    id: string
    name?: {
      en?: { ... }
      de: { ... }
    }
    type: "product-recommendations"
    auth?: {
  // ...
}
```

### `ExternalProductCatalogHookProducts`

Hook for getting products from an external catalog. This hook makes a call to retrieve product data from an external source. Check the docs or the response API call contract https://docs.api.epilot.io/pricing-api-external-catalog for more details.


```ts
type ExternalProductCatalogHookProducts = {
  id: string
  name?: {
    en?: string
    de: string
  }
  type: "products"
  auth?: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, unknown>
  }
  call: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, unknown>
  }
}
```

### `ExternalProductCatalogHookProductRecommendations`

Hook for getting product recommendations from an external catalog. This hook makes a call to retrieve product recommendations from an external source. Check the docs or the response API call contract https://docs.api.epilot.io/pricing-api-external-catalog for more details.


```ts
type ExternalProductCatalogHookProductRecommendations = {
  id: string
  name?: {
    en?: string
    de: string
  }
  type: "product-recommendations"
  auth?: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, unknown>
  }
  call: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, unknown>
  }
}
```

### `PortalExtensionComponent`

```ts
type PortalExtensionComponent = {
  component_type: "PORTAL_EXTENSION"
  configuration: {
    hooks?: Array<{
      id: { ... }
      name?: { ... }
      type: { ... }
      auth?: { ... }
      call: { ... }
      use_static_ips?: { ... }
    } | {
      id: { ... }
      name?: { ... }
      type: { ... }
      auth?: { ... }
      call: { ... }
      assignment_mode?: { ... }
      contact_relation_attribute?: { ... }
      explanation?: { ... }
      use_static_ips?: { ... }
    } | {
      id: { ... }
      name?: { ... }
      type: { ... }
      intervals?: { ... }
      auth?: { ... }
      call: { ... }
      resolved?: { ... }
      use_static_ips?: { ... }
    } | {
  // ...
}
```

### `PortalExtensionConfig`

```ts
type PortalExtensionConfig = {
  hooks?: Array<{
    id: string
    name?: {
      en?: { ... }
      de: { ... }
    }
    type: "registrationIdentifiersCheck"
    auth?: {
      method?: { ... }
      url: { ... }
      params?: { ... }
      headers?: { ... }
      body?: { ... }
      cache?: { ... }
    }
    call: {
      method?: { ... }
      url: { ... }
      params?: { ... }
      headers: { ... }
      body?: { ... }
      result: { ... }
    }
    use_static_ips?: boolean
  } | {
    id: string
    name?: {
      en?: { ... }
      de: { ... }
  // ...
}
```

### `PortalExtensionHookRegistrationIdentifiersCheck`

Hook that replaces the built-in registration identifiers check. This hook makes a POST call whenever a user is trying to register to find the corresponding contact. The expected response to the call is:
  - 200 with contact id if exactly one contact is found
  - 404 if no contact is found or more th

```ts
type PortalExtensionHookRegistrationIdentifiersCheck = {
  id: string
  name?: {
    en?: string
    de: string
  }
  type: "registrationIdentifiersCheck"
  auth?: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, unknown>
    cache?: {
      key: { ... }
      ttl: { ... }
    }
  }
  call: {
    method?: string
    url: string
    params?: Record<string, string>
    headers: Record<string, string>
    body?: object
    result: string
  }
  use_static_ips?: boolean
}
```

### `PortalExtensionHookContractIdentification`

Hook that replaces the built-in Contract identification for self-assignment. This hook involves an HTTP request whenever a user is trying to self-assign Contract(s).
The expected response http status code to the call is:
  - 200 if found
  - 404 if not found

The following assignment modes are suppo

```ts
type PortalExtensionHookContractIdentification = {
  id: string
  name?: {
    en?: string
    de: string
  }
  type: "contractIdentification"
  auth?: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, unknown>
    cache?: {
      key: { ... }
      ttl: { ... }
    }
  }
  call: {
    method?: string
    url: string
    params?: Record<string, string>
    headers: Record<string, string>
    body?: object
    result?: string
  }
  assignment_mode?: "contracts" | "contact_to_contracts" | "contact_to_portal_user"
  contact_relation_attribute?: string
  explanation?: {
    en: string
  // ...
}
```

### `PortalExtensionHookMeterReadingPlausibilityCheck`

Hook that checks the plausibility of meter readings before they are saved. This hook makes a POST call whenever a user is trying to save a meter reading. The expected response to the call is:
  - 200:
    If meter reading is plausible, the response should contain:
      - valid: true
    If meter re

```ts
type PortalExtensionHookMeterReadingPlausibilityCheck = {
  id: string
  name?: {
    en?: string
    de: string
  }
  type: "meterReadingPlausibilityCheck"
  plausibility_mode?: "check" | "range"
  auth?: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, unknown>
    cache?: {
      key: { ... }
      ttl: { ... }
    }
  }
  call: {
    url: string
    body: Record<string, unknown>
    headers: Record<string, string>
  }
  resolved: {
    dataPath?: string
    counter_identifiers?: Record<string, string>
    valid?: string
    upper_limit?: string
    lower_limit?: string
  // ...
}
```

### `PortalExtensionHookPriceDataRetrieval`

Hook that will allow using the specified source as data for price visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
  - 200 with the time series data


```ts
type PortalExtensionHookPriceDataRetrieval = {
  id: string
  name?: {
    en?: string
    de: string
  }
  type: "priceDataRetrieval"
  intervals?: "PT15M" | "PT1H" | "P1D" | "P1M"[]
  auth?: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, unknown>
    cache?: {
      key: { ... }
      ttl: { ... }
    }
  }
  call: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, unknown>
  }
  resolved?: {
    dataPath?: string
  }
  use_static_ips?: boolean
  // ...
}
```

### `PortalExtensionHookConsumptionDataRetrieval`

Hook that will allow using the specified source as data for consumption visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
  - 200 with the time series data


```ts
type PortalExtensionHookConsumptionDataRetrieval = {
  id: string
  name?: {
    en?: string
    de: string
  }
  type: "consumptionDataRetrieval"
  intervals?: "PT15M" | "PT1H" | "P1D" | "P1M"[]
  auth?: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, unknown>
    cache?: {
      key: { ... }
      ttl: { ... }
    }
  }
  call: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, unknown>
  }
  resolved?: {
    dataPath?: string
  }
  use_static_ips?: boolean
  // ...
}
```

### `PortalExtensionHookCostDataRetrieval`

Hook that will allow using the specified source as data for consumption visualizations. This hook is triggered to fetch the data. Format of the request and response has to follow the following specification: TBD. The expected response to the call is:
  - 200 with the time series data


```ts
type PortalExtensionHookCostDataRetrieval = {
  id: string
  name?: {
    en?: string
    de: string
  }
  type: "costDataRetrieval"
  intervals?: "PT15M" | "PT1H" | "P1D" | "P1M"[]
  auth?: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, unknown>
    cache?: {
      key: { ... }
      ttl: { ... }
    }
  }
  call: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, unknown>
  }
  resolved?: {
    dataPath?: string
  }
  use_static_ips?: boolean
  // ...
}
```

### `PortalExtensionSeamlessLink`

```ts
type PortalExtensionSeamlessLink = {
  id: string
  name: {
    en?: string
    de: string
  }
  description?: {
    en?: string
    de: string
  }
  type: "seamless"
  condition?: string
  auth?: {
    method?: string
    url: string
    params?: Record<string, string>
    headers?: Record<string, string>
    body?: Record<string, unknown>
    cache?: {
      key: { ... }
      ttl: { ... }
    }
  }
  redirect: {
    url?: string
    params?: Record<string, string>
  }
}
```

### `PortalExtensionAuthBlock`

```ts
type PortalExtensionAuthBlock = {
  method?: string
  url: string
  params?: Record<string, string>
  headers?: Record<string, string>
  body?: Record<string, unknown>
  cache?: {
    key: string
    ttl: string
  }
}
```

### `ExternalProductCatalogAuthBlock`

```ts
type ExternalProductCatalogAuthBlock = {
  method?: string
  url: string
  params?: Record<string, string>
  headers?: Record<string, string>
  body?: Record<string, unknown>
}
```

### `OverrideDevMode`

Override URL when app is in dev mode

```ts
type OverrideDevMode = {
  override_url?: string
}
```

### `JourneyBlockConfig`

```ts
type JourneyBlockConfig = {
  override_dev_mode?: {
    override_url?: string
  }
  component_url: string
  component_tag: string
  component_args?: Array<{
    key: string
    type: "text" | "boolean" | "enum"
    required?: boolean
    description?: {
      en?: { ... }
      de: { ... }
    }
    label: {
      en?: { ... }
      de: { ... }
    }
  }>
  component_size?: number
  component_mapping?: Record<string, "string" | "boolean" | "date" | "datetime" | "link" | "number">
}
```

### `PortalBlockConfig`

```ts
type PortalBlockConfig = object
```

### `AppBridgeSurfaceConfig`

```ts
type AppBridgeSurfaceConfig = {
  app_url?: string
  zip_url?: string
  override_url?: string
}
```

### `PortalBlockSurfaceConfig`

```ts
type PortalBlockSurfaceConfig = {
  app_url?: string
  zip_url?: string
  override_url?: string
  section?: "main" | "footer"
}
```

### `JourneyBlockComponentArgs`

```ts
type JourneyBlockComponentArgs = {
  key: string
  type: "text" | "boolean" | "enum"
  required?: boolean
  description?: {
    en?: string
    de: string
  }
  label: {
    en?: string
    de: string
  }
}
```

### `TextArg`

```ts
type TextArg = {
  type?: "text"
}
```

### `BooleanArg`

```ts
type BooleanArg = {
  type?: "boolean"
}
```

### `EnumArg`

```ts
type EnumArg = {
  type?: "enum"
  isMulti?: boolean
  options: Array<{
    id: string
    label: {
      en?: { ... }
      de: { ... }
    }
  }>
}
```

### `BillingFrequency`

How often the subscription is billed

```ts
type BillingFrequency = "MONTHLY" | "QUARTERLY" | "YEARLY" | "CUSTOM"
```

### `Pricing`

```ts
type Pricing = {
  pricing_type?: "FREE" | "SUBSCRIPTION" | "USAGE_BASED" | "ONE_TIME" | "CUSTOM" | "UNKNOWN"
  billing_frequency?: "MONTHLY" | "QUARTERLY" | "YEARLY" | "CUSTOM"
}
```

### `Audit`

```ts
type Audit = {
  created_at?: string
  created_by?: string
  updated_at?: string
  updated_by?: string
}
```

### `Review`

```ts
type Review = {
  version?: string
  review_status?: "approved" | "rejected" | "pending"
  requested_at?: string
  requested_by?: string
  technical_contact?: string
  marketing_contact?: string
  demo_url?: string
}
```

### `ConfigurationMetadata`

Basic metadata about your app configuration which does not get versioned

```ts
type ConfigurationMetadata = {
  app_id: string
  name: string
  author?: {
    name?: string
    company: string
    email?: string
  }
  dev_mode?: boolean
  versions: string[]
  public_versions?: string[]
  support_email?: string
  latest_version: string
  category?: string
  icon_url?: string
  documentation_url?: string
  description: {
    en?: string
    de: string
  }
  notifications?: {
    email?: string // email
    events?: "app.installed" | "app.uninstalled"[]
  }
  owner_org_id: string
  internal?: boolean
  pricing?: {
    pricing_type?: "FREE" | "SUBSCRIPTION" | "USAGE_BASED" | "ONE_TIME" | "CUSTOM" | "UNKNOWN"
    billing_frequency?: "MONTHLY" | "QUARTERLY" | "YEARLY" | "CUSTOM"
  }
  // ...
}
```

### `ConfigurationVersion`

Configuration data about your app which is versionable

```ts
type ConfigurationVersion = {
  app_id: string
  owner_org_id: string
  components: Array<{
    id: string
    name?: {
      en?: { ... }
      de: { ... }
    }
    description?: {
      en?: { ... }
      de: { ... }
    }
    options?: Array<{
      key: { ... }
      label?: { ... }
      required?: { ... }
      description?: { ... }
      value?: { ... }
      type: { ... }
    }>
    surfaces?: object
  }>
  visibility?: "public" | "private"
  public?: boolean
  pending?: boolean
  version: string
  is_beta?: boolean
  deprecated_at?: string
  changelog?: string
  // ...
}
```

### `Grants`

Required grants for the app in order to call APIs for the installing tenant

```ts
type Grants = Array<{
  action: string
  resource?: string
}>
```

### `BlueprintRef`

```ts
type BlueprintRef = {
  manifest_id?: string
  job_id?: string
}
```

### `Installation`

Information about the installed app. Has configuration data of the installed version

```ts
type Installation = {
  app_id: string
  installer_org_id: string
  owner_org_id?: string
  enabled: boolean
  name: string
  option_values?: Array<{
    component_id: string
    options: Array<{
      key: { ... }
      value: { ... }
    }>
  }>
  components: Array<{
    id: string
    name?: {
      en?: { ... }
      de: { ... }
    }
    description?: {
      en?: { ... }
      de: { ... }
    }
    options?: Array<{
      key: { ... }
      label?: { ... }
      required?: { ... }
      description?: { ... }
      value?: { ... }
      type: { ... }
  // ...
}
```

### `PublicConfiguration`

Public configuration of the published app

```ts
type PublicConfiguration = {
  app_id: string
  support_email?: string
  owner_org_id: string
  name: string
  author?: {
    name?: string
    company: string
    email?: string
  }
  dev_mode?: boolean
  category?: string
  icon_url?: string
  documentation_url?: string
  description?: {
    en?: string
    de: string
  }
  pricing?: {
    pricing_type?: "FREE" | "SUBSCRIPTION" | "USAGE_BASED" | "ONE_TIME" | "CUSTOM" | "UNKNOWN"
    billing_frequency?: "MONTHLY" | "QUARTERLY" | "YEARLY" | "CUSTOM"
  }
  components: Array<{
    id: string
    name?: {
      en?: { ... }
      de: { ... }
    }
    description?: {
      en?: { ... }
  // ...
}
```

### `Configuration`

Configuration of the published app

```ts
type Configuration = {
  app_id: string
  name: string
  author?: {
    name?: string
    company: string
    email?: string
  }
  dev_mode?: boolean
  versions: string[]
  public_versions?: string[]
  support_email?: string
  latest_version: string
  category?: string
  icon_url?: string
  documentation_url?: string
  description: {
    en?: string
    de: string
  }
  notifications?: {
    email?: string // email
    events?: "app.installed" | "app.uninstalled"[]
  }
  owner_org_id: string
  internal?: boolean
  pricing?: {
    pricing_type?: "FREE" | "SUBSCRIPTION" | "USAGE_BASED" | "ONE_TIME" | "CUSTOM" | "UNKNOWN"
    billing_frequency?: "MONTHLY" | "QUARTERLY" | "YEARLY" | "CUSTOM"
  }
  // ...
}
```

### `TranslatedString`

```ts
type TranslatedString = {
  en?: string
  de: string
}
```

### `CallerIdentity`

```ts
type CallerIdentity = {
  name?: unknown
  org_id: string
  user_id?: string
  token_id?: string
}
```

### `BatchEventRequest`

```ts
type BatchEventRequest = {
  events: Array<{
    app_id: string
    version: string
    event_id?: string
    component_id: string
    timestamp?: string
    correlation_id?: string
    event_type: "ERROR" | "WARNING" | "INFO"
    source: "CUSTOM_JOURNEY_BLOCK" | "CUSTOM_PORTAL_BLOCK" | "PORTAL_EXTENSION" | "CUSTOM_FLOW_ACTION" | "ERP_INFORM_TOOLKIT" | "CUSTOM_CAPABILITY" | "EXTERNAL_PRODUCT_CATALOG" | "CUSTOM_PAGE"
    actor: {
      org_id?: { ... }
      user_id?: { ... }
      type: { ... }
    }
    details?: Record<string, unknown>
  }>
}
```

### `Actor`

```ts
type Actor = {
  org_id?: string
  user_id?: string
  type: "user" | "system"
}
```

### `AppEventData`

```ts
type AppEventData = {
  app_id: string
  version: string
  event_id?: string
  component_id: string
  timestamp?: string
  correlation_id?: string
  event_type: "ERROR" | "WARNING" | "INFO"
  source: "CUSTOM_JOURNEY_BLOCK" | "CUSTOM_PORTAL_BLOCK" | "PORTAL_EXTENSION" | "CUSTOM_FLOW_ACTION" | "ERP_INFORM_TOOLKIT" | "CUSTOM_CAPABILITY" | "EXTERNAL_PRODUCT_CATALOG" | "CUSTOM_PAGE"
  actor: {
    org_id?: string
    user_id?: string
    type: "user" | "system"
  }
  details?: Record<string, unknown>
}
```

### `EventsQuery`

```ts
type EventsQuery = {
  time_range?: {
    start?: string // date-time
    end?: string // date-time
    preset?: "1h" | "6h" | "24h" | "7d" | "30d"
  }
  filters?: {
    source?: "CUSTOM_JOURNEY_BLOCK" | "CUSTOM_PORTAL_BLOCK" | "PORTAL_EXTENSION" | "CUSTOM_FLOW_ACTION" | "ERP_INFORM_TOOLKIT" | "CUSTOM_CAPABILITY" | "EXTERNAL_PRODUCT_CATALOG" | "CUSTOM_PAGE"[]
    component_id?: string[]
    event_type?: "ERROR" | "WARNING" | "INFO"[]
    correlation_id?: string
  }
  aggregation?: {
    group_by?: "source" | "component_id" | "event_type" | "hour" | "day"[]
    metrics?: "count" | "error_rate" | "unique_users"[]
  }
  pagination?: {
    page?: number
    page_size?: number
  }
  sort?: {
    field?: "timestamp" | "event_type" | "component_id"
    order?: "asc" | "desc"
  }
}
```

### `EventsQueryResponse`

```ts
type EventsQueryResponse = {
  query?: {
    time_range?: {
      start?: { ... }
      end?: { ... }
      preset?: { ... }
    }
    filters?: {
      source?: { ... }
      component_id?: { ... }
      event_type?: { ... }
      correlation_id?: { ... }
    }
    aggregation?: {
      group_by?: { ... }
      metrics?: { ... }
    }
    pagination?: {
      page?: { ... }
      page_size?: { ... }
    }
    sort?: {
      field?: { ... }
      order?: { ... }
    }
  }
  results?: {
    type?: "raw"
    events?: Array<{
      app_id: { ... }
  // ...
}
```

### `RawEvents`

```ts
type RawEvents = {
  type?: "raw"
  events?: Array<{
    app_id: string
    version: string
    event_id?: string
    component_id: string
    timestamp?: string
    correlation_id?: string
    event_type: "ERROR" | "WARNING" | "INFO"
    source: "CUSTOM_JOURNEY_BLOCK" | "CUSTOM_PORTAL_BLOCK" | "PORTAL_EXTENSION" | "CUSTOM_FLOW_ACTION" | "ERP_INFORM_TOOLKIT" | "CUSTOM_CAPABILITY" | "EXTERNAL_PRODUCT_CATALOG" | "CUSTOM_PAGE"
    actor: {
      org_id?: { ... }
      user_id?: { ... }
      type: { ... }
    }
    details?: Record<string, unknown>
  }>
}
```

### `AggregatedEvents`

```ts
type AggregatedEvents = {
  type?: "aggregated"
  groups?: Array<{
    dimensions?: Record<string, unknown>
    metrics?: {
      count?: { ... }
      error_rate?: { ... }
    }
  }>
}
```
