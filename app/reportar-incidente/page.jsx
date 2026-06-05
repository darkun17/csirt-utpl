import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ReportForm from '../../components/ReportForm';
import { contactEmail } from '../../data/content';

export const metadata = {
  title: 'Reportar incidente | CSIRT UTPL',
  description: 'Canal oficial para reportar novedades e incidentes de seguridad de la informacion a CSIRT UTPL.'
};

export default function ReportPage() {
  return (
    <>
      <Header active="Reportar" />
      <main>
        <section className="richPageHero richHero--reportar">
          <div className="richPageHeroBg" />
          <div className="richHeroAccentLine" />
          <div className="container richHeroGrid">
            <div className="richHeroCopy">
              <span className="eyebrow">Canal oficial de reporte</span>
              <h1>Reporta novedades de seguridad</h1>
              <p>Completa el formulario o escribe directamente a <strong style={{ color: '#FFE7A3' }}>{contactEmail}</strong>. Incluye toda la evidencia disponible.</p>
              <div className="heroActions">
                <a className="btnPrimary" href="#formulario">Ir al formulario</a>
                <a className="btnGhostLight" href={`mailto:${contactEmail}`}>Escribir al CSIRT</a>
              </div>
            </div>

            <div className="richHeroVisual" aria-hidden="true">
              {/* Main icon: clipboard / report form with alert */}
              <div className="richHeroIcon">
                <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Clipboard body */}
                  <rect x="20" y="22" width="60" height="68" rx="7"
                    stroke="rgba(255,255,255,0.72)" strokeWidth="2.5" fill="rgba(255,255,255,0.07)"/>
                  {/* Clipboard clip */}
                  <rect x="36" y="15" width="28" height="16" rx="5"
                    stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="rgba(255,255,255,0.1)"/>
                  {/* Form lines */}
                  <line x1="30" y1="46" x2="70" y2="46" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="30" y1="56" x2="70" y2="56" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="30" y1="66" x2="55" y2="66" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                  {/* Alert triangle badge */}
                  <path d="M64 68 L78 68 L71 55 Z"
                    fill="rgba(255,160,40,0.85)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinejoin="round"/>
                  <line x1="71" y1="60" x2="71" y2="64" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="71" cy="66.5" r="1.2" fill="white"/>
                </svg>
              </div>

              {/* Badge 1 — canal seguro */}
              <div className="richHeroBadge richHeroBadge--top">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Canal seguro</strong>
                  <span>Reporte confidencial</span>
                </div>
              </div>

              {/* Badge 2 — registro */}
              <div className="richHeroBadge richHeroBadge--mid">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Registro</strong>
                  <span>Documentamos tu reporte</span>
                </div>
              </div>

              {/* Badge 3 — respuesta */}
              <div className="richHeroBadge richHeroBadge--bot">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Atención</strong>
                  <span>Respuesta oportuna</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section lightSection">
          <div className="container reportLayout">
            <div className="reportForm">
              <span className="eyebrow dark">Formulario de reporte</span>
              <h2>Cuéntanos qué ocurrió</h2>
              <p style={{ margin: '4px 0 0', fontSize: 13.5, color: 'var(--muted)' }}>
                El reporte se enviará a <a href={`mailto:${contactEmail}`} style={{ color: 'var(--blue)', fontWeight: 700 }}>{contactEmail}</a> a través de tu cliente de correo.
              </p>
              <ReportForm />
            </div>
            <aside className="reportHelp">
              <h2>Antes de reportar</h2>
              <ul>
                <li>No elimines correos, archivos, registros o capturas relacionadas.</li>
                <li>No reenvíes archivos sospechosos a otras personas.</li>
                <li>Si sospechas de malware grave, desconecta el equipo de la red.</li>
                <li>No compartas contraseñas, códigos MFA ni tokens de acceso.</li>
              </ul>
              <div className="emergencyBox">
                <strong>Información mínima recomendada</strong>
                <p>Quién reporta, qué ocurrió, cuándo fue detectado, qué servicio está afectado y qué evidencia existe.</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
