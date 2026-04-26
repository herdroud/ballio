import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { ScienceBox } from "@/components/formation/ui/Highlights";

export default function Module3Lesson2Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="LEÇON 3.2"
                    title={
                        <>
                            Il Veut<br />
                            Arrêter
                        </>
                    }
                    hook="La phrase la plus difficile à entendre. Et la plus importante à bien lire."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Un mardi matin. Pas après un mauvais match. Pas après une dispute avec le coach. Un mardi matin ordinaire — dans la cuisine.
                </p>

                <ChocQuote>
                    « Je veux arrêter le foot. »<br />
                    <ChocText>Votre première réaction va tout conditionner.</ChocText>
                </ChocQuote>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Si vous n&apos;êtes pas préparé, votre première réaction sera probablement l&apos;une de ces trois : <em className="italic">« Quoi ? Mais pourquoi ? »</em> — <em className="italic">« Tu es sûr ? »</em> — ou le silence chargé qui dit votre désapprobation sans un mot. Ces trois réactions font la même chose. <strong>Elles lui signalent que cette décision est un problème. Elles lui retirent la liberté de la poser.</strong>
                </p>

                <p className="mb-12">
                    Avant de répondre quoi que ce soit, vous devez comprendre que <em className="italic">« je veux arrêter »</em> n&apos;est pas toujours une décision. Parfois — souvent — c&apos;est un signal.
                </p>

                {/* TYPES D'ARRÊT */}
                <div className="grid md:grid-cols-2 gap-8 my-16">
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                        <div className="text-loo-green-600 font-black text-3xl mb-4 font-sans opacity-20">01</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-50 pb-2">La Fatigue Temporaire</h4>
                        <p className="text-sm text-gray-400 mb-4 font-sans uppercase tracking-widest font-bold">Ce qu&apos;il dit</p>
                        <p className="text-lg italic text-gray-700 mb-6">« Je veux arrêter. »</p>
                        <p className="text-sm text-gray-400 mb-4 font-sans uppercase tracking-widest font-bold">Ce qu&apos;il veut dire</p>
                        <p className="text-gray-900 font-bold leading-relaxed">
                            « J&apos;ai besoin que ça change. » <span className="font-normal text-gray-600">Il a trop de pression. Il est épuisé. La compétition est devenue lourde.</span>
                        </p>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                        <div className="text-loo-green-600 font-black text-3xl mb-4 font-sans opacity-20">02</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-50 pb-2">La Décision Réelle</h4>
                        <p className="text-sm text-gray-400 mb-4 font-sans uppercase tracking-widest font-bold">Ce qu&apos;il dit</p>
                        <p className="text-lg italic text-gray-700 mb-6">« Je veux arrêter. »</p>
                        <p className="text-sm text-gray-400 mb-4 font-sans uppercase tracking-widest font-bold">Ce qu&apos;il veut dire</p>
                        <p className="text-gray-900 font-bold leading-relaxed">
                            « Je veux arrêter. » <span className="font-normal text-gray-600">Il a réfléchi. Il a évolué. Le football n&apos;est plus ce qu&apos;il cherche. Ce n&apos;est pas une humeur — c&apos;est une réorientation.</span>
                        </p>
                    </div>
                </div>

                <p className="text-center text-gray-600 mb-12">
                    Ces deux situations méritent des réponses différentes. Mais elles méritent la <strong className="text-gray-900">même première réaction.</strong>
                </p>

                {/* SCRIPT "D'ACCORD" */}
                <div className="bg-gray-900 text-white rounded-[32px] p-10 md:p-16 relative overflow-hidden my-16 shadow-2xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-loo-green-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 pointer-events-none" />

                    <div className="flex items-center gap-4 mb-10 relative z-10">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">💬</div>
                        <h3 className="text-xl font-black text-white tracking-tight font-sans">Première réaction — Mot pour mot</h3>
                    </div>

                    <div className="space-y-6 font-sans text-xl md:text-3xl font-light text-loo-green-50 relative z-10">
                        <p className="font-bold text-white text-4xl md:text-5xl">« D&apos;accord. »</p>
                        <p className="text-gray-500 text-sm italic font-serif"> [Pause. Rien d&apos;autre dans les 10 premières secondes.]</p>
                        <p>« Merci de me le dire. »</p>
                        <p className="text-gray-500 text-sm italic font-serif"> [Pause.]</p>
                        <p>« Est-ce que tu veux qu&apos;on en parle — ou tu voulais juste me le dire ? »</p>
                    </div>

                    <div className="mt-12 pt-10 border-t border-white/10 text-gray-400 text-sm leading-relaxed relative z-10">
                        <strong className="text-white">« D&apos;accord »</strong> valide sa parole sans la bloquer. <strong className="text-white">« Merci de me le dire »</strong> lui signale que vous entendez, pas que vous jugez. La question finale lui redonne le contrôle du rythme. Vous ne fermez pas. Vous n&apos;avez pas paniqué. Vous avez ouvert.
                    </div>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-12">
                    <div className="flex items-center gap-3 mb-2 text-red-700 font-bold uppercase text-xs tracking-widest font-sans">
                        <span>⚠</span> Ne jamais dire
                    </div>
                    <p className="text-red-900 leading-relaxed font-medium">
                        « On a mis tellement d&apos;argent, de temps, d&apos;énergie... » <br />
                        <span className="font-normal text-red-800 opacity-80 italic">Cet argument ne concerne pas votre enfant. Il concerne votre deuil à vous. Et ce n&apos;est pas le moment pour ça.</span>
                    </p>
                </div>

                <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-sm my-16">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-xl">💬</div>
                        <h3 className="text-lg font-black text-gray-900 tracking-tight font-sans">Les deux questions — Dans cet ordre</h3>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-gray-50 p-6 rounded-2xl">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Question 1</p>
                            <p className="text-xl font-serif text-gray-900 italic mb-4">« Qu&apos;est-ce qui est difficile en ce moment dans le foot ? »</p>
                            <p className="text-xs text-gray-400">Écoutez. Ne commentez pas. Laissez le silence après sa réponse.</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Question 2 (Si la conversation continue)</p>
                            <p className="text-xl font-serif text-gray-900 italic mb-4">« Est-ce que tu veux arrêter pour souffler — ou tu veux vraiment changer de direction ? »</p>
                            <p className="text-xs text-gray-400">Écoutez. Ne suggérez pas la réponse. Laissez-la être la sienne.</p>
                        </div>
                    </div>
                </div>

                <ScienceBox title="Le paradoxe de la liberté">
                    Les recherches sur l&apos;abandon sportif précoce montrent que la principale variable prédictive n&apos;est pas le niveau de l&apos;enfant ni les conditions d&apos;entraînement — c&apos;est le <strong>niveau de pression parentale perçu</strong>. Un enfant qui sent qu&apos;il peut arrêter sans conséquences relationnelles avec son parent est paradoxalement celui qui continue le plus longtemps. <strong>La liberté de partir est ce qui donne envie de rester.</strong>
                </ScienceBox>

                <RuleBox title="Règle d'or Loopio — Leçon 3.2">
                    Si votre enfant veut arrêter — votre premier mot est « D&apos;accord. »<br />
                    Pas une question. Pas un argument.<br />
                    « D&apos;accord. »
                </RuleBox>
            </LessonSection>
        </div>
    );
}
