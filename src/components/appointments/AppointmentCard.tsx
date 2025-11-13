import { User, Calendar, Clock, User as Doctor, Stethoscope, FileText, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { StatusBadge } from './StatusBadge'
import { StatusSelector } from './StatusSelector'
import type { Appointment, AppointmentStatus } from '@/api/appointments.types'
import { formatDateTime } from '@/utils/dateUtils'

interface AppointmentCardProps {
  appointment: Appointment
  onEdit: (appointment: Appointment) => void
  onDelete: (appointment: Appointment) => void
  onStatusChange: (id: number, status: AppointmentStatus) => void
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
            <User className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{appointment.patient.firstName} {appointment.patient.lastName}</h3>
            <p className="text-sm text-gray-500">
              Doc: {appointment.patient.identificationNumber}
            </p>
          </div>
        </div>
        
        <StatusBadge status={appointment.status} />
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{formatDateTime(appointment.appointmentDate)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Doctor className="h-4 w-4" />
          <span>{appointment.doctorName}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Stethoscope className="h-4 w-4" />
          <span>{appointment.specialty}</span>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Motivo</p>
              <p className="text-sm text-gray-700">{appointment.reason}</p>
            </div>
          </div>
        </div>
      </div>

      {appointment.observations && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-600 mb-1">Observaciones</p>
          <p className="text-sm text-blue-900">{appointment.observations}</p>
        </div>
      )}

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Cambiar estado:</p>
        <StatusSelector
          currentStatus={appointment.status}
          onStatusChange={(status) => onStatusChange(appointment.id, status)}
        />
      </div>

      <div className="flex gap-2 pt-4 border-t">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onEdit(appointment)}
          className="flex-1"
        >
          <Edit className="h-4 w-4 mr-1" />
          Editar
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => onDelete(appointment)}
          className="flex-1"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Eliminar
        </Button>
      </div>
    </Card>
  )
}