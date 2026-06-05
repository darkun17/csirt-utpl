# Mapeo Drupal 11 para CSIRT UTPL

## Arquitectura recomendada
Drupal 11 como CMS editorial y fuente de datos mediante JSON:API o GraphQL. Next.js consume el contenido y renderiza el frontend.

## Content types
1. Alerta / Noticia CSIRT
2. Recurso
3. Servicio CSIRT
4. Página RFC2350
5. Reporte de incidente mediante Webform o integración con mesa de ayuda

## Campos para Alerta / Noticia CSIRT
- Título
- Slug
- Resumen
- Imagen principal
- Categoría
- Nivel de alerta
- Fecha de publicación
- Autor / área
- Cuerpo enriquecido
- Video YouTube
- Enlaces de interés
- Checklist
- Archivos adjuntos
- Tags
- CTA personalizado
- Relacionados

## Paragraphs / componentes administrables
- Hero storytelling
- Bloque de alerta
- Video YouTube
- Enlaces de interés
- Checklist
- CTA de reporte
- Documentos descargables
- Bloque de recomendación
- Lista de recursos
- Noticias relacionadas
- FAQ
