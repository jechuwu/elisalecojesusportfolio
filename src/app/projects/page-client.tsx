"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { TranslatedText } from "@/components/translated-text"
import { usePageTransition } from "@/components/page-transition-provider"
import { allProjects, tagLabels } from "@/content"
import type { ProjectData } from "@/content/projects/_schema"
import { EASE_OUT_EXPO, DURATION } from "@/lib/animations"

const allTags = Object.keys(tagLabels)

export default function ProjectsPageClient() {
  const { lang } = useLanguage()
  const { triggerTransition } = usePageTransition()
  const shouldReduceMotion = useReducedMotion()
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!activeTag) return allProjects
    return allProjects.filter(p => p.tags.includes(activeTag))
  }, [activeTag])

  const handleClick = (e: React.MouseEvent, project: ProjectData) => {
    if (project.link === "#") return
    e.preventDefault()
    const cardEl = (e.currentTarget as HTMLElement).closest("[data-card]") as HTMLElement
    if (cardEl) {
      triggerTransition(project.image, project.link, cardEl.getBoundingClientRect())
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#121212] transition-colors duration-500">

      {/* ── Hero header ───────────────────────────────── */}
      <section className="pt-40 pb-16 md:pt-52 md:pb-20 bg-white dark:bg-[#121212]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : DURATION.slow, ease: EASE_OUT_EXPO }}
          >
            <TranslatedText
              translationKey="selectedWorks"
              className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-4 block font-bold"
            />
            <TranslatedText
              as="h1"
              translationKey="portfolioTitle"
              className="font-headline text-6xl md:text-8xl font-extrabold tracking-tighter text-[#1b1c1b] dark:text-white leading-none"
            />
          </motion.div>

          {/* ── Tag filters ─────────────────────────── */}
          <motion.div
            className="flex flex-wrap gap-2 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : DURATION.slow, delay: 0.15, ease: EASE_OUT_EXPO }}
          >
            <button
              onClick={() => setActiveTag(null)}
              className={`font-headline text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border transition-all duration-300 ${
                activeTag === null
                  ? "bg-[#FF4F00] border-[#FF4F00] text-white"
                  : "bg-transparent border-[#1b1c1b]/20 dark:border-white/20 text-[#1b1c1b]/60 dark:text-white/60 hover:border-[#FF4F00]/40 hover:text-[#FF4F00]"
              }`}
            >
              {lang === "es" ? "Todos" : "All"}
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`font-headline text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border transition-all duration-300 ${
                  activeTag === tag
                    ? "bg-[#FF4F00] border-[#FF4F00] text-white"
                    : "bg-transparent border-[#1b1c1b]/20 dark:border-white/20 text-[#1b1c1b]/60 dark:text-white/60 hover:border-[#FF4F00]/40 hover:text-[#FF4F00]"
                }`}
              >
                {tagLabels[tag][lang as "es" | "en"]}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Project grid ──────────────────────────────── */}
      <section className="pb-32 bg-white dark:bg-[#121212]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeTag ?? "all"}
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1b1c1b]/5 dark:bg-white/5 border border-[#1b1c1b]/5 dark:border-white/5"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  data-card
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: i * 0.04 }}
                  className="group relative bg-white dark:bg-[#121212] overflow-hidden"
                >
                  <Link
                    href={project.link}
                    onClick={e => handleClick(e, project)}
                    className="block"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f5f7] dark:bg-[#1a1a1a]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={i < 3}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />
                      {/* View label on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-headline text-[10px] font-bold uppercase tracking-[0.25em] text-white border border-white/60 px-5 py-2 rounded-full backdrop-blur-sm">
                          {lang === "es" ? "Ver Proyecto" : "View Project"}
                        </span>
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="px-6 py-5 flex items-start justify-between gap-4 border-t border-[#1b1c1b]/5 dark:border-white/5">
                      <div>
                        <h2 className="font-headline text-base font-bold text-[#1b1c1b] dark:text-white group-hover:text-[#FF4F00] transition-colors duration-300">
                          {project.title}
                        </h2>
                        <p className="font-body text-[11px] text-[#1b1c1b]/50 dark:text-white/40 mt-0.5">
                          {project.content[lang as "es" | "en"].category}
                        </p>
                      </div>
                      <span className="font-body text-[10px] text-[#1b1c1b]/30 dark:text-white/30 shrink-0 pt-0.5">
                        {project.year}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="py-32 text-center">
              <p className="font-body text-sm text-[#1b1c1b]/40 dark:text-white/40">
                {lang === "es" ? "Sin proyectos para este filtro." : "No projects for this filter."}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
