import { useState } from 'react'
import { Sparkles, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAI } from '@/hooks/useAI'

interface QuickAIAnalysisProps {
  symptoms?: string
  patientAge?: string
  patientGender?: string
  onAnalysisComplete?: (analysis: any) => void
  compact?: boolean
}

export const QuickAIAnalysis: React.FC<QuickAIAnalysisProps> = ({
  symptoms = '',
  patientAge = '',
  patientGender = '',
  onAnalysisComplete,
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputSymptoms, setInputSymptoms] = useState(symptoms)
  const [inputAge, setInputAge] = useState(patientAge)
  const [inputGender, setInputGender] = useState(patientGender)

  const {
    quickAnalysis,
    quickAnalysisData,
    isQuickAnalyzing,
    resetQuickAnalysis,
  } = useAI()

  const handleGenerateAnalysis = () => {
    if (!inputSymptoms.trim()) return

    quickAnalysis({
      symptoms: inputSymptoms.trim(),
      patientAge: inputAge.trim() || undefined,
      patientGender: inputGender.trim() || undefined,
    })
  }

  const handleUseAnalysis = () => {
    if (quickAnalysisData?.data && onAnalysisComplete) {
      onAnalysisComplete(quickAnalysisData.data)
      setIsOpen(false)
      resetQuickAnalysis()
    }
  }

  if (compact) {
    return (
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
      >
        <Sparkles className="h-4 w-4" />
        Análisis IA
      </button>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
        >
          <Sparkles className="h-4 w-4" />
          {isOpen ? 'Cerrar' : 'Análisis IA'}
        </button>
      </div>

      {isOpen && (
        <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-700">Síntomas</label>
            <textarea
              value={inputSymptoms}
              onChange={(e) => setInputSymptoms(e.target.value)}
              rows={2}
              placeholder="Ingresa síntomas para el análisis..."
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isQuickAnalyzing}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium text-gray-700">Edad</label>
              <input
                type="number"
                value={inputAge}
                onChange={(e) => setInputAge(e.target.value)}
                placeholder="25"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isQuickAnalyzing}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700">Género</label>
              <select
                value={inputGender}
                onChange={(e) => setInputGender(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isQuickAnalyzing}
              >
                <option value="">Seleccionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleGenerateAnalysis}
              isLoading={isQuickAnalyzing}
              size="sm"
              className="flex items-center gap-2"
            >
              <Send className="h-3 w-3" />
              Analizar
            </Button>
          </div>

          {quickAnalysisData && (
            <div className="p-3 bg-white border border-green-200 rounded text-sm space-y-2">
              <div className="space-y-1">
                <p><strong>Análisis:</strong> {quickAnalysisData.data.analysis}</p>
                <p><strong>Recomendaciones:</strong> {quickAnalysisData.data.recommendations}</p>
                <p><strong>Urgencia:</strong> <span className={`font-medium ${
                  quickAnalysisData.data.urgencyLevel?.toLowerCase() === 'alto' ? 'text-red-600' :
                  quickAnalysisData.data.urgencyLevel?.toLowerCase() === 'medio' ? 'text-yellow-600' : 'text-green-600'
                }`}>{quickAnalysisData.data.urgencyLevel}</span></p>
                <p className="text-gray-500 italic text-xs">{quickAnalysisData.data.disclaimer}</p>
              </div>
              {onAnalysisComplete && (
                <Button
                  onClick={handleUseAnalysis}
                  size="sm"
                  variant="secondary"
                >
                  Usar análisis
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
