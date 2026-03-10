# Validation Rules API

**API Name:** `validation-rules`
**Base URL:** `https://validation-rules.sls.epilot.io`

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `getValidationRules` | GET | `/v1/validation-rules` | Get all validation rules by organization Id |
| `createValidationRule` | POST | `/v1/validation-rules` | Create Validation Rule |
| `getValidationRuleById` | GET | `/v1/validation-rules/{ruleId}` | Get validation rule by ID |
| `updateValidationRule` | PATCH | `/v1/validation-rules/{ruleId}` | Update Validation Rule (partial update) |
| `deleteValidationRule` | DELETE | `/v1/validation-rules/{ruleId}` | Delete Validation Rule |
| `addUsedByReference` | POST | `/v1/validation-rules/{ruleId}/used-by` | Add a reference to the usedBy array |
| `removeUsedByReference` | DELETE | `/v1/validation-rules/{ruleId}/used-by` | Remove a reference from the usedBy array |

## Usage

```bash
epilot validation-rules getValidationRules
```
