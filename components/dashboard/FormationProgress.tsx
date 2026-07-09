import Link from "next/link";
import { FORMATION_CONFIG } from "@/app/lib/formation-config";

const STATUS_STYLES = {
    done: {
        row: "bg-green-50 border-green-200",
        num: "bg-loo-green-500 text-white text-base",
        chip: "bg-loo-green-100 text-emerald-800",
        chipText: "✓ Terminé",
    },
    active: {
        row: "bg-emerald-50 border-loo-green-400",
        num: "bg-loo-green-700 text-white",
        chip: "bg-loo-green-700 text-white",
        chipText: "En cours",
    },
    todo: {
        row: "bg-white opacity-70",
        num: "bg-gray-100 text-gray-400",
        chip: "bg-gray-100 text-gray-400",
        chipText: "À venir",
    },
} as const;

interface FormationProgressProps {
    completedModuleIds: string[];
}

// Progression de la formation, calculée sur les modules réellement complétés
// (un module est complété quand toutes ses leçons le sont).
export default function FormationProgress({ completedModuleIds }: FormationProgressProps) {
    const completedCount = completedModuleIds.length;
    const total = FORMATION_CONFIG.length;
    const progressPercent = Math.round((completedCount / total) * 100);

    return (
        <div className="bg-white rounded-2xl p-5 min-[640px]:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="text-[17px] font-extrabold text-gray-800 tracking-tight">
                    Ma Formation
                </div>
                <Link
                    href="/formation"
                    className="text-[13px] font-semibold text-loo-green-600 hover:text-loo-green-700 no-underline"
                >
                    Tout voir →
                </Link>
            </div>

            {/* Progress bar */}
            <div>
                <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[12px] font-semibold text-gray-600">
                        Avancement global
                    </span>
                    <span className="text-[13px] font-bold text-loo-green-600">
                        {completedCount} / {total} modules
                    </span>
                </div>
                <div className="bg-gray-100 rounded-full h-[5px] overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-loo-green-500 to-loo-green-400 transition-all duration-1000"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>

            {/* Module list */}
            <div className="flex flex-col gap-[7px] mt-3.5">
                {FORMATION_CONFIG.map((mod, index) => {
                    const isDone = completedModuleIds.includes(mod.id);
                    const isActive = !isDone && (index === 0 || completedModuleIds.includes(FORMATION_CONFIG[index - 1].id));
                    const status = isDone ? "done" : (isActive ? "active" : "todo");
                    const s = STATUS_STYLES[status];

                    return (
                        <Link
                            key={mod.id}
                            href={`/formation/${mod.id}`}
                            className={`flex items-center gap-3 py-3 px-3.5 rounded-[11px] border-[1.5px] border-transparent transition-all no-underline cursor-pointer hover:bg-gray-50 ${s.row}`}
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 ${s.num}`}
                            >
                                {status === "done" ? "✓" : mod.num}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[13px] font-bold text-gray-800 truncate">
                                    Module {mod.num} · {mod.title}
                                </div>
                                <div className="text-[11px] text-gray-400 truncate">
                                    {mod.subtitle}
                                </div>
                            </div>
                            <span
                                className={`text-[10px] font-bold px-[9px] py-0.5 rounded-full shrink-0 ${s.chip}`}
                            >
                                {s.chipText}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
