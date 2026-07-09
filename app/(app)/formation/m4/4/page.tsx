import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ScienceBox, RuleBox } from "@/components/formation/ui/Highlights";

export default function Module4Lesson4Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="U17 – U18"
                    title={
                        <>
                            L&apos;Âge de la<br />
                            Décision
                        </>
                    }
                    hook="Le carrefour. Votre rôle final : conseiller, pas moteur."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Cette saison, tout est plus sérieux. Les matchs ont du public. Il y a peut-être un club qui a montré de l&apos;intérêt.
                </p>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Et vous regardez votre enfant. Vous le voyez jouer. Et vous avez une question que vous n&apos;osez peut-être pas formuler : <strong className="text-gray-900 italic">est-ce qu&apos;il peut vraiment ?</strong>
                </p>

                <p className="mb-12">
                    Il y a deux erreurs opposées à cet âge. La première — pousser vers le pro quand le chemin n&apos;est pas tracé. La deuxième — couper le rêve par excès de réalisme. Ces deux erreurs font la même chose : <strong className="text-red-700">elles remplacent le jugement de votre enfant par le vôtre.</strong> À 17 ans — votre enfant doit être l&apos;auteur de sa décision.
                </p>

                <ScienceBox title="Autonomie décisionnelle et résilience">
                    Les études sur la transition sport-études montrent que les deux variables les plus importantes dans la résilience post-carrière sont : la qualité du cadre scolaire maintenu, et <strong>l&apos;autonomie décisionnelle perçue par le jeune</strong>. Les sportifs qui ont le sentiment que leur trajectoire a été choisie par leurs parents présentent davantage de difficultés d&apos;adaptation lors des transitions.
                </ScienceBox>

                {/* ROLES */}
                <div className="space-y-8 my-16">
                    <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-12 h-12 shrink-0 bg-loo-green-900 text-white rounded-full flex items-center justify-center font-black text-xl font-sans">1</div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Maintenez le filet de sécurité</h4>
                            <p className="text-gray-600 leading-relaxed">L&apos;école. Les études. L&apos;orientation. <strong>Pas comme une alternative honteuse — comme ce qui lui permet de prendre des risques.</strong> Un enfant qui sait qu&apos;il a un filet ose sauter plus haut.</p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-12 h-12 shrink-0 bg-loo-green-900 text-white rounded-full flex items-center justify-center font-black text-xl font-sans">2</div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Si on vous demande — soyez honnête</h4>
                            <p className="text-gray-600 leading-relaxed">Pas ce qu&apos;il veut entendre. Pas ce que vous voudriez qu&apos;il fasse. <strong>Ce que vous voyez vraiment.</strong> Avec bienveillance. Mais sans mentir.</p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-12 h-12 shrink-0 bg-loo-green-900 text-white rounded-full flex items-center justify-center font-black text-xl font-sans">3</div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Respectez sa décision finale</h4>
                            <p className="text-gray-600 leading-relaxed">Même si elle est différente de ce que vous auriez choisi. S&apos;il tente le pro contre votre avis — accompagnez-le. S&apos;il arrête — accompagnez-le. <strong>À 17 ans — c&apos;est sa vie.</strong></p>
                        </div>
                    </div>
                </div>

                <RuleBox title="Règle d'or Loopio — U17-U18">
                    Votre rôle final :<br />
                    miroir honnête et filet de sécurité.<br />
                    Pas moteur. Pas frein. Miroir.
                </RuleBox>

                {/* CLOSING: L'ARCHITECTE INVISIBLE */}
                <div className="mt-32 border-t pt-24 pb-12">
                    <div className="text-loo-green-600 font-bold text-xs uppercase tracking-widest mb-6 text-center font-sans">Dernière image de la formation</div>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed text-center max-w-3xl mx-auto mb-16 italic font-serif">
                        Les meilleurs parents de footballeurs — ceux dont les enfants se souviennent avec gratitude — <strong className="text-gray-900">ils ne sont presque jamais dans les histoires de carrière.</strong><br /><br />
                        Le parent — il est dans les histoires <strong>d&apos;avant et d&apos;après.</strong> Dans la voiture. Dans la cuisine. Dans le silence du retour.
                    </p>

                    <div className="text-center font-sans font-black text-5xl md:text-8xl tracking-tighter text-gray-900 mb-8">
                        L&apos;architecte<br />
                        <span className="text-loo-green-600">invisible.</span>
                    </div>

                    <p className="text-center text-gray-400 uppercase tracking-widest font-bold text-sm">
                        Vous n&apos;êtes pas dans le film. Vous êtes ce qui permet au film d&apos;exister.
                    </p>
                </div>

                {/* FINAL CTA INLINE */}
                <div className="mt-32 bg-loo-green-900 rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-loo-green-500 rounded-full blur-[160px] opacity-20 -mr-20 -mt-20 pointer-events-none" />
                    <div className="text-loo-green-400 font-bold text-xs uppercase tracking-widest mb-8 font-sans relative z-10">Formation terminée</div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 relative z-10">Vous avez la formation complète.</h2>
                    <p className="text-loo-green-100 text-lg md:text-xl max-w-2xl mx-auto mb-12 relative z-10">
                        Les règles de fond. Le protocole jour de match. La trousse de secours. Et la carte de votre évolution de 6 à 18 ans. <strong>Vous n&apos;improvisez plus. Vous êtes prêt.</strong>
                    </p>
                    <div className="relative z-10">
                        <button className="bg-white text-loo-green-900 px-10 py-5 rounded-full font-black uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-xl shadow-loo-green-950/20">
                            Retour à l&apos;accueil formation
                        </button>
                    </div>
                </div>
            </LessonSection>
        </div>
    );
}
