import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 p-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full border border-slate-100">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileQuestion className="text-blue-600" size={40} />
                </div>
                <h1 className="text-4xl font-black text-slate-900 mb-2">404</h1>
                <h2 className="text-xl font-bold text-slate-700 mb-4">Page introuvable</h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                    Oups ! La page que vous cherchez semble avoir disparu des terrains.
                </p>
                <Link href="/">
                    <Button className="w-full h-12 font-bold bg-blue-600 hover:bg-blue-700 text-lg">
                        Retour à l'accueil
                    </Button>
                </Link>
            </div>
        </div>
    );
}
