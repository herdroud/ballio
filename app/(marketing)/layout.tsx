export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col font-dm bg-[#020617] text-[#f8fafc]">
            <main className="flex-1">{children}</main>
        </div>
    );
}
