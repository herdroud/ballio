import React from "react";
import { cn } from "@/lib/utils";

/**
 * En-tête standard d'une leçon contenant le tag de la leçon et let titre.
 */
export function LessonHeader({
    num,
    title,
    hook,
    className,
}: {
    num: string;
    title: React.ReactNode;
    hook?: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("mb-12", className)}>
            <div className="inline-flex items-center gap-3 mb-5">
                <span className="bg-loo-green-50 text-loo-green-700 px-3 py-1.5 rounded-lg font-bold text-sm tracking-wide font-sans">
                    {num}
                </span>
                <div className="h-0.5 w-12 bg-loo-green-600 rounded-full" />
            </div>
            <h2 className="text-gray-900 text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-6 font-sans">
                {title}
            </h2>
            {hook && (
                <p className="text-gray-500 text-lg md:text-xl font-normal max-w-3xl mb-0">
                    {hook}
                </p>
            )}
        </div>
    );
}

/**
 * Conteneur de section principal
 */
export function LessonSection({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={cn(
                "bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 p-8 md:p-16 max-w-[860px] mx-auto my-8",
                className
            )}
        >
            {children}
        </section>
    );
}
