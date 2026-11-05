---
"@epilot/targeting-client": minor
---

Regenerate types from the Targeting API for campaign scheduling (ER-5517): `CampaignStatus` gets `scheduled` (launched with a future `start_date`, started on its own at that time), the campaign's `start_date`/`end_date` become date-times, and `changeCampaignStatus` documents the schedule/cancel transitions and the `INVALID_CAMPAIGN_DATES`, `CAMPAIGN_END_BEFORE_START` and `CAMPAIGN_END_IN_PAST` errors. Also syncs the `entity_ui_status` recipient filter, the `403` responses of `changeCampaignStatus` and `setupCampaign`, and the updated target `search` and `sort` descriptions.
