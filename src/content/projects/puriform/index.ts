import type { ProjectData } from '../_schema'

export const puriform: ProjectData = {
    id: 'puriform',
    title: 'PuriForm',
    shortName: 'Puri',
    tags: ['relojeria', 'cmf', 'producto'],
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/38de92213297753.67439bf6e51c8.jpg',
    link: '/projects/puriform',
    year: '2022',
    order: 2,
    status: 'published',
    content: {
        es: {
            category: 'Relojería Avanzada',
            heroDescription: 'Estudio de formas puras y materiales translúcidos aplicados al diseño de alta relojería.',
            client: 'Estudio Interno',
            role: 'Diseñador Industrial',
            discipline: 'Diseño de Producto & CMF',
            sections: []
        },
        en: {
            category: 'Advanced Horology',
            heroDescription: 'Study of pure forms and translucent materials applied to high-end watchmaking design.',
            client: 'Internal Studio',
            role: 'Industrial Designer',
            discipline: 'Product Design & CMF',
            sections: []
        }
    }
}
