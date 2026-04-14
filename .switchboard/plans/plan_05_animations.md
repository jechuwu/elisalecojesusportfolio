# Plan 5: Mejoras de las Animaciones
## Goal
Hacer que todas las animaciones críticas de scroll y micro-interacciones (hovers) adhieran a la convención estricta dictada en `advanced-animations` (EASE_OUT_EXPO y respeto a `useReducedMotion`).

## User Review Required
> [!NOTE]
> Las animaciones se sentirán más consistentes (curva `0.16, 1, 0.3, 1`) y unificadas. Se debe revisar la galería para asegurar que Framer Motion responde bien.

## Complexity Audit
### Routine
- Inyectar `EASE_OUT_EXPO` y duraciones en `transition` props a lo largo de componentes interactivos.
### Complex / Risky
- Condicionar lógicamente las variantes de animaciones basándose en `useReducedMotion` global.

## Edge-Case & Dependency Audit
- **Race Conditions:** Conflictos si Lenis fuerza re-render mientras Framer Motion calcula heights.
- **Dependencies & Conflicts:** Requiere importar de `src/lib/animations.ts`.

## Adversarial Synthesis
### Grumpy Critique
La interpolación con Framer Motion puede causar fugas de memoria gigantes en el DOM si dejas listeners activos y usas `whileInView` sin la propiedad `once`. ¡Se debe congelar la animación tras el primer trigger!
### Balanced Response
Aplicaremos `viewport={{ once: true, margin: "-50px" }}` como se documenta en el archivo de habilidades de animación de la arquitectura, garantizando suavidad y protegiendo el heap del DOM.

## Proposed Changes
> [!IMPORTANT]
> **MAXIMUM DETAIL REQUIRED:** Proporcionamos el código exacto.

### Target Component 1: Capabilities Animation Upgrade
#### MODIFY `src/components/capabilities.tsx`
- **Context:** En `src/components/capabilities.tsx` las animaciones hardcodeadas no están respetando la condición de accesibilidad de movimiento o la curva base.
- **Logic:** Incluir `useReducedMotion` desde framer-motion y `EASE_OUT_EXPO`, `VIEWPORT_ONCE` desde utils.
- **Implementation:**
```tsx
"use client"
import { motion, useReducedMotion } from "framer-motion"
import { useLanguage } from "./language-provider"
import { TranslatedText } from "./translated-text"
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/animations"

export function Capabilities() {
    const { lang } = useLanguage()
    const shouldReduceMotion = useReducedMotion()

    const container = {
        hidden: {},
        show: {
            transition: { staggerChildren: shouldReduceMotion ? 0 : 0.15 }
        }
    }

    const card = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
        show: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.7, ease: EASE_OUT_EXPO } }
    }

    return (
        <section className="py-20 md:py-32 bg-[#fafafa] dark:bg-[#181818] transition-colors duration-500" id="services">
            <div className="max-w-[1600px] mx-auto px-6 md:px-16">
                <motion.div
                    className="text-center mb-16 md:mb-24"
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT_ONCE}
                    variants={card}
                >
                    <TranslatedText translationKey="especialidad" className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-3 block font-bold" />
                    <TranslatedText as="h2" translationKey="capacidades" className="font-headline text-5xl font-bold tracking-tight text-[#1b1c1b] dark:text-white" />
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-12"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT_ONCE}
                >
                    <motion.div variants={card} className="bg-white dark:bg-[#121212] p-12 border border-black/5 dark:border-white/5 hover:shadow-2xl dark:hover:shadow-white/5 transition-all duration-500">
                        <span className="material-symbols-outlined text-3xl text-[#FF4F00] mb-8 font-light">architecture</span>
                        <TranslatedText as="h3" translationKey="di_conceptual" className="font-headline text-xl font-bold mb-6 text-[#1b1c1b] dark:text-white" />
                        <TranslatedText as="p" translationKey="di_desc" className="font-body text-[#1b1c1b]/60 dark:text-white/60 text-sm leading-relaxed mb-8 min-h-[60px]" />
                    </motion.div>

                    <motion.div variants={card} className="bg-white dark:bg-[#121212] p-12 border border-black/5 dark:border-white/5 hover:shadow-2xl dark:hover:shadow-white/5 transition-all duration-500">
                        <span className="material-symbols-outlined text-3xl text-[#FF4F00] mb-8 font-light">precision_manufacturing</span>
                        <TranslatedText as="h3" translationKey="cmf_title" className="font-headline text-xl font-bold mb-6 text-[#1b1c1b] dark:text-white" />
                        <TranslatedText as="p" translationKey="cmf_desc" className="font-body text-[#1b1c1b]/60 dark:text-white/60 text-sm leading-relaxed mb-8 min-h-[60px]" />
                    </motion.div>

                    <motion.div variants={card} className="bg-white dark:bg-[#121212] p-12 border border-black/5 dark:border-white/5 hover:shadow-2xl dark:hover:shadow-white/5 transition-all duration-500">
                        <span className="material-symbols-outlined text-3xl text-[#FF4F00] mb-8 font-light">memory</span>
                        <TranslatedText as="h3" translationKey="digital_title" className="font-headline text-xl font-bold mb-6 text-[#1b1c1b] dark:text-white" />
                        <TranslatedText as="p" translationKey="digital_desc" className="font-body text-[#1b1c1b]/60 dark:text-white/60 text-sm leading-relaxed mb-8 min-h-[60px]" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
```

## Verification Plan
### Automated Tests
- Simular en Chrome DevTools Settings `prefers-reduced-motion: reduce` y verificar inmovilidad condicional.
