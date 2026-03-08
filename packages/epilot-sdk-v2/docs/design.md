# Design Builder API v2

- **Base URL:** `https://design-builder-api.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/design](https://docs.epilot.io/api/design)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.design.getAllDesigns(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/design'

const designClient = getClient()
authorize(designClient, () => '<token>')
const { data } = await designClient.getAllDesigns(...)
```

## Operations

**design-builder**
- [`getAllDesigns`](#getalldesigns)
- [`addDesign`](#adddesign)
- [`getDesign`](#getdesign)
- [`deleteDesign`](#deletedesign)
- [`updateDesign`](#updatedesign)
- [`getThemeFromDesign`](#getthemefromdesign)
- [`uploadFile`](#uploadfile)
- [`getFiles`](#getfiles)
- [`getConsumerDesign`](#getconsumerdesign)
- [`addConsumer`](#addconsumer)
- [`removeConsumer`](#removeconsumer)

**Schemas**
- [`UploadFileReq`](#uploadfilereq)
- [`UploadFileRes`](#uploadfileres)
- [`GetFilesRes`](#getfilesres)
- [`GetAllDesignsRes`](#getalldesignsres)
- [`GetBrandsRes`](#getbrandsres)
- [`AddDesignReq`](#adddesignreq)
- [`AddDesignRes`](#adddesignres)
- [`GetDesignRes`](#getdesignres)
- [`UpdateDesignReq`](#updatedesignreq)
- [`ItemMetada`](#itemmetada)
- [`AddConsumerReq`](#addconsumerreq)
- [`DesignItem`](#designitem)
- [`BrandItem`](#branditem)
- [`Custom_Style`](#custom_style)
- [`Journey`](#journey)
- [`ConsumerData`](#consumerdata)
- [`WidgetData`](#widgetdata)
- [`CustomerPortalData`](#customerportaldata)
- [`LogoData`](#logodata)
- [`PaletteData`](#palettedata)
- [`TypographyData`](#typographydata)
- [`ShapeData`](#shapedata)
- [`FontData`](#fontdata)
- [`FontResponseUrl`](#fontresponseurl)
- [`WidgetPortalData`](#widgetportaldata)
- [`ErrorResp`](#errorresp)
- [`FileData`](#filedata)

### `getAllDesigns`

Scan all designs linked to a organization, based in orgId attribute from JWT auth token

`GET /v1/designs`

```ts
const { data } = await client.getAllDesigns()
```

<details>
<summary>Response</summary>

```json
[
  {
    "designs": [
      {
        "id": "string",
        "created_at": "2021-01-30T08:30:00Z",
        "created_by": "string",
        "edited": true,
        "last_modified_at": "string",
        "brand_id": "string",
        "brand_name": "string",
        "user": {
          "emailaddress": "string",
          "fullname": "string",
          "name": "string",
          "userid": "string"
        },
        "style_name": "string",
        "style": {
          "logo": {
            "main": {
              "name": "string",
              "display_name": "string",
              "file_type": "LOGO",
              "s3_object_key": "string",
              "url": "string"
            }
          },
          "palette": {
            "primary": "string",
            "secondary": "string",
            "error": "string",
            "background": "string",
            "paper": "string",
            "navbar": "string",
            "portal_login_background": "string"
          },
          "typography": {
            "font": {
              "font_id": "string",
              "font_name": "string",
              "font_family": "string",
              "font_weight_regular": "string",
              "font_weight_medium": "string",
              "font_weight_bold": "string",
              "urls": [
                {
                  "type": "WOFF2",
                  "url": "string"
                }
              ]
            },
            "primary": "string",
            "secondary": "string"
          },
          "shape": {
            "border_radius": 0
          },
          "consumer": {
            "widgets": [
              {
                "id": "string",
                "name": "string"
              }
            ],
            "customer_portals": [
              {
                "id": "string",
                "name": "string"
              }
            ]
          }
        },
        "is_default": true,
        "custom_theme": "string",
        "use_custom_theme": true,
        "design_tokens": {
          "coupon": "string",
          "cashback": "string",
          "custom_css": "string"
        }
      }
    ]
  }
]
```

</details>

---

### `addDesign`

Create a brand new design linked to a organization, based in orgId attribute from JWT auth token

`POST /v1/designs`

```ts
const { data } = await client.addDesign(
  null,
  {
    design: {
      brand_id: 'string',
      brand_name: 'string',
      user: {
        emailaddress: 'string',
        fullname: 'string',
        name: 'string',
        userid: 'string'
      },
      style_name: 'string',
      style: {
        logo: {
          main: {
            name: 'string',
            display_name: 'string',
            file_type: 'LOGO',
            s3_object_key: 'string',
            url: 'string'
          }
        },
        palette: {
          primary: 'string',
          secondary: 'string',
          error: 'string',
          background: 'string',
          paper: 'string',
          navbar: 'string',
          portal_login_background: 'string'
        },
        typography: {
          font: {
            font_id: 'string',
            font_name: 'string',
            font_family: 'string',
            font_weight_regular: 'string',
            font_weight_medium: 'string',
            font_weight_bold: 'string',
            urls: [
              {
                type: 'WOFF2',
                url: 'string'
              }
            ]
          },
          primary: 'string',
          secondary: 'string'
        },
        shape: {
          border_radius: 0
        },
        consumer: {
          widgets: [
            {
              id: 'string',
              name: 'string'
            }
          ],
          customer_portals: [
            {
              id: 'string',
              name: 'string'
            }
          ]
        }
      },
      is_default: true,
      custom_theme: 'string',
      use_custom_theme: true,
      design_tokens: {
        coupon: 'string',
        cashback: 'string',
        custom_css: 'string'
      }
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "design": {
    "id": "string",
    "created_at": "2021-01-30T08:30:00Z",
    "created_by": "string",
    "edited": true,
    "last_modified_at": "string",
    "brand_id": "string",
    "brand_name": "string",
    "user": {
      "emailaddress": "string",
      "fullname": "string",
      "name": "string",
      "userid": "string"
    },
    "style_name": "string",
    "style": {
      "logo": {
        "main": {
          "name": "string",
          "display_name": "string",
          "file_type": "LOGO",
          "s3_object_key": "string",
          "url": "string"
        }
      },
      "palette": {
        "primary": "string",
        "secondary": "string",
        "error": "string",
        "background": "string",
        "paper": "string",
        "navbar": "string",
        "portal_login_background": "string"
      },
      "typography": {
        "font": {
          "font_id": "string",
          "font_name": "string",
          "font_family": "string",
          "font_weight_regular": "string",
          "font_weight_medium": "string",
          "font_weight_bold": "string",
          "urls": [
            {
              "type": "WOFF2",
              "url": "string"
            }
          ]
        },
        "primary": "string",
        "secondary": "string"
      },
      "shape": {
        "border_radius": 0
      },
      "consumer": {
        "widgets": [
          {
            "id": "string",
            "name": "string"
          }
        ],
        "customer_portals": [
          {
            "id": "string",
            "name": "string"
          }
        ]
      }
    },
    "is_default": true,
    "custom_theme": "string",
    "use_custom_theme": true,
    "design_tokens": {
      "coupon": "string",
      "cashback": "string",
      "custom_css": "string"
    }
  }
}
```

</details>

---

### `getDesign`

Search for a especific design owned by user organization

`GET /v1/designs/{designId}`

```ts
const { data } = await client.getDesign({
  designId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "design": {
    "id": "string",
    "created_at": "2021-01-30T08:30:00Z",
    "created_by": "string",
    "edited": true,
    "last_modified_at": "string",
    "brand_id": "string",
    "brand_name": "string",
    "user": {
      "emailaddress": "string",
      "fullname": "string",
      "name": "string",
      "userid": "string"
    },
    "style_name": "string",
    "style": {
      "logo": {
        "main": {
          "name": "string",
          "display_name": "string",
          "file_type": "LOGO",
          "s3_object_key": "string",
          "url": "string"
        }
      },
      "palette": {
        "primary": "string",
        "secondary": "string",
        "error": "string",
        "background": "string",
        "paper": "string",
        "navbar": "string",
        "portal_login_background": "string"
      },
      "typography": {
        "font": {
          "font_id": "string",
          "font_name": "string",
          "font_family": "string",
          "font_weight_regular": "string",
          "font_weight_medium": "string",
          "font_weight_bold": "string",
          "urls": [
            {
              "type": "WOFF2",
              "url": "string"
            }
          ]
        },
        "primary": "string",
        "secondary": "string"
      },
      "shape": {
        "border_radius": 0
      },
      "consumer": {
        "widgets": [
          {
            "id": "string",
            "name": "string"
          }
        ],
        "customer_portals": [
          {
            "id": "string",
            "name": "string"
          }
        ]
      }
    },
    "is_default": true,
    "custom_theme": "string",
    "use_custom_theme": true,
    "design_tokens": {
      "coupon": "string",
      "cashback": "string",
      "custom_css": "string"
    }
  }
}
```

</details>

---

### `deleteDesign`

Search and delete for a especific design owned by user organization

`DELETE /v1/designs/{designId}`

```ts
const { data } = await client.deleteDesign({
  designId: 'example',
})
```

---

### `updateDesign`

Update a especific design owned by user organization

`PUT /v1/designs/{designId}`

```ts
const { data } = await client.updateDesign(
  {
    designId: 'example',
  },
  {
    design: {
      brand_id: 'string',
      brand_name: 'string',
      user: {
        emailaddress: 'string',
        fullname: 'string',
        name: 'string',
        userid: 'string'
      },
      style_name: 'string',
      style: {
        logo: {
          main: {
            name: 'string',
            display_name: 'string',
            file_type: 'LOGO',
            s3_object_key: 'string',
            url: 'string'
          }
        },
        palette: {
          primary: 'string',
          secondary: 'string',
          error: 'string',
          background: 'string',
          paper: 'string',
          navbar: 'string',
          portal_login_background: 'string'
        },
        typography: {
          font: {
            font_id: 'string',
            font_name: 'string',
            font_family: 'string',
            font_weight_regular: 'string',
            font_weight_medium: 'string',
            font_weight_bold: 'string',
            urls: [
              {
                type: 'WOFF2',
                url: 'string'
              }
            ]
          },
          primary: 'string',
          secondary: 'string'
        },
        shape: {
          border_radius: 0
        },
        consumer: {
          widgets: [
            {
              id: 'string',
              name: 'string'
            }
          ],
          customer_portals: [
            {
              id: 'string',
              name: 'string'
            }
          ]
        }
      },
      is_default: true,
      custom_theme: 'string',
      use_custom_theme: true,
      design_tokens: {
        coupon: 'string',
        cashback: 'string',
        custom_css: 'string'
      }
    }
  },
)
```

---

### `getThemeFromDesign`

Search for a especific design owned by user organization and parse them to a new or old theme

`GET /v1/designs/{designId}/parse`

```ts
const { data } = await client.getThemeFromDesign({
  designId: 'example',
  orgId: 'example',
  theme: 'example',
})
```

<details>
<summary>Response</summary>

```json
{}
```

</details>

---

### `uploadFile`

Upload a new file for the user organization bucket

`POST /v1/designs/files`

```ts
const { data } = await client.uploadFile()
```

<details>
<summary>Response</summary>

```json
{
  "name": "string",
  "display_name": "string",
  "file_type": "LOGO",
  "s3_object_key": "string",
  "url": "string"
}
```

</details>

---

### `getFiles`

List all files for the user organization bucket

`GET /v1/designs/files`

```ts
const { data } = await client.getFiles({
  type: 'example',
})
```

<details>
<summary>Response</summary>

```json
[
  {
    "name": "string",
    "display_name": "string",
    "file_type": "LOGO",
    "s3_object_key": "string",
    "url": "string"
  }
]
```

</details>

---

### `getConsumerDesign`

Search for a especific design owned by user organization

`GET /v1/designs/consumer/{application}/{consumerId}`

```ts
const { data } = await client.getConsumerDesign({
  consumerId: 'example',
  application: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "design": {
    "id": "string",
    "created_at": "2021-01-30T08:30:00Z",
    "created_by": "string",
    "edited": true,
    "last_modified_at": "string",
    "brand_id": "string",
    "brand_name": "string",
    "user": {
      "emailaddress": "string",
      "fullname": "string",
      "name": "string",
      "userid": "string"
    },
    "style_name": "string",
    "style": {
      "logo": {
        "main": {
          "name": "string",
          "display_name": "string",
          "file_type": "LOGO",
          "s3_object_key": "string",
          "url": "string"
        }
      },
      "palette": {
        "primary": "string",
        "secondary": "string",
        "error": "string",
        "background": "string",
        "paper": "string",
        "navbar": "string",
        "portal_login_background": "string"
      },
      "typography": {
        "font": {
          "font_id": "string",
          "font_name": "string",
          "font_family": "string",
          "font_weight_regular": "string",
          "font_weight_medium": "string",
          "font_weight_bold": "string",
          "urls": [
            {
              "type": "WOFF2",
              "url": "string"
            }
          ]
        },
        "primary": "string",
        "secondary": "string"
      },
      "shape": {
        "border_radius": 0
      },
      "consumer": {
        "widgets": [
          {
            "id": "string",
            "name": "string"
          }
        ],
        "customer_portals": [
          {
            "id": "string",
            "name": "string"
          }
        ]
      }
    },
    "is_default": true,
    "custom_theme": "string",
    "use_custom_theme": true,
    "design_tokens": {
      "coupon": "string",
      "cashback": "string",
      "custom_css": "string"
    }
  }
}
```

</details>

---

### `addConsumer`

Add a consumer that uses a specific design

`PUT /v1/designs/addConsumer/{application}/{designId}`

```ts
const { data } = await client.addConsumer(
  {
    designId: 'example',
    application: 'example',
  },
  {
    consumer_id: 'string',
    consumer_name: 'string',
    should_delete: 'string'
  },
)
```

---

### `removeConsumer`

Remove a consumer that uses a specific design

`PUT /v1/designs/removeConsumer/{application}/{designId}`

```ts
const { data } = await client.removeConsumer(
  {
    designId: 'example',
    application: 'example',
  },
  {
    consumer_id: 'string',
    consumer_name: 'string',
    should_delete: 'string'
  },
)
```

---

## Schemas

### `UploadFileReq`

```ts
type UploadFileReq = {
  file_type: "LOGO" | "FONT"
  file_data: string // base64
  display_name?: string
  file_name: string
}
```

### `UploadFileRes`

```ts
type UploadFileRes = {
  name: string
  display_name?: string
  file_type?: "LOGO" | "FONT"
  s3_object_key: string
  url: string
}
```

### `GetFilesRes`

```ts
type GetFilesRes = Array<{
  name: string
  display_name?: string
  file_type?: "LOGO" | "FONT"
  s3_object_key: string
  url: string
}>
```

### `GetAllDesignsRes`

```ts
type GetAllDesignsRes = {
  designs?: Array<{
    id?: string
    created_at?: string
    created_by?: string
    edited: boolean
    last_modified_at?: string
    brand_id?: string
    brand_name?: string
    user?: {
      emailaddress?: { ... }
      fullname?: { ... }
      name?: { ... }
      userid?: { ... }
    }
    style_name: string
    style: {
      logo?: { ... }
      palette: { ... }
      typography: { ... }
      shape?: { ... }
      consumer: { ... }
    }
    is_default?: boolean
    custom_theme?: string
    use_custom_theme?: boolean
    design_tokens?: {
      coupon?: { ... }
      cashback?: { ... }
      custom_css?: { ... }
    }
  }>
}
```

### `GetBrandsRes`

```ts
type GetBrandsRes = {
  brands?: Array<{
    id: string
    name: string
    created_by?: string
    created_date?: string
    main_brand?: string
    organization_id?: string
    updated_date?: string
    updated_by?: string
    status?: string
  }>
}
```

### `AddDesignReq`

```ts
type AddDesignReq = {
  design: {
    brand_id?: string
    brand_name?: string
    user?: {
      emailaddress?: { ... }
      fullname?: { ... }
      name?: { ... }
      userid?: { ... }
    }
    style_name: string
    style: {
      logo?: { ... }
      palette: { ... }
      typography: { ... }
      shape?: { ... }
      consumer: { ... }
    }
    is_default?: boolean
    custom_theme?: string
    use_custom_theme?: boolean
    design_tokens?: {
      coupon?: { ... }
      cashback?: { ... }
      custom_css?: { ... }
    }
  }
}
```

### `AddDesignRes`

```ts
type AddDesignRes = {
  design?: {
    id?: string
    created_at?: string
    created_by?: string
    edited: boolean
    last_modified_at?: string
    brand_id?: string
    brand_name?: string
    user?: {
      emailaddress?: { ... }
      fullname?: { ... }
      name?: { ... }
      userid?: { ... }
    }
    style_name: string
    style: {
      logo?: { ... }
      palette: { ... }
      typography: { ... }
      shape?: { ... }
      consumer: { ... }
    }
    is_default?: boolean
    custom_theme?: string
    use_custom_theme?: boolean
    design_tokens?: {
      coupon?: { ... }
      cashback?: { ... }
      custom_css?: { ... }
    }
  }
}
```

### `GetDesignRes`

```ts
type GetDesignRes = {
  design?: {
    id?: string
    created_at?: string
    created_by?: string
    edited: boolean
    last_modified_at?: string
    brand_id?: string
    brand_name?: string
    user?: {
      emailaddress?: { ... }
      fullname?: { ... }
      name?: { ... }
      userid?: { ... }
    }
    style_name: string
    style: {
      logo?: { ... }
      palette: { ... }
      typography: { ... }
      shape?: { ... }
      consumer: { ... }
    }
    is_default?: boolean
    custom_theme?: string
    use_custom_theme?: boolean
    design_tokens?: {
      coupon?: { ... }
      cashback?: { ... }
      custom_css?: { ... }
    }
  }
}
```

### `UpdateDesignReq`

```ts
type UpdateDesignReq = {
  design: {
    brand_id?: string
    brand_name?: string
    user?: {
      emailaddress?: { ... }
      fullname?: { ... }
      name?: { ... }
      userid?: { ... }
    }
    style_name: string
    style: {
      logo?: { ... }
      palette: { ... }
      typography: { ... }
      shape?: { ... }
      consumer: { ... }
    }
    is_default?: boolean
    custom_theme?: string
    use_custom_theme?: boolean
    design_tokens?: {
      coupon?: { ... }
      cashback?: { ... }
      custom_css?: { ... }
    }
  }
}
```

### `ItemMetada`

```ts
type ItemMetada = {
  id?: string
  created_at?: string
  created_by?: string
  edited?: boolean
  last_modified_at?: string
}
```

### `AddConsumerReq`

```ts
type AddConsumerReq = {
  consumer_id: string
  consumer_name: string
  should_delete?: string
}
```

### `DesignItem`

```ts
type DesignItem = {
  brand_id?: string
  brand_name?: string
  user?: {
    emailaddress?: string
    fullname?: string
    name?: string
    userid?: string
  }
  style_name: string
  style: {
    logo?: {
      main?: { ... }
    }
    palette: {
      primary: { ... }
      secondary: { ... }
      error: { ... }
      background: { ... }
      paper: { ... }
      navbar: { ... }
      portal_login_background?: { ... }
    }
    typography: {
      font: { ... }
      primary: { ... }
      secondary: { ... }
    }
    shape?: {
      border_radius?: { ... }
    }
    consumer: {
      widgets: { ... }
      customer_portals: { ... }
    }
  }
  is_default?: boolean
}
```

### `BrandItem`

```ts
type BrandItem = {
  id: string
  name: string
  created_by?: string
  created_date?: string
  main_brand?: string
  organization_id?: string
  updated_date?: string
  updated_by?: string
  status?: string
}
```

### `Custom_Style`

```ts
type Custom_Style = {
  custom_theme?: string
  use_custom_theme?: boolean
}
```

### `Journey`

```ts
type Journey = {
  design_tokens?: {
    coupon?: string
    cashback?: string
    custom_css?: string
  }
}
```

### `ConsumerData`

```ts
type ConsumerData = {
  widgets: Array<{
    id: string
    name: string
  }>
  customer_portals: Array<{
    id: string
    name: string
  }>
}
```

### `WidgetData`

```ts
type WidgetData = {
  id: string
  name: string
}
```

### `CustomerPortalData`

```ts
type CustomerPortalData = {
  id: string
  name: string
}
```

### `LogoData`

```ts
type LogoData = {
  main?: {
    name: string
    display_name?: string
    file_type?: "LOGO" | "FONT"
    s3_object_key: string
    url: string
  }
}
```

### `PaletteData`

```ts
type PaletteData = {
  primary: string
  secondary: string
  error: string
  background: string
  paper: string
  navbar: string
  portal_login_background?: string
}
```

### `TypographyData`

```ts
type TypographyData = {
  font: {
    font_id: string
    font_name: string
    font_family?: string
    font_weight_regular?: string
    font_weight_medium?: string
    font_weight_bold?: string
    urls: Array<{
      type?: { ... }
      url?: { ... }
    }>
  }
  primary: string
  secondary: string
}
```

### `ShapeData`

```ts
type ShapeData = {
  border_radius?: number
}
```

### `FontData`

```ts
type FontData = {
  font_id: string
  font_name: string
  font_family?: string
  font_weight_regular?: string
  font_weight_medium?: string
  font_weight_bold?: string
  urls: Array<{
    type?: "WOFF2" | "WOFF" | "TTF" | "EOT"
    url?: string
  }>
}
```

### `FontResponseUrl`

```ts
type FontResponseUrl = {
  type?: "WOFF2" | "WOFF" | "TTF" | "EOT"
  url?: string
}
```

### `WidgetPortalData`

```ts
type WidgetPortalData = {
  id: string
  name: string
}
```

### `ErrorResp`

```ts
type ErrorResp = {
  message?: string
}
```

### `FileData`

```ts
type FileData = {
  name: string
  display_name?: string
  file_type?: "LOGO" | "FONT"
  s3_object_key: string
  url: string
}
```
