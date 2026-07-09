import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { checkModuleAccess } from "@/app/actions/module";

/* ── Module metadata ── */
interface ModuleMeta {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  isFree: boolean;
}

const MODULES: ModuleMeta[] = [
  { id: "m0", num: "0", title: "Module 0 · L'Électrochoc", subtitle: "L'ennemi invisible, c'est vous ?", isFree: true },
  { id: "m1", num: "1", title: "Module 1 · Les Fondations", subtitle: "Reprendre sa juste place", isFree: false },
  { id: "m2", num: "2", title: "Module 2 · Le Protocole Jour de Match", subtitle: "Du vendredi soir au dimanche", isFree: false },
  { id: "m3", num: "3", title: "Module 3 · La Trousse de Secours", subtitle: "Gérer crise, échec et injustice", isFree: false },
  { id: "m4", num: "4", title: "Module 4 · Le Manuel par Âge", subtitle: "KPIs spécifiques U6–U18", isFree: false },
  { id: "m5", num: "5", title: "Module 5 · L'Ingénierie Invisible", subtitle: "La performance se construit hors terrain", isFree: false },
  { id: "m6", num: "6", title: "Module 6 · L'Écosystème Pro", subtitle: "Clubs, détection, agents — sans se faire avoir", isFree: false },
];

