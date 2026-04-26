interface StatMiniProps {
    icon: string;
    value: string;
    label: string;
    change: string;
    color?: "green" | "orange";
}

export default function StatMini({
    icon,
    value,
    label,
    change,
    color = "green",
}: StatMiniProps) {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.08)] flex flex-col">
            <div className="text-[22px] mb-3">{icon}</div>
            <div
                className={`text-4xl font-black tracking-tight leading-none mb-1 ${color === "orange" ? "text-loo-orange" : "text-gray-800"
                    }`}
            >
                {value}
            </div>
            <div className="text-[12px] text-gray-400 font-medium mb-2.5">
                {label}
            </div>
            <div
                className={`text-[11px] font-semibold flex items-center gap-1 ${color === "orange" ? "text-loo-orange" : "text-loo-green-500"
                    }`}
            >
                {change}
            </div>
        </div>
    );
}
