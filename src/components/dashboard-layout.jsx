"use client"

import { Bell, User, FileText, LogOut, LayoutDashboard, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const bellRef = useRef(null)

  useEffect(() => {
    if (bellRef.current) {
      // Set the notification button background color to #DEA93F
      bellRef.current.style.backgroundColor = "#DEA93F"
      // Set the icon color to white for better contrast
      bellRef.current.querySelector("svg").style.color = "white"
    }
  }, [])

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#1e3464] text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 flex items-center space-x-3">
          <div className="bg-white rounded-full p-2 flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=24&width=24"
              alt="VOAE Logo"
              width={24}
              height={24}
              className="text-[#1e3464]"
            />
          </div>
          <div className="font-bold text-xl">VOAE</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-8">
          <ul className="space-y-2">
            <li>
              <Link
                href="/becarios/miPerfil"
                className={`flex items-center px-6 py-3 hover:bg-[#2a4580] ${
                  pathname === "/becarios/miPerfil" ? "bg-[#2a4580]" : ""
                }`}
              >
                <User className="h-5 w-5 mr-3" />
                <span>Mi Perfil</span>
              </Link>
            </li>
            <li>
              <Link
                href="/becarios/actividades"
                className={`flex items-center px-6 py-3 hover:bg-[#2a4580] ${
                  pathname === "/becarios/actividades" ? "bg-[#2a4580]" : ""
                }`}
              >
                <LayoutDashboard className="h-5 w-5 mr-3" />
                <span>Actividades</span>
              </Link>
            </li>
            <li>
              <Link
                href="/becarios/historialDeActividades"
                className={`flex items-center px-6 py-3 hover:bg-[#2a4580] ${
                  pathname === "/becarios/historialDeActividades" ? "bg-[#2a4580]" : ""
                }`}
              >
                <FileText className="h-5 w-5 mr-3" />
                <span>Historial de Actividades</span>
              </Link>
            </li>
            <li>
              <Link
                href="/becarios"
                className={`flex items-center px-6 py-3 hover:bg-[#2a4580] ${
                  pathname === "/becarios" ? "bg-[#2a4580] font-medium" : ""
                }`}
              >
                <Users className="h-5 w-5 mr-3" />
                <span>Becarios</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-6">
          <Link href="#" className="flex items-center text-white hover:text-gray-300">
            <LogOut className="h-5 w-5 mr-3" />
            <span>Cerrar Sesión</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 overflow-auto">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-end px-6 sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full transition-colors duration-200 hover:bg-[#c99638]" ref={bellRef}>
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="User Profile"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main>{children}</main>
      </div>
    </div>
  )
}
