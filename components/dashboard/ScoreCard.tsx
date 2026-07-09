"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { WellbeingRow } from "@/app/types/db";
import { computeWellbeingScore } from "@/app/lib/wellbeing";

interface ScoreCardProps {
    entries: WellbeingRow[];
}

// Indice "Bien-être Mental" calculé sur les check-ins des 7 derniers jours.
export default function ScoreCard({ entries }: ScoreCardProps) {
    const scoreRef = useRef<HTMLDivElement>(null);
    const score = computeWellbeingScore(entries);

    // Moyennes par dimension (1-5) pour les trois mini-indicateurs.
    const avg = (key: "mood_score" | "sleep_quality" | "energy_level") => {
        const vals = entries.map(e => e[key]).filter((v): v is number => v != null);
        if (vals.length === 0) return null;
        return vals.reduce((s, v) => s + v, 0) / vals.length;
    };
    const avgMood = avg("mood_score");
    const avgSleep = avg("sleep_quality");
    const avgEnergy = avg("energy_level");

    // Animation de compteur au montage / changement de score.
    useEffect(() => {
        const el = scoreRef.current;
        if (!el || score === null) return;
        const target = score;
        let current = 0;
        const steps = 60;
        const increment = target / steps;
        const interval = 1000 / steps;

        const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            el.textContent = String(Math.round(current));
            if (current >= target) clearInterval(timer);
        }, interval);
        return () => clearInterval(timer);
    }, [score]);

    return (
        <div className="bg-gradient-to-br from-loo-green-800 to-loo-green-900 rounded-2xl p-5 min-[640px]:p-6 shadow-lg relative overflow-hidden">
            <div className="absolute -bottom-20 -right-15 w-[260px] h-[260px] bg-loo-green-400/[0.07] rounded-full pointer-events-none" />

            <div className="flex items-center justify-between mb-4 min-[640px]:mb-5">
                <div className="inline-flex items-center gap-1.5 bg-loo-green-400/[0.18] text-loo-green-400 text-[10px] font-bold px-[11px] py-1 rounded-full uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-loo-green-400 shadow-[0_0_6px_theme(colors.loo-green-400)] animate-pulse" />
                    Bien-être Mental
                </div>
                <div className="text-[11px] text-white/30">7 derniers jours</div>
            </div>

            {score === null ? (
                <div className="py-4">
                    <div className="text-[15px] font-bold text-white mb-1.5">
                        Aucun check-in cette semaine
                    </div>
                    <p className="text-[13px] text-white/55 mb-4 leading-relaxed">
                        Faites un premier check-in pour suivre le bien-être mental de votre enfant.
                    </p>
                    <Link
                        href="/checkin"
                        className="inline-flex items-center gap-2 bg-loo-green-400/20 hover:bg-loo-green-400/30 text-loo-green-300 text-[13px] font-bold px-4 py-2.5 rounded-xl transition-colors no-underline"
                    >
                        ⚡ Lancer le check-in
                    </Link>
                </div>
            ) : (
                <>
                    <div className="flex items-end gap-3.5 mb-5">
                        <div
                            ref={scoreRef}
                            className="text-[56px] min-[640px]:text-[76px] font-black text-white leading-none tracking-[-4px]"
                        >
                            0
                        </div>
                        <div className="pb-2">
                            <div className="text-[13px] text-white/55 mb-2">
                                Indice global sur 100
                            </div>
                            <div className="inline-flex items-center gap-1 bg-loo-green-400/20 text-loo-green-400 text-[13px] font-bold px-3 py-1 rounded-full">
                                {score > 70 ? "↑ État optimal" : score > 40 ? "→ État stable" : "↓ Vigilance requise"}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-px bg-white/[0.08] rounded-xl overflow-hidden">
                        {[
                            {
                                val: avgMood === null ? "—" : avgMood >= 4 ? "★★★★★" : avgMood >= 3 ? "★★★★☆" : "★★★☆☆",
                                label: "Humeur",
                            },
                            {
                                val: avgSleep === null ? "—" : avgSleep >= 4 ? "Bon" : avgSleep >= 2.5 ? "Moyen" : "Fragile",
                                label: "Sommeil",
                            },
                            {
                                val: avgEnergy === null ? "—" : avgEnergy >= 4 ? "Élevée" : avgEnergy >= 2.5 ? "Normale" : "Basse",
                                label: "Énergie",
                            },
                        ].map((m) => (
                            <div
                                key={m.label}
                                className="bg-white/[0.05] py-3 min-[640px]:py-3.5 px-2 text-center"
                            >
                                <div className="text-[13px] min-[640px]:text-[15px] font-bold text-white mb-1">
                                    {m.val}
                                </div>
                                <div className="text-[9px] min-[640px]:text-[10px] text-white/[0.38] uppercase tracking-wide">
                                    {m.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
