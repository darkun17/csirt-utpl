import './globals.css';
import { Roboto, Montserrat } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'CSIRT UTPL | Seguridad de la Información',
  description: 'Portal institucional de noticias, recursos y reporte de incidentes de seguridad de la informacion del CSIRT UTPL.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${roboto.variable} ${montserrat.variable}`}>
        <a href="#main-content" className="skipLink">Saltar al contenido principal</a>
        {children}
      </body>
    </html>
  );
}
