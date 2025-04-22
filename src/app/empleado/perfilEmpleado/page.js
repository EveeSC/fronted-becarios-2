"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { User, Mail, Phone, Calendar } from "lucide-react"

export default function PerfilEmpleado() {
  const [perfil, setPerfil] = useState({ respuesta: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    obtenerPerfil()
  }, [])

  const obtenerPerfil = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Token no encontrado")

      const response = await axios.get("http://localhost:3031/api/perfil_empleado", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setPerfil(response.data)
      console.log("perfil", response.data)
    } catch (err) {
      console.error(err)
      setError("Error al cargar los datos del perfil")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-20 w-20 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-5 w-40 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 w-56 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 rounded-lg">
          <p className="font-medium">{error}</p>
          <button
            onClick={obtenerPerfil}
            className="mt-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  const empleado = perfil.respuesta && perfil.respuesta[0] ? perfil.respuesta[0] : {}

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-medium text-gray-800">Perfil de Empleado</h2>
          <p className="text-gray-500 text-sm mt-1">Sistema de manejo de Becas VOAE</p>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <User size={48} className="text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">
                {empleado.primernombre} {empleado.primerapellido}
              </h3>
              <p className="text-gray-500 text-sm">ID: {empleado.idempleado}</p>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  ["Primer Nombre", empleado.primernombre, User],
                  ["Segundo Nombre", empleado.segundonombre, User],
                  ["Primer Apellido", empleado.primerapellido, User],
                  ["Segundo Apellido", empleado.segundoapellido, User],
                  ["Correo Institucional", empleado.correoinstitucional, Mail],
                  ["Teléfono", empleado.telefono, Phone],
                  ["Fecha de Nacimiento", empleado.fechanacimiento, Calendar, true]
                ].map(([label, value, Icon, fullWidth], i) => (
                  <div key={i} className={`space-y-1.5 ${fullWidth ? "md:col-span-2" : ""}`}>
                    <label className="block text-sm font-medium text-gray-600">{label}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon size={15} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-md pl-9 p-2 w-full"
                        value={value || ""}
                        disabled
                        readOnly
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



{/* <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Bienvenido, Usuario</h2>
        <p className="text-gray-600">Sistema de manejo de Becas VOAE</p>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800">Actividades Pendientes</h3>
            <p className="text-sm text-blue-600 mt-1">Tienes 5 actividades pendientes</p>
          </div>
  
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="font-medium text-green-800">Becas Disponibles</h3>
            <p className="text-sm text-green-600 mt-1">Hay 3 nuevas becas disponibles</p>
          </div>
        </div>
      </div> */}