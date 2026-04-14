# Task: Plan 6 - SEO Dinámico, Accesibilidad y Limpieza de Tipado

## Phase 1: Deep Context Gathering
- [ ] Read `src/app/projects/[id]/page.tsx`
- [ ] Read `src/content/index.ts`
- [ ] Read `src/components/language-provider.tsx`
- [ ] Read `src/components/projects-gallery.tsx`
- [ ] Read `src/components/footer.tsx`
- [ ] Read `src/content/projects/_schema.ts`
- [ ] Verify Next.js version and app router compatibility.
- [ ] Call `complete_workflow_phase(phase: 1, workflow: "accuracy", notes: "Context gathered")`

## Phase 2: Thorough Plan
- [ ] Map dependencies between changes.
- [ ] Identify risks and edge cases.
- [ ] Define the exact `generateMetadata` implementation.
- [ ] Define the exact `LanguageProvider` type improvements.
- [ ] Define the exact `Footer` and social links strategy.
- [ ] Define the exact `ProjectsGallery` accessibility improvements.

## Phase 3: Implementation - Verified Groups
### Group 1: Configuration and Social Links
- [x] Create `src/config/site-meta.ts`.
- [x] Update `src/components/footer.tsx`.
- [x] Verify Group 1.

### Group 2: SEO and Metadata
- [ ] Implement `generateMetadata` in `src/app/projects/[id]/page.tsx`.
- [ ] Verify Group 2.

### Group 3: Typing Cleanup
- [ ] Refactor `src/components/language-provider.tsx`.
- [ ] Fix transitive typing issues in components using `t()`.
- [ ] Verify Group 3.

### Group 4: Accessibility
- [ ] Improve `src/components/projects-gallery.tsx` (and related components).
- [ ] Verify Group 4.

## Phase 4: Self-Review (Red Team)
- [ ] Holistic review of all changes.
- [ ] List ≥3 potential failure modes per modified file.
- [ ] Document findings in `### Red Team Findings`.
- [ ] Fix identified issues.

## Phase 5: Final Verification & Complete
- [ ] Final `npx tsc --noEmit`.
- [ ] Final `npx eslint`.
- [ ] Manual verification of SEO and A11Y.
- [ ] Call `complete_workflow_phase(phase: 5, workflow: "accuracy")`.
