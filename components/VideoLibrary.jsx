import { getReferenceVideos } from '../lib/drupal';
import EditButton from './EditButton';

export default async function VideoLibrary({ editor = false, block = null }) {
  const videos = await getReferenceVideos();

  if (!videos.length) {
    if (!editor) return null;
    return (
      <section className="section videoSection" style={{ position: 'relative', minHeight: 80 }}>
      </section>
    );
  }

  return (
    <section className="section videoSection" style={{ position: 'relative' }}>
      {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Videos — texto" />}
      {editor && <EditButton href="/admin/content/block?type=bloque_pagina" label="Videos — gestionar" pos="tl" />}
      <div className="container">
        <div className="sectionHead compact">
          <div>
            <span className="eyebrow dark">{block?.kicker || 'Videos de apoyo'}</span>
            <h2>{block?.titulo || 'Aprendizaje visual para reforzar buenas prácticas'}</h2>
          </div>
          {block?.cuerpo
            ? <div dangerouslySetInnerHTML={{ __html: block.cuerpo }} />
            : <p>Recursos audiovisuales seleccionados para complementar noticias, manuales y campañas de concientización.</p>
          }
        </div>
        <div className="videoGrid">
          {videos.map((video) => (
            <article className="videoCard" key={video.embedUrl ?? video.title}>
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
                {video.watchUrl && (
                  <a href={video.watchUrl} target="_blank" rel="noreferrer">Abrir en YouTube</a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
