/* eslint-disable */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
    namespace Schemas {
        export interface ClosingReason {
            id: string;
            title: string;
        }
        export interface ClosingReasonResp {
            reasons?: {
                id: string;
                title: string;
            }[];
        }
        export interface CreateStepReq {
            insertionIndex: number;
            name: string;
            status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
            sectionId?: string;
        }
        /**
         * Details regarding ECP for the workflow step
         */
        export interface ECPDetails {
            label?: string;
        }
        export interface ErrorResp {
            message?: string;
        }
        export interface ExecutionPaginationDynamo {
            orgId?: string;
            creationTime?: string;
        }
        export interface Flow {
            flow: ({
                id: string;
                definitionId?: string;
                /**
                 * Name for this Section
                 * example:
                 * Lead Qualification
                 */
                name: string;
                userIds?: number[];
                type: "STEP" | "SECTION";
                steps: {
                    id: string;
                    definitionId?: string;
                    entityRefId: string;
                    name: string;
                    type: "STEP" | "SECTION";
                    /**
                     * Details regarding ECP for the workflow step
                     */
                    ecp?: {
                        label?: string;
                    };
                    sectionId?: string;
                    userIds?: number[];
                    status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
                    created?: string;
                    lastUpdated?: string;
                    dueDate?: string;
                    manuallyCreated?: boolean;
                }[];
            } | {
                id: string;
                definitionId?: string;
                entityRefId: string;
                name: string;
                type: "STEP" | "SECTION";
                /**
                 * Details regarding ECP for the workflow step
                 */
                ecp?: {
                    label?: string;
                };
                sectionId?: string;
                userIds?: number[];
                status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
                created?: string;
                lastUpdated?: string;
                dueDate?: string;
                manuallyCreated?: boolean;
            })[];
        }
        export interface FlowSlim {
            flow: ({
                id: string;
                definitionId?: string;
                /**
                 * Name for this Section
                 * example:
                 * Lead Qualification
                 */
                name: string;
                userIds?: number[];
                type: "STEP" | "SECTION";
                steps: {
                    id: string;
                    definitionId?: string;
                    entityRefId: string;
                    name: string;
                    type: "STEP" | "SECTION";
                    /**
                     * Details regarding ECP for the workflow step
                     */
                    ecp?: {
                        label?: string;
                    };
                }[];
            } | {
                id: string;
                definitionId?: string;
                entityRefId: string;
                name: string;
                type: "STEP" | "SECTION";
                /**
                 * Details regarding ECP for the workflow step
                 */
                ecp?: {
                    label?: string;
                };
            })[];
        }
        export type ItemType = "STEP" | "SECTION";
        export interface LastEvaluatedKey {
            orgId?: string;
            creationTime?: string;
        }
        export interface SearchExecutionsReq {
            name?: string;
            status?: "STARTED" | "DONE" | "CLOSED";
            includeDoneWorkflows?: boolean;
            assignedTo?: string;
            sorting?: "A_Z" | "Z_A" | "DUE_DATE_ASC" | "DUE_DATE_DESC" | "TRIGGER_DATE_ASC" | "TRIGGER_DATE_DESC";
            pagination?: {
                orgId?: string;
                creationTime?: string;
            };
        }
        export interface SearchExecutionsResp {
            executions: {
                id?: string;
                definitionId?: string;
                orgId?: string;
                name?: string;
                /**
                 * Creation timestamp
                 */
                creationTime?: string;
                /**
                 * Last Update timestamp
                 */
                lastUpdateTime?: string;
                /**
                 * Due date for finishing the workflow
                 */
                dueDate?: string;
                status?: "STARTED" | "DONE" | "CLOSED";
                trigger?: "MANUAL" | "AUTOMATIC";
                assignedTo?: string[];
                /**
                 * Id of the user who closed workflow
                 */
                lastModifiedBy?: string;
                contexts?: {
                    id: string;
                    title: string;
                    schema: string;
                }[];
                nextOpenStep?: {
                    id?: string;
                    entityRefId?: string;
                };
                configuredClosingReasonSnapshot?: {
                    id: string;
                    title: string;
                }[];
                selectedClosingReasons?: {
                    id: string;
                    title: string;
                }[];
                closingReasonDescription?: string;
                /**
                 * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
                 */
                enableECPWorkflow?: boolean;
                flow: ({
                    id: string;
                    definitionId?: string;
                    /**
                     * Name for this Section
                     * example:
                     * Lead Qualification
                     */
                    name: string;
                    userIds?: number[];
                    type: "STEP" | "SECTION";
                    steps: {
                        id: string;
                        definitionId?: string;
                        entityRefId: string;
                        name: string;
                        type: "STEP" | "SECTION";
                        /**
                         * Details regarding ECP for the workflow step
                         */
                        ecp?: {
                            label?: string;
                        };
                    }[];
                } | {
                    id: string;
                    definitionId?: string;
                    entityRefId: string;
                    name: string;
                    type: "STEP" | "SECTION";
                    /**
                     * Details regarding ECP for the workflow step
                     */
                    ecp?: {
                        label?: string;
                    };
                })[];
            }[];
            lastEvaluatedKey?: {
                orgId?: string;
                creationTime?: string;
            };
        }
        export interface SearchPagination {
            from?: number;
            size?: number;
        }
        export type SearchSorting = "A_Z" | "Z_A" | "DUE_DATE_ASC" | "DUE_DATE_DESC" | "TRIGGER_DATE_ASC" | "TRIGGER_DATE_DESC";
        export interface SearchStepsReq {
            executionName?: string;
            stepName?: string;
            assignedTo?: number;
            includeDoneWorkflows?: boolean;
            manuallyCreated?: boolean;
            status?: "OPEN" | "COMPLETE" | "NEXT_OPEN_ITEM_IN_WORKFLOW";
            sorting?: "A_Z" | "Z_A" | "DUE_DATE_ASC" | "DUE_DATE_DESC" | "TRIGGER_DATE_ASC" | "TRIGGER_DATE_DESC";
            pagination?: {
                from?: number;
                size?: number;
            };
        }
        export interface SearchStepsResp {
            /**
             * example:
             * 50
             */
            hits?: number;
            results?: {
                id: string;
                definitionId?: string;
                entityRefId: string;
                name: string;
                type: "STEP" | "SECTION";
                /**
                 * Details regarding ECP for the workflow step
                 */
                ecp?: {
                    label?: string;
                };
                sectionId?: string;
                userIds?: number[];
                status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
                created?: string;
                lastUpdated?: string;
                dueDate?: string;
                manuallyCreated?: boolean;
                executionId: string;
                executionName: string;
                executionStatus: "STARTED" | "DONE" | "CLOSED";
                contexts?: {
                    id: string;
                    title: string;
                    schema: string;
                }[];
            }[];
        }
        /**
         * A group of Steps that define the progress of the Workflow
         */
        export interface Section {
            id: string;
            definitionId?: string;
            /**
             * Name for this Section
             * example:
             * Lead Qualification
             */
            name: string;
            userIds?: number[];
            type: "STEP" | "SECTION";
            steps: {
                id: string;
                definitionId?: string;
                entityRefId: string;
                name: string;
                type: "STEP" | "SECTION";
                /**
                 * Details regarding ECP for the workflow step
                 */
                ecp?: {
                    label?: string;
                };
                sectionId?: string;
                userIds?: number[];
                status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
                created?: string;
                lastUpdated?: string;
                dueDate?: string;
                manuallyCreated?: boolean;
            }[];
        }
        /**
         * A group of Steps that define the progress of the Workflow
         */
        export interface SectionSimplified {
            id: string;
            definitionId?: string;
            /**
             * Name for this Section
             * example:
             * Lead Qualification
             */
            name: string;
            userIds?: number[];
            type: "STEP" | "SECTION";
            steps: {
                id: string;
                definitionId?: string;
                entityRefId: string;
                name: string;
                type: "STEP" | "SECTION";
                /**
                 * Details regarding ECP for the workflow step
                 */
                ecp?: {
                    label?: string;
                };
            }[];
        }
        export interface Step {
            id: string;
            definitionId?: string;
            entityRefId: string;
            name: string;
            type: "STEP" | "SECTION";
            /**
             * Details regarding ECP for the workflow step
             */
            ecp?: {
                label?: string;
            };
            sectionId?: string;
            userIds?: number[];
            status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
            created?: string;
            lastUpdated?: string;
            dueDate?: string;
            manuallyCreated?: boolean;
        }
        export interface StepExtended {
            id: string;
            definitionId?: string;
            entityRefId: string;
            name: string;
            type: "STEP" | "SECTION";
            /**
             * Details regarding ECP for the workflow step
             */
            ecp?: {
                label?: string;
            };
            sectionId?: string;
            userIds?: number[];
            status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
            created?: string;
            lastUpdated?: string;
            dueDate?: string;
            manuallyCreated?: boolean;
            executionId: string;
            executionName: string;
            executionStatus: "STARTED" | "DONE" | "CLOSED";
            contexts?: {
                id: string;
                title: string;
                schema: string;
            }[];
        }
        export interface StepId {
            id?: string;
            entityRefId?: string;
        }
        export interface StepPositionAt {
            index: number;
            sectionId?: string;
        }
        export interface StepSimplified {
            id: string;
            definitionId?: string;
            entityRefId: string;
            name: string;
            type: "STEP" | "SECTION";
            /**
             * Details regarding ECP for the workflow step
             */
            ecp?: {
                label?: string;
            };
        }
        export type StepStatus = "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
        export type TriggerType = "MANUAL" | "AUTOMATIC";
        export interface UpdateStepReq {
            entityRefId: string;
            userIds?: number[];
            status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
            dueDate?: string;
            name?: string;
            position?: {
                index: number;
                sectionId?: string;
            };
        }
        export interface UpdateStepResp {
            id: string;
            definitionId?: string;
            entityRefId: string;
            name: string;
            type: "STEP" | "SECTION";
            /**
             * Details regarding ECP for the workflow step
             */
            ecp?: {
                label?: string;
            };
            sectionId?: string;
            userIds?: number[];
            status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
            created?: string;
            lastUpdated?: string;
            dueDate?: string;
            manuallyCreated?: boolean;
        }
        export interface WorkflowContext {
            id: string;
            title: string;
            schema: string;
        }
        /**
         * example:
         * {
         *   "id": "8gja72h6kas6h",
         *   "name": "Lead Qualification",
         *   "trigger": "MANUAL",
         *   "status": "STARTED",
         *   "creationTime": "2021-04-27T12:01:13.000Z",
         *   "lastUpdateTime": "2021-04-27T12:01:13.000Z",
         *   "dueDate": "2021-04-27T12:01:13.000Z",
         *   "assignedTo": [
         *     "252",
         *     "29052"
         *   ],
         *   "flow": [
         *     {
         *       "id": "sectionId1",
         *       "name": "Initial Information Gathering",
         *       "steps": [
         *         {
         *           "id": "sada5641f3a21",
         *           "name": "Call client and confirm address and product",
         *           "status": "ASSIGNED",
         *           "userIds": [
         *             11
         *           ]
         *         },
         *         {
         *           "id": "sada5641f3a22",
         *           "name": "Check product availability",
         *           "status": "UNASSIGNED"
         *         },
         *         {
         *           "id": "sada5641f3a23",
         *           "name": "Send email confirming contact with the client",
         *           "status": "SKIPPED"
         *         }
         *       ]
         *     },
         *     {
         *       "id": "firstLevelStepId1",
         *       "name": "Print and send catalog",
         *       "status": "SKIPPED",
         *       "dueDate": "2023-01-15T20:00:00"
         *     }
         *   ]
         * }
         */
        export interface WorkflowExecution {
            id?: string;
            definitionId?: string;
            orgId?: string;
            name?: string;
            /**
             * Creation timestamp
             */
            creationTime?: string;
            /**
             * Last Update timestamp
             */
            lastUpdateTime?: string;
            /**
             * Due date for finishing the workflow
             */
            dueDate?: string;
            status?: "STARTED" | "DONE" | "CLOSED";
            trigger?: "MANUAL" | "AUTOMATIC";
            assignedTo?: string[];
            /**
             * Id of the user who closed workflow
             */
            lastModifiedBy?: string;
            contexts?: {
                id: string;
                title: string;
                schema: string;
            }[];
            nextOpenStep?: {
                id?: string;
                entityRefId?: string;
            };
            configuredClosingReasonSnapshot?: {
                id: string;
                title: string;
            }[];
            selectedClosingReasons?: {
                id: string;
                title: string;
            }[];
            closingReasonDescription?: string;
            /**
             * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
             */
            enableECPWorkflow?: boolean;
            flow: ({
                id: string;
                definitionId?: string;
                /**
                 * Name for this Section
                 * example:
                 * Lead Qualification
                 */
                name: string;
                userIds?: number[];
                type: "STEP" | "SECTION";
                steps: {
                    id: string;
                    definitionId?: string;
                    entityRefId: string;
                    name: string;
                    type: "STEP" | "SECTION";
                    /**
                     * Details regarding ECP for the workflow step
                     */
                    ecp?: {
                        label?: string;
                    };
                    sectionId?: string;
                    userIds?: number[];
                    status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
                    created?: string;
                    lastUpdated?: string;
                    dueDate?: string;
                    manuallyCreated?: boolean;
                }[];
            } | {
                id: string;
                definitionId?: string;
                entityRefId: string;
                name: string;
                type: "STEP" | "SECTION";
                /**
                 * Details regarding ECP for the workflow step
                 */
                ecp?: {
                    label?: string;
                };
                sectionId?: string;
                userIds?: number[];
                status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
                created?: string;
                lastUpdated?: string;
                dueDate?: string;
                manuallyCreated?: boolean;
            })[];
        }
        export interface WorkflowExecutionBase {
            id?: string;
            definitionId?: string;
            orgId?: string;
            name?: string;
            /**
             * Creation timestamp
             */
            creationTime?: string;
            /**
             * Last Update timestamp
             */
            lastUpdateTime?: string;
            /**
             * Due date for finishing the workflow
             */
            dueDate?: string;
            status?: "STARTED" | "DONE" | "CLOSED";
            trigger?: "MANUAL" | "AUTOMATIC";
            assignedTo?: string[];
            /**
             * Id of the user who closed workflow
             */
            lastModifiedBy?: string;
            contexts?: {
                id: string;
                title: string;
                schema: string;
            }[];
            nextOpenStep?: {
                id?: string;
                entityRefId?: string;
            };
            configuredClosingReasonSnapshot?: {
                id: string;
                title: string;
            }[];
            selectedClosingReasons?: {
                id: string;
                title: string;
            }[];
            closingReasonDescription?: string;
            /**
             * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
             */
            enableECPWorkflow?: boolean;
        }
        /**
         * example:
         * {
         *   "workflowId": "j3f23fh23uif98",
         *   "trigger": "AUTOMATIC",
         *   "assignedTo": [
         *     192582,
         *     10521
         *   ],
         *   "dueDate": "02.22.2022",
         *   "contexts": [
         *     {
         *       "id": "3fa3fa86-0907-4642-a57e-0fe30a19874d",
         *       "schema": "contact"
         *     },
         *     {
         *       "id": "3a6d42fa-5070-4723-b90f-41ead4303e33",
         *       "schema": "opportunity"
         *     }
         *   ]
         * }
         */
        export interface WorkflowExecutionCreateReq {
            workflowId: string;
            trigger?: "MANUAL" | "AUTOMATIC";
            assignedTo?: string[];
            dueDate?: string;
            contexts?: {
                id: string;
                title: string;
                schema: string;
            }[];
        }
        /**
         * example:
         * {
         *   "id": "8gja72h6kas6h",
         *   "name": "Lead Qualification",
         *   "trigger": "MANUAL",
         *   "status": "STARTED",
         *   "creationTime": "2021-04-27T12:01:13.000Z",
         *   "lastUpdateTime": "2021-04-27T12:01:13.000Z",
         *   "dueDate": "2021-04-27T12:01:13.000Z",
         *   "flow": [
         *     {
         *       "id": "sectionId1",
         *       "name": "Initial Information Gathering",
         *       "steps": [
         *         {
         *           "id": "sada5641f3a21",
         *           "entityRefId": "s9guauj2-ghsa82ht2kgma-1589y15n-1ragw"
         *         },
         *         {
         *           "id": "sada5641f3a22",
         *           "entityRefId": "s9guauj2-ghsa82ht2kgma-1589y15n-sga72"
         *         },
         *         {
         *           "id": "sada5641f3a23",
         *           "entityRefId": "s9guauj2-sgha8h2t2kl-1589y15n-asjo2t"
         *         }
         *       ]
         *     },
         *     {
         *       "id": "firstLevelStepId1",
         *       "entityRefId": "sgja902tk-sgha8h2t2kl-1589y15n-asfsah2"
         *     }
         *   ]
         * }
         */
        export interface WorkflowExecutionSlim {
            id?: string;
            definitionId?: string;
            orgId?: string;
            name?: string;
            /**
             * Creation timestamp
             */
            creationTime?: string;
            /**
             * Last Update timestamp
             */
            lastUpdateTime?: string;
            /**
             * Due date for finishing the workflow
             */
            dueDate?: string;
            status?: "STARTED" | "DONE" | "CLOSED";
            trigger?: "MANUAL" | "AUTOMATIC";
            assignedTo?: string[];
            /**
             * Id of the user who closed workflow
             */
            lastModifiedBy?: string;
            contexts?: {
                id: string;
                title: string;
                schema: string;
            }[];
            nextOpenStep?: {
                id?: string;
                entityRefId?: string;
            };
            configuredClosingReasonSnapshot?: {
                id: string;
                title: string;
            }[];
            selectedClosingReasons?: {
                id: string;
                title: string;
            }[];
            closingReasonDescription?: string;
            /**
             * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
             */
            enableECPWorkflow?: boolean;
            flow: ({
                id: string;
                definitionId?: string;
                /**
                 * Name for this Section
                 * example:
                 * Lead Qualification
                 */
                name: string;
                userIds?: number[];
                type: "STEP" | "SECTION";
                steps: {
                    id: string;
                    definitionId?: string;
                    entityRefId: string;
                    name: string;
                    type: "STEP" | "SECTION";
                    /**
                     * Details regarding ECP for the workflow step
                     */
                    ecp?: {
                        label?: string;
                    };
                }[];
            } | {
                id: string;
                definitionId?: string;
                entityRefId: string;
                name: string;
                type: "STEP" | "SECTION";
                /**
                 * Details regarding ECP for the workflow step
                 */
                ecp?: {
                    label?: string;
                };
            })[];
        }
        export interface WorkflowExecutionUpdateReq {
            status?: "STARTED" | "DONE" | "CLOSED";
            assignedTo?: string[];
            selectedClosingReasons?: {
                id: string;
                title: string;
            }[];
            closingReasonDescription?: string;
            dueDate?: string;
        }
        export type WorkflowStatus = "STARTED" | "DONE" | "CLOSED";
    }
}
declare namespace Paths {
    namespace CreateExecution {
        /**
         * example:
         * {
         *   "workflowId": "j3f23fh23uif98",
         *   "trigger": "AUTOMATIC",
         *   "assignedTo": [
         *     192582,
         *     10521
         *   ],
         *   "dueDate": "02.22.2022",
         *   "contexts": [
         *     {
         *       "id": "3fa3fa86-0907-4642-a57e-0fe30a19874d",
         *       "schema": "contact"
         *     },
         *     {
         *       "id": "3a6d42fa-5070-4723-b90f-41ead4303e33",
         *       "schema": "opportunity"
         *     }
         *   ]
         * }
         */
        export interface RequestBody {
            workflowId: string;
            trigger?: "MANUAL" | "AUTOMATIC";
            assignedTo?: string[];
            dueDate?: string;
            contexts?: {
                id: string;
                title: string;
                schema: string;
            }[];
        }
        namespace Responses {
            /**
             * example:
             * {
             *   "id": "8gja72h6kas6h",
             *   "name": "Lead Qualification",
             *   "trigger": "MANUAL",
             *   "status": "STARTED",
             *   "creationTime": "2021-04-27T12:01:13.000Z",
             *   "lastUpdateTime": "2021-04-27T12:01:13.000Z",
             *   "dueDate": "2021-04-27T12:01:13.000Z",
             *   "assignedTo": [
             *     "252",
             *     "29052"
             *   ],
             *   "flow": [
             *     {
             *       "id": "sectionId1",
             *       "name": "Initial Information Gathering",
             *       "steps": [
             *         {
             *           "id": "sada5641f3a21",
             *           "name": "Call client and confirm address and product",
             *           "status": "ASSIGNED",
             *           "userIds": [
             *             11
             *           ]
             *         },
             *         {
             *           "id": "sada5641f3a22",
             *           "name": "Check product availability",
             *           "status": "UNASSIGNED"
             *         },
             *         {
             *           "id": "sada5641f3a23",
             *           "name": "Send email confirming contact with the client",
             *           "status": "SKIPPED"
             *         }
             *       ]
             *     },
             *     {
             *       "id": "firstLevelStepId1",
             *       "name": "Print and send catalog",
             *       "status": "SKIPPED",
             *       "dueDate": "2023-01-15T20:00:00"
             *     }
             *   ]
             * }
             */
            export interface $201 {
                id?: string;
                definitionId?: string;
                orgId?: string;
                name?: string;
                /**
                 * Creation timestamp
                 */
                creationTime?: string;
                /**
                 * Last Update timestamp
                 */
                lastUpdateTime?: string;
                /**
                 * Due date for finishing the workflow
                 */
                dueDate?: string;
                status?: "STARTED" | "DONE" | "CLOSED";
                trigger?: "MANUAL" | "AUTOMATIC";
                assignedTo?: string[];
                /**
                 * Id of the user who closed workflow
                 */
                lastModifiedBy?: string;
                contexts?: {
                    id: string;
                    title: string;
                    schema: string;
                }[];
                nextOpenStep?: {
                    id?: string;
                    entityRefId?: string;
                };
                configuredClosingReasonSnapshot?: {
                    id: string;
                    title: string;
                }[];
                selectedClosingReasons?: {
                    id: string;
                    title: string;
                }[];
                closingReasonDescription?: string;
                /**
                 * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
                 */
                enableECPWorkflow?: boolean;
                flow: ({
                    id: string;
                    definitionId?: string;
                    /**
                     * Name for this Section
                     * example:
                     * Lead Qualification
                     */
                    name: string;
                    userIds?: number[];
                    type: "STEP" | "SECTION";
                    steps: {
                        id: string;
                        definitionId?: string;
                        entityRefId: string;
                        name: string;
                        type: "STEP" | "SECTION";
                        /**
                         * Details regarding ECP for the workflow step
                         */
                        ecp?: {
                            label?: string;
                        };
                        sectionId?: string;
                        userIds?: number[];
                        status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
                        created?: string;
                        lastUpdated?: string;
                        dueDate?: string;
                        manuallyCreated?: boolean;
                    }[];
                } | {
                    id: string;
                    definitionId?: string;
                    entityRefId: string;
                    name: string;
                    type: "STEP" | "SECTION";
                    /**
                     * Details regarding ECP for the workflow step
                     */
                    ecp?: {
                        label?: string;
                    };
                    sectionId?: string;
                    userIds?: number[];
                    status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
                    created?: string;
                    lastUpdated?: string;
                    dueDate?: string;
                    manuallyCreated?: boolean;
                })[];
            }
            export interface $400 {
                message?: string;
            }
            export interface $401 {
                message?: string;
            }
            export interface $500 {
                message?: string;
            }
        }
    }
    namespace CreateStep {
        namespace Parameters {
            export type ExecutionId = string;
        }
        export interface PathParameters {
            executionId: Parameters.ExecutionId;
        }
        export interface RequestBody {
            insertionIndex: number;
            name: string;
            status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
            sectionId?: string;
        }
        namespace Responses {
            export interface $201 {
                id: string;
                definitionId?: string;
                entityRefId: string;
                name: string;
                type: "STEP" | "SECTION";
                /**
                 * Details regarding ECP for the workflow step
                 */
                ecp?: {
                    label?: string;
                };
                sectionId?: string;
                userIds?: number[];
                status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
                created?: string;
                lastUpdated?: string;
                dueDate?: string;
                manuallyCreated?: boolean;
            }
            export interface $400 {
                message?: string;
            }
            export interface $401 {
                message?: string;
            }
            export interface $500 {
                message?: string;
            }
        }
    }
    namespace DeleteExecution {
        namespace Parameters {
            export type ExecutionId = string;
        }
        export interface PathParameters {
            executionId: Parameters.ExecutionId;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
                message?: string;
            }
            export interface $404 {
            }
        }
    }
    namespace DeleteStep {
        namespace Parameters {
            export type ExecutionId = string;
            export type StepId = string;
        }
        export interface PathParameters {
            executionId: Parameters.ExecutionId;
            stepId: Parameters.StepId;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $500 {
                message?: string;
            }
        }
    }
    namespace GetClosingReasonExecution {
        namespace Parameters {
            export type ExecutionId = string;
        }
        export interface PathParameters {
            executionId: Parameters.ExecutionId;
        }
        namespace Responses {
            export interface $200 {
                reasons?: {
                    id: string;
                    title: string;
                }[];
            }
            export interface $500 {
                message?: string;
            }
        }
    }
    namespace GetExecution {
        namespace Parameters {
            export type ExecutionId = string;
        }
        export interface PathParameters {
            executionId: Parameters.ExecutionId;
        }
        namespace Responses {
            /**
             * example:
             * {
             *   "id": "8gja72h6kas6h",
             *   "name": "Lead Qualification",
             *   "trigger": "MANUAL",
             *   "status": "STARTED",
             *   "creationTime": "2021-04-27T12:01:13.000Z",
             *   "lastUpdateTime": "2021-04-27T12:01:13.000Z",
             *   "dueDate": "2021-04-27T12:01:13.000Z",
             *   "assignedTo": [
             *     "252",
             *     "29052"
             *   ],
             *   "flow": [
             *     {
             *       "id": "sectionId1",
             *       "name": "Initial Information Gathering",
             *       "steps": [
             *         {
             *           "id": "sada5641f3a21",
             *           "name": "Call client and confirm address and product",
             *           "status": "ASSIGNED",
             *           "userIds": [
             *             11
             *           ]
             *         },
             *         {
             *           "id": "sada5641f3a22",
             *           "name": "Check product availability",
             *           "status": "UNASSIGNED"
             *         },
             *         {
             *           "id": "sada5641f3a23",
             *           "name": "Send email confirming contact with the client",
             *           "status": "SKIPPED"
             *         }
             *       ]
             *     },
             *     {
             *       "id": "firstLevelStepId1",
             *       "name": "Print and send catalog",
             *       "status": "SKIPPED",
             *       "dueDate": "2023-01-15T20:00:00"
             *     }
             *   ]
             * }
             */
            export interface $200 {
                id?: string;
                definitionId?: string;
                orgId?: string;
                name?: string;
                /**
                 * Creation timestamp
                 */
                creationTime?: string;
                /**
                 * Last Update timestamp
                 */
                lastUpdateTime?: string;
                /**
                 * Due date for finishing the workflow
                 */
                dueDate?: string;
                status?: "STARTED" | "DONE" | "CLOSED";
                trigger?: "MANUAL" | "AUTOMATIC";
                assignedTo?: string[];
                /**
                 * Id of the user who closed workflow
                 */
                lastModifiedBy?: string;
                contexts?: {
                    id: string;
                    title: string;
                    schema: string;
                }[];
                nextOpenStep?: {
                    id?: string;
                    entityRefId?: string;
                };
                configuredClosingReasonSnapshot?: {
                    id: string;
                    title: string;
                }[];
                selectedClosingReasons?: {
                    id: string;
                    title: string;
                }[];
                closingReasonDescription?: string;
                /**
                 * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
                 */
                enableECPWorkflow?: boolean;
                flow: ({
                    id: string;
                    definitionId?: string;
                    /**
                     * Name for this Section
                     * example:
                     * Lead Qualification
                     */
                    name: string;
                    userIds?: number[];
                    type: "STEP" | "SECTION";
                    steps: {
                        id: string;
                        definitionId?: string;
                        entityRefId: string;
                        name: string;
                        type: "STEP" | "SECTION";
                        /**
                         * Details regarding ECP for the workflow step
                         */
                        ecp?: {
                            label?: string;
                        };
                        sectionId?: string;
                        userIds?: number[];
                        status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
                        created?: string;
                        lastUpdated?: string;
                        dueDate?: string;
                        manuallyCreated?: boolean;
                    }[];
                } | {
                    id: string;
                    definitionId?: string;
                    entityRefId: string;
                    name: string;
                    type: "STEP" | "SECTION";
                    /**
                     * Details regarding ECP for the workflow step
                     */
                    ecp?: {
                        label?: string;
                    };
                    sectionId?: string;
                    userIds?: number[];
                    status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
                    created?: string;
                    lastUpdated?: string;
                    dueDate?: string;
                    manuallyCreated?: boolean;
                })[];
            }
            export interface $500 {
                message?: string;
            }
        }
    }
    namespace GetExecutions {
        namespace Parameters {
            export type Context = string;
            export type Schema = string;
        }
        export interface QueryParameters {
            context?: Parameters.Context;
            schema?: Parameters.Schema;
        }
        namespace Responses {
            export type $200 = {
                id?: string;
                definitionId?: string;
                orgId?: string;
                name?: string;
                /**
                 * Creation timestamp
                 */
                creationTime?: string;
                /**
                 * Last Update timestamp
                 */
                lastUpdateTime?: string;
                /**
                 * Due date for finishing the workflow
                 */
                dueDate?: string;
                status?: "STARTED" | "DONE" | "CLOSED";
                trigger?: "MANUAL" | "AUTOMATIC";
                assignedTo?: string[];
                /**
                 * Id of the user who closed workflow
                 */
                lastModifiedBy?: string;
                contexts?: {
                    id: string;
                    title: string;
                    schema: string;
                }[];
                nextOpenStep?: {
                    id?: string;
                    entityRefId?: string;
                };
                configuredClosingReasonSnapshot?: {
                    id: string;
                    title: string;
                }[];
                selectedClosingReasons?: {
                    id: string;
                    title: string;
                }[];
                closingReasonDescription?: string;
                /**
                 * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
                 */
                enableECPWorkflow?: boolean;
                flow: ({
                    id: string;
                    definitionId?: string;
                    /**
                     * Name for this Section
                     * example:
                     * Lead Qualification
                     */
                    name: string;
                    userIds?: number[];
                    type: "STEP" | "SECTION";
                    steps: {
                        id: string;
                        definitionId?: string;
                        entityRefId: string;
                        name: string;
                        type: "STEP" | "SECTION";
                        /**
                         * Details regarding ECP for the workflow step
                         */
                        ecp?: {
                            label?: string;
                        };
                    }[];
                } | {
                    id: string;
                    definitionId?: string;
                    entityRefId: string;
                    name: string;
                    type: "STEP" | "SECTION";
                    /**
                     * Details regarding ECP for the workflow step
                     */
                    ecp?: {
                        label?: string;
                    };
                })[];
            }[];
            export interface $500 {
                message?: string;
            }
        }
    }
    namespace SearchExecutions {
        export interface RequestBody {
            name?: string;
            status?: "STARTED" | "DONE" | "CLOSED";
            includeDoneWorkflows?: boolean;
            assignedTo?: string;
            sorting?: "A_Z" | "Z_A" | "DUE_DATE_ASC" | "DUE_DATE_DESC" | "TRIGGER_DATE_ASC" | "TRIGGER_DATE_DESC";
            pagination?: {
                orgId?: string;
                creationTime?: string;
            };
        }
        namespace Responses {
            export interface $200 {
                executions: {
                    id?: string;
                    definitionId?: string;
                    orgId?: string;
                    name?: string;
                    /**
                     * Creation timestamp
                     */
                    creationTime?: string;
                    /**
                     * Last Update timestamp
                     */
                    lastUpdateTime?: string;
                    /**
                     * Due date for finishing the workflow
                     */
                    dueDate?: string;
                    status?: "STARTED" | "DONE" | "CLOSED";
                    trigger?: "MANUAL" | "AUTOMATIC";
                    assignedTo?: string[];
                    /**
                     * Id of the user who closed workflow
                     */
                    lastModifiedBy?: string;
                    contexts?: {
                        id: string;
                        title: string;
                        schema: string;
                    }[];
                    nextOpenStep?: {
                        id?: string;
                        entityRefId?: string;
                    };
                    configuredClosingReasonSnapshot?: {
                        id: string;
                        title: string;
                    }[];
                    selectedClosingReasons?: {
                        id: string;
                        title: string;
                    }[];
                    closingReasonDescription?: string;
                    /**
                     * Indicates whether this workflow is available for End Customer Portal or not. By default it's not.
                     */
                    enableECPWorkflow?: boolean;
                    flow: ({
                        id: string;
                        definitionId?: string;
                        /**
                         * Name for this Section
                         * example:
                         * Lead Qualification
                         */
                        name: string;
                        userIds?: number[];
                        type: "STEP" | "SECTION";
                        steps: {
                            id: string;
                            definitionId?: string;
                            entityRefId: string;
                            name: string;
                            type: "STEP" | "SECTION";
                            /**
                             * Details regarding ECP for the workflow step
                             */
                            ecp?: {
                                label?: string;
                            };
                        }[];
                    } | {
                        id: string;
                        definitionId?: string;
                        entityRefId: string;
                        name: string;
                        type: "STEP" | "SECTION";
                        /**
                         * Details regarding ECP for the workflow step
                         */
                        ecp?: {
                            label?: string;
                        };
                    })[];
                }[];
                lastEvaluatedKey?: {
                    orgId?: string;
                    creationTime?: string;
                };
            }
            export interface $400 {
                message?: string;
            }
            export interface $401 {
                message?: string;
            }
            export interface $500 {
                message?: string;
            }
        }
    }
    namespace SearchSteps {
        export interface RequestBody {
            executionName?: string;
            stepName?: string;
            assignedTo?: number;
            includeDoneWorkflows?: boolean;
            manuallyCreated?: boolean;
            status?: "OPEN" | "COMPLETE" | "NEXT_OPEN_ITEM_IN_WORKFLOW";
            sorting?: "A_Z" | "Z_A" | "DUE_DATE_ASC" | "DUE_DATE_DESC" | "TRIGGER_DATE_ASC" | "TRIGGER_DATE_DESC";
            pagination?: {
                from?: number;
                size?: number;
            };
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * 50
                 */
                hits?: number;
                results?: {
                    id: string;
                    definitionId?: string;
                    entityRefId: string;
                    name: string;
                    type: "STEP" | "SECTION";
                    /**
                     * Details regarding ECP for the workflow step
                     */
                    ecp?: {
                        label?: string;
                    };
                    sectionId?: string;
                    userIds?: number[];
                    status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
                    created?: string;
                    lastUpdated?: string;
                    dueDate?: string;
                    manuallyCreated?: boolean;
                    executionId: string;
                    executionName: string;
                    executionStatus: "STARTED" | "DONE" | "CLOSED";
                    contexts?: {
                        id: string;
                        title: string;
                        schema: string;
                    }[];
                }[];
            }
            export interface $400 {
                message?: string;
            }
            export interface $401 {
                message?: string;
            }
            export interface $500 {
                message?: string;
            }
        }
    }
    namespace UpdateExecution {
        namespace Parameters {
            export type ExecutionId = string;
        }
        export interface PathParameters {
            executionId: Parameters.ExecutionId;
        }
        export interface RequestBody {
            status?: "STARTED" | "DONE" | "CLOSED";
            assignedTo?: string[];
            selectedClosingReasons?: {
                id: string;
                title: string;
            }[];
            closingReasonDescription?: string;
            dueDate?: string;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $500 {
                message?: string;
            }
        }
    }
    namespace UpdateStep {
        namespace Parameters {
            export type ExecutionId = string;
            export type StepId = string;
        }
        export interface PathParameters {
            executionId: Parameters.ExecutionId;
            stepId: Parameters.StepId;
        }
        export interface RequestBody {
            entityRefId: string;
            userIds?: number[];
            status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
            dueDate?: string;
            name?: string;
            position?: {
                index: number;
                sectionId?: string;
            };
        }
        namespace Responses {
            export interface $200 {
                id: string;
                definitionId?: string;
                entityRefId: string;
                name: string;
                type: "STEP" | "SECTION";
                /**
                 * Details regarding ECP for the workflow step
                 */
                ecp?: {
                    label?: string;
                };
                sectionId?: string;
                userIds?: number[];
                status?: "UNASSIGNED" | "ASSIGNED" | "COMPLETED" | "SKIPPED";
                created?: string;
                lastUpdated?: string;
                dueDate?: string;
                manuallyCreated?: boolean;
            }
            export interface $400 {
                message?: string;
            }
            export interface $401 {
                message?: string;
            }
            export interface $500 {
                message?: string;
            }
        }
    }
}

