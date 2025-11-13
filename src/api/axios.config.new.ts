import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

// Usar variable de entorno VITE_API_URL, con fallbacks progresivos
const getApiUrl = (): string => {
  // 1. Verificar si hay variable de entorno
  const envUrl = import.meta.env.VITE_API_URL
  if (envUrl) {
    console.log('📡 API URL from env:', envUrl)
    return envUrl
  }

  // 2. En desarrollo sin env, usar proxy de Vite (empty baseURL)
  if (import.meta.env.DEV) {
    console.log('📡 API URL: Using Vite proxy (empty baseURL)')
    return ''
  }

  // 3. En producción sin env, usar localhost como fallback (aunque debería haber env)
  const fallbackUrl = 'http://localhost:8080'
  console.log('⚠️ API URL fallback:', fallbackUrl)
  return fallbackUrl
}

const API_URL = getApiUrl()

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 segundos para operaciones de IA
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
})

// Request interceptor - Agregar token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log(`🔗 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Manejar errores y refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Si el token expiró (401) y no hemos intentado refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        const response = await axios.post(`${API_URL}/api/auth/refresh`, {
          refreshToken,
        })

        const { token } = response.data
        localStorage.setItem('token', token)

        originalRequest.headers.Authorization = `Bearer ${token}`
        return api(originalRequest)
      } catch (refreshError) {
        // Si el refresh falla, limpiar storage y redirigir a login
        console.error('❌ Token refresh failed - Redirecting to login')
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        useAuthStore.getState().logout()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    // Error de conexión (backend no disponible)
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      console.error('🔴 Connection error:', error.message)
      console.error('Backend may not be available at:', API_URL)
    }

    // Timeout
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Request timeout after 30s')
    }

    return Promise.reject(error)
  }
)

export default api
