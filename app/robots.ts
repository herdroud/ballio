import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://ballio.app"; // Remplacez par votre domaine réel

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/dashboard/"], // On ne veut pas indexer l'API ni le dashboard privé
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
