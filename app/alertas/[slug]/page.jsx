import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import EditButton from '../../../components/EditButton';
import { UsefulLinksBlock, ChecklistBlock, RecentAlertsBlock } from '../../../components/AdminBlocks';
import { contactEmail } from '../../../data/content';
import { getAlertBySlug, getAlertSlugs, getAlerts } from '../../../lib/drupal';
import { isEditor } from '../../../lib/auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Permite slugs creados en Drupal después del build
export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAlertSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const alert = await getAlertBySlug(slug);
  return {
    title: alert ? `${alert.title} | CSIRT UTPL` : 'Alerta | CSIRT UTPL',
    description: alert?.summary,
  };
}

export default async function AlertDetailPage({ params }) {
  const { slug } = await params;
  const [alert, editor, latestAlerts] = await Promise.all([
    getAlertBySlug(slug),
    isEditor(),
    getAlerts({ limit: 6 }),
  ]);
  if (!alert) notFound();

  return (
    <>
      <Header active="Noticias y alertas" />
      <main>
        <section className="articleHero">
          {editor && <EditButton href="/admin/content?type=alerta" label="Editar esta alerta" />}
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
              {alert.summary && <p className="articleLead">{alert.summary}</p>}
              {alert.body.map((section, i) => (
                section.startsWith('<')
                  ? <div key={i} className="articleSection" dangerouslySetInnerHTML={{ __html: section }} />
                  : <p key={i}>{section}</p>
              ))}
              {alert.checklist.length > 0 && (
                <blockquote>La rapidez del reporte y la conservación de evidencias son claves para reducir el impacto de un incidente.</blockquote>
              )}
              <ChecklistBlock items={alert.checklist} />
              <div className="tags large">{alert.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
            </article>
            <aside className="articleRail">
              <RecentAlertsBlock alerts={latestAlerts} currentSlug={alert.slug} />
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
