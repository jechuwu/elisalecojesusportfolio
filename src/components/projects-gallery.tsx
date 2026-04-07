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
    const { t, lang } = useLanguage()
    const router = useRouter()
    const [activeId, setActiveId] = useState('lumix')
    const [activeTag, setActiveTag] = useState<string | null>(null)
    const [tagsOpen, setTagsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const { triggerTransition } = usePageTransition()
    const shouldReduceMotion = useReducedMotion()

    // Close dropdown on outside click
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
        if (project.link === '#') return // No transition for placeholder links

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
                    <div className="relative flex items-center gap-2" id="project-tag-filters" ref={dropdownRef}>
                        {/* Active tag pill */}
                        <button
                            onClick={() => { setActiveTag(null); setTagsOpen(false) }}
                            className="font-headline text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border transition-all duration-300 bg-[#FF4F00] border-[#FF4F00] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF4F00]"
                        >
                            {activeLabel}
                        </button>

                        {/* Three-dot trigger */}
                        <button
                            onClick={() => setTagsOpen(prev => !prev)}
                            aria-expanded={tagsOpen}
                            aria-controls="tag-dropdown-list"
                            aria-label="Toggle tag filters"
                            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF4F00] ${
                                tagsOpen
                                    ? 'border-[#FF4F00] text-[#FF4F00]'
                                    : 'border-[#1b1c1b]/20 dark:border-white/20 text-[#1b1c1b]/50 dark:text-white/50 hover:border-[#FF4F00] hover:text-[#FF4F00]'
                            }`}
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                                <circle cx="3" cy="7" r="1.3" />
                                <circle cx="7" cy="7" r="1.3" />
                                <circle cx="11" cy="7" r="1.3" />
                            </svg>
                        </button>

                        {/* Dropdown */}
                        <AnimatePresence>
                            {tagsOpen && (
                                <motion.div
                                    id="tag-dropdown-list"
                                    role="menu"
                                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: shouldReduceMotion ? 1 : 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: shouldReduceMotion ? 1 : 0.95 }}
                                    transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: EASE_OUT_EXPO }}
                                    className="absolute right-0 top-full mt-3 z-30 bg-white dark:bg-[#1a1a1a] border border-[#1b1c1b]/10 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-black/40 p-2 min-w-[160px]"
                                >
                                    <button
                                        role="menuitem"
                                        onClick={() => { setActiveTag(null); setTagsOpen(false) }}
                                        className={`w-full text-left font-headline text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF4F00] ${
                                            activeTag === null
                                                ? 'bg-[#FF4F00]/10 text-[#FF4F00]'
                                                : 'text-[#1b1c1b]/60 dark:text-white/60 hover:bg-[#1b1c1b]/5 dark:hover:bg-white/5 hover:text-[#1b1c1b] dark:hover:text-white'
                                        }`}
                                    >
                                        {lang === 'es' ? 'Todos' : 'All'}
                                    </button>
                                    {allTags.map(tag => (
                                        <button
                                            key={tag}
                                            role="menuitem"
                                            onClick={() => { setActiveTag(activeTag === tag ? null : tag); setTagsOpen(false) }}
                                            className={`w-full text-left font-headline text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF4F00] ${
                                                activeTag === tag
                                                    ? 'bg-[#FF4F00]/10 text-[#FF4F00]'
                                                    : 'text-[#1b1c1b]/60 dark:text-white/60 hover:bg-[#1b1c1b]/5 dark:hover:bg-white/5 hover:text-[#1b1c1b] dark:hover:text-white'
                                            }`}
                                        >
                                            {tagLabels[tag as keyof typeof tagLabels][lang as 'es' | 'en']}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Desktop: horizontal accordion */}
                <motion.div
                    className="hidden md:flex gap-4 h-[600px] w-full"
                    id="projects-gallery"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.2 }}
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => {
                            const isActive = activeId === project.id;
                            const hasLink = project.link !== '#'
                            const categoryText = project.content[lang as 'es' | 'en'].category;
                            
                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    data-project-card
                                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                                    transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: EASE_OUT_EXPO }}
                                    className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-[flex] duration-500 focus-within:ring-2 focus-within:ring-[#FF4F00] focus-within:ring-offset-2 ${isActive ? 'flex-[5]' : 'flex-[1]'}`}
                                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                                    onMouseEnter={() => setActiveId(project.id)}
                                    // Make it accessible for keyboard navigation:
                                    onFocus={() => setActiveId(project.id)}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            router.push(project.link)
                                        }
                                    }}
                                >
                                    {hasLink ? (
                                        <Link
                                            href={project.link}
                                            onClick={(e) => handleProjectClick(e, project)}
                                            onMouseEnter={() => router.prefetch(project.link)}
                                            className="absolute inset-0 z-10 rounded-2xl focus:outline-none"
                                            aria-label={project.title}
                                            tabIndex={-1} // Handled by parent wrapper for broader hit area
                                        />
                                    ) : (
                                        <div className="absolute inset-0 z-10" aria-label={project.title} />
                                    )}
                                    <Image
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        quality={90}
                                        className={`object-cover transition-transform duration-[1.5s] ${isActive ? 'scale-105 grayscale-0' : 'grayscale'}`}
                                        src={project.image}
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                                    <div className={`absolute bottom-0 left-0 p-8 text-white w-full transition-opacity duration-500 delay-100 whitespace-nowrap overflow-hidden ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                        <h4 className="font-headline text-3xl font-bold mb-2">{project.title}</h4>
                                        <p className="font-body text-white/70 text-xs uppercase tracking-wider">{categoryText}</p>
                                    </div>
                                    <div className={`absolute inset-0 flex items-end justify-center pb-8 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                                        <h4 className="font-headline text-white/50 font-bold tracking-widest uppercase [writing-mode:vertical-lr] rotate-180 mix-blend-difference">
                                            {project.shortName}
                                        </h4>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Mobile: vertical stacked cards */}
                <div className="flex md:hidden flex-col gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => {
                            const hasLink = project.link !== '#'
                            const categoryText = project.content[lang as 'es' | 'en'].category;
                            
                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    data-project-card
                                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                                    transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : index * 0.05 }}
                                >
                                    {hasLink ? (
                                        <Link
                                            href={project.link}
                                            onClick={(e) => handleProjectClick(e, project)}
                                            onMouseEnter={() => router.prefetch(project.link)}
                                            className="relative block h-[200px] rounded-2xl overflow-hidden group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF4F00]"
                                        >
                                            <Image
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                quality={85}
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                src={project.image}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                            <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                                                <h4 className="font-headline text-2xl font-bold mb-1">{project.title}</h4>
                                                <p className="font-body text-white/70 text-xs uppercase tracking-wider">{categoryText}</p>
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="relative block h-[200px] rounded-2xl overflow-hidden group" tabIndex={0}>
                                            <Image
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                quality={85}
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                src={project.image}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                            <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                                                <h4 className="font-headline text-2xl font-bold mb-1">{project.title}</h4>
                                                <p className="font-body text-white/70 text-xs uppercase tracking-wider">{categoryText}</p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
