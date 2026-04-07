import type { ProjectData } from '../_schema'

export const lumix: ProjectData = {
    id: 'lumix',
    title: 'Lumix Pro X',
    shortName: 'Lumix',
    tags: ['optica', 'cmf', 'producto'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHNZPftCCF_h_NCNzJh75HCnxG_lz8HEygVl_BSe7c8BOqzt83bvnNEk_Q8h3Kq8Byj4kGsG3XhioHAzlWlWZvW5ztFzIuJOH_G3UHvy_ohVmp991R75ecADG5h0cPMBPGNqyn-QiDCHUr6MRHMGsL-PWaodl0C8ZsE6ruzx5JBk44kdF6n4zsq6xhsVuKi20GTT4D1W_a-AQFJ6uTx0DQx9X6hAhI8uYhbpwN2zF0L7XURRapC4klDNyQ-UZLrGX-fSUUdwNIYwI',
    link: '/projects/lumix',
    year: '2023 - 2024',
    order: 1,
    status: 'published',
    content: {
        es: {
            category: 'Ingeniería Óptica & CMF',
            heroDescription: 'Redefiniendo el sistema visual profesional. Un riguroso viaje desde el diseño conceptual, optimización acústica, hasta la ingeniería de precisión.',
            client: 'Lumix Corp',
            role: 'Diseño Industrial Jefe',
            discipline: 'CMF & Ingeniería Óptica',
            sections: [
                {
                    tag: '1. El Desafío',
                    title: 'Equilibrar el peso, disipar el calor y mantener el lujo.',
                    paragraphs: [
                        'Las cámaras de formato medio actuales sufren de asimetría térmica y problemas severos de peso. Nuestro objetivo en "Lumix Pro X" era tomar el cuerpo hiper-confiable que todos los fotógrafos de cine aprecian y evolucionarlo para resistir sesiones continuas en rigurosos desiertos de 50°C.',
                        'No queríamos construir solo un marco de magnesio; queríamos una aleación termo-reactiva en la que la cámara respire sin partes móviles (que introducen ruidos y vulnerabilidades).'
                    ]
                },
                {
                    tag: '2. Ideación',
                    title: 'Sketches y Primeros Prototipos',
                    paragraphs: [],
                    images: [
                        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1517409217036-7c6de425dd9f?q=80&w=1600&auto=format&fit=crop'
                    ]
                },
                {
                    tag: '3. Producción y CMF',
                    title: 'Aleaciones con alma. Texturas en negro mate.',
                    paragraphs: [
                        'Definimos una paleta CMF de alto contraste que prioriza el agarre. La montura central está maquinada en titanio grado aéreo, y el cuerpo está cubierto de nuestro polímero de uretano exclusivo de poros abiertos. Esto previene un agarre resbaladizo, maximiza el amortiguamiento acústico para las partes internas y se siente increíble al tacto.'
                    ]
                }
            ]
        },
        en: {
            category: 'Optical Engineering & CMF',
            heroDescription: 'Redefining the professional visual system. A rigorous journey from conceptual design, acoustic optimization, to precision engineering.',
            client: 'Lumix Corp',
            role: 'Lead Industrial Design',
            discipline: 'CMF & Optical Engineering',
            sections: [
                {
                    tag: '1. The Challenge',
                    title: 'Balancing weight, dissipating heat, and maintaining luxury.',
                    paragraphs: [
                        'Current medium-format cameras suffer from thermal asymmetry and severe weight issues. Our goal with the "Lumix Pro X" was to take the hyper-reliable body that all cinema photographers cherish and evolve it to withstand continuous shoots in rigorous 50°C deserts.',
                        'We didn\'t just want to build a magnesium frame; we wanted a thermo-reactive alloy where the camera breathes without moving parts (which introduce noise and vulnerabilities).'
                    ]
                },
                {
                    tag: '2. Ideation',
                    title: 'Sketches and Early Prototypes',
                    paragraphs: [],
                    images: [
                        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1517409217036-7c6de425dd9f?q=80&w=1600&auto=format&fit=crop'
                    ]
                },
                {
                    tag: '3. Production and CMF',
                    title: 'Alloys with soul. Matte black textures.',
                    paragraphs: [
                        'We defined a high-contrast CMF palette that prioritizes grip. The central mount is machined from aerospace-grade titanium, and the body is covered in our exclusive open-pore urethane polymer. This prevents slippery grips, maximizes acoustic dampening for internal parts, and feels incredible to the touch.'
                    ]
                }
            ]
        }
    }
}
