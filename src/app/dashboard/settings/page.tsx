import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SettingsClient } from "@/components/dashboard/SettingsClient";
import { getApiKeyStatus } from "@/app/actions/manage-api-keys";

export default async function SettingsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth");
    }

    const { data: profile } = await supabase
        .from("user_profiles")
        .select("full_name")
        .eq("user_id", user.id)
        .single();

    // Fetch subscription details with tier information
    const { data: rawSubscription } = await supabase
        .from("user_subscriptions")
        .select(`
             *,
             tier:subscription_tiers!tier_id (*)
        `)
        .eq("user_id", user.id)
        .single();

    // Default to free tier if no subscription found
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentTier: any = rawSubscription?.tier || { id: 'free', name: 'Free', monthly_quota: 10, features: [] };
    const quotaUsed = rawSubscription?.monthly_usage_count || 0;
    const quotaLimit = rawSubscription?.monthly_quota_limit || 10;

    // Parse features to check for BYOK capability
    const features = Array.isArray(currentTier.features) ? currentTier.features : [];
    const byokEnabled = features.some((f: string) =>
        typeof f === 'string' && (f.toLowerCase().includes('own key') || f.toLowerCase().includes('byok'))
    );

    // Feature flag for personal key default
    const usePersonalDefault = false;

    const keyStatus = await getApiKeyStatus();

    return (
        <SettingsClient
            userEmail={user.email || ""}
            userName={profile?.full_name || user.email?.split("@")[0] || "User"}
            keyStatus={keyStatus}
            priceBasicId={process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC || ""}
            priceProId={process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || ""}
            subscription={{
                tierName: currentTier.name,
                quotaUsed: quotaUsed,
                quotaLimit: quotaLimit,
                tierFeatures: {
                    byok_enabled: byokEnabled
                },
                usePersonalDefault: usePersonalDefault
            }}
        />
    );
}
