import type { ProjectData } from '../_schema'

export const puriform: ProjectData = {
    id: 'puriform',
    title: 'PuriForm',
    shortName: 'Puri',
    tags: ['producto', 'cmf', 'ergonomia'],
    image: '/images/projects/puriform/hero-shot.png',
    link: '/projects/puriform',
    year: '2024',
    order: 2,
    status: 'published',
    content: {
        es: {
            category: 'Diseño de Producto',
            heroDescription: 'Un purificador de agua diseñado para elevar la experiencia diaria en el hogar.',
            client: 'FADU, UBA.',
            role: 'Diseñador Industrial',
            discipline: 'Desarrollo de producto\nElectrodomésticos',
            sections: []
        },
        en: {
            category: 'Product Design',
            heroDescription: 'A water purifier designed to elevate the daily home experience.',
            client: 'FADU, UBA.',
            role: 'Industrial Designer',
            discipline: 'Product Development\nHome Appliances',
            sections: []
        }
    }
}
