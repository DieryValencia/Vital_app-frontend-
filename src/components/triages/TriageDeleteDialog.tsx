import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getFullName } from '@/utils/patientUtils'
import type { Triage } from '@/api/triages.types'

interface TriageDeleteDialogProps {
  triage: Triage | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isDeleting: boolean
}

export const TriageDeleteDialog: React.FC<TriageDeleteDialogProps> = ({
  triage,
  isOpen,
  onClose,
  onConfirm,
  isDeleting
}) => {
  if (!isOpen || !triage || !triage.patient) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Eliminar Triaje</h3>
            <p className="text-sm text-gray-600">Esta acción no se puede deshacer</p>
          </div>
        </div>

        <p className="text-gray-700 mb-6">
          ¿Estás seguro de que deseas eliminar el triaje del paciente{' '}
          <strong>{getFullName(triage.patient.firstName, triage.patient.lastName)}</strong>?
        </p>

        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={isDeleting}
          >
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  )
}