"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Identification() {
    const points = [
        "Vous repensez souvent aux matchs après coup",
        "Vous ne savez pas toujours quoi dire (ou quoi ne pas dire)",
        "Vous avez peur qu’il “passe à côté” s’il ne fait pas assez",
        "Vous hésitez entre le laisser tranquille et l’encourager davantage",
        "Vous vous demandez parfois si vous faites vraiment les bons choix"
    ];

    return (
        <section className="py-24 bg-slate-950 px-4">
            <div className="max-w-3xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-white mb-12"
                >
                    Vous vous reconnaîtrez peut-être si…
                </motion.h2>

                <div className="space-y-4 mb-12 text-left bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
                    {points.map((point, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4"
                        >
                            <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                            <p className="text-lg text-slate-300">{point}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                >
                    <p className="text-2xl text-white font-semibold">
                        Vous n’êtes pas seul.
                    </p>
                    <p className="text-xl text-blue-400">
                        Et surtout, ce doute est sain.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
