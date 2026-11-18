/* Auto-copied from design-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Schemas {
        export interface AddConsumerReq {
            consumer_id: /**
             * Id of the design
             * example:
             * 4a062990-a6a3-11eb-9828-4f3da7d4935a
             */
            DesignId;
            consumer_name: string;
        }
        export interface AddDesignReq {
            /**
             * Groups of the design document v1. A design is v1 when `version` is 1, otherwise it is the old shape (`style`, `design_tokens`, `custom_theme`). The authoritative contract for the groups is the schema exported by @epilot/design-document. A v1 design keeps `style`, `design_tokens`, `custom_theme` and `use_custom_theme`. A v1 update writes each changed primary colour, font, radius and logo into `style` (`palette.primary`, `typography.font`, `shape.border_radius`, `logo.main`) and deletes the matching `custom_theme` key, so journeys paint the edit. It also writes a set one whose journey field is missing and has no `custom_theme` key, which a journey paints as the fallback. A v1 create does the same when it sends no journey fields. Other groups never reach journeys. A v1 update may carry the `journey` group.
             */
            design: {
                brand_id?: string;
                brand_name?: string;
                user?: {
                    emailaddress?: string;
                    fullname?: string;
                    name?: string;
                    userid?: string;
                };
                style_name: string;
                style: {
                    logo?: LogoData;
                    palette: PaletteData;
                    typography: TypographyData;
                    shape?: ShapeData;
                    consumer: ConsumerData;
                };
                is_default?: boolean;
                /**
                 * The manifest IDs associated with this design
                 */
                _manifest?: string[];
                custom_theme?: string;
                use_custom_theme?: boolean;
                /**
                 * Design tokens for journey customization
                 */
                design_tokens?: {
                    coupon?: string;
                    cashback?: string;
                    custom_css?: string;
                    /**
                     * Accent color, defaults to primary
                     */
                    accent_color?: string;
                    /**
                     * Global outline/focus color
                     */
                    outline_color?: string;
                    /**
                     * Divider line color
                     */
                    divider_color?: string;
                    /**
                     * Link text color
                     */
                    link_color?: string;
                    /**
                     * Link hover text color
                     */
                    link_hover_color?: string;
                    /**
                     * Font size scale factor
                     */
                    font_size_scale?: "xs" | "sm" | "md" | "lg" | "xl";
                    /**
                     * Topbar minimum height in pixels
                     */
                    topbar_height?: number;
                    /**
                     * Logo/content alignment in the top bar
                     */
                    topbar_logo_alignment?: "flex-start" | "center" | "flex-end";
                    /**
                     * Logo size in pixels
                     */
                    logo_size?: number;
                    /**
                     * Input field background color
                     */
                    input_background?: string;
                    /**
                     * Input field border color
                     */
                    input_border_color?: string;
                    /**
                     * Input field text color
                     */
                    input_text_color?: string;
                    /**
                     * Input field label color
                     */
                    input_label_color?: string;
                    /**
                     * Input field border radius in pixels
                     */
                    input_border_radius?: number;
                    /**
                     * Input field height in pixels
                     */
                    input_height?: number;
                    /**
                     * Input field variant style
                     */
                    input_variant?: "outlined" | "filled" | "underlined";
                    /**
                     * Primary button background color or gradient
                     */
                    button_primary_bg?: string;
                    /**
                     * Primary button text color
                     */
                    button_primary_text?: string;
                    /**
                     * Primary button hover background color or gradient
                     */
                    button_primary_hover_bg?: string;
                    /**
                     * Primary button hover text color
                     */
                    button_primary_hover_text?: string;
                    /**
                     * Outlined button border color
                     */
                    button_outlined_border?: string;
                    /**
                     * Outlined button text color
                     */
                    button_outlined_text?: string;
                    /**
                     * Outlined button hover background color
                     */
                    button_outlined_hover_bg?: string;
                    /**
                     * Outlined button hover text color
                     */
                    button_outlined_hover_text?: string;
                    /**
                     * Ghost button background color
                     */
                    button_ghost_bg?: string;
                    /**
                     * Ghost button text color
                     */
                    button_ghost_text?: string;
                    /**
                     * Ghost button hover background color
                     */
                    button_ghost_hover_bg?: string;
                    /**
                     * Ghost button hover text color
                     */
                    button_ghost_hover_text?: string;
                    /**
                     * Button border radius in pixels
                     */
                    button_border_radius?: number;
                    /**
                     * Button height in pixels
                     */
                    button_height?: number;
                    /**
                     * Card background color
                     */
                    card_background?: string;
                    /**
                     * Card border color for outlined variant
                     */
                    card_border_color?: string;
                    /**
                     * Card visual variant
                     */
                    card_variant?: "shadow" | "outlined";
                    /**
                     * Summary card background color
                     */
                    summary_card_background?: string;
                    /**
                     * Toggle button selected background color
                     */
                    toggle_selected_bg?: string;
                    /**
                     * Toggle button selected text color
                     */
                    toggle_selected_text?: string;
                    /**
                     * Toggle button hover background color
                     */
                    toggle_hover_bg?: string;
                    /**
                     * Toggle button hover text color
                     */
                    toggle_hover_text?: string;
                    /**
                     * Toggle group wrapper border color
                     */
                    toggle_border_color?: string;
                    /**
                     * Dropdown option hover background color
                     */
                    dropdown_hover_bg?: string;
                    /**
                     * Dropdown option hover text color
                     */
                    dropdown_hover_text?: string;
                    /**
                     * Dropdown option selected background color
                     */
                    dropdown_selected_bg?: string;
                    /**
                     * Dropdown option selected text color
                     */
                    dropdown_selected_text?: string;
                    /**
                     * Switch unchecked thumb color
                     */
                    switch_unchecked_color?: string;
                    /**
                     * Switch unchecked track background color
                     */
                    switch_unchecked_bg?: string;
                    /**
                     * Switch border radius in pixels
                     */
                    switch_border_radius?: number;
                    /**
                     * Checkbox unchecked border color
                     */
                    checkbox_unchecked_color?: string;
                    /**
                     * Checkbox label text color
                     */
                    checkbox_label_color?: string;
                    /**
                     * Radio button unchecked border color
                     */
                    radio_unchecked_color?: string;
                    /**
                     * Radio button label text color
                     */
                    radio_label_color?: string;
                    /**
                     * Date picker selected date background color
                     */
                    datepicker_selected_bg?: string;
                    /**
                     * Date picker selected date text color
                     */
                    datepicker_selected_color?: string;
                    /**
                     * Date picker border radius in pixels
                     */
                    datepicker_border_radius?: number;
                    /**
                     * Chip background color
                     */
                    chip_background?: string;
                    /**
                     * Chip hover background color
                     */
                    chip_hover_background?: string;
                    /**
                     * Chip text color
                     */
                    chip_text_color?: string;
                    /**
                     * Chip hover text color
                     */
                    chip_hover_text_color?: string;
                };
                version?: 1;
                colors?: {
                    [name: string]: any;
                };
                typography?: {
                    [name: string]: any;
                };
                shape?: {
                    [name: string]: any;
                };
                components?: {
                    [name: string]: any;
                };
                assets?: {
                    [name: string]: any;
                };
                consumer?: ConsumerData;
            };
        }
        export interface AddDesignRes {
            /**
             * Groups of the design document v1. A design is v1 when `version` is 1, otherwise it is the old shape (`style`, `design_tokens`, `custom_theme`). The authoritative contract for the groups is the schema exported by @epilot/design-document. A v1 design keeps `style`, `design_tokens`, `custom_theme` and `use_custom_theme`. A v1 update writes each changed primary colour, font, radius and logo into `style` (`palette.primary`, `typography.font`, `shape.border_radius`, `logo.main`) and deletes the matching `custom_theme` key, so journeys paint the edit. It also writes a set one whose journey field is missing and has no `custom_theme` key, which a journey paints as the fallback. A v1 create does the same when it sends no journey fields. Other groups never reach journeys. A v1 update may carry the `journey` group.
             */
            design?: {
                id?: string;
                /**
                 * Creation date and time
                 * example:
                 * 2021-01-30T08:30:00Z
                 */
                created_at?: string;
                created_by?: string;
                edited: boolean;
                last_modified_at?: string;
                brand_id?: string;
                brand_name?: string;
                user?: {
                    emailaddress?: string;
                    fullname?: string;
                    name?: string;
                    userid?: string;
                };
                style_name: string;
                style: {
                    logo?: LogoData;
                    palette: PaletteData;
                    typography: TypographyData;
                    shape?: ShapeData;
                    consumer: ConsumerData;
                };
                is_default?: boolean;
                /**
                 * The manifest IDs associated with this design
                 */
                _manifest?: string[];
                custom_theme?: string;
                use_custom_theme?: boolean;
                /**
                 * Design tokens for journey customization
                 */
                design_tokens?: {
                    coupon?: string;
                    cashback?: string;
                    custom_css?: string;
                    /**
                     * Accent color, defaults to primary
                     */
                    accent_color?: string;
                    /**
                     * Global outline/focus color
                     */
                    outline_color?: string;
                    /**
                     * Divider line color
                     */
                    divider_color?: string;
                    /**
                     * Link text color
                     */
                    link_color?: string;
                    /**
                     * Link hover text color
                     */
                    link_hover_color?: string;
                    /**
                     * Font size scale factor
                     */
                    font_size_scale?: "xs" | "sm" | "md" | "lg" | "xl";
                    /**
                     * Topbar minimum height in pixels
                     */
                    topbar_height?: number;
                    /**
                     * Logo/content alignment in the top bar
                     */
                    topbar_logo_alignment?: "flex-start" | "center" | "flex-end";
                    /**
                     * Logo size in pixels
                     */
                    logo_size?: number;
                    /**
                     * Input field background color
                     */
                    input_background?: string;
                    /**
                     * Input field border color
                     */
                    input_border_color?: string;
                    /**
                     * Input field text color
                     */
                    input_text_color?: string;
                    /**
                     * Input field label color
                     */
                    input_label_color?: string;
                    /**
                     * Input field border radius in pixels
                     */
                    input_border_radius?: number;
                    /**
                     * Input field height in pixels
                     */
                    input_height?: number;
                    /**
                     * Input field variant style
                     */
                    input_variant?: "outlined" | "filled" | "underlined";
                    /**
                     * Primary button background color or gradient
                     */
                    button_primary_bg?: string;
                    /**
                     * Primary button text color
                     */
                    button_primary_text?: string;
                    /**
                     * Primary button hover background color or gradient
                     */
                    button_primary_hover_bg?: string;
                    /**
                     * Primary button hover text color
                     */
                    button_primary_hover_text?: string;
                    /**
                     * Outlined button border color
                     */
                    button_outlined_border?: string;
                    /**
                     * Outlined button text color
                     */
                    button_outlined_text?: string;
                    /**
                     * Outlined button hover background color
                     */
                    button_outlined_hover_bg?: string;
                    /**
                     * Outlined button hover text color
                     */
                    button_outlined_hover_text?: string;
                    /**
                     * Ghost button background color
                     */
                    button_ghost_bg?: string;
                    /**
                     * Ghost button text color
                     */
                    button_ghost_text?: string;
                    /**
                     * Ghost button hover background color
                     */
                    button_ghost_hover_bg?: string;
                    /**
                     * Ghost button hover text color
                     */
                    button_ghost_hover_text?: string;
                    /**
                     * Button border radius in pixels
                     */
                    button_border_radius?: number;
                    /**
                     * Button height in pixels
                     */
                    button_height?: number;
                    /**
                     * Card background color
                     */
                    card_background?: string;
                    /**
                     * Card border color for outlined variant
                     */
                    card_border_color?: string;
                    /**
                     * Card visual variant
                     */
                    card_variant?: "shadow" | "outlined";
                    /**
                     * Summary card background color
                     */
                    summary_card_background?: string;
                    /**
                     * Toggle button selected background color
                     */
                    toggle_selected_bg?: string;
                    /**
                     * Toggle button selected text color
                     */
                    toggle_selected_text?: string;
                    /**
                     * Toggle button hover background color
                     */
                    toggle_hover_bg?: string;
                    /**
                     * Toggle button hover text color
                     */
                    toggle_hover_text?: string;
                    /**
                     * Toggle group wrapper border color
                     */
                    toggle_border_color?: string;
                    /**
                     * Dropdown option hover background color
                     */
                    dropdown_hover_bg?: string;
                    /**
                     * Dropdown option hover text color
                     */
                    dropdown_hover_text?: string;
                    /**
                     * Dropdown option selected background color
                     */
                    dropdown_selected_bg?: string;
                    /**
                     * Dropdown option selected text color
                     */
                    dropdown_selected_text?: string;
                    /**
                     * Switch unchecked thumb color
                     */
                    switch_unchecked_color?: string;
                    /**
                     * Switch unchecked track background color
                     */
                    switch_unchecked_bg?: string;
                    /**
                     * Switch border radius in pixels
                     */
                    switch_border_radius?: number;
                    /**
                     * Checkbox unchecked border color
                     */
                    checkbox_unchecked_color?: string;
                    /**
                     * Checkbox label text color
                     */
                    checkbox_label_color?: string;
                    /**
                     * Radio button unchecked border color
                     */
                    radio_unchecked_color?: string;
                    /**
                     * Radio button label text color
                     */
                    radio_label_color?: string;
                    /**
                     * Date picker selected date background color
                     */
                    datepicker_selected_bg?: string;
                    /**
                     * Date picker selected date text color
                     */
                    datepicker_selected_color?: string;
                    /**
                     * Date picker border radius in pixels
                     */
                    datepicker_border_radius?: number;
                    /**
                     * Chip background color
                     */
                    chip_background?: string;
                    /**
                     * Chip hover background color
                     */
                    chip_hover_background?: string;
                    /**
                     * Chip text color
                     */
                    chip_text_color?: string;
                    /**
                     * Chip hover text color
                     */
                    chip_hover_text_color?: string;
                };
                version?: 1;
                colors?: {
                    [name: string]: any;
                };
                typography?: {
                    [name: string]: any;
                };
                shape?: {
                    [name: string]: any;
                };
                components?: {
                    [name: string]: any;
                };
                assets?: {
                    [name: string]: any;
                };
                consumer?: ConsumerData;
            };
        }
        /**
         * Type of application that uses the design
         * example:
         * journey
         */
        export type Application = string;
        export interface BrandGuidelineAttachment {
            s3ref: {
                bucket: string;
                /**
                 * Must start with the organization id, as file-api upload keys do
                 */
                key: string;
            };
            mime_type: "application/pdf" | "image/png" | "image/jpeg" | "image/webp";
            filename?: string;
        }
        export interface ConsumerData {
            widgets: (WidgetData)[];
            customer_portals: (CustomerPortalData)[];
        }
        export interface CreateDesignDocumentJobReq {
            /**
             * Public website to read the design from
             * example:
             * https://www.stadtwerke-musterstadt.de
             */
            url: string; // uri
            /**
             * Language of the design builder; the review writes its note for the user in it
             */
            language?: "de" | "en";
            /**
             * Brand guideline files for the review, uploaded with file-api `uploadFileV2`. At most 5.
             */
            attachments?: BrandGuidelineAttachment[];
        }
        export interface CustomStyle {
            custom_theme?: string;
            use_custom_theme?: boolean;
        }
        export interface CustomerPortalData {
            id: string;
            name: string;
        }
        export interface DesignDocumentJob {
            /**
             * Null when no review runs
             */
            job_id: string | null; // uuid
            /**
             * `skipped`: no review runs (daily review limit, or it could not start); the baseline is the result
             */
            status: "running" | "completed" | "failed" | "skipped";
            /**
             * Browser tools the review used so far
             */
            steps: string[];
            /**
             * Screenshots the review took, from `screenshots_after` on, oldest first
             */
            screenshots?: ReviewScreenshot[];
            baseline: {
                document: /* Groups of the design document v1. A design is v1 when `version` is 1, otherwise it is the old shape (`style`, `design_tokens`, `custom_theme`). The authoritative contract for the groups is the schema exported by @epilot/design-document. A v1 design keeps `style`, `design_tokens`, `custom_theme` and `use_custom_theme`. A v1 update writes each changed primary colour, font, radius and logo into `style` (`palette.primary`, `typography.font`, `shape.border_radius`, `logo.main`) and deletes the matching `custom_theme` key, so journeys paint the edit. It also writes a set one whose journey field is missing and has no `custom_theme` key, which a journey paints as the fallback. A v1 create does the same when it sends no journey fields. Other groups never reach journeys. A v1 update may carry the `journey` group. */ DesignDocumentV1;
                findings: DesignFinding[];
                site_name: string;
            } | null;
            result?: ReviewedDesignDocument;
        }
        /**
         * Groups of the design document v1. A design is v1 when `version` is 1, otherwise it is the old shape (`style`, `design_tokens`, `custom_theme`). The authoritative contract for the groups is the schema exported by @epilot/design-document. A v1 design keeps `style`, `design_tokens`, `custom_theme` and `use_custom_theme`. A v1 update writes each changed primary colour, font, radius and logo into `style` (`palette.primary`, `typography.font`, `shape.border_radius`, `logo.main`) and deletes the matching `custom_theme` key, so journeys paint the edit. It also writes a set one whose journey field is missing and has no `custom_theme` key, which a journey paints as the fallback. A v1 create does the same when it sends no journey fields. Other groups never reach journeys. A v1 update may carry the `journey` group.
         */
        export interface DesignDocumentV1 {
            version?: 1;
            colors?: {
                [name: string]: any;
            };
            typography?: {
                [name: string]: any;
            };
            shape?: {
                [name: string]: any;
            };
            components?: {
                [name: string]: any;
            };
            assets?: {
                [name: string]: any;
            };
            consumer?: ConsumerData;
        }
        export interface DesignFinding {
            id: FindingId;
            status: FindingStatus;
            detail?: FindingDetail;
        }
        /**
         * Id of the design
         * example:
         * 4a062990-a6a3-11eb-9828-4f3da7d4935a
         */
        export type DesignId = string;
        export interface DesignItem {
            brand_id?: string;
            brand_name?: string;
            user?: {
                emailaddress?: string;
                fullname?: string;
                name?: string;
                userid?: string;
            };
            style_name: string;
            style: {
                logo?: LogoData;
                palette: PaletteData;
                typography: TypographyData;
                shape?: ShapeData;
                consumer: ConsumerData;
            };
            is_default?: boolean;
            /**
             * The manifest IDs associated with this design
             */
            _manifest?: string[];
        }
        export interface DesignParameters {
            designId?: /**
             * Id of the design
             * example:
             * 4a062990-a6a3-11eb-9828-4f3da7d4935a
             */
            DesignId;
            theme?: /**
             * Type of theme to be parsed and returned
             * example:
             * NEW
             */
            Theme;
            application?: /**
             * Type of application that uses the design
             * example:
             * journey
             */
            Application;
        }
        export interface DuplicateDesignAsV1Plan {
            message?: string;
            conversion?: {
                name?: string;
                asset_questions?: {
                    kind?: "logo" | "favicon";
                    options?: {
                        asset?: {
                            [name: string]: any;
                        };
                        sources?: {
                            portal_id?: string;
                            portal_name?: string;
                            page?: string;
                        }[];
                    }[];
                }[];
                journey_questions?: {
                    leaf?: "primary_color" | "font" | "border_radius" | "logo";
                    /**
                     * The value journeys paint; null when they paint Concorde's fallback
                     */
                    journeys?: any;
                    /**
                     * The value of the converted design
                     */
                    design?: any;
                    /**
                     * Whether the design can take the journeys' value
                     */
                    adoptable?: boolean;
                }[];
                open?: {
                    assets?: string[];
                    journeys?: string[];
                };
                unmapped?: {
                    [name: string]: any;
                };
                radius_adjusted?: {
                    [name: string]: any;
                };
                hex_normalized?: {
                    [name: string]: string;
                };
                notes?: string[];
                invalid?: string[];
            };
        }
        export interface DuplicateDesignAsV1Req {
            dry_run?: boolean;
            answers?: {
                /**
                 * Index of the chosen option per asset kind, null keeps the converted one
                 */
                assets?: {
                    logo?: number | null;
                    favicon?: number | null;
                };
                journeys?: {
                    primary_color?: JourneyChoice;
                    font?: JourneyChoice;
                    border_radius?: JourneyChoice;
                    logo?: JourneyChoice;
                };
            };
        }
        export interface ErrorResp {
            message?: string;
            /**
             * Machine-readable reason, e.g. `invalid_url` or `rate_limited`
             */
            code?: string;
            error?: {
                [key: string]: any;
            };
        }
        export interface FileData {
            name: string;
            display_name?: string;
            file_type?: "LOGO" | "FONT" | "IMAGE";
            s3_object_key: string;
            url: string;
            /**
             * ID of the source file entity in the epilot file-entity system. Set when the file was picked from the File Manager (rather than uploaded directly to the design-builder bucket). Consumers resolve the live `public_url` via this reference. The org id is derived from the journey's owning org at render time (same convention as journey image blocks), so blueprint cross-org installs work without any extra remapping.
             */
            file_id?: string;
        }
        export interface FindingDetail {
            /**
             * Font family that was found but cannot be loaded
             */
            family: string;
        }
        export type FindingId = "primary_color" | "fonts" | "corners" | "primary_button" | "logo" | "favicon";
        export type FindingStatus = "found" | "not_found" | "not_available";
        export interface FontData {
            font_id: string;
            font_name: string;
            font_family?: string;
            font_weight_regular?: string;
            font_weight_medium?: string;
            font_weight_bold?: string;
            urls: (FontResponseUrl)[];
        }
        export interface FontResponseUrl {
            type?: "WOFF2" | "WOFF" | "TTF" | "EOT";
            url?: string;
        }
        export interface GenerateDesignDocumentReq {
            /**
             * Public website to read the design from
             * example:
             * https://www.stadtwerke-musterstadt.de
             */
            url: string; // uri
        }
        export interface GenerateDesignDocumentRes {
            document: /* Groups of the design document v1. A design is v1 when `version` is 1, otherwise it is the old shape (`style`, `design_tokens`, `custom_theme`). The authoritative contract for the groups is the schema exported by @epilot/design-document. A v1 design keeps `style`, `design_tokens`, `custom_theme` and `use_custom_theme`. A v1 update writes each changed primary colour, font, radius and logo into `style` (`palette.primary`, `typography.font`, `shape.border_radius`, `logo.main`) and deletes the matching `custom_theme` key, so journeys paint the edit. It also writes a set one whose journey field is missing and has no `custom_theme` key, which a journey paints as the fallback. A v1 create does the same when it sends no journey fields. Other groups never reach journeys. A v1 update may carry the `journey` group. */ DesignDocumentV1;
            findings: [
                DesignFinding,
                DesignFinding,
                DesignFinding,
                DesignFinding,
                DesignFinding,
                DesignFinding
            ];
            /**
             * example:
             * Stadtwerke Musterstadt
             */
            site_name: string;
            /**
             * True when the response was served from an earlier successful generation for this organization, normalised URL and generator version
             */
            cached: boolean;
        }
        export interface GenerateDesignReq {
            /**
             * Public website to derive the design from
             * example:
             * https://www.twl.de
             */
            url: string; // uri
        }
        export interface GenerateDesignRes {
            design: /* Partial design to merge into the design being edited */ GeneratedDesign;
            /**
             * True when the design was generated earlier for this organization and URL
             */
            cached: boolean;
        }
        /**
         * Partial design to merge into the design being edited
         */
        export interface GeneratedDesign {
            style: {
                logo: LogoData;
                palette: PaletteData;
                typography: TypographyData;
            };
            theme: {
                shape: {
                    /**
                     * example:
                     * 8
                     */
                    borderRadius: string;
                };
            };
        }
        export interface GeneratedDesignDocument {
            document: /* Groups of the design document v1. A design is v1 when `version` is 1, otherwise it is the old shape (`style`, `design_tokens`, `custom_theme`). The authoritative contract for the groups is the schema exported by @epilot/design-document. A v1 design keeps `style`, `design_tokens`, `custom_theme` and `use_custom_theme`. A v1 update writes each changed primary colour, font, radius and logo into `style` (`palette.primary`, `typography.font`, `shape.border_radius`, `logo.main`) and deletes the matching `custom_theme` key, so journeys paint the edit. It also writes a set one whose journey field is missing and has no `custom_theme` key, which a journey paints as the fallback. A v1 create does the same when it sends no journey fields. Other groups never reach journeys. A v1 update may carry the `journey` group. */ DesignDocumentV1;
            findings: DesignFinding[];
            site_name: string;
        }
        export interface GetAllDesignsRes {
            designs?: {
                id?: string;
                /**
                 * Creation date and time
                 * example:
                 * 2021-01-30T08:30:00Z
                 */
                created_at?: string;
                created_by?: string;
                edited: boolean;
                last_modified_at?: string;
                brand_id?: string;
                brand_name?: string;
                user?: {
                    emailaddress?: string;
                    fullname?: string;
                    name?: string;
                    userid?: string;
                };
                style_name: string;
                style: {
                    logo?: LogoData;
                    palette: PaletteData;
                    typography: TypographyData;
                    shape?: ShapeData;
                    consumer: ConsumerData;
                };
                is_default?: boolean;
                /**
                 * The manifest IDs associated with this design
                 */
                _manifest?: string[];
                custom_theme?: string;
                use_custom_theme?: boolean;
                /**
                 * Design tokens for journey customization
                 */
                design_tokens?: {
                    coupon?: string;
                    cashback?: string;
                    custom_css?: string;
                    /**
                     * Accent color, defaults to primary
                     */
                    accent_color?: string;
                    /**
                     * Global outline/focus color
                     */
                    outline_color?: string;
                    /**
                     * Divider line color
                     */
                    divider_color?: string;
                    /**
                     * Link text color
                     */
                    link_color?: string;
                    /**
                     * Link hover text color
                     */
                    link_hover_color?: string;
                    /**
                     * Font size scale factor
                     */
                    font_size_scale?: "xs" | "sm" | "md" | "lg" | "xl";
                    /**
                     * Topbar minimum height in pixels
                     */
                    topbar_height?: number;
                    /**
                     * Logo/content alignment in the top bar
                     */
                    topbar_logo_alignment?: "flex-start" | "center" | "flex-end";
                    /**
                     * Logo size in pixels
                     */
                    logo_size?: number;
                    /**
                     * Input field background color
                     */
                    input_background?: string;
                    /**
                     * Input field border color
                     */
                    input_border_color?: string;
                    /**
                     * Input field text color
                     */
                    input_text_color?: string;
                    /**
                     * Input field label color
                     */
                    input_label_color?: string;
                    /**
                     * Input field border radius in pixels
                     */
                    input_border_radius?: number;
                    /**
                     * Input field height in pixels
                     */
                    input_height?: number;
                    /**
                     * Input field variant style
                     */
                    input_variant?: "outlined" | "filled" | "underlined";
                    /**
                     * Primary button background color or gradient
                     */
                    button_primary_bg?: string;
                    /**
                     * Primary button text color
                     */
                    button_primary_text?: string;
                    /**
                     * Primary button hover background color or gradient
                     */
                    button_primary_hover_bg?: string;
                    /**
                     * Primary button hover text color
                     */
                    button_primary_hover_text?: string;
                    /**
                     * Outlined button border color
                     */
                    button_outlined_border?: string;
                    /**
                     * Outlined button text color
                     */
                    button_outlined_text?: string;
                    /**
                     * Outlined button hover background color
                     */
                    button_outlined_hover_bg?: string;
                    /**
                     * Outlined button hover text color
                     */
                    button_outlined_hover_text?: string;
                    /**
                     * Ghost button background color
                     */
                    button_ghost_bg?: string;
                    /**
                     * Ghost button text color
                     */
                    button_ghost_text?: string;
                    /**
                     * Ghost button hover background color
                     */
                    button_ghost_hover_bg?: string;
                    /**
                     * Ghost button hover text color
                     */
                    button_ghost_hover_text?: string;
                    /**
                     * Button border radius in pixels
                     */
                    button_border_radius?: number;
                    /**
                     * Button height in pixels
                     */
                    button_height?: number;
                    /**
                     * Card background color
                     */
                    card_background?: string;
                    /**
                     * Card border color for outlined variant
                     */
                    card_border_color?: string;
                    /**
                     * Card visual variant
                     */
                    card_variant?: "shadow" | "outlined";
                    /**
                     * Summary card background color
                     */
                    summary_card_background?: string;
                    /**
                     * Toggle button selected background color
                     */
                    toggle_selected_bg?: string;
                    /**
                     * Toggle button selected text color
                     */
                    toggle_selected_text?: string;
                    /**
                     * Toggle button hover background color
                     */
                    toggle_hover_bg?: string;
                    /**
                     * Toggle button hover text color
                     */
                    toggle_hover_text?: string;
                    /**
                     * Toggle group wrapper border color
                     */
                    toggle_border_color?: string;
                    /**
                     * Dropdown option hover background color
                     */
                    dropdown_hover_bg?: string;
                    /**
                     * Dropdown option hover text color
                     */
                    dropdown_hover_text?: string;
                    /**
                     * Dropdown option selected background color
                     */
                    dropdown_selected_bg?: string;
                    /**
                     * Dropdown option selected text color
                     */
                    dropdown_selected_text?: string;
                    /**
                     * Switch unchecked thumb color
                     */
                    switch_unchecked_color?: string;
                    /**
                     * Switch unchecked track background color
                     */
                    switch_unchecked_bg?: string;
                    /**
                     * Switch border radius in pixels
                     */
                    switch_border_radius?: number;
                    /**
                     * Checkbox unchecked border color
                     */
                    checkbox_unchecked_color?: string;
                    /**
                     * Checkbox label text color
                     */
                    checkbox_label_color?: string;
                    /**
                     * Radio button unchecked border color
                     */
                    radio_unchecked_color?: string;
                    /**
                     * Radio button label text color
                     */
                    radio_label_color?: string;
                    /**
                     * Date picker selected date background color
                     */
                    datepicker_selected_bg?: string;
                    /**
                     * Date picker selected date text color
                     */
                    datepicker_selected_color?: string;
                    /**
                     * Date picker border radius in pixels
                     */
                    datepicker_border_radius?: number;
                    /**
                     * Chip background color
                     */
                    chip_background?: string;
                    /**
                     * Chip hover background color
                     */
                    chip_hover_background?: string;
                    /**
                     * Chip text color
                     */
                    chip_text_color?: string;
                    /**
                     * Chip hover text color
                     */
                    chip_hover_text_color?: string;
                };
                version?: 1;
                colors?: {
                    [name: string]: any;
                };
                typography?: {
                    [name: string]: any;
                };
                shape?: {
                    [name: string]: any;
                };
                components?: {
                    [name: string]: any;
                };
                assets?: {
                    [name: string]: any;
                };
                consumer?: ConsumerData;
            }[];
        }
        export interface GetDesignRes {
            /**
             * Groups of the design document v1. A design is v1 when `version` is 1, otherwise it is the old shape (`style`, `design_tokens`, `custom_theme`). The authoritative contract for the groups is the schema exported by @epilot/design-document. A v1 design keeps `style`, `design_tokens`, `custom_theme` and `use_custom_theme`. A v1 update writes each changed primary colour, font, radius and logo into `style` (`palette.primary`, `typography.font`, `shape.border_radius`, `logo.main`) and deletes the matching `custom_theme` key, so journeys paint the edit. It also writes a set one whose journey field is missing and has no `custom_theme` key, which a journey paints as the fallback. A v1 create does the same when it sends no journey fields. Other groups never reach journeys. A v1 update may carry the `journey` group.
             */
            design?: {
                id?: string;
                /**
                 * Creation date and time
                 * example:
                 * 2021-01-30T08:30:00Z
                 */
                created_at?: string;
                created_by?: string;
                edited: boolean;
                last_modified_at?: string;
                brand_id?: string;
                brand_name?: string;
                user?: {
                    emailaddress?: string;
                    fullname?: string;
                    name?: string;
                    userid?: string;
                };
                style_name: string;
                style: {
                    logo?: LogoData;
                    palette: PaletteData;
                    typography: TypographyData;
                    shape?: ShapeData;
                    consumer: ConsumerData;
                };
                is_default?: boolean;
                /**
                 * The manifest IDs associated with this design
                 */
                _manifest?: string[];
                custom_theme?: string;
                use_custom_theme?: boolean;
                /**
                 * Design tokens for journey customization
                 */
                design_tokens?: {
                    coupon?: string;
                    cashback?: string;
                    custom_css?: string;
                    /**
                     * Accent color, defaults to primary
                     */
                    accent_color?: string;
                    /**
                     * Global outline/focus color
                     */
                    outline_color?: string;
                    /**
                     * Divider line color
                     */
                    divider_color?: string;
                    /**
                     * Link text color
                     */
                    link_color?: string;
                    /**
                     * Link hover text color
                     */
                    link_hover_color?: string;
                    /**
                     * Font size scale factor
                     */
                    font_size_scale?: "xs" | "sm" | "md" | "lg" | "xl";
                    /**
                     * Topbar minimum height in pixels
                     */
                    topbar_height?: number;
                    /**
                     * Logo/content alignment in the top bar
                     */
                    topbar_logo_alignment?: "flex-start" | "center" | "flex-end";
                    /**
                     * Logo size in pixels
                     */
                    logo_size?: number;
                    /**
                     * Input field background color
                     */
                    input_background?: string;
                    /**
                     * Input field border color
                     */
                    input_border_color?: string;
                    /**
                     * Input field text color
                     */
                    input_text_color?: string;
                    /**
                     * Input field label color
                     */
                    input_label_color?: string;
                    /**
                     * Input field border radius in pixels
                     */
                    input_border_radius?: number;
                    /**
                     * Input field height in pixels
                     */
                    input_height?: number;
                    /**
                     * Input field variant style
                     */
                    input_variant?: "outlined" | "filled" | "underlined";
                    /**
                     * Primary button background color or gradient
                     */
                    button_primary_bg?: string;
                    /**
                     * Primary button text color
                     */
                    button_primary_text?: string;
                    /**
                     * Primary button hover background color or gradient
                     */
                    button_primary_hover_bg?: string;
                    /**
                     * Primary button hover text color
                     */
                    button_primary_hover_text?: string;
                    /**
                     * Outlined button border color
                     */
                    button_outlined_border?: string;
                    /**
                     * Outlined button text color
                     */
                    button_outlined_text?: string;
                    /**
                     * Outlined button hover background color
                     */
                    button_outlined_hover_bg?: string;
                    /**
                     * Outlined button hover text color
                     */
                    button_outlined_hover_text?: string;
                    /**
                     * Ghost button background color
                     */
                    button_ghost_bg?: string;
                    /**
                     * Ghost button text color
                     */
                    button_ghost_text?: string;
                    /**
                     * Ghost button hover background color
                     */
                    button_ghost_hover_bg?: string;
                    /**
                     * Ghost button hover text color
                     */
                    button_ghost_hover_text?: string;
                    /**
                     * Button border radius in pixels
                     */
                    button_border_radius?: number;
                    /**
                     * Button height in pixels
                     */
                    button_height?: number;
                    /**
                     * Card background color
                     */
                    card_background?: string;
                    /**
                     * Card border color for outlined variant
                     */
                    card_border_color?: string;
                    /**
                     * Card visual variant
                     */
                    card_variant?: "shadow" | "outlined";
                    /**
                     * Summary card background color
                     */
                    summary_card_background?: string;
                    /**
                     * Toggle button selected background color
                     */
                    toggle_selected_bg?: string;
                    /**
                     * Toggle button selected text color
                     */
                    toggle_selected_text?: string;
                    /**
                     * Toggle button hover background color
                     */
                    toggle_hover_bg?: string;
                    /**
                     * Toggle button hover text color
                     */
                    toggle_hover_text?: string;
                    /**
                     * Toggle group wrapper border color
                     */
                    toggle_border_color?: string;
                    /**
                     * Dropdown option hover background color
                     */
                    dropdown_hover_bg?: string;
                    /**
                     * Dropdown option hover text color
                     */
                    dropdown_hover_text?: string;
                    /**
                     * Dropdown option selected background color
                     */
                    dropdown_selected_bg?: string;
                    /**
                     * Dropdown option selected text color
                     */
                    dropdown_selected_text?: string;
                    /**
                     * Switch unchecked thumb color
                     */
                    switch_unchecked_color?: string;
                    /**
                     * Switch unchecked track background color
                     */
                    switch_unchecked_bg?: string;
                    /**
                     * Switch border radius in pixels
                     */
                    switch_border_radius?: number;
                    /**
                     * Checkbox unchecked border color
                     */
                    checkbox_unchecked_color?: string;
                    /**
                     * Checkbox label text color
                     */
                    checkbox_label_color?: string;
                    /**
                     * Radio button unchecked border color
                     */
                    radio_unchecked_color?: string;
                    /**
                     * Radio button label text color
                     */
                    radio_label_color?: string;
                    /**
                     * Date picker selected date background color
                     */
                    datepicker_selected_bg?: string;
                    /**
                     * Date picker selected date text color
                     */
                    datepicker_selected_color?: string;
                    /**
                     * Date picker border radius in pixels
                     */
                    datepicker_border_radius?: number;
                    /**
                     * Chip background color
                     */
                    chip_background?: string;
                    /**
                     * Chip hover background color
                     */
                    chip_hover_background?: string;
                    /**
                     * Chip text color
                     */
                    chip_text_color?: string;
                    /**
                     * Chip hover text color
                     */
                    chip_hover_text_color?: string;
                };
                version?: 1;
                colors?: {
                    [name: string]: any;
                };
                typography?: {
                    [name: string]: any;
                };
                shape?: {
                    [name: string]: any;
                };
                components?: {
                    [name: string]: any;
                };
                assets?: {
                    [name: string]: any;
                };
                consumer?: ConsumerData;
            };
        }
        export interface GetDesignVariablesRes {
            design_id: string;
            /**
             * `design.name`, `design.colors.primary | background | neutral`, `design.colors.custom.<id>`, `design.typography.heading | body.family | url`, `design.shape.radius`, `design.buttons.primary | secondary | tertiary.color` and `design.assets.logo.url`. Unset values without a default are left out.
             * example:
             * {
             *   "design.name": "Stadtwerke Blau",
             *   "design.colors.primary": "#0054A6",
             *   "design.shape.radius": "8",
             *   "design.assets.logo.url": "https://go.epilot.cloud/designs/org/logo/logo.png"
             * }
             */
            variables: {
                [name: string]: string;
            };
        }
        export type GetFilesRes = {
            name: string;
            display_name?: string;
            file_type?: "LOGO" | "FONT" | "IMAGE";
            s3_object_key: string;
            url: string;
            /**
             * ID of the source file entity in the epilot file-entity system. Set when the file was picked from the File Manager (rather than uploaded directly to the design-builder bucket). Consumers resolve the live `public_url` via this reference. The org id is derived from the journey's owning org at render time (same convention as journey image blocks), so blueprint cross-org installs work without any extra remapping.
             */
            file_id?: string;
        }[];
        export interface ItemMetada {
            id?: string;
            /**
             * Creation date and time
             * example:
             * 2021-01-30T08:30:00Z
             */
            created_at?: string;
            created_by?: string;
            edited?: boolean;
            last_modified_at?: string;
        }
        export interface Journey {
            /**
             * Design tokens for journey customization
             */
            design_tokens?: {
                coupon?: string;
                cashback?: string;
                custom_css?: string;
                /**
                 * Accent color, defaults to primary
                 */
                accent_color?: string;
                /**
                 * Global outline/focus color
                 */
                outline_color?: string;
                /**
                 * Divider line color
                 */
                divider_color?: string;
                /**
                 * Link text color
                 */
                link_color?: string;
                /**
                 * Link hover text color
                 */
                link_hover_color?: string;
                /**
                 * Font size scale factor
                 */
                font_size_scale?: "xs" | "sm" | "md" | "lg" | "xl";
                /**
                 * Topbar minimum height in pixels
                 */
                topbar_height?: number;
                /**
                 * Logo/content alignment in the top bar
                 */
                topbar_logo_alignment?: "flex-start" | "center" | "flex-end";
                /**
                 * Logo size in pixels
                 */
                logo_size?: number;
                /**
                 * Input field background color
                 */
                input_background?: string;
                /**
                 * Input field border color
                 */
                input_border_color?: string;
                /**
                 * Input field text color
                 */
                input_text_color?: string;
                /**
                 * Input field label color
                 */
                input_label_color?: string;
                /**
                 * Input field border radius in pixels
                 */
                input_border_radius?: number;
                /**
                 * Input field height in pixels
                 */
                input_height?: number;
                /**
                 * Input field variant style
                 */
                input_variant?: "outlined" | "filled" | "underlined";
                /**
                 * Primary button background color or gradient
                 */
                button_primary_bg?: string;
                /**
                 * Primary button text color
                 */
                button_primary_text?: string;
                /**
                 * Primary button hover background color or gradient
                 */
                button_primary_hover_bg?: string;
                /**
                 * Primary button hover text color
                 */
                button_primary_hover_text?: string;
                /**
                 * Outlined button border color
                 */
                button_outlined_border?: string;
                /**
                 * Outlined button text color
                 */
                button_outlined_text?: string;
                /**
                 * Outlined button hover background color
                 */
                button_outlined_hover_bg?: string;
                /**
                 * Outlined button hover text color
                 */
                button_outlined_hover_text?: string;
                /**
                 * Ghost button background color
                 */
                button_ghost_bg?: string;
                /**
                 * Ghost button text color
                 */
                button_ghost_text?: string;
                /**
                 * Ghost button hover background color
                 */
                button_ghost_hover_bg?: string;
                /**
                 * Ghost button hover text color
                 */
                button_ghost_hover_text?: string;
                /**
                 * Button border radius in pixels
                 */
                button_border_radius?: number;
                /**
                 * Button height in pixels
                 */
                button_height?: number;
                /**
                 * Card background color
                 */
                card_background?: string;
                /**
                 * Card border color for outlined variant
                 */
                card_border_color?: string;
                /**
                 * Card visual variant
                 */
                card_variant?: "shadow" | "outlined";
                /**
                 * Summary card background color
                 */
                summary_card_background?: string;
                /**
                 * Toggle button selected background color
                 */
                toggle_selected_bg?: string;
                /**
                 * Toggle button selected text color
                 */
                toggle_selected_text?: string;
                /**
                 * Toggle button hover background color
                 */
                toggle_hover_bg?: string;
                /**
                 * Toggle button hover text color
                 */
                toggle_hover_text?: string;
                /**
                 * Toggle group wrapper border color
                 */
                toggle_border_color?: string;
                /**
                 * Dropdown option hover background color
                 */
                dropdown_hover_bg?: string;
                /**
                 * Dropdown option hover text color
                 */
                dropdown_hover_text?: string;
                /**
                 * Dropdown option selected background color
                 */
                dropdown_selected_bg?: string;
                /**
                 * Dropdown option selected text color
                 */
                dropdown_selected_text?: string;
                /**
                 * Switch unchecked thumb color
                 */
                switch_unchecked_color?: string;
                /**
                 * Switch unchecked track background color
                 */
                switch_unchecked_bg?: string;
                /**
                 * Switch border radius in pixels
                 */
                switch_border_radius?: number;
                /**
                 * Checkbox unchecked border color
                 */
                checkbox_unchecked_color?: string;
                /**
                 * Checkbox label text color
                 */
                checkbox_label_color?: string;
                /**
                 * Radio button unchecked border color
                 */
                radio_unchecked_color?: string;
                /**
                 * Radio button label text color
                 */
                radio_label_color?: string;
                /**
                 * Date picker selected date background color
                 */
                datepicker_selected_bg?: string;
                /**
                 * Date picker selected date text color
                 */
                datepicker_selected_color?: string;
                /**
                 * Date picker border radius in pixels
                 */
                datepicker_border_radius?: number;
                /**
                 * Chip background color
                 */
                chip_background?: string;
                /**
                 * Chip hover background color
                 */
                chip_hover_background?: string;
                /**
                 * Chip text color
                 */
                chip_text_color?: string;
                /**
                 * Chip hover text color
                 */
                chip_hover_text_color?: string;
            };
        }
        export type JourneyChoice = "sync" | "design" | "keep";
        export type JourneyWrite = "keep" | "sync";
        export interface LogoData {
            main?: FileData;
        }
        export interface PaletteData {
            primary: string;
            secondary: string;
            error: string;
            background: string;
            paper: string;
            navbar: string;
            portal_login_background?: string;
        }
        export interface ParseThemeFromDesignResp {
            theme?: /**
             * Type of theme to be parsed and returned
             * example:
             * NEW
             */
            Theme;
            design?: {
                id?: string;
                last_modified_at?: string;
                style_name?: string;
                style?: {
                    logo?: LogoData;
                    palette?: PaletteData;
                    typography?: TypographyData;
                };
                custom_theme?: string;
                use_custom_theme?: boolean;
                /**
                 * Design tokens for journey customization (renamed from design_tokens)
                 */
                journey_design_tokens?: {
                    [key: string]: any;
                };
                version?: 1;
                colors?: {
                    [name: string]: any;
                };
                typography?: {
                    [name: string]: any;
                };
                shape?: {
                    [name: string]: any;
                };
                components?: {
                    [name: string]: any;
                };
                assets?: {
                    [name: string]: any;
                };
                /**
                 * v1 designs only: the journey group of @epilot/design-document (custom_css, tokens and the journey overrides primary_color, font, border_radius, logo), derived on read from the stored journey fields and compared with the stored v1 groups. What a journey paints from it equals what it paints from the theme built from the old fields. Not returned by GET.
                 */
                journey?: {
                    [name: string]: any;
                };
            };
        }
        export interface RemoveConsumerReq {
            consumer_id: /**
             * Id of the design
             * example:
             * 4a062990-a6a3-11eb-9828-4f3da7d4935a
             */
            DesignId;
        }
        export interface ReviewChange {
            id: "primary_color" | "fonts" | "corners" | "primary_button" | "logo";
            change: "confirmed" | "changed" | "added" | "removed";
            /**
             * Where the reviewed value comes from
             */
            origin?: "guidelines" | "website";
            /**
             * Where the review saw the value, in its own words, e.g. "background of the hero CTA"
             */
            source?: string;
        }
        export interface ReviewScreenshot {
            index: number;
            /**
             * What it shows, e.g. "desktop, first screen"
             */
            label: string;
            /**
             * `page`, or a close-up of the element a token is read from: `cta`, `logo`, `heading`
             */
            kind?: string;
            /**
             * Where a close-up sits on the page, in CSS pixels (the desktop first screen starts at 0,0)
             */
            box?: {
                x?: number;
                y?: number;
                width?: number;
                height?: number;
            };
            page_url: string;
            tool?: string;
            taken_at?: string;
            /**
             * JPEG as a data URL
             */
            data_url: string;
        }
        export interface ReviewedDesignDocument {
            document: /* Groups of the design document v1. A design is v1 when `version` is 1, otherwise it is the old shape (`style`, `design_tokens`, `custom_theme`). The authoritative contract for the groups is the schema exported by @epilot/design-document. A v1 design keeps `style`, `design_tokens`, `custom_theme` and `use_custom_theme`. A v1 update writes each changed primary colour, font, radius and logo into `style` (`palette.primary`, `typography.font`, `shape.border_radius`, `logo.main`) and deletes the matching `custom_theme` key, so journeys paint the edit. It also writes a set one whose journey field is missing and has no `custom_theme` key, which a journey paints as the fallback. A v1 create does the same when it sends no journey fields. Other groups never reach journeys. A v1 update may carry the `journey` group. */ DesignDocumentV1;
            findings: DesignFinding[];
            site_name: string;
            /**
             * The reviewer's note for the person checking the design, in the website's language
             */
            notes: string;
            changes: ReviewChange[];
        }
        export interface ShapeData {
            border_radius?: number;
        }
        /**
         * Type of theme to be parsed and returned
         * example:
         * NEW
         */
        export type Theme = "NEW" | "OLD";
        export interface TypographyData {
            font: FontData;
            primary: string;
            secondary: string;
        }
        export interface UpdateDesignConflict {
            message?: string;
            /**
             * Groups of the design document v1. A design is v1 when `version` is 1, otherwise it is the old shape (`style`, `design_tokens`, `custom_theme`). The authoritative contract for the groups is the schema exported by @epilot/design-document. A v1 design keeps `style`, `design_tokens`, `custom_theme` and `use_custom_theme`. A v1 update writes each changed primary colour, font, radius and logo into `style` (`palette.primary`, `typography.font`, `shape.border_radius`, `logo.main`) and deletes the matching `custom_theme` key, so journeys paint the edit. It also writes a set one whose journey field is missing and has no `custom_theme` key, which a journey paints as the fallback. A v1 create does the same when it sends no journey fields. Other groups never reach journeys. A v1 update may carry the `journey` group.
             */
            design?: {
                id?: string;
                /**
                 * Creation date and time
                 * example:
                 * 2021-01-30T08:30:00Z
                 */
                created_at?: string;
                created_by?: string;
                edited: boolean;
                last_modified_at?: string;
                brand_id?: string;
                brand_name?: string;
                user?: {
                    emailaddress?: string;
                    fullname?: string;
                    name?: string;
                    userid?: string;
                };
                style_name: string;
                style: {
                    logo?: LogoData;
                    palette: PaletteData;
                    typography: TypographyData;
                    shape?: ShapeData;
                    consumer: ConsumerData;
                };
                is_default?: boolean;
                /**
                 * The manifest IDs associated with this design
                 */
                _manifest?: string[];
                custom_theme?: string;
                use_custom_theme?: boolean;
                /**
                 * Design tokens for journey customization
                 */
                design_tokens?: {
                    coupon?: string;
                    cashback?: string;
                    custom_css?: string;
                    /**
                     * Accent color, defaults to primary
                     */
                    accent_color?: string;
                    /**
                     * Global outline/focus color
                     */
                    outline_color?: string;
                    /**
                     * Divider line color
                     */
                    divider_color?: string;
                    /**
                     * Link text color
                     */
                    link_color?: string;
                    /**
                     * Link hover text color
                     */
                    link_hover_color?: string;
                    /**
                     * Font size scale factor
                     */
                    font_size_scale?: "xs" | "sm" | "md" | "lg" | "xl";
                    /**
                     * Topbar minimum height in pixels
                     */
                    topbar_height?: number;
                    /**
                     * Logo/content alignment in the top bar
                     */
                    topbar_logo_alignment?: "flex-start" | "center" | "flex-end";
                    /**
                     * Logo size in pixels
                     */
                    logo_size?: number;
                    /**
                     * Input field background color
                     */
                    input_background?: string;
                    /**
                     * Input field border color
                     */
                    input_border_color?: string;
                    /**
                     * Input field text color
                     */
                    input_text_color?: string;
                    /**
                     * Input field label color
                     */
                    input_label_color?: string;
                    /**
                     * Input field border radius in pixels
                     */
                    input_border_radius?: number;
                    /**
                     * Input field height in pixels
                     */
                    input_height?: number;
                    /**
                     * Input field variant style
                     */
                    input_variant?: "outlined" | "filled" | "underlined";
                    /**
                     * Primary button background color or gradient
                     */
                    button_primary_bg?: string;
                    /**
                     * Primary button text color
                     */
                    button_primary_text?: string;
                    /**
                     * Primary button hover background color or gradient
                     */
                    button_primary_hover_bg?: string;
                    /**
                     * Primary button hover text color
                     */
                    button_primary_hover_text?: string;
                    /**
                     * Outlined button border color
                     */
                    button_outlined_border?: string;
                    /**
                     * Outlined button text color
                     */
                    button_outlined_text?: string;
                    /**
                     * Outlined button hover background color
                     */
                    button_outlined_hover_bg?: string;
                    /**
                     * Outlined button hover text color
                     */
                    button_outlined_hover_text?: string;
                    /**
                     * Ghost button background color
                     */
                    button_ghost_bg?: string;
                    /**
                     * Ghost button text color
                     */
                    button_ghost_text?: string;
                    /**
                     * Ghost button hover background color
                     */
                    button_ghost_hover_bg?: string;
                    /**
                     * Ghost button hover text color
                     */
                    button_ghost_hover_text?: string;
                    /**
                     * Button border radius in pixels
                     */
                    button_border_radius?: number;
                    /**
                     * Button height in pixels
                     */
                    button_height?: number;
                    /**
                     * Card background color
                     */
                    card_background?: string;
                    /**
                     * Card border color for outlined variant
                     */
                    card_border_color?: string;
                    /**
                     * Card visual variant
                     */
                    card_variant?: "shadow" | "outlined";
                    /**
                     * Summary card background color
                     */
                    summary_card_background?: string;
                    /**
                     * Toggle button selected background color
                     */
                    toggle_selected_bg?: string;
                    /**
                     * Toggle button selected text color
                     */
                    toggle_selected_text?: string;
                    /**
                     * Toggle button hover background color
                     */
                    toggle_hover_bg?: string;
                    /**
                     * Toggle button hover text color
                     */
                    toggle_hover_text?: string;
                    /**
                     * Toggle group wrapper border color
                     */
                    toggle_border_color?: string;
                    /**
                     * Dropdown option hover background color
                     */
                    dropdown_hover_bg?: string;
                    /**
                     * Dropdown option hover text color
                     */
                    dropdown_hover_text?: string;
                    /**
                     * Dropdown option selected background color
                     */
                    dropdown_selected_bg?: string;
                    /**
                     * Dropdown option selected text color
                     */
                    dropdown_selected_text?: string;
                    /**
                     * Switch unchecked thumb color
                     */
                    switch_unchecked_color?: string;
                    /**
                     * Switch unchecked track background color
                     */
                    switch_unchecked_bg?: string;
                    /**
                     * Switch border radius in pixels
                     */
                    switch_border_radius?: number;
                    /**
                     * Checkbox unchecked border color
                     */
                    checkbox_unchecked_color?: string;
                    /**
                     * Checkbox label text color
                     */
                    checkbox_label_color?: string;
                    /**
                     * Radio button unchecked border color
                     */
                    radio_unchecked_color?: string;
                    /**
                     * Radio button label text color
                     */
                    radio_label_color?: string;
                    /**
                     * Date picker selected date background color
                     */
                    datepicker_selected_bg?: string;
                    /**
                     * Date picker selected date text color
                     */
                    datepicker_selected_color?: string;
                    /**
                     * Date picker border radius in pixels
                     */
                    datepicker_border_radius?: number;
                    /**
                     * Chip background color
                     */
                    chip_background?: string;
                    /**
                     * Chip hover background color
                     */
                    chip_hover_background?: string;
                    /**
                     * Chip text color
                     */
                    chip_text_color?: string;
                    /**
                     * Chip hover text color
                     */
                    chip_hover_text_color?: string;
                };
                version?: 1;
                colors?: {
                    [name: string]: any;
                };
                typography?: {
                    [name: string]: any;
                };
                shape?: {
                    [name: string]: any;
                };
                components?: {
                    [name: string]: any;
                };
                assets?: {
                    [name: string]: any;
                };
                consumer?: ConsumerData;
            };
        }
        export interface UpdateDesignReq {
            /**
             * Groups of the design document v1. A design is v1 when `version` is 1, otherwise it is the old shape (`style`, `design_tokens`, `custom_theme`). The authoritative contract for the groups is the schema exported by @epilot/design-document. A v1 design keeps `style`, `design_tokens`, `custom_theme` and `use_custom_theme`. A v1 update writes each changed primary colour, font, radius and logo into `style` (`palette.primary`, `typography.font`, `shape.border_radius`, `logo.main`) and deletes the matching `custom_theme` key, so journeys paint the edit. It also writes a set one whose journey field is missing and has no `custom_theme` key, which a journey paints as the fallback. A v1 create does the same when it sends no journey fields. Other groups never reach journeys. A v1 update may carry the `journey` group.
             */
            design: {
                brand_id?: string;
                brand_name?: string;
                user?: {
                    emailaddress?: string;
                    fullname?: string;
                    name?: string;
                    userid?: string;
                };
                style_name: string;
                style: {
                    logo?: LogoData;
                    palette: PaletteData;
                    typography: TypographyData;
                    shape?: ShapeData;
                    consumer: ConsumerData;
                };
                is_default?: boolean;
                /**
                 * The manifest IDs associated with this design
                 */
                _manifest?: string[];
                custom_theme?: string;
                use_custom_theme?: boolean;
                /**
                 * Design tokens for journey customization
                 */
                design_tokens?: {
                    coupon?: string;
                    cashback?: string;
                    custom_css?: string;
                    /**
                     * Accent color, defaults to primary
                     */
                    accent_color?: string;
                    /**
                     * Global outline/focus color
                     */
                    outline_color?: string;
                    /**
                     * Divider line color
                     */
                    divider_color?: string;
                    /**
                     * Link text color
                     */
                    link_color?: string;
                    /**
                     * Link hover text color
                     */
                    link_hover_color?: string;
                    /**
                     * Font size scale factor
                     */
                    font_size_scale?: "xs" | "sm" | "md" | "lg" | "xl";
                    /**
                     * Topbar minimum height in pixels
                     */
                    topbar_height?: number;
                    /**
                     * Logo/content alignment in the top bar
                     */
                    topbar_logo_alignment?: "flex-start" | "center" | "flex-end";
                    /**
                     * Logo size in pixels
                     */
                    logo_size?: number;
                    /**
                     * Input field background color
                     */
                    input_background?: string;
                    /**
                     * Input field border color
                     */
                    input_border_color?: string;
                    /**
                     * Input field text color
                     */
                    input_text_color?: string;
                    /**
                     * Input field label color
                     */
                    input_label_color?: string;
                    /**
                     * Input field border radius in pixels
                     */
                    input_border_radius?: number;
                    /**
                     * Input field height in pixels
                     */
                    input_height?: number;
                    /**
                     * Input field variant style
                     */
                    input_variant?: "outlined" | "filled" | "underlined";
                    /**
                     * Primary button background color or gradient
                     */
                    button_primary_bg?: string;
                    /**
                     * Primary button text color
                     */
                    button_primary_text?: string;
                    /**
                     * Primary button hover background color or gradient
                     */
                    button_primary_hover_bg?: string;
                    /**
                     * Primary button hover text color
                     */
                    button_primary_hover_text?: string;
                    /**
                     * Outlined button border color
                     */
                    button_outlined_border?: string;
                    /**
                     * Outlined button text color
                     */
                    button_outlined_text?: string;
                    /**
                     * Outlined button hover background color
                     */
                    button_outlined_hover_bg?: string;
                    /**
                     * Outlined button hover text color
                     */
                    button_outlined_hover_text?: string;
                    /**
                     * Ghost button background color
                     */
                    button_ghost_bg?: string;
                    /**
                     * Ghost button text color
                     */
                    button_ghost_text?: string;
                    /**
                     * Ghost button hover background color
                     */
                    button_ghost_hover_bg?: string;
                    /**
                     * Ghost button hover text color
                     */
                    button_ghost_hover_text?: string;
                    /**
                     * Button border radius in pixels
                     */
                    button_border_radius?: number;
                    /**
                     * Button height in pixels
                     */
                    button_height?: number;
                    /**
                     * Card background color
                     */
                    card_background?: string;
                    /**
                     * Card border color for outlined variant
                     */
                    card_border_color?: string;
                    /**
                     * Card visual variant
                     */
                    card_variant?: "shadow" | "outlined";
                    /**
                     * Summary card background color
                     */
                    summary_card_background?: string;
                    /**
                     * Toggle button selected background color
                     */
                    toggle_selected_bg?: string;
                    /**
                     * Toggle button selected text color
                     */
                    toggle_selected_text?: string;
                    /**
                     * Toggle button hover background color
                     */
                    toggle_hover_bg?: string;
                    /**
                     * Toggle button hover text color
                     */
                    toggle_hover_text?: string;
                    /**
                     * Toggle group wrapper border color
                     */
                    toggle_border_color?: string;
                    /**
                     * Dropdown option hover background color
                     */
                    dropdown_hover_bg?: string;
                    /**
                     * Dropdown option hover text color
                     */
                    dropdown_hover_text?: string;
                    /**
                     * Dropdown option selected background color
                     */
                    dropdown_selected_bg?: string;
                    /**
                     * Dropdown option selected text color
                     */
                    dropdown_selected_text?: string;
                    /**
                     * Switch unchecked thumb color
                     */
                    switch_unchecked_color?: string;
                    /**
                     * Switch unchecked track background color
                     */
                    switch_unchecked_bg?: string;
                    /**
                     * Switch border radius in pixels
                     */
                    switch_border_radius?: number;
                    /**
                     * Checkbox unchecked border color
                     */
                    checkbox_unchecked_color?: string;
                    /**
                     * Checkbox label text color
                     */
                    checkbox_label_color?: string;
                    /**
                     * Radio button unchecked border color
                     */
                    radio_unchecked_color?: string;
                    /**
                     * Radio button label text color
                     */
                    radio_label_color?: string;
                    /**
                     * Date picker selected date background color
                     */
                    datepicker_selected_bg?: string;
                    /**
                     * Date picker selected date text color
                     */
                    datepicker_selected_color?: string;
                    /**
                     * Date picker border radius in pixels
                     */
                    datepicker_border_radius?: number;
                    /**
                     * Chip background color
                     */
                    chip_background?: string;
                    /**
                     * Chip hover background color
                     */
                    chip_hover_background?: string;
                    /**
                     * Chip text color
                     */
                    chip_text_color?: string;
                    /**
                     * Chip hover text color
                     */
                    chip_hover_text_color?: string;
                };
                version?: 1;
                colors?: {
                    [name: string]: any;
                };
                typography?: {
                    [name: string]: any;
                };
                shape?: {
                    [name: string]: any;
                };
                components?: {
                    [name: string]: any;
                };
                assets?: {
                    [name: string]: any;
                };
                consumer?: ConsumerData;
            };
            /**
             * Only with a version 1 body. Per journey leaf, overrides the default write-through: `keep` does not write a changed leaf into the journey fields, `sync` writes the design's value even when it did not change (nothing when the design has no value). Not stored.
             */
            journey_write?: {
                primary_color?: JourneyWrite;
                font?: JourneyWrite;
                border_radius?: JourneyWrite;
                logo?: JourneyWrite;
            };
        }
        export interface UploadFileReq {
            file_type: "LOGO" | "FONT" | "IMAGE";
            file_data: string; // base64
            display_name?: string;
            file_name: string;
        }
        export interface UploadFileRes {
            name: string;
            display_name?: string;
            file_type?: "LOGO" | "FONT" | "IMAGE";
            s3_object_key: string;
            url: string;
            /**
             * ID of the source file entity in the epilot file-entity system. Set when the file was picked from the File Manager (rather than uploaded directly to the design-builder bucket). Consumers resolve the live `public_url` via this reference. The org id is derived from the journey's owning org at render time (same convention as journey image blocks), so blueprint cross-org installs work without any extra remapping.
             */
            file_id?: string;
        }
        export interface WidgetData {
            id: string;
            name: string;
        }
        export interface WidgetPortalData {
            id: string;
            name: string;
        }
    }
}
export declare namespace Paths {
    namespace AddConsumer {
        namespace Parameters {
            export type Application = string;
            export type DesignId = /**
             * Id of the design
             * example:
             * 4a062990-a6a3-11eb-9828-4f3da7d4935a
             */
            Components.Schemas.DesignId;
        }
        export interface PathParameters {
            designId: Parameters.DesignId;
            application: Parameters.Application;
        }
        export type RequestBody = Components.Schemas.AddConsumerReq;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace AddDesign {
        export type RequestBody = Components.Schemas.AddDesignReq;
        namespace Responses {
            export type $201 = Components.Schemas.AddDesignRes;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace CreateDesignDocumentJob {
        export type RequestBody = Components.Schemas.CreateDesignDocumentJobReq;
        namespace Responses {
            export type $201 = Components.Schemas.DesignDocumentJob;
            export type $202 = Components.Schemas.DesignDocumentJob;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $403 = Components.Schemas.ErrorResp;
            export type $422 = Components.Schemas.ErrorResp;
            export type $429 = Components.Schemas.ErrorResp;
            export type $502 = Components.Schemas.ErrorResp;
            export type $504 = Components.Schemas.ErrorResp;
        }
    }
    namespace DeleteDesign {
        namespace Parameters {
            export type DesignId = /**
             * Id of the design
             * example:
             * 4a062990-a6a3-11eb-9828-4f3da7d4935a
             */
            Components.Schemas.DesignId;
        }
        export interface PathParameters {
            designId: Parameters.DesignId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
            export type $409 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
            export type $503 = Components.Schemas.ErrorResp;
        }
    }
    namespace DuplicateDesign {
        namespace Parameters {
            export type DesignId = /**
             * Id of the design
             * example:
             * 4a062990-a6a3-11eb-9828-4f3da7d4935a
             */
            Components.Schemas.DesignId;
        }
        export interface PathParameters {
            designId: Parameters.DesignId;
        }
        namespace Responses {
            export type $201 = Components.Schemas.AddDesignRes;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace DuplicateDesignAsV1 {
        namespace Parameters {
            export type DesignId = /**
             * Id of the design
             * example:
             * 4a062990-a6a3-11eb-9828-4f3da7d4935a
             */
            Components.Schemas.DesignId;
        }
        export interface PathParameters {
            designId: Parameters.DesignId;
        }
        export type RequestBody = Components.Schemas.DuplicateDesignAsV1Req;
        namespace Responses {
            export type $200 = Components.Schemas.DuplicateDesignAsV1Plan;
            export type $201 = Components.Schemas.AddDesignRes;
            export type $400 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
            export type $409 = Components.Schemas.DuplicateDesignAsV1Plan;
            export type $502 = Components.Schemas.ErrorResp;
        }
    }
    namespace GenerateDesign {
        export type RequestBody = Components.Schemas.GenerateDesignReq;
        namespace Responses {
            export type $200 = Components.Schemas.GenerateDesignRes;
            export type $201 = Components.Schemas.GenerateDesignRes;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $403 = Components.Schemas.ErrorResp;
            export type $422 = Components.Schemas.ErrorResp;
            export type $502 = Components.Schemas.ErrorResp;
            export type $504 = Components.Schemas.ErrorResp;
        }
    }
    namespace GenerateDesignDocument {
        export type RequestBody = Components.Schemas.GenerateDesignDocumentReq;
        namespace Responses {
            export type $200 = Components.Schemas.GenerateDesignDocumentRes;
            export type $201 = Components.Schemas.GenerateDesignDocumentRes;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $403 = Components.Schemas.ErrorResp;
            export type $422 = Components.Schemas.ErrorResp;
            export type $429 = Components.Schemas.ErrorResp;
            export type $502 = Components.Schemas.ErrorResp;
            export type $504 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetAllDesigns {
        namespace Responses {
            export type $200 = Components.Schemas.GetAllDesignsRes;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetConsumerDesign {
        namespace Parameters {
            export type Application = /**
             * Type of application that uses the design
             * example:
             * journey
             */
            Components.Schemas.Application;
            export type ConsumerId = /**
             * Id of the design
             * example:
             * 4a062990-a6a3-11eb-9828-4f3da7d4935a
             */
            Components.Schemas.DesignId;
        }
        export interface PathParameters {
            consumerId: Parameters.ConsumerId;
            application: Parameters.Application;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetDesignRes;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetDesign {
        namespace Parameters {
            export type DesignId = /**
             * Id of the design
             * example:
             * 4a062990-a6a3-11eb-9828-4f3da7d4935a
             */
            Components.Schemas.DesignId;
        }
        export interface PathParameters {
            designId: Parameters.DesignId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetDesignRes;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetDesignDocumentJob {
        namespace Parameters {
            export type JobId = string; // uuid
            export type ScreenshotsAfter = number;
        }
        export interface PathParameters {
            jobId: Parameters.JobId /* uuid */;
        }
        export interface QueryParameters {
            screenshots_after?: Parameters.ScreenshotsAfter;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DesignDocumentJob;
            export type $401 = Components.Schemas.ErrorResp;
            export type $403 = Components.Schemas.ErrorResp;
            export type $404 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetDesignVariables {
        namespace Parameters {
            export type DesignId = /**
             * Id of the design
             * example:
             * 4a062990-a6a3-11eb-9828-4f3da7d4935a
             */
            Components.Schemas.DesignId;
        }
        export interface PathParameters {
            designId: Parameters.DesignId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetDesignVariablesRes;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetFiles {
        namespace Parameters {
            export type Type = "LOGO" | "FONT" | "IMAGE";
        }
        export interface QueryParameters {
            type?: Parameters.Type;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetFilesRes;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetThemeFromDesign {
        namespace Parameters {
            export type DesignId = /**
             * Id of the design
             * example:
             * 4a062990-a6a3-11eb-9828-4f3da7d4935a
             */
            Components.Schemas.DesignId;
            export type OrgId = string;
            export type Theme = /**
             * Type of theme to be parsed and returned
             * example:
             * NEW
             */
            Components.Schemas.Theme;
        }
        export interface PathParameters {
            designId: Parameters.DesignId;
        }
        export interface QueryParameters {
            orgId?: Parameters.OrgId;
            theme: Parameters.Theme;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ParseThemeFromDesignResp;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace RemoveConsumer {
        namespace Parameters {
            export type Application = string;
            export type DesignId = /**
             * Id of the design
             * example:
             * 4a062990-a6a3-11eb-9828-4f3da7d4935a
             */
            Components.Schemas.DesignId;
        }
        export interface PathParameters {
            designId: Parameters.DesignId;
            application: Parameters.Application;
        }
        export type RequestBody = Components.Schemas.RemoveConsumerReq;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace UpdateDesign {
        export interface HeaderParameters {
            "If-Match"?: Parameters.IfMatch;
        }
        namespace Parameters {
            export type DesignId = /**
             * Id of the design
             * example:
             * 4a062990-a6a3-11eb-9828-4f3da7d4935a
             */
            Components.Schemas.DesignId;
            export type IfMatch = string;
        }
        export interface PathParameters {
            designId: Parameters.DesignId;
        }
        export type RequestBody = Components.Schemas.UpdateDesignReq;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
            export type $409 = Components.Schemas.UpdateDesignConflict;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace UploadFile {
        export type RequestBody = Components.Schemas.UploadFileReq;
        namespace Responses {
            export type $201 = Components.Schemas.UploadFileRes;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
}


export interface OperationMethods {
  /**
   * getAllDesigns - getAllDesigns
   * 
   * Scan all designs linked to a organization, based in orgId attribute from JWT auth token
   */
  'getAllDesigns'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllDesigns.Responses.$200>
  /**
   * addDesign - addDesign
   * 
   * Create a brand new design linked to a organization, based in orgId attribute from JWT auth token
   */
  'addDesign'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddDesign.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddDesign.Responses.$201>
  /**
   * getDesign - getDesign
   * 
   * Search for a especific design owned by user organization
   */
  'getDesign'(
    parameters?: Parameters<Paths.GetDesign.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDesign.Responses.$200>
  /**
   * updateDesign - updateDesign
   * 
   * Update a especific design owned by user organization. A body with `version: 1` is validated against the design document v1 schema and stored as v1. A v1 body leaves the stored `style`, `design_tokens`, `custom_theme` and `use_custom_theme` untouched. A body without `version` on a v1 design is treated as an old client's read-modify-write: those four fields are stored as sent, and brand-wide changes in `style` are applied to the v1 groups.
   */
  'updateDesign'(
    parameters?: Parameters<Paths.UpdateDesign.HeaderParameters & Paths.UpdateDesign.PathParameters> | null,
    data?: Paths.UpdateDesign.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateDesign.Responses.$204>
  /**
   * deleteDesign - deleteDesign
   * 
   * Search and delete for a especific design owned by user organization
   */
  'deleteDesign'(
    parameters?: Parameters<Paths.DeleteDesign.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteDesign.Responses.$204>
  /**
   * duplicateDesign - duplicateDesign
   * 
   * Duplicate an existing design owned by the user organization. The copy carries over the style, custom CSS and name (marked as a copy) but does NOT carry over journey/portal relations, so the new design starts with 0 consumers, exactly like a freshly created design.
   */
  'duplicateDesign'(
    parameters?: Parameters<Paths.DuplicateDesign.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DuplicateDesign.Responses.$201>
  /**
   * duplicateDesignAsV1 - duplicateDesignAsV1
   * 
   * Duplicate a classic design (no version) as a v1 design document. The original stays as it is. The copy is named "<name> (v1)", starts with no journeys or portals and keeps the original's journey fields, so a journey switched to it later paints the same. Where the conversion needs a decision, the questions come back first: which logo and favicon the portal pages using the design show, and, for every value journeys paint differently from the design (primary colour, font, radius, logo), whether journeys take the design's value (sync), the design takes the journeys' value (design) or both stay (keep). Send `dry_run` to get the questions, then the answers to create the copy. Needs the design-document-v1 feature flag.
   */
  'duplicateDesignAsV1'(
    parameters?: Parameters<Paths.DuplicateDesignAsV1.PathParameters> | null,
    data?: Paths.DuplicateDesignAsV1.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DuplicateDesignAsV1.Responses.$200 | Paths.DuplicateDesignAsV1.Responses.$201>
  /**
   * getDesignVariables - getDesignVariables
   * 
   * The design as flat `design.*` template variables (e.g. `design.colors.primary`, `design.assets.logo.url`), for consumers that render designs into text templates such as email templates. Classic designs are converted to design document v1 first, unset values take the defaults of `@epilot/design-document`, and every value is validated for use in HTML attributes and CSS (hex colors, `https:` URLs, numbers, font family lists). Values are not HTML-escaped; consumers escape them where they insert them.
   */
  'getDesignVariables'(
    parameters?: Parameters<Paths.GetDesignVariables.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDesignVariables.Responses.$200>
  /**
   * getThemeFromDesign - getThemeFromDesign
   * 
   * Search for a especific design owned by user organization and parse them to a new or old theme. Deprecated: kept for old readers only. For a v1 design the response carries the v1 groups and the derived `journey` group next to the stored old fields and the theme built from them; new runtimes read the v1 groups.
   */
  'getThemeFromDesign'(
    parameters?: Parameters<Paths.GetThemeFromDesign.QueryParameters & Paths.GetThemeFromDesign.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetThemeFromDesign.Responses.$200>
  /**
   * generateDesign - generateDesign
   * 
   * Generates a design (palette, text colours, font, logo and border radius) from a public
   * website with AI. The result is cached per organization and URL for 30 days.
   * 
   */
  'generateDesign'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GenerateDesign.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GenerateDesign.Responses.$200 | Paths.GenerateDesign.Responses.$201>
  /**
   * generateDesignDocument - generateDesignDocument
   * 
   * Reads a public website and returns a v1 design document plus one finding for each
   * id in fixed order. This version chooses the favicon in code and derives the site name.
   * The other findings are `not_found` until they are implemented. The document contains
   * only the leaves that passed validation, and defaults are not pruned.
   * Successful responses are cached per organization, normalised URL and generator version
   * for 7 days. Each organization may run 20 new generations per UTC day; cache hits do not
   * count toward the limit. A client abort still finishes on the server and is cached.
   * 
   */
  'generateDesignDocument'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GenerateDesignDocument.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GenerateDesignDocument.Responses.$200 | Paths.GenerateDesignDocument.Responses.$201>
  /**
   * createDesignDocumentJob - createDesignDocumentJob
   * 
   * Generates a v1 design document from a public website like `generateDesignDocument`, returns it
   * right away as `baseline`, and starts an AI review of it in the background. The review looks at the
   * website in a real browser and reads the optional brand guideline files, then confirms or corrects
   * the baseline (primary color, fonts, corners, primary button, logo). Poll `getDesignDocumentJob`
   * for the reviewed document.
   * 
   * Each call counts toward the 20 generations per organization and UTC day. Reviews have their own
   * limit of 5 per organization and UTC day; past it, or when the review can't start, the response is
   * 201 with `review.status: skipped` and the baseline is the result. When the deterministic generation
   * finds nothing, the review builds the document on its own and `baseline` is null.
   * 
   * Brand guideline files are uploaded with file-api `uploadFileV2` first and referenced by `s3ref`.
   * 
   */
  'createDesignDocumentJob'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateDesignDocumentJob.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateDesignDocumentJob.Responses.$201 | Paths.CreateDesignDocumentJob.Responses.$202>
  /**
   * getDesignDocumentJob - getDesignDocumentJob
   * 
   * The state of a design document review started with `createDesignDocumentJob`. While it runs,
   * `steps` lists the browser tools used so far. When it completes, `result` holds the reviewed design
   * document, the reviewer's note and how each finding changed. A failed review keeps the baseline.
   * Jobs are kept for one day.
   * 
   */
  'getDesignDocumentJob'(
    parameters?: Parameters<Paths.GetDesignDocumentJob.QueryParameters & Paths.GetDesignDocumentJob.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDesignDocumentJob.Responses.$200>
  /**
   * getFiles - getFiles
   * 
   * List all files for the user organization bucket
   */
  'getFiles'(
    parameters?: Parameters<Paths.GetFiles.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFiles.Responses.$200>
  /**
   * uploadFile - uploadFile
   * 
   * Upload a new file for the user organization bucket
   */
  'uploadFile'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UploadFile.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UploadFile.Responses.$201>
  /**
   * getConsumerDesign - getConsumerDesign
   * 
   * Search for a especific design owned by user organization
   */
  'getConsumerDesign'(
    parameters?: Parameters<Paths.GetConsumerDesign.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConsumerDesign.Responses.$200>
  /**
   * addConsumer - addConsumer
   * 
   * Add a consumer that uses a specific design
   */
  'addConsumer'(
    parameters?: Parameters<Paths.AddConsumer.PathParameters> | null,
    data?: Paths.AddConsumer.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddConsumer.Responses.$204>
  /**
   * removeConsumer - removeConsumer
   * 
   * Remove a consumer that uses a specific design
   */
  'removeConsumer'(
    parameters?: Parameters<Paths.RemoveConsumer.PathParameters> | null,
    data?: Paths.RemoveConsumer.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RemoveConsumer.Responses.$204>
}

export interface PathsDictionary {
  ['/v1/designs']: {
    /**
     * getAllDesigns - getAllDesigns
     * 
     * Scan all designs linked to a organization, based in orgId attribute from JWT auth token
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllDesigns.Responses.$200>
    /**
     * addDesign - addDesign
     * 
     * Create a brand new design linked to a organization, based in orgId attribute from JWT auth token
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddDesign.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddDesign.Responses.$201>
  }
  ['/v1/designs/{designId}']: {
    /**
     * getDesign - getDesign
     * 
     * Search for a especific design owned by user organization
     */
    'get'(
      parameters?: Parameters<Paths.GetDesign.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDesign.Responses.$200>
    /**
     * deleteDesign - deleteDesign
     * 
     * Search and delete for a especific design owned by user organization
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteDesign.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteDesign.Responses.$204>
    /**
     * updateDesign - updateDesign
     * 
     * Update a especific design owned by user organization. A body with `version: 1` is validated against the design document v1 schema and stored as v1. A v1 body leaves the stored `style`, `design_tokens`, `custom_theme` and `use_custom_theme` untouched. A body without `version` on a v1 design is treated as an old client's read-modify-write: those four fields are stored as sent, and brand-wide changes in `style` are applied to the v1 groups.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateDesign.HeaderParameters & Paths.UpdateDesign.PathParameters> | null,
      data?: Paths.UpdateDesign.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateDesign.Responses.$204>
  }
  ['/v1/designs/{designId}/duplicate']: {
    /**
     * duplicateDesign - duplicateDesign
     * 
     * Duplicate an existing design owned by the user organization. The copy carries over the style, custom CSS and name (marked as a copy) but does NOT carry over journey/portal relations, so the new design starts with 0 consumers, exactly like a freshly created design.
     */
    'post'(
      parameters?: Parameters<Paths.DuplicateDesign.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DuplicateDesign.Responses.$201>
  }
  ['/v1/designs/{designId}/duplicate-as-v1']: {
    /**
     * duplicateDesignAsV1 - duplicateDesignAsV1
     * 
     * Duplicate a classic design (no version) as a v1 design document. The original stays as it is. The copy is named "<name> (v1)", starts with no journeys or portals and keeps the original's journey fields, so a journey switched to it later paints the same. Where the conversion needs a decision, the questions come back first: which logo and favicon the portal pages using the design show, and, for every value journeys paint differently from the design (primary colour, font, radius, logo), whether journeys take the design's value (sync), the design takes the journeys' value (design) or both stay (keep). Send `dry_run` to get the questions, then the answers to create the copy. Needs the design-document-v1 feature flag.
     */
    'post'(
      parameters?: Parameters<Paths.DuplicateDesignAsV1.PathParameters> | null,
      data?: Paths.DuplicateDesignAsV1.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DuplicateDesignAsV1.Responses.$200 | Paths.DuplicateDesignAsV1.Responses.$201>
  }
  ['/v1/designs/{designId}/variables']: {
    /**
     * getDesignVariables - getDesignVariables
     * 
     * The design as flat `design.*` template variables (e.g. `design.colors.primary`, `design.assets.logo.url`), for consumers that render designs into text templates such as email templates. Classic designs are converted to design document v1 first, unset values take the defaults of `@epilot/design-document`, and every value is validated for use in HTML attributes and CSS (hex colors, `https:` URLs, numbers, font family lists). Values are not HTML-escaped; consumers escape them where they insert them.
     */
    'get'(
      parameters?: Parameters<Paths.GetDesignVariables.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDesignVariables.Responses.$200>
  }
  ['/v1/designs/{designId}/parse']: {
    /**
     * getThemeFromDesign - getThemeFromDesign
     * 
     * Search for a especific design owned by user organization and parse them to a new or old theme. Deprecated: kept for old readers only. For a v1 design the response carries the v1 groups and the derived `journey` group next to the stored old fields and the theme built from them; new runtimes read the v1 groups.
     */
    'get'(
      parameters?: Parameters<Paths.GetThemeFromDesign.QueryParameters & Paths.GetThemeFromDesign.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetThemeFromDesign.Responses.$200>
  }
  ['/v1/designs/generate']: {
    /**
     * generateDesign - generateDesign
     * 
     * Generates a design (palette, text colours, font, logo and border radius) from a public
     * website with AI. The result is cached per organization and URL for 30 days.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GenerateDesign.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GenerateDesign.Responses.$200 | Paths.GenerateDesign.Responses.$201>
  }
  ['/v1/designs/document/generate']: {
    /**
     * generateDesignDocument - generateDesignDocument
     * 
     * Reads a public website and returns a v1 design document plus one finding for each
     * id in fixed order. This version chooses the favicon in code and derives the site name.
     * The other findings are `not_found` until they are implemented. The document contains
     * only the leaves that passed validation, and defaults are not pruned.
     * Successful responses are cached per organization, normalised URL and generator version
     * for 7 days. Each organization may run 20 new generations per UTC day; cache hits do not
     * count toward the limit. A client abort still finishes on the server and is cached.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GenerateDesignDocument.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GenerateDesignDocument.Responses.$200 | Paths.GenerateDesignDocument.Responses.$201>
  }
  ['/v1/designs/document/generate/jobs']: {
    /**
     * createDesignDocumentJob - createDesignDocumentJob
     * 
     * Generates a v1 design document from a public website like `generateDesignDocument`, returns it
     * right away as `baseline`, and starts an AI review of it in the background. The review looks at the
     * website in a real browser and reads the optional brand guideline files, then confirms or corrects
     * the baseline (primary color, fonts, corners, primary button, logo). Poll `getDesignDocumentJob`
     * for the reviewed document.
     * 
     * Each call counts toward the 20 generations per organization and UTC day. Reviews have their own
     * limit of 5 per organization and UTC day; past it, or when the review can't start, the response is
     * 201 with `review.status: skipped` and the baseline is the result. When the deterministic generation
     * finds nothing, the review builds the document on its own and `baseline` is null.
     * 
     * Brand guideline files are uploaded with file-api `uploadFileV2` first and referenced by `s3ref`.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateDesignDocumentJob.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateDesignDocumentJob.Responses.$201 | Paths.CreateDesignDocumentJob.Responses.$202>
  }
  ['/v1/designs/document/generate/jobs/{jobId}']: {
    /**
     * getDesignDocumentJob - getDesignDocumentJob
     * 
     * The state of a design document review started with `createDesignDocumentJob`. While it runs,
     * `steps` lists the browser tools used so far. When it completes, `result` holds the reviewed design
     * document, the reviewer's note and how each finding changed. A failed review keeps the baseline.
     * Jobs are kept for one day.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetDesignDocumentJob.QueryParameters & Paths.GetDesignDocumentJob.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDesignDocumentJob.Responses.$200>
  }
  ['/v1/designs/files']: {
    /**
     * uploadFile - uploadFile
     * 
     * Upload a new file for the user organization bucket
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UploadFile.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UploadFile.Responses.$201>
    /**
     * getFiles - getFiles
     * 
     * List all files for the user organization bucket
     */
    'get'(
      parameters?: Parameters<Paths.GetFiles.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFiles.Responses.$200>
  }
  ['/v1/designs/consumer/{application}/{consumerId}']: {
    /**
     * getConsumerDesign - getConsumerDesign
     * 
     * Search for a especific design owned by user organization
     */
    'get'(
      parameters?: Parameters<Paths.GetConsumerDesign.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConsumerDesign.Responses.$200>
  }
  ['/v1/designs/addConsumer/{application}/{designId}']: {
    /**
     * addConsumer - addConsumer
     * 
     * Add a consumer that uses a specific design
     */
    'put'(
      parameters?: Parameters<Paths.AddConsumer.PathParameters> | null,
      data?: Paths.AddConsumer.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddConsumer.Responses.$204>
  }
  ['/v1/designs/removeConsumer/{application}/{designId}']: {
    /**
     * removeConsumer - removeConsumer
     * 
     * Remove a consumer that uses a specific design
     */
    'put'(
      parameters?: Parameters<Paths.RemoveConsumer.PathParameters> | null,
      data?: Paths.RemoveConsumer.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RemoveConsumer.Responses.$204>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AddConsumerReq = Components.Schemas.AddConsumerReq;
export type AddDesignReq = Components.Schemas.AddDesignReq;
export type AddDesignRes = Components.Schemas.AddDesignRes;
export type Application = Components.Schemas.Application;
export type BrandGuidelineAttachment = Components.Schemas.BrandGuidelineAttachment;
export type ConsumerData = Components.Schemas.ConsumerData;
export type CreateDesignDocumentJobReq = Components.Schemas.CreateDesignDocumentJobReq;
export type Custom_Style = Components.Schemas.CustomStyle;
export type CustomerPortalData = Components.Schemas.CustomerPortalData;
export type DesignDocumentJob = Components.Schemas.DesignDocumentJob;
export type Design_Document_V1 = Components.Schemas.DesignDocumentV1;
export type DesignFinding = Components.Schemas.DesignFinding;
export type DesignId = Components.Schemas.DesignId;
export type DesignItem = Components.Schemas.DesignItem;
export type DesignParameters = Components.Schemas.DesignParameters;
export type DuplicateDesignAsV1Plan = Components.Schemas.DuplicateDesignAsV1Plan;
export type DuplicateDesignAsV1Req = Components.Schemas.DuplicateDesignAsV1Req;
export type ErrorResp = Components.Schemas.ErrorResp;
export type FileData = Components.Schemas.FileData;
export type FindingDetail = Components.Schemas.FindingDetail;
export type FindingId = Components.Schemas.FindingId;
export type FindingStatus = Components.Schemas.FindingStatus;
export type FontData = Components.Schemas.FontData;
export type FontResponseUrl = Components.Schemas.FontResponseUrl;
export type GenerateDesignDocumentReq = Components.Schemas.GenerateDesignDocumentReq;
export type GenerateDesignDocumentRes = Components.Schemas.GenerateDesignDocumentRes;
export type GenerateDesignReq = Components.Schemas.GenerateDesignReq;
export type GenerateDesignRes = Components.Schemas.GenerateDesignRes;
export type GeneratedDesign = Components.Schemas.GeneratedDesign;
export type GeneratedDesignDocument = Components.Schemas.GeneratedDesignDocument;
export type GetAllDesignsRes = Components.Schemas.GetAllDesignsRes;
export type GetDesignRes = Components.Schemas.GetDesignRes;
export type GetDesignVariablesRes = Components.Schemas.GetDesignVariablesRes;
export type GetFilesRes = Components.Schemas.GetFilesRes;
export type ItemMetada = Components.Schemas.ItemMetada;
export type Journey = Components.Schemas.Journey;
export type JourneyChoice = Components.Schemas.JourneyChoice;
export type Journey_Write = Components.Schemas.JourneyWrite;
export type LogoData = Components.Schemas.LogoData;
export type PaletteData = Components.Schemas.PaletteData;
export type ParseThemeFromDesignResp = Components.Schemas.ParseThemeFromDesignResp;
export type RemoveConsumerReq = Components.Schemas.RemoveConsumerReq;
export type ReviewChange = Components.Schemas.ReviewChange;
export type ReviewScreenshot = Components.Schemas.ReviewScreenshot;
export type ReviewedDesignDocument = Components.Schemas.ReviewedDesignDocument;
export type ShapeData = Components.Schemas.ShapeData;
export type Theme = Components.Schemas.Theme;
export type TypographyData = Components.Schemas.TypographyData;
export type UpdateDesignConflict = Components.Schemas.UpdateDesignConflict;
export type UpdateDesignReq = Components.Schemas.UpdateDesignReq;
export type UploadFileReq = Components.Schemas.UploadFileReq;
export type UploadFileRes = Components.Schemas.UploadFileRes;
export type WidgetData = Components.Schemas.WidgetData;
export type WidgetPortalData = Components.Schemas.WidgetPortalData;
