import { Activity, Thermometer, Heart, Wind, Droplet } from 'lucide-react'
import type { Triage } from '@/api/triages.types'

interface VitalSignsDisplayProps {
  triage: Triage
  layout?: 'grid' | 'list'
}

export const VitalSignsDisplay: React.FC<VitalSignsDisplayProps> = ({
  triage,
  layout = 'grid'
}) => {
  const signs = [
    {
      icon: Thermometer,
      label: 'Temperatura',
      value: `${triage.temperature}°C`,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: Activity,
      label: 'Presión Arterial',
      value: triage.bloodPressure,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Heart,
      label: 'Frecuencia Cardíaca',
      value: `${triage.heartRate} bpm`,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      icon: Wind,
      label: 'Frecuencia Respiratoria',
      value: `${triage.respiratoryRate} rpm`,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
    },
    {
      icon: Droplet,
      label: 'Saturación de Oxígeno',
      value: `${triage.oxygenSaturation}%`,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ]

  if (layout === 'list') {
    return (
      <div className="space-y-2">
        {signs.map((sign, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${sign.bgColor}`}>
              <sign.icon className={`h-4 w-4 ${sign.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">{sign.label}</p>
              <p className="text-sm font-semibold">{sign.value}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {signs.map((sign, index) => (
        <div key={index} className={`p-3 rounded-lg ${sign.bgColor}`}>
          <div className="flex items-center gap-2 mb-1">
            <sign.icon className={`h-4 w-4 ${sign.color}`} />
            <p className="text-xs text-gray-600">{sign.label}</p>
          </div>
          <p className={`text-lg font-bold ${sign.color}`}>{sign.value}</p>
        </div>
      ))}
    </div>
  )
}