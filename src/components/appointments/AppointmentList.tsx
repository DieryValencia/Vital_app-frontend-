import { AppointmentCard } from './AppointmentCard'
import type { Appointment, AppointmentStatus } from '@/api/appointments.types'

interface AppointmentListProps {
  appointments: Appointment[]
  onEdit: (appointment: Appointment) => void
  onDelete: (appointment: Appointment) => void
  onStatusChange: (id: number, status: AppointmentStatus) => void
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  )
}