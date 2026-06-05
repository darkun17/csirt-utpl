import { services } from '../data/content';

export default function Services() {
  return (
    <section className="section whiteSection" id="servicios">
      <div className="container">
        <div className="sectionHead compact">
          <div>
            <span className="eyebrow dark">Servicios CSIRT</span>
            <h2>Atención, soporte, prevención e investigación</h2>
          </div>
          <p>El CSIRT-UTPL articula respuesta a incidentes y acciones preventivas para proteger los sistemas, datos y servicios digitales de la universidad.</p>
        </div>
        <div className="serviceGrid">
          {services.map((service, index) => (
            <article className="serviceCard" key={service.title}>
              <div className="serviceIcon">{String(index + 1).padStart(2, '0')}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
