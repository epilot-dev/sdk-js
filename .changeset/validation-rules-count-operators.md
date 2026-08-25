---
"@epilot/validation-rules-client": minor
---

Add `maxDigits` and `maxDecimals` comparison operators to v2 validation rules

Two new count operators for number and text input types: `maxDigits` limits how many digits the written input may contain in total (grouping separators, sign and the decimal separator are not counted), `maxDecimals` limits how many digits may follow the decimal separator. Both take a non-negative integer comparison value.
