import api from './axios.config'
import type { Triage, TriageCreateInput, TriageUpdateInput } from './triages.types'

export const triagesApi = {
  // Obtener todos los triajes
  getAll: async (): Promise<Triage[]> => {
    const { data } = await api.get('/api/triages')
    return data
  },

  // Obtener triaje por ID
  getById: async (id: number): Promise<Triage> => {
    const { data } = await api.get(`/api/triages/${id}`)
    return data
  },

  // Obtener triajes de un paciente
  getByPatient: async (patientId: number): Promise<Triage[]> => {
    const { data } = await api.get(`/api/triages/patient/${patientId}`)
    return data
  },

  // Crear triaje
  create: async (triage: TriageCreateInput): Promise<Triage> => {
    const { data } = await api.post('/api/triages', triage)
    return data
  },

  // Actualizar triaje
  update: async (id: number, triage: TriageUpdateInput): Promise<Triage> => {
    const { data } = await api.put(`/api/triages/${id}`, triage)
    return data
  },

  // Eliminar triaje
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/triages/${id}`)
  },
}