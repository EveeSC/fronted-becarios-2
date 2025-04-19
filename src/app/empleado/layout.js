// 

import React from "react"
import Link from "next/link"
import { User, BookOpen, FileText, ClipboardList, BarChart2, LogOut, Bell } from "lucide-react"

export default function EmpleadoLayout({children}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white shadow-lg h-full flex flex-col">
        <div className="p-4 border-b">
          <img src="https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/resources-project//voaelogo2.png"></img>
          {/* <h1 className="text-xl pl-3 font-bold" style={{color:"#253A69"}}>Panel Empleado</h1> */}
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            <li>
              <Link
                href="/empleado/perfilEmpleado"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg mx-2 transition-colors"
              >
                <User className="h-5 w-5 mr-3" />
                <span>Mi Perfil</span>
              </Link>
            </li>
            <li>
              <Link
                href="/empleado/actividadesEmpleado"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg mx-2 transition-colors"
              >
                <BookOpen className="h-5 w-5 mr-3" />
                <span>Actividades</span>
              </Link>
            </li>
            <li>
              <Link
                href="/empleado/becas"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg mx-2 transition-colors"
              >
                <FileText className="h-5 w-5 mr-3" />
                <span>Becas</span>
              </Link>
            </li>
            <li>
              <Link
                href="/empleado/solicitudes"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg mx-2 transition-colors"
              >
                <ClipboardList className="h-5 w-5 mr-3" />
                <span>Solicitudes</span>
              </Link>
            </li>
            <li>
              <Link
                href="/empleado/reportes"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg mx-2 transition-colors"
              >
                <BarChart2 className="h-5 w-5 mr-3" />
                <span>Reportes</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t">
          <Link
            href="/logout"
            className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Cerrar Sesión</span>
          </Link>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col">
        {/* Header con notificaciones */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-end px-6">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
        </header>

        {/* Área de contenido */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
