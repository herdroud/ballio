export interface Lesson {
    id: string;
    title: string;
    subtitle: string;
    videoUrl: string;
    description: string;
    content: string;
    actionItem: string;
    requiredTier?: string;
}

export const LESSONS_DATA: Record<string, Lesson> = {
    "mental-1": {
        id: "mental-1",
        title: "Le Paradoxe du Parent",
        subtitle: "Module Mental - Leçon 1",
        // Pas encore de vidéo produite : laisser vide plutôt qu'un placeholder.
        videoUrl: "",
        description: "Découvrez pourquoi 80% des parents ruinent involontairement la progression.",
        content: `
      Dans cette leçon, nous abordons le concept de la 'pression invisible'.
      Même un encouragement peut être perçu comme une attente de résultat par l'enfant.

      ### Ce que vous allez apprendre :
      - La différence entre motivation intrinsèque et extrinsèque.
      - Pourquoi le silence est parfois votre meilleur allié.
      - La règle d'or des 24 heures après un match.
    `,
        actionItem: "Ce soir, ne parlez pas de foot à table.",
    },
    "nutrition-1": {
        id: "nutrition-1",
        title: "Nutrition Avancée",
        subtitle: "Module Nutrition - Leçon 1",
        videoUrl: "",
        description: "L'énergie de votre enfant commence 3 heures avant le coup d'envoi.",
        content: "Détail des glucides...",
        actionItem: "Préparez la gourde d'eau avec une pincée de sel.",
    }
};
