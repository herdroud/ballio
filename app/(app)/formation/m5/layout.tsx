import React from "react";
import { ModuleSidebar } from "@/components/formation/ui/ModuleSidebar";

const MODULE_5_NAV = {
    moduleId: "m5",
    moduleTitle: "L'Ingénierie Invisible",
    subModules: [
        { id: "intro", title: "L'avant-terrain", slug: "intro", status: "completed" as const },
        { id: "1", title: "Sommeil", slug: "1", status: "current" as const },
        { id: "2", title: "Nutrition", slug: "2", status: "locked" as const },
        { id: "3", title: "Prévention", slug: "3", status: "locked" as const },
        { id: "4", title: "École", slug: "4", status: "locked" as const },
    ],
};

export default function Module5Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-[#FAFAFA] min-h-screen">
            <ModuleSidebar nav={MODULE_5_NAV} />
            <div className="flex-1 w-full max-w-[900px] mx-auto overflow-x-hidden">
                {children}
            </div>
        </div>
    );
}
