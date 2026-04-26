import React from "react";
import Link from "next/link";

export default function BibliothequePage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md w-full bg-white rounded-[40px] p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-loo-green-100 rounded-full blur-3xl opacity-50 -mr-16 -mt-16" />
                <div className="relative z-10">
                    <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-8 rotate-3 shadow-sm">
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-loo-green-600"
                        >
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17C8.5 17 11 18 11 20C11 21.5 10 22 10 22H14C14 22 13 21.5 13 20C13 18 15.5 17 17.5 17A2.5 2.5 0 0 1 20 19.5V5A2.5 2.5 0 0 0 17.5 2.5H6.5A2.5 2.5 0 0 0 4 5V19.5Z" />
                            <line x1="9" y1="9" x2="15" y2="9" />
                            <line x1="9" y1="13" x2="15" y2="13" />
                            <line x1="9" y1="17" x2="15" y2="17" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                        La Bibliothèque <br />
                        <span className="text-loo-green-600">Arrive Bientôt</span>
                    </h1>
                    <p className="text-gray-500 leading-relaxed mb-10 px-4">
                        Nous préparons un espace dédié avec tous vos guides, fiches récapitulatives et ressources exclusives pour optimiser le parcours de votre enfant.
                    </p>
                    <Link href="/dashboard" className="inline-block w-full no-underline">
                        <button className="w-full py-4 rounded-2xl border-none cursor-pointer text-sm font-bold bg-gray-900 text-white hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-gray-200">
                            Retour au Dashboard
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

