import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { appointmentsApi } from '@/api/appointments.api'
import type { AppointmentCreateInput, AppointmentUpdateInput, AppointmentStatus } from '@/api/appointments.types'

export const useAppointments = () => {
  const queryClient = useQueryClient()

  // Obtener todas las citas
  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ['appointments'],
    queryFn: appointmentsApi.getAll,
  })

  // Crear cita
  const createMutation = useMutation({
    mutationFn: appointmentsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['appointments'],
        refetchType: 'all'
      })
      toast.success('Cita creada exitosamente')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al crear cita')
    },
  })

  // Actualizar cita
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: AppointmentUpdateInput }) =>
      appointmentsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['appointments'],
        refetchType: 'all'
      })
      toast.success('Cita actualizada exitosamente')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al actualizar cita')
    },
  })

  // Cambiar estado de cita
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: AppointmentStatus }) =>
      appointmentsApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['appointments'],
        refetchType: 'all'
      })
      toast.success('Estado actualizado')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al actualizar estado')
    },
  })

  // Eliminar cita
  const deleteMutation = useMutation({
    mutationFn: appointmentsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['appointments'],
        refetchType: 'all'
      })
      toast.success('Cita eliminada')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al eliminar cita')
    },
  })

  return {
    appointments,
    isLoading,
    error,
    createAppointment: createMutation.mutate,
    updateAppointment: updateMutation.mutate,
    updateAppointmentStatus: updateStatusMutation.mutate,
    deleteAppointment: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}

// Hook para obtener una cita por ID
export const useAppointment = (id: number) => {
  return useQuery({
    queryKey: ['appointments', id],
    queryFn: () => appointmentsApi.getById(id),
    enabled: !!id,
  })
}

// Hook para obtener citas de un paciente
export const usePatientAppointments = (patientId: number) => {
  return useQuery({
    queryKey: ['appointments', 'patient', patientId],
    queryFn: () => appointmentsApi.getByPatient(patientId),
    enabled: !!patientId,
  })
}

// Hook para obtener citas por fecha
export const useAppointmentsByDate = (date: string) => {
  return useQuery({
    queryKey: ['appointments', 'date', date],
    queryFn: () => appointmentsApi.getByDate(date),
    enabled: !!date,
  })
}