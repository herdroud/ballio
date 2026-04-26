"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

import { FORMATION_CONFIG } from "@/app/lib/formation-config";

const STATUS_STYLES = {
    done: {
        row: "bg-green-50 border-green-200",
        num: "bg-loo-green-500 text-white text-base",
        chip: "bg-loo-green-100 text-emerald-800",
        chipText: "✓ Terminé"
    },
    active: {
        row: "bg-emerald-50 border-loo-green-400",
        num: "bg-loo-green-700 text-white",
        chip: "bg-loo-green-700 text-white",
        chipText: "En cours"
    },
    locked: {
        row: "opacity-45 cursor-not-allowed",
        num: "bg-gray-200 text-gray-400",
        chip: "bg-gray-100 text-gray-400",
        chipText: "🔒"
    },
};

export default function FormationProgress() {
    const { getToken, isLoaded: authLoaded } = useAuth();
    const [activeTab, setActiveTab] = useState(0);
    const [progress, setProgress] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const tabs = ["Progression", "Outils PDF", "Ressources"];

    useEffect(() => {
        async function fetchProgress() {
            if (!authLoaded) return;
            try {
                const token = await getToken({ template: "supabase" });
                const supabase = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    { global: { headers: { Authorization: `Bearer ${token}` } } }
                );

                const { data } = await supabase
                    .from("user_progress")
                    .select("lesson_id");

                if (data) {
                    // Extract unique module IDs from lesson IDs (assuming lesson IDs start with m1-, m2-, etc.)
                    const completedModules = Array.from(new Set(data.map(p => p.lesson_id.split('-')[0])));
                    setProgress(completedModules);
                }
            } catch (err) {
                console.error("Error fetching progress:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchProgress();
    }, [authLoaded, getToken]);

    const completedCount = progress.length;
    const progressPercent = Math.round((completedCount / 7) * 100);

    return (
        <div className="bg-white rounded-2xl p-5 min-[640px]:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="text-[17px] font-extrabold text-gray-800 tracking-tight">
                    Ma Formation
                </div>
                <Link
                    href="/formation"
                    className="text-[13px] font-semibold text-loo-green-600 hover:text-loo-green-700 no-underline"
                >
                    Tout voir →
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex gap-0.5 bg-gray-100 rounded-[9px] p-0.5 mb-4">
                {tabs.map((tab, i) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(i)}
                        className={`flex-1 py-[7px] rounded-[7px] text-[12px] font-semibold border-none cursor-pointer text-center transition-all ${activeTab === i
                            ? "bg-white text-gray-800 shadow-[0_1px_6px_rgba(0,0,0,0.09)]"
                            : "bg-transparent text-gray-400"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Progress bar */}
            <div>
                <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[12px] font-semibold text-gray-600">
                        Avancement global
                    </span>
                    <span className="text-[13px] font-bold text-loo-green-600">
                        {completedCount} / 7 modules
                    </span>
                </div>
                <div className="bg-gray-100 rounded-full h-[5px] overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-loo-green-500 to-loo-green-400 transition-all duration-1000"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>

            {/* Module list */}
            <div className="flex flex-col gap-[7px] mt-3.5">
                {loading ? (
                    <div className="h-20 bg-gray-50 animate-pulse rounded-xl" />
                ) : (
                    FORMATION_CONFIG.map((mod, index) => {
                        const isDone = progress.includes(mod.id);
                        const isActive = !isDone && (index === 0 || progress.includes(FORMATION_CONFIG[index - 1].id));
                        const status = isDone ? "done" : (isActive ? "active" : "locked");
                        const s = STATUS_STYLES[status];

                        return (
                            <Link
                                key={mod.id}
                                href={`/formation/${mod.id}`}
                                className={`flex items-center gap-3 py-3 px-3.5 rounded-[11px] border-[1.5px] border-transparent transition-all no-underline ${s.row} ${status !== "locked" ? "cursor-pointer hover:bg-gray-50" : "pointer-events-none"}`}
                            >
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 ${s.num}`}
                                >
                                    {status === "done" ? "✓" : mod.num}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[13px] font-bold text-gray-800 truncate">
                                        Module {mod.num} · {mod.title}
                                    </div>
                                    <div className="text-[11px] text-gray-400 truncate">
                                        {mod.subtitle}
                                    </div>
                                </div>
                                <span
                                    className={`text-[10px] font-bold px-[9px] py-0.5 rounded-full shrink-0 ${s.chip}`}
                                >
                                    {s.chipText}
                                </span>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
}
