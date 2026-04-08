import type { ValidationRule } from '../types.js';
import { crossRefIntegrityRule } from './cross-ref-integrity.js';
import { danglingUuidsRule } from './dangling-uuids.js';
import { emailAddressesRule } from './email-addresses.js';
import { environmentUrlsRule } from './environment-urls.js';
import { incompleteWebhooksRule } from './incomplete-webhooks.js';
import { publicJourneySafetyRule } from './public-journey-safety.js';
import { sourceOrgRefsRule } from './source-org-refs.js';
import { tokenDetectionRule } from './token-detection.js';

/** All built-in validation rules in priority order */
export const allRules: ValidationRule[] = [
  danglingUuidsRule,
  sourceOrgRefsRule,
  crossRefIntegrityRule,
  tokenDetectionRule,
  publicJourneySafetyRule,
  incompleteWebhooksRule,
  environmentUrlsRule,
  emailAddressesRule,
];

export {
  danglingUuidsRule,
  sourceOrgRefsRule,
  crossRefIntegrityRule,
  tokenDetectionRule,
  publicJourneySafetyRule,
  incompleteWebhooksRule,
  environmentUrlsRule,
  emailAddressesRule,
};
