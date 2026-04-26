import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { RuleBox } from "@/components/formation/ui/Highlights";

export default function Module6Lesson2Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="6.2"
                    title={
                        <>
                            Parler au Coach<br />
                            Sans Griller<br />
                            Votre Enfant
                        </>
                    }
                    hook="La méthode en 3 étapes. La formulation exacte. Ce qu'entend le coach."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    La majorité des conflits famille-club naissent d&apos;une mauvaise conversation. Pas d&apos;un mauvais entraîneur. Pas d&apos;une mauvaise famille.
                </p>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Il y a ce que vous dites — et ce que le coach entend. Un mot mal choisi peut transformer une demande légitime en une attaque frontale contre son autorité et son jugement professionnel.
                </p>

                {/* COMPARISON BOX */}
                <div className="bg-gray-950 text-white rounded-[40px] p-8 md:p-12 my-16 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-loo-green-500 rounded-full blur-[120px] opacity-10 -mr-20 -mt-20 pointer-events-none" />

                    <div className="grid md:grid-cols-2 gap-8 relative z-10">
                        <div className="space-y-6">
                            <div>
                                <span className="text-red-400 text-xs font-black uppercase tracking-widest block mb-4">Ce que vous dites</span>
                                <p className="text-xl font-medium leading-relaxed italic opacity-80 decoration-red-900 line-through">« Mon fils mérite plus de temps de jeu. »</p>
                            </div>
                            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
                                <p className="text-red-300 font-bold mb-2">Ce que le coach entend :</p>
                                <p className="text-2xl font-black">« Vous êtes incompétent. »</p>
                                <p className="text-xs text-red-100/50 mt-4">Résultat : Dossier fragilisé.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <span className="text-loo-green-400 text-xs font-black uppercase tracking-widest block mb-4">Ce que vous dites</span>
                                <p className="text-xl font-medium leading-relaxed">« Comment puis-je aider mon fils à mériter plus de temps ? »</p>
                            </div>
                            <div className="bg-loo-green-500/10 border border-loo-green-500/20 p-6 rounded-2xl">
                                <p className="text-loo-green-300 font-bold mb-2">Ce que le coach entend :</p>
                                <p className="text-2xl font-black">« Vous êtes mon partenaire. »</p>
                                <p className="text-xs text-loo-green-100/50 mt-4">Résultat : Relation renforcée.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-lg text-gray-800 mb-12">
                    <strong>Une règle de survie :</strong> Ne demandez jamais un entretien immédiatement après un match. Les émotions sont trop fortes. On demande un rendez-vous dédié. Sans l&apos;enfant.
                </p>

                {/* PROTOCOLE */}
                <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 my-16 shadow-sm">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-10 h-10 bg-loo-green-50 rounded-xl flex items-center justify-center font-bold text-loo-green-600">✓</div>
                        <h3 className="text-lg font-black text-gray-900 font-sans uppercase tracking-tight">Méthode en 3 étapes — Parler au coach</h3>
                    </div>

                    <div className="space-y-8">
                        <div className="flex gap-6 items-start">
                            <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center font-black shrink-0">1</div>
                            <div>
                                <p className="text-gray-900 font-bold mb-1">La demande</p>
                                <p className="text-gray-600 italic">« Coach, j&apos;aimerais 10 minutes pour comprendre comment je peux soutenir le travail que vous faites avec [prénom]. »</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center font-black shrink-0">2</div>
                            <div>
                                <p className="text-gray-900 font-bold mb-1">L&apos;entretien</p>
                                <p className="text-gray-600">Vous posez des questions. Vous ne défendez pas. L&apos;objectif : comprendre ce que le coach voit que vous ne voyez pas.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center font-black shrink-0">3</div>
                            <div>
                                <p className="text-gray-900 font-bold mb-1">La clôture</p>
                                <p className="text-gray-600">« Merci. Je vais relayer ça à la maison. » Point. Aucun contre-argument. On gère le désaccord ailleurs.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <ChocQuote>
                    Vous intervenez en coulisses.<br />
                    Pas en lumière.<br />
                    <ChocText>C&apos;est ça le rôle du manager.</ChocText>
                </ChocQuote>

                <RuleBox title="Règle d&apos;or Loopio — Leçon 6.2">
                    Devant votre enfant, le coach a toujours raison.<br />
                    Les désaccords se règlent en privé,<br />
                    en posant des questions — jamais en affirmant.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
