import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AlertsGrid from '../../components/AlertsGrid';
import { alerts, editorialChannels } from '../../data/content';

export const metadata = {
  title: 'Noticias y alertas | CSIRT UTPL',
  description: 'Archivo editorial de noticias, alertas, recomendaciones, manuales y novedades de seguridad de la información.'
};

export default function AlertsPage() {
  return (
    <>
      <Header active="Alertas" />
      <main>

        {/* ── Hero banner ── */}
        <section className="richPageHero richHero--alerts">
          <div className="richPageHeroBg" />
          <div className="richHeroAccentLine" />
          <div className="container richHeroGrid">
            <div className="richHeroCopy">
              <span className="eyebrow">Noticias CSIRT UTPL</span>
              <h1>Actualidad, alertas y aprendizaje en seguridad digital</h1>
              <p>Un archivo editorial para capacitar a la comunidad universitaria con información oportuna, clara y accionable.</p>
              <div className="heroActions">
                <a className="btnPrimary" href="#alertas">Ver publicaciones</a>
                <a className="btnGhostLight" href="/reportar-incidente">Reportar incidente</a>
              </div>
            </div>

            <div className="richHeroVisual" aria-hidden="true">
              <div className="richHeroIcon">
                <svg width="88" height="88" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 18 C32 18 22 32 22 48 C22 68 14 76 14 76 L86 76 C86 76 78 68 78 48 C78 32 68 18 50 18 Z"
                    stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" fill="rgba(255,255,255,0.08)" strokeLinejoin="round"/>
                  <path d="M43 76 a7 7 0 0 0 14 0" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <line x1="50" y1="10" x2="50" y2="18" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M18 42 C14 42 10 46 10 50" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <path d="M82 42 C86 42 90 46 90 50" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <circle cx="71" cy="26" r="10" fill="rgba(255,80,80,0.9)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                  <text x="71" y="31" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">!</text>
                </svg>
              </div>

              <div className="richHeroBadge richHeroBadge--top">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                    <path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>{alerts.length} publicaciones</strong>
                  <span>Archivo editorial activo</span>
                </div>
              </div>

              <div className="richHeroBadge richHeroBadge--mid">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>{editorialChannels.length} canales</strong>
                  <span>Alertas, manuales, tips…</span>
                </div>
              </div>

              <div className="richHeroBadge richHeroBadge--bot">
                <div className="richHeroBadgeIcon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <div className="richHeroBadgeText">
                  <strong>Educativo</strong>
                  <span>Comunidad universitaria</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Interactive grid (client component) ── */}
        <AlertsGrid alerts={alerts} />

      </main>
      <Footer />
    </>
  );
}
