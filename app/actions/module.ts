"use server";

import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/app/lib/supabase-admin";

export async function getUserPlan(): Promise<string> {
    try {
        const { userId } = await auth();
        if (!userId) return "free";

        const { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("subscription_status, current_period_end")
            .eq("user_id", userId)
            .maybeSingle();

        const userPlan = profile?.subscription_status || "free";

        // Un plan est valide s'il n'a pas de date de fin OU si la date de fin est dans le futur.
        const isActive = profile?.current_period_end
            ? new Date(profile.current_period_end) > new Date()
            : true;

        return isActive ? userPlan : "free";
    } catch (error) {
        console.error("[GET_USER_PLAN_ERROR]", error);
        return "free";
    }
}

// L'application est 100 % gratuite : tous les modules sont accessibles aux
// utilisateurs connectés. Réintroduire une vérification de plan ici le jour
// où une offre premium est lancée.
export async function checkModuleAccess(_moduleId: string) {
    return { hasAccess: true, effectivePlan: "free" };
}
