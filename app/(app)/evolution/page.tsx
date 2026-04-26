"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Award, Brain, Target, Zap, Heart, Activity, LineChart as ChartIcon, BookOpen, ShieldAlert, Navigation } from 'lucide-react';

type Tab = 'Analytique' | 'Parcours';
type CategoryAge = 'U10-U11' | 'U12-U13' | 'U14-U15' | 'U16-U18';

// --- MOCK DATA FOR ANALYTIQUE ---
const OVR_HISTORY = [
    { match: 'M1', ovr: 68, sleep: 'Moyen' },
    { match: 'M2', ovr: 72, sleep: 'Bon' },
    { match: 'M3', ovr: 65, sleep: 'Mauvais' },
    { match: 'M4', ovr: 78, sleep: 'Excellent' },
    { match: 'M5', ovr: 85, sleep: 'Excellent' },
    { match: 'M6', ovr: 82, sleep: 'Bon' },
];

const COMPARAISON_STATS = [
    { label: 'Tir', start: 60, current: 85 },
    { label: 'Passe', start: 65, current: 75 },
    { label: 'Dribble', start: 70, current: 80 },
    { label: 'Défense', start: 30, current: 45 },
    { label: 'Physique', start: 50, current: 65 },
    { label: 'Discipline', start: 80, current: 90 },
];

// --- MOCK DATA FOR PARCOURS ---
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


import { getChildProfile } from '@/app/actions/child';

export default function EvolutionPage() {
    const [activeTab, setActiveTab] = useState<Tab>('Analytique');
    const [selectedAge, setSelectedAge] = useState<CategoryAge>('U12-U13');
    const [child, setChild] = useState<any>(null);

    React.useEffect(() => {
        async function loadProfile() {
            const profile = await getChildProfile();
            if (profile) setChild(profile);
        }
        loadProfile();
    }, []);

    const childName = child?.first_name || 'joueur';

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
                        {/* The Ballio Correlation Highlight */}
                        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-6 text-white shadow-lg border border-indigo-500/20">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm"><Brain size={20} className="text-indigo-200" /></div>
                                <h2 className="font-extrabold tracking-wide uppercase text-sm text-indigo-100">Corrélation Bien-être / Perf</h2>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black mb-2">Le sommeil est son arme secrète.</h3>
                            <p className="text-indigo-200 text-sm leading-relaxed mb-6">
                                Nos analyses montrent que lors des semaines où la qualité du sommeil de {childName} est au-dessus de 80% (Check-in), sa <strong className="text-white">Note de Match (OVR) augmente en moyenne de +9 pts</strong>.
                            </p>
                            <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">Sommeil "Mauvais"</div>
                                    <div className="text-2xl font-black italic text-red-400">65<span className="text-sm">OVR</span></div>
                                </div>
                                <div className="flex-1 border-t-2 border-dashed border-indigo-400/30"></div>
                                <div className="p-1 bg-indigo-500/20 rounded-full"><TrendingUp size={16} className="text-indigo-300" /></div>
                                <div className="flex-1 border-t-2 border-dashed border-indigo-400/30"></div>
                                <div className="flex flex-col items-center justify-center">
                                    <div className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">Sommeil "Excellent"</div>
                                    <div className="text-2xl font-black italic text-loo-green-400">82<span className="text-sm">OVR</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Progression Chart (Mocked with tailwind bars) */}
                        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <h3 className="font-bold text-gray-800">Évolution de la Forme</h3>
                                    <p className="text-xs text-gray-500">OVR sur les 6 derniers matchs</p>
                                </div>
                                <div className="text-2xl font-black text-loo-green-600">↑ +14</div>
                            </div>

                            <div className="h-40 flex items-end gap-2 sm:gap-4 w-full">
                                {OVR_HISTORY.map((item, idx) => (
                                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-black bg-gray-800 text-white px-2 py-1 rounded-md absolute -mt-8 pointer-events-none">
                                            {item.ovr}
                                        </div>
                                        <div
                                            className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ${idx === OVR_HISTORY.length - 1 ? 'bg-loo-green-500' : 'bg-loo-green-200 group-hover:bg-loo-green-300'
                                                }`}
                                            style={{ height: `${item.ovr}%` }}
                                        />
                                        <div className="text-[10px] font-bold text-gray-400 uppercase">{item.match}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Radar Comparison Chart (Mocked with horizontal bars for before/after) */}
                        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm">
                            <div className="mb-6">
                                <h3 className="font-bold text-gray-800">Évolution Technique</h3>
                                <p className="text-xs text-gray-500">Comparaison Début de Saison vs Actuel</p>
                            </div>

                            <div className="space-y-4">
                                {COMPARAISON_STATS.map(stat => (
                                    <div key={stat.label} className="flex items-center gap-3">
                                        <div className="w-16 text-[10px] sm:text-xs font-bold uppercase text-gray-500 tracking-wider">
                                            {stat.label}
                                        </div>
                                        <div className="flex-1 relative h-6 bg-gray-100 rounded-full overflow-hidden flex items-center">
                                            {/* Start Bar */}
                                            <div
                                                className="absolute left-0 top-0 bottom-0 bg-gray-300 opacity-60 rounded-full"
                                                style={{ width: `${stat.start}%` }}
                                            />
                                            {/* Current Bar Overlapping */}
                                            <div
                                                className="absolute left-0 top-0 bottom-0 bg-loo-green-500 rounded-full mix-blend-multiply"
                                                style={{ width: `${stat.current}%` }}
                                            />
                                        </div>
                                        <div className="w-16 text-right flex items-center justify-end gap-1 font-bold text-sm">
                                            {stat.current}
                                            <span className="text-[10px] text-loo-green-600 font-black">+{stat.current - stat.start}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center gap-4 mt-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-300 rounded-sm"></div> Début</div>
                                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-loo-green-500 rounded-sm"></div> Actuel</div>
                            </div>
                        </div>
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
                            <h3 className="font-black uppercase tracking-widest text-[11px] sm:text-xs text-gray-500 mb-4 text-center">Choisissez la catégorie de l'enfant</h3>
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
        </div >
    );
}
