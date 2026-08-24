---
"@epilot/customer-portal-client": minor
---

Add optional per-value `label` to `getConsumption` data points

Each consumption data point can carry a localized label (`{ [lang]: string }`, same shape as `VisualizationTypeOption.label`). When present, the end-customer portal renders it as the data point label instead of the default timestamp-derived one (e.g. to name billing periods or tariff windows).

The refresh also picks up API changes merged but not yet in the deployed spec: portal notifications endpoints (`listPortalNotifications`, `getPortalNotificationsUnreadCount`, `markAllPortalNotificationsRead`, `markPortalNotificationRead`), `getOutstandingTasks`, and `custom_download_url_auth` on document download blocks.
