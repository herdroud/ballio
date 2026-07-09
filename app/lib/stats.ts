import { PlayerStats, MatchTier } from '@/app/types/match';

export function calculateTier(ovr: number): MatchTier {
    if (ovr >= 93) return 'legend';
    if (ovr >= 85) return 'epic';
    if (ovr >= 75) return 'rare';
    if (ovr >= 60) return 'uncommon';
    return 'common';
}

export function getTierLabel(tier: MatchTier) {
    const labels = {
        legend: 'Légendaire',
        epic: 'Épique',
        rare: 'Rare',
        uncommon: 'Peu commun',
        common: 'Commun',
    };
    return labels[tier];
}

// Compteurs d'actions agrégés d'un match (cf. EVENT_CATEGORIES de la page match live).
export interface MatchCounts {
    off: {
        buts: number;
        pdec: number;
        pok: number;
        pko: number;
        tca: number;
        tho: number;
        dok: number;
        dko: number;
        cok: number;
        cko: number;
    };
    def: {
        tok: number;
        tko: number;
        int: number;
        contre: number;
        dok: number;
        dko: number;
    };
    dis: {
        cj: number;
        cr: number;
        fco: number;
        fsu: number;
    };
}

export type Position = 'ATT' | 'AIL' | 'MOC' | 'MC' | 'MDC' | 'LAT' | 'DC' | 'GB';

type StatWeights = { TIR: number; PAS: number; DRI: number; DEF: number; PHY: number };

const POSITION_WEIGHTS: Record<Position, StatWeights> = {
    ATT: { TIR: 0.35, PAS: 0.25, DRI: 0.25, DEF: 0.05, PHY: 0.10 },
    AIL: { TIR: 0.25, PAS: 0.25, DRI: 0.30, DEF: 0.10, PHY: 0.10 },
    MOC: { TIR: 0.20, PAS: 0.35, DRI: 0.25, DEF: 0.10, PHY: 0.10 },
    MC: { TIR: 0.10, PAS: 0.35, DRI: 0.15, DEF: 0.25, PHY: 0.15 },
    MDC: { TIR: 0.05, PAS: 0.25, DRI: 0.10, DEF: 0.35, PHY: 0.25 },
    LAT: { TIR: 0.10, PAS: 0.25, DRI: 0.20, DEF: 0.25, PHY: 0.20 },
    DC: { TIR: 0.05, PAS: 0.20, DRI: 0.10, DEF: 0.40, PHY: 0.25 },
    GB: { TIR: 0.05, PAS: 0.25, DRI: 0.05, DEF: 0.45, PHY: 0.20 },
};

const GOAL_BONUS: Record<Position, number> = { ATT: 3, AIL: 3, MOC: 5, MC: 5, MDC: 7, LAT: 7, DC: 10, GB: 10 };
const ASSIST_BONUS: Record<Position, number> = { AIL: 2, MOC: 2, ATT: 3, MC: 3, LAT: 3, MDC: 5, DC: 5, GB: 5 };

function isKnownPosition(position: string): position is Position {
    return position in POSITION_WEIGHTS;
}

export function calcMatchNote(
    stats: MatchCounts,
    position: string,
    duration: number,
    totalDuration: number
): PlayerStats {
    const { off, def, dis } = stats;

    const flat = (val: number, bench: number) => Math.min(100, Math.round((val / bench) * 100));
    const pct = (ok: number, ko: number) => {
        const t = ok + ko;
        return t === 0 ? 50 : Math.round((ok / t) * 100);
    };

    const nBut = flat(off.buts, 3);
    const nPdec = flat(off.pdec, 2);
    const nInt = flat(def.int, 8);
    const nContre = flat(def.contre, 5);

    const sPasses = pct(off.pok, off.pko);
    const sTirs = pct(off.tca, off.tho);
    const sDribbles = pct(off.dok, off.dko);
    const sTacles = pct(def.tok, def.tko);
    const sDuels = pct(def.dok, def.dko);

    const TIR = Math.round(nBut * 0.5 + sTirs * 0.5);
    const PAS = Math.round(sPasses * 0.6 + nPdec * 0.4);
    const DRI = Math.round(sDribbles);
    const DEF = Math.round(sDuels * 0.35 + sTacles * 0.35 + nInt * 0.2 + nContre * 0.1);
    const PHY = Math.round(sDuels * 0.5 + sTacles * 0.5);
    const DISC = Math.max(0, 100 - dis.cj * 20 - dis.cr * 50 - Math.min(dis.fco, 5) * 4);

    const pos: Position = isKnownPosition(position) ? position : 'MC';
    const w = POSITION_WEIGHTS[pos];
    let ovr = Math.round(TIR * w.TIR + PAS * w.PAS + DRI * w.DRI + DEF * w.DEF + PHY * w.PHY);

    // Bonus poste
    if (off.buts > 0) {
        ovr += off.buts * GOAL_BONUS[pos];
    }
    if (off.pdec > 0) {
        ovr += off.pdec * ASSIST_BONUS[pos];
    }
    if ((pos === 'ATT' || pos === 'AIL') && sDuels > 60) ovr += 3;

    // Malus discipline
    if (dis.cj > 0) ovr -= dis.cj * 2;
    if (dis.cr > 0) ovr -= dis.cr * 5;

    // Malus fiabilité (faible temps de jeu → note moins représentative)
    const ratio = totalDuration > 0 ? duration / totalDuration : 1;
    if (ratio < 0.40) ovr = Math.round(ovr * 0.80);
    else if (ratio < 0.70) ovr = Math.round(ovr * 0.90);

    ovr = Math.max(1, Math.min(99, ovr));

    return {
        ovr,
        TIR,
        PAS,
        DRI,
        DEF,
        PHY,
        DISC,
        tier: calculateTier(ovr),
    };
}
