"use server";

import { supabaseAdmin } from "@/app/lib/supabase-admin";

// Capture des e-mails de la landing page (table `leads`, cf. supabase/migrations).
// Action publique : appelée par des visiteurs non authentifiés.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function saveLead(email: string, source: string) {
    try {
        const cleaned = email.trim().toLowerCase();
        if (!EMAIL_REGEX.test(cleaned) || cleaned.length > 254) {
            return { success: false, error: "Adresse e-mail invalide." };
        }

        const { error } = await supabaseAdmin
            .from("leads")
            .upsert(
                { email: cleaned, source },
                { onConflict: "email", ignoreDuplicates: true }
            );

        if (error) throw error;

        return { success: true };
    } catch (error) {
        console.error("[SAVE_LEAD_ERROR]", error);
        return { success: false, error: "Une erreur est survenue. Réessayez." };
    }
}
