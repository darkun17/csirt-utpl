const ADMIN = process.env.NEXT_PUBLIC_DRUPAL_ADMIN_URL || 'http://admin-csirt.utpl.edu.ec';

export default function EditBar() {
  return (
    <div className="editBar" role="toolbar" aria-label="Barra de edición">
      <div className="editBarLeft">
        <span className="editBarDot" aria-hidden="true" />
        <span className="editBarLabel">Modo edición</span>
      </div>
      <nav className="editBarNav" aria-label="Acciones de edición">
        <a href={`${ADMIN}/admin/content`} target="_blank" rel="noreferrer" className="editBarLink">
          Todo el contenido
        </a>
        <a href={`${ADMIN}/node/add/alerta`} target="_blank" rel="noreferrer" className="editBarLink editBarLink--accent">
          + Nueva alerta
        </a>
        <a href={`${ADMIN}/admin/content/block?type=bloque_pagina`} target="_blank" rel="noreferrer" className="editBarLink">
          Bloques (texto + tarjetas)
        </a>
        <a href={`${ADMIN}/media/add/image`} target="_blank" rel="noreferrer" className="editBarLink">
          + Subir imagen
        </a>
      </nav>
      <a href="/api/admin-logout" className="editBarLogout">Salir ✕</a>
    </div>
  );
}
