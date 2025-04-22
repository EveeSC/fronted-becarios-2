// "use client"
// import React, { useEffect, useState } from "react"
// import axios from "axios"

// const tiposBeca = [
//   { id: 1, nombre: "Categoría A" },
//   { id: 2, nombre: "Categoría B" },
//   { id: 3, nombre: "Equidad" },
//   { id: 4, nombre: "Apoyo al Deporte" },
//   { id: 5, nombre: "Apoyo al Arte" },
//   { id: 6, nombre: "Desempeño Estudiantil" },
//   { id: 7, nombre: "Préstamo Educativo a Largo Plazo" },
// ]

// export default function Solicitudes() {
//   const [solicitudes, setSolicitudes] = useState([])
//   const [modalAbierto, setModalAbierto] = useState(false)
//   const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null)
//   const [idBecaSeleccionada, setIdBecaSeleccionada] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [filtro, setFiltro] = useState("todas") // puede ser 'todas', 'aprobadas', 'rechazadas'

//   useEffect(() => {
//     obtenerSolicitudes()
//   }, [filtro])

//   const obtenerSolicitudes = async () => {
//     try {
//       setLoading(true)
//       const token = localStorage.getItem("token")
//       let url = "http://localhost:3031/api/obtener_solicitudes"

//       if (filtro === "aprobadas") {
//         url = "http://localhost:3031/api/obtener_solicitudes_aprobadas"
//       } else if (filtro === "rechazadas") {
//         url = "http://localhost:3031/api/obtener_solicitudes_rechazadas"
//       }

//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       setSolicitudes(response.data.respuesta)
//     } catch (error) {
//       console.error("Error al obtener solicitudes:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const abrirModal = (solicitud) => {
//     setSolicitudSeleccionada(solicitud)
//     setIdBecaSeleccionada("")
//     setModalAbierto(true)
//   }

//   const cerrarModal = () => {
//     setModalAbierto(false)
//     setSolicitudSeleccionada(null)
//   }

//   const aprobarSolicitud = async () => {
//     if (!idBecaSeleccionada) return alert("Selecciona una beca antes de aprobar.")

//     try {
//       const token = localStorage.getItem("token")
//       await axios.post(
//         "http://localhost:3031/api/aprobar_solicitud",
//         {
//           idsolicitud: solicitudSeleccionada.idsolicitud,
//           idbeca: idBecaSeleccionada,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       alert("Solicitud aprobada correctamente.")
//       cerrarModal()
//       obtenerSolicitudes()
//     } catch (error) {
//       console.error("Error al aprobar solicitud:", error)
//     }
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Solicitudes de Beca</h2>

//       {/* Filtros */}
//       <div className="mb-4 flex gap-2">
//         <button
//           onClick={() => setFiltro("todas")}
//           className={`px-4 py-2 rounded-md border ${
//             filtro === "todas" ? "bg-blue-600 text-white" : "bg-gray-100"
//           }`}
//         >
//           Todas
//         </button>
//         <button
//           onClick={() => setFiltro("aprobadas")}
//           className={`px-4 py-2 rounded-md border ${
//             filtro === "aprobadas" ? "bg-green-600 text-white" : "bg-gray-100"
//           }`}
//         >
//           Aprobadas
//         </button>
//         <button
//           onClick={() => setFiltro("rechazadas")}
//           className={`px-4 py-2 rounded-md border ${
//             filtro === "rechazadas" ? "bg-red-600 text-white" : "bg-gray-100"
//           }`}
//         >
//           Rechazadas
//         </button>
//       </div>

//       {loading ? (
//         <div className="text-center py-4">Cargando...</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-2 px-4 border">No. Cuenta</th>
//                 <th className="py-2 px-4 border">Nombre</th>
//                 <th className="py-2 px-4 border">Fecha Solicitud</th>
//                 <th className="py-2 px-4 border">Acciones</th>
//               </tr>
//             </thead>
//             <tbody>
//               {solicitudes.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className="text-center py-4">
//                     No hay solicitudes.
//                   </td>
//                 </tr>
//               ) : (
//                 solicitudes.map((sol) => (
//                   <tr key={sol.idsolicitud}>
//                     <td className="py-2 px-4 border">{sol.nocuenta}</td>
//                     <td className="py-2 px-4 border">
//                       {sol.primernombre} {sol.primerapellido}
//                     </td>
//                     <td className="py-2 px-4 border">{sol.fechasolicitud}</td>
//                     <td className="py-2 px-4 border text-center">
//                       <button
//                         onClick={() => abrirModal(sol)}
//                         className="text-blue-600 hover:underline"
//                       >
//                         Ver Detalles
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Modal */}
//       {modalAbierto && solicitudSeleccionada && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
//             <h3 className="text-lg font-semibold mb-4">Detalles de la Solicitud</h3>

