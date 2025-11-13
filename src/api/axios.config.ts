import axios from 'axios'

// En desarrollo, usa el proxy de Vite. En producción, usa la URL completa
const API_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.DEV 
    ? '' // En desarrollo, usa rutas relativas (proxy de Vite)
    : 'http://localhost:8080'
)

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Deshabilitar credenciales para evitar problemas de CORS
})

// Request interceptor - Agregar token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
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
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api