import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { UsefulLinksBlock, ChecklistBlock } from '../../../components/AdminBlocks';
import { alerts, contactEmail } from '../../../data/content';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return alerts.map((alert) => ({ slug: alert.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const alert = alerts.find((item) => item.slug === slug);
  return {
    title: alert ? `${alert.title} | CSIRT UTPL` : 'Alerta | CSIRT UTPL',
    description: alert?.summary
  };
}

export default async function AlertDetailPage({ params }) {
  const { slug } = await params;
  const alert = alerts.find((item) => item.slug === slug);
  if (!alert) notFound();

  return (
    <>
      <Header active="Noticias y alertas" />
      <main>
        <section className="articleHero">
          <div className="container articleHeroGrid">
            <div>
              <div className="breadcrumbs"><Link href="/">Inicio</Link> / <Link href="/alertas">Noticias y alertas</Link> / {alert.title}</div>
              <span className={`severity ${alert.severity.toLowerCase().replace('í', 'i')}`}>{alert.severity}</span>
              <h1>{alert.title}</h1>
              <p>{alert.deck || alert.summary}</p>
              <div className="articleMeta"><span>{alert.author}</span><span>{alert.date}</span><span>{alert.category}</span><span>{alert.readTime}</span></div>
            </div>
            <img src={alert.image} alt="" />
          </div>
        </section>
        <section className="section whiteSection">
          <div className="container articleLayout">
            <article className="articleBody">
              <p className="articleLead">{alert.summary}</p>
              {alert.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <blockquote>La rapidez del reporte y la conservación de evidencias son claves para reducir el impacto de un incidente.</blockquote>
              <ChecklistBlock items={alert.checklist} />
              <div className="tags large">{alert.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
            </article>
            <aside className="articleRail">
              <UsefulLinksBlock links={alert.links} />
              <section className="adminBlock contactBlock">
                <h3>Reportar relacionado</h3>
                <p>Si esta publicación describe algo que te ocurrió, contacta al CSIRT UTPL con evidencias.</p>
                <a className="btnPrimary full" href={`mailto:${contactEmail}?subject=Reporte%20relacionado%20con%20${encodeURIComponent(alert.title)}`}>{contactEmail}</a>
              </section>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
