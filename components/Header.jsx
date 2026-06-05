'use client';
import { useState } from 'react';
import Link from 'next/link';
import { navItems } from '../data/content';
import { csirtConfig } from '../data/csirtConfig';

export default function Header({ active = 'Inicio' }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="siteHeader">
      <div className="topBar">
        <div className="container topBarInner">
          <span>Seguridad de la Información - UTPL</span>
          <a href={`mailto:${csirtConfig.email}`}>{csirtConfig.email}</a>
        </div>
      </div>

      <div className="container headerInner">
        <Link href="/" className="brand" aria-label="CSIRT UTPL">
          <span className="brandLogo">UTPL</span>
          <span className="brandText">
            <strong>CSIRT - Seguridad de la información</strong>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="desktopNav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={active === item.label ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/reportar-incidente" className="headerCta">
          Reportar incidente
        </Link>

        {/* Hamburger — tablet / mobile only */}
        <button
          className={`hamburger${isOpen ? ' hamburger--open' : ''}`}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {/* Mobile / tablet drawer */}
      <nav
        id="mobile-nav"
        className={`mobileDrawer${isOpen ? ' mobileDrawer--open' : ''}`}
        aria-label="Navegación móvil"
      >
        <div className="container mobileDrawerInner">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={active === item.label ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/reportar-incidente"
            className="mobileDrawerCta"
            onClick={() => setIsOpen(false)}
          >
            Reportar incidente
          </Link>
        </div>
      </nav>
    </header>
  );
}
