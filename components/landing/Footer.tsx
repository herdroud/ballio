export default function Footer() {
    return (
        <footer className="bg-slate-950 py-12 border-t border-slate-900 text-center text-slate-600 text-sm">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="font-medium">© 2026 Ballio. L'outil de performance parentale.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-white transition">Mentions Légales</a>
                    <a href="#" className="hover:text-white transition">CGV</a>
                    <a href="#" className="hover:text-white transition">Confidentialité</a>
                </div>
            </div>
        </footer>
    );
}
