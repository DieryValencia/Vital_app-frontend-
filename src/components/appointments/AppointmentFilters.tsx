import { Search, Calendar } from 'lucide-react'
import type { AppointmentStatus } from '@/api/appointments.types'
import { STATUS_LABELS } from '@/api/appointments.types'

interface AppointmentFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: AppointmentStatus | 'all'
  onStatusFilterChange: (value: AppointmentStatus | 'all') => void
  dateFilter: string
  onDateFilterChange: (value: string) => void
}

export const AppointmentFilters: React.FC<AppointmentFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  dateFilter,
  onDateFilterChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por paciente o doctor..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => onDateFilterChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          {dateFilter && (
            <button
              onClick={() => onDateFilterChange('')}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onStatusFilterChange('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            statusFilter === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => onStatusFilterChange('PENDIENTE')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            statusFilter === 'PENDIENTE'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ⏳ Pendientes
        </button>
        <button
          onClick={() => onStatusFilterChange('CONFIRMADA')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            statusFilter === 'CONFIRMADA'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ✅ Confirmadas
        </button>
        <button
          onClick={() => onStatusFilterChange('COMPLETADA')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            statusFilter === 'COMPLETADA'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ✔️ Completadas
        </button>
        <button
          onClick={() => onStatusFilterChange('CANCELADA')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            statusFilter === 'CANCELADA'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ❌ Canceladas
        </button>
      </div>
    </div>
  )
}