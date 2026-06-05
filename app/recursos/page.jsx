import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ResourceGrid from '../../components/ResourceGrid';
import VideoLibrary from '../../components/VideoLibrary';
import { contactEmail, learningTracks } from '../../data/content';

export const metadata = {
  title: 'Aprende | CSIRT UTPL',
  description: 'Biblioteca de guias, manuales, tips, mailing, eventos y proyectos de seguridad de la informacion.'
};

export default function ResourcesPage() {
  return (
    <>
      <Header active="Aprende" />
      <main>
        <section className="richPageHero richHero--recursos">
          <div className="richPageHeroBg" />
          <div className="richHeroAccentLine" />
          <div className="container richHeroGrid">
            <div className="richHeroCopy">
              <span className="eyebrow">Biblioteca de aprendizaje</span>
              <h1>Guías y recursos para una comunidad digital segura</h1>
              <p>Contenido práctico para reconocer amenazas, proteger credenciales, cuidar dispositivos y reportar incidentes a tiempo.</p>
              <div className="heroActions">
                <a className="btnPrimary" href="#manuales">Explorar recursos</a>
                <a className="btnGhostLight" href="#tips">Guías rápidas</a>
              </div>
            </div>

            <div className="richHeroVisual" aria-hidden="true">
              {/* Main icon: graduation cap / book */}
              <div className="richHeroIcon">
                <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Mortarboard top */}
                  <polygon points="50,18 90,36 50,54 10,36"
                    stroke="rgba(255,255,255,0.78)" strokeWidth="2.5" fill="rgba(255,255,255,0.08)" strokeLinejoin="round"/>
                  {/* Left side of cap */}
                  <path d="M22 42 L22 64 C22 64 36 74 50 74"
                    stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  {/* Right side of cap */}
                  <path d="M78 42 L78 64 C78 64 64 74 50 74"
                    stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  {/* Tassel */}
                  <line x1="90" y1="36" x2="90" y2="56" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="90" cy="59" r="4" fill="rgba(160,120,255,0.8)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                  {/* Light bulb (learning idea) */}
                  <circle cx="28" cy="28" r="11" fill="rgba(160,120,255,0.2)" stroke="rgba(160,120,255,0.7)" strokeWidth="2"/>
                  <path d="M24 28 a4 4 0 0 1 8 0 c0 3-2 4-2 6 h-4 c0-2-2-3-2-6z"
                    stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
                  <line x1="26" y1="36" x2="30" y2="36" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Badge 1 — manuales */}
              <div className="richHeroBadge richHeroBadge--top">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Manuales</strong>
                  <span>Guías prácticas digitales</span>
                </div>
              </div>

              {/* Badge 2 — tips */}
              <div className="richHeroBadge richHeroBadge--mid">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
                    <circle cx="12" cy="12" r="4"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Tips</strong>
                  <span>Buenas prácticas seguras</span>
                </div>
              </div>

              {/* Badge 3 — aprendizaje */}
              <div className="richHeroBadge richHeroBadge--bot">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Aprendizaje</strong>
                  <span>Rutas de capacitación</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section resourceSection" id="manuales">
          <div className="container">
            <div className="sectionHead">
              <div>
                <span className="eyebrow dark">Recursos principales</span>
                <h2>Documentación, manuales, mailing y proyectos</h2>
              </div>
              <a className="btnOutline" href={`mailto:${contactEmail}?subject=Solicitud%20de%20recurso%20CSIRT`}>Solicitar recurso</a>
            </div>
            <ResourceGrid />
          </div>
        </section>

        <section className="section whiteSection" id="tips">
          <div className="container guideLayout">
            <article id="phishing" className="guideFeature">
              <span className="eyebrow dark">Guía rápida</span>
              <h2>Cómo reconocer phishing</h2>
              <p>Desconfía de mensajes que generan urgencia, solicitan claves, piden pagos, contienen enlaces externos o imitan comunicaciones institucionales. Si tienes dudas, no respondas ni descargues adjuntos.</p>
              <ul>
                <li>Verifica remitente, dominio y tono del mensaje.</li>
                <li>Pasa el cursor sobre enlaces antes de abrirlos.</li>
                <li>No compartas contraseñas ni códigos MFA.</li>
                <li>Reporta evidencias al canal oficial del CSIRT.</li>
              </ul>
            </article>
            <div className="guideCards">
              <article id="credenciales" className="detailCard">
                <h3>Contraseñas seguras</h3>
                <p>Usa claves únicas, evita datos personales, combina caracteres y activa autenticación multifactor en servicios críticos.</p>
              </article>
              <article className="detailCard">
                <h3>Dispositivos actualizados</h3>
                <p>Mantén sistema operativo, navegador y aplicaciones con parches recientes para reducir exposición.</p>
              </article>
              <article className="detailCard">
                <h3>Copias de seguridad</h3>
                <p>Respalda información importante y verifica que puedas restaurarla antes de necesitarla.</p>
              </article>
              <article className="detailCard">
                <h3>Privacidad de datos</h3>
                <p>Comparte información institucional solo por canales autorizados y con destinatarios verificados.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section lightSection">
          <div className="container detailCards">
            <article id="eventos" className="detailCard">
              <h2>Eventos internos y externos</h2>
              <p>Espacio para campañas, charlas, talleres, ejercicios de concientización y actividades de seguridad orientadas a la comunidad universitaria.</p>
            </article>
            <article id="proyectos" className="detailCard">
              <h2>Proyectos de seguridad</h2>
              <p>Iniciativas de investigación aplicada, mejora de procesos, automatización y fortalecimiento de servicios digitales de la UTPL.</p>
            </article>
          </div>
        </section>
        <VideoLibrary />
      </main>
      <Footer />
    </>
  );
}
