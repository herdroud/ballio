"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/nextjs";

interface ScoreCardProps {
    childId?: string;
}

export default function ScoreCard({ childId }: ScoreCardProps) {
    const scoreRef = useRef<HTMLDivElement>(null);
    const { getToken, isLoaded } = useAuth();
    const [score, setScore] = useState(0);

    useEffect(() => {
        async function fetchScore() {
            if (!isLoaded || !childId) {
                setScore(87); // Default mock for demo
                return;
            }
            try {
                const token = await getToken({ template: "supabase" });
                const supabase = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    { global: { headers: { Authorization: `Bearer ${token}` } } }
                );

                const { data } = await supabase
                    .from('child_wellbeing')
                    .select('mood_score, sleep_score, fatigue_score')
                    .eq('child_id', childId)
                    .order('created_at', { ascending: false })
                    .limit(7);

                if (data && data.length > 0) {
                    const avg = data.reduce((acc, curr) => {
                        return acc + (curr.mood_score / 3 + curr.sleep_score / 4 + curr.fatigue_score / 4) / 3;
                    }, 0) / data.length;
                    setScore(Math.round(avg * 100));
                } else {
                    setScore(0);
                }
            } catch (err) {
                console.error(err);
                setScore(87);
            }
        }
        fetchScore();
    }, [childId, isLoaded, getToken]);

    useEffect(() => {
        const el = scoreRef.current;
        if (!el || score === 0) return;
        const target = score;
        let current = 0;
        const duration = 1000;
        const steps = 60;
        const increment = target / steps;
        const interval = duration / steps;

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
                <div className="text-[11px] text-white/30">Mise à jour réelle</div>
            </div>

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
                        {score > 70 ? '↑ État optimal' : score > 40 ? '→ État stable' : '↓ Vigilance requise'}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-px bg-white/[0.08] rounded-xl overflow-hidden">
                {[
                    { val: score > 80 ? "★★★★★" : score > 60 ? "★★★★☆" : "★★★☆☆", label: "Plaisir" },
                    { val: score > 70 ? "Élevée" : "Moyenne", label: "Motivation" },
                    { val: score > 50 ? "Normale" : "Élevée", label: "Fatigue" },
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
        </div>
    );
}
