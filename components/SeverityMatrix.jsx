const severityLevels = [
  {
    label: 'Crítica',
    color: '#d32f2f',
    description: 'Afecta servicios esenciales, múltiples usuarios o información sensible',
    example: 'Ransomware activo en sistemas institucionales',
    response: '1–2 horas hábiles',
  },
  {
    label: 'Alta',
    color: '#e65100',
    description: 'Compromete cuentas, sistemas o información relevante',
    example: 'Cuenta institucional comprometida con actividad sospechosa',
    response: 'Hasta 4 horas hábiles',
  },
  {
    label: 'Media',
    color: '#f2a900',
    description: 'Impacto limitado o controlado',
    example: 'Equipo individual con posible malware',
    response: '1 día hábil',
  },
  {
    label: 'Baja',
    color: '#004270',
    description: 'Evento sospechoso sin impacto confirmado',
    example: 'Correo sospechoso no abierto',
    response: '2–3 días hábiles',
  },
  {
    label: 'Informativa',
    color: '#5d6675',
    description: 'Consulta, orientación o prevención',
    example: 'Duda sobre buenas prácticas',
    response: 'Según disponibilidad',
  },
];

export default function SeverityMatrix() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="severityTable">
        <thead>
          <tr>
            <th>Severidad</th>
            <th>Descripción</th>
            <th>Ejemplo</th>
            <th>Respuesta objetivo</th>
          </tr>
        </thead>
        <tbody>
          {severityLevels.map((level) => (
            <tr key={level.label}>
              <td>
                <span
                  className="severityBadge"
                  style={{ backgroundColor: level.color }}
                >
                  {level.label}
                </span>
              </td>
              <td>{level.description}</td>
              <td>{level.example}</td>
              <td>{level.response}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{
        fontSize: '10.2pt',
        color: 'var(--color-text-muted)',
        marginTop: '10px',
        fontStyle: 'italic',
      }}>
        Los tiempos son objetivos de referencia y pueden variar según disponibilidad
        operativa, complejidad del caso, volumen de reportes y criticidad institucional.
      </p>
    </div>
  );
}
