# Calendar API

- **Base URL:** `https://calendar.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/calendar](https://docs.epilot.io/api/calendar)

epilot's calendar API.

## Quick Start

```bash
# List available operations
epilot calendar

# Call an operation
epilot calendar listCalendars
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

**Calendars**
- [`listCalendars`](#listcalendars) — List calendars visible to the caller.
- [`getCalendar`](#getcalendar) — Get a single calendar by its epilot ID.

**Events**
- [`listEvents`](#listevents) — List events in a time window. Recurring events are returned as expanded occurrences – each instance appears as its own e
- [`getEvent`](#getevent) — Get a single event by its epilot ID.

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
