import { Check } from 'lucide-react'
import { STATUS_LABELS, STATUS_COLORS } from '@/api/appointments.types'
import type { AppointmentStatus } from '@/api/appointments.types'

interface StatusSelectorProps {
  currentStatus: AppointmentStatus
  onStatusChange: (status: AppointmentStatus) => void
  disabled?: boolean
}

export const StatusSelector: React.FC<StatusSelectorProps> = ({
  currentStatus,
  onStatusChange,
  disabled = false
}) => {
  const statuses: AppointmentStatus[] = ['PENDIENTE', 'CONFIRMADA', 'COMPLETADA', 'CANCELADA']

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          disabled={disabled || currentStatus === status}
          className={`
            px-3 py-2 rounded-lg border text-sm font-medium transition-all
            ${currentStatus === status ? STATUS_COLORS[status] : 'bg-gray-100 text-gray-700 border-gray-300'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
          `}
        >
          {currentStatus === status && (
            <Check className="inline h-4 w-4 mr-1" />
          )}
          {STATUS_LABELS[status]}
        </button>
      ))}
    </div>
  )
}