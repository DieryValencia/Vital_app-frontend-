export type NotificationType = 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS'

export const TYPE_LABELS: Record<NotificationType, string> = {
  INFO: 'Info',
  WARNING: 'Warning',
  ERROR: 'Error',
  SUCCESS: 'Success',
}

export const TYPE_COLORS: Record<NotificationType, string> = {
  INFO: 'bg-blue-100 text-blue-800 border-blue-200',
  WARNING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  ERROR: 'bg-red-100 text-red-800 border-red-200',
  SUCCESS: 'bg-green-100 text-green-800 border-green-200',
}

export const TYPE_ICON_COLORS: Record<NotificationType, string> = {
  INFO: 'text-blue-600',
  WARNING: 'text-yellow-600',
  ERROR: 'text-red-600',
  SUCCESS: 'text-green-600',
}

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