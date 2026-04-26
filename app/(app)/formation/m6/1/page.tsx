import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { ScienceBox, RuleBox } from "@/components/formation/ui/Highlights";

export default function Module6Lesson1Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="6.1"
                    title={
                        <>
                            Ce que les<br />
                            Recruteurs<br />
                            Voient Vraiment
                        </>
                    }
                    hook="Détruire les mythes parentaux sur la détection. Ce qui ferme les dossiers."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Il y a ce que les parents croient. Et il y a ce qui se passe. Ce sont deux choses très différentes.
                </p>

                <p className="text-gray-700 leading-relaxed mb-12">
                    La plupart des parents pensent que le recruteur est là pour voir le dribble qui élimine trois joueurs ou le but spectaculaire. Ces éléments comptent — mais ils ne sont pas ce qui décide.
                </p>

                {/* MYTHS TABLE */}
                <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm my-16">
                    <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-100">
                        <div className="p-6 text-xs uppercase tracking-widest font-black text-gray-400 font-sans border-r border-gray-100 text-center">Ce que les parents croient</div>
                        <div className="p-6 text-xs uppercase tracking-widest font-black text-loo-green-600 font-sans text-center">Ce que les scouts évaluent</div>
                    </div>

                    <div className="divide-y divide-gray-50 text-gray-700">
                        <div className="grid grid-cols-2 group hover:bg-gray-50/50 transition-colors">
                            <div className="p-8 text-center text-gray-400 italic border-r border-gray-100 flex items-center justify-center">Dribbler plusieurs joueurs</div>
                            <div className="p-8 text-sm text-gray-900 border-l border-gray-100">Intelligence situationnelle sous pression — lire le jeu <strong>avant</strong> de recevoir le ballon.</div>
                        </div>

                        <div className="grid grid-cols-2 group bg-loo-green-50/30 hover:bg-loo-green-50 transition-colors">
                            <div className="p-8 text-center text-gray-400 italic border-r border-gray-100 flex items-center justify-center">Marquer beaucoup de buts</div>
                            <div className="p-8 text-sm text-gray-900 border-l border-loo-green-100"><strong>Le comportement à la perte de balle</strong> : réaction immédiate, remplacement. C&apos;est là que le caractère se révèle.</div>
                        </div>

                        <div className="grid grid-cols-2 group hover:bg-gray-50/50 transition-colors">
                            <div className="p-8 text-center text-gray-400 italic border-r border-gray-100 flex items-center justify-center">Être grand et rapide</div>
                            <div className="p-8 text-sm text-gray-900 border-l border-gray-100">Volume de jeu et régularité sur 10 matchs — pas une performance isolée.</div>
                        </div>

                        <div className="grid grid-cols-2 group bg-loo-green-50/30 hover:bg-loo-green-50 transition-colors">
                            <div className="p-8 text-center text-gray-400 italic border-r border-gray-100 flex items-center justify-center">Parent encourageant</div>
                            <div className="p-8 text-sm text-gray-900 border-l border-loo-green-100"><strong>Votre comportement</strong> — un entourage complexe est une variable éliminatoire indépendante du niveau technique.</div>
                        </div>
                    </div>
                </div>

                {/* STAT INSIDER */}
                <div className="bg-gray-950 text-white rounded-[40px] p-10 md:p-16 my-16 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-loo-green-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 pointer-events-none" />
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="text-loo-green-400 font-black text-6xl md:text-8xl font-sans tracking-tighter">70%</div>
                        <div>
                            <p className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">
                                Du temps d&apos;observation est consacré aux parents.
                            </p>
                            <p className="text-gray-400 italic">
                                Un parent qui crie, conteste ou contredit le coach : le recruteur note <strong>« environnement difficile »</strong>. Ce dossier s&apos;arrête là.
                            </p>
                        </div>
                    </div>
                </div>

                <ScienceBox title="Évaluation de l'environnement familial">
                    Les centres de formation intègrent systématiquement une évaluation comportementale de l&apos;entourage. Des protocoles de visites existent pour évaluer le niveau de pression parentale <strong>avant d&apos;officialiser une intégration</strong>. Un entourage jugé complexe est une variable éliminatoire.
                </ScienceBox>

                <ChocQuote>
                    Le recruteur regarde votre enfant 30% du temps.<br />
                    Il vous regarde 70%.<br />
                    <ChocText>Ce que vous faites depuis la touche est une variable de sélection.</ChocText>
                </ChocQuote>

                <RuleBox title="Règle d&apos;or Loopio — Leçon 6.1">
                    Vous ne pouvez pas aider votre enfant à marquer.<br />
                    Mais vous pouvez, à vous seul,<br />
                    faire fermer son dossier.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
