"use client"
import { motion } from "framer-motion"
import { TranslatedText } from "./translated-text"

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

export function MetadataStrip() {
    return (
        <section className="bg-white dark:bg-[#121212] border-b border-black/5 dark:border-white/10 py-16 transition-colors duration-500">
            <motion.div className="max-w-[1600px] mx-auto px-6 md:px-16" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <motion.div variants={item}>
                        <TranslatedText translationKey="enfoque" className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2" />
                        <TranslatedText as="h3" translationKey="di_title" className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white" />
                    </motion.div>
                    <motion.div variants={item}>
                        <TranslatedText translationKey="experiencia" className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2" />
                        <h3 className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white">8+ Años</h3>
                    </motion.div>
                    <motion.div variants={item}>
                        <TranslatedText translationKey="reconocimiento" className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2" />
                        <h3 className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white">Red Dot Best 2023</h3>
                    </motion.div>
                    <motion.div variants={item}>
                        <TranslatedText translationKey="base" className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2" />
                        <TranslatedText as="h3" translationKey="location" className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
