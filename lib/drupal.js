/**
 * Drupal JSON:API — capa de servicio
 *
 * TIPOS DE CONTENIDO REQUERIDOS EN DRUPAL
 * ─────────────────────────────────────────
 * node--alerta
 *   title, field_slug (text), field_categoria (list), field_severidad (list),
 *   field_fecha (date), field_autor (text), field_tiempo_lectura (text),
 *   field_resumen (text_long), field_intro (text_long),
 *   field_cuerpo (text_long, multi-valor), field_etiquetas (text, multi-valor),
 *   field_imagen (entity_reference → media), field_enlaces (text_long multi,
 *   formato JSON: [{label, href}]), field_checklist (text, multi-valor)
 *
 * node--item_pagina
 *   field_pagina (text), field_seccion (text), field_peso (integer),
 *   field_titulo (text), field_descripcion (text_long), field_kicker (text),
 *   field_url (link), field_canal (text), field_fuente (text),
 *   field_embed_url (text), field_watch_url (text),
 *   field_imagen (entity_reference → media)
 *
 * block_content--bloque_pagina
 *   info (admin label), field_pagina (text), field_seccion (text),
 *   field_titulo (text), field_cuerpo (text_long formatted), field_visible (boolean)
 *
 * MÓDULOS DRUPAL REQUERIDOS
 * ─────────────────────────
 * - jsonapi (núcleo), jsonapi_extras (alias de campos),
 *   simple_oauth (autenticación API), pathauto (aliases de URL),
 *   media, media_library
 *
 * VARIABLE DE ENTORNO
 * ────────────────────
 * DRUPAL_BASE_URL=http://localhost:8086   (dev / test)
 * DRUPAL_BASE_URL=https://admin-csirt.utpl.edu.ec  (prod, acceso VPN)
 */

import {
  alerts          as staticAlerts,
  learningTracks  as staticLearningTracks,
  services        as staticServices,
  visualGuides    as staticVisualGuides,
  referenceVideos as staticVideos,
  resources       as staticResources,
  editorialChannels as staticChannels,
  rfcSections     as staticRfcSections,
} from '../data/content';

const BASE_URL = process.env.DRUPAL_BASE_URL ?? 'http://localhost:8086';
const JSONAPI  = `${BASE_URL}/jsonapi`;

// ── Fetch base ─────────────────────────────────────────────────────────────
async function drupalFetch(path, { revalidate = 60 } = {}) {
  const res = await fetch(`${JSONAPI}${path}`, {
    headers: { Accept: 'application/vnd.api+json' },
    next: { revalidate },
  });
  if (!res.ok) throw new Error(`Drupal ${res.status} — ${JSONAPI}${path}`);
  return res.json();
}

// ── Helpers ────────────────────────────────────────────────────────────────
function mediaUrl(included, mediaId) {
  if (!mediaId || !included?.length) return null;
  const media  = included.find(i => i.id === mediaId);
  const fileId = media?.relationships?.field_media_image?.data?.id;
  const file   = included?.find(i => i.id === fileId);
  const uri    = file?.attributes?.uri?.url;
  if (!uri) return null;
  // Drupal corre en localhost — el browser no puede acceder directamente.
  // Extraemos el path relativo y lo servimos via el proxy /api/media/...
  const match = uri.match(/\/sites\/default\/files\/(.+)/);
  if (match) return `/api/media/${match[1]}`;
  return uri.startsWith('http') ? uri : `${BASE_URL}${uri}`;
}

