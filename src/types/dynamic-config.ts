export type ParameterType = 'select' | 'input' | 'slider';

export interface ParameterSchema {
    key: string;
    type: ParameterType;
    label: string;
    description?: string;
    // For Select
    options?: { label: string; value: string }[];
    // For Slider
    min?: number;
    max?: number;
    step?: number;
    // For Input
    placeholder?: string;
}

export interface SupportedTemplate {
    id: string;
    category: 'Image' | 'Video' | 'Text' | 'Utility';
    name: string;
    description: string;
    structure: string;
    default_params: Record<string, unknown>;
    param_schema: ParameterSchema[];
    help_text?: string;
    is_active: boolean;
}

export interface SupportedAIModel {
    id: string;
    model_id: string;
    name: string;
    provider: string;
    description: string;
    endpoint: string;
    env_key: string;
    is_active: boolean;
}

export interface TierFeatures {
    prompts_included: number;
    tokens_included: number;
    byok_enabled: boolean;
    json_export: boolean;
    template_access: string;
    variations_limit?: number;
    // New features can be added here without DB schema changes
}

export interface Tier {
    id: string;
    name: string;
    price: number;
    quota: number; // Kept for backward compat, should match features.prompts_included
    stripe_price_id: string | null;
    stripe_product_id: string | null;
    description: string | null;
    features: TierFeatures;
}
