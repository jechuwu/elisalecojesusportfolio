"use client"
import { motion, useReducedMotion } from "framer-motion"

export function ScrollDownButton() {
    const shouldReduceMotion = useReducedMotion()

    const handleScrollDown = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        })
    }

    return (
        <motion.button
            onClick={handleScrollDown}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#1b1c1b] dark:bg-white text-white dark:text-[#1b1c1b] flex items-center justify-center transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF4F00]"
            aria-label="Scroll down to read case study"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
            <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
            </motion.div>
        </motion.button>
    )
}
