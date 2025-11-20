import { AxiosError } from 'axios'

/**
 * Mensajes de error centralizados para mantener consistencia
 */
export const ERROR_MESSAGES = {
  // Errores de autenticación
  UNAUTHORIZED: 'Sesión expirada. Por favor, inicia sesión nuevamente.',
  FORBIDDEN: 'No tienes permisos para realizar esta acción.',
  INVALID_CREDENTIALS: 'Usuario o contraseña incorrectos.',

  // Errores de red
  NETWORK_ERROR: 'Error de conexión. Verifica tu conexión a internet.',
  TIMEOUT: 'La solicitud tardó demasiado. Inténtalo nuevamente.',

  // Errores de validación
  REQUIRED_FIELD: 'Este campo es obligatorio.',
  INVALID_EMAIL: 'Ingresa un correo electrónico válido.',
  INVALID_PASSWORD: 'La contraseña debe tener al menos 6 caracteres.',

  // Errores específicos de la aplicación
  PATIENT_NOT_FOUND: 'Paciente no encontrado.',
  APPOINTMENT_CONFLICT: 'Ya existe una cita en ese horario.',
  AI_SERVICE_UNAVAILABLE: 'El servicio de IA no está disponible temporalmente.',

  // Errores genéricos
  INTERNAL_ERROR: 'Ha ocurrido un error interno. Inténtalo más tarde.',
  UNKNOWN_ERROR: 'Ha ocurrido un error desconocido.',
}

/**
 * Función helper para obtener mensajes de error
 */
export const getErrorMessage = (error: AxiosError | Error): string => {
  if (error instanceof AxiosError) {
    if (error.response) {
      const { status, data } = error.response

      switch (status) {
        case 400:
          return (data && typeof data === 'object' && 'message' in data)
            ? (data as { message: string }).message
            : ERROR_MESSAGES.INTERNAL_ERROR
        case 401:
          return ERROR_MESSAGES.UNAUTHORIZED
        case 403:
          return ERROR_MESSAGES.FORBIDDEN
        case 404:
          return 'Recurso no encontrado.'
        case 422:
          return (data && typeof data === 'object' && 'message' in data)
            ? (data as { message: string }).message
            : 'Datos inválidos.'
        case 500:
          return ERROR_MESSAGES.INTERNAL_ERROR
        default:
          return ERROR_MESSAGES.UNKNOWN_ERROR
      }
    } else if (error.request) {
      return ERROR_MESSAGES.NETWORK_ERROR
    } else {
      return error.message || ERROR_MESSAGES.UNKNOWN_ERROR
    }
  } else {
    return error.message || ERROR_MESSAGES.UNKNOWN_ERROR
  }
}