"use server";

import { createClient } from "@/lib/supabase/server";
import { SupportedAIModel, Tier } from "@/types/dynamic-config";
import { AIProviderService } from "@/lib/ai-service";

interface GeneratePromptInput {
    topic: string;
    templateId?: string;
    templateStructure?: string;
    style?: string;
    modelId: string;
    parameters?: Record<string, unknown>;
    usePersonalKey?: boolean;
}

interface GeneratePromptResult {
    content: string;
    error?: string;
}

export async function generatePrompt(input: GeneratePromptInput): Promise<GeneratePromptResult> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { content: "", error: "Unauthorized" };
    }

    // 1. Fetch Model Config
    const { data: modelData } = await supabase
        .from('supported_ai_models')
        .select('*')
        .eq('model_id', input.modelId)
        .eq('is_active', true)
        .single();

    const modelConfig = modelData as SupportedAIModel;
    if (!modelConfig) {
        return { content: "", error: `Invalid or disabled model: ${input.modelId}` };
    }

    // 2. Fetch User Subscription & Tier Details
    const { data: subscription } = await supabase
        .from("user_subscriptions")
        .select("*, tier:tier_id(*)")
        .eq("user_id", user.id)
        .single();

    if (!subscription) {
        return { content: "", error: "Subscription not found" };
    }

    const currentTier = subscription.tier as Tier;
    // New schema uses monthly_usage_count and monthly_quota_limit
    const usageCount = subscription.monthly_usage_count || 0;

    // 3. Quota & BYOK Logic
    let usePersonalKey = input.usePersonalKey ?? subscription.use_personal_keys_default ?? false;

    // Strict Gating: If user wants BYOK but tier doesn't allow it
    if (usePersonalKey && !currentTier.features.byok_enabled) {
        usePersonalKey = false;
        // Optional: show info that BYOK is a premium feature
    }

    let isUsingPlatformKey = !usePersonalKey;

    // Fallback logic if quota reached
    if (isUsingPlatformKey && usageCount >= currentTier.features.prompts_included) {
        if (currentTier.features.byok_enabled) {
            // Check if user has a key stored for this provider
            const { data: userKeys } = await supabase
                .from("user_api_keys")
                .select("encrypted_key")
                .eq("user_id", user.id)
                .eq("provider", modelConfig.provider)
                .single();

            if (userKeys) {
                usePersonalKey = true;
                isUsingPlatformKey = false;
            } else {
                return {
                    content: "",
                    error: `Monthly limit of ${currentTier.features.prompts_included} prompts reached. Add a personal API Key in Settings to continue.`
                };
            }
        } else {
            return {
                content: "",
                error: `Monthly limit of ${currentTier.features.prompts_included} prompts reached. Upgrade to Premium for higher limits or BYOK support.`
            };
        }
    }

    // 4. Construct system prompt
    console.log("[DEBUG] Generating prompt for model:", input.modelId);
    console.log("[DEBUG] Provider:", modelConfig.provider);
    const systemPrompt = buildDynamicPrompt(
        input.templateStructure || "",
        input.topic,
        input.style,
        input.parameters
    );

    // 5. Determine API Key
    let apiKey: string | undefined;
    if (isUsingPlatformKey) {
        apiKey = process.env[modelConfig.env_key];
    } else {
        const { data: userKey } = await supabase
            .from("user_api_keys")
            .select("encrypted_key")
            .eq("user_id", user.id)
            .eq("provider", modelConfig.provider)
            .single();
        apiKey = userKey?.encrypted_key;
    }

    console.log("[DEBUG] API Key found:", !!apiKey);
    if (!apiKey) {
        console.error("[DEBUG] No API key found for", modelConfig.provider, "using env key:", modelConfig.env_key);
        return { content: "", error: `Configuration Error: No API key found for ${modelConfig.provider}.` };
    }

    // 6. Execute AI Generation via Service Layer
    console.log("[DEBUG] Calling AI service...");
    const result = await AIProviderService.generate(modelConfig.provider, {
        apiKey,
        systemPrompt,
        userPrompt: input.topic,
        modelId: modelConfig.model_id,
        endpoint: modelConfig.endpoint
    });

    console.log("[DEBUG] AI Service response:", result.error ? "ERROR: " + result.error : "SUCCESS (length: " + result.content.length + ")");
    if (result.error) return result;

    // 7. Post-Processing: Update Usage & History
    if (isUsingPlatformKey) {
        await supabase
            .from('user_subscriptions')
            .update({ monthly_usage_count: usageCount + 1 })
            .eq('user_id', user.id);
    }

    await supabase.from("user_prompts").insert({
        user_id: user.id,
        template_type: input.modelId,
        input_prompt: input.topic,
        output_text: result.content,
        // context_data: input.contextData || {}, // Future support
        // output_structured: result.structured || {} // Future support
    });

    return result;
}

function buildDynamicPrompt(template: string, topic: string, style?: string, params?: Record<string, unknown>): string {
    let prompt = template || "";

    if (params) {
        Object.keys(params).forEach(key => {
            const val = params[key];
            prompt = prompt.replace(new RegExp(`{{${key}}}`, 'g'), String(val));
        });
    }

    const topicPlaceholders = ['topic', 'subject', 'details', 'input'];
    topicPlaceholders.forEach(ph => {
        if (prompt.includes(`{{${ph}}}`)) {
            prompt = prompt.replace(new RegExp(`{{${ph}}}`, 'g'), topic);
        }
    });

    if (style) {
        if (prompt.includes('{{style}}')) {
            prompt = prompt.replace(/{{style}}/g, style);
        } else {
            prompt += `\n\nVisual Style: ${style}`;
        }
    }

    return prompt + `\n\nRespond ONLY with the generated prompt, no explanations.`;
}
