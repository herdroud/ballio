import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { ScienceBox, RuleBox } from "@/components/formation/ui/Highlights";

export default function Module5Lesson3Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="5.3"
                    title={
                        <>
                            Prévention —<br />
                            Lire les<br />
                            Signaux
                        </>
                    }
                    hook="Détecter le surentraînement avant la blessure. Le tableau des signaux d'alarme."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    La perte d&apos;envie d&apos;aller à l&apos;entraînement — ce n&apos;est jamais de la paresse.
                </p>

                <p className="text-gray-700 leading-relaxed mb-12">
                    C&apos;est un signal. Son corps dit stop, ou son mental dit stop. Les deux méritent la même attention. Si ce signal revient régulièrement, <strong>c&apos;est une information clinique.</strong> Et si vous l&apos;ignorez, vous transformez un problème gérable en blessure — ou en arrêt complet.
                </p>

                {/* SIGNALS GRID */}
                <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm my-16">
                    <div className="bg-red-50 p-6 md:px-10 text-red-900 flex items-center gap-4 border-b border-red-100">
                        <span className="text-2xl">🚨</span>
                        <h3 className="font-bold text-xl font-sans tracking-tight uppercase">Tableau des signaux d&apos;alarme</h3>
                    </div>

                    <div className="divide-y divide-gray-50 text-gray-700">
                        <div className="p-8 md:px-10 flex gap-6 hover:bg-gray-50/50 transition-colors">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center shrink-0 text-xl font-bold">1</div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Fatigue persistante + Irritabilité</h4>
                                <p className="text-sm mb-3">Surentraînement physique. Le corps n&apos;a pas eu le temps de récupérer.</p>
                                <p className="text-sm font-bold text-loo-green-600">→ Repos 3 à 5 jours. Consultation médecin si persistance.</p>
                            </div>
                        </div>

                        <div className="p-8 md:px-10 flex gap-6 hover:bg-gray-50/50 transition-colors">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shrink-0 text-xl font-bold">2</div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Perte d&apos;appétit + Troubles du sommeil</h4>
                                <p className="text-sm mb-3">Surcharge mentale. Le système nerveux est en surchauffe.</p>
                                <p className="text-sm font-bold text-loo-green-600">→ Alléger le calendrier. Conversation sans pression.</p>
                            </div>
                        </div>

                        <div className="p-8 md:px-10 flex gap-6 hover:bg-gray-50/50 transition-colors">
                            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center shrink-0 text-xl font-bold">3</div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Douleurs genoux ou hanches</h4>
                                <p className="text-sm mb-3">Signe possible d&apos;Osgood-Schlatter (croissance). Fréquent entre 10 et 15 ans.</p>
                                <p className="text-sm font-bold text-loo-green-600">→ Consultation rapide. Ne pas forcer la reprise.</p>
                            </div>
                        </div>

                        <div className="p-8 md:px-10 flex gap-6 hover:bg-gray-50/50 transition-colors">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 text-xl font-bold">4</div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Plus de sourire (depuis + de 2 semaines)</h4>
                                <p className="text-sm mb-3">Signal mental sérieux. Ce n&apos;est pas une humeur passagère.</p>
                                <p className="text-sm font-bold text-loo-green-600">→ Chercher la cause. Psychologue du sport si besoin.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Le surentraînement n&apos;est pas causé par trop de football. Il est causé par trop de football sans suffisamment de récupération. Ce n&apos;est pas la charge qui blesse — c&apos;est le déséquilibre entre la charge et le repos. <strong>Et le repos — c&apos;est votre territoire.</strong>
                </p>

                <ScienceBox title="Overtraining syndrome">
                    Le syndrome de surentraînement se développe quand la charge dépasse la capacité de récupération sur une période prolongée. Les signes précoces — irritabilité, perte de motivation, troubles du sommeil — <strong>précèdent les blessures de plusieurs semaines</strong>. Agir tôt évite dans 80% des cas l&apos;arrêt forcé.
                </ScienceBox>

                <ChocQuote>
                    La perte d&apos;envie n&apos;est jamais de la paresse.<br />
                    C&apos;est un signal. Votre rôle est de l&apos;entendre<br />
                    <ChocText>avant que le corps ne l&apos;impose.</ChocText>
                </ChocQuote>

                <RuleBox title="Règle d&apos;or Loopio — Leçon 5.3">
                    Le repos n&apos;est pas l&apos;absence d&apos;entraînement.<br />
                    C&apos;est la condition de l&apos;entraînement.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
