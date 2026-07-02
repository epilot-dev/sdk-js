import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Parameters {
        export type ConfigurationHistoryChangeType = "installment_amount_changed";
        export type From = number;
        export type Size = number;
    }
    export interface QueryParameters {
        From?: Parameters.From;
        Size?: Parameters.Size;
        ConfigurationHistoryChangeType?: Parameters.ConfigurationHistoryChangeType;
    }
    namespace Responses {
        export type BadRequest = /* Standard error response format */ Schemas.Error;
        export type Forbidden = /* Standard error response format */ Schemas.Error;
        export type InternalServerError = /* Standard error response format */ Schemas.Error;
        export type NotFound = /* Standard error response format */ Schemas.Error;
        export type Unauthorized = /* Standard error response format */ Schemas.Error;
        export type UnprocessableEntity = /* Standard error response format */ Schemas.Error;
    }
    namespace Schemas {
        /**
         * Customer balance summary (Kontostandübersicht).
         * Represents the aggregated balance across all contracts and orders for a customer.
         *
         */
        export interface Balance {
            /**
             * Total customer balance in cents (Gesamtkontostand in Cent).
             * Positive = customer owes money (Offener Betrag).
             * Negative = customer has credit (Guthaben).
             *
             * example:
             * 8990
             */
            balance?: number;
            /**
             * Balance as decimal string for display (Kontostand als Dezimalzahl).
             * Formatted with 2 decimal places.
             *
             * example:
             * 89.90
             */
            balance_decimal?: string;
            balance_currency?: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
        }
        /**
         * Represents a single financial transaction entry (Buchungssatz) in the billing ledger.
         * Each entry is either a debit or a credit, following double-entry accounting principles.
         * Common types include Abschlagszahlung (installment), Zahlungseingang (payment), Rückerstattung (reimbursement), etc.
         *
         */
        export interface BaseBillingEvent {
            [name: string]: any;
            _id?: /**
             * Unique entity identifier (UUID format)
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Display title of the entity (Anzeigetitel)
             * example:
             * Abschlagszahlung Juli 2025
             */
            _title?: string;
            /**
             * Organization ID the entity belongs to (Organisations-ID)
             * example:
             * 123456
             */
            _org?: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema (Schema-Slug)
             * example:
             * billing_event
             */
            EntitySlug;
            /**
             * Tags for categorization and filtering (Schlagwörter)
             * example:
             * [
             *   "billing",
             *   "energy"
             * ]
             */
            _tags?: string[];
            /**
             * Timestamp when the entity was created (Erstellungszeitpunkt)
             * example:
             * 2025-06-15T10:30:00Z
             */
            _created_at?: string; // date-time
            /**
             * Timestamp when the entity was last updated (Aktualisierungszeitpunkt)
             * example:
             * 2025-06-15T14:45:00Z
             */
            _updated_at?: string; // date-time
            /**
             * The classification of the billing transaction.
             * This field is used to group financial events for reporting or reconciliation.
             * Common examples:
             *   - installment (Abschlagszahlung)
             *   - payment (Zahlungseingang)
             *   - reimbursement (Rückerstattung)
             *   - dunning_fee (Mahngebühr)
             *   - chargeback (Lastschrift-Rückgabe)
             *   - final_bill (Endabrechnung)
             *   - bonus (Gutschrift)
             *   - correction (Korrekturbuchung)
             *
             * example:
             * installment
             */
            type: string;
            /**
             * The accounting direction of the transaction:
             * - debit (Soll): increases the customer’s liability (e.g. invoice issued)
             * - credit (Haben): reduces the liability (e.g. payment received)
             *
             * Automatically inferred based on event type if not specified.
             *
             * example:
             * debit
             */
            direction?: "debit" | "credit";
            /**
             * Betrag in Cent (net or gross depending on context)
             * example:
             * 10000
             */
            billing_amount: number;
            /**
             * Decimal representation of billing_amount for display or reporting
             * example:
             * 100.00
             */
            billing_amount_decimal: string;
            billing_currency: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * External system identifier (e.g. SAP FI/CA document number, Zahlungsavis ID)
             * example:
             * SAP-54321
             */
            external_id?: string;
            /**
             * Link to the associated Vertragskonto or contract object
             */
            contract: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * General ledger booking date (Buchungsdatum) for the billing event.
             * Used to determine when the entry was accounted for in the system.
             * Applies to all event types (debits and credits).
             * Can be used together with due_date or paid_date
             *
             * example:
             * 2025-06-15
             */
            booking_date: string; // date
            /**
             * Due date of the invoice or charge (Fälligkeitsdatum)
             * example:
             * 2025-06-30
             */
            due_date?: string; // date
            /**
             * Booking date (Zahlungseingang, Wertstellung)
             * example:
             * 2025-06-15T10:00:00Z
             */
            paid_date?: string; // date-time
            /**
             * Status of the billing event. Defaults to closed.
             */
            status?: "closed" | "open";
            /**
             * Optional reference to a previous event e.g. a chargeback or a correction to a previous installment
             * example:
             * d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e
             */
            related_event?: string;
            /**
             * Optional link to an external resource e.g. an invoice in a customer portal
             */
            external_link?: {
                /**
                 * URL of the external resource
                 * example:
                 * https://billing.example.com/invoices/12345
                 */
                href?: string; // uri
                /**
                 * Title of the external resource
                 * example:
                 * Invoice 12345
                 */
                title?: string;
            };
            /**
             * Optional reference to e.g. an invoice file associated with the billing event
             */
            attachments?: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * Öffentliche Notiz sichtbar für den Kunden, z.B. auf der Rechnung oder im Kundenportal
             * example:
             * Teilzahlung für Abschlag Juni
             */
            note?: string;
            /**
             * Interne Notiz, nur sichtbar für Sachbearbeiter (nicht für Kunden sichtbar)
             * example:
             * Rückmeldung von SAP: Betrag aus Zahlungsavis 2025-06-14 übernommen
             */
            internal_note?: string;
        }
        /**
         * Base schema for all epilot entities with common system fields
         */
        export interface BaseEntity {
            [name: string]: any;
            _id?: /**
             * Unique entity identifier (UUID format)
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Display title of the entity (Anzeigetitel)
             * example:
             * Abschlagszahlung Juli 2025
             */
            _title?: string;
            /**
             * Organization ID the entity belongs to (Organisations-ID)
             * example:
             * 123456
             */
            _org?: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema (Schema-Slug)
             * example:
             * billing_event
             */
            EntitySlug;
            /**
             * Tags for categorization and filtering (Schlagwörter)
             * example:
             * [
             *   "billing",
             *   "energy"
             * ]
             */
            _tags?: string[];
            /**
             * Timestamp when the entity was created (Erstellungszeitpunkt)
             * example:
             * 2025-06-15T10:30:00Z
             */
            _created_at?: string; // date-time
            /**
             * Timestamp when the entity was last updated (Aktualisierungszeitpunkt)
             * example:
             * 2025-06-15T14:45:00Z
             */
            _updated_at?: string; // date-time
        }
        export interface BillingAccountPricingInformation {
            entity_type: "billing_account";
            entity_id: string;
            title?: string;
            balance?: PricingInformationBalance;
            contracts: ContractPricingInformation[];
        }
        /**
         * Collection of supported billing event types (Buchungsarten).
         * Each type represents a different kind of financial transaction
         * that affects the customer's balance.
         *
         */
        export type BillingEvent = /**
         * Collection of supported billing event types (Buchungsarten).
         * Each type represents a different kind of financial transaction
         * that affects the customer's balance.
         *
         */
        /**
         * Installment billing event (Abschlagszahlung).
         * Represents a scheduled partial payment that the customer owes,
         * typically billed monthly for utilities like electricity or gas.
         *
         * example:
         * {
         *   "type": "installment",
         *   "direction": "debit",
         *   "note": "July power & gas installment payment",
         *   "status": "open",
         *   "booking_date": "2025-07-10",
         *   "due_date": "2025-07-10",
         *   "billing_amount": 5000,
         *   "billing_amount_decimal": "50.00",
         *   "billing_currency": "EUR"
         * }
         */
        InstallmentEvent | /**
         * Payment received event (Zahlungseingang).
         * Represents money received from the customer, reducing their balance.
         * This is a credit transaction.
         *
         * example:
         * {
         *   "type": "payment",
         *   "direction": "credit",
         *   "note": "Payment reference 001234567",
         *   "status": "closed",
         *   "booking_date": "2025-06-15",
         *   "due_date": "2025-06-15",
         *   "paid_date": "2025-06-09T10:00:00Z",
         *   "billing_amount": 5000,
         *   "billing_amount_decimal": "50.00",
         *   "billing_currency": "EUR"
         * }
         */
        PaymentEvent | /**
         * Reimbursement event (Rückerstattung).
         * Represents a refund to the customer, typically after overpayment
         * or billing correction. This is a credit transaction.
         *
         * example:
         * {
         *   "type": "reimbursement",
         *   "direction": "credit",
         *   "billing_amount": 10000,
         *   "billing_amount_decimal": "100.00",
         *   "billing_currency": "EUR",
         *   "note": "Refund due to meter correction",
         *   "booking_date": "2025-06-16",
         *   "paid_date": "2025-06-18T14:00:00Z"
         * }
         */
        ReimbursementEvent | /**
         * Dunning fee event (Mahngebühr).
         * Represents a late payment fee charged to the customer
         * after a payment reminder has been sent. This is a debit transaction.
         *
         * example:
         * {
         *   "type": "dunning_fee",
         *   "direction": "debit",
         *   "note": "Late fee for April invoice",
         *   "status": "open",
         *   "booking_date": "2025-06-10",
         *   "due_date": "2025-06-10",
         *   "billing_amount": 1500,
         *   "billing_amount_decimal": "15.00",
         *   "billing_currency": "EUR"
         * }
         */
        DunningFeeEvent | /**
         * Represents a single financial transaction entry (Buchungssatz) in the billing ledger.
         * Each entry is either a debit or a credit, following double-entry accounting principles.
         * Common types include Abschlagszahlung (installment), Zahlungseingang (payment), Rückerstattung (reimbursement), etc.
         *
         * example:
         * {
         *   "type": "invoice",
         *   "direction": "debit",
         *   "billing_amount": 8500,
         *   "billing_amount_decimal": "85.00",
         *   "billing_currency": "EUR",
         *   "note": "Einmalige Rechnung für Zusatzleistung",
         *   "booking_date": "2025-06-25",
         *   "due_date": "2025-07-01"
         * }
         */
        InvoiceEvent | /**
         * Final bill event (Endabrechnung/Schlussrechnung).
         * Represents the final settlement when a contract ends,
         * accounting for actual consumption vs. paid installments.
         * Can be either debit (customer owes more) or credit (customer overpaid).
         *
         * example:
         * {
         *   "type": "final_bill",
         *   "direction": "debit",
         *   "billing_amount": 12000,
         *   "billing_amount_decimal": "120.00",
         *   "billing_currency": "EUR",
         *   "note": "Final invoice after contract termination",
         *   "booking_date": "2025-06-30"
         * }
         */
        FinalBillEvent | /**
         * Bonus/credit event (Gutschrift/Bonus).
         * Represents a promotional credit or bonus applied to the customer's account,
         * such as welcome bonuses or loyalty rewards. This is a credit transaction.
         *
         * example:
         * {
         *   "type": "bonus",
         *   "direction": "credit",
         *   "billing_amount": 1500,
         *   "billing_amount_decimal": "15.00",
         *   "billing_currency": "EUR",
         *   "note": "Welcome bonus",
         *   "booking_date": "2025-06-15"
         * }
         */
        BonusEvent | /**
         * Correction event (Korrekturbuchung).
         * Represents an adjustment to a previous billing entry,
         * such as correcting an overcharge or undercharge.
         * Can be either debit or credit depending on the correction.
         *
         * example:
         * {
         *   "type": "correction",
         *   "direction": "credit",
         *   "billing_amount": 200,
         *   "billing_amount_decimal": "2.00",
         *   "billing_currency": "EUR",
         *   "note": "Corrected previous overcharge",
         *   "booking_date": "2025-06-22"
         * }
         */
        CorrectionEvent | /**
         * Custom billing event (Benutzerdefinierte Buchung).
         * Allows for organization-specific billing event types not covered
         * by the standard types. Use a descriptive type name.
         *
         * example:
         * {
         *   "type": "grid_fee_adjustment",
         *   "direction": "debit",
         *   "billing_amount": 3200,
         *   "billing_amount_decimal": "32.00",
         *   "billing_currency": "EUR",
         *   "note": "Netznachberechnung für Mai",
         *   "booking_date": "2025-06-11"
         * }
         */
        CustomEvent;
        /**
         * Fields to update on an existing billing event.
         */
        export interface BillingEventUpdate {
            /**
             * Updated billing event type.
             * example:
             * installment
             */
            type?: string;
            /**
             * Updated accounting direction.
             * example:
             * debit
             */
            direction?: "debit" | "credit";
            /**
             * Updated amount in cents.
             * example:
             * 10000
             */
            billing_amount?: number;
            /**
             * Updated decimal representation of billing_amount.
             * example:
             * 100.00
             */
            billing_amount_decimal?: string;
            billing_currency?: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * Updated external system identifier.
             * example:
             * SAP-54321
             */
            external_id?: string;
            /**
             * Updated link to the associated contract object.
             */
            contract?: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * Updated general ledger booking date.
             * example:
             * 2025-06-15
             */
            booking_date?: string; // date
            /**
             * Updated due date.
             * example:
             * 2025-06-30
             */
            due_date?: string; // date
            /**
             * Updated payment date.
             * example:
             * 2025-06-15T10:00:00Z
             */
            paid_date?: string; // date-time
            /**
             * Updated billing event status.
             */
            status?: "closed" | "open";
            /**
             * Updated reference to a previous event.
             * example:
             * d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e
             */
            related_event?: string;
            /**
             * Updated link to an external resource.
             */
            external_link?: {
                /**
                 * URL of the external resource
                 * example:
                 * https://billing.example.com/invoices/12345
                 */
                href?: string; // uri
                /**
                 * Title of the external resource
                 * example:
                 * Invoice 12345
                 */
                title?: string;
            };
            /**
             * Updated invoice file relations associated with the billing event.
             */
            attachments?: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * Updated public note visible to the customer.
             * example:
             * Teilzahlung für Abschlag Juni
             */
            note?: string;
            /**
             * Updated internal note visible to agents only.
             * example:
             * Rückmeldung von SAP: Betrag aus Zahlungsavis 2025-06-14 übernommen
             */
            internal_note?: string;
        }
        /**
         * Bonus/credit event (Gutschrift/Bonus).
         * Represents a promotional credit or bonus applied to the customer's account,
         * such as welcome bonuses or loyalty rewards. This is a credit transaction.
         *
         * example:
         * {
         *   "type": "bonus",
         *   "direction": "credit",
         *   "billing_amount": 1500,
         *   "billing_amount_decimal": "15.00",
         *   "billing_currency": "EUR",
         *   "note": "Welcome bonus",
         *   "booking_date": "2025-06-15"
         * }
         */
        export interface BonusEvent {
            [name: string]: any;
            _id?: /**
             * Unique entity identifier (UUID format)
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Display title of the entity (Anzeigetitel)
             * example:
             * Abschlagszahlung Juli 2025
             */
            _title?: string;
            /**
             * Organization ID the entity belongs to (Organisations-ID)
             * example:
             * 123456
             */
            _org?: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema (Schema-Slug)
             * example:
             * billing_event
             */
            EntitySlug;
            /**
             * Tags for categorization and filtering (Schlagwörter)
             * example:
             * [
             *   "billing",
             *   "energy"
             * ]
             */
            _tags?: string[];
            /**
             * Timestamp when the entity was created (Erstellungszeitpunkt)
             * example:
             * 2025-06-15T10:30:00Z
             */
            _created_at?: string; // date-time
            /**
             * Timestamp when the entity was last updated (Aktualisierungszeitpunkt)
             * example:
             * 2025-06-15T14:45:00Z
             */
            _updated_at?: string; // date-time
            /**
             * Event type identifier
             * example:
             * installment
             */
            type: "bonus";
            /**
             * The accounting direction of the transaction:
             * - debit (Soll): increases the customer’s liability (e.g. invoice issued)
             * - credit (Haben): reduces the liability (e.g. payment received)
             *
             * Automatically inferred based on event type if not specified.
             *
             * example:
             * debit
             */
            direction?: "debit" | "credit";
            /**
             * Betrag in Cent (net or gross depending on context)
             * example:
             * 10000
             */
            billing_amount: number;
            /**
             * Decimal representation of billing_amount for display or reporting
             * example:
             * 100.00
             */
            billing_amount_decimal: string;
            billing_currency: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * External system identifier (e.g. SAP FI/CA document number, Zahlungsavis ID)
             * example:
             * SAP-54321
             */
            external_id?: string;
            /**
             * Link to the associated Vertragskonto or contract object
             */
            contract: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * General ledger booking date (Buchungsdatum) for the billing event.
             * Used to determine when the entry was accounted for in the system.
             * Applies to all event types (debits and credits).
             * Can be used together with due_date or paid_date
             *
             * example:
             * 2025-06-15
             */
            booking_date: string; // date
            /**
             * Due date of the invoice or charge (Fälligkeitsdatum)
             * example:
             * 2025-06-30
             */
            due_date?: string; // date
            /**
             * Booking date (Zahlungseingang, Wertstellung)
             * example:
             * 2025-06-15T10:00:00Z
             */
            paid_date?: string; // date-time
            /**
             * Status of the billing event. Defaults to closed.
             */
            status?: "closed" | "open";
            /**
             * Optional reference to a previous event e.g. a chargeback or a correction to a previous installment
             * example:
             * d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e
             */
            related_event?: string;
            /**
             * Optional link to an external resource e.g. an invoice in a customer portal
             */
            external_link?: {
                /**
                 * URL of the external resource
                 * example:
                 * https://billing.example.com/invoices/12345
                 */
                href?: string; // uri
                /**
                 * Title of the external resource
                 * example:
                 * Invoice 12345
                 */
                title?: string;
            };
            /**
             * Optional reference to e.g. an invoice file associated with the billing event
             */
            attachments?: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * Öffentliche Notiz sichtbar für den Kunden, z.B. auf der Rechnung oder im Kundenportal
             * example:
             * Teilzahlung für Abschlag Juni
             */
            note?: string;
            /**
             * Interne Notiz, nur sichtbar für Sachbearbeiter (nicht für Kunden sichtbar)
             * example:
             * Rückmeldung von SAP: Betrag aus Zahlungsavis 2025-06-14 übernommen
             */
            internal_note?: string;
        }
        export interface ConfigurationHistoryContext {
            base_price?: PriceContext;
            working_price?: PriceContext;
        }
        export interface ConfigurationHistoryResponse {
            history: ConfigurationHistoryRow[];
            total: number;
        }
        export interface ConfigurationHistoryRow {
            event_id: string;
            org_id: string;
            entity_type: "contract" | "billing_account";
            entity_id: string;
            change_type: "installment_amount_changed";
            /**
             * example:
             * 1
             */
            schema_version: number;
            effective_at?: string; // date-time
            changed_at: string; // date-time
            created_at: string; // date-time
            source: "portal" | "epilot" | "erp" | "system" | "api" | "external" | "journey" | "automation" | "unknown";
            source_label?: string;
            source_system?: string;
            source_reference?: string;
            previous_value?: {
                /**
                 * Amount in cents when available or derivable.
                 * example:
                 * 10050
                 */
                amount?: number;
                /**
                 * Decimal amount string when available or derivable.
                 * example:
                 * 100.50
                 */
                amount_decimal?: string;
                currency?: /**
                 * Currency code in ISO 4217 format (Währungscode).
                 * Common values: EUR (Euro), CHF (Swiss Franc)
                 *
                 * example:
                 * EUR
                 */
                Currency;
            } | null;
            new_value: InstallmentAmountValue;
            context?: ConfigurationHistoryContext;
        }
        /**
         * Represents a customer contract (Vertrag) for billing purposes.
         * Contracts are the parent entities for billing events and contain
         * billing configuration such as installment amounts and billing cycles.
         *
         */
        export interface Contract {
            [name: string]: any;
            _id?: /**
             * Unique entity identifier (UUID format)
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Display title of the entity (Anzeigetitel)
             * example:
             * Abschlagszahlung Juli 2025
             */
            _title?: string;
            /**
             * Organization ID the entity belongs to (Organisations-ID)
             * example:
             * 123456
             */
            _org?: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema (Schema-Slug)
             * example:
             * billing_event
             */
            EntitySlug;
            /**
             * Tags for categorization and filtering (Schlagwörter)
             * example:
             * [
             *   "billing",
             *   "energy"
             * ]
             */
            _tags?: string[];
            /**
             * Timestamp when the entity was created (Erstellungszeitpunkt)
             * example:
             * 2025-06-15T10:30:00Z
             */
            _created_at?: string; // date-time
            /**
             * Timestamp when the entity was last updated (Aktualisierungszeitpunkt)
             * example:
             * 2025-06-15T14:45:00Z
             */
            _updated_at?: string; // date-time
            /**
             * Display name of the contract (Vertragsname)
             * example:
             * Stromvertrag Haushalt
             */
            contract_name?: string;
            /**
             * Unique contract identifier/number (Vertragsnummer)
             * example:
             * STR-2025-001234
             */
            contract_number?: string;
            /**
             * Current status of the contract (Vertragsstatus):
             * - draft (Entwurf): Contract is being prepared
             * - in_approval_process (In Prüfung): Awaiting approval
             * - approved (Genehmigt): Approved but not yet active
             * - active (Aktiv): Contract is currently active
             * - deactivated (Deaktiviert): Temporarily suspended
             * - revoked (Widerrufen): Cancelled by customer within cooling-off period
             * - terminated (Gekündigt): Contract has been terminated
             * - expired (Abgelaufen): Contract term has ended
             *
             * example:
             * active
             */
            status?: "draft" | "in_approval_process" | "approved" | "active" | "deactivated" | "revoked" | "terminated" | "expired";
            /**
             * Brief description of the contract terms (Vertragsbeschreibung)
             * example:
             * Haushaltsstrom-Tarif mit 24 Monaten Preisgarantie
             */
            description?: string;
            /**
             * Customer account number (Kundennummer/Vertragskonto)
             * example:
             * KD-67890
             */
            account_number?: string;
            /**
             * Utility branch/commodity type (Sparte):
             * - power (Strom)
             * - gas (Gas)
             * - water (Wasser)
             * - waste_water (Abwasser)
             * - district_heating (Fernwärme)
             *
             * example:
             * power
             */
            branch?: "power" | "gas" | "water" | "waste_water" | "district_heating";
            /**
             * Billing/invoice address (Rechnungsadresse)
             * example:
             * Musterstraße 123, 50667 Köln
             */
            billing_address?: string;
            /**
             * Delivery/supply point address (Lieferadresse/Verbrauchsstelle)
             * example:
             * Musterstraße 123, 50667 Köln
             */
            delivery_address?: string;
            /**
             * Additional addresses associated with the contract (Weitere Adressen)
             * example:
             * Postfach 456, 50668 Köln
             */
            additional_addresses?: string;
            /**
             * Date when the contract was/will be terminated (Kündigungsdatum)
             * example:
             * 2025-12-31
             */
            termination_date?: string; // date
            /**
             * Reason for contract termination (Kündigungsgrund)
             * example:
             * Kundenkündigung
             */
            termination_reason?: string;
            /**
             * Billing cycle frequency (Abrechnungszeitraum):
             * - weekly (Wöchentlich)
             * - monthly (Monatlich)
             * - every_quarter (Vierteljährlich)
             * - every_6_months (Halbjährlich)
             * - yearly (Jährlich)
             *
             * example:
             * monthly
             */
            billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly";
            /**
             * Duration amount for billing period calculation (Abrechnungsdauer)
             * example:
             * 30
             */
            billing_duration_amount?: number;
            /**
             * Duration of automatic contract renewal (Verlängerungsdauer)
             * example:
             * 12
             */
            renewal_duration_amount?: number;
            /**
             * Unit for renewal duration (Verlängerungseinheit)
             * example:
             * months
             */
            renewal_duration_unit?: "weeks" | "months" | "years";
            /**
             * The amount of notice required for termination of the contract.
             * example:
             * 30
             */
            notice_time_amount?: number;
            /**
             * Unit for notice period (Kündigungsfrist-Einheit)
             * example:
             * months
             */
            notice_time_unit?: "weeks" | "months" | "years";
            /**
             * Contract start date (Vertragsbeginn)
             * example:
             * 2025-01-01
             */
            start_date?: string; // date
            /**
             * Day of the month when installments are due (Fälligkeitstag). 0 means no fixed billing day is configured.
             * example:
             * 15
             */
            billing_due_day?: number;
            /**
             * Fixed installment amount in cents (Abschlagsbetrag in Cent).
             * Uses integer representation with 2 decimal precision.
             * Example: 10050 = 100.50 EUR
             *
             * example:
             * 8500
             */
            installment_amount?: number;
            /**
             * Current contract balance in cents (Kontostand in Cent).
             * Positive value = customer owes money (Forderung).
             * Negative value = customer has credit (Guthaben).
             *
             * example:
             * 8990
             */
            balance?: number;
            balance_currency?: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
        }
        /**
         * Contract entity with all required system fields populated
         */
        export interface ContractItem {
            [name: string]: any;
            _id: /**
             * Unique entity identifier (UUID format)
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Display title of the entity (Anzeigetitel)
             * example:
             * Abschlagszahlung Juli 2025
             */
            _title: string;
            /**
             * Organization ID the entity belongs to (Organisations-ID)
             * example:
             * 123456
             */
            _org: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema (Schema-Slug)
             * example:
             * billing_event
             */
            EntitySlug;
            /**
             * Tags for categorization and filtering (Schlagwörter)
             * example:
             * [
             *   "billing",
             *   "energy"
             * ]
             */
            _tags?: string[];
            /**
             * Timestamp when the entity was created (Erstellungszeitpunkt)
             * example:
             * 2025-06-15T10:30:00Z
             */
            _created_at: string; // date-time
            /**
             * Timestamp when the entity was last updated (Aktualisierungszeitpunkt)
             * example:
             * 2025-06-15T14:45:00Z
             */
            _updated_at: string; // date-time
            /**
             * Display name of the contract (Vertragsname)
             * example:
             * Stromvertrag Haushalt
             */
            contract_name?: string;
            /**
             * Unique contract identifier/number (Vertragsnummer)
             * example:
             * STR-2025-001234
             */
            contract_number?: string;
            /**
             * Current status of the contract (Vertragsstatus):
             * - draft (Entwurf): Contract is being prepared
             * - in_approval_process (In Prüfung): Awaiting approval
             * - approved (Genehmigt): Approved but not yet active
             * - active (Aktiv): Contract is currently active
             * - deactivated (Deaktiviert): Temporarily suspended
             * - revoked (Widerrufen): Cancelled by customer within cooling-off period
             * - terminated (Gekündigt): Contract has been terminated
             * - expired (Abgelaufen): Contract term has ended
             *
             * example:
             * active
             */
            status?: "draft" | "in_approval_process" | "approved" | "active" | "deactivated" | "revoked" | "terminated" | "expired";
            /**
             * Brief description of the contract terms (Vertragsbeschreibung)
             * example:
             * Haushaltsstrom-Tarif mit 24 Monaten Preisgarantie
             */
            description?: string;
            /**
             * Customer account number (Kundennummer/Vertragskonto)
             * example:
             * KD-67890
             */
            account_number?: string;
            /**
             * Utility branch/commodity type (Sparte):
             * - power (Strom)
             * - gas (Gas)
             * - water (Wasser)
             * - waste_water (Abwasser)
             * - district_heating (Fernwärme)
             *
             * example:
             * power
             */
            branch?: "power" | "gas" | "water" | "waste_water" | "district_heating";
            /**
             * Billing/invoice address (Rechnungsadresse)
             * example:
             * Musterstraße 123, 50667 Köln
             */
            billing_address?: string;
            /**
             * Delivery/supply point address (Lieferadresse/Verbrauchsstelle)
             * example:
             * Musterstraße 123, 50667 Köln
             */
            delivery_address?: string;
            /**
             * Additional addresses associated with the contract (Weitere Adressen)
             * example:
             * Postfach 456, 50668 Köln
             */
            additional_addresses?: string;
            /**
             * Date when the contract was/will be terminated (Kündigungsdatum)
             * example:
             * 2025-12-31
             */
            termination_date?: string; // date
            /**
             * Reason for contract termination (Kündigungsgrund)
             * example:
             * Kundenkündigung
             */
            termination_reason?: string;
            /**
             * Billing cycle frequency (Abrechnungszeitraum):
             * - weekly (Wöchentlich)
             * - monthly (Monatlich)
             * - every_quarter (Vierteljährlich)
             * - every_6_months (Halbjährlich)
             * - yearly (Jährlich)
             *
             * example:
             * monthly
             */
            billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly";
            /**
             * Duration amount for billing period calculation (Abrechnungsdauer)
             * example:
             * 30
             */
            billing_duration_amount?: number;
            /**
             * Duration of automatic contract renewal (Verlängerungsdauer)
             * example:
             * 12
             */
            renewal_duration_amount?: number;
            /**
             * Unit for renewal duration (Verlängerungseinheit)
             * example:
             * months
             */
            renewal_duration_unit?: "weeks" | "months" | "years";
            /**
             * The amount of notice required for termination of the contract.
             * example:
             * 30
             */
            notice_time_amount?: number;
            /**
             * Unit for notice period (Kündigungsfrist-Einheit)
             * example:
             * months
             */
            notice_time_unit?: "weeks" | "months" | "years";
            /**
             * Contract start date (Vertragsbeginn)
             * example:
             * 2025-01-01
             */
            start_date?: string; // date
            /**
             * Day of the month when installments are due (Fälligkeitstag). 0 means no fixed billing day is configured.
             * example:
             * 15
             */
            billing_due_day?: number;
            /**
             * Fixed installment amount in cents (Abschlagsbetrag in Cent).
             * Uses integer representation with 2 decimal precision.
             * Example: 10050 = 100.50 EUR
             *
             * example:
             * 8500
             */
            installment_amount?: number;
            /**
             * Current contract balance in cents (Kontostand in Cent).
             * Positive value = customer owes money (Forderung).
             * Negative value = customer has credit (Guthaben).
             *
             * example:
             * 8990
             */
            balance?: number;
            balance_currency?: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
        }
        export interface ContractPricingInformation {
            entity_type: "contract";
            entity_id: string;
            title?: string;
            current_installment_amount?: InstallmentAmountValue;
            context?: ConfigurationHistoryContext;
            balance?: PricingInformationBalance;
            schedule?: ContractPricingSchedule;
            pending_installment_change?: boolean;
            history: ConfigurationHistoryRow[];
        }
        export interface ContractPricingSchedule {
            /**
             * Day of the month when installments are due. 0 means no fixed billing day is configured.
             */
            billing_due_day?: number;
            billing_period?: "weekly" | "monthly" | "every_quarter" | "every_6_months" | "yearly";
            installments_per_year?: number;
            inferred: boolean;
        }
        /**
         * Correction event (Korrekturbuchung).
         * Represents an adjustment to a previous billing entry,
         * such as correcting an overcharge or undercharge.
         * Can be either debit or credit depending on the correction.
         *
         * example:
         * {
         *   "type": "correction",
         *   "direction": "credit",
         *   "billing_amount": 200,
         *   "billing_amount_decimal": "2.00",
         *   "billing_currency": "EUR",
         *   "note": "Corrected previous overcharge",
         *   "booking_date": "2025-06-22"
         * }
         */
        export interface CorrectionEvent {
            [name: string]: any;
            _id?: /**
             * Unique entity identifier (UUID format)
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Display title of the entity (Anzeigetitel)
             * example:
             * Abschlagszahlung Juli 2025
             */
            _title?: string;
            /**
             * Organization ID the entity belongs to (Organisations-ID)
             * example:
             * 123456
             */
            _org?: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema (Schema-Slug)
             * example:
             * billing_event
             */
            EntitySlug;
            /**
             * Tags for categorization and filtering (Schlagwörter)
             * example:
             * [
             *   "billing",
             *   "energy"
             * ]
             */
            _tags?: string[];
            /**
             * Timestamp when the entity was created (Erstellungszeitpunkt)
             * example:
             * 2025-06-15T10:30:00Z
             */
            _created_at?: string; // date-time
            /**
             * Timestamp when the entity was last updated (Aktualisierungszeitpunkt)
             * example:
             * 2025-06-15T14:45:00Z
             */
            _updated_at?: string; // date-time
            /**
             * Event type identifier
             * example:
             * installment
             */
            type: "correction";
            /**
             * The accounting direction of the transaction:
             * - debit (Soll): increases the customer’s liability (e.g. invoice issued)
             * - credit (Haben): reduces the liability (e.g. payment received)
             *
             * Automatically inferred based on event type if not specified.
             *
             * example:
             * debit
             */
            direction?: "debit" | "credit";
            /**
             * Betrag in Cent (net or gross depending on context)
             * example:
             * 10000
             */
            billing_amount: number;
            /**
             * Decimal representation of billing_amount for display or reporting
             * example:
             * 100.00
             */
            billing_amount_decimal: string;
            billing_currency: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * External system identifier (e.g. SAP FI/CA document number, Zahlungsavis ID)
             * example:
             * SAP-54321
             */
            external_id?: string;
            /**
             * Link to the associated Vertragskonto or contract object
             */
            contract: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * General ledger booking date (Buchungsdatum) for the billing event.
             * Used to determine when the entry was accounted for in the system.
             * Applies to all event types (debits and credits).
             * Can be used together with due_date or paid_date
             *
             * example:
             * 2025-06-15
             */
            booking_date: string; // date
            /**
             * Due date of the invoice or charge (Fälligkeitsdatum)
             * example:
             * 2025-06-30
             */
            due_date?: string; // date
            /**
             * Booking date (Zahlungseingang, Wertstellung)
             * example:
             * 2025-06-15T10:00:00Z
             */
            paid_date?: string; // date-time
            /**
             * Status of the billing event. Defaults to closed.
             */
            status?: "closed" | "open";
            /**
             * Optional reference to a previous event e.g. a chargeback or a correction to a previous installment
             * example:
             * d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e
             */
            related_event?: string;
            /**
             * Optional link to an external resource e.g. an invoice in a customer portal
             */
            external_link?: {
                /**
                 * URL of the external resource
                 * example:
                 * https://billing.example.com/invoices/12345
                 */
                href?: string; // uri
                /**
                 * Title of the external resource
                 * example:
                 * Invoice 12345
                 */
                title?: string;
            };
            /**
             * Optional reference to e.g. an invoice file associated with the billing event
             */
            attachments?: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * Öffentliche Notiz sichtbar für den Kunden, z.B. auf der Rechnung oder im Kundenportal
             * example:
             * Teilzahlung für Abschlag Juni
             */
            note?: string;
            /**
             * Interne Notiz, nur sichtbar für Sachbearbeiter (nicht für Kunden sichtbar)
             * example:
             * Rückmeldung von SAP: Betrag aus Zahlungsavis 2025-06-14 übernommen
             */
            internal_note?: string;
        }
        /**
         * Currency code in ISO 4217 format (Währungscode).
         * Common values: EUR (Euro), CHF (Swiss Franc)
         *
         * example:
         * EUR
         */
        export type Currency = string;
        /**
         * Custom billing event (Benutzerdefinierte Buchung).
         * Allows for organization-specific billing event types not covered
         * by the standard types. Use a descriptive type name.
         *
         * example:
         * {
         *   "type": "grid_fee_adjustment",
         *   "direction": "debit",
         *   "billing_amount": 3200,
         *   "billing_amount_decimal": "32.00",
         *   "billing_currency": "EUR",
         *   "note": "Netznachberechnung für Mai",
         *   "booking_date": "2025-06-11"
         * }
         */
        export interface CustomEvent {
            [name: string]: any;
            _id?: /**
             * Unique entity identifier (UUID format)
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Display title of the entity (Anzeigetitel)
             * example:
             * Abschlagszahlung Juli 2025
             */
            _title?: string;
            /**
             * Organization ID the entity belongs to (Organisations-ID)
             * example:
             * 123456
             */
            _org?: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema (Schema-Slug)
             * example:
             * billing_event
             */
            EntitySlug;
            /**
             * Tags for categorization and filtering (Schlagwörter)
             * example:
             * [
             *   "billing",
             *   "energy"
             * ]
             */
            _tags?: string[];
            /**
             * Timestamp when the entity was created (Erstellungszeitpunkt)
             * example:
             * 2025-06-15T10:30:00Z
             */
            _created_at?: string; // date-time
            /**
             * Timestamp when the entity was last updated (Aktualisierungszeitpunkt)
             * example:
             * 2025-06-15T14:45:00Z
             */
            _updated_at?: string; // date-time
            /**
             * Custom billing event type (Freitext).
             * Use a descriptive identifier for your custom event type.
             * Examples: grid_fee_adjustment, meter_rental, special_charge
             *
             * example:
             * installment
             */
            type: void;
            /**
             * The accounting direction of the transaction:
             * - debit (Soll): increases the customer’s liability (e.g. invoice issued)
             * - credit (Haben): reduces the liability (e.g. payment received)
             *
             * Automatically inferred based on event type if not specified.
             *
             * example:
             * debit
             */
            direction?: "debit" | "credit";
            /**
             * Betrag in Cent (net or gross depending on context)
             * example:
             * 10000
             */
            billing_amount: number;
            /**
             * Decimal representation of billing_amount for display or reporting
             * example:
             * 100.00
             */
            billing_amount_decimal: string;
            billing_currency: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * External system identifier (e.g. SAP FI/CA document number, Zahlungsavis ID)
             * example:
             * SAP-54321
             */
            external_id?: string;
            /**
             * Link to the associated Vertragskonto or contract object
             */
            contract: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * General ledger booking date (Buchungsdatum) for the billing event.
             * Used to determine when the entry was accounted for in the system.
             * Applies to all event types (debits and credits).
             * Can be used together with due_date or paid_date
             *
             * example:
             * 2025-06-15
             */
            booking_date: string; // date
            /**
             * Due date of the invoice or charge (Fälligkeitsdatum)
             * example:
             * 2025-06-30
             */
            due_date?: string; // date
            /**
             * Booking date (Zahlungseingang, Wertstellung)
             * example:
             * 2025-06-15T10:00:00Z
             */
            paid_date?: string; // date-time
            /**
             * Status of the billing event. Defaults to closed.
             */
            status?: "closed" | "open";
            /**
             * Optional reference to a previous event e.g. a chargeback or a correction to a previous installment
             * example:
             * d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e
             */
            related_event?: string;
            /**
             * Optional link to an external resource e.g. an invoice in a customer portal
             */
            external_link?: {
                /**
                 * URL of the external resource
                 * example:
                 * https://billing.example.com/invoices/12345
                 */
                href?: string; // uri
                /**
                 * Title of the external resource
                 * example:
                 * Invoice 12345
                 */
                title?: string;
            };
            /**
             * Optional reference to e.g. an invoice file associated with the billing event
             */
            attachments?: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * Öffentliche Notiz sichtbar für den Kunden, z.B. auf der Rechnung oder im Kundenportal
             * example:
             * Teilzahlung für Abschlag Juni
             */
            note?: string;
            /**
             * Interne Notiz, nur sichtbar für Sachbearbeiter (nicht für Kunden sichtbar)
             * example:
             * Rückmeldung von SAP: Betrag aus Zahlungsavis 2025-06-14 übernommen
             */
            internal_note?: string;
        }
        /**
         * Dunning fee event (Mahngebühr).
         * Represents a late payment fee charged to the customer
         * after a payment reminder has been sent. This is a debit transaction.
         *
         * example:
         * {
         *   "type": "dunning_fee",
         *   "direction": "debit",
         *   "note": "Late fee for April invoice",
         *   "status": "open",
         *   "booking_date": "2025-06-10",
         *   "due_date": "2025-06-10",
         *   "billing_amount": 1500,
         *   "billing_amount_decimal": "15.00",
         *   "billing_currency": "EUR"
         * }
         */
        export interface DunningFeeEvent {
            [name: string]: any;
            _id?: /**
             * Unique entity identifier (UUID format)
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Display title of the entity (Anzeigetitel)
             * example:
             * Abschlagszahlung Juli 2025
             */
            _title?: string;
            /**
             * Organization ID the entity belongs to (Organisations-ID)
             * example:
             * 123456
             */
            _org?: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema (Schema-Slug)
             * example:
             * billing_event
             */
            EntitySlug;
            /**
             * Tags for categorization and filtering (Schlagwörter)
             * example:
             * [
             *   "billing",
             *   "energy"
             * ]
             */
            _tags?: string[];
            /**
             * Timestamp when the entity was created (Erstellungszeitpunkt)
             * example:
             * 2025-06-15T10:30:00Z
             */
            _created_at?: string; // date-time
            /**
             * Timestamp when the entity was last updated (Aktualisierungszeitpunkt)
             * example:
             * 2025-06-15T14:45:00Z
             */
            _updated_at?: string; // date-time
            /**
             * Event type identifier
             * example:
             * installment
             */
            type: "dunning_fee";
            /**
             * The accounting direction of the transaction:
             * - debit (Soll): increases the customer’s liability (e.g. invoice issued)
             * - credit (Haben): reduces the liability (e.g. payment received)
             *
             * Automatically inferred based on event type if not specified.
             *
             * example:
             * debit
             */
            direction?: "debit" | "credit";
            /**
             * Betrag in Cent (net or gross depending on context)
             * example:
             * 10000
             */
            billing_amount: number;
            /**
             * Decimal representation of billing_amount for display or reporting
             * example:
             * 100.00
             */
            billing_amount_decimal: string;
            billing_currency: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * External system identifier (e.g. SAP FI/CA document number, Zahlungsavis ID)
             * example:
             * SAP-54321
             */
            external_id?: string;
            /**
             * Link to the associated Vertragskonto or contract object
             */
            contract: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * General ledger booking date (Buchungsdatum) for the billing event.
             * Used to determine when the entry was accounted for in the system.
             * Applies to all event types (debits and credits).
             * Can be used together with due_date or paid_date
             *
             * example:
             * 2025-06-15
             */
            booking_date: string; // date
            /**
             * Due date of the invoice or charge (Fälligkeitsdatum)
             * example:
             * 2025-06-30
             */
            due_date?: string; // date
            /**
             * Booking date (Zahlungseingang, Wertstellung)
             * example:
             * 2025-06-15T10:00:00Z
             */
            paid_date?: string; // date-time
            /**
             * Status of the billing event. Defaults to closed.
             */
            status?: "closed" | "open";
            /**
             * Optional reference to a previous event e.g. a chargeback or a correction to a previous installment
             * example:
             * d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e
             */
            related_event?: string;
            /**
             * Optional link to an external resource e.g. an invoice in a customer portal
             */
            external_link?: {
                /**
                 * URL of the external resource
                 * example:
                 * https://billing.example.com/invoices/12345
                 */
                href?: string; // uri
                /**
                 * Title of the external resource
                 * example:
                 * Invoice 12345
                 */
                title?: string;
            };
            /**
             * Optional reference to e.g. an invoice file associated with the billing event
             */
            attachments?: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * Öffentliche Notiz sichtbar für den Kunden, z.B. auf der Rechnung oder im Kundenportal
             * example:
             * Teilzahlung für Abschlag Juni
             */
            note?: string;
            /**
             * Interne Notiz, nur sichtbar für Sachbearbeiter (nicht für Kunden sichtbar)
             * example:
             * Rückmeldung von SAP: Betrag aus Zahlungsavis 2025-06-14 übernommen
             */
            internal_note?: string;
        }
        export interface DynamicTariffPriceContext {
            mode?: string;
            interval?: string;
            average_price_decimal?: string;
            markup_amount_decimal?: string;
            markup_amount_net_decimal?: string;
            markup_amount_gross_decimal?: string;
            market_price_decimal?: string;
            market_price_currency?: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
            market?: string;
            bidding_zone?: string;
            timestamp?: string;
        }
        /**
         * Unique entity identifier (UUID format)
         * example:
         * 5da0a718-c822-403d-9f5d-20d4584e0528
         */
        export type EntityId = string;
        /**
         * Reference to a related entity
         */
        export interface EntityRelationItem {
            /**
             * Entity ID for the related entity (e.g., contract or order)
             * example:
             * f589786b-3024-43cd-9cb3-5a3c953f2896
             */
            entity_id?: string;
        }
        /**
         * URL-friendly identifier for the entity schema (Schema-Slug)
         * example:
         * billing_event
         */
        export type EntitySlug = string;
        /**
         * Standard error response format
         */
        export interface Error {
            /**
             * Error type or HTTP status text
             * example:
             * Bad Request
             */
            error: string;
            /**
             * Human-readable error description
             * example:
             * Invalid request parameters.
             */
            message: string;
        }
        /**
         * Final bill event (Endabrechnung/Schlussrechnung).
         * Represents the final settlement when a contract ends,
         * accounting for actual consumption vs. paid installments.
         * Can be either debit (customer owes more) or credit (customer overpaid).
         *
         * example:
         * {
         *   "type": "final_bill",
         *   "direction": "debit",
         *   "billing_amount": 12000,
         *   "billing_amount_decimal": "120.00",
         *   "billing_currency": "EUR",
         *   "note": "Final invoice after contract termination",
         *   "booking_date": "2025-06-30"
         * }
         */
        export interface FinalBillEvent {
            [name: string]: any;
            _id?: /**
             * Unique entity identifier (UUID format)
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Display title of the entity (Anzeigetitel)
             * example:
             * Abschlagszahlung Juli 2025
             */
            _title?: string;
            /**
             * Organization ID the entity belongs to (Organisations-ID)
             * example:
             * 123456
             */
            _org?: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema (Schema-Slug)
             * example:
             * billing_event
             */
            EntitySlug;
            /**
             * Tags for categorization and filtering (Schlagwörter)
             * example:
             * [
             *   "billing",
             *   "energy"
             * ]
             */
            _tags?: string[];
            /**
             * Timestamp when the entity was created (Erstellungszeitpunkt)
             * example:
             * 2025-06-15T10:30:00Z
             */
            _created_at?: string; // date-time
            /**
             * Timestamp when the entity was last updated (Aktualisierungszeitpunkt)
             * example:
             * 2025-06-15T14:45:00Z
             */
            _updated_at?: string; // date-time
            /**
             * Event type identifier
             * example:
             * installment
             */
            type: "final_bill";
            /**
             * The accounting direction of the transaction:
             * - debit (Soll): increases the customer’s liability (e.g. invoice issued)
             * - credit (Haben): reduces the liability (e.g. payment received)
             *
             * Automatically inferred based on event type if not specified.
             *
             * example:
             * debit
             */
            direction?: "debit" | "credit";
            /**
             * Betrag in Cent (net or gross depending on context)
             * example:
             * 10000
             */
            billing_amount: number;
            /**
             * Decimal representation of billing_amount for display or reporting
             * example:
             * 100.00
             */
            billing_amount_decimal: string;
            billing_currency: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * External system identifier (e.g. SAP FI/CA document number, Zahlungsavis ID)
             * example:
             * SAP-54321
             */
            external_id?: string;
            /**
             * Link to the associated Vertragskonto or contract object
             */
            contract: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * General ledger booking date (Buchungsdatum) for the billing event.
             * Used to determine when the entry was accounted for in the system.
             * Applies to all event types (debits and credits).
             * Can be used together with due_date or paid_date
             *
             * example:
             * 2025-06-15
             */
            booking_date: string; // date
            /**
             * Due date of the invoice or charge (Fälligkeitsdatum)
             * example:
             * 2025-06-30
             */
            due_date?: string; // date
            /**
             * Booking date (Zahlungseingang, Wertstellung)
             * example:
             * 2025-06-15T10:00:00Z
             */
            paid_date?: string; // date-time
            /**
             * Status of the billing event. Defaults to closed.
             */
            status?: "closed" | "open";
            /**
             * Optional reference to a previous event e.g. a chargeback or a correction to a previous installment
             * example:
             * d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e
             */
            related_event?: string;
            /**
             * Optional link to an external resource e.g. an invoice in a customer portal
             */
            external_link?: {
                /**
                 * URL of the external resource
                 * example:
                 * https://billing.example.com/invoices/12345
                 */
                href?: string; // uri
                /**
                 * Title of the external resource
                 * example:
                 * Invoice 12345
                 */
                title?: string;
            };
            /**
             * Optional reference to e.g. an invoice file associated with the billing event
             */
            attachments?: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * Öffentliche Notiz sichtbar für den Kunden, z.B. auf der Rechnung oder im Kundenportal
             * example:
             * Teilzahlung für Abschlag Juni
             */
            note?: string;
            /**
             * Interne Notiz, nur sichtbar für Sachbearbeiter (nicht für Kunden sichtbar)
             * example:
             * Rückmeldung von SAP: Betrag aus Zahlungsavis 2025-06-14 übernommen
             */
            internal_note?: string;
        }
        export interface InstallmentAmountValue {
            /**
             * Amount in cents when available or derivable.
             * example:
             * 10050
             */
            amount?: number;
            /**
             * Decimal amount string when available or derivable.
             * example:
             * 100.50
             */
            amount_decimal?: string;
            currency?: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
        }
        /**
         * Installment billing event (Abschlagszahlung).
         * Represents a scheduled partial payment that the customer owes,
         * typically billed monthly for utilities like electricity or gas.
         *
         * example:
         * {
         *   "type": "installment",
         *   "direction": "debit",
         *   "note": "July power & gas installment payment",
         *   "status": "open",
         *   "booking_date": "2025-07-10",
         *   "due_date": "2025-07-10",
         *   "billing_amount": 5000,
         *   "billing_amount_decimal": "50.00",
         *   "billing_currency": "EUR"
         * }
         */
        export interface InstallmentEvent {
            [name: string]: any;
            _id?: /**
             * Unique entity identifier (UUID format)
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Display title of the entity (Anzeigetitel)
             * example:
             * Abschlagszahlung Juli 2025
             */
            _title?: string;
            /**
             * Organization ID the entity belongs to (Organisations-ID)
             * example:
             * 123456
             */
            _org?: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema (Schema-Slug)
             * example:
             * billing_event
             */
            EntitySlug;
            /**
             * Tags for categorization and filtering (Schlagwörter)
             * example:
             * [
             *   "billing",
             *   "energy"
             * ]
             */
            _tags?: string[];
            /**
             * Timestamp when the entity was created (Erstellungszeitpunkt)
             * example:
             * 2025-06-15T10:30:00Z
             */
            _created_at?: string; // date-time
            /**
             * Timestamp when the entity was last updated (Aktualisierungszeitpunkt)
             * example:
             * 2025-06-15T14:45:00Z
             */
            _updated_at?: string; // date-time
            /**
             * Event type identifier
             * example:
             * installment
             */
            type: "installment";
            /**
             * The accounting direction of the transaction:
             * - debit (Soll): increases the customer’s liability (e.g. invoice issued)
             * - credit (Haben): reduces the liability (e.g. payment received)
             *
             * Automatically inferred based on event type if not specified.
             *
             * example:
             * debit
             */
            direction?: "debit" | "credit";
            /**
             * Betrag in Cent (net or gross depending on context)
             * example:
             * 10000
             */
            billing_amount: number;
            /**
             * Decimal representation of billing_amount for display or reporting
             * example:
             * 100.00
             */
            billing_amount_decimal: string;
            billing_currency: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * External system identifier (e.g. SAP FI/CA document number, Zahlungsavis ID)
             * example:
             * SAP-54321
             */
            external_id?: string;
            /**
             * Link to the associated Vertragskonto or contract object
             */
            contract: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * General ledger booking date (Buchungsdatum) for the billing event.
             * Used to determine when the entry was accounted for in the system.
             * Applies to all event types (debits and credits).
             * Can be used together with due_date or paid_date
             *
             * example:
             * 2025-06-15
             */
            booking_date: string; // date
            /**
             * Due date of the invoice or charge (Fälligkeitsdatum)
             * example:
             * 2025-06-30
             */
            due_date: string; // date
            /**
             * Booking date (Zahlungseingang, Wertstellung)
             * example:
             * 2025-06-15T10:00:00Z
             */
            paid_date?: string; // date-time
            /**
             * Status of the billing event. Defaults to closed.
             */
            status?: "closed" | "open";
            /**
             * Optional reference to a previous event e.g. a chargeback or a correction to a previous installment
             * example:
             * d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e
             */
            related_event?: string;
            /**
             * Optional link to an external resource e.g. an invoice in a customer portal
             */
            external_link?: {
                /**
                 * URL of the external resource
                 * example:
                 * https://billing.example.com/invoices/12345
                 */
                href?: string; // uri
                /**
                 * Title of the external resource
                 * example:
                 * Invoice 12345
                 */
                title?: string;
            };
            /**
             * Optional reference to e.g. an invoice file associated with the billing event
             */
            attachments?: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * Öffentliche Notiz sichtbar für den Kunden, z.B. auf der Rechnung oder im Kundenportal
             * example:
             * Teilzahlung für Abschlag Juni
             */
            note?: string;
            /**
             * Interne Notiz, nur sichtbar für Sachbearbeiter (nicht für Kunden sichtbar)
             * example:
             * Rückmeldung von SAP: Betrag aus Zahlungsavis 2025-06-14 übernommen
             */
            internal_note?: string;
        }
        /**
         * Represents a single financial transaction entry (Buchungssatz) in the billing ledger.
         * Each entry is either a debit or a credit, following double-entry accounting principles.
         * Common types include Abschlagszahlung (installment), Zahlungseingang (payment), Rückerstattung (reimbursement), etc.
         *
         * example:
         * {
         *   "type": "invoice",
         *   "direction": "debit",
         *   "billing_amount": 8500,
         *   "billing_amount_decimal": "85.00",
         *   "billing_currency": "EUR",
         *   "note": "Einmalige Rechnung für Zusatzleistung",
         *   "booking_date": "2025-06-25",
         *   "due_date": "2025-07-01"
         * }
         */
        export interface InvoiceEvent {
            [name: string]: any;
            _id?: /**
             * Unique entity identifier (UUID format)
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Display title of the entity (Anzeigetitel)
             * example:
             * Abschlagszahlung Juli 2025
             */
            _title?: string;
            /**
             * Organization ID the entity belongs to (Organisations-ID)
             * example:
             * 123456
             */
            _org?: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema (Schema-Slug)
             * example:
             * billing_event
             */
            EntitySlug;
            /**
             * Tags for categorization and filtering (Schlagwörter)
             * example:
             * [
             *   "billing",
             *   "energy"
             * ]
             */
            _tags?: string[];
            /**
             * Timestamp when the entity was created (Erstellungszeitpunkt)
             * example:
             * 2025-06-15T10:30:00Z
             */
            _created_at?: string; // date-time
            /**
             * Timestamp when the entity was last updated (Aktualisierungszeitpunkt)
             * example:
             * 2025-06-15T14:45:00Z
             */
            _updated_at?: string; // date-time
            /**
             * The classification of the billing transaction.
             * This field is used to group financial events for reporting or reconciliation.
             * Common examples:
             *   - installment (Abschlagszahlung)
             *   - payment (Zahlungseingang)
             *   - reimbursement (Rückerstattung)
             *   - dunning_fee (Mahngebühr)
             *   - chargeback (Lastschrift-Rückgabe)
             *   - final_bill (Endabrechnung)
             *   - bonus (Gutschrift)
             *   - correction (Korrekturbuchung)
             *
             * example:
             * installment
             */
            type: "invoice";
            /**
             * The accounting direction of the transaction:
             * - debit (Soll): increases the customer’s liability (e.g. invoice issued)
             * - credit (Haben): reduces the liability (e.g. payment received)
             *
             * Automatically inferred based on event type if not specified.
             *
             * example:
             * debit
             */
            direction?: "debit" | "credit";
            /**
             * Betrag in Cent (net or gross depending on context)
             * example:
             * 10000
             */
            billing_amount: number;
            /**
             * Decimal representation of billing_amount for display or reporting
             * example:
             * 100.00
             */
            billing_amount_decimal: string;
            billing_currency: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * External system identifier (e.g. SAP FI/CA document number, Zahlungsavis ID)
             * example:
             * SAP-54321
             */
            external_id?: string;
            /**
             * Link to the associated Vertragskonto or contract object
             */
            contract: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * General ledger booking date (Buchungsdatum) for the billing event.
             * Used to determine when the entry was accounted for in the system.
             * Applies to all event types (debits and credits).
             * Can be used together with due_date or paid_date
             *
             * example:
             * 2025-06-15
             */
            booking_date: string; // date
            /**
             * Due date of the invoice or charge (Fälligkeitsdatum)
             * example:
             * 2025-06-30
             */
            due_date: string; // date
            /**
             * Booking date (Zahlungseingang, Wertstellung)
             * example:
             * 2025-06-15T10:00:00Z
             */
            paid_date?: string; // date-time
            /**
             * Status of the billing event. Defaults to closed.
             */
            status?: "closed" | "open";
            /**
             * Optional reference to a previous event e.g. a chargeback or a correction to a previous installment
             * example:
             * d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e
             */
            related_event?: string;
            /**
             * Optional link to an external resource e.g. an invoice in a customer portal
             */
            external_link?: {
                /**
                 * URL of the external resource
                 * example:
                 * https://billing.example.com/invoices/12345
                 */
                href?: string; // uri
                /**
                 * Title of the external resource
                 * example:
                 * Invoice 12345
                 */
                title?: string;
            };
            /**
             * Optional reference to e.g. an invoice file associated with the billing event
             */
            attachments?: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * Öffentliche Notiz sichtbar für den Kunden, z.B. auf der Rechnung oder im Kundenportal
             * example:
             * Teilzahlung für Abschlag Juni
             */
            note?: string;
            /**
             * Interne Notiz, nur sichtbar für Sachbearbeiter (nicht für Kunden sichtbar)
             * example:
             * Rückmeldung von SAP: Betrag aus Zahlungsavis 2025-06-14 übernommen
             */
            internal_note?: string;
        }
        /**
         * Payment received event (Zahlungseingang).
         * Represents money received from the customer, reducing their balance.
         * This is a credit transaction.
         *
         * example:
         * {
         *   "type": "payment",
         *   "direction": "credit",
         *   "note": "Payment reference 001234567",
         *   "status": "closed",
         *   "booking_date": "2025-06-15",
         *   "due_date": "2025-06-15",
         *   "paid_date": "2025-06-09T10:00:00Z",
         *   "billing_amount": 5000,
         *   "billing_amount_decimal": "50.00",
         *   "billing_currency": "EUR"
         * }
         */
        export interface PaymentEvent {
            [name: string]: any;
            _id?: /**
             * Unique entity identifier (UUID format)
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Display title of the entity (Anzeigetitel)
             * example:
             * Abschlagszahlung Juli 2025
             */
            _title?: string;
            /**
             * Organization ID the entity belongs to (Organisations-ID)
             * example:
             * 123456
             */
            _org?: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema (Schema-Slug)
             * example:
             * billing_event
             */
            EntitySlug;
            /**
             * Tags for categorization and filtering (Schlagwörter)
             * example:
             * [
             *   "billing",
             *   "energy"
             * ]
             */
            _tags?: string[];
            /**
             * Timestamp when the entity was created (Erstellungszeitpunkt)
             * example:
             * 2025-06-15T10:30:00Z
             */
            _created_at?: string; // date-time
            /**
             * Timestamp when the entity was last updated (Aktualisierungszeitpunkt)
             * example:
             * 2025-06-15T14:45:00Z
             */
            _updated_at?: string; // date-time
            /**
             * Event type identifier
             * example:
             * installment
             */
            type: "payment";
            /**
             * The accounting direction of the transaction:
             * - debit (Soll): increases the customer’s liability (e.g. invoice issued)
             * - credit (Haben): reduces the liability (e.g. payment received)
             *
             * Automatically inferred based on event type if not specified.
             *
             * example:
             * debit
             */
            direction?: "debit" | "credit";
            /**
             * Betrag in Cent (net or gross depending on context)
             * example:
             * 10000
             */
            billing_amount: number;
            /**
             * Decimal representation of billing_amount for display or reporting
             * example:
             * 100.00
             */
            billing_amount_decimal: string;
            billing_currency: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * External system identifier (e.g. SAP FI/CA document number, Zahlungsavis ID)
             * example:
             * SAP-54321
             */
            external_id?: string;
            /**
             * Link to the associated Vertragskonto or contract object
             */
            contract: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * General ledger booking date (Buchungsdatum) for the billing event.
             * Used to determine when the entry was accounted for in the system.
             * Applies to all event types (debits and credits).
             * Can be used together with due_date or paid_date
             *
             * example:
             * 2025-06-15
             */
            booking_date: string; // date
            /**
             * Due date of the invoice or charge (Fälligkeitsdatum)
             * example:
             * 2025-06-30
             */
            due_date?: string; // date
            /**
             * Booking date (Zahlungseingang, Wertstellung)
             * example:
             * 2025-06-15T10:00:00Z
             */
            paid_date?: string; // date-time
            /**
             * Status of the billing event. Defaults to closed.
             */
            status?: "closed" | "open";
            /**
             * Optional reference to a previous event e.g. a chargeback or a correction to a previous installment
             * example:
             * d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e
             */
            related_event?: string;
            /**
             * Optional link to an external resource e.g. an invoice in a customer portal
             */
            external_link?: {
                /**
                 * URL of the external resource
                 * example:
                 * https://billing.example.com/invoices/12345
                 */
                href?: string; // uri
                /**
                 * Title of the external resource
                 * example:
                 * Invoice 12345
                 */
                title?: string;
            };
            /**
             * Optional reference to e.g. an invoice file associated with the billing event
             */
            attachments?: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * Öffentliche Notiz sichtbar für den Kunden, z.B. auf der Rechnung oder im Kundenportal
             * example:
             * Teilzahlung für Abschlag Juni
             */
            note?: string;
            /**
             * Interne Notiz, nur sichtbar für Sachbearbeiter (nicht für Kunden sichtbar)
             * example:
             * Rückmeldung von SAP: Betrag aus Zahlungsavis 2025-06-14 übernommen
             */
            internal_note?: string;
        }
        export interface PriceContext {
            price_id?: string;
            price_title?: string;
            pricing_model?: string;
            unit_amount_gross_decimal?: string;
            unit_amount_net_decimal?: string;
            before_discount_unit_amount_gross_decimal?: string;
            before_discount_unit_amount_net_decimal?: string;
            unit_discount_amount_decimal?: string;
            unit_discount_amount_net_decimal?: string;
            currency?: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
            billing_period?: string;
            unit?: string;
            has_discount?: boolean;
            is_dynamic_tariff?: boolean;
            dynamic_tariff?: DynamicTariffPriceContext;
        }
        export interface PricingInformationBalance {
            /**
             * example:
             * 8990
             */
            amount?: number;
            /**
             * example:
             * 89.90
             */
            amount_decimal?: string;
            currency?: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
        }
        /**
         * Reimbursement event (Rückerstattung).
         * Represents a refund to the customer, typically after overpayment
         * or billing correction. This is a credit transaction.
         *
         * example:
         * {
         *   "type": "reimbursement",
         *   "direction": "credit",
         *   "billing_amount": 10000,
         *   "billing_amount_decimal": "100.00",
         *   "billing_currency": "EUR",
         *   "note": "Refund due to meter correction",
         *   "booking_date": "2025-06-16",
         *   "paid_date": "2025-06-18T14:00:00Z"
         * }
         */
        export interface ReimbursementEvent {
            [name: string]: any;
            _id?: /**
             * Unique entity identifier (UUID format)
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            EntityId;
            /**
             * Display title of the entity (Anzeigetitel)
             * example:
             * Abschlagszahlung Juli 2025
             */
            _title?: string;
            /**
             * Organization ID the entity belongs to (Organisations-ID)
             * example:
             * 123456
             */
            _org?: string;
            _schema?: /**
             * URL-friendly identifier for the entity schema (Schema-Slug)
             * example:
             * billing_event
             */
            EntitySlug;
            /**
             * Tags for categorization and filtering (Schlagwörter)
             * example:
             * [
             *   "billing",
             *   "energy"
             * ]
             */
            _tags?: string[];
            /**
             * Timestamp when the entity was created (Erstellungszeitpunkt)
             * example:
             * 2025-06-15T10:30:00Z
             */
            _created_at?: string; // date-time
            /**
             * Timestamp when the entity was last updated (Aktualisierungszeitpunkt)
             * example:
             * 2025-06-15T14:45:00Z
             */
            _updated_at?: string; // date-time
            /**
             * Event type identifier
             * example:
             * installment
             */
            type: "reimbursement";
            /**
             * The accounting direction of the transaction:
             * - debit (Soll): increases the customer’s liability (e.g. invoice issued)
             * - credit (Haben): reduces the liability (e.g. payment received)
             *
             * Automatically inferred based on event type if not specified.
             *
             * example:
             * debit
             */
            direction?: "debit" | "credit";
            /**
             * Betrag in Cent (net or gross depending on context)
             * example:
             * 10000
             */
            billing_amount: number;
            /**
             * Decimal representation of billing_amount for display or reporting
             * example:
             * 100.00
             */
            billing_amount_decimal: string;
            billing_currency: /**
             * Currency code in ISO 4217 format (Währungscode).
             * Common values: EUR (Euro), CHF (Swiss Franc)
             *
             * example:
             * EUR
             */
            Currency;
            /**
             * External system identifier (e.g. SAP FI/CA document number, Zahlungsavis ID)
             * example:
             * SAP-54321
             */
            external_id?: string;
            /**
             * Link to the associated Vertragskonto or contract object
             */
            contract: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * General ledger booking date (Buchungsdatum) for the billing event.
             * Used to determine when the entry was accounted for in the system.
             * Applies to all event types (debits and credits).
             * Can be used together with due_date or paid_date
             *
             * example:
             * 2025-06-15
             */
            booking_date: string; // date
            /**
             * Due date of the invoice or charge (Fälligkeitsdatum)
             * example:
             * 2025-06-30
             */
            due_date?: string; // date
            /**
             * Booking date (Zahlungseingang, Wertstellung)
             * example:
             * 2025-06-15T10:00:00Z
             */
            paid_date?: string; // date-time
            /**
             * Status of the billing event. Defaults to closed.
             */
            status?: "closed" | "open";
            /**
             * Optional reference to a previous event e.g. a chargeback or a correction to a previous installment
             * example:
             * d4fb2a4e-3f74-4fc4-8fba-6fdaaaa3b08e
             */
            related_event?: string;
            /**
             * Optional link to an external resource e.g. an invoice in a customer portal
             */
            external_link?: {
                /**
                 * URL of the external resource
                 * example:
                 * https://billing.example.com/invoices/12345
                 */
                href?: string; // uri
                /**
                 * Title of the external resource
                 * example:
                 * Invoice 12345
                 */
                title?: string;
            };
            /**
             * Optional reference to e.g. an invoice file associated with the billing event
             */
            attachments?: {
                $relation?: /* Reference to a related entity */ EntityRelationItem[];
            };
            /**
             * Öffentliche Notiz sichtbar für den Kunden, z.B. auf der Rechnung oder im Kundenportal
             * example:
             * Teilzahlung für Abschlag Juni
             */
            note?: string;
            /**
             * Interne Notiz, nur sichtbar für Sachbearbeiter (nicht für Kunden sichtbar)
             * example:
             * Rückmeldung von SAP: Betrag aus Zahlungsavis 2025-06-14 übernommen
             */
            internal_note?: string;
        }
    }
}
declare namespace Paths {
    namespace CreateBillingEvent {
        export type RequestBody = /**
         * Collection of supported billing event types (Buchungsarten).
         * Each type represents a different kind of financial transaction
         * that affects the customer's balance.
         *
         */
        Components.Schemas.BillingEvent;
        namespace Responses {
            export type $201 = /**
             * Collection of supported billing event types (Buchungsarten).
             * Each type represents a different kind of financial transaction
             * that affects the customer's balance.
             *
             */
            Components.Schemas.BillingEvent;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $422 = Components.Responses.UnprocessableEntity;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace CreateContractEntity {
        export type RequestBody = /**
         * Represents a customer contract (Vertrag) for billing purposes.
         * Contracts are the parent entities for billing events and contain
         * billing configuration such as installment amounts and billing cycles.
         *
         */
        Components.Schemas.Contract;
        namespace Responses {
            export type $201 = /* Contract entity with all required system fields populated */ Components.Schemas.ContractItem;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $422 = Components.Responses.UnprocessableEntity;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace DeleteBillingEvent {
        namespace Parameters {
            /**
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace DeleteContractEntity {
        namespace Parameters {
            /**
             * example:
             * f589786b-3024-43cd-9cb3-5a3c953f2896
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * f589786b-3024-43cd-9cb3-5a3c953f2896
             */
            Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetBillingAccountConfigurationHistory {
        namespace Parameters {
            export type ChangeType = "installment_amount_changed";
            export type From = number;
            export type Id = string;
            export type Size = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            change_type?: Parameters.ChangeType;
            from?: Parameters.From;
            size?: Parameters.Size;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ConfigurationHistoryResponse;
        }
    }
    namespace GetBillingAccountPricingInformation {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.BillingAccountPricingInformation;
        }
    }
    namespace GetBillingEvent {
        namespace Parameters {
            /**
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Parameters.Id;
        }
        namespace Responses {
            export type $200 = /**
             * Collection of supported billing event types (Buchungsarten).
             * Each type represents a different kind of financial transaction
             * that affects the customer's balance.
             *
             */
            Components.Schemas.BillingEvent;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetBillingEventByExternalId {
        namespace Parameters {
            /**
             * example:
             * SAP-54321
             */
            export type ExternalId = string;
        }
        export interface PathParameters {
            external_id: /**
             * example:
             * SAP-54321
             */
            Parameters.ExternalId;
        }
        namespace Responses {
            export type $200 = /**
             * Collection of supported billing event types (Buchungsarten).
             * Each type represents a different kind of financial transaction
             * that affects the customer's balance.
             *
             */
            Components.Schemas.BillingEvent;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetBillingEvents {
        namespace Parameters {
            /**
             * example:
             * 1e3f0d58-69d2-4dbb-9a43-3ee63d862e8e
             */
            export type ContactId = string;
            /**
             * example:
             * 2025-01-01T00:00:00Z
             */
            export type DateAfter = string; // date-time
            /**
             * example:
             * 2025-12-31T23:59:59Z
             */
            export type DateBefore = string; // date-time
            export type EntityId = string[];
            /**
             * example:
             * installment
             */
            export type EventType = "installment" | "reimbursement";
            /**
             * example:
             * 0
             */
            export type From = number;
            /**
             * example:
             * 100
             */
            export type Size = number;
        }
        export interface QueryParameters {
            from?: /**
             * example:
             * 0
             */
            Parameters.From;
            size?: /**
             * example:
             * 100
             */
            Parameters.Size;
            entity_id?: Parameters.EntityId;
            contact_id?: /**
             * example:
             * 1e3f0d58-69d2-4dbb-9a43-3ee63d862e8e
             */
            Parameters.ContactId;
            event_type?: /**
             * example:
             * installment
             */
            Parameters.EventType;
            date_after?: /**
             * example:
             * 2025-01-01T00:00:00Z
             */
            Parameters.DateAfter /* date-time */;
            date_before?: /**
             * example:
             * 2025-12-31T23:59:59Z
             */
            Parameters.DateBefore /* date-time */;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Total number of billing events matching the query
                 * example:
                 * 42
                 */
                hits?: number;
                /**
                 * List of billing events for the current page
                 */
                results?: /**
                 * Collection of supported billing event types (Buchungsarten).
                 * Each type represents a different kind of financial transaction
                 * that affects the customer's balance.
                 *
                 */
                Components.Schemas.BillingEvent[];
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace GetContractConfigurationHistory {
        namespace Parameters {
            export type ChangeType = "installment_amount_changed";
            export type From = number;
            export type Id = string;
            export type Size = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            change_type?: Parameters.ChangeType;
            from?: Parameters.From;
            size?: Parameters.Size;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ConfigurationHistoryResponse;
        }
    }
    namespace GetContractPricingInformation {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ContractPricingInformation;
        }
    }
    namespace GetCustomerBalance {
        namespace Parameters {
            /**
             * example:
             * 1e3f0d58-69d2-4dbb-9a43-3ee63d862e8e
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 1e3f0d58-69d2-4dbb-9a43-3ee63d862e8e
             */
            Parameters.Id;
        }
        namespace Responses {
            export type $200 = /**
             * Customer balance summary (Kontostandübersicht).
             * Represents the aggregated balance across all contracts and orders for a customer.
             *
             */
            Components.Schemas.Balance;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UpdateBillingEvent {
        namespace Parameters {
            /**
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * 5da0a718-c822-403d-9f5d-20d4584e0528
             */
            Parameters.Id;
        }
        export type RequestBody = /* Fields to update on an existing billing event. */ Components.Schemas.BillingEventUpdate;
        namespace Responses {
            export type $200 = /**
             * Collection of supported billing event types (Buchungsarten).
             * Each type represents a different kind of financial transaction
             * that affects the customer's balance.
             *
             */
            Components.Schemas.BillingEvent;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $422 = Components.Responses.UnprocessableEntity;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
    namespace UpdateContractEntity {
        namespace Parameters {
            /**
             * example:
             * f589786b-3024-43cd-9cb3-5a3c953f2896
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * example:
             * f589786b-3024-43cd-9cb3-5a3c953f2896
             */
            Parameters.Id;
        }
        export type RequestBody = /**
         * Represents a customer contract (Vertrag) for billing purposes.
         * Contracts are the parent entities for billing events and contain
         * billing configuration such as installment amounts and billing cycles.
         *
         */
        Components.Schemas.Contract;
        namespace Responses {
            export type $200 = /* Contract entity with all required system fields populated */ Components.Schemas.ContractItem;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $422 = Components.Responses.UnprocessableEntity;
            export type $500 = Components.Responses.InternalServerError;
        }
    }
}


export interface OperationMethods {
  /**
   * getBillingEvents - getBillingEvents
   * 
   * Retrieve and filter billing events (Buchungssätze) such as installments (Abschlagszahlungen),
   * payments (Zahlungseingänge), and reimbursements (Rückerstattungen).
   * 
   * Results are paginated and can be filtered by entity, contact, event type, or date range.
   * 
   */
  'getBillingEvents'(
    parameters?: Parameters<Paths.GetBillingEvents.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBillingEvents.Responses.$200>
  /**
   * createBillingEvent - createBillingEvent
   * 
   * Create a new billing event (Buchungssatz) such as an installment (Abschlagszahlung),
   * payment (Zahlungseingang), or reimbursement (Rückerstattung).
   * 
   * The billing event will be linked to a contract and will affect the customer's balance.
   * 
   */
  'createBillingEvent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateBillingEvent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateBillingEvent.Responses.$201>
  /**
   * getBillingEvent - getBillingEvent
   * 
   * Retrieve a single billing event (Buchungssatz) by its unique ID.
   * 
   */
  'getBillingEvent'(
    parameters?: Parameters<Paths.GetBillingEvent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBillingEvent.Responses.$200>
  /**
   * updateBillingEvent - updateBillingEvent
   * 
   * Update an existing billing event (Buchungssatz).
   * 
   * Only the fields provided in the request body will be updated.
   * Common use cases include updating status from "open" to "closed" after payment,
   * or correcting billing amounts.
   * 
   */
  'updateBillingEvent'(
    parameters?: Parameters<Paths.UpdateBillingEvent.PathParameters> | null,
    data?: Paths.UpdateBillingEvent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateBillingEvent.Responses.$200>
  /**
   * deleteBillingEvent - deleteBillingEvent
   * 
   * Delete an existing billing event (Buchungssatz).
   * 
   * **Warning**: Deleting billing events affects the customer's balance calculation.
   * Consider using a correction event (Korrekturbuchung) instead for audit purposes.
   * 
   */
  'deleteBillingEvent'(
    parameters?: Parameters<Paths.DeleteBillingEvent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteBillingEvent.Responses.$204>
  /**
   * getBillingEventByExternalId - getBillingEventByExternalId
   * 
   * Retrieve a billing event (Buchungssatz) by its external system identifier.
   * 
   * This endpoint is useful for integrations with external systems such as SAP FI/CA,
   * ERP systems, or payment processors that maintain their own reference IDs.
   * 
   */
  'getBillingEventByExternalId'(
    parameters?: Parameters<Paths.GetBillingEventByExternalId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBillingEventByExternalId.Responses.$200>
  /**
   * createContractEntity - createContractEntity
   * 
   * Create a new contract entity (Vertrag) for billing purposes.
   * 
   * Contracts serve as the parent entity for billing events and contain billing
   * settings such as installment amounts (Abschlagsbeträge), billing periods
   * (Abrechnungszeiträume), and customer addresses.
   * 
   */
  'createContractEntity'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateContractEntity.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateContractEntity.Responses.$201>
  /**
   * updateContractEntity - updateContractEntity
   * 
   * Update an existing contract entity (Vertrag).
   * 
   * Only the fields provided in the request body will be updated.
   * Common use cases include updating billing settings, changing status,
   * or recording termination details.
   * 
   */
  'updateContractEntity'(
    parameters?: Parameters<Paths.UpdateContractEntity.PathParameters> | null,
    data?: Paths.UpdateContractEntity.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateContractEntity.Responses.$200>
  /**
   * deleteContractEntity - deleteContractEntity
   * 
   * Delete an existing contract entity (Vertrag).
   * 
   * **Warning**: Deleting a contract will affect all associated billing events.
   * Consider setting the contract status to "terminated" instead for audit purposes.
   * 
   */
  'deleteContractEntity'(
    parameters?: Parameters<Paths.DeleteContractEntity.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteContractEntity.Responses.$204>
  /**
   * getContractPricingInformation - getContractPricingInformation
   * 
   * Get current pricing information and recent configuration history for a Contract.
   */
  'getContractPricingInformation'(
    parameters?: Parameters<Paths.GetContractPricingInformation.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetContractPricingInformation.Responses.$200>
  /**
   * getBillingAccountPricingInformation - getBillingAccountPricingInformation
   * 
   * Get current pricing information for the active Contracts linked to a Billing Account.
   */
  'getBillingAccountPricingInformation'(
    parameters?: Parameters<Paths.GetBillingAccountPricingInformation.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBillingAccountPricingInformation.Responses.$200>
  /**
   * getContractConfigurationHistory - getContractConfigurationHistory
   * 
   * Get billing configuration history for a Contract.
   */
  'getContractConfigurationHistory'(
    parameters?: Parameters<Paths.GetContractConfigurationHistory.QueryParameters & Paths.GetContractConfigurationHistory.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetContractConfigurationHistory.Responses.$200>
  /**
   * getBillingAccountConfigurationHistory - getBillingAccountConfigurationHistory
   * 
   * Get merged billing configuration history for active Contracts linked to a Billing Account.
   */
  'getBillingAccountConfigurationHistory'(
    parameters?: Parameters<Paths.GetBillingAccountConfigurationHistory.QueryParameters & Paths.GetBillingAccountConfigurationHistory.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBillingAccountConfigurationHistory.Responses.$200>
  /**
   * getCustomerBalance - getCustomerBalance
   * 
   * Retrieve the total balance (Kontostand) across all contracts and orders for a customer.
   * 
   * The balance is calculated from the sum of all billing events (Buchungssätze) associated
   * with the customer's contracts. A positive balance indicates the customer owes money;
   * a negative balance indicates a credit (Guthaben) in the customer's favor.
   * 
   */
  'getCustomerBalance'(
    parameters?: Parameters<Paths.GetCustomerBalance.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCustomerBalance.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/billing/events']: {
    /**
     * getBillingEvents - getBillingEvents
     * 
     * Retrieve and filter billing events (Buchungssätze) such as installments (Abschlagszahlungen),
     * payments (Zahlungseingänge), and reimbursements (Rückerstattungen).
     * 
     * Results are paginated and can be filtered by entity, contact, event type, or date range.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetBillingEvents.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBillingEvents.Responses.$200>
    /**
     * createBillingEvent - createBillingEvent
     * 
     * Create a new billing event (Buchungssatz) such as an installment (Abschlagszahlung),
     * payment (Zahlungseingang), or reimbursement (Rückerstattung).
     * 
     * The billing event will be linked to a contract and will affect the customer's balance.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateBillingEvent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateBillingEvent.Responses.$201>
  }
  ['/v1/billing/events/{id}']: {
    /**
     * getBillingEvent - getBillingEvent
     * 
     * Retrieve a single billing event (Buchungssatz) by its unique ID.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetBillingEvent.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBillingEvent.Responses.$200>
    /**
     * updateBillingEvent - updateBillingEvent
     * 
     * Update an existing billing event (Buchungssatz).
     * 
     * Only the fields provided in the request body will be updated.
     * Common use cases include updating status from "open" to "closed" after payment,
     * or correcting billing amounts.
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateBillingEvent.PathParameters> | null,
      data?: Paths.UpdateBillingEvent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateBillingEvent.Responses.$200>
    /**
     * deleteBillingEvent - deleteBillingEvent
     * 
     * Delete an existing billing event (Buchungssatz).
     * 
     * **Warning**: Deleting billing events affects the customer's balance calculation.
     * Consider using a correction event (Korrekturbuchung) instead for audit purposes.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteBillingEvent.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteBillingEvent.Responses.$204>
  }
  ['/v1/billing/external/{external_id}']: {
    /**
     * getBillingEventByExternalId - getBillingEventByExternalId
     * 
     * Retrieve a billing event (Buchungssatz) by its external system identifier.
     * 
     * This endpoint is useful for integrations with external systems such as SAP FI/CA,
     * ERP systems, or payment processors that maintain their own reference IDs.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetBillingEventByExternalId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBillingEventByExternalId.Responses.$200>
  }
  ['/v1/billing/contracts']: {
    /**
     * createContractEntity - createContractEntity
     * 
     * Create a new contract entity (Vertrag) for billing purposes.
     * 
     * Contracts serve as the parent entity for billing events and contain billing
     * settings such as installment amounts (Abschlagsbeträge), billing periods
     * (Abrechnungszeiträume), and customer addresses.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateContractEntity.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateContractEntity.Responses.$201>
  }
  ['/v1/billing/contracts/{id}']: {
    /**
     * updateContractEntity - updateContractEntity
     * 
     * Update an existing contract entity (Vertrag).
     * 
     * Only the fields provided in the request body will be updated.
     * Common use cases include updating billing settings, changing status,
     * or recording termination details.
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateContractEntity.PathParameters> | null,
      data?: Paths.UpdateContractEntity.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateContractEntity.Responses.$200>
    /**
     * deleteContractEntity - deleteContractEntity
     * 
     * Delete an existing contract entity (Vertrag).
     * 
     * **Warning**: Deleting a contract will affect all associated billing events.
     * Consider setting the contract status to "terminated" instead for audit purposes.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteContractEntity.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteContractEntity.Responses.$204>
  }
  ['/v1/billing/contracts/{id}/pricing_information']: {
    /**
     * getContractPricingInformation - getContractPricingInformation
     * 
     * Get current pricing information and recent configuration history for a Contract.
     */
    'get'(
      parameters?: Parameters<Paths.GetContractPricingInformation.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetContractPricingInformation.Responses.$200>
  }
  ['/v1/billing/billing_accounts/{id}/pricing_information']: {
    /**
     * getBillingAccountPricingInformation - getBillingAccountPricingInformation
     * 
     * Get current pricing information for the active Contracts linked to a Billing Account.
     */
    'get'(
      parameters?: Parameters<Paths.GetBillingAccountPricingInformation.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBillingAccountPricingInformation.Responses.$200>
  }
  ['/v1/billing/contracts/{id}/configuration_history']: {
    /**
     * getContractConfigurationHistory - getContractConfigurationHistory
     * 
     * Get billing configuration history for a Contract.
     */
    'get'(
      parameters?: Parameters<Paths.GetContractConfigurationHistory.QueryParameters & Paths.GetContractConfigurationHistory.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetContractConfigurationHistory.Responses.$200>
  }
  ['/v1/billing/billing_accounts/{id}/configuration_history']: {
    /**
     * getBillingAccountConfigurationHistory - getBillingAccountConfigurationHistory
     * 
     * Get merged billing configuration history for active Contracts linked to a Billing Account.
     */
    'get'(
      parameters?: Parameters<Paths.GetBillingAccountConfigurationHistory.QueryParameters & Paths.GetBillingAccountConfigurationHistory.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBillingAccountConfigurationHistory.Responses.$200>
  }
  ['/v1/billing/customers/{id}/balance']: {
    /**
     * getCustomerBalance - getCustomerBalance
     * 
     * Retrieve the total balance (Kontostand) across all contracts and orders for a customer.
     * 
     * The balance is calculated from the sum of all billing events (Buchungssätze) associated
     * with the customer's contracts. A positive balance indicates the customer owes money;
     * a negative balance indicates a credit (Guthaben) in the customer's favor.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetCustomerBalance.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCustomerBalance.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Balance = Components.Schemas.Balance;
export type BaseBillingEvent = Components.Schemas.BaseBillingEvent;
export type BaseEntity = Components.Schemas.BaseEntity;
export type BillingAccountPricingInformation = Components.Schemas.BillingAccountPricingInformation;
export type BillingEvent = Components.Schemas.BillingEvent;
export type BillingEventUpdate = Components.Schemas.BillingEventUpdate;
export type BonusEvent = Components.Schemas.BonusEvent;
export type ConfigurationHistoryContext = Components.Schemas.ConfigurationHistoryContext;
export type ConfigurationHistoryResponse = Components.Schemas.ConfigurationHistoryResponse;
export type ConfigurationHistoryRow = Components.Schemas.ConfigurationHistoryRow;
export type Contract = Components.Schemas.Contract;
export type ContractItem = Components.Schemas.ContractItem;
export type ContractPricingInformation = Components.Schemas.ContractPricingInformation;
export type ContractPricingSchedule = Components.Schemas.ContractPricingSchedule;
export type CorrectionEvent = Components.Schemas.CorrectionEvent;
export type Currency = Components.Schemas.Currency;
export type CustomEvent = Components.Schemas.CustomEvent;
export type DunningFeeEvent = Components.Schemas.DunningFeeEvent;
export type DynamicTariffPriceContext = Components.Schemas.DynamicTariffPriceContext;
export type EntityId = Components.Schemas.EntityId;
export type EntityRelationItem = Components.Schemas.EntityRelationItem;
export type EntitySlug = Components.Schemas.EntitySlug;
export type Error = Components.Schemas.Error;
export type FinalBillEvent = Components.Schemas.FinalBillEvent;
export type InstallmentAmountValue = Components.Schemas.InstallmentAmountValue;
export type InstallmentEvent = Components.Schemas.InstallmentEvent;
export type InvoiceEvent = Components.Schemas.InvoiceEvent;
export type PaymentEvent = Components.Schemas.PaymentEvent;
export type PriceContext = Components.Schemas.PriceContext;
export type PricingInformationBalance = Components.Schemas.PricingInformationBalance;
export type ReimbursementEvent = Components.Schemas.ReimbursementEvent;
