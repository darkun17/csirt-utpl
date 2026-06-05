import Link from 'next/link';
import { contactEmail } from '../data/content';

export default function HeroSecurity() {
  return (
    <section className="securityHero">
      <div className="securityHeroBg" />
      <div className="container heroGrid">
        <div className="heroCopy">
          <span className="eyebrow">CSIRT | Seguridad de la Información</span>
          <h1>Equipo de Respuesta a Incidentes CSIRT UTPL</h1>
          <p>Atención, soporte y respuesta a incidentes de seguridad informática para la comunidad de la Universidad Técnica Particular de Loja.</p>
          <div className="heroActions">
            <Link className="btnPrimary" href="/reportar-incidente">Reportar incidente</Link>
            <Link className="btnGhostLight" href="/alertas">Ver noticias y alertas</Link>
          </div>
        </div>
        <aside className="incidentPanel">
          <span className="panelBadge">Canal oficial</span>
          <h2>¿Detectaste phishing, malware, fuga de datos o acceso no autorizado?</h2>
          <p>Conserva evidencias y escribe al equipo CSIRT UTPL. Incluye capturas, remitentes, enlaces, fechas y una descripción breve.</p>
          <a className="mailLink" href={`mailto:${contactEmail}?subject=Reporte%20de%20incidente%20de%20seguridad`}>{contactEmail}</a>
        </aside>
      </div>
    </section>
  );
}
