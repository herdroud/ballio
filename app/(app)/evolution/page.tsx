"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Award, Target, Zap, Heart, LineChart as ChartIcon, Navigation, PlayCircle } from 'lucide-react';
import { getChildProfile, getChildMatches } from '@/app/actions/child';
import type { Child, MatchRow } from '@/app/types/db';

type Tab = 'Analytique' | 'Parcours';
type CategoryAge = 'U10-U11' | 'U12-U13' | 'U14-U15' | 'U16-U18';

// --- CONTENU ÉDUCATIF PAR ÂGE (statique, rédigé par Ballio) ---
const PARCOURS_DATA: Record<CategoryAge, { title: string, subtitle: string, tactique: string, technique: string, physique: string, mental: string }> = {
    'U10-U11': {
        title: 'Football Réduit (Foot à 8)',
        subtitle: 'L\'âge d\'or des apprentissages techniques.',
        tactique: "Comprendre les principes de base (attaquer ensemble, défendre ensemble). Début de la notion de largeur et profondeur.",
        technique: "Maîtrise du ballon, jonglerie, passes courtes, contrôles orientés. C'est ici que les fondations se créent.",
        physique: "Plaisir du mouvement. Coordination, vivacité, fréquence d'appuis sur de courtes distances.",
        mental: "Jouer pour le plaisir avant tout. Accepter l'erreur, respecter l'arbitre et l'adversaire."
    },
    'U12-U13': {
        title: 'Préformation Initiale (Foot à 8/11)',
        subtitle: 'Transition vers le grand terrain.',
        tactique: "Notion de bloc équipe. Conservation du ballon sous pression, pressing collectif.",
        technique: "Vitesse d'exécution. Qualité des passes longues, jeu de tête basique, pied faible.",
        physique: "Début des différences morphologiques (puberté). Travail aérobie, gainage de base.",
        mental: "Esprit de compétition accru. Gérer la frustration, comprendre que l'équipe passe avant soi."
    },
    'U14-U15': {
        title: 'Préformation Avancée (Foot à 11)',
        subtitle: 'L\'exigence tactique et physique.',
        tactique: "Compréhension des systèmes (4-3-3, 4-4-2). Transitions offensives/défensives rapides.",
        technique: "Jeu en 1 ou 2 touches. Fixer pour renverser, centres sous pression.",
        physique: "Pic de croissance. Attention aux blessures (Osgood-Schlatter, Sever). Développement de l'endurance puissance (PMA).",
        mental: "Le foot devient exigeant. Faire des sacrifices, comprendre le statut de remplaçant sans abandonner."
    },
    'U16-U18': {
        title: 'Formation (Foot à 11)',
        subtitle: 'L\'antichambre des séniors.',
        tactique: "Culture tactique précise. Adaptation au système adverse en cours de match.",
        technique: "Précision sous haute intensité et fatigue. Coups de pied arrêtés spécifiques.",
        physique: "Développement musculaire (hypertrophie), explosivité. Préparation physique généralisée.",
        mental: "Hyper-exigence. Gestion de l'anxiété de performance, hygiène de vie (nutrition, sommeil) prioritaire."
    }
};

const STAT_LABELS: { key: keyof Pick<MatchRow, 'stat_tir' | 'stat_pas' | 'stat_dri' | 'stat_def' | 'stat_phy' | 'stat_disc'>, label: string }[] = [
    { key: 'stat_tir', label: 'Tir' },
    { key: 'stat_pas', label: 'Passe' },
    { key: 'stat_dri', label: 'Dribble' },
    { key: 'stat_def', label: 'Défense' },
    { key: 'stat_phy', label: 'Physique' },
    { key: 'stat_disc', label: 'Discipline' },
];

const avgOf = (matches: MatchRow[], key: keyof MatchRow): number => {
    const vals = matches.map(m => m[key]).filter((v): v is number => typeof v === 'number');
    if (vals.length === 0) return 0;
    return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length);
};

