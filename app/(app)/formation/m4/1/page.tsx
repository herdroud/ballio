import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { ScienceBox, RuleBox } from "@/components/formation/ui/Highlights";

export default function Module4Lesson1Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="U6 – U9"
                    title={
                        <>
                            L&apos;Âge du<br />
                            Jeu Pur
                        </>
                    }
                    hook="Protéger la flamme. Le plaisir est le seul indicateur qui compte."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Il court après le ballon dans tous les sens. Il rit quand il tombe. Il ne sait pas quel score il y a. Il joue. C&apos;est l&apos;image la plus saine du football que vous verrez jamais.
                </p>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Entre 6 et 9 ans, le cerveau d&apos;un enfant n&apos;est pas câblé pour la compétition structurée. Il est câblé pour l&apos;exploration, le mouvement, le jeu. <strong>Ce qu&apos;il développe à cet âge — c&apos;est son amour du ballon. Et cet amour, une fois cassé, est très difficile à reconstruire.</strong>
                </p>

                <ScienceBox title="Ce que les études longitudinales montrent">
                    Entre 6 et 9 ans, la <strong>motivation intrinsèque</strong> — jouer pour le plaisir du jeu lui-même — est le meilleur prédicteur de la longévité sportive. Les enfants spécialisés avant 10 ans présentent un taux d&apos;abandon deux fois supérieur à ceux qui ont eu une exposition multisports. La flamme s&apos;allume dans la liberté.
                </ScienceBox>

                <ChocQuote>
                    Une seule question compte à cet âge.<br />
                    <ChocText>Est-ce qu&apos;il a envie d&apos;y retourner ?</ChocText>
                </ChocQuote>

                <p className="text-lg text-gray-800 mb-12">
                    Pas « a-t-il bien joué ? » Pas « a-t-il progressé cette semaine ? » <strong>L&apos;envie de revenir — c&apos;est le seul indicateur.</strong>
                </p>

                {/* COMPARISON TABLE */}
                <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm my-16">
                    <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-100">
                        <div className="p-6 text-xs uppercase tracking-widest font-black text-gray-400 font-sans border-r border-gray-100 text-center">Ce que vous ne dites pas</div>
                        <div className="p-6 text-xs uppercase tracking-widest font-black text-loo-green-600 font-sans text-center">Ce que vous dites</div>
                    </div>

                    <div className="divide-y divide-gray-50">
                        <div className="grid grid-cols-2">
                            <div className="p-6 text-center text-gray-400 italic border-r border-gray-100">« Tu as bien joué ? »</div>
                            <div className="p-6 text-center text-gray-900 font-bold">« Tu t&apos;es amusé ? »</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="p-6 text-center text-gray-400 italic border-r border-gray-100">« Ton pied gauche est moins bon »</div>
                            <div className="p-6 text-center text-gray-900 font-bold">« Super le geste que t&apos;as tenté ! »</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="p-6 text-center text-gray-400 italic border-r border-gray-100">« Tu dois travailler plus »</div>
                            <div className="p-6 text-center text-gray-900 font-bold">« Quand est-ce qu&apos;on y retourne ? »</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="p-6 text-center text-gray-400 italic border-r border-gray-100">« Le coach ne t&apos;a pas assez mis en avant »</div>
                            <div className="p-6 text-center text-gray-900 font-bold italic opacity-60">[Silence heureux dans la voiture]</div>
                        </div>
                    </div>
                </div>

                <RuleBox title="Règle d'or Loopio — U6-U9">
                    L&apos;indicateur unique est l&apos;envie de revenir.<br />
                    Si elle est là — vous avez réussi votre rôle.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
