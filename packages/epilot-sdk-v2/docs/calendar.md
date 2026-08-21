# Calendar API

- **Base URL:** `https://calendar.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/calendar](https://docs.epilot.io/api/calendar)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.calendar.listUsersAbsence(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/calendar'

const calendarClient = getClient()
authorize(calendarClient, () => '<token>')
const { data } = await calendarClient.listUsersAbsence(...)
```

## Operations

**Absence**
- [`listUsersAbsence`](#listusersabsence)
- [`searchAbsence`](#searchabsence)
- [`searchNowAbsence`](#searchnowabsence)
- [`listAbsenceAdjustments`](#listabsenceadjustments)
- [`createAbsenceAdjustment`](#createabsenceadjustment)
- [`getAbsenceAdjustment`](#getabsenceadjustment)
- [`patchAbsenceAdjustment`](#patchabsenceadjustment)
- [`deleteAbsenceAdjustment`](#deleteabsenceadjustment)
- [`getUserAbsence`](#getuserabsence)

**Working Hours**
- [`getWorkingHours`](#getworkinghours)
- [`putWorkingHours`](#putworkinghours)
- [`deleteWorkingHours`](#deleteworkinghours)

**Calendars**
- [`listCalendars`](#listcalendars)
- [`createCalendar`](#createcalendar)
- [`addOutlookCalendar`](#addoutlookcalendar)
- [`listOutlookCalendars`](#listoutlookcalendars)
- [`deleteOutlookCalendar`](#deleteoutlookcalendar)
- [`outlookWebhook`](#outlookwebhook)
- [`getCalendar`](#getcalendar)
- [`updateCalendar`](#updatecalendar)
- [`deleteCalendar`](#deletecalendar)

**Calendar Events**
- [`listEvents`](#listevents)
- [`createEvent`](#createevent)
- [`getEvent`](#getevent)
- [`updateEvent`](#updateevent)
- [`deleteEvent`](#deleteevent)
- [`shareEvent`](#shareevent)
- [`unshareEvent`](#unshareevent)

**Schemas**
- [`AbsenceInterval`](#absenceinterval)
- [`AbsenceIntervalSource`](#absenceintervalsource)
- [`Error`](#error)
- [`SearchAbsenceBody`](#searchabsencebody)
- [`SearchNowAbsenceBody`](#searchnowabsencebody)
- [`AbsenceAdjustment`](#absenceadjustment)
- [`AbsenceStatus`](#absencestatus)
- [`AbsenceType`](#absencetype)
- [`CreateAbsenceAdjustmentBody`](#createabsenceadjustmentbody)
- [`PatchAbsenceAdjustmentBody`](#patchabsenceadjustmentbody)
- [`ExternalCalendar`](#externalcalendar)
- [`WorkingHours`](#workinghours)
- [`UpsertWorkingHoursBody`](#upsertworkinghoursbody)
- [`TimeWindow`](#timewindow)
- [`Calendar`](#calendar)
- [`CalendarSource`](#calendarsource)
- [`Provider`](#provider)
- [`CalendarCreateBody`](#calendarcreatebody)
- [`AddOutlookCalendarRequest`](#addoutlookcalendarrequest)
- [`AvailableOutlookCalendar`](#availableoutlookcalendar)
- [`CalendarPatchBody`](#calendarpatchbody)
- [`CalendarEvent`](#calendarevent)
- [`EventType`](#eventtype)
- [`EventStatus`](#eventstatus)
- [`Sensitivity`](#sensitivity)
- [`Importance`](#importance)
- [`ResponseStatus`](#responsestatus)
- [`Attendee`](#attendee)
- [`EventSource`](#eventsource)
- [`CalendarEventCreateBody`](#calendareventcreatebody)
- [`CalendarEventPatchBody`](#calendareventpatchbody)
- [`ShareEventBody`](#shareeventbody)

### `listUsersAbsence`

List organization users with known absence metadata in the requested time window.

`GET /v1/calendar/absence/users`

```ts
const { data } = await client.listUsersAbsence({
  from: 'example',
  to: 'example',
  include_busy: true,
  working_hours_granularity: 'example',
  query: 'example',
  limit: 1,
  offset: 1,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.searchAbsence(
  null,
  {
    from: '1970-01-01T00:00:00.000Z',
    to: '1970-01-01T00:00:00.000Z',
    user_ids: ['string'],
    include_busy: false,
    working_hours_granularity: 'time'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.searchNowAbsence(
  null,
  {
    user_ids: ['string'],
    include_busy: false,
    working_hours_granularity: 'time'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.listAbsenceAdjustments({
  user_id: 'example',
  from: 'example',
  to: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createAbsenceAdjustment(
  {
    user_id: 'example',
  },
  {
    from: '1970-01-01T00:00:00.000Z',
    to: '1970-01-01T00:00:00.000Z',
    absent: true,
    status: 'oof',
    type: 'string',
    reason: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getAbsenceAdjustment({
  user_id: 'example',
  adjustment_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.patchAbsenceAdjustment(
  {
    user_id: 'example',
    adjustment_id: 'example',
  },
  {
    from: '1970-01-01T00:00:00.000Z',
    to: '1970-01-01T00:00:00.000Z',
    absent: true,
    status: 'oof',
    type: 'string',
    reason: 'string'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteAbsenceAdjustment({
  user_id: 'example',
  adjustment_id: 'example',
})
```

---

### `getUserAbsence`

Get known absence for a user in a time window. absent=false means no known absence, not guaranteed availability.

`GET /v1/calendar/absence/users/{user_id}`

```ts
const { data } = await client.getUserAbsence({
  user_id: 'example',
  from: 'example',
  to: 'example',
  include_busy: true,
  working_hours_granularity: 'example',
})
```

<details>
<summary>Response</summary>

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

Get the recurring weekly working hours of a user. 404 means no record exists and the user is treated as always available.

`GET /v1/calendar/working-hours/users/{user_id}`

```ts
const { data } = await client.getWorkingHours({
  user_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.putWorkingHours(
  {
    user_id: 'example',
  },
  {
    monday: [
      {
        start: 'string',
        end: 'string'
      }
    ],
    tuesday: [
      {
        start: 'string',
        end: 'string'
      }
    ],
    wednesday: [
      {
        start: 'string',
        end: 'string'
      }
    ],
    thursday: [
      {
        start: 'string',
        end: 'string'
      }
    ],
    friday: [
      {
        start: 'string',
        end: 'string'
      }
    ],
    saturday: [
      {
        start: 'string',
        end: 'string'
      }
    ],
    sunday: [
      {
        start: 'string',
        end: 'string'
      }
    ],
    timezone: 'Europe/Berlin'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteWorkingHours({
  user_id: 'example',
})
```

---

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

```ts
const { data } = await client.createCalendar(
  null,
  {
    name: 'string',
    description: 'string',
    color: 'string'
  },
)
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

```ts
const { data } = await client.addOutlookCalendar(
  null,
  {
    provider_calendar_id: 'string',
    name: 'string'
  },
)
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

```ts
const { data } = await client.listOutlookCalendars()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteOutlookCalendar({
  calendar_id: 'example',
})
```

---

### `outlookWebhook`

Public Microsoft Graph webhook receiver for per-user Outlook calendar
subscriptions. Unauthenticated by design (API Gateway `Authorizer: NONE`):
Graph calls it with no epilot token.

`POST /v1/calendar/outlook/webhook`

```ts
const { data } = await client.outlookWebhook({
  validationToken: 'example',
})
```

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

```ts
const { data } = await client.updateCalendar(
  {
    calendar_id: 'example',
  },
  {
    name: 'string',
    description: 'string',
    color: 'string'
  },
)
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

```ts
const { data } = await client.deleteCalendar({
  calendar_id: 'example',
})
```

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

```ts
const { data } = await client.createEvent(
  null,
  {
    calendar_id: 'string',
    description: 'string',
    start_time: '1970-01-01T00:00:00.000Z',
    end_time: '1970-01-01T00:00:00.000Z',
    timezone: 'string',
    is_all_day: true,
    location: 'string',
    status: 'free',
    sensitivity: 'normal',
    metadata: {},
    _title: 'string'
  },
)
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

```ts
const { data } = await client.updateEvent(
  {
    event_id: 'example',
  },
  {
    description: 'string',
    start_time: '1970-01-01T00:00:00.000Z',
    end_time: '1970-01-01T00:00:00.000Z',
    timezone: 'string',
    is_all_day: true,
    location: 'string',
    status: 'free',
    is_cancelled: true,
    sensitivity: 'normal',
    _title: 'string'
  },
)
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

```ts
const { data } = await client.deleteEvent({
  event_id: 'example',
})
```

---

### `shareEvent`

Share a calendar event with another user of the same organization, view-only. Owner-only: recipients of a share cannot re-share. Sharing an already-shared event is a no-op.

`POST /v1/calendar/events/{event_id}/share`

```ts
const { data } = await client.shareEvent(
  {
    event_id: 'example',
  },
  {
    user_id: 'string'
  },
)
```

---

### `unshareEvent`

Revoke a per-event share. The recipient loses access immediately. Owner-only.

`DELETE /v1/calendar/events/{event_id}/share/{user_id}`

```ts
const { data } = await client.unshareEvent({
  event_id: 'example',
  user_id: 'example',
})
```

---

## Schemas

### `AbsenceInterval`

```ts
type AbsenceInterval = {
  from: string // date-time
  to: string // date-time
  original_from: string // date-time
  original_to: string // date-time
  absent: boolean
  source: "calendar_event" | "absence_adjustment" | "working_hours"
  calendar_event_id?: string
  absence_adjustment_id?: string
  reason?: string
}
```

### `AbsenceIntervalSource`

```ts
type AbsenceIntervalSource = "calendar_event" | "absence_adjustment" | "working_hours"
```

### `Error`

```ts
type Error = {
  status: number
  error: string | unknown[]
}
```

### `SearchAbsenceBody`

```ts
type SearchAbsenceBody = {
  from: string // date-time
  to: string // date-time
  user_ids: string[]
  include_busy?: boolean
  working_hours_granularity?: "time" | "day"
}
```

### `SearchNowAbsenceBody`

```ts
type SearchNowAbsenceBody = {
  user_ids: string[]
  include_busy?: boolean
  working_hours_granularity?: "time" | "day"
}
```

### `AbsenceAdjustment`

```ts
type AbsenceAdjustment = {
  from: string // date-time
  to: string // date-time
  absent: boolean
  status: "oof" | "busy"
  type?: string
  reason?: string
  adjustment_id: string
  user_id: string
  created_by: string
  created_at: string // date-time
  updated_at: string // date-time
}
```

### `AbsenceStatus`

Calendar status targeted by the absence adjustment.

```ts
type AbsenceStatus = "oof" | "busy"
```

### `AbsenceType`

Optional producer-defined reference stored with an absence adjustment.

```ts
type AbsenceType = string
```

### `CreateAbsenceAdjustmentBody`

```ts
type CreateAbsenceAdjustmentBody = {
  from: string // date-time
  to: string // date-time
  absent: boolean
  status: "oof" | "busy"
  type?: string
  reason?: string
}
```

### `PatchAbsenceAdjustmentBody`

```ts
type PatchAbsenceAdjustmentBody = {
  from?: string // date-time
  to?: string // date-time
  absent?: boolean
  status?: "oof" | "busy"
  type?: string
  reason?: string
}
```

### `ExternalCalendar`

```ts
type ExternalCalendar = {
  provider: "outlook" | "google"
  last_synced_at: string // date-time
}
```

### `WorkingHours`

Recurring weekly working hours of a user. The absence of a record means the user is treated as always available.

```ts
type WorkingHours = {
  monday: Array<{
    start: string
    end: string
  }>
  tuesday: Array<{
    start: string
    end: string
  }>
  wednesday: Array<{
    start: string
    end: string
  }>
  thursday: Array<{
    start: string
    end: string
  }>
  friday: Array<{
    start: string
    end: string
  }>
  saturday: Array<{
    start: string
    end: string
  }>
  sunday: Array<{
    start: string
    end: string
  }>
  timezone: string
  user_id: string
  updated_by: string
  created_at: string // date-time
  updated_at: string // date-time
}
```

### `UpsertWorkingHoursBody`

Full replacement of the working-hours record. All weekdays are required; an empty array means a day off. Users without a working-hours record are treated as always available.

```ts
type UpsertWorkingHoursBody = {
  monday: Array<{
    start: string
    end: string
  }>
  tuesday: Array<{
    start: string
    end: string
  }>
  wednesday: Array<{
    start: string
    end: string
  }>
  thursday: Array<{
    start: string
    end: string
  }>
  friday: Array<{
    start: string
    end: string
  }>
  saturday: Array<{
    start: string
    end: string
  }>
  sunday: Array<{
    start: string
    end: string
  }>
  timezone?: string
}
```

### `TimeWindow`

A wall-clock working window within a single day.

```ts
type TimeWindow = {
  start: string
  end: string
}
```

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
  is_epilot_default: boolean
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

### `CalendarCreateBody`

```ts
type CalendarCreateBody = {
  name: string
  description?: string
  color?: string
}
```

### `AddOutlookCalendarRequest`

```ts
type AddOutlookCalendarRequest = {
  provider_calendar_id: string
  name?: string
}
```

### `AvailableOutlookCalendar`

```ts
type AvailableOutlookCalendar = {
  provider_calendar_id: string
  name: string
  color?: string
  is_default?: boolean
  can_edit?: boolean
  owner?: string
}
```

### `CalendarPatchBody`

```ts
type CalendarPatchBody = {
  name?: string
  description?: string
  color?: string
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
  is_draft: boolean
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
  metadata?: Record<string, unknown>
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

### `CalendarEventCreateBody`

```ts
type CalendarEventCreateBody = {
  calendar_id?: string
  description?: string
  start_time: string // date-time
  end_time: string // date-time
  timezone: string
  is_all_day: boolean
  location?: string
  status: "free" | "tentative" | "busy" | "oof" | "workingElsewhere" | "unknown"
  sensitivity: "normal" | "personal" | "private" | "confidential"
  metadata?: Record<string, unknown>
  _title: string
}
```

### `CalendarEventPatchBody`

```ts
type CalendarEventPatchBody = {
  description?: string
  start_time?: string // date-time
  end_time?: string // date-time
  timezone?: string
  is_all_day?: boolean
  location?: string
  status?: "free" | "tentative" | "busy" | "oof" | "workingElsewhere" | "unknown"
  is_cancelled?: boolean
  sensitivity?: "normal" | "personal" | "private" | "confidential"
  _title?: string
}
```

### `ShareEventBody`

```ts
type ShareEventBody = {
  user_id: string
}
```