//             <ul className="space-y-1 text-sm">
//               <li><strong>Número de Cuenta:</strong> {solicitudSeleccionada.nocuenta}</li>
//               <li><strong>Nombre:</strong> {solicitudSeleccionada.primernombre} {solicitudSeleccionada.primerapellido}</li>
//               <li><strong>Correo:</strong> {solicitudSeleccionada.correoinstitucional}</li>
//               <li><strong>Fecha Solicitud:</strong> {solicitudSeleccionada.fechasolicitud}</li>
//               <li><strong>Estado Civil:</strong> {solicitudSeleccionada.estadocivil}</li>
//               <li><strong>Departamento:</strong> {solicitudSeleccionada.departamento}</li>
//               <li><strong>Carrera:</strong> {solicitudSeleccionada.nombrecarrera}</li>
//             </ul>

//             <div className="mt-6 flex flex-col gap-4">
//               <select
//                 value={idBecaSeleccionada}
//                 onChange={(e) => setIdBecaSeleccionada(e.target.value)}
//                 className="border rounded-md p-2"
//               >
//                 <option value="">Selecciona un tipo de beca</option>
//                 {tiposBeca.map((b) => (
//                   <option key={b.id} value={b.id}>{b.nombre}</option>
//                 ))}
//               </select>

//               <button
//                 onClick={aprobarSolicitud}
//                 className="bg-green-600 text-white py-2 rounded-md"
//               >
//                 Aprobar Solicitud
//               </button>

//               <button
//                 onClick={() => {
//                   alert("Solicitud denegada.")
//                   cerrarModal()
//                 }}
//                 className="bg-red-500 text-white py-2 rounded-md"
//               >
//                 Denegar Solicitud
//               </button>

//               <button
//                 onClick={cerrarModal}
//                 className="text-sm text-gray-500 hover:underline"
//               >
//                 Cerrar
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

"use client"
import { useEffect, useState } from "react"
import axios from "axios"

const tiposBeca = [
  { id: 1, nombre: "Categoría A" },
  { id: 2, nombre: "Categoría B" },
  { id: 3, nombre: "Equidad" },
  { id: 4, nombre: "Apoyo al Deporte" },
  { id: 5, nombre: "Apoyo al Arte" },
  { id: 6, nombre: "Desempeño Estudiantil" },
  { id: 7, nombre: "Préstamo Educativo a Largo Plazo" },
]

