import Link from 'next/link';
import { alerts } from '../data/content';
import AlertCard from './AlertCard';

export default function LatestAlerts() {
  const [featured, ...latest] = alerts;

  return (
    <section className="section lightSection">
      <div className="container">
        <div className="sectionHead">
          <div>
            <span className="eyebrow dark">Noticias y alertas</span>
            <h2>Últimas publicaciones del CSIRT</h2>
            <p>Información actualizada para reconocer amenazas, prevenir incidentes y actuar con criterios claros.</p>
          </div>
          <Link className="btnOutline" href="/alertas">Ver todas</Link>
        </div>
        <div className="newsLayout">
          <AlertCard alert={featured} featured />
          <div className="newsList">
            {latest.slice(0, 4).map((alert) => <AlertCard key={alert.slug} alert={alert} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
