"use server";

import { auth } from "@clerk/nextjs/server";
import { LESSONS_DATA, Lesson } from "@/app/lib/lessons-data";
import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import { getParentProfile } from "./child";

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

        // Vérifier si la leçon est terminée (on utilise parent.id qui est le UUID)
        const { data: progress } = await supabaseAdmin
            .from("user_progress")
            .select("completed_at")
            .eq("user_id", parent.id)
            .eq("lesson_id", lessonId)
            .single();

        return { success: true, lesson, isCompleted: !!progress };

    } catch (error) {
        console.error("[GET_LESSON_FATAL]", error);
        return { success: false, error: "server_error" };
    }
}

export async function toggleLessonCompletion(lessonId: string) {
    try {
        const { userId } = await auth();
        if (!userId) return;

        const parent = await getParentProfile();
        if (!parent) return;

        // Check if already completed
        const { data: existing } = await supabaseAdmin
            .from("user_progress")
            .select("lesson_id")
            .eq("user_id", parent.id)
            .eq("lesson_id", lessonId)
            .single();

        if (existing) {
            await supabaseAdmin
                .from("user_progress")
                .delete()
                .eq("user_id", parent.id)
                .eq("lesson_id", lessonId);
        } else {
            await supabaseAdmin
                .from("user_progress")
                .insert({ user_id: parent.id, lesson_id: lessonId });
        }

        revalidatePath(`/lessons/${lessonId}`);
        revalidatePath("/formation");
        revalidatePath("/dashboard");
    } catch (error) {
        console.error("[TOGGLE_LESSON_COMPLETION_ERROR]", error);
    }
}

export async function getUserProgress() {
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
