import FormationHero from "@/components/formation/FormationHero";
import SpotlightModule from "@/components/formation/SpotlightModule";
import ModuleAccordion from "@/components/formation/ModuleAccordion";
import ToolsGrid from "@/components/formation/ToolsGrid";
import { getUserProgress } from "@/app/actions/lesson";
import { getFormationState } from "@/app/lib/formation-config";

// Page liée à l'utilisateur connecté : toujours rendue à la demande
// (évite les erreurs DYNAMIC_SERVER_USAGE au build).
export const dynamic = "force-dynamic";

export default async function FormationPage() {
    const progressData = await getUserProgress();

    const {
        completedLessonIds,
        completedModuleIds,
        currentModule,
        completedModuleCount: completedCount,
        totalModuleCount,
    } = getFormationState(progressData.map(p => p.lesson_id));

    return (
        <div className="max-w-[820px] w-full mx-auto">

            {/* Bannière de progression */}
            <FormationHero completedCount={completedCount} totalCount={totalModuleCount} />

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
                    {completedCount} / {totalModuleCount} complétés
                </span>
            </div>
            <ModuleAccordion
                completedModuleIds={completedModuleIds}
                completedLessonIds={completedLessonIds}
            />

            {/* Outils disponibles */}
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-[15px] font-extrabold text-gray-900 tracking-tight">
                    🛠 Outils récents
                </h2>
            </div>
            <ToolsGrid />

        </div>
    );
}
