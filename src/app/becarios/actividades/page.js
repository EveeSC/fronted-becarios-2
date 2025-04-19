'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
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

export default function ActividadesContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [modalType, setModalType] = useState('disponible');
  const [actividadesInscritas, setActividadesInscritas] = useState([]);
  const [actividadesDisponibles, setActividadesDisponibles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingDetalles, setLoadingDetalles] = useState(false);

  // Configuración de Axios para el backend en puerto 3001
  const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor para el token de autenticación
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Función para cargar todas las actividades
  const cargarActividades = async () => {
    try {
      setLoading(true);
      const response = await api.get('/obtener_actividades_disponibles');
      
      setActividadesInscritas(response.data.actividadesInscritas || []);
      setActividadesDisponibles(response.data.actividadesDisponibles || []);
      
    } catch (err) {
      setError(err.message || 'Error al cargar actividades');
      console.error('Error al cargar actividades:', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para inscribirse en una actividad
  const inscribirActividad = async (idActividad) => {
    try {
      await api.post(`/inscribir_actividad/${idActividad}`);
      await cargarActividades();
    } catch (error) {
      console.error('Error al inscribirse en la actividad:', error);
      throw error;
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarActividades();
  }, []);

  const handleOpenModal = async (actividad, type) => {
    try {
      setLoadingDetalles(true);
      
      // Intentar obtener detalles adicionales
      let descripcion = 'Descripción no disponible';
      try {
        const response = await api.get(`/detalle_actividad/${actividad.idactividad}`);
        if (response.data.respuesta && response.data.respuesta.length > 0) {
          descripcion = response.data.respuesta[0].descripcion || descripcion;
        }
      } catch (error) {
        console.log('No se encontraron detalles adicionales', error);
      }

      // Preparar datos para el modal
      setActividadSeleccionada({
        id: actividad.idactividad,
        titulo: actividad.nombreactividad || 'Actividad sin nombre',
        horas: actividad.horasacreditadas || 0,
        fecha: actividad.fechaactividad,
        horario: `${formatTime(actividad.horainicio)} a ${formatTime(actividad.horafinal)}`,
        lugar: actividad.lugar || 'Lugar no especificado',
        descripcion: descripcion
      });
      
      setModalType(type);
      setModalOpen(true);
    } catch (error) {
      console.error("Error al cargar detalles:", error);
    } finally {
      setLoadingDetalles(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAction = async () => {
    try {
      if (modalType === 'disponible' && actividadSeleccionada) {
        await inscribirActividad(actividadSeleccionada.id);
      }
      setSuccessModalOpen(true);
      handleCloseModal();
    } catch (error) {
      console.error("Error al realizar la acción:", error);
    }
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-HN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Función para formatear la hora
  const formatTime = (timeString) => {
    if (!timeString) return '';
    if (timeString.length === 5 && timeString.includes(':')) {
      return timeString;
    }
    return timeString.toString().substring(0, 5);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Cargando actividades...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
        <Button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-[#253A69] hover:bg-[#1E2E56] text-white"
        >
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto py-8 px-4 flex-grow">
        {/* Sección de Actividades Inscritas */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-8">Actividades Inscritas</h1>
          
          {actividadesInscritas.length > 0 ? (
            <div className="space-y-4">
              {actividadesInscritas.map((actividad) => (
                <Card key={`inscrita-${actividad.idactividad}`} className="w-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{actividad.nombreactividad}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-1 text-left">
                    <div className="flex">
                      <span className="font-medium text-[#8F8E8E] w-40">Horas acreditadas:</span>
                      <span className="text-[#8F8E8E]">{actividad.horasacreditadas}</span>
                    </div>
                    
                    <div className="flex">
                      <span className="font-medium text-[#8F8E8E] w-40">Fecha:</span>
                      <span className="text-[#8F8E8E]">{formatDate(actividad.fechaactividad)}</span>
                    </div>
                    
                    <div className="flex">
                      <span className="font-medium text-[#8F8E8E] w-40">Horario:</span>
                      <span className="text-[#8F8E8E]">
                        {formatTime(actividad.horainicio)} a {formatTime(actividad.horafinal)}
                      </span>
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
            {actividadesDisponibles.length > 0 ? (
              actividadesDisponibles.map((actividad) => (
                <Card key={`disponible-${actividad.idactividad}`} className="w-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{actividad.nombreactividad}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-1 text-left">
                    <div className="flex">
                      <span className="font-medium text-[#8F8E8E] w-40">Horas acreditadas:</span>
                      <span className="text-[#8F8E8E]">{actividad.horasacreditadas}</span>
                    </div>
                    
                    <div className="flex">
                      <span className="font-medium text-[#8F8E8E] w-40">Fecha:</span>
                      <span className="text-[#8F8E8E]">{formatDate(actividad.fechaactividad)}</span>
                    </div>
                    
                    <div className="flex">
                      <span className="font-medium text-[#8F8E8E] w-40">Horario:</span>
                      <span className="text-[#8F8E8E]">
                        {formatTime(actividad.horainicio)} a {formatTime(actividad.horafinal)}
                      </span>
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
              ))
            ) : (
              <p className="text-gray-500">No hay actividades disponibles en este momento.</p>
            )}
          </div>
        </div>

        {/* Modal */}
        <ActividadModal 
          actividad={actividadSeleccionada} 
          open={modalOpen} 
          handleClose={handleCloseModal}
          onAction={handleAction}
          isInscrita={modalType === 'inscrita'}
          loadingDetalles={loadingDetalles}
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