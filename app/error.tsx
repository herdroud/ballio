"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 p-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full border border-red-100">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="text-red-600" size={40} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                    Une erreur est survenue
                </h2>
                <p className="text-slate-500 mb-8 leading-relaxed text-sm">
                    Ne vous inquiétez pas, notre équipe technique est sur le coup.
                    Essayez de rafraîchir la page.
                </p>
                <div className="space-y-3">
                    <Button
                        onClick={() => reset()}
                        className="w-full h-12 font-bold bg-slate-900 hover:bg-slate-800 text-lg"
                    >
                        Réessayer
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => window.location.href = "/"}
                        className="w-full font-medium text-slate-500 hover:text-slate-900"
                    >
                        Retour à l'accueil
                    </Button>
                </div>
            </div>
        </div>
    );
}
