import { referenceVideos } from '../data/content';

export default function VideoLibrary() {
  return (
    <section className="section videoSection">
      <div className="container">
        <div className="sectionHead compact">
          <div>
            <span className="eyebrow dark">Videos de apoyo</span>
            <h2>Aprendizaje visual para reforzar buenas prácticas</h2>
          </div>
          <p>Recursos audiovisuales seleccionados para complementar noticias, manuales y campañas de concientización.</p>
        </div>
        <div className="videoGrid">
          {referenceVideos.map((video) => (
            <article className="videoCard" key={video.embedUrl}>
              <div className="videoEmbed">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="videoBody">
                <span>{video.source}</span>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <a href={video.watchUrl} target="_blank" rel="noreferrer">Abrir en YouTube</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
