"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AntiObjections() {
    return (
        <section className="py-24 bg-slate-950 px-4 relative overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wider">
                        Ce que Ballio n’est PAS
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {[
                        {
                            title: "Ballio ne promet pas une carrière professionnelle.",
                            desc: "Parce que le football n’offre aucune garantie."
                        },
                        {
                            title: "Ballio n’entraîne pas votre enfant.",
                            desc: "Ce rôle appartient aux clubs et aux coachs."
                        },
                        {
                            title: "Ballio n’ajoute pas de pression.",
                            desc: "Il aide à retirer celle qui existe déjà."
                        },
                        {
                            title: "Ballio ne culpabilise pas les parents.",
                            desc: "Il part d’une intention simple : vouloir faire au mieux."
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-red-900/10 border border-red-500/20 p-6 rounded-xl flex gap-4 items-start"
                        >
                            <X className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                            <div>
                                <h3 className="text-red-200 font-bold mb-2">{item.title}</h3>
                                <p className="text-slate-400 text-sm">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center space-y-8 bg-blue-900/10 p-8 rounded-3xl border border-blue-500/20">
                    <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-3">
                        <Check className="w-8 h-8 text-blue-500" />
                        Ballio aide les parents à adopter la bonne posture, au bon moment.
                    </h3>

                    <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-950 hover:text-blue-300" asChild>
                        <Link href="/quiz">
                            Faire le diagnostic parental gratuit
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
