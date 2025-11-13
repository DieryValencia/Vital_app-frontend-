import { useState, useRef, useEffect } from 'react'
import { X, CheckCheck, Trash2 } from 'lucide-react'
import { NotificationBadge } from './NotificationBadge'
import { TypeBadge } from './TypeBadge'
import { useNotifications } from '@/hooks/useNotifications'
import { formatDateTime } from '@/utils/dateUtils'
import { useNavigate } from 'react-router-dom'

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { unreadNotifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const navigate = useNavigate()

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNotificationClick = (notificationId: number) => {
    markAsRead(notificationId)
    setIsOpen(false)
    navigate('/notifications')
  }

  const handleMarkAllAsRead = () => {
    markAllAsRead()
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
      >
        <NotificationBadge count={unreadCount} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Notificaciones</h3>
              <p className="text-xs text-gray-500">
                {unreadCount} sin leer
              </p>
            </div>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Marcar todas como leídas"
                >
                  <CheckCheck className="h-4 w-4 text-gray-600" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {!unreadNotifications || unreadNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No hay notificaciones nuevas</p>
              </div>
            ) : (
              unreadNotifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  className="p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <TypeBadge type={notification.type} size="sm" />
                      </div>
                      <h4 className="font-medium text-sm text-gray-900 mb-1">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatDateTime(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {unreadNotifications && unreadNotifications.length > 0 && (
            <div className="p-3 border-t text-center">
              <button
                onClick={() => {
                  setIsOpen(false)
                  navigate('/notifications')
                }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Ver todas las notificaciones
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}