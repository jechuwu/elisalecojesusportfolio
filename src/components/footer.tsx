"use client"
import { motion, useReducedMotion } from "framer-motion"
import { useLanguage } from "./language-provider"
import { EASE_OUT_EXPO, VIEWPORT_ONCE, DURATION } from "@/lib/animations"
import { SITE_META } from "@/config/site-meta"

export function Footer() {
    const currentYear = new Date().getFullYear()
    const shouldReduceMotion = useReducedMotion()
    const { instagram, linkedin, behance } = SITE_META.social

    return (
        <motion.footer
            className="w-full py-12 md:py-16 bg-white dark:bg-[#121212] border-t border-black/5 dark:border-white/10 relative z-50 transition-colors duration-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: shouldReduceMotion ? 0 : DURATION.layout, ease: EASE_OUT_EXPO }}
            aria-label="Site footer"
        >
            <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 max-w-[1600px] mx-auto gap-6 md:gap-0">
                <div className="text-lg font-black tracking-tighter text-[#1b1c1b] dark:text-white font-headline">
                    <div className="logo-container inline-block">
                        <span className="text-[#FF4F00] font-black">J</span>esus
                        <span className="text-[#FF4F00] ml-1 font-black">E</span>lisaleco
                    </div>
                </div>
                <nav className="flex gap-8 md:gap-10" aria-label="Social media links">
                    <a 
                        className="font-headline text-[10px] uppercase tracking-[0.2em] font-bold text-[#1b1c1b] dark:text-white opacity-40 hover:opacity-100 hover:text-[#FF4F00] dark:hover:text-[#FF4F00] transition-colors" 
                        href={instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Instagram (opens in a new tab)"
                    >
                        Instagram
                    </a>
                    <a 
                        className="font-headline text-[10px] uppercase tracking-[0.2em] font-bold text-[#1b1c1b] dark:text-white opacity-40 hover:opacity-100 hover:text-[#FF4F00] dark:hover:text-[#FF4F00] transition-colors" 
                        href={linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="LinkedIn (opens in a new tab)"
                    >
                        LinkedIn
                    </a>
                    <a 
                        className="font-headline text-[10px] uppercase tracking-[0.2em] font-bold text-[#1b1c1b] dark:text-white opacity-40 hover:opacity-100 hover:text-[#FF4F00] dark:hover:text-[#FF4F00] transition-colors" 
                        href={behance} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Behance (opens in a new tab)"
                    >
                        Behance
                    </a>
                </nav>
                <p className="font-body text-[9px] uppercase tracking-widest opacity-30 font-medium dark:opacity-50 dark:text-white">
                    © {currentYear} {SITE_META.siteTitle}
                </p>
            </div>
        </motion.footer>
    )
}
