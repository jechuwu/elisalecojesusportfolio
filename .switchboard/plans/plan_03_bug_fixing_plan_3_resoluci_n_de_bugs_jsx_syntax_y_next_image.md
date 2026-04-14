# Plan 3: Resolución de Bugs (JSX Syntax y Next/Image)

## Goal
Restaurar los componentes accidentalmente eliminados `projects-gallery.tsx` y `metadata-strip.tsx`, y solucionar los errores críticos de construcción: el error de parseo `Expected '</', got 'jsx text'` en `projects-gallery.tsx` y los warnings de performance `missing "sizes" prop` en los componentes de `next/image`.

## Metadata
**Tags:** frontend, bugfix
**Complexity:** 4

## User Review Required
> [!NOTE]
> Se restaurará la grilla principal de proyectos y el strip de metadata en el Home. Por favor, verificar visualmente que el layout sea consistente con el diseño previo y que las imágenes carguen correctamente con las nuevas optimizaciones de LCP.

## Complexity Audit
### Routine
- Restauración de `src/components/metadata-strip.tsx` desde el historial de Git (HEAD).
- Agregar prop `sizes` a cualquier componente `<Image />` remanente que lo requiera.
### Complex / Risky
- Restauración y depuración de `src/components/projects-gallery.tsx`: Corregir el árbol DOM malformado de JSX dentro de `AnimatePresence`. *Clarificación: El error de parseo suele ocurrir por texto o comentarios fuera de bloques válidos en el render.*

## Edge-Case & Dependency Audit
- **Race Conditions:** N/A.
- **Security:** N/A.
- **Side Effects:** Romper la animación de salida (exit animation) si `AnimatePresence` envuelve un fragmento o componente mal cerrado.
- **Dependencies & Conflicts:** Depende de la galería de Framer Motion. Conflicto potencial si se realizan refactors simultáneos en la estructura de `src/components`.

## Adversarial Synthesis
### Grumpy Critique
¡Han borrado archivos críticos y ahora pretenden arreglarlo con un parche! El error "Expected '</', got 'jsx text'" es síntoma de un copy-paste descuidado. Y sobre `next/image`, no basta con poner `sizes="100vw"`, hay que entender que si la imagen ocupa 1/3 de la pantalla en desktop, el linter va a seguir quejándose de la eficiencia. ¡Hagan las cosas bien o no las hagan!
### Balanced Response
Para asegurar una recuperación sólida, restauraremos los archivos desde `HEAD` y aplicaremos correcciones de sintaxis quirúrgicas. En `projects-gallery.tsx`, eliminaremos cualquier ruido sintáctico (comentarios mal posicionados) y aplicaremos `priority={index === 0}` para mejorar el LCP de la galería, cumpliendo con el `SKILL.md` de optimización de imágenes.

## Proposed Changes
> [!IMPORTANT]
> **MAXIMUM DETAIL REQUIRED:** Proporcionamos el bloque completo de la corrección.

