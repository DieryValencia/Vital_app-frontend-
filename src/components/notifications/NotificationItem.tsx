import { Clock, Trash2 } from 'lucide-react'
import { TypeBadge } from './TypeBadge'
import { Button } from '@/components/ui/Button'
import type { Notification } from '@/api/notifications.types'
import { formatDateTime } from '@/utils/dateUtils'

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: number) => void
  onDelete: (id: number) => void
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete
}) => {
  return (
    <div
      className={`p-4 border rounded-lg transition-all ${
        notification.read
          ? 'bg-white border-gray-200'
          : 'bg-blue-50 border-blue-200'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <TypeBadge type={notification.type} />
            {!notification.read && (
              <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-medium">
                Nuevo
              </span>
            )}
          </div>

          <h3 className="font-semibold text-gray-900 mb-1">
            {notification.title}
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            {notification.message}
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{formatDateTime(notification.createdAt)}</span>
            {notification.relatedEntityType && (
              <>
                <span>•</span>
                <span className="font-medium">{notification.relatedEntityType}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {!notification.read && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onMarkAsRead(notification.id)}
            >
              Marcar leída
            </Button>
          )}
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(notification.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}