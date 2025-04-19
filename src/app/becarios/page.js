'use client';
import { useState, useRef, useEffect } from "react";
import { User, LayoutDashboard, FileText, LogOut, Bell } from "lucide-react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import NotificationsPopover from '@/components/NotificationsPopover';
import './becarios.css';

// Importaciones dinámicas para evitar errores de SSR
const PerfilContent = dynamic(() => import('./miPerfil/page'));
const ActividadesContent = dynamic(() => import('./actividades/page'));
const HistorialContent = dynamic(() => import('./historialDeActividades/page'));

export default function BecariosPanel() {
  const [activeSection, setActiveSection] = useState("perfil");
  const bellRef = useRef(null);

  useEffect(() => {
    if (bellRef.current) {
      bellRef.current.style.backgroundColor = "#DEA93F";
      // Ya no necesitamos cambiar el color del icono aquí porque lo maneja NotificationsPopover
    }
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "perfil": return <PerfilContent />;
      case "actividades": return <ActividadesContent />;
      case "historial": return <HistorialContent />;
      default: return <DefaultContent />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon">
            <Image 
              src="/img/voaelogo2.png" 
              alt="VOAE Logo"
              width={150}
              height={80}
              className="logo-image"
              priority
            />
          </div>
        </div>
        
        {/* Menú de navegación */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li>
              <button
                onClick={() => setActiveSection("perfil")}
                className={`nav-link ${activeSection === "perfil" ? "active" : ""}`}
              >
                <User className="nav-icon" />
                <span>Mi Perfil</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("actividades")}
                className={`nav-link ${activeSection === "actividades" ? "active" : ""}`}
              >
                <LayoutDashboard className="nav-icon" />
                <span>Actividades</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("historial")}
                className={`nav-link ${activeSection === "historial" ? "active" : ""}`}
              >
                <FileText className="nav-icon" />
                <span>Historial de Actividades</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Cerrar sesión */}
        <div className="sidebar-logout">
          <button className="logout-button" onClick={() => console.log("Cerrando sesión...")}>
            <LogOut className="logout-icon" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="dashboard-main">
        {/* Header */}
        <header className="main-header">
          <div className="header-actions">
            <NotificationsPopover ref={bellRef} />
            <div className="user-avatar">
              <Image
                src="/placeholder.svg"
                alt="User Profile"
                width={32}
                height={32}
                className="avatar-image"
              />
            </div>
          </div>
        </header>

        {/* Contenido de la página */}
        <main className="main-content">
          <div className="content-container">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

function DefaultContent() {
  return (
    <div className="default-content">
      <h2 className="content-title">Bienvenido al Panel de Becarios</h2>
      <div className="content-placeholder">
        <p>Seleccione una opción del menú para comenzar</p>
      </div>
    </div>
  );
}