import { format, parseISO, differenceInYears } from 'date-fns'
import { es } from 'date-fns/locale'
import type { Gender, BloodType } from '@/api/patients.types'

export const formatDate = (date: string | Date): string => {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'dd/MM/yyyy', { locale: es })
}

export const calculateAge = (birthDate: string): number => {
  if (!birthDate) return 0
  return differenceInYears(new Date(), parseISO(birthDate))
}

export const formatDateForInput = (date: string | Date): string => {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'yyyy-MM-dd')
}

export const getGenderLabel = (gender: Gender): string => {
  const labels: Record<Gender, string> = {
    MALE: 'Masculino',
    FEMALE: 'Femenino',
    OTHER: 'Otro'
  }
  return labels[gender] || gender
}

export const getBloodTypeLabel = (bloodType: BloodType): string => {
  return bloodType.replace('_POSITIVE', '+').replace('_NEGATIVE', '-')
}

export const getFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`
}