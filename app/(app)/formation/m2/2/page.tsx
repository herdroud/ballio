import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { ScienceBox } from "@/components/formation/ui/Highlights";

export default function Module2Lesson2Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="LEÇON 2.2"
                    title={
                        <>
                            Le Script<br />
                            de la Voiture<br />
                            Aller
                        </>
                    }
                    hook="Une seule phrase. Rien d'autre. Ce n'est pas de la paresse — c'est de la précision."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-12">
                    Voici la phrase exacte.
                </p>

                {/* BOX SILENCIO M0/M1 style override for M2 */}
                <div className="bg-red-900 text-white rounded-[32px] p-10 md:p-16 relative overflow-hidden my-16 shadow-2xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-red-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 pointer-events-none" />

                    <div className="text-red-400 font-bold text-xs uppercase tracking-widest text-center mb-10 font-sans relative z-10">
                        Le script — Mot pour mot
                    </div>

                    <div className="text-center font-sans font-black text-4xl md:text-6xl tracking-tight leading-tight mb-12 relative z-10">
                        « Amuse-toi.<br />
                        Prends des risques.<br />
                        Je suis là pour te regarder jouer. »
                    </div>

                    <p className="text-lg md:text-xl font-light text-red-50 leading-relaxed text-center max-w-2xl mx-auto relative z-10">
                        Et rien d&apos;autre. Pas <em className="italic">« tu te rappelles ce qu&apos;on a travaillé »</em>. Pas <em className="italic">« le coach t&apos;a mis titulaire, profites-en »</em>. Pas <em className="italic">« les recruteurs seront là »</em>. <strong className="text-white font-bold">Rien d&apos;autre.</strong>
                    </p>
                </div>

                <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-12">
                    Cette phrase fait trois choses simultanément — et aucune n&apos;est anodine.
                </p>

                <div className="bg-white border border-gray-100 rounded-[32px] p-10 md:p-16 shadow-sm my-16">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-2xl shadow-sm">🎯</div>
                        <h3 className="text-2xl font-black tracking-tight text-gray-900 font-sans">Ce que chaque mot accomplit</h3>
                    </div>

                    <div className="space-y-12">
                        <div className="flex gap-8 items-start group">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center font-black text-red-600 text-xl font-sans group-hover:bg-red-600 group-hover:text-white transition-all">1</div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">« Amuse-toi »</h4>
                                <p className="text-gray-600 leading-relaxed text-lg">Recentre sur le plaisir, pas le résultat. Votre enfant retrouve la raison pour laquelle il a commencé ce sport.</p>
                            </div>
                        </div>

                        <div className="flex gap-8 items-start group">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center font-black text-red-600 text-xl font-sans group-hover:bg-red-600 group-hover:text-white transition-all">2</div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">« Prends des risques »</h4>
                                <p className="text-gray-600 leading-relaxed text-lg">Lui donne explicitement la permission d&apos;échouer. C&apos;est un cadeau. Un enfant autorisé à échouer prend les dribbles, tente les passes difficiles, exprime son jeu.</p>
                            </div>
                        </div>

                        <div className="flex gap-8 items-start group">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center font-black text-red-600 text-xl font-sans group-hover:bg-red-600 group-hover:text-white transition-all">3</div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">« Je suis là pour te regarder jouer »</h4>
                                <p className="text-gray-600 leading-relaxed text-lg">Retire le regard évaluatif. Ce n&apos;est plus une audition. C&apos;est un match. Vous êtes spectateur, pas juge.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <ChocQuote>
                    Trois phrases. Zéro attente.<br />
                    <ChocText>Maximum de liberté.</ChocText>
                </ChocQuote>

                <ScienceBox title="Pourquoi le silence après est aussi important que les mots">
                    Après la phrase, <strong>vous ne prolongez pas.</strong> Le cerveau de votre enfant a besoin des 10 à 20 minutes de trajet pour intégrer son état mental de match — sans nouvelle information à traiter. Chaque phrase supplémentaire que vous ajoutez est une charge cognitive qui s&apos;installe avant le coup d&apos;envoi.
                </ScienceBox>
            </LessonSection>
        </div>
    );
}
