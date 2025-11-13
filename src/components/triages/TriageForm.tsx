import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PatientSelector } from './PatientSelector'
import type { Triage, TriageCreateInput, Priority } from '@/api/triages.types'
import type { Patient } from '@/api/patients.types'

const triageSchema = z.object({
  patientId: z.number({ required_error: 'Debe seleccionar un paciente' }),
  triageDate: z.string().min(1, 'La fecha es obligatoria'),
  symptoms: z.string()
    .min(10, 'Los síntomas deben tener al menos 10 caracteres')
    .max(500, 'Los síntomas no pueden exceder 500 caracteres'),
  temperature: z.number()
    .min(35, 'La temperatura debe ser al menos 35°C')
    .max(42, 'La temperatura no puede exceder 42°C'),
  bloodPressure: z.string()
    .regex(/^\d{2,3}\/\d{2,3}$/, 'Formato inválido (ejemplo: 120/80)'),
  heartRate: z.number()
    .min(40, 'La frecuencia cardíaca debe ser al menos 40 bpm')
    .max(200, 'La frecuencia cardíaca no puede exceder 200 bpm'),
  respiratoryRate: z.number()
    .min(10, 'La frecuencia respiratoria debe ser al menos 10 rpm')
    .max(40, 'La frecuencia respiratoria no puede exceder 40 rpm'),
  oxygenSaturation: z.number()
    .min(70, 'La saturación debe ser al menos 70%')
    .max(100, 'La saturación no puede exceder 100%'),
  priority: z.enum(['EMERGENCIA', 'URGENTE', 'MENOS_URGENTE', 'NO_URGENTE'], {
    errorMap: () => ({ message: 'Debe seleccionar una prioridad' })
  }),
  severityLevel: z.number()
    .min(1, 'El nivel de severidad debe ser entre 1 y 5')
    .max(5, 'El nivel de severidad debe ser entre 1 y 5'),
  recommendedAction: z.string()
    .min(5, 'La acción recomendada debe tener al menos 5 caracteres')
    .max(500, 'La acción recomendada no puede exceder 500 caracteres'),
  observations: z.string().max(1000).optional(),
})

type TriageFormData = z.infer<typeof triageSchema>

interface TriageFormProps {
  triage?: Triage
  onSubmit: (data: TriageCreateInput) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export const TriageForm: React.FC<TriageFormProps> = ({
  triage,
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TriageFormData>({
    resolver: zodResolver(triageSchema),
    defaultValues: triage && triage.patient ? {
      patientId: triage.patient.id,
      triageDate: triage.triageDate.split('T')[0] + 'T' + triage.triageDate.split('T')[1].substring(0, 5),
      symptoms: triage.symptoms,
      temperature: triage.temperature,
      bloodPressure: triage.bloodPressure,
      heartRate: triage.heartRate,
      respiratoryRate: triage.respiratoryRate,
      oxygenSaturation: triage.oxygenSaturation,
      priority: triage.priority,
      severityLevel: triage.severityLevel,
      recommendedAction: triage.recommendedAction,
      observations: triage.observations || '',
    } : {
      triageDate: new Date().toISOString().slice(0, 16),
      symptoms: '',
      temperature: 37,
      bloodPressure: '120/80',
      heartRate: 80,
      respiratoryRate: 20,
      oxygenSaturation: 98,
      priority: 'NO_URGENTE',
      severityLevel: 3,
      recommendedAction: '',
      observations: '',
    }
  })

  const handleFormSubmit = (data: TriageFormData) => {
    onSubmit(data as TriageCreateInput)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Controller
        name="patientId"
        control={control}
        render={({ field }) => (
          <PatientSelector
            selectedPatientId={field.value}
            onSelect={(patient: Patient) => field.onChange(patient.id)}
            error={errors.patientId?.message}
          />
        )}
      />

      <Input
        label="Fecha y Hora *"
        type="datetime-local"
        error={errors.triageDate?.message}
        {...register('triageDate')}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Síntomas *
        </label>
        <textarea
          rows={3}
          placeholder="Describa los síntomas del paciente..."
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.symptoms ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('symptoms')}
        />
        {errors.symptoms && (
          <p className="mt-1 text-sm text-red-600">{errors.symptoms.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Temperatura (°C) *"
          type="number"
          step="0.1"
          placeholder="36.5"
          error={errors.temperature?.message}
          {...register('temperature', { valueAsNumber: true })}
        />

        <Input
          label="Presión Arterial *"
          placeholder="120/80"
          error={errors.bloodPressure?.message}
          {...register('bloodPressure')}
        />

        <Input
          label="Frecuencia Cardíaca (bpm) *"
          type="number"
          placeholder="80"
          error={errors.heartRate?.message}
          {...register('heartRate', { valueAsNumber: true })}
        />

        <Input
          label="Frecuencia Respiratoria (rpm) *"
          type="number"
          placeholder="20"
          error={errors.respiratoryRate?.message}
          {...register('respiratoryRate', { valueAsNumber: true })}
        />

        <Input
          label="Saturación de Oxígeno (%) *"
          type="number"
          placeholder="98"
          error={errors.oxygenSaturation?.message}
          {...register('oxygenSaturation', { valueAsNumber: true })}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prioridad *
          </label>
          <select
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.priority ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('priority')}
          >
            <option value="">Seleccione...</option>
            <option value="EMERGENCIA">🔴 Emergencia</option>
            <option value="URGENTE">🟠 Urgente</option>
            <option value="MENOS_URGENTE">🟡 Menos Urgente</option>
            <option value="NO_URGENTE">🟢 No Urgente</option>
          </select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nivel de Severidad (1-5) *"
          type="number"
          min="1"
          max="5"
          placeholder="3"
          error={errors.severityLevel?.message}
          {...register('severityLevel', { valueAsNumber: true })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Acción Recomendada *
        </label>
        <textarea
          rows={3}
          placeholder="Describa la acción recomendada para el paciente..."
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.recommendedAction ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('recommendedAction')}
        />
        {errors.recommendedAction && (
          <p className="mt-1 text-sm text-red-600">{errors.recommendedAction.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Observaciones
        </label>
        <textarea
          rows={3}
          placeholder="Observaciones adicionales..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          {...register('observations')}
        />
        {errors.observations && (
          <p className="mt-1 text-sm text-red-600">{errors.observations.message}</p>
        )}
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          {triage ? 'Actualizar' : 'Crear'} Triaje
        </Button>
      </div>
    </form>
  )
}