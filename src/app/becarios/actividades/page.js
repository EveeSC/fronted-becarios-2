'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ActividadModal from '@/components/ActividadModal';
import { SuccessModal } from '@/components/SuccessModal';
import Footer from '@/components/Footer';

const actividadesInscritas = [
  {
    id: 1,
    titulo: "Cinema Calle Real: Arte y reflexión en pantalla grande",
    horas: 5,
    fecha: "Lunes 20 de enero 2025",
    horario: "1:00 PM a 3:30 PM",
    lugar: "Auditorio del CAC-UNAH",
    descripcion: "En el marco de la conmemoración del Día de la Mujer Hondureña, te invitamos a disfrutar de 'La sonrisa de Mona Lisa'. Un largometraje sobre el coraje y los sacrificios que requiere el progreso, en una sociedad donde la mujer y el arte contemporáneo enfrentan las restricciones impuestas por los valores conservadores de las élites académicas y económicas."
  },
  {
    id: 2,
    titulo: "Club de lectura",
    horas: 15,
    fecha: "Lunes 19 de enero 2025",
    horario: "1:00 PM a 3:00 PM",
    lugar: "Biblioteca Central",
    descripcion: "Reunión semanal para discutir obras literarias contemporáneas con enfoque en autores centroamericanos."
  }
];

const actividadesDisponibles = [
  {
    id: 3,
    titulo: "Cine hondureño",
    horas: 5,
    fecha: "Lunes 18 de enero 2025",
    horario: "1:00 PM a 3:00 PM",
    lugar: "Auditorio Principal",
    descripcion: "Proyección de películas hondureñas contemporáneas con debate posterior."
  },
  {
    id: 4,
    titulo: "Taller de escritura creativa",
    horas: 10,
    fecha: "Miércoles 22 de enero 2025",
    horario: "2:00 PM a 4:00 PM",
    lugar: "Aula 302",
    descripcion: "Taller práctico para desarrollar habilidades de escritura creativa con énfasis en narrativa corta."
  }
];

export default function ActividadesContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [modalType, setModalType] = useState('disponible');

  const handleOpenModal = (actividad, type) => {
    setActividadSeleccionada(actividad);
    setModalType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAction = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessModalOpen(true);
      handleCloseModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto py-8 px-4 flex-grow">
        {/* Sección de Actividades Inscritas */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-8">Actividades Inscritas</h1>
          
          {actividadesInscritas.length > 0 ? (
            <div className="space-y-4">
              {actividadesInscritas.map((actividad) => (
                <Card key={`inscrita-${actividad.id}`} className="w-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{actividad.titulo}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-1 text-left">
                    <div className="flex">
                      <span className="font-medium text-[#8F8E8E] w-40">Horas acreditadas:</span>
                      <span className="text-[#8F8E8E]">{actividad.horas}</span>
                    </div>
                    
                    <div className="flex">
                      <span className="font-medium text-[#8F8E8E] w-40">Fecha:</span>
                      <span className="text-[#8F8E8E]">{actividad.fecha}</span>
                    </div>
                    
                    <div className="flex">
                      <span className="font-medium text-[#8F8E8E] w-40">Horario:</span>
                      <span className="text-[#8F8E8E]">{actividad.horario}</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-end pt-3">
                    <Button 
                      variant="default"
                      className="bg-[#253A69] hover:bg-[#1E2E56] text-white"
                      onClick={() => handleOpenModal(actividad, 'inscrita')}
                    >
                      Ver detalles
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No tienes actividades inscritas actualmente.</p>
          )}
        </div>

        {/* Sección de Actividades Disponibles */}
        <div>
          <h1 className="text-3xl font-bold mb-8">Actividades Disponibles</h1>
          
          <div className="space-y-4">
            {actividadesDisponibles.map((actividad) => (
              <Card key={`disponible-${actividad.id}`} className="w-full hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{actividad.titulo}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-1 text-left">
                  <div className="flex">
                    <span className="font-medium text-[#8F8E8E] w-40">Horas acreditadas:</span>
                    <span className="text-[#8F8E8E]">{actividad.horas}</span>
                  </div>
                  
                  <div className="flex">
                    <span className="font-medium text-[#8F8E8E] w-40">Fecha:</span>
                    <span className="text-[#8F8E8E]">{actividad.fecha}</span>
                  </div>
                  
                  <div className="flex">
                    <span className="font-medium text-[#8F8E8E] w-40">Horario:</span>
                    <span className="text-[#8F8E8E]">{actividad.horario}</span>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-end pt-3">
                  <Button 
                    variant="default"
                    className="bg-[#253A69] hover:bg-[#1E2E56] text-white"
                    onClick={() => handleOpenModal(actividad, 'disponible')}
                  >
                    Ver detalles
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Modal */}
        <ActividadModal 
          actividad={actividadSeleccionada} 
          open={modalOpen} 
          handleClose={handleCloseModal}
          onAction={handleAction}
          isInscrita={modalType === 'inscrita'}
        />

        {/* Modal de éxito */}
        <SuccessModal 
          isOpen={successModalOpen} 
          onClose={() => setSuccessModalOpen(false)} 
          isInscrita={modalType === 'inscrita'}
        />
      </div>
      
      <Footer />
    </div>
  );
}