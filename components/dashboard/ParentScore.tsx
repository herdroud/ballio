export default function ParentScore() {
    return (
        <div className="bg-white rounded-2xl p-5 min-[640px]:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3.5">
                🎯 Ton Score Parent · Semaine 22
            </div>

            {/* Header: Score + Ring */}
            <div className="flex items-start justify-between mb-4 min-[640px]:mb-5">
                <div>
                    <div className="text-5xl font-black tracking-tight leading-none text-gray-800">
                        72<span className="text-xl font-medium text-gray-400 tracking-normal">/100</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1">↑ +5 vs semaine dernière</div>
                    <div className="bg-gray-100 rounded-full h-[5px] overflow-hidden mt-2 w-40">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-loo-green-500 to-loo-green-400"
                            style={{ width: "72%" }}
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
                            strokeDasharray="194.8"
                            strokeDashoffset="54"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-lg font-extrabold text-gray-800 leading-none">72</span>
                        <span className="text-[9px] text-gray-400 mt-px">pts</span>
                    </div>
                </div>
            </div>

            {/* Criteria */}
            <div className="flex flex-col gap-2">
                {[
                    {
                        icon: "✅",
                        iconBg: "bg-emerald-100",
                        label: "Comportement bord terrain",
                        chip: "Maîtrisé",
                        chipClass: "bg-loo-green-100 text-emerald-800",
                    },
                    {
                        icon: "⚠️",
                        iconBg: "bg-orange-50",
                        label: "Debriefing après le match",
                        chip: "À améliorer",
                        chipClass: "bg-loo-orange-light text-amber-800",
                    },
                    {
                        icon: "🔴",
                        iconBg: "bg-red-50",
                        label: "Module de formation du mois",
                        chip: "Non complété",
                        chipClass: "bg-loo-red-light text-red-800",
                    },
                ].map((c) => (
                    <div
                        key={c.label}
                        className="flex items-center gap-3 py-2.5 px-3 rounded-[10px] bg-gray-50"
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
                    </div>
                ))}
            </div>
        </div>
    );
}
