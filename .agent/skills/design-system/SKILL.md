---
name: design-system
description: Sistema de diseño formal con tokens, paleta, tipografía y componentes base para el portfolio
---

# Design System — Portfolio de Diseño Industrial

## Propósito

Este skill documenta el sistema de diseño del portfolio para mantener coherencia visual en todas las pantallas. Como diseñador industrial, la consistencia de tu portfolio ES parte de tu portfolio.

## Brand Identity

### Colores

| Token            | Light Mode     | Dark Mode      | Uso                              |
|------------------|----------------|----------------|----------------------------------|
| `--brand`        | `#FF4F00`      | `#FF4F00`      | Acento principal, CTAs, links    |
| `--foreground`   | `#1b1c1b`      | `#ffffff`      | Texto primario                   |
| `--background`   | `#ffffff`      | `#121212`      | Fondo de secciones principales   |
| `--surface`      | `#fafafa`      | `#181818`      | Fondo de secciones alternas      |
| `--surface-2`    | `#f5f5f7`      | `#1f1f1f`      | Cards, container backgrounds     |
| `--muted`        | `rgba(27,28,27,0.60)` | `rgba(255,255,255,0.60)` | Texto secundario  |
| `--border`       | `rgba(27,28,27,0.05)` | `rgba(255,255,255,0.05)` | Bordes sutiles    |
| `--border-hover` | `rgba(27,28,27,0.10)` | `rgba(255,255,255,0.10)` | Bordes en hover   |

### Color naranja — Reglas de uso

El naranja `#FF4F00` se usa **exclusivamente** para:
1. Tags y labels de categoría (`selectedWorks`, `caseStudy`, etc.)
2. Estado `:hover` de links de navegación
3. El nombre en el hero (`<span className="text-[#FF4F00]">Jesus Elisaleco</span>`)
4. Bullets de listas en Capabilities
5. Botón CTA principal
6. Hover del logo
7. CMF color swatch en la página de proyecto

**NUNCA** usar `#FF4F00` para:
- Fondos grandes (excepto CTA hover)
- Texto de párrafo
- Bordes permanentes

### Tipografía

| Variable CSS      | Fuente    | Pesos       | Uso                                    |
|-------------------|-----------|-------------|----------------------------------------|
| `--font-headline` | Poppins   | 400–800     | Títulos, nav links, botones, tags      |
| `--font-body`     | Inter     | 400–600     | Párrafos, labels, metadata             |

#### Escala tipográfica

| Elemento           | Clase Tailwind                                        | Ejemplo                    |
|--------------------|-------------------------------------------------------|----------------------------|
| Page hero title    | `font-headline text-6xl md:text-8xl font-extrabold tracking-tighter` | "Lumix Pro X" |
| Section title (h2) | `font-headline text-4xl md:text-5xl font-bold tracking-tight` | "Portfolio"   |
| Card title (h3/h4) | `font-headline text-xl font-bold` o `text-3xl font-bold` | "PuriForm"   |
| Tag / label        | `font-body text-[10px] tracking-[0.3em] uppercase font-bold` | "SELECTED WORKS" |
| Nav link           | `font-headline font-semibold text-[11px] md:text-[13px] tracking-tight` | "Projects" |
| Body text          | `font-body text-lg leading-relaxed`                   | Párrafos       |
| Footer link        | `font-headline text-[10px] uppercase tracking-[0.2em] font-bold` | "Instagram" |
| Micro text         | `font-body text-[9px] uppercase tracking-widest`      | "© 2024 JE"    |

### Espaciado

| Contexto                    | Padding / Gap                  |
|-----------------------------|--------------------------------|
| Container padding           | `px-6 md:px-16`                |
| Container max-width         | `max-w-[1600px] mx-auto`      |
| Section vertical padding    | `py-16 md:py-24` o `py-20 md:py-32` |
| Grid gap                    | `gap-8 md:gap-12`              |
| Cards internal padding      | `p-8 md:p-12`                  |
| Gallery cards gap           | `gap-4`                        |
| Section header margin       | `mb-12 md:mb-16`               |

### Border Radius

| Elemento          | Valor        |
|-------------------|--------------|
| Cards             | `rounded-xl` (12px) |
| Gallery cards     | `rounded-2xl` (16px) |
| Buttons / pills   | `rounded-full` |
| Dropdown menus    | `rounded-2xl` |

## Componentes base

### Tag / Label de categoría

```tsx
<span className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FF4F00] font-bold block">
    {label}
</span>
```

Se usa como preheader de secciones: "SELECTED WORKS", "CASE STUDY", "SPECIALTY".

### Section Header Pattern

```tsx
<div>
    <TagLabel translationKey="selectedWorks" />
    <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-[#1b1c1b] dark:text-white">
        {title}
    </h2>
</div>
```

### Card elevable

```tsx
<div className="bg-white dark:bg-[#1f1f1f] p-8 md:p-12 
    border border-black/5 dark:border-white/5 
    hover:shadow-2xl dark:hover:shadow-white/5 
    transition-all duration-500 rounded-xl 
    group hover:-translate-y-2">
    {children}
</div>
```

### Brand accent button

```tsx
<button className="font-headline text-[10px] font-bold uppercase tracking-widest 
    px-4 py-1.5 rounded-full border 
    bg-[#FF4F00] border-[#FF4F00] text-white
    transition-all duration-300">
    {label}
</button>
```

### Glassmorphic navbar (dock)

La navbar usa un patrón de glassmorphism complejo con:
- `backdrop-filter` con SVG filter custom (`#container-glass`)
- Box-shadows inset para el efecto bisel
- Sombras diferentes para light/dark mode
- Forma: `rounded-full` (pill shape)

**NO modificar las sombras del dock sin prueba visual.**

## Dark mode

### Principios
1. El dark mode NO es solo invertir colores
2. Los fondos oscuros usan una escala sutil: `#121212` → `#181818` → `#1f1f1f`
3. El texto principal pasa de `#1b1c1b` a `#ffffff`
4. El texto secundario usa opacidad: `opacity-60` o equivalente `text-white/60`
5. El naranja `#FF4F00` NO cambia en dark mode — es constante

### Transiciones dark/light
```tsx
className="bg-white dark:bg-[#121212] transition-colors duration-500"
```

Siempre usar `transition-colors duration-500` en elementos que cambian de fondo.

## Patrones prohibidos

1. **NO** usar colores arbitrarios fuera de la paleta definida
2. **NO** usar `font-sans` directamente — siempre `font-headline` o `font-body`
3. **NO** cambiar el naranja brand a otra tonalidad
4. **NO** usar borders más gruesos que 1px excepto en estados hover
5. **NO** usar opacidades intermedias fuera de la escala: 30, 40, 50, 60, 100
6. **NO** mezclar `rounded-xl` con `rounded-lg` en el mismo contexto visual
7. **NO** poner padding horizontal mayor a `px-16` en desktop

## Checklist para nuevas secciones

- [ ] ¿Usa container `max-w-[1600px] mx-auto px-6 md:px-16`?
- [ ] ¿El fondo alterna entre `bg-white` y `bg-[#fafafa]`?
- [ ] ¿Tiene dark mode con la escala correcta?
- [ ] ¿Los labels usan el patrón TagLabel?
- [ ] ¿Los títulos usan `font-headline` con el tamaño correcto?
- [ ] ¿El texto de párrafo usa `font-body`?
- [ ] ¿Los bordes usan la opacidad estándar (5% o 10%)?
- [ ] ¿Las transiciones de color son `duration-500`?
