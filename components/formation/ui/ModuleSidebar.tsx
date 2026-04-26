import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";

type SubModule = {
    id: string;
    title: string;
    slug: string;
    status: "locked" | "current" | "completed";
};

type ModuleNav = {
    moduleId: string;
    moduleTitle: string;
    subModules: SubModule[];
};

export function ModuleSidebar({ nav }: { nav: ModuleNav }) {
    return (
        <div className="w-80 shrink-0 border-r border-gray-200 bg-gray-50/50 min-h-[calc(100vh-64px)] hidden lg:block sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto">
            <div className="p-6">
                <Link
                    href="/formation"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-loo-green-600 transition-colors mb-8 no-underline"
                >
                    <span className="text-lg leading-none">←</span> Retour aux formations
                </Link>

                <h3 className="font-black text-gray-900 text-xl tracking-tight mb-6 font-sans">
                    {nav.moduleTitle}
                </h3>

                <div className="flex flex-col gap-1">
                    {nav.subModules.map((sub, index) => {
                        const isCompleted = sub.status === "completed";
                        const isCurrent = sub.status === "current";
                        const isLocked = sub.status === "locked";

                        return (
                            <Link
                                key={sub.id}
                                href={`/formation/${nav.moduleId}/${sub.slug}`}
                                className={cn(
                                    "flex items-start gap-3 p-3 rounded-xl transition-all no-underline group",
                                    isCurrent ? "bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-gray-100" : "hover:bg-gray-100/80",
                                    isLocked && "opacity-50 pointer-events-none"
                                )}
                            >
                                <div className="mt-0.5 shrink-0">
                                    {isCompleted ? (
                                        <CheckCircle2 className="w-5 h-5 text-loo-green-500" />
                                    ) : isCurrent ? (
                                        <PlayCircle className="w-5 h-5 text-loo-green-600 fill-loo-green-50" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-gray-300" />
                                    )}
                                </div>
                                <div>
                                    <div className={cn(
                                        "font-semibold text-[14px] leading-snug font-sans transition-colors",
                                        isCurrent ? "text-loo-green-700" : "text-gray-700 group-hover:text-gray-900"
                                    )}>
                                        <span className="text-gray-400 mr-2 text-xs font-bold tracking-widest">{index + 1}</span>
                                        {sub.title}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
