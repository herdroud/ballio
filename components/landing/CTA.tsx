import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="py-32 px-4 text-center relative overflow-hidden bg-blue-600">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent"></div>

            <div className="max-w-3xl mx-auto relative z-10">
                <Trophy className="mx-auto text-white mb-8 h-20 w-20 drop-shadow-2xl" />
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                    Le prochain match <br />se joue maintenant.
                </h2>
                <p className="text-xl text-blue-100 mb-12 font-medium max-w-2xl mx-auto">
                    Chaque mot compte. Chaque repas compte. Chaque geste compte.<br />
                    Êtes-vous sûr de faire les bons choix ?
                </p>
                <Button size="lg" className="h-20 px-16 text-2xl font-bold bg-white text-blue-900 hover:bg-slate-100 hover:scale-105 transition-all shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border-b-8 border-slate-200" asChild>
                    <Link href="/quiz">Faire le diagnostic (Gratuit)</Link>
                </Button>
                <p className="mt-8 text-sm text-blue-200 font-medium opacity-80">Rejoignez les parents de l'élite dès aujourd'hui.</p>
            </div>
        </section>
    );
}
