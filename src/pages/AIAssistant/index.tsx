import { SymptomAnalyzer } from '@/components/ai/SymptomAnalyzer'

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <SymptomAnalyzer />
      </div>
    </div>
  )
}
