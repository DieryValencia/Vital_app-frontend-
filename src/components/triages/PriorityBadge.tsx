import { AlertCircle } from 'lucide-react'
import { cn } from '@/utils/cn'
import { PRIORITY_LABELS, PRIORITY_COLORS, PRIORITY_ICON_COLORS } from '@/api/triages.types'
import type { Priority } from '@/api/triages.types'

interface PriorityBadgeProps {
  priority: Priority
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  showIcon = true,
  size = 'md'
}) => {
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
        PRIORITY_COLORS[priority],
        sizes[size]
      )}
    >
      {showIcon && (
        <AlertCircle className={cn(iconSizes[size], PRIORITY_ICON_COLORS[priority])} />
      )}
      {PRIORITY_LABELS[priority]}
    </span>
  )
}