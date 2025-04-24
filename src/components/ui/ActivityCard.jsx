// src/components/ui/ActivityCard.jsx
"use client";

import Link from "next/link";

export default function ActivityCard({ actividad }) {
  // Formatear la fecha para mostrarla mejor
  const fechaFormateada = new Date(actividad.fechaactividad).toLocaleDateString('es-HN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Formatear el horario
  const horario = `${actividad.horainicio} a ${actividad.horafinal}`;

  return (
    <div className="border border-gray-200 rounded-md p-4 flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex-1">
        <h3 className="font-medium text-lg">{actividad.nombreactividad}</h3>
        <div className="text-sm text-gray-600 mt-1">
          <p>Horas acreditadas: {actividad.horasacreditadas}</p>
          <p>Fecha: {fechaFormateada}</p>
          <p>Horario: {horario}</p>
          <p>Lugar: {actividad.lugar}</p>
        </div>
      </div>
      <div className="mt-4 md:mt-0">
        <Link
          href={`/becarios/actividades/${actividad.idactividades}`}
          className="inline-block px-4 py-2 bg-[#1e3a8a] text-white text-sm font-medium rounded hover:bg-blue-800 transition-colors"
        >
          VER DETALLES
        </Link>
      </div>
    </div>
  );
}