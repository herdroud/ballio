export default function Stats() {
    return (
        <section className="py-20 border-y border-slate-900 bg-slate-950/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-slate-900">
                <div className="space-y-2 pt-8 md:pt-0">
                    <h3 className="text-5xl font-black text-white tracking-tighter">2.2M</h3>
                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Licenciés Foot en France</p>
                </div>
                <div className="space-y-2 pt-8 md:pt-0">
                    <h3 className="text-5xl font-black text-blue-500 tracking-tighter">0.05%</h3>
                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Signeront un contrat Pro</p>
                </div>
                <div className="space-y-2 pt-8 md:pt-0">
                    <h3 className="text-5xl font-black text-white tracking-tighter">82%</h3>
                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Abandons liés à la pression</p>
                </div>
            </div>
        </section>
    );
}
