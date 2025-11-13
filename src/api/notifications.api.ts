import api from './axios.config'
import type { Notification, NotificationCreateInput } from './notifications.types'

export const notificationsApi = {
  // Obtener todas las notificaciones
  getAll: async (): Promise<Notification[]> => {
    const { data } = await api.get('/api/notifications')
    return data
  },

  // Obtener notificaciones no leídas
  getUnread: async (): Promise<Notification[]> => {
    const { data } = await api.get('/api/notifications/unread')
    return data
  },

  // Obtener notificación por ID
  getById: async (id: number): Promise<Notification> => {
    const { data } = await api.get(`/api/notifications/${id}`)
    return data
  },

  // Crear notificación
  create: async (notification: NotificationCreateInput): Promise<Notification> => {
    const { data } = await api.post('/api/notifications', notification)
    return data
  },

  // Marcar como leída
  markAsRead: async (id: number): Promise<Notification> => {
    const { data } = await api.patch(`/api/notifications/${id}/read`)
    return data
  },

  // Eliminar notificación
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/notifications/${id}`)
  },
}