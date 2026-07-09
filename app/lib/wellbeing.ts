// Logique pure du suivi bien-être : normalisation des réponses du check-in
// (échelles UI → échelles 1-5 en base) et calcul de l'indice global.
// Colonnes de child_wellbeing : mood_score, sleep_quality, energy_level (cf. docs/supabase_schema.md)

export interface CheckinAnswers {
    mood: number;        // UI : 1 difficile · 2 moyen · 3 super
    sleep: number;       // UI : 1 mauvais · 2 moyen · 3 bon · 4 excellent
    fatigue: number;     // UI : 1 épuisé · 2 fatigué · 3 en forme · 4 pleine charge
    muscle_pain: number; // UI : 1 fortes douleurs · 2 courbatures · 3 tout va bien
}

export interface NormalizedCheckin {
    mood_score: number;      // 1-5
    sleep_quality: number;   // 1-5
    energy_level: number;    // 1-5
    physical_pain: boolean;
}

export function normalizeCheckin(a: CheckinAnswers): NormalizedCheckin {
    const mood_score = a.mood === 1 ? 1 : a.mood === 2 ? 3 : 5;
    const sleep_quality = a.sleep === 4 ? 5 : a.sleep === 3 ? 4 : a.sleep === 2 ? 2 : 1;
    const energy_level = a.fatigue === 4 ? 5 : a.fatigue === 3 ? 4 : a.fatigue === 2 ? 2 : 1;
    return {
        mood_score,
        sleep_quality,
        energy_level,
        physical_pain: a.muscle_pain < 3,
    };
}

export interface WellbeingEntry {
    checkin_date: string;
    mood_score: number | null;
    sleep_quality: number | null;
    energy_level: number | null;
}

// Indice global 0-100 : moyenne des trois dimensions (chacune sur 1-5) sur les entrées fournies.
// Retourne null s'il n'y a aucune donnée exploitable.
export function computeWellbeingScore(entries: WellbeingEntry[]): number | null {
    const valid = entries.filter(
        e => e.mood_score != null || e.sleep_quality != null || e.energy_level != null
    );
    if (valid.length === 0) return null;

    const perEntry = valid.map(e => {
        const dims = [e.mood_score, e.sleep_quality, e.energy_level].filter(
            (v): v is number => v != null
        );
        const avg = dims.reduce((s, v) => s + v, 0) / dims.length;
        return (avg - 1) / 4; // 1-5 → 0-1
    });

    const score = perEntry.reduce((s, v) => s + v, 0) / perEntry.length;
    return Math.round(score * 100);
}

// Date du jour au format YYYY-MM-DD dans le fuseau de l'application (France).
// Évite qu'un check-in fait le soir soit rattaché au mauvais jour quand le serveur tourne en UTC.
export function todayInParis(): string {
    return new Intl.DateTimeFormat("fr-CA", {
        timeZone: "Europe/Paris",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());
}
