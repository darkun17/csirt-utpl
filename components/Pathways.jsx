import { responseSteps } from '../data/content';

export default function Pathways() {
  return (
    <section className="pathways">
      <div className="container pathwaysGrid">
        <div>
          <span className="eyebrow dark">Ruta de atención</span>
          <h2>Qué hacer ante un incidente</h2>
          <p>Una guía breve para que estudiantes, docentes y personal administrativo sepan cómo actuar sin perder evidencia ni aumentar el riesgo.</p>
        </div>
        <div className="pathwayCards">
          {responseSteps.map((item, index) => (
            <article className="pathwayCard" key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
