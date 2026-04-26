import React from "react";
import { LessonSection, LessonHeader } from "@/components/formation/ui/Lesson";
import { ChocQuote, ChocText } from "@/components/formation/ui/ChocQuote";
import { ScienceBox, RuleBox } from "@/components/formation/ui/Highlights";

export default function Module3Lesson3Page() {
    return (
        <div className="pb-24 pt-10">
            <LessonSection>
                <LessonHeader
                    num="LEÇON 3.3"
                    title={
                        <>
                            La Blessure<br />
                            Longue
                        </>
                    }
                    hook="Quand l'enfant perd son terrain, son groupe, son identité. Le risque que personne ne nomme."
                />

                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-8">
                    Vous pensez à la douleur physique. À la rééducation. Au retour. Ce que vous ne voyez pas encore — c&apos;est ce qui se passe en dehors du corps.
                </p>

                <p className="text-gray-700 leading-relaxed mb-12">
                    Semaine un — il ne va plus à l&apos;entraînement. Ses coéquipiers jouent sans lui. Il y a des blagues auxquelles il n&apos;a pas participé. Des matchs qu&apos;il n&apos;a pas joués. Un langage de groupe qui évolue sans lui. <strong>Votre enfant se demande si sa place l&apos;attend encore.</strong>
                </p>

                <ChocQuote>
                    Ce que vit votre enfant<br />
                    pendant une blessure longue,<br />
                    <ChocText>c&apos;est une perte d&apos;identité progressive.</ChocText>
                </ChocQuote>

                <ScienceBox title="La menace identitaire">
                    Les études sur les blessures longues chez les jeunes sportifs montrent que le risque psychologique majeur n&apos;est pas la douleur physique — c&apos;est la menace identitaire. Un enfant dont l&apos;identité est fortement liée au sport vit une blessure longue comme <strong>une perte de soi partielle</strong>. Sans accompagnement actif, le risque de dépression secondaire et d&apos;abandon au retour est significativement plus élevé.
                </ScienceBox>

                <p className="text-lg text-gray-800 mb-12">
                    Votre rôle change. Il ne s&apos;agit plus de gérer le sport. <strong>Il s&apos;agit de maintenir le lien de votre enfant avec lui-même.</strong>
                </p>

                {/* PHASES */}
                <div className="space-y-12 my-16">
                    <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-8">
                        <div className="md:w-32 shrink-0">
                            <div className="text-loo-green-600 font-black text-4xl mb-2 font-sans opacity-20">1</div>
                            <div className="text-xs uppercase tracking-widest font-bold text-gray-400 font-sans">Semaines 1 & 2</div>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-4 font-sans uppercase tracking-tight">Le Choc — Vie normale maintenue</h4>
                            <p className="text-gray-600 leading-relaxed mb-6">Votre enfant s&apos;adapte encore. Il est peut-être en colère, ou il fait semblant que ça va. </p>
                            <div className="bg-loo-green-50 p-4 rounded-xl border border-loo-green-100">
                                <p className="text-loo-green-900 text-sm">
                                    <strong>L&apos;Action :</strong> Vous ne sur-compensez pas. Pas de grands discours. <strong>Vous faites la vie normale</strong> — pour exister ensemble en dehors du football.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-8">
                        <div className="md:w-32 shrink-0">
                            <div className="text-loo-green-600 font-black text-4xl mb-2 font-sans opacity-20">2</div>
                            <div className="text-xs uppercase tracking-widest font-bold text-gray-400 font-sans">Semaines 3 à 6</div>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-4 font-sans uppercase tracking-tight">La Frustration — Nourrir autre chose</h4>
                            <p className="text-gray-600 leading-relaxed mb-6">Souvent la plus difficile. La douleur physique s&apos;atténue. L&apos;ennui s&apos;installe. Il voit ses coéquipiers progresser sans lui.</p>
                            <div className="bg-loo-green-50 p-4 rounded-xl border border-loo-green-100">
                                <p className="text-loo-green-900 text-sm">
                                    <strong>L&apos;Action :</strong> Vous l&apos;aidez à trouver quelque chose d&apos;autre — pas pour remplacer le football, pour nourrir une autre partie de lui. Et <strong>vous parlez de lui, pas de son genou.</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-8">
                        <div className="md:w-32 shrink-0">
                            <div className="text-loo-green-600 font-black text-4xl mb-2 font-sans opacity-20">3</div>
                            <div className="text-xs uppercase tracking-widest font-bold text-gray-400 font-sans">Le Retour</div>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-4 font-sans uppercase tracking-tight">Le Bénéfice — Ne pas surcharger l&apos;enjeu</h4>
                            <p className="text-gray-600 leading-relaxed mb-6">Un enfant qui a maintenu une identité en dehors du football pendant sa blessure revient plus fort mentalement. Il est entier. Il n&apos;a pas besoin du football pour exister.</p>
                            <div className="bg-loo-green-50 p-4 rounded-xl border border-loo-green-100">
                                <p className="text-loo-green-900 text-sm">
                                    <strong>L&apos;Action :</strong> <strong>Pas de « c&apos;est le grand retour ».</strong> « Tu es prêt ? Alors vas-y. » C&apos;est tout ce dont il a besoin.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SCRIPT */}
                <div className="bg-gray-900 text-white rounded-[32px] p-10 md:p-16 relative overflow-hidden my-16 shadow-2xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-loo-green-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 pointer-events-none" />

                    <div className="flex items-center gap-4 mb-10 relative z-10">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">💬</div>
                        <h3 className="text-xl font-black text-white tracking-tight font-sans">Le premier soir — Ce que vous dites</h3>
                    </div>

                    <div className="space-y-6 font-sans text-xl md:text-2xl font-light text-loo-green-50 relative z-10">
                        <p>« Ça fait mal et c&apos;est normal que ça fasse mal. »</p>
                        <p>« Ton corps va se réparer — c&apos;est sa spécialité. »</p>
                        <p className="font-bold text-white text-3xl">« Pendant ce temps — t&apos;es toujours toi. Le football c&apos;est ce que tu fais. Pas qui tu es. »</p>
                    </div>

                    <div className="mt-12 pt-10 border-t border-white/10 text-gray-400 text-sm leading-relaxed relative z-10 italic">
                        Cette dernière phrase — vous pouvez la répéter pendant toute la blessure. Pas à chaque conversation. <strong>Une fois par semaine suffit.</strong> C&apos;est la chose la plus utile que vous puissiez ancrer pendant cette période.
                    </div>
                </div>

                <RuleBox title="Règle d'or Loopio — Leçon 3.3">
                    « Comment tu vas, toi ? »<br />
                    Pas « Comment va ton genou ? »<br />
                    Deux questions différentes. Deux enfants différents en réponse.
                </RuleBox>
            </LessonSection>
        </div>
    );
}
