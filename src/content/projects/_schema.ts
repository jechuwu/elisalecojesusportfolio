/**
 * Schema de datos para proyectos del portfolio.
 * Refinado para asegurar consistencia ES/EN.
 */

export interface ProjectSection {
    tag: string
    title: string
    paragraphs: string[]
    images?: string[]
}

export interface ProjectContent {
    category: string
    heroDescription: string
    client: string
    role: string
    discipline: string
    sections: ProjectSection[] // Forzamos secciones como requeridas (pueden ser array vacío)
}

export interface ProjectData {
    id: string
    title: string
    shortName: string
    tags: string[]
    image: string
    link: string
    year: string
    order: number
    status: 'published' | 'draft' | 'coming-soon'
    content: {
        es: ProjectContent
        en: ProjectContent
    }
}

/**
 * Tag labels bilingües para el sistema de filtrado.
 * Al agregar un tag nuevo, registrarlo acá.
 */
export const tagLabels: Record<string, { es: string; en: string }> = {
    optica: { es: 'Óptica', en: 'Optics' },
    cmf: { es: 'CMF', en: 'CMF' },
    producto: { es: 'Producto', en: 'Product' },
    relojeria: { es: 'Relojería', en: 'Horology' },
    acustica: { es: 'Acústica', en: 'Acoustics' },
    ergonomia: { es: 'Ergonomía', en: 'Ergonomics' },
    iluminacion: { es: 'Iluminación', en: 'Lighting' },
    mobiliario: { es: 'Mobiliario', en: 'Furniture' },
}
