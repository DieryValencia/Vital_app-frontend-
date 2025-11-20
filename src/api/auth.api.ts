import httpClient from '@/services/httpClient'
import type { LoginRequest, RegisterRequest, AuthResponse } from './types'

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const { data } = await httpClient.post('/api/auth/login', credentials)
    return data
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await httpClient.post('/api/auth/register', userData)
    return data
  },

  refresh: async (refreshToken: string): Promise<AuthResponse> => {
    const { data } = await httpClient.post('/api/auth/refresh', { refreshToken })
    return data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  },
}