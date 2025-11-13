import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/utils/cn'
import { STATUS_LABELS, STATUS_COLORS, STATUS_ICON_COLORS } from '@/api/appointments.types'
import type { AppointmentStatus } from '@/api/appointments.types'

interface StatusBadgeProps {
  status: AppointmentStatus
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const STATUS_ICONS: Record<AppointmentStatus, any> = {
  PENDIENTE: Clock,
  CONFIRMADA: AlertCircle,
  COMPLETADA: CheckCircle,
  CANCELADA: XCircle,
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showIcon = true,
  size = 'md'
}) => {
  const Icon = STATUS_ICONS[status]

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
        STATUS_COLORS[status],
        sizes[size]
      )}
    >
      {showIcon && (
        <Icon className={cn(iconSizes[size], STATUS_ICON_COLORS[status])} />
      )}
      {STATUS_LABELS[status]}
    </span>
  )
}