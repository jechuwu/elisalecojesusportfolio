/**
 * Schema de datos para proyectos del portfolio.
 * 
 * Cada archivo en content/projects/ debe exportar un objeto
 * que cumpla con la interfaz ProjectData.
 */

export interface ProjectSection {
    /** Etiqueta numerada, ej: "1. El Desafío" */
    tag: string
    /** Título de la sección */
    title: string
    /** Párrafos de texto */
    paragraphs: string[]
    /** Imágenes asociadas a esta sección (paths relativos a /public) */
    images?: string[]
}

export interface ProjectContent {
    /** Categoría mostrada en la galería (ej: "Ingeniería Óptica & CMF") */
    category: string
    /** Descripción del hero en la página del proyecto */
    heroDescription: string
    /** Nombre del cliente */
    client: string
    /** Rol desempeñado */
    role: string
    /** Disciplina principal */
    discipline: string
    /** Secciones del case study */
    sections?: ProjectSection[]
}

export interface ProjectData {
    /** Identificador único — usado como slug en la URL */
    id: string
    /** Título del proyecto (nombre propio, sin traducir) */
    title: string
    /** Nombre corto para la UI comprimida (vertical text en accordion) */
    shortName: string
    /** Tags para filtrado — deben existir en tagLabels */
    tags: string[]
    /** Imagen principal (URL externa o path relativo a /public) */
    image: string
    /** Ruta interna: '/projects/lumix' o '#' si no existe aún */
    link: string
    /** Año o rango de años */
    year: string
    /** Orden en la galería (menor = primero) */
    order: number
    /** Estado del proyecto */
    status: 'published' | 'draft' | 'coming-soon'
    /** Contenido bilingüe ES/EN */
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
