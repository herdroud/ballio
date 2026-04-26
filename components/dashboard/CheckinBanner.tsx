import Link from "next/link";

interface CheckinBannerProps {
    childName?: string;
}

export default function CheckinBanner({ childName = "Léon" }: CheckinBannerProps) {
    return (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-[1.5px] border-amber-300 rounded-2xl p-4 min-[640px]:p-5 flex flex-col min-[640px]:flex-row items-start min-[640px]:items-center gap-3 min-[640px]:gap-3.5 mb-6">
            <span className="text-[32px] shrink-0">⏰</span>
            <div className="flex-1">
                <div className="text-[14px] font-bold text-amber-900 mb-0.5">
                    Check-in de {childName} en attente
                </div>
                <div className="text-[12px] text-amber-800 leading-[1.45]">
                    Dernier check-in il y a 3 jours. 3 minutes pour prendre le pouls de
                    son bien-être mental.
                </div>
            </div>
            <Link
                href="/checkin"
                className="ml-0 min-[640px]:ml-auto bg-loo-gold text-amber-900 border-none px-5 py-2.5 rounded-[10px] text-[13px] font-bold cursor-pointer whitespace-nowrap shrink-0 hover:bg-amber-500 hover:-translate-y-px transition-all w-full min-[640px]:w-auto inline-flex items-center justify-center no-underline"
            >
                Lancer le check-in
            </Link>
        </div>
    );
}
