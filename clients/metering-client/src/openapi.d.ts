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
        export type Forbidden = Schemas.ErrorResp;
        export type InternalServerError = Schemas.ErrorResp;
        export type InvalidRequest = Schemas.ErrorResp;
        export type Unauthorized = Schemas.ErrorResp;
    }
    namespace Schemas {
        export interface BaseEntity {
            /**
             * Entity ID
             * example:
             * 3fa85f64-5717-4562-b3fc-2c963f66afa6
             */
            _id: EntityId;
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
        export interface CounterReadingOnSubmission {
            /**
             * The ID of the associated meter counter
             */
            counterId: Id;
            /**
             * The direction of the reading (feed-in or feed-out)
             */
            direction: Direction;
            /**
             * The reading value of the meter counter
             * example:
             * 240
             */
            value: string;
            /**
             * The unit of measurement for the reading
             */
            unit?: Unit;
        }
        export type Direction = "feed-in" | "feed-out";
        export interface Entity {
            [name: string]: any;
        }
        export type EntityId = string;
        export interface EntityItem {
            [name: string]: any;
            _id: EntityId;
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
            /**
             * example:
             * 9a2081a2-1615-44b8-b988-d757983290dd
             */
            entity_id?: string;
            _slug?: "contact" | "contract";
        }
        export interface ErrorResp {
            /**
             * Error message
             */
            message?: string;
        }
        export type Id = string;
        export interface Meter {
            _id: EntityId;
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
            sector?: "power" | "water" | "gas";
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
             * 2022-10-10T00:00:00.000Z
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
            _id: EntityId;
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
             * 2022-12-10T00:00:00.000Z
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
             * 2022-10-10T00:00:00.000Z
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
            /**
             * The person who recorded the reading
             * example:
             * John Doe
             */
            read_by?: string;
            /**
             * The reason for recording the reading
             * example:
             * Storing the feed-in record
             */
            reason?: string;
            /**
             * The ID of the associated meter
             * example:
             * 1446829f-4b6f-474e-b978-3997d89a7928
             */
            meter_id: string;
            /**
             * The ID of the associated meter counter
             * example:
             * 991a1821-43bc-46b8-967d-64a3d87c31f8
             */
            counter_id?: string;
            /**
             * The direction of the reading (feed-in or feed-out)
             */
            direction?: Direction;
            /**
             * If the value is not provided, the system will be set with the time the request is processed.
             * example:
             * 2022-10-10T00:00:00.000Z
             */
            timestamp?: string;
            /**
             * The source of the reading
             */
            source: Source;
            /**
             * The status of the reading
             */
            status?: ReadingStatus;
            /**
             * The minimum value for the next reading
             * example:
             * 250
             */
            minNextReadingValue?: number;
            /**
             * The maximum value for the next reading
             * example:
             * 260
             */
            maxNextReadingValue?: number;
        }
        export type ReadingStatus = "valid" | "in-validation" | "implausible";
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
            /**
             * The person who recorded the reading
             * example:
             * John Doe
             */
            read_by?: string;
            /**
             * The reason for recording the reading
             * example:
             * Storing the feed-in record
             */
            reason?: string;
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
        export type Source = "ECP" | "ERP" | "360" | "journey-submission";
        export interface SubmissionMeterReading {
            [name: string]: any;
            /**
             * The ID of the associated meter
             */
            meterId: Id;
            /**
             * - The counter readings of a meter
             * - This is only sent when the user is authenticated while submitting a journey
             *
             */
            readings?: CounterReadingOnSubmission;
            /**
             * The reading value of the meter when the counterId is passed or when the meterType is one-tariff
             * example:
             * 240
             */
            readingValue?: string;
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
            /**
             * The reason for recording the reading
             * example:
             * Storing the feed-in record
             */
            reason?: string;
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
            meterType?: "one-tariff" | "two-tariff" | "three-tariff";
            /**
             * The feed-in value of the meter when meterType is one-tariff or bi-directional
             * example:
             * 240
             */
            feedInValue?: string;
            /**
             * The feed-out value of the meter when meterType is bi-directional
             * example:
             * 240
             */
            feedOutValue?: string;
            /**
             * The high-peak tariff value of the meter when meterType is two-tariff
             * example:
             * 240
             */
            htValue?: string;
            /**
             * The off-peak tariff value of the meter when meterType is two-tariff
             * example:
             * 240
             */
            ntValue?: string;
        }
        export type TariffType = "ht" | "nt";
        export type Unit = "w" | "wh" | "kw" | "kWh" | "kvarh" | "mw" | "mWh" | "unit" | "cubic-meter" | "hour" | "day" | "month" | "year" | "percentage";
    }
}
declare namespace Paths {
    namespace CreateMeterReading {
        export type RequestBody = Components.Schemas.MeterReading;
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.MeterReading;
            }
            export type $400 = Components.Responses.InvalidRequest;
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
            entity: {
                [name: string]: any;
                /**
                 * ID of the organization
                 * example:
                 * 123
                 */
                _org?: string;
                meterReadings: Components.Schemas.SubmissionMeterReading[];
            };
        }
        namespace Responses {
            export interface $200 {
                message?: "Successfully Processed";
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace CreateMeterReadings {
        export interface RequestBody {
            readings?: Components.Schemas.MeterReading[];
        }
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.MeterReading[];
            }
            export type $400 = Components.Responses.InvalidRequest;
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
            export type $400 = Components.Responses.InvalidRequest;
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
    namespace GetDownSampleReadingsByInterval {
        namespace Parameters {
            export type CounterId = Components.Schemas.Id;
            export type Direction = Components.Schemas.Direction;
            /**
             * example:
             * 2022-10-10
             */
            export type EndDate = string;
            export type GroupBy = "day" | "week" | "month" | "year";
            export type MeterId = Components.Schemas.Id;
            /**
             * example:
             * 2022-10-01
             */
            export type StartDate = string;
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
            group_by?: Parameters.GroupBy;
            direction?: Parameters.Direction;
        }
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.MeterReading[];
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetMeter {
        namespace Parameters {
            export type Id = Components.Schemas.EntityId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                data?: {
                    entity?: Components.Schemas.Meter;
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
            /**
             * example:
             * 1446829f-4b6f-474e-b978-3997d89a7928
             */
            export type MeterId = string;
        }
        export interface QueryParameters {
            meter_id: /**
             * example:
             * 1446829f-4b6f-474e-b978-3997d89a7928
             */
            Parameters.MeterId;
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
            export type ContractId = Components.Schemas.EntityId;
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
            export type MeterId = Components.Schemas.Id;
            /**
             * example:
             * 20
             */
            export type Size = number;
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
    namespace UpdateMeter {
        namespace Parameters {
            export type Id = Components.Schemas.EntityId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Entity;
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.Meter;
            }
            export type $400 = Components.Responses.InvalidRequest;
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
        export type RequestBody = Components.Schemas.MeterReading;
        namespace Responses {
            export interface $200 {
                data?: Components.Schemas.MeterReading;
            }
            export type $400 = Components.Responses.InvalidRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
}

export interface OperationMethods {
  /**
   * getCustomerMeters - Get Customer Meters
   * 
   * Retrieves all meters related to a customer.
   */
  'getCustomerMeters'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCustomerMeters.Responses.$200>
  /**
   * getMetersByContractId - getMetersByContractId
   * 
   * Retrieves all meters related to a contract.
   */
  'getMetersByContractId'(
    parameters?: Parameters<Paths.GetMetersByContractId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMetersByContractId.Responses.$200>
  /**
   * getMeter - Get Meter
   * 
   * Retrieves the details of a meter.
   */
  'getMeter'(
    parameters?: Parameters<Paths.GetMeter.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMeter.Responses.$200>
  /**
   * updateMeter - Update Meter
   * 
   * Updates the details of a meter.
   */
  'updateMeter'(
    parameters?: Parameters<Paths.UpdateMeter.PathParameters> | null,
    data?: Paths.UpdateMeter.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateMeter.Responses.$200>
  /**
   * getMeterCounters - Get Meter Counters
   * 
   * Retrieves all counters for a given meter.
   */
  'getMeterCounters'(
    parameters?: Parameters<Paths.GetMeterCounters.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMeterCounters.Responses.$200>
  /**
   * getCounterDetails - Get Counter Details
   * 
   * Retrieves the details of a meter counter.
   */
  'getCounterDetails'(
    parameters?: Parameters<Paths.GetCounterDetails.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCounterDetails.Responses.$200>
  /**
   * createMeterReading - Create Meter Reading
   * 
   * Inserts a new meter reading.
   */
  'createMeterReading'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateMeterReading.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateMeterReading.Responses.$200>
  /**
   * createMeterReadings - Create Meter Readings
   * 
   * Inserts multiple meter readings at once.
   */
  'createMeterReadings'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateMeterReadings.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateMeterReadings.Responses.$200>
  /**
   * createMeterReadingFromSubmission - Create Meter Reading from Submission
   * 
   * Creates a reading from a journey submission.
   */
  'createMeterReadingFromSubmission'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateMeterReadingFromSubmission.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateMeterReadingFromSubmission.Responses.$200>
  /**
   * createReadingWithMeter - Create Reading with Meter
   * 
   * Creates a reading along with a meter.
   */
  'createReadingWithMeter'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateReadingWithMeter.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateReadingWithMeter.Responses.$200>
  /**
   * getReadingsByInterval - Get Readings by Interval
   * 
   * Retrieves all readings specified in an interval.
   * If the start_date and end_date are equal, then it returns the readings of the specified date.
   * The start_date should be less than or equal to the end_date.
   * 
   */
  'getReadingsByInterval'(
    parameters?: Parameters<Paths.GetReadingsByInterval.PathParameters & Paths.GetReadingsByInterval.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetReadingsByInterval.Responses.$200>
  /**
   * updateMeterReading - Update Meter Reading
   * 
   * Updates a meter reading.
   */
  'updateMeterReading'(
    parameters?: Parameters<Paths.UpdateMeterReading.PathParameters & Paths.UpdateMeterReading.QueryParameters> | null,
    data?: Paths.UpdateMeterReading.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateMeterReading.Responses.$200>
  /**
   * deleteMeterReading - Delete Meter Reading
   * 
   * Deletes a meter reading.
   */
  'deleteMeterReading'(
    parameters?: Parameters<Paths.DeleteMeterReading.PathParameters & Paths.DeleteMeterReading.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteMeterReading.Responses.$200>
  /**
   * getDownSampleReadingsByInterval - Get Down Sample Readings by Interval
   * 
   * Retrieves the downsampled data of the entire readings specified in an interval.
   * If the start_date and end_date are equal, then it returns the readings of the specified date.
   * The start_date should be less than or equal to the end_date.
   * 
   */
  'getDownSampleReadingsByInterval'(
    parameters?: Parameters<Paths.GetDownSampleReadingsByInterval.PathParameters & Paths.GetDownSampleReadingsByInterval.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDownSampleReadingsByInterval.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/metering/meter']: {
    /**
     * getCustomerMeters - Get Customer Meters
     * 
     * Retrieves all meters related to a customer.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCustomerMeters.Responses.$200>
  }
  ['/v1/metering/contract/meters/{contract_id}']: {
    /**
     * getMetersByContractId - getMetersByContractId
     * 
     * Retrieves all meters related to a contract.
     */
    'get'(
      parameters?: Parameters<Paths.GetMetersByContractId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMetersByContractId.Responses.$200>
  }
  ['/v1/metering/meter/{id}']: {
    /**
     * updateMeter - Update Meter
     * 
     * Updates the details of a meter.
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateMeter.PathParameters> | null,
      data?: Paths.UpdateMeter.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateMeter.Responses.$200>
    /**
     * getMeter - Get Meter
     * 
     * Retrieves the details of a meter.
     */
    'get'(
      parameters?: Parameters<Paths.GetMeter.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMeter.Responses.$200>
  }
  ['/v1/metering/counter']: {
    /**
     * getMeterCounters - Get Meter Counters
     * 
     * Retrieves all counters for a given meter.
     */
    'get'(
      parameters?: Parameters<Paths.GetMeterCounters.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMeterCounters.Responses.$200>
  }
  ['/v1/metering/counter/{counter_id}']: {
    /**
     * getCounterDetails - Get Counter Details
     * 
     * Retrieves the details of a meter counter.
     */
    'get'(
      parameters?: Parameters<Paths.GetCounterDetails.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCounterDetails.Responses.$200>
  }
  ['/v1/metering/reading']: {
    /**
     * createMeterReading - Create Meter Reading
     * 
     * Inserts a new meter reading.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateMeterReading.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateMeterReading.Responses.$200>
  }
  ['/v1/metering/readings']: {
    /**
     * createMeterReadings - Create Meter Readings
     * 
     * Inserts multiple meter readings at once.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateMeterReadings.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateMeterReadings.Responses.$200>
  }
  ['/v1/metering/reading/submission']: {
    /**
     * createMeterReadingFromSubmission - Create Meter Reading from Submission
     * 
     * Creates a reading from a journey submission.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateMeterReadingFromSubmission.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateMeterReadingFromSubmission.Responses.$200>
  }
  ['/v1/metering/reading/with-meter']: {
    /**
     * createReadingWithMeter - Create Reading with Meter
     * 
     * Creates a reading along with a meter.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateReadingWithMeter.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateReadingWithMeter.Responses.$200>
  }
  ['/v1/metering/reading/{meter_id}/{counter_id}']: {
    /**
     * getReadingsByInterval - Get Readings by Interval
     * 
     * Retrieves all readings specified in an interval.
     * If the start_date and end_date are equal, then it returns the readings of the specified date.
     * The start_date should be less than or equal to the end_date.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetReadingsByInterval.PathParameters & Paths.GetReadingsByInterval.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetReadingsByInterval.Responses.$200>
    /**
     * updateMeterReading - Update Meter Reading
     * 
     * Updates a meter reading.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateMeterReading.PathParameters & Paths.UpdateMeterReading.QueryParameters> | null,
      data?: Paths.UpdateMeterReading.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateMeterReading.Responses.$200>
    /**
     * deleteMeterReading - Delete Meter Reading
     * 
     * Deletes a meter reading.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteMeterReading.PathParameters & Paths.DeleteMeterReading.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteMeterReading.Responses.$200>
  }
  ['/v1/metering/down-sample/readings/{meter_id}/{counter_id}']: {
    /**
     * getDownSampleReadingsByInterval - Get Down Sample Readings by Interval
     * 
     * Retrieves the downsampled data of the entire readings specified in an interval.
     * If the start_date and end_date are equal, then it returns the readings of the specified date.
     * The start_date should be less than or equal to the end_date.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetDownSampleReadingsByInterval.PathParameters & Paths.GetDownSampleReadingsByInterval.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDownSampleReadingsByInterval.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
