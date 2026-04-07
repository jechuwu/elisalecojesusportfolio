"use client"
import { motion } from "framer-motion"
import { TranslatedText } from "./translated-text"

export function CtaSection() {
    return (
        <section className="py-24 md:py-40 bg-[#f5f5f0] dark:bg-[#0a0a0a] text-[#1b1c1b] dark:text-white transition-colors duration-500" id="contact">
            <div className="max-w-[1600px] mx-auto px-6 md:px-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <TranslatedText as="h2" translationKey="ctaTitle" className="font-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-12 md:mb-16 leading-[1.1]" />
                </motion.div>
                
                <motion.div
                    className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <a className="font-headline text-xl sm:text-2xl md:text-3xl font-bold hover:text-[#FF4F00] transition-colors border-b-2 border-[#FF4F00]/30 pb-1 break-all sm:break-normal" href="mailto:hola@jesuselisaleco.com">
                        hola@jesuselisaleco.com
                    </a>
                    <button className="bg-[#FF4F00] text-white px-10 py-5 md:px-14 md:py-6 font-headline font-bold text-xs tracking-widest uppercase hover:bg-[#1b1c1b] dark:hover:bg-white dark:hover:text-[#1b1c1b] transition-all duration-300 shadow-xl hover:shadow-[#1b1c1b]/10 dark:hover:shadow-white/20">
                        <TranslatedText translationKey="startProject" />
                    </button>
                </motion.div>
            </div>
        </section>
    )
}
