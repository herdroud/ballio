import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { ScienceBox, RuleBox } from "@/components/formation/ui/Highlights";

export default function Module5Lesson4Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="5.4"
                    title={
                        <>
                            Le Plan B<br />
                            Scolaire —<br />
                            Ce n&apos;est Pas<br />
                            un Plan B
                        </>
                    }
                    hook="La réussite scolaire comme filet de sécurité psychologique — pas comme alternative honteuse."
                />

                {/* STAT BLOC */}
                <div className="bg-white border border-gray-100 rounded-[40px] p-12 md:p-20 my-16 shadow-sm text-center relative overflow-hidden">
                    <div className="text-loo-green-600 font-black text-6xl md:text-8xl font-sans tracking-tighter mb-6">&lt; 1%</div>
                    <p className="text-xl text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
                        des joueurs de U16 qui rêvent de signer professionnel y arriveront. Ce chiffre n&apos;est pas là pour décourager. <strong>Il est là pour vous responsabiliser.</strong>
                    </p>
                    <p className="text-gray-900 font-bold uppercase tracking-widest text-xs font-sans">
                        Mettre toutes les chances de son côté — Y compris l&apos;école.
                    </p>
                </div>

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Votre enfant peut y être. Et votre rôle en tant que parent, c&apos;est de mettre toutes les chances de son côté.
                </p>

                {/* COMPARAISON JOUEURS */}
                <div className="grid md:grid-cols-2 gap-8 my-16">
                    <div className="bg-loo-green-50/50 border border-loo-green-100 rounded-3xl p-8 relative overflow-hidden">
                        <div className="text-loo-green-600 font-bold text-xs uppercase tracking-widest mb-6 font-sans">Ce que l&apos;école construit ✓</div>
                        <h4 className="text-xl font-bold text-loo-green-900 mb-4">Le Joueur Libre</h4>
                        <p className="text-gray-700 leading-relaxed mb-4">Il sait qu&apos;il a un avenir solide hors du football. Alors il <strong>prend des risques sur le terrain.</strong> Il tente les dribbles difficiles. Une erreur ne détruira pas tout.</p>
                        <p className="text-loo-green-700 font-bold text-sm italic">Ce joueur-là, les recruteurs le voient.</p>
                    </div>

                    <div className="bg-red-50/30 border border-red-100 rounded-3xl p-8 relative overflow-hidden">
                        <div className="text-red-700 font-bold text-xs uppercase tracking-widest mb-6 font-sans">Sans ce filet ✗</div>
                        <h4 className="text-xl font-bold text-red-900 mb-4">Le Joueur Crispé</h4>
                        <p className="text-gray-700 leading-relaxed mb-4">Tout son avenir dépend du football. Alors il <strong>joue pour ne pas perdre.</strong> Il évite les risques. Il joue pour ne pas tomber. Il ne progresse plus.</p>
                        <p className="text-red-700 font-bold text-sm italic">Et ça se voit immédiatement.</p>
                    </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Les meilleurs centres de formation exigent un niveau scolaire minimum. Parce qu&apos;un joueur avec un cerveau entraîné à apprendre intègre les consignes plus vite et lit le jeu plus clairement. <strong>L&apos;école et le football se renforcent.</strong>
                </p>

                <ChocQuote>
                    Ne dites pas « il faut un plan B »<br />
                    au cas où le foot ne marche pas.<br />
                    <ChocText>Dites : « L&apos;école te protège sur le terrain. »</ChocText>
                </ChocQuote>

                {/* PROTOCOLE */}
                <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 my-16 shadow-sm">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-10 h-10 bg-loo-green-50 rounded-xl flex items-center justify-center font-bold text-loo-green-600">📋</div>
                        <h3 className="text-lg font-black text-gray-900 font-sans uppercase tracking-tight">Double Projet — Action concrète</h3>
                    </div>

                    <div className="divide-y divide-gray-50">
                        <div className="py-6 flex gap-6 items-start">
                            <div className="w-8 h-8 rounded-lg bg-loo-green-100 text-loo-green-600 flex items-center justify-center font-black shrink-0">1</div>
                            <p className="text-gray-700">Vous maintenez un <strong>cadre scolaire non-négociable</strong>. Les devoirs ont une plage horaire fixe. Le football ne la supprime pas.</p>
                        </div>
                        <div className="py-6 flex gap-6 items-start">
                            <div className="w-8 h-8 rounded-lg bg-loo-green-100 text-loo-green-600 flex items-center justify-center font-black shrink-0">2</div>
                            <p className="text-gray-700">Vous ne parlez jamais de l&apos;école comme d&apos;un « plan B ». Vous en parlez comme d&apos;un <strong>levier de performance</strong> — parce que c&apos;en est un.</p>
                        </div>
                        <div className="py-6 flex gap-6 items-start">
                            <div className="w-8 h-8 rounded-lg bg-loo-green-100 text-loo-green-600 flex items-center justify-center font-black shrink-0">3</div>
                            <p className="text-gray-700">Semaine d&apos;essai ou sélection : <strong>l&apos;école n&apos;est pas sacrifiée</strong>. Un joueur qui révise et qui joue bien — c&apos;est le signe d&apos;un cerveau capable.</p>
                        </div>
                    </div>
                </div>

                <ScienceBox title="Reconversion et niveau d'éducation">
                    Les études montrent que le niveau d&apos;éducation atteint est le meilleur prédicteur de la qualité de la reconversion. Les joueurs avec un niveau bac s&apos;adaptent <strong>deux fois plus rapidement à l&apos;arrêt de carrière.</strong> Ce n&apos;est pas une statistique d&apos;échec. C&apos;est une statistique de liberté.
                </ScienceBox>

                <RuleBox title="Règle d&apos;or Loopio — Leçon 5.4">
                    L&apos;école ne tue pas le rêve.<br />
                    Un joueur qui sait qu&apos;il a un avenir prend des risques.<br />
                    Un joueur sans filet joue pour ne pas tomber.
                </RuleBox>

                {/* FINAL CTA Module 5 */}
                <div className="mt-32 bg-loo-green-900 rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-loo-green-500 rounded-full blur-[160px] opacity-20 -mr-20 -mt-20 pointer-events-none" />
                    <div className="text-loo-green-400 font-bold text-xs uppercase tracking-widest mb-8 font-sans relative z-10">Module 5 terminé</div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 relative z-10">L&apos;intérieur est géré.</h2>
                    <p className="text-loo-green-100 text-lg md:text-xl max-w-2xl mx-auto mb-12 relative z-10">
                        Le sommeil. La nutrition. La prévention. L&apos;école. Vous avez les leviers de la performance à domicile.
                    </p>
                    <div className="relative z-10">
                        <button className="bg-white text-loo-green-900 px-10 py-5 rounded-full font-black uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-xl shadow-loo-green-950/20">
                            Passer au Module 6 : L&apos;Écosystème Pro
                        </button>
                    </div>
                </div>
            </LessonSection>
        </div>
    );
}
