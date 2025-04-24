// src/components/ui/ActivityDialog.jsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

export function ActivityDialog({ actividad, type, open, onOpenChange }) {
  const messages = {
    attendance: {
      title: "Asistencia registrada correctamente",
      content: `Tu asistencia a la actividad "${actividad?.nombreactividad}" ha sido registrada exitosamente.`
    },
    cancel: {
      title: "Inscripción anulada",
      content: `Tu inscripción a la actividad "${actividad?.nombreactividad}" ha sido anulada.`
    },
    register: {
      title: "Actividad inscrita exitosamente",
      content: `Te has inscrito correctamente a la actividad "${actividad?.nombreactividad}".`
    },
    details: {
      title: "Detalles de la actividad",
      content: actividad?.descripcionactividad || "No hay descripción disponible."
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-center mb-4">
            {messages[type]?.title || 'Detalles'}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center py-6">
          {type !== 'details' && (
            <div className="mb-4 flex justify-center">
              <Image
                src="/check-icon.png"
                alt="Verificación"
                width={120}
                height={120}
              />
            </div>
          )}
          <p className="text-center">{messages[type]?.content}</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 bg-[#1e3a8a] text-white rounded hover:bg-blue-800 transition-colors"
          >
            Aceptar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}