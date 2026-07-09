export interface LessonConfig {
    id: string;
    title: string;
    slug: string;
    duration: string;
}

export interface ModuleConfig {
    id: string;
    num: number;
    title: string;
    subtitle: string;
    objective: string;
    duration: string;
    lessons: LessonConfig[];
    toolsCount: number;
}

export const FORMATION_CONFIG: ModuleConfig[] = [
    {
        id: "m0",
        num: 0,
        title: "L'Électrochoc",
        subtitle: "L'ennemi invisible, c'est vous ?",
        objective: "Créer un doute profond et immédiat. Comprendre les comportements qui freinent votre enfant.",
        duration: "40 min",
        toolsCount: 4,
        lessons: [
            { id: "intro", title: "Introduction", slug: "m0/intro", duration: "5 min" },
            { id: "1", title: "Le parent taxi", slug: "m0/1", duration: "15 min" },
            { id: "2", title: "Lettre de démission", slug: "m0/2", duration: "20 min" },
        ]
    },
    {
        id: "m1",
        num: 1,
        title: "Les Fondations",
        subtitle: "Reprendre sa juste place",
        objective: "Installer des règles de vie concrètes — pas des concepts. Savoir exactement quoi faire chaque jour.",
        duration: "55 min",
        toolsCount: 3,
        lessons: [
            { id: "intro", title: "Introduction", slug: "m1/intro", duration: "5 min" },
            { id: "1", title: "Le territoire", slug: "m1/1", duration: "25 min" },
            { id: "2", title: "L'après-match", slug: "m1/2", duration: "25 min" },
        ]
    },
    {
        id: "m2",
        num: 2,
        title: "Le Protocole Jour de Match",
        subtitle: "Du vendredi soir au dimanche",
        objective: "Ce que vous faites et dites, heure par heure. Zéro improvisation. Le moment le plus dangereux, enfin maîtrisé.",
        duration: "60 min",
        toolsCount: 3,
        lessons: [
            { id: "intro", title: "Introduction", slug: "m2/intro", duration: "5 min" },
            { id: "1", title: "Vendredi Soir", slug: "m2/1", duration: "15 min" },
            { id: "2", title: "Voiture Aller", slug: "m2/2", duration: "10 min" },
            { id: "3", title: "Silence Actif", slug: "m2/3", duration: "15 min" },
            { id: "4", title: "Voiture Retour", slug: "m2/4", duration: "15 min" },
        ]
    },
    {
        id: "m3",
        num: 3,
        title: "La Trousse de Secours",
        subtitle: "Gérer crise, échec et injustice",
        objective: "Des plans d'action immédiats pour les situations qui brisent le mental des jeunes.",
        duration: "55 min",
        toolsCount: 4,
        lessons: [
            { id: "intro", title: "Introduction", slug: "m3/intro", duration: "5 min" },
            { id: "1", title: "Erreur Fatale", slug: "m3/1", duration: "15 min" },
            { id: "2", title: "Veut Arrêter", slug: "m3/2", duration: "15 min" },
            { id: "3", title: "Blessure Longue", slug: "m3/3", duration: "10 min" },
            { id: "4", title: "L'Agent / Pro", slug: "m3/4", duration: "10 min" },
        ]
    },
    {
        id: "m4",
        num: 4,
        title: "Le Manuel par Âge",
        subtitle: "KPIs spécifiques U6–U18",
        objective: "Adapter son rôle à l'âge. On ne parle pas à un U8 comme à un U16.",
        duration: "50 min",
        toolsCount: 5,
        lessons: [
            { id: "intro", title: "Introduction", slug: "m4/intro", duration: "10 min" },
            { id: "1", title: "U6 – U9", slug: "m4/1", duration: "10 min" },
            { id: "2", title: "U10 – U13", slug: "m4/2", duration: "10 min" },
            { id: "3", title: "U14 – U16", slug: "m4/3", duration: "10 min" },
            { id: "4", title: "U17 – U18", slug: "m4/4", duration: "10 min" },
        ]
    },
    {
        id: "m5",
        num: 5,
        title: "L'Ingénierie Invisible",
        subtitle: "La performance se construit hors terrain",
        objective: "Nutrition, sommeil, récupération : devenir directeur des conditions optimales.",
        duration: "50 min",
        toolsCount: 3,
        lessons: [
            { id: "intro", title: "L'avant-terrain", slug: "m5/intro", duration: "10 min" },
            { id: "1", title: "Sommeil", slug: "m5/1", duration: "10 min" },
            { id: "2", title: "Nutrition", slug: "m5/2", duration: "10 min" },
            { id: "3", title: "Prévention", slug: "m5/3", duration: "10 min" },
            { id: "4", title: "École", slug: "m5/4", duration: "10 min" },
        ]
    },
    {
        id: "m6",
        num: 6,
        title: "L'Écosystème Pro",
        subtitle: "Clubs, détection, agents — sans se faire avoir",
        objective: "Comprendre la machine pour protéger votre enfant. Les vrais critères de détection, sans filtres.",
        duration: "60 min",
        toolsCount: 4,
        lessons: [
            { id: "intro", title: "Introduction", slug: "m6/intro", duration: "10 min" },
            { id: "1", title: "Recruteurs", slug: "m6/1", duration: "15 min" },
            { id: "2", title: "Le Coach", slug: "m6/2", duration: "10 min" },
            { id: "3", title: "Agents", slug: "m6/3", duration: "15 min" },
            { id: "4", title: "Réseaux Sociaux", slug: "m6/4", duration: "10 min" },
        ]
    }
];

// Identifiant d'une leçon dans user_progress : "<moduleId>-<lessonId>" (ex : "m0-intro", "m2-3")
export function lessonProgressId(moduleId: string, lessonId: string): string {
    return `${moduleId}-${lessonId}`;
}

export interface FormationState {
    completedLessonIds: string[];
    completedModuleIds: string[];
    currentModule: ModuleConfig;
    completedModuleCount: number;
    totalModuleCount: number;
}

// Un module est complété quand TOUTES ses leçons le sont.
// Le module courant est le premier module non complété.
export function getFormationState(completedLessonIds: string[]): FormationState {
    const completedModuleIds = FORMATION_CONFIG
        .filter(m => m.lessons.every(l => completedLessonIds.includes(lessonProgressId(m.id, l.id))))
        .map(m => m.id);

    const currentModule =
        FORMATION_CONFIG.find(m => !completedModuleIds.includes(m.id))
        ?? FORMATION_CONFIG[FORMATION_CONFIG.length - 1];

    return {
        completedLessonIds,
        completedModuleIds,
        currentModule,
        completedModuleCount: completedModuleIds.length,
        totalModuleCount: FORMATION_CONFIG.length,
    };
}
