import { User, Phone, Mail, MapPin, Calendar, Edit, Trash2, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import type { Patient } from '@/api/patients.types'
import { formatDate, calculateAge, getGenderLabel, getBloodTypeLabel, getFullName } from '@/utils/patientUtils'

interface PatientCardProps {
  patient: Patient
  onEdit: (patient: Patient) => void
  onDelete: (patient: Patient) => void
  onView: (patient: Patient) => void
}

export const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onEdit,
  onDelete,
  onView
}) => {
  return (
    <div className="cursor-pointer" onClick={() => onView(patient)}>
      <Card className="hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
            <User className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              {getFullName(patient.firstName, patient.lastName)}
            </h3>
            <p className="text-sm text-gray-500">
              {getGenderLabel(patient.gender)} · {calculateAge(patient.dateOfBirth)} años
            </p>
          </div>
        </div>

        {patient.bloodType && (
          <div className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full">
            <Heart className="h-3 w-3" />
            {getBloodTypeLabel(patient.bloodType)}
          </div>
        )}
      </div>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <User className="h-4 w-4" />
          <span>ID: {patient.identificationNumber}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(patient.dateOfBirth)}</span>
        </div>

        {patient.phoneNumber && (
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="h-4 w-4" />
            <span>{patient.phoneNumber}</span>
          </div>
        )}

        {patient.email && (
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="h-4 w-4" />
            <span className="truncate">{patient.email}</span>
          </div>
        )}

        {patient.address && (
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{patient.address}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4 border-t" onClick={(e) => e.stopPropagation()}>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onEdit(patient)}
          className="flex-1"
        >
          <Edit className="h-4 w-4 mr-1" />
          Editar
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => onDelete(patient)}
          className="flex-1"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Eliminar
        </Button>
      </div>
    </Card>
    </div>
  )
}