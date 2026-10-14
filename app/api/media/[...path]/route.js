/**
 * Proxy de imágenes Drupal → navegador
 *
 * Drupal corre en localhost:8086 (no accesible desde el browser).
 * Next.js fetcha la imagen server-side y la sirve públicamente en /api/media/...
 *
 * Ejemplo:
 *   /api/media/2026-06/akira.jpg
 *   → fetch interno: http://localhost:8086/sites/default/files/2026-06/akira.jpg
 */

const BASE = process.env.DRUPAL_BASE_URL ?? 'http://localhost:8086';

export async function GET(request, { params }) {
  const { path } = await params;
  const filePath  = Array.isArray(path) ? path.join('/') : path;
  const drupalUrl = `${BASE}/sites/default/files/${filePath}`;

  try {
    const res = await fetch(drupalUrl, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return new Response(null, { status: res.status });
    }

    const body        = await res.arrayBuffer();
    const contentType = res.headers.get('content-type') ?? 'image/jpeg';

    return new Response(body, {
      headers: {
        'Content-Type':  contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
      },
    });
  } catch {
    return new Response(null, { status: 500 });
  }
}
