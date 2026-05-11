"use client";

import { useUser, UserButton } from "@clerk/nextjs";

interface TopbarProps {
    onMenuOpen: () => void;
}

export default function Topbar({ onMenuOpen }: TopbarProps) {
    const { user } = useUser();
    const firstName = user?.firstName || "Coach";

    const now = new Date();
    const dateStr = now.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const weekday = now.toLocaleDateString("fr-FR", { weekday: "long" });
    const weekNum = getWeekNumber(now);

    return (
        <header className="bg-white border-b border-gray-200 px-4 min-[900px]:px-8 h-16 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-2.5">
                {/* Burger — mobile only */}
                <button
                    onClick={onMenuOpen}
                    className="min-[900px]:hidden w-9 h-9 rounded-[9px] bg-gray-100 flex items-center justify-center text-[17px] border-none cursor-pointer"
                    aria-label="Menu"
                >
                    ☰
                </button>
                <div>
                    <div className="text-[15px] font-bold text-gray-800">
                        👋 Bonjour, {firstName}
                    </div>
                    <div className="text-[12px] text-gray-400 mt-0.5 capitalize truncate">
                        <span className="hidden min-[400px]:inline">{weekday} </span>{dateStr} &nbsp;·&nbsp; Semaine {weekNum}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="w-[38px] h-[38px] rounded-[10px] bg-gray-100 border-none cursor-pointer flex items-center justify-center text-[17px] relative hover:bg-gray-200 transition-colors">
                    🔔
                    <span className="absolute top-[7px] right-[7px] w-[7px] h-[7px] bg-loo-red rounded-full border-[1.5px] border-white" />
                </button>
                <button className="w-[38px] h-[38px] rounded-[10px] bg-gray-100 border-none cursor-pointer flex items-center justify-center text-[17px] hover:bg-gray-200 transition-colors max-[899px]:hidden">
                    ❓
                </button>
                <div className="flex items-center gap-2 px-3 pl-1 py-1 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-[13px] font-semibold text-gray-700 max-[899px]:hidden">
                        {user?.firstName} {user?.lastName?.charAt(0)}.
                    </span>
                </div>
            </div>
        </header>
    );
}

function getWeekNumber(d: Date): number {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
