import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Appointment } from '@/api/appointments.types'

interface AppointmentDeleteDialogProps {
  appointment: Appointment | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isDeleting: boolean
}

export const AppointmentDeleteDialog: React.FC<AppointmentDeleteDialogProps> = ({
  appointment,
  isOpen,
  onClose,
  onConfirm,
  isDeleting
}) => {
  if (!isOpen || !appointment || !appointment.patient) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative z-10 bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Eliminar Cita</h3>
            <p className="text-sm text-gray-600">Esta acción no se puede deshacer</p>
          </div>
        </div>

        <p className="text-gray-700 mb-6">
          ¿Estás seguro de que deseas eliminar la cita del paciente{' '}
          <strong>{appointment.patient.firstName} {appointment.patient.lastName}</strong> programada para{' '}
          <strong>{new Date(appointment.appointmentDate).toLocaleDateString()}</strong>?
        </p>

        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={isDeleting}
          >
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  )
}