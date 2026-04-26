import React from "react";
import { ModuleHero } from "@/components/formation/ui/ModuleHero";
import { LessonSection } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";

export default function Module1IntroPage() {
    return (
        <div className="pb-24">
            <ModuleHero
                num="1"
                title="Reprendre sa juste"
                highlight="place."
                lead={
                    <>
                        Le Module 0 vous a dit ce qui ne va pas.<br />
                        Ce module vous dit exactement quoi faire. Pas des principes. Des règles. Applicables ce soir.
                    </>
                }
            />

            <LessonSection>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-10 mb-12">
                    <span className="text-loo-green-500 font-serif text-6xl leading-none absolute -mt-4 -ml-2">"</span>
                    <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed relative z-10">
                        Sur dix enfants écartés de mon centre de formation,<br />
                        sept ne l'ont pas été pour leur niveau.<br />
                        Ils ont été écartés à cause du <span className="text-loo-green-600 font-bold">bruit autour d'eux.</span>
                    </p>
                    <div className="mt-6 text-gray-500 font-semibold text-sm uppercase tracking-wider relative z-10">
                        Directeur de préformation — Club de Ligue 2, France, 2023
                    </div>
                </div>

                <ChocQuote>
                    Le bruit autour d'eux.<br />
                    <ChocText>Il parle de vous.</ChocText>
                </ChocQuote>

                <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed mb-6">
                    Ce mot — <em>bruit</em> — ne désigne pas le son des tribunes. Il désigne la façon dont vous vous comportez avec le club, avec le coach, avec votre enfant après les matchs.
                </p>

                <p>
                    Le niveau de votre enfant peut être excellent. <strong>Si le bruit autour de lui est trop fort, le dossier se ferme.</strong> Avant qu'on ait regardé ses stats. Avant qu'on ait évalué sa technique.
                </p>

                <p>
                    Ce module est là pour vous apprendre à devenir silencieux au bon endroit — et présent au bon endroit. Ce ne sont pas la même chose.
                </p>
            </LessonSection>
        </div>
    );
}
