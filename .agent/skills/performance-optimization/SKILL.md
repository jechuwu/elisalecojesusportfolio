---
name: performance-optimization
description: Estrategias de performance para mantener puntajes altos en Lighthouse en el portfolio de diseño industrial
---

# Performance Optimization — Portfolio de Diseño Industrial

## Propósito

El portfolio usa grandes imágenes de alta calidad y muchísimas transiciones animadas con micro-layouts, todo lo cual consume considerables recursos de red, Parse/Compile JS y renderizado y compositing del Layout en el Main Thread. Este skill normaliza estrategias de performance críticas para no comprometer el Wow Factor.

## 1. Lazy Loading Components Dinámicos Pesados

No todo el JavaScript necesita parsearse apenas entra el usuario. Para interactividad debajo del fold o componentes con alta carga, usa el `dynamic` de Next.js.

### Implementación en Framer-Motion (LazyMotion)

Si notas un peso excesivo en `_app` debido a `framer-motion`, se debe cambiar el layout a `LazyMotion` usando `domAnimation`. Sin embargo, esto limita la habilidad de realizar transiciones complejas on `layout` al vuelo. **Solo evaluar el refactor a LazyMotion si los reportes de Bundle Size alertan sobre esto.**

### Carga de Modelos 3D u otros scripts profundos

Diferir interactividad secundaria:
```tsx
import dynamic from 'next/dynamic'

// Componente pesado que solo renderiza después del client load, o abajo
const HeavySplineViewer = dynamic(
  () => import('@/components/spline-view'),
  { ssr: false, loading: () => <div className="h-96 skeleton" /> }
)
```

## 2. Memorización Selectiva con React Hooks

La galería interactiva y el drawer navigation re-renderizan el árbol. Es fundamental memoizar resultados o callbacks costosos.

### Cuatro reglas prácticas
- Usa `useMemo` para listas de proyectos resultantes de un filtro. (Ya implementado correctamete en `projects-gallery.tsx`).
- Usa `useCallback` en funciones pasadas hacia dependencias complejas (como `handleProjectClick` para el transition provider).
- NO memoices componentes atómicos o triviales usando `React.memo` si sus tags están cambiando rápido; evaluar con React Profiler si realmente ahorra renderizado.

## 3. Font Loading Inteligente

En lugar de usar un enlace estático al CDN de Google, utiliza `next/font` local y optimizado en build time. Ya está configurado en `layout.tsx`:

```tsx
import { Inter, Poppins } from "next/font/google"; // CORRECTO
```
*Garantizar que nuevos weights requeridos se especifiquen en los imports de font.*

## 4. Análisis de Bundle Size (El script obligatorio)

Si la performance degrada, o una nueva librería (ej: gsap, spline) fue instalada, corre el análisis:
El archivo `next.config.ts` se puede ajustar para tener el `@next/bundle-analyzer`:

Requisito a nivel de línea de comandos cuando revises métricas:
```bash
npm run build
```
*(Nota: Sugerirle al usuario la instalación de `ANALYZE=true npm run build` via `@next/bundle-analyzer` si nota cuellos de botella).*

## 5. Criterios para Scripts Terceros (Analytics, etc)

Nunca poner tags de scripts en head/body directo (ej. Google Analytics, Vercel Analytics). Siempre usar el componente `<Script>` de Next y utilizar el método ideal de carga `strategy="worker"` o `strategy="lazyOnload"`.

```tsx
import Script from 'next/script'

<Script 
  src="https://example.com/analytics.js" 
  strategy="lazyOnload" 
/>
```

## Checklist General
- [ ] ¿Los hero images de la URL han sido preoptimizados por tamaño original y convertidos a WebP / usan priority attr? (Ver `image-optimization`).
- [ ] ¿Librerías externas nuevas fueron dinámicamente deferidas?
- [ ] ¿Se han filtrado los `useEffect` que provocan "cascadas" innecesarias en el scroll de Lenis?
