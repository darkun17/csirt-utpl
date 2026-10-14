import Header from '../components/Header';
import Footer from '../components/Footer';
import AlertCard from '../components/AlertCard';
import VideoLibrary from '../components/VideoLibrary';
import EditButton from '../components/EditButton';
import Link from 'next/link';
import { contactEmail } from '../data/content';
import { isEditor } from '../lib/auth';
import {
  getAlerts,
  getServices,
  getLearningTracks,
  getPageBlock,
  getPageItems,
} from '../lib/drupal';

export const revalidate = 60;

/* ── Lucide-style SVG icons (stroke, 22×22) ── */
const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const GradCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const TrendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);

const PersonShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5L12 1z"/>
    <circle cx="12" cy="10" r="3"/>
    <path d="M6.168 18.849A4 4 0 0 1 10 17h4a4 4 0 0 1 3.832 1.849"/>
  </svg>
);

const DocIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

/* ── Fallback (solo si Drupal no responde) ── */
const BENEFIT_ICONS = [<BellIcon key="b" />, <BookIcon key="c" />, <MailIcon key="m" />];
const benefitsFallback = [
  { title: 'Alertas oportunas', text: 'Noticias y recomendaciones para actuar antes de que el riesgo crezca.' },
  { title: 'Cultura digital',   text: 'Materiales simples para estudiantes, docentes y equipos administrativos.' },
  { title: 'Canal oficial',     text: `Reporte directo al correo ${contactEmail}.` },
];

const statsFallback = [
  { title: 'CSIRT', text: 'Punto de contacto' },
  { title: 'UTPL', text: 'Respaldo institucional' },
  { title: '24/7', text: 'Prevención continua' },
  { title: '+Guías', text: 'Aprendizaje práctico' },
];

const heroBotonesFallback = [
  { title: 'Explorar publicaciones', href: '/alertas' },
  { title: 'Reportar incidente', href: '/reportar-incidente' },
];

const servicesCtaFallback = [
  { title: 'Reportar incidente →', href: '/reportar-incidente' },
  { title: 'Conoce nuestros recursos →', href: '/recursos' },
];
const SERVICES_CTA_ICONS = [ShieldIcon, DocIcon];

const valuesFallback = [
  'Confidencialidad de la información',
  'Prevención y respuesta oportuna',
  'Aprendizaje permanente',
  'Cooperación institucional',
  'Comunicación clara',
  'Mejora continua',
];

const ctaFinalLinksFallback = [
  { kicker: 'Ya te decidiste', title: 'Oferta académica →', href: 'https://utpl.edu.ec/oferta' },
  { kicker: 'Más información', title: 'Escríbenos →', href: 'https://wa.me/593999565400' },
  { kicker: 'Más motivación', title: 'Historias de éxito →', href: 'https://www.youtube.com/watch?v=FLuQ5B9Z7Uc&list=PLKiIhBZ1QsqrEPPUgdD325VQUa8_NgZ_g&pp=iAQB' },
];

const ICONS_SVC = [ShieldIcon, BellIcon, GradCapIcon, TrendIcon];

