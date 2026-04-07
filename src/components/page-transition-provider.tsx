"use client"

import React, { createContext, useContext, useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

interface TransitionState {
    isActive: boolean
    imageUrl: string
    rect: DOMRect | null
    targetHref: string
}

interface PageTransitionContextType {
    triggerTransition: (imageUrl: string, targetHref: string, cardRect: DOMRect) => void
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined)

export function usePageTransition() {
    const context = useContext(PageTransitionContext)
    if (!context) throw new Error("usePageTransition must be used within PageTransitionProvider")
    return context
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [transition, setTransition] = useState<TransitionState>({
        isActive: false,
        imageUrl: "",
        rect: null,
        targetHref: "",
    })
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const triggerTransition = useCallback((imageUrl: string, targetHref: string, cardRect: DOMRect) => {
        setTransition({
            isActive: true,
            imageUrl,
            rect: cardRect,
            targetHref,
        })

        // Start navigation early to hide loading time
        setTimeout(() => {
            router.push(targetHref)
        }, 250)

        // Hide overlay smoothly after zoom is definitely complete
        timeoutRef.current = setTimeout(() => {
            setTransition(prev => ({ ...prev, isActive: false }))
        }, 1000)
    }, [router])

    return (
        <PageTransitionContext.Provider value={{ triggerTransition }}>
            {children}
            <AnimatePresence>
                {transition.isActive && transition.rect && (
                    <motion.div
                        className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Dark overlay */}
                        <motion.div
                            className="absolute inset-0 bg-black"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        />

                        {/* Zooming image */}
                        <motion.div
                            className="absolute"
                            initial={{
                                top: transition.rect.top,
                                left: transition.rect.left,
                                width: transition.rect.width,
                                height: transition.rect.height,
                                borderRadius: 16,
                            }}
                            animate={{
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                                borderRadius: 0,
                            }}
                            transition={{
                                duration: 0.7,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{ overflow: "hidden" }}
                        >
                            <motion.img
                                src={transition.imageUrl}
                                alt=""
                                className="w-full h-full object-cover"
                                initial={{ scale: 1 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    duration: 0.7,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageTransitionContext.Provider>
    )
}
