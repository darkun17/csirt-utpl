import './globals.css';
import { Roboto, Montserrat } from 'next/font/google';
import { isEditor } from '../lib/auth';
import EditBar from '../components/EditBar';

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

export default async function RootLayout({ children }) {
  const editor = await isEditor();

  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body className={`${roboto.variable} ${montserrat.variable}${editor ? ' edit-mode' : ''}`}>
        <a href="#main-content" className="skipLink">Saltar al contenido principal</a>
        {editor && <EditBar />}
        {editor && <div aria-hidden="true" style={{ height: 40 }} />}
        {children}
      </body>
    </html>
  );
}
