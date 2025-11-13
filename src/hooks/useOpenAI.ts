import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { openaiApi } from '@/api/openai.api'
import type { AIAnalysisResponse, SymptomsAnalysisInput, RecommendationInput, ChatInput } from '@/api/openai.api'

export const useOpenAI = () => {
  // Analizar síntomas
  const analyzeSymptomsMutation = useMutation({
    mutationFn: (input: SymptomsAnalysisInput) => openaiApi.analyzeSymptoms(input),
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Error al analizar síntomas'
      toast.error(errorMessage)
    },
  })

  // Generar recomendación
  const generateRecommendationMutation = useMutation({
    mutationFn: (input: RecommendationInput) => openaiApi.generateRecommendation(input),
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Error al generar recomendación'
      toast.error(errorMessage)
    },
  })

  // Chat general
  const chatMutation = useMutation({
    mutationFn: (input: ChatInput) => openaiApi.chat(input),
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Error en la consulta'
      toast.error(errorMessage)
    },
  })

  return {
    // Analizar síntomas
    analyzeSymptoms: analyzeSymptomsMutation.mutate,
    analyzeSymptomData: analyzeSymptomsMutation.data,
    isAnalyzingSymptoms: analyzeSymptomsMutation.isPending,
    symptomAnalysisError: analyzeSymptomsMutation.error,

    // Generar recomendación
    generateRecommendation: generateRecommendationMutation.mutate,
    recommendationData: generateRecommendationMutation.data,
    isGeneratingRecommendation: generateRecommendationMutation.isPending,
    recommendationError: generateRecommendationMutation.error,

    // Chat
    sendChat: chatMutation.mutate,
    chatData: chatMutation.data,
    isChattingWithAI: chatMutation.isPending,
    chatError: chatMutation.error,

    // Reset functions
    resetAnalyzeSymptoms: analyzeSymptomsMutation.reset,
    resetRecommendation: generateRecommendationMutation.reset,
    resetChat: chatMutation.reset,
  }
}
