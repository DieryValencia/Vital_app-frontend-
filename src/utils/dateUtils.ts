import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export const formatDateTime = (date: string | Date): string => {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, "dd/MM/yyyy 'a las' HH:mm", { locale: es })
}