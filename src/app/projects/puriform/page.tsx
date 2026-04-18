"use client"

import { motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { TranslatedText } from "@/components/translated-text"
import { useLanguage } from "@/components/language-provider"
import { EASE_OUT_EXPO, VIEWPORT_ONCE, DURATION } from "@/lib/animations"

/* ─── DATA: processes, components, assembly ─── */

const PROCESS_KEYS = [
  "puriformProcessCorteLaser",
  "puriformProcessPlegado",
  "puriformProcessTermoformado",
  "puriformProcessSoldadura",
  "puriformProcessPegado",
  "puriformProcessMecanizado",
  "puriformProcessEmbutido",
] as const

const COMPONENT_KEYS = [
  "puriformCompChapaCarcasa",
  "puriformCompTermoFrontal",
  "puriformCompTermoTapaFijo",
  "puriformCompChasis",
  "puriformCompApoyavasos",
] as const

const ASSEMBLY_STEP_KEYS = [
  "puriformAssemblyStep1",
  "puriformAssemblyStep2",
  "puriformAssemblyStep3",
  "puriformAssemblyStep4",
  "puriformAssemblyStep5",
  "puriformAssemblyStep6",
  "puriformAssemblyStep7",
  "puriformAssemblyStep8",
  "puriformAssemblyStep9",
  "puriformAssemblyStep10",
] as const

/* ─── Placeholder component for missing assets ─── */
function ImagePlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`bg-[#e5e5e5] dark:bg-[#2a2a2a] flex items-center justify-center ${className}`}
    >
      <span className="font-body text-[10px] uppercase tracking-widest text-[#1b1c1b]/30 dark:text-white/30 font-semibold text-center px-4">
        {label}
      </span>
    </div>
  )
}

