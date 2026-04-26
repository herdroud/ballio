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
            .single();

        const userPlan = profile?.subscription_status || "free";

        // Un plan est valide s'il n'a pas de date de fin OU si la date de fin est dans le futur
        const isActive = profile?.current_period_end
            ? new Date(profile.current_period_end) > new Date()
            : true; // Par défaut s'il n'a pas de date (comme pour free), c'est true. Mais en prod Stripe met une date pour starter/pro.

        return isActive ? userPlan : "free";
    } catch (error) {
        console.error("[GET_USER_PLAN_ERROR]", error);
        return "free";
    }
}

export async function checkModuleAccess(moduleId: string) {
    try {
        const isFree = moduleId === "m0";
        const effectivePlan = await getUserPlan();

        // Tout utilisateur connecté a désormais accès à tous les modules
        return { hasAccess: true, effectivePlan: "free" };
    } catch (error) {
        console.error("[CHECK_MODULE_ACCESS_ERROR]", error);
        return { hasAccess: false, effectivePlan: "free" };
    }
}
