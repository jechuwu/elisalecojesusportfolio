# [Plan 6: SEO Dinámico, Accesibilidad y Limpieza de Tipado]

## Goal
Elevate the portfolio's technical quality and discoverability by implementing per-project dynamic metadata, fixing TypeScript typing debt, and improving accessibility to meet A11Y standards.

## Metadata
**Tags:** frontend, UI, bugfix
**Complexity:** 5

## User Review Required
> [!NOTE]
> The real public URLs for Instagram, LinkedIn and Behance are required to replace the `#` placeholders in the footer. Provide these as a single JSON object in the form: { "instagram": "https://...", "linkedin": "https://...", "behance": "https://..." }.

## Complexity Audit
### Routine
- Replace `any` with specific interfaces in `src/components/language-provider.tsx`.
- Update social links in `src/components/footer.tsx` with user-provided URLs.
- Add `aria-expanded` and keyboard focus handling to filter and accordion buttons in `src/components/projects-gallery.tsx`.
### Complex / Risky
- Implement `generateMetadata` for `src/app/projects/[id]/page.tsx` to provide per-project SEO titles/descriptions. This requires synchronizing with `src/content/index.ts` shape and verifying Next.js app router compatibility (Next.js version and `generateMetadata` support).
- Ensuring TypeScript strictness (`--noEmit`) doesn't break runtime patterns where dynamic imports or loosely typed content are used.

## Edge-Case & Dependency Audit
- **Race Conditions:** None expected from metadata generation (server-side) if the content source is synchronous; if content is loaded remotely or lazily, handle rejection and fallback metadata.
- **Security:** Avoid injecting untrusted content into metadata (escape user-generated strings before placing them into title/description). Do not include secrets in metadata.
- **Side Effects:** Tightening types may surface compiler errors across components; allow a single iteration to fix transitive typing issues.
- **Dependencies & Conflicts:** Attempted to query the Kanban board to detect cross-plan conflicts but workspace initialization failed:

```
MCP server 'switchboard': Error: Switchboard workspace could not be initialized. Unable to locate sql-wasm.js. Tried common locations under .switchboard and node_modules. Try calling the init_workspace tool, then retry.
```

Because the Kanban query failed, the dependency/conflict state is UNKNOWN. Clarification: If another active plan modifies `src/content/index.ts` or the app router, coordinate before implementing `generateMetadata`.

## Adversarial Synthesis
### Grumpy Critique
This plan is annoyingly optimistic. "Just add generateMetadata and fix types" is naive: the content shape is probably inconsistent, the app may not be using the Next.js app-router conventions expected, and tightening TypeScript will cascade into every component that leaks `any`. There's no rollback strategy, no migration plan for content shape changes, and the verification section is laughably thin (just run tsc and eslint?). Accessibility checks are superficial — keyboard navigation and aria attributes are only part of the work; focus management, skip links, and semantic structure are ignored. Also: the footer change asks for links but doesn't document where to store them safely (env? config?).

### Balanced Response
Valid criticisms. To mitigate: add explicit discovery steps for `src/content/index.ts` shape and app-router compatibility; make `generateMetadata` resilient (fallbacks and sanitization). Incrementally apply TypeScript strictness by targeting one module at a time and running `npx tsc --noEmit` after each change. For accessibility, include focused keyboard interactivity tests and screen-reader validation steps. Store social links in a single config file (e.g., `src/config/site-meta.ts`) rather than environment variables so the footer update is deterministic and reviewable.

## Proposed Changes
> [!IMPORTANT]
> MAXIMUM DETAIL: the following sections include exact implementation suggestions and full code blocks to copy/paste. Before applying, confirm `src/content/index.ts` export shape (array of projects vs. keyed map). If the shape differs, use the "Clarification" notes below.

### `src/app/projects/[id]/page.tsx`
#### MODIFY `src/app/projects/[id]/page.tsx`
- **Context:** Add `generateMetadata` so each project page renders appropriate <title> and <meta name="description"> on the server. This function runs on the server at build/time by Next.js app router and must be async-safe.
- **Logic:**
  1. Accept `params.id` from route.
  2. Import the project's canonical data from `src/content/index.ts` (see Clarification below on shape).
  3. If project not found, return sensible default metadata.
  4. Sanitize title and description to avoid HTML injection.

- **Implementation:** Add the following named export adjacent to the page component (copy-paste as-is):

