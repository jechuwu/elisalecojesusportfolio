/**
 * Variantes de animación reutilizables para el portfolio.
 *
 * Centraliza las constantes de animación documentadas en el skill
 * advanced-animations para evitar duplicación en componentes.
 *
 * Uso:
 *   import { fadeInUp, staggerContainer, EASE_OUT_EXPO } from '@/lib/animations'
 *
 * Referencia del skill: advanced-animations
 */

/** Cubic-bezier estándar del portfolio — expo out */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** Viewport config estándar para whileInView */
export const VIEWPORT_ONCE = { once: true, margin: "-50px" as const }
export const VIEWPORT_ONCE_DEEP = { once: true, margin: "-80px" as const }

/** Durations */
export const DURATION = {
    fast: 0.2,
    normal: 0.3,
    medium: 0.5,
    slow: 0.7,
    layout: 0.6,
} as const

// ─── Scroll Reveal Variants ───

/** Fade in + slide up — para secciones y bloques de texto */
export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION.slow },
}

/** Fade in solo — para elementos sutiles */
export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: DURATION.slow },
}

/** Scale in — para cards y media */
export const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: EASE_OUT_EXPO },
}

// ─── Stagger Variants (para motion.div variants={}) ───

/** Container que aplica stagger a sus hijos */
export const staggerContainer = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.15 },
    },
}

/** Card hija de un stagger container */
export const staggerChild = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: DURATION.slow, ease: "easeOut" as const },
    },
}

/** Item de lista stagger más sutil */
export const staggerListItem = {
    hidden: { opacity: 0, x: 20 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: DURATION.normal },
    },
}

// ─── Page Transition Variants ───

/** Overlay que cubre la pantalla */
export const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
}

// ─── Mobile Menu Variants ───

/** Backdrop del menú mobile */
export const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}

/** Drawer panel del menú mobile */
export const drawerVariants = {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    transition: { duration: 0.4, ease: EASE_OUT_EXPO },
}

// ─── Helpers ───

/**
 * Genera transition props con el easing estándar del portfolio.
 */
export function expoTransition(duration = DURATION.slow) {
    return { duration, ease: EASE_OUT_EXPO }
}

/**
 * Genera delay props para stagger manual (sin variants).
 * @param index - Índice del elemento en la lista
 * @param baseDelay - Delay base antes de que empiece el stagger
 * @param staggerDelay - Delay entre cada elemento
 */
export function staggerDelay(index: number, baseDelay = 0.1, staggerDelay = 0.05) {
    return { duration: DURATION.normal, delay: baseDelay + index * staggerDelay }
}
