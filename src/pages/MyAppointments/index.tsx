import { useAuthStore } from '@/store/authStore'
import { usePatientAppointments } from '@/hooks/useAppointments'
import { Spinner } from '@/components/ui/Spinner'
import { AppointmentList } from '@/components/appointments/AppointmentList'

export default function MyAppointmentsPage() {
  const { user } = useAuthStore()
  const { data: appointments, isLoading } = usePatientAppointments(user?.id!)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Mis Citas</h1>
        <p className="text-gray-600 mt-1">
          {appointments?.length || 0} cita{(appointments?.length || 0) !== 1 ? 's' : ''} encontrado{(appointments?.length || 0) !== 1 ? 's' : ''}
        </p>
      </div>

      {appointments && appointments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tienes citas programadas</p>
        </div>
      ) : (
        <AppointmentList
          appointments={appointments || []}
          onEdit={() => {}} // No permitir editar
          onDelete={() => {}} // No permitir eliminar
          onStatusChange={() => {}} // No permitir cambiar estado
        />
      )}
    </div>
  )
}