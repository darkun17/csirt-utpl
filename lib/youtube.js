/**
 * Normalización segura de URLs de YouTube.
 *
 * `field_embed_url`/`embedUrl` viene de Drupal como texto libre — NUNCA se
 * debe meter directo en un `iframe src` (cualquier URL arbitraria sería un
 * vector de inyección: `javascript:`, `data:`, u hosts parecidos como
 * "youtube.com.evil.example" o "evil-youtube.com" que un regex de substring
 * aceptaría por error). Esta función parsea la URL con el constructor `URL`
 * nativo y compara el HOSTNAME exacto, no una subcadena.
 *
 * Acepta únicamente:
 *   https://www.youtube.com/embed/{ID}
 *   https://www.youtube.com/watch?v={ID}   (y variantes youtube.com sin www)
 *   https://youtu.be/{ID}
 *
 * Cualquier otro host, protocolo (`javascript:`, `data:`, `http:` no-https)
 * o un ID con caracteres fuera de [A-Za-z0-9_-] (longitud 6–20, rango real
 * de IDs de YouTube) hace que devuelva null — el llamador NO debe renderizar
 * ningún iframe en ese caso.
 */

const ALLOWED_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com']);
const ALLOWED_SHORT_HOSTS = new Set(['youtu.be']);
const VIDEO_ID_RE = /^[a-zA-Z0-9_-]{6,20}$/;

export function extractYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null; // no es una URL válida en absoluto
  }

  if (parsed.protocol !== 'https:') return null; // bloquea javascript:, data:, http:, etc.

  const host = parsed.hostname.toLowerCase();
  let candidateId = null;

  if (ALLOWED_HOSTS.has(host)) {
    if (parsed.pathname.startsWith('/embed/')) {
      candidateId = parsed.pathname.slice('/embed/'.length);
    } else if (parsed.pathname === '/watch') {
      candidateId = parsed.searchParams.get('v');
    }
  } else if (ALLOWED_SHORT_HOSTS.has(host)) {
    candidateId = parsed.pathname.slice(1); // /{ID} → {ID}
  }

  if (!candidateId) return null;
  // Corta cualquier segmento extra (ej. /embed/ID/algo, o ID con slash final)
  candidateId = candidateId.split('/')[0];

  return VIDEO_ID_RE.test(candidateId) ? candidateId : null;
}

/** URL de embed en modo "privacy-enhanced" — construida por nosotros desde
 *  el ID ya validado, nunca reutilizando el string original como src. */
export function toPrivacyEnhancedEmbedUrl(url) {
  const id = extractYouTubeId(url);
  if (!id) return null;
  return `https://www.youtube-nocookie.com/embed/${id}`;
}
