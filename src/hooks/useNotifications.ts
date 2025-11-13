import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { notificationsApi } from '@/api/notifications.api'
import type { NotificationCreateInput } from '@/api/notifications.types'

export const useNotifications = () => {
  const queryClient = useQueryClient()

  // Obtener todas las notificaciones (auto-refresh cada 30 segundos)
  const { data: notifications, isLoading, error } = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsApi.getAll,
    refetchInterval: 30000, // 30 segundos
  })

  // Obtener notificaciones no leídas
  const { data: unreadNotifications } = useQuery({
    queryKey: ['notifications', 'unread'],
    queryFn: notificationsApi.getUnread,
    refetchInterval: 30000, // 30 segundos
  })

  // Crear notificación
  const createMutation = useMutation({
    mutationFn: notificationsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      toast.success('Notificación creada')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al crear notificación')
    },
  })

  // Marcar como leída
  const markAsReadMutation = useMutation({
    mutationFn: notificationsApi.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al marcar notificación')
    },
  })

  // Eliminar notificación
  const deleteMutation = useMutation({
    mutationFn: notificationsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      toast.success('Notificación eliminada')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al eliminar notificación')
    },
  })

  // Marcar todas como leídas
  const markAllAsRead = async () => {
    if (!unreadNotifications) return

    try {
      await Promise.all(
        unreadNotifications.map((notification) =>
          notificationsApi.markAsRead(notification.id)
        )
      )
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      toast.success('Todas las notificaciones marcadas como leídas')
    } catch (error) {
      toast.error('Error al marcar notificaciones')
    }
  }

  // Eliminar todas las leídas
  const deleteAllRead = async () => {
    if (!notifications) return

    const readNotifications = notifications.filter((n) => n.read)

    try {
      await Promise.all(
        readNotifications.map((notification) =>
          notificationsApi.delete(notification.id)
        )
      )
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      toast.success(`${readNotifications.length} notificaciones eliminadas`)
    } catch (error) {
      toast.error('Error al eliminar notificaciones')
    }
  }

  return {
    notifications,
    unreadNotifications,
    unreadCount: unreadNotifications?.length || 0,
    isLoading,
    error,
    createNotification: createMutation.mutate,
    markAsRead: markAsReadMutation.mutate,
    deleteNotification: deleteMutation.mutate,
    markAllAsRead,
    deleteAllRead,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}

// Hook para obtener una notificación por ID
export const useNotification = (id: number) => {
  return useQuery({
    queryKey: ['notifications', id],
    queryFn: () => notificationsApi.getById(id),
    enabled: !!id,
  })
}