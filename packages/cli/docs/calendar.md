# Calendar API

- **Base URL:** `https://calendar.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/calendar](https://docs.epilot.io/api/calendar)

epilot's calendar API.

## Quick Start

```bash
# List available operations
epilot calendar

# Call an operation
epilot calendar listUsersAbsence -p from=example -p to=example
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

**Absence**
- [`listUsersAbsence`](#listusersabsence) — List organization users with known absence metadata in the requested time window.
- [`searchAbsence`](#searchabsence) — Search known absence for candidate users in the requested time window.
- [`searchNowAbsence`](#searchnowabsence) — Search known absence for candidate users at the current server time.
- [`listAbsenceAdjustments`](#listabsenceadjustments) — List absence adjustments for a user in a time window.
- [`createAbsenceAdjustment`](#createabsenceadjustment) — Create a time-bound absence adjustment for a user in the caller organization.
- [`getAbsenceAdjustment`](#getabsenceadjustment) — Get an absence adjustment by ID.
- [`patchAbsenceAdjustment`](#patchabsenceadjustment) — Update an absence adjustment in the caller organization.
- [`deleteAbsenceAdjustment`](#deleteabsenceadjustment) — Delete an absence adjustment.
- [`getUserAbsence`](#getuserabsence) — Get known absence for a user in a time window. absent=false means no known absence, not guaranteed availability.

**Working Hours**
- [`getWorkingHours`](#getworkinghours) — Get the recurring weekly working hours of a user. 404 means no record exists and the user is treated as always available
- [`putWorkingHours`](#putworkinghours) — Create or fully replace the working hours of a user in the caller organization. This is a full replace, not a merge.
- [`deleteWorkingHours`](#deleteworkinghours) — Delete the working hours of a user. The user is then treated as always available again.

**Calendars**
- [`listCalendars`](#listcalendars) — List calendars visible to the caller.
- [`createCalendar`](#createcalendar) — Create a native epilot calendar.
- [`addOutlookCalendar`](#addoutlookcalendar) — Registers one of the caller's Outlook calendars as an epilot calendar.
- [`listOutlookCalendars`](#listoutlookcalendars) — Lists the calling user's Outlook calendars available to import as epilot calendars.
- [`deleteOutlookCalendar`](#deleteoutlookcalendar) — Disconnects a previously registered Outlook calendar.
- [`outlookWebhook`](#outlookwebhook) — Public Microsoft Graph webhook receiver for per-user Outlook calendar
- [`getCalendar`](#getcalendar) — Get a single calendar by its epilot ID.
- [`updateCalendar`](#updatecalendar) — Update local calendar details. Changes to synced calendars do not modify the provider calendar.
- [`deleteCalendar`](#deletecalendar) — Delete a native epilot calendar or disconnect a synced calendar, including its locally stored events.

**Calendar Events**
- [`listEvents`](#listevents) — List events in a time window. Recurring events are returned as expanded occurrences – each instance appears as its own e
- [`createEvent`](#createevent) — Create a native epilot calendar event. Omit `calendar_id` to use the caller’s epilot default calendar.
- [`getEvent`](#getevent) — Get a single event by its epilot ID.
- [`updateEvent`](#updateevent) — Update a native epilot calendar event.
- [`deleteEvent`](#deleteevent) — Delete a native epilot calendar event.
- [`shareEvent`](#shareevent) — Share a calendar event with another user of the same organization, view-only. Owner-only: recipients of a share cannot r
- [`unshareEvent`](#unshareevent) — Revoke a per-event share. The recipient loses access immediately. Owner-only.

### `listUsersAbsence`

List organization users with known absence metadata in the requested time window.

`GET /v1/calendar/absence/users`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `from` | query | string (date-time) | Yes | Start of the time window (inclusive). Maximum window: 31 days. |
| `to` | query | string (date-time) | Yes | End of the time window (exclusive). Must be after from. |
| `include_busy` | query | boolean | No | Include busy inputs in addition to out-of-office absence. Defaults to false. |
| `working_hours_granularity` | query | "time" \| "day" | No | At what granularity working hours contribute to absence. "time" (default): all time outside a user's working windows counts as absent. "day": only full days with no working windows count as absent (wh |
| `query` | query | string | No | Optional user directory search query. |
| `limit` | query | number | No | Maximum users to return. |
| `offset` | query | number | No | User directory offset. |

**Sample Call**

```bash
epilot calendar listUsersAbsence \
  -p from=example \
  -p to=example
```

With JSONata filter:

```bash
epilot calendar listUsersAbsence -p from=example -p to=example --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "from": "1970-01-01T00:00:00.000Z",
  "to": "1970-01-01T00:00:00.000Z",
  "hits": 0,
  "results": [
    {
      "absent": true,
      "absence_intervals": [
        {
          "from": "1970-01-01T00:00:00.000Z",
          "to": "1970-01-01T00:00:00.000Z",
          "original_from": "1970-01-01T00:00:00.000Z",
          "original_to": "1970-01-01T00:00:00.000Z",
          "absent": true,
          "source": "calendar_event",
          "calendar_event_id": "string",
          "absence_adjustment_id": "string",
          "reason": "string"
        }
      ],
      "user_id": "string",
      "display_name": "string",
      "email": "user@example.com",
      "status": "string"
    }
  ]
}
```

</details>

---

### `searchAbsence`

Search known absence for candidate users in the requested time window.

`POST /v1/calendar/absence:search`

**Request Body** (required)

**Sample Call**

```bash
epilot calendar searchAbsence
```

With request body:

```bash
epilot calendar searchAbsence \
  -d '{
  "from": "1970-01-01T00:00:00.000Z",
  "to": "1970-01-01T00:00:00.000Z",
  "user_ids": ["string"],
  "include_busy": false,
  "working_hours_granularity": "time"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot calendar searchAbsence
```

With JSONata filter:

```bash
epilot calendar searchAbsence --jsonata 'from'
```

<details>
<summary>Sample Response</summary>

```json
{
  "from": "1970-01-01T00:00:00.000Z",
  "to": "1970-01-01T00:00:00.000Z",
  "users": {}
}
```

</details>

---

### `searchNowAbsence`

Search known absence for candidate users at the current server time.

`POST /v1/calendar/absence:search-now`

**Request Body** (required)

**Sample Call**

```bash
epilot calendar searchNowAbsence \
  -d '{"user_ids":["string"],"include_busy":false,"working_hours_granularity":"time"}'
```

Using stdin pipe:

```bash
cat body.json | epilot calendar searchNowAbsence
```

With JSONata filter:

```bash
epilot calendar searchNowAbsence --jsonata 'from'
```

<details>
<summary>Sample Response</summary>

```json
{
  "from": "1970-01-01T00:00:00.000Z",
  "to": "1970-01-01T00:00:00.000Z",
  "users": {}
}
```

</details>

---

### `listAbsenceAdjustments`

List absence adjustments for a user in a time window.

`GET /v1/calendar/absence/users/{user_id}/adjustments`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `user_id` | path | string | Yes |  |
| `from` | query | string (date-time) | Yes | Start of the time window (inclusive). Maximum window: 90 days. |
| `to` | query | string (date-time) | Yes | End of the time window (exclusive). Must be after from. |

**Sample Call**

```bash
epilot calendar listAbsenceAdjustments \
  -p user_id=123e4567-e89b-12d3-a456-426614174000 \
  -p from=example \
  -p to=example
```

Using positional args for path parameters:

```bash
epilot calendar listAbsenceAdjustments 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar listAbsenceAdjustments -p user_id=123e4567-e89b-12d3-a456-426614174000 -p from=example -p to=example --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "from": "1970-01-01T00:00:00.000Z",
  "to": "1970-01-01T00:00:00.000Z",
  "results": [
    {
      "from": "1970-01-01T00:00:00.000Z",
      "to": "1970-01-01T00:00:00.000Z",
      "absent": true,
      "status": "oof",
      "type": "string",
      "reason": "string",
      "adjustment_id": "string",
      "user_id": "string",
      "created_by": "string",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `createAbsenceAdjustment`

Create a time-bound absence adjustment for a user in the caller organization.

`POST /v1/calendar/absence/users/{user_id}/adjustments`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `user_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot calendar createAbsenceAdjustment \
  -p user_id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot calendar createAbsenceAdjustment \
  -p user_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "from": "1970-01-01T00:00:00.000Z",
  "to": "1970-01-01T00:00:00.000Z",
  "absent": true,
  "status": "oof",
  "type": "string",
  "reason": "string"
}'
```

Using positional args for path parameters:

```bash
epilot calendar createAbsenceAdjustment 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot calendar createAbsenceAdjustment -p user_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar createAbsenceAdjustment -p user_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'from'
```

<details>
<summary>Sample Response</summary>

```json
{
  "from": "1970-01-01T00:00:00.000Z",
  "to": "1970-01-01T00:00:00.000Z",
  "absent": true,
  "status": "oof",
  "type": "string",
  "reason": "string",
  "adjustment_id": "string",
  "user_id": "string",
  "created_by": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `getAbsenceAdjustment`

Get an absence adjustment by ID.

`GET /v1/calendar/absence/users/{user_id}/adjustments/{adjustment_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `user_id` | path | string | Yes |  |
| `adjustment_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot calendar getAbsenceAdjustment \
  -p user_id=123e4567-e89b-12d3-a456-426614174000 \
  -p adjustment_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot calendar getAbsenceAdjustment 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar getAbsenceAdjustment -p user_id=123e4567-e89b-12d3-a456-426614174000 -p adjustment_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'from'
```

<details>
<summary>Sample Response</summary>

```json
{
  "from": "1970-01-01T00:00:00.000Z",
  "to": "1970-01-01T00:00:00.000Z",
  "absent": true,
  "status": "oof",
  "type": "string",
  "reason": "string",
  "adjustment_id": "string",
  "user_id": "string",
  "created_by": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `patchAbsenceAdjustment`

Update an absence adjustment in the caller organization.

`PATCH /v1/calendar/absence/users/{user_id}/adjustments/{adjustment_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `user_id` | path | string | Yes |  |
| `adjustment_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot calendar patchAbsenceAdjustment \
  -p user_id=123e4567-e89b-12d3-a456-426614174000 \
  -p adjustment_id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot calendar patchAbsenceAdjustment \
  -p user_id=123e4567-e89b-12d3-a456-426614174000 \
  -p adjustment_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "from": "1970-01-01T00:00:00.000Z",
  "to": "1970-01-01T00:00:00.000Z",
  "absent": true,
  "status": "oof",
  "type": "string",
  "reason": "string"
}'
```

Using positional args for path parameters:

```bash
epilot calendar patchAbsenceAdjustment 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot calendar patchAbsenceAdjustment -p user_id=123e4567-e89b-12d3-a456-426614174000 -p adjustment_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar patchAbsenceAdjustment -p user_id=123e4567-e89b-12d3-a456-426614174000 -p adjustment_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'from'
```

<details>
<summary>Sample Response</summary>

```json
{
  "from": "1970-01-01T00:00:00.000Z",
  "to": "1970-01-01T00:00:00.000Z",
  "absent": true,
  "status": "oof",
  "type": "string",
  "reason": "string",
  "adjustment_id": "string",
  "user_id": "string",
  "created_by": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteAbsenceAdjustment`

Delete an absence adjustment.

`DELETE /v1/calendar/absence/users/{user_id}/adjustments/{adjustment_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `user_id` | path | string | Yes |  |
| `adjustment_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot calendar deleteAbsenceAdjustment \
  -p user_id=123e4567-e89b-12d3-a456-426614174000 \
  -p adjustment_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot calendar deleteAbsenceAdjustment 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar deleteAbsenceAdjustment -p user_id=123e4567-e89b-12d3-a456-426614174000 -p adjustment_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `getUserAbsence`

Get known absence for a user in a time window. absent=false means no known absence, not guaranteed availability.

`GET /v1/calendar/absence/users/{user_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `user_id` | path | string | Yes |  |
| `from` | query | string (date-time) | Yes | Start of the time window (inclusive). Maximum window: 31 days. |
| `to` | query | string (date-time) | Yes | End of the time window (exclusive). Must be after from. |
| `include_busy` | query | boolean | No | Include busy inputs in addition to out-of-office absence. Defaults to false. |
| `working_hours_granularity` | query | "time" \| "day" | No | At what granularity working hours contribute to absence. "time" (default): all time outside a user's working windows counts as absent. "day": only full days with no working windows count as absent (wh |

**Sample Call**

```bash
epilot calendar getUserAbsence \
  -p user_id=123e4567-e89b-12d3-a456-426614174000 \
  -p from=example \
  -p to=example
```

Using positional args for path parameters:

```bash
epilot calendar getUserAbsence 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar getUserAbsence -p user_id=123e4567-e89b-12d3-a456-426614174000 -p from=example -p to=example --jsonata 'absent'
```

<details>
<summary>Sample Response</summary>

```json
{
  "absent": true,
  "absence_intervals": [
    {
      "from": "1970-01-01T00:00:00.000Z",
      "to": "1970-01-01T00:00:00.000Z",
      "original_from": "1970-01-01T00:00:00.000Z",
      "original_to": "1970-01-01T00:00:00.000Z",
      "absent": true,
      "source": "calendar_event",
      "calendar_event_id": "string",
      "absence_adjustment_id": "string",
      "reason": "string"
    }
  ],
  "from": "1970-01-01T00:00:00.000Z",
  "to": "1970-01-01T00:00:00.000Z",
  "user_id": "string",
  "external_calendars": [
    {
      "provider": "outlook",
      "last_synced_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `getWorkingHours`

Get the recurring weekly working hours of a user. 404 means no record exists and the user is treated as always available

`GET /v1/calendar/working-hours/users/{user_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `user_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot calendar getWorkingHours \
  -p user_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot calendar getWorkingHours 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar getWorkingHours -p user_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'monday'
```

<details>
<summary>Sample Response</summary>

```json
{
  "monday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "tuesday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "wednesday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "thursday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "friday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "saturday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "sunday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "timezone": "string",
  "user_id": "string",
  "updated_by": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `putWorkingHours`

Create or fully replace the working hours of a user in the caller organization. This is a full replace, not a merge.

`PUT /v1/calendar/working-hours/users/{user_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `user_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot calendar putWorkingHours \
  -p user_id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot calendar putWorkingHours \
  -p user_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "monday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "tuesday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "wednesday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "thursday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "friday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "saturday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "sunday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "timezone": "Europe/Berlin"
}'
```

Using positional args for path parameters:

```bash
epilot calendar putWorkingHours 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot calendar putWorkingHours -p user_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar putWorkingHours -p user_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'monday'
```

<details>
<summary>Sample Response</summary>

```json
{
  "monday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "tuesday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "wednesday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "thursday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "friday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "saturday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "sunday": [
    {
      "start": "string",
      "end": "string"
    }
  ],
  "timezone": "string",
  "user_id": "string",
  "updated_by": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteWorkingHours`

Delete the working hours of a user. The user is then treated as always available again.

`DELETE /v1/calendar/working-hours/users/{user_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `user_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot calendar deleteWorkingHours \
  -p user_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot calendar deleteWorkingHours 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar deleteWorkingHours -p user_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `listCalendars`

List calendars visible to the caller.

`GET /v1/calendar`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `size` | query | number | No |  |
| `cursor` | query | string | No | Opaque cursor from a previous response |

**Sample Call**

```bash
epilot calendar listCalendars
```

With JSONata filter:

```bash
epilot calendar listCalendars --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "_id": "string",
      "_schema": "calendar",
      "_org": "string",
      "_title": "string",
      "name": "string",
      "description": "string",
      "color": "string",
      "is_default": true,
      "is_epilot_default": true,
      "read_only": true,
      "owner_email": "user@example.com",
      "source": {
        "type": "native",
        "provider": "outlook",
        "provider_calendar_id": "string",
        "last_synced_at": "1970-01-01T00:00:00.000Z"
      },
      "_created_at": "1970-01-01T00:00:00.000Z",
      "_updated_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `createCalendar`

Create a native epilot calendar.

`POST /v1/calendar`

**Request Body** (required)

**Sample Call**

```bash
epilot calendar createCalendar \
  -d '{"name":"string","description":"string","color":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot calendar createCalendar
```

With JSONata filter:

```bash
epilot calendar createCalendar --jsonata '_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "string",
  "_schema": "calendar",
  "_org": "string",
  "_title": "string",
  "name": "string",
  "description": "string",
  "color": "string",
  "is_default": true,
  "is_epilot_default": true,
  "read_only": true,
  "owner_email": "user@example.com",
  "source": {
    "type": "native",
    "provider": "outlook",
    "provider_calendar_id": "string",
    "last_synced_at": "1970-01-01T00:00:00.000Z"
  },
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `addOutlookCalendar`

Registers one of the caller's Outlook calendars as an epilot calendar.

`POST /v1/calendar/sources/outlook`

**Request Body** (required)

**Sample Call**

```bash
epilot calendar addOutlookCalendar \
  -d '{"provider_calendar_id":"string","name":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot calendar addOutlookCalendar
```

With JSONata filter:

```bash
epilot calendar addOutlookCalendar --jsonata '_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "string",
  "_schema": "calendar",
  "_org": "string",
  "_title": "string",
  "name": "string",
  "description": "string",
  "color": "string",
  "is_default": true,
  "is_epilot_default": true,
  "read_only": true,
  "owner_email": "user@example.com",
  "source": {
    "type": "native",
    "provider": "outlook",
    "provider_calendar_id": "string",
    "last_synced_at": "1970-01-01T00:00:00.000Z"
  },
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `listOutlookCalendars`

Lists the calling user's Outlook calendars available to import as epilot calendars.

`GET /v1/calendar/sources/outlook/available`

**Sample Call**

```bash
epilot calendar listOutlookCalendars
```

With JSONata filter:

```bash
epilot calendar listOutlookCalendars --jsonata 'calendars'
```

<details>
<summary>Sample Response</summary>

```json
{
  "calendars": [
    {
      "provider_calendar_id": "string",
      "name": "string",
      "color": "string",
      "is_default": true,
      "can_edit": true,
      "owner": "string"
    }
  ]
}
```

</details>

---

### `deleteOutlookCalendar`

Disconnects a previously registered Outlook calendar.

`DELETE /v1/calendar/sources/outlook/{calendar_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `calendar_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot calendar deleteOutlookCalendar \
  -p calendar_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot calendar deleteOutlookCalendar 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar deleteOutlookCalendar -p calendar_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `outlookWebhook`

Public Microsoft Graph webhook receiver for per-user Outlook calendar

`POST /v1/calendar/outlook/webhook`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `validationToken` | query | string | No | Set by Graph on the subscription-validation handshake; echoed back verbatim. |

**Sample Call**

```bash
epilot calendar outlookWebhook
```

With JSONata filter:

```bash
epilot calendar outlookWebhook --jsonata '$'
```

---

### `getCalendar`

Get a single calendar by its epilot ID.

`GET /v1/calendar/{calendar_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `calendar_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot calendar getCalendar \
  -p calendar_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot calendar getCalendar 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar getCalendar -p calendar_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "string",
  "_schema": "calendar",
  "_org": "string",
  "_title": "string",
  "name": "string",
  "description": "string",
  "color": "string",
  "is_default": true,
  "is_epilot_default": true,
  "read_only": true,
  "owner_email": "user@example.com",
  "source": {
    "type": "native",
    "provider": "outlook",
    "provider_calendar_id": "string",
    "last_synced_at": "1970-01-01T00:00:00.000Z"
  },
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateCalendar`

Update local calendar details. Changes to synced calendars do not modify the provider calendar.

`PATCH /v1/calendar/{calendar_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `calendar_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot calendar updateCalendar \
  -p calendar_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"name":"string","description":"string","color":"string"}'
```

Using positional args for path parameters:

```bash
epilot calendar updateCalendar 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot calendar updateCalendar -p calendar_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar updateCalendar -p calendar_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "string",
  "_schema": "calendar",
  "_org": "string",
  "_title": "string",
  "name": "string",
  "description": "string",
  "color": "string",
  "is_default": true,
  "is_epilot_default": true,
  "read_only": true,
  "owner_email": "user@example.com",
  "source": {
    "type": "native",
    "provider": "outlook",
    "provider_calendar_id": "string",
    "last_synced_at": "1970-01-01T00:00:00.000Z"
  },
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteCalendar`

Delete a native epilot calendar or disconnect a synced calendar, including its locally stored events.

`DELETE /v1/calendar/{calendar_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `calendar_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot calendar deleteCalendar \
  -p calendar_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot calendar deleteCalendar 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar deleteCalendar -p calendar_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `listEvents`

List events in a time window. Recurring events are returned as expanded occurrences – each instance appears as its own e

`GET /v1/calendar/events`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `from` | query | string (date-time) | Yes | Start of the time window (inclusive) |
| `to` | query | string (date-time) | Yes | End of the time window (exclusive) |
| `calendar_id` | query | string | No | Filter to a single calendar. Omit to query across all accessible calendars. |
| `size` | query | number | No |  |
| `cursor` | query | string | No |  |

**Sample Call**

```bash
epilot calendar listEvents \
  -p from=example \
  -p to=example
```

With JSONata filter:

```bash
epilot calendar listEvents -p from=example -p to=example --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "_id": "string",
      "_schema": "calendar_event",
      "_org": "string",
      "_title": "string",
      "_tags": ["string"],
      "calendar_id": "string",
      "event_type": "singleInstance",
      "description": "string",
      "start_time": "1970-01-01T00:00:00.000Z",
      "end_time": "1970-01-01T00:00:00.000Z",
      "timezone": "string",
      "is_all_day": true,
      "location": "string",
      "status": "free",
      "busy": true,
      "is_cancelled": true,
      "is_draft": true,
      "sensitivity": "normal",
      "importance": "low",
      "is_online_meeting": true,
      "online_meeting_url": "https://example.com/path",
      "web_link": "https://example.com/path",
      "response_status": "none",
      "organizer_email": "user@example.com",
      "attendees": [
        {
          "email": "user@example.com",
          "name": "string",
          "response": "none",
          "type": "required"
        }
      ],
      "metadata": {},
      "is_recurring": true,
      "series_master_id": "string",
      "source": {
        "type": "native",
        "provider": "outlook",
        "provider_event_id": "string",
        "provider_event_url": "https://example.com/path",
        "last_synced_at": "1970-01-01T00:00:00.000Z",
        "etag": "string"
      },
      "_created_at": "1970-01-01T00:00:00.000Z",
      "_updated_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `createEvent`

Create a native epilot calendar event. Omit `calendar_id` to use the caller’s epilot default calendar.

`POST /v1/calendar/events`

**Request Body** (required)

**Sample Call**

```bash
epilot calendar createEvent
```

With request body:

```bash
epilot calendar createEvent \
  -d '{
  "calendar_id": "string",
  "description": "string",
  "start_time": "1970-01-01T00:00:00.000Z",
  "end_time": "1970-01-01T00:00:00.000Z",
  "timezone": "string",
  "is_all_day": true,
  "location": "string",
  "status": "free",
  "sensitivity": "normal",
  "metadata": {},
  "_title": "string"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot calendar createEvent
```

With JSONata filter:

```bash
epilot calendar createEvent --jsonata '_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "string",
  "_schema": "calendar_event",
  "_org": "string",
  "_title": "string",
  "_tags": ["string"],
  "calendar_id": "string",
  "event_type": "singleInstance",
  "description": "string",
  "start_time": "1970-01-01T00:00:00.000Z",
  "end_time": "1970-01-01T00:00:00.000Z",
  "timezone": "string",
  "is_all_day": true,
  "location": "string",
  "status": "free",
  "busy": true,
  "is_cancelled": true,
  "is_draft": true,
  "sensitivity": "normal",
  "importance": "low",
  "is_online_meeting": true,
  "online_meeting_url": "https://example.com/path",
  "web_link": "https://example.com/path",
  "response_status": "none",
  "organizer_email": "user@example.com",
  "attendees": [
    {
      "email": "user@example.com",
      "name": "string",
      "response": "none",
      "type": "required"
    }
  ],
  "metadata": {},
  "is_recurring": true,
  "series_master_id": "string",
  "source": {
    "type": "native",
    "provider": "outlook",
    "provider_event_id": "string",
    "provider_event_url": "https://example.com/path",
    "last_synced_at": "1970-01-01T00:00:00.000Z",
    "etag": "string"
  },
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `getEvent`

Get a single event by its epilot ID.

`GET /v1/calendar/events/{event_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `event_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot calendar getEvent \
  -p event_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot calendar getEvent 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar getEvent -p event_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "string",
  "_schema": "calendar_event",
  "_org": "string",
  "_title": "string",
  "_tags": ["string"],
  "calendar_id": "string",
  "event_type": "singleInstance",
  "description": "string",
  "start_time": "1970-01-01T00:00:00.000Z",
  "end_time": "1970-01-01T00:00:00.000Z",
  "timezone": "string",
  "is_all_day": true,
  "location": "string",
  "status": "free",
  "busy": true,
  "is_cancelled": true,
  "is_draft": true,
  "sensitivity": "normal",
  "importance": "low",
  "is_online_meeting": true,
  "online_meeting_url": "https://example.com/path",
  "web_link": "https://example.com/path",
  "response_status": "none",
  "organizer_email": "user@example.com",
  "attendees": [
    {
      "email": "user@example.com",
      "name": "string",
      "response": "none",
      "type": "required"
    }
  ],
  "metadata": {},
  "is_recurring": true,
  "series_master_id": "string",
  "source": {
    "type": "native",
    "provider": "outlook",
    "provider_event_id": "string",
    "provider_event_url": "https://example.com/path",
    "last_synced_at": "1970-01-01T00:00:00.000Z",
    "etag": "string"
  },
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateEvent`

Update a native epilot calendar event.

`PATCH /v1/calendar/events/{event_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `event_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot calendar updateEvent \
  -p event_id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot calendar updateEvent \
  -p event_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "description": "string",
  "start_time": "1970-01-01T00:00:00.000Z",
  "end_time": "1970-01-01T00:00:00.000Z",
  "timezone": "string",
  "is_all_day": true,
  "location": "string",
  "status": "free",
  "is_cancelled": true,
  "sensitivity": "normal",
  "_title": "string"
}'
```

Using positional args for path parameters:

```bash
epilot calendar updateEvent 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot calendar updateEvent -p event_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar updateEvent -p event_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "string",
  "_schema": "calendar_event",
  "_org": "string",
  "_title": "string",
  "_tags": ["string"],
  "calendar_id": "string",
  "event_type": "singleInstance",
  "description": "string",
  "start_time": "1970-01-01T00:00:00.000Z",
  "end_time": "1970-01-01T00:00:00.000Z",
  "timezone": "string",
  "is_all_day": true,
  "location": "string",
  "status": "free",
  "busy": true,
  "is_cancelled": true,
  "is_draft": true,
  "sensitivity": "normal",
  "importance": "low",
  "is_online_meeting": true,
  "online_meeting_url": "https://example.com/path",
  "web_link": "https://example.com/path",
  "response_status": "none",
  "organizer_email": "user@example.com",
  "attendees": [
    {
      "email": "user@example.com",
      "name": "string",
      "response": "none",
      "type": "required"
    }
  ],
  "metadata": {},
  "is_recurring": true,
  "series_master_id": "string",
  "source": {
    "type": "native",
    "provider": "outlook",
    "provider_event_id": "string",
    "provider_event_url": "https://example.com/path",
    "last_synced_at": "1970-01-01T00:00:00.000Z",
    "etag": "string"
  },
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteEvent`

Delete a native epilot calendar event.

`DELETE /v1/calendar/events/{event_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `event_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot calendar deleteEvent \
  -p event_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot calendar deleteEvent 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar deleteEvent -p event_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `shareEvent`

Share a calendar event with another user of the same organization, view-only. Owner-only: recipients of a share cannot r

`POST /v1/calendar/events/{event_id}/share`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `event_id` | path | string | Yes |  |

**Request Body** (required)

**Sample Call**

```bash
epilot calendar shareEvent \
  -p event_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"user_id":"string"}'
```

Using positional args for path parameters:

```bash
epilot calendar shareEvent 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot calendar shareEvent -p event_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar shareEvent -p event_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `unshareEvent`

Revoke a per-event share. The recipient loses access immediately. Owner-only.

`DELETE /v1/calendar/events/{event_id}/share/{user_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `event_id` | path | string | Yes |  |
| `user_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot calendar unshareEvent \
  -p event_id=123e4567-e89b-12d3-a456-426614174000 \
  -p user_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot calendar unshareEvent 123e4567-e89b-12d3-a456-426614174000 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot calendar unshareEvent -p event_id=123e4567-e89b-12d3-a456-426614174000 -p user_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---
