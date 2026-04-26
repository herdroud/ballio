import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { RuleBox, ScienceBox } from "@/components/formation/ui/Highlights";

export default function Module0Lesson1Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="LEÇON 0.1"
                    title={
                        <>
                            Les 3 phrases<br />
                            qui paralysent
                        </>
                    }
                    hook="Vous les avez dites avant le dernier match. Avec amour. C'est le problème."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-12">
                    Certaines des phrases les plus toxiques que vous pouvez dire à votre enfant sont aussi les plus intentionnellement bienveillantes.
                </p>

                <p>
                    Avant de continuer, posez-vous cette question : <strong>laquelle de ces trois phrases avez-vous dite avant le dernier match de votre enfant ?</strong>
                </p>

                <div className="grid gap-6 my-10">
                    {/* Phrase 1 */}
                    <div className="bg-red-50/50 border border-red-100 rounded-2xl p-8">
                        <div className="text-red-600 font-bold text-xs uppercase tracking-wider mb-2 font-sans">
                            Phrase n°1 — La plus courante
                        </div>
                        <div className="text-2xl font-black text-gray-900 mb-4 font-sans">
                            « Fais-moi un beau match. »
                        </div>
                        <p className="text-gray-700 mb-6 font-medium">
                            Regardez le mot. <strong>« Fais-moi. »</strong> Pour qui est ce match ? Votre enfant vient de comprendre en deux syllabes qu'il joue pour vous. Pas pour lui. Son cerveau a enregistré ça en moins de 200 millisecondes — bien avant qu'il monte sur le terrain.
                        </p>
                        <div className="bg-white rounded-xl p-4 border border-red-100/50">
                            <div className="text-loo-green-600 font-bold text-xs uppercase tracking-wider mb-1 font-sans">
                                ✓ À la place, dites
                            </div>
                            <div className="text-gray-900 font-bold">
                                « Amuse-toi. C'est tout. »
                            </div>
                        </div>
                    </div>

                    {/* Phrase 2 */}
                    <div className="bg-red-50/50 border border-red-100 rounded-2xl p-8">
                        <div className="text-red-600 font-bold text-xs uppercase tracking-wider mb-2 font-sans">
                            Phrase n°2 — La pire intention
                        </div>
                        <div className="text-2xl font-black text-gray-900 mb-4 font-sans">
                            « Ne stresse pas, c'est juste un match. »
                        </div>
                        <p className="text-gray-700 mb-6 font-medium">
                            Il existe une loi neurologique simple : <strong>dire à quelqu'un de ne pas stresser augmente son niveau de stress.</strong> C'est documenté, mesurable, systématique. Quand vous dites « ne stresse pas », vous signalez qu'il y a quelque chose de stressant — et son cerveau cherche immédiatement quoi.
                        </p>
                        <div className="bg-white rounded-xl p-4 border border-red-100/50">
                            <div className="text-loo-green-600 font-bold text-xs uppercase tracking-wider mb-1 font-sans">
                                ✓ À la place, dites
                            </div>
                            <div className="text-gray-900 font-bold">
                                Rien. Un sourire. Et vous le laissez partir.
                            </div>
                        </div>
                    </div>

                    {/* Phrase 3 */}
                    <div className="bg-red-50/50 border border-red-100 rounded-2xl p-8">
                        <div className="text-red-600 font-bold text-xs uppercase tracking-wider mb-2 font-sans">
                            Phrase n°3 — La plus sournoise
                        </div>
                        <div className="text-2xl font-black text-gray-900 mb-4 font-sans">
                            « Allez, j'ai confiance en toi. »
                        </div>
                        <p className="text-gray-700 mb-6 font-medium">
                            Celle-là ressemble tellement à du soutien. Et pourtant. <strong>La confiance implique une attente. Une attente implique la possibilité de la décevoir.</strong> Ce que votre enfant entend, inconsciemment : « Si tu rates, tu me déçois. » Vous pensiez le libérer. Vous venez de le charger.
                        </p>
                        <div className="bg-white rounded-xl p-4 border border-red-100/50">
                            <div className="text-loo-green-600 font-bold text-xs uppercase tracking-wider mb-1 font-sans">
                                ✓ À la place, dites
                            </div>
                            <div className="text-gray-900 font-bold">
                                « Je suis là pour te regarder jouer. Peu importe le résultat. »
                            </div>
                        </div>
                    </div>
                </div>

                <ScienceBox title="Fondement scientifique">
                    L'injonction de résultat active le cortex préfrontal en mode « évaluation ». L'enfant ne joue plus — <strong>il se surveille.</strong> La créativité, la prise de risque et la fluidité technique s'effondrent. Ce n'est pas une opinion. C'est mesurable à l'IRM fonctionnelle.
                </ScienceBox>

                <RuleBox>
                    Avant le match : une seule phrase.<br />
                    Puis silence.
                </RuleBox>
            </LessonSection>

            <div className="h-12" />

            <LessonSection>
                <LessonHeader
                    num="LEÇON 0.2"
                    title={
                        <>
                            Le test<br />
                            du regard
                        </>
                    }
                    hook="Un seul geste à observer. Vérifiable dès samedi prochain. Infaillible."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-12">
                    Il existe un indicateur précis pour savoir si votre enfant joue pour lui — ou pour vous.
                </p>

                <p>
                    Vous n'avez besoin d'aucun outil, d'aucun test psychologique. Juste de vos yeux, pendant un match.
                </p>

                <div className="bg-gray-900 text-white rounded-3xl p-10 my-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-loo-green-500 rounded-full blur-[100px] opacity-20 -mr-10 -mt-10 pointer-events-none" />
                    <div className="text-loo-green-400 font-bold text-xs uppercase tracking-widest mb-4 font-sans relative z-10">
                        LE TEST
                    </div>
                    <div className="text-3xl md:text-4xl font-black mb-6 leading-tight font-sans relative z-10">
                        Pendant le match,<br />
                        quand il fait une erreur —<br />
                        est-ce qu'il se retourne vers vous ?
                    </div>
                    <p className="text-gray-400 text-xl font-medium relative z-10">
                        Pas vers le jeu. Pas vers son coach. <strong className="text-white">Vers vous.</strong>
                    </p>
                </div>

                <p>
                    Si votre enfant cherche votre regard après une passe ratée, un mauvais contrôle, un duel perdu — il ne cherche pas votre soutien.
                </p>
                <p>
                    <strong>Il vérifie votre réaction. Il vérifie si vous êtes déçu. Il vérifie si vous l'aimez encore.</strong>
                </p>
                <p>
                    À ce moment précis, son cerveau a quitté le match. Il n'est plus sur le terrain. Il est dans votre tête. Et il a raté la passe suivante avant même de la jouer.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-12">
                    <div className="bg-red-50/50 border border-red-100 rounded-2xl p-8">
                        <div className="font-bold text-red-600 mb-6 pb-4 border-b border-red-200 uppercase tracking-wide text-sm font-sans">
                            Enfant sous pression parentale
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className="text-red-400 shrink-0 mt-1">✗</span>
                                <span className="text-gray-700">Se retourne vers les tribunes après une erreur</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-400 shrink-0 mt-1">✗</span>
                                <span className="text-gray-700">Joue <strong>pour ne pas décevoir</strong></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-400 shrink-0 mt-1">✗</span>
                                <span className="text-gray-700">Crispe ses choix. Évite le risque</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-400 shrink-0 mt-1">✗</span>
                                <span className="text-gray-700">Joue en mode survie</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-400 shrink-0 mt-1">✗</span>
                                <span className="text-gray-900 font-bold">Ce joueur-là recule.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-loo-green-50/50 border border-loo-green-100 rounded-2xl p-8">
                        <div className="font-bold text-loo-green-600 mb-6 pb-4 border-b border-loo-green-200 uppercase tracking-wide text-sm font-sans">
                            Enfant qui joue pour lui
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className="text-loo-green-500 shrink-0 mt-1">✓</span>
                                <span className="text-gray-700">Repart immédiatement dans le jeu après une erreur</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-loo-green-500 shrink-0 mt-1">✓</span>
                                <span className="text-gray-700">Joue <strong>pour exprimer, pour tenter</strong></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-loo-green-500 shrink-0 mt-1">✓</span>
                                <span className="text-gray-700">Prend des risques. Invente</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-loo-green-500 shrink-0 mt-1">✓</span>
                                <span className="text-gray-700">Joue en mode liberté</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-loo-green-500 shrink-0 mt-1">✓</span>
                                <span className="text-gray-900 font-bold">Ce joueur-là, les recruteurs le voient.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <RuleBox title="À faire dès samedi">
                    Comptez le nombre de fois où votre enfant cherche votre regard après une erreur.<br />
                    Ce chiffre est votre vrai score de pression parentale.
                </RuleBox>

                <p>
                    Ce regard — vous l'avez fabriqué. Pas intentionnellement. Avec vos mots. Avec vos réactions. Avec vos silences chargés dans la voiture du retour.
                </p>
                <p>
                    <strong>La bonne nouvelle : ce que vous avez fabriqué, vous pouvez le défaire.</strong>
                </p>

            </LessonSection>
        </div>
    );
}
