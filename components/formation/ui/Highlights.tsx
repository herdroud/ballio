import React from "react";
import { cn } from "@/lib/utils";

/**
 * Encadré "Règle d'or"
 */
export function RuleBox({
    title = "Règle d'or",
    children,
    className,
}: {
    title?: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "bg-white border border-loo-green-100 rounded-3xl p-8 md:p-12 shadow-[0_12px_32px_rgba(22,100,60,0.04)] my-14 relative",
                className
            )}
        >
            <div className="inline-block bg-loo-green-50 text-loo-green-700 font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-lg mb-6 font-sans">
                ⚡ {title}
            </div>
            <div className="text-gray-900 font-bold text-2xl md:text-3xl leading-snug tracking-tight font-sans">
                {children}
            </div>
        </div>
    );
}

/**
 * Encadré "Science/Cerveau"
 */
export function ScienceBox({
    title,
    children,
    className,
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "bg-white border border-gray-200 border-l-4 border-l-blue-500 rounded-2xl p-8 shadow-sm my-12",
                className
            )}
        >
            <div className="text-blue-600 font-bold text-xs uppercase tracking-wider mb-4 font-sans flex items-center gap-2">
                <span>🧠</span> {title}
            </div>
            <div className="text-gray-600 text-[16px] leading-relaxed">
                {children}
            </div>
        </div>
    );
}
