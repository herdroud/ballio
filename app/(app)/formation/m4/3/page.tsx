import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { ScienceBox, RuleBox } from "@/components/formation/ui/Highlights";

export default function Module4Lesson3Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="U14 – U16"
                    title={
                        <>
                            L&apos;Âge de la<br />
                            Séparation
                        </>
                    }
                    hook="Il prend de l'autonomie. Votre rôle change radicalement — et c'est une bonne nouvelle."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Il ne vous raconte plus tout. Après les matchs, il préfère parler avec ses coéquipiers. Il a des avis que vous ne partagez pas toujours.
                </p>

                <ChocQuote>
                    Ce n&apos;est pas une porte<br />
                    qui se ferme.<br />
                    <ChocText>C&apos;est lui qui apprend à tenir debout.</ChocText>
                </ChocQuote>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Entre 14 et 16 ans, la séparation progressive est un processus neurologique normal. Son cerveau construit son autonomie. <strong>Et votre rôle — à ce moment précis — est de le laisser le faire. Pas de disparaître. Mais de reculer d&apos;un pas.</strong>
                </p>

                <ScienceBox title="Autonomie et plafonnement">
                    Les études sur le développement sportif montrent que les athlètes qui atteignent le meilleur niveau adulte sont ceux qui ont eu, entre 14 et 16 ans, une <strong>progressivité d&apos;autonomie dans leurs décisions sportives</strong>. Le contrôle parental excessif à cet âge est corrélé à un plafonnement précoce des compétences.
                </ScienceBox>

                {/* PRESENCE GRID */}
                <div className="grid md:grid-cols-2 gap-8 my-16">
                    <div className="bg-loo-green-50/50 border border-loo-green-100 rounded-3xl p-8 relative overflow-hidden">
                        <div className="text-loo-green-600 font-bold text-xs uppercase tracking-widest mb-6 font-sans">La présence disponible ✓</div>
                        <h4 className="text-xl font-bold text-loo-green-900 mb-4">Quand il vient — vous êtes là</h4>
                        <p className="text-gray-700 leading-relaxed">Pleinement. Sans téléphone. Sans l&apos;autre chose que vous étiez en train de faire. <strong>Quand il vient — vous êtes là.</strong> Vous continuez de venir aux matchs. Vous posez des questions — mais des questions différentes.</p>
                    </div>

                    <div className="bg-red-50/30 border border-red-100 rounded-3xl p-8 relative overflow-hidden">
                        <div className="text-red-700 font-bold text-xs uppercase tracking-widest mb-6 font-sans">Ce que vous évitez ✗</div>
                        <h4 className="text-xl font-bold text-red-900 mb-4">Reprendre le contrôle</h4>
                        <p className="text-gray-700 leading-relaxed italic opacity-80">Revenir sur les décisions du coach. Imposer le rythme des conversations. Créer de l&apos;urgence autour des enjeux sportifs. <strong>Un adolescent sous pression parentale se ferme.</strong></p>
                    </div>
                </div>

                {/* QUESTIONS TABLE */}
                <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm my-16">
                    <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-100">
                        <div className="p-6 text-xs uppercase tracking-widest font-black text-gray-400 font-sans border-r border-gray-100 text-center">Avant</div>
                        <div className="p-6 text-xs uppercase tracking-widest font-black text-loo-green-600 font-sans text-center">Maintenant</div>
                    </div>

                    <div className="divide-y divide-gray-50">
                        <div className="grid grid-cols-2">
                            <div className="p-6 text-center text-gray-400 italic border-r border-gray-100">« Comment tu as joué ? »</div>
                            <div className="p-6 text-center text-gray-900 font-bold">« Comment tu te sens dans le groupe ? »</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="p-6 text-center text-gray-400 italic border-r border-gray-100">« Le coach t&apos;a mis à quel poste ? »</div>
                            <div className="p-6 text-center text-gray-900 font-bold">« Est-ce que tu aimes encore autant jouer ? »</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="p-6 text-center text-gray-400 italic border-r border-gray-100">« T&apos;aurais dû faire ça différemment »</div>
                            <div className="p-6 text-center text-gray-900 font-bold">« Tu veux en parler ou décompresser ? »</div>
                        </div>
                    </div>
                </div>

                <RuleBox title="Règle d'or Loopio — U14-U16">
                    Devenez une présence disponible.<br />
                    Il vient — vous êtes là.<br />
                    Il ne vient pas — vous restez visible sans insister.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
