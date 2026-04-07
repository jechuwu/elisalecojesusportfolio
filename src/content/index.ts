/**
 * Punto de entrada central para todo el contenido del portfolio.
 * 
 * Importa todos los proyectos y los exporta ordenados.
 * Para agregar un nuevo proyecto:
 * 1. Crear el archivo en content/projects/{id}.ts
 * 2. Importarlo acá
 * 3. Agregarlo al array `projectsRaw`
 */

import { lumix } from './projects/lumix'
import { puriform } from './projects/puriform'
import { aural } from './projects/aural'
import { lux } from './projects/lux'
import { aero } from './projects/aero'

// Re-exportar schema y tipos
export type { ProjectData, ProjectContent, ProjectSection } from './projects/_schema'
export { tagLabels } from './projects/_schema'

// Todos los proyectos registrados
const projectsRaw = [lumix, puriform, aural, lux, aero]

/** Proyectos publicados, ordenados por `order` */
export const allProjects = projectsRaw
    .filter(p => p.status !== 'draft')
    .sort((a, b) => a.order - b.order)

/** Solo proyectos con página activa (link !== '#') */
export const publishedProjects = projectsRaw
    .filter(p => p.status === 'published')
    .sort((a, b) => a.order - b.order)

/** Buscar un proyecto por su id/slug */
export function getProjectById(id: string) {
    return projectsRaw.find(p => p.id === id)
}

/** Obtener el proyecto siguiente para la navegación */
export function getNextProject(currentId: string) {
    const published = allProjects.filter(p => p.link !== '#')
    const currentIndex = published.findIndex(p => p.id === currentId)
    if (currentIndex === -1) return published[0]
    return published[(currentIndex + 1) % published.length]
}
