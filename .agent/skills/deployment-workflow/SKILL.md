---
name: deployment-workflow
description: Flujo de trabajo y procesos de Quality Assurance y Deployment en Vercel
---

# Deployment Workflow — Portfolio de Diseño Industrial

## Propósito

Este skill define el proceso y las métricas necesarias para poder hacer el despliegue a los servidores en Vercel del portfolio de manera segura y libre de errores. Conecta todos los esfuerzos de consistencia, compilación estática de CMS y validaciones linting para la subida a Producción.

## 1. El entorno Vercel

El proyecto está diseñado de forma nativa para **Vercel**, aprovechando su infraestructura Edge y manejo automático del `next/image`. Ninguna configuración particular extra al `next.config.ts` existente suele ser necesaria a menos que se quiera manejar variables de entorno protegidas.

Ramas principales:
- `main` -> Apunta al dominio principal HTTPS de Producción (Deployment Final).
- Ramas adicionales o Pull Requests generarán Preview Deployments únicos automáticamente con Vercel. 

## 2. Checklist Pre-Deployment

Antes de considerar una migración de staging a producción o la culminación de un ticket, debe ejecutarse y verificar los siguientes pasos sin errores.

### Paso 1: El Linting
Correr el scanner de Next integrado. Esto validará React hooks exóticos y variables TypeScript no declaradas o faltantes al refactorizar.
```bash
npm run lint
```
*Si esto falla, no continuar con el deploy. Ajustar con el agente los errores emitidos.*

### Paso 2: Chequeo de Typescript y Data Models
Se debe garantizar que el schema del content-management `.ts` no rompa. Validar compilando la declaración de Type sin emitir artefactos:
```bash
npx tsc --noEmit
```

### Paso 3: El Build Experimental
Para garantizar que las rutas dinámicas, el i18n estático global, SEO y sitemaps sean compilados bien, simular el Build.
```bash
npm run build
```
Durante esto, se debe revisar la consola de log visual de Next:
- ¿Todas las páginas (excepto si hay features SSR explícitas) salen con tag `○  (Static)`?
- ¿El sitemap `sitemap.xml` compila correctamente la lista de archivos de los proyectos de MDX/JSON?

### Paso 4: Revisión de Enlaces Muertos
- Visitar rutas principales de proyectos de manera local.
- Confirmar que ningún proyecto en el status activo dirige a un `<Link href="#">`. Si lo hace, ponerlo en modo de draft o coming-soon.
- ¿Están todas las imágenes resueltas u optimizadas (ej. el og-image default está cargado)?

## 3. Automatización en Commit

- Solo commitear a un repositorio de origen que conecte con git / github integrado a Vercel. 
- Los envs como `NEXT_PUBLIC_SITE_URL` idealmente estarán preconfigurados en el panel Vercel Settings como el dominio base de la instancia final del portfolio.
