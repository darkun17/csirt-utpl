'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';

const SITE_URL = 'https://csirt.utpl.edu.ec';
const PAGE_SIZE = 4;

/* ── Excerpt for social sharing ── */
function getExcerpt(alert) {
  const text = alert.deck || alert.summary;
  return text.length > 200 ? text.slice(0, 197) + '…' : text;
}

function xShareUrl(alert) {
  const excerpt = getExcerpt(alert);
  const text = `${excerpt}`;
  const url = `${SITE_URL}/alertas/${alert.slug}`;
  return `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&via=csirtutpl`;
}
function fbShareUrl(alert) {
  const url = `${SITE_URL}/alertas/${alert.slug}`;
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

/* ── Severity badge colors ── */
const SEVERITY_COLORS = {
  critico: '#c62828', alto: '#e65100', medio: '#f9a825', bajo: '#388e3c', informativo: '#1565a0',
};
function severityColor(s = '') {
  const k = s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  return SEVERITY_COLORS[k] || '#5d6675';
}

/* ── Category text color class ── */
function catClass(cat = '') {
  const k = cat.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const map = { alerta: 'catColor--alerta', manual: 'catColor--manual', noticia: 'catColor--noticia', novedad: 'catColor--novedad', recomendacion: 'catColor--recomendacion' };
  return map[k] || 'catColor--default';
}

/* ── Share bar ── */
function ShareBar({ alert, large = false }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`${SITE_URL}/alertas/${alert.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* silent */ }
  }, [alert.slug]);

  return (
    <div className={`newsShareBar${large ? ' newsShareBar--lg' : ''}`}>
      <span className="newsShareLabel">Compartir:</span>
      <a href={fbShareUrl(alert)} target="_blank" rel="noopener noreferrer"
        className="newsShareBtn newsShareBtn--fb" aria-label="Compartir en Facebook">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      </a>
      <a href={xShareUrl(alert)} target="_blank" rel="noopener noreferrer"
        className="newsShareBtn newsShareBtn--x" aria-label="Compartir en X">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
      <button onClick={copy} className={`newsShareBtn newsShareBtn--copy${copied ? ' copied' : ''}`}
        aria-label={copied ? 'Enlace copiado' : 'Copiar enlace'}>
        {copied
          ? <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          : <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        }
      </button>
    </div>
  );
}

/* ── Meta row ── */
function ArticleMeta({ alert }) {
  return (
    <div className="newsCardMeta">
      <span className={`newsCardCategory ${catClass(alert.category)}`}>{alert.category}</span>
      <span className="newsCardDot">·</span>
      <time>{alert.date}</time>
      <span className="newsCardDot">·</span>
      <span>🕐 {alert.readTime}</span>
    </div>
  );
}

/* ── Main component ── */
export default function AlertsGrid({ alerts }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [sort, setSort] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categories = ['Todas', ...Array.from(new Set(alerts.map((a) => a.category))).sort()];

  const filtered = (() => {
    let list = alerts.filter((a) => {
      const matchesCat = category === 'Todas' || a.category === category;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        (a.deck || '').toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
    if (sort === 'oldest') list = [...list].reverse();
    return list;
  })();

  const reset = () => { setVisibleCount(PAGE_SIZE); };
  const [featured, ...rest] = filtered;
  const visible = rest.slice(0, visibleCount);
  const hasMore = rest.length > visibleCount;

  return (
    <div className="alertsPageBody">
      <div className="container">

        {/* ── Filter bar ── */}
        <div className="alertsFilterBar">
          <div className="alertsFilterTop">
            <div className="alertsSearchWrap">
              <svg className="alertsSearchIcon" viewBox="0 0 24 24" width="17" height="17" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="search"
                className="alertsSearchInput"
                placeholder="Buscar por tema, amenaza o palabra clave"
                value={search}
                onChange={(e) => { setSearch(e.target.value); reset(); }}
              />
            </div>
            <div className="alertsCategoryTabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`alertsCatBtn${category === cat ? ' active' : ''}`}
                  onClick={() => { setCategory(cat); reset(); }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="alertsFilterBottom">
            <span className="alertsCount">
              {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
            </span>
            <select
              className="alertsSortSelect"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Más recientes</option>
              <option value="oldest">Más antiguos</option>
            </select>
          </div>
        </div>

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <div className="alertsEmpty">
            <p>No se encontraron publicaciones para esta búsqueda.</p>
          </div>
        )}

        {/* ── Featured article ── */}
        {featured && (
          <article className="newsFeatured">
            <Link href={`/alertas/${featured.slug}`} className="newsFeaturedImage">
              <img src={featured.image} alt="" loading="lazy" />
              <span
                className="newsSeverityBadge"
                style={{ background: severityColor(featured.severity) }}
              >
                🔔 {featured.category} · {featured.severity}
              </span>
            </Link>
            <div className="newsFeaturedBody">
              <ArticleMeta alert={featured} />
              <h2><Link href={`/alertas/${featured.slug}`}>{featured.title}</Link></h2>
              <p>{featured.deck || featured.summary}</p>
              <div className="newsTags">
                {featured.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="newsTag">{tag}</span>
                ))}
              </div>
              <div className="newsFeaturedFooter">
                <Link href={`/alertas/${featured.slug}`} className="newsReadMore">
                  Leer más →
                </Link>
                <ShareBar alert={featured} large />
              </div>
            </div>
          </article>
        )}

        {/* ── Article grid ── */}
        {visible.length > 0 && (
          <div className="newsGrid">
            {visible.map((alert) => (
              <article key={alert.slug} className="newsCard">
                <Link href={`/alertas/${alert.slug}`} className="newsCardImage">
                  <img src={alert.image} alt="" loading="lazy" />
                </Link>
                <div className="newsCardBody">
                  <ArticleMeta alert={alert} />
                  <h3><Link href={`/alertas/${alert.slug}`}>{alert.title}</Link></h3>
                  <p>{alert.deck || alert.summary}</p>
                  <div className="newsTags">
                    {alert.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="newsTag">{tag}</span>
                    ))}
                  </div>
                  <div className="newsCardFooter">
                    <Link href={`/alertas/${alert.slug}`} className="newsReadMore">
                      Leer más →
                    </Link>
                    <ShareBar alert={alert} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ── Load more ── */}
        {hasMore && (
          <div className="alertsLoadMore">
            <button
              className="alertsLoadMoreBtn"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            >
              ↓ Cargar más publicaciones
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
