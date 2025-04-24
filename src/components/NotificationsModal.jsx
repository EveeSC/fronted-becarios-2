'use client';
import { Bell, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function NotificationsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener notificaciones
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay sesión activa');
      }

      const response = await fetch('http://localhost:3031/api/obtener_notificaciones', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        throw new Error('Sesión expirada');
      }

      if (!response.ok) {
        throw new Error('Error al obtener notificaciones');
      }

      const data = await response.json();
      
      // Obtener notificaciones leídas del localStorage
      const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]');
      
      // Ordenar y marcar notificaciones
      const processedNotifications = data
        .sort((a, b) => new Date(b.fechaenvio) - new Date(a.fechaenvio))
        .map(notif => ({
          ...notif,
          isRead: readNotifications.includes(notif.idnotificacion)
        }));
      
      setNotifications(processedNotifications);
      setUnreadCount(processedNotifications.filter(n => !n.isRead).length);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Marcar como leída individual (solo frontend)
  const markAsRead = (id) => {
    // Obtener notificaciones leídas actuales
    const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]');
    
    // Si no está marcada como leída, la agregamos
    if (!readNotifications.includes(id)) {
      const updatedReadNotifications = [...readNotifications, id];
      localStorage.setItem('readNotifications', JSON.stringify(updatedReadNotifications));
      
      // Actualizar estado local
      setNotifications(notifications.map(n => 
        n.idnotificacion === id ? {...n, isRead: true} : n
      ));
      setUnreadCount(unreadCount - 1);
    }
  };

  // Marcar todas como leídas (solo frontend)
  const markAllAsRead = () => {
    const allNotificationIds = notifications.map(n => n.idnotificacion);
    localStorage.setItem('readNotifications', JSON.stringify(allNotificationIds));
    
    // Actualizar estado local
    setNotifications(notifications.map(n => ({...n, isRead: true})));
    setUnreadCount(0);
  };

  // Efecto para cargar notificaciones al montar el componente
  useEffect(() => {
    fetchNotifications();
    
    // Opcional: actualización periódica cada 30 segundos
    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Efecto para limpiar notificaciones leídas antiguas
  useEffect(() => {
    const cleanupOldReadNotifications = () => {
      const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]');
      if (readNotifications.length > 100) { // Mantener solo las 100 más recientes
        localStorage.setItem('readNotifications', JSON.stringify(readNotifications.slice(-100)));
      }
    };
    
    cleanupOldReadNotifications();
  }, [notifications]);

  return (
    <div className="relative">
      <button 
        onClick={() => {
          setIsOpen(true);
          // Opcional: marcar todas como leídas al abrir
          // markAllAsRead();
        }}
        className="relative p-2 text-gray-600 hover:text-gray-900"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end pt-16">
          <div className="bg-white w-80 h-[calc(100%-4rem)] shadow-lg rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-lg">Notificaciones</h3>
              <div className="flex space-x-2">
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    Marcar todas como leídas
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-3.5rem)]">
              {loading ? (
                <div className="p-4 text-center">
                  <p>Cargando notificaciones...</p>
                </div>
              ) : error ? (
                <div className="p-4 text-center text-red-500">
                  <p>{error}</p>
                  <button 
                    onClick={() => window.location.href = '/home'}
                    className="mt-2 text-sm text-blue-500 hover:underline"
                  >
                    Volver a iniciar sesión
                  </button>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No hay notificaciones
                </div>
              ) : (
                <ul>
                  {notifications.map((notification) => (
                    <li 
                      key={notification.idnotificacion} 
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                        !notification.isRead ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => markAsRead(notification.idnotificacion)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{notification.titulomensaje}</h4>
                        {!notification.isRead && (
                          <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                        )}
                      </div>
                      <p className="text-sm mt-1">{notification.cuerpomensaje}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(notification.fechaenvio).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}