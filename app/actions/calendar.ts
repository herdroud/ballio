"use server";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import { getChildProfile } from "./child";
import type { PlannedMatchRow } from "@/app/types/db";

// Calendrier des matchs planifiés (table `planned_matches`, cf. supabase/migrations).
// Toutes les actions passent par l'enfant du parent connecté : pas d'accès croisé possible.

export type PlannedMatchStatus = PlannedMatchRow["status"];

export async function getPlannedMatches(): Promise<PlannedMatchRow[]> {
    try {
        const child = await getChildProfile();
        if (!child) return [];

        const { data, error } = await supabaseAdmin
            .from("planned_matches")
            .select("*")
            .eq("child_id", child.id)
            .order("match_date", { ascending: true });

        if (error) {
            console.error("[GET_PLANNED_MATCHES_ERROR]", error);
            return [];
        }
        return data || [];
    } catch (error) {
        console.error("[GET_PLANNED_MATCHES_FATAL]", error);
        return [];
    }
}

// Prochain match à venir (pour la carte "Prochain match" du dashboard).
export async function getNextPlannedMatch(): Promise<PlannedMatchRow | null> {
    try {
        const child = await getChildProfile();
        if (!child) return null;

        const today = new Date().toISOString().split("T")[0];
        const { data, error } = await supabaseAdmin
            .from("planned_matches")
            .select("*")
            .eq("child_id", child.id)
            .eq("status", "upcoming")
            .gte("match_date", today)
            .order("match_date", { ascending: true })
            .limit(1)
            .maybeSingle();

        if (error) {
            console.error("[GET_NEXT_PLANNED_MATCH_ERROR]", error);
            return null;
        }
        return data;
    } catch (error) {
        console.error("[GET_NEXT_PLANNED_MATCH_FATAL]", error);
        return null;
    }
}

export async function addPlannedMatch(input: {
    opponent: string;
    match_date: string;
    match_time: string;
    location: "Domicile" | "Extérieur";
}) {
    try {
        const child = await getChildProfile();
        if (!child) return { success: false, error: "Complétez d'abord le profil de votre enfant." };

        const opponent = input.opponent.trim();
        if (!opponent || !input.match_date) {
            return { success: false, error: "Adversaire et date sont requis." };
        }

        const { data, error } = await supabaseAdmin
            .from("planned_matches")
            .insert({
                child_id: child.id,
                opponent,
                match_date: input.match_date,
                match_time: input.match_time || null,
                location: input.location,
                status: "upcoming",
            })
            .select()
            .single();

        if (error) throw error;

        revalidatePath("/calendrier");
        revalidatePath("/dashboard");
        return { success: true, data };
    } catch (error) {
        console.error("[ADD_PLANNED_MATCH_ERROR]", error);
        return { success: false, error: "Erreur lors de l'ajout du match." };
    }
}

export async function updatePlannedMatchStatus(matchId: string, status: PlannedMatchStatus) {
    try {
        const child = await getChildProfile();
        if (!child) return { success: false, error: "Accès refusé." };

        const { error } = await supabaseAdmin
            .from("planned_matches")
            .update({ status })
            .eq("id", matchId)
            .eq("child_id", child.id);

        if (error) throw error;

        revalidatePath("/calendrier");
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("[UPDATE_PLANNED_MATCH_ERROR]", error);
        return { success: false, error: "Erreur lors de la mise à jour." };
    }
}

export async function deletePlannedMatch(matchId: string) {
    try {
        const child = await getChildProfile();
        if (!child) return { success: false, error: "Accès refusé." };

        const { error } = await supabaseAdmin
            .from("planned_matches")
            .delete()
            .eq("id", matchId)
            .eq("child_id", child.id);

        if (error) throw error;

        revalidatePath("/calendrier");
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("[DELETE_PLANNED_MATCH_ERROR]", error);
        return { success: false, error: "Erreur lors de la suppression." };
    }
}
