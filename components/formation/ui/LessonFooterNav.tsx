"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, Circle, ArrowRight, Loader2 } from "lucide-react";
import { FORMATION_CONFIG, lessonProgressId } from "@/app/lib/formation-config";
import { toggleLessonCompletion, getUserProgress } from "@/app/actions/lesson";

// Barre de fin de leçon : marque la leçon comme terminée dans user_progress
// et propose la leçon suivante. Déduit la leçon courante depuis l'URL
// (/formation/<moduleId>/<lessonSlug>).
export default function LessonFooterNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [isCompleted, setIsCompleted] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [isPending, startTransition] = useTransition();

    const context = useMemo(() => {
        const parts = pathname.split("/").filter(Boolean); // ["formation", "m0", "1"]
        if (parts.length < 3 || parts[0] !== "formation") return null;
        const [, moduleId, lessonSlug] = parts;
        const mod = FORMATION_CONFIG.find(m => m.id === moduleId);
        if (!mod) return null;
        const lessonIndex = mod.lessons.findIndex(l => l.id === lessonSlug);
        if (lessonIndex === -1) return null;

        const progressId = lessonProgressId(mod.id, lessonSlug);
        const nextLesson = mod.lessons[lessonIndex + 1] ?? null;
        const modIndex = FORMATION_CONFIG.findIndex(m => m.id === mod.id);
        const nextModule = FORMATION_CONFIG[modIndex + 1] ?? null;

        return { mod, lesson: mod.lessons[lessonIndex], progressId, nextLesson, nextModule };
    }, [pathname]);

    useEffect(() => {
        if (!context) return;
        let cancelled = false;
        getUserProgress().then(rows => {
            if (!cancelled) {
                setIsCompleted(rows.some(r => r.lesson_id === context.progressId));
                setLoaded(true);
            }
        });
        return () => { cancelled = true; };
    }, [context]);

    if (!context) return null;

    const handleToggle = () => {
        const previous = isCompleted;
        setIsCompleted(!previous);
        startTransition(async () => {
            const result = await toggleLessonCompletion(context.progressId);
            if (!result.success) {
                setIsCompleted(previous);
                toast.error("Erreur lors de la mise à jour de la progression.");
                return;
            }
            if (result.isCompleted) {
                toast.success("Leçon terminée ! Bravo 🎉");
                if (context.nextLesson) {
                    router.push(`/formation/${context.nextLesson.slug}`);
                } else if (context.nextModule) {
                    router.push(`/formation/${context.nextModule.id}/${context.nextModule.lessons[0].id}`);
                }
            }
        });
    };

    return (
        <div className="max-w-[720px] mx-auto px-6 pb-16">
            <div className="border-t border-gray-200 pt-8 flex flex-col min-[500px]:flex-row items-stretch min-[500px]:items-center gap-3">
                <button
                    onClick={handleToggle}
                    disabled={isPending || !loaded}
                    className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl font-bold text-sm transition-all border-none cursor-pointer disabled:opacity-60 ${isCompleted
                        ? "bg-loo-green-100 text-loo-green-700 hover:bg-loo-green-200"
                        : "bg-loo-green-500 text-white hover:bg-loo-green-600 shadow-lg shadow-loo-green-500/20"
                        }`}
                >
                    {isPending ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : isCompleted ? (
                        <CheckCircle2 size={18} />
                    ) : (
                        <Circle size={18} />
                    )}
                    {isCompleted ? "Leçon terminée ✓" : "Marquer comme terminée"}
                </button>

                {context.nextLesson ? (
                    <Link
                        href={`/formation/${context.nextLesson.slug}`}
                        className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors no-underline"
                    >
                        Leçon suivante <ArrowRight size={16} />
                    </Link>
                ) : context.nextModule ? (
                    <Link
                        href={`/formation/${context.nextModule.id}/${context.nextModule.lessons[0].id}`}
                        className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors no-underline"
                    >
                        Module suivant <ArrowRight size={16} />
                    </Link>
                ) : (
                    <Link
                        href="/formation"
                        className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors no-underline"
                    >
                        Fin de la formation 🎉
                    </Link>
                )}
            </div>
        </div>
    );
}
