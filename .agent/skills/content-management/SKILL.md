---
name: content-management
description: Sistema de contenido MDX para gestionar proyectos del portfolio sin tocar código de componentes
---

# Content Management — Portfolio de Diseño Industrial

## Propósito

Este skill define cómo gestionar el contenido de proyectos del portfolio usando archivos de datos estructurados en lugar de código hardcodeado en componentes. Esto permite agregar, editar y eliminar proyectos sin modificar la lógica de los componentes React.

## Arquitectura actual (problema)

Actualmente, los datos de proyectos están embebidos directamente en `src/components/projects-gallery.tsx`:

```typescript
const projects = [
    { id: 'lumix', title: 'Lumix Pro X', ... },
    { id: 'puriform', title: 'PuriForm', ... },
    // ...
]
```

Y las traducciones están en `src/components/language-provider.tsx` como un objeto monolítico.

## Arquitectura objetivo

```
src/content/
├── projects/
│   ├── _schema.ts          ← Schema TypeScript para validar datos
│   ├── lumix.ts             ← Datos del proyecto Lumix
│   ├── puriform.ts          ← Datos del proyecto PuriForm
│   └── bandoneon.ts         ← Nuevos proyectos: solo crear un archivo
└── index.ts                 ← Exporta todos los proyectos ordenados
```

## Schema de Proyecto

Cada archivo de proyecto debe exportar un objeto que cumpla con este schema:

```typescript
// content/projects/_schema.ts
export interface ProjectData {
    // Identificador único (usado como slug en la URL)
    id: string

    // Título del proyecto (no traducido, es nombre propio)
    title: string

    // Nombre corto para la UI comprimida (accordion vertical text)
    shortName: string

    // Tags para filtrado (deben existir en tagLabels)
    tags: string[]

    // Imagen principal del proyecto (URL o path local)
    image: string

    // Ruta interna del proyecto (ej: '/projects/lumix')
    // Usar '#' si la página aún no existe
    link: string

    // Año o rango de años
    year: string

    // Orden de aparición en la galería (menor = primero)
    order: number

    // Estado del proyecto
    status: 'published' | 'draft' | 'coming-soon'

    // Contenido bilingüe
    content: {
        es: ProjectContent
        en: ProjectContent
    }
}

export interface ProjectContent {
    // Categoría mostrada en la galería
    category: string

    // Descripción del hero
    heroDescription: string

    // Metadata del proyecto
    client: string
    role: string
    discipline: string

    // Secciones del case study (opcionales)
    sections?: ProjectSection[]
}

export interface ProjectSection {
    tag: string           // Ej: "1. El Desafío"
    title: string
    paragraphs: string[]
    images?: string[]
}
```

## Convenciones

### 1. Crear un nuevo proyecto

Para agregar un proyecto nuevo, crear un archivo en `content/projects/`:

```typescript
// content/projects/bandoneon.ts
import type { ProjectData } from './_schema'

export const bandoneon: ProjectData = {
    id: 'bandoneon',
    title: 'Bandoneón',
    shortName: 'Band',
    tags: ['producto', 'ergonomia'],
    image: '/images/projects/bandoneon/hero.jpg',
    link: '/projects/bandoneon',
    year: '2024',
    order: 3,
    status: 'published',
    content: {
        es: {
            category: 'Diseño de Instrumento Musical',
            heroDescription: 'Rediseño ergonómico del bandoneón tradicional...',
            client: 'Bandoneones Galgo',
            role: 'Diseñador Industrial',
            discipline: 'Ergonomía & Producción',
            sections: [
                {
                    tag: '1. El Desafío',
                    title: 'Un instrumento centenario necesita evolucionar.',
                    paragraphs: ['...']
                }
            ]
        },
        en: {
            category: 'Musical Instrument Design',
            heroDescription: 'Ergonomic redesign of the traditional bandoneon...',
            client: 'Bandoneones Galgo',
            role: 'Industrial Designer',
            discipline: 'Ergonomics & Production',
            sections: [
                {
                    tag: '1. The Challenge',
                    title: 'A century-old instrument needs to evolve.',
                    paragraphs: ['...']
                }
            ]
        }
    }
}
```

### 2. Registrar el proyecto

Agregar la exportación en `content/index.ts`:

```typescript
import { lumix } from './projects/lumix'
import { puriform } from './projects/puriform'
import { bandoneon } from './projects/bandoneon'

// Ordenar por el campo `order`
export const allProjects = [lumix, puriform, bandoneon]
    .filter(p => p.status !== 'draft')
    .sort((a, b) => a.order - b.order)
```

### 3. Imágenes de proyectos

Las imágenes locales de cada proyecto van en:
```
public/images/projects/{project-id}/
├── hero.jpg          ← Imagen principal (16:9, min 1920px ancho)
├── sketch-01.jpg     ← Imágenes de proceso
├── sketch-02.jpg
├── detail-01.jpg     ← Detalles CMF
└── thumb.jpg         ← Thumbnail para la galería (800x600)
```

### 4. Tags disponibles

Los tags válidos están definidos en `tagLabels` del gallery. Al agregar un tag nuevo, también agregarlo allí:

| Tag Key       | ES             | EN           |
|---------------|----------------|--------------|
| optica        | Óptica         | Optics       |
| cmf           | CMF            | CMF          |
| producto      | Producto       | Product      |
| relojeria     | Relojería      | Horology     |
| acustica      | Acústica       | Acoustics    |
| ergonomia     | Ergonomía      | Ergonomics   |
| iluminacion   | Iluminación    | Lighting     |
| mobiliario    | Mobiliario     | Furniture    |

### 5. Página de proyecto automática

La ruta `src/app/projects/[slug]/page.tsx` puede usar el slug para buscar datos dinámicamente:

```typescript
import { allProjects } from '@/content'

export function generateStaticParams() {
    return allProjects.map(p => ({ slug: p.id }))
}
```

## Reglas importantes

1. **Nunca hardcodear datos** de proyectos en componentes `.tsx`. Siempre importar de `content/`.
2. **Proyectos `draft`** no aparecen en la galería ni generan rutas.
3. **El campo `order`** controla la posición en la galería — NO el orden del array.
4. **Traducciones de UI** (botones, nav, labels) siguen en `language-provider.tsx`. Solo el contenido de proyectos va en `content/`.
5. **Las imágenes locales** deben optimizarse antes de subir (ver skill `image-optimization`).
