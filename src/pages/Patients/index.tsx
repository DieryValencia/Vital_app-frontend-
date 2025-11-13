import { useState } from 'react'
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { PatientCard } from '@/components/patients/PatientCard'
import { PatientModal } from '@/components/patients/PatientModal'
import { PatientForm } from '@/components/patients/PatientForm'
import { PatientDeleteDialog } from '@/components/patients/PatientDeleteDialog'
import { PatientFilters } from '@/components/patients/PatientFilters'
import { PatientDetailView } from '@/components/patients/PatientDetailView'
import { usePatients } from '@/hooks/usePatients'
import type { Patient, PatientCreateInput } from '@/api/patients.types'

export default function PatientsPage() {
  const [page, setPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [genderFilter, setGenderFilter] = useState('')
  
  const {
    patients,
    pageInfo,
    isLoading,
    createPatient,
    updatePatient,
    deletePatient,
    isCreating,
    isUpdating,
    isDeleting
  } = usePatients({
    page,
    size: 9,
    firstName: searchTerm,
    gender: genderFilter
  })

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  const handleCreate = () => {
    setSelectedPatient(null)
    setIsFormModalOpen(true)
  }

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient)
    setIsFormModalOpen(true)
  }

  const handleView = (patient: Patient) => {
    setSelectedPatient(patient)
    setIsDetailModalOpen(true)
  }

  const handleDelete = (patient: Patient) => {
    setSelectedPatient(patient)
    setIsDeleteDialogOpen(true)
  }

  const handleSubmit = (data: PatientCreateInput) => {
    if (selectedPatient) {
      updatePatient(
        { id: selectedPatient.id, data },
        {
          onSuccess: () => {
            setIsFormModalOpen(false)
            setSelectedPatient(null)
          }
        }
      )
    } else {
      createPatient(data, {
        onSuccess: () => {
          setIsFormModalOpen(false)
        }
      })
    }
  }

  const handleConfirmDelete = () => {
    if (selectedPatient) {
      deletePatient(selectedPatient.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false)
          setSelectedPatient(null)
        }
      })
    }
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setGenderFilter('')
    setPage(0)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-gray-600 mt-1">
            {pageInfo?.totalElements || 0} paciente{pageInfo?.totalElements !== 1 ? 's' : ''} registrado{pageInfo?.totalElements !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Paciente
        </Button>
      </div>

      {/* Filtros */}
      <PatientFilters
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value)
          setPage(0)
        }}
        genderFilter={genderFilter}
        onGenderFilterChange={(value) => {
          setGenderFilter(value)
          setPage(0)
        }}
        onClearFilters={handleClearFilters}
      />

      {/* Lista de Pacientes */}
      {patients.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay pacientes
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || genderFilter
              ? 'No se encontraron pacientes con los filtros aplicados'
              : 'Comienza agregando tu primer paciente'}
          </p>
          {!searchTerm && !genderFilter && (
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Primer Paciente
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            ))}
          </div>

          {/* Paginación */}
          {pageInfo && pageInfo.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600">
                Página {pageInfo.pageNumber + 1} de {pageInfo.totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={pageInfo.first}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={pageInfo.last}
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <PatientModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false)
          setSelectedPatient(null)
        }}
        title={selectedPatient ? 'Editar Paciente' : 'Nuevo Paciente'}
      >
        <PatientForm
          patient={selectedPatient || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormModalOpen(false)
            setSelectedPatient(null)
          }}
          isSubmitting={isCreating || isUpdating}
        />
      </PatientModal>

      <PatientModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedPatient(null)
        }}
        title="Detalles del Paciente"
      >
        {selectedPatient && <PatientDetailView patient={selectedPatient} />}
      </PatientModal>

      <PatientDeleteDialog
        patient={selectedPatient}
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setSelectedPatient(null)
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}