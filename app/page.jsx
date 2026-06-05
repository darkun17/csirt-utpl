import Header from '../components/Header';
import Footer from '../components/Footer';
import AlertCard from '../components/AlertCard';
import VideoLibrary from '../components/VideoLibrary';
import Link from 'next/link';
import { contactEmail } from '../data/content';
import {
  getAlerts,
  getServices,
  getLearningTracks,
  getVisualGuides,
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

const NewspaperIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
    <path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>
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

/* ── Data ── */
const benefits = [
  { icon: <BellIcon />,   title: 'Alertas oportunas', text: 'Noticias y recomendaciones para actuar antes de que el riesgo crezca.' },
  { icon: <BookIcon />,   title: 'Cultura digital',   text: 'Materiales simples para estudiantes, docentes y equipos administrativos.' },
  { icon: <MailIcon />,   title: 'Canal oficial',     text: `Reporte directo al correo ${contactEmail}.` },
  { icon: <ShieldIcon />, title: 'Respaldo UTPL',     text: 'Gestión institucional de seguridad de la información.' },
];

const ctaItems = [
  { icon: <NewspaperIcon />, title: 'Mantente informado', sub: 'Noticias y alertas',  href: '/alertas',              label: 'Ver alertas',   isExternal: false },
  { icon: <BookIcon />,      title: 'Aprende más',        sub: 'Guías y recursos',    href: '/recursos',             label: 'Documentación', isExternal: false },
  { icon: <MailIcon />,      title: 'Reporta incidente',  sub: 'Canal seguro CSIRT',  href: `mailto:${contactEmail}`, label: 'Reportar',     isExternal: true  },
];

const values = [
  'Confidencialidad de la información',
  'Prevención y respuesta oportuna',
  'Aprendizaje permanente',
  'Cooperación institucional',
  'Comunicación clara',
  'Mejora continua',
];

const ICONS_SVC = [ShieldIcon, BellIcon, GradCapIcon, TrendIcon];

export default async function HomePage() {
  const [latestAlerts, services, learningTracks, visualGuides] = await Promise.all([
    getAlerts({ limit: 6 }),
    getServices(),
    getLearningTracks(),
    getVisualGuides(),
  ]);

  return (
    <>
      <Header />
      <main id="main-content">

        {/* ── Hero ── */}
        <section className="utplHero">
          <div className="utplHeroBg" />
          <div className="container utplHeroGrid">
            <div className="utplHeroInner">
              <span className="eyebrow">Seguridad que transforma</span>
              <h1>Protege tu información con el CSIRT UTPL</h1>
              <p>Portal universitario de noticias, manuales, tips y novedades de seguridad para capacitar a la comunidad UTPL.</p>
              <div className="heroActions">
                <Link className="btnPrimary" href="/alertas">Explorar publicaciones</Link>
                <Link className="btnGhostLight" href="/reportar-incidente">Reportar incidente</Link>
              </div>
            </div>
            <div className="utplHeroVisual" aria-hidden="true">
              <img src="/assets/hero-shield.svg" alt="" />
            </div>
          </div>
          <div className="container heroBenefits">
            {benefits.map(({ icon, title, text }) => (
              <article key={title}>
                <span aria-hidden="true">{icon}</span>
                <div><strong>{title}</strong><p>{text}</p></div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Quiénes somos ── */}
        <section className="section aboutPanel">
          <div className="container aboutGrid">
            <img src="https://picsum.photos/seed/csirt-security-team/900/680" alt="Equipo CSIRT UTPL" />
            <div>
              <span className="eyebrow dark">Quiénes somos</span>
              <h2>Equipo de Respuesta a Incidentes de Seguridad Informática</h2>
              <p>El CSIRT-UTPL brinda atención, soporte y respuesta a incidentes de seguridad, y publica contenidos educativos para fortalecer la cultura digital de estudiantes, docentes y colaboradores.</p>
              <div className="aboutStats">
                <div><strong>CSIRT</strong><span>Punto de contacto</span></div>
                <div><strong>UTPL</strong><span>Respaldo institucional</span></div>
                <div><strong>24/7</strong><span>Prevención continua</span></div>
                <div><strong>+Guías</strong><span>Aprendizaje práctico</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Oferta de contenidos ── */}
        <section className="section programSection">
          <div className="container">
            <div className="sectionHead centered">
              <div>
                <span className="eyebrow dark">Oferta de contenidos</span>
                <h2>Noticias, manuales y recomendaciones</h2>
                <p>Información organizada como un portal universitario para aprender, prevenir y reportar.</p>
              </div>
            </div>
            <div className="programCards">
              {latestAlerts.map((alert) => (
                <AlertCard key={alert.slug} alert={alert} />
              ))}
            </div>
            <div className="programCtaRow">
              <Link href="/alertas" className="btnOutline">Ver todas las publicaciones →</Link>
            </div>
          </div>
        </section>

        {/* ── Educación continua ── */}
        <section className="section learningShowcase">
          <div className="container learningShowcaseGrid">
            <div>
              <span className="eyebrow dark">Educación continua</span>
              <h2>Aprendizaje flexible para protegerte mejor</h2>
              <p>Rutas breves para convertir buenas prácticas en hábitos diarios: phishing, contraseñas, dispositivos y reporte oportuno.</p>
              <Link className="btnOutline" href="/recursos">Explorar recursos</Link>
            </div>
            <div className="learningTiles">
              {learningTracks.map((item) => (
                <Link href={item.href} key={item.title}>
                  <span>{item.kicker}</span>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Campañas visuales ── */}
        <section className="section visualSection">
          <div className="container">
            <div className="sectionHead centered">
              <div>
                <span className="eyebrow dark">Concientización digital</span>
                <h2>Material educativo para la comunidad UTPL</h2>
                <p>Guías visuales y piezas de comunicación para fortalecer la cultura de seguridad informática.</p>
              </div>
            </div>
            <div className="visualGrid">
              {visualGuides.map((item) => (
                <article className="visualCard" key={item.title}>
                  <img src={item.image} alt="" aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <VideoLibrary />

        {/* ── Servicios + Valores ── */}
        <section className="section valuesBand">
          <div className="container svcValGrid">

            {/* Left: Services */}
            <div>
              <span className="eyebrow dark">Servicios CSIRT</span>
              <h2 className="svcMainTitle">Prevención, respuesta y capacitación</h2>
              <div className="svcTitleAccent" />
              <p className="svcDesc">Brindamos servicios especializados para fortalecer la seguridad de la información en la comunidad UTPL, promoviendo una cultura digital segura y resiliente.</p>

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
                <Link href="/reportar-incidente" className="svcBtnPrimary">
                  <ShieldIcon /> Reportar incidente →
                </Link>
                <Link href="/recursos" className="svcBtnLink">
                  <DocIcon /> Conoce nuestros recursos →
                </Link>
              </div>
            </div>

            {/* Right: Values card */}
            <div className="valCard">
              <div className="valCardHeader">
                <div className="valCardIconCircle"><PersonShieldIcon /></div>
                <div>
                  <h3 className="valCardTitle">Nuestros valores</h3>
                  <div className="valCardAccent" />
                </div>
              </div>
              <p className="valCardDesc">Actuamos con principios que guían cada decisión y acción para proteger la información y a nuestra comunidad.</p>
              <div className="valCardGrid">
                {values.map((value) => (
                  <div className="valCardItem" key={value}>
                    <span className="valCheck" aria-hidden="true">✓</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
              {/* Watermark */}
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

        {/* ── CTA "decide proteger más" ── */}
        <section className="moreCta">
          <div className="container">
            <div className="moreCtaHead">
              <p className="moreCtaIntro">¡Únete a la UTPL y</p>
              <strong className="moreCtaTitle">decide proteger más</strong>
              <p className="moreCtaSub">en la universidad <strong>más innovadora del Ecuador!</strong></p>
            </div>
            <div className="moreCtaActions">
              <div className="moreCtaAction">
                <span>Ya te decidiste</span>
                <a href="https://utpl.edu.ec/oferta" target="_blank" rel="noreferrer" className="moreCtaBtn">Oferta académica →</a>
              </div>
              <div className="moreCtaAction">
                <span>Más información</span>
                <a href="https://wa.me/593999565400" target="_blank" rel="noreferrer" className="moreCtaBtn">Escríbenos →</a>
              </div>
              <div className="moreCtaAction">
                <span>Más motivación</span>
                <a href="https://www.youtube.com/watch?v=FLuQ5B9Z7Uc&list=PLKiIhBZ1QsqrEPPUgdD325VQUa8_NgZ_g&pp=iAQB" target="_blank" rel="noreferrer" className="moreCtaBtn">Historias de éxito →</a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