### Step 1: Restauración y Fix de Projects Gallery
#### CREATE `src/components/projects-gallery.tsx`
- **Context:** El archivo está vacío y reporta errores de parseo en logs previos.
- **Logic:** Re-instanciar el componente con la lógica de filtrado y el acordeón horizontal, aplicando `priority` y `sizes` correctos.
- **Implementation:**
```tsx
"use client"
import { useState, useMemo, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useLanguage } from "./language-provider"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { TranslatedText } from "./translated-text"
import { usePageTransition } from "./page-transition-provider"
import { allProjects, tagLabels } from "@/content"
import type { ProjectData } from "@/content/projects/_schema"
import { EASE_OUT_EXPO } from "@/lib/animations"

const allTags = Object.keys(tagLabels)

export function ProjectsGallery() {
    const { lang } = useLanguage()
    const router = useRouter()
    const [activeId, setActiveId] = useState('lumix')
    const [activeTag, setActiveTag] = useState<string | null>(null)
    const [tagsOpen, setTagsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const { triggerTransition } = usePageTransition()
    const shouldReduceMotion = useReducedMotion()

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setTagsOpen(false)
            }
        }
        if (tagsOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [tagsOpen])

    const filteredProjects = useMemo(() => {
        if (!activeTag) return allProjects
        return allProjects.filter(p => p.tags.includes(activeTag))
    }, [activeTag])

    const activeLabel = activeTag ? tagLabels[activeTag as keyof typeof tagLabels][lang as 'es' | 'en'] : (lang === 'es' ? 'Todos' : 'All')

    const handleProjectClick = useCallback((e: React.MouseEvent, project: ProjectData) => {
        if (project.link === '#') return 
        e.preventDefault()
        const cardEl = (e.currentTarget as HTMLElement).closest('[data-project-card]') as HTMLElement
        if (cardEl) {
            const rect = cardEl.getBoundingClientRect()
            triggerTransition(project.image, project.link, rect)
        }
    }, [triggerTransition])

    return (
        <section className="py-16 md:py-24 bg-white dark:bg-[#121212] transition-colors duration-500" id="projects">
            <div className="max-w-[1600px] mx-auto px-6 md:px-16">
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-baseline mb-12 md:mb-16 gap-4"
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
                >
                    <div>
                        <TranslatedText translationKey="selectedWorks" className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-3 block font-bold" />
                        <TranslatedText as="h2" translationKey="portfolioTitle" className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-[#1b1c1b] dark:text-white" />
                    </div>
                    <div className="relative flex items-center gap-2" ref={dropdownRef}>
                        <button
                            onClick={() => { setActiveTag(null); setTagsOpen(false) }}
                            className="font-headline text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border transition-all duration-300 bg-[#FF4F00] border-[#FF4F00] text-white"
                        >
                            {activeLabel}
                        </button>
                        <button
                            onClick={() => setTagsOpen(prev => !prev)}
                            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${tagsOpen ? 'border-[#FF4F00] text-[#FF4F00]' : 'border-[#1b1c1b]/20 dark:border-white/20'}`}
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><circle cx="3" cy="7" r="1.3" /><circle cx="7" cy="7" r="1.3" /><circle cx="11" cy="7" r="1.3" /></svg>
                        </button>
                        <AnimatePresence>
                            {tagsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    className="absolute right-0 top-full mt-3 z-30 bg-white dark:bg-[#1a1a1a] border border-[#1b1c1b]/10 dark:border-white/10 rounded-2xl shadow-xl p-2 min-w-[160px]"
                                >
                                    {allTags.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => { setActiveTag(tag); setTagsOpen(false) }}
                                            className="w-full text-left font-headline text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-[#FF4F00]/10"
                                        >
                                            {tagLabels[tag][lang as 'es' | 'en']}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Desktop: horizontal accordion */}
                <div className="hidden md:flex gap-4 h-[600px] w-full">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => {
                            const isActive = activeId === project.id;
                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    data-project-card
                                    className={`relative rounded-2xl overflow-hidden cursor-pointer transition-[flex] duration-500 ${isActive ? 'flex-[5]' : 'flex-[1]'}`}
                                    onMouseEnter={() => setActiveId(project.id)}
                                >
                                    <Image
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        priority={index === 0}
                                        className={`object-cover ${isActive ? 'grayscale-0' : 'grayscale'}`}
                                        src={project.image}
                                    />
                                    {isActive && (
                                        <Link href={project.link} onClick={(e) => handleProjectClick(e, project)} className="absolute inset-0 z-10" />
                                    )}
                                    <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                                        <h4 className="font-headline text-3xl font-bold">{project.title}</h4>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>

                {/* Mobile: vertical stacked cards */}
                <div className="flex md:hidden flex-col gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div key={project.id} layout data-project-card>
                                <Link href={project.link} onClick={(e) => handleProjectClick(e, project)} className="relative block h-[200px] rounded-2xl overflow-hidden">
                                    <Image
                                        alt={project.title}
                                        fill
                                        sizes="100vw"
                                        priority={index === 0}
                                        src={project.image}
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                                        <h4 className="font-headline text-2xl font-bold">{project.title}</h4>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
```

### Step 2: Restauración de Metadata Strip
#### CREATE `src/components/metadata-strip.tsx`
- **Context:** Componente informativo del Home eliminado accidentalmente.
- **Logic:** Re-instanciar el componente con las variantes de animación y textos traducidos.
- **Implementation:**
```tsx
"use client"
import { motion } from "framer-motion"
import { TranslatedText } from "./translated-text"

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

export function MetadataStrip() {
    return (
        <section className="bg-white dark:bg-[#121212] border-b border-black/5 dark:border-white/10 py-16 transition-colors duration-500">
            <motion.div className="max-w-[1600px] mx-auto px-6 md:px-16" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <motion.div variants={item}>
                        <TranslatedText translationKey="enfoque" className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2" />
                        <TranslatedText as="h3" translationKey="di_title" className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white" />
                    </motion.div>
                    <motion.div variants={item}>
                        <TranslatedText translationKey="experiencia" className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2" />
                        <h3 className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white">8+ Años</h3>
                    </motion.div>
                    <motion.div variants={item}>
                        <TranslatedText translationKey="reconocimiento" className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2" />
                        <h3 className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white">Red Dot Best 2023</h3>
                    </motion.div>
                    <motion.div variants={item}>
                        <TranslatedText translationKey="base" className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2" />
                        <TranslatedText as="h3" translationKey="location" className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
```

## Verification Plan
### Automated Tests
- Ejecutar `npm run dev` y confirmar que el Home renderiza correctamente ambos componentes.
- Verificar en la pestaña Network que las imágenes de la galería usan `priority` y el tamaño adecuado.

## Agent Recommendation
Send to Coder
