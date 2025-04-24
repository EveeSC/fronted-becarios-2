// src/components/ui/ActivityModal.jsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ActivityModal({ actividad, open, onOpenChange }) {
  // Formatear la fecha
  const fechaFormateada = new Date(actividad.fechaactividad).toLocaleDateString('es-HN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Formatear el horario
  const horario = `${actividad.horainicio} a ${actividad.horafinal}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center mb-4">
            {actividad.nombreactividad}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Descripción:</h4>
            <p className="text-gray-600">{actividad.descripcionactividad}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Fecha:</h4>
              <p className="text-gray-600">{fechaFormateada}</p>
            </div>
            <div>
              <h4 className="font-medium">Horario:</h4>
              <p className="text-gray-600">{horario}</p>
            </div>
            <div>
              <h4 className="font-medium">Lugar:</h4>
              <p className="text-gray-600">{actividad.lugar}</p>
            </div>
            <div>
              <h4 className="font-medium">Horas acreditadas:</h4>
              <p className="text-gray-600">{actividad.horasacreditadas}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}