import { Search } from 'lucide-react'
import type { NotificationType } from '@/api/notifications.types'
import { TYPE_LABELS } from '@/api/notifications.types'

interface NotificationFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  typeFilter: NotificationType | 'all'
  onTypeFilterChange: (value: NotificationType | 'all') => void
  readFilter: 'all' | 'read' | 'unread'
  onReadFilterChange: (value: 'all' | 'read' | 'unread') => void
}

export const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  readFilter,
  onReadFilterChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar notificaciones..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => onTypeFilterChange('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              typeFilter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todos los tipos
          </button>
          <button
            onClick={() => onTypeFilterChange('INFO')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              typeFilter === 'INFO'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ℹ️ {TYPE_LABELS.INFO}
          </button>
          <button
            onClick={() => onTypeFilterChange('SUCCESS')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              typeFilter === 'SUCCESS'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ✅ {TYPE_LABELS.SUCCESS}
          </button>
          <button
            onClick={() => onTypeFilterChange('WARNING')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              typeFilter === 'WARNING'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⚠️ {TYPE_LABELS.WARNING}
          </button>
          <button
            onClick={() => onTypeFilterChange('ERROR')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              typeFilter === 'ERROR'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ❌ {TYPE_LABELS.ERROR}
          </button>
        </div>

        <div className="border-l border-gray-300 mx-2"></div>

        <div className="flex gap-2">
          <button
            onClick={() => onReadFilterChange('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              readFilter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => onReadFilterChange('unread')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              readFilter === 'unread'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            No leídas
          </button>
          <button
            onClick={() => onReadFilterChange('read')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              readFilter === 'read'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Leídas
          </button>
        </div>
      </div>
    </div>
  )
}