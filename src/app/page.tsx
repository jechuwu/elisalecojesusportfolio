"use client";

import { BackgroundPaths } from "@/components/ui/background-paths";
import { TranslatedText } from "@/components/translated-text";
import dynamic from 'next/dynamic';

const DynamicMetadataStrip = dynamic(() => import('@/components/metadata-strip').then(mod => mod.MetadataStrip), {
    ssr: true
});

const DynamicProjectsGallery = dynamic(() => import('@/components/projects-gallery').then(mod => mod.ProjectsGallery), {
    ssr: true
});

const DynamicCapabilities = dynamic(() => import('@/components/capabilities').then(mod => mod.Capabilities), {
    ssr: true
});

const DynamicCtaSection = dynamic(() => import('@/components/cta-section').then(mod => mod.CtaSection), {
    ssr: true
});

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
            <DynamicMetadataStrip />
            <DynamicProjectsGallery />
            <DynamicCapabilities />
            <DynamicCtaSection />
        </main>
    );
}
