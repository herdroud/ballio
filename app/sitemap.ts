import { MetadataRoute } from "next";

// Seules les pages publiques sont listées : les pages protégées (dashboard,
// formation, leçons…) redirigent vers la connexion et n'ont rien à faire ici.
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://ballio.app";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/quiz`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/sign-up`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/legal/mentions`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.2,
        },
        {
            url: `${baseUrl}/legal/privacy`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.2,
        },
        {
            url: `${baseUrl}/legal/terms`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.2,
        },
    ];
}
