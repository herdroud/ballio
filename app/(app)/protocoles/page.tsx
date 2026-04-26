"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, BookOpen, Clock, Heart, AlertTriangle, ArrowRight, X, CheckSquare, XCircle, Search } from 'lucide-react';

type Category = 'Tous' | 'Urgence' | 'Avant match' | 'Après match' | 'Motivation';

interface Protocol {
    id: string;
    title: string;
    category: Category;
    color: 'red' | 'orange' | 'green' | 'blue';
    shortDesc: string;
    trigger: string; // The situation that triggered this protocol
    steps: { title: string; desc: string }[];
    redFlags: string[];
}

const MOCK_PROTOCOLS: Protocol[] = [
    {
        id: '1',
        title: 'Lourde défaite & Pleurs',
        category: 'Après match',
        color: 'red',
        trigger: "L'enfant pleure ou est très en colère après une lourde défaite.",
        shortDesc: "Gérer la frustration intense immédiate après le coup de sifflet final.",
        steps: [
            { title: "Garder le silence au début", desc: "Dans la voiture, mettez de la musique douce ou laissez le silence. Ne lancez pas le débriefing à chaud." },
            { title: "Valider l'émotion", desc: "Dites simplement 'Je vois que tu es déçu. C'est normal de l'être après ce match.' Ne minimisez pas sa tristesse ('c'est qu'un jeu')." },
            { title: "Déplacer l'attention (Plus tard)", desc: "1h après, proposez une activité non liée au football (un film, un jeu) pour faire redescendre la pression." }
        ],
        redFlags: [
            "Critiquer l'arbitre ou l'entraîneur devant lui.",
            "Lui reprocher son manque d'efforts sur le terrain.",
            "L'obliger à s'expliquer sur ses erreurs immédiatement."
        ]
    },
    {
        id: '2',
        title: '"Je veux arrêter le foot"',
        category: 'Urgence',
        color: 'red',
        trigger: "L'enfant exprime le souhait d'abandonner le sport soudainement.",
        shortDesc: "Identifier si c'est de l'épuisement, un conflit ou une vraie perte d'intérêt.",
        steps: [
            { title: "Accueillir sans paniquer", desc: "Ne lui rappelez pas immédiatement tout le temps ou l'argent investi. Dites 'D'accord, on peut en parler.'." },
            { title: "Identifier la cause racine", desc: "Posez des questions ouvertes : 'Depuis quand ressens-tu ça ?'. Cherchez à savoir si c'est un problème avec le coach, la pression, ou de la fatigue." },
            { title: "Proposer de finir la période", desc: "Suggérez un deal : 'Prends 2 semaines de repos total, ou finissons ce mois-ci, et on prendra la décision ensemble à tête reposée.'" }
        ],
        redFlags: [
            "Se braquer ou se mettre en colère.",
            "Le forcer de force à aller au prochain entraînement.",
            "Faire semblant de ne pas avoir entendu."
        ]
    },
    {
        id: '3',
        title: 'Stress avant un match',
        category: 'Avant match',
        color: 'orange',
        trigger: "Mal de ventre, silence ou signes de grande anxiété le matin du match.",
        shortDesc: "Faire redescendre la pression avant un événement stressant.",
        steps: [
            { title: "Dédramatiser l'événement", desc: "Rappelez-lui que ce n'est qu'un jeu d'enfant. Dites : 'Peu importe le résultat aujourd'hui, on passera une bonne journée après'." },
            { title: "Routine rassurante", desc: "Respectez une routine stricte le matin (même musique, même petit-déjeuner) pour créer un environnement connu et sécurisant." },
            { title: "Focus sur l'effort, pas le résultat", desc: "Si vous donnez un objectif, dites 'Amuse-toi et cours beaucoup', pas 'Il faut que tu marques aujourd'hui'." }
        ],
        redFlags: [
            "Augmenter l'enjeu ('C'est un match décisif !').",
            "Lui transmettre votre propre stress (s'énerver dans les bouchons).",
            "Mettre la pression sur le résultat ('Je veux une victoire')."
        ]
    },
    {
        id: '4',
        title: 'Baisse de motivation à l\'entraînement',
        category: 'Motivation',
        color: 'blue',
        trigger: "Traîne des pieds pour aller à l'entraînement plusieurs fois de suite.",
        shortDesc: "Relancer la motivation intrinsèque de l'enfant sans le forcer.",
        steps: [
            { title: "Mesurer la fatigue", desc: "Vérifiez que ce n'est pas simplement de l'épuisement physique (surcharge scolaire + sport)." },
            { title: "Le laisser souffler", desc: "Autorisez un entraînement 'off' sans culpabilisation si la fatigue est réelle." },
            { title: "Créer l'attente", desc: "Plutôt que 'tu dois t'entraîner', passez à 'le coach compte sur ton énergie ce soir'. Rendez ça positif." }
        ],
        redFlags: [
            "Le menacer d'annuler sa licence.",
            "Comparer son implication avec un autre joueur ('Regarde Lucas, lui il y va !')."
        ]
    },
    {
        id: '5',
        title: 'Remplaçant et Injustice',
        category: 'Après match',
        color: 'orange',
        trigger: "L'enfant est remplaçant et s'en plaint amèrement en rentrant.",
        shortDesc: "Transformer la frustration du banc de touche en levier de travail.",
        steps: [
            { title: "L'écouter sans le conforter dans la victimisation", desc: "Laissez-le vider son sac. Mais ne dites pas 'tu es meilleur que l'autre, le coach a tort'." },
            { title: "Reprendre le contrôle", desc: "Posez la question : 'Qu'est-ce que TU peux faire à l'entraînement cette semaine pour lui montrer que tu mérites de jouer ?'" },
            { title: "Observer le jeu", desc: "Suggérez-lui de profiter de ses moments sur le banc pour observer comment jouent ses coéquipiers à son poste." }
        ],
        redFlags: [
            "Aller voir le coach vous-même pour vous plaindre.",
            "Lui dire que le coach est un incompétent.",
            "Lui conseiller de ne plus faire de passes."
        ]
    }
];

