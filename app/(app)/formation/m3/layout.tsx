import React from "react";
import { ModuleSidebar } from "@/components/formation/ui/ModuleSidebar";
import LessonFooterNav from "@/components/formation/ui/LessonFooterNav";

// Configuration de la navigation pour le Module 3
const MODULE_3_NAV = {
    moduleId: "m3",
    moduleTitle: "La Trousse de Secours",
    subModules: [
        { id: "intro", title: "Introduction", slug: "intro", status: "completed" as const },
        { id: "1", title: "Erreur Fatale", slug: "1", status: "current" as const },
        { id: "2", title: "Veut Arrêter", slug: "2", status: "locked" as const },
        { id: "3", title: "Blessure Longue", slug: "3", status: "locked" as const },
        { id: "4", title: "L'Agent / Pro", slug: "4", status: "locked" as const },
    ],
};

export default function Module3Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-[#FAFAFA] min-h-screen">
            <ModuleSidebar nav={MODULE_3_NAV} />
            <div className="flex-1 w-full max-w-[900px] mx-auto overflow-x-hidden">
                {children}
                <LessonFooterNav />
            </div>
        </div>
    );
}
