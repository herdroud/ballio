import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { RuleBox, ScienceBox } from "@/components/formation/ui/Highlights";

export default function Module1Lesson3Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="LEÇON 1.3"
                    title={
                        <>
                            Votre Corps<br />
                            Parle<br />
                            Avant Vous
                        </>
                    }
                    hook="La préparation mentale n'est pas que pour les joueurs. Vous aussi, vous vous préparez."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-12">
                    Dans la voiture, le matin d'un match. Vous n'avez rien dit encore. Mais vos épaules sont légèrement hautes. Votre mâchoire un peu serrée. Vous conduisez différemment.
                </p>

                <p>
                    Votre enfant, sur le siège passager, <strong>lit tout ça.</strong> Pas consciemment. Neurologiquement. Son système nerveux capte votre état et s'y ajuste. Vous n'avez pas prononcé un mot sur le match — et vous l'avez déjà stressé.
                </p>

                <ScienceBox title="Co-régulation émotionnelle">
                    Les enfants régulent leur système nerveux en miroir de celui de leurs parents. Un parent anxieux avant un match produit chez l'enfant une <strong>élévation du cortisol mesurable</strong> — même sans interaction verbale. Le corps transmet avant les mots. C'est documenté, reproductible, et dans votre contrôle.
                </ScienceBox>

                <ChocQuote>
                    Les meilleurs coaches du monde<br />
                    se préparent mentalement<br />
                    <ChocText>avant de parler à leurs joueurs.</ChocText>
                </ChocQuote>

                <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-12">
                    Vous êtes l'entraîneur émotionnel de votre enfant. Et la plupart du temps, vous arrivez au terrain sans vous être préparé. <strong>La technique qui suit prend 5 minutes. Elle change l'état dans lequel vous entrez dans la voiture.</strong>
                </p>

                {/* RESPIRATION 4-4-4 */}
                <div className="bg-white border border-blue-100 rounded-[32px] p-8 md:p-12 shadow-sm my-16">
                    <div className="text-blue-600 font-bold text-xs uppercase tracking-widest text-center mb-10 font-sans">
                        La Respiration Tactique (4-4-4)
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all">🫁</div>
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="font-black text-3xl font-sans text-gray-900">4</span>
                                <span className="font-bold text-gray-400 uppercase text-xs tracking-widest">sec</span>
                            </div>
                            <h4 className="font-black text-gray-900 mb-2">Inspirez</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">Inspiration lente par le nez. Comptez jusqu&apos;à 4 mentalement.</p>
                        </div>

                        <div className="text-center group">
                            <div className="w-20 h-20 bg-loo-green-50 text-loo-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 group-hover:scale-110 group-hover:bg-loo-green-100 transition-all">⏸</div>
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="font-black text-3xl font-sans text-gray-900">4</span>
                                <span className="font-bold text-gray-400 uppercase text-xs tracking-widest">sec</span>
                            </div>
                            <h4 className="font-black text-gray-900 mb-2">Bloquez</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">Poumons pleins. Ne forcez pas. Retenez simplement.</p>
                        </div>

                        <div className="text-center group">
                            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all">💨</div>
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="font-black text-3xl font-sans text-gray-900">4</span>
                                <span className="font-bold text-gray-400 uppercase text-xs tracking-widest">sec</span>
                            </div>
                            <h4 className="font-black text-gray-900 mb-2">Expirez</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">Expiration lente par la bouche. Relâchez les épaules.</p>
                        </div>
                    </div>

                    <p className="mt-12 text-center text-gray-400 font-medium italic text-sm">
                        Répétez 3 cycles minimum. Seul. Avant d&apos;entrer dans la voiture.
                    </p>
                </div>

                {/* CHECKLIST */}
                <div className="bg-gray-50 border border-gray-100 rounded-[32px] p-8 md:p-12 my-16">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-xl">📋</div>
                        <h3 className="text-xl font-black text-gray-900 tracking-tight font-sans">
                            Protocole pré-match parent — Du vendredi soir au dépôt
                        </h3>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-6 items-start">
                            <div className="shrink-0 w-8 h-8 rounded-lg border-2 border-loo-green-200 bg-white mt-1" />
                            <div>
                                <div className="text-loo-green-600 font-bold text-xs uppercase tracking-wider mb-1 font-sans">Veille — 20h</div>
                                <h4 className="font-bold text-gray-900 text-lg mb-1 leading-snug">Groupes WhatsApp du club en <strong>silencieux</strong>.</h4>
                                <p className="text-gray-500 text-sm">Pas de classements, pas de stats adverses. Vous n&apos;êtes pas le staff.</p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="shrink-0 w-8 h-8 rounded-lg border-2 border-loo-green-200 bg-white mt-1" />
                            <div>
                                <div className="text-loo-green-600 font-bold text-xs uppercase tracking-wider mb-1 font-sans">Matin du match — Avant la voiture</div>
                                <h4 className="font-bold text-gray-900 text-lg mb-1 leading-snug"><strong>5 minutes, seul.</strong> Respiration 4-4-4. 3 cycles minimum.</h4>
                                <p className="text-gray-500 text-sm">Dans votre chambre, dans le jardin, dans la salle de bain. Peu importe où. Seul.</p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="shrink-0 w-8 h-8 rounded-lg border-2 border-loo-green-200 bg-white mt-1" />
                            <div>
                                <div className="text-loo-green-600 font-bold text-xs uppercase tracking-wider mb-1 font-sans">Dans la voiture aller</div>
                                <h4 className="font-bold text-gray-900 text-lg mb-1 leading-snug">Musique neutre ou silence. <strong>Zéro briefing. Zéro rappel de consignes.</strong></h4>
                                <p className="text-gray-500 text-sm">Vous pouvez parler d&apos;autre chose normalement. Ou rouler en silence. Les deux sont corrects.</p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="shrink-0 w-8 h-8 rounded-lg border-2 border-loo-green-200 bg-white mt-1" />
                            <div>
                                <div className="text-loo-green-600 font-bold text-xs uppercase tracking-wider mb-1 font-sans">Au dépôt — Une seule phrase</div>
                                <h4 className="font-bold text-gray-900 text-lg mb-1 leading-snug"><strong>« Amuse-toi. Prends des risques. Je suis là pour te regarder jouer. »</strong></h4>
                                <p className="text-gray-500 text-sm">Puis vous le laissez partir. Pas de prolongement. Pas de regard appuyé. Vous le laissez partir.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <RuleBox title="Règle d'or Loopio — Leçon 1.3">
                    Vous ne pouvez pas demander à votre enfant d'être calme et concentré si vous arrivez tendu.<br />
                    Préparez-vous. Comme lui.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
