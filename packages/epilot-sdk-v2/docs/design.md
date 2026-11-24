# Design Builder API v2

- **Base URL:** `https://design-builder-api.sls.epilot.io`
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
- [`duplicateDesign`](#duplicatedesign)
- [`duplicateDesignAsV1`](#duplicatedesignasv1)
- [`getDesignVariables`](#getdesignvariables)
- [`generateDesign`](#generatedesign)
- [`generateDesignDocument`](#generatedesigndocument)
- [`createDesignDocumentJob`](#createdesigndocumentjob)
- [`getDesignDocumentJob`](#getdesigndocumentjob)
- [`uploadFile`](#uploadfile)
- [`getFiles`](#getfiles)
- [`getConsumerDesign`](#getconsumerdesign)

**Schemas**
- [`DuplicateDesignAsV1Req`](#duplicatedesignasv1req)
- [`JourneyChoice`](#journeychoice)
- [`DuplicateDesignAsV1Plan`](#duplicatedesignasv1plan)
- [`UploadFileReq`](#uploadfilereq)
- [`UploadFileRes`](#uploadfileres)
- [`GetFilesRes`](#getfilesres)
- [`GetAllDesignsRes`](#getalldesignsres)
- [`AddDesignReq`](#adddesignreq)
- [`AddDesignRes`](#adddesignres)
- [`GetDesignRes`](#getdesignres)
- [`GetDesignVariablesRes`](#getdesignvariablesres)
- [`UpdateDesignReq`](#updatedesignreq)
- [`Journey_Write`](#journey_write)
- [`ItemMetada`](#itemmetada)
- [`AddConsumerReq`](#addconsumerreq)
- [`RemoveConsumerReq`](#removeconsumerreq)
- [`DesignItem`](#designitem)
- [`Design_Document_V1`](#design_document_v1)
- [`UpdateDesignConflict`](#updatedesignconflict)
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
- [`GenerateDesignReq`](#generatedesignreq)
- [`GenerateDesignRes`](#generatedesignres)
- [`GenerateDesignDocumentReq`](#generatedesigndocumentreq)
- [`FindingId`](#findingid)
- [`FindingStatus`](#findingstatus)
- [`FindingDetail`](#findingdetail)
- [`DesignFinding`](#designfinding)
- [`GenerateDesignDocumentRes`](#generatedesigndocumentres)
- [`CreateDesignDocumentJobReq`](#createdesigndocumentjobreq)
- [`BrandGuidelineAttachment`](#brandguidelineattachment)
- [`GeneratedDesignDocument`](#generateddesigndocument)
- [`ReviewChange`](#reviewchange)
- [`ReviewScreenshot`](#reviewscreenshot)
- [`ReviewedDesignDocument`](#revieweddesigndocument)
- [`DesignDocumentJob`](#designdocumentjob)
- [`GeneratedDesign`](#generateddesign)
- [`ErrorResp`](#errorresp)
- [`FileData`](#filedata)
- [`DesignId`](#designid)
- [`Theme`](#theme)
- [`Application`](#application)
- [`DesignParameters`](#designparameters)
- [`ParseThemeFromDesignResp`](#parsethemefromdesignresp)

### `getAllDesigns`

Scan all designs linked to a organization, based in orgId attribute from JWT auth token

`GET /v1/designs`

```ts
const { data } = await client.getAllDesigns()
```

<details>
<summary>Response</summary>

```json
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
      "user": {},
      "style_name": "string",
      "style": {},
      "is_default": true,
      "_manifest": ["string"],
      "custom_theme": "string",
      "use_custom_theme": true,
      "design_tokens": {},
      "version": 1,
      "colors": {},
      "typography": {},
      "shape": {},
      "components": {},
      "assets": {},
      "consumer": {}
    }
  ]
}
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
        logo: { /* ... */ },
        palette: { /* ... */ },
        typography: { /* ... */ },
        shape: { /* ... */ },
        consumer: { /* ... */ }
      },
      is_default: true,
      _manifest: ['string'],
      custom_theme: 'string',
      use_custom_theme: true,
      design_tokens: {
        coupon: 'string',
        cashback: 'string',
        custom_css: 'string',
        accent_color: 'string',
        outline_color: 'string',
        divider_color: 'string',
        link_color: 'string',
        link_hover_color: 'string',
        font_size_scale: 'xs',
        topbar_height: 0,
        topbar_logo_alignment: 'flex-start',
        logo_size: 0,
        input_background: 'string',
        input_border_color: 'string',
        input_text_color: 'string',
        input_label_color: 'string',
        input_border_radius: 0,
        input_height: 0,
        input_variant: 'outlined',
        button_primary_bg: 'string',
        button_primary_text: 'string',
        button_primary_hover_bg: 'string',
        button_primary_hover_text: 'string',
        button_outlined_border: 'string',
        button_outlined_text: 'string',
        button_outlined_hover_bg: 'string',
        button_outlined_hover_text: 'string',
        button_ghost_bg: 'string',
        button_ghost_text: 'string',
        button_ghost_hover_bg: 'string',
        button_ghost_hover_text: 'string',
        button_border_radius: 0,
        button_height: 0,
        card_background: 'string',
        card_border_color: 'string',
        card_variant: 'shadow',
        summary_card_background: 'string',
        toggle_selected_bg: 'string',
        toggle_selected_text: 'string',
        toggle_hover_bg: 'string',
        toggle_hover_text: 'string',
        toggle_border_color: 'string',
        dropdown_hover_bg: 'string',
        dropdown_hover_text: 'string',
        dropdown_selected_bg: 'string',
        dropdown_selected_text: 'string',
        switch_unchecked_color: 'string',
        switch_unchecked_bg: 'string',
        switch_border_radius: 0,
        checkbox_unchecked_color: 'string',
        checkbox_label_color: 'string',
        radio_unchecked_color: 'string',
        radio_label_color: 'string',
        datepicker_selected_bg: 'string',
        datepicker_selected_color: 'string',
        datepicker_border_radius: 0,
        chip_background: 'string',
        chip_hover_background: 'string',
        chip_text_color: 'string',
        chip_hover_text_color: 'string'
      },
      version: 1,
      colors: {},
      typography: {},
      shape: {},
      components: {},
      assets: {},
      consumer: {
        widgets: [ /* ... */ ],
        customer_portals: [ /* ... */ ]
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
      "logo": {},
      "palette": {},
      "typography": {},
      "shape": {},
      "consumer": {}
    },
    "is_default": true,
    "_manifest": ["string"],
    "custom_theme": "string",
    "use_custom_theme": true,
    "design_tokens": {
      "coupon": "string",
      "cashback": "string",
      "custom_css": "string",
      "accent_color": "string",
      "outline_color": "string",
      "divider_color": "string",
      "link_color": "string",
      "link_hover_color": "string",
      "font_size_scale": "xs",
      "topbar_height": 0,
      "topbar_logo_alignment": "flex-start",
      "logo_size": 0,
      "input_background": "string",
      "input_border_color": "string",
      "input_text_color": "string",
      "input_label_color": "string",
      "input_border_radius": 0,
      "input_height": 0,
      "input_variant": "outlined",
      "button_primary_bg": "string",
      "button_primary_text": "string",
      "button_primary_hover_bg": "string",
      "button_primary_hover_text": "string",
      "button_outlined_border": "string",
      "button_outlined_text": "string",
      "button_outlined_hover_bg": "string",
      "button_outlined_hover_text": "string",
      "button_ghost_bg": "string",
      "button_ghost_text": "string",
      "button_ghost_hover_bg": "string",
      "button_ghost_hover_text": "string",
      "button_border_radius": 0,
      "button_height": 0,
      "card_background": "string",
      "card_border_color": "string",
      "card_variant": "shadow",
      "summary_card_background": "string",
      "toggle_selected_bg": "string",
      "toggle_selected_text": "string",
      "toggle_hover_bg": "string",
      "toggle_hover_text": "string",
      "toggle_border_color": "string",
      "dropdown_hover_bg": "string",
      "dropdown_hover_text": "string",
      "dropdown_selected_bg": "string",
      "dropdown_selected_text": "string",
      "switch_unchecked_color": "string",
      "switch_unchecked_bg": "string",
      "switch_border_radius": 0,
      "checkbox_unchecked_color": "string",
      "checkbox_label_color": "string",
      "radio_unchecked_color": "string",
      "radio_label_color": "string",
      "datepicker_selected_bg": "string",
      "datepicker_selected_color": "string",
      "datepicker_border_radius": 0,
      "chip_background": "string",
      "chip_hover_background": "string",
      "chip_text_color": "string",
      "chip_hover_text_color": "string"
    },
    "version": 1,
    "colors": {},
    "typography": {},
    "shape": {},
    "components": {},
    "assets": {},
    "consumer": {
      "widgets": [],
      "customer_portals": []
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
      "logo": {},
      "palette": {},
      "typography": {},
      "shape": {},
      "consumer": {}
    },
    "is_default": true,
    "_manifest": ["string"],
    "custom_theme": "string",
    "use_custom_theme": true,
    "design_tokens": {
      "coupon": "string",
      "cashback": "string",
      "custom_css": "string",
      "accent_color": "string",
      "outline_color": "string",
      "divider_color": "string",
      "link_color": "string",
      "link_hover_color": "string",
      "font_size_scale": "xs",
      "topbar_height": 0,
      "topbar_logo_alignment": "flex-start",
      "logo_size": 0,
      "input_background": "string",
      "input_border_color": "string",
      "input_text_color": "string",
      "input_label_color": "string",
      "input_border_radius": 0,
      "input_height": 0,
      "input_variant": "outlined",
      "button_primary_bg": "string",
      "button_primary_text": "string",
      "button_primary_hover_bg": "string",
      "button_primary_hover_text": "string",
      "button_outlined_border": "string",
      "button_outlined_text": "string",
      "button_outlined_hover_bg": "string",
      "button_outlined_hover_text": "string",
      "button_ghost_bg": "string",
      "button_ghost_text": "string",
      "button_ghost_hover_bg": "string",
      "button_ghost_hover_text": "string",
      "button_border_radius": 0,
      "button_height": 0,
      "card_background": "string",
      "card_border_color": "string",
      "card_variant": "shadow",
      "summary_card_background": "string",
      "toggle_selected_bg": "string",
      "toggle_selected_text": "string",
      "toggle_hover_bg": "string",
      "toggle_hover_text": "string",
      "toggle_border_color": "string",
      "dropdown_hover_bg": "string",
      "dropdown_hover_text": "string",
      "dropdown_selected_bg": "string",
      "dropdown_selected_text": "string",
      "switch_unchecked_color": "string",
      "switch_unchecked_bg": "string",
      "switch_border_radius": 0,
      "checkbox_unchecked_color": "string",
      "checkbox_label_color": "string",
      "radio_unchecked_color": "string",
      "radio_label_color": "string",
      "datepicker_selected_bg": "string",
      "datepicker_selected_color": "string",
      "datepicker_border_radius": 0,
      "chip_background": "string",
      "chip_hover_background": "string",
      "chip_text_color": "string",
      "chip_hover_text_color": "string"
    },
    "version": 1,
    "colors": {},
    "typography": {},
    "shape": {},
    "components": {},
    "assets": {},
    "consumer": {
      "widgets": [],
      "customer_portals": []
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

Update a especific design owned by user organization. A body with `version: 1` is validated against the design document v1 schema and stored as v1. A v1 body leaves the stored `style`, `design_tokens`

`PUT /v1/designs/{designId}`

```ts
const { data } = await client.updateDesign(
  {
    designId: 'example',
    If-Match: 'example',
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
        logo: { /* ... */ },
        palette: { /* ... */ },
        typography: { /* ... */ },
        shape: { /* ... */ },
        consumer: { /* ... */ }
      },
      is_default: true,
      _manifest: ['string'],
      custom_theme: 'string',
      use_custom_theme: true,
      design_tokens: {
        coupon: 'string',
        cashback: 'string',
        custom_css: 'string',
        accent_color: 'string',
        outline_color: 'string',
        divider_color: 'string',
        link_color: 'string',
        link_hover_color: 'string',
        font_size_scale: 'xs',
        topbar_height: 0,
        topbar_logo_alignment: 'flex-start',
        logo_size: 0,
        input_background: 'string',
        input_border_color: 'string',
        input_text_color: 'string',
        input_label_color: 'string',
        input_border_radius: 0,
        input_height: 0,
        input_variant: 'outlined',
        button_primary_bg: 'string',
        button_primary_text: 'string',
        button_primary_hover_bg: 'string',
        button_primary_hover_text: 'string',
        button_outlined_border: 'string',
        button_outlined_text: 'string',
        button_outlined_hover_bg: 'string',
        button_outlined_hover_text: 'string',
        button_ghost_bg: 'string',
        button_ghost_text: 'string',
        button_ghost_hover_bg: 'string',
        button_ghost_hover_text: 'string',
        button_border_radius: 0,
        button_height: 0,
        card_background: 'string',
        card_border_color: 'string',
        card_variant: 'shadow',
        summary_card_background: 'string',
        toggle_selected_bg: 'string',
        toggle_selected_text: 'string',
        toggle_hover_bg: 'string',
        toggle_hover_text: 'string',
        toggle_border_color: 'string',
        dropdown_hover_bg: 'string',
        dropdown_hover_text: 'string',
        dropdown_selected_bg: 'string',
        dropdown_selected_text: 'string',
        switch_unchecked_color: 'string',
        switch_unchecked_bg: 'string',
        switch_border_radius: 0,
        checkbox_unchecked_color: 'string',
        checkbox_label_color: 'string',
        radio_unchecked_color: 'string',
        radio_label_color: 'string',
        datepicker_selected_bg: 'string',
        datepicker_selected_color: 'string',
        datepicker_border_radius: 0,
        chip_background: 'string',
        chip_hover_background: 'string',
        chip_text_color: 'string',
        chip_hover_text_color: 'string'
      },
      version: 1,
      colors: {},
      typography: {},
      shape: {},
      components: {},
      assets: {},
      consumer: {
        widgets: [ /* ... */ ],
        customer_portals: [ /* ... */ ]
      }
    },
    journey_write: {
      primary_color: 'keep',
      font: 'keep',
      border_radius: 'keep',
      logo: 'keep'
    }
  },
)
```

---

### `duplicateDesign`

Duplicate an existing design owned by the user organization. The copy carries over the style, custom CSS and name (marked as a copy) but does NOT carry over journey/portal relations, so the new design

`POST /v1/designs/{designId}/duplicate`

```ts
const { data } = await client.duplicateDesign({
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
      "logo": {},
      "palette": {},
      "typography": {},
      "shape": {},
      "consumer": {}
    },
    "is_default": true,
    "_manifest": ["string"],
    "custom_theme": "string",
    "use_custom_theme": true,
    "design_tokens": {
      "coupon": "string",
      "cashback": "string",
      "custom_css": "string",
      "accent_color": "string",
      "outline_color": "string",
      "divider_color": "string",
      "link_color": "string",
      "link_hover_color": "string",
      "font_size_scale": "xs",
      "topbar_height": 0,
      "topbar_logo_alignment": "flex-start",
      "logo_size": 0,
      "input_background": "string",
      "input_border_color": "string",
      "input_text_color": "string",
      "input_label_color": "string",
      "input_border_radius": 0,
      "input_height": 0,
      "input_variant": "outlined",
      "button_primary_bg": "string",
      "button_primary_text": "string",
      "button_primary_hover_bg": "string",
      "button_primary_hover_text": "string",
      "button_outlined_border": "string",
      "button_outlined_text": "string",
      "button_outlined_hover_bg": "string",
      "button_outlined_hover_text": "string",
      "button_ghost_bg": "string",
      "button_ghost_text": "string",
      "button_ghost_hover_bg": "string",
      "button_ghost_hover_text": "string",
      "button_border_radius": 0,
      "button_height": 0,
      "card_background": "string",
      "card_border_color": "string",
      "card_variant": "shadow",
      "summary_card_background": "string",
      "toggle_selected_bg": "string",
      "toggle_selected_text": "string",
      "toggle_hover_bg": "string",
      "toggle_hover_text": "string",
      "toggle_border_color": "string",
      "dropdown_hover_bg": "string",
      "dropdown_hover_text": "string",
      "dropdown_selected_bg": "string",
      "dropdown_selected_text": "string",
      "switch_unchecked_color": "string",
      "switch_unchecked_bg": "string",
      "switch_border_radius": 0,
      "checkbox_unchecked_color": "string",
      "checkbox_label_color": "string",
      "radio_unchecked_color": "string",
      "radio_label_color": "string",
      "datepicker_selected_bg": "string",
      "datepicker_selected_color": "string",
      "datepicker_border_radius": 0,
      "chip_background": "string",
      "chip_hover_background": "string",
      "chip_text_color": "string",
      "chip_hover_text_color": "string"
    },
    "version": 1,
    "colors": {},
    "typography": {},
    "shape": {},
    "components": {},
    "assets": {},
    "consumer": {
      "widgets": [],
      "customer_portals": []
    }
  }
}
```

</details>

---

### `duplicateDesignAsV1`

Duplicate a classic design (no version) as a v1 design document. The original stays as it is. The copy is named "``<name>`` (v1)", starts with no journeys or portals and keeps the original's journey field

`POST /v1/designs/{designId}/duplicate-as-v1`

```ts
const { data } = await client.duplicateDesignAsV1(
  {
    designId: 'example',
  },
  {
    dry_run: true,
    answers: {
      assets: {
        logo: 0,
        favicon: 0
      },
      journeys: {
        primary_color: 'sync',
        font: 'sync',
        border_radius: 'sync',
        logo: 'sync'
      }
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "message": "string",
  "conversion": {
    "name": "string",
    "asset_questions": [
      {
        "kind": "logo",
        "options": [
          {
            "asset": {},
            "sources": [
              {
                "portal_id": "string",
                "portal_name": "string",
                "page": "string"
              }
            ]
          }
        ]
      }
    ],
    "journey_questions": [
      {
        "leaf": "primary_color",
        "journeys": {},
        "design": {},
        "adoptable": true
      }
    ],
    "open": {
      "assets": ["string"],
      "journeys": ["string"]
    },
    "unmapped": {},
    "radius_adjusted": {},
    "hex_normalized": {},
    "notes": ["string"],
    "invalid": ["string"]
  }
}
```

</details>

---

### `getDesignVariables`

The design as flat `design.*` template variables (e.g. `design.colors.primary`, `design.assets.logo.url`), for consumers that render designs into text templates such as email templates. Classic design

`GET /v1/designs/{designId}/variables`

```ts
const { data } = await client.getDesignVariables({
  designId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "design_id": "string",
  "variables": {
    "design.name": "Stadtwerke Blau",
    "design.colors.primary": "#0054A6",
    "design.shape.radius": "8",
    "design.assets.logo.url": "https://go.epilot.cloud/designs/org/logo/logo.png"
  }
}
```

</details>

---

### `generateDesign`

Generates a design (palette, text colours, font, logo and border radius) from a public
website with AI. The result is cached per organization and URL for 30 days.

`POST /v1/designs/generate`

```ts
const { data } = await client.generateDesign(
  null,
  {
    url: 'https://www.twl.de'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "design": {
    "style": {
      "logo": {
        "main": {
          "name": "string",
          "display_name": "string",
          "file_type": "LOGO",
          "s3_object_key": "string",
          "url": "string",
          "file_id": "string"
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
      }
    },
    "theme": {
      "shape": {
        "borderRadius": "8"
      }
    }
  },
  "cached": true
}
```

</details>

---

### `generateDesignDocument`

Reads a public website and returns a v1 design document plus one finding for each
id in fixed order. This version chooses the favicon in code and derives the site name.
The other findings are `not_fou

`POST /v1/designs/document/generate`

```ts
const { data } = await client.generateDesignDocument(
  null,
  {
    url: 'https://www.stadtwerke-musterstadt.de'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "document": {
    "version": 1,
    "colors": {},
    "typography": {},
    "shape": {},
    "components": {},
    "assets": {},
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
  "findings": [
    {
      "id": "primary_color",
      "status": "found",
      "detail": {
        "family": "string"
      }
    },
    {
      "id": "primary_color",
      "status": "found",
      "detail": {
        "family": "string"
      }
    }
  ],
  "site_name": "Stadtwerke Musterstadt",
  "cached": true
}
```

</details>

---

### `createDesignDocumentJob`

Generates a v1 design document from a public website like `generateDesignDocument`, returns it
right away as `baseline`, and starts an AI review of it in the background. The review looks at the
websit

`POST /v1/designs/document/generate/jobs`

```ts
const { data } = await client.createDesignDocumentJob(
  null,
  {
    url: 'https://www.stadtwerke-musterstadt.de',
    language: 'de',
    attachments: [
      {
        s3ref: {
          bucket: 'string',
          key: 'string'
        },
        mime_type: 'application/pdf',
        filename: 'string'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "job_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "running",
  "steps": ["string"],
  "screenshots": [
    {
      "index": 0,
      "label": "string",
      "kind": "string",
      "box": {
        "x": 0,
        "y": 0,
        "width": 0,
        "height": 0
      },
      "page_url": "string",
      "tool": "string",
      "taken_at": "string",
      "data_url": "string"
    }
  ],
  "baseline": {
    "document": {
      "version": 1,
      "colors": {},
      "typography": {},
      "shape": {},
      "components": {},
      "assets": {},
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
    "findings": [
      {
        "id": "primary_color",
        "status": "found",
        "detail": {
          "family": "string"
        }
      }
    ],
    "site_name": "string"
  },
  "result": {
    "document": {
      "version": 1,
      "colors": {},
      "typography": {},
      "shape": {},
      "components": {},
      "assets": {},
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
    "findings": [
      {
        "id": "primary_color",
        "status": "found",
        "detail": {
          "family": "string"
        }
      }
    ],
    "site_name": "string",
    "notes": "string",
    "changes": [
      {
        "id": "primary_color",
        "change": "confirmed",
        "origin": "guidelines",
        "source": "string"
      }
    ]
  }
}
```

</details>

---

### `getDesignDocumentJob`

The state of a design document review started with `createDesignDocumentJob`. While it runs,
`steps` lists the browser tools used so far. When it completes, `result` holds the reviewed design
document

`GET /v1/designs/document/generate/jobs/{jobId}`

```ts
const { data } = await client.getDesignDocumentJob({
  jobId: 'example',
  screenshots_after: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "job_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "running",
  "steps": ["string"],
  "screenshots": [
    {
      "index": 0,
      "label": "string",
      "kind": "string",
      "box": {
        "x": 0,
        "y": 0,
        "width": 0,
        "height": 0
      },
      "page_url": "string",
      "tool": "string",
      "taken_at": "string",
      "data_url": "string"
    }
  ],
  "baseline": {
    "document": {
      "version": 1,
      "colors": {},
      "typography": {},
      "shape": {},
      "components": {},
      "assets": {},
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
    "findings": [
      {
        "id": "primary_color",
        "status": "found",
        "detail": {
          "family": "string"
        }
      }
    ],
    "site_name": "string"
  },
  "result": {
    "document": {
      "version": 1,
      "colors": {},
      "typography": {},
      "shape": {},
      "components": {},
      "assets": {},
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
    "findings": [
      {
        "id": "primary_color",
        "status": "found",
        "detail": {
          "family": "string"
        }
      }
    ],
    "site_name": "string",
    "notes": "string",
    "changes": [
      {
        "id": "primary_color",
        "change": "confirmed",
        "origin": "guidelines",
        "source": "string"
      }
    ]
  }
}
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
  "url": "string",
  "file_id": "string"
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
    "url": "string",
    "file_id": "string"
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
      "logo": {},
      "palette": {},
      "typography": {},
      "shape": {},
      "consumer": {}
    },
    "is_default": true,
    "_manifest": ["string"],
    "custom_theme": "string",
    "use_custom_theme": true,
    "design_tokens": {
      "coupon": "string",
      "cashback": "string",
      "custom_css": "string",
      "accent_color": "string",
      "outline_color": "string",
      "divider_color": "string",
      "link_color": "string",
      "link_hover_color": "string",
      "font_size_scale": "xs",
      "topbar_height": 0,
      "topbar_logo_alignment": "flex-start",
      "logo_size": 0,
      "input_background": "string",
      "input_border_color": "string",
      "input_text_color": "string",
      "input_label_color": "string",
      "input_border_radius": 0,
      "input_height": 0,
      "input_variant": "outlined",
      "button_primary_bg": "string",
      "button_primary_text": "string",
      "button_primary_hover_bg": "string",
      "button_primary_hover_text": "string",
      "button_outlined_border": "string",
      "button_outlined_text": "string",
      "button_outlined_hover_bg": "string",
      "button_outlined_hover_text": "string",
      "button_ghost_bg": "string",
      "button_ghost_text": "string",
      "button_ghost_hover_bg": "string",
      "button_ghost_hover_text": "string",
      "button_border_radius": 0,
      "button_height": 0,
      "card_background": "string",
      "card_border_color": "string",
      "card_variant": "shadow",
      "summary_card_background": "string",
      "toggle_selected_bg": "string",
      "toggle_selected_text": "string",
      "toggle_hover_bg": "string",
      "toggle_hover_text": "string",
      "toggle_border_color": "string",
      "dropdown_hover_bg": "string",
      "dropdown_hover_text": "string",
      "dropdown_selected_bg": "string",
      "dropdown_selected_text": "string",
      "switch_unchecked_color": "string",
      "switch_unchecked_bg": "string",
      "switch_border_radius": 0,
      "checkbox_unchecked_color": "string",
      "checkbox_label_color": "string",
      "radio_unchecked_color": "string",
      "radio_label_color": "string",
      "datepicker_selected_bg": "string",
      "datepicker_selected_color": "string",
      "datepicker_border_radius": 0,
      "chip_background": "string",
      "chip_hover_background": "string",
      "chip_text_color": "string",
      "chip_hover_text_color": "string"
    },
    "version": 1,
    "colors": {},
    "typography": {},
    "shape": {},
    "components": {},
    "assets": {},
    "consumer": {
      "widgets": [],
      "customer_portals": []
    }
  }
}
```

</details>

---

## Schemas

### `DuplicateDesignAsV1Req`

```ts
type DuplicateDesignAsV1Req = {
  dry_run?: boolean
  answers?: {
    assets?: {
      logo?: { ... }
      favicon?: { ... }
    }
    journeys?: {
      primary_color?: { ... }
      font?: { ... }
      border_radius?: { ... }
      logo?: { ... }
    }
  }
}
```

### `JourneyChoice`

```ts
type JourneyChoice = "sync" | "design" | "keep"
```

### `DuplicateDesignAsV1Plan`

```ts
type DuplicateDesignAsV1Plan = {
  message?: string
  conversion?: {
    name?: string
    asset_questions?: Array<{
      kind?: { ... }
      options?: { ... }
    }>
    journey_questions?: Array<{
      leaf?: { ... }
      journeys?: { ... }
      design?: { ... }
      adoptable?: { ... }
    }>
    open?: {
      assets?: { ... }
      journeys?: { ... }
    }
    unmapped?: Record<string, unknown>
    radius_adjusted?: Record<string, unknown>
    hex_normalized?: Record<string, string>
    notes?: string[]
    invalid?: string[]
  }
}
```

### `UploadFileReq`

```ts
type UploadFileReq = {
  file_type: "LOGO" | "FONT" | "IMAGE"
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
  file_type?: "LOGO" | "FONT" | "IMAGE"
  s3_object_key: string
  url: string
  file_id?: string
}
```

### `GetFilesRes`

```ts
type GetFilesRes = Array<{
  name: string
  display_name?: string
  file_type?: "LOGO" | "FONT" | "IMAGE"
  s3_object_key: string
  url: string
  file_id?: string
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
    _manifest?: string[]
    custom_theme?: string
    use_custom_theme?: boolean
    design_tokens?: {
      coupon?: { ... }
      cashback?: { ... }
      custom_css?: { ... }
      accent_color?: { ... }
      outline_color?: { ... }
      divider_color?: { ... }
      link_color?: { ... }
      link_hover_color?: { ... }
      font_size_scale?: { ... }
      topbar_height?: { ... }
      topbar_logo_alignment?: { ... }
      logo_size?: { ... }
      input_background?: { ... }
      input_border_color?: { ... }
      input_text_color?: { ... }
      input_label_color?: { ... }
      input_border_radius?: { ... }
      input_height?: { ... }
      input_variant?: { ... }
      button_primary_bg?: { ... }
      button_primary_text?: { ... }
      button_primary_hover_bg?: { ... }
      button_primary_hover_text?: { ... }
      button_outlined_border?: { ... }
      button_outlined_text?: { ... }
      button_outlined_hover_bg?: { ... }
      button_outlined_hover_text?: { ... }
      button_ghost_bg?: { ... }
      button_ghost_text?: { ... }
      button_ghost_hover_bg?: { ... }
      button_ghost_hover_text?: { ... }
      button_border_radius?: { ... }
      button_height?: { ... }
      card_background?: { ... }
      card_border_color?: { ... }
      card_variant?: { ... }
      summary_card_background?: { ... }
      toggle_selected_bg?: { ... }
      toggle_selected_text?: { ... }
      toggle_hover_bg?: { ... }
      toggle_hover_text?: { ... }
      toggle_border_color?: { ... }
      dropdown_hover_bg?: { ... }
      dropdown_hover_text?: { ... }
      dropdown_selected_bg?: { ... }
      dropdown_selected_text?: { ... }
      switch_unchecked_color?: { ... }
      switch_unchecked_bg?: { ... }
      switch_border_radius?: { ... }
      checkbox_unchecked_color?: { ... }
      checkbox_label_color?: { ... }
      radio_unchecked_color?: { ... }
      radio_label_color?: { ... }
      datepicker_selected_bg?: { ... }
      datepicker_selected_color?: { ... }
      datepicker_border_radius?: { ... }
      chip_background?: { ... }
      chip_hover_background?: { ... }
      chip_text_color?: { ... }
      chip_hover_text_color?: { ... }
    }
    version?: 1
    colors?: Record<string, unknown>
    typography?: Record<string, unknown>
    shape?: Record<string, unknown>
    components?: Record<string, unknown>
    assets?: Record<string, unknown>
    consumer?: {
      widgets: { ... }
      customer_portals: { ... }
    }
  }>
  // ...
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
    _manifest?: string[]
    custom_theme?: string
    use_custom_theme?: boolean
    design_tokens?: {
      coupon?: { ... }
      cashback?: { ... }
      custom_css?: { ... }
      accent_color?: { ... }
      outline_color?: { ... }
      divider_color?: { ... }
      link_color?: { ... }
      link_hover_color?: { ... }
      font_size_scale?: { ... }
      topbar_height?: { ... }
      topbar_logo_alignment?: { ... }
      logo_size?: { ... }
      input_background?: { ... }
      input_border_color?: { ... }
      input_text_color?: { ... }
      input_label_color?: { ... }
      input_border_radius?: { ... }
      input_height?: { ... }
      input_variant?: { ... }
      button_primary_bg?: { ... }
      button_primary_text?: { ... }
      button_primary_hover_bg?: { ... }
      button_primary_hover_text?: { ... }
      button_outlined_border?: { ... }
      button_outlined_text?: { ... }
      button_outlined_hover_bg?: { ... }
      button_outlined_hover_text?: { ... }
      button_ghost_bg?: { ... }
      button_ghost_text?: { ... }
      button_ghost_hover_bg?: { ... }
      button_ghost_hover_text?: { ... }
      button_border_radius?: { ... }
      button_height?: { ... }
      card_background?: { ... }
      card_border_color?: { ... }
      card_variant?: { ... }
      summary_card_background?: { ... }
      toggle_selected_bg?: { ... }
      toggle_selected_text?: { ... }
      toggle_hover_bg?: { ... }
      toggle_hover_text?: { ... }
      toggle_border_color?: { ... }
      dropdown_hover_bg?: { ... }
      dropdown_hover_text?: { ... }
      dropdown_selected_bg?: { ... }
      dropdown_selected_text?: { ... }
      switch_unchecked_color?: { ... }
      switch_unchecked_bg?: { ... }
      switch_border_radius?: { ... }
      checkbox_unchecked_color?: { ... }
      checkbox_label_color?: { ... }
      radio_unchecked_color?: { ... }
      radio_label_color?: { ... }
      datepicker_selected_bg?: { ... }
      datepicker_selected_color?: { ... }
      datepicker_border_radius?: { ... }
      chip_background?: { ... }
      chip_hover_background?: { ... }
      chip_text_color?: { ... }
      chip_hover_text_color?: { ... }
    }
    version?: 1
    colors?: Record<string, unknown>
    typography?: Record<string, unknown>
    shape?: Record<string, unknown>
    components?: Record<string, unknown>
    assets?: Record<string, unknown>
    consumer?: {
      widgets: { ... }
      customer_portals: { ... }
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
    _manifest?: string[]
    custom_theme?: string
    use_custom_theme?: boolean
    design_tokens?: {
      coupon?: { ... }
      cashback?: { ... }
      custom_css?: { ... }
      accent_color?: { ... }
      outline_color?: { ... }
      divider_color?: { ... }
      link_color?: { ... }
      link_hover_color?: { ... }
      font_size_scale?: { ... }
      topbar_height?: { ... }
      topbar_logo_alignment?: { ... }
      logo_size?: { ... }
      input_background?: { ... }
      input_border_color?: { ... }
      input_text_color?: { ... }
      input_label_color?: { ... }
      input_border_radius?: { ... }
      input_height?: { ... }
      input_variant?: { ... }
      button_primary_bg?: { ... }
      button_primary_text?: { ... }
      button_primary_hover_bg?: { ... }
      button_primary_hover_text?: { ... }
      button_outlined_border?: { ... }
      button_outlined_text?: { ... }
      button_outlined_hover_bg?: { ... }
      button_outlined_hover_text?: { ... }
      button_ghost_bg?: { ... }
      button_ghost_text?: { ... }
      button_ghost_hover_bg?: { ... }
      button_ghost_hover_text?: { ... }
      button_border_radius?: { ... }
      button_height?: { ... }
      card_background?: { ... }
      card_border_color?: { ... }
      card_variant?: { ... }
      summary_card_background?: { ... }
      toggle_selected_bg?: { ... }
      toggle_selected_text?: { ... }
      toggle_hover_bg?: { ... }
      toggle_hover_text?: { ... }
      toggle_border_color?: { ... }
      dropdown_hover_bg?: { ... }
      dropdown_hover_text?: { ... }
      dropdown_selected_bg?: { ... }
      dropdown_selected_text?: { ... }
      switch_unchecked_color?: { ... }
      switch_unchecked_bg?: { ... }
      switch_border_radius?: { ... }
      checkbox_unchecked_color?: { ... }
      checkbox_label_color?: { ... }
      radio_unchecked_color?: { ... }
      radio_label_color?: { ... }
      datepicker_selected_bg?: { ... }
      datepicker_selected_color?: { ... }
      datepicker_border_radius?: { ... }
      chip_background?: { ... }
      chip_hover_background?: { ... }
      chip_text_color?: { ... }
      chip_hover_text_color?: { ... }
    }
    version?: 1
    colors?: Record<string, unknown>
    typography?: Record<string, unknown>
    shape?: Record<string, unknown>
    components?: Record<string, unknown>
    assets?: Record<string, unknown>
    consumer?: {
      widgets: { ... }
      customer_portals: { ... }
    }
  }
  // ...
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
    _manifest?: string[]
    custom_theme?: string
    use_custom_theme?: boolean
    design_tokens?: {
      coupon?: { ... }
      cashback?: { ... }
      custom_css?: { ... }
      accent_color?: { ... }
      outline_color?: { ... }
      divider_color?: { ... }
      link_color?: { ... }
      link_hover_color?: { ... }
      font_size_scale?: { ... }
      topbar_height?: { ... }
      topbar_logo_alignment?: { ... }
      logo_size?: { ... }
      input_background?: { ... }
      input_border_color?: { ... }
      input_text_color?: { ... }
      input_label_color?: { ... }
      input_border_radius?: { ... }
      input_height?: { ... }
      input_variant?: { ... }
      button_primary_bg?: { ... }
      button_primary_text?: { ... }
      button_primary_hover_bg?: { ... }
      button_primary_hover_text?: { ... }
      button_outlined_border?: { ... }
      button_outlined_text?: { ... }
      button_outlined_hover_bg?: { ... }
      button_outlined_hover_text?: { ... }
      button_ghost_bg?: { ... }
      button_ghost_text?: { ... }
      button_ghost_hover_bg?: { ... }
      button_ghost_hover_text?: { ... }
      button_border_radius?: { ... }
      button_height?: { ... }
      card_background?: { ... }
      card_border_color?: { ... }
      card_variant?: { ... }
      summary_card_background?: { ... }
      toggle_selected_bg?: { ... }
      toggle_selected_text?: { ... }
      toggle_hover_bg?: { ... }
      toggle_hover_text?: { ... }
      toggle_border_color?: { ... }
      dropdown_hover_bg?: { ... }
      dropdown_hover_text?: { ... }
      dropdown_selected_bg?: { ... }
      dropdown_selected_text?: { ... }
      switch_unchecked_color?: { ... }
      switch_unchecked_bg?: { ... }
      switch_border_radius?: { ... }
      checkbox_unchecked_color?: { ... }
      checkbox_label_color?: { ... }
      radio_unchecked_color?: { ... }
      radio_label_color?: { ... }
      datepicker_selected_bg?: { ... }
      datepicker_selected_color?: { ... }
      datepicker_border_radius?: { ... }
      chip_background?: { ... }
      chip_hover_background?: { ... }
      chip_text_color?: { ... }
      chip_hover_text_color?: { ... }
    }
    version?: 1
    colors?: Record<string, unknown>
    typography?: Record<string, unknown>
    shape?: Record<string, unknown>
    components?: Record<string, unknown>
    assets?: Record<string, unknown>
    consumer?: {
      widgets: { ... }
      customer_portals: { ... }
    }
  }
  // ...
}
```

### `GetDesignVariablesRes`

```ts
type GetDesignVariablesRes = {
  design_id: string
  variables: Record<string, string>
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
    _manifest?: string[]
    custom_theme?: string
    use_custom_theme?: boolean
    design_tokens?: {
      coupon?: { ... }
      cashback?: { ... }
      custom_css?: { ... }
      accent_color?: { ... }
      outline_color?: { ... }
      divider_color?: { ... }
      link_color?: { ... }
      link_hover_color?: { ... }
      font_size_scale?: { ... }
      topbar_height?: { ... }
      topbar_logo_alignment?: { ... }
      logo_size?: { ... }
      input_background?: { ... }
      input_border_color?: { ... }
      input_text_color?: { ... }
      input_label_color?: { ... }
      input_border_radius?: { ... }
      input_height?: { ... }
      input_variant?: { ... }
      button_primary_bg?: { ... }
      button_primary_text?: { ... }
      button_primary_hover_bg?: { ... }
      button_primary_hover_text?: { ... }
      button_outlined_border?: { ... }
      button_outlined_text?: { ... }
      button_outlined_hover_bg?: { ... }
      button_outlined_hover_text?: { ... }
      button_ghost_bg?: { ... }
      button_ghost_text?: { ... }
      button_ghost_hover_bg?: { ... }
      button_ghost_hover_text?: { ... }
      button_border_radius?: { ... }
      button_height?: { ... }
      card_background?: { ... }
      card_border_color?: { ... }
      card_variant?: { ... }
      summary_card_background?: { ... }
      toggle_selected_bg?: { ... }
      toggle_selected_text?: { ... }
      toggle_hover_bg?: { ... }
      toggle_hover_text?: { ... }
      toggle_border_color?: { ... }
      dropdown_hover_bg?: { ... }
      dropdown_hover_text?: { ... }
      dropdown_selected_bg?: { ... }
      dropdown_selected_text?: { ... }
      switch_unchecked_color?: { ... }
      switch_unchecked_bg?: { ... }
      switch_border_radius?: { ... }
      checkbox_unchecked_color?: { ... }
      checkbox_label_color?: { ... }
      radio_unchecked_color?: { ... }
      radio_label_color?: { ... }
      datepicker_selected_bg?: { ... }
      datepicker_selected_color?: { ... }
      datepicker_border_radius?: { ... }
      chip_background?: { ... }
      chip_hover_background?: { ... }
      chip_text_color?: { ... }
      chip_hover_text_color?: { ... }
    }
    version?: 1
    colors?: Record<string, unknown>
    typography?: Record<string, unknown>
    shape?: Record<string, unknown>
    components?: Record<string, unknown>
    assets?: Record<string, unknown>
    consumer?: {
      widgets: { ... }
      customer_portals: { ... }
    }
  }
  journey_write?: {
    primary_color?: "keep" | "sync"
    font?: "keep" | "sync"
    border_radius?: "keep" | "sync"
    logo?: "keep" | "sync"
  // ...
}
```

### `Journey_Write`

```ts
type Journey_Write = "keep" | "sync"
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
}
```

### `RemoveConsumerReq`

```ts
type RemoveConsumerReq = {
  consumer_id: string
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
  _manifest?: string[]
}
```

### `Design_Document_V1`

Groups of the design document v1. A design is v1 when `version` is 1, otherwise it is the old shape (`style`, `design_tokens`, `custom_theme`). The authoritative contract for the groups is the schema exported by @epilot/design-document. A v1 design keeps `style`, `design_tokens`, `custom_theme` and 

```ts
type Design_Document_V1 = {
  version?: 1
  colors?: Record<string, unknown>
  typography?: Record<string, unknown>
  shape?: Record<string, unknown>
  components?: Record<string, unknown>
  assets?: Record<string, unknown>
  consumer?: {
    widgets: Array<{
      id: { ... }
      name: { ... }
    }>
    customer_portals: Array<{
      id: { ... }
      name: { ... }
    }>
  }
}
```

### `UpdateDesignConflict`

```ts
type UpdateDesignConflict = {
  message?: string
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
    _manifest?: string[]
    custom_theme?: string
    use_custom_theme?: boolean
    design_tokens?: {
      coupon?: { ... }
      cashback?: { ... }
      custom_css?: { ... }
      accent_color?: { ... }
      outline_color?: { ... }
      divider_color?: { ... }
      link_color?: { ... }
      link_hover_color?: { ... }
      font_size_scale?: { ... }
      topbar_height?: { ... }
      topbar_logo_alignment?: { ... }
      logo_size?: { ... }
      input_background?: { ... }
      input_border_color?: { ... }
      input_text_color?: { ... }
      input_label_color?: { ... }
      input_border_radius?: { ... }
      input_height?: { ... }
      input_variant?: { ... }
      button_primary_bg?: { ... }
      button_primary_text?: { ... }
      button_primary_hover_bg?: { ... }
      button_primary_hover_text?: { ... }
      button_outlined_border?: { ... }
      button_outlined_text?: { ... }
      button_outlined_hover_bg?: { ... }
      button_outlined_hover_text?: { ... }
      button_ghost_bg?: { ... }
      button_ghost_text?: { ... }
      button_ghost_hover_bg?: { ... }
      button_ghost_hover_text?: { ... }
      button_border_radius?: { ... }
      button_height?: { ... }
      card_background?: { ... }
      card_border_color?: { ... }
      card_variant?: { ... }
      summary_card_background?: { ... }
      toggle_selected_bg?: { ... }
      toggle_selected_text?: { ... }
      toggle_hover_bg?: { ... }
      toggle_hover_text?: { ... }
      toggle_border_color?: { ... }
      dropdown_hover_bg?: { ... }
      dropdown_hover_text?: { ... }
      dropdown_selected_bg?: { ... }
      dropdown_selected_text?: { ... }
      switch_unchecked_color?: { ... }
      switch_unchecked_bg?: { ... }
      switch_border_radius?: { ... }
      checkbox_unchecked_color?: { ... }
      checkbox_label_color?: { ... }
      radio_unchecked_color?: { ... }
      radio_label_color?: { ... }
      datepicker_selected_bg?: { ... }
      datepicker_selected_color?: { ... }
      datepicker_border_radius?: { ... }
      chip_background?: { ... }
      chip_hover_background?: { ... }
      chip_text_color?: { ... }
      chip_hover_text_color?: { ... }
    }
    version?: 1
    colors?: Record<string, unknown>
    typography?: Record<string, unknown>
    shape?: Record<string, unknown>
    components?: Record<string, unknown>
    assets?: Record<string, unknown>
    consumer?: {
      widgets: { ... }
      customer_portals: { ... }
    }
  // ...
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
    accent_color?: string
    outline_color?: string
    divider_color?: string
    link_color?: string
    link_hover_color?: string
    font_size_scale?: "xs" | "sm" | "md" | "lg" | "xl"
    topbar_height?: number
    topbar_logo_alignment?: "flex-start" | "center" | "flex-end"
    logo_size?: number
    input_background?: string
    input_border_color?: string
    input_text_color?: string
    input_label_color?: string
    input_border_radius?: number
    input_height?: number
    input_variant?: "outlined" | "filled" | "underlined"
    button_primary_bg?: string
    button_primary_text?: string
    button_primary_hover_bg?: string
    button_primary_hover_text?: string
    button_outlined_border?: string
    button_outlined_text?: string
    button_outlined_hover_bg?: string
    button_outlined_hover_text?: string
    button_ghost_bg?: string
    button_ghost_text?: string
    button_ghost_hover_bg?: string
    button_ghost_hover_text?: string
    button_border_radius?: number
    button_height?: number
    card_background?: string
    card_border_color?: string
    card_variant?: "shadow" | "outlined"
    summary_card_background?: string
    toggle_selected_bg?: string
    toggle_selected_text?: string
    toggle_hover_bg?: string
    toggle_hover_text?: string
    toggle_border_color?: string
    dropdown_hover_bg?: string
    dropdown_hover_text?: string
    dropdown_selected_bg?: string
    dropdown_selected_text?: string
    switch_unchecked_color?: string
    switch_unchecked_bg?: string
    switch_border_radius?: number
    checkbox_unchecked_color?: string
    checkbox_label_color?: string
    radio_unchecked_color?: string
    radio_label_color?: string
    datepicker_selected_bg?: string
    datepicker_selected_color?: string
    datepicker_border_radius?: number
    chip_background?: string
    chip_hover_background?: string
    chip_text_color?: string
    chip_hover_text_color?: string
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
    file_type?: "LOGO" | "FONT" | "IMAGE"
    s3_object_key: string
    url: string
    file_id?: string
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

### `GenerateDesignReq`

```ts
type GenerateDesignReq = {
  url: string // uri
}
```

### `GenerateDesignRes`

```ts
type GenerateDesignRes = {
  design: {
    style: {
      logo: { ... }
      palette: { ... }
      typography: { ... }
    }
    theme: {
      shape: { ... }
    }
  }
  cached: boolean
}
```

### `GenerateDesignDocumentReq`

```ts
type GenerateDesignDocumentReq = {
  url: string // uri
}
```

### `FindingId`

```ts
type FindingId = "primary_color" | "fonts" | "corners" | "primary_button" | "logo" | "favicon"
```

### `FindingStatus`

```ts
type FindingStatus = "found" | "not_found" | "not_available"
```

### `FindingDetail`

```ts
type FindingDetail = {
  family: string
}
```

### `DesignFinding`

```ts
type DesignFinding = {
  id: "primary_color" | "fonts" | "corners" | "primary_button" | "logo" | "favicon"
  status: "found" | "not_found" | "not_available"
  detail?: {
    family: string
  }
}
```

### `GenerateDesignDocumentRes`

```ts
type GenerateDesignDocumentRes = {
  document: {
    version?: 1
    colors?: Record<string, unknown>
    typography?: Record<string, unknown>
    shape?: Record<string, unknown>
    components?: Record<string, unknown>
    assets?: Record<string, unknown>
    consumer?: {
      widgets: { ... }
      customer_portals: { ... }
    }
  }
  findings: Array<{
    id: "primary_color" | "fonts" | "corners" | "primary_button" | "logo" | "favicon"
    status: "found" | "not_found" | "not_available"
    detail?: {
      family: { ... }
    }
  }>
  site_name: string
  cached: boolean
}
```

### `CreateDesignDocumentJobReq`

```ts
type CreateDesignDocumentJobReq = {
  url: string // uri
  language?: "de" | "en"
  attachments?: Array<{
    s3ref: {
      bucket: { ... }
      key: { ... }
    }
    mime_type: "application/pdf" | "image/png" | "image/jpeg" | "image/webp"
    filename?: string
  }>
}
```

### `BrandGuidelineAttachment`

```ts
type BrandGuidelineAttachment = {
  s3ref: {
    bucket: string
    key: string
  }
  mime_type: "application/pdf" | "image/png" | "image/jpeg" | "image/webp"
  filename?: string
}
```

### `GeneratedDesignDocument`

```ts
type GeneratedDesignDocument = {
  document: {
    version?: 1
    colors?: Record<string, unknown>
    typography?: Record<string, unknown>
    shape?: Record<string, unknown>
    components?: Record<string, unknown>
    assets?: Record<string, unknown>
    consumer?: {
      widgets: { ... }
      customer_portals: { ... }
    }
  }
  findings: Array<{
    id: "primary_color" | "fonts" | "corners" | "primary_button" | "logo" | "favicon"
    status: "found" | "not_found" | "not_available"
    detail?: {
      family: { ... }
    }
  }>
  site_name: string
}
```

### `ReviewChange`

```ts
type ReviewChange = {
  id: "primary_color" | "fonts" | "corners" | "primary_button" | "logo"
  change: "confirmed" | "changed" | "added" | "removed"
  origin?: "guidelines" | "website"
  source?: string
}
```

### `ReviewScreenshot`

```ts
type ReviewScreenshot = {
  index: number
  label: string
  kind?: string
  box?: {
    x?: number
    y?: number
    width?: number
    height?: number
  }
  page_url: string
  tool?: string
  taken_at?: string
  data_url: string
}
```

### `ReviewedDesignDocument`

```ts
type ReviewedDesignDocument = {
  document: {
    version?: 1
    colors?: Record<string, unknown>
    typography?: Record<string, unknown>
    shape?: Record<string, unknown>
    components?: Record<string, unknown>
    assets?: Record<string, unknown>
    consumer?: {
      widgets: { ... }
      customer_portals: { ... }
    }
  }
  findings: Array<{
    id: "primary_color" | "fonts" | "corners" | "primary_button" | "logo" | "favicon"
    status: "found" | "not_found" | "not_available"
    detail?: {
      family: { ... }
    }
  }>
  site_name: string
  notes: string
  changes: Array<{
    id: "primary_color" | "fonts" | "corners" | "primary_button" | "logo"
    change: "confirmed" | "changed" | "added" | "removed"
    origin?: "guidelines" | "website"
    source?: string
  }>
}
```

### `DesignDocumentJob`

```ts
type DesignDocumentJob = {
  job_id: string // uuid
  status: "running" | "completed" | "failed" | "skipped"
  steps: string[]
  screenshots?: Array<{
    index: number
    label: string
    kind?: string
    box?: {
      x?: { ... }
      y?: { ... }
      width?: { ... }
      height?: { ... }
    }
    page_url: string
    tool?: string
    taken_at?: string
    data_url: string
  }>
  baseline: {
    document: {
      version?: { ... }
      colors?: { ... }
      typography?: { ... }
      shape?: { ... }
      components?: { ... }
      assets?: { ... }
      consumer?: { ... }
    }
    findings: Array<{
      id: { ... }
      status: { ... }
      detail?: { ... }
    }>
    site_name: string
  }
  result?: {
    document: {
      version?: { ... }
      colors?: { ... }
      typography?: { ... }
      shape?: { ... }
      components?: { ... }
      assets?: { ... }
      consumer?: { ... }
    }
    findings: Array<{
      id: { ... }
      status: { ... }
      detail?: { ... }
    }>
    site_name: string
    notes: string
    changes: Array<{
      id: { ... }
      change: { ... }
      origin?: { ... }
      source?: { ... }
    }>
  }
}
```

### `GeneratedDesign`

Partial design to merge into the design being edited

```ts
type GeneratedDesign = {
  style: {
    logo: {
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
  }
  theme: {
    shape: {
      borderRadius: { ... }
    }
  }
}
```

### `ErrorResp`

```ts
type ErrorResp = {
  message?: string
  code?: string
  error?: object
}
```

### `FileData`

```ts
type FileData = {
  name: string
  display_name?: string
  file_type?: "LOGO" | "FONT" | "IMAGE"
  s3_object_key: string
  url: string
  file_id?: string
}
```

### `DesignId`

Id of the design

```ts
type DesignId = string
```

### `Theme`

Type of theme to be parsed and returned

```ts
type Theme = "NEW" | "OLD"
```

### `Application`

Type of application that uses the design

```ts
type Application = string
```

### `DesignParameters`

```ts
type DesignParameters = {
  designId?: string
  theme?: "NEW" | "OLD"
  application?: string
}
```

### `ParseThemeFromDesignResp`

```ts
type ParseThemeFromDesignResp = {
  theme?: "NEW" | "OLD"
  design?: {
    id?: string
    last_modified_at?: string
    style_name?: string
    style?: {
      logo?: { ... }
      palette?: { ... }
      typography?: { ... }
    }
    custom_theme?: string
    use_custom_theme?: boolean
    journey_design_tokens?: object
    version?: 1
    colors?: Record<string, unknown>
    typography?: Record<string, unknown>
    shape?: Record<string, unknown>
    components?: Record<string, unknown>
    assets?: Record<string, unknown>
    journey?: Record<string, unknown>
  }
}
```
