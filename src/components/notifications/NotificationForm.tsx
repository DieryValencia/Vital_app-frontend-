import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { NotificationCreateInput, NotificationType } from '@/api/notifications.types'

const notificationSchema = z.object({
  title: z.string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),
  message: z.string()
    .min(5, 'El mensaje debe tener al menos 5 caracteres')
    .max(500, 'El mensaje no puede exceder 500 caracteres'),
  type: z.enum(['INFO', 'WARNING', 'ERROR', 'SUCCESS'], {
    errorMap: () => ({ message: 'Debe seleccionar un tipo' })
  }),
  relatedEntityType: z.string().optional(),
  relatedEntityId: z.number().optional(),
})

type NotificationFormData = z.infer<typeof notificationSchema>

interface NotificationFormProps {
  onSubmit: (data: NotificationCreateInput) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export const NotificationForm: React.FC<NotificationFormProps> = ({
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      type: 'INFO'
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Título *"
        placeholder="Título de la notificación"
        error={errors.title?.message}
        {...register('title')}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mensaje *
        </label>
        <textarea
          rows={4}
          placeholder="Contenido del mensaje..."
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('message')}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo *
        </label>
        <select
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.type ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('type')}
        >
          <option value="INFO">ℹ️ Información</option>
          <option value="SUCCESS">✅ Éxito</option>
          <option value="WARNING">⚠️ Advertencia</option>
          <option value="ERROR">❌ Error</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Tipo de Entidad Relacionada"
          placeholder="PATIENT, TRIAGE, APPOINTMENT"
          error={errors.relatedEntityType?.message}
          {...register('relatedEntityType')}
        />

        <Input
          label="ID de Entidad Relacionada"
          type="number"
          placeholder="123"
          error={errors.relatedEntityId?.message}
          {...register('relatedEntityId', { valueAsNumber: true })}
        />
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
          Crear Notificación
        </Button>
      </div>
    </form>
  )
}