import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { RuleBox } from "@/components/formation/ui/Highlights";

export default function Module6Lesson3Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="6.3"
                    title={
                        <>
                            Recruteurs et<br />
                            Faux Agents —<br />
                            La Check-List
                        </>
                    }
                    hook="Les 5 red flags d'un agent toxique. La phrase de défense."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Il s&apos;approche après le match. Votre enfant vient de bien jouer. Un homme que vous n&apos;avez jamais vu. Il dit qu&apos;il représente des joueurs.
                </p>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Ce moment peut être légitime. Il peut aussi être le début d&apos;une arnaque. Le problème : les deux se ressemblent au premier contact. <strong>La différence se mesure dans les 48 heures qui suivent.</strong>
                </p>

                {/* RED FLAGS GRID */}
                <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm my-16">
                    <div className="bg-red-50 p-6 md:px-10 text-red-900 border-b border-red-100 flex items-center gap-4">
                        <span className="text-2xl">🚩</span>
                        <h3 className="font-bold text-xl font-sans tracking-tight uppercase">Cinq red flags — Un seul suffit pour stopper</h3>
                    </div>

                    <div className="divide-y divide-gray-50 text-gray-700">
                        <div className="p-8 md:px-10 hover:bg-red-50/10 transition-colors">
                            <h4 className="font-bold text-gray-900 mb-2">1. Il promet un essai sans avoir vu l&apos;enfant jouer</h4>
                            <p className="text-sm">Arnaque. Il travaille sur la crédulité parentale. Coupez le contact immédiatement.</p>
                        </div>
                        <div className="p-8 md:px-10 hover:bg-red-50/10 transition-colors">
                            <h4 className="font-bold text-gray-900 mb-2">2. Il demande des frais d&apos;inscription ou stage</h4>
                            <p className="text-sm">Illégal. La représentation d&apos;un mineur ne se monnaye jamais à l&apos;avance.</p>
                        </div>
                        <div className="p-8 md:px-10 hover:bg-red-50/10 transition-colors">
                            <h4 className="font-bold text-gray-900 mb-2">3. Il pousse à quitter le club sans proposition signée</h4>
                            <p className="text-sm">Il crée de l&apos;urgence pour vous déstabiliser. Ne bougez pas sans contrat écrit.</p>
                        </div>
                        <div className="p-8 md:px-10 hover:bg-red-50/10 transition-colors">
                            <h4 className="font-bold text-gray-900 mb-2">4. Il contacte directement votre enfant</h4>
                            <p className="text-sm">Violation du cadre légal. Signalez-le immédiatement au club et à la fédération.</p>
                        </div>
                        <div className="p-8 md:px-10 hover:bg-red-50/10 transition-colors">
                            <h4 className="font-bold text-gray-900 mb-2">5. Il crée de la rareté : « C&apos;est maintenant ou jamais »</h4>
                            <p className="text-sm">Manipulation. Un vrai professionnel accepte que vous preniez 48 heures. Toujours.</p>
                        </div>
                    </div>
                </div>

                {/* DEFENSE PHRASE */}
                <div className="bg-loo-green-900 text-white rounded-[40px] p-10 md:p-16 my-16 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-loo-green-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 pointer-events-none" />
                    <div className="flex items-center gap-3 mb-6 text-loo-green-400 font-bold uppercase text-xs tracking-widest font-sans">
                        <span className="text-xl">🛡</span> La phrase de défense
                    </div>
                    <p className="text-2xl md:text-4xl font-serif italic leading-tight mb-8">
                        « Merci. Nous travaillons uniquement avec des intermédiaires agréés FIFA. <span>Pouvez-vous me fournir votre numéro de licence ?</span> »
                    </p>
                    <p className="text-loo-green-200 text-sm leading-relaxed max-w-2xl border-t border-white/10 pt-8">
                        <strong>90% des faux agents disparaissent à cette question.</strong> Pour les 10% restants, vérifiez le numéro sur le site de la fédération. Ça prend 30 secondes.
                    </p>
                </div>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Si votre enfant est vraiment bon, les vraies discussions passent par votre club actuel ou par une invitation officielle. Un agent qui s&apos;approche sur un parking est toujours la voie secondaire. <strong>Sur la voie secondaire, vous prenez votre temps. Toujours.</strong>
                </p>

                <ChocQuote>
                    Un agent sérieux accepte<br />
                    que vous preniez 48 heures.<br />
                    <ChocText>Un agent qui crée de l&apos;urgence crée aussi le problème.</ChocText>
                </ChocQuote>

                <RuleBox title="Règle d&apos;or Loopio — Leçon 6.3">
                    Le temps est votre meilleur allié.<br />
                    Plus ils poussent, plus vous ralentissez.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
