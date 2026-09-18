import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Responses {
        export interface Error {
            code: "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE";
        }
    }
    namespace Schemas {
        export interface ChatWidget {
            name: string;
            agent_id: string | null; // uuid
            website_chat: {
                /**
                 * Exact HTTPS origins. Empty means the widget cannot start sessions.
                 */
                allowed_origins: [
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?
                ];
                organisation_name: string;
                default_locale: "en" | "de";
                /**
                 * Design Builder configuration for the widget only.
                 */
                design_id?: string | null; // uuid
                /**
                 * Email Builder template selection. Does not enable verification by itself.
                 */
                authentication?: {
                    email_code: {
                        email_template_id?: string | null; // uuid
                    };
                } | null;
            };
            /**
             * Stable public embed identifier, independent of the assigned agent. Not a credential.
             */
            widget_id: string; // uuid
            org_id: string;
            /**
             * Server-owned session binding; changes on reassignment or allowed-origin changes.
             */
            binding_id: string; // uuid
            version: number;
            created_at: string; // date-time
            updated_at: string; // date-time
            website_chat_embed: {
                script_url: string; // uri
                chat_api_origin: string; // uri
                demo_url: string; // uri
            };
        }
        export interface CreateChatWidgetRequest {
            name: string;
            agent_id: string | null; // uuid
            website_chat: {
                /**
                 * Exact HTTPS origins. Empty means the widget cannot start sessions.
                 */
                allowed_origins: [
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?
                ];
                organisation_name: string;
                default_locale: "en" | "de";
                /**
                 * Design Builder configuration for the widget only.
                 */
                design_id?: string | null; // uuid
                /**
                 * Email Builder template selection. Does not enable verification by itself.
                 */
                authentication?: {
                    email_code: {
                        email_template_id?: string | null; // uuid
                    };
                } | null;
            };
        }
        export interface Error {
            error?: string;
            message?: string;
            details?: {
                [key: string]: any;
            };
        }
        export interface ListChatWidgetsResponse {
            widgets: {
                name: string;
                agent_id: string | null; // uuid
                website_chat: {
                    /**
                     * Exact HTTPS origins. Empty means the widget cannot start sessions.
                     */
                    allowed_origins: [
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?
                    ];
                    organisation_name: string;
                    default_locale: "en" | "de";
                    /**
                     * Design Builder configuration for the widget only.
                     */
                    design_id?: string | null; // uuid
                    /**
                     * Email Builder template selection. Does not enable verification by itself.
                     */
                    authentication?: {
                        email_code: {
                            email_template_id?: string | null; // uuid
                        };
                    } | null;
                };
                /**
                 * Stable public embed identifier, independent of the assigned agent. Not a credential.
                 */
                widget_id: string; // uuid
                org_id: string;
                /**
                 * Server-owned session binding; changes on reassignment or allowed-origin changes.
                 */
                binding_id: string; // uuid
                version: number;
                created_at: string; // date-time
                updated_at: string; // date-time
                website_chat_embed: {
                    script_url: string; // uri
                    chat_api_origin: string; // uri
                    demo_url: string; // uri
                };
            }[];
            next_cursor?: string;
        }
        export interface PublicChatError {
            code: "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE";
        }
        /**
         * JSON payload of one SSE data frame from sendAnonymousChatMessage.
         */
        export type PublicEvent = /* JSON payload of one SSE data frame from sendAnonymousChatMessage. */ {
            type: "delta";
            text: string;
            request_id: string; // uuid
        } | {
            type: "complete";
            text: string;
            request_id: string; // uuid
        } | {
            type: "error";
            code: "UNAVAILABLE";
            request_id: string; // uuid
        };
        export interface UpdateChatWidgetRequest {
            name?: string;
            agent_id?: string | null; // uuid
            website_chat?: {
                /**
                 * Exact HTTPS origins. Empty means the widget cannot start sessions.
                 */
                allowed_origins: [
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?
                ];
                organisation_name: string;
                default_locale: "en" | "de";
                /**
                 * Design Builder configuration for the widget only.
                 */
                design_id?: string | null; // uuid
                /**
                 * Email Builder template selection. Does not enable verification by itself.
                 */
                authentication?: {
                    email_code: {
                        email_template_id?: string | null; // uuid
                    };
                } | null;
            };
            /**
             * Version read by the editor; stale writes return 409.
             */
            version: number;
        }
        export interface WebsiteChatSettings {
            /**
             * Exact HTTPS origins. Empty means the widget cannot start sessions.
             */
            allowed_origins: [
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?,
                string?
            ];
            organisation_name: string;
            default_locale: "en" | "de";
            /**
             * Design Builder configuration for the widget only.
             */
            design_id?: string | null; // uuid
            /**
             * Email Builder template selection. Does not enable verification by itself.
             */
            authentication?: {
                email_code: {
                    email_template_id?: string | null; // uuid
                };
            } | null;
        }
        export interface Widget {
            key: string;
            organisationName: string;
            assistantName: string;
            defaultLocale: "en" | "de";
            design?: {
                id: string; // uuid
                last_modified_at?: string;
                style?: {
                    palette?: {
                        primary?: string;
                        background?: string;
                    };
                    typography?: {
                        font?: {
                            font_family?: string;
                        };
                    };
                    shape?: {
                        border_radius?: number;
                    };
                };
                spark_theme?: {
                    accentColor?: string;
                    backgroundColor?: string;
                    fontBody?: string;
                    fontHeading?: string;
                    radius?: string;
                    scaling?: string;
                    spacing?: string;
                    appearance?: string;
                    neutralColor?: string;
                    styleVariant?: string;
                    labelPosition?: string;
                    inputStyle?: string;
                    inputColor?: string;
                    cardVariant?: string;
                    cardColor?: string;
                    highContrast?: boolean;
                };
            };
            locales: ("en" | "de")[];
        }
        export interface WidgetDesign {
            id: string; // uuid
            last_modified_at?: string;
            style?: {
                palette?: {
                    primary?: string;
                    background?: string;
                };
                typography?: {
                    font?: {
                        font_family?: string;
                    };
                };
                shape?: {
                    border_radius?: number;
                };
            };
            spark_theme?: {
                accentColor?: string;
                backgroundColor?: string;
                fontBody?: string;
                fontHeading?: string;
                radius?: string;
                scaling?: string;
                spacing?: string;
                appearance?: string;
                neutralColor?: string;
                styleVariant?: string;
                labelPosition?: string;
                inputStyle?: string;
                inputColor?: string;
                cardVariant?: string;
                cardColor?: string;
                highContrast?: boolean;
            };
        }
    }
}
declare namespace Paths {
    namespace CreateAnonymousChatSession {
        export interface RequestBody {
            grant: string; // ^[A-Za-z0-9_-]{43}$
        }
        namespace Responses {
            export interface $201 {
                token: string;
                conversation_id: string; // uuid
                /**
                 * Unix seconds
                 */
                expires_at: number;
                widget: {
                    key: string;
                    organisationName: string;
                    assistantName: string;
                    defaultLocale: "en" | "de";
                    design?: {
                        id: string; // uuid
                        last_modified_at?: string;
                        style?: {
                            palette?: {
                                primary?: string;
                                background?: string;
                            };
                            typography?: {
                                font?: {
                                    font_family?: string;
                                };
                            };
                            shape?: {
                                border_radius?: number;
                            };
                        };
                        spark_theme?: {
                            accentColor?: string;
                            backgroundColor?: string;
                            fontBody?: string;
                            fontHeading?: string;
                            radius?: string;
                            scaling?: string;
                            spacing?: string;
                            appearance?: string;
                            neutralColor?: string;
                            styleVariant?: string;
                            labelPosition?: string;
                            inputStyle?: string;
                            inputColor?: string;
                            cardVariant?: string;
                            cardColor?: string;
                            highContrast?: boolean;
                        };
                    };
                    locales: ("en" | "de")[];
                };
            }
            export interface Default {
                code: "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE";
            }
        }
    }
    namespace CreateChatWidget {
        export interface RequestBody {
            name: string;
            agent_id: string | null; // uuid
            website_chat: {
                /**
                 * Exact HTTPS origins. Empty means the widget cannot start sessions.
                 */
                allowed_origins: [
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?
                ];
                organisation_name: string;
                default_locale: "en" | "de";
                /**
                 * Design Builder configuration for the widget only.
                 */
                design_id?: string | null; // uuid
                /**
                 * Email Builder template selection. Does not enable verification by itself.
                 */
                authentication?: {
                    email_code: {
                        email_template_id?: string | null; // uuid
                    };
                } | null;
            };
        }
        namespace Responses {
            export interface $201 {
                name: string;
                agent_id: string | null; // uuid
                website_chat: {
                    /**
                     * Exact HTTPS origins. Empty means the widget cannot start sessions.
                     */
                    allowed_origins: [
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?
                    ];
                    organisation_name: string;
                    default_locale: "en" | "de";
                    /**
                     * Design Builder configuration for the widget only.
                     */
                    design_id?: string | null; // uuid
                    /**
                     * Email Builder template selection. Does not enable verification by itself.
                     */
                    authentication?: {
                        email_code: {
                            email_template_id?: string | null; // uuid
                        };
                    } | null;
                };
                /**
                 * Stable public embed identifier, independent of the assigned agent. Not a credential.
                 */
                widget_id: string; // uuid
                org_id: string;
                /**
                 * Server-owned session binding; changes on reassignment or allowed-origin changes.
                 */
                binding_id: string; // uuid
                version: number;
                created_at: string; // date-time
                updated_at: string; // date-time
                website_chat_embed: {
                    script_url: string; // uri
                    chat_api_origin: string; // uri
                    demo_url: string; // uri
                };
            }
            export interface $400 {
                error?: string;
                message?: string;
                details?: {
                    [key: string]: any;
                };
            }
            export interface $404 {
                error?: string;
                message?: string;
                details?: {
                    [key: string]: any;
                };
            }
            export interface $409 {
                error?: string;
                message?: string;
                details?: {
                    [key: string]: any;
                };
            }
        }
    }
    namespace CreatePublicChatGrant {
        export interface RequestBody {
            widget_key: string; // ^[a-zA-Z0-9_-]{1,100}$
        }
        namespace Responses {
            export interface $201 {
                grant: string;
                /**
                 * example:
                 * 60
                 */
                expires_in: number;
                widget_origin: string; // uri
            }
            export interface Default {
                code: "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE";
            }
        }
    }
    namespace DeleteChatWidget {
        namespace Parameters {
            export type Version = number;
        }
        export interface QueryParameters {
            version: Parameters.Version;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $400 {
                error?: string;
                message?: string;
                details?: {
                    [key: string]: any;
                };
            }
            export interface $404 {
                error?: string;
                message?: string;
                details?: {
                    [key: string]: any;
                };
            }
            export interface $409 {
                error?: string;
                message?: string;
                details?: {
                    [key: string]: any;
                };
            }
        }
    }
    namespace GetChatWidget {
        namespace Responses {
            export interface $200 {
                name: string;
                agent_id: string | null; // uuid
                website_chat: {
                    /**
                     * Exact HTTPS origins. Empty means the widget cannot start sessions.
                     */
                    allowed_origins: [
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?
                    ];
                    organisation_name: string;
                    default_locale: "en" | "de";
                    /**
                     * Design Builder configuration for the widget only.
                     */
                    design_id?: string | null; // uuid
                    /**
                     * Email Builder template selection. Does not enable verification by itself.
                     */
                    authentication?: {
                        email_code: {
                            email_template_id?: string | null; // uuid
                        };
                    } | null;
                };
                /**
                 * Stable public embed identifier, independent of the assigned agent. Not a credential.
                 */
                widget_id: string; // uuid
                org_id: string;
                /**
                 * Server-owned session binding; changes on reassignment or allowed-origin changes.
                 */
                binding_id: string; // uuid
                version: number;
                created_at: string; // date-time
                updated_at: string; // date-time
                website_chat_embed: {
                    script_url: string; // uri
                    chat_api_origin: string; // uri
                    demo_url: string; // uri
                };
            }
            export interface $400 {
                error?: string;
                message?: string;
                details?: {
                    [key: string]: any;
                };
            }
            export interface $404 {
                error?: string;
                message?: string;
                details?: {
                    [key: string]: any;
                };
            }
            export interface $409 {
                error?: string;
                message?: string;
                details?: {
                    [key: string]: any;
                };
            }
        }
    }
    namespace GetPublicChatWidget {
        namespace Parameters {
            export type WidgetId = string; // ^[a-zA-Z0-9_-]{1,100}$
        }
        export interface PathParameters {
            widget_id: Parameters.WidgetId /* ^[a-zA-Z0-9_-]{1,100}$ */;
        }
        namespace Responses {
            export interface $200 {
                key: string;
                organisationName: string;
                assistantName: string;
                defaultLocale: "en" | "de";
                design?: {
                    id: string; // uuid
                    last_modified_at?: string;
                    style?: {
                        palette?: {
                            primary?: string;
                            background?: string;
                        };
                        typography?: {
                            font?: {
                                font_family?: string;
                            };
                        };
                        shape?: {
                            border_radius?: number;
                        };
                    };
                    spark_theme?: {
                        accentColor?: string;
                        backgroundColor?: string;
                        fontBody?: string;
                        fontHeading?: string;
                        radius?: string;
                        scaling?: string;
                        spacing?: string;
                        appearance?: string;
                        neutralColor?: string;
                        styleVariant?: string;
                        labelPosition?: string;
                        inputStyle?: string;
                        inputColor?: string;
                        cardVariant?: string;
                        cardColor?: string;
                        highContrast?: boolean;
                    };
                };
                locales: ("en" | "de")[];
            }
            export interface Default {
                code: "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE";
            }
        }
    }
    namespace ListChatWidgets {
        namespace Parameters {
            export type Cursor = string;
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
        }
        namespace Responses {
            export interface $200 {
                widgets: {
                    name: string;
                    agent_id: string | null; // uuid
                    website_chat: {
                        /**
                         * Exact HTTPS origins. Empty means the widget cannot start sessions.
                         */
                        allowed_origins: [
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?,
                            string?
                        ];
                        organisation_name: string;
                        default_locale: "en" | "de";
                        /**
                         * Design Builder configuration for the widget only.
                         */
                        design_id?: string | null; // uuid
                        /**
                         * Email Builder template selection. Does not enable verification by itself.
                         */
                        authentication?: {
                            email_code: {
                                email_template_id?: string | null; // uuid
                            };
                        } | null;
                    };
                    /**
                     * Stable public embed identifier, independent of the assigned agent. Not a credential.
                     */
                    widget_id: string; // uuid
                    org_id: string;
                    /**
                     * Server-owned session binding; changes on reassignment or allowed-origin changes.
                     */
                    binding_id: string; // uuid
                    version: number;
                    created_at: string; // date-time
                    updated_at: string; // date-time
                    website_chat_embed: {
                        script_url: string; // uri
                        chat_api_origin: string; // uri
                        demo_url: string; // uri
                    };
                }[];
                next_cursor?: string;
            }
            export interface $400 {
                error?: string;
                message?: string;
                details?: {
                    [key: string]: any;
                };
            }
            export interface $404 {
                error?: string;
                message?: string;
                details?: {
                    [key: string]: any;
                };
            }
            export interface $409 {
                error?: string;
                message?: string;
                details?: {
                    [key: string]: any;
                };
            }
        }
    }
    namespace SendAnonymousChatMessage {
        export interface RequestBody {
            request_id: string; // uuid ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$
            message: string; // \S
            locale: "en" | "de";
            simple_language: boolean;
        }
        namespace Responses {
            export type $200 = string;
            export interface Default {
                code: "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE";
            }
        }
    }
    namespace UpdateChatWidget {
        export interface RequestBody {
            name?: string;
            agent_id?: string | null; // uuid
            website_chat?: {
                /**
                 * Exact HTTPS origins. Empty means the widget cannot start sessions.
                 */
                allowed_origins: [
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?,
                    string?
                ];
                organisation_name: string;
                default_locale: "en" | "de";
                /**
                 * Design Builder configuration for the widget only.
                 */
                design_id?: string | null; // uuid
                /**
                 * Email Builder template selection. Does not enable verification by itself.
                 */
                authentication?: {
                    email_code: {
                        email_template_id?: string | null; // uuid
                    };
                } | null;
            };
            /**
             * Version read by the editor; stale writes return 409.
             */
            version: number;
        }
        namespace Responses {
            export interface $200 {
                name: string;
                agent_id: string | null; // uuid
                website_chat: {
                    /**
                     * Exact HTTPS origins. Empty means the widget cannot start sessions.
                     */
                    allowed_origins: [
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?,
                        string?
                    ];
                    organisation_name: string;
                    default_locale: "en" | "de";
                    /**
                     * Design Builder configuration for the widget only.
                     */
                    design_id?: string | null; // uuid
                    /**
                     * Email Builder template selection. Does not enable verification by itself.
                     */
                    authentication?: {
                        email_code: {
                            email_template_id?: string | null; // uuid
                        };
                    } | null;
                };
                /**
                 * Stable public embed identifier, independent of the assigned agent. Not a credential.
                 */
                widget_id: string; // uuid
                org_id: string;
                /**
                 * Server-owned session binding; changes on reassignment or allowed-origin changes.
                 */
                binding_id: string; // uuid
                version: number;
                created_at: string; // date-time
                updated_at: string; // date-time
                website_chat_embed: {
                    script_url: string; // uri
                    chat_api_origin: string; // uri
                    demo_url: string; // uri
                };
            }
            export interface $400 {
                error?: string;
                message?: string;
                details?: {
                    [key: string]: any;
                };
            }
            export interface $404 {
                error?: string;
                message?: string;
                details?: {
                    [key: string]: any;
                };
            }
            export interface $409 {
                error?: string;
                message?: string;
                details?: {
                    [key: string]: any;
                };
            }
        }
    }
    namespace V1Widgets$WidgetId {
        namespace Parameters {
            export type WidgetId = string; // uuid
        }
        export interface PathParameters {
            widget_id: Parameters.WidgetId /* uuid */;
        }
    }
}


