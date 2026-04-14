# Design-to-Code Sync Skill

Este skill define el proceso para realizar cambios en el portfolio utilizando los PDFs exportados como referencia de diseño.

## Workflow de Iteración

1. **Exportación**: El asistente genera los PDFs vectoriales usando `npm run export-pdf`.
2. **Edición**: El usuario abre el PDF en Adobe Illustrator, Figma o Acrobat y realiza ajustes visuales (espaciado, colores, tipografía, composición).
3. **Sincronización**:
   - El usuario envía una captura de pantalla del diseño editado o describe los cambios específicos.
   - El asistente interpreta los cambios visuales y actualiza el código React/Tailwind correspondiente.
   - Se realiza una nueva exportación para verificar la fidelidad.

## Convenciones de Implementación

- **Fidelidad Visual**: Los cambios en el PDF deben tratarse como la nueva "verdad" de diseño.
- **Tokens de Diseño**: Siempre que sea posible, mapear los cambios del PDF a variables en `globals.css` o tokens de Tailwind.
- **Estado Final**: El PDF representa el estado final estático. Las animaciones deben diseñarse para culminar en la apariencia mostrada en el PDF.

## Comandos Útiles

- `npm run export-pdf`: Genera réplicas 1:1 en la carpeta `/exports`.
