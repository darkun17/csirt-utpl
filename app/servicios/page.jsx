import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SeverityMatrix from '../../components/SeverityMatrix';
import ReportIncidentCTA from '../../components/ReportIncidentCTA';
import EditButton from '../../components/EditButton';
import { isEditor } from '../../lib/auth';
import { getPageBlock, getPageItems } from '../../lib/drupal';
import Link from 'next/link';

export const metadata = {
  title: 'Servicios | CSIRT UTPL',
  description: 'Servicios de respuesta a incidentes, gestión de vulnerabilidades, alertas, capacitación y concientización del CSIRT UTPL.',
};

/* ── Inline SVG icons ── */
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const AnalyzeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
  </svg>
);

const CoordinateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8v4l3 3"/>
  </svg>
);

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const VulnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const GradCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const TrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    <line x1="12" y1="3" x2="12" y2="7"/>
  </svg>
);

const TrendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);

/* ── Data ── */
const reactiveServices = [
  {
    Icon: ShieldIcon,
    title: 'Recepción de incidentes',
    items: ['Atención de reportes por correo institucional', 'Registro y documentación del evento', 'Confirmación de recepción al reportante'],
    channel: 'csirt@utpl.edu.ec',
  },
  {
    Icon: SearchIcon,
    title: 'Clasificación y priorización',
    items: ['Análisis inicial del tipo y alcance', 'Asignación de nivel de severidad', 'Determinación de urgencia de respuesta'],
    channel: 'Proceso interno',
  },
  {
    Icon: AnalyzeIcon,
    title: 'Análisis de incidentes',
    items: ['Revisión de evidencias e indicadores', 'Identificación de causa y vector de ataque', 'Evaluación del impacto potencial'],
    channel: 'Proceso técnico',
  },
  {
    Icon: CoordinateIcon,
    title: 'Coordinación de respuesta',
    items: ['Orientación al usuario afectado', 'Coordinación con áreas técnicas', 'Seguimiento hasta cierre del caso'],
    channel: 'Correo y coordinación',
  },
];

const proactiveServices = [
  {
    Icon: BellIcon,
    title: 'Alertas y advertencias',
    items: ['Publicación de alertas sobre amenazas activas', 'Boletines preventivos para la comunidad', 'Noticias de seguridad con enfoque educativo'],
    channel: 'Portal y correo',
  },
  {
    Icon: VulnIcon,
    title: 'Gestión de vulnerabilidades',
    items: ['Canal para reporte responsable de vulnerabilidades', 'Seguimiento y coordinación de parches', 'Publicación de avisos relevantes'],
    channel: 'csirt@utpl.edu.ec',
  },
  {
    Icon: GradCapIcon,
    title: 'Concientización digital',
    items: ['Materiales educativos para la comunidad', 'Campañas de seguridad institucional', 'Guías y tips prácticos'],
    channel: 'Portal CSIRT',
  },
  {
    Icon: TrainIcon,
    title: 'Capacitación',
    items: ['Charlas y talleres de seguridad', 'Material de apoyo para equipos técnicos', 'Orientación sobre buenas prácticas'],
    channel: 'Eventos y portal',
  },
  {
    Icon: TrendIcon,
    title: 'Mejora continua',
    items: ['Revisión periódica de políticas y procesos', 'Coordinación con áreas institucionales', 'Investigación aplicada en seguridad'],
    channel: 'Proceso interno',
  },
];

const servicesTableRows = [
  { service: 'Respuesta a incidentes', type: 'Reactivo', audience: 'Comunidad UTPL', channel: 'Correo institucional', result: 'Análisis y orientación técnica' },
  { service: 'Alertas de seguridad', type: 'Proactivo', audience: 'Comunidad UTPL', channel: 'Portal y correo', result: 'Información oportuna' },
  { service: 'Reporte de vulnerabilidades', type: 'Mixto', audience: 'Técnicos y usuarios', channel: 'Correo institucional', result: 'Coordinación de mitigación' },
  { service: 'Concientización', type: 'Proactivo', audience: 'Todos', channel: 'Portal CSIRT', result: 'Cultura digital segura' },
  { service: 'Capacitación', type: 'Proactivo', audience: 'Personal y estudiantes', channel: 'Eventos', result: 'Habilidades de seguridad' },
  { service: 'Gestión documental (RFC 2350)', type: 'Proactivo', audience: 'Todos', channel: 'Portal CSIRT', result: 'Transparencia institucional' },
];

/* Sorted alphabetically — each item carries its own icon component */
const ScalesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v18M3 6l4 8H3M21 6l-4 8h4M5 21h14"/>
    <line x1="3" y1="14" x2="7" y2="14"/><line x1="17" y1="14" x2="21" y2="14"/>
  </svg>
);
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const LaptopIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="14" rx="2"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);

