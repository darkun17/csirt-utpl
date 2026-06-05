import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ReportIncidentCTA from '../../components/ReportIncidentCTA';
import Link from 'next/link';

export const metadata = {
  title: 'Vulnerabilidades | CSIRT UTPL',
  description: 'Canal oficial para reportar vulnerabilidades en sistemas o servicios vinculados a la UTPL de forma responsable.',
};

/* ── Data ── */
const allowedActivities = [
  'Probar únicamente sistemas sobre los que tienes autorización explícita',
  'Documentar evidencias sin modificar ni eliminar datos del sistema',
  'Reportar al CSIRT antes de hacer pública la vulnerabilidad',
  'Seguir el proceso de divulgación coordinada (90 días)',
  'Actuar de buena fe con el objetivo de mejorar la seguridad institucional',
  'Colaborar con el equipo durante la investigación y remediación',
];

const forbiddenActivities = [
  'Acceder a sistemas sin autorización o más allá del alcance permitido',
  'Exfiltrar, modificar, borrar o dañar datos institucionales',
  'Instalar malware, backdoors o herramientas persistentes',
  'Realizar ataques de denegación de servicio (DoS/DDoS)',
  'Divulgar públicamente la vulnerabilidad sin acuerdo previo',
  'Usar la información obtenida para fines no relacionados con la investigación',
];

const requiredInfo = [
  'Descripción clara de la vulnerabilidad encontrada',
  'Sistema, URL o servicio afectado',
  'Pasos para reproducir el problema',
  'Evidencias: capturas de pantalla, logs, payloads utilizados',
  'Impacto potencial estimado (acceso a datos, escalada de privilegios, etc.)',
  'Tus datos de contacto (nombre y correo)',
  'Si ya notificaste a alguna otra parte',
];

const timelineSteps = [
  {
    title: 'Recepción',
    text: 'El CSIRT UTPL recibe tu reporte y envía confirmación de recepción en un plazo de 2 días hábiles.',
  },
  {
    title: 'Revisión inicial',
    text: 'El equipo analiza el reporte para verificar su validez y reproducibilidad.',
  },
  {
    title: 'Clasificación',
    text: 'Se asigna un nivel de severidad y se determina el impacto potencial sobre los sistemas afectados.',
  },
  {
    title: 'Coordinación interna',
    text: 'El CSIRT coordina con las áreas técnicas responsables del sistema para iniciar la remediación.',
  },
  {
    title: 'Remediación',
    text: 'El equipo técnico aplica la corrección. El proceso puede tomar entre días y semanas según la complejidad.',
  },
  {
    title: 'Verificación',
    text: 'Se confirma que la vulnerabilidad fue corregida. El reportante puede ser consultado en esta etapa.',
  },
  {
    title: 'Cierre y reconocimiento',
    text: 'Se cierra el caso formalmente. Si procede, se comunica el reconocimiento al investigador.',
  },
];

