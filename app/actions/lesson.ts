"use server";

import { auth } from "@clerk/nextjs/server";
import { LESSONS_DATA, Lesson } from "@/app/lib/lessons-data";
import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import { getParentProfile } from "./child";
import type { UserProgressRow } from "@/app/types/db";

export type GetLessonResult =
    | { success: true; lesson: Lesson; isCompleted: boolean }
    | { success: false; error: "unauthorized" | "forbidden" | "not_found" | "server_error"; requiredTier?: string };

export async function getLesson(lessonId: string): Promise<GetLessonResult> {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "unauthorized" };

        const parent = await getParentProfile();
        if (!parent) return { success: false, error: "server_error" };

        const lesson = LESSONS_DATA[lessonId];
        if (!lesson) return { success: false, error: "not_found" };

        const { data: progress } = await supabaseAdmin
            .from("user_progress")
            .select("completed_at")
            .eq("user_id", parent.id)
            .eq("lesson_id", lessonId)
            .maybeSingle();

        return { success: true, lesson, isCompleted: !!progress };

    } catch (error) {
        console.error("[GET_LESSON_FATAL]", error);
        return { success: false, error: "server_error" };
    }
}

// Bascule l'état de complétion d'une leçon (ids "m0-intro", "m2-3"…).
export async function toggleLessonCompletion(lessonId: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, isCompleted: false };

        const parent = await getParentProfile();
        if (!parent) return { success: false, isCompleted: false };

        const { data: existing } = await supabaseAdmin
            .from("user_progress")
            .select("lesson_id")
            .eq("user_id", parent.id)
            .eq("lesson_id", lessonId)
            .maybeSingle();

        if (existing) {
            await supabaseAdmin
                .from("user_progress")
                .delete()
                .eq("user_id", parent.id)
                .eq("lesson_id", lessonId);
        } else {
            await supabaseAdmin
                .from("user_progress")
                .upsert(
                    { user_id: parent.id, lesson_id: lessonId },
                    { onConflict: "user_id,lesson_id", ignoreDuplicates: true }
                );
        }

        revalidatePath("/formation");
        revalidatePath("/dashboard");

        return { success: true, isCompleted: !existing };
    } catch (error) {
        console.error("[TOGGLE_LESSON_COMPLETION_ERROR]", error);
        return { success: false, isCompleted: false };
    }
}

export async function getUserProgress(): Promise<UserProgressRow[]> {
    try {
        const { userId } = await auth();
        if (!userId) return [];

        const parent = await getParentProfile();
        if (!parent) return [];

        const { data, error } = await supabaseAdmin
            .from("user_progress")
            .select("lesson_id, completed_at")
            .eq("user_id", parent.id);

        if (error) {
            console.error("[GET_USER_PROGRESS_ERROR]", error);
            return [];
        }

        return data;
    } catch (error) {
        console.error("[GET_USER_PROGRESS_FATAL]", error);
        return [];
    }
}
