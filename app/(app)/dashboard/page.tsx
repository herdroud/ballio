"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PlayCircle, User, ChevronRight, Settings } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import CheckinBanner from "@/components/dashboard/CheckinBanner";
import ScoreCard from "@/components/dashboard/ScoreCard";
import StatMini from "@/components/dashboard/StatMini";
import ParentScore from "@/components/dashboard/ParentScore";
import CtaFormation from "@/components/dashboard/CtaFormation";
import FormationProgress from "@/components/dashboard/FormationProgress";
import MatchCard from "@/components/dashboard/MatchCard";
import MoodChart from "@/components/dashboard/MoodChart";
import {
    getChildProfile,
    getChildStats,
    ensureUserExists,
    getDailyCheckinStatus,
    getWellbeingLast7Days,
} from "@/app/actions/child";
import { getUserProgress } from "@/app/actions/lesson";
import { getNextPlannedMatch } from "@/app/actions/calendar";
import { saveQuizResult } from "@/app/actions/quiz";
import { getFormationState, type FormationState } from "@/app/lib/formation-config";
import type { Child, PlannedMatchRow, WellbeingRow } from "@/app/types/db";

export default function DashboardPage() {
    const { user, isLoaded } = useUser();
    const [loading, setLoading] = useState(true);
    const [child, setChild] = useState<Child | null>(null);
    const [stats, setStats] = useState({ matchCount: 0, wellbeingWeeks: 0 });
    const [hasCheckedIn, setHasCheckedIn] = useState(false);
    const [wellbeing, setWellbeing] = useState<WellbeingRow[]>([]);
    const [nextMatch, setNextMatch] = useState<PlannedMatchRow | null>(null);
    const [formation, setFormation] = useState<FormationState>(getFormationState([]));

    useEffect(() => {
        async function fetchData() {
            if (!user) return;

            try {
                // 1. Bootstrap du profil parent (idempotent)
                await ensureUserExists();

                // 2. Synchronisation du résultat de quiz fait avant inscription
                const tempScore = localStorage.getItem("tempQuizScore");
                const tempProfile = localStorage.getItem("tempQuizProfile");
                if (tempScore && tempProfile) {
                    const result = await saveQuizResult(parseInt(tempScore, 10), tempProfile);
                    if (result.success) {
                        localStorage.removeItem("tempQuizScore");
                        localStorage.removeItem("tempQuizProfile");
                    }
                }

                // 3. Données du dashboard
                const [childData, progressData] = await Promise.all([
                    getChildProfile(),
                    getUserProgress(),
                ]);

                setFormation(getFormationState(progressData.map(p => p.lesson_id)));

                if (childData) {
                    setChild(childData);
                    const [s, checkinStatus, wellbeingData, next] = await Promise.all([
                        getChildStats(childData.id),
                        getDailyCheckinStatus(childData.id),
                        getWellbeingLast7Days(childData.id),
                        getNextPlannedMatch(),
                    ]);
                    if (s) setStats(s);
                    if (checkinStatus) setHasCheckedIn(checkinStatus.hasCheckedIn);
                    setWellbeing(wellbeingData);
                    setNextMatch(next);
                }
            } catch (err) {
                console.error("Erreur de récupération des données:", err);
            } finally {
                setLoading(false);
            }
        }

        if (isLoaded) fetchData();
    }, [user, isLoaded]);

    if (!isLoaded || loading) {
        return (
            <div className="space-y-5">
                <div className="h-20 bg-white rounded-2xl animate-pulse" />
                <div className="h-20 bg-white rounded-2xl animate-pulse" />
                <div className="h-64 bg-white rounded-2xl animate-pulse" />
            </div>
        );
    }

    // Onboarding : pas encore de profil enfant configuré.
    if (!child) {
        return (
            <div className="max-w-2xl mx-auto space-y-5">
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 text-center">
                    <div className="text-5xl mb-4">👋</div>
                    <h1 className="text-2xl font-black text-gray-900 mb-2">
                        Bienvenue sur Ballio !
                    </h1>
                    <p className="text-gray-500 leading-relaxed mb-6 max-w-md mx-auto">
                        Pour démarrer le suivi (check-ins, matchs, statistiques),
                        commencez par renseigner le profil de votre enfant.
                    </p>
                    <Link
                        href="/parametres"
                        className="inline-flex items-center gap-2 bg-loo-green-500 hover:bg-loo-green-600 text-white font-extrabold px-6 py-3.5 rounded-2xl transition-colors no-underline"
                    >
                        <Settings size={18} /> Configurer le profil
                    </Link>
                </div>

                {/* La formation est accessible sans profil enfant */}
                <CtaFormation module={formation.currentModule} />
                <FormationProgress completedModuleIds={formation.completedModuleIds} />
            </div>
        );
    }

    const childName = child.first_name;

    return (
        <div className="space-y-0">
            {!hasCheckedIn && <CheckinBanner childName={childName} />}

            {/* Section header */}
            <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center justify-between mb-4 min-[640px]:mb-5 gap-1">
                <h2 className="text-[17px] font-extrabold text-gray-800 tracking-tight">
                    Vue d&apos;ensemble — {childName}
                </h2>
                <Link
                    href={`/profile/${child.id}`}
                    className="text-[13px] font-semibold text-loo-green-600 hover:text-loo-green-700 shrink-0 no-underline"
                >
                    Voir l&apos;historique complet →
                </Link>
            </div>

            {/* TOP ROW: 3 columns on PC */}
            <div className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-4 min-[640px]:gap-[18px] mb-5 items-stretch">
                <ScoreCard entries={wellbeing} />
                <StatMini
                    icon="⚽"
                    value={stats.matchCount.toString()}
                    label="Matchs cette saison"
                    change={stats.matchCount > 0 ? "↑ Activité détectée" : "En attente de matchs"}
                    color="green"
                />
                <StatMini
                    icon="🔥"
                    value={stats.wellbeingWeeks.toString()}
                    label="Semaines de suivi"
                    change={stats.wellbeingWeeks > 0 ? "🏆 Progression continue" : "Commencez le suivi"}
                    color="orange"
                />
            </div>

            {/* QUICK ACCESS SECTION */}
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-4 mb-5">
                <Link
                    href="/match/live"
                    className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 group"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
                            <PlayCircle size={20} />
                        </div>
                        <span className="font-bold text-sm">Suivi Match Live</span>
                    </div>
                    <ChevronRight size={16} className="opacity-50" />
                </Link>
                <Link
                    href={`/profile/${child.id}`}
                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-800 text-white hover:bg-slate-700 transition-all border border-slate-700 group"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-700 rounded-lg group-hover:scale-110 transition-transform">
                            <User size={20} />
                        </div>
                        <span className="font-bold text-sm">Profil Enfant</span>
                    </div>
                    <ChevronRight size={16} className="opacity-50" />
                </Link>
            </div>

            {/* MIDDLE ROW: Score Parent + CTA Formation */}
            <div className="grid grid-cols-1 min-[640px]:grid-cols-2 gap-4 min-[640px]:gap-[18px] mb-5">
                <ParentScore
                    hasCheckedIn={hasCheckedIn}
                    completedModuleCount={formation.completedModuleCount}
                    totalModuleCount={formation.totalModuleCount}
                    matchCount={stats.matchCount}
                />
                <CtaFormation module={formation.currentModule} />
            </div>

            {/* BOTTOM ROW: Formation + Match + Humeur */}
            <div className="grid grid-cols-1 min-[640px]:grid-cols-2 gap-4 min-[640px]:gap-[18px] items-start">
                <FormationProgress completedModuleIds={formation.completedModuleIds} />
                <div className="flex flex-col gap-4 min-[640px]:gap-[18px]">
                    <MatchCard childName={childName} nextMatch={nextMatch} clubName={child.club_name} />
                    <MoodChart childName={childName} entries={wellbeing} />
                </div>
            </div>
        </div>
    );
}
