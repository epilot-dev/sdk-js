import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    export interface HeaderParameters {
        SessionSecret?: Parameters.SessionSecret;
        AiAgentId?: Parameters.AiAgentId;
        ConversationId?: Parameters.ConversationId;
        HandoffLease?: Parameters.HandoffLease;
    }
    namespace Parameters {
        export type AiAgentId = string;
        export type BlockId = string;
        export type ConversationId = string;
        export type HandoffLease = string;
        export type OptionsInstance = number;
        export type OptionsSearch = string;
        export type RecordsPage = number;
        export type RecordsSearch = string;
        export type SessionId = string; // uuid
        export type SessionSecret = string;
    }
    export interface PathParameters {
        SessionId?: Parameters.SessionId /* uuid */;
        BlockId?: Parameters.BlockId;
    }
    export interface QueryParameters {
        RecordsPage?: Parameters.RecordsPage;
        RecordsSearch?: Parameters.RecordsSearch;
        OptionsSearch?: Parameters.OptionsSearch;
        OptionsInstance?: Parameters.OptionsInstance;
    }
    namespace Responses {
        export type BadRequest = Schemas.Error;
        export type ContextNotAccepted = Schemas.ContextError;
        export type DocumentUnavailable = Schemas.Error;
        export type Forbidden = Schemas.Error;
        export type HandedOffOrFinished = Schemas.Error;
        export type HandoffGone = Schemas.Error;
        export type IdentityRequired = Schemas.Error;
        export type InternalError = Schemas.Error;
        export type JourneyInactive = Schemas.Error;
        export type JourneyNotSupported = Schemas.JourneyNotSupported;
        export type NotFound = Schemas.Error;
        export type NotFoundOrContextEntityNotFound = Schemas.Error;
        export type OptionsUnavailable = Schemas.Error;
        export type RecordsUnavailable = Schemas.Error;
        export type SessionChanged = Schemas.Error;
        export type SessionChangedOrHandedOff = Schemas.Error;
        export type SessionChangedOrJourneyInactive = Schemas.Error;
        export type SessionTooLarge = Schemas.Error;
        export type SnapshotNotResumable = Schemas.Error;
        export interface Unauthorized {
            message?: string;
        }
        export type UpstreamFailed = Schemas.Error;
        export type UpstreamTimeout = Schemas.Error;
    }
    namespace Schemas {
        export interface Block {
            id: string;
            name: string;
            type: string;
            required: boolean;
            /**
             * The block's settings as the journey configures them, in the journey's own keys.
             */
            settings?: {
                [name: string]: any;
            };
            value?: any;
            warnings?: string[];
            /**
             * The products a product block offers, each with the price it is offered at.
             */
            offers?: /* A product a block offers, with the price it is offered at. */ Offer[];
            /**
             * The product the customer has now, which a product recommendations block recommends its offers against, described as an offer. It is only shown: answer with one of the offers.
             */
            current_offer?: {
                /**
                 * The product to answer the block with.
                 */
                product_id: string;
                /**
                 * The price to answer the block with.
                 */
                price_id: string;
                name: string;
                description?: string;
                currency: string;
                /**
                 * How the journey shows the price.
                 */
                price_display: "price" | "starting_price" | "on_request" | "estimated";
                /**
                 * What one piece costs, a charge per billing period.
                 */
                charges: Charge[];
                /**
                 * For a price that depends on conditions, the reference of its resolution, as the Pricing API gives it. Where several variants of a price apply, each is its own offer; the answer names the one it means.
                 */
                catalog_reference?: {
                    [name: string]: any;
                };
            };
            /**
             * The promo codes the block's promo code field shows: those redeemed for a coupon of its products, also where they were entered in another block. Set where the block shows the field. Enter codes by answering the block with `{ "promoCodes": ["CODE"] }`; a code the field showed that the answer no longer lists is let go of.
             */
            promo_codes?: string[];
            /**
             * Set where the address a product block prices its products for has several grid operators, so the block asks for the street, as its form does. Answer the block with `{ "products", "street": { "streetName", "houseNumber" } }`.
             */
            asks_for_street?: {
                zip_code: string;
                city: string;
            };
            /**
             * The checkboxes of a consents block, in the order the journey shows them. Answer the block by topic, one entry for each topic of a ticked checkbox with the text shown, `{ "GTC": { "agreed": true, "text": "<text shown>" } }`, and leave a topic out to untick it.
             */
            consents?: Consent[];
            /**
             * The first page of the records a Cards block lets the visitor choose from. A record is chosen by answering the block with its id and schema. Further pages and searches are read from the block's records.
             */
            records?: CardRecord[];
            /**
             * Whether the Cards block has more records than its first page.
             */
            has_more_records?: boolean;
            /**
             * The records the Cards block's answer chooses, also those its first page does not list.
             */
            selected_records?: CardRecord[];
            /**
             * Whether the Cards block's records can be searched when they are read.
             */
            can_search_records?: boolean;
            /**
             * Set when the records of a Cards block could not be fetched, to tell that from a block with no records. Reading the Journey Session again fetches them again.
             */
            records_unavailable?: boolean;
            /**
             * The meters a meter reading block takes readings for, where it takes them from the customer's records.
             */
            meters?: Meter[];
            /**
             * The entities an entity finder offers, as the customer's portal found them: each with its `_id`, its `_schema` and the attributes the finder searches with. Answer with the `id` of the entity chosen, or a list of them where the finder lets the customer choose several. An entity the search did not find is refused as invalid.
             */
            entities?: {
                [name: string]: any;
            }[];
            /**
             * The options a choice block, or an entity attribute block for a choice attribute, offers, as logics leave them. For a block that searches its options in a connector, their first page; further pages and searches are read from the block's options.
             */
            options?: ChoiceOption[];
            /**
             * Whether a choice block that searches its options has more than their first page.
             */
            has_more_options?: boolean;
            /**
             * Whether the block's options are searched when they are read: a choice block that searches its options in a connector, or a previous provider block, whose options are the providers a search for their name suggests.
             */
            can_search_options?: boolean;
            /**
             * The options a choice block that searches its options holds, with their labels, also those its first page does not list.
             */
            selected_options?: ChoiceOption[];
            /**
             * The instances of a repeatable group, in order, each with the blocks the customer sees in it. The group is answered with the list of its instances, not each block on its own.
             */
            instances?: Instance[];
            /**
             * The devices an input calculator offers, in order, the other device last where it offers one. Answer the calculator with its rows, `{ "devices": [{ "name", "quantity", "unitaryConsumption", "otherName" }] }`, quantity and demand as text as a visitor types them; the Journey Engine works out each row's consumption and the total.
             */
            devices?: CalculatorDevice[];
            /**
             * Set on a block only a screen can answer, such as a signature or the PV rooftop planner. An answer to it is refused with needs_screen: hand the Journey Session over to the Journey App instead (handOffJourneySession).
             */
            needs_screen?: boolean;
            /**
             * Set on a login block whose customer is signed in, where the Journey App shows a welcome instead of the login form. The block asks nothing; the step it is on is still the journey's own, with its texts and other blocks, and moves on with a continue command.
             */
            signed_in?: boolean;
            /**
             * Set where a PDF generator offers a document, which is read from the block's document. It has the text of the block's link where the block sets one.
             */
            document?: {
                link_text?: string;
            };
            attribute?: /* The attribute an entity attribute block shows, of the entity it is set up for: the contract an entity finder chose, the entity the session is opened for, or the customer's contact. The block's value holds the attribute's value on the entity (`oldValue`), its new value (`newValue`), the entity's ID (`entityId`) and schema (`slug`). Answer with the new value as `{ "newValue": ... }`, in the shape the block holds it: a choice attribute takes one of the block's `options`, a number the number as the customer types it, as text (`"92,50"`), a date ISO 8601 text (`"2027-01-15"`, or a moment where the journey asks for a time), and an address the entity's address entry (`[{ "country": "DE", "postal_code": "50667", "city": "Köln", "street": "Musterstraße", "street_number": "12" }]`). A new value the journey's form could not give is refused as invalid; one the form does not let the customer continue with, such as a number out of range, holds them on the step. The entity itself is not changed: the journey's automation updates it after submission, as it does for the web. */ EntityAttribute;
            /**
             * Set on a summary block: what it summarises, one section per step the customer went through or that data filled in, unless the summary hides it, each with a row per answered block, in the order the journey shows them. An answer the journey shows as nothing is left out, as it is on the web: a login without an outcome, cards without a chosen card, an empty text. A section whose rows are all left out stays.
             */
            summary?: SummarySection[];
        }
        export interface CalculatorDevice {
            /**
             * What a row is answered with to hold the device.
             */
            name: string;
            /**
             * Whether the device's factor fixes the demand per piece, so the demand a row gives is replaced.
             */
            has_fixed_demand: boolean;
            /**
             * Set on the other device, whose rows also need the device's name as `otherName`.
             */
            is_other?: boolean;
        }
        export interface CardRecord {
            id: string;
            schema: string;
            /**
             * The card's title, where the block titles its cards with a template: rendered with this record and the answers where the journey renders templates (journey-templating), the template as configured where it does not. A block that titles its cards by attributes gives none; its title reads the attributes in values.
             */
            title?: string;
            /**
             * The values of the attributes the block is set up to show, by attribute.
             */
            values: {
                [name: string]: any;
            };
            /**
             * The rows of the table the card shows under its fields, where the block is set up to show related records, such as the meters of a contract. Each row holds the values of the table's columns, by attribute.
             */
            table_rows?: {
                [name: string]: any;
            }[];
        }
        export interface CardRecordsPage {
            records: CardRecord[];
            /**
             * Whether a further page has more records.
             */
            has_more_records: boolean;
            /**
             * Why nothing is listed, if so: the block is not known (`unknown_block`), lists no records on the step the Journey Session is on (`no_records_to_list`), or waits for data that could not be fetched (`requests_pending`).
             */
            issues: Issue[];
        }
        export interface Charge {
            charged: "once" | "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly";
            total: number;
            before_tax: number;
            tax: number;
        }
        export interface ChoiceOption {
            /**
             * What the block is answered with to choose the option.
             */
            value: string;
            label: string;
        }
        export interface ChoiceOptionsPage {
            options: ChoiceOption[];
            /**
             * Whether a further page has more options.
             */
            has_more_options: boolean;
            /**
             * Why nothing is listed, if so: the block is not known (`unknown_block`), or it searches no options on the step the Journey Session is on, or in the instance named for a block in a repeatable group (`no_options_to_list`).
             */
            issues: Issue[];
        }
        export interface Command {
            type: "answer" | "continue" | "back" | "submit";
            /**
             * The answers by block ID. Required for an answer command. An upload block takes the list of its files as the File API stored them: `original_name`, `file_name`, `file_size`, `file_type` and `s3ref`. A Cards block takes the records chosen as `selected`, each with its `entity_id` and `_schema`. A repeatable group takes the list of its instances, in order, each an object of answers by block ID; the list replaces the instances, so an instance is taken away by leaving it out. A calculated number in an instance is left out of the answer and worked out again. An entity finder takes the entity chosen as `{ "id": ... }`, or a list of them. A choice block that searches its options takes the value of any option found on a page or by a search, also in the instances of a repeatable group; the connector is asked about each value before it is taken.
             */
            answers?: {
                [name: string]: any;
            };
        }
        export interface Consent {
            /**
             * The topics a tick agrees to.
             */
            topics: string[];
            /**
             * The checkbox's text as configured, rich text whose variables a surface renders before it shows the text and hands it back.
             */
            text: string;
            /**
             * Whether the checkbox must be ticked to go on.
             */
            required: boolean;
            /**
             * Whether the checkbox is ticked.
             */
            is_agreed: boolean;
        }
        export interface ContextError {
            error: "not_a_context_parameter" | "context_parameter_missing";
            context_parameters: string[];
        }
        /**
         * The attribute an entity attribute block shows, of the entity it is set up for: the contract an entity finder chose, the entity the session is opened for, or the customer's contact. The block's value holds the attribute's value on the entity (`oldValue`), its new value (`newValue`), the entity's ID (`entityId`) and schema (`slug`). Answer with the new value as `{ "newValue": ... }`, in the shape the block holds it: a choice attribute takes one of the block's `options`, a number the number as the customer types it, as text (`"92,50"`), a date ISO 8601 text (`"2027-01-15"`, or a moment where the journey asks for a time), and an address the entity's address entry (`[{ "country": "DE", "postal_code": "50667", "city": "Köln", "street": "Musterstraße", "street_number": "12" }]`). A new value the journey's form could not give is refused as invalid; one the form does not let the customer continue with, such as a number out of range, holds them on the step. The entity itself is not changed: the journey's automation updates it after submission, as it does for the web.
         */
        export interface EntityAttribute {
            name: string;
            /**
             * The label the journey shows the attribute with.
             */
            label: string;
            /**
             * The attribute's type, such as string, boolean, select, multiselect, number, date, datetime or address.
             */
            type: string;
            /**
             * Whether the customer may give the attribute a new value. A block that only shows its attribute, or whose attribute the journey offers no editor for, is refused as read_only, one without an entity yet as invalid.
             */
            editable: boolean;
        }
        export interface Error {
            error: string;
        }
        /**
         * A handoff of the Journey Session to a browser, while it lasts: until its link expires where nobody opened it, or until its lease ends where a browser did.
         */
        export interface Handoff {
            /**
             * Whether a browser opened the handoff link and holds the session now.
             */
            opened: boolean;
            expires_at: string; // date-time
        }
        export interface HandoffLink {
            /**
             * The link that opens the Journey Session in the Journey App. Its token is in the fragment, so it reaches no server log. Hand it to the visitor as it is, and do not log it.
             */
            url: string; // uri
            /**
             * Until when the link can be opened.
             */
            expires_at: string; // date-time
        }
        export interface HandoffToOpen {
            /**
             * The token from the fragment of the handoff link (`ep_handoff`).
             */
            token: string;
        }
        export interface Health {
            status: "ok";
        }
        export interface Instance {
            blocks: Block[];
        }
        export interface Issue {
            code: string;
            block_id?: string;
            /**
             * The step of the block the issue is about.
             */
            step_id?: string;
            message?: string;
            /**
             * For a block in a repeatable group, the instance the issue is about, by its position from 0.
             */
            instance?: number;
            /**
             * The context parameters the journey requires and was opened without.
             */
            context_parameters?: string[];
        }
        export interface JourneyNotSupported {
            error: string;
            issues: Issue[];
            /**
             * Why the journey cannot be run at all, where it is not about single blocks: it could not be loaded (journey-not-loadable) or it only launches other journeys (journey-is-launcher).
             */
            reason?: string;
        }
        export interface JourneySession {
            id: string; // uuid
            journey_id: string;
            revision_id?: string;
            /**
             * Where the Journey Session stands. It is finished once it has submitted and reached a step that leads nowhere.
             */
            status: "open" | "finished" | "expired" | "discarded";
            /**
             * Counts the changes to the Journey Session.
             */
            version: number;
            started_at: string; // date-time
            changed_at: string; // date-time
            finished_at?: string; // date-time
            /**
             * When the answers of the Journey Session are deleted, unless it changes before.
             */
            expires_at: string; // date-time
            /**
             * The submissions the Journey Session has sent, one for each step that submits.
             */
            submissions: Submission[];
            handoff?: /* A handoff of the Journey Session to a browser, while it lasts: until its link expires where nobody opened it, or until its lease ends where a browser did. */ Handoff;
        }
        export interface JourneySessionDocument {
            /**
             * Where the document can be seen, for a while, as the Journey App opens it.
             */
            preview_url?: string;
            /**
             * Why there is no document, if so: the block is not known (`unknown_block`), or makes no document on the step the Journey Session is on (`no_document_to_generate`).
             */
            issues: Issue[];
        }
        export interface JourneySessionList {
            results: JourneySession[];
        }
        export interface JourneySessionSnapshot {
            session: JourneySession;
            /**
             * The Journey Session as the Journey Engine saves it.
             */
            snapshot: {
                [name: string]: any;
            };
        }
        export interface JourneySessionState {
            session: JourneySession;
            view: View;
            issues: Issue[];
        }
        export interface KeptJourneySession {
            session: JourneySession;
        }
        export interface Meter {
            id: string;
            meter_number: string;
            counters: MeterCounter[];
        }
        export interface MeterCounter {
            id: string;
            obis_number?: string;
            direction: "feed-in" | "feed-out";
            tariff_type?: string;
            unit?: string;
            /**
             * What was last read. A new reading may not be lower.
             */
            last_reading?: {
                value: number;
                read_at?: string; // date-time
            };
            /**
             * The highest reading that is accepted.
             */
            highest_reading?: number;
        }
        /**
         * A product a block offers, with the price it is offered at.
         */
        export interface Offer {
            /**
             * The product to answer the block with.
             */
            product_id: string;
            /**
             * The price to answer the block with.
             */
            price_id: string;
            name: string;
            description?: string;
            currency: string;
            /**
             * How the journey shows the price.
             */
            price_display: "price" | "starting_price" | "on_request" | "estimated";
            /**
             * What one piece costs, a charge per billing period.
             */
            charges: Charge[];
            /**
             * For a price that depends on conditions, the reference of its resolution, as the Pricing API gives it. Where several variants of a price apply, each is its own offer; the answer names the one it means.
             */
            catalog_reference?: {
                [name: string]: any;
            };
        }
        export interface OpenedHandoff {
            session: JourneySession;
            /**
             * The Journey Session as the Journey Engine saves it.
             */
            snapshot: {
                [name: string]: any;
            };
            /**
             * Shown once. Present it as x-journey-session-secret while the handoff lasts.
             */
            lease: string;
        }
        export interface SnapshotToKeep {
            /**
             * The journey the session runs on.
             */
            journey_id: string;
            /**
             * The Journey Session as the Journey Engine saves it.
             */
            snapshot: {
                [name: string]: any;
            };
            /**
             * The version of the Journey Session the snapshot is based on. Where it changed since, the snapshot is refused with session_changed. Left out, the snapshot replaces the session whatever its version.
             */
            base_version?: number;
        }
        export interface StartJourneySession {
            journey_id: string;
            language?: "de" | "en" | "fr";
            /**
             * The context the journey is opened with, as a link passes it: the value of each of the journey's context parameters by its key, whatever the case of the key, such as a campaign code or the ID of the contract a meter reading is for. An empty value counts as none. The entity of a parameter that loads one is loaded as the customer who is logged in, as their portal gives it to them.
             */
            context?: {
                [name: string]: string;
            };
        }
        export interface StartedJourneySession {
            session: JourneySession;
            view: View;
            issues: Issue[];
            /**
             * Shown once. Present it as x-journey-session-secret on every later request.
             */
            secret: string;
        }
        export interface Submission {
            step_id: string;
            at: string; // date-time
        }
        /**
         * A summarised answer, or a repeatable group with the rows of each of its instances.
         */
        export interface SummaryRow {
            block_id: string;
            /**
             * The title the summary shows the row under: the title it sets for the block, rendered where the journey renders templates, else the block's name. In a repeatable group's instances, the title as configured, as the journey shows it.
             */
            title: string;
            /**
             * The block's answer, which the journey words for the customer. Absent on a repeatable group's row.
             */
            value?: any;
            /**
             * The rows of each instance of a repeatable group, set on the group's row only. An instance whose answers are all left out is an empty list, so each instance keeps the place the journey numbers it by.
             */
            instances?: /* A summarised answer, or a repeatable group with the rows of each of its instances. */ SummaryRow[][];
        }
        export interface SummarySection {
            step_id: string;
            step_name: string;
            rows: /* A summarised answer, or a repeatable group with the rows of each of its instances. */ SummaryRow[];
        }
        export interface View {
            step?: {
                id: string;
                name: string;
                /**
                 * The step's title as a visitor sees it: its title, else its name, with templates rendered where the journey templates.
                 */
                title?: string;
                /**
                 * The step's subtitle as a visitor sees it, where the step shows one.
                 */
                subtitle?: string;
            };
            blocks: Block[];
            is_submit_step: boolean;
            can_go_back: boolean;
        }
    }
}
declare namespace Paths {
    namespace DiscardJourneySession {
        export interface HeaderParameters {
            "x-journey-session-secret"?: Parameters.XJourneySessionSecret;
        }
        namespace Parameters {
            export type XJourneySessionSecret = string;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.SessionChangedOrHandedOff;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace DiscardPublicJourneySession {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.SessionChangedOrHandedOff;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace GetHealth {
        namespace Responses {
            export type $200 = Components.Schemas.Health;
            export type $500 = Components.Responses.InternalError;
        }
    }
    namespace GetJourneySession {
        namespace Responses {
            export type $200 = Components.Schemas.JourneySessionState;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace GetJourneySessionDocument {
        namespace Responses {
            export type $200 = Components.Schemas.JourneySessionDocument;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.DocumentUnavailable;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace GetJourneySessionSnapshot {
        namespace Responses {
            export type $200 = Components.Schemas.JourneySessionSnapshot;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace GetPublicJourneySession {
        namespace Responses {
            export type $200 = Components.Schemas.JourneySessionState;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.IdentityRequired;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace GetPublicJourneySessionDocument {
        namespace Responses {
            export type $200 = Components.Schemas.JourneySessionDocument;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.IdentityRequired;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.DocumentUnavailable;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace GetPublicJourneySessionSnapshot {
        namespace Responses {
            export type $200 = Components.Schemas.JourneySessionSnapshot;
            export type $400 = Components.Responses.BadRequest;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace HandOffJourneySession {
        namespace Responses {
            export type $201 = Components.Schemas.HandoffLink;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.HandedOffOrFinished;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace HandOffPublicJourneySession {
        namespace Responses {
            export type $201 = Components.Schemas.HandoffLink;
            export type $400 = Components.Responses.BadRequest;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.HandedOffOrFinished;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace IdentifyJourneySession {
        namespace Responses {
            export type $200 = Components.Schemas.JourneySessionState;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.SessionChangedOrJourneyInactive;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace KeepJourneySessionSnapshot {
        export type RequestBody = Components.Schemas.SnapshotToKeep;
        namespace Responses {
            export type $200 = Components.Schemas.KeptJourneySession;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFoundOrContextEntityNotFound;
            export type $409 = Components.Responses.SessionChangedOrJourneyInactive;
            export type $413 = Components.Responses.SessionTooLarge;
            export type $422 = Components.Responses.SnapshotNotResumable;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace KeepPublicJourneySessionSnapshot {
        export type RequestBody = Components.Schemas.SnapshotToKeep;
        namespace Responses {
            export type $200 = Components.Schemas.KeptJourneySession;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.IdentityRequired;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.SessionChangedOrJourneyInactive;
            export type $413 = Components.Responses.SessionTooLarge;
            export type $422 = Components.Responses.SnapshotNotResumable;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace ListJourneySessionOptions {
        namespace Parameters {
            export type Instance = number;
            export type Page = number;
            export type Search = string;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            search?: Parameters.Search;
            instance?: Parameters.Instance;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ChoiceOptionsPage;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.OptionsUnavailable;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace ListJourneySessionRecords {
        namespace Parameters {
            export type Page = number;
            export type Search = string;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            search?: Parameters.Search;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CardRecordsPage;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.RecordsUnavailable;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace ListJourneySessions {
        namespace Parameters {
            export type JourneyId = string;
        }
        export interface QueryParameters {
            journey_id?: Parameters.JourneyId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.JourneySessionList;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace ListPublicJourneySessionOptions {
        namespace Parameters {
            export type Instance = number;
            export type Page = number;
            export type Search = string;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            search?: Parameters.Search;
            instance?: Parameters.Instance;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ChoiceOptionsPage;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.IdentityRequired;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.OptionsUnavailable;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace ListPublicJourneySessionRecords {
        namespace Parameters {
            export type Page = number;
            export type Search = string;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            search?: Parameters.Search;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CardRecordsPage;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.IdentityRequired;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.RecordsUnavailable;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace OpenJourneySessionHandoff {
        export type RequestBody = Components.Schemas.HandoffToOpen;
        namespace Responses {
            export type $200 = Components.Schemas.OpenedHandoff;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $410 = Components.Responses.HandoffGone;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace OpenPublicJourneySessionHandoff {
        export type RequestBody = Components.Schemas.HandoffToOpen;
        namespace Responses {
            export type $200 = Components.Schemas.OpenedHandoff;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.IdentityRequired;
            export type $404 = Components.Responses.NotFound;
            export type $410 = Components.Responses.HandoffGone;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace SendJourneySessionCommand {
        export type RequestBody = Components.Schemas.Command;
        namespace Responses {
            export type $200 = Components.Schemas.JourneySessionState;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.SessionChangedOrJourneyInactive;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace SendPublicJourneySessionCommand {
        export type RequestBody = Components.Schemas.Command;
        namespace Responses {
            export type $200 = Components.Schemas.JourneySessionState;
            export type $400 = Components.Responses.BadRequest;
            export type $403 = Components.Responses.IdentityRequired;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.SessionChangedOrJourneyInactive;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace StartJourneySession {
        export interface HeaderParameters {
            "x-epilot-ai-agent-id"?: Parameters.XEpilotAiAgentId;
            "x-epilot-conversation-id"?: Parameters.XEpilotConversationId;
        }
        namespace Parameters {
            export type XEpilotAiAgentId = string;
            export type XEpilotConversationId = string;
        }
        export type RequestBody = Components.Schemas.StartJourneySession;
        namespace Responses {
            export type $201 = Components.Schemas.JourneySessionState;
            export type $400 = Components.Responses.ContextNotAccepted;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFoundOrContextEntityNotFound;
            export type $409 = Components.Responses.JourneyInactive;
            export type $422 = Components.Responses.JourneyNotSupported;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace StartPublicJourneySession {
        export type RequestBody = Components.Schemas.StartJourneySession;
        namespace Responses {
            export type $201 = Components.Schemas.StartedJourneySession;
            export type $400 = Components.Responses.ContextNotAccepted;
            export type $403 = Components.Responses.IdentityRequired;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.JourneyInactive;
            export type $422 = Components.Responses.JourneyNotSupported;
            export type $500 = Components.Responses.InternalError;
            export type $502 = Components.Responses.UpstreamFailed;
            export type $504 = Components.Responses.UpstreamTimeout;
        }
    }
    namespace V1JourneySessions$SessionId {
        namespace Parameters {
            export type $0 = Components.Parameters.SessionId /* uuid */;
        }
    }
    namespace V1JourneySessions$SessionIdBlocks$BlockIdDocument {
        namespace Parameters {
            export type $0 = Components.Parameters.SessionId /* uuid */;
            export type $1 = Components.Parameters.BlockId;
        }
    }
    namespace V1JourneySessions$SessionIdBlocks$BlockIdOptions {
        namespace Parameters {
            export type $0 = Components.Parameters.SessionId /* uuid */;
            export type $1 = Components.Parameters.BlockId;
        }
    }
    namespace V1JourneySessions$SessionIdBlocks$BlockIdRecords {
        namespace Parameters {
            export type $0 = Components.Parameters.SessionId /* uuid */;
            export type $1 = Components.Parameters.BlockId;
        }
    }
    namespace V1JourneySessions$SessionIdCommands {
        namespace Parameters {
            export type $0 = Components.Parameters.SessionId /* uuid */;
            export type $1 = Components.Parameters.HandoffLease;
            export type $2 = Components.Parameters.AiAgentId;
            export type $3 = Components.Parameters.ConversationId;
        }
    }
    namespace V1JourneySessions$SessionIdHandoff {
        namespace Parameters {
            export type $0 = Components.Parameters.SessionId /* uuid */;
        }
    }
    namespace V1JourneySessions$SessionIdIdentify {
        namespace Parameters {
            export type $0 = Components.Parameters.SessionId /* uuid */;
            export type $1 = Components.Parameters.SessionSecret;
        }
    }
    namespace V1JourneySessions$SessionIdSnapshot {
        namespace Parameters {
            export type $0 = Components.Parameters.SessionId /* uuid */;
            export type $1 = Components.Parameters.HandoffLease;
        }
    }
    namespace V1JourneySessionsPublic$SessionId {
        namespace Parameters {
            export type $0 = Components.Parameters.SessionId /* uuid */;
            export type $1 = Components.Parameters.SessionSecret;
        }
    }
    namespace V1JourneySessionsPublic$SessionIdBlocks$BlockIdDocument {
        namespace Parameters {
            export type $0 = Components.Parameters.SessionId /* uuid */;
            export type $1 = Components.Parameters.BlockId;
            export type $2 = Components.Parameters.SessionSecret;
        }
    }
    namespace V1JourneySessionsPublic$SessionIdBlocks$BlockIdOptions {
        namespace Parameters {
            export type $0 = Components.Parameters.SessionId /* uuid */;
            export type $1 = Components.Parameters.BlockId;
            export type $2 = Components.Parameters.SessionSecret;
        }
    }
    namespace V1JourneySessionsPublic$SessionIdBlocks$BlockIdRecords {
        namespace Parameters {
            export type $0 = Components.Parameters.SessionId /* uuid */;
            export type $1 = Components.Parameters.BlockId;
            export type $2 = Components.Parameters.SessionSecret;
        }
    }
    namespace V1JourneySessionsPublic$SessionIdCommands {
        namespace Parameters {
            export type $0 = Components.Parameters.SessionId /* uuid */;
            export type $1 = Components.Parameters.SessionSecret;
        }
    }
    namespace V1JourneySessionsPublic$SessionIdHandoff {
        namespace Parameters {
            export type $0 = Components.Parameters.SessionId /* uuid */;
            export type $1 = Components.Parameters.SessionSecret;
        }
    }
    namespace V1JourneySessionsPublic$SessionIdSnapshot {
        namespace Parameters {
            export type $0 = Components.Parameters.SessionId /* uuid */;
            export type $1 = Components.Parameters.SessionSecret;
        }
    }
}


export interface OperationMethods {
  /**
   * getHealth - getHealth
   * 
   * Tells whether the service is up.
   */
  'getHealth'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetHealth.Responses.$200>
  /**
   * listJourneySessions - listJourneySessions
   * 
   * Lists the Journey Sessions of the customer who is logged in that can still be carried on, the one changed last first.
   */
  'listJourneySessions'(
    parameters?: Parameters<Paths.ListJourneySessions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListJourneySessions.Responses.$200>
  /**
   * startJourneySession - startJourneySession
   * 
   * Starts a Journey Session for the customer who is logged in, on a journey of their organisation, and returns what to show or ask first. The session belongs to that customer. The entities the journey's context parameters load are loaded as the customer.
   */
  'startJourneySession'(
    parameters?: Parameters<Paths.StartJourneySession.HeaderParameters> | null,
    data?: Paths.StartJourneySession.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StartJourneySession.Responses.$201>
  /**
   * openJourneySessionHandoff - openJourneySessionHandoff
   * 
   * Opens a Journey Session handed over to the Journey App, by the token of its handoff link. The customer who owns the session opens it signed in; a session of a visitor nobody knows opens by the token alone. The token is swapped for a lease once: present the lease as x-journey-session-secret, beside the portal token, to keep snapshots and send commands while the handoff lasts.
   */
  'openJourneySessionHandoff'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.OpenJourneySessionHandoff.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.OpenJourneySessionHandoff.Responses.$200>
  /**
   * getJourneySession - getJourneySession
   * 
   * Returns what a Journey Session of the customer who is logged in shows or asks now.
   */
  'getJourneySession'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetJourneySession.Responses.$200>
  /**
   * discardJourneySession - discardJourneySession
   * 
   * Discards a Journey Session of the customer who is logged in. Its answers are deleted at once. What stays is that there was a session, where it stood and when it was discarded. While the session is handed over to a browser, only that browser can discard it, with its lease.
   */
  'discardJourneySession'(
    parameters?: Parameters<Paths.DiscardJourneySession.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DiscardJourneySession.Responses.$204>
  /**
   * sendJourneySessionCommand - sendJourneySessionCommand
   * 
   * Does what the customer who is logged in wants to do in their Journey Session: answer, continue, go back or submit. The response says what to show or ask next and what is wrong with what was entered. A command that is held back changes nothing, apart from a submit held back by an earlier step, which takes the visitor back to that step.
   */
  'sendJourneySessionCommand'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SendJourneySessionCommand.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SendJourneySessionCommand.Responses.$200>
  /**
   * handOffJourneySession - handOffJourneySession
   * 
   * Hands the rest of a Journey Session of the customer who is logged in over to the Journey App in a browser, for a step with a block that needs a screen (`needs_screen`), such as a signature. Returns a link to open within 30 minutes, once. Only the customer who owns the session can open it, signed in in that browser. From then on the browser holds the session until it is finished or its lease ends after 2 hours: commands, identify and snapshot saves from anyone else get 409 handed_off, and reading still works, so the caller can follow it until its status is finished. A new handoff replaces one nobody opened yet. A finished session is not handed over.
   */
  'handOffJourneySession'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.HandOffJourneySession.Responses.$201>
  /**
   * listJourneySessionRecords - listJourneySessionRecords
   * 
   * Lists one page of the records a Cards block of the logged-in customer's Journey Session lets the visitor choose from, searched for a text where the block can be searched. Reading changes nothing in the Journey Session: page and search as often as needed, then choose with an answer command. The first page is also part of the Journey Session's view.
   */
  'listJourneySessionRecords'(
    parameters?: Parameters<Paths.ListJourneySessionRecords.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListJourneySessionRecords.Responses.$200>
  /**
   * listJourneySessionOptions - listJourneySessionOptions
   * 
   * Lists one page of the options a choice block of the logged-in customer's Journey Session searches in a connector, such as the list of electricity suppliers, searched for a text where one is given. Reading changes nothing in the Journey Session: page and search as often as needed, then choose with an answer command. The first page is also part of the Journey Session's view. For a previous provider block, the providers a search for their name suggests, on one page: each option's value is the provider's BDEW code and its label the provider's name, and the block is answered with `{ "company_name": label, "bdew_code": value }`. Without a search it lists none.
   */
  'listJourneySessionOptions'(
    parameters?: Parameters<Paths.ListJourneySessionOptions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListJourneySessionOptions.Responses.$200>
  /**
   * getJourneySessionDocument - getJourneySessionDocument
   * 
   * Generates the document a PDF generator of the logged-in customer's Journey Session makes from its template and the answers given, as the Journey App does when the visitor clicks its link, and says where it can be seen. Reading changes nothing in the Journey Session. The view says which blocks offer a document (`document`).
   */
  'getJourneySessionDocument'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetJourneySessionDocument.Responses.$200>
  /**
   * identifyJourneySession - identifyJourneySession
   * 
   * Hands a Journey Session that was started without a login over to the customer who has logged in since, as a journey with a login step asks for. The caller shows both: the session's secret and the customer's portal token. From then on the session is the customer's alone, its secret opens it no longer, and it is read and driven through the operations for customers. The response says what to show or ask next.
   */
  'identifyJourneySession'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdentifyJourneySession.Responses.$200>
  /**
   * getJourneySessionSnapshot - getJourneySessionSnapshot
   * 
   * Returns a Journey Session of the customer who is logged in as the Journey Engine saves it, so a surface that runs the engine itself can resume it, on another device as well.
   */
  'getJourneySessionSnapshot'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetJourneySessionSnapshot.Responses.$200>
  /**
   * keepJourneySessionSnapshot - keepJourneySessionSnapshot
   * 
   * Keeps a Journey Session that a surface runs itself with the Journey Engine, such as the Journey App in a browser, for the customer who is logged in. The surface sends the session as its engine saves it, under an ID it chose. A session that is not there yet is created and is the customer's from then on; one that is there is replaced, if it is theirs. The snapshot is only kept if this API's own engine can resume it on the journey it names. The entities it was opened for are loaded again as the customer, and the snapshot is refused with context_entity_not_found where one cannot be.
   */
  'keepJourneySessionSnapshot'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.KeepJourneySessionSnapshot.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.KeepJourneySessionSnapshot.Responses.$200>
  /**
   * startPublicJourneySession - startPublicJourneySession
   * 
   * Starts a Journey Session for a visitor nobody knows yet, on a public journey, and returns what to show or ask first. The response carries the session's secret once; every later request has to present it. A visitor nobody knows can give the journey's context, such as a campaign code, but cannot open it for entities: a value for a context parameter that loads an entity is refused with identity_required.
   */
  'startPublicJourneySession'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.StartPublicJourneySession.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StartPublicJourneySession.Responses.$201>
  /**
   * openPublicJourneySessionHandoff - openPublicJourneySessionHandoff
   * 
   * Opens a Journey Session handed over to the Journey App, by the token of its handoff link. A session of a visitor nobody knows opens by the token alone. A customer's session opens only through openJourneySessionHandoff, for its owner (identity_required). The token is swapped for a lease once: present the lease as x-journey-session-secret to keep snapshots and send commands while the handoff lasts.
   */
  'openPublicJourneySessionHandoff'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.OpenPublicJourneySessionHandoff.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.OpenPublicJourneySessionHandoff.Responses.$200>
  /**
   * getPublicJourneySession - getPublicJourneySession
   * 
   * Returns what a Journey Session shows or asks now, to whoever holds its secret.
   */
  'getPublicJourneySession'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPublicJourneySession.Responses.$200>
  /**
   * discardPublicJourneySession - discardPublicJourneySession
   * 
   * Discards a Journey Session for whoever holds its secret. Its answers are deleted at once. What stays is that there was a session, where it stood and when it was discarded. While the session is handed over to a browser, only that browser can discard it, with its lease.
   */
  'discardPublicJourneySession'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DiscardPublicJourneySession.Responses.$204>
  /**
   * sendPublicJourneySessionCommand - sendPublicJourneySessionCommand
   * 
   * Does what whoever holds the secret wants to do in a Journey Session: answer, continue, go back or submit. The response says what to show or ask next and what is wrong with what was entered. A command that is held back changes nothing, apart from a submit held back by an earlier step, which takes the visitor back to that step.
   */
  'sendPublicJourneySessionCommand'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SendPublicJourneySessionCommand.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SendPublicJourneySessionCommand.Responses.$200>
  /**
   * getPublicJourneySessionSnapshot - getPublicJourneySessionSnapshot
   * 
   * Returns a Journey Session as the Journey Engine saves it, to whoever holds its secret.
   */
  'getPublicJourneySessionSnapshot'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPublicJourneySessionSnapshot.Responses.$200>
  /**
   * keepPublicJourneySessionSnapshot - keepPublicJourneySessionSnapshot
   * 
   * Keeps a Journey Session that a surface runs itself with the Journey Engine, for a visitor who is not logged in. The surface chooses the session's ID and its secret, and sends the same secret with every later request. A snapshot opened for entities is refused with identity_required.
   */
  'keepPublicJourneySessionSnapshot'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.KeepPublicJourneySessionSnapshot.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.KeepPublicJourneySessionSnapshot.Responses.$200>
  /**
   * handOffPublicJourneySession - handOffPublicJourneySession
   * 
   * Hands the rest of a Journey Session held by its secret over to the Journey App in a browser, for a step with a block that needs a screen (`needs_screen`), such as a signature. Returns a link to open within 30 minutes, once. Whoever opens it first carries the session on there. From then on the browser holds the session until it is finished or its lease ends after 2 hours: commands, identify and snapshot saves from anyone else get 409 handed_off, and reading still works, so the caller can follow it until its status is finished. A new handoff replaces one nobody opened yet. A finished session is not handed over.
   */
  'handOffPublicJourneySession'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.HandOffPublicJourneySession.Responses.$201>
  /**
   * listPublicJourneySessionRecords - listPublicJourneySessionRecords
   * 
   * Lists one page of the records a Cards block of a visitor's Journey Session lets the visitor choose from, searched for a text where the block can be searched. Reading changes nothing in the Journey Session: page and search as often as needed, then choose with an answer command. The first page is also part of the Journey Session's view.
   */
  'listPublicJourneySessionRecords'(
    parameters?: Parameters<Paths.ListPublicJourneySessionRecords.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListPublicJourneySessionRecords.Responses.$200>
  /**
   * listPublicJourneySessionOptions - listPublicJourneySessionOptions
   * 
   * Lists one page of the options a choice block of a visitor's Journey Session searches in a connector, such as the list of electricity suppliers, searched for a text where one is given. Reading changes nothing in the Journey Session: page and search as often as needed, then choose with an answer command. The first page is also part of the Journey Session's view. For a previous provider block, the providers a search for their name suggests, on one page: each option's value is the provider's BDEW code and its label the provider's name, and the block is answered with `{ "company_name": label, "bdew_code": value }`. Without a search it lists none.
   */
  'listPublicJourneySessionOptions'(
    parameters?: Parameters<Paths.ListPublicJourneySessionOptions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListPublicJourneySessionOptions.Responses.$200>
  /**
   * getPublicJourneySessionDocument - getPublicJourneySessionDocument
   * 
   * Generates the document a PDF generator of a visitor's Journey Session makes from its template and the answers given, as the Journey App does when the visitor clicks its link, and says where it can be seen. Reading changes nothing in the Journey Session. The view says which blocks offer a document (`document`).
   */
  'getPublicJourneySessionDocument'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPublicJourneySessionDocument.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/health']: {
    /**
     * getHealth - getHealth
     * 
     * Tells whether the service is up.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetHealth.Responses.$200>
  }
  ['/v1/journey_sessions']: {
    /**
     * startJourneySession - startJourneySession
     * 
     * Starts a Journey Session for the customer who is logged in, on a journey of their organisation, and returns what to show or ask first. The session belongs to that customer. The entities the journey's context parameters load are loaded as the customer.
     */
    'post'(
      parameters?: Parameters<Paths.StartJourneySession.HeaderParameters> | null,
      data?: Paths.StartJourneySession.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StartJourneySession.Responses.$201>
    /**
     * listJourneySessions - listJourneySessions
     * 
     * Lists the Journey Sessions of the customer who is logged in that can still be carried on, the one changed last first.
     */
    'get'(
      parameters?: Parameters<Paths.ListJourneySessions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListJourneySessions.Responses.$200>
  }
  ['/v1/journey_sessions/handoff/open']: {
    /**
     * openJourneySessionHandoff - openJourneySessionHandoff
     * 
     * Opens a Journey Session handed over to the Journey App, by the token of its handoff link. The customer who owns the session opens it signed in; a session of a visitor nobody knows opens by the token alone. The token is swapped for a lease once: present the lease as x-journey-session-secret, beside the portal token, to keep snapshots and send commands while the handoff lasts.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.OpenJourneySessionHandoff.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.OpenJourneySessionHandoff.Responses.$200>
  }
  ['/v1/journey_sessions/{session_id}']: {
    /**
     * getJourneySession - getJourneySession
     * 
     * Returns what a Journey Session of the customer who is logged in shows or asks now.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetJourneySession.Responses.$200>
    /**
     * discardJourneySession - discardJourneySession
     * 
     * Discards a Journey Session of the customer who is logged in. Its answers are deleted at once. What stays is that there was a session, where it stood and when it was discarded. While the session is handed over to a browser, only that browser can discard it, with its lease.
     */
    'delete'(
      parameters?: Parameters<Paths.DiscardJourneySession.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DiscardJourneySession.Responses.$204>
  }
  ['/v1/journey_sessions/{session_id}/commands']: {
    /**
     * sendJourneySessionCommand - sendJourneySessionCommand
     * 
     * Does what the customer who is logged in wants to do in their Journey Session: answer, continue, go back or submit. The response says what to show or ask next and what is wrong with what was entered. A command that is held back changes nothing, apart from a submit held back by an earlier step, which takes the visitor back to that step.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SendJourneySessionCommand.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SendJourneySessionCommand.Responses.$200>
  }
  ['/v1/journey_sessions/{session_id}/handoff']: {
    /**
     * handOffJourneySession - handOffJourneySession
     * 
     * Hands the rest of a Journey Session of the customer who is logged in over to the Journey App in a browser, for a step with a block that needs a screen (`needs_screen`), such as a signature. Returns a link to open within 30 minutes, once. Only the customer who owns the session can open it, signed in in that browser. From then on the browser holds the session until it is finished or its lease ends after 2 hours: commands, identify and snapshot saves from anyone else get 409 handed_off, and reading still works, so the caller can follow it until its status is finished. A new handoff replaces one nobody opened yet. A finished session is not handed over.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.HandOffJourneySession.Responses.$201>
  }
  ['/v1/journey_sessions/{session_id}/blocks/{block_id}/records']: {
    /**
     * listJourneySessionRecords - listJourneySessionRecords
     * 
     * Lists one page of the records a Cards block of the logged-in customer's Journey Session lets the visitor choose from, searched for a text where the block can be searched. Reading changes nothing in the Journey Session: page and search as often as needed, then choose with an answer command. The first page is also part of the Journey Session's view.
     */
    'get'(
      parameters?: Parameters<Paths.ListJourneySessionRecords.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListJourneySessionRecords.Responses.$200>
  }
  ['/v1/journey_sessions/{session_id}/blocks/{block_id}/options']: {
    /**
     * listJourneySessionOptions - listJourneySessionOptions
     * 
     * Lists one page of the options a choice block of the logged-in customer's Journey Session searches in a connector, such as the list of electricity suppliers, searched for a text where one is given. Reading changes nothing in the Journey Session: page and search as often as needed, then choose with an answer command. The first page is also part of the Journey Session's view. For a previous provider block, the providers a search for their name suggests, on one page: each option's value is the provider's BDEW code and its label the provider's name, and the block is answered with `{ "company_name": label, "bdew_code": value }`. Without a search it lists none.
     */
    'get'(
      parameters?: Parameters<Paths.ListJourneySessionOptions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListJourneySessionOptions.Responses.$200>
  }
  ['/v1/journey_sessions/{session_id}/blocks/{block_id}/document']: {
    /**
     * getJourneySessionDocument - getJourneySessionDocument
     * 
     * Generates the document a PDF generator of the logged-in customer's Journey Session makes from its template and the answers given, as the Journey App does when the visitor clicks its link, and says where it can be seen. Reading changes nothing in the Journey Session. The view says which blocks offer a document (`document`).
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetJourneySessionDocument.Responses.$200>
  }
  ['/v1/journey_sessions/{session_id}/identify']: {
    /**
     * identifyJourneySession - identifyJourneySession
     * 
     * Hands a Journey Session that was started without a login over to the customer who has logged in since, as a journey with a login step asks for. The caller shows both: the session's secret and the customer's portal token. From then on the session is the customer's alone, its secret opens it no longer, and it is read and driven through the operations for customers. The response says what to show or ask next.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdentifyJourneySession.Responses.$200>
  }
  ['/v1/journey_sessions/{session_id}/snapshot']: {
    /**
     * keepJourneySessionSnapshot - keepJourneySessionSnapshot
     * 
     * Keeps a Journey Session that a surface runs itself with the Journey Engine, such as the Journey App in a browser, for the customer who is logged in. The surface sends the session as its engine saves it, under an ID it chose. A session that is not there yet is created and is the customer's from then on; one that is there is replaced, if it is theirs. The snapshot is only kept if this API's own engine can resume it on the journey it names. The entities it was opened for are loaded again as the customer, and the snapshot is refused with context_entity_not_found where one cannot be.
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.KeepJourneySessionSnapshot.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.KeepJourneySessionSnapshot.Responses.$200>
    /**
     * getJourneySessionSnapshot - getJourneySessionSnapshot
     * 
     * Returns a Journey Session of the customer who is logged in as the Journey Engine saves it, so a surface that runs the engine itself can resume it, on another device as well.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetJourneySessionSnapshot.Responses.$200>
  }
  ['/v1/journey_sessions/public']: {
    /**
     * startPublicJourneySession - startPublicJourneySession
     * 
     * Starts a Journey Session for a visitor nobody knows yet, on a public journey, and returns what to show or ask first. The response carries the session's secret once; every later request has to present it. A visitor nobody knows can give the journey's context, such as a campaign code, but cannot open it for entities: a value for a context parameter that loads an entity is refused with identity_required.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.StartPublicJourneySession.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StartPublicJourneySession.Responses.$201>
  }
  ['/v1/journey_sessions/public/handoff/open']: {
    /**
     * openPublicJourneySessionHandoff - openPublicJourneySessionHandoff
     * 
     * Opens a Journey Session handed over to the Journey App, by the token of its handoff link. A session of a visitor nobody knows opens by the token alone. A customer's session opens only through openJourneySessionHandoff, for its owner (identity_required). The token is swapped for a lease once: present the lease as x-journey-session-secret to keep snapshots and send commands while the handoff lasts.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.OpenPublicJourneySessionHandoff.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.OpenPublicJourneySessionHandoff.Responses.$200>
  }
  ['/v1/journey_sessions/public/{session_id}']: {
    /**
     * getPublicJourneySession - getPublicJourneySession
     * 
     * Returns what a Journey Session shows or asks now, to whoever holds its secret.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPublicJourneySession.Responses.$200>
    /**
     * discardPublicJourneySession - discardPublicJourneySession
     * 
     * Discards a Journey Session for whoever holds its secret. Its answers are deleted at once. What stays is that there was a session, where it stood and when it was discarded. While the session is handed over to a browser, only that browser can discard it, with its lease.
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DiscardPublicJourneySession.Responses.$204>
  }
  ['/v1/journey_sessions/public/{session_id}/commands']: {
    /**
     * sendPublicJourneySessionCommand - sendPublicJourneySessionCommand
     * 
     * Does what whoever holds the secret wants to do in a Journey Session: answer, continue, go back or submit. The response says what to show or ask next and what is wrong with what was entered. A command that is held back changes nothing, apart from a submit held back by an earlier step, which takes the visitor back to that step.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SendPublicJourneySessionCommand.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SendPublicJourneySessionCommand.Responses.$200>
  }
  ['/v1/journey_sessions/public/{session_id}/snapshot']: {
    /**
     * keepPublicJourneySessionSnapshot - keepPublicJourneySessionSnapshot
     * 
     * Keeps a Journey Session that a surface runs itself with the Journey Engine, for a visitor who is not logged in. The surface chooses the session's ID and its secret, and sends the same secret with every later request. A snapshot opened for entities is refused with identity_required.
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.KeepPublicJourneySessionSnapshot.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.KeepPublicJourneySessionSnapshot.Responses.$200>
    /**
     * getPublicJourneySessionSnapshot - getPublicJourneySessionSnapshot
     * 
     * Returns a Journey Session as the Journey Engine saves it, to whoever holds its secret.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPublicJourneySessionSnapshot.Responses.$200>
  }
  ['/v1/journey_sessions/public/{session_id}/handoff']: {
    /**
     * handOffPublicJourneySession - handOffPublicJourneySession
     * 
     * Hands the rest of a Journey Session held by its secret over to the Journey App in a browser, for a step with a block that needs a screen (`needs_screen`), such as a signature. Returns a link to open within 30 minutes, once. Whoever opens it first carries the session on there. From then on the browser holds the session until it is finished or its lease ends after 2 hours: commands, identify and snapshot saves from anyone else get 409 handed_off, and reading still works, so the caller can follow it until its status is finished. A new handoff replaces one nobody opened yet. A finished session is not handed over.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.HandOffPublicJourneySession.Responses.$201>
  }
  ['/v1/journey_sessions/public/{session_id}/blocks/{block_id}/records']: {
    /**
     * listPublicJourneySessionRecords - listPublicJourneySessionRecords
     * 
     * Lists one page of the records a Cards block of a visitor's Journey Session lets the visitor choose from, searched for a text where the block can be searched. Reading changes nothing in the Journey Session: page and search as often as needed, then choose with an answer command. The first page is also part of the Journey Session's view.
     */
    'get'(
      parameters?: Parameters<Paths.ListPublicJourneySessionRecords.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListPublicJourneySessionRecords.Responses.$200>
  }
  ['/v1/journey_sessions/public/{session_id}/blocks/{block_id}/options']: {
    /**
     * listPublicJourneySessionOptions - listPublicJourneySessionOptions
     * 
     * Lists one page of the options a choice block of a visitor's Journey Session searches in a connector, such as the list of electricity suppliers, searched for a text where one is given. Reading changes nothing in the Journey Session: page and search as often as needed, then choose with an answer command. The first page is also part of the Journey Session's view. For a previous provider block, the providers a search for their name suggests, on one page: each option's value is the provider's BDEW code and its label the provider's name, and the block is answered with `{ "company_name": label, "bdew_code": value }`. Without a search it lists none.
     */
    'get'(
      parameters?: Parameters<Paths.ListPublicJourneySessionOptions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListPublicJourneySessionOptions.Responses.$200>
  }
  ['/v1/journey_sessions/public/{session_id}/blocks/{block_id}/document']: {
    /**
     * getPublicJourneySessionDocument - getPublicJourneySessionDocument
     * 
     * Generates the document a PDF generator of a visitor's Journey Session makes from its template and the answers given, as the Journey App does when the visitor clicks its link, and says where it can be seen. Reading changes nothing in the Journey Session. The view says which blocks offer a document (`document`).
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPublicJourneySessionDocument.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Block = Components.Schemas.Block;
export type CalculatorDevice = Components.Schemas.CalculatorDevice;
export type CardRecord = Components.Schemas.CardRecord;
export type CardRecordsPage = Components.Schemas.CardRecordsPage;
export type Charge = Components.Schemas.Charge;
export type ChoiceOption = Components.Schemas.ChoiceOption;
export type ChoiceOptionsPage = Components.Schemas.ChoiceOptionsPage;
export type Command = Components.Schemas.Command;
export type Consent = Components.Schemas.Consent;
export type ContextError = Components.Schemas.ContextError;
export type EntityAttribute = Components.Schemas.EntityAttribute;
export type Error = Components.Schemas.Error;
export type Handoff = Components.Schemas.Handoff;
export type HandoffLink = Components.Schemas.HandoffLink;
export type HandoffToOpen = Components.Schemas.HandoffToOpen;
export type Health = Components.Schemas.Health;
export type Instance = Components.Schemas.Instance;
export type Issue = Components.Schemas.Issue;
export type JourneyNotSupported = Components.Schemas.JourneyNotSupported;
export type JourneySession = Components.Schemas.JourneySession;
export type JourneySessionDocument = Components.Schemas.JourneySessionDocument;
export type JourneySessionList = Components.Schemas.JourneySessionList;
export type JourneySessionSnapshot = Components.Schemas.JourneySessionSnapshot;
export type JourneySessionState = Components.Schemas.JourneySessionState;
export type KeptJourneySession = Components.Schemas.KeptJourneySession;
export type Meter = Components.Schemas.Meter;
export type MeterCounter = Components.Schemas.MeterCounter;
export type Offer = Components.Schemas.Offer;
export type OpenedHandoff = Components.Schemas.OpenedHandoff;
export type SnapshotToKeep = Components.Schemas.SnapshotToKeep;
export type StartJourneySession = Components.Schemas.StartJourneySession;
export type StartedJourneySession = Components.Schemas.StartedJourneySession;
export type Submission = Components.Schemas.Submission;
export type SummaryRow = Components.Schemas.SummaryRow;
export type SummarySection = Components.Schemas.SummarySection;
export type View = Components.Schemas.View;
