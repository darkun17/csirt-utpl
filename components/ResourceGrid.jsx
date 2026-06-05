import Link from 'next/link';
import { resources } from '../data/content';

export default function ResourceGrid({ limit }) {
  const items = limit ? resources.slice(0, limit) : resources;

  return (
    <div className="resourceGrid">
      {items.map((item) => (
        <article className="resourceCard" key={item.title}>
          <span>{item.type}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <Link href={item.href}>Abrir recurso</Link>
        </article>
      ))}
    </div>
  );
}
