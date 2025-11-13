import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { triagesApi } from '@/api/triages.api'
import type { TriageCreateInput, TriageUpdateInput } from '@/api/triages.types'

export const useTriages = () => {
  const queryClient = useQueryClient()

  // Obtener todos los triajes
  const { data: triages, isLoading, error } = useQuery({
    queryKey: ['triages'],
    queryFn: triagesApi.getAll,
  })

  // Crear triaje
  const createMutation = useMutation({
    mutationFn: triagesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['triages'],
        refetchType: 'all'
      })
      toast.success('Triaje creado exitosamente')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al crear triaje')
    },
  })

  // Actualizar triaje
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TriageUpdateInput }) =>
      triagesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['triages'],
        refetchType: 'all'
      })
      toast.success('Triaje actualizado exitosamente')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al actualizar triaje')
    },
  })

  // Eliminar triaje
  const deleteMutation = useMutation({
    mutationFn: triagesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['triages'],
        refetchType: 'all'
      })
      toast.success('Triaje eliminado')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al eliminar triaje')
    },
  })

  return {
    triages,
    isLoading,
    error,
    createTriage: createMutation.mutate,
    updateTriage: updateMutation.mutate,
    deleteTriage: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}

// Hook para obtener un triaje por ID
export const useTriage = (id: number) => {
  return useQuery({
    queryKey: ['triages', id],
    queryFn: () => triagesApi.getById(id),
    enabled: !!id,
  })
}

// Hook para obtener triajes de un paciente
export const usePatientTriages = (patientId: number) => {
  return useQuery({
    queryKey: ['triages', 'patient', patientId],
    queryFn: () => triagesApi.getByPatient(patientId),
    enabled: !!patientId,
  })
}