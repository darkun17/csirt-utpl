export const contactEmail = 'csirt@utpl.edu.ec';

export const navItems = [
  { label: 'Inicio',           href: '/' },
  { label: 'Alertas',          href: '/alertas' },
  { label: 'Aprende',          href: '/recursos' },
  { label: 'Servicios',        href: '/servicios' },
  { label: 'RFC 2350',         href: '/rfc2350' },
  { label: 'Vulnerabilidades', href: '/vulnerabilidades' },
  { label: 'Contacto',         href: '/contacto' },
];

export const editorialChannels = [
  { label: 'Alertas', href: '/alertas', description: 'Amenazas activas, vulnerabilidades y riesgos relevantes para la comunidad UTPL.' },
  { label: 'Tips', href: '/recursos#tips', description: 'Recomendaciones cortas para estudiantes, docentes y personal administrativo.' },
  { label: 'Manuales', href: '/recursos#manuales', description: 'Guias paso a paso para proteger cuentas, dispositivos y datos institucionales.' },
  { label: 'Novedades', href: '/alertas', description: 'Noticias de seguridad digital explicadas con enfoque educativo.' }
];

export const referenceVideos = [
  {
    title: 'Video recomendado de seguridad digital',
    source: 'YouTube',
    embedUrl: 'https://www.youtube.com/embed/yhLqXYskT24',
    watchUrl: 'https://www.youtube.com/watch?v=yhLqXYskT24',
    description: 'Material audiovisual de apoyo para reforzar buenas prácticas y cultura de seguridad en la comunidad universitaria.'
  }
];

export const visualGuides = [
  {
    title: 'Reporta a tiempo',
    text: 'Conserva evidencias: remitentes, capturas, fechas. Contacta al CSIRT desde el primer indicio.',
    image: 'https://picsum.photos/seed/incident-response-utpl/800/480'
  },
  {
    title: 'Contraseñas fuertes',
    text: 'Claves únicas por servicio, MFA activo y gestor de contraseñas para proteger cuentas.',
    image: 'https://picsum.photos/seed/password-protection/800/480'
  },
  {
    title: 'Aprendizaje continuo',
    text: 'Noticias, manuales y tips breves del CSIRT para mejorar tus decisiones digitales.',
    image: 'https://picsum.photos/seed/digital-security-learn/800/480'
  }
];

