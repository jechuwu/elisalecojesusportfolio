import { allProjects } from "@/content"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reactportfolio-phi.vercel.app"

    const projectPages = allProjects
        .filter(p => p.link !== "#")
        .map(p => ({
            url: `${baseUrl}${p.link}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 1,
        },
        ...projectPages
    ]
}