const COLOR_MAP = {
    red: 'bg-red-50 text-red-600 border-red-200 ring-red-500',
    orange: 'bg-orange-50 text-orange-600 border-orange-200 ring-orange-500',
    green: 'bg-loo-green-50 text-loo-green-600 border-loo-green-200 ring-loo-green-500',
    blue: 'bg-blue-50 text-blue-600 border-blue-200 ring-blue-500',
};

const CATEGORIES: Category[] = ['Tous', 'Urgence', 'Avant match', 'Après match', 'Motivation'];

export default function ProtocolesPage() {
    const [selectedCategory, setSelectedCategory] = useState<Category>('Tous');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);

    // Filter protocols
    const filteredProtocols = MOCK_PROTOCOLS.filter(p => {
        const matchesCat = selectedCategory === 'Tous' || p.category === selectedCategory;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.trigger.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (selectedProtocol) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedProtocol]);

    return (
        <div className="max-w-4xl mx-auto pb-24 relative">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Protocoles Match</h1>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-2xl">
                    Des plans d'action psychologiques et pédagogiques conçus par des professionnels pour gérer les situations de crise ou de stress avec votre enfant.
                </p>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher un mot-clé (ex: pleurs, remplaçant...)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-loo-green-500 focus:ring-1 focus:ring-loo-green-500 transition-colors"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                                    ? 'bg-gray-800 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid of Protocols */}
            {filteredProtocols.length === 0 ? (
                <div className="bg-gray-50 rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
                    <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-bold text-gray-700">Aucun protocole trouvé</h3>
                    <p className="text-gray-500 mt-1">Essayez un autre mot-clé ou filtre.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    {filteredProtocols.map((protocol, i) => (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            key={protocol.id}
                            onClick={() => setSelectedProtocol(protocol)}
                            className="bg-white text-left p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all group flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${COLOR_MAP[protocol.color].split(' ring-')[0]}`}>
                                    {protocol.category}
                                </span>
                                <ArrowRight size={18} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
                            </div>

                            <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                                {protocol.title}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                {protocol.shortDesc}
                            </p>

                            <div className="mt-auto pt-4 flex items-center gap-2 mt-4 text-xs font-medium text-gray-400">
                                <ShieldAlert size={14} className={COLOR_MAP[protocol.color].split(' text-')[1]?.split(' ')[0]} />
                                Intervenir avec cette méthode
                            </div>
                        </motion.button>
                    ))}
                </div>
            )}

            {/* Drawer Modal for Protocol Details */}
            <AnimatePresence>
                {selectedProtocol && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] flex justify-end bg-gray-900/40 backdrop-blur-sm p-2 sm:p-4"
                    >
                        {/* Background click listener to close */}
                        <div className="absolute inset-0" onClick={() => setSelectedProtocol(null)} />

                        <motion.div
                            initial={{ x: '100%', y: 0 }}
                            animate={{ x: 0, y: 0 }}
                            exit={{ x: '100%', transition: { duration: 0.2 } }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="w-full max-w-[480px] bg-white h-full max-h-screen overflow-y-auto shadow-2xl rounded-3xl p-6 flex flex-col relative z-10"
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between items-start mb-6">
                                <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest border ${COLOR_MAP[selectedProtocol.color].split(' ring-')[0]}`}>
                                    {selectedProtocol.category}
                                </span>
                                <button
                                    onClick={() => setSelectedProtocol(null)}
                                    className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-tight mb-4">
                                {selectedProtocol.title}
                            </h2>

                            {/* Trigger Context */}
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <AlertTriangle size={14} /> Le déclencheur
                                </div>
                                <p className="text-sm font-medium text-gray-700 italic">
                                    "{selectedProtocol.trigger}"
                                </p>
                            </div>

                            {/* Action Steps */}
                            <div className="space-y-6 mb-10">
                                <div className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2 border-b border-gray-100 pb-2">
                                    <CheckSquare size={16} className="text-loo-green-600" /> Plan d'action (Pas à pas)
                                </div>

                                <div className="space-y-4">
                                    {selectedProtocol.steps.map((step, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-black text-sm ${COLOR_MAP[selectedProtocol.color].split(' ring-')[0]}`}>
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800 mb-1">{step.title}</h4>
                                                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Red Flags / What not to do */}
                            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mt-auto">
                                <div className="text-sm font-black text-red-800 uppercase tracking-widest flex items-center gap-2 mb-4">
                                    <XCircle size={16} /> À Éviter Absolument
                                </div>
                                <ul className="space-y-3">
                                    {selectedProtocol.redFlags.map((flag, idx) => (
                                        <li key={idx} className="text-sm text-red-700 font-medium flex gap-2">
                                            <span className="text-red-400 font-bold shrink-0">×</span>
                                            {flag}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
