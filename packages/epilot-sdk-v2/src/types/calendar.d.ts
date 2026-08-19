/* Auto-copied from calendar-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Schemas {
        export interface AbsenceAdjustment {
            /**
             * Adjustment start. Maximum adjustment duration: 7 days.
             */
            from: string; // date-time
            /**
             * Adjustment end. Must be after from.
             */
            to: string; // date-time
            /**
             * Manual override state: true means absent, false means not absent.
             */
            absent: boolean;
            status: /* Calendar status targeted by the absence adjustment. */ AbsenceStatus;
            type?: /* Optional producer-defined reference stored with an absence adjustment. */ AbsenceType;
            reason?: string | null;
            adjustment_id: string;
            user_id: string;
            created_by: string;
            created_at: string; // date-time
            updated_at: string; // date-time
        }
        export interface AbsenceInterval {
            /**
             * Absence interval start clipped to the requested window.
             */
            from: string; // date-time
            /**
             * Absence interval end clipped to the requested window.
             */
            to: string; // date-time
            /**
             * Original absence interval start before clipping.
             */
            original_from: string; // date-time
            /**
             * Original absence interval end before clipping.
             */
            original_to: string; // date-time
            /**
             * Effective absence state for this interval.
             */
            absent: boolean;
            source: AbsenceIntervalSource;
            /**
             * calendar_event ID for calendar-derived intervals.
             */
            calendar_event_id?: string;
            /**
             * absence adjustment ID for manual intervals.
             */
            absence_adjustment_id?: string;
            reason?: string | null;
        }
        export type AbsenceIntervalSource = "calendar_event" | "absence_adjustment" | "working_hours";
        /**
         * Calendar status targeted by the absence adjustment.
         */
        export type AbsenceStatus = "oof" | "busy";
        /**
         * Optional producer-defined reference stored with an absence adjustment.
         */
        export type AbsenceType = string;
        export interface AddOutlookCalendarRequest {
            provider_calendar_id: string;
            /**
             * Optional override; defaults to the provider calendar name.
             */
            name?: string;
        }
        export interface Attendee {
            email: string; // email
            name?: string | null;
            response: /* Caller's response to the invite */ ResponseStatus;
            type: "required" | "optional" | "resource";
        }
        export interface AvailableOutlookCalendar {
            /**
             * Microsoft Graph calendar id (immutable, e.g. base64-encoded)
             */
            provider_calendar_id: string;
            name: string;
            color?: string | null;
            is_default?: boolean;
            can_edit?: boolean;
            /**
             * Owner email address on the Microsoft side
             */
            owner?: string | null;
        }
        export interface Calendar {
            /**
             * epilot calendar ID
             */
            _id: string;
            _schema: "calendar";
            /**
             * Organization the calendar belongs to
             */
            _org: string;
            /**
             * Computed display title
             */
            _title?: string;
            name: string;
            description?: string | null;
            /**
             * Hex color (e.g. "#3b82f6") or provider-defined named color
             */
            color?: string | null;
            /**
             * True if this is the user's primary calendar
             */
            is_default: boolean;
            /**
             * True if the caller cannot create, update, or delete events in this calendar
             */
            read_only: boolean;
            owner_email?: string | null; // email
            source: CalendarSource;
            _created_at?: string; // date-time
            _updated_at?: string; // date-time
        }
        export interface CalendarCreateBody {
            name: string;
            description?: string | null;
            /**
             * Hex color (e.g. "#3b82f6") or provider-defined named color
             */
            color?: string | null;
        }
        export interface CalendarEvent {
            /**
             * epilot event ID
             */
            _id: string;
            _schema: "calendar_event";
            _org: string;
            /**
             * Null when sensitivity is private or confidential
             */
            _title?: string | null;
            /**
             * Provider categories (Outlook) or colours (Google) as epilot tags
             */
            _tags?: string[];
            /**
             * epilot calendar this event belongs to
             */
            calendar_id: string;
            event_type: EventType;
            /**
             * Preview of the event body, truncated to 255 chars
             */
            description?: string | null;
            /**
             * Event start in UTC
             */
            start_time: string; // date-time
            /**
             * Event end in UTC
             */
            end_time: string; // date-time
            /**
             * IANA timezone of the original event (for display)
             */
            timezone: string;
            is_all_day: boolean;
            location?: string | null;
            status: /* Free/busy state derived from provider `showAs` */ EventStatus;
            /**
             * Convenience flag, true when status is busy/oof/tentative
             */
            busy: boolean;
            /**
             * Whether the event was cancelled but still exists
             */
            is_cancelled: boolean;
            /**
             * Whether the event is saved as a draft
             */
            is_draft: boolean;
            sensitivity: Sensitivity;
            importance: Importance;
            is_online_meeting: boolean;
            /**
             * Teams, Meet, Zoom, or similar join URL
             */
            online_meeting_url?: string | null; // uri
            /**
             * Deep link to open the event in the originating provider
             */
            web_link?: string | null; // uri
            response_status: /* Caller's response to the invite */ ResponseStatus;
            organizer_email?: string | null; // email
            /**
             * Null when sensitivity is private or confidential
             */
            attendees?: Attendee[] | null;
            metadata?: {
                [name: string]: any;
            } | null;
            is_recurring: boolean;
            /**
             * ID of the recurring series this occurrence belongs to
             */
            series_master_id?: string | null;
            source: EventSource;
            _created_at?: string; // date-time
            _updated_at?: string; // date-time
        }
        export interface CalendarEventCreateBody {
            /**
             * epilot calendar this event belongs to
             */
            calendar_id: string;
            /**
             * Preview of the event body, truncated to 255 chars
             */
            description?: string | null;
            /**
             * Event start in UTC
             */
            start_time: string; // date-time
            /**
             * Event end in UTC
             */
            end_time: string; // date-time
            /**
             * IANA timezone of the original event (for display)
             */
            timezone: string;
            is_all_day: boolean;
            location?: string | null;
            status: /* Free/busy state derived from provider `showAs` */ EventStatus;
            sensitivity: Sensitivity;
            metadata?: {
                [name: string]: any;
            } | null;
            _title: string;
        }
        export interface CalendarEventPatchBody {
            /**
             * Preview of the event body, truncated to 255 chars
             */
            description?: string | null;
            /**
             * Event start in UTC
             */
            start_time?: string; // date-time
            /**
             * Event end in UTC
             */
            end_time?: string; // date-time
            /**
             * IANA timezone of the original event (for display)
             */
            timezone?: string;
            is_all_day?: boolean;
            location?: string | null;
            status?: /* Free/busy state derived from provider `showAs` */ EventStatus;
            /**
             * Whether the event was cancelled but still exists
             */
            is_cancelled?: boolean;
            sensitivity?: Sensitivity;
            _title?: string;
        }
        export interface CalendarPatchBody {
            name?: string;
            description?: string | null;
            /**
             * Hex color (e.g. "#3b82f6") or provider-defined named color
             */
            color?: string | null;
        }
        export interface CalendarSource {
            /**
             * `native` = hosted by epilot. `synced` = mirrored from an external provider.
             */
            type: "native" | "synced";
            provider?: /* Null for native epilot calendars */ Provider;
            provider_calendar_id?: string | null;
            last_synced_at?: string | null; // date-time
        }
        export interface CreateAbsenceAdjustmentBody {
            /**
             * Adjustment start. Maximum adjustment duration: 7 days.
             */
            from: string; // date-time
            /**
             * Adjustment end. Must be after from.
             */
            to: string; // date-time
            /**
             * Manual override state: true means absent, false means not absent.
             */
            absent: boolean;
            status: /* Calendar status targeted by the absence adjustment. */ AbsenceStatus;
            type?: /* Optional producer-defined reference stored with an absence adjustment. */ AbsenceType;
            reason?: string | null;
        }
        export interface Error {
            status: number;
            error: string | any[];
        }
        export interface EventSource {
            /**
             * `native` = hosted by epilot. `synced` = mirrored from an external provider.
             */
            type: "native" | "synced";
            provider?: /* Null for native epilot calendars */ Provider;
            provider_event_id?: string | null;
            /**
             * Deep link to open the event in the originating provider
             */
            provider_event_url?: string | null; // uri
            last_synced_at?: string | null; // date-time
            /**
             * Provider-supplied version tag used for conflict detection
             */
            etag?: string | null;
        }
        /**
         * Free/busy state derived from provider `showAs`
         */
        export type EventStatus = "free" | "tentative" | "busy" | "oof" | "workingElsewhere" | "unknown";
        export type EventType = "singleInstance" | "occurrence" | "exception" | "seriesMaster";
        export interface ExternalCalendar {
            /**
             * External calendar provider.
             */
            provider: "outlook" | "google";
            /**
             * Last successful sync of this provider calendar, if any.
             */
            last_synced_at: string | null; // date-time
        }
        export type Importance = "low" | "normal" | "high";
        export interface PatchAbsenceAdjustmentBody {
            /**
             * Adjustment start. Maximum adjustment duration: 7 days.
             */
            from?: string; // date-time
            /**
             * Adjustment end. Must be after from.
             */
            to?: string; // date-time
            /**
             * Manual override state: true means absent, false means not absent.
             */
            absent?: boolean;
            status?: /* Calendar status targeted by the absence adjustment. */ AbsenceStatus;
            type?: /* Optional producer-defined reference stored with an absence adjustment. */ AbsenceType;
            reason?: string | null;
        }
        /**
         * Null for native epilot calendars
         */
        export type Provider = "outlook" | "google" | null;
        /**
         * Caller's response to the invite
         */
        export type ResponseStatus = "none" | "organizer" | "tentativelyAccepted" | "accepted" | "declined" | "notResponded";
        export interface SearchAbsenceBody {
            /**
             * Start of the time window (inclusive). Maximum window: 31 days.
             */
            from: string; // date-time
            /**
             * End of the time window (exclusive). Must be after from.
             */
            to: string; // date-time
            /**
             * Candidate users to check for absence inside the caller organization.
             */
            user_ids: [
                string,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?
            ];
            /**
             * Include busy inputs in addition to out-of-office absence. Defaults to false.
             */
            include_busy?: boolean;
            /**
             * At what granularity working hours contribute to absence. "time" (default): all time outside a user's working windows counts as absent. "day": only full days with no working windows count as absent (whole-day granularity, used by thread assignment). Users without a working-hours record never produce working-hours intervals.
             */
            working_hours_granularity?: "time" | "day";
        }
        export interface SearchNowAbsenceBody {
            /**
             * Candidate users to check for absence at the current server time inside the caller organization.
             */
            user_ids: [
                string,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?
            ];
            /**
             * Include busy inputs in addition to out-of-office absence. Defaults to false.
             */
            include_busy?: boolean;
            /**
             * At what granularity working hours contribute to absence. "time" (default): all time outside a user's working windows counts as absent. "day": only full days with no working windows count as absent (whole-day granularity, used by thread assignment). Users without a working-hours record never produce working-hours intervals.
             */
            working_hours_granularity?: "time" | "day";
        }
        export type Sensitivity = "normal" | "personal" | "private" | "confidential";
        export interface ShareEventBody {
            /**
             * epilot user id (same organization) to grant view-only access to this event
             */
            user_id: string;
        }
        /**
         * A wall-clock working window within a single day.
         */
        export interface TimeWindow {
            /**
             * 24h wall-clock time ("HH:mm") in the timezone of the working-hours record.
             */
            start: string; // ^([01]\d|2[0-3]):[0-5]\d$
            /**
             * 24h wall-clock time ("HH:mm") in the timezone of the working-hours record.
             */
            end: string; // ^([01]\d|2[0-3]):[0-5]\d$
        }
        /**
         * Full replacement of the working-hours record. All weekdays are required; an empty array means a day off. Users without a working-hours record are treated as always available.
         */
        export interface UpsertWorkingHoursBody {
            /**
             * Working windows for a day, sorted and non-overlapping. An empty array means a day off.
             */
            monday: [
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?
            ];
            /**
             * Working windows for a day, sorted and non-overlapping. An empty array means a day off.
             */
            tuesday: [
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?
            ];
            /**
             * Working windows for a day, sorted and non-overlapping. An empty array means a day off.
             */
            wednesday: [
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?
            ];
            /**
             * Working windows for a day, sorted and non-overlapping. An empty array means a day off.
             */
            thursday: [
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?
            ];
            /**
             * Working windows for a day, sorted and non-overlapping. An empty array means a day off.
             */
            friday: [
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?
            ];
            /**
             * Working windows for a day, sorted and non-overlapping. An empty array means a day off.
             */
            saturday: [
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?
            ];
            /**
             * Working windows for a day, sorted and non-overlapping. An empty array means a day off.
             */
            sunday: [
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?
            ];
            /**
             * IANA timezone the working windows are expressed in. Defaults to Europe/Berlin.
             */
            timezone?: string;
        }
        /**
         * Recurring weekly working hours of a user. The absence of a record means the user is treated as always available.
         */
        export interface WorkingHours {
            /**
             * Working windows for a day, sorted and non-overlapping. An empty array means a day off.
             */
            monday: [
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?
            ];
            /**
             * Working windows for a day, sorted and non-overlapping. An empty array means a day off.
             */
            tuesday: [
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?
            ];
            /**
             * Working windows for a day, sorted and non-overlapping. An empty array means a day off.
             */
            wednesday: [
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?
            ];
            /**
             * Working windows for a day, sorted and non-overlapping. An empty array means a day off.
             */
            thursday: [
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?
            ];
            /**
             * Working windows for a day, sorted and non-overlapping. An empty array means a day off.
             */
            friday: [
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?
            ];
            /**
             * Working windows for a day, sorted and non-overlapping. An empty array means a day off.
             */
            saturday: [
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?
            ];
            /**
             * Working windows for a day, sorted and non-overlapping. An empty array means a day off.
             */
            sunday: [
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?,
                /* A wall-clock working window within a single day. */ TimeWindow?
            ];
            /**
             * IANA timezone the working windows are expressed in.
             */
            timezone: string;
            user_id: string;
            updated_by: string;
            created_at: string; // date-time
            updated_at: string; // date-time
        }
    }
}
export declare namespace Paths {
    namespace AddOutlookCalendar {
        export type RequestBody = Components.Schemas.AddOutlookCalendarRequest;
        namespace Responses {
            export type $201 = Components.Schemas.Calendar;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace CreateAbsenceAdjustment {
        namespace Parameters {
            export type UserId = string;
        }
        export interface PathParameters {
            user_id: Parameters.UserId;
        }
        export type RequestBody = Components.Schemas.CreateAbsenceAdjustmentBody;
        namespace Responses {
            export type $201 = Components.Schemas.AbsenceAdjustment;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace CreateCalendar {
        export type RequestBody = Components.Schemas.CalendarCreateBody;
        namespace Responses {
            export type $201 = Components.Schemas.Calendar;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace CreateEvent {
        export type RequestBody = Components.Schemas.CalendarEventCreateBody;
        namespace Responses {
            export type $201 = Components.Schemas.CalendarEvent;
            export type $400 = Components.Schemas.Error;
            export type $403 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace DeleteAbsenceAdjustment {
        namespace Parameters {
            export type AdjustmentId = string;
            export type UserId = string;
        }
        export interface PathParameters {
            user_id: Parameters.UserId;
            adjustment_id: Parameters.AdjustmentId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace DeleteCalendar {
        namespace Parameters {
            export type CalendarId = string;
        }
        export interface PathParameters {
            calendar_id: Parameters.CalendarId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace DeleteEvent {
        namespace Parameters {
            export type EventId = string;
        }
        export interface PathParameters {
            event_id: Parameters.EventId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $403 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace DeleteOutlookCalendar {
        namespace Parameters {
            export type CalendarId = string;
        }
        export interface PathParameters {
            calendar_id: Parameters.CalendarId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $404 = Components.Schemas.Error;
            export type $502 = Components.Schemas.Error;
        }
    }
    namespace DeleteWorkingHours {
        namespace Parameters {
            export type UserId = string;
        }
        export interface PathParameters {
            user_id: Parameters.UserId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace GetAbsenceAdjustment {
        namespace Parameters {
            export type AdjustmentId = string;
            export type UserId = string;
        }
        export interface PathParameters {
            user_id: Parameters.UserId;
            adjustment_id: Parameters.AdjustmentId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AbsenceAdjustment;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace GetCalendar {
        namespace Parameters {
            export type CalendarId = string;
        }
        export interface PathParameters {
            calendar_id: Parameters.CalendarId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Calendar;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace GetEvent {
        namespace Parameters {
            export type EventId = string;
        }
        export interface PathParameters {
            event_id: Parameters.EventId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CalendarEvent;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace GetUserAbsence {
        namespace Parameters {
            /**
             * Start of the time window (inclusive). Maximum window: 31 days.
             */
            export type From = string; // date-time
            /**
             * Include busy inputs in addition to out-of-office absence. Defaults to false.
             */
            export type IncludeBusy = boolean;
            /**
             * End of the time window (exclusive). Must be after from.
             */
            export type To = string; // date-time
            export type UserId = string;
            /**
             * At what granularity working hours contribute to absence. "time" (default): all time outside a user's working windows counts as absent. "day": only full days with no working windows count as absent (whole-day granularity, used by thread assignment). Users without a working-hours record never produce working-hours intervals.
             */
            export type WorkingHoursGranularity = "time" | "day";
        }
        export interface PathParameters {
            user_id: Parameters.UserId;
        }
        export interface QueryParameters {
            from: /* Start of the time window (inclusive). Maximum window: 31 days. */ Parameters.From /* date-time */;
            to: /* End of the time window (exclusive). Must be after from. */ Parameters.To /* date-time */;
            include_busy?: /* Include busy inputs in addition to out-of-office absence. Defaults to false. */ Parameters.IncludeBusy;
            working_hours_granularity?: /* At what granularity working hours contribute to absence. "time" (default): all time outside a user's working windows counts as absent. "day": only full days with no working windows count as absent (whole-day granularity, used by thread assignment). Users without a working-hours record never produce working-hours intervals. */ Parameters.WorkingHoursGranularity;
        }
        namespace Responses {
            export interface $200 {
                absent: boolean;
                absence_intervals: Components.Schemas.AbsenceInterval[];
                from: string; // date-time
                to: string; // date-time
                user_id: string;
                /**
                 * The user's connected external calendars (Outlook/Google), if any.
                 */
                external_calendars?: Components.Schemas.ExternalCalendar[];
            }
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace GetWorkingHours {
        namespace Parameters {
            export type UserId = string;
        }
        export interface PathParameters {
            user_id: Parameters.UserId;
        }
        namespace Responses {
            export type $200 = /* Recurring weekly working hours of a user. The absence of a record means the user is treated as always available. */ Components.Schemas.WorkingHours;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace ListAbsenceAdjustments {
        namespace Parameters {
            /**
             * Start of the time window (inclusive). Maximum window: 90 days.
             */
            export type From = string; // date-time
            /**
             * End of the time window (exclusive). Must be after from.
             */
            export type To = string; // date-time
            export type UserId = string;
        }
        export interface PathParameters {
            user_id: Parameters.UserId;
        }
        export interface QueryParameters {
            from: /* Start of the time window (inclusive). Maximum window: 90 days. */ Parameters.From /* date-time */;
            to: /* End of the time window (exclusive). Must be after from. */ Parameters.To /* date-time */;
        }
        namespace Responses {
            export interface $200 {
                from: string; // date-time
                to: string; // date-time
                results: Components.Schemas.AbsenceAdjustment[];
            }
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace ListCalendars {
        namespace Parameters {
            /**
             * Opaque cursor from a previous response
             */
            export type Cursor = string;
            export type Size = number;
        }
        export interface QueryParameters {
            size?: Parameters.Size;
            cursor?: /* Opaque cursor from a previous response */ Parameters.Cursor;
        }
        namespace Responses {
            export interface $200 {
                results: Components.Schemas.Calendar[];
                next_cursor?: string | null;
            }
        }
    }
    namespace ListEvents {
        namespace Parameters {
            /**
             * Filter to a single calendar. Omit to query across all accessible calendars.
             */
            export type CalendarId = string;
            export type Cursor = string;
            /**
             * Start of the time window (inclusive)
             */
            export type From = string; // date-time
            export type Size = number;
            /**
             * End of the time window (exclusive)
             */
            export type To = string; // date-time
        }
        export interface QueryParameters {
            from: /* Start of the time window (inclusive) */ Parameters.From /* date-time */;
            to: /* End of the time window (exclusive) */ Parameters.To /* date-time */;
            calendar_id?: /* Filter to a single calendar. Omit to query across all accessible calendars. */ Parameters.CalendarId;
            size?: Parameters.Size;
            cursor?: Parameters.Cursor;
        }
        namespace Responses {
            export interface $200 {
                results: Components.Schemas.CalendarEvent[];
                next_cursor?: string | null;
            }
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace ListOutlookCalendars {
        namespace Responses {
            export interface $200 {
                calendars: Components.Schemas.AvailableOutlookCalendar[];
            }
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace ListUsersAbsence {
        namespace Parameters {
            /**
             * Start of the time window (inclusive). Maximum window: 31 days.
             */
            export type From = string; // date-time
            /**
             * Include busy inputs in addition to out-of-office absence. Defaults to false.
             */
            export type IncludeBusy = boolean;
            /**
             * Maximum users to return.
             */
            export type Limit = number;
            /**
             * User directory offset.
             */
            export type Offset = number;
            /**
             * Optional user directory search query.
             */
            export type Query = string;
            /**
             * End of the time window (exclusive). Must be after from.
             */
            export type To = string; // date-time
            /**
             * At what granularity working hours contribute to absence. "time" (default): all time outside a user's working windows counts as absent. "day": only full days with no working windows count as absent (whole-day granularity, used by thread assignment). Users without a working-hours record never produce working-hours intervals.
             */
            export type WorkingHoursGranularity = "time" | "day";
        }
        export interface QueryParameters {
            from: /* Start of the time window (inclusive). Maximum window: 31 days. */ Parameters.From /* date-time */;
            to: /* End of the time window (exclusive). Must be after from. */ Parameters.To /* date-time */;
            include_busy?: /* Include busy inputs in addition to out-of-office absence. Defaults to false. */ Parameters.IncludeBusy;
            working_hours_granularity?: /* At what granularity working hours contribute to absence. "time" (default): all time outside a user's working windows counts as absent. "day": only full days with no working windows count as absent (whole-day granularity, used by thread assignment). Users without a working-hours record never produce working-hours intervals. */ Parameters.WorkingHoursGranularity;
            query?: /* Optional user directory search query. */ Parameters.Query;
            limit?: /* Maximum users to return. */ Parameters.Limit;
            offset?: /* User directory offset. */ Parameters.Offset;
        }
        namespace Responses {
            export interface $200 {
                from: string; // date-time
                to: string; // date-time
                hits: number;
                results: {
                    absent: boolean;
                    absence_intervals: Components.Schemas.AbsenceInterval[];
                    user_id: string;
                    display_name?: string | null;
                    email?: string | null; // email
                    status?: string | null;
                }[];
            }
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace OutlookWebhook {
        namespace Parameters {
            /**
             * Set by Graph on the subscription-validation handshake; echoed back verbatim.
             */
            export type ValidationToken = string;
        }
        export interface QueryParameters {
            validationToken?: /* Set by Graph on the subscription-validation handshake; echoed back verbatim. */ Parameters.ValidationToken;
        }
        namespace Responses {
            export type $200 = string;
            export interface $202 {
            }
        }
    }
    namespace PatchAbsenceAdjustment {
        namespace Parameters {
            export type AdjustmentId = string;
            export type UserId = string;
        }
        export interface PathParameters {
            user_id: Parameters.UserId;
            adjustment_id: Parameters.AdjustmentId;
        }
        export type RequestBody = Components.Schemas.PatchAbsenceAdjustmentBody;
        namespace Responses {
            export type $200 = Components.Schemas.AbsenceAdjustment;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace PutWorkingHours {
        namespace Parameters {
            export type UserId = string;
        }
        export interface PathParameters {
            user_id: Parameters.UserId;
        }
        export type RequestBody = /* Full replacement of the working-hours record. All weekdays are required; an empty array means a day off. Users without a working-hours record are treated as always available. */ Components.Schemas.UpsertWorkingHoursBody;
        namespace Responses {
            export type $200 = /* Recurring weekly working hours of a user. The absence of a record means the user is treated as always available. */ Components.Schemas.WorkingHours;
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace SearchAbsence {
        export type RequestBody = Components.Schemas.SearchAbsenceBody;
        namespace Responses {
            export interface $200 {
                from: string; // date-time
                to: string; // date-time
                users: {
                    [name: string]: {
                        absent: boolean;
                        absence_intervals: Components.Schemas.AbsenceInterval[];
                    };
                };
            }
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace SearchNowAbsence {
        export type RequestBody = Components.Schemas.SearchNowAbsenceBody;
        namespace Responses {
            export interface $200 {
                from: string; // date-time
                to: string; // date-time
                users: {
                    [name: string]: {
                        absent: boolean;
                        absence_intervals: Components.Schemas.AbsenceInterval[];
                        /**
                         * End of the currently active absence interval, or null when the user is not absent.
                         */
                        absent_until: string | null; // date-time
                    };
                };
            }
            export type $400 = Components.Schemas.Error;
        }
    }
    namespace ShareEvent {
        namespace Parameters {
            export type EventId = string;
        }
        export interface PathParameters {
            event_id: Parameters.EventId;
        }
        export type RequestBody = Components.Schemas.ShareEventBody;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.Error;
            export type $403 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace UnshareEvent {
        namespace Parameters {
            export type EventId = string;
            export type UserId = string;
        }
        export interface PathParameters {
            event_id: Parameters.EventId;
            user_id: Parameters.UserId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $403 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace UpdateCalendar {
        namespace Parameters {
            export type CalendarId = string;
        }
        export interface PathParameters {
            calendar_id: Parameters.CalendarId;
        }
        export type RequestBody = Components.Schemas.CalendarPatchBody;
        namespace Responses {
            export type $200 = Components.Schemas.Calendar;
            export type $400 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
    namespace UpdateEvent {
        namespace Parameters {
            export type EventId = string;
        }
        export interface PathParameters {
            event_id: Parameters.EventId;
        }
        export type RequestBody = Components.Schemas.CalendarEventPatchBody;
        namespace Responses {
            export type $200 = Components.Schemas.CalendarEvent;
            export type $400 = Components.Schemas.Error;
            export type $403 = Components.Schemas.Error;
            export type $404 = Components.Schemas.Error;
        }
    }
}


export interface OperationMethods {
  /**
   * listUsersAbsence - listUsersAbsence
   * 
   * List organization users with known absence metadata in the requested time window.
   */
  'listUsersAbsence'(
    parameters?: Parameters<Paths.ListUsersAbsence.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListUsersAbsence.Responses.$200>
  /**
   * searchAbsence - searchAbsence
   * 
   * Search known absence for candidate users in the requested time window.
   */
  'searchAbsence'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchAbsence.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchAbsence.Responses.$200>
  /**
   * searchNowAbsence - searchNowAbsence
   * 
   * Search known absence for candidate users at the current server time.
   */
  'searchNowAbsence'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchNowAbsence.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchNowAbsence.Responses.$200>
  /**
   * listAbsenceAdjustments - listAbsenceAdjustments
   * 
   * List absence adjustments for a user in a time window.
   */
  'listAbsenceAdjustments'(
    parameters?: Parameters<Paths.ListAbsenceAdjustments.QueryParameters & Paths.ListAbsenceAdjustments.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListAbsenceAdjustments.Responses.$200>
  /**
   * createAbsenceAdjustment - createAbsenceAdjustment
   * 
   * Create a time-bound absence adjustment for a user in the caller organization.
   */
  'createAbsenceAdjustment'(
    parameters?: Parameters<Paths.CreateAbsenceAdjustment.PathParameters> | null,
    data?: Paths.CreateAbsenceAdjustment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateAbsenceAdjustment.Responses.$201>
  /**
   * getAbsenceAdjustment - getAbsenceAdjustment
   * 
   * Get an absence adjustment by ID.
   */
  'getAbsenceAdjustment'(
    parameters?: Parameters<Paths.GetAbsenceAdjustment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAbsenceAdjustment.Responses.$200>
  /**
   * patchAbsenceAdjustment - patchAbsenceAdjustment
   * 
   * Update an absence adjustment in the caller organization.
   */
  'patchAbsenceAdjustment'(
    parameters?: Parameters<Paths.PatchAbsenceAdjustment.PathParameters> | null,
    data?: Paths.PatchAbsenceAdjustment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchAbsenceAdjustment.Responses.$200>
  /**
   * deleteAbsenceAdjustment - deleteAbsenceAdjustment
   * 
   * Delete an absence adjustment.
   */
  'deleteAbsenceAdjustment'(
    parameters?: Parameters<Paths.DeleteAbsenceAdjustment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteAbsenceAdjustment.Responses.$204>
  /**
   * getUserAbsence - getUserAbsence
   * 
   * Get known absence for a user in a time window. absent=false means no known absence, not guaranteed availability.
   */
  'getUserAbsence'(
    parameters?: Parameters<Paths.GetUserAbsence.QueryParameters & Paths.GetUserAbsence.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserAbsence.Responses.$200>
  /**
   * getWorkingHours - getWorkingHours
   * 
   * Get the recurring weekly working hours of a user. 404 means no record exists and the user is treated as always available.
   */
  'getWorkingHours'(
    parameters?: Parameters<Paths.GetWorkingHours.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetWorkingHours.Responses.$200>
  /**
   * putWorkingHours - putWorkingHours
   * 
   * Create or fully replace the working hours of a user in the caller organization. This is a full replace, not a merge.
   */
  'putWorkingHours'(
    parameters?: Parameters<Paths.PutWorkingHours.PathParameters> | null,
    data?: Paths.PutWorkingHours.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutWorkingHours.Responses.$200>
  /**
   * deleteWorkingHours - deleteWorkingHours
   * 
   * Delete the working hours of a user. The user is then treated as always available again.
   */
  'deleteWorkingHours'(
    parameters?: Parameters<Paths.DeleteWorkingHours.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteWorkingHours.Responses.$204>
  /**
   * listCalendars - listCalendars
   * 
   * List calendars visible to the caller.
   */
  'listCalendars'(
    parameters?: Parameters<Paths.ListCalendars.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListCalendars.Responses.$200>
  /**
   * createCalendar - createCalendar
   * 
   * Create a native epilot calendar.
   */
  'createCalendar'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateCalendar.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateCalendar.Responses.$201>
  /**
   * addOutlookCalendar - addOutlookCalendar
   * 
   * Registers one of the caller's Outlook calendars as an epilot calendar.
   * 
   * The returned calendar resource carries `source.provider=outlook` and the
   * provider calendar id, so subsequent reads through `GET /v1/calendar` /
   * `GET /v1/calendar/events` route through the sync provider.
   */
  'addOutlookCalendar'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddOutlookCalendar.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddOutlookCalendar.Responses.$201>
  /**
   * listOutlookCalendars - listOutlookCalendars
   * 
   * Lists the calling user's Outlook calendars available to import as epilot calendars.
   * 
   * Requires the caller to have a personal Outlook calendar connection (created via the
   * OAuth flow on email-settings: `POST /v2/outlook/connect { "calendar": true }`).
   */
  'listOutlookCalendars'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListOutlookCalendars.Responses.$200>
  /**
   * deleteOutlookCalendar - deleteOutlookCalendar
   * 
   * Disconnects a previously registered Outlook calendar.
   * 
   * Deletes the Microsoft Graph subscription, removes the backing `calendar`
   * entity, and drops the local subscription record. Idempotent: a 404 from
   * Graph (subscription already gone) is treated as success.
   */
  'deleteOutlookCalendar'(
    parameters?: Parameters<Paths.DeleteOutlookCalendar.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteOutlookCalendar.Responses.$204>
  /**
   * outlookWebhook - outlookWebhook
   * 
   * Public Microsoft Graph webhook receiver for per-user Outlook calendar
   * subscriptions. Unauthenticated by design (API Gateway `Authorizer: NONE`):
   * Graph calls it with no epilot token.
   * 
   * Handles both the subscription-validation handshake (echoes the
   * `validationToken` query param as `text/plain`) and change notifications.
   * Each notification is trusted only after its HMAC-signed `clientState` is
   * verified and matched against the stored subscription – identity is never
   * read from the request body.
   */
  'outlookWebhook'(
    parameters?: Parameters<Paths.OutlookWebhook.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.OutlookWebhook.Responses.$200 | Paths.OutlookWebhook.Responses.$202>
  /**
   * getCalendar - getCalendar
   * 
   * Get a single calendar by its epilot ID.
   */
  'getCalendar'(
    parameters?: Parameters<Paths.GetCalendar.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCalendar.Responses.$200>
  /**
   * updateCalendar - updateCalendar
   * 
   * Update local calendar details. Changes to synced calendars do not modify the provider calendar.
   */
  'updateCalendar'(
    parameters?: Parameters<Paths.UpdateCalendar.PathParameters> | null,
    data?: Paths.UpdateCalendar.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateCalendar.Responses.$200>
  /**
   * deleteCalendar - deleteCalendar
   * 
   * Delete a native epilot calendar or disconnect a synced calendar, including its locally stored events.
   */
  'deleteCalendar'(
    parameters?: Parameters<Paths.DeleteCalendar.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteCalendar.Responses.$204>
  /**
   * listEvents - listEvents
   * 
   * List events in a time window. Recurring events are returned as expanded occurrences – each instance appears as its own event.
   */
  'listEvents'(
    parameters?: Parameters<Paths.ListEvents.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListEvents.Responses.$200>
  /**
   * createEvent - createEvent
   * 
   * Create a native epilot calendar event.
   */
  'createEvent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateEvent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateEvent.Responses.$201>
  /**
   * getEvent - getEvent
   * 
   * Get a single event by its epilot ID.
   */
  'getEvent'(
    parameters?: Parameters<Paths.GetEvent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEvent.Responses.$200>
  /**
   * updateEvent - updateEvent
   * 
   * Update a native epilot calendar event.
   */
  'updateEvent'(
    parameters?: Parameters<Paths.UpdateEvent.PathParameters> | null,
    data?: Paths.UpdateEvent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateEvent.Responses.$200>
  /**
   * deleteEvent - deleteEvent
   * 
   * Delete a native epilot calendar event.
   */
  'deleteEvent'(
    parameters?: Parameters<Paths.DeleteEvent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteEvent.Responses.$204>
  /**
   * shareEvent - shareEvent
   * 
   * Share a calendar event with another user of the same organization, view-only. Owner-only: recipients of a share cannot re-share. Sharing an already-shared event is a no-op.
   */
  'shareEvent'(
    parameters?: Parameters<Paths.ShareEvent.PathParameters> | null,
    data?: Paths.ShareEvent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShareEvent.Responses.$204>
  /**
   * unshareEvent - unshareEvent
   * 
   * Revoke a per-event share. The recipient loses access immediately. Owner-only.
   */
  'unshareEvent'(
    parameters?: Parameters<Paths.UnshareEvent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UnshareEvent.Responses.$204>
}

export interface PathsDictionary {
  ['/v1/calendar/absence/users']: {
    /**
     * listUsersAbsence - listUsersAbsence
     * 
     * List organization users with known absence metadata in the requested time window.
     */
    'get'(
      parameters?: Parameters<Paths.ListUsersAbsence.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListUsersAbsence.Responses.$200>
  }
  ['/v1/calendar/absence:search']: {
    /**
     * searchAbsence - searchAbsence
     * 
     * Search known absence for candidate users in the requested time window.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchAbsence.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchAbsence.Responses.$200>
  }
  ['/v1/calendar/absence:search-now']: {
    /**
     * searchNowAbsence - searchNowAbsence
     * 
     * Search known absence for candidate users at the current server time.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchNowAbsence.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchNowAbsence.Responses.$200>
  }
  ['/v1/calendar/absence/users/{user_id}/adjustments']: {
    /**
     * listAbsenceAdjustments - listAbsenceAdjustments
     * 
     * List absence adjustments for a user in a time window.
     */
    'get'(
      parameters?: Parameters<Paths.ListAbsenceAdjustments.QueryParameters & Paths.ListAbsenceAdjustments.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListAbsenceAdjustments.Responses.$200>
    /**
     * createAbsenceAdjustment - createAbsenceAdjustment
     * 
     * Create a time-bound absence adjustment for a user in the caller organization.
     */
    'post'(
      parameters?: Parameters<Paths.CreateAbsenceAdjustment.PathParameters> | null,
      data?: Paths.CreateAbsenceAdjustment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateAbsenceAdjustment.Responses.$201>
  }
  ['/v1/calendar/absence/users/{user_id}/adjustments/{adjustment_id}']: {
    /**
     * getAbsenceAdjustment - getAbsenceAdjustment
     * 
     * Get an absence adjustment by ID.
     */
    'get'(
      parameters?: Parameters<Paths.GetAbsenceAdjustment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAbsenceAdjustment.Responses.$200>
    /**
     * patchAbsenceAdjustment - patchAbsenceAdjustment
     * 
     * Update an absence adjustment in the caller organization.
     */
    'patch'(
      parameters?: Parameters<Paths.PatchAbsenceAdjustment.PathParameters> | null,
      data?: Paths.PatchAbsenceAdjustment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchAbsenceAdjustment.Responses.$200>
    /**
     * deleteAbsenceAdjustment - deleteAbsenceAdjustment
     * 
     * Delete an absence adjustment.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteAbsenceAdjustment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteAbsenceAdjustment.Responses.$204>
  }
  ['/v1/calendar/absence/users/{user_id}']: {
    /**
     * getUserAbsence - getUserAbsence
     * 
     * Get known absence for a user in a time window. absent=false means no known absence, not guaranteed availability.
     */
    'get'(
      parameters?: Parameters<Paths.GetUserAbsence.QueryParameters & Paths.GetUserAbsence.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserAbsence.Responses.$200>
  }
  ['/v1/calendar/working-hours/users/{user_id}']: {
    /**
     * getWorkingHours - getWorkingHours
     * 
     * Get the recurring weekly working hours of a user. 404 means no record exists and the user is treated as always available.
     */
    'get'(
      parameters?: Parameters<Paths.GetWorkingHours.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetWorkingHours.Responses.$200>
    /**
     * putWorkingHours - putWorkingHours
     * 
     * Create or fully replace the working hours of a user in the caller organization. This is a full replace, not a merge.
     */
    'put'(
      parameters?: Parameters<Paths.PutWorkingHours.PathParameters> | null,
      data?: Paths.PutWorkingHours.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutWorkingHours.Responses.$200>
    /**
     * deleteWorkingHours - deleteWorkingHours
     * 
     * Delete the working hours of a user. The user is then treated as always available again.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteWorkingHours.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteWorkingHours.Responses.$204>
  }
  ['/v1/calendar']: {
    /**
     * listCalendars - listCalendars
     * 
     * List calendars visible to the caller.
     */
    'get'(
      parameters?: Parameters<Paths.ListCalendars.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListCalendars.Responses.$200>
    /**
     * createCalendar - createCalendar
     * 
     * Create a native epilot calendar.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateCalendar.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateCalendar.Responses.$201>
  }
  ['/v1/calendar/sources/outlook']: {
    /**
     * addOutlookCalendar - addOutlookCalendar
     * 
     * Registers one of the caller's Outlook calendars as an epilot calendar.
     * 
     * The returned calendar resource carries `source.provider=outlook` and the
     * provider calendar id, so subsequent reads through `GET /v1/calendar` /
     * `GET /v1/calendar/events` route through the sync provider.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddOutlookCalendar.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddOutlookCalendar.Responses.$201>
  }
  ['/v1/calendar/sources/outlook/available']: {
    /**
     * listOutlookCalendars - listOutlookCalendars
     * 
     * Lists the calling user's Outlook calendars available to import as epilot calendars.
     * 
     * Requires the caller to have a personal Outlook calendar connection (created via the
     * OAuth flow on email-settings: `POST /v2/outlook/connect { "calendar": true }`).
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListOutlookCalendars.Responses.$200>
  }
  ['/v1/calendar/sources/outlook/{calendar_id}']: {
    /**
     * deleteOutlookCalendar - deleteOutlookCalendar
     * 
     * Disconnects a previously registered Outlook calendar.
     * 
     * Deletes the Microsoft Graph subscription, removes the backing `calendar`
     * entity, and drops the local subscription record. Idempotent: a 404 from
     * Graph (subscription already gone) is treated as success.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteOutlookCalendar.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteOutlookCalendar.Responses.$204>
  }
  ['/v1/calendar/outlook/webhook']: {
    /**
     * outlookWebhook - outlookWebhook
     * 
     * Public Microsoft Graph webhook receiver for per-user Outlook calendar
     * subscriptions. Unauthenticated by design (API Gateway `Authorizer: NONE`):
     * Graph calls it with no epilot token.
     * 
     * Handles both the subscription-validation handshake (echoes the
     * `validationToken` query param as `text/plain`) and change notifications.
     * Each notification is trusted only after its HMAC-signed `clientState` is
     * verified and matched against the stored subscription – identity is never
     * read from the request body.
     */
    'post'(
      parameters?: Parameters<Paths.OutlookWebhook.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.OutlookWebhook.Responses.$200 | Paths.OutlookWebhook.Responses.$202>
  }
  ['/v1/calendar/{calendar_id}']: {
    /**
     * getCalendar - getCalendar
     * 
     * Get a single calendar by its epilot ID.
     */
    'get'(
      parameters?: Parameters<Paths.GetCalendar.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCalendar.Responses.$200>
    /**
     * updateCalendar - updateCalendar
     * 
     * Update local calendar details. Changes to synced calendars do not modify the provider calendar.
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateCalendar.PathParameters> | null,
      data?: Paths.UpdateCalendar.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateCalendar.Responses.$200>
    /**
     * deleteCalendar - deleteCalendar
     * 
     * Delete a native epilot calendar or disconnect a synced calendar, including its locally stored events.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteCalendar.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteCalendar.Responses.$204>
  }
  ['/v1/calendar/events']: {
    /**
     * listEvents - listEvents
     * 
     * List events in a time window. Recurring events are returned as expanded occurrences – each instance appears as its own event.
     */
    'get'(
      parameters?: Parameters<Paths.ListEvents.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListEvents.Responses.$200>
    /**
     * createEvent - createEvent
     * 
     * Create a native epilot calendar event.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateEvent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateEvent.Responses.$201>
  }
  ['/v1/calendar/events/{event_id}']: {
    /**
     * getEvent - getEvent
     * 
     * Get a single event by its epilot ID.
     */
    'get'(
      parameters?: Parameters<Paths.GetEvent.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEvent.Responses.$200>
    /**
     * updateEvent - updateEvent
     * 
     * Update a native epilot calendar event.
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateEvent.PathParameters> | null,
      data?: Paths.UpdateEvent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateEvent.Responses.$200>
    /**
     * deleteEvent - deleteEvent
     * 
     * Delete a native epilot calendar event.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteEvent.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteEvent.Responses.$204>
  }
  ['/v1/calendar/events/{event_id}/share']: {
    /**
     * shareEvent - shareEvent
     * 
     * Share a calendar event with another user of the same organization, view-only. Owner-only: recipients of a share cannot re-share. Sharing an already-shared event is a no-op.
     */
    'post'(
      parameters?: Parameters<Paths.ShareEvent.PathParameters> | null,
      data?: Paths.ShareEvent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShareEvent.Responses.$204>
  }
  ['/v1/calendar/events/{event_id}/share/{user_id}']: {
    /**
     * unshareEvent - unshareEvent
     * 
     * Revoke a per-event share. The recipient loses access immediately. Owner-only.
     */
    'delete'(
      parameters?: Parameters<Paths.UnshareEvent.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UnshareEvent.Responses.$204>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AbsenceAdjustment = Components.Schemas.AbsenceAdjustment;
export type AbsenceInterval = Components.Schemas.AbsenceInterval;
export type AbsenceIntervalSource = Components.Schemas.AbsenceIntervalSource;
export type AbsenceStatus = Components.Schemas.AbsenceStatus;
export type AbsenceType = Components.Schemas.AbsenceType;
export type AddOutlookCalendarRequest = Components.Schemas.AddOutlookCalendarRequest;
export type Attendee = Components.Schemas.Attendee;
export type AvailableOutlookCalendar = Components.Schemas.AvailableOutlookCalendar;
export type Calendar = Components.Schemas.Calendar;
export type CalendarCreateBody = Components.Schemas.CalendarCreateBody;
export type CalendarEvent = Components.Schemas.CalendarEvent;
export type CalendarEventCreateBody = Components.Schemas.CalendarEventCreateBody;
export type CalendarEventPatchBody = Components.Schemas.CalendarEventPatchBody;
export type CalendarPatchBody = Components.Schemas.CalendarPatchBody;
export type CalendarSource = Components.Schemas.CalendarSource;
export type CreateAbsenceAdjustmentBody = Components.Schemas.CreateAbsenceAdjustmentBody;
export type Error = Components.Schemas.Error;
export type EventSource = Components.Schemas.EventSource;
export type EventStatus = Components.Schemas.EventStatus;
export type EventType = Components.Schemas.EventType;
export type ExternalCalendar = Components.Schemas.ExternalCalendar;
export type Importance = Components.Schemas.Importance;
export type PatchAbsenceAdjustmentBody = Components.Schemas.PatchAbsenceAdjustmentBody;
export type Provider = Components.Schemas.Provider;
export type ResponseStatus = Components.Schemas.ResponseStatus;
export type SearchAbsenceBody = Components.Schemas.SearchAbsenceBody;
export type SearchNowAbsenceBody = Components.Schemas.SearchNowAbsenceBody;
export type Sensitivity = Components.Schemas.Sensitivity;
export type ShareEventBody = Components.Schemas.ShareEventBody;
export type TimeWindow = Components.Schemas.TimeWindow;
export type UpsertWorkingHoursBody = Components.Schemas.UpsertWorkingHoursBody;
export type WorkingHours = Components.Schemas.WorkingHours;
