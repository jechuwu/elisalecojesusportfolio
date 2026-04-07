import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reactportfolio-phi.vercel.app"

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/.agent/", "/proyectos individuales/"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
