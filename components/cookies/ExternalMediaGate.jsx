'use client';

import { useCookieConsent } from './CookieConsentContext';
import { toPrivacyEnhancedEmbedUrl } from '../../lib/youtube';

/**
 * Antes de consentimiento: NO existe ningún <iframe> en el DOM (ni se hace
 * ninguna petición a youtube.com/ytimg.com) — solo un placeholder local con
 * un botón. Después de "Permitir y reproducir": se activa field_tarjetas
 * externalMedia=true (persistido) y se reemplaza por el iframe real en
 * modo privacy-enhanced (youtube-nocookie.com).
 */
export default function ExternalMediaGate({ embedUrl, title }) {
  const { preferences, mounted, setExternalMedia } = useCookieConsent();
  const privacyUrl = toPrivacyEnhancedEmbedUrl(embedUrl);

  if (!privacyUrl) return null; // URL no reconocida — no se arriesga a inyectar un iframe arbitrario

  const allowed = mounted && preferences.externalMedia;

  if (allowed) {
    return (
      <iframe
        src={privacyUrl}
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <div className="externalMediaGate">
      <div className="externalMediaGate__icon" aria-hidden="true">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
        </svg>
      </div>
      <p className="externalMediaGate__text">
        Este contenido está alojado en YouTube.<br />
        Para reproducirlo debes permitir contenido externo.
      </p>
      <button
        type="button"
        className="externalMediaGate__btn"
        onClick={() => setExternalMedia(true)}
      >
        Permitir y reproducir
      </button>
    </div>
  );
}
