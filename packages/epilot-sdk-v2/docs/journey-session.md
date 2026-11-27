# Journey Session API

- **Base URL:** `https://journey-session.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/journey-session](https://docs.epilot.io/api/journey-session)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.journeySession.getHealth(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/journey-session'

const journeySessionClient = getClient()
authorize(journeySessionClient, () => '<token>')
const { data } = await journeySessionClient.getHealth(...)
```

## Operations

**Health**
- [`getHealth`](#gethealth)

**Journey Sessions**
- [`startJourneySession`](#startjourneysession)
- [`listJourneySessions`](#listjourneysessions)
- [`openJourneySessionHandoff`](#openjourneysessionhandoff)
- [`getJourneySession`](#getjourneysession)
- [`discardJourneySession`](#discardjourneysession)
- [`sendJourneySessionCommand`](#sendjourneysessioncommand)
- [`handOffJourneySession`](#handoffjourneysession)
- [`listJourneySessionRecords`](#listjourneysessionrecords)
- [`listJourneySessionOptions`](#listjourneysessionoptions)
- [`getJourneySessionDocument`](#getjourneysessiondocument)
- [`identifyJourneySession`](#identifyjourneysession)
- [`keepJourneySessionSnapshot`](#keepjourneysessionsnapshot)
- [`getJourneySessionSnapshot`](#getjourneysessionsnapshot)

**Public Journey Sessions**
- [`startPublicJourneySession`](#startpublicjourneysession)
- [`openPublicJourneySessionHandoff`](#openpublicjourneysessionhandoff)
- [`getPublicJourneySession`](#getpublicjourneysession)
- [`discardPublicJourneySession`](#discardpublicjourneysession)
- [`sendPublicJourneySessionCommand`](#sendpublicjourneysessioncommand)
- [`keepPublicJourneySessionSnapshot`](#keeppublicjourneysessionsnapshot)
- [`getPublicJourneySessionSnapshot`](#getpublicjourneysessionsnapshot)
- [`handOffPublicJourneySession`](#handoffpublicjourneysession)
- [`listPublicJourneySessionRecords`](#listpublicjourneysessionrecords)
- [`listPublicJourneySessionOptions`](#listpublicjourneysessionoptions)
- [`getPublicJourneySessionDocument`](#getpublicjourneysessiondocument)

**Schemas**
- [`Health`](#health)
- [`Error`](#error)
- [`ContextError`](#contexterror)
- [`StartJourneySession`](#startjourneysession)
- [`Command`](#command)
- [`JourneySession`](#journeysession)
- [`Handoff`](#handoff)
- [`HandoffLink`](#handofflink)
- [`HandoffToOpen`](#handofftoopen)
- [`OpenedHandoff`](#openedhandoff)
- [`Submission`](#submission)
- [`Issue`](#issue)
- [`Block`](#block)
- [`SummarySection`](#summarysection)
- [`SummaryRow`](#summaryrow)
- [`Instance`](#instance)
- [`Offer`](#offer)
- [`Charge`](#charge)
- [`Consent`](#consent)
- [`CalculatorDevice`](#calculatordevice)
- [`EntityAttribute`](#entityattribute)
- [`CardRecord`](#cardrecord)
- [`ChoiceOption`](#choiceoption)
- [`ChoiceOptionsPage`](#choiceoptionspage)
- [`JourneySessionDocument`](#journeysessiondocument)
- [`CardRecordsPage`](#cardrecordspage)
- [`Meter`](#meter)
- [`MeterCounter`](#metercounter)
- [`View`](#view)
- [`JourneySessionState`](#journeysessionstate)
- [`SnapshotToKeep`](#snapshottokeep)
- [`KeptJourneySession`](#keptjourneysession)
- [`JourneySessionSnapshot`](#journeysessionsnapshot)
- [`JourneySessionList`](#journeysessionlist)
- [`StartedJourneySession`](#startedjourneysession)
- [`JourneyNotSupported`](#journeynotsupported)

### `getHealth`

Tells whether the service is up.

`GET /v1/health`

```ts
const { data } = await client.getHealth()
```

<details>
<summary>Response</summary>

```json
{
  "status": "ok"
}
```

</details>

---

### `startJourneySession`

Starts a Journey Session for the customer who is logged in, on a journey of their organisation, and returns what to show or ask first. The session belongs to that customer. The entities the journey's 

`POST /v1/journey_sessions`

```ts
const { data } = await client.startJourneySession(
  {
    x-epilot-ai-agent-id: 'example',
    x-epilot-conversation-id: 'example',
  },
  {
    journey_id: 'string',
    language: 'de',
    context: {}
  },
)
```

---

### `listJourneySessions`

Lists the Journey Sessions of the customer who is logged in that can still be carried on, the one changed last first.

`GET /v1/journey_sessions`

```ts
const { data } = await client.listJourneySessions({
  journey_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "journey_id": "string",
      "revision_id": "string",
      "status": "open",
      "version": 0,
      "started_at": "1970-01-01T00:00:00.000Z",
      "changed_at": "1970-01-01T00:00:00.000Z",
      "finished_at": "1970-01-01T00:00:00.000Z",
      "expires_at": "1970-01-01T00:00:00.000Z",
      "submissions": [
        {
          "step_id": "string",
          "at": "1970-01-01T00:00:00.000Z"
        }
      ],
      "handoff": {
        "opened": true,
        "expires_at": "1970-01-01T00:00:00.000Z"
      }
    }
  ]
}
```

</details>

---

### `openJourneySessionHandoff`

Opens a Journey Session handed over to the Journey App, by the token of its handoff link. The customer who owns the session opens it signed in; a session of a visitor nobody knows opens by the token a

`POST /v1/journey_sessions/handoff/open`

```ts
const { data } = await client.openJourneySessionHandoff(
  null,
  {
    token: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "session": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "journey_id": "string",
    "revision_id": "string",
    "status": "open",
    "version": 0,
    "started_at": "1970-01-01T00:00:00.000Z",
    "changed_at": "1970-01-01T00:00:00.000Z",
    "finished_at": "1970-01-01T00:00:00.000Z",
    "expires_at": "1970-01-01T00:00:00.000Z",
    "submissions": [
      {
        "step_id": "string",
        "at": "1970-01-01T00:00:00.000Z"
      }
    ],
    "handoff": {
      "opened": true,
      "expires_at": "1970-01-01T00:00:00.000Z"
    }
  },
  "snapshot": {},
  "lease": "string"
}
```

</details>

---

### `getJourneySession`

Returns what a Journey Session of the customer who is logged in shows or asks now.

`GET /v1/journey_sessions/{session_id}`

```ts
const { data } = await client.getJourneySession({
  session_id: 'example',
})
```

---

### `discardJourneySession`

Discards a Journey Session of the customer who is logged in. Its answers are deleted at once. What stays is that there was a session, where it stood and when it was discarded. While the session is han

`DELETE /v1/journey_sessions/{session_id}`

```ts
const { data } = await client.discardJourneySession({
  session_id: 'example',
  x-journey-session-secret: 'example',
})
```

---

### `sendJourneySessionCommand`

Does what the customer who is logged in wants to do in their Journey Session: answer, continue, go back or submit. The response says what to show or ask next and what is wrong with what was entered. A

`POST /v1/journey_sessions/{session_id}/commands`

```ts
const { data } = await client.sendJourneySessionCommand(
  {
    session_id: 'example',
    x-journey-session-secret: 'example',
    x-epilot-ai-agent-id: 'example',
    x-epilot-conversation-id: 'example',
  },
  {
    type: 'answer',
    answers: {}
  },
)
```

---

### `handOffJourneySession`

Hands the rest of a Journey Session of the customer who is logged in over to the Journey App in a browser, for a step with a block that needs a screen (`needs_screen`), such as a signature. Returns a 

`POST /v1/journey_sessions/{session_id}/handoff`

```ts
const { data } = await client.handOffJourneySession({
  session_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "url": "https://example.com/path",
  "expires_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `listJourneySessionRecords`

Lists one page of the records a Cards block of the logged-in customer's Journey Session lets the visitor choose from, searched for a text where the block can be searched. Reading changes nothing in th

`GET /v1/journey_sessions/{session_id}/blocks/{block_id}/records`

```ts
const { data } = await client.listJourneySessionRecords({
  session_id: 'example',
  block_id: 'example',
  page: 1,
  search: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "records": [
    {
      "id": "string",
      "schema": "string",
      "title": "string",
      "values": {},
      "table_rows": [
        {}
      ]
    }
  ],
  "has_more_records": true,
  "issues": [
    {
      "code": "string",
      "block_id": "string",
      "step_id": "string",
      "message": "string",
      "instance": 0,
      "context_parameters": ["string"]
    }
  ]
}
```

</details>

---

### `listJourneySessionOptions`

Lists one page of the options a choice block of the logged-in customer's Journey Session searches in a connector, such as the list of electricity suppliers, searched for a text where one is given. Rea

`GET /v1/journey_sessions/{session_id}/blocks/{block_id}/options`

```ts
const { data } = await client.listJourneySessionOptions({
  session_id: 'example',
  block_id: 'example',
  page: 1,
  search: 'example',
  instance: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "options": [
    {
      "value": "string",
      "label": "string"
    }
  ],
  "has_more_options": true,
  "issues": [
    {
      "code": "string",
      "block_id": "string",
      "step_id": "string",
      "message": "string",
      "instance": 0,
      "context_parameters": ["string"]
    }
  ]
}
```

</details>

---

### `getJourneySessionDocument`

Generates the document a PDF generator of the logged-in customer's Journey Session makes from its template and the answers given, as the Journey App does when the visitor clicks its link, and says whe

`GET /v1/journey_sessions/{session_id}/blocks/{block_id}/document`

```ts
const { data } = await client.getJourneySessionDocument({
  session_id: 'example',
  block_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "preview_url": "string",
  "issues": [
    {
      "code": "string",
      "block_id": "string",
      "step_id": "string",
      "message": "string",
      "instance": 0,
      "context_parameters": ["string"]
    }
  ]
}
```

</details>

---

### `identifyJourneySession`

Hands a Journey Session that was started without a login over to the customer who has logged in since, as a journey with a login step asks for. The caller shows both: the session's secret and the cust

`POST /v1/journey_sessions/{session_id}/identify`

```ts
const { data } = await client.identifyJourneySession({
  session_id: 'example',
  x-journey-session-secret: 'example',
})
```

---

### `keepJourneySessionSnapshot`

Keeps a Journey Session that a surface runs itself with the Journey Engine, such as the Journey App in a browser, for the customer who is logged in. The surface sends the session as its engine saves i

`PUT /v1/journey_sessions/{session_id}/snapshot`

```ts
const { data } = await client.keepJourneySessionSnapshot(
  {
    session_id: 'example',
    x-journey-session-secret: 'example',
  },
  {
    journey_id: 'string',
    snapshot: {},
    base_version: 1
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "session": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "journey_id": "string",
    "revision_id": "string",
    "status": "open",
    "version": 0,
    "started_at": "1970-01-01T00:00:00.000Z",
    "changed_at": "1970-01-01T00:00:00.000Z",
    "finished_at": "1970-01-01T00:00:00.000Z",
    "expires_at": "1970-01-01T00:00:00.000Z",
    "submissions": [
      {
        "step_id": "string",
        "at": "1970-01-01T00:00:00.000Z"
      }
    ],
    "handoff": {
      "opened": true,
      "expires_at": "1970-01-01T00:00:00.000Z"
    }
  }
}
```

</details>

---

### `getJourneySessionSnapshot`

Returns a Journey Session of the customer who is logged in as the Journey Engine saves it, so a surface that runs the engine itself can resume it, on another device as well.

`GET /v1/journey_sessions/{session_id}/snapshot`

```ts
const { data } = await client.getJourneySessionSnapshot({
  session_id: 'example',
  x-journey-session-secret: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "session": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "journey_id": "string",
    "revision_id": "string",
    "status": "open",
    "version": 0,
    "started_at": "1970-01-01T00:00:00.000Z",
    "changed_at": "1970-01-01T00:00:00.000Z",
    "finished_at": "1970-01-01T00:00:00.000Z",
    "expires_at": "1970-01-01T00:00:00.000Z",
    "submissions": [
      {
        "step_id": "string",
        "at": "1970-01-01T00:00:00.000Z"
      }
    ],
    "handoff": {
      "opened": true,
      "expires_at": "1970-01-01T00:00:00.000Z"
    }
  },
  "snapshot": {}
}
```

</details>

---

### `startPublicJourneySession`

Starts a Journey Session for a visitor nobody knows yet, on a public journey, and returns what to show or ask first. The response carries the session's secret once; every later request has to present 

`POST /v1/journey_sessions/public`

```ts
const { data } = await client.startPublicJourneySession(
  null,
  {
    journey_id: 'string',
    language: 'de',
    context: {}
  },
)
```

---

### `openPublicJourneySessionHandoff`

Opens a Journey Session handed over to the Journey App, by the token of its handoff link. A session of a visitor nobody knows opens by the token alone. A customer's session opens only through openJour

`POST /v1/journey_sessions/public/handoff/open`

```ts
const { data } = await client.openPublicJourneySessionHandoff(
  null,
  {
    token: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "session": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "journey_id": "string",
    "revision_id": "string",
    "status": "open",
    "version": 0,
    "started_at": "1970-01-01T00:00:00.000Z",
    "changed_at": "1970-01-01T00:00:00.000Z",
    "finished_at": "1970-01-01T00:00:00.000Z",
    "expires_at": "1970-01-01T00:00:00.000Z",
    "submissions": [
      {
        "step_id": "string",
        "at": "1970-01-01T00:00:00.000Z"
      }
    ],
    "handoff": {
      "opened": true,
      "expires_at": "1970-01-01T00:00:00.000Z"
    }
  },
  "snapshot": {},
  "lease": "string"
}
```

</details>

---

### `getPublicJourneySession`

Returns what a Journey Session shows or asks now, to whoever holds its secret.

`GET /v1/journey_sessions/public/{session_id}`

```ts
const { data } = await client.getPublicJourneySession({
  session_id: 'example',
  x-journey-session-secret: 'example',
})
```

---

### `discardPublicJourneySession`

Discards a Journey Session for whoever holds its secret. Its answers are deleted at once. What stays is that there was a session, where it stood and when it was discarded. While the session is handed 

`DELETE /v1/journey_sessions/public/{session_id}`

```ts
const { data } = await client.discardPublicJourneySession({
  session_id: 'example',
  x-journey-session-secret: 'example',
})
```

---

### `sendPublicJourneySessionCommand`

Does what whoever holds the secret wants to do in a Journey Session: answer, continue, go back or submit. The response says what to show or ask next and what is wrong with what was entered. A command 

`POST /v1/journey_sessions/public/{session_id}/commands`

```ts
const { data } = await client.sendPublicJourneySessionCommand(
  {
    session_id: 'example',
    x-journey-session-secret: 'example',
  },
  {
    type: 'answer',
    answers: {}
  },
)
```

---

### `keepPublicJourneySessionSnapshot`

Keeps a Journey Session that a surface runs itself with the Journey Engine, for a visitor who is not logged in. The surface chooses the session's ID and its secret, and sends the same secret with ever

`PUT /v1/journey_sessions/public/{session_id}/snapshot`

```ts
const { data } = await client.keepPublicJourneySessionSnapshot(
  {
    session_id: 'example',
    x-journey-session-secret: 'example',
  },
  {
    journey_id: 'string',
    snapshot: {},
    base_version: 1
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "session": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "journey_id": "string",
    "revision_id": "string",
    "status": "open",
    "version": 0,
    "started_at": "1970-01-01T00:00:00.000Z",
    "changed_at": "1970-01-01T00:00:00.000Z",
    "finished_at": "1970-01-01T00:00:00.000Z",
    "expires_at": "1970-01-01T00:00:00.000Z",
    "submissions": [
      {
        "step_id": "string",
        "at": "1970-01-01T00:00:00.000Z"
      }
    ],
    "handoff": {
      "opened": true,
      "expires_at": "1970-01-01T00:00:00.000Z"
    }
  }
}
```

</details>

---

### `getPublicJourneySessionSnapshot`

Returns a Journey Session as the Journey Engine saves it, to whoever holds its secret.

`GET /v1/journey_sessions/public/{session_id}/snapshot`

```ts
const { data } = await client.getPublicJourneySessionSnapshot({
  session_id: 'example',
  x-journey-session-secret: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "session": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "journey_id": "string",
    "revision_id": "string",
    "status": "open",
    "version": 0,
    "started_at": "1970-01-01T00:00:00.000Z",
    "changed_at": "1970-01-01T00:00:00.000Z",
    "finished_at": "1970-01-01T00:00:00.000Z",
    "expires_at": "1970-01-01T00:00:00.000Z",
    "submissions": [
      {
        "step_id": "string",
        "at": "1970-01-01T00:00:00.000Z"
      }
    ],
    "handoff": {
      "opened": true,
      "expires_at": "1970-01-01T00:00:00.000Z"
    }
  },
  "snapshot": {}
}
```

</details>

---

### `handOffPublicJourneySession`

Hands the rest of a Journey Session held by its secret over to the Journey App in a browser, for a step with a block that needs a screen (`needs_screen`), such as a signature. Returns a link to open w

`POST /v1/journey_sessions/public/{session_id}/handoff`

```ts
const { data } = await client.handOffPublicJourneySession({
  session_id: 'example',
  x-journey-session-secret: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "url": "https://example.com/path",
  "expires_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `listPublicJourneySessionRecords`

Lists one page of the records a Cards block of a visitor's Journey Session lets the visitor choose from, searched for a text where the block can be searched. Reading changes nothing in the Journey Ses

`GET /v1/journey_sessions/public/{session_id}/blocks/{block_id}/records`

```ts
const { data } = await client.listPublicJourneySessionRecords({
  session_id: 'example',
  block_id: 'example',
  x-journey-session-secret: 'example',
  page: 1,
  search: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "records": [
    {
      "id": "string",
      "schema": "string",
      "title": "string",
      "values": {},
      "table_rows": [
        {}
      ]
    }
  ],
  "has_more_records": true,
  "issues": [
    {
      "code": "string",
      "block_id": "string",
      "step_id": "string",
      "message": "string",
      "instance": 0,
      "context_parameters": ["string"]
    }
  ]
}
```

</details>

---

### `listPublicJourneySessionOptions`

Lists one page of the options a choice block of a visitor's Journey Session searches in a connector, such as the list of electricity suppliers, searched for a text where one is given. Reading changes 

`GET /v1/journey_sessions/public/{session_id}/blocks/{block_id}/options`

```ts
const { data } = await client.listPublicJourneySessionOptions({
  session_id: 'example',
  block_id: 'example',
  x-journey-session-secret: 'example',
  page: 1,
  search: 'example',
  instance: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "options": [
    {
      "value": "string",
      "label": "string"
    }
  ],
  "has_more_options": true,
  "issues": [
    {
      "code": "string",
      "block_id": "string",
      "step_id": "string",
      "message": "string",
      "instance": 0,
      "context_parameters": ["string"]
    }
  ]
}
```

</details>

---

### `getPublicJourneySessionDocument`

Generates the document a PDF generator of a visitor's Journey Session makes from its template and the answers given, as the Journey App does when the visitor clicks its link, and says where it can be 

`GET /v1/journey_sessions/public/{session_id}/blocks/{block_id}/document`

```ts
const { data } = await client.getPublicJourneySessionDocument({
  session_id: 'example',
  block_id: 'example',
  x-journey-session-secret: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "preview_url": "string",
  "issues": [
    {
      "code": "string",
      "block_id": "string",
      "step_id": "string",
      "message": "string",
      "instance": 0,
      "context_parameters": ["string"]
    }
  ]
}
```

</details>

---

## Schemas

### `Health`

```ts
type Health = {
  status: "ok"
}
```

### `Error`

```ts
type Error = {
  error: string
}
```

### `ContextError`

```ts
type ContextError = {
  error: "not_a_context_parameter" | "context_parameter_missing"
  context_parameters: string[]
}
```

### `StartJourneySession`

```ts
type StartJourneySession = {
  journey_id: string
  language?: "de" | "en" | "fr"
  context?: Record<string, string>
}
```

### `Command`

```ts
type Command = {
  type: "answer" | "continue" | "back" | "submit"
  answers?: Record<string, unknown>
}
```

### `JourneySession`

```ts
type JourneySession = {
  id: string // uuid
  journey_id: string
  revision_id?: string
  status: "open" | "finished" | "expired" | "discarded"
  version: number
  started_at: string // date-time
  changed_at: string // date-time
  finished_at?: string // date-time
  expires_at: string // date-time
  submissions: Array<{
    step_id: string
    at: string // date-time
  }>
  handoff?: {
    opened: boolean
    expires_at: string // date-time
  }
}
```

### `Handoff`

A handoff of the Journey Session to a browser, while it lasts: until its link expires where nobody opened it, or until its lease ends where a browser did.

```ts
type Handoff = {
  opened: boolean
  expires_at: string // date-time
}
```

### `HandoffLink`

```ts
type HandoffLink = {
  url: string // uri
  expires_at: string // date-time
}
```

### `HandoffToOpen`

```ts
type HandoffToOpen = {
  token: string
}
```

### `OpenedHandoff`

```ts
type OpenedHandoff = {
  session: {
    id: string // uuid
    journey_id: string
    revision_id?: string
    status: "open" | "finished" | "expired" | "discarded"
    version: number
    started_at: string // date-time
    changed_at: string // date-time
    finished_at?: string // date-time
    expires_at: string // date-time
    submissions: Array<{
      step_id: { ... }
      at: { ... }
    }>
    handoff?: {
      opened: { ... }
      expires_at: { ... }
    }
  }
  snapshot: Record<string, unknown>
  lease: string
}
```

### `Submission`

```ts
type Submission = {
  step_id: string
  at: string // date-time
}
```

### `Issue`

```ts
type Issue = {
  code: string
  block_id?: string
  step_id?: string
  message?: string
  instance?: number
  context_parameters?: string[]
}
```

### `Block`

```ts
type Block = {
  id: string
  name: string
  type: string
  required: boolean
  settings?: Record<string, unknown>
  value?: unknown
  warnings?: string[]
  offers?: Array<{
    product_id: string
    price_id: string
    name: string
    description?: string
    currency: string
    price_display: "price" | "starting_price" | "on_request" | "estimated"
    charges: Array<{
      charged: { ... }
      total: { ... }
      before_tax: { ... }
      tax: { ... }
    }>
    catalog_reference?: Record<string, unknown>
  }>
  current_offer?: {
    product_id: string
    price_id: string
    name: string
    description?: string
    currency: string
    price_display: "price" | "starting_price" | "on_request" | "estimated"
    charges: Array<{
      charged: { ... }
      total: { ... }
      before_tax: { ... }
      tax: { ... }
    }>
    catalog_reference?: Record<string, unknown>
  }
  promo_codes?: string[]
  asks_for_street?: {
    zip_code: string
    city: string
  }
  consents?: Array<{
    topics: string[]
    text: string
    required: boolean
    is_agreed: boolean
  }>
  records?: Array<{
    id: string
    schema: string
    title?: string
    values: Record<string, unknown>
    table_rows?: Record<string, unknown>[]
  }>
  has_more_records?: boolean
  selected_records?: Array<{
    id: string
    schema: string
    title?: string
    values: Record<string, unknown>
    table_rows?: Record<string, unknown>[]
  }>
  can_search_records?: boolean
  records_unavailable?: boolean
  meters?: Array<{
    id: string
    meter_number: string
    counters: Array<{
      id: { ... }
      obis_number?: { ... }
      direction: { ... }
      tariff_type?: { ... }
      unit?: { ... }
      last_reading?: { ... }
      highest_reading?: { ... }
    }>
  }>
  entities?: Record<string, unknown>[]
  options?: Array<{
    value: string
    label: string
  }>
  has_more_options?: boolean
  can_search_options?: boolean
  selected_options?: Array<{
    value: string
    label: string
  }>
  instances?: Array<{
    blocks: { ... }[]
  }>
  devices?: Array<{
    name: string
    has_fixed_demand: boolean
    is_other?: boolean
  }>
  needs_screen?: boolean
  signed_in?: boolean
  // ...
}
```

### `SummarySection`

```ts
type SummarySection = {
  step_id: string
  step_name: string
  rows: Array<{
    block_id: string
    title: string
    value?: unknown
    instances?: { ... }[][]
  }>
}
```

### `SummaryRow`

A summarised answer, or a repeatable group with the rows of each of its instances.

```ts
type SummaryRow = {
  block_id: string
  title: string
  value?: unknown
  instances?: { ... }[][]
}
```

### `Instance`

```ts
type Instance = {
  blocks: Array<{
    id: string
    name: string
    type: string
    required: boolean
    settings?: Record<string, unknown>
    value?: unknown
    warnings?: string[]
    offers?: Array<{
      product_id: { ... }
      price_id: { ... }
      name: { ... }
      description?: { ... }
      currency: { ... }
      price_display: { ... }
      charges: { ... }
      catalog_reference?: { ... }
    }>
    current_offer?: {
      product_id: { ... }
      price_id: { ... }
      name: { ... }
      description?: { ... }
      currency: { ... }
      price_display: { ... }
      charges: { ... }
      catalog_reference?: { ... }
    }
    promo_codes?: string[]
    asks_for_street?: {
      zip_code: { ... }
      city: { ... }
    }
    consents?: Array<{
      topics: { ... }
      text: { ... }
      required: { ... }
      is_agreed: { ... }
    }>
    records?: Array<{
      id: { ... }
      schema: { ... }
      title?: { ... }
      values: { ... }
      table_rows?: { ... }
    }>
    has_more_records?: boolean
    selected_records?: Array<{
      id: { ... }
      schema: { ... }
      title?: { ... }
      values: { ... }
      table_rows?: { ... }
    }>
    can_search_records?: boolean
    records_unavailable?: boolean
    meters?: Array<{
      id: { ... }
      meter_number: { ... }
      counters: { ... }
    }>
    entities?: Record<string, unknown>[]
    options?: Array<{
      value: { ... }
      label: { ... }
    }>
    has_more_options?: boolean
    can_search_options?: boolean
    selected_options?: Array<{
      value: { ... }
      label: { ... }
    }>
    instances?: { ... }[]
    devices?: Array<{
      name: { ... }
      has_fixed_demand: { ... }
      is_other?: { ... }
    }>
    needs_screen?: boolean
    signed_in?: boolean
    document?: {
      link_text?: { ... }
    }
    attribute?: {
      name: { ... }
      label: { ... }
      type: { ... }
      editable: { ... }
    }
    summary?: Array<{
      step_id: { ... }
      step_name: { ... }
      rows: { ... }
    }>
  }>
}
```

### `Offer`

A product a block offers, with the price it is offered at.

```ts
type Offer = {
  product_id: string
  price_id: string
  name: string
  description?: string
  currency: string
  price_display: "price" | "starting_price" | "on_request" | "estimated"
  charges: Array<{
    charged: "once" | "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly"
    total: number
    before_tax: number
    tax: number
  }>
  catalog_reference?: Record<string, unknown>
}
```

### `Charge`

```ts
type Charge = {
  charged: "once" | "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly"
  total: number
  before_tax: number
  tax: number
}
```

### `Consent`

```ts
type Consent = {
  topics: string[]
  text: string
  required: boolean
  is_agreed: boolean
}
```

### `CalculatorDevice`

```ts
type CalculatorDevice = {
  name: string
  has_fixed_demand: boolean
  is_other?: boolean
}
```

### `EntityAttribute`

The attribute an entity attribute block shows, of the entity it is set up for: the contract an entity finder chose, the entity the session is opened for, or the customer's contact. The block's value holds the attribute's value on the entity (`oldValue`), its new value (`newValue`), the entity's ID (

```ts
type EntityAttribute = {
  name: string
  label: string
  type: string
  editable: boolean
}
```

### `CardRecord`

```ts
type CardRecord = {
  id: string
  schema: string
  title?: string
  values: Record<string, unknown>
  table_rows?: Record<string, unknown>[]
}
```

### `ChoiceOption`

```ts
type ChoiceOption = {
  value: string
  label: string
}
```

### `ChoiceOptionsPage`

```ts
type ChoiceOptionsPage = {
  options: Array<{
    value: string
    label: string
  }>
  has_more_options: boolean
  issues: Array<{
    code: string
    block_id?: string
    step_id?: string
    message?: string
    instance?: number
    context_parameters?: string[]
  }>
}
```

### `JourneySessionDocument`

```ts
type JourneySessionDocument = {
  preview_url?: string
  issues: Array<{
    code: string
    block_id?: string
    step_id?: string
    message?: string
    instance?: number
    context_parameters?: string[]
  }>
}
```

### `CardRecordsPage`

```ts
type CardRecordsPage = {
  records: Array<{
    id: string
    schema: string
    title?: string
    values: Record<string, unknown>
    table_rows?: Record<string, unknown>[]
  }>
  has_more_records: boolean
  issues: Array<{
    code: string
    block_id?: string
    step_id?: string
    message?: string
    instance?: number
    context_parameters?: string[]
  }>
}
```

### `Meter`

```ts
type Meter = {
  id: string
  meter_number: string
  counters: Array<{
    id: string
    obis_number?: string
    direction: "feed-in" | "feed-out"
    tariff_type?: string
    unit?: string
    last_reading?: {
      value: { ... }
      read_at?: { ... }
    }
    highest_reading?: number
  }>
}
```

### `MeterCounter`

```ts
type MeterCounter = {
  id: string
  obis_number?: string
  direction: "feed-in" | "feed-out"
  tariff_type?: string
  unit?: string
  last_reading?: {
    value: number
    read_at?: string // date-time
  }
  highest_reading?: number
}
```

### `View`

```ts
type View = {
  step?: {
    id: string
    name: string
    title?: string
    subtitle?: string
  }
  blocks: Array<{
    id: string
    name: string
    type: string
    required: boolean
    settings?: Record<string, unknown>
    value?: unknown
    warnings?: string[]
    offers?: Array<{
      product_id: { ... }
      price_id: { ... }
      name: { ... }
      description?: { ... }
      currency: { ... }
      price_display: { ... }
      charges: { ... }
      catalog_reference?: { ... }
    }>
    current_offer?: {
      product_id: { ... }
      price_id: { ... }
      name: { ... }
      description?: { ... }
      currency: { ... }
      price_display: { ... }
      charges: { ... }
      catalog_reference?: { ... }
    }
    promo_codes?: string[]
    asks_for_street?: {
      zip_code: { ... }
      city: { ... }
    }
    consents?: Array<{
      topics: { ... }
      text: { ... }
      required: { ... }
      is_agreed: { ... }
    }>
    records?: Array<{
      id: { ... }
      schema: { ... }
      title?: { ... }
      values: { ... }
      table_rows?: { ... }
    }>
    has_more_records?: boolean
    selected_records?: Array<{
      id: { ... }
      schema: { ... }
      title?: { ... }
      values: { ... }
      table_rows?: { ... }
    }>
    can_search_records?: boolean
    records_unavailable?: boolean
    meters?: Array<{
      id: { ... }
      meter_number: { ... }
      counters: { ... }
    }>
    entities?: Record<string, unknown>[]
    options?: Array<{
      value: { ... }
      label: { ... }
    }>
    has_more_options?: boolean
    can_search_options?: boolean
    selected_options?: Array<{
      value: { ... }
      label: { ... }
    }>
    instances?: Array<{
      blocks: { ... }
    }>
    devices?: Array<{
      name: { ... }
      has_fixed_demand: { ... }
      is_other?: { ... }
    }>
    needs_screen?: boolean
    signed_in?: boolean
    document?: {
      link_text?: { ... }
    }
    attribute?: {
      name: { ... }
      label: { ... }
      type: { ... }
      editable: { ... }
    }
    summary?: Array<{
      step_id: { ... }
  // ...
}
```

### `JourneySessionState`

```ts
type JourneySessionState = {
  session: {
    id: string // uuid
    journey_id: string
    revision_id?: string
    status: "open" | "finished" | "expired" | "discarded"
    version: number
    started_at: string // date-time
    changed_at: string // date-time
    finished_at?: string // date-time
    expires_at: string // date-time
    submissions: Array<{
      step_id: { ... }
      at: { ... }
    }>
    handoff?: {
      opened: { ... }
      expires_at: { ... }
    }
  }
  view: {
    step?: {
      id: { ... }
      name: { ... }
      title?: { ... }
      subtitle?: { ... }
    }
    blocks: Array<{
      id: { ... }
      name: { ... }
      type: { ... }
      required: { ... }
      settings?: { ... }
      value?: { ... }
      warnings?: { ... }
      offers?: { ... }
      current_offer?: { ... }
      promo_codes?: { ... }
      asks_for_street?: { ... }
      consents?: { ... }
      records?: { ... }
      has_more_records?: { ... }
      selected_records?: { ... }
      can_search_records?: { ... }
      records_unavailable?: { ... }
      meters?: { ... }
      entities?: { ... }
      options?: { ... }
      has_more_options?: { ... }
      can_search_options?: { ... }
      selected_options?: { ... }
      instances?: { ... }
      devices?: { ... }
      needs_screen?: { ... }
      signed_in?: { ... }
      document?: { ... }
      attribute?: { ... }
      summary?: { ... }
    }>
    is_submit_step: boolean
    can_go_back: boolean
  }
  issues: Array<{
    code: string
    block_id?: string
    step_id?: string
    message?: string
    instance?: number
    context_parameters?: string[]
  }>
}
```

### `SnapshotToKeep`

```ts
type SnapshotToKeep = {
  journey_id: string
  snapshot: Record<string, unknown>
  base_version?: number
}
```

### `KeptJourneySession`

```ts
type KeptJourneySession = {
  session: {
    id: string // uuid
    journey_id: string
    revision_id?: string
    status: "open" | "finished" | "expired" | "discarded"
    version: number
    started_at: string // date-time
    changed_at: string // date-time
    finished_at?: string // date-time
    expires_at: string // date-time
    submissions: Array<{
      step_id: { ... }
      at: { ... }
    }>
    handoff?: {
      opened: { ... }
      expires_at: { ... }
    }
  }
}
```

### `JourneySessionSnapshot`

```ts
type JourneySessionSnapshot = {
  session: {
    id: string // uuid
    journey_id: string
    revision_id?: string
    status: "open" | "finished" | "expired" | "discarded"
    version: number
    started_at: string // date-time
    changed_at: string // date-time
    finished_at?: string // date-time
    expires_at: string // date-time
    submissions: Array<{
      step_id: { ... }
      at: { ... }
    }>
    handoff?: {
      opened: { ... }
      expires_at: { ... }
    }
  }
  snapshot: Record<string, unknown>
}
```

### `JourneySessionList`

```ts
type JourneySessionList = {
  results: Array<{
    id: string // uuid
    journey_id: string
    revision_id?: string
    status: "open" | "finished" | "expired" | "discarded"
    version: number
    started_at: string // date-time
    changed_at: string // date-time
    finished_at?: string // date-time
    expires_at: string // date-time
    submissions: Array<{
      step_id: { ... }
      at: { ... }
    }>
    handoff?: {
      opened: { ... }
      expires_at: { ... }
    }
  }>
}
```

### `StartedJourneySession`

```ts
type StartedJourneySession = {
  session: {
    id: string // uuid
    journey_id: string
    revision_id?: string
    status: "open" | "finished" | "expired" | "discarded"
    version: number
    started_at: string // date-time
    changed_at: string // date-time
    finished_at?: string // date-time
    expires_at: string // date-time
    submissions: Array<{
      step_id: { ... }
      at: { ... }
    }>
    handoff?: {
      opened: { ... }
      expires_at: { ... }
    }
  }
  view: {
    step?: {
      id: { ... }
      name: { ... }
      title?: { ... }
      subtitle?: { ... }
    }
    blocks: Array<{
      id: { ... }
      name: { ... }
      type: { ... }
      required: { ... }
      settings?: { ... }
      value?: { ... }
      warnings?: { ... }
      offers?: { ... }
      current_offer?: { ... }
      promo_codes?: { ... }
      asks_for_street?: { ... }
      consents?: { ... }
      records?: { ... }
      has_more_records?: { ... }
      selected_records?: { ... }
      can_search_records?: { ... }
      records_unavailable?: { ... }
      meters?: { ... }
      entities?: { ... }
      options?: { ... }
      has_more_options?: { ... }
      can_search_options?: { ... }
      selected_options?: { ... }
      instances?: { ... }
      devices?: { ... }
      needs_screen?: { ... }
      signed_in?: { ... }
      document?: { ... }
      attribute?: { ... }
      summary?: { ... }
    }>
    is_submit_step: boolean
    can_go_back: boolean
  }
  issues: Array<{
    code: string
    block_id?: string
    step_id?: string
    message?: string
    instance?: number
    context_parameters?: string[]
  }>
  secret: string
}
```

### `JourneyNotSupported`

```ts
type JourneyNotSupported = {
  error: string
  issues: Array<{
    code: string
    block_id?: string
    step_id?: string
    message?: string
    instance?: number
    context_parameters?: string[]
  }>
  reason?: string
}
```
