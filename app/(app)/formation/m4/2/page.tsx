import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { ScienceBox, RuleBox } from "@/components/formation/ui/Highlights";

export default function Module4Lesson2Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="U10 – U13"
                    title={
                        <>
                            L&apos;Âge de la<br />
                            Structuration
                        </>
                    }
                    hook="L'identité de footballeur se construit. Votre regard devient un miroir."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    À dix ans, quelque chose change. Votre enfant commence à se définir comme footballeur. Ce n&apos;est plus juste quelque chose qu&apos;il fait. C&apos;est quelque chose qu&apos;il est.
                </p>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Et c&apos;est précisément à ce moment que votre regard sur lui devient quelque chose de très puissant. Un enfant de cet âge cherche constamment une réponse à la question : <em className="italic">« Est-ce que je suis bon ? »</em> Il ne peut pas encore y répondre seul. Alors il cherche cette réponse dans les yeux de ceux qui comptent.
                </p>

                {/* MIROIR BOX */}
                <div className="bg-white border-2 border-loo-green-100 rounded-[40px] p-10 md:p-16 my-16 shadow-lg relative overflow-hidden text-center">
                    <div className="absolute top-0 left-0 w-2 h-full bg-loo-green-500" />
                    <div className="text-loo-green-600 font-bold text-xs uppercase tracking-widest mb-6 font-sans">Le concept central</div>
                    <p className="text-2xl md:text-4xl font-sans font-black text-gray-900 tracking-tight leading-tight mb-8">
                        « Ce qu&apos;il voit dans vos yeux après un match — il l&apos;intègre comme une vérité sur lui-même. »
                    </p>
                    <p className="text-gray-500 max-w-2xl mx-auto italic leading-relaxed">
                        Si vous êtes déçu — il se voit comme décevant. Si vous êtes fier — il se voit comme capable. Vous ne pouvez pas ne pas envoyer un signal. La question — c&apos;est lequel.
                    </p>
                </div>

                <p className="mb-12">
                    L&apos;erreur typique entre 10 et 13 ans, c&apos;est le parent-coach. Celui qui suit les entraînements de trop près, qui compare avec les autres, qui parle de « potentiel » et de « niveau ». Ce parent transforme le football en terrain d&apos;évaluation permanente. Et un enfant qui se sent évalué en permanence développe une chose très précise : <strong className="text-red-600">la peur de décevoir.</strong>
                </p>

                <ScienceBox title="Le reflected appraisal">
                    Entre 10 et 13 ans, le concept de soi sportif se consolide. Ce processus est fortement influencé par ce que les chercheurs appellent le <strong>reflected appraisal</strong> : l&apos;enfant intègre l&apos;évaluation de ses figures d&apos;attachement comme une réalité sur lui-même. Un parent qui exprime systématiquement de la déception contribue directement à l&apos;image que l&apos;enfant construit de ses propres capacités.
                </ScienceBox>

                <ChocQuote>
                    Ce que vous construisez à cet âge :<br />
                    la confiance qui dit — quoi qu&apos;il arrive —<br />
                    <ChocText>« tu rentres à la maison et tu es mon enfant. Pas mon joueur. »</ChocText>
                </ChocQuote>

                {/* PROTOCOLE */}
                <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 my-16 shadow-sm">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-10 h-10 bg-loo-green-50 rounded-xl flex items-center justify-center font-bold text-loo-green-600">✓</div>
                        <h3 className="text-lg font-black text-gray-900 font-sans uppercase tracking-tight">Ce que vous faites — U10-U13</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-6 items-start">
                            <div className="w-8 h-8 rounded-lg bg-loo-green-100 text-loo-green-600 flex items-center justify-center font-black shrink-0">1</div>
                            <p className="text-gray-700">Après un bon match comme après un mauvais match : <strong>même température émotionnelle</strong>. Votre humeur n&apos;est pas indexée sur ses performances.</p>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-8 h-8 rounded-lg bg-loo-green-100 text-loo-green-600 flex items-center justify-center font-black shrink-0">2</div>
                            <p className="text-gray-700">Vous ne comparez pas avec les autres enfants de l&apos;équipe — ni positivement, ni négativement.</p>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-8 h-8 rounded-lg bg-loo-green-100 text-loo-green-600 flex items-center justify-center font-black shrink-0">3</div>
                            <p className="text-gray-700">Si vous avez un avis sur le coaching : <strong>vous l&apos;exprimez en privé</strong>. Jamais devant l&apos;enfant.</p>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-8 h-8 rounded-lg bg-loo-green-100 text-loo-green-600 flex items-center justify-center font-black shrink-0">4</div>
                            <p className="text-gray-700">Votre phrase après chaque match — bonne ou mauvaise : <strong className="text-loo-green-700">« Je t&apos;ai regardé jouer. C&apos;est tout ce que je voulais. »</strong></p>
                        </div>
                    </div>
                </div>

                <RuleBox title="Règle d'or Loopio — U10-U13">
                    Votre humeur après le match<br />
                    n&apos;est pas son bulletin de notes.<br />
                    Même température. Toujours.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
