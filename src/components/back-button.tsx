"use client"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"

export function BackButton() {
    const shouldReduceMotion = useReducedMotion()

    return (
        <motion.div
            className="fixed top-6 left-6 md:top-10 md:left-10 z-[100]"
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
            <Link 
                href="/"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/10 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF4F00]"
                aria-label="Volver a la página principal"
            >
                <svg 
                    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
            </Link>
        </motion.div>
    )
}
