"use server";

import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import type { Child, ParentProfile, MatchRow, WellbeingRow } from "@/app/types/db";
import type { MatchEvent } from "@/app/types/match";
import { normalizeCheckin, todayInParis, type CheckinAnswers } from "@/app/lib/wellbeing";

// ⚠️ SÉCURITÉ — ce fichier utilise supabaseAdmin (service role), qui contourne les
// règles RLS. Toute requête portant sur un enfant DOIT passer par requireOwnedChild()
// pour garantir que l'enfant appartient bien au parent connecté.

export async function getParentProfile(): Promise<ParentProfile | null> {
    try {
        const { userId } = await auth();
        if (!userId) return null;

        const { data, error } = await supabaseAdmin
            .from("profiles")
            .select("*")
            .eq("user_id", userId)
            .maybeSingle();

        if (error) {
            console.error("[GET_PARENT_PROFILE_ERROR]", error);
            return null;
        }

        return data;
    } catch (error) {
        console.error("[GET_PARENT_PROFILE_ERROR]", error);
        return null;
    }
}

export async function getChildProfile(): Promise<Child | null> {
    try {
        const parent = await getParentProfile();
        if (!parent) return null;

        const { data, error } = await supabaseAdmin
            .from("children")
            .select("*")
            .eq("parent_id", parent.id)
            .limit(1)
            .maybeSingle();

        if (error) {
            console.error("[GET_CHILD_PROFILE_ERROR]", error);
            return null;
        }

        return data;
    } catch (error) {
        console.error("[GET_CHILD_PROFILE_ERROR]", error);
        return null;
    }
}

// Renvoie l'enfant uniquement s'il appartient au parent connecté, sinon null.
async function requireOwnedChild(childId: string): Promise<Child | null> {
    const parent = await getParentProfile();
    if (!parent) return null;

    const { data, error } = await supabaseAdmin
        .from("children")
        .select("*")
        .eq("id", childId)
        .eq("parent_id", parent.id)
        .maybeSingle();

    if (error) {
        console.error("[REQUIRE_OWNED_CHILD_ERROR]", error);
        return null;
    }
    return data;
}

// Crée le profil parent s'il n'existe pas encore (bootstrap post-inscription).
// L'enfant n'est plus créé avec des valeurs placeholder : c'est le parcours
// Paramètres qui crée le vrai profil enfant.
export async function ensureUserExists() {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Not authenticated" };

        const { error } = await supabaseAdmin
            .from("profiles")
            .upsert(
                { user_id: userId },
                { onConflict: "user_id", ignoreDuplicates: true }
            );

        if (error) throw error;

        return { success: true };
    } catch (error) {
        console.error("[ENSURE_USER_EXISTS_ERROR]", error);
        return { success: false, error: "Initialization failed" };
    }
}

export async function updateParentProfile(formData: {
    fullName: string;
    email: string;
}) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("User not authenticated");

        const { data: profile, error } = await supabaseAdmin
            .from("profiles")
            .upsert({
                user_id: userId,
                full_name: formData.fullName,
                email: formData.email,
                updated_at: new Date().toISOString(),
            }, { onConflict: "user_id" })
            .select("id")
            .single();

        if (error) throw error;

        revalidatePath("/dashboard");
        revalidatePath("/parametres");

        return { success: true, id: profile.id };
    } catch (error) {
        console.error("[UPDATE_PARENT_PROFILE_ERROR]", error);
        return { success: false, error: "Une erreur est survenue lors de la mise à jour du profil parent." };
    }
}

export async function updateChildProfile(formData: {
    firstName: string;
    lastName: string;
    birthDate: string;
    clubName: string;
    position: string;
    category: string;
}) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("User not authenticated");

        // Le profil parent doit exister avant l'enfant (créé au besoin).
        await ensureUserExists();
        const parent = await getParentProfile();
        if (!parent) throw new Error("Parent profile not found");

        const { data: existingChild } = await supabaseAdmin
            .from("children")
            .select("id")
            .eq("parent_id", parent.id)
            .limit(1)
            .maybeSingle();

        const childData = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            birth_date: formData.birthDate,
            club_name: formData.clubName,
            position: formData.position,
            category: formData.category,
            updated_at: new Date().toISOString(),
        };

        if (existingChild) {
            const { error } = await supabaseAdmin
                .from("children")
                .update(childData)
                .eq("id", existingChild.id)
                .eq("parent_id", parent.id);

            if (error) throw error;
        } else {
            const { error } = await supabaseAdmin
                .from("children")
                .insert({ parent_id: parent.id, ...childData });

            if (error) throw error;
        }

        revalidatePath("/dashboard");
        revalidatePath("/profile/demo");

        return { success: true };
    } catch (error) {
        console.error("[UPDATE_CHILD_PROFILE_ERROR]", error);
        return { success: false, error: "Une erreur est survenue lors de la mise à jour du profil." };
    }
}

export async function getChildById(childId: string): Promise<Child | null> {
    try {
        return await requireOwnedChild(childId);
    } catch (error) {
        console.error("[GET_CHILD_BY_ID_FATAL]", error);
        return null;
    }
}

