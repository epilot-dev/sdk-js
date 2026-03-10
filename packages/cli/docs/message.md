# Message API

**API Name:** `message`
**Base URL:** `https://message.sls.epilot.io`

Send and receive email messages via your epilot organization


## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `sendMessage` | POST | `/v1/message/messages` | sendMessage |
| `updateMessage` | PUT | `/v1/message/messages` | updateMessage |
| `getMessage` | GET | `/v1/message/messages/{id}` | getMessage |
| `deleteMessage` | DELETE | `/v1/message/messages/{id}` | deleteMessage |
| `getMessageEml` | GET | `/v1/message/messages/{id}/eml` | getMessageEml |
| `searchMessages` | POST | `/v1/message/messages:search` | searchMessages |
| `trashMessage` | POST | `/v1/message/messages/{id}/trash` | trashMessage |
| `untrashMessage` | POST | `/v1/message/messages/{id}/untrash` | untrashMessage |
| `markReadMessage` | POST | `/v1/message/messages/{id}/read` | markReadMessage |
| `markReadMessageV2` | POST | `/v2/message/messages/{id}/read` | markReadMessageV2 |
| `markUnreadMessage` | POST | `/v1/message/messages/{id}/unread` | markUnreadMessage |
| `getUnread` | GET | `/v1/message/messages/unread/{actor}` | getUnread |
| `markUnreadMessageV2` | POST | `/v2/message/messages/{id}/unread` | markUnreadMessageV2 |
| `searchThreads` | POST | `/v1/message/threads:search` | searchThreads |
| `searchThreadsV2` | POST | `/v2/message/threads:search` | searchThreadsV2 |
| `searchIds` | POST | `/v1/message/threads:searchIds` | Search threads and return all id's |
| `updateThread` | PUT | `/v1/message/threads` | updateThread |
| `deleteThread` | DELETE | `/v1/message/threads/{id}` | deleteThread |
| `moveThread` | POST | `/v1/message/threads/{id}:move` | moveThread |
| `markThreadAsDone` | POST | `/v1/message/threads/{id}:markAsDone` | markThreadAsDone |
| `markThreadAsOpen` | POST | `/v1/message/threads/{id}:markAsOpen` | markThreadAsOpen |
| `getThreadTimeline` | GET | `/v1/message/threads/{id}/timeline` | getThreadTimeline |
| `trashThread` | POST | `/v1/message/threads/{id}/trash` | trashThread |
| `untrashThread` | POST | `/v1/message/threads/{id}/untrash` | untrashThread |
| `threadBulkActionsRead` | POST | `/v1/message/threads/bulk:read` | threadBulkActionsRead |
| `threadBulkActionsUnread` | POST | `/v1/message/threads/bulk:unread` | threadBulkActionsUnread |
| `threadBulkActionsFavorite` | POST | `/v1/message/threads/bulk:favorite` | threadBulkActionsFavorite |
| `threadBulkActionsUnfavorite` | POST | `/v1/message/threads/bulk:unfavorite` | threadBulkActionsUnfavorite |
| `threadBulkActionsTrash` | POST | `/v1/message/threads/bulk:trash` | threadBulkActionsTrash |
| `threadBulkActionsUntrash` | POST | `/v1/message/threads/bulk:untrash` | threadBulkActionsUntrash |
| `threadBulkActionsDelete` | POST | `/v1/message/threads/bulk:delete` | threadBulkActionsDelete |
| `threadBulkActionsDone` | POST | `/v1/message/threads/bulk:done` | threadBulkActionsDone |
| `threadBulkActionsOpen` | POST | `/v1/message/threads/bulk:open` | threadBulkActionsOpen |
| `markReadThread` | POST | `/v1/message/threads/{id}/read` | markReadThread |
| `markReadThreadV2` | POST | `/v2/message/threads/{id}/read` | markReadThreadV2 |
| `markUnreadThread` | POST | `/v1/message/threads/{id}/unread` | markUnreadThread |
| `markUnreadThreadV2` | POST | `/v2/message/threads/{id}/unread` | markUnreadThreadV2 |
| `assignThread` | POST | `/v1/message/threads/{id}/assign` | assignThread |
| `unassignThread` | POST | `/v1/message/threads/{id}/unassign` | unassignThread |
| `assignUsers` | POST | `/v1/message/threads/{id}/assign:users` | assignUsers |
| `assignUsersV2` | POST | `/v2/message/threads/{id}/assign:users` | assignUsersV2 |
| `pinThread` | POST | `/v1/message/threads/{id}:pin` | Pin a single thread |
| `unpinThread` | DELETE | `/v1/message/threads/{id}:pin` | Unpin a single thread |
| `createDraft` | POST | `/v1/message/drafts` | createDraft |
| `sendDraft` | POST | `/v1/message/drafts:send` | sendDraft |
| `getMessageV2` | GET | `/v2/message/messages/{id}` | getMessageV2 |

## Usage

```bash
epilot message sendMessage
```
