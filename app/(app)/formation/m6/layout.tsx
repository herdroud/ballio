import React from "react";
import { ModuleSidebar } from "@/components/formation/ui/ModuleSidebar";

const MODULE_6_NAV = {
    moduleId: "m6",
    moduleTitle: "L'Écosystème Pro",
    subModules: [
        { id: "intro", title: "Introduction", slug: "intro", status: "completed" as const },
        { id: "1", title: "Recruteurs", slug: "1", status: "current" as const },
        { id: "2", title: "Le Coach", slug: "2", status: "locked" as const },
        { id: "3", title: "Agents", slug: "3", status: "locked" as const },
        { id: "4", title: "Réseaux Sociaux", slug: "4", status: "locked" as const },
    ],
};

export default function Module6Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-[#FAFAFA] min-h-screen">
            <ModuleSidebar nav={MODULE_6_NAV} />
            <div className="flex-1 w-full max-w-[900px] mx-auto overflow-x-hidden">
                {children}
            </div>
        </div>
    );
}
