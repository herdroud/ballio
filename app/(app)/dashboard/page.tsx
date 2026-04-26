"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Trophy, PlayCircle, User, ChevronRight } from 'lucide-react';
import { useUser, useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import AlertBanner from "@/components/dashboard/AlertBanner";
import CheckinBanner from "@/components/dashboard/CheckinBanner";
import ScoreCard from "@/components/dashboard/ScoreCard";
import StatMini from "@/components/dashboard/StatMini";
import ParentScore from "@/components/dashboard/ParentScore";
import CtaFormation from "@/components/dashboard/CtaFormation";
import FormationProgress from "@/components/dashboard/FormationProgress";
import MatchCard from "@/components/dashboard/MatchCard";
import MoodChart from "@/components/dashboard/MoodChart";
import { getChildProfile, getChildStats, ensureUserExists, getDailyCheckinStatus } from "@/app/actions/child";
import { getUserProgress } from "@/app/actions/lesson";
import { FORMATION_CONFIG, ModuleConfig } from "@/app/lib/formation-config";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [child, setChild] = useState<any>(null);
  const [stats, setStats] = useState({ matchCount: 0, wellbeingWeeks: 0 });
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [currentModule, setCurrentModule] = useState<ModuleConfig>(FORMATION_CONFIG[0]);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      try {
        // 1. Ensure user and child placeholders exist
        await ensureUserExists();

        // 2. Fetch data via server actions (handles UUID mapping)
        const [childData, progressData] = await Promise.all([
          getChildProfile(),
          getUserProgress()
        ]);

        if (childData) {
          setChild(childData);
          const [s, checkinStatus] = await Promise.all([
            getChildStats(childData.id),
            getDailyCheckinStatus(childData.id)
          ]);
          if (s) setStats(s);
          if (checkinStatus) setHasCheckedIn(checkinStatus.hasCheckedIn);
        }

        // 3. Determine current module
        const completedModuleIds = Array.from(new Set(progressData.map(p => p.lesson_id.split('-')[0])));
        const curMod = FORMATION_CONFIG.find(m => !completedModuleIds.includes(m.id)) || FORMATION_CONFIG[0];
        setCurrentModule(curMod);

        // 3. Handle legacy quiz score sync
        const token = await getToken({ template: "supabase" });
        const supabaseAuthenticated = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          { global: { headers: { Authorization: `Bearer ${token}` } } }
        );

        const tempScore = localStorage.getItem("tempQuizScore");
        const tempProfile = localStorage.getItem("tempQuizProfile");

        if (tempScore && tempProfile) {
          await supabaseAuthenticated.from("profiles").upsert(
            {
              user_id: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              quiz_score: parseInt(tempScore),
              parent_profile: tempProfile,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" }
          );

          localStorage.removeItem("tempQuizScore");
          localStorage.removeItem("tempQuizProfile");
        }
      } catch (err) {
        console.error("Erreur de récupération des données:", err);
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded) fetchData();
  }, [user, isLoaded, getToken]);

  if (loading && !isLoaded) {
    return (
      <div className="space-y-5">
        <div className="h-20 bg-white rounded-2xl animate-pulse" />
        <div className="h-20 bg-white rounded-2xl animate-pulse" />
        <div className="h-64 bg-white rounded-2xl animate-pulse" />
      </div>
    );
  }

  const childName = child?.first_name || "Léon";

  return (
    <div className="space-y-0">
      {/* Alert & Check-in Banners */}
      <AlertBanner childName={childName} />
      {!hasCheckedIn && <CheckinBanner childName={childName} />}

      {/* Section header */}
      <div className="flex items-center justify-between mb-4 min-[640px]:mb-5">
        <h2 className="text-[17px] font-extrabold text-gray-800 tracking-tight">
          Vue d&apos;ensemble — {childName}
        </h2>
        <span className="text-[13px] font-semibold text-loo-green-600 cursor-pointer hover:text-loo-green-700">
          Voir l&apos;historique complet →
        </span>
      </div>

      {/* TOP ROW: 3 columns on PC */}
      <div className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-4 min-[640px]:gap-[18px] mb-5 items-stretch">
        <ScoreCard childId={child?.id} />
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
      <div className="grid grid-cols-2 gap-4 mb-5">
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
          href={child?.id ? `/profile/${child.id}` : "/profile/demo"}
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
        <ParentScore />
        <CtaFormation module={currentModule} />
      </div>

      {/* BOTTOM ROW: Formation + Match + Humeur */}
      <div className="grid grid-cols-1 min-[640px]:grid-cols-2 gap-4 min-[640px]:gap-[18px] items-start">
        <FormationProgress />
        <div className="flex flex-col gap-4 min-[640px]:gap-[18px]">
          <MatchCard childName={childName} />
          <MoodChart childName={childName} childId={child?.id} />
        </div>
      </div>
    </div>
  );
}
