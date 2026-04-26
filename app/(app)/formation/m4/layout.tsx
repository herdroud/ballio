import React from "react";
import { ModuleSidebar } from "@/components/formation/ui/ModuleSidebar";

// Configuration de la navigation pour le Module 4
const MODULE_4_NAV = {
    moduleId: "m4",
    moduleTitle: "Le Manuel par Âge",
    subModules: [
        { id: "intro", title: "Introduction", slug: "intro", status: "completed" as const },
        { id: "1", title: "U6 – U9", slug: "1", status: "current" as const },
        { id: "2", title: "U10 – U13", slug: "2", status: "locked" as const },
        { id: "3", title: "U14 – U16", slug: "3", status: "locked" as const },
        { id: "4", title: "U17 – U18", slug: "4", status: "locked" as const },
    ],
};

export default function Module4Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-[#FAFAFA] min-h-screen">
            <ModuleSidebar nav={MODULE_4_NAV} />
            <div className="flex-1 w-full max-w-[900px] mx-auto overflow-x-hidden">
                {children}
            </div>
        </div>
    );
}
