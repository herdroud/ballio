interface MatchCardProps {
    childName?: string;
}

export default function MatchCard({ childName = "Léon" }: MatchCardProps) {
    return (
        <div className="bg-white rounded-2xl p-5 min-[640px]:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3.5">
                📅 Prochain match
            </div>

            {/* Competition header */}
            <div className="flex justify-between items-center bg-gray-50 rounded-[10px] px-3.5 py-2.5 mb-1.5">
                <span className="text-[13px] font-bold text-gray-800">
                    ⚽ Championnat Régional U12
                </span>
                <span className="text-[12px] font-semibold text-loo-green-600">
                    Sam. 7 juin 2025
                </span>
            </div>

            {/* Teams */}
            <div className="flex items-center justify-center gap-4 py-4">
                <div className="text-center flex-1">
                    <div className="w-[50px] h-[50px] rounded-full bg-blue-50 flex items-center justify-center text-2xl mx-auto mb-[7px]">
                        🔵
                    </div>
                    <div className="text-[13px] font-bold text-gray-800">FC Bordeaux</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">Domicile</div>
                </div>
                <div className="bg-gray-100 text-gray-500 text-[13px] font-bold px-3 py-2 rounded-[9px] shrink-0">
                    VS
                </div>
                <div className="text-center flex-1">
                    <div className="w-[50px] h-[50px] rounded-full bg-red-50 flex items-center justify-center text-2xl mx-auto mb-[7px]">
                        🔴
                    </div>
                    <div className="text-[13px] font-bold text-gray-800">Mérignac FC</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">Extérieur</div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-3.5 mt-0.5">
                {[
                    { val: "10h30", label: "Coup d'envoi" },
                    { val: "Stade du Parc", label: "Lieu" },
                    { val: "J − 6", label: "Dans" },
                ].map((s) => (
                    <div
                        key={s.label}
                        className="text-center py-2.5 bg-gray-50 rounded-[9px]"
                    >
                        <div className="text-[12px] font-bold text-gray-800 mb-0.5">
                            {s.val}
                        </div>
                        <div className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide">
                            {s.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Tip */}
            <div className="bg-loo-gold-light border-[1.5px] border-amber-300 rounded-[10px] px-3.5 py-[11px] flex items-start gap-2 mt-3">
                <span className="shrink-0">💡</span>
                <div className="text-[12px] text-amber-900 leading-relaxed font-medium">
                    <strong>Rappel Ballio :</strong> Préparez le Protocole Avant-Match
                    pour {childName} — 5 actions du vendredi soir au coup d&apos;envoi.
                </div>
            </div>
        </div>
    );
}
