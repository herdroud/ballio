import React from "react";
import { cn } from "@/lib/utils";

/**
 * Composant de citation choc (inspiré du design SaaS)
 */
export function ChocQuote({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={cn(
                "bg-loo-green-50/50 text-gray-900 border-l-4 border-loo-green-600 rounded-lg rounded-l-none px-8 py-10 my-10 font-medium tracking-tight text-[1.3rem] leading-relaxed",
                className
            )}
        >
            {children}
        </div>
    );
}

/**
 * Utilisable pour mettre en évidence une portion de texte dans la citation choc (en vert)
 */
export function ChocText({ children }: { children: React.ReactNode }) {
    return <span className="text-loo-green-600 block mt-3 font-semibold text-xl">{children}</span>;
}
