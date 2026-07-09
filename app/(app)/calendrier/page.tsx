"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, MapPin, Plus, Clock, X, Trophy, AlertTriangle, MinusCircle, CheckCircle2, Settings } from 'lucide-react';
import { toast } from 'sonner';
import {
    getPlannedMatches,
    addPlannedMatch,
    updatePlannedMatchStatus,
    type PlannedMatchStatus,
} from '@/app/actions/calendar';
import { getChildProfile } from '@/app/actions/child';
import type { PlannedMatchRow } from '@/app/types/db';

const STATUS_CONFIG: Record<PlannedMatchStatus, { label: string, color: string, bg: string, icon: React.ComponentType<{ size?: number; className?: string }> }> = {
    upcoming: { label: 'À venir', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', icon: Clock },
    won: { label: 'Victoire', color: 'text-loo-green-600', bg: 'bg-loo-green-50 border-loo-green-200', icon: Trophy },
    lost: { label: 'Défaite', color: 'text-red-600', bg: 'bg-red-50 border-red-200', icon: AlertTriangle },
    draw: { label: 'Nul', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: MinusCircle },
    cancelled: { label: 'Annulé', color: 'text-gray-500', bg: 'bg-gray-100 border-gray-200', icon: X },
};

export default function CalendarPage() {
    const [matches, setMatches] = useState<PlannedMatchRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasChild, setHasChild] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [statusMenuOpenId, setStatusMenuOpenId] = useState<string | null>(null);

    // New Match Form State
    const [newOpponent, setNewOpponent] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
    const [newLocation, setNewLocation] = useState<'Domicile' | 'Extérieur'>('Domicile');

    useEffect(() => {
        async function loadData() {
            try {
                const child = await getChildProfile();
                if (!child) {
                    setHasChild(false);
                    return;
                }
                const data = await getPlannedMatches();
                setMatches(data);
            } catch (err) {
                console.error(err);
                toast.error('Impossible de charger le calendrier.');
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const upcomingMatches = matches
        .filter(m => m.status === 'upcoming')
        .sort((a, b) => a.match_date.localeCompare(b.match_date));
    const pastMatches = matches
        .filter(m => m.status !== 'upcoming')
        .sort((a, b) => b.match_date.localeCompare(a.match_date));

    const handleAddMatch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newOpponent || !newDate || !newTime) return;

        setIsSaving(true);
        try {
            const result = await addPlannedMatch({
                opponent: newOpponent,
                match_date: newDate,
                match_time: newTime,
                location: newLocation,
            });

            if (result.success && result.data) {
                setMatches(prev => [...prev, result.data]);
                setIsAddModalOpen(false);
                setNewOpponent('');
                setNewDate('');
                setNewTime('');
                setNewLocation('Domicile');
                toast.success('Match ajouté au calendrier !');
            } else {
                toast.error(result.error || "Erreur lors de l'ajout du match.");
            }
        } catch (err) {
            console.error(err);
            toast.error('Une erreur est survenue.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateStatus = async (id: string, newStatus: PlannedMatchStatus) => {
        const previous = matches;
        // Mise à jour optimiste, rollback si échec.
        setMatches(matches.map(m => m.id === id ? { ...m, status: newStatus } : m));
        setStatusMenuOpenId(null);

        const result = await updatePlannedMatchStatus(id, newStatus);
        if (!result.success) {
            setMatches(previous);
            toast.error(result.error || 'Erreur lors de la mise à jour.');
        }
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
        return new Date(`${dateString}T00:00:00`).toLocaleDateString('fr-FR', options);
    };

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto space-y-4">
                <div className="h-16 bg-white rounded-2xl animate-pulse" />
                <div className="h-24 bg-white rounded-2xl animate-pulse" />
                <div className="h-24 bg-white rounded-2xl animate-pulse" />
            </div>
        );
    }

    if (!hasChild) {
        return (
            <div className="max-w-xl mx-auto">
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 text-center">
                    <div className="text-4xl mb-4">📅</div>
                    <h1 className="text-xl font-black text-gray-900 mb-2">Calendrier</h1>
                    <p className="text-gray-500 leading-relaxed mb-6">
                        Renseignez d&apos;abord le profil de votre enfant pour planifier ses matchs.
                    </p>
                    <Link
                        href="/parametres"
                        className="inline-flex items-center gap-2 bg-loo-green-500 hover:bg-loo-green-600 text-white font-extrabold px-6 py-3 rounded-2xl transition-colors no-underline"
                    >
                        <Settings size={18} /> Configurer le profil
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6 pb-24 relative">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Calendrier</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Tes matchs à venir et l&apos;historique</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-loo-green-500 hover:bg-loo-green-600 text-white p-3 rounded-xl shadow-lg shadow-loo-green-500/25 transition-all flex items-center justify-center"
                >
                    <Plus size={20} className="sm:mr-2" />
                    <span className="hidden sm:inline font-bold">Ajouter</span>
                </button>
            </div>

            {/* Upcoming Section */}
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2">À venir</h2>

            {upcomingMatches.length === 0 ? (
                <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200 border-dashed">
                    <CalendarIcon className="mx-auto text-gray-300 mb-3" size={32} />
                    <p className="text-gray-500 font-medium">Aucun match prévu pour le moment.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {upcomingMatches.map(match => (
                        <MatchCard
                            key={match.id}
                            match={match}
                            formatDate={formatDate}
                            statusMenuOpenId={statusMenuOpenId}
                            setStatusMenuOpenId={setStatusMenuOpenId}
                            updateMatchStatus={handleUpdateStatus}
                        />
                    ))}
                </div>
            )}

            {/* Past Section */}
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2 mt-8">Historique</h2>

            {pastMatches.length === 0 ? (
                <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200 border-dashed">
                    <p className="text-gray-500 font-medium">L&apos;historique est vide.</p>
                </div>
            ) : (
                <div className="space-y-3 opacity-90">
                    {pastMatches.map(match => (
                        <MatchCard
                            key={match.id}
                            match={match}
                            formatDate={formatDate}
                            statusMenuOpenId={statusMenuOpenId}
                            setStatusMenuOpenId={setStatusMenuOpenId}
                            updateMatchStatus={handleUpdateStatus}
                        />
                    ))}
                </div>
            )}

            {/* Add Match Modal Overlay */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-800">Ajouter un match</h3>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    aria-label="Fermer"
                                    className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleAddMatch} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">Adversaire</label>
                                    <input
                                        type="text"
                                        required
                                        value={newOpponent}
                                        onChange={e => setNewOpponent(e.target.value)}
                                        placeholder="Ex: FC Mâcon"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-loo-green-500/20 focus:border-loo-green-500 transition-all font-medium"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={newDate}
                                            onChange={e => setNewDate(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-loo-green-500/20 focus:border-loo-green-500 transition-all font-medium text-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">Heure</label>
                                        <input
                                            type="time"
                                            required
                                            value={newTime}
                                            onChange={e => setNewTime(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-loo-green-500/20 focus:border-loo-green-500 transition-all font-medium text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2 mt-2">Lieu</label>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setNewLocation('Domicile')}
                                            className={`flex-1 py-3 rounded-xl font-bold text-sm border-2 transition-all ${newLocation === 'Domicile' ? 'border-loo-green-400 bg-loo-green-50 text-loo-green-700' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'}`}
                                        >
                                            Domicile
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setNewLocation('Extérieur')}
                                            className={`flex-1 py-3 rounded-xl font-bold text-sm border-2 transition-all ${newLocation === 'Extérieur' ? 'border-loo-green-400 bg-loo-green-50 text-loo-green-700' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'}`}
                                        >
                                            Extérieur
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="w-full py-4 bg-loo-green-500 hover:bg-loo-green-600 text-white font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-loo-green-500/25 disabled:opacity-60"
                                    >
                                        {isSaving ? 'Enregistrement...' : 'Valider le match'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface MatchCardProps {
    match: PlannedMatchRow;
    formatDate: (d: string) => string;
    statusMenuOpenId: string | null;
    setStatusMenuOpenId: (id: string | null) => void;
    updateMatchStatus: (id: string, status: PlannedMatchStatus) => void;
}

function MatchCard({ match, formatDate, statusMenuOpenId, setStatusMenuOpenId, updateMatchStatus }: MatchCardProps) {
    const isMenuOpen = statusMenuOpenId === match.id;
    const config = STATUS_CONFIG[match.status];
    const Icon = config.icon;

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm relative group hover:border-gray-300 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">

                {/* Date and Opponent Info */}
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-100 min-w-[70px]">
                        <span className="text-[10px] uppercase font-bold text-gray-400 mb-0.5 tracking-wider">Heure</span>
                        <span className="text-lg font-black text-gray-800">{match.match_time || '—'}</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            vs {match.opponent}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-500 font-medium mt-1">
                            <span className="flex items-center capitalize"><CalendarIcon size={12} className="mr-1" /> {formatDate(match.match_date)}</span>
                            <span className="flex items-center"><MapPin size={12} className="mr-1" /> {match.location}</span>
                        </div>
                    </div>
                </div>

                {/* Status Badge & Actions */}
                <div className="flex items-center justify-between sm:justify-end border-t border-gray-100 sm:border-0 pt-3 sm:pt-0 mt-3 sm:mt-0 gap-3">

                    <div className="relative">
                        <button
                            onClick={() => setStatusMenuOpenId(isMenuOpen ? null : match.id)}
                            className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest hover:brightness-95 transition-all ${config.bg} ${config.color}`}
                        >
                            <Icon size={14} />
                            {config.label}
                            <div className="w-px h-3 bg-current opacity-20 mx-1"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><path d="m6 9 6 6 6-6" /></svg>
                        </button>

                        {/* Status Edit Dropdown */}
                        {isMenuOpen && (
                            <>
                                {/* Invisible backdrop to close menu */}
                                <div className="fixed inset-0 z-[100]" onClick={() => setStatusMenuOpenId(null)} />
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-xl p-1.5 z-[200] flex flex-col">
                                    {(Object.entries(STATUS_CONFIG) as [PlannedMatchStatus, typeof STATUS_CONFIG[PlannedMatchStatus]][]).map(([statusKey, val]) => {
                                        const ValIcon = val.icon;
                                        return (
                                            <button
                                                key={statusKey}
                                                onClick={() => updateMatchStatus(match.id, statusKey)}
                                                className={`flex items-center gap-2 p-2 rounded-lg text-sm font-bold text-left transition-colors hover:bg-gray-50 ${match.status === statusKey ? 'bg-gray-50 text-gray-900 pointer-events-none' : 'text-gray-600'}`}
                                            >
                                                <ValIcon size={14} className={val.color.split(' ')[0]} />
                                                {val.label}
                                                {match.status === statusKey && <CheckCircle2 size={14} className="ml-auto text-gray-400" />}
                                            </button>
                                        )
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
