/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // Backend Drupal local (desarrollo/pruebas)
      { protocol: 'http',  hostname: 'localhost', port: '8086', pathname: '/**' },
      // Backend Drupal en producción (Azure, acceso VPN)
      { protocol: 'https', hostname: 'admin-csirt.utpl.edu.ec', pathname: '/**' },
      // Dominio institucional UTPL
      { protocol: 'https', hostname: '*.utpl.edu.ec', pathname: '/**' },
      // Imágenes placeholder usadas como fallback
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },
};
module.exports = nextConfig;
