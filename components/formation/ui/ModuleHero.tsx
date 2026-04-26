import React from "react";
import { cn } from "@/lib/utils";

export function ModuleHero({
    num,
    title,
    highlight,
    lead,
    stats,
}: {
    num: string;
    title: string;
    highlight?: string;
    lead: React.ReactNode;
    stats?: { num: string; text: React.ReactNode };
}) {
    return (
        <div className="bg-white px-8 md:px-16 py-16 md:py-24 border-b border-gray-100 rounded-b-[32px] shadow-[0_12px_32px_rgba(0,0,0,0.015)] mb-10 w-full">
            <div className="max-w-[860px] mx-auto">
                <div className="text-loo-green-600 font-bold uppercase tracking-widest text-[11px] mb-6 font-sans">
                    Module {num}
                </div>

                <h1 className="text-gray-900 font-black text-5xl md:text-7xl leading-[1.05] tracking-tighter mb-8 font-sans">
                    {title} <br />
                    {highlight && <span className="text-loo-green-600">{highlight}</span>}
                </h1>

                <p className="text-gray-600 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mb-12">
                    {lead}
                </p>

                {stats && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6 max-w-3xl">
                        <div className="text-loo-green-600 font-black text-5xl md:text-6xl tracking-tighter">
                            {stats.num}
                        </div>
                        <div className="text-gray-700 text-base md:text-lg">
                            {stats.text}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
