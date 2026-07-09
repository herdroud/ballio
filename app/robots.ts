import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://ballio.app";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            // Espace privé : rien à indexer au-delà des pages publiques.
            disallow: [
                "/api/",
                "/dashboard",
                "/formation",
                "/lessons",
                "/checkin",
                "/match",
                "/calendrier",
                "/evolution",
                "/protocoles",
                "/bibliotheque",
                "/parametres",
                "/profile",
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
