import React from "react";
import { ModuleHero } from "@/components/formation/ui/ModuleHero";
import { LessonSection } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";

export default function Module3IntroPage() {
    return (
        <div className="pb-24">
            <ModuleHero
                num="3"
                title="Quand le protocole"
                highlight="ne suffit plus."
                lead={
                    <>
                        Les Modules 1 et 2 couvrent les situations normales.<br />
                        Ce module couvre ce qui sort de l&apos;ordinaire. Et ça arrive. Pas si. <strong>Quand.</strong>
                    </>
                }
            />

            <LessonSection>
                <ChocQuote>
                    Ce que vous faites dans les premières heures<br />
                    de chacune de ces situations —<br />
                    <ChocText>c&apos;est souvent ce qui détermine la suite.</ChocText>
                </ChocQuote>

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Ce module ne vous donne pas des principes généraux. Il vous donne les mots exacts. Les silences exacts. L&apos;ordre exact.
                </p>

                <p className="text-gray-700 leading-relaxed">
                    Pour quatre situations précises que vous ne pouvez pas improviser, vous allez apprendre à tenir la ligne entre le support émotionnel et l&apos;exigence sportive.
                </p>
            </LessonSection>

            <LessonSection className="mt-12 bg-red-50 border border-red-100 p-8 md:p-12 rounded-[32px] shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                    <div className="text-4xl text-red-600">✚</div>
                    <h3 className="text-xl font-bold text-red-900 font-sans">Les situations de crise traitées</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/60 p-6 rounded-2xl border border-white">
                        <div className="text-red-600 font-bold text-xs uppercase tracking-widest mb-2 font-sans">3.1</div>
                        <div className="font-bold text-gray-900 mb-2">L&apos;erreur fatale</div>
                        <p className="text-sm text-gray-600 italic">Il rate le penalty en finale. Il coûte le titre. Comment gérer les 24 premières heures.</p>
                    </div>
                    <div className="bg-white/60 p-6 rounded-2xl border border-white">
                        <div className="text-red-600 font-bold text-xs uppercase tracking-widest mb-2 font-sans">3.2</div>
                        <div className="font-bold text-gray-900 mb-2">L&apos;envie d&apos;arrêter</div>
                        <p className="text-sm text-gray-600 italic">« Je veux arrêter le foot. » La réaction qui conditionne toute la suite de sa vie sportive.</p>
                    </div>
                    <div className="bg-white/60 p-6 rounded-2xl border border-white">
                        <div className="text-red-600 font-bold text-xs uppercase tracking-widest mb-2 font-sans">3.3</div>
                        <div className="font-bold text-gray-900 mb-2">La blessure longue</div>
                        <p className="text-sm text-gray-600 italic">Plus de 3 semaines d&apos;arrêt. Maintenir le lien avec le groupe et avec son identité hors-foot.</p>
                    </div>
                    <div className="bg-white/60 p-6 rounded-2xl border border-white">
                        <div className="text-red-600 font-bold text-xs uppercase tracking-widest mb-2 font-sans">3.4</div>
                        <div className="font-bold text-gray-900 mb-2">L&apos;agent / Le milieu Pro</div>
                        <p className="text-sm text-gray-600 italic">Quand on commence à vous approcher au bord du terrain. Les 5 règles non-négociables.</p>
                    </div>
                </div>
            </LessonSection>
        </div>
    );
}
