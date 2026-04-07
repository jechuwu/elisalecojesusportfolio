import type { ProjectData } from '../_schema'

export const aero: ProjectData = {
    id: 'aero',
    title: 'Aero Lounge',
    shortName: 'Aero',
    tags: ['mobiliario', 'ergonomia'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhVpjPwN56OqI15EpTsxaI58AqKcPd2szKmTdZXrpOfpJ7cJ-hsg1NzTvSi6wbYlZxhlFiV_lJshrZ4k9KrHK_A_5Kh4L-vO2U738gipjpXKnRXTKjZOGNuuPzXa5TApUK2IZyJCOWxV-RtlzR3Rp2hC6fUVmUCAvq7q1mEWi5v6PfBOYEOQCnIv6f_mJkclk1oFfJ5ufHZVU90NwSfVGIH-uD_1MNilquc_VH31aQdBjqVHN0qxN1kDWm9RqZT71bNvQ-v_4EtOw',
    link: '#',
    year: '2024',
    order: 5,
    status: 'coming-soon',
    content: {
        es: {
            category: 'Mobiliario de Autor',
            heroDescription: 'Sillón de autor inspirado en principios aerodinámicos. Confort escultural.',
            client: 'Por definir',
            role: 'Diseñador Industrial',
            discipline: 'Mobiliario & Ergonomía',
        },
        en: {
            category: 'Signature Furniture',
            heroDescription: 'Designer lounge chair inspired by aerodynamic principles. Sculptural comfort.',
            client: 'TBD',
            role: 'Industrial Designer',
            discipline: 'Furniture & Ergonomics',
        }
    }
}
