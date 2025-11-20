import { useState } from 'react'
import { Pill, Send, RotateCcw, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAI } from '@/hooks/useAI'
import { Card } from '@/components/ui/Card'

export const MedicalRecommendations: React.FC = () => {
  const [symptoms, setSymptoms] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [patientAge, setPatientAge] = useState('')
  const [patientGender, setPatientGender] = useState('')
  const [medicalHistory, setMedicalHistory] = useState('')
  const [currentMedications, setCurrentMedications] = useState('')

  const {
    getMedicalRecommendations,
    medicalRecommendationsData,
    isGettingRecommendations,
    resetMedicalRecommendations,
  } = useAI()

  const handleGetRecommendations = () => {
    if (!symptoms.trim()) {
      alert('Por favor ingresa los síntomas')
      return
    }
    getMedicalRecommendations({
      symptoms: symptoms.trim(),
      diagnosis: diagnosis.trim() || undefined,
      patientAge: patientAge.trim() || undefined,
      patientGender: patientGender.trim() || undefined,
      medicalHistory: medicalHistory.trim() || undefined,
      currentMedications: currentMedications.trim() || undefined,
    })
  }

  const handleReset = () => {
    setSymptoms('')
    setDiagnosis('')
    setPatientAge('')
    setPatientGender('')
    setMedicalHistory('')
    setCurrentMedications('')
    resetMedicalRecommendations()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
          <Pill className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recomendaciones Médicas IA</h1>
          <p className="text-gray-600">Powered by Groq</p>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Síntomas
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Ej: Dolor de cabeza persistente, fiebre de 38°C..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isGettingRecommendations}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Edad del paciente
              </label>
              <input
                type="number"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                placeholder="Ej: 45"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isGettingRecommendations}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Género del paciente
              </label>
              <select
                value={patientGender}
                onChange={(e) => setPatientGender(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isGettingRecommendations}
              >
                <option value="">Seleccionar...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diagnóstico preliminar (opcional)
              </label>
              <input
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Ej: Posible neumonía"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isGettingRecommendations}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Historial Médico (opcional)
            </label>
            <textarea
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              placeholder="Ej: Diabetes tipo 2, hipertensión..."
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isGettingRecommendations}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medicamentos actuales (opcional)
            </label>
            <textarea
              value={currentMedications}
              onChange={(e) => setCurrentMedications(e.target.value)}
              placeholder="Ej: Metformina 500mg, Losartán 50mg"
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isGettingRecommendations}
            />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleGetRecommendations}
              isLoading={isGettingRecommendations}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Generar Recomendaciones
            </Button>
            <Button
              onClick={handleReset}
              variant="secondary"
              disabled={isGettingRecommendations}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Response */}
          {medicalRecommendationsData && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-green-900">Recomendaciones Médicas</h3>
                  <div className="text-green-800 mt-2 space-y-2">
                    <p><strong>Plan de tratamiento:</strong> {medicalRecommendationsData.data.treatmentPlan}</p>
                    <p><strong>Medicamentos:</strong> {medicalRecommendationsData.data.medications}</p>
                    <p><strong>Recomendaciones de estilo de vida:</strong> {medicalRecommendationsData.data.lifestyleRecommendations}</p>
                    <p><strong>Instrucciones de seguimiento:</strong> {medicalRecommendationsData.data.followUpInstructions}</p>
                    <p><strong>Cuándo buscar ayuda:</strong> {medicalRecommendationsData.data.whenToSeekHelp}</p>
                    <p className="text-gray-600 italic text-sm">{medicalRecommendationsData.data.disclaimer}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Info */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
        <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-semibold">Nota importante</p>
          <p>
            Estas recomendaciones son generadas por IA y no reemplazan el juicio médico profesional.
            Siempre consulta con un médico calificado para diagnósticos y tratamientos.
          </p>
        </div>
      </div>
    </div>
  )
}