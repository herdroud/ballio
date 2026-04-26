import Link from "next/link";
import { ModuleConfig } from "@/app/lib/formation-config";

interface SpotlightModuleProps {
    module: ModuleConfig;
    completedLessonIds: string[];
}

export default function SpotlightModule({ module, completedLessonIds }: SpotlightModuleProps) {
    // Determine the next lesson to do in this module
    const currentLessonIndex = module.lessons.findIndex(l => !completedLessonIds.includes(`${module.id}-${l.id}`));
    const activeLessonIndex = currentLessonIndex === -1 ? 0 : currentLessonIndex;

    return (
        <div className="bg-white rounded-2xl border border-loo-green-200 shadow-[0_4px_24px_rgba(50,163,91,0.08)] overflow-hidden mb-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-loo-green-600 to-loo-green-500 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5 bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                        <span className="w-[5px] h-[5px] rounded-full bg-white animate-pulse" />
                        En cours
                    </div>
                    <span className="text-white/60 text-[11px] font-medium">Module {module.num} · {module.duration} · {module.lessons.length} leçons</span>
                </div>
                <Link href={`/formation/${module.lessons[activeLessonIndex].slug}`} className="no-underline">
                    <button className="bg-white text-loo-green-700 text-[11px] font-extrabold px-3 py-1.5 rounded-full border-none cursor-pointer hover:bg-loo-green-50 transition-colors">
                        Continuer →
                    </button>
                </Link>
            </div>

            <div className="px-5 py-4">
                <h3 className="text-[16px] font-black text-gray-900 leading-tight mb-0.5">{module.title}</h3>
                <p className="text-[12.5px] text-gray-400 mb-4">{module.subtitle}</p>

                {/* Leçons */}
                <div className="space-y-1.5">
                    {module.lessons.map((l, i) => {
                        const isCompleted = completedLessonIds.includes(`${module.id}-${l.id}`);
                        const isActive = i === activeLessonIndex;

                        return (
                            <div
                                key={l.id}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${isActive
                                    ? "bg-loo-green-50 border border-loo-green-200"
                                    : "bg-gray-50"
                                    }`}
                            >
                                <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${isCompleted ? "bg-loo-green-500 text-white" : isActive ? "bg-loo-green-600 text-white" : "bg-gray-200 text-gray-400"
                                        }`}
                                >
                                    {isCompleted ? "✓" : i + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className={`text-[12.5px] font-semibold truncate ${isActive ? "text-loo-green-800" : "text-gray-500"}`}>
                                        {i + 1} · {l.title}
                                    </div>
                                </div>
                                <span className="text-[11px] text-gray-400 whitespace-nowrap shrink-0">{l.duration}</span>
                                {isActive && !isCompleted && <span className="text-loo-green-500 text-sm shrink-0">▶</span>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
