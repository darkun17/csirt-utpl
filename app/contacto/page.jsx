import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ReportIncidentCTA from '../../components/ReportIncidentCTA';
import EditButton from '../../components/EditButton';
import Link from 'next/link';
import { csirtConfig } from '../../data/csirtConfig';
import { isEditor } from '../../lib/auth';
import { getPageBlock, getPageItems } from '../../lib/drupal';

export const revalidate = 60;

export const metadata = {
  title: 'Contacto | CSIRT UTPL',
  description: 'Canales oficiales para comunicarse con el CSIRT UTPL.',
};

/* ── Inline SVG icons (fijos por posición, igual que el resto del sitio) ── */
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const FormIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const channelIcons = [MailIcon, FormIcon, GlobeIcon];

const channelsFallback = [
  { title: 'Correo CSIRT', description: 'Canal oficial para reportar incidentes, consultar sobre seguridad o solicitar información institucional.', href: `mailto:${csirtConfig.email}`, btnLabel: 'Escribir correo', showEmail: true },
  { title: 'Formulario de reporte', description: 'Usa el formulario estructurado para describir incidentes con la información requerida por el equipo.', href: '/reportar-incidente', btnLabel: 'Reportar incidente' },
  { title: 'Sitio web CSIRT', description: 'Consulta publicaciones, alertas, manuales y recursos de seguridad disponibles para la comunidad.', href: '/alertas', btnLabel: 'Ver publicaciones' },
];

export default async function ContactoPage() {
  const [editor, heroBlock, canalesIntroBlock, ctaBlock, canalItems, ctaBotones] = await Promise.all([
    isEditor(),
    getPageBlock('contacto', 'hero'),
    getPageBlock('contacto', 'canales'),
    getPageBlock('contacto', 'cta'),
    getPageItems('contacto', 'canales'),
    getPageItems('contacto', 'cta-botones'),
  ]);

  const channels = canalItems.length
    ? canalItems.map((i, idx) => ({
        title: i.title,
        description: i.description,
        href: i.href || channelsFallback[idx]?.href || '/',
        btnLabel: channelsFallback[idx]?.btnLabel || 'Ver más',
        showEmail: idx === 0,
      }))
    : channelsFallback;

  return (
    <>
      <Header active="Contacto" />
      <main id="main-content">

        {/* ── Hero ── */}
        <section className="richPageHero richHero--contacto">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Hero contacto" />}
          <div className="richPageHeroBg" />
          <div className="richHeroAccentLine" />
          <div className="container richHeroGrid">
            <div className="richHeroCopy">
              <span className="eyebrow">{heroBlock?.kicker || 'CSIRT UTPL'}</span>
              <h1>{heroBlock?.titulo || 'Contacto'}</h1>
              {heroBlock?.cuerpo
                ? <div dangerouslySetInnerHTML={{ __html: heroBlock.cuerpo }} />
                : <p>
                    Canales oficiales para comunicarse con el equipo de Respuesta a Incidentes de
                    Seguridad de la Universidad Técnica Particular de Loja.
                  </p>
              }
              <div className="heroActions">
                <a className="btnPrimary" href={`mailto:${csirtConfig.email}`}>Escribir correo</a>
                <Link className="btnGhostLight" href="/reportar-incidente">Reportar incidente</Link>
              </div>
            </div>

            <div className="richHeroVisual" aria-hidden="true">
              {/* Main icon: envelope with shield */}
              <div className="richHeroIcon">
                <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Envelope body */}
                  <rect x="12" y="28" width="76" height="52" rx="7"
                    stroke="rgba(255,255,255,0.72)" strokeWidth="2.5" fill="rgba(255,255,255,0.07)"/>
                  {/* Envelope flap */}
                  <path d="M12 28 L50 58 L88 28"
                    stroke="rgba(255,255,255,0.65)" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
                  {/* Bottom fold lines */}
                  <line x1="12" y1="80" x2="34" y2="58" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="88" y1="80" x2="66" y2="58" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
                  {/* Shield badge on top-right */}
                  <path d="M74 12 L86 17 L86 27 C86 34 80 39 74 41 C68 39 62 34 62 27 L62 17 Z"
                    stroke="rgba(60,200,255,0.8)" strokeWidth="2" fill="rgba(60,200,255,0.12)" strokeLinejoin="round"/>
                  <polyline points="69,27 72,30 79,22" stroke="rgba(60,220,255,0.9)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Badge 1 — correo oficial */}
              <div className="richHeroBadge richHeroBadge--top">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Correo oficial</strong>
                  <span>{csirtConfig.email}</span>
                </div>
              </div>

              {/* Badge 2 — tiempo de respuesta */}
              <div className="richHeroBadge richHeroBadge--mid">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Respuesta</strong>
                  <span>2 días hábiles</span>
                </div>
              </div>

              {/* Badge 3 — seguro */}
              <div className="richHeroBadge richHeroBadge--bot">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Comunicación</strong>
                  <span>Canal seguro PGP</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Canales oficiales ── */}
        <section className="section whiteSection">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Canales oficiales" />}
          <div className="container">
            <span className="eyebrow dark">{canalesIntroBlock?.kicker || 'Comunicación oficial'}</span>
            <h2 style={{ marginBottom: 28 }}>{canalesIntroBlock?.titulo || 'Canales oficiales'}</h2>
            <div className="contactChannelsGrid">
              {channels.map((channel, idx) => {
                const Icon = channelIcons[idx % channelIcons.length];
                const isExternalEmail = channel.href?.startsWith('mailto:');
                const ButtonTag = isExternalEmail ? 'a' : Link;
                const buttonProps = isExternalEmail ? { href: channel.href } : { href: channel.href };
                return (
                  <article className="contactCard" key={channel.title}>
                    <div className="contactCardIcon"><Icon /></div>
                    <h3>{channel.title}</h3>
                    <p>{channel.description}</p>
                    <ButtonTag {...buttonProps} className="btnPrimary" style={{ display: 'inline-block', fontSize: '11pt' }}>
                      {channel.btnLabel}
                    </ButtonTag>
                    {channel.showEmail && (
                      <p style={{ marginTop: 12, fontSize: '10.5pt', color: 'var(--color-text-muted)' }}>
                        {csirtConfig.email}
                      </p>
                    )}
                  </article>
                );
              })}
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
