import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { RuleBox, ScienceBox } from "@/components/formation/ui/Highlights";

export default function Module0Lesson2Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="LEÇON 0.3"
                    title={
                        <>
                            Parent-Fan,<br />
                            Parent-Coach<br />
                            ou Parent-Manager ?
                        </>
                    }
                    hook="L'audit Loopio. Dans quel profil vous retrouvez-vous honnêtement ?"
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-12">
                    Avant d'identifier le bon comportement, il faut nommer le vôtre.
                </p>

                <p>
                    La plupart des parents oscillent entre deux profils problématiques sans en avoir conscience. Le troisième profil — le seul qui fonctionne — s'apprend. Il ne vient pas naturellement.
                </p>

                <div className="grid gap-6 my-10">
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-6 items-start">
                        <div className="shrink-0 flex flex-col items-center">
                            <div className="text-4xl mb-2">👊</div>
                            <div className="font-bold font-sans text-gray-900">Parent-Fan</div>
                        </div>
                        <div>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Il crie depuis la touche. Il vit le match dans son ventre. Son humeur du dimanche soir dépend du résultat. Il encourage — mais ses encouragements ressemblent à de la pression parce qu'ils dépendent du score.
                            </p>
                            <div className="text-red-700 font-medium bg-red-50 p-3 rounded-lg text-sm border border-red-100">
                                <strong>Ce que ça coûte →</strong> L'enfant joue sous tension émotionnelle permanente. Il ne prend pas de risques. Il joue pour ne pas vous décevoir.
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-6 items-start">
                        <div className="shrink-0 flex flex-col items-center">
                            <div className="text-4xl mb-2">📋</div>
                            <div className="font-bold font-sans text-gray-900">Parent-Coach</div>
                        </div>
                        <div>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Il donne des consignes tactiques, critique les choix de jeu, remet en cause les décisions du coach devant l'enfant. Il pense aider. Il croit que sa lecture du jeu est utile.
                            </p>
                            <div className="text-red-700 font-medium bg-red-50 p-3 rounded-lg text-sm border border-red-100">
                                <strong>Ce que ça coûte →</strong> L'enfant reçoit deux entraîneurs contradictoires dans sa tête. Il ne sait plus qui écouter. Il se paralyse.
                            </div>
                        </div>
                    </div>

                    <div className="bg-loo-green-50 border border-loo-green-200 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-6 items-start relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-[80px] opacity-70" />
                        <div className="shrink-0 flex flex-col items-center relative z-10">
                            <div className="text-4xl mb-2">🎯</div>
                            <div className="font-bold font-sans text-loo-green-900">Parent-Manager</div>
                        </div>
                        <div className="relative z-10">
                            <p className="text-gray-800 leading-relaxed mb-4">
                                Il gère le sommeil, la nutrition, l'équilibre scolaire, le cadre émotionnel. Il soutient sans diriger. Il est présent sans envahir. Il sait que le terrain appartient au coach — pas à lui.
                            </p>
                            <div className="text-loo-green-800 font-medium bg-white/60 p-3 rounded-lg text-sm border border-white">
                                <strong>Ce que ça produit →</strong> L'enfant joue libre. Créatif. Sans peur de l'erreur. C'est ce joueur-là que les recruteurs remarquent.
                            </div>
                        </div>
                    </div>
                </div>

                <ChocQuote>
                    Le Parent-Manager ne s'improvise pas.
                    <ChocText>Il s'apprend.</ChocText>
                </ChocQuote>

                <p>
                    Voilà pour les comportements. Mais il reste une question plus fondamentale — la plus difficile de tout ce module.
                </p>
                <p className="font-bold text-gray-900 text-xl mt-4">
                    À qui appartient vraiment ce projet ?
                </p>
            </LessonSection>

            <div className="h-12" />

            <LessonSection>
                <LessonHeader
                    num="VÉRIFICATION"
                    title="Le projet de qui ?"
                    hook="La question que personne ne pose jamais. Pas le club, pas l'éducateur, pas votre entourage."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-12">
                    Ce projet — le foot de votre enfant — c'est le sien ? Ou c'est le vôtre ?
                </p>

                <p>La réponse instinctive est toujours : <em>« Pour lui, évidemment. »</em></p>
                <p>Mais voici cinq signaux concrets. Vous les évaluez honnêtement, pour vous. Personne d'autre ne regarde.</p>

                <div className="space-y-6 my-10">
                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 shrink-0 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-400 text-xl font-sans">1</div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-2">Votre humeur du dimanche soir dépend du résultat du match.</h3>
                            <p className="text-gray-600">Victoire — vous êtes léger, généreux, disponible. Défaite — vous êtes dans votre tête, irritable, distant. <strong>Votre conjoint le sait. Vos autres enfants aussi. Et votre joueur le sait mieux que tout le monde.</strong></p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 shrink-0 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-400 text-xl font-sans">2</div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-2">Vous parlez du foot de votre enfant à des gens qui ne lui ont jamais parlé.</h3>
                            <p className="text-gray-600">Des collègues, des amis de dîner, la famille du weekend. Vous glissez les résultats, les sélections, les compliments du coach. <strong>Posez-vous la question : est-ce pour lui ? Ou est-ce que ça vous fait quelque chose à vous ?</strong></p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 shrink-0 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-400 text-xl font-sans">3</div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-2">Vous connaissez le classement de sa catégorie mieux que lui.</h3>
                            <p className="text-gray-600">Le nombre de buts de l'équipe cette saison. Les forces de l'adversaire du prochain match. <strong>Vous avez investi plus d'énergie cognitive dans ce classement que dans ce que ressent votre enfant après chaque entraînement.</strong></p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 shrink-0 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-400 text-xl font-sans">4</div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-2">Votre enfant ne rit plus dans la voiture en allant à l'entraînement.</h3>
                            <p className="text-gray-600">À huit ans, il courait vers la voiture. Aujourd'hui, il monte, il s'installe, il met ses écouteurs. Vous vous êtes dit que c'est l'âge. <strong>Ce n'est pas l'âge.</strong></p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start bg-red-50/50 p-6 rounded-2xl border border-red-100">
                        <div className="w-12 h-12 shrink-0 bg-red-100 rounded-full flex items-center justify-center font-black text-red-500 text-xl font-sans">5</div>
                        <div>
                            <h3 className="font-bold text-red-700 text-lg mb-2">Si votre enfant vous annonçait demain matin qu'il arrête le football —<br />quelle serait votre première émotion ?</h3>
                            <p className="text-gray-800 font-medium">
                                <strong>Du soulagement pour lui ?</strong><br />
                                Ou de la perte pour vous ?<br /><br />
                                La réponse que vous venez d'avoir dans votre tête — elle vous dit qui est au centre de ce projet.
                            </p>
                        </div>
                    </div>
                </div>

                <ScienceBox title="Ce que ça signifie">
                    Ce n'est pas de la mauvaise parentalité. <strong>C'est de la parentalité non formée.</strong> Un défaut de caractère ne se corrige pas facilement. Une compétence non acquise — ça s'apprend. Et ça change tout.
                </ScienceBox>
            </LessonSection>

            <div className="h-12" />

            {/* LETTRE */}
            <LessonSection className="bg-gray-900 text-white border-0 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-loo-green-500 rounded-full blur-[120px] opacity-20 pointer-events-none" />

                <div className="text-loo-green-400 font-bold uppercase tracking-widest text-[11px] mb-8 font-sans relative z-10">
                    Ce que vos enfants n'ont jamais réussi à vous dire
                </div>

                <p className="text-gray-400 leading-relaxed mb-16 relative z-10 font-medium max-w-2xl">
                    Au cours de mon travail, j'ai eu accès à des entretiens avec des enfants et adolescents sportifs — en confiance, loin du regard de leurs parents. Ce qui suit est une synthèse de ce qu'ils ont dit. Ce n'est pas la lettre d'un seul enfant.
                </p>

                <div className="space-y-16 relative z-10">
                    <div>
                        <div className="font-sans font-black text-3xl text-loo-green-50 mb-6">Papa.</div>
                        <div className="space-y-3 font-sans text-xl md:text-2xl font-light text-gray-300">
                            <p>Quand tu cries depuis le bord, je t'entends.</p>
                            <p>Je t'entends mieux que tout le monde sur ce terrain.</p>
                            <p>Mais à ce moment-là, je pense seulement à ne pas te décevoir.</p>
                            <p className="font-bold text-white">Et c'est exactement à ce moment que je rate.</p>
                        </div>
                    </div>

                    <div>
                        <div className="font-sans font-black text-3xl text-loo-green-50 mb-6">Maman.</div>
                        <div className="space-y-3 font-sans text-xl md:text-2xl font-light text-gray-300">
                            <p>Dans la voiture après les matchs, des fois je fais semblant de dormir.</p>
                            <p>Pas parce que je suis fatigué.</p>
                            <p className="font-bold text-white">Parce que si je dors, on ne parle pas du match.</p>
                            <p>Et j'ai juste besoin que ce soit fini.</p>
                        </div>
                    </div>

                    <div>
                        <div className="font-sans font-bold text-xl text-white/30 mb-6 italic">Ce que je n'ai pas su dire.</div>
                        <div className="space-y-3 font-sans text-xl md:text-2xl font-light text-gray-300">
                            <p>Je ne sais plus si ce que je vis sur le terrain, c'est pour moi.</p>
                            <p>Ce que je sais, c'est que vous y croyez tellement.</p>
                            <p>Alors je continue.</p>
                            <p>Même quand je suis à vide.</p>
                            <p>Même quand j'ai envie de pleurer dans les vestiaires.</p>
                            <p className="font-bold text-white text-3xl mt-4">Même quand j'aimerais qu'on parle d'autre chose.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-white/10 text-center relative z-10">
                    <div className="font-sans font-black text-2xl md:text-3xl text-white mb-4">
                        Est-ce que votre enfant<br />pourrait écrire cette lettre ?
                    </div>
                    <p className="text-loo-green-400 font-medium">
                        Si la réponse est peut-être — ne laissez pas ce « peut-être » devenir un « oui ».
                    </p>
                </div>
            </LessonSection>
        </div>
    );
}
