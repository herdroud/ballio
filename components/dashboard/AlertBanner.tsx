interface AlertBannerProps {
    childName?: string;
}

export default function AlertBanner({ childName = "joueur" }: AlertBannerProps) {
    return (
        <div className="bg-loo-red-light border-[1.5px] border-red-300 rounded-2xl p-4 min-[640px]:p-5 flex flex-col min-[640px]:flex-row items-start min-[640px]:items-center gap-3 min-[640px]:gap-3.5 mb-5">
            <span className="text-xl shrink-0">🔴</span>
            <div className="flex-1">
                <div className="text-[13px] font-bold text-red-600 mb-0.5">
                    Signal détecté — {childName}
                </div>
                <div className="text-[12px] text-red-900 leading-relaxed">
                    {childName} a déclaré &quot;je n&apos;aime plus les matchs&quot; lors du
                    check-in du 28 mai. Un protocole adapté est disponible.
                </div>
            </div>
            <button className="ml-0 min-[640px]:ml-auto bg-loo-red text-white border-none px-4 py-2 rounded-lg text-[12px] font-bold cursor-pointer whitespace-nowrap shrink-0 hover:bg-red-600 transition-colors w-full min-[640px]:w-auto">
                Voir le protocole
            </button>
        </div>
    );
}
