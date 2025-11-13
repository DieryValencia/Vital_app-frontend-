# Integración OpenAI - VitalApp

## 📋 Descripción

Se ha implementado una integración completa con OpenAI en el frontend de VitalApp. Esto permite a los usuarios:
- Analizar síntomas usando IA
- Generar recomendaciones médicas basadas en síntomas e historial
- Chatear con un asistente de IA para preguntas médicas generales

## 🏗️ Arquitectura

### Archivos Creados

```
src/
├── api/
│   └── openai.api.ts          # Cliente API para endpoints de IA
├── hooks/
│   └── useOpenAI.ts           # Hook personalizado con React Query
├── components/ai/
│   ├── SymptomAnalyzer.tsx    # Componente principal con 3 tabs
│   └── QuickAIAnalysis.tsx    # Componente mini para usar en formularios
└── pages/
    └── AIAssistant/
        └── index.tsx          # Página completa del asistente
```

## 🚀 Cómo Usar

### 1. Acceder al Asistente de IA

El nuevo módulo está disponible en el sidebar con el icono ✨ "Asistente IA"
- Ruta: `/ai-assistant`

### 2. En el Hook `useOpenAI`

```tsx
import { useOpenAI } from '@/hooks/useOpenAI'

export const MiComponente = () => {
  const {
    analyzeSymptoms,
    analyzeSymptomData,
    isAnalyzingSymptoms,
    generateRecommendation,
    recommendationData,
    isGeneratingRecommendation,
    sendChat,
    chatData,
    isChattingWithAI,
  } = useOpenAI()

  return (
    // Tu componente aquí
  )
}
```

### 3. En el Componente `SymptomAnalyzer`

```tsx
import { SymptomAnalyzer } from '@/components/ai/SymptomAnalyzer'

export default function Page() {
  return <SymptomAnalyzer />
}
```

### 4. Componente Mini `QuickAIAnalysis`

Para usar en formularios de triajes:

```tsx
import { QuickAIAnalysis } from '@/components/ai/QuickAIAnalysis'

export const TriageForm = () => {
  const handleAnalysisComplete = (analysis: string) => {
    // Hacer algo con el análisis
    console.log(analysis)
  }

  return (
    <form>
      {/* otros campos */}
      <QuickAIAnalysis
        symptoms={symptoms}
        medicalHistory={medicalHistory}
        onAnalysisComplete={handleAnalysisComplete}
        compact={false}
      />
    </form>
  )
}
```

## 📡 Endpoints del Backend

El backend debe tener estos endpoints configurados:

### 1. Analizar Síntomas
```
POST /api/ai/analyze-symptoms
Content-Type: application/json

{
  "symptoms": "string"
}

Response: {
  "success": boolean,
  "data": "string (análisis)",
  "error": "string (opcional)"
}
```

### 2. Generar Recomendación
```
POST /api/ai/generate-recommendation
Content-Type: application/json

{
  "symptoms": "string",
  "medicalHistory": "string"
}

Response: {
  "success": boolean,
  "data": "string (recomendación)",
  "error": "string (opcional)"
}
```

### 3. Chat General
```
POST /api/ai/chat
Content-Type: application/json

{
  "prompt": "string"
}

Response: {
  "success": boolean,
  "data": "string (respuesta)",
  "error": "string (opcional)"
}
```

## ⚙️ Configuración

### Axios
La configuración de CORS ya está en `src/api/axios.config.ts`:
- Backend: `localhost:8080`
- Frontend: `localhost:3000`
- CORS: ✅ Configurado en el backend

### React Query
- Todas las mutaciones usan React Query v5
- Manejo automático de estados de carga
- Toast notifications para errores
- Reset functions para limpiar estado

## 🎨 Características

### SymptomAnalyzer
- ✅ 3 tabs independientes
- ✅ Análisis de síntomas
- ✅ Generación de recomendaciones con historial médico
- ✅ Chat general con IA
- ✅ Respuestas formateadas con iconos
- ✅ Mensajes de advertencia legal
- ✅ Estados de carga con spinners
- ✅ Botones de reset

### QuickAIAnalysis
- ✅ Componente compacto para integrar en formularios
- ✅ Dos modos: compact y normal
- ✅ Callback para usar análisis en el formulario
- ✅ Interfaz minimalista

### Hook useOpenAI
- ✅ Manejo de 3 tipos de solicitudes
- ✅ Estados de carga independientes
- ✅ Datos de respuesta tipados
- ✅ Manejo automático de errores
- ✅ Toast notifications
- ✅ Funciones de reset

## 🔒 Seguridad

- ✅ Validación en cliente (campos vacíos)
- ✅ Manejo de errores HTTP
- ✅ CORS configurado
- ✅ Tokens JWT en headers (via Axios)
- ⚠️ Nota legal en la UI sobre limitaciones de IA

## 📊 Tipos TypeScript

```typescript
// Respuesta del servidor
interface AIAnalysisResponse {
  success: boolean
  data: string
  error?: string
}

// Input de análisis
interface SymptomsAnalysisInput {
  symptoms: string
}

// Input de recomendación
interface RecommendationInput {
  symptoms: string
  medicalHistory: string
}

// Input de chat
interface ChatInput {
  prompt: string
}
```

## 🧪 Testing

Los componentes de IA se pueden probar:
1. Acceder a `/ai-assistant`
2. Probar los 3 tabs
3. Ingresa síntomas de ejemplo
4. Verifica que las respuestas se muestren correctamente
5. Prueba el componente QuickAIAnalysis en formularios

## 🐛 Troubleshooting

### Error: "No se puede conectar al servidor"
- Verificar que el backend está corriendo en `localhost:8080`
- Verificar CORS está configurado en el backend

### Error: "Timeout"
- Las llamadas a OpenAI pueden tomar tiempo
- Aumentar timeout si es necesario en axios config

### Componentes no se muestran
- Verificar importes correctos
- Verificar rutas están en AppRoutes.tsx
- Verificar Sidebar tiene el link

## 📝 Próximos Pasos

1. Integrar QuickAIAnalysis en TriageForm
2. Integrar QuickAIAnalysis en AppointmentForm
3. Historial de chat persistente
4. Exportar análisis a PDF
5. Historial de triajes analizados

---

**Última actualización:** 13 de noviembre de 2025
**Versión:** 1.0.0
