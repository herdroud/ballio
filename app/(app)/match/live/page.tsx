"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Play,
  Pause,
  RotateCcw,
  History,
  ArrowLeft,
  Timer,
  Flag
} from 'lucide-react';
import { calcMatchNote, calculateTier, getTierLabel } from '@/app/lib/stats';
import { MatchConfig, MatchEvent } from '@/app/types/match';
import { getChildProfile, saveMatch } from '@/app/actions/child';
import { useRouter } from 'next/navigation';

// --- Types & Constants ---
type MatchState = 'setup' | 'live' | 'summary';

const POSITIONS = [
  { id: 'GB', label: 'Gardien', icon: '🧤' },
  { id: 'DC', label: 'Déf. central', icon: '🛡️' },
  { id: 'LAT', label: 'Latéral', icon: '🏃' },
  { id: 'MDC', label: 'Mil. défensif', icon: '⚓' },
  { id: 'MC', label: 'Mil. central', icon: '⚙️' },
  { id: 'MOC', label: 'Mil. offensif', icon: '🪄' },
  { id: 'AIL', label: 'Ailier', icon: '⚡' },
  { id: 'ATT', label: 'Attaquant', icon: '⚽' },
];

const EVENT_CATEGORIES = {
  off: {
    label: 'Offensif',
    colorCls: 'text-loo-green-500',
    bgCls: 'bg-loo-green-100',
    borderCls: 'border-loo-green-400/40',
    activeCls: 'bg-loo-green-500',
    actions: [
      { id: 'But', label: 'But', icon: '⚽', key: true },
      { id: 'Pdec', label: 'Passe déc.', icon: '🎯', key: true },
      { id: 'Pok', label: 'Passe ✓', icon: '✅' },
      { id: 'Pko', label: 'Passe ✗', icon: '🚫' },
      { id: 'Tca', label: 'Tir cadré', icon: '🎳' },
      { id: 'Tho', label: 'Tir hors', icon: '🏹' },
      { id: 'Dok', label: 'Dribble ✓', icon: '🔀' },
      { id: 'Dko', label: 'Dribble ✗', icon: '❌' },
      { id: 'Cok', label: 'Centre ✓', icon: '🌀' },
      { id: 'Cko', label: 'Centre ✗', icon: '💨' },
    ]
  },
  def: {
    label: 'Défensif',
    colorCls: 'text-blue-600',
    bgCls: 'bg-blue-50',
    borderCls: 'border-blue-200',
    activeCls: 'bg-blue-500',
    actions: [
      { id: 'Tok', label: 'Tacle ✓', icon: '🦵' },
      { id: 'Tko', label: 'Tacle ✗', icon: '💨' },
      { id: 'Int', label: 'Interception', icon: '✋', wide: true },
      { id: 'Blc', label: 'Contre', icon: '🧱', wide: true },
      { id: 'Dul_ok', label: 'Duel ✓', icon: '💪' },
      { id: 'Dul_ko', label: 'Duel ✗', icon: '😤' },
    ]
  },
  dis: {
    label: 'Discipline',
    colorCls: 'text-amber-600',
    bgCls: 'bg-amber-50',
    borderCls: 'border-amber-200',
    activeCls: 'bg-amber-500',
    actions: [
      { id: 'cj', label: 'Carton jaune', icon: '🟨', wide: true },
      { id: 'cr', label: 'Carton rouge', icon: '🟥', wide: true },
      { id: 'fco', label: 'Faute comm.', icon: '🤛' },
      { id: 'fsu', label: 'Faute subie', icon: '🩹' },
      { id: 'hl', label: 'Hors-jeu', icon: '🚩' },
      { id: 'rem', label: 'Remplaç.', icon: '🔄' },
    ]
  }
};

