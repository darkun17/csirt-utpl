'use client';
import { useState } from 'react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      window.location.href = '/';
    } else {
      setError('Contraseña incorrecta');
      setLoading(false);
    }
  }

  return (
    <main className="adminLoginPage">
      <form onSubmit={handleSubmit} className="adminLoginForm">
        <div className="adminLoginLogo">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <h1 className="adminLoginTitle">Modo edición</h1>
        <p className="adminLoginSub">Ingresa la contraseña para activar la edición del sitio.</p>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Contraseña de administración"
          required
          autoFocus
          className="adminLoginInput"
        />
        {error && <p className="adminLoginError">{error}</p>}
        <button type="submit" disabled={loading} className="btnPrimary adminLoginBtn">
          {loading ? 'Verificando…' : 'Activar modo edición'}
        </button>
        <a href="/" className="adminLoginBack">← Volver al sitio</a>
      </form>
    </main>
  );
}
