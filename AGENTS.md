<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Skills & Portfolio Workflows

To maintain extreme professional consistency across the Industrial Design Portfolio, you MUST implicitly rely on and adopt the conventions written in these local Skill files located under `.agent/skills/`.
Whenever the USER asks for a task related to any of the following categories, you MUST FIRST use the `view_file` tool to read the corresponding `SKILL.md` and adhere entirely to its instructions BEFORE writing or planning any code:

1. **Accessibility**: `.agent/skills/accessibility-a11y/SKILL.md` (Aria labels, reduced motion, focus handling)
2. **Animations**: `.agent/skills/advanced-animations/SKILL.md` (Framer motion conventions, timings, shared elements)
3. **Content/MDX**: `.agent/skills/content-management/SKILL.md` (Adding new projects in generic TypeScript schema, tagging)
4. **Deploy & QA**: `.agent/skills/deployment-workflow/SKILL.md` (Linting, build steps, workflow validations before Vercel)
5. **Design Tokens**: `.agent/skills/design-system/SKILL.md` (Tailwind classes, brand colors `#FF4F00`, scale, Dark Mode rule)
6. **Localization**: `.agent/skills/i18n-internationalization/SKILL.md` (TranslatedText hooks and ES/EN objects)
7. **Images**: `.agent/skills/image-optimization/SKILL.md` (next/image standards, priority, placeholders)
8. **Performance**: `.agent/skills/performance-optimization/SKILL.md` (Lazy loading, JS budgets, mem callbacks)
9. **SEO**: `.agent/skills/seo-and-metadata/SKILL.md` (Metadata objects, JSON-LD, sitemap generation)

Always prioritize viewing these guidelines as your source of truth.
