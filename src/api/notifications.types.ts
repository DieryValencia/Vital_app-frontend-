export type NotificationType = 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS'

export interface Notification {
  id: number
  title: string
  message: string
  type: NotificationType
  read: boolean
  createdAt: string
  relatedEntityType?: string
  relatedEntityId?: number
}

export interface NotificationCreateInput {
  title: string
  message: string
  type: NotificationType
  relatedEntityType?: string
  relatedEntityId?: number
}