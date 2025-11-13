import { NotificationItem } from './NotificationItem'
import type { Notification } from '@/api/notifications.types'

interface NotificationListProps {
  notifications: Notification[]
  onMarkAsRead: (id: number) => void
  onDelete: (id: number) => void
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkAsRead,
  onDelete
}) => {
  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}