```ts
// src/app/projects/[id]/page.tsx (add this export)
import type { Metadata } from 'next';
import { escape } from 'lodash-es'; // Clarification: if lodash-es is unavailable, replace with small sanitizer below

// Clarification: adjust this import to match how projects are exported. Two common options shown below.
// Option A - content exports `projects` array: import projects from 'src/content/index'
// Option B - content exports a helper: import { getProjectById } from 'src/content/index'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;

  // Attempt Option B first (preferred):
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const content = await import('@src/content/index');
    const getProjectById = content.getProjectById as ((id: string) => any) | undefined;
    const projects = content.projects as any[] | undefined;

    let project: any | undefined;

    if (typeof getProjectById === 'function') {
      project = await getProjectById(id);
    } else if (Array.isArray(projects)) {
      project = projects.find((p) => String(p.id) === String(id));
    }

    if (!project) {
      return {
        title: 'Project not found',
        description: 'Project could not be located in site content.',
      };
    }

    const title = typeof project.title === 'string' ? project.title : String(project.id);
    const description = typeof project.description === 'string' ? project.description : '';

    // Sanitize potential HTML
    const safeTitle = escape(title);
    const safeDescription = escape(description).slice(0, 160);

    return {
      title: `${safeTitle} — Portfolio`,
      description: safeDescription || undefined,
    };
  } catch (err) {
    // On any error, fail gracefully with generic metadata
    return {
      title: 'Project — Portfolio',
      description: 'Explore my projects and case studies.',
    };
  }
}
```

- **Edge Cases Handled:**
  - Missing project fallback returns generic metadata.
  - Basic sanitization to prevent HTML injection in metadata values.
  - Try/catch to avoid build-time exceptions if `src/content/index.ts` changes shape.

- **Clarification:** If your repository does not use `@src` path alias, replace imports with relative paths: `../../../../src/content/index` depending on file nesting.

---

### `src/components/language-provider.tsx`
#### MODIFY `src/components/language-provider.tsx`
- **Context:** Tighten types for translation dictionaries and `t()` function so downstream code no longer relies on `any`.
- **Logic:**
  1. Define a strict TranslationKey union or generic map type used across the app.
  2. Ensure LanguageProvider's context exposes typed `t` and current `locale`.
  3. Keep runtime behavior identical (fallback to key when missing) but surface type errors at compile-time.

- **Implementation:** Replace or refactor the module with the complete typed example below (copy-paste as a drop-in; adapt imports for your project structure):

```tsx
// src/components/language-provider.tsx
import React, { createContext, useContext, useMemo, ReactNode } from 'react';

// 1) Define the strong shape used by translations
export type TranslationDict = Record<string, string>;

export interface Translations {
  [locale: string]: TranslationDict;
}

export interface LanguageContextValue {
  locale: string;
  t: (key: string, defaultText?: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

interface LanguageProviderProps {
  children: ReactNode;
  defaultLocale?: string;
  translations: Translations; // e.g., { en: { hello: 'Hello' }, es: { hello: 'Hola' } }
}

export function LanguageProvider({ children, defaultLocale = 'en', translations }: LanguageProviderProps) {
  const locale = defaultLocale; // Clarification: if you read locale from router/session, pass it here instead

  const t = useMemo(() => {
    return (key: string, defaultText = '') => {
      const dict = translations[locale] ?? {};
      const value = dict[key];
      if (typeof value === 'string') return value;
      // Fallback strategy: explicit fallback to other locales or defaultText
      const fallback = Object.values(translations)[0]?.[key] as string | undefined;
      return fallback ?? defaultText ?? key;
    };
  }, [locale, translations]);

  const value: LanguageContextValue = { locale, t };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export default LanguageProvider;
```

- **Edge Cases Handled:**
  - Missing translation keys fallback to a safe string.
  - `translations` typed to reduce accidental `any` usage elsewhere.

- **Migration Strategy:**
  1. Replace the file and run `npx tsc --noEmit`.
  2. Fix call sites where `t()` was previously used with non-string expectations.

---

### `src/components/projects-gallery.tsx`
#### MODIFY `src/components/projects-gallery.tsx`
- **Context:** Improve keyboard accessibility for project cards and filter controls.
- **Logic:**
  1. Ensure interactive elements are buttons or links (not divs).
  2. Manage `aria-expanded` on toggles and set `aria-controls` pointing to collapsible content.
  3. Provide keyboard handlers for Enter and Space on elements that toggle content.

- **Implementation:** Replace the accordion item markup with the following accessible pattern (full, copy-paste-ready snippet for the accordion item):

```tsx
// Example accessible accordion item inside projects-gallery
import React, { useState } from 'react';

export function ProjectAccordionItem({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = `accordion-panel-${id}`;

  return (
    <div className="project-accordion-item">
      <h3>
        <button
          aria-expanded={open}
          aria-controls={panelId}
          id={`accordion-button-${id}`}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setOpen((v) => !v);
            }
          }}
          className="accordion-toggle"
        >
          {title}
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={`accordion-button-${id}`}
        hidden={!open}
        tabIndex={open ? 0 : -1}
      >
        {children}
      </div>
    </div>
  );
}
```

- **Edge Cases Handled:**
  - Keyboard users can toggle with Enter/Space.
  - Screen readers have roles and labels via `aria-controls` and `role=region`.
  - Hidden panels remove tab stops when closed via tabIndex.

