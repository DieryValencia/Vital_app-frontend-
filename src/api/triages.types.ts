import type { Patient } from './patients.types'

export type Priority = 'EMERGENCIA' | 'URGENTE' | 'MENOS_URGENTE' | 'NO_URGENTE'
export type SeverityLevel = 1 | 2 | 3 | 4 | 5

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
  severityLevel: SeverityLevel
  recommendedAction: string
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
  severityLevel: SeverityLevel
  recommendedAction: string
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
  severityLevel?: SeverityLevel
  recommendedAction?: string
  observations?: string
}