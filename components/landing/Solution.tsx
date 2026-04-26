"use client";

import { motion } from "framer-motion";
import { Brain, Heart, Shield, MessageCircle } from "lucide-react";

export default function Solution() {
    return (
        <section id="solution" className="py-24 bg-slate-900 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-4">La Solution Ballio</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Ballio, c’est quoi exactement ?
                    </h3>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Une plateforme conçue pour les parents. Pas pour entraîner les enfants.
                        Mais pour aider les parents à jouer leur rôle correctement.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {[
                        { icon: Shield, title: "Protège le plaisir", desc: "en évitant la saturation mentale" },
                        { icon: Brain, title: "Renforce le mental", desc: "par un soutien adapté" },
                        { icon: Heart, title: "Favorise la progression", desc: "sur le long terme" }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center"
                        >
                            <div className="w-12 h-12 mx-auto bg-blue-900/30 rounded-full flex items-center justify-center text-blue-400 mb-4">
                                <item.icon size={24} />
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                            <p className="text-slate-400">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <h4 className="text-2xl font-bold text-white">Concrètement, Ballio vous aide à :</h4>
                        <ul className="space-y-4">
                            {[
                                "Comprendre ce qui aide réellement un jeune footballeur à progresser",
                                "Adapter votre attitude à son âge, son niveau et sa personnalité",
                                "Mieux communiquer avant et après les matchs",
                                "Soutenir sans mettre de pression inutile",
                                "Éviter les erreurs qui freinent (souvent sans s’en rendre compte)"
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-3 text-slate-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700/50">
                        <h4 className="text-xl font-bold text-white mb-6">Une approche simple, structurée, humaine</h4>
                        <ul className="space-y-4">
                            {[
                                "Des contenus courts et clairs",
                                "Des situations concrètes du quotidien",
                                "Des outils pratiques à appliquer immédiatement",
                                "Une pédagogie pour les parents, pas pour les experts"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 pt-8 border-t border-slate-700/50 text-center text-slate-400 italic">
                            "Pas de discours culpabilisant. Pas de recettes miracles. Juste des repères solides."
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        <MessageCircle size={18} />
                        <span className="font-semibold">Des experts, des témoignages, une méthode long terme.</span>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <a href="#offer" className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-2 transition-colors">
                        Découvrir comment Ballio peut vous aider <ArrowRight size={18} />
                    </a>
                </div>
            </div>
        </section>
    );

}
import { ArrowRight, CheckCircle2 } from "lucide-react";
