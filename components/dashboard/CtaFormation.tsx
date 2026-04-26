import Link from "next/link";
import { ModuleConfig } from "@/app/lib/formation-config";

export default function CtaFormation({ module }: { module: ModuleConfig }) {
    return (
        <div className="bg-gradient-to-br from-loo-green-700 to-loo-green-600 rounded-2xl p-5 min-[640px]:p-6 shadow-lg relative overflow-hidden flex flex-col h-full">
            {/* Decorative */}
            <div className="absolute -right-3 -top-2 text-[130px] text-white/[0.04] leading-none pointer-events-none select-none">
                ▶
            </div>

            <div className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">
                📍 Ton action cette semaine
            </div>
            <div className="text-[18px] min-[640px]:text-[19px] font-extrabold text-white leading-tight mb-1.5 tracking-tight">
                Module {module.num} — {module.title}
            </div>
            <div className="text-[13px] text-white/[0.62] leading-relaxed mb-4 flex-1">
                {module.objective}
            </div>

            <div className="flex gap-3 mb-4 flex-wrap">
                <div className="flex items-center gap-1.5 text-[12px] text-white/60 font-medium">
                    ⏱ {module.duration}
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-white/60 font-medium">
                    🔓 {module.lessons.length} leçons
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-white/60 font-medium">
                    ⭐ 4.9/5
                </div>
            </div>

            <Link href={`/formation/${module.id}`} className="no-underline">
                <button className="flex items-center justify-center gap-2 bg-white text-loo-green-700 text-[15px] font-extrabold py-3.5 rounded-xl border-none cursor-pointer w-full transition-all hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] tracking-tight">
                    ▶&nbsp; Commencer le module maintenant
                </button>
            </Link>
        </div>
    );
}
