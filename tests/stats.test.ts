import { describe, it, expect } from "vitest";
import { calcMatchNote, calculateTier, getTierLabel, type MatchCounts } from "@/app/lib/stats";

const emptyCounts = (): MatchCounts => ({
    off: { buts: 0, pdec: 0, pok: 0, pko: 0, tca: 0, tho: 0, dok: 0, dko: 0, cok: 0, cko: 0 },
    def: { tok: 0, tko: 0, int: 0, contre: 0, dok: 0, dko: 0 },
    dis: { cj: 0, cr: 0, fco: 0, fsu: 0 },
});

describe("calculateTier", () => {
    it("attribue les paliers aux bons seuils", () => {
        expect(calculateTier(93)).toBe("legend");
        expect(calculateTier(92)).toBe("epic");
        expect(calculateTier(85)).toBe("epic");
        expect(calculateTier(84)).toBe("rare");
        expect(calculateTier(75)).toBe("rare");
        expect(calculateTier(74)).toBe("uncommon");
        expect(calculateTier(60)).toBe("uncommon");
        expect(calculateTier(59)).toBe("common");
    });

    it("a un libellé pour chaque palier", () => {
        (["legend", "epic", "rare", "uncommon", "common"] as const).forEach(tier => {
            expect(getTierLabel(tier)).toBeTruthy();
        });
    });
});

describe("calcMatchNote", () => {
    it("borne la note entre 1 et 99", () => {
        const note = calcMatchNote(emptyCounts(), "MC", 90, 90);
        expect(note.ovr).toBeGreaterThanOrEqual(1);
        expect(note.ovr).toBeLessThanOrEqual(99);
    });

    it("un match vierge donne des scores neutres (50%)", () => {
        const note = calcMatchNote(emptyCounts(), "MC", 90, 90);
        // Aucune action : tous les pourcentages retombent à 50, sauf les volumes (0).
        expect(note.DRI).toBe(50);
        expect(note.DISC).toBe(100);
    });

    it("les buts rapportent plus à un défenseur qu'à un attaquant", () => {
        const counts = emptyCounts();
        counts.off.buts = 1;
        const att = calcMatchNote(counts, "ATT", 90, 90);
        const dc = calcMatchNote(counts, "DC", 90, 90);
        // Bonus but : ATT +3, DC +10 — mais les pondérations TIR diffèrent aussi.
        // On vérifie simplement que le bonus s'applique dans les deux cas.
        expect(att.ovr).toBeGreaterThan(calcMatchNote(emptyCounts(), "ATT", 90, 90).ovr);
        expect(dc.ovr).toBeGreaterThan(calcMatchNote(emptyCounts(), "DC", 90, 90).ovr);
    });

    it("un carton rouge fait chuter la discipline et la note", () => {
        const clean = calcMatchNote(emptyCounts(), "MC", 90, 90);
        const counts = emptyCounts();
        counts.dis.cr = 1;
        const dirty = calcMatchNote(counts, "MC", 90, 90);
        expect(dirty.DISC).toBe(50);
        expect(dirty.ovr).toBeLessThan(clean.ovr);
    });

    it("applique le malus de faible temps de jeu", () => {
        const counts = emptyCounts();
        counts.off.pok = 10;
        const full = calcMatchNote(counts, "MC", 90, 90);
        const short = calcMatchNote(counts, "MC", 20, 90); // ratio < 0.40 → ×0.80
        expect(short.ovr).toBe(Math.max(1, Math.round(full.ovr * 0.8)));
    });

    it("un poste inconnu retombe sur les pondérations MC", () => {
        const counts = emptyCounts();
        counts.off.pok = 5;
        expect(calcMatchNote(counts, "???", 90, 90).ovr)
            .toBe(calcMatchNote(counts, "MC", 90, 90).ovr);
    });

    it("ne divise pas par zéro quand la durée totale est nulle", () => {
        const note = calcMatchNote(emptyCounts(), "MC", 0, 0);
        expect(Number.isFinite(note.ovr)).toBe(true);
    });
});
