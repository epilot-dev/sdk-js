# Design Builder API v2

**API Name:** `design`
**Base URL:** `https://design-builder-api.epilot.io`

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `getAllDesigns` | GET | `/v1/designs` | getAllDesigns |
| `addDesign` | POST | `/v1/designs` | addDesign |
| `getDesign` | GET | `/v1/designs/{designId}` | getDesign |
| `updateDesign` | PUT | `/v1/designs/{designId}` | updateDesign |
| `deleteDesign` | DELETE | `/v1/designs/{designId}` | deleteDesign |
| `getThemeFromDesign` | GET | `/v1/designs/{designId}/parse` | getThemeFromDesign |
| `getFiles` | GET | `/v1/designs/files` | getFiles |
| `uploadFile` | POST | `/v1/designs/files` | uploadFile |
| `getLimit` | GET | `/v1/designs/limit` | getLimit |
| `getBrands` | GET | `/v1/brands` | getBrands |
| `getConsumerDesign` | GET | `/v1/designs/consumer/{application}/{consumerId}` | getConsumerDesign |
| `addConsumer` | PUT | `/v1/designs/addConsumer/{application}/{designId}` | addConsumer |
| `removeConsumer` | PUT | `/v1/designs/removeConsumer/{application}/{designId}` | removeConsumer |

## Usage

```bash
epilot design getAllDesigns
```
