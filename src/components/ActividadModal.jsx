'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const AsistenciaNoHabilitadaModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="text-lg font-semibold">Asistencia no disponible</DialogTitle>
        <DialogDescription className="mt-2">
          No está habilitada la asistencia para esta actividad.
        </DialogDescription>
        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <Button variant="default">Entendido</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function ActividadModal({ 
  actividad, 
  open, 
  handleClose, 
  onAction, 
  type,
  loadingDetalles,
  onSuccess
}) {
  const [loadingAction, setLoadingAction] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [asistenciaNoHabilitadaOpen, setAsistenciaNoHabilitadaOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAction = async (actionType) => {
    setLoadingAction(true);
    try {
      if (actionType === 'asistencia' && !actividad.habilitarasistencia) {
        setAsistenciaNoHabilitadaOpen(true);
        setLoadingAction(false);
        return;
      }

      const result = await onAction(actionType);
      
      if (result) {
        handleClose();
        setSuccessModalOpen(true);
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error('Error en handleAction:', error);
      handleClose();
      setErrorMessage(error.respuesta || error.message || 'Ocurrió un error al procesar tu solicitud');
      setErrorModalOpen(true);
    } finally {
      setLoadingAction(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada';
    try {
      const date = new Date(dateString);
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      return date.toLocaleDateString('es-ES', options);
    } catch {
      return dateString;
    }
  };

  if (!actividad) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Error</DialogTitle>
          <DialogDescription>
            No se encontraron detalles de la actividad
          </DialogDescription>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogTitle className="text-2xl font-bold text-[#253A69]">
            {actividad.titulo}
          </DialogTitle>
          
          <DialogDescription className="space-y-2">
            <div className="grid grid-cols-4 gap-2">
              <span className="font-medium col-span-1">Fecha:</span>
              <span className="col-span-3">{formatDate(actividad.fecha)}</span>
              
              <span className="font-medium col-span-1">Horario:</span>
              <span className="col-span-3">{actividad.horario}</span>
              
              <span className="font-medium col-span-1">Ubicación:</span>
              <span className="col-span-3">{actividad.lugar}</span>
              
              <span className="font-medium col-span-1">Horas:</span>
              <span className="col-span-3">{actividad.horas}</span>
              
              {type === 'disponible' && (
                <>
                  <span className="font-medium col-span-1">Cupos:</span>
                  <span className="col-span-3">
                    {actividad.cuposdisponibles || 'No especificado'}
                  </span>
                </>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-medium text-lg text-[#253A69]">Descripción:</h3>
              <p className="mt-1 text-gray-700">{actividad.descripcion}</p>
            </div>
          </DialogDescription>

          <div className="mt-6 flex justify-end gap-2">
            {type === 'inscrita' ? (
              <>
                <Button 
                  onClick={() => handleAction('asistencia')}
                  disabled={loadingAction}
                  className="bg-[#253A69] hover:bg-[#3A56A0]"
                >
                  {loadingAction && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Marcar asistencia
                </Button>
                <Button 
                  onClick={() => handleAction('anular')}
                  disabled={loadingAction}
                  variant="destructive"
                >
                  {loadingAction && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Anular inscripción
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => handleAction('inscribir')}
                disabled={loadingAction || actividad?.cuposdisponibles <= 0}
                className="bg-[#253A69] hover:bg-[#3A56A0]"
              >
                {loadingAction && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {actividad?.cuposdisponibles <= 0 ? 'SIN CUPOS' : 'INSCRIBIRME'}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de éxito */}
      <Dialog open={successModalOpen} onOpenChange={() => setSuccessModalOpen(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Éxito</DialogTitle>
          <DialogDescription>
            Operación realizada correctamente
          </DialogDescription>
          <div className="mt-4 flex justify-end">
            <DialogClose asChild>
              <Button 
                onClick={() => {
                  setSuccessModalOpen(false);
                  if (onSuccess) onSuccess();
                }}
                variant="default"
              >
                Aceptar
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de error */}
      <Dialog open={errorModalOpen} onOpenChange={() => setErrorModalOpen(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Error</DialogTitle>
          <DialogDescription>
            {errorMessage}
          </DialogDescription>
          <div className="mt-4 flex justify-end">
            <DialogClose asChild>
              <Button variant="default">Aceptar</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      <AsistenciaNoHabilitadaModal
        isOpen={asistenciaNoHabilitadaOpen}
        onClose={() => setAsistenciaNoHabilitadaOpen(false)}
      />
    </>
  );
}