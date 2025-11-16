import type { Patient } from './patients.types'

export type AppointmentStatus = 'PENDIENTE' | 'CONFIRMADA' | 'COMPLETADA' | 'CANCELADA'

export interface Appointment {
  id: number
  patient: Patient
  appointmentDate: string
  reason: string
  status: AppointmentStatus
  doctorName: string
  specialty: string
  observations?: string
  createdBy: string
}

export interface AppointmentCreateInput {
  patientId: number
  appointmentDate: string
  reason: string
  doctorName: string
  specialty: string
  observations?: string
}

export interface AppointmentUpdateInput {
  appointmentDate?: string
  reason?: string
  doctorName?: string
  specialty?: string
  observations?: string
  status?: AppointmentStatus
}