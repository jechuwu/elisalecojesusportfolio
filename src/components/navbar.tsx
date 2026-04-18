"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useLanguage } from "./language-provider"
import { useTheme } from "next-themes"
import { TranslatedText } from "./translated-text"
import { GlassFilter } from "./ui/liquid-glass-button"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { EASE_OUT_EXPO, DURATION } from "@/lib/animations"

export function Navbar() {
  const pathname = usePathname()
  const { lang, toggleLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [activeHash, setActiveHash] = useState("")
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['projects', 'services', 'contact'];
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = `#${section}`;
            break;
          }
        }
      }
      setActiveHash(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false)
  }, [pathname])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const isActive = (path: string) => {
    if (pathname === '/about' && path === '/about') return true;
    if (pathname === '/projects' && path === '/projects') return true;
    if (path.startsWith('/#')) {
      return activeHash === path.replace('/', '');
    }
    return false;
  }

  return (
    <>
      <header className="dock-header">
        <nav className="dock-container group relative isolate">
          <div className="absolute top-0 left-0 z-0 h-full w-full rounded-full 
              shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] 
          transition-all 
          dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]" />
          <div
            className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-full"
            style={{ backdropFilter: 'url("#container-glass")' }}
          />
          <GlassFilter />

          <div className="z-10 text-lg font-black tracking-tighter text-[#1b1c1b] dark:text-white font-headline">
            <Link href="/" className="logo-container">
              <span className="logo-initials">J</span><span className="logo-rest">esus</span>
              <span className="logo-initials">E</span><span className="logo-rest">lisaleco</span>
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="z-10 hidden md:flex items-center gap-3 md:gap-8 whitespace-nowrap">
            <Link href="/projects" className={`nav-link font-headline font-semibold text-[11px] md:text-[13px] tracking-tight transition-colors ${isActive('/projects') ? 'text-[#FF4F00]' : 'text-[#1b1c1b] dark:text-white opacity-60 hover:opacity-100'}`}>
              <TranslatedText translationKey="projects" />
            </Link>
            <Link href="/#services" className={`nav-link font-headline font-semibold text-[11px] md:text-[13px] tracking-tight transition-colors ${isActive('/#services') ? 'text-[#FF4F00]' : 'text-[#1b1c1b] dark:text-white opacity-60 hover:opacity-100'}`}>
              <TranslatedText translationKey="services" />
            </Link>
            <Link href="/about" className={`nav-link font-headline font-semibold text-[11px] md:text-[13px] tracking-tight transition-colors ${isActive('/about') ? 'text-[#FF4F00]' : 'text-[#1b1c1b] dark:text-white opacity-60 hover:opacity-100'}`}>
              <TranslatedText translationKey="about" />
            </Link>
            <Link href="/#contact" className={`nav-link font-headline font-semibold text-[11px] md:text-[13px] tracking-tight transition-colors ${isActive('/#contact') ? 'text-[#FF4F00]' : 'text-[#1b1c1b] dark:text-white opacity-60 hover:opacity-100'}`}>
              <TranslatedText translationKey="contact" />
            </Link>
          </div>

          {/* Desktop controls */}
          <div className="z-10 hidden md:flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="font-headline text-xs font-bold tracking-widest uppercase text-[#1b1c1b] dark:text-white opacity-40 hover:opacity-100 transition-all hover:text-[#FF4F00] dark:hover:text-[#FF4F00] group/lang shadow-none relative"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover/lang:rotate-12" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M3 5h12M9 3v2m1.048 9.5a18.062 18.062 0 01-4.25-4.5M5.848 13.1a18.06 18.06 0 004.411-4.1M11 21l5-10 5 10m-4.5-3.5h3.5"
                      strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
              </svg>
            </button>
            <button 
              onClick={toggleTheme}
              className="flex items-center justify-center p-1.5 text-[#1b1c1b] dark:text-white opacity-40 hover:opacity-100 hover:text-[#FF4F00] dark:hover:text-[#FF4F00] transition-all" 
              title="Toggle Theme"
            >
              {mounted && theme === 'dark' ? (
                <svg className="w-4 h-4 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3v18a9 9 0 100-18V3z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" strokeWidth="1.5"></circle>
                    <path d="M12 3v18M12 3a9 9 0 110 18V3z" fill="currentColor" strokeWidth="0"></path>
                </svg>
              )}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="z-10 flex md:hidden items-center justify-center w-8 h-8 text-[#1b1c1b] dark:text-white"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-[5px] w-5">
              <motion.span
                className="block h-[1.5px] bg-current origin-center"
                animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : DURATION.normal, ease: EASE_OUT_EXPO }}
              />
              <motion.span
                className="block h-[1.5px] bg-current"
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: shouldReduceMotion ? 0 : DURATION.fast }}
              />
              <motion.span
                className="block h-[1.5px] bg-current origin-center"
                animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : DURATION.normal, ease: EASE_OUT_EXPO }}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[90] md:hidden"

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : DURATION.normal }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : DURATION.normal }}
            />

            {/* Drawer panel */}
            <motion.nav
              id="mobile-drawer"
              className="absolute top-0 right-0 w-[280px] h-full bg-white dark:bg-[#121212] shadow-2xl dark:shadow-black/60 flex flex-col pt-24 pb-8 px-8"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: shouldReduceMotion ? 0 : DURATION.layout, ease: EASE_OUT_EXPO }}
            >
              {/* Nav links */}
              <div className="flex flex-col gap-2 mb-8">
                {[
                  { href: '/projects', key: 'projects' },
                  { href: '/#services', key: 'services' },
                  { href: '/about', key: 'about' },
                  { href: '/#contact', key: 'contact' },
                ].map((item, i) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: shouldReduceMotion ? 0 : DURATION.normal, 
                      delay: shouldReduceMotion ? 0 : 0.1 + i * 0.05,
                      ease: EASE_OUT_EXPO 
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-3 font-headline font-bold text-lg tracking-tight transition-colors ${
                        isActive(item.href)
                          ? 'text-[#FF4F00]'
                          : 'text-[#1b1c1b] dark:text-white hover:text-[#FF4F00] dark:hover:text-[#FF4F00]'
                      }`}
                    >
                      <TranslatedText translationKey={item.key} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#1b1c1b]/10 dark:bg-white/10 mb-6" />

              {/* Controls */}
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: shouldReduceMotion ? 0 : DURATION.normal, 
                  delay: shouldReduceMotion ? 0 : 0.35,
                  ease: EASE_OUT_EXPO
                }}
              >
                {/* Language toggle */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-3 py-2 font-headline text-sm font-bold tracking-widest uppercase text-[#1b1c1b]/60 dark:text-white/60 hover:text-[#FF4F00] dark:hover:text-[#FF4F00] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5h12M9 3v2m1.048 9.5a18.062 18.062 0 01-4.25-4.5M5.848 13.1a18.06 18.06 0 004.411-4.1M11 21l5-10 5 10m-4.5-3.5h3.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                  {lang === 'es' ? 'English' : 'Español'}
                </button>

                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 py-2 font-headline text-sm font-bold tracking-widest uppercase text-[#1b1c1b]/60 dark:text-white/60 hover:text-[#FF4F00] dark:hover:text-[#FF4F00] transition-colors"
                >
                  {mounted && theme === 'dark' ? (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v18a9 9 0 100-18V3z" />
                      </svg>
                      Light Mode
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                        <path d="M12 3v18M12 3a9 9 0 110 18V3z" fill="currentColor" strokeWidth="0" />
                      </svg>
                      Dark Mode
                    </>
                  )}
                </button>
              </motion.div>

              {/* Bottom spacer */}
              <div className="flex-1" />

              {/* Footer in drawer */}
              <p className="font-body text-[9px] uppercase tracking-widest opacity-30 font-medium dark:opacity-50 dark:text-white">
                © {new Date().getFullYear()} JE
              </p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
