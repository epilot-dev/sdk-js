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
        export interface Attendee {
            email: string; // email
            name?: string | null;
            response: /* Caller's response to the invite */ ResponseStatus;
            type: "required" | "optional" | "resource";
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
             * True if the caller cannot modify events in this calendar
             */
            read_only: boolean;
            owner_email?: string | null; // email
            source: CalendarSource;
            _created_at?: string; // date-time
            _updated_at?: string; // date-time
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
            is_cancelled: boolean;
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
            is_recurring: boolean;
            /**
             * ID of the recurring series this occurrence belongs to
             */
            series_master_id?: string | null;
            source: EventSource;
            _created_at?: string; // date-time
            _updated_at?: string; // date-time
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
        export interface Error {
            message: string;
            code?: string;
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
        export type Importance = "low" | "normal" | "high";
        /**
         * Null for native epilot calendars
         */
        export type Provider = "outlook" | "google" | null;
        /**
         * Caller's response to the invite
         */
        export type ResponseStatus = "none" | "organizer" | "tentativelyAccepted" | "accepted" | "declined" | "notResponded";
        export type Sensitivity = "normal" | "personal" | "private" | "confidential";
    }
}
export declare namespace Paths {
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
}


export interface OperationMethods {
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
   * getEvent - getEvent
   * 
   * Get a single event by its epilot ID.
   */
  'getEvent'(
    parameters?: Parameters<Paths.GetEvent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEvent.Responses.$200>
}

export interface PathsDictionary {
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
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Attendee = Components.Schemas.Attendee;
export type Calendar = Components.Schemas.Calendar;
export type CalendarEvent = Components.Schemas.CalendarEvent;
export type CalendarSource = Components.Schemas.CalendarSource;
export type Error = Components.Schemas.Error;
export type EventSource = Components.Schemas.EventSource;
export type EventStatus = Components.Schemas.EventStatus;
export type EventType = Components.Schemas.EventType;
export type Importance = Components.Schemas.Importance;
export type Provider = Components.Schemas.Provider;
export type ResponseStatus = Components.Schemas.ResponseStatus;
export type Sensitivity = Components.Schemas.Sensitivity;
