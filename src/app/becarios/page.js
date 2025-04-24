'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { User, LayoutDashboard, FileText, LogOut } from "lucide-react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import NotificationsModal from '@/components/NotificationsModal';
import './becarios.css';

// Importaciones dinámicas para evitar errores de SSR
const PerfilContent = dynamic(() => import('./miPerfil/page'));
const ActividadesContent = dynamic(() => import('./actividades/page'));
const HistorialContent = dynamic(() => import('./historialDeActividades/page'));

export default function BecariosPanel() {
  const [activeSection, setActiveSection] = useState("perfil");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar autenticación al cargar el componente
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Si no hay token, redirigir al home
      router.push('/home');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
    
    // Redirigir al home
    router.push('/home');
    alert("Sesión cerrada correctamente");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "perfil": return <PerfilContent />;
      case "actividades": return <ActividadesContent />;
      case "historial": return <HistorialContent />;
      default: return <DefaultContent />;
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Verificando autenticación...</p>
      </div>
    );
  }

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
          <button className="logout-button" onClick={handleLogout}>
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
            <NotificationsModal />
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