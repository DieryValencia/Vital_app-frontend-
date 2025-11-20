import { useAuthStore } from '@/store/authStore'
import { usePatientTriages } from '@/hooks/useTriages'
import { Spinner } from '@/components/ui/Spinner'
import { TriageList } from '@/components/triages/TriageList'
import { getFullName } from '@/utils/patientUtils'

export default function MyTriagesPage() {
  const { user } = useAuthStore()
  const { data: triages, isLoading } = usePatientTriages(user?.id!)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Mis Triajes</h1>
        <p className="text-gray-600 mt-1">
          {triages?.length || 0} triaje{(triages?.length || 0) !== 1 ? 's' : ''} encontrado{(triages?.length || 0) !== 1 ? 's' : ''}
        </p>
      </div>

      {triages && triages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tienes triajes registrados</p>
        </div>
      ) : (
        <TriageList
          triages={triages || []}
          onEdit={() => {}} // No permitir editar
          onDelete={() => {}} // No permitir eliminar
        />
      )}
    </div>
  )
}