"use client"
import { motion, useReducedMotion } from "framer-motion"
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/animations"

interface ScrollRevealProps {
    children: React.ReactNode
    className?: string
    delay?: number
}

export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
    const shouldReduceMotion = useReducedMotion()

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{
                duration: shouldReduceMotion ? 0 : 1.4,
                delay: shouldReduceMotion ? 0 : delay,
                ease: EASE_OUT_EXPO
            }}
        >
            {children}
        </motion.div>
    )
}
