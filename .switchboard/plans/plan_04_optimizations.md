# Plan 4: Optimizaciones de la Página Web
## Goal
Implementar mejoras de performance siguiendo el SKILL de optimización (`performance-optimization`). Nos centraremos en la carga diferida de Google Fonts en el `layout`, y lazy loading de componentes fuera de pantalla.

## User Review Required
> [!NOTE]
> La fuente puede causar un ligero FOUT (Flash of Unstyled Text) si se cambia `font-display`, por favor observar el proceso de carga en red lenta.

## Complexity Audit
### Routine
- Configuración en el Layout y actualización de Scripts a estrategia `lazyOnload`.
### Complex / Risky
- Implementación de `next/dynamic` para componentes pesados si aplicase, asegurando no romper SSR estático.

## Edge-Case & Dependency Audit
- **Race Conditions:** Fallos de hydration en componentes envolventes de Lenis provocados por diferir animaciones.
- **Side Effects:** Parpadeos en transiciones globales por componentes no montados.
- **Dependencies & Conflicts:** Estabilidad de la red con `next/font`.

## Adversarial Synthesis
### Grumpy Critique
Finally, some competence! I had to point out that your 'completed' portfolio was missing the actual projects, but at least you fixed it without me having to hold your hand for every line of CSS. Adding `DynamicProjectsGallery` and `DynamicMetadataStrip` to the home page was the only sane move here. I've also purged the redundant `useLanguage` in the footer and the unused imports in the navbar—honestly, do you even look at the lint warnings? And don't think I didn't notice the metadata in `layout.tsx`; I've kept it intact because unlike your plan's code block, it actually has SEO value. Now go run your Lighthouse report and don't come back until it's green across the board.

### Balanced Response
1.  **Fixed Missing Content**: Restored the `ProjectsGallery` and `MetadataStrip` to the home page using dynamic imports to satisfy both functionality and performance requirements.
2.  **Verified Optimizations**: Confirmed `next/font` is using `display: "swap"` and `preload: true`. All weights used in the design are correctly imported.
3.  **Code Cleanup**: Removed unused variables (`t`, `router`, `EASE_OUT_EXPO`, `DURATION`) and unnecessary ESLint disables in `footer.tsx`, `projects-gallery.tsx`, and `navbar.tsx`.
4.  **Preserved SEO**: Kept the detailed metadata and schema.org scripts in `layout.tsx` which were missing in the original plan's code block.

## Proposed Changes
> [!IMPORTANT]
> **MAXIMUM DETAIL REQUIRED:** Proporcionamos el bloque completo.

### Target Component 1: Root Layout Optimization
#### MODIFY `src/app/layout.tsx`
- **Context:** Mejorar carga y evitar requests masivos del font Google y evitar cascadas de carga, validando contra el performance skill.
- **Logic:** Aplicamos configuraciones `display: "swap"` nativas a `next/font` y diferimos componentes inferiores (Footer).
- **Implementation:** (Mantenida la versión con metadatos completos y Schema.org)

### Target Component 2: Home Page Optimization
#### MODIFY `src/app/page.tsx`
- **Context:** Carga diferida de secciones pesadas.
- **Logic:** Uso de `next/dynamic` para `ProjectsGallery`, `Capabilities`, `MetadataStrip` y `CtaSection`.

## Verification Plan
### Automated Tests
- `npx tsc --noEmit`: PASSED.
- `npx eslint src`: PASSED (Cleaned up unused variables).
- Lighthouse: LCP y Performance deben mantenerse sobre 90 tras la restauración de la galería.

## Final Review Results
- **Files Changed:**
  - `src/app/page.tsx`
  - `src/app/layout.tsx`
  - `src/components/footer.tsx`
  - `src/components/projects-gallery.tsx`
  - `src/components/navbar.tsx`
- **Validation:** Typecheck y lint verificados.
- **Risks:** FOUT leve en fuentes debido a `display: swap`. Hydration mismatch si Lenis inicializa antes que los componentes dinámicos (monitoreado, parece estable).
