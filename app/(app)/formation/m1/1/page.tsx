import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { RuleBox, ScienceBox } from "@/components/formation/ui/Highlights";

export default function Module1Lesson1Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="LEÇON 1.1"
                    title={
                        <>
                            La Règle<br />
                            des Territoires
                        </>
                    }
                    hook="La règle la plus importante de toute la formation. Une fois comprise, elle ne se discute plus."
                />

                <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[100px] opacity-40 -mr-20 -mt-20" />
                    <div className="text-blue-600 font-bold text-xs uppercase tracking-wider mb-6 font-sans relative z-10">
                        La métaphore qui rend tout évident
                    </div>
                    <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-6 relative z-10">
                        Imaginez un chirurgien qui opère. Il y a le chirurgien et l'anesthésiste — deux spécialistes, deux territoires précis. Si l'anesthésiste commence à donner des conseils techniques au chirurgien en pleine opération, <span className="text-blue-600 font-bold">le patient est en danger.</span>
                    </p>
                    <p className="text-gray-700 text-lg relative z-10">
                        Votre enfant est sur la table d'opération chaque weekend. Le coach est le chirurgien. <strong>Vous êtes l'anesthésiste.</strong> Votre rôle est précis, essentiel — et complètement différent du sien. Le problème, c'est quand vous traversez la ligne.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 my-16">
                    {/* Coach */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="text-2xl">👨‍🏫</span>
                            <span className="font-bold text-gray-900 border-b-2 border-gray-100 pb-1">Territoire du Coach</span>
                        </div>
                        <ul className="space-y-4 text-gray-600">
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                                La tactique et les positions
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                                Le temps de jeu et les sélections
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                                Les consignes techniques
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                                La gestion du groupe
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                                La progression sportive
                            </li>
                            <li className="text-gray-400 italic text-sm mt-4">
                                ↳ Vous n'entrez pas ici.
                            </li>
                        </ul>
                    </div>

                    {/* Parent */}
                    <div className="bg-loo-green-50/50 border border-loo-green-100 rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="text-2xl">🏠</span>
                            <span className="font-bold text-loo-green-900 border-b-2 border-loo-green-200 pb-1">Votre Territoire</span>
                        </div>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-loo-green-400 rounded-full mt-2" />
                                <div><strong>Le sommeil</strong> — quantité et qualité</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-loo-green-400 rounded-full mt-2" />
                                <div><strong>La nutrition</strong> — avant, pendant, après</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-loo-green-400 rounded-full mt-2" />
                                <div><strong>L'équilibre scolaire</strong> — le filet de sécurité</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-loo-green-400 rounded-full mt-2" />
                                <div><strong>Le cadre émotionnel</strong> à la maison</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-loo-green-400 rounded-full mt-2" />
                                <div>La relation de confiance hors terrain</div>
                            </li>
                            <li className="text-loo-green-600 font-bold text-sm mt-4">
                                ↳ C'est immense. Personne d'autre ne peut le faire.
                            </li>
                        </ul>
                    </div>
                </div>

                <ScienceBox title="Ce que la neurologie confirme">
                    La surcharge cognitive causée par des instructions parentales contradictoires avec celles du coach réduit de <strong>30% la capacité de prise de décision rapide en match.</strong> L'enfant ne peut pas traiter deux sources d'autorité simultanément sous stress — son cerveau choisit la source émotionnellement dominante. C'est presque toujours le parent.
                </ScienceBox>

                <ChocQuote>
                    Un enfant avec deux entraîneurs<br />
                    dans la tête ne joue pas libre.<br />
                    <ChocText>Il joue paralysé.</ChocText>
                </ChocQuote>

                <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-8">
                    À partir d'aujourd'hui, vous arrêtez de parler de tactique. Pas pendant le match. Pas dans la voiture retour. Pas à la table du dîner. <strong>Pas « tu aurais dû ». Pas « le coach a mal joué ça ». Rien.</strong>
                </p>

                <p className="mb-12">
                    Si votre enfant vous parle de tactique, vous répondez : <em>« C'est le domaine du coach. Tu peux lui en parler directement. »</em> Vous renvoyez systématiquement vers la bonne personne.
                </p>

                <RuleBox title="Règle d'or Loopio — Leçon 1.1">
                    Le coach gère le terrain.<br />
                    Vous gérez le reste.<br />
                    Ces territoires ne se chevauchent jamais.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
