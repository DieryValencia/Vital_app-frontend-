import { useState } from 'react'
import { Brain, Send, RotateCcw, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useOpenAI } from '@/hooks/useOpenAI'
import { Card } from '@/components/ui/Card'

export const SymptomAnalyzer: React.FC = () => {
  const [symptoms, setSymptomsInput] = useState('')
  const [medicalHistory, setMedicalHistory] = useState('')
  const [activeTab, setActiveTab] = useState<'analyze' | 'recommend' | 'chat'>('analyze')

  const {
    analyzeSymptoms,
    analyzeSymptomData,
    isAnalyzingSymptoms,
    resetAnalyzeSymptoms,
    generateRecommendation,
    recommendationData,
    isGeneratingRecommendation,
    resetRecommendation,
    sendChat,
    chatData,
    isChattingWithAI,
    resetChat,
  } = useOpenAI()

  const handleAnalyzeSymptoms = () => {
    if (!symptoms.trim()) {
      alert('Por favor ingresa los síntomas')
      return
    }
    analyzeSymptoms({ symptoms: symptoms.trim() })
  }

  const handleGenerateRecommendation = () => {
    if (!symptoms.trim()) {
      alert('Por favor ingresa los síntomas')
      return
    }
    generateRecommendation({
      symptoms: symptoms.trim(),
      medicalHistory: medicalHistory.trim(),
    })
  }

  const handleSendChat = () => {
    if (!symptoms.trim()) {
      alert('Por favor ingresa tu pregunta')
      return
    }
    sendChat({ prompt: symptoms.trim() })
  }

  const handleReset = () => {
    setSymptomsInput('')
    setMedicalHistory('')
    resetAnalyzeSymptoms()
    resetRecommendation()
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
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isAnalyzingSymptoms}
              />
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
            {analyzeSymptomData && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900">Análisis de Síntomas</h3>
                    <p className="text-blue-800 mt-2 whitespace-pre-wrap">{analyzeSymptomData.data}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recommend Tab */}
        {activeTab === 'recommend' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Síntomas
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptomsInput(e.target.value)}
                placeholder="Ej: Dolor de cabeza persistente, fiebre de 38°C..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isGeneratingRecommendation}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Historial Médico (opcional)
              </label>
              <textarea
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                placeholder="Ej: Diabetes tipo 2, alergia a penicilina..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isGeneratingRecommendation}
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleGenerateRecommendation}
                isLoading={isGeneratingRecommendation}
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Generar Recomendación
              </Button>
              <Button
                onClick={handleReset}
                variant="secondary"
                disabled={isGeneratingRecommendation}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Response */}
            {recommendationData && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-green-900">Recomendación</h3>
                    <p className="text-green-800 mt-2 whitespace-pre-wrap">{recommendationData.data}</p>
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
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isChattingWithAI}
              />
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
                    <p className="text-purple-800 mt-2 whitespace-pre-wrap">{chatData.data}</p>
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
