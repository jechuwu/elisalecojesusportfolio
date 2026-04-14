# Plan 2: Revisión General de Arquitectura y Código

## Goal
Auditar y estabilizar la base de código actual para asegurar el cumplimiento estricto con las reglas inamovibles definidas en `.agent/skills/` (Accessibility, Animations, Images, SEO, etc.), limpiando importaciones no utilizadas, comprobando tipos estrictos y asegurando consistencia en la nomenclatura de los componentes y las dependencias.

## Metadata
**Tags:** frontend, devops
**Complexity:** 5

## User Review Required
> [!NOTE]
> Esta revisión aplicará reglas estrictas del linter y TS compiler. Podría revelar errores subyacentes que rompan la compilación temporalmente. No lanzar a producción sin verificar `npm run build`.

## Complexity Audit
### Routine
- Estandarización de imports en archivos de `src/lib` y `src/hooks`.
- Formateo de archivos según `.cursorrules` (convenciones de espaciado y nombrado).
- Eliminación de console.logs y código muerto.
### Complex / Risky
- Auditoría de cumplimiento de `SKILL.md`: Verificar que cada componente cumpla con las reglas de Accesibilidad (Aria labels) y Optimización de Imágenes (Next/Image priority).
- Estabilización del schema central en `src/content/projects/_schema.ts` para evitar inconsistencias en el CMS estático.

## Edge-Case & Dependency Audit
- **Race Conditions:** N/A.
- **Security:** Revisión de posibles dependencias maliciosas o desactualizadas en `package.json`.
- **Side Effects:** Cambios de tipado podrían afectar los esquemas en `_schema.ts`.
- **Dependencies & Conflicts:** Depende de la limpieza realizada en el PLAN 1. Incertidumbre: No se pudo verificar conflictos en Kanban por fallo de herramienta; se procede con precaución.

## Adversarial Synthesis
### Grumpy Critique
Una "revisión general" es una invitación al desastre. Si tocas cada archivo buscando "consistencia", vas a introducir bugs en el renderizado de Framer Motion o romper el tipado de los proyectos. ¿Y qué es eso de "estabilizar el schema"? Si el schema cambia, rompes el contenido de todos los proyectos. ¡Deja de jugar a ser el arquitecto y arregla lo que está roto!
### Balanced Response
Para evitar la parálisis y el riesgo innecesario, la revisión se centrará quirúrgicamente en: 1) Configuración de ESLint para forzar las reglas de los `SKILL.md`, 2) Unificación de tipos en el entry point del contenido (`src/content/index.ts`) para evitar ciclos, y 3) Limpieza de archivos vacíos o redundantes detectados (como `metadata-strip.tsx` si no tiene uso). No se alterará la lógica de negocio ni las animaciones existentes.

## Proposed Changes
> [!IMPORTANT]
> **MAXIMUM DETAIL REQUIRED:** Proporcionamos el bloque completo para asegurar el ecosistema.

### Step 1: Configuración Estricta de ESLint
#### MODIFY `eslint.config.mjs`
- **Context:** Asegurar compatibilidad absoluta con Next.js 16.2.1 y React 19, sumado al soporte del Plan 1.
- **Logic:** Aplicar ignorar carpetas legacy y forzar reglas de hooks y variables no usadas.
- **Implementation:**
```javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

globalIgnores([
  ".next/*",
  "out/*",
  ".switchboard/*",
  "legacy_vanilla/*",
  "src/_deprecated/*",
  "node_modules/*"
]);

export default defineConfig([
  nextVitals,
  nextTs,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-console": ["warn", { "allow": ["warn", "error"] }]
    }
  }
]);
```

### Step 2: Auditoría de Tipos y Schema
#### MODIFY `src/content/projects/_schema.ts`
- **Context:** Garantizar que todos los proyectos sigan un contrato estricto de datos.
- **Logic:** Asegurar que `ProjectSection` y `ProjectData` tengan campos requeridos y opcionales correctamente definidos para evitar `undefined` en el render.
- **Implementation:**
```typescript
/**
 * Schema de datos para proyectos del portfolio.
 * Refinado para asegurar consistencia ES/EN.
 */

export interface ProjectSection {
    tag: string
    title: string
    paragraphs: string[]
    images?: string[]
}

export interface ProjectContent {
    category: string
    heroDescription: string
    client: string
    role: string
    discipline: string
    sections: ProjectSection[] // Forzamos secciones como requeridas (pueden ser array vacío)
}

export interface ProjectData {
    id: string
    title: string
    shortName: string
    tags: string[]
    image: string
    link: string
    year: string
    order: number
    status: 'published' | 'draft' | 'coming-soon'
    content: {
        es: ProjectContent
        en: ProjectContent
    }
}
// ... resto del archivo (tagLabels) permanece igual
```

## Verification Plan
### Automated Tests
- Ejecutar `npx tsc --noEmit` para validar el impacto del cambio en el schema en todos los archivos de `src/content/projects/`.
- Ejecutar `npm run lint` para validar la nueva configuración de ESLint.

## Agent Recommendation
Send to Coder
