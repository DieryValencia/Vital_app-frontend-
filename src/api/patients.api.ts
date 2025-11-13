import api from './axios.config'
import type { Patient, PatientCreateInput, PatientUpdateInput, PageResponse } from './patients.types'

export const patientsApi = {
  // Obtener todos los pacientes con paginación
  getAll: async (params?: {
    page?: number
    size?: number
    sortBy?: string
    sortDirection?: string
    firstName?: string
    lastName?: string
    gender?: string
  }): Promise<PageResponse<Patient>> => {
    const { data } = await api.get('/api/patients', { params })
    return data
  },

  // Obtener paciente por ID
  getById: async (id: number): Promise<Patient> => {
    const { data } = await api.get(`/api/patients/${id}`)
    return data
  },

  // Crear paciente
  create: async (patient: PatientCreateInput): Promise<Patient> => {
    const { data } = await api.post('/api/patients', patient)
    return data
  },

  // Actualizar paciente
  update: async (id: number, patient: PatientUpdateInput): Promise<Patient> => {
    const { data } = await api.put(`/api/patients/${id}`, patient)
    return data
  },

  // Eliminar paciente
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/patients/${id}`)
  },
}