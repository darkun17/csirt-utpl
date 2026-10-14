import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ReportIncidentCTA from '../../components/ReportIncidentCTA';
import EditButton from '../../components/EditButton';
import Link from 'next/link';
import { contactEmail } from '../../data/content';
import { getRfcSections, getPageBlock, getPageItems } from '../../lib/drupal';
import { isEditor } from '../../lib/auth';

export const metadata = {
  title: 'RFC 2350 | CSIRT UTPL',
  description: 'Documento oficial RFC 2350 del CSIRT de la Universidad Técnica Particular de Loja.',
};

const incidentReportInfo = [
  'Fecha y hora en que detectaste el incidente',
  'Descripción del evento o comportamiento sospechoso',
  'Sistemas, equipos, cuentas o servicios afectados',
  'Evidencias disponibles: capturas, correos, logs, archivos',
  'Acciones ya tomadas (si desconectaste el equipo, cambiaste contraseña, etc.)',
  'Datos de contacto del reportante (nombre, cargo o rol, correo)',
  'Si ya notificaste a otras áreas o personas',
];

export const revalidate = 60;

export default async function RFC2350Page() {
  const [rfcSections, editor, heroBlock, resumenItems, procedimientoItems, avisoBlock, ctaBlock, ctaBotones] = await Promise.all([
    getRfcSections(),
    isEditor(),
    getPageBlock('rfc2350', 'hero'),
    getPageItems('rfc2350', 'resumen'),
    getPageItems('rfc2350', 'procedimiento'),
    getPageBlock('rfc2350', 'aviso-legal'),
    getPageBlock('rfc2350', 'cta'),
    getPageItems('rfc2350', 'cta-botones'),
  ]);
  return (
    <>
      <Header active="RFC 2350" />
      <main id="main-content">
        <section className="richPageHero richHero--rfc">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Hero RFC 2350" />}
          <div className="richPageHeroBg" />
          <div className="richHeroAccentLine" />
          <div className="container richHeroGrid">
            <div className="richHeroCopy">
              <span className="eyebrow">{heroBlock?.kicker || 'Norma RFC 2350'}</span>
              <h1>{heroBlock?.titulo || 'Identidad, alcance y servicios del CSIRT UTPL'}</h1>
              {heroBlock?.cuerpo
                ? <div dangerouslySetInnerHTML={{ __html: heroBlock.cuerpo }} />
                : <p>Documento de referencia para comunicar la comunidad atendida, políticas, servicios y procedimientos del equipo.</p>
              }
              <div className="heroActions">
                <Link className="btnPrimary" href="/reportar-incidente">Reportar incidente</Link>
                <Link className="btnGhostLight" href="/servicios">Ver servicios</Link>
              </div>
            </div>

            <div className="richHeroVisual" aria-hidden="true">
              {/* Main icon: document / certificate */}
              <div className="richHeroIcon">
                <svg width="88" height="88" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Document body */}
                  <rect x="22" y="12" width="56" height="72" rx="6"
                    stroke="rgba(255,255,255,0.72)" strokeWidth="2.5" fill="rgba(255,255,255,0.07)"/>
                  {/* Folded corner */}
                  <path d="M56 12 L78 34 L56 34 Z"
                    stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.1)"/>
                  {/* Lines of text */}
                  <line x1="32" y1="44" x2="68" y2="44" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="32" y1="54" x2="68" y2="54" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="32" y1="64" x2="55" y2="64" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                  {/* Seal / badge */}
                  <circle cx="72" cy="74" r="12" fill="rgba(100,180,255,0.25)" stroke="rgba(100,180,255,0.7)" strokeWidth="2"/>
                  <polyline points="66,74 70,78 78,68" stroke="rgba(100,220,255,0.95)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Badge 1 — estándar */}
              <div className="richHeroBadge richHeroBadge--top">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Estándar RFC</strong>
                  <span>Marco oficial internacional</span>
                </div>
              </div>

              {/* Badge 2 — alcance */}
              <div className="richHeroBadge richHeroBadge--mid">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Alcance UTPL</strong>
                  <span>Comunidad universitaria</span>
                </div>
              </div>

              {/* Badge 3 — transparencia */}
              <div className="richHeroBadge richHeroBadge--bot">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Transparencia</strong>
                  <span>Documento público</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section whiteSection">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Secciones RFC 2350 — tarjetas" />}
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Resumen (misión/comunidad/horario)" pos="br" />}
          <div className="container rfcIntro">
            <div>
              <span className="eyebrow dark">Contacto</span>
              <h2>Canal oficial: {contactEmail}</h2>
            </div>
            <p>Esta página convierte la norma histórica del CSIRT en una consulta rápida para usuarios internos, pares de respuesta a incidentes y actores institucionales.</p>
          </div>
          <div className="container rfcSummary">
            {(resumenItems.length ? resumenItems : [
              { kicker: 'Misión',    description: 'Punto único de contacto para atención, prevención y respuesta a incidentes de seguridad de la UTPL.' },
              { kicker: 'Comunidad', description: 'Funcionarios, estudiantes, servicios digitales, sistemas y redes institucionales.' },
              { kicker: 'Horario',   description: 'Lunes a viernes, 8:00-13:00 y 15:30-18:30.' },
            ]).map((item) => (
              <article key={item.kicker || item.title}>
                <strong>{item.kicker || item.title}</strong>
                <span>{item.description || item.text}</span>
              </article>
            ))}
          </div>
          <div className="container rfcGrid">
            {rfcSections.map(([title, text]) => (
              <article className="rfcCard" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Notificación de incidentes ── */}
        <section className="section">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Procedimiento — pasos" />}
          <div className="container">
            <span className="eyebrow dark">Procedimiento</span>
            <h2 style={{ color: 'var(--color-primary)', marginBottom: 8 }}>Notificación de incidentes</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '11.2pt', maxWidth: 680, lineHeight: 1.7, marginBottom: 20 }}>
              Para facilitar la atención oportuna y la priorización correcta de tu reporte,
              incluye la siguiente información al contactar al CSIRT UTPL:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 10 }}>
              {(procedimientoItems.length
                ? procedimientoItems.map(i => i.title || i.description)
                : incidentReportInfo
              ).map((item, idx) => (
                <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '11.2pt', color: 'var(--color-text-muted)' }}>
                  <span style={{
                    display: 'grid', placeItems: 'center',
                    width: 26, height: 26, borderRadius: '50%',
                    background: 'var(--color-primary)', color: 'white',
                    fontWeight: 700, fontSize: 11, flexShrink: 0, marginTop: 2,
                  }}>{idx + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 24 }}>
              <Link href="/reportar-incidente" className="btnPrimary">Reportar incidente</Link>
            </div>
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <section className="section whiteSection">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Aviso legal" />}
          <div className="container legalNotice">

            {/* Left: icon */}
            <div className="legalNoticeIcon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M12 3v18M3 6l4 8H3M21 6l-4 8h4M5 21h14"/>
              </svg>
            </div>

            {/* Accent rule */}
            <div className="legalNoticeRule" />

            {/* Content */}
            <div className="legalNoticeBody">
              <span className="legalNoticeEyebrow">Información institucional</span>
              <div className="legalNoticeAccent" />
              <h2>{avisoBlock?.titulo || 'Aviso legal'}</h2>
              {avisoBlock?.cuerpo
                ? <div dangerouslySetInnerHTML={{ __html: avisoBlock.cuerpo }} />
                : <p>
                    La información contenida en este documento es de carácter institucional y puede
                    actualizarse sin previo aviso. El CSIRT UTPL no asume responsabilidad por daños
                    derivados del uso inadecuado de la información publicada. La cooperación con este
                    equipo es voluntaria; sin embargo, se recomienda encarecidamente a todos los
                    miembros de la comunidad universitaria reportar incidentes oportunamente para
                    minimizar el impacto de eventos de seguridad. Este documento sigue los lineamientos
                    de la norma RFC 2350 y puede ser consultado de forma pública como parte de la
                    política de transparencia institucional de la UTPL.
                  </p>
              }

              {/* Footer note */}
              <div className="legalNoticeFooter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
                <strong>Transparencia</strong>
                <span className="legalNoticeFooterSep" />
                <span>Comprometidos con la seguridad y la confianza digital</span>
              </div>
            </div>

          </div>
        </section>

        <ReportIncidentCTA
          editor={editor}
          editHref="/admin/content/block?type=bloque_pagina"
          title={ctaBlock?.titulo || undefined}
          descriptionHtml={ctaBlock?.cuerpo || undefined}
          botones={ctaBotones.map(i => ({ title: i.title, href: i.href }))}
          note={ctaBlock?.kicker || undefined}
        />

      </main>
      <Footer />
    </>
  );
}
