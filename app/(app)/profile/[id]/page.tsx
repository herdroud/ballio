"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, TrendingUp, Calendar, ArrowLeft, ChevronRight, Activity, X } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { calculateTier, getTierLabel } from '@/app/lib/stats';
import { getChildById, getChildMatches, getChildProfile } from '@/app/actions/child';

const STAT_COLORS: Record<string, string> = {
    TIR: 'text-loo-green-600',
    PAS: 'text-blue-600',
    DRI: 'text-amber-600',
    DEF: 'text-slate-600',
    PHY: 'text-orange-600',
    DISC: 'text-purple-600',
};

const STAT_BG: Record<string, string> = {
    TIR: 'bg-loo-green-50 border-loo-green-200',
    PAS: 'bg-blue-50 border-blue-200',
    DRI: 'bg-amber-50 border-amber-200',
    DEF: 'bg-slate-50 border-slate-200',
    PHY: 'bg-orange-50 border-orange-200',
    DISC: 'bg-purple-50 border-purple-200',
};

export default function PlayerProfilePage() {
    const router = useRouter();
    const params = useParams();
    const [child, setChild] = useState<any>(null);
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMatch, setSelectedMatch] = useState<any | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                let childId = params.id as string;
                let childData = null;

                if (childId === 'demo') {
                    // Try to get the primary child profile
                    childData = await getChildProfile();
                    if (childData) childId = childData.id;
                } else {
                    childData = await getChildById(childId);
                }

                if (childData) {
                    setChild(childData);
                    const matchesData = await getChildMatches(childId);
                    setMatches(matchesData);
                }
            } catch (err) {
                console.error("Error fetching player profile:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [params.id]);

    useEffect(() => {
        if (selectedMatch) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedMatch]);

    if (loading) return <div className="p-10 text-center text-gray-400">Chargement du profil...</div>;
    if (!child) return <div className="p-10 text-center text-gray-400">Enfant non trouvé.</div>;

    // Helper to transform vertical metrics rows into a display object
    const transformMetrics = (metricsArray: any[]) => {
        const obj: any = {};
        metricsArray?.forEach(m => {
            obj[m.metric_name.toUpperCase()] = m.value;
        });
        return obj;
    };

    // Aggregate stats for the "Player Card" (Using summary columns from matches table)
    const matchCount = matches.length || 1;
    const totals = matches.reduce((acc, m) => {
        acc.TIR += m.stat_tir || 0;
        acc.PAS += m.stat_pas || 0;
        acc.DRI += m.stat_dri || 0;
        acc.DEF += m.stat_def || 0;
        acc.PHY += m.stat_phy || 0;
        acc.DISC += m.stat_disc || 0;
        acc.OVR += m.rating_ovr || 0;
        return acc;
    }, { TIR: 0, PAS: 0, DRI: 0, DEF: 0, PHY: 0, DISC: 0, OVR: 0 });

    const displayStats = {
        TIR: Math.round(totals.TIR / matchCount),
        PAS: Math.round(totals.PAS / matchCount),
        DRI: Math.round(totals.DRI / matchCount),
        DEF: Math.round(totals.DEF / matchCount),
        PHY: Math.round(totals.PHY / matchCount),
        DISC: Math.round(totals.DISC / matchCount),
    };

    const avgOvr = Math.round(totals.OVR / matchCount);
    const ovr = avgOvr;
    const tier = calculateTier(ovr);
    const bestOvr = matches.length > 0 ? Math.max(...matches.map(m => m.rating_ovr || 0)) : 0;

    // Season Totals for specific actions
    const seasonActions = matches.reduce((acc, m) => {
        m.match_metrics?.forEach((ev: any) => {
            const type = ev.action_type;
            if (['Pok', 'Pko', 'Pdec'].includes(type)) acc.passes++;
            if (['But', 'Tca', 'Tho'].includes(type)) acc.shots++;
            if (['Dok', 'Dko'].includes(type)) acc.dribbles++;
            if (['Cok', 'Cko'].includes(type)) acc.crosses++;
        });
        return acc;
    }, { passes: 0, shots: 0, dribbles: 0, crosses: 0 });

    const getMatchActionTotals = (match: any) => {
        return (match.match_metrics || []).reduce((acc: any, ev: any) => {
            const type = ev.action_type;
            if (['Pok', 'Pko', 'Pdec'].includes(type)) acc.passes++;
            if (['But', 'Tca', 'Tho'].includes(type)) acc.shots++;
            if (['Dok', 'Dko'].includes(type)) acc.dribbles++;
            if (['Cok', 'Cko'].includes(type)) acc.crosses++;
            return acc;
        }, { passes: 0, shots: 0, dribbles: 0, crosses: 0 });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 pb-6 relative">
            {/* Page header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <div>
                    <h1 className="text-xl font-extrabold text-gray-800">Profil Joueur</h1>
                    <p className="text-xs text-gray-500 mt-0.5">Suivi de la saison</p>
                </div>
            </div>

            {/* Hero card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black italic uppercase text-gray-800">{child.first_name} {child.last_name}</h2>
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                            {child.club_name} · {child.position}
                        </p>
                    </div>
                    <div className={`text-center px-4 py-2 rounded-xl border ${tier === 'legend' ? 'bg-loo-green-100 border-loo-green-300 text-loo-green-700' :
                        tier === 'epic' ? 'bg-purple-100 border-purple-300 text-purple-700' :
                            tier === 'rare' ? 'bg-amber-100 border-amber-300 text-amber-700' :
                                'bg-gray-100 border-gray-200 text-gray-500'
                        }`}>
                        <div className="text-3xl font-black italic">{ovr}</div>
                        <div className="text-[10px] font-black uppercase">{getTierLabel(tier)}</div>
                    </div>
                </div>
            </div>

            {/* FC-style stats card */}
            <div className="flex flex-col items-center gap-3">
                <div className="text-xs font-bold uppercase text-gray-400 tracking-widest">Carte de Joueur</div>
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`w-full max-w-sm p-6 rounded-3xl border-2 shadow-2xl ${tier === 'legend' ? 'border-loo-green-400 bg-gradient-to-br from-loo-green-900 to-loo-green-800' :
                        tier === 'epic' ? 'border-purple-400 bg-gradient-to-br from-purple-900 to-purple-800' :
                            tier === 'rare' ? 'border-amber-400 bg-gradient-to-br from-amber-800 to-amber-900' :
                                'border-slate-800 bg-gradient-to-br from-slate-800 to-slate-900'
                        } text-white`}
                >
                    <div className="absolute top-4 right-4 text-[10px] font-black uppercase opacity-50">
                        {getTierLabel(tier)}
                    </div>

                    <div className="text-center mb-6">
                        <div className="text-7xl font-black italic text-white">{ovr}</div>
                        <div className="text-sm font-bold uppercase text-white/50">{child.position}</div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {Object.entries(displayStats).map(([key, val]) => (
                            <div key={key} className="flex flex-col items-center p-3 rounded-xl bg-white/10 border border-white/10">
                                <span className="text-[10px] uppercase text-white/50 font-bold">{key}</span>
                                <span className="text-xl font-black text-white">{val}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Season totals summary */}
            <div className="bg-gray-900 rounded-2xl p-5 text-white">
                <div className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-4">Volume de Jeu (Saison)</div>
                <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-xl font-black">{seasonActions.passes}</div>
                        <div className="text-[10px] font-bold uppercase text-white/40">Passes</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-black">{seasonActions.shots}</div>
                        <div className="text-[10px] font-bold uppercase text-white/40">Tirs</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-black">{seasonActions.dribbles}</div>
                        <div className="text-[10px] font-bold uppercase text-white/40">Dribbles</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-black">{seasonActions.crosses}</div>
                        <div className="text-[10px] font-bold uppercase text-white/40">Centres</div>
                    </div>
                </div>
            </div>

            {/* Season stats overview */}
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
                    <div className="text-[10px] uppercase text-gray-400 font-bold">Matchs</div>
                    <div className="text-2xl font-black text-gray-800">{matches.length}</div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
                    <div className="text-[10px] uppercase text-gray-400 font-bold">Moy. Note</div>
                    <div className="text-2xl font-black text-loo-green-600">{avgOvr}</div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
                    <div className="text-[10px] uppercase text-gray-400 font-bold">Best</div>
                    <div className="text-2xl font-black text-amber-500">{bestOvr}</div>
                </div>
            </div>

            {/* Match history */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-sm font-black uppercase text-gray-500 tracking-wider">Historique Matchs</span>
                </div>
                <div className="space-y-2">
                    {matches.length === 0 ? (
                        <div className="text-center py-6 text-gray-400 text-sm italic">Aucun match enregistré pour le moment.</div>
                    ) : (
                        matches.map((match, i) => {
                            const note = match.rating_ovr || 0;
                            const prevNote = matches[i + 1]?.rating_ovr || note;
                            const trend = note > prevNote ? 'up' : (note < prevNote ? 'dn' : 'eq');

                            return (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                    key={match.id}
                                    onClick={() => setSelectedMatch(match)}
                                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-loo-green-200 hover:bg-loo-green-50 transition-colors group cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col">
                                            <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md self-start ${match.result === 'victoire' ? 'bg-loo-green-100 text-loo-green-600' :
                                                match.result === 'défaite' ? 'bg-red-100 text-red-600' :
                                                    'bg-gray-100 text-gray-500'
                                                }`}>
                                                {match.result === 'victoire' ? 'Win' : match.result === 'défaite' ? 'Loss' : 'Draw'}
                                            </span>
                                            <span className="text-[10px] font-mono text-gray-400 mt-1">
                                                {new Date(match.match_date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-700">{match.opponent}</span>
                                            <span className="text-[11px] font-medium text-gray-400">{match.score || '-'}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <div className={`text-lg font-black italic leading-none ${trend === 'up' ? 'text-loo-green-500' :
                                                trend === 'dn' ? 'text-red-500' :
                                                    'text-gray-400'
                                                }`}>
                                                {note}
                                            </div>
                                            <div className="text-[10px] text-gray-300 font-bold uppercase mt-0.5">
                                                {trend === 'up' ? 'En hausse' : trend === 'dn' ? 'En baisse' : 'Stable'}
                                            </div>
                                        </div>
                                        <ChevronRight size={14} className="text-gray-300 group-hover:text-loo-green-500 transition-colors" />
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Match Detail Modal Overlay */}
            <AnimatePresence>
                {selectedMatch && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] flex justify-end bg-gray-900/40 backdrop-blur-sm p-4"
                    >
                        <div className="absolute inset-0" onClick={() => setSelectedMatch(null)} />
                        <motion.div
                            initial={{ x: '100%', y: 0 }}
                            animate={{ x: 0, y: 0 }}
                            exit={{ x: '100%', transition: { duration: 0.2 } }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="w-full max-w-[440px] bg-white h-full max-h-screen overflow-y-auto shadow-2xl rounded-3xl p-6 flex flex-col gap-6 relative z-10"
                        >
                            {/* Modal Header */}
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-loo-green-50 border border-loo-green-200 flex items-center justify-center text-loo-green-500 font-bold text-xl">⚽</div>
                                    <div>
                                        <h2 className="text-xl font-extrabold text-gray-800 leading-tight">vs {selectedMatch.opponent}</h2>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">
                                            Match du {new Date(selectedMatch.match_date).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedMatch(null)}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Match General Score */}
                            <div className="flex justify-center -mt-2">
                                <div className={`text-center px-10 py-5 rounded-3xl border-2 shadow-sm ${calculateTier(selectedMatch.rating_ovr || 0) === 'legend' ? 'bg-loo-green-50 border-loo-green-300 text-loo-green-800' :
                                    calculateTier(selectedMatch.rating_ovr || 0) === 'epic' ? 'bg-purple-50 border-purple-300 text-purple-800' :
                                        'bg-gray-50 border-gray-300 text-gray-800'
                                    }`}>
                                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Note de Match</div>
                                    <div className="text-7xl font-black italic">{selectedMatch.rating_ovr || 0}</div>
                                </div>
                            </div>

                            {/* Detailed Stats */}
                            {selectedMatch.match_metrics?.length > 0 && (
                                <div className="space-y-4">
                                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                                        <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Volume de l'Action</div>
                                        <div className="grid grid-cols-4 gap-2">
                                            {(() => {
                                                const mTotals = getMatchActionTotals(selectedMatch);
                                                return [
                                                    { label: 'Passes', val: mTotals.passes },
                                                    { label: 'Tirs', val: mTotals.shots },
                                                    { label: 'Dribbles', val: mTotals.dribbles },
                                                    { label: 'Centres', val: mTotals.crosses },
                                                ].map(t => (
                                                    <div key={t.label} className="text-center p-2 rounded-xl bg-gray-50 border border-gray-100">
                                                        <div className="text-lg font-black text-gray-800">{t.val}</div>
                                                        <div className="text-[9px] font-bold uppercase text-gray-400">{t.label}</div>
                                                    </div>
                                                ));
                                            })()}
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                                        <div className="text-sm font-black uppercase text-gray-500 tracking-wider mb-4 pb-3 border-b border-gray-100">Détail des Attributs</div>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { label: 'TIR', val: selectedMatch.stat_tir },
                                                { label: 'PAS', val: selectedMatch.stat_pas },
                                                { label: 'DRI', val: selectedMatch.stat_dri },
                                                { label: 'DEF', val: selectedMatch.stat_def },
                                                { label: 'PHY', val: selectedMatch.stat_phy },
                                                { label: 'DISC', val: selectedMatch.stat_disc },
                                            ].map((stat) => (
                                                <div key={stat.label} className={`flex flex-col items-center p-4 rounded-xl border ${STAT_BG[stat.label] || 'bg-gray-50 border-gray-200'}`}>
                                                    <div className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">{stat.label}</div>
                                                    <div className={`text-2xl font-black mt-1 ${STAT_COLORS[stat.label] || 'text-gray-700'}`}>{stat.val || 0}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Context Footer */}
                            <div className="mt-auto bg-gray-50 border border-gray-200 rounded-xl p-4 text-center text-sm font-medium text-gray-600">
                                Match solide et régulier, fidèle au niveau habituel.
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