export default function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null)
  const [idBecaSeleccionada, setIdBecaSeleccionada] = useState("")
  const [loading, setLoading] = useState(false)
  const [filtro, setFiltro] = useState("todas") // puede ser 'todas', 'aprobadas', 'rechazadas', 'pendientes'

  useEffect(() => {
    obtenerSolicitudes()
  }, [filtro])

  const obtenerSolicitudes = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      let url = "http://localhost:3031/api/obtener_solicitudes"

      if (filtro === "aprobadas") {
        url = "http://localhost:3031/api/obtener_solicitudes_aprobadas"
      } else if (filtro === "rechazadas") {
        url = "http://localhost:3031/api/obtener_solicitudes_rechazadas"
      } else if (filtro === "pendientes") {
        url = "http://localhost:3031/api/obtener_solicitudes_pendientes"
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setSolicitudes(response.data.respuesta)
    } catch (error) {
      console.error("Error al obtener solicitudes:", error)
    } finally {
      setLoading(false)
    }
  }

  const abrirModal = (solicitud) => {
    setSolicitudSeleccionada(solicitud)
    setIdBecaSeleccionada("")
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setSolicitudSeleccionada(null)
  }

  const aprobarSolicitud = async () => {
    if (!idBecaSeleccionada) return alert("Selecciona una beca antes de aprobar.")

    try {
      const token = localStorage.getItem("token")
      await axios.post(
        "http://localhost:3031/api/aprobar_solicitud",
        {
          idsolicitud: solicitudSeleccionada.idsolicitud,
          idbeca: idBecaSeleccionada,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      alert("Solicitud aprobada correctamente.")
      cerrarModal()
      obtenerSolicitudes()
    } catch (error) {
      console.error("Error al aprobar solicitud:", error)
    }
  }

  const rechazarSolicitud = async () => {
    try {
      const token = localStorage.getItem("token")
      await axios.post(
        `http://localhost:3031/api/rechazar_solicitud/${solicitudSeleccionada.idsolicitud}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      alert("Solicitud rechazada correctamente.")
      cerrarModal()
      obtenerSolicitudes()
    } catch (error) {
      console.error("Error al rechazar solicitud:", error)
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Solicitudes de Beca</h2>

      {/* Filtros */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Filtrar por estado:</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setFiltro("todas")}
            className={`px-4 py-2 rounded-md transition-colors ${
              filtro === "todas" ? "bg-gray-800 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFiltro("pendientes")}
            className={`px-4 py-2 rounded-md transition-colors ${
              filtro === "pendientes" ? "bg-yellow-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFiltro("aprobadas")}
            className={`px-4 py-2 rounded-md transition-colors ${
              filtro === "aprobadas" ? "bg-green-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Aprobadas
          </button>
          <button
            onClick={() => setFiltro("rechazadas")}
            className={`px-4 py-2 rounded-md transition-colors ${
              filtro === "rechazadas" ? "bg-red-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Rechazadas
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">Cargando...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No. Cuenta
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Solicitud
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {solicitudes.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No hay solicitudes disponibles.
                  </td>
                </tr>
              ) : (
                solicitudes.map((sol) => (
                  <tr key={sol.idsolicitud} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">{sol.nocuenta}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {sol.primernombre} {sol.primerapellido}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{sol.fechasolicitud}</td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          sol.estado === "Aprobada"
                            ? "bg-green-100 text-green-800"
                            : sol.estado === "Rechazada"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {sol.estado}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <button
                        onClick={() => abrirModal(sol)}
                        className="text-gray-700 hover:text-gray-900 hover:underline font-medium"
                      >
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalAbierto && solicitudSeleccionada && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          onClick={cerrarModal}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-lg w-full relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Detalles de la Solicitud</h3>

            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium text-gray-700">Número de Cuenta:</span> {solicitudSeleccionada.nocuenta}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Nombre:</span> {solicitudSeleccionada.primernombre}{" "}
                  {solicitudSeleccionada.primerapellido}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Correo:</span> {solicitudSeleccionada.correoinstitucional}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Fecha Solicitud:</span>{" "}
                  {solicitudSeleccionada.fechasolicitud}
                </p>
              </div>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium text-gray-700">Estado Civil:</span> {solicitudSeleccionada.estadocivil}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Departamento:</span> {solicitudSeleccionada.departamento}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Carrera:</span> {solicitudSeleccionada.nombrecarrera}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Estado:</span>{" "}
                  <span
                    className={`font-semibold ${
                      solicitudSeleccionada.estado === "Aprobada"
                        ? "text-green-600"
                        : solicitudSeleccionada.estado === "Rechazada"
                          ? "text-red-600"
                          : "text-yellow-600"
                    }`}
                  >
                    {solicitudSeleccionada.estado}
                  </span>
                </p>
              </div>
            </div>

            {/* Solo mostrar opciones de veredicto si la solicitud está en espera */}
            {solicitudSeleccionada.estado === "En espera" && (
              <div className="mt-4 border-t pt-4">
                <h4 className="font-medium text-gray-800 mb-2">Veredicto de la Solicitud</h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Beca</label>
                    <select
                      value={idBecaSeleccionada}
                      onChange={(e) => setIdBecaSeleccionada(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                    >
                      <option value="">Selecciona un tipo de beca</option>
                      {tiposBeca.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={aprobarSolicitud}
                      disabled={!idBecaSeleccionada}
                      className={`flex-1 py-2 rounded-md transition-colors ${
                        idBecaSeleccionada
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Aprobar
                    </button>

                    <button
                      onClick={rechazarSolicitud}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-colors"
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={cerrarModal}
              className="mt-4 w-full py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}



