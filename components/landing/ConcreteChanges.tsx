"use client";

import { motion } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ConcreteChanges() {
    return (
        <section className="py-24 bg-slate-950 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Ce que Ballio change concrètement
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    {/* Pour votre enfant */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="bg-blue-900/10 p-8 rounded-3xl border border-blue-500/20"
                    >
                        <h3 className="text-2xl font-bold text-blue-400 mb-8 flex items-center gap-3">
                            <Star className="fill-blue-400 text-blue-400" /> Pour votre enfant
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "Il joue avec plus de plaisir, moins de peur de décevoir",
                                "Il développe un mental plus solide, sans pression excessive",
                                "Il gagne en confiance et en autonomie",
                                "Il progresse dans un environnement plus sain et plus stable",
                                "Il a plus de chances de durer dans le football"
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-4 text-slate-200">
                                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                        <Check className="w-4 h-4 text-blue-400" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Pour vous, parent */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-slate-900 p-8 rounded-3xl border border-slate-800"
                    >
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <Star className="text-slate-500" /> Pour vous, parent
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "Vous savez quoi dire (et surtout quoi éviter)",
                                "Vous comprenez votre vrai rôle dans son parcours",
                                "Vous prenez de meilleures décisions, au bon moment",
                                "Vous soutenez votre enfant sans vous sentir perdu ou coupable",
                                "Vous retrouvez une relation plus sereine autour du football"
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-4 text-slate-300">
                                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                                        <Check className="w-4 h-4 text-slate-400" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <div className="text-center space-y-8">
                    <div className="text-2xl md:text-3xl font-bold text-white max-w-4xl mx-auto leading-relaxed">
                        <span className="block text-blue-400 mb-2">Au final :</span>
                        Un enfant mieux accompagné.
                        Un parent plus juste.
                        Un parcours plus cohérent.
                    </div>

                    <p className="text-xl text-slate-400 italic">
                        C’est rarement le talent qui manque. C’est souvent l’environnement.
                    </p>

                    <Button size="lg" className="mt-8 bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-12 text-lg font-medium" asChild>
                        <Link href="/quiz">
                            Voir comment Ballio peut vous aider concrètement <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
