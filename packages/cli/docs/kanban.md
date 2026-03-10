# Kanban API

**API Name:** `kanban`
**Base URL:** `https://kanban.sls.epilot.io`

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `createKanbanBoard` | POST | `/v1/kanban/board` | Create a Kanban board |
| `getKanbanBoards` | GET | `/v1/kanban/boards` | Get all Kanban boards |
| `getKanbanBoard` | GET | `/v1/kanban/board/{boardId}` | Get a Kanban board |
| `updateKanbanBoard` | PUT | `/v1/kanban/board/{boardId}` | Update a Kanban board |
| `patchKanbanBoard` | PATCH | `/v1/kanban/board/{boardId}` | Patch a Kanban board |
| `deleteKanbanBoard` | DELETE | `/v1/kanban/board/{boardId}` | Delete a Kanban board |
| `setDefaultKanbanBoard` | PUT | `/v1/kanban/org/default-board` | Set default board for organization |
| `clearDefaultKanbanBoard` | DELETE | `/v1/kanban/org/default-board` | Clear default board for organization |
| `flowsAutocomplete` | GET | `/v1/kanban/query/flows:autocomplete` | flowsAutocomplete |
| `executeFlowsQuery` | POST | `/v1/kanban/query/flows:execute` | executeFlowsQuery |

## Usage

```bash
epilot kanban createKanbanBoard
```