export default function VulnerabilidadesPage() {
  return (
    <>
      <Header active="Vulnerabilidades" />
      <main id="main-content">

        {/* ── Hero ── */}
        <section className="richPageHero richHero--vuln">
          <div className="richPageHeroBg" />
          <div className="richHeroAccentLine" />
          <div className="container richHeroGrid">
            <div className="richHeroCopy">
              <span className="eyebrow">Política de divulgación</span>
              <h1>Divulgación responsable de vulnerabilidades</h1>
              <p>
                Si encontraste una vulnerabilidad en un sistema o servicio vinculado a la UTPL,
                te invitamos a reportarla de manera responsable. Tu contribución ayuda a proteger
                a toda la comunidad universitaria.
              </p>
              <div className="heroActions">
                <Link className="btnPrimary" href="/reportar-incidente">Reportar vulnerabilidad</Link>
                <Link className="btnGhostLight" href="/contacto">Contactar al CSIRT</Link>
              </div>
            </div>

            <div className="richHeroVisual" aria-hidden="true">
              {/* Main icon: shield with bug */}
              <div className="richHeroIcon">
                <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10 L85 24 L85 50 C85 72 65 88 50 92 C35 88 15 72 15 50 L15 24 Z"
                    stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" fill="rgba(255,255,255,0.07)" strokeLinejoin="round"/>
                  {/* Lock body */}
                  <rect x="34" y="46" width="32" height="26" rx="5"
                    fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.65)" strokeWidth="2"/>
                  {/* Lock shackle */}
                  <path d="M40 46 V38 a10 10 0 0 1 20 0 V46"
                    stroke="rgba(255,255,255,0.65)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  {/* Keyhole */}
                  <circle cx="50" cy="57" r="4" fill="rgba(255,255,255,0.75)"/>
                  <rect x="48" y="57" width="4" height="7" rx="2" fill="rgba(255,255,255,0.75)"/>
                  {/* Bug dot */}
                  <circle cx="73" cy="30" r="9" fill="rgba(255,90,90,0.85)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                  <line x1="70" y1="26" x2="73" y2="30" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="76" y1="26" x2="73" y2="30" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="65" y1="30" x2="69" y2="30" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="77" y1="30" x2="81" y2="30" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="70" y1="34" x2="73" y2="30" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="76" y1="34" x2="73" y2="30" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Badge 1 — top left */}
              <div className="richHeroBadge richHeroBadge--top">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9 12 11 14 15 10"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Reporte seguro</strong>
                  <span>Canal confidencial y protegido</span>
                </div>
              </div>

              {/* Badge 2 — mid right */}
              <div className="richHeroBadge richHeroBadge--mid">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Análisis</strong>
                  <span>Evaluamos cada reporte</span>
                </div>
              </div>

              {/* Badge 3 — bottom right */}
              <div className="richHeroBadge richHeroBadge--bot">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Respuesta</strong>
                  <span>Fortalecemos la seguridad</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Objetivo ── */}
        <section className="section whiteSection">
          <div className="container">
            <div className="vulnInfoLayout">
              <div className="vulnCardIcon">
                <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              </div>
              <div className="vulnCardContent">
                <div className="vulnCardEyebrow">
                  <span className="vulnCardEyebrowLine" />
                  Marco institucional
                </div>
                <h2>Objetivo de la política</h2>
                <p>
                  El CSIRT UTPL valora la colaboración de investigadores de seguridad, estudiantes y
                  usuarios que identifican vulnerabilidades en sistemas o servicios institucionales.
                  Esta política establece un canal seguro y transparente para reportar dichos hallazgos,
                  con el compromiso de tratar cada reporte de manera ética, confidencial y oportuna.
                  La divulgación responsable protege a los usuarios, fortalece la seguridad institucional
                  y reconoce el trabajo de quienes actúan de buena fe.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Alcance ── */}
        <section className="section">
          <div className="container">
            <div className="vulnInfoLayout">
              <div className="vulnCardIcon">
                <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div className="vulnCardContent">
                <h2>Alcance</h2>
                <p>
                  Esta política aplica a sistemas, aplicaciones web, servicios digitales y
                  plataformas tecnológicas operadas o gestionadas por la Universidad Técnica
                  Particular de Loja. Incluye portales institucionales, sistemas académicos y
                  servicios de red universitaria.
                </p>
                <div className="vulnWarningBox">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <div>
                    <strong>Autorización previa</strong>
                    <p>
                      Las pruebas de seguridad solo deben realizarse sobre sistemas para los cuales
                      cuentas con autorización explícita. Cualquier actividad fuera de este alcance
                      podría implicar consecuencias legales.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Permitido / No permitido ── */}
        <section className="section whiteSection">
          <div className="container">
            <h2 style={{ color: 'var(--color-primary)', marginBottom: 24 }}>Actividades y límites</h2>
            <div className="vulnPermissionsGrid">
              <div className="vulnAllowed">
                <h3>Actividades permitidas</h3>
                <ul className="vulnList">
                  {allowedActivities.map((item) => (
                    <li key={item}>
                      <span className="vulnCheckIcon" aria-hidden="true">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="vulnForbidden">
                <h3>Actividades no permitidas</h3>
                <ul className="vulnList">
                  {forbiddenActivities.map((item) => (
                    <li key={item}>
                      <span className="vulnXIcon" aria-hidden="true">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cómo reportar ── */}
        <section className="section">
          <div className="container">
            <h2 style={{ color: 'var(--color-primary)', marginBottom: 8 }}>Cómo reportar una vulnerabilidad</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '11.2pt', marginBottom: 20 }}>
              Envía tu reporte a <strong>csirt@utpl.edu.ec</strong> con la siguiente información:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
              {requiredInfo.map((item, idx) => (
                <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '11.2pt', color: 'var(--color-text-muted)' }}>
                  <span style={{
                    display: 'grid', placeItems: 'center',
                    width: 26, height: 26, borderRadius: '50%',
                    background: 'var(--color-primary)', color: 'white',
                    fontWeight: 700, fontSize: 11, flexShrink: 0, marginTop: 1,
                  }}>{idx + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 28 }}>
              <Link href="/reportar-incidente" className="btnPrimary">Usar formulario de reporte</Link>
            </div>
          </div>
        </section>

        {/* ── Confidencialidad ── */}
        <section className="section whiteSection">
          <div className="container">
            <div className="vulnInfoLayout">
              <div className="vulnCardIcon">
                <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <rect x="8" y="11" width="8" height="7" rx="1.5"/>
                  <path d="M10 11V8a2 2 0 1 1 4 0v3"/>
                  <polyline points="9 15 11 17 15 13"/>
                </svg>
              </div>
              <div className="vulnCardContent">
                <div className="vulnCardTitleRow">
                  <h2>Confidencialidad y divulgación</h2>
                  <span className="vulnCardBadge vulnCardBadge--blue">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Divulgación coordinada
                  </span>
                </div>
                <p>
                  El CSIRT UTPL trata todos los reportes con estricta confidencialidad. Tu información
                  personal no será compartida con terceros sin tu consentimiento. El equipo se compromete
                  a no divulgar públicamente la vulnerabilidad hasta que se haya aplicado una corrección
                  adecuada, siguiendo el principio de divulgación coordinada. Se solicita al investigador
                  un período de espera de hasta 90 días antes de cualquier divulgación pública, con
                  posibilidad de extensión acordada en casos justificados.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Reconocimiento ── */}
        <section className="section">
          <div className="container">
            <div className="vulnInfoLayout">
              <div className="vulnCardIcon">
                <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="8" r="6"/>
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
              </div>
              <div className="vulnCardContent">
                <div className="vulnCardTitleRow">
                  <h2>Reconocimiento</h2>
                  <span className="vulnCardBadge vulnCardBadge--yellow">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    Colaboración responsable
                  </span>
                </div>
                <p>
                  El CSIRT UTPL reconoce el trabajo de los investigadores que reportan vulnerabilidades
                  de forma responsable y colaborativa. Dependiendo de la naturaleza del hallazgo, podemos
                  emitir un reconocimiento institucional formal o una mención pública (con tu autorización).
                  Este reconocimiento es un agradecimiento simbólico y no implica compensación económica.
                  Valoramos tu contribución a la seguridad de toda la comunidad universitaria.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Qué sucede después — horizontal timeline ── */}
        <section className="section whiteSection">
          <div className="container">
            <div className="vulnTimelineHeader">
              <h2>Qué sucede después de tu reporte</h2>
              <p>Así gestionamos tu reporte en el CSIRT UTPL.</p>
            </div>

            {/* Numbers track */}
            <div className="vulnTimelineWrap">
              <div className="vulnTimelineNums">
                {timelineSteps.map((_, idx) => (
                  <div key={idx} className="vulnTimelineNumItem">
                    <div className="vulnTimelineNum">{idx + 1}</div>
                  </div>
                ))}
              </div>

              {/* Step columns */}
              <div className="vulnTimelineGrid">
                {[
                  <svg key="env" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
                  <svg key="doc" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg>,
                  <svg key="tag" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
                  <svg key="usr" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                  <svg key="wrn" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
                  <svg key="shld" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
                  <svg key="str" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
                ].map((icon, idx) => (
                  <div key={timelineSteps[idx].title} className="vulnTimelineStep">
                    <div className="vulnTimelineStepIcon">{icon}</div>
                    <h3>{timelineSteps[idx].title}</h3>
                    <div className="vulnTimelineAccent" />
                    <p>{timelineSteps[idx].text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ReportIncidentCTA
          title="¿Encontraste una vulnerabilidad?"
          description="Reporta tu hallazgo de forma responsable. El CSIRT UTPL revisará tu reporte con confidencialidad y te mantendrá informado durante el proceso de remediación."
        />

      </main>
      <Footer />
    </>
  );
}
