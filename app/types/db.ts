// Types des lignes de la base Supabase utilisées côté application.
// Référence : docs/supabase_schema.md

export interface ParentProfile {
    id: string;
    user_id: string;
    full_name: string | null;
    email: string | null;
    quiz_score: number | null;
    parent_profile: string | null;
    subscription_status: string | null;
    current_period_end: string | null;
    created_at: string;
    updated_at: string | null;
}

export interface Child {
    id: string;
    parent_id: string;
    first_name: string;
    last_name: string;
    birth_date: string | null;
    club_name: string | null;
    position: string | null;
    category: string | null;
    created_at: string;
    updated_at: string | null;
}

export interface MatchRow {
    id: string;
    child_id: string;
    opponent: string | null;
    match_date: string;
    minutes_played: number | null;
    score: string | null;
    result: "victoire" | "défaite" | "nul" | null;
    notes: string | null;
    rating_ovr: number | null;
    stat_tir: number | null;
    stat_pas: number | null;
    stat_dri: number | null;
    stat_def: number | null;
    stat_phy: number | null;
    stat_disc: number | null;
    match_metrics?: MatchMetricRow[];
}

export interface MatchMetricRow {
    id: string;
    match_id: string;
    metric_name: string | null;
    value: number | null;
    action_type: string | null;
    outcome: string | null;
    half: number | null;
    match_time: number | null;
}

export interface WellbeingRow {
    id: string;
    child_id: string;
    checkin_date: string;
    mood_score: number | null;
    sleep_quality: number | null;
    energy_level: number | null;
    confidence_level: number | null;
    stress_level: number | null;
    physical_pain: boolean | null;
    notes: string | null;
}

export interface PlannedMatchRow {
    id: string;
    child_id: string;
    opponent: string;
    match_date: string;
    match_time: string | null;
    location: "Domicile" | "Extérieur";
    status: "upcoming" | "won" | "lost" | "draw" | "cancelled";
    created_at: string;
}

export interface UserProgressRow {
    lesson_id: string;
    completed_at: string | null;
}