export default async function HomePage() {
  const [
    editor, latestAlerts, services, learningTracks,
    heroBlock, sobreBlock, sobreItems,
    beneficios, heroBotones, stats,
    ofertaBlock,
    aprendizajeBlock, serviciosBlock, serviciosCta,
    valoresBlock, valoresItems,
    videosBlock, ctaFinalBlock, ctaFinalLinks,
  ] = await Promise.all([
    isEditor(),
    getAlerts({ limit: 6 }),
    getServices(),
    getLearningTracks(),
    getPageBlock('inicio', 'hero'),
    getPageBlock('inicio', 'sobre'),
    getPageItems('inicio', 'sobre'),
    getPageItems('inicio', 'beneficios'),
    getPageItems('inicio', 'hero-botones'),
    getPageItems('inicio', 'stats'),
    getPageBlock('inicio', 'oferta-contenidos'),
    getPageBlock('inicio', 'aprendizaje'),
    getPageBlock('inicio', 'servicios'),
    getPageItems('inicio', 'servicios-cta'),
    getPageBlock('inicio', 'valores'),
    getPageItems('inicio', 'valores'),
    getPageBlock('inicio', 'videos'),
    getPageBlock('inicio', 'cta-final'),
    getPageItems('inicio', 'cta-final'),
  ]);

  const benefits   = beneficios.length ? beneficios.map((i) => ({ title: i.title, text: i.description })) : benefitsFallback;
  const heroBtns    = heroBotones.length ? heroBotones : heroBotonesFallback;
  const aboutStats  = stats.length ? stats.map((i) => ({ title: i.title, text: i.description })) : statsFallback;
  const servicesCta = serviciosCta.length ? serviciosCta : servicesCtaFallback;
  const values      = valoresItems.length ? valoresItems.map((i) => i.title) : valuesFallback;
  const ctaLinks    = ctaFinalLinks.length ? ctaFinalLinks : ctaFinalLinksFallback;

  return (
    <>
      <Header />
      <main id="main-content">

        {/* ── Hero ── */}
        <section className="utplHero">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Hero / Cabecera" />}
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Hero — botones y beneficios" pos="tl" />}
          <div
            className="utplHeroBg"
            style={heroBlock?.imagenFondo ? { backgroundImage: `linear-gradient(100deg, rgba(0,28,55,.94) 0%, rgba(0,42,82,.82) 38%, rgba(0,50,95,.55) 62%, rgba(0,38,72,.40) 100%), url(${heroBlock.imagenFondo})` } : undefined}
          />
          <div className="container utplHeroGrid">
            <div className="utplHeroInner">
              <span className="eyebrow">{heroBlock?.kicker || 'Seguridad que transforma'}</span>
              <h1>{heroBlock?.titulo || 'Protege tu información con el CSIRT UTPL'}</h1>
              {heroBlock?.cuerpo
                ? <div dangerouslySetInnerHTML={{ __html: heroBlock.cuerpo }} />
                : <p>Portal universitario de noticias, manuales, tips y novedades de seguridad para capacitar a la comunidad UTPL.</p>
              }
              <div className="heroActions">
                {heroBtns.map((btn, i) => (
                  <Link key={btn.title} className={i === 0 ? 'btnPrimary' : 'btnGhostLight'} href={btn.href ?? '#'}>{btn.title}</Link>
                ))}
              </div>
            </div>
            <div className="utplHeroVisual" aria-hidden="true">
              <img src={heroBlock?.imagen || '/assets/hero-shield.svg'} alt="" />
            </div>
          </div>
          <div className="container heroBenefits">
            {benefits.map(({ title, text }, i) => (
              <article key={title}>
                <span aria-hidden="true">{BENEFIT_ICONS[i] ?? BENEFIT_ICONS[0]}</span>
                <div><strong>{title}</strong><p>{text}</p></div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Quiénes somos ── */}
        <section className="section aboutPanel">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Quiénes somos — texto" />}
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Estadísticas" pos="br" />}
          <div className="container aboutGrid">
            <img
              src={sobreBlock?.imagen || sobreItems[0]?.image || 'https://picsum.photos/seed/csirt-security-team/900/680'}
              alt="Equipo CSIRT UTPL"
            />
            <div>
              <span className="eyebrow dark">{sobreBlock?.kicker || 'Quiénes somos'}</span>
              <h2>{sobreBlock?.titulo || 'Equipo de Respuesta a Incidentes de Seguridad Informática'}</h2>
              {sobreBlock?.cuerpo
                ? <div dangerouslySetInnerHTML={{ __html: sobreBlock.cuerpo }} />
                : <p>El CSIRT-UTPL brinda atención, soporte y respuesta a incidentes de seguridad, y publica contenidos educativos para fortalecer la cultura digital de estudiantes, docentes y colaboradores.</p>
              }
              <div className="aboutStats">
                {aboutStats.map(({ title, text }) => (
                  <div key={title}><strong>{title}</strong><span>{text}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Oferta de contenidos (Alertas) ── */}
        <section className="section programSection">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Oferta de contenidos — texto" />}
          {editor && <EditButton href="/admin/content?type=alerta" label="Alertas / Noticias" pos="tl" />}
          <div className="container">
            <div className="sectionHead centered">
              <div>
                <span className="eyebrow dark">{ofertaBlock?.kicker || 'Oferta de contenidos'}</span>
                <h2>{ofertaBlock?.titulo || 'Noticias, manuales y recomendaciones'}</h2>
                {ofertaBlock?.cuerpo
                  ? <div dangerouslySetInnerHTML={{ __html: ofertaBlock.cuerpo }} />
                  : <p>Información organizada como un portal universitario para aprender, prevenir y reportar.</p>
                }
              </div>
            </div>
            {latestAlerts.length > 0 ? (
              <>
                <div className="programCards">
                  {latestAlerts.map((alert) => (
                    <AlertCard key={alert.slug} alert={alert} />
                  ))}
                </div>
                <div className="programCtaRow">
                  <Link href="/alertas" className="btnOutline">Ver todas las publicaciones →</Link>
                </div>
              </>
            ) : (
              <p className="emptyState">Aún no hay publicaciones. Crea la primera desde el panel Drupal.</p>
            )}
          </div>
        </section>

        {/* ── Educación continua ── */}
        <section className="section learningShowcase">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Rutas de aprendizaje — tiles" />}
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Educación continua — texto" pos="br" />}
          <div className="container learningShowcaseGrid">
            <div>
              <span className="eyebrow dark">{aprendizajeBlock?.kicker || 'Educación continua'}</span>
              <h2>{aprendizajeBlock?.titulo || 'Aprendizaje flexible para protegerte mejor'}</h2>
              {aprendizajeBlock?.cuerpo
                ? <div dangerouslySetInnerHTML={{ __html: aprendizajeBlock.cuerpo }} />
                : <p>Rutas breves para convertir buenas prácticas en hábitos diarios: phishing, contraseñas, dispositivos y reporte oportuno.</p>
              }
              <Link className="btnOutline" href="/recursos">Explorar recursos</Link>
            </div>
            <div className="learningTiles">
              {learningTracks.map((item) => (
                <Link href={item.href ?? '#'} key={item.title}>
                  <span>{item.kicker}</span>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <VideoLibrary editor={editor} block={videosBlock} />

        {/* ── Servicios + Valores ── */}
        <section className="section valuesBand">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Servicios CSIRT, botones y valores — tarjetas" />}
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Servicios y Valores — texto" pos="br" />}
          <div className="container svcValGrid">

            {/* Left: Services */}
            <div>
              <span className="eyebrow dark">{serviciosBlock?.kicker || 'Servicios CSIRT'}</span>
              <h2 className="svcMainTitle">{serviciosBlock?.titulo || 'Prevención, respuesta y capacitación'}</h2>
              <div className="svcTitleAccent" />
              {serviciosBlock?.cuerpo
                ? <div className="svcDesc" dangerouslySetInnerHTML={{ __html: serviciosBlock.cuerpo }} />
                : <p className="svcDesc">Brindamos servicios especializados para fortalecer la seguridad de la información en la comunidad UTPL, promoviendo una cultura digital segura y resiliente.</p>
              }

              <div className="svcCardGrid">
                {ICONS_SVC.map((Icon, i) => services[i] && (
                  <article className="svcCard" key={services[i].title}>
                    <div className="svcCardIcon"><Icon /></div>
                    <h3 className="svcCardTitle">{services[i].title}</h3>
                    <div className="svcCardAccent" />
                    <p>{services[i].description}</p>
                  </article>
                ))}
              </div>

              <div className="svcCtaRow">
                {servicesCta.map((btn, i) => {
                  const Icon = SERVICES_CTA_ICONS[i] ?? ShieldIcon;
                  return (
                    <Link key={btn.title} href={btn.href ?? '#'} className={i === 0 ? 'svcBtnPrimary' : 'svcBtnLink'}>
                      <Icon /> {btn.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right: Values card */}
            <div className="valCard">
              <div className="valCardHeader">
                <div className="valCardIconCircle"><PersonShieldIcon /></div>
                <div>
                  <h3 className="valCardTitle">{valoresBlock?.titulo || 'Nuestros valores'}</h3>
                  <div className="valCardAccent" />
                </div>
              </div>
              {valoresBlock?.cuerpo
                ? <div className="valCardDesc" dangerouslySetInnerHTML={{ __html: valoresBlock.cuerpo }} />
                : <p className="valCardDesc">Actuamos con principios que guían cada decisión y acción para proteger la información y a nuestra comunidad.</p>
              }
              <div className="valCardGrid">
                {values.map((value) => (
                  <div className="valCardItem" key={value}>
                    <span className="valCheck" aria-hidden="true">✓</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
              <div className="valWatermark" aria-hidden="true">
                <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60 4L8 24v44c0 34 22 64 52 76 30-12 52-42 52-76V24L60 4z" stroke="currentColor" strokeWidth="3"/>
                  <rect x="42" y="68" width="36" height="30" rx="5" stroke="currentColor" strokeWidth="3"/>
                  <path d="M48 68V54c0-6.6 5.4-12 12-12s12 5.4 12 12v14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="60" cy="82" r="5" fill="currentColor"/>
                  <rect x="58" y="82" width="4" height="8" rx="2" fill="currentColor"/>
                </svg>
              </div>
            </div>

          </div>
        </section>

        {/* ── CTA ── */}
        <section className="moreCta">
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="CTA final — texto" />}
          {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="CTA final — enlaces" pos="tl" />}
          <div className="container">
            <div className="moreCtaHead">
              <p className="moreCtaIntro">{ctaFinalBlock?.kicker || '¡Únete a la UTPL y'}</p>
              <strong className="moreCtaTitle">{ctaFinalBlock?.titulo || 'decide proteger más'}</strong>
              {ctaFinalBlock?.cuerpo
                ? <div className="moreCtaSub" dangerouslySetInnerHTML={{ __html: ctaFinalBlock.cuerpo }} />
                : <p className="moreCtaSub">en la universidad <strong>más innovadora del Ecuador!</strong></p>
              }
            </div>
            <div className="moreCtaActions">
              {ctaLinks.map((link) => (
                <div className="moreCtaAction" key={link.title}>
                  <span>{link.kicker}</span>
                  <a href={link.href ?? '#'} target="_blank" rel="noreferrer" className="moreCtaBtn">{link.title}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
