import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { aiApi } from '@/api/ai.api'
import type {
  AIAnalysisResponse,
  AnalyzeSymptomsInput,
  MedicalRecommendationsInput,
  ChatInput,
  QuickAnalysisParams
} from '@/api/ai.api'

export const useAI = () => {
  // Analizar síntomas
  const analyzeSymptomsMutation = useMutation({
    mutationFn: (input: AnalyzeSymptomsInput) => aiApi.analyzeSymptoms(input),
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Error al analizar síntomas'
      toast.error(errorMessage)
    },
  })

  // Generar recomendaciones médicas
  const getMedicalRecommendationsMutation = useMutation({
    mutationFn: (input: MedicalRecommendationsInput) => aiApi.getMedicalRecommendations(input),
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Error al obtener recomendaciones médicas'
      toast.error(errorMessage)
    },
  })

  // Chat con IA médica
  const chatMutation = useMutation({
    mutationFn: (input: ChatInput) => aiApi.chat(input),
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Error en el chat con IA'
      toast.error(errorMessage)
    },
  })

  // Análisis rápido
  const quickAnalysisMutation = useMutation({
    mutationFn: (params: QuickAnalysisParams) => aiApi.quickAnalysis(params),
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Error en análisis rápido'
      toast.error(errorMessage)
    },
  })

  return {
    // Analizar síntomas
    analyzeSymptoms: analyzeSymptomsMutation.mutate,
    analyzeSymptomsData: analyzeSymptomsMutation.data,
    isAnalyzingSymptoms: analyzeSymptomsMutation.isPending,
    analyzeSymptomsError: analyzeSymptomsMutation.error,

    // Recomendaciones médicas
    getMedicalRecommendations: getMedicalRecommendationsMutation.mutate,
    medicalRecommendationsData: getMedicalRecommendationsMutation.data,
    isGettingRecommendations: getMedicalRecommendationsMutation.isPending,
    medicalRecommendationsError: getMedicalRecommendationsMutation.error,

    // Chat
    chatWithAI: chatMutation.mutate,
    chatData: chatMutation.data,
    isChattingWithAI: chatMutation.isPending,
    chatError: chatMutation.error,

    // Análisis rápido
    quickAnalysis: quickAnalysisMutation.mutate,
    quickAnalysisData: quickAnalysisMutation.data,
    isQuickAnalyzing: quickAnalysisMutation.isPending,
    quickAnalysisError: quickAnalysisMutation.error,

    // Reset functions
    resetAnalyzeSymptoms: analyzeSymptomsMutation.reset,
    resetMedicalRecommendations: getMedicalRecommendationsMutation.reset,
    resetChat: chatMutation.reset,
    resetQuickAnalysis: quickAnalysisMutation.reset,
  }
}