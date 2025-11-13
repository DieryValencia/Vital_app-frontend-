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

export const STATUS_LABELS: Record<AppointmentStatus, string> = {
  PENDIENTE: 'Pendiente',
  CONFIRMADA: 'Confirmada',
  COMPLETADA: 'Completada',
  CANCELADA: 'Cancelada',
}

export const STATUS_COLORS: Record<AppointmentStatus, string> = {
  PENDIENTE: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  CONFIRMADA: 'bg-blue-100 text-blue-800 border-blue-300',
  COMPLETADA: 'bg-green-100 text-green-800 border-green-300',
  CANCELADA: 'bg-red-100 text-red-800 border-red-300',
}

export const STATUS_ICON_COLORS: Record<AppointmentStatus, string> = {
  PENDIENTE: 'text-yellow-600',
  CONFIRMADA: 'text-blue-600',
  COMPLETADA: 'text-green-600',
  CANCELADA: 'text-red-600',
}