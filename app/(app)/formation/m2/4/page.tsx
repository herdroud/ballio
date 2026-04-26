import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { RuleBox } from "@/components/formation/ui/Highlights";

export default function Module2Lesson4Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="LEÇON 2.4"
                    title={
                        <>
                            La Règle<br />
                            des 30 Minutes
                        </>
                    }
                    hook="Le moment où tout se gagne ou tout se perd. Le plus difficile à tenir. Le plus décisif."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Défaite deux buts à zéro. Votre enfant monte en silence dans la voiture. Il pose son sac. Il fixe la vitre.
                </p>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Son cerveau est en état de stress post-match. Le cortisol est au maximum. Son système nerveux est encore en mode combat. Il retraite chaque moment du match. Chaque erreur. Chaque occasion ratée.
                </p>

                <p className="text-gray-900 font-bold text-xl mb-12">
                    Tout ce que vous direz dans les trente prochaines minutes — il ne l&apos;entendra pas comme un conseil.
                </p>

                <ChocQuote>
                    Il l&apos;entendra<br />
                    <ChocText>comme un coup.</ChocText>
                </ChocQuote>

                {/* COMPARISON SCENARIOS */}
                <div className="grid md:grid-cols-2 gap-8 my-16">
                    {/* Version A */}
                    <div className="bg-white border-2 border-red-50 rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-[40px]" />
                        <div className="text-red-600 font-bold text-xs uppercase tracking-widest mb-6 font-sans">Version A — Ce que font 90% des parents</div>
                        <div className="text-sm font-black text-gray-400 mb-4 font-sans">Dans la voiture — 5 mins après</div>
                        <p className="text-gray-600 mb-6 italic">Le parent commence à analyser le match. « Tu aurais dû tirer en première mi-temps. » « Pourquoi t&apos;as pas joué plus simple ? » « Le coach avait raison de te changer. »</p>
                        <p className="text-gray-900 font-bold mb-4">L&apos;enfant se ferme. Il répond par monosyllabes ou ne répond plus. Il regarde par la fenêtre.</p>
                        <div className="mt-8 pt-6 border-t border-red-50 text-red-700 text-sm italic">
                            <strong>Ce que l&apos;enfant retient :</strong> J&apos;ai déçu mon père. Pas les leçons tactiques. Pas les axes de progression. La déception parentale.
                        </div>
                    </div>

                    {/* Version B */}
                    <div className="bg-loo-green-50 border-2 border-loo-green-100 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-loo-green-500/10 rounded-full blur-[40px]" />
                        <div className="text-loo-green-600 font-bold text-xs uppercase tracking-widest mb-6 font-sans">Version B — Ce que vous faites maintenant</div>
                        <div className="text-sm font-black text-gray-400 mb-4 font-sans">Trajet retour — Même match</div>
                        <p className="text-gray-700 mb-6">Vous mettez de la musique. Ou vous roulez en silence. Vous ne dites rien sur le match. Vingt minutes passent. Les épaules de votre enfant descendent légèrement. Son souffle ralentit.</p>
                        <p className="text-loo-green-800 font-black text-xl mb-4">« On mange quoi ce soir ? »</p>
                        <div className="mt-8 pt-6 border-t border-loo-green-100 text-loo-green-700 text-sm">
                            <strong>Résultat :</strong> il commence à analyser lui-même. C&apos;est ça que vous voulez. Pas votre analyse. La sienne.
                        </div>
                    </div>
                </div>

                {/* SILENCIO BOX */}
                <div className="bg-loo-green-900 text-white rounded-[32px] p-10 md:p-16 relative overflow-hidden my-16 shadow-2xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-loo-green-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 pointer-events-none" />

                    <div className="text-loo-green-400 font-bold text-xs uppercase tracking-widest text-center mb-10 font-sans relative z-10">
                        La règle — Non négociable
                    </div>

                    <div className="text-center font-sans font-black text-4xl md:text-7xl tracking-tight leading-tight mb-4 relative z-10">
                        30 minutes<br />
                        de silence.
                    </div>

                    <p className="text-lg md:text-xl font-light text-loo-green-50 leading-relaxed text-center max-w-2xl mx-auto mb-12 relative z-10">
                        Si votre enfant n&apos;en parle pas spontanément — <strong className="text-white">vous n&apos;en parlez pas.</strong> Jamais. Ce n&apos;est pas de la froideur. C&apos;est lui laisser l&apos;espace pour traiter lui-même.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 border-t border-white/10 pt-12 relative z-10">
                        <div className="text-7xl font-sans font-black text-loo-green-500">30</div>
                        <div className="text-loo-green-100 text-lg max-w-xs md:text-left text-center">
                            <strong>minutes minimum</strong> avant tout commentaire sur le match. Si l&apos;enfant n&apos;initie pas — zéro commentaire.
                        </div>
                    </div>
                </div>

                {/* DEBRIEF CARD */}
                <div className="bg-white border border-gray-100 rounded-[32px] p-10 md:p-16 shadow-sm my-16">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl shadow-sm">🧊</div>
                        <h3 className="text-2xl font-black tracking-tight text-gray-900 font-sans">Le débrief à froid — Le lendemain</h3>
                    </div>

                    <p className="text-gray-600 text-lg mb-12 border-b border-gray-50 pb-8 italic">
                        Il est <strong className="text-gray-900">initié par l&apos;enfant</strong>, pas par vous. S&apos;il n&apos;en parle pas, vous n&apos;initiez pas. S&apos;il n&apos;a pas envie d&apos;en parler, vous respectez le non.
                    </p>

                    <div className="space-y-12">
                        <div className="flex gap-8 group">
                            <div className="w-12 h-12 shrink-0 bg-blue-50 rounded-full flex items-center justify-center font-black text-blue-600 text-xl font-sans group-hover:bg-blue-600 group-hover:text-white transition-all">1</div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">L&apos;ouverture</h4>
                                <p className="text-gray-600 text-lg">Si vous initiez : <em className="text-gray-900">« Est-ce que t&apos;as envie d&apos;en parler ? »</em> Une seule fois. Respectez le non sans commentaire.</p>
                            </div>
                        </div>

                        <div className="flex gap-8 group">
                            <div className="w-12 h-12 shrink-0 bg-blue-50 rounded-full flex items-center justify-center font-black text-blue-600 text-xl font-sans group-hover:bg-blue-600 group-hover:text-white transition-all">2</div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Méthode Sandwich</h4>
                                <p className="text-gray-600 text-lg">Positif sincère → un seul axe d&apos;amélioration précis → positif de clôture. <strong className="text-gray-900 underline decoration-blue-200">Pas trois axes. Un seul.</strong></p>
                            </div>
                        </div>

                        <div className="flex gap-8 group">
                            <div className="w-12 h-12 shrink-0 bg-blue-50 rounded-full flex items-center justify-center font-black text-blue-600 text-xl font-sans group-hover:bg-blue-600 group-hover:text-white transition-all">3</div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">L&apos;angle d&apos;attaque</h4>
                                <p className="text-gray-600 text-lg">Règle absolue : <strong className="text-gray-900 underline decoration-blue-200">critiquer le geste, jamais la personne.</strong> <em className="text-red-500">Pas « tu n&apos;es pas assez rapide »</em> → <em className="text-loo-green-600">« Sur cette action, le déclenchement était tardif. »</em></p>
                            </div>
                        </div>

                        <div className="flex gap-8 group">
                            <div className="w-12 h-12 shrink-0 bg-blue-50 rounded-full flex items-center justify-center font-black text-blue-600 text-xl font-sans group-hover:bg-blue-600 group-hover:text-white transition-all">4</div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">La question magique</h4>
                                <p className="text-gray-600 text-lg text-xl italic font-serif">« Qu&apos;est-ce que tu ferais différemment si tu pouvais rejouer cette action ? »</p>
                                <p className="text-sm text-gray-400 mt-2">Vous écoutez. Vous ne corrigez pas.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <RuleBox title="Règle d'or Loopio — Leçon 2.4">
                    30 minutes de silence sur le match dans la voiture.<br />
                    Si l&apos;enfant n&apos;en parle pas — on n&apos;en parle pas.<br />
                    Jamais.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
