import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Parameters {
        export type ActivityIdQueryParam = /**
         * See https://github.com/ulid/spec
         * example:
         * 01F130Q52Q6MWSNS8N2AVXV4JN
         */
        Schemas.ActivityId /* ulid */;
        export type CounterIdParam = Schemas.Id;
        export type CreateTicketQueryParam = boolean;
        export type DirectQueryParam = boolean;
        export type IncludePendingChangesetsQueryParam = boolean;
        export type MeterIdParam = Schemas.Id;
        export type SkipValidationQueryParam = boolean;
    }
    export interface PathParameters {
        MeterIdParam?: Parameters.MeterIdParam;
        CounterIdParam?: Parameters.CounterIdParam;
    }
    export interface QueryParameters {
        DirectQueryParam?: Parameters.DirectQueryParam;
        IncludePendingChangesetsQueryParam?: Parameters.IncludePendingChangesetsQueryParam;
        ActivityIdQueryParam?: Parameters.ActivityIdQueryParam;
        CreateTicketQueryParam?: Parameters.CreateTicketQueryParam;
        SkipValidationQueryParam?: Parameters.SkipValidationQueryParam;
    }
    namespace Responses {
        export type Forbidden = Schemas.ErrorResp;
        export type InternalServerError = Schemas.ErrorResp;
        export type InvalidRequest = Schemas.ErrorResp;
        export interface InvalidRequestCreateMeterReading {
            /**
             * Error message
             */
            message?: string;
            reason?: "contract_period" | "no_counter" | "no_direction" | "timestamp_future" | "less_than_previous" | "greater_than_subsequent" | "meter_decommissioned";
        }
        export interface InvalidRequestCreateMeterReadingFromSubmission {
            /**
             * Error message
             */
            message?: string;
            reason?: "timestamp_future" | "less_than_previous" | "greater_than_subsequent";
        }
        export interface InvalidRequestCreateMeterReadings {
            /**
             * Error message
             */
            message?: string;
            reason?: "too_many_records" | "timestamp_future" | "duplicate_reading" | "less_than_previous" | "invalid_identifiers" | "multiple_readings_found";
        }
        export interface InvalidRequestCreateReadingWithMeter {
            /**
             * Error message
             */
            message?: string;
            reason?: "missing_params" | "timestamp_future" | "less_than_previous" | "contract_period" | "greater_than_subsequent";
        }
        export interface InvalidRequestUpdateMeter {
            /**
             * Error message
             */
            message?: string;
            reason?: "missing_params";
        }
        export interface InvalidRequestUpdateMeterReading {
            /**
             * Error message
             */
            message?: string;
            reason?: "missing_params" | "timestamp_future" | "less_than_previous" | "greater_than_subsequent";
        }
        export type NotFound = Schemas.ErrorResp;
        export type Unauthorized = Schemas.ErrorResp;
    }
    namespace Schemas {
        export interface ActionLabel {
            en?: string | null;
            de?: string | null;
        }
        /**
         * See https://github.com/ulid/spec
         * example:
         * 01F130Q52Q6MWSNS8N2AVXV4JN
         */
        export type ActivityId = string; // ulid
        export interface BaseEntity {
            /**
             * Entity ID
             * example:
             * 3fa85f64-5717-4562-b3fc-2c963f66afa6
             */
            _id: EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
        }
        /**
         * A meter reading for batch operations. The required fields depend on the operation:
         * - create/update: requires value, source, and meter_id
         * - delete: only requires the fields specified in the identifiers parameter
         *
         */
        export type BatchReading = /**
         * A meter reading for batch operations. The required fields depend on the operation:
         * - create/update: requires value, source, and meter_id
         * - delete: only requires the fields specified in the identifiers parameter
         *
         */
        /* Schema for create or update operations - requires value, source, and meter_id */ CreateOrUpdateBatchReading | /* Schema for delete operations - only requires identifier fields specified in the identifiers parameter */ DeleteBatchReading;
        /**
         * Base properties shared by all batch reading operations
         */
        export interface BatchReadingBase {
            /**
             * The ID of the associated meter
             */
            meter_id?: EntityId /* uuid */;
            /**
             * The ID of the associated meter counter
             */
            counter_id?: EntityId /* uuid */;
            /**
             * The direction of the reading (feed-in or feed-out)
             */
            direction?: Direction;
            /**
             * The timestamp of the reading. If not provided, the system will use the current time.
             * example:
             * 2022-10-10T10:00:00Z
             */
            timestamp?: string; // date-time
            /**
             * The external ID of the reading
             */
            external_id?: string;
            /**
             * Additional metadata for the reading
             * example:
             * {
             *   "registration_id": "1234567890",
             *   "business_unit": "ABC"
             * }
             */
            metadata?: {
                [name: string]: string;
            };
        }
        export interface ChangesetCreator {
            type?: "user" | "portal_user" | "api_client" | "automation";
            id?: string;
        }
        export interface CounterReadingOnSubmission {
            /**
             * The ID of the associated meter counter
             */
            counterId: Id;
            /**
             * The direction of the reading (feed-in or feed-out)
             */
            direction: Direction;
            unit?: Unit;
            /**
             * The reading value of the meter counter
             * example:
             * 240
             */
            value: number;
        }
        /**
         * Schema for create or update operations - requires value, source, and meter_id
         */
        export interface CreateOrUpdateBatchReading {
            meter_id: EntityId /* uuid */;
            counter_id?: EntityId /* uuid */;
            direction?: Direction;
            /**
             * The timestamp of the reading. If not provided, the system will use the current time.
             * example:
             * 2022-10-10T10:00:00Z
             */
            timestamp?: string; // date-time
            /**
             * The external ID of the reading
             */
            external_id?: string;
            /**
             * Additional metadata for the reading
             * example:
             * {
             *   "registration_id": "1234567890",
             *   "business_unit": "ABC"
             * }
             */
            metadata?: {
                [name: string]: string;
            };
            /**
             * The operation to perform. Defaults to "create" if omitted.
             */
            operation?: "create" | "update";
            /**
             * The reading value of the meter
             * example:
             * 240
             */
            value: number;
            source: Source;
            read_by?: /**
             * The person who recorded the reading
             * example:
             * John Doe
             */
            ReadBy;
            reason?: /**
             * The reason for recording the reading
             * If no reason is specified or left empty, the Epilot UI will show 'Regular' as the default display text
             *
             */
            Reason;
            status?: ReadingStatus;
            /**
             * A remark or comment for the reading
             * example:
             * Customer reported unusual consumption
             */
            remark?: string | null;
            /**
             * Notes to record a meter reading
             */
            note?: string;
            unit?: Unit;
        }
        /**
         * Schema for delete operations - only requires identifier fields specified in the identifiers parameter
         */
        export interface DeleteBatchReading {
            meter_id?: EntityId /* uuid */;
            counter_id?: EntityId /* uuid */;
            direction?: Direction;
            /**
             * The timestamp of the reading. If not provided, the system will use the current time.
             * example:
             * 2022-10-10T10:00:00Z
             */
            timestamp?: string; // date-time
            /**
             * The external ID of the reading
             */
            external_id?: string;
            /**
             * Additional metadata for the reading
             * example:
             * {
             *   "registration_id": "1234567890",
             *   "business_unit": "ABC"
             * }
             */
            metadata?: {
                [name: string]: string;
            };
            /**
             * The operation to perform (must be "delete")
             */
            operation: "delete";
        }
        export type Direction = "feed-in" | "feed-out";
        export interface Entity {
            [name: string]: any;
        }
        export type EntityId = string; // uuid
        export interface EntityItem {
            [name: string]: any;
            _id: EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
        }
        export interface EntityRelation {
            entity_id?: EntityId /* uuid */;
            _slug?: "contact" | "contract";
        }
        /**
         * URL-friendly identifier for the entity schema
         * example:
         * contact
         */
        export type EntitySlug = string;
        export interface ErrorResp {
            /**
             * Error message
             */
            message?: string;
        }
        /**
         * Numeric-threshold fuzzy matching for meter reading auto-clear.
         *
         * NOTE: This is intentionally different from entity-api's FuzzyConfig. Entity-api's
         * fuzzy strategies (suffix, digits_only, normalize_phone, ignore_fields,
         * contains_entry, regex) are designed for strings and structured objects (IBAN, phone
         * numbers, arrays of relations). Meter readings are purely numeric, so numeric
         * tolerance (percentage + absolute) is the right primitive. Do not try to unify
         * these two types — they serve different domains.
         *
         * When match_strategy is 'fuzzy', the auto-clear logic uses these thresholds to
         * decide whether an incoming ERP value is "close enough" to the proposed value.
         * If both percentage_threshold and absolute_threshold are provided, a match
         * succeeds if either threshold is satisfied (logical OR).
         *
         */
        export interface FuzzyConfig {
            /**
             * Percentage threshold (0-1). 0.01 = 1%. Default 0.01.
             */
            percentage_threshold?: number;
            /**
             * Absolute threshold in the reading's unit.
             */
            absolute_threshold?: number;
        }
        export type Id = string;
        export interface JourneyActions {
            journey_id?: string | null;
            action_label?: ActionLabel;
            slug?: string | null;
            rules?: Rule[] | null;
        }
        export interface Meter {
            _id: EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
            /**
             * The schema type of the meter
             */
            _schema: "meter";
            /**
             * The MA-LO ID of the meter
             * example:
             * A09-123
             */
            ma_lo_id?: string;
            /**
             * The status of the meter
             */
            status?: "active" | "decommissioned";
            /**
             * The type of the meter
             */
            meter_type?: "three-phase-meter" | "bellow-gas-meter" | "rotary-piston-meter" | "smart-meter" | "performance-meter" | "maximum-meter" | "turbine-gas-meter" | "ultrasonic-gas-meter" | "alternating-current-meter" | "modern-metering-system" | "intelligent-measuring-system" | "electronic-meter";
            /**
             * The tariff type of the meter
             * example:
             * Peak load tariff
             */
            tariff_type?: string;
            /**
             * The number of the meter
             * example:
             * J-1093-1AK
             */
            meter_number?: string;
            /**
             * The sector to which the meter belongs
             */
            sector?: "power" | "water" | "gas" | "district_heating" | "waste_water";
            /**
             * The location information of the meter
             * example:
             * [
             *   {
             *     "country": "Germany",
             *     "city": "Koln",
             *     "postal_code": 81475,
             *     "street": "Melatengürtel",
             *     "street_number": 71,
             *     "additional_info": "5. Etage",
             *     "_tags": [
             *       "billing",
             *       "delivery"
             *     ]
             *   }
             * ]
             */
            location?: {
                [key: string]: any;
            };
            /**
             * The usage purpose of the meter
             * example:
             * Domestic Usage
             */
            used_for?: string;
            /**
             * The manufacturer of the meter
             * example:
             * Energy One
             */
            manufacturer?: string;
            /**
             * The calibration date of the meter
             * example:
             * 2022-10-10
             */
            calibration_date?: string;
            /**
             * The contract associated with the meter
             */
            contract?: {
                $relation?: EntityRelation[];
            };
            /**
             * The customer associated with the meter
             */
            customer?: {
                $relation?: EntityRelation[];
            };
        }
        export interface MeterCounter {
            _id: EntityId /* uuid */;
            /**
             * Title of the entity
             * example:
             * Example Entity
             */
            _title: string;
            /**
             * Organization ID the entity belongs to
             * example:
             * 123
             */
            _org: string;
            /**
             * Array of entity tags
             * example:
             * [
             *   "example",
             *   "mock"
             * ]
             */
            _tags?: string[];
            /**
             * Creation timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _created_at: string; // date-time
            /**
             * Last update timestamp of the entity
             * example:
             * 2021-02-09T12:41:43.662Z
             */
            _updated_at: string; // date-time
            _schema: "meter_counter";
            /**
             * The OBIS number of the meter counter
             * example:
             * A-34
             */
            obis_number?: string;
            direction?: Direction;
            /**
             * The transformer ratio of the meter counter
             * example:
             * 70
             */
            transformer_ratio?: number;
            unit?: Unit;
            /**
             * The forecast reading value of the meter counter
             * example:
             * 270
             */
            forecast_reading_value?: string;
            /**
             * The date as of which the forecast reading value is applicable
             * example:
             * 2022-12-10
             */
            forecast_as_of?: string;
            /**
             * The current consumption value of the meter counter
             * example:
             * 240
             */
            current_consumption?: number;
            /**
             * The timestamp of the last reading
             * example:
             * 2022-10-10
             */
            last_reading?: string;
            /**
             * The conversion factor for the meter counter
             * example:
             * 3
             */
            conversion_factor?: number;
            tariff_type?: TariffType;
        }
        export interface MeterReading {
            /**
             * The reading value of the meter
             * example:
             * 240
             */
            value: number;
            read_by?: /**
             * The person who recorded the reading
             * example:
             * John Doe
             */
            ReadBy;
            reason?: /**
             * The reason for recording the reading
             * If no reason is specified or left empty, the Epilot UI will show 'Regular' as the default display text
             *
             */
            Reason;
            meter_id: EntityId /* uuid */;
            counter_id?: EntityId /* uuid */;
            direction?: Direction;
            /**
             * If the value is not provided, the system will be set with the time the request is processed.
             * example:
             * 2022-10-10
             */
            timestamp?: string; // date-time
            source: Source;
            status?: ReadingStatus;
            /**
             * The external ID of the reading
             */
            external_id?: string;
            /**
             * A remark or comment for the reading
             * example:
             * Customer reported unusual consumption
             */
            remark?: string | null;
            /**
             * Additional metadata for the reading
             * example:
             * {
             *   "registration_id": "1234567890",
             *   "business_unit": "ABC"
             * }
             */
            metadata?: {
                [name: string]: string;
            };
            /**
             * Notes to record a meter reading
             */
            note?: string;
            unit?: Unit;
        }
        export interface MeterReadingChangeset {
            /**
             * Unique changeset identifier (UUID v4)
             */
            changeset_id: string;
            meter_id?: string; // uuid
            counter_id?: string; // uuid
            proposed: ProposedReading;
            /**
             * Snapshot of the reading at changeset creation time
             */
            previous?: ProposedReading;
            edit_mode: "external" | "approval";
            match_strategy?: "exact" | "fuzzy";
            timestamp_tolerance?: /**
             * Slack on `reading.timestamp` when auto-clear matches an incoming reading
             * against a pending changeset. Both sides reference the SAME physical
             * meter-read event — one as stored when the user submitted, the other as
             * echoed back by the ERP. The tolerance accommodates round-trip format
             * drift between the two writes.
             *
             * Variants:
             * - `'exact'`: strict millisecond equality. Right when both sides
             *   round-trip the timestamp cleanly.
             * - `{ type: 'same-day', timezone? }`: strip the time component and
             *   compare year-month-day. Use this when the ERP emits date-only
             *   readings (the inbound pipeline promotes those to midnight UTC).
             *   Optional `timezone` is an IANA name (e.g. `'Europe/Berlin'`); the
             *   day is bucketed in that zone. Defaults to UTC when omitted. Set
             *   a local zone for tenants whose readings are taken near midnight
             *   in non-UTC timezones — UTC bucketing would otherwise split such
             *   readings across two day-buckets and miss matches.
             * - `{ type: 'within-seconds', seconds }`: symmetric ±N-second
             *   window. Use for sub-minute normalization drift (`seconds: 60`).
             *
             */
            TimestampTolerance;
            created_at: string; // date-time
            created_by?: ChangesetCreator;
            source?: "360" | "ECP" | "ERP" | "journey-submission";
            fuzzy_config?: /**
             * Numeric-threshold fuzzy matching for meter reading auto-clear.
             *
             * NOTE: This is intentionally different from entity-api's FuzzyConfig. Entity-api's
             * fuzzy strategies (suffix, digits_only, normalize_phone, ignore_fields,
             * contains_entry, regex) are designed for strings and structured objects (IBAN, phone
             * numbers, arrays of relations). Meter readings are purely numeric, so numeric
             * tolerance (percentage + absolute) is the right primitive. Do not try to unify
             * these two types — they serve different domains.
             *
             * When match_strategy is 'fuzzy', the auto-clear logic uses these thresholds to
             * decide whether an incoming ERP value is "close enough" to the proposed value.
             * If both percentage_threshold and absolute_threshold are provided, a match
             * succeeds if either threshold is satisfied (logical OR).
             *
             */
            FuzzyConfig;
            /**
             * Reason for dismissing the changeset. Only present in the dismiss HTTP response
             * and on the unified `MeterReadings` EventBridge event payload (when the
             * `activity_type` discriminator is `ChangesetDismissed`). Not persisted —
             * the event stream is the authoritative audit trail (aligned with entity-api's
             * approach where dismissal context lives in the activity record).
             *
             */
            dismissed_reason?: string;
            /**
             * ISO 8601 timestamp of when the changeset was dismissed. Like dismissed_reason,
             * this is only present in the dismiss response and EventBridge event, not persisted.
             *
             */
            dismissed_at?: string; // date-time
        }
        export interface PortalMeterReading {
            /**
             * The reading value of the meter
             * example:
             * 240
             */
            value: number;
            read_by?: /**
             * The person who recorded the reading
             * example:
             * John Doe
             */
            ReadBy;
            reason?: /**
             * The reason for recording the reading
             * If no reason is specified or left empty, the Epilot UI will show 'Regular' as the default display text
             *
             */
            Reason;
            meter_id?: EntityId /* uuid */;
            counter_id: EntityId /* uuid */;
            direction?: Direction;
            /**
             * If the value is not provided, the system will be set with the time the request is processed.
             * example:
             * 2022-10-10
             */
            timestamp?: string; // date-time
            source: Source;
            status?: ReadingStatus;
            /**
             * The external ID of the reading
             */
            external_id?: string;
            /**
             * A remark or comment for the reading
             * example:
             * Customer reported unusual consumption
             */
            remark?: string | null;
            /**
             * Additional metadata for the reading
             * example:
             * {
             *   "registration_id": "1234567890",
             *   "business_unit": "ABC"
             * }
             */
            metadata?: {
                [name: string]: string;
            };
            /**
             * Notes to record a meter reading
             */
            note?: string;
            unit?: Unit;
        }
        export interface ProposedReading {
            value: number;
            direction?: "feed-in" | "feed-out";
            timestamp?: string; // date-time
            reason?: string;
            remark?: string;
            read_by?: string;
            status?: "valid" | "in-validation" | "implausible";
            external_id?: string;
        }
        export interface PruneMeterReadingsPayload {
            /**
             * The ID of the meter whose readings are pruned
             */
            meter_id: EntityId /* uuid */;
            /**
             * Optionally narrows the prune scope to a single counter of the meter
             */
            counter_id?: EntityId /* uuid */;
            /**
             * Optionally only prune readings with this source (e.g. `ERP`)
             */
            source?: Source;
            /**
             * Readings whose `external_id` is contained in this list are kept; every other reading in scope is deleted.
             * An empty array deletes all readings in scope (subject to the no-external-id rule described on the endpoint).
             * Limited to 10000 entries.
             *
             * example:
             * [
             *   "erp-reading-1",
             *   "erp-reading-2"
             * ]
             */
            keep_external_ids: string[];
        }
        /**
         * The person who recorded the reading
         * example:
         * John Doe
         */
        export type ReadBy = string | null;
        export interface Reading {
            /**
             * The reading value of the meter
             * example:
             * 240
             */
            value: number;
            read_by?: /**
             * The person who recorded the reading
             * example:
             * John Doe
             */
            ReadBy;
            reason?: /**
             * The reason for recording the reading
             * If no reason is specified or left empty, the Epilot UI will show 'Regular' as the default display text
             *
             */
            Reason;
            /**
             * The ID of the associated meter
             */
            meter_id?: EntityId /* uuid */;
            /**
             * The ID of the associated meter counter
             */
            counter_id?: EntityId /* uuid */;
            /**
             * The direction of the reading (feed-in or feed-out)
             */
            direction?: Direction;
            /**
             * If the value is not provided, the system will be set with the time the request is processed.
             * example:
             * 2022-10-10
             */
            timestamp?: string; // date-time
            /**
             * The source of the reading
             */
            source: Source;
            /**
             * The status of the reading
             */
            status?: ReadingStatus;
            /**
             * The external ID of the reading
             */
            external_id?: string;
            /**
             * A remark or comment for the reading
             * example:
             * Customer reported unusual consumption
             */
            remark?: string | null;
            /**
             * Additional metadata for the reading
             * example:
             * {
             *   "registration_id": "1234567890",
             *   "business_unit": "ABC"
             * }
             */
            metadata?: {
                [name: string]: string;
            };
            /**
             * Notes to record a meter reading
             */
            note?: string;
            /**
             * The unit of measurement for the reading
             */
            unit?: Unit;
        }
        export type ReadingStatus = "valid" | "in-validation" | "implausible" | null | "";
        export interface ReadingWithMeter {
            /**
             * The MA-LO ID of the meter
             * example:
             * A09-123
             */
            ma_lo_id?: string;
            /**
             * The ID of the associated meter
             */
            meter_id?: Id;
            /**
             * The OBIS number of the meter counter
             * example:
             * A-34
             */
            obis_number?: string;
            /**
             * The unit of measurement for the reading
             */
            unit?: Unit;
            /**
             * The direction of the reading
             */
            direction?: Direction;
            /**
             * The tariff type of the reading
             */
            tariff_type?: TariffType;
            /**
             * The reading value
             * example:
             * 240
             */
            value?: number;
            read_by?: /**
             * The person who recorded the reading
             * example:
             * John Doe
             */
            ReadBy;
            reason?: /**
             * The reason for recording the reading
             * If no reason is specified or left empty, the Epilot UI will show 'Regular' as the default display text
             *
             */
            Reason;
            /**
             * If the value is not provided, the system will be set with the time the request is processed.
             * example:
             * 2022-10-10T10:10:00.000Z
             */
            timestamp?: string;
            /**
             * The source of the reading
             */
            source?: Source;
        }
        /**
         * The reason for recording the reading
         * If no reason is specified or left empty, the Epilot UI will show 'Regular' as the default display text
         *
         */
        export type Reason = "" | "regular" | "irregular" | "last" | "first" | "meter_change" | "contract_change" | "meter_adjustment";
        /**
         * This field is deprecated. Please use the Reason enum instead.
         *
         */
        export type ReasonString = string | null;
        export interface Rule {
            entity?: string | null;
            attribute?: string | null;
            attribute_value?: string | null;
        }
        export type Source = "ECP" | "ERP" | "360" | "journey-submission";
        export type SubmissionMeterReading = {
            /**
             * The ID of the associated meter
             */
            meterId: Id;
            /**
             * - The counter readings of a meter
             * - This is only sent when the user is authenticated while submitting a journey
             *
             */
            readings?: CounterReadingOnSubmission[];
            /**
             * The reading value of the meter when the counterId is passed or when the meterType is one-tariff
             * example:
             * 240
             */
            readingValue?: number;
            /**
             * If the value is not provided, the system will be set with the time the request is processed.
             * example:
             * 2022-10-10T10:10:00.000Z
             */
            readingDate?: string;
            /**
             * The person who recorded the reading
             * example:
             * John Doe
             */
            readBy?: string;
            reason?: /**
             * The reason for recording the reading
             * If no reason is specified or left empty, the Epilot UI will show 'Regular' as the default display text
             *
             */
            Reason;
            /**
             * The MA-LO ID of the meter
             * example:
             * A09-123
             */
            maloId?: string;
            /**
             * The OBIS number of the meter counter
             * example:
             * A-34
             */
            obisNumber?: string;
            /**
             * The unit of measurement for the reading
             */
            readingUnit?: Unit;
            /**
             * The type of the meter
             */
            meterType?: "one_tariff" | "two_tariff" | "bi_directional";
            /**
             * The feed-in value of the meter when meterType is one-tariff or bi-directional
             * example:
             * 240
             */
            feedInValue?: number;
            /**
             * The feed-out value of the meter when meterType is bi-directional
             * example:
             * 240
             */
            feedOutValue?: number;
            /**
             * The high-peak tariff value of the meter when meterType is two-tariff
             * example:
             * 240
             */
            htValue?: number;
            /**
             * The off-peak tariff value of the meter when meterType is two-tariff
             * example:
             * 240
             */
            ntValue?: number;
        } | null;
        export type TariffType = "ht" | "nt";
        /**
         * Slack on `reading.timestamp` when auto-clear matches an incoming reading
         * against a pending changeset. Both sides reference the SAME physical
         * meter-read event — one as stored when the user submitted, the other as
         * echoed back by the ERP. The tolerance accommodates round-trip format
         * drift between the two writes.
         *
         * Variants:
         * - `'exact'`: strict millisecond equality. Right when both sides
         *   round-trip the timestamp cleanly.
         * - `{ type: 'same-day', timezone? }`: strip the time component and
         *   compare year-month-day. Use this when the ERP emits date-only
         *   readings (the inbound pipeline promotes those to midnight UTC).
         *   Optional `timezone` is an IANA name (e.g. `'Europe/Berlin'`); the
         *   day is bucketed in that zone. Defaults to UTC when omitted. Set
         *   a local zone for tenants whose readings are taken near midnight
         *   in non-UTC timezones — UTC bucketing would otherwise split such
         *   readings across two day-buckets and miss matches.
         * - `{ type: 'within-seconds', seconds }`: symmetric ±N-second
         *   window. Use for sub-minute normalization drift (`seconds: 60`).
         *
         */
        export type TimestampTolerance = /**
         * Slack on `reading.timestamp` when auto-clear matches an incoming reading
         * against a pending changeset. Both sides reference the SAME physical
         * meter-read event — one as stored when the user submitted, the other as
         * echoed back by the ERP. The tolerance accommodates round-trip format
         * drift between the two writes.
         *
         * Variants:
         * - `'exact'`: strict millisecond equality. Right when both sides
         *   round-trip the timestamp cleanly.
         * - `{ type: 'same-day', timezone? }`: strip the time component and
         *   compare year-month-day. Use this when the ERP emits date-only
         *   readings (the inbound pipeline promotes those to midnight UTC).
         *   Optional `timezone` is an IANA name (e.g. `'Europe/Berlin'`); the
         *   day is bucketed in that zone. Defaults to UTC when omitted. Set
         *   a local zone for tenants whose readings are taken near midnight
         *   in non-UTC timezones — UTC bucketing would otherwise split such
         *   readings across two day-buckets and miss matches.
         * - `{ type: 'within-seconds', seconds }`: symmetric ±N-second
         *   window. Use for sub-minute normalization drift (`seconds: 60`).
         *
         */
        ("exact") | {
            type: "same-day";
            /**
             * IANA timezone identifier (e.g. `'Europe/Berlin'`, `'UTC'`).
             * When omitted, the day is bucketed in UTC.
             *
             */
            timezone?: string;
        } | {
            type: "within-seconds";
            /**
             * Tolerance in seconds. e.g. 60 = ±1 minute, 3600 = ±1 hour.
             */
            seconds: number;
        };
        export type Unit = string;
        export interface UpdateMeterReading {
            /**
             * The reading value of the meter
             * example:
             * 240
             */
            value: number;
            read_by?: /**
             * The person who recorded the reading
             * example:
             * John Doe
             */
            ReadBy;
            reason?: /**
             * This field is deprecated. Please use the Reason enum instead.
             *
             */
            ReasonString;
            /**
             * The ID of the associated meter
             */
            meter_id: EntityId /* uuid */;
            /**
             * The ID of the associated meter counter
             */
            counter_id?: EntityId /* uuid */;
            /**
             * The direction of the reading (feed-in or feed-out)
             */
            direction?: Direction;
            /**
             * If the value is not provided, the system will be set with the time the request is processed.
             * example:
             * 2022-10-10
             */
            timestamp?: string; // date-time
            /**
             * The source of the reading
             */
            source: Source;
            /**
             * The status of the reading
             */
            status?: ReadingStatus;
            /**
             * The external ID of the reading
             */
            external_id?: string;
            /**
             * A remark or comment for the reading
             * example:
             * Customer reported unusual consumption
             */
            remark?: string | null;
            /**
             * Additional metadata for the reading
             * example:
             * {
             *   "registration_id": "1234567890",
             *   "business_unit": "ABC"
             * }
             */
            metadata?: {
                [name: string]: string;
            };
        }
    }
}
declare namespace Paths {
    namespace ApplyReadingChangeset {
        namespace Parameters {
            export type ChangesetId = string;
            export type CounterId = Components.Schemas.Id;
            export type MeterId = Components.Schemas.Id;
        }
        export interface PathParameters {
            meter_id: Parameters.MeterId;
            counter_id: Parameters.CounterId;
            changeset_id: Parameters.ChangesetId;
        }
        namespace Responses {
            export interface $200 {
                reading?: Components.Schemas.Reading;
                changeset?: Components.Schemas.MeterReadingChangeset;
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export interface $404 {
            }
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace BatchWriteMeterReadings {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid */;
            export type Async = boolean;
            export type CreateTicket = boolean;
            export type Direct = boolean;
            export type SkipValidation = boolean;
        }
        export interface QueryParameters {
            async?: Parameters.Async;
            skip_validation?: Parameters.SkipValidation;
            activity_id?: Parameters.ActivityId;
            direct?: Parameters.Direct;
            create_ticket?: Parameters.CreateTicket;
        }
        export interface RequestBody {
            /**
             * - By default, the system will use combination of counter_id, meter_id, direction, and timestamp to identify a meter reading.
             * - Additional identifiers can be provided to identify a meter reading uniquely.
             * - Example:
             *   - ["metadata.registration_id", "metadata.business_unit"]
             *   - ["metadata.registration_id", "metadata.business_unit", "external_id"]
             *
             */
            identifiers?: string[];
            readings?: /**
             * A meter reading for batch operations. The required fields depend on the operation:
             * - create/update: requires value, source, and meter_id
             * - delete: only requires the fields specified in the identifiers parameter
             *
             */
            Components.Schemas.BatchReading[];
        }
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.MeterReading[];
            }
            export type $400 = Components.Responses.InvalidRequestCreateMeterReadings;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace CreateMeterReading {
        namespace Parameters {
            export type Direct = boolean;
        }
        export interface QueryParameters {
            direct?: Parameters.Direct;
        }
        export type RequestBody = Components.Schemas.MeterReading;
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.MeterReading;
            }
            export type $400 = Components.Responses.InvalidRequestCreateMeterReading;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace CreateMeterReadingFromSubmission {
        export interface RequestBody {
            [name: string]: any;
            /**
             * ID of the organization
             * example:
             * 123
             */
            org_id?: string;
            entity?: {
                [name: string]: any;
                /**
                 * ID of the organization
                 * example:
                 * 123
                 */
                _org?: string;
                meterReadings?: Components.Schemas.SubmissionMeterReading[];
            };
        }
        namespace Responses {
            export interface $200 {
                message?: "Successfully Processed";
            }
            export type $400 = Components.Responses.InvalidRequestCreateMeterReadingFromSubmission;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace CreateMeterReadings {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid */;
            export type Async = boolean;
            export type CreateTicket = boolean;
            export type Direct = boolean;
            export type SkipValidation = boolean;
        }
        export interface QueryParameters {
            async?: Parameters.Async;
            activity_id?: Parameters.ActivityId;
            skip_validation?: Parameters.SkipValidation;
            direct?: Parameters.Direct;
            create_ticket?: Parameters.CreateTicket;
        }
        export interface RequestBody {
            readings?: Components.Schemas.MeterReading[];
        }
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.MeterReading[];
            }
            export type $400 = Components.Responses.InvalidRequestCreateMeterReadings;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace CreatePortalMeterReadings {
        namespace Parameters {
            export type Direct = boolean;
            export type MeterId = Components.Schemas.Id;
        }
        export interface PathParameters {
            meter_id: Parameters.MeterId;
        }
        export interface QueryParameters {
            direct?: Parameters.Direct;
        }
        export interface RequestBody {
            readings?: [
                Components.Schemas.PortalMeterReading,
                ...Components.Schemas.PortalMeterReading[]
            ];
        }
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.MeterReading[];
            }
            export type $400 = Components.Responses.InvalidRequestCreateMeterReadings;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace CreateReadingWithMeter {
        export type RequestBody = Components.Schemas.ReadingWithMeter;
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.MeterReading;
            }
            export type $400 = Components.Responses.InvalidRequestCreateReadingWithMeter;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace DeleteMeterReading {
        namespace Parameters {
            export type CounterId = Components.Schemas.Id;
            export type MeterId = Components.Schemas.Id;
            /**
             * example:
             * 2022-10-01T20:00:00.000Z
             */
            export type Timestamp = string;
        }
        export interface PathParameters {
            meter_id: Parameters.MeterId;
            counter_id: Parameters.CounterId;
        }
        export interface QueryParameters {
            timestamp: /**
             * example:
             * 2022-10-01T20:00:00.000Z
             */
            Parameters.Timestamp;
        }
        namespace Responses {
            export interface $200 {
                data?: {
                    meterId?: Components.Schemas.Id;
                    counterId?: Components.Schemas.Id;
                    /**
                     * example:
                     * 2022-10-01T20:00:00.000Z
                     */
                    timestamp?: string;
                };
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace DismissReadingChangeset {
        namespace Parameters {
            export type ChangesetId = string;
            export type CounterId = Components.Schemas.Id;
            export type MeterId = Components.Schemas.Id;
        }
        export interface PathParameters {
            meter_id: Parameters.MeterId;
            counter_id: Parameters.CounterId;
            changeset_id: Parameters.ChangesetId;
        }
        export interface RequestBody {
            /**
             * Optional reason for dismissing the changeset
             */
            reason?: string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MeterReadingChangeset;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export interface $404 {
            }
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetAllowedReadingForMeter {
        namespace Parameters {
            export type MeterId = Components.Schemas.Id;
            /**
             * example:
             * 2022-10-01T10:10:00.000Z
             */
            export type Timestamp = string;
        }
        export interface PathParameters {
            meter_id: Parameters.MeterId;
        }
        export interface QueryParameters {
            timestamp?: /**
             * example:
             * 2022-10-01T10:10:00.000Z
             */
            Parameters.Timestamp;
        }
        namespace Responses {
            export interface $200 {
                data?: {
                    counter_id?: Components.Schemas.Id;
                    /**
                     * Minimum allowed reading value for the meter
                     */
                    min_value?: number;
                    /**
                     * Maximum allowed reading value for the meter
                     */
                    max_value?: number;
                }[];
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetCounterDetails {
        namespace Parameters {
            export type CounterId = Components.Schemas.Id;
        }
        export interface PathParameters {
            counter_id: Parameters.CounterId;
        }
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.MeterCounter;
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetCustomerMeters {
        namespace Parameters {
            export type IncludePendingChangesets = boolean;
        }
        export interface QueryParameters {
            include_pending_changesets?: Parameters.IncludePendingChangesets;
        }
        namespace Responses {
            export interface $200 {
                data?: {
                    _id: Components.Schemas.EntityId /* uuid */;
                    /**
                     * Title of the entity
                     * example:
                     * Example Entity
                     */
                    _title: string;
                    /**
                     * Organization ID the entity belongs to
                     * example:
                     * 123
                     */
                    _org: string;
                    /**
                     * Array of entity tags
                     * example:
                     * [
                     *   "example",
                     *   "mock"
                     * ]
                     */
                    _tags?: string[];
                    /**
                     * Creation timestamp of the entity
                     * example:
                     * 2021-02-09T12:41:43.662Z
                     */
                    _created_at: string; // date-time
                    /**
                     * Last update timestamp of the entity
                     * example:
                     * 2021-02-09T12:41:43.662Z
                     */
                    _updated_at: string; // date-time
                    /**
                     * The schema type of the meter
                     */
                    _schema: "meter";
                    /**
                     * The MA-LO ID of the meter
                     * example:
                     * A09-123
                     */
                    ma_lo_id?: string;
                    /**
                     * The status of the meter
                     */
                    status?: "active" | "decommissioned";
                    /**
                     * The type of the meter
                     */
                    meter_type?: "three-phase-meter" | "bellow-gas-meter" | "rotary-piston-meter" | "smart-meter" | "performance-meter" | "maximum-meter" | "turbine-gas-meter" | "ultrasonic-gas-meter" | "alternating-current-meter" | "modern-metering-system" | "intelligent-measuring-system" | "electronic-meter";
                    /**
                     * The tariff type of the meter
                     * example:
                     * Peak load tariff
                     */
                    tariff_type?: string;
                    /**
                     * The number of the meter
                     * example:
                     * J-1093-1AK
                     */
                    meter_number?: string;
                    /**
                     * The sector to which the meter belongs
                     */
                    sector?: "power" | "water" | "gas" | "district_heating" | "waste_water";
                    /**
                     * The location information of the meter
                     * example:
                     * [
                     *   {
                     *     "country": "Germany",
                     *     "city": "Koln",
                     *     "postal_code": 81475,
                     *     "street": "Melatengürtel",
                     *     "street_number": 71,
                     *     "additional_info": "5. Etage",
                     *     "_tags": [
                     *       "billing",
                     *       "delivery"
                     *     ]
                     *   }
                     * ]
                     */
                    location?: {
                        [key: string]: any;
                    };
                    /**
                     * The usage purpose of the meter
                     * example:
                     * Domestic Usage
                     */
                    used_for?: string;
                    /**
                     * The manufacturer of the meter
                     * example:
                     * Energy One
                     */
                    manufacturer?: string;
                    /**
                     * The calibration date of the meter
                     * example:
                     * 2022-10-10
                     */
                    calibration_date?: string;
                    /**
                     * The contract associated with the meter
                     */
                    contract?: {
                        $relation?: Components.Schemas.EntityRelation[];
                    };
                    /**
                     * The customer associated with the meter
                     */
                    customer?: {
                        $relation?: Components.Schemas.EntityRelation[];
                    };
                    journey_actions?: Components.Schemas.JourneyActions;
                    /**
                     * The timestamp of the last reading
                     * example:
                     * 2022-10-10
                     */
                    last_reading?: string;
                    /**
                     * The current consumption of the meter
                     * example:
                     * 100.5
                     */
                    current_consumption?: number;
                }[];
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetMeter {
        namespace Parameters {
            export type Id = Components.Schemas.EntityId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                data?: {
                    entity?: Components.Schemas.Meter;
                    journey_actions?: Components.Schemas.JourneyActions;
                    relations?: Components.Schemas.EntityItem[];
                };
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetMeterCounters {
        namespace Parameters {
            export type MeterId = Components.Schemas.EntityId /* uuid */;
        }
        export interface QueryParameters {
            meter_id: Parameters.MeterId;
        }
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.MeterCounter[];
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetMetersByContractId {
        namespace Parameters {
            export type ContractId = Components.Schemas.EntityId /* uuid */;
        }
        export interface PathParameters {
            contract_id: Parameters.ContractId;
        }
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.Meter[];
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetReadingChangesets {
        namespace Parameters {
            export type CounterId = Components.Schemas.Id;
            export type MeterId = Components.Schemas.Id;
        }
        export interface PathParameters {
            meter_id: Parameters.MeterId;
            counter_id: Parameters.CounterId;
        }
        namespace Responses {
            export interface $200 {
                changesets?: Components.Schemas.MeterReadingChangeset[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetReadingsByInterval {
        namespace Parameters {
            export type CounterId = Components.Schemas.Id;
            export type Direction = Components.Schemas.Direction;
            /**
             * example:
             * 2022-10-10
             */
            export type EndDate = string;
            /**
             * example:
             * 0
             */
            export type From = number;
            export type IncludePendingChangesets = boolean;
            export type MeterId = Components.Schemas.Id;
            /**
             * example:
             * 20
             */
            export type Size = number;
            export type Sort = "asc" | "desc";
            /**
             * example:
             * 2022-10-01
             */
            export type StartDate = string;
            export type Type = "cumulative" | "relative";
        }
        export interface PathParameters {
            meter_id: Parameters.MeterId;
            counter_id: Parameters.CounterId;
        }
        export interface QueryParameters {
            start_date?: /**
             * example:
             * 2022-10-01
             */
            Parameters.StartDate;
            end_date?: /**
             * example:
             * 2022-10-10
             */
            Parameters.EndDate;
            direction?: Parameters.Direction;
            size?: /**
             * example:
             * 20
             */
            Parameters.Size;
            from?: /**
             * example:
             * 0
             */
            Parameters.From;
            type: Parameters.Type;
            sort?: Parameters.Sort;
            include_pending_changesets?: Parameters.IncludePendingChangesets;
        }
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.MeterReading[];
                /**
                 * example:
                 * 120
                 */
                hits?: number;
                /**
                 * example:
                 * 2022-10-01T20:00:00.000Z
                 */
                firstRecordCreatedAt?: string;
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace PruneMeterReadings {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid */;
            export type Async = boolean;
            export type CreateTicket = boolean;
            export type DryRun = boolean;
        }
        export interface QueryParameters {
            async?: Parameters.Async;
            activity_id?: Parameters.ActivityId;
            create_ticket?: Parameters.CreateTicket;
            dry_run?: Parameters.DryRun;
        }
        export type RequestBody = Components.Schemas.PruneMeterReadingsPayload;
        namespace Responses {
            export interface $200 {
                data?: {
                    /**
                     * Number of readings deleted (or that would be deleted when `dry_run=true`).
                     * example:
                     * 42
                     */
                    deleted_count?: number;
                    /**
                     * Number of readings in scope that were kept.
                     * example:
                     * 12
                     */
                    kept_count?: number;
                };
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UpdateMeter {
        namespace Parameters {
            export type Id = Components.Schemas.EntityId /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Entity;
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.Meter;
            }
            export type $400 = Components.Responses.InvalidRequestUpdateMeter;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UpdateMeterReading {
        namespace Parameters {
            export type CounterId = Components.Schemas.Id;
            export type MeterId = Components.Schemas.Id;
            /**
             * example:
             * 2022-10-01T20:00:00.000Z
             */
            export type Timestamp = string;
        }
        export interface PathParameters {
            meter_id: Parameters.MeterId;
            counter_id: Parameters.CounterId;
        }
        export interface QueryParameters {
            timestamp: /**
             * example:
             * 2022-10-01T20:00:00.000Z
             */
            Parameters.Timestamp;
        }
        export type RequestBody = Components.Schemas.UpdateMeterReading;
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.MeterReading;
            }
            export type $400 = Components.Responses.InvalidRequestUpdateMeterReading;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UpdateReadingChangeset {
        namespace Parameters {
            export type ChangesetId = string;
            export type CounterId = Components.Schemas.Id;
            export type MeterId = Components.Schemas.Id;
        }
        export interface PathParameters {
            meter_id: Parameters.MeterId;
            counter_id: Parameters.CounterId;
            changeset_id: Parameters.ChangesetId;
        }
        export interface RequestBody {
            proposed?: Components.Schemas.ProposedReading;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MeterReadingChangeset;
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export interface $404 {
            }
            export type $500 = Components.Responses.InternalServerError;
        }
    }
}


export interface OperationMethods {
  /**
   * getCustomerMeters - getCustomerMeters
   * 
   * Retrieves all meters associated with the authenticated portal customer.
   * 
   * Returns meter details along with any configured journey actions and the last meter reading timestamp and current consumption.
   * 
   */
  'getCustomerMeters'(
    parameters?: Parameters<Paths.GetCustomerMeters.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCustomerMeters.Responses.$200>
  /**
   * getMetersByContractId - getMetersByContractId
   * 
   * Retrieves all meters associated with a given contract entity.
   * 
   * Use this endpoint to display all meters linked to a customer's contract in the portal.
   * 
   */
  'getMetersByContractId'(
    parameters?: Parameters<Paths.GetMetersByContractId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMetersByContractId.Responses.$200>
  /**
   * getMeter - getMeter
   * 
   * Retrieves the full details of a specific meter by ID, including related entities and available journey actions.
   * 
   * The response includes the meter entity, any configured journey action (e.g. a reading submission journey), and related entities such as contracts and contacts.
   * 
   */
  'getMeter'(
    parameters?: Parameters<Paths.GetMeter.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMeter.Responses.$200>
  /**
   * updateMeter - updateMeter
   * 
   * Partially updates the details of a meter entity by ID.
   */
  'updateMeter'(
    parameters?: Parameters<Paths.UpdateMeter.PathParameters> | null,
    data?: Paths.UpdateMeter.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateMeter.Responses.$200>
  /**
   * getMeterCounters - getMeterCounters
   * 
   * Retrieves all meter counters associated with a given meter.
   * 
   * Meter counters represent individual measurement channels on a meter (e.g. HT/NT tariff channels, feed-in/feed-out directions).
   * 
   */
  'getMeterCounters'(
    parameters?: Parameters<Paths.GetMeterCounters.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMeterCounters.Responses.$200>
  /**
   * getCounterDetails - getCounterDetails
   * 
   * Retrieves the full details of a single meter counter by its ID.
   * 
   * Counter details include the OBIS number, direction, tariff type, transformer ratio, conversion factor, unit, and the last reading value and timestamp.
   * 
   */
  'getCounterDetails'(
    parameters?: Parameters<Paths.GetCounterDetails.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCounterDetails.Responses.$200>
  /**
   * createMeterReading - createMeterReading
   * 
   * Inserts a new meter reading.
   * 
   * When `source: 'ERP'` is set in the request body, the write is treated as a direct confirmation (same as `?direct=true`). This triggers auto-clear of matching pending changesets.
   * 
   */
  'createMeterReading'(
    parameters?: Parameters<Paths.CreateMeterReading.QueryParameters> | null,
    data?: Paths.CreateMeterReading.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateMeterReading.Responses.$200>
  /**
   * createMeterReadings - createMeterReadings
   * 
   * Inserts multiple meter readings at once. Limited to 100 readings per request.
   * 
   * When `source: 'ERP'` is set in the request body, the write is treated as a direct confirmation (same as `?direct=true`). This triggers auto-clear of matching pending changesets.
   * 
   */
  'createMeterReadings'(
    parameters?: Parameters<Paths.CreateMeterReadings.QueryParameters> | null,
    data?: Paths.CreateMeterReadings.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateMeterReadings.Responses.$200>
  /**
   * createPortalMeterReadings - createPortalMeterReadings
   * 
   * Inserts multiple meter readings at once for a given meter via the end customer portal.
   * Limited to 100 readings per request.
   * 
   * This endpoint is designed for portal users submitting readings for a specific meter identified by path parameter.
   * 
   * When `source: 'ERP'` is set in the request body, the write is treated as a direct confirmation (same as `?direct=true`). This triggers auto-clear of matching pending changesets.
   * 
   */
  'createPortalMeterReadings'(
    parameters?: Parameters<Paths.CreatePortalMeterReadings.QueryParameters & Paths.CreatePortalMeterReadings.PathParameters> | null,
    data?: Paths.CreatePortalMeterReadings.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreatePortalMeterReadings.Responses.$200>
  /**
   * batchWriteMeterReadings - batchWriteMeterReadings
   * 
   * Upserts or deletes multiple meter readings at once. Limited to 100 readings per request.
   * 
   * Use the `operation` field on each reading to specify `create`, `update`, or `delete`.
   * Custom `identifiers` can be provided to control how unique readings are matched (e.g. by `external_id` or `metadata` fields).
   * 
   * When `source: 'ERP'` is set in the request body, the write is treated as a direct confirmation (same as `?direct=true`). This triggers auto-clear of matching pending changesets.
   * 
   */
  'batchWriteMeterReadings'(
    parameters?: Parameters<Paths.BatchWriteMeterReadings.QueryParameters> | null,
    data?: Paths.BatchWriteMeterReadings.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BatchWriteMeterReadings.Responses.$200>
  /**
   * pruneMeterReadings - pruneMeterReadings
   * 
   * Deletes every reading of a meter whose `external_id` is NOT in the provided keep list — in a single request.
   * 
   * The prune scope can optionally be narrowed to a single counter (`counter_id`) and/or a reading `source` (e.g. `ERP`).
   * Replaces the client-side pattern of paginating the full reading history and issuing chunked batch deletes.
   * 
   * Readings without an `external_id`:
   * - when a `source` filter is provided, they are **deleted** — they cannot be referenced by any keep list
   * - when no `source` filter is provided, they are **kept** (conservative default)
   * 
   * Deletions reuse the same internal path as `batchWriteMeterReadings` with `operation: delete`: the same
   * per-reading lifecycle events are emitted, and providing `activity_id` suppresses the per-reading delete
   * activities and attaches the given activity to the affected meter and counters instead. Delete operations
   * never create manual-intervention tickets; `create_ticket` is accepted for call-site parity with
   * `batchWriteMeterReadings`.
   * 
   * `keep_external_ids` is limited to 10000 entries.
   * 
   */
  'pruneMeterReadings'(
    parameters?: Parameters<Paths.PruneMeterReadings.QueryParameters> | null,
    data?: Paths.PruneMeterReadings.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PruneMeterReadings.Responses.$200>
  /**
   * createMeterReadingFromSubmission - createMeterReadingFromSubmission
   * 
   * Creates meter readings from a journey submission payload.
   * 
   * This endpoint is called internally by the journey automation engine when a customer submits meter readings through a journey. It parses the submission payload and stores the readings for the relevant meters.
   * 
   */
  'createMeterReadingFromSubmission'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateMeterReadingFromSubmission.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateMeterReadingFromSubmission.Responses.$200>
  /**
   * getAllowedReadingForMeter - getAllowedReadingForMeter
   * 
   * Returns the allowed min/max reading range for each counter of the given meter.
   * 
   * Use this endpoint to validate end-customer input before submitting a new reading.
   * If no timestamp is provided, the system defaults to the current time.
   * 
   */
  'getAllowedReadingForMeter'(
    parameters?: Parameters<Paths.GetAllowedReadingForMeter.QueryParameters & Paths.GetAllowedReadingForMeter.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllowedReadingForMeter.Responses.$200>
  /**
   * createReadingWithMeter - createReadingWithMeter
   * 
   * Creates a meter reading along with meter lookup or creation by MA-LO ID and OBIS number.
   * 
   * If a meter matching the provided `ma_lo_id` and `obis_number` already exists, the reading is added to it. Otherwise, a new meter counter is created as needed.
   * 
   */
  'createReadingWithMeter'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateReadingWithMeter.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateReadingWithMeter.Responses.$200>
  /**
   * getReadingsByInterval - getReadingsByInterval
   * 
   * Retrieves all readings specified in an interval.
   * If the start_date and end_date are equal, then it returns the readings of the specified date.
   * The start_date should be less than or equal to the end_date.
   * 
   */
  'getReadingsByInterval'(
    parameters?: Parameters<Paths.GetReadingsByInterval.QueryParameters & Paths.GetReadingsByInterval.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetReadingsByInterval.Responses.$200>
  /**
   * updateMeterReading - updateMeterReading
   * 
   * Updates an existing meter reading identified by meter ID, counter ID, and timestamp.
   */
  'updateMeterReading'(
    parameters?: Parameters<Paths.UpdateMeterReading.QueryParameters & Paths.UpdateMeterReading.PathParameters> | null,
    data?: Paths.UpdateMeterReading.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateMeterReading.Responses.$200>
  /**
   * deleteMeterReading - deleteMeterReading
   * 
   * Permanently deletes a meter reading identified by meter ID, counter ID, and timestamp.
   */
  'deleteMeterReading'(
    parameters?: Parameters<Paths.DeleteMeterReading.QueryParameters & Paths.DeleteMeterReading.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteMeterReading.Responses.$200>
  /**
   * getReadingChangesets - List pending reading changesets for a counter
   */
  'getReadingChangesets'(
    parameters?: Parameters<Paths.GetReadingChangesets.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetReadingChangesets.Responses.$200>
  /**
   * applyReadingChangeset - Apply (approve) a pending reading changeset
   * 
   * Applies the proposed reading value to ClickHouse and removes the pending changeset.
   * 
   * Requires `meter_reading:edit` permission (approval workflow action on the reading's approval state).
   * 
   */
  'applyReadingChangeset'(
    parameters?: Parameters<Paths.ApplyReadingChangeset.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApplyReadingChangeset.Responses.$200>
  /**
   * dismissReadingChangeset - Dismiss (reject) a pending reading changeset
   * 
   * Removes the pending changeset without applying it. The reading value remains unchanged.
   * 
   * Requires `meter_reading:edit` permission (approval workflow action on the reading's approval state).
   * 
   */
  'dismissReadingChangeset'(
    parameters?: Parameters<Paths.DismissReadingChangeset.PathParameters> | null,
    data?: Paths.DismissReadingChangeset.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DismissReadingChangeset.Responses.$200>
  /**
   * updateReadingChangeset - Edit a pending reading changeset
   * 
   * Updates the proposed value of a pending changeset without going through the normal write path.
   * 
   */
  'updateReadingChangeset'(
    parameters?: Parameters<Paths.UpdateReadingChangeset.PathParameters> | null,
    data?: Paths.UpdateReadingChangeset.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateReadingChangeset.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/metering/meter']: {
    /**
     * getCustomerMeters - getCustomerMeters
     * 
     * Retrieves all meters associated with the authenticated portal customer.
     * 
     * Returns meter details along with any configured journey actions and the last meter reading timestamp and current consumption.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetCustomerMeters.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCustomerMeters.Responses.$200>
  }
  ['/v1/metering/contract/meters/{contract_id}']: {
    /**
     * getMetersByContractId - getMetersByContractId
     * 
     * Retrieves all meters associated with a given contract entity.
     * 
     * Use this endpoint to display all meters linked to a customer's contract in the portal.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetMetersByContractId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMetersByContractId.Responses.$200>
  }
  ['/v1/metering/meter/{id}']: {
    /**
     * updateMeter - updateMeter
     * 
     * Partially updates the details of a meter entity by ID.
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateMeter.PathParameters> | null,
      data?: Paths.UpdateMeter.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateMeter.Responses.$200>
    /**
     * getMeter - getMeter
     * 
     * Retrieves the full details of a specific meter by ID, including related entities and available journey actions.
     * 
     * The response includes the meter entity, any configured journey action (e.g. a reading submission journey), and related entities such as contracts and contacts.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetMeter.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMeter.Responses.$200>
  }
  ['/v1/metering/counter']: {
    /**
     * getMeterCounters - getMeterCounters
     * 
     * Retrieves all meter counters associated with a given meter.
     * 
     * Meter counters represent individual measurement channels on a meter (e.g. HT/NT tariff channels, feed-in/feed-out directions).
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetMeterCounters.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMeterCounters.Responses.$200>
  }
  ['/v1/metering/counter/{counter_id}']: {
    /**
     * getCounterDetails - getCounterDetails
     * 
     * Retrieves the full details of a single meter counter by its ID.
     * 
     * Counter details include the OBIS number, direction, tariff type, transformer ratio, conversion factor, unit, and the last reading value and timestamp.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetCounterDetails.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCounterDetails.Responses.$200>
  }
  ['/v1/metering/reading']: {
    /**
     * createMeterReading - createMeterReading
     * 
     * Inserts a new meter reading.
     * 
     * When `source: 'ERP'` is set in the request body, the write is treated as a direct confirmation (same as `?direct=true`). This triggers auto-clear of matching pending changesets.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.CreateMeterReading.QueryParameters> | null,
      data?: Paths.CreateMeterReading.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateMeterReading.Responses.$200>
  }
  ['/v1/metering/readings']: {
    /**
     * createMeterReadings - createMeterReadings
     * 
     * Inserts multiple meter readings at once. Limited to 100 readings per request.
     * 
     * When `source: 'ERP'` is set in the request body, the write is treated as a direct confirmation (same as `?direct=true`). This triggers auto-clear of matching pending changesets.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.CreateMeterReadings.QueryParameters> | null,
      data?: Paths.CreateMeterReadings.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateMeterReadings.Responses.$200>
  }
  ['/v1/metering/readings/{meter_id}']: {
    /**
     * createPortalMeterReadings - createPortalMeterReadings
     * 
     * Inserts multiple meter readings at once for a given meter via the end customer portal.
     * Limited to 100 readings per request.
     * 
     * This endpoint is designed for portal users submitting readings for a specific meter identified by path parameter.
     * 
     * When `source: 'ERP'` is set in the request body, the write is treated as a direct confirmation (same as `?direct=true`). This triggers auto-clear of matching pending changesets.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.CreatePortalMeterReadings.QueryParameters & Paths.CreatePortalMeterReadings.PathParameters> | null,
      data?: Paths.CreatePortalMeterReadings.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreatePortalMeterReadings.Responses.$200>
  }
  ['/v2/metering/readings']: {
    /**
     * batchWriteMeterReadings - batchWriteMeterReadings
     * 
     * Upserts or deletes multiple meter readings at once. Limited to 100 readings per request.
     * 
     * Use the `operation` field on each reading to specify `create`, `update`, or `delete`.
     * Custom `identifiers` can be provided to control how unique readings are matched (e.g. by `external_id` or `metadata` fields).
     * 
     * When `source: 'ERP'` is set in the request body, the write is treated as a direct confirmation (same as `?direct=true`). This triggers auto-clear of matching pending changesets.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.BatchWriteMeterReadings.QueryParameters> | null,
      data?: Paths.BatchWriteMeterReadings.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BatchWriteMeterReadings.Responses.$200>
  }
  ['/v2/metering/readings/prune']: {
    /**
     * pruneMeterReadings - pruneMeterReadings
     * 
     * Deletes every reading of a meter whose `external_id` is NOT in the provided keep list — in a single request.
     * 
     * The prune scope can optionally be narrowed to a single counter (`counter_id`) and/or a reading `source` (e.g. `ERP`).
     * Replaces the client-side pattern of paginating the full reading history and issuing chunked batch deletes.
     * 
     * Readings without an `external_id`:
     * - when a `source` filter is provided, they are **deleted** — they cannot be referenced by any keep list
     * - when no `source` filter is provided, they are **kept** (conservative default)
     * 
     * Deletions reuse the same internal path as `batchWriteMeterReadings` with `operation: delete`: the same
     * per-reading lifecycle events are emitted, and providing `activity_id` suppresses the per-reading delete
     * activities and attaches the given activity to the affected meter and counters instead. Delete operations
     * never create manual-intervention tickets; `create_ticket` is accepted for call-site parity with
     * `batchWriteMeterReadings`.
     * 
     * `keep_external_ids` is limited to 10000 entries.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.PruneMeterReadings.QueryParameters> | null,
      data?: Paths.PruneMeterReadings.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PruneMeterReadings.Responses.$200>
  }
  ['/v1/metering/reading/submission']: {
    /**
     * createMeterReadingFromSubmission - createMeterReadingFromSubmission
     * 
     * Creates meter readings from a journey submission payload.
     * 
     * This endpoint is called internally by the journey automation engine when a customer submits meter readings through a journey. It parses the submission payload and stores the readings for the relevant meters.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateMeterReadingFromSubmission.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateMeterReadingFromSubmission.Responses.$200>
  }
  ['/v1/metering/allowed/reading/{meter_id}']: {
    /**
     * getAllowedReadingForMeter - getAllowedReadingForMeter
     * 
     * Returns the allowed min/max reading range for each counter of the given meter.
     * 
     * Use this endpoint to validate end-customer input before submitting a new reading.
     * If no timestamp is provided, the system defaults to the current time.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetAllowedReadingForMeter.QueryParameters & Paths.GetAllowedReadingForMeter.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllowedReadingForMeter.Responses.$200>
  }
  ['/v1/metering/reading/with-meter']: {
    /**
     * createReadingWithMeter - createReadingWithMeter
     * 
     * Creates a meter reading along with meter lookup or creation by MA-LO ID and OBIS number.
     * 
     * If a meter matching the provided `ma_lo_id` and `obis_number` already exists, the reading is added to it. Otherwise, a new meter counter is created as needed.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateReadingWithMeter.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateReadingWithMeter.Responses.$200>
  }
  ['/v1/metering/reading/{meter_id}/{counter_id}']: {
    /**
     * getReadingsByInterval - getReadingsByInterval
     * 
     * Retrieves all readings specified in an interval.
     * If the start_date and end_date are equal, then it returns the readings of the specified date.
     * The start_date should be less than or equal to the end_date.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetReadingsByInterval.QueryParameters & Paths.GetReadingsByInterval.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetReadingsByInterval.Responses.$200>
    /**
     * updateMeterReading - updateMeterReading
     * 
     * Updates an existing meter reading identified by meter ID, counter ID, and timestamp.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateMeterReading.QueryParameters & Paths.UpdateMeterReading.PathParameters> | null,
      data?: Paths.UpdateMeterReading.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateMeterReading.Responses.$200>
    /**
     * deleteMeterReading - deleteMeterReading
     * 
     * Permanently deletes a meter reading identified by meter ID, counter ID, and timestamp.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteMeterReading.QueryParameters & Paths.DeleteMeterReading.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteMeterReading.Responses.$200>
  }
  ['/v1/metering/reading/{meter_id}/{counter_id}/changesets']: {
    /**
     * getReadingChangesets - List pending reading changesets for a counter
     */
    'get'(
      parameters?: Parameters<Paths.GetReadingChangesets.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetReadingChangesets.Responses.$200>
  }
  ['/v1/metering/reading/{meter_id}/{counter_id}/changesets/{changeset_id}:apply']: {
    /**
     * applyReadingChangeset - Apply (approve) a pending reading changeset
     * 
     * Applies the proposed reading value to ClickHouse and removes the pending changeset.
     * 
     * Requires `meter_reading:edit` permission (approval workflow action on the reading's approval state).
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ApplyReadingChangeset.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApplyReadingChangeset.Responses.$200>
  }
  ['/v1/metering/reading/{meter_id}/{counter_id}/changesets/{changeset_id}:dismiss']: {
    /**
     * dismissReadingChangeset - Dismiss (reject) a pending reading changeset
     * 
     * Removes the pending changeset without applying it. The reading value remains unchanged.
     * 
     * Requires `meter_reading:edit` permission (approval workflow action on the reading's approval state).
     * 
     */
    'post'(
      parameters?: Parameters<Paths.DismissReadingChangeset.PathParameters> | null,
      data?: Paths.DismissReadingChangeset.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DismissReadingChangeset.Responses.$200>
  }
  ['/v1/metering/reading/{meter_id}/{counter_id}/changesets/{changeset_id}']: {
    /**
     * updateReadingChangeset - Edit a pending reading changeset
     * 
     * Updates the proposed value of a pending changeset without going through the normal write path.
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateReadingChangeset.PathParameters> | null,
      data?: Paths.UpdateReadingChangeset.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateReadingChangeset.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ActionLabel = Components.Schemas.ActionLabel;
export type ActivityId = Components.Schemas.ActivityId;
export type BaseEntity = Components.Schemas.BaseEntity;
export type BatchReading = Components.Schemas.BatchReading;
export type BatchReadingBase = Components.Schemas.BatchReadingBase;
export type ChangesetCreator = Components.Schemas.ChangesetCreator;
export type CounterReadingOnSubmission = Components.Schemas.CounterReadingOnSubmission;
export type CreateOrUpdateBatchReading = Components.Schemas.CreateOrUpdateBatchReading;
export type DeleteBatchReading = Components.Schemas.DeleteBatchReading;
export type Direction = Components.Schemas.Direction;
export type Entity = Components.Schemas.Entity;
export type EntityId = Components.Schemas.EntityId;
export type EntityItem = Components.Schemas.EntityItem;
export type EntityRelation = Components.Schemas.EntityRelation;
export type EntitySlug = Components.Schemas.EntitySlug;
export type ErrorResp = Components.Schemas.ErrorResp;
export type FuzzyConfig = Components.Schemas.FuzzyConfig;
export type Id = Components.Schemas.Id;
export type JourneyActions = Components.Schemas.JourneyActions;
export type Meter = Components.Schemas.Meter;
export type MeterCounter = Components.Schemas.MeterCounter;
export type MeterReading = Components.Schemas.MeterReading;
export type MeterReadingChangeset = Components.Schemas.MeterReadingChangeset;
export type PortalMeterReading = Components.Schemas.PortalMeterReading;
export type ProposedReading = Components.Schemas.ProposedReading;
export type PruneMeterReadingsPayload = Components.Schemas.PruneMeterReadingsPayload;
export type ReadBy = Components.Schemas.ReadBy;
export type Reading = Components.Schemas.Reading;
export type ReadingStatus = Components.Schemas.ReadingStatus;
export type ReadingWithMeter = Components.Schemas.ReadingWithMeter;
export type Reason = Components.Schemas.Reason;
export type ReasonString = Components.Schemas.ReasonString;
export type Rule = Components.Schemas.Rule;
export type Source = Components.Schemas.Source;
export type SubmissionMeterReading = Components.Schemas.SubmissionMeterReading;
export type TariffType = Components.Schemas.TariffType;
export type TimestampTolerance = Components.Schemas.TimestampTolerance;
export type Unit = Components.Schemas.Unit;
export type UpdateMeterReading = Components.Schemas.UpdateMeterReading;