function parseDate(iso) {
  if (!iso) return '';
  // Strings solo de fecha (YYYY-MM-DD) se interpretan como UTC midnight.
  // Añadir T12:00:00 evita que UTC-5 desplace al día anterior.
  const d = new Date(iso.length === 10 ? `${iso}T12:00:00` : iso);
  return d.toLocaleDateString('es-EC', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

// ── Mappers ────────────────────────────────────────────────────────────────
function mapAlert(node, inc) {
  const a     = node.attributes;
  const imgId = node.relationships?.field_imagen?.data?.id;
  return {
    slug:      a.field_slug            ?? node.id,
    title:     a.title,
    category:  a.field_categoria      ?? 'Noticia',
    severity:  a.field_severidad      ?? 'Medio',
    date:      parseDate(a.field_fecha),
    author:    a.field_autor          ?? 'CSIRT UTPL',
    readTime:  a.field_tiempo_lectura ?? '3 min',
    image:     mediaUrl(inc, imgId),
    summary:   a.field_resumen        ?? '',
    deck:      a.field_intro          ?? '',
    body:      (() => {
      const raw = a.field_cuerpo;
      if (!raw) return [];
      const arr = Array.isArray(raw) ? raw : [raw];
      return arr.map(c =>
        typeof c === 'object' && c !== null
          ? (c.processed ?? c.value ?? '')
          : String(c)
      ).filter(Boolean);
    })(),
    tags:      (a.field_etiquetas ?? []).map(t =>
      typeof t === 'object' && t !== null ? (t.value ?? t) : t
    ),
    links:     a.field_enlaces        ?? [],
    checklist: (a.field_checklist ?? []).map(c =>
      typeof c === 'object' && c !== null ? (c.value ?? c) : c
    ),
  };
}

function resolveHref(fieldUrl) {
  const raw = fieldUrl?.uri ?? fieldUrl ?? null;
  if (!raw) return null;
  // Drupal "no link" patterns → null
  if (raw === 'route:<nolink>' || raw === '<nolink>') return null;
  // internal: URIs → strip prefix, treat bare / or /# as null
  if (raw.startsWith('internal:')) {
    const path = raw.slice('internal:'.length);
    if (!path || path === '/' || path === '/#' || path === '#') return null;
    return path;
  }
  return raw;
}

function mapItem(node, inc) {
  const a     = node.attributes;
  const imgId = node.relationships?.field_imagen?.data?.id;
  return {
    title:       a.field_titulo      ?? a.title ?? '',
    description: a.field_descripcion ?? '',
    text:        a.field_descripcion ?? '',    // alias → learningTracks
    kicker:      a.field_kicker      ?? '',
    type:        a.field_kicker      ?? '',    // alias → resources
    label:       a.field_titulo      ?? '',    // alias → editorialChannels
    href:        resolveHref(a.field_url),
    channel:     a.field_canal       ?? null,
    source:      a.field_fuente      ?? 'YouTube',
    embedUrl:    a.field_embed_url   ?? null,
    watchUrl:    a.field_watch_url   ?? null,
    image:       mediaUrl(inc, imgId),
    grupo:       a.field_grupo       ?? null,
  };
}

// Mapea un paragraph--tarjeta_pagina (tarjeta anidada dentro de un bloque).
// Misma forma que mapItem() a propósito: todo el código que antes consumía
// item_pagina (nodos sueltos) sigue funcionando igual, solo cambia de dónde
// viene el dato.
function mapParagraph(paragraph, inc) {
  return mapItem(paragraph, inc);
}

// ── Grupos de tarjetas: de dónde viene cada pagina/seccion que antes era un
// item_pagina independiente, ahora que viven dentro de un bloque. La mayoría
// son 1:1 (seccion del bloque = seccion del grupo); los casos donde un mismo
// bloque reúne varios grupos de tarjetas distintas (ej. el hero de inicio
// tiene "tarjetas de beneficio" Y "botones") necesitan mapeo explícito.
// Ver scripts/migrate-items-to-paragraphs.php para la migración que generó
// estos grupos.
const GROUP_MAP = {
  'inicio/beneficios':        { seccion: 'hero',              grupo: 'beneficios' },
  'inicio/hero-botones':      { seccion: 'hero',              grupo: 'hero-botones' },
  'inicio/stats':             { seccion: 'sobre',              grupo: 'stats' },
  'inicio/guias-visuales':    { seccion: 'oferta-contenidos',  grupo: 'guias-visuales' },
  'inicio/servicios-cta':     { seccion: 'servicios',          grupo: 'servicios-cta' },
  'alertas/canales':          { seccion: 'hero',               grupo: 'canales' },
  'servicios/tabla-resumen':  { seccion: 'resumen',            grupo: 'tabla-resumen' },
  'recursos/tips':            { seccion: 'guia-phishing',      grupo: 'tips' },
  'recursos/lista':           { seccion: 'principales',        grupo: 'lista' },
  'vulnerabilidades/permitidas':    { seccion: 'limites', grupo: 'permitidas' },
  'vulnerabilidades/no-permitidas': { seccion: 'limites', grupo: 'no-permitidas' },
  'vulnerabilidades/requisitos':    { seccion: 'reportar', grupo: 'requisitos' },
  'servicios/cta-botones':          { seccion: 'cta', grupo: 'cta-botones' },
  'contacto/cta-botones':           { seccion: 'cta', grupo: 'cta-botones' },
  'vulnerabilidades/cta-botones':   { seccion: 'cta', grupo: 'cta-botones' },
  'rfc2350/cta-botones':            { seccion: 'cta', grupo: 'cta-botones' },
};

// ── Alertas / Noticias ─────────────────────────────────────────────────────

/** Devuelve alertas ordenadas por fecha descendente. Sin fallback estático — empieza vacío. */
export async function getAlerts({ limit = 20 } = {}) {
  try {
    const { data, included } = await drupalFetch(
      `/node/alerta?sort=-field_fecha&page[limit]=${limit}` +
      `&include=field_imagen,field_imagen.field_media_image`,
    );
    return data.map(n => mapAlert(n, included));
  } catch {
    return [];
  }
}

/** Devuelve una alerta por slug (field_slug). Si el slug es un UUID, intenta
 *  fetch directo al nodo para no romper links generados antes de poblar field_slug. */
export async function getAlertBySlug(slug) {
  const inc = '&include=field_imagen,field_imagen.field_media_image';
  try {
    // 1. Buscar por field_slug (caso normal)
    const { data, included } = await drupalFetch(
      `/node/alerta?filter[field_slug]=${encodeURIComponent(slug)}&page[limit]=1${inc}`,
    );
    if (data.length) return mapAlert(data[0], included);

    // 2. Fallback: si parece UUID, fetch directo al nodo
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)) {
      const res = await drupalFetch(
        `/node/alerta/${slug}?include=field_imagen,field_imagen.field_media_image`,
      );
      // Respuesta de nodo único: data es objeto, no array
      const node = Array.isArray(res.data) ? res.data[0] : res.data;
      return node ? mapAlert(node, res.included ?? []) : null;
    }

    return null;
  } catch {
    return null;
  }
}

