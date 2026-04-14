import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectById, allProjects } from '@/content';
import { TranslatedText } from '@/components/translated-text';
import { BackButton } from '@/components/back-button';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ScrollDownButton } from '@/components/scroll-down-button';
import Image from 'next/image';

// Simple sanitizer to avoid dependencies
const escape = (str: string) => str
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: 'Project not found',
      description: 'Project could not be located in site content.',
    };
  }

  // Use 'en' as default for metadata or handle based on some logic
  const content = project.content.en;
  const title = project.title;
  const description = content.heroDescription;

  const safeTitle = escape(title);
  const safeDescription = escape(description).slice(0, 160);

  return {
    title: `${safeTitle} — Jesus Elisaleco`,
    description: safeDescription || undefined,
    openGraph: {
      title: `${safeTitle} — Jesus Elisaleco Portfolio`,
      description: safeDescription,
      images: [{ url: project.image }],
      type: 'article',
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-[#121212] transition-colors duration-500">
      <BackButton />
      
      {/* Hero Section */}
      <section className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden">
        <Image 
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-28 md:pb-32">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16 w-full text-center md:text-left text-white">
            <ScrollReveal delay={0.6}>
              <TranslatedText translationKey="caseStudy" className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-4 md:mb-6 block font-bold" />
              <h1 className="font-headline text-5xl md:text-[7rem] lg:text-[8rem] font-extrabold tracking-tighter leading-none mb-0 md:mb-4 drop-shadow-2xl">
                {project.title}
              </h1>
            </ScrollReveal>
          </div>
        </div>

        <ScrollDownButton />
      </section>

      {/* Hero Description */}
      <section className="bg-white dark:bg-[#121212] pt-32 pb-16 transition-colors duration-500">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 w-full text-[#1b1c1b] dark:text-white">
          <ScrollReveal>
            <p className="font-body text-3xl md:text-5xl max-w-5xl leading-tight font-light transition-colors duration-500">
              <TranslatedText translationKey={`${project.id}HeroDesc`} />
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Sections rendering */}
      {project.content.en.sections.map((section, idx) => (
        <section key={idx} className="py-32 bg-white dark:bg-[#121212] transition-colors duration-500 border-t border-black/5 dark:border-white/5">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
              <div className="md:col-span-4 text-[#1b1c1b] dark:text-white">
                <ScrollReveal>
                  <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] mb-4 block font-bold">
                    {section.tag}
                  </span>
                  <h2 className="font-headline text-4xl font-bold tracking-tight mb-6">
                    {section.title}
                  </h2>
                </ScrollReveal>
              </div>
              <div className="md:col-span-8 text-[#1b1c1b]/60 dark:text-white/60">
                <ScrollReveal delay={0.2}>
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="font-body text-lg leading-relaxed mb-8">
                      {p}
                    </p>
                  ))}
                </ScrollReveal>
              </div>
            </div>
            {section.images && section.images.length > 0 && (
              <div className={`grid grid-cols-1 md:grid-cols-${Math.min(section.images.length, 2)} gap-8 mt-16`}>
                {section.images.map((img, imgIdx) => (
                  <ScrollReveal key={imgIdx} delay={imgIdx * 0.1}>
                    <div className="aspect-video relative overflow-hidden rounded-sm">
                      <Image 
                        src={img} 
                        alt={`${section.title} image ${imgIdx + 1}`} 
                        fill 
                        className="object-cover" 
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </main>
  );
}
