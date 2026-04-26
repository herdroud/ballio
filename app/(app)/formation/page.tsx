import FormationHero from "@/components/formation/FormationHero";
import SpotlightModule from "@/components/formation/SpotlightModule";
import ModuleAccordion from "@/components/formation/ModuleAccordion";
import ToolsGrid from "@/components/formation/ToolsGrid";
import { getUserPlan } from "@/app/actions/module";
import { getUserProgress } from "@/app/actions/lesson";
import { FORMATION_CONFIG } from "@/app/lib/formation-config";

export default async function FormationPage() {
    const userPlan = await getUserPlan();
    const progressData = await getUserProgress();

    // Extract unique module IDs (e.g., "m1" from "m1-intro")
    const completedLessonIds = progressData.map(p => p.lesson_id);
    const completedModuleIds = Array.from(new Set(completedLessonIds.map(id => id.split('-')[0])));
    const completedCount = completedModuleIds.filter(id => id.startsWith('m')).length;

    // Determine current module: first module that is not completed
    const currentModule = FORMATION_CONFIG.find(m => !completedModuleIds.includes(m.id)) || FORMATION_CONFIG[0];

    return (
        <div className="max-w-[820px] w-full mx-auto">

            {/* Bannière de progression */}
            <FormationHero completedCount={completedCount} totalCount={7} />

            {/* Module en cours */}
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-[15px] font-extrabold text-gray-900 tracking-tight">
                    📍 Module en cours
                </h2>
            </div>
            <SpotlightModule module={currentModule} completedLessonIds={completedLessonIds} />

            {/* Tous les modules */}
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-[15px] font-extrabold text-gray-900 tracking-tight">
                    Tous les modules
                </h2>
                <span className="text-[12px] text-gray-400 font-medium bg-gray-100 px-2.5 py-1 rounded-full">
                    {completedCount} / 7 complétés
                </span>
            </div>
            <ModuleAccordion userPlan={userPlan} completedModuleIds={completedModuleIds} />

            {/* Outils disponibles */}
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-[15px] font-extrabold text-gray-900 tracking-tight">
                    🛠 Outils récents
                </h2>
                <span className="text-[12px] font-semibold text-loo-green-600 cursor-pointer hover:text-loo-green-700">
                    Tous →
                </span>
            </div>
            <ToolsGrid />

        </div>
    );
}