/** Devuelve todos los slugs para generateStaticParams. Sin fallback estático. */
export async function getAlertSlugs() {
  try {
    const { data } = await drupalFetch(
      `/node/alerta?fields[node--alerta]=field_slug&page[limit]=200`,
    );
    return data.map(n => n.attributes.field_slug).filter(Boolean);
  } catch {
    return [];
  }
}

// ── Bloques de página (texto + tarjetas anidadas, todo editable en UN solo
// formulario de Drupal — ver scripts/setup-paragraphs.php) ─────────────────
/**
 * Devuelve un bloque de contenido editable (texto + tarjetas) o null si no
 * existe / no está visible.
 *
 * Ejemplo de uso en una página:
 *   const bloque = await getPageBlock('inicio', 'sobre');
 *   {bloque?.cuerpo && <p dangerouslySetInnerHTML={{ __html: bloque.cuerpo }} />}
 *   {bloque?.items.map(...)}
 */
export async function getPageBlock(pagina, seccion) {
  try {
    const { data, included } = await drupalFetch(
      `/block_content/bloque_pagina?filter[field_pagina]=${pagina}` +
      `&filter[field_seccion]=${seccion}&page[limit]=1` +
      `&include=field_imagen,field_imagen.field_media_image,` +
      `field_imagen_fondo,field_imagen_fondo.field_media_image,` +
      `field_tarjetas,field_tarjetas.field_imagen,field_tarjetas.field_imagen.field_media_image`,
    );
    if (!data.length) return null;
    const a   = data[0].attributes;
    const rel = data[0].relationships;
    if (a.field_visible === false) return null;
    const imgId  = rel?.field_imagen?.data?.id ?? null;
    const imgFondoId = rel?.field_imagen_fondo?.data?.id ?? null;

    const tarjetaRefs = rel?.field_tarjetas?.data ?? [];
    const items = tarjetaRefs
      .map(ref => included?.find(i => i.id === ref.id && i.type === 'paragraph--tarjeta_pagina'))
      .filter(Boolean)
      .map(p => mapParagraph(p, included));

    return {
      titulo: a.field_titulo   ?? null,
      kicker: a.field_kicker   ?? null,
      cuerpo: a.body?.processed ?? a.body?.value ?? null,
      imagen: mediaUrl(included, imgId),
      imagenFondo: mediaUrl(included, imgFondoId),
      items,
    };
  } catch {
    return null;
  }
}