export default function MatchLivePage() {
  const [state, setState] = useState<MatchState>('setup');
  const [config, setConfig] = useState<MatchConfig>({
    id: '', team: '', opponent: '', competition: '', date: new Date().toISOString().split('T')[0], type: 'Championnat', position: '', status: 'tit'
  });
  const [events, setEvents] = useState<MatchEvent[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [half, setHalf] = useState(1);
  const [onField, setOnField] = useState(true);
  const [intervals, setIntervals] = useState([{ in: 0, out: null as number | null }]);
  const [showLog, setShowLog] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [child, setChild] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      const profile = await getChildProfile();
      if (profile) {
        setChild(profile);
        setConfig(prev => ({
          ...prev,
          team: profile.club_name,
          position: profile.position
        }));
      }
    }
    loadProfile();
  }, []);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRunning]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddEvent = (cat: keyof typeof EVENT_CATEGORIES, action: any) => {
    const newEvent: MatchEvent = {
      id: Date.now().toString(),
      cat,
      short: action.id,
      label: action.label,
      time: formatTime(elapsed),
      elapsed,
      half
    };
    setEvents(prev => [newEvent, ...prev]);
    if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate(25);
  };

  const undoLast = () => {
    setEvents(prev => prev.slice(1));
  };

  const toggleSubstitution = () => {
    if (onField) {
      const last = [...intervals];
      if (last.length > 0) last[last.length - 1].out = elapsed;
      setIntervals(last);
      setOnField(false);
    } else {
      setIntervals(prev => [...prev, { in: elapsed, out: null }]);
      setOnField(true);
    }
  };

  const calculateFinalStats = () => {
    const counts: any = { off: {}, def: {}, dis: {} };
    events.forEach(e => {
      counts[e.cat][e.short] = (counts[e.cat][e.short] || 0) + 1;
    });

    const mappedStats = {
      off: {
        buts: counts.off['But'] || 0,
        pdec: counts.off['Pdec'] || 0,
        pok: counts.off['Pok'] || 0,
        pko: counts.off['Pko'] || 0,
        tca: counts.off['Tca'] || 0,
        tho: counts.off['Tho'] || 0,
        dok: counts.off['Dok'] || 0,
        dko: counts.off['Dko'] || 0,
        cok: counts.off['Cok'] || 0,
        cko: counts.off['Cko'] || 0,
      },
      def: {
        tok: counts.def['Tok'] || 0,
        tko: counts.def['Tko'] || 0,
        int: counts.def['Int'] || 0,
        contre: counts.def['Blc'] || 0,
        dok: counts.def['Dul_ok'] || 0,
        dko: counts.def['Dul_ko'] || 0,
      },
      dis: {
        cj: counts.dis['cj'] || 0,
        cr: counts.dis['cr'] || 0,
        fco: counts.dis['fco'] || 0,
        fsu: counts.dis['fsu'] || 0,
      }
    };

    let activeTime = 0;
    intervals.forEach(iv => {
      activeTime += (iv.out !== null ? iv.out : elapsed) - iv.in;
    });

    return {
      stats: mappedStats,
      activeTime,
      totalTime: elapsed,
      note: calcMatchNote(mappedStats, config.position, activeTime, elapsed)
    };
  };

  // --- State for Summary ---
  const [matchScore, setMatchScore] = useState('');
  const [matchResult, setMatchResult] = useState<'victoire' | 'défaite' | 'nul' | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!child) return;
    setIsSaving(true);
    const { note, activeTime } = calculateFinalStats();
    try {
      const result = await saveMatch({
        child_id: child.id,
        opponent: config.opponent,
        competition: config.competition,
        date: config.date,
        minutesPlayed: Math.round(activeTime / 60),
        score: matchScore,
        result: matchResult || 'nul',
        metrics: {
          ovr: note.ovr,
          tir: note.TIR,
          pas: note.PAS,
          dri: note.DRI,
          def: note.DEF,
          phy: note.PHY,
          disc: note.DISC,
        },
        events: events // Pass the raw events array
      });
      if (result.success) {
        router.push('/dashboard');
      } else {
        alert(result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors de la sauvegarde.");
    } finally {
      setIsSaving(false);
    }
  };

  const { stats, activeTime, totalTime, note } = (state === 'summary') ? calculateFinalStats() : { stats: null, activeTime: 0, totalTime: 0, note: { ovr: 0, tier: '', TIR: 0, PAS: 0, DRI: 0, DEF: 0, PHY: 0, DISC: 0 } };
  const tier = note?.tier;

  return (
    <div className="pb-6">
      {/* ─── Setup Screen ─────────────────────────────────────────────────────────── */}
      {state === 'setup' && (
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
              ⚽ Suivi Match <span className="text-loo-green-500">Live</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">Configurez le match avant de démarrer le suivi</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
            <div className="grid grid-cols-1 min-[500px]:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Notre Équipe</label>
                <input
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-gray-800 focus:border-loo-green-400 focus:ring-2 focus:ring-loo-green-400/20 outline-none transition-all text-sm font-medium"
                  placeholder="Ex: AS Lyon"
                  value={config.team}
                  onChange={e => setConfig({ ...config, team: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Adversaire</label>
                <input
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-gray-800 focus:border-loo-green-400 focus:ring-2 focus:ring-loo-green-400/20 outline-none transition-all text-sm font-medium"
                  placeholder="Ex: FC Marseille"
                  value={config.opponent}
                  onChange={e => setConfig({ ...config, opponent: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Compétition</label>
                <input
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-gray-800 focus:border-loo-green-400 focus:ring-2 focus:ring-loo-green-400/20 outline-none transition-all text-sm font-medium"
                  placeholder="Ex: Championnat U13"
                  value={config.competition}
                  onChange={e => setConfig({ ...config, competition: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Date</label>
                <input
                  type="date"
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-gray-800 focus:border-loo-green-400 focus:ring-2 focus:ring-loo-green-400/20 outline-none transition-all text-sm font-medium"
                  value={config.date}
                  onChange={e => setConfig({ ...config, date: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase text-gray-400 tracking-wider block">Poste du joueur</label>
              <div className="grid grid-cols-4 min-[500px]:grid-cols-8 gap-2">
                {POSITIONS.map(pos => (
                  <button
                    key={pos.id}
                    onClick={() => setConfig({ ...config, position: pos.id })}
                    className={`p-2.5 rounded-xl border transition-all text-center ${config.position === pos.id
                      ? 'border-loo-green-400 bg-loo-green-100 text-loo-green-700 shadow-sm'
                      : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
                      }`}
                  >
                    <div className="text-lg">{pos.icon}</div>
                    <div className="text-[10px] font-bold uppercase mt-0.5">{pos.id}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase text-gray-400 tracking-wider block">Statut de départ</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setConfig({ ...config, status: 'tit' })}
                  className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${config.status === 'tit'
                    ? 'border-loo-green-400 bg-loo-green-100 text-loo-green-700'
                    : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
                    }`}
                >
                  <span className="text-xl">🟢</span>
                  <span className="text-sm font-bold uppercase">Titulaire</span>
                </button>
                <button
                  onClick={() => setConfig({ ...config, status: 'rem' })}
                  className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${config.status === 'rem'
                    ? 'border-blue-400 bg-blue-50 text-blue-600'
                    : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
                    }`}
                >
                  <span className="text-xl">🔄</span>
                  <span className="text-sm font-bold uppercase">Remplaçant</span>
                </button>
              </div>
            </div>
          </div>

          <button
            disabled={!config.position}
            onClick={() => {
              setState('live');
              if (config.status === 'tit') setOnField(true);
              else setOnField(false);
            }}
            className="w-full py-4 bg-loo-green-500 hover:bg-loo-green-600 text-white font-extrabold uppercase rounded-2xl text-base transition-all shadow-lg shadow-loo-green-500/25 disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed active:scale-[0.98]"
          >
            🏁 Démarrer le match
          </button>
        </div>
      )}

      {/* ─── Live Screen ───────────────────────────────────────────────────────────── */}
      {state === 'live' && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="bg-loo-green-900 rounded-2xl p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-loo-green-400/20 border border-loo-green-400/50 flex items-center justify-center text-loo-green-400 font-bold text-lg">⚽</div>
              <div>
                <div className="font-bold text-sm leading-tight">{config.team} <span className="text-white/40">vs</span> {config.opponent}</div>
                <div className="text-[11px] text-white/50 uppercase font-bold tracking-wide">{config.position} · {config.competition}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${onField ? 'bg-loo-green-400/20 text-loo-green-400 border-loo-green-400/50' : 'bg-white/10 text-white/40 border-white/20'
                }`}>
                {onField ? '🟢 En Jeu' : '⏸ Banc'}
              </span>
              <button onClick={() => setState('setup')} className="p-2 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 transition-colors">
                <ArrowLeft size={16} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {!onField && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-center justify-between overflow-hidden"
              >
                <span className="text-sm font-bold text-blue-600">🔄 Remplaçant — pas encore entré en jeu</span>
                <button
                  onClick={toggleSubstitution}
                  className="bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase hover:bg-blue-600 transition-colors"
                >
                  Entrer en jeu
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex items-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 flex items-center justify-center gap-3 p-3 rounded-xl border-2 transition-all ${isRunning
                ? 'border-loo-green-400 bg-loo-green-50 text-loo-green-700'
                : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
                }`}
            >
              {isRunning ? <Pause size={18} /> : <Play size={18} />}
              <span className="text-2xl font-mono font-black">{formatTime(elapsed)}</span>
              <span className="text-xs font-bold uppercase opacity-60">{isRunning ? 'Pause' : 'Démarrer'}</span>
            </button>
            <button
              onClick={() => { setHalf(half === 1 ? 2 : 1); setIsRunning(false); }}
              className="px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 hover:bg-gray-200 text-xs font-bold uppercase text-gray-600 transition-colors whitespace-nowrap"
            >
              Mi-temps {half}
            </button>
            <button
              onClick={() => setState('summary')}
              className="px-4 py-3 rounded-xl bg-loo-green-500 hover:bg-loo-green-600 text-white font-black uppercase text-xs transition-colors whitespace-nowrap shadow-sm"
            >
              Fin 🏁
            </button>
          </div>

          <div className="space-y-4">
            {Object.entries(EVENT_CATEGORIES).map(([catId, cat]) => (
              <div key={catId} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[11px] font-black uppercase tracking-widest ${cat.colorCls}`}>{cat.label}</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
                <div className="grid grid-cols-2 min-[500px]:grid-cols-3 gap-2">
                  {cat.actions.map(action => (
                    <button
                      key={action.id}
                      onClick={() => handleAddEvent(catId as any, action)}
                      className={`relative group p-3 rounded-xl border transition-all active:scale-95 hover:shadow-sm ${(action as any).wide ? 'col-span-2 min-[500px]:col-span-3' : ''
                        } ${cat.bgCls} ${cat.borderCls} flex items-center gap-2.5`}
                    >
                      <span className="text-xl shrink-0">{action.icon}</span>
                      <span className="text-sm font-bold text-gray-700">{action.label}</span>
                      {events.filter(e => e.short === action.id).length > 0 && (
                        <span className={`ml-auto text-xs font-black text-white ${cat.activeCls} px-2 py-0.5 rounded-full`}>
                          {events.filter(e => e.short === action.id).length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="sticky bottom-4 flex gap-3 items-center">
            <button
              onClick={() => setShowLog(!showLog)}
              className="flex-1 p-3.5 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <History size={16} className="text-gray-400" />
              <span className="text-sm font-bold text-gray-600">Journal ({events.length})</span>
            </button>
            <button
              onClick={undoLast}
              disabled={events.length === 0}
              className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors disabled:opacity-40"
            >
              <RotateCcw size={18} />
            </button>
            <button
              onClick={toggleSubstitution}
              className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors"
            >
              <div className="text-lg">🔄</div>
            </button>
          </div>

          <AnimatePresence>
            {showLog && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 space-y-2"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-gray-700">Journal d'événements</span>
                  <button onClick={() => setShowLog(false)} className="text-xs text-gray-400 hover:text-gray-600">Fermer</button>
                </div>
                {events.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">Aucun événement enregistré</p>
                )}
                {events.map(ev => {
                  const cat = (EVENT_CATEGORIES as any)[ev.cat];
                  return (
                    <div key={ev.id} className={`flex items-center gap-3 p-2.5 rounded-lg ${cat.bgCls} border ${cat.borderCls}`}>
                      <span className="font-mono text-xs text-gray-500 w-10 shrink-0">{ev.time}</span>
                      <span className={`text-[10px] font-black uppercase ${cat.colorCls}`}>{cat.label}</span>
                      <span className="text-sm font-bold text-gray-700">{ev.label}</span>
                      <span className="ml-auto text-xs text-gray-400">MT{ev.half}</span>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ─── Summary Screen ────────────────────────────────────────────────────────── */}
      {state === 'summary' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <button onClick={() => setState('live')} className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-xl font-extrabold text-gray-800">Résumé du Match</h1>
            <div className="w-10" />
          </div>

          {/* Match info */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
            <div className="text-center">
              <div className="text-sm text-gray-500 font-medium">{config.team} <span className="text-gray-300 mx-1">vs</span> {config.opponent}</div>
              <div className="text-xs text-gray-400 mt-0.5">{config.competition} · {config.date}</div>
            </div>
          </div>

          {/* Result Section */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
            <div className="grid grid-cols-1 min-[500px]:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Score Final</label>
                <input
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-center text-xl font-black text-gray-800 focus:border-loo-green-400 outline-none transition-all"
                  placeholder="ex: 2-1"
                  value={matchScore}
                  onChange={e => setMatchScore(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Résultat</label>
                <div className="flex gap-2">
                  {[
                    { id: 'victoire', label: 'V', color: 'bg-loo-green-500' },
                    { id: 'nul', label: 'N', color: 'bg-gray-400' },
                    { id: 'défaite', label: 'D', color: 'bg-red-500' },
                  ].map(res => (
                    <button
                      key={res.id}
                      onClick={() => setMatchResult(res.id as any)}
                      className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${matchResult === res.id ? `${res.color} text-white scale-105 shadow-md` : 'bg-gray-100 text-gray-400'}`}
                    >
                      {res.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Time stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 text-center">
              <div className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Temps de jeu</div>
              <div className="text-3xl font-mono font-black text-gray-800">{formatTime(activeTime)}</div>
              <div className="text-xs text-gray-400 mt-1">sur {formatTime(totalTime)} de match</div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 text-center">
              <div className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Événements</div>
              <div className="text-3xl font-mono font-black text-gray-800">{events.length}</div>
              <div className="text-xs text-gray-400 mt-1">actions enregistrées</div>
            </div>
          </div>

          {/* FC-style rating card */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-xs font-bold uppercase text-gray-400 tracking-widest">Note Finale du Joueur</div>
            <div className={`w-full max-w-sm p-6 rounded-3xl border-2 shadow-xl ${tier === 'legend' ? 'border-loo-green-400 bg-gradient-to-br from-loo-green-900 to-loo-green-800 text-white' :
              tier === 'epic' ? 'border-purple-400 bg-gradient-to-br from-purple-900 to-purple-800 text-white' :
                tier === 'rare' ? 'border-amber-400 bg-gradient-to-br from-amber-800 to-amber-900 text-white' :
                  'border-gray-300 bg-gradient-to-br from-gray-800 to-gray-900 text-white'
              }`}>
              <div className="text-center mb-5">
                <div className="text-6xl font-black italic">{note.ovr}</div>
                <div className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-black uppercase border ${tier === 'legend' ? 'bg-loo-green-400/20 border-loo-green-400/50 text-loo-green-300' :
                  tier === 'epic' ? 'bg-purple-400/20 border-purple-400/50 text-purple-300' :
                    'bg-white/10 border-white/20 text-white/70'
                  }`}>
                  {getTierLabel(tier)}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'TIR', val: note.TIR },
                  { key: 'PAS', val: note.PAS },
                  { key: 'DRI', val: note.DRI },
                  { key: 'DEF', val: note.DEF },
                  { key: 'PHY', val: note.PHY },
                  { key: 'DISC', val: note.DISC },
                ].map(({ key, val }) => (
                  <div key={key} className="flex flex-col items-center p-2.5 rounded-xl bg-white/10 border border-white/10">
                    <span className="text-[10px] uppercase text-white/50 font-bold">{key}</span>
                    <span className="text-xl font-black">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving || !child || !matchResult}
            className="w-full py-4 bg-loo-green-500 hover:bg-loo-green-600 text-white font-extrabold uppercase rounded-2xl text-base transition-all shadow-lg shadow-loo-green-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sauvegarde...
              </>
            ) : (
              '✅ Enregistrer et Terminer'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