export const alerts = [
  {
    slug: 'ransomware-akira-america-latina',
    title: 'El ransomware Akira ataca América Latina',
    category: 'Alerta',
    severity: 'Crítico',
    date: '27 abril 2026',
    author: 'CSIRT UTPL',
    readTime: '5 min',
    image: 'https://picsum.photos/seed/akira-ransomware-2026/800/450',
    summary: 'Akira destaca por su crecimiento desde 2023 y ha puesto en alerta a organismos de ciberseguridad a nivel global.',
    deck: 'Una lectura para entender cómo opera Akira, por qué afecta a sectores como educación y qué controles reducen su impacto.',
    tags: ['UTPLCuidaTuInformacion', 'CiberSeguridadUTPL', 'Ransomware', 'Akira'],
    body: [
      'En 2026, el ransomware está siendo liderado por grupos como Qilin, The Gentlemen y Akira, que en conjunto ya suman cerca de 900 víctimas.',
      'Akira destaca especialmente por su crecimiento desde 2023, alcanzando casi 200 víctimas solo en el primer trimestre de 2026, lo que ha puesto en alerta a organismos de ciberseguridad a nivel global.',
      'Akira opera como ransomware-as-a-service: desarrolladores proveen infraestructura y afiliados ejecutan ataques contra organizaciones. Sus campañas suelen iniciar con accesos remotos mal protegidos, VPN sin MFA, vulnerabilidades sin parchear o credenciales robadas.',
      'Una vez dentro, los atacantes buscan persistencia, escalan privilegios, se mueven lateralmente y localizan información sensible. Antes del cifrado suelen exfiltrar datos para presionar a la víctima con doble extorsión.',
      'Para reducir el riesgo se recomienda mantener sistemas actualizados, activar autenticación multifactor, segmentar redes, filtrar accesos remotos, probar respaldos fuera de línea y reportar actividad sospechosa de forma temprana.'
    ],
    links: [
      { label: 'Reportar un incidente relacionado', href: '/reportar-incidente' },
      { label: 'Norma RFC2350 del CSIRT', href: '/rfc2350' }
    ],
    checklist: ['No apagar ni formatear el equipo sin indicación técnica.', 'Desconectar el equipo de la red si hay cifrado o actividad inusual.', 'Conservar capturas, correos, remitentes, enlaces y horarios.', `Reportar de inmediato a ${contactEmail}.`]
  },
  {
    slug: 'como-crear-contrasenas-seguras',
    title: '¿Cómo crear contraseñas seguras?',
    category: 'Manual',
    severity: 'Medio',
    date: '24 abril 2026',
    author: 'CSIRT UTPL',
    readTime: '4 min',
    image: 'https://picsum.photos/seed/password-security-guide/800/450',
    summary: 'La confidencialidad de los datos empieza con claves fuertes, únicas y bien gestionadas.',
    deck: 'Una guía práctica basada en el contenido actual del CSIRT para mejorar hábitos de autenticación.',
    tags: ['Contraseñas', 'MFA', 'Buenas practicas', 'Usuarios'],
    body: [
      'En la actualidad, la confidencialidad de los datos es uno de los objetivos principales de la seguridad en cómputo. Uno de los mecanismos para lograrla es el uso adecuado de contraseñas.',
      'Las contraseñas son claves que usamos para acceder a información privada almacenada en computadoras, correo electrónico, cuentas bancarias o servicios digitales. Por eso merece la pena invertir tiempo y esfuerzo para gestionarlas eficazmente.',
      'Una contraseña segura debe combinar, al menos, números, letras, mayúsculas, minúsculas y símbolos. También debe tener más de siete caracteres y evitar secuencias adyacentes del teclado como 123456, 1q2w3e o 123QWEasd.',
      'No debe contener información fácil de averiguar, como nombre de usuario, fechas de cumpleaños, nombres de familiares o palabras existentes en algún idioma. Los ataques de diccionario prueban palabras comunes y combinaciones predecibles.',
      'No uses la misma contraseña para diferentes cuentas, especialmente en servicios bancarios, institucionales o comerciales. Cambia las claves por defecto de dispositivos y evita almacenar contraseñas de servicios críticos en navegadores compartidos.'
    ],
    links: [
      { label: 'Ver biblioteca de recursos', href: '/recursos#manuales' },
      { label: 'Reportar cuenta comprometida', href: '/reportar-incidente' }
    ],
    checklist: ['Usa contraseñas únicas por servicio.', 'Activa autenticación multifactor cuando esté disponible.', 'No compartas claves ni códigos temporales.', 'Cambia contraseñas por defecto en dispositivos y servicios.']
  },
  {
    slug: 'estafa-filtracion-datos',
    title: 'Estafa por filtración de datos',
    category: 'Recomendación',
    severity: 'Alto',
    date: '20 abril 2026',
    author: 'CSIRT UTPL',
    readTime: '3 min',
    image: 'https://picsum.photos/seed/phishing-alert-utpl/800/450',
    summary: 'Las alertas falsas sobre filtraciones de datos buscan generar urgencia para robar credenciales o pagos.',
    deck: 'Los atacantes aprovechan noticias reales sobre brechas para enviar mensajes falsos y obtener datos sensibles.',
    tags: ['UTPLCuidaTuInformacion', 'CiberSeguridadUTPL', 'Phishing', 'Fraude'],
    body: [
      'Las filtraciones de datos se han vuelto cada vez más comunes, con millones de notificaciones enviadas a usuarios debido a brechas en distintas regiones.',
      'Este contexto es aprovechado por estafadores, quienes envían alertas falsas para engañar a las personas y hacer que actúen sin verificar.',
      'Aunque las brechas reales no deben ignorarse, es clave diferenciar entre notificaciones legítimas y fraudulentas antes de ingresar datos personales o credenciales.',
      'Si un mensaje exige actuar de inmediato, solicita pagos, pide claves o redirige a un sitio externo, detente y verifica por canales oficiales.'
    ],
    links: [
      { label: 'Reportar correo sospechoso', href: '/reportar-incidente' },
      { label: 'Guía contra phishing', href: '/recursos#phishing' }
    ],
    checklist: ['Revisar dominio del remitente.', 'No ingresar credenciales desde enlaces recibidos por correo.', 'Evitar pagos o transferencias bajo presión.', `Reenviar evidencias a ${contactEmail}.`]
  },
  {
    slug: 'fraude-recuperacion-dinero',
    title: 'Estafa en servicios para recuperar dinero',
    category: 'Noticia',
    severity: 'Medio',
    date: '13 abril 2026',
    author: 'CSIRT UTPL',
    readTime: '3 min',
    image: 'https://picsum.photos/seed/data-fraud-digital/800/450',
    summary: 'Los atacantes prometen recuperar fondos perdidos, pero buscan cometer un segundo fraude contra la víctima.',
    deck: 'Una advertencia sobre revictimización digital y promesas falsas de recuperación de fondos.',
    tags: ['UTPLCuidaTuInformacion', 'CiberSeguridadUTPL', 'Ingenieria social', 'Fraude'],
    body: [
      'Los estafadores buscan maximizar sus ganancias y no dudan en revictimizar a quienes ya han sufrido un fraude.',
      'Las llamadas estafas de recuperación de fondos prometen recuperar lo robado, pero en realidad buscan obtener nuevos pagos, datos sensibles o accesos.',
      'Este tipo de esquema abarca diversas tácticas, más allá de casos como criptomonedas, todas enfocadas en obtener un nuevo beneficio a costa de la víctima.',
      'Ningún servicio legítimo debe pedir claves, códigos de verificación, tokens o transferencias anticipadas para recuperar dinero.'
    ],
    links: [{ label: 'Recomendaciones de ingeniería social', href: '/recursos#tips' }],
    checklist: ['No pagar anticipos.', 'Verificar la entidad por canales oficiales.', 'Guardar capturas y conversaciones.', 'Reportar el caso para orientación.']
  },
  {
    slug: 'fuga-codigo-fuente-claude-code',
    title: 'Fuga de código fuente de Claude Code',
    category: 'Novedad',
    severity: 'Medio',
    date: '6 abril 2026',
    author: 'CSIRT UTPL',
    readTime: '3 min',
    image: 'https://picsum.photos/seed/code-leak-security/800/450',
    summary: 'Una filtración accidental por publicación en npm recuerda la importancia de revisar artefactos antes de liberarlos.',
    deck: 'Lecciones para equipos técnicos sobre revisión de paquetes, mapas fuente y exposición accidental.',
    tags: ['Desarrollo seguro', 'Codigo fuente', 'Cadena de suministro'],
    body: [
      'Anthropic confirmó una filtración accidental del código fuente de Claude Code causada por un error humano durante una actualización, no por un ataque.',
      'El problema ocurrió al publicar en npm un archivo de mapeo que permitió reconstruir cientos de miles de líneas de código original.',
      'El caso refuerza la necesidad de controles de publicación, revisión de artefactos y buenas prácticas de seguridad en pipelines de desarrollo.'
    ],
    links: [{ label: 'Buenas prácticas para equipos técnicos', href: '/recursos#proyectos' }],
    checklist: ['Revisar archivos incluidos antes de publicar paquetes.', 'Evitar secretos en repositorios o artefactos.', 'Mantener procesos de revisión de releases.', 'Reportar exposiciones accidentales.']
  },
  {
    slug: 'nuevo-ransomware-the-gentlemen',
    title: 'Nuevo ransomware que ataca a medida',
    category: 'Alerta',
    severity: 'Alto',
    date: '30 marzo 2026',
    author: 'CSIRT UTPL',
    readTime: '4 min',
    image: 'https://picsum.photos/seed/gentlemen-ransomware/800/450',
    summary: 'The Gentlemen opera bajo ransomware-as-a-service y utiliza doble extorsión para presionar a organizaciones.',
    deck: 'Una amenaza emergente que combina cifrado, exfiltración y presión reputacional.',
    tags: ['Ransomware', 'Doble extorsion', 'Prevencion'],
    body: [
      'The Gentlemen es un grupo emergente de ransomware-as-a-service surgido a mediados de 2025, con una imagen profesional y tácticas de ataque precisas.',
      'Su operación se basa en la doble extorsión: cifran sistemas y exfiltran datos confidenciales, amenazando con publicarlos si no se paga el rescate.',
      'La prevención debe combinar copias de seguridad, segmentación de red, MFA, monitoreo de accesos y reportes tempranos.'
    ],
    links: [{ label: 'Reportar comportamiento sospechoso', href: '/reportar-incidente' }],
    checklist: ['Actualizar sistemas expuestos.', 'Verificar respaldos recuperables.', 'Revisar accesos privilegiados.', 'Reportar alertas de cifrado o exfiltración.']
  }
];

