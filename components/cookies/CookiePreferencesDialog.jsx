'use client';

import { useEffect, useRef } from 'react';
import { useCookieConsent } from './CookieConsentContext';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function CookiePreferencesDialog() {
  const { preferences, closePreferences, acceptAll, rejectAll, savePreferences } = useCookieConsent();
  const dialogRef = useRef(null);
  const titleId = 'cookie-dialog-title';

  // Checkbox de "Contenido externo": usa `defaultChecked` + ref (no-controlado)
  // en vez de estado controlado. Esto es seguro en concreto porque el padre
  // (CookieConsentProvider) renderiza este diálogo condicionalmente
  // `{mounted && isOpen && <CookiePreferencesDialog />}` — es un DESMONTAJE
  // real al cerrar, no un ocultamiento por CSS. Cada apertura es un montaje
  // nuevo, así que `defaultChecked` siempre lee el valor FRESCO de
  // `preferences.externalMedia` en ese instante (post aceptar/rechazar/
  // guardar), nunca un valor obsoleto de una instancia anterior. Si en el
  // futuro este diálogo deja de desmontarse (p. ej. se anima con CSS en vez
  // de condicional), hay que migrar a estado controlado
  // (`checked={draft}` + `onChange`) inicializado una sola vez al montar.
  const externalMediaInputRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const dialogEl = dialogRef.current;

    // Foco inicial: el primer control real dentro del diálogo.
    const focusables = dialogEl?.querySelectorAll(FOCUSABLE_SELECTOR);
    (focusables?.[0] ?? dialogEl)?.focus();

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        // Escape SIEMPRE puede cerrar el diálogo, incluso en la primera
        // visita — pero cerrar no es una decisión: closePreferences() solo
        // oculta el modal (setIsOpen(false)), nunca llama a persist(), así
        // que no escribe nada en localStorage ni cambia `hasDecision`.
        // externalMedia sigue en su valor por defecto (false) y YouTube
        // sigue bloqueado hasta que el usuario elija explícitamente desde
        // el botón "Configurar cookies" del footer.
        e.preventDefault();
        closePreferences();
        return;
      }
      if (e.key !== 'Tab' || !dialogEl) return;

      const items = Array.from(dialogEl.querySelectorAll(FOCUSABLE_SELECTOR));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [closePreferences]);

  function handleSave() {
    savePreferences({ externalMedia: !!externalMediaInputRef.current?.checked });
  }

  return (
    <div className="cookieOverlay" role="presentation">
      <div
        ref={dialogRef}
        className="cookieDialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <h2 id={titleId} className="cookieDialog__title">Configuración de cookies</h2>
        <p className="cookieDialog__intro">
          Elige qué tecnologías permites. Puedes cambiar tu elección cuando quieras desde el pie de página.
        </p>

        <div className="cookieDialog__body">
          <div className="cookieCategory">
            <div className="cookieCategory__header">
              <span className="cookieCategory__title">Necesarias</span>
              <span className="cookieCategory__always">Siempre activas</span>
            </div>
            <p className="cookieCategory__desc">
              Permiten el funcionamiento básico del sitio y guardan las preferencias necesarias para prestar el servicio.
            </p>
          </div>

          <div className="cookieCategory">
            <div className="cookieCategory__header">
              <label className="cookieCategory__title" htmlFor="cookie-external-media">Contenido externo</label>
              <input
                id="cookie-external-media"
                ref={externalMediaInputRef}
                type="checkbox"
                defaultChecked={preferences.externalMedia}
                className="cookieCategory__checkbox"
              />
            </div>
            <p className="cookieCategory__desc">
              Permite cargar contenido alojado en servicios externos, como videos de YouTube. Estos servicios pueden utilizar tecnologías propias cuando decides reproducir el contenido.
            </p>
          </div>
        </div>

        <div className="cookieDialog__actions">
          <button type="button" className="cookieBtn cookieBtn--ghost" onClick={rejectAll}>
            Rechazar todas
          </button>
          <button type="button" className="cookieBtn cookieBtn--outline" onClick={handleSave}>
            Guardar selección
          </button>
          <button type="button" className="cookieBtn cookieBtn--primary" onClick={acceptAll}>
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
