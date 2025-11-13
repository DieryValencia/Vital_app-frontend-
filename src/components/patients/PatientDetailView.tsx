import { User, Calendar, Phone, Mail, MapPin, Heart, AlertCircle, Activity } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { Patient } from '@/api/patients.types'
import { formatDate, calculateAge, getGenderLabel, getBloodTypeLabel, getFullName } from '@/utils/patientUtils'

interface PatientDetailViewProps {
  patient: Patient
}

export const PatientDetailView: React.FC<PatientDetailViewProps> = ({ patient }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
          <User className="h-10 w-10 text-primary-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {getFullName(patient.firstName, patient.lastName)}
          </h2>
          <p className="text-gray-600">
            {getGenderLabel(patient.gender)} · {calculateAge(patient.dateOfBirth)} años
          </p>
        </div>
      </div>

      {/* Información Personal */}
      <Card>
        <h3 className="font-semibold text-lg mb-4">Información Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Documento de Identidad</p>
              <p className="font-medium">{patient.identificationNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
              <p className="font-medium">{formatDate(patient.dateOfBirth)}</p>
            </div>
          </div>

          {patient.phoneNumber && (
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-medium">{patient.phoneNumber}</p>
              </div>
            </div>
          )}

          {patient.email && (
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{patient.email}</p>
              </div>
            </div>
          )}

          {patient.address && (
            <div className="flex items-center gap-3 md:col-span-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Dirección</p>
                <p className="font-medium">{patient.address}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Información Médica */}
      <Card>
        <h3 className="font-semibold text-lg mb-4">Información Médica</h3>
        <div className="space-y-4">
          {patient.bloodType && (
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-500">Tipo de Sangre</p>
                <p className="font-medium">{getBloodTypeLabel(patient.bloodType)}</p>
              </div>
            </div>
          )}

          {patient.allergies && (
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Alergias</p>
                <p className="font-medium text-orange-700">{patient.allergies}</p>
              </div>
            </div>
          )}

          {patient.medicalConditions && (
            <div className="flex items-start gap-3">
              <Activity className="h-5 w-5 text-blue-500 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Condiciones Médicas</p>
                <p className="font-medium">{patient.medicalConditions}</p>
              </div>
            </div>
          )}

          {!patient.allergies && !patient.medicalConditions && !patient.bloodType && (
            <p className="text-gray-500 text-sm">No hay información médica registrada</p>
          )}
        </div>
      </Card>

      {/* Metadatos */}
      <Card className="bg-gray-50">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Fecha de Registro</p>
            <p className="font-medium">{formatDate(patient.createdAt)}</p>
          </div>
          <div>
            <p className="text-gray-500">Última Actualización</p>
            <p className="font-medium">{formatDate(patient.updatedAt)}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}