# CSIRT UTPL — Portal de Seguridad de la Información

Portal universitario oficial del **CSIRT UTPL** (Computer Security Incident Response Team) de la Universidad Técnica Particular de Loja. Desarrollado con Next.js como aplicación estática de alto rendimiento.

---

## Stack técnico

| Tecnología | Versión | Rol |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.2.6 | Framework React con App Router |
| [React](https://react.dev/) | 18.3.1 | Librería de interfaz de usuario |
| CSS Modules / Global CSS | — | Sistema de diseño propio |
| Fuentes | Montserrat + Roboto | Tipografía institucional UTPL |

**Renderizado:** Generación estática (SSG) — todas las páginas se pre-renderizan en build time.  
**Sin base de datos:** el contenido se gestiona desde `data/content.js` y `data/csirtConfig.js`.

---

## Instalación y desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/darkun17/csirt-utpl.git
cd csirt-utpl

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev
# → http://localhost:3000

# Build de producción
npm run build
npm start
```

---

## Estructura del proyecto

```
csirt-utpl/
├── app/                        # App Router de Next.js
│   ├── page.jsx                # Página de inicio
│   ├── layout.jsx              # Layout raíz (fuentes, metadata)
│   ├── globals.css             # Sistema de diseño completo
│   ├── alertas/
│   │   ├── page.jsx            # Listado de noticias y alertas
│   │   └── [slug]/page.jsx     # Artículo individual
│   ├── servicios/page.jsx      # Servicios del CSIRT
│   ├── vulnerabilidades/page.jsx # Política de divulgación
│   ├── recursos/page.jsx       # Biblioteca de aprendizaje
│   ├── rfc2350/page.jsx        # Documento RFC 2350
│   ├── contacto/page.jsx       # Canales y horarios de atención
│   └── reportar-incidente/page.jsx # Formulario de reporte
│
├── components/                 # Componentes reutilizables
│   ├── Header.jsx              # Navegación sticky con indicador activo
│   ├── Footer.jsx              # Footer UTPL + redes sociales CSIRT
│   ├── AlertCard.jsx           # Tarjeta de noticia/alerta
│   ├── AlertsGrid.jsx          # Grid interactivo con filtros (client)
│   ├── ReportIncidentCTA.jsx   # CTA con radar animado
│   ├── ReportForm.jsx          # Formulario de reporte de incidentes
│   ├── ResourceGrid.jsx        # Grilla de recursos y documentos
│   ├── SeverityMatrix.jsx      # Tabla de clasificación de severidad
│   ├── VideoLibrary.jsx        # Biblioteca de videos de seguridad
│   └── ...
│
├── data/
│   ├── content.js              # Contenido editorial (alertas, recursos, nav)
│   └── csirtConfig.js          # Configuración institucional del CSIRT
│
└── public/
    ├── assets/                 # SVGs e imágenes del sitio
    ├── icons/social/           # Iconos de redes sociales
    └── logo-utpl.png           # Logotipo institucional
```

---

## Páginas y secciones

### `/` — Inicio
- **Hero** animado con escudo flotante y beneficios institucionales
- **Quiénes somos** con estadísticas del equipo
- **Últimas 6 publicaciones** con enlace a archivo completo
- **Educación continua** con rutas de aprendizaje
- **Campañas visuales** de concientización
- **VideoLibrary** con material audiovisual
- **Servicios + Valores** institucionales

### `/alertas` — Noticias y alertas
- **Banner animado** con campana, indicadores dinámicos de publicaciones y canales
- **Búsqueda en tiempo real** por tema, amenaza o palabra clave
- **Filtros por categoría** (Todas / Alerta / Manual / Novedad / Recomendación / Noticia)
- **Ordenación** por más recientes o más antiguos
- **Artículo destacado** con imagen grande
- **Grilla de 2 columnas** con paginación por carga progresiva
- **Compartir** en Facebook y X con extracto automático del artículo

### `/alertas/[slug]` — Artículo individual
- Contenido estructurado con cuerpo, checklist y enlaces relacionados

### `/servicios` — Servicios del CSIRT
- **Banner** con escudo animado y badges de servicios
- **Nuestra misión** con icono institucional
- **Servicios reactivos** (4 tarjetas): recepción, clasificación, análisis, coordinación
- **Servicios proactivos** (5 tarjetas): alertas, vulnerabilidades, concientización, capacitación, mejora continua
- **Tabla resumen** de servicios
- **Alcance y limitaciones** rediseñado con tarjetas y separador dorado
- **Tabla de severidad** con clasificación por niveles

### `/vulnerabilidades` — Política de divulgación responsable
- **Banner** con escudo + bug animado
- **Objetivo de la política** — tarjeta con eyebrow institucional
- **Alcance** — tarjeta con caja de advertencia de autorización previa
- **Actividades permitidas y no permitidas** — grilla comparativa
- **Cómo reportar** — lista numerada con información requerida
- **Confidencialidad y divulgación** — badge "Divulgación coordinada"
- **Reconocimiento** — badge "Colaboración responsable"
- **Timeline horizontal de 7 pasos** — proceso post-reporte con iconos y acento dorado

### `/recursos` — Biblioteca de aprendizaje
- **Banner** con birrete animado y badges de categorías
- Guías rápidas de phishing, contraseñas, dispositivos, copias de seguridad
- Sección de eventos y proyectos

### `/rfc2350` — Norma RFC 2350
- **Banner** con documento animado
- Canal oficial, resumen de misión, comunidad y horario
- Grid de secciones del RFC
- Procedimiento de notificación de incidentes
- **Aviso legal** rediseñado con icono, línea dorada y nota de transparencia

### `/contacto` — Contacto
- **Banner** con sobre animado
- **Canales oficiales** (correo, formulario, sitio web)
- **Horario de atención** rediseñado: tarjeta con horario + caja de advertencia URGENTE
- **Comunicación segura PGP** con tarjeta de Clave + Fingerprint y nota informativa

### `/reportar-incidente` — Reportar incidente
- **Banner** con portapapeles animado y badges de proceso
- Formulario estructurado de reporte
- Panel lateral con recomendaciones previas al reporte

---

## Sistema de diseño

### Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#004270` | Azul UTPL principal |
| `--color-primary-dark` | `#002f52` | Azul oscuro (header, hero) |
| `--color-accent` | `#f2a900` | Dorado UTPL (CTAs, badges, acentos) |
| `--color-bg` | `#f5f7fa` | Fondo gris claro (secciones alternas) |
| `--utpl-blue-dark` | `#07284b` | Azul muy oscuro (títulos) |

### Tipografía
- **Montserrat** — headings, labels, botones
- **Roboto** — cuerpo de texto, párrafos

### Banners de subpáginas (`richPageHero`)
Cada subpágina tiene un banner oscuro temático con:
- Fondo degradado + rejilla de puntos + líneas de circuito SVG animadas
- Banda diagonal geométrica
- Icono central animado con efecto de flotación (`heroFloat`)
- Anillos de halo pulsantes
- 3 badges flotantes con animación desfasada
- Color de glow específico por temática (rojo/dorado/verde/azul/violeta/cian/naranja)

### Componentes de patrones
- `.vulnInfoLayout` — sección con icono circular + separador + contenido
- `.legalNotice` — tarjeta de aviso con icono + línea dorada vertical
- `.limitationsHeader` / `.limitationsCards` — sección con tarjetas de items
- `.contactSectionHead` — encabezado de sección con icono + acento dorado
- `.scheduleCard` / `.scheduleUrgent` / `.pgpDataCard` — componentes de contacto
- `.vulnTimelineNums` / `.vulnTimelineGrid` — timeline horizontal de 7 pasos

---

## Gestión de contenido

Todo el contenido editorial está centralizado en `data/content.js`:

```js
// Agregar una nueva alerta
export const alerts = [
  {
    slug: 'mi-nueva-alerta',
    title: 'Título de la alerta',
    category: 'Alerta',        // Alerta | Manual | Recomendación | Noticia | Novedad
    severity: 'Alto',          // Crítico | Alto | Medio | Bajo
    date: '5 junio 2026',
    readTime: '3 min',
    image: 'URL_DE_IMAGEN',
    summary: 'Resumen breve...',
    deck: 'Texto para compartir en redes sociales.',
    tags: ['tag1', 'tag2'],
    body: ['Párrafo 1...', 'Párrafo 2...'],
    links: [{ label: 'Texto', href: '/ruta' }],
    checklist: ['Item 1', 'Item 2'],
  },
  // ...
];
```

La configuración institucional (email, horarios, URL PGP) está en `data/csirtConfig.js`.

---

## Funcionalidades destacadas

- **Filtros client-side** en `/alertas`: búsqueda, categoría, orden y carga progresiva sin recarga de página
- **Compartir con extracto automático**: los botones de X usan el campo `deck` del artículo como texto pre-cargado
- **Indicadores dinámicos**: el banner de alertas cuenta publicaciones y canales desde los datos reales
- **Radar animado** en el CTA de reporte de incidentes (CSS `conic-gradient` rotante)
- **Timeline horizontal** de 7 pasos en vulnerabilidades (CSS Grid con línea conectora)
- **Alternancia blanco/gris** en secciones de todas las páginas para mejor legibilidad

---

## Despliegue

El proyecto es 100% estático tras el build. Compatible con cualquier CDN o servidor de archivos.

```bash
npm run build
# Resultado en .next/ — listo para Vercel, Netlify, S3, etc.
```

**Vercel (recomendado):** conectar el repositorio en [vercel.com](https://vercel.com) y el deploy es automático.

---

## Contacto institucional

- **Email CSIRT:** csirt@utpl.edu.ec
- **Facebook:** [facebook.com/CsirtUtpl](https://www.facebook.com/CsirtUtpl)
- **X / Twitter:** [x.com/csirtutpl](https://x.com/csirtutpl)
- **Universidad:** [utpl.edu.ec](https://utpl.edu.ec)
