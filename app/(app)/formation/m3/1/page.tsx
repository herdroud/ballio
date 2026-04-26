import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { ScienceBox } from "@/components/formation/ui/Highlights";

export default function Module3Lesson1Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="LEÇON 3.1"
                    title={
                        <>
                            Il a Coûté<br />
                            le Match
                        </>
                    }
                    hook="Le penalty raté. Le rouge stupide. L'erreur en fin de match. Le moment le plus périlleux pour un enfant sportif."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Il rate le penalty. La balle passe au-dessus de la barre. L&apos;équipe adverse remporte la finale.
                </p>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Il est seul au centre du terrain pendant quatre secondes. <strong>Ces quatre secondes — votre enfant les vivra encore pendant des années.</strong> Il sort du terrain. Il monte dans la voiture. Et là, vous avez une fenêtre de 24 heures.
                </p>

                <p className="text-gray-900 font-bold mb-12">
                    Ce que vous faites pendant ces 24 heures va soit ancrer cette erreur dans son identité, soit lui apprendre quelque chose d&apos;essentiel sur ce qu&apos;est une erreur.
                </p>

                <ChocQuote>
                    Son cerveau est en train de décider :<br />
                    est-ce que c&apos;est <span className="text-red-600">un geste raté</span><br />
                    — ou est-ce qu&apos;il est raté ?
                </ChocQuote>

                <p className="mb-12">
                    Ce n&apos;est pas une nuance philosophique. C&apos;est une bifurcation neurologique. Un geste raté — l&apos;enfant peut l&apos;analyser, l&apos;intégrer, progresser. Un enfant raté — c&apos;est une conclusion sur son identité. Elle peut durer des années.
                </p>

                <ScienceBox title="La fenêtre de consolidation">
                    La consolidation émotionnelle d&apos;un souvenir douloureux se produit dans les <strong>6 à 24 heures après l&apos;événement</strong>. C&apos;est pendant cette fenêtre que le contexte social — notamment la réaction parentale — influence si l&apos;erreur est encodée comme « une chose qui m&apos;est arrivée » ou comme « une chose qui dit qui je suis ». Les commentaires parentaux dans cette fenêtre sont plus influents que le coaching sportif.
                </ScienceBox>

                {/* BIFURCATION GRID */}
                <div className="grid md:grid-cols-2 gap-8 my-16">
                    <div className="bg-white border-2 border-red-50 rounded-3xl p-8 relative overflow-hidden group">
                        <div className="text-red-600 font-bold text-xs uppercase tracking-widest mb-6 font-sans">Chemin A — Ce qui aggrave</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4">Analyser l&apos;erreur</h4>
                        <p className="text-gray-600 mb-6 italic">Dans la voiture, vous analysez. « Le gardien était à gauche, tu aurais dû tirer à droite. » Ou vous gardez un silence lourd — qui dit la même chose. À la maison, vous appellez la famille pour raconter la défaite. Votre enfant vous entend.</p>
                        <div className="mt-8 pt-6 border-t border-red-50 text-red-700 font-bold text-sm">
                            Ce qu&apos;il retient : « J&apos;ai déçu mon père. »
                        </div>
                    </div>

                    <div className="bg-loo-green-50 border-2 border-loo-green-100 rounded-3xl p-8 relative overflow-hidden">
                        <div className="text-loo-green-600 font-bold text-xs uppercase tracking-widest mb-6 font-sans">Chemin B — Ce qui aide</div>
                        <h4 className="text-xl font-bold text-loo-green-900 mb-4">Le soir : une phrase</h4>
                        <p className="text-gray-700 mb-6">Règle des 30 minutes dans la voiture. Silence sur le match. À la maison, une seule phrase — le script ci-dessous. Rien de plus. Vous lui donnez la permission de souffrir ET la promesse de votre présence.</p>
                        <div className="mt-8 pt-6 border-t border-loo-green-200 text-loo-green-700 font-bold text-sm">
                            Ce qu&apos;il retient : « Je peux traverser ça. »
                        </div>
                    </div>
                </div>

                {/* SCRIPTS */}
                <div className="bg-gray-900 text-white rounded-[32px] p-10 md:p-16 relative overflow-hidden my-16 shadow-2xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-loo-green-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 pointer-events-none" />

                    <div className="flex items-center gap-4 mb-10 relative z-10">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">💬</div>
                        <h3 className="text-xl font-black text-white tracking-tight font-sans">Le soir même — Une seule phrase. Mot pour mot.</h3>
                    </div>

                    <div className="space-y-4 font-sans text-xl md:text-2xl font-light text-loo-green-50 relative z-10">
                        <p>« Ce penalty — tu peux le rejouer dans ta tête autant de fois que tu veux ce soir. »</p>
                        <p>« Ça va faire mal. C&apos;est normal. »</p>
                        <p className="font-bold text-white">« Demain matin, si tu veux en parler — je suis là. »</p>
                        <p>« Et si tu ne veux pas en parler — c&apos;est correct aussi. »</p>
                    </div>

                    <div className="mt-12 pt-10 border-t border-white/10 text-gray-400 text-sm leading-relaxed relative z-10 italic">
                        Puis silence. Ne dites pas <strong>« ça va aller »</strong>. Ne dites pas <strong>« c&apos;est pas grave »</strong>. Ce que vous venez de lui donner — c&apos;est la permission de souffrir ET la promesse de votre présence. Ces deux choses ensemble. C&apos;est tout ce dont il a besoin ce soir.
                    </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-[32px] p-10 md:p-16 shadow-sm my-16">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">💬</div>
                        <h3 className="text-xl font-black text-gray-900 tracking-tight font-sans">Le lendemain — La seule question utile</h3>
                    </div>

                    <p className="text-2xl md:text-3xl font-serif text-loo-green-700 italic mb-10 text-center">
                        « Qu&apos;est-ce que tu retiens de ce penalty — pas l&apos;erreur — le trajet pour y arriver ? »
                    </p>

                    <p className="text-gray-500 leading-relaxed text-sm">
                        Cette question déplace le regard de l&apos;erreur finale vers le processus entier. Elle lui apprend que le <strong>courage de prendre ce penalty</strong> compte autant que le résultat. Elle ne nie pas l&apos;erreur. Elle la contextualise. Vous écoutez. Vous ne corrigez pas.
                    </p>
                </div>

                {/* PROTOCOLE */}
                <div className="bg-loo-green-50/50 border border-loo-green-100 rounded-[32px] p-8 md:p-12 my-16">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-10 h-10 bg-white shadow-sm border border-loo-green-100 rounded-xl flex items-center justify-center font-bold text-loo-green-600">📋</div>
                        <h3 className="text-lg font-black text-loo-green-900 font-sans">Protocole — Les 24h après l&apos;erreur fatale</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-6 items-start group">
                            <div className="w-8 h-8 rounded-lg bg-loo-green-100 text-loo-green-600 flex items-center justify-center font-black shrink-0">1</div>
                            <p className="text-gray-700">Voiture retour : <strong>règle des 30 minutes</strong>. Silence sur le match.</p>
                        </div>
                        <div className="flex gap-6 items-start group">
                            <div className="w-8 h-8 rounded-lg bg-loo-green-100 text-loo-green-600 flex items-center justify-center font-black shrink-0">2</div>
                            <p className="text-gray-700">Le soir même : <strong>une seule phrase</strong> (script ci-dessus). Zéro analyse de l&apos;erreur technique.</p>
                        </div>
                        <div className="flex gap-6 items-start group">
                            <div className="w-8 h-8 rounded-lg bg-loo-green-100 text-loo-green-600 flex items-center justify-center font-black shrink-0">3</div>
                            <p className="text-gray-700"><strong>Ne pas appeler la famille</strong> pour raconter la défaite dans les 24h. Il vous entend.</p>
                        </div>
                        <div className="flex gap-6 items-start group">
                            <div className="w-8 h-8 rounded-lg bg-loo-green-100 text-loo-green-600 flex items-center justify-center font-black shrink-0">4</div>
                            <p className="text-gray-700">Le lendemain : disponible, pas pressant. S&apos;il parle — une seule question. S&apos;il ne parle pas — présence normale.</p>
                        </div>
                        <div className="flex gap-6 items-start group">
                            <div className="w-8 h-8 rounded-lg bg-loo-green-100 text-loo-green-600 flex items-center justify-center font-black shrink-0">5</div>
                            <p className="text-gray-700">La semaine suivante : <strong>laissez le coach gérer l&apos;aspect technique</strong>. Zéro replay de l&apos;erreur avec vous.</p>
                        </div>
                    </div>
                </div>

                <RuleBox title="Règle d'or Loopio — Leçon 3.1">
                    Une erreur doit rester une erreur.<br />
                    Pas une conclusion sur qui il est.<br />
                    C&apos;est votre rôle de tenir cette ligne.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
