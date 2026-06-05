import Link from 'next/link';
import { navItems } from '../data/content';
import { csirtConfig } from '../data/csirtConfig';

export default function Header({ active = 'Inicio' }) {
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
          <span className="brandText"><strong>CSIRT - Seguridad de la información</strong></span>
        </Link>

        {/* Desktop nav — all items visible */}
        <nav className="desktopNav" aria-label="Navegacion principal">
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

        <Link href="/reportar-incidente" className="headerCta">Reportar incidente</Link>
      </div>

      {/* Mobile nav — scroll horizontal with all items */}
      <nav className="mobileNav" aria-label="Navegacion movil">
        <div className="container mobileNavScroller">
          {navItems.map((item) => (
            <Link href={item.href} key={item.label}>{item.label}</Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
