'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CookieConsentContext,
  COOKIE_PREFS_KEY,
  COOKIE_PREFS_VERSION,
  defaultPreferences,
} from './CookieConsentContext';
import CookiePreferencesDialog from './CookiePreferencesDialog';

/**
 * Lee y VALIDA campo por campo — nunca hace spread directo de lo que haya
 * en localStorage. Cualquier manipulación manual (JSON corrupto, objeto
 * incompleto, versión distinta, tipos incorrectos, `necessary:false`
 * inyectado a mano) degrada de forma segura a "sin decisión válida" o a
 * los valores por defecto, sin romper el render y sin que `necessary`
 * pueda terminar en `false` bajo ningún escenario.
 */
function readStoredPreferences() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_PREFS_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;

    // Versión distinta (categorías futuras) → "sin decisión", no se confía
    // en datos que ya no representan las opciones reales.
    if (parsed.version !== COOKIE_PREFS_VERSION) return null;

    // externalMedia: solo se acepta si es estrictamente boolean; cualquier
    // otro tipo ("yes", 1, null, objeto...) se descarta a `false`.
    const externalMedia = typeof parsed.externalMedia === 'boolean' ? parsed.externalMedia : false;

    const updatedAt = typeof parsed.updatedAt === 'string' ? parsed.updatedAt : null;

    // necessary SIEMPRE true, sin importar lo que diga parsed.necessary.
    return { version: COOKIE_PREFS_VERSION, necessary: true, externalMedia, updatedAt };
  } catch {
    return null;
  }
}

function writeStoredPreferences(prefs) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(COOKIE_PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // localStorage no disponible (navegación privada, cuota, etc.) — la sesión
    // sigue funcionando, solo no persiste entre visitas.
  }
}

/**
 * Única fuente de verdad del consentimiento de cookies/contenido externo.
 * SSR-safe: en el primer render (servidor y primer paint del cliente) no se
 * conoce todavía si hay preferencia guardada, así que no se decide nada ni
 * se muestra el modal — eso evita "Hydration failed" por leer localStorage
 * antes de montar. Tras montar, se lee la preferencia real y, si no existe,
 * se abre el modal automáticamente (primera visita).
 */
export default function CookieConsentProvider({ children }) {
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [hasDecision, setHasDecision] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = readStoredPreferences();
    if (stored) {
      setPreferences(stored);
      setHasDecision(true);
      setIsOpen(false);
    } else {
      setIsOpen(true); // primera visita: no hay preferencia válida guardada
    }
    setMounted(true);
  }, []);

  const persist = useCallback((next) => {
    const withMeta = {
      ...next,
      version: COOKIE_PREFS_VERSION,
      necessary: true,
      updatedAt: new Date().toISOString(),
    };
    setPreferences(withMeta);
    setHasDecision(true);
    writeStoredPreferences(withMeta);
  }, []);

  const openPreferences = useCallback(() => setIsOpen(true), []);
  const closePreferences = useCallback(() => setIsOpen(false), []);

  const acceptAll = useCallback(() => {
    persist({ necessary: true, externalMedia: true });
    setIsOpen(false);
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist({ necessary: true, externalMedia: false });
    setIsOpen(false);
  }, [persist]);

  const savePreferences = useCallback((partial) => {
    persist({ ...preferences, ...partial, necessary: true });
    setIsOpen(false);
  }, [persist, preferences]);

  /** Usado por ExternalMediaGate: habilita SOLO externalMedia, sin tocar
   *  ninguna categoría futura, y reproduce de inmediato (no hace falta
   *  reabrir el modal ni recargar). */
  const setExternalMedia = useCallback((value) => {
    persist({ ...preferences, externalMedia: value });
  }, [persist, preferences]);

  const value = useMemo(() => ({
    preferences,
    hasDecision,
    mounted,
    isOpen,
    openPreferences,
    closePreferences,
    acceptAll,
    rejectAll,
    savePreferences,
    setExternalMedia,
  }), [preferences, hasDecision, mounted, isOpen, openPreferences, closePreferences, acceptAll, rejectAll, savePreferences, setExternalMedia]);

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {mounted && isOpen && <CookiePreferencesDialog />}
    </CookieConsentContext.Provider>
  );
}