export default function PuriformProjectPage() {
  const shouldReduceMotion = useReducedMotion()
  const { t } = useLanguage()

  const fadeUp = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT_ONCE,
    transition: { duration: shouldReduceMotion ? 0 : DURATION.slow, ease: EASE_OUT_EXPO },
  }

  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-[#121212] transition-colors duration-500">

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: HERO — Full viewport with hero-shot.png
          ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[100vh]">
        <Image
          src="/images/projects/puriform/hero-shot.png"
          alt="PuriForm — Purificador de agua doméstico"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end pb-24">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16 w-full">
            <TranslatedText
              translationKey="caseStudy"
              className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-6 block font-bold"
            />
            <h1 className="font-headline text-7xl md:text-9xl font-extrabold tracking-tighter leading-none mb-8 text-white">
              PuriForm<span className="text-[#FF4F00]">.</span>
            </h1>
            <TranslatedText
              as="p"
              translationKey="puriformHeroDesc"
              className="font-body text-xl md:text-2xl text-white/75 max-w-3xl leading-relaxed font-light"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: METADATA STRIP
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-[#121212] border-b border-[#1b1c1b]/5 dark:border-white/5 py-12">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* CLIENTE */}
            <div>
              <TranslatedText
                translationKey="client"
                className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2"
              />
              <h3 className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white">
                FADU, UBA.
              </h3>
            </div>
            {/* ROL */}
            <div>
              <TranslatedText
                translationKey="role"
                className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2"
              />
              <TranslatedText
                as="h3"
                translationKey="roleDesc"
                className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white"
              />
            </div>
            {/* DISCIPLINA */}
            <div>
              <TranslatedText
                translationKey="discipline"
                className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2"
              />
              <h3 className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white">
                {t("puriformHeroDesc") === "Un purificador de agua diseñado para elevar la experiencia diaria en el hogar."
                  ? <>Desarrollo de producto<br />Electrodomésticos</>
                  : <>Product Development<br />Home Appliances</>
                }
              </h3>
            </div>
            {/* AÑO */}
            <div>
              <TranslatedText
                translationKey="year"
                className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2"
              />
              <h3 className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white">
                2024
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: EL DESAFÍO — 4+8 grid + 3 renders
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 bg-white dark:bg-[#121212]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            {/* Left col: tag + title */}
            <motion.div className="md:col-span-4" {...fadeUp}>
              <TranslatedText
                translationKey="puriformChallenge1Tag"
                className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-4 block font-bold"
              />
              <TranslatedText
                as="h2"
                translationKey="puriformChallenge1Title"
                className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-[#1b1c1b] dark:text-white leading-tight"
              />
            </motion.div>

            {/* Right col: paragraphs */}
            <motion.div
              className="md:col-span-8"
              {...fadeUp}
              transition={{ duration: shouldReduceMotion ? 0 : DURATION.slow, delay: 0.1, ease: EASE_OUT_EXPO }}
            >
              <TranslatedText
                as="p"
                translationKey="puriformChallenge1P1"
                className="font-body text-base md:text-lg text-[#1b1c1b]/60 dark:text-white/60 leading-relaxed mb-6"
              />
              <TranslatedText
                as="p"
                translationKey="puriformChallenge1P2"
                className="font-body text-base md:text-lg text-[#1b1c1b]/60 dark:text-white/60 leading-relaxed"
              />
            </motion.div>
          </div>

          {/* 3 renders side by side — matching PDF layout */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 md:mt-20"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: EASE_OUT_EXPO }}
          >
            {[
              { src: "/images/projects/puriform/render-3.png", alt: "PuriForm vista superior" },
              { src: "/images/projects/puriform/render-4.png", alt: "PuriForm detalle panel" },
              { src: "/images/projects/puriform/render-5.png", alt: "PuriForm detalle base" },
            ].map(({ src, alt }) => (
              <div key={src} className="aspect-[4/3] relative overflow-hidden bg-[#f5f5f7] dark:bg-[#1a1a1a]">
                <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: IDEACIÓN — Dark bg, UI render + sketches
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 bg-[#121212] text-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          {/* Header */}
          <motion.div className="mb-12 md:mb-16" {...fadeUp}>
            <TranslatedText
              translationKey="puriformIdeationTag"
              className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-3 block font-bold"
            />
            <TranslatedText
              as="h2"
              translationKey="puriformIdeationTitle"
              className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-white"
            />
          </motion.div>

          {/* Main grid: UI render + Bocetos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* UI Interface render */}
            <motion.div
              className="aspect-[4/5] bg-[#0a0a0a] overflow-hidden relative flex items-center justify-center"
              {...fadeUp}
            >
              <Image
                src="/images/projects/puriform/render-2.png"
                alt="PuriForm UI interface"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Interface overlay label */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <span className="font-headline text-xs uppercase tracking-widest text-white/50 font-bold">
                  Interface — MENU PRINCIPAL
                </span>
              </div>
            </motion.div>

            {/* Bocetos digitalizados */}
            <motion.div
              className="aspect-[4/5] bg-white overflow-hidden relative"
              {...fadeUp}
              transition={{ duration: shouldReduceMotion ? 0 : DURATION.slow, delay: 0.15, ease: EASE_OUT_EXPO }}
            >
              <Image
                src="/images/projects/puriform/bocetos.png"
                alt="Bocetos digitalizados PuriForm"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-8"
              />
            </motion.div>
          </div>

          {/* 4 sketch detail thumbnails — PDF shows 4 small sketches below the main grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: EASE_OUT_EXPO }}
          >
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-[4/3] relative overflow-hidden bg-[#1a1a1a]">
                <ImagePlaceholder
                  label={`sketch-detail-${i}.png`}
                  className="w-full h-full"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: PRODUCCIÓN Y CMF — Processes + Components
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 bg-white dark:bg-[#121212]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          {/* Header */}
          <motion.div className="mb-12 md:mb-16" {...fadeUp}>
            <TranslatedText
              translationKey="puriformCMFTag"
              className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-3 block font-bold"
            />
            <TranslatedText
              as="h2"
              translationKey="puriformCMFTitle"
              className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-[#1b1c1b] dark:text-white"
            />
          </motion.div>

          {/* Content: Left (processes + components) / Right (render) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Left column: processes and components */}
            <div className="md:col-span-7">
              {/* Manufacturing process icons — 7 items */}
              <motion.div
                className="grid grid-cols-4 md:grid-cols-7 gap-4 mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
              >
                {PROCESS_KEYS.map((key, i) => (
                  <motion.div
                    key={key}
                    className="flex flex-col items-center gap-3 text-center"
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT_ONCE}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: i * 0.06, ease: EASE_OUT_EXPO }}
                  >
                    {/* Icon placeholder */}
                    <div className="w-14 h-14 bg-[#f5f5f7] dark:bg-[#1f1f1f] border border-[#1b1c1b]/5 dark:border-white/5 flex items-center justify-center">
                      <ImagePlaceholder label="icon" className="w-full h-full" />
                    </div>
                    <TranslatedText
                      translationKey={key}
                      className="font-body text-[9px] md:text-[10px] uppercase tracking-wider text-[#1b1c1b]/60 dark:text-white/60 font-semibold leading-tight"
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Part components — 5 items */}
              <motion.div
                className="grid grid-cols-3 md:grid-cols-5 gap-4"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: EASE_OUT_EXPO }}
              >
                {COMPONENT_KEYS.map((key) => (
                  <div key={key} className="flex flex-col items-center gap-3">
                    <div className="aspect-square w-full relative bg-[#f5f5f7] dark:bg-[#1f1f1f] overflow-hidden">
                      <ImagePlaceholder
                        label={key.replace("puriformComp", "")}
                        className="w-full h-full"
                      />
                    </div>
                    <TranslatedText
                      translationKey={key}
                      className="font-body text-[9px] md:text-[10px] uppercase tracking-wider text-[#1b1c1b]/60 dark:text-white/60 font-semibold text-center leading-tight"
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right column: main product render with screen */}
            <motion.div
              className="md:col-span-5 relative overflow-hidden bg-[#f5f5f7] dark:bg-[#1a1a1a] min-h-[400px] md:min-h-0"
              {...fadeUp}
              transition={{ duration: shouldReduceMotion ? 0 : DURATION.slow, delay: 0.2, ease: EASE_OUT_EXPO }}
            >
              <ImagePlaceholder
                label="render-cmf-main.png"
                className="w-full h-full absolute inset-0"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6: DESARROLLO DE PRODUCTO — 10-step Assembly
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 bg-[#fafafa] dark:bg-[#181818]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16">
          {/* Header */}
          <motion.div className="mb-12 md:mb-16" {...fadeUp}>
            <TranslatedText
              translationKey="puriformDevTag"
              className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-3 block font-bold"
            />
            <TranslatedText
              as="h2"
              translationKey="puriformDevTitle"
              className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-[#1b1c1b] dark:text-white"
            />
          </motion.div>

          {/* 10-step assembly grid: 5 cols × 2 rows */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {ASSEMBLY_STEP_KEYS.map((key, i) => (
              <motion.div
                key={key}
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: i * 0.05, ease: EASE_OUT_EXPO }}
              >
                {/* Step thumbnail placeholder */}
                <div className="aspect-[4/3] relative bg-white dark:bg-[#1f1f1f] border border-[#1b1c1b]/5 dark:border-white/5 overflow-hidden">
                  <ImagePlaceholder
                    label={`assembly-step-${i + 1}.png`}
                    className="w-full h-full"
                  />
                </div>

                {/* Step number + description */}
                <div className="flex items-start gap-2">
                  <span
                    className="w-6 h-6 rounded-full bg-[#FF4F00] flex items-center justify-center font-headline text-[10px] font-bold text-white shrink-0 mt-0.5"
                  >
                    {i + 1}
                  </span>
                  <TranslatedText
                    translationKey={key}
                    className="font-body text-[10px] md:text-xs text-[#1b1c1b]/60 dark:text-white/60 leading-snug"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7: FULL-WIDTH CLOSING RENDER
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-[#121212]">
        <motion.div
          className="w-full aspect-[16/9] relative overflow-hidden bg-[#f5f5f7] dark:bg-[#1a1a1a]"
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: shouldReduceMotion ? 0 : 1.1, ease: EASE_OUT_EXPO }}
        >
          <Image
            src="/images/projects/puriform/render-1.png"
            alt="PuriForm producto final"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          NEXT PROJECT NAVIGATION
          ═══════════════════════════════════════════════════════ */}
      <Link
        href="/projects/lumix"
        className="py-24 bg-[#fafafa] dark:bg-[#181818] border-t border-[#1b1c1b]/5 dark:border-white/5 text-center transition-colors hover:bg-[#FF4F00] dark:hover:bg-[#FF4F00] hover:text-white dark:hover:text-white group cursor-pointer block"
      >
        <div className="max-w-[1600px] mx-auto px-16">
          <TranslatedText
            translationKey="nextProject"
            className="font-body text-[10px] tracking-[0.3em] uppercase opacity-50 mb-4 block font-bold transition-opacity group-hover:opacity-100"
          />
          <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tight transition-transform group-hover:translate-x-4 inline-block text-[#1b1c1b] dark:text-white group-hover:text-white">
            Lumix Pro X &rarr;
          </h2>
        </div>
      </Link>
    </main>
  )
}
