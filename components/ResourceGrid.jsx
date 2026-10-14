import Link from 'next/link';
import { getResources } from '../lib/drupal';

export default async function ResourceGrid({ limit }) {
  const all   = await getResources();
  const items = limit ? all.slice(0, limit) : all;

  if (!items.length) return null;

  return (
    <div className="resourceGrid">
      {items.map((item) => (
        <article className="resourceCard" key={item.title}>
          <span>{item.type}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          {(item.comingSoon || !item.href || item.href === '#') ? (
            <span className="resourceComingSoon">Próximamente</span>
          ) : (item.external || item.href.startsWith('http')) ? (
            <a href={item.href} target="_blank" rel="noopener noreferrer">Abrir recurso</a>
          ) : (
            <Link href={item.href}>Abrir recurso</Link>
          )}
        </article>
      ))}
    </div>
  );
}
