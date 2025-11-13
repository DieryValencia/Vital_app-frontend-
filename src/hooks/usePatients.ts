import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { patientsApi } from '@/api/patients.api'
import type { PatientCreateInput, PatientUpdateInput } from '@/api/patients.types'

export const usePatients = (params?: {
  page?: number
  size?: number
  firstName?: string
  gender?: string
}) => {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['patients', params],
    queryFn: () => patientsApi.getAll(params),
  })

  const createMutation = useMutation({
    mutationFn: patientsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['patients'],
        refetchType: 'all'
      })
      toast.success('Paciente creado exitosamente')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al crear paciente')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PatientUpdateInput }) =>
      patientsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
      toast.success('Paciente actualizado exitosamente')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al actualizar paciente')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: patientsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
      toast.success('Paciente eliminado')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || ''
      const isConstraintError = errorMessage.includes('violates foreign key constraint') || 
                               errorMessage.includes('still referenced')
      
      if (isConstraintError) {
        toast.error('No se puede eliminar el paciente. Tiene citas o triajes asociados.')
      } else {
        toast.error(errorMessage || 'Error al eliminar paciente')
      }
    },
  })

  return {
    patients: data?.content || [],
    pageInfo: data,
    isLoading,
    error,
    createPatient: createMutation.mutate,
    updatePatient: updateMutation.mutate,
    deletePatient: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}

export const usePatient = (id: number) => {
  return useQuery({
    queryKey: ['patients', id],
    queryFn: () => patientsApi.getById(id),
    enabled: !!id,
  })
}