/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Responses {
        export type BadRequest = Schemas.ErrorResponse;
        export type Conflict = Schemas.ErrorResponse;
        export type Forbidden = Schemas.ErrorResponse;
        export type InternalServerError = Schemas.ErrorResponse;
        export type NotFound = Schemas.ErrorResponse;
    }
    namespace Schemas {
        export interface Address {
            /**
             * Email address alias
             * example:
             * epilot
             */
            name?: string;
            /**
             * Email address
             * example:
             * messaging@epilot.cloud
             */
            address: string;
            /**
             * Type of the email, Internal (360 Agents), Partners, External users(Customers)
             *
             */
            email_type?: "INTERNAL" | "EXTERNAL" | "PARTNER";
            /**
             * Sent message status regarding to this recipient.            Reference at <https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html>
             *
             */
            send_status?: "SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR";
            /**
             * Information about reject, complaint or bounce event. Only available if `send_status` is REJECT, COMPLAINT, BOUNCE or ERROR.            JSON object is defined by AWS SES. Reference at <https://docs.aws.amazon.com/ses/latest/DeveloperGuide/notification-contents.html>
             *
             */
            send_error?: {
                [key: string]: any;
            };
        }
        /**
         * Message attachments
         */
        export interface AttachmentsRelation {
            /**
             * It's normal entity relation with some additional properties for sending message attachment.
             */
            $relation?: File[];
        }
        export interface BaseEntity {
            /**
             * Entity ID
             * example:
             * 3fa85f64-5717-4562-b3fc-2c963f66afa6
             */
            _id: string;
            /**
             * Entity title
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 206801
             */
            _org: string;
            /**
             * URL-friendly identifier for the entity schema
             * example:
             * message
             */
            _schema: string;
            /**
             * Entity tags
             * example:
             * [
             *   "pricing",
             *   "INBOX"
             * ]
             */
            _tags?: string[];
            /**
             * Created date
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Updated date
             * example:
             * 2021-02-10T09:14:31.990Z
             */
            _updated_at: string; // date-time
        }
        export interface BulkActionsPayload {
            /**
             * Array of threads you wish to perform bulk actions on
             * example:
             * [
             *   "6b299eda-4018-4554-8965-c4b5598e6531"
             * ]
             */
            ids: string[];
        }
        export interface BulkActionsPayloadWithScopes {
            /**
             * Array of threads you wish to perform bulk actions on
             * example:
             * [
             *   "6b299eda-4018-4554-8965-c4b5598e6531"
             * ]
             */
            ids: string[];
            /**
             * The scopes to be used when marking an item as read or unread. The read status will be synced for all provided scopes.
             * example:
             * [
             *   "organization",
             *   "user"
             * ]
             */
            scopes?: /* Who is marking an item as read or unread. */ ReadingScope[];
        }
        export interface ErrorResponse {
            /**
             * Error message
             * example:
             * Thread not found
             */
            error?: string;
        }
        /**
         * List of entity fields to include or exclude in the response
         *
         * Use ! to exclude fields, e.g. `!_id` to exclude the `_id` field.
         *
         * Globbing and globstart (**) is supported for nested fields.
         *
         * example:
         * [
         *   "_id",
         *   "_title",
         *   "first_name",
         *   "account",
         *   "!account.*._files",
         *   "**._product"
         * ]
         */
        export type FieldsParam = string[];
        export interface File {
            /**
             * File entity ID
             * example:
             * f820ce3b-07b0-45ae-bcc6-babb2f53f79f
             */
            entity_id: string;
            /**
             * File name
             * example:
             * Produktinformationen_epilot360_Double_Opt_in.pdf
             */
            filename?: string;
            /**
             * To indicate this file relation is message attachment. If false then this file will not be sent and simply kept as a file relation.
             */
            is_message_attachment?: boolean;
            /**
             * To indicate this file relation may be signature attachment. If true then this file will be sent as signature attachment and not related to any entity.
             */
            may_be_signature_attachment?: boolean;
            /**
             * Content ID (for inline)
             * example:
             * fb222496-a1a5-4639-94f2-07b5e35e4068
             */
            cid?: string;
            /**
             * If true then this attachment should not be offered for download (at least not in the main attachments list).            The usecase is CID embedded image (aka inline image).
             *
             */
            inline?: boolean;
            /**
             * If true then this attachment is sent via link. The link have to be inserted to email body by API caller.            In this case, service doesn't process this attachment.
             *
             */
            send_as_link?: boolean;
        }
        export interface Message {
            /**
             * Message ID which is from email provider. If you provide `message-id`, API overrides by its own value.
             * example:
             * <0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com>
             */
            message_id?: string;
            /**
             * User ID of user sends the message.
             * example:
             * 206801
             */
            sender?: string;
            /**
             * Subject
             * example:
             * Request for solar panel price
             */
            subject: string;
            /**
             * HTML body
             * example:
             * <div>We at ABC GmbH would like to request a price quote for the solar panel.</div>
             */
            html?: string;
            /**
             * Text body
             * example:
             * We at ABC GmbH would like to request a price quote for the solar panel.
             */
            text?: string;
            from: Address;
            reply_to?: Address;
            /**
             * To email addresses
             */
            to?: Address[];
            /**
             * Cc email addresses
             */
            cc?: Address[];
            /**
             * Bcc email addresses
             */
            bcc?: Address[];
            file?: /* Message attachments */ AttachmentsRelation;
            /**
             * References header. Value is the series of `message_id` which is reparated by space to indicate that message has parent.            The last message ID in references identifies the parent. The first message ID in references identifies the first message in the thread.            The basic idea is that sender should copy `references` from the parent and append the parent's `message_id` when replying.
             *
             * example:
             * <0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>
             */
            references?: string;
            /**
             * In-Reply-To header. Value is the `message_id` of parent message.
             *
             * example:
             * <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>
             */
            in_reply_to?: string;
            /**
             * User ID of user read the message.
             * example:
             * [
             *   "206801",
             *   "200109"
             * ]
             */
            user_read_message?: string[];
            /**
             * Organization ID of organization read the message.
             * example:
             * [
             *   "789372",
             *   "210291"
             * ]
             */
            org_read_message?: string[];
            /**
             * Sent message status. The array contains sending message status corresponding to all recipients. For more detail, check `send_status` of each recipient in `to`, `cc`, `bcc`            Reference at <https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html>
             *
             */
            send_status?: ("SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR")[];
            /**
             * Message type
             */
            type?: "SENT" | "RECEIVED";
            /**
             * Template ID used for sending message.
             * example:
             * 3f34ce73-089c-4d45-a5ee-c161234e41c3
             */
            template_id?: string;
        }
        export interface MessageRequestParams {
            [name: string]: any;
            /**
             * Open new thread when sending the very first message in conversation. Thread should contains context related to all messages in it (eg. topic, brand_id, opportunity_id, assigned_to,...).            Thread properties depend on API caller as it's not pre-defined. We do recommend having at least `topic` property for categorizing.            `thread` or `parent_id` must be provided either.
             *
             * example:
             * {
             *   "topic": "CUSTOMER_MESSAGE",
             *   "assigned_to": [
             *     "206801",
             *     "200109"
             *   ],
             *   "opportunity_id": 829072
             * }
             */
            thread?: {
                /**
                 * Message topic (e.g. which service sends the message or message category)
                 */
                topic: string;
                /**
                 * User ID of who the message is assigned to. Default is the user who sends message.
                 */
                assigned_to?: string[];
            };
            /**
             * Entity ID of parent message which this message replies to or forwards from.            If both `parent_id` and `thread` are provided, `thread` is discarded.
             *
             * example:
             * 44d7a3eb-0cce-4bd3-a7cd-0b3e652de0c2
             */
            parent_id?: string;
            /**
             * Subject
             * example:
             * Request for solar panel price
             */
            subject: string;
            /**
             * HTML body
             * example:
             * <div>We at ABC GmbH would like to request a price quote for the solar panel.</div>
             */
            html?: string;
            /**
             * Text body. If not provided, text body is converted from HTML body using [html-to-text](https://www.npmjs.com/package/html-to-text)
             * example:
             * We at ABC GmbH would like to request a price quote for the solar panel.
             */
            text?: string;
            from: Address;
            reply_to?: Address;
            /**
             * To email addresses
             */
            to?: Address[];
            /**
             * Cc email addresses
             */
            cc?: Address[];
            /**
             * Bcc email addresses
             */
            bcc?: Address[];
            file?: /* Message attachments */ AttachmentsRelation;
            /**
             * Template ID used for sending message.
             * example:
             * 3f34ce73-089c-4d45-a5ee-c161234e41c3
             */
            template_id?: string;
        }
        export interface MessageV2 {
            /**
             * Entity ID
             * example:
             * 3fa85f64-5717-4562-b3fc-2c963f66afa6
             */
            _id: string;
            /**
             * Entity title
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 206801
             */
            _org: string;
            /**
             * URL-friendly identifier for the entity schema
             * example:
             * message
             */
            _schema: string;
            /**
             * Entity tags
             * example:
             * [
             *   "pricing",
             *   "INBOX"
             * ]
             */
            _tags?: string[];
            /**
             * Created date
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Updated date
             * example:
             * 2021-02-10T09:14:31.990Z
             */
            _updated_at: string; // date-time
            /**
             * Message ID which is from email provider. If you provide `message-id`, API overrides by its own value.
             * example:
             * <0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com>
             */
            message_id?: string;
            /**
             * User ID of user sends the message.
             * example:
             * 206801
             */
            sender?: string;
            /**
             * Subject
             * example:
             * Request for solar panel price
             */
            subject: string;
            /**
             * HTML body
             * example:
             * <div>We at ABC GmbH would like to request a price quote for the solar panel.</div>
             */
            html?: string;
            /**
             * Text body
             * example:
             * We at ABC GmbH would like to request a price quote for the solar panel.
             */
            text?: string;
            from: Address;
            reply_to?: Address;
            /**
             * To email addresses
             */
            to?: Address[];
            /**
             * Cc email addresses
             */
            cc?: Address[];
            /**
             * Bcc email addresses
             */
            bcc?: Address[];
            file?: /* Message attachments */ AttachmentsRelation;
            /**
             * References header. Value is the series of `message_id` which is reparated by space to indicate that message has parent.            The last message ID in references identifies the parent. The first message ID in references identifies the first message in the thread.            The basic idea is that sender should copy `references` from the parent and append the parent's `message_id` when replying.
             *
             * example:
             * <0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>
             */
            references?: string;
            /**
             * In-Reply-To header. Value is the `message_id` of parent message.
             *
             * example:
             * <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>
             */
            in_reply_to?: string;
            /**
             * User ID of user read the message.
             * example:
             * [
             *   "206801",
             *   "200109"
             * ]
             */
            user_read_message?: string[];
            /**
             * Organization ID of organization read the message.
             * example:
             * [
             *   "789372",
             *   "210291"
             * ]
             */
            org_read_message?: string[];
            /**
             * Sent message status. The array contains sending message status corresponding to all recipients. For more detail, check `send_status` of each recipient in `to`, `cc`, `bcc`            Reference at <https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html>
             *
             */
            send_status?: ("SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR")[];
            /**
             * Message type
             */
            type?: "SENT" | "RECEIVED";
            /**
             * Template ID used for sending message.
             * example:
             * 3f34ce73-089c-4d45-a5ee-c161234e41c3
             */
            template_id?: string;
            /**
             * If true then html is not provided and must be downloaded using the html_download_url
             */
            html_omitted?: boolean;
            /**
             * HTML body download URL
             * example:
             * https://s3.eu-central-1.amazonaws.com/epilot-attachments/3f34ce73-089c-4d45-a5ee-c161234e41c3/3f34ce73-089c-4d45-a5ee-c161234e41c3.html
             */
            html_download_url?: string;
        }
        export interface MoveThreadPayload {
            /**
             * Inbox ID
             * example:
             * 3f34ce73-089c-4d45-a5ee-c161234e41c3
             */
            inbox_id: string;
        }
        export interface ReadMessagePayload {
            /**
             * The scopes to be used when marking an item as read or unread. The read status will be synced for all provided scopes.
             * example:
             * [
             *   "organization",
             *   "user"
             * ]
             */
            scopes: /* Who is marking an item as read or unread. */ ReadingScope[];
        }
        /**
         * Who is marking an item as read or unread.
         */
        export type ReadingScope = "organization" | "user";
        export interface SearchIDParams {
            /**
             * Lucene query syntax supported with ElasticSearch
             * example:
             * subject:"Request for solar panel price" AND _tags:INBOX
             */
            q?: string;
        }
        export interface SearchParams {
            /**
             * Lucene query syntax supported with ElasticSearch
             * example:
             * subject:"Request for solar panel price" AND _tags:INBOX
             */
            q: string;
            from?: number;
            size?: number;
            hydrate?: boolean;
        }
        export interface SearchParamsV2 {
            inbox_id?: string | string[];
            /**
             * Lucene query syntax supported with ElasticSearch
             * example:
             * subject:"Request for solar panel price" AND _tags:INBOX
             */
            q: string;
            fields?: /**
             * List of entity fields to include or exclude in the response
             *
             * Use ! to exclude fields, e.g. `!_id` to exclude the `_id` field.
             *
             * Globbing and globstart (**) is supported for nested fields.
             *
             * example:
             * [
             *   "_id",
             *   "_title",
             *   "first_name",
             *   "account",
             *   "!account.*._files",
             *   "**._product"
             * ]
             */
            FieldsParam;
            from?: number;
            size?: number;
            hydrate?: boolean;
            include_scores?: boolean;
            sort?: string;
            highlight?: any;
        }
        /**
         * Mapping between a shared inbox and its Outlook shared mailbox.
         * This tracks which provider/tenant provisions each shared mailbox.
         *
         */
        export interface SharedMailboxMapping {
            /**
             * The email-settings shared inbox entity ID
             */
            shared_inbox_id: string;
            /**
             * The Outlook shared mailbox email address
             */
            outlook_email: string; // email
            /**
             * Azure AD Tenant ID that provisions this mailbox
             */
            tenant_id: string;
            /**
             * Provider type (for future extensibility)
             */
            provider: "outlook";
            /**
             * Display name from Outlook
             */
            display_name?: string;
            /**
             * When the mailbox was connected
             */
            connected_at: string; // date-time
            /**
             * User who connected this mailbox
             */
            connected_by_user_id?: string;
        }
        /**
         * Thread properties depend on API caller as it's not pre-defined. We do recommend having at least `topic` property for categorizing.
         */
        export interface Thread {
            /**
             * Message topic (e.g. which service sends the message or message category)
             * example:
             * CUSTOMER_MESSAGE
             */
            topic: string;
            /**
             * User ID of who the message is assigned to. Default is the user who sends message.
             * example:
             * [
             *   "206801",
             *   "200109"
             * ]
             */
            assigned_to?: string[];
            /**
             * Organization ID of organization read the message.
             * example:
             * [
             *   "789372",
             *   "210291"
             * ]
             */
            org_read_message?: string[];
            /**
             * Whether the thread is marked as Done
             * example:
             * false
             */
            done?: boolean;
            latest_message?: Message;
            latest_trash_message?: Message;
            /**
             * The date of the latest message time in the thread
             * example:
             * 2024-02-10T09:14:31.990Z
             */
            latest_message_at?: string;
        }
        export interface ThreadDoneEvent {
            type: "THREAD_DONE";
            /**
             * User ID of the user who marked the thread as done
             * example:
             * 123
             */
            user_id: string;
            /**
             * Organization ID of the organization who marked the thread as done
             * example:
             * 456
             */
            organization_id: string;
        }
        export interface ThreadOpenEvent {
            type: "THREAD_OPEN";
            /**
             * User ID of the user who marked the thread as open
             * example:
             * 123
             */
            user_id: string;
            /**
             * Organization ID of the organization who marked the thread as open
             * example:
             * 456
             */
            organization_id: string;
        }
        export interface ThreadTimeline {
            events: TimelineEvent[];
        }
        export interface TimelineEvent {
            data: TimelineEventData;
            /**
             * Timestamp of the event
             * example:
             * 2024-01-01T00:00:00Z
             */
            timestamp: string;
        }
        export type TimelineEventData = ThreadDoneEvent | ThreadOpenEvent;
    }
}
declare namespace Paths {
    namespace AssignThread {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        /**
         * Entities which thread is assigned to
         */
        export type RequestBody = {
            /**
             * Entity slug
             * example:
             * contact
             */
            slug?: string;
            /**
             * Entity ID
             * example:
             * 3f34ce73-089c-4d45-a5ee-c161234e41c3
             */
            entity_id?: string;
            /**
             * Organization ID
             * example:
             * 206801
             */
            org_id?: string;
            /**
             * To indicate this is main entity
             * example:
             * true
             */
            is_main_entity?: boolean;
        }[];
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace AssignUsers {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        /**
         * User IDs of users assigned to thread
         */
        export interface RequestBody {
            /**
             * IDs of users assigned to thread
             */
            assigned_to?: string[];
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace ConnectOutlook {
        namespace Responses {
            export interface $200 {
                authorization_url?: string;
            }
        }
    }
    namespace ConnectSharedMailbox {
        export interface RequestBody {
            /**
             * Email address of the Outlook shared mailbox to connect
             */
            email: string; // email
            /**
             * Display name for the shared inbox (defaults to mailbox display name)
             */
            name?: string;
            /**
             * Color for the shared inbox (hex code, defaults to green)
             */
            color?: string;
            /**
             * User IDs to assign to this shared inbox
             */
            assignees?: string[];
            /**
             * Description for the shared inbox
             */
            description?: string;
        }
        namespace Responses {
            export interface $201 {
                /**
                 * The created shared inbox from email-settings
                 */
                shared_inbox?: {
                    id?: string;
                    name?: string;
                    color?: string;
                    assignees?: string[];
                    description?: string;
                };
                /**
                 * The Outlook shared mailbox email address
                 */
                outlook_email?: string; // email
                /**
                 * Azure AD Tenant ID that provisions this mailbox
                 */
                tenant_id?: string;
                /**
                 * The provider type
                 */
                provider?: "outlook";
                /**
                 * Display name of the shared mailbox
                 */
                display_name?: string;
            }
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $500 {
            }
        }
    }
    namespace CreateDraft {
        export type RequestBody = Components.Schemas.MessageRequestParams;
        namespace Responses {
            export interface $201 {
                /**
                 * Entity ID
                 * example:
                 * 3fa85f64-5717-4562-b3fc-2c963f66afa6
                 */
                _id: string;
                /**
                 * Entity title
                 */
                _title: string;
                /**
                 * Organization ID the entity belongs to
                 * example:
                 * 206801
                 */
                _org: string;
                /**
                 * URL-friendly identifier for the entity schema
                 * example:
                 * message
                 */
                _schema: string;
                /**
                 * Entity tags
                 * example:
                 * [
                 *   "pricing",
                 *   "INBOX"
                 * ]
                 */
                _tags?: string[];
                /**
                 * Created date
                 * example:
                 * 2021-02-09T12:41:43.662Z
                 */
                _created_at: string; // date-time
                /**
                 * Updated date
                 * example:
                 * 2021-02-10T09:14:31.990Z
                 */
                _updated_at: string; // date-time
                /**
                 * Message ID which is from email provider. If you provide `message-id`, API overrides by its own value.
                 * example:
                 * <0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com>
                 */
                message_id?: string;
                /**
                 * User ID of user sends the message.
                 * example:
                 * 206801
                 */
                sender?: string;
                /**
                 * Subject
                 * example:
                 * Request for solar panel price
                 */
                subject: string;
                /**
                 * HTML body
                 * example:
                 * <div>We at ABC GmbH would like to request a price quote for the solar panel.</div>
                 */
                html?: string;
                /**
                 * Text body
                 * example:
                 * We at ABC GmbH would like to request a price quote for the solar panel.
                 */
                text?: string;
                from: Components.Schemas.Address;
                reply_to?: Components.Schemas.Address;
                /**
                 * To email addresses
                 */
                to?: Components.Schemas.Address[];
                /**
                 * Cc email addresses
                 */
                cc?: Components.Schemas.Address[];
                /**
                 * Bcc email addresses
                 */
                bcc?: Components.Schemas.Address[];
                file?: /* Message attachments */ Components.Schemas.AttachmentsRelation;
                /**
                 * References header. Value is the series of `message_id` which is reparated by space to indicate that message has parent.            The last message ID in references identifies the parent. The first message ID in references identifies the first message in the thread.            The basic idea is that sender should copy `references` from the parent and append the parent's `message_id` when replying.
                 *
                 * example:
                 * <0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>
                 */
                references?: string;
                /**
                 * In-Reply-To header. Value is the `message_id` of parent message.
                 *
                 * example:
                 * <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>
                 */
                in_reply_to?: string;
                /**
                 * User ID of user read the message.
                 * example:
                 * [
                 *   "206801",
                 *   "200109"
                 * ]
                 */
                user_read_message?: string[];
                /**
                 * Organization ID of organization read the message.
                 * example:
                 * [
                 *   "789372",
                 *   "210291"
                 * ]
                 */
                org_read_message?: string[];
                /**
                 * Sent message status. The array contains sending message status corresponding to all recipients. For more detail, check `send_status` of each recipient in `to`, `cc`, `bcc`            Reference at <https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html>
                 *
                 */
                send_status?: ("SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR")[];
                /**
                 * Message type
                 */
                type?: "SENT" | "RECEIVED";
                /**
                 * Template ID used for sending message.
                 * example:
                 * 3f34ce73-089c-4d45-a5ee-c161234e41c3
                 */
                template_id?: string;
            }
            export interface $403 {
            }
        }
    }
    namespace DeleteMessage {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace DeleteThread {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace DisconnectOutlook {
        export interface RequestBody {
            /**
             * Azure AD Tenant ID of the connection to disconnect
             */
            tenant_id: string;
        }
        namespace Responses {
            export interface $200 {
                success?: boolean;
                /**
                 * The tenant ID that was disconnected
                 */
                tenant_id?: string;
                /**
                 * List of shared inbox IDs that were affected by the disconnection
                 */
                affected_shared_inboxes?: string[];
            }
            export interface $400 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace GetMessage {
        namespace Parameters {
            /**
             * example:
             * 4d74976d-fb64-47fd-85e2-65eea140f5eb
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 4d74976d-fb64-47fd-85e2-65eea140f5eb
             */
            Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Entity ID
                 * example:
                 * 3fa85f64-5717-4562-b3fc-2c963f66afa6
                 */
                _id: string;
                /**
                 * Entity title
                 */
                _title: string;
                /**
                 * Organization ID the entity belongs to
                 * example:
                 * 206801
                 */
                _org: string;
                /**
                 * URL-friendly identifier for the entity schema
                 * example:
                 * message
                 */
                _schema: string;
                /**
                 * Entity tags
                 * example:
                 * [
                 *   "pricing",
                 *   "INBOX"
                 * ]
                 */
                _tags?: string[];
                /**
                 * Created date
                 * example:
                 * 2021-02-09T12:41:43.662Z
                 */
                _created_at: string; // date-time
                /**
                 * Updated date
                 * example:
                 * 2021-02-10T09:14:31.990Z
                 */
                _updated_at: string; // date-time
                /**
                 * Message ID which is from email provider. If you provide `message-id`, API overrides by its own value.
                 * example:
                 * <0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com>
                 */
                message_id?: string;
                /**
                 * User ID of user sends the message.
                 * example:
                 * 206801
                 */
                sender?: string;
                /**
                 * Subject
                 * example:
                 * Request for solar panel price
                 */
                subject: string;
                /**
                 * HTML body
                 * example:
                 * <div>We at ABC GmbH would like to request a price quote for the solar panel.</div>
                 */
                html?: string;
                /**
                 * Text body
                 * example:
                 * We at ABC GmbH would like to request a price quote for the solar panel.
                 */
                text?: string;
                from: Components.Schemas.Address;
                reply_to?: Components.Schemas.Address;
                /**
                 * To email addresses
                 */
                to?: Components.Schemas.Address[];
                /**
                 * Cc email addresses
                 */
                cc?: Components.Schemas.Address[];
                /**
                 * Bcc email addresses
                 */
                bcc?: Components.Schemas.Address[];
                file?: /* Message attachments */ Components.Schemas.AttachmentsRelation;
                /**
                 * References header. Value is the series of `message_id` which is reparated by space to indicate that message has parent.            The last message ID in references identifies the parent. The first message ID in references identifies the first message in the thread.            The basic idea is that sender should copy `references` from the parent and append the parent's `message_id` when replying.
                 *
                 * example:
                 * <0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>
                 */
                references?: string;
                /**
                 * In-Reply-To header. Value is the `message_id` of parent message.
                 *
                 * example:
                 * <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>
                 */
                in_reply_to?: string;
                /**
                 * User ID of user read the message.
                 * example:
                 * [
                 *   "206801",
                 *   "200109"
                 * ]
                 */
                user_read_message?: string[];
                /**
                 * Organization ID of organization read the message.
                 * example:
                 * [
                 *   "789372",
                 *   "210291"
                 * ]
                 */
                org_read_message?: string[];
                /**
                 * Sent message status. The array contains sending message status corresponding to all recipients. For more detail, check `send_status` of each recipient in `to`, `cc`, `bcc`            Reference at <https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html>
                 *
                 */
                send_status?: ("SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR")[];
                /**
                 * Message type
                 */
                type?: "SENT" | "RECEIVED";
                /**
                 * Template ID used for sending message.
                 * example:
                 * 3f34ce73-089c-4d45-a5ee-c161234e41c3
                 */
                template_id?: string;
            }
            export interface $302 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetMessageV2 {
        namespace Parameters {
            /**
             * example:
             * 4d74976d-fb64-47fd-85e2-65eea140f5eb
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 4d74976d-fb64-47fd-85e2-65eea140f5eb
             */
            Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Entity ID
                 * example:
                 * 3fa85f64-5717-4562-b3fc-2c963f66afa6
                 */
                _id: string;
                /**
                 * Entity title
                 */
                _title: string;
                /**
                 * Organization ID the entity belongs to
                 * example:
                 * 206801
                 */
                _org: string;
                /**
                 * URL-friendly identifier for the entity schema
                 * example:
                 * message
                 */
                _schema: string;
                /**
                 * Entity tags
                 * example:
                 * [
                 *   "pricing",
                 *   "INBOX"
                 * ]
                 */
                _tags?: string[];
                /**
                 * Created date
                 * example:
                 * 2021-02-09T12:41:43.662Z
                 */
                _created_at: string; // date-time
                /**
                 * Updated date
                 * example:
                 * 2021-02-10T09:14:31.990Z
                 */
                _updated_at: string; // date-time
                /**
                 * Message ID which is from email provider. If you provide `message-id`, API overrides by its own value.
                 * example:
                 * <0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com>
                 */
                message_id?: string;
                /**
                 * User ID of user sends the message.
                 * example:
                 * 206801
                 */
                sender?: string;
                /**
                 * Subject
                 * example:
                 * Request for solar panel price
                 */
                subject: string;
                /**
                 * HTML body
                 * example:
                 * <div>We at ABC GmbH would like to request a price quote for the solar panel.</div>
                 */
                html?: string;
                /**
                 * Text body
                 * example:
                 * We at ABC GmbH would like to request a price quote for the solar panel.
                 */
                text?: string;
                from: Components.Schemas.Address;
                reply_to?: Components.Schemas.Address;
                /**
                 * To email addresses
                 */
                to?: Components.Schemas.Address[];
                /**
                 * Cc email addresses
                 */
                cc?: Components.Schemas.Address[];
                /**
                 * Bcc email addresses
                 */
                bcc?: Components.Schemas.Address[];
                file?: /* Message attachments */ Components.Schemas.AttachmentsRelation;
                /**
                 * References header. Value is the series of `message_id` which is reparated by space to indicate that message has parent.            The last message ID in references identifies the parent. The first message ID in references identifies the first message in the thread.            The basic idea is that sender should copy `references` from the parent and append the parent's `message_id` when replying.
                 *
                 * example:
                 * <0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>
                 */
                references?: string;
                /**
                 * In-Reply-To header. Value is the `message_id` of parent message.
                 *
                 * example:
                 * <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>
                 */
                in_reply_to?: string;
                /**
                 * User ID of user read the message.
                 * example:
                 * [
                 *   "206801",
                 *   "200109"
                 * ]
                 */
                user_read_message?: string[];
                /**
                 * Organization ID of organization read the message.
                 * example:
                 * [
                 *   "789372",
                 *   "210291"
                 * ]
                 */
                org_read_message?: string[];
                /**
                 * Sent message status. The array contains sending message status corresponding to all recipients. For more detail, check `send_status` of each recipient in `to`, `cc`, `bcc`            Reference at <https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html>
                 *
                 */
                send_status?: ("SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR")[];
                /**
                 * Message type
                 */
                type?: "SENT" | "RECEIVED";
                /**
                 * Template ID used for sending message.
                 * example:
                 * 3f34ce73-089c-4d45-a5ee-c161234e41c3
                 */
                template_id?: string;
                /**
                 * If true then html is not provided and must be downloaded using the html_download_url
                 */
                html_omitted?: boolean;
                /**
                 * HTML body download URL
                 * example:
                 * https://s3.eu-central-1.amazonaws.com/epilot-attachments/3f34ce73-089c-4d45-a5ee-c161234e41c3/3f34ce73-089c-4d45-a5ee-c161234e41c3.html
                 */
                html_download_url?: string;
            }
            export interface $403 {
            }
        }
    }
    namespace GetOutlookConnectionStatus {
        namespace Responses {
            export interface $200 {
                /**
                 * List of Outlook connections (one per tenant)
                 */
                connections: {
                    /**
                     * Current connection status:
                     * - pending_auth: Admin consent granted, waiting for user OAuth
                     * - connected: Fully connected with valid tokens
                     * - expired: Tokens expired, need to re-authenticate
                     *
                     */
                    status: "connected" | "expired" | "pending_auth";
                    /**
                     * Action for UI to take (all call GET /outlook/connect):
                     * - connect: No connection, initiate OAuth
                     * - authorize: Admin consent done, complete OAuth
                     * - reconnect: Re-authenticate expired session
                     * - none: Fully connected, no action needed
                     *
                     */
                    action: "connect" | "authorize" | "reconnect" | "none";
                    /**
                     * Display name of user who connected
                     */
                    connected_by_display_name?: string;
                    /**
                     * Email of the user who connected
                     */
                    connected_by_email?: string; // email
                    /**
                     * Azure AD Object ID of user who connected
                     */
                    connected_by_user_id?: string;
                    /**
                     * When the connection was established
                     */
                    connected_at?: string; // date-time
                    /**
                     * When the connection was last updated
                     */
                    updated_at?: string; // date-time
                    /**
                     * Microsoft Azure AD tenant ID
                     */
                    tenant_id: string;
                    /**
                     * Granted permission scopes
                     */
                    scopes?: string[];
                    /**
                     * When the current access token expires
                     */
                    expires_at?: string; // date-time
                    /**
                     * Whether the current token is still valid
                     */
                    is_token_valid?: boolean;
                }[];
                /**
                 * Whether any connections exist
                 */
                has_connections: boolean;
            }
            export interface $400 {
            }
            export interface $500 {
            }
        }
    }
    namespace GetSharedMailboxMappingById {
        namespace Parameters {
            export type SharedInboxId = string;
        }
        export interface PathParameters {
            shared_inbox_id: Parameters.SharedInboxId;
        }
        namespace Responses {
            export type $200 = /**
             * Mapping between a shared inbox and its Outlook shared mailbox.
             * This tracks which provider/tenant provisions each shared mailbox.
             *
             */
            Components.Schemas.SharedMailboxMapping;
            export interface $400 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace GetSharedMailboxMappings {
        namespace Responses {
            export interface $200 {
                mappings: /**
                 * Mapping between a shared inbox and its Outlook shared mailbox.
                 * This tracks which provider/tenant provisions each shared mailbox.
                 *
                 */
                Components.Schemas.SharedMailboxMapping[];
                /**
                 * Number of mappings
                 */
                count: number;
            }
            export interface $400 {
            }
            export interface $500 {
            }
        }
    }
    namespace GetThreadTimeline {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ThreadTimeline;
            export interface $403 {
            }
        }
    }
    namespace GetUnread {
        namespace Parameters {
            export type Actor = "organization" | "user";
            export type EmailFilter = string[] | string;
        }
        export interface PathParameters {
            actor: Parameters.Actor;
        }
        export interface QueryParameters {
            email_filter?: Parameters.EmailFilter;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Total of unread messages
                 * example:
                 * 14
                 */
                count: number;
                /**
                 * Total of unread messages
                 * example:
                 * 0
                 */
                unread?: number;
                /**
                 * Total of drafts messages
                 * example:
                 * 12
                 */
                drafts?: number;
                /**
                 * Total of unassigned messages
                 * example:
                 * 1
                 */
                unassigned?: number;
            }
            export interface $403 {
            }
        }
    }
    namespace MarkReadMessage {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace MarkReadMessageV2 {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ReadMessagePayload;
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace MarkReadThread {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace MarkReadThreadV2 {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ReadMessagePayload;
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace MarkThreadAsDone {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $400 {
            }
        }
    }
    namespace MarkThreadAsOpen {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $400 {
            }
        }
    }
    namespace MarkUnreadMessage {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace MarkUnreadMessageV2 {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ReadMessagePayload;
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace MarkUnreadThread {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace MarkUnreadThreadV2 {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ReadMessagePayload;
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace MoveThread {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.MoveThreadPayload;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.Conflict;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace OutlookOAuthCallback {
        namespace Parameters {
            export type AdminConsent = string;
            export type ClientInfo = string;
            export type Code = string;
            export type Error = string;
            export type ErrorDescription = string;
            export type ErrorSubcode = string;
            export type ErrorUri = string;
            export type SessionState = string;
            export type State = string;
            export type Tenant = string;
        }
        export interface QueryParameters {
            code?: Parameters.Code;
            state: Parameters.State;
            session_state?: Parameters.SessionState;
            error?: Parameters.Error;
            error_description?: Parameters.ErrorDescription;
            error_subcode?: Parameters.ErrorSubcode;
            client_info?: Parameters.ClientInfo;
            error_uri?: Parameters.ErrorUri;
            admin_consent?: Parameters.AdminConsent;
            tenant?: Parameters.Tenant;
        }
        namespace Responses {
            export interface $200 {
                connected?: boolean;
                expires_at?: string; // date-time
                scope?: string;
            }
        }
    }
    namespace PinThread {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $400 {
            }
            export interface $404 {
            }
            export interface $409 {
            }
            export interface $500 {
            }
        }
    }
    namespace SearchIds {
        export type RequestBody = Components.Schemas.SearchIDParams;
        namespace Responses {
            export interface $200 {
                /**
                 * Total of matched threads
                 * example:
                 * 14
                 */
                hits: number;
                /**
                 * Matched threads ids
                 */
                results: string[];
            }
            export interface $403 {
            }
        }
    }
    namespace SearchMessages {
        export type RequestBody = Components.Schemas.SearchParamsV2;
        namespace Responses {
            export interface $200 {
                /**
                 * Total of matched messages
                 * example:
                 * 14
                 */
                hits: number;
                /**
                 * Matched messages
                 */
                results: {
                    /**
                     * Entity ID
                     * example:
                     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
                     */
                    _id: string;
                    /**
                     * Entity title
                     */
                    _title: string;
                    /**
                     * Organization ID the entity belongs to
                     * example:
                     * 206801
                     */
                    _org: string;
                    /**
                     * URL-friendly identifier for the entity schema
                     * example:
                     * message
                     */
                    _schema: string;
                    /**
                     * Entity tags
                     * example:
                     * [
                     *   "pricing",
                     *   "INBOX"
                     * ]
                     */
                    _tags?: string[];
                    /**
                     * Created date
                     * example:
                     * 2021-02-09T12:41:43.662Z
                     */
                    _created_at: string; // date-time
                    /**
                     * Updated date
                     * example:
                     * 2021-02-10T09:14:31.990Z
                     */
                    _updated_at: string; // date-time
                    /**
                     * Message ID which is from email provider. If you provide `message-id`, API overrides by its own value.
                     * example:
                     * <0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com>
                     */
                    message_id?: string;
                    /**
                     * User ID of user sends the message.
                     * example:
                     * 206801
                     */
                    sender?: string;
                    /**
                     * Subject
                     * example:
                     * Request for solar panel price
                     */
                    subject: string;
                    /**
                     * HTML body
                     * example:
                     * <div>We at ABC GmbH would like to request a price quote for the solar panel.</div>
                     */
                    html?: string;
                    /**
                     * Text body
                     * example:
                     * We at ABC GmbH would like to request a price quote for the solar panel.
                     */
                    text?: string;
                    from: Components.Schemas.Address;
                    reply_to?: Components.Schemas.Address;
                    /**
                     * To email addresses
                     */
                    to?: Components.Schemas.Address[];
                    /**
                     * Cc email addresses
                     */
                    cc?: Components.Schemas.Address[];
                    /**
                     * Bcc email addresses
                     */
                    bcc?: Components.Schemas.Address[];
                    file?: /* Message attachments */ Components.Schemas.AttachmentsRelation;
                    /**
                     * References header. Value is the series of `message_id` which is reparated by space to indicate that message has parent.            The last message ID in references identifies the parent. The first message ID in references identifies the first message in the thread.            The basic idea is that sender should copy `references` from the parent and append the parent's `message_id` when replying.
                     *
                     * example:
                     * <0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>
                     */
                    references?: string;
                    /**
                     * In-Reply-To header. Value is the `message_id` of parent message.
                     *
                     * example:
                     * <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>
                     */
                    in_reply_to?: string;
                    /**
                     * User ID of user read the message.
                     * example:
                     * [
                     *   "206801",
                     *   "200109"
                     * ]
                     */
                    user_read_message?: string[];
                    /**
                     * Organization ID of organization read the message.
                     * example:
                     * [
                     *   "789372",
                     *   "210291"
                     * ]
                     */
                    org_read_message?: string[];
                    /**
                     * Sent message status. The array contains sending message status corresponding to all recipients. For more detail, check `send_status` of each recipient in `to`, `cc`, `bcc`            Reference at <https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html>
                     *
                     */
                    send_status?: ("SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR")[];
                    /**
                     * Message type
                     */
                    type?: "SENT" | "RECEIVED";
                    /**
                     * Template ID used for sending message.
                     * example:
                     * 3f34ce73-089c-4d45-a5ee-c161234e41c3
                     */
                    template_id?: string;
                }[];
            }
            export interface $403 {
            }
        }
    }
    namespace SearchThreads {
        export type RequestBody = Components.Schemas.SearchParams;
        namespace Responses {
            export interface $200 {
                /**
                 * Total of matched threads
                 * example:
                 * 14
                 */
                hits: number;
                /**
                 * Matched threads
                 */
                results: {
                    /**
                     * Entity ID
                     * example:
                     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
                     */
                    _id: string;
                    /**
                     * Entity title
                     */
                    _title: string;
                    /**
                     * Organization ID the entity belongs to
                     * example:
                     * 206801
                     */
                    _org: string;
                    /**
                     * URL-friendly identifier for the entity schema
                     * example:
                     * message
                     */
                    _schema: string;
                    /**
                     * Entity tags
                     * example:
                     * [
                     *   "pricing",
                     *   "INBOX"
                     * ]
                     */
                    _tags?: string[];
                    /**
                     * Created date
                     * example:
                     * 2021-02-09T12:41:43.662Z
                     */
                    _created_at: string; // date-time
                    /**
                     * Updated date
                     * example:
                     * 2021-02-10T09:14:31.990Z
                     */
                    _updated_at: string; // date-time
                    /**
                     * Message topic (e.g. which service sends the message or message category)
                     * example:
                     * CUSTOMER_MESSAGE
                     */
                    topic: string;
                    /**
                     * User ID of who the message is assigned to. Default is the user who sends message.
                     * example:
                     * [
                     *   "206801",
                     *   "200109"
                     * ]
                     */
                    assigned_to?: string[];
                    /**
                     * Organization ID of organization read the message.
                     * example:
                     * [
                     *   "789372",
                     *   "210291"
                     * ]
                     */
                    org_read_message?: string[];
                    /**
                     * Whether the thread is marked as Done
                     * example:
                     * false
                     */
                    done?: boolean;
                    latest_message?: Components.Schemas.Message;
                    latest_trash_message?: Components.Schemas.Message;
                    /**
                     * The date of the latest message time in the thread
                     * example:
                     * 2024-02-10T09:14:31.990Z
                     */
                    latest_message_at?: string;
                }[];
            }
            export interface $403 {
            }
        }
    }
    namespace SearchThreadsV2 {
        export type RequestBody = Components.Schemas.SearchParamsV2;
        namespace Responses {
            export interface $200 {
                /**
                 * Total of matched threads
                 * example:
                 * 14
                 */
                hits: number;
                /**
                 * Matched threads
                 */
                results: {
                    /**
                     * Entity ID
                     * example:
                     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
                     */
                    _id: string;
                    /**
                     * Entity title
                     */
                    _title: string;
                    /**
                     * Organization ID the entity belongs to
                     * example:
                     * 206801
                     */
                    _org: string;
                    /**
                     * URL-friendly identifier for the entity schema
                     * example:
                     * message
                     */
                    _schema: string;
                    /**
                     * Entity tags
                     * example:
                     * [
                     *   "pricing",
                     *   "INBOX"
                     * ]
                     */
                    _tags?: string[];
                    /**
                     * Created date
                     * example:
                     * 2021-02-09T12:41:43.662Z
                     */
                    _created_at: string; // date-time
                    /**
                     * Updated date
                     * example:
                     * 2021-02-10T09:14:31.990Z
                     */
                    _updated_at: string; // date-time
                    /**
                     * Message topic (e.g. which service sends the message or message category)
                     * example:
                     * CUSTOMER_MESSAGE
                     */
                    topic: string;
                    /**
                     * User ID of who the message is assigned to. Default is the user who sends message.
                     * example:
                     * [
                     *   "206801",
                     *   "200109"
                     * ]
                     */
                    assigned_to?: string[];
                    /**
                     * Organization ID of organization read the message.
                     * example:
                     * [
                     *   "789372",
                     *   "210291"
                     * ]
                     */
                    org_read_message?: string[];
                    /**
                     * Whether the thread is marked as Done
                     * example:
                     * false
                     */
                    done?: boolean;
                    latest_message?: Components.Schemas.Message;
                    latest_trash_message?: Components.Schemas.Message;
                    /**
                     * The date of the latest message time in the thread
                     * example:
                     * 2024-02-10T09:14:31.990Z
                     */
                    latest_message_at?: string;
                }[];
            }
            export interface $403 {
            }
        }
    }
    namespace SendDraft {
        namespace Responses {
            export interface $201 {
                /**
                 * Entity ID
                 * example:
                 * 3fa85f64-5717-4562-b3fc-2c963f66afa6
                 */
                _id: string;
                /**
                 * Entity title
                 */
                _title: string;
                /**
                 * Organization ID the entity belongs to
                 * example:
                 * 206801
                 */
                _org: string;
                /**
                 * URL-friendly identifier for the entity schema
                 * example:
                 * message
                 */
                _schema: string;
                /**
                 * Entity tags
                 * example:
                 * [
                 *   "pricing",
                 *   "INBOX"
                 * ]
                 */
                _tags?: string[];
                /**
                 * Created date
                 * example:
                 * 2021-02-09T12:41:43.662Z
                 */
                _created_at: string; // date-time
                /**
                 * Updated date
                 * example:
                 * 2021-02-10T09:14:31.990Z
                 */
                _updated_at: string; // date-time
                /**
                 * Message ID which is from email provider. If you provide `message-id`, API overrides by its own value.
                 * example:
                 * <0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com>
                 */
                message_id?: string;
                /**
                 * User ID of user sends the message.
                 * example:
                 * 206801
                 */
                sender?: string;
                /**
                 * Subject
                 * example:
                 * Request for solar panel price
                 */
                subject: string;
                /**
                 * HTML body
                 * example:
                 * <div>We at ABC GmbH would like to request a price quote for the solar panel.</div>
                 */
                html?: string;
                /**
                 * Text body
                 * example:
                 * We at ABC GmbH would like to request a price quote for the solar panel.
                 */
                text?: string;
                from: Components.Schemas.Address;
                reply_to?: Components.Schemas.Address;
                /**
                 * To email addresses
                 */
                to?: Components.Schemas.Address[];
                /**
                 * Cc email addresses
                 */
                cc?: Components.Schemas.Address[];
                /**
                 * Bcc email addresses
                 */
                bcc?: Components.Schemas.Address[];
                file?: /* Message attachments */ Components.Schemas.AttachmentsRelation;
                /**
                 * References header. Value is the series of `message_id` which is reparated by space to indicate that message has parent.            The last message ID in references identifies the parent. The first message ID in references identifies the first message in the thread.            The basic idea is that sender should copy `references` from the parent and append the parent's `message_id` when replying.
                 *
                 * example:
                 * <0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>
                 */
                references?: string;
                /**
                 * In-Reply-To header. Value is the `message_id` of parent message.
                 *
                 * example:
                 * <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>
                 */
                in_reply_to?: string;
                /**
                 * User ID of user read the message.
                 * example:
                 * [
                 *   "206801",
                 *   "200109"
                 * ]
                 */
                user_read_message?: string[];
                /**
                 * Organization ID of organization read the message.
                 * example:
                 * [
                 *   "789372",
                 *   "210291"
                 * ]
                 */
                org_read_message?: string[];
                /**
                 * Sent message status. The array contains sending message status corresponding to all recipients. For more detail, check `send_status` of each recipient in `to`, `cc`, `bcc`            Reference at <https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html>
                 *
                 */
                send_status?: ("SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR")[];
                /**
                 * Message type
                 */
                type?: "SENT" | "RECEIVED";
                /**
                 * Template ID used for sending message.
                 * example:
                 * 3f34ce73-089c-4d45-a5ee-c161234e41c3
                 */
                template_id?: string;
            }
            export interface $403 {
            }
        }
    }
    namespace SendMessage {
        namespace Parameters {
            export type DoNotCreateEntities = boolean;
        }
        export interface QueryParameters {
            do_not_create_entities?: Parameters.DoNotCreateEntities;
        }
        export type RequestBody = Components.Schemas.MessageRequestParams;
        namespace Responses {
            export type $201 = Components.Schemas.MessageRequestParams;
            export interface $403 {
            }
        }
    }
    namespace ThreadBulkActionsDelete {
        export type RequestBody = Components.Schemas.BulkActionsPayload;
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace ThreadBulkActionsDone {
        export type RequestBody = Components.Schemas.BulkActionsPayload;
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace ThreadBulkActionsFavorite {
        export type RequestBody = Components.Schemas.BulkActionsPayload;
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace ThreadBulkActionsOpen {
        export type RequestBody = Components.Schemas.BulkActionsPayload;
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace ThreadBulkActionsRead {
        export type RequestBody = Components.Schemas.BulkActionsPayloadWithScopes;
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace ThreadBulkActionsTrash {
        export type RequestBody = Components.Schemas.BulkActionsPayload;
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace ThreadBulkActionsUnfavorite {
        export type RequestBody = Components.Schemas.BulkActionsPayload;
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace ThreadBulkActionsUnread {
        export type RequestBody = Components.Schemas.BulkActionsPayloadWithScopes;
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace ThreadBulkActionsUntrash {
        export type RequestBody = Components.Schemas.BulkActionsPayload;
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace TrashMessage {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace TrashThread {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace UnassignThread {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        /**
         * Entities which thread is unassigned from
         */
        export type RequestBody = {
            /**
             * Entity slug
             * example:
             * contact
             */
            slug?: string;
            /**
             * Entity ID
             * example:
             * 3f34ce73-089c-4d45-a5ee-c161234e41c3
             */
            entity_id?: string;
        }[];
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace UnpinThread {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $400 {
            }
            export interface $404 {
            }
            export interface $409 {
            }
            export interface $500 {
            }
        }
    }
    namespace UntrashMessage {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace UntrashThread {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
    namespace UpdateMessage {
        namespace Responses {
            export interface $201 {
                /**
                 * Entity ID
                 * example:
                 * 3fa85f64-5717-4562-b3fc-2c963f66afa6
                 */
                _id: string;
                /**
                 * Entity title
                 */
                _title: string;
                /**
                 * Organization ID the entity belongs to
                 * example:
                 * 206801
                 */
                _org: string;
                /**
                 * URL-friendly identifier for the entity schema
                 * example:
                 * message
                 */
                _schema: string;
                /**
                 * Entity tags
                 * example:
                 * [
                 *   "pricing",
                 *   "INBOX"
                 * ]
                 */
                _tags?: string[];
                /**
                 * Created date
                 * example:
                 * 2021-02-09T12:41:43.662Z
                 */
                _created_at: string; // date-time
                /**
                 * Updated date
                 * example:
                 * 2021-02-10T09:14:31.990Z
                 */
                _updated_at: string; // date-time
                /**
                 * Message ID which is from email provider. If you provide `message-id`, API overrides by its own value.
                 * example:
                 * <0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com>
                 */
                message_id?: string;
                /**
                 * User ID of user sends the message.
                 * example:
                 * 206801
                 */
                sender?: string;
                /**
                 * Subject
                 * example:
                 * Request for solar panel price
                 */
                subject: string;
                /**
                 * HTML body
                 * example:
                 * <div>We at ABC GmbH would like to request a price quote for the solar panel.</div>
                 */
                html?: string;
                /**
                 * Text body
                 * example:
                 * We at ABC GmbH would like to request a price quote for the solar panel.
                 */
                text?: string;
                from: Components.Schemas.Address;
                reply_to?: Components.Schemas.Address;
                /**
                 * To email addresses
                 */
                to?: Components.Schemas.Address[];
                /**
                 * Cc email addresses
                 */
                cc?: Components.Schemas.Address[];
                /**
                 * Bcc email addresses
                 */
                bcc?: Components.Schemas.Address[];
                file?: /* Message attachments */ Components.Schemas.AttachmentsRelation;
                /**
                 * References header. Value is the series of `message_id` which is reparated by space to indicate that message has parent.            The last message ID in references identifies the parent. The first message ID in references identifies the first message in the thread.            The basic idea is that sender should copy `references` from the parent and append the parent's `message_id` when replying.
                 *
                 * example:
                 * <0102017b97a502f8-a67f01c2-68cc-4928-b91b-45853f34e259-000000@eu-west-1.amazonses.com> <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>
                 */
                references?: string;
                /**
                 * In-Reply-To header. Value is the `message_id` of parent message.
                 *
                 * example:
                 * <CALHgQpziyxW9NaFUs+nRMykzr6Ljq6vjq4WO9SaihAuMasuDyg@mail.gmail.com>
                 */
                in_reply_to?: string;
                /**
                 * User ID of user read the message.
                 * example:
                 * [
                 *   "206801",
                 *   "200109"
                 * ]
                 */
                user_read_message?: string[];
                /**
                 * Organization ID of organization read the message.
                 * example:
                 * [
                 *   "789372",
                 *   "210291"
                 * ]
                 */
                org_read_message?: string[];
                /**
                 * Sent message status. The array contains sending message status corresponding to all recipients. For more detail, check `send_status` of each recipient in `to`, `cc`, `bcc`            Reference at <https://docs.aws.amazon.com/ses/latest/DeveloperGuide/monitor-sending-activity.html>
                 *
                 */
                send_status?: ("SEND" | "DELIVERY" | "REJECT" | "COMPLAINT" | "BOUNCE" | "ERROR")[];
                /**
                 * Message type
                 */
                type?: "SENT" | "RECEIVED";
                /**
                 * Template ID used for sending message.
                 * example:
                 * 3f34ce73-089c-4d45-a5ee-c161234e41c3
                 */
                template_id?: string;
            }
            export interface $403 {
            }
        }
    }
    namespace UpdateThread {
        namespace Responses {
            /**
             * Thread properties depend on API caller as it's not pre-defined. We do recommend having at least `topic` property for categorizing.
             */
            export interface $201 {
                /**
                 * Entity ID
                 * example:
                 * 3fa85f64-5717-4562-b3fc-2c963f66afa6
                 */
                _id: string;
                /**
                 * Entity title
                 */
                _title: string;
                /**
                 * Organization ID the entity belongs to
                 * example:
                 * 206801
                 */
                _org: string;
                /**
                 * URL-friendly identifier for the entity schema
                 * example:
                 * message
                 */
                _schema: string;
                /**
                 * Entity tags
                 * example:
                 * [
                 *   "pricing",
                 *   "INBOX"
                 * ]
                 */
                _tags?: string[];
                /**
                 * Created date
                 * example:
                 * 2021-02-09T12:41:43.662Z
                 */
                _created_at: string; // date-time
                /**
                 * Updated date
                 * example:
                 * 2021-02-10T09:14:31.990Z
                 */
                _updated_at: string; // date-time
                /**
                 * Message topic (e.g. which service sends the message or message category)
                 * example:
                 * CUSTOMER_MESSAGE
                 */
                topic: string;
                /**
                 * User ID of who the message is assigned to. Default is the user who sends message.
                 * example:
                 * [
                 *   "206801",
                 *   "200109"
                 * ]
                 */
                assigned_to?: string[];
                /**
                 * Organization ID of organization read the message.
                 * example:
                 * [
                 *   "789372",
                 *   "210291"
                 * ]
                 */
                org_read_message?: string[];
                /**
                 * Whether the thread is marked as Done
                 * example:
                 * false
                 */
                done?: boolean;
                latest_message?: Components.Schemas.Message;
                latest_trash_message?: Components.Schemas.Message;
                /**
                 * The date of the latest message time in the thread
                 * example:
                 * 2024-02-10T09:14:31.990Z
                 */
                latest_message_at?: string;
            }
            export interface $403 {
            }
        }
    }
}


export interface OperationMethods {
  /**
   * updateMessage - updateMessage
   * 
   * Update message metadata
   */
  'updateMessage'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateMessage.Responses.$201>
  /**
   * sendMessage - sendMessage
   * 
   * Send an email message
   */
  'sendMessage'(
    parameters?: Parameters<Paths.SendMessage.QueryParameters> | null,
    data?: Paths.SendMessage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SendMessage.Responses.$201>
  /**
   * connectOutlook - Connect Outlook
   * 
   * Returns Microsoft authorization URL for Outlook OAuth.
   */
  'connectOutlook'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConnectOutlook.Responses.$200>
  /**
   * getOutlookConnectionStatus - Get Outlook Connection Status
   * 
   * Returns all Microsoft 365 / Outlook connections for the organization.
   * Supports multiple connections (one per Azure AD tenant).
   * 
   * Each connection includes an `action` field that tells the UI what button to show
   * and what endpoint to call. All actions use GET /outlook/connect.
   * 
   */
  'getOutlookConnectionStatus'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOutlookConnectionStatus.Responses.$200>
  /**
   * disconnectOutlook - Disconnect Outlook
   * 
   * Removes the Microsoft 365 / Outlook connection for a specific tenant.
   * This deletes the stored tokens and disconnects the integration.
   * 
   */
  'disconnectOutlook'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DisconnectOutlook.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DisconnectOutlook.Responses.$200>
  /**
   * connectSharedMailbox - Connect Outlook Shared Mailbox
   * 
   * Connects an Outlook shared mailbox as a shared inbox.
   * 1. Validates the user has access to the shared mailbox via Microsoft Graph API
   * 2. Creates a shared inbox entry in email-settings with the Outlook provider info
   * 
   */
  'connectSharedMailbox'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ConnectSharedMailbox.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ConnectSharedMailbox.Responses.$201>
  /**
   * getSharedMailboxMappings - Get Shared Mailbox Mappings
   * 
   * Returns all shared mailbox mappings for the organization.
   * Useful to determine which shared inboxes are connected to Outlook
   * and which tenant provisions each one.
   * 
   */
  'getSharedMailboxMappings'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSharedMailboxMappings.Responses.$200>
  /**
   * getSharedMailboxMappingById - Get Shared Mailbox Mapping by ID
   * 
   * Returns the mapping for a specific shared inbox.
   * Useful to check if a specific inbox is connected to Outlook.
   * 
   */
  'getSharedMailboxMappingById'(
    parameters?: Parameters<Paths.GetSharedMailboxMappingById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSharedMailboxMappingById.Responses.$200>
  /**
   * outlookOAuthCallback - Outlook OAuth callback
   * 
   * Exchanges authorization code for tokens and stores them.
   */
  'outlookOAuthCallback'(
    parameters?: Parameters<Paths.OutlookOAuthCallback.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.OutlookOAuthCallback.Responses.$200>
  /**
   * getMessage - getMessage
   * 
   * Get an email message by id
   */
  'getMessage'(
    parameters?: Parameters<Paths.GetMessage.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMessage.Responses.$200>
  /**
   * deleteMessage - deleteMessage
   * 
   * Immediately and permanently delete a message. This operation cannot be undone.
   */
  'deleteMessage'(
    parameters?: Parameters<Paths.DeleteMessage.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteMessage.Responses.$204>
  /**
   * searchMessages - searchMessages
   * 
   * Search Messages
   */
  'searchMessages'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchMessages.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchMessages.Responses.$200>
  /**
   * trashMessage - trashMessage
   * 
   * Move a message to the trash
   */
  'trashMessage'(
    parameters?: Parameters<Paths.TrashMessage.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TrashMessage.Responses.$204>
  /**
   * untrashMessage - untrashMessage
   * 
   * Restore a trashed message
   */
  'untrashMessage'(
    parameters?: Parameters<Paths.UntrashMessage.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UntrashMessage.Responses.$204>
  /**
   * markReadMessage - markReadMessage
   * 
   * Mark message as read
   */
  'markReadMessage'(
    parameters?: Parameters<Paths.MarkReadMessage.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MarkReadMessage.Responses.$204>
  /**
   * markReadMessageV2 - markReadMessageV2
   * 
   * Mark message as read within a scope
   */
  'markReadMessageV2'(
    parameters?: Parameters<Paths.MarkReadMessageV2.PathParameters> | null,
    data?: Paths.MarkReadMessageV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MarkReadMessageV2.Responses.$204>
  /**
   * markUnreadMessage - markUnreadMessage
   * 
   * Mark message as unread
   */
  'markUnreadMessage'(
    parameters?: Parameters<Paths.MarkUnreadMessage.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MarkUnreadMessage.Responses.$204>
  /**
   * getUnread - getUnread
   * 
   * Get all unread messages by actor
   */
  'getUnread'(
    parameters?: Parameters<Paths.GetUnread.QueryParameters & Paths.GetUnread.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUnread.Responses.$200>
  /**
   * markUnreadMessageV2 - markUnreadMessageV2
   * 
   * Mark message as unread within a scope
   */
  'markUnreadMessageV2'(
    parameters?: Parameters<Paths.MarkUnreadMessageV2.PathParameters> | null,
    data?: Paths.MarkUnreadMessageV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MarkUnreadMessageV2.Responses.$204>
  /**
   * searchThreads - searchThreads
   * 
   * Search for threads of email messages.
   * 
   * Messages with no replies yet are treated as threads with single message.
   * 
   * Lucene syntax supported.
   * 
   */
  'searchThreads'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchThreads.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchThreads.Responses.$200>
  /**
   * searchThreadsV2 - searchThreadsV2
   * 
   * Search for threads of email messages.
   * 
   * Messages with no replies yet are treated as threads with single message.
   * 
   * Lucene syntax supported.
   * 
   */
  'searchThreadsV2'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchThreadsV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchThreadsV2.Responses.$200>
  /**
   * searchIds - Search threads and return all id's
   * 
   * Return all thread id's that match a criteria
   * 
   * Lucene syntax supported.
   * 
   */
  'searchIds'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchIds.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchIds.Responses.$200>
  /**
   * updateThread - updateThread
   * 
   * Modify thread metadata
   */
  'updateThread'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateThread.Responses.$201>
  /**
   * deleteThread - deleteThread
   * 
   * Immediately and permanently delete a thread. This operation cannot be undone.
   */
  'deleteThread'(
    parameters?: Parameters<Paths.DeleteThread.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteThread.Responses.$204>
  /**
   * moveThread - moveThread
   * 
   * Move thread to a different Inbox
   */
  'moveThread'(
    parameters?: Parameters<Paths.MoveThread.PathParameters> | null,
    data?: Paths.MoveThread.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MoveThread.Responses.$204>
  /**
   * markThreadAsDone - markThreadAsDone
   * 
   * Mark thread as done
   */
  'markThreadAsDone'(
    parameters?: Parameters<Paths.MarkThreadAsDone.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MarkThreadAsDone.Responses.$204>
  /**
   * markThreadAsOpen - markThreadAsOpen
   * 
   * Mark thread as open
   */
  'markThreadAsOpen'(
    parameters?: Parameters<Paths.MarkThreadAsOpen.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MarkThreadAsOpen.Responses.$204>
  /**
   * getThreadTimeline - getThreadTimeline
   * 
   * Get thread timeline
   */
  'getThreadTimeline'(
    parameters?: Parameters<Paths.GetThreadTimeline.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetThreadTimeline.Responses.$200>
  /**
   * trashThread - trashThread
   * 
   * Move a thread to trash
   */
  'trashThread'(
    parameters?: Parameters<Paths.TrashThread.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TrashThread.Responses.$200>
  /**
   * untrashThread - untrashThread
   * 
   * Restore a trashed thread
   */
  'untrashThread'(
    parameters?: Parameters<Paths.UntrashThread.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UntrashThread.Responses.$200>
  /**
   * threadBulkActionsRead - threadBulkActionsRead
   * 
   * Perform a bulk action of marking an array of thread ids as read
   */
  'threadBulkActionsRead'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ThreadBulkActionsRead.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ThreadBulkActionsRead.Responses.$200>
  /**
   * threadBulkActionsUnread - threadBulkActionsUnread
   * 
   * Perform a bulk action of marking an array of thread ids as unread
   */
  'threadBulkActionsUnread'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ThreadBulkActionsUnread.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ThreadBulkActionsUnread.Responses.$200>
  /**
   * threadBulkActionsFavorite - threadBulkActionsFavorite
   * 
   * Perform a bulk action of marking an array of thread ids favorite
   */
  'threadBulkActionsFavorite'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ThreadBulkActionsFavorite.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ThreadBulkActionsFavorite.Responses.$200>
  /**
   * threadBulkActionsUnfavorite - threadBulkActionsUnfavorite
   * 
   * Perform a bulk action of marking an array of thread ids unfavorited
   */
  'threadBulkActionsUnfavorite'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ThreadBulkActionsUnfavorite.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ThreadBulkActionsUnfavorite.Responses.$200>
  /**
   * threadBulkActionsTrash - threadBulkActionsTrash
   * 
   * Perform a bulk action of trashing an array of threads
   */
  'threadBulkActionsTrash'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ThreadBulkActionsTrash.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ThreadBulkActionsTrash.Responses.$200>
  /**
   * threadBulkActionsUntrash - threadBulkActionsUntrash
   * 
   * Perform a bulk action of untrashing an array of threads
   */
  'threadBulkActionsUntrash'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ThreadBulkActionsUntrash.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ThreadBulkActionsUntrash.Responses.$200>
  /**
   * threadBulkActionsDelete - threadBulkActionsDelete
   * 
   * Performs a bulk permanent delete for all threads
   */
  'threadBulkActionsDelete'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ThreadBulkActionsDelete.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ThreadBulkActionsDelete.Responses.$200>
  /**
   * threadBulkActionsDone - threadBulkActionsDone
   * 
   * Perform a bulk action of marking an array of threads as done
   */
  'threadBulkActionsDone'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ThreadBulkActionsDone.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ThreadBulkActionsDone.Responses.$200>
  /**
   * threadBulkActionsOpen - threadBulkActionsOpen
   * 
   * Perform a bulk action of marking an array of threads as open
   */
  'threadBulkActionsOpen'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ThreadBulkActionsOpen.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ThreadBulkActionsOpen.Responses.$200>
  /**
   * markReadThread - markReadThread
   * 
   * Mark thread as read
   */
  'markReadThread'(
    parameters?: Parameters<Paths.MarkReadThread.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MarkReadThread.Responses.$200>
  /**
   * markReadThreadV2 - markReadThreadV2
   * 
   * Mark thread as read within a scope
   */
  'markReadThreadV2'(
    parameters?: Parameters<Paths.MarkReadThreadV2.PathParameters> | null,
    data?: Paths.MarkReadThreadV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MarkReadThreadV2.Responses.$200>
  /**
   * markUnreadThread - markUnreadThread
   * 
   * Mark thread as unread
   */
  'markUnreadThread'(
    parameters?: Parameters<Paths.MarkUnreadThread.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MarkUnreadThread.Responses.$200>
  /**
   * markUnreadThreadV2 - markUnreadThreadV2
   * 
   * Mark thread as unread within a scope
   */
  'markUnreadThreadV2'(
    parameters?: Parameters<Paths.MarkUnreadThreadV2.PathParameters> | null,
    data?: Paths.MarkUnreadThreadV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MarkUnreadThreadV2.Responses.$200>
  /**
   * assignThread - assignThread
   * 
   * Assign thread to entities
   */
  'assignThread'(
    parameters?: Parameters<Paths.AssignThread.PathParameters> | null,
    data?: Paths.AssignThread.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AssignThread.Responses.$204>
  /**
   * unassignThread - unassignThread
   * 
   * Unassign thread from entities
   */
  'unassignThread'(
    parameters?: Parameters<Paths.UnassignThread.PathParameters> | null,
    data?: Paths.UnassignThread.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UnassignThread.Responses.$204>
  /**
   * assignUsers - assignUsers
   * 
   * Assign users to thread for receiving notifications.
   * The operation replaces all existing assigned users in thread.
   * 
   */
  'assignUsers'(
    parameters?: Parameters<Paths.AssignUsers.PathParameters> | null,
    data?: Paths.AssignUsers.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AssignUsers.Responses.$204>
  /**
   * pinThread - Pin a single thread
   * 
   * Pin a single thread
   */
  'pinThread'(
    parameters?: Parameters<Paths.PinThread.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PinThread.Responses.$204>
  /**
   * unpinThread - Unpin a single thread
   * 
   * Unpin a single thread
   */
  'unpinThread'(
    parameters?: Parameters<Paths.UnpinThread.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UnpinThread.Responses.$204>
  /**
   * createDraft - createDraft
   * 
   * Create a new draft
   */
  'createDraft'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateDraft.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateDraft.Responses.$201>
  /**
   * sendDraft - sendDraft
   * 
   * Send the existing draft to the recipients
   */
  'sendDraft'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SendDraft.Responses.$201>
  /**
   * getMessageV2 - getMessageV2
   * 
   * - Fetches message by ID
   * - If the message html is omitted on the entity, then it keeps the content on the message as a signed url
   *   {
   *     ...
   *     _id: "4d74976d-fb64-47fd-85e2-65eea140f5eb",
   *     _schema: "message",
   *     _org: "org-123",
   *     html_omitted: true,
   *     html_download_url: "https://s3.eu-central-1.amazonaws.com/epilot-attachments/3f34ce73-089c-4d45-a5ee-c161234e41c3/3f34ce73-089c-4d45-a5ee-c161234e41c3.html"
   *   }
   * 
   */
  'getMessageV2'(
    parameters?: Parameters<Paths.GetMessageV2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMessageV2.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/message/messages']: {
    /**
     * sendMessage - sendMessage
     * 
     * Send an email message
     */
    'post'(
      parameters?: Parameters<Paths.SendMessage.QueryParameters> | null,
      data?: Paths.SendMessage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SendMessage.Responses.$201>
    /**
     * updateMessage - updateMessage
     * 
     * Update message metadata
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateMessage.Responses.$201>
  }
  ['/outlook/connect']: {
    /**
     * connectOutlook - Connect Outlook
     * 
     * Returns Microsoft authorization URL for Outlook OAuth.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConnectOutlook.Responses.$200>
  }
  ['/outlook/connection/status']: {
    /**
     * getOutlookConnectionStatus - Get Outlook Connection Status
     * 
     * Returns all Microsoft 365 / Outlook connections for the organization.
     * Supports multiple connections (one per Azure AD tenant).
     * 
     * Each connection includes an `action` field that tells the UI what button to show
     * and what endpoint to call. All actions use GET /outlook/connect.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOutlookConnectionStatus.Responses.$200>
  }
  ['/outlook/connection/disconnect']: {
    /**
     * disconnectOutlook - Disconnect Outlook
     * 
     * Removes the Microsoft 365 / Outlook connection for a specific tenant.
     * This deletes the stored tokens and disconnects the integration.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DisconnectOutlook.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DisconnectOutlook.Responses.$200>
  }
  ['/outlook/shared-mailboxes/connect']: {
    /**
     * connectSharedMailbox - Connect Outlook Shared Mailbox
     * 
     * Connects an Outlook shared mailbox as a shared inbox.
     * 1. Validates the user has access to the shared mailbox via Microsoft Graph API
     * 2. Creates a shared inbox entry in email-settings with the Outlook provider info
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ConnectSharedMailbox.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ConnectSharedMailbox.Responses.$201>
  }
  ['/outlook/shared-mailboxes/mappings']: {
    /**
     * getSharedMailboxMappings - Get Shared Mailbox Mappings
     * 
     * Returns all shared mailbox mappings for the organization.
     * Useful to determine which shared inboxes are connected to Outlook
     * and which tenant provisions each one.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSharedMailboxMappings.Responses.$200>
  }
  ['/outlook/shared-mailboxes/mappings/{shared_inbox_id}']: {
    /**
     * getSharedMailboxMappingById - Get Shared Mailbox Mapping by ID
     * 
     * Returns the mapping for a specific shared inbox.
     * Useful to check if a specific inbox is connected to Outlook.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetSharedMailboxMappingById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSharedMailboxMappingById.Responses.$200>
  }
  ['/outlook/oauth/callback']: {
    /**
     * outlookOAuthCallback - Outlook OAuth callback
     * 
     * Exchanges authorization code for tokens and stores them.
     */
    'get'(
      parameters?: Parameters<Paths.OutlookOAuthCallback.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.OutlookOAuthCallback.Responses.$200>
  }
  ['/v1/message/messages/{id}']: {
    /**
     * getMessage - getMessage
     * 
     * Get an email message by id
     */
    'get'(
      parameters?: Parameters<Paths.GetMessage.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMessage.Responses.$200>
    /**
     * deleteMessage - deleteMessage
     * 
     * Immediately and permanently delete a message. This operation cannot be undone.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteMessage.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteMessage.Responses.$204>
  }
  ['/v1/message/messages:search']: {
    /**
     * searchMessages - searchMessages
     * 
     * Search Messages
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchMessages.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchMessages.Responses.$200>
  }
  ['/v1/message/messages/{id}/trash']: {
    /**
     * trashMessage - trashMessage
     * 
     * Move a message to the trash
     */
    'post'(
      parameters?: Parameters<Paths.TrashMessage.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TrashMessage.Responses.$204>
  }
  ['/v1/message/messages/{id}/untrash']: {
    /**
     * untrashMessage - untrashMessage
     * 
     * Restore a trashed message
     */
    'post'(
      parameters?: Parameters<Paths.UntrashMessage.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UntrashMessage.Responses.$204>
  }
  ['/v1/message/messages/{id}/read']: {
    /**
     * markReadMessage - markReadMessage
     * 
     * Mark message as read
     */
    'post'(
      parameters?: Parameters<Paths.MarkReadMessage.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MarkReadMessage.Responses.$204>
  }
  ['/v2/message/messages/{id}/read']: {
    /**
     * markReadMessageV2 - markReadMessageV2
     * 
     * Mark message as read within a scope
     */
    'post'(
      parameters?: Parameters<Paths.MarkReadMessageV2.PathParameters> | null,
      data?: Paths.MarkReadMessageV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MarkReadMessageV2.Responses.$204>
  }
  ['/v1/message/messages/{id}/unread']: {
    /**
     * markUnreadMessage - markUnreadMessage
     * 
     * Mark message as unread
     */
    'post'(
      parameters?: Parameters<Paths.MarkUnreadMessage.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MarkUnreadMessage.Responses.$204>
  }
  ['/v1/message/messages/unread/{actor}']: {
    /**
     * getUnread - getUnread
     * 
     * Get all unread messages by actor
     */
    'get'(
      parameters?: Parameters<Paths.GetUnread.QueryParameters & Paths.GetUnread.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUnread.Responses.$200>
  }
  ['/v2/message/messages/{id}/unread']: {
    /**
     * markUnreadMessageV2 - markUnreadMessageV2
     * 
     * Mark message as unread within a scope
     */
    'post'(
      parameters?: Parameters<Paths.MarkUnreadMessageV2.PathParameters> | null,
      data?: Paths.MarkUnreadMessageV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MarkUnreadMessageV2.Responses.$204>
  }
  ['/v1/message/threads:search']: {
    /**
     * searchThreads - searchThreads
     * 
     * Search for threads of email messages.
     * 
     * Messages with no replies yet are treated as threads with single message.
     * 
     * Lucene syntax supported.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchThreads.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchThreads.Responses.$200>
  }
  ['/v2/message/threads:search']: {
    /**
     * searchThreadsV2 - searchThreadsV2
     * 
     * Search for threads of email messages.
     * 
     * Messages with no replies yet are treated as threads with single message.
     * 
     * Lucene syntax supported.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchThreadsV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchThreadsV2.Responses.$200>
  }
  ['/v1/message/threads:searchIds']: {
    /**
     * searchIds - Search threads and return all id's
     * 
     * Return all thread id's that match a criteria
     * 
     * Lucene syntax supported.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchIds.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchIds.Responses.$200>
  }
  ['/v1/message/threads']: {
    /**
     * updateThread - updateThread
     * 
     * Modify thread metadata
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateThread.Responses.$201>
  }
  ['/v1/message/threads/{id}']: {
    /**
     * deleteThread - deleteThread
     * 
     * Immediately and permanently delete a thread. This operation cannot be undone.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteThread.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteThread.Responses.$204>
  }
  ['/v1/message/threads/{id}:move']: {
    /**
     * moveThread - moveThread
     * 
     * Move thread to a different Inbox
     */
    'post'(
      parameters?: Parameters<Paths.MoveThread.PathParameters> | null,
      data?: Paths.MoveThread.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MoveThread.Responses.$204>
  }
  ['/v1/message/threads/{id}:markAsDone']: {
    /**
     * markThreadAsDone - markThreadAsDone
     * 
     * Mark thread as done
     */
    'post'(
      parameters?: Parameters<Paths.MarkThreadAsDone.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MarkThreadAsDone.Responses.$204>
  }
  ['/v1/message/threads/{id}:markAsOpen']: {
    /**
     * markThreadAsOpen - markThreadAsOpen
     * 
     * Mark thread as open
     */
    'post'(
      parameters?: Parameters<Paths.MarkThreadAsOpen.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MarkThreadAsOpen.Responses.$204>
  }
  ['/v1/message/threads/{id}/timeline']: {
    /**
     * getThreadTimeline - getThreadTimeline
     * 
     * Get thread timeline
     */
    'get'(
      parameters?: Parameters<Paths.GetThreadTimeline.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetThreadTimeline.Responses.$200>
  }
  ['/v1/message/threads/{id}/trash']: {
    /**
     * trashThread - trashThread
     * 
     * Move a thread to trash
     */
    'post'(
      parameters?: Parameters<Paths.TrashThread.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TrashThread.Responses.$200>
  }
  ['/v1/message/threads/{id}/untrash']: {
    /**
     * untrashThread - untrashThread
     * 
     * Restore a trashed thread
     */
    'post'(
      parameters?: Parameters<Paths.UntrashThread.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UntrashThread.Responses.$200>
  }
  ['/v1/message/threads/bulk:read']: {
    /**
     * threadBulkActionsRead - threadBulkActionsRead
     * 
     * Perform a bulk action of marking an array of thread ids as read
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ThreadBulkActionsRead.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ThreadBulkActionsRead.Responses.$200>
  }
  ['/v1/message/threads/bulk:unread']: {
    /**
     * threadBulkActionsUnread - threadBulkActionsUnread
     * 
     * Perform a bulk action of marking an array of thread ids as unread
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ThreadBulkActionsUnread.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ThreadBulkActionsUnread.Responses.$200>
  }
  ['/v1/message/threads/bulk:favorite']: {
    /**
     * threadBulkActionsFavorite - threadBulkActionsFavorite
     * 
     * Perform a bulk action of marking an array of thread ids favorite
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ThreadBulkActionsFavorite.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ThreadBulkActionsFavorite.Responses.$200>
  }
  ['/v1/message/threads/bulk:unfavorite']: {
    /**
     * threadBulkActionsUnfavorite - threadBulkActionsUnfavorite
     * 
     * Perform a bulk action of marking an array of thread ids unfavorited
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ThreadBulkActionsUnfavorite.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ThreadBulkActionsUnfavorite.Responses.$200>
  }
  ['/v1/message/threads/bulk:trash']: {
    /**
     * threadBulkActionsTrash - threadBulkActionsTrash
     * 
     * Perform a bulk action of trashing an array of threads
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ThreadBulkActionsTrash.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ThreadBulkActionsTrash.Responses.$200>
  }
  ['/v1/message/threads/bulk:untrash']: {
    /**
     * threadBulkActionsUntrash - threadBulkActionsUntrash
     * 
     * Perform a bulk action of untrashing an array of threads
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ThreadBulkActionsUntrash.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ThreadBulkActionsUntrash.Responses.$200>
  }
  ['/v1/message/threads/bulk:delete']: {
    /**
     * threadBulkActionsDelete - threadBulkActionsDelete
     * 
     * Performs a bulk permanent delete for all threads
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ThreadBulkActionsDelete.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ThreadBulkActionsDelete.Responses.$200>
  }
  ['/v1/message/threads/bulk:done']: {
    /**
     * threadBulkActionsDone - threadBulkActionsDone
     * 
     * Perform a bulk action of marking an array of threads as done
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ThreadBulkActionsDone.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ThreadBulkActionsDone.Responses.$200>
  }
  ['/v1/message/threads/bulk:open']: {
    /**
     * threadBulkActionsOpen - threadBulkActionsOpen
     * 
     * Perform a bulk action of marking an array of threads as open
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ThreadBulkActionsOpen.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ThreadBulkActionsOpen.Responses.$200>
  }
  ['/v1/message/threads/{id}/read']: {
    /**
     * markReadThread - markReadThread
     * 
     * Mark thread as read
     */
    'post'(
      parameters?: Parameters<Paths.MarkReadThread.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MarkReadThread.Responses.$200>
  }
  ['/v2/message/threads/{id}/read']: {
    /**
     * markReadThreadV2 - markReadThreadV2
     * 
     * Mark thread as read within a scope
     */
    'post'(
      parameters?: Parameters<Paths.MarkReadThreadV2.PathParameters> | null,
      data?: Paths.MarkReadThreadV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MarkReadThreadV2.Responses.$200>
  }
  ['/v1/message/threads/{id}/unread']: {
    /**
     * markUnreadThread - markUnreadThread
     * 
     * Mark thread as unread
     */
    'post'(
      parameters?: Parameters<Paths.MarkUnreadThread.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MarkUnreadThread.Responses.$200>
  }
  ['/v2/message/threads/{id}/unread']: {
    /**
     * markUnreadThreadV2 - markUnreadThreadV2
     * 
     * Mark thread as unread within a scope
     */
    'post'(
      parameters?: Parameters<Paths.MarkUnreadThreadV2.PathParameters> | null,
      data?: Paths.MarkUnreadThreadV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MarkUnreadThreadV2.Responses.$200>
  }
  ['/v1/message/threads/{id}/assign']: {
    /**
     * assignThread - assignThread
     * 
     * Assign thread to entities
     */
    'post'(
      parameters?: Parameters<Paths.AssignThread.PathParameters> | null,
      data?: Paths.AssignThread.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AssignThread.Responses.$204>
  }
  ['/v1/message/threads/{id}/unassign']: {
    /**
     * unassignThread - unassignThread
     * 
     * Unassign thread from entities
     */
    'post'(
      parameters?: Parameters<Paths.UnassignThread.PathParameters> | null,
      data?: Paths.UnassignThread.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UnassignThread.Responses.$204>
  }
  ['/v1/message/threads/{id}/assign:users']: {
    /**
     * assignUsers - assignUsers
     * 
     * Assign users to thread for receiving notifications.
     * The operation replaces all existing assigned users in thread.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.AssignUsers.PathParameters> | null,
      data?: Paths.AssignUsers.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AssignUsers.Responses.$204>
  }
  ['/v1/message/threads/{id}:pin']: {
    /**
     * pinThread - Pin a single thread
     * 
     * Pin a single thread
     */
    'post'(
      parameters?: Parameters<Paths.PinThread.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PinThread.Responses.$204>
    /**
     * unpinThread - Unpin a single thread
     * 
     * Unpin a single thread
     */
    'delete'(
      parameters?: Parameters<Paths.UnpinThread.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UnpinThread.Responses.$204>
  }
  ['/v1/message/drafts']: {
    /**
     * createDraft - createDraft
     * 
     * Create a new draft
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateDraft.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateDraft.Responses.$201>
  }
  ['/v1/message/drafts:send']: {
    /**
     * sendDraft - sendDraft
     * 
     * Send the existing draft to the recipients
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SendDraft.Responses.$201>
  }
  ['/v2/message/messages/{id}']: {
    /**
     * getMessageV2 - getMessageV2
     * 
     * - Fetches message by ID
     * - If the message html is omitted on the entity, then it keeps the content on the message as a signed url
     *   {
     *     ...
     *     _id: "4d74976d-fb64-47fd-85e2-65eea140f5eb",
     *     _schema: "message",
     *     _org: "org-123",
     *     html_omitted: true,
     *     html_download_url: "https://s3.eu-central-1.amazonaws.com/epilot-attachments/3f34ce73-089c-4d45-a5ee-c161234e41c3/3f34ce73-089c-4d45-a5ee-c161234e41c3.html"
     *   }
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetMessageV2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMessageV2.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Address = Components.Schemas.Address;
export type AttachmentsRelation = Components.Schemas.AttachmentsRelation;
export type BaseEntity = Components.Schemas.BaseEntity;
export type BulkActionsPayload = Components.Schemas.BulkActionsPayload;
export type BulkActionsPayloadWithScopes = Components.Schemas.BulkActionsPayloadWithScopes;
export type ErrorResponse = Components.Schemas.ErrorResponse;
export type FieldsParam = Components.Schemas.FieldsParam;
export type File = Components.Schemas.File;
export type Message = Components.Schemas.Message;
export type MessageRequestParams = Components.Schemas.MessageRequestParams;
export type MessageV2 = Components.Schemas.MessageV2;
export type MoveThreadPayload = Components.Schemas.MoveThreadPayload;
export type ReadMessagePayload = Components.Schemas.ReadMessagePayload;
export type ReadingScope = Components.Schemas.ReadingScope;
export type SearchIDParams = Components.Schemas.SearchIDParams;
export type SearchParams = Components.Schemas.SearchParams;
export type SearchParamsV2 = Components.Schemas.SearchParamsV2;
export type SharedMailboxMapping = Components.Schemas.SharedMailboxMapping;
export type Thread = Components.Schemas.Thread;
export type ThreadDoneEvent = Components.Schemas.ThreadDoneEvent;
export type ThreadOpenEvent = Components.Schemas.ThreadOpenEvent;
export type ThreadTimeline = Components.Schemas.ThreadTimeline;
export type TimelineEvent = Components.Schemas.TimelineEvent;
export type TimelineEventData = Components.Schemas.TimelineEventData;
