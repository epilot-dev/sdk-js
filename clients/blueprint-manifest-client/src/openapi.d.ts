/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Parameters {
        export type JobID = /**
         * ID of an import or export job (state machine)
         * example:
         * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
         */
        Schemas.JobID;
    }
    export interface PathParameters {
        JobID?: Parameters.JobID;
    }
    namespace Schemas {
        export interface AppBlueprint {
            id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            title: string;
            slug?: string;
            description?: {
                /**
                 * Markdown content shown before starting to install the blueprint
                 * example:
                 * This is the content of the preinstall.md file which contains the blueprint description.
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
            version?: string;
            latest_download_file?: S3Reference;
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            /**
             * Whether the blueprint is verified by epilot
             */
            is_verified?: boolean;
            source_type: "app";
            resources?: InstalledBlueprintResource[];
        }
        export type Blueprint = CustomBlueprint | FileBlueprint | MarketplaceBlueprint | DeployedBlueprint | AppBlueprint;
        export interface BlueprintExportJob {
            id?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID;
            events?: BlueprintJobEvent[];
            triggered_at?: string; // date-time
            created_by?: CallerIdentity;
            blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            status?: "IN_PROGRESS" | "SUCCESS" | "FAILED" | "CANCELED";
            download_file?: S3Reference;
        }
        /**
         * ID of a blueprint
         * example:
         * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
         */
        export type BlueprintID = string;
        export type BlueprintInstallStatus = "SUCCESS" | "PARTIAL" | "FAILED";
        export interface BlueprintInstallationJob {
            id?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID;
            events?: BlueprintJobEvent[];
            triggered_at?: string; // date-time
            created_by?: CallerIdentity;
            source_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            source_blueprint_type?: "custom" | "file" | "marketplace" | "deploy" | "app";
            source_org_id?: string;
            destination_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            destination_org_id?: string;
            status?: "IN_PROGRESS" | "WAITING_USER_ACTION" | "CANCELED" | "SUCCESS" | "FAILED";
        }
        export type BlueprintJob = BlueprintExportJob | BlueprintInstallationJob;
        export interface BlueprintJobEvent {
            timestamp?: string; // date-time
            message?: string;
            errors?: FormattedError[];
            level?: "info" | "warning" | "error";
            data?: {
                [name: string]: any;
            };
        }
        /**
         * ID of a job
         * example:
         * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
         */
        export type BlueprintJobID = string;
        export interface BlueprintResource {
            id: /**
             * ID of a blueprint resource
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintResourceID;
            name?: string;
            type: /* Type of the resource */ ResourceNodeType;
            address?: string;
            /**
             * When a resource is marked as root, we'll be able to keep track of it's dependencies
             */
            is_root?: boolean;
            /**
             * on EditableBlueprintResources, this indicates if the resource is ready to be exported and on InstalledBlueprintResources, this indicates if the resource is ready to be used
             */
            is_ready?: boolean;
        }
        /**
         * ID of a blueprint resource
         * example:
         * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
         */
        export type BlueprintResourceID = string;
        export interface CallerIdentity {
            /**
             * a human readable name of the caller (e.g. user name, token name or email address)
             * example:
             * manifest@epilot.cloud
             */
            name?: any;
            /**
             * epilot organization id
             * example:
             * 911690
             */
            org_id: string;
            /**
             * epilot user id, when called by a user
             * example:
             * 11001045
             */
            user_id?: string;
            /**
             * token id, when called by API token
             * example:
             * api_5ZugdRXasLfWBypHi93Fk
             */
            token_id?: string;
        }
        export interface CommonBlueprintFields {
            id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            title: string;
            slug?: string;
            description?: {
                /**
                 * Markdown content shown before starting to install the blueprint
                 * example:
                 * This is the content of the preinstall.md file which contains the blueprint description.
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
            version?: string;
            latest_download_file?: S3Reference;
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
        }
        export interface CommonBlueprintJobFields {
            id?: /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintJobID;
            events?: BlueprintJobEvent[];
            triggered_at?: string; // date-time
            created_by?: CallerIdentity;
        }
        export interface CommonImportFields {
            source_type?: ManifestSource;
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            imported_resources?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ RootResourceNode[] | RootResourceNode;
            /**
             * An URL to download the imported resources when the resources are too large to be included in the response
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/large.json
             */
            large_imported_resources_url?: string; // uri
        }
        export interface CommonManifestFields {
            manifest_id?: /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            ManifestID;
            source_type?: ManifestSource;
            /**
             * example:
             * Solar B2B
             */
            source_blueprint_name?: string;
            /**
             * URL slug of a blueprint from the epilot marketplace
             * example:
             * solar-b2b
             */
            source_blueprint_slug?: string;
            /**
             * Version of the blueprint (semver)
             * example:
             * 1.0.0
             */
            source_blueprint_version?: string;
            /**
             * A URL to download the source blueprint file used to import the blueprint
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/manifest.zip
             */
            source_blueprint_file?: string;
            /**
             * Link to the blueprint documentation
             * example:
             * https://help.epilot.cloud
             */
            docs_link?: string;
            source_blueprint_file_ref?: S3Reference;
            install_status?: BlueprintInstallStatus;
            /**
             * example:
             * This blueprint installation resulted in a partial deployment; some resources were created successfully, but  failed to complete the full resource setup.
             */
            install_status_description?: string;
            /**
             * Whether the manifest comes from a trusted source and is signed by epilot
             */
            is_verified?: boolean;
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            /**
             * Version of the manifest (semver)
             * example:
             * 1.0.0
             */
            manifest_version?: string;
            /**
             * All the resources that were selected to be exported, used to pre-select the resources when updating a sandbox manifest
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/selected_resources.json
             */
            selected_resources_url?: string;
            /**
             * All the resources that were marked as ready by the user
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/ready_imported_resources.json
             */
            ready_imported_resources_url?: string;
            /**
             * Information about the manifest that was deployed from, used to update existing deployments instead of always creating new ones
             */
            deployed_from?: {
                /**
                 * ID of the organization that deployed the manifest
                 */
                source_organization_id?: string;
                /**
                 * ID of the manifest that was deployed
                 */
                source_manifest_id?: string;
                source_organization_type?: "sandbox" | "production";
                /**
                 * When the deployment was last triggered
                 */
                last_triggered_at?: string; // date-time
            };
            /**
             * Information about the manifest that was deployed to, used to update existing deployments instead of always creating new ones
             */
            deployed_to?: {
                /**
                 * ID of the organization that the manifest was deployed to
                 */
                destination_organization_id?: string;
                /**
                 * ID of the manifest that was deployed to
                 */
                destination_manifest_id?: string;
                destination_organization_type?: "sandbox" | "production";
                /**
                 * When the deployment was last triggered
                 */
                last_triggered_at?: string; // date-time
            }[];
        }
        export interface CommonMarkdownFields {
            /**
             * Markdown content part of a manifest file
             */
            markdown?: {
                /**
                 * Markdown content shown before installing the manifest
                 * example:
                 * This is the content of the manifest.md file which contains the manifest descripton.
                 *
                 */
                manifest?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the preinstall.md file
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
        }
        export interface CommonResourceNode {
            /**
             * ID of the resource
             */
            id: string;
            type: /* Type of the resource */ ResourceNodeType;
            /**
             * Name of the resource
             */
            name?: string;
            /**
             * Source ID of the resource
             */
            source_id?: string;
            /**
             * Whether the resource is virtual
             */
            is_virtual?: boolean;
        }
        export interface CustomBlueprint {
            id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            title: string;
            slug?: string;
            description?: {
                /**
                 * Markdown content shown before starting to install the blueprint
                 * example:
                 * This is the content of the preinstall.md file which contains the blueprint description.
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
            version?: string;
            latest_download_file?: S3Reference;
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            resources?: EditableBlueprintResource[];
            source_type: "custom";
        }
        export interface DeployedBlueprint {
            id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            title: string;
            slug?: string;
            description?: {
                /**
                 * Markdown content shown before starting to install the blueprint
                 * example:
                 * This is the content of the preinstall.md file which contains the blueprint description.
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
            version?: string;
            latest_download_file?: S3Reference;
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            source_type: "deploy";
            resources?: InstalledBlueprintResource[];
        }
        export interface EditableBlueprintResource {
            id: /**
             * ID of a blueprint resource
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintResourceID;
            name?: string;
            type: /* Type of the resource */ ResourceNodeType;
            address?: string;
            /**
             * When a resource is marked as root, we'll be able to keep track of it's dependencies
             */
            is_root?: boolean;
            /**
             * on EditableBlueprintResources, this indicates if the resource is ready to be exported and on InstalledBlueprintResources, this indicates if the resource is ready to be used
             */
            is_ready?: boolean;
            /**
             * An internal note to help remember what's missing to export the resource
             */
            note?: string;
        }
        export interface FileBlueprint {
            id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            title: string;
            slug?: string;
            description?: {
                /**
                 * Markdown content shown before starting to install the blueprint
                 * example:
                 * This is the content of the preinstall.md file which contains the blueprint description.
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
            version?: string;
            latest_download_file?: S3Reference;
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            /**
             * Whether the blueprint is verified by epilot
             */
            is_verified?: boolean;
            source_type: "file";
            resources?: InstalledBlueprintResource[];
        }
        export interface FormattedError {
            error?: string | {
                [key: string]: any;
            };
            code?: FormattedErrorCodes;
            data?: FormattedErrorData;
        }
        export type FormattedErrorCodes = "dependency_extraction" | "resource_not_found" | "resource_fetch_api_error" | "resource_fetch_unknown_error" | "terraform_cli_process_error" | "terraform_import_block_process_error" | "terraform_init_error" | "terraform_plan_error" | "terraform_apply_error" | "terraform_show_error" | "generic_error";
        export interface FormattedErrorData {
            resource?: {
                id?: string;
                name?: string;
                type?: string;
            };
        }
        export interface InstalledBlueprintResource {
            id: /**
             * ID of a blueprint resource
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintResourceID;
            name?: string;
            type: /* Type of the resource */ ResourceNodeType;
            address?: string;
            /**
             * When a resource is marked as root, we'll be able to keep track of it's dependencies
             */
            is_root?: boolean;
            /**
             * on EditableBlueprintResources, this indicates if the resource is ready to be exported and on InstalledBlueprintResources, this indicates if the resource is ready to be used
             */
            is_ready?: boolean;
            impact_on_install?: "create" | "update" | "no-op" | "delete";
        }
        export interface Job {
            job_id?: /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            JobID;
            job_status?: JobStatus;
            /**
             * The S3 key of the manifest file
             */
            manifest_file_path?: string;
            message?: string;
            timestamp?: string; // date-time
            /**
             * An URL to download the plan file
             */
            plan_file_content?: string;
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            resources_to_export?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ RootResourceNode[] | RootResourceNode;
            /**
             * An URL to download the resources to export when the resources are too large to be included in the response
             */
            large_resources_to_export_url?: string;
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            resources_to_import?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ RootResourceNode[] | RootResourceNode;
            /**
             * An URL to download the resources to import when the resources are too large to be included in the response
             */
            large_resources_to_import_url?: string;
            resource_replacements?: ResourceReplacement[];
            /**
             * Whether the manifest comes from a trusted source and is signed by epilot
             */
            is_verified?: boolean;
            errors?: FormattedError[];
            source_type?: ManifestSource;
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            imported_resources?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ RootResourceNode[] | RootResourceNode;
            /**
             * An URL to download the imported resources when the resources are too large to be included in the response
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/large.json
             */
            large_imported_resources_url?: string; // uri
            /**
             * Markdown content part of a manifest file
             */
            markdown?: {
                /**
                 * Markdown content shown before installing the manifest
                 * example:
                 * This is the content of the manifest.md file which contains the manifest descripton.
                 *
                 */
                manifest?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the preinstall.md file
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
            manifest_id?: /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            ManifestID;
            /**
             * example:
             * Solar B2B
             */
            source_blueprint_name?: string;
            /**
             * URL slug of a blueprint from the epilot marketplace
             * example:
             * solar-b2b
             */
            source_blueprint_slug?: string;
            /**
             * Version of the blueprint (semver)
             * example:
             * 1.0.0
             */
            source_blueprint_version?: string;
            /**
             * A URL to download the source blueprint file used to import the blueprint
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/manifest.zip
             */
            source_blueprint_file?: string;
            /**
             * Link to the blueprint documentation
             * example:
             * https://help.epilot.cloud
             */
            docs_link?: string;
            source_blueprint_file_ref?: S3Reference;
            install_status?: BlueprintInstallStatus;
            /**
             * example:
             * This blueprint installation resulted in a partial deployment; some resources were created successfully, but  failed to complete the full resource setup.
             */
            install_status_description?: string;
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            /**
             * Version of the manifest (semver)
             * example:
             * 1.0.0
             */
            manifest_version?: string;
            /**
             * All the resources that were selected to be exported, used to pre-select the resources when updating a sandbox manifest
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/selected_resources.json
             */
            selected_resources_url?: string;
            /**
             * All the resources that were marked as ready by the user
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/ready_imported_resources.json
             */
            ready_imported_resources_url?: string;
            /**
             * Information about the manifest that was deployed from, used to update existing deployments instead of always creating new ones
             */
            deployed_from?: {
                /**
                 * ID of the organization that deployed the manifest
                 */
                source_organization_id?: string;
                /**
                 * ID of the manifest that was deployed
                 */
                source_manifest_id?: string;
                source_organization_type?: "sandbox" | "production";
                /**
                 * When the deployment was last triggered
                 */
                last_triggered_at?: string; // date-time
            };
            /**
             * Information about the manifest that was deployed to, used to update existing deployments instead of always creating new ones
             */
            deployed_to?: {
                /**
                 * ID of the organization that the manifest was deployed to
                 */
                destination_organization_id?: string;
                /**
                 * ID of the manifest that was deployed to
                 */
                destination_manifest_id?: string;
                destination_organization_type?: "sandbox" | "production";
                /**
                 * When the deployment was last triggered
                 */
                last_triggered_at?: string; // date-time
            }[];
        }
        /**
         * ID of an import or export job (state machine)
         * example:
         * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
         */
        export type JobID = string;
        export type JobStatus = "PENDING" | "STARTED" | "WAITING_USER_ACTION" | "CANCELED" | "IN_PROGRESS" | "SUCCESS" | "FAILED";
        export interface Manifest {
            import_job_id?: /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            JobID;
            /**
             * List of job IDs that were used to install the manifest
             */
            previous_jobs_ids?: string[];
            /**
             * List of jobs that were used to install the manifest
             */
            previous_jobs?: Job[];
            manifest_id?: /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            ManifestID;
            source_type?: ManifestSource;
            /**
             * example:
             * Solar B2B
             */
            source_blueprint_name?: string;
            /**
             * URL slug of a blueprint from the epilot marketplace
             * example:
             * solar-b2b
             */
            source_blueprint_slug?: string;
            /**
             * Version of the blueprint (semver)
             * example:
             * 1.0.0
             */
            source_blueprint_version?: string;
            /**
             * A URL to download the source blueprint file used to import the blueprint
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/manifest.zip
             */
            source_blueprint_file?: string;
            /**
             * Link to the blueprint documentation
             * example:
             * https://help.epilot.cloud
             */
            docs_link?: string;
            source_blueprint_file_ref?: S3Reference;
            install_status?: BlueprintInstallStatus;
            /**
             * example:
             * This blueprint installation resulted in a partial deployment; some resources were created successfully, but  failed to complete the full resource setup.
             */
            install_status_description?: string;
            /**
             * Whether the manifest comes from a trusted source and is signed by epilot
             */
            is_verified?: boolean;
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            /**
             * Version of the manifest (semver)
             * example:
             * 1.0.0
             */
            manifest_version?: string;
            /**
             * All the resources that were selected to be exported, used to pre-select the resources when updating a sandbox manifest
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/selected_resources.json
             */
            selected_resources_url?: string;
            /**
             * All the resources that were marked as ready by the user
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/ready_imported_resources.json
             */
            ready_imported_resources_url?: string;
            /**
             * Information about the manifest that was deployed from, used to update existing deployments instead of always creating new ones
             */
            deployed_from?: {
                /**
                 * ID of the organization that deployed the manifest
                 */
                source_organization_id?: string;
                /**
                 * ID of the manifest that was deployed
                 */
                source_manifest_id?: string;
                source_organization_type?: "sandbox" | "production";
                /**
                 * When the deployment was last triggered
                 */
                last_triggered_at?: string; // date-time
            };
            /**
             * Information about the manifest that was deployed to, used to update existing deployments instead of always creating new ones
             */
            deployed_to?: {
                /**
                 * ID of the organization that the manifest was deployed to
                 */
                destination_organization_id?: string;
                /**
                 * ID of the manifest that was deployed to
                 */
                destination_manifest_id?: string;
                destination_organization_type?: "sandbox" | "production";
                /**
                 * When the deployment was last triggered
                 */
                last_triggered_at?: string; // date-time
            }[];
            /**
             * Markdown content part of a manifest file
             */
            markdown?: {
                /**
                 * Markdown content shown before installing the manifest
                 * example:
                 * This is the content of the manifest.md file which contains the manifest descripton.
                 *
                 */
                manifest?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the preinstall.md file
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
            /**
             * An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import
             */
            imported_resources?: /* An array of tree-like JSON objects or a singular tree-like JSON object representing the resources to import */ RootResourceNode[] | RootResourceNode;
            /**
             * An URL to download the imported resources when the resources are too large to be included in the response
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/large.json
             */
            large_imported_resources_url?: string; // uri
            /**
             * When the manifest was first installed (applied)
             */
            created_at?: string; // date-time
            /**
             * When the manifest was last updated (applied)
             */
            updated_at?: string; // date-time
        }
        /**
         * ID of an imported / installed manifest
         * example:
         * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
         */
        export type ManifestID = string;
        export interface ManifestItem {
            manifest_id?: /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            ManifestID;
            source_type?: ManifestSource;
            /**
             * example:
             * Solar B2B
             */
            source_blueprint_name?: string;
            /**
             * URL slug of a blueprint from the epilot marketplace
             * example:
             * solar-b2b
             */
            source_blueprint_slug?: string;
            /**
             * Version of the blueprint (semver)
             * example:
             * 1.0.0
             */
            source_blueprint_version?: string;
            /**
             * A URL to download the source blueprint file used to import the blueprint
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/manifest.zip
             */
            source_blueprint_file?: string;
            /**
             * Link to the blueprint documentation
             * example:
             * https://help.epilot.cloud
             */
            docs_link?: string;
            source_blueprint_file_ref?: S3Reference;
            install_status?: BlueprintInstallStatus;
            /**
             * example:
             * This blueprint installation resulted in a partial deployment; some resources were created successfully, but  failed to complete the full resource setup.
             */
            install_status_description?: string;
            /**
             * Whether the manifest comes from a trusted source and is signed by epilot
             */
            is_verified?: boolean;
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            /**
             * Version of the manifest (semver)
             * example:
             * 1.0.0
             */
            manifest_version?: string;
            /**
             * All the resources that were selected to be exported, used to pre-select the resources when updating a sandbox manifest
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/selected_resources.json
             */
            selected_resources_url?: string;
            /**
             * All the resources that were marked as ready by the user
             * example:
             * https://blueprint-manifest-prod.s3.eu-central-1.amazonaws.com/ready_imported_resources.json
             */
            ready_imported_resources_url?: string;
            /**
             * Information about the manifest that was deployed from, used to update existing deployments instead of always creating new ones
             */
            deployed_from?: {
                /**
                 * ID of the organization that deployed the manifest
                 */
                source_organization_id?: string;
                /**
                 * ID of the manifest that was deployed
                 */
                source_manifest_id?: string;
                source_organization_type?: "sandbox" | "production";
                /**
                 * When the deployment was last triggered
                 */
                last_triggered_at?: string; // date-time
            };
            /**
             * Information about the manifest that was deployed to, used to update existing deployments instead of always creating new ones
             */
            deployed_to?: {
                /**
                 * ID of the organization that the manifest was deployed to
                 */
                destination_organization_id?: string;
                /**
                 * ID of the manifest that was deployed to
                 */
                destination_manifest_id?: string;
                destination_organization_type?: "sandbox" | "production";
                /**
                 * When the deployment was last triggered
                 */
                last_triggered_at?: string; // date-time
            }[];
            /**
             * When the manifest was first installed (applied)
             */
            created_at?: string; // date-time
            /**
             * When the manifest was last updated (applied)
             */
            updated_at?: string; // date-time
        }
        export type ManifestSource = "file" | "marketplace" | "sandbox";
        export interface ManifestTimestampFields {
            /**
             * When the manifest was first installed (applied)
             */
            created_at?: string; // date-time
            /**
             * When the manifest was last updated (applied)
             */
            updated_at?: string; // date-time
        }
        export interface MarketplaceBlueprint {
            id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            BlueprintID;
            title: string;
            slug?: string;
            description?: {
                /**
                 * Markdown content shown before starting to install the blueprint
                 * example:
                 * This is the content of the preinstall.md file which contains the blueprint description.
                 *
                 */
                preinstall?: string;
                /**
                 * Markdown content to be displayed when showing the plan to install blueprint
                 * example:
                 * This is the content of the postinstall.md file
                 *
                 */
                postinstall?: string;
            };
            version?: string;
            latest_download_file?: S3Reference;
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: CallerIdentity;
            updated_by?: CallerIdentity;
            /**
             * URL to the blueprint documentation
             */
            docs_url?: string;
            /**
             * Whether the blueprint is verified by epilot
             */
            is_verified?: boolean;
            source_type: "marketplace";
            resources?: InstalledBlueprintResource[];
        }
        export type PlanChanges = ("create" | "update" | "no-op" | "delete")[];
        export interface PutManifestPayload {
            /**
             * Name of the source blueprint
             */
            source_blueprint_name?: string;
            /**
             * Markdown content of the manifest
             */
            markdown?: string;
            /**
             * Array of ids of resources selected to be ready by the user
             */
            ready_resources?: string[];
            deployed_to?: {
                /**
                 * ID of the organization that the manifest was deployed to
                 */
                destination_organization_id?: string;
                /**
                 * ID of the manifest that was deployed to
                 */
                destination_manifest_id?: string;
                destination_organization_type?: "sandbox" | "production";
                last_triggered_at?: string;
            }[];
        }
        export interface ResourceNode {
            /**
             * ID of the resource
             */
            id: string;
            type: /* Type of the resource */ ResourceNodeType;
            /**
             * Name of the resource
             */
            name?: string;
            /**
             * Original ID of the exported resource
             */
            source_id?: string;
            /**
             * Whether the resource is virtual
             */
            is_virtual?: boolean;
            /**
             * Terraform address of the resource
             */
            address?: string;
            /**
             * Dependencies of the resource
             */
            dependencies?: ResourceNode[] | null;
            parents?: {
                id?: string;
                type?: /* Type of the resource */ ResourceNodeType;
            }[];
            changes?: PlanChanges;
        }
        /**
         * Type of the resource
         */
        export type ResourceNodeType = "designbuilder" | "journey" | "product" | "price" | "tax" | "automation_flow" | "entity_mapping" | "file" | "emailtemplate" | "schema" | "schema_attribute" | "schema_capability" | "schema_group" | "schema_group_headline" | "workflow_definition" | "closing_reason" | "taxonomy_classification" | "webhook" | "dashboard" | "custom_variable" | "coupon" | "usergroup" | "saved_view" | "app" | "role" | "portal_config";
        export interface ResourceReplacement {
            /**
             * Original resource ID to be replaced
             */
            originalAddress: string;
            /**
             * ID of the resource that will replace the original
             */
            replacementId: string;
            /**
             * Name of the resource that will replace the original
             */
            replacementName?: string;
        }
        export interface RootResourceNode {
            /**
             * ID of the resource
             */
            id: string;
            type: /* Type of the resource */ ResourceNodeType;
            /**
             * Name of the resource
             */
            name?: string;
            /**
             * Source ID of the resource
             */
            source_id?: string;
            /**
             * Whether the resource is virtual
             */
            is_virtual?: boolean;
            /**
             * Terraform address of the resource
             */
            address?: string;
            /**
             * Dependencies of the resource
             */
            dependencies?: VirtualResourceNodeGroup[] | null;
            changes?: PlanChanges;
        }
        export interface S3Reference {
            /**
             * example:
             * blueprint-manifest-prod-blueprintsv2bucket-sybpsryropzw
             */
            bucket: string;
            /**
             * example:
             * templates/main.tf
             */
            key: string;
        }
        export interface SelectedResources {
            exported_root_resources: {
                id: string;
                type: /* Type of the resource */ ResourceNodeType;
                /**
                 * Terraform address of the resource
                 */
                address?: string;
            }[];
            selected_resources: string[];
            /**
             * Pipeline ID selected when doing the sandbox sync
             */
            pipeline_id?: string;
        }
        export interface UploadFilePayload {
            /**
             * example:
             * example.manifest.zip
             */
            filename: string;
        }
        export interface VirtualResourceNodeGroup {
            /**
             * ID of the resource
             */
            id: string;
            type: /* Type of the resource */ ResourceNodeType;
            /**
             * Name of the resource
             */
            name?: string;
            /**
             * Source ID of the resource
             */
            source_id?: string;
            /**
             * Whether the resource is virtual
             */
            is_virtual?: true;
            dependencies?: ResourceNode[];
        }
    }
}
declare namespace Paths {
    namespace AddBlueprintResource {
        namespace Parameters {
            /**
             * Whether to add this resource dependencies to the blueprint automatically
             */
            export type AddDependencies = boolean;
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        export interface QueryParameters {
            add_dependencies?: /* Whether to add this resource dependencies to the blueprint automatically */ Parameters.AddDependencies;
        }
        export type RequestBody = Components.Schemas.EditableBlueprintResource | Components.Schemas.InstalledBlueprintResource;
        namespace Responses {
            export interface $200 {
                resources?: (Components.Schemas.EditableBlueprintResource | Components.Schemas.InstalledBlueprintResource)[];
            }
        }
    }
    namespace ApplyPlan {
        namespace Parameters {
            export type JobId = /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            Components.Schemas.JobID;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        export interface RequestBody {
            /**
             * List of resources to ignore changes for
             */
            resourcesToIgnore?: string[];
            /**
             * List of resource replacements to apply during import
             */
            resourceReplacements?: Components.Schemas.ResourceReplacement[];
        }
        namespace Responses {
            export interface $200 {
                jobId?: /**
                 * ID of an import or export job (state machine)
                 * example:
                 * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
                 */
                Components.Schemas.JobID;
            }
        }
    }
    namespace BulkAddBlueprintResources {
        namespace Parameters {
            /**
             * Whether to add this resource dependencies to the blueprint automatically
             */
            export type AddDependencies = boolean;
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        export interface QueryParameters {
            add_dependencies?: /* Whether to add this resource dependencies to the blueprint automatically */ Parameters.AddDependencies;
        }
        export type RequestBody = (Components.Schemas.EditableBlueprintResource | Components.Schemas.InstalledBlueprintResource)[];
        namespace Responses {
            export interface $200 {
                resources?: (Components.Schemas.EditableBlueprintResource | Components.Schemas.InstalledBlueprintResource)[];
            }
        }
    }
    namespace BulkDeleteBlueprintResources {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        export type RequestBody = /**
         * ID of a blueprint resource
         * example:
         * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
         */
        Components.Schemas.BlueprintResourceID[];
        namespace Responses {
            export interface $200 {
                resources?: (Components.Schemas.EditableBlueprintResource | Components.Schemas.InstalledBlueprintResource)[];
            }
        }
    }
    namespace BulkUpdateBlueprintResources {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        export type RequestBody = (Components.Schemas.EditableBlueprintResource | Components.Schemas.InstalledBlueprintResource)[];
        namespace Responses {
            export interface $200 {
                resources?: (Components.Schemas.EditableBlueprintResource | Components.Schemas.InstalledBlueprintResource)[];
            }
        }
    }
    namespace CancelBlueprintJob {
        namespace Parameters {
            export type JobId = /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintJobID;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.BlueprintJob;
        }
    }
    namespace ContinueInstallationJob {
        namespace Parameters {
            export type JobId = /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintJobID;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.BlueprintInstallationJob;
        }
    }
    namespace CreateBlueprint {
        export type RequestBody = Components.Schemas.Blueprint;
        namespace Responses {
            export type $200 = Components.Schemas.Blueprint;
        }
    }
    namespace CreateExport {
        export interface RequestBody {
            resources: [
                {
                    type: /* Type of the resource */ Components.Schemas.ResourceNodeType;
                    id: string;
                },
                ...{
                    type: /* Type of the resource */ Components.Schemas.ResourceNodeType;
                    id: string;
                }[]
            ];
            jobId?: /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            Components.Schemas.JobID;
            /**
             * Temporary flag to indicate if multiple resources are being exported
             */
            isExportingMultipleResources?: boolean;
            /**
             * Pipeline ID selected when doing the sandbox sync
             */
            pipelineId?: string;
            /**
             * ID of the installed manifest to load the resource addresses from
             */
            manifestId?: string;
        }
        namespace Responses {
            export interface $200 {
                jobId?: /**
                 * ID of an import or export job (state machine)
                 * example:
                 * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
                 */
                Components.Schemas.JobID;
            }
        }
    }
    namespace CreatePlan {
        export type RequestBody = {
            /**
             * s3ref of manifest file uploaded via `uploadManifest`
             */
            s3ref: {
                /**
                 * example:
                 * blueprint-manifest-prod-blueprintsv2bucket-sybpsryropzw
                 */
                bucket: string;
                /**
                 * example:
                 * templates/main.tf
                 */
                key: string;
            };
            /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            manifest_id?: string;
            /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            job_id?: string;
            /**
             * Source of the manifest
             */
            source?: "file" | "marketplace" | "sandbox";
            /**
             * List of resources to ignore changes for
             */
            resourcesToIgnore?: string[];
            /**
             * List of resource replacements to apply during import
             */
            resourceReplacements?: Components.Schemas.ResourceReplacement[];
            deployedFrom?: {
                sourceOrganizationId: string;
                sourceManifestId: string;
                sourceOrganizationType: "sandbox" | "production";
            };
        } | {
            /**
             * Manifest s3 key uploaded via `uploadManifest`
             */
            manifestFilePath: string;
            /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            manifest_id?: string;
            /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            job_id?: string;
            /**
             * Source of the manifest
             */
            source?: "file" | "marketplace" | "sandbox";
            /**
             * List of resources to ignore changes for
             */
            resourcesToIgnore?: string[];
            /**
             * List of resource replacements to apply during import
             */
            resourceReplacements?: Components.Schemas.ResourceReplacement[];
            deployedFrom?: {
                sourceOrganizationId: string;
                sourceManifestId: string;
                sourceOrganizationType: "sandbox" | "production";
            };
        };
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
                 */
                jobId?: string;
            }
        }
    }
    namespace DeleteBlueprint {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Blueprint;
        }
    }
    namespace DeleteBlueprintResource {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            export type ResourceId = /**
             * ID of a blueprint resource
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintResourceID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
            resource_id: Parameters.ResourceId;
        }
        namespace Responses {
            export interface $200 {
                resources?: (Components.Schemas.EditableBlueprintResource | Components.Schemas.InstalledBlueprintResource)[];
            }
        }
    }
    namespace DeleteManifest {
        namespace Parameters {
            export type ManifestId = /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.ManifestID;
        }
        export interface PathParameters {
            manifest_id: Parameters.ManifestId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Manifest;
        }
    }
    namespace ExportBlueprint {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        namespace Responses {
            export interface $202 {
                job_id?: /**
                 * ID of a job
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                Components.Schemas.BlueprintJobID;
            }
        }
    }
    namespace ExportManifest {
        namespace Parameters {
            export type JobId = /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            Components.Schemas.JobID;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        export interface RequestBody {
            /**
             * An array of resource IDs to export
             */
            selectedResourceIds: string[];
            /**
             * example:
             * journey_HouseConnectionJourney
             */
            resourceName: string;
            metadata?: {
                markdown?: {
                    manifest?: string;
                    preinstall?: string;
                    postinstall?: string;
                };
                docs_link?: string;
                source_blueprint_name?: string;
                source_blueprint_slug?: string;
                source_blueprint_version?: string;
            };
            /**
             * Temporary flag to indicate if multiple resources are being exported
             */
            isExportingMultipleResources?: boolean;
            generateAISummary?: boolean;
            language?: "en" | "de";
        }
        namespace Responses {
            export interface $200 {
                jobId?: /**
                 * ID of an import or export job (state machine)
                 * example:
                 * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
                 */
                Components.Schemas.JobID;
            }
        }
    }
    namespace GetBlueprint {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Blueprint;
        }
    }
    namespace GetBlueprintJob {
        namespace Parameters {
            export type JobId = /**
             * ID of a job
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintJobID;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.BlueprintJob;
        }
    }
    namespace GetJob {
        namespace Parameters {
            export type JobId = /**
             * ID of an import or export job (state machine)
             * example:
             * 4854bb2a-94f9-424d-a968-3fb17fb0bf89
             */
            Components.Schemas.JobID;
        }
        export interface PathParameters {
            job_id: Parameters.JobId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Job;
        }
    }
    namespace GetManifest {
        namespace Parameters {
            export type ManifestId = /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.ManifestID;
        }
        export interface PathParameters {
            manifest_id: Parameters.ManifestId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Manifest;
        }
    }
    namespace InstallBlueprint {
        export interface RequestBody {
            source_blueprint_id?: /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            /**
             * URL to the blueprint zip file
             */
            source_blueprint_file_url?: string;
            /**
             * Installation mode
             */
            mode: "simple" | "advanced";
        }
        namespace Responses {
            export interface $202 {
                job_id?: /**
                 * ID of a job
                 * example:
                 * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
                 */
                Components.Schemas.BlueprintJobID;
            }
        }
    }
    namespace ListBlueprintJobs {
        namespace Responses {
            export type $200 = Components.Schemas.BlueprintJob[];
        }
    }
    namespace ListBlueprints {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 1
                 */
                total?: number;
                results?: Components.Schemas.Blueprint[];
            }
        }
    }
    namespace ListInstalledManifests {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 1
                 */
                total?: number;
                results?: Components.Schemas.ManifestItem[];
            }
        }
    }
    namespace SyncDependencies {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        namespace Responses {
            export interface $200 {
                resources?: (Components.Schemas.EditableBlueprintResource | Components.Schemas.InstalledBlueprintResource)[];
            }
        }
    }
    namespace UpdateBlueprint {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
        }
        export type RequestBody = Components.Schemas.Blueprint;
        namespace Responses {
            export type $200 = Components.Schemas.Blueprint;
        }
    }
    namespace UpdateBlueprintResource {
        namespace Parameters {
            export type BlueprintId = /**
             * ID of a blueprint
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintID;
            export type ResourceId = /**
             * ID of a blueprint resource
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.BlueprintResourceID;
        }
        export interface PathParameters {
            blueprint_id: Parameters.BlueprintId;
            resource_id: Parameters.ResourceId;
        }
        export type RequestBody = Components.Schemas.EditableBlueprintResource | Components.Schemas.InstalledBlueprintResource;
        namespace Responses {
            export interface $200 {
                resources?: (Components.Schemas.EditableBlueprintResource | Components.Schemas.InstalledBlueprintResource)[];
            }
        }
    }
    namespace UpdateManifest {
        namespace Parameters {
            export type ManifestId = /**
             * ID of an imported / installed manifest
             * example:
             * c2d6cac8-bdd5-4ea2-8a6c-1cbdbe77b341
             */
            Components.Schemas.ManifestID;
        }
        export interface PathParameters {
            manifest_id: Parameters.ManifestId;
        }
        export type RequestBody = Components.Schemas.PutManifestPayload;
        namespace Responses {
            export type $200 = Components.Schemas.Manifest;
        }
    }
    namespace UploadManifest {
        export type RequestBody = Components.Schemas.UploadFilePayload;
        namespace Responses {
            export interface $201 {
                s3ref?: Components.Schemas.S3Reference;
                /**
                 * example:
                 * https://epilot-dev-blueprints.s3.eu-central-1.amazonaws.com/templates/document.pdf
                 */
                upload_url?: string; // url
            }
        }
    }
}

