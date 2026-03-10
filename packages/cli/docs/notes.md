# Notes API

**API Name:** `notes`
**Base URL:** `https://notes.sls.epilot.io`

Facade API Backend for Epilot Notes feature

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `createNote` | POST | `/v1/note` | createNote |
| `getNote` | GET | `/v1/note/{id}` | getNote |
| `updateNote` | PUT | `/v1/note/{id}` | updateNote |
| `patchNote` | PATCH | `/v1/note/{id}` | patchNote |
| `deleteNote` | DELETE | `/v1/note/{id}` | deleteNote |
| `searchNotesByContext` | POST | `/v1/notes:search` | searchNotesByContext |
| `getNotesByContext` | GET | `/v1/notes/{entity_id}` | getNotesByContext |
| `pinNote` | POST | `/v1/note/{id}/pin` | pinNote |
| `getNoteContexts` | GET | `/v1/note/{id}/context` | getNoteContexts |
| `addNoteReaction` | POST | `/v1/note/{id}/reaction` | addNoteReaction |
| `removeNoteReaction` | DELETE | `/v1/note/{id}/reaction/{emoji_shortcode}` | removeNoteReaction |
| `toggleNoteReactions` | POST | `/v1/note/{id}/reactions/toggle` | toggleNoteReactions |

## Usage

```bash
epilot notes createNote
```
