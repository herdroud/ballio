import React from "react";
import { ModuleHero } from "@/components/formation/ui/ModuleHero";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { RuleBox, ScienceBox } from "@/components/formation/ui/Highlights";

export default function Module0IntroPage() {
    return (
        <div className="pb-24">
            <ModuleHero
                num="0"
                title="L'ennemi"
                highlight="invisible, c'est vous ?"
                lead="Ce que vous allez lire dans les prochaines minutes, personne ne vous l'a jamais dit. Ni le club. Ni l'éducateur. Et c'est précisément le problème."
                stats={{
                    num: "70%",
                    text: (
                        <>
                            <strong>des jeunes talents abandonnent le football avant 16 ans.</strong>
                            <br />
                            La cause principale n'est pas le niveau. Ce sont les parents.
                        </>
                    ),
                }}
            />

            <LessonSection>
                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-12">
                    Je ne parle pas des parents absents.
                    <br />
                    Je parle des parents présents. Les parents qui conduisent, qui encouragent, qui investissent.
                    <br />
                    <strong>Les parents comme vous.</strong>
                </p>

                <p>
                    Il y a trois ans, j'ai suivi un joueur. Yanis, onze ans, préformation régionale. Son éducateur me disait : <em>« Celui-là, si on ne le casse pas, il passe pro. »</em>
                </p>
                <p>À quinze ans, Yanis a arrêté le football.</p>
                <p>
                    Pas de blessure. Pas de conflit avec le coach. <strong>Il était épuisé de jouer pour ne pas décevoir son père.</strong> Un père qui conduisait à chaque entraînement depuis six ans. Un père qui y croyait. Qui aimait son fils.
                </p>

                <ChocQuote>
                    Il avait tout donné.<br />
                    Il avait donné trop.<br />
                    <ChocText>Et pas ce qu'il fallait.</ChocText>
                </ChocQuote>

                <p>
                    L'histoire de Yanis n'est pas exceptionnelle. Elle se répète chaque weekend dans des milliers de familles qui aiment leurs enfants — et qui ne savent pas ce qu'elles font.
                </p>
                <p className="font-semibold text-gray-900 mt-8 text-xl">
                    Ce module est là pour changer ça.
                </p>
            </LessonSection>
        </div>
    );
}
