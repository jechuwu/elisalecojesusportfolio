"use client"
import { useState, useMemo, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useLanguage } from "./language-provider"
import Link from "next/link"
import Image from "next/image"
import { TranslatedText } from "./translated-text"
import { usePageTransition } from "./page-transition-provider"
import { allProjects, tagLabels } from "@/content"
import type { ProjectData } from "@/content/projects/_schema"

const allTags = Object.keys(tagLabels)

export function ProjectsGallery({ expandedMode = false }: { expandedMode?: boolean }) {
    const { lang } = useLanguage()
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
        <section className={`${expandedMode ? 'py-8 md:py-12' : 'py-16 md:py-24'} bg-white dark:bg-[#121212] transition-colors duration-500`} id="projects">
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
                <div className={`hidden md:flex gap-4 ${expandedMode ? 'h-[700px]' : 'h-[600px]'} w-full`}>
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
