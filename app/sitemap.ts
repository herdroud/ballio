import { MetadataRoute } from "next";
import { LESSONS_DATA } from "@/app/lib/lessons-data";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://ballio.app"; // Remplacez par votre domaine réel

    // Pages statiques
    const routes = [
        "",
        "/sign-in",
        "/sign-up",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Pages dynamiques (Leçons)
    const lessonRoutes = Object.values(LESSONS_DATA).map((lesson) => ({
        url: `${baseUrl}/lessons/${lesson.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));

    return [...routes, ...lessonRoutes];
}
