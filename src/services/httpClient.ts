import axios, { AxiosInstance, AxiosError } from 'axios'
import toast from 'react-hot-toast'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// Variable para controlar si ya estamos redirigiendo
let isRedirectingToLogin = false

// Crear instancia de axios configurada
const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de petición: Agregar token JWT
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    console.error('Error en interceptor de petición:', error)
    return Promise.reject(error)
  }
)

// Interceptor de respuesta: Manejar errores globalmente
httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    const { response, request, message } = error

    if (response) {
      // Errores del servidor (4xx, 5xx)
      const { status, data } = response

      switch (status) {
        case 401:
          // Token expirado o inválido
          if (!isRedirectingToLogin) {
            isRedirectingToLogin = true
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user')
            toast.error('Sesión expirada. Redirigiendo al login...')
            setTimeout(() => {
              window.location.href = '/login'
              isRedirectingToLogin = false
            }, 2000)
          }
          break

        case 403:
          // Acceso denegado
          toast.error('No tienes permisos para realizar esta acción')
          break

        case 404:
          toast.error('Recurso no encontrado')
          break

        case 422:
          // Errores de validación
          if (data && typeof data === 'object' && 'errors' in data) {
            const errorData = data as { errors: Record<string, string[]> }
            const errorMessages = Object.values(errorData.errors).flat()
            toast.error(errorMessages.join(', '))
          } else if (data && typeof data === 'object' && 'message' in data) {
            toast.error((data as { message: string }).message)
          } else {
            toast.error('Datos inválidos')
          }
          break

        case 500:
          toast.error('Error interno del servidor. Inténtalo más tarde.')
          break

        default:
          if (data && typeof data === 'object' && 'message' in data) {
            toast.error((data as { message: string }).message)
          } else {
            toast.error(`Error ${status}`)
          }
      }
    } else if (request) {
      // Error de red (sin respuesta del servidor)
      toast.error('Error de conexión. Verifica tu conexión a internet.')
    } else {
      // Error desconocido
      toast.error('Error desconocido: ' + message)
    }

    // IMPORTANTE: Retornar Promise.reject para que el componente pueda manejar el error
    return Promise.reject(error)
  }
)

export default httpClient