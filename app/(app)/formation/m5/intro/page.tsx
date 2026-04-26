import React from "react";
import { ModuleHero } from "@/components/formation/ui/ModuleHero";
import { LessonSection } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";

export default function Module5IntroPage() {
    return (
        <div className="pb-24">
            <ModuleHero
                num="5"
                title="La performance"
                highlight="se construit hors du terrain."
                lead={
                    <>
                        Quatre leviers entièrement dans vos mains.<br />
                        Pas dans celles du coach. Pas dans celles du club.<br />
                        Le sommeil. La nutrition. Les signaux du corps. L&apos;école.
                    </>
                }
            />

            <LessonSection>
                <div className="bg-white border-2 border-red-100 rounded-[40px] p-10 md:p-16 my-16 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-red-500" />
                    <div className="flex flex-col md:flex-row gap-12 items-center text-center md:text-left">
                        <div className="text-red-600 font-black text-6xl md:text-8xl font-sans tracking-tighter">−20%</div>
                        <div>
                            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                                Capacité de décision perdue en match quand un joueur de 14 ans dort moins de 8h.
                            </p>
                            <p className="text-gray-500 italic">
                                C&apos;est une semaine d&apos;entraînement effacée en une nuit. <strong>Et c&apos;est dans votre contrôle.</strong>
                            </p>
                        </div>
                    </div>
                </div>

                <ChocQuote>
                    Ce module ne parle pas de ce qui se passe<br />
                    sur le terrain.<br />
                    <ChocText>Il parle de ce qui se passe avant.</ChocText>
                </ChocQuote>

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Aucun de ces quatre éléments ne nécessite un club ou un recruteur. Ils se gèrent à la maison.
                </p>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Le Module 1, 2, 3 et 4 ont posé les bases mentales et relationnelles. Le Module 5 installe l&apos;infrastructure physique et environnementale qui permet au talent de s&apos;exprimer durablement.
                </p>
            </LessonSection>

            {/* LEVIERS GRID */}
            <LessonSection className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white border border-gray-100 p-10 rounded-[32px] shadow-sm hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-loo-green-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🌙</div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">Le Sommeil</h3>
                        <p className="text-gray-500">Arme N°1 du talent. Là où le cerveau consolide ce que le corps a appris.</p>
                    </div>
                    <div className="bg-white border border-gray-100 p-10 rounded-[32px] shadow-sm hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-loo-green-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🥗</div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">La Nutrition</h3>
                        <p className="text-gray-500">Le bon moment, pas seulement le bon aliment. La fenêtre des 30 minutes.</p>
                    </div>
                    <div className="bg-white border border-gray-100 p-10 rounded-[32px] shadow-sm hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-loo-green-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">⚠️</div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">La Prévention</h3>
                        <p className="text-gray-500">Lire les signaux avant la blessure. Irritabilité et fatigue persistante.</p>
                    </div>
                    <div className="bg-white border border-gray-100 p-10 rounded-[32px] shadow-sm hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-loo-green-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">📚</div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">L&apos;École</h3>
                        <p className="text-gray-500">Ce n&apos;est pas un plan B. C&apos;est ce qui permet de prendre des risques sur le terrain.</p>
                    </div>
                </div>
            </LessonSection>
        </div>
    );
}
