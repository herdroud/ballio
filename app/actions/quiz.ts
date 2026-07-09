"use server";

import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { currentUser } from "@clerk/nextjs/server";

// Sauvegarde du résultat du diagnostic parental sur le profil de l'utilisateur connecté.
// Remplace les écritures Supabase directes depuis le client (quiz + dashboard).

export async function saveQuizResult(score: number, profileType: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Not authenticated" };

        if (!Number.isFinite(score) || score < 0 || score > 50) {
            return { success: false, error: "Score invalide." };
        }

        const user = await currentUser();

        const { error } = await supabaseAdmin
            .from("profiles")
            .upsert({
                user_id: userId,
                email: user?.primaryEmailAddress?.emailAddress,
                quiz_score: Math.round(score),
                parent_profile: profileType,
                updated_at: new Date().toISOString(),
            }, { onConflict: "user_id" });

        if (error) throw error;

        return { success: true };
    } catch (error) {
        console.error("[SAVE_QUIZ_RESULT_ERROR]", error);
        return { success: false, error: "Impossible de sauvegarder le résultat." };
    }
}
