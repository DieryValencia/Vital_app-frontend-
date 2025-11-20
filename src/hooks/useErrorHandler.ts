import { useState, useCallback } from 'react'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

/**
 * Hook personalizado para manejo centralizado de errores
 */
export const useErrorHandler = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleError = useCallback((error: AxiosError | Error, customMessage: string | null = null) => {
    console.error('Error manejado:', error)

    let message = customMessage

    if (!message) {
      if (error instanceof AxiosError) {
        if (error.response) {
          // Error del servidor
          const { status, data } = error.response
          if (data && typeof data === 'object' && 'message' in data) {
            message = (data as { message: string }).message
          } else {
            message = `Error ${status}`
          }
        } else if (error.request) {
          // Error de red
          message = 'Error de conexión'
        } else {
          // Error desconocido
          message = error.message || 'Error desconocido'
        }
      } else {
        message = error.message || 'Error desconocido'
      }
    }

    setError(message)

    // Solo mostrar toast si no es un error ya manejado por el interceptor
    if (!(error instanceof AxiosError) || !error.response || ![401, 403].includes(error.response.status)) {
      toast.error(message)
    }

    return message
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const executeWithErrorHandling = useCallback(async <T,>(
    asyncFunction: () => Promise<T>,
    options: { showLoading?: boolean; successMessage?: string | null } = {}
  ): Promise<T> => {
    const { showLoading = true, successMessage = null } = options

    try {
      if (showLoading) setLoading(true)
      clearError()

      const result = await asyncFunction()

      if (successMessage) {
        toast.success(successMessage)
      }

      return result
    } catch (error) {
      handleError(error as AxiosError)
      throw error // Re-lanzar para que el componente pueda manejar si es necesario
    } finally {
      if (showLoading) setLoading(false)
    }
  }, [handleError, clearError])

  return {
    error,
    loading,
    handleError,
    clearError,
    executeWithErrorHandling,
  }
}