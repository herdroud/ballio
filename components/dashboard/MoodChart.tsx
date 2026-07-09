"use client";

import React from "react";
import type { WellbeingRow } from "@/app/types/db";

const LEGEND = [
    { label: "Bien", color: "bg-loo-green-400" },
    { label: "Moyen", color: "bg-loo-orange" },
    { label: "Difficile", color: "bg-loo-red opacity-75" },
];

interface MoodChartProps {
    childName?: string;
    entries: WellbeingRow[];
}

// Humeur des 7 derniers jours, à partir des check-ins (mood_score sur 1-5).
export default function MoodChart({ childName = "joueur", entries }: MoodChartProps) {
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        // checkin_date est un DATE (YYYY-MM-DD) : comparaison sur la même forme.
        const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        const entry = entries.find(e => e.checkin_date === iso);
        return {
            dayLabel: days[d.getDay()],
            mood: entry?.mood_score ?? null,
        };
    });

    const bars = last7Days.map(d => ({
        day: d.dayLabel,
        height: d.mood ? `${(d.mood / 5) * 100}%` : "5%",
        color:
            d.mood == null ? "bg-gray-100"
                : d.mood >= 4 ? "bg-loo-green-500"
                    : d.mood >= 2.5 ? "bg-loo-orange"
                        : "bg-loo-red opacity-75",
    }));

    return (
        <div className="bg-white rounded-2xl p-5 min-[640px]:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <div className="text-[15px] font-extrabold text-gray-800 tracking-tight mb-3.5">
                Humeur de {childName} · 7 derniers jours
            </div>

            {/* Bars */}
            <div className="flex items-end gap-2 h-20 px-0.5">
                {bars.map((bar, i) => (
                    <div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
                    >
                        <div
                            className={`w-full max-w-[36px] rounded-t-md transition-all duration-500 ${bar.color}`}
                            style={{ height: bar.height }}
                        />
                        <div className="text-[10px] text-gray-400 font-semibold">
                            {bar.day}
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex gap-3.5 mt-3 flex-wrap">
                {LEGEND.map((l) => (
                    <div
                        key={l.label}
                        className="flex items-center gap-1.5 text-[11px] text-gray-400"
                    >
                        <div className={`w-2.5 h-2.5 rounded-sm ${l.color}`} />
                        {l.label}
                    </div>
                ))}
            </div>
        </div>
    );
}
