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
            should_delete?: string;
        }
        export interface AddDesignReq {
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
            };
        }
        export interface AddDesignRes {
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
            };
        }
        /**
         * Type of application that uses the design
         * example:
         * journey
         */
        export type Application = string;
        export interface BrandItem {
            id: string;
            name: string;
            created_by?: string;
            created_date?: string;
            main_brand?: string;
            organization_id?: string;
            updated_date?: string;
            updated_by?: string;
            status?: string;
        }
        export interface ConsumerData {
            widgets: (WidgetData)[];
            customer_portals: (CustomerPortalData)[];
        }
        export interface CustomStyle {
            custom_theme?: string;
            use_custom_theme?: boolean;
        }
        export interface CustomerPortalData {
            id: string;
            name: string;
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
        export interface ErrorResp {
            message?: string;
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
        }
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
            }[];
        }
        export interface GetBrandsRes {
            brands?: {
                id: string;
                name: string;
                created_by?: string;
                created_date?: string;
                main_brand?: string;
                organization_id?: string;
                updated_date?: string;
                updated_by?: string;
                status?: string;
            }[];
        }
        export interface GetDesignRes {
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
            };
        }
        export type GetFilesRes = {
            name: string;
            display_name?: string;
            file_type?: "LOGO" | "FONT" | "IMAGE";
            s3_object_key: string;
            url: string;
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
        export interface RemoveConsumerReq {
            consumer_id: /**
             * Id of the design
             * example:
             * 4a062990-a6a3-11eb-9828-4f3da7d4935a
             */
            DesignId;
            should_delete?: string;
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
        export interface UpdateDesignReq {
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
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetAllDesigns {
        namespace Responses {
            export type $200 = Components.Schemas.GetAllDesignsRes;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetBrands {
        namespace Responses {
            export type $200 = Components.Schemas.GetBrandsRes[];
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
    namespace GetLimit {
        namespace Responses {
            export type $200 = number;
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
            export interface $200 {
            }
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
        export type RequestBody = Components.Schemas.UpdateDesignReq;
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
   * Update a especific design owned by user organization
   */
  'updateDesign'(
    parameters?: Parameters<Paths.UpdateDesign.PathParameters> | null,
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
   * getThemeFromDesign - getThemeFromDesign
   * 
   * Search for a especific design owned by user organization and parse them to a new or old theme
   */
  'getThemeFromDesign'(
    parameters?: Parameters<Paths.GetThemeFromDesign.QueryParameters & Paths.GetThemeFromDesign.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetThemeFromDesign.Responses.$200>
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
   * getLimit - getLimit
   * 
   * Gets designs number limit from database per organization
   */
  'getLimit'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetLimit.Responses.$200>
  /**
   * getBrands - getBrands
   * 
   * Scan all brands linked to a organization, based in orgId attribute from JWT auth token
   */
  'getBrands'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBrands.Responses.$200>
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
     * Update a especific design owned by user organization
     */
    'put'(
      parameters?: Parameters<Paths.UpdateDesign.PathParameters> | null,
      data?: Paths.UpdateDesign.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateDesign.Responses.$204>
  }
  ['/v1/designs/{designId}/parse']: {
    /**
     * getThemeFromDesign - getThemeFromDesign
     * 
     * Search for a especific design owned by user organization and parse them to a new or old theme
     */
    'get'(
      parameters?: Parameters<Paths.GetThemeFromDesign.QueryParameters & Paths.GetThemeFromDesign.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetThemeFromDesign.Responses.$200>
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
  ['/v1/designs/limit']: {
    /**
     * getLimit - getLimit
     * 
     * Gets designs number limit from database per organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLimit.Responses.$200>
  }
  ['/v1/brands']: {
    /**
     * getBrands - getBrands
     * 
     * Scan all brands linked to a organization, based in orgId attribute from JWT auth token
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBrands.Responses.$200>
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
export type BrandItem = Components.Schemas.BrandItem;
export type ConsumerData = Components.Schemas.ConsumerData;
export type Custom_Style = Components.Schemas.CustomStyle;
export type CustomerPortalData = Components.Schemas.CustomerPortalData;
export type DesignId = Components.Schemas.DesignId;
export type DesignItem = Components.Schemas.DesignItem;
export type DesignParameters = Components.Schemas.DesignParameters;
export type ErrorResp = Components.Schemas.ErrorResp;
export type FileData = Components.Schemas.FileData;
export type FontData = Components.Schemas.FontData;
export type FontResponseUrl = Components.Schemas.FontResponseUrl;
export type GetAllDesignsRes = Components.Schemas.GetAllDesignsRes;
export type GetBrandsRes = Components.Schemas.GetBrandsRes;
export type GetDesignRes = Components.Schemas.GetDesignRes;
export type GetFilesRes = Components.Schemas.GetFilesRes;
export type ItemMetada = Components.Schemas.ItemMetada;
export type Journey = Components.Schemas.Journey;
export type LogoData = Components.Schemas.LogoData;
export type PaletteData = Components.Schemas.PaletteData;
export type RemoveConsumerReq = Components.Schemas.RemoveConsumerReq;
export type ShapeData = Components.Schemas.ShapeData;
export type Theme = Components.Schemas.Theme;
export type TypographyData = Components.Schemas.TypographyData;
export type UpdateDesignReq = Components.Schemas.UpdateDesignReq;
export type UploadFileReq = Components.Schemas.UploadFileReq;
export type UploadFileRes = Components.Schemas.UploadFileRes;
export type WidgetData = Components.Schemas.WidgetData;
export type WidgetPortalData = Components.Schemas.WidgetPortalData;
