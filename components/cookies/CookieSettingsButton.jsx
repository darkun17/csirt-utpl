'use client';

import { useCookieConsent } from './CookieConsentContext';

/** Botón para el footer — reabre el panel de preferencias aunque ya exista
 *  una decisión guardada. Es <button>, no <a href="#">, por semántica. */
export default function CookieSettingsButton({ className }) {
  const { openPreferences } = useCookieConsent();
  return (
    <button type="button" className={className} onClick={openPreferences}>
      Configurar cookies
    </button>
  );
}
