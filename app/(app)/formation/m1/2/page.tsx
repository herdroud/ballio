import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { RuleBox, ScienceBox } from "@/components/formation/ui/Highlights";

export default function Module1Lesson2Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="LEÇON 1.2"
                    title={
                        <>
                            Le Rituel<br />
                            de la Table
                        </>
                    }
                    hook="Déconnecter la valeur de votre enfant de ses performances sportives. Commencer ce soir."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-12">
                    Sur les sept derniers dîners — combien de fois le football était le sujet principal ?
                </p>

                <p>
                    Pas la réponse que vous aimeriez donner. La réalité.
                </p>

                <p>
                    Si la réponse est <em>« la plupart du temps »</em>, vous avez un problème. Pas parce que le football est mauvais. <strong>Parce que votre enfant a compris que c'est là qu'il a de la valeur à vos yeux.</strong> Et le jour où le football vacille — une blessure, une non-sélection, une période difficile — c'est lui qui vacille. Pas son sport. Lui.
                </p>

                <ChocQuote>
                    Il ne perd pas son poste.<br />
                    <ChocText>Il perd son identité.</ChocText>
                </ChocQuote>

                <p>
                    Un joueur de seize ans — excellent niveau, convoqué en équipe régionale. Sa mère : <em>« Depuis tout petit, on ne parle que de foot à table. C'est notre passion commune. »</em> À dix-sept ans, blessure grave, six mois d'arrêt. Deux mois plus tard, la mère appelle : <em>« Il ne parle plus. Il ne mange plus avec nous. »</em>
                </p>

                <p className="font-bold text-gray-900 mt-4 mb-8">
                    Ce n'était pas leur passion commune. C'était toute son identité à lui. Et sans le football, il n'existait plus à la table.
                </p>

                <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-sm my-16">
                    <div className="grid grid-cols-7 gap-2 md:gap-4 mb-10">
                        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, _idx) => {
                            const isFoot = day === "Lun" || day === "Sam";
                            return (
                                <div key={day} className="flex flex-col items-center gap-3">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{day}</span>
                                    <div className={`w-full aspect-square rounded-2xl flex items-center justify-center text-2xl shadow-sm border ${isFoot ? "bg-red-50 border-red-100 text-red-500" : "bg-loo-green-50 border-loo-green-100 text-loo-green-600"
                                        }`}>
                                        {isFoot ? "⚽" : "💬"}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex flex-wrap gap-6 justify-center text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-loo-green-500 rounded-full" />
                            <span className="text-gray-600">Sujet hors-football</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full" />
                            <span className="text-gray-600">Football acceptable</span>
                        </div>
                        <div className="text-gray-400 font-normal italic ml-auto italic">
                            Objectif : max 2 repas sur 7 centrés sur le foot
                        </div>
                    </div>
                </div>

                <div className="bg-loo-green-900 text-white rounded-[32px] p-10 md:p-16 relative overflow-hidden my-16 shadow-2xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-loo-green-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 pointer-events-none" />

                    <div className="flex items-center gap-4 mb-10 relative z-10">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">📋</div>
                        <h3 className="text-2xl font-black tracking-tight">Le Rituel de Table — Mise en place immédiate</h3>
                    </div>

                    <div className="space-y-8 relative z-10">
                        <div className="flex gap-6 items-start group">
                            <div className="w-10 h-10 shrink-0 bg-white/10 rounded-full flex items-center justify-center font-black text-loo-green-400 font-sans group-hover:bg-loo-green-500 group-hover:text-white transition-colors">1</div>
                            <p className="text-lg md:text-xl font-light text-loo-green-50 leading-relaxed">
                                <strong className="text-white font-bold">Ce soir :</strong> un sujet hors-football à table. Un seul. Juste un pour commencer.
                            </p>
                        </div>

                        <div className="flex gap-6 items-start group">
                            <div className="w-10 h-10 shrink-0 bg-white/10 rounded-full flex items-center justify-center font-black text-loo-green-400 font-sans group-hover:bg-loo-green-500 group-hover:text-white transition-colors">2</div>
                            <p className="text-lg md:text-xl font-light text-loo-green-50 leading-relaxed">
                                <strong className="text-white font-bold">Semaine 1 :</strong> sur 7 repas, maximum 2 conversations initiées sur le football par vous.
                            </p>
                        </div>

                        <div className="flex gap-6 items-start group">
                            <div className="w-10 h-10 shrink-0 bg-white/10 rounded-full flex items-center justify-center font-black text-loo-green-400 font-sans group-hover:bg-loo-green-500 group-hover:text-white transition-colors">3</div>
                            <p className="text-lg md:text-xl font-light text-loo-green-50 leading-relaxed">
                                Si le foot revient : répondez brièvement. Puis redirigez. <em className="italic text-white">« Super. Et à part ça… ? »</em> Vous élargissez, vous ne coupez pas.
                            </p>
                        </div>

                        <div className="flex gap-6 items-start group">
                            <div className="w-10 h-10 shrink-0 bg-white/10 rounded-full flex items-center justify-center font-black text-loo-green-400 font-sans group-hover:bg-loo-green-500 group-hover:text-white transition-colors">4</div>
                            <p className="text-lg md:text-xl font-light text-loo-green-50 leading-relaxed">
                                <strong className="text-white font-bold">À J+14 :</strong> observez si votre enfant parle davantage à table. C&apos;est votre indicateur de succès.
                            </p>
                        </div>
                    </div>
                </div>

                <ScienceBox title="Signal d'alarme à connaître">
                    Si votre enfant est silencieux à table depuis plusieurs semaines, ce silence a peut-être un nom. <strong>Il se protège.</strong> Il a appris que la table est un endroit où ses performances sont évaluées. Alors il se tait pour éviter l'évaluation. Le rituel de table commence à reconstruire ce lien.
                </ScienceBox>

                <RuleBox title="Règle d'or Loopio — Leçon 1.2">
                    Votre enfant doit avoir de la valeur à cette table sans parler de football.<br />
                    Si ce n'est pas le cas aujourd'hui — commencez ce soir.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
