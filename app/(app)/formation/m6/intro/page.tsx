import React from "react";
import { ModuleHero } from "@/components/formation/ui/ModuleHero";
import { LessonSection } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";

export default function Module6IntroPage() {
    return (
        <div className="pb-24">
            <ModuleHero
                num="6"
                title="Ce que personne"
                highlight="ne vous dit."
                lead={
                    <>
                        L&apos;environnement familial est évalué avec <br />
                        autant de rigueur que le niveau technique.<br />
                        Personne ne vous le dit. Sauf ici.
                    </>
                }
            />

            <LessonSection>
                {/* CITATION HERO */}
                <div className="bg-white border border-gray-100 rounded-[40px] p-10 md:p-16 my-16 shadow-lg relative overflow-hidden text-center md:text-left">
                    <div className="absolute top-0 left-0 w-2 h-full bg-loo-green-600" />
                    <p className="text-xl md:text-3xl font-serif italic text-gray-700 leading-relaxed mb-8">
                        « Quand je vais observer un gamin de douze ans, je regarde le gamin 30% du temps. Je regarde ses parents 70%. Un parent qui crie des consignes depuis la touche — c&apos;est un dossier qui se ferme avant même que je note le niveau du joueur. »
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-px bg-gray-200" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Directeur de préformation, club de Ligue 1</p>
                    </div>
                </div>

                <ChocQuote>
                    Ce n&apos;est pas une anecdote.<br />
                    <ChocText>C&apos;est une règle de fonctionnement.</ChocText>
                </ChocQuote>

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Vous n&apos;en avez peut-être jamais entendu parler. Parce que c&apos;est la partie invisible de l&apos;iceberg de la détection.
                </p>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Ce module ouvre le rideau. Les vrais critères de détection. Comment parler au coach sans mettre votre enfant en danger. Les agents sérieux, les agents toxiques — comment les distinguer. Et le contrat numérique des réseaux sociaux.
                </p>
            </LessonSection>

            {/* MODULES GRID */}
            <LessonSection className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white border border-gray-100 p-10 rounded-[32px] shadow-sm hover:shadow-md transition-shadow group">
                        <div className="text-loo-green-600 font-black text-xs uppercase tracking-widest mb-6">6.1 — Recruteurs</div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">Mythes vs Réalité</h3>
                        <p className="text-gray-500 italic">Ce que les scouts notent vraiment dans leur carnet (et ce n&apos;est pas ses buts).</p>
                    </div>
                    <div className="bg-white border border-gray-100 p-10 rounded-[32px] shadow-sm hover:shadow-md transition-shadow group">
                        <div className="text-loo-green-600 font-black text-xs uppercase tracking-widest mb-6">6.2 — Le Coach</div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">L&apos;art de l&apos;entretien</h3>
                        <p className="text-gray-500 italic">Comment parler à l&apos;entraîneur comme un partenaire, pas comme un adversaire.</p>
                    </div>
                    <div className="bg-white border border-gray-100 p-10 rounded-[32px] shadow-sm hover:shadow-md transition-shadow group">
                        <div className="text-loo-green-600 font-black text-xs uppercase tracking-widest mb-6">6.3 — Agents</div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">Les 5 Red Flags</h3>
                        <p className="text-gray-500 italic">Détecter les arnaques et les intermédiaires toxiques en moins de 30 secondes.</p>
                    </div>
                    <div className="bg-white border border-gray-100 p-10 rounded-[32px] shadow-sm hover:shadow-md transition-shadow group">
                        <div className="text-loo-green-600 font-black text-xs uppercase tracking-widest mb-6">6.4 — Numérique</div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">Le Contrat</h3>
                        <p className="text-gray-500 italic">Gérer l&apos;image et la dopamine des réseaux sociaux pour protéger son focus.</p>
                    </div>
                </div>
            </LessonSection>
        </div>
    );
}
