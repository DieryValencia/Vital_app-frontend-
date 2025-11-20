import { useState } from 'react'
import { MessageCircle, Send, RotateCcw, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAI } from '@/hooks/useAI'
import { Card } from '@/components/ui/Card'

export const MedicalChat: React.FC = () => {
  const [message, setMessage] = useState('')
  const [conversationId, setConversationId] = useState('')
  const [context, setContext] = useState('')

  const {
    chatWithAI,
    chatData,
    isChattingWithAI,
    resetChat,
  } = useAI()

  const handleSendMessage = () => {
    if (!message.trim()) {
      alert('Por favor ingresa tu mensaje')
      return
    }
    chatWithAI({
      message: message.trim(),
      conversationId: conversationId.trim() || undefined,
      context: context.trim() || undefined,
    })
  }

  const handleReset = () => {
    setMessage('')
    setConversationId('')
    setContext('')
    resetChat()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
          <MessageCircle className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chat Médico IA</h1>
          <p className="text-gray-600">Powered by Groq</p>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tu pregunta o mensaje
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ej: ¿Cuáles son los síntomas de la gripe? ¿Cómo puedo prevenir contagios?"
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
              onClick={handleSendMessage}
              isLoading={isChattingWithAI}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Enviar Mensaje
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
                  <h3 className="font-semibold text-purple-900">Respuesta de IA Médica</h3>
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
      </Card>

      {/* Info */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
        <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-semibold">Nota importante</p>
          <p>
            Las respuestas del chat son informativas y no constituyen consejo médico profesional.
            Para consultas médicas específicas, consulta con un profesional de la salud.
          </p>
        </div>
      </div>
    </div>
  )
}