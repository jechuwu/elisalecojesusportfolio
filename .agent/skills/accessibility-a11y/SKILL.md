---
name: accessibility-a11y
description: Guía de accesibilidad para mantener el portfolio inclusivo sin sacrificar diseño
---

# Accesibilidad (a11y) — Portfolio de Diseño Industrial

## Propósito

Como diseñador industrial, la ergonomía y accesibilidad son parte de la función pura de los productos. Este skill define los estándares de accesibilidad digital para asegurar que el portfolio proporcione una excelente experiencia a todos los usuarios, utilizando lectores de pantalla, navegación por teclado o preferencias del sistema.

## 1. Navegación por Teclado (Focus Management)

El portfolio debe ser 100% navegable sin mouse.

### Reglas para elementos interactivos

- Todos los botones (`<button>`), enlaces (`<a>`, `<Link>`) y controles interactivos deben tener un indicador de foco visible (y diseñado).
- El foco default del navegador no encaja con nuestro sistema de diseño premium, así que lo reemplazamos con estados custom.

```css
/* Globals: Remove default focus outline and use custom */
*:focus-visible {
    outline: 2px solid var(--brand); /* #FF4F00 */
    outline-offset: 4px;
}
```

```tsx
// Ejemplo de aplicación de Tailwind (si se prefiere sobre globale):
className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF4F00] focus-visible:outline-offset-4"
```

## 2. ARIA y Atributos Semánticos

Para que los Screen Readers interpreten correctamente componentes visualmente complejos (como el drawer mobile o galería de acordeón escondiendo labels).

### Roles visuales decorativos

Para elementos puramente decorativos (SVG backgrounds, íconos de adornos), usa:
```tsx
<svg aria-hidden="true" focusable="false" ... />
```

### Controles sin texto

Para botones que solo tienen iconos (theme toggle, language toggle):
```tsx
<button aria-label="Cambiar tema" ...>
  <MoonIcon aria-hidden="true" />
</button>
```

### Elementos expandibles (Dropdowns / Menús Mobile)

Usa atributos ARIA para vincular gatillos con content:
```tsx
// Gatillo del filtro de tags
<button 
  aria-expanded={tagsOpen} 
  aria-controls="tag-dropdown-list"
  aria-label="Filtrar proyectos"
>
...
</button>

// Lista del contenido
<div id="tag-dropdown-list" role="menu">...</div>
```

## 3. Reducción de Movimiento Sensible

Respetar la preferencia `prefers-reduced-motion` del sistema operativo es obligatorio. Todo efecto de zoom masivo o parallax debe poder deshabilitarse para ciertos usuarios.

Con Framer Motion:
```tsx
import { useReducedMotion } from "framer-motion"

export function MyComponent() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
    >
      Contenido
    </motion.div>
  )
}
```
Para CSS puro:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 4. Contraste de Color

Mantenemos contraste WCAG 2.1 Nivel AA como mínimo.
- El color `#FF4F00` (naranja) puede fallar el contraste sobre fondos muy oscuros o muy claros si el texto es muy delgado (menor a 18px). **Regla:** Úsalo con `font-bold` para texto pequeño, o limítate a texto grande (Headers). Alternativamente, úsalo en backgrounds con texto en `#FFF`.
- Textos grises en modo light no deben bajar del 60% de opacidad (`opacity-60`).

## Check-list antes de publicar componentes
- [ ] ¿Se puede navegar al componente presionando 'Tab'?
- [ ] ¿Hay un estado `focus` y es claramente visible?
- [ ] ¿Respeta el componente si el usuario solicita reducción de movimiento?
- [ ] ¿Tienen todos los botones un `aria-label` descriptivo o texto renderizado?
- [ ] ¿Las imágenes informativas tienen atributos `alt` correctos?
