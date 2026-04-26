import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { ScienceBox, RuleBox } from "@/components/formation/ui/Highlights";

export default function Module5Lesson2Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="5.2"
                    title={
                        <>
                            Nutrition du<br />
                            Sportif en<br />
                            Croissance
                        </>
                    }
                    hook="Ce que mangent vraiment les joueurs de centre de formation. La semaine type."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8 text-center md:text-left">
                    La question n&apos;est pas <em className="italic">« est-ce que votre enfant mange bien ? »</em><br />La question est <strong>« est-ce qu&apos;il mange au bon moment ? »</strong>
                </p>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Un jeune footballeur peut manger équilibré toute la semaine et saboter sa performance de match avec un seul repas mal chronométré. Dans un centre de formation, les repas sont planifiés à l&apos;heure près. <strong>Le corps d&apos;un sportif en croissance a des fenêtres d&apos;absorption optimale.</strong>
                </p>

                {/* NUTRITION TABLE */}
                <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm my-16">
                    <div className="bg-gray-950 p-6 md:px-10 text-white flex items-center gap-4">
                        <span className="text-2xl">🥗</span>
                        <h3 className="font-bold text-xl font-sans tracking-tight">Chronologie Alimentaire</h3>
                    </div>

                    <div className="divide-y divide-gray-50 text-gray-700">
                        <div className="p-8 md:px-10 flex flex-col md:flex-row gap-6 hover:bg-gray-50/50 transition-colors">
                            <div className="md:w-40 shrink-0">
                                <div className="text-loo-green-600 font-black text-2xl mb-1 font-sans">J-1</div>
                                <div className="text-xs uppercase tracking-widest font-bold text-gray-400 font-sans">Veille du match</div>
                            </div>
                            <p className="text-sm">Glucides complexes : pâtes, riz, pain complet. Hydratation maximale. Éviter les graisses lourdes qui ralentissent la digestion.</p>
                        </div>

                        <div className="p-8 md:px-10 flex flex-col md:flex-row gap-6 hover:bg-gray-50/50 transition-colors">
                            <div className="md:w-40 shrink-0">
                                <div className="text-loo-green-600 font-black text-2xl mb-1 font-sans">Jour J</div>
                                <div className="text-xs uppercase tracking-widest font-bold text-gray-400 font-sans">Avant-match</div>
                            </div>
                            <p className="text-sm"><strong>3h avant :</strong> repas complet léger. <strong>1h avant :</strong> fruit frais. Rien dans l&apos;heure qui précède — le sang doit irriguer les muscles, pas l&apos;estomac.</p>
                        </div>

                        <div className="p-8 md:px-10 flex flex-col md:flex-row gap-6 hover:bg-gray-50/50 transition-colors">
                            <div className="md:w-40 shrink-0">
                                <div className="text-loo-green-600 font-black text-2xl mb-1 font-sans">Récup</div>
                                <div className="text-xs uppercase tracking-widest font-bold text-gray-400 font-sans">Post-match</div>
                            </div>
                            <p className="text-sm"><strong>Fenêtre des 30 min :</strong> Protéines + glucides rapides (ex: yaourt + banane). L&apos;absorption chute de 40% après cette fenêtre.</p>
                        </div>
                    </div>
                </div>

                {/* FENETRE CRITIQUE */}
                <div className="bg-loo-green-900 text-white rounded-[40px] p-10 md:p-16 my-16 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-loo-green-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 pointer-events-none" />
                    <div className="flex items-center gap-3 mb-6 text-loo-green-400 font-bold uppercase text-xs tracking-widest font-sans">
                        <span className="text-xl">⏱</span> La fenêtre critique
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black font-sans tracking-tight mb-8">Les 30 minutes<br />qui changent tout.</h3>
                    <p className="text-loo-green-50 text-lg leading-relaxed mb-10 max-w-2xl">
                        Votre enfant rentre du terrain épuisé. Il n&apos;a pas faim. Mais son corps est en mode absorption maximale. Si vous ne lui donnez rien maintenant, la récupération sera deux fois plus longue.
                    </p>
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 inline-block">
                        <p className="text-white font-bold">Solution Minute : Un yaourt grec + une banane dans la voiture.</p>
                    </div>
                </div>

                <ChocQuote>
                    Une déshydratation de 2% suffit<br />
                    à réduire la performance<br />
                    <ChocText>de 10%. 2% — c&apos;est la soif.</ChocText>
                </ChocQuote>

                <ScienceBox title="La fenêtre anabolique">
                    La fenêtre anabolique post-exercice — les 30 minutes qui suivent un effort intense — est une période de sensibilité maximale à l&apos;absorption des nutriments. Des études montrent que consommer 20 à 30g de protéines dans cette fenêtre <strong>réduit les marqueurs de fatigue de 40%</strong> le lendemain.
                </ScienceBox>

                <RuleBox title="Règle d'or Loopio — Leçon 5.2">
                    La nutrition ne se gère pas le jour du match.<br />
                    Elle se gère la veille.<br />
                    Et les 30 minutes après.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
