import { Info, AlertTriangle, XCircle, CheckCircle } from 'lucide-react'
import { cn } from '@/utils/cn'
import { TYPE_LABELS, TYPE_COLORS, TYPE_ICON_COLORS } from '@/api/notifications.types'
import type { NotificationType } from '@/api/notifications.types'

interface TypeBadgeProps {
  type: NotificationType
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const TYPE_ICONS: Record<NotificationType, any> = {
  INFO: Info,
  WARNING: AlertTriangle,
  ERROR: XCircle,
  SUCCESS: CheckCircle,
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({
  type,
  showIcon = true,
  size = 'md'
}) => {
  const Icon = TYPE_ICONS[type]

  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  }

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        TYPE_COLORS[type],
        sizes[size]
      )}
    >
      {showIcon && (
        <Icon className={cn(iconSizes[size], TYPE_ICON_COLORS[type])} />
      )}
      {TYPE_LABELS[type]}
    </span>
  )
}