import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Patient } from '@/api/patients.types'
import { getFullName } from '@/utils/patientUtils'

interface PatientDeleteDialogProps {
  patient: Patient | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isDeleting: boolean
}

export const PatientDeleteDialog: React.FC<PatientDeleteDialogProps> = ({
  patient,
  isOpen,
  onClose,
  onConfirm,
  isDeleting
}) => {
  if (!isOpen || !patient) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative z-10 bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Eliminar Paciente</h3>
            <p className="text-sm text-gray-600">Esta acción no se puede deshacer</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-gray-700">
            ¿Estás seguro de que deseas eliminar al paciente?
          </p>
          <p className="font-semibold text-gray-900 mt-2">
            {getFullName(patient.firstName, patient.lastName)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            ID: {patient.identificationNumber}
          </p>
        </div>

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
            Eliminar Paciente
          </Button>
        </div>
      </div>
    </div>
  )
}