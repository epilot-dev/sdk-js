# Sharing API

- **Base URL:** `https://sharing-api.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/sharing](https://docs.epilot.io/api/sharing)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.sharing.getSharingConfiguration({ partner_org_id: '123' })
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/sharing'

const sharingClient = getClient()
authorize(sharingClient, () => '<token>')
const { data } = await sharingClient.searchPartnerSharingConfigurations(null, { entities: [{ schema: 'contact', entity_id: '456' }] })
```

## Operations

**Sharing Configuration**
- [`getSharingConfiguration`](#getsharingconfiguration)
- [`updateSharingConfiguration`](#updatesharingconfiguration)
- [`deleteSharingConfiguration`](#deletesharingconfiguration)
- [`assignRoleToConfiguration`](#assignroletoconfiguration)
- [`getSharingConfigurations`](#getsharingconfigurations)
- [`searchPartnerSharingConfigurations`](#searchpartnersharingconfigurations)
- [`getConfigurationsByTemplateRole`](#getconfigurationsbytemplaterole)

**Entity Sharing**
- [`shareEntityWithPartners`](#shareentitywithpartners)
- [`shareChildEntityWithPartners`](#sharechildentitywithpartners)

**Entity Offering**
- [`offerEntityToPartners`](#offerentitytopartners)
- [`getOfferStatus`](#getofferstatus)
- [`acceptOffer`](#acceptoffer)

**Schemas**
- [`PartnerSharingConfig`](#partnersharingconfig)
- [`EntityResource`](#entityresource)
- [`OfferEntityResource`](#offerentityresource)
- [`OfferStatus`](#offerstatus)
- [`TemplateRoleGrant`](#templaterolegrant)

---

### `getSharingConfiguration`

Get sharing configuration for a partner.

Returns the sharing configuration for a specific partner organization, including shared entities, offered entities, and assigned users.

**Parameters:** `partner_org_id` (path)

**Response:** [`PartnerSharingConfig`](#partnersharingconfig)

---

### `updateSharingConfiguration`

Update sharing configuration for a partner.

Updates the sharing configuration for a partner, such as the user limit.

**Parameters:** `partner_org_id` (path)

**Request Body:** `UpdateSharingConfigurationPayload`

**Response:** [`PartnerSharingConfig`](#partnersharingconfig)

---

### `deleteSharingConfiguration`

Delete sharing configuration for a partner.

Deletes the sharing configuration for a partner, removing all shared and offered entity access.

**Parameters:** `partner_org_id` (path)

**Response:** [`PartnerSharingConfig`](#partnersharingconfig)

---

### `assignRoleToConfiguration`

Assign a template role to a partner sharing configuration.

**Parameters:** `partner_org_id` (path)

**Request Body:** `AssignRolePayload`

**Response:** [`PartnerSharingConfig`](#partnersharingconfig)

---

### `getSharingConfigurations`

Get sharing configurations for multiple partners in a single batch request.

**Parameters:** `partner_org_ids` (query, comma-separated)

**Response:** [`PartnerSharingConfig[]`](#partnersharingconfig)

---

### `searchPartnerSharingConfigurations`

Search partner sharing configurations that have access to given entities.

**Request Body:** `SearchSharingConfigurationsPayload`

**Response:** [`PartnerSharingConfig[]`](#partnersharingconfig)

---

### `getConfigurationsByTemplateRole`

Get sharing configurations that use a specific template role.

**Parameters:** `template_role_id` (path)

**Response:** [`PartnerSharingConfig[]`](#partnersharingconfig)

---

### `shareEntityWithPartners`

Share or unshare top-level entities with one or more partner organizations.

**Request Body:** `SharingEntityPayload`

**Response:** [`PartnerSharingConfig[]`](#partnersharingconfig)

---

### `shareChildEntityWithPartners`

Share or unshare child entities with partner organizations.

**Request Body:** `ShareChildEntityPayload`

**Response:** [`PartnerSharingConfig[]`](#partnersharingconfig)

---

### `offerEntityToPartners`

Offer or unoffer entities to partners (First Come First Served).

**Request Body:** `OfferEntityPayload`

**Response:** [`PartnerSharingConfig[]`](#partnersharingconfig)

---

### `getOfferStatus`

Get the status of an entity offer (public, no auth required).

**Parameters:** `partner_org_id`, `sharing_org_id`, `entity_id` (query)

**Response:** [`OfferStatus`](#offerstatus)

---

### `acceptOffer`

Accept an entity offer (public, no auth required).

**Request Body:** `AcceptOfferPayload`

**Response:** [`PartnerSharingConfig`](#partnersharingconfig)
