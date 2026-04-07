---
name: image-optimization
description: Pipeline de optimización de imágenes para un portfolio visual de diseño industrial con Next.js
---

# Image Optimization — Portfolio de Diseño Industrial

## Propósito

Este skill define las convenciones para manejar imágenes en un portfolio donde la calidad visual es crítica. Cubre cuándo usar `next/image`, cómo organizar assets, y cómo maximizar performance sin sacrificar fidelidad.

## Stack actual

- **Next.js 16** con `next/image` disponible
- **next.config.ts** ya configura `remotePatterns` para:
  - `lh3.googleusercontent.com` (Google/Stitch)
  - `images.unsplash.com`
  - `mir-s3-cdn-cf.behance.net`
- La página de Lumix ya usa `<Image>` de Next.js con `fill` + `priority`
- La galería principal usa `<img>` estáticos (por corregir)

## Reglas de implementación

### 1. SIEMPRE usar `next/image` en lugar de `<img>`

```tsx
// ❌ Incorrecto
<img src={project.image} alt={project.title} className="object-cover" />

// ✅ Correcto
import Image from 'next/image'
<Image
    src={project.image}
    alt={project.title}
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover"
/>
```

**Excepción**: En el `page-transition-provider.tsx`, la imagen de transición puede usar `<img>` porque es efímera y necesita cargarse del cache del browser instantáneamente.

### 2. Atributo `sizes` obligatorio

Siempre especificar `sizes` cuando se usa `fill`. Valores por contexto:

| Contexto                      | sizes                                          |
|-------------------------------|-------------------------------------------------|
| Hero full-screen              | `100vw`                                         |
| Gallery card (accordion)      | `(max-width: 768px) 100vw, 33vw`               |
| Gallery card (active)         | `(max-width: 768px) 100vw, 60vw`               |
| Project section (2-col grid)  | `(max-width: 768px) 100vw, 50vw`               |
| Project section (full)        | `100vw`                                         |
| CMF detail image (6-col)      | `(max-width: 768px) 100vw, 50vw`               |

### 3. Atributo `priority` solo para above-the-fold

Usar `priority` únicamente en:
- El hero de la home page (BackgroundPaths)
- El hero de cada página de proyecto
- La primera imagen visible de la galería

```tsx
// Solo la imagen hero del proyecto
<Image src={heroImage} fill priority alt="..." />

// Las demás imágenes: carga lazy por defecto
<Image src={sectionImage} fill alt="..." />
```

### 4. Organización de imágenes locales

```
public/
└── images/
    └── projects/
        ├── lumix/
        │   ├── hero.jpg          ← 1920×1080 min, JPG q85
        │   ├── hero-blur.jpg     ← 32×18, placeholder LQIP
        │   ├── sketch-01.jpg     
        │   ├── sketch-02.jpg     
        │   ├── detail-cmf.jpg    
        │   └── thumb.jpg         ← 800×600, para la galería
        ├── puriform/
        │   ├── hero.jpg
        │   └── thumb.jpg
        └── bandoneon/
            ├── hero.jpg
            └── thumb.jpg
```

### 5. Formatos y tamaños recomendados

| Tipo de imagen     | Formato  | Ancho máx | Calidad | Notas                                  |
|--------------------|----------|-----------|---------|----------------------------------------|
| Hero               | JPG/WebP | 1920px    | 85%     | Next.js sirve WebP/AVIF automáticamente|
| Galería thumbnail  | JPG/WebP | 800px     | 80%     | Suficiente para el accordion           |
| Sección de proceso | JPG/WebP | 1400px    | 85%     | Para grids de 2 columnas               |
| LQIP placeholder   | JPG      | 32px      | 20%     | Solo como `blurDataURL`                |

### 6. Placeholders blur (LQIP)

Para imágenes locales, generar un placeholder:

```tsx
import Image from 'next/image'
import heroImg from '@/public/images/projects/lumix/hero.jpg'

// Con import estático, Next.js genera el blur automáticamente:
<Image
    src={heroImg}
    alt="Lumix Pro X"
    placeholder="blur"
    fill
    priority
/>
```

Para URLs remotas, usar `blurDataURL`:

```tsx
<Image
    src="https://remote-url.com/image.jpg"
    alt="..."
    fill
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQ..."
/>
```

### 7. Agregar nuevos dominios remotos

Si se necesita cargar imágenes de un dominio nuevo, agregar en `next.config.ts`:

```typescript
images: {
    remotePatterns: [
        { protocol: "https", hostname: "lh3.googleusercontent.com" },
        { protocol: "https", hostname: "images.unsplash.com" },
        { protocol: "https", hostname: "mir-s3-cdn-cf.behance.net" },
        // Agregar nuevos dominios aquí:
        { protocol: "https", hostname: "nuevo-dominio.com" },
    ],
},
```

### 8. Script de optimización

Antes de subir imágenes locales, optimizarlas:

```bash
# Requiere: npm install -g sharp-cli (o usar squoosh.app)
# Resize hero a 1920px de ancho, calidad 85:
npx sharp -i input.jpg -o public/images/projects/lumix/hero.jpg resize 1920 --quality 85

# Generar LQIP de 32px:
npx sharp -i input.jpg -o public/images/projects/lumix/hero-blur.jpg resize 32 --quality 20
```

O usar la herramienta web: https://squoosh.app/

## Patrones a evitar

1. **NO** usar `unoptimized` excepto para SVGs
2. **NO** poner imágenes mayores a 2MB en `/public/`
3. **NO** olvidar el `alt` — accesibilidad y SEO
4. **NO** usar `fill` sin un contenedor con `position: relative`
5. **NO** cargar todas las imágenes con `priority` — solo las above-the-fold