/** Ítems/tarjetas de una página — ahora viven anidados dentro de un bloque
 *  (field_tarjetas), no como contenido suelto. GROUP_MAP resuelve a qué
 *  bloque y bajo qué "grupo" interno migró cada (pagina, seccion) que antes
 *  era un item_pagina independiente (ver scripts/migrate-items-to-paragraphs.php).
 *  Para los casos 1:1 (la mayoría) no hace falta entrada en GROUP_MAP: el
 *  bloque tiene la misma seccion y el grupo coincide con ella.
 */
export async function getPageItems(pagina, seccion) {
  const mapeo = GROUP_MAP[`${pagina}/${seccion}`] ?? { seccion, grupo: seccion };
  const bloque = await getPageBlock(pagina, mapeo.seccion);
  if (!bloque) return [];
  return bloque.items.filter(i => i.grupo === mapeo.grupo);
}

/** Servicios CSIRT (inicio → servicios). Fallback: staticServices. */
export async function getServices() {
  const items = await getPageItems('inicio', 'servicios');
  return items.length ? items : staticServices;
}

/** Rutas de aprendizaje (inicio → aprendizaje). Fallback: staticLearningTracks. */
export async function getLearningTracks() {
  const items = await getPageItems('inicio', 'aprendizaje');
  return items.length ? items : staticLearningTracks;
}

/** Guías visuales (inicio → guias-visuales). Fallback: staticVisualGuides. */
export async function getVisualGuides() {
  const items = await getPageItems('inicio', 'guias-visuales');
  return items.length ? items : staticVisualGuides;
}

/** Videos de referencia (inicio → videos). Fallback: staticVideos. */
export async function getReferenceVideos() {
  const items = await getPageItems('inicio', 'videos');
  return items.length ? items : staticVideos;
}

/** Recursos educativos (recursos → lista). Fallback: staticResources. */
export async function getResources() {
  const items = await getPageItems('recursos', 'lista');
  return items.length ? items : staticResources;
}

/** Canales editoriales (alertas → canales). Fallback: staticChannels. */
export async function getEditorialChannels() {
  const items = await getPageItems('alertas', 'canales');
  return items.length ? items : staticChannels;
}

/** Secciones RFC 2350 (rfc2350 → secciones). Devuelve array de tuplas [título, texto]. */
export async function getRfcSections() {
  const items = await getPageItems('rfc2350', 'secciones');
  return items.length ? items.map(i => [i.title, i.description]) : staticRfcSections;
}
