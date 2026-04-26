"use client";

import { motion } from "framer-motion";
import { AlertCircle, XCircle } from "lucide-react";

export default function Problem() {
    return (
        <section id="problem" className="py-20 px-4 bg-slate-900 relative overflow-hidden">
            <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 text-blue-400 font-semibold mb-6">
                            <AlertCircle className="w-5 h-5" />
                            <span>La réalité du terrain</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Ce qui freine le plus les jeunes footballeurs n’est pas le manque de talent.
                        </h2>
                        <div className="space-y-4 text-slate-300 text-lg">
                            <p>
                                Une pression qui commence souvent à la maison.
                            </p>
                            <p>
                                Des attentes trop fortes posées trop tôt.
                            </p>
                            <p>
                                Une communication parent-enfant mal ajustée.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-xl"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">
                            Le paradoxe parental
                        </h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                        1
                                    </div>
                                </div>
                                <div>
                                    <p className="text-slate-300 font-medium">Vous aimez votre enfant.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                        2
                                    </div>
                                </div>
                                <div>
                                    <p className="text-slate-300 font-medium">Vous voulez ce qu’il y a de mieux pour lui.</p>
                                </div>
                            </div>

                            <div className="h-px bg-slate-800 my-4" />

                            <div className="flex gap-4 items-start">
                                <XCircle className="w-8 h-8 text-red-500 shrink-0" />
                                <div>
                                    <p className="text-white font-bold mb-1">Mais vouloir bien faire ne veut pas toujours dire bien faire.</p>
                                    <p className="text-slate-400">Ballio aide les parents à corriger ça.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
