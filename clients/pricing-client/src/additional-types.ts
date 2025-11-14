/**
 * Additional legacy types that were removed from the OpenAPI specification
 * because they are no longer used by the API.
 *
 * These types remain temporarily for backwards compatibility and will be
 * removed once all dependent code has been migrated.
 */

import { Address, Amounts, Customer, MetaData, OrderStatus, PriceItems, PriceTier, TotalDetails } from './openapi';

export interface AvailabilityDate {
  /**
   * The availability interval start date
   * example:
   * 2017-07-21
   */
  available_start_date?: string; // date
  /**
   * The availability interval end date
   * example:
   * 2017-07-21
   */
  available_end_date?: string; // date
}

export interface PriceTierEnhanced extends PriceTier {
  unit_amount_gross?: number;
  unit_amount_gross_decimal?: string;
  flat_fee_amount_gross?: number;
  flat_fee_amount_gross_decimal?: string;
}

export interface Cart extends Amounts {
  /**
   * The cart identifier
   */
  id?: string;
  /**
   * The user's Organization Id the cart belongs to
   */
  org_id?: string;
  /**
   * The status of the Cart:
   * - open - the cart checkout is still in progress. Payment processing has not started
   * - complete - the cart checkout is complete. Payment processing may still be in progress
   * - expired - the cart checkout has expired. No further processing will occur
   *
   */
  status?: OrderStatus;
  customer?: Customer;
  billing_address?: Address;
  delivery_address?: Address;
  metadata?: /* A set of key-value pairs used to store meta data information about an entity. */ MetaData;
  line_items?: /* Tracks a set of product prices, quantities, (discounts) and taxes. */ PriceItems;
  total_details?: /* The total details with tax (and discount) aggregated totals. */ TotalDetails;
  created_at?: string; // date-time
  updated_at?: string; // date-time
}
