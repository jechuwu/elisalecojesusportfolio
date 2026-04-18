import type { Metadata } from 'next'
import ProjectsPageClient from './page-client'

export const metadata: Metadata = {
  title: 'Galería de Proyectos | Portfolio',
  description: 'Todos los proyectos de diseño industrial: producto, CMF, ergonomía, sistemas. Exploración de formas, materiales y lenguajes de diseño de alto impacto.',
  openGraph: {
    title: 'Galería de Proyectos — Jesus Elisaleco',
    description: 'Portfolio de diseño industrial. Proyectos de producto, CMF, ergonomía y sistemas.',
    type: 'website',
  },
}

export default function ProjectsPage() {
  return <ProjectsPageClient />
}
