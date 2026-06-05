'use client';
import { useState } from 'react';
import { contactEmail, reportTypes } from '../data/content';

const URGENCY = ['Alto', 'Medio', 'Bajo'];
const ACTIVE = ['Sí', 'No', 'No estoy seguro'];
const AFFECTED_COUNT = ['1 a 3', '3 a 6', '6 a 10', 'Más de 10', 'No estoy seguro'];

const INITIAL = {
  nombre: '', email: '', telefono: '', organizacion: '',
  tipo: '', fecha: '', hora: '',
  activo: '', urgencia: '', afectados: '',
  descripcion: '', privacidad: false,
};

export default function ReportForm() {
  const [form, setForm] = useState(INITIAL);
  const [sent, setSent] = useState(false);

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const lines = [
      `Nombre: ${form.nombre}`,
      `E-mail: ${form.email}`,
      form.telefono && `Teléfono: ${form.telefono}`,
      form.organizacion && `Organización afectada: ${form.organizacion}`,
      `Tipo de incidente: ${form.tipo}`,
      form.fecha && `Fecha del incidente: ${form.fecha}`,
      form.hora && `Hora aproximada: ${form.hora}`,
      form.activo && `¿Incidente activo?: ${form.activo}`,
      form.urgencia && `Urgencia percibida: ${form.urgencia}`,
      form.afectados && `Sistemas/cuentas afectados: ${form.afectados}`,
      '',
      '¿Qué ocurrió?',
      form.descripcion,
    ].filter(Boolean).join('\n');

    const subject = encodeURIComponent(`[CSIRT UTPL] Reporte: ${form.tipo || 'Incidente de seguridad'}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${encodeURIComponent(lines)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="emergencyBox" style={{ background: '#EEF6FC', borderColor: 'var(--blue)', marginTop: 24 }}>
        <strong>Correo preparado</strong>
        <p>Se abrió tu cliente de correo con el reporte. Si no se abrió, escribe directamente a <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="reportFormFields" noValidate>

      <div className="formRow">
        <div className="formField">
          <label htmlFor="rf-nombre">Nombre<span className="formRequired">*</span></label>
          <input id="rf-nombre" name="nombre" type="text" value={form.nombre} onChange={handle} required maxLength={80} placeholder="Tu nombre completo" />
        </div>
        <div className="formField">
          <label htmlFor="rf-email">E-mail<span className="formRequired">*</span></label>
          <input id="rf-email" name="email" type="email" value={form.email} onChange={handle} required maxLength={150} placeholder="correo@ejemplo.com" />
        </div>
      </div>

      <div className="formRow">
        <div className="formField">
          <label htmlFor="rf-telefono">Teléfono</label>
          <input id="rf-telefono" name="telefono" type="tel" value={form.telefono} onChange={handle} maxLength={15} placeholder="+593 99 000 0000" />
        </div>
        <div className="formField">
          <label htmlFor="rf-org">Organización afectada</label>
          <input id="rf-org" name="organizacion" type="text" value={form.organizacion} onChange={handle} maxLength={120} placeholder="Nombre de la institución o área" />
        </div>
      </div>

      <div className="formField">
        <label htmlFor="rf-tipo">Tipo de incidente<span className="formRequired">*</span></label>
        <select id="rf-tipo" name="tipo" value={form.tipo} onChange={handle} required>
          <option value="">— Selecciona un tipo —</option>
          {reportTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="formRow">
        <div className="formField">
          <label htmlFor="rf-fecha">Fecha del incidente</label>
          <input id="rf-fecha" name="fecha" type="date" value={form.fecha} onChange={handle} />
        </div>
        <div className="formField">
          <label htmlFor="rf-hora">Hora aproximada</label>
          <input id="rf-hora" name="hora" type="time" value={form.hora} onChange={handle} />
        </div>
      </div>

      <div className="formRow">
        <div className="formField">
          <label htmlFor="rf-activo">¿El incidente sigue activo?</label>
          <select id="rf-activo" name="activo" value={form.activo} onChange={handle}>
            <option value="">— Selecciona —</option>
            {ACTIVE.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="formField">
          <label htmlFor="rf-urgencia">Urgencia percibida</label>
          <select id="rf-urgencia" name="urgencia" value={form.urgencia} onChange={handle}>
            <option value="">— Selecciona —</option>
            {URGENCY.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <div className="formField">
        <label htmlFor="rf-afectados">Sistemas, cuentas o activos afectados</label>
        <select id="rf-afectados" name="afectados" value={form.afectados} onChange={handle}>
          <option value="">— Cantidad aproximada —</option>
          {AFFECTED_COUNT.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div className="formField">
        <label htmlFor="rf-desc">¿Qué ocurrió?<span className="formRequired">*</span></label>
        <textarea id="rf-desc" name="descripcion" value={form.descripcion} onChange={handle} required maxLength={1500} rows={5} placeholder="Describe con el mayor detalle posible: qué pasó, qué sistemas están involucrados, qué evidencia tienes..." />
      </div>

      <label className="formPrivacy">
        <input type="checkbox" name="privacidad" checked={form.privacidad} onChange={handle} required />
        <span>He leído, comprendo y acepto la <a href="https://www.utpl.edu.ec/privacidad" target="_blank" rel="noreferrer">política de privacidad</a>.</span>
      </label>

      <button type="submit" className="formSubmit">Enviar reporte</button>

    </form>
  );
}
