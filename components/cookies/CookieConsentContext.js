'use client';

import { createContext, useContext } from 'react';

/**
 * Forma del objeto de preferencias persistido en localStorage.
 * `version` permite invalidar/migrar preferencias si en el futuro cambian
 * las categorías, sin borrar silenciosamente lo que el usuario ya eligió.
 */
export const COOKIE_PREFS_VERSION = 1;
export const COOKIE_PREFS_KEY = 'utpl_csirt_cookie_preferences';

export const defaultPreferences = {
  version: COOKIE_PREFS_VERSION,
  necessary: true,
  externalMedia: false,
  updatedAt: null,
};

export const CookieConsentContext = createContext(null);

/** Hook de consumo. Lanza si se usa fuera del provider (fail-fast en desarrollo). */
export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error('useCookieConsent debe usarse dentro de <CookieConsentProvider>');
  }
  return ctx;
}
