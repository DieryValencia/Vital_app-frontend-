import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/api/types'

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setAuth: (user: User, token: string, refreshToken: string) => void
  logout: () => void
  initializeAuth: () => void
}


export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,

      setAuth: (user, token, refreshToken) => {
        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('user', JSON.stringify(user))
        set({ user, token, refreshToken, isAuthenticated: true, isLoading: false })
      },

      logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false
        })
      },

      initializeAuth: () => {
        try {
          const savedToken = localStorage.getItem('token')
          const savedRefreshToken = localStorage.getItem('refreshToken')
          const savedUser = localStorage.getItem('user')

          if (savedToken && savedUser) {
            const parsedUser = JSON.parse(savedUser)
            set({
              user: parsedUser,
              token: savedToken,
              refreshToken: savedRefreshToken,
              isAuthenticated: true,
              isLoading: false
            })
          } else {
            set({ isLoading: false })
          }
        } catch (error) {
          console.error('Error al inicializar autenticación:', error)
          get().logout()
        }
      },
    }),
    {
      name: 'auth-storage',
      // Solo persistir user, token y refreshToken
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    }
  )
)