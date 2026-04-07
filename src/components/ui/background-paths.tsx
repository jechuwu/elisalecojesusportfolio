"use client";

import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
        duration: 20 + i * 0.8,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-slate-950 dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: path.duration,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title,
    subtitle,
}: {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
}) {
    return (
        <div className="relative z-20 min-h-[80vh] w-full flex items-center justify-center overflow-hidden bg-white dark:bg-[#121212] transition-colors duration-700 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] border-b border-black/5 dark:border-white/5">
            <motion.div 
                className="absolute inset-0"
                initial={{ opacity: 0 }}

                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </motion.div>

            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center md:items-end h-full pt-32 pb-16">
                <div className="max-w-4xl text-left w-full">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="font-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-8 text-[#1b1c1b] dark:text-white drop-shadow-lg"
                    >
                        {title}
                    </motion.h1>

                    {subtitle && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="font-body text-base sm:text-lg md:text-xl text-[#1b1c1b]/80 dark:text-white/90 max-w-xl mb-0 leading-relaxed font-light drop-shadow-md"
                        >
                            {subtitle}
                        </motion.p>
                    )}
                </div>
            </div>
        </div>
    );
}
