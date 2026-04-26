"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function SocialProof() {
    return (
        <section className="py-24 bg-slate-900 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Ballio s’appuie sur le terrain, pas sur des promesses
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        Ballio est construit à partir de situations vécues : parents, joueurs, éducateurs, préparateurs, spécialistes de l’accompagnement.
                        <br />
                        <span className="text-blue-400 font-medium">Pas de théorie déconnectée. Uniquement ce qui a été observé, testé et compris sur le terrain.</span>
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            quote: "J’ai vu des enfants très au-dessus de la moyenne disparaître en quelques saisons. Pas à cause du football. À cause de la pression autour d’eux.",
                            author: "Éducateur en club formateur"
                        },
                        {
                            quote: "Le problème n’est pas le talent. C’est souvent ce qui se passe à la maison après l’entraînement ou le match.",
                            author: "Responsable de structure jeune"
                        },
                        {
                            quote: "Les parents veulent bien faire. Mais mal accompagnés, ils peuvent faire plus de dégâts qu’un mauvais coach.",
                            author: "Ancien joueur / recruteur"
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-950 p-8 rounded-2xl border border-slate-800 relative group hover:border-blue-500/30 transition-colors"
                        >
                            <Quote className="w-10 h-10 text-blue-900/50 mb-4 group-hover:text-blue-500/20 transition-colors" />
                            <p className="text-slate-300 mb-6 italic min-h-[100px] flex items-center">
                                "{item.quote}"
                            </p>
                            <div className="flex items-center gap-3 border-t border-slate-900 pt-4">
                                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center font-bold text-slate-600 group-hover:text-blue-500 group-hover:bg-blue-900/10 transition-colors">
                                    {item.author[0]}
                                </div>
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{item.author}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                        Ce sont des situations réelles. Répétées. Observées sur des années.
                        <br />
                        <span className="text-blue-500">Ballio est né de ce constat.</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
