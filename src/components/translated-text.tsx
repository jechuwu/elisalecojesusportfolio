"use client"

import React from "react"
import { useLanguage } from "./language-provider"
import { motion } from "framer-motion"
import { TextEffect } from "@/components/ui/text-effect"

interface TranslatedTextProps {
    translationKey: string;
    className?: string;
    as?: React.ElementType;
}

/**
 * Parse a simple HTML string (only <br/> and <span class="...">...</span>) 
 * into React elements safely, avoiding dangerouslySetInnerHTML.
 */
function parseSimpleHtml(html: string): React.ReactNode[] {
    const nodes: React.ReactNode[] = []
    let remaining = html
    let key = 0

    while (remaining.length > 0) {
        // Match <br/> or <br>
        const brMatch = remaining.match(/^<br\s*\/?>/)
        if (brMatch) {
            nodes.push(<br key={key++} />)
            remaining = remaining.slice(brMatch[0].length)
            continue
        }

        // Match <span class="...">...</span>
        const spanMatch = remaining.match(/^<span\s+class="([^"]*)">([\s\S]*?)<\/span>/)
        if (spanMatch) {
            nodes.push(
                <span key={key++} className={spanMatch[1]}>
                    {spanMatch[2]}
                </span>
            )
            remaining = remaining.slice(spanMatch[0].length)
            continue
        }

        // Plain text until next tag
        const nextTag = remaining.indexOf('<')
        if (nextTag === -1) {
            nodes.push(remaining)
            break
        } else if (nextTag > 0) {
            nodes.push(remaining.slice(0, nextTag))
            remaining = remaining.slice(nextTag)
        } else {
            // Unknown tag — just output the character
            nodes.push(remaining.charAt(0))
            remaining = remaining.slice(1)
        }
    }

    return nodes
}

export function TranslatedText({ translationKey, className = "", as: Component = "span" }: TranslatedTextProps) {
    const { t, lang } = useLanguage()
    const text = t(translationKey)
    const hasHtml = typeof text === 'string' && /<[a-z][\s\S]*>/i.test(text)

    // For strings with HTML tags, we animate the wrapper directly to avoid TextEffect splitting internal DOM tags as chars.
    if (hasHtml) {
        // Safe cast to motion element
        const tag = (Component as string) || "span"
        const MotionTag = (motion as any)[tag]
        
        return (
            <MotionTag 
                key={`${translationKey}-${lang}`}
                className={className}
                initial={{ opacity: 0, filter: 'blur(12px)', y: 4 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
                {parseSimpleHtml(text)}
            </MotionTag>
        )
    }

    // For plain strings, we use the requested TextEffect with a staggered configuration set to 0 (simultaneous changes)
    return (
        <TextEffect 
            key={`${translationKey}-${lang}`}
            as={Component as any}
            className={className}
            per="line"
            preset="blur"
            variants={{
                container: {
                    hidden: { opacity: 0 },
                    visible: { 
                        opacity: 1,
                        transition: { staggerChildren: 0 } // Simultaneous change regardless of length
                    }
                },
                item: {
                    hidden: { opacity: 0, filter: 'blur(12px)', y: 4 },
                    visible: { 
                        opacity: 1, 
                        filter: 'blur(0px)',
                        y: 0,
                        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
                    }
                }
            }}
        >
            {text}
        </TextEffect>
    )
}
