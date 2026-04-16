# Design Builder API v2

- **Base URL:** `https://design-builder-api.{environment}.epilot.io`
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
- [`RemoveConsumerReq`](#removeconsumerreq)
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
- [`DesignId`](#designid)
- [`Theme`](#theme)
- [`Application`](#application)
- [`DesignParameters`](#designparameters)

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
      "design_tokens": {}
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
    consumer_id: '4a062990-a6a3-11eb-9828-4f3da7d4935a',
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
    consumer_id: '4a062990-a6a3-11eb-9828-4f3da7d4935a',
    should_delete: 'string'
  },
)
```

---

## Schemas

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

### `RemoveConsumerReq`

```ts
type RemoveConsumerReq = {
  consumer_id: string
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
  _manifest?: string[]
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
