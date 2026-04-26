import React from "react";
import { ModuleHero } from "@/components/formation/ui/ModuleHero";
import { LessonSection } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";

export default function Module2IntroPage() {
    return (
        <div className="pb-24">
            <ModuleHero
                num="2"
                title="Du vendredi"
                highlight="au dimanche."
                lead={
                    <>
                        Le Module 1 vous a appris les règles de fond.<br />
                        Ce module vous dit quoi faire exactement — chaque heure, chaque décision, chaque mot.
                    </>
                }
            />

            <LessonSection>
                <ChocQuote>
                    Le moment le plus dangereux<br />
                    de la semaine de votre enfant,<br />
                    <ChocText>c'est le trajet retour dans votre voiture.</ChocText>
                </ChocQuote>

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Pas l'opposition la plus difficile. Pas la fatigue physique. Pas le regard du recruteur. <strong>Le trajet retour dans votre voiture.</strong>
                </p>

                <p className="text-gray-700 leading-relaxed">
                    Ce module ne vous donne pas des principes généraux. Il vous donne un protocole. Du vendredi soir au dimanche soir. Avec les mots exacts. Les silences exacts. Et les moments où vous ne faites rien — qui sont souvent les plus importants.
                </p>
            </LessonSection>

            {/* Progression visuelle du module */}
            <LessonSection className="mt-12 bg-white border border-gray-100 p-8 md:p-12 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-8 font-sans">Le programme du weekend</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="flex flex-col gap-3">
                        <div className="text-loo-green-500 font-bold text-xs uppercase tracking-widest">Étape 1</div>
                        <div className="font-bold text-gray-900">Vendredi soir</div>
                        <p className="text-sm text-gray-500">Préparer le bon état mental à la maison.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-loo-green-500 font-bold text-xs uppercase tracking-widest">Étape 2</div>
                        <div className="font-bold text-gray-900">Samedi matin</div>
                        <p className="text-sm text-gray-500">Le script exact de la voiture aller.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-loo-green-500 font-bold text-xs uppercase tracking-widest">Étape 3</div>
                        <div className="font-bold text-gray-900">Pendant le match</div>
                        <p className="text-sm text-gray-500">Pratiquer le silence actif sur la touche.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-loo-green-500 font-bold text-xs uppercase tracking-widest">Étape 4</div>
                        <div className="font-bold text-gray-900">Trajet retour</div>
                        <p className="text-sm text-gray-500">La règle vitale des 30 minutes.</p>
                    </div>
                </div>
            </LessonSection>
        </div>
    );
}
