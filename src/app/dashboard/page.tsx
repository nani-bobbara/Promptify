import { PromptGenerator } from "@/components/dashboard/PromptGenerator";
import { createClient } from "@/lib/supabase/server";
import { SupportedTemplate, SupportedAIModel } from "@/types/dynamic-config";

export default async function DashboardPage() {
    const supabase = await createClient();

    // Fetch initial config on server for zero-layout-shift hydration
    const [templatesRes, modelsRes] = await Promise.all([
        supabase.from('supported_templates').select('*').eq('is_active', true).order('created_at', { ascending: true }),
        supabase.from('supported_ai_models').select('*').eq('is_active', true).order('name')
    ]);

    return (
        <PromptGenerator
            initialTemplates={(templatesRes.data as SupportedTemplate[]) || []}
            initialModels={(modelsRes.data as SupportedAIModel[]) || []}
        />
    );
}
