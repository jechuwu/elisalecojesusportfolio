import { TranslatedText } from "@/components/translated-text";
import { Footer } from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import { ScrollDownButton } from "@/components/scroll-down-button";
import { ScrollReveal } from "@/components/scroll-reveal";
import { BackButton } from "@/components/back-button";
import { TextEffect } from "@/components/ui/text-effect";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Lumix Pro X",
    description: "Camera design case study focusing on optical engineering and premium CMF.",
    openGraph: {
        title: "Lumix Pro X — Jesus Elisaleco",
        description: "Camera design case study focusing on optical engineering and premium CMF.",
        images: [
            {
                url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHNZPftCCF_h_NCNzJh75HCnxG_lz8HEygVl_BSe7c8BOqzt83bvnNEk_Q8h3Kq8Byj4kGsG3XhioHAzlWlWZvW5ztFzIuJOH_G3UHvy_ohVmp991R75ecADG5h0cPMBPGNqyn-QiDCHUr6MRHMGsL-PWaodl0C8ZsE6ruzx5JBk44kdF6n4zsq6xhsVuKi20GTT4D1W_a-AQFJ6uTx0DQx9X6hAhI8uYhbpwN2zF0L7XURRapC4klDNyQ-UZLrGX-fSUUdwNIYwI",
                width: 1200,
                height: 630,
                alt: "Lumix Pro X"
            }
        ],
        type: "article",
    }
}

