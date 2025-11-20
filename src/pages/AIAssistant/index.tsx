import { useState } from 'react'
import { SymptomAnalyzer } from '@/components/ai/SymptomAnalyzer'
import { MedicalRecommendations } from '@/components/ai/MedicalRecommendations'
import { MedicalChat } from '@/components/ai/MedicalChat'

export default function AIAssistantPage() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'recommendations' | 'chat'>('analyzer')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'analyzer'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Analizador de Síntomas
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'recommendations'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Recomendaciones Médicas
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'chat'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Chat con IA
          </button>
        </div>

        {/* Content */}
        {activeTab === 'analyzer' && <SymptomAnalyzer />}
        {activeTab === 'recommendations' && <MedicalRecommendations />}
        {activeTab === 'chat' && <MedicalChat />}
      </div>
    </div>
  )
}