const limitations = [
  { text: 'Asesoría legal sobre fraudes o delitos informáticos',                           Icon: ScalesIcon  },
  { text: 'Auditorías de seguridad ofensivas o pruebas de penetración a solicitud',       Icon: ShieldIcon  },
  { text: 'Garantía de respuesta inmediata fuera del horario hábil',                       Icon: ClockIcon   },
  { text: 'Gestión de incidentes en sistemas externos a la red UTPL',                      Icon: GlobeIcon   },
  { text: 'Recuperación forense de datos de usuarios individuales',                         Icon: SearchIcon  },
  { text: 'Soporte técnico directo a dispositivos personales no institucionales',           Icon: LaptopIcon  },
];

export const revalidate = 60;

export default async function ServiciosPage() {
  const [
    editor, heroBlock, misionBlock, drupalReactive, drupalProactive, drupalLimitaciones,
    reactivosBlock, proactivosBlock, limitacionesBlock,
    resumenBlock, tablaResumen, severidadBlock, severidadItems, ctaBlock, ctaBotones,
  ] = await Promise.all([
    isEditor(),
    getPageBlock('servicios', 'hero'),
    getPageBlock('servicios', 'mision'),
    getPageItems('servicios', 'reactivos'),
    getPageItems('servicios', 'proactivos'),
    getPageItems('servicios', 'limitaciones'),
    getPageBlock('servicios', 'reactivos'),
    getPageBlock('servicios', 'proactivos'),
    getPageBlock('servicios', 'limitaciones'),
    getPageBlock('servicios', 'resumen'),
    getPageItems('servicios', 'tabla-resumen'),
    getPageBlock('servicios', 'severidad'),
    getPageItems('servicios', 'severidad'),
    getPageBlock('servicios', 'cta'),
    getPageItems('servicios', 'cta-botones'),
  ]);

  const tableRows = tablaResumen.length
    ? tablaResumen.map((i) => ({ service: i.title, type: i.kicker, audience: i.description, channel: i.channel, result: i.source && i.source !== 'YouTube' ? i.source : '' }))
    : servicesTableRows;
  return (
    <>
      <Header active="Servicios" />
      <main id="main-content">

        {/* ── Hero ── */}
        <section className="richPageHero richHero--servicios">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Hero servicios" />}
          <div className="richPageHeroBg" />
          <div className="richHeroAccentLine" />
          <div className="container richHeroGrid">
            <div className="richHeroCopy">
              <span className="eyebrow">{heroBlock?.kicker || 'CSIRT UTPL'}</span>
              <h1>{heroBlock?.titulo || 'Servicios del CSIRT UTPL'}</h1>
              {heroBlock?.cuerpo
                ? <div dangerouslySetInnerHTML={{ __html: heroBlock.cuerpo }} />
                : <p>El CSIRT UTPL presta servicios reactivos y proactivos para proteger la seguridad de la información en toda la comunidad universitaria. Conoce cómo podemos apoyarte ante un incidente o para fortalecer tu cultura digital.</p>
              }
              <div className="heroActions">
                <Link className="btnPrimary" href="/reportar-incidente">Reportar incidente</Link>
              </div>
            </div>

            <div className="richHeroVisual" aria-hidden="true">
              {/* Main icon: shield with gear + checkmark */}
              <div className="richHeroIcon">
                <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Shield */}
                  <path d="M50 10 L85 24 L85 52 C85 74 65 89 50 93 C35 89 15 74 15 52 L15 24 Z"
                    stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" fill="rgba(255,255,255,0.07)" strokeLinejoin="round"/>
                  {/* Checkmark */}
                  <polyline points="33,52 44,63 67,38"
                    stroke="rgba(60,230,160,0.95)" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Small gear top-right */}
                  <circle cx="74" cy="28" r="9" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="rgba(255,255,255,0.06)"/>
                  <circle cx="74" cy="28" r="4" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none"/>
                  <line x1="74" y1="17" x2="74" y2="20" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="74" y1="36" x2="74" y2="39" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="63" y1="28" x2="66" y2="28" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="82" y1="28" x2="85" y2="28" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Badge 1 — reactivo */}
              <div className="richHeroBadge richHeroBadge--top">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Reactivo</strong>
                  <span>Respuesta ante incidentes</span>
                </div>
              </div>

              {/* Badge 2 — proactivo */}
              <div className="richHeroBadge richHeroBadge--mid">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Proactivo</strong>
                  <span>Prevención continua</span>
                </div>
              </div>

              {/* Badge 3 — capacitación */}
              <div className="richHeroBadge richHeroBadge--bot">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Capacitación</strong>
                  <span>Formación institucional</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Intro / Misión ── */}
        <section className="section whiteSection">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Misión / intro" />}
          <div className="container">
            <div className="misionLayout">

                {/* Icon with sparkles */}
                <div className="misionIconWrap">
                  <div className="misionIconCircle">
                    <svg width="72" height="72" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      {/* Shield */}
                      <path d="M40 8 L68 20 L68 44 C68 62 54 74 40 78 C26 74 12 62 12 44 L12 20 Z"
                        stroke="var(--color-primary)" strokeWidth="2.5" fill="rgba(0,66,112,0.06)" strokeLinejoin="round"/>
                      {/* Lock body */}
                      <rect x="28" y="40" width="24" height="20" rx="4"
                        stroke="var(--color-primary)" strokeWidth="2" fill="rgba(0,66,112,0.08)"/>
                      {/* Lock shackle */}
                      <path d="M32 40 V34 a8 8 0 0 1 16 0 V40"
                        stroke="var(--color-primary)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                      {/* Checkmark */}
                      <polyline points="33,50 37,54 47,44"
                        stroke="var(--color-accent)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {/* Sparkle decorators */}
                  <span className="misionSparkle misionSparkle--tr" aria-hidden="true">✦</span>
                  <span className="misionSparkle misionSparkle--bl" aria-hidden="true">✦</span>
                  <span className="misionSparkle misionSparkle--tl" aria-hidden="true">+</span>
                </div>

                {/* Vertical separator */}
                <div className="misionSep" />

                {/* Content */}
                <div className="misionContent">
                  <div className="misionEyebrow">
                    <span className="misionEyebrowLine" />
                    <span>{misionBlock?.kicker || 'Nuestra misión'}</span>
                  </div>
                  <h2>{misionBlock?.titulo || 'Cómo apoyamos a la comunidad universitaria'}</h2>
                  {misionBlock?.cuerpo
                    ? <div dangerouslySetInnerHTML={{ __html: misionBlock.cuerpo }} />
                    : <p>El CSIRT UTPL actúa como punto único de contacto para la atención, prevención y respuesta a incidentes de seguridad de la información. Ofrecemos orientación técnica, publicamos alertas oportunas y desarrollamos iniciativas educativas para que estudiantes, docentes y personal administrativo tomen decisiones digitales más seguras. Nuestra labor complementa la gestión institucional de TI sin reemplazar el rol de soporte técnico directo.</p>
                  }
                </div>

            </div>
          </div>
        </section>

        {/* ── Servicios reactivos ── */}
        <section className="section">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Servicios reactivos y proactivos" />}
          <div className="container">
            <div className="servicesGroup">
              <h2 className="servicesGroupTitle">{reactivosBlock?.titulo || 'Servicios reactivos'}</h2>
              {reactivosBlock?.cuerpo
                ? <div className="servicesGroupSubtitle" dangerouslySetInnerHTML={{ __html: reactivosBlock.cuerpo }} />
                : <p className="servicesGroupSubtitle">
                    Respondemos a incidentes reportados por la comunidad UTPL con análisis, orientación
                    y coordinación.
                  </p>
              }
              <div className="servicesGrid">
                {(drupalReactive.length ? drupalReactive : reactiveServices).map((svc, i) => {
                  const Icon = [ShieldIcon, SearchIcon, AnalyzeIcon, CoordinateIcon][i] ?? ShieldIcon;
                  const listItems = svc.items ?? (svc.description ?? '').split('\n').filter(Boolean);
                  const channel   = svc.channel ?? svc.canal ?? '';
                  return (
                    <article className="serviceDetailCard" key={svc.title}>
                      <div className="serviceIconCircle"><Icon /></div>
                      <h3>{svc.title}</h3>
                      <div className="cardAccent" />
                      <ul>{listItems.map((item) => <li key={item}>{item}</li>)}</ul>
                      {channel && <span className="serviceChannel">Canal: {channel}</span>}
                    </article>
                  );
                })}
              </div>
            </div>

            {/* ── Servicios proactivos ── */}
            <div className="servicesGroup">
              <h2 className="servicesGroupTitle">{proactivosBlock?.titulo || 'Servicios proactivos'}</h2>
              {proactivosBlock?.cuerpo
                ? <div className="servicesGroupSubtitle" dangerouslySetInnerHTML={{ __html: proactivosBlock.cuerpo }} />
                : <p className="servicesGroupSubtitle">
                    Anticipamos riesgos, informamos a la comunidad y fortalecemos la cultura de
                    seguridad de manera continua.
                  </p>
              }
              <div className="servicesGrid servicesGrid--3col">
                {(drupalProactive.length ? drupalProactive : proactiveServices).map((svc, i) => {
                  const Icon = [BellIcon, VulnIcon, GradCapIcon, TrainIcon, TrendIcon][i] ?? BellIcon;
                  const listItems = svc.items ?? (svc.description ?? '').split('\n').filter(Boolean);
                  const channel   = svc.channel ?? svc.canal ?? '';
                  return (
                    <article className="serviceDetailCard" key={svc.title}>
                      <div className="serviceIconCircle"><Icon /></div>
                      <h3>{svc.title}</h3>
                      <div className="cardAccent" />
                      <ul>{listItems.map((item) => <li key={item}>{item}</li>)}</ul>
                      {channel && <span className="serviceChannel">Canal: {channel}</span>}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Tabla de servicios ── */}
        <section className="section whiteSection">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Resumen de servicios — texto" />}
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Resumen de servicios — filas de la tabla" pos="tl" />}
          <div className="container">
            <h2 style={{ color: 'var(--color-primary)', marginBottom: 8 }}>{resumenBlock?.titulo || 'Resumen de servicios'}</h2>
            {resumenBlock?.cuerpo
              ? <div style={{ color: 'var(--color-text-muted)', fontSize: '11.2pt', marginBottom: 16 }} dangerouslySetInnerHTML={{ __html: resumenBlock.cuerpo }} />
              : <p style={{ color: 'var(--color-text-muted)', fontSize: '11.2pt', marginBottom: 16 }}>
                  Visión consolidada de los servicios, su tipo, audiencia, canal de acceso y resultado esperado.
                </p>
            }
            <div style={{ overflowX: 'auto' }}>
              <table className="servicesTable">
                <thead>
                  <tr>
                    <th>Servicio</th>
                    <th>Tipo</th>
                    <th>Público</th>
                    <th>Canal</th>
                    <th>Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => (
                    <tr key={row.service}>
                      <td>{row.service}</td>
                      <td>{row.type}</td>
                      <td>{row.audience}</td>
                      <td>{row.channel}</td>
                      <td>{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Alcance y limitaciones ── */}
        <section className="section">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Limitaciones — tarjetas" />}
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Alcance y limitaciones — texto" pos="br" />}
          <div className="container">

            <div className="limitationsHeader">
              <div className="limitationsHeaderIcon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>
                </svg>
              </div>
              <div className="limitationsHeaderRule" />
              <div className="limitationsHeaderText">
                <h2>{limitacionesBlock?.titulo || 'Alcance y limitaciones'}</h2>
                {limitacionesBlock?.cuerpo
                  ? <div dangerouslySetInnerHTML={{ __html: limitacionesBlock.cuerpo }} />
                  : <p>
                      El CSIRT UTPL atiende incidentes y vulnerabilidades que afecten a sistemas,
                      servicios, redes o información de la Universidad Técnica Particular de Loja.
                      Las siguientes actividades están fuera del alcance operativo del equipo:
                    </p>
                }
              </div>
            </div>

            <div className="limitationsCards">
              {(drupalLimitaciones.length ? drupalLimitaciones : limitations).map((item, i) => {
                const Icon = item.Icon ?? [ScalesIcon, ShieldIcon, ClockIcon, GlobeIcon, SearchIcon, LaptopIcon][i] ?? ShieldIcon;
                const text = item.text || item.title || item.description || '';
                return (
                  <div className="limitationCard" key={text}>
                    <div className="limitationCardIcon"><Icon /></div>
                    <div className="limitationCardSep" aria-hidden="true" />
                    <p>{text}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ── Tabla de severidad ── */}
        <section className="section whiteSection">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Clasificación de severidad — texto" />}
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Clasificación de severidad — niveles" pos="tl" />}
          <div className="container">
            <h2 style={{ color: 'var(--color-primary)', marginBottom: 8 }}>{severidadBlock?.titulo || 'Clasificación de severidad'}</h2>
            {severidadBlock?.cuerpo
              ? <div style={{ color: 'var(--color-text-muted)', fontSize: '11.2pt', marginBottom: 24 }} dangerouslySetInnerHTML={{ __html: severidadBlock.cuerpo }} />
              : <p style={{ color: 'var(--color-text-muted)', fontSize: '11.2pt', marginBottom: 24 }}>
                  Cada incidente recibe una prioridad según su impacto potencial. Esto determina el
                  tiempo de respuesta objetivo del equipo.
                </p>
            }
            <SeverityMatrix items={severidadItems} />
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