export default function LumixProjectPage() {
    return (
        <main className="min-h-screen flex flex-col bg-white dark:bg-[#121212] transition-colors duration-500">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CreativeWork",
                        name: "Lumix Pro X",
                        description: "Camera design case study focusing on optical engineering and premium CMF.",
                        creator: {
                            "@type": "Person",
                            name: "Jesus Elisaleco"
                        },
                        genre: "Industrial Design"
                    })
                }}
            />
            
            <BackButton />
            
            {/* Hero Case Study - Purely Immersive */}
            <section className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden">
                <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHNZPftCCF_h_NCNzJh75HCnxG_lz8HEygVl_BSe7c8BOqzt83bvnNEk_Q8h3Kq8Byj4kGsG3XhioHAzlWlWZvW5ztFzIuJOH_G3UHvy_ohVmp991R75ecADG5h0cPMBPGNqyn-QiDCHUr6MRHMGsL-PWaodl0C8ZsE6ruzx5JBk44kdF6n4zsq6xhsVuKi20GTT4D1W_a-AQFJ6uTx0DQx9X6hAhI8uYhbpwN2zF0L7XURRapC4klDNyQ-UZLrGX-fSUUdwNIYwI"
                    alt="Lumix Pro X Camera Hero"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Titles lowered inside hero with careful negative space above scroll indicator */}
                <div className="absolute inset-0 flex flex-col justify-end pb-28 md:pb-32">
                    <div className="max-w-[1600px] mx-auto px-6 md:px-16 w-full text-center md:text-left">
                        <ScrollReveal delay={0.6}>
                            <TranslatedText translationKey="caseStudy" className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-4 md:mb-6 block font-bold" />
                            <TextEffect
                                as="h1"
                                per="char"
                                preset="blur"
                                delay={0.7}
                                className="font-headline text-5xl md:text-[7rem] lg:text-[8rem] font-extrabold tracking-tighter leading-none mb-0 md:mb-4 text-white drop-shadow-2xl"
                            >
                                Lumix Pro X
                            </TextEffect>
                        </ScrollReveal>
                    </div>
                </div>

                <ScrollDownButton />
            </section>

            {/* Introductory Text - Now decoupled and below the fold */}
            <section className="bg-white dark:bg-[#121212] pt-32 pb-16 transition-colors duration-500">
                <div className="max-w-[1600px] mx-auto px-6 md:px-16 w-full">
                    <ScrollReveal>
                        <TranslatedText as="p" translationKey="lumixHeroDesc" className="font-body text-3xl md:text-5xl text-[#1b1c1b] dark:text-white max-w-5xl leading-tight font-light transition-colors duration-500" />
                    </ScrollReveal>
                </div>
            </section>

            {/* Project Metadata */}
            <section className="bg-white dark:bg-[#121212] border-b border-[#1b1c1b]/5 dark:border-white/5 pb-32 pt-8 transition-colors duration-500">
                <div className="max-w-[1600px] mx-auto px-6 md:px-16">
                    <ScrollReveal delay={0.2}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div>
                                <TranslatedText translationKey="client" className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2" />
                                <h3 className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white transition-colors duration-500">Lumix Corp</h3>
                            </div>
                            <div>
                                <TranslatedText translationKey="role" className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2" />
                                <TranslatedText as="h3" translationKey="roleDesc" className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white transition-colors duration-500" />
                            </div>
                            <div>
                                <TranslatedText translationKey="discipline" className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2" />
                                <TranslatedText as="h3" translationKey="discDesc" className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white transition-colors duration-500" />
                            </div>
                            <div>
                                <TranslatedText translationKey="year" className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2" />
                                <h3 className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white transition-colors duration-500">2023 - 2024</h3>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Process & El Reto */}
            <section className="py-32 bg-white dark:bg-[#121212] transition-colors duration-500">
                <div className="max-w-[1600px] mx-auto px-6 md:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                        <div className="md:col-span-4">
                            <ScrollReveal>
                                <TranslatedText translationKey="challengeTag" className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-4 block font-bold" />
                                <TranslatedText as="h2" translationKey="challengeTitle" className="font-headline text-4xl font-bold tracking-tight mb-6 text-[#1b1c1b] dark:text-white transition-colors duration-500" />
                            </ScrollReveal>
                        </div>
                        <div className="md:col-span-8">
                            <ScrollReveal delay={0.2}>
                                <TranslatedText as="p" translationKey="challengeP1" className="font-body text-lg text-[#1b1c1b]/60 dark:text-white/60 leading-relaxed mb-8 transition-colors duration-500" />
                                <TranslatedText as="p" translationKey="challengeP2" className="font-body text-lg text-[#1b1c1b]/60 dark:text-white/60 leading-relaxed transition-colors duration-500" />
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sketches & Ideation */}
            <section className="py-32 bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-500 text-[#1b1c1b] dark:text-white">
                <div className="max-w-[1600px] mx-auto px-6 md:px-16">
                    <ScrollReveal>
                        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
                            <div>
                                <TranslatedText translationKey="ideationTag" className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-3 block font-bold" />
                                <TranslatedText as="h2" translationKey="ideationTitle" className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-[#1b1c1b] dark:text-white transition-colors duration-500" />
                            </div>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ScrollReveal delay={0.1}>
                            <div className="aspect-square bg-[#ececec] dark:bg-[#1a1a1a] transition-colors duration-500 overflow-hidden group relative rounded-sm">
                                <Image sizes="(max-width: 768px) 100vw, 50vw" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop" fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-1000 scale-105 group-hover:scale-100 transition-transform" alt="Desk with sketches" />
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={0.3}>
                            <div className="aspect-square bg-[#ececec] dark:bg-[#1a1a1a] transition-colors duration-500 overflow-hidden group relative rounded-sm">
                                <Image sizes="(max-width: 768px) 100vw, 50vw" src="https://images.unsplash.com/photo-1517409217036-7c6de425dd9f?q=80&w=1600&auto=format&fit=crop" fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-1000 scale-105 group-hover:scale-100 transition-transform" alt="Engineering planning" />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* CMF & Producción */}
            <section className="py-32 bg-white dark:bg-[#121212] transition-colors duration-500">
                <div className="max-w-[1600px] mx-auto px-6 md:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                        <div className="md:col-span-6 bg-[#f5f5f7] dark:bg-[#111] transition-colors duration-500 aspect-[4/5] overflow-hidden relative rounded-sm">
                            <ScrollReveal>
                                <Image sizes="(max-width: 768px) 100vw, 50vw" src="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=1600&auto=format&fit=crop" fill className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-1000 scale-105 hover:scale-100" alt="CMF Details" />
                            </ScrollReveal>
                        </div>
                        <div className="md:col-span-6 md:pl-8">
                            <ScrollReveal delay={0.2}>
                                <TranslatedText translationKey="cmfTag" className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-4 block font-bold" />
                                <TranslatedText as="h2" translationKey="cmfTitle" className="font-headline text-4xl font-bold tracking-tight mb-6 text-[#1b1c1b] dark:text-white transition-colors duration-500" />
                                <TranslatedText as="p" translationKey="cmfDesc" className="font-body text-lg text-[#1b1c1b]/60 dark:text-white/60 leading-relaxed mb-8 transition-colors duration-500" />
                            </ScrollReveal>
                            
                            <ScrollReveal delay={0.4}>
                                <div className="flex gap-4 mt-8">
                                    <div className="w-16 h-16 rounded-sm bg-[#121212] dark:bg-[#0a0a0a] flex items-center justify-center border border-[#1b1c1b]/10 dark:border-white/10 transition-colors duration-500"></div>
                                    <div className="w-16 h-16 rounded-sm bg-[#353535] dark:bg-[#222] flex items-center justify-center border border-[#1b1c1b]/10 dark:border-white/10 transition-colors duration-500"></div>
                                    <div className="w-16 h-16 rounded-sm bg-[#FF4F00] flex items-center justify-center border border-[#1b1c1b]/10 dark:border-white/10 transition-colors duration-500"></div>
                                    <div className="w-16 h-16 rounded-sm bg-[#fafafa] dark:bg-[#111] flex items-center justify-center border border-[#1b1c1b]/10 dark:border-white/10 transition-colors duration-500"></div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Project Navigation */}
            <Link href="/projects/puriform" className="py-32 bg-[#fafafa] dark:bg-[#0a0a0a] border-t border-[#1b1c1b]/5 dark:border-white/5 text-center transition-colors duration-500 hover:bg-[#FF4F00] dark:hover:bg-[#FF4F00] hover:text-white dark:hover:text-white group cursor-pointer block">
                <div className="max-w-[1600px] mx-auto px-16">
                    <ScrollReveal>
                        <TranslatedText translationKey="nextProject" className="font-body text-[10px] tracking-[0.3em] uppercase opacity-50 mb-4 block font-bold transition-opacity group-hover:opacity-100" />
                        <h2 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter transition-transform group-hover:translate-x-4 inline-block text-[#1b1c1b] dark:text-white group-hover:text-white">
                            PuriForm &rarr;
                        </h2>
                    </ScrollReveal>
                </div>
            </Link>

            <Footer />
        </main>
    );
}
