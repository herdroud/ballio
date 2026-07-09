"use client";

import React, { useState, useEffect } from 'react';
import { Settings, User, HeartHandshake, Shield, Check, Mail, ChevronRight, Save, Baby } from 'lucide-react';
import { getChildProfile, getParentProfile, updateChildProfile, updateParentProfile } from '@/app/actions/child';
import { APP_VERSION } from '@/lib/version';

const POSITIONS = [
    { id: 'GB', label: 'Gardien', icon: '🧤' },
    { id: 'DC', label: 'Déf. central', icon: '🛡️' },
    { id: 'LAT', label: 'Latéral', icon: '🏃' },
    { id: 'MDC', label: 'Mil. défensif', icon: '⚓' },
    { id: 'MC', label: 'Mil. central', icon: '⚙️' },
    { id: 'MOC', label: 'Mil. offensif', icon: '🪄' },
    { id: 'AIL', label: 'Ailier', icon: '⚡' },
    { id: 'ATT', label: 'Attaquant', icon: '⚽' },
];

export default function ParametresPage() {

    // Parent State
    const [parentName, setParentName] = useState('');
    const [parentEmail, setParentEmail] = useState('');

    // Profil Joueur (Child) State
    const [childFirstName, setChildFirstName] = useState('');
    const [childLastName, setChildLastName] = useState('');
    const [childBirthDate, setChildBirthDate] = useState('');
    const [playerClub, setPlayerClub] = useState('');
    const [playerPosition, setPlayerPosition] = useState('MC');
    const [childCategory, setChildCategory] = useState('');

    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            const [parent, child] = await Promise.all([
                getParentProfile(),
                getChildProfile()
            ]);

            if (parent) {
                setParentName(parent.full_name || '');
                setParentEmail(parent.email || '');
            }
            if (child) {
                setChildFirstName(child.first_name || '');
                setChildLastName(child.last_name || '');
                setChildBirthDate(child.birth_date || '');
                setPlayerClub(child.club_name || '');
                setPlayerPosition(child.position || 'MC');
                setChildCategory(child.category || '');
            }
        }
        loadData();
    }, []);

    const handleSaveAll = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);
        setSaved(false);

        try {
            // Séquentiel : le profil parent doit exister avant de créer l'enfant
            // (première sauvegarde d'un nouvel utilisateur).
            const parentRes = await updateParentProfile({ fullName: parentName, email: parentEmail });
            const childRes = await updateChildProfile({
                firstName: childFirstName,
                lastName: childLastName,
                birthDate: childBirthDate,
                clubName: playerClub,
                position: playerPosition,
                category: childCategory
            });

            if (parentRes.success && childRes.success) {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            } else {
                setError(parentRes.error || childRes.error || "Une erreur est survenue.");
            }
        } catch (err) {
            console.error(err);
            setError("Erreur lors de la sauvegarde.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto pb-24">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight flex items-center gap-3">
                    <Settings className="text-gray-400" size={32} /> Paramètres
                </h1>
                <p className="text-sm text-gray-500 mt-2">
                    Gérez vos informations et celles de votre enfant pour une expérience personnalisée.
                </p>
            </div>

            <form onSubmit={handleSaveAll} className="space-y-6">
                {/* PROFIL PARENT */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <User size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Votre Profil Parent</h2>
                            <p className="text-xs text-gray-500">Informations de contact et identité.</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Nom Complet</label>
                            <input
                                type="text"
                                required
                                value={parentName}
                                onChange={(e) => setParentName(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-loo-green-500 outline-none transition-all font-medium text-gray-800"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email</label>
                            <input
                                type="email"
                                required
                                value={parentEmail}
                                onChange={(e) => setParentEmail(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-loo-green-500 outline-none transition-all font-medium text-gray-800"
                            />
                        </div>
                    </div>
                </div>

                {/* PROFIL ENFANT */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                        <div className="w-10 h-10 rounded-full bg-loo-green-100 flex items-center justify-center text-loo-green-600">
                            <Baby size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Profil de l'Enfant</h2>
                            <p className="text-xs text-gray-500">Indispensable pour le suivi et les statistiques.</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-5">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Prénom</label>
                                <input
                                    type="text"
                                    required
                                    value={childFirstName}
                                    onChange={(e) => setChildFirstName(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-loo-green-500 outline-none transition-all font-medium text-gray-800"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Nom</label>
                                <input
                                    type="text"
                                    required
                                    value={childLastName}
                                    onChange={(e) => setChildLastName(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-loo-green-500 outline-none transition-all font-medium text-gray-800"
                                />
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Date de Naissance</label>
                                <input
                                    type="date"
                                    required
                                    value={childBirthDate}
                                    onChange={(e) => setChildBirthDate(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-loo-green-500 outline-none transition-all font-medium text-gray-800"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Club Actuel</label>
                                <input
                                    type="text"
                                    required
                                    value={playerClub}
                                    onChange={(e) => setPlayerClub(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-loo-green-500 outline-none transition-all font-medium text-gray-800"
                                />
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Catégorie (ex: U15)</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="U15"
                                    value={childCategory}
                                    onChange={(e) => setChildCategory(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-loo-green-500 outline-none transition-all font-medium text-gray-800"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Poste Préféré</label>
                            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-2">
                                {POSITIONS.map(pos => (
                                    <button
                                        key={pos.id}
                                        type="button"
                                        onClick={() => setPlayerPosition(pos.id)}
                                        className={`flex flex-col items-center p-2 rounded-xl border transition-all ${playerPosition === pos.id
                                            ? 'bg-loo-green-500 border-loo-green-500 text-white shadow-md'
                                            : 'bg-gray-50 border-gray-200 text-gray-400 hover:border-gray-300'
                                            }`}
                                    >
                                        <span className="text-lg">{pos.icon}</span>
                                        <span className="text-[9px] font-black mt-1">{pos.id}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SAVE BUTTON */}
                <div className="flex flex-col items-center gap-4">
                    {error && (
                        <div className="text-red-500 text-sm font-bold animate-shake">{error}</div>
                    )}
                    {saved && (
                        <div className="text-loo-green-600 text-sm font-bold flex items-center gap-2">
                            <Check size={18} /> Profils mis à jour avec succès !
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={isSaving}
                        className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl flex items-center justify-center gap-3 ${isSaving
                            ? 'bg-gray-100 text-gray-400'
                            : 'bg-loo-green-500 hover:bg-loo-green-600 text-white shadow-loo-green-500/20'
                            }`}
                    >
                        {isSaving ? (
                            <>
                                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                Enregistrement...
                            </>
                        ) : (
                            <>Enregistrer les Profils <Save size={20} /></>
                        )}
                    </button>
                </div>
            </form>

            {/* SUPPORT & CONTACT */}
            <div className="mt-12 space-y-6">
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <HeartHandshake size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Support Ballio</h2>
                            <p className="text-xs text-gray-500">Un problème ou une suggestion ? Contactez-nous.</p>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="space-y-3">
                            <a
                                href="mailto:contact@ballio.app"
                                className="group block bg-gray-50 border border-gray-200 rounded-2xl p-4 hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 group-hover:text-blue-600 transition-colors">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 group-hover:text-blue-800 transition-colors">Contacter le Support</h3>
                                            <p className="text-sm text-gray-500 group-hover:text-blue-600/80 transition-colors">contact@balio.fr</p>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-100 transition-all shadow-sm">
                                        <ChevronRight size={18} />
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="mt-6 flex items-start gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                            <Shield className="text-amber-600 shrink-0 mt-0.5" size={20} />
                            <div>
                                <h4 className="text-sm font-bold text-amber-900">Application 100% Gratuite</h4>
                                <p className="text-xs text-amber-700/80 leading-relaxed mt-1">
                                    Ballio est développée bénévolement. En tant que parent de jeune footballeur, mon souhait est que chaque enfant soit accompagné de la meilleure façon, et que cette application reste accessible gratuitement à tous les parents.
                                </p>
                                <p className="text-xs font-bold text-amber-800 leading-relaxed mt-2">
                                    N'hésitez pas à en parler autour de vous et à la partager sur vos réseaux sociaux pour la faire connaître ! 💪
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">Ballio {APP_VERSION}</p>
                    <p className="text-[10px] text-gray-300 mt-1">© 2026 - Conçu avec ❤️ pour les jeunes talents</p>
                </div>
            </div>
        </div>
    );
}
