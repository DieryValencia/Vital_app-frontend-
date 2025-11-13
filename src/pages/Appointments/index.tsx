import { useState, useMemo } from 'react'
import { Plus, Calendar as CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { AppointmentList } from '@/components/appointments/AppointmentList'
import { AppointmentModal } from '@/components/appointments/AppointmentModal'
import { AppointmentForm } from '@/components/appointments/AppointmentForm'
import { AppointmentDeleteDialog } from '@/components/appointments/AppointmentDeleteDialog'
import { AppointmentFilters } from '@/components/appointments/AppointmentFilters'
import { AppointmentCalendar } from '@/components/appointments/AppointmentCalendar'
import { useAppointments } from '@/hooks/useAppointments'
import type { Appointment, AppointmentCreateInput, AppointmentStatus } from '@/api/appointments.types'
import { format } from 'date-fns'

export default function AppointmentsPage() {
  const {
    appointments,
    isLoading,
    createAppointment,
    updateAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    isCreating,
    isUpdating,
    isDeleting
  } = useAppointments()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all')
  const [dateFilter, setDateFilter] = useState('')
  const [showCalendar, setShowCalendar] = useState(false)
  const [calendarDate, setCalendarDate] = useState(new Date())

  // Filtrar citas
  const filteredAppointments = useMemo(() => {
    if (!appointments) return []

    return appointments.filter((appointment) => {
      // Filtro de búsqueda
      const matchesSearch =
        appointment.patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtro de estado
      const matchesStatus =
        statusFilter === 'all' || appointment.status === statusFilter

      // Filtro de fecha
      const matchesDate =
        !dateFilter ||
        format(new Date(appointment.appointmentDate), 'yyyy-MM-dd') === dateFilter

      return matchesSearch && matchesStatus && matchesDate
    })
  }, [appointments, searchTerm, statusFilter, dateFilter])

  // Ordenar por fecha (más próximas primero)
  const sortedAppointments = useMemo(() => {
    return [...filteredAppointments].sort((a, b) => {
      return new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime()
    })
  }, [filteredAppointments])

  const handleCreate = () => {
    setSelectedAppointment(null)
    setIsModalOpen(true)
  }

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsModalOpen(true)
  }

  const handleDelete = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsDeleteDialogOpen(true)
  }

  const handleSubmit = (data: AppointmentCreateInput) => {
    if (selectedAppointment) {
      updateAppointment(
        { id: selectedAppointment.id, data },
        {
          onSuccess: () => {
            setIsModalOpen(false)
            setSelectedAppointment(null)
          }
        }
      )
    } else {
      createAppointment(data, {
        onSuccess: () => {
          setIsModalOpen(false)
        }
      })
    }
  }

  const handleStatusChange = (id: number, status: AppointmentStatus) => {
    updateAppointmentStatus({ id, status })
  }

  const handleConfirmDelete = () => {
    if (selectedAppointment) {
      deleteAppointment(selectedAppointment.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false)
          setSelectedAppointment(null)
        }
      })
    }
  }

  const handleDateSelect = (date: Date) => {
    setDateFilter(format(date, 'yyyy-MM-dd'))
    setShowCalendar(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Citas</h1>
          <p className="text-gray-600 mt-1">
            {sortedAppointments.length} cita{sortedAppointments.length !== 1 ? 's' : ''} encontrada{sortedAppointments.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            {showCalendar ? 'Ocultar' : 'Ver'} Calendario
          </Button>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Cita
          </Button>
        </div>
      </div>

      {showCalendar && (
        <div className="mb-6">
          <AppointmentCalendar
            appointments={appointments || []}
            currentDate={calendarDate}
            onDateChange={setCalendarDate}
            onDateSelect={handleDateSelect}
          />
        </div>
      )}

      <div className="mb-6">
        <AppointmentFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
        />
      </div>

      {sortedAppointments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron citas</p>
          <Button onClick={handleCreate} className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Crear primera cita
          </Button>
        </div>
      ) : (
        <AppointmentList
          appointments={sortedAppointments}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Modal para crear/editar */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedAppointment(null)
        }}
        title={selectedAppointment ? 'Editar Cita' : 'Nueva Cita'}
      >
        <AppointmentForm
          appointment={selectedAppointment || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setSelectedAppointment(null)
          }}
          isSubmitting={isCreating || isUpdating}
        />
      </AppointmentModal>

      {/* Dialog para confirmar eliminación */}
      <AppointmentDeleteDialog
        appointment={selectedAppointment}
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setSelectedAppointment(null)
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}