export const learningTracks = [
  { title: 'Reconoce phishing', kicker: '5 minutos', text: 'Señales visuales, remitentes falsos, enlaces sospechosos y qué hacer antes de responder.', href: '/recursos#phishing' },
  { title: 'Protege tus contraseñas', kicker: 'Manual', text: 'Crea claves fuertes, activa MFA y evita reutilizar credenciales entre servicios.', href: '/alertas/como-crear-contrasenas-seguras' },
  { title: 'Cuida tus dispositivos', kicker: 'Tip práctico', text: 'Actualizaciones, bloqueo de pantalla, respaldos y uso responsable de redes.', href: '/recursos#tips' },
  { title: 'Reporta a tiempo', kicker: 'Canal CSIRT', text: `Qué evidencia enviar y cómo contactar al equipo en ${contactEmail}.`, href: '/reportar-incidente' }
];

export const services = [
  { title: 'Respuesta a incidentes', description: 'Recepción, clasificación, soporte y coordinación ante phishing, malware, accesos no autorizados, fuga de información y vulnerabilidades.' },
  { title: 'Boletines y alertas', description: 'Publicación de avisos preventivos, noticias y recomendaciones para que la comunidad UTPL actúe con información clara y oportuna.' },
  { title: 'Capacitación y cultura', description: 'Guías, manuales, campañas y materiales para fortalecer hábitos de protección de datos y uso seguro de servicios digitales.' },
  { title: 'Gestión y mejora de seguridad', description: 'Actividades proactivas, concientización, investigación aplicada y coordinación con áreas técnicas institucionales.' }
];

