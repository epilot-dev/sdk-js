/* Auto-copied from chat-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Responses {
        export interface Error {
            code: "INVALID_VERIFICATION_CODE" | "VERIFICATION_EXPIRED" | "VERIFICATION_CONFLICT" | "VERIFICATION_DISABLED" | "VERIFICATION_UNAVAILABLE" | "IDENTITY_CHANGED" | "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE";
        }
    }
    namespace Schemas {
        export interface CreateWebsiteChatRequest {
            name: string;
            agent_id: string | null; // uuid
            settings: {
                /**
                 * Exact HTTPS origins. Empty means the Website Chat cannot start sessions.
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
                 * Design Builder configuration for the Website Chat only.
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
        export interface ListWebsiteChatsResponse {
            website_chats: {
                name: string;
                agent_id: string | null; // uuid
                settings: {
                    /**
                     * Exact HTTPS origins. Empty means the Website Chat cannot start sessions.
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
                     * Design Builder configuration for the Website Chat only.
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
                website_chat_id: string; // uuid
                org_id: string;
                /**
                 * Server-owned session binding; changes on reassignment or allowed-origin changes.
                 */
                binding_id: string; // uuid
                version: number;
                created_at: string; // date-time
                updated_at: string; // date-time
                embed: {
                    script_url: string; // uri
                    chat_api_origin: string; // uri
                    demo_url: string; // uri
                };
            }[];
            next_cursor?: string;
        }
        export interface PublicChatError {
            code: "INVALID_VERIFICATION_CODE" | "VERIFICATION_EXPIRED" | "VERIFICATION_CONFLICT" | "VERIFICATION_DISABLED" | "VERIFICATION_UNAVAILABLE" | "IDENTITY_CHANGED" | "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE";
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
        export interface PublicWebsiteChat {
            key: string;
            organisationName: string;
            assistantName: string;
            defaultLocale: "en" | "de";
            authentication?: {
                email_code: boolean;
            };
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
        export interface UpdateWebsiteChatRequest {
            name?: string;
            agent_id?: string | null; // uuid
            settings?: {
                /**
                 * Exact HTTPS origins. Empty means the Website Chat cannot start sessions.
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
                 * Design Builder configuration for the Website Chat only.
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
        export interface VerificationState {
            available: boolean;
            conversation_id: string; // uuid
            status: "anonymous" | "sending" | "pending" | "verified";
            challenge_id?: string; // uuid
            /**
             * Unix seconds
             */
            code_expires_at?: number;
            /**
             * Unix seconds
             */
            resend_after?: number;
            email?: string; // email
            contact_resolution?: "matched" | "ambiguous" | "not_found";
        }
        export interface WebsiteChat {
            name: string;
            agent_id: string | null; // uuid
            settings: {
                /**
                 * Exact HTTPS origins. Empty means the Website Chat cannot start sessions.
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
                 * Design Builder configuration for the Website Chat only.
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
            website_chat_id: string; // uuid
            org_id: string;
            /**
             * Server-owned session binding; changes on reassignment or allowed-origin changes.
             */
            binding_id: string; // uuid
            version: number;
            created_at: string; // date-time
            updated_at: string; // date-time
            embed: {
                script_url: string; // uri
                chat_api_origin: string; // uri
                demo_url: string; // uri
            };
        }
        export interface WebsiteChatDesign {
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
        export interface WebsiteChatSettings {
            /**
             * Exact HTTPS origins. Empty means the Website Chat cannot start sessions.
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
             * Design Builder configuration for the Website Chat only.
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
    }
}
export declare namespace Paths {
    namespace CancelChatVerification {
        namespace Responses {
            export interface $200 {
                available: boolean;
                conversation_id: string; // uuid
                status: "anonymous" | "sending" | "pending" | "verified";
                challenge_id?: string; // uuid
                /**
                 * Unix seconds
                 */
                code_expires_at?: number;
                /**
                 * Unix seconds
                 */
                resend_after?: number;
                email?: string; // email
                contact_resolution?: "matched" | "ambiguous" | "not_found";
            }
            export interface Default {
                code: "INVALID_VERIFICATION_CODE" | "VERIFICATION_EXPIRED" | "VERIFICATION_CONFLICT" | "VERIFICATION_DISABLED" | "VERIFICATION_UNAVAILABLE" | "IDENTITY_CHANGED" | "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE";
            }
        }
    }
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
                website_chat: {
                    key: string;
                    organisationName: string;
                    assistantName: string;
                    defaultLocale: "en" | "de";
                    authentication?: {
                        email_code: boolean;
                    };
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
                code: "INVALID_VERIFICATION_CODE" | "VERIFICATION_EXPIRED" | "VERIFICATION_CONFLICT" | "VERIFICATION_DISABLED" | "VERIFICATION_UNAVAILABLE" | "IDENTITY_CHANGED" | "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE";
            }
        }
    }
    namespace CreatePublicChatGrant {
        export interface RequestBody {
            website_chat_id: string; // ^[a-zA-Z0-9_-]{1,100}$
        }
        namespace Responses {
            export interface $201 {
                grant: string;
                /**
                 * example:
                 * 60
                 */
                expires_in: number;
                frame_origin: string; // uri
            }
            export interface Default {
                code: "INVALID_VERIFICATION_CODE" | "VERIFICATION_EXPIRED" | "VERIFICATION_CONFLICT" | "VERIFICATION_DISABLED" | "VERIFICATION_UNAVAILABLE" | "IDENTITY_CHANGED" | "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE";
            }
        }
    }
    namespace CreateWebsiteChat {
        export interface RequestBody {
            name: string;
            agent_id: string | null; // uuid
            settings: {
                /**
                 * Exact HTTPS origins. Empty means the Website Chat cannot start sessions.
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
                 * Design Builder configuration for the Website Chat only.
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
                settings: {
                    /**
                     * Exact HTTPS origins. Empty means the Website Chat cannot start sessions.
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
                     * Design Builder configuration for the Website Chat only.
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
                website_chat_id: string; // uuid
                org_id: string;
                /**
                 * Server-owned session binding; changes on reassignment or allowed-origin changes.
                 */
                binding_id: string; // uuid
                version: number;
                created_at: string; // date-time
                updated_at: string; // date-time
                embed: {
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
    namespace DeleteWebsiteChat {
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
    namespace GetChatVerification {
        namespace Responses {
            export interface $200 {
                available: boolean;
                conversation_id: string; // uuid
                status: "anonymous" | "sending" | "pending" | "verified";
                challenge_id?: string; // uuid
                /**
                 * Unix seconds
                 */
                code_expires_at?: number;
                /**
                 * Unix seconds
                 */
                resend_after?: number;
                email?: string; // email
                contact_resolution?: "matched" | "ambiguous" | "not_found";
            }
            export interface Default {
                code: "INVALID_VERIFICATION_CODE" | "VERIFICATION_EXPIRED" | "VERIFICATION_CONFLICT" | "VERIFICATION_DISABLED" | "VERIFICATION_UNAVAILABLE" | "IDENTITY_CHANGED" | "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE";
            }
        }
    }
    namespace GetPublicWebsiteChat {
        namespace Parameters {
            export type WebsiteChatId = string; // ^[a-zA-Z0-9_-]{1,100}$
        }
        export interface PathParameters {
            website_chat_id: Parameters.WebsiteChatId /* ^[a-zA-Z0-9_-]{1,100}$ */;
        }
        namespace Responses {
            export interface $200 {
                key: string;
                organisationName: string;
                assistantName: string;
                defaultLocale: "en" | "de";
                authentication?: {
                    email_code: boolean;
                };
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
                code: "INVALID_VERIFICATION_CODE" | "VERIFICATION_EXPIRED" | "VERIFICATION_CONFLICT" | "VERIFICATION_DISABLED" | "VERIFICATION_UNAVAILABLE" | "IDENTITY_CHANGED" | "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE";
            }
        }
    }
    namespace GetWebsiteChat {
        namespace Responses {
            export interface $200 {
                name: string;
                agent_id: string | null; // uuid
                settings: {
                    /**
                     * Exact HTTPS origins. Empty means the Website Chat cannot start sessions.
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
                     * Design Builder configuration for the Website Chat only.
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
                website_chat_id: string; // uuid
                org_id: string;
                /**
                 * Server-owned session binding; changes on reassignment or allowed-origin changes.
                 */
                binding_id: string; // uuid
                version: number;
                created_at: string; // date-time
                updated_at: string; // date-time
                embed: {
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
    namespace ListWebsiteChats {
        namespace Parameters {
            export type Cursor = string;
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
        }
        namespace Responses {
            export interface $200 {
                website_chats: {
                    name: string;
                    agent_id: string | null; // uuid
                    settings: {
                        /**
                         * Exact HTTPS origins. Empty means the Website Chat cannot start sessions.
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
                         * Design Builder configuration for the Website Chat only.
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
                    website_chat_id: string; // uuid
                    org_id: string;
                    /**
                     * Server-owned session binding; changes on reassignment or allowed-origin changes.
                     */
                    binding_id: string; // uuid
                    version: number;
                    created_at: string; // date-time
                    updated_at: string; // date-time
                    embed: {
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
                code: "INVALID_VERIFICATION_CODE" | "VERIFICATION_EXPIRED" | "VERIFICATION_CONFLICT" | "VERIFICATION_DISABLED" | "VERIFICATION_UNAVAILABLE" | "IDENTITY_CHANGED" | "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE";
            }
        }
    }
    namespace StartChatEmailVerification {
        export interface RequestBody {
            request_id: string; // uuid
            email: string; // email
            locale: "en" | "de";
        }
        namespace Responses {
            export interface $200 {
                available: boolean;
                conversation_id: string; // uuid
                status: "anonymous" | "sending" | "pending" | "verified";
                challenge_id?: string; // uuid
                /**
                 * Unix seconds
                 */
                code_expires_at?: number;
                /**
                 * Unix seconds
                 */
                resend_after?: number;
                email?: string; // email
                contact_resolution?: "matched" | "ambiguous" | "not_found";
            }
            export interface Default {
                code: "INVALID_VERIFICATION_CODE" | "VERIFICATION_EXPIRED" | "VERIFICATION_CONFLICT" | "VERIFICATION_DISABLED" | "VERIFICATION_UNAVAILABLE" | "IDENTITY_CHANGED" | "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE";
            }
        }
    }
    namespace UpdateWebsiteChat {
        export interface RequestBody {
            name?: string;
            agent_id?: string | null; // uuid
            settings?: {
                /**
                 * Exact HTTPS origins. Empty means the Website Chat cannot start sessions.
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
                 * Design Builder configuration for the Website Chat only.
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
                settings: {
                    /**
                     * Exact HTTPS origins. Empty means the Website Chat cannot start sessions.
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
                     * Design Builder configuration for the Website Chat only.
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
                website_chat_id: string; // uuid
                org_id: string;
                /**
                 * Server-owned session binding; changes on reassignment or allowed-origin changes.
                 */
                binding_id: string; // uuid
                version: number;
                created_at: string; // date-time
                updated_at: string; // date-time
                embed: {
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
    namespace V1WebsiteChats$WebsiteChatId {
        namespace Parameters {
            export type WebsiteChatId = string; // uuid
        }
        export interface PathParameters {
            website_chat_id: Parameters.WebsiteChatId /* uuid */;
        }
    }
    namespace VerifyChatEmailCode {
        export interface RequestBody {
            challenge_id: string; // uuid
            code: string; // ^\d{6}$
        }
        namespace Responses {
            export interface $200 {
                available: boolean;
                conversation_id: string; // uuid
                status: "anonymous" | "sending" | "pending" | "verified";
                challenge_id?: string; // uuid
                /**
                 * Unix seconds
                 */
                code_expires_at?: number;
                /**
                 * Unix seconds
                 */
                resend_after?: number;
                email?: string; // email
                contact_resolution?: "matched" | "ambiguous" | "not_found";
            }
            export interface Default {
                code: "INVALID_VERIFICATION_CODE" | "VERIFICATION_EXPIRED" | "VERIFICATION_CONFLICT" | "VERIFICATION_DISABLED" | "VERIFICATION_UNAVAILABLE" | "IDENTITY_CHANGED" | "INVALID_REQUEST" | "ORIGIN_DENIED" | "NOT_FOUND" | "INVALID_GRANT" | "SESSION_EXPIRED" | "RATE_LIMITED" | "SESSION_LIMIT" | "USAGE_LIMIT" | "REQUEST_CONFLICT" | "IN_PROGRESS" | "UNAVAILABLE" | "TEMPORARILY_UNAVAILABLE";
            }
        }
    }
}


export interface OperationMethods {
  /**
   * listWebsiteChats
   */
  'listWebsiteChats'(
    parameters?: Parameters<Paths.ListWebsiteChats.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListWebsiteChats.Responses.$200>
  /**
   * createWebsiteChat
   */
  'createWebsiteChat'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateWebsiteChat.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateWebsiteChat.Responses.$201>
  /**
   * getWebsiteChat
   */
  'getWebsiteChat'(
    parameters?: Parameters<Paths.V1WebsiteChats$WebsiteChatId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetWebsiteChat.Responses.$200>
  /**
   * updateWebsiteChat
   */
  'updateWebsiteChat'(
    parameters?: Parameters<Paths.V1WebsiteChats$WebsiteChatId.PathParameters> | null,
    data?: Paths.UpdateWebsiteChat.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateWebsiteChat.Responses.$200>
  /**
   * deleteWebsiteChat
   */
  'deleteWebsiteChat'(
    parameters?: Parameters<Paths.DeleteWebsiteChat.QueryParameters & Paths.V1WebsiteChats$WebsiteChatId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteWebsiteChat.Responses.$204>
  /**
   * getPublicWebsiteChat - Resolve visitor-facing configuration for an independent Website Chat and its current agent assignment. The Website Chat ID is not an organisation ID or a destination such as website or portal.
   */
  'getPublicWebsiteChat'(
    parameters?: Parameters<Paths.GetPublicWebsiteChat.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPublicWebsiteChat.Responses.$200 | Paths.GetPublicWebsiteChat.Responses.Default>
  /**
   * createPublicChatGrant - Called by the host website with its website_chat_id. Checks the saved website origin allowlist and issues a single-use grant for the iframe to exchange at POST /v1/sessions within 60 seconds. This deadline does not limit the resulting session.
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
  /**
   * getChatVerification - Read this session's verification state. No contact IDs or candidate records are exposed.
   */
  'getChatVerification'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetChatVerification.Responses.$200 | Paths.GetChatVerification.Responses.Default>
  /**
   * startChatEmailVerification - Start or resend an email challenge using the template saved on this session's Website Chat. Repeating the same request_id and payload does not send another email. Codes must never be sent as chat messages.
   */
  'startChatEmailVerification'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.StartChatEmailVerification.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StartChatEmailVerification.Responses.$200 | Paths.StartChatEmailVerification.Responses.Default>
  /**
   * verifyChatEmailCode - Verify a code for this session's current challenge. Success binds email proof and contact resolution to this session and starts a new conversation. It grants no account-tool permission.
   */
  'verifyChatEmailCode'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.VerifyChatEmailCode.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VerifyChatEmailCode.Responses.$200 | Paths.VerifyChatEmailCode.Responses.Default>
  /**
   * cancelChatVerification - Cancel a pending challenge or clear verified identity. Clearing verified identity starts a new anonymous conversation. In-flight verification cannot restore the cleared identity.
   */
  'cancelChatVerification'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CancelChatVerification.Responses.$200 | Paths.CancelChatVerification.Responses.Default>
}

export interface PathsDictionary {
  ['/v1/website-chats']: {
    /**
     * listWebsiteChats
     */
    'get'(
      parameters?: Parameters<Paths.ListWebsiteChats.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListWebsiteChats.Responses.$200>
    /**
     * createWebsiteChat
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateWebsiteChat.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateWebsiteChat.Responses.$201>
  }
  ['/v1/website-chats/{website_chat_id}']: {
    /**
     * getWebsiteChat
     */
    'get'(
      parameters?: Parameters<Paths.V1WebsiteChats$WebsiteChatId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetWebsiteChat.Responses.$200>
    /**
     * updateWebsiteChat
     */
    'put'(
      parameters?: Parameters<Paths.V1WebsiteChats$WebsiteChatId.PathParameters> | null,
      data?: Paths.UpdateWebsiteChat.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateWebsiteChat.Responses.$200>
    /**
     * deleteWebsiteChat
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteWebsiteChat.QueryParameters & Paths.V1WebsiteChats$WebsiteChatId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteWebsiteChat.Responses.$204>
  }
  ['/v1/website-chats/{website_chat_id}/configuration']: {
    /**
     * getPublicWebsiteChat - Resolve visitor-facing configuration for an independent Website Chat and its current agent assignment. The Website Chat ID is not an organisation ID or a destination such as website or portal.
     */
    'get'(
      parameters?: Parameters<Paths.GetPublicWebsiteChat.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPublicWebsiteChat.Responses.$200 | Paths.GetPublicWebsiteChat.Responses.Default>
  }
  ['/v1/bootstrap']: {
    /**
     * createPublicChatGrant - Called by the host website with its website_chat_id. Checks the saved website origin allowlist and issues a single-use grant for the iframe to exchange at POST /v1/sessions within 60 seconds. This deadline does not limit the resulting session.
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
  ['/v1/verification']: {
    /**
     * getChatVerification - Read this session's verification state. No contact IDs or candidate records are exposed.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetChatVerification.Responses.$200 | Paths.GetChatVerification.Responses.Default>
  }
  ['/v1/verification/email']: {
    /**
     * startChatEmailVerification - Start or resend an email challenge using the template saved on this session's Website Chat. Repeating the same request_id and payload does not send another email. Codes must never be sent as chat messages.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.StartChatEmailVerification.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StartChatEmailVerification.Responses.$200 | Paths.StartChatEmailVerification.Responses.Default>
  }
  ['/v1/verification/code']: {
    /**
     * verifyChatEmailCode - Verify a code for this session's current challenge. Success binds email proof and contact resolution to this session and starts a new conversation. It grants no account-tool permission.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.VerifyChatEmailCode.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VerifyChatEmailCode.Responses.$200 | Paths.VerifyChatEmailCode.Responses.Default>
  }
  ['/v1/verification/cancel']: {
    /**
     * cancelChatVerification - Cancel a pending challenge or clear verified identity. Clearing verified identity starts a new anonymous conversation. In-flight verification cannot restore the cleared identity.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CancelChatVerification.Responses.$200 | Paths.CancelChatVerification.Responses.Default>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type CreateWebsiteChatRequest = Components.Schemas.CreateWebsiteChatRequest;
export type Error = Components.Schemas.Error;
export type ListWebsiteChatsResponse = Components.Schemas.ListWebsiteChatsResponse;
export type PublicChatError = Components.Schemas.PublicChatError;
export type PublicEvent = Components.Schemas.PublicEvent;
export type PublicWebsiteChat = Components.Schemas.PublicWebsiteChat;
export type UpdateWebsiteChatRequest = Components.Schemas.UpdateWebsiteChatRequest;
export type VerificationState = Components.Schemas.VerificationState;
export type WebsiteChat = Components.Schemas.WebsiteChat;
export type WebsiteChatDesign = Components.Schemas.WebsiteChatDesign;
export type WebsiteChatSettings = Components.Schemas.WebsiteChatSettings;
