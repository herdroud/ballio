import React from "react";
import { ModuleSidebar } from "@/components/formation/ui/ModuleSidebar";
import LessonFooterNav from "@/components/formation/ui/LessonFooterNav";

// Configuration de la navigation pour le Module 0
const MODULE_0_NAV = {
    moduleId: "m0",
    moduleTitle: "L'Électrochoc",
    subModules: [
        { id: "intro", title: "Introduction", slug: "intro", status: "completed" as const },
        { id: "1", title: "Le parent taxi", slug: "1", status: "current" as const },
        { id: "2", title: "Lettre de démission", slug: "2", status: "locked" as const },
    ],
};

export default function Module0Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-[#FAFAFA] min-h-screen">
            <ModuleSidebar nav={MODULE_0_NAV} />
            <div className="flex-1 w-full max-w-[900px] mx-auto overflow-x-hidden">
                {children}
                <LessonFooterNav />
            </div>
        </div>
    );
}
