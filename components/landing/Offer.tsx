"use client";

import { Check, ShieldCheck } from "lucide-react";

export default function Offer() {
    return (
        <section className="py-24 bg-slate-900 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                    Commencer simplement
                </h2>
                <p className="text-xl text-slate-400 mb-12">
                    Ballio est accessible en ligne. À votre rythme. Quand vous en avez besoin.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
                    <ul className="space-y-4">
                        {[
                            "Accès complet à la plateforme",
                            "Contenus clairs et progressifs"
                        ].map((item, idx) => (
                            <li key={idx} className="flex gap-4 text-slate-300 items-center bg-slate-800/50 p-4 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                    <Check className="w-5 h-5 text-blue-400" />
                                </div>
                                <span className="font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <ul className="space-y-4">
                        {[
                            "Outils pratiques pour les situations du quotidien",
                            "Mises à jour incluses"
                        ].map((item, idx) => (
                            <li key={idx} className="flex gap-4 text-slate-300 items-center bg-slate-800/50 p-4 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                    <Check className="w-5 h-5 text-blue-400" />
                                </div>
                                <span className="font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="inline-flex items-center gap-4 bg-slate-950 p-6 rounded-xl border border-slate-800">
                    <ShieldCheck className="w-8 h-8 text-green-500 shrink-0" />
                    <div className="text-left">
                        <h4 className="text-white font-bold mb-1">Garantie sérénité</h4>
                        <p className="text-slate-400 text-sm">
                            Si Ballio ne vous apporte rien, vous arrêtez. Simplement.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
