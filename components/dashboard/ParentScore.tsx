import Link from "next/link";
import { getWeekNumber } from "@/lib/utils";

interface ParentScoreProps {
    hasCheckedIn: boolean;
    completedModuleCount: number;
    totalModuleCount: number;
    matchCount: number;
}

// Score Parent calculé sur trois critères réels :
// check-in du jour (30 pts), progression formation (40 pts), suivi de match (30 pts).
export default function ParentScore({
    hasCheckedIn,
    completedModuleCount,
    totalModuleCount,
    matchCount,
}: ParentScoreProps) {
    const formationRatio = totalModuleCount > 0 ? completedModuleCount / totalModuleCount : 0;
    const score = Math.round(
        (hasCheckedIn ? 30 : 0) +
        formationRatio * 40 +
        (matchCount > 0 ? 30 : 0)
    );

    const weekNum = getWeekNumber(new Date());

    // Cercle de progression (r=31 → circonférence ≈ 194.8)
    const circumference = 194.8;
    const dashOffset = circumference * (1 - score / 100);

    const criteria = [
        {
            done: hasCheckedIn,
            icon: hasCheckedIn ? "✅" : "⚠️",
            iconBg: hasCheckedIn ? "bg-emerald-100" : "bg-orange-50",
            label: "Check-in bien-être du jour",
            chip: hasCheckedIn ? "Fait" : "À faire",
            chipClass: hasCheckedIn ? "bg-loo-green-100 text-emerald-800" : "bg-loo-orange-light text-amber-800",
            href: "/checkin",
        },
        {
            done: formationRatio >= 1,
            icon: formationRatio >= 1 ? "✅" : formationRatio > 0 ? "⚠️" : "🔴",
            iconBg: formationRatio >= 1 ? "bg-emerald-100" : formationRatio > 0 ? "bg-orange-50" : "bg-red-50",
            label: "Formation parentale",
            chip: `${completedModuleCount}/${totalModuleCount} modules`,
            chipClass: formationRatio >= 1
                ? "bg-loo-green-100 text-emerald-800"
                : formationRatio > 0 ? "bg-loo-orange-light text-amber-800" : "bg-loo-red-light text-red-800",
            href: "/formation",
        },
        {
            done: matchCount > 0,
            icon: matchCount > 0 ? "✅" : "🔴",
            iconBg: matchCount > 0 ? "bg-emerald-100" : "bg-red-50",
            label: "Suivi de match cette saison",
            chip: matchCount > 0 ? `${matchCount} match${matchCount > 1 ? "s" : ""}` : "Aucun match",
            chipClass: matchCount > 0 ? "bg-loo-green-100 text-emerald-800" : "bg-loo-red-light text-red-800",
            href: "/match/live",
        },
    ];

    return (
        <div className="bg-white rounded-2xl p-5 min-[640px]:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3.5">
                🎯 Ton Score Parent · Semaine {weekNum}
            </div>

            {/* Header: Score + Ring */}
            <div className="flex items-start justify-between mb-4 min-[640px]:mb-5">
                <div>
                    <div className="text-5xl font-black tracking-tight leading-none text-gray-800">
                        {score}<span className="text-xl font-medium text-gray-400 tracking-normal">/100</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1">
                        Basé sur vos actions de la semaine
                    </div>
                    <div className="bg-gray-100 rounded-full h-[5px] overflow-hidden mt-2 w-40">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-loo-green-500 to-loo-green-400 transition-all duration-700"
                            style={{ width: `${score}%` }}
                        />
                    </div>
                </div>
                <div className="relative w-[78px] h-[78px] shrink-0">
                    <svg viewBox="0 0 78 78" width="78" height="78" className="-rotate-90">
                        <circle cx="39" cy="39" r="31" fill="none" stroke="#F3F4F6" strokeWidth="7" />
                        <circle
                            cx="39"
                            cy="39"
                            r="31"
                            fill="none"
                            stroke="#22764A"
                            strokeWidth="7"
                            strokeDasharray={circumference}
                            strokeDashoffset={dashOffset}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-lg font-extrabold text-gray-800 leading-none">{score}</span>
                        <span className="text-[9px] text-gray-400 mt-px">pts</span>
                    </div>
                </div>
            </div>

            {/* Criteria */}
            <div className="flex flex-col gap-2">
                {criteria.map((c) => (
                    <Link
                        key={c.label}
                        href={c.href}
                        className="flex items-center gap-3 py-2.5 px-3 rounded-[10px] bg-gray-50 hover:bg-gray-100 transition-colors no-underline"
                    >
                        <div
                            className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[13px] shrink-0 ${c.iconBg}`}
                        >
                            {c.icon}
                        </div>
                        <div className="flex-1 text-[13px] font-medium text-gray-700">
                            {c.label}
                        </div>
                        <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${c.chipClass}`}
                        >
                            {c.chip}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
