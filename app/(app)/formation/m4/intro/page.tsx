import React from "react";
import { ModuleHero } from "@/components/formation/ui/ModuleHero";
import { LessonSection } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";

export default function Module4IntroPage() {
    return (
        <div className="pb-24">
            <ModuleHero
                num="4"
                title="Votre enfant"
                highlight="a changé. Et vous ?"
                lead={
                    <>
                        La plupart des parents évoluent chez eux.<br />
                        Sur le terrain du football — ils restent le même parent.<br />
                        Ce module est la carte de votre propre évolution.
                    </>
                }
            />

            <LessonSection>
                <ChocQuote>
                    Ce dont votre enfant avait besoin<br />
                    de vous à 7 ans — c&apos;est presque<br />
                    <ChocText>le contraire de ce dont il a besoin à 16.</ChocText>
                </ChocQuote>

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Les Modules 1, 2 et 3 vous ont donné des outils pour des situations. Ce module vous donne quelque chose de différent : une carte du territoire entier.
                </p>

                <p className="text-gray-700 leading-relaxed">
                    Quatre tranches d&apos;âge. Pour chacune — ce qui aide, ce qui freine, et le moment précis où votre rôle change de protecteur à miroir, puis de miroir à présence disponible.
                </p>
            </LessonSection>

            {/* AGES GRID */}
            <LessonSection className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-loo-green-600 font-black text-xs uppercase tracking-widest mb-4">U6 – U9</div>
                        <div className="font-bold text-gray-900 mb-2">Protéger la flamme</div>
                        <p className="text-sm text-gray-500">L&apos;âge du jeu pur où le plaisir est le seul indicateur.</p>
                    </div>
                    <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-loo-green-600 font-black text-xs uppercase tracking-widest mb-4">U10 – U13</div>
                        <div className="font-bold text-gray-900 mb-2">Être son miroir</div>
                        <p className="text-sm text-gray-500">L&apos;identité se construit. Votre regard devient sa vérité.</p>
                    </div>
                    <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-loo-green-600 font-black text-xs uppercase tracking-widest mb-4">U14 – U16</div>
                        <div className="font-bold text-gray-900 mb-2">Présence disponible</div>
                        <p className="text-sm text-gray-500">L&apos;autonomie arrive. Reculer d&apos;un pas pour le laisser debout.</p>
                    </div>
                    <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-loo-green-600 font-black text-xs uppercase tracking-widest mb-4">U17 – U18</div>
                        <div className="font-bold text-gray-900 mb-2">Miroir & Filet</div>
                        <p className="text-sm text-gray-500">L&apos;âge des décisions finales. Être un conseil, pas un moteur.</p>
                    </div>
                </div>
            </LessonSection>
        </div>
    );
}
