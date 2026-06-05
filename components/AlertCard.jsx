import Link from 'next/link';

export default function AlertCard({ alert, featured = false }) {
  const severityClass = `severity ${alert.severity.toLowerCase().replace('í', 'i')}`;

  return (
    <article className={featured ? 'alertCard featuredAlert' : 'alertCard'}>
      <Link className="alertImage" href={`/alertas/${alert.slug}`} aria-label={alert.title}>
        <img src={alert.image} alt="" loading="lazy" />
        <span className={severityClass}>{alert.severity}</span>
      </Link>
      <div className="alertBody">
        <div className="cardMeta">
          <span>{alert.category}</span>
          <time>{alert.date}</time>
        </div>
        <h3><Link href={`/alertas/${alert.slug}`}>{alert.title}</Link></h3>
        <p>{alert.summary}</p>
        <div className="tags">{alert.tags.slice(0, 3).map((tag) => <span key={tag}>#{tag}</span>)}</div>
        <Link className="readMore" href={`/alertas/${alert.slug}`}>Leer publicación</Link>
      </div>
    </article>
  );
}
