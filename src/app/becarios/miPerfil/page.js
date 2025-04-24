'use client'

import AvatarPerfil from '@/components/ui/avatarPerfil';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MiPerfil() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Obtener el token del localStorage (compartido con empleados)
        const token = localStorage.getItem('token');
        
        if (!token) {
          router.push('/home'); // Redirigir a home si no hay token
          return;
        }

        const response = await fetch('http://localhost:3031/api/mi_perfil/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del perfil');
        }

        const data = await response.json();
        setProfileData(data.respuesta[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Aviso!</strong>
        <span className="block sm:inline"> No se encontraron datos de perfil.</span>
      </div>
    );
  }

  // Preparar los datos para mostrar en el perfil
  const personalInfo = [
    { 
      label: "Nombre", 
      value: `${profileData.primernombre} ${profileData.segundonombre}`, 
      id: "nombre" 
    },
    { 
      label: "Apellido", 
      value: `${profileData.primerapellido} ${profileData.segundoapellido}`, 
      id: "apellido" 
    },
    { 
      label: "Número de cuenta", 
      value: profileData.nocuenta, 
      id: "cuenta" 
    },
    { 
      label: "Teléfono", 
      value: profileData.telefono, 
      id: "telefono" 
    },
    { 
      label: "Correo institucional", 
      value: profileData.correoinstitucional, 
      id: "correo-institucional" 
    },
    { 
      label: "Dirección", 
      value: `${profileData.departamento}, ${profileData.municipio}, ${profileData.coloniaaldea}`, 
      id: "direccion", 
      fullWidth: true 
    },
    { 
      label: "Centro de estudio", 
      value: profileData.nombrecentro, 
      id: "centro" 
    },
    { 
      label: "Facultad", 
      value: profileData.nombrefacultad, 
      id: "facultad" 
    },
    { 
      label: "Carrera", 
      value: profileData.nombrecarrera, 
      id: "carrera" 
    }
  ];

  const scholarshipInfo = [
    { 
      label: "Tipo de beca", 
      value: profileData.tipobeca 
    },
    { 
      label: "Monto", 
      value: `L ${profileData.monto.toLocaleString('en-US')}.00`, 
      highlight: true 
    },
    { 
      label: "Fecha de inicio", 
      value: new Date(profileData.fechainicio).toLocaleDateString('es-HN') 
    },
    { 
      label: "Descripción de la beca", 
      value: profileData.descripcion,
      fullWidth: true 
    }
  ];

  // Generar iniciales para el avatar
  const initials = `${profileData.primernombre.charAt(0)}${profileData.primerapellido.charAt(0)}`;

  return (
    <div className="py-10 px-4">
      <div className="flex flex-col items-center mb-12">
        {/* Componente AvatarPerfil con edición habilitada */}
        <div className="mb-8">
          <AvatarPerfil 
            editable={true}
            fallbackText={initials}
            size={128}
          />
        </div>

        {/* Mi Perfil Card */}
        <div className="w-full max-w-3xl rounded-lg border bg-white shadow-md mb-10 overflow-hidden">
          <div className="border-b p-6">
            <h2 className="text-2xl text-center font-bold text-gray-800">Mi Perfil</h2>
          </div>
          <div className="p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalInfo.map((item) => (
                <div 
                  key={item.id} 
                  className={`space-y-2 ${item.fullWidth ? 'md:col-span-2' : ''}`}
                >
                  <label htmlFor={item.id} className="block text-sm font-medium text-gray-700">
                    {item.label}
                  </label>
                  <input
                    id={item.id}
                    defaultValue={item.value}
                    readOnly
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-[#8F8E8E] focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mi Beca Card */}
        <div className="w-full max-w-3xl rounded-lg bg-white shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl text-center font-bold text-gray-800">Mi Beca</h2>
          </div>
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scholarshipInfo.map((item, index) => (
                <div 
                  key={index} 
                  className={`space-y-2 ${item.fullWidth ? 'md:col-span-2' : ''}`}
                >
                  <span className="block text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                  <div className={`block w-full bg-white py-2 px-3 text-[#8F8E8E] ${item.highlight ? 'font-semibold' : ''}`}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}