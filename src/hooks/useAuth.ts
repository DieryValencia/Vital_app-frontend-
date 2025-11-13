import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { authApi } from '@/api/auth.api'
import { useAuthStore } from '@/store/authStore'
import type { LoginRequest, RegisterRequest } from '@/api/types'

export const useAuth = () => {
  const navigate = useNavigate()
  const { setAuth, logout: clearAuth } = useAuthStore()

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(
        { id: data.id, username: data.username, email: data.email, roles: data.roles },
        data.token,
        data.refreshToken
      )
      navigate('/inicio')
    },
    // Removemos onError para manejar errores en el componente
  })

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuth(
        { id: data.id, username: data.username, email: data.email, roles: data.roles },
        data.token,
        data.refreshToken
      )
      toast.success('¡Cuenta creada exitosamente!')
      navigate('/inicio')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al registrarse')
    },
  })

  const logout = () => {
    authApi.logout()
    clearAuth()
    toast.success('Sesión cerrada')
    navigate('/login')
  }

  return {
    login: (credentials: LoginRequest) => loginMutation.mutate(credentials),
    register: (userData: RegisterRequest) => registerMutation.mutate(userData),
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  }
}