export default async function ModuleViewerPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const mod = MODULES.find((m) => m.id === moduleId);
  if (!mod) notFound();

  const { hasAccess } = await checkModuleAccess(moduleId);
  if (!hasAccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-gray-100">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-[40px]">🔒</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Contenu Verrouillé</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">Une erreur est survenue lors de l&apos;accès à ce module.</p>
          <Link href="/dashboard" className="block w-full no-underline">
            <button className="w-full py-3.5 rounded-xl border-none cursor-pointer text-sm font-bold bg-loo-green-500 text-white hover:bg-loo-green-600 transition-colors">
              Retour au Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Contenu servi via ce composant (authentifié) uniquement — hors de /public
  // pour ne pas exposer les modules en accès statique direct.
  const modulesDir = path.join(process.cwd(), "content", "modules");
  const [rawCssContent, rawHtmlContent] = await Promise.all([
    fs.readFile(path.join(modulesDir, `module${mod.num}.css`), "utf-8"),
    fs.readFile(path.join(modulesDir, `module${mod.num}.html`), "utf-8"),
  ]);

  // Force hardcoded white values in original CSS and inline HTML to soft dark colors
  // This fixes "white text on white background" issues since we changed the body to white.
  const cssContent = rawCssContent
    .replace(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,/g, "rgba(55, 65, 81,")
    .replace(/color:\s*#fff(fff)?\b/gi, "color: #111827")
    .replace(/color:\s*white\b/gi, "color: #111827");
  const htmlContent = rawHtmlContent
    .replace(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,/g, "rgba(55, 65, 81,")
    .replace(/color:\s*#fff(fff)?\b/gi, "color: #111827")
    .replace(/color:\s*white\b/gi, "color: #111827");

  const idx = MODULES.findIndex((m) => m.id === moduleId);
  const prev = idx > 0 ? MODULES[idx - 1] : null;
  const next = idx < MODULES.length - 1 ? MODULES[idx + 1] : null;

  /* CSS override – remap dark theme to a very modern, premium, light educational UI */
  const lightOverride = `
      /* ── RESET & MODERN BASE ── */
      .module-viewer {
        font-family: 'Inter', system-ui, sans-serif;
        background: #FAFAFA;
        color: #111827 !important;
        font-size: 17px;
        line-height: 1.8;
        -webkit-font-smoothing: antialiased;
        padding-bottom: 80px;
        /* Remap legacy CSS variables */
        --rouge:      #16643C;
        --rouge-vif:  #14532d;
        --rouge-pale: #f0fdf4;
        --noir:       #ffffff;
        --noir-2:     #f9fafb;
        --noir-3:     #ffffff;
        --gris-f:     #F3F4F6;
        --gris-m:     #6b7280;
        --gris-t:     #374151;
        --blanc:      #111827;
        --vert:       #16643C;
        --vert-pale:  #f0fdf4;
      }

      /* ── TYPOGRAPHY ── */
      .module-viewer, .module-viewer * {
        color: inherit;
      }
      .module-viewer p {
        color: #4b5563 !important;
        font-weight: 400;
        margin-bottom: 24px;
        font-size: 17.5px;
      }
      .module-viewer p strong, .module-viewer span strong { color: #111827 !important; font-weight: 600 !important; }
      .module-viewer p em, .module-viewer span em { color: #6b7280 !important; font-style: italic; }
      .module-viewer .lead {
        color: #1f2937 !important;
        font-style: normal;
        font-size: clamp(20px, 2.2vw, 24px);
        font-weight: 500;
        line-height: 1.6;
        margin-bottom: 48px;
        letter-spacing: -0.01em;
      }

      /* ── SECTION CARDS ── */
      .module-viewer section + section {
        border-top: none;
      }
      .module-viewer section { 
        padding: 56px 64px; 
        background: #ffffff;
        margin: 32px auto;
        border-radius: 24px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.02);
        max-width: 860px;
        border: 1px solid #f3f4f6;
      }
      @media (max-width: 768px) {
        .module-viewer section { padding: 40px 24px; margin: 16px; border-radius: 20px; }
      }

      /* ── HARMONIZED TABLES ── */
      .module-viewer table, 
      .module-viewer .t2col, 
      .module-viewer .tbl {
        width: 100% !important;
        border-collapse: separate !important;
        border-spacing: 0 !important;
        margin: 48px 0 !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 16px !important;
        overflow: hidden !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.01) !important;
      }
      .module-viewer table th, 
      .module-viewer .t2col th, 
      .module-viewer .tbl th {
        background: #f8faf9 !important;
        color: #4b5563 !important;
        padding: 16px 24px !important;
        font-weight: 600 !important;
        text-transform: uppercase !important;
        letter-spacing: 1px !important;
        font-size: 11px !important;
        text-align: left !important;
        border-bottom: 1px solid #e5e7eb !important;
      }
      .module-viewer table td, 
      .module-viewer .t2col td, 
      .module-viewer .tbl td {
        background: #ffffff !important;
        color: #4b5563 !important;
        padding: 18px 24px !important;
        border-bottom: 1px solid #f3f4f6 !important;
        font-size: 15px !important;
        line-height: 1.6 !important;
      }
      .module-viewer table tr:last-child td {
        border-bottom: none !important;
      }
      .module-viewer .t2col td:first-child,
      .module-viewer .tbl td:first-child,
      .module-viewer .question-cell.avant {
        background: #fafbfc !important;
        color: #111827 !important;
        font-weight: 500 !important;
        width: 35% !important;
        border-right: 1px solid #f3f4f6 !important;
      }
      .module-viewer .t2col td:last-child,
      .module-viewer .tbl td:last-child,
      .module-viewer .question-cell.apres {
        background: #ffffff !important;
        color: #111827 !important;
      }

      /* ── HERO (MODERN LIGHT) ── */
      .module-viewer .hero {
        background: #ffffff;
        min-height: auto !important;
        padding: 80px 48px !important;
        margin-bottom: 40px;
        border-bottom: 1px solid #f3f4f6;
        border-radius: 0 0 32px 32px;
        box-shadow: 0 12px 32px rgba(0,0,0,0.015);
      }
      .module-viewer .hero::before { display: none; }
      .module-viewer .hero-eyebrow { color: #16a34a; font-weight: 700; letter-spacing: 2px; }
      .module-viewer .hero-title { color: #111827; letter-spacing: -0.02em; font-weight: 800; line-height: 1.1; margin-bottom: 24px; }
      .module-viewer .hero-title span { color: #16a34a; }
      .module-viewer .hero-lead { color: #4b5563; font-style: normal; max-width: 620px; font-size: 20px; }
      .module-viewer .hero-stat {
        border: 1px solid #e5e7eb;
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.03);
      }
      .module-viewer .hero-stat-num { color: #16a34a; }
      .module-viewer .hero-stat-text { color: #4b5563; }
      .module-viewer .hero-stat-text strong { color: #111827; font-weight: 600; }
      .module-viewer .hero-bg-num { display: none !important; }

      /* ── LESSON HEADER ── */
      .module-viewer .lesson-wrap { margin-bottom: 48px; }
      .module-viewer .lesson-number { 
        color: #16643C; padding: 6px 14px; background: #f0fdf4; border-radius: 12px; display: inline-block; font-size: 14px; font-weight: 700; margin-bottom: 16px; 
      }
      .module-viewer .lesson-number::after { display: none; }
      .module-viewer .lesson-title { color: #111827; font-size: clamp(32px, 5vw, 48px); letter-spacing: -0.02em; font-weight: 800; line-height: 1.1; margin-bottom: 20px; font-family: 'Inter', sans-serif; }
      .module-viewer .lesson-subtitle { color: #6b7280; font-size: 18px; border-bottom: none; margin-bottom: 0; padding-bottom: 0; font-weight: 400; }
      .module-viewer .lesson-hook { color: #6b7280; font-size: 18px; padding-bottom: 0; border: none; font-weight: 400; margin-bottom: 48px; }
      .module-viewer .lesson-tag-line { height: 2px; border-radius: 2px; }
      .module-viewer .lesson-tag-num { border-radius: 8px; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 1px; }

      /* ── CHOC STATEMENT (MODERN BLOCKQUOTE) ── */
      .module-viewer .choc {
        background: #f8faf9;
        color: #111827;
        border-top: none;
        border-bottom: none;
        border-left: 4px solid #16a34a;
        border-radius: 0 16px 16px 0;
        padding: 32px 40px;
        margin: 48px 0;
        font-style: normal;
        font-weight: 600;
        letter-spacing: -0.01em;
        font-size: clamp(20px, 3vw, 24px);
        line-height: 1.4;
      }
      .module-viewer .choc span { color: #16a34a; display: block; margin-top: 8px; font-weight: 500; font-size: 18px; }

      /* ── HIGHLIGHT CARDS (REGLE & TEST-BOX) ── */
      .module-viewer .regle, .module-viewer .test-box, .module-viewer .metaphore {
        background: #ffffff;
        border-radius: 24px;
        padding: 48px;
        position: relative;
        border: 1px solid #e1f4e8;
        box-shadow: 0 12px 32px rgba(22, 100, 60, 0.04);
        margin: 56px 0;
      }
      .module-viewer .regle-label, .module-viewer .test-box-label { 
        color: #16643C; background: #f0fdf4; padding: 6px 12px; border-radius: 8px; display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 1px; margin-bottom: 24px; font-family: 'Inter', sans-serif;
      }
      .module-viewer .regle-text, .module-viewer .test-box-title { 
        color: #111827; font-size: clamp(22px, 3vw, 28px); font-family: 'Inter', sans-serif; font-weight: 700; letter-spacing: -0.01em; line-height: 1.3; 
      }
      .module-viewer .test-box-text { color: #4b5563; font-size: 17px; margin-top: 16px; font-style: normal; }
      .module-viewer .regle::after { display: none; }

      /* ── SCIENCE BOX ── */
      .module-viewer .science {
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-left: 4px solid #3b82f6; /* Modern subtle blue */
        border-radius: 16px;
        padding: 32px 40px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        margin: 48px 0;
      }
      .module-viewer .science-label { color: #2563eb; font-family: 'Inter', sans-serif; font-weight: 700; letter-spacing: 1px; margin-bottom: 12px; }
      .module-viewer .science-text { color: #4b5563; font-style: normal; font-size: 16px; line-height: 1.7; }
      .module-viewer .science-text strong { color: #1e40af; }
      .module-viewer .science::before { display: none; }

      /* ── COMPARE GRID & PROFIL CARDS ── */
      .module-viewer .compare-col, .module-viewer .profil-card {
        background: #ffffff;
        border-radius: 16px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        overflow: hidden;
      }
      .module-viewer .profil-icon-col { background: #f9fafb; border-right: 1px solid #e5e7eb; }
      .module-viewer .profil-name, .module-viewer .compare-label { color: #111827; font-weight: 600; font-family: 'Inter', sans-serif; }
      .module-viewer .compare-col.bad { border-top: 4px solid #ef4444; }
      .module-viewer .compare-col.good { border-top: 4px solid #10b981; }

      /* ── LETTRE SECTION ── */
      .module-viewer .lettre-section { background: transparent; padding: 40px 0; border: none; }
      .module-viewer .lettre-bloc {
        background: #ffffff; border: 1px solid #e5e7eb; border-radius: 20px; padding: 48px;
        border-left: none; box-shadow: 0 12px 32px rgba(0,0,0,0.03); margin-bottom: 40px;
      }
      .module-viewer .lettre-ligne { color: #4b5563; font-family: 'Inter', sans-serif; font-weight: 400; font-size: 18px; line-height: 1.8; margin-bottom: 12px; }
      .module-viewer .lettre-ligne.forte { font-style: normal; font-weight: 600; color: #111827; }
      .module-viewer .lettre-destinataire { font-family: 'Inter', sans-serif; font-size: 20px; color: #16643C; font-weight: 700; margin-bottom: 32px; letter-spacing: 0; }
      .module-viewer .lettre-question-text { font-family: 'Inter', sans-serif; font-weight: 700; font-style: normal; font-size: 24px; color: #111827; }

      /* ── CTA SECTION ── */
      .module-viewer .cta-section {
        background: transparent;
        padding: 64px 0;
      }
      .module-viewer .cta-section::before { display: none; }
      .module-viewer .cta-title { font-family: 'Inter', sans-serif; font-size: clamp(36px, 5vw, 56px); letter-spacing: -0.02em; font-weight: 800; color: #111827; line-height: 1.1; margin-bottom: 32px; }
      .module-viewer .cta-title span { display: inline-block; color: #16a34a; }
      .module-viewer .cta-body { color: #4b5563; font-size: 18px; line-height: 1.6; max-width: 640px; margin: 0 auto 40px; }
      .module-viewer .cta-body strong { color: #111827; font-weight: 600; }
      .module-viewer .btn-primary {
        background: #111827;
        color: white;
        border-radius: 99px;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 16px;
        padding: 16px 36px;
        letter-spacing: 0;
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      }
      .module-viewer .btn-primary:hover { background: #1f2937; }
      .module-viewer .cta-note { color: #9ca3af; font-size: 14px; margin-top: 16px; }

      /* ── PROTOCOL & RITUAL ── */
      .module-viewer .protocole-header { background: #f0fdf4; border-radius: 16px 16px 0 0; padding: 24px 32px; border: 1px solid #e1f4e8; border-bottom: none; display: flex; align-items: center; gap: 16px; }
      .module-viewer .protocole-title { font-family: 'Inter', sans-serif; font-weight: 700; font-size: 18px; color: #16643C; letter-spacing: 0; }
      .module-viewer .protocole-steps { background: #ffffff; border: 1px solid #e1f4e8; border-radius: 0 0 16px 16px; box-shadow: 0 8px 24px rgba(22, 100, 60, 0.03); }
      .module-viewer .protocole-step { display: flex; align-items: stretch; border-bottom: 1px solid #f3f4f6; }
      .module-viewer .protocole-step-num { width: 64px; display: flex; align-items: center; justify-content: center; background: #f9fafb; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 20px; color: #6b7280; border-right: 1px solid #f3f4f6; }
      .module-viewer .protocole-step-text { padding: 24px 32px; color: #4b5563; font-size: 16px; font-weight: 400; line-height: 1.6; }
      .module-viewer .protocole-step-text strong { color: #111827; font-weight: 600; }

      /* ── MISC & SCROLL ANIMATION OVERRIDES ── */
      .module-viewer .scroll-cue { display: none !important; }
      .module-viewer .nav-logo { display: none; }
      .module-viewer .next-module { border-top: none; }
      .module-viewer .reveal { opacity: 1 !important; transform: none !important; }
  `;

  return (
    <div className="w-full max-w-[1100px] mx-auto">

      {/* ── Sticky breadcrumb bar ── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center gap-3 -mx-4 min-[900px]:-mx-7 min-[900px]:px-7 mb-6">
        <Link
          href="/formation"
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-loo-green-600 transition-colors shrink-0 no-underline"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          Formation
        </Link>
        <div className="h-4 w-px bg-gray-200 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-bold text-gray-900 truncate">{mod.title}</div>
          <div className="text-[11px] text-gray-400 truncate">{mod.subtitle}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {mod.isFree && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">🆓 Gratuit</span>
          )}
          {/* Module nav shortcuts */}
          <div className="flex items-center gap-1">
            {prev && (
              <Link href={`/formation/${prev.id}`} className="no-underline">
                <button className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 border-none cursor-pointer flex items-center justify-center text-gray-500 text-xs transition-colors">
                  ←
                </button>
              </Link>
            )}
            {next && (
              <Link href={`/formation/${next.id}`} className="no-underline">
                <button className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 border-none cursor-pointer flex items-center justify-center text-gray-500 text-xs transition-colors">
                  →
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Video placeholder ── */}
      <div className="mb-6 relative rounded-2xl overflow-hidden bg-loo-green-900 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
        <div className="aspect-video flex flex-col items-center justify-center gap-4 text-center p-6">
          <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.7)" />
            </svg>
          </div>
          <div>
            <p className="text-white/90 font-bold text-base mb-1">Vidéo — {mod.title}</p>
            <p className="text-white/40 text-[13px]">Disponible prochainement</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-loo-green-500/40" />
      </div>

      {/* ── Module content – light themed ── */}
      <div className="module-viewer rounded-2xl overflow-hidden border border-gray-200 shadow-[0_2px_16px_rgba(0,0,0,0.04)] mb-6">
        <style dangerouslySetInnerHTML={{
          __html: `
          /* ── Original module CSS (scoped) ── */
          ${cssContent}
          /* ── Light theme overrides ── */
          ${lightOverride}
  `}} />
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>

      {/* ── Module navigation ── */}
      <div className="flex items-stretch gap-3 mb-8">
        {prev ? (
          <Link
            href={`/formation/${prev.id}`}
            className="flex-1 bg-white rounded-xl border border-gray-200 p-4 hover:border-loo-green-300 hover:shadow-md transition-all group no-underline"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 group-hover:text-loo-green-600">
              ← Module précédent
            </div>
            <div className="text-[13px] font-bold text-gray-800 leading-tight">{prev.title}</div>
          </Link>
        ) : <div className="flex-1" />}

        {next ? (
          <Link
            href={`/formation/${next.id}`}
            className="flex-1 bg-white rounded-xl border border-gray-200 p-4 hover:border-loo-green-300 hover:shadow-md transition-all group text-right no-underline"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 group-hover:text-loo-green-600">
              Module suivant →
            </div>
            <div className="text-[13px] font-bold text-gray-800 leading-tight">{next.title}</div>
          </Link>
        ) : (
          <Link
            href="/formation"
            className="flex-1 bg-loo-green-50 rounded-xl border border-loo-green-200 p-4 hover:bg-loo-green-100 transition-all text-right no-underline"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-loo-green-500 mb-1.5">Formation terminée 🎉</div>
            <div className="text-[13px] font-bold text-loo-green-700 leading-tight">Retour aux modules</div>
          </Link>
        )}
      </div>

    </div>
  );
}
