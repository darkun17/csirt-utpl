import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ResourceGrid from '../../components/ResourceGrid';
import VideoLibrary from '../../components/VideoLibrary';
import EditButton from '../../components/EditButton';
import { contactEmail } from '../../data/content';
import { isEditor } from '../../lib/auth';
import { getPageBlock, getPageItems } from '../../lib/drupal';

export const revalidate = 60;

export const metadata = {
  title: 'Aprende | CSIRT UTPL',
  description: 'Biblioteca de guías, manuales, tips, mailing, eventos y proyectos de seguridad de la información.'
};

const staticTipCards = [
  { title: 'Contraseñas seguras', description: 'Usa claves únicas, evita datos personales, combina caracteres y activa autenticación multifactor en servicios críticos.' },
  { title: 'Dispositivos actualizados', description: 'Mantén sistema operativo, navegador y aplicaciones con parches recientes para reducir exposición.' },
  { title: 'Copias de seguridad', description: 'Respalda información importante y verifica que puedas restaurarla antes de necesitarla.' },
  { title: 'Privacidad de datos', description: 'Comparte información institucional solo por canales autorizados y con destinatarios verificados.' },
];

const staticEventos = [
  { title: 'Eventos internos y externos', description: 'Espacio para campañas, charlas, talleres, ejercicios de concientización y actividades de seguridad orientadas a la comunidad universitaria.' },
  { title: 'Proyectos de seguridad', description: 'Iniciativas de investigación aplicada, mejora de procesos, automatización y fortalecimiento de servicios digitales de la UTPL.' },
];