export const resources = [
  { title: 'Norma RFC2350', type: 'Documento formal', description: 'Identidad, comunidad atendida, servicios, políticas y procedimientos del CSIRT UTPL.', href: '/rfc2350' },
  { title: 'Guía contra phishing', type: 'Guía', description: 'Cómo identificar remitentes falsos, enlaces sospechosos y mensajes diseñados para robar credenciales.', href: '/recursos#phishing' },
  { title: 'Manual de contraseñas seguras', type: 'Manual', description: 'Buenas prácticas para claves, gestores, autenticación multifactor y recuperación de cuentas.', href: '/alertas/como-crear-contrasenas-seguras' },
  { title: 'Mailing de alertas', type: 'Suscripción', description: 'Canal informativo para recibir recomendaciones, boletines y alertas de seguridad institucional.', href: `mailto:${contactEmail}?subject=Solicitud%20de%20suscripcion%20a%20alertas%20CSIRT` },
  { title: 'Eventos internos y externos', type: 'Capacitación', description: 'Charlas, talleres y actividades de sensibilización sobre seguridad de la información.', href: '/recursos#eventos' },
  { title: 'Proyectos de seguridad', type: 'Investigación', description: 'Iniciativas técnicas y académicas que fortalecen la seguridad digital de la UTPL.', href: '/recursos#proyectos' }
];

export const reportTypes = [
  'Acceso no autorizado',
  'Fraude o suplantación',
  'Fuga o exposición de información',
  'Interrupción de servicio',
  'Malware o ransomware',
  'Pérdida o robo de equipo',
  'Phishing o correo sospechoso',
  'Sitio web comprometido',
  'Uso indebido de cuenta o sistema',
  'Vulnerabilidad reportada',
  'No estoy seguro',
  'Otro',
];

export const responseSteps = [
  { title: 'Detecta', text: 'Identifica señales de fraude, malware, fuga de datos, accesos no autorizados o comportamiento inusual.' },
  { title: 'Conserva', text: 'Guarda evidencias: remitentes, enlaces, capturas, fechas, archivos y mensajes relacionados.' },
  { title: 'Reporta', text: `Escribe a ${contactEmail} con una descripción clara del evento y los datos de contacto.` },
  { title: 'Coordina', text: 'Sigue las instrucciones del equipo para contener el incidente y evitar mayor impacto.' }
];

export const rfcSections = [
  ['Información del documento', 'Fecha de última actualización, ubicación del documento y control de autenticidad. La versión histórica indica actualización al 01 de marzo de 2011.'],
  ['Información de contacto', `Nombre del equipo: CSIRT-UTPL. Correo oficial: ${contactEmail}. Zona horaria UTC-GMT -5. Horario: lunes a viernes de 8:00 a 13:00 y de 15:30 a 18:30.`],
  ['Constitución', 'Punto único de contacto para atención, prevención y respuesta a incidentes de seguridad de la UTPL, con enfoque en investigación y protección institucional.'],
  ['Comunidad atendida', 'Funcionarios, estudiantes, servicios digitales, sistemas y redes de la Universidad Técnica Particular de Loja.'],
  ['Políticas', 'Confidencialidad, cooperación, interacción, divulgación de información, priorización y nivel de soporte según gravedad del incidente.'],
  ['Servicios', 'Triage, coordinación, resolución de incidentes, actividades proactivas, concientización, educación y capacitación a usuarios.']
];
