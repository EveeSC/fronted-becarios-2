"use client"

import { useState } from "react"
import { useEffect } from "react"
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


export default function ActividadesEmpleado() {
    const [listaActividades, setListaActividades] = useState([]);
    useEffect(() => {
        const obtenerActividades = async () => {
          try {
            const response = await axios.get('http://localhost:3031/api/obtener_actividades');
            setListaActividades(response.data);
            console.log("actividades: ", response.data);
          } catch (error) {
            console.error('Error al obtener actividaces:', error);
          }
        };
    
        obtenerActividades();
      }, []);

  // Estados para controlar los modales
  const [detallesModalOpen, setDetallesModalOpen] = useState(false);
  const [editarModalOpen, setEditarModalOpen] = useState(false);
  const [eliminarModalOpen, setEliminarModalOpen] = useState(false);
  const [agregarModalOpen, setAgregarModalOpen] = useState(false);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

  // Funciones para manejar las acciones
  const verDetalles = (actividad) => {
    setActividadSeleccionada(actividad);
    setDetallesModalOpen(true);
  };
  
  const editarActividad = (actividad) => {
    setActividadSeleccionada(actividad);
    setEditarModalOpen(true);
  };
  
  const eliminarActividad = (actividad) => {
    setActividadSeleccionada(actividad);
    setEliminarModalOpen(true);
  };
  
  const agregarActividad = () => {
    setAgregarModalOpen(true);
  };

//   // Función para formatear la fecha
//   const formatearFecha = (fechaStr) => {
//     const fecha = new Date(fechaStr);
//     return fecha.toLocaleDateString("es-ES", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//   };
  

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre de la Actividad</TableHead>
              <TableHead className="text-center">Horas Acreditadas</TableHead>
              <TableHead className="text-center">Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listaActividades.map((actividad) => (
              <TableRow key={actividad.idactividad}>
                <TableCell className="font-medium">{actividad.nombreactividad}</TableCell>
                <TableCell className="text-center">{actividad.horasacreditadas}</TableCell>
                <TableCell className="text-center">{actividad.fechaactividad}</TableCell>
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
                  {actividadSeleccionada.fechaactividad} • {actividadSeleccionada.horasacreditadas} horas
                </p>
              </div>
              <div>
                <p className="text-sm">
                  Esta actividad consiste en un programa de formación diseñado para mejorar las habilidades
                  profesionales de los empleados. Durante el curso, se abordan temas relevantes para el desarrollo
                  personal y profesional, con un enfoque práctico y participativo.
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium">Información adicional</h4>
                <ul className="text-sm mt-2 space-y-1">
                  <li>Instructor: Juan Pérez</li>
                  <li>Ubicación: {actividadSeleccionada.lugar}</li>
                  <li>Certificado: Sí</li>
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
      {/* <Dialog open={editarModalOpen} onOpenChange={setEditarModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Actividad</DialogTitle>
            <DialogDescription>Modifica los detalles de la actividad seleccionada.</DialogDescription>
          </DialogHeader>
          {actividadSeleccionada && (
            <div className="space-y-4">
              <p>Aquí iría un formulario para editar la actividad "{actividadSeleccionada.nombre}"</p>
              <p className="text-sm text-gray-500">
                Este es un texto de ejemplo para el modal de edición. Aquí se incluirían campos para modificar el
                nombre, las horas y la fecha de la actividad.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditarModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setEditarModalOpen(false)}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      {/* Modal de Eliminar */}
      {/* <Dialog open={eliminarModalOpen} onOpenChange={setEliminarModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
          </DialogHeader>
          {actividadSeleccionada && (
            <div className="space-y-4">
              <p>¿Estás seguro de que deseas eliminar la actividad "{actividadSeleccionada.nombre}"?</p>
              <p className="text-sm text-gray-500">
                Esta acción no se puede deshacer. La actividad será eliminada permanentemente del sistema.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEliminarModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => setEliminarModalOpen(false)}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      {/* Modal de Agregar */}
      {/* <Dialog open={agregarModalOpen} onOpenChange={setAgregarModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar Nueva Actividad</DialogTitle>
            <DialogDescription>Completa el formulario para agregar una nueva actividad.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>Aquí iría un formulario para agregar una nueva actividad</p>
            <p className="text-sm text-gray-500">
              Este es un texto de ejemplo para el modal de agregar actividad. Aquí se incluirían campos para ingresar el
              nombre, las horas y la fecha de la nueva actividad.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAgregarModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setAgregarModalOpen(false)}>Guardar Actividad</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  )
}
