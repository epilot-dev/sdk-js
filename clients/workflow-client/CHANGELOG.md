# Changelog

## 1.24.0

### Minor Changes

- Bulk start of flows: one flow per job (`flow_template_id`, `flow`), up to 10,000 entities via `entities_query`, a `preparing` status with `preparation` progress, job `counts` / `failure` / `entity_count`, `flow.automatic_tasks`, and the new `listBulkStartFlowsJobItems` operation (`GET /v2/flows/bulk-jobs/{job_id}/items`). Breaking for typed callers: `flow_template_ids` and `flows` are removed from the bulk-start types.

## 1.22.0

### Minor Changes

- Added on hold assignees

## 1.21.0

### Minor Changes

- updated value type for variable assignee

## 1.20.0

### Minor Changes

- Updated specs for assigned_to for variable assignment

## 1.19.0

### Minor Changes

- Add support for AI agent configs and condition attribute sub-fields

## 1.18.0

### Minor Changes

- Add new cancel schedule endpoint & deprecate old one

## 1.16.0

### Minor Changes

- - Add task/phase descriptions
  - Add revert_execution param to allow user choosing whether to revert
    execution to a previous task
  - Add loop_config to phases

## 1.15.2

### Patch Changes

- Upgrade openapi-client-axios to ^7.8.0 across all clients

## 1.15.1

### Patch Changes

- Mark access as public for all packages

## 1.15.0

### Minor Changes

- Minor version bump for all client packages

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.1](https://github.com/epilot-dev/sdk-js/compare/v1.0.0...v0.1.1) (2022-03-09)
