# Thorough Plan: Animations Standardization (Accuracy Mode)

## Goal
Standardize all scroll-reveal and interaction animations to follow the project's animation convention (EASE_OUT_EXPO and useReducedMotion) across all core components (Navbar, Footer, and Capabilities).

## Metadata
**Tags:** frontend, UI
**Complexity:** 5

## User Review Required
> [!NOTE]
> This update will unify the "feel" of the site. Some animations might feel faster or smoother due to the standardized expo-out curve.

## Complexity Audit
### Routine
- Replacing hardcoded ease arrays with `EASE_OUT_EXPO`.
- Adding `useReducedMotion` checks to simple `transition` props.
- Standardizing `viewport` margins using `VIEWPORT_ONCE`.
### Complex / Risky
- Synchronizing staggered child animations in `Navbar` mobile drawer to ensure they respond to reduced motion without causing layout jumps.
- Auditing `AnimatePresence` transitions in `Navbar` to avoid hydration mismatches between server and client themes.

## Edge-Case & Dependency Audit
- **Race Conditions:** None identified; Framer Motion handles concurrent animations well.
- **Security:** N/A.
- **Side Effects:** Potential for slight layout shifts if duration changes significantly on heavy elements during initial page load.
- **Dependencies & Conflicts:** Strictly depends on `src/lib/animations.ts`. Overlaps with `plan_05_animations.md` (which is partially implemented); this plan serves as the final, exhaustive sweep.

## Adversarial Synthesis
### Grumpy Critique
"Wait, so we're just blindly throwing `EASE_OUT_EXPO` at everything? That's not 'standardization,' that's lazy. Did you even look at `Navbar.tsx`? The mobile drawer has three different `motion` components, and only *one* of them is actually using the constant. The hamburger icon is hardcoded with `0.3` duration. And don't even get me started on `Footer.tsx`—you're fading in the whole footer but ignoring that the social links might want their own stagger. Also, where's the cleanup for the legacy `ease: [0.16, 1, 0.3, 1]` arrays still floating around? If we're doing this, we do it right: no hardcoded arrays, no inconsistent durations, and full accessibility support in every single `transition` prop."

### Balanced Response
"Grumpy makes some fair points about the remaining inconsistencies. To address this, we'll expand the scope to ensure *every* motion component in the target files is audited for hardcoded eases or durations. We'll prioritize using the `EASE_OUT_EXPO` constant and `DURATION` helpers from `animations.ts`. We'll specifically target the hamburger lines, the mobile backdrop, and the staggered link animations in the `Navbar`. For the `Footer`, we'll ensure the entry animation is clean and respects the reduced motion global flag. This refined approach guarantees a truly unified motion language without introducing unnecessary complexity."

## Proposed Changes
> [!IMPORTANT]
> **MAXIMUM DETAIL REQUIRED:** Provide complete, fully functioning code blocks. Break down the logic step-by-step before showing code.

### 1. `src/components/navbar.tsx`
#### MODIFY `src/components/navbar.tsx`
- **Context:** Unify all mobile menu animations and hamburger transitions to follow the `EASE_OUT_EXPO` standard and respect `useReducedMotion`.
- **Logic:** 
  1. Replace hardcoded durations in hamburger `motion.span` with `DURATION.normal` and `DURATION.fast`.
  2. Ensure the mobile drawer `motion.div` and backdrop use `DURATION.normal` and respect `shouldReduceMotion`.
  3. Standardize the drawer entry to `DURATION.layout` (0.6s) with `EASE_OUT_EXPO`.
  4. Condition staggered link entry animations.
- **Implementation:**
```tsx
// Around line 140 (Mobile hamburger spans)
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

// Around line 160 (Mobile drawer AnimatePresence)
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
        {/* Nav links with stagger */}
        <div className="flex flex-col gap-2 mb-8">
          {[
            { href: '/#projects', key: 'projects' },
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
              {/* Link component... */}
            </motion.div>
          ))}
        </div>
        {/* ... controls with same transition logic ... */}
      </motion.nav>
    </motion.div>
  )}
</AnimatePresence>
```
- **Edge Cases Handled:** Prevents flickering on mobile menu exit by ensuring `exit` transitions match `initial` durations. `shouldReduceMotion` handles user preferences globally.

### 2. `src/components/footer.tsx`
#### MODIFY `src/components/footer.tsx`
- **Context:** Standardize the footer entry animation to match the rest of the site's scroll reveals.
- **Logic:** Update root `motion.footer` to use `DURATION.layout` and `VIEWPORT_ONCE`.
- **Implementation:**
```tsx
// Around line 10
export function Footer() {
    const { t } = useLanguage()
    const currentYear = new Date().getFullYear()
    const shouldReduceMotion = useReducedMotion()

    return (
        <motion.footer
            className="w-full py-12 md:py-16 bg-white dark:bg-[#121212] border-t border-black/5 dark:border-white/10 relative z-50 transition-colors duration-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: shouldReduceMotion ? 0 : DURATION.layout, ease: EASE_OUT_EXPO }}
        >
```
- **Edge Cases Handled:** `VIEWPORT_ONCE` prevents the footer from fading in/out every time the user scrolls to the bottom of the page.

### 3. `src/components/capabilities.tsx`
#### MODIFY `src/components/capabilities.tsx`
- **Context:** Verification of existing logic to ensure it perfectly aligns with the `DURATION` and `EASE_OUT_EXPO` standard.
- **Logic:** Use `DURATION.slow` (0.7s) for card reveal as per design. Ensure `staggerChildren` is 0 on reduced motion.
- **Implementation:**
```tsx
// Inside Capabilities component
    const container = {
        hidden: {},
        show: {
            transition: { staggerChildren: shouldReduceMotion ? 0 : 0.15 }
        }
    }

    const card = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
        show: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: shouldReduceMotion ? 0 : DURATION.slow, 
                ease: EASE_OUT_EXPO 
            } 
        }
    }
```
- **Edge Cases Handled:** Consistent `30px` Y-offset for reveals across the site.

## Verification Plan
### Automated Tests
- Run `npm run lint` to ensure no unused motion imports.
- Run `npx tsc --noEmit` to verify type safety.
### Manual Verification
- **Easing Audit**: Verify all page transitions and menu reveals use the "Expo" snap-in effect.
- **Reduced Motion**: Verify that setting "Reduce Motion" in System Settings (macOS/Windows) makes all transitions instant (0s duration).
- **Mobile Menu**: Test open/close cycle on a real mobile viewport (or emulator) to ensure no layout jumps during the 0.6s layout transition.

## Agent Recommendation
Send to Coder
