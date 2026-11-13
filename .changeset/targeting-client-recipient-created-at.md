---
"@epilot/targeting-client": minor
---

Regenerate types from the Targeting API: a campaign recipient gets `created_at`, when the entity became a recipient (at launch, when it first saw the campaign in a portal or as a Next Best Action, or when the daily recipient check of a campaign with `auto_add_recipients` added it; ER-5515). Also syncs what's already deployed: the `CampaignType` enum with `product_recommendations` and `type` on the campaign, `setupCampaign` requiring exactly one `campaign.target_ids` entry, and `changeCampaignStatus` documenting `CAMPAIGN_HAS_NO_PRODUCT_RECOMMENDATIONS`.
