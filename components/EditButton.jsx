const ADMIN = process.env.NEXT_PUBLIC_DRUPAL_ADMIN_URL || 'http://admin-csirt.utpl.edu.ec';

const PencilIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

/**
 * href: ruta relativa al admin de Drupal (ej: "/node/add/alerta")
 *       o URL absoluta para casos especiales.
 * label: texto visible del botón.
 * pos: "tr" (top-right, default) | "tl" | "br"
 */
export default function EditButton({ href, label = 'Editar', pos = 'tr' }) {
  const url = href?.startsWith('http') ? href : `${ADMIN}${href}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`editBtn editBtn--${pos}`}
      aria-label={`Editar: ${label}`}
    >
      <PencilIcon />
      {label}
    </a>
  );
}
