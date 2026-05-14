# Calendar API

- **Base URL:** `https://calendar.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/calendar](https://docs.epilot.io/api/calendar)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.calendar.listCalendars(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/calendar'

const calendarClient = getClient()
authorize(calendarClient, () => '<token>')
const { data } = await calendarClient.listCalendars(...)
```

## Operations

**Calendars**
- [`listCalendars`](#listcalendars)
- [`getCalendar`](#getcalendar)

**Events**
- [`listEvents`](#listevents)
- [`getEvent`](#getevent)

**Schemas**
- [`Calendar`](#calendar)
- [`CalendarSource`](#calendarsource)
- [`Provider`](#provider)
- [`Error`](#error)
- [`CalendarEvent`](#calendarevent)
- [`EventType`](#eventtype)
- [`EventStatus`](#eventstatus)
- [`Sensitivity`](#sensitivity)
- [`Importance`](#importance)
- [`ResponseStatus`](#responsestatus)
- [`Attendee`](#attendee)
- [`EventSource`](#eventsource)

### `listCalendars`

List calendars visible to the caller.

`GET /v1/calendar`

```ts
const { data } = await client.listCalendars({
  size: 1,
  cursor: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getCalendar({
  calendar_id: 'example',
})
```

<details>
<summary>Response</summary>

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

List events in a time window. Recurring events are returned as expanded occurrences – each instance appears as its own event.

`GET /v1/calendar/events`

```ts
const { data } = await client.listEvents({
  from: 'example',
  to: 'example',
  calendar_id: 'example',
  size: 1,
  cursor: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getEvent({
  event_id: 'example',
})
```

<details>
<summary>Response</summary>

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

## Schemas

### `Calendar`

```ts
type Calendar = {
  _id: string
  _schema: "calendar"
  _org: string
  _title?: string
  name: string
  description?: string
  color?: string
  is_default: boolean
  read_only: boolean
  owner_email?: string // email
  source: {
    type: "native" | "synced"
    provider?: "outlook" | "google" | null
    provider_calendar_id?: string
    last_synced_at?: string // date-time
  }
  _created_at?: string // date-time
  _updated_at?: string // date-time
}
```

### `CalendarSource`

```ts
type CalendarSource = {
  type: "native" | "synced"
  provider?: "outlook" | "google" | null
  provider_calendar_id?: string
  last_synced_at?: string // date-time
}
```

### `Provider`

Null for native epilot calendars

```ts
type Provider = "outlook" | "google" | null
```

### `Error`

```ts
type Error = {
  message: string
  code?: string
}
```

### `CalendarEvent`

```ts
type CalendarEvent = {
  _id: string
  _schema: "calendar_event"
  _org: string
  _title?: string
  _tags?: string[]
  calendar_id: string
  event_type: "singleInstance" | "occurrence" | "exception" | "seriesMaster"
  description?: string
  start_time: string // date-time
  end_time: string // date-time
  timezone: string
  is_all_day: boolean
  location?: string
  status: "free" | "tentative" | "busy" | "oof" | "workingElsewhere" | "unknown"
  busy: boolean
  is_cancelled: boolean
  sensitivity: "normal" | "personal" | "private" | "confidential"
  importance: "low" | "normal" | "high"
  is_online_meeting: boolean
  online_meeting_url?: string // uri
  web_link?: string // uri
  response_status: "none" | "organizer" | "tentativelyAccepted" | "accepted" | "declined" | "notResponded"
  organizer_email?: string // email
  attendees?: Array<{
    email: string // email
    name?: string
    response: "none" | "organizer" | "tentativelyAccepted" | "accepted" | "declined" | "notResponded"
    type: "required" | "optional" | "resource"
  }>
  is_recurring: boolean
  series_master_id?: string
  source: {
    type: "native" | "synced"
    provider?: "outlook" | "google" | null
    provider_event_id?: string
    provider_event_url?: string // uri
    last_synced_at?: string // date-time
    etag?: string
  }
  _created_at?: string // date-time
  _updated_at?: string // date-time
}
```

### `EventType`

```ts
type EventType = "singleInstance" | "occurrence" | "exception" | "seriesMaster"
```

### `EventStatus`

Free/busy state derived from provider `showAs`

```ts
type EventStatus = "free" | "tentative" | "busy" | "oof" | "workingElsewhere" | "unknown"
```

### `Sensitivity`

```ts
type Sensitivity = "normal" | "personal" | "private" | "confidential"
```

### `Importance`

```ts
type Importance = "low" | "normal" | "high"
```

### `ResponseStatus`

Caller's response to the invite

```ts
type ResponseStatus = "none" | "organizer" | "tentativelyAccepted" | "accepted" | "declined" | "notResponded"
```

### `Attendee`

```ts
type Attendee = {
  email: string // email
  name?: string
  response: "none" | "organizer" | "tentativelyAccepted" | "accepted" | "declined" | "notResponded"
  type: "required" | "optional" | "resource"
}
```

### `EventSource`

```ts
type EventSource = {
  type: "native" | "synced"
  provider?: "outlook" | "google" | null
  provider_event_id?: string
  provider_event_url?: string // uri
  last_synced_at?: string // date-time
  etag?: string
}
```
