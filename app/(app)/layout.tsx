"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import BottomNav from "@/components/dashboard/BottomNav";
import MobileOverlay from "@/components/dashboard/MobileOverlay";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen font-[Inter,sans-serif] bg-gray-50 text-gray-800">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <MobileOverlay
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className="min-[900px]:ml-64 flex-1 flex flex-col min-h-screen overflow-x-hidden">
                <Topbar onMenuOpen={() => setSidebarOpen(true)} />
                <div className="flex-1 p-4 min-[900px]:p-7 pb-20 min-[900px]:pb-7 overflow-x-hidden">
                    {children}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
