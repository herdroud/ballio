"use client";

import Link from "next/link";
import { FORMATION_CONFIG } from "@/app/lib/formation-config";

const MODULES = FORMATION_CONFIG.map(m => ({
    id: m.id,
    num: m.num,
    title: m.title,
    sub: m.subtitle,
    objective: m.objective,
    duration: m.duration,
    lessons: m.lessons.length,
    tools: m.toolsCount,
}));

const STATE_CONFIG = {
    done: {
        badge: "✓ Terminé",
        badgeCls: "bg-emerald-100 text-emerald-700",
        numBg: "bg-loo-green-500 text-white",
        border: "border-emerald-200",
        ring: "",
        cta: "Revoir",
        ctaCls: "bg-loo-green-50 text-loo-green-700 hover:bg-loo-green-100",
    },
    active: {
        badge: "▶ En cours",
        badgeCls: "bg-loo-green-700 text-white",
        numBg: "bg-loo-green-700 text-white",
        border: "border-loo-green-400",
        ring: "shadow-[0_0_0_3px_rgba(50,163,91,0.12)]",
        cta: "Continuer",
        ctaCls: "bg-loo-green-600 text-white hover:bg-loo-green-700 shadow-sm",
    },
    locked: {
        badge: "🔒 Verrouillé",
        badgeCls: "bg-gray-100 text-gray-400",
        numBg: "bg-gray-100 text-gray-400",
        border: "border-gray-200",
        ring: "",
        cta: "",
        ctaCls: "",
    },
};

type ModuleState = keyof typeof STATE_CONFIG;

export default function ModuleAccordion({
    completedModuleIds = [],
    completedLessonIds = []
}: {
    completedModuleIds?: string[];
    completedLessonIds?: string[];
}) {
    const effectiveModules = MODULES.map((m, index) => {
        const isDone = completedModuleIds.includes(m.id);
        const isActive = !isDone && (index === 0 || completedModuleIds.includes(MODULES[index - 1].id));
        const state: ModuleState = isDone ? "done" : (isActive ? "active" : "locked");

        // Progression réelle : leçons complétées / leçons du module.
        const moduleConfig = FORMATION_CONFIG[index];
        const doneLessons = moduleConfig.lessons.filter(
            l => completedLessonIds.includes(`${m.id}-${l.id}`)
        ).length;
        const progress = isDone
            ? 100
            : Math.round((doneLessons / moduleConfig.lessons.length) * 100);

        return { ...m, state, progress };
    });

    return (
        <div className="flex flex-col gap-3 mb-6">
            {effectiveModules.map((mod) => {
                const cfg = STATE_CONFIG[mod.state];
                const isLocked = mod.state === "locked";
                const isDimmed = isLocked;

                return (
                    <div
                        key={mod.id}
                        className={`bg-white rounded-2xl border-[1.5px] overflow-hidden transition-all duration-200 ${cfg.border} ${cfg.ring} ${isDimmed ? "opacity-60" : "hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] hover:-translate-y-px"}`}
                    >
                        <div className="flex items-start gap-3.5 p-4 min-[480px]:p-5">
                            {/* Numéro */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0 mt-0.5 ${cfg.numBg}`}>
                                {mod.state === "done" ? "✓" : mod.num}
                            </div>

                            {/* Contenu */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1 mb-1">
                                    <div>
                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Module {mod.num}</span>
                                        <h3 className="text-[14px] font-extrabold text-gray-900 leading-tight">{mod.title}</h3>
                                        <p className="text-[12px] text-gray-400 mt-0.5">{mod.sub}</p>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 ${cfg.badgeCls}`}>
                                        {cfg.badge}
                                    </span>
                                </div>

                                {/* Objective */}
                                {!isLocked && (
                                    <p className="text-[12.5px] text-gray-500 leading-relaxed mt-2 mb-3 line-clamp-2">
                                        {mod.objective}
                                    </p>
                                )}

                                {/* Stats row */}
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-[11px] text-gray-400 flex items-center gap-1">⏱ {mod.duration}</span>
                                    <span className="text-[11px] text-gray-400 flex items-center gap-1">📹 {mod.lessons} leçons</span>
                                    <span className="text-[11px] text-gray-400 flex items-center gap-1">🛠 {mod.tools} outils</span>
                                    {mod.progress !== undefined && (
                                        <span className={`text-[11px] font-bold ${mod.progress === 100 ? "text-loo-green-600" : "text-loo-green-500"}`}>
                                            {mod.progress === 100 ? "✓ Complété" : `${mod.progress}% fait`}
                                        </span>
                                    )}
                                </div>

                                {/* Progress bar for active module */}
                                {mod.state === "active" && mod.progress !== undefined && mod.progress > 0 && (
                                    <div className="mt-2.5 bg-gray-100 rounded-full h-[4px] overflow-hidden">
                                        <div
                                            className="h-full bg-loo-green-500 rounded-full transition-all"
                                            style={{ width: `${mod.progress}%` }}
                                        />
                                    </div>
                                )}

                                {/* CTA */}
                                {cfg.cta && !isLocked && (
                                    <Link href={`/formation/${mod.id}`} className="no-underline block mt-3">
                                        <button
                                            className={`w-full py-2.5 rounded-xl text-[13px] font-bold border-none cursor-pointer transition-all ${cfg.ctaCls}`}
                                        >
                                            {mod.state === "active" ? "▶ " : ""}
                                            {cfg.cta} — {mod.title}
                                        </button>
                                    </Link>
                                )}

                                {/* Locked message */}
                                {isLocked && (
                                    <p className="text-[11.5px] text-gray-400 mt-2 italic">
                                        Terminez le module précédent pour débloquer ce contenu.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
