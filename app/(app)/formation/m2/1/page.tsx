import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { RuleBox } from "@/components/formation/ui/Highlights";

export default function Module2Lesson1Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="LEÇON 2.1"
                    title="Le Vendredi Soir"
                    hook="Installer la sérénité 12 heures avant le match. Pas la veille sur le terrain — la veille dans votre tête."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Le vendredi soir, vous ne préparez pas votre enfant. Vous vous préparez vous.
                </p>

                <p className="mb-12 text-gray-700">
                    Le match commence dans vos comportements bien avant le coup d&apos;envoi. La veille, votre enfant observe votre état. Il capte si vous cherchez les résultats de l&apos;adversaire. Il entend si vous parlez du match avec votre conjoint après le dîner. Il ressent si le silence à la maison est lourd.
                </p>

                <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm my-16">
                    <div className="bg-loo-green-900 p-6 md:px-10 text-white">
                        <h3 className="font-bold text-xl">Vendredi Soir</h3>
                        <p className="text-loo-green-300 text-sm">Ce que vous faites — et ce que vous ne faites pas</p>
                    </div>

                    <div className="divide-y divide-gray-50">
                        {/* Repas */}
                        <div className="p-6 md:p-10 flex gap-6 items-start hover:bg-gray-50/50 transition-colors">
                            <div className="shrink-0 w-16 text-loo-green-600 font-bold text-sm pt-1">Repas</div>
                            <div className="space-y-1">
                                <div className="font-bold text-gray-900">Repas normal</div>
                                <p className="text-gray-600">Pas de <strong>« chargement »</strong> spécial qui signale que demain est important. Un repas comme les autres. Le rituel de table du Module 1 s&apos;applique.</p>
                            </div>
                        </div>

                        {/* 20h00 */}
                        <div className="p-6 md:p-10 flex gap-6 items-start hover:bg-gray-50/50 transition-colors">
                            <div className="shrink-0 w-16 text-loo-green-600 font-bold text-sm pt-1">20h00</div>
                            <div className="space-y-1">
                                <div className="font-bold text-gray-900">Groupes WhatsApp du club : silencieux</div>
                                <p className="text-gray-600">Pas de classements, pas de stats adverses. <strong>Vous n&apos;êtes pas le staff.</strong> Cette information ne vous appartient pas.</p>
                            </div>
                        </div>

                        {/* Interdit */}
                        <div className="p-6 md:p-10 flex gap-6 items-start bg-red-50/30">
                            <div className="shrink-0 w-16 text-red-600 font-bold text-xs uppercase tracking-wider pt-1">Interdit</div>
                            <div className="space-y-1">
                                <div className="font-bold text-red-800">Regarder les vidéos de l&apos;adversaire ensemble</div>
                                <p className="text-gray-700">Vous n&apos;êtes pas le staff. Cette préparation n&apos;est pas votre rôle — elle crée de la pression supplémentaire, pas de la confiance.</p>
                            </div>
                        </div>

                        {/* Coucher */}
                        <div className="p-6 md:p-10 flex gap-6 items-start hover:bg-gray-50/50 transition-colors">
                            <div className="shrink-0 w-16 text-loo-green-600 font-bold text-sm pt-1">Coucher</div>
                            <div className="space-y-1">
                                <div className="font-bold text-gray-900">Coucher habituel + 30 minutes</div>
                                <p className="text-gray-600">Si votre enfant parle du match : validez l&apos;émotion brièvement. <em className="italic text-gray-900">« Tu es prêt. »</em> Point. <strong>Pas de développement. Pas de briefing de dernière minute.</strong></p>
                            </div>
                        </div>
                    </div>
                </div>

                <RuleBox title="Règle d'or Loopio — Leçon 2.1">
                    Le vendredi soir, vous installez le calme.<br />
                    Pas l&apos;excitation. Pas la préparation.<br />
                    Le calme.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
