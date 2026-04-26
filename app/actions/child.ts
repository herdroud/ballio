"use server";

import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function getChildProfile() {
    try {
        const { userId } = await auth();
        if (!userId) return null;

        // Resolve Parent ID (UUID)
        const parent = await getParentProfile();
        if (!parent) return null;

        const { data, error } = await supabaseAdmin
            .from("children")
            .select("*")
            .eq("parent_id", parent.id)
            .single();

        if (error) {
            // It's normal if no child exists before bootstrap or settings save
            return null;
        }

        return data;
    } catch (error) {
        console.error("[GET_CHILD_PROFILE_ERROR]", error);
        return null;
    }
}

export async function getParentProfile() {
    try {
        const { userId } = await auth();
        if (!userId) return null;

        const { data, error } = await supabaseAdmin
            .from("profiles")
            .select("*")
            .eq("user_id", userId)
            .single();

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

export async function ensureUserExists() {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Not authenticated" };

        // 1. Ensure Parent exists
        let { data: parent, error: parentError } = await supabaseAdmin
            .from("profiles")
            .select("id")
            .eq("user_id", userId)
            .single();

        if (!parent) {
            const { data: newParent, error: createParentError } = await supabaseAdmin
                .from("profiles")
                .insert({ user_id: userId, full_name: 'Parent' })
                .select("id")
                .single();

            if (createParentError) throw createParentError;
            parent = newParent;
        }

        // 2. Ensure Child exists
        const { data: child, error: childError } = await supabaseAdmin
            .from("children")
            .select("id")
            .eq("parent_id", parent.id)
            .single();

        if (!child) {
            const { error: createChildError } = await supabaseAdmin
                .from("children")
                .insert({
                    parent_id: parent.id,
                    first_name: "Prénom",
                    last_name: "Joueur",
                    club_name: "Mon Club",
                    position: "MC",
                    category: "U12",
                    updated_at: new Date().toISOString()
                });

            if (createChildError) throw createChildError;
        }

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
            }, { onConflict: 'user_id' })
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

        // Resolve Parent ID (UUID)
        const parent = await getParentProfile();
        if (!parent) throw new Error("Parent profile not found");

        // On vérifie d'abord si l'enfant existe déjà
        const { data: existingChild } = await supabaseAdmin
            .from("children")
            .select("id")
            .eq("parent_id", parent.id)
            .single();

        if (existingChild) {
            // Mise à jour
            const { error } = await supabaseAdmin
                .from("children")
                .update({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    birth_date: formData.birthDate,
                    club_name: formData.clubName,
                    position: formData.position,
                    category: formData.category,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", existingChild.id);

            if (error) throw error;
        } else {
            // Création
            const { error } = await supabaseAdmin
                .from("children")
                .insert({
                    parent_id: parent.id,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    birth_date: formData.birthDate,
                    club_name: formData.clubName,
                    position: formData.position,
                    category: formData.category,
                });

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

export async function getChildById(childId: string) {
    try {
        const { userId } = await auth();
        if (!userId) return null;

        const { data, error } = await supabaseAdmin
            .from("children")
            .select("*")
            .eq("id", childId)
            .single();

        if (error) {
            console.error("[GET_CHILD_BY_ID_ERROR]", error);
            return null;
        }

        return data;
    } catch (error) {
        console.error("[GET_CHILD_BY_ID_FATAL]", error);
        return null;
    }
}

export async function getChildMatches(childId: string) {
    try {
        const { userId } = await auth();
        if (!userId) return [];

        const { data, error } = await supabaseAdmin
            .from("matches")
            .select(`
                *,
                match_metrics (*)
            `)
            .eq("child_id", childId)
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
        const { userId } = await auth();
        if (!userId) return null;

        // Nombre de matchs cette saison (simulé par count sur la table matches)
        const { count: matchCount, error: matchError } = await supabaseAdmin
            .from("matches")
            .select("*", { count: "exact", head: true })
            .eq("child_id", childId);

        // Nombre de semaines de suivi (simulé par count distinct de semaines dans child_wellbeing)
        const { count: wellbeingCount, error: wellbeingError } = await supabaseAdmin
            .from("child_wellbeing")
            .select("*", { count: "exact", head: true })
            .eq("child_id", childId);

        return {
            matchCount: matchCount || 0,
            wellbeingWeeks: Math.ceil((wellbeingCount || 0) / 7) || 0,
        };
    } catch (error) {
        console.error("[GET_CHILD_STATS_ERROR]", error);
        return { matchCount: 0, wellbeingWeeks: 0 };
    }
}

export async function saveMatch(matchData: {
    child_id: string;
    opponent: string;
    competition: string;
    date: string;
    minutesPlayed?: number;
    score?: string;
    result?: 'victoire' | 'défaite' | 'nul';
    metrics: {
        ovr: number;
        tir: number;
        pas: number;
        dri: number;
        def: number;
        phy: number;
        disc: number;
    };
    events: any[]; // Array of raw match events
}) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("User not authenticated");

        // 1. Insert into matches with all summary stats
        const { data: match, error: matchError } = await supabaseAdmin
            .from("matches")
            .insert({
                child_id: matchData.child_id,
                opponent: matchData.opponent,
                match_date: matchData.date,
                minutes_played: matchData.minutesPlayed || 0,
                score: matchData.score,
                result: matchData.result,
                notes: `Note OVR: ${matchData.metrics.ovr}`,
                // New summary columns
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

        // 2. Insert ALL individual events into match_metrics
        if (matchData.events && matchData.events.length > 0) {
            const eventRows = matchData.events.map(ev => ({
                match_id: match.id,
                metric_name: ev.label, // Fallback for old chart compatibility if needed
                value: 1,
                action_type: ev.short, // 'Pok', 'But', etc.
                outcome: ev.short.endsWith('ko') ? 'fail' : 'success', // Logic heuristic
                half: ev.half,
                match_time: ev.elapsed,
            }));

            const { error: eventsError } = await supabaseAdmin
                .from("match_metrics")
                .insert(eventRows);

            if (eventsError) throw eventsError;
        }

        revalidatePath("/dashboard");
        revalidatePath(`/profile/${matchData.child_id}`);

        return { success: true, data: match };
    } catch (error) {
        console.error("[SAVE_MATCH_ERROR]", error);
        return { success: false, error: "Erreur lors de la sauvegarde du match." };
    }
}

export async function saveWellbeing(data: {
    child_id: string;
    mood: number;
    sleep: number;
    fatigue: number;
    muscle_pain: number;
}) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("User not authenticated");

        const normalizedMood = data.mood === 1 ? 1 : data.mood === 2 ? 3 : 5;
        const normalizedSleep = data.sleep === 4 ? 5 : data.sleep === 3 ? 4 : data.sleep === 2 ? 2 : 1;
        const normalizedFatigue = data.fatigue === 4 ? 5 : data.fatigue === 3 ? 4 : data.fatigue === 2 ? 2 : 1;

        const { error } = await supabaseAdmin
            .from("child_wellbeing")
            .upsert({
                child_id: data.child_id,
                checkin_date: new Date().toISOString().split('T')[0],
                mood_score: normalizedMood,
                sleep_quality: normalizedSleep,
                energy_level: normalizedFatigue,
                physical_pain: data.muscle_pain < 3,
                confidence_level: 3,
                stress_level: 3,
            }, { onConflict: 'child_id,checkin_date' });

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
        const { userId } = await auth();
        if (!userId) return { hasCheckedIn: false };

        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabaseAdmin
            .from("child_wellbeing")
            .select("id")
            .eq("child_id", childId)
            .eq("checkin_date", today)
            .maybeSingle();

        if (error) throw error;
        return { hasCheckedIn: !!data };
    } catch (error) {
        console.error("[GET_DAILY_CHECKIN_STATUS_ERROR]", error);
        return { hasCheckedIn: false };
    }
}
