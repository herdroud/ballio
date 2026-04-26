import React from "react";
import { ModuleSidebar } from "@/components/formation/ui/ModuleSidebar";

// Configuration de la navigation pour le Module 1
const MODULE_1_NAV = {
    moduleId: "m1",
    moduleTitle: "Les Fondations",
    subModules: [
        { id: "intro", title: "Introduction", slug: "intro", status: "completed" as const },
        { id: "1", title: "Le territoire", slug: "1", status: "completed" as const },
        { id: "2", title: "L'après-match", slug: "2", status: "current" as const },
    ],
};

export default function Module1Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-[#FAFAFA] min-h-screen">
            <ModuleSidebar nav={MODULE_1_NAV} />
            <div className="flex-1 w-full max-w-[900px] mx-auto overflow-x-hidden">
                {children}
            </div>
        </div>
    );
}
