import type { Patient } from './patients.types'

export type Priority = 'EMERGENCIA' | 'URGENTE' | 'MENOS_URGENTE' | 'NO_URGENTE'

export interface Triage {
  id: number
  patient: Patient
  triageDate: string
  symptoms: string
  temperature: number
  bloodPressure: string
  heartRate: number
  respiratoryRate: number
  oxygenSaturation: number
  priority: Priority
  observations?: string
  attendedBy: string
}

export interface TriageCreateInput {
  patientId: number
  triageDate: string
  symptoms: string
  temperature: number
  bloodPressure: string
  heartRate: number
  respiratoryRate: number
  oxygenSaturation: number
  priority: Priority
  observations?: string
}

export interface TriageUpdateInput {
  symptoms?: string
  temperature?: number
  bloodPressure?: string
  heartRate?: number
  respiratoryRate?: number
  oxygenSaturation?: number
  priority?: Priority
  observations?: string
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  EMERGENCIA: 'Emergencia',
  URGENTE: 'Urgente',
  MENOS_URGENTE: 'Menos Urgente',
  NO_URGENTE: 'No Urgente',
}

export const PRIORITY_COLORS: Record<Priority, string> = {
  EMERGENCIA: 'bg-red-100 text-red-800 border-red-300',
  URGENTE: 'bg-orange-100 text-orange-800 border-orange-300',
  MENOS_URGENTE: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  NO_URGENTE: 'bg-green-100 text-green-800 border-green-300',
}

export const PRIORITY_ICON_COLORS: Record<Priority, string> = {
  EMERGENCIA: 'text-red-600',
  URGENTE: 'text-orange-600',
  MENOS_URGENTE: 'text-yellow-600',
  NO_URGENTE: 'text-green-600',
}