export async function getChildMatches(childId: string): Promise<MatchRow[]> {
    try {
        const child = await requireOwnedChild(childId);
        if (!child) return [];

        const { data, error } = await supabaseAdmin
            .from("matches")
            .select(`
                *,
                match_metrics (*)
            `)
            .eq("child_id", child.id)
            .order("match_date", { ascending: false });

        if (error) {
            console.error("[GET_CHILD_MATCHES_ERROR]", error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("[GET_CHILD_MATCHES_FATAL]", error);
        return [];
    }
}

export async function getChildStats(childId: string) {
    try {
        const child = await requireOwnedChild(childId);
        if (!child) return { matchCount: 0, wellbeingWeeks: 0 };

        const { count: matchCount } = await supabaseAdmin
            .from("matches")
            .select("*", { count: "exact", head: true })
            .eq("child_id", child.id);

        const { count: wellbeingCount } = await supabaseAdmin
            .from("child_wellbeing")
            .select("*", { count: "exact", head: true })
            .eq("child_id", child.id);

        return {
            matchCount: matchCount || 0,
            wellbeingWeeks: Math.ceil((wellbeingCount || 0) / 7) || 0,
        };
    } catch (error) {
        console.error("[GET_CHILD_STATS_ERROR]", error);
        return { matchCount: 0, wellbeingWeeks: 0 };
    }
}

// Entrées bien-être des 7 derniers jours (pour l'indice global et le graphique d'humeur).
export async function getWellbeingLast7Days(childId: string): Promise<WellbeingRow[]> {
    try {
        const child = await requireOwnedChild(childId);
        if (!child) return [];

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const { data, error } = await supabaseAdmin
            .from("child_wellbeing")
            .select("*")
            .eq("child_id", child.id)
            .gte("checkin_date", sevenDaysAgo.toISOString().split("T")[0])
            .order("checkin_date", { ascending: true });

        if (error) {
            console.error("[GET_WELLBEING_ERROR]", error);
            return [];
        }
        return data || [];
    } catch (error) {
        console.error("[GET_WELLBEING_FATAL]", error);
        return [];
    }
}

// Actions marquées "ko" ou manquées → outcome "fail" dans match_metrics.
const FAILED_ACTION_TYPES = new Set(["Pko", "Tho", "Dko", "Cko", "Tko", "Dul_ko"]);

export async function saveMatch(matchData: {
    child_id: string;
    opponent: string;
    competition: string;
    date: string;
    minutesPlayed?: number;
    score?: string;
    result?: "victoire" | "défaite" | "nul";
    metrics: {
        ovr: number;
        tir: number;
        pas: number;
        dri: number;
        def: number;
        phy: number;
        disc: number;
    };
    events: MatchEvent[];
}) {
    try {
        const child = await requireOwnedChild(matchData.child_id);
        if (!child) return { success: false, error: "Profil enfant introuvable ou accès refusé." };

        const { data: match, error: matchError } = await supabaseAdmin
            .from("matches")
            .insert({
                child_id: child.id,
                opponent: matchData.opponent,
                match_date: matchData.date,
                minutes_played: matchData.minutesPlayed || 0,
                score: matchData.score,
                result: matchData.result,
                notes: `Note OVR: ${matchData.metrics.ovr}`,
                rating_ovr: matchData.metrics.ovr,
                stat_tir: matchData.metrics.tir,
                stat_pas: matchData.metrics.pas,
                stat_dri: matchData.metrics.dri,
                stat_def: matchData.metrics.def,
                stat_phy: matchData.metrics.phy,
                stat_disc: matchData.metrics.disc,
            })
            .select()
            .single();

        if (matchError) throw matchError;

        if (matchData.events && matchData.events.length > 0) {
            const eventRows = matchData.events.map(ev => ({
                match_id: match.id,
                metric_name: ev.label,
                value: 1,
                action_type: ev.short,
                outcome: FAILED_ACTION_TYPES.has(ev.short) ? "fail" : "success",
                half: ev.half,
                match_time: ev.elapsed,
            }));

            const { error: eventsError } = await supabaseAdmin
                .from("match_metrics")
                .insert(eventRows);

            if (eventsError) throw eventsError;
        }

        revalidatePath("/dashboard");
        revalidatePath(`/profile/${child.id}`);

        return { success: true, data: match };
    } catch (error) {
        console.error("[SAVE_MATCH_ERROR]", error);
        return { success: false, error: "Erreur lors de la sauvegarde du match." };
    }
}

export async function saveWellbeing(data: CheckinAnswers & { child_id: string }) {
    try {
        const child = await requireOwnedChild(data.child_id);
        if (!child) return { success: false, error: "Profil enfant introuvable ou accès refusé." };

        const normalized = normalizeCheckin(data);

        const { error } = await supabaseAdmin
            .from("child_wellbeing")
            .upsert({
                child_id: child.id,
                checkin_date: todayInParis(),
                ...normalized,
                confidence_level: 3,
                stress_level: 3,
            }, { onConflict: "child_id,checkin_date" });

        if (error) throw error;

        revalidatePath("/dashboard");

        return { success: true };
    } catch (error) {
        console.error("[SAVE_WELLBEING_ERROR]", error);
        return { success: false, error: "Erreur lors de la sauvegarde du check-in." };
    }
}

export async function getDailyCheckinStatus(childId: string) {
    try {
        const child = await requireOwnedChild(childId);
        if (!child) return { hasCheckedIn: false };

        const { data, error } = await supabaseAdmin
            .from("child_wellbeing")
            .select("id")
            .eq("child_id", child.id)
            .eq("checkin_date", todayInParis())
            .maybeSingle();

        if (error) throw error;
        return { hasCheckedIn: !!data };
    } catch (error) {
        console.error("[GET_DAILY_CHECKIN_STATUS_ERROR]", error);
        return { hasCheckedIn: false };
    }
}
