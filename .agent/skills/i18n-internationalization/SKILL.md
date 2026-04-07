---
name: i18n-internationalization
description: Sistema de internacionalización robusto ES/EN usando el contexto actual
---

# Internacionalización (i18n) — Portfolio de Diseño Industrial

## Propósito

Define cómo extender de manera segura y estandarizada el sistema de idiomas. Actualmente el portfolio usa una arquitectura liviana de contexto en memoria (`src/components/language-provider.tsx`), adecuada y performante para clientes estáticos. Este skill documenta cómo gestionarlas para escalar.

## 1. Convenciones de Claves de Traducción

Añadir nuevas traducciones en el diccionario debe seguir una taxonomía clara.
Evite jerarquías profundas en los diccionarios para no complicar el tipado y mantenlo plano u organizado por sufijos/fijos lógicos:

- **Secciones generales:** `about`, `projects`, `services`, `contact`
- **Páginas / Blocks:** `aboutTitle`, `aboutDesc`, `heroDesc`
- **Nombres y Arrays:** Clases que son listas usa la convención básica: `list1`, `list2` que apuntan a sus arreglos.

### Añadir nueva clave:

```typescript
// En src/components/language-provider.tsx
export const translations = {
    es: {
        // ...
        newSectionTitle: 'Nuevo Título',
        buttonSubmit: 'Enviar'
    },
    en: {
        // ...
        newSectionTitle: 'New Title',
        buttonSubmit: 'Submit'
    }
}
```

## 2. Uso de Textos Estáticos (UI Básica)

Usar el componente wrapper `TranslatedText` siempre que sea posible. Reduce el boilerplate de importar el hook y mantener React limpio.

```tsx
import { TranslatedText } from "@/components/translated-text"

// Componente Básico (genera un span)
<TranslatedText translationKey="buttonSubmit" />

// Como elemento específico (ej: h2) con clases de Tailwind
<TranslatedText 
  as="h2" 
  translationKey="newSectionTitle" 
  className="font-headline text-2xl font-bold" 
/>
```

## 3. Uso Textos Dinámicos y Atributos (Hook)

Cuando necesitas pasar un label al atributo `aria-label`, `placeholder`, o procesar props compuestos, se usa directamente el hook `useLanguage`.

```tsx
import { useLanguage } from "@/components/language-provider"

export function FormInput() {
    const { t } = useLanguage()

    return (
        <label aria-label={t('newSectionTitle')}>
            <input placeholder={t('buttonSubmit')} />
        </label>
    )
}
```

## 4. Traducción de Contenido Complejo (MDX / Proyectos)

La información no estándar o de gran volumen (p. ej. párrafos extensos de case studies de proyectos) NO ESTÁN en el diccionario global para no engrosar su peso general en memoria.

Van directamente en el schema de MDX / Project Data del sistema de gestión de contenidos (Ver: `content-management` skill).

Ejemplo: Los párrafos del proyecto *Lumix* residen en `project.content.es` y `project.content.en`. Se accede a ellos recuperando `lang` del context para discriminar.

```tsx
const { lang } = useLanguage();
const projectContent = projectData.content[lang];

return <p>{projectContent.heroDescription}</p>;
```

## Checklist de i18n
- [ ] ¿Existe el string en los objetos de traducción `es` y `en` de `language-provider.tsx`?
- [ ] ¿Se usa `TranslatedText` en vez del clásico texto de HTML estricto?
- [ ] Para proyectos, ¿se actualizó ambos `es` y `en` en el archivo `/src/content/projects/[name].ts`?
