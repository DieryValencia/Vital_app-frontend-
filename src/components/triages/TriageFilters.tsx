import { Search, Filter } from 'lucide-react'
import type { Priority } from '@/api/triages.types'
import { PRIORITY_LABELS } from '@/api/triages.types'

interface TriageFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  priorityFilter: Priority | 'all'
  onPriorityFilterChange: (value: Priority | 'all') => void
}

export const TriageFilters: React.FC<TriageFiltersProps> = ({
  searchTerm,
  onSearchChange,
  priorityFilter,
  onPriorityFilterChange
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por paciente..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onPriorityFilterChange('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            priorityFilter === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => onPriorityFilterChange('EMERGENCIA')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            priorityFilter === 'EMERGENCIA'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🔴 Emergencia
        </button>
        <button
          onClick={() => onPriorityFilterChange('URGENTE')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            priorityFilter === 'URGENTE'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🟠 Urgente
        </button>
      </div>
    </div>
  )
}