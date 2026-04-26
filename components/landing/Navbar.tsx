import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="absolute top-0 left-0 w-full p-6 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-black tracking-tighter text-white hover:opacity-80 transition">
                    BALLIO<span className="text-blue-600">.</span>
                </Link>

                {/* Navigation Desktop */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="#problem" className="text-sm font-medium text-slate-300 hover:text-white transition">
                        Problème
                    </Link>
                    <Link href="#solution" className="text-sm font-medium text-slate-300 hover:text-white transition">
                        Solution
                    </Link>
                </div>

                {/* Actions Droite */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-900 gap-2 font-medium" asChild>
                        <Link href="/sign-in">
                            <LogIn size={18} />
                            <span className="hidden sm:inline">Espace Membre</span>
                        </Link>
                    </Button>
                    <Button size="sm" className="bg-slate-100 text-slate-900 hover:bg-white font-bold hidden sm:flex" asChild>
                        <Link href="/quiz">Diagnostic Gratuit</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
