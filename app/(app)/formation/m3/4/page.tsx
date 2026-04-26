import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { RuleBox } from "@/components/formation/ui/Highlights";

export default function Module3Lesson4Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="LEÇON 3.4"
                    title={
                        <>
                            L&apos;Agent et<br />
                            l&apos;Écosystème<br />
                            Pro
                        </>
                    }
                    hook="Quand ça devient sérieux. Les pièges. Ce que vous ne dites jamais."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Il a quinze ans. Après un tournoi, un homme s&apos;approche. Il se présente. Il dit qu&apos;il a regardé votre fils jouer.
                </p>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Ce moment arrive. Pas pour tous les enfants. Mais si votre enfant a le niveau — il arrive. Et dans ce moment, <strong>vous êtes vulnérable.</strong> Parce que vous aimez votre enfant. Parce que vous voulez que ça marche pour lui. Et parce que personne ne vous a jamais appris à naviguer dans cet écosystème.
                </p>

                <ChocQuote>
                    Un agent de joueur en France<br />
                    doit être <span className="text-loo-green-600">licencié FFF.</span><br />
                    Vérifiable. Publiquement.
                </ChocQuote>

                <p className="text-lg text-gray-800 mb-12">
                    Pas un « représentant ». Pas un « consultant ». <strong>Licencié FFF — vérifiable sur la liste publique de la fédération.</strong> Si la personne qui vous aborde ne peut pas vous donner son numéro de licence — la conversation s&apos;arrête là. Poliment. Fermement.
                </p>

                {/* RULES GRID */}
                <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm my-16">
                    <div className="bg-gray-950 p-6 md:px-10 text-white flex items-center gap-4">
                        <span className="text-2xl">⚖</span>
                        <h3 className="font-bold text-xl font-sans tracking-tight">5 Règles Face à un Agent — Non Négociables</h3>
                    </div>

                    <div className="divide-y divide-gray-50 text-gray-700">
                        <div className="p-8 md:px-10 flex gap-6 hover:bg-gray-50/50 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-black shrink-0 text-sm">1</div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Vérification de la licence FFF</h4>
                                <p className="text-sm">Demandez son numéro de licence FFF immédiatement. Vérifiez sur le site officiel. <strong>Un agent sérieux le donne sans hésitation.</strong></p>
                            </div>
                        </div>

                        <div className="p-8 md:px-10 flex gap-6 hover:bg-gray-50/50 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-black shrink-0 text-sm">2</div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Délai de signature de 7 jours</h4>
                                <p className="text-sm">Aucun document ne se signe le jour même. Délai minimum : 7 jours. <strong>Consultez un avocat spécialisé.</strong></p>
                            </div>
                        </div>

                        <div className="p-8 md:px-10 flex gap-6 hover:bg-gray-50/50 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-black shrink-0 text-sm">3</div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Filtrage parental</h4>
                                <p className="text-sm">Votre enfant n&apos;est pas présent à la première réunion. <strong>Vous filtrez d&apos;abord.</strong> S&apos;il n&apos;y a rien, il ne s&apos;est rien passé pour lui.</p>
                            </div>
                        </div>

                        <div className="p-8 md:px-10 flex gap-6 hover:bg-gray-50/50 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-black shrink-0 text-sm">4</div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Acceptation d&apos;un tiers</h4>
                                <p className="text-sm">Un agent sérieux accepte que vous consultiez un avocat. <strong>S&apos;il refuse, c&apos;est un signal d&apos;alarme majeur.</strong></p>
                            </div>
                        </div>

                        <div className="p-8 md:px-10 flex gap-6 hover:bg-gray-50/50 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-black shrink-0 text-sm">5</div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Urgence = Danger</h4>
                                <p className="text-sm">Un agent qui crée de l&apos;urgence (« c&apos;est maintenant ou jamais ») n&apos;est pas un partenaire. <strong>C&apos;est une technique de pression commerciale.</strong></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-12">
                    <div className="flex items-center gap-3 mb-2 text-red-700 font-bold uppercase text-xs tracking-widest font-sans">
                        <span>⚠</span> Ce que vous ne dites jamais à votre enfant
                    </div>
                    <p className="text-red-900 leading-relaxed">
                        Vous ne lui dites pas <strong>« un agent t&apos;a repéré »</strong> — pas avant d&apos;avoir vérifié que la démarche est sérieuse. <strong>Vous lui donneriez quelque chose à perdre.</strong>
                    </p>
                </div>

                {/* SCRIPT */}
                <div className="bg-gray-900 text-white rounded-[32px] p-10 md:p-16 relative overflow-hidden my-16 shadow-2xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-loo-green-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 pointer-events-none" />

                    <div className="flex items-center gap-4 mb-10 relative z-10">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">💬</div>
                        <h3 className="text-xl font-black text-white tracking-tight font-sans">Quand vous lui en parlez — une fois vérifié</h3>
                    </div>

                    <div className="space-y-6 font-sans text-xl md:text-2xl font-light text-loo-green-50 relative z-10">
                        <p>« Quelqu&apos;un t&apos;a remarqué. On va voir si c&apos;est sérieux. »</p>
                        <p>« Ça ne change rien à ce que tu fais à l&apos;entraînement — tu continues exactement pareil. »</p>
                        <p className="font-bold text-white">« Si ça avance, tu seras le premier à savoir. »</p>
                    </div>

                    <div className="mt-12 pt-10 border-t border-white/10 text-gray-400 text-sm leading-relaxed relative z-10 italic">
                        Ces trois phrases informent sans surestimer. Elles maintiennent le focus sur le présent. <strong>Elles ne créent pas d&apos;attente qui pourrait être déçue.</strong>
                    </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Un dernier point — le plus important. Si votre enfant est vraiment bon, les discussions sérieuses passent par <strong className="text-gray-900">le club où votre enfant joue.</strong> Par l&apos;éducateur qui appelle. Par une invitation officielle. Le bord du terrain, c&apos;est rarement là que les vraies carrières se construisent.
                </p>

                <RuleBox title="Règle d'or Loopio — Leçon 3.4">
                    Un agent sérieux accepte que vous preniez 7 jours.<br />
                    Un agent qui crée de l&apos;urgence<br />
                    crée aussi le problème.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
