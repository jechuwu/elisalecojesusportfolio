import { TranslatedText } from "@/components/translated-text";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const id = params.id;
    try {
        const { getProjectById } = await import('@/content');
        const project = getProjectById(id);
        if (!project) {
            return {
                title: 'Project — Portfolio',
                description: 'Project could not be located in site content.',
            };
        }

        const title = project.title ?? id;
        const description = project.content?.en?.heroDescription ?? project.content?.es?.heroDescription ?? '';

        const escapeHtml = (s: string) => s.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const safeTitle = escapeHtml(title);
        const safeDescription = escapeHtml(description).slice(0, 160);

        return {
            title: `${safeTitle} — Portfolio`,
            description: safeDescription || undefined,
            openGraph: {
                title: `${safeTitle} — Jesus Elisaleco`,
                description: safeDescription || undefined,
                images: project.image ? [{ url: project.image, width: 1200, height: 630, alt: safeTitle }] : undefined,
                type: 'article',
            },
        };
    } catch {
        return {
            title: 'Project — Portfolio',
            description: 'Explore my projects and case studies.',
        };
    }
}

export default function PuriformProjectPage() {
    return (
        <main className="min-h-screen flex flex-col bg-white dark:bg-[#121212] transition-colors duration-500">
            {/* Hero Case Study */}
            {/* Hero Image Full Screen */}
            <section className="relative w-full h-[100vh]">
                <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHNZPftCCF_h_NCNzJh75HCnxG_lz8HEygVl_BSe7c8BOqzt83bvnNEk_Q8h3Kq8Byj4kGsG3XhioHAzlWlWZvW5ztFzIuJOH_G3UHvy_ohVmp991R75ecADG5h0cPMBPGNqyn-QiDCHUr6MRHMGsL-PWaodl0C8ZsE6ruzx5JBk44kdF6n4zsq6xhsVuKi20GTT4D1W_a-AQFJ6uTx0DQx9X6hAhI8uYhbpwN2zF0L7XURRapC4klDNyQ-UZLrGX-fSUUdwNIYwI"
                    alt="PuriForm Camera Hero"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end pb-24">
                    <div className="max-w-[1600px] mx-auto px-6 md:px-16 w-full">
                        <TranslatedText translationKey="caseStudy" className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-6 block font-bold" />
                        <h1 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tighter leading-tight mb-8 text-white">
                            PuriForm
                        </h1>
                        <TranslatedText as="p" translationKey="lumixHeroDesc" className="font-body text-2xl text-white/80 max-w-4xl leading-relaxed mb-0 font-light" />
                    </div>
                </div>
            </section>

            {/* Project Metadata */}
            <section className="bg-white dark:bg-[#121212] border-b border-[#1b1c1b]/5 dark:border-white/5 py-12">
                <div className="max-w-[1600px] mx-auto px-6 md:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <TranslatedText translationKey="client" className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2" />
                            <h3 className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white">Lumix Corp</h3>
                        </div>
                        <div>
                            <TranslatedText translationKey="role" className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2" />
                            <TranslatedText as="h3" translationKey="roleDesc" className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white" />
                        </div>
                        <div>
                            <TranslatedText translationKey="discipline" className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2" />
                            <TranslatedText as="h3" translationKey="discDesc" className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white" />
                        </div>
                        <div>
                            <TranslatedText translationKey="year" className="font-body text-[9px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2" />
                            <h3 className="font-headline text-lg font-semibold text-[#1b1c1b] dark:text-white">2023 - 2024</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process & El Reto */}
            <section className="py-32 bg-white dark:bg-[#121212]">
                <div className="max-w-[1600px] mx-auto px-6 md:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                        <div className="md:col-span-4">
                            <TranslatedText translationKey="challengeTag" className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-4 block font-bold" />
                            <TranslatedText as="h2" translationKey="challengeTitle" className="font-headline text-4xl font-bold tracking-tight mb-6 text-[#1b1c1b] dark:text-white" />
                        </div>
                        <div className="md:col-span-8">
                            <TranslatedText as="p" translationKey="challengeP1" className="font-body text-lg text-[#1b1c1b]/60 dark:text-white/60 leading-relaxed mb-8" />
                            <TranslatedText as="p" translationKey="challengeP2" className="font-body text-lg text-[#1b1c1b]/60 dark:text-white/60 leading-relaxed" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sketches & Ideation */}
            <section className="py-32 bg-[#121212] text-white">
                <div className="max-w-[1600px] mx-auto px-6 md:px-16">
                    <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
                        <div>
                            <TranslatedText translationKey="ideationTag" className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-3 block font-bold" />
                            <TranslatedText as="h2" translationKey="ideationTitle" className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-white" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="aspect-square bg-black overflow-hidden group relative">
                            <Image src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000 scale-105 group-hover:scale-100 transition-transform" alt="Desk with sketches" />
                        </div>
                        <div className="aspect-square bg-black overflow-hidden group relative">
                            <Image src="https://images.unsplash.com/photo-1517409217036-7c6de425dd9f?q=80&w=1600&auto=format&fit=crop" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000 scale-105 group-hover:scale-100 transition-transform" alt="Engineering planning" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CMF & Producción */}
            <section className="py-32 bg-white dark:bg-[#121212]">
                <div className="max-w-[1600px] mx-auto px-6 md:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                        <div className="md:col-span-6 bg-[#f5f5f7] dark:bg-[#222] aspect-[4/5] overflow-hidden relative">
                            <Image src="https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/8629d9213297753.6744564302047.png" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" alt="CMF Details" />
                        </div>
                        <div className="md:col-span-6 md:pl-8">
                            <TranslatedText translationKey="cmfTag" className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-4 block font-bold" />
                            <TranslatedText as="h2" translationKey="cmfTitle" className="font-headline text-4xl font-bold tracking-tight mb-6 text-[#1b1c1b] dark:text-white" />
                            <TranslatedText as="p" translationKey="cmfDesc" className="font-body text-lg text-[#1b1c1b]/60 dark:text-white/60 leading-relaxed mb-8" />
                            <div className="flex gap-4 mt-8">
                                <div className="w-16 h-16 rounded-sm bg-[#121212] flex items-center justify-center border border-[#1b1c1b]/10 dark:border-white/10"></div>
                                <div className="w-16 h-16 rounded-sm bg-[#353535] flex items-center justify-center border border-[#1b1c1b]/10 dark:border-white/10"></div>
                                <div className="w-16 h-16 rounded-sm bg-[#FF4F00] flex items-center justify-center border border-[#1b1c1b]/10 dark:border-white/10"></div>
                                <div className="w-16 h-16 rounded-sm bg-[#fafafa] flex items-center justify-center border border-[#1b1c1b]/10 dark:border-white/10"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Project Navigation */}
            <Link href="/projects/lumix" className="py-24 bg-[#fafafa] dark:bg-[#181818] border-t border-[#1b1c1b]/5 dark:border-white/5 text-center transition-colors hover:bg-[#FF4F00] dark:hover:bg-[#FF4F00] hover:text-white dark:hover:text-white group cursor-pointer block">
                <div className="max-w-[1600px] mx-auto px-16">
                    <TranslatedText translationKey="nextProject" className="font-body text-[10px] tracking-[0.3em] uppercase opacity-50 mb-4 block font-bold transition-opacity group-hover:opacity-100" />
                    <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tight transition-transform group-hover:translate-x-4 inline-block text-[#1b1c1b] dark:text-white group-hover:text-white">
                        Lumix Pro X &rarr;
                    </h2>
                </div>
            </Link>

        </main>
    );
}
