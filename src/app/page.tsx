"use client";

import { useLanguage } from "@/components/language-provider";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { MetadataStrip } from "@/components/metadata-strip";
import { ProjectsGallery } from "@/components/projects-gallery";
import { Capabilities } from "@/components/capabilities";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { TranslatedText } from "@/components/translated-text";

export default function Home() {
    return (
        <main className="min-h-screen">
            <BackgroundPaths
                title={
                    <>
                        Mi portfolio<br />
                        <span className="text-[#FF4F00]">Jesus Elisaleco</span>
                    </>
                }
                subtitle={<TranslatedText translationKey="heroDesc" />}
            />
            <MetadataStrip />
            <ProjectsGallery />
            <Capabilities />
            <CtaSection />
            <Footer />
        </main>
    );
}