export interface OperationMethods {
  /**
   * getExecutions - getExecutions
   * 
   * Retrieve Workflow Executions. Optionally, you can filter them by context & schema. Please be aware, these executions are more light weight - steps are not loaded with all information.
   */
  'getExecutions'(
    parameters?: Parameters<Paths.GetExecutions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetExecutions.Responses.$200>
  /**
   * createExecution - createExecution
   * 
   * Create a Workflow Execution. Start a new workflow execution, based on a workflow definition (template).
   */
  'createExecution'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateExecution.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateExecution.Responses.$201>
  /**
   * getExecution - getExecution
   * 
   * Get a full workflow execution, included steps information, by execution id.
   */
  'getExecution'(
    parameters?: Parameters<Paths.GetExecution.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetExecution.Responses.$200>
  /**
   * updateExecution - updateExecution
   * 
   * Patches updates like assignees, status, closingReason for a single Workflow Execution.
   */
  'updateExecution'(
    parameters?: Parameters<Paths.UpdateExecution.PathParameters> | null,
    data?: Paths.UpdateExecution.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateExecution.Responses.$204>
  /**
   * deleteExecution - deleteExecution
   * 
   * Delete workflow execution by id. Workflow contexts will NOT be deleted.
   */
  'deleteExecution'(
    parameters?: Parameters<Paths.DeleteExecution.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteExecution.Responses.$204>
  /**
   * createStep - createStep
   * 
   * Create a new step in current workflow execution.
   */
  'createStep'(
    parameters?: Parameters<Paths.CreateStep.PathParameters> | null,
    data?: Paths.CreateStep.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateStep.Responses.$201>
  /**
   * updateStep - updateStep
   * 
   * Patches various changes to a workflow execution step.
   */
  'updateStep'(
    parameters?: Parameters<Paths.UpdateStep.PathParameters> | null,
    data?: Paths.UpdateStep.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateStep.Responses.$200>
  /**
   * deleteStep - deleteStep
   * 
   * Deletes a step from a workflow execution.
   */
  'deleteStep'(
    parameters?: Parameters<Paths.DeleteStep.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteStep.Responses.$204>
  /**
   * searchExecutions - searchExecutions
   * 
   * Search Workflow Executions by different filters.
   */
  'searchExecutions'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchExecutions.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchExecutions.Responses.$200>
  /**
   * searchSteps - searchSteps
   * 
   * Search workflow execution steps by different filters.
   */
  'searchSteps'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchSteps.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchSteps.Responses.$200>
  /**
   * getClosingReasonExecution - getClosingReasonExecution
   * 
   * Shows all Closing Reasons defined at the moment of starting the Workflow Execution.
   * The Closing Reasons shown in the execution are just snapshots
   * from the state of the Definition when the instance was created.
   * 
   */
  'getClosingReasonExecution'(
    parameters?: Parameters<Paths.GetClosingReasonExecution.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetClosingReasonExecution.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/workflows/executions']: {
    /**
     * getExecutions - getExecutions
     * 
     * Retrieve Workflow Executions. Optionally, you can filter them by context & schema. Please be aware, these executions are more light weight - steps are not loaded with all information.
     */
    'get'(
      parameters?: Parameters<Paths.GetExecutions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetExecutions.Responses.$200>
    /**
     * createExecution - createExecution
     * 
     * Create a Workflow Execution. Start a new workflow execution, based on a workflow definition (template).
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateExecution.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateExecution.Responses.$201>
  }
  ['/v1/workflows/executions/{executionId}']: {
    /**
     * getExecution - getExecution
     * 
     * Get a full workflow execution, included steps information, by execution id.
     */
    'get'(
      parameters?: Parameters<Paths.GetExecution.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetExecution.Responses.$200>
    /**
     * updateExecution - updateExecution
     * 
     * Patches updates like assignees, status, closingReason for a single Workflow Execution.
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateExecution.PathParameters> | null,
      data?: Paths.UpdateExecution.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateExecution.Responses.$204>
    /**
     * deleteExecution - deleteExecution
     * 
     * Delete workflow execution by id. Workflow contexts will NOT be deleted.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteExecution.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteExecution.Responses.$204>
  }
  ['/v1/workflows/executions/{executionId}/steps']: {
    /**
     * createStep - createStep
     * 
     * Create a new step in current workflow execution.
     */
    'post'(
      parameters?: Parameters<Paths.CreateStep.PathParameters> | null,
      data?: Paths.CreateStep.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateStep.Responses.$201>
  }
  ['/v1/workflows/executions/{executionId}/steps/{stepId}']: {
    /**
     * updateStep - updateStep
     * 
     * Patches various changes to a workflow execution step.
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateStep.PathParameters> | null,
      data?: Paths.UpdateStep.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateStep.Responses.$200>
    /**
     * deleteStep - deleteStep
     * 
     * Deletes a step from a workflow execution.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteStep.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteStep.Responses.$204>
  }
  ['/v1/workflows/executions/search']: {
    /**
     * searchExecutions - searchExecutions
     * 
     * Search Workflow Executions by different filters.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchExecutions.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchExecutions.Responses.$200>
  }
  ['/v1/workflows/executions/steps/search']: {
    /**
     * searchSteps - searchSteps
     * 
     * Search workflow execution steps by different filters.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchSteps.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchSteps.Responses.$200>
  }
  ['/v1/workflows/executions/{executionId}/closing-reasons']: {
    /**
     * getClosingReasonExecution - getClosingReasonExecution
     * 
     * Shows all Closing Reasons defined at the moment of starting the Workflow Execution.
     * The Closing Reasons shown in the execution are just snapshots
     * from the state of the Definition when the instance was created.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetClosingReasonExecution.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetClosingReasonExecution.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
