"use client";

import { useEffect, useState, useRef } from "react";
import {
  Check,
  CheckCircle,
  ArrowRight,
  Lock,
  Shield,
  XCircle,
  AlertTriangle,
  Clock,
  Star,
  Zap,
  Landmark,
  CalendarCheck,
  HeartPulse,
  ShieldAlert,
  Baby,
  ScanSearch,
  Radio,
  Heart,
  BarChart3,
  Lightbulb,
  Menu,
  Plus,
  Unlock,
  ChevronDown,
  MegaphoneOff,
  Compass,
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [stickyCtaVisible, setStickyCtaVisible] = useState(false);
  const [liveCounter, setLiveCounter] = useState(3847);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });

  // Checklist state
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [checkResultVisible, setCheckResultVisible] = useState(false);

  // Quiz state
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [quizResult, setQuizResult] = useState<{
    profile: string;
    desc: string;
    badgeClass: string;
  } | null>(null);

  // Form states
  const [heroFormSubmitted, setHeroFormSubmitted] = useState(false);
  const [quizFormSubmitted, setQuizFormSubmitted] = useState(false);
  const [finalFormSubmitted, setFinalFormSubmitted] = useState(false);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Spotlight effect refs
  const spotlightRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const setSpotlightRef = (key: string) => (el: HTMLDivElement | null) => {
    spotlightRefs.current[key] = el;
    return;
  };

  // Scroll reveal state
  const [revealedElements, setRevealedElements] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Sticky CTA logic
      const heroSection = document.querySelector("section");
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setStickyCtaVisible(heroBottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-reveal-id");
            if (id) {
              setRevealedElements((prev) => new Set(prev).add(id));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("[data-reveal-id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Particle generation
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    
    const createParticle = () => {
      const container = document.getElementById("particles");
      if (!container) return;

      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = "100%";
      const size = 2 + Math.random() * 2 + "px";
      particle.style.width = size;
      particle.style.height = size;
      particle.style.animationDuration = 8 + Math.random() * 12 + "s";
      particle.style.animationDelay = Math.random() * 4 + "s";
      container.appendChild(particle);
      setTimeout(() => particle.remove(), 25000);
    };

    for (let i = 0; i < 15; i++) {
      setTimeout(createParticle, i * 600);
    }
    const interval = setInterval(createParticle, 2200);
    return () => clearInterval(interval);
  }, []);

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 4000);
  };

  const handleEmailForm = (
    e: React.FormEvent,
    context: "hero" | "quiz" | "final"
  ) => {
    e.preventDefault();
    if (context === "hero") {
      setHeroFormSubmitted(true);
    } else if (context === "quiz") {
      setQuizFormSubmitted(true);
    } else if (context === "final") {
      setFinalFormSubmitted(true);
    }
    showToast("Bienvenue dans Ballio ! Vérifiez vos emails.");
    setLiveCounter((prev) => prev + 1);
  };

  const toggleCheck = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);

    const count = newChecked.size;
    if (count === 0) {
      setCheckResultVisible(false);
    } else {
      setCheckResultVisible(true);
    }
  };

  const getCheckResultText = () => {
    const count = checkedItems.size;
    if (count >= 4) {
      return "Vous avez coché " +
        count +
        " comportements. Vous n'êtes pas seul, 8 parents sur 10 sont exactement dans votre situation. Ballio est fait pour vous. Commencez par le module M0 aujourd'hui.";
    } else if (count >= 2) {
      return "Vous avez identifié " +
        count +
        " points d'amélioration. Le diagnostic Ballio peut vous aider à aller beaucoup plus loin dans votre compréhension.";
    } else {
      return "Vous avez identifié un premier point. C'est déjà une prise de conscience. Ballio vous aidera à aller plus loin.";
    }
  };

  const selectQuizOption = (step: number, answer: string) => {
    setQuizAnswers((prev) => ({ ...prev, [step]: answer }));
  };

  const nextQuizStep = (current: number) => {
    if (!quizAnswers[current]) return;
    setQuizStep(current + 1);
  };

  const showQuizResult = () => {
    if (!quizAnswers[3]) return;

    const quizScores: { [key: string]: number } = { a: 0, b: 2, c: 1, d: 3 };
    const score = Object.values(quizAnswers).reduce(
      (acc, a) => acc + quizScores[a],
      0
    );

    let profile: string, desc: string, badgeClass: string;
    if (score <= 2) {
      profile = "Le Mentor Instinctif";
      desc =
        "Vous avez déjà de bons réflexes parentaux. Ballio va les affiner pour transformer votre soutien en véritable accélérateur de performance pour votre enfant.";
      badgeClass =
        "bg-pitch-500/10 border border-pitch-500/30 text-pitch-300";
    } else if (score <= 5) {
      profile = "Le Parent en Transition";
      desc =
        "Vous êtes sur la bonne voie, mais certains automatismes vous freinent. Le programme Ballio va vous donner les clés pour les effacer définitivement — et libérer votre enfant.";
      badgeClass =
        "bg-blue-500/10 border border-blue-500/30 text-blue-300";
    } else {
      profile = "Le Manager Anxieux";
      desc =
        "Votre investissement pour votre enfant est immense — mais il peut parfois peser sur lui sans que vous le voyiez. Ballio est conçu exactement pour vous. Commencez par le module M0.";
      badgeClass =
        "bg-orange-500/10 border border-orange-500/30 text-orange-300";
    }

    setQuizResult({ profile, desc, badgeClass });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleMouseMove = (e: React.MouseEvent, refName: string) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const el = spotlightRefs.current[refName];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const isRevealed = (id: string) => revealedElements.has(id);

  return (
    <div className="font-dm min-h-screen bg-[#020617] text-[#f8fafc] overflow-x-hidden relative">
      {/* Particles */}
      <div id="particles" className="fixed inset-0 pointer-events-none z-0" />

      {/* Toast */}
      <div
        id="toast"
        className={`fixed bottom-6 right-6 z-[9999] px-6 py-4 rounded-xl bg-pitch-500/15 border border-pitch-500/30 backdrop-blur-xl transition-all duration-500 ${toast.show
          ? "translate-y-0 opacity-100"
          : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 translate-y-[100px] opacity-0"
          }`}
      >
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-pitch-400 flex-shrink-0" />
          <span className="text-sm text-pitch-100">{toast.message}</span>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div
        id="sticky-cta"
        className={`fixed bottom-[-80px] left-0 right-0 z-[49] transition-all duration-500 bg-[#020617]/92 backdrop-blur-xl border-t border-pitch-500/20 py-3 px-4 ${stickyCtaVisible ? "bottom-0" : ""
          }`}
      >
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-dark-200 hidden sm:block">
            Devenez le parent qu'il mérite.
          </p>
          <a
            href="#hero-form"
            className="cta-btn rounded-xl px-6 py-3 text-sm font-semibold text-white flex items-center gap-2 flex-shrink-0 mx-auto sm:mx-0"
          >
            <span>Accès gratuit — 7 modules offerts</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-[10px] text-dark-600 hidden sm:block whitespace-nowrap">
            {liveCounter.toLocaleString("fr-FR").replace(/,/g, " ")} parents ·
            0€
          </p>
        </div>
      </div>

      {/* Announcement Bar */}
      <div className="announcement py-2.5 px-4 text-center relative z-50">
        <p className="text-xs text-dark-300 flex items-center justify-center gap-2 flex-wrap">
          <span className="w-1.5 h-1.5 rounded-full bg-pitch-400 pulse-green flex-shrink-0" />
          <strong className="text-pitch-300 font-semibold">
            {liveCounter.toLocaleString("fr-FR").replace(/,/g, " ")}
          </strong>
          <span>parents accompagnés</span>
          <span className="text-dark-600 hidden xs:inline">·</span>
          <span className="hidden xs:inline">
            Programme 100% gratuit · Aucune CB requise
          </span>
          <a href="#hero-form" className="text-pitch-400 font-semibold hover:underline ml-1">
            Rejoindre →
          </a>
        </p>
      </div>

      {/* Navbar */}
      <nav
        id="navbar"
        className={`fixed top-[40px] left-0 right-0 z-50 h-20 flex items-center transition-all duration-500 ${scrolled
          ? "bg-[#020617]/88 backdrop-blur-2xl border-b border-white/[.06]"
          : ""
          }`}
        style={{ background: scrolled ? "" : "transparent" }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pitch-400 to-pitch-600 flex items-center justify-center shadow-lg shadow-pitch-500/20 group-hover:shadow-pitch-500/40 transition-shadow">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight font-syne">
              Ballio
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#methode"
              className="text-sm text-dark-400 hover:text-white transition-colors"
            >
              Méthode
            </a>
            <a
              href="#temoignages"
              className="text-sm text-dark-400 hover:text-white transition-colors"
            >
              Témoignages
            </a>
            <a
              href="#outils"
              className="text-sm text-dark-400 hover:text-white transition-colors"
            >
              Outils
            </a>
            <a
              href="#faq"
              className="text-sm text-dark-400 hover:text-white transition-colors"
            >
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/sign-in"
              className="hidden sm:inline-flex cta-btn rounded-xl px-5 py-2.5 text-sm font-semibold text-white items-center gap-2"
            >
              <span>Accès gratuit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl glass"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 transition-all duration-300 ${mobileMenuOpen ? "" : "hidden"
          }`}
        style={{
          background: "rgba(2,6,23,.97)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <a
            href="#methode"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-light text-dark-300 hover:text-white transition-colors font-syne"
          >
            Méthode
          </a>
          <a
            href="#temoignages"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-light text-dark-300 hover:text-white transition-colors font-syne"
          >
            Témoignages
          </a>
          <a
            href="#outils"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-light text-dark-300 hover:text-white transition-colors font-syne"
          >
            Outils
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-light text-dark-300 hover:text-white transition-colors font-syne"
          >
            FAQ
          </a>
          <a
            href="#hero-form"
            onClick={() => setMobileMenuOpen(false)}
            className="cta-btn rounded-xl px-8 py-3.5 text-base font-semibold text-white mt-4 flex items-center gap-2"
          >
            <span>Accès gratuit</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* HERO SECTION */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ paddingTop: "160px", paddingBottom: "8rem" }}
      >
        <div className="net-bg" />
        <div className="glow-orb w-[600px] h-[600px] bg-pitch-500/10 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="glow-orb w-[300px] h-[300px] bg-pitch-600/80 bottom-0 right-0" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div
            data-reveal-id="hero-badge"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 transition-all duration-700 ${isRevealed("hero-badge") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
              }`}
          >
            <span className="w-2 h-2 rounded-full bg-pitch-400 pulse-green" />
            <span className="text-xs font-medium tracking-wide text-pitch-300">
              100% Gratuit pour la passion du football
            </span>
          </div>

          {/* Headline */}
          <h1
            data-reveal-id="hero-title"
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 transition-all duration-700 delay-100 ${isRevealed("hero-title") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
              }`}
          >
            <span className="text-dark-200">8 parents sur 10</span>{" "}
            <span className="text-gradient-green">
              sabotent le football
            </span>{" "}
            <span className="text-dark-200">
              de leur enfant. Sans le vouloir.
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            data-reveal-id="hero-subtitle"
            className={`text-base sm:text-lg md:text-xl text-dark-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 font-light`}
          >
            Arrêtez de gâcher le talent et la passion de votre enfant par une
            pression invisible. Reprenez votre juste place et transformez vos
            dimanches soirs.
            <br />
            <strong className="text-dark-300 font-medium">
              Ballio vous donne les clés pour devenir son plus grand atout, pas
              son plus grand frein.
            </strong>
          </p>

          {/* Action Area */}
          <div
            id="hero-actions"
            data-reveal-id="hero-form"
            className={`max-w-lg mx-auto transition-all duration-700 delay-300 flex flex-col items-center gap-6 ${isRevealed("hero-form") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
              }`}
          >
            {/* Dashboard Button */}
            <a
              href="/sign-in"
              className="cta-btn rounded-xl px-10 py-5 text-lg font-semibold text-white flex items-center justify-center gap-3 w-full max-w-sm shadow-xl shadow-pitch-500/20"
            >
              <span>Connexion au Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <p className="text-xs text-dark-600 flex items-center justify-center gap-4 flex-wrap mt-3">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-pitch-500" />
                100% gratuit
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-pitch-500" />
                Aucune carte bancaire
              </span>
              <span className="flex items-center gap-1.5">
                <XCircle className="w-3 h-3 text-pitch-500" />
                Zéro engagement
              </span>
            </p>

            <div className="w-full flex items-center gap-4 my-4 opacity-60">
              <div className="flex-1 h-px bg-white/[.08]"></div>
              <span className="text-[10px] text-dark-500 font-bold tracking-widest uppercase">OU</span>
              <div className="flex-1 h-px bg-white/[.08]"></div>
            </div>

            {/* Email Form for Lead Magnet */}
            <div className="w-full">
              {!heroFormSubmitted ? (
                <div id="hero-form-block">
                  <div className="text-center mb-5">
                    <p className="text-sm sm:text-base font-bold text-pitch-300 mb-2 font-syne">
                      Le "Protocole Silence" (PDF Gratuit)
                    </p>
                    <p className="text-xs sm:text-sm text-dark-300 font-light leading-relaxed">
                      La méthode exacte en 3 étapes pour ne plus jamais gâcher le trajet retour et transformer votre prise de parole en un véritable déclic pour sa confiance. <strong className="text-white font-medium">Laissez votre email pour le recevoir immédiatement.</strong>
                    </p>
                  </div>
                  <form onSubmit={(e) => handleEmailForm(e, "hero")}>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        placeholder="votre@email.com"
                        required
                        className="email-input flex-1 rounded-xl px-5 py-4 text-base"
                      />
                      <button
                        type="submit"
                        className="rounded-xl px-7 py-4 text-base font-semibold text-dark-900 bg-pitch-500 hover:bg-pitch-400 flex items-center justify-center gap-2.5 whitespace-nowrap transition-colors shadow-lg shadow-pitch-500/20"
                      >
                        <span>Recevoir le PDF</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div
                  id="hero-success"
                  className="hero-success flex-col items-center gap-4 py-6 flex"
                >
                  <div className="w-14 h-14 rounded-2xl bg-pitch-500/20 flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-pitch-400" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-dark-100 font-syne">
                      Demande enregistrée !
                    </p>
                    <p className="text-sm text-dark-400 mt-1 font-light block mb-3">
                      Vous allez recevoir le Protocole Silence par email.
                    </p>
                    <a href="/Le Protocole Silence Ballio.pdf" download className="text-pitch-400 text-sm font-medium hover:underline inline-flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" /> Télécharger directement le PDF
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social proof */}
          <div
            data-reveal-id="hero-social"
            className={`mt-10 flex items-center justify-center gap-3 transition-all duration-700 delay-400 ${isRevealed("hero-social") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
              }`}
          >
            <div className="flex -space-x-2.5">
              <img
                src="https://i.pravatar.cc/40?img=47"
                alt=""
                className="w-9 h-9 rounded-full border-2 border-dark-950 object-cover"
              />
              <img
                src="https://i.pravatar.cc/40?img=33"
                alt=""
                className="w-9 h-9 rounded-full border-2 border-dark-950 object-cover"
              />
              <img
                src="https://i.pravatar.cc/40?img=56"
                alt=""
                className="w-9 h-9 rounded-full border-2 border-dark-950 object-cover"
              />
              <img
                src="https://i.pravatar.cc/40?img=12"
                alt=""
                className="w-9 h-9 rounded-full border-2 border-dark-950 object-cover"
              />
              <div className="w-9 h-9 rounded-full border-2 border-dark-950 bg-dark-800 flex items-center justify-center text-[9px] font-bold text-pitch-400">
                +3k
              </div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 text-xs tracking-tight">
                  ★★★★★
                </span>
                <span className="text-xs font-bold text-dark-200">4,9/5</span>
              </div>
              <span className="text-xs text-dark-500 font-light">
                {liveCounter.toLocaleString("fr-FR").replace(/,/g, " ")} parents
                ont déjà rejoint Ballio
              </span>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-5 h-8 rounded-full border border-dark-600 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-dark-400 animate-bounce" />
          </div>
        </div>
      </section>

      <div className="green-line max-w-4xl mx-auto" />

      {/* STATS BAR */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            data-reveal-id="stats"
            className={`glass rounded-2xl p-6 sm:p-8 transition-all duration-700 ${isRevealed("stats") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
              }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-dark-100 mb-1 font-syne">
                  {liveCounter.toLocaleString("fr-FR").replace(/,/g, " ")}
                </div>
                <div className="text-xs text-dark-500 tracking-widest uppercase">
                  Parents accompagnés
                </div>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-white/[.06] pt-6 sm:pt-0 sm:pl-6">
                <div className="text-3xl sm:text-4xl font-bold text-dark-100 mb-1 font-syne">
                  4,9<span className="text-pitch-400">/5</span>
                </div>
                <div className="text-xs text-dark-500 tracking-widest uppercase">
                  Satisfaction parents
                </div>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-white/[.06] pt-6 sm:pt-0 sm:pl-6">
                <div className="text-3xl sm:text-4xl font-bold text-dark-100 mb-1 font-syne">
                  7 <span className="text-pitch-400 text-2xl">modules</span>
                </div>
                <div className="text-xs text-dark-500 tracking-widest uppercase">
                  De contenu expert
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="green-line max-w-4xl mx-auto" />

      {/* TESTIMONIALS */}
      <section id="temoignages" className="relative py-28 sm:py-36 overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-pitch-500/15 top-1/2 right-0" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              data-reveal-id="testimonials-title"
              className="text-xs font-semibold tracking-widest uppercase text-pitch-500/80 mb-4 block transition-all duration-700"
            >
              Témoignages
            </span>
            <h2
              data-reveal-id="testimonials-headline"
              className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight transition-all duration-700 delay-100 ${isRevealed("testimonials-headline") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
                }`}
            >
              <span className="text-dark-200">Ils ont fait le premier pas.</span>
              <br />
              <span className="text-gradient-green">Tout a changé.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                img: "33",
                name: "Frédéric L.",
                role: "Papa de Théo, U14 · AS Poissy",
                text: "Mon fils avait clairement dit qu'il voulait arrêter. Je ne comprenais pas pourquoi. Après le module M3, j'ai réalisé que c'était moi le problème — pas le foot. Aujourd'hui il est titulaire en U14 et me raconte chaque match à table.",
              },
              {
                img: "47",
                name: "Sophie M.",
                role: "Maman de Lucas, U11 · FC Boulogne",
                text: "Je ne savais pas que je mettais une pression invisible. Le diagnostic m'a ouvert les yeux : j'étais en mode Manager Anxieux sans le voir. Le trajet retour est devenu notre meilleur moment de la semaine.",
              },
              {
                img: "25",
                name: "Marc D.",
                role: "Papa de Chloé, U16 · Stade Rennais Formation",
                text: "Ma fille pleurait après chaque match perdu. Je pensais qu'elle était trop sensible. Ballio m'a appris à créer le bon espace. Elle a été sélectionnée en équipe régionale 3 mois plus tard. Notre relation s'est transformée.",
              },
            ].map((t, i) => (
              <div
                key={i}
                data-reveal-id={`testimonial-${i}`}
                className={`glass glass-hover rounded-2xl p-7 flex flex-col gap-5 transition-all duration-700 delay-${(i + 1) * 100} ${isRevealed(`testimonial-${i}`) ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
                  }`}
              >
                <div>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-dark-300 leading-relaxed font-light">
                    "{t.text.split("**")[0]}
                    <strong className="text-dark-100 font-semibold">
                      {t.text.split("**")[1]}
                    </strong>
                    {t.text.split("**")[2]}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-5 border-t border-white/[.06]">
                  <img
                    src={`https://i.pravatar.cc/80?img=${t.img}`}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm font-bold text-dark-200">{t.name}</p>
                    <p className="text-xs text-dark-500 font-light">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA after testimonials */}
          <div
            data-reveal-id="testimonials-cta"
            className={`text-center mt-12 transition-all duration-700 delay-400 ${isRevealed("testimonials-cta") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
              }`}
          >
            <a
              href="#hero-form"
              className="cta-btn rounded-2xl px-10 py-4 text-base font-semibold text-white inline-flex items-center gap-3"
            >
              <span>Je veux les mêmes résultats — C'est gratuit</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-xs text-dark-600 mt-3">
              Rejoignez {liveCounter.toLocaleString("fr-FR").replace(/,/g, " ")}{" "}
              parents · Aucune CB requise
            </p>
          </div>
        </div>
      </section>

      <div className="green-line max-w-4xl mx-auto" />

      {/* MIRROR — PAIN */}
      <section className="relative py-28 sm:py-36 overflow-hidden">
        <div className="glow-orb w-[400px] h-[400px] bg-red-500/5 top-0 left-0" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-reveal-id="mirror"
            className={`glass rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden transition-all duration-700 ${isRevealed("mirror") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
              }`}
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <span className="text-xs font-semibold tracking-widest uppercase text-red-400/80">
                  Le moment de vérité
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug tracking-tight mb-8">
                <span className="text-dark-200">Le trajet du retour.</span>
                <br />
                <span className="text-dark-200">
                  Le silence qui pèse dans la voiture.
                </span>
                <br />
                <span className="text-dark-400">
                  Le petit commentaire qui reste.
                </span>
              </h2>

              <p
                className="text-base sm:text-lg text-dark-400 leading-relaxed mb-10 max-w-2xl font-light"
              >
                Vous voulez le meilleur pour lui. Mais vos mots deviennent des
                poids. La déception que vous essayez de cacher se lit dans vos
                yeux. Et s'il finissait par{" "}
                <span className="text-red-400/80 font-medium">
                  détester ce sport à cause de vous ?
                </span>
              </p>

              {/* Interactive checklist */}
              <p className="text-[11px] font-bold tracking-widest uppercase text-dark-500 mb-4">
                Cochez ce qui vous ressemble :
              </p>
              <div className="space-y-2.5 mb-8" id="checklist">
                {[
                  "Je commente ses erreurs juste après le match, même avec les meilleures intentions",
                  "Mon enfant évite de me parler quand le match s'est mal passé",
                  "Je sens une tension dans la voiture après une défaite",
                  "Je rêve plus fort que lui d'une carrière de footballeur pour lui",
                  "Je conteste les décisions de l'entraîneur depuis les tribunes",
                ].map((text, index) => (
                  <div
                    key={index}
                    onClick={() => toggleCheck(index)}
                    className={`check-item flex items-center gap-3 p-4 rounded-xl border border-white/[.06] bg-white/[.02] cursor-pointer transition-all ${checkedItems.has(index)
                      ? "checked border-pitch-500/50 bg-pitch-500/08"
                      : ""
                      }`}
                  >
                    <div
                      className={`w-5 h-5 border-[1.5px] rounded-md flex items-center justify-center flex-shrink-0 transition-all ${checkedItems.has(index)
                        ? "bg-pitch-500/90 border-pitch-500"
                        : "border-white/[.2]"
                        }`}
                    >
                      {checkedItems.has(index) && (
                        <Check className="w-3 h-3 text-dark-950" />
                      )}
                    </div>
                    <span className="text-sm text-dark-400 font-light">
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              {checkResultVisible && (
                <div
                  id="checkResult"
                  className="p-5 rounded-xl bg-pitch-500/10 border border-pitch-500/20 mb-8"
                >
                  <p className="text-sm text-pitch-300 font-medium leading-relaxed">
                    {getCheckResultText()}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="#diagnostic"
                  className="cta-btn rounded-2xl px-8 py-4 text-sm font-semibold text-white flex items-center gap-2.5"
                >
                  <span>Faire mon diagnostic parental</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-xs text-dark-600 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  2 minutes · Résultats instantanés · Gratuit
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="green-line max-w-4xl mx-auto" />

      {/* PROMISE */}
      <section className="relative py-28 sm:py-36 overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-pitch-500/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              data-reveal-id="promise-title"
              className="text-xs font-semibold tracking-widest uppercase text-pitch-500/80 mb-4 block transition-all duration-700"
            >
              Le pivot
            </span>
            <h2
              data-reveal-id="promise-headline"
              className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] transition-all duration-700 delay-100 ${isRevealed("promise-headline") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
                }`}
            >
              <span className="text-dark-200">Ballio ne forme pas</span>
              <br />
              <span className="text-dark-200">votre enfant au football.</span>
              <br />
              <span className="text-gradient-green">Ballio forme le parent.</span>
            </h2>
            <p
              data-reveal-id="promise-subtitle"
              className={`text-base text-dark-500 mt-6 max-w-lg mx-auto leading-relaxed transition-all duration-700 delay-200 font-light`}
            >
              Parce que les meilleurs joueurs ont un point commun : un parent qui
              savait comment soutenir sans étouffer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Devenez l'armure",
                desc: "Pas le poids. Protégez-le sans l'étouffer. Soyez son refuge, pas une source de pression supplémentaire.",
              },
              {
                icon: MegaphoneOff,
                title: "Encourager sans peser",
                desc: "Les bons mots au bon moment. Transformez chaque encouragement en carburant, pas en obligation de réussir.",
              },
              {
                icon: Compass,
                title: "Accompagner sans s'immiscer",
                desc: "Trouvez la distance parfaite. Assez proche pour soutenir, assez loin pour le laisser grandir à son rythme.",
              },
            ].map((item, i) => (
              <div
                key={i}
                data-reveal-id={`promise-${i}`}
                ref={setSpotlightRef(`promise-${i}`)}
                onMouseMove={(e) => handleMouseMove(e, `promise-${i}`)}
                className={`glass glass-hover spotlight-card rounded-2xl p-8 text-center transition-all duration-700 delay-${(i + 2) * 100} ${isRevealed(`promise-${i}`) ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
                  }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-pitch-500/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-7 h-7 text-pitch-400" />
                </div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-dark-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="green-line max-w-4xl mx-auto" />

      {/* MODULES */}
      <section id="methode" className="relative py-28 sm:py-36 overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] bg-pitch-500/15 top-1/3 right-0" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              data-reveal-id="modules-title"
              className="text-xs font-semibold tracking-widest uppercase text-pitch-500/80 mb-4 block transition-all duration-700"
            >
              La méthode
            </span>
            <h2
              data-reveal-id="modules-headline"
              className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight transition-all duration-700 delay-100 ${isRevealed("modules-headline") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
                }`}
            >
              <span className="text-dark-200">7 modules.</span>
              <span className="text-gradient-green"> Un protocole complet.</span>
            </h2>
            <p
              data-reveal-id="modules-subtitle"
              className={`text-base text-dark-500 mt-4 max-w-xl mx-auto transition-all duration-700 delay-200 font-light`}
            >
              Chaque module cible un moment précis de votre rôle de parent. 15
              minutes chacun. Applicable dès le prochain match.
            </p>
          </div>
          <div className="bento-grid">
            {/* M0 */}
            <div
              data-reveal-id="module-0"
              ref={(el) => { spotlightRefs.current["module-0"] = el }}
              onMouseMove={(e) => handleMouseMove(e, "module-0")}
              className={`glass glass-hover spotlight-card rounded-2xl p-7 flex flex-col justify-between min-h-[200px] relative overflow-hidden transition-all duration-700 delay-100 bento-1 ${isRevealed("module-0") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
                }`}
            >
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-500/10 rounded-full blur-[40px]" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-wider uppercase text-orange-400">
                      M0 — Électrochoc
                    </span>
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Prenez conscience de l'invisible
                </h3>
                <p className="text-sm text-dark-400 leading-relaxed font-light">
                  Identifiez les comportements toxiques que vous ne voyez pas.
                  Un réveil brutal et bienveillant.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-dark-500 mt-4">
                <Zap className="w-3.5 h-3.5 text-orange-400/60" />
                <span>Le module qui change tout dès la première lecture</span>
              </div>
            </div>

            {/* M1 */}
            <div
              data-reveal-id="module-1"
              ref={(el) => { spotlightRefs.current["module-1"] = el }}
              onMouseMove={(e) => handleMouseMove(e, "module-1")}
              className={`glass glass-hover spotlight-card rounded-2xl p-7 flex flex-col min-h-[200px] transition-all duration-700 delay-200 bento-2 ${isRevealed("module-1") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
                }`}
            >
              <span className="text-[10px] font-bold tracking-wider uppercase text-dark-500 mb-4">
                M1 — Fondations
              </span>
              <div className="w-12 h-12 rounded-xl bg-pitch-500/10 flex items-center justify-center mb-4">
                <Landmark className="w-6 h-6 text-pitch-400" />
              </div>
              <h3 className="text-base font-bold mb-2">Reprenez votre juste place</h3>
              <p className="text-sm text-dark-500 leading-relaxed font-light">
                Ni coach, ni arbitre. Le parent qui libère et non celui qui contrôle.
              </p>
            </div>

            {/* M2 */}
            <div
              data-reveal-id="module-2"
              ref={(el) => { spotlightRefs.current["module-2"] = el }}
              onMouseMove={(e) => handleMouseMove(e, "module-2")}
              className={`glass glass-hover spotlight-card rounded-2xl p-7 flex flex-col min-h-[200px] transition-all duration-700 delay-300 bento-3 ${isRevealed("module-2") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
                }`}
            >
              <span className="text-[10px] font-bold tracking-wider uppercase text-dark-500 mb-4">
                M2 — Jour de Match
              </span>
              <div className="w-12 h-12 rounded-xl bg-pitch-500/10 flex items-center justify-center mb-4">
                <CalendarCheck className="w-6 h-6 text-pitch-400" />
              </div>
              <h3 className="text-base font-bold mb-2">Chaque mot compte</h3>
              <p className="text-sm text-dark-500 leading-relaxed font-light">
                De la veille au retour. Un protocole mot à mot, minute par minute.
              </p>
            </div>

            {/* M3 */}
            <div
              data-reveal-id="module-3"
              ref={(el) => { spotlightRefs.current["module-3"] = el }}
              onMouseMove={(e) => handleMouseMove(e, "module-3")}
              className={`glass glass-hover spotlight-card rounded-2xl p-7 flex flex-col min-h-[200px] transition-all duration-700 delay-400 bento-4 ${isRevealed("module-3") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
                }`}
            >
              <span className="text-[10px] font-bold tracking-wider uppercase text-dark-500 mb-4">
                M3 — Trousse de Secours
              </span>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                <HeartPulse className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-base font-bold mb-2">Gérer la crise</h3>
              <p className="text-sm text-dark-500 leading-relaxed mb-4 font-light">
                Envie d'arrêter, larmes, blessure. Protocoles d'urgence émotionnelle
                testés par des coachs professionnels.
              </p>
              <div className="mt-auto pt-4 border-t border-white/[.04]">
                <span className="text-xs text-dark-500 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400/50" />
                  Module de crise — priorité absolue
                </span>
              </div>
            </div>

            {/* M5 */}
            <div
              data-reveal-id="module-5"
              ref={(el) => { spotlightRefs.current["module-5"] = el }}
              onMouseMove={(e) => handleMouseMove(e, "module-5")}
              className={`glass glass-hover spotlight-card rounded-2xl p-7 flex flex-col min-h-[200px] transition-all duration-700 delay-500 bento-5 ${isRevealed("module-5") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
                }`}
            >
              <span className="text-[10px] font-bold tracking-wider uppercase text-dark-500 mb-4">
                M5 — Ingénierie Invisible
              </span>
              <h3 className="text-base font-bold mb-2">
                Nutrition, sommeil, récupération
              </h3>
              <p className="text-sm text-dark-500 leading-relaxed font-light">
                Ce que vous pouvez optimiser sans que votre enfant le remarque. Les
                leviers invisibles de la performance.
              </p>
              <div className="flex gap-3 mt-4">
                <span className="px-3 py-1 rounded-full bg-white/[.03] border border-white/[.06] text-[10px] text-dark-400">
                  Nutrition
                </span>
                <span className="px-3 py-1 rounded-full bg-white/[.03] border border-white/[.06] text-[10px] text-dark-400">
                  Sommeil
                </span>
                <span className="px-3 py-1 rounded-full bg-white/[.03] border border-white/[.06] text-[10px] text-dark-400">
                  Récupération
                </span>
              </div>
            </div>

            {/* M4 */}
            <div
              data-reveal-id="module-4"
              ref={(el) => { spotlightRefs.current["module-4"] = el }}
              onMouseMove={(e) => handleMouseMove(e, "module-4")}
              className={`glass glass-hover spotlight-card rounded-2xl p-7 flex flex-col min-h-[200px] transition-all duration-700 delay-600 bento-6 ${isRevealed("module-4") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
                }`}
            >
              <span className="text-[10px] font-bold tracking-wider uppercase text-dark-500 mb-4">
                M4 — Par Âge
              </span>
              <div className="w-12 h-12 rounded-xl bg-pitch-500/10 flex items-center justify-center mb-4">
                <Baby className="w-6 h-6 text-pitch-400" />
              </div>
              <h3 className="text-base font-bold mb-2">U6 à U18</h3>
              <p className="text-sm text-dark-500 leading-relaxed font-light">
                Le bon rôle au bon âge. Ce qu'un parent de U8 ne doit jamais faire
                face à U16.
              </p>
            </div>

            {/* M6 */}
            <div
              data-reveal-id="module-6"
              ref={(el) => { spotlightRefs.current["module-6"] = el }}
              onMouseMove={(e) => handleMouseMove(e, "module-6")}
              className={`glass glass-hover spotlight-card rounded-2xl p-7 flex flex-col min-h-[200px] transition-all duration-700 bento-7 ${isRevealed("module-6") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
                }`}
            >
              <span className="text-[10px] font-bold tracking-wider uppercase text-dark-500 mb-4">
                M6 — Écosystème Pro
              </span>
              <div className="w-12 h-12 rounded-xl bg-pitch-500/10 flex items-center justify-center mb-4">
                <ScanSearch className="w-6 h-6 text-pitch-400" />
              </div>
              <h3 className="text-base font-bold mb-2">Clubs & recruteurs</h3>
              <p className="text-sm text-dark-500 leading-relaxed font-light">
                Comprendre le monde qui décide. Pour ne plus être dans le brouillard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="green-line max-w-4xl mx-auto" />

      {/* OUTILS */}
      <section id="outils" className="relative py-28 sm:py-36 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              data-reveal-id="tools-title"
              className="text-xs font-semibold tracking-widest uppercase text-pitch-500/80 mb-4 block transition-all duration-700"
            >
              L'arsenal
            </span>
            <h2
              data-reveal-id="tools-headline"
              className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight transition-all duration-700 delay-100 ${isRevealed("tools-headline") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
                }`}
            >
              <span className="text-dark-200">Pas que de la théorie.</span>
              <br />
              <span className="text-gradient-green">Des outils quotidiens.</span>
            </h2>
            <p
              data-reveal-id="tools-subtitle"
              className={`text-base text-dark-500 mt-4 max-w-xl mx-auto transition-all duration-700 delay-200 font-light`}
            >
              Ballio, c'est aussi une plateforme de suivi concret. Chaque match
              tracé. Chaque émotion capturée.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Suivi Live */}
            <div
              data-reveal-id="tool-live"
              className="lg:col-span-2 glass rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-700 delay-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pitch-500/[.03] to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pitch-500/15 flex items-center justify-center">
                      <Radio className="w-5 h-5 text-pitch-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold">Suivi Live de Match</h3>
                      <p className="text-xs text-dark-500 mt-0.5 font-light">
                        Carte de performance style FC26 pour votre enfant
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-pitch-500/10 border border-pitch-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-pitch-400 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-wider uppercase text-pitch-400">
                      Live
                    </span>
                  </div>
                </div>
                {/* Mini player card */}
                <div className="card-fc rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pitch-500/10 rounded-full blur-[50px]" />
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] tracking-widest uppercase text-pitch-500/60 mb-1">
                        Milieu — #10
                      </div>
                      <div className="text-2xl font-bold text-dark-100 mb-3">
                        Martin D.
                      </div>
                      <div className="text-5xl font-bold text-pitch-400 leading-none">
                        7.4
                      </div>
                      <div className="text-[10px] text-dark-500 mt-1 tracking-widest uppercase">
                        Note de match
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-dark-950/50 rounded-lg p-2.5 border border-white/[.03] text-center">
                        <div className="text-[8px] uppercase text-dark-500 font-semibold mb-0.5">
                          Passes
                        </div>
                        <div className="text-base font-bold text-dark-200">24</div>
                        <div className="text-[8px] text-pitch-400/60">+12%</div>
                      </div>
                      <div className="bg-dark-950/50 rounded-lg p-2.5 border border-white/[.03] text-center">
                        <div className="text-[8px] uppercase text-dark-500 font-semibold mb-0.5">
                          Duels
                        </div>
                        <div className="text-base font-bold text-dark-200">8/12</div>
                        <div className="text-[8px] text-pitch-400/60">67%</div>
                      </div>
                      <div className="bg-dark-950/50 rounded-lg p-2.5 border border-white/[.03] text-center">
                        <div className="text-[8px] uppercase text-dark-500 font-semibold mb-0.5">
                          Buts
                        </div>
                        <div className="text-base font-bold text-dark-200">1</div>
                        <div className="text-[8px] text-pitch-400/60">
                          Titulaire
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/[.04]">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-pitch-400 flex-shrink-0 mt-0.5" />
                      <p className="text-[11px] text-dark-400 font-light">
                        <span className="text-pitch-400 font-semibold">
                          Insight IA :
                        </span>{" "}
                        Progression constante sur les 4 derniers matchs. Montée
                        en puissance en seconde mi-temps.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard + Check-in stack */}
            <div className="flex flex-col gap-6">
              <div
                data-reveal-id="tool-checkin"
                className="glass glass-hover rounded-2xl p-6 flex-1 transition-all duration-700 delay-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-pitch-500/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-pitch-400" />
                  </div>
                  <h3 className="text-sm font-bold">Check-in Émotionnel</h3>
                </div>
                <p className="text-xs text-dark-500 leading-relaxed mb-4 font-light">
                  Le bien-être de votre enfant avant chaque match. Un geste simple,
                  un impact immense sur la relation.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-8 h-8 rounded-lg bg-dark-800 flex items-center justify-center text-base opacity-60">
                      😰
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-dark-800 flex items-center justify-center text-base opacity-60">
                      😐
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-pitch-500/20 border border-pitch-500/30 flex items-center justify-center text-base">
                      😄
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-dark-800 flex items-center justify-center text-base opacity-60">
                      🔥
                    </div>
                  </div>
                  <span className="text-[10px] text-pitch-400 font-semibold">
                    Confiant
                  </span>
                </div>
              </div>
              <div
                data-reveal-id="tool-dashboard"
                className="glass glass-hover rounded-2xl p-6 flex-1 transition-all duration-700 delay-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-pitch-500/10 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-pitch-400" />
                  </div>
                  <h3 className="text-sm font-bold">Dashboard de suivi</h3>
                </div>
                <p className="text-xs text-dark-500 leading-relaxed mb-4 font-light">
                  Votre progression dans les modules et celle de votre enfant,
                  saison après saison.
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="h-7 rounded-lg bg-pitch-500/15 border border-pitch-500/20 flex items-center justify-center text-[9px] text-pitch-400 font-bold">
                    M0 ✓
                  </div>
                  <div className="h-7 rounded-lg bg-pitch-500/15 border border-pitch-500/20 flex items-center justify-center text-[9px] text-pitch-400 font-bold">
                    M1 ✓
                  </div>
                  <div className="h-7 rounded-lg bg-pitch-500/10 border border-pitch-500/20 flex items-center justify-center text-[9px] text-pitch-400">
                    M2 →
                  </div>
                  <div className="h-7 rounded-lg bg-white/[.02] border border-white/[.04] flex items-center justify-center text-[9px] text-dark-600">
                    M3
                  </div>
                  <div className="h-7 rounded-lg bg-white/[.02] border border-white/[.04] flex items-center justify-center text-[9px] text-dark-600">
                    M4
                  </div>
                  <div className="h-7 rounded-lg bg-white/[.02] border border-white/[.04] flex items-center justify-center text-[9px] text-dark-600">
                    M5
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="green-line max-w-4xl mx-auto" />

      {/* DIAGNOSTIC QUIZ */}
      <section id="diagnostic" className="relative py-28 sm:py-36 overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-pitch-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-reveal-id="diagnostic"
            className={`glass rounded-3xl p-8 sm:p-12 relative overflow-hidden transition-all duration-700 ${isRevealed("diagnostic") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
              }`}
          >
            <div className="text-center mb-8">
              <span className="text-xs font-semibold tracking-widest uppercase text-pitch-500/80 mb-4 block">
                Diagnostic parental gratuit
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15]">
                <span className="text-dark-200">Quel type de parent</span>
                <br />
                <span className="text-gradient-green">de footballeur</span>
                <br />
                <span className="text-dark-200"> êtes-vous ?</span>
              </h2>
              <p className="text-sm text-dark-500 mt-4 font-light">
                3 questions · Résultat instantané · Plan personnalisé offert
              </p>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex-1 h-1.5 rounded-full bg-white/[.06]">
                <div
                  id="quiz-progress"
                  className="h-full rounded-full bg-pitch-500 transition-all duration-500"
                  style={{ width: `${(quizStep / 3) * 100}%` }}
                />
              </div>
              <span id="quiz-step-label" className="text-xs text-dark-500 font-medium whitespace-nowrap">
                Question {quizStep}/3
              </span>
            </div>

            {/* STEP 1 */}
            {quizStep === 1 && !quizResult && (
              <div id="quiz-step-1" className="quiz-step">
                <h3 className="text-base font-bold mb-5 text-dark-200">
                  Après un match perdu, votre première réaction est...
                </h3>
                <div className="space-y-2.5 mb-6">
                  {[
                    { id: "a", text: "Consoler mon enfant sans parler du match" },
                    { id: "b", text: "Analyser ses erreurs pour qu'il progresse" },
                    { id: "c", text: "Garder le silence, laisser passer" },
                    { id: "d", text: "Blâmer l'entraîneur ou les arbitres" },
                  ].map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => selectQuizOption(1, opt.id)}
                      className={`quiz-option flex items-center gap-4 p-4 rounded-xl border border-white/[.06] bg-white/[.02] cursor-pointer transition-all ${quizAnswers[1] === opt.id ? "selected" : ""
                        }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 quiz-radio transition-all ${quizAnswers[1] === opt.id
                          ? "bg-pitch-500 border-pitch-500 shadow-[inset_0_0_0_3px_#020617]"
                          : "border-dark-600"
                          }`}
                      />
                      <span className="text-sm text-dark-300 font-light">
                        {opt.text}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => nextQuizStep(1)}
                  id="btn-1"
                  disabled={!quizAnswers[1]}
                  className={`cta-btn rounded-xl px-8 py-3.5 text-sm font-semibold text-white flex items-center gap-2 ${quizAnswers[1] ? "" : "opacity-40 cursor-not-allowed"
                    }`}
                >
                  <span>Continuer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {quizStep === 2 && !quizResult && (
              <div id="quiz-step-2" className="quiz-step">
                <h3 className="text-base font-bold mb-5 text-dark-200">
                  Pendant le match, depuis les tribunes, vous...
                </h3>
                <div className="space-y-2.5 mb-6">
                  {[
                    { id: "a", text: "Encouragez chaleureusement, sans critique" },
                    { id: "b", text: "Donnez des conseils tactiques en criant" },
                    { id: "c", text: "Commentez ses erreurs en direct depuis les gradins" },
                    { id: "d", text: "Regardez en silence, mais souffrez intérieurement" },
                  ].map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => selectQuizOption(2, opt.id)}
                      className={`quiz-option flex items-center gap-4 p-4 rounded-xl border border-white/[.06] bg-white/[.02] cursor-pointer transition-all ${quizAnswers[2] === opt.id ? "selected" : ""
                        }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 quiz-radio transition-all ${quizAnswers[2] === opt.id
                          ? "bg-pitch-500 border-pitch-500 shadow-[inset_0_0_0_3px_#020617]"
                          : "border-dark-600"
                          }`}
                      />
                      <span className="text-sm text-dark-300 font-light">
                        {opt.text}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => nextQuizStep(2)}
                  id="btn-2"
                  disabled={!quizAnswers[2]}
                  className={`cta-btn rounded-xl px-8 py-3.5 text-sm font-semibold text-white flex items-center gap-2 ${quizAnswers[2] ? "" : "opacity-40 cursor-not-allowed"
                    }`}
                >
                  <span>Continuer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 3 */}
            {quizStep === 3 && !quizResult && (
              <div id="quiz-step-3" className="quiz-step">
                <h3 className="text-base font-bold mb-5 text-dark-200">
                  Votre enfant vous parle-t-il spontanément de ses matchs ?
                </h3>
                <div className="space-y-2.5 mb-6">
                  {[
                    { id: "a", text: "Oui, toujours — il adore en discuter" },
                    { id: "b", text: "Parfois, surtout après une victoire" },
                    { id: "c", text: "Rarement — il reste vague sur ce qui s'est passé" },
                    { id: "d", text: "Presque jamais — il se ferme complètement" },
                  ].map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => selectQuizOption(3, opt.id)}
                      className={`quiz-option flex items-center gap-4 p-4 rounded-xl border border-white/[.06] bg-white/[.02] cursor-pointer transition-all ${quizAnswers[3] === opt.id ? "selected" : ""
                        }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 quiz-radio transition-all ${quizAnswers[3] === opt.id
                          ? "bg-pitch-500 border-pitch-500 shadow-[inset_0_0_0_3px_#020617]"
                          : "border-dark-600"
                          }`}
                      />
                      <span className="text-sm text-dark-300 font-light">
                        {opt.text}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={showQuizResult}
                  id="btn-3"
                  disabled={!quizAnswers[3]}
                  className={`cta-btn rounded-xl px-8 py-3.5 text-sm font-semibold text-white flex items-center gap-2 ${quizAnswers[3] ? "" : "opacity-40 cursor-not-allowed"
                    }`}
                >
                  <span>Voir mon résultat</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* RESULT */}
            {quizResult && (
              <div id="quiz-result" className="quiz-step">
                <div className="text-center mb-8">
                  <div
                    id="result-badge"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-sm font-semibold ${quizResult.badgeClass}`}
                  >
                    {quizResult.profile}
                  </div>
                  <h3 id="result-title" className="text-2xl font-bold text-dark-100 mb-3">
                    Votre profil : {quizResult.profile}
                  </h3>
                  <p
                    id="result-desc"
                    className="text-sm text-dark-400 leading-relaxed max-w-md mx-auto font-light"
                  >
                    {quizResult.desc}
                  </p>
                </div>
                <div className="glass rounded-2xl p-6">
                  <p className="text-sm font-bold text-dark-200 mb-1">
                    Recevez votre plan personnalisé :
                  </p>
                  <p className="text-xs text-dark-500 mb-4 font-light">
                    Un programme sur mesure basé sur votre profil — avec les
                    modules prioritaires pour vous.
                  </p>
                  {!quizFormSubmitted ? (
                    <div id="quiz-form-block">
                      <form onSubmit={(e) => handleEmailForm(e, "quiz")}>
                        <div className="flex flex-col sm:flex-row gap-3 mb-2">
                          <input
                            type="email"
                            placeholder="votre@email.com"
                            required
                            className="email-input flex-1 rounded-xl px-4 py-3.5 text-sm"
                          />
                          <button
                            type="submit"
                            className="cta-btn rounded-xl px-6 py-3.5 text-sm font-semibold text-white flex items-center justify-center gap-2 whitespace-nowrap"
                          >
                            <span>Recevoir mon plan</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-dark-600 flex items-center justify-center gap-3">
                          <span className="flex items-center gap-1">
                            <Lock className="w-3 h-3 text-pitch-500" />
                            100% gratuit
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-pitch-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Aucun spam
                          </span>
                        </p>
                      </form>
                    </div>
                  ) : (
                    <div
                      id="quiz-form-success"
                      className="flex flex-col items-center gap-3 py-4"
                    >
                      <CheckCircle className="w-8 h-8 text-pitch-400" />
                      <div className="text-center">
                        <p className="text-sm font-bold text-dark-200">
                          Plan personnalisé envoyé !
                        </p>
                        <p className="text-xs text-dark-500 mt-1 font-light">
                          Vérifiez votre boîte mail dans 2 minutes.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="green-line max-w-4xl mx-auto" />

      {/* WHY FREE */}
      <section className="relative py-28 sm:py-36 overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-pitch-500/15 bottom-0 left-1/4" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-reveal-id="why-free"
            className={`glass rounded-2xl p-8 sm:p-12 transition-all duration-700 ${isRevealed("why-free") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
              }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pitch-500/10 mb-6">
                  <Unlock className="w-7 h-7 text-pitch-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug mb-5">
                  <span className="text-dark-200">Notre engagement :</span>
                  <br />
                  <span className="text-gradient-green">gratuit pour toujours.</span>
                </h2>
                <p className="text-sm text-dark-400 leading-relaxed mb-4 font-light">
                  L'infrastructure est là — le modèle aurait pu être payant. Mais
                  le burn-out parental dans le football est une urgence. Nous
                  avons choisi d'ouvrir l'accès à tous.
                </p>
                <p className="text-sm text-dark-500 leading-relaxed font-light">
                  Des options premium arriveront pour aller plus loin. Votre accès
                  aux 7 modules reste gratuit, sans limite de temps. Jamais de
                  surprise.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { title: "7 modules complets", desc: "Accès illimité à l'intégralité du programme" },
                  { title: "Diagnostic parental inclus", desc: "Identifiez votre profil et vos axes prioritaires" },
                  { title: "Aucune carte bancaire requise", desc: "Jamais. Ni maintenant, ni plus tard pour les fonctionnalités de base" },
                  { title: "Suivi de performance intégré", desc: "Carte joueur, statistiques et check-in émotionnel à chaque match" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/[.02] border border-white/[.04]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-pitch-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-pitch-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-dark-200">{item.title}</p>
                      <p className="text-xs text-dark-500 mt-0.5 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="green-line max-w-4xl mx-auto" />

      {/* FAQ */}
      <section id="faq" className="relative py-28 sm:py-36 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              data-reveal-id="faq-title"
              className="text-xs font-semibold tracking-widest uppercase text-pitch-500/80 mb-4 block transition-all duration-700"
            >
              FAQ
            </span>
            <h2
              data-reveal-id="faq-headline"
              className={`text-3xl sm:text-4xl font-bold tracking-tight transition-all duration-700 delay-100 ${isRevealed("faq-headline") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
                }`}
            >
              <span className="text-dark-200">Questions</span>
              <span className="text-gradient-green"> fréquentes</span>
            </h2>
          </div>
          <div
            data-reveal-id="faq-items"
            className={`space-y-0 transition-all duration-700 delay-200 ${isRevealed("faq-items") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
              }`}
          >
            {[
              {
                q: "Est-ce adapté aux parents de U6 ?",
                a: "Absolument. Le module M4 est dédié aux spécificités par tranche d'âge de U6 à U18. Ce qu'un parent de U6 doit savoir est fondamentalement différent d'un parent de U16. Chaque âge a son propre protocole.",
              },
              {
                q: "Mon enfant veut arrêter le foot. C'est trop tard ?",
                a: "Non. Le module M3 est conçu exactement pour cette situation. Vous y trouverez des protocoles pour désamorcer la crise et comprendre la vraie source du problème. Dans la plupart des cas, l'envie d'arrêter vient de la pression relationnelle — pas du football lui-même.",
              },
              {
                q: "Vais-je devoir payer un jour ?",
                a: "L'accès aux 7 modules et au diagnostic reste gratuit sans limite de temps. Des fonctionnalités premium pourront être proposées à l'avenir, mais votre accès de base ne sera jamais facturé. Aucune carte bancaire requise pour s'inscrire, ni maintenant, ni après.",
              },
              {
                q: "Combien de temps faut-il pour suivre les modules ?",
                a: "Chaque module est conçu pour être suivi en 15 à 20 minutes. Le programme complet représente environ 2h30. Mais l'idée n'est pas de tout faire d'une traite : c'est d'appliquer chaque module au bon moment de la saison de votre enfant.",
              },
              {
                q: "Je ne connais pas grand chose au football. C'est pour moi ?",
                a: "Ballio ne vous demande aucune connaissance footballistique. C'est justement le point : vous n'avez pas besoin de comprendre le football pour être un excellent parent de footballeur. La plateforme parle de relation, d'émotion et de comportement — pas de tactique ou de technique.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                onClick={() => toggleFaq(index)}
                className="faq-item py-6 cursor-pointer border-b border-white/[.06]"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-semibold text-dark-200">{faq.q}</h3>
                  <div
                    className={`faq-icon flex-shrink-0 w-8 h-8 rounded-lg bg-white/[.03] border border-white/[.06] flex items-center justify-center transition-transform ${openFaq === index ? "rotate-45" : ""
                      }`}
                  >
                    <Plus className="w-4 h-4 text-dark-400" />
                  </div>
                </div>
                <div
                  className={`faq-answer overflow-hidden transition-all duration-300 ${openFaq === index ? "max-h-[220px] pt-4" : "max-h-0"
                    }`}
                >
                  <p className="text-sm text-dark-400 leading-relaxed font-light">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="green-line max-w-4xl mx-auto" />

      {/* FINAL CTA */}
      <section className="relative py-28 sm:py-36 overflow-hidden">
        <div className="glow-orb w-[800px] h-[400px] bg-pitch-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2
            data-reveal-id="final-cta-headline"
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6 transition-all duration-700 ${isRevealed("final-cta-headline") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
              }`}
          >
            <span className="text-dark-200">Votre enfant ne se souviendra pas</span>
            <br />
            <span className="text-dark-200">de ses buts.</span>
            <br />
            <span className="text-gradient-green">Il se souviendra de vous.</span>
          </h2>
          <p
            data-reveal-id="final-cta-subtitle"
            className={`text-base text-dark-500 mb-10 max-w-lg mx-auto leading-relaxed transition-all duration-700 delay-100 font-light`}
          >
            Faites le premier pas aujourd'hui. L'accès aux 7 modules de formation et aux outils de suivi de performance est 100% gratuit.
          </p>
          <div
            data-reveal-id="final-cta-form"
            className={`max-w-lg mx-auto transition-all duration-700 delay-200 flex flex-col items-center gap-6 ${isRevealed("final-cta-form") ? "opacity-100 translate-y-0" : "max-sm:opacity-100 max-sm:translate-y-0 max-sm:translate-x-0 max-sm:scale-100 opacity-0 translate-y-8"
              }`}
          >
            {/* Dashboard Button */}
            <a
              href="/sign-in"
              className="cta-btn rounded-xl px-10 py-5 text-lg font-semibold text-white flex items-center justify-center gap-3 w-full max-w-sm shadow-xl shadow-pitch-500/20"
            >
              <span>Connexion au Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <p className="text-xs text-dark-600 flex items-center justify-center gap-4 flex-wrap mt-3">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-pitch-500" />
                100% gratuit
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-pitch-500" />
                Aucune carte bancaire
              </span>
              <span className="flex items-center gap-1.5">
                <XCircle className="w-3 h-3 text-pitch-500" />
                Zéro engagement
              </span>
            </p>

            <div className="w-full flex items-center gap-4 my-4 opacity-60">
              <div className="flex-1 h-px bg-white/[.08]"></div>
              <span className="text-[10px] text-dark-500 font-bold tracking-widest uppercase">OU</span>
              <div className="flex-1 h-px bg-white/[.08]"></div>
            </div>

            {/* Email Form for Lead Magnet */}
            <div className="w-full">
              {!finalFormSubmitted ? (
                <div id="final-form-block">
                  <div className="text-center mb-5">
                    <p className="text-sm sm:text-base font-bold text-pitch-300 mb-2 font-syne">
                      Pas encore prêt ? Lisez le "Protocole Silence" (PDF Gratuit)
                    </p>
                    <p className="text-xs sm:text-sm text-dark-300 font-light leading-relaxed">
                      Le guide d'urgence à lire avant votre prochain match pour désamorcer la pression parentale. <strong className="text-white font-medium">Déjà {liveCounter.toLocaleString("fr-FR").replace(/,/g, " ")} téléchargements.</strong> Recevez-le directement par email.
                    </p>
                  </div>
                  <form onSubmit={(e) => handleEmailForm(e, "final")}>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        placeholder="votre@email.com"
                        required
                        className="email-input flex-1 rounded-xl px-5 py-4 text-base"
                      />
                      <button
                        type="submit"
                        className="rounded-xl px-7 py-4 text-base font-semibold text-dark-900 bg-pitch-500 hover:bg-pitch-400 flex items-center justify-center gap-2.5 whitespace-nowrap transition-colors shadow-lg shadow-pitch-500/20"
                      >
                        <span>Recevoir le PDF</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div
                  id="final-success"
                  className="hero-success flex-col items-center gap-4 py-6 flex"
                >
                  <div className="w-14 h-14 rounded-2xl bg-pitch-500/20 flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-pitch-400" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-dark-100 font-syne">
                      Demande enregistrée !
                    </p>
                    <p className="text-sm text-dark-400 mt-1 font-light block mb-3">
                      Vous allez recevoir le Protocole Silence par email.
                    </p>
                    <a href="/Le Protocole Silence Ballio.pdf" download className="text-pitch-400 text-sm font-medium hover:underline inline-flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" /> Télécharger directement le PDF
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[.04] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pitch-400 to-pitch-600 flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <span className="text-sm font-bold font-syne">Ballio</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-dark-500 hover:text-dark-300 transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-xs text-dark-500 hover:text-dark-300 transition-colors">
                Confidentialité
              </a>
              <a href="#" className="text-xs text-dark-500 hover:text-dark-300 transition-colors">
                Contact
              </a>
            </div>
            <p className="text-xs text-dark-600">
              © 2025 Ballio. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>

      {/* Global styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap");

        :root {
          --font-syne: "Syne", sans-serif;
          --font-dm: "DM Sans", sans-serif;
        }

        .font-syne {
          font-family: var(--font-syne);
        }
        .font-dm {
          font-family: var(--font-dm);
        }

        html {
          scroll-behavior: smooth;
        }

        /* NET BG */
        .net-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background: linear-gradient(
              to right,
              rgba(34, 197, 94, 0.12) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(34, 197, 94, 0.12) 1px,
              transparent 1px
            ),
            linear-gradient(
              45deg,
              rgba(34, 197, 94, 0.04) 1px,
              transparent 1px
            ),
            linear-gradient(
              -45deg,
              rgba(34, 197, 94, 0.04) 1px,
              transparent 1px
            );
          background-size: 48px 48px, 48px 48px, 48px 48px, 48px 48px;
          transform: perspective(800px) rotateX(15deg) scale(1.3);
          transform-origin: center 30%;
          mask-image: radial-gradient(
            ellipse 80% 70% at 50% 40%,
            black 20%,
            transparent 70%
          );
          -webkit-mask-image: radial-gradient(
            ellipse 80% 70% at 50% 40%,
            black 20%,
            transparent 70%
          );
          animation: netFloat 12s ease-in-out infinite;
        }

        @keyframes netFloat {
          0%,
          100% {
            transform: perspective(800px) rotateX(15deg) scale(1.3)
              translateY(0);
          }
          50% {
            transform: perspective(800px) rotateX(15deg) scale(1.3)
              translateY(-8px);
          }
        }

        /* UTILS */
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .glass-hover {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-hover:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(34, 197, 94, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 20px 60px -20px rgba(34, 197, 94, 0.15);
        }

        .spotlight-card {
          position: relative;
          overflow: hidden;
        }

        .spotlight-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(
            600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(34, 197, 94, 0.06),
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
        }

        .spotlight-card:hover::before {
          opacity: 1;
        }

        /* BUTTONS */
        .cta-btn {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .cta-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #4ade80, #22c55e);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .cta-btn:hover::before {
          opacity: 1;
        }

        .cta-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 0 60px -15px rgba(34, 197, 94, 0.5);
        }

        .cta-btn * {
          position: relative;
          z-index: 1;
        }

        /* EMAIL INPUT */
        .email-input {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #f8fafc;
          transition: all 0.3s;
          font-family: var(--font-dm);
        }

        .email-input:focus {
          outline: none;
          border-color: rgba(34, 197, 94, 0.5);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
        }

        .email-input::placeholder {
          color: rgba(148, 163, 184, 0.45);
        }

        /* MISC */
        .green-line {
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(34, 197, 94, 0.4),
            transparent
          );
        }

        .pulse-green {
          animation: pulseGreen 2s ease-in-out infinite;
        }

        @keyframes pulseGreen {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
          }
        }

        .text-gradient-green {
          background: linear-gradient(135deg, #4ade80, #22c55e, #16a34a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-fc {
          background: linear-gradient(
            145deg,
            #0a2e1a 0%,
            #0c1a12 40%,
            #0f172a 100%
          );
          border: 1px solid rgba(34, 197, 94, 0.15);
        }

        /* BENTO GRID */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .bento-1 {
          grid-column: span 2;
        }
        .bento-2 {
          grid-column: span 1;
        }
        .bento-3 {
          grid-column: span 1;
        }
        .bento-4 {
          grid-column: span 1;
          grid-row: span 2;
        }
        .bento-5 {
          grid-column: span 2;
        }
        .bento-6 {
          grid-column: span 1;
        }
        .bento-7 {
          grid-column: span 1;
        }

        @media (max-width: 1023px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .bento-grid > div {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
          .bento-1,
          .bento-5 {
            grid-column: span 2 !important;
          }
        }

        @media (max-width: 639px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
          .bento-grid > div {
            grid-column: span 1 !important;
          }
        }

        /* ANNOUNCEMENT */
        .announcement {
          background: linear-gradient(
            90deg,
            rgba(34, 197, 94, 0.12),
            rgba(34, 197, 94, 0.07),
            rgba(34, 197, 94, 0.12)
          );
          border-bottom: 1px solid rgba(34, 197, 94, 0.18);
        }

        /* PARTICLES */
        .particle {
          position: absolute;
          background: rgba(34, 197, 94, 0.25);
          border-radius: 50%;
          animation: floatParticle linear infinite;
        }

        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(30px);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
