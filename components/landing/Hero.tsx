"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden bg-slate-950">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none opacity-40" />

            <div className="max-w-4xl mx-auto text-center relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-8">
                        <AlertTriangle size={16} />
                        <span>Constat alarmant</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-white">
                        9 parents sur 10 sabotent la progression de leur enfant footballeur.
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-4 mb-10"
                >
                    <p className="text-xl md:text-2xl text-blue-200 font-semibold">
                        Faites-vous partie du problème ?
                    </p>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Vous pensez l’aider. Sans le vouloir, vous pourriez le freiner.
                        <br className="hidden md:block" />
                        La pression parentale invisible est l’une des premières causes de talents gâchés.
                    </p>
                    <p className="text-lg text-slate-300 font-medium">
                        On apprend aux enfants à jouer. Ballio apprend aux parents à ne pas les freiner.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="h-14 px-8 text-lg font-bold bg-white text-slate-900 hover:bg-slate-100 border-2 border-white transition-all shadow-lg" asChild>
                            <Link href="/login">
                                Se connecter
                            </Link>
                        </Button>
                        <Button size="lg" className="h-14 px-8 text-lg font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transition-all" asChild>
                            <Link href="/quiz">
                                Faire le diagnostic parental gratuit <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                    <p className="text-sm text-slate-500">
                        (3 minutes · aucun jugement)
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
