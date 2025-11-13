import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PatientSelector } from '@/components/triages/PatientSelector'
import type { Appointment, AppointmentCreateInput } from '@/api/appointments.types'
import type { Patient } from '@/api/patients.types'

const appointmentSchema = z.object({
  patientId: z.number({ required_error: 'Debe seleccionar un paciente' }),
  appointmentDate: z.string()
    .min(1, 'La fecha es obligatoria')
    .refine((date) => new Date(date) > new Date(), 'La fecha debe ser futura'),
  reason: z.string()
    .min(5, 'El motivo debe tener al menos 5 caracteres')
    .max(500, 'El motivo no puede exceder 500 caracteres'),
  doctorName: z.string()
    .min(3, 'El nombre del doctor debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  specialty: z.string()
    .min(3, 'La especialidad debe tener al menos 3 caracteres')
    .max(100, 'La especialidad no puede exceder 100 caracteres'),
  observations: z.string().max(1000).optional(),
})

type AppointmentFormData = z.infer<typeof appointmentSchema>

interface AppointmentFormProps {
  appointment?: Appointment
  onSubmit: (data: AppointmentCreateInput) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  appointment,
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: appointment ? {
      patientId: appointment.patient.id,
      appointmentDate: appointment.appointmentDate.split('T')[0] + 'T' + appointment.appointmentDate.split('T')[1].substring(0, 5),
      reason: appointment.reason,
      doctorName: appointment.doctorName,
      specialty: appointment.specialty,
      observations: appointment.observations || '',
    } : {
      appointmentDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        label="Fecha y Hora de la Cita *"
        type="datetime-local"
        error={errors.appointmentDate?.message}
        {...register('appointmentDate')}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Motivo de la Cita *
        </label>
        <textarea
          rows={3}
          placeholder="Describa el motivo de la consulta..."
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.reason ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('reason')}
        />
        {errors.reason && (
          <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre del Doctor *"
          placeholder="Dr. Juan Pérez"
          error={errors.doctorName?.message}
          {...register('doctorName')}
        />

        <Input
          label="Especialidad *"
          placeholder="Medicina General"
          error={errors.specialty?.message}
          {...register('specialty')}
        />
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
          {appointment ? 'Actualizar' : 'Crear'} Cita
        </Button>
      </div>
    </form>
  )
}