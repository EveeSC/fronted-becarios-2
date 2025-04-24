'use client'

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import axios from "axios";
import { 
  User, BookOpen, FileText, ClipboardList, BarChart2, LogOut, Mail, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function EmpleadoLayout({ children }) {
  const router = useRouter();
  //Cerrar Sesion Accion
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    router.push("/home");
    alert("bye :D");
  };

  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [verMensajes, setVerMensajes] = useState(false);
  const [mensajes, setMensajes] = useState([]);

  //Handle POST Notificaciones
  const handleEnviar = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3031/api/ingresar_notificacion", {
        titulomensaje: titulo,
        cuerpomensaje: cuerpo,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Mensaje enviado correctamente");
      setTitulo("");
      setCuerpo("");
    } catch (error) {
      alert("Error al enviar mensaje");
    }
  };

  //Handle GET Notificaciones
  const handleVerMensajes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3031/api/obtener_notificaciones", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMensajes(res.data);
      setVerMensajes(true);
    } catch (error) {
      alert("Error al obtener mensajes");
    }
  };

  //Estado Vista Mensajes
  const toggleView = () => {
    setVerMensajes(!verMensajes);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white shadow-lg h-full flex flex-col">
        <div className="p-4 border-b">
          <img src="https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//voaelogo2.png" />
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            <li><Link href="/empleado/perfilEmpleado" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg mx-2 transition-colors"><User className="h-5 w-5 mr-3" /><span>Mi Perfil</span></Link></li>
            <li><Link href="/empleado/actividadesEmpleado" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg mx-2 transition-colors"><BookOpen className="h-5 w-5 mr-3" /><span>Actividades</span></Link></li>
            <li><Link href="/empleado/becasEmpleado" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg mx-2 transition-colors"><FileText className="h-5 w-5 mr-3" /><span>Becas</span></Link></li>
            <li><Link href="/empleado/solicitudesEmpleado" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg mx-2 transition-colors"><ClipboardList className="h-5 w-5 mr-3" /><span>Solicitudes</span></Link></li>
            <li><Link href="/empleado/reportesEmpleado" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg mx-2 transition-colors"><BarChart2 className="h-5 w-5 mr-3" /><span>Reportes</span></Link></li>
          </ul>
        </nav>
        <div className="p-4 border-t">
          <button onClick={cerrarSesion} className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors w-full text-left">
            <LogOut className="h-5 w-5 mr-3" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white shadow-sm flex items-center justify-end px-6">
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative p-2 text-gray-600 hover:text-gray-900">
                <Mail className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-4 space-y-2">
              <DropdownMenuLabel>Redactar Mensaje</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {!verMensajes ? (
                <>
                  <input
                    className="w-full border rounded px-2 py-1 text-sm"
                    type="text"
                    placeholder="Título del mensaje"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                  <textarea
                    className="w-full border rounded px-2 py-1 text-sm"
                    placeholder="Redactar mensaje"
                    value={cuerpo}
                    onChange={(e) => setCuerpo(e.target.value)}
                  />
                  <div className="flex justify-between">
                    <Button onClick={handleEnviar}>Enviar</Button>
                    <Button variant="outline" onClick={handleVerMensajes}>Ver mensajes enviados</Button>
                  </div>
                </>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  <DropdownMenuLabel className="text-center">Mensajes enviados</DropdownMenuLabel>
                  {mensajes.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center">No hay mensajes.</p>
                  ) : (
                    mensajes.map((msg) => (
                      <div key={msg.idnotificacion} className="border rounded p-2">
                        <p className="font-semibold text-sm">{msg.titulomensaje}</p>
                        <p className="text-xs text-gray-600">{msg.cuerpomensaje}</p>
                        <p className="text-xs text-gray-400">{new Date(msg.fechaenvio).toLocaleString()}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative p-2 text-gray-600 hover:text-gray-900">
                <Mail className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-4 space-y-2">
              {!verMensajes ? (
                <>
                  <DropdownMenuLabel>Redactar Mensaje</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <input
                    className="w-full border rounded px-2 py-1 text-sm"
                    type="text"
                    placeholder="Título del mensaje"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                  <textarea
                    className="w-full border rounded px-2 py-1 text-sm"
                    placeholder="Redactar mensaje"
                    value={cuerpo}
                    onChange={(e) => setCuerpo(e.target.value)}
                  />
                  <div className="flex justify-between">
                    <Button onClick={handleEnviar}>Enviar</Button>
                    <Button variant="outline" onClick={handleVerMensajes}>
                      Ver mensajes enviados
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <DropdownMenuLabel>Mensajes enviados</DropdownMenuLabel>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={toggleView}
                      className="p-1"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Volver
                    </Button>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {mensajes.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center">No hay mensajes.</p>
                    ) : (
                      mensajes.map((msg) => (
                        <div key={msg.idnotificacion} className="border rounded p-2">
                          <p className="font-semibold text-sm">{msg.titulomensaje}</p>
                          <p className="text-xs text-gray-600">{msg.cuerpomensaje}</p>
                          <p className="text-xs text-gray-400">{new Date(msg.fechaenvio).toLocaleString()}</p>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

