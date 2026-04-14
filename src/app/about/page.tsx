import { TranslatedText } from "@/components/translated-text";
import dynamic from 'next/dynamic';

const DynamicCtaSection = dynamic(() => import('@/components/cta-section').then(mod => mod.CtaSection), {
    ssr: true
});

export default function AboutPage() {
    return (
        <main className="pt-24 min-h-screen flex flex-col">
            <section className="relative py-24 md:py-48 bg-[#fafafa] dark:bg-[#121212] flex-grow transition-colors duration-500" id="about">
                <div className="max-w-[1600px] mx-auto px-6 md:px-16 flex flex-col items-center text-center">
                    <TranslatedText 
                        translationKey="about" 
                        className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-6 block font-bold" 
                    />
                    <TranslatedText 
                        as="h1" 
                        translationKey="aboutTitle" 
                        className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-12 text-[#1b1c1b] dark:text-white" 
                    />
                    <TranslatedText 
                        as="p" 
                        translationKey="aboutDesc" 
                        className="font-body text-xl text-[#1b1c1b]/60 dark:text-white/60 max-w-3xl leading-relaxed" 
                    />
                </div>
            </section>
            <DynamicCtaSection />
        </main>
    );
}
