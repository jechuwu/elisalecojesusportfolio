import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';

import { ThemeProvider } from "@/components/theme-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { LanguageProvider } from "@/components/language-provider";
import { PageTransitionProvider } from "@/components/page-transition-provider";
import { Navbar } from "@/components/navbar";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true
});
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
  preload: true
});

const DynamicFooter = dynamic(() => import('@/components/footer').then(mod => mod.Footer), {
  ssr: true
});

export const metadata: Metadata = {
  title: {
    default: "Jesus Elisaleco | Industrial Design Portfolio",
    template: "%s — Jesus Elisaleco",
  },
  description: "Portfolio de diseño industrial de alto impacto. Precisión técnica y estética emocional. Especializado en CMF, óptica e ingeniería de producto.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://reactportfolio-phi.vercel.app"),
  keywords: ["diseño industrial", "industrial design", "CMF", "product design", "diseño de producto", "Jesus Elisaleco", "portfolio"],
  authors: [{ name: "Jesus Elisaleco" }],
  creator: "Jesus Elisaleco",
  openGraph: {
      type: "website",
      locale: "es_AR",
      alternateLocale: "en_US",
      siteName: "Jesus Elisaleco Portfolio",
      images: [
          {
              url: "/og-default.jpg",
              width: 1200,
              height: 630,
              alt: "Jesus Elisaleco — Industrial Design Portfolio"
          }
      ]
  },
  twitter: {
      card: "summary_large_image",
      creator: "@jesuselisaleco"
  },
  robots: {
      index: true,
      follow: true,
      googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
      }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    name: "Jesus Elisaleco",
                    jobTitle: "Industrial Designer",
                    url: process.env.NEXT_PUBLIC_SITE_URL || "https://reactportfolio-phi.vercel.app",
                    sameAs: [
                        "https://github.com/jechuwu"
                    ],
                    knowsAbout: [
                        "Industrial Design", "CMF Design",
                        "Product Design", "Optical Engineering"
                    ]
                })
            }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${poppins.variable} antialiased bg-white text-[#1b1c1b] dark:bg-[#121212] dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <PageTransitionProvider>
              <LenisProvider>
                <Navbar />
                {children}
                <DynamicFooter />
              </LenisProvider>
            </PageTransitionProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
