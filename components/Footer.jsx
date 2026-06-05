import Image from 'next/image';

const csirtSocials = [
  {
    label: 'Facebook CSIRT UTPL',
    href: 'https://www.facebook.com/CsirtUtpl',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M24 4C13 4 4 13 4 24c0 9.9 7.3 18.1 16.8 19.7V30h-5v-6h5v-4.5c0-5 3-7.8 7.5-7.8 2.2 0 4.5.4 4.5.4V17h-2.5c-2.5 0-3.3 1.5-3.3 3.1V24h5.5l-.9 6h-4.6v13.7C36.7 42.1 44 33.9 44 24c0-11-9-20-20-20z"/>
      </svg>
    ),
  },
  {
    label: 'X (Twitter) CSIRT UTPL',
    href: 'https://x.com/csirtutpl',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M36.5 6h6.6L28.4 21.5 45.5 42h-13.7l-9.4-12.4L11.5 42H4.9l15.7-17L4 6h14L27 17.3 36.5 6zM34.2 38.1h3.7L14 9.8H10l24.2 28.3z"/>
      </svg>
    ),
  },
];

const socials = [
  { label: 'Asesor',    href: 'https://www.utpl.edu.ec/asesor',                                          src: '/icons/social/asesor.svg'    },
  { label: 'WhatsApp',  href: 'https://wa.me/5931800887588',                                             src: '/icons/social/whatsapp.svg'  },
  { label: 'Facebook',  href: 'https://www.facebook.com/utpl',                                           src: '/icons/social/facebook.svg'  },
  { label: 'Instagram', href: 'https://www.instagram.com/utpl',                                          src: '/icons/social/instagram.svg' },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@utpl',                                            src: '/icons/social/tiktok.svg'    },
  { label: 'X',         href: 'https://x.com/utpl',                                                      src: '/icons/social/x.svg'         },
  { label: 'Flickr',    href: 'https://www.flickr.com/photos/utpl',                                      src: '/icons/social/flickr.svg'    },
  { label: 'YouTube',   href: 'https://www.youtube.com/@UTPL',                                           src: '/icons/social/youtube.svg'   },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/school/universidad-tecnica-particular-de-loja/', src: '/icons/social/linkedin.svg'  },
];

export default function Footer() {
  return (
    <>
    <div className="csirtSocialBand">
      <div className="container csirtSocialInner">
        <span className="csirtSocialLabel">Redes sociales del CSIRT</span>
        <div className="csirtSocialIcons">
          {csirtSocials.map(({ label, href, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="csirtSocialBtn">
              {icon}
            </a>
          ))}
        </div>
      </div>
    </div>
    <footer className="utpl-footer">
      <div className="footer-main">
        <div className="container footer-main-inner">

          <Image
            src="/logo-utpl.png"
            alt="UTPL La Universidad Católica de Loja"
            width={240}
            height={87}
            className="footer-brand"
            priority={false}
          />

          <p className="footer-contact">
            <strong>Conecta con nosotros:</strong>
            <span>1800 88 75 88 - (07) 370 1444 - informacion@utpl.edu.ec</span>
          </p>

          <div className="footer-social-row">
            {socials.map(({ label, href, src }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Image src={src} alt="" width={34} height={34} />
              </a>
            ))}
          </div>

        </div>
      </div>

      <div className="footer-legal">
        <div className="container footer-legal-inner">
          <a href="https://www.utpl.edu.ec/privacidad" target="_blank" rel="noreferrer">Política de privacidad</a>
          <span aria-hidden="true">-</span>
          <a href="https://www.utpl.edu.ec/terminos" target="_blank" rel="noreferrer">Términos y condiciones</a>
        </div>
      </div>
    </footer>
    </>
  );
}
