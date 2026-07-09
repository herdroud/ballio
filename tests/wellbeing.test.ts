import { describe, it, expect } from "vitest";
import { normalizeCheckin, computeWellbeingScore } from "@/app/lib/wellbeing";

describe("normalizeCheckin", () => {
    it("normalise l'humeur (1-3 UI → 1/3/5 en base)", () => {
        expect(normalizeCheckin({ mood: 1, sleep: 1, fatigue: 1, muscle_pain: 3 }).mood_score).toBe(1);
        expect(normalizeCheckin({ mood: 2, sleep: 1, fatigue: 1, muscle_pain: 3 }).mood_score).toBe(3);
        expect(normalizeCheckin({ mood: 3, sleep: 1, fatigue: 1, muscle_pain: 3 }).mood_score).toBe(5);
    });

    it("normalise le sommeil (1-4 UI → 1/2/4/5 en base)", () => {
        const sleepFor = (sleep: number) =>
            normalizeCheckin({ mood: 1, sleep, fatigue: 1, muscle_pain: 3 }).sleep_quality;
        expect(sleepFor(1)).toBe(1);
        expect(sleepFor(2)).toBe(2);
        expect(sleepFor(3)).toBe(4);
        expect(sleepFor(4)).toBe(5);
    });

    it("signale une douleur physique en dessous du seuil", () => {
        expect(normalizeCheckin({ mood: 1, sleep: 1, fatigue: 1, muscle_pain: 1 }).physical_pain).toBe(true);
        expect(normalizeCheckin({ mood: 1, sleep: 1, fatigue: 1, muscle_pain: 2 }).physical_pain).toBe(true);
        expect(normalizeCheckin({ mood: 1, sleep: 1, fatigue: 1, muscle_pain: 3 }).physical_pain).toBe(false);
    });
});

describe("computeWellbeingScore", () => {
    it("renvoie null sans données", () => {
        expect(computeWellbeingScore([])).toBeNull();
        expect(computeWellbeingScore([
            { checkin_date: "2026-07-09", mood_score: null, sleep_quality: null, energy_level: null },
        ])).toBeNull();
    });

    it("100 quand tout est au maximum, 0 au minimum", () => {
        expect(computeWellbeingScore([
            { checkin_date: "2026-07-09", mood_score: 5, sleep_quality: 5, energy_level: 5 },
        ])).toBe(100);
        expect(computeWellbeingScore([
            { checkin_date: "2026-07-09", mood_score: 1, sleep_quality: 1, energy_level: 1 },
        ])).toBe(0);
    });

    it("50 pour des valeurs médianes", () => {
        expect(computeWellbeingScore([
            { checkin_date: "2026-07-09", mood_score: 3, sleep_quality: 3, energy_level: 3 },
        ])).toBe(50);
    });

    it("moyenne sur plusieurs jours", () => {
        const score = computeWellbeingScore([
            { checkin_date: "2026-07-08", mood_score: 5, sleep_quality: 5, energy_level: 5 },
            { checkin_date: "2026-07-09", mood_score: 1, sleep_quality: 1, energy_level: 1 },
        ]);
        expect(score).toBe(50);
    });

    it("ignore les dimensions manquantes sans fausser le calcul", () => {
        const score = computeWellbeingScore([
            { checkin_date: "2026-07-09", mood_score: 5, sleep_quality: null, energy_level: null },
        ]);
        expect(score).toBe(100);
    });
});
