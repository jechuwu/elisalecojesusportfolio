"use client"
import { motion } from "framer-motion"
import { useLanguage } from "./language-provider"

export function Footer() {
    const { t } = useLanguage()
    const currentYear = new Date().getFullYear()

    return (
        <motion.footer
            className="w-full py-12 md:py-16 bg-white dark:bg-[#121212] border-t border-black/5 dark:border-white/10 relative z-50 transition-colors duration-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 max-w-[1600px] mx-auto gap-6 md:gap-0">
                <div className="text-lg font-black tracking-tighter text-[#1b1c1b] dark:text-white font-headline">
                    <div className="logo-container inline-block">
                        <span className="text-[#FF4F00] font-black">J</span>esus
                        <span className="text-[#FF4F00] ml-1 font-black">E</span>lisaleco
                    </div>
                </div>
                <div className="flex gap-8 md:gap-10">
                    {/* TODO: Replace # with real social URLs */}
                    <a className="font-headline text-[10px] uppercase tracking-[0.2em] font-bold text-[#1b1c1b] dark:text-white opacity-40 hover:opacity-100 hover:text-[#FF4F00] dark:hover:text-[#FF4F00] transition-colors" href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a className="font-headline text-[10px] uppercase tracking-[0.2em] font-bold text-[#1b1c1b] dark:text-white opacity-40 hover:opacity-100 hover:text-[#FF4F00] dark:hover:text-[#FF4F00] transition-colors" href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a className="font-headline text-[10px] uppercase tracking-[0.2em] font-bold text-[#1b1c1b] dark:text-white opacity-40 hover:opacity-100 hover:text-[#FF4F00] dark:hover:text-[#FF4F00] transition-colors" href="#" target="_blank" rel="noopener noreferrer">Behance</a>
                </div>
                <p className="font-body text-[9px] uppercase tracking-widest opacity-30 font-medium dark:opacity-50 dark:text-white">
                    © {currentYear} Jesus Elisaleco Portfolio.
                </p>
            </div>
        </motion.footer>
    )
}
