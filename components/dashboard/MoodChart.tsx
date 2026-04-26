"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@clerk/nextjs';

const LEGEND = [
    { label: "Bien", color: "bg-loo-green-400" },
    { label: "Moyen", color: "bg-loo-orange" },
    { label: "Difficile", color: "bg-loo-red opacity-75" },
];

interface MoodChartProps {
    childName?: string;
    childId?: string;
}

export default function MoodChart({ childName = "joueur", childId }: MoodChartProps) {
    const { getToken, isLoaded } = useAuth();
    const [bars, setBars] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWellbeing() {
            if (!isLoaded || !childId) return;
            try {
                const token = await getToken({ template: "supabase" });
                const supabase = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    { global: { headers: { Authorization: `Bearer ${token}` } } }
                );

                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

                const { data } = await supabase
                    .from('child_wellbeing')
                    .select('*')
                    .eq('child_id', childId)
                    .gte('created_at', sevenDaysAgo.toISOString())
                    .order('created_at', { ascending: true });

                const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
                const last7Days = Array.from({ length: 7 }, (_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() - (6 - i));
                    return {
                        dateStr: d.toDateString(),
                        dayLabel: days[d.getDay()],
                        mood: null as number | null
                    };
                });

                data?.forEach(entry => {
                    const entryDate = new Date(entry.created_at).toDateString();
                    const day = last7Days.find(d => d.dateStr === entryDate);
                    if (day) day.mood = entry.mood_score;
                });

                const formattedBars = last7Days.map(d => ({
                    day: d.dayLabel,
                    height: d.mood ? `${(d.mood / 5) * 100}%` : '5%',
                    color: d.mood === 5 ? 'bg-loo-green-500' : d.mood === 3 ? 'bg-loo-orange' : d.mood === 1 ? 'bg-loo-red opacity-75' : 'bg-gray-100'
                }));

                setBars(formattedBars);
            } catch (err) {
                console.error("Error fetching wellbeing:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchWellbeing();
    }, [childId, isLoaded, getToken]);

    if (loading) return <div className="h-40 bg-white rounded-2xl animate-pulse" />;

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
