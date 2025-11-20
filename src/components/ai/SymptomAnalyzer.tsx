import { useState } from 'react'
import { Brain, Send, RotateCcw, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAI } from '@/hooks/useAI'
import { Card } from '@/components/ui/Card'

export const SymptomAnalyzer: React.FC = () => {
  const [symptoms, setSymptomsInput] = useState('')
  const [medicalHistory, setMedicalHistory] = useState('')
  const [patientAge, setPatientAge] = useState('')
  const [patientGender, setPatientGender] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [currentMedications, setCurrentMedications] = useState('')
  const [conversationId, setConversationId] = useState('')
  const [context, setContext] = useState('')
  const [activeTab, setActiveTab] = useState<'analyze' | 'recommend' | 'chat'>('analyze')

  const {
    analyzeSymptoms,
    analyzeSymptomsData,
    isAnalyzingSymptoms,
    resetAnalyzeSymptoms,
    getMedicalRecommendations,
    medicalRecommendationsData,
    isGettingRecommendations,
    resetMedicalRecommendations,
    chatWithAI,
    chatData,
    isChattingWithAI,
    resetChat,
  } = useAI()

  const handleAnalyzeSymptoms = () => {
    if (!symptoms.trim()) {
      alert('Por favor ingresa los síntomas')
      return
    }
    analyzeSymptoms({
      symptoms: symptoms.trim(),
      patientAge: patientAge.trim() || undefined,
      patientGender: patientGender.trim() || undefined,
      additionalInfo: additionalInfo.trim() || undefined
    })
  }

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

  const handleSendChat = () => {
    if (!symptoms.trim()) {
      alert('Por favor ingresa tu pregunta')
      return
    }
    chatWithAI({
      message: symptoms.trim(),
      conversationId: conversationId.trim() || undefined,
      context: context.trim() || undefined
    })
  }

  const handleReset = () => {
    setSymptomsInput('')
    setMedicalHistory('')
    setPatientAge('')
    setPatientGender('')
    setAdditionalInfo('')
    setDiagnosis('')
    setCurrentMedications('')
    setConversationId('')
    setContext('')
    resetAnalyzeSymptoms()
    resetMedicalRecommendations()
    resetChat()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analizador de Síntomas IA</h1>
          <p className="text-gray-600">Powered by OpenAI</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('analyze')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'analyze'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Analizar Síntomas
        </button>
        <button
          onClick={() => setActiveTab('recommend')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'recommend'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Generar Recomendación
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'chat'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Chat con IA
        </button>
      </div>

      {/* Content */}
      <Card className="p-6">
        {/* Analyze Tab */}
        {activeTab === 'analyze' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe los síntomas del paciente
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptomsInput(e.target.value)}
                placeholder="Ej: Dolor de cabeza persistente, fiebre de 38°C, náuseas..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isAnalyzingSymptoms}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Edad del paciente
                </label>
                <input
                  type="number"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  placeholder="Ej: 25"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isAnalyzingSymptoms}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Género del paciente
                </label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isAnalyzingSymptoms}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Información adicional (opcional)
                </label>
                <input
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Ej: Comenzó hace 2 horas"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isAnalyzingSymptoms}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleAnalyzeSymptoms}
                isLoading={isAnalyzingSymptoms}
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Analizar Síntomas
              </Button>
              <Button
                onClick={handleReset}
                variant="secondary"
                disabled={isAnalyzingSymptoms}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Response */}
            {analyzeSymptomsData && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900">Análisis de Síntomas</h3>
                    <div className="text-blue-800 mt-2 space-y-2">
                      <p><strong>Análisis:</strong> {analyzeSymptomsData.data.analysis}</p>
                      <p><strong>Posibles condiciones:</strong> {analyzeSymptomsData.data.possibleConditions}</p>
                      <p><strong>Recomendaciones:</strong> {analyzeSymptomsData.data.recommendations}</p>
                      <p><strong>Nivel de urgencia:</strong> <span className={`font-medium ${
                        analyzeSymptomsData.data.urgencyLevel?.toLowerCase() === 'alto' ? 'text-red-600' :
                        analyzeSymptomsData.data.urgencyLevel?.toLowerCase() === 'medio' ? 'text-yellow-600' : 'text-green-600'
                      }`}>{analyzeSymptomsData.data.urgencyLevel}</span></p>
                      <p className="text-gray-600 italic text-sm">{analyzeSymptomsData.data.disclaimer}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recommend Tab */}
        {activeTab === 'recommend' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Síntomas
                </label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptomsInput(e.target.value)}
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
                  placeholder="Ej: 25"
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
                placeholder="Ej: Diabetes tipo 2, alergia a penicilina..."
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
                Generar Recomendación
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
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Escribe tu pregunta
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptomsInput(e.target.value)}
                placeholder="Ej: ¿Cuáles son los síntomas de la gripe? ¿Cómo prevenir contagios?"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isChattingWithAI}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID de conversación (opcional)
                </label>
                <input
                  value={conversationId}
                  onChange={(e) => setConversationId(e.target.value)}
                  placeholder="Ej: conv_123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isChattingWithAI}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contexto (opcional)
                </label>
                <input
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Ej: Consulta general sobre salud"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isChattingWithAI}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleSendChat}
                isLoading={isChattingWithAI}
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Enviar Pregunta
              </Button>
              <Button
                onClick={handleReset}
                variant="secondary"
                disabled={isChattingWithAI}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Response */}
            {chatData && (
              <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-purple-900">Respuesta IA</h3>
                    <div className="text-purple-800 mt-2 space-y-2">
                      <p>{chatData.data.response}</p>
                      {chatData.data.conversationId && (
                        <p className="text-sm text-gray-600">ID Conversación: {chatData.data.conversationId}</p>
                      )}
                      {chatData.data.timestamp && (
                        <p className="text-sm text-gray-600">Timestamp: {new Date(chatData.data.timestamp).toLocaleString()}</p>
                      )}
                      <p className="text-gray-600 italic text-sm">{chatData.data.disclaimer}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Info */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-semibold">Nota importante</p>
          <p>
            Este análisis es una herramienta educativa impulsada por IA. No reemplaza el diagnóstico médico profesional. 
            Siempre consulta con un profesional de la salud para evaluaciones médicas precisas.
          </p>
        </div>
      </div>
    </div>
  )
}