export default function EvolutionPage() {
    const [activeTab, setActiveTab] = useState<Tab>('Analytique');
    const [selectedAge, setSelectedAge] = useState<CategoryAge>('U12-U13');
    const [child, setChild] = useState<Child | null>(null);
    const [matches, setMatches] = useState<MatchRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const profile = await getChildProfile();
                if (profile) {
                    setChild(profile);
                    const matchData = await getChildMatches(profile.id);
                    setMatches(matchData);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const childName = child?.first_name || 'joueur';

    // Analytique — matches est trié du plus récent au plus ancien.
    const chronological = [...matches].reverse();
    const last6 = chronological.slice(-6);
    const avgOvr = avgOf(matches, 'rating_ovr');
    const bestOvr = matches.length > 0 ? Math.max(...matches.map(m => m.rating_ovr || 0)) : 0;

    // Tendance : moyenne des 3 derniers vs les 3 précédents.
    const recent3 = chronological.slice(-3);
    const previous3 = chronological.slice(-6, -3);
    const trend = previous3.length > 0
        ? avgOf(recent3, 'rating_ovr') - avgOf(previous3, 'rating_ovr')
        : 0;

    // Comparaison début de saison (3 premiers matchs) vs forme actuelle (3 derniers).
    const first3 = chronological.slice(0, 3);
    const comparison = STAT_LABELS.map(({ key, label }) => ({
        label,
        start: avgOf(first3, key),
        current: avgOf(recent3, key),
    }));
    const hasComparison = matches.length >= 4;

    return (
        <div className="max-w-3xl mx-auto pb-24">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
                    <TrendingUp className="text-loo-green-500" /> Évolution & Parcours
                </h1>
                <p className="text-sm text-gray-500 mt-1">Analyse des performances et repères éducatifs</p>
            </div>

            {/* Custom Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
                <button
                    onClick={() => setActiveTab('Analytique')}
                    className={`flex-1 py-2 font-bold text-sm rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'Analytique' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <ChartIcon size={16} /> Analytique
                </button>
                <button
                    onClick={() => setActiveTab('Parcours')}
                    className={`flex-1 py-2 font-bold text-sm rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'Parcours' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Navigation size={16} /> Parcours Foot
                </button>
            </div>

            <AnimatePresence mode="wait">
                {/* --- ANALYTIQUE TAB --- */}
                {activeTab === 'Analytique' && (
                    <motion.div
                        key="analytique"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                    >
                        {loading ? (
                            <div className="space-y-4">
                                <div className="h-40 bg-white rounded-2xl animate-pulse" />
                                <div className="h-40 bg-white rounded-2xl animate-pulse" />
                            </div>
                        ) : matches.length === 0 ? (
                            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
                                <div className="text-4xl mb-4">📊</div>
                                <h3 className="text-lg font-black text-gray-900 mb-2">
                                    Pas encore de données
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-sm mx-auto">
                                    Enregistrez les matchs de {childName} avec le Suivi Match Live
                                    pour voir apparaître son évolution ici.
                                </p>
                                <Link
                                    href="/match/live"
                                    className="inline-flex items-center gap-2 bg-loo-green-500 hover:bg-loo-green-600 text-white font-extrabold px-6 py-3 rounded-2xl transition-colors no-underline"
                                >
                                    <PlayCircle size={18} /> Suivre un match
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Résumé de forme */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
                                        <div className="text-[10px] uppercase text-gray-400 font-bold">Moy. OVR</div>
                                        <div className="text-2xl font-black text-gray-800">{avgOvr}</div>
                                    </div>
                                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
                                        <div className="text-[10px] uppercase text-gray-400 font-bold">Best</div>
                                        <div className="text-2xl font-black text-amber-500">{bestOvr}</div>
                                    </div>
                                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
                                        <div className="text-[10px] uppercase text-gray-400 font-bold">Tendance</div>
                                        <div className={`text-2xl font-black flex items-center justify-center gap-1 ${trend > 0 ? 'text-loo-green-600' : trend < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                                            {trend > 0 ? <TrendingUp size={20} /> : trend < 0 ? <TrendingDown size={20} /> : <Minus size={20} />}
                                            {trend > 0 ? `+${trend}` : trend}
                                        </div>
                                    </div>
                                </div>

                                {/* Progression Chart */}
                                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm">
                                    <div className="flex justify-between items-end mb-6">
                                        <div>
                                            <h3 className="font-bold text-gray-800">Évolution de la Forme</h3>
                                            <p className="text-xs text-gray-500">
                                                OVR sur les {last6.length} dernier{last6.length > 1 ? 's' : ''} match{last6.length > 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="h-40 flex items-end gap-1 min-[400px]:gap-2 sm:gap-4 w-full">
                                        {last6.map((match, idx) => {
                                            const ovr = match.rating_ovr || 0;
                                            const dateLabel = new Date(`${match.match_date}T00:00:00`)
                                                .toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
                                            return (
                                                <div key={match.id} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-black bg-gray-800 text-white px-2 py-1 rounded-md absolute -mt-8 pointer-events-none">
                                                        {ovr} · vs {match.opponent}
                                                    </div>
                                                    <div
                                                        className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ${idx === last6.length - 1 ? 'bg-loo-green-500' : 'bg-loo-green-200 group-hover:bg-loo-green-300'}`}
                                                        style={{ height: `${Math.max(ovr, 4)}%` }}
                                                    />
                                                    <div className="text-[10px] font-bold text-gray-400 uppercase">{dateLabel}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Comparaison début de saison vs actuel */}
                                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm">
                                    <div className="mb-6">
                                        <h3 className="font-bold text-gray-800">Évolution Technique</h3>
                                        <p className="text-xs text-gray-500">
                                            {hasComparison
                                                ? "Comparaison 3 premiers matchs vs 3 derniers"
                                                : "Moyennes de la saison (comparaison disponible à partir de 4 matchs)"}
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        {comparison.map(stat => {
                                            const diff = stat.current - stat.start;
                                            return (
                                                <div key={stat.label} className="flex items-center gap-3">
                                                    <div className="w-14 min-[400px]:w-16 text-[10px] sm:text-xs font-bold uppercase text-gray-500 tracking-wider shrink-0">
                                                        {stat.label}
                                                    </div>
                                                    <div className="flex-1 relative h-6 bg-gray-100 rounded-full overflow-hidden flex items-center">
                                                        {hasComparison && (
                                                            <div
                                                                className="absolute left-0 top-0 bottom-0 bg-gray-300 opacity-60 rounded-full"
                                                                style={{ width: `${stat.start}%` }}
                                                            />
                                                        )}
                                                        <div
                                                            className="absolute left-0 top-0 bottom-0 bg-loo-green-500 rounded-full mix-blend-multiply"
                                                            style={{ width: `${stat.current}%` }}
                                                        />
                                                    </div>
                                                    <div className="w-16 text-right flex items-center justify-end gap-1 font-bold text-sm">
                                                        {stat.current}
                                                        {hasComparison && diff !== 0 && (
                                                            <span className={`text-[10px] font-black ${diff > 0 ? 'text-loo-green-600' : 'text-red-500'}`}>
                                                                {diff > 0 ? `+${diff}` : diff}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {hasComparison && (
                                        <div className="flex justify-center gap-4 mt-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-300 rounded-sm"></div> Début</div>
                                            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-loo-green-500 rounded-sm"></div> Actuel</div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </motion.div>
                )}

                {/* --- PARCOURS TAB --- */}
                {activeTab === 'Parcours' && (
                    <motion.div
                        key="parcours"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Timeline Selector */}
                        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm sticky top-4 z-10">
                            <h3 className="font-black uppercase tracking-widest text-[11px] sm:text-xs text-gray-500 mb-4 text-center">Choisissez la catégorie de l&apos;enfant</h3>
                            <div className="flex w-full bg-gray-50 p-1 sm:p-2 rounded-xl overflow-x-auto hide-scrollbar">
                                {(Object.keys(PARCOURS_DATA) as CategoryAge[]).map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedAge(cat)}
                                        className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-bold min-w-[80px] rounded-lg transition-all ${selectedAge === cat
                                            ? 'bg-loo-green-500 text-white shadow-md transform scale-105'
                                            : 'text-gray-500 hover:bg-gray-200'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selected Category Content */}
                        <motion.div
                            key={selectedAge} // Re-animate on change
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                        >
                            <div className="mb-8 border-b border-gray-100 pb-6 text-center">
                                <div className="inline-flex px-3 py-1 rounded-full bg-loo-green-100 text-loo-green-700 font-black text-sm mb-3">
                                    Catégorie {selectedAge}
                                </div>
                                <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">
                                    {PARCOURS_DATA[selectedAge].title}
                                </h2>
                                <p className="text-gray-500 font-medium mt-2">
                                    {PARCOURS_DATA[selectedAge].subtitle}
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {/* Tactique */}
                                <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                                    <div className="flex items-center gap-2 mb-3 text-blue-700">
                                        <Target size={20} />
                                        <h3 className="font-bold uppercase tracking-wide text-sm">Tactique</h3>
                                    </div>
                                    <p className="text-sm text-blue-900/80 leading-relaxed">
                                        {PARCOURS_DATA[selectedAge].tactique}
                                    </p>
                                </div>

                                {/* Technique */}
                                <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                                    <div className="flex items-center gap-2 mb-3 text-amber-700">
                                        <Award size={20} />
                                        <h3 className="font-bold uppercase tracking-wide text-sm">Technique</h3>
                                    </div>
                                    <p className="text-sm text-amber-900/80 leading-relaxed">
                                        {PARCOURS_DATA[selectedAge].technique}
                                    </p>
                                </div>

                                {/* Physique */}
                                <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">
                                    <div className="flex items-center gap-2 mb-3 text-orange-700">
                                        <Zap size={20} />
                                        <h3 className="font-bold uppercase tracking-wide text-sm">Physique</h3>
                                    </div>
                                    <p className="text-sm text-orange-900/80 leading-relaxed">
                                        {PARCOURS_DATA[selectedAge].physique}
                                    </p>
                                </div>

                                {/* Mental */}
                                <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100">
                                    <div className="flex items-center gap-2 mb-3 text-purple-700">
                                        <Heart size={20} />
                                        <h3 className="font-bold uppercase tracking-wide text-sm">Mental</h3>
                                    </div>
                                    <p className="text-sm text-purple-900/80 leading-relaxed">
                                        {PARCOURS_DATA[selectedAge].mental}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
