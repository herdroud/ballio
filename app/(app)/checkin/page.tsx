"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
    ArrowLeft,
    Smile,
    Meh,
    Frown,
    Battery,
    Moon,
    Activity,
    CheckCircle2,
    Settings
} from 'lucide-react';

import { getChildProfile, saveWellbeing, getDailyCheckinStatus } from '@/app/actions/child';
import type { Child } from '@/app/types/db';

export default function CheckinPage() {
    const router = useRouter();

    const [child, setChild] = useState<Child | null>(null);
    const [hasCheckedIn, setHasCheckedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1);
    const [mood, setMood] = useState<number | null>(null);
    const [sleep, setSleep] = useState<number | null>(null);
    const [fatigue, setFatigue] = useState<number | null>(null);
    const [muscle, setMuscle] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const profile = await getChildProfile();
                if (profile) {
                    setChild(profile);
                    const status = await getDailyCheckinStatus(profile.id);
                    setHasCheckedIn(status.hasCheckedIn);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="max-w-xl mx-auto flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-loo-green-200 border-t-loo-green-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!child) {
        return (
            <div className="max-w-xl mx-auto pb-8">
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 text-center">
                    <div className="text-4xl mb-4">⚡</div>
                    <h1 className="text-xl font-black text-gray-900 mb-2">Check-in Quotidien</h1>
                    <p className="text-gray-500 leading-relaxed mb-6">
                        Renseignez d&apos;abord le profil de votre enfant pour démarrer le suivi bien-être.
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

    if (hasCheckedIn) {
        return (
            <div className="max-w-xl mx-auto pb-8">
                <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 text-center space-y-6">
                    <div className="w-20 h-20 bg-loo-green-50 text-loo-green-500 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 size={40} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-gray-800">Check-in déjà effectué !</h1>
                        <p className="text-gray-500 mt-2">
                            Bravo, vous avez déjà pris le pouls du bien-être de{" "}
                            <strong className="text-gray-700">{child.first_name}</strong> aujourd&apos;hui.
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            Revenez demain pour le prochain suivi.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="w-full py-4 rounded-2xl bg-gray-900 text-white font-extrabold uppercase tracking-wide transition-all hover:bg-gray-800"
                        >
                            Retour au Dashboard
                        </button>
                        <button
                            onClick={() => setHasCheckedIn(false)}
                            className="text-[11px] text-gray-400 font-bold uppercase tracking-wider hover:text-gray-600 transition-colors"
                        >
                            Modifier le check-in du jour
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else router.back();
    };

    const handleSubmit = async () => {
        if (!child) return;
        setIsSubmitting(true);
        try {
            const result = await saveWellbeing({
                child_id: child.id,
                mood: mood!,
                sleep: sleep!,
                fatigue: fatigue!,
                muscle_pain: muscle!,
            });
            if (result.success) {
                toast.success('Check-in enregistré !');
                router.push('/dashboard');
            } else {
                toast.error(result.error || 'Erreur lors de la sauvegarde.');
            }
        } catch (err) {
            console.error(err);
            toast.error('Une erreur est survenue.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isStepValid = () => {
        if (step === 1) return mood !== null;
        if (step === 2) return sleep !== null && fatigue !== null;
        if (step === 3) return muscle !== null;
        return false;
    };

    return (
        <div className="max-w-xl mx-auto pb-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <button
                    onClick={handleBack}
                    className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Check-in Quotidien</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Suivi bien-être de {child.first_name}</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="flex gap-2 mb-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                        <motion.div
                            className="h-full bg-loo-green-500"
                            initial={{ width: 0 }}
                            animate={{ width: step >= i ? '100%' : '0%' }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                ))}
            </div>

            {/* Step 1: Mood */}
            {step === 1 && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center space-y-6">
                        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto">
                            <Smile size={32} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Comment te sens-tu aujourd'hui ?</h2>
                            <p className="text-gray-500 text-sm mt-1">Ton humeur générale avant l'entraînement ou le match.</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-6">
                            {[
                                { val: 1, label: 'Difficile', icon: <Frown size={32} />, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
                                { val: 2, label: 'Moyen', icon: <Meh size={32} />, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
                                { val: 3, label: 'Super', icon: <Smile size={32} />, color: 'text-loo-green-500', bg: 'bg-loo-green-50', border: 'border-loo-green-200' },
                            ].map(opt => (
                                <button
                                    key={opt.val}
                                    onClick={() => setMood(opt.val)}
                                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${mood === opt.val
                                        ? `${opt.border} ${opt.bg} scale-105 shadow-sm`
                                        : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200 hover:bg-gray-100'
                                        }`}
                                >
                                    <div className={mood === opt.val ? opt.color : ''}>{opt.icon}</div>
                                    <span className={`text-sm font-bold ${mood === opt.val ? opt.color : 'text-gray-500'}`}>{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Step 2: Sleep & Fatigue */}
            {step === 2 && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-8">
                        {/* Sleep */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg"><Moon size={20} /></div>
                                <h3 className="font-bold text-gray-800">Qualité du sommeil</h3>
                            </div>
                            <div className="grid grid-cols-2 min-[480px]:grid-cols-4 gap-2">
                                {[
                                    { val: 1, label: 'Mauvais' },
                                    { val: 2, label: 'Moyen' },
                                    { val: 3, label: 'Bon' },
                                    { val: 4, label: 'Excellent' },
                                ].map(opt => (
                                    <button
                                        key={opt.val}
                                        onClick={() => setSleep(opt.val)}
                                        className={`py-3 rounded-xl border text-sm font-bold transition-all text-center ${sleep === opt.val
                                            ? 'border-indigo-400 bg-indigo-50 text-indigo-600'
                                            : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Fatigue */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-50 text-orange-500 rounded-lg"><Battery size={20} /></div>
                                <h3 className="font-bold text-gray-800">Niveau de fatigue</h3>
                            </div>
                            <div className="grid grid-cols-2 min-[480px]:grid-cols-4 gap-2">
                                {[
                                    { val: 1, label: 'Épuisé' },
                                    { val: 2, label: 'Fatigué' },
                                    { val: 3, label: 'En forme' },
                                    { val: 4, label: 'Pleine charge' },
                                ].map(opt => (
                                    <button
                                        key={opt.val}
                                        onClick={() => setFatigue(opt.val)}
                                        className={`py-3 rounded-xl border text-xs min-[500px]:text-sm font-bold transition-all text-center ${fatigue === opt.val
                                            ? 'border-orange-400 bg-orange-50 text-orange-600'
                                            : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Step 3: Muscular State */}
            {step === 3 && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center space-y-6">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                            <Activity size={32} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Douleurs musculaires</h2>
                            <p className="text-gray-500 text-sm mt-1">Ressens-tu des courbatures ou des douleurs inhabituelles ?</p>
                        </div>

                        <div className="space-y-3 mt-6">
                            {[
                                { val: 1, label: 'Oui, fortes douleurs (Alerte)', color: 'border-red-400 bg-red-50 text-red-600' },
                                { val: 2, label: 'Un peu (Courbatures normales)', color: 'border-amber-400 bg-amber-50 text-amber-600' },
                                { val: 3, label: 'Non, tout va bien', color: 'border-loo-green-400 bg-loo-green-50 text-loo-green-700' },
                            ].map(opt => (
                                <button
                                    key={opt.val}
                                    onClick={() => setMuscle(opt.val)}
                                    className={`w-full p-4 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between ${muscle === opt.val
                                        ? opt.color
                                        : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                                        }`}
                                >
                                    <span>{opt.label}</span>
                                    {muscle === opt.val && <CheckCircle2 size={20} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex gap-4">
                {step < 3 ? (
                    <button
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        className="w-full py-4 rounded-2xl bg-gray-900 text-white font-extrabold uppercase tracking-wide disabled:opacity-50 transition-all hover:bg-gray-800"
                    >
                        Suivant
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={!isStepValid() || isSubmitting}
                        className="w-full py-4 rounded-2xl bg-loo-green-500 text-white font-extrabold uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 transition-all hover:bg-loo-green-600 shadow-lg shadow-loo-green-500/25"
                    >
                        {isSubmitting ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            'Valider le check-in'
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
