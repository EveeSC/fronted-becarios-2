"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { Edit, Eye, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@mui/material" // Using MUI Input as in your original code
import { Switch, FormControlLabel } from "@mui/material"

export default function ActividadesEmpleado() {
  const [perfil, setPerfil] = useState({ respuesta: [] })
  const [listaActividades, setListaActividades] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Estados para controlar los modales
  const [detallesModalOpen, setDetallesModalOpen] = useState(false)
  const [editarModalOpen, setEditarModalOpen] = useState(false)
  const [eliminarModalOpen, setEliminarModalOpen] = useState(false)
  const [agregarModalOpen, setAgregarModalOpen] = useState(false)
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null)

  // Obtener perfil del empleado
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

  // Obtener actividades
  useEffect(() => {
    obtenerActividades()
  }, [])

  const obtenerActividades = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Token no encontrado")

      const response = await axios.get("http://localhost:3031/api/obtener_actividades", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Asegurarse de que listaActividades sea un array
      if (Array.isArray(response.data)) {
        setListaActividades(response.data)
      } else if (response.data && typeof response.data === "object") {
        // Si es un objeto con una propiedad que contiene el array
        const possibleArrayProps = Object.keys(response.data).find((key) => Array.isArray(response.data[key]))

        if (possibleArrayProps) {
          setListaActividades(response.data[possibleArrayProps])
        } else {
          // Si no hay un array, inicializar como array vacío
          setListaActividades([])
          console.error("La respuesta no contiene un array:", response.data)
        }
      } else {
        setListaActividades([])
        console.error("La respuesta no es un array:", response.data)
      }

      console.log("actividades", response.data)
    } catch (err) {
      console.error(err)
      setError("Error al cargar las actividades")
      setListaActividades([]) // Inicializar como array vacío en caso de error
    } finally {
      setLoading(false)
    }
  }

  // Formulario de nueva actividad
  const [actData, setActData] = useState({
    nombreactividad: "",
    horasacreditadas: "",
    fechaactividad: "",
    lugar: "",
    descripcionactividad: "",
    horainicio: "",
    horafinal: "",
    cuposdisponibles: "",
  })

  // Manejar cambios en el formulario para agregar nueva actividad
  const handleChange = (e) => {
    const { name, value } = e.target
    setActData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Agregar nueva actividad
  const agregarNuevaActividad = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Token no encontrado")

      const response = await axios.post("http://localhost:3031/api/ingresar_actividad", actData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log("Enviado con éxito:", response.data)
      alert("Actividad agregada exitosamente") // Simple alert instead of toast

      // Limpiar formulario
      setActData({
        nombreactividad: "",
        horasacreditadas: "",
        fechaactividad: "",
        lugar: "",
        descripcionactividad: "",
        horainicio: "",
        horafinal: "",
        cuposdisponibles: "",
      })

      // Cerrar modal y actualizar lista
      setAgregarModalOpen(false)
      obtenerActividades()
    } catch (err) {
      console.error("Error al enviar:", err)
      alert("Error al agregar la actividad") // Simple alert instead of toast
    }
  }

  //################ ELIMINAR UNA ACTIVIDAD #####################
  const deleteActividad = async (idActividad) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Token no encontrado")

      const response = await axios.delete(`http://localhost:3031/api/eliminar_actividad/${idActividad}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log("Actividad eliminada:", response.data)
      setEliminarModalOpen(false)
      alert(response.data.respuesta)
      obtenerActividades() // Refrescar la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar la actividad:", error)
      alert("Error al eliminar la actividad")
    }
  }

  // Función para habilitar/deshabilitar asistencia
  const toggleAsistencia = async (actividad) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Token no encontrado")

      const endpoint = actividad.habilitarasistencia
        ? `http://localhost:3031/api/deshabilitar_asistencia/${actividad.idactividades}`
        : `http://localhost:3031/api/habilitar_asistencia/${actividad.idactividades}`

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log("Estado de asistencia actualizado:", response.data)
      alert(actividad.habilitarasistencia ? "Asistencia deshabilitada" : "Asistencia habilitada")

      // Actualizar la lista de actividades para reflejar el cambio
      obtenerActividades()
    } catch (error) {
      console.error("Error al cambiar estado de asistencia:", error)
      alert("Error al cambiar el estado de asistencia")
    }
  }

  // Funciones para manejar las acciones
  const verDetalles = (actividad) => {
    setActividadSeleccionada(actividad)
    setDetallesModalOpen(true)
  }

  const editarActividad = (actividad) => {
    console.log("Actividad seleccionada para editar:", actividad)
    setActividadSeleccionada(actividad)
    setActData({
      nombreactividad: actividad.nombreactividad || "",
      horasacreditadas: actividad.horasacreditadas || "",
      fechaactividad: actividad.fechaactividad || "",
      lugar: actividad.lugar || "",
      descripcionactividad: actividad.descripcionactividad || "",
      horainicio: actividad.horainicio || "",
      horafinal: actividad.horafinal || "",
      cuposdisponibles: actividad.cuposdisponibles || "",
    })
    setEditarModalOpen(true)
  }

  // Modificar la función actualizarActividad para usar idactividades en lugar de idactividad
  const actualizarActividad = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Token no encontrado")

      // Verificar que tenemos el ID correcto - USAR idactividades en lugar de idactividad
      if (!actividadSeleccionada || !actividadSeleccionada.idactividades) {
        console.error("ID de actividad no encontrado", actividadSeleccionada)
        alert("Error: ID de actividad no encontrado")
        return
      }

      console.log("Actualizando actividad con ID:", actividadSeleccionada.idactividades)
      console.log("Datos a enviar:", actData)

      const response = await axios.put(
        `http://localhost:3031/api/actualizar_actividad/${actividadSeleccionada.idactividades}`,
        actData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      console.log("Actividad actualizada:", response.data)
      alert("Actividad actualizada exitosamente")

      setEditarModalOpen(false)
      obtenerActividades()
    } catch (error) {
      console.error("Error al actualizar la actividad:", error)
      alert("Error al actualizar la actividad")
    }
  }

  // También corregir la función confirmarEliminarActividad para usar idactividades
  const confirmarEliminarActividad = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Token no encontrado")

      await axios.delete(`http://localhost:3031/api/eliminar_actividad/${actividadSeleccionada.idactividades}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      alert("Actividad eliminada exitosamente") // Simple alert instead of toast

      setEliminarModalOpen(false)
      obtenerActividades()
    } catch (err) {
      console.error("Error al eliminar:", err)
      alert("Error al eliminar la actividad") // Simple alert instead of toast
    }
  }

  const eliminarActividad = (actividad) => {
    setActividadSeleccionada(actividad)
    setEliminarModalOpen(true)
  }

  const agregarActividad = () => {
    // Limpiar el formulario antes de abrir el modal
    setActData({
      nombreactividad: "",
      horasacreditadas: "",
      fechaactividad: "",
      lugar: "",
      descripcionactividad: "",
      horainicio: "",
      horafinal: "",
      cuposdisponibles: "",
    })
    setAgregarModalOpen(true)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-t-2 border-gray-500 rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Actividades</h2>
        <Button onClick={agregarActividad} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Agregar Actividad
        </Button>
      </div>

      {/* Card con la tabla de actividades */}
      <div className="bg-white rounded-lg shadow p-6">
        {error ? (
          <div className="text-red-500 p-4 text-center">{error}</div>
        ) : listaActividades && listaActividades.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre de la Actividad</TableHead>
                <TableHead className="text-center">Horas Acreditadas</TableHead>
                <TableHead className="text-center">Fecha</TableHead>
                <TableHead className="text-center">Asistencia</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listaActividades.map((actividad, index) => (
                <TableRow key={actividad.idactividad || `activity-${index}`}>
                  <TableCell className="font-medium">{actividad.nombreactividad}</TableCell>
                  <TableCell className="text-center">{actividad.horasacreditadas}</TableCell>
                  <TableCell className="text-center">{actividad.fechaactividad}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center items-center">
                      <FormControlLabel
                        control={
                          <Switch
                            checked={actividad.habilitarasistencia}
                            onChange={() => toggleAsistencia(actividad)}
                            color="primary"
                            size="small"
                          />
                        }
                        label={
                          <span className="text-xs text-gray-500">
                            {actividad.habilitarasistencia ? "Habilitada" : "Deshabilitada"}
                          </span>
                        }
                        labelPlacement="end"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => verDetalles(actividad)} title="Ver detalles">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => editarActividad(actividad)} title="Editar">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => eliminarActividad(actividad)}
                        title="Eliminar"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No hay actividades registradas. Agrega una nueva actividad para comenzar.
          </div>
        )}
      </div>

      {/* Modal de Detalles */}
      <Dialog open={detallesModalOpen} onOpenChange={setDetallesModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detalles de la Actividad</DialogTitle>
          </DialogHeader>
          {actividadSeleccionada && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{actividadSeleccionada.nombreactividad}</h3>
                <p className="text-sm text-gray-500">
                  {actividadSeleccionada.fechaactividad} • {actividadSeleccionada.horasacreditadas} horas acreditadas
                </p>
              </div>
              <div>
                <p className="text-sm">{actividadSeleccionada.descripcionactividad}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium">Información adicional</h4>
                <ul className="text-sm mt-2 space-y-1">
                  <li>Ubicación: {actividadSeleccionada.lugar}</li>
                  <li>Cupos Establecidos: {actividadSeleccionada.cuposdisponibles}</li>
                  <li className="mt-2">
                  </li>
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setDetallesModalOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Editar */}
      <Dialog open={editarModalOpen} onOpenChange={setEditarModalOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Actividad</DialogTitle>
            <DialogDescription>Modifica los detalles de la actividad seleccionada.</DialogDescription>
          </DialogHeader>
          {actividadSeleccionada && (
            <form onSubmit={actualizarActividad} className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <div className="text-sm font-medium mb-1">Nombre</div>
                  <Input
                    name="nombreactividad"
                    value={actData.nombreactividad}
                    onChange={handleChange}
                    placeholder="Nombre de la actividad"
                    required
                    fullWidth
                    size="small"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-sm font-medium mb-1">Horas</div>
                    <Input
                      name="horasacreditadas"
                      value={actData.horasacreditadas}
                      onChange={handleChange}
                      placeholder="Ej: 4"
                      type="number"
                      inputProps={{ min: "0" }}
                      required
                      fullWidth
                      size="small"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Fecha</div>
                    <Input
                      name="fechaactividad"
                      value={actData.fechaactividad}
                      onChange={handleChange}
                      type="date"
                      required
                      fullWidth
                      size="small"
                    />
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-1">Lugar</div>
                  <Input
                    name="lugar"
                    value={actData.lugar}
                    onChange={handleChange}
                    placeholder="Ubicación"
                    required
                    fullWidth
                    size="small"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-sm font-medium mb-1">Hora Inicio</div>
                    <input
                      type="time"
                      id="horainicio"
                      name="horainicio"
                      value={actData.horainicio}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Hora Final</div>
                    <input
                      type="time"
                      id="horafinal"
                      name="horafinal"
                      value={actData.horafinal}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-1">Cupos</div>
                  <Input
                    name="cuposdisponibles"
                    value={actData.cuposdisponibles}
                    onChange={handleChange}
                    placeholder="Cupos disponibles"
                    type="number"
                    inputProps={{ min: "0" }}
                    required
                    fullWidth
                    size="small"
                  />
                </div>

                <div>
                  <div className="text-sm font-medium mb-1">Descripción</div>
                  <textarea
                    name="descripcionactividad"
                    value={actData.descripcionactividad}
                    onChange={handleChange}
                    placeholder="Describa la actividad"
                    rows={3}
                    required
                    className="w-full p-2 border rounded-md text-sm"
                  />
                </div>
              </div>

              <DialogFooter className="mt-4">
                <Button type="button" variant="outline" onClick={() => setEditarModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Guardar Cambios</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Eliminar */}
      <Dialog open={eliminarModalOpen} onOpenChange={setEliminarModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
          </DialogHeader>
          {actividadSeleccionada && (
            <div className="space-y-4">
              <p>¿Estás seguro de que deseas eliminar la actividad "{actividadSeleccionada.nombreactividad}"?</p>
              <p className="text-sm text-gray-500">
                Esta acción no se puede deshacer. La actividad será eliminada permanentemente del sistema.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEliminarModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => deleteActividad(actividadSeleccionada.idactividades)}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Agregar */}
      <Dialog open={agregarModalOpen} onOpenChange={setAgregarModalOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Agregar Nueva Actividad</DialogTitle>
            <DialogDescription>Complete el formulario para agregar una nueva actividad.</DialogDescription>
          </DialogHeader>
          <form onSubmit={agregarNuevaActividad} className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <div className="text-sm font-medium mb-1">Nombre</div>
                <Input
                  name="nombreactividad"
                  value={actData.nombreactividad}
                  onChange={handleChange}
                  placeholder="Nombre de la actividad"
                  required
                  fullWidth
                  size="small"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-sm font-medium mb-1">Horas</div>
                  <Input
                    name="horasacreditadas"
                    value={actData.horasacreditadas}
                    onChange={handleChange}
                    placeholder="Ej: 4"
                    type="number"
                    inputProps={{ min: "0" }}
                    required
                    fullWidth
                    size="small"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Fecha</div>
                  <Input
                    name="fechaactividad"
                    value={actData.fechaactividad}
                    onChange={handleChange}
                    type="date"
                    required
                    fullWidth
                    size="small"
                  />
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-1">Lugar</div>
                <Input
                  name="lugar"
                  value={actData.lugar}
                  onChange={handleChange}
                  placeholder="Ubicación"
                  required
                  fullWidth
                  size="small"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-sm font-medium mb-1">Hora Inicio</div>
                  <input
                    type="time"
                    id="hora"
                    name="horainicio"
                    value={actData.horainicio}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md text-sm"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Hora Final</div>
                  <input
                    type="time"
                    id="hora"
                    name="horafinal"
                    value={actData.horafinal}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-1">Cupos</div>
                <Input
                  name="cuposdisponibles"
                  value={actData.cuposdisponibles}
                  onChange={handleChange}
                  placeholder="Cupos disponibles"
                  type="number"
                  inputProps={{ min: "0" }}
                  required
                  fullWidth
                  size="small"
                />
              </div>

              <div>
                <div className="text-sm font-medium mb-1">Descripción</div>
                <textarea
                  name="descripcionactividad"
                  value={actData.descripcionactividad}
                  onChange={handleChange}
                  placeholder="Describa la actividad"
                  rows={3}
                  required
                  className="w-full p-2 border rounded-md text-sm"
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setAgregarModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Agregar Actividad</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}





