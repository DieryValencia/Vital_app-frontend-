import { useState } from 'react'
import { Sparkles, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useOpenAI } from '@/hooks/useOpenAI'

interface QuickAIAnalysisProps {
  symptoms?: string
  medicalHistory?: string
  onAnalysisComplete?: (analysis: string) => void
  compact?: boolean
}

export const QuickAIAnalysis: React.FC<QuickAIAnalysisProps> = ({
  symptoms = '',
  medicalHistory = '',
  onAnalysisComplete,
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputSymptoms, setInputSymptoms] = useState(symptoms)
  const [inputHistory, setInputHistory] = useState(medicalHistory)

  const {
    generateRecommendation,
    recommendationData,
    isGeneratingRecommendation,
    resetRecommendation,
  } = useOpenAI()

  const handleGenerateAnalysis = () => {
    if (!inputSymptoms.trim()) return

    generateRecommendation({
      symptoms: inputSymptoms.trim(),
      medicalHistory: inputHistory.trim(),
    })
  }

  const handleUseAnalysis = () => {
    if (recommendationData?.data && onAnalysisComplete) {
      onAnalysisComplete(recommendationData.data)
      setIsOpen(false)
      resetRecommendation()
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
            <label className="text-xs font-medium text-gray-700">Síntomas adicionales</label>
            <textarea
              value={inputSymptoms}
              onChange={(e) => setInputSymptoms(e.target.value)}
              rows={2}
              placeholder="Ingresa síntomas para el análisis..."
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isGeneratingRecommendation}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700">Historial médico (opcional)</label>
            <textarea
              value={inputHistory}
              onChange={(e) => setInputHistory(e.target.value)}
              rows={1}
              placeholder="Alergias, condiciones previas..."
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isGeneratingRecommendation}
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleGenerateAnalysis}
              isLoading={isGeneratingRecommendation}
              size="sm"
              className="flex items-center gap-2"
            >
              <Send className="h-3 w-3" />
              Analizar
            </Button>
          </div>

          {recommendationData && (
            <div className="p-3 bg-white border border-green-200 rounded text-sm space-y-2">
              <p className="text-gray-700 whitespace-pre-wrap">{recommendationData.data}</p>
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
