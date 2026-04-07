/**
 * Template para crear un nuevo proyecto en el content system.
 *
 * Para usar:
 * 1. Copiar este archivo a content/projects/{id}.ts
 * 2. Reemplazar todos los campos con los datos reales
 * 3. Importar y registrar en content/index.ts
 *
 * Referencia del skill: content-management
 */

import type { ProjectData } from '@/content/projects/_schema'

export const TEMPLATE_ID: ProjectData = {
    // ─── Identificación ───
    id: 'mi-proyecto',         // slug de la URL: /projects/mi-proyecto
    title: 'Mi Proyecto',      // Nombre propio, sin traducir
    shortName: 'MiPr',         // 4-5 chars max, para accordion vertical
    
    // ─── Clasificación ───
    tags: ['producto', 'cmf'], // Tags del sistema de filtrado
    
    // ─── Media ───
    image: '/images/projects/mi-proyecto/hero.jpg',  // O URL externa
    
    // ─── Navegación ───
    link: '/projects/mi-proyecto',  // '#' si la página no existe aún
    
    // ─── Metadata ───
    year: '2024',
    order: 10,                  // Ajustar según posición deseada
    status: 'draft',            // 'draft' | 'published' | 'coming-soon'
    
    // ─── Contenido bilingüe ───
    content: {
        es: {
            category: 'Categoría del Proyecto',
            heroDescription: 'Descripción breve y evocadora del proyecto en español. Máximo 2 líneas.',
            client: 'Nombre del Cliente',
            role: 'Diseñador Industrial',
            discipline: 'Disciplina Principal',
            sections: [
                {
                    tag: '1. El Desafío',
                    title: 'Título del primer bloque de contenido.',
                    paragraphs: [
                        'Primer párrafo explicando el contexto y el problema a resolver.',
                        'Segundo párrafo con más detalle sobre las restricciones y objetivos.'
                    ],
                    images: [
                        '/images/projects/mi-proyecto/sketch-01.jpg',
                        '/images/projects/mi-proyecto/sketch-02.jpg'
                    ]
                },
                {
                    tag: '2. Proceso',
                    title: 'Título del segundo bloque.',
                    paragraphs: [
                        'Descripción del proceso de diseño y las decisiones tomadas.'
                    ]
                }
            ]
        },
        en: {
            category: 'Project Category',
            heroDescription: 'Brief, evocative project description in English. Max 2 lines.',
            client: 'Client Name',
            role: 'Industrial Designer',
            discipline: 'Main Discipline',
            sections: [
                {
                    tag: '1. The Challenge',
                    title: 'Title for the first content block.',
                    paragraphs: [
                        'First paragraph explaining context and the problem being solved.',
                        'Second paragraph with more detail on constraints and objectives.'
                    ],
                    images: [
                        '/images/projects/mi-proyecto/sketch-01.jpg',
                        '/images/projects/mi-proyecto/sketch-02.jpg'
                    ]
                },
                {
                    tag: '2. Process',
                    title: 'Second block title.',
                    paragraphs: [
                        'Description of the design process and decisions made.'
                    ]
                }
            ]
        }
    }
}
