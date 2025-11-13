import { User, Calendar, FileText, Edit, Trash2, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PriorityBadge } from './PriorityBadge'
import { VitalSignsDisplay } from './VitalSignsDisplay'
import { getFullName } from '@/utils/patientUtils'
import { formatDateTime } from '@/utils/dateUtils'
import type { Triage } from '@/api/triages.types'

interface TriageCardProps {
  triage: Triage
  onEdit: (triage: Triage) => void
  onDelete: (triage: Triage) => void
}

export const TriageCard: React.FC<TriageCardProps> = ({ triage, onEdit, onDelete }) => {
  // Validar que el paciente existe
  if (!triage.patient) {
    return (
      <Card className="opacity-50">
        <p className="text-gray-500 text-center py-4">Datos de paciente no disponibles</p>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
            <User className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{getFullName(triage.patient.firstName, triage.patient.lastName)}</h3>
            <p className="text-sm text-gray-500">
              Doc: {triage.patient.identificationNumber}
            </p>
          </div>
        </div>

        <PriorityBadge priority={triage.priority} />
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{formatDateTime(triage.triageDate)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Atendido por: {triage.attendedBy}</span>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Síntomas</p>
              <p className="text-sm text-gray-700">{triage.symptoms}</p>
            </div>
          </div>
        </div>
      </div>

      <VitalSignsDisplay triage={triage} layout="list" />

      {triage.observations && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-600 mb-1">Observaciones</p>
          <p className="text-sm text-blue-900">{triage.observations}</p>
        </div>
      )}

      <div className="flex gap-2 mt-4 pt-4 border-t">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onEdit(triage)}
          className="flex-1"
        >
          <Edit className="h-4 w-4 mr-1" />
          Editar
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => onDelete(triage)}
          className="flex-1"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Eliminar
        </Button>
      </div>
    </Card>
  )
}