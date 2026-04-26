"use client";

import { useEffect, useRef } from "react";

interface FormationHeroProps {
    completedCount?: number;
    totalCount?: number;
}

export default function FormationHero({ completedCount = 0, totalCount = 7 }: FormationHeroProps) {
    const progRef = useRef<HTMLDivElement>(null);
    const percentage = Math.round((completedCount / totalCount) * 100);

    useEffect(() => {
        const t = setTimeout(() => {
            if (progRef.current) progRef.current.style.width = `${percentage}%`;
        }, 200);
        return () => clearTimeout(t);
    }, [percentage]);

    return (
        <div className="relative bg-gradient-to-r from-loo-green-900 to-loo-green-800 rounded-2xl overflow-hidden mb-6 p-5 min-[640px]:p-6">
            {/* Déco */}
            <div className="absolute -right-8 -top-8 w-52 h-52 rounded-full bg-white/[0.03] pointer-events-none" />
            <div className="absolute right-4 bottom-4 text-[80px] leading-none text-white/[0.04] pointer-events-none select-none font-black">🎓</div>

            <div className="relative z-10 flex flex-col min-[640px]:flex-row min-[640px]:items-center gap-4">
                {/* Texte */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-[1.8px] text-white/35">Formation Parent</span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-loo-gold/20 text-loo-gold tracking-wide">★ 4.9 / 5</span>
                    </div>
                    <h1 className="text-[20px] min-[640px]:text-[22px] font-black text-white leading-tight tracking-tight">
                        Devenir le Manager de Talent<br className="hidden min-[640px]:block" /> de mon Enfant
                    </h1>
                    <p className="text-[12px] text-white/45 mt-1">7 modules · U6–U18 · 400 min de contenu · 18 outils PDF</p>
                </div>

                {/* Stats badges */}
                <div className="flex min-[640px]:flex-col gap-2 shrink-0">
                    <div className="flex items-center gap-1.5 bg-white/10 rounded-xl px-3 py-2">
                        <span className="text-lg font-black text-white">{completedCount}</span>
                        <span className="text-[10px] text-white/45 leading-tight">modules<br />terminés</span>
                    </div>
                </div>
            </div>

            {/* Progress */}
            <div className="relative z-10 mt-4">
                <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] text-white/35 font-medium">Progression globale</span>
                    <span className="text-[12px] font-bold text-loo-green-400">28%</span>
                </div>
                <div className="bg-white/[0.1] rounded-full h-[6px] overflow-hidden">
                    <div
                        ref={progRef}
                        className="h-full rounded-full bg-gradient-to-r from-loo-green-400 to-loo-green-500 transition-all duration-[1400ms] ease-out"
                        style={{ width: 0 }}
                    />
                </div>
            </div>
        </div>
    );
}
