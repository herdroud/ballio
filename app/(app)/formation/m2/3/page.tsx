import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { RuleBox, ScienceBox } from "@/components/formation/ui/Highlights";

export default function Module2Lesson3Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="LEÇON 2.3"
                    title={
                        <>
                            Le Silence<br />
                            Actif
                        </>
                    }
                    hook="Apprendre à soutenir sans parasiter. Être présent sans intervenir. C'est une compétence."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Quand vous criez « Tire ! » depuis la touche — votre enfant vous entend.
                </p>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Et à ce moment précis, son cerveau traite votre instruction. Il compare ce que vous avez dit avec ce qu&apos;il voit sur le terrain. Il évalue. Il décide quoi écouter. Pendant ce traitement — <strong>il n&apos;est plus dans le jeu.</strong> Il a raté la passe intérieure. Il n&apos;a pas vu le démarquage. Tout ça en une demi-seconde.
                </p>

                <p className="font-sans font-black text-3xl text-red-600 mb-16">
                    Votre cri lui a coûté le bon choix.
                </p>

                <ChocQuote>
                    Le silence actif, ce n&apos;est pas l&apos;indifférence.<br />
                    <ChocText>C&apos;est la présence sans le bruit.</ChocText>
                </ChocQuote>

                <p className="text-lg text-gray-800 mb-12">
                    Vous êtes là. Il le sait. Il le sent. Mais votre silence lui dit quelque chose d&apos;essentiel : <em className="italic">« Le terrain t&apos;appartient. Pas à moi. »</em>
                </p>

                <div className="grid md:grid-cols-2 gap-8 my-16">
                    {/* NON */}
                    <div className="bg-red-50/30 border border-red-100 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-8 border-b border-red-100 pb-4">
                            <span className="text-2xl">❌</span>
                            <span className="font-bold text-red-800">Ce qu&apos;on n&apos;applaudit pas</span>
                        </div>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2" />
                                Le but sur penalty raté par le gardien
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2" />
                                La frappe spectaculaire sur une erreur adverse
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2" />
                                Le coup de chance
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2" />
                                Les instructions criées depuis la touche
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2" />
                                Le résultat final uniquement
                            </li>
                        </ul>
                    </div>

                    {/* OUI */}
                    <div className="bg-loo-green-50/50 border border-loo-green-100 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-8 border-b border-loo-green-100 pb-4">
                            <span className="text-2xl">✓</span>
                            <span className="font-bold text-loo-green-900">Ce qu&apos;on applaudit</span>
                        </div>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-loo-green-600 rounded-full mt-2" />
                                La prise de risque — même si elle échoue
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-loo-green-600 rounded-full mt-2" />
                                Le sprint sans ballon pour se démarquer
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-loo-green-600 rounded-full mt-2" />
                                La communication avec un coéquipier
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-loo-green-600 rounded-full mt-2" />
                                Le replacement défensif rapide
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-loo-green-600 rounded-full mt-2" />
                                L&apos;attitude après une erreur
                            </li>
                        </ul>
                    </div>
                </div>

                <ScienceBox title="Ce que vous entraînez sans le savoir">
                    En applaudissant uniquement les buts et les résultats visibles, vous entraînez votre enfant à <strong>jouer pour le spectaculaire plutôt que pour le collectif.</strong> Les recruteurs de centres de formation observent exactement l&apos;inverse : le comportement hors du ballon, le replacement, la communication. Ce sont ces automatismes qui distinguent les joueurs formables de ceux qui plafonnent.
                </ScienceBox>

                <RuleBox title="Règle d'or Loopio — Leçon 2.3">
                    Sur la touche : zéro consigne.<br />
                    Applaudissez l&apos;effort et l&apos;intention.<br />
                    Jamais uniquement le résultat.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
