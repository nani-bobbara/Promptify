import { PromptGenerator } from "@/components/dashboard/PromptGenerator";
import { createClient } from "@/lib/supabase/server";
import { SupportedTemplate, SupportedAIModel, Tier } from "@/types/dynamic-config";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    // Fetch initial config on server for zero-layout-shift hydration
    const [{ data: templatesData }, { data: modelsData }, { data: subscriptionData }] = await Promise.all([
        supabase.from('supported_templates').select('*').eq('is_active', true).order('created_at', { ascending: true }),
        supabase.from('supported_ai_models').select('*').eq('is_active', true).order('name'),
        supabase.from('user_subscriptions').select('*, tier:tier_id (*)').eq('user_id', user.id).single()
    ]);

    const subscription = subscriptionData ? {
        tier: subscriptionData.tiers as Tier,
        usePersonalDefault: subscriptionData.use_personal_keys_default
    } : null;

    return (
        <PromptGenerator
            initialTemplates={(templatesData as SupportedTemplate[]) || []}
            initialModels={(modelsData as SupportedAIModel[]) || []}
            subscription={subscription}
        />
    );
}
