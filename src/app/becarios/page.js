'use client';
import { useState } from "react";
import { User, Activity, History, LogOut } from "lucide-react";
import Image from "next/image";
import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';

// Importaciones dinámicas para evitar errores de SSR
const PerfilContent = dynamic(() => import('./miPerfil/page'));
const ActividadesContent = dynamic(() => import('./actividades/page'));
const HistorialContent = dynamic(() => import('./historialDeActividades/page'));

export default function BecariosPanel() {
  const [activeSection, setActiveSection] = useState("perfil");

  const renderContent = () => {
    switch (activeSection) {
      case "perfil": return <PerfilContent />;
      case "actividades": return <ActividadesContent />;
      case "historial": return <HistorialContent />;
      default: return <DefaultContent />;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Panel lateral */}
      <div className="w-72 bg-[#253A69] p-5 text-white shadow-lg flex-shrink-0 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image 
            src="/img/voaelogo2.png" 
            alt="VOAE Logo"
            width={150}
            height={80}
            className="object-contain"
            priority
          />
        </div>
        
        {/* Menú principal */}
        <ul className="w-full flex flex-col gap-1 flex-grow">
          <MenuItem 
            icon={<User size={20} />}
            label="Mi Perfil"
            active={activeSection === "perfil"}
            onClick={() => setActiveSection("perfil")}
          />
          <MenuItem 
            icon={<Activity size={20} />}
            label="Actividades"
            active={activeSection === "actividades"}
            onClick={() => setActiveSection("actividades")}
          />
          <MenuItem 
            icon={<History size={20} />}
            label="Historial de Actividades"
            active={activeSection === "historial"}
            onClick={() => setActiveSection("historial")}
          />
        </ul>

        {/* Botón Cerrar Sesión */}
        <div className="mt-auto pt-4 border-t border-[#3a4f7a]">
          <MenuItem 
            icon={<LogOut size={20} />}
            label="Cerrar Sesión"
            onClick={() => console.log("Cerrando sesión...")}
          />
        </div>
      </div>

      {/* Área de contenido principal */}
      <div className="flex flex-col flex-1 ml-72">
        <Navbar />
        <main className="flex-1 bg-white overflow-auto">
          <div className="p-8 max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

// Componente MenuItem (sin cambios)
function MenuItem({ icon, label, active, onClick }) {
  return (
    <li className="w-full">
      <button
        onClick={onClick}
        className={`flex items-center w-full gap-3 p-3 rounded-md transition-colors ${
          active ? "bg-[#3a4f7a]" : "hover:bg-[#3a4f7a]/50"
        }`}
      >
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </button>
    </li>
  );
}

// Componente DefaultContent (sin cambios)
function DefaultContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Bienvenido</h2>
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-600">Seleccione una opción del menú</p>
      </div>
    </div>
  );
}