export interface OperationMethods {
  /**
   * getJob - getJob
   * 
   * Get the current status of a blueprint (export or import)
   */
  'getJob'(
    parameters?: Parameters<Paths.GetJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetJob.Responses.$200>
  /**
   * createExport - createExport
   * 
   * Creates a new Export Job with a list of available resources to export from the passed root resource.
   * 
   * Multiple root resources can be added by calling this multiple times with the same jobId
   * 
   */
  'createExport'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateExport.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateExport.Responses.$200>
  /**
   * exportManifest - exportManifest
   * 
   * Triggers exporting a manifest file using selected resoruce ids for a job created with `createExportJob`
   */
  'exportManifest'(
    parameters?: Parameters<Paths.ExportManifest.PathParameters> | null,
    data?: Paths.ExportManifest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExportManifest.Responses.$200>
  /**
   * uploadManifest - uploadManifest
   * 
   * Create pre-signed S3 URL to upload a manifest file.
   * 
   */
  'uploadManifest'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UploadManifest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UploadManifest.Responses.$201>
  /**
   * createPlan - createPlan
   * 
   * Creates a new import job from an uploaded manifest file and returns the plan.
   * 
   * Creates an updated plan for an installed manifest when `manifest_id` is passed
   * 
   */
  'createPlan'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreatePlan.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreatePlan.Responses.$200>
  /**
   * applyPlan - applyPlan
   * 
   * Apply a plan returned by `createPlan`.
   */
  'applyPlan'(
    parameters?: Parameters<Paths.ApplyPlan.PathParameters> | null,
    data?: Paths.ApplyPlan.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApplyPlan.Responses.$200>
  /**
   * listInstalledManifests - listInstalledManifests
   * 
   * List Blueprint Manifests installed to the organization
   */
  'listInstalledManifests'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListInstalledManifests.Responses.$200>
  /**
   * getManifest - getManifest
   * 
   * Get installed Manifest by ID
   */
  'getManifest'(
    parameters?: Parameters<Paths.GetManifest.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetManifest.Responses.$200>
  /**
   * updateManifest - updateManifest
   * 
   * Update an installed manifest
   * 
   */
  'updateManifest'(
    parameters?: Parameters<Paths.UpdateManifest.PathParameters> | null,
    data?: Paths.UpdateManifest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateManifest.Responses.$200>
  /**
   * deleteManifest - deleteManifest
   * 
   * Remove installed manifest from the org
   * 
   * Note that this does not delete the installed resources of the Manifest!
   * 
   */
  'deleteManifest'(
    parameters?: Parameters<Paths.DeleteManifest.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteManifest.Responses.$200>
  /**
   * listBlueprints - listBlueprints
   * 
   * List Custom and Installed Blueprints
   */
  'listBlueprints'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListBlueprints.Responses.$200>
  /**
   * createBlueprint - createBlueprint
   * 
   * Create a Blueprint
   */
  'createBlueprint'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateBlueprint.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateBlueprint.Responses.$200>
  /**
   * installBlueprint - installBlueprint
   * 
   * Kick off a new blueprint installation job. Returns 202 Accepted with Location header pointing to the job resource
   * 
   */
  'installBlueprint'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.InstallBlueprint.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InstallBlueprint.Responses.$202>
  /**
   * getBlueprint - getBlueprint
   * 
   * Get Blueprint by ID
   */
  'getBlueprint'(
    parameters?: Parameters<Paths.GetBlueprint.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBlueprint.Responses.$200>
  /**
   * updateBlueprint - updateBlueprint
   * 
   * Update a Blueprint
   */
  'updateBlueprint'(
    parameters?: Parameters<Paths.UpdateBlueprint.PathParameters> | null,
    data?: Paths.UpdateBlueprint.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateBlueprint.Responses.$200>
  /**
   * deleteBlueprint - deleteBlueprint
   * 
   * Delete a Blueprint
   */
  'deleteBlueprint'(
    parameters?: Parameters<Paths.DeleteBlueprint.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteBlueprint.Responses.$200>
  /**
   * exportBlueprint - exportBlueprint
   * 
   * Kick off a new blueprint export job. Returns 202 Accepted with Location header pointing to the job resource.
   * 
   */
  'exportBlueprint'(
    parameters?: Parameters<Paths.ExportBlueprint.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExportBlueprint.Responses.$202>
  /**
   * addBlueprintResource - addBlueprintResource
   * 
   * Add a resource to a Blueprint
   */
  'addBlueprintResource'(
    parameters?: Parameters<Paths.AddBlueprintResource.QueryParameters & Paths.AddBlueprintResource.PathParameters> | null,
    data?: Paths.AddBlueprintResource.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddBlueprintResource.Responses.$200>
  /**
   * syncDependencies - syncDependencies
   * 
   * Sync dependencies of all root resources in a Blueprint
   */
  'syncDependencies'(
    parameters?: Parameters<Paths.SyncDependencies.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SyncDependencies.Responses.$200>
  /**
   * bulkUpdateBlueprintResources - bulkUpdateBlueprintResources
   * 
   * Bulk update resources in a Blueprint
   */
  'bulkUpdateBlueprintResources'(
    parameters?: Parameters<Paths.BulkUpdateBlueprintResources.PathParameters> | null,
    data?: Paths.BulkUpdateBlueprintResources.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BulkUpdateBlueprintResources.Responses.$200>
  /**
   * bulkAddBlueprintResources - bulkAddBlueprintResources
   * 
   * Bulk Add resources in a Blueprint
   */
  'bulkAddBlueprintResources'(
    parameters?: Parameters<Paths.BulkAddBlueprintResources.QueryParameters & Paths.BulkAddBlueprintResources.PathParameters> | null,
    data?: Paths.BulkAddBlueprintResources.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BulkAddBlueprintResources.Responses.$200>
  /**
   * bulkDeleteBlueprintResources - bulkDeleteBlueprintResources
   * 
   * Bulk delete resources in a Blueprint
   */
  'bulkDeleteBlueprintResources'(
    parameters?: Parameters<Paths.BulkDeleteBlueprintResources.PathParameters> | null,
    data?: Paths.BulkDeleteBlueprintResources.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BulkDeleteBlueprintResources.Responses.$200>
  /**
   * updateBlueprintResource - updateBlueprintResource
   * 
   * Update a resource in a Blueprint
   */
  'updateBlueprintResource'(
    parameters?: Parameters<Paths.UpdateBlueprintResource.PathParameters> | null,
    data?: Paths.UpdateBlueprintResource.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateBlueprintResource.Responses.$200>
  /**
   * deleteBlueprintResource - deleteBlueprintResource
   * 
   * Delete a resource from a Blueprint
   */
  'deleteBlueprintResource'(
    parameters?: Parameters<Paths.DeleteBlueprintResource.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteBlueprintResource.Responses.$200>
  /**
   * listBlueprintJobs - List Blueprint Jobs
   * 
   * List all blueprint jobs
   */
  'listBlueprintJobs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListBlueprintJobs.Responses.$200>
  /**
   * getBlueprintJob - Get Job
   * 
   * Poll current state of a job.
   */
  'getBlueprintJob'(
    parameters?: Parameters<Paths.GetBlueprintJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBlueprintJob.Responses.$200>
  /**
   * continueInstallationJob - Continue Installation Job
   * 
   * Continue an installation job if it is waiting for user action.
   */
  'continueInstallationJob'(
    parameters?: Parameters<Paths.ContinueInstallationJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ContinueInstallationJob.Responses.$200>
  /**
   * cancelBlueprintJob - Cancel Blueprint Job
   * 
   * Cancel a blueprint job if it is still running.
   */
  'cancelBlueprintJob'(
    parameters?: Parameters<Paths.CancelBlueprintJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CancelBlueprintJob.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/blueprint-manifest/jobs/{job_id}']: {
    /**
     * getJob - getJob
     * 
     * Get the current status of a blueprint (export or import)
     */
    'get'(
      parameters?: Parameters<Paths.GetJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetJob.Responses.$200>
  }
  ['/v1/blueprint-manifest/jobs:createExport']: {
    /**
     * createExport - createExport
     * 
     * Creates a new Export Job with a list of available resources to export from the passed root resource.
     * 
     * Multiple root resources can be added by calling this multiple times with the same jobId
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateExport.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateExport.Responses.$200>
  }
  ['/v1/blueprint-manifest/jobs/{job_id}:exportManifest']: {
    /**
     * exportManifest - exportManifest
     * 
     * Triggers exporting a manifest file using selected resoruce ids for a job created with `createExportJob`
     */
    'post'(
      parameters?: Parameters<Paths.ExportManifest.PathParameters> | null,
      data?: Paths.ExportManifest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExportManifest.Responses.$200>
  }
  ['/v1/blueprint-manifest:uploadManifest']: {
    /**
     * uploadManifest - uploadManifest
     * 
     * Create pre-signed S3 URL to upload a manifest file.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UploadManifest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UploadManifest.Responses.$201>
  }
  ['/v1/blueprint-manifest/jobs:createPlan']: {
    /**
     * createPlan - createPlan
     * 
     * Creates a new import job from an uploaded manifest file and returns the plan.
     * 
     * Creates an updated plan for an installed manifest when `manifest_id` is passed
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreatePlan.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreatePlan.Responses.$200>
  }
  ['/v1/blueprint-manifest/jobs/{job_id}:applyPlan']: {
    /**
     * applyPlan - applyPlan
     * 
     * Apply a plan returned by `createPlan`.
     */
    'post'(
      parameters?: Parameters<Paths.ApplyPlan.PathParameters> | null,
      data?: Paths.ApplyPlan.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApplyPlan.Responses.$200>
  }
  ['/v1/blueprint-manifest/manifests']: {
    /**
     * listInstalledManifests - listInstalledManifests
     * 
     * List Blueprint Manifests installed to the organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListInstalledManifests.Responses.$200>
  }
  ['/v1/blueprint-manifest/manifests/{manifest_id}']: {
    /**
     * getManifest - getManifest
     * 
     * Get installed Manifest by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetManifest.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetManifest.Responses.$200>
    /**
     * updateManifest - updateManifest
     * 
     * Update an installed manifest
     * 
     */
    'put'(
      parameters?: Parameters<Paths.UpdateManifest.PathParameters> | null,
      data?: Paths.UpdateManifest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateManifest.Responses.$200>
    /**
     * deleteManifest - deleteManifest
     * 
     * Remove installed manifest from the org
     * 
     * Note that this does not delete the installed resources of the Manifest!
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteManifest.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteManifest.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints']: {
    /**
     * listBlueprints - listBlueprints
     * 
     * List Custom and Installed Blueprints
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListBlueprints.Responses.$200>
    /**
     * createBlueprint - createBlueprint
     * 
     * Create a Blueprint
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateBlueprint.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateBlueprint.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprint:install']: {
    /**
     * installBlueprint - installBlueprint
     * 
     * Kick off a new blueprint installation job. Returns 202 Accepted with Location header pointing to the job resource
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.InstallBlueprint.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InstallBlueprint.Responses.$202>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}']: {
    /**
     * getBlueprint - getBlueprint
     * 
     * Get Blueprint by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetBlueprint.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBlueprint.Responses.$200>
    /**
     * updateBlueprint - updateBlueprint
     * 
     * Update a Blueprint
     */
    'put'(
      parameters?: Parameters<Paths.UpdateBlueprint.PathParameters> | null,
      data?: Paths.UpdateBlueprint.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateBlueprint.Responses.$200>
    /**
     * deleteBlueprint - deleteBlueprint
     * 
     * Delete a Blueprint
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteBlueprint.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteBlueprint.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}:export']: {
    /**
     * exportBlueprint - exportBlueprint
     * 
     * Kick off a new blueprint export job. Returns 202 Accepted with Location header pointing to the job resource.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ExportBlueprint.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExportBlueprint.Responses.$202>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}/resources']: {
    /**
     * addBlueprintResource - addBlueprintResource
     * 
     * Add a resource to a Blueprint
     */
    'post'(
      parameters?: Parameters<Paths.AddBlueprintResource.QueryParameters & Paths.AddBlueprintResource.PathParameters> | null,
      data?: Paths.AddBlueprintResource.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddBlueprintResource.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}/resources:syncDependencies']: {
    /**
     * syncDependencies - syncDependencies
     * 
     * Sync dependencies of all root resources in a Blueprint
     */
    'post'(
      parameters?: Parameters<Paths.SyncDependencies.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SyncDependencies.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}/resources/bulk']: {
    /**
     * bulkAddBlueprintResources - bulkAddBlueprintResources
     * 
     * Bulk Add resources in a Blueprint
     */
    'post'(
      parameters?: Parameters<Paths.BulkAddBlueprintResources.QueryParameters & Paths.BulkAddBlueprintResources.PathParameters> | null,
      data?: Paths.BulkAddBlueprintResources.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BulkAddBlueprintResources.Responses.$200>
    /**
     * bulkUpdateBlueprintResources - bulkUpdateBlueprintResources
     * 
     * Bulk update resources in a Blueprint
     */
    'put'(
      parameters?: Parameters<Paths.BulkUpdateBlueprintResources.PathParameters> | null,
      data?: Paths.BulkUpdateBlueprintResources.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BulkUpdateBlueprintResources.Responses.$200>
    /**
     * bulkDeleteBlueprintResources - bulkDeleteBlueprintResources
     * 
     * Bulk delete resources in a Blueprint
     */
    'delete'(
      parameters?: Parameters<Paths.BulkDeleteBlueprintResources.PathParameters> | null,
      data?: Paths.BulkDeleteBlueprintResources.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BulkDeleteBlueprintResources.Responses.$200>
  }
  ['/v2/blueprint-manifest/blueprints/{blueprint_id}/resources/{resource_id}']: {
    /**
     * updateBlueprintResource - updateBlueprintResource
     * 
     * Update a resource in a Blueprint
     */
    'put'(
      parameters?: Parameters<Paths.UpdateBlueprintResource.PathParameters> | null,
      data?: Paths.UpdateBlueprintResource.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateBlueprintResource.Responses.$200>
    /**
     * deleteBlueprintResource - deleteBlueprintResource
     * 
     * Delete a resource from a Blueprint
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteBlueprintResource.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteBlueprintResource.Responses.$200>
  }
  ['/v2/blueprint-manifest/jobs']: {
    /**
     * listBlueprintJobs - List Blueprint Jobs
     * 
     * List all blueprint jobs
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListBlueprintJobs.Responses.$200>
  }
  ['/v2/blueprint-manifest/jobs/{job_id}']: {
    /**
     * getBlueprintJob - Get Job
     * 
     * Poll current state of a job.
     */
    'get'(
      parameters?: Parameters<Paths.GetBlueprintJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBlueprintJob.Responses.$200>
  }
  ['/v2/blueprint-manifest/jobs/{job_id}:continue']: {
    /**
     * continueInstallationJob - Continue Installation Job
     * 
     * Continue an installation job if it is waiting for user action.
     */
    'post'(
      parameters?: Parameters<Paths.ContinueInstallationJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ContinueInstallationJob.Responses.$200>
  }
  ['/v2/blueprint-manifest/jobs/{job_id}:cancel']: {
    /**
     * cancelBlueprintJob - Cancel Blueprint Job
     * 
     * Cancel a blueprint job if it is still running.
     */
    'post'(
      parameters?: Parameters<Paths.CancelBlueprintJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CancelBlueprintJob.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type AppBlueprint = Components.Schemas.AppBlueprint;
export type Blueprint = Components.Schemas.Blueprint;
export type BlueprintExportJob = Components.Schemas.BlueprintExportJob;
export type BlueprintID = Components.Schemas.BlueprintID;
export type BlueprintInstallStatus = Components.Schemas.BlueprintInstallStatus;
export type BlueprintInstallationJob = Components.Schemas.BlueprintInstallationJob;
export type BlueprintJob = Components.Schemas.BlueprintJob;
export type BlueprintJobEvent = Components.Schemas.BlueprintJobEvent;
export type BlueprintJobID = Components.Schemas.BlueprintJobID;
export type BlueprintResource = Components.Schemas.BlueprintResource;
export type BlueprintResourceID = Components.Schemas.BlueprintResourceID;
export type CallerIdentity = Components.Schemas.CallerIdentity;
export type CommonBlueprintFields = Components.Schemas.CommonBlueprintFields;
export type CommonBlueprintJobFields = Components.Schemas.CommonBlueprintJobFields;
export type CommonImportFields = Components.Schemas.CommonImportFields;
export type CommonManifestFields = Components.Schemas.CommonManifestFields;
export type CommonMarkdownFields = Components.Schemas.CommonMarkdownFields;
export type CommonResourceNode = Components.Schemas.CommonResourceNode;
export type CustomBlueprint = Components.Schemas.CustomBlueprint;
export type DeployedBlueprint = Components.Schemas.DeployedBlueprint;
export type EditableBlueprintResource = Components.Schemas.EditableBlueprintResource;
export type FileBlueprint = Components.Schemas.FileBlueprint;
export type FormattedError = Components.Schemas.FormattedError;
export type FormattedErrorCodes = Components.Schemas.FormattedErrorCodes;
export type FormattedErrorData = Components.Schemas.FormattedErrorData;
export type InstalledBlueprintResource = Components.Schemas.InstalledBlueprintResource;
export type Job = Components.Schemas.Job;
export type JobID = Components.Schemas.JobID;
export type JobStatus = Components.Schemas.JobStatus;
export type Manifest = Components.Schemas.Manifest;
export type ManifestID = Components.Schemas.ManifestID;
export type ManifestItem = Components.Schemas.ManifestItem;
export type ManifestSource = Components.Schemas.ManifestSource;
export type ManifestTimestampFields = Components.Schemas.ManifestTimestampFields;
export type MarketplaceBlueprint = Components.Schemas.MarketplaceBlueprint;
export type PlanChanges = Components.Schemas.PlanChanges;
export type PutManifestPayload = Components.Schemas.PutManifestPayload;
export type ResourceNode = Components.Schemas.ResourceNode;
export type ResourceNodeType = Components.Schemas.ResourceNodeType;
export type ResourceReplacement = Components.Schemas.ResourceReplacement;
export type RootResourceNode = Components.Schemas.RootResourceNode;
export type S3Reference = Components.Schemas.S3Reference;
export type SelectedResources = Components.Schemas.SelectedResources;
export type UploadFilePayload = Components.Schemas.UploadFilePayload;
export type VirtualResourceNodeGroup = Components.Schemas.VirtualResourceNodeGroup;
