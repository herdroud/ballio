import { describe, it, expect } from "vitest";
import { FORMATION_CONFIG, getFormationState, lessonProgressId } from "@/app/lib/formation-config";

const allLessonIdsOf = (moduleId: string): string[] => {
    const mod = FORMATION_CONFIG.find(m => m.id === moduleId)!;
    return mod.lessons.map(l => lessonProgressId(moduleId, l.id));
};

describe("getFormationState", () => {
    it("aucune progression → module courant m0, rien de complété", () => {
        const state = getFormationState([]);
        expect(state.completedModuleIds).toEqual([]);
        expect(state.currentModule.id).toBe("m0");
        expect(state.completedModuleCount).toBe(0);
        expect(state.totalModuleCount).toBe(FORMATION_CONFIG.length);
    });

    it("un module n'est complété que si TOUTES ses leçons le sont", () => {
        const partial = getFormationState([lessonProgressId("m0", "intro")]);
        expect(partial.completedModuleIds).toEqual([]);
        expect(partial.currentModule.id).toBe("m0");

        const full = getFormationState(allLessonIdsOf("m0"));
        expect(full.completedModuleIds).toEqual(["m0"]);
        expect(full.currentModule.id).toBe("m1");
    });

    it("ignore les identifiants historiques inconnus (mental-1…)", () => {
        const state = getFormationState(["mental-1", "nutrition-1"]);
        expect(state.completedModuleIds).toEqual([]);
        expect(state.currentModule.id).toBe("m0");
    });

    it("formation entièrement complétée → reste sur le dernier module", () => {
        const allIds = FORMATION_CONFIG.flatMap(m => allLessonIdsOf(m.id));
        const state = getFormationState(allIds);
        expect(state.completedModuleCount).toBe(FORMATION_CONFIG.length);
        expect(state.currentModule.id).toBe(FORMATION_CONFIG[FORMATION_CONFIG.length - 1].id);
    });
});

describe("FORMATION_CONFIG (intégrité)", () => {
    it("chaque slug de leçon correspond à son module et son id", () => {
        FORMATION_CONFIG.forEach(mod => {
            mod.lessons.forEach(lesson => {
                expect(lesson.slug).toBe(`${mod.id}/${lesson.id}`);
            });
        });
    });

    it("les ids de modules sont uniques et ordonnés", () => {
        const ids = FORMATION_CONFIG.map(m => m.id);
        expect(new Set(ids).size).toBe(ids.length);
        expect(ids).toEqual([...ids].sort());
    });
});
