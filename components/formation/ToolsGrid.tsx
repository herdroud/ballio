export default function ToolsGrid() {
    const tools = [
        { icon: "🃏", bg: "bg-blue-50", name: "Script du Match", meta: "Carte voiture · M2" },
        { icon: "🎧", bg: "bg-green-50", name: "Respiration Pré-Match", meta: "Audio 10 min · M1" },
        { icon: "📄", bg: "bg-loo-gold-light", name: "3 Phrases à Bannir", meta: "PDF · M0 · Gratuit" },
        { icon: "🛡️", bg: "bg-loo-red-light", name: "Charte Parent Manager", meta: "À imprimer · M0" },
    ];

    return (
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2.5 mb-2">
            {tools.map((t) => (
                <div
                    key={t.name}
                    className="bg-white rounded-[14px] p-4 shadow-[0_2px_16px_rgba(0,0,0,0.07)] flex items-center gap-[11px] cursor-pointer transition-all border-[1.5px] border-transparent hover:border-loo-green-400 hover:-translate-y-px"
                >
                    <div className={`w-[42px] h-[42px] rounded-[10px] flex items-center justify-center text-xl shrink-0 ${t.bg}`}>
                        {t.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] font-bold text-gray-900 mb-0.5 truncate">{t.name}</div>
                        <div className="text-[11px] text-gray-400 truncate">{t.meta}</div>
                    </div>
                    <span className="text-[15px] text-gray-300 ml-auto shrink-0">→</span>
                </div>
            ))}
        </div>
    );
}
