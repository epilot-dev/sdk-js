# Notification API

**API Name:** `notification`
**Base URL:** `https://notification.sls.epilot.io`

Notification API for epilot 360

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `getNotificationsV2` | GET | `/v2/notification/notifications` | getNotificationsV2 |
| `getNotifications` | GET | `/v1/notification/notifications` | getNotifications |
| `createNotification` | POST | `/v1/notification/notifications` | createNotification |
| `getNotification` | GET | `/v1/notification/notifications/{id}` | getNotification |
| `markAllAsRead` | PUT | `/v1/notification/notifications/mark` | markAllAsRead |
| `markAsRead` | PUT | `/v1/notification/notifications/{id}/mark` | markAsRead |
| `getTotalUnread` | GET | `/v1/notification/unreads` | getTotalUnread |
| `listNotificationTemplates` | GET | `/v1/notification/templates` | listNotificationTemplates |
| `createNotificationTemplate` | POST | `/v1/notification/templates` | createNotificationTemplate |
| `getNotificationTemplate` | GET | `/v1/notification/templates/{id}` | getNotificationTemplate |
| `updateNotificationTemplate` | PUT | `/v1/notification/templates/{id}` | updateNotificationTemplate |
| `patchNotificationTemplate` | PATCH | `/v1/notification/templates/{id}` | patchNotificationTemplate |
| `deleteNotificationTemplate` | DELETE | `/v1/notification/templates/{id}` | deleteNotificationTemplate |
| `sendPreview` | POST | `/v1/notification/templates/send-preview` | sendPreview |

## Usage

```bash
epilot notification getNotificationsV2
```
