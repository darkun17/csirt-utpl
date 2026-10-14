export function UsefulLinksBlock({ links = [] }) {
  if (!links.length) return null;

  return (
    <aside className="adminBlock">
      <h3>Enlaces de interés</h3>
      <ul>{links.map((link) => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}</ul>
    </aside>
  );
}

export function RecentAlertsBlock({ alerts = [], currentSlug }) {
  const items = alerts.filter(a => a.slug !== currentSlug).slice(0, 5);
  if (!items.length) return null;

  return (
    <aside className="adminBlock recentAlertsBlock">
      <h3>Últimas publicaciones</h3>
      <ul>
        {items.map((alert) => (
          <li key={alert.slug}>
            <a href={`/alertas/${alert.slug}`}>
              <span className="recentAlertTitle">{alert.title}</span>
              {alert.date && <span className="recentAlertMeta">{alert.category} · {alert.date}</span>}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function ChecklistBlock({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="adminBlock checklistBlock">
      <h3>Qué hacer ahora</h3>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}
