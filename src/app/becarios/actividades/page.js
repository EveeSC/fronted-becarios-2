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
import { Loader2 } from 'lucide-react';

export default function Actividades() {
  const [modalOpen, setModalOpen] = useState(false);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [modalType, setModalType] = useState('');

  const [actividadesInscritas, setActividadesInscritas] = useState([]);
  const [actividadesDisponibles, setActividadesDisponibles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingDetalles, setLoadingDetalles] = useState(false);

  const api = axios.create({
    baseURL: 'http://localhost:3031/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Agregar token a las solicitudes
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const cargarActividades = async () => {
    try {
      setLoading(true);
      const response = await api.get('/obtener_actividades_disponibles');
      setActividadesInscritas(response.data.actividadesInscritas || []);
      setActividadesDisponibles(response.data.actividadesDisponibles || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error al cargar actividades');
      console.error('Error al cargar actividades:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInscribirActividad = async (idActividad) => {
    try {
      const response = await api.post(`/inscribir_actividad/${idActividad}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const handleDesinscribirActividad = async (idActividad) => {
    try {
      const response = await api.post(`/desinscribir_actividad/${idActividad}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const handleMarcarAsistencia = async (actividad) => {
    try {
      if (!actividad.habilitarasistencia) {
        throw { respuesta: 'No está habilitada la asistencia para esta actividad' };
      }
      // Cambiado a GET según lo requerido
      const response = await api.get(`/marcar_asistencia/${actividad.idactividades}`);
      if (response.data && response.data.respuesta === 'Asistencia marcada') {
        return response.data;
      }
      throw new Error(response.data?.message || 'Error al marcar asistencia');
    } catch (error) {
      console.error('Error en handleMarcarAsistencia:', error);
      throw error.response?.data || error;
    }
  };

  const handleAction = async (actionType, actividad) => {
    try {
      let response;
      if (actionType === 'inscribir') {
        response = await handleInscribirActividad(actividad.idactividades);
      } else if (actionType === 'anular') {
        response = await handleDesinscribirActividad(actividad.idactividades);
      } else if (actionType === 'asistencia') {
        response = await handleMarcarAsistencia(actividad);
      }
      
      if (response) {
        await cargarActividades();
        return response;
      }
    } catch (error) {
      throw error;
    }
  };

  const handleOpenModal = (actividad, type) => {
    setModalType(type);
    setActividadSeleccionada({
      ...actividad,
      titulo: actividad.nombreactividad,
      horas: actividad.horasacreditadas,
      fecha: actividad.fechaactividad,
      horario: `${formatTime(actividad.horainicio)} a ${formatTime(actividad.horafinal)}`,
      lugar: actividad.lugar,
      descripcion: actividad.descripcionactividad || 'Descripción no disponible',
      cuposdisponibles: actividad.cuposdisponibles,
      habilitarasistencia: actividad.habilitarasistencia
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString.toString().substring(0, 5);
  };

  useEffect(() => {
    cargarActividades();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto py-8 px-4 flex-grow max-w-4xl">
        {/* Sección de Actividades Inscritas */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold mb-6 text-[#253A69]">Actividades Inscritas</h1>
          
          {actividadesInscritas.length > 0 ? (
            <div className="space-y-6">
              {actividadesInscritas.map((actividad) => (
                <Card key={`inscrita-${actividad.idactividades}`} className="w-full hover:shadow-md transition-shadow border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-[#253A69]">
                      {actividad.nombreactividad}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-1 text-left px-6">
                    <div className="flex">
                      <span className="font-medium text-gray-600 w-48">Horas acreditadas:</span>
                      <span className="text-gray-800">{actividad.horasacreditadas}</span>
                    </div>
                    
                    <div className="flex">
                      <span className="font-medium text-gray-600 w-48">Fecha:</span>
                      <span className="text-gray-800">{formatDate(actividad.fechaactividad)}</span>
                    </div>
                    
                    <div className="flex">
                      <span className="font-medium text-gray-600 w-48">Horario:</span>
                      <span className="text-gray-800">
                        {formatTime(actividad.horainicio)} a {formatTime(actividad.horafinal)}
                      </span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-end px-6 pb-4 pt-2">
                    <Button 
                      className="bg-[#253A69] hover:bg-[#3A56A0] text-white transition-colors"
                      onClick={() => handleOpenModal(actividad, 'inscrita')}
                    >
                      VER DETALLES
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No tienes actividades inscritas actualmente.</p>
          )}
        </div>

        {/* Sección de Actividades Disponibles */}
        <div>
          <h1 className="text-2xl font-bold mb-6 text-[#253A69]">Actividades Disponibles</h1>
          
          <div className="space-y-6">
            {actividadesDisponibles.length > 0 ? (
              actividadesDisponibles.map((actividad) => (
                <Card key={`disponible-${actividad.idactividades}`} className="w-full hover:shadow-md transition-shadow border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-[#253A69]">
                      {actividad.nombreactividad}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-1 text-left px-6">
                    <div className="flex">
                      <span className="font-medium text-gray-600 w-48">Horas acreditadas:</span>
                      <span className="text-gray-800">{actividad.horasacreditadas}</span>
                    </div>
                    
                    <div className="flex">
                      <span className="font-medium text-gray-600 w-48">Fecha:</span>
                      <span className="text-gray-800">{formatDate(actividad.fechaactividad)}</span>
                    </div>
                    
                    <div className="flex">
                      <span className="font-medium text-gray-600 w-48">Horario:</span>
                      <span className="text-gray-800">
                        {formatTime(actividad.horainicio)} a {formatTime(actividad.horafinal)}
                      </span>
                    </div>
                    
                    <div className="flex">
                      <span className="font-medium text-gray-600 w-48">Cupos disponibles:</span>
                      <span className="text-gray-800">
                        {actividad.cuposdisponibles || 'No especificado'}
                      </span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-end px-6 pb-4 pt-2">
                    <Button 
                      className="bg-[#253A69] hover:bg-[#3A56A0] text-white transition-colors"
                      onClick={() => handleOpenModal(actividad, 'disponible')}
                      disabled={actividad.cuposdisponibles <= 0}
                    >
                      {actividad.cuposdisponibles <= 0 ? 'SIN CUPOS' : 'VER DETALLES'}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p className="text-gray-500 italic">No hay actividades disponibles en este momento.</p>
            )}
          </div>
        </div>

        {/* Modal */}
        <ActividadModal 
          actividad={actividadSeleccionada} 
          open={modalOpen} 
          handleClose={handleCloseModal}
          onAction={(actionType) => handleAction(actionType, actividadSeleccionada)}
          type={modalType}
          loadingDetalles={loadingDetalles}
          onSuccess={cargarActividades}
        />
      </div>
    </div>
  );
}