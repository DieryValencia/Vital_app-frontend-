import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { Patient, PatientCreateInput } from '@/api/patients.types'
import { formatDateForInput } from '@/utils/patientUtils'

const patientSchema = z.object({
  firstName: z.string().min(2, 'Mínimo 2 caracteres').max(50),
  lastName: z.string().min(2, 'Mínimo 2 caracteres').max(50),
  identificationNumber: z.string().min(5, 'Mínimo 5 caracteres').max(20),
  dateOfBirth: z.string().min(1, 'La fecha es requerida').refine((date) => new Date(date) < new Date(), 'Fecha inválida'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  phoneNumber: z.string().optional(),
  email: z.string().email('Email inválido').or(z.literal('')).optional(),
  address: z.string().optional(),
  bloodType: z.string().optional(),
  allergies: z.string().optional(),
  medicalConditions: z.string().optional(),
})

type PatientFormData = z.infer<typeof patientSchema>

interface PatientFormProps {
  patient?: Patient
  onSubmit: (data: PatientCreateInput) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export const PatientForm: React.FC<PatientFormProps> = ({
  patient,
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: patient?.firstName || '',
      lastName: patient?.lastName || '',
      identificationNumber: patient?.identificationNumber || '',
      dateOfBirth: patient ? formatDateForInput(patient.dateOfBirth) : '',
      gender: patient?.gender || 'MALE',
      phoneNumber: patient?.phoneNumber || '',
      email: patient?.email || '',
      address: patient?.address || '',
      bloodType: patient?.bloodType || '',
      allergies: patient?.allergies || '',
      medicalConditions: patient?.medicalConditions || '',
    }
  })

  const handleFormSubmit = (data: PatientFormData) => {
    // Convertir valores vacíos a undefined
    const cleanedData: PatientCreateInput = {
      firstName: data.firstName,
      lastName: data.lastName,
      identificationNumber: data.identificationNumber,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender as 'MALE' | 'FEMALE' | 'OTHER',
      phoneNumber: data.phoneNumber || undefined,
      email: data.email || undefined,
      address: data.address || undefined,
      bloodType: (data.bloodType || undefined) as any,
      allergies: data.allergies || undefined,
      medicalConditions: data.medicalConditions || undefined,
    }
    onSubmit(cleanedData)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre *"
          placeholder="Juan"
          error={errors.firstName?.message}
          {...register('firstName')}
        />

        <Input
          label="Apellido *"
          placeholder="Pérez"
          error={errors.lastName?.message}
          {...register('lastName')}
        />

        <Input
          label="Documento de Identidad *"
          placeholder="1234567890"
          error={errors.identificationNumber?.message}
          disabled={!!patient}
          {...register('identificationNumber')}
        />

        <Input
          label="Fecha de Nacimiento *"
          type="date"
          error={errors.dateOfBirth?.message}
          {...register('dateOfBirth')}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Género *
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            {...register('gender')}
          >
            <option value="MALE">Masculino</option>
            <option value="FEMALE">Femenino</option>
            <option value="OTHER">Otro</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Sangre
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            {...register('bloodType')}
          >
            <option value="">Seleccione...</option>
            <option value="A_POSITIVE">A+</option>
            <option value="A_NEGATIVE">A-</option>
            <option value="B_POSITIVE">B+</option>
            <option value="B_NEGATIVE">B-</option>
            <option value="AB_POSITIVE">AB+</option>
            <option value="AB_NEGATIVE">AB-</option>
            <option value="O_POSITIVE">O+</option>
            <option value="O_NEGATIVE">O-</option>
          </select>
        </div>

        <Input
          label="Teléfono"
          placeholder="+573001234567"
          error={errors.phoneNumber?.message}
          {...register('phoneNumber')}
        />

        <Input
          label="Email"
          type="email"
          placeholder="juan@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="md:col-span-2">
          <Input
            label="Dirección"
            placeholder="Calle 123 #45-67"
            error={errors.address?.message}
            {...register('address')}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alergias
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={2}
            placeholder="Penicilina, Polen..."
            {...register('allergies')}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Condiciones Médicas
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={2}
            placeholder="Diabetes, Hipertensión..."
            {...register('medicalConditions')}
          />
        </div>
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
          {patient ? 'Actualizar' : 'Crear'} Paciente
        </Button>
      </div>
    </form>
  )
}