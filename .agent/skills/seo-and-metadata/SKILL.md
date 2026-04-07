---
name: seo-and-metadata
description: SEO técnico y metadata avanzada para el portfolio de diseño industrial con Next.js
---

# SEO & Metadata — Portfolio de Diseño Industrial

## Propósito

Este skill define cómo implementar SEO técnico para maximizar la visibilidad del portfolio en búsquedas y redes sociales. Un diseñador industrial necesita que su nombre y sus proyectos aparezcan en Google, LinkedIn y Behance.

## Estado actual

- `layout.tsx`: Metadata estática básica (solo title + description)
- No hay Open Graph images
- No hay `generateMetadata()` dinámico en las páginas de proyecto
- No hay sitemap ni robots.txt
- No hay JSON-LD structured data
- El `<html lang>` está fijo en `es` (debería reflejar el idioma activo)

## Metadata estática (layout.tsx)

El layout raíz define la metadata base que heredan todas las páginas:

```typescript
// src/app/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        default: "Jesus Elisaleco | Industrial Design Portfolio",
        template: "%s — Jesus Elisaleco"
    },
    description: "Portfolio de diseño industrial de alto impacto. Precisión técnica y estética emocional. Especializado en CMF, óptica e ingeniería de producto.",
    metadataBase: new URL("https://jesuselisaleco.com"),  // ⚠️ Actualizar con URL real
    keywords: [
        "diseño industrial", "industrial design", "CMF", "product design",
        "diseño de producto", "Jesus Elisaleco", "portfolio",
        "Berlin designer", "diseñador industrial"
    ],
    authors: [{ name: "Jesus Elisaleco" }],
    creator: "Jesus Elisaleco",
    openGraph: {
        type: "website",
        locale: "es_AR",
        alternateLocale: "en_US",
        siteName: "Jesus Elisaleco Portfolio",
        images: [
            {
                url: "/og-default.jpg",  // Imagen por defecto 1200×630
                width: 1200,
                height: 630,
                alt: "Jesus Elisaleco — Industrial Design Portfolio"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        creator: "@jesuselisaleco"  // ⚠️ Actualizar
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        }
    }
}
```

## Metadata dinámica por proyecto

Cada página de proyecto debe generar su propia metadata:

```typescript
// src/app/projects/[slug]/page.tsx
import { getProjectById } from "@/content"
import type { Metadata } from "next"

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const project = getProjectById(slug)
    if (!project) return {}

    const { es, en } = project.content

    return {
        title: project.title,
        description: es.heroDescription,
        openGraph: {
            title: `${project.title} — Jesus Elisaleco`,
            description: en.heroDescription,  // EN para Open Graph (LinkedIn es global)
            images: [
                {
                    url: project.image,
                    width: 1200,
                    height: 630,
                    alt: project.title
                }
            ],
            type: "article",
        }
    }
}
```

## Open Graph Image por defecto

Crear una imagen OG estática para compartir en redes:

```
public/
├── og-default.jpg       ← 1200×630, con tu nombre y branding
└── favicon.ico          ← (ya existe)
```

### Template de OG image

Composición recomendada:
- Fondo negro `#121212`
- Tu nombre "JESUS ELISALECO" en Poppins Bold blanco
- Subtítulo "Industrial Design" en naranja `#FF4F00`
- Logo o marca gráfica si la tenés
- Dimensiones: 1200 × 630px exactos

## Structured Data (JSON-LD)

### Person schema (layout)

```tsx
// src/app/layout.tsx — dentro del <head>
<script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
        __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Jesus Elisaleco",
            jobTitle: "Industrial Designer",
            url: "https://jesuselisaleco.com",
            sameAs: [
                "https://www.linkedin.com/in/jesuselisaleco",
                "https://www.behance.net/jesuselisaleco",
                "https://www.instagram.com/jesuselisaleco"
            ],
            address: {
                "@type": "PostalAddress",
                addressLocality: "Berlin",
                addressCountry: "DE"
            },
            knowsAbout: [
                "Industrial Design", "CMF Design",
                "Product Design", "Optical Engineering"
            ]
        })
    }}
/>
```

### CreativeWork schema (por proyecto)

```tsx
// En cada página de proyecto
<script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
        __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: content.heroDescription,
            creator: {
                "@type": "Person",
                name: "Jesus Elisaleco"
            },
            dateCreated: project.year,
            image: project.image,
            genre: "Industrial Design"
        })
    }}
/>
```

## Sitemap automático

```typescript
// src/app/sitemap.ts
import { allProjects } from "@/content"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://jesuselisaleco.com"  // ⚠️ Actualizar

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
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        ...projectPages
    ]
}
```

## Robots.txt

```typescript
// src/app/robots.ts
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: "https://jesuselisaleco.com/sitemap.xml",
    }
}
```

## Checklist de implementación

- [ ] Agregar metadata template con `title.template` en layout
- [ ] Crear OG image por defecto en `/public/og-default.jpg`
- [ ] Implementar `generateMetadata()` en `projects/[slug]/page.tsx`
- [ ] Agregar JSON-LD Person en layout
- [ ] Agregar JSON-LD CreativeWork en cada proyecto
- [ ] Crear `src/app/sitemap.ts`
- [ ] Crear `src/app/robots.ts`
- [ ] Actualizar `metadataBase` con la URL de producción
- [ ] Verificar OG tags con https://www.opengraph.xyz/

## Convenciones

1. **Title format**: `{Nombre del Proyecto} — Jesus Elisaleco`
2. **Description**: Siempre entre 150-160 caracteres
3. **OG images**: 1200×630px, JPG, max 200KB
4. **Keywords**: No abusar, 5-10 relevantes por página
5. **URL canónica**: Se genera automáticamente con `metadataBase`
6. **hreflang**: Cuando implementes rutas i18n, agregar `alternates.languages`
