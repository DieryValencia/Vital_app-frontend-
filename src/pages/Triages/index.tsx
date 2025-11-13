import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { TriageList } from '@/components/triages/TriageList'
import { TriageModal } from '@/components/triages/TriageModal'
import { TriageForm } from '@/components/triages/TriageForm'
import { TriageDeleteDialog } from '@/components/triages/TriageDeleteDialog'
import { TriageFilters } from '@/components/triages/TriageFilters'
import { useTriages } from '@/hooks/useTriages'
import { getFullName } from '@/utils/patientUtils'
import type { Triage, TriageCreateInput, Priority } from '@/api/triages.types'

export default function TriagesPage() {
  const {
    triages,
    isLoading,
    createTriage,
    updateTriage,
    deleteTriage,
    isCreating,
    isUpdating,
    isDeleting
  } = useTriages()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTriage, setSelectedTriage] = useState<Triage | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all')

  // Filtrar triajes
  const filteredTriages = useMemo(() => {
    if (!triages) return []

    return triages.filter((triage) => {
      // Filtro de búsqueda
      const matchesSearch =
        getFullName(triage.patient.firstName, triage.patient.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
        triage.patient.identificationNumber.includes(searchTerm)

      // Filtro de prioridad
      const matchesPriority =
        priorityFilter === 'all' || triage.priority === priorityFilter

      return matchesSearch && matchesPriority
    })
  }, [triages, searchTerm, priorityFilter])

  // Ordenar por prioridad (Emergencia primero)
  const sortedTriages = useMemo(() => {
    const priorityOrder = {
      'EMERGENCIA': 1,
      'URGENTE': 2,
      'MENOS_URGENTE': 3,
      'NO_URGENTE': 4,
    }

    return [...filteredTriages].sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
  }, [filteredTriages])

  const handleCreate = () => {
    setSelectedTriage(null)
    setIsModalOpen(true)
  }

  const handleEdit = (triage: Triage) => {
    setSelectedTriage(triage)
    setIsModalOpen(true)
  }

  const handleDelete = (triage: Triage) => {
    setSelectedTriage(triage)
    setIsDeleteDialogOpen(true)
  }

  const handleSubmit = (data: TriageCreateInput) => {
    if (selectedTriage) {
      updateTriage(
        { id: selectedTriage.id, data },
        {
          onSuccess: () => {
            setIsModalOpen(false)
            setSelectedTriage(null)
          }
        }
      )
    } else {
      createTriage(data, {
        onSuccess: () => {
          setIsModalOpen(false)
        }
      })
    }
  }

  const handleConfirmDelete = () => {
    if (selectedTriage) {
      deleteTriage(selectedTriage.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false)
          setSelectedTriage(null)
        }
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Triajes</h1>
          <p className="text-gray-600 mt-1">
            {sortedTriages.length} triaje{sortedTriages.length !== 1 ? 's' : ''} encontrado{sortedTriages.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Triaje
        </Button>
      </div>

      <div className="mb-6">
        <TriageFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
        />
      </div>

      {sortedTriages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron triajes</p>
          <Button onClick={handleCreate} className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Crear primer triaje
          </Button>
        </div>
      ) : (
        <TriageList
          triages={sortedTriages}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Modal para crear/editar */}
      <TriageModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTriage(null)
        }}
        title={selectedTriage ? 'Editar Triaje' : 'Nuevo Triaje'}
      >
        <TriageForm
          triage={selectedTriage || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setSelectedTriage(null)
          }}
          isSubmitting={isCreating || isUpdating}
        />
      </TriageModal>

      {/* Dialog para confirmar eliminación */}
      <TriageDeleteDialog
        triage={selectedTriage}
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setSelectedTriage(null)
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}