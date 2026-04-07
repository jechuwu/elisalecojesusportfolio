---
name: advanced-animations
description: Convenciones de animación con Framer Motion para el portfolio de diseño industrial
---

# Advanced Animations — Portfolio de Diseño Industrial

## Propósito

Este skill documenta los patrones de animación del portfolio para mantener consistencia visual y rendimiento. Todo animación nueva debe seguir estas convenciones.

## Stack de animación

- **Framer Motion v12** (`framer-motion`) — Animaciones declarativas de React
- **Lenis** (`lenis`) — Smooth scroll via `lenis-provider.tsx`
- **CSS transitions** — Para microinteracciones simples (hover, color changes)

Actualmente NO se usa GSAP. Si se necesitase scroll storytelling avanzado, considerar `gsap` + `ScrollTrigger`.

## Convenciones globales

### Easing curve estándar

Todo el portfolio usa una única easing curve principal:

```typescript
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]  // cubic-bezier(0.16, 1, 0.3, 1)
```

**Usar esta curve para:** transiciones de layout, page transitions, menú mobile, overlays.

Para animaciones más suaves (fade-in on scroll), usar:

```typescript
const EASE_OUT = "easeOut"   // Framer Motion built-in
```

### Duraciones estándar

| Tipo de animación         | Duración | Delay   |
|---------------------------|----------|---------|
| Fade in on scroll         | 0.7s     | 0       |
| Stagger children          | 0.15s    | entre cada uno |
| Page transition overlay   | 0.7s     | —       |
| Navigation push           | 250ms    | —       |
| Hover micro-interaction   | 0.3-0.5s | 0       |
| Layout change (accordion) | 600ms    | 0       |
| Mobile menu open/close    | 0.3-0.4s | 0       |
| Tag filter dropdown       | 0.2s     | 0       |

### viewport config estándar

```typescript
// Para secciones que aparecen al scroll:
viewport={{ once: true, margin: "-50px" }}

// Para cards en grid con stagger:
viewport={{ once: true, margin: "-80px" }}
```

**`once: true` es OBLIGATORIO.** No queremos que las animaciones se repitan al scrollear hacia arriba.

## Patrones existentes

### 1. Scroll reveal (whileInView)

**Usado en:** Capabilities, Gallery header, CTA section.

```tsx
<motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7 }}
>
    {children}
</motion.div>
```

### 2. Stagger container + children

**Usado en:** Capabilities grid (3 cards).

```tsx
const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.15 }
    }
}

const card = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1, y: 0,
        transition: { duration: 0.7, ease: "easeOut" }
    }
}

<motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
    <motion.div variants={card}>...</motion.div>
    <motion.div variants={card}>...</motion.div>
</motion.div>
```

### 3. Page transition (shared element expand)

**Usado en:** `page-transition-provider.tsx`

La galería guarda el `DOMRect` de la card clickeada y lanza una animación que:
1. Toma la posición/tamaño exactos de la card
2. Anima a `top:0, left:0, width:100vw, height:100vh`
3. Simultáneamente muestra un overlay negro
4. Execute `router.push()` a los 250ms
5. Oculta el overlay a los 1000ms

```tsx
triggerTransition(project.img, project.link, cardRect)
```

### 4. Layout animation (accordion gallery)

**Usado en:** `projects-gallery.tsx`

```tsx
<motion.div layout transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}>
    {/* Content */}
</motion.div>
```

Con `<AnimatePresence mode="popLayout">` para filtrado de tags.

### 5. Mobile drawer

**Usado en:** `navbar.tsx`

```tsx
// Backdrop
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

// Drawer panel
<motion.nav
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
/>

// Stagger de links dentro del drawer
<motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
/>
```

### 6. Hamburger morphing

**Usado en:** `navbar.tsx`

```tsx
// Top bar: rota 45° y baja
animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}

// Middle bar: desaparece
animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}

// Bottom bar: rota -45° y sube
animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
```

## Patrones recomendados para implementar

### 7. Text reveal por línea

Para títulos dramáticos del hero:

```tsx
const words = title.split(" ")

<h1>
    {words.map((word, i) => (
        <motion.span
            key={i}
            className="inline-block mr-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: EASE_OUT_EXPO
            }}
        >
            {word}
        </motion.span>
    ))}
</h1>
```

### 8. Robin Noguier Project Hero Entry

Para las páginas de proyectos individuales, la transición debe emular https://robin-noguier.com/:

1. **Estado Inicial (Hero):** Solo es visible la imagen de héroe que se expandió desde la galería via Shared-Element transition, un título central gigante, y un botón de scroll animado. *Todo el contenido de lectura empieza empujado estrictamente por debajo de `100vh`.*
2. **Botón Scroll Down:** Un botón flotante que indique la acción (ej: círculo con flecha). Al clickearlo, dispara scroll a la primera caja de texto.
3. **Scroll Reveal del Texto:** El texto descriptivo no existe en la carga visual inicial. A medida que se entra al viewport, usa `slide-up` suave.

```tsx
// 1. Contenedor Hero 100vh puro
<section className="relative w-full h-[100vh]">
    {/* Imagen y Título Aquí */}

    {/* 2. Botón Scroll animado (Flotante abajo) */}
    <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
        ↓
    </motion.button>
</section>

// 3. Primer Texto empieza fuera e interactúa con el scroll
<motion.section 
    initial={{ opacity: 0, y: 100 }} 
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px" }}
    transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
>
   {/* Contenido descriptivo del proyecto viaja desde abajo */}
</motion.section>
```

### 9. Parallax sutil en scroll

Para imágenes dentro de secciones de proyecto:

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])

<motion.div ref={ref} style={{ overflow: "hidden" }}>
    <motion.img style={{ y }} ... />
</motion.div>
```

### 9. Cursor personalizado

Para la galería en desktop:

```tsx
const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

<motion.div
    className="fixed w-16 h-16 rounded-full border border-[#FF4F00] pointer-events-none z-50 mix-blend-difference"
    animate={{ x: mousePos.x - 32, y: mousePos.y - 32 }}
    transition={{ type: "spring", stiffness: 500, damping: 28 }}
/>
```

## Accesibilidad

### prefers-reduced-motion

Respetar SIEMPRE la preferencia del usuario:

```tsx
import { useReducedMotion } from "framer-motion"

const prefersReducedMotion = useReducedMotion()

<motion.div
    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: prefersReducedMotion ? 0 : 0.7 }}
/>
```

## Performance

1. **Animar solo `transform` y `opacity`** — nunca `width`, `height`, `top`, `left` en animaciones de scroll
2. **Usar `layout` animation** de Framer Motion para transiciones de tamaño (ya se hace en gallery)
3. **`viewport={{ once: true }}`** para evitar re-renders en scroll
4. **`will-change: transform`** en CSS solo para elementos que se animan continuamente (parallax)
5. **NO** usar `AnimatePresence` dentro de listas grandes (50+ items) — causa Re-renders masivos

## Reglas de prohibición

1. **NO** importar GSAP sin consultar primero — aumenta el bundle significativamente
2. **NO** animar `box-shadow` directamente — usar `opacity` de un pseudo-elemento
3. **NO** usar `transition: all` en CSS — especificar las propiedades exactas
4. **NO** mezclar CSS transitions y Framer Motion en el mismo elemento
5. **NO** crear animaciones de más de 1.5s de duración sin razón justificada
