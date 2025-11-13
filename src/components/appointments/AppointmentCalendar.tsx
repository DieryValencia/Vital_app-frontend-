import { useMemo } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Appointment } from '@/api/appointments.types'

interface AppointmentCalendarProps {
  appointments: Appointment[]
  currentDate: Date
  onDateChange: (date: Date) => void
  onDateSelect: (date: Date) => void
}

export const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  appointments,
  currentDate,
  onDateChange,
  onDateSelect
}) => {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const appointmentsByDate = useMemo(() => {
    const map = new Map<string, number>()
    appointments.forEach((appointment) => {
      const date = format(new Date(appointment.appointmentDate), 'yyyy-MM-dd')
      map.set(date, (map.get(date) || 0) + 1)
    })
    return map
  }, [appointments])

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() - 1)
    onDateChange(newDate)
  }

  const goToNextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + 1)
    onDateChange(newDate)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold capitalize">
          {format(currentDate, 'MMMM yyyy', { locale: es })}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}

        {days.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd')
          const appointmentCount = appointmentsByDate.get(dateStr) || 0
          const isPast = isBefore(day, startOfDay(new Date()))

          return (
            <button
              key={day.toString()}
              onClick={() => !isPast && onDateSelect(day)}
              disabled={isPast}
              className={`
                relative p-2 rounded-lg text-sm transition-all
                ${isToday(day) ? 'bg-primary-100 font-bold' : ''}
                ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
                ${appointmentCount > 0 && !isPast ? 'bg-blue-50' : ''}
              `}
            >
              {format(day, 'd')}
              {appointmentCount > 0 && !isPast && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary-600 rounded-full" />
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary-100 rounded" />
            <span>Hoy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-50 rounded" />
            <span>Con citas</span>
          </div>
        </div>
      </div>
    </div>
  )
}