---

### `src/components/footer.tsx`
#### MODIFY `src/components/footer.tsx`
- **Context:** Make social links configurable and accessible; avoid hard-coded `#` placeholders.
- **Logic:**
  1. Create a small `src/config/site-meta.ts` file exporting social URLs.
  2. Import them into Footer and render anchor tags with rel="noopener noreferrer" and descriptive text for screen readers.

- **Implementation:**

Create `src/config/site-meta.ts` (new file) with:

```ts
// src/config/site-meta.ts
export const SITE_META = {
  siteTitle: 'My Portfolio',
  social: {
    instagram: 'REPLACE_WITH_INSTAGRAM',
    linkedin: 'REPLACE_WITH_LINKEDIN',
    behance: 'REPLACE_WITH_BEHANCE',
  },
};

export default SITE_META;
```

Then update `src/components/footer.tsx` to use it (full module example):

```tsx
// src/components/footer.tsx
import React from 'react';
import SITE_META from 'src/config/site-meta';

export default function Footer() {
  const { instagram, linkedin, behance } = SITE_META.social;
  return (
    <footer aria-label="Site footer">
      <ul className="social-links">
        <li>
          <a href={instagram} aria-label="Instagram (opens in a new tab)" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </li>
        <li>
          <a href={linkedin} aria-label="LinkedIn (opens in a new tab)" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={behance} aria-label="Behance (opens in a new tab)" target="_blank" rel="noopener noreferrer">
            Behance
          </a>
        </li>
      </ul>
      <p>© {new Date().getFullYear()} {SITE_META.siteTitle}</p>
    </footer>
  );
}
```

- **Edge Cases Handled:**
  - Clear screen-reader labels and secure external link attributes.
  - If links remain as 'REPLACE_WITH_*', they will still render; document a follow-up to fail CI if placeholders detected.

---

## Verification Plan
### Automated Tests
1. Type check and lint:
   - `npx tsc --noEmit` (fix errors iteratively per file changed)
   - `npx eslint "src/**/*.{ts,tsx,js,jsx}" --max-warnings=0`
2. Build and smoke test (locally):
   - `npm run build` (or `next build`) to ensure `generateMetadata` doesn't break builds.
3. Accessibility checks:
   - Run `npx axe-core` or `pa11y` against a staging build for the projects index and a sample project page.

### Manual Checks
- Verify social links: open Footer and click each link in a private browser to ensure they navigate to the correct destination.
- Open a project page and inspect `<title>` and `<meta name="description">` in the head for expected values.
- Keyboard test: Tab through the projects gallery, ensure accordion toggles and filter buttons are focusable and operable with Enter/Space.

## Migration & Rollback
- Apply changes on a feature branch.
- After each file change, run `npx tsc --noEmit` and fix cascaded typing issues before proceeding.
- If build fails after metadata change, revert `generateMetadata` export and re-run `next build`.

## Notes & Clarifications
- Clarification: the plan assumes `src/content/index.ts` exposes either `projects` (array) or `getProjectById`. If neither exists, implement a small shim `export async function getProjectById(id: string) { /* read/parse content */ }` in `src/content/index.ts`.
- Clarification: imports use `src/` path alias in examples; replace with relative paths if your tsconfig doesn't define `baseUrl`/`paths`.

## Adversarial Synthesis (included here for traceability)
### Grumpy Critique
This plan is annoyingly optimistic. "Just add generateMetadata and fix types" is naive: the content shape is probably inconsistent, the app may not be using the Next.js app-router conventions expected, and tightening TypeScript will cascade into every component that leaks `any`. There's no rollback strategy, no migration plan for content shape changes, and the verification section is laughably thin (just run tsc and eslint?). Accessibility checks are superficial — keyboard navigation and aria attributes are only part of the work; focus management, skip links, and semantic structure are ignored. Also: the footer change asks for links but doesn't document where to store them safely (env? config?).

### Balanced Response
Valid criticisms. To mitigate: add explicit discovery steps for `src/content/index.ts` shape and app-router compatibility; make `generateMetadata` resilient (fallbacks and sanitization). Incrementally apply TypeScript strictness by targeting one module at a time and running `npx tsc --noEmit` after each change. For accessibility, include focused keyboard interactivity tests and screen-reader validation steps. Store social links in a single config file (e.g., `src/config/site-meta.ts`) rather than environment variables so the footer update is deterministic and reviewable.

## Recommendation
Complexity = 5 (Medium). Recommendation: Send to Coder.


## Verification Checklist (Quick)
- [ ] Confirm shape of `src/content/index.ts` (projects array vs helpers)
- [ ] Add `src/config/site-meta.ts` and update footer
- [ ] Implement `generateMetadata` and run `next build`
- [ ] Tighten `language-provider.tsx`, fix call sites, re-run `npx tsc --noEmit`
- [ ] Run accessibility checks and manual keyboard tests



