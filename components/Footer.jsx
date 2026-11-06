import Image from 'next/image';

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
    <footer className="becas-footer" role="contentinfo">
      <div className="wrapper-footer">
        <Image
          src="/logo-utpl.png"
          alt="UTPL La Universidad Católica de Loja"
          width={240}
          height={87}
          className="logo"
          priority={false}
        />

        <p>
          <b>Conecta con nosotros: </b> 1800 88 75 88 - (07) 370 1444 - informacion@utpl.edu.ec
        </p>

        <div className="wrapper-social layout8">
          {socials.map(({ label, href, src }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Image src={src} alt="" width={34} height={34} />
            </a>
          ))}
        </div>

        <div className="wrapper-footerbottom">
          <div className="layout8">
            <a href="https://www.utpl.edu.ec/privacidad" target="_blank" rel="noreferrer">Política de privacidad</a>
            <p> - </p>
            <a href="https://www.utpl.edu.ec/terminos" target="_blank" rel="noreferrer">Términos y condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
