import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { ScienceBox, RuleBox } from "@/components/formation/ui/Highlights";

export default function Module6Lesson4Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="6.4"
                    title={
                        <>
                            Les Réseaux<br />
                            Sociaux —<br />
                            Le Contrat<br />
                            Numérique
                        </>
                    }
                    hook="Highlights vs Réalité. La dopamine de la hype. Le contrat à signer."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Votre enfant compare son quotidien d&apos;entraînement aux highlights de carrières entières.
                </p>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Le danger n&apos;est pas le téléphone. C&apos;est l&apos;illusion qu&apos;il crée. Un jeune joueur voit le dribble de Mbappé à 16 ans, vu 8 millions de fois, sans voir les 10 000 heures de travail invisible derrière. <strong>Cette comparaison silencieuse détruit la motivation.</strong>
                </p>

                {/* COMPARISON GRID */}
                <div className="grid md:grid-cols-2 gap-8 my-16">
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                        <span className="text-loo-green-600 font-bold text-xs uppercase tracking-widest mb-6 block font-sans">Ce qu&apos;il voit</span>
                        <h4 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Le Highlight</h4>
                        <p className="text-gray-500 text-sm leading-relaxed italic">Filmé. Monté. Dopé à la musique. Un geste parfait isolé de tout échec. L&apos;illusion d&apos;une facilité déconcertante.</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                        <span className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-6 block font-sans">Ce qu&apos;il ne voit pas</span>
                        <h4 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Le Travail Invisible</h4>
                        <p className="text-gray-500 text-sm leading-relaxed italic">Les séances à 6h du matin. Les répétitions ratées. La progression lente, frustrante et non-filmable.</p>
                    </div>
                </div>

                {/* PROTOCOLE CONTRAT */}
                <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 my-16 shadow-sm">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-10 h-10 bg-loo-green-50 rounded-xl flex items-center justify-center font-bold text-loo-green-600">📝</div>
                        <h3 className="text-lg font-black text-gray-900 font-sans uppercase tracking-tight">Le Contrat Numérique — 5 règles</h3>
                    </div>

                    <div className="space-y-6">
                        {[
                            { id: 1, text: "Pas d'écran dans la chambre après 21h. Le téléphone charge dans le salon." },
                            { id: 2, text: "Jours d'entraînement : pas de réseaux sociaux 2h avant la séance." },
                            { id: 3, text: "Aucune publication personnelle sans accord parental explicite." },
                            { id: 4, text: "Transparence totale sur les types de comptes suivis." },
                            { id: 5, text: "Coupure numérique de 7 jours si l'humeur est impactée négativement." }
                        ].map((rule) => (
                            <div key={rule.id} className="flex gap-6 items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                                <div className="w-8 h-8 rounded-full border-2 border-loo-green-600 flex items-center justify-center text-loo-green-600 font-black shrink-0 text-sm">{rule.id}</div>
                                <p className="text-gray-700 font-medium">{rule.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 pt-10 border-t border-gray-50 text-center">
                        <p className="text-gray-400 text-sm italic">Ce contrat doit être imprimé et signé par les deux parties.</p>
                    </div>
                </div>

                <ScienceBox title="Dopamine et cerveau adolescent">
                    Le système de récompense est particulièrement vulnérable pendant l&apos;adolescence. La consommation quotidienne de highlights sportifs est corrélée à <strong>une augmentation du sentiment d&apos;inadéquation</strong> et une baisse de la motivation intrinsèque.
                </ScienceBox>

                <ChocQuote>
                    Les réseaux ne sont pas interdits.<br />
                    Ils sont encadrés.<br />
                    <ChocText>Un contrat signé vaut mieux que dix conversations répétées.</ChocText>
                </ChocQuote>

                {/* CLOTURE FINALE */}
                <div className="mt-32 pt-20 border-t border-gray-100 text-center">
                    <div className="text-loo-green-600 font-bold text-xs uppercase tracking-[0.2em] mb-12 font-sans">Message Final</div>

                    <p className="text-2xl md:text-4xl font-black text-gray-900 leading-tight mb-16 max-w-3xl mx-auto">
                        Ce dont il se souviendra dans vingt ans — ce n&apos;est pas le club qui l&apos;a recruté.<br /><br />
                        C&apos;est ce qu&apos;il ressentait quand vous étiez dans les tribunes.
                    </p>

                    <div className="bg-loo-green-900 rounded-full inline-block px-12 py-8 text-white shadow-2xl">
                        <p className="text-3xl font-serif italic mb-2">Faites en sorte</p>
                        <p className="text-5xl font-black font-sans tracking-tighter uppercase">que ce souvenir soit bon.</p>
                    </div>

                    <div className="mt-24">
                        <p className="text-gray-300 font-black text-8xl tracking-widest opacity-20">LOOPIO</p>
                    </div>
                </div>

            </LessonSection>
        </div>
    );
}
