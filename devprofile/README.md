# DevProfile

DevProfile es una aplicación web desarrollada con React para capturar, editar, previsualizar y exportar un CV profesional dinámico. El sistema permite administrar datos personales, habilidades, proyectos, educación/certificaciones e idiomas; además incluye dashboard de habilidades, modo oscuro, persistencia local y exportación a PDF.

## Tecnologías utilizadas

- React
- Vite
- React Router DOM
- Context API
- localStorage
- Recharts
- @react-pdf/renderer
- CSS responsive

## Funcionalidades principales

- Formulario controlado de datos personales.
- CRUD completo de habilidades.
- CRUD completo de proyectos.
- CRUD completo de educación, cursos y certificaciones.
- CRUD completo de idiomas.
- Validaciones de campos obligatorios, correo, URLs, duplicados, rangos y longitudes.
- Persistencia de datos con localStorage.
- Previsualización web dinámica del CV.
- Exportación del CV a PDF profesional.
- Imagen de perfil y capturas de proyectos desde archivos locales.
- Dashboard con gráfica dinámica de habilidades.
- Modo oscuro persistente.
- Diseño responsive.

## Rutas

- `/`: página de inicio.
- `/editor`: captura y edición de datos del CV.
- `/preview`: previsualización web y exportación a PDF.
- `/dashboard`: gráfica y resumen de habilidades.
- `/about`: información del proyecto.

## Instalación

```bash
npm install
```

## Ejecución local

```bash
npm run dev
```

## Build de producción

```bash
npm run build
```

## Vista previa del build

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Deploy

Proyecto preparado para Vercel.

Configuración recomendada:

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## Explicación de la lógica

La aplicación usa `CVContext` como fuente central de datos. Los datos se guardan en `localStorage` mediante un hook personalizado, por lo que la información persiste al recargar la página.

Cada sección del CV se administra con formularios controlados y componentes independientes. Las operaciones de agregar, editar y eliminar usan funciones reutilizables del contexto: `addItem`, `updateItem`, `removeItem` y `updateSection`.

La vista previa web toma directamente los datos de `cvData`, por lo que refleja cualquier cambio realizado desde el editor. La exportación a PDF usa `@react-pdf/renderer` y genera un archivo dinámico con la información actual del CV.

El dashboard usa `Recharts` para mostrar una gráfica de barras basada en `cvData.skills`, junto con métricas como total de habilidades, promedio de nivel, categoría más frecuente y nivel más alto.



## Integrantes

- Raul Romo Lamas
- Luis Gustavo Martinez Munoz
