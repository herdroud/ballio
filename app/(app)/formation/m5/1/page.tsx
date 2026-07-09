import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ScienceBox, RuleBox } from "@/components/formation/ui/Highlights";

export default function Module5Lesson1Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="5.1"
                    title={
                        <>
                            Le Sommeil —<br />
                            Arme N°1<br />
                            du Talent
                        </>
                    }
                    hook="Ce que font les joueurs de centre de formation que votre enfant ne fait pas."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Dans un internat de club professionnel, les horaires de coucher sont fixes sept jours sur sept. Pas de négociation le vendredi soir. Pas d&apos;exception.
                </p>

                <p className="text-gray-700 leading-relaxed mb-12">
                    La raison est simple : le sommeil n&apos;est pas un temps mort. <strong>C&apos;est là que le cerveau consolide ce que le corps a appris.</strong> Une compétence technique travaillée à l&apos;entraînement s&apos;inscrit dans la mémoire motrice pendant les phases de sommeil profond. Entraînement sans sommeil suffisant — le geste ne s&apos;installe pas. C&apos;est documenté, mesurable.
                </p>

                {/* SLEEP TABLE */}
                <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm my-16">
                    <div className="bg-gray-950 p-6 md:px-10 text-white flex items-center gap-4">
                        <span className="text-2xl">⏳</span>
                        <h3 className="font-bold text-xl font-sans tracking-tight">Exigences physiologiques par âge</h3>
                    </div>

                    <div className="divide-y divide-gray-50 text-gray-700">
                        <div className="p-8 md:px-10 flex flex-col md:flex-row gap-6 hover:bg-gray-50/50 transition-colors">
                            <div className="md:w-32 shrink-0">
                                <div className="text-loo-green-600 font-black text-2xl mb-1 font-sans">U6 – U11</div>
                                <div className="text-xs uppercase tracking-widest font-bold text-gray-400 font-sans">10 à 11h</div>
                            </div>
                            <p className="text-sm">La mémoire motrice se consolide pendant le sommeil. <strong>Entraînement + sommeil = progression réelle.</strong></p>
                        </div>

                        <div className="p-8 md:px-10 flex flex-col md:flex-row gap-6 hover:bg-gray-50/50 transition-colors">
                            <div className="md:w-32 shrink-0">
                                <div className="text-loo-green-600 font-black text-2xl mb-1 font-sans">U12 – U14</div>
                                <div className="text-xs uppercase tracking-widest font-bold text-gray-400 font-sans">9 à 10h</div>
                            </div>
                            <p className="text-sm">Phase de croissance active. En dessous : risque de blessure augmenté et concentration réduite.</p>
                        </div>

                        <div className="p-8 md:px-10 flex flex-col md:flex-row gap-6 hover:bg-gray-50/50 transition-colors">
                            <div className="md:w-32 shrink-0">
                                <div className="text-loo-green-600 font-black text-2xl mb-1 font-sans">U15 – U18</div>
                                <div className="text-xs uppercase tracking-widest font-bold text-gray-400 font-sans">8 à 9h</div>
                            </div>
                            <p className="text-sm">Récupération musculaire et cognitive. En dessous : décisions lentes, créativité réduite en match.</p>
                        </div>
                    </div>
                </div>

                <p className="text-lg text-gray-800 mb-12">
                    Ces chiffres ne sont pas des recommandations. <strong>Ce sont des exigences.</strong> Si votre enfant dort moins que ça régulièrement, il ne progresse pas. Il s&apos;use.
                </p>

                {/* PROTOCOLE */}
                <div className="bg-gray-900 text-white rounded-[32px] p-10 md:p-16 relative overflow-hidden my-16 shadow-2xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-loo-green-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 pointer-events-none" />

                    <div className="flex items-center gap-4 mb-10 relative z-10">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">📋</div>
                        <h3 className="text-xl font-black text-white tracking-tight font-sans uppercase">Protocole Sommeil — Les 4 règles</h3>
                    </div>

                    <div className="space-y-8 relative z-10">
                        <div className="flex gap-6">
                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 font-bold text-loo-green-400 text-sm">1</div>
                            <p className="text-loo-green-50 text-lg"><strong>Coucher fixe 7 jours sur 7.</strong> Le week-end ne déroge pas à la règle. L&apos;exception régulière est une règle qui n&apos;existe pas.</p>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 font-bold text-loo-green-400 text-sm">2</div>
                            <p className="text-loo-green-50 text-lg"><strong>Écrans éteints 1h avant.</strong> La lumière bleue retarde l&apos;endormissement et réduit le sommeil profond. Négociable zéro fois.</p>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 font-bold text-loo-green-400 text-sm">3</div>
                            <p className="text-loo-green-50 text-lg">Anxiété de match : <strong>coucher 30 minutes plus tôt</strong>. Pas plus — ça génère de l&apos;anxiété. Juste un petit bonus.</p>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 font-bold text-loo-green-400 text-sm">4</div>
                            <p className="text-loo-green-50 text-lg">Match tardif : <strong>grasse matinée autorisée.</strong> La récupération prime sur tout le reste le lendemain.</p>
                        </div>
                    </div>
                </div>

                <ScienceBox title="Mémoire procédurale et sommeil">
                    Le sommeil est la fenêtre de consolidation de la mémoire procédurale — ce qui inclut les gestes techniques sportifs. Une nuit de moins de 7h réduit de <strong>20 à 30% les performances cognitives</strong> du lendemain, incluant la vitesse de prise de décision. Ce déficit ne se rattrape pas sur une seule nuit.
                </ScienceBox>

                <RuleBox title="Règle d'or Loopio — Leçon 5.1">
                    Le sommeil est le seul entraînement que votre enfant fait sans bouger.<br />
                    C&apos;est là que le travail de la semaine s&apos;installe.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
