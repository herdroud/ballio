"use client";

import { useTransition, useState } from "react";
import { toggleLessonCompletion } from "@/app/actions/lesson";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface LessonCompleteButtonProps {
    lessonId: string;
    initialIsCompleted: boolean;
}

export default function LessonCompleteButton({
    lessonId,
    initialIsCompleted,
}: LessonCompleteButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [isCompleted, setIsCompleted] = useState(initialIsCompleted);

    const handleToggle = () => {
        // Optimistic update
        const previousState = isCompleted;
        setIsCompleted(!isCompleted);

        startTransition(async () => {
            try {
                await toggleLessonCompletion(lessonId);
                toast.success(
                    !previousState
                        ? "Leçon terminée ! Bravo 🎉"
                        : "Leçon marquée comme non terminée."
                );
            } catch (error) {
                // Revert on error
                setIsCompleted(previousState);
                toast.error("Erreur lors de la mise à jour.");
                console.error(error);
            }
        });
    };

    return (
        <Button
            onClick={handleToggle}
            disabled={isPending}
            className={`w-full py-6 rounded-xl shadow-lg transition-all text-lg font-bold gap-2 ${isCompleted
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-white text-blue-600 hover:bg-blue-50"
                }`}
        >
            {isPending ? (
                <Loader2 className="animate-spin" />
            ) : isCompleted ? (
                <CheckCircle className="text-white" />
            ) : (
                <Circle className="text-blue-200" />
            )}
            {isCompleted ? "Terminée" : "Marquer comme terminée"}
        </Button>
    );
}