export default async function ResourcesPage() {
  const [editor, heroBlock, phishingBlock, tipCards, eventoItems, concientizacionItems, principalesBlock, eventosIntroBlock, concientizacionBlock] = await Promise.all([
    isEditor(),
    getPageBlock('recursos', 'hero'),
    getPageBlock('recursos', 'guia-phishing'),
    getPageItems('recursos', 'tips'),
    getPageItems('recursos', 'eventos'),
    getPageItems('recursos', 'concientizacion'),
    getPageBlock('recursos', 'principales'),
    getPageBlock('recursos', 'eventos'),
    getPageBlock('recursos', 'concientizacion'),
  ]);

  return (
    <>
      <Header active="Aprende" />
      <main>
        {/* ── Hero ── */}
        <section className="richPageHero richHero--recursos">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Hero aprende" />}
          <div className="richPageHeroBg" />
          <div className="richHeroAccentLine" />
          <div className="container richHeroGrid">
            <div className="richHeroCopy">
              <span className="eyebrow">{heroBlock?.kicker || 'Biblioteca de aprendizaje'}</span>
              <h1>{heroBlock?.titulo || 'Guías y recursos para una comunidad digital segura'}</h1>
              {heroBlock?.cuerpo
                ? <div dangerouslySetInnerHTML={{ __html: heroBlock.cuerpo }} />
                : <p>Contenido práctico para reconocer amenazas, proteger credenciales, cuidar dispositivos y reportar incidentes a tiempo.</p>
              }
              <div className="heroActions">
                <a className="btnPrimary" href="#manuales">Explorar recursos</a>
                <a className="btnGhostLight" href="#tips">Guías rápidas</a>
              </div>
            </div>

            <div className="richHeroVisual" aria-hidden="true">
              <div className="richHeroIcon">
                <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="50,18 90,36 50,54 10,36"
                    stroke="rgba(255,255,255,0.78)" strokeWidth="2.5" fill="rgba(255,255,255,0.08)" strokeLinejoin="round"/>
                  <path d="M22 42 L22 64 C22 64 36 74 50 74"
                    stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <path d="M78 42 L78 64 C78 64 64 74 50 74"
                    stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <line x1="90" y1="36" x2="90" y2="56" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="90" cy="59" r="4" fill="rgba(160,120,255,0.8)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                  <circle cx="28" cy="28" r="11" fill="rgba(160,120,255,0.2)" stroke="rgba(160,120,255,0.7)" strokeWidth="2"/>
                  <path d="M24 28 a4 4 0 0 1 8 0 c0 3-2 4-2 6 h-4 c0-2-2-3-2-6z"
                    stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
                  <line x1="26" y1="36" x2="30" y2="36" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="richHeroBadge richHeroBadge--top">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText"><strong>Manuales</strong><span>Guías prácticas digitales</span></div>
              </div>
              <div className="richHeroBadge richHeroBadge--mid">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
                    <circle cx="12" cy="12" r="4"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText"><strong>Tips</strong><span>Buenas prácticas seguras</span></div>
              </div>
              <div className="richHeroBadge richHeroBadge--bot">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText"><strong>Aprendizaje</strong><span>Rutas de capacitación</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Recursos principales ── */}
        <section className="section whiteSection" id="manuales">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Gestionar recursos" />}
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Recursos principales — texto" pos="br" />}
          <div className="container">
            <div className="sectionHead">
              <div>
                <span className="eyebrow dark">{principalesBlock?.kicker || 'Recursos principales'}</span>
                <h2>{principalesBlock?.titulo || 'Documentación, manuales, mailing y proyectos'}</h2>
              </div>
              <a className="btnOutline" href={`mailto:${contactEmail}?subject=Solicitud%20de%20recurso%20CSIRT`}>Solicitar recurso</a>
            </div>
            <ResourceGrid />
          </div>
        </section>

        {/* ── Tips ── */}
        <section className="section lightSection" id="tips">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Guía phishing — artículo" />}
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Tips — tarjetas" pos="tl" />}
          <div className="container guideLayout">
            <article id="phishing" className="guideFeature">
              <span className="eyebrow dark">{phishingBlock?.kicker || 'Guía rápida'}</span>
              <h2>{phishingBlock?.titulo || 'Cómo reconocer phishing'}</h2>
              {phishingBlock?.cuerpo
                ? <div dangerouslySetInnerHTML={{ __html: phishingBlock.cuerpo }} />
                : <>
                    <p>Desconfía de mensajes que generan urgencia, solicitan claves, piden pagos, contienen enlaces externos o imitan comunicaciones institucionales. Si tienes dudas, no respondas ni descargues adjuntos.</p>
                    <ul>
                      <li>Verifica remitente, dominio y tono del mensaje.</li>
                      <li>Pasa el cursor sobre enlaces antes de abrirlos.</li>
                      <li>No compartas contraseñas ni códigos MFA.</li>
                      <li>Reporta evidencias al canal oficial del CSIRT.</li>
                    </ul>
                  </>
              }
            </article>
            <div className="guideCards">
              {(tipCards.length ? tipCards : staticTipCards).map((card) => (
                <article key={card.title} className="detailCard">
                  <h3>{card.title}</h3>
                  <p>{card.description || card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Temas de concientización ── */}
        {(concientizacionItems.length > 0 || editor) && (
          <section className="section whiteSection" id="concientizacion">
            {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Concientización — tarjetas" />}
            <div className="container">
              <div className="sectionHead">
                <div>
                  <span className="eyebrow dark">{concientizacionBlock?.kicker || 'Temas de concientización'}</span>
                  <h2>{concientizacionBlock?.titulo || 'Aprende a protegerte en el entorno digital'}</h2>
                </div>
              </div>
              {concientizacionItems.length > 0 ? (
                <div className="concientizacionGrid">
                  {concientizacionItems.map((item) => {
                    const hasLink = item.href && item.href !== '#';
                    const isExternal = hasLink && item.href.startsWith('http');
                    return (
                      <article className="concientizacionCard" key={item.title}>
                        <div className="concientizacionCardHeader">
                          {item.image && (
                            <div className="concientizacionIcon">
                              <img src={item.image} alt="" aria-hidden="true" />
                            </div>
                          )}
                          {item.kicker && (
                            <span className="concientizacionCategory">{item.kicker}</span>
                          )}
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.description || item.text}</p>
                        {hasLink ? (
                          <a
                            href={item.href}
                            className="concientizacionLink"
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noreferrer' : undefined}
                          >
                            {item.channel || 'Ver más'} →
                          </a>
                        ) : (
                          <span className="concientizacionSoon">Próximamente</span>
                        )}
                      </article>
                    );
                  })}
                </div>
              ) : (
                <p className="emptyState">Crea ítems en Drupal con pagina=<strong>recursos</strong> y seccion=<strong>concientizacion</strong>.</p>
              )}
            </div>
          </section>
        )}

        {/* ── Eventos / Proyectos ── */}
        <section className="section lightSection">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Eventos y proyectos — tarjetas" />}
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Eventos y proyectos — texto" pos="br" />}
          <div className="container">
            <div className="sectionHead">
              <div>
                <span className="eyebrow dark">{eventosIntroBlock?.kicker || 'Iniciativas'}</span>
                <h2>{eventosIntroBlock?.titulo || 'Eventos y proyectos de seguridad'}</h2>
              </div>
            </div>
            <div className="eventoCards">
              {(eventoItems.length ? eventoItems : staticEventos).map((item, i) => {
                const hasLink = item.href && item.href !== '#';
                const isExternal = hasLink && item.href?.startsWith('http');
                return (
                  <article key={item.title} className="eventoCard">
                    <div className="eventoCardIconWrap">
                      <div className="eventoCardIconCircle">
                        {item.image
                          ? <img src={item.image} alt="" aria-hidden="true" />
                          : i === 0
                            ? (
                              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                                <rect x="8" y="14" width="32" height="26" rx="3" stroke="currentColor" strokeWidth="2.2" fill="none"/>
                                <path d="M16 14V10M32 14V10M8 22h32" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                                <circle cx="16" cy="30" r="2" fill="currentColor"/>
                                <circle cx="24" cy="30" r="2" fill="currentColor"/>
                                <circle cx="32" cy="30" r="2" fill="currentColor"/>
                              </svg>
                            ) : (
                              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                                <path d="M24 8L40 14v10c0 10-7 18-16 20C8 42 8 24 8 24V14l16-6z" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
                                <path d="M17 30l4 4 10-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )
                        }
                      </div>
                    </div>
                    <div className="eventoCardBody">
                      <h3>{item.title}</h3>
                      <p>{item.description || item.text}</p>
                      {hasLink && (
                        <a
                          href={item.href}
                          className="eventoCardLink"
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noreferrer' : undefined}
                        >
                          {item.channel || 'Ver más'} →
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <VideoLibrary editor={editor} />
      </main>
      <Footer />
    </>
  );
}
