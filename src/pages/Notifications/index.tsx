import { useState, useMemo } from 'react'
import { Plus, CheckCheck, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { NotificationList } from '@/components/notifications/NotificationList'
import { NotificationFilters } from '@/components/notifications/NotificationFilters'
import { NotificationForm } from '@/components/notifications/NotificationForm'
import { NotificationModal } from '@/components/notifications/NotificationModal'
import { useNotifications } from '@/hooks/useNotifications'
import type { NotificationCreateInput, NotificationType } from '@/api/notifications.types'

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    isLoading,
    createNotification,
    markAsRead,
    deleteNotification,
    markAllAsRead,
    deleteAllRead,
    isCreating,
  } = useNotifications()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<NotificationType | 'all'>('all')
  const [readFilter, setReadFilter] = useState<'all' | 'read' | 'unread'>('all')

  // Filtrar notificaciones
  const filteredNotifications = useMemo(() => {
    if (!notifications) return []

    return notifications.filter((notification) => {
      // Filtro de búsqueda
      const matchesSearch =
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtro de tipo
      const matchesType =
        typeFilter === 'all' || notification.type === typeFilter

      // Filtro de lectura
      const matchesRead =
        readFilter === 'all' ||
        (readFilter === 'read' && notification.read) ||
        (readFilter === 'unread' && !notification.read)

      return matchesSearch && matchesType && matchesRead
    })
  }, [notifications, searchTerm, typeFilter, readFilter])

  // Ordenar por fecha (más recientes primero)
  const sortedNotifications = useMemo(() => {
    return [...filteredNotifications].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [filteredNotifications])

  const handleCreate = () => {
    setIsModalOpen(true)
  }

  const handleSubmit = (data: NotificationCreateInput) => {
    createNotification(data, {
      onSuccess: () => {
        setIsModalOpen(false)
      }
    })
  }

  const handleMarkAllAsRead = () => {
    if (window.confirm(`¿Marcar todas las ${unreadCount} notificaciones como leídas?`)) {
      markAllAsRead()
    }
  }

  const handleDeleteAllRead = () => {
    const readCount = notifications?.filter(n => n.read).length || 0
    if (window.confirm(`¿Eliminar todas las ${readCount} notificaciones leídas?`)) {
      deleteAllRead()
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notificaciones</h1>
          <p className="text-gray-600 mt-1">
            {sortedNotifications.length} notificación{sortedNotifications.length !== 1 ? 'es' : ''} 
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-medium">
                {unreadCount} nueva{unreadCount !== 1 ? 's' : ''}
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button
              variant="secondary"
              onClick={handleMarkAllAsRead}
            >
              <CheckCheck className="h-4 w-4 mr-2" />
              Marcar todas leídas
            </Button>
          )}
          {notifications && notifications.some(n => n.read) && (
            <Button
              variant="danger"
              onClick={handleDeleteAllRead}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar leídas
            </Button>
          )}
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Notificación
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <NotificationFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          readFilter={readFilter}
          onReadFilterChange={setReadFilter}
        />
      </div>

      {sortedNotifications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron notificaciones</p>
          <Button onClick={handleCreate} className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Crear primera notificación
          </Button>
        </div>
      ) : (
        <NotificationList
          notifications={sortedNotifications}
          onMarkAsRead={markAsRead}
          onDelete={deleteNotification}
        />
      )}

      {/* Modal para crear */}
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nueva Notificación"
      >
        <NotificationForm
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          isSubmitting={isCreating}
        />
      </NotificationModal>
    </div>
  )
}