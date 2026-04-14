# Plan 1: Reestructuración y Limpieza Profunda del Repositorio (Prioridad Máxima)

## Goal
Realizar una reestructuración exhaustiva de la arquitectura del proyecto. El objetivo es acomodar los archivos, realizar una revisión profunda del código base, y crear una carpeta de aislamiento (cuarentena) para agrupar todo el código, componentes o archivos legacy que ya están caducados o no tienen fin, permitiendo su revisión antes del borrado definitivo sin afectar el entorno de producción.

## Metadata
**Tags:** frontend, devops
**Complexity:** 4

## User Review Required
> [!NOTE]
> Se creará un directorio `src/_deprecated/` para alojar archivos obsoletos. Los archivos aquí colocados no formarán parte del build. Por favor revisa el contenido de esta carpeta una vez movidos los archivos, para proceder a su eliminación final con Git.

## Complexity Audit
### Routine
- Creación del directorio de cuarentena `src/_deprecated/`.
- Traslado de la carpeta `legacy_vanilla/` completa a `src/_deprecated/legacy_vanilla/`.
- Creación de un archivo `README.md` explicativo en la nueva carpeta.
### Complex / Risky
- Actualización de `tsconfig.json` para excluir explícitamente `src/_deprecated`.
- Actualización de `.gitignore` para asegurar que el contenido de la cuarentena no se rastree si así se decide (aunque inicialmente se mantendrá para revisión). *Clarificación: Se agregará al ignore para evitar ruido en el entorno de desarrollo local pero se documentará su estado.*

## Edge-Case & Dependency Audit
- **Race Conditions:** N/A.
- **Security:** Mantener archivos sensibles obsoletos en el repositorio, incluso en una carpeta ignorada, puede ser un riesgo si se commitean. Se requiere revisión manual posterior para eliminarlos del control de versiones.
- **Side Effects:** Romper el build de Next.js si componentes que actualmente están en uso terminan accidentalmente en la carpeta `_deprecated/`. 
- **Dependencies & Conflicts:** Este plan es la base de todo el trabajo futuro. Incertidumbre documentada: No se pudo consultar el estado del Kanban debido a errores técnicos, por lo que se asume prioridad máxima y aislamiento inicial.

## Adversarial Synthesis
### Grumpy Critique
¡Esto es una guardería para código muerto! Si el código no se usa, se borra. Git es nuestro historial, no necesitamos una carpeta `_deprecated` que solo ensucia el árbol de archivos. Además, mover `legacy_vanilla` ahí dentro es redundante si ya está fuera de `src`. ¿Qué ganamos con esto? Solo más líneas en el `tsconfig` y el `gitignore`. ¡Si quieres limpiar, usa el botón de suprimir!
### Balanced Response
Aunque la purga total es el objetivo final, el usuario necesita una zona de transición segura para validar que no se pierde material visual de referencia del portfolio antiguo. Mover `legacy_vanilla` dentro de `src/_deprecated` centraliza todo lo "no-activo" bajo una convención clara de Next.js (`_`) que garantiza que el router lo ignore. Es un paso intermedio necesario para una limpieza profesional sin riesgos de regresión visual accidental.

## Proposed Changes
> [!IMPORTANT]
> **MAXIMUM DETAIL REQUIRED:** Proporcionamos los bloques completos para asegurar el ecosistema.

### Step 1: Estructura de Directorios
#### CREATE `src/_deprecated/`
- **Context:** Carpeta raíz para todo el contenido obsoleto.
- **Logic:** Crear el directorio y mover el contenido de `legacy_vanilla` dentro de una subcarpeta homónima para mantener el orden.

### Step 2: Documentación de la Cuarentena
#### CREATE `src/_deprecated/README.md`
- **Context:** Documentar la carpeta para que otros agentes o el usuario sepan qué hacer con los archivos aquí dentro.
- **Logic:** Crear archivo de texto plano explicando el propósito temporal de la carpeta.
- **Implementation:**
```markdown
# 🗑️ Deprecated / Archivos Obsoletos

Esta carpeta fue generada tras la reestructuración profunda del proyecto. 
Contiene código, componentes, imágenes y archivos legacy que **ya han caducado o no sirven a ningún fin activo**.

> **Nota para el Usuario:** 
> Revisa los archivos que se han movido a este directorio. Una vez que confirmes que nada de lo que hay aquí es necesario, puedes proceder a borrar la carpeta entera (`rm -rf src/_deprecated/`). El compilador de Next.js (App Router) y TypeScript ignoran automáticamente cualquier carpeta que comience con un guión bajo (`_`).
```

### Step 3: Configuración de TypeScript
#### MODIFY `tsconfig.json`
- **Context:** El compilador de TypeScript escaneará la nueva carpeta de "basura" si no le decimos explícitamente que la ignore.
- **Logic:** Agregar `src/_deprecated` al array de `exclude`.
- **Implementation:**
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", ".agent", "legacy_vanilla", "src/_deprecated"]
}
```

### Step 4: Control de Versiones
#### MODIFY `.gitignore`
- **Context:** Evitar que los archivos temporales de la cuarentena ensucien las búsquedas o el estado de git si se desea ignorarlos localmente.
- **Logic:** Agregar la ruta al final del archivo.
- **Implementation:**
```text
# ... (contenido existente)

# Deprecated code
/src/_deprecated/
```

## Verification Plan
### Automated Tests
- Ejecutar `npx tsc --noEmit` para confirmar que los archivos antiguos movidos a `src/_deprecated` no causan fallos de tipado.
- Ejecutar `npm run build` para asegurar que el routing de Next.js compila exitosamente sin intentar renderizar la carpeta `_deprecated`.

## Agent Recommendation
Send to Coder
