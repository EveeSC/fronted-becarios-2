"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"

export default function BecasEmpleado() {
  const [becarios, setBecarios] = useState([])
  const [todosBecarios, setTodosBecarios] = useState([])
  const [filtroCuenta, setFiltroCuenta] = useState("")
  const [idBecaSeleccionada, setIdBecaSeleccionada] = useState("")

  const [mostrarModal, setMostrarModal] = useState(false)
  const [cuentaPago, setCuentaPago] = useState("")
  const [montoPago, setMontoPago] = useState("")
  const [motivoPago, setMotivoPago] = useState("")

  const categoriasBeca = [
    { id: 1, nombre: "Categoría A" },
    { id: 2, nombre: "Categoría B" },
    { id: 3, nombre: "Equidad" },
    { id: 4, nombre: "Apoyo al Deporte" },
    { id: 5, nombre: "Apoyo al Arte" },
    { id: 6, nombre: "Desempeño Estudiantil" },
    { id: 7, nombre: "Préstamo Educativo a Largo Plazo" },
  ]

  useEffect(() => {
    obtenerTodosBecarios()
  }, [])

  async function obtenerTodosBecarios() {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("Token no encontrado")
        return
      }

      const response = await axios.get("http://localhost:3031/api/obtener_becarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setBecarios(response.data.respuesta)
      setTodosBecarios(response.data.respuesta)
    } catch (error) {
      console.error("Error al obtener becarios:", error)
    }
  }

  async function filtrarPorBeca(idbeca) {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("Token no encontrado")
        return
      }

      setIdBecaSeleccionada(idbeca)

      if (idbeca === "") {
        setBecarios(todosBecarios)
        return
      }

      const response = await axios.get(`http://localhost:3031/api/obtener_becarios/${idbeca}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setBecarios(response.data.respuesta)
    } catch (error) {
      console.error("Error al filtrar por beca:", error)
    }
  }

  const becariosFiltrados = becarios.filter((b) =>
    b.nocuenta.toLowerCase().includes(filtroCuenta.toLowerCase())
  )

  async function registrarPagoManual(e) {
    e.preventDefault()
    const token = localStorage.getItem("token")
    if (!token) return alert("Token no encontrado")

    try {
      const response = await axios.post(
        "http://localhost:3031/api/ingresar_pago",
        {
          monto: parseFloat(montoPago),
          motivopago: motivoPago,
          estadopago: true,
          nocuenta: cuentaPago,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (
        response.data.respuesta ===
        "Ya se realizó el pago este mes al becario especificado."
      ) {
        alert(response.data.respuesta)
        return
      }

      alert("Pago registrado correctamente")
      setMostrarModal(false)
      setCuentaPago("")
      setMontoPago("")
      setMotivoPago("")
    } catch (error) {
      console.error("Error al registrar pago:", error)
      alert("Error al registrar pago")
    }
  }

  async function generarPagos() {
    const token = localStorage.getItem("token")
    if (!token) return alert("Token no encontrado")

    try {
      const response = await axios.get("http://localhost:3031/api/generar_pagos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (
        response.data.respuesta ===
        "Ya se realizó el pago este mes al becario especificado."
      ) {
        alert(response.data.respuesta)
        return
      }

      alert("Pagos generados correctamente")
    } catch (error) {
      console.error("Error al generar pagos:", error)
      alert("Error al generar pagos")
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Becarios</h2>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-4 border p-4 rounded-lg shadow-sm bg-gray-50">
        <div>
          <label className="block text-sm font-medium">Número de Cuenta</label>
          <input
            type="text"
            value={filtroCuenta}
            onChange={(e) => setFiltroCuenta(e.target.value)}
            placeholder="Buscar..."
            className="border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tipo de Beca</label>
          <select
            value={idBecaSeleccionada}
            onChange={(e) => filtrarPorBeca(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">Todas las Becas</option>
            {categoriasBeca.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <button
          className="bg-blue-600 text-white px-3 py-2 rounded-md mt-6"
          onClick={() => setMostrarModal(true)}
        >
          Registrar Pago Manual
        </button>

        <button
          className="bg-green-600 text-white px-3 py-2 rounded-md mt-6"
          onClick={generarPagos}
        >
          Generar Registro de Pagos
        </button>

        {(idBecaSeleccionada || filtroCuenta) && (
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-md mt-6"
            onClick={() => {
              setFiltroCuenta("")
              setIdBecaSeleccionada("")
              setBecarios(todosBecarios)
            }}
          >
            Quitar Filtros
          </button>
        )}
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Registrar Pago Manual</h3>
            <form onSubmit={registrarPagoManual} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Número de Cuenta</label>
                <input
                  type="text"
                  value={cuentaPago}
                  onChange={(e) => setCuentaPago(e.target.value)}
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Monto</label>
                <input
                  type="number"
                  value={montoPago}
                  onChange={(e) => setMontoPago(e.target.value)}
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Motivo de Pago</label>
                <input
                  type="text"
                  value={motivoPago}
                  onChange={(e) => setMotivoPago(e.target.value)}
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Registrar Pago
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Número de Cuenta</th>
              <th className="py-2 px-4 border">Nombre Completo</th>
              <th className="py-2 px-4 border">Horas Completadas</th>
              <th className="py-2 px-4 border">Beca</th>
              <th className="py-2 px-4 border">Carrera</th>
            </tr>
          </thead>
          <tbody>
            {becariosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No hay becarios que coincidan con el filtro.
                </td>
              </tr>
            ) : (
              becariosFiltrados.map((becario) => (
                <tr key={becario.idbecario}>
                  <td className="py-2 px-4 border">{becario.nocuenta}</td>
                  <td className="py-2 px-4 border">
                    {`${becario.primernombre} ${becario.segundonombre ?? ""} ${becario.primerapellido} ${becario.segundoapellido}`}
                  </td>
                  <td className="py-2 px-4 border">{becario.horasrealizadas}</td>
                  <td className="py-2 px-4 border">{becario.categoria}</td>
                  <td className="py-2 px-4 border">{becario.nombrecarrera}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
