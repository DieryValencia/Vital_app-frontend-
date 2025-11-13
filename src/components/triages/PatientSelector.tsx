import { useState, useMemo } from 'react'
import { Search, User } from 'lucide-react'
import { usePatients } from '@/hooks/usePatients'
import { Spinner } from '@/components/ui/Spinner'
import { getFullName, calculateAge } from '@/utils/patientUtils'
import type { Patient } from '@/api/patients.types'

interface PatientSelectorProps {
  selectedPatientId?: number
  onSelect: (patient: Patient) => void
  error?: string
}

export const PatientSelector: React.FC<PatientSelectorProps> = ({
  selectedPatientId,
  onSelect,
  error
}) => {
  const { patients, isLoading } = usePatients()
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredPatients = useMemo(() => {
    if (!patients) return []
    if (!searchTerm) return patients

    return patients.filter((patient) =>
      getFullName(patient.firstName, patient.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.identificationNumber.includes(searchTerm)
    )
  }, [patients, searchTerm])

  const selectedPatient = patients?.find(p => p.id === selectedPatientId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Spinner size="sm" />
      </div>
    )
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Paciente *
      </label>

      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-3 py-2 border rounded-lg cursor-pointer flex items-center gap-2 ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${isOpen ? 'ring-2 ring-primary-500' : ''}`}
        >
          <User className="h-4 w-4 text-gray-400" />
          <span className={selectedPatient ? 'text-gray-900' : 'text-gray-400'}>
            {selectedPatient
              ? `${getFullName(selectedPatient.firstName, selectedPatient.lastName)} - ${selectedPatient.identificationNumber}`
              : 'Seleccione un paciente'}
          </span>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
            <div className="p-2 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar paciente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  autoFocus
                />
              </div>
            </div>

            <div className="max-h-48 overflow-y-auto">
              {filteredPatients.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No se encontraron pacientes
                </div>
              ) : (
                filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => {
                      onSelect(patient)
                      setIsOpen(false)
                      setSearchTerm('')
                    }}
                    className={`p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 ${
                      patient.id === selectedPatientId ? 'bg-primary-50' : ''
                    }`}
                  >
                    <p className="font-medium text-gray-900">{getFullName(patient.firstName, patient.lastName)}</p>
                    <p className="text-sm text-gray-500">
                      Doc: {patient.identificationNumber} · {calculateAge(patient.dateOfBirth)} años
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}