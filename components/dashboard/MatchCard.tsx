"use client";

import { useState } from "react";
import Link from "next/link";
import type { PlannedMatchRow } from "@/app/types/db";

interface MatchCardProps {
    childName?: string;
    nextMatch: PlannedMatchRow | null;
    clubName?: string | null;
}

// Prochain match planifié (depuis le calendrier). État vide si rien n'est prévu.
export default function MatchCard({ childName = "votre enfant", nextMatch, clubName }: MatchCardProps) {
    // Instant figé au montage : suffisant pour un décompte en jours.
    const [now] = useState(() => Date.now());

    if (!nextMatch) {
        return (
            <div className="bg-white rounded-2xl p-5 min-[640px]:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3.5">
                    📅 Prochain match
                </div>
                <div className="text-center py-6">
                    <div className="text-3xl mb-3">📅</div>
                    <div className="text-[14px] font-bold text-gray-700 mb-1">
                        Aucun match planifié
                    </div>
                    <p className="text-[12px] text-gray-400 mb-4">
                        Ajoutez le prochain match de {childName} pour préparer votre protocole avant-match.
                    </p>
                    <Link
                        href="/calendrier"
                        className="inline-flex items-center gap-2 bg-loo-green-50 text-loo-green-700 text-[12px] font-bold px-4 py-2 rounded-lg hover:bg-loo-green-100 transition-colors no-underline"
                    >
                        + Planifier un match
                    </Link>
                </div>
            </div>
        );
    }

    const matchDate = new Date(`${nextMatch.match_date}T00:00:00`);
    const dateLabel = matchDate.toLocaleDateString("fr-FR", {
        weekday: "short",
        day: "numeric",
        month: "long",
    });
    const daysUntil = Math.max(
        0,
        Math.ceil((matchDate.getTime() - now) / 86400000)
    );

    const isHome = nextMatch.location === "Domicile";
    const homeTeam = isHome ? (clubName || "Mon équipe") : nextMatch.opponent;
    const awayTeam = isHome ? nextMatch.opponent : (clubName || "Mon équipe");

    return (
        <div className="bg-white rounded-2xl p-5 min-[640px]:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3.5">
                📅 Prochain match
            </div>

            {/* Date header */}
            <div className="flex justify-between items-center bg-gray-50 rounded-[10px] px-3.5 py-2.5 mb-1.5">
                <span className="text-[13px] font-bold text-gray-800">
                    ⚽ {nextMatch.location}
                </span>
                <span className="text-[12px] font-semibold text-loo-green-600 capitalize">
                    {dateLabel}
                </span>
            </div>

            {/* Teams */}
            <div className="flex items-center justify-center gap-4 py-4">
                <div className="text-center flex-1">
                    <div className="w-[50px] h-[50px] rounded-full bg-blue-50 flex items-center justify-center text-2xl mx-auto mb-[7px]">
                        🔵
                    </div>
                    <div className="text-[13px] font-bold text-gray-800">{homeTeam}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">Domicile</div>
                </div>
                <div className="bg-gray-100 text-gray-500 text-[13px] font-bold px-3 py-2 rounded-[9px] shrink-0">
                    VS
                </div>
                <div className="text-center flex-1">
                    <div className="w-[50px] h-[50px] rounded-full bg-red-50 flex items-center justify-center text-2xl mx-auto mb-[7px]">
                        🔴
                    </div>
                    <div className="text-[13px] font-bold text-gray-800">{awayTeam}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">Extérieur</div>
                </div>
            </div>

            {/* Infos */}
            <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-3.5 mt-0.5">
                {[
                    { val: nextMatch.match_time || "—", label: "Coup d'envoi" },
                    { val: daysUntil === 0 ? "Aujourd'hui" : `J − ${daysUntil}`, label: "Échéance" },
                ].map((s) => (
                    <div
                        key={s.label}
                        className="text-center py-2.5 bg-gray-50 rounded-[9px]"
                    >
                        <div className="text-[12px] font-bold text-gray-800 mb-0.5">
                            {s.val}
                        </div>
                        <div className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide">
                            {s.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Tip */}
            <div className="bg-loo-gold-light border-[1.5px] border-amber-300 rounded-[10px] px-3.5 py-[11px] flex items-start gap-2 mt-3">
                <span className="shrink-0">💡</span>
                <div className="text-[12px] text-amber-900 leading-relaxed font-medium">
                    <strong>Rappel Ballio :</strong> Préparez le Protocole Avant-Match
                    pour {childName} — 5 actions du vendredi soir au coup d&apos;envoi.
                </div>
            </div>
        </div>
    );
}
