export type MatchTier = 'common' | 'uncommon' | 'rare' | 'epic' | 'legend';

export interface MatchEvent {
    id: string;
    cat: 'off' | 'def' | 'dis';
    short: string;
    label: string;
    time: string;
    elapsed: number;
    half: number;
}

export interface MatchConfig {
    id: string;
    team: string;
    opponent: string;
    competition: string;
    date: string;
    type: string;
    position: string;
    status: 'tit' | 'rem';
}

export interface PlayerStats {
    ovr: number;
    TIR: number;
    PAS: number;
    DRI: number;
    DEF: number;
    PHY: number;
    DISC: number;
    tier: MatchTier;
}
