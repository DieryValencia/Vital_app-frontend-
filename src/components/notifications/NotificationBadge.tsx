import { Bell } from 'lucide-react'

interface NotificationBadgeProps {
  count: number
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count }) => {
  if (count === 0) {
    return (
      <div className="relative">
        <Bell className="h-5 w-5 text-gray-600" />
      </div>
    )
  }

  return (
    <div className="relative">
      <Bell className="h-5 w-5 text-gray-600" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
        {count > 9 ? '9+' : count}
      </span>
    </div>
  )
}