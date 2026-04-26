"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
    { icon: "🏠", label: "Accueil", href: "/dashboard" },
    { icon: "🎓", label: "Formation", href: "/formation" },
    { icon: "⚡", label: "Check-in", href: "/checkin" },
    { icon: "⚽", label: "Match Live", href: "/match/live" },
    { icon: "👦", label: "Profil", href: "/profile/demo" },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="min-[900px]:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 z-[150] px-1.5 flex justify-around items-center">
            {ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`
              flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-[9px] min-w-[58px]
              no-underline transition-colors
            `}
                    >
                        <span className="text-[20px]">{item.icon}</span>
                        <span
                            className={`text-[10px] font-semibold ${isActive ? "text-loo-green-500" : "text-gray-400"
                                }`}
                        >
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
