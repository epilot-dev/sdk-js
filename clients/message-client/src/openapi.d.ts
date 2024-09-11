/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
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
             * Ivy Organization ID the entity belongs to
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
             * Ivy User ID of user sends the message.
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
             * Ivy User ID of user read the message.
             */
            user_read_message?: string[];
            /**
             * Ivy Organization ID of organization read the message.
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
                 * Ivy User ID of who the message is assigned to. Default is the user who sends message.
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
             * Ivy Organization ID the entity belongs to
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
             * Ivy User ID of user sends the message.
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
             * Ivy User ID of user read the message.
             */
            user_read_message?: string[];
            /**
             * Ivy Organization ID of organization read the message.
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
        export interface SearchParams {
            /**
             * Lucene query syntax supported with ElasticSearch
             * example:
             * subject:"Request for solar panel price" AND _tags:INBOX
             */
            q: string;
            from?: number;
            size?: number;
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
             * Ivy User ID of who the message is assigned to. Default is the user who sends message.
             */
            assigned_to?: string[];
            /**
             * Ivy Organization ID of organization read the message.
             */
            org_read_message?: string[];
            /**
             * Latest message of thread
             */
            latest_message?: Message;
            /**
             * Latest trash message of thread
             */
            latest_trash_message?: Message;
            /**
             * The date of the latest message time in the thread
             * example:
             * 2024-02-10T09:14:31.990Z
             */
            latest_message_at?: string;
        }
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
                 * Ivy Organization ID the entity belongs to
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
                 * Ivy User ID of user sends the message.
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
                 * Ivy User ID of user read the message.
                 */
                user_read_message?: string[];
                /**
                 * Ivy Organization ID of organization read the message.
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
                 * Ivy Organization ID the entity belongs to
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
                 * Ivy User ID of user sends the message.
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
                 * Ivy User ID of user read the message.
                 */
                user_read_message?: string[];
                /**
                 * Ivy Organization ID of organization read the message.
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
                 * Ivy Organization ID the entity belongs to
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
                 * Ivy User ID of user sends the message.
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
                 * Ivy User ID of user read the message.
                 */
                user_read_message?: string[];
                /**
                 * Ivy Organization ID of organization read the message.
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
    namespace MarkReadThread {
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
    namespace MarkUnreadThread {
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
                     * Ivy Organization ID the entity belongs to
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
                     * Ivy User ID of who the message is assigned to. Default is the user who sends message.
                     */
                    assigned_to?: string[];
                    /**
                     * Ivy Organization ID of organization read the message.
                     */
                    org_read_message?: string[];
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
                 * Ivy Organization ID the entity belongs to
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
                 * Ivy User ID of user sends the message.
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
                 * Ivy User ID of user read the message.
                 */
                user_read_message?: string[];
                /**
                 * Ivy Organization ID of organization read the message.
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
            export interface $204 {
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
            export interface $204 {
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
                 * Ivy Organization ID the entity belongs to
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
                 * Ivy User ID of user sends the message.
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
                 * Ivy User ID of user read the message.
                 */
                user_read_message?: string[];
                /**
                 * Ivy Organization ID of organization read the message.
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
                 * Ivy Organization ID the entity belongs to
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
                 * Ivy User ID of who the message is assigned to. Default is the user who sends message.
                 */
                assigned_to?: string[];
                /**
                 * Ivy Organization ID of organization read the message.
                 */
                org_read_message?: string[];
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
   * trashThread - trashThread
   * 
   * Move a thread to trash
   */
  'trashThread'(
    parameters?: Parameters<Paths.TrashThread.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TrashThread.Responses.$204>
  /**
   * untrashThread - untrashThread
   * 
   * Restore a trashed thread
   */
  'untrashThread'(
    parameters?: Parameters<Paths.UntrashThread.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UntrashThread.Responses.$204>
  /**
   * markReadThread - markReadThread
   * 
   * Mark thread as read
   */
  'markReadThread'(
    parameters?: Parameters<Paths.MarkReadThread.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MarkReadThread.Responses.$204>
  /**
   * markUnreadThread - markUnreadThread
   * 
   * Mark thread as unread
   */
  'markUnreadThread'(
    parameters?: Parameters<Paths.MarkUnreadThread.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MarkUnreadThread.Responses.$204>
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
    ): OperationResponse<Paths.TrashThread.Responses.$204>
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
    ): OperationResponse<Paths.UntrashThread.Responses.$204>
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
    ): OperationResponse<Paths.MarkReadThread.Responses.$204>
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
    ): OperationResponse<Paths.MarkUnreadThread.Responses.$204>
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
export type File = Components.Schemas.File;
export type Message = Components.Schemas.Message;
export type MessageRequestParams = Components.Schemas.MessageRequestParams;
export type MessageV2 = Components.Schemas.MessageV2;
export type SearchParams = Components.Schemas.SearchParams;
export type Thread = Components.Schemas.Thread;
