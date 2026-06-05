import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ReportIncidentCTA from '../../components/ReportIncidentCTA';
import Link from 'next/link';
import { csirtConfig } from '../../data/csirtConfig';

export const metadata = {
  title: 'Contacto | CSIRT UTPL',
  description: 'Canales oficiales para comunicarse con el CSIRT UTPL.',
};

/* ── Inline SVG icons ── */
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

const KeyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="7.5" cy="15.5" r="5.5"/>
    <path d="m21 2-9.6 9.6"/>
    <path d="m15.5 7.5 3 3L22 7l-3-3"/>
  </svg>
);

export default function ContactoPage() {
  return (
    <>
      <Header active="Contacto" />
      <main id="main-content">

        {/* ── Hero ── */}
        <section className="richPageHero richHero--contacto">
          <div className="richPageHeroBg" />
          <div className="richHeroAccentLine" />
          <div className="container richHeroGrid">
            <div className="richHeroCopy">
              <span className="eyebrow">CSIRT UTPL</span>
              <h1>Contacto</h1>
              <p>
                Canales oficiales para comunicarse con el equipo de Respuesta a Incidentes de
                Seguridad de la Universidad Técnica Particular de Loja.
              </p>
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
          <div className="container">
            <span className="eyebrow dark">Comunicación oficial</span>
            <h2 style={{ marginBottom: 28 }}>Canales oficiales</h2>
            <div className="contactChannelsGrid">

              {/* Correo */}
              <article className="contactCard">
                <div className="contactCardIcon"><MailIcon /></div>
                <h3>Correo CSIRT</h3>
                <p>Canal oficial para reportar incidentes, consultar sobre seguridad o solicitar información institucional.</p>
                <a
                  href={`mailto:${csirtConfig.email}`}
                  className="btnPrimary"
                  style={{ display: 'inline-block', fontSize: '11pt' }}
                >
                  Escribir correo
                </a>
                <p style={{ marginTop: 12, fontSize: '10.5pt', color: 'var(--color-text-muted)' }}>
                  {csirtConfig.email}
                </p>
              </article>

              {/* Formulario */}
              <article className="contactCard">
                <div className="contactCardIcon"><FormIcon /></div>
                <h3>Formulario de reporte</h3>
                <p>Usa el formulario estructurado para describir incidentes con la información requerida por el equipo.</p>
                <Link href="/reportar-incidente" className="btnPrimary" style={{ fontSize: '11pt' }}>
                  Reportar incidente
                </Link>
              </article>

              {/* Sitio web */}
              <article className="contactCard">
                <div className="contactCardIcon"><GlobeIcon /></div>
                <h3>Sitio web CSIRT</h3>
                <p>Consulta publicaciones, alertas, manuales y recursos de seguridad disponibles para la comunidad.</p>
                <Link href="/alertas" className="btnPrimary" style={{ fontSize: '11pt' }}>
                  Ver publicaciones
                </Link>
              </article>

            </div>
          </div>
        </section>

        {/* ── Horario de atención ── */}
        <section className="section">
          <div className="container">

            <div className="contactSectionHead">
              <div className="contactSectionIcon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div className="contactSectionAccent" />
              <div>
                <h2>Horario de atención</h2>
                <p>El CSIRT UTPL atiende reportes e incidentes durante el horario hábil institucional:</p>
              </div>
            </div>

            {/* Schedule card */}
            <div className="scheduleCard">
              <div className="scheduleCardIcon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <strong className="scheduleCardTime">{csirtConfig.officeHours}</strong>
                <p className="scheduleCardTz">Zona horaria {csirtConfig.timezone} (Ecuador continental)</p>
              </div>
            </div>

            {/* Bullet note */}
            <div className="scheduleBullet">
              <span className="scheduleBulletDot" aria-hidden="true" />
              <p>Los reportes recibidos fuera de este horario serán atendidos en el siguiente día hábil.</p>
            </div>

            {/* Urgent warning */}
            <div className="scheduleUrgent">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <p>
                Para incidentes críticos activos, incluye en el asunto del correo la palabra{' '}
                <strong className="scheduleUrgentWord">URGENTE</strong>{' '}
                para ayudar a priorizar la atención.
              </p>
            </div>

          </div>
        </section>

        {/* ── Comunicación segura (PGP) ── */}
        <section className="section whiteSection">
          <div className="container">

            <div className="contactSectionHead">
              <div className="contactSectionIcon contactSectionIcon--dark">
                <KeyIcon />
              </div>
              <div className="contactSectionAccent" />
              <div>
                <h2>Comunicación segura (PGP)</h2>
                <p>
                  Para comunicaciones sensibles que requieran mayor privacidad, el CSIRT UTPL
                  publicará su clave PGP pública. Podrás usarla para cifrar el contenido de tus
                  mensajes antes de enviarlo por correo electrónico, garantizando que solo el
                  equipo pueda leer tu reporte.
                </p>
              </div>
            </div>

            {/* PGP data card */}
            <div className="pgpDataCard">
              <div className="pgpDataRow">
                <div className="pgpDataIcon">
                  <KeyIcon />
                </div>
                <span className="pgpDataLabel">Clave PGP</span>
                <span className="pgpPendingBadge">Pendiente de publicación</span>
                <button className="pgpActionBtn" disabled aria-label="Copiar clave PGP">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  Copiar
                </button>
              </div>
              <div className="pgpDataDivider" />
              <div className="pgpDataRow">
                <div className="pgpDataIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
                  </svg>
                </div>
                <span className="pgpDataLabel">Fingerprint</span>
                <span className="pgpPendingBadge">Pendiente de publicación</span>
                <button className="pgpActionBtn" disabled aria-label="Descargar fingerprint">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Descargar
                </button>
              </div>
            </div>

            {/* Info note */}
            <div className="pgpInfoNote">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <div className="pgpInfoNoteSep" />
              <div>
                <p>Mientras la clave no esté disponible, utiliza el correo institucional para comunicaciones ordinarias.</p>
                <p>Evita incluir contraseñas, tokens o información altamente sensible en correos sin cifrar.</p>
              </div>
            </div>

          </div>
        </section>

        <ReportIncidentCTA />

      </main>
      <Footer />
    </>
  );
}