export interface OperationMethods {
  /**
   * listChatWidgets
   */
  'listChatWidgets'(
    parameters?: Parameters<Paths.ListChatWidgets.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListChatWidgets.Responses.$200>
  /**
   * createChatWidget
   */
  'createChatWidget'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateChatWidget.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateChatWidget.Responses.$201>
  /**
   * getChatWidget
   */
  'getChatWidget'(
    parameters?: Parameters<Paths.V1Widgets$WidgetId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetChatWidget.Responses.$200>
  /**
   * updateChatWidget
   */
  'updateChatWidget'(
    parameters?: Parameters<Paths.V1Widgets$WidgetId.PathParameters> | null,
    data?: Paths.UpdateChatWidget.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateChatWidget.Responses.$200>
  /**
   * deleteChatWidget
   */
  'deleteChatWidget'(
    parameters?: Parameters<Paths.DeleteChatWidget.QueryParameters & Paths.V1Widgets$WidgetId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteChatWidget.Responses.$204>
  /**
   * getPublicChatWidget - Resolve visitor-facing configuration for an independent widget and its current agent assignment. The widget ID is not an organisation ID or a destination such as website or portal.
   */
  'getPublicChatWidget'(
    parameters?: Parameters<Paths.GetPublicChatWidget.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPublicChatWidget.Responses.$200 | Paths.GetPublicChatWidget.Responses.Default>
  /**
   * createPublicChatGrant - Called by the host website with its widget_key. Checks the saved website origin allowlist and issues a single-use grant for the iframe to exchange at POST /v1/sessions within 60 seconds. This deadline does not limit the resulting session.
   */
  'createPublicChatGrant'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreatePublicChatGrant.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreatePublicChatGrant.Responses.$201 | Paths.CreatePublicChatGrant.Responses.Default>
  /**
   * createAnonymousChatSession - Exchanges an unexpired grant once for an independent 30-minute session. Expired or previously used grants return 401 INVALID_GRANT; the host must bootstrap again.
   */
  'createAnonymousChatSession'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateAnonymousChatSession.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateAnonymousChatSession.Responses.$201 | Paths.CreateAnonymousChatSession.Responses.Default>
  /**
   * sendAnonymousChatMessage - Creates a turn or replays its persisted result. Reuse request_id and the exact
   * payload for a retry. History, org, agent, tools and account identity cannot be supplied.
   * TEMPORARILY_UNAVAILABLE means the request outcome could not be checked; retry the same request ID and payload.
   * A running request returns 409 IN_PROGRESS; a changed payload returns 409 REQUEST_CONFLICT.
   * A failed admitted request never starts another model execution when retried.
   * 
   */
  'sendAnonymousChatMessage'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SendAnonymousChatMessage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SendAnonymousChatMessage.Responses.$200 | Paths.SendAnonymousChatMessage.Responses.Default>
}

export interface PathsDictionary {
  ['/v1/widgets']: {
    /**
     * listChatWidgets
     */
    'get'(
      parameters?: Parameters<Paths.ListChatWidgets.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListChatWidgets.Responses.$200>
    /**
     * createChatWidget
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateChatWidget.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateChatWidget.Responses.$201>
  }
  ['/v1/widgets/{widget_id}']: {
    /**
     * getChatWidget
     */
    'get'(
      parameters?: Parameters<Paths.V1Widgets$WidgetId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetChatWidget.Responses.$200>
    /**
     * updateChatWidget
     */
    'put'(
      parameters?: Parameters<Paths.V1Widgets$WidgetId.PathParameters> | null,
      data?: Paths.UpdateChatWidget.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateChatWidget.Responses.$200>
    /**
     * deleteChatWidget
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteChatWidget.QueryParameters & Paths.V1Widgets$WidgetId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteChatWidget.Responses.$204>
  }
  ['/v1/widgets/{widget_id}/configuration']: {
    /**
     * getPublicChatWidget - Resolve visitor-facing configuration for an independent widget and its current agent assignment. The widget ID is not an organisation ID or a destination such as website or portal.
     */
    'get'(
      parameters?: Parameters<Paths.GetPublicChatWidget.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPublicChatWidget.Responses.$200 | Paths.GetPublicChatWidget.Responses.Default>
  }
  ['/v1/bootstrap']: {
    /**
     * createPublicChatGrant - Called by the host website with its widget_key. Checks the saved website origin allowlist and issues a single-use grant for the iframe to exchange at POST /v1/sessions within 60 seconds. This deadline does not limit the resulting session.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreatePublicChatGrant.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreatePublicChatGrant.Responses.$201 | Paths.CreatePublicChatGrant.Responses.Default>
  }
  ['/v1/sessions']: {
    /**
     * createAnonymousChatSession - Exchanges an unexpired grant once for an independent 30-minute session. Expired or previously used grants return 401 INVALID_GRANT; the host must bootstrap again.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateAnonymousChatSession.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateAnonymousChatSession.Responses.$201 | Paths.CreateAnonymousChatSession.Responses.Default>
  }
  ['/v1/messages']: {
    /**
     * sendAnonymousChatMessage - Creates a turn or replays its persisted result. Reuse request_id and the exact
     * payload for a retry. History, org, agent, tools and account identity cannot be supplied.
     * TEMPORARILY_UNAVAILABLE means the request outcome could not be checked; retry the same request ID and payload.
     * A running request returns 409 IN_PROGRESS; a changed payload returns 409 REQUEST_CONFLICT.
     * A failed admitted request never starts another model execution when retried.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SendAnonymousChatMessage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SendAnonymousChatMessage.Responses.$200 | Paths.SendAnonymousChatMessage.Responses.Default>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ChatWidget = Components.Schemas.ChatWidget;
export type CreateChatWidgetRequest = Components.Schemas.CreateChatWidgetRequest;
export type Error = Components.Schemas.Error;
export type ListChatWidgetsResponse = Components.Schemas.ListChatWidgetsResponse;
export type PublicChatError = Components.Schemas.PublicChatError;
export type PublicEvent = Components.Schemas.PublicEvent;
export type UpdateChatWidgetRequest = Components.Schemas.UpdateChatWidgetRequest;
export type WebsiteChatSettings = Components.Schemas.WebsiteChatSettings;
export type Widget = Components.Schemas.Widget;
export type WidgetDesign = Components.Schemas.WidgetDesign;
