import api from './axios.config'
import type { Appointment, AppointmentCreateInput, AppointmentUpdateInput, AppointmentStatus } from './appointments.types'

export const appointmentsApi = {
  // Obtener todas las citas
  getAll: async (): Promise<Appointment[]> => {
    const { data } = await api.get('/api/appointments')
    return data
  },

  // Obtener cita por ID
  getById: async (id: number): Promise<Appointment> => {
    const { data } = await api.get(`/api/appointments/${id}`)
    return data
  },

  // Obtener citas de un paciente
  getByPatient: async (patientId: number): Promise<Appointment[]> => {
    const { data } = await api.get(`/api/appointments/patient/${patientId}`)
    return data
  },

  // Obtener citas por fecha
  getByDate: async (date: string): Promise<Appointment[]> => {
    const { data } = await api.get(`/api/appointments/date/${date}`)
    return data
  },

  // Crear cita
  create: async (appointment: AppointmentCreateInput): Promise<Appointment> => {
    const { data } = await api.post('/api/appointments', appointment)
    return data
  },

  // Actualizar cita
  update: async (id: number, appointment: AppointmentUpdateInput): Promise<Appointment> => {
    const { data } = await api.put(`/api/appointments/${id}`, appointment)
    return data
  },

  // Cambiar estado de cita
  updateStatus: async (id: number, status: AppointmentStatus): Promise<Appointment> => {
    const { data } = await api.patch(`/api/appointments/${id}/status`, { status })
    return data
  },

  // Eliminar cita
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/appointments/${id}`)
  },
}