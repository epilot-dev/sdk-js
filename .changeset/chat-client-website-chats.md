---
"@epilot/chat-client": minor
"@epilot/sdk": minor
"@epilot/cli": patch
---

Regenerate the chat client from the Chat API spec after the `widgets` resource was renamed to Website Chats (the embeddable chat product is now called Website Chat).

Management operations move from `/v1/widgets` to `/v1/website-chats` (path parameter `{widget_id}` → `{website_chat_id}`): `listChatWidgets` → `listWebsiteChats`, `createChatWidget` → `createWebsiteChat`, `getChatWidget` → `getWebsiteChat`, `updateChatWidget` → `updateWebsiteChat` and `deleteChatWidget` → `deleteWebsiteChat`. The public configuration read `getPublicChatWidget` (`GET /v1/widgets/{widget_id}/configuration`) becomes `getPublicWebsiteChat` (`GET /v1/website-chats/{website_chat_id}/configuration`).

Schemas are renamed to match: `ChatWidget` → `WebsiteChat`, `ListChatWidgetsResponse` → `ListWebsiteChatsResponse` (its `widgets` list → `website_chats`), `CreateChatWidgetRequest` → `CreateWebsiteChatRequest`, `UpdateChatWidgetRequest` → `UpdateWebsiteChatRequest`, `Widget` → `PublicWebsiteChat` and `WidgetDesign` → `WebsiteChatDesign`.

Fields on the Website Chat resource and its create/update requests: `widget_id` → `website_chat_id`, `website_chat` → `settings` (still `WebsiteChatSettings`) and `website_chat_embed` → `embed`. In the anonymous flow, `POST /v1/bootstrap` takes `website_chat_id` instead of `widget_key` and returns `frame_origin` instead of `widget_origin`, and the `POST /v1/sessions` response carries the public configuration as `website_chat` instead of `widget`.

The regenerated spec also brings the anonymous email verification operations, all authorised with the anonymous session token: `getChatVerification` (`GET /v1/verification`), `startChatEmailVerification` (`POST /v1/verification/email`), `verifyChatEmailCode` (`POST /v1/verification/code`) and `cancelChatVerification` (`POST /v1/verification/cancel`), returning the new `VerificationState`. The public Website Chat configuration gains `authentication.email_code`, and the public error codes gain `INVALID_VERIFICATION_CODE`, `VERIFICATION_EXPIRED`, `VERIFICATION_CONFLICT`, `VERIFICATION_DISABLED`, `VERIFICATION_UNAVAILABLE` and `IDENTITY_CHANGED`.

This is a breaking change for callers of the old operation, schema and field names, with no aliases. The Chat API has no production consumers yet.
