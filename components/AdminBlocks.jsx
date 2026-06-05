export function UsefulLinksBlock({ links = [] }) {
  if (!links.length) return null;

  return (
    <aside className="adminBlock">
      <h3>Enlaces de interés</h3>
      <ul>{links.map((link) => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}</ul>
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
