import httpClient from '@/services/httpClient'

export interface AIAnalysisResponse {
  success: boolean
  data: any
  error?: string
}

export interface AnalyzeSymptomsInput {
  symptoms: string
  patientAge?: string
  patientGender?: string
  additionalInfo?: string
}

export interface AnalyzeSymptomsResponse {
  analysis: string
  possibleConditions: string
  recommendations: string
  urgencyLevel: string
  disclaimer: string
}

export interface MedicalRecommendationsInput {
  symptoms: string
  diagnosis?: string
  patientAge?: string
  patientGender?: string
  medicalHistory?: string
  currentMedications?: string
}

export interface MedicalRecommendationsResponse {
  treatmentPlan: string
  medications: string
  lifestyleRecommendations: string
  followUpInstructions: string
  whenToSeekHelp: string
  disclaimer: string
}

export interface ChatInput {
  message: string
  conversationId?: string
  context?: string
}

export interface ChatResponse {
  response: string
  conversationId: string
  timestamp: string
  disclaimer: string
}

export interface QuickAnalysisParams {
  symptoms: string
  patientAge?: string
  patientGender?: string
}

export const aiApi = {
  // Analizar síntomas
  analyzeSymptoms: async (input: AnalyzeSymptomsInput): Promise<AIAnalysisResponse> => {
    const { data } = await httpClient.post('/api/ai/analyze-symptoms', input)
    return data
  },

  // Generar recomendaciones médicas
  getMedicalRecommendations: async (input: MedicalRecommendationsInput): Promise<AIAnalysisResponse> => {
    const { data } = await httpClient.post('/api/ai/medical-recommendations', input)
    return data
  },

  // Chat con IA médica
  chat: async (input: ChatInput): Promise<AIAnalysisResponse> => {
    const { data } = await httpClient.post('/api/ai/chat', input)
    return data
  },

  // Análisis rápido de síntomas
  quickAnalysis: async (params: QuickAnalysisParams): Promise<AIAnalysisResponse> => {
    const { data } = await httpClient.get('/api/ai/quick-analysis', { params })
    return data
  },
}