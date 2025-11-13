import { Search, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface PatientFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  genderFilter: string
  onGenderFilterChange: (value: string) => void
  onClearFilters: () => void
}

export const PatientFilters: React.FC<PatientFiltersProps> = ({
  searchTerm,
  onSearchChange,
  genderFilter,
  onGenderFilterChange,
  onClearFilters
}) => {
  const hasActiveFilters = searchTerm || genderFilter

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <h3 className="font-medium text-gray-900">Filtros</h3>
        {hasActiveFilters && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onClearFilters}
            className="ml-auto"
          >
            <X className="h-4 w-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Búsqueda por nombre */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar por nombre o documento
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Filtro de género */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Género
          </label>
          <select
            value={genderFilter}
            onChange={(e) => onGenderFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Todos</option>
            <option value="MALE">Masculino</option>
            <option value="FEMALE">Femenino</option>
            <option value="OTHER">Otro</option>
          </select>
        </div>
      </div>
    </div>
  )
}