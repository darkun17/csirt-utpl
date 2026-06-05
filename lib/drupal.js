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
  return uri.startsWith('http') ? uri : `${BASE_URL}${uri}`;
}

function parseDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('es-EC', {
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
    body:      Array.isArray(a.field_cuerpo)
      ? a.field_cuerpo
      : [a.field_cuerpo].filter(Boolean),
    tags:      a.field_etiquetas      ?? [],
    links:     a.field_enlaces        ?? [],
    checklist: a.field_checklist      ?? [],
  };
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
    href:        a.field_url?.uri    ?? a.field_url ?? null,
    channel:     a.field_canal       ?? null,
    source:      a.field_fuente      ?? 'YouTube',
    embedUrl:    a.field_embed_url   ?? null,
    watchUrl:    a.field_watch_url   ?? null,
    image:       mediaUrl(inc, imgId),
  };
}

// ── Alertas / Noticias ─────────────────────────────────────────────────────

/** Devuelve alertas ordenadas por fecha descendente. Fallback: datos estáticos. */
export async function getAlerts({ limit = 20 } = {}) {
  try {
    const { data, included } = await drupalFetch(
      `/node/alerta?sort=-field_fecha&page[limit]=${limit}` +
      `&include=field_imagen,field_imagen.field_media_image`,
    );
    return data.map(n => mapAlert(n, included));
  } catch {
    return staticAlerts.slice(0, limit);
  }
}

/** Devuelve una alerta por slug. Fallback: búsqueda en datos estáticos. */
export async function getAlertBySlug(slug) {
  try {
    const { data, included } = await drupalFetch(
      `/node/alerta?filter[field_slug]=${encodeURIComponent(slug)}&page[limit]=1` +
      `&include=field_imagen,field_imagen.field_media_image`,
    );
    return data.length ? mapAlert(data[0], included) : null;
  } catch {
    return staticAlerts.find(a => a.slug === slug) ?? null;
  }
}

/** Devuelve todos los slugs para generateStaticParams. Fallback: slugs estáticos. */
export async function getAlertSlugs() {
  try {
    const { data } = await drupalFetch(
      `/node/alerta?fields[node--alerta]=field_slug&page[limit]=200`,
    );
    return data.map(n => n.attributes.field_slug).filter(Boolean);
  } catch {
    return staticAlerts.map(a => a.slug);
  }
}

// ── Ítems de página (tarjetas, tiles, listas) ──────────────────────────────
async function fetchItems(pagina, seccion) {
  const { data, included } = await drupalFetch(
    `/node/item_pagina?filter[field_pagina]=${pagina}` +
    `&filter[field_seccion]=${seccion}&sort=field_peso&page[limit]=20` +
    `&include=field_imagen,field_imagen.field_media_image`,
  );
  return data.map(n => mapItem(n, included));
}

/** Servicios CSIRT (inicio → servicios). Fallback: staticServices. */
export async function getServices() {
  try { return await fetchItems('inicio', 'servicios'); }
  catch { return staticServices; }
}

/** Rutas de aprendizaje (inicio → aprendizaje). Fallback: staticLearningTracks. */
export async function getLearningTracks() {
  try { return await fetchItems('inicio', 'aprendizaje'); }
  catch { return staticLearningTracks; }
}

/** Guías visuales (inicio → guias-visuales). Fallback: staticVisualGuides. */
export async function getVisualGuides() {
  try { return await fetchItems('inicio', 'guias-visuales'); }
  catch { return staticVisualGuides; }
}

/** Videos de referencia (inicio → videos). Fallback: staticVideos. */
export async function getReferenceVideos() {
  try { return await fetchItems('inicio', 'videos'); }
  catch { return staticVideos; }
}

/** Recursos educativos (recursos → lista). Fallback: staticResources. */
export async function getResources() {
  try { return await fetchItems('recursos', 'lista'); }
  catch { return staticResources; }
}

/** Canales editoriales (alertas → canales). Fallback: staticChannels. */
export async function getEditorialChannels() {
  try { return await fetchItems('alertas', 'canales'); }
  catch { return staticChannels; }
}

/** Secciones RFC 2350 (rfc2350 → secciones). Devuelve array de tuplas [título, texto]. */
export async function getRfcSections() {
  try {
    const items = await fetchItems('rfc2350', 'secciones');
    return items.map(i => [i.title, i.description]);
  } catch {
    return staticRfcSections;
  }
}

// ── Bloques de página (texto enriquecido editable) ─────────────────────────
/**
 * Devuelve un bloque de contenido editable o null si no existe / no está visible.
 *
 * Ejemplo de uso en una página:
 *   const bloque = await getPageBlock('inicio', 'sobre');
 *   {bloque?.cuerpo && <p dangerouslySetInnerHTML={{ __html: bloque.cuerpo }} />}
 */
export async function getPageBlock(pagina, seccion) {
  try {
    const { data } = await drupalFetch(
      `/block_content/bloque_pagina?filter[field_pagina]=${pagina}` +
      `&filter[field_seccion]=${seccion}&page[limit]=1`,
    );
    if (!data.length) return null;
    const a = data[0].attributes;
    if (a.field_visible === false) return null;
    return {
      titulo: a.field_titulo ?? null,
      cuerpo: a.field_cuerpo?.processed ?? a.field_cuerpo ?? null,
    };
  } catch {
    return null;
  }
}
