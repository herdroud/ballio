"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";
import { getChildProfile } from "@/app/actions/child";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_MAIN = [
  { icon: "🏠", label: "Dashboard", href: "/dashboard" },
  { icon: "🎓", label: "Ma Formation", href: "/formation" },
  { icon: "⚡", label: "Check-in", href: "/checkin", badge: "!" },
  { icon: "⚽", label: "Suivi Match Live", href: "/match/live" },
  { icon: "📅", label: "Calendrier", href: "/calendrier" },
];

const NAV_TOOLS = [
  { icon: "👦", label: "Profil Enfant", href: "/profile/demo" },
  { icon: "📋", label: "Protocoles Match", href: "/protocoles" },
  { icon: "📊", label: "Évolution", href: "/evolution" },
  { icon: "🧠", label: "Bibliothèque", href: "/bibliotheque" },
  { icon: "⚙️", label: "Paramètres", href: "/parametres" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const [child, setChild] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChild() {
      if (!user) return;
      try {
        const data = await getChildProfile();
        if (data) setChild(data);
      } catch (err) {
        console.error("Error fetching child for sidebar:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchChild();
  }, [user]);

  const initial = child?.first_name ? child.first_name.charAt(0).toUpperCase() : (user?.firstName?.charAt(0) || "P");
  const childFullName = loading ? "Chargement..." : child ? `${child.first_name} ${child.last_name}` : "Joueur";
  const clubInfo = loading ? "Chargement..." : child ? `${child.category || "---"} · ${child.club_name || "Club"}` : "--- · ---";

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-[200] w-64 bg-loo-green-900 flex flex-col
        transition-transform duration-300 ease-in-out
        min-[900px]:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full min-[900px]:translate-x-0"}
      `}
    >
      {/* Logo */}
      <div className="px-6 pt-7 pb-5 border-b border-white/[0.07]">
        <div className="text-[26px] font-black text-white tracking-tight">
          BALL<span className="text-loo-gold">IO</span>
        </div>
        <div className="text-[10px] text-white/35 mt-0.5 uppercase tracking-widest flex items-center justify-between">
          <span>Manager de Talent</span>
          <span className="text-[9px] opacity-60 normal-case tracking-normal">v0.1.0</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-4">
        <div className="text-[9px] font-bold text-white/25 uppercase tracking-[1.2px] px-3.5 pt-2 pb-1.5">
          Principal
        </div>
        {NAV_MAIN.map((item) => {
          const isActive = pathname === item.href;
          const label = item.label === "Check-in" && child?.first_name ? `Check-in ${child.first_name}` : item.label;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`
                flex items-center gap-[11px] px-3.5 py-2.5 rounded-[10px] text-[13.5px] font-medium
                transition-all duration-150 mb-px no-underline
                ${isActive
                  ? "bg-loo-green-400/15 text-loo-green-400 font-semibold"
                  : "text-white/55 hover:bg-white/[0.07] hover:text-white"
                }
              `}
            >
              <span className="text-[17px] w-5 text-center shrink-0">
                {item.icon}
              </span>
              {label}
              {item.badge && (
                <span className="ml-auto bg-loo-red text-white text-[9px] font-bold px-[7px] py-0.5 rounded-full min-w-[18px] text-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="text-[9px] font-bold text-white/25 uppercase tracking-[1.2px] px-3.5 pt-5 pb-1.5">
          Outils
        </div>
        {NAV_TOOLS.map((item) => {
          const isActive = pathname === item.href;
          const href = item.label === "Profil Enfant" && child?.id ? `/profile/${child.id}` : item.href;
          return (
            <Link
              key={item.href}
              href={href}
              onClick={onClose}
              className={`
                flex items-center gap-[11px] px-3.5 py-2.5 rounded-[10px] text-[13.5px] font-medium
                transition-all duration-150 mb-px no-underline
                ${isActive
                  ? "bg-loo-green-400/15 text-loo-green-400 font-semibold"
                  : "text-white/55 hover:bg-white/[0.07] hover:text-white"
                }
              `}
            >
              <span className="text-[17px] w-5 text-center shrink-0">
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Player Card */}
      <div className="p-3.5 border-t border-white/[0.07]">
        <div className="bg-white/[0.06] rounded-xl px-3.5 py-3 flex items-center gap-[11px] cursor-pointer hover:bg-white/[0.09] transition-colors">
          <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-loo-green-500 to-loo-green-700 flex items-center justify-center text-[15px] font-extrabold text-white shrink-0">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-bold text-white truncate">{childFullName}</div>
            <div className="text-[11px] text-white/40 mt-px truncate">
              {clubInfo}
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-loo-green-400 shadow-[0_0_6px_#3DBF78] animate-pulse shrink-0" />
        </div>
      </div>
    </aside>
  );
}
