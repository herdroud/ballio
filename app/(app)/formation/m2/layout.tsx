import React from "react";
import { ModuleSidebar } from "@/components/formation/ui/ModuleSidebar";
import LessonFooterNav from "@/components/formation/ui/LessonFooterNav";

// Configuration de la navigation pour le Module 2
const MODULE_2_NAV = {
    moduleId: "m2",
    moduleTitle: "Protocole Jour de Match",
    subModules: [
        { id: "intro", title: "Introduction", slug: "intro", status: "completed" as const },
        { id: "1", title: "Vendredi Soir", slug: "1", status: "current" as const },
        { id: "2", title: "Voiture Aller", slug: "2", status: "locked" as const },
        { id: "3", title: "Silence Actif", slug: "3", status: "locked" as const },
        { id: "4", title: "Voiture Retour", slug: "4", status: "locked" as const },
    ],
};

export default function Module2Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-[#FAFAFA] min-h-screen">
            <ModuleSidebar nav={MODULE_2_NAV} />
            <div className="flex-1 w-full max-w-[900px] mx-auto overflow-x-hidden">
                {children}
                <LessonFooterNav />
            </div>
        </div>
    );
}
