# Task: Animations Standardization

## Phase 1: Context Gathering
- [x] Read all files that will be modified: `src/components/navbar.tsx`, `src/components/footer.tsx`, `src/components/capabilities.tsx`.
- [x] Read dependency file: `src/lib/animations.ts`.
- [x] Read `.agent/rules/switchboard_modes.md`.
- [x] Identify side-effects and dependencies.

## Phase 2: Thorough Plan
- [x] Map dependencies between changes.
- [x] Identify risks and edge cases.

## Phase 3: Implementation - Group 1: Navbar
- [x] Modify `src/components/navbar.tsx`.
- [x] Verify changes in `src/components/navbar.tsx`.
- [x] Run `npx tsc --noEmit` and `npm run lint`.

## Phase 4: Implementation - Group 2: Footer & Capabilities
- [x] Modify `src/components/footer.tsx`.
- [x] Modify `src/components/capabilities.tsx`.
- [x] Verify changes in `src/components/footer.tsx` and `src/components/capabilities.tsx`.
- [x] Run `npx tsc --noEmit` and `npm run lint`.

## Phase 5: Self-Review (Red Team)
- [ ] Review all changes for edge cases, error paths, and style.
- [ ] List ≥3 potential failure modes per modified file.
- [ ] Final verification and complete.
