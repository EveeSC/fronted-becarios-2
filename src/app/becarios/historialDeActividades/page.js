'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import YearFilter from '@/components/ui/YearFilter';
import MonthFilter from '@/components/ui/MonthFilter';

export default function HistorialDeActividades() {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState('');
  const [horasRealizadas, setHorasRealizadas] = useState(0);
  const [mora, setMora] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [actividadesData, setActividadesData] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: 'http://localhost:3031/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const cargarHistorial = async (yearFilter = '', monthFilter = '') => {
    try {
      setLoading(true);
      const response = await api.get('/historial_actividades');
      
      // Procesar datos del historial
      const historial = response.data.respuesta.historialActividades || [];
      
      // Ordenar por fecha más reciente primero
      const historialOrdenado = [...historial].sort((a, b) => {
        return new Date(b.fechaactividad) - new Date(a.fechaactividad);
      });
      
      // Filtrar por año y mes si se especifican
      let historialFiltrado = historialOrdenado;
      
      if (yearFilter) {
        historialFiltrado = historialFiltrado.filter(actividad => {
          const fecha = new Date(actividad.fechaactividad);
          return fecha.getFullYear().toString() === yearFilter;
        });
      }
      
      if (monthFilter) {
        historialFiltrado = historialFiltrado.filter(actividad => {
          const fecha = new Date(actividad.fechaactividad);
          return (fecha.getMonth() + 1).toString() === monthFilter;
        });
      }
      
      // Calcular horas realizadas para los filtros aplicados
      let totalHorasFiltradas = 0;
      historialFiltrado.forEach(actividad => {
        if (actividad.asistencia) {
          totalHorasFiltradas += actividad.horasacreditadas;
        }
      });
      
      // Calcular mora (20 - horas realizadas, mínimo 0)
      const moraCalculada = Math.max(0, 20 - totalHorasFiltradas);
      
      // Obtener años disponibles para el filtro
      const years = [...new Set(historial.map(actividad => {
        const fecha = new Date(actividad.fechaactividad);
        return fecha.getFullYear().toString();
      }))].sort((a, b) => b - a);
      
      setActividadesData(historialFiltrado);
      setHorasRealizadas(totalHorasFiltradas);
      setMora(moraCalculada);
      setAvailableYears(years);
      
      // Si no hay año seleccionado, establecer el año más reciente
      if (!yearFilter && years.length > 0) {
        setYear(years[0]);
      }
    } catch (err) {
      console.error('Error al cargar historial:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    cargarHistorial(year, month);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  useEffect(() => {
    cargarHistorial();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando historial...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-left">Historial de Actividades</h1>

        <div className="flex flex-wrap items-end gap-4 mb-6">
          <div className="flex-1">
            <YearFilter 
              year={year} 
              setYear={setYear} 
              availableYears={availableYears} 
            />
          </div>
          <div className="flex-1">
            <MonthFilter month={month} setMonth={setMonth} />
          </div>
          <div className="flex-1">
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors w-full"
            >
              Buscar
            </button>
          </div>
          <div className="flex-1 flex flex-col">
            <span className="font-medium">Horas realizadas: {horasRealizadas}</span>
            <span className="font-medium text-amber-600">Mora: {mora} horas</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="border rounded-md overflow-hidden max-w-4xl w-full">
          <div className="w-full">
            <div className="grid grid-cols-4 bg-gray-200 border-b">
              <div className="px-6 py-3 text-center">
                <span className="font-medium text-gray-800 uppercase tracking-wider text-sm">NOMBRE</span>
              </div>
              <div className="px-6 py-3 text-center">
                <span className="font-medium text-gray-800 uppercase tracking-wider text-sm">HORAS</span>
              </div>
              <div className="px-6 py-3 text-center">
                <span className="font-medium text-gray-800 uppercase tracking-wider text-sm">FECHA</span>
              </div>
              <div className="px-6 py-3 text-center">
                <span className="font-medium text-gray-800 uppercase tracking-wider text-sm">ESTADO</span>
              </div>
            </div>

            {actividadesData.length > 0 ? (
              actividadesData.map((actividad, index) => (
                <div
                  key={actividad.idactividades}
                  className={`grid grid-cols-4 border-b ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } ${
                    selectedRow === actividad.idactividades ? 'ring-2 ring-blue-400 relative' : ''
                  }`}
                  onClick={() => setSelectedRow(actividad.idactividades)}
                >
                  <div className="px-6 py-4 text-center">
                    <span className="font-medium">{actividad.nombreactividad}</span>
                  </div>
                  <div className="px-6 py-4 text-center">{actividad.horasacreditadas} hrs</div>
                  <div className="px-6 py-4 text-center">
                    <span>{formatDate(actividad.fechaactividad)}</span>
                  </div>
                  <div className="px-6 py-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      actividad.asistencia 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {actividad.asistencia ? 'Asistió' : 'Pendiente'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-center bg-white">
                <p className="text-gray-500 italic">No hay actividades registradas para los filtros seleccionados.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}