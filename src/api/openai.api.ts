import api from './axios.config'

export interface AIAnalysisResponse {
  success: boolean
  data: string
  error?: string
}

export interface SymptomsAnalysisInput {
  symptoms: string
}

export interface RecommendationInput {
  symptoms: string
  medicalHistory: string
}

export interface ChatInput {
  prompt: string
}

export const openaiApi = {
  // Analizar síntomas
  analyzeSymptoms: async (input: SymptomsAnalysisInput): Promise<AIAnalysisResponse> => {
    const { data } = await api.post('/api/ai/analyze-symptoms', input)
    return data
  },

  // Generar recomendación
  generateRecommendation: async (input: RecommendationInput): Promise<AIAnalysisResponse> => {
    const { data } = await api.post('/api/ai/generate-recommendation', input)
    return data
  },

  // Chat general
  chat: async (input: ChatInput): Promise<AIAnalysisResponse> => {
    const { data } = await api.post('/api/ai/chat', input)
    return data
  },
}
